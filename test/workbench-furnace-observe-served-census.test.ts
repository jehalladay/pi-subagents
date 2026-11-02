/**
 * wb-g20x (the rule-19 structural-exit child of wb-40zp; rulings R-B163, R-B208 and R-B248), the furnace_observe SERVED census:
 * what the tool pi serves under the name furnace_observe replies to five pinned calls, read at run time through the tool
 * registry the boot harness keeps, and never through the source text of a registration. wb-40zp's final cut #4 (4c1368f1, not
 * on trunk) defers two readings here in its NOT CLAIMED sentence: which execute pi serves under the name furnace_observe, and
 * what the two literal refusals say and what the error reply is handed. Statement (the bead's tracker-export title,
 * verbatim): "R694 follow-up from wb-40zp (rule-19 structural exit): the R-B163-frozen reader class gets member witnesses or
 * named-residual status". Acceptance (the export description, verbatim): "per surviving member, a witness that reds the
 * delivered census under the member while reading clean under trunk, or the member documented as a NAMED residual with the
 * claims narrowed to the proven subset; claims no wider than pins (rule 16 LEG 2, R514/R515/R668)."
 *
 * THE READER is test/helpers/furnace-observe-served-reader.ts, whose header is the reading of record. In one line: pi's
 * extension loader keys an extension's tools by tool.name and the last registration wins, so the census reads the served tool
 * where the boot harness keys it the same way (K1), and reads its replies by calling it.
 *
 * THE PINNED READER SET (this file, test/workbench-furnace-observe-served-census.test.ts; each case title opens with its id and
 * the ROWS it holds; 15 cases, registered in this order):
 * - J0 [registered]: target recordRegistrations on a stub registerTool; observed: every value reaches the stub unchanged and in
 *   order, each return value comes back, and the names read are exactly J0_NAMES, a property read of each value (a nameless
 *   object, a primitive and null read undefined, an anonymous function reads "", and a named function, an array's own name
 *   and an inherited name read theirs); a wrapper installed over the recorder that calls it reaches the stub through it,
 *   and the recorder reads the name the wrapper hands on.
 * - J1 [registered]: target judgeRegistrations over the nine J1 fixtures; observed: each fixture's findings, exactly.
 * - J2 [grant, identity, data, error]: target judgeReply over the seventeen J2 fixtures; observed: each fixture's findings,
 *   exactly.
 * - K1 [registered, grant, identity, data, error]: target a fresh harness pi and pi's loader source; observed: of two tools
 *   registered under one name the harness serves the second, a tool of another name is kept apart, and loader.js holds one
 *   extension.tools.set site, `extension.tools.set(tool.name, {` with `definition: tool,`, inside its registerTool method.
 * - I1 [data, error]: target the census's instrument; observed: while installed, the fake is the first furnace on PATH and,
 *   after restore, it is not; a command no answer names exits 2 with nothing on stdout; Date reads FIXED_NOW inside
 *   atFixedDate and the real clock after it; the census's own observer reads the complete Run with
 *   completeness "complete" and the partial Run with "partial", each stamped FIXED_NOW, each with source.producerVersion
 *   holding INVISIBLE, which JSON.stringify of the reading keeps and sanitizeWorkbenchJsonText of it does not; and it rejects
 *   the failing Run with an Error whose message is FAILING_MESSAGE, a text sanitizeWorkbenchText leaves unchanged.
 * - C0 [registered]: target bootServed([]) and bootServed(["furnace:inspect"]); observed: judgeRegistrations(received,
 *   "furnace_observe") is [] for each, and each serves an execute under that name.
 * - C1 [grant]: target the served execute of bootServed([]) called with { runId: "frn-run-census-grant" }; observed:
 *   judgeReply(result, REFUSALS.grant) is [].
 * - C2 [identity]: target the served execute of bootServed(["furnace:inspect"]) called with { runId: "census-not-a-run" };
 *   observed: judgeReply(result, REFUSALS.identity) is [].
 * - C3 [data]: target the same boot's served execute called with { runId: "frn-run-census-complete" } while the fake plays the
 *   complete Run, under atFixedDate; observed: judgeReply(result, sanitizeWorkbenchJsonText(R)) is [], where R is the census
 *   observer's reading of the same Run under the same fixed Date, and R's completeness is "complete".
 * - C4 [data]: the same for { runId: "frn-run-census-partial" } and the partial Run; R's completeness is "partial".
 * - C5 [error]: the same boot's served execute called with { runId: "frn-run-census-failing" } while the fake plays the failing
 *   Run; observed: judgeReply(result, sanitizeWorkbenchText(M)) is [], where M is the message of the Error the census
 *   observer rejects the same Run with.
 * - A0 []: target sourceAnchors over the fourteen A0 fixtures (planted texts); observed: each fixture's literal count and reply
 *   sites, exactly (an identifier, a string-literal and an escaped key read, and so does an escaped value; a computed key, a
 *   template-literal, a wrapped and another name's value do not; the first literal's first execute is read, nested calls
 *   included, in source order).
 * - A1 []: target src/index.ts read by sourceAnchors; observed: one literal names furnace_observe, one registration row stands
 *   per such literal, and its execute's textResult sites are exactly the reply rows' sites in ROWS order.
 * - F1 []: target the tables; observed: the frozen shape (standing rule 16) below.
 * - J3 []: target ROWS and CASES; observed: each row's pins are exactly the cases naming it, and every case is registered once.
 *
 * CLAIMS (each claims exactly the pinned set it names and no wider; its falsifiers are the cases named). "A result judgeReply
 * reads as textResult(X)" is a result judgeReply finds nothing in for the text X: own enumerable keys content and details,
 * details undefined, content one item whose own enumerable keys are type and text, type "text" and text === X.
 * - registered: the pinned boot, with the grant and without it, hands the harness's registerTool exactly one tool named
 *   furnace_observe (the name the recorder reads once, when the tool is handed, === "furnace_observe"), so the harness serves
 *   that tool under the name (C0; J0, J1, K1).
 * - grant: without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads
 *   as textResult(REFUSALS.grant) (C1; J2, K1).
 * - identity: with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity) (C2; J2,
 *   K1).
 * - data: for the complete and the partial pinned Run it replies with a result judgeReply reads as
 *   textResult(sanitizeWorkbenchJsonText(R)), R being the census observer's reading of that Run; R carries INVISIBLE, which
 *   JSON.stringify(R) keeps and that sanitizer removes (I1), so a reply of the reading's plain JSON text differs (C3, C4; J2,
 *   K1, I1).
 * - error: for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M)), M
 *   being the message of the census observer's rejection, FAILING_MESSAGE (C5; J2, K1, I1).
 *
 * NOT CLAIMED (scope sentences; no residual semantics; no follow-up bead):
 * - What judgeReply does not read is NOT CLAIMED by this census: a reply's non-enumerable or symbol-keyed properties and the
 *   members its prototypes carry.
 * - A tool whose name reads differently on different reads (a name getter) is NOT CLAIMED by this census: the recorder reads
 *   each name once.
 * - A call other than C1-C5's (other params, another tool-call id, a signal or an update callback, another grant set,
 *   another Run, an Attempt page that holds Attempts and their log reads) is NOT CLAIMED by this census.
 * - A boot other than the pinned boot (other settings, pi's own loader and runtime, a registration made after session_start)
 *   is NOT CLAIMED by this census.
 * - What the observer reads from a Run and what the shared sanitizers do are NOT CLAIMED by this census: the expected replies
 *   are computed with the FurnaceObserver and the sanitizers src/index.ts imports, so a change to
 *   src/workbench/furnace-observer.ts or src/workbench/redaction.ts moves both sides alike (wb-b04.2's census reads them).
 * - Whether the served execute is the function the furnace_observe literal holds, and what it hands the client and the
 *   observer it builds, are NOT CLAIMED by this census: only its replies to the pinned calls are.
 * - Whether the error reply is run through sanitizeWorkbenchText is NOT CLAIMED by this census: FAILING_MESSAGE is a text that
 *   sanitizer leaves unchanged, so C5 reads the reply's text only.
 * - A served execute that tells this census's calls from others is NOT CLAIMED by this census.
 * - Tools other than furnace_observe are NOT CLAIMED by this census: their names are read only to count furnace_observe.
 *
 * RESIDUALS: none named at this cut. The claims are bounded by the pinned boots and calls above, and no escape family within
 * them is known.
 *
 * MEMBERS (the bead's members of record; each src plant is applied to src/index.ts in the cutting seat's worktree and the
 * census run on it, src restored by sha256 after; the counts are the seat's receipts in the delivery note):
 * - refusal #3 (O:1582) U1, which execute pi serves: GP23-REG-TEMPLATE-NAME, GP23-REG-CONST-NAME, GP23-REG-CONCAT-NAME (a
 *   second registration named by a template literal, a constant or a concatenation) red C0, C1, C2, C3, C4 and C5;
 *   GP23-EXEC-SPREAD-OVERRIDE-2 (a spread after execute) and GP23-REGISTER-PATCH (a wrapped registerTool) red C1-C5;
 *   GP23-REGISTER-PATCH-PASSTHROUGH and GP23-DEFINE-SHADOW-PASSTHROUGH (the real body run, "partial" rewritten to "complete")
 *   red C4. U2, what the replies say: GP23-REFUSAL-LITERAL-FABRICATED reds C1 and A1, GP23-IDENTITY-REFUSAL-FABRICATED reds C2
 *   and A1, GP23-ERROR-TEXT-FABRICATED reds C5.
 * - refusal #4 (O:1650) U1-LOW: GP8-REG-ESCAPED-NAME-KEY (a second registration whose name key is spelled with a unicode
 *   escape) reds C0, C1-C5 and A1 (A1's anchor reads the key as TypeScript cooks it, A0). U1-LOW's reader mutants
 *   GP8-M-REG-COOKED-NAME-KEY, GP8-M-FIND-COOKED-NAME-KEY and GP8-M-FIND-COOKED-EXEC-KEY, and U2-LOW's
 *   GP8-M-FIND-NAME-CASEFOLD, GP8-M-REG-NAME-CASEFOLD, GP8-M-FIND-SATISFIES-VALUE and GP8-M-REG-SATISFIES-VALUE, are one-edit
 *   mutants of wb-40zp cut #4's source-text name readers, which this census does not carry: it reads the name pi's loader keys
 *   by, at run time. Their analogs here are killed: a registration count that folds case, trims or matches a substring by J1,
 *   and an anchor that reads a key by its source text, folds the name's case or reads a template-literal value by A0. Their
 *   paired plants: GP8-REG-SATISFIES-NAME reds C0 and C1-C5, and GP8-REG-CASE-NAME, a second tool named Furnace_Observe, reads
 *   clean, as it should: pi serves that tool under another name.
 *
 * FROZEN SHAPE (standing rule 16): F1 pins ROWS as `${id}:${pins.length}` and its clauses, the case ids, SCENARIO_IDS,
 * J0_NAMES and the ids of the J1, J2 and A0 fixtures as literals. A1 holds the rows to src/index.ts outside this file: the one
 * furnace_observe literal stands for the registration row and its four textResult sites for the four reply rows, in order.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { makePi } from "./helpers/boot-extension.js";
import {
  atFixedDate,
  bootServed,
  type FakeFurnace,
  FIXED_NOW,
  firstOnPath,
  INVISIBLE,
  installFakeFurnace,
  judgeRegistrations,
  judgeReply,
  ownObserver,
  REFUSALS,
  type ReplySite,
  recordRegistrations,
  SCENARIO_IDS,
  SERVED_NAME,
  type ServedBoot,
  scenario,
  sourceAnchors,
} from "./helpers/furnace-observe-served-reader.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOADER = "node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js";
/** The message the census observer rejects the failing Run with. */
const FAILING_MESSAGE = "Furnace status unavailable (run_not_found)";
/** The per-case bound of a case that boots the extension. */
const BOOT_TIMEOUT_MS = 60_000;

