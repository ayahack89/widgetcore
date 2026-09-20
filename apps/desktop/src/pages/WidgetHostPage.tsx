import React from 'react';
import { widgetRegistry } from '../widgets/registry';
import { getWidgetUrlParams } from '@widgetcore/sdk';

export const WidgetHostPage: React.FC = () => {
  const { widgetId, instanceId } = getWidgetUrlParams();

  if (!widgetId) {
    return (
      <div style={{ color: '#ffffff', padding: '20px', fontFamily: 'sans-serif' }}>
        No widget identifier specified.
      </div>
    );
  }

  const registered = widgetRegistry.get(widgetId);

  if (!registered) {
    return (
      <div
        style={{
          color: '#f87171',
          padding: '16px',
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          fontFamily: 'sans-serif',
          fontSize: '13px',
        }}
      >
        Widget &quot;{widgetId}&quot; is not registered in this build.
      </div>
    );
  }

  const WidgetComponent = registered.component;

  return <WidgetComponent instanceId={instanceId || undefined} />;
};
