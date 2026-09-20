import React, { useState, useEffect } from 'react';

export interface ClockWidgetProps {
  instanceId?: string;
  onClose?: () => void;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({ instanceId, onClose }) => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = async () => {
    if (onClose) {
      onClose();
      return;
    }
    try {
      const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
      const appWindow = getCurrentWebviewWindow();
      await appWindow.close();
    } catch {
      try {
        const { invoke } = await import('@tauri-apps/api/core');
        await invoke('close_widget_window', { label: window.name });
      } catch (err) {
        console.error('Failed to close native widget window:', err);
      }
    }
  };

  const hours = time.getHours();
  const displayHours = is24Hour
    ? hours.toString().padStart(2, '0')
    : (hours % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const dateStr = time.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      data-tauri-drag-region
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        userSelect: 'none',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        data-tauri-drag-region
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(23, 25, 35, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header drag bar & close button */}
        <div
          data-tauri-drag-region
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'grab',
            width: '100%',
          }}
        >
          <div
            data-tauri-drag-region
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'inline-block',
              }}
            />
            Clock
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={() => setIs24Hour((prev) => !prev)}
              title="Toggle 12h/24h"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '6px',
                color: '#cbd5e1',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              {is24Hour ? '24H' : '12H'}
            </button>
            <button
              onClick={handleClose}
              title="Close Widget"
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: 'none',
                borderRadius: '6px',
                color: '#f87171',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Time display */}
        <div
          data-tauri-drag-region
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            margin: 'auto 0',
          }}
        >
          <div
            data-tauri-drag-region
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <span
              data-tauri-drag-region
              style={{
                fontSize: '44px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {displayHours}:{minutes}
            </span>
            <div
              data-tauri-drag-region
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: '4px',
              }}
            >
              {!is24Hour && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#38bdf8',
                  }}
                >
                  {ampm}
                </span>
              )}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                :{seconds}
              </span>
            </div>
          </div>

          <div
            data-tauri-drag-region
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#94a3b8',
              marginTop: '4px',
            }}
          >
            {dateStr}
          </div>
        </div>

        {/* Footer info / instance tag */}
        <div
          data-tauri-drag-region
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '10px',
            color: '#64748b',
          }}
        >
          {instanceId ? `Instance: ${instanceId.slice(0, 8)}` : 'Drag anywhere to move'}
        </div>
      </div>
    </div>
  );
};
