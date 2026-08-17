/**
 * tests/package-integrity.test.ts
 *
 * Checks the SHIPPED artefact rather than the source. Everything here exists
 * because it shipped broken at least once: a build can succeed, the source can
 * read correctly, and the published package still be wrong.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f, acc);
    else acc.push(f);
  }
  return acc;
}

describe('published type declarations', () => {
  const dts = walk(join(ROOT, 'dist/types')).filter((f) => f.endsWith('.d.ts'));

  it('emitted some declarations (guards a vacuous pass)', () => {
    expect(dts.length).toBeGreaterThan(20);
  });

  it('leak no build-time "@/" path aliases', () => {
    // `@/` resolves only inside this repo. When it survives into a .d.ts, the
    // consumer's TypeScript cannot resolve the import, the imported symbol
    // silently degrades to `any`, and every type derived from it collapses.
    //
    // This shipped: form-field.d.ts imported `Input` from '@/components/ui/input',
    // so PasswordInputProps lost its entire prop surface and
    // `<PasswordInput onChange={e => …} />` errored with an implicit-any `e`
    // in every strict consumer. useDataTable.d.ts had the same problem.
    const leaks = dts
      .filter((f) => /from ['"]@\//.test(readFileSync(f, 'utf8')))
      .map((f) => f.replace(ROOT + '/', ''));
    expect(leaks).toEqual([]);
  });

  it('every relative import in a .d.ts resolves to a file that exists', () => {
    const broken: string[] = [];
    for (const f of dts) {
      for (const m of readFileSync(f, 'utf8').matchAll(/from ['"](\.[^'"]*)['"]/g)) {
        const spec = m[1];
        const target = resolve(join(f, '..'), spec);
        // TypeScript maps an ESM-style `./x.js` specifier onto `./x.d.ts`, so
        // resolution must try that too — an earlier version of this check
        // reported `./presets/base.js` as broken when it resolves fine.
        const candidates = [
          target + '.d.ts',
          target + '/index.d.ts',
          target,
          target.replace(/\.js$/, '.d.ts'),
        ];
        const ok = candidates.some((c) => existsSync(c) && statSync(c).isFile());
        if (!ok) broken.push(`${f.replace(ROOT + '/', '')} -> ${m[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });
});

describe('package.json', () => {
  it('every exports subpath points at a file that exists', () => {
    const dangling: string[] = [];
    for (const [sub, val] of Object.entries(pkg.exports as Record<string, unknown>)) {
      const targets =
        typeof val === 'string' ? [val] : Object.values(val as Record<string, string>);
      for (const t of targets) {
        if (!existsSync(join(ROOT, t))) dangling.push(`${sub} -> ${t}`);
      }
    }
    expect(dangling).toEqual([]);
  });

  it('every declared bin points at a file that exists', () => {
    // 3.0.x shipped `voila-bundle -> bin/theme-bundler.js`, a file absent from
    // the tarball, so npm linked a binary that could never run.
    const missing = Object.entries(pkg.bin as Record<string, string>)
      .filter(([, p]) => !existsSync(join(ROOT, p)))
      .map(([n, p]) => `${n} -> ${p}`);
    expect(missing).toEqual([]);
  });

  it('declares no dependency the source never imports', () => {
    const src = walk(join(ROOT, 'src'))
      .concat(walk(join(ROOT, 'bin')))
      .concat(walk(join(ROOT, 'scripts')))
      .filter((f) => /\.(ts|tsx|js|mjs)$/.test(f))
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n');
    const unused = Object.keys(pkg.dependencies ?? {}).filter((d) => !src.includes(d));
    expect(unused).toEqual([]);
  });

  it('describes what the package actually is', () => {
    // The description is llms.txt's first line and npmjs.com's summary, so a
    // stale one misinforms every agent. 4.0 removed the layouts and the
    // scaffolder while the description still advertised both.
    expect(pkg.description).not.toMatch(/\blayouts\b/i);
    expect(pkg.description).not.toMatch(/\bscaffolding\b/i);
    expect(pkg.description).not.toMatch(/\brouting\b/i);
  });
});

describe('shipped examples and cookbook', () => {
  // These are the primary agent-facing artefact: llms.txt is generated from
  // them, and an agent copying one expects it to compile. Before 4.1.1 five of
  // them did not — `use-api.tsx` called `post<User>()` on a hook whose verbs
  // were not generic, and `theme-provider.tsx`'s `import '@bloomneo/uikit/styles'`
  // had no declaration to resolve (TS2882).
  const files = [
    ...readdirSync(join(ROOT, 'examples')).filter((f) => f.endsWith('.tsx')).map((f) => join('examples', f)),
    ...readdirSync(join(ROOT, 'cookbook')).filter((f) => f.endsWith('.tsx')).map((f) => join('cookbook', f)),
  ];

  // Everything the built declarations expose, values and types alike.
  const declared = new Set<string>();
  for (const f of walk(join(ROOT, 'dist/types')).filter((f) => f.endsWith('.d.ts'))) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/export\s+(?:declare\s+)?(?:const|function|class|interface|type|enum)\s+(\w+)/g)) {
      declared.add(m[1]);
    }
    for (const m of src.matchAll(/export\s*\{([^}]+)\}/g)) {
      for (const part of m[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/).pop()?.replace(/^type\s+/, '').trim();
        if (name) declared.add(name);
      }
    }
  }

  it('found the shipped files and the declared surface', () => {
    expect(files.length).toBeGreaterThan(15);
    expect(declared.size).toBeGreaterThan(100);
  });

  for (const rel of files) {
    it(`${rel} imports only symbols the package declares`, () => {
      const src = readFileSync(join(ROOT, rel), 'utf8');
      const imported = [...src.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s*from\s*'@bloomneo\/uikit'/g)]
        .flatMap((m) => m[1].split(','))
        .map((s) => s.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim())
        .filter(Boolean);
      const missing = imported.filter((n) => !declared.has(n));
      expect(missing, `${rel} imports symbols that do not exist: ${missing.join(', ')}`).toEqual([]);
    });
  }
});

describe('CSS subpaths carry type declarations', () => {
  // Without a `types` condition, `import '@bloomneo/uikit/styles'` is a TS2882
  // error in any strict consumer — including uikit's own setup example.
  for (const sub of ['./styles', './styles/permissive', './theme']) {
    it(`${sub} declares types`, () => {
      const entry = (pkg.exports as Record<string, Record<string, string>>)[sub];
      expect(entry, `${sub} is not exported`).toBeDefined();
      expect(entry.types, `${sub} has no types condition`).toBeTruthy();
      expect(existsSync(join(ROOT, entry.types))).toBe(true);
    });
  }
});


describe('components reference UIKit token names, not shadcn ones', () => {
  /*
   * UIKit's tokens are Tailwind v4 `@theme` names — `--color-popover`,
   * `--color-border`. shadcn uses bare `--popover` / `--border`. Code copied
   * from shadcn and not fully adapted therefore points at variables that do
   * not exist, and CSS resolves an undefined custom property to *nothing*
   * rather than erroring.
   *
   * That shipped in Toaster: `--normal-bg: var(--popover)` meant every toast
   * rendered with a fully transparent background, so the text sat unreadable
   * on top of whatever was behind it. Six references across two files.
   */
  const SHADCN_TOKENS = [
    'popover', 'popover-foreground', 'border', 'background', 'foreground',
    'card', 'card-foreground', 'primary', 'primary-foreground', 'secondary',
    'muted', 'muted-foreground', 'accent', 'destructive', 'input', 'ring',
  ];

  const files = walk(join(ROOT, 'src')).filter((f) => /\.(tsx|ts)$/.test(f) && !f.includes('.test.'));

  it('found source files to scan (guards a vacuous pass)', () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it('uses no bare shadcn custom properties', () => {
    const bad: string[] = [];
    for (const f of files) {
      for (const m of readFileSync(f, 'utf8').matchAll(/var\(--([a-z-]+)\)/g)) {
        // `--radix-*` and `--color-*` are legitimate; everything matching a
        // shadcn token name without the `color-` prefix is the bug.
        if (SHADCN_TOKENS.includes(m[1])) {
          bad.push(`${f.replace(ROOT + '/', '')}: var(--${m[1]}) should be var(--color-${m[1]})`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('interactive surfaces show a pointer cursor', () => {
  /*
   * Tailwind v4's Preflight sets `button { cursor: default }` — a change from
   * v3 — so every clickable surface needs `cursor-pointer` explicitly. shadcn's
   * sources predate that and additionally mark menu items `cursor-default`
   * (a desktop-menu convention). Copied verbatim, the result was that buttons,
   * tabs, dropdown items and select options all showed an arrow, and only real
   * <a href> elements showed a hand.
   */
  const files = walk(join(ROOT, 'src/components/ui')).filter((f) => f.endsWith('.tsx'));

  it('found components to scan (guards a vacuous pass)', () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it('no component ships cursor-default', () => {
    const offenders = files
      .filter((f) => readFileSync(f, 'utf8').includes('cursor-default'))
      .map((f) => f.replace(ROOT + '/', ''));
    expect(offenders).toEqual([]);
  });

  for (const name of ['button', 'tabs', 'dropdown-menu', 'select']) {
    it(`${name} declares cursor-pointer`, () => {
      expect(readFileSync(join(ROOT, `src/components/ui/${name}.tsx`), 'utf8')).toContain('cursor-pointer');
    });
  }

  /*
   * Enumerating components by hand missed the Dialog and Sheet close buttons —
   * they are raw Radix `Close` primitives rather than <Button>, so the first
   * cursor pass skipped them and the X kept an arrow cursor.
   *
   * So check the shape instead of a list: any Radix Close/Trigger given its own
   * className has opted out of Button's styling and has to say `cursor-pointer`
   * itself. That catches the next one without anyone remembering to add it.
   */
  it('every self-styled Radix Close/Trigger declares its own cursor', () => {
    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      for (const m of src.matchAll(/<\w+Primitive\.(Close|Trigger)\b([\s\S]{0,700}?)\/?>/g)) {
        const body = m[2];
        // Only those styling themselves; `asChild` delegates to a real Button.
        if (!body.includes('className=') || body.includes('asChild')) continue;
        if (!body.includes('cursor-pointer')) {
          offenders.push(`${f.replace(ROOT + '/', '')}: ${m[1]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
