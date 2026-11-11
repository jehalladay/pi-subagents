import { strict as assert } from "node:assert";
import { test } from "node:test";
import { DEPENDENCY_KINDS, invalidateCertificates, validateCertificateReference } from "../dist/index.js";
import type { CertificateReference, PremiseChange } from "../dist/index.js";

const cert = (overrides: Partial<CertificateReference> = {}): CertificateReference => ({
  certificateId: "cert:lane-interface",
  subject: "interface:lane-7",
  assumptions: ["single-writer-per-lane", "forge-gate-is-the-only-verifier"],
  footprint: [
    { kind: "data-edge", id: "edge:obs->policy", revision: "g@r7" },
    { kind: "resource-scope", id: "scope:lane-7", revision: "rs@3" },
    { kind: "evidence-coverage", id: "source:rf-journal", revision: "rf@2026-10-20" },
    { kind: "effect-authority", id: "authority:forge", revision: "aa@1" },
  ],
  footprintComplete: true,
  footprintProof: "proof:footprint:cert:lane-interface",
  model: { revision: "mp@11", interventionClass: "observational" },
  ...overrides,
});

const codes = (out: { refusals: readonly { code: string }[] }): string[] => out.refusals.map(r => r.code).sort();

test("a certificate reference names its assumptions, its full dependency footprint across the six dependency kinds, and the model revision and intervention class", () => {
  assert.deepEqual([...DEPENDENCY_KINDS], ["data-edge", "resource-scope", "stochastic-cause", "evidence-coverage", "timing", "effect-authority"]);
  assert.ok(Object.isFrozen(DEPENDENCY_KINDS));
  const out = validateCertificateReference(cert());
  assert.equal(out.schema, "mw.certificate-reference.v0");
  assert.deepEqual(out.refusals, []);
  assert.equal(out.ok, true);
  assert.deepEqual(out.footprint, ["data-edge:edge:obs->policy", "effect-authority:authority:forge", "evidence-coverage:source:rf-journal", "resource-scope:scope:lane-7"]);
});

test("blank assumptions, an empty footprint, an unknown dependency kind, an unpinned dependency, a missing model version and a completeness claim without proof each refuse", () => {
  assert.deepEqual(codes(validateCertificateReference(cert({ assumptions: ["ok", " "] }))), ["CERTIFICATE_ASSUMPTION_UNNAMED"]);
  assert.deepEqual(codes(validateCertificateReference(cert({ footprint: [] }))), ["CERTIFICATE_FOOTPRINT_EMPTY"]);
  assert.deepEqual(codes(validateCertificateReference(cert({ footprint: [{ kind: "vibes" as unknown as "timing", id: "x", revision: "1" }] }))), ["CERTIFICATE_DEPENDENCY_KIND_UNKNOWN"]);
  assert.deepEqual(codes(validateCertificateReference(cert({ footprint: [{ kind: "timing", id: "window:dwell", revision: "" }] }))), ["CERTIFICATE_DEPENDENCY_UNPINNED"]);
  assert.deepEqual(codes(validateCertificateReference(cert({ model: { revision: "", interventionClass: "observational" } }))), ["CERTIFICATE_MODEL_VERSION_MISSING"]);
  assert.deepEqual(codes(validateCertificateReference(cert({ model: { revision: "mp@11", interventionClass: "" } }))), ["CERTIFICATE_MODEL_VERSION_MISSING"]);
  const { footprintProof: _dropped, ...unproven } = cert();
  assert.deepEqual(codes(validateCertificateReference(unproven)), ["CERTIFICATE_FOOTPRINT_COMPLETENESS_UNPROVEN"]);
  assert.equal(validateCertificateReference({ ...unproven, footprintComplete: false }).ok, true, "an admittedly incomplete footprint needs no proof; it just never retains");
});

test("acceptance: mutating a named dependency invalidates the certificate and names the dependency; a complete, unaffected certificate is retained", () => {
  const affected = cert();
  const unaffected = cert({ certificateId: "cert:other", footprint: [{ kind: "timing", id: "window:dwell", revision: "t@1" }], footprintProof: "proof:footprint:cert:other" });
  const change: PremiseChange = { kind: "resource-scope", id: "scope:lane-7", toRevision: "rs@4" };
  const out = invalidateCertificates([affected, unaffected], change);
  assert.equal(out.schema, "mw.certificate-invalidation.v0");
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:lane-interface", reason: "DEPENDENCY_TOUCHED", dependency: "resource-scope:scope:lane-7" }]);
  assert.deepEqual(out.retained, ["cert:other"]);
});

test("a change that leaves the pinned revision where it was is not a mutation of that premise", () => {
  const out = invalidateCertificates([cert()], { kind: "resource-scope", id: "scope:lane-7", toRevision: "rs@3" });
  assert.deepEqual(out.invalidated, []);
  assert.deepEqual(out.retained, ["cert:lane-interface"]);
});

test("a certificate without a proven complete footprint is never retained across any premise change, even one it does not name", () => {
  const incomplete = cert({ certificateId: "cert:partial", footprintComplete: false });
  const out = invalidateCertificates([incomplete, cert()], { kind: "timing", id: "window:elsewhere", toRevision: "t@9" });
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:partial", reason: "FOOTPRINT_INCOMPLETE", dependency: "timing:window:elsewhere" }]);
  assert.deepEqual(out.retained, ["cert:lane-interface"]);
});

test("a global resource change requires full budget review: every certificate with a resource-scope dependency is invalidated, the rest with complete footprints are retained", () => {
  const noResources = cert({ certificateId: "cert:pure", footprint: [{ kind: "data-edge", id: "edge:a->b", revision: "g@r7" }], footprintProof: "proof:footprint:cert:pure" });
  const out = invalidateCertificates([cert(), noResources], { kind: "global-resource", id: "budget:total", toRevision: "b@2" });
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:lane-interface", reason: "GLOBAL_RESOURCE_REVIEW", dependency: "resource-scope:scope:lane-7" }]);
  assert.deepEqual(out.retained, ["cert:pure"]);
});

test("an invalid reference is invalidated as such, never retained, and the invalidation record itself is pure", () => {
  const broken = cert({ certificateId: "cert:broken", assumptions: [""] });
  const change: PremiseChange = { kind: "timing", id: "window:elsewhere", toRevision: "t@9" };
  const out = invalidateCertificates([broken, cert()], change);
  assert.deepEqual(out.invalidated, [{ certificateId: "cert:broken", reason: "REFERENCE_INVALID", dependency: "timing:window:elsewhere" }]);
  assert.deepEqual(out.retained, ["cert:lane-interface"]);
  const known = new Set<string>([...stringLeaves([broken, cert(), change]), out.schema, "DEPENDENCY_TOUCHED", "GLOBAL_RESOURCE_REVIEW", "FOOTPRINT_INCOMPLETE", "REFERENCE_INVALID", "timing:window:elsewhere", ...cert().footprint.map(d => `${d.kind}:${d.id}`)]);
  for (const leaf of stringLeaves(out)) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
