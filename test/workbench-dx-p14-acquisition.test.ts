/**
 * wb-mo89, the pi-system DX triage packet P14 (EAT-R478, EAT-R479, EAT-R480, EAT-R481 and EAT-R483; EAT-R482's descendant
 * fixture is test/workbench-rf-descendant-pipe.test.ts). The default-tier reader of:
 *  - the vendored requirement text, test/fixtures/dx-p14-requirements-roster.json (pi-subagents master 0a5ac3a3,
 *    requirements/.work/req-r-followon.md lines 116-200 and the TDD-MATRIX.md gate-registry rows, each held to its SHA-256);
 *  - the committed acquisition record, qa/workbench/receipts/wb-mo89-dx-p14-acquisition-probe.json, written by
 *    qa/workbench/dx-p14-acquisition-probe.mjs and tied to its bytes by SHA-256, re-judged here through
 *    qa/workbench/dx-p14-acquisition-judge.mjs and, for EAT-R479's binding, through src (nativeEvidence,
 *    mintEvidenceReceipt and decideReconcile);
 *  - the judges themselves, on inputs planted in this file (those of R479-C2-BLOCKED are edited copies of the record's
 *    EAT-R479 leg): each such case reads the planted inputs its title lists.
 * CLAIMED (cut #3, the rule-14 enumerate form of the refusal #2 claim sets, guard row M:78417): each case title below and
 * nothing wider - ROSTER-BLOCKS, ROSTER-GATES, RECORD-TIE, RECORD-NO-HOST-PATH and RECORD-LEGS; R478-C2-BLOCKED,
 * R478-C1-FIELDS, R478-C1-SHAS and R478-C2-CONTROLS; R479-C1-PRODUCER, R479-C1-READS, R479-C1-NATIVEREF, R479-C2-BINDING,
 * R479-C2-NO-REFS and R479-C2-BLOCKED; R480-C2-BLOCKED, R480-C1-FIELDS and R480-C2-IDENTITY; R481-C3-BLOCKED,
 * R481-C1-FIELDS and R481-C1-BINARIES; R483-C1-JOURNEY, R483-C1-ARGV, R483-C1-SOCKETS, R483-C1-BASELINE, R483-C2-FORMS,
 * R483-C2-REFUSALS, R483-C2-ORDER and R483-C1-LISTENER-REFUSALS.
 * RESIDUALS (named, each with its pinned quiet row): R-ARGV-HOST-ONLY, a bind address a launch supplies outside its host
 * flags (a dolt --config file), quiet row R483-Q-ARGV-HOST-ONLY; R-UNATTRIBUTED-LISTENER, a listener ss does not attribute
 * to the server's pid (a line with no users column, or one naming only another process), quiet row
 * R483-Q-UNATTRIBUTED-LISTENER; R-SELF-ANCHORED-ROSTER, a vendored block edited together with its recorded SHA-256 (the
 * F2 finding of refusals #1 and #2), quiet row ROSTER-Q-SELF-ANCHORED.
 * NOT CLAIMED by this census: what a judge returns for an input that no case title here lists.
 * Regenerating the record needs forge, rf and dolt on PATH: npm run build && node qa/workbench/dx-p14-acquisition-probe.mjs
 * --write qa/workbench/receipts/wb-mo89-dx-p14-acquisition-probe.json.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  GATES,
  judgeCrossHost,
  judgeDoltServerArgv,
  judgeExternalEnforcement,
  judgeForgeLeg,
  judgeForkMedia,
  judgeLoopbackListeners,
  PROBE_SCRIPT,
  parseSsListeners,
  RECORD_PATH,
  RECORD_SCHEMA,
} from "../qa/workbench/dx-p14-acquisition-judge.mjs";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { FORGE_GATE_STATUS_CONTRACT, registerNativeForgeGateStatus } from "../src/workbench/providers/forge.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDecision, type ReconcileDeps, type ReconcileRequest } from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import type { EvidenceReceipt } from "../src/workflow/reconcile.js";

const REPO = fileURLToPath(new URL("..", import.meta.url));
const ROSTER = "test/fixtures/dx-p14-requirements-roster.json";
const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const repoText = (path: string): string => readFileSync(join(REPO, path), "utf8");

interface VendoredBlock { readonly id: string; readonly lines: string; readonly sha256: string; readonly text: readonly string[] }
interface VendoredGate { readonly id: string; readonly line: number; readonly sha256: string; readonly text: string }
interface Roster {
  readonly bead: string;
  readonly source: { readonly commit: string; readonly path: string; readonly blob: string; readonly fileSha256: string };
  readonly requirements: readonly VendoredBlock[];
  readonly gates: readonly VendoredGate[];
}
const roster = (): Roster => JSON.parse(repoText(ROSTER)) as Roster;

type Json = Record<string, unknown>;
const object = (value: unknown): Json => (value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Json) : {});
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const record = (): Json => JSON.parse(repoText(RECORD_PATH)) as Json;
const leg = (id: string): Json => object(object(record().legs)[id]);

/** The numbered acceptance criteria of one vendored block. */
function criteriaOf(block: VendoredBlock): string[] {
  const start = block.text.indexOf("- Acceptance criteria:");
  return block.text.slice(start + 1).filter(line => /^ {2}\d+\. /.test(line));
}

describe("wb-mo89 DX P14 requirement roster", () => {
  it("ROSTER-BLOCKS: the roster vendors EAT-R478..EAT-R483 in order, each block held to its SHA-256, with 2, 2, 2, 3, 3 and 2 numbered acceptance criteria", () => {
    const vendored = roster();
    expect(vendored.bead).toBe("wb-mo89");
    expect(vendored.source.commit).toMatch(/^0a5ac3a3[0-9a-f]{32}$/);
    expect(vendored.requirements.map(block => block.id)).toEqual(["EAT-R478", "EAT-R479", "EAT-R480", "EAT-R481", "EAT-R482", "EAT-R483"]);
    for (const block of vendored.requirements) {
      expect(sha256(block.text.join("\n")), block.id).toBe(block.sha256);
      expect(block.text[0], block.id).toMatch(new RegExp(`^## ${block.id} — `));
      expect(block.text.at(-1), block.id).toMatch(/^- Maps-to: /);
    }
    expect(vendored.requirements.map(block => `${block.id}:${criteriaOf(block).length}`)).toEqual(["EAT-R478:2", "EAT-R479:2", "EAT-R480:2", "EAT-R481:3", "EAT-R482:3", "EAT-R483:2"]);
  });

  it("ROSTER-GATES: each vendored requirement names the gate GATES assigns it, and the vendored gate-registry rows read those four acquisition gates BLOCKED and G-FORGE and G-RF AVAILABLE", () => {
    const vendored = roster();
    expect(Object.keys(GATES)).toEqual(vendored.requirements.map(block => block.id));
    for (const block of vendored.requirements) {
      const gate = GATES[block.id as keyof typeof GATES];
      expect(block.text.join("\n"), block.id).toContain(gate);
    }
    const status = new Map(vendored.gates.map(gate => {
      expect(sha256(gate.text), gate.id).toBe(gate.sha256);
      expect(gate.text.startsWith(`| ${gate.id} | `), gate.id).toBe(true);
      return [gate.id, gate.text.split("|")[3]?.trim() ?? ""];
    }));
    expect([...status.keys()].sort()).toEqual(Object.values(GATES).sort());
    for (const gate of ["G-EXTERNAL-ENFORCEMENT", "G-FORK-MEDIA", "G-CROSS-HOST", "G-DESCENDANT-PIPE"]) expect(status.get(gate), gate).toBe("**BLOCKED**");
    for (const gate of ["G-FORGE", "G-RF"]) expect(status.get(gate), gate).toMatch(/^AVAILABLE/);
  });
});

