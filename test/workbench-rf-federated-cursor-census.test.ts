/**
 * wb-tnz5.2 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R3), the absent-today leg. Statement (bead notes): "No Pi surface
 * reading federation records shall identify or interconvert the six identifiers (resource revision, stream cursor, acceptance
 * commit id, publication sequence, SnapshotCursor, render transaction id), use an alias as owner identity, or label a record the
 * owner's latest/current; identity and freshness are producer-declared, echoed verbatim (gated FW-CFRR-04a rfc-bak67.9: typed,
 * unserved at the pin)" (docs/programs/certified-federated-reactive-refinement-2026-10-18/03-source-to-model-proof-gates-and-
 * versioned-cursors.md:7@6a251bf73af5). Acceptance, quoted, and read back at run time from the tracked bead export
 * .beads/issues.jsonl: "(a) the six identifiers stay distinct typed fields, none assigned from another; an unrelated journal
 * event advances the stream cursor, resource revision unchanged; (b) no cross-epoch/feed cursor comparison without a producer
 * resync mapping; owner identity never an alias; (c) accepted-at-c below watermark h never renders owner-latest/current; a grep
 * guard pins no minted 'latest'/'current' (0 federation hits in Pi src)."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat): the
 * roster vendors 25 producer lines verbatim, each hashed here (EXCERPT_SHA256, `git show <pin>:<path> | sed -n '<n>p' |
 * sha256sum`). In the program directory: 03-source-to-model-proof-gates-and-versioned-cursors.md :7 (the six identifiers, "Never
 * identify: (1) ... or (6) render transaction id"), :9 (event 10 for unrelated Y while X stays revision 2; "The naive
 * sourceRevision=eventCursor assertion is false"; cursors compare only within one declared owner instance/epoch/stream or under a
 * verified cross-epoch resync mapping), :16 (notification cursor h kept apart from accepted cursor c, sourceDirty=(h>c)), :17
 * (SnapshotCursor is not the federation event cursor and shares no schema with it), :33 (conformance gates (a) and (d), "never
 * claims B latest"); README.md :22 (ResourceKey opens with owner WId, backend IId), :25 ("Do not reuse a render transaction id as
 * the source revision; do not use an alias as owner identity; no implicit 'latest' guarantee."), :28 (an alias is resolved through
 * B's public API and checked against the expected WId/IId); 02-concrete-contract-and-verification-gates.md:20 (the fields "MUST be
 * separately typed"; "an unrelated journal event advances stream cursor without changing resource revision"; "A source epoch
 * change makes old/new cursors incomparable"). In src/reactive_fiber_cli/domain: federation_boundary.py :39-:40 (OwnerResource
 * workspace_id, backend_instance_id), :62 and :65-:67 (OwnerStreamCursor epoch, stream_id, position), :86 (resource_revision),
 * :123 and :131 (AcceptedBoundary consumer_transaction_id), :148 (notified_position, the watermark h), :170 (source_dirty is
 * notified_position > position), :182 and :214 (the epoch-resync refusals); query_view.py :534 and :539-:540 (SnapshotCursor
 * source_id, value_digest). Gating (bead notes): the receipt/export fields are typed at the pin in domain/federation_boundary.py
 * and served over no rf leaf; FW-CFRR-04a rfc-bak67.9 exposes them. Pi at base e8850da: no src file spells a federation scope
 * word, and the one rf reader refuses any envelope that carries a transaction.
 *
 * THE REFERENCE RULE (the rule a future federation reader must match; no reader is added or faked here): importIds reads each of
 * the six identifiers from its own producer input (INPUTS) into its own typed field (IDENTIFIERS; the two cursors keep the
 * producer schemas, and they share no field); a resource rides into Pi's projection as resourceRef (owner tuple and resource
 * name), its resource revision as sourceRevision (revisionOf), its stream cursor as an opaque cursor qualified by owner, epoch and
 * stream (cursorOf), its owner as the evidence ref ownerRef (workspace_id, backend_instance_id), never the alias; Pi hands the
 * projection no producer position as a sequence; compareCursors compares two cursors only inside one owner, stream and epoch, or
 * through a producer-declared ResyncMapping, and is otherwise typed non-comparable; an accepted receipt enters the projection as an
 * observation event (ingest), never as a read-current snapshot (refresh), and its text is renderAccepted, the producer's accepted
 * cursor c, watermark h and source_dirty echoed, with no minted label.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; in rows A-C pin n covers acceptance part n):
 *  A1 "the six identifiers stay distinct typed fields, none assigned from another": the excerpts hash to EXCERPT_SHA256;
 *    IDENTIFIER_PHRASES is 03:7's enumeration; the stream cursor, snapshot cursor and owner fields, the two producer inputs and
 *    the three class names are the vendored producer lines; importIds yields one field per kind, the stream cursor keeps
 *    OwnerStreamCursor's fields and the snapshot cursor SnapshotCursor's, with no field shared; its move matrix (perturb each input,
 *    record the fields that move) is the diagonal, while each of NAIVE_IMPORTS (revision from the event cursor, 03:9; revision
 *    from the render transaction, README:25; snapshot cursor from the stream cursor, 03:17; acceptance commit from the render
 *    transaction, 03:7 (3) and (6)) moves a second field or none, and the third shares the stream cursor's schema; Pi's shipped rf
 *    reader (reactivefiberTopology) refuses an envelope carrying a render transaction id ('validation', naming transaction_id),
 *    while the same envelope without one projects one snapshot whose sourceRevision is the graph revision.
 *  A2 "an unrelated journal event advances the stream cursor, resource revision unchanged": the 03:9, 03:33 (a) and 02:20 phrases;
 *    importIds of X at fence 6 and of X at fence 10 (after the owner's event 10 for unrelated Y) move the stream cursor and keep the
 *    resource revision, while revision-from-event-cursor moves it; in Pi's real ObservationProjection the reference mapping keeps
 *    X's version through the fence move and advances its cursor (the version index still finds X), while the naive mapping moves
 *    the version from 6 to 10 and loses X under its first version.
 *  B1 "no cross-epoch/feed cursor comparison without a producer resync mapping": the 03:9 and 02:20 phrases and the two producer
 *    refusals; over PROPERTY_CASES seeded pairs compareCursors returns the typed non-comparable reason for every cross-owner,
 *    cross-feed and cross-epoch pair and the position order inside one stream, while the raw-position, epoch-blind and
 *    stream-blind comparators fail it; a planted producer mapping makes exactly its own mapped position comparable (an unmapped
 *    position, the reverse direction, another feed and another owner stay non-comparable); in Pi's real projection a new epoch's
 *    or another feed's lower position is admitted and marked stale (a gap: resync required) under the reference rule, a contiguous
 *    same-stream successor is admitted and not stale, and a position riding as a sequence is ordered across the epoch and the
 *    feed and dropped out-of-order.
 *  B2 "owner identity never an alias": the README:22, :25 and :28 phrases and OwnerResource's fields; the owner key keeps two
 *    owners read under one re-pointed alias apart and survives an alias rename, the alias key merges them and moves on the
 *    rename; in Pi's real projection the owner evidence ref returns each owner's own node before and after the rename, the alias
 *    ref returns both owners in one bucket and splits on the rename.
 *  C1 "accepted-at-c below watermark h never renders owner-latest/current": the 03:16, 03:33 (b) and (d) and README:25 phrases,
 *    the producer's watermark field and dirty rule, and the roster's states held to 03:33 (b) (c=6, h=8) and to that rule; over
 *    seeded (c, h) states renderAccepted mints no label, echoes c, h and the producer's flag exactly, while the two NAIVE_RENDERS
 *    mint one for every dirty state; through Pi's real projection and its workflow_observe reply builder (observeInvocation) the
 *    receipt as a refresh is minted freshness "current" and the summary "all returned nodes current" (the hazard), while the
 *    receipt as an event is "unknown", its summary mints nothing and its status text is renderAccepted's, dirty and clean alike.
 *    The echo instrument's own positive control (wb-zg8m F2): each MIS_ECHOES render mis-echoes exactly one producer field (c,
 *    h or the dirty flag) on the seeded states at accepted cursor MIS_ECHO_AT only, and the instrument counts exactly those
 *    states for each field; a render it cannot parse (each NAIVE_RENDERS member) fails every state.
 *  C2 "a grep guard pins no minted 'latest'/'current' (0 federation hits in Pi src)": every src directory is walked at its floor
 *    (FLOORS, two below the direct-file counts at e8850da, 35/11/49/2/4/14, never under 1), and the walk C2 reads (srcFiles) is
 *    held at the call site to an independent enumeration of src (enumeratedSrcOf: Node's recursive listing, each entry lstat-ed,
 *    the regular files kept; wb-rmd7 F1/F2): the same paths, none missing and none extra; the list the guard scans is held there
 *    by construction (wb-lotb F1): scanRead returns the scan beside the reading of the one list it scanned (each path with the
 *    sha256/16 of its text), and that reading equals the independent reading of src (enumeratedFilesOf, enumeratedReadingOf: the
 *    enumeration's paths, each text read by its own call), so a filter, slice or text change on the scanner's argument reds as a
 *    reading line missing or extra, and the guard holds the independent reading itself to no scoped file and no mint, so a
 *    verdict taken from a second, narrowed scan reds there too; the anchor (observation.ts, the refresh mint) is read and the mint
 *    matcher catches its "current"; no src file is federation-scoped (a file is scoped when its path or its text carries a
 *    FEDERATION_WORDS run) and none mints; the same scanner reports a planted set's three federation mints (one scoped by its path
 *    alone, one by its path and its text, and one by its text alone, in a comment, under a path that spells no FEDERATION_WORDS
 *    member: wb-lotb F2) and holds an unscoped mint out. The walk's own positive controls (wb-zg8m F1, widened by wb-rmd7 F1):
 *    WALK_PLANT is written under a makeScratch root and read back through the same walk (srcFilesOf, filesBelow) and through the
 *    independent enumeration, each of which returns every planted regular file - a non-.ts file, a .ts file one level below the
 *    deepest FLOORS directory, a non-.ts file three levels deeper than it, a dot-named file, a file in a dot-named directory, an
 *    extensionless file and a .mjs file included - scanRead's reading of the walked plant equals the plant's independent reading
 *    line for line (wb-lotb F1), and the scanner reports their seven federation mints and holds the unscoped one out; the floors
 *    compare (floorReadings) reads a list holding each FLOORS directory's floor exactly as every directory at its floor, and that
 *    list one direct file short in each directory in turn as exactly that directory below its floor.
 *  M, the matchers C2 reads: MS1-MS4 one pin per FEDERATION_WORDS member, MM1-MM2 one per MINT_WORDS member; each spelling is
 *    caught by its own member only, and each mint pin pins its misses (currently, concurrent, currency and two non-words).
 *  R, the named residuals of C2, each a pinned quiet row: R1 R-VOCABULARY (a mint in a file whose path and text spell no scope
 *    word), R2
 *    R-COMPOSED (a label assembled at run time), R3 R-PARAPHRASE (newest, up to date), R4 R-INTERRUPTED (a zero-width code point
 *    inside a scope or mint word), R5 R-OUTSIDE-SRC (a federation file outside src: qa/, test/ and every other root), R6 R-INDIRECT
 *    (a federation file minting through ObservationProjection.refresh carries no mint word; C1 pins that hazard live).
 * ANCHORS OUTSIDE THE CENSUS (rule 16 CT5/CT6): the tracked bead export (ACCEPTANCE is held to its Acceptance line, each row A-C
 * label to its clause, each clause's part count to its row's pin count; the scope words it names, "federation" and "watermark",
 * and the producer's watermark field and accepted class name must each be caught by exactly one FEDERATION_WORDS member and every
 * member must catch one; its quoted labels are MINT_WORDS; RESIDUALS, pin and name in order, is the residual list the first
 * cut's delivery note declares in the same row, its "RESIDUALS (first cut; ...)" line, wb-zg8m F3) and the producer lines
 * (IDENTIFIER_PHRASES, the fields and the classes). FROZEN SHAPE: ROWS pins `${id}:${pins.length}` as a literal, and the judged
 * set (rows, labels, pins, every pin's witness and every census constant) is held to the out-of-file roster
 * test/fixtures/rf-federated-cursor-roster.json.
 * NOT CLAIMED: an edit of the tracked bead export itself (it is machine-written at each ledger hop; a coordinated edit of this
 * file and the roster that removes one R pin together with its RESIDUALS entry reds through the export's RESIDUALS line); a
 * positive control removed or bypassed together with the instrument it controls (WALK_PLANT and the floors list beside
 * filesBelow and floorReadings, the independent enumeration beside srcFiles, the independent reading and its verdict beside
 * scanRead - a second, narrowed scan taken beside scanRead's own together with a narrowed or removed independent verdict
 * included -, MIS_ECHOES beside echoFailuresOf: each control lives in this file); a walk or reading narrowing that keeps every
 * WALK_PLANT shape reads a src tree holding no other shape exactly as the intact one does (at base 6e0c3d2: 116 regular files, all
 * .ts, no dot-named entry, no extensionless file, no symlink), and reds through the enumeration or the independent reading once
 * src holds a file of a shape it drops; a symbolic link to a file is read by neither the walk nor the enumeration (on Node 24 the
 * enumeration lists the files below a linked directory, which then red C2 as missing from the walk).
 * SCOPE: the guard does not judge negation or context: a federation-scoped file spelling a mint word anywhere reds, a comment
 * stating the prohibition included. The excerpts are producer facts at 6a251bf73af5; Pi vendors no rf source, so a producer-side
 * change is seen only when an rf pin-bump re-reads them. The live legs are A1's rf reader, A2, B1, B2 and C1 (Pi's real
 * projection, and observeInvocation in C1) and C2 (the src tree); the rest hold the reference rule itself.
 *
 * FOLLOW-UP wb-zg8m (R694 from landing 272; gate of record cmd_0ccc268a98b6 composing machine gate cmd_be9ca893214a): F1 the
 * walk and floors positive controls in C2, F2 the echo instrument's per-field control in C1, F3 the residual list's outside
 * anchor in the judged set; the ROWS shape is unchanged.
 * FOLLOW-UP wb-rmd7 (R694 from landing 366, wb-zg8m; gate of record cmd_8f32da52fe24): F1 the walk held at the C2 call site to
 * an independent enumeration of src, which the walk plant also controls, and WALK_PLANT widened by a dot-named file, a file in a
 * dot-named directory, an extensionless file and a .mjs file; F2 the srcFiles() caller, now read against that enumeration at
 * the same call site; the ROWS shape is unchanged.
 * FOLLOW-UP wb-lotb (R694 from landing 460, wb-rmd7; gate of record cmd_8fe7488ca561): F1 the list the guard scans held at the
 * C2 call site to an independent reading of src by construction (scanRead, enumeratedFilesOf, enumeratedReadingOf; the walk
 * plant controls both readings), and the guard's verdict held over that independent reading too; F2 a text-alone PLANTED control
 * whose path spells no FEDERATION_WORDS member, so the scope's text branch has its own positive control; the ROWS shape is
 * unchanged.
 *
 * Display paths added: none. Test-only: nothing is spawned; C2 writes WALK_PLANT under one makeScratch root (leak guard
 * installed) and removes it in the same case; src, the bead export and this roster are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
} from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, RF_FIXTURE_GRAPH_REVISION } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federated-cursor-roster.json");
const BEAD = "wb-tnz5.2";
const BEADS_EXPORT = join(REPO, ".beads", "issues.jsonl");

const CFRR = "docs/programs/certified-federated-reactive-refinement-2026-10-18";
const CURSORS_DOC = `${CFRR}/03-source-to-model-proof-gates-and-versioned-cursors.md`;
const README_DOC = `${CFRR}/README.md`;
const CONCRETE_DOC = `${CFRR}/02-concrete-contract-and-verification-gates.md`;
const BOUNDARY_PY = "src/reactive_fiber_cli/domain/federation_boundary.py";
const QUERY_VIEW_PY = "src/reactive_fiber_cli/domain/query_view.py";

/** sha256 of each vendored producer line at the pin, newline-terminated: `git show <pin>:<path> | sed -n '<n>p' | sha256sum`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  [`${CURSORS_DOC}:7`]: "541fc25ff22e4f094088158dfc2049967a736a71c8e548331252370ca92afde3",
  [`${CURSORS_DOC}:9`]: "0cc66a278e709c85032ec4913054da0483f611eca7f83fc2c8aaeab92b056556",
  [`${CURSORS_DOC}:16`]: "41f402ded5afe7d9c926f2c07e212ced2c9c2f2514475e956f9fa8aea6ca8bce",
  [`${CURSORS_DOC}:17`]: "33e31d6a7464d424c6c1631579cd6e924f9af94b5db12fced1b5419a40015150",
  [`${CURSORS_DOC}:33`]: "ec41ed5682ba7c4b249bd4481c9b2887c54fb0239e8d264409ef546044c7afd1",
  [`${README_DOC}:22`]: "6f183309fa35b916c7bcc5f983aa5a86db331b358fa68aae4a6b2cac044ce516",
  [`${README_DOC}:25`]: "589b1bcee4ea3ec73e0ecd3dc5804f728a1db9a1cddcc38eb99c514134c4ed41",
  [`${README_DOC}:28`]: "ac9d7f3130060e59f43d2e71428312dce69fbe76cfe52374968f80dc36bced49",
  [`${CONCRETE_DOC}:20`]: "72983e14d210b265763345a37886efb54d639c19815d612b3118889371452547",
  [`${BOUNDARY_PY}:39`]: "e46cff21169ec2b62f57bd14044fd0c23b954779edced53e4664d5e3058181b8",
  [`${BOUNDARY_PY}:40`]: "e5e735f8fee8e25eb5692581cb88b1995c0ce95a37630be416585c54807f9577",
  [`${BOUNDARY_PY}:62`]: "b7af6de3d732f09d3fd04b2af15ef1acd4bdcb75584a74b0898df885be3955bd",
  [`${BOUNDARY_PY}:65`]: "3de3cd2badc6522611387553b48adf6b55d83010e66703837b30f7c34b2c6ed0",
  [`${BOUNDARY_PY}:66`]: "f6639ad064bf5b374e822f1ec0605d720db2eb02f3411a9f41cced2a91f0338f",
  [`${BOUNDARY_PY}:67`]: "a60147a22c3f4c53d0aa6d9cf450c6c6f5efac967624b7a698feed1e5b565640",
  [`${BOUNDARY_PY}:86`]: "e76da6468ab575648c5d99ba75f497d68e852f852fda6aea942b73f44ae685b0",
  [`${BOUNDARY_PY}:123`]: "ba263981e589d34fd5135dbfcc9c09c7ed08f55bd885df5ab74cc0160fc9a019",
  [`${BOUNDARY_PY}:131`]: "451202c2952657e82c588700f8224bb4b3debfd4174b7a69b87f569fb1094821",
  [`${BOUNDARY_PY}:148`]: "ed21aa0c8314644164e858feae35127c7d0308e6c48bca2cb2b6a46992d5b942",
  [`${BOUNDARY_PY}:170`]: "cc2950762b2eb904b2d660bc8922a7fe58ddacb6c58e5624303bbbf49b06bcd9",
  [`${BOUNDARY_PY}:182`]: "c788ddba787202223752c867882945db3fabada302b71f047836eab5ff35d2c6",
  [`${BOUNDARY_PY}:214`]: "03b32e73d519589c0b91d808cb8cf6a61109ea415186c002fc15d097285b5c69",
  [`${QUERY_VIEW_PY}:534`]: "f64ec8e65fcb81163d7aa2b101ce82e5f3c66087800cbfa16ebf17aa7cf00fe9",
  [`${QUERY_VIEW_PY}:539`]: "f679aeddcaffe0e42bb18927bc3d102cffd7ed77fb94093f816633bf54a104ff",
  [`${QUERY_VIEW_PY}:540`]: "f13873617dd27650d36c8d86be56770766c496dde9d3572d999b32521971bac0",
};

/** The six identifiers 03:7 enumerates, in its order: each is one typed field of the reference record. */
const IDENTIFIERS = ["resource-revision", "stream-cursor", "acceptance-commit", "publication-sequence", "snapshot-cursor", "render-transaction"] as const;
type IdentifierKind = (typeof IDENTIFIERS)[number];
/** 03:7's own phrase for each identifier, in order; A1 holds this list to the vendored line. */
const IDENTIFIER_PHRASES: readonly string[] = [
  "source owner's resource revision",
  "owner stream event cursor",
  "A's acceptance transaction/commit id",
  "Fiber value publication sequence",
  "RFCLI QueryStore SnapshotCursor keyed by (source_id,value_digest)",
  "render transaction id",
];
/** The producer input each identifier is read from, in IDENTIFIERS order: OwnerBoundary.resource_revision and .cursor,
 * AcceptedBoundary.consumer_transaction_id, rf's publication_sequence, QueryStore's SnapshotCursor and the render envelope's
 * transaction_id. */
