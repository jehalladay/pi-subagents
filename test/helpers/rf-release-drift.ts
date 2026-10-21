/**
 * SCG-R12 (wb-973.12): the pure comparison behind the rf-preview tier's live drift guard. The recorded release is the
 * `rf@<release>` component of the single contractSource carrier (REACTIVE_FIBER_CONTRACT_SOURCE, wb-2j3.12), never a literal here.
 * The tier fails (never skips) when the installed `rf --version --json` result.version or the preview's
 * result.provenance.cli_version differs from it, or when either is unreadable. Values come from an external binary, so a
 * failure echoes a value only when it is a plain version-like token; anything else is named `<unrecognized>`.
 */
import { REACTIVE_FIBER_CONTRACT_SOURCE } from '../../src/workbench/providers/reactivefiber.js';

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
