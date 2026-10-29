/**
 * wb-tnz5.5 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R6), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * drives or relays rf renders and publications over federated receipts (gated FW-CFRR-04b, rfc-bak67.11 and rfc-bak67.14: not
 * shipped at the pin), it shall treat RF_FEDERATION_PIN_CHANGED as an exit-4-class refusal after which no publication is
 * recorded, echo the producer's pin witness (r1) and pinnedReceiptIdentity verbatim, and never re-tag output computed at an older
 * pinned receipt as a newer one (F(old) as F(new)) nor label it fresh." (certified-federated-reactive-refinement-2026-10-18/
 * BEADS-2026-10-21.md:46@6a251bf73af5). Acceptance: "(a) an rf commit returning RF_FEDERATION_PIN_CHANGED is a non-success
 * refusal carrying the code verbatim; no Pi surface records a publication for it and Pi reconciles, never blind-retries
 * (wb-jwc.5); (b) Pi echoes the pin witness (r1) verbatim, never the newer receipt identity; (c) a publication pinned at r1
 * arriving after r2's acceptance renders r1-pinned (or aborts), never r2; no Pi path rewrites pinnedReceiptIdentity or adds a
 * fresh label."
 *
 * THE PRODUCER CONTRACT AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read with read-only git show): BEADS-2026-10-21.md:46
 * (rfc-bak67.14) "begin render at r1; accept r2; commit -> refusal code RF_FEDERATION_PIN_CHANGED (exit 4 class); the manifest
 * count is unchanged"; 02-concrete-contract-and-verification-gates.md:18 "FederatedPublication=(pinnedReceiptIdentity,
 * outputStatus,outputDigestOrValue,publishTransaction,visibleEvidence)", :20 "it must never retag F(old) as F(new)", :29 "on
 * completion publish with *that* receipt identity. If policy forbids older output, abort/retry rather than silently labeling old
 * output fresh", :37 "the publication must name r1 or visibly abort. Never name r2 with output calculated from r1".
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-23; its installed package read
 * read-only): no file spells RF_FEDERATION_PIN_CHANGED, pinnedReceiptIdentity or FederatedPublication (no RF_FEDERATION literal at
 * all), so the code is unshipped there too. rf's exit 4 is its conflict and currentness class; the shipped row nearest this
 * refusal is RF_DEFINITION_CHANGED_DURING_RENDER (domain/diagnostics.py:2283: exit 4, family TXN, hint required, metadata the
 * LXDXDOC-A5 five record_type, record_id, expected_revision, current_revision, refresh_command; diagnostics.py:1386-1387 "no
 * automatic retry ever applies to them"), built by application/render.py:1539 _changed_diagnostic (refresh_command "rf status --json",
 * source "host"). rf's envelope states transaction_id iff a transaction committed (cli/output.py:589), so a commit refusal that
 * changed nothing carries null and a committed render an rft_ id.
 * THE FIXTURE (test/fixtures/rf-federation-pin-changed-roster.json) is CONSTRUCTED, never measured, since no rf emits the code:
 * `pinChanged` is a context.render failure envelope (ok false, result null, transaction_id null) whose one error diagnostic
 * carries the code in that analogue's shape, the pin witness r1 as expected_revision and the newer accepted receipt r2 as
 * current_revision; `publication` is the r1-pinned record with the five fields spelled as 02-concrete:18 states them (the result
 * key it rides under, federated_publication, is this census's choice: rf has no wire spelling at the pin). Two envelopes carry it,
 * both built from the full-shape fixture: a COMMITTED render (transaction_id, render_id and commit_seq stated, ephemeral false),
 * the publication itself, and the noncommitted preview Pi does relay, as the relay probe.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). It spawns only `rf ... context
 * render ... --no-commit --no-input --json`, maps every RF_ failure envelope to the typed refusal unavailable "RF render refused:
 * <code>" and admits only the noncommitted preview shape, so Pi drives and relays no rf publication today: the statement's
 * trigger has not fired. The census pins that absence and every surface the obligation already reaches:
 *  A, the trigger, absent today. A1 an AST scan of every src module: the one rf render argv carries --no-commit, the one rf launch
 *    is the provider's, no literal spells an uncommitted render or a commit-time flag, with controls. A launch is a call of a
 *    launcher - a bare child_process name, a child_process import alias, a variable bound or destructured to a launcher, or a
 *    member or element call such as childProcess.spawn, pi.exec or cp["spawn"] - whose program literal is rf or a path to it
 *    (/usr/local/bin/rf, C:\tools\rf.exe; wb-s4j3 F3), a shell string whose first word is one included, its callee, its program
 *    and a launcher's binding each read through parentheses and type and non-null assertions (wb-29wk F1: spawn("rf" as string,
 *    argv), (spawn as typeof spawn)("rf", argv), const run = spawn as typeof spawn); an argv is read through inline spreads,
 *    literal .concat chains, type and non-null assertions, and every later push that completes a declared array literal in its
 *    scope (wb-s4j3 F3) - a literal a declaration binds to a name: a variable's initializer, a parameter's default or the
 *    default of a binding element in a declaration's or a parameter's destructuring pattern (function f(w, argv = [...]),
 *    const { argv = [...] } = opts, const [argv = [...]] = lists; a parameter's scope, its pattern's included, is its function;
 *    wb-shnw F1): a .push or ["push"] call, its callee and receiver read through the same wrappers, made on the literal's name
 *    ((argv as string[]).push, argv!.push) or on a name declared to that name in its scope after it (const same = argv, let and
 *    var too, a wrapped initializer, an alias of an alias; wb-29wk F1; a parameter's or a binding element's default too:
 *    function f(argv = [...], same = argv), const { same = argv } = opts; wb-shnw F1), never a push made or an alias declared
 *    before the literal's declaration nor a push after its scope ends (wb-shnw F4: earlierPush, earlierAlias and laterPush, each
 *    a quiet control); a render is a "context" word with a later "render" word (flags may sit between), and a '+' chain of
 *    string literals is read as one text (wb-w1g3 F1(iv): G15, G17); A2 a
 *    stand-in rf on PATH sees --no-commit on both
 *    input arms; A3 the rf roster stays the read preview: native and injected registrations selected by id, permission or an rf
 *    contractSource (rf@ release or the reactive-fiber.cli schema), never the id prefix alone (wb-w1g3 F1(iv): G14), and by reach
 *    (wb-s4j3 F2): the rf provider's two registrations are read whole, unfiltered, each the preview alone, and every src reference
 *    to the function enclosing src's rf launch (nativeReactiveFiberRender) is pinned - the preview registration's invoke and the
 *    legacy nativeReactiveFiberPreview wrapper, which no src module references - so a capability carrying no rf marker that drives
 *    the launcher shows; the carrier contractSource, RECONCILE_EVIDENCE_READS.reactivefiber at src/workflow/reconcile.ts:67; A4 no
 *    src or qa file spells the pin-change vocabulary, read raw and with its escape sequences and line continuations decoded
 *    (wb-w1g3 F2: G18; wb-s4j3 F4), floors and anchors per root.
 *  B, acceptance (a). B1 the fixture: the code, the analogue's metadata keys, r1 at expected_revision, r2 at current_revision, exit
 *    4 and the unshipped status ride the roster; B2 the native typed refusal at exit 4 names the code verbatim, one spawn, no
 *    reading; B3 it is held to a nonzero exit (exit 0 is a contradiction, exit 7 reads as exit 4); B4 a stand-in that would answer
 *    a second spawn with a live render is never re-spawned; B5 the adapter's projection is a failure carrying no value, under its
 *    pinned title; B6 the injected reading relays the envelope byte for byte, judged against an envelope that shares no object with
 *    the answer the seam relays, so an in-place relay edit shows (wb-w1g3 F1(i): G08, G21; the alias check has its own control);
 *    B7 a test-only committing stand-in (non-read effect class, its own permission, Pi's own reader behind it) surfaces
 *    uncertain-effect naming the code and the reconcile directive; B8 a workflow run of it journals a dispatched marker and a
 *    settled row with no value, and its resume refuses to re-run it (0 spawns); B9 a workflow run of the read preview journals a
 *    failed read with no value.
 *  C, acceptance (b). C1 the relayed reading carries r1 at expected_revision and r2 only at current_revision, both verbatim (the
 *    same independent compare as B6); C2 the native typed refusal and C3 the adapter's surfaced strings name neither receipt.
 *  D, acceptance (c). D1 the native reader aborts the committed r1-pinned publication; D2 the adapter refuses a reading carrying
 *    it; D3 the noncommitted relay probe comes back byte for byte through both seams, pinnedReceiptIdentity r1, r2 nowhere, the
 *    reading keyed exactly contract, source, workspaceRoot; D4 no reader surface these rows reach (both projections, the typed
 *    refusal, both aborts, every part a relayed reading adds outside its source and every key or string a relay adds inside it,
 *    the host root spelled <root>) carries a freshness word, read raw and with its identifier joints opened (wb-s4j3 F1:
 *    fresh_output, isFresh, rendered_live_now), nothing is added inside a relayed source, the quiet control reads the
 *    seam label the probe projection surfaces (never a hard-coded copy), and the projection of the relay probe names neither
 *    receipt.
 *  M, the vocabulary matcher A4 reads, raw and decoded: M1-M17 the spellings it catches (an escape inside the code per decoder
 *    branch, the partial PIN_CHANGED token and the two forms the landed Q1 and Q3 rows held among them, wb-w1g3 F2: G18, G19; M16
 *    and M17 a line continuation inside the code, LF and CRLF, wb-s4j3 F4), Q1-Q3 the quiet rows of its named residuals.
 *  L, the freshness matcher D4 reads, raw and with identifier joints opened (wb-w1g3 F1(ii): inflections and synonyms, G11, G12;
 *    wb-s4j3 F1: joined identifiers): L1-L12 the spellings it catches beside D4's five base controls, L13-L17 a family word joined
 *    into an identifier, one per joint (L13 and L15 a snake underscore, L14 a camel hump, L16 an acronym's end, L17 a letter-digit
 *    seam), L18 the capitalised inflection only the raw reading keeps, LQ1-LQ4 the quiet rows of its named residuals.
 *  N, the receipt-naming matcher C2, C3, D1 and D4 read (wb-w1g3 F1(iii)): a receipt is named in full or by the first 8 hex digits
 *    of its digest, bare or prefixed (G13), the record id and the producer message by their full text; N1-N5 the texts it names,
 *    each a positive control (X-NAMED, X-NAMED1), NQ1-NQ2 its quiet rows.
 *  H, the witness guard every pin's case runs under (wb-s4j3 F5): a case that reads a roster witness is refused, and so is a case
 *    handing back an object the roster holds; H1 its positive controls, HQ1 the quiet row of its named residual.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the code, exit, gating artifacts, conflict keys, publication fields, spellings, residuals, the
 * registered test titles and each pin's own assertion count - is held to the out-of-file roster, whose envelopes, receipts and
 * analogue facts anchor the cases outside this file. Outside both files (wb-w1g3 F3), wb-tnz5.5's row in the tracker export
 * (.beads/issues.jsonl) anchors the acceptance rows and the landed residuals; it is read through two append-only paragraphs only,
 * never the whole notes (a ledger hop exports every appended note): the owner filing (paragraphs 1-2: the full statement the
 * roster quotes and the Acceptance line whose clause tags (a), (b), (c) are exactly the tags rows B to D carry) and the delivered
 * note's RESIDUALS paragraph (every residual it names is named here with its quiet pins judged). The last case reads the vitest
 * task tree: every registered test, in roster order, in run mode, not inverted, ran before it, and every pin reached its witness
 * compare after its own pinned number of assertions (wb-w1g3 F3: X-EACH, X-THIRD), having handed back its own reading, never a
 * roster witness (wb-s4j3 F5: row H).
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the typed refusal and the projection carry the code but withhold the
 *   witness, so r1 rides only the relayed reading (quiet rows C2, C3); R-EXIT-UNREAD Pi reads rf's exit as zero or nonzero only, so
 *   an exit-4 and an exit-7 refusal read alike and no surface names the class (quiet row B3); R-RESUME-REREAD a resume re-runs a
 *   failed READ node live (runtime.ts replays only an ok read), one fresh noncommitted read, while the committing stand-in refuses
 *   (quiet row B9; B8); R-RECORD-UNREAD the adapter never reads a stated publication record, so the relay probe projects on the
 *   noncommitted render's own tone and names no pin (quiet row D4); R-INTERRUPTED (Q1, U+200B inside the PIN_CHANGED token),
 *   R-HOMOGLYPH (Q2, U+0435 for one letter) and R-COMPOSED (Q3, the code joined from parts that split the PIN_CHANGED token; a
 *   two-literal join keeping it whole is read, M14) escape A4's text matcher - B2 and C1 hold the runtime spelling, so a table
 *   built that way that rewrote the code reds them; R-COMPOSED-ARGV a render argv or shell string built from non-literal parts is
 *   invisible to A1 (its composed control is caught, the real count stays 0; A2 holds the runtime argv); R-WRAPPED-LAUNCH an rf
 *   launch through a callee A1 cannot bind (a wrapper taking the program as a parameter, a program name held in a constant) is not
 *   counted as a launch (quiet rows: A1's wrappedLaunch and constantProgram controls; their literal argv is still read, and A3
 *   holds every registered capability); R-FRESH-PARAPHRASE a freshness claim worded outside every family (quiet row LQ1), R-FRESH-HOMOGLYPH (LQ2) and
 *   R-FRESH-INTERRUPTED (LQ3) a homoglyph letter or an invisible split hiding a family word, escape the freshness matcher;
 *   R-SHORT-PREFIX a receipt abbreviated below 8 hex digits is not read as naming it (quiet row NQ2); R-FRESH-RUNON a freshness
 *   word run into another word with no joint (isfresh) escapes the freshness matcher (quiet row LQ4); R-RELAYED-REACH an rf
 *   capability A3 binds by neither marker nor reach - one relaying the read preview through the registry, or one reaching the
 *   launcher through a name assembled at runtime - is not selected (quiet rows: A3's registryRelay and assembledName controls);
 *   R-MUTATED-ARGV a render argv completed by a mutation other than a push in its declaring scope (unshift, splice, an index write,
 *   a reassignment) is read as its declared literal alone (quiet rows: A1's unshiftArgv control and its element twin
 *   elementUnshift, argv["unshift"](...), wb-shnw F4); R-INDIRECT-PUSH a push reached
 *   other than as a .push or ["push"] call on the literal's name, a wrapper of it or a variable declared to it - through
 *   Array.prototype.push.call or .apply, Reflect.apply, a helper the argv is passed to, or an alias made by assignment rather than
 *   by a declaration - is not folded, so the argv is read as its declared literal alone (quiet row: A1's indirectPush control,
 *   wb-29wk F1); its members also include, each named with a pinned quiet row (wb-shnw F2, F3), an alias declared to an
 *   expression other than the bare name read through wrappers - among them a comma (const same = (0, argv)), a conditional
 *   (flag ? argv : argv) and a nullish expression (argv ?? []) - a name destructured from a literal holding the argv or the
 *   literal itself (const [same] = [argv], const { argv } = { argv: [...] }), a literal bound by an assignment rather than by a
 *   declaration (let argv; argv = [...], and an assignment pattern's default, ({ argv = [...] } = opts)), a member receiver
 *   (const box = { argv }; box.argv.push(...)) and a bound push (argv.push.bind(argv)(...)) (quiet rows: A1's commaAlias,
 *   conditionalAlias, nullishAlias, arrayPatternAlias, objectPatternLiteral, assignedLiteral, assignmentPatternDefault,
 *   memberReceiver and boundPush controls); R-VACUOUS-PAYLOAD a case that
 *   makes its pinned number of assertions on values it never measured and returns a deep copy of its witness, read from the
 *   roster's rows directly or written out as a literal, keeps its reached count and passes the witness guard (quiet row HQ1).
 * NOT CLAIMED: a coordinated edit of this file and the roster that drops a residual the landed note did not name or re-maps a
 * residual to other quiet pins, that drops a control together with its entry in the pin's roster witness (A1's wb-29wk and
 * wb-shnw controls among them), or that rewrites a pin's assertion count: the tracker export anchors only the eight residuals
 * the landed note named and the clause tags of rows B to D; nor an edit of the per-pin wrapper's own guard lines.
 * SCOPE: the code, metadata shape and record fields are producer facts at the pin; Pi vendors no rf schema, so a producer-side
 * change is seen only when the roster is re-read. The armed half (a committing capability with --idempotency-key and rf operation
 * show reconciliation) is owner-reserved under wb-jwc.5: no committing capability, argv or reader is added here, and the committing
 * stand-in is test-only.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa and the tracker export are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type InvocationContext, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  nativeReactiveFiberRender,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federation-pin-changed-roster.json");
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANTS = ["reactivefiber:render"];
const LEGACY_INPUT: JsonObject = { model: "m", task: "t" };
const VIEW_INPUT: JsonObject = { view: "orders.view", taskId: "t1" };

/** The refusal the statement names (rfc-bak67.14) and the exit class it rides in. */
const PIN_CHANGED = "RF_FEDERATION_PIN_CHANGED";
const PIN_EXIT = 4;
/** The statement's gating artifacts (bead wb-tnz5.5 title). */
const GATING_ARTIFACTS = ["FW-CFRR-04b", "rfc-bak67.11", "rfc-bak67.14"];
/** LXDXDOC-A5: the metadata every rf exit-4 conflict or currentness row carries, in the producer's order. */
const CONFLICT_KEYS = ["record_type", "record_id", "expected_revision", "current_revision", "refresh_command"];
/** 02-concrete-contract-and-verification-gates.md:18: the FederatedPublication fields as the contract spells them. */
const PUBLICATION_FIELDS = ["pinnedReceiptIdentity", "outputStatus", "outputDigestOrValue", "publishTransaction", "visibleEvidence"];
/** The result key the constructed record rides under (this census's choice: rf has no wire spelling at the pin). */
const PUBLICATION_KEY = "federated_publication";
/** The constructed committed render's identity (rf's rfr_ render and rft_ transaction prefixes; values made up). */
const COMMITTED_RENDER_ID = "rfr_pinnedpublicationfixture0a";
/** The test-only stand-in for a future committing rf capability (wb-jwc.5: a non-read effect class, a permission of its own). */
const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
/** The vocabulary a Pi path that branched on, carried or rewrote the pinned receipt would have to spell; the partial PIN_CHANGED
 * token (a branch on the code's suffix, wb-w1g3 F2: G19) is a member, in any case and separator (pin_changed, onPinChanged). */
