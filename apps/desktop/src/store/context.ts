import { createContext } from 'react';
import { WidgetInstallation, WidgetInstance } from '@widgetcore/sdk';
import { CatalogWidget } from '../types';

export type NavigationTab = 'catalog' | 'installed' | 'instances';

export interface WidgetStoreContextType {
  catalog: CatalogWidget[];
  installedWidgets: WidgetInstallation[];
  activeInstances: WidgetInstance[];
  isLoading: boolean;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  installWidget: (widgetId: string) => Promise<void>;
  uninstallWidget: (widgetId: string) => Promise<void>;
  launchWidget: (widgetId: string) => Promise<void>;
  closeWidget: (instanceId: string) => Promise<void>;
  updateWidget: (widgetId: string, version: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const WidgetStoreContext = createContext<WidgetStoreContextType | null>(null);
