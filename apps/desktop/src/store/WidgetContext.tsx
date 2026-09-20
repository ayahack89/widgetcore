import React, { useState, useEffect, useCallback } from 'react';
import {
  WidgetInstallation,
  WidgetInstance,
} from '@widgetcore/sdk';
import { CatalogWidget } from '../types';
import { catalogService } from '../services/catalogService';
import { widgetManager } from '../services/widgetManager';
import { WidgetStoreContext, NavigationTab } from './context';

export { useWidgetStore } from './useWidgetStore';
export type { NavigationTab, WidgetStoreContextType } from './context';

export const WidgetStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [catalog, setCatalog] = useState<CatalogWidget[]>([]);
  const [installedWidgets, setInstalledWidgets] = useState<WidgetInstallation[]>([]);
  const [activeInstances, setActiveInstances] = useState<WidgetInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>('catalog');

  const refresh = useCallback(async () => {
    try {
      const [catList, instList] = await Promise.all([
        catalogService.getCatalog(),
        widgetManager.listInstalledWidgets(),
      ]);
      setCatalog(catList);
      setInstalledWidgets(instList);
      setActiveInstances(widgetManager.getActiveInstances());
    } catch (err) {
      console.error('Failed to load widget store data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleInstall = async (widgetId: string) => {
    await widgetManager.installWidget(widgetId);
    await refresh();
  };

  const handleUninstall = async (widgetId: string) => {
    await widgetManager.uninstallWidget(widgetId);
    await refresh();
  };

  const handleLaunch = async (widgetId: string) => {
    await widgetManager.launchWidget(widgetId);
    setActiveInstances(widgetManager.getActiveInstances());
  };

  const handleClose = async (instanceId: string) => {
    await widgetManager.closeWidget(instanceId);
    setActiveInstances(widgetManager.getActiveInstances());
  };

  const handleUpdate = async (widgetId: string, version: string) => {
    await widgetManager.updateWidget(widgetId, version);
    await refresh();
  };

  return (
    <WidgetStoreContext.Provider
      value={{
        catalog,
        installedWidgets,
        activeInstances,
        isLoading,
        activeTab,
        setActiveTab,
        installWidget: handleInstall,
        uninstallWidget: handleUninstall,
        launchWidget: handleLaunch,
        closeWidget: handleClose,
        updateWidget: handleUpdate,
        refresh,
      }}
    >
      {children}
    </WidgetStoreContext.Provider>
  );
};
