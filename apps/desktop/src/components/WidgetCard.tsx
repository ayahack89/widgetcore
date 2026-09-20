import React from 'react';
import { WidgetManifest, WidgetInstallation, WidgetInstance } from '@widgetcore/sdk';

export interface WidgetCardProps {
  manifest: WidgetManifest;
  price?: string;
  installation?: WidgetInstallation;
  activeInstances?: WidgetInstance[];
  onInstall?: () => void;
  onUninstall?: () => void;
  onLaunch?: () => void;
  onCloseInstance?: (instanceId: string) => void;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  manifest,
  price,
  installation,
  activeInstances = [],
  onInstall,
  onUninstall,
  onLaunch,
  onCloseInstance,
}) => {
  const isInstalled = Boolean(installation && installation.status === 'installed');
  const runningCount = activeInstances.length;

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '10px',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '220px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div>
        {/* Top bar with category and price / installed status */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#38bdf8',
              letterSpacing: '0.05em',
            }}
          >
            {manifest.category || 'Widget'}
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {price && (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#94a3b8',
                }}
              >
                {price}
              </span>
            )}
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: isInstalled ? '#065f46' : '#334155',
                color: isInstalled ? '#34d399' : '#94a3b8',
                fontWeight: 600,
              }}
            >
              {isInstalled ? 'Installed' : 'Available'}
            </span>
          </div>
        </div>

        {/* Title and version */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#f8fafc' }}>
            {manifest.name}
          </h2>
          <span style={{ fontSize: '11px', color: '#64748b' }}>v{manifest.version}</span>
        </div>

        {/* Description */}
        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.4' }}>
          {manifest.description}
        </p>

        {/* Window capability tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '11px',
              backgroundColor: '#0f172a',
              color: '#94a3b8',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #1e293b',
            }}
          >
            {manifest.window.width}×{manifest.window.height}px
          </span>
          {manifest.window.transparent && (
            <span
              style={{
                fontSize: '11px',
                backgroundColor: '#0f172a',
                color: '#38bdf8',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              Transparent
            </span>
          )}
          {manifest.window.alwaysOnTop && (
            <span
              style={{
                fontSize: '11px',
                backgroundColor: '#0f172a',
                color: '#fbbf24',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              Always-on-top
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div>
        {runningCount > 0 && (
          <div
            style={{
              marginBottom: '10px',
              padding: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#34d399',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>● {runningCount} instance(s) running</span>
            {activeInstances.map((inst) => (
              <button
                key={inst.instanceId}
                onClick={() => onCloseInstance && onCloseInstance(inst.instanceId)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  fontSize: '11px',
                  textDecoration: 'underline',
                }}
              >
                Close
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px' }}>
          {!isInstalled && onInstall && (
            <button
              onClick={onInstall}
              style={{
                flex: 1,
                padding: '9px 12px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Install Widget
            </button>
          )}

          {isInstalled && (
            <>
              {onLaunch && (
                <button
                  onClick={onLaunch}
                  style={{
                    flex: 2,
                    padding: '9px 12px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ▶ Launch on Desktop
                </button>
              )}
              {onUninstall && (
                <button
                  onClick={onUninstall}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    backgroundColor: '#334155',
                    color: '#f87171',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Uninstall
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
