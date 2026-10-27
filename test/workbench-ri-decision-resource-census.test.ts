/**
 * wb-tz4r.1 (RI-UNIFIED-DECISION-INFERENCE-R1), a census with an until-then leg. Statement (bead notes; the four names are
 * written as the placeholders defined below): "No Pi surface shall synthesize an `<IR>` to stand in for a native decision head's
 * output; if Pi ever reads a native decision result surfaced as a separately tagged Reactive Fiber resource through rf (gated: RI
 * typed decision envelope + its Reactive Fiber resource tag, RI-DEC-06/07, unshipped at 485f3615db1e), Pi carries it under the
 * producer's tag as a distinct evidence ref and never merges it into an `<IR>`/generative shape; pin docs/programs/
 * unified-decision-inference-2026-10-21/01-contracts.md:4@485f3615db1e". Acceptance, quoted: "(a) today: src/test/qa/docs/workbench
 * census = 0 <IR>|<DE>|<NDB>|<GDF> identifiers (0 now; sdk_versions.reactive_inference version echoes excluded); (b) adoption: a
 * decision-tagged resource in a preview envelope projects exactly one evidence ref labelled with the producer's tag verbatim and
 * populates no output/text or generative field; tag absent = byte-identical projection; (c) mutant: folding the resource into
 * output/text, re-tagging it, or synthesizing a generative result from a decision envelope fails."
 *
 * THE FOUR NAMES. <IR> is RI's generative response type, <DE> its typed decision module, <NDB> its native backend class and <GDF>
 * its generative finalizer class (01-contracts.md:4, :14 and :23@485f3615db1e). This file and its roster never spell one of them in
 * any of the three case conventions the census reads (Pascal, camel and snake: twelve spellings): IDENTIFIERS holds word lists,
 * SPELLINGS composes each spelling at runtime, every label and quote writes the placeholder, and the controls build their texts the
 * same way, so row A's whole-tree scan holds over these two files with no path excluded (the wb-a9l2.3 discipline; residual
 * R-COMPOSED names what it costs). The roster pins the sha256 of each acceptance spelling, so the word lists cannot drift from the
 * bead's own names. A later cut that spells one of the twelve under the four roots reds row A by construction; a sibling census of
 * this family keeps the same discipline.
 *
 * MEASURED AT THE PINS (read-only git show in the producers' checkouts by the cutting seat, 2026-10-23). ReactiveInferenceSDK at
 * 485f3615db1e: 01-contracts.md :4 (the never-synthesize sentence), :14 (the two backend classes), :23 (generative JSON unchanged;
 * native decision results use a new typed envelope and may be surfaced as a separately tagged Reactive Fiber resource);
 * 02-implementation.md :13 (RI-DEC-06), :15 (RI-DEC-07), :23 (RI-DEC-02/04/05 "initial restricted seed only"). The <DE> package
 * exports seven request and preflight names and no result envelope; neither backend class is spelled outside docs. Re-probed at
 * RI origin/master 075ac589d64d (10 commits past the pin): the same seven exports and the same zero rows, so the gate is closed.
 * ReactiveFiberTSXSDK at 76bbbffd9d4a (its fetched origin/main): native-interfaces-and-portable-tsx-2026-10-21/02-implementation.md
 * :16 keeps the decision resource family beside the generative one ("A native `DecisionEnvelope` is not coerced to `<IR>`.") and
 * neither `DecisionEnvelope` nor `useDecision` is spelled in src/ or python/, so the TSX arrival path is gated too. The generative
 * shape is nine keys, identical at both producers: TSX src/resources/inference.ts:78-88 (<IR>Json) and RI
 * src/reactive_inference/contracts.py:1747-1755 (<IR>.to_dict). TSX-NI-R5, merged into this bead, carries three clauses that are its
 * dropped draft's wording (0 rows verbatim in the TSX program directory): 'keep <IR>Json/validate<IR> for generative responses only'
 * binds in row A (<IR> is a substring of both names), 'echo the result and its schema version verbatim' in B2, and the 'or a TSX
 * host' arrival path in B4 (Pi holds no TSX host, TSX SDK or RI SDK seam; its one rf seam is the CLI preview).
 *
 * MEASURED AT THE INSTALLED rf (0.1.836 by `rf --json --version` result.version, 2026-10-23): one noncommitted preview in a scratch
 * jsonl workspace (one declarative component, one task source), rendered with the argv Pi's native reader spawns (the roster lists
 * the commands): exit 0, ephemeral, render_id null, 0 storage writes, 0 diagnostics. THE FIXTURE (the roster's envelope) keeps it as
 * rf printed it, the scratch root rewritten to /fixture/rf-workspace. Its result.provenance.sdk_versions.reactive_inference entry is
 * the version echo (a) excludes; no result key is a resource list. RESOURCE, the decision-tagged resource, is constructed here (no
 * build serves one): a producer tag, a schema version and a one-question choice outcome, set at three PLACEMENTS no Pi leg reads
 * (an additive result key, a key on the rendering component's row and one on the document block's row).
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts: the native reader validates the
 * preview shape and stays open to additive keys; the injected seam validates nothing) and its reader adapter
 * (reactivefiber-observer.ts), which projects a fixed set of evidence refs and references output.text by digest alone.
 *  A, acceptance (a). Every regular file under the four SCAN_ROOTS is read as UTF-8 and every occurrence of the twelve SPELLINGS
 *    is a site. A1 src: zero sites, a file floor and its tracked floor, every file a .ts module, and precision anchors (the part
 *    words decision, engine, response, backend and Native each occur in src and are no site); A2 test and qa: zero sites, floors
 *    and tracked floors, and this file and its roster walked, each carrying all four placeholders and no site; A3 docs/workbench:
 *    zero sites, a floor and its tracked floor, every file markdown; A4 the exclusion: the reactive_inference echo files are
 *    walked (a floor) and read no site, the fixture's own echo is present, and no spelling is a substring of the echo key, so the
 *    exclusion holds by the rule, never by a path; A5 the matcher's controls: flagged spellings, quiet near-misses and the
 *    residuals' quiet rows.
 *  B, acceptance (b), the until-then posture over the fixture. B1 tag absent: the native reader (a stand-in rf on PATH) admits the
 *    fixture in one spawn of the --no-commit render argv and its reading carries it byte for byte, the injected seam likewise, and
 *    each seam's projection names only the four measured ref kinds, references the fixture's own output digest, never reads the
 *    reactive_inference echo and states no violation; B2 tag present: at each placement the variant differs from the fixture at that
 *    one path, both seams admit it and carry it byte for byte (the resource under its producer tag and schema version verbatim, no
 *    generative key added, output.text unchanged); B3 each variant's projection is byte-identical to the fixture's under the same
 *    seam: no evidence ref names the resource (0 until the gate opens) and no surfaced string carries its marks; B4 no other Pi
 *    surface reads it: the rf roster is the preview alone, no registered descriptor spells a name or a TSX seam, and package.json
 *    declares no RI or TSX SDK.
 *  C, acceptance (c). violationsOf, the checker B1-B3 assert empty, run on mutants of real readings and projections: C1 folding the
 *    resource into output.text (the payload ref moves with it) or into a surfaced note; C2 re-tagging it in the reading (three
 *    tags) or naming it in an evidence ref under a Pi tag, beside the adoption simulation (a ref under the producer's tag reads
 *    ref-count alone, never re-tag); C3 synthesizing a generative result in the reading's source, as a reading key or in the
 *    projection, and row A's matcher on a module typing that result; C4 the checker's quiet controls.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label,
 * until-then reading and pins, every pin's witness and covered phrases, the identifiers and their digests, the generative keys, the
 * roots (each with its walkFloors entry, in order), the placements, the resource, the registered tests, each pin's assertion count
 * and this header's Not-claimed lists (wb-gbxz: each Not-claimed sentence below, split at its semicolons, in order) - is held to the
 * out-of-file roster test/fixtures/ri-decision-resource-roster.json; the last case walks this file's vitest task tree against the
 * roster.
 * OUTSIDE ANCHOR (respin #1, the gate's F2): the bead's own row in the tracked export (.beads/issues.jsonl at the tree under test).
 * Its first `Acceptance:` line splits into exactly the clauses (a)-(c), and each clause, its four names written as their
 * placeholders, equals its row label; the four names it spells hash to the IDENTIFIERS digests; each pin's covered phrases (COVERS)
 * are verbatim spans of its row's clause, together they cover every word of the clause (articles and conjunctions aside), and each
 * pin covers a word no sibling covers; row B's until-then reading quotes the title's gating parenthetical verbatim. So a row, a pin
 * or a name removed from every literal of this file and its roster together still reds. Only first matches are read (the first
 * `Acceptance:` line, the title's gating parenthetical), so a note appended later never moves the reading, and a quiet control pins
 * that. Not claimed: a pin removed everywhere while its own words are handed to a sibling's phrases (the anchor reads coverage, not
 * which pin owns a word).
 * WALK ANCHOR (the gate's F3): each root's walk equals what git would commit below it (tracked or untracked, never ignored), so a
 * walk that skips a directory reds even while every file floor holds.
 * TRACKED FLOORS (wb-w3tz, the cure of the respin gate's F6): that anchor is computed in this file, so its LEG-2 survivor G30 - two
 * edits here, a walk skipping every directory named ui and git's list swapped for the walk's own - stayed 16/16 with a src/ui
 * plant. Each root's walk is therefore also held to counts outside this file: the roster's walkFloors pin, per root, what git
 * tracked below it at walkFloors.measuredAt (git ls-files --cached): its file count and each directory holding a tracked file of
 * its own. A1-A3 hold that the walk keeps (git-ignored files aside) at least that many files and, of each measured directory still
 * on disk, at least one file of its own, so G30 reds through the roster alone (src keeps 105 of 116 and src/ui goes unwalked).
 * They are floors, never equalities: an added file never reds them (test/ gained 225 files over the 400 first-parent commits to
 * the measuring tree) and a deleted directory drops out by existence; only a deletion can red them - a root left holding fewer
 * files than its floor, or a measured directory left on disk without a file of its own (5 per-root decreases in the 1216
 * first-parent commits to the measuring tree, none after 2026-10-19) - and the deleting cut re-measures walkFloors in the same
 * commit. Not claimed: a narrowing confined to fewer files than a root has gained since measuredAt (the slack, 0 at the measuring
 * tree) that leaves each measured directory a walked file of its own; a directory created after measuredAt; a hollow that also
 * lowers a floor or drops a directory in the roster (the floors are measured numbers that no in-file source re-derives: the
 * repository's CI checks out at depth 1, so the census reads no git history); a hollow in this file's reading or comparison code
 * rather than its literals - a reading forged to return what its comparisons expect or re-pointed to a source that always meets
 * them (the wb-w3tz gate's L2-07 and L2-08 keep G30's two edits and also have trackedOf return a held floor outright or read git's
 * list in place of the walk's kept files, and its L2-10, one edit, drops scanOf's sites below a ui directory, each green with a
 * src/ui plant), or a comparison dropped from a case whose assertion count the RECORD does not hold (every case but the pins',
 * this list's own comparison included): every roster value reaches a case only through comparison code in this file, so wb-gbxz
 * names the class instead of adding an in-file anchor, which would admit a next-order in-file hollow. A re-cut or fold that
 * re-measures walkFloors restores the margin.
 * RECORD (the gate's F4): each pin's case records its vitest assertion count after its witness compares equal, and the last case
 * holds the counts to the roster, so a case that hands back a copy of its roster witness without measuring reds.
 * THE GATE-OPENING SIGNAL: when RI ships its typed decision envelope and resource tag (RI-DEC-06/07) and rf surfaces it, a
 * re-measured preview carries the producer's own placement, which replaces the constructed ones, and the adoption Pi then owes
 * (exactly one evidence ref under the producer's tag verbatim) reds B3: the projection moves by that one ref and the checker reads
 * ref-count alone, never a re-tag (C2's adoption simulation pins that reading on a mutant; the seat's planted adapter edit read it
 * on the real one) - which is the cue to re-cut this census to the shipped tag, its ref count then 1.
 * RESIDUALS (named, each with a pinned quiet row in A5): R-OTHER-CASE a spelling in a convention outside the three - SCREAMING_SNAKE
 * (a constant, or a producer diagnostic code such as the TSX validator's, which a queued roster lists), Title_Snake or flatcase - is
 * none of the twelve, and the matcher is case-sensitive so that the producer's code stays quiet; R-SPACED the words apart (spaces
 * or hyphens) are prose, never an identifier; R-COMPOSED a spelling assembled at runtime from parts, this file's own mechanism, is
 * invisible to any text scan; R-INTERRUPTED a spelling split by a zero-width code point; R-HOMOGLYPH one letter swapped for a
 * look-alike from another script.
 * SCOPE: the producer facts are read at their pins and Pi vendors no RI or TSX source, so a producer change is seen only when a
 * re-probe re-reads them; a decision resource surfaced inside a field a reader leg already reads (an observation row, a necessity
 * record) is a shipped shape the re-cut measures, not one constructed here. No reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what B1 and B2 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
type Convention = "pascal" | "camel" | "snake";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF_PATH = fileURLToPath(import.meta.url);
const ROSTER_PATH = join(HERE, "fixtures", "ri-decision-resource-roster.json");
const BEAD = "wb-tz4r.1";
/** The tracked bead export the outside anchor reads (the bead's own row: its title and its first acceptance line). */
const BEAD_EXPORT = ".beads/issues.jsonl";
/** The root the roster envelope names: the measured scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RF_VERSION = "0.1.836";
const RF_SCHEMA = "reactive-fiber.cli/v1";
const RENDER_COMMAND = "context.render";
const RI_PIN = "485f3615db1e";
const RI_PROBE = "075ac589d64d";
const TSX_PIN = "76bbbffd9d4a";
const SCAN_ROOTS: readonly string[] = ["src", "test", "qa", "docs/workbench"];
const CONVENTIONS: readonly Convention[] = ["pascal", "camel", "snake"];
/** The version echo (a) excludes: the sibling SDK entry of result.provenance.sdk_versions. */
const ECHO_KEY = "reactive_inference";
const ECHO_PATH: readonly string[] = ["result", "provenance", "sdk_versions", ECHO_KEY, "distribution_version"];
const OUTPUT_TEXT: readonly string[] = ["result", "output", "text"];
/** The nine-key generative shape, identical at TSX src/resources/inference.ts:78-88 and RI contracts.py:1747-1755. */
const GENERATIVE_KEYS: readonly string[] = ["model_id", "output", "usage", "stop_reason", "provider_metadata", "chunks", "tool_calls", "reasoning", "provider_blocks"];
const READING_KEYS: readonly string[] = ["contract", "source", "workspaceRoot"];
/** The ref kinds the adapter projects for the fixture: graph, workspace, bundle and producer release. */
const REF_KINDS: readonly string[] = ["rf-graph", "rf-workspace", "rf-bundle", "rf-cli"];
/** Part words of the four names that occur in src as words of their own (decision in 28 files, Native 22, response 15, backend 6,
 * engine 5 at the cut base) and are never a site; the lone word inference (2 src files) is pinned by A5's quiet controls instead. */
