/**
 * wb-4ap.16 (COLLECTIVE-ADAPTATION-R16, program-triage-2026-10-17), the MechanicalWorkflows intent-host census.
 * Statement (bead description, verbatim): "When MechanicalWorkflows publishes the M0 packages/coordination pure contract
 * (observe/propose/reconcile ports, resolver receipt) and a host ABI, the Pi MechanicalWorkflows binding host shall honour the
 * intent-vs-effect protocol: policies emit intents carrying an expected source revision, effects flow only through the
 * core-minted control decision path, and resolver receipts are recorded as native evidence references — never executing an
 * intent directly. Artifact: M0 contract plus published host ABI."
 * Acceptance (description, verbatim; rows A, B and C are its three clauses, each without its final period and without a
 * trailing source citation): "On landing: a host test drives an M0 intent through the Pi host and asserts no native verb is
 * invoked unless decideControl returned 'permitted' with a core-minted receipt (isCoreMintedDecision)." "An intent whose
 * expected source revision differs from the observed node basis is reported as a conflict receipt, not applied
 * (MW/02-architecture.md:48@b8264aa 'stale revisions yield conflicts')." "The resolver receipt is journaled as a native
 * evidence reference and the four MW outcome variants are preserved (docs/workbench/07-native-integrations.md:12@9df9a03)."
 * Gate (bead notes, 2026-10-17b, "gate HALF-OPEN"): the M0 pure contract shipped at MechanicalWorkflows cf21475, the host ABI
 * did not, "so no Pi host exists for either today; the trigger becomes 'when MW publishes a host ABI for admitted intents (or
 * Pi decides to host coordination policies)' (MW-M0-PI-1)". Row T's label is that trigger, verbatim.
 *
 * MEASURED (read-only, by the cutting seats, 2026-10-28: cut #1 at f5589e0dc7bb and at its merged base 6fbc23468b81, whose
 * delta touches neither src nor the package files; cut #2 re-measured the Pi facts below at its merged base e81d2b08eecf,
 * whose delta from cut #1's cd8927fbdbc6 adds src/workbench/collective-event.ts and edits src/workbench/hyperunix-observer.ts,
 * neither naming an @mechanical/ package or an M0 spelling, leaves the package files, src/workbench/control.ts,
 * src/workbench/observation.ts and docs/workbench/01 unchanged, and edits docs/workbench/07 at line 19 only; cut #3
 * re-measured them at its merged base 014d116fb4c1, whose delta from e81d2b08eecf touches only test files and the tracker
 * export, and re-read the producer line and blob below from the MechanicalWorkflows checkout's objects at b8264aac5ef1).
 * Producer (the local MechanicalWorkflows checkout, git show / rev-parse; this census never re-reads the producer, and the
 * roster's producer block carries the one line it quotes): at cf214758bcff packages/coordination/package.json (blob
 * fc3e3b574d75) names the
 * package @mechanical/workflows-coordination 0.1.0; src/contracts.ts (blob 92373823252b) declares Basis {workspaceId,
 * revision} and an Intent whose expectedRevision is "The subject revision the intent was proposed against; a different basis
 * makes it stale" (:58-59), and states at :7-8 that whether an intent may become an effect "is decided by `reconcile`
 * (admissibility) and then by the host that owns native authority (Furnace, Beads, Forge, Git), which executes and reports
 * receipts"; src/resolver.ts (blob 1da5b67c3856) declares the six RejectionCode members (:4-10), rejects an intent whose
 * expectedRevision differs from the basis revision as INTENT_BASIS_STALE (:75-77) and returns a Resolution {basis, budget,
 * admitted, rejected, conflicts, budgetUsed} of which "Nothing here executes anything" (:57). At b8264aac5ef1
 * docs/programs/collective-adaptation-2026-10-16/02-architecture.md (blob 18d48f807878) line 48 opens "Duplicate events are
 * idempotent; stale revisions yield conflicts;". No host ABI for admitted intents exists at either pin. Pi, at the base:
 * package.json and package-lock.json name no @mechanical/ package, no src module imports one or spells the M0 vocabulary, the
 * control core (src/workbench/control.ts) registers no MechanicalWorkflows provider in NATIVE_CONTROL_ACTIONS (so decideControl
 * refuses a MechanicalWorkflows target as unknown-action before it reads the projection), and isCoreMintedDecision answers
 * by object identity: only a permit decideControl minted in this process. docs/workbench/07-native-integrations.md line 12
 * reads "5. Validate output and record native evidence references; preserve four existing outcome variants." at clause C's
 * pin 9df9a03 and at the base, and docs/workbench/01 J03 names the four: verified_candidate / verification_failed /
 * needs_evidence / indeterminate (wb-w12's statement lists the same four). The wb-oxsg follow-up re-read docs/workbench/01
 * at trunk 577493f9e951: its J03 paragraph (line 21) carries exactly one such clause.
 *
 * Pi hosts no MechanicalWorkflows intent today. The census pins that (row T) and an ARMED contract (rows A to C) that binds the
 * first host to come, as the wb-e66.5 coordination census and the HX censuses arm their first reader:
 *  T, the trigger. T1 (MW publishes a host ABI): no dependency map of package.json and no package path of package-lock.json
 *    names an @mechanical/ package, and no src module imports one (import, export-from, import-equals, require and import()
 *    with a literal specifier, read through the TypeScript parser), each reader shown flagging its planted controls, and the
 *    src leg shown holding at least SRC_FLOOR files and the control core's real text (its isCoreMintedDecision export). T2 (Pi
 *    decides to host): no src module spells the M0 vocabulary (the six rejection codes, expectedRevision and the
 *    workflows-coordination package name, each a whole case-sensitive token), and the src modules that do are exactly the
 *    bound hosts in MW_INTENT_HOSTS (empty both ways today: a module that starts hosting must be bound, and a bound path
 *    that names nothing is stale).
 *  A, B, C, armed on landing. The armed contract reads a host as one function over an M0 Resolution, the resolver receipt's
 *    native reference, the observation projection, a route from an admitted intent to the control request carrying its
 *    effect, and ONE injected native seam, the only path to a native verb, which answers with the producer's outcome variant.
 *    Five constructed fixtures (F1 a current intent, F2 an intent admitted against a basis the observed node has left, F3 a
 *    current intent whose request holds no control grant, F4 four current intents answered with the four variants, F5 a
 *    resolution of six rejections, one per code) run every host against the real control core, and six CHECKS judge the
 *    record: verb-unpermitted (the seam was handed a decision whose verdict is not 'permitted'), verb-unminted (handed a
 *    value isCoreMintedDecision refuses), verb-stale (handed a decision for a stale intent's target), stale-receipt (a stale
 *    intent lacks exactly one receipt of status conflict and code INTENT_BASIS_STALE), resolver-ref (the journal lacks the
 *    resolver receipt's reference verbatim) and variant (an applied receipt's variant is not an answer the seam gave for its
 *    intent's target: rewritten, collapsed, or reported with no call naming that target). A1 the
 *    bound hosts (none) and the synthetic bindings: the honest host passes every fixture, every mutant fails one, and every
 *    check fires. A2 a denied decision executed anyway fails verb-unpermitted; today the core refuses a MechanicalWorkflows
 *    target outright (the spelling tried, mechanical-workflows, is no NATIVE_CONTROL_ACTIONS key, so even an exact
 *    control:mechanical-workflows.apply grant reads unknown-action). A3 a hand-built look-alike permit and a structurally
 *    exact copy of a minted one fail verb-unminted;
 *    isCoreMintedDecision is false for every M0 shape (intent, rejection, resolution), a copy and a denial. B1 the stale
 *    condition: F2's intent expects the resolver's basis while the observed node's subjectBasis has moved. B2 a stale intent
 *    reported denied, or applied, fails stale-receipt. B3 a host that skips the basis comparison hands the seam a stale
 *    target's permit (verb-stale). C1 a dropped or rewritten resolver reference fails resolver-ref. C2 a host collapsing the
 *    variants, to verification_failed or to a Boolean word, or reporting a permitted intent applied without invoking the seam,
 *    fails variant, and the four are the documented four. A denial handed to the seam names no target, so the seam's answer
 *    to it is no answer for the intent and M-DENIED fails variant beside the two verb checks (A2's witness records all three).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's member
 * count as literals, beside the vocabulary, the variants, the checks, the hosts and the fixtures; the judged set (every row's
 * id, label and pins, every pin's quote and witness, the residual members, every registered test title) is held to the
 * out-of-file roster test/fixtures/mw-intent-host-roster.json, which this cut authors with the census (it binds the census to
 * itself, not to an outside source). OUTSIDE ANCHORS (their own registered case) bind exactly this. The bead's own row in the
 * tracker export (.beads/issues.jsonl) binds rows T, A, B and C: each acceptance clause, without its final period and its
 * trailing citation, is exactly the label of row A, B or C, row T's label is the notes' trigger sentence, and the pin quotes
 * of each of those four rows tile its label in order: read in order they carry the label's whole text, leaving out nothing
 * but separators (whitespace, comma, semicolon, colon, parentheses) before the first quote, between two quotes and after
 * the last, and where one quote ends and the next begins, and so how the text is shared among the pins, is not bound. It
 * binds the six codes (the notes' list, in order), the Intent member and the package scope and name (read out of the notes'
 * words), the vocabulary (the six codes, then that member and that name, in order), the code clause B maps to, and the
 * resolution of clause B's citation prefix, MW/ (below).
 * Every notes reading is taken from the owner's 2026-10-17b delta paragraph's own line (the tracker appends each later note
 * on a line of its own, so a park, delivery or gate note binds nothing, and the case shows an appended note naming a new
 * code, trigger and resolution changes no reading). The four variants are J03's and wb-w12's row's. J03 is read from
 * docs/workbench/01 through the landed docsSection binding (test/helpers/census.ts), which reads the page as marked's lexer
 * renders it: the "Concrete user journeys" heading renders exactly once at level 2 (a second level-2 copy anywhere, nested
 * in a block quote or list item included, refuses; a copy at another level does not count), at the page's top level (one
 * that renders only nested refuses), under exactly the page title "01 — Product goals, users, journeys, and exclusions"
 * (another parent refuses), the section runs to the next level-1 or level-2 heading at the page's top level or EOF (a heading
 * nested in a block quote or list item ends nothing), and a code or HTML block in it that carries an ATX heading line (up to
 * three spaces, one to six #, then a space, a tab or the line's end) refuses. The reader then requires the section to carry no
 * HTML of any kind, block or inline, comments included (the binding's hasHtml), and reads the one top-level paragraph block
 * whose rendered text opens with the word J03, whose rendered text must equal its source, whitespace collapsed (so emphasis,
 * a strikethrough, a code span, a link, an image, an escape or a decoded entity in it reads nothing), and the ' / '-separated
 * list its one "preserving the producer's ... outcome rather than collapsing to Boolean success" clause names (the reader
 * counts every match of those words, as written, in the block's rendered text and reads the list only when there is exactly
 * one); a refused binding, HTML in the section, a J03 block whose rendered text is not its source, no such block or more
 * than one, or a J03 block carrying no such clause or more than one (the same clause twice included), read nothing (a
 * J03 inside a list item, block quote or table, or run into the paragraph above it, is no such block). The case's controls
 * show a duplicated heading, another page title, a code block carrying a heading line, a section carrying a comment or a
 * hidden wrapper, and a J03 carrying a strikethrough each reading nothing; the indented, empty, tab-separated, closed and
 * level-1 ATX forms and both Setext forms each
 * ending the section; a J03 past the section's end or inside a list item not read; two J03 paragraphs reading nothing; a J03
 * carrying a second such clause after its own, before it or on its next line, the same clause twice, or none, each reading
 * nothing, and one naming the producer's outcome and Boolean success outside the clause's words reading its one clause; and a
 * J03 indented by one or three spaces, or wrapped over two lines, read whole. Clause C's citation resolves in Pi's own objects
 * to the docs/07 line that counts the variants. Clause B's citation binds the roster producer block's line, the first seven
 * hex digits of its sha (the citation's pin) and the quoted words its text must contain, and the notes' resolution of the
 * citation's MW/ prefix (the delta line resolves the rationale's MW/04-implementation-plan.md to
 * MechanicalWorkflows:docs/programs/collective-adaptation-2026-10-16/04-implementation-plan.md) binds the block's repo and,
 * joined with the citation's file name, its whole path (its blob, the rest of its sha and the rest of its text are the
 * roster's own words). So, with that case
 * intact, each of these changes, made in every literal of this file and the roster together, still reds: removing one of
 * rows T, A, B and C, a word of its label, one of its pins together with its quote, a code, a vocabulary spelling or a
 * variant; rewording a word of such a label, a pin quote, a code, a vocabulary spelling, a variant, the package scope or
 * the stale code. No anchor outside the file binds row Q or any member of it, a pin's id, or how a row's quotes are
 * partitioned into pins (NOT CLAIMED). The last case reads the vitest
 * task tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached its witness
 * compare, and each compare's own result).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included); a host ABI's
 * actual shape (the armed contract is this census's reading of an unpublished ABI: a host whose own cut must take another
 * shape re-measures rows A to C with it); that a cited reference resolves in the producer; MW's own reconcile (the census
 * imports no MechanicalWorkflows package and copies the M0 shapes structurally); a check removed from CHECKS and from the
 * judge together while every remaining mutant still fails one; a mutant, a fixture or a planted control removed from its
 * table, the frozen literal and the roster together while every check still fires; a pin's case replaced by another (one
 * that echoes its roster witness, or any passing case with the roster re-measured to it); row Q and its residuals: the row,
 * a residual family (its pin) or a family member removed from every literal of this file and the roster together (no anchor
 * outside the file names the families or their members); the pin ids and the pin partition: a pin renamed, a boundary
 * between two quotes moved (words passing from one pin's quote to its neighbour's, or a separator at the boundary moving
 * into or out of a quote), or a pin of row T, A, B or C merged into a sibling,
 * its case deleted and its quote re-homed into the sibling's so the row's quotes still tile its label (merging T2 into T1
 * deletes the vocabulary leg, after which a src module spelling an M0 code reds nothing); that the J03 reading is a
 * browser's view of the page beyond what the binding renders: where marked departs from CommonMark the binding follows
 * marked, an entity reference outside the binding's decoded set (&amp; &lt; &gt; &quot; &#39; &#x27; &nbsp;) is read as
 * written, and a section the binding refuses, one carrying HTML, a J03 block whose rendered text is not its source, or one
 * carrying no such clause or more than one reads nothing whatever a browser would show (the census then reds: it fails
 * closed, never open); a second clause in J03 that the clause's words, as written, do not match (another case, another
 * apostrophe, other words) is not counted, so the block reads its one matching clause; the producer block's blob, the
 * rest of its sha past the citation's pin and the rest of its text past the quoted words (the roster's own words, as stated
 * above).
 * RESIDUALS (named families, each family one pinned quiet row over its members; a reader that starts reading a member reds
 * its family's row):
 * R-SPELLING (Q1, an M0 spelling the vocabulary reader does not read: snake case, Pascal case, a code composed at run time),
 * R-COMPUTED-SPECIFIER (Q2, an @mechanical/ module loaded through a computed specifier, a template with a substitution or a
 * createRequire loader), R-SIDE-PATH (Q3, a host that reaches a native effect outside the injected seam: the armed check
 * observes the seam only) and R-REJECTED-PERMIT (Q4, a host that sends a resolver-rejected intent through decideControl and
 * executes the permit it mints: clause A binds the permit, and nothing in the acceptance binds the resolver's admission).
 * SCOPE: the vocabulary reader does not read negation or context, so a src comment that merely names an M0 spelling reds T2
 * (OVER-READ, disclosed: no src module spells one today). The stale reading compares the intent's expectedRevision with the
 * subjectBasis of the node the intent's control target names, the observation model's own basis field.
 *
 * Display paths added: none. Test-only: no src change, no MechanicalWorkflows dependency, adapter, seam or fake package.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  decideControl,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { docsSection } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-4ap.16";
const REQUIREMENT = "COLLECTIVE-ADAPTATION-R16";
const SUITE = `mw intent host census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/mw-intent-host-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The sibling row (VC-3, MechanicalWorkflows native composition) whose statement lists the four outcome variants. */
const VARIANT_BEAD = "wb-w12";
const JOURNEYS = "docs/workbench/01-product-vision-and-user-journeys.md";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** The live cases parse every src module; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

