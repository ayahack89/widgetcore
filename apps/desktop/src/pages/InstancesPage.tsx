import React from 'react';
import { useWidgetStore } from '../store/WidgetContext';

export const InstancesPage: React.FC = () => {
  const { activeInstances, catalog, closeWidget } = useWidgetStore();

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#f8fafc' }}>
          Active Desktop Widgets
        </h2>
        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
          Currently running independent widget windows on your desktop.
        </p>
      </div>

      {activeInstances.length === 0 ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#1e293b',
            borderRadius: '10px',
            border: '1px dashed #334155',
          }}
        >
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            No active widgets are running on the desktop right now.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeInstances.map((instance) => {
            const catalogItem = catalog.find((c) => c.manifest.id === instance.widgetId);
            const name = catalogItem?.manifest.name || instance.widgetId;

            return (
              <div
                key={instance.instanceId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'inline-block',
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
                      {name}
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Window: {instance.windowLabel} | Launched:{' '}
                      {new Date(instance.launchedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => closeWidget(instance.instanceId)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Close Window
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
