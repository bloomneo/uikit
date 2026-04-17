/**
 * scripts/check-doc-drift.ts
 *
 * Fails if any stale scope reference, renamed prop, or hallucinated method
 * appears in docs, examples, cookbook, skills, or the source tree. The
 * lightweight drift gate — catches regressions without a full AST parse.
 *
 * Run:  npm run check:docs
 * Wire: GitHub Actions runs this on every PR (see .github/workflows/ci.yml).
 *
 * Extending: when a rename lands, add the OLD name here so no future
 * contributor can reintroduce it via docs. Each entry is a regex + the
 * correct replacement for the error message.
 *
 * Migration-table safety: lines containing `→` or `->` only have their
 * right-hand side scanned. Migration tables reference the banned name on
 * purpose (that's the whole point) and must not self-fail this gate.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

type Banned = { pattern: RegExp; now: string };

const BANNED: Banned[] = [
  // Old scope — renamed to @bloomneo in 1.5.0, no aliases kept
  { pattern: /@voilajsx\/uikit/,               now: '@bloomneo/uikit' },

  // Combobox uses onChange, NOT onValueChange (custom component, not Radix)
  { pattern: /<Combobox[^>]*\bonValueChange\b/, now: '<Combobox onChange={setValue} ...>' },

  // Select uses onValueChange, NOT onChange (Radix wrapper)
  { pattern: /<Select[^>]*\bonChange\b/,        now: '<Select onValueChange={setValue} ...>' },

  // DataTable data prop — never undefined, always an array
  { pattern: /<DataTable[^>]*\bdata=\{undefined\}/, now: '<DataTable data={[]} ...> (while loading)' },

  // FormController is the legacy alias for react-hook-form's FormField —
  // new code should use <FormField> directly
  { pattern: /\bimport[^;]*FormController[^;]*from\s+['"]@bloomneo\/uikit['"]/,
    now: "import { FormField } from '@bloomneo/uikit'" },

  // clsx vs cn — uikit exports `cn()`, not a re-exported clsx
  { pattern: /import\s+clsx\s+from\s+['"]@bloomneo\/uikit/, now: "import { cn } from '@bloomneo/uikit'" },
];

const SCAN: string[] = [
  'AGENTS.md',
  'llms.txt',
  'README.md',
];

function addDir(rel: string, exts: RegExp) {
  const abs = join(ROOT, rel);
  let entries: string[];
  try { entries = readdirSync(abs); } catch { return; }
  for (const f of entries) {
    const full = join(rel, f);
    const fullAbs = join(ROOT, full);
    if (statSync(fullAbs).isDirectory()) {
      addDir(full, exts);
    } else if (exts.test(f)) {
      SCAN.push(full);
    }
  }
}

// Examples + cookbook — consumer-facing, must not drift
addDir('examples', /\.(tsx?|md)$/);
addDir('cookbook', /\.(tsx?|md)$/);

// Skills ship to agents via the tarball — drift here misleads tooling
addDir('skills', /\.(md|tsx?)$/);

// Scaffolding templates — ship to every downstream consumer
addDir('bin', /\.(template|tsx?|jsx?|md)$/);

// Source tree (excluding .test.tsx — tests deliberately reference banned
// names inside negative assertions, and dist/ is generated output)
function addSrc(rel: string) {
  const abs = join(ROOT, rel);
  let entries: string[];
  try { entries = readdirSync(abs); } catch { return; }
  for (const f of entries) {
    const full = join(rel, f);
    const fullAbs = join(ROOT, full);
    if (statSync(fullAbs).isDirectory()) {
      addSrc(full);
    } else if (/\.tsx?$/.test(f) && !/\.(test|spec)\.tsx?$/.test(f) && !f.endsWith('.d.ts')) {
      SCAN.push(full);
    }
  }
}
addSrc('src');

let violations = 0;
for (const file of SCAN) {
  const content = readFileSync(join(ROOT, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // Strip inline code spans — quoted references like `onValueChange` in
    // prose are discussing drift, not introducing it.
    let clean = line.replace(/`[^`]*`/g, '');

    // Migration arrow: `<old> → <new>` lines are supposed to mention the
    // banned name on the left. Only scan the right side.
    const arrowMatch = clean.match(/^(.*?)(?:→|->)(.*)$/);
    if (arrowMatch) clean = arrowMatch[2];

    // Negative-example pairs: docs teach drift patterns with
    //   // ❌ <bad example>
    //   <bad code line>
    // The banned pattern on the next line is intentional. If the previous
    // non-empty line contains ❌, skip drift checks here.
    const prev = lines[i - 1] ?? '';
    if (prev.includes('❌')) return;

    // Diff-block removals: `- <old code>` followed by `+ <new code>` is a
    // migration diff. The `-` line is supposed to contain the banned name.
    const next = lines[i + 1] ?? '';
    if (/^-\s/.test(line) && /^\+\s/.test(next)) return;

    for (const { pattern, now } of BANNED) {
      if (pattern.test(clean)) {
        console.error(
          `  ${file}:${i + 1}\n    ${line.trim()}\n    → use: ${now}`,
        );
        violations++;
      }
    }
  });
}

if (violations > 0) {
  console.error(`\nFAIL: ${violations} stale/hallucinated reference(s) in docs/src.\n`);
  process.exit(1);
}
console.log(`OK: scanned ${SCAN.length} files, no drift.`);
