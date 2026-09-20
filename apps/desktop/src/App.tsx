import React from 'react';
import { getWidgetUrlParams } from '@widgetcore/sdk';
import { WidgetStoreProvider, useWidgetStore } from './store/WidgetContext';
import { Header } from './components/Header';
import { CatalogPage } from './pages/CatalogPage';
import { InstalledPage } from './pages/InstalledPage';
import { InstancesPage } from './pages/InstancesPage';
import { WidgetHostPage } from './pages/WidgetHostPage';

const MainHubView: React.FC = () => {
  const { activeTab, isLoading } = useWidgetStore();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {isLoading ? (
          <div style={{ color: '#94a3b8', padding: '40px', textAlign: 'center' }}>
            Loading widgets...
          </div>
        ) : (
          <>
            {activeTab === 'catalog' && <CatalogPage />}
            {activeTab === 'installed' && <InstalledPage />}
            {activeTab === 'instances' && <InstancesPage />}
          </>
        )}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  const { widgetId } = getWidgetUrlParams();

  // If this window was launched specifically as a widget window, host the widget directly!
  if (widgetId) {
    return <WidgetHostPage />;
  }

  // Otherwise render the main Hub application
  return (
    <WidgetStoreProvider>
      <MainHubView />
    </WidgetStoreProvider>
  );
};

export default App;
