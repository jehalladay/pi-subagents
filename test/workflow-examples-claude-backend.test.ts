/**
 * workflow-examples-claude-backend.test.ts — the shipped example workflows,
 * run under BOTH backends and compared (wb-cax.7, W22-H).
 *
 * docs/workbench/16 § "Compatibility feature control": "Tests must run in both
 * upstream/Pi and new/Claude workbench modes until a documented deprecation is
 * approved." docs/workbench/14 § "Test classes" B defines the compatibility
 * golden as the actual upstream scripts in examples/workflows: "compare stable
 * result shape, phase grouping, parallel/pipeline ordering contract, failures,
 * metadata, nested workflow resolution, JSON schema and budget behavior. Do not
 * require arbitrary nondeterministic completion order to match."
 *
 * Every script (the five examples plus lib/count-child.js, glob-discovered) runs
 * byte-for-byte unmodified twice:
 *
 *   (A) the upstream stub WorkflowHost, the same shape test/workflow-examples.test.ts uses;
 *   (B) createClaudeWorkflowHost over the wb-a2g.2 fixture ClaudeQuery seam
 *       (test/helpers/claude-sdk-stream.ts), answering from the SAME
 *       label -> answer table.
 *
 * Both results go through ONE normalizer (test/helpers/golden-backends.ts) and
 * must be deep-equal.
 *
 * TRUTH LABEL (docs/workbench/14 § "Truth labels and release gates"): every
 * Claude-backend run here is a FIXTURE PASS. No live SDK, model, credential,
 * network or TTY is involved, and nothing here is live-SDK proof.
 *
 * Journal and resume (owner constraints K3/K4): each run also journals through
 * `journal.append`, and the journals are compared modulo the Claude-only `basis`
 * field. A resume pass runs from each backend's OWN journal and compares status,
 * replayedCount, replayedNodeCount and reconciledNodeCount (Claude queries the SDK
 * zero times on resume). The W12 tripwire runs on BOTH backends over an inline
 * node() script whose capability DECLARES its effect class: a journaled write
 * refuses resume with uncertain-effect and never re-invokes; a journaled read
 * replays stale and never re-invokes. Nothing here persists journal text.
 *
 * Documented first-cut degradation: the Claude host has no gate runner
 * (src/workflow/tool-description.ts: "Worktree isolation and gate refuse in this
 * first cut rather than silently downgrading or pretending a test ran"), so
 * gated-fix.js is pinned to that exact refusal instead of equivalence. Its
 * conformance is owned by wb-a2g.11; this file only records the measured diff so
 * the equivalence suite cannot silently pass over it.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { AgentManager } from "../src/agent-manager.js";
import {
  type Answer,
  type AnswerTable,
  diffNormalized,
  errorClassOf,
  type GoldenScript,
  goldenAnswerFor,
  goldenScripts,
  type NodeFixture,
  nodeScript,
  normalizeRun,
  orderInsensitive,
  readScript,
  runClaude,
  runUpstream,
  scriptNamed,
} from "./helpers/golden-backends.js";

/**
 * gated-fix.js: the one first-cut degradation, as a PIN-FLIP ORACLE (owner ruling R1 (a)).
 * It names wb-a2g.11 as the oracle (the PAIRED-PIN partner: wb-a2g.11's first-cut-refusal pin and
 * this pin move together), the exact landed refusal text and the exact diff-key list; it FLIPS
 * WHEN the Claude-host gate path slice (the W16/VC-2 host runGate slice) lands, and that slice
 * retires both pins in the same commit.
 */
const KNOWN_DEGRADATIONS: Record<string, { oracle: string; error: string; diffKeys: string[]; flipsWhen: string }> = {
  "gated-fix.js": {
    oracle: "wb-a2g.11",
    error: "This workflow host cannot run gate commands.",
    diffKeys: ["agentCount", "error", "hostCalls", "phases", "status", "value"],
    flipsWhen: "the Claude-host gate path slice (the W16/VC-2 host runGate slice) lands",
  },
};

/** The legacy Pi spawn path. A Claude-backend run must never reach it; asserted after every test. */
const LEGACY_SPAWN_METHODS = ["spawn", "spawnAndWait", "resume", "abort"] as const;
let legacySpies: Array<{ mock: { calls: unknown[] } }> = [];