const INPUTS = ["resource_revision", "cursor", "consumer_transaction_id", "publication_sequence", "snapshot_cursor", "render_transaction_id"] as const;
type Input = (typeof INPUTS)[number];
const STREAM_CURSOR_FIELDS = ["epoch", "stream_id", "position"] as const;
const SNAPSHOT_CURSOR_FIELDS = ["source_id", "value_digest"] as const;
const OWNER_FIELDS = ["workspace_id", "backend_instance_id"] as const;
/** A src file is federation-scoped when its path or its identifier words carry one of these runs, each part a word prefix. */
const FEDERATION_WORDS: readonly (readonly string[])[] = [["federat"], ["watermark"], ["notified", "position"], ["accepted", "boundar"]];
/** The minted labels acceptance (c) names; a scoped file spelling one as a whole word mints it. */
const MINT_WORDS: readonly string[] = ["latest", "current"];
/** Per-directory floors on the direct files walked: two below the counts measured at base e8850da (35, 11, 49, 2, 4, 14), never
 * under 1, so an emptied or misdirected walk of any directory reds and an additive change does not. */
const FLOORS: Readonly<Record<string, number>> = {
  src: 33,
  "src/ui": 9,
  "src/workbench": 47,
  "src/workbench/hosts": 1,
  "src/workbench/providers": 2,
  "src/workflow": 12,
};
/** The walk's anchor: Pi's own read-current mint, the line ObservationProjection.refresh stamps freshness with. */
const ANCHOR = "src/workbench/observation.ts";
const ANCHOR_TOKEN = 'freshness:state === "disconnected" ? "stale" : "current"';