const PIN_VOCABULARY = /RF_FEDERATION_PIN_CHANGED|pin[\s_.-]*changed|pinned[\s_.-]*receipt[\s_.-]*identit(?:y|ies)|federat(?:ed|ion)[\s_.-]*publications?/i;
/** The freshness words a surface would need to label old output as new (02-concrete:29 "silently labeling old output fresh"): the
 * base words and their inflections and synonyms (wb-w1g3 F1(ii): freshly, refreshed, currently, live, new, newer, recent, renewed). */
const FRESH_LABEL =
  /\b(?:(?:re)?fresh(?:ly|er|est|ness|ed|ing)?|current(?:ly)?|latest|(?:re)?new(?:ly|er|est|ed)?|up[\s_-]*to[\s_-]*date|live|real[\s_-]*time|recent(?:ly)?)\b/i;
/** A receipt counts as named by its full identity or by the first RECEIPT_PREFIX_HEX hex digits of its digest, bare or after its
 * sha256: prefix, in any case (wb-w1g3 F1(iii): an abbreviated receipt names it, G13). */
const RECEIPT_PREFIX_HEX = 8;
/** rf's commit-time argv words: a committing render would pass one; the noncommitted preview passes neither. */
const COMMIT_FLAGS = ["--idempotency-key", "--strict"];
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The modules whose named imports bind a launcher under another local name (import { spawn as run }). */
const CHILD_PROCESS = ["child_process", "node:child_process"];
/** A program literal naming rf: the bare program or a path whose last segment is rf (rf.exe included, wb-s4j3 F3), or a shell command
 * whose first word is one. */
const RF_PROGRAM = /^\s*(?:\S*[\\/])?rf(?:\.exe)?(?:\s|$)/;
/** A literal spelling an rf render: `context` then `render`, flag words allowed between (wb-w1g3 F1(iv): interleaved argv). */
const SPACED_RENDER = /\bcontext(?:\s+--?[A-Za-z][\w-]*(?:=\S*)?)*\s+render\b/;
/** rf's CLI schema family: a contractSource naming it (or an rf@ release) states an rf-driving capability, whatever its id. */
const RF_CLI_SCHEMA_FAMILY = "reactive-fiber.cli/";
/** The bead this census answers and its row in the tracker export, read through two append-only paragraphs only (header). */
const BEAD = "wb-tnz5.5";
const TRACKER_EXPORT = join(REPO, ".beads", "issues.jsonl");
const DELIVERED_RESIDUALS_HEAD = "RESIDUALS (each a named family with a pinned quiet row):";
/** The residuals wb-tnz5.5's delivered note named (2026-10-23T00:59:53Z), in its order: each stays named in RESIDUALS. */
const DELIVERED_RESIDUALS = ["R-WITHHELD", "R-EXIT-UNREAD", "R-RESUME-REREAD", "R-RECORD-UNREAD", "R-INTERRUPTED", "R-HOMOGLYPH", "R-COMPOSED", "R-COMPOSED-ARGV"];
/** Every named residual and the judged pins that hold its pinned quiet row. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-WITHHELD": ["C2", "C3"],
  "R-EXIT-UNREAD": ["B3"],
  "R-RESUME-REREAD": ["B9"],
  "R-RECORD-UNREAD": ["D4"],
  "R-INTERRUPTED": ["Q1"],
  "R-HOMOGLYPH": ["Q2"],
  "R-COMPOSED": ["Q3"],
  "R-COMPOSED-ARGV": ["A1"],
  "R-WRAPPED-LAUNCH": ["A1"],
  "R-FRESH-PARAPHRASE": ["LQ1"],
  "R-FRESH-HOMOGLYPH": ["LQ2"],
  "R-FRESH-INTERRUPTED": ["LQ3"],
  "R-SHORT-PREFIX": ["NQ2"],
  "R-FRESH-RUNON": ["LQ4"],
  "R-RELAYED-REACH": ["A3"],
  "R-MUTATED-ARGV": ["A1"],
  "R-INDIRECT-PUSH": ["A1"],
  "R-VACUOUS-PAYLOAD": ["HQ1"],
};
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster and the cases agree";
const REGISTRATION_TITLE = "the registered tests and the reached pins equal the roster, in order and both ways";
const HEAD = 'export const meta = { name: "federation-pin-changed", description: "wb-tnz5.5 census probe" };\n';

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, absent today) Pi drives and relays no rf publication: src's one rf render argv and one rf launch are the noncommitted preview, both input arms spawn --no-commit, the rf roster stays the read preview alone, and no src or qa file spells the pin-change vocabulary",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(a) an exit-4 RF_FEDERATION_PIN_CHANGED refusal is a non-success refusal carrying the code verbatim, no Pi surface records a publication for it, and Pi never blind-retries it: one spawn, and a non-read committing stand-in surfaces uncertain-effect whose resume reconciles",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  },
  {
    id: "C",
    label: "(b) Pi echoes the pin witness (r1) verbatim and never the newer receipt identity: the relayed reading carries r1 at expected_revision byte for byte, and the typed refusal and the projection name neither receipt",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(c) a publication pinned at r1 arriving after r2's acceptance is never relayed as r2 or labelled fresh: a committed publication aborts at both readers, the relay probe keeps pinnedReceiptIdentity byte for byte, and no reader surface carries a freshness word",
    pins: ["D1", "D2", "D3", "D4"],
  },
  {
    id: "M",
    label: "the pin-change vocabulary matcher A4 reads, raw and with escape sequences and line continuations decoded: the spellings it catches (M1-M17) and the pinned quiet rows of its named residuals (Q1 R-INTERRUPTED, Q2 R-HOMOGLYPH, Q3 R-COMPOSED)",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", "M13", "M14", "M15", "M16", "M17", "Q1", "Q2", "Q3"],
  },
  {
    id: "L",
    label: "the freshness matcher D4 reads, raw and with identifier joints opened: the inflections and synonyms it catches (L1-L12), the joined spellings it opens (L13-L17), the capitalised inflection only its raw reading keeps (L18), and the pinned quiet rows of its named residuals (LQ1 R-FRESH-PARAPHRASE, LQ2 R-FRESH-HOMOGLYPH, LQ3 R-FRESH-INTERRUPTED, LQ4 R-FRESH-RUNON)",
    pins: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18", "LQ1", "LQ2", "LQ3", "LQ4"],
  },
  {
    id: "N",
    label: "the receipt-naming matcher C2, C3, D1 and D4 read: a receipt named in full or by an 8-hex prefix of its digest, the record id and the producer message (N1-N5, each a positive control) and the pinned quiet rows (NQ1 a digest that is no receipt, NQ2 R-SHORT-PREFIX)",
    pins: ["N1", "N2", "N3", "N4", "N5", "NQ1", "NQ2"],
  },
  {
    id: "H",
    label: "the witness guard every pin's case runs under: a case reading a roster witness, or handing back an object the roster holds, is refused (H1, the guard's positive controls), and the pinned quiet row of its named residual (HQ1 R-VACUOUS-PAYLOAD)",
    pins: ["H1", "HQ1"],
  },
];

interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** Row M: what the vocabulary matcher catches, raw or decoded, and the three named escapes it does not. M9-M12 escape a character
 * INSIDE the token, so only the decoded reading catches them (one per decoder branch); M13 is G19's suffix branch; M14 and M15 are
 * the forms the landed Q3 and Q1 rows held, now read through the PIN_CHANGED token, so their residuals' quiet rows split it. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: PIN_CHANGED, hit: true },
  { pin: "M2", text: PIN_CHANGED.toLowerCase(), hit: true },
  { pin: "M3", text: "pinnedReceiptIdentity", hit: true },
  { pin: "M4", text: "pinned_receipt_identity", hit: true },
  { pin: "M5", text: "the pinned receipt identities", hit: true },
  { pin: "M6", text: "FederatedPublication", hit: true },
  { pin: "M7", text: "federated_publication", hit: true },
  { pin: "M8", text: "a federation publication", hit: true },
  { pin: "M9", text: 'export const CODE = "RF_FEDERATION_PIN\\u005fCHANGED";', hit: true },
  { pin: "M10", text: 'export const CODE = "RF_FEDERATION_PIN\\u{5f}CHANGED";', hit: true },
  { pin: "M11", text: 'export const CODE = "RF_FEDERATION_PIN\\x5fCHANGED";', hit: true },
  { pin: "M12", text: 'export const CODE = "RF_FEDERATION_PIN\\_CHANGED";', hit: true },
  { pin: "M13", text: 'if (primary.code.endsWith("_PIN_CHANGED")) return;', hit: true },
  { pin: "M14", text: 'const code = "RF_FEDERATION_" + "PIN_CHANGED";', hit: true },
  { pin: "M15", text: `RF_FEDERATION${String.fromCodePoint(0x200b)}_PIN_CHANGED`, hit: true },
  { pin: "M16", text: 'export const CODE = "RF_FEDERATION_PIN_\\\nCHANGED";', hit: true },
  { pin: "M17", text: 'export const CODE = "RF_FEDERATION_PIN_\\\r\nCHANGED";', hit: true },
  { pin: "Q1", text: `RF_FEDERATION_PIN${String.fromCodePoint(0x200b)}_CHANGED`, hit: false },
  { pin: "Q2", text: `pinn${String.fromCodePoint(0x0435)}dReceiptIdentity`, hit: false },
  { pin: "Q3", text: 'const code = ["RF", "FEDERATION", "PIN", "CHANGED"].join("_");', hit: false },
];
/** Row L: the freshness inflections and synonyms the matcher catches beside D4's five base controls, and the three named escapes
 * it does not (L1 is G11's note, L4 G12's seam label). */