const PART_WORDS: readonly string[] = ["decision", "engine", "response", "backend", "Native"];

interface Identifier {
  readonly placeholder: string;
  readonly words: readonly string[];
  readonly canonical: Convention;
}
/** The four names (a) counts, as the word lists their spellings compose from, each with the convention the acceptance writes. */
const IDENTIFIERS: readonly Identifier[] = [
  { placeholder: "<IR>", words: ["Inference", "Response"], canonical: "pascal" },
  { placeholder: "<DE>", words: ["decision", "engine"], canonical: "snake" },
  { placeholder: "<NDB>", words: ["Native", "Decision", "Backend"], canonical: "pascal" },
  { placeholder: "<GDF>", words: ["Generative", "Decision", "Finalizer"], canonical: "pascal" },
];
const PLACEHOLDERS: readonly string[] = IDENTIFIERS.map(identifier => identifier.placeholder);

/** One spelling of a word list in a case convention, composed at runtime: Pascal, camel or snake. */
function spelled(words: readonly string[], convention: Convention): string {
  const lower = words.map(word => word.toLowerCase());
  if (convention === "snake") return lower.join("_");
  const pascal = lower.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join("");
  return convention === "pascal" ? pascal : `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}`;
}
function identifierOf(placeholder: string): Identifier {
  const found = IDENTIFIERS.find(identifier => identifier.placeholder === placeholder);
  if (found === undefined) throw new Error(`no identifier ${placeholder}`);
  return found;
}
function nameOf(placeholder: string, convention: Convention): string {
  return spelled(identifierOf(placeholder).words, convention);
}
interface Spelling {
  readonly label: string;
  readonly text: string;
}
/** The twelve spellings the census reads, labelled by placeholder and convention so no witness ever spells one. */
const SPELLINGS: readonly Spelling[] = IDENTIFIERS.flatMap(identifier =>
  CONVENTIONS.map(convention => ({ label: `${identifier.placeholder}/${convention}`, text: spelled(identifier.words, convention) })),
);
/** Every site a text holds: one entry per spelling it contains, with the count, named by label. */
function sitesOf(name: string, text: string): string[] {
  return SPELLINGS.flatMap(spelling => {
    const count = text.split(spelling.text).length - 1;
    return count > 0 ? [`${name}: ${spelling.label} x${count}`] : [];
  });
}
function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** The decision-tagged resource, constructed (no build serves one): the producer's tag, its schema version and one outcome. */
const RESOURCE_TAG = "ri.decision-result/constructed-0";
const RESOURCE_SCHEMA_VERSION = "ri-decision-envelope/constructed-0";
const RESOURCE_QUESTION = "q-route-7d1";
const RESOURCE_CANDIDATE = "cand-7d1b";
const RESOURCE: JsonObject = {
  tag: RESOURCE_TAG,
  schema_version: RESOURCE_SCHEMA_VERSION,
  question_id: RESOURCE_QUESTION,
  outcome: { kind: "choice", candidate_id: RESOURCE_CANDIDATE },
};
/** The resource's own strings: a projection string holding one names the resource. */
const RESOURCE_MARKS: readonly string[] = [RESOURCE_TAG, RESOURCE_SCHEMA_VERSION, RESOURCE_QUESTION, RESOURCE_CANDIDATE];
interface Placement {
  readonly id: string;
  readonly path: readonly string[];
}
/** Where a variant carries [RESOURCE]: three additive keys no reader leg reads. */
const PLACEMENTS: readonly Placement[] = [
  { id: "top", path: ["result", "resources"] },
  { id: "component", path: ["result", "components", "0", "resources"] },
  { id: "block", path: ["result", "blocks", "0", "resources"] },
];

