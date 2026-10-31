/**
 * wb-pfxo.3 (RF-COMPOSITIONAL-ASSEMBLY-R4, program-triage-2026-10-22), the absent-today leg. Statement (bead notes, full form):
 * "If Pi ever hands an rf assembly across processes or agents (gated the 'assembly handoff' semantic contract: a proposed
 * transaction with no shipped rf verb, cli/registry.py has no handoff leaf at the pin and README:2 marks unimplemented features
 * 'explicitly proposed, not shipped'), the handoff artifact shall be the receipt (render ID, graph revision, source basis,
 * environment/worker versions, workspace locator/capabilities and integrity digest) and never the copied prompt text"
 * (docs/programs/compositional-assembly-2026-10-18/README.md:33@6a251bf73af5). The acceptance is the owner filing's, verbatim: the
 * labels of rows A-D below.
 *
 * FOLLOW-UP wb-dm26 (R694, F1 of the landing-277 gate, cmd_8bf70fa257bc composing cmd_edce85938e24): the zero-bytes rows A1-A3 and
 * B4 also measure TEXT DEPENDENCE, so a partial or re-joined copy of the document is no longer green (the gate's S7/S7b); the src
 * and docs walks hold every path git would commit below them, so a walk narrowed above its floor reds (S15/S16); D4 also reads the
 * PAGE_ROOTS markdown pages, the root README.md included (S11), and residual R10 names the markdown it leaves unwalked.
 *
 * FOLLOW-UP wb-ilmy (R694, F1-F3 of the landing-369 gate, cmd_6c65c1a1c373): TEXT DEPENDENCE also pins the value form of the one leaf
 * it lets follow the text (PAYLOAD_REF_FORM, on both seams), A5 measures it over every preview shape the census builds
 * (PREVIEW_SHAPES) and B4 over every committed variant, so a text prefix smuggled into the allowed leaf or a shape-keyed note reds
 * (the gate's G3-G6); D4 and R10 read pages by PAGE_EXTENSIONS in any case (G10, G11, G11b) and R12 names the pages outside them;
 * the src walk gains a second anchor outside its own listing (git's SOURCE_EXTENSIONS files, whose unwalked roots must be exactly
 * UNWALKED_SOURCE_ROOTS), so a src walk narrowed together with its listing reds (G14, G21), and R11 names that unwalked source.
 *
 * SOURCE (ReactiveFiberCLI at 6a251bf73af5, read with git show; the filing quotes it): "5. 'assembly handoff': receipt containing
 * render ID, graph revision, source basis, environment/worker versions, workspace locator/capabilities and integrity digest; NOT the
 * copied prompt." (README.md:33); "These are semantic contracts, not commitments to six new top-level verbs." (:35); "All
 * unimplemented features are explicitly proposed, not shipped." (:2); milestone M4 names a "cross-process handoff" (:91).
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only git show and grep on the local ReactiveFiberCLI checkout; `rf --json
 * --version` on the installed rf): src/reactive_fiber_cli/cli/registry.py spells handoff on 0 lines at the pin; the context.render
 * schema (schemas/cli/baseline/context.render.json) types result.render_id "null exactly when `ephemeral` is true (--no-commit
 * persisted no render, so there is no id to hand back)" and places graph_revision_id at :622, cli_version :638, sdk_versions :646
 * and bundle_revision_id :1296, as the filing cites; no baseline schema defines a `document` key (the rendered document is
 * result.output.text, its blocks result.blocks[], a block's text context.show's `content`); domain/canonical.py:874 makes
 * result.output.digest (RenderRecord.final_document_digest) "never a hash of the assembled text". The installed rf (0.1.832 by
 * result.version) serves 79 leaves, none on a handoff or assembly path.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). It spawns only `rf ... context
 * render ... --no-commit` and admits only the ephemeral preview (render_id null, no transaction), so no Pi surface ever holds a
 * render ID, the receipt's first field, and Pi hands no rf assembly across processes or agents: the statement's trigger has not
 * fired. The census pins that absence and every surface the obligation already reaches:
 *  T, the trigger, absent today. T1 a TypeScript AST scan of every src module: no identifier, string or template literal spells a
 *    handoff (HANDOFF_WORD: hand, an optional run of white space, "_" or "-", then off, in any case), with a floor, git's listing of
 *    src as the walk's outside anchor, git's whole SOURCE_EXTENSIONS listing as its second (R11's extent) and the controls of rows
 *    MT; T2 the receipt-field reader set: per field of the filing's
 *    Authority list, the src modules whose code spells it (an
 *    identifier or property name equal to it, or a string literal holding it as a word) are exactly READER_SET, so a module that
 *    starts reading render_id or graph_revision_id - as any handoff carrying them must - reds until its cut re-pins the set (controls
 *    MF); T3 Pi's rf roster stays reactivefiber.render.preview (RECONCILE_EVIDENCE_READS.reactivefiber at
 *    src/workflow/reconcile.ts:67 and both registrations, read-class) and no native descriptor spells a handoff; T4 both input arms
 *    spawn one rf whose argv is a context render ending --no-commit --no-input --json (stand-in rf on PATH).
 *  A, acceptance (a). No handoff exists, so the clause reaches the two Pi surfaces that carry an rf render's identity onward: the
 *    reader adapter's projection (reactivefiber-observer.ts, read by the observation store and its UI) and native evidence
 *    (native-evidence.ts, the run's node evidence). A1 the projection of a full-shape preview carrying a document and a block names
 *    graph_revision_id (the rf-graph reference and sourceRevision) and bundle_revision_id (the rf-bundle reference and
 *    sourceVersion) verbatim and zero bytes of the document or the block; A2 without bundle_revision_id it names no bundle at all; A3
 *    native evidence carries the operation id and the bundle (else the graph) basis and no document or block byte; A4 the native
 *    reading of that preview states render_id null, ephemeral true and no transaction: there is no render ID for a Pi surface to
 *    carry; A5 TEXT DEPENDENCE holds on every preview shape the census builds (PREVIEW_SHAPES: FULL, NO_BUNDLE, BARE and STATED, the
 *    four D3 projects), on both seams' projections and on native evidence, and the same sweep names each planted smuggle (SMUGGLES:
 *    the gate's G3-G6 shapes and a native-evidence one) at exactly its own shapes and leaves, the sweep's positive control. ZERO
 *    BYTES is read two ways: no surfaced string holds the whole document or block, and TEXT DEPENDENCE - each surface is built once
 *    from the preview and once from its twin (every ASCII letter of the document and of the block rotated thirteen places, so each
 *    twin keeps its text's length and layout and holds no letter of it at any position); the input must differ exactly at the two
 *    texts' own leaves (TEXT_LEAVES: the twins reached it), the only surfaced leaf allowed to differ is Pi's digest reference to the
 *    withheld text on each seam's projection (PAYLOAD_REF_LEAVES, R4), none on native evidence, and that leaf must hold exactly its
 *    value form in both builds (PAYLOAD_REF_FORM: rf-output:sha256: and the sha256 of the document, or of the twin document; a
 *    differing leaf's two values are read with the texts and their digests named by placeholder). A prefix, a re-joined copy or an
 *    encoding of either text therefore differs between the two builds and reds, in the allowed leaf too, on every shape A1-A5 build.
 *  B, acceptance (b). Pi has no handoff builder; every Pi surface given a committed render envelope (ephemeral false, an rfr_
 *    render_id, commit_seq 1, an rft_ transaction: the schema's committed branch) emits nothing of it: B1 the native reader refuses it
 *    in one spawn and returns no reading; B2 the adapter refuses a reading carrying it before projecting anything; B3 three partial
 *    committed shapes (no transaction; a render_id beside ephemeral true; a commit_seq beside a null render_id) are refused by both;
 *    B4 native evidence of it names identifiers only: no render id, no document byte and no block byte (no text-dependent leaf, on it
 *    and on each of the three partial committed shapes).
 *  C, acceptance (c). C1 an envelope whose provenance states no cli_version and no sdk_versions projects no rf-cli reference, no
 *    release note, no rf-engine reference and no digest beyond the envelope's own two and the adapter's payload reference (R4); C2
 *    the control: stated, both are carried (the rf-cli reference, the release note, the engine references), so C1's absence is the
 *    fields' own; C3 native evidence states producerRelease only when cli_version is stated; C4 the native and the injected readings
 *    keep such provenance byte for byte, the two keys still absent.
 *  D, acceptance (d). D1 no src string or template literal spells a FAMILIES form (H, a handoff form; L, an rf receipt label; any
 *    case); D2 no native or injected descriptor's JSON spells one and both rf registrations carry REACTIVE_FIBER_CONTRACT_SOURCE; D3 no
 *    surfaced string of any projection this census builds (the four preview shapes and a refusal, on either seam) names a receipt:
 *    the adapter labels its own snapshot reactivefiber.render.preview.snapshot behind its seam label; D4 a mention of a FAMILIES
 *    form in docs/ or in a PAGE_ROOTS page (the pages directly in the repository root, README.md among them, in examples/ and in
 *    vendor/: every regular file whose extension, in any case, is one of PAGE_EXTENSIONS) is admitted only when a line it
 *    spans carries a NOT-SHIPPED marker or the Pi-assembled label (MARKERS: closed, whole words, any case), else it is
 *    named-as-shipped (matcher rows MD).
 * The committed envelope, the document and the block are CONSTRUCTED from the full-shape fixture (test/helpers/rf-render-fixture.ts);
 * no rf build produced them. Witnesses name the fixture's identities by placeholder (<graph>, <bundle>, <operation>, <workspace>,
 * <release>, <root>), so a fixture re-pin re-reads them, never re-spells them.
 * OUTSIDE ANCHORS. F1: the owner filing row of wb-pfxo.3 in the tracked bead export carries every FILING_CONSTANTS entry, its
 * acceptance sentence names exactly the clauses rows A-D cover, and each of rows A-D's labels equals its clause there, so a relabelled
 * or shortened label reds against the owner's own text. The out-of-file roster test/fixtures/rf-assembly-handoff-roster.json holds
 * every row's id, label and pins, every pin's witness and the pinned constants, so a pin deleted, relabelled, swapped or removed from
 * every literal of this file at once still reds against it. GIT'S LISTING (what git would commit: tracked or untracked, never
 * ignored, present on disk) anchors the src walk of T1, T2 and D1 and the docs and pages walk of D4: each walk must hold every path
 * git lists, so a walk narrowed above its floor reds while an additive file does not; the page anchor README.md must name the
 * package.json name, so the pages are read, not only listed. A SECOND LISTING anchors each walk outside its own pathspecs: git's
 * whole listing, by extension in any case. The SOURCE_EXTENSIONS files T1, T2 and D1 do not walk must sit exactly under
 * UNWALKED_SOURCE_ROOTS (in their walk and in R11), and the PAGE_EXTENSIONS pages D4 does not read exactly under
 * UNWALKED_PAGE_ROOTS (in its walk and in R10), so a walk narrowed together with its own listing still reds, and so does a src
 * module in another source extension. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 R-JOURNAL a read node's journal row keeps the whole reading, the
 * document and its blocks included, for the same run's resume (src/workflow/runtime.ts journals a read's payload); this census reads
 * that as the run's own durability record, not an assembly handoff. R2 R-SCRIPT-PROMPT a workflow script may copy a reading's
 * document into an agent() prompt, and the Claude host forwards the script's prompt verbatim: Pi labels nothing an rf receipt there,
 * but the copied text is exactly what the statement forbids a Pi handoff artifact to be (the detached host likewise serves a
 * script's own return value to its clients). R3 R-INJECTED the injected registration, the fixture seam, returns whatever envelope its
 * reader answers, a committed one included, verbatim (the adapter refuses that reading: B2). R4 R-PAYLOAD-DIGEST the adapter's
 * nativePayloadRef is Pi's own sha256 over result.output.text, stated whether or not rf states result.output.digest, which rf never
 * computes over the text (canonical.py:874): it is Pi's reference to withheld text, never rf's integrity digest, and a handoff that
 * carried it as one would synthesize a digest. R5 R-COMMENT a src comment, or a name or key composed at runtime from parts, is
 * invisible to T1 and T2. R6 R-INDIRECT a builder composing from projected fields (NativeSnapshot.sourceRevision, NativeEvidence.sourceBasis) instead of
 * envelope keys evades T2. R7 R-MARKER-ANYWHERE a marker anywhere on a mention's lines admits it, whatever the marker qualifies. R8
 * R-PARAPHRASE a handoff or receipt paraphrase outside FAMILIES ("passes the assembly to the next agent", "the receipt rf printed")
 * is not caught. R9 R-TOOL-READ a Claude role the host exposes the preview capability to reads the whole reading, the document
 * included, as its capability_invoke reply (claude-capability-tools.ts, sanitized and bounded): this census reads that as the
 * agent's own read of rf context through Pi's tool surface, not an assembly handed from one process or agent to another. R10
 * R-UNWALKED-PAGES (R-UNWALKED-MARKDOWN until wb-ilmy) the pages (PAGE_EXTENSIONS, any case) below .agents/, .beads/, .pi/,
 * new-feedback/ and test/ (tool instructions, agent feedback and test fixtures, not Pi's product pages) are not walked by D4, so a
 * FAMILIES mention there is never judged; its quiet row pins exactly those roots as the unwalked extent, so a page under any other
 * root reds until a cut walks it or names it. R11 R-UNWALKED-SOURCE the JavaScript and TypeScript git lists outside src/
 * (SOURCE_EXTENSIONS, any case: the repository root's own vitest configs, examples/' workflow scripts, qa/'s scripts and test/;
 * tooling, examples and tests, not Pi's product modules) is not walked by T1, T2 and D1, so a handoff spelled there is never judged;
 * its quiet row pins exactly those roots as the unwalked extent (UNWALKED_SOURCE_ROOTS, "" naming the root's own files), so source
 * under any other root reds until a cut walks it or names it - src/ included, when its walk narrows or one of its modules takes
 * another source extension - and reads a planted git tree (SOURCE_PLANTS) through the same walk and extent. R12 R-PAGE-EXTENSION a
 * page whose name carries none of PAGE_EXTENSIONS in any case (an extensionless NOTES, an .html page) is neither read by D4 nor in
 * R10's extent, outside docs/ (which D4 reads whole), so a FAMILIES mention in it is never judged; its quiet row reads a planted git
 * tree (PAGE_PLANTS) through D4's page reading and R10's extent: the root's NOTES-zz.txt, ZZ.MD and README.md and docs/'s
 * zz-notes.html are read, examples/nested/zz.md and qa/'s zz-notes.markdown, zz-notes.MD and zz-notes.md are the extent's
 * examples and qa roots, the root's NOTES and zz.html are neither, and the line planted in each is a real unmarked mention.
 * SCOPE: the families, the markers and the reading of "prompt text" as the rendered document (README:33's "copied prompt") are this
 * cut's reading of the filing; the producer facts above are measured at the shas named and are not re-read here (the census is
 * hermetic). The positive half of (d) - a Pi-assembled label on a handoff artifact - and the armed half of (a)-(c) wait for a Pi
 * handoff: no builder is added or faked here. A later cut that adds one re-pins READER_SET and brings its artifact under rows A-D.
 *
 * Display paths added: none. Test-only: the stand-in rf and the planted git trees live in makeScratch scratch; src, docs and the
 * bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  nativeReactiveFiberRender,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  type ReactiveFiberRenderSelector,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import {
  fullShapeRf,
  RF_FIXTURE_GRAPH_REVISION,
  RF_FIXTURE_OPERATION_ID,
  RF_FIXTURE_RELEASE,
  RF_FIXTURE_WORKSPACE_ID,
} from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-assembly-handoff-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-pfxo.3";

const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";
const GRANTS: readonly string[] = ["reactivefiber:render"];
/** Pi's rf capability roster at this cut: the reconcile evidence read (reconcile.ts:67) and both registrations. */
const PINNED_ROSTER: readonly string[] = [PREVIEW_ID];
const ROSTER_SITE = "src/workflow/reconcile.ts:67";
/** The owner triage's read sha of the compositional-assembly program. */
const PROGRAM_PIN = "6a251bf73af5";
/** The receipt fields of the filing's Authority list, in its order (context.render.json render_id, :622, :638, :646, :1296). */
const RECEIPT_FIELDS: readonly string[] = ["render_id", "graph_revision_id", "cli_version", "sdk_versions", "bundle_revision_id"];
/** Measured at base 051d37e: per receipt field, the src modules whose code spells it (T2). */
const READER_SET: Readonly<Record<string, readonly string[]>> = {
  render_id: ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"],
  graph_revision_id: ["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"],
  cli_version: ["src/workbench/native-evidence.ts", "src/workbench/reactivefiber-observer.ts"],
  sdk_versions: ["src/workbench/reactivefiber-observer.ts"],
  bundle_revision_id: ["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"],
};
/** The filing text F1 holds this census to: the statement's locator, the rf leaf file, the five fields, the document key, the
 * transaction's name and the authority bead. */
