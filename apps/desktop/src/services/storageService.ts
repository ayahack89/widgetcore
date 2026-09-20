import { WidgetInstallation, WidgetConfiguration } from '@widgetcore/sdk';

const STORAGE_KEYS = {
  INSTALLED: 'widgetcore:installed_widgets',
  CONFIG_PREFIX: 'widgetcore:config:',
} as const;

export class StorageService {
  /**
   * Retrieves all installed widgets from local storage.
   */
  public getInstalledWidgets(): WidgetInstallation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSTALLED);
      if (!data) {
        // Initial seed for proof of concept
        const initial: WidgetInstallation[] = [
          {
            widgetId: 'clock',
            status: 'installed',
            version: '1.0.0',
            installedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            autoStart: false,
          },
        ];
        this.setInstalledWidgets(initial);
        return initial;
      }
      return JSON.parse(data) as WidgetInstallation[];
    } catch (err) {
      console.error('Failed to load installed widgets from storage:', err);
      return [];
    }
  }

  /**
   * Persists installed widgets list.
   */
  public setInstalledWidgets(widgets: WidgetInstallation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTALLED, JSON.stringify(widgets));
    } catch (err) {
      console.error('Failed to save installed widgets to storage:', err);
    }
  }

  /**
   * Retrieves configuration for a specific widget.
   */
  public getWidgetConfig(widgetId: string): WidgetConfiguration | null {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.CONFIG_PREFIX}${widgetId}`);
      if (!data) return null;
      return JSON.parse(data) as WidgetConfiguration;
    } catch (err) {
      console.error(`Failed to load config for widget ${widgetId}:`, err);
      return null;
    }
  }

  /**
   * Saves configuration for a specific widget.
   */
  public saveWidgetConfig(config: WidgetConfiguration): void {
    try {
      localStorage.setItem(
        `${STORAGE_KEYS.CONFIG_PREFIX}${config.widgetId}`,
        JSON.stringify(config)
      );
    } catch (err) {
      console.error(`Failed to save config for widget ${config.widgetId}:`, err);
    }
  }
}

export const storageService = new StorageService();
