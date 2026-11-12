/**
 * wb-ba4n (MII P00+ packet), cut #1: EAT-R395 criterion 2 only, at this file's boundary fixtures. Requirement text:
 * docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md at Pi master
 * 347d58ea, line 164: "2. On retained canonical input, assert the 64 KiB limit; on canonical function policy, assert the
 * 4096-byte limit, including multibyte UTF-8 boundaries. A over-limit refusal invokes zero callbacks." The row's
 * statement: "The function route and its contract MUST NOT represent the existing canonical, notes-stripped byte limits as
 * a raw-request-size guarantee." Its named negative mutant: "Measure raw function input as if it were the canonical
 * limit". The planned evidence label is BUDGET-SURFACE-REGRESSION; this file is that label's criterion 2 leg only.
 *
 * Terms. A function request's retained canonical input is its input with the notes member omitted, written as canonical
 * JSON; its canonical function policy is its policy with the notes member omitted, written the same way. Every fixture
 * here is a record whose only retained member holds a string with no character JSON.stringify escapes, and each byte
 * count below is the UTF-8 byte count Buffer.byteLength reports for JSON.stringify of that one-member record, computed in
 * this file and never by src/.
 *
 * Fixtures. A boundary record holds one string that ends in one of four tails, U+0061 (1 UTF-8 byte), U+00E9 (2), U+20AC
 * (3) and U+1F600 (4), after a filler of U+20AC with at most two U+0061, sized so the record is exactly the bound (65536
 * bytes for an input, 4096 for a policy) or one byte over it (its twin). Each fixture checks itself: its string is that
 * filler and tail, and JSON.stringify escapes none of its characters; the record and its twin measure the bound and the
 * bound plus one in UTF-8 bytes; the twin's JSON is under half the bound in UTF-16 units; and canonicalJson, applied after
 * withoutBeadsNotes (src/workbench/identity.ts), writes each fixture as JSON.stringify of its one-member record. A function
 * fixture also carries a notes member longer than the bound, and checks that the raw JSON of the record and of its twin,
 * notes member included, is over the bound. A script fixture is the one-member record alone, with no notes member.
 *
 * Pinned reader set (case id: reader, what it asserts):
 *   R395-C2-IN: decideExecute, a function definition, each host mode, each tail: the request whose retained canonical
 *     input is 65536 bytes is admitted; its twin is refused as malformed-request.
 *   R395-C2-POL: decideExecute, a function definition, each host mode, each tail: the request whose canonical function
 *     policy is 4096 bytes is admitted; its twin is refused as malformed-policy.
 *   R395-C2-ZERO: the tool createWorkflowExecuteTool builds, over counting resolveSource, launchEmbedded and launchDetached
 *     callbacks, with workbench:execute and workbench:detach held: each twin (input and policy, a script and a function
 *     definition, each host mode, each tail) replies the code malformed-request or malformed-policy and calls none of the
 *     three.
 *   R395-C2-CTRL: the same tool and callbacks: each at-bound script request (input and policy, each host mode, each tail)
 *     replies launched, calling resolveSource and its host mode's launcher once each and the other launcher never, so
 *     the zero counts of R395-C2-ZERO are read on callbacks this file shows called; each at-bound function request replies
 *     the code unsupported-definition-kind and calls none of the three.
 *   R395-C2-REG: the workflow_execute tool src/index.ts registers, booted with the claude backend and workbench:execute and
 *     workbench:detach granted, a function definition, each host mode, each tail: the at-bound input and policy requests
 *     reply the code unsupported-definition-kind, and their twins reply malformed-request and malformed-policy.
 * Falsifiers, each planted alone on a throwaway copy (the delivery note lists the reds): src/workbench/execute.ts measuring
 * the raw input (R395's named mutant) or the raw policy, measuring UTF-16 units instead of UTF-8 bytes, either bound moved
 * one byte either way; src/workbench/execute-tool.ts resolving the source, or launching, before a refusal returns.
 *
 * NOT CLAIMED by this census: EAT-R395 criteria 1 and 3; the bead's other rows (EAT-R391..R394, R396..R398, R405, R469,
 * R470); any raw transport limit; the four Mechanical DevelopmentServices callbacks (this file counts only the built
 * tool's resolveSource, launchEmbedded and launchDetached); a script definition's notes member; and any request shape,
 * byte count, tail or host grant set other than the fixtures'.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import type { WorkflowSource } from "../src/workbench/designer.js";
import { decideExecute, EXECUTE_GRANT, type WorkflowExecuteRequest } from "../src/workbench/execute.js";
import { createWorkflowExecuteTool, DETACH_GRANT, type WorkflowExecuteDeps } from "../src/workbench/execute-tool.js";
import { canonicalJson, withoutBeadsNotes } from "../src/workbench/identity.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

/** The criterion's two bounds, in UTF-8 bytes: "the 64 KiB limit" and "the 4096-byte limit". */
const INPUT_BOUND = 64 * 1024;
const POLICY_BOUND = 4096;
const MODES = ["embedded", "detached"] as const;
type Mode = (typeof MODES)[number];
const DIGEST = `sha256:${"ab".repeat(32)}`;
const INVOCATION = "inv-r395-1";
const RIGHTS: readonly string[] = [EXECUTE_GRANT, DETACH_GRANT];
const FUNCTION_REF = { kind: "function", id: "mechanical.development.develop.v1", schemaVersion: "mechanical-workflows/entrypoint/v1", artifactDigest: DIGEST } as const;
const SCRIPT_REF = { kind: "script", id: "/ws/.pi/workflows/r395.js", schemaVersion: "workflow-script/v1", artifactDigest: DIGEST } as const;
const SOURCE: WorkflowSource = Object.freeze({
  definition: Object.freeze({ ...SCRIPT_REF }),
  sourceRef: SCRIPT_REF.id,
  source: "export const meta = { name: 'r395', description: 'd' }\nreturn 1\n",
});
const SMALL_INPUT: Record<string, JsonValue> = { task: "t" };

