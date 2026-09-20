import { useContext } from 'react';
import { WidgetStoreContext, WidgetStoreContextType } from './context';

export function useWidgetStore(): WidgetStoreContextType {
  const context = useContext(WidgetStoreContext);
  if (!context) {
    throw new Error('useWidgetStore must be used within a WidgetStoreProvider');
  }
  return context;
}