const FILING_CONSTANTS: readonly string[] = [
  `README.md:33@${PROGRAM_PIN}`, "cli/registry.py", ...RECEIPT_FIELDS, "result.document", "assembly handoff", "wb-2j3.2",
];

/** T1's word: hand, an optional run of white space, "_" or "-", then off, in any case (handOffset included: a false alarm costs a
 * re-read, never a miss). */
const HANDOFF_WORD = /hand[\s_-]*off/i;
interface Family {
  readonly id: string;
  readonly source: string;
}
const HAND_OFF = "hand[\\s_-]*offs?";
/** H, a handoff form (rf's transaction, a handoff receipt, rf's handoff, a cross-process or cross-agent handoff); L, an rf receipt
 * label. Each source is compiled case-insensitive. */
const FAMILIES: readonly Family[] = [
  {
    id: "H",
    source: `\\bassembly[\\s_.-]*${HAND_OFF}\\b|\\b${HAND_OFF}[\\s_-]+receipts?\\b|\\brf(?:'s)?[\\s_-]+${HAND_OFF}\\b|\\bcross[\\s_-]*(?:process|agent)[\\s_-]+${HAND_OFF}\\b`,
  },
  { id: "L", source: "\\b(?:rf|reactive[\\s_-]*fiber|assembly|render|context)[\\s_-]+receipts?\\b" },
];
const familyHits = (text: string): string[] => FAMILIES.filter(family => new RegExp(family.source, "i").test(text)).map(family => family.id);

/** The words that admit a docs mention: a not-shipped marker, or the Pi-assembled label (d) asks for. */
const MARKERS: readonly string[] = [
  "proposed", "illustrative", "unshipped", "not shipped", "not installed", "uninstalled", "unavailable", "not available",
  "not served", "gated", "pi-assembled",
];
const MARKER = new RegExp(`\\b(?:${MARKERS.map(marker => marker.split(" ").join("\\s+")).join("|")})\\b`, "i");

/** The constructed committed render's identities, in the schema's rfr_/rft_/rfs_ grammars. */
const RENDER_ID = `rfr_${"d".repeat(22)}`;
const TRANSACTION_ID = `rft_${"e".repeat(22)}`;
const SESSION_ID = `rfs_${"f".repeat(22)}`;
/** The rendered document (result.output.text) and one block's content (context.show's `content` spelling), CONSTRUCTED. */
const DOCUMENT = "Assembled census context: alpha bravo charlie delta.";
const BLOCK_CONTENT = "Census block content: echo foxtrot golf hotel.";
interface Texts {
  readonly document: string;
  readonly block: string;
}
const TEXTS: Texts = { document: DOCUMENT, block: BLOCK_CONTENT };
/** A text's twin: every ASCII letter rotated thirteen places, so it keeps the text's length and layout and holds no letter of the
 * text at any position (no word, prefix or re-joined copy of the text survives in it). */
const twinOf = (text: string): string => text.replace(/[A-Za-z]/g, letter => {
  const base = letter <= "Z" ? 65 : 97;
  return String.fromCharCode(((letter.charCodeAt(0) - base + 13) % 26) + base);
});
const TWINS: Texts = { document: twinOf(DOCUMENT), block: twinOf(BLOCK_CONTENT) };
/** The reading's own text leaves: where a preview and its twin must differ, and nowhere else. */
const TEXT_LEAVES: readonly string[] = ["$.source.result.blocks.0.content", "$.source.result.output.text"];
/** Pi's digest reference to the withheld text on each seam's projection (R4): the one surfaced leaf allowed to follow the text. */
const PAYLOAD_REF_LEAVES: readonly string[] = ["$.0.snapshots.0.nativePayloadRef", "$.1.snapshots.0.nativePayloadRef"];
const sha256Of = (text: string): string => createHash("sha256").update(text).digest("hex");
/** A leaf that follows the texts, read in each build: its value with the texts and their digests named by placeholder. A type, not
 * an interface, so a reading holding forms stays a JsonValue. */
type Form = { readonly own: JsonValue; readonly twin: JsonValue };
/** The allowed leaf's value form (R4): Pi's own sha256 of the withheld document in each build, never a prefix, a copy or an encoding
 * of the text beside it or in its place. */