const cp = (code: number): string => String.fromCodePoint(code);
const EURO = cp(0x20ac);
/** The four tails, by UTF-8 width: U+0061, U+00E9, U+20AC and U+1F600. */
const TAILS: readonly (readonly [number, string])[] = [
  [1, cp(0x61)],
  [2, cp(0xe9)],
  [3, EURO],
  [4, cp(0x1f600)],
];
/** UTF-8 bytes of JSON.stringify(value). */
const utf8 = (value: unknown): number => Buffer.byteLength(JSON.stringify(value), "utf8");

/** The one-member record {[key]: text} whose JSON is exactly `bytes` UTF-8 bytes, its text ending in `tail`. */
function sized(key: string, bytes: number, tail: string): Record<string, string> {
  const filler = bytes - utf8({ [key]: "" }) - Buffer.byteLength(tail, "utf8");
  const record = { [key]: `${EURO.repeat(Math.floor(filler / 3))}${"a".repeat(filler % 3)}${tail}` };
  if (utf8(record) !== bytes) throw new Error(`fixture ${key}/${bytes}: measured ${utf8(record)} bytes`);
  return record;
}
interface Pair {
  readonly at: Record<string, JsonValue>;
  readonly over: Record<string, JsonValue>;
}
/** The at-bound record and its twin, each with the fixture's own size checks; a function fixture adds a notes member longer than the bound. */
function pair(key: string, bound: number, tail: string, withNotes: boolean): Pair {
  const at = sized(key, bound, tail);
  const over = sized(key, bound + 1, tail);
  for (const text of [at[key], over[key]]) {
    const filler = [...text.slice(0, text.length - tail.length)];
    expect({ tail: text.endsWith(tail), euro: filler.includes(EURO), others: filler.filter(ch => ch !== EURO && ch !== "a").length, a: filler.filter(ch => ch === "a").length <= 2 }).toEqual({ tail: true, euro: true, others: 0, a: true });
    expect(JSON.stringify(text)).toBe(`"${text}"`);
  }
  expect([utf8(at), utf8(over)]).toEqual([bound, bound + 1]);
  expect(JSON.stringify(over).length).toBeLessThan(bound / 2);
  if (!withNotes) {
    expect([Object.keys(at), Object.keys(over)]).toEqual([[key], [key]]);
    expect([canonicalJson(withoutBeadsNotes(at)), canonicalJson(withoutBeadsNotes(over))]).toEqual([JSON.stringify(at), JSON.stringify(over)]);
    return { at, over };
  }
  const notes = "n".repeat(bound + 1);
  expect(notes.length).toBeGreaterThan(bound);
  const withNote = (record: Record<string, string>): Record<string, JsonValue> => ({ ...record, notes });
  expect([utf8(withNote(at)) > bound, utf8(withNote(over)) > bound]).toEqual([true, true]);
  expect([canonicalJson(withoutBeadsNotes(withNote(at))), canonicalJson(withoutBeadsNotes(withNote(over)))]).toEqual([JSON.stringify(at), JSON.stringify(over)]);
  return { at: withNote(at), over: withNote(over) };
}
const inputPair = (tail: string, withNotes: boolean): Pair => pair("task", INPUT_BOUND, tail, withNotes);
const policyPair = (tail: string, withNotes: boolean): Pair => pair("mode", POLICY_BOUND, tail, withNotes);

