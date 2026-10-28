/**
 * wb-km7q.9 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R22, program-triage-2026-10-18 child of wb-km7q). Statement (the
 * bead title, held to the tracked bead export): "When rf ships ResourceBrokerLimits/SpeculationBoundary (gated RF-AC5 pressure
 * hysteresis and capped admission), any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten
 * ResourceBrokerLimits and never overrides Pi host hard caps; rf's local default speculation policy stays passive/disabled and Pi
 * documents no other default." Acceptance (owner filing, notes): "adoption-time vitest that a Pi-declared boundary value looser
 * than a host cap is refused or clamped, and a docs sentence that the shipped default remains passive/disabled."
 *
 * THE TRIGGER, MEASURED (read-only, by the cutting seat ws-03, run g10-work-s122, 2026-10-28, in the installed rf, whose
 * `rf --json --version` reads 0.1.845; this census is hermetic and never runs or reads rf): reactive_fiber_cli/domain/
 * broker_limits.py defines ResourceBrokerLimits (:250) and SpeculationBoundary (:418, whose tighten() is the member-wise meet and
 * refuses a constraint above a host cap with BoundaryExceedsCapError, RF_BROKER_BOUNDARY_EXCEEDS_CAP), DEFAULT_POLICY =
 * SpeculationPolicy.PASSIVE (:138) and PASSIVE_LIMITS (:311: declarations recorded, no speculative slot, byte or budget). Its
 * docstring: "nothing here is a CLI surface: the host's HostResourceBroker (RF-AC3, RF-AC5) reads these values, and the one way a
 * process opts into speculation is the seat below" - RF_ADAPTIVE=speculation (ADAPTIVE_ENV :96, SPECULATION_FEATURE :102, read
 * once per invocation by cli/main.py adaptive_selection). runtime/resource_broker.py carries RF-AC5-b admission under caps and
 * pressure. The 2026-10-26 install holds the same module. The trigger has fired, so the filing binds Pi now.
 *
 * DELIVERED HERE: the docs sentence (docs/workbench/18 "Decisions deferred, with recommended starting defaults", the paragraph
 * opening "RF speculation boundary:"), and the until-then leg of the adoption-time vitest: Pi declares no boundary or broker-limit
 * configuration (no src module names one), every rf child Pi launches is handed an environment without the RF_ADAPTIVE seat (so
 * rf's passive default holds for every Pi render), and the host hard caps a future declaration may never override are read off
 * the provider. NOT DELIVERED: the adoption-time vitest itself (a Pi-declared value looser than a host cap is refused or clamped):
 * no Pi declaration exists to feed it. The cut that adds the first one reds row A by design and owes that test, as the docs
 * paragraph's last sentence says.
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the runs
 *   of a-z and 0-9 (SpeculationBoundary reads speculation boundary, RF_ADAPTIVE reads rf adaptive, perClassSlots reads per class
 *   slots). THE VOCABULARY (the title's spellings, rf's seat and its limit members): a word holding "speculat" or "broker", or one
 *   to three adjacent words joining to rfadaptive, perclassslots, foregroundreserve or pendinginterests.
 * - CODE (row A): every module below src/ (a filesystem walk, held to git's listing), parsed with the TypeScript compiler; its
 *   lexemes are each identifier, private name, string literal, template part, regular expression literal and JSX text, never a
 *   comment. A finding is `<path>:<line> <families>`.
 * - CAPS (row B): the provider module's AST: the delay of every setTimeout whose callback calls stop("deadline"), and the bound
 *   of every if testing `<count> > <bound>` before calling stop with a stream reason, each folded through const bindings by name
 *   (an unfoldable value reads null).
 * - LAUNCH (row C): every child-process launcher call (spawn, spawnSync, exec, execSync, execFile, execFileSync, fork) in a src
 *   module whose first argument is the constant "rf", with its options object's env initializer as written.
 * - DOCS (row D): every .md page below docs/ (a filesystem walk, held to git's listing) and the root README.md and CHANGELOG.md,
 *   cut into raw sentences (after ".", "!" or "?" before white space, at a blank line, before a list item, heading, table row or
 *   quote); a sentence NAMES the vocabulary when its words carry a family. The bound paragraph is read in the rendered view
 *   (test/helpers/census.ts docsSection: the unique section under its level-1 title, HTML refused).
 *
 * JUDGED ROWS (one test per pin, titled by the pin id under its row's label; the labels of A-D are the title's two clauses after
 * its trigger, each split at its " and "):
 *  A "any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits": A1 no src lexeme
 *    names the vocabulary, so Pi declares no boundary or limit today (planted leg: a declaration module); A2 the code walk read
 *    exactly git's listing of src modules, above its floor, the provider included.
 *  B "never overrides Pi host hard caps": B1 the provider's deadline is 60000 ms and its stdout and stderr bounds are 262144 bytes
 *    each, and the same reader over a synthetic provider reads that provider's own values (an inclusive comparison not read); B2
 *    the docs paragraph names those caps, in seconds and KiB, equal to the provider's.
 *  C "rf's local default speculation policy stays passive/disabled": C1 the rf child allowlist names no rf-family variable, and a
 *    parent RF_ADAPTIVE=speculation never reaches the child environment scrubbedEnvironment builds from it; C2 the one rf launch
 *    site in src is the provider's spawn, handed scrubbedEnvironment(process.env, RF_CHILD_ENV_ALLOWLIST) (planted leg: an rf
 *    launch handing the child process.env).
 *  D "Pi documents no other default": D1 docs/18's section holds exactly one paragraph opening "RF speculation boundary:", and it
 *    renders as frozen; D2 every docs sentence naming the vocabulary is a sentence of that paragraph, and the docs walk read
 *    exactly git's listing above its floor, docs/18 included (planted leg: a page stating another default and a copy of a bound
 *    sentence, both read outside).
 *  M the readers: M1 the code reader's spellings, the spellings the owner's title gives the subject included; M2 the docs reader's
 *    spellings and its sentence cutter.
 *  Q the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's title in the tracked bead export (.beads/issues.jsonl, row wb-km7q.9,
 *   the title only): its two clauses after the trigger are the labels of A and B, and of C and D, joined by " and "; the docs
 *   paragraph: its first sentence is the label prefix and the C-D clause, and its third sentence opens with the A-B clause. M1
 *   reads the subject's spellings off the title. So a row, a pin or a label removed from every literal of this file still reds
 *   against the owner's text and the docs.
 * PLANTED LEGS: A1, C2 and D2 each run their own judge over the real units and then over the real units with one planted unit after
 *   them, read from memory, and hold the planted run to exactly the plant's findings, so a judge forced quiet, or a walk filtered
 *   between its listing and its judge, reds although the real tree is clean.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; WITNESS holds every pin's witness and REACHED_AT
 *   every pin's assertion count at its end; the registration case reads both against the run, and the test titles registered.
 * RESIDUALS (named; each has a pinned quiet row): R-COMMENT (Q1) a comment is not read - src/workbench/process-env.ts names the
 *   seat in a doc comment and reads quiet; R-COMPUTED (Q2) a name assembled at run time from parts no one lexeme spells;
 *   R-OUTSIDE-ROOTS (Q3) test/, qa/ and examples/ are not walked - the env-scrub census and the process-env test spell the seat;
 *   R-PARAPHRASE (Q4) a default stated without the vocabulary ("rf prefetches every render by default."); R-OTHER-CAP (Q5) a cap
 *   outside the deadline timer and the two stream bounds (a capability registry deadline) is not read by B1; R-INDIRECT-LAUNCH
 *   (Q6) an rf launch through a variable program name or a wrapper is not read by C2 (the env-scrub census pins the launch by
 *   running it).
 * NOT CLAIMED: an edit of this file and the docs paragraph together; the completeness of the residual list (its anchors are this
 *   file's literals).
 *
 * Display paths added: none. Test-only: every plant is an in-memory text; src, docs, two test files and the bead export are only
 * read.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { RF_CHILD_ENV_ALLOWLIST, scrubbedEnvironment } from "../src/workbench/process-env.js";
import { type DocsSection, docsSection } from "./helpers/census.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-km7q.9";
const BEAD_EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const PROCESS_ENV = "src/workbench/process-env.ts";
const DOCS_PAGE = "docs/workbench/18-decisions-and-risks.md";
const DOCS_TITLE = "18 — Decisions, risks, deliberate defaults and re-evaluation triggers";
const DOCS_SECTION = "Decisions deferred, with recommended starting defaults";
const DOCS_LABEL = "RF speculation boundary:";
/** The root pages the docs walk reads beside docs/. */
const ROOT_PAGES = ["CHANGELOG.md", "README.md"] as const;
/** The walks' floors, each below the count at base 62f9ede (116 src modules, 77 docs pages). */
const SRC_FLOOR = 100;
const DOCS_FLOOR = 60;
/** The two test files outside every walked root that spell the seat (R-OUTSIDE-ROOTS). */
const OUTSIDE_SPELLERS = ["test/workbench-env-scrub-census.test.ts", "test/workbench-process-env.test.ts"] as const;
const CODE_MODULE = /\.(?:[cm]?ts|tsx|[cm]?js|jsx)$/;
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]);
/** Sentence units: a sentence end before whitespace, a blank line, or a line opening a list item, heading, table row or quote. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The vocabulary: a word holding a stem, or one to three adjacent words joining to a phrase. */
const STEMS = ["speculat", "broker"] as const;
const PHRASES = ["rfadaptive", "perclassslots", "foregroundreserve", "pendinginterests"] as const;