describe("wb-mo89 committed acquisition record", () => {
  it("RECORD-TIE: the record carries its schema and bead, cites the roster's source commit and path, and is tied to the committed probe script's SHA-256", () => {
    const committed = record();
    const vendored = roster();
    expect(committed.schema).toBe(RECORD_SCHEMA);
    expect(committed.bead).toBe("wb-mo89");
    expect(committed.requirementsSource).toEqual({ commit: vendored.source.commit, path: vendored.source.path });
    expect(committed.probe).toEqual({ script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(join(REPO, PROBE_SCRIPT))) });
  });

  it("RECORD-NO-HOST-PATH: the committed record's text equals JSON.stringify of its parsed document with a two-space indent plus a final newline, so it carries no duplicate member, and neither that text nor any member name or string value of the parsed document contains /home/, /local/, /tmp/, /workplace/, /opt/ or /usr/", () => {
    const text = repoText(RECORD_PATH);
    const strings: string[] = [];
    const parsed: unknown = JSON.parse(text, (key, value: unknown) => {
      strings.push(key);
      if (typeof value === "string") strings.push(value);
      return value;
    });
    expect(text).toBe(`${JSON.stringify(parsed, null, 2)}\n`);
    expect(strings).toContain("schema");
    expect(strings).toContain(RECORD_SCHEMA);
    const hostPath = /\/(home|local|tmp|workplace|opt|usr)\//;
    expect(hostPath.test(text)).toBe(false);
    expect(strings.filter(value => hostPath.test(value))).toEqual([]);
  });

  it("RECORD-LEGS: the record holds exactly the EAT-R478, EAT-R479, EAT-R480, EAT-R481 and EAT-R483 legs, each naming its requirement and the gate GATES assigns it", () => {
    const legs = object(record().legs);
    expect(Object.keys(legs)).toEqual(["EAT-R478", "EAT-R479", "EAT-R480", "EAT-R481", "EAT-R483"]);
    for (const [id, value] of Object.entries(legs)) {
      expect(object(value).requirement, id).toBe(id);
      expect(object(value).gate, id).toBe(GATES[id as keyof typeof GATES]);
    }
  });
});

describe("EAT-R478 outside-machine same-cut enforcement (G-EXTERNAL-ENFORCEMENT)", () => {
  /** The complete receipt the R478-C1 and R478-C2-CONTROLS cases plant (never the record). */
  const complete = {
    configRevision: "enforcement-config@planted",
    base: "1".repeat(40),
    head: "2".repeat(40),
    changedSeamPaths: ["src/workbench/planted-seam.ts"],
    validator: { argv: ["planted-validator", "--same-cut"], exit: 1 },
    sameCutDecision: "documentation required in the same cut",
    controls: { seamOnly: { verdict: "refused" }, sameCutDoc: { verdict: "admitted" } },
  };
  const blocked = (missing: string[]) => ({ status: "BLOCKED", requirement: "EAT-R478", gate: "G-EXTERNAL-ENFORCEMENT", missing });

  it("R478-C2-BLOCKED: the record's leg holds no evidence, names the repository comparator qa/workbench/mwi-release.mjs, and reads BLOCKED on G-EXTERNAL-ENFORCEMENT naming the configuration and the producer invocation receipt; re-judging its evidence gives that reading", () => {
    const external = leg("EAT-R478");
    expect(external.evidence).toBeNull();
    expect(external.repositoryComparator).toEqual({ path: "qa/workbench/mwi-release.mjs" });
    expect(existsSync(join(REPO, "qa/workbench/mwi-release.mjs"))).toBe(true);
    const expected = { status: "BLOCKED", requirement: "EAT-R478", gate: "G-EXTERNAL-ENFORCEMENT", missing: ["outside-machine enforcement configuration", "producer invocation receipt"] };
    expect(external.verdict).toEqual(expected);
    expect(judgeExternalEnforcement(external.evidence)).toEqual(expected);
  });

  it("R478-C1-FIELDS: against the receipt planted here, the judge measures the complete receipt and names the one missing item for each omission: configRevision '', base 1234567, head absent, changedSeamPaths [], validator without argv, validator without exit, sameCutDecision null, controls without seamOnly and controls without sameCutDoc", () => {
    expect(judgeExternalEnforcement(complete)).toEqual({ status: "measured", requirement: "EAT-R478", controlsDistinguishable: true });
    const omissions: Array<[string, Json, string]> = [
      ["configRevision", { ...complete, configRevision: "" }, "external enforcement configuration revision"],
      ["base", { ...complete, base: "1234567" }, "exact base"],
      ["head", { ...complete, head: undefined }, "exact head"],
      ["changedSeamPaths", { ...complete, changedSeamPaths: [] }, "changed seam paths"],
      ["validator.argv", { ...complete, validator: { exit: 1 } }, "validator argv"],
      ["validator.exit", { ...complete, validator: { argv: ["planted-validator"] } }, "validator exit"],
      ["sameCutDecision", { ...complete, sameCutDecision: null }, "same-cut skill/doc decision"],
      ["controls.seamOnly", { ...complete, controls: { sameCutDoc: { verdict: "admitted" } } }, "seam-only cut control verdict"],
      ["controls.sameCutDoc", { ...complete, controls: { seamOnly: { verdict: "refused" } } }, "same-cut documentation control verdict"],
    ];
    for (const [field, evidence, named] of omissions) expect(judgeExternalEnforcement(evidence), field).toEqual(blocked([named]));
  });

  it("R478-C1-SHAS: against the receipt planted here, the judge names exact base as the one missing item for the bases 12345678, 39-hex, 41-hex and upper-case 40-hex, and exact head for the heads HEAD, 7-hex, 8-hex, 39-hex, 41-hex and upper-case 40-hex", () => {
    const shapes: Array<[string, Json, string]> = [
      ["base 8-hex", { ...complete, base: "12345678" }, "exact base"],
      ["base 39-hex", { ...complete, base: "1".repeat(39) }, "exact base"],
      ["base 41-hex", { ...complete, base: "1".repeat(41) }, "exact base"],
      ["base upper-case 40-hex", { ...complete, base: "A".repeat(40) }, "exact base"],
      ["head HEAD", { ...complete, head: "HEAD" }, "exact head"],
      ["head 7-hex", { ...complete, head: "2".repeat(7) }, "exact head"],
      ["head 8-hex", { ...complete, head: "2".repeat(8) }, "exact head"],
      ["head 39-hex", { ...complete, head: "2".repeat(39) }, "exact head"],
      ["head 41-hex", { ...complete, head: "2".repeat(41) }, "exact head"],
      ["head upper-case 40-hex", { ...complete, head: "B".repeat(40) }, "exact head"],
    ];
    for (const [shape, evidence, named] of shapes) expect(judgeExternalEnforcement(evidence), shape).toEqual(blocked([named]));
  });

  it("R478-C2-CONTROLS: the judge measures the complete planted receipt with controlsDistinguishable true for the control verdict pairs (seamOnly, sameCutDoc) (refused, admitted), (admitted, refused), (admitted, error) and (refused, error), and false for (admitted, admitted), (refused, refused) and (error, error)", () => {
    const pairs: Array<[string, string, boolean]> = [
      ["refused", "admitted", true],
      ["admitted", "refused", true],
      ["admitted", "error", true],
      ["refused", "error", true],
      ["admitted", "admitted", false],
      ["refused", "refused", false],
      ["error", "error", false],
    ];
    for (const [seamOnly, sameCutDoc, distinguishable] of pairs) {
      const evidence = { ...complete, controls: { seamOnly: { verdict: seamOnly }, sameCutDoc: { verdict: sameCutDoc } } };
      expect(judgeExternalEnforcement(evidence), `${seamOnly}/${sameCutDoc}`).toEqual({ status: "measured", requirement: "EAT-R478", controlsDistinguishable: distinguishable });
    }
  });
});

