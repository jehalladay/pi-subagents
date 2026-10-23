/**
 * wb-pfxo.2 (RF-COMPOSITIONAL-ASSEMBLY-R3), a posture census. Statement (bead title, verbatim): "No Pi surface shall label an rf
 * block as changed because its source changed; a block or structure change is claimed only from rf's own diff output (rf context
 * diff RENDER_A RENDER_B, served at the pin; the 'assembly revise' block/structure diff), never inferred from a source mutation
 * receipt or impact set (posture; no gating artifact)". Quote (docs/programs/compositional-assembly-2026-10-18/README.md:32@
 * 6a251bf73af5): "4. 'assembly revise': source mutation receipt -> impact set -> rerender -> block/structure diff; never claim changed
 * source automatically implies changed block." Acceptance: "(a) fixture: a source-change receipt / impact set with no diff envelope
 * yields no 'changed block' or 'stale block' claim in any Pi surface; (b) fixture: a context.diff envelope is surfaced with exactly
 * the producer's changed/unchanged block rows and counts; (c) docs census: no sentence in docs/workbench states that a changed source
 * implies a changed block."
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-23), in a scratch jsonl workspace whose one
 * pure declarative component demo.banner (instance banner) renders two blocks, `fixed` (a constant line) and `notes`
 * (`notes: ${prop:notes}`), and reads three sources on its ports: task, notes (a file the body reads) and aside (a file the body never
 * reads). THE FIXTURE (test/fixtures/rf-source-change-block-claim-roster.json, envelopes, each the stdout of one rf command with only
 * the scratch root rewritten to /fixture/rf-workspace): previewBefore and previewAfter are Pi's own legacy preview argv (`rf
 * --workspace W context render --model M --task T --no-commit --no-input --json`) before any edit and after both; R1, R2 and R3 are
 * committed renders in one session, aside edited between R1 and R2 and notes edited between R2 and R3. explainSource is `rf context
 * explain R2`: its component row's rerender_cause is inputs_changed naming source aside, the producer's own receipt that a source
 * changed. planSource is `rf context plan R1` after the aside edit: one refresh_required row whose causes key the three sources, the
 * impact set this build serves. impactRefusal is `rf graph impact --candidate candidate_placeholder`: exit 2
 * RF_USAGE_NOT_IMPLEMENTED (planned slice 17), the impact verb unserved at this build. diffSourceOnly is `rf context diff R1 R2`: both
 * blocks unchanged although each states source_changed true - the source moved and no block did. diffContent is `rf context diff R2
 * R3`: fixed unchanged, notes content_changed (counts_by_class content_changed 1, unchanged 1).
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts) with its reader adapter
 * (reactivefiber-observer.ts): it spawns only `rf ... context render ... --no-commit`, admits only context.render envelopes and states
 * no block verdict of its own. The census pins that posture and every surface the obligation reaches:
 *  A, the posture, absent today. A1 a lexical scan of every src module - string, no-substitution and template literals and every
 *    identifier - for a block word within WINDOW words of a change word (or one joined word spelling both), with floors, an anchor,
 *    controls and every src file a parsed .ts module; A2 no src module reads an rf diff, plan, explain or impact envelope: no argv array or literal spells one of their verbs
 *    and no literal or identifier spells one of their row fields, with the render argv read for non-vacuity; A3 the rf roster stays the
 *    preview alone (native and injected registrations selected by id, permission and contract source, and
 *    RECONCILE_EVIDENCE_READS.reactivefiber at src/workflow/reconcile.ts).
 *  B, acceptance (a). B1 the fixtures: the receipt names the source change, the plan row is refresh_required, the impact verb refuses,
 *    none is a diff envelope or carries a diff row, and the diff of the receipt's own render pair changed 0 blocks; B2 the native
 *    reader refuses each as an unrecognized envelope in one spawn of the render argv; B3 the registered reading (registerReactiveFiberRender,
 *    the registry's injected-reader seam) carries each byte for byte and adds only its contract and workspace root; B4 the adapter
 *    refuses each; B5 the previews measured before and after the edits project, through the native reader and the adapter into one
 *    ObservationProjection, with no block-change pair or change word in any surfaced string, and the earlier node stays current (each
 *    preview's workspace root is rebound to the registry root, the one field changed, since the native reader admits only its own).
 *  C, acceptance (b). C1 the fixtures: each diff's block rows, counts_by_class and changed_block_count, which agree with the rows' own
 *    classes and content digests; C2 and C3 the registered reading of each diff carries it byte for byte, so its rows and counts are
 *    exactly the producer's and the unchanged block whose sources moved stays unchanged; C4 no Pi reader re-derives a row: the native
 *    reader and the adapter refuse each diff.
 *  D, acceptance (c). D1 every sentence unit of every docs/workbench file (all markdown at base), with floors and an anchor, pairs
 *    no source-change with a block-change; D2 the detector's controls: the flagged paraphrases, the quiet negatives and the named
 *    residual and precision rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label and
 * pins, every pin's witness, the vocabularies, the window, the fixtures, their exits and the registered tests - is held to the
 * out-of-file roster, whose measured envelopes anchor the block rows and counts outside this file; the last case walks this file's
 * vitest task tree against the roster.
 * RESIDUALS (named, each with a pinned quiet row): R-NO-DIFF-READER no Pi reader reads a context.diff (or plan, explain or impact)
 * envelope, so the producer's block rows ride only the injected registered reading (quiet rows B2, B4, C4); R-COMPOSED a claim, verb or
 * field composed from non-literal parts, or spelled through an alias, is invisible to A1 and A2 (their composed and aliased controls
 * read no hit); R-VOCABULARY a block or change word
 * outside the pinned vocabularies (a paragraph, an input, an abbreviation) is invisible (quiet controls in A1 and D2); R-FAR a pair
 * farther apart than WINDOW words is invisible (quiet controls in A1 and D2); R-ACROSS a claim split across two sentence units is
 * invisible to D1 (quiet control in D2); R-ENCODED an encoding outside the decoded HTML character references (percent, backslash or
 * octal escapes) is invisible to D1 (quiet control in D2). PRECISION (not an escape): D1 also reds on a sentence that denies the
 * implication (the denial control in D2 reads 1), so such a sentence is judged by hand.
 * SCOPE: the envelopes are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when a
 * fixture re-measure re-reads them. No reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and docs are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what B3, C2 and C3 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-source-change-block-claim-roster.json");
const ROOT = process.cwd();
/** The root every roster envelope names: the measured scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RF_VERSION = "0.1.832";
const DIFF_COMMAND = "context.diff";
const UNRECOGNIZED = "RF preview returned an unrecognized native envelope.";
const NOT_A_RENDER = "ReactiveFiber topology refused: source must be a reactive-fiber.cli/v1 context.render envelope.";
/** The detectors' reach: a pair is two words at most WINDOW words apart, in either order. */
const WINDOW = 5;
const BLOCK_WORDS: readonly string[] = ["block", "blocks"];
const SOURCE_WORDS: readonly string[] = ["source", "sources"];
/** Every word that, beside a block word, states the block changed or went stale, in the inflections a sentence or label uses. */
const CHANGE_WORDS: readonly string[] = [
  "change", "changes", "changed", "changing", "stale", "staled", "staleness", "invalidate", "invalidates", "invalidated", "invalidating",
  "invalidation", "dirty", "dirtied", "outdated", "obsolete", "expired", "superseded", "affected", "impacted", "modify", "modifies",
  "modified", "modifying", "modification", "update", "updates", "updated", "updating", "rewrite", "rewrites", "rewrote", "rewritten",
  "alter", "alters", "altered", "differ", "differs", "differed", "different", "move", "moves", "moved", "edit", "edits", "edited",
  "editing", "mutate", "mutates", "mutated", "mutating", "mutation", "mutations", "refresh", "refreshed", "refreshes", "rerender",
  "rerendered", "rerenders", "revise", "revised", "revises", "revising", "regenerate", "regenerated", "regenerates", "recompute",
  "recomputed", "recomputes", "replace", "replaced", "replaces",
];
/** The fixtures by role: the measured previews, the (a) receipt, impact set and impact refusal, and the (b) diffs. */
const PREVIEWS = ["previewBefore", "previewAfter"] as const;
const RECEIPTS = ["explainSource", "planSource", "impactRefusal"] as const;
const DIFFS = ["diffSourceOnly", "diffContent"] as const;
type FixtureName = (typeof PREVIEWS)[number] | (typeof RECEIPTS)[number] | (typeof DIFFS)[number];
const FIXTURES: readonly FixtureName[] = [...PREVIEWS, ...RECEIPTS, ...DIFFS];
/** The rf read verbs a block-verdict reader would spawn or name; no src module may spell one. */
const READ_VERB = /\b(?:context[\s._-]+(?:diff|plan|explain)|graph[\s._-]+(?:diff|impact))\b/i;
const VERB_PAIRS: readonly string[] = ["context diff", "context plan", "context explain", "graph diff", "graph impact"];
/** The row fields of those envelopes a reader would read; no src literal or identifier may spell one. */
const ROW_FIELDS: readonly string[] = [
  "candidate_key", "counts_by_class", "changed_block_count", "changed_source_snapshots", "source_changed", "source_layer_changed",
  "final_document_changed", "content_changed", "refresh_required", "rerender_cause", "inputs_changed",
];
const ROW_FIELD = new RegExp(`\\b(?:${ROW_FIELDS.join("|")})\\b`);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(posture, absent today) no Pi rf surface can label a block changed or stale: no src literal or identifier pairs a block word with a change word, no src module reads an rf diff, plan, explain or impact envelope, and the rf roster stays reactivefiber.render.preview alone",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(a) a source-change receipt / impact set with no diff envelope yields no 'changed block' or 'stale block' claim in any Pi surface",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(b) a context.diff envelope is surfaced with exactly the producer's changed/unchanged block rows and counts",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(c) docs census: no sentence in docs/workbench states that a changed source implies a changed block",
    pins: ["D1", "D2"],
  },
];

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string } | null;
  transaction_id: string | null;
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
interface Roster {
  readonly bead: string;
  readonly rfVersion: string;
  readonly window: number;
  readonly vocabulary: { readonly block: readonly string[]; readonly source: readonly string[]; readonly change: readonly string[] };
  readonly fixtures: readonly string[];
  readonly exits: Readonly<Record<FixtureName, number>>;
  readonly envelopes: Readonly<Record<FixtureName, Envelope>>;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
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

/** One roster envelope in the strict eight-key rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value) || Object.keys(value).length !== 8) throw new Error(`envelope ${name} must be an eight-key object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (workspace !== null && (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string")) {
    throw new Error(`envelope ${name} needs a workspace or null`);
  }
  if ((transactionId !== null && typeof transactionId !== "string") || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) {
    throw new Error(`envelope ${name} needs a transaction id or null, a result and diagnostics`);
  }
  return {
    schema, ok, command, operation_id: operationId, workspace: workspace === null ? null : { id: String(workspace.id), root: String(workspace.root) },
    transaction_id: transactionId, result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.exits) || !isObject(raw.vocabulary)) {
    throw new Error("roster must be an object with rows, envelopes, exits and a vocabulary");
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
  const fixtures = strings(raw.fixtures, "fixtures");
  if (JSON.stringify(fixtures) !== JSON.stringify(FIXTURES)) throw new Error(`roster fixtures must be ${FIXTURES.join(", ")}`);
  const { envelopes: rawEnvelopes, exits: rawExits } = raw;
  const envelopes = Object.fromEntries(FIXTURES.map(name => [name, envelopeOf(rawEnvelopes[name], name)])) as Record<FixtureName, Envelope>;
  const exits = Object.fromEntries(FIXTURES.map(name => {
    const exit = rawExits[name];
    if (typeof exit !== "number" || !Number.isSafeInteger(exit)) throw new Error(`roster exits.${name} must be an integer`);
    return [name, exit];
  })) as Record<FixtureName, number>;
  if (typeof raw.bead !== "string" || typeof raw.rfVersion !== "string" || typeof raw.window !== "number") throw new Error("roster needs bead, rfVersion and window");
  return {
    bead: raw.bead, rfVersion: raw.rfVersion, window: raw.window,
    vocabulary: { block: strings(raw.vocabulary.block, "vocabulary.block"), source: strings(raw.vocabulary.source, "vocabulary.source"), change: strings(raw.vocabulary.change, "vocabulary.change") },
    fixtures, exits, envelopes, rows, tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const ENVELOPES = ROSTER.envelopes;

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
/** The objects of a JSON value that carry a diff block row: a candidate_key beside a class. */
function diffRowCount(value: unknown): number {
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + diffRowCount(item), 0);
  if (!isObject(value)) return 0;
  const own = typeof value.candidate_key === "string" && typeof value.class === "string" ? 1 : 0;
  return Object.values(value).reduce((sum: number, item) => sum + diffRowCount(item), own);
}
function primaryOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.diagnostics[0], `${envelope.operation_id} diagnostics[0]`);
}

