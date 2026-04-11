#!/usr/bin/env node
/**
 * Generate `dist/llms.txt` for @bloomneo/uikit.
 *
 * `llms.txt` is the canonical, machine-readable index of the library that AI
 * coding agents (Claude Code, Cursor, v0, etc) read to discover what exists.
 * It is regenerated on every build from three sources of truth:
 *
 *   1. `src/index.ts` — the canonical export list
 *   2. `examples/*.tsx` — one minimal example per component
 *   3. `cookbook/*.tsx` — composed multi-component patterns
 *
 * Anything in those three places is automatically included. Anything that
 * isn't is invisible — that is the enforcement mechanism for "the canonical
 * way to use this library is what's in examples/cookbook."
 *
 * Output is plain text with stable section headers so it's grep-friendly.
 * Designed to be small enough to fit in an agent's context window: only the
 * names, import paths, and example file pointers — not the full type
 * definitions, which agents can read from `dist/types/*.d.ts`.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const out = resolve(root, 'dist/llms.txt');
const indexFile = resolve(root, 'src/index.ts');
const examplesDir = resolve(root, 'examples');
const cookbookDir = resolve(root, 'cookbook');
const pkgFile = resolve(root, 'package.json');

function read(file) {
  return readFileSync(file, 'utf8');
}

function ensureDir(file) {
  mkdirSync(dirname(file), { recursive: true });
}

/* ------------------------------------------------------------------------- */
/* Parse src/index.ts to extract every named export                           */
/* ------------------------------------------------------------------------- */

function parseExports(source) {
  const named = new Set();
  // Match `export { A, B as C, type D } from '...'` and `export { A, B }`.
  const re = /export\s+(?:type\s+)?\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(source))) {
    const list = m[1];
    for (const part of list.split(',')) {
      const cleaned = part.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop();
      if (cleaned) named.add(cleaned);
    }
  }
  // Match `export { X } from './...'`
  // Match `export function/class/const NAME ...`
  const declRe = /export\s+(?:function|class|const|let|var|interface|type|enum)\s+([A-Za-z_][A-Za-z0-9_]*)/g;
  while ((m = declRe.exec(source))) {
    named.add(m[1]);
  }
  return [...named].sort();
}

/* ------------------------------------------------------------------------- */
/* Map example files to component names by filename + filename heuristics    */
/* ------------------------------------------------------------------------- */

function listSnippets(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .filter((f) => statSync(join(dir, f)).isFile())
    .sort();
}

function snippetTitle(file) {
  return file
    .replace(/\.tsx$/, '')
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

function snippetSource(dir, file) {
  return read(join(dir, file)).trimEnd();
}

/* ------------------------------------------------------------------------- */
/* Build the llms.txt content                                                 */
/* ------------------------------------------------------------------------- */

function build() {
  const pkg = JSON.parse(read(pkgFile));
  const indexSource = read(indexFile);
  const exportNames = parseExports(indexSource);

  const examples = listSnippets(examplesDir);
  const cookbook = listSnippets(cookbookDir);

  const lines = [];
  const push = (s) => lines.push(s);

  push(`# ${pkg.name} v${pkg.version}`);
  push('');
  push(pkg.description || '');
  push('');
  push('This file is the canonical machine-readable index of @bloomneo/uikit.');
  push('Read it first when generating code that uses this library.');
  push('');
  push('## Canonical import path');
  push('');
  push('There is exactly ONE supported import path for normal use:');
  push('');
  push("    import { Button, DataTable, /* etc */ } from '@bloomneo/uikit';");
  push('');
  push('Deep imports like `@bloomneo/uikit/button` exist for build-size');
  push('optimisation but are NOT the canonical form. When generating code,');
  push("always use the flat `from '@bloomneo/uikit'` import.");
  push('');
  push('## Required setup (one time per app)');
  push('');
  push('    // 1. Import the core stylesheet ONCE at app entry:');
  push("    import '@bloomneo/uikit/styles';");
  push('');
  push('    // 2. (Optional) If your theme uses the built-in Elegant / Metro / Studio /');
  push('    //    Vivid fonts, also import the fonts bundle:');
  push("    import '@bloomneo/uikit/styles/fonts';");
  push('');
  push('    // 3. Wrap your app:');
  push("    import { ThemeProvider, ToastProvider, ConfirmProvider } from '@bloomneo/uikit';");
  push('    <ThemeProvider theme="base" mode="light">');
  push('      <ToastProvider />');
  push('      <ConfirmProvider>');
  push('        <App />');
  push('      </ConfirmProvider>');
  push('    </ThemeProvider>');
  push('');
  push('    // 4. Add the FOUC inline script to your index.html <head> so themes');
  push('    //    apply before React mounts. See @bloomneo/uikit/fouc → foucScript().');
  push('');
  push('## Themes');
  push('');
  push('Built-in: base | elegant | metro | studio | vivid');
  push("Switch with `useTheme().setTheme('elegant')`. Custom themes are also allowed.");
  push('');
  push('## Examples — one canonical snippet per component');
  push('');
  push('Each example is a minimal, runnable file. When generating code, copy the');
  push('relevant example and modify the data — do not invent prop shapes.');
  push('');
  for (const file of examples) {
    if (file === 'README.md') continue;
    push(`### ${snippetTitle(file)}`);
    push(`File: examples/${file}`);
    push('');
    push('```tsx');
    push(snippetSource(examplesDir, file));
    push('```');
    push('');
  }

  push('## Cookbook — composed page patterns');
  push('');
  push('Whole-page recipes built from the primitives above. Start here when');
  push('building a new feature instead of designing from scratch.');
  push('');
  for (const file of cookbook) {
    if (file === 'README.md') continue;
    push(`### ${snippetTitle(file)}`);
    push(`File: cookbook/${file}`);
    push('');
    push('```tsx');
    push(snippetSource(cookbookDir, file));
    push('```');
    push('');
  }

  push('## Conventions');
  push('');
  push('- Always import from `@bloomneo/uikit` (single canonical entry).');
  push('- Pass `data` as an array (use `[]` while loading, never `undefined`).');
  push('- Every `<DataTable>` column needs a unique `id`.');
  push('- Mount `<ToastProvider />` and `<ConfirmProvider>` once at the app root.');
  push('- Use `useConfirm()` for delete flows — never manage open/close state by hand.');
  push('- Use the `format*` helpers for currency / dates / bytes — never inline `${val}`.');
  push('- Use `useBreakpoint("md")` to react to viewport changes — do not write resize listeners.');
  push('');
  push('## Full export list');
  push('');
  push('Every named export available from `@bloomneo/uikit`:');
  push('');
  for (const name of exportNames) {
    push(`- ${name}`);
  }
  push('');
  push('## Where to look next');
  push('');
  push('- Type definitions: `dist/types/index.d.ts` (full prop shapes)');
  push('- Source: https://github.com/bloomneo/uikit');
  push('- Issues: https://github.com/bloomneo/uikit/issues');
  push('');

  return lines.join('\n');
}

function main() {
  ensureDir(out);
  const content = build();
  writeFileSync(out, content, 'utf8');
  // Also write a copy at the package root so `npm pack` ships it without
  // depending on the dist/ wildcard. Cheap.
  writeFileSync(resolve(root, 'llms.txt'), content, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`[build-llms] Wrote ${out} (${content.length} bytes)`);
}

main();
