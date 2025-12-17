# Changelog

All notable changes to UIKit will be documented in this file.

## [1.4.0] - 2025-12-17

### Added
- **`npx uikit prerender`** - Pre-render SPA routes to static HTML for SEO optimization
  - Uses Puppeteer for headless rendering
  - Supports custom SEO config via `seo.config.json`
  - Auto-generates canonical URLs and meta tags
- **`npx uikit optimize`** - Optimize images for web
  - Converts PNG/JPG to WebP format
  - Compresses and resizes images
  - Generates PNG fallbacks for older browsers

### Changed
- Standardized all template package.json scripts across single/spa/multi/fbca
- Updated dependency versions across all templates (vite ^7.0.0, tailwindcss ^4.1.8)
- Added `prerender` and `optimize` scripts to all project templates

### Fixed
- Template inconsistencies where single/fbca were missing bundle/serve/deploy scripts
- Removed unused dependencies (path, url) from templates

## [1.3.0] - 2025-11-XX

### Added
- **MobileLayout** - New layout for Capacitor/mobile apps with safe areas and tab bars
- **PopupLayout** - Layout for browser extensions (Chrome/Firefox)
- Cross-platform support (Web, Mobile via Capacitor, Desktop via Tauri, Extensions)

### Changed
- Updated to React 19 support
- Improved TypeScript types across all components

## [1.2.0] - 2025-10-XX

### Added
- **FBCA Template** - Feature-Based Component Architecture with auto-discovery routing
- CLI code generation (`npx uikit generate feature/page/component`)
- Theme bundling with watch mode

## [1.1.0] - 2025-09-XX

### Added
- **5 Professional Themes** - base, elegant, metro, studio, vivid
- OKLCH color system for better color manipulation
- Dark mode support with automatic switching

## [1.0.0] - 2025-08-XX

### Added
- Initial release with 37+ components
- 6 layouts (Admin, Page, Auth, Mobile, Popup, Blank)
- CLI tools for project creation
- Tailwind CSS v4 integration
