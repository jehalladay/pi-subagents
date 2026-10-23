/**
 * wb-6hb.11 (VC-2/W07): census falsifier for docs/workbench/07-native-integrations.md, a census leg of the wb-nl8 census
 * tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is the 20th member of the
 * sequenced census class (owner ruling on the held R1, 2026-10-18: adopt the gate default, the wb-cax.24 precedent).
 *
 * The Forge, Furnace, HyperUnix, ReactiveFiberCLI, Beads and Agent provider sections and "Shared integration requirements"
 * state adapter rules in single paragraphs. This leg binds each falsifiable sentence (rows F1-F4, U1-U6, H1-H3, R1-R4,
 * B1-B2, A1, S1-S2, plus the DELTA-B-AMEND note rows U7 and U8) to existing cases by file, verbatim title and tier, or records it as
 * unpinned with a reason. It executes no pinned case and no test run: judge() from the shared helper
 * test/helpers/census.ts reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test` before the census step runs), so a pinned case counts only when the gate's own run collected it exactly
 * once (under its bound describe path where the row binds one), recorded it passed, and its body asserts - the helper's
 * three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case
 * therefore reads red, naming the row, the file, the title and the cause, as far as the helper's resolvable-construct
 * roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for
 * case calls itself: every title is located by the helper, from vitest's report, never from bare text.
 *
 * Row F4 (wb-4ap.10, COLLECTIVE-ADAPTATION-R10) is the Forge provider's gate.status basis sentence, bound clause by
 * clause to the collective-adaptation cases F9-F14 of test/workbench-forge-observer.test.ts. Its F9 pins are wb-4ap.1's
 * cases, so its derived-basis-echoed half reads red (absent) on every tree that does not carry them: the row lands after
 * wb-4ap.1.
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: each of the seven sections, under
 * its unique level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, must render
 * as exactly its frozen paragraph. A dropped or reworded clause names its row. The docs drift falsifiers run over a
 * SYNTHETIC document built from the frozen section bodies, never over the live docs/07 text, so a legitimate edit of an
 * unpinned section (RCP provider, the vertical journey) can never redden a falsifier row.
 *
 * Tiers: a row's tier names the report that vouches for it. The default report vouches for the default gate's test tier
 * only; judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)), so this leg never reports a live or native
 * pass from a title's presence. The two native-read cases (R2 and R5, native-rf-preview, run from vitest.rf.config.ts
 * against a real initialized workspace) are RECORDED with their tier and checked at FILE level only: the file exists, the
 * default report does not hold it (not-collected), and the default judge refuses it (tier-mismatch). NAMED RESIDUAL
 * NATIVE-TITLE: whether R2's case title is still registered is judged by no report this leg reads, and the leg says so
 * rather than counting the pin as covered. R5's native case is tied by title instead (wb-973.20): its pin must be the drift
 * helper's RF_LIVE_DRIFT_TITLE, the title the drift-wiring case R12-11 locates and freezes in the native file, so its source
 * registration is vouched by a case the gate's own report holds; that is still never a live pass (LIVE-RUN stays the drift
 * test's residual).
 *
 * Row R5 (wb-973.17, SWARM-CONTEXT-GRAPH-R17 (c)) binds the RF sentence on the contractSource release and the live drift
 * guard: the recorded release to the wb-2j3.12 carrier cases R2-1/R2-3, the guard's wiring to the wb-973.12 frozen-row
 * cases R12-11/R12-12, and the live guard itself to the native-read SCG-R12 row. Its quote and binding are frozen as
 * literals (rule 16), and the RF ANCHOR reads the live paragraph: every sentence of it is one RF row's quote or the one
 * named unbound sentence, so a row removed from every literal of this file (CT5/CT6) is still red against the docs. Its two
 * drift halves are anchored outside this file as well (wb-973.20, gate F3/F4): drift-native to the drift helper's
 * RF_LIVE_DRIFT_TITLE, drift-wiring to exactly the cases the gate's own report collects under the drift test's
 * RF_LIVE_DRIFT_SHAPE_SUITE describe, so a coordinated re-point or swap across TABLE and FROZEN_R5_BINDING is red.
 *
 * Rows R6-R9 (wb-973.16, SWARM-CONTEXT-GRAPH-R16 (a)-(d)) bind the RF sentences on the capability's two input arms and
 * render flags (the wb-973.1/.3 SCG-R1/R3 cases of the envelope audit), the operator-set swarm RF workspace root under the
 * unchanged reactivefiber:render grant with single-host scope (wb-973.4 S1/H1, wb-973.5's no-input-root case and its docs
 * census), the two hosted-agent locators on both hosts (wb-973.6/.7 SCG-R6/R7 and the W19 env-scrub seam cases, plus the
 * docs/13 Host-boundary section pin) and the frozen legacy argv (SCG-R3). Their quotes and bindings are frozen as literals
 * (rule 16), and the RECEIPT ANCHOR repeats every binding outside this file - receipts/wb-973.16.md, read through the
 * rendered view - so a pin, half or row removed from TABLE and from every literal here together still reds (CT5/CT6). A
 * renamed or deleted pinned case reds naming the row and its sentence (M5, DEL); docs/19's read example restates the arms.
 *
 * ORDERING GUARD (wb-693.9, RF-TSX-AND-EMBEDDING-R11): row R4 binds the RF sentence naming the "SDK package + revision"
 * fields the adapter records (provenance.cli_version, provenance.sdk_versions.tsx_runtime/tsx_sdk) to the cases that
 * assert them: the wb-693.1 R10 engine-identity cases and the wb-2j3.1 release cases, which absorbed requirement R4 under
 * owner ruling G-A (the release is an rf-cli evidence reference, never sourceVersion). The sentence is never a docs claim
 * without its cases: over the gate's own report with those cases removed, every R4 pin reads absent and the leg is red,
 * naming the row, while the docs still state the sentence. Row R4's quote and binding are frozen as literals (rule 16).
 *
 * Rows H3 and A1 (wb-kku9.1, MW-CAC-WORKFLOW-COMPOSITION-R1 (d)) bind the two observation-class sentences: the HyperUnix
 * provider's last sentence (an HX answer is an observation only) and the Agent provider's last sentence (a Claude call's
 * completion, transcript and session reference are observations only), one half per clause, to the cases of
 * test/workbench-observation-class-census.test.ts by file and verbatim title. "Agent provider" joined the frozen sections with
 * that sentence. Both rows' identities are frozen as literals (rule 16), and that census reads both sentences back from this
 * file and from the live docs/07 (its D1-D3), so a row removed from TABLE and from every literal here still reds there.
 *
 * Non-scope (no falsifiable adapter sentence, or covered by the docs/14 matrix): "MechanicalWorkflows is an ordinary
 * function library", "RCP provider", "First realistic vertical journey".
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";
import { RF_LIVE_DRIFT_SHAPE_SUITE, RF_LIVE_DRIFT_TITLE } from "./helpers/rf-release-drift.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

type Tier = "default-gate" | "native-read";
interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
  /** An it.each template pin: the least number of table rows its call site must register (CasePin.each.minCases). */
  readonly each?: number;
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
const eachPin = (name: string, title: string, minCases: number): Pin => ({ file: T(name), title, each: minCases });
const eachPinIn = (name: string, title: string, minCases: number, suite: readonly string[]): Pin => ({ file: T(name), title, suite, each: minCases });
const gate = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const whole = (pins: readonly Pin[]): readonly Half[] => [gate("whole", pins)];
const unpinned = (id: string, reason: string): Half => ({ id, tier: "default-gate", pins: [], reason });

/**
 * wb-4ap.10 (COLLECTIVE-ADAPTATION-R10): the one falsifiable sentence the Forge provider paragraph carries for the
 * gate.status reader's per-package basis and freshness word. Row F4 quotes it whole; FROZEN_F4 repeats it as a literal.
 */
const BASIS_SENTENCE =
  "The gate.status reader echoes the producer's per-package derived-verdict basis (last_result_state.invalidation_basis.derived_from) as the package snapshot basis, distinct from the workspace basis of WB-025 (02-atomic-requirements.md), and quotes the producer's freshness word verbatim; it never recomputes freshness, never fabricates a basis when the descriptor is absent or malformed, and freshness never confers current authority (authoritative_current alone does).";

/**
 * wb-973.17 (SWARM-CONTEXT-GRAPH-R17 (c)): the RF paragraph's sentence on the contractSource release and the live drift
 * guard. Row R5 quotes it whole; FROZEN_R5_QUOTE repeats it as a literal.
 */
const CONTRACT_SOURCE_SENTENCE = "The RF contractSource names the rf version of a recorded measurement receipt, and the rf-preview live tier guards drift against rf --version --json.";

/**
 * wb-973.16 (SWARM-CONTEXT-GRAPH-R16 (a)-(d)): the RF paragraph's four sentences on the capability's input arms, the swarm
 * RF workspace root, the hosted-agent locators and the frozen legacy argv. Rows R6-R9 quote them whole; FROZEN_R16 repeats
 * each as a literal (rule 16) and the receipt of record (receipts/wb-973.16.md) repeats every binding outside this file.
 */
const INPUT_ARMS_SENTENCE = "The RF capability accepts either {model, task} or {view, taskId} with an optional model, never both, and spawns only --no-commit --no-input --json renders.";
const WORKSPACE_ROOT_SENTENCE =
  "The swarm RF workspace root is an operator setting, workbench.reactivefiberWorkspaceRoot, under the unchanged reactivefiber:render grant, with single-host scope: multi-host use of a swarm workspace on a shared filesystem is unsupported and not safe.";
const LOCATORS_SENTENCE = "RF_WORKSPACE and SWARM_RF_WORKSPACE are the allowlisted operational names a hosted agent learns the swarm workspace from, identical on the embedded and the detached host.";
const LEGACY_ARGV_SENTENCE = "The legacy {model, task} argv is frozen byte for byte (SCG-R025).";

/**
 * wb-kku9.1 (MW-CAC-WORKFLOW-COMPOSITION-R1 (d)): the two observation-class sentences, the last of the HyperUnix and Agent
 * provider paragraphs. Rows H3 and A1 quote them whole; FROZEN_H3 and FROZEN_A1 repeat each row's identity as a literal.
 */
const HX_OBSERVATION_SENTENCE =
  "An HX answer is an observation only: the hyperunix.find reader adapter projects one hyperunix.query.snapshot whose evidence references are hx-binary and hx-coverage references only and no Beads, Forge, Furnace or Git kind or reference, and its one possible edge is the display grouping from the invoking operation the host names, so an HX answer never closes Beads work, passes a Forge gate or stands for a Furnace state or a Git basis.";
const AGENT_OBSERVATION_SENTENCE =
  "A Claude agent() call's completion, its transcript and its session reference are observations only: the Claude topology adapter projects claude.call, claude.session and claude.tool-use snapshots with partial or unknown coverage and no Forge, Furnace, Beads or Git snapshot, edge or reference, and a claude-message evidence read carries no status or verdict, so a failed Forge gate stays failed and an open Beads item stays open whatever the transcript says.";
/** The wb-kku9.1 census whose cases rows H3 and A1 bind (test/workbench-observation-class-census.test.ts). */
const OBSERVATION_CENSUS = "observation-class-census";

/** The seven frozen docs/07 section paragraphs, as the markdown source says them. */
const SECTION_MARKDOWN: Readonly<Record<string, string>> = {
  "Forge provider":
    `Use public Forge TypeScript App Server/facade or other current SDK. Initial functions: build/verification, affected/incremental selection, inspect artifact and operation. Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states. ${BASIS_SENTENCE} A successful RPC or shell exit does **not** equal verified Forge PASS. Prefer Forge first for gates, test, build and packaging. Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.`,
  "Furnace provider":
    "Use public TypeScript client for runs.start/get/status/events/pause/stop as verified. Native Run/Work/Attempt and supervision semantics remain Furnace's. Future idempotent ensure/reconcile and convenience wait methods are upstream targets, not an assumed API. Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly. A Furnace host may use ExecutorApp over the per-Attempt embedded bridge to call a MechanicalWorkflows function, with the application outcome mapped explicitly to the four-word Furnace execution result (only status is read; failure_class and data are not); failure and indeterminate park the Run rather than retrying, cancellation is a cooperative AbortSignal, and transport success is never domain verification.",
  "HyperUnix provider": `Use typed TS HX SDK/HXQ builder/results; preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence. Incomplete query cannot silently authorize "nothing to do" or produce false success. Graph query as observation enhancement is optional; HX is not mandatory UI event storage. ${HX_OBSERVATION_SENTENCE}`,
  "ReactiveFiberCLI provider":
    `Use actual public render/context APIs; present Python/CLI interop honestly if no production TypeScript SDK exists at selected revision. Do not declare a typed TS context-render client exists without code evidence. Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status. ${INPUT_ARMS_SENTENCE} ${WORKSPACE_ROOT_SENTENCE} ${LOCATORS_SENTENCE} ${LEGACY_ARGV_SENTENCE} For the shared "SDK package + revision" record, the RF adapter records the producer release that provenance.cli_version states as one rf-cli evidence reference, never as sourceVersion, and the TSX engine identity that provenance.sdk_versions.tsx_runtime/tsx_sdk state as one rf-engine evidence reference per entry. ${CONTRACT_SOURCE_SENTENCE} Fixture text is never reported as real generated context.`,
  "Beads provider":
    "Beads retains readiness, formulas and logical task dependencies. Workbench may inspect supported scopes and surface linked work; it does not store an authoritative second readiness DAG. No assumed stable Beads SDK if only other integration contracts are available.",
  "Agent provider": `Use Claude Agent SDK for workflow agent(). Role-specific tool catalogs may include restricted Forge/HX/Furnace/RF actions through the provider edges, not a universal all-tools conversion. Native Claude SDK hooks/session records remain first-class. ${AGENT_OBSERVATION_SENTENCE}`,
  "Shared integration requirements":
    "Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership. For a missing API, produce upstream feedback with smallest reproducer, accepted behavior, and explicit blocker. Avoid quietly writing a private reimplementation of an upstream feature.",
};
/** What a reader sees of each paragraph: the markdown source without its emphasis markers. */
const renderedOf = (markdown: string): string => markdown.replaceAll("**", "");
const SECTION_ORDER: readonly string[] = ["Forge provider", "Furnace provider", "HyperUnix provider", "ReactiveFiberCLI provider", "Beads provider", "Agent provider", "Shared integration requirements"];
const sectionBlocks = (heading: string): readonly RenderedBlock[] => {
  const markdown = SECTION_MARKDOWN[heading] ?? "";
  return [{ kind: "paragraph", text: renderedOf(markdown), markdown }];
};