// ---- EAT-R479: the planted reconcile row and the src decision path a workflow_reconcile evidence read takes ----
/** C145 (no shipped effectful Forge producer): the non-read row is planted, under an id src registers none of. */
const PLANTED_ID = "forge.planted.effect";
const FIXTURE_ROOT = "/workspace/dx-p14-forge-fixture";
const TASK_ID = "wf_dx-p14-forge-binding";
const SESSION = "s1";
const PRINCIPAL = "local-operator:1:s1";
/** A synthetic host clock for the decision core; not a measurement stamp. */
const NOW = "2001-01-01T00:00:00Z";
const GRANTS = ["workbench:observe", "forge:inspect", "reconcile:forge.acknowledge"];
const REASON = "wb-mo89 acquisition: a planted forge row reconciled against a committed gate.status reading";

function plantedRow(recorded: string | null): WorkflowJournalEntry {
  return { index: 0, key: "k0", ok: true, kind: "node", capabilityId: PLANTED_ID, effectClass: "write", ...(recorded === null ? {} : { nativeRefs: [{ provider: "forge", type: "operation", id: recorded }] }) };
}
function decisionRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeForgeGateStatus(registry, FIXTURE_ROOT);
  registry.register({
    descriptor: { id: PLANTED_ID, version: "1.0.0", description: "Test-only planted non-read Forge row (C145); never invoked", inputSchema: { type: "object" }, effectClass: "write", permissions: ["forge:planted"], supportedModes: ["invoke"] },
    invoke: async () => { throw new CapabilityError("unavailable", "the planted row's capability is never invoked"); },
  });
  return registry;
}
function request(action: ReconcileRequest["action"], params: Record<string, JsonValue>): ReconcileRequest {
  return { action, taskId: TASK_ID, position: 0, grants: GRANTS, scope: { workspace: FIXTURE_ROOT, principal: PRINCIPAL }, sessionId: SESSION, principal: { id: PRINCIPAL, role: "local-operator" }, params };
}
function deps(row: WorkflowJournalEntry, receipts: readonly EvidenceReceipt[]): ReconcileDeps {
  const registry = decisionRegistry();
  return { task: { status: "completed", observationScope: { sessionId: SESSION, workspace: FIXTURE_ROOT, principal: PRINCIPAL } }, entries: [row], receipts, currentEffectClass: id => registry.effectClassOf(id), now: () => NOW };
}
function outcomeOf(decision: ReconcileDecision): string {
  if (decision.decision === "denied") return `deny:${decision.policy}`;
  const reconcile = decision.decision === "acknowledge" ? decision.entry.reconcile : undefined;
  return reconcile?.decision === "acknowledge" ? `ack:${reconcile.evidenceClass}` : decision.decision;
}
/** The committed status reading at `index`, as the registered capability's value. */
function committedReading(index: number): JsonValue {
  const read = object(list(leg("EAT-R479").statusReads)[index]);
  return JSON.parse(JSON.stringify(read.reading)) as JsonValue;
}
const readingOperation = (index: number): string => String(object(object(committedReading(index)).source).operation_id);
/** One reconcile against `row`: the evidence decision, the receipt minted from the committed reading, and the effect-absent acknowledgement citing it. */
function reconcileWith(row: WorkflowJournalEntry, readingIndex: number): { read: { capabilityId: string; input: JsonValue; recordedNativeRefs: readonly unknown[] }; receipt: EvidenceReceipt; outcome: string } {
  const evidence = decideReconcile(request("evidence", { evidence: { capabilityId: "forge.gate.status", input: { target: FIXTURE_ROOT } } }), deps(row, []));
  if (evidence.decision !== "evidence") throw new Error(`the reconcile core refused the evidence read: ${outcomeOf(evidence)}`);
  const receipt = mintEvidenceReceipt({
    taskId: TASK_ID, position: evidence.read.position, producer: evidence.read.producer, capabilityId: evidence.read.capabilityId,
    input: evidence.read.input, requestedAt: NOW, observedAt: NOW, result: committedReading(readingIndex), recordedNativeRefs: evidence.read.recordedNativeRefs,
  });
  const acknowledgement = decideReconcile(request("acknowledge", { reason: REASON, determination: "effect-absent", receiptIds: [receipt.receiptId] }), deps(row, [receipt]));
  return { read: evidence.read, receipt, outcome: outcomeOf(acknowledgement) };
}