const PAYLOAD_REF_FORM: Form = { own: "rf-output:sha256:<document sha256>", twin: "rf-output:sha256:<twin document sha256>" };
/** The texts and their digests, by the placeholder a form names them with (the 64-hex digests before the texts they hash). */
const TEXT_NAMES: readonly (readonly [string, string])[] = [
  [sha256Of(TEXTS.document), "<document sha256>"], [sha256Of(TWINS.document), "<twin document sha256>"],
  [sha256Of(TEXTS.block), "<block sha256>"], [sha256Of(TWINS.block), "<twin block sha256>"],
  [TEXTS.document, "<document>"], [TWINS.document, "<twin document>"], [TEXTS.block, "<block>"], [TWINS.block, "<twin block>"],
];
const namedText = (value: JsonValue): JsonValue =>
  typeof value === "string" ? TEXT_NAMES.reduce((text, [raw, name]) => text.split(raw).join(name), value) : value;
const ENGINE_VERSIONS: JsonObject = {
  tsx_runtime: { distribution_version: "2.4.1", contract_fingerprint: "unknown" },
  tsx_sdk: { distribution_version: "0.3.2", contract_fingerprint: "unknown" },
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: "(trigger, absent today) Pi hands no rf assembly across processes or agents: no src identifier or literal spells a handoff, only the pinned reader modules spell an rf receipt field, the rf roster stays reactivefiber.render.preview only and every rf spawn is a --no-commit render",
    pins: ["T1", "T2", "T3", "T4"],
  },
  {
    id: "A",
    label: "(a) any Pi cross-agent handoff of rf context carries render_id and graph_revision_id (plus bundle_revision_id when present) and zero bytes of rendered document or block content",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) fixture: the handoff builder given a committed render envelope emits no result.document / block content and no prompt text",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) absent provenance fields (cli_version, sdk_versions) stay absent, no synthesized version or digest",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(d) until a shipped rf handoff receipt exists Pi labels any such artifact as Pi-assembled from envelope identifiers, never as an rf receipt",
    pins: ["D1", "D2", "D3", "D4"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-pfxo.3 in the tracked bead export carries every pinned constant, names exactly the clauses rows A-D cover and states each of their labels as its clause",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the matchers rows T1, T2, D1 and D4 read judge their pinned inputs in order",
    pins: ["MT1", "MT2", "MT3", "MT4", "MT5", "MF1", "MF2", "MF3", "MF4", "MD1", "MD2", "MD3", "MD4", "MD5", "MD6"],
  },
  {
    id: "R",
    label: "the named residuals R1-R12 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly constants: JsonValue;
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function clone(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Object.hasOwn(raw, "constants")) {
    throw new Error("roster must be an object with constants and a rows list");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: clone(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: clone(raw.constants), rows };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The constants the roster pins beside the rows. */
function constants(): JsonValue {
  return clone({
    pinnedRoster: PINNED_ROSTER,
    rosterSite: ROSTER_SITE,
    programPin: PROGRAM_PIN,
    receiptFields: RECEIPT_FIELDS,
    readerSet: READER_SET,
    filingConstants: FILING_CONSTANTS,
    handoffWord: HANDOFF_WORD.source,
    families: FAMILIES,
    markers: MARKERS,
    srcFloor: SRC_FLOOR,
    docsFloor: DOCS_FLOOR,
    pageRoots: PAGE_ROOTS,
    unwalkedPageRoots: UNWALKED_PAGE_ROOTS,
    previewShapes: PREVIEW_SHAPES,
    payloadRefForm: PAYLOAD_REF_FORM,
    smuggles: SMUGGLES.map(({ id, label }) => ({ id, label })),
    pageExtensions: PAGE_EXTENSIONS,
    sourceExtensions: SOURCE_EXTENSIONS,
    unwalkedSourceRoots: UNWALKED_SOURCE_ROOTS,
    pagePlants: PAGE_PLANTS.map(plant => plant.path),
    sourcePlants: SOURCE_PLANTS.map(plant => plant.path),
  });
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** What git would commit in `base` for the pathspecs: tracked or untracked, never ignored, and present on disk, sorted. The walks'
 * outside anchor: a walk must hold every path listed here, so a narrowed walk reds while an additive file does not. */
function gitListedIn(base: string, ...pathspecs: string[]): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...pathspecs], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path))))].sort();
}
const gitListed = (...pathspecs: string[]): string[] => gitListedIn(REPO, ...pathspecs);
let listingCache: string[] | undefined;
/** Git's whole listing of the repository, read once: the source of each walk's second anchor. */
const repoListed = (): string[] => (listingCache ??= gitListed());
/** The page extensions D4 reads and R10's extent lists, compared in lower case: the program's doc set (the DOC_EXTENSIONS of
 * test/workbench-tsx-h2-proposed-api-census.test.ts). */
const PAGE_EXTENSIONS: readonly string[] = [".md", ".mdx", ".markdown", ".rst", ".txt", ".adoc"];
/** The source extensions of the src walk's second listing, compared in lower case: the program's module set (the MODULE_EXTENSIONS
 * of the same census). */
const SOURCE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** A path's extension in lower case: "" when its name holds no dot after its first character (NOTES, .gitignore). */
function extensionOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot <= 0 ? "" : name.slice(dot).toLowerCase();
}
const isPage = (path: string): boolean => PAGE_EXTENSIONS.includes(extensionOf(path));
const isSource = (path: string): boolean => SOURCE_EXTENSIONS.includes(extensionOf(path));
/** A path's root: its first segment, or "" for a file directly in the repository root. */
const rootOf = (path: string): string => (path.includes("/") ? path.slice(0, path.indexOf("/")) : "");
/** A walk's unwalked extent: the roots of every listed path the walk does not hold, sorted. */
const rootsUnwalked = (listed: readonly string[], walked: ReadonlySet<string>): string[] =>
  [...new Set(listed.filter(path => !walked.has(path)).map(rootOf))].sort();
interface Plant {
  readonly path: string;
  readonly text: string;
}
/** `read` over a fresh scratch git repository holding `plants` untracked, as a file stands before its first commit. */
function withPlantedTree<T>(plants: readonly Plant[], read: (base: string) => T): T {
  const base = makeScratch("rf-assembly-handoff-tree-");
  try {
    execFileSync("git", ["init", "-q"], { cwd: base, stdio: "pipe" });
    for (const plant of plants) {
      mkdirSync(dirname(join(base, plant.path)), { recursive: true });
      writeFileSync(join(base, plant.path), plant.text);
    }
    return read(base);
  } finally {
    removeScratch(base);
  }
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
const digestOf = (texts: readonly string[]): string => createHash("sha256").update(JSON.stringify(texts)).digest("hex").slice(0, 16);
/** How many of `strings` hold `needle`. */
const carrying = (strings: readonly string[], needle: string): number => strings.filter(text => text.includes(needle)).length;

const BUNDLE = String(objectOf(clone(fullShapeRf(ROOT).result), "fixture result").bundle_revision_id);
/** The fixture identities a witness names by placeholder, longest first so no identity is cut through. */
const PLACEHOLDERS: readonly (readonly [string, string])[] = [
  [ROOT, "<root>"], [RF_FIXTURE_GRAPH_REVISION, "<graph>"], [BUNDLE, "<bundle>"], [RF_FIXTURE_OPERATION_ID, "<operation>"],
  [RF_FIXTURE_WORKSPACE_ID, "<workspace>"], [RF_FIXTURE_RELEASE, "<release>"],
];
function placeheld(value: JsonValue): JsonValue {
  if (typeof value === "string") return PLACEHOLDERS.reduce((text, [identity, name]) => text.split(identity).join(name), value);
  if (Array.isArray(value)) return value.map(placeheld);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, placeheld(child)]));
  return value;
}

interface PreviewShape {
  readonly bundle: boolean;
  readonly release: boolean;
  readonly versions: "sdk" | "engine" | "absent";
}
const FULL: PreviewShape = { bundle: true, release: true, versions: "sdk" };
const NO_BUNDLE: PreviewShape = { bundle: false, release: true, versions: "sdk" };
const BARE: PreviewShape = { bundle: true, release: false, versions: "absent" };
const STATED: PreviewShape = { bundle: true, release: true, versions: "engine" };
/** Every preview shape the census builds, by name: D3 projects each, A5 measures TEXT DEPENDENCE over each. */
const PREVIEW_SHAPES: Readonly<Record<string, PreviewShape>> = { FULL, NO_BUNDLE, BARE, STATED };

/** A full-shape noncommitted preview carrying the document and one block of the block content (DOCUMENT and BLOCK_CONTENT, or the
 * twins of A's text dependence), with the shape's optional fields. */
function previewEnvelope(shape: PreviewShape, texts: Texts = TEXTS): JsonObject {
  const envelope = objectOf(clone(fullShapeRf(ROOT)), "fixture");
  const result = objectOf(envelope.result, "result");
  const output = objectOf(result.output, "result.output");
  output.text = texts.document;
  output.size_bytes = Buffer.byteLength(texts.document);
  result.blocks = [{
    final_index: 0, candidate_key: "census.block::body", component_id: "census.block", token_cost: { kind: "measured", tokens: 9 },
    token_cost_kind: "measured", content: texts.block,
  }];
  if (!shape.bundle) delete result.bundle_revision_id;
  const provenance = objectOf(result.provenance, "result.provenance");
  if (!shape.release) delete provenance.cli_version;
  if (shape.versions === "absent") delete provenance.sdk_versions;
  if (shape.versions === "engine") Object.assign(objectOf(provenance.sdk_versions, "sdk_versions"), clone(ENGINE_VERSIONS));
  return envelope;
}

/** A render refusal in the strict failure shape (ok false, null workspace and result, one primary RF_ error), CONSTRUCTED. */
const REFUSAL: JsonObject = {
  schema: "reactive-fiber.cli/v1", ok: false, command: "context.render", operation_id: RF_FIXTURE_OPERATION_ID, workspace: null,
  transaction_id: null, result: null,
  diagnostics: [{ code: "RF_CENSUS_REFUSED", severity: "error", message: "constructed refusal", hint: null, source: null, metadata: {} }],
};

type CommittedVariant = "committed" | "untransacted" | "id-beside-ephemeral" | "seq-beside-null-id";
const PARTIAL_VARIANTS: readonly CommittedVariant[] = ["untransacted", "id-beside-ephemeral", "seq-beside-null-id"];
/** Every committed shape the census builds: B4 measures TEXT DEPENDENCE of native evidence over each. */
const COMMITTED_VARIANTS: readonly CommittedVariant[] = ["committed", ...PARTIAL_VARIANTS];
/** The schema's committed branch (ephemeral false, an rfr_ render_id, an integer commit_seq, an rft_ transaction, one store write) or
 * one of three partial committed shapes. */
