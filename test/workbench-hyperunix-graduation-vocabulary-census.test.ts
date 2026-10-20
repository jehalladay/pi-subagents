/**
 * wb-tz2.10 (HX-ORIGINAL-GOALS-CLOSURE-R10), STANDING LEG ONLY: the never-invent graduation-vocabulary census over the
 * HyperUnix surfaces of this workbench.
 *
 * Acceptance row pinned (bead wb-tz2.10): "Standing: a census asserts no graduation vocabulary appears in hyperunix descriptor
 * descriptions or workbench HX display strings." Statement: "Pi shall never invent or imply a graduation tier meanwhile." The
 * bead's rationale reads that negative half as satisfied today (providers/hyperunix.ts:15,47@9df9a03); this file makes a
 * regression loud. The on-landing leg (echo the published graduation state, naming its source) waits for HX to publish its
 * graduated capability inventory: at HyperUnix-CLI origin/main 22aef86 requirements.jsonl:25 still reads HXGC-LX-001 status
 * DESIGN, graduated false, so that leg is out of scope here and the bead stays open for it.
 *
 * VOCABULARY OF RECORD (VOCABULARY, four rows, each naming its HX source at the bead's pins):
 *   V1 the six ordered statuses of the ADR-0101 decision table: the promotion path HXGC 11-qa-and-benchmarks.md:62 names
 *      ("DESIGN -> SOURCE_IMPLEMENTED -> LOCAL_VERIFIED -> CLI_INTEGRATED -> PERF_VERIFIED (when relevant) -> GRADUATED");
 *   V2 the superseded ADR-0101 tokens ("The superseded vocabulary maps level-for-level" onto V1);
 *   V3 the rest of the graduation word family (HXGC-LX-001 "**graduated** installed surface", 03-requirements.md:43;
 *      10-providers-sdks-and-lx.md:63 "## Graduation"); "graduated" itself is V1's GRADUATED;
 *   V4 the six HXFS agent-routing statuses the bead's 2026-10-17b note adds (08-epistemic-and-performance-contracts.md:57-62
 *      @d60f277a26; :64 "These are agent-routing statuses, not an alternative set of runtime/release state tags.").
 * MATCH RULE (termPattern): case-insensitive; a separator inside a term ("-", "_" or a space) matches any of the three; a hit
 * never touches a letter or digit on either side, so "invalidated" carries no "validated" and the HX kind "view-invalidated"
 * stays an HX kind.
 *
 * JUDGED SURFACES (SURFACES): S1 and S2 the "<id>: <description>" line of every hyperunix.* descriptor registered through the
 * native provider registration (native-modules.ts registerNativeProviders) and through the injected-reader registration
 * (registerHyperUnixFind); S3 every string leaf of the reader adapter's topology (title, status text, tone, coverage, evidence
 * references, diagnostics, the grouping edge) over READINGS, one row of which (R19) travels the registered provider end to
 * end; S4 the reader adapter's refusal messages over REFUSALS (one case per refusal branch, the mutation branch under both
 * licences: F15 unlicensed, F16 licensed); S5 the provider refusals reachable without an hx binary (PROVIDER_REFUSALS); S6 every
 * string leaf of the native-evidence projection of each reading and of the native reference it yields: src/workflow/runtime.ts
 * builds that projection at :1621 and spreads it into the workflow node at :1624, and src/ui/workflow-card.ts:435 shows its domain
 * status as the outcome; S7 every string and template literal of src/workbench/providers/hyperunix.ts and
 * src/workbench/hyperunix-observer.ts, the backstop for branches no table drives.
 * INPUTS carry no vocabulary term (asserted), so a hit in a surface is Pi's own wording, never an echo.
 * LIVENESS: every surface yields at least its floor and its anchor. S1 and S2 anchor on their own registration's descriptor
 * ("hyperunix.find: Native ", "hyperunix.find: Read ") and share no line, and the registry S1 reads also registers the forge,
 * furnace and reactivefiber native providers, so a swapped registration is refused. S7 holds every S1/S2 description and the
 * observer's template head "HyperUnix topology refused: ", and its collector reads one literal of every node kind (string,
 * no-substitution template, template head, middle and tail) from a control text and nothing from a comment. S3 and S6
 * re-derive each reading's strings from the subject and S6 carries each reading's own kind as its domain status, so a collapsed
 * or swapped collector is refused. Every table carries a length pin and an ordered roster pin, every loop counts the entries it
 * ran against it, and the per-term matcher rows are counted in the collected suite. Measured on this branch merged with trunk
 * c40afc6: S1 1, S2 1,
 * S3 413, S4 19, S5 5, S6 46, S7 212 strings (providers/hyperunix.ts 45 string literals; hyperunix-observer.ts 131 string
 * literals, 15 template heads, 6 middles, 15 tails), 626 input strings; the floors sit below these, so an emptied collector reds
 * and an additive change does not.
 * FROZEN SHAPE (standing rule 16), three rows. One pins VOCABULARY (ids, sources, terms), SURFACES (ids, labels, floors,
 * anchors), MODULES, every table's case names and categories, the near misses and the matcher controls. One pins each reading's
 * branch selector, read from its own input. One pins each judged case's payload identity: every reading's reader witness (the
 * reader calls it was served: only R19 is served, find then runtime) and, for every built reading, its input digest (the first
 * 12 hex of the sha256 of its JSON input and context; R19's value is the provider's own SDK-serialised output, so its reader
 * witness and branch selector pin it), every refusal's typed kind, licence and rows and its input digest, and every provider refusal's
 * reader witness (P1-P3 none, P4 find, P5 find then runtime), beside the S5 row's frozen outcome literal. So deleting or
 * shortening a term; dropping, reordering or swapping a reading or a refusal (any change to a built reading's or a refusal's
 * input, and R19 served other reader calls or a document with another branch selector); swapping a provider refusal's run for
 * one that ends in another outcome or is served other reader calls; swapping a surface collector for another registration or
 * subject, emptying or collapsing it, or dropping a literal kind from the S7 scan; and narrowing or reordering the per-term
 * matcher rows turn the census red.
 * RESIDUALS (named, not closed): producer or host text echoed verbatim (a kind, an operation or a root the input carries) is
 * echo, not invention, and stays outside the judged set; inflections outside V3 (conditionally, recommendation), joined
 * spellings with no separator between a term's parts (localVerified, SOURCEIMPLEMENTED: the gate's G6 probe; the owner may
 * widen the separator) and homoglyph or split spellings are not matched; docs/workbench prose and generic workflow-card
 * wording beyond the native-evidence projection are not judged here; nativeHyperUnixFind's after-launch cancellation literals
 * are judged statically only (S7); a provider refusal's run swapped within its own branch (the same outcome and the same reader
 * calls, e.g. P1 on another relative path) is equivalent for this census and stays green; R19's served SDK document is pinned
 * through its branch selector, its reader witness and the INPUTS row, not byte for byte; a collector narrowed only partly (above
 * its floor and keeping every anchor, e.g. an S7 scan that skips some string literals) is caught only where it drops an anchor.
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads the two module sources.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type CapabilityProvider, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type HyperUnixReader, nativeHyperUnixFind, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";

type Json = { [key: string]: JsonValue };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The two HyperUnix modules whose literals S7 reads. */
const MODULES = ["src/workbench/providers/hyperunix.ts", "src/workbench/hyperunix-observer.ts"] as const;
const HYPERUNIX_PREFIX = "hyperunix.";

