/**
 * wb-ktf (P1, W15/W19): the evidence preview pipeline split text into lines BEFORE redaction, so a credential whose scheme or
 * key ended one line while its value started the next leaked 5/5 through the landed claude evidence path to the rendered
 * inspector details (evidence-producers.ts textLines, then evidence-loader.ts boundPreview redacting each part after its split).
 * Bead spec: "redact the WHOLE text exactly once before any split; per-line operations only after; the five-input corpus becomes
 * mutant-level red-first acceptance". The furnace read (verify-first in the bead) composed the same way over the producer's own
 * lines and is driven here too, module and wired. The five P-pins the owner bound from the wb-v53 gate (P6/P7/P8/P10/P11) ride
 * this rewrite of boundPreview/safeChunks, written with ASCII source through the EvidenceStore with true source bytes.
 * Every control, invisible and non-ASCII code point below is built with String.fromCodePoint, so this source is ASCII.
 */
import type { LogsReadDto, Response } from "@furnace/sdk";
import { describe, expect, it } from "vitest";
import { type InspectorModel, initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import type { ClaudeTranscriptRow } from "../src/workbench/claude-transcript.js";
import { type EvidenceContent, type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { CLAUDE_TRANSCRIPT_GRANT, type ClaudeEvidenceSeam, createEvidenceLoaders, FURNACE_INSPECT_GRANT } from "../src/workbench/evidence-producers.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { type FurnaceEvidenceRequest, readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const cp = (...points: number[]): string => String.fromCodePoint(...points);
const LF = cp(0x0a);
const CR = cp(0x0d);
const NEL = cp(0x85);
const LS = cp(0x2028);
const PS = cp(0x2029);
const ZWSP = cp(0x200b);
/** The three-byte CJK ideograph the wb-v53 pins use. */
const HAN = cp(0x6f22);
/** A four-byte code point stored as a surrogate pair. */
const GRIN = cp(0x1f600);
/** The lowest astral code point: its high surrogate is exactly 0xD800. */
const LOWEST_ASTRAL = cp(0x10000);
const LONE_HIGH = String.fromCharCode(0xd83d);
const REPLACEMENT = cp(0xfffd);
const ELLIPSIS = cp(0x2026);
const BUDGET = `${ELLIPSIS} truncated (producer: budget)`;
const MARKER = "[REDACTED]";
const TRUNCATED = "[truncated]";
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;

/** The gate-measured 5/5 line-split shapes (wb-6ze.10 gate verdict, outbox row 150, U4(a); bead description). */
const LINE_SPLIT: ReadonlyArray<{ readonly id: string; readonly text: string; readonly secret: string }> = [
  { id: "Authorization: Bearer, LF, value", text: `Authorization: Bearer${LF}abc123secret`, secret: "abc123secret" },
  { id: "Authorization: Bearer, CRLF, value", text: `Authorization: Bearer${CR}${LF}abc123secret`, secret: "abc123secret" },
  { id: "password:, LF, value", text: `password:${LF}hunter2hunter2`, secret: "hunter2hunter2" },
  { id: "api_key: and a space, LF, value", text: `api_key: ${LF}xyzsecretvalue`, secret: "xyzsecretvalue" },
  { id: "Basic, CR, base64", text: `Basic${CR}dXNlcjpwYXNzc2VjcmV0`, secret: "dXNlcjpwYXNzc2VjcmV0" },
];
/** What the store shows for each shape once the whole text is redacted before its split: the value is gone, the rows stay. */
const STORE_ROWS: Readonly<Record<string, readonly string[]>> = {
  "Authorization: Bearer, LF, value": [`Authorization: ${MARKER}`],
  "Authorization: Bearer, CRLF, value": [`Authorization: ${MARKER}`],
  "password:, LF, value": ["password:", MARKER],
  "api_key: and a space, LF, value": ["api_key: ", MARKER],
  "Basic, CR, base64": [MARKER],
};

const scope: ObservationScope = { workspace: "/ws", principal: "local-operator:1:s1" };
const NOW = "2026-10-16T09:00:00Z";
const UUID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
/** The module-shaped claude seam (wb-idq): the fixture rows, a cwd, and an owning node listing exactly the requested ref. */
const claudeSeam = (rows: readonly ClaudeTranscriptRow[]): ClaudeEvidenceSeam => ({
  readTranscript: async () => rows,
  cwd: () => "/ws",
  owningNode: (_scope, nativeRef, ref) => ({ nativeRef, evidenceRefs: [ref], freshness: "current" }),
});
const presentation = (title: string) => ({ title, type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const });

/** A fixture loader handing `preview` verbatim, reporting the true UTF-8 size of its source unless told otherwise. */
function fixtureLoader(preview: readonly string[], bytes = Buffer.byteLength(preview.join(LF))): EvidenceLoader {
  const content: EvidenceContent = { kind: "fixture", provider: "fixture", capturedAt: NOW, bytes, truncated: false, preview, freshness: "current" };
  return { provider: "fixture", requiredGrant: "fixture:read", canLoad: ref => ref.startsWith("ev:"), load: async () => content };
}
const fixtureRef: NativeRef = { provider: "fixture", type: "operation", id: "n1" };
async function storePreview(preview: readonly string[], maxBytes = 4096, bytes?: number): Promise<readonly string[]> {
  const store = new EvidenceStore({ loaders: [fixtureLoader(preview, bytes)], maxEntries: 8, maxBytes, timeoutMs: 200 });
  await store.request(scope, fixtureRef, "ev:1");
  const entry = store.get(scope, fixtureRef, "ev:1");
  if (entry.state !== "loaded") throw new Error(`expected a loaded entry, got ${entry.state}`);
  return entry.preview;
}

/** The details view of `model` with its first node focused, after the selected evidence ref loaded. */
async function renderedDetails(model: InspectorModel & { evidence: EvidenceStore }): Promise<string> {
  let state = reduceInspectorKey("j", initialInspectorState(), model)!.state;
  state = reduceInspectorKey("k", state, model)!.state;
  state = reduceInspectorKey("s", state, model)!.state;
  const target = inspectorEvidenceTarget(model, state);
  if (target === undefined) throw new Error("expected a focused node with an evidence ref");
  await model.evidence.request(target.scope, target.nativeRef, target.evidenceRef);
  return layoutInspector(model, state, { width: 120, rows: 40, ascii: true }).join(LF);
}

/** The landed claude path end to end: host wiring (evidence-wiring.ts) -> producer -> EvidenceStore -> inspector details. */
async function claudeInspector(text: string): Promise<string> {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 8 });
  projection.refresh({
    source: { provider: "claude-agent-sdk", type: "session", id: "s1" }, scope, capturedAt: NOW, observedAt: NOW,
    node: presentation("Claude session"), trace: { invocationId: "wf-ktf" }, coverage: "partial", evidenceRefs: [`claude-message:${UUID}`],
  });
  const evidence = createWorkbenchEvidenceStore({
    grants: () => [CLAUDE_TRANSCRIPT_GRANT], scope: () => scope, projection, cwd: () => "/ws",
    claudeRead: async () => [{ type: "assistant" as const, uuid: UUID, text }],
    now: () => new Date(NOW),
  });
  return renderedDetails({ projection, scope, invocationId: "wf-ktf", title: "Line split", status: "running", evidence });
}