interface Row {
  readonly id: string;
  readonly clause: string;
  /** What A1 holds the row to in src/index.ts: the furnace_observe literal, or one textResult site of its execute. */
  readonly anchor: "registration" | "reply";
  readonly site?: ReplySite;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "registered",
    clause: "the pinned boot, with the grant and without it, hands the harness's registerTool exactly one tool named furnace_observe",
    anchor: "registration",
    pins: ["J0", "J1", "K1", "C0"],
  },
  {
    id: "grant",
    clause: "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.grant },
    pins: ["J2", "K1", "C1"],
  },
  {
    id: "identity",
    clause: "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.identity },
    pins: ["J2", "K1", "C2"],
  },
  {
    id: "data",
    clause: "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchJsonText" },
    pins: ["J2", "K1", "I1", "C3", "C4"],
  },
  {
    id: "error",
    clause: "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchText" },
    pins: ["J2", "K1", "I1", "C5"],
  },
];

interface Case {
  /** The ROWS this case holds (J3). */
  readonly rows: readonly string[];
  readonly title: string;
}
const CASES = {
  J0: { rows: ["registered"], title: "the recorder hands every value on unchanged and in order, returns what registerTool returns, and reads each name once, as a property read does" },
  J1: { rows: ["registered"], title: "the registration judge counts only names === furnace_observe: case variants, longer, shorter, padded and non-string names are other names" },
  J2: { rows: ["grant", "identity", "data", "error"], title: "the reply judge finds nothing only in a result shaped as textResult(text) is, and names each difference" },
  K1: { rows: ["registered", "grant", "identity", "data", "error"], title: "the tool served under a name is the last one registered under it, in the harness as in pi's loader" },
  I1: { rows: ["data", "error"], title: "the instrument: the fake furnace is first on PATH, Date is fixed, and the census observer reads the three pinned Runs" },
  C0: { rows: ["registered"], title: "the pinned boot, with and without the grant, hands registerTool exactly one furnace_observe, and the harness serves it" },
  C1: { rows: ["grant"], title: "without the grant the served furnace_observe's reply reads as textResult of the grant refusal" },
  C2: { rows: ["identity"], title: "with the grant and the Run id census-not-a-run its reply reads as textResult of the identity refusal" },
  C3: { rows: ["data"], title: "for the complete Run its reply reads as textResult of the sanitized text of the census observer's reading" },
  C4: { rows: ["data"], title: "for the partial Run its reply reads as textResult of the sanitized text of the census observer's partial reading" },
  C5: { rows: ["error"], title: "for the failing Run its reply reads as textResult of the sanitized text of the census observer's error message" },
  A0: { rows: [], title: "the anchor reader reads each key, value and reply-site form its header names, and no other" },
  A1: { rows: [], title: "outside anchors: src/index.ts's furnace_observe literal and its execute's four textResult sites, one per reply row" },
  F1: { rows: [], title: "FROZEN SHAPE (standing rule 16): the rows, the cases, the scenarios and the judges' fixtures" },
  J3: { rows: [], title: "the judged set: each row's pins are exactly the cases naming it, and every case is registered once" },
} as const satisfies Readonly<Record<string, Case>>;
type CaseId = keyof typeof CASES;
const CASE_IDS = Object.keys(CASES) as CaseId[];
const registered: CaseId[] = [];
/** Registers one case under its id and the rows it holds. */
function pinned(id: CaseId, body: () => void | Promise<void>, timeout?: number): void {
  registered.push(id);
  const rows: readonly string[] = CASES[id].rows;
  it(`${id} [${rows.join(", ")}]: ${CASES[id].title}`, body, timeout);
}