/** The paragraph docs/18 binds, as its rendered view reads it (inline markup removed, whitespace collapsed). */
const PARAGRAPH =
  "RF speculation boundary: rf's local default speculation policy stays passive/disabled and Pi documents no other default. " +
  "rf 0.1.845 ships ResourceBrokerLimits and SpeculationBoundary as values its host resource broker reads, with no CLI surface, " +
  "and the one way an rf process opts into its speculative policy is the process-scoped RF_ADAPTIVE seat, which no rf child Pi " +
  "launches receives: that child's environment holds only the RF_CHILD_ENV_ALLOWLIST names of src/workbench/process-env.ts. " +
  "Any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits and never overrides Pi " +
  "host hard caps, the 60 s render deadline and the 256 KiB stdout and stderr bounds of src/workbench/providers/reactivefiber.ts. " +
  "Pi declares none today, so the cut that declares the first one owes the adoption-time test that refuses or clamps a value " +
  "looser than a host cap (wb-km7q.9).";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "A", label: "any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits", pins: ["A1", "A2"] },
  { id: "B", label: "never overrides Pi host hard caps", pins: ["B1", "B2"] },
  { id: "C", label: "rf's local default speculation policy stays passive/disabled", pins: ["C1", "C2"] },
  { id: "D", label: "Pi documents no other default", pins: ["D1", "D2"] },
  { id: "M", label: "the readers: M1 the code reader, M2 the docs reader", pins: ["M1", "M2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"] },
];
/** The title's two clauses after its trigger, each as the pair of rows whose labels it joins with " and " (outside anchor 1). */
const CLAUSES: readonly (readonly [string, string])[] = [
  ["A", "B"],
  ["C", "D"],
];
/** The named residual families and the quiet row that pins each. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-COMMENT": "Q1",
  "R-COMPUTED": "Q2",
  "R-OUTSIDE-ROOTS": "Q3",
  "R-PARAPHRASE": "Q4",
  "R-OTHER-CAP": "Q5",
  "R-INDIRECT-LAUNCH": "Q6",
};

const read = (rel: string): string => readFileSync(join(REPO, rel), "utf8");
const labelOf = (id: string): string => ROWS.find(row => row.id === id)?.label ?? `<no row ${id}>`;
const clauseOf = (pair: readonly [string, string]): string => pair.map(labelOf).join(" and ");
const capitalized = (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

/** The words of a text (WORDS). */
function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
/** The vocabulary families a text names, sorted (THE VOCABULARY). */
function families(text: string): string[] {
  const list = words(text);
  const found = new Set<string>();
  for (const word of list) for (const stem of STEMS) if (word.includes(stem)) found.add(stem);
  for (let start = 0; start < list.length; start += 1) {
    for (let end = start + 1; end <= Math.min(list.length, start + 3); end += 1) {
      const joined = list.slice(start, end).join("");
      for (const phrase of PHRASES) if (joined === phrase) found.add(phrase);
    }
  }
  return [...found].sort();
}

