/**
 * wb-jwc.6 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R6): the rf operation-receipt reconcile read - HONESTY CORE, STANDING LEG
 * AND GATE TRIPWIRE, the part of the bead that lands while the R5 conjoint gate is closed. Cut #4 is authored in the
 * enumerate-the-resolvable form (standing rule 19(c), engaged at refusal #3): this header and every pinned requirement claim exactly
 * what the readers below resolve, and every known mode they do not pin is a NAMED RESIDUAL with a pinned quiet row (row R).
 *
 * OWNER FILING (the outside anchor): the tracked bead export .beads/issues.jsonl, row wb-jwc.6, read through its description
 * only, so a note a lane appends later changes nothing read. Its STATEMENT ("When <trigger> (<conjuncts>), Pi shall <duty>;
 * <never>.") gives clauses statement.1-3; its ACCEPTANCE list gives acceptance.1-4; its SURFACES line gives the surface files.
 * Each clause maps to exactly one judged row or to the PARKED remainder (CLAUSE_ROWS), and that map must equal the one the filing's
 * own text gives (respin 3 H2): the statement's trigger, duty and never clause are rows G, S and N; an acceptance item opening with
 * the label "Negative guard (honesty core): " holds before the gate and is row H; every other acceptance item specifies the gated
 * duty and is PARKED. Every row's pins are generated from an anchor outside this file:
 *   G statement.1, the trigger: the gate's Pi-side conjunct (wb-x32's committing decision) is still closed. Three readers over THE
 *     SRC TREE (respin 3 U2): every file under src/, whatever its name. A file whose extension is a TypeScript or JavaScript module
 *     extension (.ts .mts .cts .tsx .js .mjs .cjs .jsx; a declaration file ends in one) is parsed with its own script kind; every
 *     other file under src/ is listed in the G:id witness (none today), so a new one moves it; and a relative module specifier a
 *     src module writes as a whole string token in an import or export declaration, an import() call or a require() call that
 *     resolves outside src/ is listed there too (none today). Each reader reads only what it names:
 *     IDS - one pin per rf capability id a whole src string token spells (a string literal or a template with no
 *     substitution). An rf capability id is a token whose producer (src producerOf, the first `.`/`-` segment) is reactivefiber
 *     and which the real CapabilityRegistry accepts as a descriptor id: the registry's own grammar judges every token, so no
 *     census copy of it can be narrower than what the registry registers (respin 1 U3). Today that is only
 *     reactivefiber.render.preview, and its naming sites are listed (a token held by an observation `kind` property passes the
 *     same test - the observer's reactivefiber.render.preview.snapshot - and is listed in that witness, never counted as a
 *     capability).
 *     REGISTRATIONS (respin 2 U2) - every src spelling of a member named `register` is read: each identifier `register` and
 *     each whole string token `register`, wherever it stands. A spelling is JUDGED only as the property-access callee of a
 *     one-argument call whose argument is a provider object literal with no spread or computed key, holding exactly one
 *     `descriptor` property assignment whose value is an object literal with no spread or computed key and exactly one `id`
 *     property assignment written as a whole string token; the registry judges that id. The functions whose judged
 *     registrations carry an rf id are exactly the two src registrars this census runs, and each registers the preview alone,
 *     read-only under a read-scoped permission: both run for real and every descriptor the registry holds when each one returns
 *     is listed (respin 3 U2), so a capability either one registers by then through code no reader parses still moves the
 *     witness. Every other spelling is UNJUDGED and listed by owner and syntax, so a new one moves the witness: an id held by
 *     reference or shorthand, concatenated, templated with substitutions or computed by a call; a provider or descriptor held
 *     by reference, spread or computed key; an alias, a bind, an element access, an assignment, a type member, the method's own
 *     declaration. Today the unjudged spellings are CapabilityRegistry's own declaration and registryFor's local-provider
 *     pass-through in src/workbench/hosts/local-detached.ts, which re-registers the ids an outside local provider module
 *     declares and spells none.
 *     BINARY AND ARGV (respin 1 F1, respin 2 U1, respin 3 U1) - one pin per src declaration holding a whole string token that
 *     names the rf binary (rf itself, a path whose last segment is rf, or a command text whose first word is either), whatever
 *     call spawns it or const carries it; the token's use is measured. For the call that takes the binary as argument 1, the
 *     BINDINGS are resolved, never matched by name: the TypeScript checker of a one-file program of the spawning file (no lib, no
 *     module resolution) binds each identifier by the language's own scope rules. The callee must bind to the named import spawn
 *     of node:child_process; argument 2 to an initialized const of the spawning function that no other identifier of the file
 *     reads, unless it is written in place; that value to an array literal or to a call whose callee binds to the file's one
 *     module-level function declaration of that name; and the callee's and the builder's names must each have exactly one
 *     binding in the file (member names and an import specifier's imported name aside). Every own return of that function must be
 *     an array literal holding the whole token --no-commit as a direct element - never behind a spread, a conditional, a filter,
 *     a call or an identifier. Any other shape is written into the witness instead, so it fails closed. The witness names each
 *     binding, the call's argument count and option keys, each returned literal's elements and the builder's string tokens, and
 *     counts the src string tokens naming --idempotency-key (none). The child's argv is then MEASURED: each arm of the registered
 *     native render's inputSchema (src's oneOf) gives one input of the arm's required keys and, where the arm declares more
 *     properties, one of every key (each value census-<key>); each runs through the registry with a recording stand-in rf as the
 *     only PATH entry, and the witness lists every argv the stand-in received, the launch count and the provider's answer to the
 *     stand-in's empty output.
 *     Within those three readers, a committing rf capability id, a receipt-read id, an rf spawn whose callee, argument 2 or builder
 *     binds to any other declaration, a builder return without a direct --no-commit, or a probed child argv without --no-commit
 *     generates a pin this table does not hold or moves a witness: the tripwire that re-arms the PARKED remainder.
 *   S statement.2, the duty's standing leg: one pin per file of the filing's SURFACES line, what that surface holds until the
 *     duty lands. reactivefiber's reconcile reads are the preview alone (acceptance.1 adds the receipt read beside it); the rf
 *     branch of nativeEvidence projects the preview envelope's own operation_id as nativeId and no domainStatus under two
 *     receipt-shaped results - the minimal receipt, and every result key the shipped receipt carries plus each status field a
 *     sibling branch projects domainStatus from (respin 1 F4) - and is the only rf case label of nativeEvidence's switch, where
 *     every case label is a whole string token (a label in any other syntax is listed unjudged, so it fails closed; respin 2)
 *     (acceptance.2 adds the receipt branch); the runtime journals no rf native reference: a run of a test-only committing rf
 *     stand-in records its dispatch marker and a settled write row with no nativeRefs and no value, so reconciling it can only
 *     come out operator-asserted (the filing's rationale); docs/workbench/08's operator reconcile journey, read through the
 *     shared helper's rendered view (test/helpers/census.ts docsSection: the unique level-2 heading under the page's level-1
 *     heading, bounded at the next level-1/2 heading or EOF, HTML refused; and here a rendered text that keeps a character
 *     reference the helper leaves undecoded is refused too, respin 2 F1), holds exactly one evidence allowlist sentence, in
 *     paragraph prose; the ids it names (every rendered word the registry accepts as an id, src's EvidenceBinding words aside;
 *     a word splits at a run of hyphens and loses its leading and trailing dots and hyphens first, respin 2 F2) are exactly
 *     RECONCILE_EVIDENCE_READS, and no other sentence of the section names a read (its other dotted or producer-namespaced ids
 *     are each the name of src's ACKNOWLEDGEMENT_VALUE_CONTRACT) (respin 1 U2; acceptance.4 updates it with acceptance.1).
 *   N statement.3, never commit evidence: with only a genuine preview read in hand (fresh, failed or unprojected) no effect-absent
 *     acknowledgement is producer-confirmed, so an override after it carries possible-duplicate and must accept that risk - the
 *     preview never certifies that a commit did not happen.
 *   H acceptance.3, the honesty core: one pin per claim of the item (split at its dash). H acceptance.3.1: for every
 *     determination the src EffectDetermination union declares, cited and uncited, over a genuine fresh, failed or unprojected
 *     preview read, the acknowledgement is denied or operator-asserted, never producer-confirmed. H acceptance.3.2: the preview's
 *     freshly-minted rfo_ (rf mints one per invocation: cli/output.py new_operation_id over domain.ids, secrets entropy) binds
 *     unbound against the journaled rfo_; two reads, two distinct ids, neither the journaled one.
 *   R the NAMED RESIDUALS (no filing clause; NOT CLAIMED), each a pinned quiet row. The row exists while an outside anchor calls for
 *     one of its pins (respin 3 H1: src holds a self-identifying reconcile read, or a pin's requirement is this file's words alone),
 *     so the row removed from every literal reds.
 *     R-ECHO (R:echo, one pin per reactivefiber reconcile read whose projection takes the envelope's own top-level operation_id
 *     as nativeId; today the preview): an envelope under the preview contract that echoes the journaled rfo_ binds
 *     journal-recorded and confirms producer-confirmed, and its effect-absent acknowledgement overrides at duplicate risk none: Pi
 *     takes the envelope's operation_id as given, and no genuine rf preview carries a prior invocation's id. This quiet row pins
 *     today's behaviour: hardening it (the preview's reference never binds, whatever its id) reds R and moves the case into N. A
 *     receipt read that projected its own invocation id instead of the receipt's operation_id (acceptance.2) would generate an R
 *     pin this table does not hold.
 *     R-SELF-ANCHORED (R:self-anchored; respin 3, the gate's survivors H3 and E14): a requirement in this file's words alone
 *     (the G, S and R requirements; N's and H's are the filing's own words, read from the export) shortened together with its
 *     frozen line, or this file's judging code (an it.each argument, an each-liveness list, a generator, a reader or an anchor
 *     check) edited together with the literals it feeds, stays green: no source outside this file holds either. The quiet row
 *     lists, measured against the filing description, which pins' requirements are this file's words alone, so a requirement
 *     that comes to be held outside, or a new one held by this file alone, moves it.
 *     R-ARGV-RUNTIME (its quiet row is G:bin's probe list): the child's argv is measured for the probed inputs only, in this
 *     process; a runtime change to what the child receives that those probes do not present (an input value, an environment or a
 *     call count, such as a patched builtin or prototype acting only then) is not read. Probing any other input changes the list
 *     and moves G:bin.
 *   PARKED the duty of statement.2 itself, acceptance.1, acceptance.2 and acceptance.4: owed in the change that opens the gate on
 *     Pi's side (wb-jwc.5's committing capability under wb-x32's decision). G is their re-entry; S names each one's surface.
 * GATE (measured read-only at the cut, outside this test): the installed rf 0.1.845 serves operation.show (served_reachable) and
 *   context render --idempotency-key, and FOC-ADR-03 is accepted (ADR-RFC-060, recorded on the bead); wb-x32 is open with no
 *   committing decision and Pi's one rf argv carries --no-commit. The gate stays CLOSED.
 * FROZEN SHAPE (standing rule 16): the row shape `${row}:${clause}:${pins}`, every clause key's row, and every pin's line
 *   `${id} | ${requirement} | ${witness}` (PIN_LINES, the witness measured from the subject) are literals; one case per pin runs
 *   against its line. Pins are generated from the anchors above, so a member dropped from a table here leaves its generated pin
 *   without an entry, and a line dropped alone leaves a generated pin without its line; both red. The N and H requirements are
 *   the filing's own words, read from the export. EACH-LIVENESS (respin 1 U1): every row case and every pin case records its id
 *   as its last statement, and the case declared last walks the collected tasks: both it.each sites must have registered
 *   exactly one run-mode case per SHAPE row and per PIN_LINES key, in order, and every one must have reached its last statement,
 *   so an it.each argument emptied, filtered or sliced at its call site reds.
 * RESPIN 1 (gate verdict on cut #1 4df64c6, refusal #1, unmet U1-U3): U1 is the each-liveness record above; U2 reads the docs
 *   allowlist through the rendered, section-bounded, heading-unique view (no raw-document regex, no first match), one sentence
 *   only, every id it names; U3 lets the registry judge the rf id grammar. The cut also closes the gate's F1 (the rf binary is
 *   recognised through any call or const) and F4 (the second receipt-shaped input).
 * RESPIN 2 (gate verdict on cut #2 e9ffe9d, refusal #2, unmet U1-U2): U1 reads the argv the rf spawn receives (BINARY AND ARGV
 *   above), so a conditional, spread or filtered --no-commit fails closed; U2 reads every register spelling and lists each
 *   unjudged one (REGISTRATIONS above), so an id held by reference, concatenated or computed fails closed. The cut also takes the
 *   record's LOW items F1 (a journey whose rendered text keeps an undecoded character reference such as &#46; is refused, so an
 *   entity can never hide an id) and F2 (the hyphen-run word split), and puts the same class guard on the census's other
 *   literal readers: a nativeEvidence case label that is not a whole string token is listed unjudged, and a src union member
 *   that is not a string literal type refuses the union's reading.
 * RESPIN 3 (gate verdict on cut #3 b94cd8e, refusal #3, unmet U1-U2, rule 19(c) engaged): U1 resolves the spawn's callee,
 *   argument 2 and builder by binding and measures the argv the child receives (BINARY AND ARGV above), so a shadowing builder
 *   and a wrapped or renamed callee fail closed, and so does a runtime change for the probed inputs; U2 reads every file under
 *   src/ (THE SRC TREE above) and lists every descriptor the measured registrars register, so a registrar in a .mts (or any other
 *   module extension) is read and any other file is listed. Of the gate's disclosed survivors, H1 (row R removed from every
 *   literal) and H2 (row N re-parked) now red through the outside anchors above; H3 and E14 are R-SELF-ANCHORED.
 * Not claimed: the rf-side conjuncts (measured at the cut, not here); the receipt projection's five-state vocabulary (the bead's
 *   2026-10-17b note, owed with acceptance.2); an rf capability id that no whole string token spells (concatenation, a template
 *   with substitutions) or that a `kind` property holds, except where a reader above reads every spelling - a register call's
 *   descriptor id and a nativeEvidence case label are listed unjudged, and RECONCILE_EVIDENCE_READS is measured at runtime; a
 *   register member reached through a name src never spells (one assembled at runtime); code outside src/ that src reaches other
 *   than through a relative specifier of an import or export declaration, an import() call or a require() call (a package; a
 *   module loaded through any other call, such as a function createRequire returns, or through a computed specifier, as the
 *   local-provider pass-through above does), except what the two measured registrars have registered when they return; a
 *   registration made after a measured registrar returns; an
 *   rf binary name assembled at runtime (concatenation, a template with substitutions, or a value read from the environment or a
 *   config with no rf literal in src); a commit effected by anything but the spawned argv (the child's environment, working
 *   directory or a config rf reads); how rf parses the argv it receives; an rf branch of nativeEvidence written outside its
 *   switch's case labels; a docs id written outside the registry grammar (it names nothing the registry registers); a hyphen-only
 *   id under a producer RECONCILE_EVIDENCE_READS does not key, named outside the allowlist sentence; a host path other than the
 *   Claude workflow host's node() journaling; the named residuals (R).
 *
 * Display paths added: none. Test-only: writes nothing but one tracked scratch directory (test/helpers/scratch.ts, removed after
 * the probe) holding the recording stand-in rf and its argv log, and starts no process but that stand-in, the only PATH entry
 * while the probe runs (a POSIX shell script of builtins only); WS is a string, never created. Reads the bead export, the src
 * tree and docs/workbench/08-lifecycle-and-recovery.md.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type CapabilityErrorCategory, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { REACTIVE_FIBER_CLI_SCHEMA, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDecision, type ReconcileDeps, type ReconcileRequest } from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { ACKNOWLEDGEMENT_VALUE_CONTRACT, type EvidenceReceipt, producerOf, RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const BEAD = "wb-jwc.6";
const DOCS08 = "docs/workbench/08-lifecycle-and-recovery.md";
const WS = "/workspace/rf-operation-receipt-census";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_PERMISSION = "reactivefiber:render";
const PREVIEW_INPUT = { model: "m", task: "t" };
/** The test-only stand-in for the committing rf capability the R5 gate waits for (wb-jwc.5's posture); src registers none. */
const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
const COMMIT_INPUT = { type: "object", properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } }, required: ["model", "task"], additionalProperties: false };
/** rf ids in the rf grammar (rfo_/rfw_/rft_/rfr_ + 22-32 of [0-9a-z]); obviously synthetic. */
const JOURNALED = "rfo_journaledcommit000000000";
const FRESH = "rfo_freshpreview0000000000";
const FRESH_SECOND = "rfo_freshpreviewsecond0000";
const PROBE_OWN = "rfo_probeinvocation00000000";
const PROBE_RECEIPT = "rfo_probereceipt000000000000";
const WORKSPACE_ID = "rfw_censusworkspace000000000";
const TRANSACTION_ID = "rft_censustransaction000000";
const RENDER_ID = "rfr_censusrender0000000000";
const TASK_ID = "wf_rfreceipt-census";
const SESSION = "s1";
const PRINCIPAL = "local-operator:1:s1";
const NOW = "2026-10-28T05:00:00Z";
const REASON = "census probe: a reconcile fed only rf preview reads";
const GRANTS = ["workbench:observe", PREVIEW_PERMISSION, "reconcile:reactivefiber.acknowledge", "reconcile:reactivefiber.override"];
/** The rf commands a reconcile read's envelope may name: the preview's render, and the receipt leaf the gate would admit. */
const PROBE_COMMANDS = ["context.render", "operation.show"];
const EM_DASH = String.fromCodePoint(0x2014);
const HEAD = 'export const meta = { name: "rf-operation-receipt", description: "wb-jwc.6 census probe" };\n';
const RECONCILE_TS = "src/workflow/reconcile.ts";
/** The producer src's producerOf names for every rf capability id. */
const RF_PRODUCER = "reactivefiber";
/** A whole string token naming the rf binary: rf itself, a path whose last segment is rf, or a command text whose first word is either. */
const RF_BINARY = /^(?:\S*\/)?rf(?:\s|$)/;
/** docs/workbench/08's level-1 page heading: the journey section's one parent (the landed binder workbench-docs08-replay-reconcile binds the same path). */
const PARENT_08 = `08 ${EM_DASH} Execution identity, lifecycle, side effects, replay and recovery`;
const JOURNEY = "Operator reconcile journey";
/** The phrase that marks the journey's evidence allowlist sentence. */
const ALLOWLIST = "allowlisted producer read";
/** The label of the acceptance item that holds before the gate (the honesty core): the filing's own mark of a clause judged now. */
const HONESTY_LABEL = "Negative guard (honesty core): ";
/** The one binding the rf spawn's callee may have (respin 3 U1): the named import spawn of node:child_process. */
const SPAWN_BINDING = "the named import spawn of node:child_process";
/**
 * The second receipt-shaped result (respin F4): every result key the shipped rf receipt carries (rf 0.1.845,
 * application/operation_show.py RECEIPT_KEYS; synthetic values in its schema's shapes), plus each status field a sibling
 * nativeEvidence branch projects domainStatus from (forge status, hyperunix execution_status.kind, furnace data.state).
 */
