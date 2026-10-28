/**
 * wb-klr7 (CAC-WORKFLOW-COMPOSITION-R1, program-triage-2026-10-18), the MechanicalWorkflows composition-reference census: a
 * standing until-then pin of an absent trigger, plus an ARMED contract that binds the first composition consumer to come.
 * Statement (the bead title, read from the tracked bead export at run time): "When MechanicalWorkflows ships
 * CACWorkflowCompositionV0 as a consumable artifact (concept only at 01-composition-contracts.md:6@4b8b974ca72b) and a Pi surface
 * (W11 host, catalog/inspect readers, reader adapter) consumes it, Pi shall carry its step and source-artifact IDs as references
 * to existing producer IDs only, never minting a new Beads task, Forge test/gate or Furnace Attempt id; until then no Pi change
 * is owed." The owner filing's Citation paragraph (its own line of the bead's notes) carries the trigger ("Gating artifact:") and
 * the acceptance ("Acceptance shape:", clauses (a)-(c)); row T's label is the trigger sentence and rows A-C are the three
 * clauses, each verbatim without its separator, read back from that line in the judged-set case.
 *
 * MEASURED (read-only, by the cutting seat ws-06 of g10-work-s125, 2026-10-28, at Pi trunk cf56481). Producer: the local
 * MechanicalWorkflows checkout (git show, never written) at the filing pin 4b8b974ca72b and a depth-1 scratch clone of the remote
 * tip f489cee4ce20 (2026-10-27T20:36:35Z, git ls-remote origin HEAD): at both pins 01-composition-contracts.md:6 reads the type
 * "as a concept only" (the tip widens the non-minting list to "Forge operations/gates, Furnace attempts, Git revisions or
 * HyperUnix answers (a non-exhaustive list)"), README.md:3 opens "Design-only as of 2026-10-18 (19ca8d4): the two program
 * documents are the only artifacts", and at the tip no file under packages/, contracts/, schemas/ or apps/ spells the type or a
 * workflow-composition schema (the only other spelling is docs/10-current-state-and-gaps.md:357, a prose mention). The roster's
 * producer block holds those lines; this hermetic census never re-reads the producer. Pi: package.json and both locks
 * (package-lock.json, vendor/dependency-lock.json) name no @mechanical/ package, no src module imports one, no src file spells
 * the program's words (git grep -i -P 'cac[\s_-]*workflow[\s_-]*composition' over src: 0 lines), and no src module builds a
 * bd-/wb-/frn- or cmd_ string from a value at all (the only frn- and bd- literals, src/workbench/hosts/furnace-hosted.ts's
 * preflight context, are fixed strings). The workflow_catalog and workflow_inspect readers the trigger names live in
 * src/index.ts (their registrations) and src/workbench/tool-replies.ts (their reply builders).
 *
 * ROWS (frozen shape ["T:2", "A:3", "B:3", "C:2"]; one test per pin, titled by the pin id under "<row> <label>"):
 *  T, the trigger, not yet met. T1 (the release): no dependency map, bundled list or own name of package.json, and no package
 *    path or declared name of either lock, is an @mechanical/ package (the scope docs/07's MechanicalWorkflows section names for
 *    the shipped development package), and no src module loads one (import, export-from, import-equals, require, import() and
 *    import types, read through the TypeScript parser); each reading is shown on planted manifests, locks and modules. T2 (the
 *    consumer): no src file spells the program's words (the program slug read word by word, any run of whitespace, underscore or
 *    hyphen between its words, case-insensitive, anywhere in the text; a requirement-id spelling is blanked first), the files
 *    that do are exactly the bound consumers MW_COMPOSITION_CONSUMERS (empty today both ways: a module that starts consuming
 *    must be bound, and a bound path that spells nothing is stale), and the two readers the trigger names are found by their
 *    tool names and spell none of it.
 *  A, clause (a), ARMED: the contract a consumer must meet, run today on synthetic bindings and on every bound consumer (none).
 *    A consumer is read as one function from a composition (steps and sources, each row carrying its producer reference
 *    {provider, type, id} or not) to a projection {refs: [{row, ref}], unmapped: {count, rows: [{row, reason}]}}. Two in-memory
 *    fixtures (F1 every row carries a producer id: a Beads task, a Forge operation, a Furnace Attempt and a Forge gate step; F2
 *    rows lacking one: no reference, a reference with no id, a reference with an empty id, beside one complete row). Five
 *    CHECKS judge a projection: foreign (a projected ref that is not its row's producer reference, provider, type, id and scope
 *    compared, or names no fixture row), lost (a row's producer reference projected nowhere: A1 reads "projects only ... equal
 *    to the producer ids" as set equality, since a consumer projecting nothing would meet "only" vacuously), uncounted (a row
 *    lacking a producer id not among the unmapped rows with reason unmapped or unavailable), miscounted (count differs from the
 *    listed rows or from the rows lacking an id) and minted (any ref projected for a row lacking a producer id). A1 pins
 *    foreign and lost, A2 uncounted and miscounted, A3 minted. The honest binding fires none on either fixture; each of eleven
 *    mutants (mint a task, an Attempt or a gate id; mint and still count; rewrite the id; swap the provider; add a scope; drop a
 *    ref; drop the unmapped rows; count without listing; miscount by one) fires at least one check, and every check fires.
 *  B, clause (b): the static census over src. A CONSTRUCTION is a template literal with a substitution, or a + chain holding a
 *    string literal and a value, whose values read a COMPOSITION FIELD, in the filing's words (the title's "step and
 *    source-artifact IDs", clause (b)'s "composition fields"): a step or source-artifact ID - a name (identifier, property name
 *    or string element key) whose words (camelCase, snake_case or kebab-case, lower-cased) are the field word, singular or
 *    plural, then "id" or "ids" (stepId, step_ids, sourceArtifactId), or an id/ids member of a value so named (step.id,
 *    steps[0].id, sourceArtifact.id) - or a name whose first word begins "composition" (composition, compositionId). The bare
 *    words step and steps are not fields: Forge's gate-step vocabulary spells them (measured: forgeGateStepRef builds its
 *    gate-step id from the server's operation id and a step name, src/workbench/forge-operation-observer.ts, a quiet control
 *    below). It is in a FAMILY when (prefix) the literal text accumulated just before one of its values ends
 *    with a token opening with a prefix of clause (b) - "bd-" or "wb-" for a task id (B1), "frn-" for a Furnace Attempt id (B3) -
 *    or (position) it is the id of an object literal whose provider is the family's native provider (beads, forge, furnace), or
 *    the value of a family id key (taskId/workId/issueId; operationId/gateId/gateStepId; attemptId; any case, underscores
 *    ignored) in an object literal or an assignment; a Forge operation or gate id (B2) has no prefix in clause (b), so it is read
 *    by position only. The walk reads every src module git lists (tracked or untracked, never ignored), equal to a filesystem
 *    walk of src with no symlink under it, over SRC_FLOOR modules, then the planted modules through the same call; pinned: the
 *    real modules hold no construction of any family, and each planted form reads as recorded.
 *  C, clause (c): C1 docs/07's MechanicalWorkflows section (its one level-2 heading under the page title, read through the
 *    shared rendered view, HTML-free) holds the holder's sentence as exactly one paragraph, whole and once, carrying the
 *    program status word "design-only" (wb-kku9.2 clause (c)); planted documents with the sentence dropped, doubled or moved to
 *    another section read 0, 2 and 0. C2 the holder, test/workbench-docs07-provider-rules.census.ts (the wb-6hb.11 census leg,
 *    a census-tier file judging the default gate's own report through the shared helper's judge), carries row W1's identity
 *    FROZEN_W1, read from its source through the TypeScript parser: its quote line is the live sentence and its pin lines bind
 *    exactly this file's pins T1-T2 (today), A1 (producer-references-only), A2 (counted-unmapped) and A3, B1-B3 (never-mints) by
 *    file, describe path, verbatim title and the default tier. The holder's own AC case holds its TABLE row to FROZEN_W1 and its
 *    report judge holds every pin to this file's registered, passing, asserting cases.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, constants, residuals, the producer block
 * and every pin's witness are held to the out-of-file roster test/fixtures/mw-composition-ref-roster.json. OUTSIDE ANCHORS (the
 * judged-set case): the owner filing in the tracked export (.beads/issues.jsonl, the bead's Citation line): row T's label is its
 * trigger sentence and rows A-C's labels are its three acceptance clauses, each row's pin quotes tile its label with nothing but
 * separators between them, and every pin is load-bearing, so a pin or a row removed from ROWS, IMPL, the frozen literal and the
 * roster together still reds; the constants the readers use are derived at run time from the same texts (the type and the field
 * words from the title, the program slug from the citation, the prefixes and the field word "composition" from clause (b), the
 * package scope from docs/07's MechanicalWorkflows section, the holder from wb-kku9.2's clause (c)), never retyped; the holder's
 * row W1 and the live docs/07 sentence sit outside this file. Each pin's witness carries its own planted inputs, so a pin
 * rewritten to another's body reds the compare; the records case reads that every registered pin ran to its compare.
 * RESIDUALS (named; each has a pinned quiet row and a live twin among the planted inputs of the pin named):
 *   R-PACKAGE-NAME (T1) a MechanicalWorkflows release outside the @mechanical/ scope is not read (quiet: an unscoped
 *     "mechanical-workflows" dependency; twin: an @mechanical/ dependency).
 *   R-REQUIREMENT-ID (T2) a src file whose only spelling is a requirement id (MW-CAC-WORKFLOW-COMPOSITION-R1) is not a consumer
 *     (quiet: that comment; twin: the type name).
 *   R-UNSPELLED-CONSUMER (T2) a consumer that never spells the program's words or loads an @mechanical/ package (a module mapping
 *     steps and sourceArtifactId fields of some JSON) is not read as one (quiet: that module; twin: the type name).
 *   R-SCOPE (B1) clause (b)'s scope only: a construction in qa/, test/ or examples/ is not judged (quiet: the task plant under
 *     qa/; twin: the same text under src).
 *   R-INDIRECT (B1) a field copied into a binding of another name before the construction is not traced (quiet: `const k =
 *     step.stepId` then `wb-${k}`; twin: the direct template).
 *   R-CALL-FORM (B1) a prefix joined by a call is not read (quiet: "wb-".concat(...) and ["wb", ...].join("-"); twin: the
 *     template).
 *   R-PREFIX-CONSTANT (B1) a prefix held by a named constant is not read (quiet: `${PREFIX}${...}`; twin: the split-literal
 *     concatenation "w" + "b-" + ..., which reads, since literal pieces accumulate up to the value).
 *   R-ID-POSITION (B2) a Forge id built outside the native-reference literal and the id keys is not read (quiet: a template
 *     passed to forgeOperationRef; twin: the same template as a forge native reference's id).
 *   R-FIELD-SPELLING (B3) a composition field spelled outside the field forms is not read, the bare step words included (quiet:
 *     `frn-atm-${node.key}` and `wb-${step}`; twin: `frn-atm-${step.stepId}`).
 * OVER-READS (disclosed; none today: src's one family-position construction from a value is the Forge gate-step id, which reads
 * no field): any name beginning "composition" and any id member of a value named step(s) or sourceArtifact(s) reads as a
 * composition field, and a family prefix inside prose ("see wb-${...}") reads as a construction - each fails closed.
 * NOT CLAIMED: the armed contract is this census's reading of an unpublished type (a consumer whose own cut takes another shape
 * re-measures row A with it); whether W11 (wb-04s) or VC-3 (wb-w12) decided a consumer is read only through src and the
 * manifests; Git revisions and HyperUnix answers (the remote tip's widened list) are not clause (b)'s families; that a producer
 * reference resolves in its producer.
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none (every plant is in memory; the only spawn
 * is git ls-files; the bead export, docs, the locks and src are only read).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { docsSection } from "./helpers/census.js";

interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Residual {
  readonly id: string;
  readonly pin: string;
  readonly quiet: readonly string[];
  readonly twin: readonly string[];
}
interface Constants {
  readonly gatingType: string;
  readonly programSlug: string;
  readonly mwScope: string;
  readonly taskPrefixes: readonly string[];
  readonly attemptPrefixes: readonly string[];
  readonly idFields: readonly string[];
  readonly compositionWord: string;
  readonly holder: string;
  readonly holderRow: string;
  readonly holderFrozen: string;
  readonly docsHeading: string;
}
interface Roster {
  readonly bead: string;
  readonly constants: Constants;
  readonly producer: { readonly mw: Readonly<Record<string, JsonValue>> };
  readonly residuals: readonly Residual[];
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-mw-composition-ref-census.test.ts";
const ROSTER_FILE = "test/fixtures/mw-composition-ref-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-klr7";
/** The sibling bead whose clause (c) names the docs/07 holder this bead's sentence is bound by. */
const CITATION_BEAD = "wb-kku9.2";
const DOCS07 = "docs/workbench/07-native-integrations.md";
const DOCS07_PARENT = "07 — MechanicalWorkflows and ecosystem native SDK integration";
/** The holder's row and its frozen identity literal (seat-chosen names; the holder's own AC case binds them to its TABLE). */
const HOLDER_ROW = "W1";
const HOLDER_FROZEN = "FROZEN_W1";
const TOP = "wb-klr7 MechanicalWorkflows composition-reference census (CAC-WORKFLOW-COMPOSITION-R1)";
/** Floors under the git listing and the locks: an emptied or misdirected reading reds; the judged set is every entry read. */
const SRC_FLOOR = 100;
const LOCK_FLOOR = 100;
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;

