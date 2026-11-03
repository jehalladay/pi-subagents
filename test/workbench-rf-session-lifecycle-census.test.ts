/**
 * wb-hs2j.3 (RF-REACTIVE-CONTEXT-ASSEMBLY-R3), the absent-today leg. Statement (bead notes, full form): "Pi shall manage rf session
 * lifecycle explicitly: one pinned session passed for repeated committed renders (dashboard-style ticks; the zero-mint guarantee is
 * gated on RFCLI rfc-s24ro.7, open, unshipped, and Pi's preview arm is --no-commit today), no assumed automatic expiry, sessions
 * addressed only by exact session_id (never by name while duplicate-name acceptance is undetermined, rca-C055), and a closed session
 * never treated as resumable" (ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/
 * 02-swarm-usage-and-command-grammar.md:42@6a251bf73af5, merged README.md:73@6a251bf73af5). Acceptance: "(a) a Pi loop of committed
 * renders supplies one pinned session id and the open-session count stays constant across N ticks; (b) no Pi code or doc assumes rf
 * sessions expire automatically; (c) recovery paths key on session_id, never a free-text name; (d) recovery against a closed
 * session surfaces closed status, never resumes it."
 *
 * Pi commits no rf render today: the one rf launch A1's live reading lists (providers/reactivefiber.ts nativeReactiveFiberRender)
 * spawns only the `context render ... --no-commit` preview, which passes no --session, and Pi drives no rf session verb. So the
 * committed loop of (a) and the recovery paths of (c) and (d) do not exist yet (the future committing path is wb-jwc.5's), and the
 * census pins that state, the measured producer behaviour each clause depends on, and every surface the obligation already
 * reaches:
 *  A, acceptance (a). A1 the src launch inventory as launchInventory reads it (every .ts file below src/, read from disk and
 *    scanned by launchesOf, its judgement claimed at the PLANTED EXTENTS below only): the scan binds child_process launchers
 *    through the forms the A1 controls pin - named, aliased, string-named, namespace, default and default-plus-named imports,
 *    import-equals, require and dynamic-import bindings (whole, destructured, shorthand and string-keyed, the import awaited),
 *    launchers called on a require or a dynamic import, template-literal specifiers, the load wrappers pinned below and every
 *    launcher name, each control as its source is written - and folds each command from literals (a string, a template,
 *    parentheses, a `+`); its live reading of the listed src modules lists exactly one launch naming rf (the provider) and one
 *    launch whose command is not a literal, the detached host's process.execPath - a listing of the whole live tree, which the
 *    A1 case holds as a literal (refusal #4 F8) - while that no further launch exists rests on the judgement above, claimed at
 *    the PLANTED EXTENTS only.
 *    A2 N ticks of the registered native preview (three legacy, three view) against a stand-in rf: N spawns, each argv carrying
 *    --no-commit and no --session or --commit word, N readings admitted, each stating result.session_id null; the measured legacy
 *    argv of A4 is that argv. A3 the rf roster, selected by a reactivefiber: permission or an rf@ contractSource (never by id
 *    prefix), in the native and the injected registration: the one read-class preview whose contractSource is the --no-commit
 *    carrier, and RECONCILE_EVIDENCE_READS.reactivefiber names it alone, so no committing rf capability exists. A4 the measured
 *    producer ticks (roster `producer.ticks`): the --no-commit ticks kept the open-session count constant, each sessionless
 *    committed tick minted its own session (the 95-open mechanism of the quote), the ticks under one pinned --session kept the
 *    count constant and reported that id; the zero-mint journey of rfc-s24ro.7 is absent at the pin and at origin/main, as the
 *    bead row's "Shipped: no." states, so a re-measure that finds it flips A4 red until the committed loop lands with (a).
 *  B, acceptance (b). B1 the walked tree as readTree reads it (every regular file below the root, the skipped root entries aside,
 *    read as UTF-8 and judged as written and as rendered - compatibility forms folded by NFKC, default-ignorable code points such
 *    as a zero-width space or a soft hyphen removed, intraword emphasis asterisks dropped - its judgement claimed at the
 *    PLANTED EXTENTS below only): the judge flags a sentence in which a session word sits within WINDOWS.rf words of an rf word
 *    and within WINDOWS.expiry words of an expiry term, unless a negator appears in that sentence before the later of the session
 *    word and the expiry term - the B1 controls and the vocabulary page pin that reading - and, at those extents, it flags no
 *    judged file; the walk meets no symlink (refused, never followed) and no unreadable entry.
 *    B2 the rf reader closure (the src import closure of the provider and its adapter) as stateInventory reads it holds no session
 *    state: through the forms the B2 controls pin, at the PLANTED EXTENTS below, sessionStateOf reads no identifier or property
 *    name carrying a session word and no literal (a cooked string, a template literal or a template part, or a folded `+`
 *    concatenation) naming a session flag, a session_id field, a dotted session leaf or an rfs_ id. B3 each exemption is
 *    load-bearing: this file and its roster are walked, not judged, and both read as expiry findings, so lifting either reds B1.
 *  C, acceptance (c). C1, as verbInventory and the descriptor judge read them, no src module at the PLANTED EXTENTS below and no
 *    native descriptor in a place its canaries fill (the whole value of a DESCRIPTOR_CANARY_FIELDS field, as below) spells an rf
 *    session verb through a form a C1 control pins (an argv "session" followed by a verb, a dotted session.<verb> leaf, an
 *    `rf ... session <verb>` command text, in a string, a template literal or a template's parts) or a --session flag, while the
 *    render argv is read (non-vacuity). C2 the measured producer serves session open/show/list/close only (no
 *    recover, handoff, resume or attach leaf: README C6 is proposed), addresses show and close by the session id, keeps --name a
 *    field separate from --id and states an unnamed session's name null; rca-C055 leaves duplicate-name acceptance
 *    undetermined, so Pi pins id-only.
 *  D, acceptance (d). D1 a stand-in rf answering the measured RF_SESSION_CLOSED refusal (and a full-shape live render to any later
 *    spawn) yields the typed refusal naming the code and no field value, no reading, one spawn. D2 the injected registration's
 *    reading carries that refusal byte for byte (a deep copy handed to the reader, compared with the pre-invocation serialization).
 *    D3 the adapter projects it as a failure whose status names the code and which carries no output digest or graph revision.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only, 2026-10-23): rf 0.1.832 (`rf --json --version`) in a scratch jsonl
 * workspace; the help lines are `rf <leaf> --help`, whitespace-normalised; the closed refusal is the stdout of a committed render
 * with --session <closed id> (exit 4; the --no-commit form answered the same code), its scratch root rewritten to
 * /fixture/rf-workspace. The pin and origin/main facts are `git cat-file -e` / `git show` in a ReactiveFiberCLI clone. D1 answers
 * Pi's own argv (which carries no --session) with that measured refusal: it reads the reader's handling of the code, not a Pi
 * recovery path, since none exists.
 * LISTING ANCHORS (wb-khhg F1): each walk is held to a listing it does not compute, read from the judge's own record (the file
 * each scan judged, recorded by the scan; each file B1's judge read, recorded after the judgement), never to a count floor
 * alone: B1's judge reads every file git lists (`git ls-files --cached --others --exclude-standard`) but the bead export
 * (.beads, the one skipped root git lists) and the exempt pair; A1 and C1 scan every file git lists below src/; B2 scans exactly
 * the closure TypeScript resolves (each module's ts.preProcessFile imports resolved by ts.resolveModuleName under tsconfig.json's
 * options); C1 reads exactly the descriptors a second native registration lists. The listing is itself checked sound (it meets
 * the files floor and names every walk anchor and reader module), so no anchor passes on an empty listing; the FLOORS stay
 * beside them. The anchors record names (each file read or scanned, each descriptor id read), so they pin which files and
 * descriptors are read, never how far into a file or a descriptor the judgement reaches, nor whether a file's mode keys it: that
 * is the PLANTED EXTENTS' reach, below.
 * PATH CONTROLS (wb-khhg cut #3, the enumerate-the-resolvable form R-B247 binds; they replace cut #2's one-payload exact-path
 * canaries): every control of A1, B1, B2 and C1 is read again at every listed path, through the reading the live tree gets, each
 * planted file written without a mode, so that no path control reads an executable file (PLANTED EXTENTS, below). Each
 * control's source is planted byte for byte at every listed src path (A1, C1), every TypeScript-resolved closure path (B2) or
 * every listedJudgeable path (B1) of a scratch mirror; the mirror is read by the live reading's own function (launchInventory and
 * verbInventory: the src walk, the file reads, the scans and the gathered lists; stateInventory: the reads, the scans and the
 * gathered lists over the closure modules, the closure walk itself running on the checkout only, held to TypeScript's
 * resolution by the listing anchor; readTree: the walk, the reads and the judge), and every path must read exactly as its
 * control reads at control.ts (each pin's pathControlsMissed []). B1 plants, the same way, a vocabulary page built from the scan
 * constants: one sentence for each expiry word, each expiry pair, each auto and end word pairing in both
 * orders, each rf and session word, each window's outer bound on either side and a late negator, every sentence a finding and
 * no two alike (vocabulary). C1 places each session form (each dotted leaf, each rf session command, the flag) in each field of
 * DESCRIPTOR_CANARY_FIELDS of every native descriptor, read through the same descriptorJudge (descriptorCanariesMissed []). So
 * one edit to a judge that keys on a directory, a file name, a prefix or an extension and drops a pinned form's judgement at a
 * listed path reds that pin, as does one keyed on a descriptor id that drops a form in a canary field: the gate's GA1-GA4,
 * GB1, GB3, GB4, GC1 and GC2 die this way, each with its paired plant. GB2 is the residual R-LIVE-ROOT. NOT CLAIMED by this
 * census: a drop keyed on content no control, page sentence or descriptor canary carries (an argv identifier, a sentence's
 * other words, a marker the planted text lacks); a drop keyed on a path git's listing does not name (an ignored file a walk
 * reads); a form no control writes, beside the named residuals below; edits that narrow a walk and its independent listing
 * together (K03), a path control and the asserted reading together, or that remove a pin from every literal together (H05/H06).
 * PLANTED EXTENTS (wb-khhg cut #4, the fail-closed core ruling R-B273 binds after refusal #3, with the mode added by cut #5 for
 * refusal #4's U2; the coverage this narrowing defers is the landed wb-4zgj's, THE READERS below): each path control, and B1's
 * vocabulary page, is planted as a whole file holding only its own text and written without a mode, so what the A1, B1, B2 and C1
 * path controls pin is the judgement of a form at an offset where a text planted for that pin holds one, in a file no longer
 * than the longest such text and carrying no execute bit; C1's descriptor canaries pin a session form only as the whole value of
 * a DESCRIPTOR_CANARY_FIELDS field (a string field's value, a list field's only element, a schema field holding only a top-level
 * description). The A1, B1, B2 and C1 sentences above say so in place, and every other claim word here that rests on those readings
 * claims at those extents and in those fields only: the opening's "Pi commits no rf render today", "Pi drives no rf session verb"
 * and "the recovery paths of (c) and (d) do not exist yet", and the row labels' "no walked file states an rf session expiry" and
 * "the rf reader closure holds no session state" (B) and "no src module or native descriptor spells an rf session verb or flag"
 * (C). The opening's one rf launch and row A's label words on Pi's one rf launch name the whole-tree listing the A1 case holds
 * as a literal, not a reading at these extents (refusal #4 F8: at them A1 reads no launch, every listed src module being longer
 * than the longest A1 text); that Pi has no further rf launch is claimed at these extents only. A form at an offset where no
 * text planted for its pin holds one - such as a launch, a literal or a sentence past the end of every such text, past byte
 * 64 KiB of src/index.ts or of docs/workbench/feature-matrix.md (the gate's GO1, GO2 and GS1) - and a judgement drop keyed on a
 * file's length or on a form's offset are NOT CLAIMED by this census. A form anywhere in a native descriptor but as the whole
 * value of a DESCRIPTOR_CANARY_FIELDS field - its id field, a nested schema entry such as a property's description (the gate's
 * GD1 and GD2), a list element beside others, a longer field value or a field that list does not name - is NOT CLAIMED by this
 * census. A judgement drop keyed on a file's mode - its execute bit, as in the gate's GM1 (B1 readTree), GM2 (A1
 * launchInventory), GM3 (C1 verbInventory) and GM4 (B2 stateInventory), each of which reads a listed executable file as holding
 * no form - is NOT CLAIMED by this census.
 * THE READERS (wb-khhg CUT #5, the re-cut of the narrowed core over the landed carrier that the rule-19 dependency inversion
 * R-B301 left owed: the structural-exit child wb-4zgj landed at landing 893, merge 29a99c4c): readTree, launchInventory,
 * verbInventory and stateInventory, with the scans, scan constants and judges they call, and descriptorJudgeOf, which builds C1's
 * descriptor judge over the read log C1 hands it, are imported from test/helpers/rf-session-lifecycle-readers.ts, wb-4zgj's
 * byte-for-byte move of cut #4's declarations; this file declares none of them, and every reading, control, pin, witness,
 * roster entry and case of cut #4 is kept. The landed reach census test/workbench-rf-session-lifecycle-reach-census.test.ts
 * holds those readers' literal readings for refusal #3's members GD1, GD2, GS1, GO1 and GO2 and refusal #4's members GM1, GM2,
 * GM3 and GM4, one pin case each ("member <id> (<site>) - <quote>: ..."), and each member, applied to the helper, reds its own
 * pin case there while this census reads 14 passed. Those nine members' forms stay NOT CLAIMED by this census (PLANTED EXTENTS,
 * above); their pins are that census's.
 * U2 LOAD WRAPPERS: A1 controls wrap require and awaited dynamic import in parentheses, await, as, satisfies, non-null and
 * angle-bracket assertions, singly and in the pinned nested composition, for whole/destructured bindings and direct calls.
 * A wrapper on a launcher callee is the residual R-CALLEE-WRAPPER; wrappers on a command other than parentheses, or on a
 * declaration name, are NOT CLAIMED by this census.
 * PINNED READER SET: test/workbench-rf-session-lifecycle-census.test.ts judged-set, A1-A4, B1-B3, C1-C2, D1-D3 and records:
 * each asserts its named witness against test/fixtures/rf-session-lifecycle-roster.json. Judged-set checks ROWS/roster/bead
 * agreement; A1 checks launches, load wrappers and its path controls; A2 checks preview ticks; A3 checks rf descriptors; A4
 * checks captured ticks; B1 checks text, its path controls, the vocabulary page and the R-LIVE-ROOT quiet row; B2 checks closure
 * state and its path controls; B3 checks exemptions; C1 checks verbs/descriptors, its path controls and the descriptor canaries;
 * C2 checks captured session leaves; D1-D3 check the captured refusal's native/injected/projected handling; records checks
 * execution and end reach. Each positive is falsifiable by its paired real-tree plant, roster-witness flip, or the CT
 * frozen-shape battery; the U1 falsifiers K01/K02/K04/K05/K06/K11, U2 K08/K08b and refusal #2's GA1-GA4, GB1-GB4, GC1-GC2 and X1
 * are independently gate-authored. A1, B1, B2 and C1 claim their judgement at the PLANTED EXTENTS and C1 its descriptors in the
 * canary fields only; refusal #3's GD1, GD2, GS1, GO1 and GO2 and refusal #4's GM1, GM2, GM3 and GM4 fall outside that pinned set
 * (NOT CLAIMED above; their pin cases are the landed reach census's, THE READERS above).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the residual families and the registered test titles are held to the out-of-file roster
 * (test/fixtures/rf-session-lifecycle-roster.json). OUTSIDE ANCHOR: the owner filing's row in the tracked bead export
 * (.beads/issues.jsonl, row wb-hs2j.3): every acceptance clause it lists opens exactly one row label verbatim (the clause, then
 * the label's colon, so a shortened or reworded filing clause reds) and every row carries one, its quote, citation and merged quote equal the roster's, and its "Gating artifacts:" line is read by A4 and C2, so
 * a row removed from every literal of this file and the roster still reds. Not claimed: a pin removed from ROWS, the frozen literal,
 * IMPL and the roster together (the bead row anchors rows and clauses, not pins).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); every registered test and suite title reads quiet to B1's judge.
 * A skipped case cannot see its own skip, so the judged-set case, which runs first, reads the records case's registration: the
 * last registered test, in run mode, not inverted (wb-khhg F4). An afterAll sentinel refuses an early return from records
 * even after one assertion (K09b); only its final statement sets the sentinel.
 * RESIDUALS (named families, each with a pinned quiet row in a control): R-SPLIT an assumption spread over two sentences or past the
 * word windows (B1 split); R-PARAPHRASE an expiry stated without the vocabulary (B1 paraphrase); R-NEGATED a negator earlier in the
 * sentence quiets a later expiry term (B1 negatedEarlier); R-ENCODED text outside UTF-8 or written with escapes (B1 utf16, escaped;
 * the planted notes/le.txt); R-RENDERED a word split by markup the rendered reading keeps, an inline HTML tag, an HTML entity or a
 * code span (B1 htmlTag, htmlEntity, codeSpan); R-CONFUSABLE a confusable code point NFKC does not fold (B1 confusable);
 * R-OUTSIDE a file below a skipped root entry (B1 planted node_modules/, .beads/,
 * dist/); R-COMPOSED a session argv or field built from non-literal parts (C1 composedArgv, B2 composedField); R-INDIRECT-LAUNCH a
 * launcher reached through a variable, an element access or the callback of a dynamic import's then (A1 indirect, elementAccess,
 * dynamicThen); R-CALLEE-WRAPPER a launcher callee wrapped in parentheses, a comma expression or a non-null assertion is no launch
 * (A1 calleeParen, calleeComma, calleeNonNull, memberParen; the gate's X1); R-SESSION-ECHO the preview reader admits a --no-commit
 * envelope stating a session id, taking the producer's "--no-commit persists none" on its word (A2 sessionEcho); R-UNLABELED an
 * rf capability registered under neither a reactivefiber: permission nor an rf@ contractSource is not selected (A3 unlabeled);
 * R-LIVE-ROOT a judgement drop keyed on the root a reading walks being the checkout, or placed at the live reading's own call or
 * result, which no path control traverses, since each reads a scratch mirror through the same function (the gate's GB2, which
 * drops .json findings when the root is REPO; B1 liveRoot, the quiet row: that member keys on the live reading's .json files and
 * changes no path control's reading).
 * Display paths added: none. Test-only: the stand-in rf and the planted trees live in makeScratch scratch; src is only read.
 */
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { AUTO_WORDS, CHILD_PROCESS, DEFAULT_IGNORABLE, descriptorJudgeOf, END_WORDS, EXEMPT, EXPIRY_PAIRS, EXPIRY_WORDS, expiryFindings, INTRAWORD_EMPHASIS, LAUNCHERS, launchesOf, launchInventory, NEGATORS, parse, posix, present, RF_WORDS, ROSTER_FILE, readTree, SELF, SENTENCE_BREAK, SESSION_FIELD_TEXT, SESSION_FLAG_TEXT, SESSION_VERB_TEXT, SESSION_VERBS, SESSION_WORDS, SKIPPED_ROOTS, sessionStateOf, sessionVerbsOf, stateInventory, type TreeReading, textOf, type VerbLists, verbInventory, verbLists, WALK_ANCHORS, WINDOWS } from "./helpers/rf-session-lifecycle-readers.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = process.cwd();
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.3";
const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PERMISSION_PREFIX = "reactivefiber:";
const GRANTS = ["reactivefiber:render"];
/** The root the measured closed-session envelope names after its scratch root was rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const CLOSED_CODE = "RF_SESSION_CLOSED";
/** The ticks A2 drives through one registration: three legacy {model, task} and three served view {view, taskId} inputs. */
const TICK_INPUTS: readonly JsonObject[] = [
  { model: "m", task: "t" },
  { model: "m", task: "t" },
  { model: "m", task: "t" },
  { view: "v", taskId: "t" },
  { view: "v", taskId: "t" },
  { view: "v", taskId: "t" },
];
/** Each floor sits below the count measured at base 436e6db (808 walked files; 115 src modules; a 7-module reader closure). */
const FLOORS = { files: 700, srcModules: 100, closure: 5 };
/** The listing the walks are held to: git's own file list of the checkout, tracked and untracked but not ignored. */
const GIT_LISTING = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"];
/** The listed roots no walk judges: the bead export, which the judged-set case, A4 and C2 read as the outside anchor. */
const LISTED_UNJUDGED = [".beads"];
/** The reader modules: the provider and its adapter; B2 walks their src import closure. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
const RESIDUAL_FAMILIES = ["R-SPLIT", "R-PARAPHRASE", "R-NEGATED", "R-ENCODED", "R-RENDERED", "R-CONFUSABLE", "R-OUTSIDE", "R-COMPOSED", "R-INDIRECT-LAUNCH", "R-CALLEE-WRAPPER", "R-SESSION-ECHO", "R-UNLABELED", "R-LIVE-ROOT"];
/** The file name a control is read under; each path control's reading is relabelled to it (wb-khhg cut #3). */
const CONTROL_FILE = "control.ts";
/** The descriptor fields C1's canaries place each session form in (wb-khhg cut #3): one descriptor per id, field and form. */
const DESCRIPTOR_CANARY_FIELDS = ["description", "version", "contractSource", "effectClass", "permissions", "supportedModes", "inputSchema", "outputSchema"] as const;

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
      "(a) a Pi loop of committed renders supplies one pinned session id and the open-session count stays constant across N ticks: absent today and gated - Pi's one rf launch spawns only the --no-commit preview, which passes no --session flag, the measured --no-commit ticks keep the open-session count constant, no committing rf capability is registered, and the zero-mint journey of rfc-s24ro.7 is unshipped",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) no Pi code or doc assumes rf sessions expire automatically: no walked file states an rf session expiry, the rf reader closure holds no session state, and each exemption is load-bearing",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) recovery paths key on session_id, never a free-text name: Pi has no recovery path today - no src module or native descriptor spells an rf session verb or flag - and the measured producer serves no recover verb, addresses show and close by the session id and keeps the session name a separate field",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(d) recovery against a closed session surfaces closed status, never resumes it: the measured RF_SESSION_CLOSED refusal surfaces as itself in one spawn with no reading, the registered reading carries it verbatim, and the adapter projects a failure carrying no value",
    pins: ["D1", "D2", "D3"],
  },
];

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Ticks {
  readonly argv: readonly string[];
  readonly openBefore: number;
  readonly openAfter: number;
  readonly sessionIds: readonly (string | null)[];
}
interface Producer {
  readonly rfVersion: string;
  readonly model: string;
  readonly task: string;
  readonly leafPaths: readonly string[];
  readonly sessionLeaves: readonly { readonly path: string; readonly served: boolean }[];
  readonly help: { readonly [key: string]: string };
  readonly record: { readonly keys: readonly string[]; readonly unnamedName: JsonValue; readonly openStatus: string; readonly closedStatus: string };
  readonly ticks: { readonly preview: Ticks; readonly sessionless: Ticks; readonly pinned: Ticks & { readonly pinned: string } };
  readonly zeroMint: { readonly bead: string; readonly beadsRow: string; readonly title: string; readonly journey: string; readonly presentAtPin: boolean; readonly presentAtMain: boolean };
  readonly duplicateNames: { readonly id: string; readonly beadsRow: string; readonly proposition: string };
  readonly closedRefusal: { readonly commitExit: number; readonly noCommitExit: number; readonly noCommitCode: string; readonly envelope: Envelope };
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly mainPin: { readonly repo: string; readonly ref: string; readonly sha: string };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly merged: { readonly id: string; readonly citation: string; readonly quote: string; readonly path: string; readonly heading: string; readonly line: string };
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
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
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error(`roster ${field} must be a non-negative integer`);
  return value;
}
function flag(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`roster ${field} must be a boolean`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function ticksOf(value: unknown, field: string): Ticks {
  const raw = objectOf(value, `roster ${field}`);
  const ids: unknown = raw.sessionIds;
  if (!Array.isArray(ids)) throw new Error(`roster ${field}.sessionIds must be a list`);
  const sessionIds = ids.map((id: unknown): string | null => {
    if (id === null || typeof id === "string") return id;
    throw new Error(`roster ${field}.sessionIds must list ids or nulls`);
  });
  return { argv: strings(raw.argv, `${field}.argv`), openBefore: count(raw.openBefore, `${field}.openBefore`), openAfter: count(raw.openAfter, `${field}.openAfter`), sessionIds };
}
/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  const raw = objectOf(value, `roster envelope ${name}`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = raw;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster envelope ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(raw, "result") || !Array.isArray(diagnostics)) throw new Error(`roster envelope ${name} needs a null transaction, a result and diagnostics`);
  return { schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null, result: json(result), diagnostics: diagnostics.map(json) };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "roster");
  if (!Array.isArray(raw.rows)) throw new Error("roster needs rows");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const merged = objectOf(raw.merged, "roster merged");
  const producer = objectOf(raw.producer, "roster producer");
  const help = objectOf(producer.help, "roster producer.help");
  const record = objectOf(producer.record, "roster producer.record");
  const ticks = objectOf(producer.ticks, "roster producer.ticks");
  const pinnedTicks = objectOf(ticks.pinned, "roster producer.ticks.pinned");
  const zeroMint = objectOf(producer.zeroMint, "roster producer.zeroMint");
  const duplicateNames = objectOf(producer.duplicateNames, "roster producer.duplicateNames");
  const closedRefusal = objectOf(producer.closedRefusal, "roster producer.closedRefusal");
  const programPin = objectOf(producer.programPin, "roster producer.programPin");
  const mainPin = objectOf(producer.mainPin, "roster producer.mainPin");
  const leaves: unknown = producer.sessionLeaves;
  if (!Array.isArray(leaves)) throw new Error("roster producer.sessionLeaves must be a list");
  const sessionLeaves = leaves.map((leaf: unknown, index: number) => {
    const row = objectOf(leaf, `roster producer.sessionLeaves[${index}]`);
    return { path: text(row.path, `producer.sessionLeaves[${index}].path`), served: flag(row.served, `producer.sessionLeaves[${index}].served`) };
  });
  if (!Object.hasOwn(record, "unnamedName")) throw new Error("roster producer.record needs unnamedName");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    merged: {
      id: text(merged.id, "merged.id"),
      citation: text(merged.citation, "merged.citation"),
      quote: text(merged.quote, "merged.quote"),
      path: text(merged.path, "merged.path"),
      heading: text(merged.heading, "merged.heading"),
      line: text(merged.line, "merged.line"),
    },
    scan: scan as JsonObject,
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      model: text(producer.model, "producer.model"),
      task: text(producer.task, "producer.task"),
      leafPaths: strings(producer.leafPaths, "producer.leafPaths"),
      sessionLeaves,
      help: Object.fromEntries(Object.entries(help).map(([key, value]) => [key, text(value, `producer.help.${key}`)])),
      record: {
        keys: strings(record.keys, "producer.record.keys"),
        unnamedName: json(record.unnamedName),
        openStatus: text(record.openStatus, "producer.record.openStatus"),
        closedStatus: text(record.closedStatus, "producer.record.closedStatus"),
      },
      ticks: {
        preview: ticksOf(ticks.preview, "producer.ticks.preview"),
        sessionless: ticksOf(ticks.sessionless, "producer.ticks.sessionless"),
        pinned: { ...ticksOf(pinnedTicks, "producer.ticks.pinned"), pinned: text(pinnedTicks.pinned, "producer.ticks.pinned.pinned") },
      },
      zeroMint: {
        bead: text(zeroMint.bead, "producer.zeroMint.bead"),
        beadsRow: text(zeroMint.beadsRow, "producer.zeroMint.beadsRow"),
        title: text(zeroMint.title, "producer.zeroMint.title"),
        journey: text(zeroMint.journey, "producer.zeroMint.journey"),
        presentAtPin: flag(zeroMint.presentAtPin, "producer.zeroMint.presentAtPin"),
        presentAtMain: flag(zeroMint.presentAtMain, "producer.zeroMint.presentAtMain"),
      },
      duplicateNames: {
        id: text(duplicateNames.id, "producer.duplicateNames.id"),
        beadsRow: text(duplicateNames.beadsRow, "producer.duplicateNames.beadsRow"),
        proposition: text(duplicateNames.proposition, "producer.duplicateNames.proposition"),
      },
      closedRefusal: {
        commitExit: count(closedRefusal.commitExit, "producer.closedRefusal.commitExit"),
        noCommitExit: count(closedRefusal.noCommitExit, "producer.closedRefusal.noCommitExit"),
        noCommitCode: text(closedRefusal.noCommitCode, "producer.closedRefusal.noCommitCode"),
        envelope: envelopeOf(closedRefusal.envelope, "closedRefusal"),
      },
      programPin: { repo: text(programPin.repo, "producer.programPin.repo"), sha: text(programPin.sha, "producer.programPin.sha") },
      mainPin: { repo: text(mainPin.repo, "producer.mainPin.repo"), ref: text(mainPin.ref, "producer.mainPin.ref"), sha: text(mainPin.sha, "producer.mainPin.sha") },
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const CLOSED = ROSTER.producer.closedRefusal.envelope;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The first line of the filing's notes that starts with `prefix`, without the prefix. */
function noteLine(notes: string, prefix: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`${BEAD} notes carry no "${prefix}" line`);
  return line.slice(prefix.length);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