// ---- the vocabulary (bead notes: the M0 package, its Intent member and its six stable rejection codes) ----

/** The M0 resolver's six stable rejection codes, in the notes' order. */
const CODES = ["INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT", "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED"] as const;
/** The code clause B maps to (notes: "Map acceptance (b) ... to INTENT_BASIS_STALE"). */
const STALE = "INTENT_BASIS_STALE";
const REVISION_MEMBER = "expectedRevision";
const PACKAGE_NAME = "workflows-coordination";
/** Every M0 spelling a Pi host must name to read the contract. */
const VOCABULARY: readonly string[] = [...CODES, REVISION_MEMBER, PACKAGE_NAME];
/** The package scope every MechanicalWorkflows package ships under. */
const PACKAGE_SCOPE = "@mechanical/";
/** The four producer outcome variants (docs/workbench/01 J03). */
const VARIANTS = ["verified_candidate", "verification_failed", "needs_evidence", "indeterminate"] as const;
/** The provider spelling the census tries at the control core: none is registered for MechanicalWorkflows. */
const MW_PROVIDER = "mechanical-workflows";

const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** The vocabulary members a text spells, each as a whole case-sensitive token, in VOCABULARY order. */
function namedVocabulary(text: string): string[] {
  return VOCABULARY.filter(word => tokenPattern(word).test(text));
}

