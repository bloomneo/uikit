#!/usr/bin/env node
/**
 * Cross-platform CSS build for @bloomneo/uikit.
 *
 * Replaces the old shell-based pipeline (`tailwindcss ... && cat ... > ... && rm ...`)
 * which broke on Windows. Produces:
 *
 *   dist/styles.css              — theme tokens ONLY (raw palette removed)
 *   dist/styles/permissive.css   — 2.x behaviour, for migration
 *
 * Both files are independently importable via package.json exports:
 *   import '@bloomneo/uikit/styles';              // themed palette only
 *   import '@bloomneo/uikit/styles/permissive';   // 2.x, migration only
 *
 * 4.1.0 removed the font bundle. Its 11 families existed only for the
 * elegant/metro/studio/vivid presets that 4.0 deleted; `base` uses system
 * fonts, so it was 3.4 MB serving nothing.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const input = resolve(root, 'src/styles/globals.css');
const permissiveInput = resolve(root, 'src/styles/permissive.css');
const coreOut = resolve(root, 'dist/styles.css');
const permissiveOut = resolve(root, 'dist/styles/permissive.css');

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function build() {
  if (!existsSync(input)) {
    console.error(`[build-styles] Input not found: ${input}`);
    process.exit(1);
  }
  if (!existsSync(permissiveInput)) {
    console.error(`[build-styles] Permissive input not found: ${permissiveInput}`);
    process.exit(1);
  }

  ensureDir(coreOut);
  ensureDir(permissiveOut);

  // 1. Build the core stylesheet (Tailwind + theme tokens, no fonts).
  // Use `npx` so the local `node_modules/.bin/tailwindcss` is found regardless
  // of whether the user has tailwind installed globally.
  console.log('[build-styles] Building core styles → dist/styles.css');
  execSync(
    `npx tailwindcss -i "${input}" -o "${coreOut}" --minify`,
    { stdio: 'inherit', cwd: root }
  );

  // 2. Copy the theme source verbatim — it is consumed by the CONSUMER's
  //    Tailwind build, so it must stay unprocessed. Compiling it here would
  //    defeat the point: the reset has to run against their source scan.
  console.log('[build-styles] Copying theme source → dist/theme.css');
  const themeSrc = resolve(root, 'src/styles/theme.css');
  const themeOut = resolve(root, 'dist/theme.css');
  ensureDir(themeOut);
  let themeCss = readFileSync(themeSrc, 'utf8');
  // `@import "./_tokens.css"` would dangle once flattened into dist/.
  themeCss = themeCss.replace('@import "./_tokens.css";', readFileSync(resolve(root, 'src/styles/_tokens.css'), 'utf8'));
  writeFileSync(themeOut, themeCss);

  // 3. Build the permissive stylesheet — 2.x behaviour, migration only.
  console.log('[build-styles] Building permissive styles → dist/styles/permissive.css');
  execSync(
    `npx tailwindcss -i "${permissiveInput}" -o "${permissiveOut}" --minify`,
    { stdio: 'inherit', cwd: root }
  );

  console.log('[build-styles] Done.');
}

build();
