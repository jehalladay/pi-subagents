/**
 * workflow-journal-compat.test.ts — wb-cax.3 (W22-E): the journal
 * compatibility classifier behind migration acceptance.
 *
 * docs/workbench/16 § "Compatibility feature control": "Ensure older journal
 * format remains readable when supported, but does not become unsafe reuse
 * for effectful calls; compatibility may require explicit "journal
 * unsupported" warnings." § "Migration acceptance": "Existing upstream Pi
 * agent workflows, script saved paths and UI work after extension reload."
 *
 * classifyJournal reports and never decides, so its claims are checked twice:
 * once as structure, and once against the code that does decide — readJournal
 * for what survives a read, runWorkflow for what a resume replays, re-runs or
 * refuses. Neither is changed here; readJournal's silent skip is the contrast
 * the classifier exists to make visible, and it stays exactly as it is.
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { appendJournal, journalKey, nodeJournalKey, readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import {
  type ClassifiedJournalLine,
  classifyJournal,
  JOURNAL_DUPLICATE_POSITION_WARNING,
  JOURNAL_ENTRY_FIELDS,
  JOURNAL_ENTRY_KINDS,
  JOURNAL_IGNORED_FIELDS_WARNING,
  JOURNAL_LINE_CLASSES,
  JOURNAL_MIXED_BASIS_WARNING,
  JOURNAL_UNCERTAIN_EFFECT_WARNING,
  JOURNAL_UNSUPPORTED_WARNING,
  JOURNAL_UNVOUCHED_NODE_WARNING,
  type JournalEntryField,
  type JournalUnsupportedReason,
  type ReadJournalLine,
} from "../src/workflow/journal-compat.js";
import { type AcknowledgeRecord, entryDigestOf, RECONCILE_ACK_POLICY, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost, type WorkflowSpawnResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "compat", description: "journal compatibility probe" };\n';

/** Rows exactly as appendJournal writes them: one JSON.stringify per line, each newline-terminated. */
const jsonl = (rows: readonly unknown[]): string => rows.map((row) => `${JSON.stringify(row)}\n`).join("");

/** The classifier's line, narrowed to one this build's reader keeps. */
function kept(line: ClassifiedJournalLine | undefined): ReadJournalLine {
  if (line === undefined || line.class === "unsupported") {
    throw new Error(`expected a line the reader keeps, got ${JSON.stringify(line)}`);
  }
  return line;
}

/** Every string a report carries, so a test can prove none smuggles a terminal control through. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (typeof value === "object" && value !== null) return Object.values(value).flatMap(strings);
  return [];
}

type Effect = "read" | "write" | "external" | "unknown";

interface Probe {
  host: WorkflowHost;
  spawns: string[];
  nodeCalls: unknown[];
}

/**
 * A host with agents and a node capability, optionally declaring an effect
 * class and a replay basis — the shapes the legacy Pi host (neither), the
 * Claude host and the detached host (both) present to the runtime.
 */
function probeHost(options: { basis?: string; effect?: Effect; reply?: (prompt: string) => WorkflowSpawnResult } = {}): Probe {
  const spawns: string[] = [];
  const nodeCalls: unknown[] = [];
  const host: WorkflowHost = {
    async spawnAgent(request) {
      spawns.push(request.prompt);
      return options.reply ? options.reply(request.prompt) : { ok: true, text: `live:${request.prompt}` };
    },
    abortAgent() {},
    async callNode(request) {
      nodeCalls.push(request.input);
      return { answer: "live" };
    },
    ...(options.effect !== undefined ? { describeNodeEffect: () => options.effect } : {}),
    ...(options.basis !== undefined ? { replayBasis: options.basis } : {}),
  };
  return { host, spawns, nodeCalls };
}

let dir = "";
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "wf-journal-compat-"));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

/** Run a script, journaling through the real appendJournal, and return the file's bytes. */
async function journaled(name: string, body: string, probe: Probe) {
  const path = join(dir, `${name}.workflow.jsonl`);
  const result = await runWorkflow({
    script: HEAD + body,
    host: probe.host,
    journal: { append: (entry: WorkflowJournalEntry) => appendJournal(path, entry) },
  });
  return { path, result, raw: readFileSync(path, "utf-8") };
}

/** Resume from a journal file the way index.ts does: readJournal, then runWorkflow. */
function resume(path: string, body: string, probe: Probe) {
  return runWorkflow({ script: HEAD + body, host: probe.host, journal: { entries: readJournal(path) } });
}

const OPERATOR = "local-operator:1:s1";

/** A journaled effect row in the runtime's own field order. */
const EFFECT_ROW: WorkflowJournalEntry = {
  kind: "node", index: 0, key: "k0", ok: true, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1",
};