describe("EAT-R479 live Forge reconcile binding (G-FORGE)", () => {
  it("R479-C1-PRODUCER: the record's leg names forge's version, revision, variant and executable SHA-256, and its two disposable-fixture gate runs are forge build --json, exit 0, verdict PASS, each with its own operation id", () => {
    const forge = leg("EAT-R479");
    const producer = object(forge.producer);
    expect(producer.name).toBe("forge");
    expect([producer.version, producer.revision, producer.variant]).toEqual([expect.stringMatching(/^\d+\.\d+\.\d+/), expect.stringMatching(/^[0-9a-f]{7,64}$/), expect.stringMatching(/^\S+$/)]);
    expect(producer.executableSha256).toMatch(/^[0-9a-f]{64}$/);
    const runs = list(forge.gateRuns).map(object);
    expect(runs.map(run => [run.ordinal, run.argv, run.processExit, run.gateVerdict])).toEqual([[1, ["forge", "build", "--json"], 0, "PASS"], [2, ["forge", "build", "--json"], 0, "PASS"]]);
    for (const run of runs) expect(run.operationId).toMatch(/^op-[0-9a-f]{32}$/);
    expect(new Set(runs.map(run => run.operationId)).size).toBe(2);
    expect(forge.verdict).toEqual({ status: "measured", requirement: "EAT-R479" });
    expect(judgeForgeLeg(forge)).toEqual(forge.verdict);
  });

  it("R479-C1-READS: each of the two registered forge.gate.status readings carries the v1 contract and gate.status, a command id and an operation id of its own, distinct from both gate runs' ids and from the other reading's; the record names each request as gate.status with params {root}; and each reading's package row names the latest gate run by that run's command id and does not carry that run's operation id", () => {
    const forge = leg("EAT-R479");
    const reads = list(forge.statusReads).map(object);
    expect(reads.map(read => [read.ordinal, read.capabilityId, read.input])).toEqual([[1, "forge.gate.status", { target: "<fixture>" }], [2, "forge.gate.status", { target: "<fixture>" }]]);
    const runs = list(forge.gateRuns).map(object);
    const runOperations = runs.map(run => run.operationId);
    const latestCommand = String(runs.at(-1)?.commandId);
    const readOperations = reads.map((read, index) => {
      expect(object(read.transport).method).toBe("gate.status");
      expect(object(read.transport).params).toEqual({ root: "<fixture>" });
      const reading = object(read.reading);
      expect([reading.contract, reading.protocolMethod]).toEqual([FORGE_GATE_STATUS_CONTRACT, "gate.status"]);
      const source = object(reading.source);
      expect(object(source.ids).command_id).toMatch(/^cmd_[0-9a-f]{12}$/);
      const rows = list(object(source.data).packages).map(object);
      expect(rows.map(row => [row.last_result, list(object(row.last_result_state).source_ref).filter(ref => String(ref).startsWith("file:.forge/logs/commands.jsonl#"))])).toEqual([["success", [`file:.forge/logs/commands.jsonl#${latestCommand}`]]]);
      expect(JSON.stringify(rows)).not.toContain(String(runOperations.at(-1)));
      return readingOperation(index);
    });
    for (const operation of readOperations) {
      expect(operation).toMatch(/^op-[0-9a-f]{32}$/);
      expect(runOperations).not.toContain(operation);
    }
    expect(new Set(readOperations).size).toBe(2);
    const readCommands = reads.map(read => String(object(object(object(read.reading).source).ids).command_id));
    for (const command of readCommands) expect(runs.map(run => run.commandId)).not.toContain(command);
    expect(new Set(readCommands).size).toBe(2);
  });

  it("R479-C1-NATIVEREF: src nativeEvidence reads each committed reading's native reference as forge/operation/<that reading's own operation_id>", () => {
    for (const index of [0, 1]) {
      expect(nativeRefOf(nativeEvidence("forge.gate.status", committedReading(index)))).toEqual({ provider: "forge", type: "operation", id: readingOperation(index) });
    }
  });

  it("R479-C2-BINDING: through src decideReconcile and mintEvidenceReceipt on the planted non-read row, the evidence read asks forge.gate.status with input {target} only; the row recording the first reading's own operation binds journal-recorded and acknowledges producer-confirmed, the row recording the first gate run's operation binds unbound and is denied evidence-identity-mismatch, and the row recording the first reading's operation is denied the same way against the second reading", () => {
    const gateRun = String(object(list(leg("EAT-R479").gateRuns)[0]).operationId);
    const matched = reconcileWith(plantedRow(readingOperation(0)), 0);
    expect([matched.read.capabilityId, matched.read.input]).toEqual(["forge.gate.status", { target: FIXTURE_ROOT }]);
    expect(matched.read.recordedNativeRefs).toEqual([{ provider: "forge", type: "operation", id: readingOperation(0) }]);
    expect([matched.receipt.binding, matched.receipt.nativeRef, matched.outcome]).toEqual(["journal-recorded", { provider: "forge", type: "operation", id: readingOperation(0) }, "ack:producer-confirmed"]);
    const unrelated = reconcileWith(plantedRow(gateRun), 0);
    expect([unrelated.read.capabilityId, unrelated.read.input]).toEqual(["forge.gate.status", { target: FIXTURE_ROOT }]);
    expect(unrelated.read.recordedNativeRefs).toEqual([{ provider: "forge", type: "operation", id: gateRun }]);
    expect([unrelated.receipt.binding, unrelated.outcome]).toEqual(["unbound", "deny:evidence-identity-mismatch"]);
    const laterRead = reconcileWith(plantedRow(readingOperation(0)), 1);
    expect([laterRead.receipt.binding, laterRead.outcome]).toEqual(["unbound", "deny:evidence-identity-mismatch"]);
  });

  it("R479-C2-NO-REFS: the planted row recording no reference binds the committed reading operator-asserted and its acknowledgement is operator-asserted, never producer-confirmed", () => {
    const bare = reconcileWith(plantedRow(null), 0);
    expect(bare.read.recordedNativeRefs).toEqual([]);
    expect([bare.receipt.binding, bare.outcome]).toEqual(["operator-asserted", "ack:operator-asserted"]);
  });

  it("R479-C2-BLOCKED: the forge-leg judge reads BLOCKED on G-FORGE naming the executable, the gate runs and the operation envelope for the null leg, and names the one missing item for the committed leg (two gate runs, two readings) edited to carry: an empty producer; a producer without its SHA-256; a producer without its version; only the first gate run; the first or the second gate run without its operation id; the first or the second gate run with process exit null; no readings; both readings with an empty source; the first or the second reading without its operation id", () => {
    const forge = leg("EAT-R479");
    const blocked = (missing: string[]) => ({ status: "BLOCKED", requirement: "EAT-R479", gate: "G-FORGE", missing });
    const runs = list(forge.gateRuns);
    const reads = list(forge.statusReads);
    expect([runs.length, reads.length]).toEqual([2, 2]);
    const runEdited = (at: number, edit: Json): unknown[] => runs.map((run, index) => (index === at ? { ...object(run), ...edit } : run));
    const readWithoutOperation = (at: number): unknown[] => {
      const copy = JSON.parse(JSON.stringify(reads)) as Array<{ reading: { source: Json } }>;
      delete copy[at]?.reading.source.operation_id;
      return copy;
    };
    expect(judgeForgeLeg(null)).toEqual(blocked(["forge executable", "disposable fixture gate runs", "gate.status operation envelope"]));
    expect(judgeForgeLeg({ ...forge, producer: {} })).toEqual(blocked(["forge executable"]));
    expect(judgeForgeLeg({ ...forge, producer: { ...object(forge.producer), executableSha256: undefined } })).toEqual(blocked(["forge executable"]));
    expect(judgeForgeLeg({ ...forge, producer: { ...object(forge.producer), version: undefined } })).toEqual(blocked(["forge executable"]));
    expect(judgeForgeLeg({ ...forge, gateRuns: runs.slice(0, 1) })).toEqual(blocked(["disposable fixture gate runs"]));
    for (const at of [0, 1]) {
      expect(judgeForgeLeg({ ...forge, gateRuns: runEdited(at, { operationId: undefined }) }), `gate run ${at + 1} operationId`).toEqual(blocked(["disposable fixture gate runs"]));
      expect(judgeForgeLeg({ ...forge, gateRuns: runEdited(at, { processExit: null }) }), `gate run ${at + 1} processExit`).toEqual(blocked(["disposable fixture gate runs"]));
      expect(judgeForgeLeg({ ...forge, statusReads: readWithoutOperation(at) }), `reading ${at + 1} operation_id`).toEqual(blocked(["gate.status operation envelope"]));
    }
    expect(judgeForgeLeg({ ...forge, statusReads: [] })).toEqual(blocked(["gate.status operation envelope"]));
    expect(judgeForgeLeg({ ...forge, statusReads: reads.map(read => ({ ...object(read), reading: { contract: FORGE_GATE_STATUS_CONTRACT, source: {} } })) })).toEqual(blocked(["gate.status operation envelope"]));
  });
});