const CAPABILITY_SUITE = "no native cancel: the typed capability-unavailable refusal quotes the measured surface, never a shell-out or a minted verb";
/** wb-693.9: the describe paths holding the R1/R4 cases row R4 binds (its pins bind the describe as well as the case). */
const RELEASE_SUITE = "producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard)";
const ENGINE_SUITE = "engine identity from result.provenance.sdk_versions (wb-693.1 R1, wb-693.2 R2, wb-693.3 R3)";
/** wb-973.17: the describe paths holding the carrier and frozen-row cases row R5 binds. */
const CARRIER_SUITE = "rf contractSource single carrier (wb-2j3.12, R2)";
const DRIFT_SHAPE_SUITE = "SCG-R12 frozen live row source shape (not a live-run claim)";
/** The live SCG-R12 drift row of the rf-preview tier (wb-973.12). */
const LIVE_DRIFT_TITLE = "SCG-R12 live drift guard: the installed rf version and the preview cli_version equal the release recorded in the contractSource carrier";
/** wb-973.16: the describe paths holding the SCG-R1/R3 (wb-973.1/.3), R4 (wb-973.4), R5 (wb-973.5) and R6/R7 (wb-973.6/.7) cases rows R6-R9 bind. */
const ARMS_SUITE = "SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3)";
const ROOT_SETTING_SUITE = "wb-973.4 reactivefiberWorkspaceRoot setting (S)";
const HOST_WIRING_SUITE = "wb-973.4 host wiring: the configured setting reaches the providers through the real extension (H)";
const NO_INPUT_ROOT_SUITE = "SCG-R5 AC1 (wb-973.5): no capability input names the RF workspace root";
const SHARED_FS_SUITE = "SCG-R5 AC4 (wb-973.5): docs/workbench never presents a shared-filesystem swarm workspace as safe";
const SHARED_FS_RENDERED_SUITE = "SCG-R5 AC4 rendered view (wb-973.5 respin): docs/workbench as a reader sees it";
const LOCATORS_SUITE = "SCG-R6/R7: the swarm rf workspace locators (wb-973.6, wb-973.7)";
const ENV_HARNESS_SUITE = "W19 env-scrub census: harness sanity (plain, must pass)";
const ENV_SEAMS_SUITE = "W19 env-scrub census: SCG-R6 rf workspace locators reach the SDK child equally at both seams (wb-973.6)";
/** The docs/13 Host-boundary section pin of the shared-filesystem census: it pins the hosted-agent channel and root paragraphs whole. */
const HOST_BOUNDARY_TITLE = 'SCG-R5: docs/13 section "Host boundary" is the unique heading of that name under the page title, renders exactly the pinned blocks and carries no HTML';

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
    row: "F4",
    section: "Forge provider",
    source: "docs",
    quote: BASIS_SENTENCE,
    // One half per clause, in the sentence's order. The F9 pins are wb-4ap.1's cases (COLLECTIVE-ADAPTATION-R1, the reader
    // adapter describe of the observer test); every other pin is landed. A renamed, deleted or skipped pin reads red,
    // naming row F4 and its half.
    halves: [
      gate("derived-basis-echoed", [
        pin("forge-observer", "F9 (wb-4ap.1): the measured STALE row carries its derived_from digest B as the package subjectBasis, never its source_digest A"),
        pin("forge-observer", "F9 (wb-4ap.1): each digest shape native-evidence accepts - sha256-prefixed, bare 64-hex and dirty-tree/v1 - round-trips verbatim as subjectBasis"),
        pin("forge-observer", "F9 (wb-4ap.1) L3: a projection refresh applies the basis-bearing package snapshot and a basis query on B returns that package node alone"),
        pin("forge-observer", "F9 (wb-4ap.1) static pin: the forgeGateTopology doc comment states no interval or definitionDigest and that the published per-package basis is echoed, never that gate.status carries no basis"),
      ]),
      gate("workspace-basis-distinct", [
        pin("forge-observer", "wb-4ap.4 never-case: mixed [HISTORICAL, stale] under a workspace source_snapshot_id/gated_tree - only the described row has a basis, B, and the workspace digest appears nowhere"),
      ]),
      gate("freshness-quoted", [
        pin("forge-observer", "F10 (wb-4ap.2): the measured STALE row and a CURRENT row each quote their own word after the unchanged native text and authority label"),
      ]),
      gate("never-recomputed", [pin("forge-observer", "F14 (wb-4ap.6): basis(A, A) with STALE renders STALE and basis(A, B) with CURRENT renders CURRENT, the tone still unknown")]),
      gate("absent-no-basis", [pin("forge-observer", "F12 (wb-4ap.4): reading(SOURCE) keeps the F8 node literal, no subjectBasis and the 9df9a03 diagnostics (none)")]),
      gate("malformed-no-basis", [
        eachPin("forge-observer", "F11 (wb-4ap.3): %s sets no subjectBasis, pushes exactly one withheld-basis diagnostic for the ref and renders basis UNKNOWN", 6),
        pin("forge-observer", "F11 (wb-4ap.3): no malformed text reaches the result - neither the bad derived_from nor either digest of the withheld basis"),
      ]),
      gate("no-current-authority", [
        pin("forge-observer", "F13 (wb-4ap.5): withPackages(current) keeps unknown tone, partial coverage, the historical label and the workspace literal"),
      ]),
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
    row: "H3",
    section: "HyperUnix provider",
    source: "docs",
    quote: HX_OBSERVATION_SENTENCE,
    // wb-kku9.1: one half per clause, in the sentence's order, bound to the observation-class census (its rows B, R and C).
    halves: [
      gate("no-authority-kind-or-reference", [pin(OBSERVATION_CENSUS, "B1: hyperunixTopology over hyperunix.find/v1 readings of every read kind, whose rows name tracker, gate, run and repository paths, carries no beads, forge, furnace or git kind, reference or edge")]),
      gate("host-grouping-only", [pin(OBSERVATION_CENSUS, "R1 R-HOST-OPERATION: the HX adapter echoes the operation the host names as its display grouping, and no src module calls either topology adapter")]),
      gate("never-an-authority", [pin(OBSERVATION_CENSUS, "C1: the module graph: the observation class, the authority modules and the five holders are the measured rosters and no edge joins the first two outside the holders")]),
    ],
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
    // wb-973.17 (SWARM-CONTEXT-GRAPH-R17 (c)): the release half is the wb-2j3.12 carrier cases, the wiring half the
    // wb-973.12 frozen-row cases; the live guard itself runs only in the rf-preview tier and is recorded, never judged.
    row: "R5",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: CONTRACT_SOURCE_SENTENCE,
    halves: [
      gate("recorded-release", [
        pin("rf-contract-carrier", "R2-1: both registered descriptors expose the identical contractSource, and it is the exported carrier", [CARRIER_SUITE]),
        pin("rf-contract-carrier", "R2-3: the carrier's release component string-equals the release the R8 receipt row of record stamped, over the verified schema", [CARRIER_SUITE]),
      ]),
      gate("drift-wiring", [
        pin("rf-release-drift", "R12-11 the row and imports match the independent frozen AST at direct describe/it placement", [DRIFT_SHAPE_SUITE]),
        pin("rf-release-drift", "R12-12 a missing workspace guard, renamed row, or commented string cannot satisfy the frozen AST", [DRIFT_SHAPE_SUITE]),
      ]),
      { id: "drift-native", tier: "native-read", pins: [pin("native-rf-preview", LIVE_DRIFT_TITLE)] },
    ],
  },
  {
    // wb-973.16 (SWARM-CONTEXT-GRAPH-R16 (a)): the two input arms are wb-973.1's SCG-R1 cases, the render flags wb-973.3's
    // SCG-R3 admitted-shape table; every pin binds the shared describe of the envelope audit.
    row: "R6",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: INPUT_ARMS_SENTENCE,
    halves: [
      gate("two-arms", [
        pin("provider-envelope-audit", "SCG-R1: the descriptor advertises the two arms as one exclusive oneOf, the legacy arm unchanged", [ARMS_SUITE]),
        pin("provider-envelope-audit", "SCG-R1: {view,taskId} spawns the served --view --task-id argv", [ARMS_SUITE]),
        pin("provider-envelope-audit", "SCG-R1: {view,taskId,model} carries --model after --task-id", [ARMS_SUITE]),
      ]),
      gate("never-both", [eachPinIn("provider-envelope-audit", "SCG-R1: the mixed shape %s is refused at input validation and never spawns rf", 6, [ARMS_SUITE])]),
      gate("render-flags-only", [eachPinIn("provider-envelope-audit", "SCG-R3: the admitted shape %s ends with --no-commit --no-input --json and adds no unserved selector", 3, [ARMS_SUITE])]),
    ],
  },
  {
    // wb-973.16 (R16 (b)): the operator setting is wb-973.4's S1/H1 and wb-973.5's no-input-names-the-root case, the
    // unchanged grant wb-973.3's descriptor case, the single-host scope wb-973.5's docs census over docs/workbench.
    row: "R7",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: WORKSPACE_ROOT_SENTENCE,
    halves: [
      gate("operator-setting", [
        pin("swarm-rf-workspace", "S1: accepts an absolute path and retains it beside the Claude executor selection", [ROOT_SETTING_SUITE]),
        pin("swarm-rf-workspace", "H1: with C configured, a workflow node's RF render spawns rf with --workspace C, and the envelope naming C validates", [HOST_WIRING_SUITE]),
        pin("rf-workspace-root", "SCG-R5: both input arms keep additionalProperties:false and declare no path-shaped property", [NO_INPUT_ROOT_SUITE]),
      ]),
      gate("unchanged-grant", [pin("provider-envelope-audit", "SCG-R3: both registered descriptors keep effectClass read, the render permission and invoke-only modes", [ARMS_SUITE])]),
      gate("single-host-scope", [
        pin("docs-shared-filesystem-census", "SCG-R5: docs/13 holds exactly one ADR-SCG-010 sentence, naming the RF workspace root with single-host, local-coordinated scope", [SHARED_FS_SUITE]),
        pin("docs-shared-filesystem-census", "SCG-R5: every sentence naming NFS, EFS, a shared filesystem or multi-host use says unsupported or not safe, and claims no safety", [SHARED_FS_SUITE]),
      ]),
      gate("documented-root", [pin("docs-shared-filesystem-census", HOST_BOUNDARY_TITLE, [SHARED_FS_RENDERED_SUITE])]),
    ],
  },
  {
    // wb-973.16 (R16 (c)): the allowlist is wb-973.7's set-equality case and the env-scrub harness member row, both hosts
    // the W19 env-scrub SCG-R6 seam cases, and the documented channel the docs/13 Host-boundary section pin.
    row: "R8",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: LOCATORS_SENTENCE,
    halves: [
      gate("allowlisted-names", [
        pin("process-env", "SCG-R7: DETACHED_HOST_ENV_ALLOWLIST equals the 9df9a03 list plus exactly RF_WORKSPACE and SWARM_RF_WORKSPACE (set equality; any third addition is red)", [LOCATORS_SUITE]),
        pin("env-scrub-census", "the allowlist of record names the two rf workspace locators and neither is credential-shaped (SCG-R6 MEMBERS, names only)", [ENV_HARNESS_SUITE]),
      ]),
      gate("both-hosts", [
        pin("env-scrub-census", "local-detached.ts spawn carries RF_WORKSPACE and SWARM_RF_WORKSPACE with the parent's values and stays allowlist-only", [ENV_SEAMS_SUITE]),
        pin("env-scrub-census", "claude-host.ts builds the SDK Options with no env override, so the SDK CLI child inherits process.env carrying both locators", [ENV_SEAMS_SUITE]),
        pin("env-scrub-census", "both seams answer equally: the detached child is handed exactly what the embedded child inherits, for each locator", [ENV_SEAMS_SUITE]),
      ]),
      gate("documented-channel", [pin("docs-shared-filesystem-census", HOST_BOUNDARY_TITLE, [SHARED_FS_RENDERED_SUITE])]),
    ],
  },
  {
    // wb-973.16 (R16 (d)): the frozen legacy argv is wb-973.3's byte-identity case.
    row: "R9",
    section: "ReactiveFiberCLI provider",
    source: "docs",
    quote: LEGACY_ARGV_SENTENCE,
    halves: whole([pin("provider-envelope-audit", "SCG-R3: the legacy argv is byte-identical to the measured 0.1.583 form", [ARMS_SUITE])]),
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
    row: "A1",
    section: "Agent provider",
    source: "docs",
    quote: AGENT_OBSERVATION_SENTENCE,
    // wb-kku9.1: one half per clause, in the sentence's order, bound to the observation-class census (its row A).
    halves: [
      gate("claude-snapshots-only", [pin(OBSERVATION_CENSUS, "A1: a succeeded Claude SDK run whose transcript says fixed and PASS settles ok and projects only claude.* snapshots, each with partial or unknown coverage")]),
      gate("no-authority-snapshot-edge-or-reference", [pin(OBSERVATION_CENSUS, "A2: that projection names no forge, furnace, beads or git provider in any snapshot, edge or evidence reference, and no transcript claim reaches it")]),
      gate("evidence-without-verdict", [pin(OBSERVATION_CENSUS, "A4: the transcript message the session lists reads as a claude-message preview with no status, verdict or authority field, whatever the message claims")]),
      gate("authority-unchanged", [pin(OBSERVATION_CENSUS, "A3: applying that projection beside a failed Forge gate and an open bd item leaves both nodes and their edges exactly as they were")]),
    ],
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

const ROW_IDS: readonly string[] = ["F1", "F2", "F3", "F4", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "H1", "H2", "H3", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "B1", "B2", "A1", "S1", "S2"];
/** Every half that has no landed case, as "row/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = ["F3/whole", "U7/events", "U8/negative-verbs", "R3/whole", "S1/owner-basis", "S1/observed-evidence", "S1/trace-correlation-recorded"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The forge.toml command whose own run must vouch for a half; a native-read label names no report this leg reads. */
const tierCommand = (tier: Tier): string => (tier === "default-gate" ? DEFAULT_GATE_TIER : tier);
const casePin = (half: Half, entry: Pin): CasePin => ({
  file: entry.file,
  title: entry.title,
  tier: tierCommand(half.tier),
  ...(entry.suite === undefined ? {} : { suite: entry.suite }),
  ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }),
});

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
  "F4/derived-basis-echoed:4",
  "F4/workspace-basis-distinct:1",
  "F4/freshness-quoted:1",
  "F4/never-recomputed:1",
  "F4/absent-no-basis:1",
  "F4/malformed-no-basis:2",
  "F4/no-current-authority:1",
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
  "H3/no-authority-kind-or-reference:1",
  "H3/host-grouping-only:1",
  "H3/never-an-authority:1",
  "R1/whole:2",
  "R2/observer:3",
  "R4/producer-release:2",
  "R4/tsx-engine-identity:2",
  "R5/recorded-release:2",
  "R5/drift-wiring:2",
  "R6/two-arms:3",
  "R6/never-both:1",
  "R6/render-flags-only:1",
  "R7/operator-setting:3",
  "R7/unchanged-grant:1",
  "R7/single-host-scope:2",
  "R7/documented-root:1",
  "R8/allowlisted-names:2",
  "R8/both-hosts:3",
  "R8/documented-channel:1",
  "R9/whole:1",
  "B1/whole:2",
  "B2/whole:2",
  "A1/claude-snapshots-only:1",
  "A1/no-authority-snapshot-edge-or-reference:1",
  "A1/evidence-without-verdict:1",
  "A1/authority-unchanged:1",
  "S1/sdk-revision:1",
  "S1/native-operation-ids:1",
  "S1/error-taxonomy:1",
  "S1/trace-correlation-boundary:1",
  "S1/cancellation-timeout:1",
  "S1/cleanup-ownership:1",
  "S2/furnace-verbs:1",
  "S2/forge-capability:2",
];

/**
 * wb-4ap.10 (standing rule 16): row F4's identity frozen as a literal, never derived from TABLE - its sentence whole, then
 * every pin as "half | file | title" (an it.each pin adds its table-row floor) - so a shortened sentence, a deleted pin or a
 * pin swapped for an unrelated passing case cannot pass.
 */
const FROZEN_F4: readonly string[] = [
  "quote | The gate.status reader echoes the producer's per-package derived-verdict basis (last_result_state.invalidation_basis.derived_from) as the package snapshot basis, distinct from the workspace basis of WB-025 (02-atomic-requirements.md), and quotes the producer's freshness word verbatim; it never recomputes freshness, never fabricates a basis when the descriptor is absent or malformed, and freshness never confers current authority (authoritative_current alone does).",
  "derived-basis-echoed | test/workbench-forge-observer.test.ts | F9 (wb-4ap.1): the measured STALE row carries its derived_from digest B as the package subjectBasis, never its source_digest A",
  "derived-basis-echoed | test/workbench-forge-observer.test.ts | F9 (wb-4ap.1): each digest shape native-evidence accepts - sha256-prefixed, bare 64-hex and dirty-tree/v1 - round-trips verbatim as subjectBasis",
  "derived-basis-echoed | test/workbench-forge-observer.test.ts | F9 (wb-4ap.1) L3: a projection refresh applies the basis-bearing package snapshot and a basis query on B returns that package node alone",
  "derived-basis-echoed | test/workbench-forge-observer.test.ts | F9 (wb-4ap.1) static pin: the forgeGateTopology doc comment states no interval or definitionDigest and that the published per-package basis is echoed, never that gate.status carries no basis",
  "workspace-basis-distinct | test/workbench-forge-observer.test.ts | wb-4ap.4 never-case: mixed [HISTORICAL, stale] under a workspace source_snapshot_id/gated_tree - only the described row has a basis, B, and the workspace digest appears nowhere",
  "freshness-quoted | test/workbench-forge-observer.test.ts | F10 (wb-4ap.2): the measured STALE row and a CURRENT row each quote their own word after the unchanged native text and authority label",
  "never-recomputed | test/workbench-forge-observer.test.ts | F14 (wb-4ap.6): basis(A, A) with STALE renders STALE and basis(A, B) with CURRENT renders CURRENT, the tone still unknown",
  "absent-no-basis | test/workbench-forge-observer.test.ts | F12 (wb-4ap.4): reading(SOURCE) keeps the F8 node literal, no subjectBasis and the 9df9a03 diagnostics (none)",
  "malformed-no-basis | test/workbench-forge-observer.test.ts | F11 (wb-4ap.3): %s sets no subjectBasis, pushes exactly one withheld-basis diagnostic for the ref and renders basis UNKNOWN | each >= 6",
  "malformed-no-basis | test/workbench-forge-observer.test.ts | F11 (wb-4ap.3): no malformed text reaches the result - neither the bad derived_from nor either digest of the withheld basis",
  "no-current-authority | test/workbench-forge-observer.test.ts | F13 (wb-4ap.5): withPackages(current) keeps unknown tone, partial coverage, the historical label and the workspace literal",
];
/** A row's identity in FROZEN_F4's form: the sentence, then one line per pin. */
const identityOf = (row: Row): string[] => [
  `quote | ${row.quote}`,
  ...row.halves.flatMap(half => half.pins.map(entry => `${half.id} | ${entry.file} | ${entry.title}${entry.each === undefined ? "" : ` | each >= ${entry.each}`}`)),
];
/** wb-kku9.1 (standing rule 16): rows H3 and A1 in FROZEN_F4's form, never derived from TABLE or the sentence constants. */
const FROZEN_H3: readonly string[] = [
  "quote | An HX answer is an observation only: the hyperunix.find reader adapter projects one hyperunix.query.snapshot whose evidence references are hx-binary and hx-coverage references only and no Beads, Forge, Furnace or Git kind or reference, and its one possible edge is the display grouping from the invoking operation the host names, so an HX answer never closes Beads work, passes a Forge gate or stands for a Furnace state or a Git basis.",
  "no-authority-kind-or-reference | test/workbench-observation-class-census.test.ts | B1: hyperunixTopology over hyperunix.find/v1 readings of every read kind, whose rows name tracker, gate, run and repository paths, carries no beads, forge, furnace or git kind, reference or edge",
  "host-grouping-only | test/workbench-observation-class-census.test.ts | R1 R-HOST-OPERATION: the HX adapter echoes the operation the host names as its display grouping, and no src module calls either topology adapter",
  "never-an-authority | test/workbench-observation-class-census.test.ts | C1: the module graph: the observation class, the authority modules and the five holders are the measured rosters and no edge joins the first two outside the holders",
];
const FROZEN_A1: readonly string[] = [
  "quote | A Claude agent() call's completion, its transcript and its session reference are observations only: the Claude topology adapter projects claude.call, claude.session and claude.tool-use snapshots with partial or unknown coverage and no Forge, Furnace, Beads or Git snapshot, edge or reference, and a claude-message evidence read carries no status or verdict, so a failed Forge gate stays failed and an open Beads item stays open whatever the transcript says.",
  "claude-snapshots-only | test/workbench-observation-class-census.test.ts | A1: a succeeded Claude SDK run whose transcript says fixed and PASS settles ok and projects only claude.* snapshots, each with partial or unknown coverage",
  "no-authority-snapshot-edge-or-reference | test/workbench-observation-class-census.test.ts | A2: that projection names no forge, furnace, beads or git provider in any snapshot, edge or evidence reference, and no transcript claim reaches it",
  "evidence-without-verdict | test/workbench-observation-class-census.test.ts | A4: the transcript message the session lists reads as a claude-message preview with no status, verdict or authority field, whatever the message claims",
  "authority-unchanged | test/workbench-observation-class-census.test.ts | A3: applying that projection beside a failed Forge gate and an open bd item leaves both nodes and their edges exactly as they were",
];

const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

/** wb-973.17 (rule 16): row R5's quote and binding as literals, never derived from TABLE, so a shortened quote, a dropped, swapped or re-homed pin or a relabelled tier reads red. */
const FROZEN_R5_QUOTE = "The RF contractSource names the rf version of a recorded measurement receipt, and the rf-preview live tier guards drift against rf --version --json.";
const FROZEN_R5_BINDING: readonly string[] = [
  "recorded-release | test | test/workbench-rf-contract-carrier.test.ts | rf contractSource single carrier (wb-2j3.12, R2) | R2-1: both registered descriptors expose the identical contractSource, and it is the exported carrier",
  "recorded-release | test | test/workbench-rf-contract-carrier.test.ts | rf contractSource single carrier (wb-2j3.12, R2) | R2-3: the carrier's release component string-equals the release the R8 receipt row of record stamped, over the verified schema",
  "drift-wiring | test | test/workbench-rf-release-drift.test.ts | SCG-R12 frozen live row source shape (not a live-run claim) | R12-11 the row and imports match the independent frozen AST at direct describe/it placement",
  "drift-wiring | test | test/workbench-rf-release-drift.test.ts | SCG-R12 frozen live row source shape (not a live-run claim) | R12-12 a missing workspace guard, renamed row, or commented string cannot satisfy the frozen AST",
  "drift-native | native-read | test/workbench-native-rf-preview.test.ts |  | SCG-R12 live drift guard: the installed rf version and the preview cli_version equal the release recorded in the contractSource carrier",
];
/**
 * wb-973.17 (rule 16 anchor): the one sentence of the live RF paragraph no row binds - a posture sentence (use the public
 * APIs, present the interop honestly) that states no adapter rule a case can falsify; R3 binds the falsifiable sentence
 * after it. Every other sentence of the live paragraph must be an RF row's quote.
 */
const RF_UNBOUND_SENTENCES: readonly string[] = ["Use actual public render/context APIs; present Python/CLI interop honestly if no production TypeScript SDK exists at selected revision."];
/** A rendered paragraph's sentences: split after a full stop that a space and a capital letter follow. */
const sentencesOf = (text: string): string[] => text.split(/(?<=\.) (?=[A-Z])/u);

