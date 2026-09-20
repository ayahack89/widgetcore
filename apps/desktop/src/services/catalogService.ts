import { CatalogWidget } from '../types';
import { manifest as clockManifest } from '@widgetcore/widget-clock';

/**
 * Service managing catalog of available widgets.
 * Designed to seamlessly connect to a remote backend API in later milestones.
 */
export class CatalogService {
  private catalog: CatalogWidget[] = [
    {
      manifest: clockManifest,
      price: 'Free',
      isUnlocked: true,
      featured: true,
      tags: ['Productivity', 'Clock', 'Time', 'Featured'],
    },
    {
      manifest: {
        id: 'weather',
        name: 'Weather Live',
        version: '1.0.0',
        description: 'Real-time local weather forecasts, radar, and temperature glance.',
        type: 'widget',
        author: 'WidgetCore',
        category: 'Information',
        window: {
          title: 'Weather Widget',
          width: 300,
          height: 220,
          transparent: true,
          decorations: false,
          alwaysOnTop: true,
          resizable: false,
        },
      },
      price: '$1.99',
      isUnlocked: true, // mock unlocked
      tags: ['Weather', 'Forecast', 'Information'],
    },
    {
      manifest: {
        id: 'pomodoro',
        name: 'Pomodoro Timer',
        version: '1.0.0',
        description: 'Focus timer with customizable work/break intervals and progress ring.',
        type: 'widget',
        author: 'WidgetCore',
        category: 'Productivity',
        window: {
          title: 'Pomodoro Widget',
          width: 260,
          height: 280,
          transparent: true,
          decorations: false,
          alwaysOnTop: true,
          resizable: false,
        },
      },
      price: 'Free',
      isUnlocked: true,
      tags: ['Productivity', 'Timer', 'Focus'],
    },
    {
      manifest: {
        id: 'system-monitor',
        name: 'System Monitor',
        version: '1.0.0',
        description: 'Live CPU, GPU, RAM, and network usage gauges on your desktop.',
        type: 'widget',
        author: 'WidgetCore',
        category: 'Utilities',
        window: {
          title: 'System Monitor Widget',
          width: 320,
          height: 200,
          transparent: true,
          decorations: false,
          alwaysOnTop: true,
          resizable: false,
        },
      },
      price: '$2.99',
      isUnlocked: true,
      tags: ['Hardware', 'System', 'Utilities'],
    },
    {
      manifest: {
        id: 'notes',
        name: 'Desktop Sticky Notes',
        version: '1.0.0',
        description: 'Quick-capture sticky notes that stay anchored to your desktop.',
        type: 'widget',
        author: 'WidgetCore',
        category: 'Productivity',
        window: {
          title: 'Notes Widget',
          width: 280,
          height: 300,
          transparent: true,
          decorations: false,
          alwaysOnTop: false,
          resizable: true,
        },
      },
      price: 'Free',
      isUnlocked: true,
      tags: ['Notes', 'Organization', 'Productivity'],
    },
    {
      manifest: {
        id: 'calendar',
        name: 'Mini Calendar',
        version: '1.0.0',
        description: 'Compact monthly calendar with event indicators and reminders.',
        type: 'widget',
        author: 'WidgetCore',
        category: 'Productivity',
        window: {
          title: 'Calendar Widget',
          width: 280,
          height: 260,
          transparent: true,
          decorations: false,
          alwaysOnTop: true,
          resizable: false,
        },
      },
      price: '$1.49',
      isUnlocked: true,
      tags: ['Calendar', 'Schedule', 'Productivity'],
    },
  ];

  /**
   * Fetches all available widgets in the store.
   */
  public async getCatalog(): Promise<CatalogWidget[]> {
    // Simulated async delay for realistic lifecycle handling
    return Promise.resolve([...this.catalog]);
  }

  /**
   * Retrieves a single catalog item by ID.
   */
  public async getWidgetById(id: string): Promise<CatalogWidget | undefined> {
    return Promise.resolve(this.catalog.find((item) => item.manifest.id === id));
  }
}

export const catalogService = new CatalogService();