const CODE_EXTENSIONS = new Set([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);
function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extname(path).toLowerCase();
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
/** Every literal module specifier a TS or JS text spells: import, export-from, import-equals, require() and import(). */
function specifiersOf(path: string, text: string): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: string[] = [];
  const literal = (node: ts.Node | undefined): void => {
    if (node !== undefined && ts.isStringLiteralLike(node)) found.push(node.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) literal(node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) literal(node.moduleReference.expression);
    else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      literal(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** The MechanicalWorkflows specifiers a module imports (a non-code file imports nothing). */
function mwImports(path: string, text: string): string[] {
  return CODE_EXTENSIONS.has(extname(path).toLowerCase()) ? specifiersOf(path, text).filter(specifier => specifier.startsWith(PACKAGE_SCOPE)) : [];
}

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
/** The MechanicalWorkflows packages a manifest declares, as `<map>:<name>`. */
function manifestFindings(text: string): string[] {
  const manifest: unknown = JSON.parse(text);
  if (!record(manifest)) return ["manifest:unreadable"];
  return DEPENDENCY_MAPS.flatMap(map => {
    const entries = manifest[map];
    return record(entries) ? Object.keys(entries).filter(name => name.startsWith(PACKAGE_SCOPE)).map(name => `${map}:${name}`) : [];
  });
}
/** The lock's package paths that install a MechanicalWorkflows package at any depth. */
function lockFindings(text: string): string[] {
  const lock: unknown = JSON.parse(text);
  if (!record(lock) || !record(lock.packages)) return ["lock:unreadable"];
  return Object.keys(lock.packages).filter(key => key.split("node_modules/").some(part => part.startsWith(PACKAGE_SCOPE)));
}

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8" });
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: textOf(path) }));
  }
  return srcCache;
}

// ---- the M0 shapes (packages/coordination/src/contracts.ts and resolver.ts at cf214758bcff, copied structurally) ----

interface Basis {
  readonly workspaceId: string;
  readonly revision: string;
}
interface Budget {
  readonly compute: number;
  readonly workers: number;
  readonly queue: number;
  readonly latencyMs: number;
}
interface Intent {
  readonly intentId: string;
  readonly policyId: string;
  readonly target: { readonly kind: string; readonly uri: string };
  readonly expectedRevision: string;
  readonly effect: string;
  readonly claim: Budget;
  readonly evidenceRefs: readonly string[];
  readonly writeScopes: readonly string[];
  readonly readScopes: readonly string[];
  readonly authority?: "propose-only" | "authorized-effect";
}
interface Rejection {
  readonly intent: Intent;
  readonly code: string;
  readonly detail: string;
}
interface Resolution {
  readonly basis: Basis;
  readonly budget: Budget;
  readonly admitted: readonly Intent[];
  readonly rejected: readonly Rejection[];
  readonly conflicts: readonly { readonly scope: string; readonly intentIds: readonly string[] }[];
  readonly budgetUsed: Budget;
}

// ---- the armed contract: the census's reading of a host for admitted intents ----

interface HostCall {
  readonly resolution: Resolution;
  /** The resolver receipt's native evidence reference, as its producer states it. */
  readonly resolutionRef: string;
  readonly projection: ObservationProjection;
  /** The control request that carries an intent's effect to its native target. */
  readonly requestOf: (intent: Intent) => NativeControlRequest;
  /** The one native seam: the only path from a host to a native verb. It answers with the producer's outcome variant. */
  readonly native: (decision: ControlDecision) => string;
  readonly now: () => string;
}
interface HostReceipt {
  readonly intentId: string;
  readonly status: "applied" | "conflict" | "denied" | "rejected";
  readonly code?: string;
  readonly variant?: string;
}
interface HostJournal {
  readonly receipts: readonly HostReceipt[];
  readonly evidenceRefs: readonly string[];
}
type IntentHost = (call: HostCall) => HostJournal;

/** The census allowlist: every src module bound as a MechanicalWorkflows intent host, with its armed entry point. Empty today. */
const MW_INTENT_HOSTS: readonly { readonly path: string; readonly host: IntentHost }[] = [];

const WS = "/work/mw-intent-host";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-28T03:00:00Z";
const REQUESTED_AT = "2026-10-28T03:00:01Z";
const DECIDED_AT = "2026-10-28T03:00:02Z";
/** The observed basis every fixture node carries, and the older basis F2's resolver admitted against. */
const CURRENT = "7".repeat(40);
const OLDER = "6".repeat(40);
const CONTROL_GRANTS: readonly string[] = ["observe:furnace.run.inspect", "control:furnace.stop"];
const OBSERVE_GRANTS: readonly string[] = ["observe:furnace.run.inspect"];
const NO_CLAIM: Budget = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
const BUDGET: Budget = { compute: 8, workers: 8, queue: 8, latencyMs: 60_000 };

const runRef = (run: number): NativeRef => ({ provider: "furnace", type: "run", id: `frn-run-mw${run}`, scope: WS });
const attemptRef = (run: number): NativeRef => ({ provider: "furnace", type: "attempt", id: `frn-atm-mw${run}`, scope: WS });

function intent(intentId: string, run: number, expectedRevision: string): Intent {
  return {
    intentId, policyId: "policy-census", target: { kind: "furnace-run", uri: `furnace:run/frn-run-mw${run}` }, expectedRevision, effect: "stop",
    claim: NO_CLAIM, evidenceRefs: [], writeScopes: [`run:frn-run-mw${run}`], readScopes: [],
  };
}
function resolution(revision: string, admitted: readonly Intent[], rejected: readonly Rejection[] = []): Resolution {
  return { basis: { workspaceId: WS, revision }, budget: BUDGET, admitted, rejected, conflicts: [], budgetUsed: NO_CLAIM };
}