const SHIPPED_RECEIPT_RESULT: JsonValue = {
  operation_id: JOURNALED, request_fingerprint: null, state: "committed", transaction_id: TRANSACTION_ID, render_id: RENDER_ID, commit_seq: 1,
  output_digest: `sha256:${"0".repeat(64)}`, response_delivery: "unknown", attempts: 1, superseded_transaction_ids: [],
  status: "committed", execution_status: { kind: "committed" }, data: { state: "committed" },
};

type RowId = "G" | "S" | "N" | "H" | "R";
interface PinBody {
  readonly requirement: string;
  readonly witness: () => Promise<string>;
}
interface Pin extends PinBody {
  readonly id: string;
}
interface Row {
  readonly id: RowId;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
/** What the census reads of the owner filing. */
interface Filing {
  /** Clause key (statement.1-3, acceptance.1-4) -> its text, in filing order. */
  readonly clauses: ReadonlyMap<string, string>;
  /** The gate's conjuncts as the statement's parenthetical lists them. */
  readonly conjuncts: readonly string[];
  /** The files of the SURFACES line, in filing order. */
  readonly surfaces: readonly string[];
  /** acceptance.3's claims, split at its dash after the "Negative guard (honesty core): " label. */
  readonly honestyClaims: readonly string[];
}
interface Token {
  readonly file: string;
  readonly text: string;
  readonly site: string;
  /** The property the literal initializes (`kind` names an observation vocabulary word, never a capability). */
  readonly property?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** The bead's description in the tracker export: the owner filing. */
function filingText(): string {
  for (const line of readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === BEAD && typeof row.description === "string") return row.description;
  }
  throw new Error(`${BEAD} is not in the tracker export`);
}
function readFiling(text: string): Filing {
  const statement = /^STATEMENT: When (.+?) \((.+?)\), Pi shall (.+?); (.+?)\.$/m.exec(text);
  const [trigger, conjunctText, duty, never] = statement === null ? [] : statement.slice(1);
  const items = [...(/^ACCEPTANCE: \[(.+)\]$/m.exec(text)?.[1] ?? "").matchAll(/(["'])(.*?)\1(?=, ["']|$)/g)].map(match => match[2] ?? "");
  const clauses = new Map<string, string>();
  if (trigger !== undefined && conjunctText !== undefined && duty !== undefined && never !== undefined) {
    clauses.set("statement.1", `${trigger} (${conjunctText})`);
    clauses.set("statement.2", duty);
    clauses.set("statement.3", never);
  }
  for (const [index, item] of items.entries()) clauses.set(`acceptance.${index + 1}`, item);
  const [rfSide = "", piSide = ""] = (conjunctText ?? "").split(", conjoined with ");
  const honesty = items[2] ?? "";
  return {
    clauses,
    conjuncts: [...rfSide.replace(/ in an installed rf$/, "").split(" + "), piSide].filter(part => part.length > 0),
    surfaces: (/^SURFACES: (.+)$/m.exec(text)?.[1] ?? "").split(", ").map(entry => entry.split(":")[0] ?? ""),
    honestyClaims: honesty.startsWith(HONESTY_LABEL) ? honesty.slice(HONESTY_LABEL.length).replace(/\.$/, "").split(` ${EM_DASH} `) : [],
  };
}
const FILING = readFiling(filingText());

/** Every file under a directory, whatever its name, in sorted path order (respin 3 U2). */
function treeFiles(dir: string): string[] {
  return readdirSync(dir).sort().flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? treeFiles(path) : [path];
  });
}
/**
 * The script kind each TypeScript or JavaScript module extension is parsed with (respin 3 U2: a .mts registrar was read by no
 * reader); a declaration file ends in one of these too. A src file with any other extension, or with none, is listed, never parsed.
 */
const MODULE_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS, ".mts": ts.ScriptKind.TS, ".cts": ts.ScriptKind.TS, ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS, ".mjs": ts.ScriptKind.JS, ".cjs": ts.ScriptKind.JS, ".jsx": ts.ScriptKind.JSX,
};
const scriptKindOf = (file: string): ts.ScriptKind | undefined => (Object.hasOwn(MODULE_KINDS, extname(file)) ? MODULE_KINDS[extname(file)] : undefined);
const parsedFiles = new Map<string, ts.SourceFile>();
/** A repo file parsed once, by its repo-relative path, with its extension's script kind. */
function parsed(file: string): ts.SourceFile {
  let source = parsedFiles.get(file);
  if (source === undefined) {
    source = ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.Latest, true, scriptKindOf(file) ?? ts.ScriptKind.TS);
    parsedFiles.set(file, source);
  }
  return source;
}
/** The src tree (respin 3 U2): every file under src/, whatever its name, by repo-relative path. */
const srcTree = (): string[] => treeFiles(SRC).map(path => relative(ROOT, path));
/** Every src module the three readers parse: each file of the src tree with a module extension. */
const srcFiles = (): string[] => srcTree().filter(file => scriptKindOf(file) !== undefined);
/** Every file of the src tree no reader parses (respin 3 U2): listed in the G:id witness, so a new one moves it. */
const unparsedSrcFiles = (): string[] => srcTree().filter(file => scriptKindOf(file) === undefined);
/** The function a node sits in, else the outermost variable it initializes, else <top>. */
function enclosingDeclaration(node: ts.Node): string {
  let variable: string | undefined;
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isVariableDeclaration(at) && ts.isIdentifier(at.name)) variable = at.name.text;
  }
  return variable ?? "<top>";
}
function visitAll(root: ts.Node, visit: (node: ts.Node) => void): void {
  const walk = (node: ts.Node): void => {
    visit(node);
    ts.forEachChild(node, walk);
  };
  walk(root);
}
let tokens: Token[] | undefined;
/** Every whole string-literal token in src (not a template with substitutions), with its enclosing declaration. */
function srcTokens(): Token[] {
  tokens ??= srcFiles().flatMap(file => {
    const found: Token[] = [];
    visitAll(parsed(file), node => {
      if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return;
      const property = ts.isPropertyAssignment(node.parent) && node.parent.initializer === node && ts.isIdentifier(node.parent.name) ? node.parent.name.text : undefined;
      found.push({ file, text: node.text, site: enclosingDeclaration(node), ...(property !== undefined ? { property } : {}) });
    });
    return found;
  });
  return tokens;
}
/** The registry's verdict on each text asked about, so every token and word is judged once. */
const registryVerdicts = new Map<string, boolean>();
/**
 * Whether the real CapabilityRegistry accepts `text` as a descriptor id (respin U3): a fresh registry registers a fixed, otherwise
 * valid probe descriptor under it, so the registry's own grammar judges and this file holds no copy of it.
 */