interface VocabularyRow {
  readonly id: string;
  readonly source: string;
  readonly terms: readonly string[];
}
const VOCABULARY: readonly VocabularyRow[] = [
  {
    id: "V1",
    source: "HyperUnix-CLI ADR-0101 decision table @6ed14cab8d: the HXGC promotion path, 11-qa-and-benchmarks.md:62",
    terms: ["DESIGN", "SOURCE_IMPLEMENTED", "LOCAL_VERIFIED", "CLI_INTEGRATED", "PERF_VERIFIED", "GRADUATED"],
  },
  {
    id: "V2",
    source: "HyperUnix-CLI ADR-0101 superseded vocabulary @6ed14cab8d, mapped level-for-level onto V1",
    terms: ["PROGRAM_DESIGN", "IMPLEMENTED", "EXERCISED_HARNESS", "EXERCISED_PUBLIC", "VALIDATED", "RELEASE_ACCEPTED"],
  },
  {
    id: "V3",
    source: "the graduation word family: HXGC-LX-001 03-requirements.md:43 and 10-providers-sdks-and-lx.md:63 @6ed14cab8d",
    terms: ["graduate", "graduates", "graduating", "graduation"],
  },
  {
    id: "V4",
    source: "HXFS 08-epistemic-and-performance-contracts.md:57-62 @d60f277a26 agent-routing statuses (bead note 2026-10-17b)",
    terms: ["recommended", "recommended-bounded", "conditional", "native-fallback-preferred", "blocked", "experimental"],
  },
];
const TERMS: readonly string[] = VOCABULARY.flatMap(row => row.terms);
/** Letters only, joined by single separators: no term needs escaping inside a pattern. */
const TERM_SHAPE = /^[A-Za-z]+(?:[-_][A-Za-z]+)*$/;

function termPattern(term: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${term.split(/[-_]/).join("[-_ ]")}(?![\\p{L}\\p{N}])`, "iu");
}
const PATTERNS: ReadonlyArray<readonly [string, RegExp]> = TERMS.map(term => [term, termPattern(term)] as const);

/** The vocabulary terms a text carries, in VOCABULARY order. */
function termsIn(text: string): string[] {
  return PATTERNS.filter(([, pattern]) => pattern.test(text)).map(([term]) => term);
}
interface Hit {
  readonly surface: string;
  readonly text: string;
  readonly terms: readonly string[];
}
/** Every judged text that carries a term, with the surface and the terms named. */
function hitsIn(surface: string, texts: readonly string[]): Hit[] {
  return texts.flatMap(text => {
    const terms = termsIn(text);
    return terms.length > 0 ? [{ surface, text, terms }] : [];
  });
}
/** Every string value under a value (keys are field names, never judged). */
function stringLeaves(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const item of value) stringLeaves(item, into);
  else if (typeof value === "object" && value !== null) for (const item of Object.values(value)) stringLeaves(item, into);
  return into;
}

const FOLDS: ReadonlyArray<(part: string) => string> = [
  part => part.toLowerCase(),
  part => part.toUpperCase(),
  part => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`,
];
/** Spellings every term must be found in: three case folds times each separator, inside a text and at both of its edges. */
function plantedSpellings(term: string): string[] {
  const parts = term.split(/[-_]/);
  const separators = parts.length > 1 ? ["-", "_", " "] : [""];
  const spellings = [...new Set(FOLDS.flatMap(fold => separators.map(separator => parts.map(fold).join(separator))))];
  return spellings.flatMap(spelling => [`x ${spelling} y`, spelling, `${spelling}.`, `(${spelling})`]);
}
/** Near misses that must stay quiet: each embeds a term's letters without being that term. */
const NEAR_MISSES = [
  "invalidated",
  "view-invalidated",
  "unblocked",
  "designer",
  "redesigned",
  "preferred",
  "bounded",
  "verified",
  "integrated",
  "accepted",
  "graduat",
  "recommendation",
  "conditionally",
  "experimentally",
] as const;

// ---- surfaces ---------------------------------------------------------------------------------------------------------

const WS = "/workspace/hx-vocabulary-census";
const BINARY = "ab".repeat(32);
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-20T06:00:00Z",
  observedAt: "2026-10-20T06:00:01Z",
};
const NAMED_OPERATION: HyperUnixTopologyContext = {
  ...CONTEXT,
  invocationId: "wf_census_1",
  operationRef: { provider: "pi-workflow", type: "node-call", id: "wf_census_1:0" },
};
const INPUT: JsonValue = { kind: "hx.fs/regular-file", root: "src" };
const GRANTS = ["hyperunix:read"];

/** What the registered hyperunix.find provider returns, built field by field (the observer suite's measured() shape). */
function reading(source: Json = {}, top: Json = {}): Json {
  return {
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      execution_status: { kind: "incomplete" },
      coverage_summary: { licenses_absence: false },
      rows: [],
      rows_retained: true,
      operation: "find",
      ...source,
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY },
    ...top,
  };
}
const ofKind = (kind: string, licensed: boolean, source: Json = {}): Json =>
  reading({ execution_status: { kind }, coverage_summary: { licenses_absence: licensed }, ...source });
const batches = (ids: readonly string[]): Json => ({ coverage: ids.map(batch_id => ({ batch_id })) });