const asserts = (value: string): boolean => expiryFindings(value).length > 0;
/** B1's vocabulary page (wb-khhg cut #3): one sentence for every entry of the scan constants - each expiry word and pair, each auto
 * and end word pairing in both orders, each rf word and the reactive fiber pair, each session word - and one for each window's
 * outer bound on either side and for a late negator; each sentence is numbered, so no two findings are alike. */
function vocabularyPage(): { readonly text: string; readonly sentences: number } {
  const filler = (count: number): string => Array.from({ length: count }, (_, at) => `filler${at}`).join(" ");
  const sentences = [
    ...[...EXPIRY_WORDS, ...EXPIRY_PAIRS].map(term => `the rf session ${term} now`),
    ...AUTO_WORDS.flatMap(auto => END_WORDS.flatMap(end => [`the rf session ${auto} ${end} now`, `the rf session ${end} ${auto} now`])),
    ...RF_WORDS.map(word => `the ${word} session expires now`),
    "the reactive fiber session expires now",
    ...SESSION_WORDS.map(word => `the rf ${word} expires now`),
    `rf ${filler(WINDOWS.rf - 1)} session expires now`,
    `session ${filler(WINDOWS.rf - 1)} rf now expires`,
    `the rf session ${filler(WINDOWS.expiry - 1)} expires`,
    `expires ${filler(WINDOWS.expiry - 1)} session rf`,
    "the rf session expires now and not later",
  ];
  return { text: sentences.map((sentence, at) => `Entry ${at}: ${sentence}.`).join("\n\n"), sentences: sentences.length };
}