function registryAcceptsId(text: string): boolean {
  let verdict = registryVerdicts.get(text);
  if (verdict === undefined) {
    try {
      new CapabilityRegistry().register({
        descriptor: { id: text, version: "1.0.0", description: "census id-grammar probe", inputSchema: COMMIT_INPUT, effectClass: "read", permissions: [PREVIEW_PERMISSION], supportedModes: ["invoke"] },
        invoke: async () => null,
      });
      verdict = true;
    } catch (error) {
      if (!(error instanceof CapabilityError) || error.category !== "validation") throw error;
      verdict = false;
    }
    registryVerdicts.set(text, verdict);
  }
  return verdict;
}
/** An rf capability id: src's producerOf names reactivefiber, and the registry accepts the text as a descriptor id. */
const isRfCapabilityId = (text: string): boolean => producerOf(text) === RF_PRODUCER && registryAcceptsId(text);
/** The rf-id tokens src spells as an observation `kind`: vocabulary words that pass the id test, never capabilities. */
const rfKindTokens = (): Token[] => srcTokens().filter(token => token.property === "kind" && isRfCapabilityId(token.text));
/** The rf capability ids src names (every rf-id token that is not a `kind`), first-seen order. */
const rfCapabilityIds = (): string[] => [...new Set(srcTokens().filter(token => token.property !== "kind" && isRfCapabilityId(token.text)).map(token => token.text))];
/** How a token is used where it stands: the call it is an argument of, else the variable it initializes, else its parent's syntax kind. */
function useOf(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral): string {
  const parent = node.parent;
  if (ts.isCallExpression(parent)) {
    const index = parent.arguments.indexOf(node);
    const callee = ts.isIdentifier(parent.expression) ? parent.expression.text : ts.isPropertyAccessExpression(parent.expression) ? parent.expression.name.text : ts.SyntaxKind[parent.expression.kind];
    if (index >= 0) return `${callee} argument ${index + 1}`;
  }
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) return `const ${parent.name.text}`;
  return ts.SyntaxKind[parent.kind];
}
/** Every src declaration holding a whole string token that names the rf binary (respin F1): its file, its name and the token's use, in file then source order. */
function rfBinarySites(): { readonly file: string; readonly name: string; readonly use: string }[] {
  return srcFiles().flatMap(file => {
    const found: { file: string; name: string; use: string }[] = [];
    visitAll(parsed(file), node => {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && RF_BINARY.test(node.text)) found.push({ file, name: enclosingDeclaration(node), use: useOf(node) });
    });
    return found;
  });
}
/** A whole string token: a string literal or a template with no substitution. */
const isWholeToken = (node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral => ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);
/**
 * Every relative module specifier a src module writes as a whole string token - in an import or export declaration, an import()
 * call or a require() call - that resolves outside src/ (respin 3 U2: the typecheck admits a declaration file outside src/ that a
 * src import reaches, and the script beside it would run unread), as `file -> specifier`, in file then source order.
 */
function specifiersLeavingSrc(): string[] {
  return srcFiles().flatMap(file => {
    const found: string[] = [];
    visitAll(parsed(file), node => {
      let specifier: ts.Node | undefined;
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) specifier = node.moduleSpecifier;
      else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) specifier = node.arguments[0];
      if (specifier === undefined || !isWholeToken(specifier) || !/^\.\.?(?:\/|$)/.test(specifier.text)) return;
      const target = resolve(ROOT, dirname(file), specifier.text);
      if (target !== SRC && !target.startsWith(`${SRC}${sep}`)) found.push(`${file} -> ${specifier.text}`);
    });
    return found;
  });
}
/** The key a property is declared under, or undefined for a spread or a computed key. */
function propertyKey(property: ts.ObjectLiteralElementLike): string | undefined {
  const name = property.name;
  return name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) ? name.text : undefined;
}
/** The value of an object literal's one plain `key` assignment, or why the literal cannot be read for it (respin 2 U2). */
function soleAssignment(object: ts.ObjectLiteralExpression, key: string): ts.Expression | string {
  if (object.properties.some(property => propertyKey(property) === undefined)) return "a spread or computed key";
  const named = object.properties.filter(property => propertyKey(property) === key);
  const [only] = named;
  if (only === undefined || named.length !== 1) return `${named.length} ${key} properties`;
  return ts.isPropertyAssignment(only) ? only.initializer : `${key} ${ts.SyntaxKind[only.kind]}`;
}
/** A register call's descriptor id when its provider is a literal the census can read (respin 2 U2), else why it is not. */
function judgedId(call: ts.CallExpression): { readonly id: string } | { readonly why: string } {
  const [provider] = call.arguments;
  if (provider === undefined || call.arguments.length !== 1) return { why: `${call.arguments.length} arguments` };
  if (!ts.isObjectLiteralExpression(provider)) return { why: `provider ${ts.SyntaxKind[provider.kind]}` };
  const descriptor = soleAssignment(provider, "descriptor");
  if (typeof descriptor === "string") return { why: `provider: ${descriptor}` };
  if (!ts.isObjectLiteralExpression(descriptor)) return { why: `descriptor ${ts.SyntaxKind[descriptor.kind]}` };
  const id = soleAssignment(descriptor, "id");
  if (typeof id === "string") return { why: `descriptor: ${id}` };
  return isWholeToken(id) ? { id: id.text } : { why: `id ${ts.SyntaxKind[id.kind]}` };
}
/** Who holds a node: the function, or the Class.method, it sits in, else its class, else the outermost variable it initializes, else <top>. */
function ownerOf(node: ts.Node): string {
  let variable: string | undefined;
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isMethodDeclaration(at) && at.name !== node && ts.isClassDeclaration(at.parent) && at.parent.name !== undefined) return `${at.parent.name.text}.${at.name.getText()}`;
    if (ts.isClassDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isVariableDeclaration(at) && ts.isIdentifier(at.name)) variable = at.name.text;
  }
  return variable ?? "<top>";
}
interface RegisterSpelling {
  readonly file: string;
  readonly owner: string;
  /** The descriptor id of a judged register call; absent when the spelling is unjudged. */
  readonly id?: string;
  /** How an unjudged spelling stands: the syntax holding it, or why its register call is not judged. */
  readonly syntax: string;
}
let spellings: RegisterSpelling[] | undefined;
/**
 * Every src spelling of a member named `register` (respin 2 U2): each identifier `register` and each whole string token
 * `register`, in file then source order. Only the property-access callee of a call whose provider soleAssignment reads plainly
 * down to a whole-token id is judged; every other spelling is unjudged, whatever it holds.
 */