const RUN = "frn-run-ktf-1";
const ATTEMPT = "frn-atm-ktf-1";
/** A Furnace logs reply carrying `lines` exactly as the producer split its log. */
function logsReply(lines: readonly string[], runId = RUN, attempt = ATTEMPT, stream: "stdout" | "stderr" = "stdout"): Response<LogsReadDto> {
  const data: LogsReadDto = {
    run_id: runId, attempt_id: attempt, stream, complete: true, limit: 4096, returned: lines.length, next_cursor: null, lossy: false, lines: [...lines],
  };
  return { protocolVersion: 1, kind: "logs_read", requestId: "req-ktf", data, exit: { code: 0, signal: null }, stderr: "" };
}
async function furnacePreview(lines: readonly string[], overrides: Partial<FurnaceEvidenceRequest> = {}): Promise<readonly string[]> {
  const content = await readFurnaceAttemptLogEvidence({
    client: { logs: { read: async () => logsReply(lines, RUN, ATTEMPT, "stderr") } }, runId: RUN, workspaceRoot: "/ws",
    owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN, scope: "/ws" }, evidenceRefs: [ATTEMPT] },
    attemptId: ATTEMPT, stream: "stderr", maxBytes: 4096, maxLines: 200, timeoutMs: 2000, signal: new AbortController().signal,
    capturedAt: () => NOW, ...overrides,
  });
  return content.preview;
}
/** The landed furnace path end to end: host wiring -> furnace-evidence read -> producer -> EvidenceStore -> inspector details. */
async function furnaceInspector(lines: readonly string[]): Promise<string> {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 8 });
  projection.refresh({
    source: { provider: "furnace", type: "run", id: RUN, scope: "/ws" }, scope, capturedAt: NOW, observedAt: NOW,
    node: presentation("Run"), trace: { invocationId: "wf-ktf-furnace" }, coverage: "partial", evidenceRefs: [ATTEMPT],
  });
  const evidence = createWorkbenchEvidenceStore({
    grants: () => [FURNACE_INSPECT_GRANT], scope: () => scope, projection, cwd: () => "/ws",
    furnaceClient: () => ({ logs: { read: async (runId: string, request?: { attempt?: string; stream?: "stdout" | "stderr" }) => logsReply(lines, runId, request?.attempt, request?.stream) } }),
    now: () => new Date(NOW),
  });
  return renderedDetails({ projection, scope, invocationId: "wf-ktf-furnace", title: "Furnace line split", status: "running", evidence });
}