interface Clause {
  readonly letter: string;
  readonly parts: readonly string[];
}
/** The bead's acceptance, clause by clause and part by part; the judged set holds it to the tracked bead export. */
const ACCEPTANCE: readonly Clause[] = [
  {
    letter: "a",
    parts: ["the six identifiers stay distinct typed fields, none assigned from another", "an unrelated journal event advances the stream cursor, resource revision unchanged"],
  },
  { letter: "b", parts: ["no cross-epoch/feed cursor comparison without a producer resync mapping", "owner identity never an alias"] },
  {
    letter: "c",
    parts: ["accepted-at-c below watermark h never renders owner-latest/current", "a grep guard pins no minted 'latest'/'current' (0 federation hits in Pi src)"],
  },
];
const clauseLabel = (clause: Clause): string => `(${clause.letter}) ${clause.parts.join("; ")}`;
/** The named residuals of row C2's guard, one quiet row each. */
const RESIDUALS: readonly { readonly pin: string; readonly name: string }[] = [
  { pin: "R1", name: "R-VOCABULARY" },
  { pin: "R2", name: "R-COMPOSED" },
  { pin: "R3", name: "R-PARAPHRASE" },
  { pin: "R4", name: "R-INTERRUPTED" },
  { pin: "R5", name: "R-OUTSIDE-SRC" },
  { pin: "R6", name: "R-INDIRECT" },
];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for rows A-C, to the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) the six identifiers stay distinct typed fields, none assigned from another; an unrelated journal event advances the stream cursor, resource revision unchanged",
    pins: ["A1", "A2"],
  },
  { id: "B", label: "(b) no cross-epoch/feed cursor comparison without a producer resync mapping; owner identity never an alias", pins: ["B1", "B2"] },
  {
    id: "C",
    label: "(c) accepted-at-c below watermark h never renders owner-latest/current; a grep guard pins no minted 'latest'/'current' (0 federation hits in Pi src)",
    pins: ["C1", "C2"],
  },
  { id: "M", label: "row C2's scope and mint matchers catch each vocabulary member, one pin per member", pins: ["MS1", "MS2", "MS3", "MS4", "MM1", "MM2"] },
  { id: "R", label: "each named residual of row C2's guard stays a pinned quiet row", pins: ["R1", "R2", "R3", "R4", "R5", "R6"] },
];

interface Owner {
  readonly workspace_id: string;
  readonly backend_instance_id: string;
}
interface StreamCursor {
  readonly epoch: string;
  readonly stream_id: string;
  readonly position: number;
}
interface SnapshotCursor {
  readonly source_id: string;
  readonly value_digest: string;
}
/** One federation read as its six identifiers arrive, each from its own owner, beside the alias it was read under. */
interface FederationRead {
  readonly alias: string;
  readonly owner: Owner;
  readonly resource_name: string;
  readonly resource_revision: string;
  readonly cursor: StreamCursor;
  readonly consumer_transaction_id: string;
  readonly publication_sequence: number;
  readonly snapshot_cursor: SnapshotCursor;
  readonly render_transaction_id: string;
}
/** A consumer's producer-declared stream state: the accepted cursor c, the notification watermark h and source_dirty. */
interface AcceptedState {
  readonly accepted_position: number;
  readonly notified_position: number;
  readonly source_dirty: boolean;
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
  readonly constants: Json;
  readonly base: FederationRead;
  readonly otherOwner: Owner;
  readonly states: readonly AcceptedState[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error(`roster ${field} must be a nonnegative integer`);
  return value;
}
function flag(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`roster ${field} must be a boolean`);
  return value;
}
const asJson = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;
function ownerOfRoster(value: unknown, field: string): Owner {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return { workspace_id: text(value.workspace_id, `${field}.workspace_id`), backend_instance_id: text(value.backend_instance_id, `${field}.backend_instance_id`) };
}
function federationRead(value: unknown, field: string): FederationRead {
  if (!isObject(value) || !isObject(value.cursor) || !isObject(value.snapshot_cursor)) throw new Error(`roster ${field} needs a cursor and a snapshot_cursor`);
  const { cursor, snapshot_cursor: snapshot } = value;
  return {
    alias: text(value.alias, `${field}.alias`),
    owner: ownerOfRoster(value.owner, `${field}.owner`),
    resource_name: text(value.resource_name, `${field}.resource_name`),
    resource_revision: text(value.resource_revision, `${field}.resource_revision`),
    cursor: { epoch: text(cursor.epoch, `${field}.cursor.epoch`), stream_id: text(cursor.stream_id, `${field}.cursor.stream_id`), position: count(cursor.position, `${field}.cursor.position`) },
    consumer_transaction_id: text(value.consumer_transaction_id, `${field}.consumer_transaction_id`),
    publication_sequence: count(value.publication_sequence, `${field}.publication_sequence`),
    snapshot_cursor: { source_id: text(snapshot.source_id, `${field}.snapshot_cursor.source_id`), value_digest: text(snapshot.value_digest, `${field}.snapshot_cursor.value_digest`) },
    render_transaction_id: text(value.render_transaction_id, `${field}.render_transaction_id`),
  };
}
function acceptedState(value: unknown, field: string): AcceptedState {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return {
    accepted_position: count(value.accepted_position, `${field}.accepted_position`),
    notified_position: count(value.notified_position, `${field}.notified_position`),
    source_dirty: flag(value.source_dirty, `${field}.source_dirty`),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.excerpts) || !Array.isArray(raw.rows) || !isObject(raw.records) || !Object.hasOwn(raw, "constants")) {
    throw new Error("roster must be an object with excerpts, constants, records and rows");
  }
  const { records } = raw;
  if (!Array.isArray(records.states)) throw new Error("roster records.states must be a list");
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
      return { id: pin.id, witness: asJson(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    excerpts,
    constants: asJson(raw.constants),
    base: federationRead(records.base, "records.base"),
    otherOwner: ownerOfRoster(records.otherOwner, "records.otherOwner"),
    states: records.states.map((state: unknown, index: number) => acceptedState(state, `records.states[${index}]`)),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function excerpt(at: string): string {
  const found = ROSTER.excerpts.find(entry => entry.at === at);
  if (found === undefined) throw new Error(`the roster vendors no ${at}`);
  return found.line;
}
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
/** The field a vendored dataclass line declares ("    name: type"), or "" for any other line. */
const fieldName = (line: string): string => /^\s+([a-z_]+): /.exec(line)?.[1] ?? "";
/** The class a vendored "class Name:" line opens, or "". */
const className = (line: string): string => /^class ([A-Za-z]+):$/.exec(line)?.[1] ?? "";
/** 03:7's enumerated identifiers: the phrases after each "(n) " marker, up to the sentence's end. */
function enumerated(line: string): string[] {
  const list = /^Never identify: (.*?)\. They have/.exec(line)?.[1] ?? "";
  return list.split(/(?:, or |, )?\(\d\) /).filter(part => part.length > 0);
}
/** The first double-quoted text of a line, or "". */
const quoted = (line: string): string => /"([^"]+)"/.exec(line)?.[1] ?? "";

/** The first capture of a notes-line pattern in this bead's row of the tracked bead export; `what` names the line. */
function exportedNotesLine(pattern: RegExp, what: string): string {
  const marker = `"id":"${BEAD}"`;
  for (const line of readFileSync(BEADS_EXPORT, "utf8").split("\n")) {
    if (!line.includes(marker)) continue;
    const parsed: unknown = JSON.parse(line);
    if (!isObject(parsed) || parsed.id !== BEAD || typeof parsed.notes !== "string") continue;
    const match = pattern.exec(parsed.notes);
    if (match?.[1] !== undefined) return match[1];
  }
  throw new Error(`the bead export holds no ${what} line for ${BEAD}`);
}
/** The Acceptance line of this bead's notes in the tracked bead export. */
const exportedAcceptance = (): string => exportedNotesLine(/^Acceptance: (.*)$/m, "Acceptance");
/** The residual list the first cut's delivery note declares in this bead's row of the tracked bead export (wb-zg8m F3): its
 * "RESIDUALS (first cut; ...): R1 R-..., ..." line, each pin and residual name in order. */
function exportedResiduals(): { pin: string; name: string }[] {
  const line = exportedNotesLine(/^RESIDUALS \(first cut; each a named family with a pinned quiet row\): (.*)$/m, "first-cut RESIDUALS");
  return [...line.matchAll(/\b(R\d+) (R(?:-[A-Z]+)+)\b/g)].map(match => ({ pin: match[1] ?? "", name: match[2] ?? "" }));
}
/** The clauses of an Acceptance line: "(x) part; part; (y) ...", the closing period dropped. */
function clausesOf(acceptance: string): Clause[] {
  const pieces = acceptance.replace(/\.$/, "").split(/(?:^|; )\(([a-z])\) /);
  const clauses: Clause[] = [];
  for (let at = 1; at + 1 < pieces.length; at += 2) clauses.push({ letter: pieces[at] ?? "", parts: (pieces[at + 1] ?? "").split("; ") });
  return clauses;
}
/** The scope words the export and the producer name: the export's "(0 <word> hits in Pi src)" and "below <word> h", the
 * producer's watermark field (federation_boundary.py:148) and its accepted-receipt class (:123). */
function requiredScope(acceptance: string): string[] {
  return [
    /\(0 ([a-z]+) hits in Pi src\)/.exec(acceptance)?.[1] ?? "",
    /below ([a-z]+) h never/.exec(acceptance)?.[1] ?? "",
    fieldName(excerpt(`${BOUNDARY_PY}:148`)),
    className(excerpt(`${BOUNDARY_PY}:123`)),
  ];
}
/** The labels the export quotes. */
const requiredMints = (acceptance: string): string[] => [...acceptance.matchAll(/'([a-z]+)'/g)].map(match => match[1] ?? "");

// The reference rule: six typed fields, each read from its own producer input.
const ownerOf = (read: FederationRead): [string, string] => [read.owner.workspace_id, read.owner.backend_instance_id];
interface Typed {
  readonly kind: IdentifierKind;
  readonly value: Json;
}
type FederationIds = Readonly<Record<IdentifierKind, Typed>>;
type Importer = (read: FederationRead) => FederationIds;
const importIds: Importer = read => ({
  "resource-revision": { kind: "resource-revision", value: { owner: ownerOf(read), resource: read.resource_name, revision: read.resource_revision } },
  "stream-cursor": {
    kind: "stream-cursor",
    value: { owner: ownerOf(read), epoch: read.cursor.epoch, stream_id: read.cursor.stream_id, position: read.cursor.position },
  },
  "acceptance-commit": { kind: "acceptance-commit", value: read.consumer_transaction_id },
  "publication-sequence": { kind: "publication-sequence", value: read.publication_sequence },
  "snapshot-cursor": { kind: "snapshot-cursor", value: { source_id: read.snapshot_cursor.source_id, value_digest: read.snapshot_cursor.value_digest } },
  "render-transaction": { kind: "render-transaction", value: read.render_transaction_id },
});
const revisionFromEventCursor: Importer = read => ({
  ...importIds(read),
  "resource-revision": { kind: "resource-revision", value: { owner: ownerOf(read), resource: read.resource_name, revision: String(read.cursor.position) } },
});
/** The interconversions the producer names (03:9, README:25, 03:17, 03:7 (3) beside (6)); a reader makes none of them. */
const NAIVE_IMPORTS: readonly { readonly name: string; readonly importer: Importer }[] = [
  { name: "revision-from-event-cursor", importer: revisionFromEventCursor },
  {
    name: "revision-from-render-transaction",
    importer: read => ({
      ...importIds(read),
      "resource-revision": { kind: "resource-revision", value: { owner: ownerOf(read), resource: read.resource_name, revision: read.render_transaction_id } },
    }),
  },
  { name: "snapshot-cursor-from-stream-cursor", importer: read => ({ ...importIds(read), "snapshot-cursor": { kind: "snapshot-cursor", value: importIds(read)["stream-cursor"].value } }) },
  { name: "acceptance-commit-from-render-transaction", importer: read => ({ ...importIds(read), "acceptance-commit": { kind: "acceptance-commit", value: read.render_transaction_id } }) },
];
/** The read with one producer input changed and every other input kept. */
function perturbed(read: FederationRead, input: Input): FederationRead {
  switch (input) {
    case "resource_revision":
      return { ...read, resource_revision: `${read.resource_revision}0` };
    case "cursor":
      return { ...read, cursor: { ...read.cursor, position: read.cursor.position + 1 } };
    case "consumer_transaction_id":
      return { ...read, consumer_transaction_id: `${read.consumer_transaction_id}x` };
    case "publication_sequence":
      return { ...read, publication_sequence: read.publication_sequence + 1 };
    case "snapshot_cursor":
      return { ...read, snapshot_cursor: { ...read.snapshot_cursor, value_digest: `${read.snapshot_cursor.value_digest}0` } };
    case "render_transaction_id":
      return { ...read, render_transaction_id: `${read.render_transaction_id}x` };
  }
}
const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
/** Per input, the fields that move when that input alone changes: the diagonal when no field is assigned from another. */
function moveMatrix(importer: Importer, read: FederationRead): string[][] {
  const base = importer(read);
  return INPUTS.map(input => {
    const moved = importer(perturbed(read, input));
    return IDENTIFIERS.filter(kind => !same(moved[kind].value, base[kind].value));
  });
}
const DIAGONAL: readonly string[][] = IDENTIFIERS.map(kind => [kind]);
const keysOf = (value: Json): string[] => (value !== null && typeof value === "object" && !Array.isArray(value) ? Object.keys(value) : []);
/** The two cursors' field sets and the fields they share. */
function schemaOf(importer: Importer, read: FederationRead): { stream: string[]; snapshot: string[]; shared: string[] } {
  const ids = importer(read);
  const stream = keysOf(ids["stream-cursor"].value);
  const snapshot = keysOf(ids["snapshot-cursor"].value);
  return { stream, snapshot, shared: stream.filter(key => snapshot.includes(key)) };
}