interface Fixture {
  readonly id: string;
  readonly resolution: Resolution;
  readonly resolutionRef: string;
  /** Every observed run: its subjectBasis and the variant the native seam answers for it. */
  readonly runs: readonly { readonly run: number; readonly basis: string; readonly answer: string }[];
  /** intentId -> the run its effect targets and the grants its request carries. */
  readonly routes: Readonly<Record<string, { readonly run: number; readonly grants: readonly string[] }>>;
}
const route = (run: number, grants: readonly string[] = CONTROL_GRANTS) => ({ run, grants });
const REJECTED_INTENTS = CODES.map((code, index) => intent(`R${index + 1}`, 8, code === STALE ? OLDER : CURRENT));
const FIXTURES: readonly Fixture[] = [
  { id: "F1", resolution: resolution(CURRENT, [intent("I1", 1, CURRENT)]), resolutionRef: "mw-resolution:f1",
    runs: [{ run: 1, basis: CURRENT, answer: "verified_candidate" }], routes: { I1: route(1) } },
  { id: "F2", resolution: resolution(OLDER, [intent("I2", 2, OLDER)]), resolutionRef: "mw-resolution:f2",
    runs: [{ run: 2, basis: CURRENT, answer: "verified_candidate" }], routes: { I2: route(2) } },
  { id: "F3", resolution: resolution(CURRENT, [intent("I3", 3, CURRENT)]), resolutionRef: "mw-resolution:f3",
    runs: [{ run: 3, basis: CURRENT, answer: "verified_candidate" }], routes: { I3: route(3, OBSERVE_GRANTS) } },
  { id: "F4", resolution: resolution(CURRENT, VARIANTS.map((_, index) => intent(`I${index + 4}`, index + 4, CURRENT))), resolutionRef: "mw-resolution:f4",
    runs: VARIANTS.map((answer, index) => ({ run: index + 4, basis: CURRENT, answer })),
    routes: Object.fromEntries(VARIANTS.map((_, index) => [`I${index + 4}`, route(index + 4)])) },
  { id: "F5", resolution: resolution(CURRENT, [], REJECTED_INTENTS.map((entry, index) => ({ intent: entry, code: CODES[index] ?? STALE, detail: `constructed ${CODES[index] ?? STALE}` }))),
    resolutionRef: "mw-resolution:f5", runs: [{ run: 8, basis: CURRENT, answer: "verified_candidate" }],
    routes: Object.fromEntries(REJECTED_INTENTS.map(entry => [entry.intentId, route(8)])) },
];

