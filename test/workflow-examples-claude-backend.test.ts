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
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AgentManager } from "../src/agent-manager.js";
import {
  type Answer,
  type AnswerTable,
  diffNormalized,
  errorClassOf,
  type GoldenScript,
  goldenAnswerFor,
  goldenScripts,
  normalizeRun,
  readScript,
  runClaude,
  runUpstream,
} from "./helpers/golden-backends.js";

/** gated-fix.js: the one first-cut degradation, with the runtime's exact refusal. */
const KNOWN_DEGRADATIONS: Record<string, { owner: string; error: string }> = {
  "gated-fix.js": { owner: "wb-a2g.11", error: "This workflow host cannot run gate commands." },
};

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
afterEach(() => vi.restoreAllMocks());

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
      const forward = normalizeRun(await runUpstream(script, cwd, { completion: "forward" }));
      const runs = [
        normalizeRun(await runUpstream(script, cwd, { completion: "reverse" })),
        normalizeRun(await runClaude(script, cwd, { completion: "forward" })),
        normalizeRun(await runClaude(script, cwd, { completion: "reverse" })),
      ];
      for (const run of runs) expect(run).toEqual(forward);
    });

    it("never touches the legacy Pi spawn path and queries the SDK once per agent() call", async () => {
      const pi = [
        vi.spyOn(AgentManager.prototype, "spawn"),
        vi.spyOn(AgentManager.prototype, "spawnAndWait"),
        vi.spyOn(AgentManager.prototype, "resume"),
        vi.spyOn(AgentManager.prototype, "abort"),
      ];
      const b = await runClaude(script, cwd);

      for (const spy of pi) expect(spy).not.toHaveBeenCalled();
      expect(b.sdkCalls).toHaveLength(b.result.agentCount);
      const sessions = b.sdkCalls.map(call => call.sessionId);
      expect(new Set(sessions).size).toBe(sessions.length);
      expect(b.hostCalls).toBe(b.result.agentCount);
    });

    it("holds a model pin and no privileged built-in tools in every SDK query", async () => {
      const b = await runClaude(script, cwd);
      expect(b.sdkCalls.length).toBeGreaterThan(0);
      for (const call of b.sdkCalls) {
        expect(call.tools).toEqual([]);
        expect(call.model).toBe("fixture-model");
        expect(call.permissionMode).toBe("dontAsk");
      }
    });
  });

  describe("values the stub-host tier already pins hold under the Claude backend too", () => {
    it("fan-out-audit: 1 discovery + 2 x (audit + verify), one verified result per file", async () => {
      const script = goldenScripts.find(s => s.file === "fan-out-audit.js") as GoldenScript;
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(5);
      expect(b.result.value).toEqual(["ok:verify:src/routes/a.ts", "ok:verify:src/routes/b.ts"]);
    });

    it("structured-findings: validated objects, 2 dimensions x (review + verify)", async () => {
      const script = goldenScripts.find(s => s.file === "structured-findings.js") as GoldenScript;
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(4);
      expect(b.result.value).toMatchObject({ confirmed: 2 });
    });

    it("review-panel: three lenses then one synthesis on the Claude-native Plan role", async () => {
      const script = goldenScripts.find(s => s.file === "review-panel.js") as GoldenScript;
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(4);
      expect(b.result.value).toMatchObject({ reviewed: 3 });
      expect(b.sdkCalls.at(-1)?.effort).toBe("high");
      expect(b.sdkCalls.slice(0, 3).map(call => call.effort)).toEqual(["low", "low", "low"]);
    });

    it("compose: the nested child resolves through the host and shares the run's agent counter", async () => {
      const script = goldenScripts.find(s => s.file === "compose.js") as GoldenScript;
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);
      expect(b.result.agentCount).toBe(2);
      expect(b.result.value).toMatchObject({ ok: true, count: 2 });
      expect(normalizeRun(b).nested).toEqual(normalizeRun(a).nested);
      expect(normalizeRun(b).nested).toEqual({ ok: true, count: 2, summary: "ok:summarize" });
    });
  });

  describe("documented first-cut degradation", () => {
    it("gated-fix.js completes under the stub host but is refused at the call under the Claude host", async () => {
      const script = goldenScripts.find(s => s.file === "gated-fix.js") as GoldenScript;
      const known = KNOWN_DEGRADATIONS["gated-fix.js"];
      const a = await runUpstream(script, cwd);
      const b = await runClaude(script, cwd);

      expect(a.result.status).toBe("completed");
      expect(b.result.status).toBe("failed");
      expect(b.result.error).toBe(known.error);
      expect(errorClassOf(b.result.error)).toBe("gate-unsupported");
      // Refused before an agent was spawned: nothing was queried, nothing pretended to be gated.
      expect(b.sdkCalls).toHaveLength(0);
      expect(b.result.agentCount).toBe(0);
      expect(diffNormalized(normalizeRun(a), normalizeRun(b)).sort()).toEqual(
        ["agentCount", "error", "hostCalls", "phases", "status", "value"].sort(),
      );
    });
  });

  describe("schema, budget and option behaviour", () => {
    const structured = goldenScripts.find(s => s.file === "structured-findings.js") as GoldenScript;
    const count = goldenScripts.find(s => s.file === "count-child.js") as GoldenScript;

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
      const fanOut = goldenScripts.find(s => s.file === "fan-out-audit.js") as GoldenScript;
      const a = await runUpstream(fanOut, cwd, { agentCap: 2 });
      const b = await runClaude(fanOut, cwd, { agentCap: 2 });
      expect(a.result.status).toBe("failed");
      expect(errorClassOf(a.result.error)).toBe("agent-cap-exceeded");
      expect(b.result.status).toBe("failed");
      expect(b.result.error).toBe(a.result.error);
      expect(normalizeRun(b)).toEqual(normalizeRun(a));
      // The cap held on the SDK side too: no query beyond it.
      expect(b.sdkCalls.length).toBeLessThanOrEqual(2);
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
        if (script.file === "review-panel.js") expect(diff).toContain("value");
        else expect(diff).toEqual([]);
      }
    });
  });
});