const NAMED_REFERENCES: Readonly<Record<string, string>> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
/** One code point, or a space for a number no code point spells. */
function codePoint(value: number): string {
  return Number.isSafeInteger(value) && value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : " ";
}
/** HTML character references decoded: the six named ones (semicolon required) and every decimal or hex one (semicolon optional). */
function decoded(text: string): string {
  return text
    .replace(/&#x([0-9a-f]{1,6});?/gi, (_whole: string, hex: string) => codePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]{1,7});?/g, (_whole: string, digits: string) => codePoint(Number(digits)))
    .replace(/&(nbsp|amp|lt|gt|quot|apos);/g, (_whole: string, name: string) => NAMED_REFERENCES[name] ?? " ");
}
/** The words a detector reads: references decoded, a "re-" prefix joined to its word, camelCase split, every run of other characters
 * a separator, lowercased. */
function wordsOf(text: string): string[] {
  return decoded(text)
    .replace(/\bre-(?=[a-z])/gi, "re")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
const BLOCK = new Set(BLOCK_WORDS);
const SOURCE = new Set(SOURCE_WORDS);
const CHANGE = new Set(CHANGE_WORDS);
/** One lowercase word joining a vocabulary word to a change word, in either order (blockchanged, stalesource). */
function joinedOf(words: readonly string[]): ReadonlySet<string> {
  return new Set(words.flatMap(word => CHANGE_WORDS.flatMap(change => [`${word}${change}`, `${change}${word}`])));
}
const BLOCK_JOINED = joinedOf(BLOCK_WORDS);
const SOURCE_JOINED = joinedOf(SOURCE_WORDS);
/** The first pair of a `left` word and a `right` word at most WINDOW words apart, or a joined word spelling both; null for none. */
function pairOf(words: readonly string[], left: ReadonlySet<string>, joined: ReadonlySet<string>): string | null {
  for (let index = 0; index < words.length; index++) {
    const word = words[index] ?? "";
    if (joined.has(word)) return word;
    if (!left.has(word)) continue;
    for (let other = Math.max(0, index - WINDOW); other <= Math.min(words.length - 1, index + WINDOW); other++) {
      const near = words[other] ?? "";
      if (other !== index && CHANGE.has(near)) return `${word}~${near}`;
    }
  }
  return null;
}
/** A block-change claim: a block word beside a change word. */
function blockClaim(text: string): string | null {
  return pairOf(wordsOf(text), BLOCK, BLOCK_JOINED);
}
/** A sentence unit stating the implication: a source-change pair and a block-change pair in the same unit. */
function implication(unit: string): string | null {
  const words = wordsOf(unit);
  const block = pairOf(words, BLOCK, BLOCK_JOINED);
  const source = pairOf(words, SOURCE, SOURCE_JOINED);
  return block !== null && source !== null ? `${source} + ${block}` : null;
}
/** The sentence units of a markdown text: split at a sentence end (., ! or ? before whitespace), a blank line, a line that opens a
 * list item, heading, quote or table row, and a table cell bar; character references are decoded first. */
function unitsOf(text: string): string[] {
  return decoded(text)
    .split(/(?<=[.!?])\s+|\n[ \t]*\n|\n(?=[ \t]*(?:[-*+>#|]|\d+[.)]\s))|\|/)
    .map(unit => unit.replace(/\s+/g, " ").trim())
    .filter(unit => unit.length > 0);
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
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
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

interface Lexicon {
  readonly file: string;
  readonly literals: string[];
  readonly identifiers: string[];
  readonly verbArgv: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** One module's lexicon: its string, no-substitution and template literals (a template's literal parts joined by a space), every
 * identifier, and its argv arrays - an rf read verb spelled as two literal words, the render argv, or "context"/"graph" before a
 * non-literal element. */
function lexiconOf(fileName: string, text: string): Lexicon {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const identifiers: string[] = [];
  const verbArgv: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    else if (ts.isIdentifier(node)) identifiers.push(node.text);
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if ((word !== "context" && word !== "graph") || index + 1 >= words.length) return;
        const next = words[index + 1];
        if (next === null || next === undefined) composedArgv += 1;
        else if (VERB_PAIRS.includes(`${word} ${next}`)) verbArgv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
        else if (word === "context" && next === "render") renderArgv += 1;
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file: fileName, literals, identifiers, verbArgv, renderArgv, composedArgv };
}
let srcLexica: Lexicon[] | undefined;
/** Every src .ts module's lexicon, parsed once for A1 and A2. */
function srcLexicon(): Lexicon[] {
  srcLexica ??= filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => lexiconOf(relative(REPO, file), textOf(file)));
  return srcLexica;
}
/** The src files the lexicon does not parse: every src file is a .ts module at base, so a file of another kind reds A1 until read. */
function unparsedSrc(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => !file.endsWith(".ts")).map(file => relative(REPO, file));
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: every spawn appends its JSON argv line to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-source-change-block-claim-");
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
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
/** The verb a spawn ran: the two argv words after `--workspace <root>`. */
function verbOf(spawns: readonly string[][]): string[] {
  return (spawns[0] ?? []).slice(2, 4);
}

function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against a stand-in rf answering `answer`. */
async function nativeOutcome(answer: JsonValue, exit: number): Promise<NativeOutcome> {
  const log = standInRf(answer, exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}
/** The native reader's refusal of a fixture it must not read, asserted: unrecognized, no reading, one spawn of the render argv. */
async function nativeRefusal(name: FixtureName): Promise<JsonValue> {
  const outcome = await nativeOutcome(json(ENVELOPES[name]), ROSTER.exits[name]);
  const claim = blockClaim(outcome.refusal?.message ?? "");
  expect(outcome.refusal).toStrictEqual({ category: "transport", message: UNRECOGNIZED });
  expect(outcome.reading).toBeNull();
  expect(outcome.spawns).toHaveLength(1);
  expect(outcome.spawns[0]).toContain("--no-commit");
  expect(claim).toBeNull();
  return { ...outcome.refusal, reading: false, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), claim };
}

/** One registry invocation of the INJECTED preview whose reader answers a deep copy of the fixture; `before` is a fresh roster read
 * serialized before the invocation, so a reading mutated in place cannot pass as verbatim. */
async function registeredReading(name: FixtureName): Promise<{ reading: JsonObject; calls: number; before: string }> {
  const before = JSON.stringify(readRoster().envelopes[name]);
  const handed = json(ENVELOPES[name]);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return handed as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  return { reading, calls, before };
}
/** The registered reading of a fixture, asserted byte for byte: the source serializes to the fresh roster bytes, the reader ran once,
 * and the only strings Pi adds are its contract and workspace root, neither a block claim. */
async function verbatimReading(name: FixtureName): Promise<{ witness: JsonObject; source: Envelope }> {
  const { reading, calls, before } = await registeredReading(name);
  expect(JSON.stringify(reading.source)).toBe(before);
  expect(calls).toBe(1);
  const piStrings = stringLeaves({ ...reading, source: null });
  const piClaims = piStrings.filter(text => blockClaim(text) !== null);
  expect(piStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(piClaims).toEqual([]);
  return { witness: { verbatim: true, calls, readingKeys: Object.keys(reading).sort(), piStrings, piClaims }, source: envelopeOf(reading.source, `${name} reading source`) };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
/** The adapter's refusal of a fixture it must not project, asserted: a validation refusal naming no block claim. */
function adapterRefusal(name: FixtureName): JsonValue {
  let caught: unknown;
  try {
    reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(ENVELOPES[name]) }, FIXTURE_CONTEXT);
  } catch (error) {
    caught = error;
  }
  const refusal = refusalOf(caught);
  const claim = blockClaim(refusal.message);
  expect(refusal).toStrictEqual({ category: "validation", message: NOT_A_RENDER });
  expect(claim).toBeNull();
  return { ...refusal, claim };
}

/** One diff's producer facts: its block rows, counts and changed count, and whether they agree with the rows' own classes and digests. */
function diffFacts(envelope: Envelope): JsonObject {
  const result = objectOf(envelope.result, `${envelope.command} result`);
  const blocks = arrayOf(result.blocks, "result.blocks").map((block, index) => objectOf(block, `result.blocks[${index}]`));
  const summary = objectOf(result.summary, "result.summary");
  const counts = objectOf(summary.counts_by_class, "result.summary.counts_by_class");
  const attribution = objectOf(result.attribution, "result.attribution");
  const tally: JsonObject = Object.fromEntries(Object.keys(counts).map(key => [key, 0]));
  for (const block of blocks) tally[String(block.class)] = Number(tally[String(block.class)] ?? 0) + 1;
  const digestsAgree = blocks.every(block => {
    const same = objectOf(block.before, "before").content_digest === objectOf(block.after, "after").content_digest;
    return block.class === "unchanged" ? same : block.class === "content_changed" ? !same : true;
  });
  return {
    command: envelope.command,
    rows: blocks.map(block => `${String(block.candidate_key)}:${String(block.class)}:source_changed=${String(block.source_changed)}`),
    counts, blocks: summary.blocks ?? null, changedBlockCount: attribution.changed_block_count ?? null,
    sourceLayerChanged: attribution.source_layer_changed ?? null,
    tallyAgrees: JSON.stringify(tally) === JSON.stringify(counts),
    changedAgrees: blocks.filter(block => block.class !== "unchanged").length === attribution.changed_block_count,
    digestsAgree,
  };
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of the three selectors: id prefix, permission family or contract source. */
function rfIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors
    .filter(descriptor => descriptor.id.startsWith("reactivefiber.") || descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").includes("reactive-fiber.cli"))
    .map(descriptor => descriptor.id);
}
/** A copy of an envelope whose workspace root is `root`, nothing else changed: the native reader admits only its own root. */
function rebound(envelope: Envelope, root: string): JsonValue {
  const copy = objectOf(json(envelope), "rebound envelope");
  copy.workspace = { ...objectOf(copy.workspace, "rebound workspace"), root };
  return copy;
}

const A1_CONTROLS: Readonly<Record<string, string>> = {
  literal: 'const label = "changed block";',
  reversed: 'const label = "block changed";',
  stale: 'const label = "the block is stale";',
  template: ["const label = `$", "{count} blocks were rewritten`;"].join(""),
  camelIdentifier: "const view = { blockChanged: true };",
  snake: 'const key = "changed_block";',
  kebab: 'const key = "block-changed";',
  rerendered: 'const key = "re-rendered block";',
  joined: 'const key = "staleblock";',
  upper: 'const key = "STALE BLOCK";',
  negativeBlocked: 'const key = "blocked";',
  negativeUnchanged: 'const key = "block unchanged";',
  residualComposed: 'const key = "block" + " " + verb;',
  residualFar: 'const key = "block one two three four five six changed";',
  residualVocabulary: 'const key = "changed paragraph";',
};
const A2_CONTROLS: Readonly<Record<string, string>> = {
  argvDiff: 'spawn("rf", ["--workspace", w, "context", "diff", a, b, "--json"]);',
  argvImpact: 'spawn("rf", ["graph", "impact", "--candidate", c]);',
  spacedPlan: 'const command = "rf context plan rfr_x --json";',
  dottedExplain: 'const command = "context.explain";',
  fieldLiteral: 'const rows = diff["counts_by_class"];',
  fieldIdentifier: "const changed = diff.changed_block_count;",
  residualComposed: 'const verb = "diff"; spawn("rf", ["context", verb]);',
  residualAliased: 'const noun = "context"; spawn("rf", [noun, "diff"]);',
};
/** A control's A1 reading: the literals and identifiers carrying a block-change claim. */
function a1Control(text: string): number {
  const lexicon = lexiconOf("control.ts", text);
  return [...lexicon.literals, ...lexicon.identifiers].filter(item => blockClaim(item) !== null).length;
}
/** A control's A2 reading: verb argv, verb literals and row fields, with the composed argv counted apart. */
function a2Control(text: string): JsonValue {
  const lexicon = lexiconOf("control.ts", text);
  const hits = lexicon.verbArgv.length + lexicon.literals.filter(item => READ_VERB.test(item)).length +
    [...lexicon.literals, ...lexicon.identifiers].filter(item => ROW_FIELD.test(item)).length;
  return { hits, composedArgv: lexicon.composedArgv };
}

const D2_FLAGGED: Readonly<Record<string, string>> = {
  implies: "A changed source implies a changed block.",
  whenStale: "When a source changes, every block that reads it is stale.",
  marks: "A source edit marks the dependent blocks stale.",
  invalidates: "Mutating the source invalidates its block.",
  plural: "Changed sources imply changed blocks.",
  rerendered: "The block is re-rendered because its source was updated.",
  camel: "sourceChanged therefore blockChanged",
  snake: "source_changed means block_changed",
  joined: "a sourcechanged row is a blockchanged row",
  emphasis: "A **changed** source implies a `changed` block.",
  comment: "<!-- a changed source means a changed block -->",
  references: "a changed&#32;source implies a changed&nbsp;block",
};
const D2_QUIET: Readonly<Record<string, string>> = {
  receiptSources: "its `sources` sha256 block records the pre-correction hashes of the three files edited for it",
  unchanged: "the block is unchanged and its source is read once",
  diffReads: "rf context diff reports each block's class beside its cited source snapshots",
};
const D2_RESIDUALS: Readonly<Record<string, string>> = {
  "R-ACROSS": "The source changed. So the block is stale.",
  "R-FAR": "a source alpha beta gamma delta epsilon zeta eta changed every block now changed",
  "R-VOCABULARY": "A changed input implies a changed paragraph.",
  "R-ENCODED": "a changed%20source implies a changed%20block",
};
const D2_DENIAL = "A changed source never implies a changed block.";
/** A control text's D1 reading: its sentence units stating the implication. */
function d1Reading(text: string): number {
  return unitsOf(text).filter(unit => implication(unit) !== null).length;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const lexica = srcLexicon();
    const literals = lexica.reduce((sum, lexicon) => sum + lexicon.literals.length, 0);
    const identifiers = lexica.reduce((sum, lexicon) => sum + lexicon.identifiers.length, 0);
    const hits = lexica.flatMap(lexicon => [...lexicon.literals, ...lexicon.identifiers].flatMap(item => {
      const claim = blockClaim(item);
      return claim === null ? [] : [`${lexicon.file}: ${claim} :: ${item.slice(0, 120)}`];
    }));
    const floors = { modules: lexica.length >= 100, literals: literals >= 5000, identifiers: identifiers >= 50000 };
    const anchorRead = lexica.some(lexicon => lexicon.file === "src/workbench/providers/reactivefiber.ts" && lexicon.literals.some(item => item.startsWith("RF render refused")));
    const unparsed = unparsedSrc();
    expect(floors, `src modules ${lexica.length}, literals ${literals}, identifiers ${identifiers}`).toStrictEqual({ modules: true, literals: true, identifiers: true });
    expect(anchorRead).toBe(true);
    expect(unparsed, "a src file the lexical scan does not parse").toEqual([]);
    expect(hits, "a src literal or identifier labelling a block changed or stale").toEqual([]);
    const controls = Object.fromEntries(Object.entries(A1_CONTROLS).map(([name, text]) => [name, a1Control(text)]));
    return { floors, anchorRead, unparsed, hits, controls };
  },
  A2: async () => {
    const lexica = srcLexicon();
    const argv = lexica.flatMap(lexicon => lexicon.verbArgv);
    const literals = lexica.flatMap(lexicon => lexicon.literals.filter(item => READ_VERB.test(item)).map(item => `${lexicon.file}: ${item}`));
    const fields = lexica.flatMap(lexicon => [...lexicon.literals, ...lexicon.identifiers].filter(item => ROW_FIELD.test(item)).map(item => `${lexicon.file}: ${item}`));
    const renderArgvSeen = lexica.reduce((sum, lexicon) => sum + lexicon.renderArgv, 0) >= 1;
    const composedArgv = lexica.reduce((sum, lexicon) => sum + lexicon.composedArgv, 0);
    const descriptors = await nativeDescriptors();
    const descriptorHits = descriptors.filter(descriptor => READ_VERB.test(JSON.stringify(descriptor)) || ROW_FIELD.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, fields, descriptorHits, composedArgv }, "an rf diff, plan, explain or impact reader in src").toStrictEqual({ argv: [], literals: [], fields: [], descriptorHits: [], composedArgv: 0 });
    const controls = Object.fromEntries(Object.entries(A2_CONTROLS).map(([name, text]) => [name, a2Control(text)]));
    return { renderArgvSeen, argv, literals, fields, descriptorHits, composedArgv, controls };
  },
  A3: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = rfIds(await nativeDescriptors());
    const injectedIds = rfIds(injected.catalogSnapshot().map(entry => entry.descriptor));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    return { native, injected: injectedIds, reconcile };
  },
  B1: async () => {
    const explain = objectOf(ENVELOPES.explainSource.result, "explain result");
    const components = objectOf(explain.components, "explain result.components");
    const causes = Object.entries(components).flatMap(([status, rows]) => arrayOf(rows, `components.${status}`).map(row => {
      const entry = objectOf(row, `components.${status} row`);
      return { status, instance: String(entry.component_instance_id), rerenderCause: entry.rerender_cause ?? null };
    }));
    const plan = objectOf(ENVELOPES.planSource.result, "plan result");
    const planRows = arrayOf(objectOf(plan.plan, "plan result.plan").rows, "plan rows").map(row => {
      const entry = objectOf(row, "plan row");
      const keys = arrayOf(entry.causes, "plan row causes").map(cause => {
        const item = objectOf(cause, "plan cause");
        const key = objectOf(item.key, "plan cause key");
        return `${String(item.kind)}:${String(key.kind)}:${String(key.id)}`;
      });
      return { instance: String(entry.component_instance_id), decision: String(entry.decision), causes: keys };
    });
    const impact = primaryOf(ENVELOPES.impactRefusal);
    const impactMetadata = objectOf(impact.metadata, "impact metadata");
    const sides = objectOf(objectOf(ENVELOPES.diffSourceOnly.result, "diff result").sides, "diff sides");
    const pairedDiff = {
      renderA: String(objectOf(sides.before, "diff before").render_id), renderB: String(objectOf(sides.after, "diff after").render_id),
      changedBlockCount: objectOf(objectOf(ENVELOPES.diffSourceOnly.result, "diff result").attribution, "diff attribution").changed_block_count ?? null,
    };
    const commands = RECEIPTS.map(name => ENVELOPES[name].command);
    const diffRows = RECEIPTS.map(name => diffRowCount(ENVELOPES[name]));
    expect(commands).not.toContain(DIFF_COMMAND);
    expect(diffRows).toEqual([0, 0, 0]);
    expect(causes.some(cause => JSON.stringify(cause.rerenderCause).includes('"aside"'))).toBe(true);
    expect(planRows.map(row => row.decision)).toEqual(["refresh_required"]);
    expect([impact.code, ENVELOPES.impactRefusal.ok, ROSTER.exits.impactRefusal]).toEqual(["RF_USAGE_NOT_IMPLEMENTED", false, 2]);
    expect(pairedDiff.renderB).toBe(String(explain.render_id));
    expect(pairedDiff.renderA).toBe(String(plan.render_id));
    expect(pairedDiff.changedBlockCount).toBe(0);
    return {
      commands, diffRows, receiptRender: String(explain.render_id), causes, planRender: String(plan.render_id), planRows, planSummary: plan.summary ?? null,
      impact: { code: String(impact.code), plannedSlice: impactMetadata.planned_slice ?? null, exit: ROSTER.exits.impactRefusal }, pairedDiff,
    };
  },
  B2: async () => {
    const witness: JsonObject = {};
    for (const name of RECEIPTS) witness[name] = await nativeRefusal(name);
    return witness;
  },
  B3: async () => {
    const witness: JsonObject = {};
    for (const name of RECEIPTS) witness[name] = (await verbatimReading(name)).witness;
    return witness;
  },
  B4: async () => {
    const witness: JsonObject = {};
    for (const name of RECEIPTS) witness[name] = adapterRefusal(name);
    return witness;
  },
  B5: async () => {
    const projection = new ObservationProjection();
    const scope: ObservationScope = { workspace: ROOT, principal: "local-operator:tester" };
    const refs: NativeRef[] = [];
    const previews: JsonObject[] = [];
    const payloads: string[] = [];
    for (const [index, name] of PREVIEWS.entries()) {
      const outcome = await nativeOutcome(rebound(ENVELOPES[name], ROOT), ROSTER.exits[name]);
      expect(outcome.refusal).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      const reading = outcome.reading;
      if (reading === null) throw new Error(`${name}: the native reader returned no reading`);
      const topology = reactivefiberTopology(reading, { scope, seam: "rf-cli", capturedAt: `2026-10-23T00:00:0${index}Z`, observedAt: `2026-10-23T00:00:1${index}Z` });
      const snapshot = topology.snapshots[0];
      if (snapshot === undefined) throw new Error(`${name}: no snapshot`);
      expect(projection.refresh(snapshot)).toBe("applied");
      refs.push(snapshot.source);
      payloads.push(snapshot.nativePayloadRef ?? "");
      const surfaced = [snapshot.node.title, snapshot.node.statusText, ...topology.diagnostics, ...(snapshot.evidenceRefs ?? [])];
      const claims = surfaced.flatMap(text => (blockClaim(text) === null ? [] : [text]));
      const changeWords = surfaced.flatMap(text => wordsOf(text).filter(word => CHANGE.has(word)));
      expect(claims).toEqual([]);
      expect(changeWords).toEqual([]);
      previews.push({ name, verb: verbOf(outcome.spawns), coverage: snapshot.coverage ?? null, tone: snapshot.node.statusTone, statusText: snapshot.node.statusText, claims, changeWords });
    }
    const freshness = refs.map(ref => projection.query({ scope, limit: 5, ref }).nodes[0]?.freshness ?? null);
    const payloadRefsDiffer = payloads[0] !== payloads[1] && payloads.every(ref => ref.startsWith("rf-output:sha256:"));
    expect(freshness).toEqual(["current", "current"]);
    expect(payloadRefsDiffer).toBe(true);
    return { previews, freshness, payloadRefsDiffer };
  },
  C1: async () => {
    const facts = Object.fromEntries(DIFFS.map(name => [name, diffFacts(ENVELOPES[name])]));
    for (const name of DIFFS) {
      const fact = objectOf(facts[name], name);
      expect([fact.command, fact.tallyAgrees, fact.changedAgrees, fact.digestsAgree]).toEqual([DIFF_COMMAND, true, true, true]);
    }
    expect(objectOf(facts.diffSourceOnly, "diffSourceOnly").changedBlockCount).toBe(0);
    expect(objectOf(facts.diffContent, "diffContent").changedBlockCount).toBe(1);
    return facts;
  },
  C2: async () => {
    const { witness, source } = await verbatimReading("diffSourceOnly");
    const surfaced = diffFacts(source);
    expect(surfaced).toStrictEqual(diffFacts(readRoster().envelopes.diffSourceOnly));
    expect(surfaced.rows).toEqual(["demo.banner:banner::fixed:unchanged:source_changed=true", "demo.banner:banner::notes:unchanged:source_changed=true"]);
    return { ...witness, rows: surfaced.rows, counts: surfaced.counts, changedBlockCount: surfaced.changedBlockCount };
  },
  C3: async () => {
    const { witness, source } = await verbatimReading("diffContent");
    const surfaced = diffFacts(source);
    expect(surfaced).toStrictEqual(diffFacts(readRoster().envelopes.diffContent));
    expect(surfaced.rows).toEqual(["demo.banner:banner::fixed:unchanged:source_changed=true", "demo.banner:banner::notes:content_changed:source_changed=true"]);
    return { ...witness, rows: surfaced.rows, counts: surfaced.counts, changedBlockCount: surfaced.changedBlockCount };
  },
  C4: async () => {
    const witness: JsonObject = {};
    for (const name of DIFFS) witness[name] = { native: await nativeRefusal(name), adapter: adapterRefusal(name) };
    return witness;
  },
  D1: async () => {
    const files = filesBelow(join(REPO, "docs", "workbench"));
    const units = files.flatMap(file => unitsOf(textOf(file)).map(unit => ({ file: relative(REPO, file), unit })));
    const anchor = join(REPO, "docs", "workbench", "09-observation-and-provenance.md");
    const anchorRead = files.includes(anchor) && textOf(anchor).includes("## Reader adapters");
    const hits = units.flatMap(({ file, unit }) => {
      const found = implication(unit);
      return found === null ? [] : [`${file}: ${found} :: ${unit.slice(0, 160)}`];
    });
    const floors = { files: files.length >= 60, units: units.length >= 6000 };
    expect(floors, `docs/workbench files ${files.length}, sentence units ${units.length}`).toStrictEqual({ files: true, units: true });
    expect(anchorRead).toBe(true);
    expect(hits, "a docs/workbench sentence stating a changed source implies a changed block").toEqual([]);
    return { floors, anchorRead, hits };
  },
  D2: async () => {
    const flagged = Object.fromEntries(Object.entries(D2_FLAGGED).map(([name, text]) => [name, d1Reading(text)]));
    const quiet = Object.fromEntries(Object.entries(D2_QUIET).map(([name, text]) => [name, d1Reading(text)]));
    const residuals = Object.fromEntries(Object.entries(D2_RESIDUALS).map(([name, text]) => [name, d1Reading(text)]));
    const denial = d1Reading(D2_DENIAL);
    expect(Object.values(flagged).every(count => count === 1)).toBe(true);
    expect(Object.values(quiet).every(count => count === 0)).toBe(true);
    expect(Object.values(residuals).every(count => count === 0)).toBe(true);
    expect(denial).toBe(1);
    return { flagged, quiet, residuals, denial };
  },
};

describe("wb-pfxo.2 rf source-change block-claim census (RF-COMPOSITIONAL-ASSEMBLY-R3, posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "C:4", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: "wb-pfxo.2", rfVersion: RF_VERSION, window: WINDOW, vocabulary: { block: BLOCK_WORDS, source: SOURCE_WORDS, change: CHANGE_WORDS }, fixtures: FIXTURES }).toStrictEqual({
      bead: ROSTER.bead, rfVersion: ROSTER.rfVersion, window: ROSTER.window,
      vocabulary: { block: [...ROSTER.vocabulary.block], source: [...ROSTER.vocabulary.source], change: [...ROSTER.vocabulary.change] }, fixtures: [...ROSTER.fixtures],
    });
    // The measured previews name the build the census pins; every fixture names the rewritten scratch root or none.
    expect(PREVIEWS.map(name => String(objectOf(objectOf(ENVELOPES[name].result, name).provenance, `${name} provenance`).cli_version))).toEqual([RF_VERSION, RF_VERSION]);
    expect(FIXTURES.map(name => ENVELOPES[name].workspace?.root ?? null)).toEqual([FIXTURE_ROOT, FIXTURE_ROOT, FIXTURE_ROOT, FIXTURE_ROOT, null, FIXTURE_ROOT, FIXTURE_ROOT]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
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
  });
});
