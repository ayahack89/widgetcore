/**
 * Service managing OS-level features such as autostart on Windows startup.
 * Prepared for Tauri autostart plugins and Windows registry integration.
 */
export class OsService {
  /**
   * Toggles whether the application or specific widget starts with Windows.
   */
  public async setAutoStart(enabled: boolean): Promise<boolean> {
    // Architecture hook ready for @tauri-apps/plugin-autostart
    console.info(`[OsService] Set autostart: ${enabled}`);
    return Promise.resolve(enabled);
  }

  /**
   * Checks if autostart is currently enabled.
   */
  public async isAutoStartEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export const osService = new OsService();
