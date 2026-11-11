import { strict as assert } from "node:assert";
import { test } from "node:test";
import { invalidateCertificates, validateCertificateReference } from "../dist/index.js";
import type { CertificateReference, PremiseChange } from "../dist/index.js";

// Pins for nine certificate-reference laws the landed 3l61.4 tree left unpinned (bead 69jv). Each test names one mutant.
// Owner questions Q1-Q5 (duplicate footprint keys, duplicate certificate ids, unknown-kind PremiseChange, reason priority
// as contract, direct dependencyKey import) stay carried and unpinned here.

const cert = (overrides: Partial<CertificateReference> = {}): CertificateReference => ({
  certificateId: "cert:pins",
  subject: "interface:pins",
  assumptions: ["single-writer-per-lane"],
  footprint: [{ kind: "timing", id: "window:dwell", revision: "t@1" }],
  footprintComplete: true,
  footprintProof: "proof:footprint:cert:pins",
  model: { revision: "mp@11", interventionClass: "observational" },
  ...overrides,
});

const codes = (out: { refusals: readonly { code: string }[] }): string[] => out.refusals.map(r => r.code).sort();

test("SV2_PROOF_BLANK_ACCEPTED: a whitespace-only footprint proof with a complete claim refuses, and the certificate is never retained across a change it does not name", () => {
  const blankProof = cert({ footprintProof: "   " });
  assert.deepEqual(codes(validateCertificateReference(blankProof)), ["CERTIFICATE_FOOTPRINT_COMPLETENESS_UNPROVEN"]);
  const out = invalidateCertificates([blankProof, cert({ certificateId: "cert:good" })], { kind: "data-edge", id: "edge:elsewhere", toRevision: "g@9" });
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:pins", reason: "REFERENCE_INVALID", dependency: "data-edge:edge:elsewhere" }]);
  assert.deepEqual(out.retained, ["cert:good"]);
});

test("SV8_UNPINNED_EMPTY_ONLY: a whitespace-only dependency revision refuses as unpinned", () => {
  const out = validateCertificateReference(cert({ footprint: [{ kind: "timing", id: "window:dwell", revision: "  \t " }] }));
  assert.deepEqual(codes(out), ["CERTIFICATE_DEPENDENCY_UNPINNED"]);
  assert.equal(out.refusals[0]?.subject, "window:dwell");
});

test("SV5_TOUCH_REQUIRES_COMPLETE: an incomplete certificate whose named dependency moves is DEPENDENCY_TOUCHED naming that dependency, not FOOTPRINT_INCOMPLETE", () => {
  const incomplete = cert({ footprintComplete: false });
  const out = invalidateCertificates([incomplete], { kind: "timing", id: "window:dwell", toRevision: "t@2" });
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:pins", reason: "DEPENDENCY_TOUCHED", dependency: "timing:window:dwell" }]);
  assert.deepEqual(out.retained, []);
});

test("SV6_GLOBAL_REQUIRES_COMPLETE: an incomplete certificate with a resource-scope dependency is GLOBAL_RESOURCE_REVIEW naming the scope under a global resource change", () => {
  const incomplete = cert({ footprintComplete: false, footprint: [{ kind: "resource-scope", id: "scope:lane-7", revision: "rs@3" }] });
  const out = invalidateCertificates([incomplete], { kind: "global-resource", id: "budget:total", toRevision: "b@2" });
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:pins", reason: "GLOBAL_RESOURCE_REVIEW", dependency: "resource-scope:scope:lane-7" }]);
  assert.deepEqual(out.retained, []);
});

test("SV4_GLOBAL_NAMES_LAST_SCOPE: with two resource-scope dependencies the global review names the first in footprint order, not the last and not the alphabetical first", () => {
  const scopes = (ids: readonly string[]) => ids.map(id => ({ kind: "resource-scope" as const, id, revision: "rs@1" }));
  const change: PremiseChange = { kind: "global-resource", id: "budget:total", toRevision: "b@2" };
  const out = invalidateCertificates(
    [cert({ certificateId: "cert:ab", footprint: scopes(["scope:a", "scope:b"]) }), cert({ certificateId: "cert:ba", footprint: scopes(["scope:b", "scope:a"]) })],
    change,
  );
  assert.deepEqual(out.invalidated, [
    { certificateId: "cert:ab", reason: "GLOBAL_RESOURCE_REVIEW", dependency: "resource-scope:scope:a" },
    { certificateId: "cert:ba", reason: "GLOBAL_RESOURCE_REVIEW", dependency: "resource-scope:scope:b" },
  ]);
});

test("SV3_TOUCH_IGNORES_KIND: a dependency of another kind that shares the changed id stays retained; the match keys on kind and id together", () => {
  const sharedId = cert({ footprint: [{ kind: "timing", id: "shared:id", revision: "t@1" }] });
  const out = invalidateCertificates([sharedId], { kind: "data-edge", id: "shared:id", toRevision: "g@2" });
  assert.deepEqual(out.invalidated, []);
  assert.deepEqual(out.retained, ["cert:pins"]);
  const sameKind = invalidateCertificates([sharedId], { kind: "timing", id: "shared:id", toRevision: "t@2" });
  assert.deepEqual(sameKind.invalidated, [{ certificateId: "cert:pins", reason: "DEPENDENCY_TOUCHED", dependency: "timing:shared:id" }]);
});

test("SV7_RECORD_DROPS_TO_REVISION: the invalidation record echoes the change object itself, toRevision included", () => {
  const change: PremiseChange = { kind: "timing", id: "window:dwell", toRevision: "t@2" };
  const out = invalidateCertificates([cert()], change);
  assert.strictEqual(out.change, change);
  assert.equal(out.change.toRevision, "t@2");
  assert.deepEqual(out.change, { kind: "timing", id: "window:dwell", toRevision: "t@2" });
});

test("SV9_KIND_UNKNOWN_SUBJECT: the unknown-kind refusal names the dependency id as its subject, not the certificate id", () => {
  const out = validateCertificateReference(cert({ footprint: [{ kind: "vibes" as unknown as "timing", id: "dep:mystery", revision: "1" }] }));
  assert.deepEqual(codes(out), ["CERTIFICATE_DEPENDENCY_KIND_UNKNOWN"]);
  assert.equal(out.refusals[0]?.subject, "dep:mystery");
  assert.notEqual(out.refusals[0]?.subject, "cert:pins");
});

test("SV1_ELSE_IF_SPLIT: an unknown-kind dependency with a blank revision refuses exactly once, as unknown kind only", () => {
  const out = validateCertificateReference(cert({ footprint: [{ kind: "vibes" as unknown as "timing", id: "dep:mystery", revision: "" }] }));
  assert.deepEqual(out.refusals.map(r => r.code), ["CERTIFICATE_DEPENDENCY_KIND_UNKNOWN"]);
  assert.equal(out.ok, false);
});