let live: TreeReading | undefined;
/** The repository's own reading, taken once, after git's listing (so a file the listing names and a concurrent run removes before
 * the walk is absent at the anchor's check, never a false gap). */
function liveTree(): TreeReading {
  if (live === undefined) {
    gitListing();
    live = readTree(REPO);
  }
  return live;
}
let listing: readonly string[] | undefined;
/** Git's own file list of the checkout (GIT_LISTING: root-relative, "/"-separated, sorted), taken once: the listing every walk is
 * held to. */
function gitListing(): readonly string[] {
  if (listing === undefined) {
    const run = spawnSync("git", GIT_LISTING, { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (run.status !== 0) throw new Error(`git ${GIT_LISTING.join(" ")} failed: ${run.stderr}`);
    listing = [...new Set(run.stdout.split("\0").filter(name => name.length > 0))].sort();
  }
  return listing;
}
const rootOf = (file: string): string => file.split("/")[0] ?? "";
/** The listed files B1's judge owes a reading: present on disk, outside LISTED_UNJUDGED and the exempt pair. */
const listedJudgeable = (): string[] => gitListing().filter(file => !LISTED_UNJUDGED.includes(rootOf(file)) && !EXEMPT.includes(file) && present(join(REPO, file)));
/** The listed src files A1 and C1 owe a scan: every listed file below src/ that is present on disk. */
const listedSrc = (): string[] => gitListing().filter(file => file.startsWith("src/") && present(join(REPO, file)));
/** The listing is no empty or truncated reading: it meets the files floor and names every walk anchor and reader module, so no
 * anchor that reads it passes vacuously. */
const listingSound = (): boolean =>
  gitListing().length >= FLOORS.files && [...WALK_ANCHORS.map(([path]) => path), ...READER_MODULES].every(path => gitListing().includes(path));
/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file), reads that tree with `read` and
 * removes it. */
function withPlanted<T>(files: Readonly<Record<string, string | Buffer | null>>, read: (root: string) => T): T {
  const root = makeScratch("rf-session-lifecycle-tree-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return read(root);
  } finally {
    removeScratch(root);
  }
}
/** Plants `files` in a fresh scratch root and reads that tree with B1's judge. */
const plantedTree = (files: Readonly<Record<string, string | Buffer | null>>): TreeReading => withPlanted(files, readTree);
/** A scratch mirror's files: `content` at every one of `paths`. */
const mirrorOf = (paths: readonly string[], content: string): Record<string, string> => Object.fromEntries(paths.map(path => [path, content]));
/** The file a B1 finding names: the text before its first ": ". */
const fileOf = (finding: string): string => finding.slice(0, finding.indexOf(": "));






/** The reader modules' transitive src import closure (static imports and re-exports of relative specifiers). */
function readerClosure(): { modules: string[]; unresolved: string[] } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || seen.has(path)) continue;
    seen.add(path);
    const file = parse(relative(REPO, path), textOf(path));
    for (const statement of file.statements) {
      if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))) continue;
      const specifier = statement.moduleSpecifier;
      if (specifier === undefined || !ts.isStringLiteralLike(specifier) || !specifier.text.startsWith(".")) continue;
      const target = join(dirname(path), specifier.text.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${posix(relative(REPO, path))}: ${specifier.text}`);
    }
  }
  return { modules: [...seen].map(path => posix(relative(REPO, path))).sort(), unresolved };
}

/** TypeScript's own reading of the reader closure, the listing B2 is held to: each module's imports as ts.preProcessFile lists them
 * (static, type-only and dynamic), resolved by ts.resolveModuleName under tsconfig.json's options; a relative specifier it cannot
 * resolve is listed apart. */
function resolvedClosure(): { modules: string[]; unresolved: string[] } {
  const config = ts.readConfigFile(join(REPO, "tsconfig.json"), ts.sys.readFile);
  if (config.error !== undefined) throw new Error("tsconfig.json does not parse");
  const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO);
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || seen.has(path)) continue;
    seen.add(path);
    for (const { fileName: specifier } of ts.preProcessFile(textOf(path), true, true).importedFiles) {
      const target = ts.resolveModuleName(specifier, path, options, ts.sys).resolvedModule;
      if (target === undefined) {
        if (specifier.startsWith(".")) unresolved.push(`${posix(relative(REPO, path))}: ${specifier}`);
        continue;
      }
      if (target.isExternalLibraryImport !== true && posix(relative(REPO, target.resolvedFileName)).startsWith("src/")) queue.push(target.resolvedFileName);
    }
  }
  return { modules: [...seen].map(path => posix(relative(REPO, path))).sort(), unresolved };
}


/** `list`'s entries grouped by the file each names (the text before its first ":"), each relabelled to CONTROL_FILE and each group
 * sorted: a mirror's reading path by path, in the form its control's reading takes. */
function byPath(list: readonly string[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>();
  for (const entry of list) {
    const at = entry.indexOf(":");
    const relabelled = `${CONTROL_FILE}${entry.slice(at)}`;
    const group = grouped.get(entry.slice(0, at));
    if (group === undefined) grouped.set(entry.slice(0, at), [relabelled]);
    else group.push(relabelled);
  }
  for (const group of grouped.values()) group.sort();
  return grouped;
}
interface PathControls<R> {
  /** Each control and path whose reading differs from the control's own at CONTROL_FILE, as `<control> <path>`. */
  readonly missed: string[];
  readonly readings: R[];
}
/** PATH CONTROLS (wb-khhg cut #3): each control's source planted at every one of `paths` in a scratch mirror and read by `read`, the
 * live reading's own function; every path's entries (`listsOf`) must equal the control's own read at CONTROL_FILE (`controlLists`). */
function pathControls<R>(
  paths: readonly string[],
  sources: Readonly<Record<string, string>>,
  read: (root: string) => R,
  listsOf: (reading: R) => readonly (readonly string[])[],
  controlLists: (source: string) => readonly (readonly string[])[],
): PathControls<R> {
  const missed: string[] = [];
  const readings: R[] = [];
  for (const [name, source] of Object.entries(sources)) {
    const want = JSON.stringify(controlLists(source).map(list => [...list].sort()));
    const reading = withPlanted(mirrorOf(paths, source), read);
    readings.push(reading);
    const groups = listsOf(reading).map(byPath);
    for (const path of paths) if (JSON.stringify(groups.map(group => group.get(path) ?? [])) !== want) missed.push(`${name} ${path}`);
  }
  return { missed, readings };
}
/** A descriptor's fields with `text` placed in `field`: a string field holds it, a list field holds it alone and a schema field holds
 * it as its description. */
function placedIn(descriptor: CapabilityDescriptor, field: (typeof DESCRIPTOR_CANARY_FIELDS)[number], text: string): { readonly id: string } {
  if (field === "permissions" || field === "supportedModes") return { ...descriptor, [field]: [text] };
  if (field === "inputSchema" || field === "outputSchema") return { ...descriptor, [field]: { description: text } };
  return { ...descriptor, [field]: text };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface Answer {
  readonly stdout: JsonValue;
  readonly exit: number;
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log and answers spawn n with
 * answers[n] (the last answer repeats). */
function standInRf(answers: readonly Answer[]): string {
  const folder = makeScratch("rf-session-lifecycle-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      'const seen = fs.existsSync(log) ? fs.readFileSync(log, "utf8").split("\\n").filter(Boolean).length : 0;',
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${JSON.stringify(answers)};`,
      "const answer = answers[Math.min(seen, answers.length - 1)];",
      "process.stdout.write(JSON.stringify(answer.stdout));",
      "process.exit(answer.exit);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
interface NativeTicks {
  readonly readings: JsonValue[];
  readonly refusals: { category: string; message: string }[];
  readonly spawns: string[][];
}
/** One NATIVE registration (registerNativeReactiveFiberRender) invoked once per input against a stand-in rf. */
async function nativeTicks(inputs: readonly JsonObject[], answers: readonly Answer[]): Promise<NativeTicks> {
  const log = standInRf(answers);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const readings: JsonValue[] = [];
  const refusals: { category: string; message: string }[] = [];
  for (const input of inputs) {
    try {
      readings.push(await registry.invoke(PREVIEW_ID, input, invocationContext()));
    } catch (error) {
      refusals.push(refusalOf(error));
    }
  }
  return { readings, refusals, spawns: spawnsOf(log) };
}
/** The result.session_id an admitted reading states, "<absent>" when it states none. */
function readingSession(reading: JsonValue): JsonValue {
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  const result = objectOf(source.result, "reading result");
  return Object.hasOwn(result, "session_id") ? json(result.session_id) : "<absent>";
}
/** An argv with its workspace root, model and task values replaced by placeholders, the measured argv's spelling. */
function argvShape(argv: readonly string[], workspace: string, model: string, task: string): string[] {
  return argv.map(word => (word === workspace ? "<workspace>" : word === model ? "<model>" : word === task ? "<task>" : word));
}

let nativeDescriptors: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeCatalog(): Promise<CapabilityDescriptor[]> {
  nativeDescriptors ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeDescriptors;
}
/** The native registration's descriptor ids read through a second registry, apart from nativeCatalog's cached load: the listing C1's
 * descriptor reading is held to. */
async function nativeIdsAfresh(): Promise<string[]> {
  const registry = new CapabilityRegistry();
  (await loadWorkbenchNative()).registerNativeProviders(registry, ROOT);
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor.id)
    .sort();
}
/** The rf roster of a catalog: descriptors holding a reactivefiber: permission or an rf@ contractSource. */
const rfRoster = (descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] =>
  descriptors.filter(descriptor => descriptor.permissions.some(permission => permission.startsWith(RF_PERMISSION_PREFIX)) || descriptor.contractSource?.startsWith("rf@") === true);
