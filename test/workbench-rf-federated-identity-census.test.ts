/**
 * wb-o4h0.2 (RF-FEDERATED-WORKSPACES-R3), the absent-today leg. Statement (bead notes): "No Pi adapter shall equate a workspace
 * alias or filesystem path with a federated resource identity: Pi keys imported records by (workspace_id, backend_instance_id,
 * resource kind/id, definition digest), treats the same workspace_id with a different backend_instance_id as a different
 * authority, and treats source revisions as opaque per owner/stream - never ordering, differencing or merging revision counters
 * across unrelated origins, backend instances or epochs" (docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md
 * :5@6a251bf73af5). Acceptance, quoted: "(a) Pi identity/cache keys for imported records use (W,I,kind,id,digest); an alias
 * rename leaves identity-keyed state untouched; no code path keys a resource by locator path; (b) same-W-different-I fixtures
 * never collide in any Pi index nor share a revision ordering; (c) property test: comparators over observations from distinct
 * (W,I) or epochs return typed non-comparable or refuse; no sort/merge key concatenates revision counters across origins."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat): the
 * roster vendors three producer lines verbatim, each hashed here (EXCERPT_SHA256, `git show <pin>:<path> | sed -n '<n>p' |
 * sha256sum`): 03-protocol-and-storage.md:5 (ResourceRef = {schema,workspace_id,backend_instance_id,resource_kind,resource_id,
 * definition_digest}; ObservationRef adds source_revision and source_epoch; "No implementation equates an alias or path with a
 * global resource ID"), :50 (I02 "No source revision counter compared across unrelated origin domains") and
 * 01-requirements-decisions.md:37 (D03, the stable identity; "Friendly aliases are local, mutable names"). 03:10 names the
 * A-side link record reactive-fiber.federation-link/v1 {alias,locator,...}: the alias and the locator this census holds out of
 * every key. Gating (bead notes): ResourceRef/ObservationRef ship with FW-02 (rfc-0txnl.2) and FW-04 (rfc-0txnl.10); no served
 * rf envelope carries them yet, so Pi imports no federated record today.
 *
 * THE REFERENCE RULE (the rule a future import surface must match; no reader is added or faked here): an imported record's key is
 * identityKey, the JSON tuple of IDENTITY_FIELDS in that order (the ResourceRef fields after its own schema tag, the identity D03
 * names), riding as the id of identityRef; its revision rides as streamRevision, the JSON tuple (workspace_id,
 * backend_instance_id, source_epoch, source_revision), opaque and qualified by its stream; its authority rides as authorityRef,
 * the evidence ref naming (workspace_id, backend_instance_id), never the workspace alone; Pi hands the projection no producer
 * counter as a sequence (the projection orders a sequence per node key, and one node outlives an epoch), so its only ordering of
 * an import is its own capture clock; compareRevisions is the typed comparator, non-comparable across origins or epochs. Only
 * the display title follows the alias.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the vendored producer lines hash to EXCERPT_SHA256, and IDENTITY_FIELDS is ResourceRef's field list
 *    after its schema tag; A2 each identity field moves identityKey, the alias and the locator never do; A3 Pi's real
 *    ObservationProjection keeps one node through an alias rename and a locator move, its identity-keyed state (key, definition
 *    digest, version, evidence refs) unchanged and equal to the roster's (an alias- or locator-keyed ref splits it); A4 the
 *    shipped rf reader (reactivefiberTopology) keys one envelope read under two locators identically and writes neither locator
 *    into a key-bearing field (KEY_BEARING_FIELDS: the source ref's four parts, the evidence refs, both revisions, the payload
 *    reference, the definition digest and the stream position, cursor and sequence), and the two reads are of two distinct
 *    roots: the reader itself authorizes each read's own reading under its own locator and refuses it under the other as
 *    'authorization' (rootVerdicts, the reader's verdict per root), so reading one root twice reds; A5 no rf-scope src file
 *    (inRfScope) keys an rf resource by a locator-named expression in any of seven forms: an rf-tagged template interpolation,
 *    a key-like property (a KEY_NAMES name or a camelCase name ending in a KEY_SUFFIXES suffix, bare, quoted, or quoted inside
 *    a computed key), a Map or Set key (the first argument of a COLLECTION_METHODS call), a "+" join to a quoted rf tag, a
 *    computed property key, the key of an array-literal pair a Map, WeakMap or Object.fromEntries is built from, or an element
 *    access other than by a quoted property name (a single- or double-quoted literal, or a template literal with no
 *    interpolation). SRC_FLOOR, RF_SCOPE_FLOOR, RF_TEMPLATE_FLOOR and two token anchors (ANCHORS: the observer's context-preview
 *    and the provider's REACTIVE_FIBER_CONTRACT_SOURCE, each an rf-scope file whose matched text and whose read through the tree
 *    must carry its token) make an emptied or misdirected walk red; every rf-scope file but an in-memory plant has its own text
 *    on disk beside the walk (scopeOnDisk), and every rf-scope file is read in full: the text each scan matches must open with
 *    that disk text (scopeReadInFull), and that disk text must hold the whole file, its UTF-8 byte length equal to the size
 *    statSync reports for the file (scopeSized; wb-obyu F1: a size read apart from both text readers, as far as rows PC10, PC11
 *    and PC12 pin it - PC10 holds readRfScope's own size check, and PC12 the scan's own call, to a control file whose UTF-8
 *    decode is longer than its size, and PC11 holds sizeOnDisk's body and the whole declaration text of readRfScope and of
 *    scanRfScope to the roster - so a coordinated truncation of the tree's reader and the disk reader, at their bodies, at the
 *    readFileSync they share or at the scan's own call, reds). Not claimed, each a named residual with a pinned quiet row
 *    (RESIDUALS): the size check's two sides stepped in step with both text readers from outside every text PC11 reads, node:fs
 *    or Buffer patched or shadowed (R-SIZE-STEP, QP1), or a coordinated rewrite of both readers that keeps each file's byte
 *    length (R-SAME-LENGTH, QP2; the size anchor holds a file's length, not its content).
 *  B, acceptance (b). B1 the sameWorkspace pair differs in backend_instance_id alone and shares its alias, locator and raw
 *    revision; B2 identityKey separates it, every key in OTHER_KEYS merges it; B3 Pi's real projection holds it as two nodes in
 *    every identity-bearing index (the node index and a ref query, the version index, the evidence index), where the raw counter
 *    and a workspace-only evidence ref merge it (the kind, status, invocation and basis indexes group by attribute by design and
 *    carry no identity); B4 neither of the projection's orderings (the capture clock and a stated sequence) is shared across the
 *    pair (a workspace-keyed ref shares both).
 *  C, acceptance (c). C1 the property: over PROPERTY_CASES seeded pairs compareRevisions returns the typed non-comparable result
 *    for every cross-origin and cross-epoch pair (the raw-counter and epoch-blind comparators fail it); C2 streamRevision never
 *    merges two distinct stream points over the same pairs or two planted ones, while a concatenated key and a separator-joined
 *    key (opaque revisions may carry the separator) each merge a planted pair; C3 Pi's real projection admits a new epoch's
 *    lower revision under the reference rule and refuses it as out-of-order when the counter rides as a sequence; C4 the
 *    projection's own key is a tuple, never a concatenation; C5 no rf-scope src file joins a revision-named operand to another,
 *    by adjacent interpolations or by "+", either operand optionally scaled by "*" or "<<" and parenthesized (A5's floors,
 *    anchor and read-in-full check).
 *  MA and MC, the matchers rows A5 and C5 read: MA1-MA14 and MC1-MC8 the spellings each must catch; QA1-QA8, QS1 and QC1-QC9 the
 *    pinned quiet rows of their named residuals.
 *  MV, the matchers' vocabularies one member at a time, each driven from the roster's copy of its list: KP1 every KEY_NAMES name
 *    and KP2 every KEY_SUFFIXES suffix alone makes a key-like property in each KEY_SPELLINGS spelling (bare, double- or
 *    single-quoted, and quoted inside a computed key), MK1 every COLLECTION_METHODS method alone a Map or Set key,
 *    LW1 every LOCATOR_WORDS word alone is caught in each of A5's seven forms (LOCATOR_FORMS), RW1 every REVISION_WORDS word alone
 *    in each of C5's three forms (REVISION_FORMS).
 *  PC, a positive control on each live leg's instrument, driven through the very function the live leg calls: PC1 A3's state
 *    capture (projectStates, identityState) reports each of four planted single-field moves (key, definition digest, version,
 *    evidence refs) as exactly that field; PC2 A4's key-bearing projection (keyBearing, locatorIn) sees a locator planted into
 *    each KEY_BEARING_FIELDS field of the shipped reader's real snapshot, and none in the unplanted one; PC3 and PC4 the A5 and C5
 *    scan (scanRfScope) reports exactly the hits of an rf-scope file planted in memory beside the live tree, one spelling per
 *    form, each attributed to the planted path; PC5 A4's two-root judgment (judgeReads) reads the two real reads as keyed
 *    differently once each carries a key derived from its own reading's root and no literal locator (the root's sha256 as the
 *    source revision); PC6 and PC7 the A5 and C5 scan reports exactly the PC3 and PC4 plant appended in memory to the live
 *    text of each rf-scope file in turn, attributed to that file, so a scan that reads or matches only some rf-scope files reds,
 *    and the control plants into every rf-scope file of the walk and every anchor, bound twice (untargeted, the files and
 *    anchors it never planted into, and anchorReports, the plant hits it saw per anchor), so a control that plants into only
 *    some files reds; PC8 the scans' read-in-full check (readRfScope, the reading A5's and C5's instrument judges) reports each
 *    rf-scope file read one character short through the tree in turn as exactly that file, its anchors still read, every
 *    file still on disk and none unsized, so a check that compares nothing, or an empty or partial disk text, reds, its
 *    coverage bound twice like PC6's and PC7's (untargeted, and anchorsReadShort, the verdict per anchor); PC9 the scans' size
 *    check (readRfScope's size anchor) reports each rf-scope file read one character short through the tree and the disk
 *    reader together in turn as exactly that file, unsized and not unread (its matched text opens with the equally short disk
 *    text, so only the size anchor can see the cut), its anchors still read and every file still on disk, so a size check that
 *    compares nothing, or that compares against a text the reading holds (the disk text it is handed or the text the scan
 *    matched), reds (PC9, or PC8's none-unsized clause), its coverage bound twice like PC8's; PC10 readRfScope's own size
 *    check tells a file's size from a UTF-8 decode's byte length: an rf-scope control file whose bytes are not UTF-8 (one 0xff
 *    byte, which a UTF-8 decode reads as the three-byte replacement character), written into a tracked scratch directory and
 *    read beside the live tree through readRfScope with its own defaults, is reported as exactly that file unsized and nothing
 *    else (not unread, every anchor read, every file on disk, no hit), its size as sizeOnDisk reads it and the UTF-8 byte length
 *    of its text on disk held to the roster's counts, so a size anchor that takes the control's size as the UTF-8 byte length
 *    of a UTF-8 decode of it (diskText's or textOf's text, or readFileSync's in the utf8 encoding), in sizeOnDisk, as
 *    readRfScope's default or in readRfScope's comparison, reds (PC10; wb-obyu cut #2, the gate's U1) - PC10 never calls the
 *    scan, so one handed to readRfScope at the scan's own call is PC12's and PC11's - and one that takes such a text's UTF-16
 *    length reds A5 and C5 on the live tree (the observer carries non-ASCII characters); PC11 the size check's wiring, read
 *    parse-aware from this file's own text (the TypeScript parser, not a regular expression), so a re-derivation the control
 *    file of PC10 and PC12 cannot see (one keyed to the src tree's paths, say) reds too wherever it edits a text PC11 reads:
 *    sizeOnDisk's body is the statSync read alone; readRfScope's body names no text reader and no size reader (diskText,
 *    textOf, readFileSync, statSync, sizeOnDisk, liveTree, TextDecoder) but through its parameters, whose defaults are diskText
 *    and sizeOnDisk; every call spelled readRfScope(...) in scanRfScope's body hands it the matcher and the tree alone; the
 *    whole declaration of readRfScope and of scanRfScope (signature and body, every whitespace run collapsed to one space, the
 *    docstring outside it) is the roster's text, so any other edit of either - an aliased, parenthesized or .call callee at the
 *    scan's own call, a disk reader or size anchor handed there, a size check discarded or filtered there, a comparison stepped
 *    in readRfScope - reds, whatever paths it is keyed to; and readFileSync and statSync are bound in this file only as
 *    node:fs's own imports, unaliased (an assignment to a member of node:fs or of Buffer binds neither name: R-SIZE-STEP); PC12
 *    the scan itself refuses PC10's control: scanRfScope - rows A5's and C5's own instrument, through its own readRfScope call
 *    and that call's defaults - over the live tree plus the control file (written into its own tracked scratch directory), once
 *    with each live leg's matcher (locatorHits, revisionJoinHits), refuses at its size check, every check before it passing, and
 *    that check names exactly the control, so a scan whose own call takes the control's size from a UTF-8 decode of it, cuts
 *    both text readers there or discards its size check reds (PC12; wb-obyu cut #3, the gate's U1 on cut #2), while one keyed
 *    to the src tree's paths leaves the control alone and is PC11's; QP1 and QP2 the pinned quiet rows of the size check's two
 *    residuals: each rf-scope file in turn cut by the residual (QP1 read one character short through the tree, the disk reader
 *    and the size anchor together; QP2 its last character rewritten as another character of the same UTF-8 byte length through
 *    the tree and the disk reader together) reads quiet - not unread, not unsized, its anchors read and every file on disk -
 *    while the same cut with one reader left whole (the size anchor for QP1, the disk reader for QP2) reports exactly that file
 *    (unsized for QP1, unread for QP2), so either row reds when the reading sees its residual or never reads the cut, its
 *    coverage bound twice (untargeted, and anchorsQuiet, the verdict per anchor).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, IDENTITY_FIELDS, GATING_ARTIFACTS and the five matcher vocabularies, word for word - is
 * held to the out-of-file roster test/fixtures/rf-federated-identity-roster.json, whose producer excerpts are held to the pin by
 * hash. A pin deleted, relabelled, swapped for another passing case, or removed from every literal here at once still reds
 * against the roster. The last case holds REACHED, the pins that reached their witness compare in run order, to the roster's
 * pins in row order, so a pin whose test is not registered, is skipped or never reaches its compare reds. Not claimed: an edit
 * of this file and the roster together, or a case replaced by an echo of its own roster witness.
 * RESIDUALS (named, each with a pinned quiet row): R-INDIRECT a locator under a neutral name (QA1); R-CALL-BUILT an rf ref built
 * by a call such as Array.join (QA2); R-OUTSIDE-SCOPE a key built in a src file outside inRfScope is never scanned (QS1);
 * R-HOST-WORD a locator under the word host, which LOCATOR_WORDS leaves out because the rf reader names its own context object
 * host and reads it in key-like properties and element accesses (host.scope, host.invocationId, SEAM_LABEL[host.seam]) (QA3);
 * R-CALLBACK-KEY a collection keyed by a value a callback returns, spelled neither as a pair literal nor as a key method's
 * argument (QA4); R-CALL-JOIN counters joined by a call, Array.join (QC1) or String.prototype.concat (QC4); R-SYNONYM a counter
 * under a name outside REVISION_WORDS (QC2); R-PROSE two interpolations separated by whitespace read as display text, not a key
 * (QC3); R-ARITH-PACKED counters packed without "+", by a bitwise or (QC5); R-REFLECTIVE-KEY a locator handed to a reflective
 * write as its property key, Reflect.set (QA5) or Object.defineProperty (QA6); R-MID-TAG an rf tag that does not open its
 * template literal (QA7); R-SUFFIX-OUTSIDE a camelCase name whose suffix KEY_SUFFIXES leaves out, such as Keys (QA8);
 * R-CALL-OPERAND a "+" operand that is a call, epoch.toString() (QC6); R-EXPRESSION-SCALE an operand scaled by an expression,
 * not by an operand or a numeral, such as 2 ** 20 (QC7); R-TEMPLATE-PLUS two template literals joined by "+" (QC8); R-WIDE-GAP
 * two interpolations a whitespace-free gap of more than eight characters joins (QC9); R-SIZE-STEP the size check's two sides
 * brought back into step with both text readers' cut from outside every text PC11 reads: node:fs itself patched under the
 * census to cut the size statSync reports - by a setup module, by a module this file imports (a side-effect import included)
 * or from this file's own module scope (a default import of node:fs whose statSync is reassigned, the builtin ESM exports
 * synced) - or Buffer shadowed or patched to widen the byte length the check measures by the same count (a module-scope
 * Buffer binding or proxy, or an assignment to Buffer.byteLength), each leaving every binding, body and declaration text PC11
 * reads unchanged (QP1, which steps the size side; widening the measured side by the same count is the same comparison);
 * R-SAME-LENGTH a coordinated rewrite of both text readers that keeps each file's byte length, so a plant whose spelling both
 * readers rewrite at its own byte length is not seen (QP2). The matchers are lexical (regular expressions over the src text, no
 * parse): a spelling outside every form and residual named here is not claimed.
 * SCOPE: the excerpts are producer facts at 6a251bf73af5; Pi vendors no rf source, so a producer-side change is seen only when an
 * rf pin-bump re-reads them. The live legs are A4 (the shipped rf reader), A3, B3, B4, C3 and C4 (Pi's real projection) and A5
 * and C5 (the src tree), and row PC holds the positive controls of their instruments; A2, B2, C1 and C2 hold the reference rule
 * itself. wb-ldbz (the wb-o4h0.2 gate's follow-up, F1-F4) added rows MV and PC, pins MA9-MA12, QA3, QA4, MC7, MC8 and QC5, A4's
 * digest and stream-position fields, A3's state witness and the five roster vocabularies. wb-jnpc (the wb-ldbz gate's follow-up,
 * F1-F5) added A4's root witness, the scans' read-in-full check, pins MA13, MA14, QA5-QA8, QC6-QC9 and PC5-PC7, the KP1 and KP2
 * spellings and the REACHED tally. wb-xr81 (the wb-jnpc gate's follow-up, F1 and F2) added the second token anchor, the
 * scopeOnDisk check, the anchors' witness, PC6 and PC7's untargeted and anchorReports bindings and pin PC8. wb-obyu (the wb-xr81
 * gate's follow-up, F1) added the size anchor (scopeSized, statSync's size beside both text readers), the readings' unsized
 * binding and pin PC9; its cut #2 (the wb-obyu gate's refusal U1) added pins PC10 and PC11, the size anchor readRfScope takes
 * as a parameter, and the quiet rows QP1 and QP2 of the residuals R-SIZE-STEP and R-SAME-LENGTH; its cut #3 (refusal #2's U1
 * on cut #2, in the enumerate-the-resolvable form standing rule 19(c) binds) added pin PC12 and PC11's two declaration texts,
 * named R-SIZE-STEP's in-file and Buffer members, and restated A5's, PC10's and PC11's clauses to what PC10, PC11 and PC12 pin.
 *
 * Display paths added: none. Test-only: nothing is spawned; the files written are rows PC10's and PC12's controls, each into its
 * own tracked scratch directory (test/helpers/scratch.ts) its case removes; src, this file (row PC11) and this roster are only
 * read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
} from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federated-identity-roster.json");

/** sha256 of each vendored producer line at the pin, newline-terminated: `git show <pin>:<path> | sed -n '<n>p' | sha256sum`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  "docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md:5": "a4e66608a5bd831bc5874d89d4b125cc6eeb52631cbb927047fc916bcb7cecaf",
  "docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md:50": "6220ea4778ec41a06a16b248add42957b38365c57c9fc8dba979670a563a84eb",
  "docs/programs/federated-workspaces-2026-10-18/01-requirements-decisions.md:37": "e0c069677edbe4696b2746e7fdaa3b009df529684940abd9f99ae818041a6737",
};
/** The identity of an imported record: ResourceRef's fields after its schema tag (03:5), the identity D03 names (01:37). */
const IDENTITY_FIELDS = ["workspace_id", "backend_instance_id", "resource_kind", "resource_id", "definition_digest"] as const;
type IdentityField = (typeof IDENTITY_FIELDS)[number];
/** FW-02 and FW-04, which ship ResourceRef and ObservationRef (bead notes). */
const GATING_ARTIFACTS: readonly string[] = ["rfc-0txnl.2", "rfc-0txnl.10"];