const readRepo = (path: string): string => readFileSync(join(REPO, path), "utf8");
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const digest16 = (value: unknown): string => createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex").slice(0, 16);
/** Plant sources spell a template substitution as "@{...}", so no ordinary string literal of this file holds the real syntax. */
const DOLLAR_BRACE = ["$", "{"].join("");
const planted = (text: string): string => text.replaceAll("@{", DOLLAR_BRACE);

const ROWS: readonly Row[] = [
  {
    id: "T",
    label:
      "a MechanicalWorkflows release publishing CACWorkflowCompositionV0 as a versioned schema/type plus a Pi consumer decided under W11/VC-3 or the workflow_catalog/workflow_inspect readers",
    pins: [
      { id: "T1", quote: "a MechanicalWorkflows release publishing CACWorkflowCompositionV0 as a versioned schema/type" },
      { id: "T2", quote: "plus a Pi consumer decided under W11/VC-3 or the workflow_catalog/workflow_inspect readers" },
    ],
  },
  {
    id: "A",
    label:
      "(a) hermetic vitest that a fixture composition carrying step/source refs projects only nativeRef identities equal to the producer ids in the fixture, and that a row lacking a producer id yields a counted unmapped/unavailable entry, never a minted id",
    pins: [
      { id: "A1", quote: "hermetic vitest that a fixture composition carrying step/source refs projects only nativeRef identities equal to the producer ids in the fixture" },
      { id: "A2", quote: "and that a row lacking a producer id yields a counted unmapped/unavailable entry" },
      { id: "A3", quote: "never a minted id" },
    ],
  },
  {
    id: "B",
    label: "(b) static census over src that no module constructs a bd/wb- task id, a Forge operation or gate id, or a Furnace frn- Attempt id from composition fields",
    pins: [
      { id: "B1", quote: "static census over src that no module constructs a bd/wb- task id" },
      { id: "B2", quote: "a Forge operation or gate id" },
      { id: "B3", quote: "or a Furnace frn- Attempt id from composition fields" },
    ],
  },
  {
    id: "C",
    label: "(c) docs/workbench/07 § MechanicalWorkflows gains one falsifiable sentence bound by the docs/07 census (wb-6hb.11 shape)",
    pins: [
      { id: "C1", quote: "docs/workbench/07 § MechanicalWorkflows gains one falsifiable sentence" },
      { id: "C2", quote: "bound by the docs/07 census (wb-6hb.11 shape)" },
    ],
  },
];

