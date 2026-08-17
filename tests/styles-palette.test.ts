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
import { mkdtempSync, writeFileSync, readFileSync, rmSync, readdirSync, existsSync } from 'node:fs';
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

  /*
   * `black` and `white` carry no numeric shade, so the pattern above could
   * never match them — and the palette reset removes them just the same.
   *
   * That hole shipped: DialogOverlay and SheetOverlay both used `bg-black/50`,
   * which compiled to nothing, so every modal opened with NO dim behind it.
   * The page stayed fully visible under the dialog and nothing errored.
   */
  const BLACK_WHITE = new RegExp(
    String.raw`\b(bg|text|border|ring|from|via|to|fill|stroke|divide|placeholder|accent|caret|outline|shadow|decoration)-(black|white)(\/\d+)?\b`,
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
    expect(files.length).toBeGreaterThan(20);
  });

  for (const file of files) {
    const rel = file.slice(file.indexOf('src/'));
    it(`${rel} uses only semantic colour classes`, () => {
      const src = readFileSync(file, 'utf8');
      const hits = [...new Set([...(src.match(RAW) ?? []), ...(src.match(BLACK_WHITE) ?? [])])];
      expect(hits, `${rel} would render unstyled under the default stylesheet: ${hits.join(', ')}`).toEqual([]);
    });
  }
});

describe('the lockdown holds in a CONSUMER build (not just uikit\'s own)', () => {
  // The failure this exists to prevent: 3.0 was one verification away from
  // shipping a headline promise that was false in the only situation it
  // mattered. A consuming app runs its OWN `@import "tailwindcss"`, which
  // generates whatever utilities ITS source uses — `bg-blue-600` included —
  // no matter what prebuilt CSS uikit ships. The reset only takes effect when
  // it participates in the build that scans the app's code, which is why
  // `@bloomneo/uikit/theme` is shipped as source rather than compiled.
  let out = '';

  beforeAll(() => {
    // Inside the repo on purpose: a temp dir outside it cannot resolve
    // `tailwindcss`, and this fixture imports the framework the way a real
    // consumer does rather than by absolute path.
    const dir = mkdtempSync(join(resolve(__dirname, '..'), '.consumer-'));
    writeFileSync(
      join(dir, 'App.tsx'),
      `export default () => <div className="bg-blue-600 text-gray-900 bg-primary bg-contrast bg-success">x</div>;`,
    );
    writeFileSync(
      join(dir, 'index.css'),
      // The PACKAGE SPECIFIER, not a relative path. 3.0.0 shipped with no
      // `style` export condition, so this exact line failed to resolve for
      // every consumer — while a relative-path test passed happily. Test the
      // string a user actually writes.
      `@import "tailwindcss";\n@import "@bloomneo/uikit/theme";\n@source "${join(dir, 'App.tsx')}";\n`,
    );
    execFileSync('npx', ['@tailwindcss/cli', '-i', join(dir, 'index.css'), '-o', join(dir, 'out.css')], {
      cwd: resolve(__dirname, '..'),
      stdio: 'pipe',
    });
    out = readFileSync(join(dir, 'out.css'), 'utf8');
    rmSync(dir, { recursive: true, force: true });
  }, 120_000);

  it('compiled something (guards a vacuous pass)', () => {
    expect(out.length).toBeGreaterThan(1_000);
  });

  for (const cls of ['bg-primary', 'bg-contrast', 'bg-success']) {
    it(`consumer can use .${cls}`, () => expect(out).toContain(`.${cls}`));
  }

  for (const cls of ['bg-blue-600', 'text-gray-900']) {
    it(`consumer CANNOT use .${cls}`, () => expect(out).not.toContain(`.${cls}`));
  }
});

describe('theme.css stays a wrapper over _tokens.css (single source of truth)', () => {
  // 4.0 nearly shipped a stale `theme.css`: a `voila-bundle` run in 2025 left
  // an inline copy of every token in it, and because that copy had no
  // `@import "./_tokens.css"` line, the inline step in build-styles.mjs was a
  // silent no-op. The token cleanup landed in `_tokens.css` and never reached
  // `dist/theme.css` — the file every Tailwind-running consumer imports. The
  // build succeeded, the tests passed, and the shipped artefact was wrong.
  const themeSrc = readFileSync(join(ROOT, 'src/styles/theme.css'), 'utf8');
  const themeDist = readFileSync(join(ROOT, 'dist/theme.css'), 'utf8');

  it('theme.css imports _tokens.css, so the build can inline it', () => {
    expect(themeSrc).toContain('@import "./_tokens.css";');
  });

  it('theme.css defines no tokens of its own', () => {
    const decls = themeSrc.match(/^\s*--color-[a-z-]+:/gm) ?? [];
    expect(decls).toEqual([]);
  });

  it('the built theme.css actually carries the tokens (inline step ran)', () => {
    expect(themeDist).toMatch(/--color-primary:\s*\S/);
    expect(themeDist).toContain('--color-*: initial');
    // A live import would dangle once flattened into dist/. Match only at the
    // start of a line — the maintenance note in the header quotes the string.
    expect(themeDist).not.toMatch(/^\s*@import "\.\/_tokens\.css";/m);
  });

  it('ships only the themes that still exist', () => {
    const themes = [...new Set([...themeDist.matchAll(/\.theme-([a-z]+)/g)].map((m) => m[1]))];
    expect(themes.sort()).toEqual(['base']);
  });

  it('every token in _tokens.css survives into dist/theme.css', () => {
    const tokens = readFileSync(join(ROOT, 'src/styles/_tokens.css'), 'utf8');
    const names = [...new Set([...tokens.matchAll(/^\s*(--color-[a-z0-9-]+):/gm)].map((m) => m[1]))];
    expect(names.length).toBeGreaterThan(20);
    expect(names.filter((n) => !themeDist.includes(`${n}:`))).toEqual([]);
  });
});