describe("wb-ktf: a line-split credential is redacted on the rendered inspector surface (the landed claude evidence path)", () => {
  it("the corpus holds the five gate-measured shapes, so no table below can run empty", () => {
    expect(LINE_SPLIT.map(shape => shape.id)).toStrictEqual(Object.keys(STORE_ROWS));
    expect(LINE_SPLIT).toHaveLength(5);
  });

  it.each(LINE_SPLIT)("$id: the value never reaches the details view, the marker and its key do", async ({ text, secret }) => {
    const rendered = await claudeInspector(text);
    expect(rendered).toContain("loaded");
    expect(rendered).toContain(MARKER);
    expect(rendered).not.toContain(secret);
  });

  it.each(LINE_SPLIT)("$id: through the furnace read the producer split into lines, the value never reaches the details view", async ({ text, secret }) => {
    const rendered = await furnaceInspector(text.split(LF));
    expect(rendered).toContain("loaded");
    expect(rendered).toContain(MARKER);
    expect(rendered).not.toContain(secret);
  });
});

describe("wb-ktf: the EvidenceStore redacts each loader preview entry WHOLE, once, before it splits or cuts it", () => {
  it.each(LINE_SPLIT)("$id: one multi-line entry keeps its rows and loses its value", async ({ id, text, secret }) => {
    const preview = await storePreview([text]);
    expect(preview).toStrictEqual(STORE_ROWS[id]);
    expect(preview.join(LF)).not.toContain(secret);
  });

  it("a budget cut lands on the redacted text: a quoted value cut by the budget shows none of its later words", async () => {
    const source = 'password: "correct horse battery staple"';
    const preview = await storePreview([source], 25);
    expect(preview).toStrictEqual([`password: ${MARKER}`, TRUNCATED]);
    for (const word of ["correct", "horse", "battery", "staple"]) expect(preview.join(LF)).not.toContain(word);
  });

  it("a clipped multi-line preview is a prefix of the redacted rows ending at the cut (v53 C-pin property on the new path)", async () => {
    const source = `Authorization: Bearer${LF}abc123secret${LF}next line${LF}more`;
    expect(await storePreview([source], 29)).toStrictEqual([`Authorization: ${MARKER}`, "next", TRUNCATED]);
  });

  it("the whole entry reaches the rows unbounded by the helper's default text limit; only the store's budgets bound it", async () => {
    const source = "x".repeat(3000);
    const preview = await storePreview([source]);
    expect(preview.join("")).toBe(source);
    expect(preview).toHaveLength(13);
    expect(preview.every(line => line.length <= 240)).toBe(true);
  });

  it("transcript rows: CRLF, CR, NEL, LS and PS each end one row, blank rows stay, nothing collapses into one line", async () => {
    const source = `row one${CR}${LF}row two${CR}row three${NEL}row four${LS}row five${PS}row six${LF}${LF}end`;
    expect(await storePreview([source])).toStrictEqual(["row one", "row two", "row three", "row four", "row five", "row six", "", "end"]);
  });

  it("each chunk still passes the terminal sanitizer after the split: a run of spaces renders as one, as on the terminal card", async () => {
    expect(await storePreview(["col one    col two"])).toStrictEqual(["col one col two"]);
  });

  it("entries are separate rows: a value in its own entry stays visible text only when no key precedes it in that entry", async () => {
    expect(await storePreview(["first entry", "second entry"])).toStrictEqual(["first entry", "second entry"]);
  });
});