const FRESH_SPELLINGS: readonly Spelling[] = [
  { pin: "L1", text: "freshly rendered at the accepted receipt", hit: true },
  { pin: "L2", text: "the refreshed render", hit: true },
  { pin: "L3", text: "currently pinned output", hit: true },
  { pin: "L4", text: "live preview (rf-cli)", hit: true },
  { pin: "L5", text: "a real-time render", hit: true },
  { pin: "L6", text: "new output", hit: true },
  { pin: "L7", text: "a newer receipt was accepted", hit: true },
  { pin: "L8", text: "newly published", hit: true },
  { pin: "L9", text: "the renewed preview", hit: true },
  { pin: "L10", text: "a recent render", hit: true },
  { pin: "L11", text: "recently rendered", hit: true },
  { pin: "L12", text: "freshness", hit: true },
  { pin: "L13", text: "fresh_output", hit: true },
  { pin: "L14", text: "isFresh", hit: true },
  { pin: "L15", text: "rendered_live_now", hit: true },
  { pin: "L16", text: "LIVEPreview", hit: true },
  { pin: "L17", text: "fresh2render", hit: true },
  { pin: "L18", text: "the NEWest receipt", hit: true },
  { pin: "LQ1", text: "rendered as of now", hit: false },
  { pin: "LQ2", text: `fr${String.fromCodePoint(0x0435)}sh output`, hit: false },
  { pin: "LQ3", text: `fre${String.fromCodePoint(0x200b)}sh output`, hit: false },
  { pin: "LQ4", text: "isfresh", hit: false },
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
interface Analogue {
  readonly code: string;
  readonly exit: number;
  readonly family: string;
  readonly hintRequired: boolean;
  readonly metadataKeys: readonly string[];
  readonly refreshCommand: string;
  readonly source: string;
}
interface Roster {
  /** The bead's full statement, quoted by the tracker export's first notes paragraph. */
  readonly statement: string;
  readonly rfVersion: string;
  readonly code: string;
  readonly codeShippedAtInstalledRf: boolean;
  readonly pinExit: number;
  readonly gatingArtifacts: readonly string[];
  readonly conflictKeys: readonly string[];
  readonly publicationFields: readonly string[];
  readonly analogue: Analogue;
  readonly receipts: { readonly pinned: string; readonly accepted: string };
  readonly pinChanged: JsonObject;
  readonly publication: JsonObject;
  readonly rows: readonly RosterRow[];
  /** Every registered test title of this file, in registration order (wb-w1g3 F3). */
  readonly tests: readonly string[];
  /** Each pin as `<pin>:<its own assertion count>`, in run order (wb-w1g3 F3). */
  readonly reached: readonly string[];
  /** Every named residual and the judged pins holding its quiet row. */
  readonly residuals: Readonly<Record<string, readonly string[]>>;
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
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.analogue) || !isObject(raw.receipts)) {
    throw new Error("roster must be an object with rows, analogue and receipts");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const { analogue, receipts } = raw;
  if (typeof raw.pinExit !== "number" || typeof analogue.exit !== "number" || typeof raw.codeShippedAtInstalledRf !== "boolean" || typeof analogue.hintRequired !== "boolean") {
    throw new Error("roster needs a numeric pinExit and analogue exit and boolean shipped and hintRequired flags");
  }
  if (!isObject(raw.residuals)) throw new Error("roster residuals must be an object of pin lists");
  const residuals: Record<string, readonly string[]> = {};
  for (const [name, pins] of Object.entries(raw.residuals)) residuals[name] = strings(pins, `residuals.${name}`);
  return {
    statement: text(raw.statement, "statement"),
    rfVersion: text(raw.rfVersion, "rfVersion"),
    code: text(raw.code, "code"),
    codeShippedAtInstalledRf: raw.codeShippedAtInstalledRf,
    pinExit: raw.pinExit,
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    conflictKeys: strings(raw.conflictKeys, "conflictKeys"),
    publicationFields: strings(raw.publicationFields, "publicationFields"),
    analogue: {
      code: text(analogue.code, "analogue.code"), exit: analogue.exit, family: text(analogue.family, "analogue.family"),
      hintRequired: analogue.hintRequired, metadataKeys: strings(analogue.metadataKeys, "analogue.metadataKeys"),
      refreshCommand: text(analogue.refreshCommand, "analogue.refreshCommand"), source: text(analogue.source, "analogue.source"),
    },
    receipts: { pinned: text(receipts.pinned, "receipts.pinned"), accepted: text(receipts.accepted, "receipts.accepted") },
    pinChanged: objectOf(json(raw.pinChanged), "roster pinChanged"),
    publication: objectOf(json(raw.publication), "roster publication"),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
    residuals,
  };
}

const ROSTER = readRoster();
const R1 = ROSTER.receipts.pinned;
const R2 = ROSTER.receipts.accepted;

/** The pin whose case is running, while it runs (wb-s4j3 F5): a case measures its witness, so rosterWitness refuses a read from
 * inside one. */
let runningCase: string | null = null;
function rosterWitness(pin: string): JsonValue {
  if (runningCase !== null) throw new Error(`${runningCase}'s case read the roster witness of ${pin}: a case measures its witness, never reads it`);
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** A pin's witness object as the roster holds it, read from its rows directly (row H's controls): never a case's own reading. */
function heldWitness(pin: string): JsonValue {
  return ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin)?.witness ?? null;
}

/** The roster's refusal envelope with its workspace at this run's root, the root the native reader and the adapter read under. */
function pinChanged(): JsonObject {
  const envelope = objectOf(json(ROSTER.pinChanged), "pinChanged");
  const workspace = objectOf(envelope.workspace, "pinChanged workspace");
  return { ...envelope, workspace: { id: workspace.id ?? null, root: ROOT } };
}
/** The full-shape noncommitted preview with the r1-pinned record stated in its result: the relay probe. */
function pinnedPreview(): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "full-shape fixture");
  const result = objectOf(envelope.result, "full-shape result");
  return { ...envelope, result: { ...result, [PUBLICATION_KEY]: json(ROSTER.publication) } };
}
/** The committed render that publishes the r1-pinned record: the commit fields a durable render states, then the record. */
function committedPublication(): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "full-shape fixture");
  const result = objectOf(envelope.result, "full-shape result");
  const work = objectOf(result.work, "full-shape work");
  const transaction = ROSTER.publication.publishTransaction ?? null;
  return {
    ...envelope,
    transaction_id: transaction,
    result: {
      ...result, work: { ...work, storage_write_count: 1 }, render_id: COMMITTED_RENDER_ID, ephemeral: false, commit_seq: 1,
      plan: { operations: [], would_commit: true }, [PUBLICATION_KEY]: json(ROSTER.publication),
    },
  };
}

function primaryOf(envelope: JsonObject): JsonObject {
  return objectOf(Array.isArray(envelope.diagnostics) ? envelope.diagnostics[0] : undefined, "diagnostics[0]");
}
function metadataOf(envelope: JsonObject): JsonObject {
  return objectOf(primaryOf(envelope).metadata, "diagnostics[0].metadata");
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
interface Named {
  readonly namesPinned: boolean;
  readonly namesAccepted: boolean;
  readonly namesRecord: boolean;
  readonly namesMessage: boolean;
}
/** A receipt's shortest naming form: the first RECEIPT_PREFIX_HEX hex digits of its digest (after `sha256:`), lower case. */
function receiptPrefix(receipt: string): string {
  const digest = receipt.slice(receipt.indexOf(":") + 1);
  return digest.slice(0, RECEIPT_PREFIX_HEX).toLowerCase();
}
/** Whether a text names a receipt: in full, or abbreviated to at least its digest's first RECEIPT_PREFIX_HEX hex digits, bare or
 * after sha256:, in any case (the full identity carries that prefix too). */
function namesReceipt(item: string, receipt: string): boolean {
  return item.toLowerCase().includes(receiptPrefix(receipt));
}
/** Which of the two receipts, the refusal's record id and its producer message a set of surfaced strings names. */
function namedIn(texts: readonly string[]): Named {
  const primary = primaryOf(ROSTER.pinChanged);
  const record = String(metadataOf(ROSTER.pinChanged).record_id);
  const message = String(primary.message);
  return {
    namesPinned: texts.some(item => namesReceipt(item, R1)), namesAccepted: texts.some(item => namesReceipt(item, R2)),
    namesRecord: texts.some(item => item.includes(record)), namesMessage: texts.some(item => item.includes(message)),
  };
}
interface Naming {
  readonly pin: string;
  readonly text: string;
  readonly named: Named;
}
const NAMES_NOTHING: Named = { namesPinned: false, namesAccepted: false, namesRecord: false, namesMessage: false };
/** Row N: the receipt-naming matcher's positive controls (N2 is G13's abbreviated title form) and its quiet rows. */
const NAMINGS: readonly Naming[] = [
  { pin: "N1", text: R1, named: { ...NAMES_NOTHING, namesPinned: true } },
  { pin: "N2", text: `RF context preview rfo_pinchangedrefusalfixture0a @${R2.slice(0, "sha256:".length + 12)}`, named: { ...NAMES_NOTHING, namesAccepted: true } },
  { pin: "N3", text: `receipt ${receiptPrefix(R2).toUpperCase()}`, named: { ...NAMES_NOTHING, namesAccepted: true } },
  { pin: "N4", text: `record ${String(metadataOf(ROSTER.pinChanged).record_id)}`, named: { ...NAMES_NOTHING, namesRecord: true } },
  { pin: "N5", text: String(primaryOf(ROSTER.pinChanged).message), named: { namesPinned: true, namesAccepted: true, namesRecord: true, namesMessage: true } },
  { pin: "NQ1", text: String(ROSTER.publication.outputDigestOrValue), named: NAMES_NOTHING },
  { pin: "NQ2", text: `@${R2.slice(0, "sha256:".length + RECEIPT_PREFIX_HEX - 2)}`, named: NAMES_NOTHING },
];
/** A text with every code point outside printable ASCII spelled <U+XXXX>, so a witness never carries an invisible. */
function printable(value: string): string {
  return [...value].map(char => {
    const point = char.codePointAt(0) ?? 0;
    return point >= 0x20 && point <= 0x7e ? char : `<U+${point.toString(16).toUpperCase().padStart(4, "0")}>`;
  }).join("");
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing. */
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

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface Answer {
  readonly body: JsonValue;
  readonly exit: number;
}
/**
 * A stand-in `rf` first on PATH. Spawn k prints answers[min(k, last)].body and exits with its exit code; every spawn appends its
 * argv as one JSON line to the returned log.
 */
function standInRf(answers: readonly Answer[]): string {
  const folder = makeScratch("rf-federation-pin-changed-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      "const seen = fs.existsSync(log) ? fs.readFileSync(log, \"utf8\").split(\"\\n\").filter(Boolean).length : 0;",
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${JSON.stringify(answers)};`,
      "const answer = answers[Math.min(seen, answers.length - 1)];",
      "process.stdout.write(JSON.stringify(answer.body));",
      "process.exit(answer.exit);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
/** A spawn's argv after `--workspace <root>`, which every Pi rf spawn leads with. */
function argvTail(argv: readonly string[] | undefined): string[] {
  expect(argv?.slice(0, 2)).toStrictEqual(["--workspace", ROOT]);
  return (argv ?? []).slice(2);
}

interface Refusal {
  readonly category: string;
  readonly message: string;
}
function contextOf(grants: readonly string[]): InvocationContext {
  return { grants: [...grants], signal: new AbortController().signal };
}
function refusalOf(error: unknown): Refusal {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function refusalFrom(call: Promise<JsonValue>): Promise<Refusal> {
  return refusalOf(await call.then(() => undefined, (caught: unknown) => caught));
}
function refusalOfCall(call: () => unknown): Refusal {
  try {
    call();
  } catch (error) {
    return refusalOf(error);
  }
  throw new Error("expected the call to refuse");
}

interface NativeOutcome {
  readonly refusal: Refusal | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
function previewRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  return registry;
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against a stand-in rf. */
async function nativeOutcome(answers: readonly Answer[], input: JsonValue = LEGACY_INPUT): Promise<NativeOutcome> {
  const log = standInRf(answers);
  let reading: JsonValue | null = null;
  let refusal: Refusal | null = null;
  try {
    reading = await previewRegistry().invoke(PREVIEW_ID, input, contextOf(PREVIEW_GRANTS));
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

/** The envelope type the injected-reader seam (registerReactiveFiberRender) is declared with. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
/** One envelope rebuilt field by field in the seam's declared shape, refused by name when it cannot ride the seam. Every nested
 * value is a fresh copy, so the answer the seam relays shares no object with the envelope a case judges it against: a relay that
 * edited the answer in place would otherwise edit the expected bytes too (wb-w1g3 F1(i): G08, G21). */
function injectable(envelope: JsonObject): InjectedEnvelope {
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = envelope;
  const place = isObject(workspace) ? workspace : undefined;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string" ||
    place === undefined || typeof place.id !== "string" || typeof place.root !== "string" || transactionId !== null ||
    result === undefined || !Array.isArray(diagnostics)) {
    throw new Error("the injected seam carries a strict rf envelope with a workspace and a null transaction_id");
  }
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: place.id, root: place.root }, transaction_id: null, result: json(result),
    diagnostics: diagnostics.map(item => json(item)),
  };
}
/** Whether two values share any object or array by identity: an alias through which an in-place edit of one changes the other. */
function sharesObject(left: unknown, right: unknown): boolean {
  const held = new Set<object>();
  const collect = (value: unknown): void => {
    if (value === null || typeof value !== "object" || held.has(value)) return;
    held.add(value);
    for (const item of Object.values(value)) collect(item);
  };
  collect(right);
  const reaches = (value: unknown): boolean =>
    value !== null && typeof value === "object" && (held.has(value) || Object.values(value).some(reaches));
  return reaches(left);
}
/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`, and whether the
 * answer it relayed shared an object with `envelope`. */
async function injectedReading(envelope: JsonObject): Promise<{ reading: JsonValue; calls: number; answerAliased: boolean }> {
  const answer = injectable(envelope);
  const answerAliased = sharesObject(answer, envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return answer;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, LEGACY_INPUT, contextOf(PREVIEW_GRANTS));
  return { reading, calls, answerAliased };
}
function sourceOf(reading: JsonValue | null): JsonObject {
  return objectOf(objectOf(reading ?? undefined, "reading").source, "reading source");
}
/** The parts of a reading Pi itself adds: every key and string outside the relayed source and the host-bound workspace root. */
function piAddedParts(reading: JsonValue | null): string[] {
  return Object.entries(objectOf(reading ?? undefined, "reading"))
    .filter(([key]) => key !== "source" && key !== "workspaceRoot")
    .flatMap(([key, value]) => [key, ...stringLeaves(value)]);
}
/** Texts with this run's workspace root spelled <root>, so a directory name can never read as a label. */
function rootless(texts: readonly string[]): string[] {
  return texts.map(item => item.split(ROOT).join("<root>"));
}
/** Every key and string a JSON value holds, keys included. */
function partsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(partsOf);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...partsOf(item)]);
  return [];
}
/** The keys and strings a relayed reading's source holds beyond the producer's envelope (counted as a multiset): what a relay added
 * INSIDE the source, where G21's in-place freshness label rides (wb-w1g3 F1(i)). */
function sourceAddedParts(reading: JsonValue | null, envelope: JsonObject): string[] {
  const remaining = new Map<string, number>();
  for (const part of partsOf(envelope)) remaining.set(part, (remaining.get(part) ?? 0) + 1);
  return partsOf(sourceOf(reading)).filter(part => {
    const left = remaining.get(part) ?? 0;
    remaining.set(part, left - 1);
    return left <= 0;
  });
}

/** The committing stand-in's input: the legacy arm only (test-only, never registered by src). */
const COMMIT_INPUT = { type: "object", properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } }, required: ["model", "task"], additionalProperties: false };
/**
 * The test-only stand-in for a future committing rf capability (wb-jwc.5's posture: a non-read effect class and a permission of
 * its own); src registers no such capability. Its provider reaches the stand-in rf through Pi's own nativeReactiveFiberRender, so
 * the refusal it surfaces is Pi's real reader mapping and only the effect class is stood in (Pi has no committing argv).
 */
function commitRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      id: COMMIT_ID, version: "1.0.0", description: "Test-only stand-in for a future committing rf render (wb-jwc.5); src registers none",
      inputSchema: COMMIT_INPUT, effectClass: "write", permissions: [COMMIT_PERMISSION], supportedModes: ["invoke"],
    },
    invoke: async (input, context) => {
      const fields = objectOf(input, "commit input");
      return nativeReactiveFiberRender({ model: String(fields.model), task: String(fields.task) }, ROOT, context.signal);
    },
  });
  return registry;
}

const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census scripts call node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
function nodeRows(entries: readonly WorkflowJournalEntry[]): JsonValue {
  return entries.filter(entry => entry.kind === "node").map(entry => ({
    dispatched: entry.dispatched === true, effectClass: entry.effectClass ?? null, ok: entry.ok, recordsValue: entry.text !== undefined,
  }));
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
function previewReading(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
/** The adapter's projection of a reading and every string it surfaces. */
function projectionOf(source: JsonValue): { topology: ReturnType<typeof reactivefiberTopology>; shown: string[] } {
  const topology = reactivefiberTopology(previewReading(source), OBSERVER_CONTEXT);
  return { topology, shown: stringLeaves(json(topology)) };
}

let nativeIds: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeIds;
}

interface RfScan {
  readonly renderSites: string[];
  readonly uncommitted: string[];
  readonly uncommittedLiterals: string[];
  readonly commitFlags: string[];
  readonly rfLaunches: string[];
  readonly composedArgv: number;
}
/** The local names a module binds to a launcher, read in source order: the bare LAUNCHERS, a named child_process import under
 * another name (import { spawn as run }), a variable bound to a launcher or a launcher member (const run = spawn, const run =
 * cp.spawn), its initializer read through parentheses and type and non-null assertions (const run = spawn as typeof spawn;
 * wb-29wk F1), and a destructured launcher (const { spawn: run } = childProcess). */
function launcherNames(file: ts.SourceFile): Set<string> {
  const names = new Set<string>(LAUNCHERS);
  const isLauncher = (expression: ts.Expression): boolean => {
    const node = unwrapped(expression);
    return (ts.isIdentifier(node) && names.has(node.text)) || (ts.isPropertyAccessExpression(node) && LAUNCHERS.includes(node.name.text));
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS.includes(node.moduleSpecifier.text)) {
      const bindings = node.importClause?.namedBindings;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) if (LAUNCHERS.includes((element.propertyName ?? element.name).text)) names.add(element.name.text);
      }
    }
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      if (ts.isIdentifier(node.name) && isLauncher(node.initializer)) names.add(node.name.text);
      if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          const key = element.propertyName ?? element.name;
          if (ts.isIdentifier(key) && LAUNCHERS.includes(key.text) && ts.isIdentifier(element.name)) names.add(element.name.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return names;
}
/** Whether a call launches rf: its callee is a launcher - a bound name, or a member such as childProcess.spawn, pi.exec or
 * cp["spawn"] - and its program literal names rf (a shell command whose first word is rf included); the callee and the program
 * are each read through parentheses and type and non-null assertions ((spawn as typeof spawn)("rf", argv), spawn("rf" as string,
 * argv); wb-29wk F1). */
function launchesRf(call: ts.CallExpression, launchers: ReadonlySet<string>): boolean {
  const callee = unwrapped(call.expression);
  const launcher = (ts.isIdentifier(callee) && launchers.has(callee.text)) ||
    (ts.isPropertyAccessExpression(callee) && LAUNCHERS.includes(callee.name.text)) ||
    (ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression) && LAUNCHERS.includes(callee.argumentExpression.text));
  const argument = call.arguments[0];
  const program = argument === undefined ? undefined : unwrapped(argument);
  return launcher && program !== undefined && ts.isStringLiteralLike(program) && RF_PROGRAM.test(program.text);
}
/** Whether a node wraps an expression the argv reading sees through: parentheses, a type assertion (as, satisfies, <T>) or a
 * non-null assertion (wb-s4j3 F3). */
function isWrapper(node: ts.Node): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.TypeAssertion | ts.NonNullExpression {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node);
}
/** The expression inside every wrapper isWrapper sees through (wb-29wk F1): a push call's callee and receiver, an alias's
 * initializer, a launcher binding's initializer, and a launch's callee and program are each read through it. */
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (isWrapper(at)) at = at.expression;
  return at;
}
/** The receiver of a `.concat(...)` call, or undefined when the node is none. */
function concatReceiver(node: ts.Node): ts.Expression | undefined {
  return ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "concat" ? node.expression.expression : undefined;
}
/** The words of an argv expression: a string literal by its text, an inline array spread and a literal .concat chain flattened, any
 * other part null (composed); undefined when the expression is no argv. */
function argvWords(node: ts.Expression): (string | null)[] | undefined {
  if (isWrapper(node)) return argvWords(node.expression);
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.flatMap(element => {
      if (ts.isSpreadElement(element)) return argvWords(element.expression) ?? [null];
      return [ts.isStringLiteralLike(element) ? element.text : null];
    });
  }
  const receiver = concatReceiver(node);
  if (receiver === undefined || !ts.isCallExpression(node)) return undefined;
  const head = argvWords(receiver);
  if (head === undefined) return undefined;
  return [...head, ...node.arguments.flatMap(argument => argvWords(argument) ?? [ts.isStringLiteralLike(argument) ? argument.text : null])];
}
/** Whether an argv expression is part of a larger one (an inline spread, or a .concat receiver or argument), so it is read there. */
function insideArgv(node: ts.Node): boolean {
  let at: ts.Node = node;
  while (isWrapper(at.parent)) at = at.parent;
  const parent = at.parent;
  if (ts.isSpreadElement(parent) && ts.isArrayLiteralExpression(parent.parent)) return true;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === at && ts.isCallExpression(parent.parent) && concatReceiver(parent.parent) !== undefined) {
    return argvWords(parent.parent) !== undefined;
  }
  if (ts.isCallExpression(parent) && concatReceiver(parent) !== undefined && parent.arguments.some(argument => argument === at)) return argvWords(parent) !== undefined;
  return false;
}
/** The literal texts of a '+' chain, or undefined when any part is not a string literal. */
function plusLiterals(node: ts.Expression): string[] | undefined {
  if (isWrapper(node)) return plusLiterals(node.expression);
  if (ts.isStringLiteralLike(node)) return [node.text];
  if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return undefined;
  const left = plusLiterals(node.left);
  const right = plusLiterals(node.right);
  return left === undefined || right === undefined ? undefined : [...left, ...right];
}
/** The block, module block or source file a declaration's name is visible in. */
function scopeOf(node: ts.Node): ts.Node {
  let at: ts.Node = node;
  while (!(ts.isBlock(at) || ts.isModuleBlock(at) || ts.isSourceFile(at)) && at.parent !== undefined) at = at.parent;
  return at;
}
/** A declaration pushFolded reads (wb-shnw F1): a variable, a parameter, or a binding element of a destructuring pattern in either,
 * its name bound to its initializer - for a parameter or a binding element, its default. */
type Declaration = ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement;
function isDeclaration(node: ts.Node): node is Declaration {
  return ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node);
}
/** The node a declared name is visible in (wb-shnw F1): a parameter's function, for the parameter and for every binding element of
 * its pattern; otherwise the block, module block or source file around the declaration. */
function declarationScope(node: Declaration): ts.Node {
  let at: ts.Node = node;
  while (ts.isBindingElement(at) || ts.isObjectBindingPattern(at) || ts.isArrayBindingPattern(at)) at = at.parent;
  return ts.isParameter(at) ? at.parent : scopeOf(at);
}
/** The name a push call is made on (wb-29wk F1): a `.push(...)` or `["push"](...)` call, its callee and its receiver each read
 * through parentheses and type and non-null assertions ((argv as string[]).push, argv!.push, (argv.push)(...)), when the receiver
 * is a bare name; undefined for any other call (Array.prototype.push.call(argv, ...) among them: R-INDIRECT-PUSH). */
function pushReceiver(call: ts.CallExpression): string | undefined {
  const callee = unwrapped(call.expression);
  let receiver: ts.Expression | undefined;
  if (ts.isPropertyAccessExpression(callee) && callee.name.text === "push") receiver = callee.expression;
  if (ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression) && callee.argumentExpression.text === "push") receiver = callee.expression;
  if (receiver === undefined) return undefined;
  const name = unwrapped(receiver);
  return ts.isIdentifier(name) ? name.text : undefined;
}
/** The argvs a push completes (wb-s4j3 F3; wb-29wk F1; wb-shnw F1): each array literal a declaration binds to a local name - a
 * variable's initializer, a parameter's default or a destructuring binding element's default, in a declaration or a parameter, read
 * through wrappers - followed by the words of every later push call on it in the declaring scope (a parameter's, its pattern's
 * included, is its function), in source order - a pushReceiver call on the name, or on a name a later declaration of the same kinds
 * binds to it in that scope (its initializer or default the name, read through wrappers: const same = argv, let and var too,
 * function f(argv = [...], same = argv), const { same = argv } = opts; an alias of an alias the same way), each alias's pushes read
 * in its own scope after its declaration; a pushed part that is no string literal reads null (composed). Any other mutation
 * (unshift, splice, an index write, a reassignment) is not folded: R-MUTATED-ARGV; nor is a push reached any other way (push.call,
 * .apply or a bound push, Reflect.apply, a member receiver, a helper the argv is passed to, an alias made by assignment, an alias
 * declared to any expression other than the name (a comma, conditional or nullish one among them), a name destructured from a
 * literal holding the argv or the literal itself, a literal bound by an assignment or by an assignment pattern's default):
 * R-INDIRECT-PUSH. */