let cwd: string;
beforeAll(() => {
  cwd = mkdtempSync(join(tmpdir(), "gb-"));
  // compose.js documents "copy both this file and the child into .pi/workflows/
  // (the child as count-child.js)": the child is copied byte-for-byte.
  mkdirSync(join(cwd, ".pi", "workflows"), { recursive: true });
  const child = goldenScripts.find(script => script.file === "count-child.js");
  if (child === undefined) throw new Error("lib/count-child.js is not discovered");
  writeFileSync(join(cwd, ".pi", "workflows", "count-child.js"), readScript(child));
});
afterAll(() => rmSync(cwd, { recursive: true, force: true }));
beforeEach(() => {
  legacySpies = LEGACY_SPAWN_METHODS.map(method => vi.spyOn(AgentManager.prototype, method));
});
afterEach(() => {
  const called = legacySpies.map(spy => spy.mock.calls.length);
  vi.restoreAllMocks();
  expect(called, "the legacy Pi spawn path (AgentManager spawn/spawnAndWait/resume/abort) was reached").toEqual([0, 0, 0, 0]);
});

const equivalent = goldenScripts.filter(script => KNOWN_DEGRADATIONS[script.file] === undefined);

describe("dual-backend golden equivalence (fixture pass, not live SDK)", () => {
  it("discovers the shipped scripts by glob", () => {
    expect(goldenScripts.map(script => script.id)).toEqual([
      "compose.js",
      "fan-out-audit.js",
      "gated-fix.js",
      "review-panel.js",
      "structured-findings.js",
      "lib/count-child.js",
    ]);
  });

  describe.each(equivalent.map(script => [script.id, script] as const))("%s", (_id, script: GoldenScript) => {
    it("completes under both backends with an equal normalized result", async () => {
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);

      expect(a.result.error).toBeUndefined();
      expect(a.result.status).toBe("completed");
      expect(b.result.error).toBeUndefined();
      expect(b.result.status).toBe("completed");
      expect(diffNormalized(normalizeRun(a), normalizeRun(b))).toEqual([]);
      expect(normalizeRun(b)).toEqual(normalizeRun(a));
    });

    it("is insensitive to the completion order of parallel calls", async () => {
      const forward = orderInsensitive(normalizeRun(await runUpstream(script, cwd, { completion: "forward" })));
      const runs = [
        orderInsensitive(normalizeRun(await runUpstream(script, cwd, { completion: "reverse" }))),
        orderInsensitive(normalizeRun(await runClaude(script, cwd, { completion: "forward" }))),
        orderInsensitive(normalizeRun(await runClaude(script, cwd, { completion: "reverse" }))),
      ];
      for (const run of runs) expect(run).toEqual(forward);
    });

    it("queries the SDK once per agent() call, each under a distinct session id (legacy spawn spies are file-wide)", async () => {
      const b = await runClaude(script, cwd);

      expect(b.sdkCalls).toHaveLength(b.result.agentCount);
      const sessions = b.sdkCalls.map(call => call.sessionId);
      expect(new Set(sessions).size).toBe(sessions.length);
      expect(b.hostCalls).toBe(b.result.agentCount);
    });

    it("journals the same entry shapes under both backends, modulo the Claude-only basis field", async () => {
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);

      expect(a.journal.length).toBe(a.result.agentCount);
      expect(a.journal.map(entry => entry.index)).toEqual(a.journal.map((_entry, position) => position));
      for (const entry of [...a.journal, ...b.journal]) {
        expect(entry.kind).toBeUndefined();
        expect(entry.ok).toBe(true);
        expect(typeof entry.key).toBe("string");
      }
      // Both hosts declare a replay basis; the normalizer drops it, so what is compared is the shared shape.
      for (const entry of b.journal) expect(typeof entry.basis).toBe("string");
      expect(normalizeRun(b).journal).toEqual(normalizeRun(a).journal);
      expect(normalizeRun(a).journal.every(entry => !("basis" in entry))).toBe(true);
    });

    it("resumes from each backend's own journal with equal counters and no SDK query", async () => {
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);
      const resumedA = await runUpstream(script, cwd, { resume: a.journal });
      const resumedB = await runClaude(script, cwd, { resume: b.journal });

      for (const resumed of [resumedA, resumedB]) {
        expect(resumed.result.error).toBeUndefined();
        expect(resumed.result.status).toBe("completed");
        expect(resumed.result.replayedCount).toBe(a.journal.length);
        expect(resumed.result.replayedNodeCount).toBe(0);
        expect(resumed.result.reconciledNodeCount).toBe(0);
        expect(resumed.hostCalls).toBe(0);
        expect(resumed.result.value).toEqual(a.result.value);
      }
      expect(resumedB.sdkCalls).toHaveLength(0);
      expect(normalizeRun(resumedB)).toEqual(normalizeRun(resumedA));
    });

    it("holds a model pin and no privileged built-in tools in every SDK query", async () => {
      const b = await runClaude(script, cwd);
      expect(b.sdkCalls.length).toBeGreaterThan(0);
      for (const call of b.sdkCalls) {
        expect(call.allowedTools).toBeUndefined();
        expect(call.mcpServers).toBeUndefined();
        expect(call.tools).toEqual([]);
        expect(call.model).toBe("fixture-model");
        expect(call.permissionMode).toBe("dontAsk");
      }
    });
  });

  describe("values the stub-host tier already pins hold under the Claude backend too", () => {
    it("fan-out-audit: 1 discovery + 2 x (audit + verify), one verified result per file", async () => {
      const script = scriptNamed("fan-out-audit.js");
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(5);
      expect(b.result.value).toEqual(["ok:verify:src/routes/a.ts", "ok:verify:src/routes/b.ts"]);
    });

    it("structured-findings: validated objects, 2 dimensions x (review + verify)", async () => {
      const script = scriptNamed("structured-findings.js");
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(4);
      expect(b.result.value).toMatchObject({ confirmed: 2 });
    });

    it("review-panel: three lenses then one synthesis on the Claude-native Plan role", async () => {
      const script = scriptNamed("review-panel.js");
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(4);
      expect(b.result.value).toMatchObject({ reviewed: 3 });
      expect(b.sdkCalls.at(-1)?.effort).toBe("high");
      expect(b.sdkCalls.slice(0, 3).map(call => call.effort)).toEqual(["low", "low", "low"]);
    });

    it("compose: the nested child resolves through the host and shares the run's agent counter", async () => {
      const script = scriptNamed("compose.js");
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(2);
      expect(b.result.value).toMatchObject({ ok: true, count: 2 });
      expect(normalizeRun(b).nested).toEqual(normalizeRun(a).nested);
      expect(normalizeRun(b).nested).toEqual({ ok: true, count: 2, summary: "ok:summarize" });
    });
  });

  describe("documented first-cut degradation (pin-flip oracle: wb-a2g.11)", () => {
    it("gated-fix.js completes under the stub host but is refused at the call under the Claude host", async () => {
      const script = scriptNamed("gated-fix.js");
      const known = KNOWN_DEGRADATIONS["gated-fix.js"];
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);
      const flips = `this pin FLIPS WHEN ${known.flipsWhen}: retire KNOWN_DEGRADATIONS["gated-fix.js"] in that slice`;

      expect(a.result.status).toBe("completed");
      expect(b.result.status, flips).toBe("failed");
      expect(b.result.error, flips).toBe(known.error);
      expect(errorClassOf(b.result.error)).toBe("gate-unsupported");
      // Refused before an agent was spawned: nothing was queried, nothing pretended to be gated.
      expect(b.sdkCalls).toHaveLength(0);
      expect(b.result.agentCount).toBe(0);
      const diff = diffNormalized(normalizeRun(a), normalizeRun(b)).sort();
      // The oracle's diff-key list is the result shape; the journal dimension differs too (the stub journaled agents, Claude none).
      expect(diff.filter(key => key !== "journal"), flips).toEqual([...known.diffKeys].sort());
      expect(diff).toContain("journal");
      expect(known.oracle).toBe("wb-a2g.11");
    });
  });

  describe("declared effect classes: the W12 tripwire is exercised identically on both backends", () => {
    const write: NodeFixture = { id: "effect.write", effect: "write" };
    const read: NodeFixture = { id: "record.read", effect: "read" };

    it("a journaled write refuses resume with uncertain-effect, never re-invokes, replays nothing", async () => {
      const script = nodeScript(write.id);
      const a = await runUpstream(script, cwd, { node: write });
      const b = await runClaude(script, cwd, { node: write });

      for (const first of [a, b]) {
        expect(first.result.status).toBe("completed");
        expect(first.nodeInvocations).toBe(1);
        // A non-read node is on record from dispatch (wb-5x0.1): its dispatched marker, then
        // its settled row at the same position.
        expect(first.journal).toHaveLength(2);
        expect(first.journal[0]).toMatchObject({ kind: "node", index: 0, capabilityId: write.id, effectClass: "write", ok: false, dispatched: true });
        expect(first.journal[1]).toMatchObject({ kind: "node", index: 0, capabilityId: write.id, effectClass: "write", ok: true });
        expect(first.journal[1]).not.toHaveProperty("dispatched");
        // A write's answer is deliberately not journaled: nothing to replay silently.
        expect(first.journal[0].text).toBeUndefined();
        expect(first.journal[1].text).toBeUndefined();
      }
      expect(normalizeRun(b).journal).toEqual(normalizeRun(a).journal);

      const resumedA = await runUpstream(script, cwd, { node: write, resume: a.journal });
      const resumedB = await runClaude(script, cwd, { node: write, resume: b.journal });
      for (const resumed of [resumedA, resumedB]) {
        expect(resumed.result.status).toBe("failed");
        expect(resumed.result.capabilityError?.category).toBe("uncertain-effect");
        expect(resumed.nodeInvocations).toBe(0);
        expect(resumed.result.replayedNodeCount).toBe(0);
        expect(resumed.result.reconciledNodeCount).toBe(0);
      }
      expect(resumedB.sdkCalls).toHaveLength(0);
      expect(normalizeRun(resumedB)).toEqual(normalizeRun(resumedA));
    });

    it("a journaled read replays stale without re-invoking, counted as a replayed node", async () => {
      const script = nodeScript(read.id);
      const a = await runUpstream(script, cwd, { node: read });
      const b = await runClaude(script, cwd, { node: read });

      for (const first of [a, b]) {
        expect(first.result.status).toBe("completed");
        expect(first.nodeInvocations).toBe(1);
        expect(first.journal[0]).toMatchObject({ kind: "node", capabilityId: read.id, effectClass: "read", ok: true });
        expect(first.journal[0].text).toBe(JSON.stringify({ echoed: { value: "x" } }));
        expect(normalizeRun(first).nodes).toEqual([{ capabilityId: read.id, state: "done", freshness: "unknown" }]);
      }
      expect(normalizeRun(b)).toEqual(normalizeRun(a));

      const resumedA = await runUpstream(script, cwd, { node: read, resume: a.journal });
      const resumedB = await runClaude(script, cwd, { node: read, resume: b.journal });
      for (const resumed of [resumedA, resumedB]) {
        expect(resumed.result.status).toBe("completed");
        expect(resumed.result.value).toEqual({ echoed: { value: "x" } });
        expect(resumed.nodeInvocations).toBe(0);
        expect(resumed.result.replayedNodeCount).toBe(1);
        expect(resumed.result.reconciledNodeCount).toBe(0);
        expect(normalizeRun(resumed).nodes).toEqual([{ capabilityId: read.id, state: "done", freshness: "stale" }]);
      }
      expect(resumedB.sdkCalls).toHaveLength(0);
      expect(normalizeRun(resumedB)).toEqual(normalizeRun(resumedA));
    });

    it("mutation proof: a Claude-only declared effect class makes the resume comparison fail", async () => {
      const script = nodeScript(read.id);
      const a = await runUpstream(script, cwd, { node: read });
      // The Claude capability declares "write" for the id the stub declares "read".
      const b = await runClaude(script, cwd, { node: { id: read.id, effect: "write" } });
      const resumedA = await runUpstream(script, cwd, { node: read, resume: a.journal });
      const resumedB = await runClaude(script, cwd, { node: { id: read.id, effect: "write" }, resume: b.journal });

      const diff = diffNormalized(normalizeRun(resumedA), normalizeRun(resumedB));
      expect(diff).toContain("status");
      expect(diff).toContain("capabilityCategory");
      expect(diffNormalized(normalizeRun(a), normalizeRun(b))).toContain("journal");
    });
  });

  describe("schema, budget and option behaviour", () => {
    const structured = scriptNamed("structured-findings.js");
    const count = scriptNamed("count-child.js");

    it("a schema-bearing answer that is not JSON fails the call with the same class under both backends", async () => {
      const answers = (label: string, schema: boolean): Answer =>
        schema && label === "scan" ? { text: "this is not json" } : { text: "ok" };
      const a = normalizeRun(await runUpstream(count, cwd, { answers }));
      const b = normalizeRun(await runClaude(count, cwd, { answers }));
      expect(a.failures).toEqual([{ label: "scan", errorClass: "schema-no-structured-output" }]);
      expect(b.failures).toEqual(a.failures);
      expect(b).toEqual(a);
      expect(a.value).toBe(0);
    });

    it("a schema-bearing answer of the wrong shape fails the call with the same class under both backends", async () => {
      const answers = (label: string, schema: boolean): Answer =>
        schema && label === "scan" ? { text: "{}", structured: {} } : { text: "ok" };
      const a = normalizeRun(await runUpstream(count, cwd, { answers }));
      const b = normalizeRun(await runClaude(count, cwd, { answers }));
      expect(a.failures).toEqual([{ label: "scan", errorClass: "schema-mismatch" }]);
      expect(b).toEqual(a);
    });

    it("a schema failure inside structured-findings degrades identically", async () => {
      const answers: AnswerTable = (label, schema) =>
        schema && label === "review:bugs" ? { text: "{}", structured: {} } : goldenAnswerFor(label, schema);
      const a = normalizeRun(await runUpstream(structured, cwd, { answers }));
      const b = normalizeRun(await runClaude(structured, cwd, { answers }));
      expect(a.failures.map(failure => failure.label)).toEqual(["review:bugs"]);
      expect(b).toEqual(a);
    });

    it("exhausting the agent budget fails the run with the same class under both backends", async () => {
      const fanOut = scriptNamed("fan-out-audit.js");
      // agentCap 1, not 2: the cap refuses the first audit before any agent is in flight, so the
      // journal shape is deterministic. At cap 2 the in-flight agent's 1 ms host timer raced the
      // worker's cross-thread cap-failure round trip (paired-run probe: 15/240 divergences at cap 2
      // under 12-way load, 0/240 at cap 1); that was a race, not a backend divergence.
      const a = await runUpstream(fanOut, cwd, { agentCap: 1 });
      const b = await runClaude(fanOut, cwd, { agentCap: 1 });
      expect(a.result.status).toBe("failed");
      expect(errorClassOf(a.result.error)).toBe("agent-cap-exceeded");
      expect(b.result.status).toBe("failed");
      expect(b.result.error).toBe(a.result.error);
      expect(normalizeRun(b)).toEqual(normalizeRun(a));
      // The cap held on the SDK side too: exactly the one query the cap allows, none beyond it.
      expect(b.sdkCalls).toHaveLength(1);
    });

    it("an unsupported agent() option fails at the call under both backends, naming the key, before any SDK query", async () => {
      const script = `export const meta = { name: "bad-option", description: "unknown agent option" };\nreturn await agent("x", { label: "x", bogusKey: 1 });\n`;
      const a = await runUpstream({ id: "inline", dir: "", file: "inline.js", args: undefined, source: script }, cwd);
      const b = await runClaude({ id: "inline", dir: "", file: "inline.js", args: undefined, source: script }, cwd);
      for (const run of [a, b]) {
        expect(run.result.status).toBe("failed");
        expect(run.result.error).toContain("bogusKey");
        expect(errorClassOf(run.result.error)).toBe("unrecognised-option");
      }
      expect(b.result.error).toBe(a.result.error);
      expect(b.sdkCalls).toHaveLength(0);
    });
  });

  describe("mutation proof", () => {
    it("one divergent fixture answer on the Claude backend only makes the equivalence assertion fail for the affected example", async () => {
      const divergent: AnswerTable = (label, schema) =>
        label === "synthesize" ? { text: "DIVERGENT" } : goldenAnswerFor(label, schema);
      for (const script of equivalent) {
        const a = normalizeRun(await runUpstream(script, cwd));
        const b = normalizeRun(await runClaude(script, cwd, { answers: divergent }));
        const diff = diffNormalized(a, b);
        if (script.file === "review-panel.js") {
          expect(diff).toContain("value");
          // The perturbed answer is journaled text, so the journal comparison catches it independently.
          expect(diff).toContain("journal");
        } else expect(diff).toEqual([]);
      }
    });
  });
});