describe("wb-6hb.11 docs/workbench/07 provider-rules census (report mode)", () => {
  it("AC1: the table holds the twenty-nine frozen rows in order, deeply frozen, each quote verbatim in its section's source", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(row => row.row)).toEqual(ROW_IDS);
    expect(TABLE).toHaveLength(29);
    expect(JUDGED.map(({ row, half }) => `${row.row}/${half.id}:${half.pins.length}`)).toEqual(FROZEN_JUDGED_SHAPE);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the seven sections are the seven the table names, and the frozen bodies render exactly (HTML-free, whole-section equality)", () => {
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

  it("AC1 (wb-4ap.10): row F4 quotes the whole Forge basis sentence and binds every clause to F9-F14 by file and verbatim title, frozen as a literal", () => {
    const row = TABLE.find(candidate => candidate.row === "F4");
    expect(row).toBeDefined();
    if (row === undefined) return;
    expect(identityOf(row)).toEqual(FROZEN_F4);
    expect(row.halves.every(half => half.tier === "default-gate" && half.reason === undefined)).toBe(true);
    // The sentence is the paragraph's own: one whole sentence of the Forge provider source, between two others.
    const markdown = SECTION_MARKDOWN["Forge provider"] ?? "";
    expect(markdown.split(`partial/unknown states. ${row.quote} A successful RPC`)).toHaveLength(2);
    const families = new Set(row.halves.flatMap(half => half.pins.map(entry => /^F\d+/.exec(entry.title)?.[0] ?? "")));
    for (const family of ["F9", "F10", "F11", "F12", "F13", "F14"]) expect(families.has(family), family).toBe(true);
  });

  it("AC1 (wb-973.17): row R5 quotes the contractSource sentence whole and binds the recorded release, the drift wiring and the live drift row by file, describe path, verbatim title and tier, frozen as literals", () => {
    const row = TABLE.find(candidate => candidate.row === "R5");
    expect(row).toBeDefined();
    if (row === undefined) return;
    expect(row.section).toBe("ReactiveFiberCLI provider");
    expect(row.source).toBe("docs");
    expect(row.quote).toBe(FROZEN_R5_QUOTE);
    expect(row.halves.map(half => `${half.id}:${half.tier}:${half.reason ?? "pinned"}`)).toEqual(["recorded-release:default-gate:pinned", "drift-wiring:default-gate:pinned", "drift-native:native-read:pinned"]);
    expect(row.halves.flatMap(half => half.pins.map(entry => [half.id, tierCommand(half.tier), entry.file, (entry.suite ?? []).join(" > "), entry.title].join(" | ")))).toEqual(FROZEN_R5_BINDING);
  });

  it("AC1 (wb-kku9.1): rows H3 and A1 quote the observation-class sentences whole, each its paragraph's last sentence, and bind every clause to the observation-class census by file and verbatim title, frozen as literals", () => {
    let checked = 0;
    for (const [id, frozen, section] of [["H3", FROZEN_H3, "HyperUnix provider"], ["A1", FROZEN_A1, "Agent provider"]] as const) {
      const row = TABLE.find(candidate => candidate.row === id);
      expect(row, id).toBeDefined();
      if (row === undefined) continue;
      expect(row.section).toBe(section);
      expect(row.source).toBe("docs");
      expect(identityOf(row)).toEqual(frozen);
      expect(row.halves.every(half => half.tier === "default-gate" && half.reason === undefined && half.pins.every(entry => entry.file === T(OBSERVATION_CENSUS)))).toBe(true);
      expect((SECTION_MARKDOWN[section] ?? "").endsWith(` ${row.quote}`), `${id} closes the ${section} paragraph`).toBe(true);
      checked += 1;
    }
    expect(checked).toBe(2);
  });

  it("RF anchor (wb-973.17, rule 16): every sentence of the LIVE ReactiveFiberCLI paragraph is one RF row's quote or the one named unbound sentence, read from the document, never from SECTION_MARKDOWN", () => {
    const section = docsSection(readRepo(DOCS_FILE), "ReactiveFiberCLI provider", 2, [DOCS_PARENT]);
    expect(section.ok, section.why).toBe(true);
    const sentences = sentencesOf(section.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" "));
    const quotes = TABLE.filter(row => row.section === "ReactiveFiberCLI provider" && row.source === "docs").map(row => renderedOf(row.quote));
    expect(sentences.filter(sentence => !quotes.includes(sentence) && !RF_UNBOUND_SENTENCES.includes(sentence))).toEqual([]);
    for (const quote of quotes) expect(sentences.filter(sentence => sentence === quote), quote).toHaveLength(1);
    for (const unbound of RF_UNBOUND_SENTENCES) expect(sentences.filter(sentence => sentence === unbound), unbound).toHaveLength(1);
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
    expect(NATIVE.map(({ row, half }) => `${row.row}/${half.id}`)).toEqual(["R2/native-preview", "R5/drift-native"]);
    let checked = 0;
    for (const native of NATIVE) {
      expect(native.half.pins, `${native.row.row}/${native.half.id}`).toHaveLength(1);
      const entry = native.half.pins[0];
      if (entry === undefined) continue;
      expect(entry.file).toBe(NATIVE_FILE);
      expect(existsSync(join(ROOT, entry.file)), `${entry.file} is the native tier's file`).toBe(true);
      const [asNative] = judge(REPORT, [casePin(native.half, entry)]);
      expect(asNative?.code, "a native-read pin is never carried by the default report").toBe("tier-mismatch");
      const [asDefault] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER }]);
      expect(asDefault?.code, "the native file is not in the default gate's report").toBe("not-collected");
      checked += 1;
    }
    expect(checked).toBe(2);
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

  it("M4 (wb-4ap.10): every row-F4 pin renamed by one character is absent from the report and red, naming row F4, its half, the file and the title", () => {
    const row = TABLE.find(candidate => candidate.row === "F4");
    const pins = row === undefined ? [] : row.halves.flatMap(half => half.pins.map(entry => ({ half, entry })));
    expect(pins).toHaveLength(11);
    if (row === undefined) return;
    for (const { half, entry } of pins) {
      const wrong = { ...entry, title: `${entry.title}.` };
      const verdicts = judge(REPORT, [casePin(half, wrong)]);
      expect(verdicts[0]?.code, wrong.title).toBe("absent");
      const [line] = failures(row, half, verdicts);
      expect(line, wrong.title).toContain(`row F4/${half.id}`);
      expect(line, wrong.title).toContain(entry.file);
      expect(line, wrong.title).toContain(wrong.title);
    }
  });

  it("M5 (wb-kku9.1): every row-H3 and row-A1 pin renamed by one character is absent from the report and red, naming its row, its half, the file and the title", () => {
    let checked = 0;
    for (const id of ["H3", "A1"]) {
      const row = TABLE.find(candidate => candidate.row === id);
      if (row === undefined) continue;
      for (const half of row.halves) {
        for (const entry of half.pins) {
          const wrong = { ...entry, title: `${entry.title}.` };
          const verdicts = judge(REPORT, [casePin(half, wrong)]);
          expect(verdicts[0]?.code, wrong.title).toBe("absent");
          const [line] = failures(row, half, verdicts);
          expect(line, wrong.title).toContain(`row ${id}/${half.id}`);
          expect(line, wrong.title).toContain(entry.file);
          expect(line, wrong.title).toContain(wrong.title);
          checked += 1;
        }
      }
    }
    expect(checked).toBe(7);
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

  it("accepts the seven sections exactly as written, at EOF and bounded by a following level-2 heading", () => {
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

  it("K4 (wb-4ap.10) names row F4 (and only it) when the basis sentence lets the reader fabricate a basis", () => {
    const lines = docsFailures(synthetic(edit("Forge provider", "never fabricates a basis when", "may fabricate a basis when")));
    expect(named(lines)).toEqual(["row F4"]);
    expect(lines.some(line => line.includes("Forge provider is not exactly its frozen paragraph"))).toBe(true);
  });

  it("K5 (wb-kku9.1) names row H3 (and only it) when the HX answer sentence lets an answer close Beads work", () => {
    const lines = docsFailures(synthetic(edit("HyperUnix provider", "so an HX answer never closes Beads work", "so an HX answer may close Beads work")));
    expect(named(lines)).toEqual(["row H3"]);
    expect(lines.some(line => line.includes("HyperUnix provider is not exactly its frozen paragraph"))).toBe(true);
  });

  it("K6 (wb-kku9.1) names row A1 (and only it) when the Agent sentence lets the transcript pass a failed gate", () => {
    const lines = docsFailures(synthetic(edit("Agent provider", "so a failed Forge gate stays failed", "so a failed Forge gate may pass")));
    expect(named(lines)).toEqual(["row A1"]);
    expect(lines.some(line => line.includes("Agent provider is not exactly its frozen paragraph"))).toBe(true);
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

/** The drift test file whose frozen live row source-shape describe the R5 drift-wiring half binds. */
const DRIFT_FILE = T("rf-release-drift");
/** One pin as "file | describe path | title", the form both anchors compare. */
const pinLine = (entry: Pin): string => `${entry.file} | ${(entry.suite ?? []).join(" > ")} | ${entry.title}`;

/**
 * wb-973.20 (gate F3/F4 on the wb-973.17 first cut, rule 16 LEG 2): row R5's two drift halves anchored OUTSIDE this file's
 * literals. TABLE and FROZEN_R5_BINDING alone are self-anchoring: a coordinated edit of both re-pointed R5/drift-native at another
 * title (L2-1a/L2-1b) and swapped R5/drift-wiring's R12-12 for the passing R12-3 (L2-4), and the leg stayed green. The live
 * title and the frozen-shape describe are the drift helper's (test/helpers/rf-release-drift.ts), and the drift test consumes
 * both: R12-11 locates and freezes the native row by RF_LIVE_DRIFT_TITLE, and its frozen-shape describe is registered under
 * RF_LIVE_DRIFT_SHAPE_SUITE. The wiring half must equal what the gate's own report collects under that describe.
 */
describe("wb-973.20 row R5 drift anchors outside the census literals (gate F3 drift-native, F4 drift-wiring)", () => {
  const halfOf = (id: string): Half | undefined => TABLE.find(row => row.row === "R5")?.halves.find(half => half.id === id);

  it("F3: R5/drift-native names the frozen live title the drift-wiring case R12-11 locates and freezes in the native file, never another row of that file or a title no file registers", () => {
    expect(halfOf("drift-native")?.pins.map(pinLine)).toEqual([`${NATIVE_FILE} |  | ${RF_LIVE_DRIFT_TITLE}`]);
    expect(LIVE_DRIFT_TITLE).toBe(RF_LIVE_DRIFT_TITLE);
  });

  it("F4: R5/drift-wiring binds exactly the cases the gate's own report collects under the drift test's frozen live row source-shape describe, in report order, never a passing case of another describe", () => {
    expect(DRIFT_SHAPE_SUITE).toBe(RF_LIVE_DRIFT_SHAPE_SUITE);
    const parsed: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
    if (!isReportJson(parsed)) throw new Error(`${DEFAULT_TIER_REPORT} does not have vitest's JSON reporter shape`);
    const modules = parsed.testResults.filter(file => file.name.endsWith(DRIFT_FILE));
    expect(modules, `the gate's own report holds ${DRIFT_FILE} once`).toHaveLength(1);
    const collected = (modules[0]?.assertionResults ?? [])
      .filter(test => JSON.stringify(test.ancestorTitles) === JSON.stringify([RF_LIVE_DRIFT_SHAPE_SUITE]))
      .map(test => `${DRIFT_FILE} | ${test.ancestorTitles.join(" > ")} | ${test.title}`);
    expect(collected.length, "the frozen-shape describe collects its cases in the gate's own report").toBeGreaterThan(0);
    expect(halfOf("drift-wiring")?.pins.map(pinLine)).toEqual(collected);
  });
});

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

/** wb-973.16: a row's binding as one line per pin - half, tier command, file, describe path, title, then any table-row floor. */
const bindingOf = (row: Row): string[] =>
  row.halves.flatMap(half =>
    half.pins.map(entry => `${[half.id, tierCommand(half.tier), entry.file, (entry.suite ?? []).join(" > "), entry.title].join(" | ")}${entry.each === undefined ? "" : ` | each >= ${entry.each}`}`),
  );

/** wb-973.16 (rule 16): rows R6-R9's quotes and bindings as literals, never derived from TABLE. */
const FROZEN_R16: readonly { readonly row: string; readonly quote: string; readonly binding: readonly string[] }[] = [
  {
    row: "R6",
    quote: "The RF capability accepts either {model, task} or {view, taskId} with an optional model, never both, and spawns only --no-commit --no-input --json renders.",
    binding: [
      "two-arms | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R1: the descriptor advertises the two arms as one exclusive oneOf, the legacy arm unchanged",
      "two-arms | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R1: {view,taskId} spawns the served --view --task-id argv",
      "two-arms | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R1: {view,taskId,model} carries --model after --task-id",
      "never-both | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R1: the mixed shape %s is refused at input validation and never spawns rf | each >= 6",
      "render-flags-only | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R3: the admitted shape %s ends with --no-commit --no-input --json and adds no unserved selector | each >= 3",
    ],
  },
  {
    row: "R7",
    quote:
      "The swarm RF workspace root is an operator setting, workbench.reactivefiberWorkspaceRoot, under the unchanged reactivefiber:render grant, with single-host scope: multi-host use of a swarm workspace on a shared filesystem is unsupported and not safe.",
    binding: [
      "operator-setting | test | test/workbench-swarm-rf-workspace.test.ts | wb-973.4 reactivefiberWorkspaceRoot setting (S) | S1: accepts an absolute path and retains it beside the Claude executor selection",
      "operator-setting | test | test/workbench-swarm-rf-workspace.test.ts | wb-973.4 host wiring: the configured setting reaches the providers through the real extension (H) | H1: with C configured, a workflow node's RF render spawns rf with --workspace C, and the envelope naming C validates",
      "operator-setting | test | test/workbench-rf-workspace-root.test.ts | SCG-R5 AC1 (wb-973.5): no capability input names the RF workspace root | SCG-R5: both input arms keep additionalProperties:false and declare no path-shaped property",
      "unchanged-grant | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R3: both registered descriptors keep effectClass read, the render permission and invoke-only modes",
      "single-host-scope | test | test/workbench-docs-shared-filesystem-census.test.ts | SCG-R5 AC4 (wb-973.5): docs/workbench never presents a shared-filesystem swarm workspace as safe | SCG-R5: docs/13 holds exactly one ADR-SCG-010 sentence, naming the RF workspace root with single-host, local-coordinated scope",
      "single-host-scope | test | test/workbench-docs-shared-filesystem-census.test.ts | SCG-R5 AC4 (wb-973.5): docs/workbench never presents a shared-filesystem swarm workspace as safe | SCG-R5: every sentence naming NFS, EFS, a shared filesystem or multi-host use says unsupported or not safe, and claims no safety",
      'documented-root | test | test/workbench-docs-shared-filesystem-census.test.ts | SCG-R5 AC4 rendered view (wb-973.5 respin): docs/workbench as a reader sees it | SCG-R5: docs/13 section "Host boundary" is the unique heading of that name under the page title, renders exactly the pinned blocks and carries no HTML',
    ],
  },
  {
    row: "R8",
    quote: "RF_WORKSPACE and SWARM_RF_WORKSPACE are the allowlisted operational names a hosted agent learns the swarm workspace from, identical on the embedded and the detached host.",
    binding: [
      "allowlisted-names | test | test/workbench-process-env.test.ts | SCG-R6/R7: the swarm rf workspace locators (wb-973.6, wb-973.7) | SCG-R7: DETACHED_HOST_ENV_ALLOWLIST equals the 9df9a03 list plus exactly RF_WORKSPACE and SWARM_RF_WORKSPACE (set equality; any third addition is red)",
      "allowlisted-names | test | test/workbench-env-scrub-census.test.ts | W19 env-scrub census: harness sanity (plain, must pass) | the allowlist of record names the two rf workspace locators and neither is credential-shaped (SCG-R6 MEMBERS, names only)",
      "both-hosts | test | test/workbench-env-scrub-census.test.ts | W19 env-scrub census: SCG-R6 rf workspace locators reach the SDK child equally at both seams (wb-973.6) | local-detached.ts spawn carries RF_WORKSPACE and SWARM_RF_WORKSPACE with the parent's values and stays allowlist-only",
      "both-hosts | test | test/workbench-env-scrub-census.test.ts | W19 env-scrub census: SCG-R6 rf workspace locators reach the SDK child equally at both seams (wb-973.6) | claude-host.ts builds the SDK Options with no env override, so the SDK CLI child inherits process.env carrying both locators",
      "both-hosts | test | test/workbench-env-scrub-census.test.ts | W19 env-scrub census: SCG-R6 rf workspace locators reach the SDK child equally at both seams (wb-973.6) | both seams answer equally: the detached child is handed exactly what the embedded child inherits, for each locator",
      'documented-channel | test | test/workbench-docs-shared-filesystem-census.test.ts | SCG-R5 AC4 rendered view (wb-973.5 respin): docs/workbench as a reader sees it | SCG-R5: docs/13 section "Host boundary" is the unique heading of that name under the page title, renders exactly the pinned blocks and carries no HTML',
    ],
  },
  {
    row: "R9",
    quote: "The legacy {model, task} argv is frozen byte for byte (SCG-R025).",
    binding: ["whole | test | test/workbench-provider-envelope-audit.test.ts | SCG reactivefiber.render.preview input arms (wb-973.1 R1, wb-973.3 R3) | SCG-R3: the legacy argv is byte-identical to the measured 0.1.583 form"],
  },
];
const R16_ROWS: readonly string[] = ["R6", "R7", "R8", "R9"];

/**
 * wb-973.16 RECEIPT ANCHOR (rule 16 CT5/CT6, the 6ze.39 class): the receipt of record repeats every R6-R9 binding OUTSIDE
 * this file - per row, its pin count and the SHA-256 of its binding lines (bindingOf, joined by newlines) - as one
 * SCG_R16_BINDING JSON item of its dated entry, read through the rendered view (docsSection), so a pin, a half or a row
 * removed, swapped or reordered in TABLE and in every literal here together still reds against the receipt. Digests, not
 * the lines: the receipt is a docs/workbench page, which the shared-filesystem census judges sentence by sentence.
 */
const RECEIPT_FILE = "docs/workbench/receipts/wb-973.16.md";
const RECEIPT_TITLE = "wb-973.16: swarm-context-graph R16: the RF input-arm, workspace-root, locator and frozen-legacy-argv sentences, bound by the docs/07 census";
const RECEIPT_ENTRY = "2026-10-21 R16 sentences bound by the docs/07 census rows R6-R9; W10 claim row re-stated with the descriptor-contract receipt ids";
const BINDING_MARK = "Binding of record: SCG_R16_BINDING ";

interface RecordedRow {
  readonly pins: number;
  readonly sha256: string;
}
type ReceiptBinding = { readonly ok: true; readonly rows: Readonly<Record<string, RecordedRow>> } | { readonly ok: false; readonly why: string };

const isRecordedRow = (value: unknown): value is RecordedRow =>
  isRecord(value) && Object.keys(value).length === 2 && typeof value.pins === "number" && Number.isInteger(value.pins) && typeof value.sha256 === "string" && /^[0-9a-f]{64}$/.test(value.sha256);
/** The digest the receipt records for a row: SHA-256 over its binding lines joined by newlines. */
const bindingDigest = (lines: readonly string[]): string => createHash("sha256").update(lines.join("\n"), "utf8").digest("hex");

/** The one SCG_R16_BINDING item of the receipt entry, parsed; any other shape is a named refusal. */
function receiptBinding(markdown: string): ReceiptBinding {
  const section = docsSection(markdown, RECEIPT_ENTRY, 2, [RECEIPT_TITLE]);
  if (!section.ok) return { ok: false, why: `${RECEIPT_FILE}: ${section.why}` };
  if (section.hasHtml) return { ok: false, why: `${RECEIPT_FILE}: the entry carries HTML, which can hide what its source says` };
  const items = section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : [])).filter(text => text.startsWith(BINDING_MARK));
  if (items.length !== 1) return { ok: false, why: `${RECEIPT_FILE}: the entry renders ${items.length} SCG_R16_BINDING items, not exactly one` };
  let parsed: unknown;
  try {
    parsed = JSON.parse((items[0] ?? "").slice(BINDING_MARK.length));
  } catch (error) {
    return { ok: false, why: `${RECEIPT_FILE}: the SCG_R16_BINDING item is not JSON (${error instanceof Error ? error.message : String(error)})` };
  }
  if (!isRecord(parsed) || !Object.values(parsed).every(isRecordedRow)) return { ok: false, why: `${RECEIPT_FILE}: the SCG_R16_BINDING item is not an object of {pins, sha256} rows` };
  const rows: Record<string, RecordedRow> = {};
  for (const [id, recorded] of Object.entries(parsed)) if (isRecordedRow(recorded)) rows[id] = recorded;
  return { ok: true, rows };
}

/** Every disagreement between a table's R6-R9 rows and the receipt's binding of record, each naming the row and its sentence. */
function receiptAnchorFindings(table: readonly Row[], binding: Readonly<Record<string, RecordedRow>>): string[] {
  const findings: string[] = [];
  const ids = Object.keys(binding);
  if (JSON.stringify(ids) !== JSON.stringify(R16_ROWS)) findings.push(`the receipt binds rows ${JSON.stringify(ids)}, not ${JSON.stringify(R16_ROWS)}`);
  for (const id of ids) {
    const row = table.find(candidate => candidate.row === id);
    if (row === undefined) {
      findings.push(`row ${id}: the receipt binds it but the table holds no such row`);
      continue;
    }
    const lines = bindingOf(row);
    const digest = bindingDigest(lines);
    const recorded = binding[id];
    if (recorded === undefined || lines.length !== recorded.pins || digest !== recorded.sha256) {
      findings.push(`row ${id} ("${row.quote}"): the table binds ${lines.length} pins (sha256 ${digest}), not the receipt's ${recorded?.pins ?? 0} (sha256 ${recorded?.sha256 ?? "none"})`);
    }
  }
  return findings;
}

/** A pin's failure line that names the row's sentence as well as the row (wb-973.16 AC1: red naming the sentence). */
const sentenceFailures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] =>
  verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${half.id} ("${row.quote}"): ${verdict.code}: ${verdict.why}`);

/** A literal part of an it.each template, escaped for a regular expression. */
const escapeRegExp = (part: string): string => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** An it.each template as the expanded titles it registers ("%s" reads as any non-empty text). */
const templateMatcher = (title: string): RegExp => {
  const pattern = title.split("%s").map(escapeRegExp).join(".+");
  return new RegExp(`^${pattern}$`);
};

const EXAMPLES_FILE = "docs/workbench/19-worked-examples.md";
const EXAMPLES_PARENT = "19 — Worked usage examples and expected outcomes";
/** docs/19's measured read example, as a reader sees it (code spans render their text), states both arms as row R6 does. */
const EXAMPLE_ARMS_SENTENCE =
  "reactivefiber.render.preview accepts exactly one of two input arms under explicit reactivefiber:render: model and task, or view and taskId with an optional model, never both; its workspace must already be initialized.";

/**
 * wb-omxf R695 (d): the G1 timing sightings of the R6-R9 block's two report-judging rows - register candidates 46 (M5,
 * "Test timed out in 5000ms" at 5440 ms in gate cmd_89065b4fb248) and 48 (DEL, 6974 ms in gate cmd_5f0be6550a44), each
 * green on its serial leg - route to the R687 explicit-budget cure shape, not to the register. M5 and DEL run on this
 * file-local budget: the describe that wraps them passes it as its timeout option, so their landed lines stay
 * byte-identical, and the BUDGET row of the wb-omxf block reads the registered timeout back from the runner's own task
 * tree (exactly those two rows, each registered once). Exceeding it is vitest's timeout red at the budget's value, never
 * at the bare 5000 ms default. Sized by the R546 recipe: 5 x the costliest wall of record (R16_WORST_WALL_MS, DEL in
 * gate) = 34870 ms, rounded up to a whole 5 s. Seat walls over that gate's own full default-tier report, re-rooted
 * (2026-10-22, three sequential runs, load1 241-272): M5 1979-2211 ms, DEL 2738-3074 ms.
 */
const R16_WORST_WALL_MS = 6_974;
const R16_REPORT_BUDGET_MS = 35_000;

describe("wb-973.16 rows R6-R9: the SCG-R16 RF sentences (a)-(d) bound to the SCG-R1/R3/R4/R5/R6/R7 cases", () => {
  const scratch: string[] = [];
  afterEach(() => {
    removeScratch(...scratch.splice(0));
  });
  const r16 = (): readonly Row[] => TABLE.filter(row => R16_ROWS.includes(row.row));

  it("AC1 (wb-973.16): rows R6-R9 quote the four sentences whole and bind every clause by file, describe path, verbatim title, tier and table-row floor, frozen as literals", () => {
    expect(r16().map(row => row.row)).toEqual(R16_ROWS);
    expect(r16().map(row => ({ row: row.row, quote: row.quote, binding: bindingOf(row) }))).toEqual(FROZEN_R16);
    for (const row of r16()) {
      expect(row.section, row.row).toBe("ReactiveFiberCLI provider");
      expect(row.source, row.row).toBe("docs");
      expect(row.halves.every(half => half.tier === "default-gate" && half.reason === undefined && half.pins.length > 0 && half.pins.every(entry => entry.suite !== undefined)), row.row).toBe(true);
    }
  });

  it("R16 receipt anchor (rule 16 CT5/CT6): rows R6-R9 bind exactly the cases the receipt of record names, read from receipts/wb-973.16.md through the rendered view, never from TABLE", () => {
    const binding = receiptBinding(readRepo(RECEIPT_FILE));
    expect(binding.ok, binding.ok ? "" : binding.why).toBe(true);
    if (!binding.ok) return;
    expect(receiptAnchorFindings(TABLE, binding.rows)).toEqual([]);
    expect(Object.values(binding.rows).map(recorded => recorded.pins)).toEqual([5, 7, 6, 1]);
  });

  it("R16 receipt anchor falsifiers: a pin, a half or a row removed from the table (and from every literal of this file with it) reds against the receipt, naming the row and its sentence", () => {
    const binding = receiptBinding(readRepo(RECEIPT_FILE));
    expect(binding.ok).toBe(true);
    if (!binding.ok) return;
    const dropPin = TABLE.map(row => (row.row === "R7" ? { ...row, halves: row.halves.map(half => (half.id === "operator-setting" ? { ...half, pins: half.pins.slice(1) } : half)) } : row));
    const dropHalf = TABLE.map(row => (row.row === "R8" ? { ...row, halves: row.halves.filter(half => half.id !== "documented-channel") } : row));
    const dropRow = TABLE.filter(row => row.row !== "R9");
    const swapPin = TABLE.map(row =>
      row.row === "R6" ? { ...row, halves: row.halves.map(half => (half.id === "two-arms" ? { ...half, pins: [pin("provider-envelope-audit", "SCG-R1: a view render envelope (view_id, effective_scopes, satisfied view_contract) round-trips verbatim through nativeReactiveFiberPreview", [ARMS_SUITE]), ...half.pins.slice(1)] } : half)) } : row,
    );
    const reordered = TABLE.map(row => (row.row === "R8" ? { ...row, halves: [...row.halves].reverse() } : row));
    const cases: readonly [string, readonly Row[], string][] = [
      ["a dropped pin", dropPin, `row R7 ("${WORKSPACE_ROOT_SENTENCE}"): the table binds 6 pins`],
      ["a dropped half", dropHalf, `row R8 ("${LOCATORS_SENTENCE}"): the table binds 5 pins`],
      ["a dropped row", dropRow, "row R9: the receipt binds it but the table holds no such row"],
      ["a swapped pin", swapPin, `row R6 ("${INPUT_ARMS_SENTENCE}"): the table binds 5 pins`],
      ["reordered halves", reordered, `row R8 ("${LOCATORS_SENTENCE}"): the table binds 6 pins`],
    ];
    expect(cases.map(([name]) => name)).toEqual(["a dropped pin", "a dropped half", "a dropped row", "a swapped pin", "reordered halves"]);
    for (const [name, table, expected] of cases) expect(receiptAnchorFindings(table, binding.rows).some(line => line.startsWith(expected)), name).toBe(true);
    // The receipt's own shape: mutants authored on the markdown SOURCE (the item renders the code span's text, so its source
    // carries a backtick after "record: "), each checked to be a real edit before it is judged.
    const source = readRepo(RECEIPT_FILE);
    const item = /- Binding of record: `SCG_R16_BINDING [^\n]*/;
    const shapes: readonly [string, string][] = [
      ["the binding item relabelled", source.replace("- Binding of record: `SCG_R16_BINDING ", "- Binding: `SCG_R16_BINDING ")],
      ["the binding item duplicated", source.replace(item, match => `${match}\n${match}`)],
      ["the binding item hidden in a comment", source.replace(item, match => `<!-- ${match} -->`)],
      ["a pin count made fractional", source.replace('"pins":5,', '"pins":5.5,')],
    ];
    expect(shapes.map(([name]) => name)).toEqual(["the binding item relabelled", "the binding item duplicated", "the binding item hidden in a comment", "a pin count made fractional"]);
    for (const [name, text] of shapes) {
      expect(text, name).not.toBe(source);
      expect(receiptBinding(text).ok, name).toBe(false);
    }
    const altered = receiptBinding(source.replace('"sha256":"ecc9', '"sha256":"fcc9'));
    expect(altered.ok).toBe(true);
    if (altered.ok) expect(receiptAnchorFindings(TABLE, altered.rows).map(line => line.slice(0, line.indexOf(" (")))).toEqual(["row R6"]);
  });

  // wb-omxf R695 (d): M5 and DEL receive R16_REPORT_BUDGET_MS through this describe's timeout option; their lines are unchanged.
  describe("report-judging rows on the file-local R16_REPORT_BUDGET_MS (wb-omxf R695 (d), R687 shape)", { timeout: R16_REPORT_BUDGET_MS }, () => {
  it("M5 (wb-973.16): every row R6-R9 pin renamed by one character is absent from the report and red, naming the row, its sentence, the half, the file and the title", () => {
    const pins = r16().flatMap(row => row.halves.flatMap(half => half.pins.map(entry => ({ row, half, entry }))));
    expect(pins).toHaveLength(19);
    for (const { row, half, entry } of pins) {
      const wrong = { ...entry, title: `${entry.title}.` };
      const verdicts = judge(REPORT, [casePin(half, wrong)]);
      expect(verdicts[0]?.code, wrong.title).toBe("absent");
      const [line] = sentenceFailures(row, half, verdicts);
      expect(line, wrong.title).toContain(`row ${row.row}/${half.id} ("${row.quote}")`);
      expect(line, wrong.title).toContain(entry.file);
      expect(line, wrong.title).toContain(wrong.title);
    }
  });

  it("DEL (wb-973.16): with every R6-R9 pinned case deleted from a copy of the gate's own report, each pin is red naming its row and sentence, while the docs still state the four sentences and row R5's pins stay ok", () => {
    const parsed: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
    if (!isReportJson(parsed)) throw new Error(`${DEFAULT_TIER_REPORT} does not have vitest's JSON reporter shape`);
    const pins = r16().flatMap(row => row.halves.flatMap(half => half.pins.map(entry => ({ row, half, entry }))));
    const deleted = (test: ReportCase): boolean =>
      pins.some(({ entry }) => JSON.stringify(test.ancestorTitles) === JSON.stringify(entry.suite ?? []) && (entry.each === undefined ? test.title === entry.title : templateMatcher(entry.title).test(test.title)));
    const kept = parsed.testResults.map(file => ({ ...file, assertionResults: file.assertionResults.filter(test => !deleted(test)) }));
    const removed = parsed.testResults.reduce((sum, file) => sum + file.assertionResults.length, 0) - kept.reduce((sum, file) => sum + file.assertionResults.length, 0);
    expect(removed, "the deletion reaches every pinned case and every table row of the two it.each pins").toBe(25);
    const dir = makeScratch("census-973-16-");
    scratch.push(dir);
    mkdirSync(join(dir, ".forge"));
    const path = join(dir, ".forge", "vitest-report.json");
    writeFileSync(path, JSON.stringify({ ...parsed, testResults: kept }));
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    const lines = pins.flatMap(({ row, half, entry }) => sentenceFailures(row, half, judge(path, [casePin(half, entry)], { root: ROOT })));
    expect(lines).toHaveLength(pins.length);
    expect(lines.map(line => line.slice(0, line.indexOf(" ("))).filter((id, index, all) => all.indexOf(id) === index)).toEqual([
      "row R6/two-arms",
      "row R6/never-both",
      "row R6/render-flags-only",
      "row R7/operator-setting",
      "row R7/unchanged-grant",
      "row R7/single-host-scope",
      "row R7/documented-root",
      "row R8/allowlisted-names",
      "row R8/both-hosts",
      "row R8/documented-channel",
      "row R9/whole",
    ]);
    for (const [index, { row, entry }] of pins.entries()) {
      expect(lines[index]).toContain(`("${row.quote}")`);
      expect(lines[index]).toContain(entry.file);
    }
    const control = TABLE.find(row => row.row === "R5")?.halves.filter(half => half.tier === "default-gate") ?? [];
    expect(control.flatMap(half => judge(path, half.pins.map(entry => casePin(half, entry)), { root: ROOT }).map(verdict => verdict.code))).toEqual(["ok", "ok", "ok", "ok"]);
  });
  });

  const DRIFT: readonly [string, string, string, string][] = [
    ["K5", "R6", ", never both, and spawns only", " and spawns"],
    ["K6", "R7", "is unsupported and not safe", "is supported"],
    ["K7", "R8", "identical on the embedded and the detached host", "carried on the embedded host only"],
    ["K8", "R9", "is frozen byte for byte", "may change between releases"],
  ];
  it("K5-K8 (wb-973.16) roster: one drift row per R6-R9 sentence, in row order", () => {
    expect(DRIFT.map(([id, row]) => `${id}:${row}`)).toEqual(["K5:R6", "K6:R7", "K7:R8", "K8:R9"]);
  });
  it.each(DRIFT)("%s names row %s (and only it) when its RF sentence is weakened in the synthetic document", (_id, row, from, to) => {
    const lines = docsFailures(synthetic((heading, body) => (heading === "ReactiveFiberCLI provider" ? body.replace(from, to) : body)));
    expect(named(lines)).toEqual([`row ${row}`]);
    expect(lines.some(line => line.includes("ReactiveFiberCLI provider is not exactly its frozen paragraph"))).toBe(true);
  });

  it("AC3 (wb-973.16): docs/19's measured read example states both input arms of reactivefiber.render.preview, never both, as rendered text", () => {
    const section = docsSection(readRepo(EXAMPLES_FILE), "Measured experimental read example", 2, [EXAMPLES_PARENT]);
    expect(section.ok, section.why).toBe(true);
    const text = section.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
    expect(text).toContain(EXAMPLE_ARMS_SENTENCE);
    expect(text).not.toContain("reactivefiber.render.preview accepts model and task under");
  });
});

