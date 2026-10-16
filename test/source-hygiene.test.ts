/** wb-era (W22-H/hygiene): Trojan-Source drift guard. Raw bidirectional control code points committed in src/, test/ or
 * qa/ are invisible to a reviewer and biome does not flag them. Every legitimate use (sanitizer ranges, hostile test
 * inputs) must be written as a \uXXXX escape so the source stays reviewable. This file walks the three trees
 * synchronously (no globbing library) and fails with path:line:column for every raw occurrence. */
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {describe, expect, it} from 'vitest';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TREES = ['src', 'test', 'qa'] as const;
// U+061C, U+200E/U+200F, U+202A-U+202E, U+2066-U+2069 — written as escapes so this file never contains one raw.
const BIDI = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/u;
const SKIPPED_DIRS = new Set(['node_modules', 'dist', '.git']);

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir).sort()) {
    if (SKIPPED_DIRS.has(name)) continue;
    const full = join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) walk(full, out);
    else if (info.isFile()) out.push(full);
  }
}

/** One `path:line:column U+XXXX` entry per raw bidi control code point found in `text`. */
function findRawBidi(path: string, text: string): string[] {
  const hits: string[] = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    let column = 0;
    for (const ch of line) {
      column++;
      if (BIDI.test(ch)) {
        const cp = ch.codePointAt(0) ?? 0;
        hits.push(`${path}:${i + 1}:${column} U+${cp.toString(16).toUpperCase().padStart(4, '0')}`);
      }
    }
  }
  return hits;
}

describe('source hygiene: raw bidi control code points (wb-era)', () => {
  it('the detector reports path:line:column for each raw code point and ignores escapes', () => {
    const raw = `ok\nab${String.fromCodePoint(0x202e)}c${String.fromCodePoint(0x2066)}\n`;
    expect(findRawBidi('x.ts', raw)).toEqual(['x.ts:2:3 U+202E', 'x.ts:2:5 U+2066']);
    expect(findRawBidi('x.ts', 'const s = "\\u202E\\u2066\\u061C";\n')).toEqual([]);
    for (const cp of [0x061c, 0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2066, 0x2067, 0x2068, 0x2069]) {
      expect(findRawBidi('y.ts', String.fromCodePoint(cp))).toHaveLength(1);
    }
    expect(findRawBidi('z.ts', String.fromCodePoint(0x200b))).toEqual([]);
  });

  it('src/, test/ and qa/ contain no raw bidi control code point', () => {
    const files: string[] = [];
    for (const tree of TREES) {
      const dir = join(ROOT, tree);
      try {
        walk(dir, files);
      } catch {
        // a tree that does not exist contributes no files
      }
    }
    expect(files.length).toBeGreaterThan(50);
    const hits: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      hits.push(...findRawBidi(relative(ROOT, file), text));
    }
    expect(hits).toEqual([]);
  });
});
