/**
 * SCG-R12 (wb-973.12), live-tier half: the rf-preview tier shall FAIL, never skip, when the installed `rf --version --json`
 * result.version or the preview's result.provenance.cli_version differs from the release recorded in the single contractSource
 * carrier (REACTIVE_FIBER_CONTRACT_SOURCE, wb-2j3.12; the carrier-to-receipt equality is pinned by
 * test/workbench-rf-contract-carrier.test.ts). This default-gate file pins the pure comparison the tier row uses (typed failure
 * naming recorded vs installed, unreadable values are failures, hostile values are never echoed) and pins that the live row is
 * wired to it and cannot skip. Spawns nothing; the live run itself belongs to `forge run rf-preview`.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { REACTIVE_FIBER_CONTRACT_SOURCE } from '../src/workbench/providers/reactivefiber.js';
import { judgeRfReleaseDrift, parseInstalledRfVersion, recordedRfRelease } from './helpers/rf-release-drift.js';

const PREVIEW_TEST = readFileSync(new URL('./workbench-native-rf-preview.test.ts', import.meta.url), 'utf8');
const RECORDED = '0.1.723';
/** Built from words so this file carries no literal skip or focus marker of its own. */
const SKIP_MARKER = new RegExp(`\\.(${['skip', 'only', 'todo', 'skipIf', 'runIf'].join('|')})\\b`);

describe('SCG-R12 recorded release', () => {
  it('R12-1 the recorded release is the carrier release component, read from the carrier by identifier', () => {
    expect(recordedRfRelease()).toBe(RECORDED);
    expect(REACTIVE_FIBER_CONTRACT_SOURCE.startsWith(`rf@${recordedRfRelease()}:`)).toBe(true);
  });

  it('R12-2 a source that is not rf@<release>:<contract> is refused, never defaulted', () => {
    expect(recordedRfRelease('rf@1.2.3:reactive-fiber.cli/v1 context.render --no-commit')).toBe('1.2.3');
    for (const bad of ['', 'rf@:x', 'rf@abc:x', '0.1.723:x', 'rf@0.1.723', ' rf@0.1.723:x']) {
      expect(() => recordedRfRelease(bad), JSON.stringify(bad)).toThrow(/rf@<release>/);
    }
  });
});

describe('SCG-R12 drift verdict', () => {
  it('R12-3 installed and preview both equal to the recorded release is ok with no failures', () => {
    expect(judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: RECORDED })).toStrictEqual({ ok: true, failures: [] });
  });

  it('R12-4 an installed release that differs fails with one typed failure naming recorded vs installed', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: '0.1.768', previewCliVersion: RECORDED });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toStrictEqual(['installed rf --version result.version drifted: recorded 0.1.723 vs installed 0.1.768']);
  });

  it('R12-4b a release that merely starts with the recorded one still drifts (no prefix match)', () => {
    for (const prefixed of ['0.1.7231', '0.1.723.1', '0.1.723-rc1']) {
      const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: prefixed, previewCliVersion: RECORDED });
      expect(verdict.failures, prefixed).toStrictEqual([`installed rf --version result.version drifted: recorded 0.1.723 vs installed ${prefixed}`]);
    }
  });

  it('R12-5 a preview provenance.cli_version that differs fails with one typed failure naming recorded vs preview', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: '0.1.722' });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toStrictEqual(['preview result.provenance.cli_version drifted: recorded 0.1.723 vs preview 0.1.722']);
  });

  it('R12-6 both differing fail twice, installed first', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: '0.1.768', previewCliVersion: '0.1.769' });
    expect(verdict.failures).toHaveLength(2);
    expect(verdict.failures[0]).toContain('installed');
    expect(verdict.failures[1]).toContain('preview');
  });

  it('R12-7 an unreadable value is a failure, never a skip: undefined, null, number, empty string, object', () => {
    for (const unreadable of [undefined, null, 723, '', {}]) {
      const installed = judgeRfReleaseDrift({ recorded: RECORDED, installed: unreadable, previewCliVersion: RECORDED });
      expect(installed.ok, `installed ${JSON.stringify(unreadable)}`).toBe(false);
      expect(installed.failures).toStrictEqual(['installed rf --version result.version is not a non-empty string']);
      const preview = judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: unreadable });
      expect(preview.ok, `preview ${JSON.stringify(unreadable)}`).toBe(false);
      expect(preview.failures).toStrictEqual(['preview result.provenance.cli_version is not a non-empty string']);
    }
  });

  it('R12-8 a hostile value is named, never echoed (control characters, bidi marks, overlong text)', () => {
    const hostile = [`0.1.768${String.fromCodePoint(0x0a)}forged`, `0.1.768${String.fromCodePoint(0x202e)}`, 'x'.repeat(200)];
    for (const value of hostile) {
      const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: value, previewCliVersion: RECORDED });
      expect(verdict.failures).toStrictEqual([`installed rf --version result.version drifted: recorded 0.1.723 vs installed <unrecognized>`]);
    }
  });

  it('R12-9 changing the recorded value without the installed one is red (negative control)', () => {
    expect(judgeRfReleaseDrift({ recorded: '0.1.724', installed: RECORDED, previewCliVersion: RECORDED }).ok).toBe(false);
  });
});

describe('SCG-R12 installed version reader', () => {
  it('R12-10 reads result.version from the envelope, or version from a bare body; anything else is undefined', () => {
    expect(parseInstalledRfVersion(JSON.stringify({ schema: 'reactive-fiber.cli/v1', ok: true, result: { version: '0.1.768' } }))).toBe('0.1.768');
    expect(parseInstalledRfVersion(JSON.stringify({ version: '0.1.768' }))).toBe('0.1.768');
    for (const bad of ['', 'not json', '[]', 'null', JSON.stringify({ result: {} }), JSON.stringify({ result: { version: 768 } })]) {
      expect(parseInstalledRfVersion(bad), JSON.stringify(bad)).toBeUndefined();
    }
  });
});

describe('SCG-R12 live row wiring (the tier cannot be run offline, so its shape is pinned here)', () => {
  const ROW = PREVIEW_TEST.slice(PREVIEW_TEST.indexOf('SCG-R12 live drift guard'));

  it('R12-11 the rf-preview tier carries the SCG-R12 row, judged by judgeRfReleaseDrift against recordedRfRelease()', () => {
    expect(PREVIEW_TEST).toContain('SCG-R12 live drift guard');
    expect(PREVIEW_TEST).toContain("from './helpers/rf-release-drift.js'");
    expect(ROW).toContain('judgeRfReleaseDrift(');
    expect(ROW).toContain('recordedRfRelease()');
    expect(ROW).toContain('parseInstalledRfVersion(');
    expect(ROW).toMatch(/expect\(verdict\.failures\)\.toStrictEqual\(\[\]\)/);
  });

  it('R12-12 the row fails, never skips: a missing WORKBENCH_RF_FIXTURE throws, and no skip marker exists in the tier file', () => {
    expect(ROW).toMatch(/if\s*\(!workspace\)\s*throw\s+Error\('WORKBENCH_RF_FIXTURE must name an initialized test workspace'\)/);
    expect(PREVIEW_TEST).not.toMatch(SKIP_MARKER);
  });
});