describe("EAT-R480 authorized fork registry media (G-FORK-MEDIA)", () => {
  /** The complete capture the R480-C1-FIELDS and R480-C2-IDENTITY cases plant (never the record). */
  const complete = {
    authorizedForkIdentity: "@planted/fork-artifact",
    upstreamIdentity: "@planted/upstream-artifact",
    capturedArtifact: { name: "@planted/fork-artifact", version: "0.0.1" },
    manifestMediaUrls: ["https://media.invalid/planted.png"],
    pageUrl: "https://registry.invalid/planted",
    captureDate: "planted capture date",
    renderedSources: ["https://media.invalid/planted.png"],
  };
  const blocked = (missing: string[]) => ({ status: "BLOCKED", requirement: "EAT-R480", gate: "G-FORK-MEDIA", grade: "PLAUSIBLE", missing });

  it("R480-C2-BLOCKED: the record's leg reads the manifest identity (the upstream identity) and its two media URLs by SHA-256 with no approved fork identity and no capture, and reads BLOCKED on G-FORK-MEDIA keeping PLAUSIBLE; re-judging its evidence gives that reading", () => {
    const media = leg("EAT-R480");
    const evidence = object(media.evidence);
    expect(object(evidence.manifestIdentity).name).toBe(evidence.upstreamIdentity);
    expect(evidence.manifestMediaUrlForm).toBe("sha256 of the manifest pi.image and pi.video URLs, in that order");
    const urls = list(evidence.manifestMediaUrls);
    expect(urls.length).toBe(2);
    for (const url of urls) expect(url).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect([evidence.authorizedForkIdentity, evidence.capturedArtifact, evidence.pageUrl, evidence.captureDate, evidence.renderedSources]).toEqual([null, null, null, null, []]);
    const expected = {
      status: "BLOCKED", requirement: "EAT-R480", gate: "G-FORK-MEDIA", grade: "PLAUSIBLE",
      missing: ["approved fork artifact identity", "captured artifact identity and version", "registry page URL", "capture date", "rendered image/video source"],
    };
    expect(media.verdict).toEqual(expected);
    expect(judgeForkMedia(media.evidence)).toEqual(expected);
  });

  it("R480-C1-FIELDS: against the capture planted here, the judge measures the complete capture of the named fork identity, reads the null input BLOCKED naming the fork identity and the render capture, and names the one missing item for each omission: authorizedForkIdentity null, capturedArtifact without its name, capturedArtifact without its version, manifestMediaUrls [], pageUrl '', captureDate absent and renderedSources []", () => {
    expect(judgeForkMedia(complete)).toEqual({ status: "measured", requirement: "EAT-R480", belongsToFork: true });
    expect(judgeForkMedia(null)).toEqual(blocked(["approved fork artifact identity", "remote registry-page render capture"]));
    const omissions: Array<[string, Json, string]> = [
      ["authorizedForkIdentity", { ...complete, authorizedForkIdentity: null }, "approved fork artifact identity"],
      ["capturedArtifact.name", { ...complete, capturedArtifact: { version: "0.0.1" } }, "captured artifact identity and version"],
      ["capturedArtifact.version", { ...complete, capturedArtifact: { name: "@planted/fork-artifact" } }, "captured artifact identity and version"],
      ["manifestMediaUrls", { ...complete, manifestMediaUrls: [] }, "manifest media URLs"],
      ["pageUrl", { ...complete, pageUrl: "" }, "registry page URL"],
      ["captureDate", { ...complete, captureDate: undefined }, "capture date"],
      ["renderedSources", { ...complete, renderedSources: [] }, "rendered image/video source"],
    ];
    for (const [field, evidence, named] of omissions) expect(judgeForkMedia(evidence), field).toEqual(blocked([named]));
  });

  it("R480-C2-IDENTITY: against the capture planted here, the judge reads BLOCKED, naming a capture of the authorized fork artifact, a capture of the upstream package with the fork identity or with the upstream identity named as the authorized one, and a capture of a third package; and a capture of the upstream package with pageUrl '' names the registry page URL only", () => {
    const another = blocked(["a capture of the authorized fork artifact (the capture names another package)"]);
    const upstream = { name: "@planted/upstream-artifact", version: "0.0.1" };
    expect(judgeForkMedia({ ...complete, capturedArtifact: upstream })).toEqual(another);
    expect(judgeForkMedia({ ...complete, authorizedForkIdentity: "@planted/upstream-artifact", capturedArtifact: upstream })).toEqual(another);
    expect(judgeForkMedia({ ...complete, capturedArtifact: { name: "@planted/other-artifact", version: "0.0.1" } })).toEqual(another);
    expect(judgeForkMedia({ ...complete, capturedArtifact: upstream, pageUrl: "" })).toEqual(blocked(["registry page URL"]));
  });
});

