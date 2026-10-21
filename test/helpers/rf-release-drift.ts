/**
 * SCG-R12 (wb-973.12): the pure comparison behind the rf-preview tier's live drift guard. The recorded release is the
 * `rf@<release>` component of the single contractSource carrier (REACTIVE_FIBER_CONTRACT_SOURCE, wb-2j3.12), never a literal here.
 * The tier fails (never skips) when the installed `rf --version --json` result.version or the preview's
 * result.provenance.cli_version differs from it, or when either is unreadable. Values come from an external binary, so a
 * failure echoes a value only when it is a plain version-like token; anything else is named `<unrecognized>`.
 */
import { REACTIVE_FIBER_CONTRACT_SOURCE } from '../../src/workbench/providers/reactivefiber.js';

/**
 * The live SCG-R12 drift row's title in test/workbench-native-rf-preview.test.ts. The drift test locates and freezes that row by it
 * (R12-11: exactly one direct `it` of this title, AST-equal to the drift test's own FROZEN_ROW literal, which repeats the title),
 * and the docs07 census binds R5/drift-native to it (wb-973.20), so the census cannot name another row of the tier or a title no
 * file registers.
 */
export const RF_LIVE_DRIFT_TITLE = 'SCG-R12 live drift guard: the installed rf version and the preview cli_version equal the release recorded in the contractSource carrier';
/**
 * The describe the drift test registers its frozen live row source-shape cases under (R12-11/R12-12). The docs07 census's
 * R5/drift-wiring half binds exactly the cases the gate's own report collects under it (wb-973.20).
 */
export const RF_LIVE_DRIFT_SHAPE_SUITE = 'SCG-R12 frozen live row source shape (not a live-run claim)';

const CARRIER_SHAPE = /^rf@([0-9]+(?:\.[0-9]+)*):/;
const STAMP = /^[0-9A-Za-z.+_-]{1,64}$/;

/** The release component of an `rf@<release>:<contract>` contractSource (default: the carrier). Throws on any other shape. */
export function recordedRfRelease(source: string = REACTIVE_FIBER_CONTRACT_SOURCE): string {
  const match = CARRIER_SHAPE.exec(source);
  if (match === null || match[1] === undefined) throw new Error('contractSource is not rf@<release>:<contract>');
  return match[1];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** result.version of an `rf --version --json` envelope (or `version` of a bare body); undefined when absent or not a string. */
export function parseInstalledRfVersion(stdout: string): string | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return undefined;
  }
  if (!isRecord(parsed)) return undefined;
  const body = isRecord(parsed.result) ? parsed.result : parsed;
  return typeof body.version === 'string' ? body.version : undefined;
}

export interface RfReleaseDrift {
  ok: boolean;
  failures: string[];
}

function echo(value: string): string {
  return STAMP.test(value) ? value : '<unrecognized>';
}

function check(label: string, side: string, recorded: string, value: unknown, failures: string[]): void {
  if (typeof value !== 'string' || value.length === 0) {
    failures.push(`${label} is not a non-empty string`);
    return;
  }
  if (value !== recorded) failures.push(`${label} drifted: recorded ${echo(recorded)} vs ${side} ${echo(value)}`);
}

/** Installed first, then preview; each failure names recorded vs the observed release. ok is exactly "no failures". */
export function judgeRfReleaseDrift(input: { recorded: string; installed: unknown; previewCliVersion: unknown }): RfReleaseDrift {
  const failures: string[] = [];
  check('installed rf --version result.version', 'installed', input.recorded, input.installed, failures);
  check('preview result.provenance.cli_version', 'preview', input.recorded, input.previewCliVersion, failures);
  return { ok: failures.length === 0, failures };
}
