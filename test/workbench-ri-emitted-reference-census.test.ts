/**
 * wb-tz4r.6 (RI-UNIFIED-DECISION-INFERENCE-R6, program-triage-2026-10-22): a census with an until-then leg and the adoption
 * contract armed. Statement (the owner filing's full statement, bead notes): "If Pi ever uses a reference emitted by a native
 * decision result (gated: RI typed decision envelope emitting snapshot-bound pointer/span references, RI-DEC-03/07; unshipped at
 * 485f3615db1e), Pi shall treat it as bound to the producer's snapshot digest and revalidate it against that snapshot before use,
 * refusing a reference whose snapshot no longer matches as stale rather than dereferencing it", pinned to
 * docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:20@485f3615db1e ("An emitted reference is snapshot-bound and
 * must be revalidated before use."). The acceptance is the filing's, verbatim: clause (c) and the trigger sentence ("no emitted
 * references reach Pi today") are row A's label, clause (a) row B's and clause (b) row C's.
 *
 * SIBLING DISCIPLINE. This file and its roster spell none of the names the sibling censuses of this family walk src/test/qa for
 * (wb-tz4r.1 (a), wb-tz4r.2 D2, wb-tz4r.5 (a), wb-tz4r.8 (c)): not RI's typed decision module, its two backend classes or its
 * generative response type joined in any case convention, no decision result-state identifier, and none of the two greps' phrases.
 * The producer directory that holds RI's request contract is written src/reactive_inference/<ENGINE>/ throughout.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23; read-only git rev-parse, git show and git grep on the local ReactiveInferenceSDK
 * checkout, no fetch; the roster's producer block records every line, blob and row). At the pin 485f3615db1e and at origin/master
 * 075ac589d64d (10 commits past it) the three program files are byte-identical: 01-contracts.md :7 lists pointer and
 * extractive/generated spans in the output family and names stale among the producer's state words, :11 has the pure compiler
 * validate digests and RFC 6901 pointer candidates, :20 is the quote; 02-implementation.md :7 (RI-DEC-03) and :15 (RI-DEC-07,
 * snapshot freshness) are the gating work packages; 03-conformance.md :14 leaves "exact pointer revision/digest checks" to a later
 * matrix. In src the snapshot digest is request-side only: the request contract's snapshot_digest field (contracts.py :59 at the
 * pin, its form "64 lowercase sha256 hex characters" :69 and its design intent :70) and the preflight plan's echo of it
 * (preflight.py :54 and :103; at the probe the same four rows sit four lines lower); the module exports seven request and preflight
 * names, none a result, reference, pointer or span; and pointer|extractive occurs in no src row at either commit. No emitted
 * reference exists, so none can reach Pi: the trigger has not fired.
 *
 * THE FIXTURE is CONSTRUCTED (no build emits a reference at either commit; its key names are read off the producer's words, never a
 * shipped shape). SNAPSHOT is the producer's conditioning snapshot, named ordered observations (:7), under a digest in the request
 * contract's form; three EMITTED REFERENCES are bound to that digest: a pointer, a pointer whose tokens carry both RFC 6901 escapes,
 * and an extractive span (code-point offsets into an ASCII string, so byte, UTF-16 and code-point offsets coincide). MOVED is the
 * snapshot the host holds once the producer's has moved on: the same pointers resolve to other values, under another digest. The
 * four STALE BASES are the moved digest and three near-misses of the producer's (case-folded, its 12-hex short id, its last nibble
 * changed), each a different string, so an exact check (03-conformance.md :14) refuses every one. Every target and moved value
 * carries a mark (ref-target- and moved-target-) that occurs nowhere in the carrier, and neither fixture digest does.
 *
 * PI'S SEAMS. A reference could reach Pi only through rf: RI may surface a decision result as a separately tagged Reactive Fiber
 * resource (01-contracts.md :23), and Pi's one rf reader is the reactivefiber.render.preview provider (the native reader, here over a
 * stand-in rf on PATH, and the injected seam) and its adapter (reactivefiber-observer.ts). Pi's one reference-resolution seam is the
 * host's evidence store (docs/workbench/20; src/workbench/evidence-loader.ts :3: "A reference is only a pointer"), built by
 * createWorkbenchEvidenceStore with the loaders
 * of EVIDENCE_LOADER_ROWS; it routes by provider first and answers an unknown producer or ref kind no-loader. Neither seat uses an
 * emitted reference today, so acceptance (a) is armed on a test-side REFERENCE ADOPTION, an evidence loader that compares the
 * reference's snapshot digest to the basis it is handed (byte-exact) and refuses a mismatch typed, through the store's own refusal
 * channel (EvidenceRefusal carrying freshness stale), before any read; and THE JUDGE reads every use through the real store: the
 * entry it settles and how often the snapshot was read. A use rule holds the basis's id and digest, and its document only through a
 * getter that counts as a read, so read() and that getter are its only paths to the snapshot and the judge counts both.
 *  A, acceptance (c) and the trigger. A1 a TypeScript-AST census of every src module, the walk held to the paths git lists: no
 *    literal is an RFC 6901 escape token (~0, ~1) and no regular expression carries one (a pattern is read by its spelling and,
 *    compiled, by what it matches, a RegExp constructor's literal pattern included), no literal and no package name carries the
 *    reference word family (pointer, deref, extractive, ptr), and the only identifiers that do are the judged sites, the selection
 *    glyph of three terminal views; floors, flagged controls, quiet controls and the residuals' quiet rows. A2 the host-wired store
 *    answers every form of every reference (its canonical JSON, the bare pointer and the digest#pointer fragment form) on an rf
 *    preview node and on a node of each served provider's own type no-loader, settled at the request itself (no loader takes the
 *    form), and no reader seam is called; docs/20, read by section, keeps its anything-else no-loader row last in the mapping table,
 *    and its refusal-and-freshness section reads as measured, opening with the no-loader rule. A3 the gating envelope is measured
 *    unshipped: the roster's producer facts, the bead row's gating sentence, and no RI package declared or named: no load specifier
 *    and no src literal (a spawn argument, a resolved name, a dotted module path) spells its root; flagged and quiet controls.
 *  B, acceptance (a). B1 the adoption fixture is well formed: each reference carries the producer's snapshot digest in the request
 *    contract's form, its target resolves in SNAPSHOT by RFC 6901 (escapes included) and its pointer resolves to another value in
 *    MOVED; B2 the reference adoption over the real store refuses every reference at every stale basis typed (unavailable,
 *    transport, stale) with the snapshot never read, and the judge finds nothing; B3 at the producer's own digest it loads the
 *    target once, its basis the producer's digest verbatim; B4 the until-then posture on real code: both rf seams carry a decision
 *    resource holding the references, bound to the snapshot beside them or moved, at both placements, byte for byte, and each
 *    projection is byte-identical to the carrier's (no target surfaced, no digest adopted, no evidence ref named), the rf checker
 *    quiet: 0 dereferences until the gate opens.
 *  C, acceptance (b). The judge and the rf checker refuse every escape: C1 dereferencing without the digest comparison; C2
 *    dereferencing against the current snapshot when the digests differ (re-bound and labelled stale, the docs/20 load-and-label
 *    idiom, or matched leniently); C3 reading the snapshot before the comparison (through read() or through the basis handle, the
 *    gate's G07), an untyped refusal, and a Pi-minted digest compared in place of the producer's, and no use rule naming a module
 *    binding that holds a snapshot; C4 the rf adapter mutants: a dereference surfaced in the projection, the reference's digest
 *    adopted as an evidence ref or as the snapshot's basis, the reading rewritten; C5 the quiet controls and R-REASON's quiet row.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row, every pin's witness, the scan
 * constants, the fixture and the registered test titles are held to the out-of-file roster
 * (test/fixtures/ri-emitted-reference-roster.json). OUTSIDE ANCHORS: the owner filing's row in the tracked bead export
 * (.beads/issues.jsonl, row wb-tz4r.6): each acceptance clause sits verbatim in exactly one row label, the trigger in row A's, and its
 * quote, gating and authority lines agree with the roster's producer lines; the cut's landed delivery note in the same row, read off
 * its own words (each row it names judged under its clause with every pin it names, A1's escape tokens and word family read, each
 * residual it names kept with its quiet pin); the follow-up's row (wb-48r6: the gate probe its lead line names is a use mutant C3
 * reads); docs/20's mapping table and refusal rules (A2); the src registry EVIDENCE_LOADER_ROWS (A2's providers); git's listing of
 * src (A1's walk, A3's modules).
 * RECORDS: the last case walks this file's registered tests: each roster title once, in order, in run mode, not inverted, ran; every
 * pin's case reached its end; and each made the assertion count the roster records for it, counted once its witness compare held.
 * UNTIL-THEN: acceptance (a)'s use is NOT implemented in Pi (gated: no reference ships at RI 075ac589d64d); B2-B3 arm it on the
 * test-side adoption and B4 pins today's posture. THE GATE-OPENING SIGNAL: when RI ships its typed envelope with emitted references
 * (RI-DEC-03/07) and rf surfaces one, the adopter's loader replaces the reference adoption under the same judge, and a re-measured
 * preview replaces the constructed resource: B4 reds as soon as the adapter projects the reference (an evidence ref or a basis),
 * which is the cue to re-cut this census to the shipped shape.
 * NOT CLAIMED: the reference's key names, its evidence-ref string forms, the resource's placements, the near-miss list and the
 * refusal reason word (transport, docs/20's "a failed read against a disconnected source is transport plus stale") are this
 * fixture's choices, anchored by nothing outside these two files; whether a scheme-prefixed digest (sha256:<hex>) names the same
 * snapshot is the adopter's normalization choice, so no near-miss is one. The flagged and quiet controls, the use mutants other than
 * the follow-up's named probe, the node types and the holder names are anchored only in these two files (the landed note names
 * the mutants in prose, never as members); a case that swaps its own assertions for as many trivial ones and returns its witness as a
 * literal keeps its count; and no docs page but docs/20 is read.
 * RESIDUALS (named families, each with a pinned quiet row): R-SPAN-WORD Pi's own span vocabulary (time intervals, trace spans,
 * redaction ranges) is not read, so a span dereference spelled with span words alone is invisible to A1; R-NAIVE-WALK a pointer
 * walked by split("/") without the escape pair and with no family word is invisible to A1; R-COMPOSED an escape token or a pattern
 * assembled at runtime is invisible to A1's literal reading (A1's quiet rows); R-REASON the judge binds the stale label and the
 * absent read, never the refusal reason, so a typed stale under any reason reads quiet (C5's quiet row); R-RI-UNNAMED an RI load
 * whose literals never spell the package root (a name assembled at runtime, a path or an alias) is invisible to A3 (A3's quiet row).
 * FOLLOW-UP wb-48r6 (R694, the landing-318 gate's LEG-2 survivors, gate of record cmd_77500c8a5789): F1 the use rule's basis is
 * {id, digest} plus a counted document getter, G07's shape is C3's peek-first mutant, and the holder guard is C3's; F2 the landed
 * note and the follow-up's row anchor the pins, the escape tokens, the word family, the residuals and the named probe outside these
 * two files; F3 A1 reads a compiled pattern by what it matches; F4 A3 reads every src literal for RI's root; F5 A2 reads docs/20 by
 * section; F6 the walk is held to git's listing in both directions; F7 the per-pin assertion count; F8 A2 reads each entry at its
 * request; F9 the "only a pointer" sentence is attributed to evidence-loader.ts, where it is.
 * SCOPE: the producer facts are read at their pins and Pi vendors no RI source, so a producer change is seen only when a re-probe
 * re-reads them. No reader, loader or provider is added to src, and nothing here is registered in the host.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type EvidenceContent, type EvidenceEntry, type EvidenceLoader, EvidenceRefusal, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { EVIDENCE_LOADER_ROWS } from "../src/workbench/evidence-producers.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const BEAD = "wb-tz4r.6";
/** The R694 follow-up whose filing names the gate probe C3 reads (wb-48r6, filed at the landing-318 fold). */
const FOLLOW_UP = "wb-48r6";
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/ri-emitted-reference-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const DOCS20 = "docs/workbench/20-evidence-loader-contract.md";