// The projection mapping.
const SCOPE: ObservationScope = { workspace: "/workspace/pi", principal: "local-operator:tester" };
const IMPORT_TYPE = "federated-receipt";
const IMPORT_KIND = "reactivefiber.federated-receipt.snapshot";
const EVENT_KIND = "reactivefiber.federated-receipt.event";
const INVOCATION = "inv-federated-cursor";
const STAMPS = ["2026-10-22T23:00:00Z", "2026-10-22T23:00:01Z", "2026-10-22T23:00:02Z", "2026-10-22T23:00:03Z"] as const;
const UNRELATED = "audit";
const resourceRef = (read: FederationRead): NativeRef => ({ provider: "reactivefiber", type: IMPORT_TYPE, id: JSON.stringify([...ownerOf(read), read.resource_name]) });
const revisionOf = (read: FederationRead): string => JSON.stringify([...ownerOf(read), read.resource_name, read.resource_revision]);
const cursorOf = (read: FederationRead): string => JSON.stringify([...ownerOf(read), read.cursor.epoch, read.cursor.stream_id, read.cursor.position]);
const ownerRef = (read: FederationRead): string => `rf-owner:${JSON.stringify(ownerOf(read))}`;
const aliasRef = (read: FederationRead): string => `rf-owner:${read.alias}`;
const atCursor = (read: FederationRead, cursor: Partial<StreamCursor>): FederationRead => ({ ...read, cursor: { ...read.cursor, ...cursor } });
function snapshotOf(read: FederationRead, capturedAt: string, revision: string = revisionOf(read), evidence: string = ownerRef(read), statusText = "observed"): NativeSnapshot {
  return {
    source: resourceRef(read),
    scope: { ...SCOPE },
    capturedAt,
    observedAt: capturedAt,
    node: { title: `rf receipt ${read.resource_name}`, type: "sdk-operation", statusText, statusTone: "unknown" },
    kind: IMPORT_KIND,
    sourceRevision: revision,
    cursor: cursorOf(read),
    evidenceRefs: [evidence],
    trace: { invocationId: INVOCATION },
  };
}
/** One owner-stream notification for a read: its cursor opaque, its producer-declared predecessor when given, and a position
 * riding as a sequence only when the caller passes one (the naive rule). */
function notification(read: FederationRead, id: string, observedAt: string, previous?: FederationRead, sequence?: number): ObservationEvent {
  return {
    projectionEventId: id,
    source: resourceRef(read),
    scope: { ...SCOPE },
    sourceCursor: cursorOf(read),
    ...(previous === undefined ? {} : { previousCursor: cursorOf(previous) }),
    ...(sequence === undefined ? {} : { sourceSequence: sequence }),
    observedAt,
    kind: EVENT_KIND,
    trace: { invocationId: INVOCATION },
  };
}
const nodeOf = (projection: ObservationProjection, read: FederationRead): ObservedNode | undefined =>
  projection.query({ scope: SCOPE, limit: 20, ref: resourceRef(read) }).nodes[0];
const versionHits = (projection: ObservationProjection, version: string | null): number =>
  version === null ? 0 : projection.query({ scope: SCOPE, limit: 20, version }).nodes.length;
/** The reads whose nodes an evidence ref returns, each named by the read its resource ref matches. */
const evidenceHolders = (projection: ObservationProjection, evidence: string, named: readonly [string, FederationRead][]): string[] =>
  projection
    .query({ scope: SCOPE, limit: 20, evidence })
    .nodes.map(node => named.find(([, read]) => resourceRef(read).id === node.nativeRef.id)?.[0] ?? "other")
    .sort();

// The shipped rf reader (row A1's live leg).
const RF_ROOT = "/srv/rf/peer";
const RF_HOST: ReactiveFiberTopologyContext = { scope: { ...SCOPE }, seam: "rf-cli", capturedAt: STAMPS[0], observedAt: STAMPS[1], authorizedRfRoot: RF_ROOT };
interface RfReading {
  readonly snapshots: number;
  readonly refusal: string | null;
  readonly namesTransaction: boolean;
  readonly revisionIsGraph: boolean;
}
function rfRead(transaction: string | null): RfReading {
  const source = { ...fullShapeRf(RF_ROOT), transaction_id: transaction };
  try {
    const topology = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source }, RF_HOST);
    const [snapshot] = topology.snapshots;
    return { snapshots: topology.snapshots.length, refusal: null, namesTransaction: false, revisionIsGraph: snapshot?.sourceRevision === RF_FIXTURE_GRAPH_REVISION };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { snapshots: 0, refusal: error.category, namesTransaction: error.message.includes("transaction_id"), revisionIsGraph: false };
  }
}

// Row B1: the cursor comparator and its seeded property.
interface CursorPoint {
  readonly owner: string;
  readonly epoch: string;
  readonly stream_id: string;
  readonly position: number;
}
/** A producer-declared cross-epoch resync mapping of one owner stream: old positions to new ones. Pi applies it, never derives it. */
interface ResyncMapping {
  readonly owner: string;
  readonly stream_id: string;
  readonly from_epoch: string;
  readonly to_epoch: string;
  readonly positions: readonly (readonly [number, number])[];
}
type Order = "before" | "same" | "after";
type CursorComparison =
  | { readonly comparable: true; readonly order: Order }
  | { readonly comparable: false; readonly reason: "distinct-owner" | "distinct-stream" | "distinct-epoch" | "unmapped" };
type CursorComparator = (a: CursorPoint, b: CursorPoint, resync?: ResyncMapping) => CursorComparison;
const orderOf = (a: number, b: number): Order => (a < b ? "before" : a > b ? "after" : "same");
const pointOf = (read: FederationRead): CursorPoint => ({ owner: JSON.stringify(ownerOf(read)), epoch: read.cursor.epoch, stream_id: read.cursor.stream_id, position: read.cursor.position });
/** The typed comparator: one owner, one stream and one epoch, or the producer's mapping from a's epoch to b's. */
const compareCursors: CursorComparator = (a, b, resync) => {
  if (a.owner !== b.owner) return { comparable: false, reason: "distinct-owner" };
  if (a.stream_id !== b.stream_id) return { comparable: false, reason: "distinct-stream" };
  if (a.epoch === b.epoch) return { comparable: true, order: orderOf(a.position, b.position) };
  if (resync === undefined || resync.owner !== a.owner || resync.stream_id !== a.stream_id || resync.from_epoch !== a.epoch || resync.to_epoch !== b.epoch) {
    return { comparable: false, reason: "distinct-epoch" };
  }
  const mapped = resync.positions.find(([from]) => from === a.position)?.[1];
  return mapped === undefined ? { comparable: false, reason: "unmapped" } : { comparable: true, order: orderOf(mapped, b.position) };
};
const rawPosition: CursorComparator = (a, b) => ({ comparable: true, order: orderOf(a.position, b.position) });
const epochBlind: CursorComparator = (a, b) =>
  a.owner !== b.owner
    ? { comparable: false, reason: "distinct-owner" }
    : a.stream_id !== b.stream_id
      ? { comparable: false, reason: "distinct-stream" }
      : { comparable: true, order: orderOf(a.position, b.position) };
const streamBlind: CursorComparator = (a, b) =>
  a.owner !== b.owner
    ? { comparable: false, reason: "distinct-owner" }
    : a.epoch !== b.epoch
      ? { comparable: false, reason: "distinct-epoch" }
      : { comparable: true, order: orderOf(a.position, b.position) };
const PROPERTY_SEED = 20261023;
const PROPERTY_CASES = 600;
const FEEDS = ["owner-events", "owner-audit"] as const;
const EPOCHS = ["1", "2"] as const;
const POSITIONS = [3, 7, 10] as const;
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
function pick<T>(random: () => number, pool: readonly T[], fallback: T): T {
  return pool[Math.floor(random() * pool.length)] ?? fallback;
}
function cursorPairs(owners: readonly string[]): [CursorPoint, CursorPoint][] {
  const random = mulberry32(PROPERTY_SEED);
  const point = (): CursorPoint => ({
    owner: pick(random, owners, ""),
    epoch: pick(random, EPOCHS, "1"),
    stream_id: pick(random, FEEDS, "owner-events"),
    position: pick(random, POSITIONS, 3),
  });
  return Array.from({ length: PROPERTY_CASES }, (): [CursorPoint, CursorPoint] => [point(), point()]);
}
type PairClass = "distinct-owner" | "distinct-stream" | "distinct-epoch" | "same-stream";
/** The class of a pair, read from the fields alone and never through a comparator under test. */
function classOf(a: CursorPoint, b: CursorPoint): PairClass {
  if (a.owner !== b.owner) return "distinct-owner";
  if (a.stream_id !== b.stream_id) return "distinct-stream";
  return a.epoch === b.epoch ? "same-stream" : "distinct-epoch";
}
function violations(comparator: CursorComparator, pairs: readonly [CursorPoint, CursorPoint][]): number {
  return pairs.filter(([a, b]) => {
    const expected = classOf(a, b);
    const got = comparator(a, b);
    if (expected === "same-stream") return !got.comparable || got.order !== orderOf(a.position, b.position);
    return got.comparable || got.reason !== expected;
  }).length;
}

// Row C1: the accepted-receipt render.
const renderAccepted = (state: AcceptedState): string =>
  `rf accepted cursor ${state.accepted_position}; notified ${state.notified_position}; ${state.source_dirty ? "source dirty" : "source not dirty"}`;