function committedEnvelope(variant: CommittedVariant, texts: Texts = TEXTS): JsonObject {
  const envelope = previewEnvelope(FULL, texts);
  const result = objectOf(envelope.result, "result");
  if (variant === "committed" || variant === "untransacted") {
    result.ephemeral = false;
    result.render_id = RENDER_ID;
    result.commit_seq = 1;
    result.session_id = SESSION_ID;
    objectOf(result.work, "result.work").storage_write_count = 1;
    if (variant === "committed") envelope.transaction_id = TRANSACTION_ID;
  } else if (variant === "id-beside-ephemeral") {
    result.render_id = RENDER_ID;
  } else {
    result.commit_seq = 1;
  }
  return envelope;
}

function readingOf(envelope: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope };
}
type Seam = ReactiveFiberTopologyContext["seam"];
function contextOf(seam: Seam): ReactiveFiberTopologyContext {
  return {
    scope: { workspace: ROOT, principal: "local-operator:census" }, seam,
    capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
  };
}
interface Projected {
  readonly snapshot: JsonObject;
  readonly strings: string[];
}
/** The adapter's projection of one reading: its one snapshot and every string the topology holds. */
function projectionOf(envelope: JsonValue, seam: Seam = "rf-cli"): Projected {
  const topology = objectOf(clone(reactivefiberTopology(readingOf(envelope), contextOf(seam))), "topology");
  const snapshots = Array.isArray(topology.snapshots) ? topology.snapshots : [];
  return { snapshot: objectOf(snapshots[0], "snapshot"), strings: stringLeaves(topology) };
}
const refsOf = (snapshot: JsonObject): string[] => stringLeaves(snapshot.evidenceRefs);
const notesOf = (projected: Projected): string[] => projected.strings.filter(text => text.includes("producer release") || text.includes("TSX engine"));
const DIGEST = /sha256:[0-9a-f]{64}/g;
const digestsIn = (strings: readonly string[]): string[] => [...new Set(strings.flatMap(text => text.match(DIGEST) ?? []))].sort();
/** Both seams' topologies of one reading: the live rf-cli seam and the injected fixture seam. */
const topologiesOf = (reading: JsonValue): JsonValue => (["rf-cli", "injected-fixture"] as const).map(seam => clone(reactivefiberTopology(reading, contextOf(seam))));
/** Native evidence of one reading. */
const evidenceOf = (reading: JsonValue): JsonValue => clone(nativeEvidence(PREVIEW_ID, reading));
/** Every leaf of a JSON value keyed by its path ("$", then each key or index after a "."), as its JSON text. */
function leavesOf(value: JsonValue, path: string, into: Map<string, string>): Map<string, string> {
  if (Array.isArray(value)) {
    for (const [index, child] of value.entries()) leavesOf(child, `${path}.${index}`, into);
  } else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) leavesOf(child, `${path}.${key}`, into);
  } else {
    into.set(path, JSON.stringify(value));
  }
  return into;
}
/** The leaf paths at which two leaf maps differ, sorted; a leaf held on one side only differs. */
function differingIn(own: ReadonlyMap<string, string>, other: ReadonlyMap<string, string>): string[] {
  return [...new Set([...own.keys(), ...other.keys()])].filter(path => own.get(path) !== other.get(path)).sort();
}
/** The leaf paths at which two JSON values differ, sorted; a leaf held on one side only differs. */
function differingLeaves(left: JsonValue, right: JsonValue): string[] {
  return differingIn(leavesOf(left, "$", new Map()), leavesOf(right, "$", new Map()));
}
/** Whether a twin keeps its text's length and holds none of its letters at any position. */
function letterDisjoint(text: string, twin: string): boolean {
  if (text.length !== twin.length) return false;
  for (let index = 0; index < text.length; index++) if (/[A-Za-z]/.test(text.charAt(index)) && twin.charAt(index) === text.charAt(index)) return false;
  return true;
}
type Dependence = { twinDisjoint: boolean; inputDependent: string[]; dependent: string[]; forms: Record<string, Form> };
/** A surfaced leaf's value as a form reads it: its JSON value with the texts and digests named, or "absent" on a side lacking it. */
const formOf = (leaf: string | undefined): JsonValue => (leaf === undefined ? "absent" : namedText(JSON.parse(leaf) as JsonValue));
/** TEXT DEPENDENCE (A1-A3, A5, B4): `surface` applied to the input built from the texts and to the input built from their twins. The
 * input must differ exactly at TEXT_LEAVES; every surfaced leaf that differs carries the text in some form, and its two values are
 * kept as its form, so an allowed leaf is held to its value and not only to its place. */
function textDependence(input: (texts: Texts) => JsonValue, surface: (built: JsonValue) => JsonValue): Dependence {
  const own = input(TEXTS);
  const twin = input(TWINS);
  const ownLeaves = leavesOf(surface(own), "$", new Map());
  const twinLeaves = leavesOf(surface(twin), "$", new Map());
  const dependent = differingIn(ownLeaves, twinLeaves);
  return {
    twinDisjoint: letterDisjoint(TEXTS.document, TWINS.document) && letterDisjoint(TEXTS.block, TWINS.block),
    inputDependent: differingLeaves(own, twin),
    dependent,
    forms: Object.fromEntries(dependent.map(leaf => [leaf, { own: formOf(ownLeaves.get(leaf)), twin: formOf(twinLeaves.get(leaf)) }])),
  };
}
/** TEXT DEPENDENCE as each seam's projection must read: only the payload reference follows the texts, in its pinned value form. */
const PROJECTED: Dependence = {
  twinDisjoint: true, inputDependent: [...TEXT_LEAVES], dependent: [...PAYLOAD_REF_LEAVES],
  forms: Object.fromEntries(PAYLOAD_REF_LEAVES.map(leaf => [leaf, { ...PAYLOAD_REF_FORM }])),
};
/** TEXT DEPENDENCE as native evidence must read: no leaf follows the texts. */
const UNDEPENDENT: Dependence = { twinDisjoint: true, inputDependent: [...TEXT_LEAVES], dependent: [], forms: {} };
/** Where a reading departs from the expected one, each as "<shape> <leaf>" ("<shape> input <leaf>" for the input, "<shape> twins"
 * for twins sharing a letter): a leaf that follows the texts where it may not, stops following them where it must, or holds
 * another form. */
function breaksOf(shape: string, reading: Dependence, expected: Dependence): string[] {
  const breaks: string[] = reading.twinDisjoint === expected.twinDisjoint ? [] : [`${shape} twins`];
  const inputs = [...new Set([...reading.inputDependent, ...expected.inputDependent])].sort();
  breaks.push(...inputs.filter(leaf => reading.inputDependent.includes(leaf) !== expected.inputDependent.includes(leaf)).map(leaf => `${shape} input ${leaf}`));
  const state = (of: Dependence, leaf: string): string => JSON.stringify([of.dependent.includes(leaf), Object.hasOwn(of.forms, leaf) ? of.forms[leaf] : null]);
  const leaves = [...new Set([...reading.dependent, ...Object.keys(reading.forms), ...expected.dependent])].sort();
  breaks.push(...leaves.filter(leaf => state(reading, leaf) !== state(expected, leaf)).map(leaf => `${shape} ${leaf}`));
  return breaks;
}
type Surface = (built: JsonValue) => JsonValue;
/** A5's sweep over every preview shape: where the projections break PROJECTED and where native evidence breaks UNDEPENDENT. */
function sweepOf(projection: Surface, evidence: Surface): { projection: string[]; evidence: string[] } {
  const built = (shape: PreviewShape) => (texts: Texts): JsonValue => readingOf(previewEnvelope(shape, texts));
  const shapes = Object.entries(PREVIEW_SHAPES);
  return {
    projection: shapes.flatMap(([name, shape]) => breaksOf(name, textDependence(built(shape), projection), PROJECTED)),
    evidence: shapes.flatMap(([name, shape]) => breaksOf(name, textDependence(built(shape), evidence), UNDEPENDENT)),
  };
}
/** A built reading's result and document, and which optional fields its shape states. */
const resultOf = (built: JsonValue): JsonObject => objectOf(sourceOf(built).result, "result");
const documentOf = (built: JsonValue): string => String(objectOf(resultOf(built).output, "result.output").text);
const statesBundle = (built: JsonValue): boolean => Object.hasOwn(resultOf(built), "bundle_revision_id");
const statesRelease = (built: JsonValue): boolean => Object.hasOwn(objectOf(resultOf(built).provenance, "result.provenance"), "cli_version");
function statesEngines(built: JsonValue): boolean {
  const versions = objectOf(resultOf(built).provenance, "result.provenance").sdk_versions;
  return isObject(versions) && Object.hasOwn(versions, "tsx_runtime");
}
/** Both seams' topologies with a document prefix smuggled in on the seams `when` selects: 8 characters after the payload reference,
 * or 16 as the first note. */
function smuggledTopologies(into: "payload" | "note", when: (built: JsonValue, seam: number) => boolean): Surface {
  return built => {
    const topologies = topologiesOf(built);
    if (!Array.isArray(topologies)) throw new Error("expected both seams' topologies");
    return topologies.map((topology, seam) => {
      const copy = objectOf(clone(topology), "topology");
      if (!when(built, seam)) return copy;
      if (into === "payload") {
        const snapshot = objectOf(Array.isArray(copy.snapshots) ? copy.snapshots[0] : undefined, "snapshot");
        snapshot.nativePayloadRef = `${String(snapshot.nativePayloadRef)}${documentOf(built).slice(0, 8)}`;
      } else {
        copy.diagnostics = [documentOf(built).slice(0, 16), ...(Array.isArray(copy.diagnostics) ? copy.diagnostics : [])];
      }
      return copy;
    });
  };
}
/** Native evidence with an 8-character document prefix smuggled in as a note on the readings `when` selects. */
function smuggledEvidence(when: (built: JsonValue) => boolean): Surface {
  return built => {
    const evidence = objectOf(evidenceOf(built), "evidence");
    if (when(built)) evidence.note = documentOf(built).slice(0, 8);
    return evidence;
  };
}
interface Smuggle {
  readonly id: string;
  readonly label: string;
  readonly projection: Surface;
  readonly evidence: Surface;
  readonly breaks: { readonly projection: readonly string[]; readonly evidence: readonly string[] };
}
/** A5's positive control: each plant smuggles a document prefix into one surface, keyed to one shape or seam (the gate's G3-G6 src
 * mutants, rebuilt over the surfaces; E4 the native-evidence analog of G4), and the sweep must name exactly its breaks. */
