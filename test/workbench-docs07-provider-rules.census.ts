/**
 * wb-6hb.11 (VC-2/W07): census falsifier for docs/workbench/07-native-integrations.md, a census leg of the wb-nl8 census
 * tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is the 20th member of the
 * sequenced census class (owner ruling on the held R1, 2026-10-18: adopt the gate default, the wb-cax.24 precedent).
 *
 * The Forge, Furnace, HyperUnix, ReactiveFiberCLI and Beads provider sections and "Shared integration requirements" state
 * adapter rules in single paragraphs. This leg binds each falsifiable sentence (rows F1-F3, U1-U6, H1-H2, R1-R4, B1-B2,
 * S1-S2, plus the DELTA-B-AMEND note rows U7 and U8) to existing cases by file, verbatim title and tier, or records it as
 * unpinned with a reason. It executes no pinned case and no test run: judge() from the shared helper
 * test/helpers/census.ts reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test` before the census step runs), so a pinned case counts only when the gate's own run collected it exactly
 * once (under its bound describe path where the row binds one), recorded it passed, and its body asserts - the helper's
 * three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case
 * therefore reads red, naming the row, the file, the title and the cause, as far as the helper's resolvable-construct
 * roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for
 * case calls itself: every title is located by the helper, from vitest's report, never from bare text.
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: each of the six sections, under
 * its unique level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, must render
 * as exactly its frozen paragraph. A dropped or reworded clause names its row. The docs drift falsifiers run over a
 * SYNTHETIC document built from the frozen section bodies, never over the live docs/07 text, so a legitimate edit of an
 * unpinned section (RCP provider, Agent provider, the vertical journey) can never redden a falsifier row.
 *
 * Tiers: a row's tier names the report that vouches for it. The default report vouches for the default gate's test tier
 * only; judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)), so this leg never reports a live or native
 * pass from a title's presence. The one native-read case (R2, native-rf-preview, run from vitest.rf.config.ts against a
 * real initialized workspace) is RECORDED with its tier and checked at FILE level only: the file exists, the default
 * report does not hold it (not-collected), and the default judge refuses it (tier-mismatch). NAMED RESIDUAL
 * NATIVE-TITLE: whether that case's title is still registered is judged by no report this leg reads, and the leg says so
 * rather than counting the pin as covered.
 *
 * ORDERING GUARD (wb-693.9, RF-TSX-AND-EMBEDDING-R11): row R4 binds the RF sentence naming the "SDK package + revision"
 * fields the adapter records (provenance.cli_version, provenance.sdk_versions.tsx_runtime/tsx_sdk) to the cases that
 * assert them: the wb-693.1 R10 engine-identity cases and the wb-2j3.1 release cases, which absorbed requirement R4 under
 * owner ruling G-A (the release is an rf-cli evidence reference, never sourceVersion). The sentence is never a docs claim
 * without its cases: over the gate's own report with those cases removed, every R4 pin reads absent and the leg is red,
 * naming the row, while the docs still state the sentence. Row R4's quote and binding are frozen as literals (rule 16).
 *
 * Non-scope (no falsifiable adapter sentence, or covered by the docs/14 matrix): "MechanicalWorkflows is an ordinary
 * function library", "RCP provider", "Agent provider", "First realistic vertical journey".
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

type Tier = "default-gate" | "native-read";
interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
}
interface Half {
  /** The part of the row's sentence this half answers. */
  readonly id: string;
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  /** Why no landed case binds this half; an unpinned half is never counted as covered. */
  readonly reason?: string;
}
interface Row {
  readonly row: string;
  readonly section: string;
  /** docs/07 text, verbatim in the section's markdown source (a note row carries the bead note's wording instead). */
  readonly quote: string;
  /** "docs": the quote renders in the section; "note": the DELTA-B-AMEND bead note, no docs/07 sentence exists yet. */
  readonly source: "docs" | "note";
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs07-provider-rules.census.ts";
const DOCS_FILE = "docs/workbench/07-native-integrations.md";
const DOCS_PARENT = "07 — MechanicalWorkflows and ecosystem native SDK integration";
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

const T = (name: string): string => `test/workbench-${name}.test.ts`;
const pin = (name: string, title: string, suite?: readonly string[]): Pin => (suite === undefined ? { file: T(name), title } : { file: T(name), title, suite });
const gate = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const whole = (pins: readonly Pin[]): readonly Half[] => [gate("whole", pins)];
const unpinned = (id: string, reason: string): Half => ({ id, tier: "default-gate", pins: [], reason });

/** The six frozen docs/07 section paragraphs, as the markdown source says them. */
const SECTION_MARKDOWN: Readonly<Record<string, string>> = {
  "Forge provider":
    "Use public Forge TypeScript App Server/facade or other current SDK. Initial functions: build/verification, affected/incremental selection, inspect artifact and operation. Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states. A successful RPC or shell exit does **not** equal verified Forge PASS. Prefer Forge first for gates, test, build and packaging. Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.",
  "Furnace provider":
    "Use public TypeScript client for runs.start/get/status/events/pause/stop as verified. Native Run/Work/Attempt and supervision semantics remain Furnace's. Future idempotent ensure/reconcile and convenience wait methods are upstream targets, not an assumed API. Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly. A Furnace host may use ExecutorApp over the per-Attempt embedded bridge to call a MechanicalWorkflows function, with the application outcome mapped explicitly to the four-word Furnace execution result (only status is read; failure_class and data are not); failure and indeterminate park the Run rather than retrying, cancellation is a cooperative AbortSignal, and transport success is never domain verification.",
  "HyperUnix provider":
    'Use typed TS HX SDK/HXQ builder/results; preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence. Incomplete query cannot silently authorize "nothing to do" or produce false success. Graph query as observation enhancement is optional; HX is not mandatory UI event storage.',
  "ReactiveFiberCLI provider":
    "Use actual public render/context APIs; present Python/CLI interop honestly if no production TypeScript SDK exists at selected revision. Do not declare a typed TS context-render client exists without code evidence. Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status. For the shared \"SDK package + revision\" record, the RF adapter records the producer release that provenance.cli_version states as one rf-cli evidence reference, never as sourceVersion, and the TSX engine identity that provenance.sdk_versions.tsx_runtime/tsx_sdk state as one rf-engine evidence reference per entry. Fixture text is never reported as real generated context.",
  "Beads provider":
    "Beads retains readiness, formulas and logical task dependencies. Workbench may inspect supported scopes and surface linked work; it does not store an authoritative second readiness DAG. No assumed stable Beads SDK if only other integration contracts are available.",
  "Shared integration requirements":
    "Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership. For a missing API, produce upstream feedback with smallest reproducer, accepted behavior, and explicit blocker. Avoid quietly writing a private reimplementation of an upstream feature.",
};
/** What a reader sees of each paragraph: the markdown source without its emphasis markers. */
const renderedOf = (markdown: string): string => markdown.replaceAll("**", "");
const SECTION_ORDER: readonly string[] = ["Forge provider", "Furnace provider", "HyperUnix provider", "ReactiveFiberCLI provider", "Beads provider", "Shared integration requirements"];
const sectionBlocks = (heading: string): readonly RenderedBlock[] => {
  const markdown = SECTION_MARKDOWN[heading] ?? "";
  return [{ kind: "paragraph", text: renderedOf(markdown), markdown }];
};

const CAPABILITY_SUITE = "no native cancel: the typed capability-unavailable refusal quotes the measured surface, never a shell-out or a minted verb";
/** wb-693.9: the describe paths holding the R1/R4 cases row R4 binds (its pins bind the describe as well as the case). */
const RELEASE_SUITE = "producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard)";
const ENGINE_SUITE = "engine identity from result.provenance.sdk_versions (wb-693.1 R1, wb-693.2 R2, wb-693.3 R3)";

/** Freezes the table and everything it holds, so no row, half or pin can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

const TABLE: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    row: "F1",
    section: "Forge provider",
    source: "docs",
    quote: "A successful RPC or shell exit does **not** equal verified Forge PASS.",
    halves: whole([
      pin("forge-observer", "F2: a current failed gate stays failed despite transport success, and current success is success"),
      pin("forge-observer", "reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace"),
      pin("forge-contract", "server partial outcome remains a partial domain value"),
    ]),
  },
  {
    row: "F2",
    section: "Forge provider",
    source: "docs",
    quote: "Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states.",
    halves: whole([
      pin("forge-observer", "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
      pin("forge-observer", "F3: a partial envelope with no packages is indeterminate, never an empty success"),
      pin("forge-observer", "F5: states only forge-observer grouping edges and never invents lifecycle, timing or a basis"),
    ]),
  },
  {
    row: "F3",
    section: "Forge provider",
    source: "docs",
    quote: "Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.",
    halves: [
      unpinned(
        "whole",
        "no landed case probes Workspace Families or global cache availability: a grep of test/ and src/ for those terms at the cut base (trunk 757af07) found no case that asserts the probe, so the sentence has no falsifier today and is never reported as covered; a seat that lands such a case flips this half to a pin consciously (the pin-flip pattern of wb-6hb.4)",
      ),
    ],
  },
  {
    row: "U1",
    section: "Furnace provider",
    source: "docs",
    quote: "Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly.",
    halves: whole([
      pin("furnace-hosted", "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start"),
      pin("provider-lifecycle", "honors cancellation before native launch without creating a Furnace client"),
    ]),
  },
  {
    row: "U2",
    section: "Furnace provider",
    source: "docs",
    quote: "Native Run/Work/Attempt and supervision semantics remain Furnace's.",
    halves: whole([
      pin("furnace-observer", "rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream"),
      pin("furnace-topology", "emits ownership only on the producer page confirmation: a foreign Attempt or a missing page request ID refuses"),
    ]),
  },
  {
    row: "U3",
    section: "Furnace provider",
    source: "docs",
    quote: "(only status is read; failure_class and data are not)",
    halves: whole([pin("furnace-hosted", "maps every workflow settlement onto the four-word result without reading failure_class")]),
  },
  {
    row: "U4",
    section: "Furnace provider",
    source: "docs",
    quote: "failure and indeterminate park the Run rather than retrying",
    halves: whole([
      pin("furnace-hosted", "never claims cancelled for a workflow that ignores the abort: it reports indeterminate and records the late settlement"),
      pin("furnace-control", "parks rather than throws when the core refuses to mint a later phase after the verb was issued"),
    ]),
  },
  {
    row: "U5",
    section: "Furnace provider",
    source: "docs",
    quote: "cancellation is a cooperative AbortSignal",
    halves: whole([pin("furnace-hosted", "cancels cooperatively: the workflow stops, no effect follows the abort, and the terminal is cancelled")]),
  },
  {
    row: "U6",
    section: "Furnace provider",
    source: "docs",
    quote: "transport success is never domain verification",
    halves: whole([
      pin("furnace-control", "parks an answer that is transport success without the native echo: never acknowledged without the request echo, never settled without the terminal echo"),
      pin("forge-observer", "F2: a current failed gate stays failed despite transport success, and current success is success"),
    ]),
  },
  {
    row: "U7",
    section: "Furnace provider",
    source: "docs",
    quote: "Use public TypeScript client for runs.start/get/status/events/pause/stop as verified.",
    halves: [
      gate("start", [pin("furnace-hosted", "opens one embedded host per Run, writes the extension config, and forwards only a wisp start")]),
      gate("get-status-attempts-logs", [pin("furnace-observer", "reads native Run, Attempt and bounded log reference without promoting output or owning the Run")]),
      gate("pause-stop", [pin("furnace-control", "is exactly run pause/stop/resume and attempt stop, each a verbatim vendored clientOperations row, deep-frozen")]),
      unpinned(
        "events",
        "DELTA-B-AMEND, measured at the cut base (trunk 757af07): no Furnace Run events() call exists in src; the only .events( hits are ObservationProjection reads (src/workbench/telemetry.ts, src/workbench/observe-query.ts), and src/workbench/furnace-observer.ts:2 records that the SDK Run.events() follows one Attempt's output, not Run lifecycle events, and is not read. The listed verb has no landed Pi call and no case, so it is never counted as covered; the docs sentence lists it as a client verb, not as a Pi call",
      ),
    ],
  },
  {
    row: "U8",
    section: "Furnace provider",
    source: "note",
    quote: "Pi issues none of the Hyper-Furnace graph/query/explanation verbs (query run, query plan, why attempt, why run, why-not executor) and reads no explanation_format or furnace.operational/v1 object.",
    halves: [
      unpinned(
        "negative-verbs",
        "DELTA-B-AMEND consideration, not a docs/07 sentence: those surfaces are pre-v1 and 'diagnostic, never authority' upstream, and the bead note names a source grep over src as the falsifier. That grep is a bare-text scan, which the census floor refuses, and no landed case asserts it, so the row is recorded here and never counted as covered; it becomes a pin when docs/07 states the sentence and a parse-aware case lands",
      ),
    ],
  },
  {
    row: "H1",
    section: "HyperUnix provider",
    source: "docs",
    quote: 'Incomplete query cannot silently authorize "nothing to do" or produce false success.',
    halves: whole([
      pin("hyperunix-observer", "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
      pin("hyperunix-observer", 'H2: across all 13 kinds x both licences success appears only with complete coverage and nothing claims "verified"'),
      pin("provider-lifecycle", "preserves incomplete native coverage instead of inventing absence"),
    ]),
  },
  {
    row: "H2",
    section: "HyperUnix provider",
    source: "docs",
    quote: "preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence",
    halves: whole([
      pin("hyperunix-observer", "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success"),
      pin("hyperunix-observer", "H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references"),
    ]),
  },
  {
    row: "R1",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: "Fixture text is never reported as real generated context.",
    halves: whole([
      pin("reactivefiber-observer", "R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render"),
      pin("provider-lifecycle", "rejects a forged success envelope that cannot prove ephemeral provenance"),
    ]),
  },
  {
    row: "R2",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: "Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status.",
    halves: [
      gate("observer", [
        pin("reactivefiber-observer", "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference"),
        pin("reactivefiber-observer", "R4: ok:true with diagnostics_summary.has_errors projects partial and never clean success"),
        pin("reactivefiber-observer", "R4: a render that exceeds its context budget is partial and says how far over"),
      ]),
      // Recorded, never judged: excluded from the default include, run from vitest.rf.config.ts against a real
      // initialized workspace (forge.toml rf-preview). This leg never reports it as passing.
      { id: "native-preview", tier: "native-read", pins: [pin("native-rf-preview", "returns noncommitted text and graph provenance with no durable render ID")] },
    ],
  },
  {
    row: "R3",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: "Do not declare a typed TS context-render client exists without code evidence.",
    halves: [
      unpinned(
        "whole",
        "no landed case asserts that no typed TS context-render client is claimed: the only CLI-facing case (native-rf-preview, native-read tier) asserts the preview envelope shape, not the absence of a TypeScript client, so binding it here would overstate coverage; a seat that lands such a case flips this half to a pin consciously",
      ),
    ],
  },
  {
    // wb-693.9 (RF-TSX-AND-EMBEDDING-R11): lands together with its cases. R4 (cli_version) was absorbed by wb-2j3.1 under
    // owner ruling G-A, so its cases assert an rf-cli reference and never sourceVersion; R1 is wb-693.1's R10 cases.
    row: "R4",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote:
      'For the shared "SDK package + revision" record, the RF adapter records the producer release that provenance.cli_version states as one rf-cli evidence reference, never as sourceVersion, and the TSX engine identity that provenance.sdk_versions.tsx_runtime/tsx_sdk state as one rf-engine evidence reference per entry.',
    halves: [
      gate("producer-release", [
        pin("reactivefiber-observer", "R1: a stated cli_version travels as one distinct rf-cli evidence reference and one note, never as sourceVersion (owner ruling G-A)", [RELEASE_SUITE]),
        pin("reactivefiber-observer", "R1: the value is carried, not hard-coded: other releases round-trip verbatim through the reference, the note and the metadata", [RELEASE_SUITE]),
      ]),
      gate("tsx-engine-identity", [
        pin("reactivefiber-observer", "R10: an object sdk_versions stating both engine entries adds one rf-engine reference per entry and one foreign-runtime note", [ENGINE_SUITE]),
        pin("reactivefiber-observer", "R10: the identities are carried, not hard-coded: other versions and fingerprints round-trip verbatim into their references", [ENGINE_SUITE]),
      ]),
    ],
  },
  {
    row: "B1",
    section: "Beads provider",
    source: "docs",
    quote: "it does not store an authoritative second readiness DAG",
    halves: whole([
      pin("beads-observer", "C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge"),
      pin("beads-observer", "snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented"),
    ]),
  },
  {
    row: "B2",
    section: "Beads provider",
    source: "docs",
    quote: "Workbench may inspect supported scopes and surface linked work",
    halves: whole([
      pin("beads-observer", "F6: dependencies beyond maxDependencies are cut, counts are honest and completeness is partial"),
      pin("beads-observer", "F7: scope.workspace that differs from workspaceRoot is authorization and bd is never called"),
    ]),
  },
  {
    row: "S1",
    section: "Shared integration requirements",
    source: "docs",
    quote: "Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership.",
    halves: [
      gate("sdk-revision", [pin("vendor-pins", "the real tree pins forge, furnace and hyperunix SDK tarball bytes consistently")]),
      gate("native-operation-ids", [pin("forge-observer", "projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference")]),
      unpinned(
        "owner-basis",
        "basis handling is pinned per provider on F2, H2 and R2; no landed case asserts a single adapter-record shape that carries owner and basis together, so the clause is never counted as covered",
      ),
      unpinned(
        "observed-evidence",
        "evidence handling is pinned per provider on H2 and R2; no landed case asserts the shared adapter-record field that holds observed evidence, so the clause is never counted as covered",
      ),
      gate("error-taxonomy", [pin("provider-lifecycle", "turns malformed JSON into a typed transport error without echoing untrusted bytes")]),
      gate("trace-correlation-boundary", [pin("native-evidence", "never presents Forge correlation trace/run IDs as native operation identity")]),
      unpinned(
        "trace-correlation-recorded",
        "PARTIAL by design: the native-evidence case pins only the identity boundary (a Forge trace or run id is never presented as the native operation identity); it does not assert that an adapter RECORDS trace correlation. The one case that carries a correlation id is furnace-control 'carries the core's request id to Furnace unchanged', which covers Furnace control only, so recording across adapters has no case and is never counted as covered",
      ),
      gate("cancellation-timeout", [pin("provider-lifecycle", "waits for a bounded native read to settle then reports a mid-flight cancellation")]),
      gate("cleanup-ownership", [pin("provider-lifecycle", "escalates aborted noncooperative children to SIGKILL within a deadline")]),
    ],
  },
  {
    row: "S2",
    section: "Shared integration requirements",
    source: "docs",
    quote: "Avoid quietly writing a private reimplementation of an upstream feature.",
    halves: [
      gate("furnace-verbs", [pin("furnace-control", "refuses a permitted decision for which no measured Furnace verb exists, even under a polluted Object.prototype")]),
      // wb-69g.9 landed first (landing 56, test/workbench-forge-control.test.ts); this is the conscious flip of the
      // pending half, by name, never the stale-titled case under "bounded, sanitized output and separation from observation".
      gate("forge-capability", [
        pin("forge-control", "refuses the vendored one-shot CLI fallback, whose map states cancel unsupported, without calling its cancel or launching anything", [CAPABILITY_SUITE]),
        pin("forge-control", "refuses an app server whose map states operation.cancel unavailable or never enumerated it, and a connection with no readable statement", [CAPABILITY_SUITE]),
      ]),
    ],
  },
]);

const ROW_IDS: readonly string[] = ["F1", "F2", "F3", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "H1", "H2", "R1", "R2", "R3", "R4", "B1", "B2", "S1", "S2"];
/** Every half that has no landed case, as "row/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = ["F3/whole", "U7/events", "U8/negative-verbs", "R3/whole", "S1/owner-basis", "S1/observed-evidence", "S1/trace-correlation-recorded"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The forge.toml command whose own run must vouch for a half; a native-read label names no report this leg reads. */
const tierCommand = (tier: Tier): string => (tier === "default-gate" ? DEFAULT_GATE_TIER : tier);
const casePin = (half: Half, entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: tierCommand(half.tier), ...(entry.suite === undefined ? {} : { suite: entry.suite }) });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));
const NATIVE = TABLE.flatMap(row => row.halves.filter(half => half.tier === "native-read").map(half => ({ row, half })));