/** An acknowledgement bound by digest to `recorded`, valid under reconcile.ts. */
function acknowledgement(recorded: WorkflowJournalEntry, changes: Partial<AcknowledgeRecord> = {}): AcknowledgeRecord {
  return {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "acknowledge",
    acknowledgementId: `ack_${"a".repeat(32)}`,
    policy: RECONCILE_ACK_POLICY,
    taskId: "wf_compat01",
    entry: {
      index: recorded.index,
      key: recorded.key,
      ok: recorded.ok,
      capabilityId: recorded.capabilityId ?? "",
      effectClass: recorded.effectClass ?? "",
      ...(recorded.basis !== undefined ? { basis: recorded.basis } : {}),
      entryDigest: entryDigestOf(recorded),
    },
    scope: { workspace: "/ws", principal: OPERATOR },
    operator: { principal: OPERATOR },
    grant: "reconcile:furnace.acknowledge",
    recordedAt: "2026-10-15T09:00:00Z",
    reason: "inspected the producer by hand",
    determination: "indeterminate",
    evidenceClass: "operator-asserted",
    evidence: [],
    noEvidenceReason: "producer-unavailable",
    settlement: "envelope",
    ...changes,
  };
}

/** The decision row that carries `record` beside the node row it binds to. */
function acknowledgeRow(recorded: WorkflowJournalEntry, record: AcknowledgeRecord = acknowledgement(recorded)): WorkflowJournalEntry {
  return {
    index: recorded.index, key: recorded.key, ok: true, kind: "acknowledge",
    capabilityId: recorded.capabilityId, effectClass: recorded.effectClass, reconcile: record,
  };
}

const ACK = acknowledgement(EFFECT_ROW);
const ACK_ROW = acknowledgeRow(EFFECT_ROW, ACK);

/* ------------------------------------------------------------------------ *
 * AC1 — docs/workbench/16: "Ensure older journal format remains readable when
 * supported, but does not become unsafe reuse for effectful calls".
 * ------------------------------------------------------------------------ */