function registerSpellings(): RegisterSpelling[] {
  spellings ??= srcFiles().flatMap(file => {
    const found: RegisterSpelling[] = [];
    visitAll(parsed(file), node => {
      if (!(ts.isIdentifier(node) || isWholeToken(node)) || node.text !== "register") return;
      const parent = node.parent;
      const access = (ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) ? parent : node;
      const holder = access.parent;
      const owner = ownerOf(node);
      if (ts.isPropertyAccessExpression(access) && ts.isCallExpression(holder) && holder.expression === access) {
        const verdict = judgedId(holder);
        found.push("id" in verdict ? { file, owner, id: verdict.id, syntax: "judged register call" } : { file, owner, syntax: `register call, ${verdict.why}` });
      } else found.push({ file, owner, syntax: ts.SyntaxKind[holder.kind] });
    });
    return found;
  });
  return spellings;
}
/** Every src function whose judged register call carries an rf capability id, in file then source order. */
const rfRegistrars = (): string[] => registerSpellings().filter(spelling => spelling.id !== undefined && isRfCapabilityId(spelling.id)).map(spelling => spelling.owner);
/** Every register spelling the census does not judge, as file#owner syntax (respin 2 U2: a new one moves the G:id witness). */
const unjudgedRegisterSpellings = (): string[] => registerSpellings().filter(spelling => spelling.id === undefined).map(spelling => `${spelling.file}#${spelling.owner} ${spelling.syntax}`);
/** Every whole string token under a node, in source order. */
function wholeTokens(root: ts.Node): string[] {
  const found: string[] = [];
  const walk = (node: ts.Node): void => {
    if (isWholeToken(node)) found.push(node.text);
    ts.forEachChild(node, walk);
  };
  walk(root);
  return found;
}
/** The return statements of a function itself, never of a function nested in it. */
function ownReturns(fn: ts.FunctionDeclaration): ts.ReturnStatement[] {
  const found: ts.ReturnStatement[] = [];
  const walk = (node: ts.Node): void => {
    if (ts.isReturnStatement(node)) found.push(node);
    if (!ts.isFunctionLike(node)) ts.forEachChild(node, walk);
  };
  if (fn.body !== undefined) ts.forEachChild(fn.body, walk);
  return found;
}
/**
 * The spawning file as a one-file TypeScript program (no lib, no module resolution) and its checker (respin 3 U1): the checker
 * binds each identifier to its declaration by the language's own scope rules, so a name is never matched by its spelling alone.
 */
function oneFileProgram(file: string): { readonly source: ts.SourceFile; readonly checker: ts.TypeChecker } {
  const path = join(ROOT, file);
  const program = ts.createProgram({ rootNames: [path], options: { noResolve: true, noLib: true, noEmit: true, allowJs: true, types: [] } });
  const source = program.getSourceFile(path);
  if (source === undefined) throw new Error(`the one-file program of ${file} holds no source file`);
  return { source, checker: program.getTypeChecker() };
}
/** Whether an identifier is a member name or an import specifier's imported name: a spelling that binds nothing in the file. */
function isMemberName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isQualifiedName(parent) && parent.right === node)) return true;
  if (ts.isImportSpecifier(parent) && parent.propertyName === node) return true;
  const member = ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) || ts.isGetAccessorDeclaration(parent) || ts.isSetAccessorDeclaration(parent) || ts.isEnumMember(parent);
  return member && parent.name === node;
}
/** The symbol an identifier binds to (a shorthand property's value binding for a shorthand). */
const boundSymbol = (checker: ts.TypeChecker, node: ts.Identifier): ts.Symbol | undefined =>
  ts.isShorthandPropertyAssignment(node.parent) ? checker.getShorthandAssignmentValueSymbol(node.parent) : checker.getSymbolAtLocation(node);
/** Every identifier of the file spelling `name` that is not a member name, with the symbol each binds to. */
function spellingsOf(source: ts.SourceFile, checker: ts.TypeChecker, name: string): { readonly node: ts.Identifier; readonly symbol: ts.Symbol | undefined }[] {
  const found: { node: ts.Identifier; symbol: ts.Symbol | undefined }[] = [];
  visitAll(source, node => {
    if (ts.isIdentifier(node) && node.text === name && !isMemberName(node)) found.push({ node, symbol: boundSymbol(checker, node) });
  });
  return found;
}
/** How many distinct bindings the file gives `name` (an unresolved spelling counts as one more). */
const bindingCount = (source: ts.SourceFile, checker: ts.TypeChecker, name: string): number => new Set(spellingsOf(source, checker, name).map(entry => entry.symbol)).size;
/** A symbol's one declaration, or undefined when it has none or several. */
function soleDeclaration(symbol: ts.Symbol | undefined): ts.Declaration | undefined {
  const declarations = symbol?.declarations ?? [];
  return declarations.length === 1 ? declarations[0] : undefined;
}
/** A declaration as the witness names it: a named import with its module, else its syntax at module level or inside the declaration holding it. */
function declarationText(declaration: ts.Declaration | undefined): string {
  if (declaration === undefined) return "no one declaration";
  if (ts.isImportSpecifier(declaration)) {
    const clause = declaration.parent.parent;
    const specifier = clause.parent.moduleSpecifier;
    const module = ts.isStringLiteral(specifier) ? specifier.text : ts.SyntaxKind[specifier.kind];
    const imported = declaration.propertyName === undefined ? declaration.name.text : `${declaration.propertyName.text} as ${declaration.name.text}`;
    return `the ${declaration.isTypeOnly || clause.isTypeOnly ? "type-only " : ""}named import ${imported} of ${module}`;
  }
  const statement: ts.Node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
  return `a ${ts.SyntaxKind[declaration.kind]} ${ts.isSourceFile(statement.parent) ? "at module level" : `inside ${enclosingDeclaration(declaration)}`}`;
}
/** The function-like node a node sits in, or undefined at module level. */
function spawnerOf(node: ts.Node): ts.Node | undefined {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) if (ts.isFunctionLike(at)) return at;
  return undefined;
}
/**
 * The argv the rf spawn receives (respin 2 U1, respin 3 U1): the one call in `site` taking the rf binary as argument 1, its callee,
 * argument 2 and argument 2's builder each RESOLVED BY BINDING (oneFileProgram), never matched by name: the callee binds to the
 * named import spawn of node:child_process; argument 2 to an initialized const of the spawning function no other identifier of
 * the file reads (or it is written in place); its value is an array literal or a call whose callee binds to the file's one
 * module-level function declaration of that name; the callee's and the builder's names each have one binding in the file; and
 * every own return of the builder is an array literal holding --no-commit as a direct element. A shape outside that reading is
 * written into the text instead, so it fails closed.
 */
function spawnedArgv(file: string, site: string): string {
  const { source, checker } = oneFileProgram(file);
  const calls: ts.CallExpression[] = [];
  visitAll(source, node => {
    if (isWholeToken(node) && RF_BINARY.test(node.text) && enclosingDeclaration(node) === site && ts.isCallExpression(node.parent) && node.parent.arguments[0] === node) calls.push(node.parent);
  });
  const [call] = calls;
  if (call === undefined || calls.length !== 1) return `<${calls.length} calls of ${site} take the rf binary as argument 1>`;
  if (!ts.isIdentifier(call.expression)) return `<the spawn's callee is a ${ts.SyntaxKind[call.expression.kind]}, not a name the file binds>`;
  const callee = call.expression.text;
  const calleeBinding = declarationText(soleDeclaration(checker.getSymbolAtLocation(call.expression)));
  const calleeBindings = bindingCount(source, checker, callee);
  if (calleeBinding !== SPAWN_BINDING || calleeBindings !== 1) return `<the callee ${callee} binds to ${calleeBinding}, one of ${calleeBindings} bindings of the name in the file, not ${SPAWN_BINDING} alone>`;
  let argv = call.arguments[1];
  if (argv === undefined) return "<the spawn passes no argument 2>";
  let origin = "written in place";
  if (ts.isIdentifier(argv)) {
    const passed = argv;
    const symbol = checker.getSymbolAtLocation(passed);
    const declaration = soleDeclaration(symbol);
    if (declaration === undefined || !ts.isVariableDeclaration(declaration) || (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) === 0 || declaration.initializer === undefined || spawnerOf(declaration) !== spawnerOf(call)) {
      return `<argument 2 ${passed.text} binds to ${declarationText(declaration)}, not one initialized const of ${site}>`;
    }
    const reads = spellingsOf(source, checker, passed.text).filter(entry => entry.symbol === symbol && entry.node !== passed && entry.node !== declaration.name).length;
    if (reads > 0) return `<${site} reads ${passed.text} ${reads} more times>`;
    argv = declaration.initializer;
    origin = `const ${passed.text}, read only by the spawn`;
  }
  let arrays: ts.ArrayLiteralExpression[];
  let tokens: string[];
  let builder = "an array literal";
  if (ts.isArrayLiteralExpression(argv)) {
    arrays = [argv];
    tokens = wholeTokens(argv);
  } else if (ts.isCallExpression(argv) && ts.isIdentifier(argv.expression)) {
    const name = argv.expression.text;
    const declarations = checker.getSymbolAtLocation(argv.expression)?.declarations ?? [];
    const implementations = declarations.filter((declaration): declaration is ts.FunctionDeclaration => ts.isFunctionDeclaration(declaration) && declaration.body !== undefined);
    const [fn] = implementations;
    const bindings = bindingCount(source, checker, name);
    if (fn === undefined || implementations.length !== 1 || bindings !== 1 || declarations.some(declaration => !ts.isFunctionDeclaration(declaration) || !ts.isSourceFile(declaration.parent))) {
      return `<argv from ${name}(), which binds to ${declarations.length === 0 ? "no declaration" : declarations.map(declaration => declarationText(declaration)).join(" + ")}, one of ${bindings} bindings of the name in the file, not the file's one module-level function declaration of that name>`;
    }
    const returns = ownReturns(fn);
    arrays = returns.flatMap(statement => (statement.expression !== undefined && ts.isArrayLiteralExpression(statement.expression) ? [statement.expression] : []));
    const other = returns.find(statement => statement.expression === undefined || !ts.isArrayLiteralExpression(statement.expression));
    if (returns.length === 0 || other !== undefined) return `<a return of ${name} is ${other?.expression === undefined ? "missing or empty" : `a ${ts.SyntaxKind[other.expression.kind]}`}>`;
    tokens = wholeTokens(fn);
    builder = `${name}(), the file's one module-level function declaration of that name`;
  } else return `<argv ${origin} is a ${ts.SyntaxKind[argv.kind]}>`;
  const options = call.arguments[2];
  const optionKeys = options === undefined ? "none" : ts.isObjectLiteralExpression(options) ? options.properties.map(property => propertyKey(property) ?? `<${ts.SyntaxKind[property.kind]}>`).join(",") : `<a ${ts.SyntaxKind[options.kind]}>`;
  const element = (node: ts.Expression): string => (isWholeToken(node) ? node.text : ts.isSpreadElement(node) ? `...${node.expression.getText(source)}` : node.getText(source));
  const direct = arrays.every(array => array.elements.some(node => isWholeToken(node) && node.text === "--no-commit"));
  return `callee=${callee}, bound to ${calleeBinding}, the file's one binding of the name; arguments=${call.arguments.length}, option keys=${optionKeys}; argv=${origin}, from ${builder}; returns=${arrays.map(array => `[${array.elements.map(element).join(" ")}]`).join(" | ")}; --no-commit a direct element of every returned array=${direct}; builder string tokens=${tokens.join(" ")}`;
}
/** nativeEvidence's switch case labels (respin 2, the U2 class guard): the whole-token labels naming an rf id, and every label in any other syntax. */
function nativeEvidenceLabels(): { readonly rf: readonly string[]; readonly unjudged: readonly string[] } {
  const rf: string[] = [];
  const unjudged: string[] = [];
  visitAll(parsed("src/workbench/native-evidence.ts"), node => {
    if (!ts.isCaseClause(node) || enclosingDeclaration(node) !== "nativeEvidence") return;
    if (!isWholeToken(node.expression)) unjudged.push(ts.SyntaxKind[node.expression.kind]);
    else if (isRfCapabilityId(node.expression.text)) rf.push(node.expression.text);
  });
  return { rf, unjudged };
}
/**
 * The string members of a src/workflow/reconcile.ts union type (EffectDetermination, EvidenceBinding), in declaration order. The
 * alias must be declared once and every member must be a string literal type (respin 2, the U2 class guard): any other member
 * refuses the reading, so a determination or binding word added by reference can never go unread.
 */