interface Row {
  readonly id: string;
  readonly label: string;
  /** The until-then reading a row title carries beside its acceptance label (row B: the one-ref half is gated). */
  readonly until?: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) today: src/test/qa/docs/workbench census = 0 <IR>|<DE>|<NDB>|<GDF> identifiers (0 now; sdk_versions.reactive_inference version echoes excluded)",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) adoption: a decision-tagged resource in a preview envelope projects exactly one evidence ref labelled with the producer's tag verbatim and populates no output/text or generative field; tag absent = byte-identical projection",
    until: "until then, 0 evidence refs name the resource and each projection stays byte-identical, as B1-B3 pin; the one-ref half waits on the title's (gated: RI typed decision envelope + its Reactive Fiber resource tag, RI-DEC-06/07, unshipped at 485f3615db1e)",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) mutant: folding the resource into output/text, re-tagging it, or synthesizing a generative result from a decision envelope fails",
    pins: ["C1", "C2", "C3", "C4"],
  },
];
/** Each pin's covered phrases: verbatim spans of its row's acceptance clause (the names as placeholders). The outside anchor holds
 * that together they cover every word of the clause and that each pin covers a word no sibling covers; C4 owns "fails", since a
 * mutant's failure reads as one only beside the quiet twins C4 pins. */
const COVERS: Readonly<Record<string, readonly string[]>> = {
  A1: ["src", "census = 0", "0 now"],
  A2: ["test/qa", "census = 0", "0 now"],
  A3: ["docs/workbench", "census = 0", "0 now"],
  A4: ["sdk_versions.reactive_inference version echoes excluded"],
  A5: ["<IR>|<DE>|<NDB>|<GDF> identifiers"],
  B1: ["tag absent = byte-identical projection"],
  B2: ["a decision-tagged resource", "populates no output/text or generative field"],
  B3: ["projects exactly one evidence ref labelled with the producer's tag verbatim"],
  B4: ["in a preview envelope"],
  C1: ["folding the resource into output/text"],
  C2: ["re-tagging it"],
  C3: ["synthesizing a generative result from a decision envelope"],
  C4: ["fails"],
};
/** The words a clause's coverage never needs: articles and conjunctions. */
const STOP: readonly string[] = ["a", "an", "the", "and", "or"];

interface RosterPin {
  readonly id: string;
  readonly covers: readonly string[];
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly until: string | null;
  readonly pins: readonly RosterPin[];
}
interface RosterIdentifier {
  readonly placeholder: string;
  readonly words: readonly string[];
  readonly canonical: string;
  readonly sha256: string;
}
/** One root's tracked floor (wb-w3tz): git's tracked file count below it and each directory holding a tracked file of its own, both
 * measured at walkFloors.measuredAt with git ls-files --cached. */
interface WalkFloor {
  readonly root: string;
  readonly tracked: number;
  readonly directories: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly rfVersion: string;
  readonly riPin: string;
  readonly riProbe: string;
  readonly tsxPin: string;
  readonly identifiers: readonly RosterIdentifier[];
  readonly generativeKeys: readonly string[];
  readonly scanRoots: readonly string[];
  /** The tracked floors, one per scan root in order, and the tree they were measured at. */
  readonly walkFloors: { readonly measuredAt: string; readonly roots: readonly WalkFloor[] };
  readonly placements: readonly Placement[];
  readonly resource: JsonObject;
  readonly exit: number;
  readonly envelope: JsonObject;
  readonly rows: readonly RosterRow[];
  /** The header's Not-claimed lists (wb-gbxz): each Not-claimed sentence of this file's header, in order, as its items. */
  readonly notClaimed: readonly (readonly string[])[];
  readonly tests: readonly string[];
  /** `${pin}:${assertion count}` for every pin, in row order. */
  readonly reached: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function arrayOf(value: JsonValue | undefined, field: string): JsonValue[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  return value;
}
/** The value at a path of a JSON value (array steps by index); undefined where the path leaves the value. */
function at(value: JsonValue | undefined, path: readonly string[]): JsonValue | undefined {
  let current: JsonValue | undefined = value;
  for (const key of path) {
    if (Array.isArray(current)) current = current[Number(key)];
    else if (current !== null && typeof current === "object" && current !== undefined) current = Object.hasOwn(current, key) ? current[key] : undefined;
    else return undefined;
  }
  return current;
}
/** Sets a value at a path whose parent exists; refuses a path that leaves the value. */
function setAt(target: JsonValue, path: readonly string[], value: JsonValue): void {
  const parent = at(target, path.slice(0, -1));
  const key = path[path.length - 1];
  if (key === undefined) throw new Error("an empty path");
  if (Array.isArray(parent)) parent[Number(key)] = value;
  else if (parent !== null && typeof parent === "object" && parent !== undefined) parent[key] = value;
  else throw new Error(`no container at ${path.slice(0, -1).join(".")}`);
}
/** A JSON text with every object's keys sorted: two values are deep-equal exactly when their canonical texts are. */
function canonical(value: JsonValue | undefined): string {
  const sorted = (item: JsonValue): JsonValue => {
    if (Array.isArray(item)) return item.map(sorted);
    if (item !== null && typeof item === "object") return Object.fromEntries(Object.keys(item).sort().map(key => [key, sorted(item[key] ?? null)]));
    return item;
  };
  return JSON.stringify(value === undefined ? null : sorted(value));
}

/** One envelope in the strict eight-key rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): JsonObject {
  if (!isObject(value) || Object.keys(value).length !== 8) throw new Error(`envelope ${name} must be an eight-key object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`envelope ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`envelope ${name} needs a null transaction id, a result and diagnostics`);
  return objectOf(json(value), `envelope ${name}`);
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.identifiers) || !Array.isArray(raw.placements) || !isObject(raw.resource)) {
    throw new Error("roster must be an object with rows, identifiers, placements and a resource");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins) || !(row.until === null || typeof row.until === "string")) {
      throw new Error(`roster rows[${index}] needs an id, a label, an until reading (a string or null) and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, covers: strings(pin.covers, `rows[${index}].pins[${at}].covers`), witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, until: row.until, pins };
  });
  const identifiers = raw.identifiers.map((entry: unknown, index: number): RosterIdentifier => {
    if (!isObject(entry) || typeof entry.placeholder !== "string" || typeof entry.canonical !== "string" || typeof entry.sha256 !== "string") {
      throw new Error(`roster identifiers[${index}] needs a placeholder, a canonical convention and a sha256`);
    }
    return { placeholder: entry.placeholder, words: strings(entry.words, `identifiers[${index}].words`), canonical: entry.canonical, sha256: entry.sha256 };
  });
  const placements = raw.placements.map((entry: unknown, index: number): Placement => {
    if (!isObject(entry) || typeof entry.id !== "string") throw new Error(`roster placements[${index}] needs an id`);
    return { id: entry.id, path: strings(entry.path, `placements[${index}].path`) };
  });
  const floors = raw.walkFloors;
  if (!isObject(floors) || typeof floors.measuredAt !== "string" || !/^[0-9a-f]{40}$/.test(floors.measuredAt) || !Array.isArray(floors.roots)) {
    throw new Error("roster walkFloors needs a full measuredAt sha and a roots list");
  }
  const walkFloors = {
    measuredAt: floors.measuredAt,
    roots: floors.roots.map((entry: unknown, index: number): WalkFloor => {
      if (!isObject(entry) || typeof entry.root !== "string" || typeof entry.tracked !== "number" || !Number.isSafeInteger(entry.tracked) || entry.tracked < 1) {
        throw new Error(`roster walkFloors.roots[${index}] needs a root and a positive integer tracked count`);
      }
      const root = entry.root;
      const directories = strings(entry.directories, `walkFloors.roots[${index}].directories`);
      if (directories.length === 0 || directories.some(directory => directory !== root && !directory.startsWith(`${root}/`))) {
        throw new Error(`roster walkFloors.roots[${index}].directories must list at least one directory at or below ${root}`);
      }
      return { root, tracked: entry.tracked, directories };
    }),
  };
  if (typeof raw.bead !== "string" || typeof raw.rfVersion !== "string" || typeof raw.riPin !== "string" || typeof raw.riProbe !== "string" ||
    typeof raw.tsxPin !== "string" || typeof raw.exit !== "number" || !Number.isSafeInteger(raw.exit)) {
    throw new Error("roster needs bead, rfVersion, riPin, riProbe, tsxPin and an integer exit");
  }
  if (!Array.isArray(raw.notClaimed)) throw new Error("roster needs a notClaimed list");
  const notClaimed = raw.notClaimed.map((entry: unknown, index: number): string[] => strings(entry, `notClaimed[${index}]`));
  return {
    bead: raw.bead, rfVersion: raw.rfVersion, riPin: raw.riPin, riProbe: raw.riProbe, tsxPin: raw.tsxPin, identifiers,
    generativeKeys: strings(raw.generativeKeys, "generativeKeys"), scanRoots: strings(raw.scanRoots, "scanRoots"), walkFloors, placements,
    resource: objectOf(json(raw.resource), "roster resource"), exit: raw.exit, envelope: envelopeOf(raw.envelope, "fixture"), rows,
    notClaimed,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();
const ENVELOPE = ROSTER.envelope;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** The dotted path of every key a JSON value holds whose name matches `name`. */
function keyPaths(value: unknown, name: RegExp, path: readonly string[] = []): string[] {
  if (Array.isArray(value)) return value.flatMap((item: unknown, index: number) => keyPaths(item, name, [...path, String(index)]));
  if (!isObject(value)) return [];
  return Object.entries(value).flatMap(([key, item]) => [...(name.test(key) ? [[...path, key].join(".")] : []), ...keyPaths(item, name, [...path, key])]);
}
/** Every dotted leaf path at which two JSON values differ; a key one side lacks is a path. */
function diffPaths(left: unknown, right: unknown, path: readonly string[] = []): string[] {
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
    return keys.flatMap(key => diffPaths(left[key], right[key], [...path, key]));
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return Array.from({ length: Math.max(left.length, right.length) }, (_unused, index) => diffPaths(left[index], right[index], [...path, String(index)])).flat();
  }
  return JSON.stringify(left) === JSON.stringify(right) ? [] : [path.join(".")];
}