describe("AC1: older formats stay readable, and no effectful entry is ever replay-eligible", () => {
  it("classifies pre-basis agent entries readable legacy-agent, with the live-rerun-on-resume note", () => {
    const report = classifyJournal(jsonl([
      { index: 0, key: journalKey({ prompt: "first" }), ok: true, text: "live:first" },
      { index: 1, key: journalKey({ prompt: "second" }), ok: false },
    ]));

    const [settled, failed] = report.lines.map(kept);
    expect(settled).toMatchObject({
      line: 1, class: "legacy-agent", entryKind: "agent", index: 0, basis: null,
      replay: "replay-conditional-on-basis", replayEligible: true, refusal: null,
    });
    // Replays only under a host that records no basis; any basis-recording host re-runs it.
    expect(settled.note).toContain("records none");
    expect(settled.note).toContain("re-runs it live on resume");
    expect(failed).toMatchObject({ line: 2, class: "legacy-agent", replay: "live", replayEligible: false });
    expect(report.unsupported).toEqual([]);
    expect(report.verdict).toBe("readable");
  });

  it("declines every agent row of a journal that records agent({ resume }), as the runtime declines the whole cache", () => {
    const report = classifyJournal(jsonl([
      { index: 0, key: "a0", ok: true, text: "first" },
      { index: 1, key: "a1", ok: true, text: "follow up", resumed: true },
    ]));

    for (const line of report.lines.map(kept)) {
      expect(line).toMatchObject({ class: "legacy-agent", replay: "live", replayEligible: false });
      expect(line.note).toContain("agent({ resume })");
    }
  });

  it("refuses a recorded non-read node with the typed uncertain-effect reason, whatever its outcome or basis", () => {
    const report = classifyJournal(jsonl([
      { kind: "node", index: 0, key: "n0", ok: true, capabilityId: "effect.write", effectClass: "write", basis: "A" },
      { kind: "node", index: 1, key: "n1", ok: false, capabilityId: "furnace.run.start", effectClass: "external" },
      { kind: "node", index: 2, key: "n2", ok: true, capabilityId: "effect.blank", effectClass: "", text: "{}", basis: "A" },
      { kind: "node", index: 3, key: "n3", ok: true, capabilityId: "effect.shout", effectClass: "READ", text: "{}", basis: "A" },
    ]));

    for (const line of report.lines.map(kept)) {
      expect(line).toMatchObject({
        class: "node-effectful", entryKind: "node", replay: "refuse-uncertain-effect",
        refusal: "uncertain-effect", replayEligible: false,
      });
    }
    expect(kept(report.lines[1]).note).toContain('"furnace"');
    const warning = report.warnings.find((text) => text.startsWith(`${JOURNAL_UNCERTAIN_EFFECT_WARNING}:`));
    expect(warning).toContain("position 0");
    expect(warning).toContain("position 3");
  });

  it("never replays a node recorded with no effect class: it re-runs live, and no refusal is claimed that the runtime does not make", () => {
    const report = classifyJournal(jsonl([
      { kind: "node", index: 0, key: "n0", ok: true, capabilityId: "effect.write", basis: "A" },
    ]));

    expect(kept(report.lines[0])).toMatchObject({
      class: "node-effectful", effectClass: null, replay: "live", refusal: null, replayEligible: false,
    });
    expect(report.warnings.find((text) => text.startsWith(`${JOURNAL_UNVOUCHED_NODE_WARNING}:`))).toContain("position 0");
  });

  it("marks only a recorded read replay-eligible, across every effect class a journal can carry", () => {
    const classes = ["read", "write", "external", "unknown", "", "READ", "read ", "destructive", undefined];
    const report = classifyJournal(jsonl(classes.map((effectClass, index) => ({
      kind: "node", index, key: `n${index}`, ok: true, capabilityId: "record.any", text: '{"answer":1}', basis: "A",
      ...(effectClass !== undefined ? { effectClass } : {}),
    }))));

    expect(report.lines.map((line) => [kept(line).effectClass, line.replayEligible])).toEqual(
      classes.map((effectClass) => [effectClass ?? null, effectClass === "read"]),
    );
    // Across the whole file, only agents and recorded reads can ever be handed back.
    for (const line of report.lines.filter((row) => row.replayEligible)) {
      expect(["legacy-agent", "basis-scoped-agent", "node-read"]).toContain(line.class);
    }
  });

  it("agrees with the runtime: a journaled write refuses resume with exactly the typed refusal it reports", async () => {
    const body = 'await node("effect.write", { value: "x" });\nreturn await agent("after");';
    const { path, raw } = await journaled("write", body, probeHost({ basis: "basis-A", effect: "write" }));
    const effect = kept(classifyJournal(raw).lines.find((line) => line.class === "node-effectful"));
    expect(effect.replay).toBe("refuse-uncertain-effect");

    // Not gated on the basis: a changed host policy never licenses re-running a journaled effect.
    const second = probeHost({ basis: "basis-B", effect: "write" });
    const result = await resume(path, body, second);
    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe(effect.refusal);
    expect(second.nodeCalls).toHaveLength(0);
    expect(second.spawns).toHaveLength(0);
  });

  it("agrees with the runtime: a node journaled with no effect class re-runs live on resume", async () => {
    const body = 'return await node("effect.write", { value: "x" });';
    const { path, raw } = await journaled("unvouched", body, probeHost({}));
    expect(kept(classifyJournal(raw).lines[0])).toMatchObject({ class: "node-effectful", effectClass: null, replay: "live" });

    const second = probeHost({ effect: "write" });
    const result = await resume(path, body, second);
    expect(result.status).toBe("completed");
    expect(result.capabilityError).toBeUndefined();
    expect(second.nodeCalls).toEqual([{ value: "x" }]);
  });

  it("agrees with the runtime: a legacy agent row re-runs live under a basis-recording host and replays only under one that records none", async () => {
    const body = 'const a = await agent("first");\nconst b = await agent("second");\nreturn [a, b];';
    const { path, raw } = await journaled("legacy", body, probeHost({}));
    expect(classifyJournal(raw).lines.map((line) => line.class)).toEqual(["legacy-agent", "legacy-agent"]);

    const scoped = probeHost({ basis: "basis-A" });
    const live = await resume(path, body, scoped);
    expect(live.replayedCount).toBe(0);
    expect(scoped.spawns).toEqual(["first", "second"]);

    const legacy = probeHost({});
    const replayed = await resume(path, body, legacy);
    expect(replayed.replayedCount).toBe(2);
    expect(legacy.spawns).toHaveLength(0);
  });
});

/* ------------------------------------------------------------------------ *
 * AC2 — docs/workbench/16: "compatibility may require explicit "journal
 * unsupported" warnings." Contrast journal.ts readJournal, which skips every
 * one of these lines silently and is not changed here.
 * ------------------------------------------------------------------------ */