const SCOPE: ObservationScope = { workspace: "/workspace/pi", principal: "local-operator:tester" };
const IMPORT_TYPE = "federated-import";
const IMPORT_KIND = "reactivefiber.federated-import.snapshot";
const STAMPS = ["2026-10-22T06:00:00Z", "2026-10-22T06:00:01Z", "2026-10-22T06:00:02Z"] as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) Pi identity/cache keys for imported records use (W,I,kind,id,digest); an alias rename leaves identity-keyed state untouched; no code path keys a resource by locator path",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) same-W-different-I fixtures never collide in any Pi index nor share a revision ordering",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) property test: comparators over observations from distinct (W,I) or epochs return typed non-comparable or refuse; no sort/merge key concatenates revision counters across origins",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "MA",
    label: "row A5's locator matcher catches every locator-named rf ref interpolation, key-like property, Map or Set key, rf-tag join, computed key, Map pair and element access, and its named residuals stay pinned quiet",
    pins: ["MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MA8", "MA9", "MA10", "MA11", "MA12", "MA13", "MA14", "QA1", "QA2", "QA3", "QA4", "QA5", "QA6", "QA7", "QA8", "QS1"],
  },
  {
    id: "MC",
    label: "row C5's revision-join matcher catches every revision-named interpolation pair, plus-join and scaled plus-join, and its named residuals stay pinned quiet",
    pins: ["MC1", "MC2", "MC3", "MC4", "MC5", "MC6", "MC7", "MC8", "QC1", "QC2", "QC3", "QC4", "QC5", "QC6", "QC7", "QC8", "QC9"],
  },
  {
    id: "MV",
    label: "rows A5's and C5's matchers read every vocabulary word, key-like property name, key suffix and collection method on its own, in every form, and each list is the roster's",
    pins: ["KP1", "KP2", "MK1", "LW1", "RW1"],
  },
  {
    id: "PC",
    label: "the live legs' instruments each report a planted violation: A3's state capture, A4's key-bearing projection and two-root judgment, and the A5 and C5 src scans over a planted file, over each live rf-scope file and over each rf-scope file read short through the tree alone or through the tree and the disk reader together and over an rf-scope control file whose bytes are not UTF-8, the size anchor's wiring reads as this file's text states, and the size check's two named residuals stay pinned quiet",
    pins: ["PC1", "PC2", "PC3", "PC4", "PC5", "PC6", "PC7", "PC8", "PC9", "PC10", "PC11", "PC12", "QP1", "QP2"],
  },
];

/** One imported record: the A-side alias and locator it is read under (federation-link/v1, 03:10), its ResourceRef identity and
 * the ObservationRef stream fields of the observation. */