/** One complete SDK document in the hyperunix.result/1 representation (the observer suite's sdkDocument() shape). */
function sdkDocument(): Json {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [{ path: "src/index.ts" }],
    rows_retained: true,
    coverage: ["c1", "c2"].map(batch_id => ({
      mode: "opportunistic",
      cause: { cause: "other", detail: "No_change_exclusion" },
      scope: { path: [], scope: "fs-subtree" },
      target: { target: "relation-expansion" },
      provider: "hx.fs/builtin",
      stream: "hx-fs",
      batch_id,
      body: { mode: "opportunistic" },
    })),
    status: {
      exit_code: 0,
      signal: null,
      streams: [{ name: "hx-fs", frames: 12, ended: true, mode: "observation" }],
      terminal_reached: true,
      frames_total: 12,
    },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE", severity: "warning", message: "licenses no absence" }],
    view: null,
    cost: null,
    transport: {
      started_at: "2026-10-20T05:59:59.000Z",
      startup_latency_s: 0.01,
      process_duration_s: 0.2,
      stdout_bytes: 100,
      stderr_bytes: 0,
      stderr_bytes_retained: 0,
      frames: 12,
    },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: ["opportunistic"],
      completeness: "incomplete",
      licenses_absence: false,
      certificates_license_absence: false,
      incomplete_regions: [{ scope: `fs:${WS}/src`, target: "hx.fs/directory-entry" }],
      result_coverage: null,
      answer_count: 1,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
}

/** A registry that also hands back each provider it registered, so its own refusals can be read without the dispatch layer. */
class RecordingRegistry extends CapabilityRegistry {
  readonly recorded: CapabilityProvider[] = [];
  override register(provider: CapabilityProvider): void {
    super.register(provider);
    this.recorded.push(provider);
  }
}
function injectedReader(hooks: { find?: () => void; runtime?: () => void } = {}): HyperUnixReader {
  return {
    async find() {
      hooks.find?.();
      return resultFromJson(sdkDocument());
    },
    async runtime() {
      hooks.runtime?.();
      return { version: "0.1.0", binarySha256: BINARY };
    },
    async close() {},
  };
}
/** The reader, logging each find and runtime call it serves into `served`, in order: the R19 and P3-P5 branch witnesses. */
function recording(reader: HyperUnixReader, served: string[]): HyperUnixReader {
  return {
    find(options) {
      served.push("find");
      return reader.find(options);
    },
    runtime() {
      served.push("runtime");
      return reader.runtime();
    },
    close: () => reader.close(),
  };
}
function injectedProvider(reader: HyperUnixReader, served: string[] = []): CapabilityProvider {
  const registry = new RecordingRegistry();
  registerHyperUnixFind(registry, recording(reader, served), WS);
  const [provider] = registry.recorded;
  if (provider === undefined) throw new Error("registerHyperUnixFind registered no provider");
  return provider;
}
function abortedSignal(): AbortSignal {
  const controller = new AbortController();
  controller.abort();
  return controller.signal;
}
/** The registered provider's own output for the injected read, through CapabilityRegistry.invoke; its reader calls go to `served`. */
async function providerOutput(served: string[] = []): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, recording(injectedReader(), served), WS);
  return registry.invoke("hyperunix.find", INPUT, { grants: GRANTS, signal: new AbortController().signal });
}

type ReadingCase = readonly [name: string, read: (served?: string[]) => Promise<JsonValue>, context: HyperUnixTopologyContext];
const READINGS: readonly ReadingCase[] = [
  ["R01 the measured incomplete read, absence not licensed", async () => reading(), CONTEXT],
  ["R02 complete, absence not licensed", async () => ofKind("complete", false), CONTEXT],
  ["R03 complete with two rows, runtime-licensed", async () => ofKind("complete", true, { rows: [{ path: "a" }, { path: "b" }] }), CONTEXT],
  ["R04 complete-empty, runtime-licensed", async () => ofKind("complete-empty", true), CONTEXT],
  ["R05 complete-empty, absence not licensed", async () => ofKind("complete-empty", false), CONTEXT],
  ["R06 budget-exhausted", async () => ofKind("budget-exhausted", false), CONTEXT],
  ["R07 cancelled", async () => ofKind("cancelled", false), CONTEXT],
  ["R08 view-invalidated", async () => ofKind("view-invalidated", false), CONTEXT],
  ["R09 provider-failed", async () => ofKind("provider-failed", false), CONTEXT],
  ["R10 schema-failed", async () => ofKind("schema-failed", false), CONTEXT],
  ["R11 internal-failed", async () => ofKind("internal-failed", false), CONTEXT],
  ["R12 protocol-failed", async () => ofKind("protocol-failed", false), CONTEXT],
  ["R13 usage-error", async () => ofKind("usage-error", false), CONTEXT],
  ["R14 rows not retained", async () => reading({ rows_retained: false }), CONTEXT],
  ["R15 a licence on an incomplete kind, not honoured", async () => ofKind("incomplete", true), CONTEXT],
  ["R16 coverage batch ids withheld from the evidence references", async () => reading(batches(["c1", "c".repeat(300)])), CONTEXT],
  ["R17 coverage evidence references capped at 32", async () => reading(batches(Array.from({ length: 33 }, (_, index) => `c${index + 1}`))), CONTEXT],
  ["R18 the invoking operation named: one grouping edge", async () => reading(batches(["c1"])), NAMED_OPERATION],
  ["R19 the injected read through registerHyperUnixFind, end to end", providerOutput, CONTEXT],
  [
    "R20 a native execution id and evidence handles",
    async () => reading({ execution_id: "hx-exec-census-1", evidence: { support_ids: ["support-1"], derivation_handles: ["handle-1"] } }),
    CONTEXT,
  ],
];

const asRecord = (value: JsonValue | undefined): Json => (typeof value === "object" && value !== null && !Array.isArray(value) ? value : {});
/** The branch selector a reading exercises, read from its own input: kind, licence, rows, retention, batch ids, named operation. */
function selectorOf(name: string, value: JsonValue, context: HyperUnixTopologyContext): string {
  const source = asRecord(asRecord(value).source);
  const kind = asRecord(source.execution_status).kind;
  const licensed = asRecord(source.coverage_summary).licenses_absence;
  const rows = Array.isArray(source.rows) ? source.rows.length : -1;
  const coverage = Array.isArray(source.coverage) ? source.coverage.length : 0;
  const id = typeof source.execution_id === "string" ? "id" : "no-id";
  return `${name.slice(0, 3)}|${String(kind)}|${String(licensed)}|rows=${rows}|retained=${String(source.rows_retained)}|batches=${coverage}|${id}|${context.operationRef ? "op" : "no-op"}`;
}

