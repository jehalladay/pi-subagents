/**
 * wb-jwc.6 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R6): the rf operation-receipt reconcile read - HONESTY CORE, STANDING LEG
 * AND GATE TRIPWIRE, the part of the bead that lands while the R5 conjoint gate is closed.
 *
 * OWNER FILING (the outside anchor): the tracked bead export .beads/issues.jsonl, row wb-jwc.6, read through its description
 * only, so a note a lane appends later changes nothing read. Its STATEMENT ("When <trigger> (<conjuncts>), Pi shall <duty>;
 * <never>.") gives clauses statement.1-3; its ACCEPTANCE list gives acceptance.1-4; its SURFACES line gives the surface files.
 * Each clause maps to exactly one judged row or to the PARKED remainder (CLAUSE_ROWS), and every row's pins are generated from
 * an anchor outside this file:
 *   G statement.1, the trigger: the gate's Pi-side conjunct (wb-x32's committing decision) is still closed. Three readers, each
 *     reading only what it names:
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
 *     registrations carry an rf id are exactly the two src registrars this census runs, and each registers the preview
 *     read-only under a read-scoped permission. Every other spelling is UNJUDGED and listed by owner and syntax, so a new one
 *     moves the witness: an id held by reference or shorthand, concatenated, templated with substitutions or computed by a
 *     call; a provider or descriptor held by reference, spread or computed key; an alias, a bind, an element access, an
 *     assignment, a type member, the method's own declaration. Today the unjudged spellings are CapabilityRegistry's own
 *     declaration and registryFor's local-provider pass-through in src/workbench/hosts/local-detached.ts, which re-registers
 *     the ids an outside local provider module declares and spells none.
 *     BINARY AND ARGV (respin 1 F1, respin 2 U1) - one pin per src declaration holding a whole string token that names the rf
 *     binary (rf itself, a path whose last segment is rf, or a command text whose first word is either), whatever call spawns
 *     it or const carries it; the token's use is measured. For the call that takes the binary as argument 1, the argv it
 *     spawns is read, never the file's flag spellings: argument 2 is one const the spawning function reads nowhere else (or is
 *     written in place), its value is an array literal or a call of one same-file function declaration, and every return of
 *     that function is an array literal holding the whole token --no-commit as a direct element - never behind a spread, a
 *     conditional, a filter, a call or an identifier. Any other shape is written into the witness instead, so it fails closed.
 *     The witness lists each returned literal's elements and the builder's string tokens, and counts the src string tokens
 *     naming --idempotency-key (none).
 *     Within those three readers, a committing rf capability, a receipt-read id or a spawned argv without --no-commit generates
 *     a pin this table does not hold or moves a witness: the tripwire that re-arms the PARKED remainder.
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
 *   R the NAMED RESIDUAL R-ECHO (no filing clause; NOT CLAIMED): one pin per reactivefiber reconcile read whose projection takes
 *     the envelope's own top-level operation_id as nativeId (today the preview). An envelope under the preview contract that
 *     echoes the journaled rfo_ binds journal-recorded and confirms producer-confirmed, and its effect-absent acknowledgement
 *     overrides at duplicate risk none: Pi takes the envelope's operation_id as given, and no genuine rf preview carries a prior
 *     invocation's id. This quiet row pins today's behaviour: hardening it (the preview's reference never binds, whatever its id)
 *     reds R and moves the case into N. A receipt read that projected its own invocation id instead of the receipt's
 *     operation_id (acceptance.2) would generate an R pin this table does not hold.
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
 * Not claimed: the rf-side conjuncts (measured at the cut, not here); the receipt projection's five-state vocabulary (the bead's
 *   2026-10-17b note, owed with acceptance.2); an rf capability id that no whole string token spells (concatenation, a template
 *   with substitutions) or that a `kind` property holds, except where a reader above reads every spelling - a register call's
 *   descriptor id and a nativeEvidence case label are listed unjudged, and RECONCILE_EVIDENCE_READS is measured at runtime; a
 *   register member reached through a name src never spells (one assembled at runtime); an rf binary name assembled at runtime
 *   (concatenation, a template with substitutions, or a value read from the environment or a config with no rf literal in
 *   src); a commit effected by anything but the spawned argv (the child's environment, working directory or a config rf
 *   reads); an rf branch of nativeEvidence written outside its switch's case labels; a docs id written outside the registry
 *   grammar (it names nothing the registry registers); a hyphen-only id under a producer RECONCILE_EVIDENCE_READS does not key,
 *   named outside the allowlist sentence; a host path other than the Claude workflow host's node() journaling; the echo case
 *   (R); row-level existence and the census-authored G, S and R requirement labels, which are self-anchored (gate findings F2,
 *   F3 on cut #1 and F4 on cut #2).
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, allocates no scratch (WS is a string, never created);
 * reads the bead export, the src tree and docs/workbench/08-lifecycle-and-recovery.md.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
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
  const label = "Negative guard (honesty core): ";
  const honesty = items[2] ?? "";
  return {
    clauses,
    conjuncts: [...rfSide.replace(/ in an installed rf$/, "").split(" + "), piSide].filter(part => part.length > 0),
    surfaces: (/^SURFACES: (.+)$/m.exec(text)?.[1] ?? "").split(", ").map(entry => entry.split(":")[0] ?? ""),
    honestyClaims: honesty.startsWith(label) ? honesty.slice(label.length).replace(/\.$/, "").split(` ${EM_DASH} `) : [],
  };
}
const FILING = readFiling(filingText());

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).sort().flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : [];
  });
}
const parsedFiles = new Map<string, ts.SourceFile>();
/** A repo file parsed once, by its repo-relative path. */
function parsed(file: string): ts.SourceFile {
  let source = parsedFiles.get(file);
  if (source === undefined) {
    source = ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    parsedFiles.set(file, source);
  }
  return source;
}
const srcFiles = (): string[] => sourceFiles(SRC).map(path => relative(ROOT, path));
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
 * The argv the rf spawn receives (respin 2 U1): the one call in `site` taking the rf binary as argument 1, its argument 2 resolved
 * through one const the spawning function reads nowhere else to the array literals that can reach the child, and whether each
 * holds --no-commit as a direct element. A shape outside that reading is written into the text instead, so it fails closed.
 */