/** A1: the reference word family, read in an identifier's or a literal's words (camelCase split, lower-cased). */
const REFERENCE_WORD = /pointer|deref|extractive|(?<![a-z])ptr(?![a-z])/;
/** A1: the RFC 6901 escape tokens an evaluator must unescape (~1 to "/", then ~0 to "~"), as a whole literal. */
const ESCAPE_TOKENS: readonly string[] = ["~0", "~1"];
/** A1: an escape token inside a regular expression literal. */
const ESCAPE_IN_PATTERN = /~0|~1|~\[01\]|~\[10\]/;
/** A1 (wb-48r6 F3): strings an escape-reading pattern must refuse, so a compiled pattern is flagged only when both the tilde and the
 * escape digit decide its match. */
const ESCAPE_CONTROLS: readonly string[] = ["~", "~x", "~2", "x0", "x1"];
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the count at base ff4082d (115 src files, all modules). */
const FLOORS = { srcFiles: 105, srcModules: 105 };
/** The judged sites: every family identifier in src is the selection glyph of a terminal view, keyed `<file> <identifier>`. */
const JUDGED_SITES: Readonly<Record<string, string>> = {
  "src/ui/workflow-card.ts pointer": "the tool-title glyph of the workflow card (Unicode and ASCII glyph tables)",
  "src/ui/workflow-dialog.ts pointer": "the selected-row glyph of the workflow dialog (Unicode and ASCII glyph tables)",
  "src/ui/workflow-inspector.ts pointer": "the selected-row glyph of the inspector views (its mark table and two row builders)",
};
/** A1's flagged controls: each module text must read at least one site. */
const FLAGGED_CONTROLS: readonly (readonly [string, string])[] = [
  ["escape-literals", 'const token = raw.replaceAll("~1", "/").replaceAll("~0", "~");'],
  ["escape-pattern", 'const token = raw.replace(/~1/g, "/").replace(/~0/g, "~");'],
  ["escape-class", "const escaped = /~[01]/.test(raw);"],
  ["pointer-identifier", "export function resolvePointer(document: unknown, path: string): unknown { return path; }"],
  ["deref-identifier", "const dereferenced = read();"],
  ["extractive-identifier", "const extractiveRange = [0, 4];"],
  ["ptr-identifier", "const ptr = reference.path;"],
  ["pointer-literal", 'const kind = "json-pointer";'],
  ["pointer-specifier", 'import { get } from "jsonpointer";'],
  ["escape-capture", 'const token = raw.replace(/~([01])/g, (_match, digit) => (digit === "0" ? "~" : "/"));'],
  ["escape-alternation", 'const token = raw.replace(/~(?:0|1)/g, "");'],
  ["escape-code-point", "const escaped = /\\u007e[01]/.test(raw);"],
  ["escape-constructor", 'const pattern = new RegExp("~([01])", "g");'],
];
/** A1's quiet controls: each module text must read no site. */
const QUIET_CONTROLS: readonly (readonly [string, string])[] = [
  ["approximate-count", 'const note = "only ~10 run at any moment";'],
  ["home-path", 'const home = "~/.pi/agent";'],
  ["tilde-alone", 'const tilde = "~";'],
  ["reference-word", "const evidenceRef = node.evidenceRefs[0];"],
  ["approximate-pattern", "const approximate = /~\\d+/;"],
  ["home-pattern", "const home = /^~(?=\\/|$)/;"],
  ["wide-pattern", "const anything = /\\S+/;"],
  ["other-constructor", 'const pattern = new RegExp("^pw-[0-9]+$");'],
];
/** The residuals' quiet rows (A1): each module text is a member of its family and reads no site. */
const RESIDUAL_CONTROLS: Readonly<Record<string, string>> = {
  "R-SPAN-WORD": "const part = body.slice(span.start, span.end);",
  "R-NAIVE-WALK": 'let node = document; for (const key of path.split("/").slice(1)) node = node[key];',
  "R-COMPOSED": 'const escaped = "~" + "1"; const pattern = new RegExp("~" + "[01]");',
};
/** The residual's quiet row (A3): a module text that loads RI under a name it never spells reads no site. */
const RI_RESIDUAL_CONTROLS: Readonly<Record<string, string>> = {
  "R-RI-UNNAMED": 'spawn("python3", ["-m", ["reactive", "inference"].join("_")]);',
};
const RESIDUAL_FAMILIES: readonly string[] = ["R-SPAN-WORD", "R-NAIVE-WALK", "R-COMPOSED", "R-REASON", "R-RI-UNNAMED"];
const RESIDUAL_ROWS: Readonly<Record<string, string>> = { "R-SPAN-WORD": "A1", "R-NAIVE-WALK": "A1", "R-COMPOSED": "A1", "R-REASON": "C5", "R-RI-UNNAMED": "A3" };
/** A2: each provider's own node type in src (claude-topology.ts :133, furnace-observer.ts :148, forge-operation-observer.ts :87, the
 * rf observer's preview node), so a served loader's shape check is the only guard a reference meets; a provider without one fails A2. */
const NODE_TYPES: Readonly<Record<string, string>> = { reactivefiber: "context-preview", "claude-agent-sdk": "session", furnace: "run", forge: "operation" };
/** A3: RI's package root in any spelling a package name, a specifier, a spawn argument or a dotted module path takes. */
const RI_PACKAGE = /reactive[-_./]?inference/i;
/** A3's controls (wb-48r6 F4): each module text must name RI's root as a literal at least once (flagged) or never (quiet). */
const RI_FLAGGED_CONTROLS: readonly (readonly [string, string])[] = [
  ["python-argv", 'spawn("python3", ["-m", "reactive_inference"]);'],
  ["resolved-name", 'const entry = createRequire(import.meta.url).resolve("reactive-inference");'],
  ["dotted-module", 'const module = "reactive_inference.contracts";'],
  ["dynamic-specifier", 'const sdk = await import("reactive-inference");'],
];
const RI_QUIET_CONTROLS: readonly (readonly [string, string])[] = [
  ["other-python-module", 'spawn("python3", ["-m", "json.tool"]);'],
  ["fiber-package", 'const sdk = await import("@reactive-fiber/sdk");'],
];
/** A2 (wb-48r6 F5): docs/20 is read by section: its mapping table under one heading, its refusal rules under another. */
const DOCS20_MAPPING = "## Producer mapping";
const DOCS20_RULES = "## Refusal and freshness rules";
const DOCS20_RULE = "Unknown producer or ref kind: no-loader, ref stays listed sanitized.";
/** C3 (wb-48r6 F1): the module bindings that hold a snapshot document; no use rule names one, so read() and the held basis's counted
 * getter are a rule's only paths to a snapshot. */
const SNAPSHOT_HOLDERS = /\b(?:SNAPSHOT_DOCUMENT|MOVED_DOCUMENT|BASES|FIXTURE|ROSTER|resourceOf|placed)\b/;
/** The gate probes the follow-up's lead line names, each with the use mutant C3 reads for it (wb-48r6 F1, F2). */
const GATE_PROBES: Readonly<Record<string, string>> = { G07: "peek-first" };
/** A3: a name that would be a result, reference, pointer or span type among the module's exports. */
const RESULT_NAME = /result|reference|pointer|span|envelope/i;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(c) today: no Pi surface dereferences a decision-emitted reference (census = 0 sites at this read); the trigger, no emitted references reach Pi today: no src module evaluates or names a pointer outside the judged glyph sites, the host-wired evidence store has no loader for any reference form under any provider, and the gating envelope is measured unshipped at the pin and at a later probe",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(a) adoption fixture: an emitted reference carries the producer's snapshot digest; use against a basis with a different digest is refused as stale (typed), never dereferenced: armed on a test-side reference adoption through the real evidence store, beside today's rf seams, which carry such a reference byte for byte and dereference nothing",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label:
      "(b) mutant: dereferencing without the digest comparison, or against the current snapshot when digests differ, fails: the judge refuses each such use and every other escape through the real evidence store, and the rf checker refuses every adapter mutant that dereferences, adopts or rewrites the reference",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
];

