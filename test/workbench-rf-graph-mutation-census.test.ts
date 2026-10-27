/**
 * wb-a9l2.8 (RF-HARNESS2-FEDERATED-PEER-R8, program-triage-2026-10-22): no Pi surface mutates a published shared rf
 * workspace graph except through rf's existing candidate graph authorization/publication process, and Pi treats any
 * exported federation effect as a separately declared and authorized operation, never an implicit side effect of a read.
 * Source: "5. Do not mutate published shared workspace graphs without RF-CLI's existing candidate graph
 * authorization/publication process. Exported effects remain separately declared/authorized operations."
 * (ReactiveFiberCLI docs/programs/harness2-federated-peer-2026-10-20/README.md:26@6a251bf73af5). Gating: none for the
 * prohibition; the exported-effects surface RFCLI-H2-04 (README:36) is unshipped, so no exported-effect reader is added or
 * faked here.
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat):
 * - src/reactive_fiber_cli/cli/registry.py:794-895 registers sixteen graph leaves, each through _read (mutates=False) or
 *   _write (mutates=True); RF_GRAPH_LEAVES below copies them in registry order with each row's line. The eight _write
 *   leaves are the forbidden set (MUTATING): the candidate leaves, patch and its three lowerings, publish and rollback.
 *   No leaf, option or help text at the pin spells a "candidate apply" verb (git grep over src, rc 1): applying an edit to a
 *   candidate is graph patch and its lowerings ("apply a typed patch document to an edit candidate", parser.py:3052).
 * - context.render, Pi's one rf verb, is itself registered mutates=True with dry_run_flag NO_COMMIT_FLAG
 *   (registry.py:961-967), and NO_COMMIT_FLAG is "--no-commit" (registry.py:192), so the flag is what keeps Pi's render a read.
 * - rf keeps its workspace in WORKSPACE_DIR_NAME ".reactive-fiber" (domain/workspace/locator.py:33) and the declared graph
 *   document at DEFAULT_GRAPH_PATH "graphs/context.toml" (domain/workspace/layout.py:83): GRAPH_DOCUMENT, the spelling a
 *   direct graph write would need.
 * - The render result's effects ledger holds only denied or not_executed rows in rf v1; "executed" is minted only by a
 *   post-commit executor rf does not ship (schemas/cli/context.render.schema.json, result.effects.items.status).
 * - (wb-pdee) src/reactive_fiber_cli/cli/parser.py:251-260 GLOBAL_OPTIONS, the eight CLI-A25 globals "accepted before and
 *   after the subcommand", and :277 VERBOSE_FLAGS (-v, --verbose) are added to every group parser (_add_globals at :3458),
 *   so a global may stand between a leaf's words; :286 RF_VALUE_OPTIONS (--workspace, --actor, --color) take a value, apart
 *   or after "=".
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 every child-process call in src whose binary is a string literal naming rf: exactly one site,
 *    the spawn in nativeReactiveFiberRender (providers/reactivefiber.ts), its argv the renderArgv result; A2 no src string
 *    or template literal and no argv array spells a MUTATING leaf (floors: the src walk and the live context render argv);
 *    A3 renderArgv's literal argv: verb context render, tail --no-commit --no-input --json, so every form carries the
 *    producer's dry-run flag; A4 the native and the injected registration each hold exactly one reactivefiber.*
 *    descriptor, the preview, effectClass read, contractSource the carrier naming the non-committing render, and
 *    RECONCILE_EVIDENCE_READS.reactivefiber is the preview only (src/workflow/reconcile.ts:67); A5 the descriptor
 *    literals in src: two reactivefiber.* registration sites, both the preview with effectClass "read".
 *  B, acceptance (b). committingFindings judges every reactivefiber.* descriptor: one whose contractSource names the
 *    non-committing render (context.render --no-commit) and no MUTATING leaf or GRAPH_DOCUMENT path is a read; any other is
 *    committing and must declare a non-read effectClass; one naming a MUTATING leaf must also cite rf's candidate
 *    authorization/publication receipt (RECEIPT_LEAVES: graph.candidate.authorize and graph.publish); one naming a
 *    GRAPH_DOCUMENT path is a direct graph write and always refused; one without a contractSource cannot be judged and is
 *    refused. A committing render (context.render without --no-commit) is judged on its effectClass only: its receipt rule
 *    (--idempotency-key, rf operation show) is wb-jwc.5's, owner-reserved. B1 today's two registrations draw no finding and
 *    no committing descriptor exists; B2 no src literal spells a GRAPH_DOCUMENT path; B3-B6 the checker on constructed
 *    descriptors: each refusal, then the admissions (write, external and unknown citing both receipt leaves; a committing
 *    render declaring write).
 *  C, acceptance (c). A stand-in rf, the ONLY PATH entry on tracked scratch with an absolute-node shebang, appends one argv
 *    line per spawn (the argv recorder). C1 the registry's descriptor calls (discover, catalogSnapshot, effectClassOf) over
 *    the native registration and C2 its inspect call spawn nothing; C3 the Claude descriptor and inspection tools
 *    (capability_discover, capability_contract in both modes) spawn nothing; C4-C6 each input form the registered
 *    descriptor admits spawns once, verb context render with --no-commit and no MUTATING leaf; C7 capability_invoke spawns
 *    the same; C8 a read whose producer reports a commit (ephemeral false, a render_id, a commit_seq, a storage write) is
 *    refused, never surfaced; C9 the src anchors of the C rows: the registered descriptor's input forms are exactly the C4-C6
 *    inputs and CLAUDE_CAPABILITY_TOOL_NAMES is exactly the set of tools C3 and C7 call.
 *  M, the matcher A2 and B read: M1-M4 every MUTATING leaf caught as an argv run, a dotted id, a shell or spaced spelling
 *    (any case, "_" or "-" joints) and a template literal; M5 the eight read leaves, the live render argv and the near
 *    misses stay clean.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes):
 *    Q1 R-COMPOSED a leaf spelled from runtime parts is invisible to A2 and B (C4-C8 are the runtime backstop for the one
 *    live spawn site only); Q2 R-INDIRECT-BINARY a spawn whose binary is not a string literal is no site to A1; Q3
 *    R-UNPINNED-LEAF a graph leaf rf adds after the pin is outside MUTATING until a re-pin; Q4 R-DECLARED-ROUTE B judges a
 *    descriptor's declared contract, not its provider's argv; Q5 R-COORDINATED an edit of the census and the receipt
 *    anchor listing together reads clean (a landed receipt is append-only under R539, so the gate's numstat check, never
 *    this census, refuses the receipt half); Q6 R-EFFECT-LEDGER the preview reads rf's effect ledger and dry-run plan as
 *    data: an executed ledger row or would_commit true on a --no-commit reading is admitted (rf v1 mints no executed row).
 * FOLLOW-UP ROWS (wb-pdee, the R694 follow-up of landing 263, gate of record cmd_5f0f6e9c5468; F1 leads, F2 rides):
 *  S, F1's cure. C1-C3 read the argv recorder right after each call, so a child that a descriptor or inspection call starts
 *    without awaiting it goes unseen: the gate's CB1 (an unawaited rf spawn in CapabilityRegistry.inspect()) kept the census
 *    green, and CB3 (the same in discover()) left C1 green. S1-S4 repeat the C1, C2, C3 and C7 calls, then settle before they
 *    read: SETTLE_WINDOW_MS for deferred work, then until no child process the worker started is still running (its
 *    ProcessWrap handles in process.getActiveResourcesInfo, bounded by SETTLE_DRAIN_MS). S1-S3 read zero spawns and S4 the
 *    one render spawn. S5 is the settle's positive control: a planted unawaited stand-in spawn is running right after the
 *    call, is unseen by an immediate read, and is recorded after the settle. S6 pins the recorder's isolation: every pin
 *    starts with PATH on one empty scratch directory (beforeEach), and PATH names that removed directory between pins, so a
 *    stray spawn finds no binary. (Before this guard, a fire-and-forget spawn planted in catalogSnapshot was called from A4,
 *    B1 and C9 with the host PATH, on which an rf is installed.)
 *  I, F2 (i). A2 also reads each literal in its optionElided form, with every option token, the value a value option takes
 *    and every runtime token removed. I1 covers every MUTATING leaf with each of 16 array spellings of a global between its
 *    words, plus the gate's P07 and P07b. I2 covers the shell-line and template spellings. I3 keeps the read leaves, a
 *    non-global option, a value option that takes the verb, and the near misses clean.
 *  K, F2 (ii). A1 reads a callee through childProcessAliases (renamed named imports, destructured require() and import()) and
 *    through a literal element-access key. K1 covers the renamed bindings and the gate's P03 and P07b. K2 covers element
 *    access, with P04 beside P04b. K3 keeps clean an alias from another module, a key that names no child-process function
 *    and a renamed non-call export; it reads an aliased call that names another binary as one (otherBinaryCalls).
 *  D, F2 (iii). B2 also reads an array's elements and a call's arguments as one path joined by "/", and a backslash as "/".
 *    D1 covers path-join calls and the gate's P11b. D2 covers array joins, backslash literals and templates, and P11c. D3
 *    keeps the near misses clean.
 *  N, the follow-up's named residuals, each a pinned quiet row:
 *    Q7 R-LATE-SPAWN: a spawn deferred past the window goes unseen (the row clears its timer after the read).
 *    Q8 R-UNREF-CHILD: an unref'd child holds no ProcessWrap handle, so only the window covers it.
 *    Q9 R-REBOUND-CALLEE: a child-process function re-bound through a variable, a promisify() wrapper, call/apply or a
 *    computed key is no site to A1.
 *    Q10 R-COMPOSED-PATH: a document path built from non-literal segments escapes B2.
 *    Q11 R-SHELL-QUOTED: a quoted option value that holds a space splits apart in a shell line and hides the leaf from A2.
 * TERMINAL FOLLOW-UP ROWS (wb-7thm, the R694 follow-up of landing 362, gate of record cmd_593bb938a609; hop 3 of the
 * a9l2.8 chain in the TERMINAL enumerate-the-resolvable form: every enumerated item is bound by a row below, and the
 * census claims exactly the pinned set):
 *  U, F1's cure. A1 reads a callee through calleeOf after unwrapped() removes its outer-expression wrappers at any depth:
 *    parentheses, a non-null assertion, an as or angle-bracket type assertion, satisfies, and a comma expression's last
 *    operand. K4 (parenthesized, the gate's G-ST7), K5 (non-null, G-ST8), K6 (the type assertions, G-ST9), K7
 *    (satisfies) and K8 (the comma tail, G-ST10) each read one site per form, nested forms included, and keep a wrapped
 *    callee that names no child-process function clean.
 *  P, F2's cure. B2 reads every literal and every joined segment run as written and through path.posix.normalize
 *    (documentIn). D4 covers a trailing slash, a dot segment, an empty segment, a ".." inside a segment and a double slash
 *    (the gate's G-DP1, G-DP2, G-DP4 and G-DP5 among them), and keeps a ".." that leaves graphs/ clean.
 *  H, F3's cure. A2 also reads each string and template literal in its shellUnquoted form (backslash escapes, a "$"
 *    opening a quote, and every ' and " removed), as spelled and option-elided; an argv array element is passed to rf
 *    verbatim, so it is never unquoted. I4 covers every MUTATING leaf with its words single-quoted (the gate's G-ST13),
 *    double-quoted, quoted inside a word, backslash-escaped, ANSI-C quoted, quoted with globals between them and quoted
 *    in a template, keeps the read leaves and the near misses clean, and Q11 stays quiet.
 *  X, F7's X5 rider. anchorFindings refuses a receipt in which marked 18 lexes any html token (receiptHtml: a complete or
 *    an unclosed comment, an HTML block, an inline tag), since each renders nothing and a listing line under one drops
 *    out of the rendered receipt while its source line still matches. X5 replays the gate's X5 edit (one complete comment
 *    around the 2026-10-24 listing) and three siblings in memory, and reads the committed receipt clean.
 *  W, F7's landing-263 riders. W11 holds committingCount to constructed descriptor sets that hold committing members,
 *    one per clause of the count (the W11 mutant counts zero); W12 holds SRC_FLOOR to its value and to refusing an empty walk (the W12 mutant sets it
 *    to 0); W13 holds the src walk to node's own recursive listing of src (the W13a-c mutants skip src/ui, src/workflow
 *    or src/workbench/hosts), module by module and byte for byte, so a walker that visits a module but reads it as other
 *    text reds too.
 *  T, the terminal follow-up's named residuals, each a pinned quiet row:
 *    Q12 R-OTHER-CALLEE: a callee written through any other expression (a conditional, a logical operator such as || or ??,
 *    an instantiation expression) is no site to A1.
 *    Q13 R-SHELL-EXPANSION: a leaf word that only a shell expansion spells (brace expansion, a parameter expansion's literal
 *    default, an ANSI-C escape sequence) hides the leaf from A2.
 *  F6 (the witness attribution): WITNESS names the trunk each row group was measured on.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and RF_GRAPH_LEAVES pins `${leaf}:${flag}` as literals.
 * Every pin's case returns a witness held to WITNESS under its own pin, so a case swapped for another passing one reds.
 * OUTSIDE ANCHORS: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-a9l2.8) states the
 * acceptance clauses (a), (b) and (c), and rows A, B and C hold their labels to them verbatim; the receipt
 * docs/workbench/receipts/wb-a9l2.8.md carries the anchor listing every row, pin, leaf and residual is held to, in order (its
 * 2026-10-24 entry continues the listing with rows S, I, K, D and N and residuals Q7-Q11, and its 2026-10-25 entry with rows
 * U, P, H, X, W and T and residuals Q12-Q13), and it lexes with no html token; the wb-pdee row of the same export states
 * F1's cure and F2's families (i), (ii) and (iii), and rows S, I, K and D hold their labels to them verbatim; the wb-7thm
 * row states F1's, F2's and F3's cure shapes and F7's two riders, and rows U, P, H, X and W hold their labels to them
 * verbatim; C9 reads the src registry and the src tool roster; W13 reads node's own recursive listing of src. A member
 * removed from every literal of this file still reds there.
 * Not claimed: this file's judged-set case deleted together with a hollow (census-code self-hollowing); a re-pin, a
 * compaction of the export row, or a reworded owner filing re-states the anchors in the same cut.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, the receipt and the export are
 * only read.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { basename, delimiter, dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Lexer, walkTokens } from "marked";
import ts from "typescript";
import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-a9l2.8";
const RECEIPT_PATH = join(REPO, "docs", "workbench", "receipts", `${BEAD}.md`);
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";
/** The R694 follow-up of landing 263 that adds rows S, I, K, D and N; its row of the tracked bead export anchors their labels. */
const FOLLOW_UP = "wb-pdee";
/** The R694 follow-up of landing 362 (hop 3, the TERMINAL form) that adds rows U, P, H, X, W and T; its row of the tracked
 * bead export anchors the labels of U, P, H, X and W. */
