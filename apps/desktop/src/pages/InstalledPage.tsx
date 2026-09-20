import React from 'react';
import { useWidgetStore } from '../store/WidgetContext';
import { WidgetCard } from '../components/WidgetCard';
import { WidgetGrid } from '../components/WidgetGrid';

export const InstalledPage: React.FC = () => {
  const {
    catalog,
    installedWidgets,
    activeInstances,
    launchWidget,
    uninstallWidget,
    closeWidget,
    setActiveTab,
  } = useWidgetStore();

  const installedList = installedWidgets
    .map((inst) => {
      const catalogItem = catalog.find((c) => c.manifest.id === inst.widgetId);
      return {
        installation: inst,
        manifest: catalogItem?.manifest,
      };
    })
    .filter((item) => Boolean(item.manifest));

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#f8fafc' }}>
          Installed Widgets
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
          Manage your locally installed widgets. Launch or configure them here.
        </p>
      </div>

      {installedList.length === 0 ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#1e293b',
            borderRadius: '10px',
            border: '1px dashed #334155',
          }}
        >
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
            No widgets installed yet. Visit the Widget Store to install your first widget!
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            style={{
              padding: '10px 18px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Browse Store Catalog
          </button>
        </div>
      ) : (
        <WidgetGrid>
          {installedList.map(({ installation, manifest }) => {
            if (!manifest) return null;
            const instances = activeInstances.filter(
              (inst) => inst.widgetId === installation.widgetId
            );

            return (
              <WidgetCard
                key={manifest.id}
                manifest={manifest}
                installation={installation}
                activeInstances={instances}
                onLaunch={() => launchWidget(manifest.id)}
                onUninstall={() => uninstallWidget(manifest.id)}
                onCloseInstance={closeWidget}
              />
            );
          })}
        </WidgetGrid>
      )}
    </div>
  );
};