// ---------------------------------------------------------------------------------------------------------------------------
// The constructed fixture.

interface EmittedReference {
  readonly kind: "pointer" | "extractive_span";
  readonly pointer: string;
  readonly start?: number;
  readonly end?: number;
  readonly snapshot_digest: string;
}
interface FixtureReference {
  readonly id: string;
  readonly reference: EmittedReference;
  readonly target: string;
}
interface Basis {
  readonly id: string;
  readonly digest: string;
  readonly document: JsonObject;
}

/** The producer's snapshot digest, in the request contract's form (64 lowercase hex); stated by the producer, never computed here. */
const PRODUCER_DIGEST = "c4f1a9e07b3d5268e19f0a7c4b2d6e8f31a5c7e9b0d2f4a6c8e1b3d5f7092a4c";
const MOVED_DIGEST = "7e2b9d4f61a8c03e5b7d9f1a2c4e6b8d0f3a5c7e9b1d3f5a7c9e2b4d6f8a0c1e";
const SNAPSHOT_DOCUMENT: JsonObject = {
  observations: [
    { name: "ticket", value: { title: "ref-target-title-1f7c", body: "triage ref-target-span-6a2e done" } },
    { name: "paths", value: { "src/a~b": "ref-target-escaped-9d41" } },
  ],
};
const MOVED_DOCUMENT: JsonObject = {
  observations: [
    { name: "ticket", value: { title: "moved-target-title-3b90", body: "triage moved-target-span-58c1 done" } },
    { name: "paths", value: { "src/a~b": "moved-target-escaped-27fd" } },
  ],
};
const REFERENCES: readonly FixtureReference[] = [
  { id: "pointer", reference: { kind: "pointer", pointer: "/observations/0/value/title", snapshot_digest: PRODUCER_DIGEST }, target: "ref-target-title-1f7c" },
  { id: "escaped-pointer", reference: { kind: "pointer", pointer: "/observations/1/value/src~1a~0b", snapshot_digest: PRODUCER_DIGEST }, target: "ref-target-escaped-9d41" },
  {
    id: "extractive-span",
    reference: { kind: "extractive_span", pointer: "/observations/0/value/body", start: 7, end: 27, snapshot_digest: PRODUCER_DIGEST },
    target: "ref-target-span-6a2e",
  },
];
const lastNibble = (digest: string): string => `${digest.slice(0, -1)}${digest.endsWith("c") ? "d" : "c"}`;
/** The producer's own basis first, then the four stale ones: each holds the moved snapshot under a digest that differs as a string. */
const BASES: readonly Basis[] = [
  { id: "producer", digest: PRODUCER_DIGEST, document: SNAPSHOT_DOCUMENT },
  { id: "moved", digest: MOVED_DIGEST, document: MOVED_DOCUMENT },
  { id: "case-folded", digest: PRODUCER_DIGEST.toUpperCase(), document: MOVED_DOCUMENT },
  { id: "short-id", digest: PRODUCER_DIGEST.slice(0, 12), document: MOVED_DOCUMENT },
  { id: "last-nibble", digest: lastNibble(PRODUCER_DIGEST), document: MOVED_DOCUMENT },
];
const STALE_BASES: readonly string[] = ["moved", "case-folded", "short-id", "last-nibble"];
const MARKS: readonly string[] = ["ref-target-", "moved-target-"];
const RESOURCE_TAG = "ri.decision-result/constructed-0";
const RESOURCE_SCHEMA_VERSION = "ri-decision-envelope/constructed-0";
const TWINS: readonly string[] = ["bound", "moved"];
interface Placement {
  readonly id: string;
  readonly path: readonly string[];
}
/** wb-tz4r.1's top and block placements; its component placement needs a rendering component row the landed carrier lacks. */
const PLACEMENTS: readonly Placement[] = [
  { id: "top", path: ["result", "resources"] },
  { id: "block", path: ["result", "blocks", "0", "resources"] },
];
const RF_ROOT = "/fixture/rf-workspace";
const RF_PROVIDER = "reactivefiber";
const RF_GRANT = "reactivefiber:render";
const PREVIEW_ID = "reactivefiber.render.preview";
const CAPTURED_AT = "2026-10-23T00:00:00Z";
const SCOPE: ObservationScope = { workspace: RF_ROOT, principal: "census-principal" };

/** A decision resource carrying the three references, beside the snapshot they are bound to (bound) or the moved one (moved). */
function resourceOf(twin: string): JsonObject {
  const bound = twin === "bound";
  return json({
    tag: RESOURCE_TAG,
    schema_version: RESOURCE_SCHEMA_VERSION,
    snapshot_digest: bound ? PRODUCER_DIGEST : MOVED_DIGEST,
    observations: (bound ? SNAPSHOT_DOCUMENT : MOVED_DOCUMENT).observations ?? [],
    references: REFERENCES.map(entry => entry.reference),
  }) as JsonObject;
}

// ---------------------------------------------------------------------------------------------------------------------------
// JSON helpers.

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: unknown, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value as JsonObject;
}
/** Canonical JSON: object keys sorted at every depth. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (isObject(value)) return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value) ?? "null";
}
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
/** Every string in a JSON tree, keys included. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.entries(value).flatMap(([key, entry]) => [key, ...stringLeaves(entry)]);
  return [];
}
function setAt(target: JsonValue, path: readonly string[], value: JsonValue): void {
  let node: JsonValue = target;
  for (const key of path.slice(0, -1)) {
    const next: JsonValue | undefined = Array.isArray(node) ? node[Number(key)] : isObject(node) ? (node as JsonObject)[key] : undefined;
    if (next === undefined) throw new Error(`no ${key} on the path ${path.join(".")}`);
    node = next;
  }
  const last = path[path.length - 1] ?? "";
  if (!isObject(node)) throw new Error(`the path ${path.join(".")} ends below a non-object`);
  (node as JsonObject)[last] = value;
}

/** RFC 6901 evaluation over the fixture's own documents: the test's reading of a pointer, never Pi's. */
function evaluate(document: JsonValue, pointer: string): JsonValue | undefined {
  if (pointer === "") return document;
  if (!pointer.startsWith("/")) return undefined;
  let node: JsonValue | undefined = document;
  for (const raw of pointer.slice(1).split("/")) {
    const token = raw.replaceAll("~1", "/").replaceAll("~0", "~");
    if (Array.isArray(node)) node = /^(?:0|[1-9][0-9]*)$/.test(token) ? node[Number(token)] : undefined;
    else if (isObject(node)) node = Object.hasOwn(node, token) ? (node as JsonObject)[token] : undefined;
    else node = undefined;
    if (node === undefined) return undefined;
  }
  return node;
}
/** The value a reference names in a document: the pointer's string, or the code points between the span's offsets. */
function dereference(document: JsonValue, reference: EmittedReference): string {
  const value = evaluate(document, reference.pointer);
  if (typeof value !== "string") throw new Error(`${reference.pointer} names no string`);
  if (reference.kind === "pointer") return value;
  return [...value].slice(reference.start ?? 0, reference.end ?? 0).join("");
}
function referenceOf(evidenceRef: string): EmittedReference | undefined {
  return REFERENCES.find(entry => canonical(entry.reference) === evidenceRef)?.reference;
}
const targetOf = (id: string): string => REFERENCES.find(entry => entry.id === id)?.target ?? "";

// ---------------------------------------------------------------------------------------------------------------------------
// The roster.

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface ProducerLine {
  readonly line: number;
  readonly text: string;
}
interface ProducerFile {
  readonly path: string;
  readonly blobAtPin: string;
  readonly blobAtProbe: string;
  readonly lines: readonly ProducerLine[];
}
interface Producer {
  readonly repo: string;
  readonly pin: string;
  readonly probe: string;
  readonly files: readonly ProducerFile[];
  readonly exportsAtPin: readonly string[];
  readonly exportsAtProbe: readonly string[];
  readonly srcProbe: { readonly pattern: string; readonly rowsAtPin: number; readonly rowsAtProbe: number };
  readonly digestRowsAtPin: readonly string[];
  readonly digestRowsAtProbe: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly producer: Producer;
  readonly scan: JsonObject;
  readonly fixture: JsonObject;
  readonly residuals: readonly string[];
  readonly residualRows: JsonObject;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly counted: readonly string[];
}