function scriptKind(fileName: string): ts.ScriptKind {
  if (/\.[jt]sx$/.test(fileName)) return fileName.endsWith(".jsx") ? ts.ScriptKind.JSX : ts.ScriptKind.TSX;
  return /\.[cm]?js$/.test(fileName) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
const parsed = (fileName: string, source: string): ts.SourceFile => ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, scriptKind(fileName));

/** One module's lexemes (CODE): every comment is trivia, so none is read (R-COMMENT). */
function lexemes(fileName: string, source: string): { readonly line: number; readonly text: string }[] {
  const file = parsed(fileName, source);
  const out: { line: number; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) ||
      ts.isPrivateIdentifier(node) ||
      ts.isStringLiteralLike(node) ||
      ts.isRegularExpressionLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isJsxText(node)
    ) {
      out.push({ line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1, text: node.text });
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}
/** A module's code findings: `<path>:<line> <families>` for each lexeme naming the vocabulary. */
function codeFindings(fileName: string, source: string): string[] {
  return lexemes(fileName, source).flatMap(lexeme => {
    const named = families(lexeme.text);
    return named.length === 0 ? [] : [`${fileName}:${lexeme.line} ${named.join("+")}`];
  });
}

/** Every regular file below a root by a filesystem walk (a symlink is not followed), repository-relative and sorted. */
function walked(root: string): string[] {
  const out: string[] = [];
  const visit = (rel: string): void => {
    for (const entry of readdirSync(join(REPO, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) out.push(child);
    }
  };
  visit(root);
  return out.sort();
}
/** Every path git lists below the given roots, tracked or untracked (ignored ones included, as the walk sees them), sorted: the
 * walks' anchor outside this census. */
function gitListed(...roots: string[]): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--", ...roots], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return [...new Set(listing.split("\0"))].filter(path => path !== "" && existsSync(join(REPO, path))).sort();
}

/** A unit a walk reads: a real file's text, or a planted one read from memory after the real ones. */
interface Unit {
  readonly path: string;
  readonly source: string;
}
/** The code walk (rows A and C): the src modules read, and the units its judges read - every module, then each plant. */
function codeWalk(plants: readonly Unit[] = []): { readonly modules: string[]; readonly units: readonly Unit[] } {
  const modules = walked("src").filter(path => CODE_MODULE.test(path));
  return { modules, units: [...modules.map(path => ({ path, source: read(path) })), ...plants] };
}
const codeHits = (units: readonly Unit[]): string[] => units.flatMap(unit => codeFindings(unit.path, unit.source));
const launchesOf = (units: readonly Unit[]): { readonly site: string; readonly env: string | null }[] => units.flatMap(unit => rfLaunches(unit.path, unit.source));