/** One line per way the reader can drop a line, among lines it keeps and blank ones it skips. */
const CASES: readonly {
  readonly text: string;
  readonly expect: JournalUnsupportedReason | "kept" | "blank";
  readonly field?: JournalEntryField;
}[] = [
  { text: '{"index":0,"key":"k0","ok":true,"text":"kept"}', expect: "kept" },
  { text: '{"index":1,"key":"k1","ok":tr', expect: "malformed-json" },
  { text: "[]", expect: "not-an-object" },
  { text: "null", expect: "not-an-object" },
  { text: "42", expect: "not-an-object" },
  { text: '"a string"', expect: "not-an-object" },
  { text: '{"index":"one","key":"k","ok":true}', expect: "invalid-field", field: "index" },
  { text: '{"index":-1,"key":"k","ok":true}', expect: "invalid-field", field: "index" },
  { text: '{"index":1.5,"key":"k","ok":true}', expect: "invalid-field", field: "index" },
  { text: '{"index":2,"ok":true}', expect: "invalid-field", field: "key" },
  { text: '{"index":2,"key":"k","ok":"yes"}', expect: "invalid-field", field: "ok" },
  { text: '{"index":2,"key":"k","ok":true,"text":7}', expect: "invalid-field", field: "text" },
  { text: '{"index":2,"key":"k","ok":true,"resumed":false}', expect: "invalid-field", field: "resumed" },
  { text: "  \t", expect: "blank" },
  { text: '{"index":2,"key":"k","ok":true,"kind":"checkpoint"}', expect: "unknown-kind", field: "kind" },
  { text: '{"index":2,"key":"k","ok":true,"kind":null}', expect: "invalid-field", field: "kind" },
  { text: '{"index":2,"key":"k","ok":true,"kind":"node","capabilityId":7}', expect: "invalid-field", field: "capabilityId" },
  {
    text: '{"index":2,"key":"k","ok":true,"kind":"node","capabilityId":"record.read","effectClass":1}',
    expect: "invalid-field",
    field: "effectClass",
  },
  { text: '{"index":2,"key":"k","ok":true,"basis":["b1"]}', expect: "invalid-field", field: "basis" },
  {
    text: '{"index":2,"key":"k","ok":true,"kind":"node","capabilityId":"record.read","nativeRefs":[{"provider":"furnace"}]}',
    expect: "invalid-field",
    field: "nativeRefs",
  },
  { text: '{"index":2,"key":"k","ok":true,"kind":"node"}', expect: "node-without-capability", field: "capabilityId" },
  {
    text: '{"index":0,"key":"k0","ok":true,"kind":"acknowledge","capabilityId":"furnace.run.start"}',
    expect: "decision-without-record",
    field: "reconcile",
  },
  { text: JSON.stringify({ ...EFFECT_ROW, reconcile: ACK }), expect: "stray-decision-record", field: "reconcile" },
  { text: JSON.stringify({ ...ACK_ROW, kind: "override" }), expect: "invalid-decision", field: "reconcile" },
  {
    text: JSON.stringify(acknowledgeRow(EFFECT_ROW, { ...ACK, entry: { ...ACK.entry, key: "k9" } })),
    expect: "invalid-decision",
    field: "reconcile",
  },
  { text: JSON.stringify(acknowledgeRow(EFFECT_ROW, { ...ACK, grant: "furnace.acknowledge" })), expect: "invalid-decision", field: "reconcile" },
  { text: "", expect: "blank" },
  { text: '{"index":3,"key":"k3","ok":true,"kind":"checkpoint","basis":"b9"}', expect: "unknown-kind", field: "kind" },
  { text: JSON.stringify(EFFECT_ROW), expect: "kept" },
  { text: JSON.stringify(ACK_ROW), expect: "kept" },
  // Last, and unterminated: the torn tail a killed run leaves behind.
  { text: '{"index":4,"key":"k4","ok":true,"te', expect: "truncated-final-line" },
];
const MANGLED = CASES.map((row) => row.text).join("\n");
const CENSUS = CASES.flatMap((row, offset) =>
  row.expect === "kept" || row.expect === "blank" ? [] : [{ line: offset + 1, reason: row.expect, field: row.field ?? null }],
);