function pushFolded(file: ts.SourceFile): Map<ts.Node, (string | null)[]> {
  const declared: { readonly name: string; readonly scope: ts.Node; readonly end: number; readonly literal: ts.ArrayLiteralExpression }[] = [];
  const aliases: { readonly name: string; readonly target: string; readonly scope: ts.Node; readonly start: number; readonly end: number }[] = [];
  const pushes: { readonly name: string; readonly call: ts.CallExpression }[] = [];
  const visit = (node: ts.Node): void => {
    if (isDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const literal = unwrapped(node.initializer);
      const scope = declarationScope(node);
      if (ts.isArrayLiteralExpression(literal)) declared.push({ name: node.name.text, scope, end: node.end, literal });
      if (ts.isIdentifier(literal)) aliases.push({ name: node.name.text, target: literal.text, scope, start: node.getStart(), end: node.end });
    }
    if (ts.isCallExpression(node)) {
      const receiver = pushReceiver(node);
      if (receiver !== undefined) pushes.push({ name: receiver, call: node });
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  const folded = new Map<ts.Node, (string | null)[]>();
  for (const { name, scope, end, literal } of declared) {
    // The names the literal is reached by, in source order: its own, then every name a declaration - a variable, a parameter
    // default or a destructuring default - binds to one of them in that name's scope after its declaration (wb-29wk F1; wb-shnw F1).
    const handles: { readonly name: string; readonly scope: ts.Node; readonly end: number }[] = [{ name, scope, end }];
    for (const alias of aliases) {
      if (handles.some(handle => handle.name === alias.target && alias.start >= handle.end && alias.end <= handle.scope.end)) handles.push(alias);
    }
    const later = pushes.filter(push => handles.some(handle => push.name === handle.name && push.call.getStart() >= handle.end && push.call.end <= handle.scope.end));
    const head = argvWords(literal);
    if (later.length === 0 || head === undefined) continue;
    const pushed = later.flatMap(({ call }) => call.arguments.flatMap(argument =>
      ts.isSpreadElement(argument) ? (argvWords(argument.expression) ?? [null]) : [ts.isStringLiteralLike(argument) ? argument.text : null]));
    folded.set(literal, [...head, ...pushed]);
  }
  return folded;
}
function isPlus(node: ts.Node): boolean {
  return ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
}
/** One module's rf commit paths: argv expressions with a "context" word and a later "render" word (and whether each passes
 * --no-commit), string, template and folded '+' literals spelling `context render` without --no-commit, commit-time flags, and rf
 * launches (wb-w1g3 F1(iv): member, aliased and shell-string launchers; spread, concat and flag-interleaved argv). */
function scanRf(fileName: string, source: string): RfScan {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const launchers = launcherNames(file);
  const folded = pushFolded(file);
  const scan: RfScan = { renderSites: [], uncommitted: [], uncommittedLiterals: [], commitFlags: [], rfLaunches: [], composedArgv: 0 };
  let composed = 0;
  const readArgv = (words: readonly (string | null)[]): void => {
    const groups = words.flatMap((word, index) => (word === "context" ? [index] : []));
    if (groups.some(index => words.slice(index + 1).includes("render"))) {
      scan.renderSites.push(fileName);
      if (!words.includes("--no-commit")) scan.uncommitted.push(`${fileName}: [${words.map(item => item ?? "<expr>").join(", ")}]`);
    } else if (groups.some(index => words.slice(index + 1).includes(null))) composed += 1;
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isArrayLiteralExpression(node) || ts.isCallExpression(node)) && !insideArgv(node)) {
      const words = folded.get(node) ?? argvWords(node);
      if (words !== undefined) readArgv(words);
    }
    if (ts.isStringLiteralLike(node)) {
      if (SPACED_RENDER.test(node.text) && !node.text.includes("--no-commit")) scan.uncommittedLiterals.push(`${fileName}: ${node.text}`);
      if (COMMIT_FLAGS.some(flag => node.text === flag || node.text.startsWith(`${flag}=`))) scan.commitFlags.push(`${fileName}: ${node.text}`);
    }
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (SPACED_RENDER.test(parts) && !parts.includes("--no-commit")) scan.uncommittedLiterals.push(`${fileName}: ${parts}`);
    }
    // An outermost '+' chain of literals reads as one text, where no single part spells the render by itself (read above).
    if (ts.isBinaryExpression(node) && isPlus(node) && !isPlus(node.parent)) {
      const parts = plusLiterals(node);
      const folded = parts?.join("") ?? "";
      if (parts !== undefined && SPACED_RENDER.test(folded) && !folded.includes("--no-commit") && !parts.some(part => SPACED_RENDER.test(part))) {
        scan.uncommittedLiterals.push(`${fileName}: ${folded}`);
      }
    }
    if (ts.isCallExpression(node) && launchesRf(node, launchers)) scan.rfLaunches.push(fileName);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { ...scan, composedArgv: composed };
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The roots a Pi path carrying the pin vocabulary could live in; each floor sits below the count measured at base 98acfaf (src
 * 115 .ts modules among its files, qa 67 files), so an emptied walk reds and an additive change does not. */
const VOCABULARY_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "workbench/providers/reactivefiber.ts", anchorToken: "RF render refused" },
  { root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
/** A text with its JavaScript and JSON escape sequences decoded - \u{...}, \uXXXX, \xXX, a line continuation (a backslash before a
 * line break - LF, CRLF, CR, U+2028 or U+2029 - which a string literal drops, wb-s4j3 F4) and an identity escape such as \_ - so an
 * escaped spelling reads as the value a runtime builds from it (wb-w1g3 F2: G18); an escaped backslash stays one backslash. */
function decodeEscapes(value: string): string {
  return value.replace(/\\(?:u\{([0-9a-fA-F]{1,6})\}|u([0-9a-fA-F]{4})|x([0-9a-fA-F]{2})|(\r\n|[\r\n\u2028\u2029])|([^0-9A-Za-z\r\n]))/g, (whole: string, ...groups: unknown[]) => {
    const [braced, unicode, hex, continuation, identity] = groups.slice(0, 5).map(group => (typeof group === "string" ? group : undefined));
    if (continuation !== undefined) return "";
    if (identity !== undefined) return identity;
    const point = Number.parseInt(braced ?? unicode ?? hex ?? "", 16);
    return Number.isInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : whole;
  });
}
/** The vocabulary reading A4 and row M share: a text spells the pin-change vocabulary raw or with its escapes decoded. */
function vocabularyHit(value: string): boolean {
  return PIN_VOCABULARY.test(value) || PIN_VOCABULARY.test(decodeEscapes(value));
}
/** A text with its identifier joints opened into word breaks (wb-s4j3 F1): a snake underscore, a camel hump (a lower-case letter or a
 * digit before a capital), an acronym's end (a capital run before a capitalised word, LIVEPreview) and a letter-digit seam, so a
 * freshness word joined into an identifier (fresh_output, isFresh, rendered_live_now) reads as a word. A word run into another with no
 * joint (isfresh) stays one word: R-FRESH-RUNON. */
function identifierWords(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/([a-z0-9])(?=[A-Z])/g, "$1 ")
    .replace(/([A-Z])(?=[A-Z][a-z])/g, "$1 ")
    .replace(/([A-Za-z])(?=[0-9])|([0-9])(?=[A-Za-z])/g, "$1$2 ");
}
/** The freshness reading D4 and row L share: a text carries a freshness word raw, or with its identifier joints opened. The raw
 * reading stays beside it, since opening an acronym's end splits a capitalised inflection (NEWest reads "NE West", L18). */
function freshLabelled(value: string): boolean {
  return FRESH_LABEL.test(value) || FRESH_LABEL.test(identifierWords(value));
}
function scanVocabulary(scan: ScanRoot): JsonValue {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const hits = files.filter(file => vocabularyHit(textOf(file))).map(file => relative(REPO, file));
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling the pin-change vocabulary under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, floorMet, anchorRead, hits };
}

/** Whether a descriptor reaches rf: its id or a permission carries the reactivefiber prefix, or its contractSource names an rf
 * release (rf@) or rf's CLI schema, so an rf capability registered under another id is still read (wb-w1g3 F1(iv): G14). */
function drivesRf(descriptor: Pick<CapabilityDescriptor, "id" | "permissions" | "contractSource">): boolean {
  const source = descriptor.contractSource ?? "";
  return descriptor.id.startsWith("reactivefiber.") || descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) ||
    source.startsWith("rf@") || source.includes(RF_CLI_SCHEMA_FAMILY);
}
function descriptorShape(descriptor: CapabilityDescriptor): JsonValue {
  return {
    id: descriptor.id, effectClass: descriptor.effectClass, permissions: [...descriptor.permissions], modes: [...descriptor.supportedModes],
    carrier: descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
    noCommitSource: (descriptor.contractSource ?? "").endsWith("context.render --no-commit"),
  };
}

/** The rf provider's two registrations, native and injected, as A3's whole reads run them. */
function nativeRegistration(registry: CapabilityRegistry): void {
  registerNativeReactiveFiberRender(registry, ROOT);
}
function injectedRegistration(registry: CapabilityRegistry): void {
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
}
/** A registration read whole (wb-s4j3 F2): every descriptor the registry holds once it ran, unfiltered, after any it already held. */
function wholeRead(registration: (registry: CapabilityRegistry) => void, registry: CapabilityRegistry = new CapabilityRegistry()): CapabilityDescriptor[] {
  registration(registry);
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
/** A registry already holding a test-only stand-in for the UNMARKED capability (never invoked; src registers none): the control
 * each whole read runs on. */
function unmarkedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: { ...UNMARKED, version: "1.0.0", description: "Test-only unmarked stand-in (wb-s4j3 F2); src registers none", inputSchema: COMMIT_INPUT, effectClass: "write", supportedModes: ["invoke"] },
    invoke: () => Promise.reject(new Error("the unmarked stand-in is never invoked")),
  });
  return registry;
}
/** The wb-w1g3 L2-04 probe's descriptor: a write-class capability carrying no rf marker in its id, permission or contractSource. */
const UNMARKED = { id: "context.render.commit", permissions: ["context:commit"], contractSource: "local:context.render" };
interface Reach {
  readonly launchers: string[];
  readonly sites: string[];
  readonly wrappers: string[];
  readonly wrapperSites: string[];
}
function parsed(fileName: string, source: string): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
const MODULE_SCOPE = "<module>";
/** The name a node sits under: the nearest named function declaration, a function bound to a variable, or a class method
 * (Class.method), looking through object-literal members; MODULE_SCOPE at module scope. */
function enclosingName(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
    if (ts.isMethodDeclaration(at) && ts.isClassDeclaration(at.parent) && at.parent.name !== undefined && ts.isIdentifier(at.name)) return `${at.parent.name.text}.${at.name.text}`;
  }
  return MODULE_SCOPE;
}
/** The functions enclosing each rf launch A1 counts in a module: the launchers src's reach is read from (wb-s4j3 F2). */
function launchingFunctions(file: ts.SourceFile): string[] {
  const launchers = launcherNames(file);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && launchesRf(node, launchers)) found.push(enclosingName(node));
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** Every reference a module makes to one of the named functions - an identifier (a call, an alias, an import or export specifier,
 * a namespace member) or a string literal spelling the name (a literal member) - as "<module path> > <enclosing name>"; a function's
 * own declared name is no reference. */
function referenceSites(fileName: string, file: ts.SourceFile, names: readonly string[]): string[] {
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    const named = (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) && names.includes(node.text);
    const declared = ts.isFunctionDeclaration(node.parent) && node.parent.name === node;
    if (named && !declared) sites.push(`${fileName} > ${enclosingName(node)}`);
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(file, visit);
  return sites;
}
/** Where src reaches rf's launch (wb-s4j3 F2): the launchers are the functions enclosing an rf launch; their sites are every src
 * reference to one; the wrappers are the functions those sites sit in, other than the rf provider's two registrations (read whole
 * by A3); and the wrapper sites are every src reference to a wrapper. */
function rfReach(): Reach {
  const modules = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => {
    const name = relative(REPO, file);
    return { name, file: parsed(name, textOf(file)) };
  });
  const launchers = [...new Set(modules.flatMap(({ file }) => launchingFunctions(file)))].sort();
  const sites = modules.flatMap(({ name, file }) => referenceSites(name, file, launchers)).sort();
  const registrations = [registerNativeReactiveFiberRender.name, registerReactiveFiberRender.name];
  const wrappers = [...new Set(sites.map(site => site.slice(site.indexOf(" > ") + " > ".length)))]
    .filter(name => name !== MODULE_SCOPE && !registrations.includes(name)).sort();
  const wrapperSites = modules.flatMap(({ name, file }) => referenceSites(name, file, wrappers)).sort();
  return { launchers, sites, wrappers, wrapperSites };
}

const PIN_REFUSAL: Refusal = { category: "unavailable", message: `RF render refused: ${PIN_CHANGED}` };