// ------------------------------------------------------------------------------------------------- the owner filing
interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The tracked export, read once (about 27 MB): every bead row this census reads comes from the same bytes. */
let EXPORT_LINES: string[] | undefined;
function beadRow(bead: string): BeadRow {
  EXPORT_LINES ??= readRepo(BEAD_EXPORT).split("\n");
  for (const line of EXPORT_LINES) {
    if (!line.includes(`"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (!isRecord(value) || value.id !== bead) continue;
    return { title: typeof value.title === "string" ? value.title : "", notes: typeof value.notes === "string" ? value.notes : "" };
  }
  throw new Error(`the bead export holds no ${bead} row`);
}
/** The filing's Citation paragraph: its own line of the notes (a later note is appended on a line of its own and binds nothing). */
const citationOf = (notes: string): string => notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
const gatingOf = (citation: string): string => /Gating artifact: (.+?)\. Acceptance shape: /.exec(citation)?.[1] ?? "";
const clausesOf = (citation: string): string[] => (/Acceptance shape: (\(a\) .+?)\. P2: /.exec(citation)?.[1] ?? "").split(/; (?=\([a-z]\) )/);
const OWN = beadRow(BEAD);
const CITATION = citationOf(OWN.notes);
const CLAUSES = clausesOf(CITATION);
const CLAUSE_B = CLAUSES[1] ?? "";

/** Each constant the readers use, derived from the texts it names (never retyped); the roster holds the expected values. */
function deriveConstants(): Constants {
  const gatingType = /When MechanicalWorkflows ships (\S+) as a consumable artifact/.exec(OWN.title)?.[1] ?? "";
  const programSlug = /docs\/programs\/([a-z]+(?:-[a-z]+)*)-\d{4}-\d{2}-\d{2}\//.exec(CITATION)?.[1] ?? "";
  const prefixes = (pattern: RegExp): string[] =>
    (pattern.exec(CLAUSE_B)?.[1] ?? "")
      .split("/")
      .filter(part => part !== "")
      .map(part => (part.endsWith("-") ? part : `${part}-`));
  const ownWords = (/carry its (.+?) IDs as references/.exec(OWN.title)?.[1] ?? "").split(" and ").filter(word => word !== "");
  const clauseWord = /from (\S+) fields$/.exec(CLAUSE_B)?.[1];
  const mwSection = docsSection(readRepo(DOCS07), mwHeadingOf(readRepo(DOCS07)), 2, [DOCS07_PARENT]);
  const sectionText = mwSection.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
  const mwScope = /(@[a-z]+\/)workflows-development/.exec(sectionText)?.[1] ?? "";
  const kku = beadRow(CITATION_BEAD).notes;
  const holder = /\(c\) if docs\/workbench\/07 § MechanicalWorkflows gains the wb-klr7 acceptance \(c\) sentence, it carries the status verbatim and is bound by (\S+\.ts)\./.exec(kku)?.[1] ?? "";
  return {
    gatingType,
    programSlug,
    mwScope,
    taskPrefixes: prefixes(/constructs a (\S+) task id/),
    attemptPrefixes: prefixes(/a Furnace (\S+) Attempt id/),
    idFields: ownWords,
    compositionWord: clauseWord ?? "",
    holder,
    holderRow: HOLDER_ROW,
    holderFrozen: HOLDER_FROZEN,
    docsHeading: mwHeadingOf(readRepo(DOCS07)),
  };
}
/** docs/07's one level-2 heading naming MechanicalWorkflows ("" when there is not exactly one). */
function mwHeadingOf(markdown: string): string {
  const headings = [...markdown.matchAll(/^## (.*MechanicalWorkflows.*)$/gm)].map(match => match[1] ?? "");
  return headings.length === 1 ? (headings[0] ?? "") : "";
}
const CONSTANTS = deriveConstants();

// ------------------------------------------------------------------------------------------------- pin membership
/** Each place a quote sits in a label at word boundaries: it starts a word and ends one (a trailing comma or semicolon aside). */
function quoteStarts(body: string, quote: string): number[] {
  const starts: number[] = [];
  if (quote.length === 0) return starts;
  for (let at = body.indexOf(quote); at >= 0; at = body.indexOf(quote, at + 1)) {
    const end = at + quote.length;
    if ((at === 0 || /\s/.test(body.charAt(at - 1))) && /^[,;.]?(?:\s|$)/.test(body.slice(end, end + 2))) starts.push(at);
  }
  return starts;
}
/** A label read against its row's pin quotes: the words no quote covers, and every quote not sitting in it exactly once. */
function unquoted(label: string, quotes: readonly string[]): { runs: string[]; misplaced: string[] } {
  const body = label.replace(/^\([a-z]\) /, "");
  const words = [...body.matchAll(/\S+/g)].map(match => ({ start: match.index, end: match.index + match[0].length }));
  const quoted = words.map(() => false);
  const misplaced: string[] = [];
  for (const quote of quotes) {
    const starts = quoteStarts(body, quote);
    const start = starts[0];
    if (starts.length !== 1 || start === undefined) {
      misplaced.push(quote);
      continue;
    }
    for (const [index, word] of words.entries()) if (word.start < start + quote.length && word.end > start) quoted[index] = true;
  }
  const runs: string[] = [];
  let open: number | undefined;
  for (const [index, word] of words.entries()) {
    if (!quoted[index]) open ??= word.start;
    else if (open !== undefined) {
      runs.push(body.slice(open, words[index - 1]?.end));
      open = undefined;
    }
  }
  if (open !== undefined) runs.push(body.slice(open, words.at(-1)?.end));
  return { runs, misplaced };
}

// ------------------------------------------------------------------------------------------------- the src listing
const inSrc = (path: string): boolean => path.startsWith("src/");
/** What git would commit below src: tracked or untracked, never ignored. */
function gitSrc(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inSrc))].sort(byName);
}
function walkSrc(): { files: string[]; links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit("src");
  return { files: files.sort(byName), links: links.sort(byName) };
}
interface Module {
  readonly path: string;
  readonly text: string;
}
const srcFiles = (): Module[] => gitSrc().map(path => ({ path, text: readRepo(path) }));
const isModule = (path: string): boolean => /\.(?:[cm]?ts|tsx)$/.test(path);
const PARSED = new Map<string, ts.SourceFile>();
/** One parse per module text: every reader of this census walks the same source files. */
const parse = (module: Module): ts.SourceFile => {
  const key = `${module.path}\0${module.text}`;
  const cached = PARSED.get(key);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(module.path, module.text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  PARSED.set(key, source);
  return source;
};

// ------------------------------------------------------------------------------------------------- T1: the release
const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies", "bundleDependencies", "bundledDependencies"] as const;
/** A manifest's or lock entry's own name, each dependency map's keys and each bundled list's items. */
function declaredNames(entry: unknown): string[] {
  if (!isRecord(entry)) return [];
  const names: string[] = typeof entry.name === "string" ? [entry.name] : [];
  for (const map of DEPENDENCY_MAPS) {
    const value = entry[map];
    if (Array.isArray(value)) names.push(...value.filter((item): item is string => typeof item === "string"));
    else if (isRecord(value)) names.push(...Object.keys(value));
  }
  return names;
}
/** A lock's own names, its package paths (the v2/v3 packages keys) and every name each entry declares. */
function lockNames(lock: unknown): { names: string[]; packages: number } {
  if (!isRecord(lock)) return { names: [], packages: 0 };
  const names = declaredNames(lock);
  const packages = isRecord(lock.packages) ? Object.entries(lock.packages) : [];
  for (const [path, entry] of packages) names.push(path, ...declaredNames(entry));
  return { names, packages: packages.length };
}
const isMwName = (name: string): boolean => CONSTANTS.mwScope !== "" && (name.startsWith(CONSTANTS.mwScope) || name.includes(`node_modules/${CONSTANTS.mwScope}`));
/** Every module specifier a module loads: import, export-from, import-equals, require(), import() and import types. */
function specifiersOf(module: Module): string[] {
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) out.push(node.moduleSpecifier.text);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) out.push(node.moduleReference.expression.text);
    else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) out.push(first.text);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) out.push(node.argument.literal.text);
    ts.forEachChild(node, visit);
  };
  visit(parse(module));
  return out;
}
/** Every module specifier of every module, as "<path> <specifier>", in module order. */
const importSites = (modules: readonly Module[]): string[] => modules.filter(module => isModule(module.path)).flatMap(module => specifiersOf(module).map(spec => `${module.path} ${spec}`));
const specOf = (site: string): string => site.slice(site.indexOf(" ") + 1);
const MANIFEST_PLANTS: Readonly<Record<string, unknown>> = {
  "manifest-dependency": { name: "planted", dependencies: { "@mechanical/workflows-composition": "^0.1.0" } },
  "manifest-dev": { name: "planted", devDependencies: { "@mechanical/workflows-development": "0.1.0" } },
  "manifest-bundled": { name: "planted", bundleDependencies: ["@mechanical/workflows-coordination"] },
  "unscoped-name": { name: "planted", dependencies: { "mechanical-workflows": "^0.1.0" } },
  "near-scope": { name: "planted", dependencies: { "@mechanicalx/workflows": "1.0.0" } },
};
const LOCK_PLANTS: Readonly<Record<string, unknown>> = {
  "lock-path": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/@mechanical/workflows-composition": { version: "0.1.0" } } },
  "lock-nested": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/a/node_modules/@mechanical/workflows-coordination": { version: "0.1.0" } } },
  "lock-declared": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/a": { dependencies: { "@mechanical/workflows-development": "0.1.0" } } } },
};
const IMPORT_PLANTS: Readonly<Record<string, string>> = {
  "import-static": 'import { develop } from "@mechanical/workflows-development";\nexport const run = develop;\n',
  "import-type": 'import type { Composition } from "@mechanical/workflows-composition";\nexport type Read = Composition;\n',
  "export-from": 'export * from "@mechanical/workflows-coordination";\n',
  "dynamic-import": 'export const load = async (): Promise<unknown> => import("@mechanical/workflows-composition");\n',
  require: 'declare const require: (id: string) => unknown;\nexport const mw = require("@mechanical/workflows-composition");\n',
  "import-equals": 'import mw = require("@mechanical/workflows-composition");\nexport const read = mw;\n',
  "import-type-node": 'export type Read = import("@mechanical/workflows-composition").Composition;\n',
  "import-other": 'import { readFileSync } from "node:fs";\nexport const read = readFileSync;\n',
};
const plantPath = (id: string): string => `src/workbench/planted-${id}.ts`;

// ------------------------------------------------------------------------------------------------- T2: the consumer
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The program's words in order, any run of whitespace, underscore or hyphen (or none) between them, case-insensitive. */
const SPELLING = new RegExp(CONSTANTS.programSlug.split("-").map(escaped).join("[\\s_-]*"), "i");
/** A requirement id of the program's family (this bead's and its 2026-10-22 siblings'), blanked before the reading. */
const REQUIREMENT_ID = /\b(?:MW-)?CAC-WORKFLOW-COMPOSITION-R\d+\b/g;
const spells = (text: string): boolean => CONSTANTS.programSlug !== "" && SPELLING.test(text.replace(REQUIREMENT_ID, " "));
/**
 * The bound composition consumers: every src file that spells the program's words, each with the function the armed contract
 * runs. Empty today. A module that starts consuming binds itself here, so row A runs on it.
 */
const MW_COMPOSITION_CONSUMERS: readonly { readonly module: string; readonly consumer: Consumer }[] = [];
const SPELLING_PLANTS: Readonly<Record<string, string>> = {
  "type-name": "// Reads CACWorkflowCompositionV0 records.\nexport const reader = 1;\n",
  "program-slug": 'export const PROGRAM = "cac-workflow-composition-2026-10-18";\n',
  "snake-case": "export const cac_workflow_composition = 1;\n",
  embedded: "export function parseCacWorkflowComposition(): void {}\n",
  "requirement-id": "// MW-CAC-WORKFLOW-COMPOSITION-R1: a cited requirement, not a reader.\nexport const cited = 1;\n",
  "unspelled-consumer": "export const ids = (c: { steps: { sourceArtifactId: string }[] }): string[] => c.steps.map(step => step.sourceArtifactId);\n",
};
/** The readers the trigger names, found by their tool names among the src string literals. */
const TRIGGER_READERS = ["workflow_catalog", "workflow_inspect"] as const;
function literalSites(modules: readonly Module[], literal: string): string[] {
  return modules
    .filter(module => isModule(module.path))
    .filter(module => {
      let found = false;
      const visit = (node: ts.Node): void => {
        if (ts.isStringLiteralLike(node) && node.text === literal) found = true;
        if (!found) ts.forEachChild(node, visit);
      };
      visit(parse(module));
      return found;
    })
    .map(module => module.path);
}

// ------------------------------------------------------------------------------------------------- A: the armed contract
/** A producer reference as this census reads the concept: the producer's own native key (docs/workbench/09, provider, type, id). */
interface ProducerRef {
  readonly provider: string;
  readonly type: string;
  readonly id?: string;
  readonly scope?: string;
}
interface Entry {
  readonly key: string;
  readonly producer?: ProducerRef;
}
interface Composition {
  readonly steps: readonly Entry[];
  readonly sources: readonly Entry[];
}
interface Projection {
  readonly refs: readonly { readonly row: string; readonly ref: NativeRef }[];
  readonly unmapped: { readonly count: number; readonly rows: readonly { readonly row: string; readonly reason: string }[] };
}
type Consumer = (composition: Composition) => Projection;
type Check = "foreign" | "lost" | "uncounted" | "miscounted" | "minted";
const PIN_CHECKS: Readonly<Record<string, readonly Check[]>> = { A1: ["foreign", "lost"], A2: ["uncounted", "miscounted"], A3: ["minted"] };
const FIXTURES: Readonly<Record<string, Composition>> = {
  F1: {
    steps: [
      { key: "build", producer: { provider: "beads", type: "work", id: "wb-fx01" } },
      { key: "verify", producer: { provider: "forge", type: "operation", id: "op-fx-0001" } },
      { key: "supervise", producer: { provider: "furnace", type: "attempt", id: "frn-atm-fx-0001-1" } },
    ],
    sources: [{ key: "gate", producer: { provider: "forge", type: "gate-step", id: "op-fx-0001/lint" } }],
  },
  F2: {
    steps: [{ key: "plan" }, { key: "build", producer: { provider: "beads", type: "work", id: "wb-fx02" } }],
    sources: [
      { key: "context", producer: { provider: "reactivefiber", type: "render" } },
      { key: "lint", producer: { provider: "forge", type: "gate-step", id: "" } },
    ],
  },
};
const rowsOf = (composition: Composition): { row: string; producer?: ProducerRef }[] => [
  ...composition.steps.map(entry => ({ row: `step:${entry.key}`, producer: entry.producer })),
  ...composition.sources.map(entry => ({ row: `source:${entry.key}`, producer: entry.producer })),
];
const hasId = (producer: ProducerRef | undefined): producer is ProducerRef & { readonly id: string } => producer !== undefined && typeof producer.id === "string" && producer.id !== "";
const sameRef = (ref: NativeRef, producer: ProducerRef): boolean => ref.provider === producer.provider && ref.type === producer.type && ref.id === producer.id && ref.scope === producer.scope;
/** The five checks over one projection of one fixture, in check order. */
function judgeProjection(composition: Composition, projection: Projection): Check[] {
  const rows = rowsOf(composition);
  const lacking = new Set(rows.filter(entry => !hasId(entry.producer)).map(entry => entry.row));
  const fired = new Set<Check>();
  for (const { row, ref } of projection.refs) {
    const own = rows.find(entry => entry.row === row);
    if (lacking.has(row)) fired.add("minted");
    else if (own?.producer === undefined || !sameRef(ref, own.producer)) fired.add("foreign");
  }
  for (const entry of rows) {
    const producer = entry.producer;
    if (hasId(producer) && !projection.refs.some(item => item.row === entry.row && sameRef(item.ref, producer))) fired.add("lost");
  }
  const counted = new Set(projection.unmapped.rows.filter(item => item.reason === "unmapped" || item.reason === "unavailable").map(item => item.row));
  if ([...lacking].some(row => !counted.has(row))) fired.add("uncounted");
  if (projection.unmapped.count !== projection.unmapped.rows.length || projection.unmapped.count !== lacking.size) fired.add("miscounted");
  return (["foreign", "lost", "uncounted", "miscounted", "minted"] as const).filter(check => fired.has(check));
}
/** The honest binding: every producer reference verbatim, every row lacking an id counted with its reason. */
const honest: Consumer = composition => {
  const refs: { row: string; ref: NativeRef }[] = [];
  const rows: { row: string; reason: string }[] = [];
  for (const entry of rowsOf(composition)) {
    const producer = entry.producer;
    if (producer === undefined) rows.push({ row: entry.row, reason: "unmapped" });
    else if (!hasId(producer)) rows.push({ row: entry.row, reason: "unavailable" });
    else refs.push({ row: entry.row, ref: { provider: producer.provider, type: producer.type, id: producer.id, ...(producer.scope === undefined ? {} : { scope: producer.scope }) } });
  }
  return { refs, unmapped: { count: rows.length, rows } };
};
const keyOf = (row: string): string => row.slice(row.indexOf(":") + 1);
/** A binding that mints a reference for every row lacking an id (still counting it when `count` is set). */
const minting =
  (provider: string, type: string, mint: (key: string) => string, count = false): Consumer =>
  composition => {
    const base = honest(composition);
    const minted = base.unmapped.rows.map(item => ({ row: item.row, ref: { provider, type, id: mint(keyOf(item.row)) } }));
    return { refs: [...base.refs, ...minted], unmapped: count ? base.unmapped : { count: 0, rows: [] } };
  };
const mapRefs =
  (change: (ref: NativeRef) => NativeRef): Consumer =>
  composition => {
    const base = honest(composition);
    return { refs: base.refs.map(item => ({ row: item.row, ref: change(item.ref) })), unmapped: base.unmapped };
  };
const MUTANTS: Readonly<Record<string, Consumer>> = {
  "mint-task": minting("beads", "work", key => `wb-${key}`),
  "mint-attempt": minting("furnace", "attempt", key => `frn-atm-${key}-1`),
  "mint-gate": minting("forge", "gate-step", key => `op-${key}/gate`),
  "mint-and-count": minting("beads", "work", key => `wb-${key}`, true),
  "rewrite-id": mapRefs(ref => ({ ...ref, id: ref.id.toUpperCase() })),
  "swap-provider": mapRefs(ref => ({ ...ref, provider: "pi-workflow" })),
  "add-scope": mapRefs(ref => ({ ...ref, scope: "composition" })),
  "drop-ref": composition => {
    const base = honest(composition);
    return { refs: base.refs.slice(1), unmapped: base.unmapped };
  },
  "drop-unmapped": composition => ({ refs: honest(composition).refs, unmapped: { count: 0, rows: [] } }),
  "count-only": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count, rows: [] } };
  },
  "miscount": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count + 1, rows: base.unmapped.rows } };
  },
};
/** One pin's reading of the armed contract: every binding on every fixture, restricted to the pin's checks. */
function contractReading(pin: string): JsonValue {
  const checks = PIN_CHECKS[pin] ?? [];
  const restricted = (consumer: Consumer): Record<string, string[]> =>
    Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, judgeProjection(composition, consumer(composition)).filter(check => checks.includes(check))]));
  for (const [id, composition] of Object.entries(FIXTURES)) expect(judgeProjection(composition, honest(composition)), `the honest binding on ${id}`).toEqual([]);
  for (const [name, consumer] of Object.entries(MUTANTS)) {
    const all = Object.entries(FIXTURES).flatMap(([, composition]) => judgeProjection(composition, consumer(composition)));
    expect(all.length, `mutant ${name} fires at least one check`).toBeGreaterThan(0);
  }
  const mutants = Object.fromEntries(Object.entries(MUTANTS).map(([name, consumer]) => [name, restricted(consumer)]));
  const fires = Object.fromEntries(checks.map(check => [check, Object.values(mutants).some(byFixture => Object.values(byFixture).some(list => list.includes(check)))]));
  for (const check of checks) expect(fires[check], `${pin}: check ${check} fires on some mutant`).toBe(true);
  const bound = Object.fromEntries(MW_COMPOSITION_CONSUMERS.map(({ module, consumer }) => [module, Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, judgeProjection(composition, consumer(composition))]))]));
  for (const [module, byFixture] of Object.entries(bound)) for (const [id, list] of Object.entries(byFixture)) expect(list, `bound consumer ${module} on ${id}`).toEqual([]);
  return { checks: [...checks], fixtures: digest16(FIXTURES), honest: restricted(honest), mutants, fires, bound };
}

// ------------------------------------------------------------------------------------------------- B: constructions
type Family = "task" | "forge" | "attempt";
const PROVIDER_FAMILY: Readonly<Record<string, Family>> = { beads: "task", forge: "forge", furnace: "attempt" };
/** The family id keys, normalized (lower case, underscores and hyphens removed). */
const ID_KEYS: Readonly<Record<Family, readonly string[]>> = {
  task: ["taskid", "workid", "beadsworkid", "issueid"],
  forge: ["operationid", "gateid", "gatestepid"],
  attempt: ["attemptid", "furnaceattemptid"],
};
const normalizedKey = (name: string): string => name.toLowerCase().replace(/[_-]/g, "");
const familyOfKey = (name: string): Family | undefined => (Object.keys(ID_KEYS) as Family[]).find(family => ID_KEYS[family].includes(normalizedKey(name)));
/** A name's words: camelCase, snake_case and kebab-case split, lower-cased. */
const wordsOf = (name: string): string[] =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(word => word !== "")
    .map(word => word.toLowerCase());
const ID_FIELDS = CONSTANTS.idFields.map(word => word.split("-"));
const ID_WORDS: readonly string[] = ["id", "ids"];
/** A field word, singular or plural. */
const sameWord = (word: string | undefined, part: string): boolean => word === part || word === `${part}s`;
/** A step or source-artifact ID name (the field word, then id or ids), or a name whose first word begins with the composition word. */
const isFieldName = (name: string): boolean => {
  const words = wordsOf(name);
  if (CONSTANTS.compositionWord !== "" && (words[0] ?? "").startsWith(CONSTANTS.compositionWord)) return true;
  return ID_FIELDS.some(parts => parts.every((part, index) => sameWord(words[index], part)) && ID_WORDS.includes(words[parts.length] ?? ""));
};
/** A value named for a step or a source artifact, singular or plural, exactly (its id member is a step or source-artifact ID). */
const isFieldHolder = (name: string): boolean => {
  const words = wordsOf(name);
  return ID_FIELDS.some(parts => words.length === parts.length && parts.every((part, index) => sameWord(words[index], part)));
};
const holderNameOf = (node: ts.Expression): string | undefined => {
  const inner = unwrap(node);
  if (ts.isIdentifier(inner)) return inner.text;
  if (ts.isPropertyAccessExpression(inner)) return inner.name.text;
  if (ts.isElementAccessExpression(inner)) return holderNameOf(inner.expression);
  return undefined;
};
/** An id member read off a step or source-artifact value (step.id, steps[0].id, sourceArtifact["id"]), as "<holder>.<id>". */
function memberField(node: ts.Node): string | undefined {
  let holder: string | undefined;
  let member: string | undefined;
  if (ts.isPropertyAccessExpression(node)) [holder, member] = [holderNameOf(node.expression), node.name.text];
  else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) [holder, member] = [holderNameOf(node.expression), node.argumentExpression.text];
  return holder !== undefined && member !== undefined && ID_WORDS.includes(member) && isFieldHolder(holder) ? `${holder}.${member}` : undefined;
}
const prefixPattern = (prefixes: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9])(?:${prefixes.map(escaped).join("|")})[A-Za-z0-9._-]*$`);
const TASK_PREFIX = prefixPattern(CONSTANTS.taskPrefixes);
const ATTEMPT_PREFIX = prefixPattern(CONSTANTS.attemptPrefixes);
const unwrap = (node: ts.Expression): ts.Expression => {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
};
const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
type Piece = { readonly text: string } | { readonly value: ts.Expression };
/** A string-building expression as its literal and value pieces, in order; undefined when it builds no string from a value. */
function piecesOf(node: ts.Expression): Piece[] | undefined {
  const inner = unwrap(node);
  if (ts.isTemplateExpression(inner)) {
    const out: Piece[] = [{ text: inner.head.text }];
    for (const span of inner.templateSpans) out.push({ value: span.expression }, { text: span.literal.text });
    return out;
  }
  if (!isPlus(inner)) return undefined;
  const flat: ts.Expression[] = [];
  const flatten = (expression: ts.Expression): void => {
    const current = unwrap(expression);
    if (isPlus(current)) {
      flatten(current.left);
      flatten(current.right);
    } else flat.push(current);
  };
  flatten(inner);
  if (!flat.some(part => ts.isStringLiteralLike(part) || ts.isTemplateExpression(part))) return undefined;
  const out: Piece[] = [];
  for (const part of flat) {
    if (ts.isStringLiteralLike(part)) out.push({ text: part.text });
    else if (ts.isTemplateExpression(part)) out.push(...(piecesOf(part) ?? []));
    else out.push({ value: part });
  }
  return out.some(piece => "value" in piece) ? out : undefined;
}
/** Every composition field a construction's values read: identifiers, property names and string element keys. */
function fieldsOf(pieces: readonly Piece[]): string[] {
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && isFieldName(node.text)) names.add(node.text);
    else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && isFieldName(node.argumentExpression.text)) names.add(node.argumentExpression.text);
    const member = memberField(node);
    if (member !== undefined) names.add(member);
    ts.forEachChild(node, visit);
  };
  for (const piece of pieces) if ("value" in piece) visit(piece.value);
  return [...names].sort(byName);
}
/** The prefix families a construction opens: the literal text accumulated just before each of its values. */
function prefixFamilies(pieces: readonly Piece[]): Family[] {
  const families = new Set<Family>();
  let run = "";
  for (const piece of pieces) {
    if ("text" in piece) run += piece.text;
    else {
      if (TASK_PREFIX.test(run)) families.add("task");
      if (ATTEMPT_PREFIX.test(run)) families.add("attempt");
      run = "";
    }
  }
  return [...families];
}
const propertyName = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteralLike(name) ? name.text : undefined);
interface Construction {
  readonly site: string;
  readonly family: Family;
  readonly forms: readonly string[];
  readonly fields: readonly string[];
}
/** Every family construction of one module that reads a composition field, one entry per (expression, family). */
function constructionsOf(module: Module): Construction[] {
  const source = parse(module);
  const found = new Map<string, { node: ts.Expression; family: Family; forms: Set<string>; fields: string[] }>();
  const note = (node: ts.Expression, family: Family, form: string): void => {
    const pieces = piecesOf(node);
    if (pieces === undefined) return;
    const fields = fieldsOf(pieces);
    if (fields.length === 0) return;
    const key = `${node.getStart(source)}:${family}`;
    const entry = found.get(key) ?? { node, family, forms: new Set<string>(), fields };
    entry.forms.add(form);
    found.set(key, entry);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isTemplateExpression(node) || (isPlus(node) && !isPlus(node.parent) && !ts.isParenthesizedExpression(node.parent))) {
      const pieces = piecesOf(node as ts.Expression);
      if (pieces !== undefined) for (const family of prefixFamilies(pieces)) note(node as ts.Expression, family, "prefix");
    }
    if (ts.isObjectLiteralExpression(node)) {
      const assigned = new Map<string, ts.Expression>();
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = propertyName(property.name);
        if (name !== undefined) assigned.set(name, property.initializer);
      }
      const provider = assigned.get("provider");
      const id = assigned.get("id");
      const providerText = provider !== undefined && ts.isStringLiteralLike(unwrap(provider)) ? (unwrap(provider) as ts.StringLiteralLike).text : undefined;
      const family = providerText === undefined ? undefined : PROVIDER_FAMILY[providerText];
      if (family !== undefined && id !== undefined) note(unwrap(id), family, "native-ref");
      for (const [name, value] of assigned) {
        const keyed = familyOfKey(name);
        if (keyed !== undefined) note(unwrap(value), keyed, "id-key");
      }
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const target = unwrap(node.left);
      const name = ts.isPropertyAccessExpression(target) ? target.name.text : ts.isIdentifier(target) ? target.text : undefined;
      const keyed = name === undefined ? undefined : familyOfKey(name);
      if (keyed !== undefined) note(unwrap(node.right), keyed, "id-key");
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...found.values()]
    .map(entry => ({
      site: `${module.path}:${source.getLineAndCharacterOfPosition(entry.node.getStart(source)).line + 1}`,
      family: entry.family,
      forms: [...entry.forms].sort(byName),
      fields: entry.fields,
    }))
    .sort((a, b) => byName(`${a.site} ${a.family}`, `${b.site} ${b.family}`));
}
/** Clause (b)'s scope: src modules only; any other path is not judged (R-SCOPE). */
const judgeConstructions = (modules: readonly Module[]): Construction[] => modules.filter(module => inSrc(module.path) && isModule(module.path)).flatMap(constructionsOf);
const TASK_PLANTS: Readonly<Record<string, Module>> = {
  "task-template": { path: plantPath("task-template"), text: planted("export const taskOf = (step: { stepId: string }): string => `wb-@{step.stepId}`;\n") },
  "task-bd-template": { path: plantPath("task-bd-template"), text: planted("export const taskOf = (step: { stepId: string }): string => `bd-work-@{step.stepId}`;\n") },
  "task-concat": { path: plantPath("task-concat"), text: 'export const taskOf = (composition: { steps: { stepId: string }[] }): string => "bd-" + composition.steps[0]?.stepId;\n' },
  "task-split-literal": { path: plantPath("task-split-literal"), text: 'export const taskOf = (step: { stepId: string }): string => "w" + "b-" + step.stepId;\n' },
  "task-native-ref": { path: plantPath("task-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "beads", type: "work", id: `@{step.stepId}-task` });\n') },
  "task-id-key": { path: plantPath("task-id-key"), text: planted("export const rowOf = (sourceArtifactId: string) => ({ taskId: `T@{sourceArtifactId}` });\n") },
  "task-member-id": { path: plantPath("task-member-id"), text: planted("export const taskOf = (step: { id: string }): string => `wb-@{step.id}`;\n") },
  "task-copy": { path: plantPath("task-copy"), text: 'export const refOf = (step: { ref: { id: string } }) => ({ provider: "beads", type: "work", id: step.ref.id });\n' },
  "task-no-field": { path: plantPath("task-no-field"), text: planted("export const taskOf = (issue: { id: string }): string => `wb-@{issue.id}`;\n") },
  "qa-module": { path: "qa/workbench/planted-task.mjs", text: planted("export const taskOf = (step) => `wb-@{step.stepId}`;\n") },
  "indirect-binding": { path: plantPath("indirect-binding"), text: planted("export const taskOf = (step: { stepId: string }): string => {\n  const k = step.stepId;\n  return `wb-@{k}`;\n};\n") },
  "concat-call": { path: plantPath("concat-call"), text: 'export const taskOf = (step: { stepId: string }): string => "wb-".concat(step.stepId);\n' },
  "join-call": { path: plantPath("join-call"), text: 'export const taskOf = (step: { stepId: string }): string => ["wb", step.stepId].join("-");\n' },
  "prefix-constant": { path: plantPath("prefix-constant"), text: planted('const PREFIX = "wb-";\nexport const taskOf = (step: { stepId: string }): string => `@{PREFIX}@{step.stepId}`;\n') },
};
const FORGE_PLANTS: Readonly<Record<string, Module>> = {
  "forge-native-ref": { path: plantPath("forge-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "forge", type: "operation", id: `op-@{step.stepId}` });\n') },
  "forge-gate-ref": { path: plantPath("forge-gate-ref"), text: 'export const refOf = (composition: { compositionId: string }) => ({ provider: "forge", type: "gate-step", id: composition.compositionId + ":lint" });\n' },
  "forge-id-key": { path: plantPath("forge-id-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ operationId: `@{step.stepId}/run` });\n") },
  "forge-gate-key": { path: plantPath("forge-gate-key"), text: 'export const rowOf = (sourceArtifact: { id: string }) => ({ gate_id: "gate:" + sourceArtifact.id });\n' },
  "forge-assignment": { path: plantPath("forge-assignment"), text: planted("export function setOf(target: { operationId?: string }, step: { stepId: string }): void {\n  target.operationId = `op-@{step.stepId}`;\n}\n") },
  "forge-gate-step-name": {
    path: plantPath("forge-gate-step-name"),
    text: planted('export const stepRefOf = (operationId: string, step: string) => ({ provider: "forge", type: "gate-step", id: `@{operationId}/@{step}` });\n'),
  },
  "forge-copy": { path: plantPath("forge-copy"), text: 'export const refOf = (step: { ref: { id: string } }) => ({ provider: "forge", type: "operation", id: step.ref.id });\n' },
  "builder-argument": {
    path: plantPath("builder-argument"),
    text: planted('import { forgeOperationRef } from "../forge-operation-observer.js";\nexport const refOf = (step: { stepId: string }) => forgeOperationRef(`op-@{step.stepId}`);\n'),
  },
};
const ATTEMPT_PLANTS: Readonly<Record<string, Module>> = {
  "attempt-template": { path: plantPath("attempt-template"), text: planted("export const attemptOf = (step: { stepId: string }): string => `frn-atm-@{step.stepId}`;\n") },
  "attempt-concat": { path: plantPath("attempt-concat"), text: 'export const attemptOf = (sourceArtifact: { id: string }): string => "frn-" + sourceArtifact.id;\n' },
  "attempt-native-ref": { path: plantPath("attempt-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "furnace", type: "attempt", id: `@{step.stepId}-1` });\n') },
  "attempt-id-key": { path: plantPath("attempt-id-key"), text: planted("export const rowOf = (composition: { id: string }) => ({ attempt_id: `a-@{composition.id}` });\n") },
  "attempt-element-id": { path: plantPath("attempt-element-id"), text: planted("export const attemptOf = (steps: { id: string }[]): string => `frn-atm-@{steps[0]?.id}`;\n") },
  "attempt-no-field": { path: plantPath("attempt-no-field"), text: planted("export const attemptOf = (run: { id: string }): string => `frn-atm-@{run.id}`;\n") },
  "attempt-literal": { path: plantPath("attempt-literal"), text: 'export const ATTEMPT = "frn-atm-preflight";\n' },
  "other-field-name": { path: plantPath("other-field-name"), text: planted("export const attemptOf = (node: { key: string }): string => `frn-atm-@{node.key}`;\n") },
  "bare-step-name": { path: plantPath("bare-step-name"), text: planted("export const taskOf = (step: string): string => `frn-@{step}`;\n") },
};
/** One B pin's reading: the live src constructions of its family and each planted module's count for that family. */
function familyReading(family: Family, plants: Readonly<Record<string, Module>>): { live: string[]; controls: Record<string, number> } {
  // One call judges the real modules, then the planted ones after them.
  const all = judgeConstructions([...srcFiles(), ...Object.values(plants)]).filter(entry => entry.family === family);
  const pathOf = (site: string): string => site.slice(0, site.lastIndexOf(":"));
  const plantPaths = new Set(Object.values(plants).map(module => module.path));
  const live = all.filter(entry => !plantPaths.has(pathOf(entry.site)));
  const controls = Object.fromEntries(Object.entries(plants).map(([id, module]) => [id, all.filter(entry => pathOf(entry.site) === module.path).length]));
  return { live: live.map(entry => `${entry.site} ${entry.forms.join("+")} ${entry.fields.join(",")}`), controls };
}

// ------------------------------------------------------------------------------------------------- C: the docs sentence
/** The string elements of one top-level array literal of the holder, by its binding name; undefined when it is absent. */
function holderLiterals(name: string): string[] | undefined {
  const text = readRepo(CONSTANTS.holder);
  const source = ts.createSourceFile(CONSTANTS.holder, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found: string[] | undefined;
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer !== undefined) {
      const init = unwrap(node.initializer);
      if (ts.isArrayLiteralExpression(init)) found = init.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : `<non-literal ${ts.SyntaxKind[element.kind]}>`));
    }
    if (found === undefined) ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** The binding this census expects of the holder's row: each half and the pins of this file it names, in pin order. */
const BINDING: readonly (readonly [string, string])[] = [
  ["today", "T1"],
  ["today", "T2"],
  ["producer-references-only", "A1"],
  ["counted-unmapped", "A2"],
  ["never-mints", "A3"],
  ["never-mints", "B1"],
  ["never-mints", "B2"],
  ["never-mints", "B3"],
];
const suiteOf = (pin: string): string => {
  const row = ROWS.find(candidate => candidate.pins.some(entry => entry.id === pin));
  return row === undefined ? "" : `${TOP} > ${row.id} ${row.label}`;
};
const expectedBinding = (): string[] => BINDING.map(([half, pin]) => [half, "test", SELF, suiteOf(pin), pin].join(" | "));
/** The paragraphs of a document's MechanicalWorkflows section that hold a sentence, read through the shared rendered view. */
function sentenceSites(markdown: string, heading: string, sentence: string): { ok: boolean; why: string; html: boolean; holding: string[] } {
  const section = docsSection(markdown, heading, 2, [DOCS07_PARENT]);
  const holding = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.includes(sentence) ? [block.text] : []));
  return { ok: section.ok, why: section.why, html: section.hasHtml, holding };
}
const quoteOfHolder = (): string => (holderLiterals(CONSTANTS.holderFrozen) ?? []).find(line => line.startsWith("quote | "))?.slice("quote | ".length) ?? "";

// ------------------------------------------------------------------------------------------------- residuals
const RESIDUALS: readonly Residual[] = [
  { id: "R-PACKAGE-NAME", pin: "T1", quiet: ["unscoped-name"], twin: ["manifest-dependency"] },
  { id: "R-REQUIREMENT-ID", pin: "T2", quiet: ["requirement-id"], twin: ["type-name"] },
  { id: "R-UNSPELLED-CONSUMER", pin: "T2", quiet: ["unspelled-consumer"], twin: ["type-name"] },
  { id: "R-SCOPE", pin: "B1", quiet: ["qa-module"], twin: ["task-template"] },
  { id: "R-INDIRECT", pin: "B1", quiet: ["indirect-binding"], twin: ["task-template"] },
  { id: "R-CALL-FORM", pin: "B1", quiet: ["concat-call", "join-call"], twin: ["task-template"] },
  { id: "R-PREFIX-CONSTANT", pin: "B1", quiet: ["prefix-constant"], twin: ["task-split-literal"] },
  { id: "R-ID-POSITION", pin: "B2", quiet: ["builder-argument"], twin: ["forge-native-ref"] },
  { id: "R-FIELD-SPELLING", pin: "B3", quiet: ["other-field-name", "bare-step-name"], twin: ["attempt-template"] },
];
const PLANTED_OF: Readonly<Record<string, readonly string[]>> = {
  T1: [...Object.keys(MANIFEST_PLANTS), ...Object.keys(LOCK_PLANTS), ...Object.keys(IMPORT_PLANTS)],
  T2: Object.keys(SPELLING_PLANTS),
  B1: Object.keys(TASK_PLANTS),
  B2: Object.keys(FORGE_PLANTS),
  B3: Object.keys(ATTEMPT_PLANTS),
};

// ------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  T1: () => {
    const manifest: unknown = JSON.parse(readRepo("package.json"));
    const locks = ["package-lock.json", "vendor/dependency-lock.json"].map(path => ({ path, reading: lockNames(JSON.parse(readRepo(path))) }));
    const src = srcFiles();
    expect(src.filter(module => isModule(module.path)).length, "the src leg reads at least SRC_FLOOR modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    for (const lock of locks) expect(lock.reading.packages, `${lock.path} holds at least LOCK_FLOOR packages`).toBeGreaterThanOrEqual(LOCK_FLOOR);
    // One call reads the real modules, then the planted ones after them: a reader that stops early misses the plants.
    const plants = Object.entries(IMPORT_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text }));
    const sites = importSites([...src, ...plants]);
    const plantOf = (site: string): string | undefined => plants.find(plant => site.startsWith(`${plant.path} `))?.id;
    expect(sites.some(site => plantOf(site) === undefined && (specOf(site) === "typescript" || specOf(site).startsWith("node:"))), "the import reader reads real src imports").toBe(true);
    const controls: Record<string, number> = {};
    for (const [id, plant] of Object.entries(MANIFEST_PLANTS)) controls[id] = declaredNames(plant).filter(isMwName).length;
    for (const [id, plant] of Object.entries(LOCK_PLANTS)) controls[id] = lockNames(plant).names.filter(isMwName).length;
    for (const plant of plants) controls[plant.id] = sites.filter(site => plantOf(site) === plant.id && isMwName(specOf(site))).length;
    return {
      scope: CONSTANTS.mwScope,
      manifest: declaredNames(manifest).filter(isMwName),
      locks: Object.fromEntries(locks.map(lock => [lock.path, lock.reading.names.filter(isMwName)])),
      imports: sites.filter(site => plantOf(site) === undefined && isMwName(specOf(site))),
      controls,
    };
  },
  T2: () => {
    const src = srcFiles();
    const spelling = src.filter(module => spells(module.text)).map(module => module.path);
    expect(spelling, "the src files spelling the program's words are exactly the bound consumers").toEqual(MW_COMPOSITION_CONSUMERS.map(entry => entry.module).sort(byName));
    const readers = Object.fromEntries(TRIGGER_READERS.map(name => [name, literalSites(src, name)]));
    for (const [name, sites] of Object.entries(readers)) expect(sites.length, `the ${name} reader is found by its tool name`).toBeGreaterThan(0);
    const plants = Object.entries(SPELLING_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text }));
    const read = [...src, ...plants].filter(module => spells(module.text)).map(module => module.path);
    const controls = Object.fromEntries(plants.map(plant => [plant.id, read.filter(path => path === plant.path).length]));
    return {
      slug: CONSTANTS.programSlug,
      spelling,
      bound: MW_COMPOSITION_CONSUMERS.map(entry => entry.module),
      readers: Object.fromEntries(Object.entries(readers).map(([name, sites]) => [name, sites.some(path => spelling.includes(path)) ? "spells" : "quiet"])),
      controls,
    };
  },
  A1: () => contractReading("A1"),
  A2: () => contractReading("A2"),
  A3: () => contractReading("A3"),
  B1: () => {
    const listed = gitSrc();
    const walk = walkSrc();
    expect(walk.files, "a filesystem walk of src lists what git lists").toEqual(listed);
    expect(walk.links, "no symlink sits under src").toEqual([]);
    expect(listed.filter(isModule).length, "the walk reads at least SRC_FLOOR modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    return { prefixes: [...CONSTANTS.taskPrefixes], idFields: [...CONSTANTS.idFields], compositionWord: CONSTANTS.compositionWord, ...familyReading("task", TASK_PLANTS) };
  },
  B2: () => ({ providers: Object.keys(PROVIDER_FAMILY).filter(name => PROVIDER_FAMILY[name] === "forge"), keys: [...ID_KEYS.forge], ...familyReading("forge", FORGE_PLANTS) }),
  B3: () => ({ prefixes: [...CONSTANTS.attemptPrefixes], keys: [...ID_KEYS.attempt], ...familyReading("attempt", ATTEMPT_PLANTS) }),
  C1: () => {
    const docs = readRepo(DOCS07);
    const sentence = quoteOfHolder();
    expect(sentence.length, "the holder's frozen quote is read").toBeGreaterThan(0);
    const live = sentenceSites(docs, CONSTANTS.docsHeading, sentence);
    expect(live.ok, live.why).toBe(true);
    expect(live.html, "the MechanicalWorkflows section carries no HTML").toBe(false);
    expect(live.holding, "one paragraph of the section is exactly the sentence").toEqual([sentence]);
    expect(/(?<![\w-])design-only(?![\w-])/.test(sentence), "the sentence carries the program status word (wb-kku9.2 clause (c))").toBe(true);
    expect(sentence.split(/(?<=\.)\s+(?=[A-Z])/).length, "it is one sentence").toBe(1);
    const dropped = sentenceSites(docs.replace(`\n${sentence}\n`, "\n"), CONSTANTS.docsHeading, sentence).holding.length;
    const doubled = sentenceSites(docs.replace(`\n${sentence}\n`, `\n${sentence}\n\n${sentence}\n`), CONSTANTS.docsHeading, sentence).holding.length;
    const moved = sentenceSites(docs.replace(`\n${sentence}\n`, "\n").replace("\n## Forge provider\n\n", `\n## Forge provider\n\n${sentence}\n\n`), CONSTANTS.docsHeading, sentence).holding.length;
    return { heading: CONSTANTS.docsHeading, sentence, holding: live.holding.length, plants: { dropped, doubled, moved } };
  },
  C2: () => {
    const lines = holderLiterals(CONSTANTS.holderFrozen);
    expect(lines, `${CONSTANTS.holder} declares ${CONSTANTS.holderFrozen}`).toBeDefined();
    const holderText = readRepo(CONSTANTS.holder);
    const census = CONSTANTS.holder.endsWith(".census.ts") && holderText.startsWith("/**\n * wb-6hb.11 (VC-2/W07): census falsifier");
    const imports = ts.createSourceFile(CONSTANTS.holder, holderText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).statements.filter(ts.isImportDeclaration);
    const judge = imports.some(
      statement =>
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === "./helpers/census.js" &&
        statement.importClause?.namedBindings !== undefined &&
        ts.isNamedImports(statement.importClause.namedBindings) &&
        statement.importClause.namedBindings.elements.some(element => element.name.text === "judge"),
    );
    const quote = (lines ?? []).find(line => line.startsWith("quote | "))?.slice("quote | ".length) ?? "";
    const live = sentenceSites(readRepo(DOCS07), CONSTANTS.docsHeading, quote);
    expect(live.holding, "the holder's quote is the live docs/07 sentence").toEqual([quote]);
    const binding = (lines ?? []).filter(line => !line.startsWith("quote | "));
    expect(binding, "the holder binds exactly this file's pins, by file, describe path, verbatim title and tier").toEqual(expectedBinding());
    expect([census, judge], "the holder is the wb-6hb.11 census leg judging the gate's report").toEqual([true, true]);
    return { holder: CONSTANTS.holder, row: CONSTANTS.holderRow, frozen: CONSTANTS.holderFrozen, shape: { census, judge }, binding };
  },
};