describe("EAT-R481 native-tier portability outside the developer layout (G-CROSS-HOST)", () => {
  const BLOCKED_HERE = ["a host where the developer home is not available", "the host's declared PATH", "the host's declared HYPERUNIX_HX", "resolved binaries and versions", "cwd", "native-read test result", "the gate-status probe's own repository target or its refusal"];
  /** The complete independent-host receipt the R481-C1 cases plant (never the record). */
  const complete = {
    developerHomeAvailable: false,
    path: "/opt/planted/bin",
    hyperunixHx: "/opt/planted/bin/hx",
    binaries: [{ name: "hx", version: "0.0.0-planted", underDeveloperHome: false }],
    cwd: "/srv/planted-checkout",
    testResult: { command: "planted native-read", exit: 0 },
    forgeTarget: { recorded: "/srv/planted-checkout" },
  };
  const blocked = (missing: string[]) => ({ status: "BLOCKED", requirement: "EAT-R481", gate: "G-CROSS-HOST", missing });
  const binary = (name: string, version: string | null, underDeveloperHome: boolean) => ({ name, version, underDeveloperHome });

  it("R481-C3-BLOCKED: the record's leg is this seat's developer layout (developer home available; hx, rf and forge each resolved under it, versions not read) and reads BLOCKED on G-CROSS-HOST naming the seven items BLOCKED_HERE lists; re-judging its evidence gives that reading", () => {
    const host = leg("EAT-R481");
    const evidence = object(host.evidence);
    expect(evidence.developerHomeAvailable).toBe(true);
    expect(list(evidence.binaries)).toEqual([{ name: "hx", version: null, underDeveloperHome: true }, { name: "rf", version: null, underDeveloperHome: true }, { name: "forge", version: null, underDeveloperHome: true }]);
    const expected = { status: "BLOCKED", requirement: "EAT-R481", gate: "G-CROSS-HOST", missing: BLOCKED_HERE };
    expect(host.verdict).toEqual(expected);
    expect(judgeCrossHost(host.evidence)).toEqual(expected);
  });

  it("R481-C1-FIELDS: against the independent-host receipt planted here, the judge measures the complete receipt and the same receipt with forgeTarget {refusedMissing: true}, reads the null input BLOCKED naming the host layout and its receipt, and names the one missing item for each omission: developerHomeAvailable true, path null, hyperunixHx '', the only binary without a version, the only binary under the developer home, cwd absent, testResult without exit and forgeTarget {}", () => {
    expect(judgeCrossHost(complete)).toEqual({ status: "measured", requirement: "EAT-R481", testExit: 0 });
    expect(judgeCrossHost({ ...complete, forgeTarget: { refusedMissing: true } })).toEqual({ status: "measured", requirement: "EAT-R481", testExit: 0 });
    expect(judgeCrossHost(null)).toEqual(blocked(["an independent host layout without the developer home", "that host's native-read receipt"]));
    const omissions: Array<[string, Json, string]> = [
      ["developerHomeAvailable", { ...complete, developerHomeAvailable: true }, "a host where the developer home is not available"],
      ["path", { ...complete, path: null }, "the host's declared PATH"],
      ["hyperunixHx", { ...complete, hyperunixHx: "" }, "the host's declared HYPERUNIX_HX"],
      ["binaries", { ...complete, binaries: [{ name: "hx", version: null, underDeveloperHome: false }] }, "resolved binaries and versions"],
      ["binaries.underDeveloperHome", { ...complete, binaries: [{ name: "hx", version: "0.0.0-planted", underDeveloperHome: true }] }, "binaries resolved outside the developer home"],
      ["cwd", { ...complete, cwd: undefined }, "cwd"],
      ["testResult", { ...complete, testResult: { command: "planted native-read" } }, "native-read test result"],
      ["forgeTarget", { ...complete, forgeTarget: {} }, "the gate-status probe's own repository target or its refusal"],
    ];
    for (const [field, evidence, named] of omissions) expect(judgeCrossHost(evidence), field).toEqual(blocked([named]));
  });

  it("R481-C1-BINARIES: against the planted receipt carrying two or three binaries, the judge names only binaries resolved outside the developer home when the second or the third binary resolves under the developer home, and only resolved binaries and versions when the second or the third binary has no version and when the first binary resolves under the developer home and the second has no version", () => {
    const home = "binaries resolved outside the developer home";
    const versions = "resolved binaries and versions";
    const receipts: Array<[string, Array<ReturnType<typeof binary>>, string]> = [
      ["second under the developer home", [binary("hx", "1", false), binary("rf", "1", true)], home],
      ["third under the developer home", [binary("hx", "1", false), binary("rf", "1", false), binary("forge", "1", true)], home],
      ["second without a version", [binary("hx", "1", false), binary("rf", null, false)], versions],
      ["third without a version", [binary("hx", "1", false), binary("rf", "1", false), binary("forge", null, false)], versions],
      ["first under the developer home, second without a version", [binary("hx", "1", true), binary("rf", null, false)], versions],
    ];
    for (const [shape, binaries, named] of receipts) expect(judgeCrossHost({ ...complete, binaries }), shape).toEqual(blocked([named]));
  });
});

/**
 * The four dolt sql-server launch lines of the owner-directed baseline receipt probes/reqset-rollup/c238-bind-address.txt
 * (2026-11-11T07:32:01Z; the dx-triage probe evidence root under artifacts/forge/pi-owner/2026-11-11-dx-triage-probes),
 * argv[0] reduced to its basename.
 */
const C238_BASELINE = [
  ["dolt", "sql-server", "-H", "127.0.0.1", "-P", "45491", "--loglevel=warning"],
  ["dolt", "sql-server", "-H", "127.0.0.1", "-P", "33439", "--loglevel=warning"],
  ["dolt", "sql-server", "--host", "127.0.0.1", "--port", "41649"],
  ["dolt", "sql-server", "-H", "127.0.0.1", "-P", "39455", "--loglevel=warning"],
] as const;
const launch = (...flags: string[]): string[] => ["dolt", "sql-server", ...flags, "--port", "3306"];