/**
 * wb-1z3u (wb-973.16 gate F2, owner R662: PASS + one follow-up): the AC3 case above judges docs/19's measured read example
 * by CONTAINMENT, so the gate's two LEG-2 falsifiers stayed 91/91 green - a contradicting sentence appended after the arms
 * sentence (L2-D19-CONTRA) and a negating prefix (L2-D19-NEG) - and six more forms of their class did too at base a5c70e7
 * (D19_FALSIFIERS). This leg judges the same claim by EQUALITY, as rows R6-R9 judge docs/07, and keeps AC3 as it landed:
 * - SENTENCE: of the section's rendered paragraphs, split after every full stop that whitespace follows (docs/19's
 *   sentences open on code spans, so sentencesOf's capital-letter split does not apply), exactly one sentence names the
 *   capability, and it IS the arms sentence - never a sentence that merely contains it;
 * - SLICE: the section carries no HTML, its last block is the RF paragraph and renders exactly the arms sentence between
 *   its two frozen neighbours, and no other block names RF, so nothing qualifies the claim before, inside or after it;
 * - ANCHOR: the arms sentence is composed from the source-of-truth registry, never from a literal of this file: both
 *   registered reactivefiber.render.preview descriptors (src/workbench/providers/reactivefiber.ts), read back through
 *   CapabilityRegistry.catalogSnapshot, state the capability id, its one permission and the exclusive oneOf of two closed
 *   arms with each arm's required and optional fields, so an edit of the docs and of every literal here that changes an
 *   arm, a field, the arm count, the grant or the exclusivity still reds against src (ARM_EDITS). The connective words and
 *   the two neighbouring sentences carry no registry fact; they are frozen here and judged against the live docs.
 */
const EXAMPLES_SECTION = "Measured experimental read example";
const RF_CAPABILITY = "reactivefiber.render.preview";
/** The RF paragraph's sentences before and after the arms sentence, as a reader sees them (code spans render their text). */
const EXAMPLE_LEAD_SENTENCE = "furnace.run.inspect accepts an existing runId under the authorized Pi workspace with explicit furnace:inspect.";
const EXAMPLE_TAIL_SENTENCE = "It uses a noncommitted render and must not be advertised as a durable RF artifact.";
/** A block names RF when its rendered text carries the provider's name or its abbreviation. */
const NAMES_RF = /reactivefiber|\bRF\b/iu;

/** What a reader sees of a block, whatever its kind (an html block renders nothing; hasHtml judges its source). */
const blockText = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text);
/** Rendered prose as sentences: split after a full stop that whitespace follows, whatever character opens the next one. */
const proseSentences = (text: string): string[] => text.split(/(?<=\.)\s+/u).filter(sentence => sentence !== "");
/** The section's rendered paragraphs joined, as the AC3 case reads them. */
const exampleProse = (markdown: string): string =>
  docsSection(markdown, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT])
    .blocks.map(block => (block.kind === "paragraph" ? block.text : ""))
    .join(" ");

type ArmsReading = { readonly ok: true; readonly sentence: string } | { readonly ok: false; readonly why: string };
interface RegisteredArm {
  readonly required: readonly string[];
  readonly optional: readonly string[];
}
const isFieldList = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every((field: unknown) => typeof field === "string");

/**
 * The arms sentence a descriptor's registry facts state, in the docs' connective words: its id, its one permission and its
 * inputSchema's oneOf arms in order, each as its required fields, then its optional ones. Only an exclusive oneOf of exactly
 * two closed arms reads "exactly one of two ... never both"; any other shape is a finding, never a sentence.
 */
function armsSentenceOf(descriptor: CapabilityDescriptor): ArmsReading {
  const oneOf = descriptor.inputSchema.oneOf;
  if (!Array.isArray(oneOf)) return { ok: false, why: `${descriptor.id} publishes no exclusive oneOf of input arms` };
  const arms: readonly unknown[] = oneOf;
  if (arms.length !== 2) return { ok: false, why: `${descriptor.id} publishes ${arms.length} input arms; "never both" states exactly two` };
  const read: RegisteredArm[] = [];
  for (const arm of arms) {
    const properties = isRecord(arm) ? arm.properties : undefined;
    const required = isRecord(arm) ? arm.required : undefined;
    if (!isRecord(arm) || !isRecord(properties) || !isFieldList(required) || arm.additionalProperties !== false) {
      return { ok: false, why: `${descriptor.id} publishes an input arm that is not a closed object with required fields: ${JSON.stringify(arm)}` };
    }
    read.push({ required, optional: Object.keys(properties).filter(field => !required.includes(field)) });
  }
  const [permission, ...others] = descriptor.permissions;
  if (permission === undefined || others.length > 0) return { ok: false, why: `${descriptor.id} requires ${descriptor.permissions.length} permissions; the sentence names exactly one grant` };
  const armText = (arm: RegisteredArm): string => `${arm.required.join(" and ")}${arm.optional.length === 0 ? "" : ` with an optional ${arm.optional.join(" and ")}`}`;
  return { ok: true, sentence: `${descriptor.id} accepts exactly one of two input arms under explicit ${permission}: ${read.map(armText).join(", or ")}, never both; its workspace must already be initialized.` };
}

/** Both registrations of the capability, read back through the registry's catalog: the injected-invoke one, then the native host's. */
function registeredDescriptors(): CapabilityDescriptor[] {
  const injected = new CapabilityRegistry();
  registerReactiveFiberRender(injected, () => Promise.reject(new Error("the docs census never invokes the capability")), ROOT);
  const native = new CapabilityRegistry();
  registerNativeReactiveFiberRender(native, ROOT);
  return [injected, native].flatMap(registry => registry.catalogSnapshot().map(row => row.descriptor));
}

/** The arms sentence of record: the one sentence both registrations compose; a disagreement or a refusal throws, naming both readings. */
function registryArmsSentence(): string {
  const readings = registeredDescriptors().map(armsSentenceOf);
  const sentences = readings.flatMap(reading => (reading.ok ? [reading.sentence] : []));
  const [first] = sentences;
  if (readings.length !== 2 || sentences.length !== 2 || first === undefined || sentences[1] !== first) {
    throw new Error(`the two registrations of ${RF_CAPABILITY} do not compose one arms sentence: ${JSON.stringify(readings)}`);
  }
  return first;
}

