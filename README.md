# WidgetCore

A commercial Windows desktop "Widget Hub/Store" application built with **Tauri 2**, **React**, **TypeScript**, and **Vite**.

Users can browse a catalog of available widgets, install them locally, and run them as independent, frameless, always-on-top desktop widgets.

---

## 🏗️ Architecture & Monorepo Structure

```text
widgetcore/
│
├── apps/
│   └── desktop/                 # Main Tauri 2 Hub & Host Application
│       ├── src/
│       │   ├── components/      # UI building blocks (Header, WidgetCard, Grid)
│       │   ├── pages/           # Hub pages (Catalog, Installed, Instances, WidgetHost)
│       │   ├── services/        # Decoupled business logic (Manager, Storage, Window, OS)
│       │   ├── store/           # Reactive state container (WidgetContext)
│       │   ├── types/           # Desktop & store type definitions
│       │   └── widgets/         # Widget registry & dynamic loader
│       ├── src-tauri/           # Rust Tauri 2 native desktop backend
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── widgets/
│   └── clock/                   # First proof-of-concept widget
│       ├── src/                 # Clock component with draggable region & live time
│       ├── manifest.json        # Declarative widget & window configuration
│       └── package.json
│
├── packages/
│   └── widget-sdk/              # Shared widget SDK contracts & bridge
│       ├── src/
│       │   ├── types.ts         # Manifest, Installation, Config, Instance interfaces
│       │   ├── bridge.ts        # Runtime URL params & host bridge
│       │   └── index.ts
│       └── package.json
│
├── package.json                 # Monorepo root workspaces configuration
└── README.md
```

---

## 🧱 Architectural Layers

1. **UI Layer** (`apps/desktop/src/pages`, `components`):
   - Pure presentation. Never manages OS windows or persistent storage directly.
   - Listens to reactive state from the store.

2. **Application Store** (`apps/desktop/src/store`):
   - Manages active UI state, installed widgets list, and running instances.

3. **Widget Manager & Services** (`apps/desktop/src/services`):
   - `widgetManager.ts`: Lifecycle operations (`installWidget`, `uninstallWidget`, `launchWidget`, `updateWidget`, `closeWidget`).
   - `catalogService.ts`: Manages available catalog items (ready for backend API connection).
   - `storageService.ts`: Local storage persistence for installation records and configurations.
   - `osService.ts`: Windows startup and OS level integrations.

4. **Tauri / OS Window Layer** (`apps/desktop/src/services/windowService.ts` & `src-tauri`):
   - Bridges to native Windows desktop APIs.
   - Opens independent windows with `transparent: true`, `decorations: false`, `alwaysOnTop: true`, `resizable: false`, and `data-tauri-drag-region`.
   - Supports seamless browser fallback mode for rapid development.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js**: v18+ (Node v24 tested)
* **npm**: v9+
* **Rust**: Toolchain for Tauri 2 (e.g. `x86_64-pc-windows-gnu` with MinGW or MSVC)
* **Microsoft Edge WebView2**: Pre-installed on Windows 10/11

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Desktop Hub

To run with Tauri 2 on Windows:

```bash
npm run tauri dev
```

To run in browser dev mode (for fast UI & widget component iteration):

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
npm run tauri build
```

---

## 🧩 Adding a New Widget

To add a new widget (e.g., `weather`):

1. Create a new directory in `widgets/<widget-id>/` with `manifest.json` and React component.
2. Register the widget in `apps/desktop/src/widgets/registry.ts`:
   ```typescript
   widgetRegistry.register({
     manifest: weatherManifest,
     component: WeatherWidget,
   });
   ```
3. Add the manifest entry to `catalogService.ts`.
4. The widget is now immediately installable and launchable as an independent desktop window!