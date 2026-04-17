/**
 * scripts/check-readme-anchors.ts
 *
 * Fails if any error message or inline doc-URL `See: .../llms#<slug>`
 * points at a heading slug that doesn't exist in llms.txt.
 *
 * UIKit errors follow the format:
 *
 *   [@bloomneo/uikit] <Component> requires <prop>. <reason>.
 *   See: https://bloomneo.github.io/uikit/llms#<component-slug>
 *
 * This is enforced in `src/lib/errors.ts` (UIKitError) — DOCS_BASE +
 * slug-or-component-lowercased. If a consumer follows the link and lands
 * on a dead anchor, the error has lied about where the fix is. Same
 * consumer-visible impact as a 404.
 *
 * Run:  npm run check:anchors
 * Wire: GitHub Actions runs this on every PR alongside check:docs.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** GitHub-style slugifier: lowercase, strip punctuation, spaces → hyphens. */
function slug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Extract every `## / ### / ...` heading from llms.txt, slugified. */
function readAnchors(path: string): Set<string> {
  const anchors = new Set<string>();
  const content = readFileSync(path, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (m) anchors.add(slug(m[1]));
  }
  return anchors;
}

/** Recursively find every .ts / .tsx file under src/ (skip tests + .d.ts). */
function listSourceFiles(rel: string, out: string[] = []): string[] {
  for (const f of readdirSync(join(ROOT, rel))) {
    const full = join(rel, f);
    const abs = join(ROOT, full);
    if (statSync(abs).isDirectory()) {
      listSourceFiles(full, out);
    } else if (
      /\.tsx?$/.test(f) &&
      !f.endsWith('.test.ts') &&
      !f.endsWith('.test.tsx') &&
      !f.endsWith('.d.ts')
    ) {
      out.push(full);
    }
  }
  return out;
}

// UIKitError's DOCS_BASE is "https://bloomneo.github.io/uikit/llms#" —
// slug lives at the end.
const URL_RX = /https:\/\/bloomneo\.github\.io\/uikit\/llms#([a-z0-9-]+)/gi;

// Fallback: UIKitError(component, message) with no explicit slug uses
// component.toLowerCase() as the slug. Match `new UIKitError('Foo', ...)`
// calls that don't pass a third arg and derive the implicit slug.
const UIKIT_ERROR_RX = /new\s+UIKitError\(\s*['"]([A-Za-z][A-Za-z0-9]*)['"],\s*[^)]+?(?:\)\s*;|,\s*['"]([a-z0-9-]+)['"])/g;

const anchors = readAnchors(join(ROOT, 'llms.txt'));
if (anchors.size === 0) {
  console.error('FAIL: llms.txt has no extractable headings. Is the file malformed?');
  process.exit(1);
}

const files = listSourceFiles('src');
const violations: { file: string; line: number; slug: string; source: string }[] = [];

for (const file of files) {
  const lines = readFileSync(join(ROOT, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    // Explicit URLs
    URL_RX.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = URL_RX.exec(line))) {
      const [, target] = m;
      if (!anchors.has(target)) {
        violations.push({ file, line: i + 1, slug: target, source: 'explicit URL' });
      }
    }

    // Implicit UIKitError slugs (derived from component name, lowercased)
    UIKIT_ERROR_RX.lastIndex = 0;
    while ((m = UIKIT_ERROR_RX.exec(line))) {
      const [, component, explicitSlug] = m;
      const target = (explicitSlug ?? component.toLowerCase()).toLowerCase();
      if (!anchors.has(target)) {
        violations.push({
          file,
          line: i + 1,
          slug: target,
          source: `UIKitError('${component}', ...)`,
        });
      }
    }
  });
}

if (violations.length > 0) {
  console.error('\nFAIL: llms.txt anchor(s) missing. UIKitError messages below');
  console.error('point at headings that do not exist:\n');
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    → llms.txt#${v.slug}  (no matching heading; source: ${v.source})\n`);
  }
  console.error(`Total: ${violations.length} broken anchor link(s).\n`);
  process.exit(1);
}

console.log(
  `OK: scanned ${files.length} source files against ${anchors.size} llms.txt headings, every anchor resolves.`,
);