const SMUGGLES: readonly Smuggle[] = [
  {
    id: "G3", label: "a 16-character document prefix noted first when engine identities are stated",
    projection: smuggledTopologies("note", statesEngines), evidence: evidenceOf,
    breaks: { projection: ["STATED $.0.diagnostics.0", "STATED $.1.diagnostics.0"], evidence: [] },
  },
  {
    id: "G4", label: "a 16-character document prefix noted first when no producer release is stated",
    projection: smuggledTopologies("note", built => !statesRelease(built)), evidence: evidenceOf,
    breaks: { projection: ["BARE $.0.diagnostics.0", "BARE $.1.diagnostics.0"], evidence: [] },
  },
  {
    id: "G5", label: "an 8-character document prefix after the payload reference when no bundle is stated",
    projection: smuggledTopologies("payload", built => !statesBundle(built)), evidence: evidenceOf,
    breaks: { projection: ["NO_BUNDLE $.0.snapshots.0.nativePayloadRef", "NO_BUNDLE $.1.snapshots.0.nativePayloadRef"], evidence: [] },
  },
  {
    id: "G6", label: "an 8-character document prefix after the payload reference on the injected-fixture seam",
    projection: smuggledTopologies("payload", (_built, seam) => seam === 1), evidence: evidenceOf,
    breaks: {
      projection: ["FULL", "NO_BUNDLE", "BARE", "STATED"].map(shape => `${shape} $.1.snapshots.0.nativePayloadRef`), evidence: [],
    },
  },
  {
    id: "E4", label: "an 8-character document prefix in native evidence when no producer release is stated",
    projection: topologiesOf, evidence: smuggledEvidence(built => !statesRelease(built)),
    breaks: { projection: [], evidence: ["BARE $.note"] },
  },
];

interface Refusal {
  readonly category: string;
  readonly message: string;
}
function refusalOf(error: unknown): Refusal {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
function adapterRefusal(envelope: JsonValue): Refusal | null {
  try {
    reactivefiberTopology(readingOf(envelope), contextOf("rf-cli"));
    return null;
  } catch (error) {
    return refusalOf(error);
  }
}
function invocation(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits 0. */
function standInRf(envelope: JsonValue): string {
  const folder = makeScratch("rf-assembly-handoff-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(${JSON.stringify(JSON.stringify(envelope))});\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => (JSON.parse(line) as string[]).map(item => (item === ROOT ? "<root>" : item)));
}
async function spawnedArgv(selector: ReactiveFiberRenderSelector): Promise<string[][]> {
  const log = standInRf(previewEnvelope(FULL));
  await nativeReactiveFiberRender(selector, ROOT);
  return spawnsOf(log);
}

interface NativeOutcome {
  readonly refusal: Refusal | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against the stand-in rf. */
async function nativeOutcome(envelope: JsonValue): Promise<NativeOutcome> {
  const log = standInRf(envelope);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: Refusal | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocation());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
/** A registry whose INJECTED preview (registerReactiveFiberRender, the fixture seam) answers `envelope`. The seam types its answer
 * as a preview envelope; this census hands it any envelope, as a test seam can (R3). */
function injectedRegistry(envelope: JsonValue): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => envelope as unknown as InjectedEnvelope, ROOT);
  return registry;
}
function injectedReading(envelope: JsonValue): Promise<JsonValue> {
  return injectedRegistry(envelope).invoke(PREVIEW_ID, { model: "m", task: "t" }, invocation());
}
/** The source envelope a reading carries. */
function sourceOf(reading: JsonValue | null): JsonObject {
  return objectOf(objectOf(reading ?? undefined, "reading").source, "reading source");
}

let nativeCache: Promise<{ id: string; effectClass: string; contractSource: string; text: string }[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<{ id: string; effectClass: string; contractSource: string; text: string }[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => ({
      id: entry.descriptor.id, effectClass: entry.descriptor.effectClass, contractSource: entry.descriptor.contractSource ?? "",
      text: JSON.stringify(entry.descriptor),
    }));
  });
  return nativeCache;
}
/** The injected registration's descriptors; its reader is never invoked here. */
function injectedDescriptors(): { id: string; effectClass: string; contractSource: string; text: string }[] {
  return injectedRegistry(null).catalogSnapshot().map(entry => ({
    id: entry.descriptor.id, effectClass: entry.descriptor.effectClass, contractSource: entry.descriptor.contractSource ?? "",
    text: JSON.stringify(entry.descriptor),
  }));
}

interface CodeScan {
  readonly handoff: string[];
  readonly labels: string[];
  readonly fields: string[];
  readonly renderArgv: number;
}
const WORDS = /[A-Za-z0-9_]+/g;
/** One module's handoff spellings (T1), FAMILIES literals (D1), receipt fields (T2) and context render argv arrays. */
function scanCode(fileName: string, text: string): CodeScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const handoff: string[] = [];
  const labels: string[] = [];
  const fields = new Set<string>();
  let renderArgv = 0;
  const literal = (kind: string, value: string): void => {
    if (HANDOFF_WORD.test(value)) handoff.push(`${fileName}: ${kind} ${value}`);
    const families = familyHits(value);
    if (families.length > 0) labels.push(`${fileName}: ${families.join("+")}`);
    for (const word of value.match(WORDS) ?? []) if (RECEIPT_FIELDS.includes(word)) fields.add(word);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      if (HANDOFF_WORD.test(node.text)) handoff.push(`${fileName}: identifier ${node.text}`);
      if (RECEIPT_FIELDS.includes(node.text)) fields.add(node.text);
    } else if (ts.isStringLiteralLike(node)) {
      literal("literal", node.text);
    } else if (ts.isTemplateExpression(node)) {
      // Parts join on a marker, never a space, so a word cannot form across a ${} (hand${x}off spells nothing).
      literal("template", [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    }
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (words.some((word, index) => word === "context" && words[index + 1] === "render")) renderArgv += 1;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { handoff, labels, fields: [...fields].sort(), renderArgv };
}
/** The src modules walk held 115 at base 051d37e (115 at 7bfe51b); the floor sits below it, so an emptied walk reds and an additive
 * one does not, and git's listing of src is the anchor a narrowed walk reds against. */
const SRC_FLOOR = 100;
/** R11's unwalked extent, the src walk's second anchor: the roots of every SOURCE_EXTENSIONS file git would commit that the src walk
 * does not hold ("" the repository root's own vitest configs, examples/' workflow scripts, qa/'s scripts, test/), at 6ef96af. */
const UNWALKED_SOURCE_ROOTS: readonly string[] = ["", "examples", "qa", "test"];
/** The src modules a walk of `base` holds: every regular .ts file below its src/ (symlinks are not followed), relative, sorted. */
function srcModulesIn(base: string): string[] {
  return filesBelow(join(base, "src")).filter(file => file.endsWith(".ts")).map(file => relative(base, file)).sort();
}
let srcCache: { path: string; scan: CodeScan }[] | undefined;
function srcScans(): { path: string; scan: CodeScan }[] {
  srcCache ??= srcModulesIn(REPO).map(path => ({ path, scan: scanCode(path, textOf(join(REPO, path))) }));
  return srcCache;
}
/** The roots of the SOURCE_EXTENSIONS files of a git listing that `walked` does not hold. */
const sourceRootsOf = (listed: readonly string[], walked: ReadonlySet<string>): string[] => rootsUnwalked(listed.filter(isSource), walked);
function srcWalk(): { srcFloorMet: boolean; srcUnwalked: string[]; sourceRoots: string[]; renderArgvSeen: boolean } {
  const scans = srcScans();
  const listed = gitListed("src").filter(path => path.endsWith(".ts"));
  const walked = new Set(scans.map(entry => entry.path));
  const walk = {
    srcFloorMet: scans.length >= SRC_FLOOR && listed.length >= SRC_FLOOR,
    srcUnwalked: listed.filter(path => !walked.has(path)),
    sourceRoots: sourceRootsOf(repoListed(), walked),
    renderArgvSeen: scans.some(entry => entry.scan.renderArgv > 0),
  };
  expect(walk, `src modules walked: ${scans.length}, listed by git: ${listed.length}, floor ${SRC_FLOOR}, unwalked source roots ${JSON.stringify(walk.sourceRoots)}`).toStrictEqual({
    srcFloorMet: true, srcUnwalked: [], sourceRoots: [...UNWALKED_SOURCE_ROOTS], renderArgvSeen: true,
  });
  return walk;
}
/** Per receipt field, the src modules spelling it, sorted. */
function readerSet(scans: readonly { path: string; scan: CodeScan }[]): Record<string, string[]> {
  return Object.fromEntries(RECEIPT_FIELDS.map(field => [field, scans.filter(entry => entry.scan.fields.includes(field)).map(entry => entry.path).sort()]));
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
}
/** The docs tree held 69 files at base 051d37e (71 at 7bfe51b, beside 7 PAGE_ROOTS pages); the floor sits below it, so an emptied
 * walk reds and an additive one does not, and git's listing of docs and the pages is the anchor a narrowed walk reds against. */
const DOCS_FLOOR = 50;
const DOCS_ANCHOR = { file: "docs/workbench/13-contracts-and-config.md", token: PREVIEW_ID };
/** The roots whose pages D4 reads beside docs/, one level deep each: the repository root (README.md, AGENTS.md, CHANGELOG.md,
 * CONTRIBUTING.md, SECURITY.md at 6ef96af, all markdown), examples/ and vendor/. */
const PAGE_ROOTS: readonly string[] = ["", "examples", "vendor"];
/** Every file directly in a page root; the listing keeps the pages among them (isPage), as the walk does. */
const PAGE_SPECS: readonly string[] = PAGE_ROOTS.map(root => `:(glob)${root === "" ? "" : `${root}/`}*`);
/** R10's unwalked extent: the roots of every page (PAGE_EXTENSIONS, any case) git would commit that D4 does not read. */
const UNWALKED_PAGE_ROOTS: readonly string[] = [".agents", ".beads", ".pi", "new-feedback", "test"];
/** The page anchor: the root README.md names the package by its package.json name, so a read page is a page with its text. */
const PAGE_ANCHOR = { file: "README.md", token: String((JSON.parse(textOf(join(REPO, "package.json"))) as { name?: unknown }).name) };
/** A page root's own pages in `base`, one level deep: the regular files whose extension is one of PAGE_EXTENSIONS in any case
 * (symlinks are not followed), relative to `base`. */
function pagesIn(base: string, root: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(join(base, root), { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.filter(entry => entry.isFile() && isPage(entry.name)).map(entry => (root === "" ? entry.name : `${root}/${entry.name}`));
}
/** D4's walk of `base`: every regular file below its docs/ and each page root's own pages, relative paths. */
const pageWalkIn = (base: string): string[] => [
  ...filesBelow(join(base, "docs")).map(file => relative(base, file)), ...PAGE_ROOTS.flatMap(root => pagesIn(base, root)),
];
/** What D4's walk of `base` must hold: every file git lists below docs/ and every page it lists directly in a page root. */
const pageListedIn = (base: string): string[] => [...gitListedIn(base, "docs"), ...gitListedIn(base, ...PAGE_SPECS).filter(isPage)].sort();
/** The roots of the pages of a git listing that `walked` does not hold (R10's extent). */
const pageRootsOf = (listed: readonly string[], walked: ReadonlySet<string>): string[] => rootsUnwalked(listed.filter(isPage), walked);
let docsCache: SourceFile[] | undefined;
function docsFiles(): SourceFile[] {
  docsCache ??= pageWalkIn(REPO).map(path => ({ path, text: textOf(join(REPO, path)) }));
  return docsCache;
}
/** The line every page plant holds: an unmarked rf receipt label (the gate's G10-G11b line). */
const PAGE_PLANT_LINE = "Pi stores the rf receipt beside every run.\n";
/** R12's planted tree: pages in each case and extension the reading must classify (the gate's G10, G11 and G11b and its .md
 * control), a docs/ file D4 reads whole, a page nested below a page root, and two names outside PAGE_EXTENSIONS. */
const PAGE_PLANTS: readonly Plant[] = [
  "NOTES-zz.txt", "ZZ.MD", "README.md", "NOTES", "zz.html", "docs/zz-notes.html", "examples/nested/zz.md", "qa/zz-notes.markdown",
  "qa/zz-notes.MD", "qa/zz-notes.md",
].map(path => ({ path, text: PAGE_PLANT_LINE }));
/** The text every source plant holds: a handoff spelled as an identifier (T1's word). */
const SOURCE_PLANT_TEXT = "export const handOffTarget = 1;\n";
/** R11's planted tree: src modules the walk holds (one nested), a src module in another source extension, source under each unwalked
 * root, and a docs page that is no source. */
const SOURCE_PLANTS: readonly Plant[] = [
  "src/zz-walked.ts", "src/ui/zz-walked.ts", "src/zz-plant.mjs", "qa/zz-plant.mjs", "test/zz-plant.ts", "examples/zz-plant.js",
  "zz-plant.config.ts", "docs/zz-plant.md",
].map(path => ({ path, text: SOURCE_PLANT_TEXT }));
function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++) if (text[index] === "\n") starts.push(index + 1);
  return starts;
}
/** The 0-based line holding `offset`. */
function lineAt(starts: readonly number[], offset: number): number {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((starts[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }
  return low;
}
interface Mention {
  readonly family: string;
  readonly line: number;
  readonly marked: boolean;
}
/** Every FAMILIES match of a text, family by family, with whether a line it spans carries a marker. */
function mentionsOf(text: string): Mention[] {
  const starts = lineStarts(text);
  return FAMILIES.flatMap(family =>
    [...text.matchAll(new RegExp(family.source, "gi"))].map(match => {
      const at = match.index ?? 0;
      const first = lineAt(starts, at);
      const last = lineAt(starts, at + Math.max(match[0].length, 1) - 1);
      const next = starts[last + 1];
      const window = text.slice(starts[first] ?? 0, next === undefined ? text.length : next - 1);
      return { family: family.id, line: first + 1, marked: MARKER.test(window) };
    }),
  );
}

/** The owner filing: the notes of this bead's row in the tracked bead export. */
function filingNotes(): string {
  for (const line of textOf(BEAD_EXPORT).split("\n")) {
    if (line.trim() === "") continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      continue;
    }
    if (isObject(parsed) && parsed.id === BEAD && typeof parsed.notes === "string") return parsed.notes;
  }
  return "";
}

/** Deliberately partial SDK frames (a subset of each SDK message's fields), so they are cast through unknown. */
const SDK_FRAMES = [
  { type: "system", subtype: "init", session_id: "census-session", model: "claude-opus-5-5", permissionMode: "dontAsk", tools: [], cwd: ROOT },
  { type: "assistant", session_id: "census-session", uuid: "m1", parent_tool_use_id: null,
    message: { id: "msg1", model: "claude-opus-5-5", role: "assistant", content: [{ type: "text", text: "OK" }], usage: { input_tokens: 4, output_tokens: 3 } } },
  { type: "result", subtype: "success", session_id: "census-session", uuid: "r1", is_error: false, result: "OK",
    structured_output: undefined, modelUsage: { "claude-opus-5-5": { inputTokens: 4, outputTokens: 3, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 } },
    usage: { input_tokens: 4, output_tokens: 3 }, total_cost_usd: 0.01 },
] as unknown as readonly SDKMessage[];
/** A Claude query stand-in that records each prompt the host forwards and answers OK; no SDK process runs. */
function recordingQuery(prompts: string[]): ClaudeQuery {
  return ({ prompt }) => {
    prompts.push(prompt);
    return (async function* () {
      for (const message of SDK_FRAMES) yield message;
    })();
  };
}
const HEAD = 'export const meta = { name: "rf-assembly-handoff", description: "wb-pfxo.3 residual rows" };\n';
const RENDER_CALL = `await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify({ model: "m", task: "t" })})`;
/** One workflow run over the injected preview of the FULL envelope through the Claude host, its journal rows and forwarded prompts. */
async function hostedRun(body: string): Promise<{ status: string; rows: WorkflowJournalEntry[]; prompts: string[] }> {
  const prompts: string[] = [];
  const rows: WorkflowJournalEntry[] = [];
  const host = createClaudeWorkflowHost({
    cwd: ROOT, model: "claude-opus-5-5", capabilities: injectedRegistry(previewEnvelope(FULL)), grants: [...GRANTS],
    principal: { id: "census-principal", role: "census" }, invocationId: "rf-assembly-handoff-census", query: recordingQuery(prompts),
  });
  const result = await runWorkflow({ script: HEAD + body, host, journal: { entries: [], append: entry => { rows.push(entry); } } });
  return { status: result.status, rows, prompts };
}

/** capability_invoke through the real curated MCP server and a real MCP client, the injected preview of FULL exposed alone. */
async function curatedReply(): Promise<{ isError: boolean; text: string }> {
  const server = createCuratedTools({
    registry: injectedRegistry(previewEnvelope(FULL)), allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, ...GRANTS], principal: { id: "census-principal", role: "census" },
    workspace: ROOT, invocationId: "rf-assembly-handoff-tool", signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-assembly-handoff-census-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    const result = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: { model: "m", task: "t" } } });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, text: first.text };
  } finally {
    await client.close();
    await server.instance.close();
  }
}