/** The first 12 hex of the sha256 of a case's JSON input and context: any change to either reds the case's identity row. */
const inputDigest = (value: unknown, context: unknown): string =>
  createHash("sha256").update(JSON.stringify([value, context])).digest("hex").slice(0, 12);
/** A field's value as JSON, or "absent". */
const typed = (value: unknown): string => (value === undefined ? "absent" : JSON.stringify(value));
/**
 * Per reading, its payload identity: the reader calls it was served (a built reading is served none) and, for a built reading, the
 * digest of its input and context. A served reading's value is the registered provider's own output, whose SDK serialisation
 * (local and structural digests, rewritten diagnostics) belongs to the subject, so R19 is pinned by its reader witness and its
 * branch selector instead of a digest that a re-vendored SDK would move.
 */
async function readingIdentities(): Promise<string[]> {
  return Promise.all(
    READINGS.map(async ([name, read, context]) => {
      const served: string[] = [];
      const value = await read(served);
      const input = served.length > 0 ? "provider-output" : inputDigest(value, context);
      return `${name.slice(0, 3)}|served=${served.join(",") || "none"}|input=${input}`;
    }),
  );
}

type RefusalCase = readonly [name: string, value: JsonValue, context: HyperUnixTopologyContext, category: "validation" | "authorization"];
const omitSource = (key: string): Json => {
  const value = reading();
  return { ...value, source: Object.fromEntries(Object.entries(asRecord(value.source)).filter(([name]) => name !== key)) };
};
const malformed = (context: unknown): HyperUnixTopologyContext => context as HyperUnixTopologyContext;
/** The query node reading() projects under CONTEXT, derived the adapter's way (sha256 over the query and its batch ids). */
const QUERY_NODE_ID = createHash("sha256").update(JSON.stringify([WS, "find", "hx.fs/regular-file", "src", []])).digest("hex");
const REFUSALS: readonly RefusalCase[] = [
  ["F01 a host context that is not an object", reading(), malformed(null), "validation"],
  ["F02 a host scope without a principal", reading(), malformed({ ...CONTEXT, scope: { workspace: WS } }), "validation"],
  ["F03 a read target with an empty kind", reading(), { ...CONTEXT, target: { kind: "" } }, "validation"],
  ["F04 an unzoned capture time", reading(), { ...CONTEXT, capturedAt: "2026-10-20T06:00:00" }, "validation"],
  ["F05 an oversized invocation id", reading(), { ...CONTEXT, invocationId: "i".repeat(257) }, "validation"],
  ["F06 an operation reference without a type", reading(), malformed({ ...CONTEXT, operationRef: { provider: "pi-workflow", id: "wf:0" } }), "validation"],
  ["F07 another provider contract", { ...reading(), contract: "hyperunix.find/v2" }, CONTEXT, "validation"],
  ["F08 another representation", reading({ representation: "hyperunix.result/2" }), CONTEXT, "validation"],
  ["F09 an unregistered execution kind", ofKind("done", false), CONTEXT, "validation"],
  ["F10 a licence that is not a boolean", reading({ coverage_summary: { licenses_absence: "false" } }), CONTEXT, "validation"],
  ["F11 rows that are not an array", reading({ rows: { length: 0 } }), CONTEXT, "validation"],
  ["F12 a missing operation", omitSource("operation"), CONTEXT, "validation"],
  ["F13 a short binary digest", reading({}, { runtime: { version: "0.1.0", binarySha256: "abc" } }), CONTEXT, "validation"],
  ["F14 a missing runtime version", reading({}, { runtime: { binarySha256: BINARY } }), CONTEXT, "validation"],
  ["F15 a mutation-rejected outcome", ofKind("mutation-rejected", false), CONTEXT, "validation"],
  ["F16 a mutation-partial outcome", ofKind("mutation-partial", true), CONTEXT, "validation"],
  ["F17 a complete-empty answer that carries rows", ofKind("complete-empty", true, { rows: [{ path: "a" }] }), CONTEXT, "validation"],
  ["F18 a reading of another workspace", reading({}, { workspaceRoot: "/workspace/other" }), CONTEXT, "authorization"],
  [
    "F19 an operation reference aliasing the query node itself",
    reading(),
    { ...CONTEXT, operationRef: { provider: "hyperunix", type: "query", id: QUERY_NODE_ID, scope: WS } },
    "validation",
  ],
];

/** Per refusal case, its payload identity: the typed kind, licence and rows of its reading, and its input digest. */
function refusalIdentities(): string[] {
  return REFUSALS.map(([name, value, context]) => {
    const source = asRecord(asRecord(value).source);
    const rows = Array.isArray(source.rows) ? String(source.rows.length) : typeof source.rows;
    const kind = typed(asRecord(source.execution_status).kind);
    const licence = typed(asRecord(source.coverage_summary).licenses_absence);
    return `${name.slice(0, 3)}|kind=${kind}|licence=${licence}|rows=${rows}|input=${inputDigest(value, context)}`;
  });
}

/** A provider refusal: its run gets the list a recording reader logs its served calls into (the native runs serve none). */
type ProviderRefusal = readonly [name: string, run: (served: string[]) => Promise<unknown>, category: "validation" | "transport"];
const PROVIDER_REFUSALS: readonly ProviderRefusal[] = [
  ["P1 the native read of a relative workspace", () => nativeHyperUnixFind("relative/workspace", "hx.fs/regular-file"), "validation"],
  ["P2 the native read cancelled before the SDK launches", () => nativeHyperUnixFind(WS, "hx.fs/regular-file", "src", abortedSignal()), "transport"],
  [
    "P3 the injected read cancelled before invocation",
    served => injectedProvider(injectedReader(), served).invoke(INPUT, { grants: GRANTS, signal: abortedSignal() }),
    "transport",
  ],
  [
    "P4 the injected read cancelled during find",
    served => {
      const controller = new AbortController();
      return injectedProvider(injectedReader({ find: () => controller.abort() }), served).invoke(INPUT, { grants: GRANTS, signal: controller.signal });
    },
    "transport",
  ],
  [
    "P5 the injected read cancelled during runtime",
    served => {
      const controller = new AbortController();
      return injectedProvider(injectedReader({ runtime: () => controller.abort() }), served).invoke(INPUT, { grants: GRANTS, signal: controller.signal });
    },
    "transport",
  ],
];

