/**
 * Window appearance and behavior options for desktop widgets.
 */
export interface WidgetWindowConfig {
  /** Window title, defaults to widget name */
  title?: string;
  /** Width in logical pixels */
  width: number;
  /** Height in logical pixels */
  height: number;
  /** Minimum width if resizable */
  minWidth?: number;
  /** Minimum height if resizable */
  minHeight?: number;
  /** Maximum width if resizable */
  maxWidth?: number;
  /** Maximum height if resizable */
  maxHeight?: number;
  /** Whether the window supports alpha transparency */
  transparent?: boolean;
  /** Whether to show OS window borders/decorations (frameless when false) */
  decorations?: boolean;
  /** Whether the widget window floats above other windows */
  alwaysOnTop?: boolean;
  /** Whether user can resize the widget window */
  resizable?: boolean;
  /** Whether window appears in Windows taskbar */
  skipTaskbar?: boolean;
}

/**
 * Manifest defining metadata and configuration for a widget package.
 */
export interface WidgetManifest {
  /** Unique identifier for the widget (e.g., 'clock', 'weather') */
  id: string;
  /** Display name of the widget */
  name: string;
  /** Semantic version (e.g., '1.0.0') */
  version: string;
  /** Human-readable description */
  description: string;
  /** Type discriminator */
  type: 'widget';
  /** Author or publisher name */
  author?: string;
  /** Category in the store/hub */
  category?: string;
  /** Relative icon path or svg string */
  icon?: string;
  /** Entry script or component file path */
  entry?: string;
  /** Window configuration for the widget */
  window: WidgetWindowConfig;
  /** Permissions requested from host (e.g., network, notifications, storage) */
  permissions?: string[];
  /** Arbitrary metadata for future extensions */
  metadata?: Record<string, unknown>;
}

/**
 * Installation status of a widget on the local system.
 */
export type WidgetInstallStatus = 'available' | 'installing' | 'installed' | 'uninstalled' | 'error';

/**
 * Represents the installation record of a widget on the user's desktop.
 */
export interface WidgetInstallation {
  /** Widget identifier corresponding to manifest.id */
  widgetId: string;
  /** Current installation state */
  status: WidgetInstallStatus;
  /** Currently installed version */
  version: string;
  /** ISO timestamp when widget was installed */
  installedAt?: string;
  /** ISO timestamp when widget was last updated */
  updatedAt?: string;
  /** Whether widget starts automatically on Windows login */
  autoStart: boolean;
  /** Error message if installation failed */
  error?: string;
}

/**
 * User-configurable settings and desktop placement for a widget.
 */
export interface WidgetConfiguration {
  /** Target widget identifier */
  widgetId: string;
  /** Position on the Windows desktop */
  position: {
    x: number;
    y: number;
  };
  /** Optional size override if resizable */
  size?: {
    width: number;
    height: number;
  };
  /** Whether always on top override is active */
  alwaysOnTop: boolean;
  /** Window opacity (0.1 - 1.0) */
  opacity: number;
  /** Autostart toggle */
  autoStart: boolean;
  /** Widget-specific custom settings */
  customSettings: Record<string, unknown>;
}

/**
 * Active runtime instance of a widget running on the Windows desktop.
 */
export interface WidgetInstance {
  /** Unique instance identifier (allows multiple instances of same widget) */
  instanceId: string;
  /** Associated widget ID */
  widgetId: string;
  /** Tauri window label assigned to this instance */
  windowLabel: string;
  /** Timestamp when the instance was launched */
  launchedAt: string;
  /** Current lifecycle status */
  status: 'launching' | 'running' | 'closing' | 'stopped';
}

/**
 * Generic widget definition tying together manifest and runtime metadata.
 */
export interface Widget<TConfig = Record<string, unknown>> {
  manifest: WidgetManifest;
  defaultConfig?: Partial<WidgetConfiguration & { customSettings: TConfig }>;
}