function srcUnion(alias: string): string[] {
  const found: string[] = [];
  let declared = 0;
  visitAll(parsed(RECONCILE_TS), node => {
    if (!ts.isTypeAliasDeclaration(node) || node.name.text !== alias) return;
    declared += 1;
    for (const member of ts.isUnionTypeNode(node.type) ? node.type.types : [node.type]) {
      if (!ts.isLiteralTypeNode(member) || !ts.isStringLiteral(member.literal)) throw new Error(`${alias} holds a member that is not a string literal type (${ts.SyntaxKind[member.kind]}): the census refuses to read it`);
      found.push(member.literal.text);
    }
  });
  if (declared !== 1) throw new Error(`${RECONCILE_TS} declares ${alias} ${declared} times`);
  return found;
}

type PreviewEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
/** An rf context.render envelope as the preview's injected seam returns it. */
function previewEnvelope(operationId: string, result: JsonValue = { output: { text: "census context" } }, command = "context.render"): PreviewEnvelope {
  return { schema: REACTIVE_FIBER_CLI_SCHEMA, ok: true, command, operation_id: operationId, workspace: { id: WORKSPACE_ID, root: WS }, transaction_id: null, result, diagnostics: [] };
}
/** The preview reads a reconcile can be fed: a genuine fresh one, one that fails, and one whose envelope names no identity. */
const VARIANTS: Readonly<Record<string, () => Promise<PreviewEnvelope>>> = {
  fresh: async () => previewEnvelope(FRESH),
  failed: async () => {
    throw new CapabilityError("unavailable", "rf is not reachable from this census");
  },
  unprojected: async () => previewEnvelope(FRESH, { output: { text: "census context" } }, "context.show"),
};
/** The committed render the stand-in returns: the identity a committing rf effect would carry. */
function committedReading(): JsonValue {
  return {
    contract: `${COMMIT_ID}/v1`, workspaceRoot: WS,
    source: { schema: REACTIVE_FIBER_CLI_SCHEMA, ok: true, command: "context.render", operation_id: JOURNALED, workspace: { id: WORKSPACE_ID, root: WS }, transaction_id: TRANSACTION_ID, result: { render_id: RENDER_ID }, diagnostics: [] },
  };
}
/** The preview (src's injectable registration over `read`) beside the test-only committing stand-in. */
function reconcileRegistry(read: () => Promise<PreviewEnvelope>): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, read, WS);
  registry.register({
    descriptor: {
      id: COMMIT_ID, version: "1.0.0", description: "Test-only stand-in for the committing rf render the R5 gate waits for (wb-jwc.5); src registers none",
      inputSchema: COMMIT_INPUT, effectClass: "write", permissions: [COMMIT_PERMISSION], supportedModes: ["invoke"],
    },
    invoke: async () => committedReading(),
  });
  return registry;
}
/** The committed-effect row the filing names: a non-read rf node journaled with {reactivefiber, operation, rfo_X}. */
const COMMIT_ROW: WorkflowJournalEntry = {
  index: 0, key: "k0", ok: true, kind: "node", capabilityId: COMMIT_ID, effectClass: "write",
  nativeRefs: [{ provider: "reactivefiber", type: "operation", id: JOURNALED }],
};
function request(action: ReconcileRequest["action"], params: Record<string, JsonValue>): ReconcileRequest {
  return {
    action, taskId: TASK_ID, ...(action === "inspect" ? {} : { position: 0 }), grants: GRANTS, scope: { workspace: WS, principal: PRINCIPAL },
    sessionId: SESSION, principal: { id: PRINCIPAL, role: "local-operator" }, params,
  };
}
function deps(registry: CapabilityRegistry, entries: readonly WorkflowJournalEntry[], receipts: readonly EvidenceReceipt[]): ReconcileDeps {
  return {
    task: { status: "completed", observationScope: { sessionId: SESSION, workspace: WS, principal: PRINCIPAL } },
    entries, receipts, currentEffectClass: id => registry.effectClassOf(id), now: () => NOW,
  };
}
/** A decision as one word: the deny policy, the acknowledgement's evidence class, or the override's duplicate risk. */
function outcomeOf(decision: ReconcileDecision): string {
  if (decision.decision === "denied") return `deny:${decision.policy}`;
  const record = decision.decision === "acknowledge" || decision.decision === "override" ? decision.entry.reconcile : undefined;
  if (record?.decision === "acknowledge") return `ack:${record.evidenceClass}`;
  if (record?.decision === "override") return `override:${record.duplicateRisk}`;
  return decision.decision;
}
/** One evidence action as workflow_reconcile performs it: the core admits the read, the registry runs it, the core mints the receipt. */
async function previewReceipt(read: () => Promise<PreviewEnvelope>, entries: readonly WorkflowJournalEntry[] = [COMMIT_ROW]): Promise<EvidenceReceipt> {
  const registry = reconcileRegistry(read);
  const decision = decideReconcile(request("evidence", { evidence: { capabilityId: PREVIEW_ID, input: PREVIEW_INPUT } }), deps(registry, entries, []));
  if (decision.decision !== "evidence") throw new Error(`the reconcile core refused the preview read: ${outcomeOf(decision)}`);
  let result: JsonValue | undefined;
  let failure: CapabilityErrorCategory | undefined;
  try {
    result = await registry.invoke(decision.read.capabilityId, decision.read.input, { grants: GRANTS, signal: new AbortController().signal });
  } catch (error) {
    failure = error instanceof CapabilityError ? error.category : "transport";
  }
  return mintEvidenceReceipt({
    taskId: TASK_ID, position: decision.read.position, producer: decision.read.producer, capabilityId: decision.read.capabilityId,
    input: decision.read.input, requestedAt: NOW, observedAt: NOW, ...(result !== undefined ? { result } : {}),
    ...(failure !== undefined ? { failure } : {}), recordedNativeRefs: decision.read.recordedNativeRefs,
  });
}
/** An acknowledgement of the committed-effect row citing `receipts`, or, with none, stating the producer unavailable. */
function acknowledgeWith(determination: string, receipts: readonly EvidenceReceipt[]): ReconcileDecision {
  const params: Record<string, JsonValue> = receipts.length > 0
    ? { reason: REASON, determination, receiptIds: receipts.map(receipt => receipt.receiptId) }
    : { reason: REASON, determination, noEvidenceReason: "producer-unavailable" };
  return decideReconcile(request("acknowledge", params), deps(reconcileRegistry(async () => previewEnvelope(FRESH)), [COMMIT_ROW], receipts));
}
/** The override an acknowledgement makes possible: its duplicate risk, without and with the risk accepted. */
function overrideAfter(acknowledgement: ReconcileDecision): string {
  if (acknowledgement.decision !== "acknowledge") return "no acknowledgement to override";
  const record = acknowledgement.entry.reconcile;
  const params: Record<string, JsonValue> = {
    reason: REASON, acknowledgementId: record?.decision === "acknowledge" ? record.acknowledgementId : "", confirmed: true, confirmPosition: 0, confirmCapabilityId: COMMIT_ID,
  };
  const registry = reconcileRegistry(async () => previewEnvelope(FRESH));
  const entries = [COMMIT_ROW, acknowledgement.entry];
  const unaccepted = decideReconcile(request("override", params), deps(registry, entries, []));
  const accepted = decideReconcile(request("override", { ...params, acceptDuplicateRisk: true }), deps(registry, entries, []));
  return `override unaccepted=${outcomeOf(unaccepted)} accepted=${outcomeOf(accepted)}`;
}
/** A preview reading as src's injectable registration hands it back through the capability registry. */
async function previewReading(envelope: PreviewEnvelope): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => envelope, WS);
  return registry.invoke(PREVIEW_ID, PREVIEW_INPUT, { grants: [PREVIEW_PERMISSION], signal: new AbortController().signal });
}
/** The reconcile reads of reactivefiber whose projection names the envelope's own invocation (its top-level operation_id). */
function selfIdentifyingReads(): string[] {
  return (RECONCILE_EVIDENCE_READS.reactivefiber ?? []).filter(id => PROBE_COMMANDS.some(command => {
    const source: JsonValue = JSON.parse(JSON.stringify(previewEnvelope(PROBE_OWN, { operation_id: PROBE_RECEIPT, state: "committed" }, command)));
    return nativeEvidence(id, { contract: `${id}/v1`, workspaceRoot: WS, source }).nativeId === PROBE_OWN;
  }));
}

/** What a reader sees of a section block, sentence by sentence: a list's items one by one, an HTML block nothing. */
function blockSentences(block: RenderedBlock): string[] {
  const texts = block.kind === "list" ? block.items.map(item => item.text) : block.kind === "html" ? [] : [block.text];
  return texts.flatMap(text => text.split(/(?<=[.!?])\s+/));
}
/**
 * The rendered words of a text the registry accepts as capability ids (case is kept, so a capitalised word is never one). A run
 * of hyphens splits words, and each word loses its leading and trailing dots and hyphens before the registry judges it (respin 2
 * F2), so a dash written as `--` or a trailing hyphen can never glue an id into a word the registry refuses.
 */
