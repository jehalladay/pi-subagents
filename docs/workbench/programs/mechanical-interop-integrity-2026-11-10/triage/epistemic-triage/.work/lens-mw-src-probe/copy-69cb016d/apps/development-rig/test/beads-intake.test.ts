import test from "node:test";
import assert from "node:assert/strict";
import { requestFromBead } from "../dist/beads-intake.js";
import type { BeadsIntakeOptions } from "../dist/beads-intake.js";

const ready = { id: "MW-123", title: "Implement parser guard", description: "Add a safety guard", status: "open" };
const options = { workspaceId: "/workspace", baseRevision: "a".repeat(40), readyIssueIds: ["MW-123"] };
test("ready Beads issue binds one request without claiming the work", () => {
  const out = requestFromBead(ready, options);
  assert.equal(out.task, "Implement parser guard\n\nAdd a safety guard");
  assert.equal(out.workspaceId, options.workspaceId);
  assert.equal(out.baseRevision, options.baseRevision);
  assert.equal(out.beadsIssueId, ready.id);
});
test("blocked or claimed Beads work is not silently accepted as ready", () => {
  for (const issue of [
    { ...ready, status: "hooked" },
    { ...ready, status: "in_progress" },
    { ...ready, blocked: true },
    { ...ready, id: "" },
  ]) assert.throws(() => requestFromBead(issue, options), /BEADS_WORK_NOT_READY/);
});
test("empty title and source revision refuse before any effect", () => {
  assert.throws(() => requestFromBead({ ...ready, title: " " }, options), /BEADS_WORK_INVALID/);
  assert.throws(() => requestFromBead(ready, { ...options, baseRevision: "" }), /BEADS_WORK_INVALID/);
});

test("Beads readiness is caller-attested, not inferred from open status alone", () => {
  const unattested = { workspaceId: options.workspaceId, baseRevision: options.baseRevision } as BeadsIntakeOptions;
  assert.throws(() => requestFromBead(ready, unattested), /BEADS_READINESS_UNATTESTED/);
  const out = requestFromBead(ready, { ...options, readyIssueIds: ["MW-123"] });
  assert.equal(out.beadsIssueId, "MW-123");
  assert.throws(() => requestFromBead(ready, { ...options, readyIssueIds: ["MW-other"] }), /BEADS_WORK_NOT_READY/);
});

test("malformed attestation and field shapes refuse by typed reason, never by substring match or TypeError", () => {
  const stringIds = { ...options, readyIssueIds: "MW-1234" } as unknown as BeadsIntakeOptions;
  assert.throws(() => requestFromBead(ready, stringIds), /BEADS_READINESS_UNATTESTED/, "a string readyIssueIds must refuse as unattested, not match MW-123 by substring");
  assert.throws(() => requestFromBead({ ...ready, id: " " }, { ...options, readyIssueIds: [" "] }), /BEADS_WORK_NOT_READY/, "a blank issue id listed as ready must still refuse as not ready");
  assert.throws(() => requestFromBead(ready, { ...options, workspaceId: " " }), /BEADS_WORK_INVALID/, "a whitespace workspace must refuse as invalid");
  assert.throws(() => requestFromBead(ready, { ...options, baseRevision: " " }), /BEADS_WORK_INVALID/, "a whitespace base revision must refuse as invalid");
  const nullTitle = { ...ready, title: null } as unknown as typeof ready;
  assert.throws(() => requestFromBead(nullTitle, options), /BEADS_WORK_INVALID/, "a null title must refuse as invalid rather than throw TypeError");
  const out = requestFromBead({ ...ready, description: " \n " }, options);
  assert.equal(out.task, "Implement parser guard", "a whitespace description must add no separator");
  assert.throws(() => requestFromBead(ready, { ...options, workspaceId: null } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, "a non-string workspace must refuse as invalid rather than throw TypeError");
  assert.throws(() => requestFromBead(ready, { ...options, baseRevision: 42 } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, "a non-string base revision must refuse as invalid rather than throw TypeError");
  const numericId = { ...ready, id: 7 } as unknown as typeof ready;
  assert.throws(() => requestFromBead(numericId, options), /BEADS_WORK_NOT_READY/, "a non-string issue id must refuse as not ready rather than throw TypeError");
  assert.throws(() => requestFromBead(ready, { ...options, workspaceId: 42 } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, "a numeric workspace must refuse as invalid, not only a null one");
  assert.throws(() => requestFromBead(ready, { ...options, baseRevision: null } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, "a null base revision must refuse as invalid, not only a numeric one");
  const nullId = { ...ready, id: null } as unknown as typeof ready;
  assert.throws(() => requestFromBead(nullId, options), /BEADS_WORK_NOT_READY/, "a null issue id must refuse as not ready, not only a numeric one");
  const padded = requestFromBead({ ...ready, description: "  Add a safety guard \n" }, options);
  assert.equal(padded.task, "Implement parser guard\n\nAdd a safety guard", "a padded description must be trimmed before it joins the task text");
});

test("every remaining non-string type refuses by typed reason on each field, never TypeError", () => {
  const remaining: readonly [string, unknown][] = [["undefined", undefined], ["boolean", true], ["object", {}], ["array", []]];
  for (const [label, value] of remaining) {
    const badId = { ...ready, id: value } as unknown as typeof ready;
    assert.throws(() => requestFromBead(badId, options), /BEADS_WORK_NOT_READY/, `a ${label} issue id must refuse as not ready`);
    assert.throws(() => requestFromBead(ready, { ...options, workspaceId: value } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, `a ${label} workspace must refuse as invalid`);
    assert.throws(() => requestFromBead(ready, { ...options, baseRevision: value } as unknown as BeadsIntakeOptions), /BEADS_WORK_INVALID/, `a ${label} base revision must refuse as invalid`);
  }
});

// CACWC-EAT-R002 (MechanicalWorkflows-gebd): intake accepts only the open status of bd 1.1.0-rc.1's roster.
test("CACWC-EAT-R002: a VERIFIED status, listed as ready, still refuses as BEADS_WORK_NOT_READY", () => {
  assert.throws(
    () => requestFromBead({ ...ready, status: "VERIFIED" }, options),
    (error: unknown) => error instanceof Error && error.message.startsWith("BEADS_WORK_NOT_READY"),
  );
});
test("CACWC-EAT-R002: every status outside the open intake gate refuses, and the open control binds one request", () => {
  for (const status of ["VERIFIED", "verified", "blocked", "deferred", "closed", "in_progress"]) {
    assert.throws(() => requestFromBead({ ...ready, status }, options), /BEADS_WORK_NOT_READY/, `status ${status} must refuse`);
  }
  assert.equal(requestFromBead({ ...ready, status: "open", blocked: false }, options).beadsIssueId, ready.id);
});
