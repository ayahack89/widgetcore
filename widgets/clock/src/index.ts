import manifestJson from '../manifest.json';
import { WidgetManifest } from '@widgetcore/sdk';

export { ClockWidget } from './ClockWidget';
export type { ClockWidgetProps } from './ClockWidget';

export const manifest = manifestJson as unknown as WidgetManifest;
