import React from 'react';
import { WidgetManifest } from '@widgetcore/sdk';
import { manifest as clockManifest, ClockWidget } from '@widgetcore/widget-clock';

export interface RegisteredWidget {
  manifest: WidgetManifest;
  component: React.ComponentType<{ instanceId?: string; onClose?: () => void }>;
}

const REGISTRY: Record<string, RegisteredWidget> = {
  clock: {
    manifest: clockManifest,
    component: ClockWidget,
  },
};

/**
 * Registry of bundled or dynamically loaded widgets.
 */
export class WidgetRegistry {
  /**
   * Returns whether a widget is supported/registered locally.
   */
  public has(widgetId: string): boolean {
    return Boolean(REGISTRY[widgetId]);
  }

  /**
   * Retrieves registered widget metadata and component.
   */
  public get(widgetId: string): RegisteredWidget | undefined {
    return REGISTRY[widgetId];
  }

  /**
   * Registers a new widget into the runtime.
   */
  public register(registered: RegisteredWidget): void {
    REGISTRY[registered.manifest.id] = registered;
  }

  /**
   * Returns all registered widgets.
   */
  public getAll(): RegisteredWidget[] {
    return Object.values(REGISTRY);
  }
}

export const widgetRegistry = new WidgetRegistry();