function functionRequest(hostMode: Mode, input: JsonValue, policy?: JsonValue): WorkflowExecuteRequest {
  return { definitionRef: { ...FUNCTION_REF }, input, hostMode, ...(policy !== undefined ? { policy } : {}) };
}
const decide = (request: WorkflowExecuteRequest) => decideExecute(request, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
const MALFORMED_REQUEST = { decision: "refused", category: "validation", reason: "malformed execute request", policy: "malformed-request", invocationId: INVOCATION };
const MALFORMED_POLICY = { decision: "refused", category: "validation", reason: "malformed execute policy", policy: "malformed-policy", invocationId: INVOCATION };

/** The tool createWorkflowExecuteTool builds, its three host callbacks counted. */
function builtTool() {
  const resolveSource = vi.fn((): WorkflowSource => SOURCE);
  const launchEmbedded = vi.fn(async (): Promise<readonly NativeRef[]> => [{ provider: "pi-workflow", type: "task", id: INVOCATION }]);
  const launchDetached = vi.fn(async (): Promise<readonly NativeRef[]> => [{ provider: "local-detached", type: "invocation", id: INVOCATION }]);
  const deps: WorkflowExecuteDeps = {
    grants: () => RIGHTS,
    observerScope: () => ({ workspace: "/ws", principal: "local-operator:1000:s1" }),
    localPrincipal: () => "local-operator:1000:s1",
    sessionIdOf: () => "s1",
    mintInvocationId: () => INVOCATION,
    resolveSource,
    launchEmbedded,
    launchDetached,
  };
  const tool = createWorkflowExecuteTool(deps);
  const context = { cwd: "/ws" } as unknown as ExtensionContext;
  return async (params: Record<string, unknown>) => {
    const before = [resolveSource.mock.calls.length, launchEmbedded.mock.calls.length, launchDetached.mock.calls.length];
    const result = await tool.execute("r395-built", params as never, undefined, undefined, context as never);
    const reply = JSON.parse(textOf(result)) as { status: string; error?: { code: string } };
    const calls = [resolveSource.mock.calls.length - before[0], launchEmbedded.mock.calls.length - before[1], launchDetached.mock.calls.length - before[2]];
    return { status: reply.status, code: reply.error?.code, calls };
  };
}
const params = (definitionRef: object, hostMode: Mode, input: JsonValue, policy?: JsonValue) => ({ definitionRef: { ...definitionRef }, input, hostMode, ...(policy !== undefined ? { policy } : {}) });

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
});