/** The values J0 hands the recorder, and the names it reads from them. */
const J0_VALUES: readonly unknown[] = [
  { name: "Agent" },
  { name: "Furnace_Observe" },
  { name: SERVED_NAME },
  { name: SERVED_NAME },
  SERVED_NAME,
  { label: "nameless" },
  Object.assign(() => undefined, { execute: () => undefined }),
  function zzNamedTool() {},
  Object.assign([], { name: "zz-array-tool" }),
  Object.create({ name: "zz-inherited-tool" }),
  null,
];
const J0_NAMES: readonly unknown[] = [
  "Agent",
  "Furnace_Observe",
  SERVED_NAME,
  SERVED_NAME,
  undefined,
  undefined,
  "",
  "zzNamedTool",
  "zz-array-tool",
  "zz-inherited-tool",
  undefined,
];

const none = [`${SERVED_NAME} received 0 times`];
/** J1: received names and the registration judge's findings. */
const J1_FIXTURES: readonly { readonly id: string; readonly received: readonly unknown[]; readonly findings: readonly string[] }[] = [
  { id: "none", received: [], findings: none },
  { id: "one", received: [SERVED_NAME], findings: [] },
  { id: "among-others", received: ["Agent", SERVED_NAME, "workflow_detached"], findings: [] },
  { id: "twice", received: [SERVED_NAME, "Agent", SERVED_NAME], findings: [`${SERVED_NAME} received 2 times`] },
  { id: "thrice", received: [SERVED_NAME, SERVED_NAME, SERVED_NAME], findings: [`${SERVED_NAME} received 3 times`] },
  { id: "case-variants", received: ["Furnace_Observe", "FURNACE_OBSERVE", SERVED_NAME], findings: [] },
  { id: "longer-shorter", received: ["furnace_observer", "xfurnace_observe", "furnace_observ", "furnace"], findings: none },
  { id: "padded", received: [` ${SERVED_NAME}`, `${SERVED_NAME} `, `${SERVED_NAME}\n`], findings: none },
  { id: "not-strings", received: [undefined, null, 0, [SERVED_NAME], new String(SERVED_NAME)], findings: none },
];