describe("AC2: every line the reader would skip is surfaced, and the verdict says journal unsupported", () => {
  it("names each skipped line with its line number and reason, and carries the explicit warning", () => {
    const report = classifyJournal(MANGLED);

    expect(report.unsupported.map(({ line, reason, field }) => ({ line, reason, field }))).toEqual(CENSUS);
    for (const row of report.unsupported) expect(row.detail.length).toBeGreaterThan(0);
    expect(report.verdict).toBe("unsupported");
    const warning = report.warnings.find((text) => text.startsWith(`${JOURNAL_UNSUPPORTED_WARNING}:`));
    expect(warning).toContain(`${CENSUS.length} of ${report.lines.length} line(s)`);
    expect(warning).toContain("line 2 malformed-json");
    expect(warning).toContain("and 16 more");
    // A dropped effect row is invisible to the tripwire; the warning has to say so.
    expect(warning).toContain("no longer stops a resume");
    expect(report.counts.unsupported).toBe(CENSUS.length);
  });

  it("agrees with readJournal line for line, while readJournal itself still drops them without a word", () => {
    for (const [offset, row] of CASES.entries()) {
      if (row.expect === "blank") continue;
      const path = join(dir, `case-${offset}.jsonl`);
      writeFileSync(path, row.text, "utf-8");
      const survived = readJournal(path).length;
      expect(survived, `readJournal on ${row.text}`).toBe(row.expect === "kept" ? 1 : 0);
      const lines = classifyJournal(row.text).lines;
      expect(lines, row.text).toHaveLength(1);
      expect(lines[0]?.class !== "unsupported", `classifier on ${row.text}`).toBe(survived === 1);
    }

    const whole = join(dir, "mangled.jsonl");
    writeFileSync(whole, MANGLED, "utf-8");
    const report = classifyJournal(readFileSync(whole, "utf-8"));
    expect(readJournal(whole)).toHaveLength(report.lines.filter((line) => line.class !== "unsupported").length);
  });

  it("never drops a line: every physical line is classified, counted blank, or in the census", () => {
    const report = classifyJournal(MANGLED);
    const accounted = [...report.lines.map((line) => line.line), ...report.blankLines].sort((a, b) => a - b);

    expect(report.physicalLines).toBe(CASES.length);
    expect(accounted).toEqual(CASES.map((_row, offset) => offset + 1));
    expect(report.blankLines).toEqual(CASES.flatMap((row, offset) => (row.expect === "blank" ? [offset + 1] : [])));
    expect(Object.values(report.counts).reduce((sum, count) => sum + count, 0)).toBe(report.lines.length);
    // A final newline ends the last line; it does not start another one.
    expect(classifyJournal(`${MANGLED}\n`).physicalLines).toBe(CASES.length);
  });

  it("reports a torn final line as truncated, an unterminated complete line as kept, and a terminated bad line as malformed", () => {
    expect(classifyJournal('{"index":0,"key":"k0","ok":true}\n{"index":1,"key":"k1"').unsupported).toEqual([
      { line: 2, reason: "truncated-final-line", field: null, detail: expect.any(String) },
    ]);
    expect(classifyJournal('{"index":0,"key":"k0","ok":true}').lines[0]?.class).toBe("legacy-agent");
    expect(classifyJournal('{"index":1,"key":"k1"\n').unsupported[0]?.reason).toBe("malformed-json");
  });

  it("keeps an unknown entry kind and refuses it, never reading it as an agent or dropping it unseen", () => {
    const report = classifyJournal(jsonl([
      { index: 0, key: "k0", ok: true, text: "kept" },
      { index: 1, key: "k1", ok: true, kind: "\u001b]0;owned\u0007checkpoint", basis: "b1" },
    ]));

    expect(kept(report.lines[0]).class).toBe("legacy-agent");
    const future = report.lines[1];
    expect(future).toMatchObject({
      line: 2, class: "unsupported", replay: "dropped", replayEligible: false, reason: "unknown-kind", field: "kind",
    });
    expect(future?.class === "unsupported" ? future.detail : "").toContain("checkpoint");
    // A dropped row joins no cohort: the reader never sees its basis.
    expect(report.cohorts).toEqual([{ basis: null, lines: [1], agents: 1, nodes: 0 }]);
    // Journal text never reaches a report string with its terminal controls intact.
    for (const text of strings(report)) expect(text).not.toMatch(/[\u0000-\u001f\u007f-\u009f]/);
  });
});

/* ------------------------------------------------------------------------ *
 * AC3 — journal.ts: "A resume only reuses an agent entry, or replays a node
 * read, recorded under the SAME basis". The cohorts mirror the runtime's
 * strict comparison (runtime.ts replayAt and node admission); they do not
 * re-run it.
 * ------------------------------------------------------------------------ */

