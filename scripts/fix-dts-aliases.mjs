#!/usr/bin/env node
/**
 * Rewrite build-time `@/` path aliases to relative paths in the emitted .d.ts.
 *
 * WHY THIS EXISTS
 *
 * `@/` is a tsconfig `paths` alias. It resolves inside this repo and nowhere
 * else — but `tsc --emitDeclarationOnly` copies import specifiers through
 * verbatim, so any `@/` used in a TYPE position survives into the published
 * declarations. A consumer's TypeScript cannot resolve it, the imported symbol
 * silently degrades to `any`, and every type derived from it collapses with it.
 *
 * That shipped. `form-field.d.ts` imported `Input` from '@/components/ui/input',
 * so `PasswordInputProps extends Omit<ComponentProps<typeof Input>, 'type'>`
 * became `Omit<any, 'type'>` and this errored in every strict consumer:
 *
 *     <PasswordInput onChange={(e) => setX(e.target.value)} />
 *     //                        ^ Parameter 'e' implicitly has an 'any' type
 *
 * `useDataTable.d.ts` and `command.d.ts` had the same problem. Nothing caught
 * it: the build succeeded, the source was correct, and uikit's own typecheck
 * passed because inside this repo the alias resolves fine.
 *
 * Value imports (`cn`, `warnInDev`) are erased from declarations and never
 * leak, which is why this went unnoticed for so long — most `@/` imports are
 * harmless and the few that are not look identical in the source.
 *
 * Fixing it at emit time covers every case, including ones added later.
 * `tests/package-integrity.test.ts` asserts no alias survives.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const typesDir = join(root, 'dist/types');

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (full.endsWith('.d.ts')) acc.push(full);
  }
  return acc;
}

let filesChanged = 0;
let importsRewritten = 0;

for (const file of walk(typesDir)) {
  const before = readFileSync(file, 'utf8');

  // `@/x` maps to `src/x`, which maps to `dist/types/x`.
  const after = before.replace(/(['"])@\/([^'"]+)\1/g, (_m, quote, sub) => {
    let rel = relative(dirname(file), join(typesDir, sub));
    if (!rel.startsWith('.')) rel = './' + rel;
    importsRewritten++;
    return `${quote}${rel}${quote}`;
  });

  if (after !== before) {
    writeFileSync(file, after);
    filesChanged++;
  }
}

console.log(
  `[fix-dts-aliases] rewrote ${importsRewritten} alias import(s) across ${filesChanged} file(s)`,
);

// Fail loudly rather than ship a half-fixed artefact.
const leftover = walk(typesDir).filter((f) => /from\s*['"]@\//.test(readFileSync(f, 'utf8')));
if (leftover.length) {
  console.error('[fix-dts-aliases] FAILED — aliases remain in:');
  for (const f of leftover) console.error('  ' + relative(root, f));
  process.exit(1);
}