describe("EAT-R483 explicit loopback binding for rf-spawned Dolt servers (G-RF)", () => {
  const reason = (argv: readonly string[]): string => {
    const judged = judgeDoltServerArgv(argv);
    return judged.verdict === "refused" ? judged.reason : judged.verdict;
  };

  it("R483-C1-JOURNEY: the record's leg initialised a dolt-backed workspace, read the root's ledger empty, returned one registered reactivefiber.render.preview invoke, then read exactly one launched, proven, active server for that root, stopped it with the root-selected stop, saw its pid gone and read the root's ledger empty again", () => {
    const rf = leg("EAT-R483");
    expect(object(object(rf.workspace).init)).toEqual({ argv: ["rf", "init", "--backend", "dolt", "--json", "--no-input", "<workspace>"], processExit: 0, ok: true });
    const before = object(rf.ledgerBefore);
    expect([before.processExit, before.ok, object(before.totals).servers, before.servers]).toEqual([0, true, 0, []]);
    const render = object(rf.render);
    expect([render.capabilityId, render.outcome, render.ok, render.contract]).toEqual(["reactivefiber.render.preview", "returned", true, "reactivefiber.render.preview/v1"]);
    const after = object(rf.ledgerAfter);
    const servers = list(after.servers).map(object);
    expect(servers.map(server => [server.provenance, server.class, server.proven, server.listener_owned, server.workspaceRootIsProbeRoot])).toEqual([["launched", "active", true, true, true]]);
    const server = object(rf.server);
    expect([server.pid, server.port]).toEqual([servers[0]?.pid, servers[0]?.port]);
    expect(object(rf.stop)).toEqual({ argv: ["rf", "storage", "local-servers", "--root", "<workspace>", "--stop", "--yes", "--json"], processExit: 0, ok: true });
    expect(rf.pidGoneAfterStop).toBe(true);
    const final = object(rf.ledgerFinal);
    expect([final.processExit, object(final.totals).servers, final.servers]).toEqual([0, 0, []]);
  });

  it("R483-C1-ARGV: the launched server's recorded argv is a dolt sql-server launch by the dolt on PATH, and re-judging it gives explicit-loopback with exactly one --host 127.0.0.1 flag; the recorded verdict is the same", () => {
    const server = object(leg("EAT-R483").server);
    const argv = list(server.argv).map(String);
    expect(argv.slice(0, 2)).toEqual(["dolt", "sql-server"]);
    expect(server.executableIsDoltOnPath).toBe(true);
    const expected = { verdict: "explicit-loopback", flags: [{ form: "--host", value: "127.0.0.1" }] };
    expect(judgeDoltServerArgv(argv)).toEqual(expected);
    expect(object(server.verdicts).argv).toEqual(expected);
  });

  it("R483-C1-SOCKETS: the pid-bound ss readback (ss -ltnpH, exit 0) lists the ledger port, every listener of that pid is at 127.0.0.1, and re-judging gives loopback-only; the recorded verdict is the same", () => {
    const server = object(leg("EAT-R483").server);
    expect(object(server.ss)).toEqual({ argv: ["ss", "-ltnpH"], processExit: 0 });
    const listeners = list(server.listeners).map(object);
    expect(listeners.length).toBeGreaterThan(0);
    for (const listener of listeners) expect([listener.address, list(listener.pids)]).toEqual(["127.0.0.1", [server.pid]]);
    expect(listeners.map(listener => listener.port)).toContain(server.port);
    const judged = judgeLoopbackListeners({ pid: Number(server.pid), port: Number(server.port), listeners: listeners as Array<{ address: string; port: number; pids: number[] }> });
    expect(judged.verdict).toBe("loopback-only");
    expect(object(server.verdicts).listeners).toEqual(judged);
  });

  it("R483-C1-BASELINE: each of the four dolt sql-server launch lines of the c238 bind-address baseline judges explicit-loopback", () => {
    expect(C238_BASELINE.map(argv => judgeDoltServerArgv(argv).verdict)).toEqual(["explicit-loopback", "explicit-loopback", "explicit-loopback", "explicit-loopback"]);
  });

  it("R483-C2-FORMS: the launcher contract accepts each of the three explicit forms -H 127.0.0.1, --host 127.0.0.1 and --host=127.0.0.1 as one explicit-loopback flag, reads dolt version as not-sql-server, and judges dolt --data-dir /srv/planted sql-server --host 0.0.0.0 and dolt --data-dir /srv/planted --loglevel warning sql-server --host 0.0.0.0 (one and two global flags before sql-server) as launches refused wildcard-host", () => {
    expect(judgeDoltServerArgv(launch("-H", "127.0.0.1"))).toEqual({ verdict: "explicit-loopback", flags: [{ form: "-H", value: "127.0.0.1" }] });
    expect(judgeDoltServerArgv(launch("--host", "127.0.0.1"))).toEqual({ verdict: "explicit-loopback", flags: [{ form: "--host", value: "127.0.0.1" }] });
    expect(judgeDoltServerArgv(launch("--host=127.0.0.1"))).toEqual({ verdict: "explicit-loopback", flags: [{ form: "--host=", value: "127.0.0.1" }] });
    expect(judgeDoltServerArgv(["dolt", "version"])).toEqual({ verdict: "not-sql-server" });
    expect(judgeDoltServerArgv(["dolt", "--data-dir", "/srv/planted", "sql-server", "--host", "0.0.0.0"])).toMatchObject({ verdict: "refused", reason: "wildcard-host" });
    expect(judgeDoltServerArgv(["dolt", "--data-dir", "/srv/planted", "--loglevel", "warning", "sql-server", "--host", "0.0.0.0"])).toMatchObject({ verdict: "refused", reason: "wildcard-host" });
  });

  it("R483-C2-REFUSALS: over captured argv the launcher contract refuses, each with its reason: no host flag; a trailing --host, -H before another flag and an empty --host=; 0.0.0.0, ::, [::] and * in each of the three forms; 10.0.0.5, 192.168.1.20, dolt.example.invalid, localhost, ::1, 127.0.0.2, 127.0.0.10, '127.0.0.1 ' and ' 127.0.0.1' after --host, and --host='127.0.0.1 '; and the spellings -H127.0.0.1, -H=127.0.0.1 and --hostname", () => {
    expect(reason(launch())).toBe("no-explicit-host-flag");
    expect(reason(["dolt", "sql-server", "--port", "3306", "--host"])).toBe("missing-host-value");
    expect(reason(launch("-H", "--loglevel=warning"))).toBe("missing-host-value");
    expect(reason(launch("--host="))).toBe("missing-host-value");
    for (const wildcard of ["0.0.0.0", "::", "[::]", "*"]) {
      expect([reason(launch("-H", wildcard)), reason(launch("--host", wildcard)), reason(launch(`--host=${wildcard}`))], wildcard).toEqual(["wildcard-host", "wildcard-host", "wildcard-host"]);
    }
    for (const other of ["10.0.0.5", "192.168.1.20", "dolt.example.invalid", "localhost", "::1", "127.0.0.2", "127.0.0.10", "127.0.0.1 ", " 127.0.0.1"]) {
      expect(reason(launch("--host", other)), `[${other}]`).toBe("host-not-127.0.0.1");
    }
    expect(reason(launch("--host=127.0.0.1 "))).toBe("host-not-127.0.0.1");
    for (const spelling of ["-H127.0.0.1", "-H=127.0.0.1", "--hostname"]) expect(reason(launch(spelling)), spelling).toBe("unrecognized-host-form");
  });

  it("R483-C2-ORDER: with two host flags the launcher contract refuses 0.0.0.0 listed after 127.0.0.1 (-H 127.0.0.1 --host 0.0.0.0) and before it (--host 0.0.0.0 -H 127.0.0.1) as wildcard-host, and 10.0.0.5 listed after 127.0.0.1 (--host=127.0.0.1 -H 10.0.0.5) and before it (-H 10.0.0.5 --host 127.0.0.1) as host-not-127.0.0.1", () => {
    expect(reason(launch("-H", "127.0.0.1", "--host", "0.0.0.0"))).toBe("wildcard-host");
    expect(reason(launch("--host", "0.0.0.0", "-H", "127.0.0.1"))).toBe("wildcard-host");
    expect(reason(launch("--host=127.0.0.1", "-H", "10.0.0.5"))).toBe("host-not-127.0.0.1");
    expect(reason(launch("-H", "10.0.0.5", "--host", "127.0.0.1"))).toBe("host-not-127.0.0.1");
  });

  it("R483-C1-LISTENER-REFUSALS: over literal ss lines the listener judge accepts one 127.0.0.1 listener on the ledger port and refuses a pid with no listener, a 0.0.0.0 listener listed after or before a 127.0.0.1 one, a 0.0.0.0 listener whose users column names this pid after another process, before another process or between two others, a listener at [::], 127.0.0.2 or 127.0.0.10, and a ledger port the pid does not listen on", () => {
    const ss = (address: string, port: number, pid: number): string => `LISTEN 0      4096   ${address}:${port}   0.0.0.0:*    users:(("dolt",pid=${pid},fd=17))`;
    const judge = (lines: string[], port = 41687) => judgeLoopbackListeners({ pid: 4242, port, listeners: parseSsListeners(lines.join("\n")) });
    expect(judge([ss("127.0.0.1", 41687, 4242)])).toEqual({ verdict: "loopback-only", addresses: ["127.0.0.1:41687"] });
    expect(judge([ss("127.0.0.1", 41687, 4343)])).toEqual({ verdict: "refused", reason: "no-listener-for-pid", addresses: [] });
    expect(judge([ss("127.0.0.1", 41687, 4242), ss("0.0.0.0", 41688, 4242)])).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["127.0.0.1:41687", "0.0.0.0:41688"] });
    expect(judge([ss("0.0.0.0", 41688, 4242), ss("127.0.0.1", 41687, 4242)])).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["0.0.0.0:41688", "127.0.0.1:41687"] });
    const shared = (users: string): string => `LISTEN 0      4096   0.0.0.0:41688   0.0.0.0:*    users:(${users})`;
    for (const users of [`("sh",pid=9,fd=3),("dolt",pid=4242,fd=18)`, `("dolt",pid=4242,fd=18),("sh",pid=9,fd=3)`, `("sh",pid=9,fd=3),("dolt",pid=4242,fd=18),("sh",pid=10,fd=4)`]) {
      expect(judge([ss("127.0.0.1", 41687, 4242), shared(users)]), users).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["127.0.0.1:41687", "0.0.0.0:41688"] });
    }
    expect(judge([ss("127.0.0.10", 41687, 4242)])).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["127.0.0.10:41687"] });
    expect(judge([ss("[::]", 41687, 4242)])).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["[::]:41687"] });
    expect(judge([ss("127.0.0.2", 41687, 4242)])).toEqual({ verdict: "refused", reason: "listener-not-127.0.0.1", addresses: ["127.0.0.2:41687"] });
    expect(judge([ss("127.0.0.1", 41687, 4242)], 41690)).toEqual({ verdict: "refused", reason: "ledger-port-not-listening", addresses: ["127.0.0.1:41687"] });
  });
});

