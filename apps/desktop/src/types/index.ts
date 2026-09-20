export * from '@widgetcore/sdk';
import { WidgetManifest } from '@widgetcore/sdk';

/**
 * Catalog entry for a widget in the store/hub.
 */
export interface CatalogWidget {
  manifest: WidgetManifest;
  price: string;
  isUnlocked: boolean;
  featured?: boolean;
  tags: string[];
}
