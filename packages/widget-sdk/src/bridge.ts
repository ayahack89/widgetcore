import { WidgetConfiguration } from './types';

/**
 * Context provided to an active widget running inside its independent window.
 */
export interface WidgetRuntimeContext {
  widgetId: string;
  instanceId: string;
  isHostConnected: boolean;
  close: () => Promise<void>;
  updateConfig: (config: Partial<WidgetConfiguration>) => Promise<void>;
}

/**
 * Helper to inspect URL parameters when a widget window is opened by the Desktop Host.
 * Widgets are opened with query params like: ?widget=clock&instanceId=clock-1726880000000
 */
export function getWidgetUrlParams(): { widgetId: string | null; instanceId: string | null } {
  if (typeof window === 'undefined') {
    return { widgetId: null, instanceId: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    widgetId: params.get('widget'),
    instanceId: params.get('instanceId'),
  };
}