describe(TOP, () => {
  it("judged set: frozen shape, roster, the owner filing's trigger and acceptance, and the constants derived from it", { timeout: 120_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:2", "A:3", "B:3", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    expect(Object.values(CONSTANTS).every(value => (Array.isArray(value) ? value.length > 0 : value !== "")), "every constant is derived from its text").toBe(true);
    // Outside anchor: the filing's trigger sentence and acceptance clauses are exactly the row labels.
    expect(CITATION.length, `${BEAD}'s Citation line is read from the bead export`).toBeGreaterThan(0);
    expect(CLAUSES).toHaveLength(3);
    expect(ROWS.map(row => row.label)).toEqual([gatingOf(CITATION), ...CLAUSES]);
    // Each pin quote sits in its label once at word boundaries, the quotes leave no word of the label unquoted, and every pin
    // is load-bearing: a pin removed from ROWS, IMPL, the frozen literal and the roster together leaves its words unquoted.
    const quotesOf = (row: Row, without?: Pin): string[] => row.pins.filter(pin => pin !== without).map(pin => pin.quote);
    expect(ROWS.flatMap(row => unquoted(row.label, quotesOf(row)).misplaced.map(quote => `${row.id}:${quote}`))).toEqual([]);
    expect(Object.fromEntries(ROWS.map(row => [row.id, unquoted(row.label, quotesOf(row)).runs]))).toEqual({ T: [], A: [], B: [], C: [] });
    expect(ROWS.flatMap(row => row.pins.filter(pin => unquoted(row.label, quotesOf(row, pin)).runs.length === 0).map(pin => pin.id))).toEqual([]);
    // The producer block quotes the filing's citation of :6, and the title's type is the one :6 names.
    const filingQuote = /\('(Use CACWorkflowCompositionV0 as a concept only\. .+?)'\)/.exec(CITATION)?.[1] ?? "";
    expect(filingQuote.length).toBeGreaterThan(0);
    expect(String(ROSTER.producer.mw.filingLine6).replaceAll("\\`", "").replaceAll("`", "").startsWith(filingQuote)).toBe(true);
    expect(filingQuote.includes(CONSTANTS.gatingType)).toBe(true);
    // The residual table: named in order, held to the roster, each quiet row and twin a planted input of its pin.
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["R-PACKAGE-NAME", "R-REQUIREMENT-ID", "R-UNSPELLED-CONSUMER", "R-SCOPE", "R-INDIRECT", "R-CALL-FORM", "R-PREFIX-CONSTANT", "R-ID-POSITION", "R-FIELD-SPELLING"]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(PLANTED_OF[residual.pin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
    // The binding the holder must carry names every pin of rows T, A and B once, and no pin of row C.
    expect(BINDING.map(([, pin]) => pin)).toEqual(ROWS.filter(row => row.id !== "C").flatMap(row => row.pins.map(pin => pin.id)));
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran to the compare with its roster witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