const idWords = (text: string): string[] => text.split(/[^A-Za-z0-9.-]+|-{2,}/).map(word => word.replace(/^[.-]+|[.-]+$/g, "")).filter(word => word.length > 0 && registryAcceptsId(word));
/** A character reference the shared helper's decode leaves in rendered text (it maps only a fixed few); a browser renders it. */
const CHARACTER_REFERENCE = /&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]*);/i;
interface JourneyReading {
  /** Why the reading is refused; empty when the section binds, carries no HTML and holds exactly one allowlist sentence in paragraph prose. */
  readonly why: string;
  /** The ids the allowlist sentence names, in its order. */
  readonly named: readonly string[];
  /** The allowlist sentence's src EvidenceBinding words (prose about the receipt's binding, never reads). */
  readonly binding: readonly string[];
  /** The dotted or producer-namespaced ids the section's other sentences name. */
  readonly others: readonly string[];
}
/** docs/workbench/08's operator reconcile journey as a reader sees it (respin U2): the shared helper's rendered, section-bounded view. */
function journeyReading(): JourneyReading {
  const refuse = (why: string): JourneyReading => ({ why, named: [], binding: [], others: [] });
  const section = docsSection(readFileSync(join(ROOT, DOCS08), "utf8"), JOURNEY, 2, [PARENT_08]);
  if (!section.ok) return refuse(section.why);
  if (section.hasHtml) return refuse("the section carries HTML, whose rendered text can hide what its source says");
  const sentences = section.blocks.flatMap(block => blockSentences(block).map(text => ({ kind: block.kind, text })));
  if (sentences.some(sentence => CHARACTER_REFERENCE.test(sentence.text))) return refuse("the section's rendered text keeps a character reference the shared helper leaves undecoded, whose rendered text can hide an id");
  const allowlist = sentences.filter(sentence => sentence.text.includes(ALLOWLIST));
  const [only] = allowlist;
  if (only === undefined || allowlist.length !== 1) return refuse(`the section holds ${allowlist.length} evidence allowlist sentences, not exactly one`);
  if (only.kind !== "paragraph") return refuse(`the evidence allowlist sentence sits in a ${only.kind} block, not in paragraph prose`);
  const bindingWords = srcUnion("EvidenceBinding");
  const producers = Object.keys(RECONCILE_EVIDENCE_READS);
  const words = idWords(only.text);
  return {
    why: "",
    named: words.filter(word => !bindingWords.includes(word)),
    binding: words.filter(word => bindingWords.includes(word)),
    others: sentences.filter(sentence => sentence !== only).flatMap(sentence => idWords(sentence.text)).filter(word => word.includes(".") || producers.includes(producerOf(word))),
  };
}

/** The src registrars of rf descriptors this census measures, by function name. */
const REGISTRARS: Readonly<Record<string, (registry: CapabilityRegistry) => void>> = {
  registerReactiveFiberRender: registry => registerReactiveFiberRender(registry, async () => previewEnvelope(FRESH), WS),
  registerNativeReactiveFiberRender: registry => registerNativeReactiveFiberRender(registry, WS),
};
const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census script calls node only: the Claude query is never invoked");
};
/** The line the recording stand-in writes after each launch's arguments (one argument per line before it). */
const ARGV_END = "<end of argv>";
/** The recording stand-in rf (respin 3 U1): a POSIX shell script of builtins only that appends each argument, then ARGV_END, to `log` and prints nothing. */
const standIn = (log: string): string => ["#!/bin/sh", `for arg in "$@"; do printf '%s\\n' "$arg"; done >> '${log}'`, `printf '%s\\n' '${ARGV_END}' >> '${log}'`, ""].join("\n");
/**
 * The inputs the probe sends (respin 3 U1): for each arm of the registered native render's inputSchema (src's oneOf), one input of
 * the arm's required keys and, where the arm declares more properties, one of every key; each value is census-<key>.
 */
function probeInputs(schema: Readonly<Record<string, unknown>> | undefined): Record<string, string>[] {
  const arms: unknown[] = Array.isArray(schema?.oneOf) ? schema.oneOf : [];
  return arms.flatMap(arm => {
    if (!isRecord(arm) || !Array.isArray(arm.required) || !isRecord(arm.properties)) return [{}];
    const required = arm.required.filter((key): key is string => typeof key === "string");
    const every = Object.keys(arm.properties);
    return [required, ...(every.length > required.length ? [every] : [])].map(keys => Object.fromEntries(keys.map(key => [key, `census-${key}`])));
  });
}
/**
 * What the rf child receives (respin 3 U1): each probe input runs through the registered native render with the recording stand-in
 * as the only PATH entry, inside one tracked scratch directory; the text lists every argv the stand-in received, the launch count
 * and how the provider answered the stand-in's empty output.
 */
async function childArgvs(): Promise<string> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, WS);
  const inputs = probeInputs(registry.catalogSnapshot().find(entry => entry.descriptor.id === PREVIEW_ID)?.descriptor.inputSchema);
  const dir = makeScratch("wb-jwc6-rf-argv-");
  const log = join(dir, "argv.log");
  const path = process.env.PATH;
  const outcomes: string[] = [];
  let received: string[][] = [];
  try {
    writeFileSync(join(dir, "rf"), standIn(log), { mode: 0o755 });
    process.env.PATH = dir;
    for (const input of inputs) {
      try {
        await registry.invoke(PREVIEW_ID, input, { grants: [PREVIEW_PERMISSION], signal: new AbortController().signal });
        outcomes.push("returned");
      } catch (error) {
        outcomes.push(error instanceof CapabilityError ? `refused ${error.category}` : "threw");
      }
    }
    if (path === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = path;
    received = existsSync(log) ? readFileSync(log, "utf8").split(`${ARGV_END}\n`).filter(block => block.length > 0).map(block => block.split("\n").filter(line => line.length > 0)) : [];
  } finally {
    if (path === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = path;
    removeScratch(dir);
  }
  const probes = inputs.map((input, index) => `{${Object.keys(input).join(",")}} -> [${received[index]?.join(" ") ?? "<no launch>"}] ${outcomes[index] ?? "<no outcome>"}`);
  return `child argv (recording stand-in, the only PATH entry): ${probes.join("; ")}; launches=${received.length} for ${inputs.length} inputs; --no-commit in every received argv=${received.length > 0 && received.every(argv => argv.includes("--no-commit"))}`;
}

/** G: one pin per rf capability id src names, one per src function spawning rf. */
const G_PINS: Readonly<Record<string, PinBody>> = {
  [`id:${PREVIEW_ID}`]: {
    requirement: "every file under src/ is read, each module parsed with its own script kind and every other file listed, and no relative specifier of a src import or export declaration, import() call or require() call leaves src/; the one rf capability id a whole src string token spells is the preview: every naming site is listed, the functions whose judged register calls carry an rf id are the registrars measured here, each of which, run, has registered the preview alone, read-only under a read-scoped permission, when it returns, and every unjudged register spelling is listed by owner and syntax",
    witness: async () => {
      expect(registryAcceptsId(PREVIEW_ID), "the id-grammar probe descriptor is valid: the registry accepts the preview id under it").toBe(true);
      expect(rfRegistrars(), "every src function whose judged register call carries an rf id is measured here").toStrictEqual(Object.keys(REGISTRARS));
      const sites = srcTokens().filter(token => token.text === PREVIEW_ID).map(token => `${token.file}#${token.site}`);
      // respin 3 U2: every descriptor the registry holds when each measured registrar returns, so one it registers through code no reader parses still moves this witness.
      const registered = Object.entries(REGISTRARS).map(([name, register]) => {
        const registry = new CapabilityRegistry();
        register(registry);
        return `${name}:${registry.catalogSnapshot().map(({ descriptor }) => `${descriptor.id}=${descriptor.effectClass}/${descriptor.permissions.join("+")}`).join(",")}`;
      });
      const kinds = rfKindTokens().map(token => `${token.text}@${token.file}#${token.site}`);
      const unparsed = unparsedSrcFiles();
      const leaving = specifiersLeavingSrc();
      return `src files no reader parses=${unparsed.length === 0 ? "none" : unparsed.join(", ")}; relative specifiers leaving src/=${leaving.length === 0 ? "none" : leaving.join(", ")}; sites=${sites.join(", ")}; registered=${registered.join(", ")}; id-shaped kinds (not capabilities)=${kinds.join(", ")}; unjudged register spellings=${unjudgedRegisterSpellings().join(", ")}`;
    },
  },
  "bin:nativeReactiveFiberRender": {
    requirement: "the one src declaration naming the rf binary is the noncommitted render, which spawns it: resolved by binding, never by name, its callee is the named import spawn of node:child_process and its argument 2 one const of the spawning function read only by the spawn, built by the file's one module-level function declaration of that name, the callee's and the builder's names each bound once in the file, and every return of that function is an array literal holding --no-commit as a direct element; the child receives --no-commit for every probed input of the descriptor's arms; and no src string token names --idempotency-key",
    witness: async () => {
      const site = rfBinarySites().find(entry => entry.name === "nativeReactiveFiberRender");
      if (site === undefined) return "<nativeReactiveFiberRender names no rf binary>";
      const keyed = srcTokens().filter(token => token.text.includes("--idempotency-key")).length;
      return `${site.file} use=${site.use}; ${spawnedArgv(site.file, site.name)}; ${await childArgvs()}; src string tokens naming --idempotency-key=${keyed}`;
    },
  },
};
/** S: one pin per surface file of the filing. */
const S_PINS: Readonly<Record<string, PinBody>> = {
  "src/workflow/reconcile.ts": {
    requirement: "reactivefiber's reconcile evidence reads are the preview alone until the receipt read is admitted beside it",
    witness: async () => `RECONCILE_EVIDENCE_READS.reactivefiber=${JSON.stringify(RECONCILE_EVIDENCE_READS.reactivefiber ?? null)}`,
  },
  "src/workbench/native-evidence.ts": {
    requirement: "the rf branch projects the preview envelope's own operation_id as nativeId and no domainStatus under both receipt-shaped results, and is the only rf case label of nativeEvidence's switch, where every case label is a whole string token",
    witness: async () => {
      const results: Readonly<Record<string, JsonValue>> = { minimal: { operation_id: JOURNALED, state: "committed" }, shipped: SHIPPED_RECEIPT_RESULT };
      const parts: string[] = [];
      for (const [name, result] of Object.entries(results)) {
        const evidence = nativeEvidence(PREVIEW_ID, await previewReading(previewEnvelope(FRESH, result)));
        parts.push(`${name} receipt: projection=${JSON.stringify(evidence)} domainStatus=${evidence.domainStatus ?? "absent"}`);
      }
      const labels = nativeEvidenceLabels();
      return `${parts.join("; ")}; rf branches=${labels.rf.join(",")}; unjudged case labels=${labels.unjudged.length === 0 ? "none" : labels.unjudged.join(",")}`;
    },
  },
  "src/workflow/runtime.ts": {
    requirement: "no rf effect is journaled with a native reference, so reconciling one can only come out operator-asserted",
    witness: async () => {
      const registry = reconcileRegistry(async () => previewEnvelope(FRESH));
      const entries: WorkflowJournalEntry[] = [];
      const run = await runWorkflow({
        script: `${HEAD}return await node(${JSON.stringify(COMMIT_ID)}, ${JSON.stringify(PREVIEW_INPUT)});`,
        host: createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [COMMIT_PERMISSION] }),
        journal: { append: entry => { entries.push(entry); } },
      });
      const rows = entries.filter(entry => entry.kind === "node").map(entry =>
        `${entry.dispatched === true ? "dispatched" : "settled"}:${entry.effectClass ?? "unclassified"}:refs=${entry.nativeRefs?.length ?? 0}:value=${entry.text === undefined ? "none" : "stored"}`);
      const inspect = decideReconcile(request("inspect", {}), deps(registry, entries, []));
      const roster = inspect.decision === "inspect"
        ? inspect.roster.positions.map(position => `${position.position}:${position.capabilityId}:recorded=${position.recordedNativeRefs.length}:reads=${position.evidenceReads.join("+")}`)
        : [outcomeOf(inspect)];
      const receipt = await previewReceipt(async () => previewEnvelope(FRESH), entries);
      return `run=${run.status}; rows=${rows.join(", ")}; inspect=${roster.join(", ")}; preview receipt=${receipt.outcome}/${receipt.binding}`;
    },
  },
  [DOCS08]: {
    requirement: "the operator reconcile journey's rendered section holds one evidence allowlist sentence, the ids it names are exactly the reads RECONCILE_EVIDENCE_READS holds, and no other sentence of the section names a read",
    witness: async () => {
      const reading = journeyReading();
      if (reading.why !== "") return `refused: ${reading.why}`;
      const reads = Object.values(RECONCILE_EVIDENCE_READS).flat();
      const contract = ACKNOWLEDGEMENT_VALUE_CONTRACT.replace(/\/v\d+$/, "");
      const equal = JSON.stringify([...reading.named].sort()) === JSON.stringify([...reads].sort());
      return `one allowlist sentence, in paragraph prose: allowlist=${reading.named.join(",")}; binding words (src EvidenceBinding)=${reading.binding.join(",")}; equals RECONCILE_EVIDENCE_READS=${equal}; other sentences' ids=${reading.others.join(",")}, each the name of src ACKNOWLEDGEMENT_VALUE_CONTRACT=${reading.others.every(id => id === contract)}`;
    },
  },
};
/** N: statement.3, in the filing's own words. */
const N_PINS: Readonly<Record<string, PinBody>> = {
  "statement.3": {
    requirement: FILING.clauses.get("statement.3") ?? "<statement.3 missing>",
    witness: async () => {
      const uncited = acknowledgeWith("effect-absent", []);
      const parts = [`uncited: ${outcomeOf(uncited)} ${overrideAfter(uncited)}`];
      for (const [variant, read] of Object.entries(VARIANTS)) {
        const acknowledgement = acknowledgeWith("effect-absent", [await previewReceipt(read)]);
        parts.push(`${variant}: ${outcomeOf(acknowledgement)}${acknowledgement.decision === "acknowledge" ? ` ${overrideAfter(acknowledgement)}` : ""}`);
      }
      const text = parts.join("; ");
      expect(text, "a preview-only effect-absent never overrides at duplicate risk none").not.toContain("override:none");
      return text;
    },
  },
};
/** H: acceptance.3's two claims, in the filing's own words. */
const H_PINS: Readonly<Record<string, PinBody>> = {
  "acceptance.3.1": {
    requirement: FILING.honestyClaims[0] ?? "<acceptance.3 claim 1 missing>",
    witness: async () => {
      const determinations = srcUnion("EffectDetermination");
      const parts = [`uncited: ${determinations.map(determination => `${determination}=${outcomeOf(acknowledgeWith(determination, []))}`).join(" ")}`];
      for (const [variant, read] of Object.entries(VARIANTS)) {
        const receipt = await previewReceipt(read);
        parts.push(`${variant}(${receipt.outcome}/${receipt.binding}): ${determinations.map(determination => `${determination}=${outcomeOf(acknowledgeWith(determination, [receipt]))}`).join(" ")}`);
      }
      const text = parts.join("; ");
      expect(text, "a preview-only reconcile is never producer-confirmed").not.toContain("producer-confirmed");
      return text;
    },
  },
  "acceptance.3.2": {
    requirement: FILING.honestyClaims[1] ?? "<acceptance.3 claim 2 missing>",
    witness: async () => {
      const receipts = [await previewReceipt(async () => previewEnvelope(FRESH)), await previewReceipt(async () => previewEnvelope(FRESH_SECOND))];
      const ids = receipts.map(receipt => receipt.nativeRef?.id ?? "none");
      return `journaled=${JOURNALED}; preview refs=${ids.join(",")} distinct=${new Set(ids).size === ids.length} journaled-among=${ids.includes(JOURNALED)}; bindings=${receipts.map(receipt => receipt.binding).join(",")}`;
    },
  },
};
/** R: the named residual R-ECHO, one quiet row per self-identifying reconcile read. */
const R_PINS: Readonly<Record<string, PinBody>> = {
  [`echo:${PREVIEW_ID}`]: {
    requirement: "NAMED RESIDUAL R-ECHO, not claimed: an envelope under the preview contract that echoes the journaled rfo_ binds and confirms, because Pi takes the envelope's operation_id as given and never checks it is fresh",
    witness: async () => {
      const receipt = await previewReceipt(async () => previewEnvelope(JOURNALED));
      const absent = acknowledgeWith("effect-absent", [receipt]);
      return `echo ref=${receipt.nativeRef?.id ?? "none"} binding=${receipt.binding}; effect-confirmed=${outcomeOf(acknowledgeWith("effect-confirmed", [receipt]))}; effect-absent=${outcomeOf(absent)} ${overrideAfter(absent)}`;
    },
  },
  "self-anchored": {
    requirement: "NAMED RESIDUAL R-SELF-ANCHORED, not claimed: a requirement in this file's words alone, shortened together with its frozen line, or this file's judging code edited together with the literals it feeds, stays green; the pins whose requirement no outside text holds are listed, measured against the filing",
    witness: async () => {
      const own = selfAnchoredPins();
      const filed = PINS.map(pin => pin.id).filter(id => !own.includes(id));
      return `requirements in this file's words alone=${own.join(", ")}; requirements in the filing's own words=${filed.join(", ")}; judging code (the it.each arguments, the each-liveness lists, the generators and the readers) held by this file alone`;
    },
  },
};