/** Every regular file below a root, sorted (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
/** What git would commit below a root: tracked or untracked, never ignored (the walk's outside anchor). */
function gitListed(root: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", root], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(REPO, path))))].sort();
}
/** The walked paths git ignores (a tracked path is never reported). */
function gitIgnored(paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: REPO, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
/** A walk against git's list (a type alias, so a witness carrying it stays a JSON value). */
type WalkAgreement = {
  /** Walked, not ignored, yet not listed by git. */
  readonly walkOnly: string[];
  /** Listed by git, yet never walked (a skipped directory lands here). */
  readonly gitOnly: string[];
};
interface RootScan {
  readonly files: readonly string[];
  /** The walked files git does not ignore: what the tracked floor counts. */
  readonly kept: readonly string[];
  readonly texts: ReadonlyMap<string, string>;
  readonly sites: readonly string[];
  readonly walk: WalkAgreement;
}
const scans = new Map<string, RootScan>();
/** One root read once: every file's text (strictly: an unreadable file fails the case), every site and the walk's agreement with git. */
function scanOf(root: string): RootScan {
  const cached = scans.get(root);
  if (cached !== undefined) return cached;
  const files = filesBelow(join(REPO, root)).map(file => relative(REPO, file));
  const ignored = gitIgnored(files);
  const kept = new Set(files.filter(file => !ignored.has(file)));
  const listed = gitListed(root);
  const known = new Set(listed);
  const walk = { walkOnly: [...kept].filter(file => !known.has(file)).sort(), gitOnly: listed.filter(file => !kept.has(file)) };
  const texts = new Map(files.map(file => [file, readFileSync(join(REPO, file), "utf8")]));
  const scan = { files, kept: [...kept], texts, sites: files.flatMap(file => sitesOf(file, texts.get(file) ?? "")), walk };
  scans.set(root, scan);
  return scan;
}
const AGREED: WalkAgreement = { walkOnly: [], gitOnly: [] };

/** A root's walk against its roster floor (a type alias, so a witness carrying it stays a JSON value). */
type TrackedFloor = {
  /** The walk keeps at least the files git tracked below the root at walkFloors.measuredAt. */
  readonly floorMet: boolean;
  /** Measured directories still on disk that hold no kept file of their own (a skipped directory lands here). */
  readonly unwalked: string[];
};
const FLOOR_HELD: TrackedFloor = { floorMet: true, unwalked: [] };
function floorFor(root: string): WalkFloor {
  const floor = ROSTER.walkFloors.roots.find(entry => entry.root === root);
  if (floor === undefined) throw new Error(`the roster holds no walk floor for ${root}`);
  return floor;
}
/** The outside count each root's walk answers to: read from the roster, never derived from this file's own walk or git anchor. */
function trackedOf(root: string): TrackedFloor {
  const floor = floorFor(root);
  const kept = scanOf(root).kept;
  const walkedDirectories = new Set(kept.map(file => dirname(file)));
  return {
    floorMet: kept.length >= floor.tracked,
    unwalked: floor.directories.filter(directory => existsSync(join(REPO, directory)) && !walkedDirectories.has(directory)),
  };
}
function floorNote(root: string): string {
  return `the ${root} walk keeps ${scanOf(root).kept.length} files against the roster's tracked floor ${floorFor(root).tracked} (walkFloors.measuredAt ${ROSTER.walkFloors.measuredAt.slice(0, 12)}; a cut deleting tracked files below ${root} re-measures walkFloors)`;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: every spawn appends its JSON argv line to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("ri-decision-resource-");
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
      `process.exit(${exit});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}

function contextFor(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return { scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam, capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" };
}
/** The adapter's projection of a reading, as plain JSON. */
function project(reading: JsonValue, seam: ReactiveFiberSeam): JsonObject {
  return objectOf(json(reactivefiberTopology(reading, contextFor(seam))), `${seam} topology`);
}
/** What one seam made of one handed envelope: the reading and the adapter's projection of it. */
interface Carry {
  readonly seam: ReactiveFiberSeam;
  readonly handed: JsonObject;
  readonly reading: JsonObject;
  readonly topology: JsonObject;
}
/** The NATIVE preview (registerNativeReactiveFiberRender) over a stand-in rf printing `handed`; the reading is projected as rf-cli. */
async function nativeCarry(handed: JsonObject): Promise<{ carry: Carry; spawns: string[][]; verbatim: boolean }> {
  const before = JSON.stringify(handed);
  const log = standInRf(handed, ROSTER.exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "native reading");
  return { carry: { seam: "rf-cli", handed, reading, topology: project(reading, "rf-cli") }, spawns: spawnsOf(log), verbatim: JSON.stringify(reading.source) === before };
}
/** The INJECTED preview (registerReactiveFiberRender) whose reader answers a deep copy of `handed`; projected as injected-fixture. */
async function injectedCarry(handed: JsonObject): Promise<{ carry: Carry; calls: number; verbatim: boolean }> {
  const before = JSON.stringify(handed);
  const given = json(handed);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return given as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "injected reading");
  return { carry: { seam: "injected-fixture", handed, reading, topology: project(reading, "injected-fixture") }, calls, verbatim: JSON.stringify(reading.source) === before };
}

/** A deep copy of the fixture with [RESOURCE] at the placement; the fixture handed in is never touched. */
function placed(envelope: JsonObject, placement: Placement): JsonObject {
  const copy = objectOf(json(envelope), `${placement.id} variant`);
  setAt(copy, placement.path, [json(RESOURCE)]);
  return copy;
}
function snapshotsOf(topology: JsonObject): JsonObject[] {
  return arrayOf(topology.snapshots, "topology snapshots").map((snapshot, index) => objectOf(snapshot, `snapshot ${index}`));
}
function evidenceRefsOf(topology: JsonObject): string[] {
  return snapshotsOf(topology).flatMap(snapshot => stringLeaves(snapshot.evidenceRefs));
}
function payloadRefOf(topology: JsonObject): JsonValue | undefined {
  return snapshotsOf(topology)[0]?.nativePayloadRef;
}
const marked = (text: string): boolean => RESOURCE_MARKS.some(mark => text.includes(mark));
/** The projection strings outside the evidence refs that carry one of the resource's marks. */
function surfacedOf(topology: JsonObject): string[] {
  const copy = objectOf(json(topology), "topology copy");
  for (const snapshot of snapshotsOf(copy)) snapshot.evidenceRefs = [];
  return stringLeaves(copy).filter(marked);
}
const GENERATIVE = new RegExp(`^(?:${GENERATIVE_KEYS.join("|")})$`);
/** The generative-key paths `now` holds that `before` does not. */
function addedGenerative(now: JsonValue | undefined, before: JsonValue | undefined): string[] {
  const had = new Set(keyPaths(before, GENERATIVE));
  return keyPaths(now, GENERATIVE).filter(path => !had.has(path));
}
/** The checker every carry is held to, against the tag-absent fixture's carry under the same seam (`base`): the codes it breaks. */
function violationsOf(carry: Carry, base: Carry, placement: Placement | null, expectedRefs = 0): string[] {
  const codes: string[] = [];
  const source = carry.reading.source;
  const keysKept = JSON.stringify(Object.keys(carry.reading).sort()) === JSON.stringify(READING_KEYS);
  if (!keysKept || addedGenerative(source, carry.handed).length > 0 || addedGenerative(carry.topology, base.topology).length > 0) codes.push("generative");
  if (at(source, OUTPUT_TEXT) !== at(base.handed, OUTPUT_TEXT)) codes.push("fold:output.text");
  if (payloadRefOf(carry.topology) !== payloadRefOf(base.topology)) codes.push("fold:payload-ref");
  if (placement !== null) {
    const list = at(source, placement.path);
    const carried = Array.isArray(list) && list.length === 1 ? list[0] : undefined;
    if (carried === undefined || carried === null || typeof carried !== "object" || Array.isArray(carried)) codes.push("dropped:resource");
    else if (carried.tag !== RESOURCE_TAG) codes.push("retag:resource");
    else if (canonical(carried) !== canonical(RESOURCE)) codes.push("rewrite:resource");
  }
  const naming = evidenceRefsOf(carry.topology).filter(marked);
  if (naming.length !== expectedRefs) codes.push("ref-count");
  if (naming.some(ref => !ref.includes(RESOURCE_TAG))) codes.push("retag:ref");
  if (surfacedOf(carry.topology).length > 0) codes.push("surfaced");
  return codes;
}

/** Mutants of one real carry. Each copies what it changes; a reading mutant is re-projected through the real adapter. */
function readingMutant(carry: Carry, change: (reading: JsonObject) => void): Carry {
  const reading = objectOf(json(carry.reading), "reading copy");
  change(reading);
  return { ...carry, reading, topology: project(reading, carry.seam) };
}
function topologyMutant(carry: Carry, change: (topology: JsonObject) => void): Carry {
  const topology = objectOf(json(carry.topology), "topology copy");
  change(topology);
  return { ...carry, topology };
}
function placedResource(reading: JsonObject, placement: Placement): JsonObject {
  return objectOf(arrayOf(at(reading.source, placement.path), `${placement.id} list`)[0], `${placement.id} resource`);
}
/** A generative-shaped value synthesized from the resource: the nine keys, its chosen candidate as the output text. */
function generativeFrom(resource: JsonObject): JsonObject {
  const outcome = objectOf(resource.outcome, "resource outcome");
  const values: JsonObject = {
    model_id: "native-decision-head", output: String(outcome.candidate_id), usage: { input_tokens: 0, output_tokens: 0 }, stop_reason: "end_turn",
    provider_metadata: {}, chunks: [], tool_calls: [], reasoning: null, provider_blocks: [],
  };
  return Object.fromEntries(GENERATIVE_KEYS.map(key => [key, values[key] ?? null]));
}
/** The same object with its keys in reverse order, at every depth. */
function reversedKeys(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(reversedKeys);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.keys(value).reverse().map(key => [key, reversedKeys(value[key] ?? null)]));
  return value;
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of the three selectors: id prefix, permission family or contract source. */
function rfIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors
    .filter(descriptor => descriptor.id.startsWith("reactivefiber.") || descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").includes(RF_SCHEMA))
    .map(descriptor => descriptor.id);
}
/** No TSX host or SDK seam may be spelled in a descriptor or a dependency name (B4 pins the absence). */
const TSX_SEAM = /\btsx\b|reactive[-_]?fiber[-_]?tsx/i;
const SDK_SEAM = /^@reactive-fiber\/|reactive[-_]?inference|reactive[-_]?fiber[-_]?tsx/i;

/** Row A's controls: texts built at runtime from the word lists, so this file spells none of them. */
const A5_FLAGGED: Readonly<Record<string, () => string>> = {
  generativeType: () => `export type ${nameOf("<IR>", "pascal")} = { model_id: string; output: string };`,
  instanceVariable: () => `const ${nameOf("<IR>", "camel")} = await runner.run(request);`,
  snakeKey: () => `{"${nameOf("<IR>", "snake")}": {"model_id": "m"}}`,
  tsxValidator: () => `validate${nameOf("<IR>", "pascal")}(value, "$");`,
  tsxJsonType: () => `let held: ${nameOf("<IR>", "pascal")}Json | undefined;`,
  plural: () => `const all: ${nameOf("<IR>", "pascal")}s = [];`,
  pythonModule: () => `from reactive_inference.${nameOf("<DE>", "snake")} import plan_choices`,
  moduleCamel: () => `const ${nameOf("<DE>", "camel")} = load();`,
  moduleClass: () => `class ${nameOf("<DE>", "pascal")} {}`,
  backendNew: () => `const head = new ${nameOf("<NDB>", "pascal")}();`,
  backendCamel: () => `const ${nameOf("<NDB>", "camel")} = pick();`,
  backendSnake: () => `${nameOf("<NDB>", "snake")} = None`,
  finalizerClass: () => `class ${nameOf("<GDF>", "pascal")}(Base): ...`,
  finalizerCamel: () => `${nameOf("<GDF>", "camel")}.finalize(envelope);`,
  finalizerSnake: () => `def ${nameOf("<GDF>", "snake")}(): ...`,
  docsSentence: () => `Pi wraps the ${nameOf("<NDB>", "pascal")} in a preview.`,
};
const A5_QUIET: Readonly<Record<string, () => string>> = {
  versionEcho: () => '"sdk_versions": {"reactive_inference": {"distribution_version": "0.2.60.20261018120223"}}',
  tsxHook: () => "const value = useInference(spec);",
  partWords: () => "const decision = 1; const engine = 2; const inference = 3; const response = 4; const backend = 5;",
  wordsApart: () => "the inference ran, and its response arrived before the decision",
  resourceKind: () => '{"refusedResourceKinds": ["inference"]}',
  constructedTag: () => JSON.stringify({ tag: RESOURCE_TAG, schema_version: RESOURCE_SCHEMA_VERSION }),
};
const A5_RESIDUALS: Readonly<Record<string, () => string>> = {
  "R-OTHER-CASE": () => [
    `RFTSX_${nameOf("<IR>", "snake").toUpperCase()}_INVALID`, `const ${nameOf("<NDB>", "snake").toUpperCase()} = 1;`,
    identifierOf("<IR>").words.join("_"), nameOf("<GDF>", "pascal").toLowerCase(),
  ].join(" "),
  "R-SPACED": () => `the ${identifierOf("<IR>").words.join(" ")} shape and the ${identifierOf("<DE>").words.join("-")} module`,
  "R-COMPOSED": () => `const name = [${identifierOf("<IR>").words.map(word => JSON.stringify(word)).join(", ")}].join("");`,
  "R-INTERRUPTED": () => identifierOf("<IR>").words.join(String.fromCodePoint(0x200d)),
  "R-HOMOGLYPH": () => nameOf("<IR>", "pascal").replace("e", String.fromCodePoint(0x0435)),
};
function siteCount(text: string): number {
  return sitesOf("control", text).length;
}

/** The tracked bead export's row for `id` (every line must parse; a malformed export is refused, never skipped). */
function exportRow(id: string): { [key: string]: unknown } {
  const rows = readFileSync(join(REPO, BEAD_EXPORT), "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index): unknown => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`${BEAD_EXPORT} line ${index + 1} does not parse`);
      }
    });
  const row = rows.find(entry => isObject(entry) && entry.id === id);
  if (!isObject(row)) throw new Error(`${id} is missing from ${BEAD_EXPORT}`);
  return row;
}
/** A clause's words: cut at white space, slashes, bars, commas, semicolons and parentheses; articles and conjunctions dropped. */
function wordsOf(text: string): string[] {
  return text.split(/[\s/|,;()]+/).filter(word => word !== "" && !STOP.includes(word));
}
interface Coverage {
  /** Covered phrases that are not verbatim spans of the clause. */
  readonly outside: string[];
  /** Clause words no pin of the row covers. */
  readonly uncovered: string[];
  /** Pins of the row that cover no word of their own. */
  readonly withoutOwnWord: string[];
}
/** One clause's coverage by the pins of the row whose label carries its letter (no such row: every word is uncovered). */
function coverageOf(clause: string, rows: readonly Row[], covers: Readonly<Record<string, readonly string[]>>): Coverage {
  const body = clause.replace(/^\([a-z]\) [a-z]+: /, "");
  const pins = rows.find(row => row.label.startsWith(clause.slice(0, 4)))?.pins ?? [];
  const wordsBy = new Map(pins.map(pin => [pin, new Set((covers[pin] ?? []).flatMap(wordsOf))]));
  const covered = new Set([...wordsBy.values()].flatMap(words => [...words]));
  const outside = pins.flatMap(pin => (covers[pin] ?? []).filter(phrase => !body.includes(phrase)));
  const uncovered = [...new Set(wordsOf(body).filter(word => !covered.has(word)))];
  const withoutOwnWord = pins.filter(pin => {
    const others = new Set(pins.filter(other => other !== pin).flatMap(other => [...(wordsBy.get(other) ?? [])]));
    return [...(wordsBy.get(pin) ?? [])].every(word => others.has(word));
  });
  return { outside, uncovered, withoutOwnWord };
}
interface AnchorReading {
  readonly clauses: string[];
  readonly nameDigests: string[];
  readonly labels: string[];
  readonly coverage: { [letter: string]: Coverage };
  readonly gate: string | null;
  readonly pinned: string[];
}
/** The outside anchor's reading of the export row's title and notes; first matches only, so an appended note never moves it. */
function anchorOf(title: string, notes: string, rows: readonly Row[] = ROWS, covers: Readonly<Record<string, readonly string[]>> = COVERS): AnchorReading {
  const acceptance = /^Acceptance: (.*)$/m.exec(notes)?.[1] ?? "";
  const texts = acceptance === "" ? [] : acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
  const first = texts[0] ?? "";
  const named = first.indexOf("census = 0 ");
  const names = named < 0 ? [] : first.slice(named + "census = 0 ".length).split(" ")[0]?.split("|") ?? [];
  // A name is written as its placeholder only when an IDENTIFIERS entry composes exactly that spelling.
  const placeholderOf = (name: string): string => IDENTIFIERS.find(identifier => spelled(identifier.words, identifier.canonical) === name)?.placeholder ?? name;
  const labels = texts.map(clause => names.reduce((text, name) => text.split(name).join(placeholderOf(name)), clause));
  return {
    clauses: labels.map(label => /^\(([a-z])\) /.exec(label)?.[1] ?? ""),
    nameDigests: names.map(sha256),
    labels,
    coverage: Object.fromEntries(labels.map(label => [label.charAt(1), coverageOf(label, rows, covers)])),
    gate: /\((gated: [^)]*)\)/.exec(title)?.[1] ?? null,
    pinned: [RI_PIN].filter(pin => title.includes(pin) && notes.includes(pin)),
  };
}

/** The Not-claimed lists of a census source's header (its leading block comment, line prefixes dropped): each sentence that opens
 * with the words "Not claimed" and a colon, read up to its closing period, split at its semicolons, in header order. */
function notClaimedOf(source: string): string[][] {
  const end = source.indexOf("*/");
  const header = (end < 0 ? "" : source.slice(0, end))
    .split("\n")
    .map(line => line.replace(/^\s*\/?\*+ ?/, ""))
    .join(" ")
    .replace(/\s+/g, " ");
  return [...header.matchAll(/Not claimed: (.+?)\.(?= [A-Z]|\s*$)/g)].map(match => (match[1] ?? "").split("; "));
}

/** `${pin}:${assertion count}`, pushed by each pin's case after its witness compares equal; the last case holds it to the roster. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const scan = scanOf("src");
    const allTs = scan.files.every(file => file.endsWith(".ts"));
    const floor = scan.files.length >= 100;
    const anchors: JsonObject = Object.fromEntries(PART_WORDS.map(word => {
      const whole = new RegExp(`\\b${word}\\b`);
      return [word, [...scan.texts.values()].some(text => whole.test(text))];
    }));
    const tracked = trackedOf("src");
    expect(floor, `src files ${scan.files.length}`).toBe(true);
    expect(scan.walk, "the src walk against what git would commit below src").toStrictEqual(AGREED);
    expect(tracked, floorNote("src")).toStrictEqual(FLOOR_HELD);
    expect(allTs, "a src file that is not a .ts module").toBe(true);
    expect(Object.values(anchors)).toEqual(PART_WORDS.map(() => true));
    expect(scan.sites, "a src site of one of the twelve spellings").toEqual([]);
    return { files: { floor, allTs }, walk: scan.walk, tracked, anchors, sites: [...scan.sites] };
  },
  A2: async () => {
    const test = scanOf("test");
    const qa = scanOf("qa");
    const own = (path: string): JsonObject => {
      const file = relative(REPO, path);
      const text = test.texts.get(file) ?? "";
      return { walked: test.files.includes(file), sites: sitesOf(file, text).length, placeholders: PLACEHOLDERS.filter(placeholder => text.includes(placeholder)).length };
    };
    const files = { test: test.files.length >= 450, qa: qa.files.length >= 55 };
    const ownFiles = { census: own(SELF_PATH), roster: own(ROSTER_PATH) };
    const sites = [...test.sites, ...qa.sites];
    const walks = { test: test.walk, qa: qa.walk };
    const tracked = { test: trackedOf("test"), qa: trackedOf("qa") };
    expect(files, `test files ${test.files.length}, qa files ${qa.files.length}`).toStrictEqual({ test: true, qa: true });
    expect(walks, "the test and qa walks against what git would commit below them").toStrictEqual({ test: AGREED, qa: AGREED });
    expect(tracked, `${floorNote("test")}; ${floorNote("qa")}`).toStrictEqual({ test: FLOOR_HELD, qa: FLOOR_HELD });
    expect(ownFiles).toStrictEqual({ census: { walked: true, sites: 0, placeholders: 4 }, roster: { walked: true, sites: 0, placeholders: 4 } });
    expect(sites, "a test or qa site of one of the twelve spellings").toEqual([]);
    return { files, walks, tracked, own: ownFiles, sites };
  },
  A3: async () => {
    const scan = scanOf("docs/workbench");
    const floor = scan.files.length >= 60;
    const allMarkdown = scan.files.every(file => file.endsWith(".md"));
    const tracked = trackedOf("docs/workbench");
    expect(floor, `docs/workbench files ${scan.files.length}`).toBe(true);
    expect(scan.walk, "the docs/workbench walk against what git would commit below it").toStrictEqual(AGREED);
    expect(tracked, floorNote("docs/workbench")).toStrictEqual(FLOOR_HELD);
    expect(allMarkdown).toBe(true);
    expect(scan.sites, "a docs/workbench site of one of the twelve spellings").toEqual([]);
    return { files: { floor, allMarkdown }, walk: scan.walk, tracked, sites: [...scan.sites] };
  },
  A4: async () => {
    const walked = SCAN_ROOTS.flatMap(root => [...scanOf(root).texts.entries()]);
    const echoFiles = walked.filter(([, text]) => text.includes(ECHO_KEY)).map(([file]) => file);
    const echoSites = walked.filter(([file]) => echoFiles.includes(file)).flatMap(([file, text]) => sitesOf(file, text));
    const echoFloor = echoFiles.length >= 7;
    const fixtureEcho = at(ENVELOPE, ECHO_PATH) ?? null;
    const rosterWalked = echoFiles.includes(relative(REPO, ROSTER_PATH));
    const inEchoKey = SPELLINGS.filter(spelling => ECHO_KEY.includes(spelling.text) || `sdk_versions.${ECHO_KEY}`.includes(spelling.text)).map(spelling => spelling.label);
    expect(echoFloor, `echo files ${echoFiles.length}`).toBe(true);
    expect(rosterWalked, "the fixture's own echo is among the files walked").toBe(true);
    expect(typeof fixtureEcho).toBe("string");
    expect(echoSites, "an echo file holding a site").toEqual([]);
    expect(inEchoKey).toEqual([]);
    return { echoFloor, rosterWalked, fixtureEcho, echoSites, inEchoKey };
  },
  A5: async () => {
    const read = (controls: Readonly<Record<string, () => string>>): JsonObject => Object.fromEntries(Object.entries(controls).map(([name, build]) => [name, siteCount(build())]));
    const flagged = read(A5_FLAGGED);
    const quiet = read(A5_QUIET);
    const residuals = read(A5_RESIDUALS);
    expect(Object.values(flagged).every(count => typeof count === "number" && count >= 1), JSON.stringify(flagged)).toBe(true);
    expect(Object.values(quiet)).toEqual(Object.keys(A5_QUIET).map(() => 0));
    expect(Object.values(residuals)).toEqual(Object.keys(A5_RESIDUALS).map(() => 0));
    return { flagged, quiet, residuals };
  },
  B1: async () => {
    const native = await nativeCarry(ENVELOPE);
    const injected = await injectedCarry(ENVELOPE);
    const projection = (carry: Carry): JsonObject => {
      const refs = evidenceRefsOf(carry.topology);
      const kinds = refs.map(ref => ref.slice(0, ref.indexOf(":")));
      const payloadRef = payloadRefOf(carry.topology) === `rf-output:sha256:${sha256(String(at(ENVELOPE, OUTPUT_TEXT)))}`;
      const echo = stringLeaves(carry.topology).filter(text => text.includes(ECHO_KEY)).length;
      const violations = violationsOf(carry, carry, null);
      expect(kinds).toEqual([...REF_KINDS]);
      expect(payloadRef).toBe(true);
      expect(echo).toBe(0);
      expect(violations).toEqual([]);
      return { kinds, payloadRef, echo, violations };
    };
    const spawn = native.spawns[0] ?? [];
    expect(native.spawns).toHaveLength(1);
    expect(spawn.slice(2, 4)).toEqual(["context", "render"]);
    expect(spawn).toContain("--no-commit");
    expect([native.verbatim, injected.verbatim, injected.calls]).toEqual([true, true, 1]);
    expect(Object.keys(native.carry.reading).sort()).toEqual([...READING_KEYS]);
    expect(Object.keys(injected.carry.reading).sort()).toEqual([...READING_KEYS]);
    return {
      native: { spawns: native.spawns.length, verb: spawn.slice(2, 4), noCommit: spawn.includes("--no-commit"), verbatim: native.verbatim, readingKeys: Object.keys(native.carry.reading).sort() },
      injected: { calls: injected.calls, verbatim: injected.verbatim, readingKeys: Object.keys(injected.carry.reading).sort() },
      projection: { [native.carry.seam]: projection(native.carry), [injected.carry.seam]: projection(injected.carry) },
    };
  },
  B2: async () => {
    const witness: JsonObject = {};
    for (const placement of PLACEMENTS) {
      const pristine = JSON.stringify(ENVELOPE);
      const variant = placed(ENVELOPE, placement);
      const diff = diffPaths(ENVELOPE, variant);
      const baseUntouched = JSON.stringify(ENVELOPE) === pristine;
      const seam = (carried: { carry: Carry; verbatim: boolean }): JsonObject => {
        const resource = canonical(at(carried.carry.reading.source, placement.path)) === canonical([RESOURCE]) ? "verbatim" : "changed";
        const tagKept = at(carried.carry.reading.source, [...placement.path, "0", "tag"]) === RESOURCE_TAG;
        const schemaKept = at(carried.carry.reading.source, [...placement.path, "0", "schema_version"]) === RESOURCE_SCHEMA_VERSION;
        const added = addedGenerative(carried.carry.reading.source, variant);
        const textKept = at(carried.carry.reading.source, OUTPUT_TEXT) === at(ENVELOPE, OUTPUT_TEXT);
        expect([carried.verbatim, resource, tagKept, schemaKept, textKept]).toEqual([true, "verbatim", true, true, true]);
        expect(added).toEqual([]);
        expect(Object.keys(carried.carry.reading).sort()).toEqual([...READING_KEYS]);
        return { verbatim: carried.verbatim, resource, tagKept, schemaKept, added, textKept };
      };
      const native = await nativeCarry(variant);
      const injected = await injectedCarry(variant);
      expect(diff).toEqual([placement.path.join(".")]);
      expect(baseUntouched).toBe(true);
      expect([native.spawns.length, injected.calls]).toEqual([1, 1]);
      witness[placement.id] = { diff, baseUntouched, native: { spawns: native.spawns.length, ...seam(native) }, injected: { calls: injected.calls, ...seam(injected) } };
    }
    return witness;
  },
  B3: async () => {
    const bases = { native: (await nativeCarry(ENVELOPE)).carry, injected: (await injectedCarry(ENVELOPE)).carry };
    const witness: JsonObject = {};
    for (const placement of PLACEMENTS) {
      const variant = placed(ENVELOPE, placement);
      const judge = (carry: Carry, base: Carry): JsonObject => {
        const identical = JSON.stringify(carry.topology) === JSON.stringify(base.topology);
        const namingRefs = evidenceRefsOf(carry.topology).filter(marked).length;
        const surfaced = surfacedOf(carry.topology);
        const violations = violationsOf(carry, base, placement);
        const reading: JsonObject = { identical, namingRefs, surfaced, violations };
        // One comparison, so a red always shows the whole reading: an adoption moves the projection by one ref and reads ref-count.
        expect(reading, `${placement.id} ${carry.seam}: ${JSON.stringify(reading)}`).toStrictEqual({ identical: true, namingRefs: 0, surfaced: [], violations: [] });
        return reading;
      };
      witness[placement.id] = {
        [bases.native.seam]: judge((await nativeCarry(variant)).carry, bases.native),
        [bases.injected.seam]: judge((await injectedCarry(variant)).carry, bases.injected),
      };
    }
    return witness;
  },
  B4: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), FIXTURE_ROOT);
    const descriptors = await nativeDescriptors();
    const injectedDescriptors = injected.catalogSnapshot().map(entry => entry.descriptor);
    const native = rfIds(descriptors);
    const injectedIds = rfIds(injectedDescriptors);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const all = [...descriptors, ...injectedDescriptors];
    const descriptorSites = all.flatMap(descriptor => sitesOf(`descriptor ${descriptor.id}`, JSON.stringify(descriptor)));
    const tsxDescriptors = all.filter(descriptor => TSX_SEAM.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
    const sections = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
    const dependencies = isObject(manifest) ? sections.flatMap(section => {
      const entries = manifest[section];
      return isObject(entries) ? Object.keys(entries) : [];
    }) : [];
    const sdkSeams = dependencies.filter(name => SDK_SEAM.test(name));
    // Non-vacuity: the selector read a catalog holding providers that are not rf, and the manifest names dependencies.
    const catalogRead = native.length > 0 && descriptors.length > native.length;
    const dependenciesRead = dependencies.length >= 3;
    expect([catalogRead, dependenciesRead], `native descriptors ${descriptors.length}, dependencies ${dependencies.length}`).toEqual([true, true]);
    expect([native, injectedIds, reconcile]).toStrictEqual([[PREVIEW_ID], [PREVIEW_ID], [PREVIEW_ID]]);
    expect(descriptorSites, "a registered descriptor spelling one of the twelve").toEqual([]);
    expect(tsxDescriptors, "a registered descriptor naming a TSX seam").toEqual([]);
    expect(sdkSeams, "a declared RI or TSX SDK dependency").toEqual([]);
    return { catalogRead, native, injected: injectedIds, reconcile, descriptorSites, tsxDescriptors, dependenciesRead, sdkSeams };
  },
  C1: async () => {
    const base = (await injectedCarry(ENVELOPE)).carry;
    const witness: JsonObject = {};
    for (const placement of PLACEMENTS) {
      const carry = (await injectedCarry(placed(ENVELOPE, placement))).carry;
      const foldText = violationsOf(readingMutant(carry, reading => {
        const output = objectOf(at(reading.source, ["result", "output"]), "output");
        output.text = `${String(output.text)}${JSON.stringify(RESOURCE.outcome)}\n`;
      }), base, placement);
      const foldNote = violationsOf(topologyMutant(carry, topology => {
        arrayOf(topology.diagnostics, "diagnostics").push(`decision ${RESOURCE_QUESTION}: ${RESOURCE_CANDIDATE}`);
      }), base, placement);
      expect(foldText).toEqual(["fold:output.text", "fold:payload-ref"]);
      expect(foldNote).toEqual(["surfaced"]);
      witness[placement.id] = { foldText, foldNote };
    }
    return witness;
  },
  C2: async () => {
    const base = (await injectedCarry(ENVELOPE)).carry;
    const placement = PLACEMENTS[0];
    if (placement === undefined) throw new Error("no placement");
    const carry = (await injectedCarry(placed(ENVELOPE, placement))).carry;
    const tags: JsonObject = { inference: "inference", previewContract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, caseVariant: RESOURCE_TAG.toUpperCase() };
    const resource: JsonObject = Object.fromEntries(Object.entries(tags).map(([name, tag]) => [name, violationsOf(readingMutant(carry, reading => {
      placedResource(reading, placement).tag = tag;
    }), base, placement)]));
    const withRef = (ref: string): string[] => violationsOf(topologyMutant(carry, topology => {
      const snapshot = snapshotsOf(topology)[0];
      if (snapshot === undefined) throw new Error("no snapshot");
      arrayOf(snapshot.evidenceRefs, "evidenceRefs").push(ref);
    }), base, placement);
    const ref = withRef(`rf-resource:inference:${RESOURCE_CANDIDATE}`);
    const adoption = withRef(`rf-resource:${RESOURCE_TAG}:${RESOURCE_CANDIDATE}`);
    expect(Object.values(resource)).toEqual(Object.keys(tags).map(() => ["retag:resource"]));
    expect(ref).toEqual(["ref-count", "retag:ref"]);
    expect(adoption, "the adoption simulation reads ref-count alone").toEqual(["ref-count"]);
    return { resource, ref, adoption };
  },
  C3: async () => {
    const base = (await injectedCarry(ENVELOPE)).carry;
    const placement = PLACEMENTS[0];
    if (placement === undefined) throw new Error("no placement");
    const carry = (await injectedCarry(placed(ENVELOPE, placement))).carry;
    const inResult = violationsOf(readingMutant(carry, reading => {
      objectOf(at(reading.source, ["result"]), "result").generative = generativeFrom(placedResource(reading, placement));
    }), base, placement);
    const readingKey = violationsOf({ ...carry, reading: { ...objectOf(json(carry.reading), "reading copy"), response: generativeFrom(RESOURCE) } }, base, placement);
    const projection = violationsOf(topologyMutant(carry, topology => {
      const snapshot = snapshotsOf(topology)[0];
      if (snapshot === undefined) throw new Error("no snapshot");
      snapshot.output = RESOURCE_CANDIDATE;
    }), base, placement);
    const typedModule = siteCount(`export const response: ${nameOf("<IR>", "pascal")} = generativeFrom(decision);`);
    // The projection mutant's output is the chosen candidate, so it surfaces the resource as well as adding a generative key.
    expect([inResult, readingKey, projection], JSON.stringify({ inResult, readingKey, projection })).toEqual([["generative"], ["generative"], ["generative", "surfaced"]]);
    expect(typedModule).toBe(1);
    return { inResult, readingKey, projection, typedModule };
  },
  C4: async () => {
    const base = (await injectedCarry(ENVELOPE)).carry;
    const [top, component] = PLACEMENTS;
    if (top === undefined || component === undefined) throw new Error("two placements");
    const carry = (await injectedCarry(placed(ENVELOPE, top))).carry;
    const quiet: JsonObject = {
      copy: violationsOf(readingMutant(carry, () => undefined), base, top),
      keyOrder: violationsOf(readingMutant(carry, reading => {
        reading.source = reversedKeys(reading.source ?? null);
      }), base, top),
      secondPlacement: violationsOf(readingMutant(carry, reading => {
        setAt(reading, ["source", ...component.path], [json(RESOURCE)]);
      }), base, top),
      unrelatedNote: violationsOf(topologyMutant(carry, topology => {
        arrayOf(topology.diagnostics, "diagnostics").push("an unrelated host note");
      }), base, top),
      tagAbsent: violationsOf(base, base, null),
    };
    expect(Object.values(quiet)).toEqual(Object.keys(quiet).map(() => []));
    return quiet;
  },
};

describe("wb-tz4r.1 RI decision resource census (RI-UNIFIED-DECISION-INFERENCE-R1, gated on RI-DEC-06/07, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:4"]);
    expect(ROWS.map(({ id, label, until, pins }) => ({ id, label, until: until ?? null, pins: pins.map(pin => ({ id: pin, covers: [...(COVERS[pin] ?? [])] })) }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, until, pins }) => ({ id, label, until, pins: pins.map(pin => ({ id: pin.id, covers: [...pin.covers] })) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(COVERS).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, rfVersion: RF_VERSION, riPin: RI_PIN, riProbe: RI_PROBE, tsxPin: TSX_PIN,
      identifiers: IDENTIFIERS.map(({ placeholder, words, canonical: convention }) => ({ placeholder, words: [...words], canonical: convention })),
      generativeKeys: [...GENERATIVE_KEYS], scanRoots: [...SCAN_ROOTS], placements: PLACEMENTS.map(({ id, path }) => ({ id, path: [...path] })), resource: RESOURCE,
    }).toStrictEqual({
      bead: ROSTER.bead, rfVersion: ROSTER.rfVersion, riPin: ROSTER.riPin, riProbe: ROSTER.riProbe, tsxPin: ROSTER.tsxPin,
      identifiers: ROSTER.identifiers.map(({ placeholder, words, canonical: convention }) => ({ placeholder, words: [...words], canonical: convention })),
      generativeKeys: [...ROSTER.generativeKeys], scanRoots: [...ROSTER.scanRoots], placements: ROSTER.placements.map(({ id, path }) => ({ id, path: [...path] })),
      resource: ROSTER.resource,
    });
    // The tracked floors (wb-w3tz): one roster entry per scan root, in order, so no root's walk goes unanchored outside this file.
    expect(ROSTER.walkFloors.roots.map(floor => floor.root), "one roster walk floor per scan root, in order").toEqual([...SCAN_ROOTS]);
    // The disclosures (wb-gbxz): every Not-claimed list of this file's header, in order, held to the roster, so a disclosure dropped
    // from the header, or one added to it without the roster, reds.
    expect(notClaimedOf(readFileSync(SELF_PATH, "utf8")), "the header's Not-claimed lists against the roster").toStrictEqual(ROSTER.notClaimed.map(list => [...list]));
    // The composed spellings are the acceptance's own names: each digest was taken from the bead's spelling at cut time.
    expect(IDENTIFIERS.map(identifier => sha256(spelled(identifier.words, identifier.canonical)))).toEqual(ROSTER.identifiers.map(entry => entry.sha256));
    expect(SPELLINGS).toHaveLength(12);
    expect(new Set(SPELLINGS.map(spelling => spelling.text)).size).toBe(12);
    // The fixture is the measured noncommitted preview, at the rewritten root, carrying the version echo.
    const result = objectOf(ENVELOPE.result, "fixture result");
    expect([ENVELOPE.schema, ENVELOPE.command, ENVELOPE.ok, ROSTER.exit, arrayOf(ENVELOPE.diagnostics, "diagnostics").length, ENVELOPE.transaction_id]).toEqual([RF_SCHEMA, RENDER_COMMAND, true, 0, 0, null]);
    expect([result.ephemeral, result.render_id, at(ENVELOPE, ["workspace", "root"]), at(ENVELOPE, ["result", "work", "storage_write_count"])]).toEqual([true, null, FIXTURE_ROOT, 0]);
    expect(at(ENVELOPE, ["result", "provenance", "cli_version"])).toBe(RF_VERSION);
    expect(PLACEMENTS.map(placement => at(ENVELOPE, placement.path))).toEqual(PLACEMENTS.map(() => undefined));
    expect(PLACEMENTS.map(placement => typeof at(ENVELOPE, placement.path.slice(0, -1)))).toEqual(PLACEMENTS.map(() => "object"));
  });

  it("the outside anchor: the bead's export row holds the clauses, the four names, every pin's words and the until-then gate", () => {
    const row = exportRow(BEAD);
    const title = typeof row.title === "string" ? row.title : "";
    const notes = typeof row.notes === "string" ? row.notes : "";
    const reading = anchorOf(title, notes);
    const quiet: Coverage = { outside: [], uncovered: [], withoutOwnWord: [] };
    expect(reading.clauses, "the export's acceptance clauses against the judged rows").toEqual(ROWS.map(entry => entry.label.charAt(1)));
    expect(reading.labels, "each clause, its names as placeholders, equals its row label").toEqual(ROWS.map(entry => entry.label));
    expect(reading.nameDigests, "the names the export spells against the composed spellings").toEqual(IDENTIFIERS.map(identifier => sha256(spelled(identifier.words, identifier.canonical))));
    expect(reading.nameDigests, "the names the export spells against the roster digests").toEqual(ROSTER.identifiers.map(entry => entry.sha256));
    expect(reading.coverage, "every clause word covered by its row's pins, each pin with a word of its own").toStrictEqual(Object.fromEntries(ROWS.map(entry => [entry.label.charAt(1), quiet])));
    expect(reading.gate, "the title's gating parenthetical").not.toBeNull();
    expect(ROWS.filter(entry => entry.until !== undefined).map(entry => [entry.id, entry.until?.includes(`(${reading.gate ?? ""})`) === true])).toEqual([["B", true]]);
    expect(reading.pinned, "the RI pin in the title and the notes").toEqual([RI_PIN]);
    // Quiet and flagged controls: an appended note that quotes another acceptance line leaves the reading unchanged; a word no
    // phrase covers and a pin dropped from its row each show in the coverage.
    const appended = anchorOf(title, `${notes}\nAcceptance: (a) a later quote; (b) another\n(gated: elsewhere)\n`);
    const rowC = reading.labels[2] ?? "";
    const extraWord = coverageOf(`${rowC} quantum`, ROWS, COVERS);
    const droppedPin = coverageOf(rowC, ROWS.map(entry => (entry.id === "C" ? { ...entry, pins: entry.pins.filter(pin => pin !== "C4") } : entry)), COVERS);
    expect({ appended: canonical(json(appended)) === canonical(json(reading)), extraWord, droppedPin }).toStrictEqual({
      appended: true,
      extraWord: { outside: [], uncovered: ["quantum"], withoutOwnWord: [] },
      droppedPin: { outside: [], uncovered: ["fails"], withoutOwnWord: [] },
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}${row.until === undefined ? "" : ` - ${row.until}`}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
