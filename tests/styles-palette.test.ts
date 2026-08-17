/**
 * tests/styles-strict.test.ts
 *
 * The strict stylesheet's whole value is that `bg-blue-600` produces nothing.
 * That property is invisible in review and easy to break silently — during
 * development the reset was placed one import too early and did nothing at
 * all, while the file still looked correct and the build still passed. The
 * only honest check is to compile Tailwind and inspect the output.
 *
 * Runs the real Tailwind CLI against both entries, so it also guards the
 * split between globals.css / strict.css / _tokens.css.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');

/** Classes an app should be able to use — the semantic token surface. */
const SEMANTIC = [
  'bg-primary',
  'text-primary-foreground',
  'bg-card',
  'text-muted-foreground',
  'bg-destructive',
  'text-foreground',
  'border-border',
  'border-input',
];

/** Raw palette classes — available in permissive, gone in strict. */
const RAW_PALETTE = [
  'bg-blue-600',
  'text-gray-900',
  'border-red-400',
  'bg-slate-50',
  'text-emerald-500',
];

let dir: string;
const compiled: Record<'globals' | 'permissive', string> = { globals: '', permissive: '' };

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), 'uikit-styles-'));
  writeFileSync(join(dir, 'probe.html'), `<div class="${[...SEMANTIC, ...RAW_PALETTE].join(' ')}"></div>`);

  for (const entry of ['globals', 'permissive'] as const) {
    const inFile = join(dir, `${entry}.css`);
    const outFile = join(dir, `${entry}.out.css`);
    writeFileSync(
      inFile,
      `@import "${join(ROOT, 'src/styles', `${entry}.css`)}";\n@source "${join(dir, 'probe.html')}";\n`,
    );
    execFileSync('npx', ['@tailwindcss/cli', '-i', inFile, '-o', outFile], { cwd: ROOT, stdio: 'pipe' });
    compiled[entry] = readFileSync(outFile, 'utf8');
  }
}, 120_000);

afterAll(() => {
  if (dir) rmSync(dir, { recursive: true, force: true });
});

describe('@bloomneo/uikit/styles/permissive (migration only)', () => {
  for (const cls of SEMANTIC) {
    it(`emits .${cls}`, () => expect(compiled.permissive).toContain(`.${cls}`));
  }

  // Kept deliberately: existing apps carry thousands of these, and 3.0 must
  // not silently unstyle them on upgrade.
  for (const cls of RAW_PALETTE) {
    it(`still emits .${cls} (2.x compatibility)`, () => expect(compiled.permissive).toContain(`.${cls}`));
  }
});

describe('@bloomneo/uikit/styles (default — strict)', () => {
  for (const cls of SEMANTIC) {
    it(`emits .${cls}`, () => expect(compiled.globals).toContain(`.${cls}`));
  }

  for (const cls of RAW_PALETTE) {
    it(`does NOT emit .${cls} — the theme cannot be bypassed`, () => {
      expect(compiled.globals).not.toContain(`.${cls}`);
    });
  }

  it('is smaller than the permissive sheet', () => {
    expect(compiled.globals.length).toBeLessThan(compiled.permissive.length);
  });

  it('actually compiled something (guards against an empty-output false pass)', () => {
    expect(compiled.globals.length).toBeGreaterThan(10_000);
  });
});

describe('uikit does not use the palette it removes', () => {
  // Shipping the strict sheet while the library's own components were built on
  // `zinc-*` would have rendered every tone="contrast" surface unstyled —
  // header, footer, admin sidebar, mobile, popup, blank. That regression was
  // live in 3.0.0 until this check was written, so it stays.
  const RAW = new RegExp(
    String.raw`\b(bg|text|border|ring|from|via|to|fill|stroke|divide|placeholder|accent|caret|outline|shadow|decoration)-` +
      String.raw`(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-` +
      String.raw`(50|[1-9]00|950)\b`,
    'g',
  );

  const files = (function walk(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, acc);
      else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) acc.push(full);
    }
    return acc;
  })(resolve(__dirname, '../src/components'));

  it('finds source files to scan (guards against a vacuous pass)', () => {
    expect(files.length).toBeGreaterThan(30);
  });

  for (const file of files) {
    const rel = file.slice(file.indexOf('src/'));
    it(`${rel} uses only semantic colour classes`, () => {
      const hits = [...new Set(readFileSync(file, 'utf8').match(RAW) ?? [])];
      expect(hits, `${rel} would render unstyled under the default stylesheet: ${hits.join(', ')}`).toEqual([]);
    });
  }
});