function spawnedArgv(file: string, site: string): string {
  const source = parsed(file);
  const calls: ts.CallExpression[] = [];
  visitAll(source, node => {
    if (isWholeToken(node) && RF_BINARY.test(node.text) && enclosingDeclaration(node) === site && ts.isCallExpression(node.parent) && node.parent.arguments[0] === node) calls.push(node.parent);
  });
  const [call] = calls;
  if (call === undefined || calls.length !== 1) return `<${calls.length} calls of ${site} take the rf binary as argument 1>`;
  let argv = call.arguments[1];
  if (argv === undefined) return "<the spawn passes no argument 2>";
  let origin = "written in place";
  if (ts.isIdentifier(argv)) {
    const name = argv.text;
    const passed = argv;
    let spawner: ts.Node = call;
    while (!ts.isFunctionLike(spawner) && spawner.parent !== undefined) spawner = spawner.parent;
    const declarations: ts.VariableDeclaration[] = [];
    let reads = 0;
    visitAll(spawner, node => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) declarations.push(node);
      else if (ts.isIdentifier(node) && node.text === name && node !== passed && !(ts.isVariableDeclaration(node.parent) && node.parent.name === node)) reads += 1;
    });
    const [declaration] = declarations;
    if (declaration === undefined || declarations.length !== 1 || (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) === 0 || declaration.initializer === undefined) return `<argument 2 ${name} is not one initialized const of ${site}>`;
    if (reads > 0) return `<${site} reads ${name} ${reads} more times>`;
    argv = declaration.initializer;
    origin = `const ${name}, read only by the spawn`;
  }
  let arrays: ts.ArrayLiteralExpression[];
  let tokens: string[];
  let builder = "an array literal";
  if (ts.isArrayLiteralExpression(argv)) {
    arrays = [argv];
    tokens = wholeTokens(argv);
  } else if (ts.isCallExpression(argv) && ts.isIdentifier(argv.expression)) {
    const callee = argv.expression.text;
    const builders = source.statements.filter((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === callee && statement.body !== undefined);
    const [fn] = builders;
    if (fn === undefined || builders.length !== 1) return `<argv from ${callee}(), not one same-file function declaration>`;
    const returns = ownReturns(fn);
    arrays = returns.flatMap(statement => (statement.expression !== undefined && ts.isArrayLiteralExpression(statement.expression) ? [statement.expression] : []));
    const other = returns.find(statement => statement.expression === undefined || !ts.isArrayLiteralExpression(statement.expression));
    if (returns.length === 0 || other !== undefined) return `<a return of ${callee} is ${other?.expression === undefined ? "missing or empty" : `a ${ts.SyntaxKind[other.expression.kind]}`}>`;
    tokens = wholeTokens(fn);
    builder = `${callee}()`;
  } else return `<argv ${origin} is a ${ts.SyntaxKind[argv.kind]}>`;
  const element = (node: ts.Expression): string => (isWholeToken(node) ? node.text : ts.isSpreadElement(node) ? `...${node.expression.getText(source)}` : node.getText(source));
  const direct = arrays.every(array => array.elements.some(node => isWholeToken(node) && node.text === "--no-commit"));
  return `argv=${origin}, from ${builder}; returns=${arrays.map(array => `[${array.elements.map(element).join(" ")}]`).join(" | ")}; --no-commit a direct element of every returned array=${direct}; builder string tokens=${tokens.join(" ")}`;
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

/** G: one pin per rf capability id src names, one per src function spawning rf. */
const G_PINS: Readonly<Record<string, PinBody>> = {
  [`id:${PREVIEW_ID}`]: {
    requirement: "the one rf capability id a whole src string token spells is the preview: every naming site is listed, the functions whose judged register calls carry an rf id are the registrars measured here and each registers it read-only under a read-scoped permission, and every unjudged register spelling is listed by owner and syntax",
    witness: async () => {
      expect(registryAcceptsId(PREVIEW_ID), "the id-grammar probe descriptor is valid: the registry accepts the preview id under it").toBe(true);
      expect(rfRegistrars(), "every src function whose judged register call carries an rf id is measured here").toStrictEqual(Object.keys(REGISTRARS));
      const sites = srcTokens().filter(token => token.text === PREVIEW_ID).map(token => `${token.file}#${token.site}`);
      const registered = Object.entries(REGISTRARS).map(([name, register]) => {
        const registry = new CapabilityRegistry();
        register(registry);
        const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor).filter(descriptor => descriptor.id === PREVIEW_ID);
        return `${name}:${descriptors.map(descriptor => `${descriptor.effectClass}/${descriptor.permissions.join("+")}`).join(",")}`;
      });
      const kinds = rfKindTokens().map(token => `${token.text}@${token.file}#${token.site}`);
      return `sites=${sites.join(", ")}; registered=${registered.join(", ")}; id-shaped kinds (not capabilities)=${kinds.join(", ")}; unjudged register spellings=${unjudgedRegisterSpellings().join(", ")}`;
    },
  },
  "bin:nativeReactiveFiberRender": {
    requirement: "the one src declaration naming the rf binary is the noncommitted render, which spawns it: the argv it spawns is one const read only by the spawn, built by one same-file function whose every return is an array literal holding --no-commit as a direct element, and no src string token names --idempotency-key",
    witness: async () => {
      const site = rfBinarySites().find(entry => entry.name === "nativeReactiveFiberRender");
      if (site === undefined) return "<nativeReactiveFiberRender names no rf binary>";
      const keyed = srcTokens().filter(token => token.text.includes("--idempotency-key")).length;
      return `${site.file} use=${site.use}; ${spawnedArgv(site.file, site.name)}; src string tokens naming --idempotency-key=${keyed}`;
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
  R: () => selfIdentifyingReads().map(id => `R:echo:${id}`),
};
const CLAUSE_ROWS: Readonly<Record<string, RowId | "PARKED">> = {
  "statement.1": "G",
  "statement.2": "S",
  "statement.3": "N",
  "acceptance.1": "PARKED",
  "acceptance.2": "PARKED",
  "acceptance.3": "H",
  "acceptance.4": "PARKED",
};
const SHAPE = ["G:statement.1:2", "S:statement.2:4", "N:statement.3:1", "H:acceptance.3:2", "R:residual:1"];
const PIN_LINES: Readonly<Record<string, string>> = {
  "G:id:reactivefiber.render.preview":
    "G:id:reactivefiber.render.preview | the one rf capability id a whole src string token spells is the preview: every naming site is listed, the functions whose judged register calls carry an rf id are the registrars measured here and each registers it read-only under a read-scoped permission, and every unjudged register spelling is listed by owner and syntax | sites=src/workbench/hosts/local-detached.ts#NATIVE_CAPABILITIES, src/workbench/native-evidence.ts#nativeEvidence, src/workbench/providers/reactivefiber.ts#registerReactiveFiberRender, src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender, src/workflow/reconcile.ts#RECONCILE_EVIDENCE_READS; registered=registerReactiveFiberRender:read/reactivefiber:render, registerNativeReactiveFiberRender:read/reactivefiber:render; id-shaped kinds (not capabilities)=reactivefiber.render.preview.snapshot@src/workbench/reactivefiber-observer.ts#reactivefiberTopology; unjudged register spellings=src/workbench/capability-registry.ts#CapabilityRegistry MethodDeclaration, src/workbench/hosts/local-detached.ts#registryFor PropertySignature, src/workbench/hosts/local-detached.ts#registryFor TypeOfExpression, src/workbench/hosts/local-detached.ts#registryFor VariableDeclaration, src/workbench/hosts/local-detached.ts#registryFor PropertyAccessExpression, src/workbench/hosts/local-detached.ts#registryFor BinaryExpression, src/workbench/hosts/local-detached.ts#registryFor CallExpression, src/workbench/hosts/local-detached.ts#registryFor register call, provider Identifier",
  "G:bin:nativeReactiveFiberRender":
    "G:bin:nativeReactiveFiberRender | the one src declaration naming the rf binary is the noncommitted render, which spawns it: the argv it spawns is one const read only by the spawn, built by one same-file function whose every return is an array literal holding --no-commit as a direct element, and no src string token names --idempotency-key | src/workbench/providers/reactivefiber.ts use=spawn argument 1; argv=const argv, read only by the spawn, from renderArgv(); returns=[--workspace workspaceRoot context render ...select --no-commit --no-input --json]; --no-commit a direct element of every returned array=true; builder string tokens=view --view --task-id --model --model --task --workspace context render --no-commit --no-input --json; src string tokens naming --idempotency-key=0",
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
