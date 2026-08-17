#!/usr/bin/env node
/**
 * Cross-platform CSS build for @bloomneo/uikit.
 *
 * Replaces the old shell-based pipeline (`tailwindcss ... && cat ... > ... && rm ...`)
 * which broke on Windows. Produces:
 *
 *   dist/styles.css         — permissive: theme tokens + Tailwind's palette
 *   dist/styles/strict.css  — strict: theme tokens ONLY, raw palette removed
 *   dist/styles/fonts.css   — opt-in @font-face declarations for built-in themes
 *
 * Both files are independently importable via package.json exports:
 *   import '@bloomneo/uikit/styles';          // permissive (2.x behaviour)
 *   import '@bloomneo/uikit/styles/strict';   // themed palette only
 *   import '@bloomneo/uikit/styles/fonts';
 */

import { execSync } from 'node:child_process';
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const input = resolve(root, 'src/styles/globals.css');
const strictInput = resolve(root, 'src/styles/strict.css');
const fontsSrc = resolve(root, 'src/styles/fonts.css');
const coreOut = resolve(root, 'dist/styles.css');
const strictOut = resolve(root, 'dist/styles/strict.css');
const fontsOut = resolve(root, 'dist/styles/fonts.css');

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function build() {
  if (!existsSync(input)) {
    console.error(`[build-styles] Input not found: ${input}`);
    process.exit(1);
  }
  if (!existsSync(fontsSrc)) {
    console.error(`[build-styles] Fonts source not found: ${fontsSrc}`);
    process.exit(1);
  }

  if (!existsSync(strictInput)) {
    console.error(`[build-styles] Strict input not found: ${strictInput}`);
    process.exit(1);
  }

  ensureDir(coreOut);
  ensureDir(strictOut);
  ensureDir(fontsOut);

  // 1. Build the core stylesheet (Tailwind + theme tokens, no fonts).
  // Use `npx` so the local `node_modules/.bin/tailwindcss` is found regardless
  // of whether the user has tailwind installed globally.
  console.log('[build-styles] Building core styles → dist/styles.css');
  execSync(
    `npx tailwindcss -i "${input}" -o "${coreOut}" --minify`,
    { stdio: 'inherit', cwd: root }
  );

  // 2. Build the strict stylesheet — same tokens, Tailwind's default palette
  //    removed so the theme cannot be bypassed with `bg-blue-600`.
  console.log('[build-styles] Building strict styles → dist/styles/strict.css');
  execSync(
    `npx tailwindcss -i "${strictInput}" -o "${strictOut}" --minify`,
    { stdio: 'inherit', cwd: root }
  );

  // 3. Copy fonts.css verbatim to its own subpath. The @font-face declarations
  //    reference relative font files in dist/fonts/, which build:fonts copies.
  console.log('[build-styles] Copying fonts → dist/styles/fonts.css');
  copyFileSync(fontsSrc, fontsOut);

  console.log('[build-styles] Done.');
}

build();