/** One line per pin that is not ok, naming the row and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${half.id}: ${verdict.code}: ${verdict.why}`);

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row quote checks read the section's rendered
 * text and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  for (const heading of SECTION_ORDER) {
    const section = docsSection(markdown, heading, 2, [DOCS_PARENT]);
    if (!section.ok) {
      out.push(`${DOCS_FILE} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const source = section.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
    for (const row of TABLE) {
      if (row.section === heading && row.source === "docs" && !source.includes(renderedOf(row.quote))) out.push(`row ${row.row}: its clause "${row.quote}" no longer renders in ${DOCS_FILE} § ${heading}`);
    }
    const exact = sectionMatches(section, sectionBlocks(heading));
    if (!exact.ok) out.push(`${DOCS_FILE} § ${heading} is not exactly its frozen paragraph: ${exact.why}`);
  }
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bodies under the real heading shape, never the live text. */
const synthetic = (edit: (heading: string, body: string) => string = (_heading, body) => body, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## MechanicalWorkflows is an ordinary function library\n\nNo dependency.\n\n${SECTION_ORDER.map(heading => `## ${heading}\n\n${edit(heading, SECTION_MARKDOWN[heading] ?? "")}\n`).join("\n")}\n## RCP provider\n\nOptional.\n\n## First realistic vertical journey\n\nA journey.\n${tail}`;
/** wb-pfl (ORCH-REC-R544 F1): the judged shape frozen as a literal, never derived from TABLE, so deleting a half or a pin cannot pass. */
const FROZEN_JUDGED_SHAPE: readonly string[] = [
  "F1/whole:3",
  "F2/whole:3",
  "U1/whole:2",
  "U2/whole:2",
  "U3/whole:1",
  "U4/whole:2",
  "U5/whole:1",
  "U6/whole:2",
  "U7/start:1",
  "U7/get-status-attempts-logs:1",
  "U7/pause-stop:1",
  "H1/whole:3",
  "H2/whole:2",
  "R1/whole:2",
  "R2/observer:3",
  "R4/producer-release:2",
  "R4/tsx-engine-identity:2",
  "B1/whole:2",
  "B2/whole:2",
  "S1/sdk-revision:1",
  "S1/native-operation-ids:1",
  "S1/error-taxonomy:1",
  "S1/trace-correlation-boundary:1",
  "S1/cancellation-timeout:1",
  "S1/cleanup-ownership:1",
  "S2/furnace-verbs:1",
  "S2/forge-capability:2",
];

const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-6hb.11 docs/workbench/07 provider-rules census (report mode)", () => {
  it("AC1: the table holds the twenty-one frozen rows in order, deeply frozen, each quote verbatim in its section's source", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => row.row)).toEqual(ROW_IDS);
    expect(TABLE).toHaveLength(21);
    expect(JUDGED.map(({ row, half }) => `${row.row}/${half.id}:${half.pins.length}`)).toEqual(FROZEN_JUDGED_SHAPE);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the six sections are the six the table names, and the frozen bodies render exactly (HTML-free, whole-section equality)", () => {
    expect(new Set(TABLE.map(row => row.section))).toEqual(new Set(SECTION_ORDER));
    expect(Object.keys(SECTION_MARKDOWN)).toEqual(SECTION_ORDER);
    for (const heading of SECTION_ORDER) {
      const section = docsSection(readRepo(DOCS_FILE), heading, 2, [DOCS_PARENT]);
      expect(sectionMatches(section, sectionBlocks(heading)), heading).toEqual({ ok: true, why: "" });
    }
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the two", () => {
    for (const row of TABLE) {
      expect(row.halves.length, `row ${row.row}: a row holds at least one half`).toBeGreaterThan(0);
      for (const half of row.halves) {
        expect(["default-gate", "native-read"], `row ${row.row}/${half.id}: tier`).toContain(half.tier);
        if (half.reason === undefined) expect(half.pins.length, `row ${row.row}/${half.id}: a pinned half has no pins`).toBeGreaterThan(0);
        else {
          expect(half.pins, `row ${row.row}/${half.id}: an unpinned half carries no pins`).toEqual([]);
          expect(half.reason.trim().length, `row ${row.row}/${half.id}: an unpinned half needs a reason`).toBeGreaterThan(40);
        }
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed, each naming its reason", () => {
    const listed = TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => `${row.row}/${half.id}`));
    expect(listed).toEqual(UNPINNED_HALVES);
    const reasons = Object.fromEntries(TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => [`${row.row}/${half.id}`, half.reason ?? ""])));
    expect(reasons["F3/whole"]).toContain("Workspace Families");
    expect(reasons["U7/events"]).toContain("furnace-observer.ts:2");
    expect(reasons["U8/negative-verbs"]).toContain("bare-text");
    expect(reasons["R3/whole"]).toContain("native-rf-preview");
    expect(reasons["S1/trace-correlation-recorded"]).toContain("PARTIAL by design");
    expect(TABLE.filter(row => row.source === "note").map(row => row.row)).toEqual(["U8"]);
  });

  it.each(JUDGED)("AC2 row $row.row/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report", ({ row, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(half, entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("S2 forge-capability: the pending half is flipped by name to the landed forge-control capability-unavailable cases under their describe", () => {
    const half = TABLE.find(row => row.row === "S2")?.halves.find(candidate => candidate.id === "forge-capability");
    expect(half?.pins.map(entry => entry.file)).toEqual([T("forge-control"), T("forge-control")]);
    expect(half?.pins.every(entry => entry.suite?.[0] === CAPABILITY_SUITE)).toBe(true);
  });

  it("AC4: the native-read case is recorded with its tier and judged by no report this leg reads: the default judge refuses it, the default report does not hold its file", () => {
    expect(NATIVE.map(({ row, half }) => `${row.row}/${half.id}`)).toEqual(["R2/native-preview"]);
    const native = NATIVE[0];
    const entry = native?.half.pins[0];
    expect(native !== undefined && entry !== undefined).toBe(true);
    if (native === undefined || entry === undefined) return;
    expect(entry.file).toBe(NATIVE_FILE);
    expect(existsSync(join(ROOT, entry.file)), `${entry.file} is the native tier's file`).toBe(true);
    const [asNative] = judge(REPORT, [casePin(native.half, entry)]);
    expect(asNative?.code, "a native-read pin is never carried by the default report").toBe("tier-mismatch");
    const [asDefault] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER }]);
    expect(asDefault?.code, "the native file is not in the default gate's report").toBe("not-collected");
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    const pinned = TABLE.flatMap(row => row.halves.flatMap(half => half.pins.map(entry => basename(entry.file, ".ts"))));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6hb.11 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (id: string): { row: Row; half: Half; entry: Pin } => {
    const found = JUDGED.find(({ row }) => row.row === id);
    const entry = found?.half.pins[0];
    if (found === undefined || entry === undefined) throw new Error(`row ${id} holds no judged pin`);
    return { row: found.row, half: found.half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, half, entry } = firstJudged("U5");
    const wrong = { ...entry, title: entry.title.replace("cancelled", "cancelleD") };
    const verdicts = judge(REPORT, [casePin(half, wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, half, verdicts);
    expect(line).toContain("row U5/whole");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen ids no longer match)", () => {
    expect(TABLE.filter(row => row.row !== "B1").map(row => row.row)).not.toEqual(ROW_IDS);
  });

  it("M3: an unpinned half promoted to a pin without a title is red, naming the half (the judge finds no such case)", () => {
    const { half } = firstJudged("F1");
    const [verdict] = judge(REPORT, [casePin(half, { file: T("forge-observer"), title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("the S2 capability pins bind their describe: the same case under a renamed describe path is absent", () => {
    const { half, entry } = firstJudged("S2");
    const forge = TABLE.find(row => row.row === "S2")?.halves.find(candidate => candidate.id === "forge-capability");
    const capability = forge?.pins[0];
    expect(capability?.suite).toBeDefined();
    if (capability === undefined) return;
    const [verdict] = judge(REPORT, [casePin(forge ?? half, { ...capability, suite: [`${CAPABILITY_SUITE} (renamed)`] })]);
    expect(verdict?.code).toBe("absent");
    expect(entry.file).toBeDefined();
  });

  it("a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a half relabelled native-read is refused by the default report, never carried from a title's presence", () => {
    const { half, entry } = firstJudged("H1");
    const [verdict] = judge(REPORT, [casePin({ ...half, tier: "native-read" }, entry)]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-6hb.11 docs drift names the row or the section (synthetic document, rendered view)", () => {
  const edit = (heading: string, from: string, to: string) => (section: string, body: string): string => (section === heading ? body.replace(from, to) : body);

  it("accepts the six sections exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(synthetic(undefined, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("K1 names row U4 (and only it) when its clause is dropped from the Furnace paragraph", () => {
    const lines = docsFailures(synthetic(edit("Furnace provider", "failure and indeterminate park the Run rather than retrying, ", "")));
    expect(named(lines)).toEqual(["row U4"]);
    expect(lines.some(line => line.includes("not exactly its frozen paragraph"))).toBe(true);
  });

  it("K2 names row F1 (and only it) when the Forge sentence is weakened", () => {
    expect(named(docsFailures(synthetic(edit("Forge provider", "does **not** equal", "may equal"))))).toEqual(["row F1"]);
  });

  it("K3 names row B1 (and only it) when the Beads clause is reworded", () => {
    expect(named(docsFailures(synthetic(edit("Beads provider", "it does not store an authoritative second readiness DAG", "it may store a second readiness DAG"))))).toEqual(["row B1"]);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to a paragraph", () => {
    const lines = docsFailures(synthetic(edit("HyperUnix provider", "HX is not mandatory UI event storage.", "HX is not mandatory UI event storage. Unless the host says otherwise.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("HyperUnix provider is not exactly its frozen paragraph");
  });

  it("D1b goes red on the section when a weakening paragraph is appended inside it", () => {
    const lines = docsFailures(synthetic(edit("ReactiveFiberCLI provider", "real generated context.", "real generated context.\n\nA host may report fixture text.")));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 2 blocks; the census pins 1");
  });

  it("D2 goes red when a section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace("## Beads provider", "## Beads notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Beads provider: the section is refused");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection is appended inside a section", () => {
    const lines = docsFailures(synthetic(edit("Forge provider", "packaging. ", "packaging.\n\n### Exceptions\n\nA host may skip these rules.\n\nWorkspace "))).filter(line => line.includes("Forge provider"));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D9 goes red when a level-1 heading inserted above re-homes a section", () => {
    const lines = docsFailures(synthetic().replace("## Furnace provider", "# Appendix\n\n## Furnace provider"));
    expect(lines.some(line => line.includes("Furnace provider: the section is refused"))).toBe(true);
  });

  it("D10 names row U5 when its clause is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(edit("Furnace provider", "cancellation is a cooperative AbortSignal", "<!-- cancellation is a cooperative AbortSignal -->")));
    expect(named(lines)).toEqual(["row U5"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("an edit of an unpinned section never reddens a row: the RCP provider and the journey are free to change", () => {
    expect(docsFailures(synthetic().replace("Optional.", "Optional, and changed.").replace("A journey.", "A different journey."))).toEqual([]);
  });
});

/** wb-693.9 (rule 16): row R4's quote and binding as literals, never derived from TABLE, so a shortened quote, a dropped, swapped or re-homed pin or a relabelled tier reads red. */
const FROZEN_IDENTITY_QUOTE =
  'For the shared "SDK package + revision" record, the RF adapter records the producer release that provenance.cli_version states as one rf-cli evidence reference, never as sourceVersion, and the TSX engine identity that provenance.sdk_versions.tsx_runtime/tsx_sdk state as one rf-engine evidence reference per entry.';
const FROZEN_IDENTITY_BINDING: readonly string[] = [
  "producer-release | test | test/workbench-reactivefiber-observer.test.ts | producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard) | R1: a stated cli_version travels as one distinct rf-cli evidence reference and one note, never as sourceVersion (owner ruling G-A)",
  "producer-release | test | test/workbench-reactivefiber-observer.test.ts | producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard) | R1: the value is carried, not hard-coded: other releases round-trip verbatim through the reference, the note and the metadata",
  "tsx-engine-identity | test | test/workbench-reactivefiber-observer.test.ts | engine identity from result.provenance.sdk_versions (wb-693.1 R1, wb-693.2 R2, wb-693.3 R3) | R10: an object sdk_versions stating both engine entries adds one rf-engine reference per entry and one foreign-runtime note",
  "tsx-engine-identity | test | test/workbench-reactivefiber-observer.test.ts | engine identity from result.provenance.sdk_versions (wb-693.1 R1, wb-693.2 R2, wb-693.3 R3) | R10: the identities are carried, not hard-coded: other versions and fingerprints round-trip verbatim into their references",
];

/** The fields of vitest's JSON report the ordering guard reads; every other field is carried through untouched. */
interface ReportCase {
  readonly title: string;
  readonly ancestorTitles: readonly string[];
}
interface ReportFile {
  readonly name: string;
  readonly assertionResults: readonly ReportCase[];
}
interface ReportJson {
  readonly testResults: readonly ReportFile[];
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isReportCase = (value: unknown): value is ReportCase =>
  isRecord(value) && typeof value.title === "string" && Array.isArray(value.ancestorTitles) && value.ancestorTitles.every((title: unknown) => typeof title === "string");
const isReportJson = (value: unknown): value is ReportJson =>
  isRecord(value) &&
  Array.isArray(value.testResults) &&
  value.testResults.every((file: unknown) => isRecord(file) && typeof file.name === "string" && Array.isArray(file.assertionResults) && file.assertionResults.every(isReportCase));

installScratchLeakGuard();

describe("wb-693.9 ordering guard: the RF identity sentence is never a docs claim without the R1/R4 cases", () => {
  const scratch: string[] = [];
  afterEach(() => {
    removeScratch(...scratch.splice(0));
  });
  const OBSERVER_FILE = T("reactivefiber-observer");
  const identity = TABLE.find(row => row.row === "R4");
  const observer = TABLE.find(row => row.row === "R2")?.halves.find(half => half.id === "observer");
  const pinsOf = (halves: readonly Half[]): readonly Pin[] => halves.flatMap(half => half.pins);
  /** A report case is a pinned case when its title and whole describe path are the pin's. */
  const pinned = (test: ReportCase, entry: Pin): boolean => test.title === entry.title && JSON.stringify(test.ancestorTitles) === JSON.stringify(entry.suite ?? []);

  let read: ReportJson | undefined;
  /** The gate's own report, read once; the guard writes edited copies of the pinned file's module, never the report on disk. */
  const gateReport = (): ReportJson => {
    if (read === undefined) {
      const parsed: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
      if (!isReportJson(parsed)) throw new Error(`${DEFAULT_TIER_REPORT} does not have vitest's JSON reporter shape`);
      read = parsed;
    }
    return read;
  };

  /** Writes the gate's own report of the observer file, keeping the cases `keep` admits, under a scratch .forge directory, and judges each half over it (root = this repository). */
  function judgeOver(halves: readonly Half[], keep: (test: ReportCase) => boolean): readonly { readonly half: Half; readonly verdicts: readonly PinVerdict[] }[] {
    const report = gateReport();
    const modules = report.testResults.filter(file => file.name.endsWith(OBSERVER_FILE));
    expect(modules, `the gate's own report holds ${OBSERVER_FILE} once`).toHaveLength(1);
    const dir = makeScratch("census-693-9-");
    scratch.push(dir);
    mkdirSync(join(dir, ".forge"));
    const path = join(dir, ".forge", "vitest-report.json");
    writeFileSync(path, JSON.stringify({ ...report, testResults: modules.map(file => ({ ...file, assertionResults: file.assertionResults.filter(keep) })) }));
    return halves.map(half => ({ half, verdicts: judge(path, half.pins.map(entry => casePin(half, entry)), { root: ROOT }) }));
  }
  const codes = (judged: readonly { readonly verdicts: readonly PinVerdict[] }[]): string[] => judged.flatMap(({ verdicts }) => verdicts.map(verdict => verdict.code));

  it("ORDER: row R4 quotes the identity sentence verbatim and binds both halves to the R1/R4 cases by file, describe path, verbatim title and default tier, as frozen", () => {
    expect(identity?.section).toBe("ReactiveFiberCLI provider");
    expect(identity?.source).toBe("docs");
    expect(identity?.quote).toBe(FROZEN_IDENTITY_QUOTE);
    expect(identity?.halves.map(half => `${half.id}:${half.tier}:${half.reason ?? "pinned"}`)).toEqual(["producer-release:default-gate:pinned", "tsx-engine-identity:default-gate:pinned"]);
    expect(identity?.halves.flatMap(half => half.pins.map(entry => [half.id, tierCommand(half.tier), entry.file, (entry.suite ?? []).join(" > "), entry.title].join(" | ")))).toEqual(FROZEN_IDENTITY_BINDING);
  });

  it("ORDER: together, the live RF section states the sentence and every R4 pin reads ok over an unedited copy of the gate's own report of the observer file", () => {
    expect(identity !== undefined).toBe(true);
    if (identity === undefined) return;
    const section = docsSection(readRepo(DOCS_FILE), identity.section, 2, [DOCS_PARENT]);
    expect(section.ok, section.why).toBe(true);
    expect(section.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ")).toContain(renderedOf(FROZEN_IDENTITY_QUOTE));
    expect(codes(judgeOver(identity.halves, () => true))).toEqual(pinsOf(identity.halves).map(() => "ok"));
  });

  it("ORDER: with the R1/R4 cases removed from the gate's own report every R4 pin reads absent, naming the row, the file and the title, while the docs still state the sentence and R2's observer pins in the same file stay ok", () => {
    expect(identity !== undefined && observer !== undefined).toBe(true);
    if (identity === undefined || observer === undefined) return;
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    const pins = pinsOf(identity.halves);
    const withoutCases = (test: ReportCase): boolean => !pins.some(entry => pinned(test, entry));
    const absent = judgeOver(identity.halves, withoutCases);
    expect(codes(absent)).toEqual(pins.map(() => "absent"));
    const lines = absent.flatMap(({ half, verdicts }) => failures(identity, half, verdicts));
    expect(lines.map(line => line.slice(0, line.indexOf(": absent:")))).toEqual(["row R4/producer-release", "row R4/producer-release", "row R4/tsx-engine-identity", "row R4/tsx-engine-identity"]);
    for (const [index, entry] of pins.entries()) {
      expect(lines[index]).toContain(entry.file);
      expect(lines[index]).toContain(`"${entry.title}"`);
    }
    expect(codes(judgeOver([observer], withoutCases))).toEqual(observer.pins.map(() => "ok"));
  });
});