/** wb-tnz5.5's notes in the tracker export; the cases read them through two append-only paragraphs only, never whole. */
function beadNotes(): string {
  for (const line of textOf(TRACKER_EXPORT).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The owner filing: the notes' first two paragraphs (the full statement, then the paragraph opening "Owner filing (" with its
 * Acceptance line). The lane appends every later note behind bd's blank-line separator and never rewrites these, so the
 * append-only notes keep them byte-stable while a reading of the whole notes changes at every ledger hop. */
function ownerFiling(notes: string): { statement: string; filing: string } {
  const [statement = "", filing = ""] = notes.split("\n\n");
  return { statement, filing };
}
/** The clause tags of the filing's Acceptance line, in order: (a), (b), (c). */
function acceptanceTags(filing: string): string[] {
  const line = filing.split("\n").find(item => item.startsWith("Acceptance: ")) ?? "";
  return [...line.matchAll(/\(([a-z])\) /g)].map(match => match[1] ?? "");
}
/** The residual names of the delivered note's RESIDUALS paragraph (the first paragraph opening with its head), in order: written
 * once at delivery and never rewritten (append-only notes). */
function deliveredResiduals(notes: string): string[] {
  const paragraph = notes.split("\n\n").find(item => item.startsWith(DELIVERED_RESIDUALS_HEAD)) ?? "";
  return [...paragraph.matchAll(/\bR-[A-Z]+(?:-[A-Z]+)*/g)].map(match => match[0]);
}

/** Each pin as `<pin>:<the assertions its own case made>`, in run order, pushed after its witness compare; the last case holds it
 * to the roster (wb-w1g3 F3: a case that returned its witness before asserting, X-THIRD, counts short). */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const scans = files.map(file => scanRf(relative(REPO, file), textOf(file)));
    const found = {
      renderSites: scans.flatMap(scan => scan.renderSites), uncommitted: scans.flatMap(scan => scan.uncommitted),
      uncommittedLiterals: scans.flatMap(scan => scan.uncommittedLiterals), commitFlags: scans.flatMap(scan => scan.commitFlags),
      rfLaunches: scans.flatMap(scan => scan.rfLaunches), composedArgv: scans.reduce((sum, scan) => sum + scan.composedArgv, 0),
    };
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(found, "a committing rf render needs wb-jwc.5's owner-reserved gate").toStrictEqual({
      renderSites: ["src/workbench/providers/reactivefiber.ts"], uncommitted: [], uncommittedLiterals: [], commitFlags: [],
      rfLaunches: ["src/workbench/providers/reactivefiber.ts"], composedArgv: 0,
    });
    const control = (source: string): JsonValue => {
      const scan = scanRf("control.ts", source);
      return {
        render: scan.renderSites.length, uncommitted: scan.uncommitted.length + scan.uncommittedLiterals.length, flags: scan.commitFlags.length,
        composed: scan.composedArgv, launches: scan.rfLaunches.length,
      };
    };
    const controls = {
      uncommittedArgv: control('spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--json"]);'),
      noCommitArgv: control('spawn("rf", ["--workspace", w, "context", "render", "--no-commit", "--json"]);'),
      spacedLiteral: control('const cmd = "rf context render --model m --json";'),
      idempotencyFlag: control('spawn("rf", ["context", "render", "--no-commit", "--idempotency-key", key]);'),
      composedArgv: control('const verb = "render"; spawn("rf", ["context", verb]);'),
      // wb-w1g3 F1(iv): G15 (member launcher, concat-split argv) and G17 (aliased launcher, a flag between group and verb).
      memberConcat: control('import * as childProcess from "node:child_process";\nchildProcess.spawn("rf", ["--workspace", w, "context"].concat(["render", "--model", m, "--task", t, "--json"]));'),
      aliasInterleaved: control('import { spawn as run } from "node:child_process";\nrun("rf", ["--workspace", w, "context", "--no-input", "render", "--json"]);'),
      variableAlias: control('const launch = execFile;\nlaunch("rf", ["context", "render", "--no-commit", "--json"]);'),
      destructuredAlias: control('const { spawn: start } = childProcess;\nstart("rf", ["context", "render", "--no-commit"]);'),
      elementSpread: control('cp["execFile"]("rf", [...["context", "render"], "--json"]);'),
      piExec: control('pi.exec("rf", ["--workspace", w, "context", "render", "--no-commit", "--json"]);'),
      shellString: control('execSync("rf context --no-input render --json");'),
      plusLiteral: control('const cmd = "rf context " + "render --model m";'),
      // R-WRAPPED-LAUNCH, its pinned quiet rows: a wrapper taking the program as a parameter is no bound launcher, and a program
      // name held in a constant is no program literal; both argv literals are still read.
      wrappedLaunch: control('function launch(program: string, argv: string[]) { return spawn(program, argv); }\nlaunch("rf", ["context", "render", "--no-commit"]);'),
      constantProgram: control('const RF = "rf";\nspawn(RF, ["context", "render", "--no-commit"]);'),
      // wb-s4j3 F3: a program spelled as a path to rf, an argv behind a type assertion, and an argv a push completes.
      absolutePath: control('spawn("/usr/local/bin/rf", ["--workspace", w, "context", "render", "--no-commit", "--json"]);'),
      windowsPath: control('execFile("C:\\\\tools\\\\rf.exe", ["context", "render", "--no-commit"]);'),
      assertedArgv: control('spawn("rf", ["context", "render", "--json"] as string[]);'),
      assertedPlus: control('const cmd = "rf context " + ("render --model m" as string);'),
      pushArgv: control('const argv = ["--workspace", w, "context"];\nargv.push("render", "--model", m, "--json");\nspawn("rf", argv);'),
      pushComposed: control('const argv = ["context"];\nargv.push(verb);\nspawn("rf", argv);'),
      // R-MUTATED-ARGV, its pinned quiet row: a mutation other than a push in the declaring scope is not folded.
      unshiftArgv: control('const argv = ["--workspace", w];\nargv.unshift("context", "render");\nspawn("rf", argv);'),
      // wb-29wk F1: a push through a wrapped receiver or callee, a ["push"] element call and a push on a declared alias (an alias of
      // an alias through <T> and satisfies included; a variable aliasing another name, or declared outside the argv's scope, is no
      // alias of the argv), a launch whose program, callee or launcher binding sits behind a wrapper, then the gate's four double
      // escapes (G2-F3c, G2-F3c3, G2-F3e, G2-F3f).
      assertedReceiver: control('const argv = ["--workspace", w, "context"];\n(argv as string[]).push("render", "--model", m, "--json");\nspawn("rf", argv);'),
      nonNullReceiver: control('const argv = ["context"];\nargv!.push("render", "--json");\nspawn("rf", argv);'),
      elementPush: control('const argv = ["context"];\nargv["push"]("render", "--json");\nspawn("rf", argv);'),
      wrappedPushCallee: control('const argv = ["context"];\n(argv.push)("render", "--json");\nspawn("rf", argv);'),
      aliasPush: control('const argv = ["context"];\nconst same = argv;\nsame.push("render", "--json");\nspawn("rf", argv);'),
      aliasChain: control('const argv = ["context"];\nlet first = <string[]>argv;\nvar second = (first satisfies string[]);\nsecond.push("render", "--json");\nspawn("rf", argv);'),
      foreignAlias: control('const argv = ["context"];\nconst other = list;\nother.push("render", "--json");\nspawn("rf", argv);'),
      scopedAlias: control('{ const argv = ["context"]; spawn("rf", argv); }\nconst same = argv;\nsame.push("render", "--json");'),
      assertedProgram: control('spawn(("rf" as string), ["context", "render", "--no-commit"]);'),
      wrappedLauncherCallee: control('(spawn as typeof spawn)("rf", ["context", "render", "--no-commit"]);'),
      assertedLauncherAlias: control('const run = (spawn as typeof spawn);\nrun("rf", ["context", "render", "--no-commit"]);'),
      assertedBoth: control('const argv = ["--workspace", w, "context"];\n(argv as string[]).push("render", "--json");\nspawn("rf" as string, argv);'),
      nonNullBoth: control('const argv = ["--workspace", w, "context"];\nargv!.push("render", "--json");\nspawn("rf" as string, argv);'),
      constantAsserted: control('const RF = "rf";\nconst argv = ["--workspace", w, "context"];\n(argv as string[]).push("render", "--json");\nspawn(RF, argv);'),
      constantAlias: control('const RF = "rf";\nconst argv = ["--workspace", w, "context"];\nconst same = argv;\nsame.push("render", "--json");\nspawn(RF, argv);'),
      // R-INDIRECT-PUSH, its pinned quiet row: a push reached through Array.prototype.push.call is not folded.
      indirectPush: control('const argv = ["context"];\nArray.prototype.push.call(argv, "render", "--json");\nspawn("rf", argv);'),
      // wb-shnw F1: a literal a parameter default or a destructuring default declares - the gate's E-PARAM-DEFAULT and
      // E-DESTRUCT-DEFAULT double escapes (each launching through the constant program, R-WRAPPED-LAUNCH) and
      // E-PARAM-DEFAULT-LITLAUNCH, a parameter's own pattern and an array pattern - and a name a parameter default or a
      // destructuring default declares to the argv.
      paramDefault: control('function f(w: string, argv = ["--workspace", w, "context"]) {\n  const RF = "rf";\n  argv.push("render", "--json");\n  return spawn(RF, argv);\n}'),
      destructDefault: control('const { argv = ["--workspace", w, "context"] } = opts;\nconst RF = "rf";\nargv.push("render", "--json");\nspawn(RF, argv);'),
      paramDefaultLaunch: control('function f(w: string, argv = ["--workspace", w, "context"]) {\n  argv.push("render", "--json");\n  return spawn("rf", argv);\n}'),
      patternParamDefault: control('function f({ argv = ["context"] }: Options) {\n  argv.push("render", "--json");\n  return spawn("rf", argv);\n}'),
      arrayDefault: control('const [argv = ["context"]] = lists;\nargv.push("render", "--json");\nspawn("rf", argv);'),
      paramAlias: control('function f(argv = ["context"], same = argv) {\n  same.push("render", "--json");\n  return spawn("rf", argv);\n}'),
      bindingAlias: control('const argv = ["context"];\nconst { same = argv } = opts;\nsame.push("render", "--json");\nspawn("rf", argv);'),
      // wb-shnw F1, quiet: a parameter's literal, its pattern's too, is completed only inside its own function.
      paramScoped: control('function f(argv = ["context"]) { return spawn("rf", argv); }\nfunction g(argv: string[]) { argv.push("render", "--json"); }'),
      patternScoped: control('function f({ argv = ["context"] }: Options) { return spawn("rf", argv); }\nfunction g(argv: string[]) { argv.push("render", "--json"); }'),
      // R-INDIRECT-PUSH members named, each a pinned quiet row: wb-shnw F2's aliases declared to a comma, conditional or nullish
      // expression or destructured from a literal holding the argv, F3's member receiver and bound push, and beside them the
      // literal itself destructured from a literal holding it and a literal bound by an assignment or an assignment pattern.
      commaAlias: control('const argv = ["context"];\nconst same = (0, argv);\nsame.push("render", "--json");\nspawn("rf", argv);'),
      conditionalAlias: control('const argv = ["context"];\nconst same = flag ? argv : argv;\nsame.push("render", "--json");\nspawn("rf", argv);'),
      nullishAlias: control('const argv = ["context"];\nconst same = argv ?? [];\nsame.push("render", "--json");\nspawn("rf", argv);'),
      arrayPatternAlias: control('const argv = ["context"];\nconst [same] = [argv];\nsame.push("render", "--json");\nspawn("rf", argv);'),
      objectPatternLiteral: control('const { argv } = { argv: ["context"] };\nargv.push("render", "--json");\nspawn("rf", argv);'),
      assignedLiteral: control('let argv;\nargv = ["context"];\nargv.push("render", "--json");\nspawn("rf", argv);'),
      assignmentPatternDefault: control('let argv;\n({ argv = ["context"] } = opts);\nargv.push("render", "--json");\nspawn("rf", argv);'),
      memberReceiver: control('const argv = ["context"];\nconst box = { argv };\nbox.argv.push("render", "--json");\nspawn("rf", argv);'),
      boundPush: control('const argv = ["context"];\nargv.push.bind(argv)("render", "--json");\nspawn("rf", argv);'),
      // wb-shnw F4, the guards no control pinned, each a quiet row: an alias declared before the literal, a push before it or
      // after its scope ends, and an element call other than ["push"] (the element twin of unshiftArgv, R-MUTATED-ARGV).
      earlierAlias: control('const same = argv;\n{ const argv = ["context"]; same.push("render", "--json"); spawn("rf", argv); }'),
      earlierPush: control('argv.push("render", "--json");\n{ const argv = ["context"]; spawn("rf", argv); }'),
      laterPush: control('{ const argv = ["context"]; spawn("rf", argv); }\nargv.push("render", "--json");'),
      elementUnshift: control('const argv = ["--workspace", w];\nargv["unshift"]("context", "render");\nspawn("rf", argv);'),
    };
    expect(controls).toStrictEqual({
      uncommittedArgv: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, noCommitArgv: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      spacedLiteral: { render: 0, uncommitted: 1, flags: 0, composed: 0, launches: 0 }, idempotencyFlag: { render: 1, uncommitted: 0, flags: 1, composed: 0, launches: 1 },
      composedArgv: { render: 0, uncommitted: 0, flags: 0, composed: 1, launches: 1 },
      memberConcat: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, aliasInterleaved: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      variableAlias: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, destructuredAlias: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      elementSpread: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, piExec: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      shellString: { render: 0, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, plusLiteral: { render: 0, uncommitted: 1, flags: 0, composed: 0, launches: 0 },
      wrappedLaunch: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 0 }, constantProgram: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 0 },
      absolutePath: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, windowsPath: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      assertedArgv: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, assertedPlus: { render: 0, uncommitted: 1, flags: 0, composed: 0, launches: 0 },
      pushArgv: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      pushComposed: { render: 0, uncommitted: 0, flags: 0, composed: 1, launches: 1 }, unshiftArgv: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      assertedReceiver: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, nonNullReceiver: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      elementPush: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, wrappedPushCallee: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      aliasPush: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, aliasChain: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      foreignAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, scopedAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      assertedProgram: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      wrappedLauncherCallee: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, assertedLauncherAlias: { render: 1, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      assertedBoth: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, nonNullBoth: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      constantAsserted: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 0 }, constantAlias: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 0 },
      indirectPush: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      paramDefault: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 0 }, destructDefault: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 0 },
      paramDefaultLaunch: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, patternParamDefault: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      arrayDefault: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, paramAlias: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 },
      bindingAlias: { render: 1, uncommitted: 1, flags: 0, composed: 0, launches: 1 }, paramScoped: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      patternScoped: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, commaAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      conditionalAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, nullishAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      arrayPatternAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, objectPatternLiteral: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      assignedLiteral: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, assignmentPatternDefault: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      memberReceiver: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, boundPush: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      earlierAlias: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, earlierPush: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
      laterPush: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 }, elementUnshift: { render: 0, uncommitted: 0, flags: 0, composed: 0, launches: 1 },
    });
    return { srcFloorMet, ...found, controls };
  },
  A2: async () => {
    const arms: JsonObject = {};
    for (const [name, input] of [["legacy", LEGACY_INPUT], ["view", VIEW_INPUT]] as const) {
      const outcome = await nativeOutcome([{ body: json(fullShapeRf(ROOT)), exit: 0 }], input);
      expect(outcome.refusal).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      const tail = argvTail(outcome.spawns[0]);
      const result = objectOf(sourceOf(outcome.reading).result, "reading result");
      expect(tail).toContain("--no-commit");
      expect(tail.filter(word => COMMIT_FLAGS.includes(word))).toEqual([]);
      expect({ renderId: result.render_id, ephemeral: result.ephemeral }).toStrictEqual({ renderId: null, ephemeral: true });
      arms[name] = { spawns: outcome.spawns.length, tail, renderId: result.render_id ?? null, ephemeral: result.ephemeral ?? null };
    }
    return arms;
  },
  A3: async () => {
    // wb-w1g3 F1(iv): the roster is every descriptor that reaches rf by id, permission or contractSource, not the id prefix alone.
    const native = (await nativeDescriptors()).filter(drivesRf);
    // wb-s4j3 F2: and by reach - the rf provider's two registrations are read whole, unfiltered, and src's references to its rf
    // launcher are pinned, so a capability carrying no rf marker that drives the launcher shows.
    const provider = wholeRead(nativeRegistration);
    const injected = wholeRead(injectedRegistration);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const reach = rfReach();
    const shape = { id: PREVIEW_ID, effectClass: "read", permissions: PREVIEW_GRANTS, modes: ["invoke"], carrier: true, noCommitSource: true };
    expect(native.map(descriptorShape)).toStrictEqual([shape]);
    expect(provider.map(descriptorShape)).toStrictEqual([shape]);
    expect(injected.map(descriptorShape)).toStrictEqual([shape]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(reach, "src reaches rf's launch only through the preview's registration and the uncalled legacy wrapper").toStrictEqual({
      launchers: ["nativeReactiveFiberRender"],
      sites: ["src/workbench/providers/reactivefiber.ts > nativeReactiveFiberPreview", "src/workbench/providers/reactivefiber.ts > registerNativeReactiveFiberRender"],
      wrappers: ["nativeReactiveFiberPreview"], wrapperSites: [],
    });
    const reachControl = (source: string): string[] => referenceSites("control.ts", parsed("control.ts", source), reach.launchers);
    const controls = {
      otherIdRfRelease: drivesRf({ id: "rf.render.commit", permissions: ["rf:commit"], contractSource: "rf@0.1.784:reactive-fiber.cli/v1 context.render" }),
      otherIdSchemaOnly: drivesRf({ id: "render.commit", permissions: [], contractSource: "local:reactive-fiber.cli/v2 context.render" }),
      otherIdPermissionOnly: drivesRf({ id: "render.commit", permissions: ["reactivefiber:commit"] }),
      prefixOnly: drivesRf({ id: "reactivefiber.render.commit", permissions: [] }),
      forgeQuiet: drivesRf({ id: "forge.gate.status", permissions: ["forge:read"], contractSource: "@forge/sdk@0.1.0:ServerConnection.request(gate.status)" }),
      // The marker reading alone misses the unmarked capability (wb-s4j3 F2); each whole read, run on a registry already holding
      // it, sees it beside the preview.
      unmarkedMarker: drivesRf(UNMARKED),
      nativeWholeWithUnmarked: wholeRead(nativeRegistration, unmarkedRegistry()).map(descriptor => descriptor.id),
      injectedWholeWithUnmarked: wholeRead(injectedRegistration, unmarkedRegistry()).map(descriptor => descriptor.id),
      importedCall: reachControl('import { nativeReactiveFiberRender } from "./providers/reactivefiber.js";\nexport function commitRender(w: string) {\n  return nativeReactiveFiberRender({ model: "m", task: "t" }, w);\n}'),
      namespaceCall: reachControl('import * as rf from "./providers/reactivefiber.js";\nexport const commitRender = (w: string) => rf.nativeReactiveFiberRender({ model: "m", task: "t" }, w);'),
      literalMember: reachControl('export async function commitRender(w: string) {\n  const rf = await import("./providers/reactivefiber.js");\n  return rf["nativeReactiveFiberRender"]({ model: "m", task: "t" }, w);\n}'),
      // R-RELAYED-REACH, its pinned quiet rows: a capability relaying the read preview through the registry, and one reaching the
      // launcher through a name assembled at runtime, leave no reference A3 can bind.
      registryRelay: reachControl('export function commitRender(registry: CapabilityRegistry, context: InvocationContext) {\n  return registry.invoke("reactivefiber.render.preview", { model: "m", task: "t" }, context);\n}'),
      assembledName: reachControl('export async function commitRender(w: string) {\n  const rf = await import("./providers/reactivefiber.js");\n  const name = ["native", "ReactiveFiber", "Render"].join("");\n  return rf[name]({ model: "m", task: "t" }, w);\n}'),
    };
    expect(controls).toStrictEqual({
      otherIdRfRelease: true, otherIdSchemaOnly: true, otherIdPermissionOnly: true, prefixOnly: true, forgeQuiet: false, unmarkedMarker: false,
      nativeWholeWithUnmarked: [UNMARKED.id, PREVIEW_ID], injectedWholeWithUnmarked: [UNMARKED.id, PREVIEW_ID], importedCall: ["control.ts > <module>", "control.ts > commitRender"],
      namespaceCall: ["control.ts > commitRender"], literalMember: ["control.ts > commitRender"], registryRelay: [], assembledName: [],
    });
    return { native: native.map(descriptorShape), provider: provider.map(descriptorShape), injected: injected.map(descriptorShape), reconcile, reach: { ...reach }, controls };
  },
  A4: async () => ({ roots: VOCABULARY_ROOTS.map(scanVocabulary) }),
  B1: async () => {
    const envelope = ROSTER.pinChanged;
    const primary = primaryOf(envelope);
    const metadata = metadataOf(envelope);
    const diagnostics = Array.isArray(envelope.diagnostics) ? envelope.diagnostics.length : -1;
    expect({ command: envelope.command, ok: envelope.ok, result: envelope.result, transaction: envelope.transaction_id, diagnostics }).toStrictEqual({
      command: "context.render", ok: false, result: null, transaction: null, diagnostics: 1,
    });
    expect({ code: primary.code, severity: primary.severity, source: primary.source }).toStrictEqual({ code: PIN_CHANGED, severity: "error", source: ROSTER.analogue.source });
    expect(Object.keys(metadata)).toStrictEqual(CONFLICT_KEYS);
    expect(Object.keys(metadata)).toStrictEqual([...ROSTER.analogue.metadataKeys]);
    expect({ expected: metadata.expected_revision, current: metadata.current_revision, refresh: metadata.refresh_command }).toStrictEqual({
      expected: R1, current: R2, refresh: ROSTER.analogue.refreshCommand,
    });
    expect(R1).not.toBe(R2);
    expect({ pinExit: ROSTER.pinExit, analogueExit: ROSTER.analogue.exit, shipped: ROSTER.codeShippedAtInstalledRf }).toStrictEqual({ pinExit: PIN_EXIT, analogueExit: PIN_EXIT, shipped: false });
    return {
      command: envelope.command ?? null, ok: envelope.ok ?? null, result: envelope.result ?? null, transaction: envelope.transaction_id ?? null, diagnostics,
      code: primary.code ?? null, severity: primary.severity ?? null, source: primary.source ?? null, metadataKeys: Object.keys(metadata),
      witnessIsPin: metadata.expected_revision === R1, newerIsCurrent: metadata.current_revision === R2, distinct: R1 !== R2,
      exit: ROSTER.pinExit, analogue: { code: ROSTER.analogue.code, exit: ROSTER.analogue.exit, family: ROSTER.analogue.family, hintRequired: ROSTER.analogue.hintRequired },
      rfVersion: ROSTER.rfVersion, shipped: ROSTER.codeShippedAtInstalledRf,
    };
  },
  B2: async () => {
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    expect(outcome.refusal).toStrictEqual(PIN_REFUSAL);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    const tail = argvTail(outcome.spawns[0]);
    expect(tail).toContain("--no-commit");
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, tail };
  },
  B3: async () => {
    const at = async (exit: number): Promise<JsonValue> => {
      const outcome = await nativeOutcome([{ body: pinChanged(), exit }]);
      expect(outcome.reading).toBeNull();
      return outcome.refusal === null ? null : { ...outcome.refusal };
    };
    const exit0 = await at(0);
    const exit4 = await at(PIN_EXIT);
    const exit7 = await at(7);
    expect(exit0).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized or contradictory failure envelope." });
    expect(exit4).toStrictEqual(PIN_REFUSAL);
    // R-EXIT-UNREAD: Pi reads the exit as zero or nonzero only, so exit 7 reads exactly as exit 4 and no message names the class.
    expect(exit7).toStrictEqual(exit4);
    const exitNamed = stringLeaves([exit4, exit7]).some(item => /\bexit\b|\b4\b/.test(item));
    expect(exitNamed).toBe(false);
    return { exit0, exit4, exit7, exitNamed };
  },
  B4: async () => {
    // The stand-in would answer a second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    expect(outcome.refusal).toStrictEqual(PIN_REFUSAL);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    return { category: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length };
  },
  B5: async () => {
    const { topology } = projectionOf(pinChanged());
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined ||
      snapshot.sourceVersion !== undefined || (snapshot.evidenceRefs ?? []).some(ref => !ref.startsWith("rf-workspace:"));
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(snapshot?.node.statusText).toContain(PIN_CHANGED);
    expect(carriesValue).toBe(false);
    // wb-w1g3 F1(iii): the title rides the witness, so a receipt or any other text added to it shows (G13).
    return {
      snapshots: topology.snapshots.length, coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null,
      statusText: snapshot?.node.statusText ?? null, title: snapshot?.node.title ?? null, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], carriesValue,
      diagnostics: [...topology.diagnostics],
    };
  },
  B6: async () => {
    const envelope = pinChanged();
    const { reading, calls, answerAliased } = await injectedReading(envelope);
    const source = sourceOf(reading);
    const readingKeys = Object.keys(objectOf(reading, "reading")).sort();
    // Byte for byte: the reading's source serializes to exactly the envelope's bytes, key order included. The envelope shares no
    // object with the answer the seam relayed (wb-w1g3 F1(i)), so an edit the relay made in place shows here; the control proves the
    // alias reading sees a shared object.
    const byteIdentical = JSON.stringify(source) === JSON.stringify(envelope);
    const aliasControl = sharesObject({ held: envelope.diagnostics }, envelope);
    expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
    expect(byteIdentical).toBe(true);
    expect(primaryOf(source).code).toBe(PIN_CHANGED);
    expect(calls).toBe(1);
    expect({ answerAliased, aliasControl }).toStrictEqual({ answerAliased: false, aliasControl: true });
    return { readingKeys, byteIdentical, code: primaryOf(source).code ?? null, ok: source.ok ?? null, calls, answerAliased, aliasControl };
  },
  B7: async () => {
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    const refusal = await refusalFrom(commitRegistry().invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION])));
    const spawns = spawnsOf(log).length;
    expect(refusal).toStrictEqual({
      category: "uncertain-effect",
      message: `Capability ${COMMIT_ID} has an uncertain external effect: RF render refused: ${PIN_CHANGED}. Reconcile with the producer before retrying.`,
    });
    expect(spawns).toBe(1);
    return { ...refusal, carriesCode: refusal.message.includes(PIN_CHANGED), reconciles: refusal.message.includes("Reconcile with the producer before retrying."), spawns };
  },
  B8: async () => {
    const script = `${HEAD}return await node(${JSON.stringify(COMMIT_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({
      script, host: claudeHost(commitRegistry(), [COMMIT_PERMISSION]), journal: { append: entry => {
        entries.push(entry);
      } },
    });
    const recordedSpawns = spawnsOf(log).length;
    const resumed = await runWorkflow({ script, host: claudeHost(commitRegistry(), [COMMIT_PERMISSION]), journal: { entries } });
    const resumeSpawns = spawnsOf(log).length - recordedSpawns;
    const error = resumed.error ?? "";
    expect(recorded.status).toBe("failed");
    expect(recorded.capabilityError?.category).toBe("uncertain-effect");
    expect(recorded.capabilityError?.message).toContain(`RF render refused: ${PIN_CHANGED}`);
    expect(recordedSpawns).toBe(1);
    expect(resumed.status).toBe("failed");
    expect(resumed.capabilityError?.category).toBe("uncertain-effect");
    expect(resumeSpawns).toBe(0);
    return {
      recorded: {
        status: recorded.status, category: recorded.capabilityError?.category ?? null,
        carriesCode: (recorded.capabilityError?.message ?? "").includes(PIN_CHANGED), nodeRows: nodeRows(entries), spawns: recordedSpawns,
      },
      resumed: {
        status: resumed.status, category: resumed.capabilityError?.category ?? null, namesProducer: error.includes('producer "reactivefiber"'),
        namesReconcile: error.includes("workflow_reconcile"), spawns: resumeSpawns, replayedNodeCount: resumed.replayedNodeCount,
      },
    };
  },
  B9: async () => {
    const script = `${HEAD}return await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }]);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({
      script, host: claudeHost(previewRegistry(), PREVIEW_GRANTS), journal: { append: entry => {
        entries.push(entry);
      } },
    });
    const recordedSpawns = spawnsOf(log).length;
    const resumed = await runWorkflow({ script, host: claudeHost(previewRegistry(), PREVIEW_GRANTS), journal: { entries } });
    const resumeSpawns = spawnsOf(log).length - recordedSpawns;
    const diagnostic = { name: "CapabilityError", ...PIN_REFUSAL };
    expect(recorded.status).toBe("failed");
    expect(recorded.capabilityError).toStrictEqual(diagnostic);
    expect(recordedSpawns).toBe(1);
    // R-RESUME-REREAD: the failed read is re-run live once on resume (one fresh noncommitted read), never replayed as a value.
    expect(resumed.capabilityError).toStrictEqual(diagnostic);
    expect({ resumeSpawns, replayedNodeCount: resumed.replayedNodeCount }).toStrictEqual({ resumeSpawns: 1, replayedNodeCount: 0 });
    return {
      recorded: { status: recorded.status, capabilityError: recorded.capabilityError === undefined ? null : { ...recorded.capabilityError }, nodeRows: nodeRows(entries), spawns: recordedSpawns },
      resumed: { status: resumed.status, category: resumed.capabilityError?.category ?? null, spawns: resumeSpawns, replayedNodeCount: resumed.replayedNodeCount },
    };
  },
  C1: async () => {
    const envelope = pinChanged();
    const { reading } = await injectedReading(envelope);
    const relayed = metadataOf(sourceOf(reading));
    const primary = primaryOf(sourceOf(reading));
    expect(relayed).toStrictEqual(metadataOf(envelope));
    expect({ expected: relayed.expected_revision, current: relayed.current_revision }).toStrictEqual({ expected: R1, current: R2 });
    expect({ message: primary.message, hint: primary.hint }).toStrictEqual({ message: primaryOf(envelope).message, hint: primaryOf(envelope).hint });
    return {
      expectedRevision: relayed.expected_revision ?? null, currentRevision: relayed.current_revision ?? null,
      witnessIsPin: relayed.expected_revision === R1, swapped: relayed.expected_revision === R2 || relayed.current_revision === R1,
      metadataVerbatim: JSON.stringify(relayed) === JSON.stringify(metadataOf(envelope)), messageVerbatim: primary.message === primaryOf(envelope).message,
    };
  },
  C2: async () => {
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    const named = namedIn([outcome.refusal?.message ?? ""]);
    // R-WITHHELD: the typed refusal carries the code and withholds the witness, so neither receipt is named in it.
    expect(named).toStrictEqual({ namesPinned: false, namesAccepted: false, namesRecord: false, namesMessage: false });
    return { message: outcome.refusal?.message ?? null, ...named };
  },
  C3: async () => {
    const { shown } = projectionOf(pinChanged());
    const named = namedIn(shown);
    // Non-vacuity: the strings judged are the projection's own, the code among them.
    const projectionRead = shown.length >= 10 && shown.some(item => item.includes(PIN_CHANGED));
    expect(projectionRead).toBe(true);
    // R-WITHHELD: the projection carries the code and withholds the witness, so neither receipt is named in it.
    expect(named).toStrictEqual({ namesPinned: false, namesAccepted: false, namesRecord: false, namesMessage: false });
    return { projectionRead, ...named };
  },
  D1: async () => {
    const outcome = await nativeOutcome([{ body: committedPublication(), exit: 0 }]);
    expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized or contradictory envelope." });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    const named = namedIn([outcome.refusal?.message ?? ""]);
    expect({ namesPinned: named.namesPinned, namesAccepted: named.namesAccepted }).toStrictEqual({ namesPinned: false, namesAccepted: false });
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, namesPinned: named.namesPinned, namesAccepted: named.namesAccepted };
  },
  D2: async () => {
    const refusal = refusalOfCall(() => reactivefiberTopology(previewReading(committedPublication()), OBSERVER_CONTEXT));
    expect(refusal.category).toBe("validation");
    return { ...refusal };
  },
  D3: async () => {
    const envelope = pinnedPreview();
    const native = await nativeOutcome([{ body: envelope, exit: 0 }]);
    expect(native.refusal).toBeNull();
    const injected = await injectedReading(envelope);
    const seam = (reading: JsonValue | null): JsonValue => {
      const source = sourceOf(reading);
      const record = objectOf(objectOf(source.result, "reading result")[PUBLICATION_KEY], "relayed record");
      const byteIdentical = JSON.stringify(source) === JSON.stringify(envelope);
      const namesAccepted = stringLeaves(reading).some(item => item.includes(R2));
      const readingKeys = Object.keys(objectOf(reading ?? undefined, "reading")).sort();
      expect(byteIdentical).toBe(true);
      expect(record.pinnedReceiptIdentity).toBe(R1);
      expect(namesAccepted).toBe(false);
      expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
      return { byteIdentical, pinnedReceiptIdentity: record.pinnedReceiptIdentity ?? null, fields: Object.keys(record), namesAccepted, readingKeys };
    };
    return { native: { ...objectOf(seam(native.reading), "native seam"), spawns: native.spawns.length }, injected: { ...objectOf(seam(injected.reading), "injected seam"), calls: injected.calls } };
  },
  D4: async () => {
    const probeEnvelope = pinnedPreview();
    const refusalEnvelope = pinChanged();
    const probe = projectionOf(probeEnvelope);
    const refusal = projectionOf(refusalEnvelope);
    const native = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    const committed = await nativeOutcome([{ body: committedPublication(), exit: 0 }]);
    const adapterAbort = refusalOfCall(() => reactivefiberTopology(previewReading(committedPublication()), OBSERVER_CONTEXT));
    const nativeProbe = await nativeOutcome([{ body: pinnedPreview(), exit: 0 }]);
    const injectedProbe = await injectedReading(pinnedPreview());
    const injectedRefusal = await injectedReading(pinChanged());
    const surfaces: Record<string, readonly string[]> = {
      probeProjection: probe.shown, refusalProjection: refusal.shown, nativeRefusal: [native.refusal?.message ?? ""],
      committedAbort: [committed.refusal?.message ?? ""], adapterAbort: [adapterAbort.message],
      nativeReadingParts: piAddedParts(nativeProbe.reading), injectedReadingParts: piAddedParts(injectedProbe.reading),
      injectedRefusalParts: piAddedParts(injectedRefusal.reading),
    };
    // wb-w1g3 F1(i): every key and string a relay added INSIDE a relayed source (G21's in-place label rides there) is judged too.
    const added: Record<string, string[]> = {
      nativeProbeSource: sourceAddedParts(nativeProbe.reading, probeEnvelope), injectedProbeSource: sourceAddedParts(injectedProbe.reading, probeEnvelope),
      injectedRefusalSource: sourceAddedParts(injectedRefusal.reading, refusalEnvelope),
    };
    const labelled = Object.entries({ ...surfaces, ...added }).flatMap(([name, texts]) =>
      rootless(texts).filter(item => freshLabelled(item)).map(item => `${name}: ${item}`));
    // Non-vacuity: every surface judged holds at least one non-empty text; the in-source readings are empty by design, so their
    // control plants a label in place and reads it back.
    const everySurfaceRead = Object.values(surfaces).every(texts => texts.some(item => item.length > 0));
    expect(everySurfaceRead).toBe(true);
    expect(added).toStrictEqual({ nativeProbeSource: [], injectedProbeSource: [], injectedRefusalSource: [] });
    const labelledCopy = pinChanged();
    metadataOf(labelledCopy).freshness = "current";
    const addedControl = sourceAddedParts(previewReading(labelledCopy), refusalEnvelope);
    expect({ addedControl, read: addedControl.every(item => freshLabelled(item)) }).toStrictEqual({ addedControl: ["freshness", "current"], read: true });
    const probeNamed = namedIn(probe.shown);
    const snapshot = probe.topology.snapshots[0];
    expect(labelled).toEqual([]);
    // R-RECORD-UNREAD: the adapter never reads the stated record, so the probe projects on the noncommitted render's own tone.
    expect({ namesPinned: probeNamed.namesPinned, namesAccepted: probeNamed.namesAccepted }).toStrictEqual({ namesPinned: false, namesAccepted: false });
    // The quiet control reads the seam label the probe projection surfaces, never a copy of it (wb-w1g3 F1(ii): G12).
    const seamLabel = (snapshot?.node.statusText ?? "").split(` ${String.fromCodePoint(0x00b7)} `)[0] ?? "";
    expect(seamLabel.length).toBeGreaterThan(0);
    const controls = {
      fresh: freshLabelled("fresh output"), current: freshLabelled("the current owner read"), latest: freshLabelled("latest render"),
      upToDate: freshLabelled("up-to-date"), newest: freshLabelled("newest receipt"), quiet: freshLabelled(seamLabel),
    };
    expect(controls).toStrictEqual({ fresh: true, current: true, latest: true, upToDate: true, newest: true, quiet: false });
    return {
      surfaces: Object.keys(surfaces), everySurfaceRead, labelled, added, addedControl,
      probe: { coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null, namesPinned: probeNamed.namesPinned, namesAccepted: probeNamed.namesAccepted },
      seamLabel, controls,
    };
  },
  H1: async () => {
    // wb-s4j3 F5: a case measures; it never reads a roster witness, and it never hands back an object the roster holds.
    let readRefused = false;
    try {
      rosterWitness("B4");
    } catch {
      readRefused = true;
    }
    const held = heldWitness("B4");
    const guard = { readRefused, heldFlagged: sharesObject(held, ROSTER), nestedFlagged: sharesObject({ copy: [held] }, ROSTER) };
    expect(guard).toStrictEqual({ readRefused: true, heldFlagged: true, nestedFlagged: true });
    return guard;
  },
  HQ1: async () => {
    // R-VACUOUS-PAYLOAD, its pinned quiet row: a deep copy of a witness read from the roster's rows shares no object with the roster.
    const copyFlagged = sharesObject(json(heldWitness("B4")), ROSTER);
    expect(copyFlagged).toBe(false);
    return { copyFlagged };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async (): Promise<JsonValue> => {
        const hit = vocabularyHit(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { form: printable(spelling.text), hit };
      },
    ]),
  ),
  ...Object.fromEntries(
    FRESH_SPELLINGS.map(spelling => [
      spelling.pin,
      async (): Promise<JsonValue> => {
        const hit = freshLabelled(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { form: printable(spelling.text), hit };
      },
    ]),
  ),
  ...Object.fromEntries(
    NAMINGS.map(naming => [
      naming.pin,
      async (): Promise<JsonValue> => {
        const named = namedIn([naming.text]);
        expect(named).toStrictEqual(naming.named);
        return { form: printable(naming.text), ...named };
      },
    ]),
  ),
};