describe("AC3: per-basis cohorts mirror the runtime's strict basis comparison", () => {
  const read = (index: number, extra: Record<string, unknown> = {}) => ({
    kind: "node", index, key: `n${index}`, ok: true, capabilityId: "record.read", effectClass: "read", text: '{"answer":1}', ...extra,
  });

  it("groups agent and node entries into cohorts by exact basis, and flags a mixed-basis file", () => {
    const report = classifyJournal(jsonl([
      { index: 0, key: "a0", ok: true, text: "x", basis: "A" },
      { index: 1, key: "a1", ok: true, text: "y", basis: "A" },
      read(0, { basis: "A" }),
      { index: 2, key: "a2", ok: true, text: "z" },
      // An empty basis is not an absent one: admission compares with ===, and so do the cohorts.
      { index: 3, key: "a3", ok: true, text: "w", basis: "" },
    ]));

    expect(report.cohorts).toEqual([
      { basis: "A", lines: [1, 2, 3], agents: 2, nodes: 1 },
      { basis: null, lines: [4], agents: 1, nodes: 0 },
      { basis: "", lines: [5], agents: 1, nodes: 0 },
    ]);
    expect(report.lines.map((line) => line.class)).toEqual([
      "basis-scoped-agent", "basis-scoped-agent", "node-read", "legacy-agent", "basis-scoped-agent",
    ]);
    expect(report.mixedBasis).toBe(true);
    expect(report.warnings.find((text) => text.startsWith(`${JOURNAL_MIXED_BASIS_WARNING}:`))).toContain("3 replay bases");
  });

  it("reports a single-basis file unmixed and raises no basis warning", () => {
    const report = classifyJournal(jsonl([{ index: 0, key: "a0", ok: true, text: "x", basis: "A" }, read(0, { basis: "A" })]));

    expect(report.cohorts).toEqual([{ basis: "A", lines: [1, 2], agents: 1, nodes: 1 }]);
    expect(report.mixedBasis).toBe(false);
    expect(report.warnings).toEqual([]);
  });

  it("classifies a basis-bearing read node replay-conditional-on-basis, and every other recorded read live", () => {
    const report = classifyJournal(jsonl([
      read(0, { basis: "A" }),
      read(1),
      // A failure that still carries a payload (a hand-edited or foreign row): admission checks `ok` on its own.
      read(2, { basis: "A", ok: false }),
      read(3, { basis: "A", text: undefined }),
    ]));
    const [scoped, legacy, failed, empty] = report.lines.map(kept);

    expect(scoped).toMatchObject({ class: "node-read", basis: "A", replay: "replay-conditional-on-basis", replayEligible: true });
    expect(scoped.note).toContain("same basis");
    // basis-on-every-entry (wb-6hb.1): a read recorded without one is the legacy class and never replays.
    expect(legacy).toMatchObject({ class: "node-read", basis: null, replay: "live", replayEligible: false });
    expect(legacy.note).toContain("never replays it");
    expect(failed).toMatchObject({ class: "node-read", replay: "live", replayEligible: false });
    expect(failed.note).toContain("failed read");
    expect(empty).toMatchObject({ class: "node-read", replay: "live", replayEligible: false });
    expect(empty.note).toContain("no recorded payload");
  });

  it("agrees with the runtime: what it scopes to basis-A replays under basis-A and re-runs live under basis-B", async () => {
    const body = 'const a = await agent("first");\nconst r = await node("record.read", { value: "x" });\nreturn [a, r];';
    const { path, raw } = await journaled("scoped", body, probeHost({ basis: "basis-A", effect: "read" }));
    const report = classifyJournal(raw);
    expect(report.lines.map((line) => [line.class, line.replay, kept(line).basis])).toEqual([
      ["basis-scoped-agent", "replay-conditional-on-basis", "basis-A"],
      ["node-read", "replay-conditional-on-basis", "basis-A"],
    ]);
    expect(report.cohorts).toEqual([{ basis: "basis-A", lines: [1, 2], agents: 1, nodes: 1 }]);

    const same = probeHost({ basis: "basis-A", effect: "read" });
    const replayed = await resume(path, body, same);
    expect(replayed.replayedCount).toBe(1);
    expect(replayed.replayedNodeCount).toBe(1);
    expect(same.spawns).toHaveLength(0);
    expect(same.nodeCalls).toHaveLength(0);

    const other = probeHost({ basis: "basis-B", effect: "read" });
    const live = await resume(path, body, other);
    expect(live.replayedCount).toBe(0);
    expect(live.replayedNodeCount).toBe(0);
    expect(other.spawns).toEqual(["first"]);
    expect(other.nodeCalls).toEqual([{ value: "x" }]);
  });

  it("binds operator decisions by digest as the runtime does, and keeps them out of the cohorts", async () => {
    const body = 'return await node("furnace.run.start", { value: "x" });';
    const { path } = await journaled("decision", body, probeHost({ effect: "external" }));
    const recorded = readJournal(path)[0];
    if (recorded === undefined) throw new Error("no node row journaled");

    // Bound: the acknowledgement names the digest of the row a resume consults.
    appendJournal(path, { ...acknowledgeRow(recorded), basis: "decision-rows-bind-by-digest" });
    const bound = classifyJournal(readFileSync(path, "utf-8"));
    expect(bound.lines.map((line) => [line.class, line.replay])).toEqual([
      ["node-effectful", "refuse-uncertain-effect"],
      ["operator-decision", "decision"],
    ]);
    expect(kept(bound.lines[0]).boundDecisions).toBe(1);
    expect(kept(bound.lines[1])).toMatchObject({ entryKind: "acknowledge", bindsToLine: 1, replayEligible: false });
    expect(bound.cohorts).toEqual([{ basis: null, lines: [1], agents: 0, nodes: 1 }]);
    expect(bound.mixedBasis).toBe(false);
    const settled = await resume(path, body, probeHost({ effect: "external" }));
    expect(settled.status).toBe("completed");
    expect(settled.reconciledNodeCount).toBe(1);

    // Unbound: same position, another row's digest — the runtime refuses again, and the report says it will.
    const stray = join(dir, "stray.workflow.jsonl");
    appendJournal(stray, recorded);
    appendJournal(stray, acknowledgeRow(recorded, acknowledgement(recorded, {
      entry: { ...acknowledgement(recorded).entry, entryDigest: `sha256:${"0".repeat(64)}` },
    })));
    const unbound = classifyJournal(readFileSync(stray, "utf-8"));
    expect(kept(unbound.lines[0]).boundDecisions).toBe(0);
    expect(kept(unbound.lines[1]).bindsToLine).toBeNull();
    expect(kept(unbound.lines[1]).note).toContain("does not bind");
    const refused = await resume(stray, body, probeHost({ effect: "external" }));
    expect(refused.status).toBe("failed");
    expect(refused.capabilityError?.category).toBe("uncertain-effect");
    expect(refused.error).toContain("does not bind");

    // Orphan: a decision for a position this journal records no node row at.
    const orphan = kept(classifyJournal(jsonl([acknowledgeRow(recorded)])).lines[0]);
    expect(orphan).toMatchObject({ class: "operator-decision", bindsToLine: null });
    expect(orphan.note).toContain("no node row");
  });

  it("reports an earlier node row at a reused position shadowed, as the runtime's position map consults only the last", async () => {
    const key = nodeJournalKey("record.read", JSON.stringify({ value: "x" }));
    const write = { kind: "node", index: 0, key, ok: true, capabilityId: "record.read", effectClass: "write", basis: "b1" };
    const readRow = { ...write, effectClass: "read", text: '{"answer":"recorded"}' };
    const body = 'return await node("record.read", { value: "x" });';

    const hidden = join(dir, "hidden.workflow.jsonl");
    writeFileSync(hidden, jsonl([write, readRow]), "utf-8");
    const report = classifyJournal(readFileSync(hidden, "utf-8"));
    expect(report.lines.map((line) => [line.class, line.replay, line.replayEligible])).toEqual([
      ["node-effectful", "shadowed", false],
      ["node-read", "replay-conditional-on-basis", true],
    ]);
    expect(kept(report.lines[0]).refusal).toBeNull();
    const warning = report.warnings.find((text) => text.startsWith(`${JOURNAL_DUPLICATE_POSITION_WARNING}:`));
    expect(warning).toContain("position 0");
    // The hazard the warning names: the shadowed write no longer stops the resume.
    const resumed = await resume(hidden, body, probeHost({ basis: "b1", effect: "read" }));
    expect(resumed.status).toBe("completed");
    expect(resumed.replayedNodeCount).toBe(1);

    const exposed = join(dir, "exposed.workflow.jsonl");
    writeFileSync(exposed, jsonl([readRow, write]), "utf-8");
    expect(classifyJournal(readFileSync(exposed, "utf-8")).lines.map((line) => line.replay)).toEqual([
      "shadowed",
      "refuse-uncertain-effect",
    ]);
    const refused = await resume(exposed, body, probeHost({ basis: "b1", effect: "read" }));
    expect(refused.capabilityError?.category).toBe("uncertain-effect");
  });
});