function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function producerOf(value: unknown): Producer {
  if (!isObject(value) || !Array.isArray(value.files) || !isObject(value.srcProbe)) throw new Error("roster producer needs files and a srcProbe");
  const files = value.files.map((entry: unknown, index: number): ProducerFile => {
    const at = `producer.files[${index}]`;
    if (!isObject(entry) || !Array.isArray(entry.lines)) throw new Error(`roster ${at} needs lines`);
    const lines = entry.lines.map((line: unknown, position: number): ProducerLine => {
      if (!isObject(line) || typeof line.line !== "number" || typeof line.text !== "string") throw new Error(`roster ${at}.lines[${position}] needs a line and a text`);
      return { line: line.line, text: line.text };
    });
    return { path: text(entry.path, `${at}.path`), blobAtPin: text(entry.blobAtPin, `${at}.blobAtPin`), blobAtProbe: text(entry.blobAtProbe, `${at}.blobAtProbe`), lines };
  });
  return {
    repo: text(value.repo, "producer.repo"),
    pin: text(value.pin, "producer.pin"),
    probe: text(value.probe, "producer.probe"),
    files,
    exportsAtPin: strings(value.exportsAtPin, "producer.exportsAtPin"),
    exportsAtProbe: strings(value.exportsAtProbe, "producer.exportsAtProbe"),
    srcProbe: {
      pattern: text(value.srcProbe.pattern, "producer.srcProbe.pattern"),
      rowsAtPin: count(value.srcProbe.rowsAtPin, "producer.srcProbe.rowsAtPin"),
      rowsAtProbe: count(value.srcProbe.rowsAtProbe, "producer.srcProbe.rowsAtProbe"),
    },
    digestRowsAtPin: strings(value.digestRowsAtPin, "producer.digestRowsAtPin"),
    digestRowsAtProbe: strings(value.digestRowsAtProbe, "producer.digestRowsAtProbe"),
  };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.scan) || !isObject(raw.fixture) || !isObject(raw.residualRows)) {
    throw new Error("roster needs rows, scan, fixture and residualRows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    producer: producerOf(raw.producer),
    scan: json(raw.scan) as JsonObject,
    fixture: json(raw.fixture) as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    residualRows: json(raw.residualRows) as JsonObject,
    rows,
    tests: strings(raw.tests, "tests"),
    counted: strings(raw.counted, "counted"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerFile(suffix: string): ProducerFile {
  const found = ROSTER.producer.files.find(entry => entry.path.endsWith(suffix));
  if (found === undefined) throw new Error(`the roster holds no producer file ${suffix}`);
  return found;
}
function producerLine(suffix: string, line: number): string {
  const found = producerFile(suffix).lines.find(entry => entry.line === line);
  if (found === undefined) throw new Error(`the roster holds no ${suffix} line ${line}`);
  return found.text;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** A row of the tracked bead export (the owner filing's by default), found by id on a line that parses. */
function readBeadRow(id: string = BEAD): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${id}`);
}
/** One line of a row's notes, the first found by its opening words; a later note is never read. */
function noteLine(notes: string, opening: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(opening));
  if (line === undefined) throw new Error(`the notes carry no "${opening}" line`);
  return line;
}
/** The cut's landed delivery note in the wb-tz4r.6 row, as written at landing 318 (wb-48r6 F2): which rows its WHAT IT PINS
 * paragraphs name and the pins each names, A1's escape tokens and reference word family, and each residual's pin. Every value is read
 * off the note's own words, never off a census list, so a hollow of the census and its roster leaves the note's reading whole. */
interface LandedNote {
  readonly rows: Readonly<Record<string, { readonly clause: string; readonly pins: readonly string[] }>>;
  readonly escapeTokens: readonly string[];
  readonly wordFamily: readonly string[];
  readonly residuals: Readonly<Record<string, string>>;
}
function landedNote(notes: string): LandedNote {
  const lines = notes.split("\n");
  const rows: Record<string, { clause: string; pins: string[] }> = {};
  for (const line of lines) {
    const head = /^([A-Z]), clause \(([a-z])\)/.exec(line);
    const id = head?.[1] ?? "";
    if (head === null || Object.hasOwn(rows, id)) continue;
    rows[id] = { clause: head[2] ?? "", pins: [...new Set(line.match(new RegExp(`\\b${id}[1-9]\\b`, "g")) ?? [])] };
  }
  const listed = (pattern: RegExp, separator: string): string[] => {
    const line = lines.find(entry => pattern.test(entry)) ?? "";
    return pattern.exec(line)?.[1]?.split(separator) ?? [];
  };
  const residuals: Record<string, string> = {};
  const opening = "RESIDUALS (named, each with a pinned quiet row): ";
  for (const part of noteLine(notes, opening).slice(opening.length).replace(/\.$/, "").split("; ")) {
    const parsed = /^(.+?) \(([A-Z][1-9]) /.exec(part);
    for (const name of parsed?.[1]?.split(", ") ?? []) residuals[name] = parsed?.[2] ?? "";
  }
  return {
    rows,
    escapeTokens: listed(/an RFC 6901 escape token \(([^)]*)\)/, ", "),
    wordFamily: listed(/the reference word family \(([^)]*)\)/, "|"),
    residuals,
  };
}
/** The filing's acceptance clauses: its "Acceptance: " line, split before each "(x) ", the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

// ---------------------------------------------------------------------------------------------------------------------------
// A1: the src census.

function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
/** Every regular file below src/, in name order, repository-relative; a symlink is recorded and never followed. */
function srcFiles(): { files: string[]; symlinks: string[] } {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (directory: string, relative: string): void => {
    const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = `${relative}/${entry.name}`;
      if (entry.isSymbolicLink()) symlinks.push(path);
      else if (entry.isDirectory()) visit(join(directory, entry.name), path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit(join(REPO, "src"), "src");
  return { files, symlinks };
}
/** Every path below src/ git lists, tracked or untracked and not ignored, sorted (wb-48r6 F6): the walk's outside anchor. */
function listedSrc(): string[] {
  return execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 })
    .split("\0")
    .filter(Boolean)
    .sort();
}
/** How a walk agrees with git's listing: the paths only the walk reads and the paths only git lists. */
function walkAgreement(walked: readonly string[]): { walkOnly: string[]; gitOnly: string[] } {
  const listed = listedSrc();
  const read = new Set(walked);
  return { walkOnly: walked.filter(path => !listed.includes(path)).sort(), gitOnly: listed.filter(path => !read.has(path)) };
}
/** A name or a text as the family reads it: camelCase split, lower-cased, every other character a space. */
function words(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");
}
function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
interface ModuleScan {
  /** Family identifiers, `<path> <identifier>`, once each. */
  readonly identifiers: string[];
  /** Family literals and patterns, `<path>:<line> <kind> <text>`. */
  readonly literals: string[];
  /** RFC 6901 escape tokens, `<path>:<line> <kind> <text>`. */
  readonly escapes: string[];
}
/** A1: whether a pattern carries an escape token: its source spells one (ESCAPE_IN_PATTERN), or, compiled, it matches an escape
 * token and none of ESCAPE_CONTROLS, so capture groups, alternations, classes and character escapes are read by what they match
 * (wb-48r6 F3). A source that does not compile is read by its spelling alone. */
function escapePattern(source: string, flags: string): boolean {
  if (ESCAPE_IN_PATTERN.test(source)) return true;
  let pattern: RegExp;
  try {
    pattern = new RegExp(source, flags.replace(/[gy]/g, ""));
  } catch {
    return false;
  }
  return ESCAPE_TOKENS.some(token => pattern.test(token)) && !ESCAPE_CONTROLS.some(control => pattern.test(control));
}
/** A RegExp constructor's literal pattern and flags (a string or a template without substitutions), or undefined for any other call. */
function constructedPattern(node: ts.Node): { readonly source: string; readonly flags: string } | undefined {
  if (!(ts.isNewExpression(node) || ts.isCallExpression(node)) || !ts.isIdentifier(node.expression) || node.expression.text !== "RegExp") return undefined;
  const [source, flags] = node.arguments ?? [];
  if (source === undefined || !(ts.isStringLiteral(source) || ts.isNoSubstitutionTemplateLiteral(source))) return undefined;
  return { source: source.text, flags: flags !== undefined && (ts.isStringLiteral(flags) || ts.isNoSubstitutionTemplateLiteral(flags)) ? flags.text : "" };
}
/** One module, parsed under its own script kind: its identifiers, string and template parts and regular expressions. Comments are
 * never read: a comment dereferences nothing. */
function scanModule(path: string, source: string): ModuleScan {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const identifiers = new Set<string>();
  const literals: string[] = [];
  const escapes: string[] = [];
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      if (REFERENCE_WORD.test(words(node.text))) identifiers.add(`${path} ${node.text}`);
    } else if (ts.isRegularExpressionLiteral(node)) {
      const close = node.text.lastIndexOf("/");
      if (escapePattern(node.text.slice(1, close), node.text.slice(close + 1))) escapes.push(`${path}:${line(node)} pattern ${node.text}`);
      if (REFERENCE_WORD.test(words(node.text))) literals.push(`${path}:${line(node)} pattern ${node.text}`);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (ESCAPE_TOKENS.includes(node.text)) escapes.push(`${path}:${line(node)} literal ${JSON.stringify(node.text)}`);
      if (REFERENCE_WORD.test(words(node.text))) literals.push(`${path}:${line(node)} literal ${JSON.stringify(node.text)}`);
    }
    const constructed = constructedPattern(node);
    if (constructed !== undefined && escapePattern(constructed.source, constructed.flags)) escapes.push(`${path}:${line(node)} constructed ${JSON.stringify(constructed.source)}`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { identifiers: [...identifiers], literals, escapes };
}
const sitesOf = (scan: ModuleScan): number => scan.identifiers.length + scan.literals.length + scan.escapes.length;
const controlSites = (source: string): number => sitesOf(scanModule("control.ts", source));

/** The package names package.json declares, across every dependency list. */
function declaredPackages(): string[] {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  const names: string[] = [];
  for (const list of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    const entries = manifest[list];
    if (isObject(entries)) names.push(...Object.keys(entries));
  }
  return names;
}
/** A3 (wb-48r6 F4): every string, template part and pattern of a module that names RI's package root, `<path>:<line> <text>`: a spawn
 * argument, a resolved name or a dotted module path names the root as a literal where no load specifier does. Comments are never read. */
function riLiteralsOf(path: string, source: string): string[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    const literal = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node);
    if (literal && RI_PACKAGE.test(node.text)) found.push(`${path}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1} ${JSON.stringify(node.text)}`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** A2 (wb-48r6 F5): the lines of one section of a markdown page, below its heading and up to the next heading of level one or two; a
 * heading that is absent or repeated reads null. */
function sectionOf(page: string, heading: string): string[] | null {
  const lines = page.split("\n");
  const starts = lines.flatMap((line, index) => (line === heading ? [index] : []));
  if (starts.length !== 1) return null;
  const start = (starts[0] ?? 0) + 1;
  const next = lines.findIndex((line, index) => index >= start && /^#{1,2} /.test(line));
  return lines.slice(start, next === -1 ? lines.length : next);
}
/** Every load specifier of a src module: import, export, import type, dynamic import and require. */
function specifiersOf(path: string, source: string): string[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: string[] = [];
  const load = (node: ts.Node | undefined): void => {
    if (node !== undefined && ts.isStringLiteralLike(node)) found.push(node.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) load(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

// ---------------------------------------------------------------------------------------------------------------------------
// B and C: the use, the reference adoption, its mutants and the judge.

/** What a use rule holds of the host's basis (wb-48r6 F1): its id and digest, and its document only through a getter that counts as
 * one snapshot read each time it is touched, so read() and the getter are the two paths to the snapshot and the judge counts both. */
interface HeldBasis {
  readonly id: string;
  readonly digest: string;
  readonly document: JsonValue;
}
/** One use rule: what an adopting loader does with a reference, the basis the host holds, and the one way to read the snapshot. */
type UseRule = (reference: EmittedReference, basis: HeldBasis, read: () => JsonValue) => EvidenceContent;
/** The basis as a rule holds it: every touch of its document is a counted read. */
function heldBasis(basis: Basis, read: () => JsonValue): HeldBasis {
  return Object.freeze({
    id: basis.id,
    digest: basis.digest,
    get document(): JsonValue {
      return read();
    },
  });
}
const contentOf = (value: string, sourceBasis: string, freshness: "current" | "stale"): EvidenceContent => ({
  kind: "ri.emitted-reference/constructed-0",
  provider: RF_PROVIDER,
  capturedAt: CAPTURED_AT,
  bytes: Buffer.byteLength(value),
  truncated: false,
  preview: [value],
  sourceBasis,
  freshness,
});
/** THE REFERENCE ADOPTION: compare the producer's digest to the basis byte for byte, refuse a mismatch typed before any read. */
const REFERENCE_ADOPTION: UseRule = (reference, basis, read) => {
  if (reference.snapshot_digest !== basis.digest) throw new EvidenceRefusal("transport", "stale");
  return contentOf(dereference(read(), reference), reference.snapshot_digest, "current");
};
const looselySame = (left: string, right: string): boolean => left.toLowerCase().slice(0, 12) === right.toLowerCase().slice(0, 12);
/** The escapes (b) names and the others C3 reads, each one edit away from the reference adoption. */
const USE_MUTANTS: Readonly<Record<string, UseRule>> = {
  unchecked: (reference, _basis, read) => contentOf(dereference(read(), reference), reference.snapshot_digest, "current"),
  rebound: (reference, basis, read) =>
    reference.snapshot_digest === basis.digest
      ? contentOf(dereference(read(), reference), reference.snapshot_digest, "current")
      : contentOf(dereference(read(), reference), basis.digest, "stale"),
  lenient: (reference, basis, read) => {
    if (!looselySame(reference.snapshot_digest, basis.digest)) throw new EvidenceRefusal("transport", "stale");
    return contentOf(dereference(read(), reference), reference.snapshot_digest, "current");
  },
  "read-first": (reference, basis, read) => {
    const document = read();
    if (reference.snapshot_digest !== basis.digest) throw new EvidenceRefusal("transport", "stale");
    return contentOf(dereference(document, reference), reference.snapshot_digest, "current");
  },
  untyped: (reference, basis, read) => {
    if (reference.snapshot_digest !== basis.digest) throw new Error("the snapshot moved");
    return contentOf(dereference(read(), reference), reference.snapshot_digest, "current");
  },
  minted: (reference, _basis, read) => {
    const document = read();
    if (sha256(canonical(document)) !== reference.snapshot_digest) throw new EvidenceRefusal("transport", "stale");
    return contentOf(dereference(document, reference), reference.snapshot_digest, "current");
  },
  /** The gate's G07 (wb-48r6 F1): the snapshot dereferenced through the basis handle before the comparison, read() only after it. */
  "peek-first": (reference, basis, read) => {
    const value = dereference(basis.document, reference);
    if (reference.snapshot_digest !== basis.digest) throw new EvidenceRefusal("transport", "stale");
    read();
    return contentOf(value, reference.snapshot_digest, "current");
  },
};
/** R-REASON's quiet row: a typed stale under another reason word. */
const OTHER_REASON: UseRule = (reference, basis, read) => {
  if (reference.snapshot_digest !== basis.digest) throw new EvidenceRefusal("unauthorized", "stale");
  return contentOf(dereference(read(), reference), reference.snapshot_digest, "current");
};

const RF_NODE: NativeRef = { provider: RF_PROVIDER, type: "context-preview", id: `rfo_${"a".repeat(22)}`, scope: RF_ROOT };
function entryView(entry: EvidenceEntry): JsonObject {
  if (entry.state !== "loaded") return json(entry) as JsonObject;
  return json({ state: entry.state, kind: entry.kind, freshness: entry.freshness, sourceBasis: entry.sourceBasis ?? null, preview: entry.preview, truncated: entry.truncated }) as JsonObject;
}
interface UseReading {
  readonly reference: string;
  readonly basis: string;
  readonly entry: JsonObject;
  readonly reads: number;
}
/** Every reference used at every basis under one rule, each basis through its own real EvidenceStore; reads counts snapshot reads,
 * through read() and through the held basis's document alike. */
async function usesOf(rule: UseRule): Promise<UseReading[]> {
  const readings: UseReading[] = [];
  for (const basis of BASES) {
    const reads = new Map<string, number>();
    const loader: EvidenceLoader = {
      provider: RF_PROVIDER,
      requiredGrant: RF_GRANT,
      canLoad: ref => referenceOf(ref) !== undefined,
      load: async request => {
        const reference = referenceOf(request.evidenceRef);
        if (reference === undefined) throw new EvidenceRefusal("no-loader");
        const read = (): JsonValue => {
          reads.set(request.evidenceRef, (reads.get(request.evidenceRef) ?? 0) + 1);
          return json(basis.document);
        };
        return rule(reference, heldBasis(basis, read), read);
      },
    };
    const store = new EvidenceStore({ loaders: [loader], maxEntries: 8, maxBytes: 4096, timeoutMs: 30_000, scope: SCOPE });
    for (const entry of REFERENCES) {
      const ref = canonical(entry.reference);
      await store.request(SCOPE, RF_NODE, ref);
      readings.push({ reference: entry.id, basis: basis.id, entry: entryView(store.get(SCOPE, RF_NODE, ref)), reads: reads.get(ref) ?? 0 });
    }
  }
  return readings;
}
/** THE JUDGE: the codes a set of uses breaks. A fresh use loads its target once under the producer's digest; a stale use reads
 * nothing and settles a typed stale refusal. */
function useViolations(readings: readonly UseReading[]): string[] {
  const codes = new Set<string>();
  for (const reading of readings) {
    if (reading.basis === "producer") {
      if (reading.entry.state !== "loaded") codes.add("fresh-refused");
      else {
        if (canonical(reading.entry.preview) !== canonical([targetOf(reading.reference)])) codes.add("fresh-value");
        if (reading.entry.sourceBasis !== PRODUCER_DIGEST) codes.add("fresh-basis");
      }
      continue;
    }
    if (reading.reads > 0) codes.add(`read:${reading.basis}`);
    if (reading.entry.state === "loaded") {
      codes.add(`loaded:${reading.basis}`);
      if (reading.entry.freshness !== "stale") codes.add(`labelled-current:${reading.basis}`);
    } else if (reading.entry.freshness !== "stale") codes.add(`untyped:${reading.basis}`);
  }
  return [...codes].sort();
}

// ---------------------------------------------------------------------------------------------------------------------------
// B4 and C4: today's rf seams.

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
/** A stand-in `rf` first on PATH: every spawn appends its JSON argv line to the returned log and prints `answer`. */
function standInRf(answer: JsonValue): string {
  const folder = makeScratch("ri-emitted-reference-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
const spawnCount = (log: string): number => readFileSync(log, "utf8").split("\n").filter(Boolean).length;
const invocation = (): { grants: string[]; signal: AbortSignal } => ({ grants: [RF_GRANT], signal: new AbortController().signal });
const contextFor = (seam: ReactiveFiberSeam): ReactiveFiberTopologyContext => ({ scope: SCOPE, seam, capturedAt: CAPTURED_AT, observedAt: CAPTURED_AT });
const project = (reading: JsonValue, seam: ReactiveFiberSeam): JsonObject => objectOf(json(reactivefiberTopology(reading, contextFor(seam))), `${seam} topology`);
/** What one seam made of one handed envelope: the reading, the adapter's projection of it and how often the reader ran. */
interface Carry {
  readonly seam: ReactiveFiberSeam;
  readonly handed: JsonObject;
  readonly reading: JsonObject;
  readonly topology: JsonObject;
  readonly runs: number;
}
async function nativeCarry(handed: JsonObject): Promise<Carry> {
  const log = standInRf(handed);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, RF_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocation()), "native reading");
  return { seam: "rf-cli", handed, reading, topology: project(reading, "rf-cli"), runs: spawnCount(log) };
}
async function injectedCarry(handed: JsonObject): Promise<Carry> {
  const given = json(handed);
  let runs = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      runs += 1;
      return given as unknown as Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
    },
    RF_ROOT,
  );
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocation()), "injected reading");
  return { seam: "injected-fixture", handed, reading, topology: project(reading, "injected-fixture"), runs };
}
const carrier = (): JsonObject => objectOf(json(fullShapeRf(RF_ROOT)), "carrier");
/** The carrier with the twin's resource at the placement; the carrier itself is never touched. */
function placed(placement: Placement, twin: string): JsonObject {
  const copy = carrier();
  setAt(copy, placement.path, [resourceOf(twin)]);
  return copy;
}
function evidenceRefsOf(topology: JsonObject): string[] {
  const snapshots = Array.isArray(topology.snapshots) ? topology.snapshots : [];
  return snapshots.flatMap(snapshot => (isObject(snapshot) ? stringLeaves(snapshot.evidenceRefs) : []));
}
/** THE rf CHECKER: the codes one carry breaks against the carrier's carry under the same seam. */
function rfViolations(carry: Carry, base: Carry): string[] {
  const codes: string[] = [];
  if (canonical(carry.reading.source) !== canonical(carry.handed)) codes.push("rewritten:reading");
  if (canonical(carry.topology) !== canonical(base.topology)) codes.push("moved:projection");
  const shown = stringLeaves(carry.topology);
  if (shown.some(value => MARKS.some(mark => value.includes(mark)))) codes.push("surfaced:target");
  if (shown.some(value => value.includes(PRODUCER_DIGEST) || value.includes(MOVED_DIGEST))) codes.push("adopted:digest");
  if (canonical(evidenceRefsOf(carry.topology)) !== canonical(evidenceRefsOf(base.topology))) codes.push("refs");
  return codes;
}
/** Mutants of one real carry: a projection mutant copies what it changes; a reading mutant is re-projected by the real adapter. */
function topologyMutant(carry: Carry, change: (topology: JsonObject, resource: JsonObject) => void): Carry {
  const topology = objectOf(json(carry.topology), "topology copy");
  const list = carry.reading.source !== undefined && isObject(carry.reading.source) ? (carry.reading.source as JsonObject).result : undefined;
  const resources = isObject(list) && Array.isArray(list.resources) ? list.resources : [];
  change(topology, objectOf(resources[0], "carried resource"));
  return { ...carry, topology };
}
function readingMutant(carry: Carry, change: (reading: JsonObject) => void): Carry {
  const reading = objectOf(json(carry.reading), "reading copy");
  change(reading);
  return { ...carry, reading, topology: project(reading, carry.seam) };
}
function firstSnapshot(topology: JsonObject): JsonObject {
  const snapshots = Array.isArray(topology.snapshots) ? topology.snapshots : [];
  return objectOf(snapshots[0], "first snapshot");
}

// ---------------------------------------------------------------------------------------------------------------------------
// The cases.

const REACHED: string[] = [];
/** `${pin}:${assertions}` once a pin's witness compare held (wb-48r6 F7), held by the records case to the roster's counted list. */
const COUNTED: string[] = [];
function done(pin: string, witness: object): JsonValue {
  REACHED.push(pin);
  return json(witness);
}

const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const { files, symlinks } = srcFiles();
    const modules = files.filter(path => MODULE_EXTENSIONS.includes(extensionOf(path)));
    const scans = modules.map(path => scanModule(path, readFileSync(join(REPO, path), "utf8")));
    const identifiers = scans.flatMap(scan => scan.identifiers).sort();
    const literals = scans.flatMap(scan => scan.literals);
    const escapes = scans.flatMap(scan => scan.escapes);
    const packages = declaredPackages().filter(name => REFERENCE_WORD.test(words(name)));
    const flagged = Object.fromEntries(FLAGGED_CONTROLS.map(([id, source]) => [id, controlSites(source) > 0]));
    const quiet = Object.fromEntries(QUIET_CONTROLS.map(([id, source]) => [id, controlSites(source)]));
    const residualQuiet = Object.fromEntries(Object.entries(RESIDUAL_CONTROLS).map(([family, source]) => [family, controlSites(source)]));
    const floors = { srcFiles: files.length >= FLOORS.srcFiles, srcModules: modules.length >= FLOORS.srcModules };
    const walk = walkAgreement([...files, ...symlinks]);
    expect(floors, "the walk reaches at least the floor of src files and modules").toStrictEqual({ srcFiles: true, srcModules: true });
    expect(walk, "the walk reads exactly the src paths git lists").toStrictEqual({ walkOnly: [], gitOnly: [] });
    expect(escapes, "no src literal is an RFC 6901 escape token and no pattern carries one").toEqual([]);
    expect(literals, "no src literal or pattern carries the reference word family").toEqual([]);
    expect(identifiers, "every family identifier in src is a judged glyph site, and every judged site is still read").toEqual(Object.keys(JUDGED_SITES).sort());
    expect(packages, "no declared package carries the reference word family").toEqual([]);
    expect(Object.values(flagged).every(Boolean), "every flagged control reads a site").toBe(true);
    expect(Object.values(quiet).every(sites => sites === 0), "every quiet control reads none").toBe(true);
    expect(Object.values(residualQuiet).every(sites => sites === 0), "every residual's member reads none").toBe(true);
    return done("A1", { floors, walk, symlinks, escapes, literals, identifiers, packages, controls: { flagged, quiet }, quiet: residualQuiet });
  },
  A2: async () => {
    const projection = new ObservationProjection();
    const baseline = project(json({ contract: "reactivefiber.render.preview/v1", workspaceRoot: RF_ROOT, source: carrier() }), "injected-fixture");
    const registry = new CapabilityRegistry();
    const invoke = vi.spyOn(registry, "invoke");
    const claudeRead = vi.fn(async (): Promise<never> => {
      throw new Error("no transcript read is expected for an emitted reference");
    });
    const furnaceClient = vi.fn((): never => {
      throw new Error("no furnace client is expected for an emitted reference");
    });
    const store = createWorkbenchEvidenceStore({
      grants: () => EVIDENCE_LOADER_ROWS.map(row => row.requiredGrant),
      scope: () => SCOPE,
      projection,
      cwd: () => RF_ROOT,
      registry: () => registry,
      claudeRead,
      furnaceClient,
      now: () => new Date(CAPTURED_AT),
    });
    const providers = [RF_PROVIDER, ...EVIDENCE_LOADER_ROWS.map(row => row.provider)];
    expect(providers.filter(provider => !Object.hasOwn(NODE_TYPES, provider)), "every provider has its own node type judged").toEqual([]);
    const forms = REFERENCES.flatMap(entry => [canonical(entry.reference), entry.reference.pointer, `${entry.reference.snapshot_digest}#${entry.reference.pointer}`]);
    const entries = new Set<string>();
    const routed = new Set<string>();
    for (const provider of providers) {
      for (const form of forms) {
        const ref: NativeRef = { ...RF_NODE, provider, type: NODE_TYPES[provider] ?? "unjudged" };
        const pending = store.request(SCOPE, ref, form);
        // Read at the request itself (wb-48r6 F8): a form no loader takes settles no-loader at once, while a loader that takes it
        // leaves it loading first, even one that then refuses it no-loader.
        routed.add(canonical(store.get(SCOPE, ref, form)));
        await pending;
        entries.add(canonical(store.get(SCOPE, ref, form)));
      }
    }
    const reads = { claude: claudeRead.mock.calls.length, furnace: furnaceClient.mock.calls.length, registry: invoke.mock.calls.length };
    const docs = readFileSync(join(REPO, DOCS20), "utf8");
    const table = (sectionOf(docs, DOCS20_MAPPING) ?? []).filter(line => line.startsWith("|"));
    const docs20 = {
      mapping: table.slice(2).map(line => line.split("|")[1]?.trim() ?? ""),
      anythingElse: table.some(line => /^\| anything else \| \S+ \| `unavailable: no-loader`, a visible unknown \| \S+ \|$/.test(line)),
      rules: (sectionOf(docs, DOCS20_RULES) ?? []).filter(line => line.trim() !== "").join(" ").split(/(?<=\.) +/).filter(Boolean),
      pointer: readFileSync(join(REPO, "src/workbench/evidence-loader.ts"), "utf8").includes("A reference is only a pointer"),
    };
    const noLoader = canonical({ state: "unavailable", reason: "no-loader" });
    expect([...routed], "no loader takes any form: each request settles no-loader at the request itself").toEqual([noLoader]);
    expect([...entries], "every form under every provider settles no-loader").toEqual([noLoader]);
    expect(reads, "no reader seam is called").toStrictEqual({ claude: 0, furnace: 0, registry: 0 });
    expect(
      { last: docs20.mapping[docs20.mapping.length - 1], anythingElse: docs20.anythingElse, first: docs20.rules[0], pointer: docs20.pointer },
      "docs/20's mapping table ends with its no-loader row and its refusal rules open with the no-loader rule",
    ).toStrictEqual({ last: "anything else", anythingElse: true, first: DOCS20_RULE, pointer: true });
    expect(evidenceRefsOf(baseline).some(ref => ref.startsWith("rf-")), "the rf node's own refs are rf's").toBe(true);
    return done("A2", { nodes: providers.map(provider => `${provider}/${NODE_TYPES[provider] ?? "unjudged"}`), forms: forms.length, requests: providers.length * forms.length, routed: [...routed], entries: [...entries], reads, docs20 });
  },
  A3: () => {
    const producer = ROSTER.producer;
    const bead = readBeadRow();
    const gating = noteLine(bead.notes, "Gating: ");
    const named = [...producer.exportsAtPin, ...producer.exportsAtProbe].filter(name => RESULT_NAME.test(name));
    const requestSide = [...producer.digestRowsAtPin, ...producer.digestRowsAtProbe].every(row => /\/(?:contracts|preflight)\.py:\d+:/.test(row));
    const modules = srcFiles().files.filter(path => MODULE_EXTENSIONS.includes(extensionOf(path)));
    const listedModules = listedSrc().filter(path => MODULE_EXTENSIONS.includes(extensionOf(path)));
    const sources = modules.map(path => [path, readFileSync(join(REPO, path), "utf8")] as const);
    const specifiers = sources.flatMap(([path, source]) => specifiersOf(path, source).filter(name => RI_PACKAGE.test(name)).map(name => `${path}: ${name}`));
    const literals = sources.flatMap(([path, source]) => riLiteralsOf(path, source));
    const packages = declaredPackages().filter(name => RI_PACKAGE.test(name));
    const controls = {
      flagged: Object.fromEntries(RI_FLAGGED_CONTROLS.map(([id, source]) => [id, riLiteralsOf("control.ts", source).length > 0])),
      quiet: Object.fromEntries(RI_QUIET_CONTROLS.map(([id, source]) => [id, riLiteralsOf("control.ts", source).length])),
    };
    const residualQuiet = Object.fromEntries(Object.entries(RI_RESIDUAL_CONTROLS).map(([family, source]) => [family, riLiteralsOf("control.ts", source).length]));
    const held = {
      exportsMatch: canonical([...producer.exportsAtPin].sort()) === canonical([...producer.exportsAtProbe].sort()),
      noResultExport: named.length === 0,
      noSrcRow: producer.srcProbe.rowsAtPin === 0 && producer.srcProbe.rowsAtProbe === 0,
      requestSideDigest: requestSide && producer.digestRowsAtPin.length > 0 && producer.digestRowsAtProbe.length > 0,
      shippedNo: gating.includes("Shipped: no"),
      dec03: gating.includes("RI-DEC-03 'RFC 6901 ... digests', 02-implementation.md:7") && producerLine("02-implementation.md", 7).startsWith("RI-DEC-03: ") && producerLine("02-implementation.md", 7).includes("RFC 6901"),
      dec07: gating.includes("RI-DEC-07 snapshot freshness, 02-implementation.md:15") && producerLine("02-implementation.md", 15).startsWith("RI-DEC-07: ") && producerLine("02-implementation.md", 15).endsWith("snapshot freshness."),
      outputFamily: gating.includes("pointer/extractive-span outputs, 01-contracts.md:7") && producerLine("01-contracts.md", 7).includes("pointer, extractive/generated spans"),
    };
    expect(held, "the gating envelope is measured unshipped and the filing's gating sentence agrees").toStrictEqual({
      exportsMatch: true, noResultExport: true, noSrcRow: true, requestSideDigest: true, shippedNo: true, dec03: true, dec07: true, outputFamily: true,
    });
    expect([...modules].sort(), "A3 reads every src module git lists").toEqual(listedModules);
    expect(
      { specifiers, literals, packages },
      "Pi declares no RI package and no src literal names its root: no load specifier, spawn argument, resolved name or dotted module path",
    ).toStrictEqual({ specifiers: [], literals: [], packages: [] });
    expect(Object.values(controls.flagged).every(Boolean), "every flagged control names the root").toBe(true);
    expect(Object.values(controls.quiet).every(sites => sites === 0), "every quiet control names none").toBe(true);
    expect(Object.values(residualQuiet).every(sites => sites === 0), "the residual's member names none").toBe(true);
    return done("A3", {
      held, exports: [...producer.exportsAtPin].sort(), srcProbe: producer.srcProbe, digestRows: [...producer.digestRowsAtPin], specifiers, literals, packages, controls, quiet: residualQuiet,
    });
  },
  B1: () => {
    const readings = REFERENCES.map(entry => ({
      id: entry.id,
      kind: entry.reference.kind,
      digestForm: /^[0-9a-f]{64}$/.test(entry.reference.snapshot_digest),
      bound: entry.reference.snapshot_digest === PRODUCER_DIGEST,
      resolves: dereference(SNAPSHOT_DOCUMENT, entry.reference),
      moved: dereference(MOVED_DOCUMENT, entry.reference),
    }));
    const escapedKey = evaluate(SNAPSHOT_DOCUMENT, "/observations/1/value") ?? null;
    const shown = stringLeaves(carrier());
    const carrierClean = !shown.some(value => MARKS.some(mark => value.includes(mark)) || value.includes(PRODUCER_DIGEST) || value.includes(MOVED_DIGEST));
    const bases = BASES.map(basis => ({ id: basis.id, digest: basis.digest, differs: basis.digest !== PRODUCER_DIGEST }));
    expect(readings.every(entry => entry.digestForm && entry.bound), "every reference carries the producer's digest in the request contract's form").toBe(true);
    expect(readings.map(entry => entry.resolves), "each target resolves in the producer's snapshot").toEqual(REFERENCES.map(entry => entry.target));
    expect(readings.every(entry => entry.moved.startsWith("moved-target-")), "each pointer resolves to another value in the moved snapshot").toBe(true);
    expect(producerLine("contracts.py", 69).includes("64 lowercase sha256 hex characters"), "the digest form is the request contract's").toBe(true);
    expect(carrierClean, "no mark and no fixture digest occurs in the carrier").toBe(true);
    expect(bases.filter(basis => basis.differs).map(basis => basis.id), "every stale basis differs as a string").toEqual([...STALE_BASES]);
    return done("B1", { readings, escapedKey, carrierClean, bases });
  },
  B2: async () => {
    const readings = (await usesOf(REFERENCE_ADOPTION)).filter(reading => reading.basis !== "producer");
    expect(readings.length, "every reference at every stale basis").toBe(REFERENCES.length * STALE_BASES.length);
    expect(readings.every(reading => reading.reads === 0), "the snapshot is never read").toBe(true);
    expect(new Set(readings.map(reading => canonical(reading.entry))), "every stale use settles one typed stale refusal").toEqual(new Set([canonical({ state: "unavailable", reason: "transport", freshness: "stale" })]));
    expect(useViolations(readings)).toEqual([]);
    return done("B2", { readings, violations: useViolations(readings) });
  },
  B3: async () => {
    const readings = (await usesOf(REFERENCE_ADOPTION)).filter(reading => reading.basis === "producer");
    expect(readings.map(reading => reading.entry.preview), "each fresh use loads its target").toEqual(REFERENCES.map(entry => [entry.target]));
    expect(readings.every(reading => reading.reads === 1 && reading.entry.sourceBasis === PRODUCER_DIGEST && reading.entry.freshness === "current"), "read once, under the producer's digest verbatim").toBe(true);
    expect(useViolations(readings)).toEqual([]);
    return done("B3", { readings, violations: useViolations(readings) });
  },
  B4: async () => {
    const base = { native: await nativeCarry(carrier()), injected: await injectedCarry(carrier()) };
    const carries: object[] = [];
    for (const placement of PLACEMENTS) {
      for (const twin of TWINS) {
        const handed = placed(placement, twin);
        for (const [name, carry] of [["native", await nativeCarry(handed)], ["injected", await injectedCarry(handed)]] as const) {
          const violations = rfViolations(carry, name === "native" ? base.native : base.injected);
          carries.push({ seam: carry.seam, placement: placement.id, twin, runs: carry.runs, violations });
        }
      }
    }
    expect([base.native.runs, base.injected.runs], "each seam's reader ran once for the carrier").toEqual([1, 1]);
    expect(carries.length).toBe(PLACEMENTS.length * TWINS.length * 2);
    expect(carries.every(entry => isObject(entry) && entry.runs === 1 && canonical(entry.violations) === "[]"), "every variant rides byte for byte and projects as the carrier does").toBe(true);
    return done("B4", { carrierRefs: evidenceRefsOf(base.injected.topology), carries });
  },
  C1: async () => {
    const codes = useViolations(await usesOf(USE_MUTANTS.unchecked ?? REFERENCE_ADOPTION));
    expect(codes, "the unchecked use dereferences every stale basis").toEqual(STALE_BASES.flatMap(id => [`labelled-current:${id}`, `loaded:${id}`, `read:${id}`]).sort());
    return done("C1", { unchecked: codes });
  },
  C2: async () => {
    const rebound = useViolations(await usesOf(USE_MUTANTS.rebound ?? REFERENCE_ADOPTION));
    const lenient = useViolations(await usesOf(USE_MUTANTS.lenient ?? REFERENCE_ADOPTION));
    expect(rebound, "re-bound to the current snapshot, labelled stale, still a dereference").toEqual(STALE_BASES.flatMap(id => [`loaded:${id}`, `read:${id}`]).sort());
    expect(lenient, "a lenient match dereferences every near-miss").toEqual(["case-folded", "short-id", "last-nibble"].flatMap(id => [`labelled-current:${id}`, `loaded:${id}`, `read:${id}`]).sort());
    return done("C2", { rebound, lenient });
  },
  C3: async () => {
    const readFirst = useViolations(await usesOf(USE_MUTANTS["read-first"] ?? REFERENCE_ADOPTION));
    const untyped = useViolations(await usesOf(USE_MUTANTS.untyped ?? REFERENCE_ADOPTION));
    const minted = useViolations(await usesOf(USE_MUTANTS.minted ?? REFERENCE_ADOPTION));
    const peekFirst = useViolations(await usesOf(USE_MUTANTS["peek-first"] ?? REFERENCE_ADOPTION));
    expect(readFirst, "reading before the comparison").toEqual(STALE_BASES.map(id => `read:${id}`).sort());
    expect(peekFirst, "dereferencing through the basis handle before the comparison is a read (G07)").toEqual(STALE_BASES.map(id => `read:${id}`).sort());
    expect(untyped, "an untyped refusal").toEqual(STALE_BASES.map(id => `untyped:${id}`).sort());
    expect(minted, "a Pi-minted digest refuses the producer's own snapshot").toEqual(["fresh-refused", ...STALE_BASES.map(id => `read:${id}`)].sort());
    // A rule reaches a snapshot only through read() or the held basis's counted getter (wb-48r6 F1): no rule names a module binding
    // that holds one, and a rule that does is read.
    const rules: readonly (readonly [string, UseRule])[] = [["adoption", REFERENCE_ADOPTION], ["other-reason", OTHER_REASON], ...Object.entries(USE_MUTANTS)];
    const holders = rules.filter(([, rule]) => SNAPSHOT_HOLDERS.test(String(rule))).map(([id]) => id);
    const holderControl = SNAPSHOT_HOLDERS.test(String((reference: EmittedReference): string => dereference(MOVED_DOCUMENT, reference)));
    expect({ holders, holderControl }, "no use rule names a binding that holds a snapshot, and one that does is read").toStrictEqual({ holders: [], holderControl: true });
    return done("C3", { "read-first": readFirst, untyped, minted, "peek-first": peekFirst, holders, holderControl });
  },
  C4: async () => {
    const base = await injectedCarry(carrier());
    const results: Record<string, Record<string, string[]>> = {};
    for (const twin of TWINS) {
      const carry = await injectedCarry(placed(PLACEMENTS[0] ?? { id: "top", path: ["result", "resources"] }, twin));
      const mutants: Record<string, Carry> = {
        "dereference-note": topologyMutant(carry, (topology, resource) => {
          const document = { observations: resource.observations ?? [] };
          const notes = Array.isArray(topology.diagnostics) ? topology.diagnostics : [];
          topology.diagnostics = [...notes, ...REFERENCES.map(entry => `reference ${entry.reference.pointer} = ${dereference(document, entry.reference)}`)];
        }),
        "digest-ref": topologyMutant(carry, (topology, resource) => {
          const snapshot = firstSnapshot(topology);
          snapshot.evidenceRefs = [...stringLeaves(snapshot.evidenceRefs), `ri-snapshot:${String(resource.snapshot_digest)}`];
        }),
        "digest-basis": topologyMutant(carry, (topology, resource) => {
          firstSnapshot(topology).sourceVersion = `sha256:${String(resource.snapshot_digest)}`;
        }),
        "rewritten-reading": readingMutant(carry, reading => {
          const result = objectOf(objectOf(reading.source, "source").result, "result");
          result.resources = [];
        }),
      };
      for (const [id, mutant] of Object.entries(mutants)) {
        results[id] = { ...(results[id] ?? {}), [twin]: rfViolations(mutant, base) };
      }
    }
    const expected = {
      "dereference-note": ["moved:projection", "surfaced:target"],
      "digest-ref": ["moved:projection", "adopted:digest", "refs"],
      "digest-basis": ["moved:projection", "adopted:digest"],
      "rewritten-reading": ["rewritten:reading"],
    };
    for (const [id, codes] of Object.entries(expected)) expect(results[id], id).toStrictEqual({ bound: codes, moved: codes });
    return done("C4", results);
  },
  C5: async () => {
    const adoption = useViolations(await usesOf(REFERENCE_ADOPTION));
    const otherReason = useViolations(await usesOf(OTHER_REASON));
    const carry = await injectedCarry(carrier());
    expect(adoption, "the reference adoption breaks nothing").toEqual([]);
    expect(otherReason, "a typed stale under another reason reads quiet (R-REASON)").toEqual([]);
    expect(rfViolations(carry, carry), "the checker reads the carrier against itself quiet").toEqual([]);
    return done("C5", { adoption, carrier: rfViolations(carry, carry), quiet: { "R-REASON": otherReason } });
  },
};

/** Every scan constant, as the roster holds it. */
const SCAN: JsonObject = json({
  referenceWord: `${REFERENCE_WORD.source}/${REFERENCE_WORD.flags}`,
  escapeTokens: ESCAPE_TOKENS,
  escapeInPattern: `${ESCAPE_IN_PATTERN.source}/${ESCAPE_IN_PATTERN.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  floors: FLOORS,
  judgedSites: JUDGED_SITES,
  flaggedControls: FLAGGED_CONTROLS,
  quietControls: QUIET_CONTROLS,
  residualControls: RESIDUAL_CONTROLS,
  nodeTypes: NODE_TYPES,
  riPackage: `${RI_PACKAGE.source}/${RI_PACKAGE.flags}`,
  resultName: `${RESULT_NAME.source}/${RESULT_NAME.flags}`,
  escapeControls: ESCAPE_CONTROLS,
  riFlaggedControls: RI_FLAGGED_CONTROLS,
  riQuietControls: RI_QUIET_CONTROLS,
  riResidualControls: RI_RESIDUAL_CONTROLS,
  docs20: { mapping: DOCS20_MAPPING, rules: DOCS20_RULES, rule: DOCS20_RULE },
  snapshotHolders: `${SNAPSHOT_HOLDERS.source}/${SNAPSHOT_HOLDERS.flags}`,
  gateProbes: GATE_PROBES,
  followUp: FOLLOW_UP,
}) as JsonObject;
/** The constructed fixture, as the roster holds it. */
const FIXTURE: JsonObject = json({
  producerDigest: PRODUCER_DIGEST,
  movedDigest: MOVED_DIGEST,
  snapshot: SNAPSHOT_DOCUMENT,
  moved: MOVED_DOCUMENT,
  references: REFERENCES,
  bases: BASES.map(basis => ({ id: basis.id, digest: basis.digest, document: basis.id === "producer" ? "snapshot" : "moved" })),
  staleBases: STALE_BASES,
  marks: MARKS,
  resource: { tag: RESOURCE_TAG, schemaVersion: RESOURCE_SCHEMA_VERSION, twins: TWINS },
  placements: PLACEMENTS,
  rf: { root: RF_ROOT, provider: RF_PROVIDER, grant: RF_GRANT, preview: PREVIEW_ID, node: RF_NODE },
}) as JsonObject;

/** A describe title: the row id and its label. */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("wb-tz4r.6 RI emitted-reference census (RI-UNIFIED-DECISION-INFERENCE-R6, absent-today leg and armed adoption contract)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:4", "C:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, scan: SCAN, fixture: FIXTURE, residuals: RESIDUAL_FAMILIES, residualRows: RESIDUAL_ROWS }).toStrictEqual({
      bead: ROSTER.bead, scan: ROSTER.scan, fixture: ROSTER.fixture, residuals: [...ROSTER.residuals], residualRows: ROSTER.residualRows,
    });
    expect(Object.keys(USE_MUTANTS), "every use mutant the C rows read").toEqual(["unchecked", "rebound", "lenient", "read-first", "untyped", "minted", "peek-first"]);
    expect(ROSTER.counted.map(entry => entry.slice(0, entry.indexOf(":"))), "the roster counts every pin once, in row order").toEqual(ROWS.flatMap(row => row.pins));
    // Every residual names a pin of the judged set, and that pin's roster witness carries its pinned quiet row.
    const quietRows = RESIDUAL_FAMILIES.map(family => {
      const pin = RESIDUAL_ROWS[family] ?? "";
      const witness = ROWS.some(row => row.pins.includes(pin)) ? rosterWitness(pin) : null;
      const quiet = isObject(witness) && isObject(witness.quiet) ? witness.quiet : undefined;
      return `${family}:${quiet !== undefined && Object.hasOwn(quiet, family)}`;
    });
    expect(quietRows.every(entry => entry.endsWith(":true")), "every residual's quiet row is pinned in its pin's witness").toBe(true);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^Not P0: gated; (.+?)\. Related: /.exec(noteLine(bead.notes, "Not P0: "))?.[1] ?? "";
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    expect(trigger, "the filing's trigger sentence").toBe("no emitted references reach Pi today");
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["A"], ["A"]]);
    // The quote, the authority and the citations are the producer's lines at the cited sha, as the roster measured them.
    const quoteLine = /^'(.+)' (\S+)\.$/.exec(noteLine(bead.notes, "'An emitted reference"));
    expect({ quote: quoteLine?.[1], citation: quoteLine?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    const authority = noteLine(bead.notes, "Authority: ");
    const held = {
      quote: producerLine("01-contracts.md", 20).includes(ROSTER.quote),
      citationSha: ROSTER.citation.endsWith(`@${ROSTER.producer.pin.slice(0, 12)}`) && ROSTER.citation.startsWith(producerFile("01-contracts.md").path),
      intent: authority.includes(`'${/design_intent="(.+)",$/.exec(producerLine("contracts.py", 70))?.[1] ?? "-"}'`) && authority.includes("contracts.py:59,70"),
      field: producerLine("contracts.py", 59).trim() === "snapshot_digest: str",
      exactChecks: authority.includes("'exact pointer revision/digest checks' (03-conformance.md:14)") && producerLine("03-conformance.md", 14).includes("exact pointer revision/digest checks"),
      staleWord: authority.includes("'stale' is the producer's own state word (01-contracts.md:7)") && producerLine("01-contracts.md", 7).includes("/stale are not silently coerced"),
      compareNeverMint: authority.includes("Pi compares, never mints a digest"),
    };
    expect(held, "the filing's quote and authority are the measured producer lines").toStrictEqual({
      quote: true, citationSha: true, intent: true, field: true, exactChecks: true, staleWord: true, compareNeverMint: true,
    });
    expect(ROSTER.producer.files.every(file => !file.path.includes("_engine")), "the producer paths keep the module placeholder").toBe(true);
    // The cut's landed delivery note in the same row (wb-48r6 F2), read off its own words: every row its WHAT IT PINS paragraphs name
    // is judged under that clause with every pin the paragraph names, every escape token and family word A1's line names is read,
    // and every residual its RESIDUALS line names keeps its family and its quiet pin.
    const landed = landedNote(bead.notes);
    const landedRows = Object.entries(landed.rows).map(([id, entry]) => {
      const judged = ROWS.find(row => row.id === id);
      const pins = judged?.pins ?? [];
      const kept = (judged?.label.startsWith(`(${entry.clause}) `) ?? false) && entry.pins.length > 0 && entry.pins.every(pin => pins.includes(pin));
      return `${id}:${kept}`;
    });
    expect(landedRows, "every row the landed note names is judged under its clause with every pin it names").toEqual(ROWS.map(row => `${row.id}:true`));
    expect(
      {
        tokens: landed.escapeTokens.length > 0 && landed.escapeTokens.every(token => ESCAPE_TOKENS.includes(token)),
        words: landed.wordFamily.length > 0 && landed.wordFamily.every(word => REFERENCE_WORD.test(words(word))),
        residuals: Object.keys(landed.residuals).length,
        dropped: Object.entries(landed.residuals).filter(([family, pin]) => !RESIDUAL_FAMILIES.includes(family) || RESIDUAL_ROWS[family] !== pin).map(([family]) => family),
      },
      "the landed note's escape tokens and family words are read, and every residual it names keeps its quiet pin",
    ).toStrictEqual({ tokens: true, words: true, residuals: 4, dropped: [] });
    // The follow-up's own filing (wb-48r6): its lead line names the gate probe C3 reads as a use mutant.
    const lead = noteLine(readBeadRow(FOLLOW_UP).notes, "- F1 MEDIUM leads: ");
    const c3 = rosterWitness("C3");
    expect([...new Set(lead.match(/\bG\d{2}[a-z]?\b/g) ?? [])], "the follow-up's lead line names the gate probes the census reads").toEqual(Object.keys(GATE_PROBES));
    expect(
      Object.values(GATE_PROBES).filter(mutant => !Object.hasOwn(USE_MUTANTS, mutant) || !isObject(c3) || !Object.hasOwn(c3, mutant)),
      "each named probe is a use mutant whose reading C3's witness holds",
    ).toEqual([]);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          // A case measures its own witness: one reading the roster's rows would echo the witness it is held to.
          expect(String(impl), `${pin}'s case reads the roster's witnesses`).not.toMatch(/\brosterWitness\b|\bROSTER\.rows\b/);
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          // Counted once the witness compare held (wb-48r6 F7): a case that swaps its own assertions for a copy of its witness makes
          // fewer of them than the roster records.
          COUNTED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(COUNTED, "every pin's case made the assertions the roster counts for it, once its witness compare held").toEqual(ROSTER.counted);
  });
});