/** Every way docs/19's measured read example departs from the RF claim, one line each, naming the section, SENTENCE or SLICE. */
function exampleFailures(markdown: string, armsSentence: string): string[] {
  const where = `${EXAMPLES_FILE} § ${EXAMPLES_SECTION}`;
  const section = docsSection(markdown, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT]);
  if (!section.ok) return [`${where}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (section.hasHtml) out.push(`${where}: SLICE: the section carries HTML (a comment or a tag), whose rendered text can hide what its source says`);
  const prose = section.blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : [])).join(" ");
  const naming = proseSentences(prose).filter(sentence => sentence.includes(RF_CAPABILITY));
  if (naming.length !== 1) out.push(`${where}: SENTENCE: ${naming.length} sentences name ${RF_CAPABILITY}; the claim is exactly one: ${JSON.stringify(naming)}`);
  else if (naming[0] !== armsSentence) out.push(`${where}: SENTENCE: the one sentence naming ${RF_CAPABILITY} is not the arms sentence: ${JSON.stringify(naming[0])}`);
  const paragraph = `${EXAMPLE_LEAD_SENTENCE} ${armsSentence} ${EXAMPLE_TAIL_SENTENCE}`;
  const last = section.blocks.at(-1);
  if (last === undefined || last.kind !== "paragraph" || last.text !== paragraph) {
    out.push(`${where}: SLICE: the last block is not exactly the RF paragraph; it renders ${JSON.stringify(last === undefined ? null : blockText(last))}`);
  }
  for (const [index, block] of section.blocks.slice(0, -1).entries()) {
    if (NAMES_RF.test(blockText(block))) out.push(`${where}: SLICE: block ${index + 1} (${block.kind}) names RF outside the RF paragraph: ${JSON.stringify(blockText(block))}`);
  }
  return out;
}
/** The judgement kind of each failure line, in order. */
const judgementKinds = (lines: readonly string[]): string[] => lines.map(line => /: (SENTENCE|SLICE): /u.exec(line)?.[1] ?? "SECTION");

/**
 * The gate's two LEG-2 survivors (its edit texts verbatim, gate-prep-3 of g10-gate-s7) and six more forms of their class:
 * each an edit of the LIVE docs/19 source, then the judgement kinds it must draw. Every row read 91/91 green under the
 * landed containment case at base a5c70e7 (measured by this cut's seat on throwaway copies, restored by sha256).
 */
const D19_FALSIFIERS: readonly [string, string, string, readonly string[]][] = [
  [
    "L2-D19-CONTRA",
    "never both; its workspace must already be initialized. It uses a noncommitted render",
    "never both; its workspace must already be initialized. It also accepts both arms in one call. It uses a noncommitted render",
    ["SLICE"],
  ],
  ["L2-D19-NEG", "`reactivefiber.render.preview` accepts exactly one of two input arms", "It is false that `reactivefiber.render.preview` accepts exactly one of two input arms", ["SENTENCE", "SLICE"]],
  ["D19-PRE", "`furnace:inspect`. `reactivefiber.render.preview` accepts", "`furnace:inspect`. Both arms may be combined in one call. `reactivefiber.render.preview` accepts", ["SLICE"]],
  ["D19-TAIL", "must not be advertised as a durable RF artifact.", "must not be advertised as a durable RF artifact. It also accepts both arms in one call.", ["SLICE"]],
  ["D19-PARA", "must not be advertised as a durable RF artifact.\n", "must not be advertised as a durable RF artifact.\n\nIn practice it also accepts both arms in one call.\n", ["SLICE", "SLICE"]],
  ["D19-ELSEWHERE", "not a task-scoped semantic dependency analysis.", "not a task-scoped semantic dependency analysis. The RF render capability also accepts both arms in one call.", ["SLICE"]],
  ["D19-HTML", "never both; its workspace", "never <!-- unless the caller sends both, then --> both; its workspace", ["SLICE"]],
  ["D19-QUOTE", "`reactivefiber.render.preview` accepts exactly one", "Older notes claimed: `reactivefiber.render.preview` accepts exactly one", ["SENTENCE", "SLICE"]],
];

/** A copy of a descriptor whose inputSchema oneOf arms (read as JSON objects) pass through edit. */
const withArms = (descriptor: CapabilityDescriptor, edit: (arms: Record<string, unknown>[]) => unknown[]): CapabilityDescriptor => {
  const oneOf = descriptor.inputSchema.oneOf;
  const arms: readonly unknown[] = Array.isArray(oneOf) ? oneOf : [];
  if (arms.length === 0 || !arms.every(isRecord)) throw new Error(`${descriptor.id} publishes no oneOf arms to edit`);
  return { ...descriptor, inputSchema: { ...descriptor.inputSchema, oneOf: edit(arms.map(arm => structuredClone(arm))) } };
};
/** An arm's properties without one field, its required list without it too. */
const dropField = (arm: Record<string, unknown>, field: string): Record<string, unknown> => ({
  ...arm,
  properties: isRecord(arm.properties) ? Object.fromEntries(Object.entries(arm.properties).filter(([name]) => name !== field)) : arm.properties,
  required: isFieldList(arm.required) ? arm.required.filter(name => name !== field) : arm.required,
});

/**
 * Registry-side edits, each on a copy of the registered descriptor, never of src: a fact the sentence carries either moves
 * the composed sentence ("moves", and the live docs then red against it) or makes the schema unsayable ("refused: <the
 * reason the reading names>"). A composer that stopped reading the registry would leave a "moves" row composing the docs'
 * sentence, and one that refused for another reason would name another cause; either reads red here.
 */
const ARM_EDITS: readonly [string, (descriptor: CapabilityDescriptor) => CapabilityDescriptor, string][] = [
  ["the view arm's optional model dropped", descriptor => withArms(descriptor, arms => arms.map((arm, index) => (index === 1 ? dropField(arm, "model") : arm))), "moves"],
  ["the legacy arm's task field dropped", descriptor => withArms(descriptor, arms => arms.map((arm, index) => (index === 0 ? dropField(arm, "task") : arm))), "moves"],
  ["the arms in the other order", descriptor => withArms(descriptor, arms => [...arms].reverse()), "moves"],
  ["another grant", descriptor => ({ ...descriptor, permissions: ["reactivefiber:read"] }), "moves"],
  ["a second required grant", descriptor => ({ ...descriptor, permissions: [...descriptor.permissions, "reactivefiber:commit"] }), "refused: requires 2 permissions"],
  ["the arms widened to anyOf", descriptor => ({ ...descriptor, inputSchema: { type: "object", anyOf: descriptor.inputSchema.oneOf } }), "refused: publishes no exclusive oneOf"],
  ["a third arm", descriptor => withArms(descriptor, arms => [...arms, { type: "object", properties: { view: { type: "string" } }, required: ["view"], additionalProperties: false }]), "refused: publishes 3 input arms"],
  ["an open view arm", descriptor => withArms(descriptor, arms => arms.map((arm, index) => (index === 1 ? { ...arm, additionalProperties: true } : arm))), "refused: not a closed object"],
];

describe("wb-1z3u docs/19 measured read example: the RF arms claim judged by sentence and slice equality, anchored to the registry (wb-973.16 gate F2)", () => {
  it("ANCHOR: both registered reactivefiber.render.preview descriptors compose the one arms sentence from their oneOf arms and permission, and it is the sentence the AC3 case pins", () => {
    const descriptors = registeredDescriptors();
    expect(descriptors.map(descriptor => descriptor.id)).toEqual([RF_CAPABILITY, RF_CAPABILITY]);
    expect(descriptors.map(armsSentenceOf)).toEqual([
      { ok: true, sentence: EXAMPLE_ARMS_SENTENCE },
      { ok: true, sentence: EXAMPLE_ARMS_SENTENCE },
    ]);
    expect(registryArmsSentence()).toBe(EXAMPLE_ARMS_SENTENCE);
  });

  it("SENTENCE + SLICE: the live section states the registry's arms sentence as one whole sentence, inside exactly its frozen RF paragraph as the section's last block, with no HTML and no other block naming RF", () => {
    expect(exampleFailures(readRepo(EXAMPLES_FILE), registryArmsSentence())).toEqual([]);
    expect(proseSentences(exampleProse(readRepo(EXAMPLES_FILE))).filter(sentence => sentence.includes(RF_CAPABILITY))).toEqual([EXAMPLE_ARMS_SENTENCE]);
  });

  it("roster: the gate's two survivors first, then the six class forms, each with its judgements; then the registry edits, each with its outcome", () => {
    expect(D19_FALSIFIERS.map(([id, , , kinds]) => `${id}:${kinds.join("+")}`)).toEqual([
      "L2-D19-CONTRA:SLICE",
      "L2-D19-NEG:SENTENCE+SLICE",
      "D19-PRE:SLICE",
      "D19-TAIL:SLICE",
      "D19-PARA:SLICE+SLICE",
      "D19-ELSEWHERE:SLICE",
      "D19-HTML:SLICE",
      "D19-QUOTE:SENTENCE+SLICE",
    ]);
    expect(ARM_EDITS.map(([id, , outcome]) => `${id}:${outcome}`)).toEqual([
      "the view arm's optional model dropped:moves",
      "the legacy arm's task field dropped:moves",
      "the arms in the other order:moves",
      "another grant:moves",
      "a second required grant:refused: requires 2 permissions",
      "the arms widened to anyOf:refused: publishes no exclusive oneOf",
      "a third arm:refused: publishes 3 input arms",
      "an open view arm:refused: not a closed object",
    ]);
  });

  it.each(D19_FALSIFIERS)("%s: a real edit of the live docs/19 that the containment case reads green, judged red by kind", (id, from, to, kinds) => {
    const live = readRepo(EXAMPLES_FILE);
    expect(live.split(from), `${id} edits text the live docs carry exactly once`).toHaveLength(2);
    const mutant = live.replace(from, to);
    expect(mutant, id).not.toBe(live);
    // The F2 class: the landed AC3 reading (containment) still finds the arms sentence and no legacy-only wording.
    expect(exampleProse(mutant), id).toContain(EXAMPLE_ARMS_SENTENCE);
    expect(exampleProse(mutant), id).not.toContain("reactivefiber.render.preview accepts model and task under");
    const lines = exampleFailures(mutant, registryArmsSentence());
    expect(judgementKinds(lines), `${id}: ${lines.join(" | ")}`).toEqual(kinds);
    for (const line of lines) expect(line, id).toContain(`${EXAMPLES_FILE} § ${EXAMPLES_SECTION}: `);
  });

  it.each(ARM_EDITS)("ANCHOR %s: the registry fact drives the sentence, so the edit moves it off the live docs or is refused", (id, edit, outcome) => {
    const [descriptor] = registeredDescriptors();
    expect(descriptor).toBeDefined();
    if (descriptor === undefined) return;
    const edited = edit(descriptor);
    expect(edited, id).not.toEqual(descriptor);
    const reading = armsSentenceOf(edited);
    expect(reading.ok ? "moves" : "refused", id).toBe(outcome.split(":")[0]);
    if (!reading.ok) {
      expect(reading.why, id).toContain(`${RF_CAPABILITY} `);
      expect(reading.why, id).toContain(outcome.slice("refused: ".length));
      return;
    }
    expect(reading.sentence, id).not.toBe(EXAMPLE_ARMS_SENTENCE);
    expect(judgementKinds(exampleFailures(readRepo(EXAMPLES_FILE), reading.sentence)), id).toEqual(["SENTENCE", "SLICE"]);
  });
});

/**
 * wb-omxf / R677 (class-closing) + R695 Q2 (cut #2): the AC3 containment check binds the FULL section-bounded slice of
 * docs/19's measured read example by EQUALITY against an external anchor, red-first vs the frozen-last-block and
 * NAMES_RF-regex bypass shapes. No landed line is changed (the R6-R9 budget above wraps M5 and DEL insert-only).
 * R695 (a): the fixture is the frozen EXPECTATION and docs/workbench/19-worked-examples.md is the SUBJECT. Every text the
 * full-slice judge reads is a Sourced value: the repo path it was read from and the SHA-256 of exactly those bytes. The
 * expectation's provenance is pinned (EXPECTATION: the fixture path and the digest of its committed bytes); the subject's
 * is the docs path and the digest of its bytes on disk, asserted distinct from the expectation's and never pinned (the
 * page may change outside this section).
 * R695 (b): fullExampleFailures(subject, expectation, armsSentence) reads no file. It asserts both provenances (PROVENANCE
 * lines, one per failed check), derives the anchor blocks from the expectation it is GIVEN and equals the subject's
 * section to them (FULL-SLICE), and vouches the expectation's RF sentence against both registered descriptors
 * (REGISTRY). Every equality row (LIVE, the drift forms, ANCHOR-SIDE, ON-DISK, BOUNDARY, REGISTRY, F2, FROZEN SHAPE)
 * passes the expectation in; the table rows read it through expectedTables, which refuses any other provenance.
 * R695 (c), the kill matrix: an expectation read from the docs path (the call-site L2-J-ANCHOR-LIVE class) reds
 * PROVENANCE on LIVE, on every ON-DISK row and on P-ANCHOR-LIVE-DOCS; anchor blocks derived inside the judge from the live
 * docs (the gate's one-line L2-J-ANCHOR-LIVE) red every ANCHOR-SIDE row, which judges the live page against an
 * expectation drifted in memory; blocks derived from the subject red every drift form; ON-DISK writes docs/19 carrying
 * each R677 F1 survivor into a scratch repo root and judges the LIVE reading there, its same-delay and same-edit controls
 * quiet. LIVE also equals the subject's section to the expectation's on its own, outside the judge, so a judge-internal
 * re-point plus an F1 survivor on disk still reds LIVE itself. Each provenance check is the only one some falsifier row
 * trips (the P-* rows; ANCHOR-SIDE for the pinned digest).
 * Scope: this one section (a following level-2 section is outside it, pinned quiet), never a whole-page claim; a
 * coordinated rewrite of the docs, the fixture and the EXPECTATION literal together is the NAMED RESIDUAL
 * R-COORDINATED-LITERAL-AND-ANCHOR (cut #3, R696 (3), its quiet row below), never a claim.
 * F2 toolchain coupling (disclosed): the fixture's ARM_EDITS digests hash vitest's TRANSFORMED function text, so a
 * transform-target or transformer change reds the F2 row until the fixture's arms are regenerated.
 */
const OMXF_ANCHOR_FILE = "test/fixtures/docs19-full-section-omxf.json";
/** Where a judged text came from: the repo path read and the SHA-256 (hex) of exactly the bytes read (R695 (a)). */
interface Provenance {
  readonly path: string;
  readonly sha256: string;
}
/** A judged text with the provenance of its bytes: built by readWithProvenance (a read) or asRead (a page at a read's path). */
interface Sourced {
  readonly provenance: Provenance;
  readonly text: string;
}
/**
 * The frozen EXPECTATION's provenance, pinned as source-level string literals (R696 (1), read back by the LITERAL PIN row from
 * this file's AST): the fixture path and the SHA-256 of its committed bytes (sha256sum), written out and never computed here.
 */
const EXPECTATION: Provenance = { path: "test/fixtures/docs19-full-section-omxf.json", sha256: "6f0d6217045be897e9121b5489a3be53164b24cef062c2cb1bbb42b30a824cf2" };
const sha256Hex = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
/** A file under a repo root with the digest of exactly its bytes: the one read every full-slice row judges. */
function readWithProvenance(root: string, path: string): Sourced {
  const bytes = readFileSync(join(root, path));
  return { provenance: { path, sha256: sha256Hex(bytes) }, text: bytes.toString("utf8") };
}
/** A hypothetical page at a read's path (an edit or an append of it): the given text and the digest of its bytes. */
const asRead = (source: Sourced, text: string): Sourced => ({ provenance: { path: source.provenance.path, sha256: sha256Hex(text) }, text });
/** One edit of a read, applied once, its replacement taken literally. */
const editedFrom = (source: Sourced, from: string, to: string): Sourced => asRead(source, source.text.replace(from, () => to));

interface OmxfAnchor {
  readonly sectionMarkdown: string;
  readonly d19: readonly (readonly [string, string, string, readonly string[]])[];
  readonly arms: readonly { readonly id: string; readonly outcome: string; readonly editSha256: string }[];
  readonly forms: readonly (readonly [string, string, string])[];
  readonly onDiskSurvivors: readonly string[];
  readonly provenanceFalsifiers: readonly (readonly [string, readonly string[]])[];
  readonly reportBudgetRows: readonly string[];
  readonly literalRows: readonly OmxfLiteralRow[];
  readonly residuals: readonly OmxfResidual[];
}
type AnchorReading = { readonly ok: true; readonly anchor: OmxfAnchor } | { readonly ok: false; readonly why: string };
/** The expectation's anchor by SHAPE alone; its provenance is judged by expectationFailures, never here. */
function anchorShape(text: string): AnchorReading {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    return { ok: false, why: `not JSON: ${error instanceof Error ? error.message : String(error)}` };
  }
  if (!isRecord(raw) || typeof raw.sectionMarkdown !== "string" || ![raw.d19, raw.arms, raw.forms, raw.onDiskSurvivors, raw.provenanceFalsifiers, raw.reportBudgetRows, raw.literalRows, raw.residuals].every(Array.isArray)) {
    return { ok: false, why: "missing the section, falsifier, arm, form, survivor, provenance-falsifier, budget-row, literal-row or residual anchor" };
  }
  return { ok: true, anchor: raw as unknown as OmxfAnchor };
}

const OMXF_WHERE = `${EXAMPLES_FILE} § ${EXAMPLES_SECTION}`;
/** R695 (a), the expectation's side: the pinned fixture path, the pinned digest, and its text the bytes its digest names. */
function expectationFailures(expectation: Sourced): string[] {
  const out: string[] = [];
  if (expectation.provenance.path !== EXPECTATION.path) out.push(`${OMXF_WHERE}: PROVENANCE: expectation-path: the expectation was read from ${expectation.provenance.path}, not the frozen fixture ${EXPECTATION.path}`);
  if (expectation.provenance.sha256 !== EXPECTATION.sha256) out.push(`${OMXF_WHERE}: PROVENANCE: expectation-digest: the expectation's bytes digest to ${expectation.provenance.sha256}, not the pinned fixture digest ${EXPECTATION.sha256}`);
  if (sha256Hex(expectation.text) !== expectation.provenance.sha256) out.push(`${OMXF_WHERE}: PROVENANCE: expectation-bytes: the expectation's text is not the bytes its provenance names`);
  return out;
}
/** R695 (a), both sides: the expectation's checks, the subject read from docs/19 as the bytes its digest names, two distinct reads. */
function provenanceFailures(subject: Sourced, expectation: Sourced): string[] {
  const out = expectationFailures(expectation);
  if (subject.provenance.path !== EXAMPLES_FILE) out.push(`${OMXF_WHERE}: PROVENANCE: subject-path: the subject was read from ${subject.provenance.path}, not ${EXAMPLES_FILE}`);
  if (sha256Hex(subject.text) !== subject.provenance.sha256) out.push(`${OMXF_WHERE}: PROVENANCE: subject-bytes: the subject's text is not the bytes its provenance names`);
  if (subject.provenance.path === expectation.provenance.path || subject.provenance.sha256 === expectation.provenance.sha256) {
    out.push(`${OMXF_WHERE}: PROVENANCE: distinct: the subject and the expectation share a path or a digest; the expectation must be a read distinct from the subject`);
  }
  return out;
}

/**
 * R695 (b): equal the subject's WHOLE bounded block list to the expectation it is given, after asserting both
 * provenances, and vouch the expectation's RF sentence from the registry. It reads no file.
 */
function fullExampleFailures(subject: Sourced, expectation: Sourced, armsSentence: string): string[] {
  const failures = provenanceFailures(subject, expectation);
  const reading = anchorShape(expectation.text);
  if (!reading.ok) return [...failures, `${OMXF_WHERE}: PROVENANCE: expectation-shape: the expectation is not the fixture's section anchor: ${reading.why}`];
  const anchor = docsSection(`# ${EXAMPLES_PARENT}\n\n${reading.anchor.sectionMarkdown}`, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT]);
  if (!anchor.ok) return [...failures, `${OMXF_WHERE}: PROVENANCE: expectation-shape: the expectation's section is refused: ${anchor.why}`];
  const rfParagraph = anchor.blocks.at(-1);
  const sentence = rfParagraph?.kind === "paragraph" ? proseSentences(rfParagraph.text).filter(text => text.includes(RF_CAPABILITY)) : [];
  if (sentence.length !== 1 || sentence[0] !== armsSentence) failures.push(`${OMXF_WHERE}: REGISTRY: the expectation's RF sentence is not the registry's arms sentence: ${JSON.stringify(sentence)}`);
  const exact = sectionMatches(docsSection(subject.text, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT]), anchor.blocks);
  if (!exact.ok) failures.push(`${OMXF_WHERE}: FULL-SLICE: ${exact.why}`);
  return failures;
}
/** The kind of each full-slice line, in order; a PROVENANCE line carries the check it failed. */
const fullKinds = (lines: readonly string[]): string[] =>
  lines.map(line => {
    const kind = /: (PROVENANCE|REGISTRY|FULL-SLICE): /u.exec(line)?.[1] ?? "UNTYPED";
    return kind === "PROVENANCE" ? `PROVENANCE ${/: PROVENANCE: ([a-z-]+): /u.exec(line)?.[1] ?? "untyped"}` : kind;
  });

interface OmxfPair {
  readonly subject: Sourced;
  readonly expectation: Sourced;
}
/** The SUBJECT (docs/19) and the EXPECTATION (the fixture) read under one repo root, each with its own provenance. */
const readPair = (root: string): OmxfPair => ({ subject: readWithProvenance(root, EXAMPLES_FILE), expectation: readWithProvenance(root, OMXF_ANCHOR_FILE) });
/** The LIVE reading under a repo root: the pair it read, and the judge's findings over it. */
function liveReading(root: string): OmxfPair & { readonly findings: string[] } {
  const pair = readPair(root);
  return { ...pair, findings: fullExampleFailures(pair.subject, pair.expectation, registryArmsSentence()) };
}
/** The expectation's tables, for the table rows: refused unless its provenance is the pinned fixture's (R695 (b)). */
function expectedTables(expectation: Sourced): OmxfAnchor {
  const failures = expectationFailures(expectation);
  const reading = anchorShape(expectation.text);
  if (failures.length > 0 || !reading.ok) throw new Error(`${OMXF_ANCHOR_FILE}: the table rows refuse this expectation: ${[...failures, reading.ok ? "" : reading.why].filter(line => line !== "").join(" | ")}`);
  return reading.anchor;
}
/** An expectation drifted in memory: the fixture's section edited once, re-serialized, carrying the digest of its new bytes. */
function driftedExpectation(expectation: Sourced, from: string, to: string): Sourced {
  const reading = anchorShape(expectation.text);
  if (!reading.ok) throw new Error(`${OMXF_ANCHOR_FILE}: ${reading.why}`);
  if (reading.anchor.sectionMarkdown.split(from).length !== 2) throw new Error(`${JSON.stringify(from)} does not occur once in the expectation's section`);
  return asRead(expectation, `${JSON.stringify({ ...reading.anchor, sectionMarkdown: reading.anchor.sectionMarkdown.replace(from, () => to) }, null, 2)}\n`);
}
/** The text a drift form adds: its replacement without the text it keeps, or the whole replacement when it rewrites. */
const addedText = (from: string, to: string): string => (to.includes(from) ? to.replace(from, () => "") : to);