/* ------------------------------------------------------------------------ *
 * AC4 — docs/workbench/16 § "Migration acceptance": "Existing upstream Pi
 * agent workflows, script saved paths and UI work after extension reload."
 * ------------------------------------------------------------------------ */

describe("AC4: the byte-identical pre-basis journal stays fully supported", () => {
  /** Upstream 221df02's writer layout: index, key, ok, then text — no basis, no kind. */
  const LEGACY_JOURNAL =
    '{"index":0,"key":"01a4b118772e67a5fbbc8b471ffe21db","ok":true,"text":"live:first"}\n' +
    '{"index":1,"key":"ea906aecc60b44a39daa595636af7f90","ok":false}\n';

  it("is exactly the bytes this runtime still writes under a host that records no basis", async () => {
    const failSecond = (prompt: string): WorkflowSpawnResult =>
      prompt === "second" ? { ok: false, error: "boom" } : { ok: true, text: `live:${prompt}` };
    const { raw } = await journaled(
      "upstream",
      'const a = await agent("first");\nconst b = await agent("second");\nreturn [a, b];',
      probeHost({ reply: failSecond }),
    );
    expect(raw).toBe(LEGACY_JOURNAL);
  });

  it("classifies fully readable, with zero unsupported findings and no warnings", () => {
    const report = classifyJournal(LEGACY_JOURNAL);

    expect(report.verdict).toBe("readable");
    expect(report.unsupported).toEqual([]);
    expect(report.warnings).toEqual([]);
    expect(report.counts).toEqual({
      "legacy-agent": 2, "basis-scoped-agent": 0, "node-read": 0, "node-effectful": 0, "operator-decision": 0, unsupported: 0,
    });
    expect(report.cohorts).toEqual([{ basis: null, lines: [1, 2], agents: 2, nodes: 0 }]);
    expect(report.mixedBasis).toBe(false);
  });
});

