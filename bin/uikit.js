#!/usr/bin/env node

/**
 * @fileoverview UIKit CLI - Unified command line interface for @voilajsx/uikit
 * @description Main CLI entry point with subcommands: create, bundle, serve, build, deploy
 * @package @voilajsx/uikit
 * @file /bin/uikit.js
 */

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

program
  .name('uikit')
  .description('🎨 UIKit CLI - Create projects, generate themes, and build apps')
  .version(packageJson.version);

// Create command
program
  .command('create')
  .description('Create a new UIKit project')
  .argument('<name>', 'project name')
  .option('--spa', 'create single page application template')
  .option('--multi', 'create multi-page template with routing')
  .option('--fbca', 'create feature-based component architecture template')
  .option('--single', 'create single-page theme showcase (default)')
  .option('--theme <theme>', 'default theme (base|elegant|metro|studio|vivid)', 'base')
  .action(async (name, options) => {
    const { createProject } = await import('./commands/create.js');
    await createProject(name, options);
  });

// Bundle command
program
  .command('bundle')
  .description('Bundle custom themes into CSS (supports SPA/Multi/FBCA)')
  .option('--output <path>', 'output file path')
  .option('--watch', 'watch for changes and rebuild')
  .option('--verbose', 'verbose logging')
  .action(async (options) => {
    const { bundleThemes } = await import('./commands/bundle.js');
    await bundleThemes(options);
  });

// Serve command
program
  .command('serve')
  .description('Start development server')
  .option('--port <number>', 'port number', '5173')
  .option('--restart', 'force restart (kill existing processes)')
  .option('--open', 'automatically open browser')
  .action(async (options) => {
    const { startServer } = await import('./commands/serve.js');
    await startServer(options);
  });

// Build command
program
  .command('build')
  .description('Build for production')
  .option('--outDir <dir>', 'output directory', 'dist')
  .option('--analyze', 'analyze bundle size')
  .action(async (options) => {
    const { buildProject } = await import('./commands/build.js');
    await buildProject(options);
  });

// Generate command
program
  .command('generate')
  .alias('g')
  .description('Generate features, components, or custom themes')
  .argument('<type>', 'type (page|component|hook|feature|theme)')
  .argument('<name>', 'name (e.g., auth, brand, my-component)')
  .option('--page', 'generate page component with routing')
  .option('--component', 'generate reusable component')
  .option('--feature', 'generate complete feature with pages and components')
  .option('--theme <theme>', 'UIKit theme to use (base|elegant|metro|studio|vivid)', 'base')
  .action(async (type, name, options) => {
    const { generateFeature } = await import('./commands/generate.js');
    await generateFeature(type, name, options);
  });

// Deploy command
program
  .command('deploy')
  .description('Generate static site for deployment')
  .option('--base <path>', 'base path for deployment', '/')
  .option('--github', 'optimize for GitHub Pages')
  .action(async (options) => {
    const { deployProject } = await import('./commands/deploy.js');
    await deployProject(options);
  });

// Prerender command
program
  .command('prerender')
  .description('Pre-render SPA routes to static HTML for SEO')
  .option('--dist <dir>', 'distribution directory', 'dist')
  .option('--port <number>', 'server port for rendering', '4567')
  .option('--routes <routes>', 'comma-separated routes or "auto"', '/')
  .option('--config <file>', 'SEO config JSON file', 'seo.config.json')
  .option('--baseUrl <url>', 'base URL for canonical links')
  .action(async (options) => {
    const { prerenderPages } = await import('./commands/prerender.js');
    await prerenderPages(options);
  });

// Optimize command
program
  .command('optimize')
  .description('Optimize images (convert to WebP, compress)')
  .option('--dir <path>', 'directory to scan', 'public')
  .option('--quality <number>', 'WebP quality 0-100', '80')
  .option('--maxWidth <number>', 'max width in pixels', '1200')
  .option('--webp-only', 'only generate WebP, skip PNG fallback')
  .action(async (options) => {
    const { optimizeImages } = await import('./commands/optimize.js');
    await optimizeImages(options);
  });

// Parse arguments
program.parse();