type CaseKind = "code" | "mention";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  readonly texts: readonly string[];
  readonly outcome: readonly string[];
}
/** M judges the matchers' pinned inputs, R5-R8 the residuals' quiet rows. A code case's outcome is its T1 hits then its T2 fields. */
const CASES: readonly Case[] = [
  { pin: "MT1", kind: "code", texts: ["export function buildHandoff(): void {}"], outcome: ["control.ts: identifier buildHandoff"] },
  { pin: "MT2", kind: "code", texts: ['const verb = "assembly handoff";'], outcome: ["control.ts: literal assembly handoff"] },
  { pin: "MT3", kind: "code", texts: ['spawn("rf", ["assembly", "handoff", "--json"]);'], outcome: ["control.ts: literal handoff"] },
  { pin: "MT4", kind: "code", texts: [["const label = `$", "{id} hand-off`;"].join("")], outcome: ["control.ts: template <expr> hand-off"] },
  { pin: "MT5", kind: "code", texts: ["const record = { hand_off: true };"], outcome: ["control.ts: identifier hand_off"] },
  { pin: "MF1", kind: "code", texts: ["const id = envelope.result.render_id;"], outcome: ["field:render_id"] },
  { pin: "MF2", kind: "code", texts: ['const basis = result["graph_revision_id"];'], outcome: ["field:graph_revision_id"] },
  { pin: "MF3", kind: "code", texts: ["const { bundle_revision_id: bundle, cli_version } = result;"], outcome: ["field:bundle_revision_id", "field:cli_version"] },
  { pin: "MF4", kind: "code", texts: ['const note = "result.provenance.sdk_versions is read";'], outcome: ["field:sdk_versions"] },
  { pin: "MD1", kind: "mention", texts: ["Pi hands an assembly handoff to the next agent."], outcome: ["H:shipped"] },
  { pin: "MD2", kind: "mention", texts: ["The assembly handoff is proposed, not shipped."], outcome: ["H:marked"] },
  { pin: "MD3", kind: "mention", texts: ["Pi stores the rf receipt beside the run."], outcome: ["L:shipped"] },
  { pin: "MD4", kind: "mention", texts: ["A Pi-assembled record of envelope identifiers, never an rf receipt."], outcome: ["L:marked"] },
  { pin: "MD5", kind: "mention", texts: ["Pi carries rf's handoff receipt across processes and a Render Receipt beside it."], outcome: ["H:shipped", "L:shipped"] },
  { pin: "MD6", kind: "mention", texts: ["Pi ships the cross-process handoff\nwhich stays gated."], outcome: ["H:shipped"] },
  { pin: "R5", kind: "code", texts: ['// hand off the reading to the next agent\nconst verb = "hand" + "off";\nconst key = "render" + "_id";'], outcome: [] },
  { pin: "R6", kind: "code", texts: ["const basis = snapshot.sourceRevision;\nconst ref = evidence.sourceBasis;\n// render_id"], outcome: [] },
  { pin: "R7", kind: "mention", texts: ["The rf handoff receipt ships today; it is no longer proposed."], outcome: ["H:marked"] },
  { pin: "R8", kind: "mention", texts: ["Pi passes the assembly to the next agent with the receipt rf printed as its context."], outcome: [] },
];
function outcomeOf(kind: CaseKind, texts: readonly string[]): string[] {
  const text = texts[0] ?? "";
  if (kind === "mention") return mentionsOf(text).map(mention => `${mention.family}:${mention.marked ? "marked" : "shipped"}`);
  const scan = scanCode("control.ts", text);
  return [...scan.handoff, ...scan.fields.map(field => `field:${field}`)];
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  T1: async () => {
    const walk = srcWalk();
    const hits = srcScans().flatMap(entry => entry.scan.handoff);
    expect(hits, "a src identifier or literal spelling a handoff").toEqual([]);
    return { ...walk, hits };
  },
  T2: async () => {
    const walk = srcWalk();
    const set = readerSet(srcScans());
    expect(set, "the src modules spelling an rf receipt field").toStrictEqual(clone(READER_SET));
    return clone({ ...walk, readerSet: set });
  },
  T3: async () => {
    const reactivefiber = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const rf = (descriptors: { id: string; effectClass: string }[]): JsonValue =>
      descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX)).map(({ id, effectClass }) => ({ id, effectClass }));
    const native = await nativeDescriptors();
    const pinned = PINNED_ROSTER.map(id => ({ id, effectClass: "read" }));
    const descriptorHandoff = [...native, ...injectedDescriptors()].filter(descriptor => HANDOFF_WORD.test(descriptor.text)).map(descriptor => descriptor.id);
    expect(reactivefiber).toStrictEqual([...PINNED_ROSTER]);
    expect(rf(native)).toStrictEqual(pinned);
    expect(rf(injectedDescriptors())).toStrictEqual(pinned);
    expect(descriptorHandoff).toEqual([]);
    return { site: ROSTER_SITE, reactivefiber, native: rf(native), injected: rf(injectedDescriptors()), descriptorHandoff };
  },
  T4: async () => {
    const legacy = await spawnedArgv({ model: "m", task: "t" });
    const view = await spawnedArgv({ view: "v", taskId: "t", model: "m" });
    const shapes = [...legacy, ...view].map(argv => ({ verb: argv.slice(2, 4).join(" "), tail: argv.slice(-3).join(" ") }));
    expect({ spawns: [legacy.length, view.length], shapes }).toStrictEqual({
      spawns: [1, 1],
      shapes: [{ verb: "context render", tail: "--no-commit --no-input --json" }, { verb: "context render", tail: "--no-commit --no-input --json" }],
    });
    return { legacy, view };
  },
  A1: async () => {
    const projected = projectionOf(previewEnvelope(FULL));
    const reading = {
      sourceRevision: projected.snapshot.sourceRevision ?? null,
      sourceVersion: projected.snapshot.sourceVersion ?? null,
      identityRefs: refsOf(projected.snapshot).filter(ref => ref.startsWith("rf-graph:") || ref.startsWith("rf-bundle:")),
      documentBytes: carrying(projected.strings, DOCUMENT),
      blockBytes: carrying(projected.strings, BLOCK_CONTENT),
      renderIds: carrying(projected.strings, "rfr_"),
      dependence: textDependence(texts => readingOf(previewEnvelope(FULL, texts)), topologiesOf),
    };
    expect(reading).toStrictEqual({
      sourceRevision: RF_FIXTURE_GRAPH_REVISION, sourceVersion: BUNDLE,
      identityRefs: [`rf-graph:${RF_FIXTURE_GRAPH_REVISION}`, `rf-bundle:${BUNDLE}`], documentBytes: 0, blockBytes: 0, renderIds: 0,
      dependence: PROJECTED,
    });
    return placeheld(reading);
  },
  A2: async () => {
    const projected = projectionOf(previewEnvelope(NO_BUNDLE));
    const reading = {
      sourceRevision: projected.snapshot.sourceRevision ?? null,
      hasSourceVersion: Object.hasOwn(projected.snapshot, "sourceVersion"),
      identityRefs: refsOf(projected.snapshot).filter(ref => ref.startsWith("rf-graph:") || ref.startsWith("rf-bundle:")),
      bundleNamed: carrying(projected.strings, BUNDLE),
      documentBytes: carrying(projected.strings, DOCUMENT),
      blockBytes: carrying(projected.strings, BLOCK_CONTENT),
      dependence: textDependence(texts => readingOf(previewEnvelope(NO_BUNDLE, texts)), topologiesOf),
    };
    expect(reading).toStrictEqual({
      sourceRevision: RF_FIXTURE_GRAPH_REVISION, hasSourceVersion: false, identityRefs: [`rf-graph:${RF_FIXTURE_GRAPH_REVISION}`],
      bundleNamed: 0, documentBytes: 0, blockBytes: 0,
      dependence: PROJECTED,
    });
    return placeheld(reading);
  },
  A3: async () => {
    const withBundle = clone(nativeEvidence(PREVIEW_ID, readingOf(previewEnvelope(FULL))));
    const withoutBundle = clone(nativeEvidence(PREVIEW_ID, readingOf(previewEnvelope(NO_BUNDLE))));
    const strings = stringLeaves([withBundle, withoutBundle]);
    expect(objectOf(withBundle, "evidence").sourceBasis).toBe(BUNDLE);
    expect(objectOf(withoutBundle, "evidence").sourceBasis).toBe(RF_FIXTURE_GRAPH_REVISION);
    expect([carrying(strings, DOCUMENT), carrying(strings, BLOCK_CONTENT)]).toEqual([0, 0]);
    const dependence = {
      withBundle: textDependence(texts => readingOf(previewEnvelope(FULL, texts)), evidenceOf),
      withoutBundle: textDependence(texts => readingOf(previewEnvelope(NO_BUNDLE, texts)), evidenceOf),
    };
    expect(dependence).toStrictEqual({ withBundle: UNDEPENDENT, withoutBundle: UNDEPENDENT });
    return placeheld({ withBundle, withoutBundle, documentBytes: 0, blockBytes: 0, dependence });
  },
  A4: async () => {
    const { refusal, reading, spawns } = await nativeOutcome(previewEnvelope(FULL));
    expect(refusal).toBeNull();
    const source = sourceOf(reading);
    const result = objectOf(source.result, "reading result");
    const own = (value: JsonObject, key: string): JsonValue => (Object.hasOwn(value, key) ? (value[key] ?? null) : "absent");
    const witness = { renderId: own(result, "render_id"), ephemeral: own(result, "ephemeral"), transactionId: own(source, "transaction_id"), spawns: spawns.length };
    expect(witness).toStrictEqual({ renderId: null, ephemeral: true, transactionId: null, spawns: 1 });
    return witness;
  },
  A5: async () => {
    const real = sweepOf(topologiesOf, evidenceOf);
    expect(real, "a preview shape whose projection or native evidence follows the texts outside the allowed leaf's pinned form").toStrictEqual({
      projection: [], evidence: [],
    });
    const controls = Object.fromEntries(SMUGGLES.map(smuggle => [smuggle.id, sweepOf(smuggle.projection, smuggle.evidence)]));
    expect(controls, "each planted smuggle is named at exactly its own shapes and leaves").toStrictEqual(
      Object.fromEntries(SMUGGLES.map(smuggle => [smuggle.id, { projection: [...smuggle.breaks.projection], evidence: [...smuggle.breaks.evidence] }])),
    );
    return { shapes: Object.keys(PREVIEW_SHAPES), ...real, controls };
  },
  B1: async () => {
    const { refusal, reading, spawns } = await nativeOutcome(committedEnvelope("committed"));
    const witness = { refusal: clone(refusal), reading, spawns: spawns.length, verb: (spawns[0] ?? []).slice(2, 4) };
    expect(witness).toStrictEqual({
      refusal: { category: "transport", message: "RF preview returned an unrecognized or contradictory envelope." }, reading: null, spawns: 1,
      verb: ["context", "render"],
    });
    return witness;
  },
  B2: async () => {
    const refusal = adapterRefusal(committedEnvelope("committed"));
    expect(refusal?.category).toBe("validation");
    return { refusal: clone(refusal) };
  },
  B3: async () => {
    const variants: JsonValue[] = [];
    for (const variant of PARTIAL_VARIANTS) {
      const envelope = committedEnvelope(variant);
      const native = await nativeOutcome(envelope);
      const adapter = adapterRefusal(envelope);
      expect({ variant, nativeReading: native.reading, nativeCategory: native.refusal?.category, adapterCategory: adapter?.category }).toStrictEqual({
        variant, nativeReading: null, nativeCategory: "transport", adapterCategory: "validation",
      });
      variants.push({ variant, native: native.refusal?.message ?? null, adapter: adapter?.message ?? null });
    }
    return { variants };
  },
  B4: async () => {
    const evidence = clone(nativeEvidence(PREVIEW_ID, readingOf(committedEnvelope("committed"))));
    const strings = stringLeaves(evidence);
    const counts = { renderIds: carrying(strings, RENDER_ID), documentBytes: carrying(strings, DOCUMENT), blockBytes: carrying(strings, BLOCK_CONTENT) };
    const dependence = Object.fromEntries(
      COMMITTED_VARIANTS.map(variant => [variant, textDependence(texts => readingOf(committedEnvelope(variant, texts)), evidenceOf)]),
    );
    expect(counts).toStrictEqual({ renderIds: 0, documentBytes: 0, blockBytes: 0 });
    expect(dependence).toStrictEqual(Object.fromEntries(COMMITTED_VARIANTS.map(variant => [variant, UNDEPENDENT])));
    return placeheld({ evidence, ...counts, dependence });
  },
  C1: async () => {
    const projected = projectionOf(previewEnvelope(BARE));
    const refs = refsOf(projected.snapshot);
    const reading = {
      cliRefs: refs.filter(ref => ref.startsWith("rf-cli:")),
      engineRefs: refs.filter(ref => ref.startsWith("rf-engine")),
      notes: notesOf(projected),
      releaseNamed: carrying(projected.strings, RF_FIXTURE_RELEASE),
      digests: digestsIn(projected.strings),
    };
    const payload = `sha256:${createHash("sha256").update(DOCUMENT).digest("hex")}`;
    expect(reading).toStrictEqual({
      cliRefs: [], engineRefs: [], notes: [], releaseNamed: 0, digests: [RF_FIXTURE_GRAPH_REVISION, BUNDLE, payload].sort(),
    });
    return placeheld(reading);
  },
  C2: async () => {
    const projected = projectionOf(previewEnvelope(STATED));
    const refs = refsOf(projected.snapshot);
    const reading = {
      cliRefs: refs.filter(ref => ref.startsWith("rf-cli:")),
      engineRefs: refs.filter(ref => ref.startsWith("rf-engine")),
      notes: notesOf(projected),
      releaseNamed: carrying(projected.strings, RF_FIXTURE_RELEASE),
    };
    expect(reading.cliRefs).toEqual([`rf-cli:${RF_FIXTURE_RELEASE}`]);
    expect(reading.engineRefs).toHaveLength(2);
    expect(reading.releaseNamed).toBeGreaterThan(0);
    return placeheld(reading);
  },
  C3: async () => {
    const absent = clone(nativeEvidence(PREVIEW_ID, readingOf(previewEnvelope(BARE))));
    const stated = clone(nativeEvidence(PREVIEW_ID, readingOf(previewEnvelope(STATED))));
    expect(Object.hasOwn(objectOf(absent, "evidence"), "producerRelease")).toBe(false);
    expect(objectOf(stated, "evidence").producerRelease).toBe(RF_FIXTURE_RELEASE);
    return placeheld({ absent, stated });
  },
  C4: async () => {
    const envelope = previewEnvelope(BARE);
    const native = await nativeOutcome(envelope);
    const injected = await injectedReading(envelope);
    const keysOf = (reading: JsonValue | null): string[] =>
      Object.keys(objectOf(objectOf(sourceOf(reading).result, "result").provenance, "provenance")).sort();
    const witness = {
      nativeProvenanceKeys: keysOf(native.reading), injectedProvenanceKeys: keysOf(injected),
      nativeVerbatim: JSON.stringify(sourceOf(native.reading)) === JSON.stringify(envelope),
      injectedVerbatim: JSON.stringify(sourceOf(injected)) === JSON.stringify(envelope),
    };
    expect(witness.nativeProvenanceKeys.filter(key => key === "cli_version" || key === "sdk_versions")).toEqual([]);
    expect(witness.injectedProvenanceKeys).toEqual(witness.nativeProvenanceKeys);
    expect([witness.nativeVerbatim, witness.injectedVerbatim]).toEqual([true, true]);
    return witness;
  },
  D1: async () => {
    const walk = srcWalk();
    const hits = srcScans().flatMap(entry => entry.scan.labels);
    expect(hits, "a src literal spelling a handoff form or an rf receipt label").toEqual([]);
    return { ...walk, families: FAMILIES.map(family => family.id), hits };
  },
  D2: async () => {
    const descriptors = [...(await nativeDescriptors()), ...injectedDescriptors()];
    const hits = descriptors.filter(descriptor => familyHits(descriptor.text).length > 0).map(descriptor => descriptor.id);
    const rfCarriers = descriptors.filter(descriptor => descriptor.id === PREVIEW_ID).map(descriptor => descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE);
    const descriptorFloorMet = descriptors.length >= 5;
    expect(descriptorFloorMet, `descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toBe(true);
    expect({ hits, rfCarriers }).toStrictEqual({ hits: [], rfCarriers: [true, true] });
    return { descriptorFloorMet, hits, rfCarriers };
  },
  D3: async () => {
    const envelopes: JsonValue[] = [...Object.values(PREVIEW_SHAPES).map(shape => previewEnvelope(shape)), REFUSAL];
    const projections = envelopes.flatMap(envelope => (["rf-cli", "injected-fixture"] as const).map(seam => projectionOf(envelope, seam)));
    const receiptWords = projections.reduce((sum, projected) => sum + projected.strings.filter(text => /receipt/i.test(text)).length, 0);
    const kinds = [...new Set(projections.map(projected => String(projected.snapshot.kind)))].sort();
    const seamLabels = [...new Set(projections.map(projected => String(objectOf(projected.snapshot.node, "node").statusText).split(" · ")[0] ?? ""))].sort();
    expect(receiptWords, "a surfaced projection string naming a receipt").toBe(0);
    return { projections: projections.length, receiptWords, kinds, seamLabels };
  },
  D4: async () => {
    const files = docsFiles();
    const listed = pageListedIn(REPO);
    const walked = new Set(files.map(file => file.path));
    const anchor = files.find(file => file.path === DOCS_ANCHOR.file);
    const page = files.find(file => file.path === PAGE_ANCHOR.file);
    const walk = {
      floorMet: files.length >= DOCS_FLOOR && listed.length >= DOCS_FLOOR,
      unwalked: listed.filter(path => !walked.has(path)),
      pageRoots: pageRootsOf(repoListed(), walked),
      anchorRead: anchor?.text.includes(DOCS_ANCHOR.token) === true,
      pageAnchorRead: page?.text.includes(PAGE_ANCHOR.token) === true,
    };
    expect(walk, `docs and pages: ${files.length} files walked, ${listed.length} listed by git, floor ${DOCS_FLOOR}, anchors ${DOCS_ANCHOR.file} and ${PAGE_ANCHOR.file}`).toStrictEqual({
      floorMet: true, unwalked: [], pageRoots: [...UNWALKED_PAGE_ROOTS], anchorRead: true, pageAnchorRead: true,
    });
    const findings = files.flatMap(file =>
      mentionsOf(file.text).filter(mention => !mention.marked).map(mention => `${file.path}:${mention.line} ${mention.family}: named-as-shipped`),
    );
    expect(findings, "a docs mention naming a handoff form or an rf receipt label as shipped").toEqual([]);
    return { ...walk, markers: MARKERS.length, findings };
  },
  F1: async () => {
    const text = filingNotes();
    expect(text, `${BEAD} has no notes in the bead export`).not.toBe("");
    // The filing's acceptance sentence, cut into its "(x) ..." clauses; each judged label must equal its clause.
    const acceptance = /Acceptance: ([\s\S]*?)\s*(?:Related:|$)/.exec(text)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label).map(entry => entry.id);
    const constantsQuoted = FILING_CONSTANTS.filter(constant => text.includes(constant));
    expect(clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(entry => entry.id));
    expect(constantsQuoted).toEqual([...FILING_CONSTANTS]);
    return { clauses, labelsEqual, constantsQuoted };
  },
  R1: async () => {
    const run = await hostedRun(`const reading = ${RENDER_CALL};\nreturn reading.contract;`);
    const nodes = run.rows.filter(row => row.kind === "node");
    const text = nodes[0]?.text ?? "";
    const witness = {
      status: run.status, nodeRows: nodes.length, effectClass: nodes[0]?.effectClass ?? null,
      textCarriesDocument: text.includes(DOCUMENT), textCarriesBlockContent: text.includes(BLOCK_CONTENT),
      textIsReading: text === JSON.stringify(readingOf(previewEnvelope(FULL))),
    };
    expect(witness).toStrictEqual({
      status: "completed", nodeRows: 1, effectClass: "read", textCarriesDocument: true, textCarriesBlockContent: true, textIsReading: true,
    });
    return witness;
  },
  R2: async () => {
    const run = await hostedRun(`const reading = ${RENDER_CALL};\nreturn await agent("Context follows.\\n" + reading.source.result.output.text);`);
    const witness = {
      status: run.status, agentPrompts: run.prompts.length, promptCarriesDocument: run.prompts.some(prompt => prompt.includes(DOCUMENT)),
      promptNamesReceipt: run.prompts.some(prompt => /receipt/i.test(prompt)),
    };
    expect(witness).toStrictEqual({ status: "completed", agentPrompts: 1, promptCarriesDocument: true, promptNamesReceipt: false });
    return witness;
  },
  R3: async () => {
    const envelope = committedEnvelope("committed");
    const source = sourceOf(await injectedReading(envelope));
    const strings = stringLeaves(source);
    const witness = {
      verbatim: JSON.stringify(source) === JSON.stringify(envelope), carriesRenderId: carrying(strings, RENDER_ID) > 0,
      carriesDocument: carrying(strings, DOCUMENT) > 0, carriesBlockContent: carrying(strings, BLOCK_CONTENT) > 0,
    };
    expect(witness).toStrictEqual({ verbatim: true, carriesRenderId: true, carriesDocument: true, carriesBlockContent: true });
    return witness;
  },
  R4: async () => {
    const envelope = previewEnvelope(FULL);
    const stated = String(objectOf(objectOf(envelope.result, "result").output, "output").digest);
    const payloadRef = String(projectionOf(envelope).snapshot.nativePayloadRef);
    const witness = {
      payloadRef, isTextSha256: payloadRef === `rf-output:sha256:${createHash("sha256").update(DOCUMENT).digest("hex")}`,
      isOutputDigest: payloadRef.endsWith(stated),
    };
    expect([witness.isTextSha256, witness.isOutputDigest]).toEqual([true, false]);
    return witness;
  },
  R9: async () => {
    const reply = await curatedReply();
    const payload = objectOf(clone(JSON.parse(reply.text)), "tool reply");
    const witness = {
      isError: reply.isError, kind: payload.kind ?? null, replyCarriesDocument: reply.text.includes(DOCUMENT),
      replyCarriesBlockContent: reply.text.includes(BLOCK_CONTENT), replyNamesReceipt: /receipt/i.test(reply.text),
    };
    expect(witness).toStrictEqual({ isError: false, kind: "returned", replyCarriesDocument: true, replyCarriesBlockContent: true, replyNamesReceipt: false });
    return witness;
  },
  R10: async () => {
    const walked = new Set(docsFiles().map(file => file.path));
    const roots = pageRootsOf(repoListed(), walked);
    // The extent is real: a line D4 names as shipped there is never judged.
    const planted = outcomeOf("mention", ["Pi stores the rf receipt beside the run."]);
    expect({ roots, planted }).toStrictEqual({ roots: [...UNWALKED_PAGE_ROOTS], planted: ["L:shipped"] });
    return { roots, planted };
  },
  R11: async () => {
    const roots = sourceRootsOf(repoListed(), new Set(srcScans().map(entry => entry.path)));
    // The same walk and extent over a planted tree: a src module in another source extension makes src an unwalked root.
    const planted = withPlantedTree(SOURCE_PLANTS, base => {
      const walked = srcModulesIn(base);
      return { walked, roots: sourceRootsOf(gitListedIn(base), new Set(walked)) };
    });
    // The extent is real: a handoff spelled in such a module is a T1 hit wherever the walk reads it.
    const spelled = outcomeOf("code", [SOURCE_PLANT_TEXT]);
    expect({ roots, planted, spelled }).toStrictEqual({
      roots: [...UNWALKED_SOURCE_ROOTS], planted: { walked: ["src/ui/zz-walked.ts", "src/zz-walked.ts"], roots: ["", "examples", "qa", "src", "test"] },
      spelled: ["control.ts: identifier handOffTarget"],
    });
    return { roots, planted, spelled };
  },
  R12: async () => {
    const planted = withPlantedTree(PAGE_PLANTS, base => {
      const read = pageWalkIn(base).sort();
      const listing = gitListedIn(base);
      const pages = listing.filter(isPage);
      const neither = PAGE_PLANTS.map(plant => plant.path).filter(path => !read.includes(path) && !pages.includes(path)).sort();
      return { read, listed: pageListedIn(base), roots: pageRootsOf(listing, new Set(read)), neither };
    });
    // The residual is real: the line planted in a page no reading classifies is an unmarked mention.
    const mention = outcomeOf("mention", [PAGE_PLANT_LINE]);
    const read = ["NOTES-zz.txt", "README.md", "ZZ.MD", "docs/zz-notes.html"];
    expect({ planted, mention }).toStrictEqual({
      planted: { read, listed: [...read].sort(), roots: ["examples", "qa"], neither: ["NOTES", "zz.html"] }, mention: ["L:shipped"],
    });
    return { planted, mention };
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async () => {
        const outcome = outcomeOf(entry.kind, entry.texts);
        expect(outcome).toStrictEqual([...entry.outcome]);
        return { digest: digestOf(entry.texts), outcome };
      },
    ]),
  ),
};

describe("wb-pfxo.3 assembly-handoff census (RF-COMPOSITIONAL-ASSEMBLY-R4, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "A:5", "B:4", "C:4", "D:4", "F:1", "M:15", "R:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