describe('token hygiene (4.1)', () => {
  const tokens = readFileSync(join(ROOT, 'src/styles/_tokens.css'), 'utf8');
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

  it('declares each token once per block, and has exactly one of each block', () => {
    // A token legitimately appears twice overall: once in `@theme` (light) and
    // once in `.theme-base.dark`. What must never recur is a whole DUPLICATED
    // SECTION — `uikit bundle` used to APPEND a fresh theme block instead of
    // replacing the old one, so this file carried every token four times and
    // the copies silently disagreed on `success` and `warning`. Later-wins made
    // that invisible until someone edited the copy that had stopped mattering.
    const blocks = [...tokens.matchAll(/(@theme|\.theme-base\.dark)\s*\{([\s\S]*?)\n\}/g)];
    const kinds = blocks.map((b) => b[1]);
    expect(kinds.filter((k) => k === '@theme')).toHaveLength(1);
    expect(kinds.filter((k) => k === '.theme-base.dark')).toHaveLength(1);

    for (const [, kind, body] of blocks) {
      const counts = new Map<string, number>();
      for (const m of body.matchAll(/^\s*(--color-[a-z0-9-]+):/gm)) {
        counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
      }
      const dupes = [...counts].filter(([, n]) => n > 1).map(([k, n]) => `${kind} ${k} x${n}`);
      expect(dupes).toEqual([]);
    }
  });

  it('ships no font bundle for themes that no longer exist', () => {
    // 4.0 deleted elegant/metro/studio/vivid but kept 3.4 MB of their
    // typefaces — 56% of the published package. `base` uses system fonts.
    expect(existsSync(join(ROOT, 'src/fonts'))).toBe(false);
    expect(existsSync(join(ROOT, 'src/styles/fonts.css'))).toBe(false);
    expect(Object.keys(pkg.exports)).not.toContain('./styles/fonts');
  });

  it('carries no --voila-* tokens (no component ever read them)', () => {
    expect(tokens).not.toMatch(/--voila-/);
  });

  it('the chart ramp is five distinguishable hues, not one hue in five tints', () => {
    // A monochrome ramp is unreadable in a donut or a stacked bar. Compare hue
    // angles: five shades of one blue collapse to ~the same angle.
    const hue = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
      const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
      if (d === 0) return 0;
      const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      return (h * 60 + 360) % 360;
    };
    const ramp = [...tokens.matchAll(/--color-chart([1-5]):\s*(#[0-9A-Fa-f]{6})/g)]
      .slice(0, 5)
      .map((m) => hue(m[2]));
    expect(ramp).toHaveLength(5);
    const spread = new Set(ramp.map((h) => Math.round(h / 30)));
    expect(spread.size).toBeGreaterThanOrEqual(4);
  });
});


describe('a consumer needs no @source of its own', () => {
  /*
   * The failure this prevents: Tailwind only emits a utility it can SEE in
   * scanned source, and it never scans node_modules. UIKit's components carry
   * their own classes (`bg-muted` on TabsList, `bg-popover` on DropdownMenu),
   * so a consuming app got NONE of them — 22 were missing in a freshly
   * scaffolded Bloom app. Nothing errored. The visible symptom was a tab strip
   * with no pill behind it, which reads as a design mistake rather than a
   * missing stylesheet.
   *
   * Telling every consumer to add `@source` themselves is a rule that lives
   * only in documentation. `dist/theme.css` carries it instead, and `@source`
   * resolves relative to the file containing it — so importing the theme is
   * enough. This test compiles a consumer that never mentions @source.
   */
  let out = '';

  beforeAll(() => {
    const dir = mkdtempSync(join(resolve(__dirname, '..'), '.consumer-src-'));
    writeFileSync(join(dir, 'App.tsx'), `export default () => <div className="bg-background">x</div>;`);
    // `source(none)` disables Tailwind's automatic content detection, so the
    // ONLY inputs are the explicit @source directives below. Without it this
    // fixture passes even when the fix is removed: it lives inside the uikit
    // repo, and auto-detection scans the working directory — which contains
    // dist/*.js. The test then proves nothing. Verified by deleting the
    // @source line from theme.css and watching this go red.
    writeFileSync(
      join(dir, 'index.css'),
      `@import "tailwindcss" source(none);\n@import "@bloomneo/uikit/theme";\n@source "${join(dir, 'App.tsx')}";\n`,
    );
    execFileSync('npx', ['@tailwindcss/cli', '-i', join(dir, 'index.css'), '-o', join(dir, 'out.css')], {
      cwd: resolve(__dirname, '..'),
      stdio: 'pipe',
    });
    out = readFileSync(join(dir, 'out.css'), 'utf8');
    rmSync(dir, { recursive: true, force: true });
  }, 120_000);

  it('theme.css ships an @source directive', () => {
    expect(readFileSync(join(ROOT, 'dist/theme.css'), 'utf8')).toMatch(/^@source\s/m);
  });

  it('compiled something (guards a vacuous pass)', () => {
    expect(out.length).toBeGreaterThan(5_000);
  });

  // Classes UIKit writes internally and a consuming app would never type.
  for (const cls of ['bg-muted', 'bg-popover', 'bg-destructive', 'bg-success']) {
    it(`emits .${cls} for the components, unprompted`, () => {
      expect(out).toContain(`.${cls}`);
    });
  }

  it('still blocks the raw palette', () => {
    expect(out).not.toContain('.bg-blue-600');
  });
});
