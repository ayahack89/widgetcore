import React from 'react';
import { useWidgetStore, NavigationTab } from '../store/WidgetContext';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, installedWidgets, activeInstances } = useWidgetStore();

  const navItems: { tab: NavigationTab; label: string; count?: number }[] = [
    { tab: 'catalog', label: 'Widget Store' },
    { tab: 'installed', label: 'Installed', count: installedWidgets.length },
    { tab: 'instances', label: 'Active Desktop Widgets', count: activeInstances.length },
  ];

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #2d3748',
        backgroundColor: '#1a202c',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '14px',
          }}
        >
          W
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' }}>
            WidgetCore Hub
          </h1>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Windows Desktop Engine</span>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '8px' }}>
        {navItems.map(({ tab, label, count }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: isActive ? '#2563eb' : '#2d3748',
                color: isActive ? '#ffffff' : '#cbd5e1',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              {label}
              {count !== undefined && count > 0 && (
                <span
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontSize: '11px',
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