function projectionOf(fixture: Fixture): ObservationProjection {
  const projection = new ObservationProjection();
  for (const { run, basis } of fixture.runs) {
    for (const source of [runRef(run), attemptRef(run)]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`, subjectBasis: basis,
        node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: runRef(run), to: attemptRef(run), kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: `frn-req-mw${run}` } });
  }
  return projection;
}
function requestFor(fixture: Fixture, entry: Intent): NativeControlRequest {
  const { run, grants } = fixture.routes[entry.intentId] ?? route(0, OBSERVE_GRANTS);
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [...grants], target: runRef(run), action: "stop",
    params: { confirmed: true }, invocationId: `inv-${entry.intentId}`, requestedAt: REQUESTED_AT };
}
/** The subjectBasis of the node a request's target names, read through the projection. */
function observedBasis(projection: ObservationProjection, request: NativeControlRequest): string | undefined {
  return projection.query({ scope: { workspace: request.scope.workspace, principal: request.scope.principal }, ref: { ...request.target }, limit: 1 }).nodes[0]?.subjectBasis;
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
const targetIdOf = (decision: unknown): unknown => own(own(own(decision, "receipt"), "target"), "id");

interface Drive {
  readonly journal: HostJournal;
  readonly calls: readonly { readonly decision: unknown; readonly answer: string }[];
}
function drive(host: IntentHost, fixture: Fixture): Drive {
  const answers = new Map(fixture.runs.map(({ run, answer }) => [runRef(run).id, answer]));
  const calls: { readonly decision: unknown; readonly answer: string }[] = [];
  const native = (decision: ControlDecision): string => {
    const answer = answers.get(String(targetIdOf(decision))) ?? "indeterminate";
    calls.push({ decision, answer });
    return answer;
  };
  const journal = host({ resolution: fixture.resolution, resolutionRef: fixture.resolutionRef, projection: projectionOf(fixture),
    requestOf: entry => requestFor(fixture, entry), native, now: () => DECIDED_AT });
  return { journal, calls };
}

const CHECKS = ["verb-unpermitted", "verb-unminted", "verb-stale", "stale-receipt", "resolver-ref", "variant"] as const;
type Check = (typeof CHECKS)[number];
/** The admitted intents whose expected revision differs from the observed basis of the run they target. */
function staleIntents(fixture: Fixture): Intent[] {
  const bases = new Map(fixture.runs.map(({ run, basis }) => [run, basis]));
  return fixture.resolution.admitted.filter(entry => bases.get(fixture.routes[entry.intentId]?.run ?? -1) !== entry.expectedRevision);
}
/** The checks one driven fixture fails, in CHECKS order. */
function violations(fixture: Fixture, { journal, calls }: Drive): Check[] {
  const found = new Set<Check>();
  const stale = staleIntents(fixture);
  const staleTargets = new Set(stale.map(entry => runRef(fixture.routes[entry.intentId]?.run ?? -1).id));
  /** What the seam answered per native target, for the calls whose decision names one. */
  const answered = new Map<string, string[]>();
  for (const { decision, answer } of calls) {
    if (own(decision, "decision") !== "permitted") found.add("verb-unpermitted");
    if (!isCoreMintedDecision(decision)) found.add("verb-unminted");
    const target = targetIdOf(decision);
    if (staleTargets.has(String(target))) found.add("verb-stale");
    if (typeof target === "string") answered.set(target, [...(answered.get(target) ?? []), answer]);
  }
  for (const entry of stale) {
    const receipts = journal.receipts.filter(receipt => receipt.intentId === entry.intentId);
    if (receipts.length !== 1 || receipts[0]?.status !== "conflict" || receipts[0]?.code !== STALE) found.add("stale-receipt");
  }
  if (!journal.evidenceRefs.includes(fixture.resolutionRef)) found.add("resolver-ref");
  // An applied receipt carries the answer the seam gave for its intent's target: a variant the producer never stated there
  // (rewritten, collapsed, or reported with no call for that target) is not preserved.
  for (const receipt of journal.receipts) {
    if (receipt.status !== "applied") continue;
    const target = runRef(fixture.routes[receipt.intentId]?.run ?? -1).id;
    if (receipt.variant === undefined || !(answered.get(target) ?? []).includes(receipt.variant)) found.add("variant");
  }
  return CHECKS.filter(check => found.has(check));
}
/** One host over every fixture: each fixture's failed checks. */
function violationsOf(host: IntentHost): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(fixture => [fixture.id, violations(fixture, drive(host, fixture))]));
}

/** A hand-built permit shaped as the core mints one, never minted: what a host executing an intent directly would hand over. */
function lookalike(request: NativeControlRequest): ControlDecision {
  const grant = `control:${request.target.provider}.${request.action}`;
  return {
    decision: "permitted",
    receipt: {
      contractVersion: CONTROL_CONTRACT_VERSION, requestId: `ctl_${"0".repeat(32)}`, scope: { ...request.scope }, principal: { ...request.principal }, grant,
      policy: CONTROL_PERMIT_POLICY, target: { ...request.target }, action: request.action, invocationId: request.invocationId,
      ownershipConfirmationRef: "frn-req-lookalike", requestedAt: request.requestedAt, decidedAt: DECIDED_AT, phase: "requested",
    },
  };
}
/** How a synthetic host departs from the honest one (an empty shape is the honest host). */
interface Shape {
  /** false: skip the basis comparison. */
  readonly basisCheck?: boolean;
  /** How a stale intent is reported. */
  readonly staleAs?: "conflict" | "denied";
  /** lookalike: never ask the core; copy: hand over a copy of the core's decision. Either skips the provenance check. */
  readonly decide?: "lookalike" | "copy";
  /** Hand the seam the core's decision whatever its verdict. */
  readonly executeDenied?: boolean;
  readonly ref?: "kept" | "dropped" | "rewritten";
  readonly variant?: (answer: string) => string;
  /** Report a permitted intent applied with the first documented variant without invoking the seam. */
  readonly fabricate?: boolean;
  /** Also send each resolver-rejected intent through the core and execute the permit it mints. */
  readonly executeRejected?: boolean;
  /** A native effect reached outside the injected seam, once per applied intent. */
  readonly side?: () => void;
}
function hostOf(shape: Shape): IntentHost {
  return call => {
    const receipts: HostReceipt[] = [];
    const deps = { projection: call.projection, now: call.now };
    for (const rejection of call.resolution.rejected) {
      receipts.push({ intentId: rejection.intent.intentId, status: "rejected", code: rejection.code });
      if (shape.executeRejected !== true) continue;
      const decision = decideControl(call.requestOf(rejection.intent), deps);
      if (decision.decision === "permitted" && isCoreMintedDecision(decision)) call.native(decision);
    }
    for (const entry of call.resolution.admitted) {
      const request = call.requestOf(entry);
      if (shape.basisCheck !== false && observedBasis(call.projection, request) !== entry.expectedRevision) {
        receipts.push(shape.staleAs === "denied" ? { intentId: entry.intentId, status: "denied" } : { intentId: entry.intentId, status: "conflict", code: STALE });
        continue;
      }
      let decision: ControlDecision;
      if (shape.decide === "lookalike") decision = lookalike(request);
      else {
        const minted = decideControl(request, deps);
        decision = shape.decide === "copy" ? { ...minted } : minted;
      }
      const executes = shape.executeDenied === true || (decision.decision === "permitted" && (shape.decide !== undefined || isCoreMintedDecision(decision)));
      if (!executes) {
        receipts.push({ intentId: entry.intentId, status: "denied" });
        continue;
      }
      if (shape.fabricate === true) {
        receipts.push({ intentId: entry.intentId, status: "applied", variant: VARIANTS[0] });
        continue;
      }
      shape.side?.();
      const answer = call.native(decision);
      receipts.push({ intentId: entry.intentId, status: "applied", variant: shape.variant === undefined ? answer : shape.variant(answer) });
    }
    const evidenceRefs = shape.ref === "dropped" ? [] : shape.ref === "rewritten" ? [`mw:${call.resolutionRef}`] : [call.resolutionRef];
    return { receipts, evidenceRefs };
  };
}
const HONEST = hostOf({});
/** The synthetic bindings that must each fail the armed check: one or two per acceptance quote. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-DENIED": { executeDenied: true },
  "M-LOOKALIKE": { decide: "lookalike" },
  "M-COPY": { decide: "copy" },
  "M-STALE-APPLIED": { basisCheck: false },
  "M-STALE-DENIED": { staleAs: "denied" },
  "M-REF-DROPPED": { ref: "dropped" },
  "M-REF-REWRITTEN": { ref: "rewritten" },
  "M-VARIANT-COLLAPSED": { variant: answer => (answer === "verified_candidate" ? answer : "verification_failed") },
  "M-VARIANT-BOOLEAN": { variant: answer => (answer === "verified_candidate" ? "success" : "failure") },
  "M-FABRICATED": { fabricate: true },
};
const mutant = (name: string): Record<string, Check[]> => violationsOf(hostOf(MUTANTS[name] ?? {}));
const fixture = (id: string): Fixture => FIXTURES.find(entry => entry.id === id) ?? (FIXTURES[0] as Fixture);

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** Row T: the notes' trigger sentence; rows A to C: an acceptance clause; row Q: the residual families. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "when MW publishes a host ABI for admitted intents",
  T2: "or Pi decides to host coordination policies",
  A1: "On landing: a host test drives an M0 intent through the Pi host",
  A2: "and asserts no native verb is invoked unless decideControl returned 'permitted'",
  A3: "with a core-minted receipt (isCoreMintedDecision)",
  B1: "An intent whose expected source revision differs from the observed node basis",
  B2: "is reported as a conflict receipt",
  B3: "not applied",
  C1: "The resolver receipt is journaled as a native evidence reference",
  C2: "and the four MW outcome variants are preserved",
  Q1: "R-SPELLING",
  Q2: "R-COMPUTED-SPECIFIER",
  Q3: "R-SIDE-PATH",
  Q4: "R-REJECTED-PERMIT",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "when MW publishes a host ABI for admitted intents (or Pi decides to host coordination policies)", pins: ["T1", "T2"] },
  {
    id: "A",
    label: "On landing: a host test drives an M0 intent through the Pi host and asserts no native verb is invoked unless decideControl returned 'permitted' with a core-minted receipt (isCoreMintedDecision)",
    pins: ["A1", "A2", "A3"],
  },
  { id: "B", label: "An intent whose expected source revision differs from the observed node basis is reported as a conflict receipt, not applied", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "The resolver receipt is journaled as a native evidence reference and the four MW outcome variants are preserved", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4"] },
];

/** The residual families' members: texts for the two readers (Q1, Q2), synthetic hosts for the armed check (Q3, Q4). */
const SPELLINGS: Readonly<Record<string, string>> = {
  "snake-case": "const expected_revision = relayed.expected_revision;\nif (code === \"intent_basis_stale\") return \"conflict\";\n",
  "pascal-case": "export enum RejectionCode { IntentBasisStale, IntentWriteConflict }\nconst member = \"ExpectedRevision\";\n",
  composed: `const code = ["INTENT", "BASIS", "STALE"].join("_");\nconst member = \`expected\${"Revision"}\`;\n`,
};
const COMPUTED: Readonly<Record<string, string>> = {
  "concatenated-specifier": "const scope = \"@mechanical/\";\nexport const load = (name: string) => import(scope + name);\n",
  "template-substitution": `export const load = (name: string) => import(\`@mechanical/\${name}\`);\n`,
  "create-require": "import { createRequire } from \"node:module\";\nconst load = createRequire(import.meta.url);\nexport const coordination = load(\"@mechanical/x\");\n",
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: Object.keys(COMPUTED),
  Q3: ["side-path-host"],
  Q4: ["rejected-permit-host"],
};

// ---- the planted controls ----

const MANIFEST_PLANT = JSON.stringify({ name: "planted", devDependencies: { "@mechanical/workflows-coordination": "0.1.0", vitest: "4.0.0" }, peerDependencies: { "@mechanical/workflows-development": "0.1.0" } });
const LOCK_PLANT = JSON.stringify({ packages: { "": {}, "node_modules/@mechanical/workflows-coordination": {}, "node_modules/a/node_modules/@mechanical/b": {}, "node_modules/vitest": {} } });
const IMPORT_PLANTS: Readonly<Record<string, string>> = {
  import: "import { reconcile } from \"@mechanical/workflows-coordination\";\n",
  "export-from": "export type { Intent } from \"@mechanical/workflows-coordination\";\n",
  "import-equals": "import coordination = require(\"@mechanical/workflows-coordination\");\n",
  require: "const coordination = require(\"@mechanical/workflows-coordination\");\n",
  "dynamic-import": "export const coordination = await import(\"@mechanical/workflows-coordination\");\n",
  quiet: "import { decideControl } from \"./control.js\";\nexport const at = \"@mechanical/ in a string\";\n",
};
const VOCABULARY_PLANTS: Readonly<Record<string, string>> = {
  code: "if (rejection.code === \"INTENT_BASIS_STALE\") return \"conflict\";\n",
  member: "const revision = intent.expectedRevision;\n",
  all: `${CODES.join(" ")} expectedRevision @mechanical/workflows-coordination\n`,
  quiet: "const revision = node.subjectBasis;\nconst expectedRevisions = 1;\nconst code = \"INTENT_BASIS_STALE_X\";\n",
};

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const manifest = manifestFindings(textOf("package.json"));
    const lock = lockFindings(textOf("package-lock.json"));
    const src = srcEntries();
    const imports = src.flatMap(entry => mwImports(entry.path, entry.text).map(specifier => `${entry.path}: ${specifier}`));
    expect(manifest, "package.json declares no @mechanical/ package").toEqual([]);
    expect(lock, "package-lock.json installs no @mechanical/ package").toEqual([]);
    expect(imports, "no src module imports an @mechanical/ package").toEqual([]);
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    const readsCore = src.find(entry => entry.path === "src/workbench/control.ts")?.text.includes("export function isCoreMintedDecision(") === true;
    expect(readsCore, "the src leg read the control core's real text").toBe(true);
    const controls = {
      manifest: manifestFindings(MANIFEST_PLANT),
      lock: lockFindings(LOCK_PLANT),
      imports: Object.fromEntries(Object.entries(IMPORT_PLANTS).map(([label, text]) => [label, mwImports("src/workbench/zz.ts", text)])),
      nonCode: mwImports("src/workbench/zz.md", IMPORT_PLANTS.import ?? ""),
    };
    for (const [label, found] of Object.entries(controls.imports)) {
      if (label === "quiet") expect(found, "a relative import and a string are no import").toEqual([]);
      else expect(found, `the ${label} control is read`).toEqual(["@mechanical/workflows-coordination"]);
    }
    return { manifest, lock, imports, srcFloor: src.length >= SRC_FLOOR, readsCore, controls };
  },
  T2: () => {
    const hosts = srcEntries().filter(entry => namedVocabulary(entry.text).length > 0 || mwImports(entry.path, entry.text).length > 0);
    const named = hosts.map(entry => `${entry.path}: ${namedVocabulary(entry.text).join(", ")}`);
    const bound = MW_INTENT_HOSTS.map(entry => entry.path);
    expect(named, "no src module spells the M0 vocabulary or imports its package").toEqual([]);
    expect(hosts.map(entry => entry.path), "the src modules that host are exactly the bound hosts").toEqual(bound);
    const controls = Object.fromEntries(Object.entries(VOCABULARY_PLANTS).map(([label, text]) => [label, namedVocabulary(text)]));
    expect(controls.all, "every member is read").toEqual([...VOCABULARY]);
    expect(controls.quiet, "the subjectBasis read and near tokens are not the vocabulary").toEqual([]);
    return { named, bound, controls };
  },
  A1: () => {
    const bound = MW_INTENT_HOSTS.map(entry => ({ path: entry.path, violations: violationsOf(entry.host) }));
    for (const entry of bound) expect(Object.values(entry.violations).flat(), `${entry.path} meets every check`).toEqual([]);
    const honest = violationsOf(HONEST);
    const honestCalls = Object.fromEntries(FIXTURES.map(entry => [entry.id, drive(HONEST, entry).calls.length]));
    const judged = Object.fromEntries(Object.keys(MUTANTS).map(name => [name, mutant(name)]));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(list => list.includes(check))));
    const quiet = Object.entries(judged).filter(([, table]) => Object.values(table).every(list => list.length === 0)).map(([name]) => name);
    expect(Object.values(honest).flat(), "the honest host meets every check on every fixture").toEqual([]);
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    return { bound: bound.map(entry => entry.path), fixtures: FIXTURES.map(entry => entry.id), honest, honestCalls, fired, quiet };
  },
  A2: () => {
    const request: NativeControlRequest = {
      scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [`control:${MW_PROVIDER}.apply`],
      target: { provider: MW_PROVIDER, type: "intent", id: "I1", scope: WS }, action: "apply", params: { confirmed: true }, invocationId: "inv-mw", requestedAt: REQUESTED_AT,
    };
    const core = decideControl(request, { projection: projectionOf(fixture("F1")), now: () => DECIDED_AT });
    const denial: Json = core.decision === "denied" ? { decision: core.decision, policy: core.policy, category: core.category } : { decision: core.decision };
    expect(denial, "the core has no MechanicalWorkflows verb").toEqual({ decision: "denied", policy: "unknown-action", category: "validation" });
    const executed = mutant("M-DENIED");
    expect(executed.F3, "a denial handed to the seam is caught").toContain("verb-unpermitted");
    return { registered: Object.hasOwn(NATIVE_CONTROL_ACTIONS, MW_PROVIDER), denial, "M-DENIED": executed };
  },
  A3: () => {
    const F1 = fixture("F1");
    const projection = projectionOf(F1);
    const minted = decideControl(requestFor(F1, F1.resolution.admitted[0] as Intent), { projection, now: () => DECIDED_AT });
    const denied = decideControl(requestFor(fixture("F3"), fixture("F3").resolution.admitted[0] as Intent), { projection: projectionOf(fixture("F3")), now: () => DECIDED_AT });
    const truth = {
      minted: isCoreMintedDecision(minted),
      spread: isCoreMintedDecision({ ...minted }),
      json: isCoreMintedDecision(JSON.parse(JSON.stringify(minted))),
      denial: isCoreMintedDecision(denied),
      intent: isCoreMintedDecision(F1.resolution.admitted[0]),
      rejection: isCoreMintedDecision(fixture("F5").resolution.rejected[0]),
      resolution: isCoreMintedDecision(F1.resolution),
    };
    expect(truth, "only the very permit the core minted is core-minted").toEqual({ minted: true, spread: false, json: false, denial: false, intent: false, rejection: false, resolution: false });
    return { truth, "M-LOOKALIKE": mutant("M-LOOKALIKE"), "M-COPY": mutant("M-COPY") };
  },
  B1: () => {
    const F2 = fixture("F2");
    const entry = F2.resolution.admitted[0] as Intent;
    const observed = observedBasis(projectionOf(F2), requestFor(F2, entry)) ?? null;
    const run = drive(HONEST, F2);
    expect(observed, "the observed node's basis has moved past the intent's").not.toBe(entry.expectedRevision);
    expect(entry.expectedRevision, "the resolver admitted the intent against its own basis").toBe(F2.resolution.basis.revision);
    return { expected: entry.expectedRevision, observed, resolverBasis: F2.resolution.basis.revision, stale: staleIntents(F2).map(item => item.intentId),
      honest: run.journal.receipts.map(receipt => ({ ...receipt })), honestCalls: run.calls.length };
  },
  B2: () => {
    const receipts = drive(HONEST, fixture("F2")).journal.receipts.map(receipt => ({ ...receipt }));
    expect(receipts, "the honest host reports a conflict receipt").toEqual([{ intentId: "I2", status: "conflict", code: STALE }]);
    return { honest: receipts, "M-STALE-DENIED": mutant("M-STALE-DENIED"), "M-STALE-APPLIED": mutant("M-STALE-APPLIED") };
  },
  B3: () => {
    const honestCalls = drive(HONEST, fixture("F2")).calls.length;
    const applied = drive(hostOf(MUTANTS["M-STALE-APPLIED"] ?? {}), fixture("F2"));
    expect(honestCalls, "the honest host invokes no verb for a stale intent").toBe(0);
    return { honestCalls, appliedCalls: applied.calls.length, appliedMinted: applied.calls.map(call => isCoreMintedDecision(call.decision)), "M-STALE-APPLIED": mutant("M-STALE-APPLIED") };
  },
  C1: () => {
    const refs = Object.fromEntries(FIXTURES.map(entry => [entry.id, [...drive(HONEST, entry).journal.evidenceRefs]]));
    for (const entry of FIXTURES) expect(refs[entry.id], `${entry.id} journals the resolver receipt's reference`).toEqual([entry.resolutionRef]);
    return { refs, "M-REF-DROPPED": mutant("M-REF-DROPPED"), "M-REF-REWRITTEN": mutant("M-REF-REWRITTEN") };
  },
  C2: () => {
    const variants = drive(HONEST, fixture("F4")).journal.receipts.map(receipt => receipt.variant ?? null);
    expect(variants, "the honest host carries each variant verbatim").toEqual([...VARIANTS]);
    return { variants, "M-VARIANT-COLLAPSED": mutant("M-VARIANT-COLLAPSED"), "M-VARIANT-BOOLEAN": mutant("M-VARIANT-BOOLEAN"), "M-FABRICATED": mutant("M-FABRICATED") };
  },
  Q1: () => {
    const findings = Object.fromEntries(Object.entries(SPELLINGS).map(([name, text]) => [name, namedVocabulary(text)]));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    return findings;
  },
  Q2: () => {
    const findings = Object.fromEntries(Object.entries(COMPUTED).map(([name, text]) => [name, mwImports("src/workbench/zz.ts", text)]));
    expect(Object.values(findings).flat(), "R-COMPUTED-SPECIFIER: every member is quiet").toEqual([]);
    return findings;
  },
  Q3: () => {
    let side = 0;
    const found = violationsOf(hostOf({ side: () => { side += 1; } }));
    expect(Object.values(found).flat(), "R-SIDE-PATH: the armed check reads the seam only").toEqual([]);
    expect(side, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, side };
  },
  Q4: () => {
    const host = hostOf({ executeRejected: true });
    const found = violationsOf(host);
    const calls = drive(host, fixture("F5")).calls.length;
    expect(Object.values(found).flat(), "R-REJECTED-PERMIT: no check reads the resolver's admission").toEqual([]);
    expect(calls, "rejected intents reached the seam with minted permits").toBeGreaterThan(0);
    return { violations: found, rejectedCalls: calls };
  },
};

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
  readonly producer: { readonly repo: string; readonly sha: string; readonly path: string; readonly blob: string; readonly line: number; readonly text: string };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's row for a bead. */