function row(id: RowId, clause: string, pins: Readonly<Record<string, PinBody>>): Row {
  return { id, clause, pins: Object.entries(pins).map(([key, body]) => ({ id: `${id}:${key}`, ...body })) };
}
const ROWS: readonly Row[] = [
  row("G", "statement.1", G_PINS),
  row("S", "statement.2", S_PINS),
  row("N", "statement.3", N_PINS),
  row("H", "acceptance.3", H_PINS),
  row("R", "residual", R_PINS),
];
/** Each row's pin ids as its outside anchor generates them. */
const GENERATED: Readonly<Record<RowId, () => string[]>> = {
  G: () => [...rfCapabilityIds().map(id => `G:id:${id}`), ...rfBinarySites().map(site => `G:bin:${site.name}`)],
  S: () => FILING.surfaces.map(surface => `S:${surface}`),
  N: () => (FILING.clauses.has("statement.3") ? ["N:statement.3"] : []),
  H: () => FILING.honestyClaims.map((_, index) => `H:acceptance.3.${index + 1}`),
  R: () => [...selfIdentifyingReads().map(id => `R:echo:${id}`), ...(selfAnchoredPins().length > 0 ? ["R:self-anchored"] : [])],
};
/**
 * The row each filing clause takes as the filing's own text places it (respin 3 H2): the statement's three clauses - the trigger,
 * the duty and the never clause - are rows G, S and N; an acceptance item opening with the honesty-core label holds before the gate
 * and is row H; every other acceptance item specifies the gated duty and is PARKED.
 */