const RENDERED = /^rf accepted cursor (\d+); notified (\d+); source (dirty|not dirty)$/;
type Render = (state: AcceptedState) => string;
/** Two renders that mint a label for an accepted receipt; C1 shows each mints one for every dirty state. */
const NAIVE_RENDERS: readonly { readonly name: string; readonly render: Render }[] = [
  { name: "accepted-as-current", render: state => `rf accepted cursor ${state.accepted_position}: current` },
  { name: "accepted-as-owner-latest", render: state => `owner latest at cursor ${state.accepted_position}` },
];
/** The states a render does not echo exactly: its text does not parse as RENDERED, or it parses with a c, an h or a dirty flag
 * other than the producer's. */
function echoFailuresOf(render: Render, states: readonly AcceptedState[]): number {
  return states.filter(state => {
    const parsed = RENDERED.exec(render(state));
    return parsed?.[1] !== String(state.accepted_position) || parsed[2] !== String(state.notified_position) || (parsed[3] === "dirty") !== state.source_dirty;
  }).length;
}
/** The accepted cursor at which each MIS_ECHOES render mis-echoes: a state-dependent mis-echo, never the whole seeded set. */
const MIS_ECHO_AT = 0;
/** The echo instrument's positive control (wb-zg8m F2): each render mis-echoes exactly one producer field on the states at
 * MIS_ECHO_AT and renders every other state as renderAccepted does. */
const MIS_ECHOES: readonly { readonly name: string; readonly render: Render }[] = [
  {
    name: "accepted-cursor-misechoed",
    render: state => renderAccepted(state.accepted_position === MIS_ECHO_AT ? { ...state, accepted_position: state.accepted_position + 1 } : state),
  },
  {
    name: "notified-cursor-misechoed",
    render: state => renderAccepted(state.accepted_position === MIS_ECHO_AT ? { ...state, notified_position: state.notified_position + 1 } : state),
  },
  { name: "dirty-flag-misechoed", render: state => renderAccepted(state.accepted_position === MIS_ECHO_AT ? { ...state, source_dirty: !state.source_dirty } : state) },
];
/** Seeded (c, h) states, each source_dirty by the producer's own rule (federation_boundary.py:170). */
function acceptedStates(): AcceptedState[] {
  const random = mulberry32(PROPERTY_SEED + 1);
  return Array.from({ length: PROPERTY_CASES }, (): AcceptedState => {
    const accepted = Math.floor(random() * 13);
    const notified = Math.floor(random() * 13);
    return { accepted_position: accepted, notified_position: notified, source_dirty: notified > accepted };
  });
}
function receiptEvent(read: FederationRead, state: AcceptedState, id: string): ObservationEvent {
  return {
    projectionEventId: id,
    source: resourceRef(read),
    scope: { ...SCOPE },
    sourceCursor: cursorOf(atCursor(read, { position: state.accepted_position })),
    observedAt: STAMPS[0],
    kind: EVENT_KIND,
    node: { presentation: { title: `rf receipt ${read.resource_name}`, type: "sdk-operation", statusText: renderAccepted(state), statusTone: "unknown" } },
    sourceVersion: revisionOf(read),
    evidenceRefs: [ownerRef(read)],
    trace: { invocationId: INVOCATION },
  };
}
interface Observed {
  readonly nodes: number;
  readonly freshness: string | null;
  readonly statusText: string | null;
  readonly summary: string;
}
function observed(projection: ObservationProjection): Observed {
  const reply = observeInvocation(projection, { scope: { ...SCOPE }, invocationId: INVOCATION });
  const [node] = reply.nodes;
  return { nodes: reply.nodes.length, freshness: node?.freshness ?? null, statusText: node?.presentation.statusText ?? null, summary: reply.freshness.summary };
}