const rosterRow = (descriptor: CapabilityDescriptor): JsonObject => ({ id: descriptor.id, effectClass: descriptor.effectClass, contractSource: descriptor.contractSource ?? null });

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" },
  seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** The primary diagnostic of the measured closed-session refusal. */
function closedPrimary(): { [key: string]: unknown } {
  return objectOf(CLOSED.diagnostics[0], "closed refusal diagnostics[0]");
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** The field values a surface must not name: every string leaf of the refusal's metadata. */
const closedValues = (): string[] => stringLeaves(closedPrimary().metadata);

const REACHED: string[] = [];
let recordsReachedEnd = false;
afterAll(() => {
  expect(recordsReachedEnd, "records must reach its final statement (wb-khhg K09/K09b)").toBe(true);
});
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): JsonValue {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const live = launchInventory(REPO);
    const { rf, composed, unbound } = live;
    const srcFloorMet = live.scans.length >= FLOORS.srcModules;
    // The listing anchor (wb-khhg F1): every file git lists below src/ is one these scans judged, read from the scans' own record.
    const scanned = new Set(live.scans.map(scan => scan.file));
    const unscanned = listedSrc().filter(file => !scanned.has(file));
    expect(srcFloorMet, `src modules walked: ${live.scans.length}`).toBe(true);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(unscanned, `src files git lists that A1 did not scan (${scanned.size} scanned)`).toEqual([]);
    expect({ rf, composed, unbound }, "Pi's rf launches: the provider alone, the detached host's process.execPath the one composed command").toStrictEqual({
      rf: ["src/workbench/providers/reactivefiber.ts:spawn"],
      composed: ["src/workbench/hosts/local-detached.ts:spawn(process.execPath)"],
      unbound: [],
    });
    // Each control's source: read at control.ts here and again at every listed src path below (PATH CONTROLS).
    const sources: Record<string, string> = {
      named: 'import { spawn } from "node:child_process";\nspawn("rf", argv);',
      aliased: 'import { spawn as run } from "node:child_process";\nrun("rf", argv);',
      namespace: 'import * as cp from "node:child_process";\ncp.execFile("rf", argv);',
      defaultImport: 'import cp from "child_process";\ncp.spawnSync("rf", argv);',
      requireDestructured: 'const { execFileSync: run } = require("node:child_process");\nrun("rf", argv);',
      requireWhole: 'const cp = require("child_process");\ncp.fork("rf", argv);',
      requireCall: 'require("node:child_process").spawn("rf", argv);',
      folded: 'import { spawn } from "node:child_process";\nspawn("r" + "f", argv);',
      absolutePath: 'import { spawn } from "node:child_process";\nspawn("/usr/local/bin/rf", argv);',
      otherBinary: 'import { spawn } from "node:child_process";\nspawn("git", argv);',
      composedCommand: 'import { spawn } from "node:child_process";\nspawn(binary, argv);',
      unboundName: 'function spawn(command: string): string { return command; }\nspawn("rf");',
      indirect: 'import * as cp from "node:child_process";\nconst run = cp.spawn;\nrun("rf", argv);',
      elementAccess: 'import * as cp from "node:child_process";\ncp["spawn"]("rf", argv);',
      // wb-khhg F3: the dynamic import (the gate's G20) and the import-equals (G21) forms.
      dynamicImport: 'const cp = await import("node:child_process");\ncp.spawn("rf", argv);',
      dynamicDestructured: 'const { execFile: run } = await import("child_process");\nrun("rf", argv);',
      dynamicDirect: '(await import("node:child_process")).spawnSync("rf", argv);',
      importEquals: 'import cp = require("node:child_process");\ncp.spawn("rf", argv);',
      // U2 (M:17008): TypeScript's transparent load-expression wrappings, pinned independently in the roster.
      ...Object.fromEntries(
        ([
          ["parentheses", (value: string): string => `(${value})`],
          ["await", (value: string): string => `await (${value})`],
          ["as", (value: string): string => `(${value}) as typeof import("node:child_process")`],
          ["satisfies", (value: string): string => `(${value}) satisfies typeof import("node:child_process")`],
          ["nonNull", (value: string): string => `(${value})!`],
          ["angle", (value: string): string => `<typeof import("node:child_process")>(${value})`],
          ["nested", (value: string): string => `((<typeof import("node:child_process")>((${value}) as typeof import("node:child_process")))!) satisfies typeof import("node:child_process")`],
        ] satisfies readonly (readonly [string, (value: string) => string])[]).flatMap(([name, wrapping]) => {
          return ["require(\"node:child_process\")", "await import(\"node:child_process\")"].flatMap((load, index) => {
            const expression = wrapping(load);
            return [
              [`wrap${index}-${name}-whole`, `async function probe() { const cp = ${expression}; cp.spawn("rf", argv); }`],
              [`wrap${index}-${name}-destructured`, `async function probe() { const { spawn: run } = ${expression}; run("rf", argv); }`],
              [`wrap${index}-${name}-direct`, `async function probe() { (${expression}).spawn("rf", argv); }`],
            ];
          });
        }),
      ),
      // R-INDIRECT-LAUNCH: the launcher reached through the callback of the dynamic import's then (the quiet row).
      dynamicThen: 'import("node:child_process").then(cp => cp.spawn("rf", argv));',
      // wb-khhg cut #3: every launcher name through each binding branch, the remaining import, binding and specifier forms the
      // header names, and the command folds; every control is also read at every listed src path (PATH CONTROLS).
      everyLauncherNamed: `import { ${LAUNCHERS.join(", ")} } from "node:child_process";\n${LAUNCHERS.map(launcher => `${launcher}("rf", argv);`).join("\n")}`,
      everyLauncherNamespace: `import * as cp from "node:child_process";\n${LAUNCHERS.map(launcher => `cp.${launcher}("rf", argv);`).join("\n")}`,
      everyLauncherDestructured: `const { ${LAUNCHERS.map((launcher, at) => `${launcher}: run${at}`).join(", ")} } = require("node:child_process");\n${LAUNCHERS.map((_, at) => `run${at}("rf", argv);`).join("\n")}`,
      everyLauncherDirect: LAUNCHERS.map(launcher => `require("node:child_process").${launcher}("rf", argv);`).join("\n"),
      everyLauncherUnbound: LAUNCHERS.map(launcher => `${launcher}("rf", argv);`).join("\n"),
      stringAlias: 'import { "spawn" as run } from "node:child_process";\nrun("rf", argv);',
      defaultAndNamed: 'import cp, { execFile as run } from "child_process";\ncp.fork("rf", argv);\nrun("rf", argv);',
      importEqualsPlain: 'import cp = require("child_process");\ncp.spawnSync("rf", argv);',
      requireShorthand: 'const { spawn } = require("node:child_process");\nspawn("rf", argv);',
      requireStringKey: 'const { "spawnSync": run } = require("child_process");\nrun("rf", argv);',
      dynamicShorthand: 'async function probe() { const { fork } = await import("node:child_process"); fork("rf", argv); }',
      dynamicStringKey: 'async function probe() { const { "execFile": run } = await import("node:child_process"); run("rf", argv); }',
      requireTemplate: "const cp = require(`node:child_process`);\ncp.exec(\"rf\", argv);",
      dynamicTemplate: "async function probe() { const cp = await import(`child_process`); cp.execSync(\"rf\", argv); }",
      templateCommand: 'import { spawn } from "node:child_process";\nspawn(`rf`, argv);',
      parenCommand: 'import { spawn } from "node:child_process";\nspawn(("rf"), argv);',
      templateFold: ['import { spawn } from "node:child_process";\nspawn(`$', '{"r"}f`, argv);'].join(""),
      // R-CALLEE-WRAPPER (the gate's X1): a launcher callee wrapped in parentheses, a comma expression or a non-null assertion is no
      // launch (the quiet rows).
      calleeParen: 'import { spawn } from "node:child_process";\n(spawn)("rf", argv);',
      calleeComma: 'import { spawn } from "node:child_process";\n(0, spawn)("rf", argv);',
      calleeNonNull: 'import { spawn } from "node:child_process";\nspawn!("rf", argv);',
      memberParen: 'import * as cp from "node:child_process";\n(cp.spawn)("rf", argv);',
    };
    const control = (source: string): JsonValue => {
      const scan = launchesOf(CONTROL_FILE, source);
      return { rf: scan.rf.length, composed: scan.composed.length, unbound: scan.unbound.length };
    };
    const controls = Object.fromEntries(Object.entries(sources).map(([name, source]) => [name, control(source)]));
    for (const [name, outcome] of Object.entries(controls)) {
      if (name.startsWith("wrap")) expect(outcome, `U2 load wrapper ${name}`).toStrictEqual({ rf: 1, composed: 0, unbound: 0 });
    }
    // PATH CONTROLS (wb-khhg cut #3): every control at every listed src path, read through launchInventory as the live tree is.
    const lists = (reading: { readonly rf: readonly string[]; readonly composed: readonly string[]; readonly unbound: readonly string[] }): (readonly string[])[] => [reading.rf, reading.composed, reading.unbound];
    const { missed: pathControlsMissed } = pathControls(listedSrc(), sources, launchInventory, lists, source => lists(launchesOf(CONTROL_FILE, source)));
    expect(pathControlsMissed, "A1 controls whose reading at a listed src path differs from their reading at control.ts").toEqual([]);
    return done("A1", { srcFloorMet, listingSound: listingSound(), unscanned, rf, composed, unbound, controls, pathControlsMissed });
  },
  A2: async () => {
    const outcome = await nativeTicks(TICK_INPUTS, [{ stdout: json(fullShapeRf(ROOT)), exit: 0 }]);
    const words = outcome.spawns.flat();
    const noCommit = outcome.spawns.filter(argv => argv.includes("--no-commit")).length;
    const sessionWords = words.filter(word => word.startsWith("--session")).length;
    const commitWords = words.filter(word => word === "--commit").length;
    const sessions = outcome.readings.map(readingSession);
    const { model, task, ticks } = ROSTER.producer;
    const legacy = outcome.spawns[0] ?? [];
    const measuredArgv = argvShape(legacy, ROOT, "m", "t");
    expect(outcome.refusals).toEqual([]);
    expect(outcome.spawns).toHaveLength(TICK_INPUTS.length);
    expect({ noCommit, sessionWords, commitWords }, "every tick spawns the --no-commit preview and no session or commit word").toStrictEqual({ noCommit: TICK_INPUTS.length, sessionWords: 0, commitWords: 0 });
    expect(sessions, "every admitted reading states result.session_id null").toStrictEqual(TICK_INPUTS.map(() => null));
    expect(measuredArgv, `the measured producer ticks (${model}, ${task}) ran Pi's legacy argv`).toStrictEqual([...ticks.preview.argv]);
    // R-SESSION-ECHO: a --no-commit answer stating a session id is admitted all the same (the quiet row of the residual).
    const echoed = json(fullShapeRf(ROOT));
    objectOf(objectOf(echoed, "echo").result, "echo result").session_id = `rfs_${"a".repeat(26)}`;
    const echo = await nativeTicks([{ model: "m", task: "t" }], [{ stdout: echoed, exit: 0 }]);
    const sessionEcho = echo.readings.length === 1 && echo.refusals.length === 0 ? "admitted" : "refused";
    return done("A2", {
      ticks: TICK_INPUTS.length,
      spawns: outcome.spawns.length,
      readings: outcome.readings.length,
      noCommit,
      sessionWords,
      commitWords,
      sessions,
      verbs: outcome.spawns.map(argv => argv.slice(2, 4).join(" ")),
      measuredArgv,
      controls: { sessionEcho },
    });
  },
  A3: async () => {
    const native = rfRoster(await nativeCatalog()).map(rosterRow);
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const injectedRows = rfRoster(injected.catalogSnapshot().map(entry => entry.descriptor)).map(rosterRow);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const preview = { id: PREVIEW_ID, effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE };
    const committing = [...native, ...injectedRows].filter(row => row.effectClass !== "read").map(row => String(row.id));
    const carrierNoCommit = REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit");
    expect(native, "the native rf roster: the read-class --no-commit preview alone").toStrictEqual([preview]);
    expect(injectedRows, "the injected rf roster: the read-class --no-commit preview alone").toStrictEqual([preview]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(committing, "a committing rf capability landed: (a) is owed with it - one pinned --session across committed ticks (wb-hs2j.3, wb-jwc.5)").toEqual([]);
    expect(carrierNoCommit).toBe(true);
    // R-UNLABELED: a registration under neither a reactivefiber: permission nor an rf@ contractSource is not selected.
    const stray: CapabilityDescriptor = {
      id: "rf.context.commit",
      version: "1.0.0",
      description: "a committed rf render",
      inputSchema: {},
      effectClass: "write",
      permissions: ["rf:commit"],
      supportedModes: ["invoke"],
      contractSource: "ReactiveFiberCLI context.render",
    };
    const unlabeled = rfRoster([stray]).length;
    return done("A3", { native, injected: injectedRows, reconcile, committing, carrierNoCommit, controls: { unlabeled } });
  },
  A4: async () => {
    const { ticks, help, zeroMint } = ROSTER.producer;
    const reading = (entry: Ticks): JsonObject => ({
      ticks: entry.sessionIds.length,
      openBefore: entry.openBefore,
      openAfter: entry.openAfter,
      minted: entry.openAfter - entry.openBefore,
      distinctSessions: new Set(entry.sessionIds.filter(id => id !== null)).size,
    });
    const preview = reading(ticks.preview);
    const sessionless = reading(ticks.sessionless);
    const pinned = reading(ticks.pinned);
    const previewNoCommit = ticks.preview.argv.includes("--no-commit") && !ticks.preview.argv.some(word => word.startsWith("--session"));
    const sessionlessCommits = !ticks.sessionless.argv.includes("--no-commit") && !ticks.sessionless.argv.some(word => word.startsWith("--session"));
    const pinnedArgv = ticks.pinned.argv.join(" ").includes("--session <session>") && !ticks.pinned.argv.includes("--no-commit");
    const pinnedReported = ticks.pinned.sessionIds.every(id => id === ticks.pinned.pinned);
    const helpStatesMint = (help.renderSession ?? "").includes("omitted, a committed render creates a new session of its own") && (help.renderSession ?? "").includes("--no-commit persists none");
    const gating = noteLine(readBeadRow().notes, "Gating artifacts: ");
    const beadSaysUnshipped = gating.includes(`zero-session-mint under one --session (${zeroMint.bead}, open`) && gating.includes("Shipped: no.");
    const contractShipped = zeroMint.presentAtPin || zeroMint.presentAtMain;
    expect({ previewNoCommit, sessionlessCommits, pinnedArgv }, "the three measured tick forms").toStrictEqual({ previewNoCommit: true, sessionlessCommits: true, pinnedArgv: true });
    expect(preview.minted, "the --no-commit ticks left the open-session count constant").toBe(0);
    expect(preview.distinctSessions, "a --no-commit tick reports no session").toBe(0);
    expect(sessionless.minted, "each sessionless committed tick minted its own session").toBe(sessionless.ticks);
    expect(sessionless.distinctSessions).toBe(sessionless.ticks);
    expect(pinned.minted, "the ticks under one pinned --session left the open-session count constant").toBe(0);
    expect(pinnedReported, "every pinned tick reported the pinned session id").toBe(true);
    expect(helpStatesMint).toBe(true);
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the zero-mint gate open and unshipped`).toBe(true);
    expect(contractShipped, `${zeroMint.journey} exists: the zero-mint guarantee shipped, arm (a) with the committed loop (wb-hs2j.3)`).toBe(false);
    return done("A4", { preview, sessionless, pinned, pinnedReported, helpStatesMint, beadSaysUnshipped, contractShipped, gate: zeroMint.bead });
  },
  B1: async () => {
    const tree = liveTree();
    const filesFloorMet = tree.walk.files.length >= FLOORS.files;
    // The listing anchor (wb-khhg F1): every file git lists is one the judge read, the bead export and the exempt pair aside, and of
    // the skipped roots git lists files only in the bead export.
    const read = new Set(tree.read);
    const unread = listedJudgeable().filter(file => !read.has(file));
    const listedRoots = new Set(gitListing().map(rootOf));
    const listedSkipped = SKIPPED_ROOTS.filter(root => listedRoots.has(root));
    expect(filesFloorMet, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(unread, `files git lists that B1's judge did not read (${read.size} read)`).toEqual([]);
    expect(listedSkipped, "the skipped roots git lists files in").toStrictEqual(LISTED_UNJUDGED);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ findings: tree.findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "sentences assuming an rf session expires").toStrictEqual({
      findings: [],
      symlinks: [],
      unreadable: [],
    });
    const expiring = "rf sessions expire after 30 minutes of inactivity.";
    const zeroWidth = String.fromCodePoint(0x200b);
    const softHyphen = String.fromCodePoint(0xad);
    const fullwidth = (word: string): string => String.fromCodePoint(...[...word].map(letter => (letter.codePointAt(0) ?? 0) + 0xfee0));
    // Each control's text: judged here and again at every listed judgeable path below (PATH CONTROLS).
    const texts: Record<string, string> = {
      plain: expiring,
      timesOut: "The rf session times out, so the dashboard re-renders without one.",
      camelIdentifier: "const rfSessionTtlMs = 3_600_000;",
      acronymIdentifier: "const RFSessionTTL = 60;",
      autoCloses: "A ReactiveFiber session auto-closes when the tick ends.",
      lapse: "Pi drops the rf session id because sessions lapse overnight.",
      reaped: "reactive-fiber sessions are reaped by the server",
      closedAutomatically: "An rf session is closed automatically when idle.",
      fieldTtl: "the session_id from rf goes stale after its TTL",
      never: "rf sessions never expire; Pi closes the session it opened.",
      noExpiry: "No automatic expiry exists for an rf session.",
      claudeSession: "A Claude SDK session times out after the deadline.",
      renderDeadline: "The rf preview exceeded the execution deadline after a timeout.",
      closeVerb: "rf session close rfs_x",
      separate: "Pi's rf render passes no session; a Claude session may time out.",
      split: "Pi keeps one rf session. It expires after an hour.",
      paraphrase: "The rf session goes away on its own after the dashboard stops.",
      negatedEarlier: "An rf session is not closed by hand, it expires at midnight.",
      utf16: Buffer.from(expiring, "utf16le").toString("utf8"),
      escaped: "rf sessions \\u0065xpire after an hour",
      // wb-khhg F2: the rendered reading - intraword emphasis (the gate's G17), a zero-width split (G18), a soft-hyphen split (G18b)
      // and a compatibility form - and the written reading kept beside it (rawJoin: the rendered reading joins rf and sessions).
      emphasis: "Pi relies on rf sessions that ex**pire** after an hour of inactivity.",
      zeroWidth: `Pi relies on rf sessions that ex${zeroWidth}pire after an hour of inactivity.`,
      softHyphen: `Pi relies on rf sessions that ex${softHyphen}pire after an hour of inactivity.`,
      compatibility: `Pi relies on rf sessions that ${fullwidth("expire")} after an hour of inactivity.`,
      rawJoin: `Pi relies on rf${zeroWidth}sessions that expire after an hour of inactivity.`,
      // wb-khhg cut #3: two more default-ignorable splits (a word joiner, a byte order mark), a single intraword asterisk and a
      // compatibility ligature (U+FB01 in fiber): each read only as rendered.
      wordJoiner: `Pi relies on rf sessions that ex${String.fromCodePoint(0x2060)}pire after an hour of inactivity.`,
      byteOrderMark: `Pi relies on rf sessions that ex${String.fromCodePoint(0xfeff)}pire after an hour of inactivity.`,
      singleEmphasis: "Pi relies on rf sessions that ex*pire* after an hour of inactivity.",
      ligature: `The reactive ${String.fromCodePoint(0xfb01)}ber session expires after an hour of inactivity.`,
      // R-RENDERED: a split the rendered reading keeps (the quiet rows).
      htmlTag: "Pi relies on rf sessions that ex<b>pire</b> after an hour of inactivity.",
      htmlEntity: "Pi relies on rf sessions that ex&shy;pire after an hour of inactivity.",
      codeSpan: "Pi relies on rf sessions that ex`pire` after an hour of inactivity.",
      // R-CONFUSABLE (K07): NFKC is not a confusables skeleton; this quiet row pins that boundary.
      confusable: `Pi relies on rf sessions that ${String.fromCodePoint(0x0435)}xpire after an hour of inactivity.`,
    };
    const controls = Object.fromEntries(Object.entries(texts).map(([name, value]) => [name, asserts(value)]));
    const planted = plantedTree({
      "docs/expiry.md": `${expiring}\n`,
      "src/ttl.ts": "export const rfSessionTtlMs = 3_600_000;\n",
      "test/fixtures/expiry-note.md": `${expiring}\n`,
      "docs/rendered.md": "Pi relies on rf sessions that ex**pire** after an hour of inactivity.\n",
      "notes/never.md": "rf sessions never expire.\n",
      "notes/le.txt": Buffer.from(expiring, "utf16le"),
      "notes/link.md": null,
      "node_modules/pkg/notes.md": `${expiring}\n`,
      ".beads/issues.jsonl": `{"title":"${expiring}"}\n`,
      "dist/notes.md": `${expiring}\n`,
    });
    // PATH CONTROLS (wb-khhg cut #3): every control text, and the vocabulary page, at every listed judgeable path, read through
    // readTree as the live tree is; each path's findings must be the control's own (wb-khhg F2: the misses are path controls').
    const page = vocabularyPage();
    const vocabulary = { sentences: page.sentences, flagged: expiryFindings(page.text).length };
    const paths = listedJudgeable();
    const findingLists = (reading: TreeReading): (readonly string[])[] => [reading.findings];
    const { missed: pathControlsMissed, readings } = pathControls(paths, { ...texts, vocabularyPage: page.text }, readTree, findingLists, text => [expiryFindings(text).map(sentence => `${CONTROL_FILE}: ${sentence}`)]);
    expect(vocabulary.flagged, "every sentence of the vocabulary page is a distinct finding").toBe(vocabulary.sentences);
    expect(pathControlsMissed, `B1 controls and the vocabulary page whose findings at a listed path differ from control.ts's (${paths.length} paths)`).toEqual([]);
    // R-LIVE-ROOT (the gate's GB2; the quiet row): GB2's member - a reading rooted at the checkout drops its .json files' findings -
    // keys on the live reading, which judges the checkout's .json files, and on no path control's reading, each rooted in a scratch
    // mirror: applied to every path control's reading, it changes none.
    const liveRootDrops = (reading: TreeReading): string[] => (reading.root === REPO ? reading.findings.filter(finding => fileOf(finding).endsWith(".json")) : []);
    const liveRoot = {
      liveKeyed: tree.root === REPO && tree.read.some(file => file.endsWith(".json")),
      pathControlsChanged: readings.filter(reading => liveRootDrops(reading).length > 0).length,
    };
    expect(liveRoot, "R-LIVE-ROOT: the member keys on the live reading and on no path control").toStrictEqual({ liveKeyed: true, pathControlsChanged: 0 });
    const flagged = (path: string): boolean => planted.findings.some(finding => finding.startsWith(`${path}: `)) || planted.walk.symlinks.includes(path);
    const plants = Object.fromEntries(
      ["docs/expiry.md", "src/ttl.ts", "test/fixtures/expiry-note.md", "docs/rendered.md", "notes/never.md", "notes/le.txt", "notes/link.md", "node_modules/pkg/notes.md", ".beads/issues.jsonl", "dist/notes.md"].map(path => [path, flagged(path)]),
    );
    return done("B1", { filesFloorMet, listingSound: listingSound(), unread, listedSkipped, pathControlsMissed, vocabulary, liveRoot, anchorsWalked: tree.anchorsWalked, findings: tree.findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable, controls, plants });
  },
  B2: async () => {
    const { modules, unresolved } = readerClosure();
    const live = stateInventory(REPO, modules);
    const { identifiers, literals } = live;
    const closureFloorMet = modules.length >= FLOORS.closure;
    const anchorsRead = [...READER_MODULES, "src/workbench/capability-registry.ts", "src/workbench/redaction.ts"].every(module => modules.includes(module));
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead, "the closure reaches the provider, the adapter, the registry and the redaction module").toBe(true);
    expect(unresolved).toEqual([]);
    // The listing anchor (wb-khhg F1): the modules these scans judged are exactly the closure TypeScript resolves.
    const resolved = resolvedClosure();
    const judged = live.scans.map(scan => scan.file).sort();
    const unscanned = resolved.modules.filter(module => !judged.includes(module));
    expect(resolved.unresolved, "relative imports TypeScript cannot resolve in the closure").toEqual([]);
    expect(judged, "B2 scans exactly the closure TypeScript resolves").toStrictEqual(resolved.modules);
    expect({ identifiers, literals }, "rf session state in the reader closure").toStrictEqual({ identifiers: [], literals: [] });
    // Each control's source: read at control.ts here and again at every resolved closure path below (PATH CONTROLS).
    const sources: Record<string, string> = {
      ttlIdentifier: "const rfSessionTtlMs = 60_000;",
      sessionVariable: "let session: string | undefined;",
      resultField: "const id = result.session_id;",
      flagLiteral: 'const argv = ["--session", id];',
      templateFlag: ["const flag = `--session=$", "{id}`;"].join(""),
      fieldLiteral: 'const key = "session_id";',
      foldedField: 'const key = "sess" + "ion_id";',
      mintedId: 'const id = "rfs_57bmozjjw5glqyhc4xupfdjpe4";',
      secretKeyLiteral: 'const keys = "api[_-]?key|aws_session_token";',
      regexLiteral: "const field = /aws_session_token|session_id/;",
      deadline: "const deadlineMs = 60_000;",
      composedField: 'const head = "session";\nconst key = head + suffix;',
      // wb-khhg cut #3: the remaining identifier and literal forms the header names, each also read at every resolved closure path.
      privateIdentifier: "class Holder { #session = 1; }",
      propertyName: "const holder = { sessionId: 1 };",
      snakeIdentifier: "const rf_session_ttl = 1;",
      templateMiddle: ["const key = `$", "{head}session_id$", "{tail}`;"].join(""),
      templateTail: ["const flag = `$", "{head}--session`;"].join(""),
      templateLiteral: "const key = `session_id`;",
      everyLeafLiteral: `const leaves = [${SESSION_VERBS.map(verb => `"session.${verb}"`).join(", ")}];`,
      nestedFold: 'const key = ("sess" + "ion") + "_id";',
      // Every literal kind crossed with every alternative it can name: the flag, the field, a dotted leaf and an rfs_ id.
      crossString: 'const a = "--session";\nconst b = "session_id";\nconst c = "session.close";\nconst d = "rfs_57bmozjjw5glqyhc4xupfdjpe4";',
      crossTemplateLiteral: "const a = `--session`;\nconst b = `session_id`;\nconst c = `session.close`;\nconst d = `rfs_57bmozjjw5glqyhc4xupfdjpe4`;",
      crossHead: ["const a = `--session$", "{x}`;\nconst b = `session_id$", "{x}`;\nconst c = `session.close$", "{x}`;\nconst d = `rfs_57bm$", "{x}`;"].join(""),
      crossMiddle: ["const a = `$", "{x}--session$", "{y}`;\nconst b = `$", "{x}session_id$", "{y}`;\nconst c = `$", "{x}session.close$", "{y}`;\nconst d = `$", "{x}rfs_57bm$", "{y}`;"].join(""),
      crossTail: ["const a = `$", "{x}--session`;\nconst b = `$", "{x}session_id`;\nconst c = `$", "{x}session.close`;\nconst d = `$", "{x}rfs_57bm`;"].join(""),
      crossFold: 'const a = "--sess" + "ion";\nconst b = "sess" + "ion_id";\nconst c = "session." + "close";\nconst d = "rfs_" + "57bm";',
    };
    const controls = Object.fromEntries(
      Object.entries(sources).map(([name, source]) => {
        const scan = sessionStateOf(CONTROL_FILE, source);
        return [name, scan.identifiers.length + scan.literals.length];
      }),
    );
    // PATH CONTROLS (wb-khhg cut #3): every control at every TypeScript-resolved closure path, read through stateInventory.
    const lists = (reading: { readonly identifiers: readonly string[]; readonly literals: readonly string[] }): (readonly string[])[] => [reading.identifiers, reading.literals];
    const { missed: pathControlsMissed } = pathControls(resolved.modules, sources, root => stateInventory(root, resolved.modules), lists, source => lists(sessionStateOf(CONTROL_FILE, source)));
    expect(pathControlsMissed, "B2 controls whose reading at a resolved closure path differs from their reading at control.ts").toEqual([]);
    return done("B2", { closureFloorMet, anchorsRead, unresolved, unscanned, identifiers, literals, controls, pathControlsMissed });
  },
  B3: async () => {
    const tree = liveTree();
    const exemptWalked = EXEMPT.every(file => tree.walk.files.includes(file) && !tree.judged.includes(file));
    const selfFindings = asserts(textOf(join(REPO, SELF)));
    const rosterFindings = asserts(textOf(join(REPO, ROSTER_FILE)));
    expect({ exemptWalked, selfFindings, rosterFindings }, "each exemption carries real findings, so lifting it reds B1").toStrictEqual({ exemptWalked: true, selfFindings: true, rosterFindings: true });
    return done("B3", { exempt: [...EXEMPT], exemptWalked, selfFindings, rosterFindings });
  },
  C1: async () => {
    const live = verbInventory(REPO);
    const { argv, flags, literals } = live;
    const renderArgvSeen = live.renderArgv.length >= 1;
    const composedArgv = live.composedArgv.length;
    const descriptors = await nativeCatalog();
    const descriptorFloorMet = descriptors.length >= 4;
    const descriptorsRead: string[] = [];
    const descriptorJudge = descriptorJudgeOf(descriptorsRead);
    const descriptorHits = descriptorJudge(descriptors);
    const srcFloorMet = live.scans.length >= FLOORS.srcModules;
    // The listing anchors (wb-khhg F1): every file git lists below src/ is one these scans judged, and every descriptor a second
    // native registration lists is one the descriptor judge read.
    const scanned = new Set(live.scans.map(scan => scan.file));
    const unscanned = listedSrc().filter(file => !scanned.has(file));
    const freshIds = await nativeIdsAfresh();
    const descriptorsUnread = freshIds.filter(id => !descriptorsRead.includes(id));
    expect(srcFloorMet, `src modules walked: ${live.scans.length}`).toBe(true);
    expect(unscanned, `src files git lists that C1 did not scan (${scanned.size} scanned)`).toEqual([]);
    expect(descriptorFloorMet, `native descriptors read: ${descriptors.length}`).toBe(true);
    expect(descriptorsUnread, `native descriptors C1 did not read (${descriptorsRead.length} read)`).toEqual([]);
    expect([...descriptorsRead].sort(), "C1 read exactly the descriptors a second native registration lists").toStrictEqual(freshIds);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(renderArgvSeen, "the reader reads the provider's context render argv").toBe(true);
    expect({ argv, flags, literals, descriptorHits }, "an rf session recovery path needs (c) and (d) with it (wb-hs2j.3)").toStrictEqual({ argv: [], flags: [], literals: [], descriptorHits: [] });
    // Each control's source: read at control.ts here and again at every listed src path below (PATH CONTROLS).
    const sources: Record<string, string> = {
      argvVerb: 'spawn("rf", ["--workspace", w, "session", "show", id, "--json"]);',
      renderFlag: 'spawn("rf", ["--workspace", w, "context", "render", "--session", id, "--json"]);',
      flagEquals: ["const argv = [`--session=$", "{id}`];"].join(""),
      commandText: 'const cmd = "rf session recover --name dashboard";',
      dottedLeaf: 'const leaf = "session.close";',
      nameKeyed: 'spawn("rf", ["session", "open", "--name", name]);',
      bdProse: 'const help = "run bd prime for the session close protocol";',
      claudeField: "const id = message.session_id;",
      previewArgv: 'spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--no-commit", "--no-input", "--json"]);',
      composedArgv: 'const verb = "show";\nspawn("rf", ["session", verb]);',
      // wb-khhg cut #3: every session verb through each verb branch, a template's parts and a template literal spelling a command,
      // and a --session= argv word; each is also read at every listed src path.
      everyVerbArgv: `const argvs = [${SESSION_VERBS.map(verb => `["session", "${verb}"]`).join(", ")}];`,
      everyVerbLeaf: `const leaves = [${SESSION_VERBS.map(verb => `"session.${verb}"`).join(", ")}];`,
      everyVerbCommand: `const commands = [${SESSION_VERBS.map(verb => `"rf session ${verb}"`).join(", ")}];`,
      templateVerb: ["const hint = `rf session $", "{name} recover`;"].join(""),
      templateLiteralVerb: "const cmd = `rf session close`;",
      flagEqualsWord: 'spawn("rf", ["--session=abc"]);',
      // A dotted leaf and the flag in a template literal, a dotted leaf in a template's parts and an argv of template-literal words.
      crossTemplateLiteral: "const a = `session.close`;\nconst b = `--session`;",
      crossTemplateParts: ["const a = `session.close $", "{x}`;"].join(""),
      argvTemplateWords: "const argv = [`session`, `close`];",
    };
    const control = (source: string): JsonValue => {
      const scan = sessionVerbsOf(CONTROL_FILE, source);
      return { hits: scan.argv.length + scan.flags.length + scan.literals.length, composed: scan.composedArgv };
    };
    const controls = Object.fromEntries(Object.entries(sources).map(([name, source]) => [name, control(source)]));
    // PATH CONTROLS (wb-khhg cut #3): every control at every listed src path, read through verbInventory as the live tree is.
    const lists = (reading: VerbLists): (readonly string[])[] => [reading.argv, reading.flags, reading.literals, reading.renderArgv, reading.composedArgv];
    const { missed: pathControlsMissed } = pathControls(listedSrc(), sources, verbInventory, lists, source => lists(verbLists([sessionVerbsOf(CONTROL_FILE, source)])));
    expect(pathControlsMissed, "C1 controls whose reading at a listed src path differs from their reading at control.ts").toEqual([]);
    // Descriptor canaries (wb-khhg U1 K11; cut #3): every session form in every DESCRIPTOR_CANARY_FIELDS field of every listed id,
    // read through the SAME descriptorJudge as the live catalog.
    const sessionForms = [...SESSION_VERBS.map(verb => `session.${verb}`), ...SESSION_VERBS.map(verb => `rf session ${verb}`), "--session"];
    const descriptorCanariesMissed = sessionForms.flatMap(form =>
      DESCRIPTOR_CANARY_FIELDS.flatMap(field => {
        const hits = descriptorJudge(descriptors.map(descriptor => placedIn(descriptor, field, form)));
        return freshIds.filter(id => !hits.includes(id)).map(id => `${id}:${field}:${form}`);
      }),
    );
    expect(descriptorCanariesMissed, "listed descriptor ids whose session form, placed in a field, C1's descriptor judge missed").toEqual([]);
    return done("C1", { srcFloorMet, listingSound: listingSound(), unscanned, descriptorFloorMet, descriptorsUnread, renderArgvSeen, argv, flags, literals, descriptorHits, composedArgv, controls, pathControlsMissed, descriptorCanariesMissed });
  },
  C2: async () => {
    const { leafPaths, sessionLeaves, help, record, duplicateNames } = ROSTER.producer;
    const served = sessionLeaves.filter(leaf => leaf.served).map(leaf => leaf.path);
    const sessionPaths = leafPaths.filter(path => path.startsWith("session."));
    const recoverLeaves = leafPaths.filter(path => /recover|handoff|resume|attach/.test(path));
    const addressedById = help.showSession === "SESSION the session id" && help.closeSession === "SESSION the session id";
    const nameSeparate = (help.openId ?? "").startsWith("--id ID ") && (help.openName ?? "").startsWith("--name NAME ") && record.keys.includes("session_id") && record.keys.includes("name");
    const c6Proposed = ROSTER.merged.heading === "### C6. session recover / handoff (P0)" && ROSTER.merged.line.includes(ROSTER.merged.quote);
    const duplicateNamesUndetermined = duplicateNames.proposition.includes("whether duplicate session NAMES are accepted was not determined");
    const gating = noteLine(readBeadRow().notes, "Gating artifacts: ");
    const beadPinsIdOnly = gating.includes(`Duplicate session NAME acceptance UNDETERMINED (${duplicateNames.id}`) && gating.includes("Pi pins ID-only regardless") && gating.includes("README C6 session recover verb, proposed");
    const recoverShipped = recoverLeaves.length > 0;
    expect(sessionPaths, "the served session leaves at the measured rf").toStrictEqual(served);
    expect({ addressedById, nameSeparate, c6Proposed, duplicateNamesUndetermined, beadPinsIdOnly }).toStrictEqual({
      addressedById: true,
      nameSeparate: true,
      c6Proposed: true,
      duplicateNamesUndetermined: true,
      beadPinsIdOnly: true,
    });
    expect(record.unnamedName, "an unnamed session states its name null").toBeNull();
    expect(recoverShipped, "an rf recover verb shipped: (c) and (d) are owed with the Pi path that uses it (wb-hs2j.3)").toBe(false);
    return done("C2", { sessionLeaves: served, recoverLeaves, addressedById, nameSeparate, unnamedName: record.unnamedName, c6Proposed, duplicateNamesUndetermined, beadPinsIdOnly, recoverShipped });
  },
  D1: async () => {
    const { commitExit, noCommitExit, noCommitCode } = ROSTER.producer.closedRefusal;
    // The stand-in would answer a second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeTicks([{ model: "m", task: "t" }], [{ stdout: json(CLOSED), exit: commitExit }, { stdout: json(fullShapeRf(ROOT)), exit: 0 }]);
    const refusal = outcome.refusals[0] ?? null;
    const valuesNamed = closedValues().filter(value => refusal?.message.includes(value) === true);
    expect(closedPrimary().code).toBe(CLOSED_CODE);
    expect({ commitExit, noCommitExit, noCommitCode }, "the measured closed-session refusal, committed and --no-commit").toStrictEqual({ commitExit: 4, noCommitExit: 4, noCommitCode: CLOSED_CODE });
    expect(refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${CLOSED_CODE}` });
    expect(valuesNamed).toEqual([]);
    expect(outcome.readings).toEqual([]);
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    return done("D1", { refusal, valuesNamed, readings: outcome.readings.length, spawns: outcome.spawns.length });
  },
  D2: async () => {
    const before = JSON.stringify(CLOSED);
    const handed = envelopeOf(JSON.parse(before), "handed");
    let calls = 0;
    const registry = new CapabilityRegistry();
    registerReactiveFiberRender(
      registry,
      async () => {
        calls += 1;
        return handed;
      },
      FIXTURE_ROOT,
    );
    const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
    const source = objectOf(objectOf(reading, "reading").source, "reading source");
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    const verbatim = JSON.stringify(source) === before;
    expect(verbatim, "the reading's source serializes to the roster envelope's pre-invocation bytes").toBe(true);
    expect(primary.code).toBe(CLOSED_CODE);
    expect(calls).toBe(1);
    return done("D2", { code: String(primary.code), metadata: json(primary.metadata), readingKeys: Object.keys(objectOf(reading, "reading")).sort(), contract: String(objectOf(reading, "reading").contract), calls, verbatim });
  },
  D3: async () => {
    const reading = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(CLOSED) };
    const topology = reactivefiberTopology(reading, OBSERVER_CONTEXT);
    const snapshot = topology.snapshots[0];
    const shown = stringLeaves(json(topology));
    const primary = closedPrimary();
    const surfaced = shown.filter(value => [...closedValues(), String(primary.message), String(primary.hint)].some(withheld => value.includes(withheld)));
    const statusShowsCode = snapshot?.node.statusText.includes(CLOSED_CODE) === true;
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined;
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(statusShowsCode, "the projected status names the closed-session code").toBe(true);
    expect(carriesValue, "a closed-session refusal projects no output digest and no graph revision").toBe(false);
    expect(surfaced, "the refusal's message, hint and metadata stay withheld").toEqual([]);
    return done("D3", { snapshots: topology.snapshots.length, statusTone: snapshot?.node.statusTone ?? null, statusShowsCode, carriesValue, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], surfaced });
  },
};

/** A describe title: the row id and its label. */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("workbench-rf-session-lifecycle-census.test.ts judged-set A1-A4 B1-B3 C1-C2 D1-D3 records: captured rf lifecycle and absent-today readers", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:2", "D:3"]);
    // The records case cannot see its own skip (wb-khhg F4): this case, which runs first, reads its registration.
    const registered: { readonly name: string; readonly mode: string; readonly fails: boolean }[] = [];
    const collect = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true });
        else if (child.type === "suite") collect(child.tasks);
      }
    };
    collect(task.file.tasks);
    expect(registered.at(-1), "the records case is registered last, in run mode and not inverted").toStrictEqual({ name: ROSTER.tests.at(-1), mode: "run", fails: false });
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        sessionWords: SESSION_WORDS,
        rfWords: RF_WORDS,
        expiryWords: EXPIRY_WORDS,
        expiryPairs: EXPIRY_PAIRS,
        autoWords: AUTO_WORDS,
        endWords: END_WORDS,
        negators: NEGATORS,
        windows: WINDOWS,
        sentenceBreak: `${SENTENCE_BREAK.source}/${SENTENCE_BREAK.flags}`,
        sessionVerbs: SESSION_VERBS,
        sessionVerbText: `${SESSION_VERB_TEXT.source}/${SESSION_VERB_TEXT.flags}`,
        sessionFlagText: `${SESSION_FLAG_TEXT.source}/${SESSION_FLAG_TEXT.flags}`,
        sessionFieldText: `${SESSION_FIELD_TEXT.source}/${SESSION_FIELD_TEXT.flags}`,
        launchers: LAUNCHERS,
        childProcess: `${CHILD_PROCESS.source}/${CHILD_PROCESS.flags}`,
        skippedRoots: SKIPPED_ROOTS,
        exempt: EXEMPT,
        floors: FLOORS,
        gitListing: GIT_LISTING,
        listedUnjudged: LISTED_UNJUDGED,
        defaultIgnorable: `${DEFAULT_IGNORABLE.source}/${DEFAULT_IGNORABLE.flags}`,
        intrawordEmphasis: `${INTRAWORD_EMPHASIS.source}/${INTRAWORD_EMPHASIS.flags}`,
        walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
        readerModules: READER_MODULES,
        descriptorCanaryFields: DESCRIPTOR_CANARY_FIELDS,
        fixtureRoot: FIXTURE_ROOT,
        closedCode: CLOSED_CODE,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const source = /^Source: ReactiveFiberCLI (\S+) '(.+?)' Merged \(([^)]+)\) (\S+) '(.+)'$/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a) through (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    // A clause opens its row's label, followed by the label's colon, so a filing clause that is shortened or reworded reds too.
    const coverage = clauses.map(clause => ROWS.filter(row => clause.length > 0 && row.label.startsWith(`${clause}:`)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause opens exactly one row label, followed by its colon").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"], ["D"]]);
    expect({ citation: source?.[1], quote: source?.[2], mergedId: source?.[3], mergedCitation: source?.[4], mergedQuote: source?.[5] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedId: ROSTER.merged.id,
      mergedCitation: ROSTER.merged.citation,
      mergedQuote: ROSTER.merged.quote,
    });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(ROSTER.merged.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the merged citation pins the same sha").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and every registered title reads quiet to the B1 judge", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
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
    expect([...suites, ...titles].filter(asserts), "registered titles B1's judge would flag").toEqual([]);
    recordsReachedEnd = true;
  });
});