describe("wb-ktf: producers hand each row's WHOLE text to the store, never pre-split (evidence-producers.ts)", () => {
  const claudeRef: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "session-1" };
  const runRef: NativeRef = { provider: "furnace", type: "run", id: "run-1" };

  it.each(LINE_SPLIT)("claude: $id is one credential to the store", async ({ id, text, secret }) => {
    const store = new EvidenceStore({
      loaders: createEvidenceLoaders({ grants: () => [CLAUDE_TRANSCRIPT_GRANT], claude: claudeSeam([{ type: "assistant", uuid: UUID, text }]), now: () => new Date(NOW) }),
      maxEntries: 4, maxBytes: 4096, timeoutMs: 200,
    });
    await store.request(scope, claudeRef, `claude-message:${UUID}`);
    const entry = store.get(scope, claudeRef, `claude-message:${UUID}`);
    if (entry.state !== "loaded") throw new Error(`expected a loaded entry, got ${entry.state}`);
    expect(entry.preview).toStrictEqual(["assistant:", ...STORE_ROWS[id]]);
    expect(JSON.stringify(entry)).not.toContain(secret);
  });

  it.each(LINE_SPLIT)("furnace: $id in the read's text is one credential to the store", async ({ id, text, secret }) => {
    const store = new EvidenceStore({
      loaders: createEvidenceLoaders({
        grants: () => [FURNACE_INSPECT_GRANT],
        furnace: async () => ({ runId: "run-1", attemptId: "attempt-1", stream: "stdout", text, complete: true, lossy: false, capturedAt: NOW }),
      }),
      maxEntries: 4, maxBytes: 4096, timeoutMs: 200,
    });
    await store.request(scope, runRef, "attempt-1");
    const entry = store.get(scope, runRef, "attempt-1");
    if (entry.state !== "loaded") throw new Error(`expected a loaded entry, got ${entry.state}`);
    expect(entry.preview).toStrictEqual(["stdout:", ...STORE_ROWS[id]]);
    expect(JSON.stringify(entry)).not.toContain(secret);
  });
});