// Row C2: the guard and its matchers.
/** An expression's identifier words, camelCase, snake_case and kebab-case split, lowercased. */
const words = (source: string): string[] =>
  source
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
/** The FEDERATION_WORDS members whose run of word prefixes a text carries. */
function membersHitting(source: string): number[] {
  const tokens = words(source);
  return FEDERATION_WORDS.flatMap((run, member) => (tokens.some((_, at) => run.every((part, offset) => (tokens[at + offset] ?? "").startsWith(part))) ? [member] : []));
}
/** The MINT_WORDS a text spells as whole words, in first-spelled order. */
const mintsOf = (source: string): string[] => [...new Set(words(source).filter(word => MINT_WORDS.includes(word)))];
interface SourceFile {
  readonly path: string;
  readonly text: string;
}
/** A type alias, not an interface, so a scan is itself a Json witness. */
type GuardScan = { scoped: string[]; hits: string[] };
/** A file under src/ whose path or text carries a FEDERATION_WORDS run. */
const federationScoped = (file: SourceFile): boolean => file.path.startsWith("src/") && (membersHitting(file.path).length > 0 || membersHitting(file.text).length > 0);
/** The guard: of the files under src/, those federation-scoped, and each scoped file's mints. */
function scanFiles(files: readonly SourceFile[]): GuardScan {
  const scoped = files.filter(federationScoped);
  return {
    scoped: scoped.map(file => file.path),
    hits: scoped.flatMap(file => {
      const mints = mintsOf(file.text);
      return mints.length > 0 ? [`${file.path}: ${mints.join(",")}`] : [];
    }),
  };
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
/** The walk C2 reads: every regular file below <root>/src, each path relative to the root, with its text. */
const srcFilesOf = (root: string): SourceFile[] => filesBelow(join(root, "src")).map(file => ({ path: relative(root, file), text: textOf(file) }));
const srcFiles = (): SourceFile[] => srcFilesOf(REPO);
/** C2's independent enumeration of <root>/src (wb-rmd7 F1/F2): Node's own recursive listing, every entry lstat-ed and the regular
 * files kept, each path relative to the root, sorted. It shares no code with filesBelow, srcFilesOf or srcFiles, so a narrowed walk,
 * or a filter on the srcFiles() output before the walk compare, that drops a real src file reds at the C2 call site; a filter on
 * the scanner's own argument comes after that compare, and the reading compare holds it (scanRead, enumeratedReadingOf; wb-lotb
 * F1). */
const enumeratedSrcOf = (root: string): string[] =>
  readdirSync(join(root, "src"), { encoding: "utf8", recursive: true })
    .map(entry => join("src", entry))
    .filter(path => lstatSync(join(root, path)).isFile())
    .sort();
/** Sorted by path, plain code-point compare. */
const byPath = (files: readonly SourceFile[]): SourceFile[] => [...files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
/** A list's reading: one line per file, sorted by path, its path and the sha256/16 of its text. */
const readingOf = (files: readonly SourceFile[]): string[] => byPath(files).map(file => `${file.path} ${sha256(file.text).slice(0, 16)}`);
/** The guard with its own reading (wb-lotb F1): the scan of one list beside the reading of that same list, both taken from the one
 * argument, so a call site holding `read` to an independent reading of src holds the list the guard scans: a filter, slice or text
 * change on the scanner's argument reds there as a reading line missing or extra. */
const scanRead = (files: readonly SourceFile[]): { read: string[]; scan: GuardScan } => ({ read: readingOf(files), scan: scanFiles(files) });
/** C2's independent reading of <root>/src (wb-lotb F1): each enumeratedSrcOf path with its text, read by its own readFileSync call
 * (not textOf or srcFilesOf). */
const enumeratedFilesOf = (root: string): SourceFile[] => enumeratedSrcOf(root).map(path => ({ path, text: readFileSync(join(root, path), "utf8") }));
/** The independent reading's lines, computed apart from readingOf: each path beside the sha256/16 of its text, in the enumeration's
 * order. */
const enumeratedReadingOf = (files: readonly SourceFile[]): string[] => files.map(file => `${file.path} ${sha256(file.text).slice(0, 16)}`);
/** Each FLOORS directory's reading over a file list: `<directory>:<its direct files reach its floor>`. */
const floorReadings = (files: readonly SourceFile[]): string[] =>
  Object.entries(FLOORS).map(([directory, floor]) => `${directory}:${files.filter(file => dirname(file.path) === directory).length >= floor}`);
/** The floors compare's positive control (wb-zg8m F1): a list holding exactly each FLOORS directory's floor of direct files. */
const atFloors = (): SourceFile[] =>
  Object.entries(FLOORS).flatMap(([directory, floor]) => Array.from({ length: floor }, (_, at): SourceFile => ({ path: `${directory}/floor-${at}.ts`, text: "" })));
/** The walk's positive control (wb-zg8m F1, widened by wb-rmd7 F1), written under a scratch root and read back through srcFilesOf
 * and enumeratedSrcOf: an unscoped mint at the src root, a federation mint in a non-.ts file, one in a .ts file a level below the
 * deepest FLOORS directory, one in a non-.ts file three levels deeper than that directory, and one each in a dot-named file, a file
 * in a dot-named directory, an extensionless file and a .mjs file (the shapes the wb-zg8m gate's W-DOTSKIP, W-NOEXT and
 * W-ALLOWLIST narrowings drop). */
const WALK_PLANT: readonly SourceFile[] = [
  { path: "src/plain.ts", text: 'export const freshness = "current";\n' },
  { path: "src/workbench/federation-notes.md", text: "The peer view is current.\n" },
  { path: "src/workbench/hosts/federation/peer.ts", text: 'export const label = "current";\n' },
  { path: "src/workflow/peers/archive/2026/q4/watermark-log.json", text: '{ "label": "latest" }\n' },
  { path: "src/workbench/.federation-cache.json", text: '{ "label": "current" }\n' },
  { path: "src/.peers/watermark.ts", text: 'export const label = "latest";\n' },
  { path: "src/workbench/FEDERATION-NOTES", text: "The peer view is latest.\n" },
  { path: "src/workbench/federation-peer.mjs", text: 'export const label = "current";\n' },
];
/** Writes a plant under a fresh makeScratch root, reads the root back through srcFilesOf (sorted by path), through
 * enumeratedSrcOf and through the independent reading (enumeratedFilesOf, enumeratedReadingOf), and removes it. */
function walkPlanted(plant: readonly SourceFile[]): { walked: SourceFile[]; enumerated: string[]; reading: string[] } {
  const root = makeScratch("rf-federated-cursor-walk-");
  try {
    for (const file of plant) {
      const target = join(root, file.path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, file.text);
    }
    return { walked: byPath(srcFilesOf(root)), enumerated: enumeratedSrcOf(root), reading: enumeratedReadingOf(enumeratedFilesOf(root)) };
  } finally {
    removeScratch(root);
  }
}
/** C2's positive control: a federation mint scoped by its path alone, one scoped by its path and its text, one scoped by its text
 * alone (in a comment, under a path that spells no FEDERATION_WORDS member, so the scope's text branch has its own control:
 * wb-lotb F2), and an unscoped mint. */
const PLANTED: readonly SourceFile[] = [
  { path: "src/workbench/federation-import.ts", text: 'export const label = "owner latest";' },
  { path: "src/workbench/peer-watermark.ts", text: "// the watermark h never renders current\nexport const h = 8;" },
  { path: "src/workbench/peer-sync.ts", text: "// a federation peer sync never renders current\nexport const synced = true;" },
  { path: "src/workbench/plain.ts", text: 'export const freshness = "current";' },
];
/** Row M's spellings: each scope spelling carries its member's run alone; each mint spelling its word, each miss none. */
const SCOPE_SPELLINGS: readonly (readonly string[])[] = [
  ["federationImport", "FEDERATED_SOURCE", "federate-peer", "a federation reader"],
  ["watermark", "WATERMARK_TICK", "notifyWatermark", "source-watermarks"],
  ["notified_position", "notifiedPosition", "NOTIFIED-POSITION", "notified positions"],
  ["AcceptedBoundary", "accepted_boundary", "accepted-boundaries", "ACCEPTED BOUNDARY"],
];
const MINT_SPELLINGS: readonly { readonly hits: readonly string[]; readonly misses: readonly string[] }[] = [
  { hits: ["owner latest", "isLatest", "LATEST_LABEL", "latest-cursor"], misses: ["latecomer", "lattest"] },
  { hits: ['freshness: "current"', "isCurrent", "CURRENT", "current_cursor"], misses: ["currently", "concurrent", "currency"] },
];
const ZERO_WIDTH = String.fromCodePoint(0x200b);
const residualName = (pin: string): string => RESIDUALS.find(residual => residual.pin === pin)?.name ?? "";

/** Every census constant, as the roster holds it. */
const constantsOf = (): Json => ({
  identifiers: [...IDENTIFIERS],
  identifierPhrases: [...IDENTIFIER_PHRASES],
  inputs: [...INPUTS],
  streamCursorFields: [...STREAM_CURSOR_FIELDS],
  snapshotCursorFields: [...SNAPSHOT_CURSOR_FIELDS],
  ownerFields: [...OWNER_FIELDS],
  federationWords: FEDERATION_WORDS.map(run => [...run]),
  mintWords: [...MINT_WORDS],
  floors: { ...FLOORS },
  anchor: { file: ANCHOR, token: ANCHOR_TOKEN },
  acceptance: ACCEPTANCE.map(clause => ({ letter: clause.letter, parts: [...clause.parts] })),
  residuals: RESIDUALS.map(residual => ({ pin: residual.pin, name: residual.name })),
  naiveImports: NAIVE_IMPORTS.map(naive => naive.name),
  naiveRenders: NAIVE_RENDERS.map(naive => naive.name),
  misEchoes: MIS_ECHOES.map(misEcho => misEcho.name),
});

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const hashes = ROSTER.excerpts.map(entry => ({ at: entry.at, sha256: sha256(`${entry.line}\n`) }));
    expect(hashes, "the vendored excerpts are not the producer lines at the pin").toStrictEqual(Object.entries(EXCERPT_SHA256).map(([at, digest]) => ({ at, sha256: digest })));
    const phrases = enumerated(excerpt(`${CURSORS_DOC}:7`));
    expect(phrases, "IDENTIFIER_PHRASES against 03:7's enumeration").toStrictEqual([...IDENTIFIER_PHRASES]);
    const fields = {
      stream: [65, 66, 67].map(line => fieldName(excerpt(`${BOUNDARY_PY}:${line}`))),
      snapshot: [539, 540].map(line => fieldName(excerpt(`${QUERY_VIEW_PY}:${line}`))),
      owner: [39, 40].map(line => fieldName(excerpt(`${BOUNDARY_PY}:${line}`))),
      inputs: [fieldName(excerpt(`${BOUNDARY_PY}:86`)), fieldName(excerpt(`${BOUNDARY_PY}:131`))],
      classes: [className(excerpt(`${BOUNDARY_PY}:62`)), className(excerpt(`${BOUNDARY_PY}:123`)), className(excerpt(`${QUERY_VIEW_PY}:534`))],
    };
    expect(fields, "a census field list against the vendored producer lines").toStrictEqual({
      stream: [...STREAM_CURSOR_FIELDS],
      snapshot: [...SNAPSHOT_CURSOR_FIELDS],
      owner: [...OWNER_FIELDS],
      inputs: [INPUTS[0], INPUTS[2]],
      classes: ["OwnerStreamCursor", "AcceptedBoundary", "SnapshotCursor"],
    });
    const rules = {
      noSharedSchema: excerpt(`${CURSORS_DOC}:17`).includes("is not the federation event cursor and must not share a schema with it"),
      separatelyTyped: excerpt(`${CONCRETE_DOC}:20`).includes("MUST be separately typed"),
    };
    expect(rules).toStrictEqual({ noSharedSchema: true, separatelyTyped: true });
    const ids = importIds(ROSTER.base);
    const kinds = IDENTIFIERS.map(kind => ids[kind].kind);
    expect(kinds, "a field typed as another identifier").toStrictEqual([...IDENTIFIERS]);
    expect(new Set(kinds).size, "two identifiers share one kind").toBe(phrases.length);
    const schema = schemaOf(importIds, ROSTER.base);
    expect(schema, "the cursors left the producer schemas or share a field").toStrictEqual({ stream: ["owner", ...STREAM_CURSOR_FIELDS], snapshot: [...SNAPSHOT_CURSOR_FIELDS], shared: [] });
    const matrix = moveMatrix(importIds, ROSTER.base);
    expect(matrix, "an identifier assigned from another").toStrictEqual(DIAGONAL);
    const naive = Object.fromEntries(NAIVE_IMPORTS.map(({ name, importer }) => [name, moveMatrix(importer, ROSTER.base)]));
    expect(
      Object.entries(naive).filter(([, moves]) => same(moves, DIAGONAL)).map(([name]) => name),
      "a naive interconversion kept the matrix diagonal",
    ).toEqual([]);
    const sharedNaive = NAIVE_IMPORTS.filter(({ importer }) => schemaOf(importer, ROSTER.base).shared.length > 0).map(({ name }) => name);
    expect(sharedNaive, "the schema instrument missed the stream cursor standing in for the snapshot cursor").toStrictEqual(["snapshot-cursor-from-stream-cursor"]);
    const committed = rfRead(ROSTER.base.render_transaction_id);
    const preview = rfRead(null);
    expect(committed, "the rf reader admitted an envelope carrying a render transaction id").toStrictEqual({ snapshots: 0, refusal: "validation", namesTransaction: true, revisionIsGraph: false });
    expect(preview, "the transaction-free twin did not project its graph revision").toStrictEqual({ snapshots: 1, refusal: null, namesTransaction: false, revisionIsGraph: true });
    return { excerpts: hashes.length, phrases, fields, rules, kinds, schema, matrix, naive, sharedNaive, rfReader: { committed: { ...committed }, preview: { ...preview } } };
  },
  A2: () => {
    const doc9 = excerpt(`${CURSORS_DOC}:9`);
    const phrases = {
      unrelatedEvent: doc9.includes("An owner may append event 10 to stream for unrelated resource Y while exported X stays revision 2."),
      naiveFalse: doc9.includes("The naive sourceRevision=eventCursor assertion is false."),
      gateA: excerpt(`${CURSORS_DOC}:33`).includes("(a) owner stream cursor advances on unrelated source events, resource revision remains fixed"),
      concrete: excerpt(`${CONCRETE_DOC}:20`).includes("an unrelated journal event advances stream cursor without changing resource revision"),
    };
    expect(phrases).toStrictEqual({ unrelatedEvent: true, naiveFalse: true, gateA: true, concrete: true });
    const x6 = ROSTER.base;
    const x10 = atCursor(x6, { position: 10 });
    const y10: FederationRead = { ...x10, resource_name: UNRELATED, resource_revision: "5" };
    expect([x6.cursor.position, x6.resource_revision], "the roster's base read is not X at fence 6, revision 2").toStrictEqual([6, "2"]);
    const before = importIds(x6);
    const after = importIds(x10);
    const pure = {
      cursorMoved: !same(before["stream-cursor"].value, after["stream-cursor"].value),
      revisionMoved: !same(before["resource-revision"].value, after["resource-revision"].value),
      naiveRevisionMoved: !same(revisionFromEventCursor(x6)["resource-revision"].value, revisionFromEventCursor(x10)["resource-revision"].value),
    };
    expect(pure, "the reference rule moved the revision or held the cursor").toStrictEqual({ cursorMoved: true, revisionMoved: false, naiveRevisionMoved: true });
    const run = (revision: (read: FederationRead) => string) => {
      const projection = new ObservationProjection();
      const outcomes: string[] = [projection.refresh(snapshotOf(x6, STAMPS[0], revision(x6)))];
      const first = nodeOf(projection, x6);
      const firstVersion = first?.sourceVersion ?? null;
      const hitsBefore = versionHits(projection, firstVersion);
      outcomes.push(projection.ingest(notification(y10, "event-10", STAMPS[1])));
      outcomes.push(projection.refresh(snapshotOf(x10, STAMPS[2], revision(x10))));
      const second = nodeOf(projection, x10);
      return {
        outcomes,
        versions: [firstVersion, second?.sourceVersion ?? null],
        cursors: [first?.sourceCursor ?? null, second?.sourceCursor ?? null],
        versionHits: [hitsBefore, versionHits(projection, firstVersion)],
        nodes: projection.stats().nodes,
      };
    };
    const reference = run(revisionOf);
    const naive = run(read => String(read.cursor.position));
    expect(reference.outcomes).toStrictEqual(["applied", "applied", "applied"]);
    expect(reference.versions, "the resource revision moved with the stream cursor").toStrictEqual([revisionOf(x6), revisionOf(x6)]);
    expect(reference.cursors, "the stream cursor did not advance").toStrictEqual([cursorOf(x6), cursorOf(x10)]);
    expect(reference.versionHits, "the version index lost X through an unrelated event").toStrictEqual([1, 1]);
    expect(naive.versions, "the naive mapping kept X's version").toStrictEqual(["6", "10"]);
    expect(naive.versionHits, "the naive mapping kept X under its first version").toStrictEqual([1, 0]);
    return {
      phrases,
      pure,
      reference: {
        outcomes: reference.outcomes,
        versionKept: reference.versions[0] === reference.versions[1],
        cursorAdvanced: reference.cursors[0] !== reference.cursors[1],
        versionHits: reference.versionHits,
        nodes: reference.nodes,
      },
      naive: { outcomes: naive.outcomes, versions: naive.versions, versionHits: naive.versionHits },
    };
  },
  B1: () => {
    const phrases = {
      withinOneStream: excerpt(`${CURSORS_DOC}:9`).includes(
        "Comparison of stream cursors is valid only within one declared owner instance/epoch/stream, or under a separately verified cross-epoch resync mapping.",
      ),
      epochIncomparable: excerpt(`${CONCRETE_DOC}:20`).includes("A source epoch change makes old/new cursors incomparable."),
      refusals: [quoted(excerpt(`${BOUNDARY_PY}:182`)), quoted(excerpt(`${BOUNDARY_PY}:214`))],
    };
    expect(phrases).toStrictEqual({
      withinOneStream: true,
      epochIncomparable: true,
      refusals: ["notification requires authenticated epoch resync", "cross-epoch acceptance requires explicit resync"],
    });
    const base = ROSTER.base;
    const other: FederationRead = { ...base, owner: ROSTER.otherOwner };
    expect(base.cursor.stream_id, "the roster's feed is not the first feed of the generator").toBe(FEEDS[0]);
    const pairs = cursorPairs([pointOf(base).owner, pointOf(other).owner]);
    const classes: Record<PairClass, number> = { "distinct-owner": 0, "distinct-stream": 0, "distinct-epoch": 0, "same-stream": 0 };
    for (const [a, b] of pairs) classes[classOf(a, b)]++;
    const property = {
      cases: pairs.length,
      classes,
      reference: violations(compareCursors, pairs),
      rawPosition: violations(rawPosition, pairs),
      epochBlind: violations(epochBlind, pairs),
      streamBlind: violations(streamBlind, pairs),
    };
    expect(Object.values(classes).every(n => n >= 25), "the generator under-reached a class").toBe(true);
    expect(property.reference, "compareCursors compared across an owner, a feed or an epoch").toBe(0);
    expect(property.rawPosition, "the raw-position comparator held the property").toBe(pairs.length - classes["same-stream"]);
    expect(property.epochBlind, "the epoch-blind comparator held the property").toBe(classes["distinct-epoch"]);
    expect(property.streamBlind, "the stream-blind comparator held the property").toBe(classes["distinct-stream"]);
    const at = (read: FederationRead, cursor: Partial<StreamCursor>): CursorPoint => pointOf(atCursor(read, cursor));
    const mapping: ResyncMapping = { owner: pointOf(base).owner, stream_id: FEEDS[0], from_epoch: "1", to_epoch: "2", positions: [[10, 2]] };
    const mapped = [
      compareCursors(at(base, { epoch: "1", position: 10 }), at(base, { epoch: "2", position: 3 }), mapping),
      compareCursors(at(base, { epoch: "1", position: 7 }), at(base, { epoch: "2", position: 3 }), mapping),
      compareCursors(at(base, { epoch: "1", position: 10 }), at(base, { epoch: "2", position: 3 })),
      compareCursors(at(base, { epoch: "2", position: 3 }), at(base, { epoch: "1", position: 10 }), mapping),
      compareCursors(at(base, { epoch: "1", stream_id: FEEDS[1], position: 10 }), at(base, { epoch: "2", stream_id: FEEDS[1], position: 3 }), mapping),
      compareCursors(at(other, { epoch: "1", position: 10 }), at(other, { epoch: "2", position: 3 }), mapping),
    ];
    expect(mapped, "the producer mapping admitted more or less than its own position").toStrictEqual([
      { comparable: true, order: "before" },
      { comparable: false, reason: "unmapped" },
      { comparable: false, reason: "distinct-epoch" },
      { comparable: false, reason: "distinct-epoch" },
      { comparable: false, reason: "distinct-epoch" },
      { comparable: false, reason: "distinct-epoch" },
    ]);
    const live = (steps: readonly [FederationRead, FederationRead | undefined, number | undefined][]) => {
      const projection = new ObservationProjection();
      const outcomes = steps.map(([read, previous, sequence], index) => projection.ingest(notification(read, `notify-${index}`, STAMPS[index] ?? STAMPS[0], previous, sequence)));
      return { outcomes, freshness: nodeOf(projection, base)?.freshness ?? null };
    };
    const e1p9 = atCursor(base, { epoch: "1", position: 9 });
    const e1p10 = atCursor(base, { epoch: "1", position: 10 });
    const e2p2 = atCursor(base, { epoch: "2", position: 2 });
    const e2p3 = atCursor(base, { epoch: "2", position: 3 });
    const f2p2 = atCursor(base, { epoch: "1", stream_id: FEEDS[1], position: 2 });
    const f2p3 = atCursor(base, { epoch: "1", stream_id: FEEDS[1], position: 3 });
    const projected = {
      epoch: live([
        [e1p9, undefined, undefined],
        [e2p3, e2p2, undefined],
      ]),
      feed: live([
        [e1p9, undefined, undefined],
        [f2p3, f2p2, undefined],
      ]),
      contiguous: live([
        [e1p9, undefined, undefined],
        [e1p10, e1p9, undefined],
      ]),
      naiveEpoch: live([
        [e1p9, undefined, 9],
        [e2p3, undefined, 3],
      ]),
      naiveFeed: live([
        [e1p9, undefined, 9],
        [f2p3, undefined, 3],
      ]),
    };
    expect(projected, "Pi's projection compared a cursor across an epoch or a feed").toStrictEqual({
      epoch: { outcomes: ["applied", "applied"], freshness: "stale" },
      feed: { outcomes: ["applied", "applied"], freshness: "stale" },
      contiguous: { outcomes: ["applied", "applied"], freshness: "unknown" },
      naiveEpoch: { outcomes: ["applied", "out-of-order"], freshness: "unknown" },
      naiveFeed: { outcomes: ["applied", "out-of-order"], freshness: "unknown" },
    });
    return { phrases, property, mapped, projected };
  },
  B2: () => {
    const readme22 = excerpt(`${README_DOC}:22`);
    const phrases = {
      ownerKey: readme22.startsWith("ResourceKey = (owner WId, backend IId,"),
      noAlias: excerpt(`${README_DOC}:25`).includes("do not use an alias as owner identity"),
      resolveAlias: excerpt(`${README_DOC}:28`).includes("Resolve explicit alias through B public API; compare expected WId/IId"),
      ownerFields: [39, 40].map(line => fieldName(excerpt(`${BOUNDARY_PY}:${line}`))),
    };
    expect(phrases).toStrictEqual({ ownerKey: true, noAlias: true, resolveAlias: true, ownerFields: [...OWNER_FIELDS] });
    const first = ROSTER.base;
    const repointed: FederationRead = { ...first, owner: ROSTER.otherOwner };
    const renamed: FederationRead = { ...first, alias: `${first.alias}-renamed` };
    expect([first.alias === repointed.alias, same(ownerOf(first), ownerOf(repointed))], "the re-pointed read is not another owner under the same alias").toStrictEqual([true, false]);
    const ownerKey = (read: FederationRead): string => JSON.stringify(OWNER_FIELDS.map(field => read.owner[field]));
    const pure = {
      ownerApart: ownerKey(first) !== ownerKey(repointed),
      ownerSurvivesRename: ownerKey(first) === ownerKey(renamed),
      aliasMerges: first.alias === repointed.alias,
      aliasMovesOnRename: first.alias !== renamed.alias,
    };
    expect(pure).toStrictEqual({ ownerApart: true, ownerSurvivesRename: true, aliasMerges: true, aliasMovesOnRename: true });
    const named: readonly [string, FederationRead][] = [
      ["first", first],
      ["repointed", repointed],
    ];
    const project = (evidence: (read: FederationRead) => string) => {
      const projection = new ObservationProjection();
      const outcomes = [projection.refresh(snapshotOf(first, STAMPS[0], revisionOf(first), evidence(first))), projection.refresh(snapshotOf(repointed, STAMPS[0], revisionOf(repointed), evidence(repointed)))];
      const beforeRename = [evidenceHolders(projection, evidence(first), named), evidenceHolders(projection, evidence(repointed), named)];
      outcomes.push(projection.refresh(snapshotOf(renamed, STAMPS[1], revisionOf(renamed), evidence(renamed))));
      const afterRename = [evidenceHolders(projection, evidence(first), named), evidenceHolders(projection, evidence(renamed), named)];
      return { outcomes, beforeRename, afterRename, nodes: projection.stats().nodes };
    };
    const reference = project(ownerRef);
    const aliasKeyed = project(aliasRef);
    expect(reference, "the owner evidence ref merged two owners or moved on a rename").toStrictEqual({
      outcomes: ["applied", "applied", "applied"],
      beforeRename: [["first"], ["repointed"]],
      afterRename: [["first"], ["first"]],
      nodes: 2,
    });
    expect(aliasKeyed, "the alias ref kept two owners apart or held through the rename").toStrictEqual({
      outcomes: ["applied", "applied", "applied"],
      beforeRename: [
        ["first", "repointed"],
        ["first", "repointed"],
      ],
      afterRename: [["repointed"], ["first"]],
      nodes: 2,
    });
    return { phrases, pure, reference, aliasKeyed };
  },
  C1: () => {
    const doc16 = excerpt(`${CURSORS_DOC}:16`);
    const gates = excerpt(`${CURSORS_DOC}:33`);
    const phrases = {
      watermarkApart: doc16.includes("Keep max source notification cursor h separate from accepted boundary cursor c"),
      dirtyRule: doc16.includes("sourceDirty=(h>c)"),
      gateB: gates.includes("(b) notification for c=8 arrives while A accepts c=6; outstanding change remains dirty"),
      gateD: gates.includes("(d) A accepts an old authentic snapshot, never claims B latest"),
      noImplicit: excerpt(`${README_DOC}:25`).includes("no implicit 'latest' guarantee"),
      watermarkField: fieldName(excerpt(`${BOUNDARY_PY}:148`)),
      producerRule: excerpt(`${BOUNDARY_PY}:170`).trim(),
    };
    expect(phrases).toStrictEqual({
      watermarkApart: true,
      dirtyRule: true,
      gateB: true,
      gateD: true,
      noImplicit: true,
      watermarkField: "notified_position",
      producerRule: "return self.notified_position > position",
    });
    const gateB = /notification for c=(\d+) arrives while A accepts c=(\d+)/.exec(gates);
    const [dirty, clean] = ROSTER.states;
    if (dirty === undefined || clean === undefined) throw new Error("the roster holds no dirty and clean states");
    expect([dirty.notified_position, dirty.accepted_position], "the dirty state is not 03:33 (b)'s h and c").toStrictEqual([Number(gateB?.[1]), Number(gateB?.[2])]);
    expect(
      ROSTER.states.map(state => state.source_dirty === state.notified_position > state.accepted_position),
      "a roster state's flag disagrees with the producer's rule",
    ).toStrictEqual([true, true]);
    expect([dirty.source_dirty, clean.source_dirty]).toStrictEqual([true, false]);
    const states = acceptedStates();
    const dirtyStates = states.filter(state => state.source_dirty).length;
    const echoFailures = echoFailuresOf(renderAccepted, states);
    const mintsFor = (render: Render): number => states.filter(state => state.source_dirty && mintsOf(render(state)).length > 0).length;
    const property = {
      cases: states.length,
      dirtyStates,
      referenceMints: states.filter(state => mintsOf(renderAccepted(state)).length > 0).length,
      echoFailures,
      naive: Object.fromEntries(NAIVE_RENDERS.map(({ name, render }) => [name, mintsFor(render)])),
    };
    expect(dirtyStates >= 100 && dirtyStates < states.length, "the generator under-reached the dirty or the clean states").toBe(true);
    expect([property.referenceMints, property.echoFailures], "renderAccepted minted a label or did not echo the producer state").toStrictEqual([0, 0]);
    expect(Object.values(property.naive), "a naive render did not mint a label for every dirty state").toStrictEqual(NAIVE_RENDERS.map(() => dirtyStates));
    const misEchoed = states.filter(state => state.accepted_position === MIS_ECHO_AT).length;
    const echoControl = {
      misEchoed,
      misEchoes: Object.fromEntries(MIS_ECHOES.map(({ name, render }) => [name, echoFailuresOf(render, states)])),
      unparsed: Object.fromEntries(NAIVE_RENDERS.map(({ name, render }) => [name, echoFailuresOf(render, states)])),
    };
    expect(misEchoed > 0 && misEchoed < states.length, "the generator reached no state, or only states, at the mis-echo cursor").toBe(true);
    expect(Object.values(echoControl.misEchoes), "the echo instrument missed a state-dependent mis-echo of one producer field").toStrictEqual(MIS_ECHOES.map(() => misEchoed));
    expect(Object.values(echoControl.unparsed), "the echo instrument passed a render it cannot parse").toStrictEqual(NAIVE_RENDERS.map(() => states.length));
    const hazardProjection = new ObservationProjection();
    const hazardOutcome = hazardProjection.refresh(snapshotOf(atCursor(ROSTER.base, { position: dirty.accepted_position }), STAMPS[0], undefined, undefined, renderAccepted(dirty)));
    const hazard = { outcome: hazardOutcome, ...observed(hazardProjection) };
    expect(hazard, "the refresh path did not mint current for an accepted receipt below its watermark").toStrictEqual({
      outcome: "applied",
      nodes: 1,
      freshness: "current",
      statusText: renderAccepted(dirty),
      summary: "all returned nodes current",
    });
    const reference = ROSTER.states.map((state, index) => {
      const projection = new ObservationProjection();
      const outcome = projection.ingest(receiptEvent(ROSTER.base, state, `receipt-${index}`));
      const reading = observed(projection);
      return { outcome, ...reading, mints: mintsOf([reading.freshness ?? "", reading.statusText ?? "", reading.summary].join(" ")) };
    });
    expect(reference, "an accepted receipt rendered a minted label through the event route").toStrictEqual(
      ROSTER.states.map(state => ({ outcome: "applied", nodes: 1, freshness: "unknown", statusText: renderAccepted(state), summary: "0 stale / 1 unknown", mints: [] })),
    );
    const hazardMints = mintsOf([hazard.freshness, hazard.summary].join(" "));
    expect(hazardMints, "the mint instrument missed the refresh route's label").toStrictEqual(["current"]);
    return { phrases, property, echoControl, hazard: { ...hazard, mints: hazardMints }, reference };
  },
  C2: () => {
    const files = srcFiles();
    const directories = floorReadings(files);
    const walkedPaths = byPath(files).map(file => file.path);
    const enumerated = enumeratedSrcOf(REPO);
    const enumeration = { missing: enumerated.filter(path => !walkedPaths.includes(path)), extra: walkedPaths.filter(path => !enumerated.includes(path)) };
    expect(walkedPaths, "the walk C2 reads differs from an independent enumeration of src: a narrowed walk or a filtered reading").toStrictEqual(enumerated);
    const { read, scan: real } = scanRead(files);
    const independentFiles = enumeratedFilesOf(REPO);
    const independent = enumeratedReadingOf(independentFiles);
    const scanned = { missing: independent.filter(line => !read.includes(line)), extra: read.filter(line => !independent.includes(line)) };
    expect(read, "the list the guard scans differs from an independent reading of src: a filter, slice or text change on the scanner's argument").toStrictEqual(independent);
    const anchor = files.find(file => file.path === ANCHOR);
    const anchorRead = anchor?.text.includes(ANCHOR_TOKEN) === true;
    const anchorMinted = anchor === undefined ? false : mintsOf(anchor.text).includes("current");
    expect(
      directories.filter(entry => entry.endsWith(":false")),
      "a src directory walked below its floor",
    ).toEqual([]);
    expect(anchorRead, `the anchor ${ANCHOR} was not read with its token`).toBe(true);
    expect(anchorMinted, "the mint matcher missed Pi's own refresh mint at the anchor").toBe(true);
    expect(real, "a federation-scoped src file, or a minted label in one").toStrictEqual({ scoped: [], hits: [] });
    const independentScan = scanFiles(independentFiles);
    expect(independentScan, "a federation-scoped src file, or a minted label in one, in the independent reading of src").toStrictEqual({ scoped: [], hits: [] });
    const planted = scanFiles(PLANTED);
    expect(planted, "the guard missed a planted federation mint or scoped an unscoped file").toStrictEqual({
      scoped: ["src/workbench/federation-import.ts", "src/workbench/peer-watermark.ts", "src/workbench/peer-sync.ts"],
      hits: ["src/workbench/federation-import.ts: latest", "src/workbench/peer-watermark.ts: current", "src/workbench/peer-sync.ts: current"],
    });
    const { walked, enumerated: plantEnumerated, reading: plantReading } = walkPlanted(WALK_PLANT);
    expect(walked, "the walk missed a planted regular file: a non-.ts, dot-named or extensionless file, or one below the deepest FLOORS directory").toStrictEqual(
      byPath(WALK_PLANT),
    );
    expect(plantEnumerated, "the independent enumeration missed a planted regular file").toStrictEqual(byPath(WALK_PLANT).map(file => file.path));
    const { read: walkRead, scan: walkScan } = scanRead(walked);
    expect(walkRead, "the guard's reading of the walked plant differs from the plant's independent reading").toStrictEqual(plantReading);
    expect(walkScan, "the guard missed a walked federation mint or scoped the walked unscoped one").toStrictEqual({
      scoped: [
        "src/.peers/watermark.ts",
        "src/workbench/.federation-cache.json",
        "src/workbench/FEDERATION-NOTES",
        "src/workbench/federation-notes.md",
        "src/workbench/federation-peer.mjs",
        "src/workbench/hosts/federation/peer.ts",
        "src/workflow/peers/archive/2026/q4/watermark-log.json",
      ],
      hits: [
        "src/.peers/watermark.ts: latest",
        "src/workbench/.federation-cache.json: current",
        "src/workbench/FEDERATION-NOTES: latest",
        "src/workbench/federation-notes.md: current",
        "src/workbench/federation-peer.mjs: current",
        "src/workbench/hosts/federation/peer.ts: current",
        "src/workflow/peers/archive/2026/q4/watermark-log.json: latest",
      ],
    });
    const full = atFloors();
    const atFloor = floorReadings(full);
    const oneShort = Object.keys(FLOORS).map(directory => {
      const dropped = full.findIndex(file => dirname(file.path) === directory);
      return floorReadings(full.filter((_, at) => at !== dropped)).filter(entry => entry.endsWith(":false"));
    });
    expect(atFloor, "a directory holding exactly its floor read below it").toStrictEqual(Object.keys(FLOORS).map(directory => `${directory}:true`));
    expect(oneShort, "a directory one direct file short of its floor read at it, or another directory moved").toStrictEqual(Object.keys(FLOORS).map(directory => [`${directory}:false`]));
    return {
      directories,
      enumeration,
      scanned,
      anchorRead,
      anchorMinted,
      real,
      independentScan,
      planted,
      walk: { files: walked.map(file => file.path), enumerated: plantEnumerated, read: walkRead, scan: walkScan },
      floorControl: { atFloor, oneShort },
    };
  },
  ...Object.fromEntries(
    FEDERATION_WORDS.map((run, member) => [
      `MS${member + 1}`,
      () => {
        const spellings = SCOPE_SPELLINGS[member] ?? [];
        expect(spellings.length, `no spelling for ${run.join(" ")}`).toBeGreaterThan(0);
        expect(
          spellings.map(spelling => membersHitting(spelling)),
          `a spelling of ${run.join(" ")} caught by other than its own member`,
        ).toStrictEqual(spellings.map(() => [member]));
        return { member: run.join(" "), spellings: spellings.length, digest: sha256(spellings.join("\n")).slice(0, 16) };
      },
    ]),
  ),
  ...Object.fromEntries(
    MINT_WORDS.map((word, member) => [
      `MM${member + 1}`,
      () => {
        const { hits, misses } = MINT_SPELLINGS[member] ?? { hits: [], misses: [] };
        expect(hits.length, `no spelling for ${word}`).toBeGreaterThan(0);
        expect(
          hits.map(spelling => mintsOf(spelling)),
          `a spelling of ${word} not minted as ${word} alone`,
        ).toStrictEqual(hits.map(() => [word]));
        expect(
          misses.map(spelling => mintsOf(spelling)),
          "a miss read as a mint",
        ).toStrictEqual(misses.map(() => []));
        return { word, hits: hits.length, misses: misses.length, digest: sha256([...hits, ...misses].join("\n")).slice(0, 16) };
      },
    ]),
  ),
  R1: () => {
    const file: SourceFile = { path: "src/workbench/peer-import.ts", text: 'export const freshness = "current";' };
    const witness = { name: residualName("R1"), scan: scanFiles([file]), mints: mintsOf(file.text) };
    expect(witness, "R-VOCABULARY: an unscoped mint was caught").toStrictEqual({ name: "R-VOCABULARY", scan: { scoped: [], hits: [] }, mints: ["current"] });
    return witness;
  },
  R2: () => {
    const file: SourceFile = { path: "src/workbench/federation-tone.ts", text: 'export const federationTone = ["cur", "rent"].join("");' };
    const witness = { name: residualName("R2"), scan: scanFiles([file]) };
    expect(witness, "R-COMPOSED: a composed label was caught").toStrictEqual({ name: "R-COMPOSED", scan: { scoped: [file.path], hits: [] } });
    return witness;
  },
  R3: () => {
    const file: SourceFile = { path: "src/workbench/federation-label.ts", text: 'export const federationLabel = "newest, up to date";' };
    const witness = { name: residualName("R3"), scan: scanFiles([file]) };
    expect(witness, "R-PARAPHRASE: a paraphrase was caught").toStrictEqual({ name: "R-PARAPHRASE", scan: { scoped: [file.path], hits: [] } });
    return witness;
  },
  R4: () => {
    const files: SourceFile[] = [
      { path: "src/workbench/peer-label.ts", text: `export const feder${ZERO_WIDTH}ationLabel = "current";` },
      { path: "src/workbench/federation-label.ts", text: `export const federationLabel = "cur${ZERO_WIDTH}rent";` },
    ];
    const witness = { name: residualName("R4"), scan: scanFiles(files) };
    expect(witness, "R-INTERRUPTED: an interrupted word was caught").toStrictEqual({ name: "R-INTERRUPTED", scan: { scoped: ["src/workbench/federation-label.ts"], hits: [] } });
    return witness;
  },
  R5: () => {
    const files: SourceFile[] = [
      { path: "qa/workbench/federation-reader.mjs", text: 'export const label = "current";' },
      { path: "test/federation-reader.test.ts", text: 'const label = "owner latest";' },
    ];
    const witness = { name: residualName("R5"), scan: scanFiles(files) };
    expect(witness, "R-OUTSIDE-SRC: a file outside src was scanned").toStrictEqual({ name: "R-OUTSIDE-SRC", scan: { scoped: [], hits: [] } });
    return witness;
  },
  R6: () => {
    const file: SourceFile = { path: "src/workbench/federation-import.ts", text: "export const importReceipt = (projection, snapshot) => projection.refresh(snapshot);" };
    const witness = { name: residualName("R6"), scan: scanFiles([file]) };
    expect(witness, "R-INDIRECT: a refresh call read as a mint").toStrictEqual({ name: "R-INDIRECT", scan: { scoped: [file.path], hits: [] } });
    return witness;
  },
};