const OMXF_FORMS: readonly (readonly [string, string, string])[] = [
  ["G-D19-PARA-BEFORE-UNNAMED", "`furnace.run.inspect` accepts an existing `runId`", "The render preview below also accepts both input arms in one call.\n\n`furnace.run.inspect` accepts an existing `runId`"],
  ["G-D19-ELSEWHERE-SPACED", "not a task-scoped semantic dependency analysis.", "not a task-scoped semantic dependency analysis. The Reactive Fiber render preview also accepts both input arms in one call."],
  ["G-D19-ELSEWHERE-HYPHEN", "not a task-scoped semantic dependency analysis.", "not a task-scoped semantic dependency analysis. The Reactive-Fiber render preview also accepts both input arms in one call."],
  ["G-D19-QUOTEBLOCK-BEFORE", "`furnace.run.inspect` accepts an existing `runId`", "> Both input arms of the render preview below may be combined in one call.\n\n`furnace.run.inspect` accepts an existing `runId`"],
  ["G-D19-STRIKE-VIEW-ARM", "or `view` and `taskId` with an optional `model`, never both", "or ~~`view` and `taskId` with an optional `model`~~, never both"],
  ["G-D19-STRIKE", "never both; its workspace", "~~never both~~; its workspace"],
  ["X-UNNAMED-CODE", 'return {coverage: found.source.coverage_summary, runtime: found.runtime};\n', 'return {coverage: found.source.coverage_summary, runtime: found.runtime};\n// Both input arms may be combined\n'],
  ["X-UNNAMED-LIST", "`furnace.run.inspect` accepts an existing `runId`", "- Both input arms may be combined.\n\n`furnace.run.inspect` accepts an existing `runId`"],
  ["X-UNNAMED-H3", "`furnace.run.inspect` accepts an existing `runId`", "### Override\n\nBoth input arms may be combined.\n\n`furnace.run.inspect` accepts an existing `runId`"],
  ["X-PRIOR-PARAGRAPH-REWORD", "This query is a filesystem read, not a task-scoped semantic dependency analysis.", "This query is a semantic dependency analysis."],
];
/** R695 (c): the original R677 F1 survivors (the gate's six LEG-2 forms), each written ON DISK into a scratch repo root's docs/19. */
const OMXF_ON_DISK_IDS: readonly string[] = ["G-D19-PARA-BEFORE-UNNAMED", "G-D19-ELSEWHERE-SPACED", "G-D19-ELSEWHERE-HYPHEN", "G-D19-QUOTEBLOCK-BEFORE", "G-D19-STRIKE-VIEW-ARM", "G-D19-STRIKE"];
const OMXF_ON_DISK: readonly (readonly [string, string, string])[] = OMXF_ON_DISK_IDS.map(id => {
  const form = OMXF_FORMS.find(([formId]) => formId === id);
  if (form === undefined) throw new Error(`the on-disk survivor ${id} is not a drift form`);
  return form;
});
/**
 * R695 (a)/(b) falsifiers: each builds, from the LIVE pair, the pair the judge is handed, then the kinds it must draw.
 * Each PROVENANCE check is the only one at least one row trips (the pinned digest's is ANCHOR-SIDE's), so a judge that
 * stopped asserting any one of them, or compared a re-pointed anchor, reads red here.
 */
const OMXF_PROVENANCE: readonly (readonly [string, (pair: OmxfPair) => OmxfPair, readonly string[]])[] = [
  ["P-ANCHOR-LIVE-DOCS", ({ subject }) => ({ subject, expectation: readWithProvenance(ROOT, EXAMPLES_FILE) }), ["PROVENANCE expectation-path", "PROVENANCE expectation-digest", "PROVENANCE distinct", "PROVENANCE expectation-shape"]],
  ["P-ANCHOR-IS-SUBJECT", ({ subject }) => ({ subject, expectation: subject }), ["PROVENANCE expectation-path", "PROVENANCE expectation-digest", "PROVENANCE distinct", "PROVENANCE expectation-shape"]],
  ["P-ANCHOR-OTHER-PATH", ({ subject, expectation }) => ({ subject, expectation: { provenance: { path: "test/fixtures/docs19-full-section-omxf.copy.json", sha256: expectation.provenance.sha256 }, text: expectation.text } }), ["PROVENANCE expectation-path"]],
  ["P-ANCHOR-LYING-DIGEST", ({ subject, expectation }) => ({ subject, expectation: { provenance: expectation.provenance, text: driftedExpectation(expectation, OMXF_FORMS[0][1], OMXF_FORMS[0][2]).text } }), ["PROVENANCE expectation-bytes", "FULL-SLICE"]],
  ["P-ANCHOR-RESERIALIZED", ({ subject, expectation }) => ({ subject, expectation: { provenance: expectation.provenance, text: JSON.stringify(JSON.parse(expectation.text)) } }), ["PROVENANCE expectation-bytes"]],
  ["P-SUBJECT-IS-FIXTURE", ({ expectation }) => ({ subject: expectation, expectation }), ["PROVENANCE subject-path", "PROVENANCE distinct", "FULL-SLICE"]],
  ["P-SUBJECT-LYING-DIGEST", ({ subject, expectation }) => ({ subject: { provenance: subject.provenance, text: editedFrom(subject, OMXF_FORMS[0][1], OMXF_FORMS[0][2]).text }, expectation }), ["PROVENANCE subject-bytes", "FULL-SLICE"]],
  ["P-SUBJECT-OTHER-PATH", ({ subject, expectation }) => ({ subject: { provenance: { path: "docs/workbench/19-worked-examples.copy.md", sha256: subject.provenance.sha256 }, text: subject.text }, expectation }), ["PROVENANCE subject-path"]],
  ["P-SUBJECT-FIXTURE-BYTES", ({ subject, expectation }) => ({ subject: { provenance: { path: subject.provenance.path, sha256: expectation.provenance.sha256 }, text: expectation.text }, expectation }), ["PROVENANCE distinct", "FULL-SLICE"]],
];
/** R695 (d): the two report-judging rows of the R6-R9 block that carry R16_REPORT_BUDGET_MS, by title head. */
const R16_BUDGETED: readonly string[] = ["M5 (wb-973.16)", "DEL (wb-973.16)"];
const titleHeadOf = (title: string): string => title.slice(0, title.indexOf(":"));
const OMXF_JUDGED: string[] = [];

/**
 * wb-omxf cut #3 (R696, the terminal enumerate-the-resolvable form), claiming exactly this pinned set and no more:
 * (1) EXPECTATION.sha256 is a source-level STRING LITERAL pin. The LITERAL rows read this file's own TypeScript AST (the
 * hk9l literal-shape discipline). Row PIN reads the committed source: EXPECTATION is declared once, a module-scope const
 * whose initializer is an object literal of exactly the property assignments path and sha256, each a plain string literal -
 * never a call, template or identifier - the sha256 64 lowercase hex, and the runtime EXPECTATION is exactly those
 * literals. The falsifier rows splice into this file's source, in memory and never run, the kinds R696 names: the gate's
 * L2G-01 computed digest verbatim (a call), a template with and without a substitution, an identifier, and cut #2's
 * identifier path; the pin refuses each. No line of this file computes the EXPECTATION pin: every digest taken here is of
 * bytes read, compared against a literal.
 * (2) PROVENANCE expectation-digest stays as delivered at cut #2: a fixture byte edit under the kept literal reds every
 * full-slice row.
 * NAMED RESIDUAL (R696 (3)), the one self-anchoring channel above the literal pin: R-COORDINATED-LITERAL-AND-ANCHOR, a
 * coordinated edit of the literal AND its anchor - docs/19 and the fixture carrying the same in-section edit, the literal
 * moved to the new fixture bytes. Its id-asserted quiet row reads the family's page quiet and reds when the page stops
 * carrying any part of the edit; its runtime reading, stated in the row: the whole census reads green under it. No other
 * escape is claimed absent. The LITERAL rows (PIN included) and the residual's id, family, form, reading and runtime are
 * anchored out of file in the fixture.
 */
interface ExpectationLiteral {
  /** What the AST read, one line per refusal; none is the quiet reading. */
  readonly findings: readonly string[];
  /** The two literals' texts, when every check passed. */
  readonly pin: Provenance | undefined;
}
/** The kind R696 names for an initializer: a plain string literal, a call, a template or an identifier; anything else by its syntax. */
const initializerKind = (node: ts.Node): string => {
  if (ts.isStringLiteral(node)) return "a string literal";
  if (ts.isCallExpression(node)) return "a call";
  if (ts.isTemplateExpression(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTaggedTemplateExpression(node)) return "a template";
  if (ts.isIdentifier(node)) return "an identifier";
  return `other syntax (${ts.SyntaxKind[node.kind]})`;
};
/** Every declaration named EXPECTATION in a source, in source order. */
function expectationDeclarations(file: ts.SourceFile): ts.VariableDeclaration[] {
  const found: ts.VariableDeclaration[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "EXPECTATION") found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** R696 (1): EXPECTATION's literal shape in a source text of this file, read by the TypeScript AST, never by running it. */
function expectationLiteral(source: string): ExpectationLiteral {
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declarations = expectationDeclarations(file);
  if (declarations.length !== 1) return { findings: [`EXPECTATION is declared ${declarations.length} times, not once`], pin: undefined };
  const [declaration] = declarations;
  const findings: string[] = [];
  const list = declaration.parent;
  if (!ts.isVariableDeclarationList(list) || (list.flags & ts.NodeFlags.Const) === 0 || !ts.isVariableStatement(list.parent) || list.parent.parent !== file) {
    findings.push("EXPECTATION is not a module-scope const");
  }
  const initializer = declaration.initializer;
  if (initializer === undefined || !ts.isObjectLiteralExpression(initializer)) {
    return { findings: [...findings, `EXPECTATION's initializer is ${initializer === undefined ? "missing" : initializerKind(initializer)}, not an object literal`], pin: undefined };
  }
  const texts = new Map<string, string>();
  const members: string[] = [];
  for (const member of initializer.properties) {
    if (!ts.isPropertyAssignment(member) || !ts.isIdentifier(member.name)) {
      members.push(`<${ts.SyntaxKind[member.kind]}>`);
      continue;
    }
    members.push(member.name.text);
    if (ts.isStringLiteral(member.initializer)) texts.set(member.name.text, member.initializer.text);
    else findings.push(`EXPECTATION.${member.name.text} is ${initializerKind(member.initializer)}, not a string literal`);
  }
  if (members.join(" ") !== "path sha256") findings.push(`EXPECTATION's members are ${members.join(" ")}, not exactly the property assignments path sha256`);
  const path = texts.get("path");
  const sha256 = texts.get("sha256");
  if (sha256 !== undefined && !/^[0-9a-f]{64}$/u.test(sha256)) findings.push("EXPECTATION.sha256 is not 64 lowercase hex");
  return { findings, pin: findings.length === 0 && path !== undefined && sha256 !== undefined ? { path, sha256 } : undefined };
}
/** A source text of this file with one EXPECTATION property's initializer replaced once, located by the AST (a page, never run). */
function withExpectationProperty(source: string, property: string, replacement: string): string {
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const [declaration] = expectationDeclarations(file);
  const initializer = declaration?.initializer;
  const member = initializer !== undefined && ts.isObjectLiteralExpression(initializer) ? initializer.properties.find(entry => ts.isPropertyAssignment(entry) && ts.isIdentifier(entry.name) && entry.name.text === property) : undefined;
  if (member === undefined || !ts.isPropertyAssignment(member)) throw new Error(`${SELF}: EXPECTATION has no ${property} property assignment to replace`);
  return `${source.slice(0, member.initializer.getStart(file))}${replacement}${source.slice(member.initializer.getEnd())}`;
}

/** One EXPECTATION property's initializer replaced by a source text. */
interface LiteralEdit {
  readonly property: string;
  readonly replacement: string;
}
/** A LITERAL row: [id, the edit of this file's source it reads (null: the committed source), the findings the pin must draw]. */
type OmxfLiteralRow = readonly [string, LiteralEdit | null, readonly string[]];
/**
 * R696 (1): row PIN reads the committed source, quiet; each falsifier replaces one EXPECTATION property's initializer, parsed
 * and never run. L2G-01 is the gate's own replacement, verbatim; the others are the kinds R696 names (a template with and
 * without a substitution, an identifier) and cut #2's identifier path.
 */
const OMXF_LITERAL: readonly OmxfLiteralRow[] = [
  ["PIN", null, []],
  ["L2G-01", { property: "sha256", replacement: 'createHash("sha256").update(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))).digest("hex")' }, ["EXPECTATION.sha256 is a call, not a string literal"]],
  ["L-SHA-TEMPLATE", { property: "sha256", replacement: `\`\${createHash("sha256").update(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))).digest("hex")}\`` }, ["EXPECTATION.sha256 is a template, not a string literal"]],
  ["L-SHA-PLAIN-TEMPLATE", { property: "sha256", replacement: "`0000000000000000000000000000000000000000000000000000000000000000`" }, ["EXPECTATION.sha256 is a template, not a string literal"]],
  ["L-SHA-IDENTIFIER", { property: "sha256", replacement: "OMXF_FIXTURE_SHA256" }, ["EXPECTATION.sha256 is an identifier, not a string literal"]],
  ["L-PATH-IDENTIFIER", { property: "path", replacement: "OMXF_ANCHOR_FILE" }, ["EXPECTATION.path is an identifier, not a string literal"]],
];

/** R696 (3): a named residual, its family's page and its quiet and runtime readings, anchored out of file in the fixture. */
interface OmxfResidual {
  readonly id: string;
  readonly family: string;
  /** The drift form the page applies alike to docs/19 and to the fixture's section. */
  readonly form: string;
  /** What this file reads on the family's page. */
  readonly reading: string;
  /** What the whole census reads, run under the family's edit. */
  readonly runtime: string;
}
const OMXF_RESIDUALS: readonly OmxfResidual[] = [
  {
    id: "R-COORDINATED-LITERAL-AND-ANCHOR",
    family: "a coordinated edit of the EXPECTATION sha256 literal AND its anchor: docs/19 and the fixture carry the same in-section edit and the literal moves to the new fixture bytes",
    form: "G-D19-PARA-BEFORE-UNNAMED",
    reading: "quiet: the literal-shape pin reads a moved 64-hex string literal exactly as it reads the pinned one, and the delivered judge's only finding on the page's docs/19 and fixture is PROVENANCE expectation-digest, the literal the edit moves",
    runtime: "quiet: with docs/19, the fixture and the EXPECTATION sha256 literal edited together, the whole census reads green (LIVE, every PROVENANCE check, FULL-SLICE and the LITERAL rows); no reading in this file tells a reviewed coordinated edit from drift, so the edit is the review: its diff moves the literal",
  },
];

describe("wb-omxf R677 + R695 full docs19 section equality (explicit expectation with asserted provenance, no NAMES_RF selection)", () => {
  const omxfScratch: string[] = [];
  afterEach(() => {
    removeScratch(...omxfScratch.splice(0));
  });
  /** A scratch repo root holding docs/19 (through edit) and the fixture's committed bytes, for the LIVE reading on disk. */
  const scratchRepo = (edit: (docs: string) => string): string => {
    const root = makeScratch("census-omxf-");
    omxfScratch.push(root);
    mkdirSync(join(root, dirname(EXAMPLES_FILE)), { recursive: true });
    mkdirSync(join(root, dirname(OMXF_ANCHOR_FILE)), { recursive: true });
    writeFileSync(join(root, EXAMPLES_FILE), edit(readRepo(EXAMPLES_FILE)));
    writeFileSync(join(root, OMXF_ANCHOR_FILE), readFileSync(join(ROOT, OMXF_ANCHOR_FILE)));
    return root;
  };

  it("LIVE (R695 (a)): docs/19 is the SUBJECT read from its real path, the fixture the EXPECTATION read from its pinned path and digest; the two provenances are distinct and the full section equals the expectation", () => {
    const { subject, expectation, findings } = liveReading(ROOT);
    expect(subject.provenance).toEqual({ path: "docs/workbench/19-worked-examples.md", sha256: createHash("sha256").update(readFileSync(join(ROOT, EXAMPLES_FILE))).digest("hex") });
    expect(expectation.provenance).toEqual(EXPECTATION);
    expect(EXPECTATION).toEqual({ path: "test/fixtures/docs19-full-section-omxf.json", sha256: createHash("sha256").update(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))).digest("hex") });
    expect(subject.provenance.path).not.toBe(expectation.provenance.path);
    expect(subject.provenance.sha256).not.toBe(expectation.provenance.sha256);
    expect(findings).toEqual([]);
    // The row's own channel, outside the judge: the subject's rendered section equals the blocks of the expectation's section,
    // so drift on disk reds LIVE itself even under a judge whose anchor was re-pointed (L2-J-ANCHOR-LIVE + an F1 survivor on disk).
    const expected = expectedTables(expectation).sectionMarkdown;
    expect(expected).toContain("`reactivefiber.render.preview` accepts exactly one of two input arms");
    const anchor = docsSection(`# ${EXAMPLES_PARENT}\n\n${expected}`, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT]);
    expect(anchor.ok, anchor.why).toBe(true);
    expect(sectionMatches(docsSection(subject.text, EXAMPLES_SECTION, 2, [EXAMPLES_PARENT]), anchor.blocks)).toEqual({ ok: true, why: "" });
    OMXF_JUDGED.push("LIVE");
  });

  it.each(OMXF_FORMS)("%s: a full-section drift of the SUBJECT is refused by the full-slice judge itself, against the explicit expectation", (id, from, to) => {
    const { subject, expectation } = readPair(ROOT);
    expect(subject.text.split(from), `${id} applies once`).toHaveLength(2);
    const drifted = editedFrom(subject, from, to);
    expect(drifted.text).not.toBe(subject.text);
    const findings = fullExampleFailures(drifted, expectation, registryArmsSentence());
    expect(fullKinds(findings), `${id}: the full-slice judge must refuse, not another falsifier's missing anchor: ${findings.join(" | ")}`).toEqual(["FULL-SLICE"]);
    OMXF_JUDGED.push(id);
  });

  it.each(OMXF_FORMS)("ANCHOR-SIDE %s: the live page against an expectation drifted in memory is refused FULL-SLICE, the judge comparing the expectation it is given (never the live page), and PROVENANCE for the unpinned digest", (id, from, to) => {
    const { subject, expectation } = readPair(ROOT);
    const drifted = driftedExpectation(expectation, from, to);
    expect(drifted.text).not.toBe(expectation.text);
    const findings = fullExampleFailures(subject, drifted, registryArmsSentence());
    expect(fullKinds(findings), `${id}: ${findings.join(" | ")}`).toEqual(["PROVENANCE expectation-digest", "FULL-SLICE"]);
    OMXF_JUDGED.push(`ANCHOR-SIDE ${id}`);
  });

  it.each(OMXF_PROVENANCE)("%s: the judge refuses a re-pointed or misattributed read by its provenance before or beside any block comparison", (id, build, kinds) => {
    const live = readPair(ROOT);
    const { subject, expectation } = build(live);
    expect(subject === live.subject && expectation === live.expectation, `${id} changes the pair`).toBe(false);
    const findings = fullExampleFailures(subject, expectation, registryArmsSentence());
    expect(fullKinds(findings), `${id}: ${findings.join(" | ")}`).toEqual(kinds);
    OMXF_JUDGED.push(id);
  });

  it.each(OMXF_ON_DISK)("ON-DISK %s: docs/19 carrying the R677 F1 survivor on disk (a scratch repo root) reds the LIVE reading itself, FULL-SLICE", (id, from, to) => {
    const root = scratchRepo(docs => {
      expect(docs.split(from), `${id} applies once`).toHaveLength(2);
      return docs.replace(from, () => to);
    });
    const { subject, expectation, findings } = liveReading(root);
    expect(subject.provenance.path).toBe(EXAMPLES_FILE);
    expect(subject.provenance.sha256, id).not.toBe(readPair(ROOT).subject.provenance.sha256);
    expect(expectation.provenance).toEqual(EXPECTATION);
    expect(fullKinds(findings), `${id}: ${findings.join(" | ")}`).toEqual(["FULL-SLICE"]);
    OMXF_JUDGED.push(`ON-DISK ${id}`);
  });

  it("ON-DISK controls: the same scratch procedure with docs/19's own bytes reads quiet (same delay), and each survivor's added text in a following level-2 section reads quiet (same edit, outside the claim)", () => {
    const same = liveReading(scratchRepo(docs => docs));
    expect(same.subject.provenance).toEqual(readPair(ROOT).subject.provenance);
    expect(same.findings).toEqual([]);
    for (const [id, from, to] of OMXF_ON_DISK) {
      const outside = liveReading(scratchRepo(docs => `${docs}\n## Errata\n\n${addedText(from, to)}\n`));
      expect(outside.subject.text, id).toContain(addedText(from, to));
      expect(outside.findings, id).toEqual([]);
    }
    OMXF_JUDGED.push("ON-DISK CONTROLS");
  });

  it("F2 external anchor: both landed falsifier tables equal their out-of-file rows, including edit texts and function digests (the digests bind vitest's transformed function text: the F2 toolchain coupling)", () => {
    const { subject, expectation } = readPair(ROOT);
    expect(() => expectedTables(subject), "the table rows refuse the docs page as their expectation").toThrow(/expectation-path/u);
    expect(() => expectedTables(driftedExpectation(expectation, OMXF_FORMS[0][1], OMXF_FORMS[0][2])), "and an expectation whose bytes are not the pinned fixture's").toThrow(/expectation-digest/u);
    const tables = expectedTables(expectation);
    expect(D19_FALSIFIERS).toEqual(tables.d19);
    expect(ARM_EDITS.map(([id, edit, outcome]) => ({ id, outcome, editSha256: createHash("sha256").update(edit.toString()).digest("hex") }))).toEqual(tables.arms);
    OMXF_JUDGED.push("F2");
  });

  it("F3: duplicate naming sentences are refused by the landed SENTENCE count judge (independent of SLICE)", () => {
    const live = readRepo(EXAMPLES_FILE);
    const mutant = live.replace("must not be advertised as a durable RF artifact.", `must not be advertised as a durable RF artifact. ${EXAMPLE_ARMS_SENTENCE}`);
    expect(mutant).not.toBe(live);
    expect(judgementKinds(exampleFailures(mutant, registryArmsSentence()))).toContain("SENTENCE");
    OMXF_JUDGED.push("F3");
  });

  it("BOUNDARY quiet row: a contradictory following level-2 section is outside this section's full-slice claim", () => {
    const { subject, expectation } = readPair(ROOT);
    const appended = asRead(subject, `${subject.text}\n## Errata\n\nBoth input arms may be combined in one call.\n`);
    expect(appended.text).not.toBe(subject.text);
    expect(fullExampleFailures(appended, expectation, registryArmsSentence())).toEqual([]);
    OMXF_JUDGED.push("BOUNDARY");
  });

  it("REGISTRY: every descriptor edit moves the expectation's vouched RF sentence (REGISTRY) or is refused (both registrations)", () => {
    const { subject, expectation } = readPair(ROOT);
    for (const descriptor of registeredDescriptors()) {
      for (const [id, edit] of ARM_EDITS) {
        const reading = armsSentenceOf(edit(descriptor));
        if (reading.ok) expect(fullKinds(fullExampleFailures(subject, expectation, reading.sentence)), id).toEqual(["REGISTRY"]);
        else expect(reading.why, id).not.toBe("");
      }
    }
    OMXF_JUDGED.push("REGISTRY");
  });

  it("BUDGET (R695 (d), the R687 explicit-budget shape): exactly M5 and DEL run on R16_REPORT_BUDGET_MS, read back from the runner's own registered tasks, each title once; the budget is a whole 5 s above vitest's default and 5 x the worst wall of record", ({ task }) => {
    const registered: { readonly name: string; readonly timeout: number }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, timeout: child.timeout });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const budgeted = registered.filter(entry => entry.timeout === R16_REPORT_BUDGET_MS).map(entry => titleHeadOf(entry.name));
    expect(budgeted, "the cases that run under R16_REPORT_BUDGET_MS, by title head").toEqual(R16_BUDGETED);
    expect(budgeted, "the budgeted rows of record, out of file").toEqual(expectedTables(readPair(ROOT).expectation).reportBudgetRows);
    for (const head of R16_BUDGETED) expect(registered.filter(entry => titleHeadOf(entry.name) === head), `${head} is registered once`).toHaveLength(1);
    expect(R16_REPORT_BUDGET_MS, "above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(R16_REPORT_BUDGET_MS, "5 x the worst wall of record").toBeGreaterThanOrEqual(5 * R16_WORST_WALL_MS);
    expect(R16_REPORT_BUDGET_MS % 5_000, "a whole 5 s").toBe(0);
    OMXF_JUDGED.push("BUDGET");
  });

  it.each(OMXF_LITERAL)("LITERAL %s (R696 (1)): this file's own AST reads EXPECTATION's literal shape - PIN, the committed source: declared once, a module-scope const object literal whose path and sha256 are plain string literals (never a call, template or identifier) and the runtime EXPECTATION; a falsifier, one property replaced in memory (parsed, never run): refused", (id, edit, findings) => {
    const own = readRepo(SELF);
    const page = edit === null ? own : withExpectationProperty(own, edit.property, edit.replacement);
    expect(page === own, `${id}: only PIN reads the committed source unedited`).toBe(edit === null);
    const reading = expectationLiteral(page);
    expect(reading.findings, `${id}: ${reading.findings.join(" | ")}`).toEqual(findings);
    expect(reading.pin, `${id}: PIN's literals are the runtime EXPECTATION; a refused page leaves no pin`).toEqual(edit === null ? EXPECTATION : undefined);
    OMXF_JUDGED.push(`LITERAL ${id}`);
  });

  it("RESIDUAL R-COORDINATED-LITERAL-AND-ANCHOR quiet row (R696 (3), the named residual above the literal pin): docs/19, the fixture and the EXPECTATION literal edited together read quiet here, and the row reds when its page stops carrying any part of that edit", () => {
    const residual = OMXF_RESIDUALS[0];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-COORDINATED-LITERAL-AND-ANCHOR");
    const form = OMXF_FORMS.find(([id]) => id === residual.form);
    if (form === undefined) throw new Error(`${residual.id}: ${residual.form} is not a drift form`);
    const [, from, to] = form;
    const { subject, expectation } = readPair(ROOT);
    const own = readRepo(SELF);
    // A stand-in for the moved literal: a 64-hex string literal other than the pinned one. A coordinated edit writes the new
    // fixture's digest there; the shape pin reads no value, so the stand-in is read exactly as that digest would be.
    const moved = "0".repeat(64);
    const page = { subject: editedFrom(subject, from, to), expectation: driftedExpectation(expectation, from, to), source: withExpectationProperty(own, "sha256", JSON.stringify(moved)) };
    // Liveness: the page carries the family's whole edit - docs/19 and the fixture drifted alike, the literal moved.
    expect(page.subject.provenance.sha256, "docs/19 carries the edit").not.toBe(subject.provenance.sha256);
    expect(page.expectation.provenance.sha256, "the fixture carries the edit").not.toBe(EXPECTATION.sha256);
    expect(moved, "the page moves the literal").not.toBe(EXPECTATION.sha256);
    // The quiet reading: the shape pin reads the moved literal as it reads the pinned one, and the delivered judge's only
    // finding on the page's docs/19 and fixture is the literal the page moves.
    expect(expectationLiteral(page.source)).toEqual({ findings: [], pin: { path: EXPECTATION.path, sha256: moved } });
    expect(fullKinds(fullExampleFailures(page.subject, page.expectation, registryArmsSentence()))).toEqual(["PROVENANCE expectation-digest"]);
    OMXF_JUDGED.push(`RESIDUAL ${residual.id}`);
  });

  it("FROZEN SHAPE: every judged member reaches its last assertion, each table's shape is frozen here and equal to its out-of-file anchor", () => {
    expect(OMXF_FORMS.map(([id]) => `${id}:1`)).toEqual([
      "G-D19-PARA-BEFORE-UNNAMED:1", "G-D19-ELSEWHERE-SPACED:1", "G-D19-ELSEWHERE-HYPHEN:1", "G-D19-QUOTEBLOCK-BEFORE:1", "G-D19-STRIKE-VIEW-ARM:1", "G-D19-STRIKE:1", "X-UNNAMED-CODE:1", "X-UNNAMED-LIST:1", "X-UNNAMED-H3:1", "X-PRIOR-PARAGRAPH-REWORD:1",
    ]);
    expect(OMXF_ON_DISK.map(([id]) => `${id}:1`)).toEqual([
      "G-D19-PARA-BEFORE-UNNAMED:1", "G-D19-ELSEWHERE-SPACED:1", "G-D19-ELSEWHERE-HYPHEN:1", "G-D19-QUOTEBLOCK-BEFORE:1", "G-D19-STRIKE-VIEW-ARM:1", "G-D19-STRIKE:1",
    ]);
    expect(OMXF_PROVENANCE.map(([id, , kinds]) => `${id}:${kinds.length}`)).toEqual([
      "P-ANCHOR-LIVE-DOCS:4", "P-ANCHOR-IS-SUBJECT:4", "P-ANCHOR-OTHER-PATH:1", "P-ANCHOR-LYING-DIGEST:2", "P-ANCHOR-RESERIALIZED:1", "P-SUBJECT-IS-FIXTURE:3", "P-SUBJECT-LYING-DIGEST:2", "P-SUBJECT-OTHER-PATH:1", "P-SUBJECT-FIXTURE-BYTES:2",
    ]);
    expect(R16_BUDGETED.map(head => `${head}:1`)).toEqual(["M5 (wb-973.16):1", "DEL (wb-973.16):1"]);
    expect(OMXF_LITERAL.map(([id, edit, findings]) => `${id}:${edit?.property ?? "-"}:${findings.length}`)).toEqual([
      "PIN:-:0", "L2G-01:sha256:1", "L-SHA-TEMPLATE:sha256:1", "L-SHA-PLAIN-TEMPLATE:sha256:1", "L-SHA-IDENTIFIER:sha256:1", "L-PATH-IDENTIFIER:path:1",
    ]);
    expect(OMXF_RESIDUALS.map(residual => `${residual.id}:${residual.form}`)).toEqual(["R-COORDINATED-LITERAL-AND-ANCHOR:G-D19-PARA-BEFORE-UNNAMED"]);
    expect(OMXF_JUDGED).toEqual([
      "LIVE",
      ...OMXF_FORMS.map(([id]) => id),
      ...OMXF_FORMS.map(([id]) => `ANCHOR-SIDE ${id}`),
      ...OMXF_PROVENANCE.map(([id]) => id),
      ...OMXF_ON_DISK.map(([id]) => `ON-DISK ${id}`),
      "ON-DISK CONTROLS",
      "F2",
      "F3",
      "BOUNDARY",
      "REGISTRY",
      "BUDGET",
      ...OMXF_LITERAL.map(([id]) => `LITERAL ${id}`),
      ...OMXF_RESIDUALS.map(({ id }) => `RESIDUAL ${id}`),
    ]);
    const tables = expectedTables(readPair(ROOT).expectation);
    expect(OMXF_FORMS).toEqual(tables.forms);
    expect(OMXF_ON_DISK_IDS).toEqual(tables.onDiskSurvivors);
    expect(OMXF_PROVENANCE.map(([id, , kinds]) => [id, kinds])).toEqual(tables.provenanceFalsifiers);
    expect(R16_BUDGETED).toEqual(tables.reportBudgetRows);
    expect(OMXF_LITERAL).toEqual(tables.literalRows);
    expect(OMXF_RESIDUALS).toEqual(tables.residuals);
    expect(tables.d19).toHaveLength(8);
    expect(tables.arms).toHaveLength(8);
  });
});