function beadRow(bead: string): { readonly title: string; readonly description: string; readonly notes: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!record(row) || row.id !== bead) continue;
    const { title, description, notes } = row;
    if (typeof title === "string" && typeof description === "string") return { title, description, notes: typeof notes === "string" ? notes : "" };
  }
  return undefined;
}
/** The owner's 2026-10-17b delta paragraph opens with this; the tracker appends every later note on a line of its own. */
const DELTA_OPENING = "2026-10-17b (CLUSTERS-delta N11; gate HALF-OPEN): ";
/** What the anchors read from the notes: the delta paragraph's line only, so a note appended later (a park, delivery or gate note) binds nothing. */
function deltaReading(notes: string): {
  readonly trigger?: string;
  readonly codes: readonly string[];
  readonly packageScope?: string;
  readonly packageName?: string;
  readonly member?: string;
  readonly staleCode?: string;
  readonly citationPrefix?: string;
  readonly producerRepo?: string;
  readonly producerDirectory?: string;
} {
  const delta = notes.split("\n").find(line => line.startsWith(DELTA_OPENING)) ?? "";
  // The M0 package is the one the notes give a Forge member of its own name: "`@scope/name` (Forge member `library:name`".
  const m0Package = /`(@[a-z][\w-]*\/)([a-z][\w-]*)` \(Forge member `library:\2`/.exec(delta);
  // The notes resolve one rationale citation: "'... (MW/<file>:<lines>@<pin>)' resolves to <repo>:<directory>/<file>:<lines>",
  // the same file name on both sides, so the prefix MW/ reads as that repo and directory.
  const resolved = /\((\w+\/)([\w.-]+):[\d-]+@[0-9a-f]{7,40}\)' resolves to (\w+):((?:[\w.-]+\/)+)\2:[\d-]+ /.exec(delta);
  return {
    trigger: /the trigger becomes '([^']+)' \(MW-M0-PI-1\)/.exec(delta)?.[1],
    codes: [...new Set(delta.match(/\bINTENT_[A-Z_]+\b/g) ?? [])],
    packageScope: m0Package?.[1],
    packageName: m0Package?.[2],
    member: /`Intent` \((\w+); optional authority\)/.exec(delta)?.[1],
    staleCode: /Map acceptance \(b\) \('expected source revision differs \.\.\. conflict receipt'\) to (\w+)\./.exec(delta)?.[1],
    citationPrefix: resolved?.[1],
    producerRepo: resolved?.[3],
    producerDirectory: resolved?.[4],
  };
}
/** The description's ACCEPTANCE list: each element of its one-line bracket, single- or double-quoted. */
function acceptanceClauses(description: string): string[] {
  const body = /^ACCEPTANCE: \[(.*)\]$/m.exec(description)?.[1] ?? "";
  return [...body.matchAll(/(["'])(.*?)\1(?=, |$)/g)].map(match => match[2] ?? "");
}
/** docs/workbench/01's page title (its one level-1 heading) and the section under it that holds the journeys. */
const JOURNEY_PAGE = "01 — Product goals, users, journeys, and exclusions";
const JOURNEY_HEADING = "Concrete user journeys";
/**
 * J03's variants, read through the landed docsSection binding: the heading renders exactly once at level 2 under the page
 * title, and the section runs to the next top-level level-1 or level-2 heading or EOF. A refused binding or a section carrying
 * any HTML reads nothing; so do no top-level paragraph block whose rendered text opens with J03 or more than one, and a J03
 * block whose rendered text is not its source. The variants are the ' / '-separated list that block's one
 * "preserving the producer's ... outcome rather than collapsing to Boolean success" clause names: every match of those words,
 * as written, in the block's rendered text is counted, and a block carrying no such clause or more than one reads nothing.
 */
function journeyVariants(text: string): readonly string[] | undefined {
  const section = docsSection(text, JOURNEY_HEADING, 2, [JOURNEY_PAGE]);
  if (!section.ok || section.hasHtml) return undefined;
  const j03 = section.blocks.flatMap(block => (block.kind === "paragraph" && /^J03\b/.test(block.text) ? [block] : []));
  const only = j03.length === 1 ? j03[0] : undefined;
  if (only === undefined || only.markdown !== only.text) return undefined;
  const clauses = [...only.text.matchAll(/preserving the producer's (.+?) outcome rather than collapsing to Boolean success/g)];
  return clauses.length === 1 ? clauses[0]?.[1]?.split(" / ") : undefined;
}
/** A clause without its final period and without a trailing parenthetical that cites a pinned source (path:line@sha). */
function labelOf(clause: string): { readonly label: string; readonly citation?: string } {
  const bare = clause.replace(/\.$/, "");
  const cited = /^(.*) \(([^()]*:\d+@[0-9a-f]{7,40}[^()]*)\)$/.exec(bare);
  return cited ? { label: cited[1] ?? "", citation: cited[2] ?? "" } : { label: bare };
}
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(label.slice(at));
}

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the vocabulary, the variants, the checks, the hosts and the fixtures are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:2", "A:3", "B:3", "C:2", "Q:4"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:3", "Q2:3", "Q3:1", "Q4:1"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(VOCABULARY).toEqual([
      "INTENT_BASIS_STALE",
      "INTENT_SCOPE_PROTECTED",
      "INTENT_WRITE_CONFLICT",
      "INTENT_BUDGET_EXCEEDED",
      "INTENT_DUPLICATE",
      "INTENT_AUTHORITY_EXCEEDED",
      "expectedRevision",
      "workflows-coordination",
    ]);
    expect(VARIANTS).toEqual(["verified_candidate", "verification_failed", "needs_evidence", "indeterminate"]);
    expect(CHECKS).toEqual(["verb-unpermitted", "verb-unminted", "verb-stale", "stale-receipt", "resolver-ref", "variant"]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-DENIED",
      "M-LOOKALIKE",
      "M-COPY",
      "M-STALE-APPLIED",
      "M-STALE-DENIED",
      "M-REF-DROPPED",
      "M-REF-REWRITTEN",
      "M-VARIANT-COLLAPSED",
      "M-VARIANT-BOOLEAN",
      "M-FABRICATED",
    ]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.resolution.admitted.length}+${entry.resolution.rejected.length}`)).toEqual(["F1:1+0", "F2:1+0", "F3:1+0", "F4:4+0", "F5:0+6"]);
    expect(MW_INTENT_HOSTS).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
  });

  it("the outside anchors: the bead's own row binds rows T, A, B and C (each label, which its quotes tile in order), the six codes, the vocabulary, the package scope, the stale code and the producer citation, whose prefix the notes resolve; J03, read through docsSection, and wb-w12 bind the variants; clause C's citation resolves; row Q and the pin partition are not anchored", { timeout: 60_000 }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    expect(title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    const clauses = acceptanceClauses(row?.description ?? "").map(labelOf);
    expect(clauses.map(clause => clause.label), "the acceptance holds three clauses, each exactly one row's label").toEqual(["A", "B", "C"].map(id => ROWS.find(entry => entry.id === id)?.label));
    const delta = deltaReading(notes);
    expect(delta.trigger, "row T's label is the notes' trigger sentence").toBe(ROWS.find(entry => entry.id === "T")?.label);
    // The anchored rows are the rows those two readings name, and only their quotes' text is bound (the tiling), never how many
    // pins share it; no reading names row Q.
    const anchored = [delta.trigger, ...clauses.map(clause => clause.label)].map(label => ROWS.find(entry => entry.label === label));
    expect(anchored.map(entry => entry?.id ?? null), "the anchors name rows T, A, B and C").toEqual(["T", "A", "B", "C"]);
    for (const entry of anchored) {
      expect(tiles(entry?.label ?? "-", (entry?.pins ?? []).map(pin => QUOTES[pin] ?? "")), `row ${entry?.id ?? "-"}'s pin quotes tile its label`).toBe(true);
    }
    expect(delta.codes, "the six codes are the notes' list, in order").toEqual([...CODES]);
    expect(delta.member, "the intent's revision member is the notes' word").toBe(REVISION_MEMBER);
    expect([delta.packageScope, delta.packageName], "the package scope and name are the notes' M0 package").toEqual([PACKAGE_SCOPE, PACKAGE_NAME]);
    expect(VOCABULARY, "the vocabulary is the notes' six codes, then its Intent member and its package name").toEqual([...delta.codes, delta.member, delta.packageName]);
    expect(delta.staleCode, "clause B maps to the stale code").toBe(STALE);
    const appended = `${notes}\n2026-10-28 appended note: INTENT_BASIS_STALE_X; the trigger becomes 'something else' (MW-M0-PI-1); the rationale line 'x (MW/09-x.md:1@b8264aa)' resolves to Elsewhere:docs/x/09-x.md:1 here.`;
    expect(deltaReading(appended), "a note appended after the delta paragraph changes no reading").toEqual(delta);
    expect(journeyVariants(textOf(JOURNEYS)), "the four variants are docs/workbench/01 J03's").toEqual([...VARIANTS]);
    const page = (body: string, title = JOURNEY_PAGE): string => `# ${title}\n\n## ${JOURNEY_HEADING}\n\n${body}\n\n## Outcome measures\n`;
    const sentence = (variants: readonly string[]): string => `J03 binds, preserving the producer's ${variants.join(" / ")} outcome rather than collapsing to Boolean success.`;
    const fewer = VARIANTS.slice(1);
    expect(journeyVariants(page(sentence(VARIANTS))), "the controls' page reads the four").toEqual([...VARIANTS]);
    expect(journeyVariants(page(`<!-- ${sentence(VARIANTS)} -->\n${sentence(fewer)}`)), "a commented-out J03 is not read: a section carrying HTML reads nothing").toBeUndefined();
    expect(journeyVariants(page(`<div hidden>\n\n${sentence(VARIANTS)}\n\n</div>`)), "a J03 inside a hidden wrapper is not read").toBeUndefined();
    expect(journeyVariants(page(sentence(VARIANTS).replace("needs_evidence", "~~needs_evidence~~"))), "a J03 carrying a strikethrough reads nothing").toBeUndefined();
    expect(journeyVariants(`${page(sentence(fewer))}\n${sentence(VARIANTS)}\n`), "a J03 outside its section is not read").toEqual(fewer);
    expect(journeyVariants(page(`- ${sentence(VARIANTS)}`)), "a J03 inside a list item is not read").toBeUndefined();
    expect(journeyVariants(page(`${sentence(VARIANTS)}\n\n${sentence(VARIANTS)}`)), "two J03 paragraphs fail closed").toBeUndefined();
    const three = VARIANTS.filter(variant => variant !== "needs_evidence");
    const draft = (variants: readonly string[]): string => `A later draft reads: preserving the producer's ${variants.join(" / ")} outcome rather than collapsing to Boolean success.`;
    expect(journeyVariants(page(`${sentence(VARIANTS)} ${draft(three)}`)), "a J03 carrying a second such clause after its own reads nothing").toBeUndefined();
    expect(journeyVariants(page(`${sentence(three)} ${draft(VARIANTS)}`)), "a J03 whose clause follows a second such clause reads nothing").toBeUndefined();
    expect(journeyVariants(page(`${sentence(VARIANTS)}\n${draft(three)}`)), "a J03 carrying a second such clause on its next line reads nothing").toBeUndefined();
    expect(journeyVariants(page(`${sentence(VARIANTS)} ${draft(VARIANTS)}`)), "a J03 carrying the same clause twice reads nothing").toBeUndefined();
    expect(journeyVariants(page("J03 binds, with no outcome clause.")), "a J03 carrying no such clause reads nothing").toBeUndefined();
    expect(journeyVariants(page(`${sentence(VARIANTS)} The producer's outcome is never collapsed to Boolean success.`)), "a J03 naming the producer's outcome and Boolean success outside the clause's words reads its one clause").toEqual([...VARIANTS]);
    expect(journeyVariants(page(`${sentence(VARIANTS)}\n\n## ${JOURNEY_HEADING}\n\n${sentence(fewer)}`)), "a duplicated journeys heading reads nothing").toBeUndefined();
    expect(journeyVariants(page(sentence(VARIANTS), "Another page")), "the section under another page title reads nothing").toBeUndefined();
    expect(journeyVariants(page(`J01 x\n\n\`\`\`\n## not a heading\n\`\`\`\n\n${sentence(VARIANTS)}`)), "a code block carrying a heading line reads nothing").toBeUndefined();
    for (const heading of [" ## Interlude", "  # Appendix", "##", "##\tInterlude", "## Interlude ##", "# Appendix", "Interlude\n---------", "Interlude\n========="]) {
      expect(journeyVariants(page(`J01 x\n\n${heading}\n\n${sentence(VARIANTS)}`)), `${JSON.stringify(heading)} ends the section`).toBeUndefined();
    }
    expect(journeyVariants(page(` ${sentence(VARIANTS)}`)), "a J03 paragraph indented by one space is read whole").toEqual([...VARIANTS]);
    expect(journeyVariants(page(`   ${sentence(VARIANTS)}`)), "and by three").toEqual([...VARIANTS]);
    expect(journeyVariants(page(sentence(VARIANTS).replace(" / needs_evidence", "\n/ needs_evidence"))), "a J03 paragraph wrapped over two lines is read whole").toEqual([...VARIANTS]);
    const sibling = /\(([a-z_/]+)\)/.exec(beadRow(VARIANT_BEAD)?.description ?? "")?.[1]?.split("/");
    expect(sibling, "and wb-w12's").toEqual([...VARIANTS]);
    const citationC = clauses[2]?.citation ?? "";
    const pinC = /^([\w./-]+):(\d+)@([0-9a-f]{7,40})$/.exec(citationC);
    const cited = execFileSync("git", ["show", `${pinC?.[3] ?? "-"}:${pinC?.[1] ?? "-"}`], { cwd: ROOT, encoding: "utf8" }).split("\n")[Number(pinC?.[2]) - 1] ?? "";
    expect(cited, "clause C's citation resolves to the line that records native evidence references").toContain("record native evidence references");
    expect(cited, "and counts the variants").toContain(`preserve ${["zero", "one", "two", "three", "four", "five"][VARIANTS.length] ?? "-"} existing outcome variants`);
    const citationB = /^(\w+\/)([\w.-]+):(\d+)@([0-9a-f]{7,40}) '(.+)'$/.exec(clauses[1]?.citation ?? "");
    const producer = ROSTER.producer;
    expect(citationB?.[1] ?? "no clause B prefix", "clause B cites under the prefix the notes resolve").toBe(delta.citationPrefix ?? "no resolved prefix");
    expect(producer.repo, "the producer repo is the notes' resolution of that prefix").toBe(delta.producerRepo ?? "no resolved repo");
    expect(producer.path, "the producer path is that resolution's directory and clause B's file name").toBe(`${delta.producerDirectory ?? "no resolved directory/"}${citationB?.[2] ?? "-"}`);
    expect(producer.line, "the producer line is clause B's").toBe(Number(citationB?.[3]));
    expect(producer.sha.startsWith(citationB?.[4] ?? "-"), "the producer sha is clause B's pin").toBe(true);
    expect(producer.text, "the producer line carries clause B's quote").toContain(citationB?.[5] ?? "-");
    expect(typeof decideControl === "function" && typeof isCoreMintedDecision === "function", "the control core exports the clause's two names").toBe(true);
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/mw-intent-host-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
  });
});