describe("wb-mo89 named residuals: each quiet row reds when its escape stops being quiet", () => {
  it("R483-Q-ARGV-HOST-ONLY (R-ARGV-HOST-ONLY): the launcher-contract judge reads dolt sql-server --config /srv/planted/config.yaml -H 127.0.0.1 as explicit-loopback with the one -H flag, reading no host the config file would set", () => {
    expect(judgeDoltServerArgv(["dolt", "sql-server", "--config", "/srv/planted/config.yaml", "-H", "127.0.0.1"])).toEqual({ verdict: "explicit-loopback", flags: [{ form: "-H", value: "127.0.0.1" }] });
  });

  it("R483-Q-UNATTRIBUTED-LISTENER (R-UNATTRIBUTED-LISTENER): beside this pid's one 127.0.0.1 listener on the ledger port, the listener judge reads a 0.0.0.0 ss line with no users column, and a 0.0.0.0 ss line naming only another process, as no listener of this pid: loopback-only", () => {
    const own = `LISTEN 0      4096   127.0.0.1:41687   0.0.0.0:*    users:(("dolt",pid=4242,fd=17))`;
    const unattributed = [`LISTEN 0      4096   0.0.0.0:41688   0.0.0.0:*`, `LISTEN 0      4096   0.0.0.0:41688   0.0.0.0:*    users:(("sh",pid=9,fd=3))`];
    for (const line of unattributed) {
      expect(judgeLoopbackListeners({ pid: 4242, port: 41687, listeners: parseSsListeners([own, line].join("\n")) }), line).toEqual({ verdict: "loopback-only", addresses: ["127.0.0.1:41687"] });
    }
  });

  it("ROSTER-Q-SELF-ANCHORED (R-SELF-ANCHORED-ROSTER): no file exists in this tree at the roster's recorded source path, and the first vendored block with its last line edited and its recorded SHA-256 recomputed still passes the three per-block checks ROSTER-BLOCKS applies", () => {
    const vendored = roster();
    expect(existsSync(join(REPO, vendored.source.path))).toBe(false);
    const block = vendored.requirements[0];
    if (block === undefined) throw new Error("the roster vendors no requirement block");
    const text = [...block.text.slice(0, -1), `${block.text.at(-1) ?? ""} (planted edit)`];
    const twin = { ...block, text, sha256: sha256(text.join("\n")) };
    expect(twin.text).not.toEqual(block.text);
    expect(sha256(twin.text.join("\n")), twin.id).toBe(twin.sha256);
    expect(twin.text[0], twin.id).toMatch(new RegExp(`^## ${twin.id} — `));
    expect(twin.text.at(-1), twin.id).toMatch(/^- Maps-to: /);
  });
});