/**
 * wb-lybr (R699 Q3, the landing-247 follow-up of the g10-gate-s20 PREP finding F1, L2G-43 READER-REPOINT): every read of
 * EXPECTATION resolves to the literal identifier. The LITERAL rows above pin EXPECTATION's declaration; these rows pin its
 * READS, by this file's own AST and the TypeScript checker over this one source (a program of the source alone: no lib,
 * no module resolution, nothing emitted, never run). A read is an identifier named EXPECTATION that is not a declaration
 * or member name. Claiming exactly this pinned set and no more:
 * (1) RESOLVES: every read binds to the one module-scope declaration of EXPECTATION - never to a parameter, a nested
 * declaration, a binding element or any other shadow (line "shadowed").
 * (2) NO ALIAS: no read is carried into another binding before a reader consumes it - a variable, parameter, binding element
 * or property initializer, an assignment, a return or an arrow function's result (line "carried"), so no alias and no
 * computed provenance stands between the literal and its readers.
 * (3) ROSTER: the reads are exactly READ_ROSTER, each keyed by its site (the enclosing function, test row or suite by title
 * head, or module-scope declaration) and its reader (the if condition it is compared in, the template it is interpolated
 * into, or the statement that consumes it; template literals elided, whitespace collapsed). A reader re-pointed to a
 * stand-in reads "missing" and a read added anywhere reads "unexpected". The roster is anchored out of file (the fixture's
 * readRoster, read behind the fixture's pinned provenance); the ANCHOR row judges the committed source against it.
 * Each falsifier row edits this file's source in memory by AST position (parsed and bound, never run) and must draw exactly
 * its lines. L2G-43 is the gate's READER-REPOINT: its declared line verbatim, its four re-points located by roster key.
 * NAMED RESIDUAL R-COORDINATED-READER-ROSTER (its pinned quiet row below): a reader re-pointed to a stand-in that never
 * names EXPECTATION, edited together with the roster, its frozen shape, the fixture's readRoster and the EXPECTATION sha256
 * literal. No other escape is claimed absent.
 */
/** One AST-located edit of this file's source, applied in memory to a page that is parsed and bound, never run. */
type ReadsEdit =
  | { readonly op: "declare"; readonly after: string; readonly text: string }
  | { readonly op: "parameter"; readonly fn: string; readonly text: string }
  | { readonly op: "prepend"; readonly site: string; readonly text: string }
  | { readonly op: "repoint"; readonly read: string; readonly to: string };
/** A roster row: [site, every reader of EXPECTATION at that site, in source order]. */
type ReadRosterRow = readonly [string, readonly string[]];
/** A READS row: [id, the edits of this file's source it reads (null: the committed source), the lines the pin must draw]. */
type ReadsRow = readonly [string, readonly ReadsEdit[] | null, readonly string[]];
/** A read of EXPECTATION, located: the access it starts, its site and reader, the binding it is carried into, its declaration. */
interface LocatedRead {
  readonly access: ts.Expression;
  readonly site: string;
  readonly reader: string;
  readonly carried: string | undefined;
  readonly declaration: ts.Declaration | undefined;
}
/** What the reads pin found over a source against a roster: one line per refusal, and the reads grouped by site. */
interface ReadsReading {
  readonly lines: readonly string[];
  readonly bySite: readonly ReadRosterRow[];
}
const readKey = (site: string, reader: string): string => `${site} | ${reader}`;

/** This source alone as a TypeScript program (no lib, no module resolution, nothing emitted): its checker binds the names. */
function boundSource(source: string): { readonly file: ts.SourceFile; readonly checker: ts.TypeChecker } {
  const parsed = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === SELF ? parsed : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "",
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === SELF,
    readFile: name => (name === SELF ? source : undefined),
  };
  const program = ts.createProgram({ rootNames: [SELF], options: { noLib: true, noResolve: true, types: [], noEmit: true }, host });
  const file = program.getSourceFile(SELF);
  if (file !== parsed) throw new Error(`${SELF}: the program did not bind the source it was given`);
  return { file, checker: program.getTypeChecker() };
}

const READ_REGISTRARS: ReadonlySet<string> = new Set(["it", "test", "describe"]);
const readTitleHead = (title: string): string => (title.includes(":") ? title.slice(0, title.indexOf(":")) : title);
/** The site a function stands for when it is the callback of it(...), test(...) or describe(...), directly or through .each. */
function registrationSite(node: ts.Node): string | undefined {
  if (!ts.isArrowFunction(node) && !ts.isFunctionExpression(node)) return undefined;
  const call = node.parent;
  if (!ts.isCallExpression(call) || call.arguments.indexOf(node) < 1) return undefined;
  const callee = call.expression;
  const base = ts.isCallExpression(callee) && ts.isPropertyAccessExpression(callee.expression) && callee.expression.name.text === "each" ? callee.expression.expression : callee;
  const [title] = call.arguments;
  if (!ts.isIdentifier(base) || !READ_REGISTRARS.has(base.text) || !(ts.isStringLiteral(title) || ts.isNoSubstitutionTemplateLiteral(title))) return undefined;
  return `${base.text === "describe" ? "describe" : "it"} ${readTitleHead(title.text)}`;
}
const isModuleScope = (declaration: ts.VariableDeclaration): boolean =>
  ts.isVariableDeclarationList(declaration.parent) && ts.isVariableStatement(declaration.parent.parent) && ts.isSourceFile(declaration.parent.parent.parent);
const declarationKeyword = (declaration: ts.VariableDeclaration): string => {
  const flags = declaration.parent.flags;
  if ((flags & ts.NodeFlags.Const) !== 0) return "const";
  return (flags & ts.NodeFlags.Let) !== 0 ? "let" : "var";
};
/** Where a node sits: its enclosing function, test row or suite (by title head), or module-scope declaration; else the module. */
function readSiteOf(node: ts.Node): string {
  for (let at: ts.Node = node; !ts.isSourceFile(at); at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return `function ${at.name.text}`;
    const registered = registrationSite(at);
    if (registered !== undefined) return registered;
    if (ts.isVariableDeclaration(at) && isModuleScope(at)) return `${declarationKeyword(at)} ${at.name.getText()}`;
  }
  return "module";
}
/** A node's source text with template literals elided and whitespace collapsed: the stable key of a reader. */
function readerTextOf(node: ts.Node, file: ts.SourceFile): string {
  const elided: (readonly [number, number])[] = [];
  const visit = (child: ts.Node): void => {
    if (ts.isTemplateExpression(child) || ts.isNoSubstitutionTemplateLiteral(child)) elided.push([child.getStart(file), child.getEnd()]);
    else ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  let text = "";
  let at = node.getStart(file);
  for (const [from, to] of elided) {
    text += `${file.text.slice(at, from)}\`...\``;
    at = to;
  }
  return `${text}${file.text.slice(at, node.getEnd())}`.replace(/\s+/gu, " ");
}
/** The access a read starts: the identifier, or the member chain rooted at it (EXPECTATION.sha256). */
function accessOf(identifier: ts.Identifier): ts.Expression {
  let access: ts.Expression = identifier;
  while ((ts.isPropertyAccessExpression(access.parent) || ts.isElementAccessExpression(access.parent)) && access.parent.expression === access) access = access.parent;
  return access;
}
type Binding = ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement | ts.PropertyDeclaration;
const bindingKindOf = (binding: Binding): string => {
  if (ts.isVariableDeclaration(binding)) return declarationKeyword(binding);
  if (ts.isParameter(binding)) return "parameter";
  return ts.isBindingElement(binding) ? "binding element" : "property";
};
/** The reader that consumes an access, or the binding (or result) it is carried into before any reader consumes it. */
function readerOf(access: ts.Expression, file: ts.SourceFile): { readonly reader: string; readonly carried: string | undefined } {
  let node: ts.Node = access;
  while (!ts.isSourceFile(node.parent)) {
    const parent = node.parent;
    if (ts.isTemplateSpan(parent)) return { reader: `template ${readerTextOf(access, file)}`, carried: undefined };
    if ((ts.isIfStatement(parent) && parent.expression === node) || ts.isExpressionStatement(parent)) return { reader: readerTextOf(node, file), carried: undefined };
    if ((ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent) || ts.isPropertyDeclaration(parent)) && parent.initializer === node) {
      return { reader: readerTextOf(parent, file), carried: `the ${bindingKindOf(parent)} ${parent.name.getText(file)}` };
    }
    if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) return { reader: readerTextOf(parent, file), carried: "an assignment" };
    if (ts.isReturnStatement(parent)) return { reader: readerTextOf(parent, file), carried: "a return" };
    if (ts.isArrowFunction(parent) && parent.body === node) return { reader: readerTextOf(parent, file), carried: "an arrow function's result" };
    if (ts.isStatement(parent)) return { reader: readerTextOf(ts.isStatement(node) ? node : parent, file), carried: undefined };
    node = parent;
  }
  return { reader: readerTextOf(node, file), carried: undefined };
}
/** A read of EXPECTATION at an identifier, or undefined when the identifier is a member name or a declaration's own name. */
function locatedRead(identifier: ts.Identifier, file: ts.SourceFile, checker: ts.TypeChecker): LocatedRead | undefined {
  const parent = identifier.parent;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === identifier) || (ts.isQualifiedName(parent) && parent.right === identifier) || (ts.isBindingElement(parent) && parent.propertyName === identifier)) return undefined;
  const shorthand = ts.isShorthandPropertyAssignment(parent);
  const symbol = shorthand ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(identifier);
  if (!shorthand && symbol?.declarations?.some(declaration => ts.getNameOfDeclaration(declaration) === identifier)) return undefined;
  const access = accessOf(identifier);
  return { access, site: readSiteOf(identifier), ...readerOf(access, file), declaration: symbol?.valueDeclaration ?? symbol?.declarations?.[0] };
}
/** Every read of EXPECTATION in a bound source, in source order. */
function locateReads(file: ts.SourceFile, checker: ts.TypeChecker): LocatedRead[] {
  const reads: LocatedRead[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === "EXPECTATION") {
      const read = locatedRead(node, file, checker);
      if (read !== undefined) reads.push(read);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return reads;
}
const declarationKindOf = (declaration: ts.Declaration): string => {
  if (ts.isParameter(declaration)) return "a parameter";
  if (ts.isVariableDeclaration(declaration)) return `a ${declarationKeyword(declaration)} declaration`;
  return ts.isBindingElement(declaration) ? "a binding element" : `a ${ts.SyntaxKind[declaration.kind]}`;
};
function readsBySite(reads: readonly LocatedRead[]): ReadRosterRow[] {
  const rows: (readonly [string, string[]])[] = [];
  for (const read of reads) {
    const row = rows.find(([site]) => site === read.site);
    if (row === undefined) rows.push([read.site, [read.reader]]);
    else row[1].push(read.reader);
  }
  return rows;
}
/** wb-lybr (1)-(3): the reads of EXPECTATION in a source of this file, judged against a roster (parsed and bound, never run). */
function expectationReads(source: string, roster: readonly ReadRosterRow[]): ReadsReading {
  const { file, checker } = boundSource(source);
  const modules = expectationDeclarations(file).filter(isModuleScope);
  const literal = modules.length === 1 ? modules[0] : undefined;
  const reads = locateReads(file, checker);
  const lines: string[] = [];
  for (const read of reads) {
    const key = readKey(read.site, read.reader);
    if (literal === undefined || read.declaration !== literal) {
      lines.push(`shadowed: ${key} -> resolves to ${read.declaration === undefined ? "no declaration" : `${declarationKindOf(read.declaration)} in ${readSiteOf(read.declaration)}`}`);
    }
    if (read.carried !== undefined) lines.push(`carried: ${key} -> into ${read.carried}`);
  }
  const remaining = roster.flatMap(([site, readers]) => readers.map(reader => readKey(site, reader)));
  const unexpected: string[] = [];
  for (const read of reads) {
    const at = remaining.indexOf(readKey(read.site, read.reader));
    if (at < 0) unexpected.push(readKey(read.site, read.reader));
    else remaining.splice(at, 1);
  }
  return { lines: [...lines, ...remaining.map(key => `missing: ${key}`), ...unexpected.map(key => `unexpected: ${key}`)], bySite: readsBySite(reads) };
}
/** The first registered test or suite callback body whose site is the given one. */
function registrationBody(file: ts.SourceFile, site: string): ts.Block | undefined {
  const visit = (node: ts.Node): ts.Block | undefined => {
    if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isBlock(node.body) && registrationSite(node) === site) return node.body;
    return ts.forEachChild(node, visit);
  };
  return visit(file);
}
/** A source text of this file with one AST-located edit applied (a page, never run); an edit whose anchor is absent throws. */
function withReadsEdit(source: string, edit: ReadsEdit): string {
  const splice = (at: number, end: number, text: string): string => `${source.slice(0, at)}${text}${source.slice(end)}`;
  if (edit.op === "repoint") {
    const { file, checker } = boundSource(source);
    const read = locateReads(file, checker).find(entry => readKey(entry.site, entry.reader) === edit.read);
    if (read === undefined) throw new Error(`${SELF}: no read of EXPECTATION is keyed ${edit.read}`);
    return splice(read.access.getStart(file), read.access.getEnd(), edit.to);
  }
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (edit.op === "declare") {
    const statement = file.statements.find(entry => ts.isVariableStatement(entry) && entry.declarationList.declarations.some(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === edit.after));
    if (statement === undefined) throw new Error(`${SELF}: no module-scope declaration of ${edit.after}`);
    return splice(statement.getEnd(), statement.getEnd(), `\n${edit.text}`);
  }
  if (edit.op === "parameter") {
    const declared = file.statements.find((entry): entry is ts.FunctionDeclaration => ts.isFunctionDeclaration(entry) && entry.name?.text === edit.fn);
    const last = declared?.parameters.at(-1);
    if (last === undefined) throw new Error(`${SELF}: no function ${edit.fn} with a parameter`);
    return splice(last.getEnd(), last.getEnd(), `, ${edit.text}`);
  }
  const body = registrationBody(file, edit.site);
  if (body === undefined) throw new Error(`${SELF}: no registered callback at ${edit.site}`);
  const open = body.getStart(file) + 1;
  return splice(open, open, `\n    ${edit.text}`);
}