/** The caps a provider source holds (CAPS). */
function capsOf(source: string): { readonly deadlineMs: (number | null)[]; readonly bounds: Record<string, (number | null)[]> } {
  const file = parsed(PROVIDER, source);
  const consts = new Map<string, ts.Expression>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0) {
      for (const declaration of node.declarations) if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined) consts.set(declaration.name.text, declaration.initializer);
    }
    ts.forEachChild(node, collect);
  };
  collect(file);
  const fold = (node: ts.Expression, depth: number): number | null => {
    if (depth > 8) return null;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isParenthesizedExpression(node)) return fold(node.expression, depth + 1);
    if (ts.isIdentifier(node)) {
      const bound = consts.get(node.text);
      return bound === undefined ? null : fold(bound, depth + 1);
    }
    if (ts.isBinaryExpression(node)) {
      const left = fold(node.left, depth + 1);
      const right = fold(node.right, depth + 1);
      if (left === null || right === null) return null;
      if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right;
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right;
      if (node.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right;
    }
    return null;
  };
  const stopReasons = (node: ts.Node): string[] => {
    const reasons: string[] = [];
    const visit = (inner: ts.Node): void => {
      if (ts.isCallExpression(inner) && ts.isIdentifier(inner.expression) && inner.expression.text === "stop") {
        const first = inner.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first)) reasons.push(first.text);
      }
      ts.forEachChild(inner, visit);
    };
    visit(node);
    return reasons;
  };
  const deadlineMs: (number | null)[] = [];
  const bounds: Record<string, (number | null)[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "setTimeout") {
      const [callback, delay] = node.arguments;
      if (callback !== undefined && stopReasons(callback).includes("deadline")) deadlineMs.push(delay === undefined ? null : fold(delay, 0));
    }
    if (ts.isIfStatement(node) && ts.isBinaryExpression(node.expression) && node.expression.operatorToken.kind === ts.SyntaxKind.GreaterThanToken) {
      const bound = fold(node.expression.right, 0);
      for (const reason of stopReasons(node.thenStatement)) if (reason !== "deadline") bounds[reason] = [...(bounds[reason] ?? []), bound];
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { deadlineMs, bounds };
}

/** The rf launches a src module makes (LAUNCH). */
function rfLaunches(fileName: string, source: string): { readonly site: string; readonly env: string | null }[] {
  const file = parsed(fileName, source);
  const out: { site: string; env: string | null }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : undefined;
      const first = node.arguments[0];
      if (callee !== undefined && LAUNCHERS.has(callee) && first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") {
        const options = node.arguments.find(argument => ts.isObjectLiteralExpression(argument));
        const env =
          options !== undefined && ts.isObjectLiteralExpression(options)
            ? options.properties.find(property => ts.isPropertyAssignment(property) && property.name.getText(file) === "env")
            : undefined;
        out.push({ site: `${fileName} ${callee}`, env: env !== undefined && ts.isPropertyAssignment(env) ? env.initializer.getText(file).replace(/\s+/g, "") : null });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

/** The raw sentences of a markdown text (DOCS), whitespace collapsed. */
function sentencesOf(body: string): string[] {
  return body
    .split(SENTENCE_BREAK)
    .map(sentence => sentence.replace(/\s+/g, " ").trim())
    .filter(sentence => sentence.length > 0);
}
/** The docs walk (row D): the pages read, and every sentence of each page and then of each plant. */
function docsWalk(plants: readonly Unit[] = []): { readonly pages: string[]; readonly sentences: { readonly page: string; readonly sentence: string }[] } {
  const pages = [...walked("docs").filter(path => path.endsWith(".md")), ...ROOT_PAGES.filter(page => existsSync(join(REPO, page)))].sort();
  const units = [...pages.map(page => ({ path: page, source: read(page) })), ...plants];
  return { pages, sentences: units.flatMap(unit => sentencesOf(unit.source).map(sentence => ({ page: unit.path, sentence }))) };
}
/** D2's judge: every sentence naming the vocabulary that is not a sentence of the bound paragraph's docs/18 line. */
function outsideOf(sentences: readonly { readonly page: string; readonly sentence: string }[], line: string): string[] {
  return sentences
    .filter(entry => families(entry.sentence).length > 0)
    .filter(entry => entry.page !== DOCS_PAGE || line === "" || !line.includes(entry.sentence))
    .map(entry => `${entry.page}: ${entry.sentence.slice(0, 160)}`);
}
/** docs/18's bound section, in the rendered view. */
const boundSection = (): DocsSection => docsSection(read(DOCS_PAGE), DOCS_SECTION, 2, [DOCS_TITLE]);
/** The section's rendered paragraphs opening with the bound label. */
const boundParagraphs = (section: DocsSection): string[] =>
  section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith(DOCS_LABEL) ? [block.text] : []));