const TERMINAL = "wb-7thm";

interface Leaf {
  readonly leaf: string;
  readonly mutates: boolean;
  /** The leaf's _read / _write row in src/reactive_fiber_cli/cli/registry.py at the pin. */
  readonly line: number;
}
/** rf's sixteen graph leaves at ReactiveFiberCLI 6a251bf73af5, in registry order, with the producer's own mutates flag. */
const RF_GRAPH_LEAVES: readonly Leaf[] = [
  { leaf: "graph.show", mutates: false, line: 794 },
  { leaf: "graph.validate", mutates: false, line: 795 },
  { leaf: "graph.preflight", mutates: false, line: 799 },
  { leaf: "graph.explain", mutates: false, line: 807 },
  { leaf: "graph.diff", mutates: false, line: 817 },
  { leaf: "graph.candidate.create", mutates: true, line: 843 },
  { leaf: "graph.candidate.authorize", mutates: true, line: 855 },
  { leaf: "graph.patch", mutates: true, line: 876 },
  { leaf: "graph.connect", mutates: true, line: 877 },
  { leaf: "graph.disconnect", mutates: true, line: 878 },
  { leaf: "graph.set-optic", mutates: true, line: 879 },
  { leaf: "graph.impact", mutates: false, line: 880 },
  { leaf: "graph.test", mutates: false, line: 892 },
  { leaf: "graph.publish", mutates: true, line: 893 },
  { leaf: "graph.history", mutates: false, line: 894 },
  { leaf: "graph.rollback", mutates: true, line: 895 },
];
const MUTATING = RF_GRAPH_LEAVES.filter(leaf => leaf.mutates).map(leaf => leaf.leaf);
const READING = RF_GRAPH_LEAVES.filter(leaf => !leaf.mutates).map(leaf => leaf.leaf);
/** context.render's dry_run_flag (registry.py:967, NO_COMMIT_FLAG at :192). */
const DRY_RUN_FLAG = "--no-commit";
/** The two halves of README:26's "candidate graph authorization/publication process" at the pin. */
const RECEIPT_LEAVES = ["graph.candidate.authorize", "graph.publish"];
/** rf's workspace directory (locator.py:33) and declared graph document (layout.py:83). */
const GRAPH_DOCUMENT = [".reactive-fiber", "graphs/context.toml"];
const NON_COMMITTING_RENDER = new RegExp(`(?<![A-Za-z0-9])context\\.render ${DRY_RUN_FLAG}(?![A-Za-z0-9-])`);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned by the judged-set case and held to the two outside anchors. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a census asserts Pi's rf argv roster has no graph-publishing or candidate-apply verb and its only rf capability has effectClass read",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) a future committing rf capability registers a non-read effectClass and cites rf's candidate/publication receipt, never a direct graph write (wb-jwc.5)",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) a fixture read-only descriptor/inspection call issues zero graph-mutating rf verbs (argv recorder)",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  },
  {
    id: "M",
    label: "the matcher rows A and B read catches every spelling family of each mutating rf graph leaf and leaves the read leaves and the live render argv clean",
    pins: ["M1", "M2", "M3", "M4", "M5"],
  },
  {
    id: "R",
    label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
  },
  {
    id: "S",
    label: "settle-window rows against CB1 and CB3",
    pins: ["S1", "S2", "S3", "S4", "S5", "S6"],
  },
  {
    id: "I",
    label: "the interleaved global option, spawn('rf',['graph','--workspace',root,'publish'])",
    pins: ["I1", "I2", "I3"],
  },
  {
    id: "K",
    label: "aliased-import and element-access callees",
    pins: ["K1", "K2", "K3"],
  },
  {
    id: "D",
    label: "document path segments, join(dir,'graphs','context.toml') and the array join",
    pins: ["D1", "D2", "D3"],
  },
  {
    id: "N",
    label: "the follow-up's named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q7", "Q8", "Q9", "Q10", "Q11"],
  },
  {
    id: "U",
    label: "calleeOf unwraps outer expressions (ts.skipOuterExpressions, or a loop over parenthesized, non-null, as, satisfies and comma-tail forms) with one K pin per form",
    pins: ["K4", "K5", "K6", "K7", "K8"],
  },
  {
    id: "P",
    label: "B2 reads path.posix.normalize of the joined literal segments, and of each literal, before the GRAPH_DOCUMENT check, with one D pin",
    pins: ["D4"],
  },
  {
    id: "H",
    label: "shell-unquote string literals before leafPattern runs",
    pins: ["I4"],
  },
  {
    id: "X",
    label: "restore the dropped X5 rider",
    pins: ["X5"],
  },
  {
    id: "W",
    label: "the landing-263 W11/W12/W13a-c rider",
    pins: ["W11", "W12", "W13"],
  },
  {
    id: "T",
    label: "the terminal follow-up's named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q12", "Q13"],
  },
];
/** The acceptance rows, in the order the owner filing states its clauses. */
const ACCEPTANCE_ROWS = ["A", "B", "C"];
/** The follow-up rows, in the order the wb-pdee filing states F1's cure and F2's families (i), (ii) and (iii). */
const FOLLOW_UP_ROWS = ["S", "I", "K", "D"];
/** The terminal follow-up rows, in the order the wb-7thm filing states F1's, F2's and F3's cure shapes and F7's two riders. */
const TERMINAL_ROWS = ["U", "P", "H", "X", "W"];
/** The rows whose pins are named residuals. */
const RESIDUAL_ROWS = ["R", "N", "T"];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-COMPOSED",
  Q2: "R-INDIRECT-BINARY",
  Q3: "R-UNPINNED-LEAF",
  Q4: "R-DECLARED-ROUTE",
  Q5: "R-COORDINATED",
  Q6: "R-EFFECT-LEDGER",
  Q7: "R-LATE-SPAWN",
  Q8: "R-UNREF-CHILD",
  Q9: "R-REBOUND-CALLEE",
  Q10: "R-COMPOSED-PATH",
  Q11: "R-SHELL-QUOTED",
  Q12: "R-OTHER-CALLEE",
  Q13: "R-SHELL-EXPANSION",
};

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value.map((item: unknown, index: number) => {
    if (typeof item !== "string") throw new Error(`${field}[${index}] must be a string`);
    return item;
  });
}

// ---------------------------------------------------------------- the outside anchors

/** The owner filing's acceptance clauses (a), (b) and (c), read from the wb-a9l2.8 row of the tracked bead export. */
function exportClauses(text: string): string[] {
  for (const line of text.split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== BEAD || typeof row.notes !== "string") continue;
    const match = /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\. Related: /s.exec(row.notes);
    if (match === null) throw new Error(`the ${BEAD} export row carries no (a)/(b)/(c) acceptance sentence`);
    return [`(a) ${match[1]}`, `(b) ${match[2]}`, `(c) ${match[3]}`];
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}