const READ_SITE_FAILURES = "function expectationFailures";
const READ_SITE_LIVE = "it LIVE (R695 (a))";
const READ_SITE_ON_DISK = "it ON-DISK %s";
const READ_SITE_LITERAL = "it LITERAL %s (R696 (1))";
const READ_SITE_RESIDUAL = "it RESIDUAL R-COORDINATED-LITERAL-AND-ANCHOR quiet row (R696 (3), the named residual above the literal pin)";
const READ_DIGEST_CHECK = "expectation.provenance.sha256 !== EXPECTATION.sha256";
const READ_PROVENANCE_EQUAL = "expect(expectation.provenance).toEqual(EXPECTATION)";
const READ_LIVE_PIN = 'expect(EXPECTATION).toEqual({ path: "test/fixtures/docs19-full-section-omxf.json", sha256: createHash("sha256").update(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))).digest("hex") })';
/** The frozen roster: every read of EXPECTATION in this file by site, each by its reader, in source order (anchored out of file). */
const READ_ROSTER: readonly ReadRosterRow[] = [
  [READ_SITE_FAILURES, ["expectation.provenance.path !== EXPECTATION.path", "template EXPECTATION.path", READ_DIGEST_CHECK, "template EXPECTATION.sha256"]],
  [READ_SITE_LIVE, [READ_PROVENANCE_EQUAL, READ_LIVE_PIN]],
  [READ_SITE_ON_DISK, [READ_PROVENANCE_EQUAL]],
  [READ_SITE_LITERAL, ["expect(reading.pin, `...`).toEqual(edit === null ? EXPECTATION : undefined)"]],
  [READ_SITE_RESIDUAL, ['expect(page.expectation.provenance.sha256, "the fixture carries the edit").not.toBe(EXPECTATION.sha256)', 'expect(moved, "the page moves the literal").not.toBe(EXPECTATION.sha256)', "expect(expectationLiteral(page.source)).toEqual({ findings: [], pin: { path: EXPECTATION.path, sha256: moved } })"]],
];
/** The four reads L2G-43 re-points: the expectation-digest check, LIVE's two comparisons and ON-DISK's. */
const L2G43_REPOINTED: readonly string[] = [readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK), readKey(READ_SITE_LIVE, READ_PROVENANCE_EQUAL), readKey(READ_SITE_LIVE, READ_LIVE_PIN), readKey(READ_SITE_ON_DISK, READ_PROVENANCE_EQUAL)];
const repointedTo = (target: string): ReadsEdit[] => L2G43_REPOINTED.map(read => ({ op: "repoint", read, to: read === L2G43_REPOINTED[0] ? `${target}.sha256` : target }));
const L2G43_BINDING = "EXPECTATION_RT: Provenance = { path: EXPECTATION.path, sha256: sha256Hex(readFileSync(join(ROOT, EXPECTATION.path))) }";
const STANDIN_TEXT = "const PINNED_PROVENANCE: Provenance = { path: OMXF_ANCHOR_FILE, sha256: sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))) };";
const SHADOW_INITIALIZER = "{ path: OMXF_ANCHOR_FILE, sha256: sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))) }";
/**
 * wb-lybr: row ROSTER reads the committed source, quiet; each falsifier edits it in memory by AST position and must draw
 * exactly its lines. L2G-43 is the gate's READER-REPOINT (the declared line verbatim); L2G-47 and SHADOW-NESTED are the
 * gate's shadow forms (a computed parameter default, a nested computed declaration in LIVE); the ALIAS rows carry the
 * literal through a const, a destructuring, a spread with a computed sha256 and an arrow function's result; STANDIN is a
 * computed stand-in that never names EXPECTATION (the residual's page); HOLLOW-COMPARATOR keeps the literal read and adds
 * a computed alternative to its comparison.
 */
const LYBR_READS: readonly ReadsRow[] = [
  ["ROSTER", null, []],
  [
    "L2G-43",
    [{ op: "declare", after: "sha256Hex", text: "const EXPECTATION_RT: Provenance = { path: EXPECTATION.path, sha256: sha256Hex(readFileSync(join(ROOT, EXPECTATION.path))) };" }, ...repointedTo("EXPECTATION_RT")],
    [
      `carried: ${readKey("const EXPECTATION_RT", L2G43_BINDING)} -> into the const EXPECTATION_RT`,
      `carried: ${readKey("const EXPECTATION_RT", L2G43_BINDING)} -> into the const EXPECTATION_RT`,
      ...L2G43_REPOINTED.map(read => `missing: ${read}`),
      `unexpected: ${readKey("const EXPECTATION_RT", L2G43_BINDING)}`,
      `unexpected: ${readKey("const EXPECTATION_RT", L2G43_BINDING)}`,
    ],
  ],
  [
    "L2G-47",
    [{ op: "parameter", fn: "expectationFailures", text: `EXPECTATION: Provenance = ${SHADOW_INITIALIZER}` }],
    READ_ROSTER[0][1].map(reader => `shadowed: ${readKey(READ_SITE_FAILURES, reader)} -> resolves to a parameter in ${READ_SITE_FAILURES}`),
  ],
  ["SHADOW-NESTED", [{ op: "prepend", site: READ_SITE_LIVE, text: `const EXPECTATION = ${SHADOW_INITIALIZER};` }], READ_ROSTER[1][1].map(reader => `shadowed: ${readKey(READ_SITE_LIVE, reader)} -> resolves to a const declaration in ${READ_SITE_LIVE}`)],
  [
    "ALIAS-CONST",
    [{ op: "declare", after: "sha256Hex", text: "const PINNED_EXPECTATION: Provenance = EXPECTATION;" }, { op: "repoint", read: readKey(READ_SITE_ON_DISK, READ_PROVENANCE_EQUAL), to: "PINNED_EXPECTATION" }],
    [
      `carried: ${readKey("const PINNED_EXPECTATION", "PINNED_EXPECTATION: Provenance = EXPECTATION")} -> into the const PINNED_EXPECTATION`,
      `missing: ${readKey(READ_SITE_ON_DISK, READ_PROVENANCE_EQUAL)}`,
      `unexpected: ${readKey("const PINNED_EXPECTATION", "PINNED_EXPECTATION: Provenance = EXPECTATION")}`,
    ],
  ],
  [
    "ALIAS-DESTRUCTURE",
    [{ op: "declare", after: "sha256Hex", text: "const { sha256: PINNED_SHA256 } = EXPECTATION;" }, { op: "repoint", read: readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK), to: "PINNED_SHA256" }],
    [
      `carried: ${readKey("const { sha256: PINNED_SHA256 }", "{ sha256: PINNED_SHA256 } = EXPECTATION")} -> into the const { sha256: PINNED_SHA256 }`,
      `missing: ${readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK)}`,
      `unexpected: ${readKey("const { sha256: PINNED_SHA256 }", "{ sha256: PINNED_SHA256 } = EXPECTATION")}`,
    ],
  ],
  [
    "ALIAS-SPREAD",
    [{ op: "declare", after: "sha256Hex", text: "const PINNED_SPREAD: Provenance = { ...EXPECTATION, sha256: sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))) };" }, { op: "repoint", read: readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK), to: "PINNED_SPREAD.sha256" }],
    [
      `carried: ${readKey("const PINNED_SPREAD", "PINNED_SPREAD: Provenance = { ...EXPECTATION, sha256: sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))) }")} -> into the const PINNED_SPREAD`,
      `missing: ${readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK)}`,
      `unexpected: ${readKey("const PINNED_SPREAD", "PINNED_SPREAD: Provenance = { ...EXPECTATION, sha256: sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE))) }")}`,
    ],
  ],
  [
    "ALIAS-ARROW",
    [{ op: "declare", after: "sha256Hex", text: "const pinnedExpectation = (): Provenance => EXPECTATION;" }, { op: "repoint", read: readKey(READ_SITE_LIVE, READ_PROVENANCE_EQUAL), to: "pinnedExpectation()" }],
    [
      `carried: ${readKey("const pinnedExpectation", "(): Provenance => EXPECTATION")} -> into an arrow function's result`,
      `missing: ${readKey(READ_SITE_LIVE, READ_PROVENANCE_EQUAL)}`,
      `unexpected: ${readKey("const pinnedExpectation", "(): Provenance => EXPECTATION")}`,
    ],
  ],
  ["STANDIN", [{ op: "declare", after: "sha256Hex", text: STANDIN_TEXT }, ...repointedTo("PINNED_PROVENANCE")], L2G43_REPOINTED.map(read => `missing: ${read}`)],
  [
    "HOLLOW-COMPARATOR",
    [{ op: "repoint", read: readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK), to: "EXPECTATION.sha256 && expectation.provenance.sha256 !== sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE)))" }],
    [`missing: ${readKey(READ_SITE_FAILURES, READ_DIGEST_CHECK)}`, `unexpected: ${readKey(READ_SITE_FAILURES, `${READ_DIGEST_CHECK} && expectation.provenance.sha256 !== sha256Hex(readFileSync(join(ROOT, OMXF_ANCHOR_FILE)))`)}`],
  ],
];
/** A named residual of the reads pin: its family, the READS row whose edits its page applies, and its quiet and runtime readings. */
interface ReadsResidual {
  readonly id: string;
  readonly family: string;
  readonly form: string;
  readonly reading: string;
  readonly runtime: string;
}
const LYBR_RESIDUALS: readonly ReadsResidual[] = [
  {
    id: "R-COORDINATED-READER-ROSTER",
    family:
      "a coordinated edit of a reader and the reads roster with its anchor: a read of EXPECTATION re-pointed to a stand-in that never names EXPECTATION, the roster, its frozen shape and the fixture's readRoster dropping that read (any READS row keyed on it rewritten alike) and the EXPECTATION sha256 literal moved to the new fixture bytes",
    form: "STANDIN",
    reading: "quiet: the reads pin draws no line over the page's source against the page's roster (every read left resolves to the literal, none is carried, the roster names exactly the reads left), and the literal-shape pin reads the moved literal as it reads the pinned one",
    runtime:
      "quiet: with a reader re-pointed, the roster, its frozen shape and the fixture's readRoster edited alike and the EXPECTATION sha256 literal moved, the whole census reads green (ANCHOR, ROSTER, every READS row, LIVE, every PROVENANCE check and the LITERAL rows); no reading in this file tells a reviewed re-point from a hollowing one, so the edit is the review: its diff drops the read from the fixture's readRoster and moves the literal",
  },
];
interface ReadsAnchor {
  readonly readRoster: readonly ReadRosterRow[];
  readonly readerRows: readonly ReadsRow[];
  readonly readerResiduals: readonly ReadsResidual[];
}
/** The reads tables out of file: the fixture's own, read behind its pinned provenance (expectedTables refuses any other read). */
function readsAnchor(expectation: Sourced): ReadsAnchor {
  const tables: unknown = expectedTables(expectation);
  if (!isRecord(tables) || ![tables.readRoster, tables.readerRows, tables.readerResiduals].every(Array.isArray)) throw new Error(`${OMXF_ANCHOR_FILE}: missing the reads roster, reads row or reads residual anchor`);
  return tables as unknown as ReadsAnchor;
}
const LYBR_JUDGED: string[] = [];

describe("wb-lybr every read of EXPECTATION resolves to the literal identifier (this file's own AST and checker; L2G-43 READER-REPOINT red-first)", () => {
  it("ANCHOR (wb-lybr): the committed source's reads of EXPECTATION, by site, are exactly the roster and its out-of-file anchor (the fixture's readRoster, read behind its pinned provenance), and the reads pin draws no line against that anchor", () => {
    const tables = readsAnchor(readPair(ROOT).expectation);
    const reading = expectationReads(readRepo(SELF), tables.readRoster);
    expect(reading.lines, reading.lines.join(" | ")).toEqual([]);
    expect(reading.bySite).toEqual(tables.readRoster);
    expect(reading.bySite).toEqual(READ_ROSTER);
    LYBR_JUDGED.push("ANCHOR");
  });

  it.each(LYBR_READS)("READS %s (wb-lybr): this file's own AST and checker judge every read of EXPECTATION - ROSTER, the committed source: each resolves to the module-scope literal, none is carried into a binding, and the reads are the roster; a falsifier, its edits applied in memory by AST position (parsed and bound, never run): exactly its lines", (id, edits, lines) => {
    const own = readRepo(SELF);
    const page = edits === null ? own : edits.reduce((source, edit) => withReadsEdit(source, edit), own);
    expect(page === own, `${id}: only ROSTER reads the committed source unedited`).toBe(edits === null);
    const reading = expectationReads(page, READ_ROSTER);
    expect(reading.lines, `${id}: ${reading.lines.join(" | ")}`).toEqual(lines);
    LYBR_JUDGED.push(`READS ${id}`);
  });

  it("RESIDUAL R-COORDINATED-READER-ROSTER quiet row (wb-lybr, the named residual above the reads roster): readers re-pointed to a stand-in, the roster dropping them and the EXPECTATION literal moved read quiet here, and the row reds when its page stops carrying any part of that edit", () => {
    const residual = LYBR_RESIDUALS[0];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-COORDINATED-READER-ROSTER");
    const standIn = LYBR_READS.find(([id]) => id === residual.form)?.[1];
    if (standIn === undefined || standIn === null) throw new Error(`${residual.id}: ${residual.form} is not a READS falsifier`);
    const own = readRepo(SELF);
    const repointed = standIn.flatMap(edit => (edit.op === "repoint" ? [edit.read] : []));
    const roster = READ_ROSTER.map(([site, readers]): ReadRosterRow => [site, readers.filter(reader => !repointed.includes(readKey(site, reader)))]).filter(([, readers]) => readers.length > 0);
    const pinned = expectationLiteral(own).pin;
    const literal = "f".repeat(64);
    const source = withExpectationProperty(
      standIn.reduce((page, edit) => withReadsEdit(page, edit), own),
      "sha256",
      JSON.stringify(literal),
    );
    // Liveness: the page carries the family's whole edit - the readers re-pointed, the roster dropping them, the literal moved.
    expect(repointed.length, "the page re-points readers").toBeGreaterThan(0);
    expect(
      expectationReads(source, READ_ROSTER).lines,
      "the page's source no longer holds the re-pointed reads",
    ).toEqual(repointed.map(read => `missing: ${read}`));
    expect(roster.flatMap(([, readers]) => readers), "the page's roster drops exactly those reads").toHaveLength(READ_ROSTER.flatMap(([, readers]) => readers).length - repointed.length);
    expect(literal, "the page moves the literal").not.toBe(pinned?.sha256);
    // The quiet reading: no line against the page's roster, and the moved literal read as the pinned one is.
    expect(expectationReads(source, roster).lines).toEqual([]);
    expect(expectationLiteral(source)).toEqual({ findings: [], pin: { path: pinned?.path, sha256: literal } });
    LYBR_JUDGED.push(`RESIDUAL ${residual.id}`);
  });

  it("READS FROZEN SHAPE (wb-lybr): every judged member reaches its last assertion; the roster, the READS table and the residual roster are frozen here and equal to their out-of-file anchors", () => {
    expect(READ_ROSTER.map(([site, readers]) => `${site}:${readers.length}`)).toEqual([
      "function expectationFailures:4", "it LIVE (R695 (a)):2", "it ON-DISK %s:1", "it LITERAL %s (R696 (1)):1", "it RESIDUAL R-COORDINATED-LITERAL-AND-ANCHOR quiet row (R696 (3), the named residual above the literal pin):3",
    ]);
    expect(LYBR_READS.map(([id, edits, lines]) => `${id}:${edits?.length ?? "-"}:${lines.length}`)).toEqual([
      "ROSTER:-:0", "L2G-43:5:8", "L2G-47:1:4", "SHADOW-NESTED:1:2", "ALIAS-CONST:2:3", "ALIAS-DESTRUCTURE:2:3", "ALIAS-SPREAD:2:3", "ALIAS-ARROW:2:3", "STANDIN:5:4", "HOLLOW-COMPARATOR:1:2",
    ]);
    expect(LYBR_RESIDUALS.map(residual => `${residual.id}:${residual.form}`)).toEqual(["R-COORDINATED-READER-ROSTER:STANDIN"]);
    expect(LYBR_JUDGED).toEqual(["ANCHOR", ...LYBR_READS.map(([id]) => `READS ${id}`), ...LYBR_RESIDUALS.map(({ id }) => `RESIDUAL ${id}`)]);
    const tables = readsAnchor(readPair(ROOT).expectation);
    expect(READ_ROSTER).toEqual(tables.readRoster);
    expect(LYBR_READS).toEqual(tables.readerRows);
    expect(LYBR_RESIDUALS).toEqual(tables.readerResiduals);
  });
});