/* ------------------------------------------------------------------------ *
 * Forward compatibility: a newer writer's additions are named, never lost.
 * ------------------------------------------------------------------------ */

describe("forward compatibility: schema versions and fields this build does not read", () => {
  it("accepts a line declaring this build's workflow script schema version without a warning", () => {
    const report = classifyJournal(jsonl([{ index: 0, key: "k0", ok: true, text: "x", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION }]));

    expect(report.verdict).toBe("readable");
    expect(report.warnings).toEqual([]);
    expect(kept(report.lines[0])).toMatchObject({ foreignSchemaVersion: null, ignoredFields: [] });
  });

  it("warns journal unsupported for another schema version, while still reporting what the reader does with the line", () => {
    const raw = jsonl([
      { index: 0, key: "k0", ok: true, text: "x" },
      { index: 1, key: "k1", ok: true, text: "y", schemaVersion: "workflow-script/v2" },
    ]);
    const report = classifyJournal(raw);

    expect(report.verdict).toBe("unsupported");
    // The reader keeps the line, so it is not in the skipped census...
    expect(report.unsupported).toEqual([]);
    expect(kept(report.lines[1])).toMatchObject({ class: "legacy-agent", foreignSchemaVersion: "workflow-script/v2" });
    // ...but the verdict carries the explicit warning, naming the line.
    const warning = report.warnings.find((text) => text.startsWith(`${JOURNAL_UNSUPPORTED_WARNING}:`));
    expect(warning).toContain("line 2");
    expect(warning).toContain(JSON.stringify(WORKFLOW_SCRIPT_SCHEMA_VERSION));
    const path = join(dir, "foreign.jsonl");
    writeFileSync(path, raw, "utf-8");
    expect(readJournal(path)).toHaveLength(2);
  });

  it("names the fields a newer writer added instead of ignoring them silently", () => {
    const report = classifyJournal(jsonl([{ index: 0, key: "k0", ok: true, text: "x", futureFlag: true, "\u001b[31mtint": 1 }]));

    expect(report.verdict).toBe("readable");
    expect(kept(report.lines[0]).ignoredFields).toEqual(["futureFlag", "tint"]);
    expect(report.warnings.find((text) => text.startsWith(`${JOURNAL_IGNORED_FIELDS_WARNING}:`))).toContain("futureFlag");
    for (const text of strings(report)) expect(text).not.toMatch(/[\u0000-\u001f\u007f-\u009f]/);
  });
});

/* ------------------------------------------------------------------------ *
 * AC5 — pure, read-only, and pinned to journal.ts's declared shape.
 * ------------------------------------------------------------------------ */

describe("AC5: pure, read-only, and pinned to journal.ts", () => {
  it("is deterministic: the same text always yields the same report", () => {
    expect(classifyJournal(MANGLED)).toEqual(classifyJournal(MANGLED));
    expect(classifyJournal("")).toMatchObject({ verdict: "readable", physicalLines: 0, lines: [], blankLines: [], warnings: [] });
  });

  it("imports no file system and nothing that decides admission; journal.ts only as a type", () => {
    const source = readFileSync(join(process.cwd(), "src/workflow/journal-compat.ts"), "utf-8");
    const imports = [...source.matchAll(/^import\s+(type\s+)?[^;]*?from\s+"([^"]+)";/gms)].map((match) => ({
      typeOnly: match[1] !== undefined,
      from: match[2],
    }));

    expect(imports.length).toBeGreaterThan(0);
    expect(imports.filter(({ from }) => /^(?:node:)?fs(?:\/|$)/.test(from ?? ""))).toEqual([]);
    expect(imports.filter(({ from }) => from === "./runtime.js")).toEqual([]);
    expect(imports.filter(({ from }) => from === "./journal.js")).toEqual([{ typeOnly: true, from: "./journal.js" }]);
  });

  it("lists exactly the entry fields and kinds journal.ts declares (the compile-time pin in src is the binding check)", () => {
    const everyField: Required<WorkflowJournalEntry> = {
      index: 0, key: "k", ok: true, text: "t", resumed: true, kind: "node", capabilityId: "record.read",
      effectClass: "read", basis: "b", nativeRefs: [], reconcile: ACK,
    };
    const everyKind: Record<NonNullable<WorkflowJournalEntry["kind"]>, true> = { node: true, acknowledge: true, override: true };

    expect([...JOURNAL_ENTRY_FIELDS].sort()).toEqual(Object.keys(everyField).sort());
    expect([...JOURNAL_ENTRY_KINDS].sort()).toEqual(Object.keys(everyKind).sort());
  });

  it("counts every class, so a census can never leave one out", () => {
    expect(Object.keys(classifyJournal(MANGLED).counts).sort()).toEqual([...JOURNAL_LINE_CLASSES].sort());
  });
});