const T = "the expected text";
const item = (fields: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> => ({ type: "text", text: T, ...fields });
/** J2: results and the reply judge's findings for the text T. */
const J2_FIXTURES: readonly { readonly id: string; readonly result: unknown; readonly findings: readonly string[] }[] = [
  { id: "exact", result: { content: [item({})], details: undefined }, findings: [] },
  { id: "text-differs", result: { content: [item({ text: `${T}!` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T}!`)}`] },
  { id: "text-case", result: { content: [item({ text: T.toUpperCase() })], details: undefined }, findings: [`item text: ${JSON.stringify(T.toUpperCase())}`] },
  { id: "text-padded", result: { content: [item({ text: `${T} ` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T} `)}`] },
  { id: "text-prefix", result: { content: [item({ text: T.slice(0, 5) })], details: undefined }, findings: [`item text: ${JSON.stringify(T.slice(0, 5))}`] },
  { id: "two-items", result: { content: [item({}), item({})], details: undefined }, findings: ["content: 2 items"] },
  { id: "no-items", result: { content: [], details: undefined }, findings: ["content: 0 items"] },
  { id: "content-not-array", result: { content: T, details: undefined }, findings: ["content: not an array"] },
  { id: "item-not-object", result: { content: [T], details: undefined }, findings: ["item: not an object"] },
  { id: "details-defined", result: { content: [item({})], details: {} }, findings: ["details: defined"] },
  { id: "details-null", result: { content: [item({})], details: null }, findings: ["details: defined"] },
  { id: "details-absent", result: { content: [item({})] }, findings: ["result keys: content"] },
  { id: "extra-result-key", result: { content: [item({})], details: undefined, isError: true }, findings: ["result keys: content,details,isError"] },
  { id: "item-extra-key", result: { content: [item({ extra: 1 })], details: undefined }, findings: ["item keys: extra,text,type"] },
  { id: "item-type", result: { content: [item({ type: "image" })], details: undefined }, findings: ['item type: "image"'] },
  { id: "not-an-object", result: undefined, findings: ["result: not an object"] },
  { id: "an-array", result: [item({})], findings: ["result: not an object"] },
];

const lit = (text: string): ReplySite => ({ kind: "literal", text });
const call = (text: string): ReplySite => ({ kind: "call", text });
const other = (text: string): ReplySite => ({ kind: "other", text });
/** A0: planted src texts and the anchor reader's readings of them. */
const A0_FIXTURES: readonly { readonly id: string; readonly text: string; readonly literals: number; readonly sites: readonly ReplySite[] }[] = [
  {
    id: "plain",
    text: 'x({ name: "furnace_observe", execute: async () => { if (a) return textResult("one"); return textResult(sanitize(reading)); } });',
    literals: 1,
    sites: [lit("one"), call("sanitize")],
  },
  {
    id: "first-of-two",
    text: 'x({ name: "furnace_observe", execute: async () => textResult("first") }); x({ name: "furnace_observe", execute: async () => textResult("second") });',
    literals: 2,
    sites: [lit("first")],
  },
  { id: "quoted-keys", text: 'x({ "name": "furnace_observe", "execute": async () => textResult("quoted") });', literals: 1, sites: [lit("quoted")] },
  { id: "escaped-keys", text: 'x({ n\\u0061me: "furnace_observe", ex\\u0065cute: async () => textResult("escaped") });', literals: 1, sites: [lit("escaped")] },
  { id: "escaped-value", text: 'x({ name: "furnace\\u005fobserve", execute: async () => textResult("cooked") });', literals: 1, sites: [lit("cooked")] },
  { id: "computed-key", text: 'x({ ["name"]: "furnace_observe", execute: async () => textResult("c") });', literals: 0, sites: [] },
  { id: "template-value", text: 'x({ name: `furnace_observe`, execute: async () => textResult("t") });', literals: 0, sites: [] },
  {
    id: "wrapped-value",
    text: 'x({ name: "furnace_observe" satisfies string, execute: async () => textResult("w") }); x({ name: ("furnace_observe"), execute: async () => textResult("p") });',
    literals: 0,
    sites: [],
  },
  {
    id: "other-names",
    text: 'x({ name: "Furnace_Observe", execute: async () => textResult("o") }); x({ name: "furnace_observer", execute: async () => textResult("o") });',
    literals: 0,
    sites: [],
  },
  { id: "first-execute", text: 'x({ name: "furnace_observe", execute: async () => textResult("one"), execute: async () => textResult("two") });', literals: 1, sites: [lit("one")] },
  { id: "no-execute", text: 'x({ name: "furnace_observe", run: async () => textResult("r") });', literals: 1, sites: [] },
  {
    id: "nested-order",
    text: 'x({ name: "furnace_observe", execute: async () => { const f = () => textResult("inner"); return textResult("outer"); } });',
    literals: 1,
    sites: [lit("inner"), lit("outer")],
  },
  {
    id: "other-sites",
    text: 'x({ name: "furnace_observe", execute: async () => { textResult(msg); textResult(`t`); textResult(); textResult(a.b()); } });',
    literals: 1,
    sites: [other("msg"), other("`t`"), other(""), other("a.b()")],
  },
  { id: "not-textresult", text: 'x({ name: "furnace_observe", execute: async () => { reply("x"); a.textResult("y"); } });', literals: 1, sites: [] },
];

/** Boots the extension with the fake furnace first on PATH, runs read, and restores both. */
async function withServed(grants: readonly string[], read: (boot: ServedBoot, fake: FakeFurnace) => Promise<void>): Promise<void> {
  const fake = installFakeFurnace();
  try {
    if (firstOnPath("furnace") !== fake.binary) throw new Error("the census fake furnace is not first on PATH, so no served call runs");
    const boot = await bootServed(grants);
    try {
      await read(boot, fake);
    } finally {
      boot.restore();
    }
  } finally {
    fake.restore();
  }
}
/** The Error a census observer rejects with, or what it resolved to. */
async function failureOf(read: Promise<unknown>): Promise<unknown> {
  return read.then(
    value => value,
    (error: unknown) => error,
  );
}

describe("wb-g20x: the furnace_observe served census", () => {
  pinned("J0", () => {
    const handed: unknown[] = [];
    const stub = { registerTool: (tool: unknown): unknown => handed.push(tool) };
    const received = recordRegistrations(stub);
    const returned = J0_VALUES.map(value => stub.registerTool(value));
    expect(handed, "every value reaches registerTool unchanged and in order").toStrictEqual([...J0_VALUES]);
    expect(handed.every((value, index) => value === J0_VALUES[index]), "as the same values").toBe(true);
    expect(returned, "and what registerTool returns comes back").toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(received, "the names read, as a property read reads them").toStrictEqual([...J0_NAMES]);
    // A registerTool installed over the recorder that calls it (a wrapper bound to the pi, GP23-REGISTER-PATCH's shape).
    const bound = stub.registerTool.bind(stub);
    stub.registerTool = (tool: unknown): unknown => bound({ name: "zz-wrapped", wrapped: tool });
    expect(stub.registerTool({ name: SERVED_NAME }), "the wrapper reaches registerTool through the recorder").toBe(12);
    expect([received.at(-1), handed.length], "which reads the name the wrapper hands on").toStrictEqual(["zz-wrapped", 12]);
  });

  pinned("J1", () => {
    for (const fixture of J1_FIXTURES) expect(judgeRegistrations(fixture.received, SERVED_NAME), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("J2", () => {
    for (const fixture of J2_FIXTURES) expect(judgeReply(fixture.result, T), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("K1", () => {
    const harness = makePi();
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "first" });
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "second" });
    harness.pi.registerTool({ name: "zz-other", parameters: {}, marker: "other" });
    const marker = (name: string): unknown => {
      const tool: unknown = harness.tools.get(name);
      return typeof tool === "object" && tool !== null && "marker" in tool ? tool.marker : undefined;
    };
    expect([marker("zz-served"), marker("zz-other"), harness.tools.size], "the harness serves the last tool registered under a name").toStrictEqual(["second", "other", 2]);
    const loader = readFileSync(join(REPO, LOADER), "utf8");
    const method = loader.slice(loader.indexOf("registerTool(tool) {"), loader.indexOf("registerCommand(name, options) {"));
    expect(loader.split("extension.tools.set(").length - 1, "pi's loader sets extension.tools at one site").toBe(1);
    expect([method.includes("extension.tools.set(tool.name, {"), method.includes("definition: tool,")], "inside registerTool, keyed by tool.name with the tool as definition").toStrictEqual([true, true]);
  });

  pinned("I1", async () => {
    const fake = installFakeFurnace();
    const workspace = "/census-served/workspace";
    try {
      expect(firstOnPath("furnace"), "the fake is the first furnace on PATH").toBe(fake.binary);
      expect(await atFixedDate(async () => new Date().toISOString()), "Date reads the fixed instant inside atFixedDate").toBe(FIXED_NOW);
      expect(new Date().toISOString() === FIXED_NOW, "and the real clock after it").toBe(false);
      for (const id of ["complete", "partial"] as const) {
        const runId = `frn-run-census-${id}`;
        fake.play(scenario(id, runId, workspace));
        const reading = await atFixedDate(() => ownObserver(fake, workspace, runId).snapshot());
        expect([reading.completeness, reading.capturedAt, reading.observedAt, reading.lastConfirmedAt], `${id}: the census observer's reading`).toStrictEqual([id, FIXED_NOW, FIXED_NOW, FIXED_NOW]);
        expect(reading.source.producerVersion, `${id}: its producer version holds INVISIBLE`).toBe(`0.1.0${INVISIBLE}census`);
        expect([JSON.stringify(reading).includes(INVISIBLE), sanitizeWorkbenchJsonText(reading).includes(INVISIBLE)], `${id}: the sanitizer removes it`).toStrictEqual([true, false]);
      }
      fake.play(scenario("failing", "frn-run-census-failing", workspace));
      const failure = await failureOf(atFixedDate(() => ownObserver(fake, workspace, "frn-run-census-failing").snapshot()));
      expect(failure, "the failing Run is rejected with an Error").toBeInstanceOf(Error);
      expect(failure instanceof Error ? failure.message : failure, "whose message is FAILING_MESSAGE").toBe(FAILING_MESSAGE);
      expect(sanitizeWorkbenchText(FAILING_MESSAGE), "a text the error reply's sanitizer leaves unchanged").toBe(FAILING_MESSAGE);
      fake.play({});
      const unanswered = spawnSync(fake.binary, ["run", "status", "frn-run-census-unanswered", "--json"], { encoding: "utf8" });
      expect([unanswered.status, unanswered.stdout], "a command no answer names exits 2 with nothing on stdout").toStrictEqual([2, ""]);
    } finally {
      fake.restore();
    }
    expect(firstOnPath("furnace") === fake.binary, "after restore the fake is off PATH").toBe(false);
  });

  pinned(
    "C0",
    async () => {
      for (const grants of [[], ["furnace:inspect"]]) {
        await withServed(grants, async boot => {
          expect(judgeRegistrations(boot.received, SERVED_NAME), `grants ${JSON.stringify(grants)}: one furnace_observe registration`).toStrictEqual([]);
          expect(boot.serves(SERVED_NAME), `grants ${JSON.stringify(grants)}: the harness serves its execute`).toBe(true);
        });
      }
    },
    BOOT_TIMEOUT_MS,
  );

  pinned(
    "C1",
    async () => {
      await withServed([], async boot => {
        expect(judgeReply(await boot.call({ runId: "frn-run-census-grant" }), REFUSALS.grant)).toStrictEqual([]);
      });
    },
    BOOT_TIMEOUT_MS,
  );

  pinned(
    "C2",
    async () => {
      await withServed(["furnace:inspect"], async boot => {
        expect(judgeReply(await boot.call({ runId: "census-not-a-run" }), REFUSALS.identity)).toStrictEqual([]);
      });
    },
    BOOT_TIMEOUT_MS,
  );

  for (const [id, run] of [
    ["C3", "complete"],
    ["C4", "partial"],
  ] as const) {
    pinned(
      id,
      async () => {
        await withServed(["furnace:inspect"], async (boot, fake) => {
          const runId = `frn-run-census-${run}`;
          fake.play(scenario(run, runId, boot.workspace));
          const [result, reading] = await atFixedDate(async () => [await boot.call({ runId }), await ownObserver(fake, boot.workspace, runId).snapshot()] as const);
          expect(reading.completeness, "the census observer's reading").toBe(run);
          expect(judgeReply(result, sanitizeWorkbenchJsonText(reading))).toStrictEqual([]);
        });
      },
      BOOT_TIMEOUT_MS,
    );
  }

  pinned(
    "C5",
    async () => {
      await withServed(["furnace:inspect"], async (boot, fake) => {
        const runId = "frn-run-census-failing";
        fake.play(scenario("failing", runId, boot.workspace));
        const [result, failure] = await atFixedDate(async () => [await boot.call({ runId }), await failureOf(ownObserver(fake, boot.workspace, runId).snapshot())] as const);
        expect(failure, "the census observer rejects the Run with an Error").toBeInstanceOf(Error);
        expect(judgeReply(result, sanitizeWorkbenchText(failure instanceof Error ? failure.message : String(failure)))).toStrictEqual([]);
      });
    },
    BOOT_TIMEOUT_MS,
  );

  pinned("A0", () => {
    for (const fixture of A0_FIXTURES) {
      const read = sourceAnchors(fixture.text);
      expect([read.literals, read.sites], fixture.id).toStrictEqual([fixture.literals, [...fixture.sites]]);
    }
  });

  pinned("A1", () => {
    const anchors = sourceAnchors(readFileSync(join(REPO, "src/index.ts"), "utf8"));
    expect(anchors.literals, "one registration row per furnace_observe literal").toBe(ROWS.filter(row => row.anchor === "registration").length);
    expect(anchors.sites, "its execute's textResult sites are the reply rows' sites, in order").toStrictEqual(ROWS.flatMap(row => (row.anchor === "reply" ? [row.site] : [])));
  });

  pinned("F1", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toStrictEqual(["registered:4", "grant:3", "identity:3", "data:5", "error:4"]);
    expect(ROWS.map(row => row.clause)).toStrictEqual([
      "the pinned boot, with the grant and without it, hands the harness's registerTool exactly one tool named furnace_observe",
      "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
      "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
      "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
      "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    ]);
    expect(CASE_IDS).toStrictEqual(["J0", "J1", "J2", "K1", "I1", "C0", "C1", "C2", "C3", "C4", "C5", "A0", "A1", "F1", "J3"]);
    expect([...SCENARIO_IDS]).toStrictEqual(["complete", "partial", "failing"]);
    expect([...J0_NAMES]).toStrictEqual(["Agent", "Furnace_Observe", "furnace_observe", "furnace_observe", undefined, undefined, "", "zzNamedTool", "zz-array-tool", "zz-inherited-tool", undefined]);
    expect(J1_FIXTURES.map(fixture => fixture.id)).toStrictEqual(["none", "one", "among-others", "twice", "thrice", "case-variants", "longer-shorter", "padded", "not-strings"]);
    expect(J2_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "exact",
      "text-differs",
      "text-case",
      "text-padded",
      "text-prefix",
      "two-items",
      "no-items",
      "content-not-array",
      "item-not-object",
      "details-defined",
      "details-null",
      "details-absent",
      "extra-result-key",
      "item-extra-key",
      "item-type",
      "not-an-object",
      "an-array",
    ]);
    expect(A0_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "plain",
      "first-of-two",
      "quoted-keys",
      "escaped-keys",
      "escaped-value",
      "computed-key",
      "template-value",
      "wrapped-value",
      "other-names",
      "first-execute",
      "no-execute",
      "nested-order",
      "other-sites",
      "not-textresult",
    ]);
  });

  pinned("J3", () => {
    for (const row of ROWS) {
      expect(row.pins, `${row.id}: its pins are the cases naming it`).toStrictEqual(CASE_IDS.filter(id => (CASES[id].rows as readonly string[]).includes(row.id)));
    }
    const named = CASE_IDS.flatMap(id => [...CASES[id].rows]);
    expect(named.filter(id => !ROWS.some(row => row.id === id)), "every row a case names exists").toStrictEqual([]);
    expect([...registered].sort(), "every case is registered").toStrictEqual([...CASE_IDS].sort());
    expect(new Set(registered).size, "and once").toBe(registered.length);
  });
});