function descriptorLines(registry: CapabilityRegistry): string[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(HYPERUNIX_PREFIX))
    .map(descriptor => `${descriptor.id}: ${descriptor.description}`);
}
/** The registry the native provider registration fills (native-modules.ts registerNativeProviders); S1 judges its hyperunix lines. */
async function nativeRegistry(): Promise<CapabilityRegistry> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, process.cwd());
  return registry;
}
async function nativeDescriptorLines(): Promise<string[]> {
  return descriptorLines(await nativeRegistry());
}
/** The other native provider families the native registration registers beside hyperunix (S1's registry identity leg). */
const NATIVE_FAMILIES = ["forge.", "furnace.", "reactivefiber."] as const;
async function injectedDescriptorLines(): Promise<string[]> {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, injectedReader(), WS);
  return descriptorLines(registry);
}
/** Per reading, every string leaf of the reader adapter's frozen topology. */
async function topologyStrings(): Promise<string[][]> {
  return Promise.all(READINGS.map(async ([, read, context]) => stringLeaves(hyperunixTopology(await read(), context))));
}
/** Per refusal case, the CapabilityError it raised, as "<category>|<message>". */
function refusalOutcomes(): string[] {
  return REFUSALS.map(([name, value, context]) => {
    try {
      hyperunixTopology(value, context);
    } catch (error) {
      if (error instanceof CapabilityError) return `${error.category}|${error.message}`;
      return `not-a-capability-error|${name}`;
    }
    return `not-refused|${name}`;
  });
}
interface ProviderRun {
  /** "<category>|<message>" of the CapabilityError the run raised. */
  readonly outcome: string;
  /** The reader calls the run was served before it ended, comma-joined, or "none". */
  readonly served: string;
}
/** Per provider refusal, the CapabilityError it raised and the reader calls it was served first. */
async function providerRuns(): Promise<ProviderRun[]> {
  return Promise.all(
    PROVIDER_REFUSALS.map(async ([name, run]) => {
      const served: string[] = [];
      let outcome = `not-refused|${name}`;
      try {
        await run(served);
      } catch (error) {
        outcome = error instanceof CapabilityError ? `${error.category}|${error.message}` : `not-a-capability-error|${name}`;
      }
      return { outcome, served: served.join(",") || "none" };
    }),
  );
}
async function providerOutcomes(): Promise<string[]> {
  return (await providerRuns()).map(run => run.outcome);
}
/** Per reading, every string leaf of the native-evidence projection and of the native reference it yields. */
async function evidenceStrings(): Promise<string[][]> {
  return Promise.all(
    READINGS.map(async ([, read]) => {
      const evidence = nativeEvidence("hyperunix.find", await read());
      return stringLeaves([evidence, nativeRefOf(evidence) ?? null]);
    }),
  );
}
/** Every string and template literal text of a source text, parsed with the TypeScript compiler (comments are trivia). */
function literalsIn(name: string, source: string): string[] {
  const file = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const texts: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      texts.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return texts;
}
/** Every string and template literal text of one module. */
function literalsOf(relative: string): string[] {
  return literalsIn(relative, readFileSync(join(ROOT, relative), "utf8"));
}
/** One literal of every node kind S7 reads, in source order (string, no-substitution template, template head, middle, tail), and a comment. */
const LITERAL_CONTROL = `const s = "s1"; const n = \`n1\`; const t = \`h1\${s}m1\${n}t1\`; // "c1" is a comment`;

interface Surface {
  readonly id: string;
  readonly label: string;
  /** The fewest strings the surface may yield. */
  readonly floor: number;
  /** A string the surface must yield (S4: the prefix of its first refusal). */
  readonly anchor: string;
}
const SURFACES: readonly Surface[] = [
  { id: "S1", label: "native registration descriptor lines", floor: 1, anchor: "hyperunix.find: Native " },
  { id: "S2", label: "injected-reader registration descriptor lines", floor: 1, anchor: "hyperunix.find: Read " },
  { id: "S3", label: "reader adapter topology string leaves", floor: 160, anchor: "incomplete · rows 0 · absence not licensed" },
  { id: "S4", label: "reader adapter refusal messages", floor: 19, anchor: "validation|HyperUnix topology refused: " },
  { id: "S5", label: "provider refusals without an hx binary", floor: 5, anchor: "validation|HX workspace must be an absolute path." },
  { id: "S6", label: "native-evidence projection string leaves", floor: 40, anchor: "hyperunix" },
  { id: "S7", label: "HyperUnix module string and template literals", floor: 60, anchor: "hyperunix.find/v1" },
];
/** The anchor rule: some yielded string starts with the anchor. */
const anchored = (texts: readonly string[], anchor: string): boolean => texts.some(text => text.startsWith(anchor));

async function surfaceTexts(id: string): Promise<string[]> {
  switch (id) {
    case "S1":
      return nativeDescriptorLines();
    case "S2":
      return injectedDescriptorLines();
    case "S3":
      return (await topologyStrings()).flat();
    case "S4":
      return refusalOutcomes();
    case "S5":
      return providerOutcomes();
    case "S6":
      return (await evidenceStrings()).flat();
    case "S7":
      return MODULES.flatMap(literalsOf);
    default:
      throw new Error(`no surface ${id}`);
  }
}

