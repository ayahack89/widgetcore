import {
  WidgetInstallation,
  WidgetInstance,
  WidgetConfiguration,
} from '@widgetcore/sdk';
import { catalogService } from './catalogService';
import { storageService } from './storageService';
import { windowService } from './windowService';
import { widgetRegistry } from '../widgets/registry';

export class WidgetManager {
  private activeInstances: Map<string, WidgetInstance> = new Map();

  /**
   * Retrieves all currently installed widgets.
   */
  public async listInstalledWidgets(): Promise<WidgetInstallation[]> {
    const installed = storageService.getInstalledWidgets();
    return Promise.resolve(installed);
  }

  /**
   * Installs a widget locally from the catalog.
   */
  public async installWidget(widgetId: string): Promise<WidgetInstallation> {
    const catalogItem = await catalogService.getWidgetById(widgetId);
    if (!catalogItem) {
      throw new Error(`Widget ${widgetId} not found in catalog.`);
    }

    const currentInstalled = storageService.getInstalledWidgets();
    const existing = currentInstalled.find((item) => item.widgetId === widgetId);

    if (existing && existing.status === 'installed') {
      return existing;
    }

    const newInstallation: WidgetInstallation = {
      widgetId,
      status: 'installed',
      version: catalogItem.manifest.version,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      autoStart: false,
    };

    const updated = [
      ...currentInstalled.filter((item) => item.widgetId !== widgetId),
      newInstallation,
    ];
    storageService.setInstalledWidgets(updated);

    // Initialize default configuration if not present
    if (!storageService.getWidgetConfig(widgetId)) {
      const defaultConfig: WidgetConfiguration = {
        widgetId,
        position: { x: 100, y: 100 },
        alwaysOnTop: catalogItem.manifest.window.alwaysOnTop ?? true,
        opacity: 1.0,
        autoStart: false,
        customSettings: {},
      };
      storageService.saveWidgetConfig(defaultConfig);
    }

    return newInstallation;
  }

  /**
   * Uninstalls a widget and closes any running instances.
   */
  public async uninstallWidget(widgetId: string): Promise<boolean> {
    // Close running instances of this widget
    const runningInstances = Array.from(this.activeInstances.values()).filter(
      (inst) => inst.widgetId === widgetId
    );
    for (const inst of runningInstances) {
      await this.closeWidget(inst.instanceId);
    }

    const currentInstalled = storageService.getInstalledWidgets();
    const updated = currentInstalled.filter((item) => item.widgetId !== widgetId);
    storageService.setInstalledWidgets(updated);
    return true;
  }

  /**
   * Launches an independent window instance of the widget.
   */
  public async launchWidget(widgetId: string): Promise<WidgetInstance> {
    // Check if installed
    const installedList = await this.listInstalledWidgets();
    const isInstalled = installedList.some(
      (item) => item.widgetId === widgetId && item.status === 'installed'
    );
    if (!isInstalled) {
      throw new Error(`Widget ${widgetId} must be installed before launching.`);
    }

    // Get manifest from registry or catalog
    const registered = widgetRegistry.get(widgetId);
    const manifest = registered
      ? registered.manifest
      : (await catalogService.getWidgetById(widgetId))?.manifest;

    if (!manifest) {
      throw new Error(`Manifest not found for widget ${widgetId}`);
    }

    const instanceId = `${widgetId}-${Date.now()}`;
    const windowLabel = await windowService.launchWidgetWindow({
      instanceId,
      manifest,
    });

    const instance: WidgetInstance = {
      instanceId,
      widgetId,
      windowLabel,
      launchedAt: new Date().toISOString(),
      status: 'running',
    };

    this.activeInstances.set(instanceId, instance);
    return instance;
  }

  /**
   * Closes an active widget instance.
   */
  public async closeWidget(instanceId: string): Promise<boolean> {
    const instance = this.activeInstances.get(instanceId);
    if (!instance) return false;

    await windowService.closeWidgetWindow(instance.windowLabel);
    this.activeInstances.delete(instanceId);
    return true;
  }

  /**
   * Updates an installed widget to a new version.
   */
  public async updateWidget(widgetId: string, version: string): Promise<WidgetInstallation> {
    const currentInstalled = storageService.getInstalledWidgets();
    const target = currentInstalled.find((item) => item.widgetId === widgetId);
    if (!target) {
      throw new Error(`Cannot update uninstalled widget ${widgetId}`);
    }

    const updatedRecord: WidgetInstallation = {
      ...target,
      version,
      updatedAt: new Date().toISOString(),
    };

    const nextList = [
      ...currentInstalled.filter((item) => item.widgetId !== widgetId),
      updatedRecord,
    ];
    storageService.setInstalledWidgets(nextList);
    return updatedRecord;
  }

  /**
   * Lists all currently active runtime instances.
   */
  public getActiveInstances(): WidgetInstance[] {
    return Array.from(this.activeInstances.values());
  }

  /**
   * Gets user configuration for a widget.
   */
  public async getWidgetConfig(widgetId: string): Promise<WidgetConfiguration | null> {
    return Promise.resolve(storageService.getWidgetConfig(widgetId));
  }

  /**
   * Updates configuration for a widget.
   */
  public async saveWidgetConfig(
    widgetId: string,
    updates: Partial<WidgetConfiguration>
  ): Promise<WidgetConfiguration> {
    const existing = storageService.getWidgetConfig(widgetId) || {
      widgetId,
      position: { x: 100, y: 100 },
      alwaysOnTop: true,
      opacity: 1.0,
      autoStart: false,
      customSettings: {},
    };

    const updated: WidgetConfiguration = {
      ...existing,
      ...updates,
      widgetId,
    };
    storageService.saveWidgetConfig(updated);
    return Promise.resolve(updated);
  }
}

export const widgetManager = new WidgetManager();
