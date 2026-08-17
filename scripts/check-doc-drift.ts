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

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

type Banned = { pattern: RegExp; now: string; raw?: boolean };

const BANNED: Banned[] = [
  // Old scope — renamed to @bloomneo in 1.5.0, no aliases kept
  { pattern: /@voilajsx\/uikit/,               now: '@bloomneo/uikit' },

  // Combobox uses onValueChange — unified with Select + every other
  // value-not-event picker in 2.0.0. Pre-2.0 onChange is gone, no alias.
  { pattern: /<Combobox[^>]*\bonChange\b/,      now: '<Combobox onValueChange={setValue} ...>' },

  // Select uses onValueChange (Radix), never onChange
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

// 4.0 removed the chrome (layouts, sections) and the never-imported primitives.
// Listing them here stops docs, examples or CLI templates from referencing a
// component that no longer exists — the drift that made the appkit skills
// document three methods which had never existed.
const REMOVED_IN_4: string[] = [
  'AdminLayout', 'PageLayout', 'AuthLayout', 'MobileLayout', 'PopupLayout',
  'BlankLayout', 'LayoutWrapper', 'Container', 'SafeArea', 'TabBar',
  'HeaderLogo', 'HeaderNav', 'Accordion', 'Avatar', 'Breadcrumb', 'Calendar',
  'Collapsible', 'DetailPage', 'Menubar', 'Motion', 'Pagination', 'Progress',
  'Separator', 'Skeleton', 'Slider', 'Toggle', 'useMobileLayout',
];
for (const name of REMOVED_IN_4) {
  BANNED.push({
    pattern: new RegExp(String.raw`<` + name + String.raw`[\s/>]|\b` + name + String.raw`\b\s*[,}]\s*from`),
    now: `removed in 4.0 — chrome now lives in Bloom's templates; see CHANGELOG`,
    // Match the RAW line, before inline code spans are stripped. The strip
    // exists so prose *discussing* drift does not false-positive, but a
    // removed component named inside backticks is not discussion — a markdown
    // table reading "| Dashboard | `<AdminLayout>` |" teaches an agent to use
    // it just as effectively as a bare mention. That table survived the first
    // pass of this gate for exactly that reason.
    raw: true,
  });
}

/**
 * Lines that are allowed to name a removed component, because naming it is
 * the point: release notes, migration guidance, and "do not use this" rules.
 * Keep this narrow — it is the one hole in the check above.
 */
const REMOVAL_NOTE = /removed in 4\.0|4\.0 removed|4\.0\.0 removed|no longer exists?|do(es)? not exist|were all dead|ships \*\*no|were removed/i;

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

    for (const { pattern, now, raw } of BANNED) {
      const subject = raw ? line : clean;
      if (raw && REMOVAL_NOTE.test(line)) continue;
      if (pattern.test(subject)) {
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

/* ────────────────────────────────────────────────────────────────────────────
 * Version claims must match package.json.
 *
 * AGENTS.md is the first file an agent reads and it sat two releases stale at
 * v2.1.4 while the package was 3.0.0 — which matters more than it sounds,
 * because 3.0 changed what the default stylesheet does. llms.txt is generated
 * from package.json so it is checked as a cheap regression guard, not because
 * it has ever drifted.
 * ──────────────────────────────────────────────────────────────────────────── */

const pkgVersion = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version as string;
const VERSION_CLAIMS: Array<{ file: string; re: RegExp; label: string }> = [
  { file: 'AGENTS.md', re: /`@bloomneo\/uikit` v([0-9]+\.[0-9]+\.[0-9]+)/, label: 'AGENTS.md header' },
  { file: 'skills/bloomneo-uikit/SKILL.md', re: /v([0-9]+\.[0-9]+\.[0-9]+)/, label: 'uikit SKILL.md header' },
  { file: 'llms.txt', re: /^# @bloomneo\/uikit v([0-9]+\.[0-9]+\.[0-9]+)/m, label: 'llms.txt header (generated)' },
];

const versionErrors: string[] = [];
for (const claim of VERSION_CLAIMS) {
  const path = join(ROOT, claim.file);
  if (!existsSync(path)) {
    versionErrors.push(`${claim.label}: ${claim.file} is missing`);
    continue;
  }
  const found = readFileSync(path, 'utf8').match(claim.re);
  if (!found) versionErrors.push(`${claim.label} not found — the version line was removed or reworded`);
  else if (found[1] !== pkgVersion) versionErrors.push(`${claim.label} says ${found[1]}, package.json says ${pkgVersion}`);
}

if (versionErrors.length > 0) {
  console.error('\nFAIL: version claims out of sync:\n');
  for (const e of versionErrors) console.error(`  ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`OK: version claims match package.json (${pkgVersion}).`);