describe("HyperUnix graduation-vocabulary census (wb-tz2.10 R10, standing leg)", () => {
  it("FROZEN SHAPE (standing rule 16): the vocabulary, the surfaces, every table's cases and the matcher controls are their frozen literal", () => {
    expect(VOCABULARY.map(row => `${row.id}:${row.terms.join(",")}`)).toEqual([
      "V1:DESIGN,SOURCE_IMPLEMENTED,LOCAL_VERIFIED,CLI_INTEGRATED,PERF_VERIFIED,GRADUATED",
      "V2:PROGRAM_DESIGN,IMPLEMENTED,EXERCISED_HARNESS,EXERCISED_PUBLIC,VALIDATED,RELEASE_ACCEPTED",
      "V3:graduate,graduates,graduating,graduation",
      "V4:recommended,recommended-bounded,conditional,native-fallback-preferred,blocked,experimental",
    ]);
    expect(VOCABULARY.map(row => `${row.id}:${row.source}`)).toEqual([
      "V1:HyperUnix-CLI ADR-0101 decision table @6ed14cab8d: the HXGC promotion path, 11-qa-and-benchmarks.md:62",
      "V2:HyperUnix-CLI ADR-0101 superseded vocabulary @6ed14cab8d, mapped level-for-level onto V1",
      "V3:the graduation word family: HXGC-LX-001 03-requirements.md:43 and 10-providers-sdks-and-lx.md:63 @6ed14cab8d",
      "V4:HXFS 08-epistemic-and-performance-contracts.md:57-62 @d60f277a26 agent-routing statuses (bead note 2026-10-17b)",
    ]);
    expect(TERMS).toHaveLength(22);
    expect(new Set(TERMS.map(term => term.toLowerCase())).size).toBe(TERMS.length);
    expect(TERMS.filter(term => !TERM_SHAPE.test(term))).toEqual([]);
    expect(SURFACES.map(surface => `${surface.id}:${surface.label}:${surface.floor}:${surface.anchor}`)).toEqual([
      "S1:native registration descriptor lines:1:hyperunix.find: Native ",
      "S2:injected-reader registration descriptor lines:1:hyperunix.find: Read ",
      "S3:reader adapter topology string leaves:160:incomplete · rows 0 · absence not licensed",
      "S4:reader adapter refusal messages:19:validation|HyperUnix topology refused: ",
      "S5:provider refusals without an hx binary:5:validation|HX workspace must be an absolute path.",
      "S6:native-evidence projection string leaves:40:hyperunix",
      "S7:HyperUnix module string and template literals:60:hyperunix.find/v1",
    ]);
    expect(MODULES).toEqual(["src/workbench/providers/hyperunix.ts", "src/workbench/hyperunix-observer.ts"]);
    expect([...NATIVE_FAMILIES]).toEqual(["forge.", "furnace.", "reactivefiber."]);
    expect(READINGS.map(([name]) => name)).toEqual([
      "R01 the measured incomplete read, absence not licensed",
      "R02 complete, absence not licensed",
      "R03 complete with two rows, runtime-licensed",
      "R04 complete-empty, runtime-licensed",
      "R05 complete-empty, absence not licensed",
      "R06 budget-exhausted",
      "R07 cancelled",
      "R08 view-invalidated",
      "R09 provider-failed",
      "R10 schema-failed",
      "R11 internal-failed",
      "R12 protocol-failed",
      "R13 usage-error",
      "R14 rows not retained",
      "R15 a licence on an incomplete kind, not honoured",
      "R16 coverage batch ids withheld from the evidence references",
      "R17 coverage evidence references capped at 32",
      "R18 the invoking operation named: one grouping edge",
      "R19 the injected read through registerHyperUnixFind, end to end",
      "R20 a native execution id and evidence handles",
    ]);
    expect(REFUSALS.map(([name, , , category]) => `${name}:${category}`)).toEqual([
      "F01 a host context that is not an object:validation",
      "F02 a host scope without a principal:validation",
      "F03 a read target with an empty kind:validation",
      "F04 an unzoned capture time:validation",
      "F05 an oversized invocation id:validation",
      "F06 an operation reference without a type:validation",
      "F07 another provider contract:validation",
      "F08 another representation:validation",
      "F09 an unregistered execution kind:validation",
      "F10 a licence that is not a boolean:validation",
      "F11 rows that are not an array:validation",
      "F12 a missing operation:validation",
      "F13 a short binary digest:validation",
      "F14 a missing runtime version:validation",
      "F15 a mutation-rejected outcome:validation",
      "F16 a mutation-partial outcome:validation",
      "F17 a complete-empty answer that carries rows:validation",
      "F18 a reading of another workspace:authorization",
      "F19 an operation reference aliasing the query node itself:validation",
    ]);
    expect(PROVIDER_REFUSALS.map(([name, , category]) => `${name}:${category}`)).toEqual([
      "P1 the native read of a relative workspace:validation",
      "P2 the native read cancelled before the SDK launches:transport",
      "P3 the injected read cancelled before invocation:transport",
      "P4 the injected read cancelled during find:transport",
      "P5 the injected read cancelled during runtime:transport",
    ]);
    expect([...NEAR_MISSES]).toEqual([
      "invalidated",
      "view-invalidated",
      "unblocked",
      "designer",
      "redesigned",
      "preferred",
      "bounded",
      "verified",
      "integrated",
      "accepted",
      "graduat",
      "recommendation",
      "conditionally",
      "experimentally",
    ]);
    expect(plantedSpellings("native-fallback-preferred")).toHaveLength(36);
    expect(plantedSpellings("SOURCE_IMPLEMENTED")).toHaveLength(36);
    expect(plantedSpellings("blocked")).toHaveLength(12);
    expect(FOLDS).toHaveLength(3);
  });

  it("FROZEN SHAPE (standing rule 16): each reading's branch selector, read from its own input, is its frozen literal", async () => {
    const selectors = await Promise.all(READINGS.map(async ([name, read, context]) => selectorOf(name, await read(), context)));
    expect(selectors).toEqual([
      "R01|incomplete|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R02|complete|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R03|complete|true|rows=2|retained=true|batches=0|no-id|no-op",
      "R04|complete-empty|true|rows=0|retained=true|batches=0|no-id|no-op",
      "R05|complete-empty|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R06|budget-exhausted|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R07|cancelled|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R08|view-invalidated|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R09|provider-failed|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R10|schema-failed|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R11|internal-failed|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R12|protocol-failed|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R13|usage-error|false|rows=0|retained=true|batches=0|no-id|no-op",
      "R14|incomplete|false|rows=0|retained=false|batches=0|no-id|no-op",
      "R15|incomplete|true|rows=0|retained=true|batches=0|no-id|no-op",
      "R16|incomplete|false|rows=0|retained=true|batches=2|no-id|no-op",
      "R17|incomplete|false|rows=0|retained=true|batches=33|no-id|no-op",
      "R18|incomplete|false|rows=0|retained=true|batches=1|no-id|op",
      "R19|incomplete|false|rows=1|retained=true|batches=2|no-id|no-op",
      "R20|incomplete|false|rows=0|retained=true|batches=0|id|no-op",
    ]);
  });

  it("FROZEN SHAPE (standing rule 16): each judged case's payload identity (reader witness, typed selector, input digest) is its frozen literal", async () => {
    expect(await readingIdentities()).toEqual([
      "R01|served=none|input=2546e87ec76a",
      "R02|served=none|input=c180d648326e",
      "R03|served=none|input=213ad8380c7f",
      "R04|served=none|input=71742f6dc041",
      "R05|served=none|input=da450ccff1e7",
      "R06|served=none|input=54af9d35b390",
      "R07|served=none|input=4da52da8f13a",
      "R08|served=none|input=b9992d936991",
      "R09|served=none|input=65b349506426",
      "R10|served=none|input=3d7d5c56313c",
      "R11|served=none|input=b72ac7be82f0",
      "R12|served=none|input=e8098fb03ccc",
      "R13|served=none|input=b49d28240b1d",
      "R14|served=none|input=1f228271f8fe",
      "R15|served=none|input=cdfad423eee8",
      "R16|served=none|input=87f755f4e29c",
      "R17|served=none|input=3a21bfd9905c",
      "R18|served=none|input=a4aa404ae9b7",
      "R19|served=find,runtime|input=provider-output",
      "R20|served=none|input=905262b31b0a",
    ]);
    expect(refusalIdentities()).toEqual([
      "F01|kind=\"incomplete\"|licence=false|rows=0|input=df3f49bcdf18",
      "F02|kind=\"incomplete\"|licence=false|rows=0|input=dfc1858770da",
      "F03|kind=\"incomplete\"|licence=false|rows=0|input=6b85cd8bd133",
      "F04|kind=\"incomplete\"|licence=false|rows=0|input=94787d20049c",
      "F05|kind=\"incomplete\"|licence=false|rows=0|input=7f6ce8a8fe84",
      "F06|kind=\"incomplete\"|licence=false|rows=0|input=ca09c1f3e4eb",
      "F07|kind=\"incomplete\"|licence=false|rows=0|input=f90797075063",
      "F08|kind=\"incomplete\"|licence=false|rows=0|input=5d0ba8a5a634",
      "F09|kind=\"done\"|licence=false|rows=0|input=14ced5c5b59b",
      "F10|kind=\"incomplete\"|licence=\"false\"|rows=0|input=131dfa102871",
      "F11|kind=\"incomplete\"|licence=false|rows=object|input=7c8bbe423446",
      "F12|kind=\"incomplete\"|licence=false|rows=0|input=d81f7cef71d6",
      "F13|kind=\"incomplete\"|licence=false|rows=0|input=95585320c6b1",
      "F14|kind=\"incomplete\"|licence=false|rows=0|input=d90e64867a1e",
      "F15|kind=\"mutation-rejected\"|licence=false|rows=0|input=bacf9ea09b31",
      "F16|kind=\"mutation-partial\"|licence=true|rows=0|input=afa83e5c495e",
      "F17|kind=\"complete-empty\"|licence=true|rows=1|input=572ab6858f4d",
      "F18|kind=\"incomplete\"|licence=false|rows=0|input=a7d05d804501",
      "F19|kind=\"incomplete\"|licence=false|rows=0|input=49ecbbc53613",
    ]);
    const runs = await providerRuns();
    expect(runs).toHaveLength(5);
    expect(PROVIDER_REFUSALS.map(([name], index) => `${name.slice(0, 2)}|served=${runs[index]?.served}`)).toEqual([
      "P1|served=none",
      "P2|served=none",
      "P3|served=none",
      "P4|served=find",
      "P5|served=find,runtime",
    ]);
  });

  it.each(TERMS)("MATCHER: %s is found in every planted spelling", term => {
    const spellings = plantedSpellings(term);
    expect(spellings).toHaveLength(term.includes("-") || term.includes("_") ? 36 : 12);
    expect(spellings.filter(text => !termsIn(text).includes(term))).toEqual([]);
  });

  it("MATCHER: the per-term rows run exactly the 22 terms in vocabulary order", () => {
    expect(PATTERNS.map(([term]) => term)).toEqual([...TERMS]);
    expect(PATTERNS).toHaveLength(22);
  });

  it("MATCHER: the suite collected exactly one per-term row per vocabulary term, in vocabulary order", ({ task }) => {
    const collected = (task.suite?.tasks ?? []).map(sibling => sibling.name);
    expect(collected).toContain(task.name);
    const perTerm = collected.filter(name => name.startsWith("MATCHER: ") && name.endsWith(" is found in every planted spelling"));
    expect(perTerm).toEqual(TERMS.map(term => `MATCHER: ${term} is found in every planted spelling`));
  });

  it("MATCHER: every near miss stays quiet, and a hit names its surface, its text and its terms", () => {
    let ran = 0;
    for (const text of NEAR_MISSES) {
      expect(termsIn(text), text).toEqual([]);
      ran += 1;
    }
    expect(ran).toBe(14);
    expect(anchored(["incomplete · rows 0"], "incomplete")).toBe(true);
    expect(anchored(["incomplete · rows 0"], "rows 0")).toBe(false);
    expect(anchored([], "incomplete")).toBe(false);
    expect(hitsIn("SX", ["HX find (rows 0)", "a LOCAL-verified read", "recommended-bounded, then blocked"])).toEqual([
      { surface: "SX", text: "a LOCAL-verified read", terms: ["LOCAL_VERIFIED"] },
      { surface: "SX", text: "recommended-bounded, then blocked", terms: ["recommended", "recommended-bounded", "blocked"] },
    ]);
  });

  it("INPUTS: no reading, context, refusal input or provider input carries a vocabulary term, so a hit is Pi's own wording", async () => {
    const readings = await Promise.all(READINGS.map(async ([, read, context]) => stringLeaves([await read(), context])));
    expect(readings).toHaveLength(20);
    const refusals = REFUSALS.map(([, value, context]) => stringLeaves([value, context]));
    expect(refusals).toHaveLength(19);
    const inputs = [...readings.flat(), ...refusals.flat(), ...stringLeaves([INPUT, GRANTS, sdkDocument(), WS, "relative/workspace"])];
    expect(inputs.length).toBeGreaterThan(400);
    expect(hitsIn("inputs", inputs)).toEqual([]);
  });

  it("S1: every hyperunix descriptor the native provider registration registers describes itself without graduation vocabulary", { timeout: 120_000 }, async () => {
    const lines = await surfaceTexts("S1");
    expect(lines.length).toBeGreaterThanOrEqual(1);
    expect(anchored(lines, "hyperunix.find: ")).toBe(true);
    expect(anchored(lines, "hyperunix.find: Native ")).toBe(true);
    const injected = await surfaceTexts("S2");
    expect(lines.filter(line => injected.includes(line))).toEqual([]);
    const ids = (await nativeRegistry()).catalogSnapshot().map(entry => entry.descriptor.id);
    expect(NATIVE_FAMILIES.filter(family => !ids.some(id => id.startsWith(family)))).toEqual([]);
    expect(hitsIn("S1", lines)).toEqual([]);
  });

  it("S2: every hyperunix descriptor the injected-reader registration registers describes itself without graduation vocabulary", async () => {
    const lines = await surfaceTexts("S2");
    expect(lines.length).toBeGreaterThanOrEqual(1);
    expect(anchored(lines, "hyperunix.find: ")).toBe(true);
    expect(anchored(lines, "hyperunix.find: Read ")).toBe(true);
    expect(hitsIn("S2", lines)).toEqual([]);
  });

  it("S3: no reader adapter topology string leaf over the 20 readings carries graduation vocabulary", { timeout: 60_000 }, async () => {
    const perReading = await topologyStrings();
    expect(perReading).toHaveLength(20);
    expect(READINGS.filter((_reading, index) => (perReading[index]?.length ?? 0) < 8).map(([name]) => name)).toEqual([]);
    let derived = 0;
    for (const [index, [name, read, context]] of READINGS.entries()) {
      expect(perReading[index], name).toEqual(stringLeaves(hyperunixTopology(await read(), context)));
      derived += 1;
    }
    expect(derived).toBe(20);
    const strings = perReading.flat();
    expect(strings.length).toBeGreaterThanOrEqual(160);
    expect(strings).toContain("incomplete · rows 0 · absence not licensed");
    expect(hitsIn("S3", strings)).toEqual([]);
  });

  it("S4: no reader adapter refusal message over the 19 refusal cases carries graduation vocabulary", () => {
    const outcomes = refusalOutcomes();
    expect(outcomes).toHaveLength(19);
    expect(outcomes.map(outcome => outcome.split("|")[0])).toEqual(REFUSALS.map(([, , , category]) => category));
    expect(new Set(outcomes).size).toBe(19);
    expect(anchored(outcomes, "validation|HyperUnix topology refused: ")).toBe(true);
    expect(hitsIn("S4", outcomes)).toEqual([]);
  });

  it("S5: no provider refusal reachable without an hx binary carries graduation vocabulary", async () => {
    const outcomes = await providerOutcomes();
    expect(outcomes).toHaveLength(5);
    expect(outcomes.map(outcome => outcome.split("|")[0])).toEqual(PROVIDER_REFUSALS.map(([, , category]) => category));
    expect(outcomes.filter(outcome => !outcome.split("|")[1]?.startsWith("HX "))).toEqual([]);
    expect(anchored(outcomes, "validation|HX workspace must be an absolute path.")).toBe(true);
    expect(outcomes).toEqual([
      "validation|HX workspace must be an absolute path.",
      "transport|HX read cancelled before SDK launch.",
      "transport|HX read cancelled before invocation.",
      "transport|HX read cancelled.",
      "transport|HX read cancelled.",
    ]);
    expect(hitsIn("S5", outcomes)).toEqual([]);
  });

  it("S6: no native-evidence projection string leaf over the 20 readings carries graduation vocabulary", async () => {
    const perReading = await evidenceStrings();
    expect(perReading).toHaveLength(20);
    expect(READINGS.filter((_reading, index) => (perReading[index]?.length ?? 0) < 2).map(([name]) => name)).toEqual([]);
    let derived = 0;
    for (const [index, [name, read]] of READINGS.entries()) {
      const value = await read();
      const kind = asRecord(asRecord(asRecord(value).source).execution_status).kind;
      const evidence = nativeEvidence("hyperunix.find", value);
      expect(evidence.domainStatus, name).toBe(kind);
      expect(perReading[index], name).toEqual(stringLeaves([evidence, nativeRefOf(evidence) ?? null]));
      derived += 1;
    }
    expect(derived).toBe(20);
    const strings = perReading.flat();
    expect(strings.length).toBeGreaterThanOrEqual(40);
    expect(strings).toContain("hyperunix");
    expect(strings).toContain("execution");
    expect(strings).toContain("hx-exec-census-1");
    expect(hitsIn("S6", strings)).toEqual([]);
  });

  it("S7: no string or template literal of the two HyperUnix modules carries graduation vocabulary, and the scan holds every S1/S2 description", { timeout: 120_000 }, async () => {
    const perModule = MODULES.map(literalsOf);
    expect(perModule).toHaveLength(2);
    expect(MODULES.filter((_module, index) => (perModule[index]?.length ?? 0) < 10)).toEqual([]);
    const literals = perModule.flat();
    expect(literals.length).toBeGreaterThanOrEqual(60);
    expect(literals).toContain("hyperunix.find/v1");
    expect(literals).toContain("HyperUnix topology refused: ");
    const descriptions = [...(await surfaceTexts("S1")), ...(await surfaceTexts("S2"))].map(line => line.slice(line.indexOf(": ") + 2));
    expect(descriptions.length).toBeGreaterThanOrEqual(2);
    expect(descriptions.filter(description => !literals.includes(description))).toEqual([]);
    expect(hitsIn("S7", literals)).toEqual([]);
  });

  it("S7 COLLECTOR: the literal scan reads one literal of every node kind from a control text and nothing from its comment", () => {
    expect(literalsIn("control.ts", LITERAL_CONTROL)).toEqual(["s1", "n1", "h1", "m1", "t1"]);
  });

  it("LIVENESS: every surface yields at least its floor and its anchor, counted against the seven surfaces", { timeout: 120_000 }, async () => {
    let ran = 0;
    for (const surface of SURFACES) {
      const texts = await surfaceTexts(surface.id);
      expect(texts.length, surface.id).toBeGreaterThanOrEqual(surface.floor);
      expect(anchored(texts, surface.anchor), surface.id).toBe(true);
      ran += 1;
    }
    expect(ran).toBe(7);
  });
});
