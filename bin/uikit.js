#!/usr/bin/env node

/**
 * @fileoverview UIKit CLI - Unified command line interface for @bloomneo/uikit
 * @description Theme tooling only: `generate` scaffolds pieces into an existing
 *   app, `bundle` compiles custom themes to CSS. Whole-app scaffolding and the
 *   app lifecycle (create/serve/build/deploy/prerender/optimize) were removed in
 *   4.0.0 — that is `@bloomneo/bloom`'s job, and the templates here shipped the
 *   very layout chrome 4.0.0 deleted.
 * @package @bloomneo/uikit
 * @file /bin/uikit.js
 */

import { program } from 'commander';
import fs from 'fs';

// Read package.json for version
const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

program
  .name('uikit')
  .description('🎨 UIKit CLI - Generate app pieces and bundle custom themes')
  .version(packageJson.version);

// Generate command
program
  .command('generate')
  .alias('g')
  .description('Generate pages, components, hooks, features, or custom themes')
  .argument('<type>', 'type (page|component|hook|feature|theme)')
  .argument('<name>', 'name (e.g., auth, brand, my-component)')
  .option('--page', 'generate page component with routing')
  .option('--component', 'generate reusable component')
  .option('--feature', 'generate complete feature with pages and components')
  .action(async (type, name, options) => {
    const { generateFeature } = await import('./commands/generate.js');
    await generateFeature(type, name, options);
  });

// Bundle command
program
  .command('bundle')
  .description('Bundle custom themes into CSS')
  .option('--output <path>', 'output file path')
  .option('--watch', 'watch for changes and rebuild')
  .option('--verbose', 'verbose logging')
  .action(async (options) => {
    const { bundleThemes } = await import('./commands/bundle.js');
    await bundleThemes(options);
  });

program.addHelpText(
  'after',
  `
To scaffold a new application, use @bloomneo/bloom:
  npx @bloomneo/bloom create my-app
`
);

// Parse arguments
program.parse();
