import { WidgetManifest } from '@widgetcore/sdk';

export interface LaunchWindowOptions {
  instanceId: string;
  manifest: WidgetManifest;
}

export class WindowService {
  /**
   * Detects whether running inside a Tauri desktop environment.
   */
  public isTauri(): boolean {
    return typeof window !== 'undefined' && ('__TAURI_INTERNALS__' in window || '__TAURI__' in window);
  }

  /**
   * Opens an independent native Windows desktop window for the specified widget using Tauri.
   */
  public async launchWidgetWindow(options: LaunchWindowOptions): Promise<string> {
    const { instanceId, manifest } = options;
    const windowLabel = `widget-${manifest.id}-${instanceId}`;
    const windowConfig = manifest.window;
    const targetUrl = `index.html?widget=${encodeURIComponent(manifest.id)}&instanceId=${encodeURIComponent(instanceId)}`;

    if (!this.isTauri()) {
      throw new Error(
        'Cannot launch desktop widget: Not running inside Tauri desktop environment. Run "npm run tauri dev" to launch the native desktop application.'
      );
    }

    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('launch_widget_window', {
        label: windowLabel,
        title: windowConfig.title || manifest.name,
        url: targetUrl,
        width: windowConfig.width || 260,
        height: windowConfig.height || 260,
        transparent: windowConfig.transparent ?? true,
        decorations: windowConfig.decorations ?? false,
        alwaysOnTop: windowConfig.alwaysOnTop ?? true,
        resizable: windowConfig.resizable ?? false,
      });
      return windowLabel;
    } catch (err) {
      console.error('Failed to launch desktop widget window via Tauri:', err);
      throw err;
    }
  }

  /**
   * Closes an active desktop widget window using Tauri.
   */
  public async closeWidgetWindow(windowLabel: string): Promise<boolean> {
    if (!this.isTauri()) {
      return false;
    }
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<boolean>('close_widget_window', { label: windowLabel });
    } catch (err) {
      console.error('Failed to close widget window via Tauri:', err);
      return false;
    }
  }
}

export const windowService = new WindowService();