/** The raw markdown line of docs/18 holding the bound paragraph ("" when none). */
const boundLine = (): string => read(DOCS_PAGE).split("\n").find(line => line.startsWith(`**${DOCS_LABEL}**`)) ?? "";

let titleCache: string | undefined;
/** The owner filing's title in the tracked bead export; throws when the export holds no such row. */
function filingTitle(): string {
  if (titleCache !== undefined) return titleCache;
  for (const line of read(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (row !== null && typeof row === "object" && "id" in row && row.id === BEAD && "title" in row && typeof row.title === "string") {
      titleCache = row.title;
      return row.title;
    }
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}
/** The subject's spellings in the owner's title: the two shipped type names, the declared boundary and limit, the policy word. */
function titleSpellings(): string[] {
  const title = filingTitle();
  const shipped = /\bWhen rf ships (\w+)\/(\w+) /.exec(title)?.slice(1) ?? [];
  const declared = /\bany Pi-declared (\w+) or ([\w-]+) configuration\b/.exec(title)?.slice(1) ?? [];
  const policy = /\bdefault (\w+) policy\b/.exec(title)?.slice(1) ?? [];
  return [...shipped, ...declared, ...policy];
}

/** Each control's verdict under a reader; the list is the witness, every entry asserted against its expected verdict. */
function verdicts(reader: (text: string) => boolean, controls: readonly { readonly text: string; readonly hit: boolean }[]): Json {
  const out = controls.map(control => ({ text: control.text, hit: reader(control.text) }));
  expect(out).toStrictEqual(controls.map(control => ({ text: control.text, hit: control.hit })));
  return out;
}
const codeHit = (source: string): boolean => codeFindings("plant.ts", source).length > 0;
const docsHit = (text: string): boolean => sentencesOf(text).some(sentence => families(sentence).length > 0);
/** A template literal with one substitution, built without a literal `${` in this file. */
const TEMPLATE_PLANT = ["const flag = `speculation=", "{on}`;"].join("$");
/** The PLANTED LEGS: each walk's judge reads one planted unit after the real ones and must report exactly the plant, so a judge
 * forced quiet, or a walk filtered between its listing and its judge, reds although the real tree is clean. */
const CODE_PLANT: Unit = { path: "src/zz-plant-declaration.ts", source: "export const boundary = { per_class_slots: { render: 4 } };\n" };
const LAUNCH_PLANT: Unit = { path: "src/zz-plant-launch.ts", source: 'import { spawnSync } from "node:child_process";\nspawnSync("rf", ["--json", "--version"], { env: process.env });\n' };
const DOCS_PLANT: Unit = {
  path: "docs/workbench/zz-plant.md",
  source: "# Plant\n\nrf's broker default is turned on for Pi renders.\n\n**RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.\n",
};
/** B1's synthetic provider: the reader must read its values, never the live provider's. */
const CAPS_PLANT = 'const LIMIT=4*1024;\nconst timer=setTimeout(()=>stop("deadline"),1_500);\nif(outBytes>LIMIT) stop("stdout");\nif(errBytes>LIMIT) stop("stderr");\nif(errBytes>=LIMIT) stop("stderr");\n';

const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const hits = codeHits(codeWalk().units);
    const planted = codeHits(codeWalk([CODE_PLANT]).units);
    expect(hits, "src lexemes naming a boundary or broker-limit configuration: a Pi declaration, which owes the adoption-time test").toEqual([]);
    expect(planted, "the same judge over the src modules and a planted declaration after them: the plant is its one finding").toEqual([`${CODE_PLANT.path}:1 perclassslots`]);
    return { hits, planted };
  },
  A2: () => {
    const { modules } = codeWalk();
    const listed = gitListed("src").filter(path => CODE_MODULE.test(path));
    const floorMet = modules.length >= SRC_FLOOR;
    const anchorRead = modules.includes(PROVIDER) && read(PROVIDER).includes('spawn("rf",');
    expect(modules, "the code walk read exactly git's own listing of src modules").toStrictEqual(listed);
    expect(floorMet, `src modules read: ${modules.length}, floor ${SRC_FLOOR}`).toBe(true);
    expect(anchorRead, `the code walk read ${PROVIDER}, holding the rf spawn`).toBe(true);
    return { walkAgreesWithGit: true, floorMet, anchorRead };
  },
  B1: () => {
    const caps = capsOf(read(PROVIDER));
    const synthetic = capsOf(CAPS_PLANT);
    expect(caps.deadlineMs, "the provider's deadline timer delays (ms)").toEqual([60_000]);
    expect(caps.bounds, "the provider's stream bounds (bytes), by stop reason").toStrictEqual({ stdout: [256 * 1024], stderr: [256 * 1024] });
    expect(synthetic, "the same reader over a synthetic provider: its own delay and bounds, the inclusive comparison not read").toStrictEqual({ deadlineMs: [1500], bounds: { stdout: [4096], stderr: [4096] } });
    return { deadlineMs: caps.deadlineMs, bounds: caps.bounds, synthetic };
  },
  B2: () => {
    const match = /\bthe (\d+) s render deadline and the (\d+) KiB stdout and stderr bounds\b/.exec(boundParagraphs(boundSection())[0] ?? "");
    const seconds = match?.[1] === undefined ? null : Number(match[1]);
    const kib = match?.[2] === undefined ? null : Number(match[2]);
    const caps = capsOf(read(PROVIDER));
    expect(match, "the docs paragraph names the render deadline in seconds and the stream bounds in KiB").not.toBeNull();
    expect(caps.deadlineMs.map(ms => (ms === null ? null : ms / 1000)), "the provider's deadline, in the paragraph's seconds").toEqual([seconds]);
    expect([...(caps.bounds.stdout ?? []), ...(caps.bounds.stderr ?? [])].map(bytes => (bytes === null ? null : bytes / 1024)), "the provider's stream bounds, in the paragraph's KiB").toEqual([kib, kib]);
    return { deadlineSeconds: seconds, boundKiB: kib };
  },
  C1: () => {
    const rfFamily = RF_CHILD_ENV_ALLOWLIST.filter(name => /^(?:SWARM_)?RF_/i.test(name));
    const child = scrubbedEnvironment({ PATH: "/usr/bin", HOME: "/home/fixture", RF_ADAPTIVE: "speculation" }, RF_CHILD_ENV_ALLOWLIST);
    expect(rfFamily, "rf-family names on the rf child allowlist").toEqual([]);
    expect(Object.hasOwn(child, "RF_ADAPTIVE"), "a parent RF_ADAPTIVE=speculation reached the rf child environment").toBe(false);
    expect(Object.keys(child).sort(), "the names the rf child environment holds from that parent").toEqual(["HOME", "PATH"]);
    return { allowlist: [...RF_CHILD_ENV_ALLOWLIST], rfFamily, childNames: Object.keys(child).sort() };
  },
  C2: () => {
    const launches = launchesOf(codeWalk().units);
    const planted = launchesOf(codeWalk([LAUNCH_PLANT]).units);
    expect(launches, "every rf launch in src, with the env its options hand the child").toStrictEqual([
      { site: `${PROVIDER} spawn`, env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)" },
    ]);
    expect(planted, "the same scan over the src modules and a planted inherited-env rf launch after them").toStrictEqual([...launches, { site: `${LAUNCH_PLANT.path} spawnSync`, env: "process.env" }]);
    return { launches, planted };
  },
  D1: () => {
    const section = boundSection();
    const paragraphs = boundParagraphs(section);
    expect(section.ok, section.why).toBe(true);
    expect(section.hasHtml, "the bound section carries HTML").toBe(false);
    expect(paragraphs, `docs/18's paragraphs opening "${DOCS_LABEL}"`).toEqual([PARAGRAPH]);
    return { section: section.ok, paragraphs: paragraphs.length };
  },
  D2: () => {
    const docs = docsWalk();
    const listed = gitListed("docs", ...ROOT_PAGES).filter(path => path.endsWith(".md"));
    const floorMet = docs.pages.filter(page => page.startsWith("docs/")).length >= DOCS_FLOOR;
    const anchorRead = docs.pages.includes(DOCS_PAGE);
    const line = boundLine();
    const named = docs.sentences.filter(entry => families(entry.sentence).length > 0);
    const outside = outsideOf(docs.sentences, line);
    const plantedOutside = outsideOf(docsWalk([DOCS_PLANT]).sentences, line);
    expect(docs.pages, "the docs walk read exactly git's own listing of docs/**/*.md, README.md and CHANGELOG.md").toStrictEqual(listed);
    expect(floorMet && anchorRead, `docs pages read under docs/ meet the floor ${DOCS_FLOOR} and include ${DOCS_PAGE}`).toBe(true);
    expect(line, `docs/18 holds the bound paragraph's line opening **${DOCS_LABEL}**`).not.toBe("");
    expect(outside, "docs sentences naming the vocabulary outside the bound paragraph (another documented default)").toEqual([]);
    expect(plantedOutside, "the same judge over the docs pages and a planted page after them: both plant sentences, the bound one copied off docs/18 included").toEqual([
      `${DOCS_PLANT.path}: rf's broker default is turned on for Pi renders.`,
      `${DOCS_PLANT.path}: **RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.`,
    ]);
    return { walkAgreesWithGit: true, floorMet, anchorRead, named: named.length, outside, plantedOutside };
  },
  M1: () => {
    const spellings = titleSpellings();
    expect(spellings, "the subject's spellings in the owner's title").toEqual(["ResourceBrokerLimits", "SpeculationBoundary", "SpeculationBoundary", "broker-limit", "speculation"]);
    expect(spellings.filter(spelling => !codeHit(`const subject = "${spelling}";`)), "title spellings the code reader misses").toEqual([]);
    return verdicts(codeHit, [
      { text: "const boundary: SpeculationBoundary = make();", hit: true },
      { text: "export const limits = new ResourceBrokerLimits();", hit: true },
      { text: "const config = { per_class_slots: { render: 1 } };", hit: true },
      { text: "const config = { foregroundReserve: 0, maxPendingInterests: 4 };", hit: true },
      { text: 'const seat = "RF_ADAPTIVE";', hit: true },
      { text: "env.rfAdaptive = on;", hit: true },
      { text: 'const key = "broker-limit";', hit: true },
      { text: TEMPLATE_PLANT, hit: true },
      { text: "const seat = /RF_ADAPTIVE=/;", hit: true },
      { text: "class Host { #speculative = false; }", hit: true },
      { text: 'const preview = "noncommitted render";', hit: false },
      { text: 'const interest = "pending"; const slots = 2;', hit: false },
    ]);
  },
  M2: () => {
    expect(sentencesOf("One. Two!\n\n- a list item\n# A heading\n| a | row |\n> a quote"), "the sentence cutter's units").toEqual([
      "One.",
      "Two!",
      "- a list item",
      "# A heading",
      "| a | row |",
      "> a quote",
    ]);
    return verdicts(docsHit, [
      { text: "rf's default speculation policy is turned on for Pi.", hit: true },
      { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
      { text: "The broker limits loosen the host caps.", hit: true },
      { text: "A SpeculationBoundary widens the deadline.", hit: true },
      { text: "Pi keeps per-class slots for renders.", hit: true },
      { text: "rf renders a noncommitted preview.", hit: false },
    ]);
  },
  Q1: () => {
    const live = read(PROCESS_ENV);
    expect(live.includes("RF_ADAPTIVE"), `${PROCESS_ENV} names the seat in its doc comment`).toBe(true);
    expect(codeFindings(PROCESS_ENV, live), `${PROCESS_ENV} reads quiet: comments are not read`).toEqual([]);
    return verdicts(codeHit, [
      { text: "// RF_ADAPTIVE=speculation selects rf's speculative policy\nconst x = 1;", hit: false },
      { text: "/* SpeculationBoundary */ const y = 2;", hit: false },
    ]);
  },
  Q2: () =>
    verdicts(codeHit, [
      { text: 'const seat = ["RF", "ADAPTIVE"].join("_");', hit: false },
      { text: 'const stem = "specu" + "lation";', hit: false },
    ]),
  Q3: () => {
    const { modules } = codeWalk();
    const walkedOutsideSrc = modules.filter(path => !path.startsWith("src/"));
    const spelledOutside = OUTSIDE_SPELLERS.filter(path => codeFindings(path, read(path)).length > 0);
    expect(walkedOutsideSrc, "modules the code walk read outside src/").toEqual([]);
    expect(spelledOutside, "test files outside the walked root that spell the vocabulary").toEqual([...OUTSIDE_SPELLERS]);
    return { walkedOutsideSrc, spelledOutside };
  },
  Q4: () =>
    verdicts(docsHit, [
      { text: "rf prefetches every render by default.", hit: false },
      { text: "Pi turns rf's lookahead on.", hit: false },
    ]),
  Q5: () => {
    const live = read(PROVIDER);
    const planted = `${live}\nconst registry = new CapabilityRegistry({ deadlineMs: 1 });\nsetTimeout(() => cleanup(), 5);\nif (queued > 3) drop("queue");\n`;
    expect(capsOf(planted), "a planted registry deadline, an unrelated timer and an unrelated bound are not read").toStrictEqual(capsOf(live));
    return { unchanged: true };
  },
  Q6: () => {
    const indirect = rfLaunches("plant.ts", 'const program = "rf"; spawn(program, ["--json"]); run("rf", ["--json"]);');
    expect(indirect, "an rf launch through a variable program name or a wrapper").toEqual([]);
    return { launches: indirect };
  },
};

/** Each pin's witness, frozen at the cut (rule 16). */
const WITNESS: Readonly<Record<string, Json>> = {
  A1: { hits: [], planted: ["src/zz-plant-declaration.ts:1 perclassslots"] },
  A2: { walkAgreesWithGit: true, floorMet: true, anchorRead: true },
  B1: { deadlineMs: [60_000], bounds: { stdout: [262_144], stderr: [262_144] }, synthetic: { deadlineMs: [1500], bounds: { stdout: [4096], stderr: [4096] } } },
  B2: { deadlineSeconds: 60, boundKiB: 256 },
  C1: { allowlist: ["PATH", "HOME", "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "LC_CTYPE", "TZ"], rfFamily: [], childNames: ["HOME", "PATH"] },
  C2: {
    launches: [{ site: `${PROVIDER} spawn`, env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)" }],
    planted: [
      { site: `${PROVIDER} spawn`, env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)" },
      { site: "src/zz-plant-launch.ts spawnSync", env: "process.env" },
    ],
  },
  D1: { section: true, paragraphs: 1 },
  D2: {
    walkAgreesWithGit: true,
    floorMet: true,
    anchorRead: true,
    named: 3,
    outside: [],
    plantedOutside: [
      "docs/workbench/zz-plant.md: rf's broker default is turned on for Pi renders.",
      "docs/workbench/zz-plant.md: **RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.",
    ],
  },
  M1: [
    { text: "const boundary: SpeculationBoundary = make();", hit: true },
    { text: "export const limits = new ResourceBrokerLimits();", hit: true },
    { text: "const config = { per_class_slots: { render: 1 } };", hit: true },
    { text: "const config = { foregroundReserve: 0, maxPendingInterests: 4 };", hit: true },
    { text: 'const seat = "RF_ADAPTIVE";', hit: true },
    { text: "env.rfAdaptive = on;", hit: true },
    { text: 'const key = "broker-limit";', hit: true },
    { text: TEMPLATE_PLANT, hit: true },
    { text: "const seat = /RF_ADAPTIVE=/;", hit: true },
    { text: "class Host { #speculative = false; }", hit: true },
    { text: 'const preview = "noncommitted render";', hit: false },
    { text: 'const interest = "pending"; const slots = 2;', hit: false },
  ],
  M2: [
    { text: "rf's default speculation policy is turned on for Pi.", hit: true },
    { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
    { text: "The broker limits loosen the host caps.", hit: true },
    { text: "A SpeculationBoundary widens the deadline.", hit: true },
    { text: "Pi keeps per-class slots for renders.", hit: true },
    { text: "rf renders a noncommitted preview.", hit: false },
  ],
  Q1: [
    { text: "// RF_ADAPTIVE=speculation selects rf's speculative policy\nconst x = 1;", hit: false },
    { text: "/* SpeculationBoundary */ const y = 2;", hit: false },
  ],
  Q2: [
    { text: 'const seat = ["RF", "ADAPTIVE"].join("_");', hit: false },
    { text: 'const stem = "specu" + "lation";', hit: false },
  ],
  Q3: { walkedOutsideSrc: [], spelledOutside: ["test/workbench-env-scrub-census.test.ts", "test/workbench-process-env.test.ts"] },
  Q4: [
    { text: "rf prefetches every render by default.", hit: false },
    { text: "Pi turns rf's lookahead on.", hit: false },
  ],
  Q5: { unchanged: true },
  Q6: { launches: [] },
};
/** Each pin's assertion count when its case reached its end (its witness comparison included), frozen at the cut. */
const REACHED_AT: readonly string[] = ["A1:4", "A2:5", "B1:5", "B2:5", "C1:5", "C2:4", "D1:5", "D2:7", "M1:5", "M2:4", "Q1:5", "Q2:3", "Q3:4", "Q4:3", "Q5:3", "Q6:3"];
const JUDGED_SET_TITLE = "the judged set: the frozen shape, the cases, the witnesses, the residuals and the outside anchors agree";
const REGISTRATION_TITLE = "registration: every test of this file is registered once, in row order, in run mode, and ran; every pin reached its end with its frozen witness and assertion count";

/** Each pin's witness as its case returned it, and its assertion count at its end, in run order. */
const MEASURED: Record<string, Json> = {};
const REACHED: string[] = [];

describe("wb-km7q.9 rf speculation boundary census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R22)", () => {
  it(JUDGED_SET_TITLE, () => {
    // The outside anchors first, so a row or label removed from every literal here reds against the owner's text and the docs.
    const title = filingTitle();
    expect(/\), (.+); (.+)\.$/.exec(title)?.slice(1), "the owner's title clauses after its trigger, each tiled by two row labels").toEqual(CLAUSES.map(clauseOf));
    const paragraph = boundParagraphs(boundSection())[0] ?? "";
    const [declared, passive] = CLAUSES.map(clauseOf);
    expect(paragraph.startsWith(`${DOCS_LABEL} ${passive}.`), "the docs paragraph opens with the label and the C-D clause").toBe(true);
    expect(paragraph.includes(`. ${capitalized(declared ?? "")}, the `), "a sentence of the docs paragraph opens with the A-B clause").toBe(true);
    const pins = ROWS.flatMap(row => row.pins);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "D:2", "M:2", "Q:6"]);
    expect(Object.keys(IMPL).sort(), "a case for every pin, and no other").toEqual([...pins].sort());
    expect(Object.keys(WITNESS).sort(), "a frozen witness for every pin, and no other").toEqual([...pins].sort());
    expect(REACHED_AT.map(entry => entry.split(":")[0]), "a frozen assertion count for every pin, in row order").toEqual(pins);
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row of row Q").toEqual(ROWS.find(row => row.id === "Q")?.pins ?? []);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          MEASURED[pin] = witness;
          expect(witness, `${pin}'s witness`).toStrictEqual(WITNESS[pin]);
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(REGISTRATION_TITLE, ({ task }) => {
    const seen: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") seen.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = seen.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in row order").toEqual([JUDGED_SET_TITLE, ...ROWS.flatMap(row => row.pins), REGISTRATION_TITLE]);
    const here = seen.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(seen.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      seen.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(MEASURED, "every pin's witness, compared against the frozen witnesses a second time").toStrictEqual(WITNESS);
    expect(REACHED, "every pin reached its end, in row order, with its frozen assertion count").toEqual([...REACHED_AT]);
  });
});