/** The follow-up filing's cure phrases, read from the wb-pdee row of the tracked bead export: F1's cure and F2's three families. */
function followUpClauses(text: string): string[] {
  for (const line of text.split("\n")) {
    if (!line.includes(`"id":"${FOLLOW_UP}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== FOLLOW_UP || typeof row.notes !== "string") continue;
    const cure = /- F1 [^\n]*? Cure: (.+?)\.\n/.exec(row.notes);
    const families = /- F2 [^\n]*? - \(i\) (.+?) \([^()]*\); \(ii\) (.+?) \([^()]*\); \(iii\) (.+?) \([^()]*\)\. /.exec(row.notes);
    if (cure === null || families === null) throw new Error(`the ${FOLLOW_UP} export row carries no F1 cure or no F2 (i)/(ii)/(iii) sentence`);
    return [cure[1] ?? "", families[1] ?? "", families[2] ?? "", families[3] ?? ""];
  }
  throw new Error(`the tracked bead export holds no ${FOLLOW_UP} row`);
}

/** The terminal follow-up filing's phrases, read from the wb-7thm row of the tracked bead export: F1's, F2's and F3's cure
 * shapes and F7's two riders (the dropped X5 rider and the landing-263 W11/W12/W13a-c rider). */
function terminalClauses(text: string): string[] {
  for (const line of text.split("\n")) {
    if (!line.includes(`"id":"${TERMINAL}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== TERMINAL || typeof row.notes !== "string") continue;
    const callee = /- F1 [^\n]*? Cure shape: (.+?), or a named residual with a pinned quiet row\.\n/.exec(row.notes);
    const path = /- F2 [^\n]*? Cure shape: (.+?), or a named residual\.\n/.exec(row.notes);
    const shell = /- F3 [^\n]*? Cure shape: (.+?), or name this beside Q11\.\n/.exec(row.notes);
    const riders = /- F7 [^\n]*? BIND routing: rides the next follow-up to (.+?); (the landing-263 [^\n]+? rider) was dropped the same way/.exec(row.notes);
    if (callee === null || path === null || shell === null || riders === null) throw new Error(`the ${TERMINAL} export row carries no F1, F2 or F3 cure shape or no F7 rider sentence`);
    return [callee[1] ?? "", path[1] ?? "", shell[1] ?? "", riders[1] ?? "", riders[2] ?? ""];
  }
  throw new Error(`the tracked bead export holds no ${TERMINAL} row`);
}

/** Every html token marked 18 lexes in a receipt, block or inline: a complete or an unclosed comment, an HTML block, a tag.
 * Each renders nothing, so a listing line under one drops out of the rendered receipt while its source line still matches. */
function receiptHtml(receipt: string): string[] {
  const html: string[] = [];
  walkTokens(new Lexer().lex(receipt), token => {
    if (token.type === "html") html.push(token.raw);
  });
  return html;
}

const ROW_LINE = /^- Row ([A-Z]) \(pins ([A-Z0-9]+(?:, [A-Z0-9]+)*)\): (.+)$/;
const LEAF_LINE = /^- Leaf (graph\.[a-z.-]+): (mutates|reads) \(registry\.py:(\d+)\)$/;
const RESIDUAL_LINE = /^- Residual (Q\d+): (R-[A-Z-]+)$/;

/** Every disagreement between the census literals, the receipt's anchor listing and the export's acceptance clauses. */
function anchorFindings(rows: readonly Row[], leaves: readonly Leaf[], residuals: Readonly<Record<string, string>>, receipt: string, clauses: readonly string[], followUp: readonly string[], terminal: readonly string[]): string[] {
  const lines = receipt.split("\n");
  const listedRows = lines.flatMap(line => {
    const match = ROW_LINE.exec(line);
    return match === null ? [] : [{ id: match[1] ?? "", label: match[3] ?? "", pins: (match[2] ?? "").split(", ") }];
  });
  const listedLeaves = lines.flatMap(line => {
    const match = LEAF_LINE.exec(line);
    return match === null ? [] : [{ leaf: match[1] ?? "", mutates: match[2] === "mutates", line: Number(match[3]) }];
  });
  const listedResiduals = Object.fromEntries(lines.flatMap(line => {
    const match = RESIDUAL_LINE.exec(line);
    return match === null ? [] : [[match[1] ?? "", match[2] ?? ""] as const];
  }));
  const findings: string[] = [];
  if (JSON.stringify(listedRows) !== JSON.stringify(rows.map(({ id, label, pins }) => ({ id, label, pins: [...pins] })))) findings.push("receipt rows differ");
  if (JSON.stringify(listedLeaves) !== JSON.stringify(leaves)) findings.push("receipt leaves differ");
  if (JSON.stringify(listedResiduals) !== JSON.stringify(residuals)) findings.push("receipt residuals differ");
  const labels = ACCEPTANCE_ROWS.map(id => rows.find(row => row.id === id)?.label ?? "");
  if (JSON.stringify(labels) !== JSON.stringify(clauses)) findings.push("acceptance labels differ from the export");
  const followUpLabels = FOLLOW_UP_ROWS.map(id => rows.find(row => row.id === id)?.label ?? "");
  if (JSON.stringify(followUpLabels) !== JSON.stringify(followUp)) findings.push("follow-up labels differ from the export");
  const terminalLabels = TERMINAL_ROWS.map(id => rows.find(row => row.id === id)?.label ?? "");
  if (JSON.stringify(terminalLabels) !== JSON.stringify(terminal)) findings.push("terminal labels differ from the export");
  if (receiptHtml(receipt).length > 0) findings.push("receipt carries HTML");
  return findings;
}

// ---------------------------------------------------------------- the src readers

/** Every regular file below a directory (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(path);
    return entry.isFile() ? [path] : [];
  });
}
const SRC_FLOOR = 100;
function srcModules(): { readonly name: string; readonly text: string }[] {
  return filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => ({ name: relative(REPO, file), text: readFileSync(file, "utf8") }));
}
function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/** One leaf's spelling family: its words in any case, joined directly or by any run of white space, ".", "_" or "-". */
function leafPattern(leaf: string): RegExp {
  return new RegExp(`(?<![A-Za-z0-9])${leaf.split(/[.-]/).join("[\\s._-]*")}(?![A-Za-z0-9])`, "i");
}
function leavesIn(text: string, leaves: readonly string[]): string[] {
  return leaves.filter(leaf => leafPattern(leaf).test(text));
}
/** Whether a text names rf's graph document location, read as written and through path.posix.normalize (wb-7thm row P), so a
 * trailing slash, a dot or empty segment, a ".." inside a segment or a double slash still spells it. */
function documentIn(text: string): boolean {
  const folded = text.toLowerCase().replaceAll("\\", "/");
  return [folded, posix.normalize(folded)].some(reading => GRAPH_DOCUMENT.some(part => reading.includes(part)));
}
/** A shell line with its quoting removed (wb-7thm row H): a backslash escape keeps its character, a "$" opening a quote is
 * dropped, then every ' and " is dropped, so a line whose leaf words are quoted reads as its words. Brace expansion and
 * ANSI-C escape sequences are never expanded (residual Q13). */
function shellUnquoted(text: string): string {
  return text
    .replace(/\\(.)/gs, "$1")
    .replace(/\$(?=['"])/g, "")
    .replace(/['"]/g, "");
}
/** rf's value-taking globals at the pin (parser.py:286 RF_VALUE_OPTIONS): spelled apart, each consumes the next token. */
const RF_VALUE_OPTIONS = ["--workspace", "--actor", "--color"];
/** A token run as rf's group parsers read it: rf accepts its CLI-A25 globals at every group level (parser.py:251-260 and :3458),
 * so every option token, the value a value option consumes and every runtime token (EXPR) is elided between a leaf's words. */
function optionElided(tokens: readonly string[]): string {
  const kept: string[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] ?? "";
    if (RF_VALUE_OPTIONS.includes(token)) index += 1;
    else if (!token.startsWith("-") && token !== EXPR) kept.push(token);
  }
  return kept.join(" ");
}

const EXPR = "<expr>";
interface LiteralScan {
  readonly leafHits: string[];
  readonly documentHits: string[];
  readonly renderArgv: number;
}
/** One module's string and template literals and argv arrays (non-literal elements read as EXPR) against MUTATING and
 * GRAPH_DOCUMENT; renderArgv counts the arrays holding "context" then "render". A literal names a leaf as spelled or in its
 * optionElided reading (strings and templates split at white space, an array element by element), and a string or template
 * also in its shellUnquoted reading, spelled and option-elided, once per leaf; an array's elements and a call's arguments
 * are also read as one path joined by "/". */
function scanLiterals(fileName: string, text: string): LiteralScan {
  const leafHits: string[] = [];
  const documentHits: string[] = [];
  let renderArgv = 0;
  const judge = (form: string, spelled: string, tokens: readonly string[], paths: readonly string[], shell: boolean): void => {
    const readings = [spelled, optionElided(tokens)];
    if (shell) {
      const unquoted = shellUnquoted(spelled);
      readings.push(unquoted, optionElided(unquoted.split(/\s+/)));
    }
    for (const leaf of MUTATING) if (readings.some(reading => leafPattern(leaf).test(reading))) leafHits.push(`${fileName} ${form} ${leaf}`);
    if ([spelled, ...paths].some(documentIn)) documentHits.push(`${fileName} ${form}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge("literal", node.text, node.text.split(/\s+/), [], true);
    else if (ts.isTemplateExpression(node)) {
      const spelled = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(EXPR);
      judge("template", spelled, spelled.split(/\s+/), [], true);
    } else if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : EXPR));
      judge("argv", words.join(" "), words, [words.join("/")], false);
      if (words.some((word, index) => word === "context" && words[index + 1] === "render")) renderArgv += 1;
    } else if (ts.isCallExpression(node)) {
      const segments = node.arguments.map(argument => (ts.isStringLiteralLike(argument) ? argument.text : EXPR));
      if (documentIn(segments.join("/"))) documentHits.push(`${fileName} call`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return { leafHits, documentHits, renderArgv };
}

const CHILD_PROCESS_CALLS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
interface SpawnSite {
  readonly file: string;
  readonly within: string;
  readonly callee: string;
  readonly argv: string;
}
interface SpawnScan {
  readonly sites: SpawnSite[];
  /** Calls whose binary is a string literal naming anything but rf (git, forge, ...): the scan's non-vacuity. */
  readonly otherBinaryCalls: number;
}
/** The enclosing named function of a node, for a site's location. */
function scopeName(node: ts.Node, within: string): string {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined) return node.name.text;
  if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name)) return node.name.text;
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))) return node.name.text;
  return within;
}
const CHILD_PROCESS_MODULE = /^(?:node:)?child_process$/;
/** Whether a node spells the child_process module specifier anywhere below it (a require() or import() argument). */
function loadsChildProcess(node: ts.Node): boolean {
  if (ts.isStringLiteralLike(node) && CHILD_PROCESS_MODULE.test(node.text)) return true;
  return ts.forEachChild(node, loadsChildProcess) === true;
}
/** The local names one module binds to CHILD_PROCESS_CALLS members of child_process: named imports, renamed or not, and
 * destructured require() and import() bindings. */
function childProcessAliases(source: ts.SourceFile): Map<string, string> {
  const aliases = new Map<string, string>();
  const bind = (original: string, local: string): void => {
    if (CHILD_PROCESS_CALLS.has(original)) aliases.set(local, original);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      const bindings = node.importClause?.namedBindings;
      if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) bind((element.propertyName ?? element.name).text, element.name.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && loadsChildProcess(node.initializer)) {
      for (const element of node.name.elements) {
        const property = element.propertyName ?? element.name;
        if (ts.isIdentifier(property) && ts.isIdentifier(element.name)) bind(property.text, element.name.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return aliases;
}
/** A callee with its outer-expression wrappers removed at any depth (wb-7thm row U): parentheses, a non-null assertion, an
 * as or angle-bracket type assertion, satisfies, and a comma expression's last operand. Any other expression stays as
 * written (residual Q12). */
function unwrapped(expression: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(expression) || ts.isNonNullExpression(expression) || ts.isAsExpression(expression) || ts.isTypeAssertionExpression(expression) || ts.isSatisfiesExpression(expression)) return unwrapped(expression.expression);
  if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.CommaToken) return unwrapped(expression.right);
  return expression;
}
/** A call's child-process function, read after unwrapped(): an identifier read through its child_process alias, a property
 * name, or a literal element-access key. */
function calleeOf(written: ts.Expression, aliases: ReadonlyMap<string, string>): string {
  const expression = unwrapped(written);
  if (ts.isIdentifier(expression)) return aliases.get(expression.text) ?? expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  if (ts.isElementAccessExpression(expression) && ts.isStringLiteralLike(expression.argumentExpression)) return expression.argumentExpression.text;
  return "";
}
/** Child-process calls whose first argument is a string literal: those naming rf (the bare name, a path ending in /rf, or
 * a shell line whose first word is one) are the module's rf spawn sites. A callee is read through calleeOf. */
function scanSpawns(fileName: string, text: string): SpawnScan {
  const source = parse(fileName, text);
  const aliases = childProcessAliases(source);
  const sites: SpawnSite[] = [];
  let otherBinaryCalls = 0;
  const visit = (node: ts.Node, within: string): void => {
    const scope = scopeName(node, within);
    if (ts.isCallExpression(node)) {
      const callee = calleeOf(node.expression, aliases);
      const first = node.arguments[0];
      if (CHILD_PROCESS_CALLS.has(callee) && first !== undefined && ts.isStringLiteralLike(first)) {
        if (basename(first.text.trim().split(/\s+/)[0] ?? "") === "rf") sites.push({ file: fileName, within: scope, callee, argv: node.arguments[1]?.getText(source) ?? "" });
        else otherBinaryCalls += 1;
      }
    }
    ts.forEachChild(node, child => visit(child, scope));
  };
  visit(source, "<module>");
  return { sites, otherBinaryCalls };
}

interface RegistrationSite {
  readonly file: string;
  readonly within: string;
  readonly id: string;
  readonly effectClass: string;
}
function propertyOf(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const property of object.properties) {
    if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === name) return property.initializer;
  }
  return undefined;
}
/** Object literals `descriptor: { id: "reactivefiber...", effectClass: ... }` in one module. */
function scanRegistrations(fileName: string, text: string): RegistrationSite[] {
  const sites: RegistrationSite[] = [];
  const visit = (node: ts.Node, within: string): void => {
    const scope = scopeName(node, within);
    if (ts.isObjectLiteralExpression(node)) {
      const descriptor = propertyOf(node, "descriptor");
      if (descriptor !== undefined && ts.isObjectLiteralExpression(descriptor)) {
        const id = propertyOf(descriptor, "id");
        const effectClass = propertyOf(descriptor, "effectClass");
        if (id !== undefined && ts.isStringLiteralLike(id) && id.text.startsWith(RF_PREFIX)) {
          sites.push({ file: fileName, within: scope, id: id.text, effectClass: effectClass !== undefined && ts.isStringLiteralLike(effectClass) ? effectClass.text : EXPR });
        }
      }
    }
    ts.forEachChild(node, child => visit(child, scope));
  };
  visit(parse(fileName, text), "<module>");
  return sites;
}

/** renderArgv's array literals in source order, each element a literal, EXPR or a spread. */
function renderArgvArrays(): string[][] {
  const file = join(REPO, "src", "workbench", "providers", "reactivefiber.ts");
  const arrays: string[][] = [];
  let found = 0;
  const collect = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      arrays.push(node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ts.isSpreadElement(element) ? `...${EXPR}` : EXPR)));
    }
    ts.forEachChild(node, collect);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
      found += 1;
      ts.forEachChild(node, collect);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(file, readFileSync(file, "utf8")));
  expect(found, "renderArgv must be declared once in providers/reactivefiber.ts").toBe(1);
  return arrays;
}

// ---------------------------------------------------------------- the committing-capability rule (acceptance (b))

interface RfDescriptorShape {
  readonly id: string;
  readonly effectClass: string;
  readonly contractSource?: string;
}
function committingFindings(descriptors: readonly RfDescriptorShape[]): string[] {
  const findings: string[] = [];
  for (const descriptor of descriptors) {
    if (!descriptor.id.startsWith(RF_PREFIX)) continue;
    const source = descriptor.contractSource;
    if (source === undefined) {
      findings.push(`${descriptor.id}: undeclared contract`);
      continue;
    }
    const leaves = leavesIn(source, MUTATING);
    const direct = documentIn(source);
    if (NON_COMMITTING_RENDER.test(source) && leaves.length === 0 && !direct) continue;
    if (descriptor.effectClass === "read") findings.push(`${descriptor.id}: read effectClass on a committing capability`);
    if (direct) findings.push(`${descriptor.id}: direct graph write`);
    if (leaves.length > 0) for (const leaf of RECEIPT_LEAVES) if (!leaves.includes(leaf)) findings.push(`${descriptor.id}: no ${leaf} receipt`);
  }
  return findings;
}
function committingCount(descriptors: readonly RfDescriptorShape[]): number {
  return descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX) && !(descriptor.contractSource !== undefined && NON_COMMITTING_RENDER.test(descriptor.contractSource) && leavesIn(descriptor.contractSource, MUTATING).length === 0 && !documentIn(descriptor.contractSource))).length;
}
const CONTRACT = "rf@future:reactive-fiber.cli/v1";
const PUBLISHING_CONTRACT = `${CONTRACT} graph.candidate.authorize then graph.publish`;

// ---------------------------------------------------------------- the registries

function rfShapes(registry: CapabilityRegistry): RfDescriptorShape[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(RF_PREFIX))
    .map(descriptor => ({ id: descriptor.id, effectClass: descriptor.effectClass, ...(descriptor.contractSource === undefined ? {} : { contractSource: descriptor.contractSource }) }));
}
async function nativeRegistry(root: string): Promise<CapabilityRegistry> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, root);
  return registry;
}
function injectedRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    throw new Error("the injected reader is never invoked by this census");
  }, root);
  return registry;
}
function boundRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });

// ---------------------------------------------------------------- the argv recorder

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: Array<() => Promise<void>> = [];
/** The PATH every pin starts on (S6): one fresh, empty scratch directory, which recorder() replaces. Between pins PATH names
 * that directory after its removal, so a stray rf spawn (a pin with no recorder, or a timer that fires after its pin ends)
 * finds no binary and never the host's rf. */
let isolatedPath = "";
beforeEach(() => {
  isolatedPath = scratchDir("rf-graph-mutation-path-");
  process.env.PATH = isolatedPath;
});
afterEach(async () => {
  for (const close of closers.splice(0)) await close();
  process.env.PATH = isolatedPath;
  removeScratch(...scratches.splice(0));
});
afterAll(() => {
  process.env.PATH = oldPath;
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
/** Installs the stand-in rf as the ONLY PATH entry: it appends its argv to the log, then prints `reply(root)`. */
function recorder(reply: (root: string) => Json): Recorder {
  const root = scratchDir("rf-graph-mutation-root-");
  const bin = scratchDir("rf-graph-mutation-bin-");
  const log = join(bin, "spawns.jsonl");
  const script = join(bin, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(reply(root)))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = bin;
  return { root, log };
}
function spawnsOf(record: Recorder): string[][] {
  if (!existsSync(record.log)) return [];
  return readFileSync(record.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map((line, index) => stringsOf(JSON.parse(line), `spawn ${index}`));
}
/** The recorded argv with the bound root written as <root>. */
function argvWitness(record: Recorder): Json {
  return spawnsOf(record).map(argv => argv.map(token => (token === record.root ? "<root>" : token)));
}
function mutatingWords(record: Recorder): string[] {
  return spawnsOf(record).flatMap(argv => leavesIn(argv.join(" "), MUTATING));
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function caught(run: () => Promise<unknown>): Promise<unknown> {
  try {
    await run();
  } catch (error) {
    return error;
  }
  throw new Error("expected a refusal");
}

// ---------------------------------------------------------------- the settle window (row S)

/** The settle window: work a call deferred (a microtask, an immediate, a timer shorter than the window) runs before the read. */
const SETTLE_WINDOW_MS = 3_000;
/** The bound on the wait, after the window, for the children this worker still runs. */
const SETTLE_DRAIN_MS = 30_000;
const pause = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
/** The child processes this worker runs now: its event loop's ProcessWrap handles (an unref'd child holds none, residual Q8). */
function runningChildren(): number {
  return process.getActiveResourcesInfo().filter(resource => resource === "ProcessWrap").length;
}
interface Settled {
  readonly window: number;
  readonly running: number;
  readonly spawns: number;
}
/** Waits the window, then until no child started since `baseline` still runs (bounded), then reads the argv recorder. */
async function settle(record: Recorder, baseline: number): Promise<Settled> {
  await pause(SETTLE_WINDOW_MS);
  const deadline = Date.now() + SETTLE_DRAIN_MS;
  while (runningChildren() > baseline && Date.now() < deadline) await pause(25);
  return { window: SETTLE_WINDOW_MS, running: Math.max(0, runningChildren() - baseline), spawns: spawnsOf(record).length };
}
/** Waits until a child has exited (an exit code or a signal is set), bounded by SETTLE_DRAIN_MS. */
async function exited(child: ChildProcess): Promise<boolean> {
  const deadline = Date.now() + SETTLE_DRAIN_MS;
  while (child.exitCode === null && child.signalCode === null && Date.now() < deadline) await pause(25);
  return child.exitCode !== null || child.signalCode !== null;
}

interface ToolReply {
  readonly isError: boolean;
  readonly payload: unknown;
}
/** The real curated MCP server behind a real MCP client, exposing only the preview. */
async function curated(registry: CapabilityRegistry, root: string): Promise<(name: string, args: Record<string, unknown>) => Promise<ToolReply>> {
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, "reactivefiber:render"],
    principal: { id: "census-user", role: "reviewer" },
    workspace: root,
    invocationId: "rf-graph-mutation-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-graph-mutation-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return async (name, args) => {
    const result = await client.callTool({ name, arguments: args });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) };
  };
}
function replyKind(reply: ToolReply): Json {
  const payload = reply.payload;
  if (!isObject(payload)) throw new Error("expected an object reply");
  const category = payload.category;
  return { isError: reply.isError, kind: String(payload.kind), ...(typeof category === "string" ? { category } : {}) };
}

/** The input each C4-C6 pin renders: one per form the registered descriptor admits (C9 holds them to it). */
const ARMS: ReadonlyArray<{ readonly pin: string; readonly input: Readonly<Record<string, string>> }> = [
  { pin: "C4", input: { model: "model-fixture", task: "task-fixture" } },
  { pin: "C5", input: { view: "swarm.worker", taskId: "bead-fixture-000" } },
  { pin: "C6", input: { view: "swarm.worker", taskId: "bead-fixture-000", model: "model-fixture" } },
];
/** The Claude tools C3 and C7 call (C9 holds them to CLAUDE_CAPABILITY_TOOL_NAMES). */
const TOOL_PINS: ReadonlyArray<{ readonly pin: string; readonly tools: readonly string[] }> = [
  { pin: "C3", tools: ["capability_discover", "capability_contract"] },
  { pin: "C7", tools: ["capability_invoke"] },
];
function armInput(pin: string): Readonly<Record<string, string>> {
  const arm = ARMS.find(entry => entry.pin === pin);
  if (arm === undefined) throw new Error(`no arm for ${pin}`);
  return arm.input;
}
async function renderArm(pin: string): Promise<Json> {
  const record = recorder(root => fullShapeRf(root));
  const reading = await boundRegistry(record.root).invoke(PREVIEW_ID, armInput(pin), invokeContext());
  expect(reading).toMatchObject({ workspaceRoot: record.root });
  expect(mutatingWords(record)).toEqual([]);
  return { spawns: spawnsOf(record).length, argv: argvWitness(record), mutating: mutatingWords(record) };
}
/** The key sets of every input a oneOf schema admits: each arm's required keys plus each subset of its optional ones. */
function inputForms(schema: Record<string, unknown>): string[][] {
  const arms = schema.oneOf;
  if (!Array.isArray(arms)) throw new Error("expected the oneOf input schema");
  return arms.flatMap((arm: unknown) => {
    if (!isObject(arm) || !isObject(arm.properties)) throw new Error("expected an object input arm");
    const required = stringsOf(arm.required, "arm.required");
    const optional = Object.keys(arm.properties).filter(key => !required.includes(key));
    let subsets: string[][] = [[]];
    for (const key of optional) subsets = subsets.concat(subsets.map(subset => [...subset, key]));
    return subsets.map(subset => [...required, ...subset].sort());
  });
}

/** A reading whose producer reports a commit: the preview's own refusals. */
const COMMIT_VARIANTS: ReadonlyArray<readonly [string, (result: JsonObject) => JsonObject]> = [
  ["ephemeral false", result => ({ ...result, ephemeral: false })],
  ["render_id set", result => ({ ...result, render_id: `rfr_${"c".repeat(22)}` })],
  ["commit_seq set", result => ({ ...result, commit_seq: 1 })],
  ["storage write", result => ({ ...result, work: { ...objectOf(result.work, "result.work"), storage_write_count: 1 } })],
];
function withResult(edit: (result: JsonObject) => JsonObject): (root: string) => Json {
  return root => {
    const envelope = fullShapeRf(root);
    return { ...envelope, result: edit(objectOf(envelope.result, "fullShapeRf result")) };
  };
}

// ---------------------------------------------------------------- the matcher samples

function hitsOf(text: string): number {
  return scanLiterals("sample.ts", text).leafHits.length;
}
const words = (leaf: string): string[] => leaf.split(".");
/** A tab joint, built rather than typed (standing rule 5). */
const TAB = String.fromCodePoint(9);
const quoted = (items: readonly string[]): string => items.map(item => JSON.stringify(item)).join(", ");
function documentsOf(text: string): number {
  return scanLiterals("sample.ts", text).documentHits.length;
}
function sitesOf(text: string): number {
  return scanSpawns("sample.ts", text).sites.length;
}
/** rf's CLI-A25 globals at the pin as array elements, one spelling each: GLOBAL_OPTIONS (parser.py:251-260) and VERBOSE_FLAGS
 * (:277), accepted at every group level (:3458), the RF_VALUE_OPTIONS (:286) with their value apart or after "=", then a
 * spread and a runtime word. */
const GLOBAL_ELEMENTS: readonly string[] = [
  '"--workspace", root',
  '"--workspace", "/srv/ws"',
  '"--workspace=/srv/ws"',
  '"--actor", "seat-1"',
  '"--json"',
  '"--no-input"',
  '"--yes"',
  '"--debug"',
  '"--color", "never"',
  '"--color=always"',
  '"--no-retry"',
  '"-v"',
  '"-vv"',
  '"--verbose"',
  "...globals",
  "flag",
];
/** A leaf's words as array elements with one global spelling after every word but the last. */
const interleaved = (leaf: string, global: string): string => words(leaf).map(word => JSON.stringify(word)).join(`, ${global}, `);
/** The shell-line joints I2 puts between a leaf's words. */
const SHELL_JOINTS: readonly string[] = [" --json ", " --workspace /srv/ws ", " --color=never -v ", " --actor seat-1 --no-input "];
/** The gate's LEG-2 probe sources (cmd_5f0f6e9c5468 PREP), each a whole module. */
const GATE_PROBES: Readonly<Record<string, string>> = {
  P03: 'import { spawn as launch } from "node:child_process";\nexport function fwGateProbe(): void { launch("rf", ["graph", "show", "--json"]); }\n',
  P04: 'import * as cp from "node:child_process";\nexport function fwGateProbe(): void { cp["spawn"]("rf", ["graph", "show"]); }\n',
  P04b: 'import * as cp from "node:child_process";\nexport function fwGateProbe(): void { cp.spawn("rf", ["graph", "show"]); }\n',
  P07: 'import { spawn } from "node:child_process";\nexport function fwGateProbe(root: string): void { spawn("rf", ["graph", "--workspace", root, "publish"]); }\n',
  P07b: 'import { spawn as launch } from "node:child_process";\nexport function fwGateProbe(): void { launch("rf", ["graph", "--json", "publish"]); }\n',
  P11b: 'import { join } from "node:path";\nexport const fwGateProbe = (workspaceDir: string): string => join(workspaceDir, "graphs", "context.toml");\n',
  P11c: 'export const fwGateProbe = (): string => ["graphs", "context.toml"].join("/");\n',
  // The landing-362 gate's LEG-2 survivors (cmd_593bb938a609 PREP), spelled as the BIND verdict quotes them, each a whole module.
  "G-ST7": 'import { spawn } from "node:child_process";\nexport function fwGateProbe(): void { (spawn)("rf", ["graph", "show"]); }\n',
  "G-ST8": 'import { spawn } from "node:child_process";\nexport function fwGateProbe(): void { spawn!("rf", ["graph", "show"]); }\n',
  "G-ST9": 'import { spawn } from "node:child_process";\nexport function fwGateProbe(): void { (spawn as typeof spawn)("rf", ["graph", "show"]); }\n',
  "G-ST10": 'import { spawn } from "node:child_process";\nexport function fwGateProbe(): void { (0, spawn)("rf", ["graph", "show"]); }\n',
  "G-ST13": "export const fwGateProbe = (): string => \"rf 'graph' 'publish'\";\n",
  "G-DP1": 'import { join } from "node:path";\nexport const fwGateProbe = (dir: string): string => join(dir, "graphs/", "context.toml");\n',
  "G-DP2": 'import { join } from "node:path";\nexport const fwGateProbe = (dir: string): string => join(dir, "graphs", "./context.toml");\n',
  "G-DP4": 'export const fwGateProbe = (): string => ["graphs/", "context.toml"].join("");\n',
  "G-DP5": 'import { join } from "node:path";\nexport const fwGateProbe = (dir: string): string => join(dir, "graphs", "", "context.toml");\n',
};
function probe(id: string): string {
  const source = GATE_PROBES[id];
  if (source === undefined) throw new Error(`no gate probe ${id}`);
  return source;
}

// ---------------------------------------------------------------- the cases

/** Each pin's case: it asserts its own outcome and returns the witness WITNESS holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const modules = srcModules();
    const scans = modules.map(module => scanSpawns(module.name, module.text));
    const sites = scans.flatMap(scan => scan.sites);
    const srcFloorMet = modules.length >= SRC_FLOOR;
    const otherBinariesSeen = scans.reduce((sum, scan) => sum + scan.otherBinaryCalls, 0) >= 1;
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(otherBinariesSeen, "the scan read no literal child-process call at all").toBe(true);
    expect(sites).toHaveLength(1);
    return { srcFloorMet, otherBinariesSeen, sites: sites.map(site => ({ ...site })) };
  },
  A2: async () => {
    const modules = srcModules();
    const scans = modules.map(module => scanLiterals(module.name, module.text));
    const leafHits = scans.flatMap(scan => scan.leafHits);
    const renderArgvSeen = scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1;
    const srcFloorMet = modules.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(renderArgvSeen, "the scan never read the live context render argv").toBe(true);
    expect(leafHits, "a mutating rf graph leaf spelled in src").toEqual([]);
    return { srcFloorMet, renderArgvSeen, leafHits, forbidden: [...MUTATING] };
  },
  A3: async () => {
    const arrays = renderArgvArrays();
    const returned = arrays.find(array => array.includes("context"));
    expect(returned, "renderArgv returns no context render argv").toBeDefined();
    const carriesDryRunFlag = returned?.includes(DRY_RUN_FLAG) === true;
    expect(carriesDryRunFlag).toBe(true);
    expect(arrays.flatMap(array => leavesIn(array.join(" "), MUTATING))).toEqual([]);
    return { arrays, carriesDryRunFlag };
  },
  A4: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const native = rfShapes(await nativeRegistry(root));
    const injected = rfShapes(injectedRegistry(root));
    const reading = (shapes: readonly RfDescriptorShape[]): Json =>
      shapes.map(shape => ({
        id: shape.id,
        effectClass: shape.effectClass,
        carrier: shape.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
        nonCommittingRender: shape.contractSource !== undefined && NON_COMMITTING_RENDER.test(shape.contractSource),
      }));
    for (const shapes of [native, injected]) {
      expect(shapes.map(shape => shape.id)).toEqual([PREVIEW_ID]);
      expect(shapes.map(shape => shape.effectClass)).toEqual(["read"]);
    }
    expect(RECONCILE_EVIDENCE_READS.reactivefiber).toStrictEqual([PREVIEW_ID]);
    return { native: reading(native), injected: reading(injected), reconcile: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])] };
  },
  A5: async () => {
    const sites = srcModules().flatMap(module => scanRegistrations(module.name, module.text));
    expect(sites.map(site => site.effectClass)).toEqual(["read", "read"]);
    return { sites: sites.map(site => ({ ...site })) };
  },
  B1: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const shapes = [...rfShapes(await nativeRegistry(root)), ...rfShapes(injectedRegistry(root))];
    const findings = committingFindings(shapes);
    expect(shapes.length).toBeGreaterThanOrEqual(2);
    expect(findings).toEqual([]);
    return { judged: shapes.length, committing: committingCount(shapes), findings };
  },
  B2: async () => {
    const modules = srcModules();
    const documentHits = modules.flatMap(module => scanLiterals(module.name, module.text).documentHits);
    const srcFloorMet = modules.length >= SRC_FLOOR;
    expect(srcFloorMet).toBe(true);
    expect(documentHits, "a src literal spells rf's graph document location").toEqual([]);
    return { srcFloorMet, documentHits, document: [...GRAPH_DOCUMENT] };
  },
  B3: async () => {
    const findings = committingFindings([{ id: "reactivefiber.graph.publish", effectClass: "read", contractSource: PUBLISHING_CONTRACT }]);
    expect(findings).toHaveLength(1);
    return { findings };
  },
  B4: async () => {
    const cases: Json = [`${CONTRACT} graph.patch`, `${CONTRACT} graph.candidate.authorize`, `${CONTRACT} graph.publish`, `${CONTRACT} graph.rollback`].map(contractSource => ({
      contractSource,
      findings: committingFindings([{ id: "reactivefiber.graph.edit", effectClass: "write", contractSource }]),
    }));
    return { cases };
  },
  B5: async () => {
    const cases: Json = [
      { id: "reactivefiber.graph.document", effectClass: "write", contractSource: `${PUBLISHING_CONTRACT}; writes .reactive-fiber/graphs/context.toml` },
      { id: "reactivefiber.graph.direct", effectClass: "write", contractSource: `${CONTRACT} context.render ${DRY_RUN_FLAG} then GRAPHS/CONTEXT.TOML` },
      { id: "reactivefiber.render.unknown", effectClass: "read" },
    ].map(descriptor => ({ id: descriptor.id, findings: committingFindings([descriptor]) }));
    return { cases };
  },
  B6: async () => {
    const admitted = ["write", "external", "unknown"].map(effectClass => committingFindings([{ id: "reactivefiber.graph.publish", effectClass, contractSource: PUBLISHING_CONTRACT }]));
    const committingRender = ["read", "write"].map(effectClass => committingFindings([{ id: "reactivefiber.render.commit", effectClass, contractSource: `${CONTRACT} context.render --idempotency-key K` }]));
    expect(admitted).toEqual([[], [], []]);
    return { admitted, committingRender };
  },
  C1: async () => {
    const record = recorder(root => fullShapeRf(root));
    const registry = await nativeRegistry(record.root);
    const ids = registry.catalogSnapshot().map(entry => entry.descriptor.id);
    const discovered = registry.discover({ grants: ids.map(id => `discover:${id}`) }).map(descriptor => descriptor.id);
    const effectClass = registry.effectClassOf(PREVIEW_ID) ?? "unregistered";
    expect(spawnsOf(record)).toEqual([]);
    return { discovered: discovered.filter(id => id.startsWith(RF_PREFIX)), effectClass, nativeFloorMet: ids.length >= 4, spawns: spawnsOf(record).length };
  },
  C2: async () => {
    const record = recorder(root => fullShapeRf(root));
    const error = await caught(() => boundRegistry(record.root).inspect(PREVIEW_ID, { ref: "inspect-fixture" }, { grants: [`inspect:${PREVIEW_ID}`], signal: new AbortController().signal }));
    expect(spawnsOf(record)).toEqual([]);
    return { ...refusalOf(error), spawns: spawnsOf(record).length };
  },
  C3: async () => {
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const replies = [
      replyKind(await call("capability_discover", {})),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID })),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID, mode: "inspect", capabilityVersion: "1.0.0", ref: "inspect-fixture" })),
    ];
    expect(spawnsOf(record)).toEqual([]);
    return { replies, spawns: spawnsOf(record).length };
  },
  C4: async () => renderArm("C4"),
  C5: async () => renderArm("C5"),
  C6: async () => renderArm("C6"),
  C7: async () => {
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const reply = await call("capability_invoke", { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: armInput("C4") });
    expect(mutatingWords(record)).toEqual([]);
    return { reply: replyKind(reply), spawns: spawnsOf(record).length, argv: argvWitness(record) };
  },
  C8: async () => {
    const outcomes: Json[] = [];
    for (const [variant, edit] of COMMIT_VARIANTS) {
      const record = recorder(withResult(edit));
      const error = await caught(() => boundRegistry(record.root).invoke(PREVIEW_ID, armInput("C4"), invokeContext()));
      outcomes.push({ variant, ...refusalOf(error), spawns: spawnsOf(record).length, mutating: mutatingWords(record) });
    }
    return { outcomes };
  },
  C9: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const schema = boundRegistry(root).catalogSnapshot()[0]?.descriptor.inputSchema ?? {};
    const forms = inputForms(schema);
    const armForms = ARMS.map(arm => Object.keys(arm.input).sort());
    const tools = [...CLAUDE_CAPABILITY_TOOL_NAMES].sort();
    const toolPins = TOOL_PINS.flatMap(entry => entry.tools).sort();
    expect(armForms).toEqual(forms);
    expect(toolPins).toEqual(tools);
    return { forms, armPins: ARMS.map(arm => arm.pin), tools, toolPins: TOOL_PINS.map(entry => entry.pin) };
  },
  M1: async () => {
    const caughtLeaves = MUTATING.map(leaf => hitsOf(`spawn("rf", ["--workspace", w, ${quoted(words(leaf))}, "--json"]);`) >= 1);
    expect(caughtLeaves.every(Boolean)).toBe(true);
    return { argv: caughtLeaves };
  },
  M2: async () => {
    const caughtLeaves = MUTATING.map(leaf => [`const id = "${leaf}";`, `const id = "reactivefiber.${leaf}";`].map(hitsOf));
    expect(caughtLeaves.flat().every(count => count >= 1)).toBe(true);
    return { dotted: caughtLeaves };
  },
  M3: async () => {
    const spellings = (leaf: string): string[] => [
      `rf ${words(leaf).join(" ")} --candidate c --json`,
      words(leaf).join("_").toUpperCase(),
      words(leaf).join("-"),
      `rf  ${words(leaf).join(TAB)}`,
    ];
    const caughtLeaves = MUTATING.map(leaf => spellings(leaf).map(spelled => hitsOf(`const cmd = ${JSON.stringify(spelled)};`)));
    expect(caughtLeaves.flat().every(count => count >= 1)).toBe(true);
    return { spaced: caughtLeaves };
  },
  M4: async () => {
    const caughtLeaves = MUTATING.map(leaf => hitsOf(["const cmd = `rf ", words(leaf).join(" "), " --candidate $", "{candidate}`;"].join("")) >= 1);
    expect(caughtLeaves.every(Boolean)).toBe(true);
    return { template: caughtLeaves };
  },
  M5: async () => {
    const readLeaves = READING.map(leaf => [`spawn("rf", [${quoted(words(leaf))}]);`, `const id = "${leaf}";`, `const cmd = "rf ${words(leaf).join(" ")} --json";`].map(hitsOf));
    const nearMisses = [
      'spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--no-commit", "--no-input", "--json"]);',
      'const argv = ["graph", "show", "publish"];',
      'const text = "subgraph publish";',
      'const text = "graph publisher";',
      'const text = "graph disconnected";',
    ].map(hitsOf);
    expect([...readLeaves.flat(), ...nearMisses].every(count => count === 0)).toBe(true);
    return { readLeaves, nearMisses };
  },
  Q1: async () => {
    const composed = hitsOf('const leaf = ["pub", "lish"].join(""); spawn("rf", ["graph", leaf]);');
    const literal = hitsOf('spawn("rf", ["graph", "publish"]);');
    expect([composed, literal]).toEqual([0, 1]);
    return { residual: RESIDUALS.Q1 ?? "", composed, literal };
  },
  Q2: async () => {
    const indirect = scanSpawns("sample.ts", 'spawn(rfBinary, ["context", "render"]); execFile(process.env.RF_BIN ?? "", argv);').sites.length;
    const literal = scanSpawns("sample.ts", 'spawn("/opt/tools/rf", argv); exec("rf context render --no-commit");').sites.length;
    expect([indirect, literal]).toEqual([0, 2]);
    return { residual: RESIDUALS.Q2 ?? "", indirect, literal };
  },
  Q3: async () => {
    const unpinned = hitsOf('spawn("rf", ["graph", "merge", "--candidate", c, "--json"]);');
    expect(unpinned).toBe(0);
    return { residual: RESIDUALS.Q3 ?? "", unpinned };
  },
  Q4: async () => {
    const misdeclared = committingFindings([{ id: "reactivefiber.graph.quiet", effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }]);
    expect(misdeclared).toEqual([]);
    return { residual: RESIDUALS.Q4 ?? "", misdeclared };
  },
  Q5: async () => {
    const receipt = readFileSync(RECEIPT_PATH, "utf8");
    const exported = readFileSync(EXPORT_PATH, "utf8");
    const clauses = exportClauses(exported);
    const followUp = followUpClauses(exported);
    const terminal = terminalClauses(exported);
    const lessRows = ROWS.filter(row => row.id !== "R");
    const lessReceipt = receipt
      .split("\n")
      .filter(line => !line.startsWith("- Row R "))
      .join("\n");
    const coordinated = anchorFindings(lessRows, RF_GRAPH_LEAVES, RESIDUALS, lessReceipt, clauses, followUp, terminal);
    const censusOnly = anchorFindings(lessRows, RF_GRAPH_LEAVES, RESIDUALS, receipt, clauses, followUp, terminal);
    expect(coordinated).toEqual([]);
    expect(censusOnly).toEqual(["receipt rows differ"]);
    return { residual: RESIDUALS.Q5 ?? "", coordinated, censusOnly };
  },
  Q6: async () => {
    const record = recorder(
      withResult(result => ({
        ...result,
        effects: [{ render_id: null, component_instance_id: "swarm.notes:main", effect_id: "notify-peer", effect_type: "notify", status: "executed", reason_codes: ["dry_run"], idempotency_key: `sha256:${"3".repeat(64)}`, dispatch_count: 1, fiber_status: "collected", result_digest: null }],
        plan: { operations: [], would_commit: true },
      })),
    );
    const reading = await boundRegistry(record.root).invoke(PREVIEW_ID, armInput("C4"), invokeContext());
    const source = objectOf(objectOf(reading, "reading").source, "reading source");
    const result = objectOf(source.result, "reading result");
    const effects = Array.isArray(result.effects) ? result.effects : [];
    const admitted = { effectStatus: objectOf(effects[0], "effects[0]").status ?? null, wouldCommit: objectOf(result.plan, "plan").would_commit ?? null };
    expect(admitted).toEqual({ effectStatus: "executed", wouldCommit: true });
    return { residual: RESIDUALS.Q6 ?? "", admitted, spawns: spawnsOf(record).length };
  },
  S1: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    const registry = await nativeRegistry(record.root);
    const ids = registry.catalogSnapshot().map(entry => entry.descriptor.id);
    const discovered = registry.discover({ grants: ids.map(id => `discover:${id}`) }).map(descriptor => descriptor.id);
    const effectClass = registry.effectClassOf(PREVIEW_ID) ?? "unregistered";
    const settled = await settle(record, baseline);
    expect(settled.spawns).toBe(0);
    return { discovered: discovered.filter(id => id.startsWith(RF_PREFIX)), effectClass, settled: { ...settled } };
  },
  S2: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    const error = await caught(() => boundRegistry(record.root).inspect(PREVIEW_ID, { ref: "inspect-fixture" }, { grants: [`inspect:${PREVIEW_ID}`], signal: new AbortController().signal }));
    const settled = await settle(record, baseline);
    expect(settled.spawns).toBe(0);
    return { ...refusalOf(error), settled: { ...settled } };
  },
  S3: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const replies = [
      replyKind(await call("capability_discover", {})),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID })),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID, mode: "inspect", capabilityVersion: "1.0.0", ref: "inspect-fixture" })),
    ];
    const settled = await settle(record, baseline);
    expect(settled.spawns).toBe(0);
    return { replies, settled: { ...settled } };
  },
  S4: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const reply = await call("capability_invoke", { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: armInput("C4") });
    const settled = await settle(record, baseline);
    expect(settled.spawns).toBe(1);
    expect(mutatingWords(record)).toEqual([]);
    return { reply: replyKind(reply), settled: { ...settled }, argv: argvWitness(record) };
  },
  S5: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    spawn("rf", ["settle-control"], { stdio: "ignore" }).on("error", () => {});
    const running = runningChildren() - baseline;
    const immediate = spawnsOf(record).length;
    const settled = await settle(record, baseline);
    expect([running, immediate, settled.spawns]).toEqual([1, 0, 1]);
    return { running, immediate, settled: { ...settled }, argv: argvWitness(record) };
  },
  S6: async () => {
    const entries = (process.env.PATH ?? "").split(delimiter);
    const dir = entries[0] ?? "";
    const isolated = entries.length === 1 && basename(dir).startsWith("rf-graph-mutation-path-") && readdirSync(dir).length === 0;
    expect(isolated, `PATH must be one empty scratch directory, read ${process.env.PATH ?? "<unset>"}`).toBe(true);
    return { entries: entries.length, isolated, rfOnPath: existsSync(join(dir, "rf")) };
  },
  I1: async () => {
    const argv = MUTATING.map(leaf => GLOBAL_ELEMENTS.map(global => hitsOf(`spawn("rf", [${interleaved(leaf, global)}]);`)));
    const gate = { P07: hitsOf(probe("P07")), P07b: hitsOf(probe("P07b")) };
    expect(argv.flat().every(count => count === 1)).toBe(true);
    expect(gate).toEqual({ P07: 1, P07b: 1 });
    return { argv, gate };
  },
  I2: async () => {
    const shell = MUTATING.map(leaf => SHELL_JOINTS.map(joint => hitsOf(`const cmd = ${JSON.stringify(`rf ${words(leaf).join(joint)}`)};`)));
    const template = MUTATING.map(leaf => hitsOf(["const cmd = `rf ", words(leaf).join(" --workspace $" + "{root} "), "`;"].join("")));
    const quotedValue = MUTATING.map(leaf => hitsOf(["const cmd = `rf ", words(leaf).join(' --actor "$' + '{actor}" '), "`;"].join("")));
    expect([...shell.flat(), ...template, ...quotedValue].every(count => count === 1)).toBe(true);
    return { shell, template, quotedValue };
  },
  I3: async () => {
    const readLeaves = READING.map(leaf => hitsOf(`spawn("rf", [${interleaved(leaf, '"--json"')}]);`));
    const nearMisses = [
      'spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--no-commit", "--no-input", "--json"]);',
      'spawn("rf", ["graph", "--candidate", "c1", "publish"]);',
      'spawn("rf", ["graph", "--workspace", "publish"]);',
      'const cmd = "rf graph --json show publish";',
      'const cmd = "rf subgraph --json publish";',
    ].map(hitsOf);
    expect([...readLeaves, ...nearMisses].every(count => count === 0)).toBe(true);
    return { readLeaves, nearMisses };
  },
  K1: async () => {
    const forms = [
      'import { spawn as launch } from "node:child_process";\nlaunch("rf", ["graph", "show"]);',
      'import { execFile as run } from "child_process";\nrun("rf", ["graph", "show"]);',
      'import { spawnSync as runSync, fork as start } from "node:child_process";\nrunSync("rf", []);\nstart("rf", []);',
      'const { spawn: launch } = require("node:child_process");\nlaunch("rf", argv);',
      'const { execFileSync: run } = await import("node:child_process");\nrun("rf", argv);',
    ].map(sitesOf);
    const gate = { P03: sitesOf(probe("P03")), P07b: sitesOf(probe("P07b")) };
    expect(forms).toEqual([1, 1, 2, 1, 1]);
    expect(gate).toEqual({ P03: 1, P07b: 1 });
    return { forms, gate, callees: scanSpawns("sample.ts", probe("P03")).sites.map(site => site.callee) };
  },
  K2: async () => {
    const forms = [
      'import * as cp from "node:child_process";\ncp["execFileSync"]("rf", argv);',
      'require("node:child_process")["spawn"]("rf", argv);',
      "import * as cp from \"node:child_process\";\ncp[`exec`](\"rf context render\");",
    ].map(sitesOf);
    const gate = { P04: sitesOf(probe("P04")), P04b: sitesOf(probe("P04b")) };
    expect(forms).toEqual([1, 1, 1]);
    expect(gate).toEqual({ P04: 1, P04b: 1 });
    return { forms, gate, callees: scanSpawns("sample.ts", probe("P04")).sites.map(site => site.callee) };
  },
  K3: async () => {
    const nearMisses = [
      'import { spawn as launch } from "./launcher.js";\nlaunch("rf", argv);',
      'import * as cp from "node:child_process";\ncp["toString"]("rf");',
      'import { ChildProcess as Proc } from "node:child_process";\nProc("rf");',
    ].map(sitesOf);
    const otherBinary = scanSpawns("sample.ts", 'import { spawn as launch } from "node:child_process";\nlaunch("git", ["status"]);');
    expect(nearMisses).toEqual([0, 0, 0]);
    expect(otherBinary.otherBinaryCalls).toBe(1);
    return { nearMisses, otherBinary: { sites: otherBinary.sites.length, otherBinaryCalls: otherBinary.otherBinaryCalls } };
  },
  D1: async () => {
    const forms = [
      'import { join } from "node:path";\njoin(dir, "graphs", "context.toml");',
      'import path from "node:path";\npath.join(workspace, "graphs", "context.toml");',
      'import { resolve } from "node:path";\nresolve(root, "graphs", "context.toml");',
      'import { win32 } from "node:path";\nwin32.join(dir, "graphs", "context.toml");',
      'import { join } from "node:path";\njoin("graphs", "context.toml");',
    ].map(documentsOf);
    const gate = { P11b: documentsOf(probe("P11b")) };
    expect(forms.every(count => count >= 1)).toBe(true);
    expect(gate.P11b).toBeGreaterThanOrEqual(1);
    return { forms, gate };
  },
  D2: async () => {
    const forms = [
      'const p = [dir, "graphs", "context.toml"].join(sep);',
      'const p = ["graphs", "context.toml"].join("\\\\");',
      'const p = "graphs\\\\context.toml";',
      ["const p = `$", "{root}\\\\graphs\\\\context.toml`;"].join(""),
    ].map(documentsOf);
    const gate = { P11c: documentsOf(probe("P11c")) };
    expect(forms.every(count => count >= 1)).toBe(true);
    expect(gate.P11c).toBeGreaterThanOrEqual(1);
    return { forms, gate };
  },
  D3: async () => {
    const nearMisses = [
      'import { join } from "node:path";\njoin(dir, "graphs");',
      'import { join } from "node:path";\njoin(dir, "context.toml");',
      'const p = ["graphs", "lens.toml"].join("/");',
      'const p = ["graph", "context.toml"].join("/");',
      'import { join } from "node:path";\njoin(dir, "graphs", "views", "context.toml");',
    ].map(documentsOf);
    expect(nearMisses).toEqual([0, 0, 0, 0, 0]);
    return { nearMisses };
  },
  Q7: async () => {
    const baseline = runningChildren();
    const record = recorder(root => fullShapeRf(root));
    const deferredMs = 2 * SETTLE_WINDOW_MS;
    const late = setTimeout(() => {
      spawn("rf", ["late-spawn"], { stdio: "ignore" }).on("error", () => {});
    }, deferredMs);
    const settled = await settle(record, baseline);
    clearTimeout(late);
    expect(settled.spawns).toBe(0);
    return { residual: RESIDUALS.Q7 ?? "", deferredMs, settled: { ...settled } };
  },
  Q8: async () => {
    const baseline = runningChildren();
    const child = spawn(process.execPath, ["-e", "setTimeout(() => {}, 60000)"], { detached: true, stdio: "ignore" });
    child.unref();
    const unseen = runningChildren() - baseline;
    const alive = child.exitCode === null && child.signalCode === null;
    child.kill("SIGKILL");
    const reaped = await exited(child);
    expect([unseen, alive, reaped]).toEqual([0, true, true]);
    return { residual: RESIDUALS.Q8 ?? "", unseen, alive, reaped };
  },
  Q9: async () => {
    const rebound = [
      'import { spawn } from "node:child_process";\nconst launch = spawn;\nlaunch("rf", ["graph", "show"]);',
      'import { execFile } from "node:child_process";\nimport { promisify } from "node:util";\nconst run = promisify(execFile);\nrun("rf", ["graph", "show"]);',
      'import { spawn } from "node:child_process";\nspawn.call(undefined, "rf", ["graph", "show"]);',
      'import * as cp from "node:child_process";\nconst name = "spawn";\ncp[name]("rf", ["graph", "show"]);',
    ].map(sitesOf);
    const literal = sitesOf('import { spawn } from "node:child_process";\nspawn("rf", ["graph", "show"]);');
    expect([rebound, literal]).toEqual([[0, 0, 0, 0], 1]);
    return { residual: RESIDUALS.Q9 ?? "", rebound, literal };
  },
  Q10: async () => {
    const composed = [
      'import { join } from "node:path";\nconst GRAPHS = "graphs";\njoin(dir, GRAPHS, "context.toml");',
      'const p = "graphs" + "/context.toml";',
      ['import { join } from "node:path";\njoin(dir, "graphs", `$', '{name}.toml`);'].join(""),
    ].map(documentsOf);
    const literal = documentsOf('import { join } from "node:path";\njoin(dir, "graphs", "context.toml");');
    expect([composed, literal]).toEqual([[0, 0, 0], 1]);
    return { residual: RESIDUALS.Q10 ?? "", composed, literal };
  },
  Q11: async () => {
    const quotedValues = ["const cmd = \"rf graph --workspace '/srv/my ws' publish\";", 'const cmd = "rf graph --workspace \\"/srv/my ws\\" publish";'].map(hitsOf);
    const unquoted = hitsOf('const cmd = "rf graph --workspace /srv/ws publish";');
    expect([quotedValues, unquoted]).toEqual([[0, 0], 1]);
    return { residual: RESIDUALS.Q11 ?? "", quotedValues, unquoted };
  },
  K4: async () => {
    const forms = [
      'import { spawn } from "node:child_process";\n(spawn)("rf", argv);',
      'import { execFile as run } from "node:child_process";\n((run))("rf", argv);',
      'import * as cp from "node:child_process";\n(cp.spawn)("rf", argv);',
      'import * as cp from "node:child_process";\n(cp["execFileSync"])("rf", argv);',
    ].map(sitesOf);
    const gate = { "G-ST7": sitesOf(probe("G-ST7")) };
    const clean = sitesOf('import { spawn as launch } from "./launcher.js";\n(launch)("rf", argv);');
    expect(forms).toEqual([1, 1, 1, 1]);
    expect([gate["G-ST7"], clean]).toEqual([1, 0]);
    return { forms, gate, clean };
  },
  K5: async () => {
    const forms = [
      'import { spawn } from "node:child_process";\nspawn!("rf", argv);',
      'import { execFile as run } from "node:child_process";\nrun!("rf", argv);',
      'import * as cp from "node:child_process";\ncp.spawnSync!("rf", argv);',
      'import { fork } from "node:child_process";\n(fork)!("rf", argv);',
    ].map(sitesOf);
    const gate = { "G-ST8": sitesOf(probe("G-ST8")) };
    const clean = sitesOf('import { spawn as launch } from "./launcher.js";\nlaunch!("rf", argv);');
    expect(forms).toEqual([1, 1, 1, 1]);
    expect([gate["G-ST8"], clean]).toEqual([1, 0]);
    return { forms, gate, clean };
  },
  K6: async () => {
    const forms = [
      'import { spawn } from "node:child_process";\n(spawn as typeof spawn)("rf", argv);',
      'import { spawn } from "node:child_process";\n(<typeof spawn>spawn)("rf", argv);',
      'import { execFile } from "node:child_process";\n(execFile as unknown as typeof execFile)("rf", argv);',
      'import * as cp from "node:child_process";\n(cp["spawn"] as typeof cp.spawn)("rf", argv);',
    ].map(sitesOf);
    const gate = { "G-ST9": sitesOf(probe("G-ST9")) };
    const clean = sitesOf('import { spawn as launch } from "./launcher.js";\n(launch as typeof launch)("rf", argv);');
    expect(forms).toEqual([1, 1, 1, 1]);
    expect([gate["G-ST9"], clean]).toEqual([1, 0]);
    return { forms, gate, clean };
  },
  K7: async () => {
    const forms = [
      'import { spawn } from "node:child_process";\n(spawn satisfies typeof spawn)("rf", argv);',
      'import * as cp from "node:child_process";\n(cp.execFileSync satisfies unknown)("rf", argv);',
      'import { exec } from "node:child_process";\n((exec satisfies unknown) as typeof exec)("rf context render");',
    ].map(sitesOf);
    const clean = sitesOf('import { spawn as launch } from "./launcher.js";\n(launch satisfies unknown)("rf", argv);');
    expect(forms).toEqual([1, 1, 1]);
    expect(clean).toBe(0);
    return { forms, clean };
  },
  K8: async () => {
    const forms = [
      'import { spawn } from "node:child_process";\n(0, spawn)("rf", argv);',
      'import * as cp from "node:child_process";\n(void 0, cp.execFileSync)("rf", argv);',
      'import { fork } from "node:child_process";\n(log("x"), 0, fork)("rf", argv);',
      'import { spawn } from "node:child_process";\n(0, (spawn as typeof spawn)!)("rf", argv);',
    ].map(sitesOf);
    const gate = { "G-ST10": sitesOf(probe("G-ST10")) };
    const clean = sitesOf('import { spawn } from "node:child_process";\nimport { spawn as launch } from "./launcher.js";\n(spawn, launch)("rf", argv);');
    expect(forms).toEqual([1, 1, 1, 1]);
    expect([gate["G-ST10"], clean]).toEqual([1, 0]);
    return { forms, gate, clean };
  },
  D4: async () => {
    const forms = [
      'import { join } from "node:path";\njoin(dir, "graphs/", "context.toml");',
      'import { join } from "node:path";\njoin(dir, "graphs", "./context.toml");',
      'import { join } from "node:path";\njoin(dir, "graphs", "", "context.toml");',
      'import { join } from "node:path";\njoin(dir, "graphs/views/..", "context.toml");',
      'const p = ["graphs/", "context.toml"].join("");',
      'const p = "graphs//context.toml";',
    ].map(documentsOf);
    const gate = { "G-DP1": documentsOf(probe("G-DP1")), "G-DP2": documentsOf(probe("G-DP2")), "G-DP4": documentsOf(probe("G-DP4")), "G-DP5": documentsOf(probe("G-DP5")) };
    const clean = [
      'import { join } from "node:path";\njoin(dir, "graphs", "..", "context.toml");',
      'const p = "graphs/../context.toml";',
      'import { join } from "node:path";\njoin(dir, "graphs/", "./lens.toml");',
    ].map(documentsOf);
    expect(forms.every(count => count >= 1)).toBe(true);
    expect(Object.values(gate).every(count => count >= 1)).toBe(true);
    expect(clean).toEqual([0, 0, 0]);
    return { forms, gate, clean };
  },
  I4: async () => {
    const quotings = (leaf: string): string[] => {
      const parts = words(leaf);
      return [
        `rf ${parts.map(part => `'${part}'`).join(" ")}`,
        `rf ${parts.map(part => `"${part}"`).join(" ")}`,
        `rf ${parts.map(part => `${part.slice(0, 1)}'${part.slice(1)}'`).join(" ")}`,
        `rf ${parts.map(part => `\\${part}`).join(" ")}`,
        `rf ${parts.map(part => `$'${part}'`).join(" ")}`,
        `rf --json ${parts.map(part => `'${part}'`).join(" --workspace '/srv/ws' ")}`,
      ];
    };
    const shell = MUTATING.map(leaf => quotings(leaf).map(line => hitsOf(`const cmd = ${JSON.stringify(line)};`)));
    const template = MUTATING.map(leaf => hitsOf(["const cmd = `rf ", words(leaf).map(part => `'${part}'`).join(" "), " --workspace $", "{root}`;"].join("")));
    const gate = { "G-ST13": hitsOf(probe("G-ST13")) };
    const readLeaves = READING.map(leaf => hitsOf(`const cmd = ${JSON.stringify(`rf ${words(leaf).map(part => `'${part}'`).join(" ")}`)};`));
    const nearMisses = [
      "const cmd = \"rf 'graph' 'show' publish\";",
      "const cmd = \"rf 'subgraph' 'publish'\";",
      "const cmd = \"rf 'graph publisher'\";",
      'spawn("rf", ["\'graph\'", "\'publish\'"]);',
    ].map(hitsOf);
    expect([...shell.flat(), ...template, gate["G-ST13"]].every(count => count === 1)).toBe(true);
    expect([...readLeaves, ...nearMisses].every(count => count === 0)).toBe(true);
    return { shell, template, gate, readLeaves, nearMisses };
  },
  X5: async () => {
    const receipt = readFileSync(RECEIPT_PATH, "utf8");
    const exported = readFileSync(EXPORT_PATH, "utf8");
    const clauses = exportClauses(exported);
    const followUp = followUpClauses(exported);
    const terminal = terminalClauses(exported);
    const findingsOf = (text: string): string[] => anchorFindings(ROWS, RF_GRAPH_LEAVES, RESIDUALS, text, clauses, followUp, terminal);
    /** The 2026-10-24 listing's first and last lines, the span the gate's X5 replay wrapped. */
    const first = "\n- Row S (pins S1";
    const last = "- Residual Q11: R-SHELL-QUOTED\n";
    expect([receipt.split(first).length, receipt.split(last).length]).toEqual([2, 2]);
    const hidden = {
      X5: findingsOf(receipt.replace(first, `\n<!--${first}`).replace(last, `${last}-->\n`)),
      unclosed: findingsOf(receipt.replace(first, `\n<!--${first}`)),
      block: findingsOf(receipt.replace(first, `\n<div hidden>${first}`).replace(last, `${last}</div>\n`)),
      inline: findingsOf(receipt.replace(last, `- Residual Q11: R-SHELL-QUOTED <span hidden>withdrawn</span>\n`)),
    };
    const committed = findingsOf(receipt);
    expect(committed).toEqual([]);
    expect(Object.values(hidden).every(findings => findings.includes("receipt carries HTML"))).toBe(true);
    return { committed, html: receiptHtml(receipt), hidden };
  },
  W11: async () => {
    const sets: ReadonlyArray<readonly RfDescriptorShape[]> = [
      [],
      [{ id: PREVIEW_ID, effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }],
      [{ id: "reactivefiber.graph.publish", effectClass: "read", contractSource: PUBLISHING_CONTRACT }],
      [
        { id: "reactivefiber.graph.publish", effectClass: "write", contractSource: PUBLISHING_CONTRACT },
        { id: "reactivefiber.render.commit", effectClass: "write", contractSource: `${CONTRACT} context.render --idempotency-key K` },
        { id: PREVIEW_ID, effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE },
      ],
      [{ id: "reactivefiber.graph.document", effectClass: "write", contractSource: `${CONTRACT} context.render ${DRY_RUN_FLAG} then graphs/context.toml` }],
      [{ id: "reactivefiber.graph.edit", effectClass: "write", contractSource: `${CONTRACT} context.render ${DRY_RUN_FLAG} then graph.patch` }],
      [{ id: "reactivefiber.render.unknown", effectClass: "read" }],
      [{ id: "forge.graph.publish", effectClass: "write", contractSource: PUBLISHING_CONTRACT }],
    ];
    const counts = sets.map(committingCount);
    expect(counts).toEqual([0, 0, 1, 2, 1, 1, 1, 0]);
    return { counts };
  },
  W12: async () => {
    const meets = (count: number): boolean => count >= SRC_FLOOR;
    const floor = { floor: SRC_FLOOR, emptyWalkMeetsFloor: meets(0), walkMeetsFloor: meets(srcModules().length) };
    expect(floor.emptyWalkMeetsFloor).toBe(false);
    expect(floor.walkMeetsFloor).toBe(true);
    return floor;
  },
  W13: async () => {
    const listed = readdirSync(join(REPO, "src"), { withFileTypes: true, recursive: true })
      .filter(entry => entry.isFile() && entry.name.endsWith(".ts"))
      .map(entry => relative(REPO, join(entry.parentPath, entry.name)))
      .sort();
    const modules = srcModules();
    const walked = modules.map(module => module.name).sort();
    const missing = listed.filter(name => !walked.includes(name));
    const extra = walked.filter(name => !listed.includes(name));
    const misread = modules.filter(module => module.text !== readFileSync(join(REPO, module.name), "utf8")).map(module => module.name);
    expect([missing, extra, misread]).toEqual([[], [], []]);
    return { missing, extra, misread, floorMet: listed.length >= SRC_FLOOR };
  },
  Q12: async () => {
    const other = [
      'import { spawn, spawnSync } from "node:child_process";\n(flag ? spawn : spawnSync)("rf", ["graph", "show"]);',
      'import { spawn } from "node:child_process";\n(override || spawn)("rf", ["graph", "show"]);',
      'import { spawn } from "node:child_process";\n(override ?? spawn)("rf", ["graph", "show"]);',
      'import { spawn } from "node:child_process";\n(spawn<never>)("rf", ["graph", "show"]);',
    ].map(sitesOf);
    const unwrapped = sitesOf('import { spawn } from "node:child_process";\n(0, (spawn as typeof spawn)!)("rf", ["graph", "show"]);');
    expect([other, unwrapped]).toEqual([[0, 0, 0, 0], 1]);
    return { residual: RESIDUALS.Q12 ?? "", other, unwrapped };
  },
  Q13: async () => {
    const expanded = ['const cmd = "rf {graph,} publish";', ['const cmd = "rf $', '{MODE:-graph} publish";'].join(""), "const cmd = \"rf graph $'publ\\\\x69sh'\";"].map(hitsOf);
    const quoted = hitsOf("const cmd = \"rf 'graph' 'publish'\";");
    expect([expanded, quoted]).toEqual([[0, 0, 0], 1]);
    return { residual: RESIDUALS.Q13 ?? "", expanded, quoted };
  },
};

/** Each pin's witness. Rows A, B, C, M and R were measured at base 0b2a80f (wb-a9l2.8); each later row group names the trunk
 * its cutting seat measured it on (the wb-7thm F6 attribution fix). */
const WITNESS: Readonly<Record<string, Json>> = {
  A1: {
    srcFloorMet: true,
    otherBinariesSeen: true,
    sites: [{ file: "src/workbench/providers/reactivefiber.ts", within: "nativeReactiveFiberRender", callee: "spawn", argv: "argv" }],
  },
  A2: {
    srcFloorMet: true,
    renderArgvSeen: true,
    leafHits: [],
    forbidden: [
      "graph.candidate.create",
      "graph.candidate.authorize",
      "graph.patch",
      "graph.connect",
      "graph.disconnect",
      "graph.set-optic",
      "graph.publish",
      "graph.rollback",
    ],
  },
  A3: {
    arrays: [
      ["--view", "<expr>", "--task-id", "<expr>", "...<expr>"],
      [],
      ["--model", "<expr>"],
      ["--model", "<expr>", "--task", "<expr>"],
      ["--workspace", "<expr>", "context", "render", "...<expr>", "--no-commit", "--no-input", "--json"],
    ],
    carriesDryRunFlag: true,
  },
  A4: {
    native: [{ id: "reactivefiber.render.preview", effectClass: "read", carrier: true, nonCommittingRender: true }],
    injected: [{ id: "reactivefiber.render.preview", effectClass: "read", carrier: true, nonCommittingRender: true }],
    reconcile: ["reactivefiber.render.preview"],
  },
  A5: {
    sites: [
      {
        file: "src/workbench/providers/reactivefiber.ts",
        within: "registerReactiveFiberRender",
        id: "reactivefiber.render.preview",
        effectClass: "read",
      },
      {
        file: "src/workbench/providers/reactivefiber.ts",
        within: "registerNativeReactiveFiberRender",
        id: "reactivefiber.render.preview",
        effectClass: "read",
      },
    ],
  },
  B1: { judged: 2, committing: 0, findings: [] },
  B2: { srcFloorMet: true, documentHits: [], document: [".reactive-fiber", "graphs/context.toml"] },
  B3: { findings: ["reactivefiber.graph.publish: read effectClass on a committing capability"] },
  B4: {
    cases: [
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.patch",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt", "reactivefiber.graph.edit: no graph.publish receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.candidate.authorize",
        findings: ["reactivefiber.graph.edit: no graph.publish receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.publish",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.rollback",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt", "reactivefiber.graph.edit: no graph.publish receipt"],
      },
    ],
  },
  B5: {
    cases: [
      { id: "reactivefiber.graph.document", findings: ["reactivefiber.graph.document: direct graph write"] },
      { id: "reactivefiber.graph.direct", findings: ["reactivefiber.graph.direct: direct graph write"] },
      { id: "reactivefiber.render.unknown", findings: ["reactivefiber.render.unknown: undeclared contract"] },
    ],
  },
  B6: { admitted: [[], [], []], committingRender: [["reactivefiber.render.commit: read effectClass on a committing capability"], []] },
  C1: { discovered: ["reactivefiber.render.preview"], effectClass: "read", nativeFloorMet: true, spawns: 0 },
  C2: { category: "unavailable", message: "Capability reactivefiber.render.preview does not support inspect.", spawns: 0 },
  C3: {
    replies: [
      { isError: false, kind: "discovered" },
      { isError: false, kind: "contract" },
      { isError: true, kind: "rejected", category: "unavailable" },
    ],
    spawns: 0,
  },
  C4: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--model",
        "model-fixture",
        "--task",
        "task-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C5: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--view",
        "swarm.worker",
        "--task-id",
        "bead-fixture-000",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C6: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--view",
        "swarm.worker",
        "--task-id",
        "bead-fixture-000",
        "--model",
        "model-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C7: {
    reply: { isError: false, kind: "returned" },
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--model",
        "model-fixture",
        "--task",
        "task-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
  },
  C8: {
    outcomes: [
      {
        variant: "ephemeral false",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "render_id set",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "commit_seq set",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "storage write",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
    ],
  },
  C9: {
    forms: [["model", "task"], ["taskId", "view"], ["model", "taskId", "view"]],
    armPins: ["C4", "C5", "C6"],
    tools: ["capability_contract", "capability_discover", "capability_invoke"],
    toolPins: ["C3", "C7"],
  },
  M1: { argv: [true, true, true, true, true, true, true, true] },
  M2: { dotted: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
  M3: { spaced: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]] },
  M4: { template: [true, true, true, true, true, true, true, true] },
  M5: { readLeaves: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], nearMisses: [0, 0, 0, 0, 0] },
  Q1: { residual: "R-COMPOSED", composed: 0, literal: 1 },
  Q2: { residual: "R-INDIRECT-BINARY", indirect: 0, literal: 2 },
  Q3: { residual: "R-UNPINNED-LEAF", unpinned: 0 },
  Q4: { residual: "R-DECLARED-ROUTE", misdeclared: [] },
  Q5: { residual: "R-COORDINATED", coordinated: [], censusOnly: ["receipt rows differ"] },
  Q6: { residual: "R-EFFECT-LEDGER", admitted: { effectStatus: "executed", wouldCommit: true }, spawns: 1 },
  // Rows S, I, K, D and N (wb-pdee): measured by its cutting seat on trunk 92e5ae2 and cut on 61dac63.
  S1: { discovered: ["reactivefiber.render.preview"], effectClass: "read", settled: { window: 3000, running: 0, spawns: 0 } },
  S2: { category: "unavailable", message: "Capability reactivefiber.render.preview does not support inspect.", settled: { window: 3000, running: 0, spawns: 0 } },
  S3: {
    replies: [
      { isError: false, kind: "discovered" },
      { isError: false, kind: "contract" },
      { isError: true, kind: "rejected", category: "unavailable" },
    ],
    settled: { window: 3000, running: 0, spawns: 0 },
  },
  S4: {
    reply: { isError: false, kind: "returned" },
    settled: { window: 3000, running: 0, spawns: 1 },
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--model",
        "model-fixture",
        "--task",
        "task-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
  },
  S5: { running: 1, immediate: 0, settled: { window: 3000, running: 0, spawns: 1 }, argv: [["settle-control"]] },
  S6: { entries: 1, isolated: true, rfOnPath: false },
  I1: {
    argv: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    gate: { P07: 1, P07b: 1 },
  },
  I2: {
    shell: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
    template: [1, 1, 1, 1, 1, 1, 1, 1],
    quotedValue: [1, 1, 1, 1, 1, 1, 1, 1],
  },
  I3: { readLeaves: [0, 0, 0, 0, 0, 0, 0, 0], nearMisses: [0, 0, 0, 0, 0] },
  K1: { forms: [1, 1, 2, 1, 1], gate: { P03: 1, P07b: 1 }, callees: ["spawn"] },
  K2: { forms: [1, 1, 1], gate: { P04: 1, P04b: 1 }, callees: ["spawn"] },
  K3: { nearMisses: [0, 0, 0], otherBinary: { sites: 0, otherBinaryCalls: 1 } },
  D1: { forms: [1, 1, 1, 1, 1], gate: { P11b: 1 } },
  D2: { forms: [1, 1, 1, 1], gate: { P11c: 1 } },
  D3: { nearMisses: [0, 0, 0, 0, 0] },
  Q7: { residual: "R-LATE-SPAWN", deferredMs: 6000, settled: { window: 3000, running: 0, spawns: 0 } },
  Q8: { residual: "R-UNREF-CHILD", unseen: 0, alive: true, reaped: true },
  Q9: { residual: "R-REBOUND-CALLEE", rebound: [0, 0, 0, 0], literal: 1 },
  Q10: { residual: "R-COMPOSED-PATH", composed: [0, 0, 0], literal: 1 },
  Q11: { residual: "R-SHELL-QUOTED", quotedValues: [0, 0], unquoted: 1 },
  // Rows U, P, H, X, W and T (wb-7thm): measured by its cutting seat on trunk b887fa2.
  K4: { forms: [1, 1, 1, 1], gate: { "G-ST7": 1 }, clean: 0 },
  K5: { forms: [1, 1, 1, 1], gate: { "G-ST8": 1 }, clean: 0 },
  K6: { forms: [1, 1, 1, 1], gate: { "G-ST9": 1 }, clean: 0 },
  K7: { forms: [1, 1, 1], clean: 0 },
  K8: { forms: [1, 1, 1, 1], gate: { "G-ST10": 1 }, clean: 0 },
  D4: { forms: [1, 1, 1, 1, 1, 1], gate: { "G-DP1": 1, "G-DP2": 1, "G-DP4": 1, "G-DP5": 1 }, clean: [0, 0, 0] },
  I4: {
    shell: [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    template: [1, 1, 1, 1, 1, 1, 1, 1],
    gate: { "G-ST13": 1 },
    readLeaves: [0, 0, 0, 0, 0, 0, 0, 0],
    nearMisses: [0, 0, 0, 0],
  },
  X5: {
    committed: [],
    html: [],
    hidden: { X5: ["receipt carries HTML"], unclosed: ["receipt carries HTML"], block: ["receipt carries HTML"], inline: ["receipt residuals differ", "receipt carries HTML"] },
  },
  W11: { counts: [0, 0, 1, 2, 1, 1, 1, 0] },
  W12: { floor: 100, emptyWalkMeetsFloor: false, walkMeetsFloor: true },
  W13: { missing: [], extra: [], misread: [], floorMet: true },
  Q12: { residual: "R-OTHER-CALLEE", other: [0, 0, 0, 0], unwrapped: 1 },
  Q13: { residual: "R-SHELL-EXPANSION", expanded: [0, 0, 0], quoted: 1 },
};

describe("wb-a9l2.8 rf graph mutation census (RF-HARNESS2-FEDERATED-PEER-R8)", () => {
  it("the judged set: the frozen shape, the owner's acceptance in the tracked export, the receipt anchor listing and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:6", "C:9", "M:5", "R:6", "S:6", "I:3", "K:3", "D:3", "N:5", "U:5", "P:1", "H:1", "X:1", "W:3", "T:2"]);
    expect(RF_GRAPH_LEAVES.map(leaf => `${leaf.leaf}:${leaf.mutates ? "mutates" : "reads"}`)).toEqual([
      "graph.show:reads",
      "graph.validate:reads",
      "graph.preflight:reads",
      "graph.explain:reads",
      "graph.diff:reads",
      "graph.candidate.create:mutates",
      "graph.candidate.authorize:mutates",
      "graph.patch:mutates",
      "graph.connect:mutates",
      "graph.disconnect:mutates",
      "graph.set-optic:mutates",
      "graph.impact:reads",
      "graph.test:reads",
      "graph.publish:mutates",
      "graph.history:reads",
      "graph.rollback:mutates",
    ]);
    const exported = readFileSync(EXPORT_PATH, "utf8");
    expect(anchorFindings(ROWS, RF_GRAPH_LEAVES, RESIDUALS, readFileSync(RECEIPT_PATH, "utf8"), exportClauses(exported), followUpClauses(exported), terminalClauses(exported))).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins).sort();
    expect(Object.keys(IMPL).sort()).toEqual(pins);
    expect(Object.keys(WITNESS).sort()).toEqual(pins);
    expect(Object.keys(RESIDUALS).sort()).toEqual(ROWS.filter(row => RESIDUAL_ROWS.includes(row.id)).flatMap(row => row.pins).sort());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(WITNESS[pin]);
        });
      }
    });
  }
});