interface ImportedRecord {
  readonly alias: string;
  readonly locator: string;
  readonly resource: Readonly<Record<IdentityField, string>>;
  readonly observation: { readonly source_epoch: string; readonly source_revision: string };
}
interface Excerpt {
  readonly at: string;
  readonly line: string;
}
interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly excerpts: readonly Excerpt[];
  readonly identityFields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  /** The matcher vocabularies rows A5 and C5 read, each held here word by word (row MV). */
  readonly locatorWords: readonly string[];
  readonly revisionWords: readonly string[];
  readonly keyNames: readonly string[];
  readonly keySuffixes: readonly string[];
  readonly collectionMethods: readonly string[];
  readonly sameWorkspace: readonly ImportedRecord[];
  readonly aliasRename: readonly ImportedRecord[];
  readonly epochs: readonly ImportedRecord[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function importedRecords(value: unknown, field: string): ImportedRecord[] {
  if (!Array.isArray(value)) throw new Error(`roster ${field} must be a list`);
  return value.map((entry: unknown, index: number): ImportedRecord => {
    const at = `${field}[${index}]`;
    if (!isObject(entry) || !isObject(entry.resource) || !isObject(entry.observation)) throw new Error(`roster ${at} needs a resource and an observation`);
    const { resource, observation } = entry;
    return {
      alias: text(entry.alias, `${at}.alias`),
      locator: text(entry.locator, `${at}.locator`),
      resource: {
        workspace_id: text(resource.workspace_id, `${at}.resource.workspace_id`),
        backend_instance_id: text(resource.backend_instance_id, `${at}.resource.backend_instance_id`),
        resource_kind: text(resource.resource_kind, `${at}.resource.resource_kind`),
        resource_id: text(resource.resource_id, `${at}.resource.resource_id`),
        definition_digest: text(resource.definition_digest, `${at}.resource.definition_digest`),
      },
      observation: {
        source_epoch: text(observation.source_epoch, `${at}.observation.source_epoch`),
        source_revision: text(observation.source_revision, `${at}.observation.source_revision`),
      },
    };
  });
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.excerpts) || !isObject(raw.records)) {
    throw new Error("roster must be an object with rows, excerpts and records");
  }
  const excerpts = raw.excerpts.map((entry: unknown, index: number): Excerpt => {
    if (!isObject(entry)) throw new Error(`roster excerpts[${index}] must be an object`);
    return { at: text(entry.at, `excerpts[${index}].at`), line: text(entry.line, `excerpts[${index}].line`) };
  });
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  const { records } = raw;
  return {
    excerpts,
    identityFields: strings(raw.identityFields, "identityFields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    locatorWords: strings(raw.locatorWords, "locatorWords"),
    revisionWords: strings(raw.revisionWords, "revisionWords"),
    keyNames: strings(raw.keyNames, "keyNames"),
    keySuffixes: strings(raw.keySuffixes, "keySuffixes"),
    collectionMethods: strings(raw.collectionMethods, "collectionMethods"),
    sameWorkspace: importedRecords(records.sameWorkspace, "records.sameWorkspace"),
    aliasRename: importedRecords(records.aliasRename, "records.aliasRename"),
    epochs: importedRecords(records.epochs, "records.epochs"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function excerpt(suffix: string): string {
  const found = ROSTER.excerpts.find(entry => entry.at.endsWith(suffix));
  if (found === undefined) throw new Error(`the roster vendors no ${suffix}`);
  return found.line;
}
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");

// The reference rule.
type Key = (record: ImportedRecord) => string;
const identityKey: Key = record => JSON.stringify(IDENTITY_FIELDS.map(field => record.resource[field]));
const identityRef = (record: ImportedRecord): NativeRef => ({ provider: "reactivefiber", type: IMPORT_TYPE, id: identityKey(record) });
/** One observation's place in its stream: the origin (W, I), the epoch and the opaque revision. */
interface StreamPoint {
  readonly workspace_id: string;
  readonly backend_instance_id: string;
  readonly source_epoch: string;
  readonly source_revision: string;
}
const pointOf = (record: ImportedRecord): StreamPoint => ({
  workspace_id: record.resource.workspace_id,
  backend_instance_id: record.resource.backend_instance_id,
  source_epoch: record.observation.source_epoch,
  source_revision: record.observation.source_revision,
});
const streamKey = (point: StreamPoint): string =>
  JSON.stringify([point.workspace_id, point.backend_instance_id, point.source_epoch, point.source_revision]);
const streamRevision = (record: ImportedRecord): string => streamKey(pointOf(record));
/** The record's authority as an evidence ref: (workspace_id, backend_instance_id) as a JSON tuple, never the workspace alone. */
const authorityRef = (record: ImportedRecord): string =>
  `rf-authority:${JSON.stringify([record.resource.workspace_id, record.resource.backend_instance_id])}`;
type Comparison =
  | { readonly comparable: true; readonly sameRevision: boolean }
  | { readonly comparable: false; readonly reason: "distinct-origin" | "distinct-epoch" };
type Comparator = (a: StreamPoint, b: StreamPoint) => Comparison;
/** The typed comparator: a revision is opaque per owner/stream, so two points compare only inside one (W, I, epoch) stream. */
const compareRevisions: Comparator = (a, b) => {
  if (a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id) return { comparable: false, reason: "distinct-origin" };
  if (a.source_epoch !== b.source_epoch) return { comparable: false, reason: "distinct-epoch" };
  return { comparable: true, sameRevision: a.source_revision === b.source_revision };
};

function snapshotOf(
  record: ImportedRecord,
  capturedAt: string,
  source: NativeRef = identityRef(record),
  revision: string = streamRevision(record),
  evidence: string = authorityRef(record),
): NativeSnapshot {
  return {
    source,
    scope: { ...SCOPE },
    capturedAt,
    observedAt: capturedAt,
    node: { title: `rf import ${record.alias}`, type: "sdk-operation", statusText: "observed", statusTone: "success" },
    kind: IMPORT_KIND,
    definitionDigest: record.resource.definition_digest,
    sourceRevision: revision,
    evidenceRefs: [evidence],
  };
}
function eventOf(record: ImportedRecord, sequence: number, source: NativeRef): ObservationEvent {
  return {
    projectionEventId: `import-${record.resource.backend_instance_id}-${sequence}`,
    source,
    scope: { ...SCOPE },
    sourceSequence: sequence,
    observedAt: STAMPS[0],
    kind: "reactivefiber.federated-import.event",
  };
}
const nodesOf = (projection: ObservationProjection) => projection.query({ scope: SCOPE, limit: 20, kind: IMPORT_KIND }).nodes;
/** Row A3's reading of one node, its identity-keyed state: the key, definition digest, version and evidence refs. */
const STATE_FIELDS = ["key", "definitionDigest", "sourceVersion", "evidenceRefs"] as const;
type StateField = (typeof STATE_FIELDS)[number];
function identityState(node: ObservedNode | undefined): Json {
  return node === undefined
    ? null
    : { key: node.key, definitionDigest: node.definitionDigest ?? null, sourceVersion: node.sourceVersion ?? null, evidenceRefs: [...node.evidenceRefs] };
}
interface StateReading {
  readonly outcomes: readonly string[];
  readonly nodes: number;
  readonly state: readonly Json[];
}
/** Row A3's instrument: refreshes each snapshot into one fresh projection and reads back the state of the node its source names.
 * Row PC1 drives the same instrument with planted state moves. */
function projectStates(snapshots: readonly NativeSnapshot[]): StateReading {
  const projection = new ObservationProjection();
  const state: Json[] = [];
  const outcomes = snapshots.map(snapshot => {
    const outcome = projection.refresh(snapshot);
    state.push(identityState(nodesOf(projection).find(entry => entry.nativeRef.id === snapshot.source.id)));
    return outcome;
  });
  return { outcomes, nodes: nodesOf(projection).length, state };
}
/** The state fields two readings disagree on, read field by field. */
function movedFields(before: Json | undefined, after: Json | undefined): StateField[] {
  const field = (reading: Json | undefined, name: StateField): string => JSON.stringify(isObject(reading) ? (reading[name] ?? null) : null);
  return STATE_FIELDS.filter(name => field(before, name) !== field(after, name));
}
const identities = (records: readonly ImportedRecord[], key: Key): number => new Set(records.map(key)).size;
/** B2's keys, each short of the identity or beside it: every one must merge the sameWorkspace pair. */
const OTHER_KEYS: Readonly<Record<string, Key>> = {
  workspaceOnly: record => JSON.stringify([record.resource.workspace_id]),
  withoutInstance: record => JSON.stringify(IDENTITY_FIELDS.filter(field => field !== "backend_instance_id").map(field => record.resource[field])),
  alias: record => record.alias,
  locator: record => record.locator,
};
const workspaceRef = (record: ImportedRecord): NativeRef => ({ provider: "reactivefiber", type: IMPORT_TYPE, id: OTHER_KEYS.workspaceOnly?.(record) ?? "" });

// The seeded property generator (mulberry32): small pools, so every class and every naive collision is reached.
const PROPERTY_SEED = 20261022;
const PROPERTY_CASES = 600;
const WORKSPACE_POOL = [`rfw_peer${"a".repeat(22)}`, `rfw_alpha${"e".repeat(21)}`];
const INSTANCE_POOL = [`rfi_one${"b".repeat(23)}`, `rfi_two${"c".repeat(23)}`, `rfi_three${"g".repeat(21)}`];
const EPOCH_POOL = ["1", "12"];
const REVISION_POOL = ["3", "7", "23"];
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}
function propertyPairs(): [StreamPoint, StreamPoint][] {
  const random = mulberry32(PROPERTY_SEED);
  const pick = (pool: readonly string[]): string => pool[Math.floor(random() * pool.length)] ?? "";
  const point = (): StreamPoint => ({
    workspace_id: pick(WORKSPACE_POOL),
    backend_instance_id: pick(INSTANCE_POOL),
    source_epoch: pick(EPOCH_POOL),
    source_revision: pick(REVISION_POOL),
  });
  return Array.from({ length: PROPERTY_CASES }, (): [StreamPoint, StreamPoint] => [point(), point()]);
}
type PairClass = "distinct-origin" | "distinct-epoch" | "same-stream";
/** The class of a pair read from string keys, independently of any comparator's field tests. */
function classOf(a: StreamPoint, b: StreamPoint): PairClass {
  const origin = (point: StreamPoint): string => JSON.stringify([point.workspace_id, point.backend_instance_id]);
  if (origin(a) !== origin(b)) return "distinct-origin";
  return a.source_epoch === b.source_epoch ? "same-stream" : "distinct-epoch";
}
function violations(comparator: Comparator, pairs: readonly [StreamPoint, StreamPoint][]): number {
  return pairs.filter(([a, b]) => {
    const expected = classOf(a, b);
    const got = comparator(a, b);
    if (expected === "same-stream") return !got.comparable || got.sameRevision !== (a.source_revision === b.source_revision);
    return got.comparable || got.reason !== expected;
  }).length;
}
/** C1's failing comparators: one orders the raw counters of any two points, one checks the origin and forgets the epoch. */
const rawCounter: Comparator = (a, b) => ({ comparable: true, sameRevision: a.source_revision === b.source_revision });
const epochBlind: Comparator = (a, b) =>
  a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id
    ? { comparable: false, reason: "distinct-origin" }
    : { comparable: true, sameRevision: a.source_revision === b.source_revision };
const concatenatedKey = (point: StreamPoint): string =>
  `${point.workspace_id}${point.backend_instance_id}${point.source_epoch}${point.source_revision}`;
/** The same parts joined by a separator: opaque epochs and revisions may carry it, so it merges distinct points too. */
const separatedKey = (point: StreamPoint): string =>
  [point.workspace_id, point.backend_instance_id, point.source_epoch, point.source_revision].join(":");
/** Two stream points differ when any of their four fields does, read field by field and never through a key under test. */
const distinctPoints = (a: StreamPoint, b: StreamPoint): boolean =>
  a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id || a.source_epoch !== b.source_epoch || a.source_revision !== b.source_revision;
/** Pairs of distinct stream points one key merges. */
function collisions(key: (point: StreamPoint) => string, pairs: readonly [StreamPoint, StreamPoint][]): number {
  return pairs.filter(([a, b]) => distinctPoints(a, b) && key(a) === key(b)).length;
}

// The src scans (rows A5 and C5) and their matchers.
const SRC = join(REPO, "src");
/** Floors below the counts measured at base 0b2a80f (src 115 files; rf scope 2 files; 8 rf-tagged templates), so an emptied or
 * misdirected walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const RF_SCOPE_FLOOR = 2;
const RF_TEMPLATE_FLOOR = 6;
const ANCHOR_FILE = join(SRC, "workbench", "reactivefiber-observer.ts");
const ANCHOR_TOKEN = "context-preview";
/** A token anchor: an rf-scope file a scan must read, held by a token the file carries. */
interface Anchor {
  readonly file: string;
  readonly token: string;
}
/** The scans' token anchors, one per rf-scope file at base (wb-xr81 F1): the observer, and the provider with its exported
 * contract-source carrier, so a tree that reads one rf-scope file in full and another short reds even with the disk reading
 * hollowed. */
const ANCHORS: readonly Anchor[] = [
  { file: ANCHOR_FILE, token: ANCHOR_TOKEN },
  { file: join(SRC, "workbench", "providers", "reactivefiber.ts"), token: "REACTIVE_FIBER_CONTRACT_SOURCE" },
];
/** The rf adapter files: a src script whose name names the rf provider or federation, or carries an "rf" name token. */
const RF_NAME = /reactivefiber|federat/;
const SCRIPT = /\.[cm]?[jt]s$/;
function inRfScope(path: string): boolean {
  const name = basename(path);
  if (!SCRIPT.test(name)) return false;
  const stem = name.replace(SCRIPT, "");
  return RF_NAME.test(stem) || stem.split(/[-_.]/).includes("rf");
}
const OPEN = "$" + "{";
const TICK = "`";
const interpolate = (expression: string): string => `${OPEN}${expression}}`;
const LOCATOR_WORDS: ReadonlySet<string> = new Set([
  "root", "roots", "path", "paths", "pathname", "filepath", "filename", "file", "files", "dir", "dirs", "dirname", "workdir", "cwd", "locator", "locators",
  "loc", "alias", "aliases", "location", "folder", "mount", "mountpoint", "url", "uri", "href", "endpoint", "address", "addr", "hostname", "socket", "realpath",
]);
const REVISION_WORDS: ReadonlySet<string> = new Set(["revision", "revisions", "rev", "sequence", "seq", "epoch", "cursor", "counter"]);
const camelCase = (name: string): string => name.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
/** Row A5's key-like property names: the generic key words, then IDENTITY_FIELDS in snake_case and in camelCase (row KP1). */
const KEY_NAMES: readonly string[] = ["id", "scope", "key", "ref", "identity", "digest", "cursor", "sequence", ...IDENTITY_FIELDS, ...IDENTITY_FIELDS.map(camelCase)];
/** Row A5's key-like camelCase suffixes: a property named <word><suffix> is key-like (row KP2). */
const KEY_SUFFIXES: readonly string[] = ["Id", "Key", "Ref", "Refs", "Digest"];
/** Row A5's Map and Set methods whose first argument is a key (row MK1). */
const COLLECTION_METHODS: readonly string[] = ["set", "get", "has", "delete", "add"];
/** Rows KP1 and KP2's spellings of a key-like property name: bare, double- or single-quoted, and quoted inside a computed key. */
const KEY_SPELLINGS: Readonly<Record<string, (name: string) => string>> = {
  bare: name => name,
  quoted: name => `"${name}"`,
  singleQuoted: name => `'${name}'`,
  computed: name => `["${name}"]`,
  computedSingle: name => `['${name}']`,
  computedTemplate: name => `[${TICK}${name}${TICK}]`,
};
/** An expression's identifier words, camelCase and snake_case split, lowercased. */
const words = (expression: string): string[] =>
  expression.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 0);
const namesLocator = (expression: string): boolean => words(expression).some(word => LOCATOR_WORDS.has(word));
const namesRevision = (expression: string): boolean => words(expression).some(word => REVISION_WORDS.has(word));
interface Interpolation {
  readonly start: number;
  readonly end: number;
  readonly expression: string;
}
/** The interpolation opening at `start`, braces balanced. */
function interpolationAt(source: string, start: number): Interpolation {
  let depth = 1;
  let end = start + OPEN.length;
  while (end < source.length && depth > 0) {
    const unit = source.charAt(end);
    if (unit === "{") depth++;
    else if (unit === "}") depth--;
    end++;
  }
  return { start, end, expression: source.slice(start + OPEN.length, end - 1) };
}
function interpolations(source: string): Interpolation[] {
  const found: Interpolation[] = [];
  for (let at = source.indexOf(OPEN); at !== -1; ) {
    const next = interpolationAt(source, at);
    found.push(next);
    at = source.indexOf(OPEN, next.end);
  }
  return found;
}
const RF_TAG = /`rf-[a-z0-9-]+:/g;
/** Each rf-tagged template literal's interpolated expressions, up to its closing backtick. */
function rfTemplates(source: string): string[][] {
  return [...source.matchAll(RF_TAG)].map(match => {
    const expressions: string[] = [];
    let at = (match.index ?? 0) + 1;
    while (at < source.length && source.charAt(at) !== TICK) {
      if (source.startsWith(OPEN, at)) {
        const next = interpolationAt(source, at);
        expressions.push(next.expression);
        at = next.end;
      } else at++;
    }
    return expressions;
  });
}
/** A key-like property name: a KEY_NAMES name, or any camelCase name ending in a KEY_SUFFIXES suffix. */
const KEY_NAME = `(?:${KEY_NAMES.join("|")}|[a-z][A-Za-z0-9]*(?:${KEY_SUFFIXES.join("|")}))`;
/** A key-like property: its name bare or quoted, or quoted inside a computed key (["id"]: ...), and the value it is given. */
const KEY_PROPERTY = new RegExp(String.raw`(?:\b${KEY_NAME}['"]?|\[\s*(?:'${KEY_NAME}'|"${KEY_NAME}"|${TICK}${KEY_NAME}${TICK})\s*\])\s*:\s*([^,;}\n]*)`, "g");
/** A Map or Set key: the first argument of a COLLECTION_METHODS call. */
const MAP_KEY = new RegExp(String.raw`\.(?:${COLLECTION_METHODS.join("|")})\(\s*([^,)\n]+)`, "g");
/** An rf-tagged ref built by "+": a quoted rf tag and the operand appended to it. */
const RF_TAG_PLUS = /(['"])rf-[a-z0-9-]+:[^'"\n]*\1\s*\+\s*([^;,)\n]+)/g;
/** A computed property key: a bracketed expression an object literal opens with "{" or "," and closes with ":". */
const COMPUTED_KEY = /[{,]\s*\[\s*([^[\]\n]+?)\s*\]\s*:/g;
/** An element access: a bracketed expression right after an identifier, a call, an index or "?.". */
const INDEX_KEY = /(?:[\w$)\]]|\?\.)\[\s*([^[\]\n]+?)\s*\]/g;
/** A quoted literal in an element access names a property, not a key value: a single- or double-quoted literal, or a template
 * literal with no interpolation (an interpolating template is an expression, read like any other). */
const QUOTED = /^(?:(['"])[^'"`]*\1|`(?:[^'"`$]|\$(?!\{))*`)$/;
/** The collections built from [key, value] pairs: a Map or WeakMap constructor and Object.fromEntries. */
const PAIR_OPENER = /\bnew\s+(?:Map|WeakMap)\s*(?:<[^()]*>)?\s*\(|\bObject\.fromEntries\s*\(/g;
/** The key of an array-literal pair: its first element, up to the first comma. */
const PAIR_KEY = /\[\s*([^,[\]\n]+?)\s*,/g;
/** The argument text of each pair-built collection, parentheses balanced. */
function pairSpans(source: string): string[] {
  return [...source.matchAll(PAIR_OPENER)].map(match => {
    const start = (match.index ?? 0) + match[0].length;
    let depth = 1;
    let end = start;
    while (end < source.length && depth > 0) {
      const unit = source.charAt(end);
      if (unit === "(") depth++;
      else if (unit === ")") depth--;
      end++;
    }
    return source.slice(start, end - 1);
  });
}
/** Row A5's matcher: every locator-named expression an rf-tagged template interpolates, a key-like property reads, a Map or Set
 * is keyed by, a quoted rf tag is joined to with "+", a computed property key holds, a pair-built collection takes as a pair's
 * key, or an element access reads by. */
function locatorHits(source: string): string[] {
  const templated = rfTemplates(source).flatMap(expressions => expressions.filter(namesLocator)).map(expression => `template ${expression.trim()}`);
  const read = (pattern: RegExp, group: number, form: string, text: string = source): string[] =>
    [...text.matchAll(pattern)].map(match => match[group] ?? "").filter(namesLocator).map(expression => `${form} ${expression.trim()}`);
  const indexed = read(INDEX_KEY, 1, "index").filter(hit => !QUOTED.test(hit.slice("index ".length)));
  return [
    ...templated,
    ...read(KEY_PROPERTY, 1, "key"),
    ...read(MAP_KEY, 1, "map"),
    ...read(RF_TAG_PLUS, 2, "plus"),
    ...read(COMPUTED_KEY, 1, "computed"),
    ...pairSpans(source).flatMap(span => read(PAIR_KEY, 1, "pair", span)),
    ...indexed,
  ];
}
/** A "+" operand: an identifier or member chain, optionally scaled by "*" or "<<" by another one or a numeral, optionally
 * parenthesized. Arithmetic on a literal alone never reads as a join. */
const OPERAND = String.raw`[A-Za-z_$][\w$]*(?:\??\.[A-Za-z_$][\w$]*)*`;
const SCALED_OPERAND = String.raw`\(?\s*(${OPERAND}(?:\s*(?:\*|<<)\s*(?:${OPERAND}|\d[\d_]*))?)\s*\)?`;
/** Two operands joined by "+", directly or around one quoted separator. */
const PLUS_JOIN = new RegExp(String.raw`${SCALED_OPERAND}\s*\+\s*(?:(?:'[^'\n]*'|"[^"\n]*")\s*\+\s*)?${SCALED_OPERAND}`, "g");
/** Row C5's matcher: two interpolations a short, whitespace-free gap joins, or two operands joined by "+", at least one of them
 * revision-named. */
function revisionJoinHits(source: string): string[] {
  const found = interpolations(source);
  const templated = found.slice(1).flatMap((next, index) => {
    const previous = found[index];
    if (previous === undefined || !/^[^`\s]{0,8}$/.test(source.slice(previous.end, next.start))) return [];
    return namesRevision(previous.expression) || namesRevision(next.expression) ? [`${previous.expression.trim()} | ${next.expression.trim()}`] : [];
  });
  const joined = [...source.matchAll(PLUS_JOIN)]
    .filter(match => namesRevision(match[1] ?? "") || namesRevision(match[2] ?? ""))
    .map(match => `${match[1] ?? ""} + ${match[2] ?? ""}`);
  return [...templated, ...joined];
}
const sameHits = (got: readonly string[], want: readonly string[]): boolean => JSON.stringify(got) === JSON.stringify(want);
/** Rows KP1 and KP2's reading: each name, in each KEY_SPELLINGS spelling, makes exactly one key-like property hit. */
const keySpellingMisses = (names: readonly string[]): string[] =>
  names.flatMap(name =>
    Object.entries(KEY_SPELLINGS)
      .filter(([, spell]) => !sameHits(locatorHits(`const ref = { ${spell(name)}: link.locator };`), ["key link.locator"]))
      .map(([spelling]) => `${name}/${spelling}`),
  );
/** Row A5's forms, each spelled around one expression; the hit it must read is `<form> <expression>` (rows LW1 and PC3). */
const LOCATOR_FORMS: Readonly<Record<string, (expression: string) => string>> = {
  template: expression => `${TICK}rf-link:${interpolate(expression)}${TICK}`,
  key: expression => `const ref = { id: ${expression} };`,
  map: expression => `index.get(${expression});`,
  plus: expression => `const ref = 'rf-link:' + ${expression};`,
  computed: expression => `const entry = { [${expression}]: record };`,
  pair: expression => `const index = new Map([[${expression}, record]]);`,
  index: expression => `byLocator[${expression}] = record;`,
};
interface RevisionForm {
  readonly spell: (expression: string) => string;
  readonly hit: (expression: string) => string;
}
/** Row C5's forms, each spelled around one revision-named expression beside a neutral operand, with the hit it must read
 * (row RW1). */
const REVISION_FORMS: Readonly<Record<string, RevisionForm>> = {
  interpolation: {
    spell: expression => `${TICK}${interpolate("point.workspaceId")}:${interpolate(expression)}${TICK}`,
    hit: expression => `point.workspaceId | ${expression}`,
  },
  plus: { spell: expression => `const key = point.workspaceId + ${expression};`, hit: expression => `point.workspaceId + ${expression}` },
  scaled: { spell: expression => `const key = ${expression} * 1000000 + point.workspaceId;`, hit: expression => `${expression} * 1000000 + point.workspaceId` },
};
/** Row PC3's plant: one locator-keyed spelling per row A5 form, each on its own line and under its own locator word. */
const LOCATOR_PLANT = [
  `export const a = (link: L) => ${TICK}rf-link:${interpolate("link.locator")}${TICK};`,
  "export const b = (link: L) => ({ id: link.path });",
  "export const c = (index: M, link: L) => index.get(link.alias);",
  "export const d = (workspace: W) => 'rf-workspace:' + workspace.root;",
  "export const e = (link: L, record: R) => ({ [link.url]: record });",
  "export const f = (links: L[], record: R) => new Map(links.map(link => [link.href, record]));",
  "export const g = (byLocator: O, link: L, record: R) => { byLocator[link.uri] = record; };",
].join("\n");
const LOCATOR_PLANT_HITS = ["template link.locator", "key link.path", "map link.alias", "plus workspace.root", "computed link.url", "pair link.href", "index link.uri"];
/** Row PC4's plant: one revision join per row C5 form. */
const REVISION_PLANT = [
  `export const a = (point: P) => ${TICK}${interpolate("point.workspaceId")}:${interpolate("point.revision")}${TICK};`,
  "export const b = (point: P) => point.workspaceId + point.epoch;",
  "export const c = (point: P) => point.epoch * 1000000 + point.revision;",
].join("\n");
const REVISION_PLANT_HITS = ["point.workspaceId | point.revision", "point.workspaceId + point.epoch", "point.epoch * 1000000 + point.revision"];

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
/** The src files a scan reads and how it reads them: the live tree, or the live tree plus one planted file (row PC). */
interface SrcTree {
  readonly files: readonly string[];
  readonly read: (path: string) => string;
  /** The files the tree holds only in memory (rows PC3 and PC4's plant): the only scoped files with no text on disk. */
  readonly planted?: readonly string[];
}
const liveTree = (): SrcTree => ({ files: filesBelow(SRC), read: textOf });
/** Rows PC3 and PC4's plant: an rf-scope file that exists only in memory, read beside the live tree; nothing is written. */
const PLANT_FILE = join(SRC, "workbench", "rf-federated-census-plant.ts");
function plantedTree(source: string): SrcTree {
  const live = liveTree();
  expect(live.files, `${relative(REPO, PLANT_FILE)} exists on disk, so the plant would shadow it`).not.toContain(PLANT_FILE);
  return { files: [...live.files, PLANT_FILE], read: path => (path === PLANT_FILE ? source : live.read(path)), planted: [PLANT_FILE] };
}
interface ScopeScan {
  readonly witness: { [key: string]: Json };
  readonly hits: readonly string[];
  readonly scoped: readonly string[];
}
/** A file's text as the filesystem holds it, read directly and never through a tree (the scans' read-in-full anchor), or
 * undefined when no such file exists (rows PC3 and PC4's in-memory plant). */
function diskText(path: string): string | undefined {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return undefined;
  }
}
/** A file's size in bytes as the filesystem reports it (statSync), read apart from both text readers: the scans' size anchor
 * (wb-obyu F1), which a coordinated truncation of the tree's reader and diskText does not shorten, and not the UTF-8 byte length
 * of a UTF-8 decode of the file - row PC11 holds this body to the statSync read alone, and row PC10's control (bytes that are
 * not UTF-8) tells the two apart; undefined when no such file exists. */
function sizeOnDisk(path: string): number | undefined {
  try {
    return statSync(path).size;
  } catch {
    return undefined;
  }
}
/** One reading of the rf scope before any judgment (rows A5 and C5's instrument judges it - row PC12 drives that instrument
 * itself beside a control file - rows PC8, PC9, QP1 and QP2 drive it under cut reads and row PC10 beside the control file):
 * the scoped files, the floors, the anchors not read (outside the scope, or whose matched text or read through the tree lacks
 * the token), the scoped files with no text on disk other than the tree's in-memory plants, the scoped files whose matched
 * text does not open with their own text on disk, the scoped files whose text on disk does not hold their size as the size
 * anchor reports it (its UTF-8 byte length differs), and every matcher hit. */
interface ScopeReading {
  readonly scoped: readonly string[];
  readonly floorMet: boolean;
  readonly scopedFloorMet: boolean;
  readonly anchorsUnread: readonly string[];
  readonly offDisk: readonly string[];
  readonly unread: readonly string[];
  readonly unsized: readonly string[];
  readonly hits: readonly string[];
}
/** The disk reader is diskText and the size anchor sizeOnDisk; rows PC9, QP1 and QP2 hand readRfScope a cut disk reader, to cut
 * a file in both text readers at once, and row QP1 a size anchor cut in step with them (R-SIZE-STEP). Row PC11 holds this
 * declaration's text (signature and body) to the roster. */
function readRfScope(
  matcher: (source: string) => string[],
  tree: SrcTree,
  readDisk: (path: string) => string | undefined = diskText,
  readSize: (path: string) => number | undefined = sizeOnDisk,
): ScopeReading {
  const scoped = tree.files.filter(inRfScope);
  const texts = scoped.map(file => tree.read(file));
  const floorMet = tree.files.length >= SRC_FLOOR;
  const scopedFloorMet = scoped.length >= RF_SCOPE_FLOOR;
  const anchorsUnread = ANCHORS.filter(anchor => {
    const index = scoped.indexOf(anchor.file);
    return index === -1 || !(texts[index] ?? "").includes(anchor.token) || !tree.read(anchor.file).includes(anchor.token);
  }).map(anchor => relative(REPO, anchor.file));
  const offDisk = scoped
    .filter(file => readDisk(file) === undefined && !(tree.planted ?? []).includes(file))
    .map(file => relative(REPO, file));
  const unread = scoped
    .filter((file, index) => {
      const disk = readDisk(file);
      return disk !== undefined && !(texts[index] ?? "").startsWith(disk);
    })
    .map(file => relative(REPO, file));
  const unsized = scoped
    .filter(file => {
      const disk = readDisk(file);
      return disk !== undefined && Buffer.byteLength(disk, "utf8") !== readSize(file);
    })
    .map(file => relative(REPO, file));
  const hits = scoped.flatMap((file, index) => matcher(texts[index] ?? "").map(hit => `${relative(REPO, file)}: ${hit}`));
  return { scoped, floorMet, scopedFloorMet, anchorsUnread, offDisk, unread, unsized, hits };
}
/** Rows A5 and C5's instrument: walks the tree, holds the floors and the anchors, reads each rf-scope file once and holds that
 * read to the file's own text on disk (every file but an in-memory plant has one, and the matched text must open with it, so
 * an emptied or cut-short read reds, while an in-memory plant may follow it) and that disk text to the file's size as statSync
 * reports it (so a read cut short in both readers reds too), and returns every matcher hit in the rf scope.
 * The callers judge the hits (none on the live tree, exactly the planted ones on a planted tree), so one walk serves both.
 * Its one readRfScope call takes readRfScope's own defaults (diskText and sizeOnDisk): row PC12 drives this very call beside a
 * control file, and row PC11 holds this declaration's text (signature and body) to the roster. */
function scanRfScope(matcher: (source: string) => string[], tree: SrcTree = liveTree()): ScopeScan {
  const { scoped, floorMet, scopedFloorMet, anchorsUnread, offDisk, unread, unsized, hits } = readRfScope(matcher, tree);
  expect(floorMet, `src: ${tree.files.length} files walked, floor ${SRC_FLOOR}`).toBe(true);
  expect(scopedFloorMet, `rf scope: ${scoped.length} files, floor ${RF_SCOPE_FLOOR}`).toBe(true);
  expect(anchorsUnread, "token anchors the scan did not read with their token").toEqual([]);
  expect(offDisk, "rf-scope files with no text on disk beside the walk").toEqual([]);
  expect(unread, "rf-scope files the scan did not read in full from disk").toEqual([]);
  expect(unsized, "rf-scope files whose text on disk does not hold the size statSync reports").toEqual([]);
  const anchors = ANCHORS.map(anchor => `${relative(REPO, anchor.file)}: ${anchor.token}`);
  const witness = {
    floorMet,
    scopedFloorMet,
    anchorRead: anchorsUnread.length === 0,
    anchors,
    scopeOnDisk: offDisk.length === 0,
    scopeReadInFull: unread.length === 0,
    scopeSized: unsized.length === 0,
    hits: [...hits],
  };
  return { witness, hits, scoped };
}
interface AppendedScan {
  readonly reported: readonly string[];
  readonly missed: readonly string[];
  readonly untargeted: readonly string[];
  readonly anchorReports: readonly (number | null)[];
}
/** The rf-scope files of a walk and the anchors a per-file control never visited (wb-xr81 F2), so a control that visits only
 * some of them reds. */
const untargetedOf = (scoped: readonly string[], targets: readonly string[]): string[] =>
  [...new Set([...scoped, ...ANCHORS.map(anchor => anchor.file)])].filter(file => !targets.includes(file)).map(file => relative(REPO, file));
/** Rows PC6 and PC7's control: each rf-scope file of the live tree in turn carries the plant appended to its own live text (in
 * memory; nothing is written), and the scan must report exactly the plant's hits, attributed to that file. Returns the distinct
 * hits reported across the files (each one's own path removed, in report order), the files where the scan did not report
 * exactly the plant's hits, the walked files and anchors it never planted into, and per anchor (ANCHORS order) the count of
 * plant hits the scan that planted into that anchor attributed to it (null when none did), so a scan that reads or matches
 * only some rf-scope files reds, and so does a control that plants into only some of them. */
function appendedScan(matcher: (source: string) => string[], plant: string, plantHits: readonly string[]): AppendedScan {
  const live = liveTree();
  const scoped = live.files.filter(inRfScope);
  expect(scoped.length, `rf scope: ${scoped.length} files, floor ${RF_SCOPE_FLOOR}`).toBeGreaterThanOrEqual(RF_SCOPE_FLOOR);
  const reported: string[] = [];
  const targets: string[] = [];
  const attributed = new Map<string, number>();
  const missed = scoped
    .filter(target => {
      targets.push(target);
      const tree: SrcTree = { files: live.files, read: path => (path === target ? `${live.read(path)}\n${plant}\n` : live.read(path)) };
      const prefix = `${relative(REPO, target)}: `;
      const { hits } = scanRfScope(matcher, tree);
      attributed.set(target, hits.filter(hit => hit.startsWith(prefix)).length);
      for (const hit of hits) {
        const bare = hit.startsWith(prefix) ? hit.slice(prefix.length) : hit;
        if (!reported.includes(bare)) reported.push(bare);
      }
      return !sameHits(hits, plantHits.map(hit => `${prefix}${hit}`));
    })
    .map(file => relative(REPO, file));
  const anchorReports = ANCHORS.map(anchor => attributed.get(anchor.file) ?? null);
  return { reported, missed, untargeted: untargetedOf(scoped, targets), anchorReports };
}
interface ShortReadScan {
  readonly readings: readonly Json[];
  readonly missed: readonly string[];
  readonly untargeted: readonly string[];
  readonly anchorsReadShort: readonly (boolean | null)[];
}
/** Which readers rows PC8 and PC9 read each rf-scope file short through: the tree alone (PC8), or the tree and the disk reader
 * together (PC9, the coordinated truncation of wb-obyu F1). */
type ShortReaders = "tree" | "tree and disk";
/** Rows PC8's and PC9's control: each rf-scope file of the live tree in turn is read one character short (in memory; nothing is
 * written) through the tree alone or through the tree and the disk reader together, and the scans' reading (readRfScope, which
 * rows A5 and C5's instrument judges) must report exactly that file through the one check the cut reaches: as not read in full
 * and still sized when the tree alone reads it short (its matched text no longer opens with its disk text, which still holds
 * its size), and as unsized and still read in full when both read it short (its matched text opens with the equally short disk
 * text, so only the size anchor sees the cut), every anchor still read with its token and every file still on disk. Returns the
 * distinct readings (each one's own path written "own"), the files the reading did not report exactly, the walked files and
 * anchors never read short, and per anchor (ANCHORS order) whether the reading reported exactly that anchor when it was read
 * short (null when it never was), so a read-in-full or size check that compares nothing, or an empty or partial disk text,
 * reds, and so does a control that reads only some files short. */
function shortReadScan(readers: ShortReaders): ShortReadScan {
  const live = liveTree();
  const scoped = live.files.filter(inRfScope);
  expect(scoped.length, `rf scope: ${scoped.length} files, floor ${RF_SCOPE_FLOOR}`).toBeGreaterThanOrEqual(RF_SCOPE_FLOOR);
  const readings: Json[] = [];
  const targets: string[] = [];
  const exact = new Map<string, boolean>();
  const missed = scoped
    .filter(target => {
      targets.push(target);
      const own = relative(REPO, target);
      const tree: SrcTree = { files: live.files, read: path => (path === target ? live.read(path).slice(0, -1) : live.read(path)) };
      const readDisk = (path: string): string | undefined => (readers === "tree and disk" && path === target ? diskText(path)?.slice(0, -1) : diskText(path));
      const reading = readRfScope(locatorHits, tree, readDisk);
      const owned = (files: readonly string[]): string[] => files.map(file => (file === own ? "own" : file));
      const summary: Json = {
        unread: owned(reading.unread),
        unsized: owned(reading.unsized),
        anchorsUnread: [...reading.anchorsUnread],
        offDisk: [...reading.offDisk],
      };
      if (!readings.some(entry => JSON.stringify(entry) === JSON.stringify(summary))) readings.push(summary);
      const [reported, quiet] = readers === "tree" ? [reading.unread, reading.unsized] : [reading.unsized, reading.unread];
      exact.set(target, sameHits(reported, [own]));
      return !(sameHits(reported, [own]) && quiet.length === 0 && reading.anchorsUnread.length === 0 && reading.offDisk.length === 0);
    })
    .map(file => relative(REPO, file));
  const anchorsReadShort = ANCHORS.map(anchor => exact.get(anchor.file) ?? null);
  return { readings, missed, untargeted: untargetedOf(scoped, targets), anchorsReadShort };
}
/** Row PC10's control (wb-obyu cut #2, the gate's U1): the bytes of an rf-scope file that are not UTF-8 - an ASCII line, one 0xff
 * byte and a newline. A UTF-8 decode reads the 0xff byte as the replacement character U+FFFD, three bytes in UTF-8, so the UTF-8
 * byte length of any UTF-8 text read of the file is two bytes more than the size statSync reports for it; the roster pins both
 * counts. */
const SIZE_CONTROL_BYTES = Buffer.concat([Buffer.from("// wb-obyu PC10 size control: the byte on the next line is not UTF-8\n", "utf8"), Buffer.from([0xff]), Buffer.from("\n", "utf8")]);
/** Row PC10's control file name: an rf-scope name (inRfScope), so the scans' reading takes the file in beside the live tree. */
const SIZE_CONTROL_NAME = "rf-federated-size-control.ts";
interface SizeControl {
  readonly bytes: number | null;
  readonly decodedBytes: number;
  readonly reading: Json;
}
/** Row PC10's control: writes SIZE_CONTROL_BYTES under SIZE_CONTROL_NAME into a tracked scratch directory, reads the rf scope of
 * the live tree plus that file through readRfScope with its own disk reader and size anchor (the very reading A5's and C5's
 * instrument judges), and removes the directory. Returns the control's size as sizeOnDisk reads it, the UTF-8 byte length of its
 * text on disk, and the reading (the control's path written "control"), which must report the control unsized and nothing
 * else: its matched text opens with its text on disk (both are the same UTF-8 decode), so only a size anchor that is not that
 * decode's byte length can see it. */
function sizeControlScan(): SizeControl {
  const directory = makeScratch("rf-federated-size-control-");
  try {
    const control = join(directory, SIZE_CONTROL_NAME);
    writeFileSync(control, SIZE_CONTROL_BYTES);
    const live = liveTree();
    const reading = readRfScope(locatorHits, { files: [...live.files, control], read: live.read });
    const own = relative(REPO, control);
    const named = (files: readonly string[]): string[] => files.map(file => (file === own ? "control" : file));
    return {
      bytes: sizeOnDisk(control) ?? null,
      decodedBytes: Buffer.byteLength(diskText(control) ?? "", "utf8"),
      reading: {
        unread: named(reading.unread),
        unsized: named(reading.unsized),
        anchorsUnread: [...reading.anchorsUnread],
        offDisk: named(reading.offDisk),
        hits: [...reading.hits],
      },
    };
  } finally {
    removeScratch(directory);
  }
}
/** Where rows A5's and C5's own instrument refused row PC12's control, for one matcher: the label of the first check scanRfScope
 * failed (null when it refused nothing) and the files that check named (the control's path written "control"; null when the
 * failure carried no list). */
type ScanRefusal = { readonly refusedAt: string | null; readonly named: Json };
/** Row PC12's control (wb-obyu cut #3, the gate's U1 on cut #2): row PC10's control bytes (SIZE_CONTROL_BYTES), written under
 * SIZE_CONTROL_NAME into its own tracked scratch directory and walked beside the live tree by scanRfScope itself - rows A5's
 * and C5's own instrument, through its own readRfScope call and that call's defaults - once with each matcher the live legs
 * hand it (locatorHits for A5, revisionJoinHits for C5), and the directory removed. Returns, per matcher, the check the scan
 * refused at and what it named, which must be the size check naming exactly the control: every check before it passes (the
 * control is in scope, on disk and read in full, its matched text and its disk text being the same UTF-8 decode), so only a
 * size anchor that is not the UTF-8 byte length of that decode, as the scan's own call takes it, refuses it. */
function scanControlRefusals(): Json {
  const directory = makeScratch("rf-federated-scan-control-");
  try {
    const control = join(directory, SIZE_CONTROL_NAME);
    writeFileSync(control, SIZE_CONTROL_BYTES);
    const live = liveTree();
    const tree: SrcTree = { files: [...live.files, control], read: live.read };
    const own = relative(REPO, control);
    const refusal = (matcher: (source: string) => string[]): ScanRefusal => {
      try {
        scanRfScope(matcher, tree);
        return { refusedAt: null, named: null };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const at = message.indexOf(": expected ");
        const actual: unknown = error instanceof Error && "actual" in error ? error.actual : undefined;
        const named: Json = Array.isArray(actual) ? actual.map((file: unknown) => (file === own ? "control" : String(file))) : null;
        return { refusedAt: at === -1 ? message : message.slice(0, at), named };
      }
    };
    return { locatorHits: { ...refusal(locatorHits) }, revisionJoinHits: { ...refusal(revisionJoinHits) } };
  } finally {
    removeScratch(directory);
  }
}
/** Rows QP1's and QP2's residual cuts, each a coordinated hollow of an rf-scope file the scans' reading does not see (RESIDUALS):
 * "size step" (R-SIZE-STEP) reads the file one character short through the tree, the disk reader and the size anchor together,
 * the size cut by that character's UTF-8 byte length, as a hollow of statSync in step with both text readers would; "same length"
 * (R-SAME-LENGTH) has the tree and the disk reader both read the file's last character as another character of the same UTF-8
 * byte length (each rf-scope file ends with a newline, read as a space), a coordinated rewrite that keeps the file's byte
 * length. */
type QuietCut = "size step" | "same length";
interface QuietCutScan {
  readonly readings: readonly Json[];
  readonly counterparts: readonly Json[];
  readonly loud: readonly string[];
  readonly unseen: readonly string[];
  readonly untargeted: readonly string[];
  readonly anchorsQuiet: readonly (boolean | null)[];
}
/** Rows QP1's and QP2's control: each rf-scope file of the live tree in turn is read under the residual's cut (in memory; nothing
 * is written), and the scans' reading (readRfScope) must report nothing for it - not unread, not unsized, every anchor read
 * with its token and every file on disk - while the same cut with one reader left whole (the size anchor for R-SIZE-STEP, so
 * the file is reported unsized as in row PC9; the disk reader for R-SAME-LENGTH, so it is reported unread) reports exactly that
 * file and nothing else, so the row reds when the reading sees the residual and when the cut it applies is one the reading
 * never sees. Returns the distinct cut readings and counterpart readings (each one's own path written "own"), the files whose
 * cut reading reported anything, the files whose counterpart reading did not report exactly that file, the walked files and
 * anchors never cut, and per anchor (ANCHORS order) whether its cut reading was quiet (null when it never was cut). */
function quietCutScan(cut: QuietCut): QuietCutScan {
  const live = liveTree();
  const scoped = live.files.filter(inRfScope);
  expect(scoped.length, `rf scope: ${scoped.length} files, floor ${RF_SCOPE_FLOOR}`).toBeGreaterThanOrEqual(RF_SCOPE_FLOOR);
  const rewrite = (text: string): string => (cut === "size step" ? text.slice(0, -1) : `${text.slice(0, -1)}${text.endsWith(" ") ? "\n" : " "}`);
  const readings: Json[] = [];
  const counterparts: Json[] = [];
  const targets: string[] = [];
  const loud: string[] = [];
  const unseen: string[] = [];
  const quietAt = new Map<string, boolean>();
  const distinct = (list: Json[], entry: Json): void => {
    if (!list.some(seen => JSON.stringify(seen) === JSON.stringify(entry))) list.push(entry);
  };
  for (const target of scoped) {
    targets.push(target);
    const own = relative(REPO, target);
    const owned = (files: readonly string[]): string[] => files.map(file => (file === own ? "own" : file));
    const summary = (reading: ScopeReading): Json => ({
      unread: owned(reading.unread),
      unsized: owned(reading.unsized),
      anchorsUnread: [...reading.anchorsUnread],
      offDisk: [...reading.offDisk],
    });
    const tree: SrcTree = { files: live.files, read: path => (path === target ? rewrite(live.read(path)) : live.read(path)) };
    const cutDisk = (path: string): string | undefined => {
      const text = diskText(path);
      return path === target && text !== undefined ? rewrite(text) : text;
    };
    const steppedSize = (path: string): number | undefined => {
      const size = sizeOnDisk(path);
      const text = diskText(path);
      return path === target && size !== undefined && text !== undefined ? size - Buffer.byteLength(text, "utf8") + Buffer.byteLength(rewrite(text), "utf8") : size;
    };
    const reading = readRfScope(locatorHits, tree, cutDisk, cut === "size step" ? steppedSize : sizeOnDisk);
    const counterpart = cut === "size step" ? readRfScope(locatorHits, tree, cutDisk) : readRfScope(locatorHits, tree);
    distinct(readings, summary(reading));
    distinct(counterparts, summary(counterpart));
    const quiet = reading.unread.length === 0 && reading.unsized.length === 0 && reading.anchorsUnread.length === 0 && reading.offDisk.length === 0;
    quietAt.set(target, quiet);
    if (!quiet) loud.push(own);
    const [reported, other] = cut === "size step" ? [counterpart.unsized, counterpart.unread] : [counterpart.unread, counterpart.unsized];
    if (!(sameHits(reported, [own]) && other.length === 0 && counterpart.anchorsUnread.length === 0 && counterpart.offDisk.length === 0)) unseen.push(own);
  }
  const anchorsQuiet = ANCHORS.map(anchor => quietAt.get(anchor.file) ?? null);
  return { readings, counterparts, loud, unseen, untargeted: untargetedOf(scoped, targets), anchorsQuiet };
}
/** This file, which row PC11 reads parse-aware. */
const SELF = fileURLToPath(import.meta.url);
/** The names readRfScope's body must not reference (row PC11): the text readers, the size anchor and every reader a size could be
 * re-derived through; it reads the tree, the disk and the size only through its parameters. */
const SIZE_READERS: readonly string[] = ["diskText", "textOf", "readFileSync", "statSync", "sizeOnDisk", "liveTree", "TextDecoder"];
/** The node:fs bindings row PC11 holds to node:fs's own imports. */
const FS_READS: readonly string[] = ["readFileSync", "statSync"];
/** Row PC11's reading of the size check's wiring (sizeAnchorWiring); the two declaration texts are held to the roster alone. */
type SizeAnchorWiring = {
  readonly sizeOnDiskBody: string | null;
  readonly readRfScopeDefaults: { [key: string]: Json };
  readonly readRfScopeReaders: string[];
  readonly scanCalls: Json[];
  readonly bindings: string[];
  readonly readRfScopeText: string | null;
  readonly scanRfScopeText: string | null;
};
/** Row PC11's instrument: parses this file with the TypeScript parser and reads the size check's wiring - sizeOnDisk's body
 * (whitespace collapsed), readRfScope's parameter defaults and the SIZE_READERS names its body references, the argument lists of
 * every call spelled readRfScope(...) in scanRfScope's body, every binding of a FS_READS name in the file (an import specifier as
 * "<name>: import <module>", with " as <local>" when aliased; any other declaration by its kind), and the whole declaration text
 * of readRfScope and of scanRfScope (signature and body, every whitespace run collapsed to one space, the docstring outside it),
 * so that any other edit of either declaration - an aliased, parenthesized or .call callee at the scan's own call, a disk
 * reader or size anchor handed there, a size check discarded or filtered there, a comparison stepped in readRfScope - changes
 * what it reads (wb-obyu cut #3, the gate's U1 on cut #2). */
function sizeAnchorWiring(): SizeAnchorWiring {
  const source = ts.createSourceFile(SELF, readFileSync(SELF, "utf8"), ts.ScriptTarget.Latest, true);
  const functions = new Map<string, ts.FunctionDeclaration>();
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) functions.set(statement.name.text, statement);
  }
  const flat = (node: ts.Node | undefined): string | null => (node === undefined ? null : node.getText(source).replace(/\s+/g, " "));
  const walk = (node: ts.Node | undefined, visit: (child: ts.Node) => void): void => {
    if (node === undefined) return;
    visit(node);
    node.forEachChild(child => walk(child, visit));
  };
  const read = functions.get("readRfScope");
  const readers = new Set<string>();
  walk(read?.body, node => {
    if (ts.isIdentifier(node) && SIZE_READERS.includes(node.text)) readers.add(node.text);
  });
  const defaults: { [key: string]: Json } = {};
  for (const parameter of read?.parameters ?? []) {
    if (parameter.initializer !== undefined) defaults[parameter.name.getText(source)] = flat(parameter.initializer);
  }
  const scanCalls: Json[] = [];
  walk(functions.get("scanRfScope")?.body, node => {
    if (ts.isCallExpression(node) && node.expression.getText(source) === "readRfScope") scanCalls.push(node.arguments.map(argument => argument.getText(source)));
  });
  const bindings: string[] = [];
  walk(source, node => {
    if (ts.isImportSpecifier(node)) {
      const imported = (node.propertyName ?? node.name).getText(source);
      const local = node.name.text;
      if (FS_READS.includes(imported) || FS_READS.includes(local)) {
        const module = ts.isStringLiteral(node.parent.parent.parent.moduleSpecifier) ? node.parent.parent.parent.moduleSpecifier.text : "?";
        bindings.push(`${imported}: import ${module}${local === imported ? "" : ` as ${local}`}`);
      }
    } else if ((ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isParameter(node)) && node.name !== undefined && ts.isIdentifier(node.name) && FS_READS.includes(node.name.text)) {
      bindings.push(`${node.name.text}: ${ts.SyntaxKind[node.kind]}`);
    }
  });
  return {
    sizeOnDiskBody: flat(functions.get("sizeOnDisk")?.body),
    readRfScopeDefaults: defaults,
    readRfScopeReaders: [...readers].sort(),
    scanCalls,
    bindings: bindings.sort(),
    readRfScopeText: flat(functions.get("readRfScope")),
    scanRfScopeText: flat(functions.get("scanRfScope")),
  };
}

const RF_HOST: ReactiveFiberTopologyContext = {
  scope: { ...SCOPE },
  seam: "rf-cli",
  capturedAt: "2026-10-22T06:00:00Z",
  observedAt: "2026-10-22T06:00:01Z",
};
/** Two locators one rf workspace is read under; the Pi scope is a third path, so neither is the consumer's own. */
const LOCATORS = ["/srv/rf/alpha", "/mnt/peer/rf-alpha"] as const;
/** The key-bearing fields of a snapshot (KEY_BEARING_FIELDS): its source ref, evidence refs, revisions, payload reference,
 * definition digest and stream position. */
const keyBearing = (snapshot: NativeSnapshot): Json => ({
  source: { provider: snapshot.source.provider, type: snapshot.source.type, id: snapshot.source.id, scope: snapshot.source.scope ?? null },
  evidenceRefs: [...(snapshot.evidenceRefs ?? [])],
  sourceRevision: snapshot.sourceRevision ?? null,
  sourceVersion: snapshot.sourceVersion ?? null,
  nativePayloadRef: snapshot.nativePayloadRef ?? null,
  definitionDigest: snapshot.definitionDigest ?? null,
  cursor: snapshot.cursor ?? null,
  sequence: snapshot.sequence ?? null,
});
/** Every NativeSnapshot field keyBearing must read: the source ref's four parts, the evidence refs, both revisions, the payload
 * reference, the definition digest (an identity field, D03) and the stream position (cursor and sequence). Row PC2 plants a
 * locator into each one. */
const KEY_BEARING_FIELDS = [
  "source.provider",
  "source.type",
  "source.id",
  "source.scope",
  "evidenceRefs",
  "sourceRevision",
  "sourceVersion",
  "nativePayloadRef",
  "definitionDigest",
  "cursor",
  "sequence",
] as const;
type KeyBearingField = (typeof KEY_BEARING_FIELDS)[number];
/** A copy of the snapshot with the locator written into one key-bearing field (row PC2's plant). */
function plantLocator(snapshot: NativeSnapshot, field: KeyBearingField, locator: string): NativeSnapshot {
  switch (field) {
    case "source.provider":
      return { ...snapshot, source: { ...snapshot.source, provider: locator } };
    case "source.type":
      return { ...snapshot, source: { ...snapshot.source, type: locator } };
    case "source.id":
      return { ...snapshot, source: { ...snapshot.source, id: locator } };
    case "source.scope":
      return { ...snapshot, source: { ...snapshot.source, scope: locator } };
    case "evidenceRefs":
      return { ...snapshot, evidenceRefs: [...(snapshot.evidenceRefs ?? []), locator] };
    case "sourceRevision":
      return { ...snapshot, sourceRevision: locator };
    case "sourceVersion":
      return { ...snapshot, sourceVersion: locator };
    case "nativePayloadRef":
      return { ...snapshot, nativePayloadRef: locator };
    case "definitionDigest":
      return { ...snapshot, definitionDigest: locator };
    case "cursor":
      return { ...snapshot, cursor: locator };
    case "sequence":
      return { ...snapshot, sequence: locator };
  }
}
/** Row A4's judgment of one snapshot: the locator appears in a key-bearing field. */
const locatorIn = (snapshot: NativeSnapshot, locator: string): boolean => JSON.stringify(keyBearing(snapshot)).includes(locator);
/** What the shipped rf reader is handed for one read: the provider output, the full-shape envelope under one root. */
type RfReading = { readonly contract: string; readonly workspaceRoot: string; readonly source: Json };
/** One read of the shipped rf reader: the reading it was handed and the one snapshot it read from it. */
interface RootRead {
  readonly reading: RfReading;
  readonly snapshot: NativeSnapshot;
}
/** The shipped rf reader's one snapshot of the full-shape envelope, read under an authorized root (rows A4, PC2 and PC5), kept
 * with the very reading it was handed, so row A4 can ask the reader which root that reading is authorized under. */
function readUnder(root: string): RootRead {
  const reading: RfReading = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: root, source: fullShapeRf(root) };
  const [snapshot] = reactivefiberTopology(reading, { ...RF_HOST, authorizedRfRoot: root }).snapshots;
  if (snapshot === undefined) throw new Error(`no snapshot read under ${root}`);
  return { reading, snapshot };
}
/** The shipped reader's verdict on one reading under each of LOCATORS as the authorized root: "authorized", or the category of
 * its refusal (it refuses a reading whose root is not the authorized one as 'authorization'). Row A4's root witness: a reading
 * is authorized under exactly the root it names. */
function rootVerdicts(reading: RfReading): string[] {
  return LOCATORS.map(root => {
    try {
      reactivefiberTopology(reading, { ...RF_HOST, authorizedRfRoot: root });
      return "authorized";
    } catch (error) {
      if (error instanceof CapabilityError) return error.category;
      throw error;
    }
  });
}
/** Row A4's judgment of the reads of one envelope, one per locator: whether their key-bearing projections agree, and the
 * locators written into them (row PC5 drives it with planted reads). */
function judgeReads(snapshots: readonly NativeSnapshot[]): { readonly sameKeys: boolean; readonly leaked: string[] } {
  const keys = snapshots.map(snapshot => JSON.stringify(keyBearing(snapshot)));
  const sameKeys = keys.length === LOCATORS.length && new Set(keys).size === 1;
  const leaked = LOCATORS.filter((root, index) => {
    const snapshot = snapshots[index];
    return snapshot !== undefined && locatorIn(snapshot, root);
  });
  return { sameKeys, leaked };
}

interface Spelling {
  readonly pin: string;
  readonly matcher: (source: string) => string[];
  readonly source: string;
  readonly hit: boolean;
}
/** MA1-MA14 and MC1-MC8 must hit. Quiet rows: QA1 R-INDIRECT, QA2 R-CALL-BUILT, QA3 R-HOST-WORD, QA4 R-CALLBACK-KEY, QA5 and QA6
 * R-REFLECTIVE-KEY, QA7 R-MID-TAG, QA8 R-SUFFIX-OUTSIDE, QC1 and QC4 R-CALL-JOIN, QC2 R-SYNONYM, QC3 R-PROSE, QC5 R-ARITH-PACKED,
 * QC6 R-CALL-OPERAND, QC7 R-EXPRESSION-SCALE, QC8 R-TEMPLATE-PLUS, QC9 R-WIDE-GAP. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MA1", matcher: locatorHits, source: `${TICK}rf-workspace:${interpolate("workspace.root")}${TICK}`, hit: true },
  { pin: "MA2", matcher: locatorHits, source: `${TICK}rf-link:${interpolate("link.locator")}${TICK}`, hit: true },
  { pin: "MA3", matcher: locatorHits, source: `${TICK}rf-resource:${interpolate("entry.alias")}${TICK}`, hit: true },
  { pin: "MA4", matcher: locatorHits, source: "const ref = { provider: 'reactivefiber', id: link.path, type: 'federated-import' };", hit: true },
  { pin: "MA5", matcher: locatorHits, source: "const ref = { provider: 'reactivefiber', scope: authorizedRfRoot };", hit: true },
  { pin: "MA6", matcher: locatorHits, source: "const ref = 'rf-workspace:' + workspace.root;", hit: true },
  { pin: "MA7", matcher: locatorHits, source: "imports.set(link.locator, record);", hit: true },
  { pin: "MA8", matcher: locatorHits, source: "const entry = { cacheKey: link.href, record };", hit: true },
  { pin: "MA9", matcher: locatorHits, source: "const snapshot = { kind: 'reactivefiber.render.preview.snapshot', definitionDigest: value.workspaceRoot };", hit: true },
  { pin: "MA10", matcher: locatorHits, source: "export const byLocator = (link: { locator: string }, record: unknown) => ({ [link.locator]: record });", hit: true },
  {
    pin: "MA11",
    matcher: locatorHits,
    source: "export const index = (links: { locator: string }[], record: unknown) => new Map(links.map(link => [link.locator, record]));",
    hit: true,
  },
  { pin: "MA12", matcher: locatorHits, source: "byLocator[link.locator] = record;", hit: true },
  { pin: "MA13", matcher: locatorHits, source: `byLocator[${TICK}${interpolate("link.locator")}${TICK}] = record;`, hit: true },
  { pin: "MA14", matcher: locatorHits, source: 'const ref = { ["id"]: link.locator };', hit: true },
  { pin: "QA1", matcher: locatorHits, source: `${TICK}rf-workspace:${interpolate("where")}${TICK}`, hit: false },
  { pin: "QA2", matcher: locatorHits, source: 'const ref = ["rf-workspace", workspace.root].join(":");', hit: false },
  { pin: "QA3", matcher: locatorHits, source: `${TICK}rf-link:${interpolate("link.host")}${TICK}`, hit: false },
  { pin: "QA4", matcher: locatorHits, source: "const seen = new Set(links.map(link => link.locator));", hit: false },
  { pin: "QA5", matcher: locatorHits, source: "Reflect.set(index, link.locator, record);", hit: false },
  { pin: "QA6", matcher: locatorHits, source: "Object.defineProperty(index, link.locator, { value: record });", hit: false },
  { pin: "QA7", matcher: locatorHits, source: `const ref = ${TICK}prefix/rf-link:${interpolate("link.locator")}${TICK};`, hit: false },
  { pin: "QA8", matcher: locatorHits, source: "const ref = { sourceKeys: link.locator };", hit: false },
  { pin: "MC1", matcher: revisionJoinHits, source: `${TICK}${interpolate("epoch")}${interpolate("revision")}${TICK}`, hit: true },
  { pin: "MC2", matcher: revisionJoinHits, source: `${TICK}${interpolate("ref.source_epoch")}:${interpolate("ref.source_revision")}${TICK}`, hit: true },
  { pin: "MC3", matcher: revisionJoinHits, source: `${TICK}${interpolate("stream")}/${interpolate("sequence")}${TICK}`, hit: true },
  { pin: "MC4", matcher: revisionJoinHits, source: `${TICK}${interpolate("cursor")}-${interpolate("seq")}${TICK}`, hit: true },
  { pin: "MC5", matcher: revisionJoinHits, source: 'const key = epoch + ":" + revision;', hit: true },
  { pin: "MC6", matcher: revisionJoinHits, source: "const key = ref.source_epoch + ref.source_revision;", hit: true },
  { pin: "MC7", matcher: revisionJoinHits, source: "export const orderKey = (point: { epoch: number; revision: number }) => point.epoch * 1000000 + point.revision;", hit: true },
  { pin: "MC8", matcher: revisionJoinHits, source: "const key = (epoch * 1000000) + revision;", hit: true },
  { pin: "QC1", matcher: revisionJoinHits, source: 'const key = [epoch, revision].join(":");', hit: false },
  { pin: "QC2", matcher: revisionJoinHits, source: `${TICK}${interpolate("gen")}:${interpolate("n")}${TICK}`, hit: false },
  { pin: "QC3", matcher: revisionJoinHits, source: `${TICK}${interpolate("epoch")} ${interpolate("revision")}${TICK}`, hit: false },
  { pin: "QC4", matcher: revisionJoinHits, source: 'const key = String(epoch).concat(":", revision);', hit: false },
  { pin: "QC5", matcher: revisionJoinHits, source: "const key = (epoch << 20) | revision;", hit: false },
  { pin: "QC6", matcher: revisionJoinHits, source: "const key = epoch.toString() + revision;", hit: false },
  { pin: "QC7", matcher: revisionJoinHits, source: "const key = point.epoch * 2 ** 20 + point.revision;", hit: false },
  { pin: "QC8", matcher: revisionJoinHits, source: `const key = ${TICK}${interpolate("epoch")}${TICK} + ${TICK}${interpolate("revision")}${TICK};`, hit: false },
  { pin: "QC9", matcher: revisionJoinHits, source: `const key = ${TICK}${interpolate("epoch")}-separator${interpolate("revision")}${TICK};`, hit: false },
];

/** The pins that reached their witness compare, in run order; the last case holds them to the roster's pins (wb-jnpc F5). */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const hashes = ROSTER.excerpts.map(entry => ({ at: entry.at, sha256: sha256(`${entry.line}\n`) }));
    expect(hashes, "the vendored excerpts are not the producer lines at the pin").toStrictEqual(
      Object.entries(EXCERPT_SHA256).map(([at, digest]) => ({ at, sha256: digest })),
    );
    const resourceRef = /ResourceRef = \{([^}]*)\}/.exec(excerpt("03-protocol-and-storage.md:5"))?.[1]?.split(",") ?? [];
    expect(resourceRef[0], "ResourceRef opens with its schema tag").toBe("schema");
    expect(resourceRef.slice(1), "IDENTITY_FIELDS against ResourceRef after its schema tag").toStrictEqual([...IDENTITY_FIELDS]);
    const stream = /ObservationRef adds ([a-z_]+), ([a-z_]+),/.exec(excerpt("03-protocol-and-storage.md:5"))?.slice(1) ?? [];
    expect(stream).toStrictEqual(["source_revision", "source_epoch"]);
    const decision = excerpt("01-requirements-decisions.md:37");
    const named = ["(workspace_id, backend_instance_id)", "resource kind/id", "definition digest", "Friendly aliases are local, mutable names."];
    expect(named.filter(phrase => !decision.includes(phrase)), "D03 phrases missing from 01:37").toEqual([]);
    return { excerpts: hashes.length, resourceRef, identityFields: [...IDENTITY_FIELDS], stream, d03Phrases: named.length };
  },
  A2: () => {
    const [base] = ROSTER.aliasRename;
    if (base === undefined) throw new Error("the roster holds no aliasRename record");
    const moved = IDENTITY_FIELDS.filter(field => identityKey({ ...base, resource: { ...base.resource, [field]: `${base.resource[field]}x` } }) !== identityKey(base));
    const aliasMoves = identityKey({ ...base, alias: `${base.alias}-renamed` }) !== identityKey(base);
    const locatorMoves = identityKey({ ...base, locator: `/moved${base.locator}` }) !== identityKey(base);
    expect(moved, "an identity field that does not move identityKey").toStrictEqual([...IDENTITY_FIELDS]);
    expect({ aliasMoves, locatorMoves }).toStrictEqual({ aliasMoves: false, locatorMoves: false });
    return { moved, aliasMoves, locatorMoves };
  },
  A3: () => {
    const project = (ref: (record: ImportedRecord) => NativeRef): StateReading =>
      projectStates(ROSTER.aliasRename.map((record, index) => snapshotOf(record, STAMPS[index] ?? STAMPS[0], ref(record))));
    const reference = project(identityRef);
    const aliasKeyed = project(record => ({ ...identityRef(record), id: record.alias }));
    const locatorKeyed = project(record => ({ ...identityRef(record), id: record.locator }));
    expect(reference.outcomes).toStrictEqual(["applied", "applied", "applied"]);
    expect(reference.nodes, "an alias rename or a locator move split the identity-keyed node").toBe(1);
    const stateUnchanged = reference.state.length === ROSTER.aliasRename.length && new Set(reference.state.map(entry => JSON.stringify(entry))).size === 1;
    expect(stateUnchanged, "the identity-keyed state moved").toBe(true);
    expect([aliasKeyed.nodes, locatorKeyed.nodes], "an alias- or locator-keyed ref kept one node").toStrictEqual([2, 2]);
    return {
      outcomes: [...reference.outcomes],
      nodes: reference.nodes,
      stateUnchanged,
      state: reference.state[0] ?? null,
      aliasKeyedNodes: aliasKeyed.nodes,
      locatorKeyedNodes: locatorKeyed.nodes,
    };
  },
  A4: () => {
    const reads = LOCATORS.map(root => readUnder(root));
    const snapshots = reads.map(read => read.snapshot);
    const keys = snapshots.map(keyBearing);
    const { sameKeys, leaked } = judgeReads(snapshots);
    const verdicts = reads.map(read => rootVerdicts(read.reading));
    const projection = new ObservationProjection();
    const outcomes = snapshots.map(snapshot => projection.refresh(snapshot));
    expect(verdicts, "the two reads were not each authorized under its own locator alone").toStrictEqual(
      LOCATORS.map(own => LOCATORS.map(root => (root === own ? "authorized" : "authorization"))),
    );
    expect(keys[0], "one envelope read under two locators keyed differently").toStrictEqual(keys[1]);
    expect(leaked, "a locator written into a key-bearing field").toEqual([]);
    expect(projection.stats().nodes).toBe(1);
    const evidenceTags = (snapshots[0]?.evidenceRefs ?? []).map(ref => ref.slice(0, ref.indexOf(":")));
    return { sameKeys, leaked, outcomes, nodes: projection.stats().nodes, evidenceTags, rootVerdicts: verdicts };
  },
  A5: () => {
    const { witness, hits, scoped } = scanRfScope(locatorHits);
    expect(hits, "rf-scope src locator-named rf key expressions").toEqual([]);
    const templates = scoped.reduce((total, file) => total + rfTemplates(textOf(file)).length, 0);
    const templateFloorMet = templates >= RF_TEMPLATE_FLOOR;
    expect(templateFloorMet, `rf scope: ${templates} rf-tagged templates, floor ${RF_TEMPLATE_FLOOR}`).toBe(true);
    return { ...witness, templateFloorMet };
  },
  B1: () => {
    const pair = ROSTER.sameWorkspace;
    const differing = IDENTITY_FIELDS.filter(field => new Set(pair.map(record => record.resource[field])).size > 1);
    const shared = (read: (record: ImportedRecord) => string): boolean => new Set(pair.map(read)).size === 1;
    const witness = {
      records: pair.length,
      differing,
      sharedAlias: shared(record => record.alias),
      sharedLocator: shared(record => record.locator),
      sharedRawRevision: shared(record => `${record.observation.source_epoch}/${record.observation.source_revision}`),
    };
    expect(witness).toStrictEqual({ records: 2, differing: ["backend_instance_id"], sharedAlias: true, sharedLocator: true, sharedRawRevision: true });
    return witness;
  },
  B2: () => {
    const pair = ROSTER.sameWorkspace;
    const others = Object.fromEntries(Object.entries(OTHER_KEYS).map(([name, key]) => [name, identities(pair, key)]));
    expect(identities(pair, identityKey), "identityKey merges two authorities of one workspace").toBe(2);
    expect(Object.entries(others).filter(([, count]) => count !== 1).map(([name]) => name), "a key short of the identity separates the pair").toEqual([]);
    return { identity: identities(pair, identityKey), others };
  },
  B3: () => {
    const pair = ROSTER.sameWorkspace;
    const reference = new ObservationProjection();
    const outcomes = pair.map(record => reference.refresh(snapshotOf(record, STAMPS[0])));
    const perRef = pair.map(record => reference.query({ scope: SCOPE, limit: 20, ref: identityRef(record) }).nodes.map(node => node.nativeRef.id === identityKey(record)));
    const perVersion = pair.map(record => reference.query({ scope: SCOPE, limit: 20, version: streamRevision(record) }).nodes.length);
    const perEvidence = pair.map(record => reference.query({ scope: SCOPE, limit: 20, evidence: authorityRef(record) }).nodes.length);
    const workspaceEvidence = (record: ImportedRecord): string => `rf-workspace:${record.resource.workspace_id}`;
    const raw = new ObservationProjection();
    for (const record of pair) raw.refresh(snapshotOf(record, STAMPS[0], identityRef(record), record.observation.source_revision, workspaceEvidence(record)));
    const [first] = pair;
    const rawBucket = raw.query({ scope: SCOPE, limit: 20, version: first?.observation.source_revision ?? "" }).nodes.length;
    const workspaceBucket = first === undefined ? 0 : raw.query({ scope: SCOPE, limit: 20, evidence: workspaceEvidence(first) }).nodes.length;
    expect(outcomes).toStrictEqual(["applied", "applied"]);
    expect(nodesOf(reference), "two authorities of one workspace share a node").toHaveLength(2);
    expect(perRef, "a ref query does not return exactly its own record").toStrictEqual([[true], [true]]);
    expect(perVersion, "the version index merges two streams").toStrictEqual([1, 1]);
    expect(perEvidence, "the evidence index merges two authorities").toStrictEqual([1, 1]);
    expect([rawBucket, workspaceBucket], "the raw counter or the workspace-only ref did not merge the pair").toStrictEqual([2, 2]);
    return { outcomes, nodes: nodesOf(reference).length, perRef, perVersion, perEvidence, rawCounterBucket: rawBucket, workspaceEvidenceBucket: workspaceBucket };
  },
  B4: () => {
    const [one, two] = ROSTER.sameWorkspace;
    if (one === undefined || two === undefined) throw new Error("the roster holds no sameWorkspace pair");
    const capture = (ref: (record: ImportedRecord) => NativeRef): string[] => {
      const projection = new ObservationProjection();
      return [projection.refresh(snapshotOf(one, STAMPS[1], ref(one))), projection.refresh(snapshotOf(two, STAMPS[0], ref(two)))];
    };
    const sequence = (ref: (record: ImportedRecord) => NativeRef): string[] => {
      const projection = new ObservationProjection();
      return [projection.ingest(eventOf(one, 9, ref(one))), projection.ingest(eventOf(two, 3, ref(two)))];
    };
    const witness = { captureOrder: capture(identityRef), sequenceOrder: sequence(identityRef), workspaceKeyedCapture: capture(workspaceRef), workspaceKeyedSequence: sequence(workspaceRef) };
    expect(witness, "an ordering shared across two authorities").toStrictEqual({
      captureOrder: ["applied", "applied"],
      sequenceOrder: ["applied", "applied"],
      workspaceKeyedCapture: ["applied", "out-of-order"],
      workspaceKeyedSequence: ["applied", "out-of-order"],
    });
    return witness;
  },
  C1: () => {
    const pairs = propertyPairs();
    const classes: Record<PairClass, number> = { "distinct-origin": 0, "distinct-epoch": 0, "same-stream": 0 };
    for (const [a, b] of pairs) classes[classOf(a, b)]++;
    const witness = { cases: pairs.length, classes, reference: violations(compareRevisions, pairs), rawCounter: violations(rawCounter, pairs), epochBlind: violations(epochBlind, pairs) };
    expect(Object.values(classes).every(count => count >= 25), "the generator under-reached a class").toBe(true);
    expect(witness.reference, "compareRevisions compared across an origin or an epoch").toBe(0);
    expect(witness.rawCounter, "the raw-counter comparator held the property").toBe(classes["distinct-origin"] + classes["distinct-epoch"]);
    expect(witness.epochBlind, "the epoch-blind comparator held the property").toBe(classes["distinct-epoch"]);
    return witness;
  },
  C2: () => {
    const pairs = propertyPairs();
    const planted: [StreamPoint, StreamPoint] = [
      { workspace_id: WORKSPACE_POOL[0] ?? "", backend_instance_id: INSTANCE_POOL[0] ?? "", source_epoch: "1", source_revision: "23" },
      { workspace_id: WORKSPACE_POOL[0] ?? "", backend_instance_id: INSTANCE_POOL[0] ?? "", source_epoch: "12", source_revision: "3" },
    ];
    const opaque: [StreamPoint, StreamPoint] = [
      { ...planted[0], source_epoch: "1", source_revision: "2:3" },
      { ...planted[0], source_epoch: "1:2", source_revision: "3" },
    ];
    const witness = {
      reference: collisions(streamKey, pairs),
      concatenated: collisions(concatenatedKey, pairs),
      plantedReference: collisions(streamKey, [planted, opaque]),
      plantedConcatenated: collisions(concatenatedKey, [planted]),
      plantedSeparated: collisions(separatedKey, [opaque]),
    };
    expect([witness.reference, witness.plantedReference], "streamRevision merged two distinct stream points").toStrictEqual([0, 0]);
    expect(witness.concatenated > 0 && witness.plantedConcatenated === 1, "the concatenated key never merged a pair").toBe(true);
    expect(witness.plantedSeparated, "the separator-joined key kept two opaque points apart").toBe(1);
    return witness;
  },
  C3: () => {
    const [first, second] = ROSTER.epochs;
    if (first === undefined || second === undefined) throw new Error("the roster holds no epochs pair");
    const reference = new ObservationProjection();
    const outcomes = [reference.refresh(snapshotOf(first, STAMPS[0])), reference.refresh(snapshotOf(second, STAMPS[1]))];
    const version = nodesOf(reference)[0]?.sourceVersion ?? null;
    const counterFed = new ObservationProjection();
    const counterOutcomes = [
      counterFed.refresh({ ...snapshotOf(first, STAMPS[0]), sequence: first.observation.source_revision }),
      counterFed.refresh({ ...snapshotOf(second, STAMPS[1]), sequence: second.observation.source_revision }),
    ];
    const comparison = compareRevisions(pointOf(first), pointOf(second));
    expect(outcomes, "a new epoch's revision was ordered against the old epoch's").toStrictEqual(["applied", "applied"]);
    expect(version).toBe(streamRevision(second));
    expect(counterOutcomes, "a counter riding as a sequence was not ordered across the epochs").toStrictEqual(["applied", "out-of-order"]);
    expect(comparison).toStrictEqual({ comparable: false, reason: "distinct-epoch" });
    return { outcomes, version, counterAsSequence: counterOutcomes, comparison };
  },
  C4: () => {
    const [record] = ROSTER.epochs;
    if (record === undefined) throw new Error("the roster holds no epochs record");
    const projection = new ObservationProjection();
    /** Two refs whose parts join to one string under a ":" concatenation: the type/id boundary moves, the joined text does not. */
    const refs: NativeRef[] = [
      { provider: "reactivefiber", type: `${IMPORT_TYPE}:1`, id: "23" },
      { provider: "reactivefiber", type: IMPORT_TYPE, id: "1:23" },
    ];
    const outcomes = refs.map(ref => projection.refresh(snapshotOf(record, STAMPS[0], ref)));
    const keys = nodesOf(projection).map(node => node.key);
    expect(outcomes).toStrictEqual(["applied", "applied"]);
    expect(new Set(keys).size, "the projection's key concatenates its parts").toBe(2);
    return { outcomes, nodes: keys.length, tupleKeys: keys.every(key => Array.isArray(JSON.parse(key))) };
  },
  C5: () => {
    const { witness, hits } = scanRfScope(revisionJoinHits);
    expect(hits, "rf-scope src revision-named interpolations joined into one key").toEqual([]);
    return witness;
  },
  QS1: () => {
    const outside = "src/index.ts";
    const source = `${TICK}rf-workspace:${interpolate("workspace.root")}${TICK}`;
    const witness = {
      scannedOutside: inRfScope(outside),
      matcherWouldHit: locatorHits(source).length > 0,
      scannedNamed: inRfScope("src/workbench/federation-import.ts"),
      scannedRfToken: inRfScope("src/workbench/import-rf.ts"),
    };
    expect(witness).toStrictEqual({ scannedOutside: false, matcherWouldHit: true, scannedNamed: true, scannedRfToken: true });
    return witness;
  },
  KP1: () => {
    const missed = keySpellingMisses(ROSTER.keyNames);
    expect(missed, "a key-like property name row A5 does not read in some spelling").toEqual([]);
    return { names: ROSTER.keyNames.length, spellings: Object.keys(KEY_SPELLINGS), missed };
  },
  KP2: () => {
    const missed = keySpellingMisses(ROSTER.keySuffixes.map(suffix => `source${suffix}`));
    expect(missed, "a key-like property suffix row A5 does not read in some spelling").toEqual([]);
    return { suffixes: ROSTER.keySuffixes.length, spellings: Object.keys(KEY_SPELLINGS), missed };
  },
  MK1: () => {
    const missed = ROSTER.collectionMethods.filter(method => !sameHits(locatorHits(`index.${method}(link.locator);`), ["map link.locator"]));
    expect(missed, "a Map or Set key method row A5 does not read").toEqual([]);
    return { methods: ROSTER.collectionMethods.length, missed };
  },
  LW1: () => {
    const missed = ROSTER.locatorWords.flatMap(word =>
      Object.entries(LOCATOR_FORMS)
        .filter(([form, spell]) => !sameHits(locatorHits(spell(`link.${word}`)), [`${form} link.${word}`]))
        .map(([form]) => `${word}/${form}`),
    );
    expect(missed, "a locator word a row A5 form does not read").toEqual([]);
    return { words: ROSTER.locatorWords.length, forms: Object.keys(LOCATOR_FORMS), missed };
  },
  RW1: () => {
    const missed = ROSTER.revisionWords.flatMap(word =>
      Object.entries(REVISION_FORMS)
        .filter(([, form]) => !sameHits(revisionJoinHits(form.spell(`point.${word}`)), [form.hit(`point.${word}`)]))
        .map(([name]) => `${word}/${name}`),
    );
    expect(missed, "a revision word a row C5 form does not read").toEqual([]);
    return { words: ROSTER.revisionWords.length, forms: Object.keys(REVISION_FORMS), missed };
  },
  PC1: () => {
    const [record] = ROSTER.aliasRename;
    if (record === undefined) throw new Error("the roster holds no aliasRename record");
    const first = snapshotOf(record, STAMPS[0]);
    /** Each plant moves one state field of the node and holds the other three. */
    const plants: Readonly<Record<StateField, NativeSnapshot>> = {
      key: snapshotOf(record, STAMPS[1], { ...identityRef(record), id: `${identityKey(record)}#planted` }),
      definitionDigest: { ...snapshotOf(record, STAMPS[1]), definitionDigest: `sha256:${"2".repeat(64)}` },
      sourceVersion: snapshotOf(record, STAMPS[1], identityRef(record), streamRevision({ ...record, observation: { ...record.observation, source_revision: "5" } })),
      evidenceRefs: snapshotOf(record, STAMPS[1], identityRef(record), streamRevision(record), "rf-authority:planted"),
    };
    const moved = STATE_FIELDS.map(field => {
      const { state } = projectStates([first, plants[field]]);
      return movedFields(state[0], state[1]);
    });
    expect(moved, "row A3's state capture missed a planted state move").toStrictEqual(STATE_FIELDS.map(field => [field]));
    return { planted: [...STATE_FIELDS], moved };
  },
  PC2: () => {
    const [root] = LOCATORS;
    const { snapshot } = readUnder(root);
    const clean = !locatorIn(snapshot, root);
    const unseen = KEY_BEARING_FIELDS.filter(field => !locatorIn(plantLocator(snapshot, field, root), root));
    expect(clean, "the unplanted snapshot already carries the locator").toBe(true);
    expect(unseen, "a key-bearing field row A4's instrument does not read").toEqual([]);
    return { fields: [...KEY_BEARING_FIELDS], clean, unseen };
  },
  PC3: () => {
    const { witness, hits } = scanRfScope(locatorHits, plantedTree(LOCATOR_PLANT));
    const plant = relative(REPO, PLANT_FILE);
    expect(hits, "row A5's scan did not report the planted locator keys").toStrictEqual(LOCATOR_PLANT_HITS.map(hit => `${plant}: ${hit}`));
    return witness;
  },
  PC4: () => {
    const { witness, hits } = scanRfScope(revisionJoinHits, plantedTree(REVISION_PLANT));
    const plant = relative(REPO, PLANT_FILE);
    expect(hits, "row C5's scan did not report the planted revision joins").toStrictEqual(REVISION_PLANT_HITS.map(hit => `${plant}: ${hit}`));
    return witness;
  },
  PC5: () => {
    const reads = LOCATORS.map(root => readUnder(root));
    /** The reader plant row A4 must catch, written into a copy of each real read: a key derived from the read's own root (its
     * sha256 as the source revision) that carries no literal locator. */
    const planted = reads.map(read => ({ ...read.snapshot, sourceRevision: sha256(read.reading.workspaceRoot) }));
    const control = judgeReads(reads.map(read => read.snapshot));
    const judged = judgeReads(planted);
    expect(control.sameKeys, "the unplanted reads already keyed differently").toBe(true);
    expect(judged, "row A4's judgment missed a key derived from each read's root").toStrictEqual({ sameKeys: false, leaked: [] });
    return { controlSameKeys: control.sameKeys, plantedSameKeys: judged.sameKeys, plantedLeaked: judged.leaked };
  },
  PC6: () => {
    const { reported, missed, untargeted, anchorReports } = appendedScan(locatorHits, LOCATOR_PLANT, LOCATOR_PLANT_HITS);
    expect(missed, "row A5's scan missed a plant appended to the live text of an rf-scope file").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row PC6 never planted into").toEqual([]);
    expect(anchorReports, "an anchor row PC6 did not see the whole plant in").toEqual(ANCHORS.map(() => LOCATOR_PLANT_HITS.length));
    return { reported: [...reported], missed: [...missed], untargeted: [...untargeted], anchorReports: [...anchorReports] };
  },
  PC7: () => {
    const { reported, missed, untargeted, anchorReports } = appendedScan(revisionJoinHits, REVISION_PLANT, REVISION_PLANT_HITS);
    expect(missed, "row C5's scan missed a plant appended to the live text of an rf-scope file").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row PC7 never planted into").toEqual([]);
    expect(anchorReports, "an anchor row PC7 did not see the whole plant in").toEqual(ANCHORS.map(() => REVISION_PLANT_HITS.length));
    return { reported: [...reported], missed: [...missed], untargeted: [...untargeted], anchorReports: [...anchorReports] };
  },
  PC8: () => {
    const { readings, missed, untargeted, anchorsReadShort } = shortReadScan("tree");
    expect(missed, "the scans' read-in-full check missed an rf-scope file read one character short").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row PC8 never read short").toEqual([]);
    expect(anchorsReadShort, "an anchor row PC8 never saw reported as read short").toEqual(ANCHORS.map(() => true));
    return { readings: [...readings], missed: [...missed], untargeted: [...untargeted], anchorsReadShort: [...anchorsReadShort] };
  },
  PC9: () => {
    const { readings, missed, untargeted, anchorsReadShort } = shortReadScan("tree and disk");
    expect(missed, "the scans' size check missed an rf-scope file both readers read one character short").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row PC9 never read short").toEqual([]);
    expect(anchorsReadShort, "an anchor row PC9 never saw reported as read short by both readers").toEqual(ANCHORS.map(() => true));
    return { readings: [...readings], missed: [...missed], untargeted: [...untargeted], anchorsReadShort: [...anchorsReadShort] };
  },
  PC10: () => {
    const { bytes, decodedBytes, reading } = sizeControlScan();
    expect(reading, "the scans' size check did not report exactly the control whose bytes are not UTF-8").toStrictEqual({
      unread: [],
      unsized: ["control"],
      anchorsUnread: [],
      offDisk: [],
      hits: [],
    });
    return { bytes, decodedBytes, reading };
  },
  PC11: () => {
    const { readRfScopeText, scanRfScopeText, ...wiring } = sizeAnchorWiring();
    expect(wiring, "the size anchor's wiring differs from the statSync read the header states").toStrictEqual({
      sizeOnDiskBody: "{ try { return statSync(path).size; } catch { return undefined; } }",
      readRfScopeDefaults: { readDisk: "diskText", readSize: "sizeOnDisk" },
      readRfScopeReaders: [],
      scanCalls: [["matcher", "tree"]],
      bindings: ["readFileSync: import node:fs", "statSync: import node:fs"],
    });
    const heads = [readRfScopeText?.startsWith("function readRfScope(") ?? false, scanRfScopeText?.startsWith("function scanRfScope(") ?? false];
    expect(heads, "row PC11 did not read the two declarations whose text the roster holds").toEqual([true, true]);
    return { ...wiring, readRfScopeText, scanRfScopeText };
  },
  PC12: () => {
    const refusals = scanControlRefusals();
    const refused: Json = { refusedAt: "rf-scope files whose text on disk does not hold the size statSync reports", named: ["control"] };
    expect(refusals, "the scan itself did not refuse the control whose bytes are not UTF-8 at its size check, naming the control alone").toStrictEqual({
      locatorHits: refused,
      revisionJoinHits: refused,
    });
    return refusals;
  },
  QP1: () => {
    const { readings, counterparts, loud, unseen, untargeted, anchorsQuiet } = quietCutScan("size step");
    expect(loud, "the scans' reading saw a file read short through both text readers and the size anchor together (R-SIZE-STEP)").toEqual([]);
    expect(unseen, "the size check missed a file read short through both text readers with the size anchor whole").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row QP1 never cut").toEqual([]);
    expect(anchorsQuiet, "an anchor row QP1 never read quiet under its cut").toEqual(ANCHORS.map(() => true));
    return { readings: [...readings], counterparts: [...counterparts], loud: [...loud], unseen: [...unseen], untargeted: [...untargeted], anchorsQuiet: [...anchorsQuiet] };
  },
  QP2: () => {
    const { readings, counterparts, loud, unseen, untargeted, anchorsQuiet } = quietCutScan("same length");
    expect(loud, "the scans' reading saw a file whose last character both text readers rewrote at its own byte length (R-SAME-LENGTH)").toEqual([]);
    expect(unseen, "the read-in-full check missed a file whose last character the tree alone rewrote at its own byte length").toEqual([]);
    expect(untargeted, "rf-scope files or anchors row QP2 never cut").toEqual([]);
    expect(anchorsQuiet, "an anchor row QP2 never read quiet under its cut").toEqual(ANCHORS.map(() => true));
    return { readings: [...readings], counterparts: [...counterparts], loud: [...loud], unseen: [...unseen], untargeted: [...untargeted], anchorsQuiet: [...anchorsQuiet] };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      () => {
        const hit = spelling.matcher(spelling.source).length > 0;
        expect(hit).toBe(spelling.hit);
        return { digest: sha256(spelling.source).slice(0, 16), hit };
      },
    ]),
  ),
};

describe("wb-o4h0.2 federated identity census (RF-FEDERATED-WORKSPACES-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:5", "MA:23", "MC:17", "MV:5", "PC:14"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ identityFields: [...IDENTITY_FIELDS], gatingArtifacts: [...GATING_ARTIFACTS] }).toStrictEqual({
      identityFields: [...ROSTER.identityFields],
      gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
    const vocabularies = {
      locatorWords: [...LOCATOR_WORDS],
      revisionWords: [...REVISION_WORDS],
      keyNames: [...KEY_NAMES],
      keySuffixes: [...KEY_SUFFIXES],
      collectionMethods: [...COLLECTION_METHODS],
    };
    expect(vocabularies, "a matcher vocabulary differs from the roster's, word for word").toStrictEqual({
      locatorWords: [...ROSTER.locatorWords],
      revisionWords: [...ROSTER.revisionWords],
      keyNames: [...ROSTER.keyNames],
      keySuffixes: [...ROSTER.keySuffixes],
      collectionMethods: [...ROSTER.collectionMethods],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("every judged pin reached its witness compare, in the roster's row order", () => {
    expect(REACHED, "a pin whose test is not registered, is skipped or never reached its witness compare").toEqual(
      ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)),
    );
  });
});
