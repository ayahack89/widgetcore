import React from 'react';
import { useWidgetStore } from '../store/WidgetContext';
import { WidgetCard } from '../components/WidgetCard';
import { WidgetGrid } from '../components/WidgetGrid';

export const CatalogPage: React.FC = () => {
  const { catalog, installedWidgets, activeInstances, installWidget, launchWidget, uninstallWidget, closeWidget } =
    useWidgetStore();

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#f8fafc' }}>
          Widget Store & Catalog
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
          Explore available desktop widgets. Install them to run directly on your Windows desktop.
        </p>
      </div>

      <WidgetGrid>
        {catalog.map((item) => {
          const installation = installedWidgets.find((inst) => inst.widgetId === item.manifest.id);
          const instances = activeInstances.filter((inst) => inst.widgetId === item.manifest.id);

          return (
            <WidgetCard
              key={item.manifest.id}
              manifest={item.manifest}
              price={item.price}
              installation={installation}
              activeInstances={instances}
              onInstall={() => installWidget(item.manifest.id)}
              onLaunch={() => launchWidget(item.manifest.id)}
              onUninstall={() => uninstallWidget(item.manifest.id)}
              onCloseInstance={closeWidget}
            />
          );
        })}
      </WidgetGrid>
    </div>
  );
};