describe("wb-tnz5.2 federated cursor census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead export and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "M:6", "R:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constantsOf(), "a census constant against the roster").toStrictEqual(ROSTER.constants);
    const acceptance = exportedAcceptance();
    expect(clausesOf(acceptance), "ACCEPTANCE against the tracked bead export").toStrictEqual(ACCEPTANCE.map(clause => ({ letter: clause.letter, parts: [...clause.parts] })));
    expect(
      ROWS.slice(0, ACCEPTANCE.length).map(row => ({ label: row.label, pins: row.pins.length })),
      "a judged row against its exported clause: one pin per part",
    ).toStrictEqual(ACCEPTANCE.map(clause => ({ label: clauseLabel(clause), pins: clause.parts.length })));
    const required = requiredScope(acceptance);
    expect(required, "the scope words the export and the producer name").toStrictEqual(["federation", "watermark", "notified_position", "AcceptedBoundary"]);
    expect(
      required.map(word => membersHitting(word)),
      "a required scope word caught by other than exactly one member",
    ).toStrictEqual(required.map((_, index) => [index]));
    expect(required.length, "a FEDERATION_WORDS member no requirement names").toBe(FEDERATION_WORDS.length);
    expect([...requiredMints(acceptance)].sort(), "MINT_WORDS against the export's quoted labels").toEqual([...MINT_WORDS].sort());
    const pinsOf = (id: string): string[] => [...(ROWS.find(row => row.id === id)?.pins ?? [])];
    expect(pinsOf("M"), "row M: one pin per vocabulary member").toEqual([...FEDERATION_WORDS.map((_, index) => `MS${index + 1}`), ...MINT_WORDS.map((_, index) => `MM${index + 1}`)]);
    expect(pinsOf("R"), "row R: one pin per named residual").toEqual(RESIDUALS.map(residual => residual.pin));
    expect(
      RESIDUALS.map(({ pin, name }) => ({ pin, name })),
      "RESIDUALS against the first cut's declared residual list in the tracked bead export",
    ).toStrictEqual(exportedResiduals());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