describe("wb-tnz5.5 rf federation pin-changed census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R6, absent-today leg)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:9", "C:3", "D:4", "M:20", "L:22", "N:7", "H:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const rosterPins = (id: string): string[] => ROSTER.rows.find(row => row.id === id)?.pins.map(pin => pin.id) ?? [];
    expect({
      code: PIN_CHANGED, pinExit: PIN_EXIT, gatingArtifacts: GATING_ARTIFACTS, conflictKeys: CONFLICT_KEYS, publicationFields: PUBLICATION_FIELDS,
      spellings: SPELLINGS.map(spelling => spelling.pin), freshSpellings: FRESH_SPELLINGS.map(spelling => spelling.pin), namings: NAMINGS.map(naming => naming.pin),
    }).toStrictEqual({
      code: ROSTER.code, pinExit: ROSTER.pinExit, gatingArtifacts: [...ROSTER.gatingArtifacts], conflictKeys: [...ROSTER.conflictKeys],
      publicationFields: [...ROSTER.publicationFields], spellings: rosterPins("M"), freshSpellings: rosterPins("L"), namings: rosterPins("N"),
    });
    expect(Object.keys(ROSTER.publication)).toStrictEqual(PUBLICATION_FIELDS);
    expect(ROSTER.publication.pinnedReceiptIdentity).toBe(R1);
    // wb-w1g3 F3: the registration record and the residuals, held to the roster.
    const judged = ROWS.flatMap(row => row.pins);
    expect(ROSTER.tests).toEqual([JUDGED_TITLE, ...judged, REGISTRATION_TITLE]);
    expect(ROSTER.reached.map(entry => entry.slice(0, entry.lastIndexOf(":")))).toEqual(judged);
    expect(RESIDUALS).toStrictEqual(ROSTER.residuals);
    expect(
      Object.entries(RESIDUALS).filter(([, pins]) => pins.length === 0 || pins.some(pin => !judged.includes(pin))).map(([name]) => name),
      "residuals whose quiet row is no judged pin",
    ).toEqual([]);
    // Outside both files: wb-tnz5.5's row in the tracker export, through two append-only paragraphs, never the whole notes.
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const { statement, filing } = ownerFiling(notes);
    expect(statement, "the notes' first paragraph states the statement the roster quotes").toContain(ROSTER.statement);
    expect(filing.startsWith("Owner filing ("), "the notes' second paragraph is the owner filing").toBe(true);
    const tags = ROWS.flatMap(row => /^\(([a-z])\) /.exec(row.label)?.[1] ?? []);
    expect(tags, "the rows carry exactly the owner filing's acceptance clauses, each once, in order").toEqual(acceptanceTags(filing));
    expect(deliveredResiduals(notes), "the residuals the landed delivery note named").toEqual(DELIVERED_RESIDUALS);
    expect(DELIVERED_RESIDUALS.filter(name => !Object.hasOwn(RESIDUALS, name)), "landed residuals no longer named here").toEqual([]);
    // The export readers' controls on synthetic texts: each reads what it is given, never a fixed answer.
    expect(acceptanceTags("Owner filing (x)\nAcceptance: (a) one (r1); (b) two (or three).")).toEqual(["a", "b"]);
    expect(deliveredResiduals(`lead\n\n${DELIVERED_RESIDUALS_HEAD} R-ONE (A1: x); R-TWO-PARTS (B2).\n\nlater`)).toEqual(["R-ONE", "R-TWO-PARTS"]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          // wb-w1g3 F3: the case's own assertions are counted around it, so a case returning its witness early counts short.
          const before = expect.getState().assertionCalls;
          runningCase = pin;
          let witness: JsonValue = null;
          try {
            witness = impl === undefined ? null : await impl();
          } finally {
            runningCase = null;
          }
          const asserted = expect.getState().assertionCalls - before;
          // wb-s4j3 F5: the witness a case hands back is its own reading, never an object the roster holds (row H).
          expect(sharesObject(witness, ROSTER), `${pin}'s case handed back an object the roster holds`).toBe(false);
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${asserted}`);
        });
      }
    });
  }

  it(REGISTRATION_TITLE, ({ task }) => {
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
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare after its own pinned number of assertions, in row order").toEqual([...ROSTER.reached]);
  });
});