describe("wb-ktf: the furnace read redacts the producer's WHOLE reply once, before it takes the tail or clips a row (furnace-evidence.ts)", () => {
  it.each(LINE_SPLIT)("$id split into producer lines: the module's own preview carries no value", async ({ text, secret }) => {
    const preview = await furnacePreview(text.split(LF));
    expect(preview.join(LF)).toContain(MARKER);
    expect(preview.join(LF)).not.toContain(secret);
  });

  it("a scheme on the line just before the kept tail still hides the value the tail keeps", async () => {
    const preview = await furnacePreview(["x", "Authorization: Bearer", "abc123secret", "done"], { maxLines: 2 });
    expect(preview).toStrictEqual([`Authorization: ${MARKER}`, "done", BUDGET]);
  });

  it("rows, not producer lines, fill maxLines: a value merged into its key's row frees the line it held", async () => {
    expect(await furnacePreview(["Authorization: Bearer", "abc123secret", "done"], { maxLines: 2 })).toStrictEqual([`Authorization: ${MARKER}`, "done"]);
  });

  it("a carriage return inside a producer line ends a row, as the store's transcript rows do", async () => {
    expect(await furnacePreview([`50%${CR}60%`, "ok"])).toStrictEqual(["50%", "60%", "ok"]);
  });

  it("a line of exactly MAX_SCAN raw characters is examined whole and is not a budget cut", async () => {
    const preview = await furnacePreview([`a${ZWSP.repeat(1999)}`]);
    expect(preview).toStrictEqual(["a"]);
  });

  it("the scan window ends exactly at MAX_SCAN raw characters: the 2000th is examined, the 2001st never is", async () => {
    expect(await furnacePreview([`${ZWSP.repeat(1999)}b${"c".repeat(5)}`])).toStrictEqual([`b${ELLIPSIS}`, BUDGET]);
  });

  it("a row longer than MAX_LINE that no scan window cut still names the budget", async () => {
    expect(await furnacePreview(["y".repeat(201)])).toStrictEqual([`${"y".repeat(199)}${ELLIPSIS}`, BUDGET]);
  });

  it("an empty read has no rows at all", async () => {
    expect(await furnacePreview([])).toStrictEqual([]);
  });
});

describe("wb-ktf: the five wb-v53 mutant pins the owner bound onto this rewrite (EvidenceStore, true source bytes)", () => {
  it("P6 (kills M6, break -> continue in prefixWithinBytes): a mixed-width cut keeps a strict prefix", async () => {
    expect(await storePreview([`${HAN}a`], 2)).toStrictEqual([TRUNCATED]);
    expect(await storePreview([`${GRIN}ab`], 3)).toStrictEqual([TRUNCATED]);
    expect(await storePreview([`a${HAN}b`], 3)).toStrictEqual(["a", TRUNCATED]);
  });

  it("P7 (v53 F2): a source-carried lone high surrogate terminates and never reaches the preview", async () => {
    const preview = await storePreview([`ok${LONE_HIGH}`]);
    expect(preview).toStrictEqual(["ok"]);
    expect(preview.join("")).not.toContain(REPLACEMENT);
  });

  it("P8 (kills M8, high-surrogate upper bound 0xdbff -> 0xdfff): 130 surrogate pairs on even alignment survive the chunking whole", async () => {
    const source = GRIN.repeat(130);
    const preview = await storePreview([source]);
    for (const line of preview) expect(line).not.toMatch(LONE_SURROGATE);
    expect(preview.join("")).toBe(source);
  });

  it("P10 (kills M10, kept === '' && size > 0 -> kept === ''): legitimate blank lines stay", async () => {
    expect(await storePreview([`a${LF}${LF}b`])).toStrictEqual(["a", "", "b"]);
    expect(await storePreview(["", "x"])).toStrictEqual(["", "x"]);
  });

  it("P11 (kills M11, high-surrogate lower bound >= 0xd800 -> > 0xd800): a 0xD800-high pair is never split at the chunk boundary", async () => {
    const source = `a${LOWEST_ASTRAL.repeat(130)}`;
    const preview = await storePreview([source]);
    for (const line of preview) expect(line).not.toMatch(LONE_SURROGATE);
    expect(preview.join("")).toBe(source);
  });
});