function clauseRowsOf(filing: Filing): Record<string, RowId | "PARKED"> {
  const statementRows: readonly RowId[] = ["G", "S", "N"];
  return Object.fromEntries([...filing.clauses].map(([clause, text]): [string, RowId | "PARKED"] => {
    const position = Number(clause.slice(clause.indexOf(".") + 1)) - 1;
    return [clause, clause.startsWith("statement.") ? (statementRows[position] ?? "PARKED") : text.startsWith(HONESTY_LABEL) ? "H" : "PARKED"];
  }));
}
/** The pins whose requirement no outside text holds: this file's own words (the filing description holds the N and H requirements verbatim). */
function selfAnchoredPins(): string[] {
  const description = filingText();
  return PINS.filter(pin => !description.includes(pin.requirement)).map(pin => pin.id);
}
/** The residual rows the outside anchors call for (respin 3 H1): row R while src holds a self-identifying reconcile read (R-ECHO) or a pin's requirement is this file's words alone (R-SELF-ANCHORED). */
const residualRowsCalledFor = (): RowId[] => (selfIdentifyingReads().length > 0 || selfAnchoredPins().length > 0 ? ["R"] : []);
const CLAUSE_ROWS: Readonly<Record<string, RowId | "PARKED">> = {
  "statement.1": "G",
  "statement.2": "S",
  "statement.3": "N",
  "acceptance.1": "PARKED",
  "acceptance.2": "PARKED",
  "acceptance.3": "H",
  "acceptance.4": "PARKED",
};
const SHAPE = ["G:statement.1:2", "S:statement.2:4", "N:statement.3:1", "H:acceptance.3:2", "R:residual:2"];
const PIN_LINES: Readonly<Record<string, string>> = {
  "G:id:reactivefiber.render.preview":
    "G:id:reactivefiber.render.preview | every file under src/ is read, each module parsed with its own script kind and every other file listed, and no relative specifier of a src import or export declaration, import() call or require() call leaves src/; the one rf capability id a whole src string token spells is the preview: every naming site is listed, the functions whose judged register calls carry an rf id are the registrars measured here, each of which, run, has registered the preview alone, read-only under a read-scoped permission, when it returns, and every unjudged register spelling is listed by owner and syntax | src files no reader parses=none; relative specifiers leaving src/=none; sites=src/workbench/hosts/local-detached.ts#NATIVE_CAPABILITIES, src/workbench/native-evidence.ts#nativeEvidence, src/workbench/providers/reactivefiber.ts#registerReactiveFiberRender, src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender, src/workflow/reconcile.ts#RECONCILE_EVIDENCE_READS; registered=registerReactiveFiberRender:reactivefiber.render.preview=read/reactivefiber:render, registerNativeReactiveFiberRender:reactivefiber.render.preview=read/reactivefiber:render; id-shaped kinds (not capabilities)=reactivefiber.render.preview.snapshot@src/workbench/reactivefiber-observer.ts#reactivefiberTopology; unjudged register spellings=src/workbench/capability-registry.ts#CapabilityRegistry MethodDeclaration, src/workbench/hosts/local-detached.ts#registryFor PropertySignature, src/workbench/hosts/local-detached.ts#registryFor TypeOfExpression, src/workbench/hosts/local-detached.ts#registryFor VariableDeclaration, src/workbench/hosts/local-detached.ts#registryFor PropertyAccessExpression, src/workbench/hosts/local-detached.ts#registryFor BinaryExpression, src/workbench/hosts/local-detached.ts#registryFor CallExpression, src/workbench/hosts/local-detached.ts#registryFor register call, provider Identifier",
  "G:bin:nativeReactiveFiberRender":
    "G:bin:nativeReactiveFiberRender | the one src declaration naming the rf binary is the noncommitted render, which spawns it: resolved by binding, never by name, its callee is the named import spawn of node:child_process and its argument 2 one const of the spawning function read only by the spawn, built by the file's one module-level function declaration of that name, the callee's and the builder's names each bound once in the file, and every return of that function is an array literal holding --no-commit as a direct element; the child receives --no-commit for every probed input of the descriptor's arms; and no src string token names --idempotency-key | src/workbench/providers/reactivefiber.ts use=spawn argument 1; callee=spawn, bound to the named import spawn of node:child_process, the file's one binding of the name; arguments=3, option keys=stdio,env; argv=const argv, read only by the spawn, from renderArgv(), the file's one module-level function declaration of that name; returns=[--workspace workspaceRoot context render ...select --no-commit --no-input --json]; --no-commit a direct element of every returned array=true; builder string tokens=view --view --task-id --model --model --task --workspace context render --no-commit --no-input --json; child argv (recording stand-in, the only PATH entry): {model,task} -> [--workspace /workspace/rf-operation-receipt-census context render --model census-model --task census-task --no-commit --no-input --json] refused transport; {view,taskId} -> [--workspace /workspace/rf-operation-receipt-census context render --view census-view --task-id census-taskId --no-commit --no-input --json] refused transport; {view,taskId,model} -> [--workspace /workspace/rf-operation-receipt-census context render --view census-view --task-id census-taskId --model census-model --no-commit --no-input --json] refused transport; launches=3 for 3 inputs; --no-commit in every received argv=true; src string tokens naming --idempotency-key=0",
  "S:src/workflow/reconcile.ts":
    "S:src/workflow/reconcile.ts | reactivefiber's reconcile evidence reads are the preview alone until the receipt read is admitted beside it | RECONCILE_EVIDENCE_READS.reactivefiber=[\"reactivefiber.render.preview\"]",
  "S:src/workbench/native-evidence.ts":
    "S:src/workbench/native-evidence.ts | the rf branch projects the preview envelope's own operation_id as nativeId and no domainStatus under both receipt-shaped results, and is the only rf case label of nativeEvidence's switch, where every case label is a whole string token | minimal receipt: projection={\"provider\":\"reactivefiber\",\"nativeId\":\"rfo_freshpreview0000000000\"} domainStatus=absent; shipped receipt: projection={\"provider\":\"reactivefiber\",\"nativeId\":\"rfo_freshpreview0000000000\"} domainStatus=absent; rf branches=reactivefiber.render.preview; unjudged case labels=none",
  "S:src/workflow/runtime.ts":
    "S:src/workflow/runtime.ts | no rf effect is journaled with a native reference, so reconciling one can only come out operator-asserted | run=completed; rows=dispatched:write:refs=0:value=none, settled:write:refs=0:value=none; inspect=0:reactivefiber.render.commit:recorded=0:reads=reactivefiber.render.preview; preview receipt=returned/operator-asserted",
  "S:docs/workbench/08-lifecycle-and-recovery.md":
    "S:docs/workbench/08-lifecycle-and-recovery.md | the operator reconcile journey's rendered section holds one evidence allowlist sentence, the ids it names are exactly the reads RECONCILE_EVIDENCE_READS holds, and no other sentence of the section names a read | one allowlist sentence, in paragraph prose: allowlist=furnace.run.inspect,forge.gate.status,hyperunix.find,reactivefiber.render.preview; binding words (src EvidenceBinding)=journal-recorded,operator-asserted; equals RECONCILE_EVIDENCE_READS=true; other sentences' ids=workbench.reconcile.acknowledgement, each the name of src ACKNOWLEDGEMENT_VALUE_CONTRACT=true",
  "N:statement.3":
    "N:statement.3 | the preview read shall never serve as commit evidence | uncited: ack:operator-asserted override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate; fresh: deny:evidence-identity-mismatch; failed: ack:operator-asserted override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate; unprojected: ack:operator-asserted override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "H:acceptance.3.1":
    "H:acceptance.3.1 | a reconcile fed only a preview envelope for a committed-effect journal row is asserted NOT producer-confirmed | uncited: effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; fresh(returned/unbound): effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; failed(unavailable/operator-asserted): effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; unprojected(returned/operator-asserted): effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted",
  "H:acceptance.3.2":
    "H:acceptance.3.2 | the preview's freshly-minted rfo_ cannot bind the journaled rfo_ | journaled=rfo_journaledcommit000000000; preview refs=rfo_freshpreview0000000000,rfo_freshpreviewsecond0000 distinct=true journaled-among=false; bindings=unbound,unbound",
  "R:echo:reactivefiber.render.preview":
    "R:echo:reactivefiber.render.preview | NAMED RESIDUAL R-ECHO, not claimed: an envelope under the preview contract that echoes the journaled rfo_ binds and confirms, because Pi takes the envelope's operation_id as given and never checks it is fresh | echo ref=rfo_journaledcommit000000000 binding=journal-recorded; effect-confirmed=ack:producer-confirmed; effect-absent=ack:producer-confirmed override unaccepted=override:none accepted=override:none",
  "R:self-anchored":
    "R:self-anchored | NAMED RESIDUAL R-SELF-ANCHORED, not claimed: a requirement in this file's words alone, shortened together with its frozen line, or this file's judging code edited together with the literals it feeds, stays green; the pins whose requirement no outside text holds are listed, measured against the filing | requirements in this file's words alone=G:id:reactivefiber.render.preview, G:bin:nativeReactiveFiberRender, S:src/workflow/reconcile.ts, S:src/workbench/native-evidence.ts, S:src/workflow/runtime.ts, S:docs/workbench/08-lifecycle-and-recovery.md, R:echo:reactivefiber.render.preview, R:self-anchored; requirements in the filing's own words=N:statement.3, H:acceptance.3.1, H:acceptance.3.2; judging code (the it.each arguments, the each-liveness lists, the generators and the readers) held by this file alone",
};
const PINS = ROWS.flatMap(entry => entry.pins);
/** EACH-LIVENESS (respin U1): the ids the row cases and the pin cases recorded as their last statement this run, in run order. */
const REACHED: { readonly rows: string[]; readonly pins: string[] } = { rows: [], pins: [] };
const ROW_CASE = "row %s carries exactly the pins its outside anchor generates";
const PIN_CASE = "pin %s";

describe("wb-jwc.6 the rf operation-receipt reconcile read: honesty core, standing leg and gate tripwire", () => {
  it("reads the owner filing: seven clauses, the gate's four conjuncts, the four surfaces and acceptance.3's two claims", () => {
    expect([...FILING.clauses.keys()]).toStrictEqual(["statement.1", "statement.2", "statement.3", "acceptance.1", "acceptance.2", "acceptance.3", "acceptance.4"]);
    expect(FILING.conjuncts).toStrictEqual(["rf operation show", "--idempotency-key", "FOC-ADR-03", "wb-x32's committing decision"]);
    expect(FILING.surfaces).toStrictEqual(["src/workflow/reconcile.ts", "src/workbench/native-evidence.ts", "src/workflow/runtime.ts", DOCS08]);
    expect(FILING.honestyClaims).toHaveLength(2);
  });

  it("maps every filing clause to one judged row or to the PARKED remainder, and every clause row to its own clause", () => {
    expect(Object.keys(CLAUSE_ROWS)).toStrictEqual([...FILING.clauses.keys()]);
    const rowIds = ROWS.map(entry => entry.id);
    for (const [clause, target] of Object.entries(CLAUSE_ROWS)) {
      if (target === "PARKED") continue;
      expect(rowIds, `${clause} maps to row ${target}`).toContain(target);
      expect(ROWS.find(entry => entry.id === target)?.clause, `row ${target} judges ${clause}`).toBe(clause);
    }
    expect(Object.keys(GENERATED), "every generated row is a judged row").toStrictEqual(rowIds);
    expect(CLAUSE_ROWS, "the clause map is the one the filing's own text gives (respin 3 H2)").toStrictEqual(clauseRowsOf(FILING));
    const clauseRowIds = Object.values(CLAUSE_ROWS);
    expect(rowIds.filter(id => !clauseRowIds.includes(id)), "the rows no clause maps to are the residual rows an outside anchor calls for (respin 3 H1)").toStrictEqual(residualRowsCalledFor());
  });

  it("holds the frozen row shape (standing rule 16)", () => {
    expect(ROWS.map(entry => `${entry.id}:${entry.clause}:${entry.pins.length}`)).toStrictEqual(SHAPE);
  });

  it.each(ROWS.map(entry => entry.id))(ROW_CASE, rowId => {
    expect(ROWS.find(entry => entry.id === rowId)?.pins.map(pin => pin.id)).toStrictEqual(GENERATED[rowId]());
    REACHED.rows.push(rowId);
  }, 60_000);

  it("holds exactly one frozen line per pin", () => {
    expect(Object.keys(PIN_LINES)).toStrictEqual(PINS.map(pin => pin.id));
  });

  it.each(PINS.map(pin => pin.id))(PIN_CASE, async id => {
    const pin = PINS.find(entry => entry.id === id);
    if (pin === undefined) throw new Error(`no pin ${id}`);
    const line = `${pin.id} | ${pin.requirement} | ${await pin.witness()}`;
    expect(line).toBe(PIN_LINES[id]);
    REACHED.pins.push(id);
  }, 60_000);

  it("each-liveness (standing rule 16, respin U1): both it.each sites registered one run-mode case per frozen row and per frozen pin line, in order, and every one reached its last statement", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "suite") walk(child.tasks);
        else if (child.type === "test" && /^(?:row|pin) /.test(child.name)) registered.push(`${child.name}|${child.mode}`);
      }
    };
    walk(task.file.tasks);
    const rowIds = SHAPE.map(entry => entry.slice(0, entry.indexOf(":")));
    const pinIds = Object.keys(PIN_LINES);
    expect(registered, "the run-mode cases the two it.each sites registered").toStrictEqual([...rowIds.map(id => `${ROW_CASE.replace("%s", id)}|run`), ...pinIds.map(id => `${PIN_CASE.replace("%s", id)}|run`)]);
    expect(REACHED.rows, "the row cases that reached their last statement this run").toStrictEqual(rowIds);
    expect(REACHED.pins, "the pin cases that reached their last statement this run").toStrictEqual(pinIds);
  });
});
