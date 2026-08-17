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