describe("wb-ba4n EAT-R395 criterion 2 at this file's boundary fixtures: a function request at 65536 retained canonical input bytes or 4096 canonical policy bytes is admitted by decideExecute and replied unsupported-definition-kind by the tool createWorkflowExecuteTool builds and by the workflow_execute tool src/index.ts registers, while its one-byte-over twin is refused malformed-request or malformed-policy by all three; the built tool calls none of resolveSource, launchEmbedded and launchDetached for each over-limit twin, and calls resolveSource and its host mode's launcher once each for an at-bound script request", () => {
  it("R395-C2-IN decideExecute, a function definition, each host mode, each tail: the request whose retained canonical input is 65536 UTF-8 bytes is admitted, and its 65537-byte twin is refused as malformed-request", () => {
    for (const hostMode of MODES) {
      for (const [width, tail] of TAILS) {
        const { at, over } = inputPair(tail, true);
        expect({ hostMode, width, decision: decide(functionRequest(hostMode, at)).decision }).toEqual({ hostMode, width, decision: "admitted" });
        expect({ hostMode, width, decision: decide(functionRequest(hostMode, over)) }).toEqual({ hostMode, width, decision: MALFORMED_REQUEST });
      }
    }
  });

  it("R395-C2-POL decideExecute, a function definition, each host mode, each tail: the request whose canonical function policy is 4096 UTF-8 bytes is admitted, and its 4097-byte twin is refused as malformed-policy", () => {
    for (const hostMode of MODES) {
      for (const [width, tail] of TAILS) {
        const { at, over } = policyPair(tail, true);
        expect({ hostMode, width, decision: decide(functionRequest(hostMode, SMALL_INPUT, at)).decision }).toEqual({ hostMode, width, decision: "admitted" });
        expect({ hostMode, width, decision: decide(functionRequest(hostMode, SMALL_INPUT, over)) }).toEqual({ hostMode, width, decision: MALFORMED_POLICY });
      }
    }
  });

  it("R395-C2-ZERO the tool createWorkflowExecuteTool builds: each over-limit twin, input and policy, for a script and a function definition in each host mode and each tail, replies malformed-request or malformed-policy and calls none of resolveSource, launchEmbedded and launchDetached", async () => {
    const run = builtTool();
    for (const [kind, ref] of [["script", SCRIPT_REF], ["function", FUNCTION_REF]] as const) {
      const withNotes = kind === "function";
      for (const hostMode of MODES) {
        for (const [width, tail] of TAILS) {
          const input = await run(params(ref, hostMode, inputPair(tail, withNotes).over));
          expect({ kind, hostMode, width, input }).toEqual({ kind, hostMode, width, input: { status: "refused", code: "malformed-request", calls: [0, 0, 0] } });
          const policy = await run(params(ref, hostMode, SMALL_INPUT, policyPair(tail, withNotes).over));
          expect({ kind, hostMode, width, policy }).toEqual({ kind, hostMode, width, policy: { status: "refused", code: "malformed-policy", calls: [0, 0, 0] } });
        }
      }
    }
  });

  it("R395-C2-CTRL the same tool: each at-bound script request, input and policy, in each host mode and each tail, replies launched and calls resolveSource and its host mode's launcher once each, and each at-bound function request replies unsupported-definition-kind and calls none of the three", async () => {
    const run = builtTool();
    const launched = (hostMode: Mode) => ({ status: "launched", code: undefined, calls: hostMode === "embedded" ? [1, 1, 0] : [1, 0, 1] });
    const kindRefused = { status: "refused", code: "unsupported-definition-kind", calls: [0, 0, 0] };
    for (const hostMode of MODES) {
      for (const [width, tail] of TAILS) {
        const script = [await run(params(SCRIPT_REF, hostMode, inputPair(tail, false).at)), await run(params(SCRIPT_REF, hostMode, SMALL_INPUT, policyPair(tail, false).at))];
        expect({ hostMode, width, script }).toEqual({ hostMode, width, script: [launched(hostMode), launched(hostMode)] });
        const fn = [await run(params(FUNCTION_REF, hostMode, inputPair(tail, true).at)), await run(params(FUNCTION_REF, hostMode, SMALL_INPUT, policyPair(tail, true).at))];
        expect({ hostMode, width, fn }).toEqual({ hostMode, width, fn: [kindRefused, kindRefused] });
      }
    }
  });

  it("R395-C2-REG the workflow_execute tool src/index.ts registers, booted with the claude backend and workbench:execute and workbench:detach granted: a function definition's at-bound input and policy requests reply unsupported-definition-kind, and their twins malformed-request and malformed-policy, in each host mode and each tail", async () => {
    sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...RIGHTS] } } });
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context = ctx({ cwd: sandbox.dir });
    await booted.lifecycle.get("session_start")?.({}, context);
    const tool = booted.tools.get("workflow_execute");
    if (!tool) throw new Error("workflow_execute is not registered");
    const code = async (request: Record<string, unknown>): Promise<string | undefined> =>
      (JSON.parse(textOf(await tool.execute("r395-registered", request, undefined, undefined, context))) as { error?: { code: string } }).error?.code;
    for (const hostMode of MODES) {
      for (const [width, tail] of TAILS) {
        const input = inputPair(tail, true);
        const policy = policyPair(tail, true);
        const codes = [
          await code(params(FUNCTION_REF, hostMode, input.at)),
          await code(params(FUNCTION_REF, hostMode, input.over)),
          await code(params(FUNCTION_REF, hostMode, SMALL_INPUT, policy.at)),
          await code(params(FUNCTION_REF, hostMode, SMALL_INPUT, policy.over)),
        ];
        expect({ hostMode, width, codes }).toEqual({ hostMode, width, codes: ["unsupported-definition-kind", "malformed-request", "unsupported-definition-kind", "malformed-policy"] });
      }
    }
  }, 120_000);
});
