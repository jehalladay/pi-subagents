/**
 * wb-tz2.1 fold-in HXFS-PI-3 (owner DELTA-B-AMEND, bead notes): the one receipt line each live-binary HX case prints, so a
 * native-tier run records which hx it read. The line says "installed" only when hxLiveInvariant classes runtime.version as an
 * installed build identity (`<version>+<family>.<commit>`, HyperUnix-CLI skill/hyper-unix/SKILL.md:22-23@d60f277a26); any other
 * version, the bare `0.1.0` of a plain checkout build included, is recorded as "unstamped binary — provenance unknown". The
 * class is a label only: it never decides the verdict or fails the read, and the binary sha-256 stays the identity pin.
 *
 * A read the invariant does not hold for prints no identity at all, only the broken clauses, so nothing the invariant has not
 * checked as a bounded, displayable identity is ever echoed. The line is test-harness output of the native tier: no product
 * display path reaches it.
 */
import type {JsonValue} from '../../src/workbench/capability-registry.js';
import {type HyperUnixVersionClass, hxLiveInvariant} from '../../src/workbench/hyperunix-observer.js';

/** The tag a native-tier receipt greps for. */
export const HX_NATIVE_RECEIPT = 'HX_NATIVE_RECEIPT';
const PROVENANCE: Readonly<Record<HyperUnixVersionClass, string>> = {
  installed: 'installed build identity',
  unstamped: 'unstamped binary — provenance unknown',
};

const member = (value: JsonValue | undefined, key: string): JsonValue | undefined =>
  value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value) ? value[key] : undefined;

/** `HX_NATIVE_RECEIPT <json>` on one line: the runtime identity, its version class and provenance, the kind and whether absence
 * is licensed when the invariant holds; `{withheld: true, violations}` when it does not. */
export function hxLiveReceipt(result: JsonValue): string {
  const verdict = hxLiveInvariant(result);
  if (!verdict.holds) return `${HX_NATIVE_RECEIPT} ${JSON.stringify({withheld: true, violations: verdict.violations})}`;
  const runtime = member(result, 'runtime');
  return `${HX_NATIVE_RECEIPT} ${JSON.stringify({
    version: member(runtime, 'version'),
    versionClass: verdict.versionClass,
    provenance: PROVENANCE[verdict.versionClass],
    binarySha256: member(runtime, 'binarySha256'),
    kind: member(member(member(result, 'source'), 'execution_status'), 'kind'),
    absenceLicensed: verdict.absenceLicensed,
  })}`;
}
