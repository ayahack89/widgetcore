use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
async fn launch_widget_window(
    app: AppHandle,
    label: String,
    title: String,
    url: String,
    width: f64,
    height: f64,
    transparent: bool,
    decorations: bool,
    always_on_top: bool,
    resizable: bool,
) -> Result<String, String> {
    // If window already exists, bring it to focus
    if let Some(existing_window) = app.get_webview_window(&label) {
        let _ = existing_window.set_focus();
        return Ok(label);
    }

    // Resolve URL based on running app environment (dev server vs production assets)
    let webview_url = if url.starts_with("http://") || url.starts_with("https://") {
        let parsed = url.parse().map_err(|e| format!("Invalid URL: {e}"))?;
        WebviewUrl::External(parsed)
    } else if let Some(main_win) = app.get_webview_window("main") {
        if let Ok(base_url) = main_win.url() {
            if let Ok(joined) = base_url.join(&url) {
                WebviewUrl::External(joined)
            } else {
                WebviewUrl::App(url.into())
            }
        } else {
            WebviewUrl::App(url.into())
        }
    } else {
        WebviewUrl::App(url.into())
    };

    let mut builder = WebviewWindowBuilder::new(&app, &label, webview_url)
        .title(&title)
        .inner_size(width, height)
        .transparent(transparent)
        .decorations(decorations)
        .always_on_top(always_on_top)
        .resizable(resizable)
        .skip_taskbar(true);

    #[cfg(target_os = "windows")]
    {
        builder = builder.shadow(true);
    }

    builder.build().map_err(|e| e.to_string())?;

    Ok(label)
}

#[tauri::command]
async fn close_widget_window(app: AppHandle, label: String) -> Result<bool, String> {
    if let Some(window) = app.get_webview_window(&label) {
        window.close().map_err(|e| e.to_string())?;
        Ok(true)
    } else {
        Ok(false)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            launch_widget_window,
            close_widget_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
