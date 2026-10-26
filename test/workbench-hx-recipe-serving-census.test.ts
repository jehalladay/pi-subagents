/**
 * wb-ts6.1 (HXFS-PI-R5, program-triage-2026-10-18), the until-then leg. Statement (bead title): "When W1-W8 hyper-unix
 * recipes become reachable to a Pi-hosted agent (gate: skill reachable via an install target in a Pi loader root or
 * operator settingSources; wb-kqx.5), the serving Pi doc/example shall state the operator contract (REV/BASE/PATH explicit
 * inputs, never interpolated untrusted strings; quoted paths; separate exit-code capture; verified immutable revision IDs)
 * and point at the installed skill, never embed a copy." Until the gate arms the owner filing (bead notes) owes "a
 * census-style negative records that no Pi document presents the recipes as served"; the falsifier its armed acceptance
 * names ("a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted/interpolated REV/BASE/PATH") is
 * already a property of that negative, and is pinned here as row E.
 *
 * SOURCE (read-only git show at HyperUnix-CLI 694570cd00c2 by the cutting seat): docs/programs/
 * feedback-query-skill-factory-2026-10-16/06-workflow-recipes.md:3 "Operators should treat literal `REV`, `BASE` and
 * `PATH` as explicitly provided inputs, not interpolated untrusted strings; quote paths, capture exits separately and
 * verify immutable revision IDs."; the eight recipe headings (:5 W1 branch-landing-audit, :27 W2, :37 W3, :52 W4, :62 W5,
 * :74 W6, :82 W7, :95 W8 bounded-preflight and named-query-lifecycle) and the fifteen hx command lines and spans they hold
 * (W1 :12-18, W2 :32, W3 :42-45, W4 :56, W6 :78, W8 :99; W5 and W7 hold none), which the roster carries verbatim.
 *
 * MEASURED ON THE HOST (2026-10-26T22:01:19Z; the installed hx 0.1.0, binary sha256 8fddc7cc2e6c65d9...): `hx
 * install-skill --list` under an empty scratch HOME (it stayed empty) prints the 26-file bundle (sha256/raw
 * 6befde060c69...) and ten targets, ~/.skills/hyper-unix (default, selected) and nine agent homes (marker absent) - the
 * roster's hxInstall block, and the same ten the wb-kqx.5 filing names. The installed skill's references/agent-workflows.md
 * teaches W1, W2, W3 and W5 as task sections (:309, :336, :361, :386), so the recipes are served wherever that skill loads.
 *
 * MEASURED AT BASE (f381c52, landing 443): src/skill-loader.ts resolves five roots (<cwd>/.pi/skills, <cwd>/.agents/skills,
 * getAgentDir()/skills = ~/.pi/agent/skills by default, ~/.agents/skills, ~/.pi/skills), README's discovery-roots table and
 * the wb-kqx.5 filing state the same five, and none holds an hx install target; every src site that hands settingSources
 * on is [] or a ?? [] default (src/index.ts twice, src/workbench/claude-host.ts, src/workbench/hosts/local-detached.ts) but
 * the operator's own value passed through src/settings.ts, and docs/workbench/13's representative config names
 * ["project"]; src's 116 modules launch git, forge and rf by literal command, never hx, and no src literal names a recipe;
 * the only HX surface Pi registers is hyperunix.find, effectClass read, over @hyperunix/sdk; the 107-file Pi document
 * population (docs, examples, new-feedback, .agents, .pi and the five repo-root Markdown files) holds no hx command and no
 * recipe mention but one line, the wb-kqx.5 receipt in the byte-frozen TRACEABILITY.md (:236), which names the hx
 * installer and states the skill not found.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; the labels of G, N and E are the owner
 * filing's own clauses, verbatim from the tracked bead export):
 *  G, the gate stays unarmed. G1 the loader's roots read from source (the roots array by AST; getAgentDir()'s default
 *    measured under a scratch HOME, both in the witness) equal the roster's five, README's table and the wb-kqx.5 filing's,
 *    the roster's ten hx targets equal the filing's ten, and no target lies inside a root (the same predicate finds the
 *    default target inside a planted ~/.skills root); G2 through the real preloadSkills under a scratch HOME a stand-in
 *    hyper-unix skill planted at all ten targets still reads the not-found placeholder, while the same stand-in planted at
 *    each of the five roots in turn is found (the positive control); G3 the Claude host hands the SDK settingSources []
 *    when none is configured (an injected query records the options), every src settingSources site is [] or a ?? []
 *    default but the operator passthrough in src/settings.ts, docs/13's example is ["project"], and no Pi document example
 *    names the user source (the same reader finds it in a planted example).
 *  N, the until-then negative. N1 every line of the Pi document population, the walk held to node's recursive listing and
 *    to an independent walk of every Markdown file outside the out-of-population trees: no line reads served or named
 *    (lineVerdict) and the TRACEABILITY.md:236 floor reads negated; N2 the repo's own skill and agent roots serve no
 *    hyper-unix skill: preloadSkills from the repo root reads the placeholder for it while beads, the one tracked project
 *    skill, is read, and no tracked .pi agent and no default agent declares it (the same predicate reads a planted
 *    frontmatter declaring it); N3 no src module launches hx by a literal command (the scan sees src's git and rf
 *    launches), no src string or template literal reads as a recipe mention or an hx command, and the hyperunix.*
 *    descriptors Pi registers are the typed hyperunix.find read, none flagged (the same reader flags a planted descriptor
 *    naming an hx command).
 *  E, the falsifier. E1 every roster recipe heading and every hx command line or span, appended to a copy of
 *    docs/workbench/07-native-integrations.md, is that page's only non-admitted line (a heading named, a command served),
 *    and the roster's recipe ids and slugs are the bead title's W1-W8 range and the slug vocabulary; E2 six command lines
 *    with the inputs unquoted, braced, command-substituted, template-interpolated, negated in prose, or in the literal
 *    REV/PATH form read served on the same page.
 *  M, the matchers: M1 lineVerdict and its five mention families on planted lines (each family; served, negated; and the
 *    near misses Pi's own docs hold: its workflow "## Recipes", W-numbered requirements, hyperunix.find, "HX query"); M2
 *    the hx command form; M3 the launch, literal and settingSources scans on planted modules.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes): Q1
 *    R-PARAPHRASE a recipe retold without its slug, page, number, decision class, skill name or an hx command reads none;
 *    Q2 R-SPLIT-COMMAND an hx command broken across lines before its first option or verb reads none on both lines; Q3
 *    R-OUTSIDE-POPULATION code, tests, fixtures, vendored files and the other dot directories are not read (this census's
 *    own roster carries every recipe heading and command, and reads served); Q4 R-ANY-MARKER a not-served marker anywhere
 *    on a mention line admits it, whatever the marker qualifies; Q5 R-OUTSIDE-VOCABULARY a skill named outside the skill
 *    forms, an hx verb outside the captured inventory and the generic outcome names left out of DECISION_CLASSES read
 *    none; Q6 R-OPERATOR-CONFIG an operator's own workbench.settingSources ["user"] passes the settings parse and reaches the
 *    SDK options verbatim, so a Claude-backend session reaches ~/.claude/skills (an hx target; the wb-kqx.5 filing's
 *    positive, not measured here) outside every default and document this census reads; Q7 R-HEADLESS-BODY a recipe body line copied without its heading and holding no mention or
 *    command (W7 step 3) reads none; Q8 R-BOUND-LAUNCH a launch whose command arrives through a binding or an expression is
 *    not seen by N3's literal scan.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the out-of-file roster
 * test/fixtures/hx-recipe-serving-roster.json holds every row's id, label and pins, every pin's witness, the residual
 * names, the vocabularies, the hx capture and the recipe extract, so a pin deleted, relabelled, swapped for another passing
 * case or removed from every literal of this file at once still reds against it; the tracked bead export
 * (.beads/issues.jsonl) holds rows G, N and E's labels (the wb-ts6.1 title and notes; read against this file's labels and
 * again against the roster's), the W1-W8 range E1 holds the recipes to, and the wb-kqx.5 tables G1 holds the roots and
 * targets to; G1-G3 and N1-N3 read src, README, the docs and the loader at run time.
 * SCOPE: the recipe extract and the hx capture are producer and host facts at 694570cd00c2 and hx 0.1.0; Pi vendors no hx
 * source, so a producer change is seen only when the roster is re-captured. The parent Pi session's own skill discovery
 * belongs to @earendil-works/pi-coding-agent and is not read here. The armed half - a serving Pi doc/example bound to the
 * operator-contract wording and pointing at the installed skill (a wb-973.15/wb-973.16-style docs census sentence) - is owed
 * only when the gate arms: an hx target inside a loader root (G1, G2 red), a Pi default or documented example reaching the
 * user source (G3 red), or a Pi document presenting a recipe (N1 red); none is added here.
 *
 * Display paths added: none. Test-only: the scratch HOME, the stand-in skills and the recording SDK query live in
 * makeScratch scratch; src, docs, README, the roster and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { Options, SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { getAgentDir } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { DEFAULT_AGENTS } from "../src/default-agents.js";
import { loadSettings } from "../src/settings.js";
import { preloadSkills } from "../src/skill-loader.js";
import { type CapabilityDescriptor, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const BEAD = "wb-ts6.1";
const GATE_BEAD = "wb-kqx.5";
const ROSTER_PATH = join(HERE, "fixtures", "hx-recipe-serving-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const LOADER = join(SRC, "skill-loader.ts");
const README = join(REPO, "README.md");
const SKILL = "hyper-unix";
/** The variable getAgentDir() reads before its ~/.pi/agent default (README "Skill Preloading", $PI_CODING_AGENT_DIR). */
const AGENT_DIR_ENV = "PI_CODING_AGENT_DIR";
const PLACEHOLDER = `(Skill "${SKILL}" not found in .pi/skills/, .agents/skills/, or global skill locations)`;

/* ---------------------------------------------------------------------------------------------------------------------------
 * The vocabularies; every one is held to the roster.
 * ------------------------------------------------------------------------------------------------------------------------- */

const RECIPE_IDS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const RECIPE_SLUGS = [
  "branch-landing-audit",
  "changed-paths-between",
  "worktree-lane-census",
  "source-orientation",
  "absence-certificate",
  "change-impact-report",
  "mutation-impact-preflight",
  "bounded-preflight",
  "named-query-lifecycle",
];
const RECIPE_PAGES = ["06-workflow-recipes", "feedback-query-skill-factory"];
const DECISION_CLASSES = [
  "BRANCH_ANCESTOR_OF_TRUNK",
  "SAME_BLOB_AT_PATH",
  "DIFFERENT_BLOB",
  "PATH_MISSING_ONE_SIDE",
  "CHANGED_PATHS_REPORTED",
  "HISTORY_INCOMPLETE",
  "RENAME_OR_CONTENT_COMPARISON_NEEDED",
  "KNOWN_PRESENT",
  "KNOWN_ABSENT_IN_SCOPE",
  "UNTOUCHED_IN_RANGE",
  "UNKNOWN_PATH_EXISTENCE",
  "HISTORY_TRUNCATED",
  "COMPLETE_WITHIN_DECLARED_SCOPE",
  "KNOWN_AFFECTED_SUBSET",
];
const SKILL_NAMES = ["hyper-unix", "install-skill"];
const HX_VERBS = [
  "apply",
  "children",
  "config",
  "create",
  "definitions",
  "dependencies",
  "dependents",
  "descendants",
  "exec",
  "explain",
  "explain-query",
  "exports",
  "find",
  "fs",
  "git",
  "help",
  "hxs",
  "init",
  "install-skill",
  "materialize",
  "members",
  "move",
  "mutation",
  "observer",
  "ocaml",
  "parent",
  "plan",
  "query",
  "references",
  "remove",
  "rename",
  "run",
  "schema",
  "select",
  "show",
  "watch",
];
const SERVED_WORDS = ["available", "installed", "load", "loaded", "loads", "reachable", "run", "runs", "served", "serves", "serving", "ships", "use", "uses"];
const NOT_SERVED_MARKERS = [
  "absent",
  "can't",
  "cannot",
  "disjoint",
  "doesn't",
  "don't",
  "gated",
  "isn't",
  "never",
  "no",
  "none",
  "not",
  "unavailable",
  "unreachable",
  "unserved",
  "until",
  "won't",
];
/** The Pi document population: every regular file below these roots, and the repo-root Markdown. */
const DOC_ROOTS = ["docs", "examples", "new-feedback", ".agents", ".pi"];
/** The top-level trees outside the population (with every top-level dot directory not in DOC_ROOTS): code, tests, vendored and built files. */
const OUT_OF_POPULATION = ["coverage", "dist", "media", "node_modules", "qa", "src", "test", "vendor"];

/* ---------------------------------------------------------------------------------------------------------------------------
 * The line reader rows N and E judge with.
 * ------------------------------------------------------------------------------------------------------------------------- */

const alternation = (words: readonly string[]): string => words.map(word => word.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&")).join("|");
/** Whole words; an underscore joins (KNOWN_ABSENT_IN_SCOPE holds no marker) while a hyphen separates (not-found holds one). */
const wordsPattern = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9'_])(?:${alternation(words)})(?![A-Za-z0-9'_])`, "i");
const SLUG = new RegExp(`(?<![A-Za-z0-9_-])(?:${alternation(RECIPE_SLUGS)})(?![A-Za-z0-9_-])`, "i");
const PAGE = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(RECIPE_PAGES)})(?![A-Za-z0-9_])`, "i");
const RECIPE_NUMBER = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(RECIPE_IDS)})(?![A-Za-z0-9_])`);
/** A recipe number counts only beside an HX word: Pi's own W-numbered requirements are not recipes. */
const HX_CONTEXT = /hyper-?unix|(?<![A-Za-z0-9_.-])hx(?![A-Za-z0-9_])|HXFS|recipe|skill/i;
const DECISION_CLASS = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(DECISION_CLASSES)})(?![A-Za-z0-9_])`);
const SKILL_NAME = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(SKILL_NAMES)})(?![A-Za-z0-9_])|(?<![A-Za-z0-9_])(?:hyper-?unix|hx)\\s+skill(?![A-Za-z0-9_])`, "i");
/** An hx shell invocation: the lowercase binary name (a path to it allowed) then an option or a verb of the captured inventory. */
const HX_COMMAND = new RegExp(`(?<![A-Za-z0-9_.-])hx\\s+(?:--?[A-Za-z]|(?:${alternation(HX_VERBS)})(?![A-Za-z0-9_-]))`);
const SERVED = wordsPattern(SERVED_WORDS);
const NOT_SERVED = wordsPattern(NOT_SERVED_MARKERS);

const FAMILIES: ReadonlyArray<readonly [string, (line: string) => boolean]> = [
  ["slug", line => SLUG.test(line)],
  ["page", line => PAGE.test(line)],
  ["number", line => RECIPE_NUMBER.test(line) && HX_CONTEXT.test(line)],
  ["class", line => DECISION_CLASS.test(line)],
  ["skill", line => SKILL_NAME.test(line)],
];
const mentionFamilies = (line: string): string[] => FAMILIES.filter(([, hit]) => hit(line)).map(([name]) => name);

type LineVerdict = "none" | "named" | "negated" | "served";
/**
 * One line: an hx command form is served whatever else the line says (a shown command is the embedded recipe step the
 * bead's falsifier names); else no recipe mention is none; a mention with a not-served marker is negated; with a served
 * word it is served; else named. Row N admits only none and negated lines.
 */
function lineVerdict(line: string): LineVerdict {
  if (HX_COMMAND.test(line)) return "served";
  if (mentionFamilies(line).length === 0) return "none";
  if (NOT_SERVED.test(line)) return "negated";
  return SERVED.test(line) ? "served" : "named";
}

interface Judged {
  readonly named: string[];
  readonly negated: string[];
  readonly served: string[];
}
function judge(files: ReadonlyArray<readonly [string, string]>): Judged {
  const judged: Judged = { named: [], negated: [], served: [] };
  for (const [path, text] of files) {
    text.split("\n").forEach((line, index) => {
      const verdict = lineVerdict(line);
      if (verdict !== "none") judged[verdict].push(`${path}:${index + 1}`);
    });
  }
  return judged;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The judged rows; their shape is pinned below and held to the roster and the bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "G",
    label: "gate: skill reachable via an install target in a Pi loader root or operator settingSources",
    pins: ["G1", "G2", "G3"],
  },
  {
    id: "N",
    label: "until then a census-style negative records that no Pi document presents the recipes as served",
    pins: ["N1", "N2", "N3"],
  },
  {
    id: "E",
    label: "a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted/interpolated REV/BASE/PATH",
    pins: ["E1", "E2"],
  },
  {
    id: "M",
    label: "the matchers rows G, N and E read catch every spelling family they name and leave the near misses clean",
    pins: ["M1", "M2", "M3"],
  },
  {
    id: "R",
    label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
  },
];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-PARAPHRASE",
  Q2: "R-SPLIT-COMMAND",
  Q3: "R-OUTSIDE-POPULATION",
  Q4: "R-ANY-MARKER",
  Q5: "R-OUTSIDE-VOCABULARY",
  Q6: "R-OPERATOR-CONFIG",
  Q7: "R-HEADLESS-BODY",
  Q8: "R-BOUND-LAUNCH",
};

/* ---------------------------------------------------------------------------------------------------------------------------
 * The out-of-file anchors: the roster and the tracked bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function asJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
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
interface RosterRecipe {
  readonly id: string;
  readonly heading: string;
  readonly commands: readonly string[];
}
interface Roster {
  readonly installTargets: readonly string[];
  readonly loaderRoots: readonly string[];
  readonly recipes: readonly RosterRecipe[];
  readonly vocabulary: Readonly<Record<string, readonly string[]>>;
  readonly residuals: Readonly<Record<string, string>>;
  readonly rows: readonly RosterRow[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function parseRoster(text: string): Roster {
  const raw: unknown = JSON.parse(text);
  if (!isObject(raw) || !isObject(raw.hxInstall) || !Array.isArray(raw.hxInstall.targets) || !Array.isArray(raw.recipes) || !isObject(raw.vocabulary)) {
    throw new Error("the roster must be an object with hxInstall.targets, recipes and vocabulary");
  }
  if (!Array.isArray(raw.rows) || !isObject(raw.residuals)) throw new Error("the roster must carry rows and residuals");
  const installTargets = raw.hxInstall.targets.map((target: unknown, index: number): string => {
    if (!isObject(target) || typeof target.agent !== "string" || typeof target.dir !== "string") throw new Error(`roster hxInstall.targets[${index}] needs an agent and a dir`);
    return target.dir;
  });
  const recipes = raw.recipes.map((recipe: unknown, index: number): RosterRecipe => {
    if (!isObject(recipe) || typeof recipe.id !== "string" || typeof recipe.heading !== "string") throw new Error(`roster recipes[${index}] needs an id and a heading`);
    return { id: recipe.id, heading: recipe.heading, commands: stringsOf(recipe.commands, `roster recipes[${index}].commands`) };
  });
  const vocabulary: Record<string, readonly string[]> = {};
  for (const [name, words] of Object.entries(raw.vocabulary)) vocabulary[name] = stringsOf(words, `roster vocabulary.${name}`);
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
  const residuals: Record<string, string> = {};
  for (const [pin, name] of Object.entries(raw.residuals)) {
    if (typeof name !== "string") throw new Error(`roster residual ${pin} must name a family`);
    residuals[pin] = name;
  }
  return { installTargets, loaderRoots: stringsOf(raw.loaderRoots, "roster loaderRoots"), recipes, vocabulary, residuals, rows };
}
let rosterCache: Roster | undefined;
/** Read on first use, so a missing or malformed roster reds every case that needs it rather than the file's collection. */
function roster(): Roster {
  rosterCache ??= parseRoster(readFileSync(ROSTER_PATH, "utf8"));
  return rosterCache;
}
function rosterWitness(pin: string): Json {
  const found = roster().rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** One row of the tracked bead export, by id. */
function exportRow(id: string): { [key: string]: unknown } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return row;
  }
  throw new Error(`the tracked bead export holds no ${id} row`);
}
function fieldOf(row: { [key: string]: unknown }, field: string): string {
  const value = row[field];
  if (typeof value !== "string") throw new Error(`the ${String(row.id)} export row carries no ${field}`);
  return value;
}
function matchOf(text: string, pattern: RegExp, what: string): RegExpExecArray {
  const match = pattern.exec(text);
  if (match === null) throw new Error(`no ${what}`);
  return match;
}
/** The wb-ts6.1 owner filing's three clauses rows G, N and E carry: the title's gate, the notes' until-then negative and falsifier. */
function exportClauses(): string[] {
  const row = exportRow(BEAD);
  const gate = matchOf(fieldOf(row, "title"), /\((gate: [^;)]+); wb-kqx\.5\)/, `${BEAD} title gate clause`)[1];
  const notes = fieldOf(row, "notes");
  const negative = matchOf(notes, /; (until then a census-style negative records that no Pi document presents the recipes as served)\./, `${BEAD} until-then clause`)[1];
  const falsifier = matchOf(notes, /, with (a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted\/interpolated REV\/BASE\/PATH); /, `${BEAD} falsifier clause`)[1];
  return [gate ?? "", negative ?? "", falsifier ?? ""];
}
/** The recipe ids the bead title names as a range ("When W1-W8 hyper-unix recipes"), expanded. */
function titleRecipeIds(): string[] {
  const range = matchOf(fieldOf(exportRow(BEAD), "title"), /When W(\d)-W(\d) hyper-unix recipes/, `${BEAD} title recipe range`);
  const from = Number(range[1]);
  const to = Number(range[2]);
  return Array.from({ length: to - from + 1 }, (_, index) => `W${from + index}`);
}
/** The wb-kqx.5 filing's two tables (closed bead, tracked export): Pi's five loader roots and hx's ten install targets. */
function gateFiling(): { piRoots: string[]; hxTargets: string[] } {
  const description = fieldOf(exportRow(GATE_BEAD), "description");
  const ticks = (text: string): string[] => [...text.matchAll(/`([^`]+)`/g)].map(match => match[1] ?? "");
  const piRoots = ticks(matchOf(description, /Pi resolves `skills:` from (.+?);/, `${GATE_BEAD} Pi root table`)[1] ?? "");
  const targets = matchOf(description, /`hx install-skill` targets `([^`]+)` and nine agent homes \(([^)]+)\)/, `${GATE_BEAD} hx target table`);
  return { piRoots, hxTargets: [targets[1] ?? "", ...ticks(targets[2] ?? "").map(home => `${home}/${SKILL}`)] };
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Walks, AST readers and the hermetic HOME.
 * ------------------------------------------------------------------------------------------------------------------------- */

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
  return files.sort();
}
/** The same set by node's own recursive listing: the control that holds filesBelow to every regular file at every depth. */
function listedBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name))
    .sort();
}
const repoPath = (path: string): string => relative(REPO, path);
const rootMarkdown = (): string[] =>
  readdirSync(REPO, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .map(entry => join(REPO, entry.name))
    .sort();
const docFiles = (): string[] => [...DOC_ROOTS.flatMap(root => filesBelow(join(REPO, root))), ...rootMarkdown()].sort();
const docTexts = (): Array<readonly [string, string]> => docFiles().map(file => [repoPath(file), readFileSync(file, "utf8")] as const);
const srcModules = (): string[] => filesBelow(SRC).filter(file => file.endsWith(".ts"));
const outsidePopulation = (path: string): boolean => {
  const top = path.split("/")[0] ?? "";
  return OUT_OF_POPULATION.includes(top) || (top.startsWith(".") && path.includes("/") && !DOC_ROOTS.includes(top));
};
/** Every Markdown file of the checkout outside the out-of-population trees: the independent walk N1's population is held to. */
function markdownOutside(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const found: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !(directory === REPO && outsidePopulation(`${entry.name}/`))) found.push(...markdownOutside(path));
    else if (entry.isFile() && entry.name.endsWith(".md")) found.push(path);
  }
  return found.sort();
}

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
/** The loader's root list (the `roots` array of src/skill-loader.ts), each join() call rendered: cwd <cwd>, getAgentDir() <agentDir>, homedir() ~. */
function loaderRootsOf(text: string): string[] {
  const roots: string[] = [];
  const segment = (node: ts.Expression): string => {
    if (ts.isIdentifier(node) && node.text === "cwd") return "<cwd>";
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "getAgentDir") return "<agentDir>";
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "homedir") return "~";
    if (ts.isStringLiteralLike(node)) return node.text;
    return "<?>";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "roots" && node.initializer !== undefined && ts.isArrayLiteralExpression(node.initializer)) {
      for (const element of node.initializer.elements) {
        roots.push(ts.isCallExpression(element) && calleeName(element) === "join" ? element.arguments.map(segment).join("/") : "<?>");
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parse("skill-loader.ts", text));
  return roots;
}
/** README "Skill Preloading" discovery-roots table, one root per row (a row's stated default wins over its variable form). */
function readmeRootsOf(text: string): string[] {
  const lines = text.split("\n");
  const start = lines.findIndex(line => line.startsWith("**Discovery roots**"));
  if (start < 0) throw new Error("README has no **Discovery roots** table");
  const roots: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (roots.length > 0 && !line.startsWith("|")) break;
    if (!line.startsWith("|") || /^\|\s*(?:Scope|-)/.test(line)) continue;
    const cell = line.split("|")[2] ?? "";
    const stated = /\(default `([^`]+)`\)/.exec(cell)?.[1] ?? /`([^`]+)`/.exec(cell)?.[1] ?? "<?>";
    roots.push(stated.replace(/\/$/, ""));
  }
  return roots;
}
const LAUNCH_NAMES = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"];
/** One module's process launches whose command is a string literal, as file:callee:command. */
function launchSites(fileName: string, text: string): string[] {
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const first = node.arguments[0];
      if (name !== undefined && LAUNCH_NAMES.includes(name) && first !== undefined && ts.isStringLiteralLike(first)) sites.push(`${fileName}:${name}:${first.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return sites;
}
const launchesHx = (site: string): boolean => /(?:^|\/)hx$/.test(site.split(":").slice(2).join(":"));
/** Every string and template literal line of one module the line reader reads as a recipe mention or an hx command, as file:line. */
function literalHits(fileName: string, text: string): string[] {
  const hits: string[] = [];
  const source = parse(fileName, text);
  const visit = (node: ts.Node): void => {
    const texts = ts.isStringLiteralLike(node) ? [node.text] : ts.isTemplateExpression(node) ? [node.head.text, ...node.templateSpans.map(span => span.literal.text)] : [];
    if (texts.some(literal => literal.split("\n").some(line => lineVerdict(line) !== "none"))) hits.push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return hits;
}
/** Every settingSources property a module hands on, by its value: [], ?? [] (a default), <name>=<class> (a local binding), or value. */
function settingSourcesSites(fileName: string, text: string): string[] {
  const source = parse(fileName, text);
  const bindings = new Map<string, ts.Expression>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) bindings.set(node.name.text, node.initializer);
    ts.forEachChild(node, collect);
  };
  collect(source);
  const classOf = (value: ts.Expression, depth = 0): string => {
    if (ts.isArrayLiteralExpression(value) && value.elements.length === 0) return "[]";
    if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken && ts.isArrayLiteralExpression(value.right) && value.right.elements.length === 0) {
      return "?? []";
    }
    const bound = ts.isIdentifier(value) ? bindings.get(value.text) : undefined;
    if (ts.isIdentifier(value) && bound !== undefined && depth === 0) return `${value.text}=${classOf(bound, 1)}`;
    return "value";
  };
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "settingSources") sites.push(`${fileName}:${classOf(node.initializer)}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** The install targets lying inside any of the loader roots (a target is inside when it is the root or below it). */
const targetsInside = (targets: readonly string[], roots: readonly string[]): string[] =>
  targets.filter(target => roots.some(root => target === root || target.startsWith(`${root}/`)));
interface Example {
  readonly file: string;
  readonly sources: string[];
}
/** Every settingSources example a document shows as an array literal, with the sources it names. */
const docExamples = (files: ReadonlyArray<readonly [string, string]>): Example[] =>
  files.flatMap(([path, text]) =>
    [...text.matchAll(/settingSources["'`]?\s*[:=]\s*\[([^\]]*)\]/g)].map(match => ({ file: path, sources: [...(match[1] ?? "").matchAll(/[A-Za-z]+/g)].map(word => word[0]) })),
  );
const userExamplesOf = (examples: readonly Example[]): string[] => examples.filter(example => example.sources.includes("user")).map(example => example.file);
const declares = (skills: unknown): boolean => Array.isArray(skills) && skills.includes(SKILL);
/** The descriptors whose JSON the line reader flags (a recipe mention or an hx command anywhere in the descriptor). */
const flaggedOf = (descriptors: ReadonlyArray<{ readonly id: string }>): string[] =>
  descriptors.filter(descriptor => lineVerdict(JSON.stringify(descriptor)) !== "none").map(descriptor => descriptor.id);
/** The skills a Markdown agent definition's frontmatter declares (null when it declares none). */
function frontmatterSkills(text: string): string[] | null {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  const header = end < 0 ? "" : text.slice(4, end);
  const line = header.split("\n").find(entry => entry.startsWith("skills:"));
  return line === undefined ? null : line.slice("skills:".length).split(",").map(name => name.trim()).filter(name => name.length > 0);
}

/** Runs one case with HOME and the Pi agent dir inside fresh scratch, so no host skill, setting or install is read. */
function withHome<T>(work: (home: string, cwd: string) => T): T {
  const home = makeScratch("hx-recipe-home-");
  const cwd = makeScratch("hx-recipe-cwd-");
  const saved = { home: process.env.HOME, agentDir: process.env[AGENT_DIR_ENV] };
  process.env.HOME = home;
  delete process.env[AGENT_DIR_ENV];
  const restore = (): void => {
    if (saved.home === undefined) delete process.env.HOME;
    else process.env.HOME = saved.home;
    if (saved.agentDir === undefined) delete process.env[AGENT_DIR_ENV];
    else process.env[AGENT_DIR_ENV] = saved.agentDir;
    removeScratch(home, cwd);
  };
  try {
    const result = work(home, cwd);
    if (result instanceof Promise) {
      return result.finally(restore) as T;
    }
    restore();
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}
const STAND_IN = `---\nname: ${SKILL}\ndescription: census stand-in\n---\n# stand-in\n`;
function plantSkill(directory: string): void {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "SKILL.md"), STAND_IN);
}
const onDisk = (root: string, home: string, cwd: string): string => root.replace("<cwd>", cwd).replace(/^~/, home);

/** A Claude host whose injected SDK query records the options it is handed and answers one init and one result. */
async function claudeOptions(cwd: string, settingSources?: Options["settingSources"]): Promise<Options | undefined> {
  let captured: Options | undefined;
  const host = createClaudeWorkflowHost({
    cwd,
    ...(settingSources === undefined ? {} : { settingSources }),
    query: ({ options }) => {
      captured = options;
      return (async function* () {
        yield { type: "system", subtype: "init", session_id: "census", model: "census-model", tools: [] } as unknown as SDKMessage;
        yield { type: "result", subtype: "success", session_id: "census", result: "done", is_error: false, modelUsage: {} } as unknown as SDKMessage;
      })();
    },
  });
  await host.spawnAgent({ agentId: "census", index: 0, label: "census", prompt: "census", agentType: "general-purpose" });
  return captured;
}

const neverInvoked = (what: string) => (): never => {
  throw new Error(`census ${what}: never invoked`);
};
/** Every hyperunix.* descriptor Pi registers (the native providers and the injected reader), and any descriptor the line reader flags. */
async function hxSurface(): Promise<{ typed: string[]; flagged: string[] }> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, REPO);
  const injected = new CapabilityRegistry();
  registerHyperUnixFind(injected, { find: neverInvoked("hyperunix find"), runtime: neverInvoked("hyperunix runtime"), close: async () => {} }, REPO);
  const all: CapabilityDescriptor[] = [...registry.catalogSnapshot(), ...injected.catalogSnapshot()].map(entry => entry.descriptor);
  return {
    typed: all
      .filter(descriptor => descriptor.id.startsWith("hyperunix."))
      .map(descriptor => `${descriptor.id}:${descriptor.effectClass}:${(descriptor.contractSource ?? "").replace(/@\d[^:@]*:/, "@<version>:")}`),
    flagged: flaggedOf(all),
  };
}

/** The page a planted line lands on: the HX provider page, the likeliest home of a serving example. */
const PLANT_PAGE = "docs/workbench/07-native-integrations.md";
/** One line appended to a copy of PLANT_PAGE: its verdict, or every unexpected change the plant made to the page's reading. */
function plantedVerdict(line: string): string {
  const text = readFileSync(join(REPO, PLANT_PAGE), "utf8");
  const body = text.endsWith("\n") ? text : `${text}\n`;
  const at = `${PLANT_PAGE}:${body.split("\n").length}`;
  const before = judge([[PLANT_PAGE, body]]);
  const after = judge([[PLANT_PAGE, `${body}${line}\n`]]);
  const kinds = ["named", "negated", "served"] as const;
  const changed = kinds.flatMap(kind => after[kind].filter(entry => !before[kind].includes(entry)).map(entry => `${kind}@${entry}`));
  if (changed.length === 1 && changed[0] === `${changed[0]?.split("@")[0]}@${at}`) return changed[0]?.split("@")[0] ?? "";
  return `unexpected:${changed.join(",")}|before:${kinds.map(kind => before[kind].length).join("/")}`;
}

const digestOf = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
const sub = (name: string): string => ["$", "{", name, "}"].join("");

/* ---------------------------------------------------------------------------------------------------------------------------
 * The planted cases rows E, M and R read (witnesses carry digests, never the text).
 * ------------------------------------------------------------------------------------------------------------------------- */

/** Row E2: the producer's command lines with REV/BASE/PATH-class inputs unquoted, braced, substituted or interpolated. */
const UNQUOTED_CASES: readonly string[] = [
  "hx --workspace $ROOT git merge-base $TRUNK $BRANCH",
  `hx --workspace "$ROOT" git history --first-parent --since-rev ${sub("BASE")}..${sub("TRUNK")} ${sub("PATH")}`,
  'hx --workspace "$ROOT" git diff "$(git rev-parse HEAD)" "$BRANCH"',
  `const argv = \`hx --workspace ${sub("root")} show git:${sub("rev")}:${sub("path")}\`;`,
  "never run hx --workspace $ROOT git diff $TRUNK $BRANCH with the inputs unquoted",
  "hx show git:REV:PATH",
];
const LINE_CASES: ReadonlyArray<readonly [string, LineVerdict]> = [
  ["## W1 — branch-landing-audit (P0)", "named"],
  ["the absence-certificate recipe is served to every Pi agent", "served"],
  ["Pi never serves the worktree-lane-census recipe", "negated"],
  ["see docs/programs/feedback-query-skill-factory-2026-10-16/06-workflow-recipes.md", "named"],
  ["Outcomes: `KNOWN_PRESENT`, `KNOWN_ABSENT_IN_SCOPE` and `UNTOUCHED_IN_RANGE`", "named"],
  ["skills: hyper-unix", "named"],
  ["the hyper-unix skill is available to every hosted agent", "served"],
  ["load the HyperUnix skill before the review", "served"],
  ["HX recipe W5 is reachable from the reviewer role", "served"],
  ["a hosted agent declaring the skill gets the not-found placeholder after hx-install-skill", "negated"],
  ["## Recipes", "none"],
  ["W5 of the Pi workbench program", "none"],
  ["W10 stamped claim guard", "none"],
  ["`hyperunix.find` uses the typed HX SDK with native coverage", "none"],
  ["contractSource @hyperunix/sdk@0.1.0:HyperUnix.find", "none"],
  ["absence is licensed only by complete coverage", "none"],
  ["source orientation reads members first", "none"],
  ["Read-only HX query", "none"],
];
const COMMAND_CASES: ReadonlyArray<readonly [string, boolean]> = [
  ["`hx --workspace . find --kind hx.fs/regular-file src`", true],
  ["~/.local/bin/hx git diff a b", true],
  ["hx help members", true],
  ["run `hx members FILE` first", true],
  ["| hx query show | the saved definition |", true],
  ["Read-only HX query", false],
  ["the hx binary", false],
  ["the hx live-tier census", false],
  ["test/workbench-hx-live-tier-census.test.ts", false],
  ["new-feedback/2026-10-17-hx-install-skill-writes-ten-targets", false],
  ["the build identity an installed hx prints", false],
  ["hx.fs/regular-file", false],
  ["phx git push", false],
];
/** [module text, launches with a literal command, of them hx]. */
const LAUNCH_CASES: ReadonlyArray<readonly [string, number, number]> = [
  ['import { spawn } from "node:child_process";\nspawn("hx", ["git", "diff", "a", "b"]);', 1, 1],
  ['import { execFileSync } from "node:child_process";\nexecFileSync("/home/user/.local/bin/hx", ["show", "x"]);', 1, 1],
  ['import { execFileSync } from "node:child_process";\nexecFileSync("git", ["status"]);', 1, 0],
  ['await pi.exec("hx", ["--version"]);', 1, 1],
];
/** [module text, literal hits]. */
const LITERAL_CASES: ReadonlyArray<readonly [string, number]> = [
  ['const help = "run hx --workspace . git diff a b";', 1],
  ["const note = `the hyper-unix skill is available`;", 1],
  ['const id = "hyperunix.find";', 0],
  ["// the hyper-unix skill is available\nconst id = 1;", 0],
];
/** [module text, settingSources sites]. */
const SITE_CASES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["const o = { settingSources: config.settingSources ?? [] };", ["case.ts:?? []"]],
  ['const o = { settingSources: ["user"] };', ["case.ts:value"]],
  ["const s = c.settingSources ?? [];\nconst o = { settingSources: s };", ["case.ts:s=?? []"]],
  ["const o = { settingSources: [] };", ["case.ts:[]"]],
];

/** The real Pi doc line row N's floor names: the wb-kqx.5 receipt line in the byte-frozen TRACEABILITY.md, which names the hx installer and says the skill is not found. */
const DOC_FLOOR = ["docs/workbench/TRACEABILITY.md:236"];
/** Launch sites src really has, so N3's scan is shown to see launches at all. */
const LAUNCH_FLOOR = ["src/env.ts:exec:git", "src/index.ts:execFileSync:git", "src/workbench/providers/reactivefiber.ts:spawn:rf"];
/** N3's control: a descriptor whose description shows an hx command, which the flagged reader must name. */
const PLANTED_DESCRIPTOR = { id: "census.planted", description: "runs hx git diff for the hosted agent" };
/** The doc whose settingSources example G3 reads as its floor. */
const EXAMPLE_FLOOR = "docs/workbench/13-contracts-and-config.md";

const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  G1: () =>
    withHome(home => {
      const agentDir = `~/${relative(home, getAgentDir())}`;
      const source = loaderRootsOf(readFileSync(LOADER, "utf8"));
      const roots = source.map(root => root.replace("<agentDir>", agentDir));
      const readme = readmeRootsOf(readFileSync(README, "utf8"));
      const filing = gateFiling();
      const targets = [...roster().installTargets];
      const inside = targetsInside(targets, roots);
      const insideControl = targetsInside(targets, [...roots, "~/.skills"]);
      expect(roots).toEqual([...roster().loaderRoots]);
      expect(readme).toEqual(roots);
      expect(filing.piRoots).toEqual(roots);
      expect(targets).toEqual(filing.hxTargets);
      expect(inside).toEqual([]);
      expect(insideControl).toEqual(["~/.skills/hyper-unix"]);
      return { source, agentDir, roots, targets, inside, insideControl };
    }),
  G2: () =>
    withHome((home, cwd) => {
      const targets = roster().installTargets;
      for (const target of targets) plantSkill(onDisk(target, home, cwd));
      const placeholder = preloadSkills([SKILL], cwd)[0]?.content === PLACEHOLDER;
      const reached: string[] = [];
      for (const root of roster().loaderRoots) {
        const directory = join(onDisk(root, home, cwd), SKILL);
        plantSkill(directory);
        if (preloadSkills([SKILL], cwd)[0]?.content === STAND_IN.trim()) reached.push(root);
        rmSync(directory, { recursive: true, force: true });
      }
      expect(placeholder).toBe(true);
      expect(reached).toEqual([...roster().loaderRoots]);
      return { planted: targets.length, placeholder, reached };
    }),
  G3: async () => {
    const cwd = makeScratch("hx-recipe-claude-");
    let options: Options | undefined;
    try {
      options = await claudeOptions(cwd);
    } finally {
      removeScratch(cwd);
    }
    const defaultSources = asJson(options?.settingSources ?? null);
    const sites = srcModules().flatMap(file => settingSourcesSites(repoPath(file), readFileSync(file, "utf8")));
    const examples = docExamples(docTexts());
    const userExamples = userExamplesOf(examples);
    const userControl = userExamplesOf(docExamples([["control.md", '      "settingSources": ["user", "project"]']]));
    const floor = examples.filter(example => example.file === EXAMPLE_FLOOR).map(example => example.sources);
    expect(defaultSources).toEqual([]);
    expect(sites.filter(site => !/:(?:\[\]|\?\? \[\]|[A-Za-z]+=\?\? \[\])$/.test(site))).toEqual(["src/settings.ts:value"]);
    expect(floor).toEqual([["project"]]);
    expect(userExamples).toEqual([]);
    expect(userControl).toEqual(["control.md"]);
    return { defaultSources, sites, floor, userExamples, userControl };
  },
  N1: () => {
    const files = docFiles();
    const walkComplete = DOC_ROOTS.every(root => JSON.stringify(filesBelow(join(REPO, root))) === JSON.stringify(listedBelow(join(REPO, root))));
    const judged = judge(docTexts());
    const unread = markdownOutside(REPO)
      .filter(file => !files.includes(file))
      .map(repoPath);
    const floor = DOC_FLOOR.map(at => ({ at, verdict: judged.negated.includes(at) ? "negated" : judged.named.includes(at) || judged.served.includes(at) ? "admitted-wrongly" : "none" }));
    expect(walkComplete).toBe(true);
    expect(files.length).toBeGreaterThanOrEqual(100);
    expect(unread).toEqual([]);
    expect(floor.map(entry => entry.verdict)).toEqual(DOC_FLOOR.map(() => "negated"));
    expect(judged.named).toEqual([]);
    expect(judged.served).toEqual([]);
    return { walkComplete, atFloor: files.length >= 100, unread, rootMarkdown: rootMarkdown().map(repoPath), floor, named: judged.named, served: judged.served };
  },
  N2: () =>
    withHome(() => {
      const [hyper, beads] = preloadSkills([SKILL, "beads"], REPO);
      const placeholder = hyper?.content === PLACEHOLDER;
      const projectSkillRead = beads?.content.startsWith("---\nname: beads\n") === true;
      const agentFiles = filesBelow(join(REPO, ".pi", "agents"))
        .filter(file => file.endsWith(".md"))
        .map(file => ({ file: repoPath(file), skills: frontmatterSkills(readFileSync(file, "utf8")) }));
      const declaring = [
        ...agentFiles.filter(entry => declares(entry.skills)).map(entry => entry.file),
        ...[...DEFAULT_AGENTS].filter(([, config]) => declares(config.skills)).map(([name]) => name),
      ];
      const declaringControl = declares(frontmatterSkills(`---\ndescription: control\nskills: beads, ${SKILL}\n---\nbody\n`));
      expect(placeholder).toBe(true);
      expect(projectSkillRead).toBe(true);
      expect(agentFiles.length).toBeGreaterThanOrEqual(1);
      expect(DEFAULT_AGENTS.size).toBeGreaterThanOrEqual(1);
      expect(declaring).toEqual([]);
      expect(declaringControl).toBe(true);
      return { placeholder, projectSkillRead, agentFilesRead: agentFiles.length >= 1, defaultsRead: DEFAULT_AGENTS.size >= 1, declaring, declaringControl };
    }),
  N3: async () => {
    const modules = srcModules();
    const launches = modules.flatMap(file => launchSites(repoPath(file), readFileSync(file, "utf8")));
    const hxLaunches = launches.filter(launchesHx);
    const literals = modules.flatMap(file => literalHits(repoPath(file), readFileSync(file, "utf8")));
    const floorSeen = LAUNCH_FLOOR.filter(site => launches.includes(site));
    const surface = await hxSurface();
    const flaggedControl = flaggedOf([PLANTED_DESCRIPTOR]);
    expect(floorSeen).toEqual(LAUNCH_FLOOR);
    expect(hxLaunches).toEqual([]);
    expect(literals).toEqual([]);
    expect(surface.flagged).toEqual([]);
    expect(flaggedControl).toEqual(["census.planted"]);
    return { modules: modules.length >= 100, floorSeen, hxLaunches, literals, typed: surface.typed, flagged: surface.flagged, flaggedControl };
  },
  E1: () => {
    const recipes = roster().recipes;
    const headings = recipes.map(recipe => /^## (W\d) — (.+) \((P\d)\)$/.exec(recipe.heading));
    const slugs = headings.flatMap(match => (match?.[2] ?? "").split(" and "));
    const verdicts = recipes.map(recipe => ({ id: recipe.id, heading: plantedVerdict(recipe.heading), commands: recipe.commands.map(plantedVerdict) }));
    expect(recipes.map(recipe => recipe.id)).toEqual(titleRecipeIds());
    expect(headings.map(match => match?.[1] ?? null)).toEqual(titleRecipeIds());
    expect(slugs).toEqual(RECIPE_SLUGS);
    for (const entry of verdicts) {
      expect(["named", "served"]).toContain(entry.heading);
      for (const verdict of entry.commands) expect(verdict).toBe("served");
    }
    return verdicts;
  },
  E2: () => {
    const verdicts = UNQUOTED_CASES.map(text => [digestOf(text), plantedVerdict(text)]);
    for (const [, verdict] of verdicts) expect(verdict).toBe("served");
    return verdicts;
  },
  M1: () => {
    const lines = LINE_CASES.map(([text, expected]) => ({ digest: digestOf(text), verdict: lineVerdict(text), families: mentionFamilies(text), expected }));
    for (const entry of lines) expect(entry.verdict).toBe(entry.expected);
    return lines.map(({ digest, verdict, families }) => [digest, verdict, families]);
  },
  M2: () => {
    const commands = COMMAND_CASES.map(([text, expected]) => ({ digest: digestOf(text), hit: HX_COMMAND.test(text), expected }));
    for (const entry of commands) expect(entry.hit).toBe(entry.expected);
    return commands.map(({ digest, hit }) => [digest, hit]);
  },
  M3: () => {
    const launches = LAUNCH_CASES.map(([text, all, hx]) => {
      const sites = launchSites("case.ts", text);
      return { digest: digestOf(text), counts: [sites.length, sites.filter(launchesHx).length], expected: [all, hx] };
    });
    const literals = LITERAL_CASES.map(([text, hits]) => ({ digest: digestOf(text), hits: literalHits("case.ts", text).length, expected: hits }));
    const sites = SITE_CASES.map(([text, expected]) => ({ digest: digestOf(text), sites: settingSourcesSites("case.ts", text), expected: [...expected] }));
    for (const entry of launches) expect(entry.counts).toEqual(entry.expected);
    for (const entry of literals) expect(entry.hits).toBe(entry.expected);
    for (const entry of sites) expect(entry.sites).toEqual(entry.expected);
    return {
      launches: launches.map(({ digest, counts }) => [digest, ...counts]),
      literals: literals.map(({ digest, hits }) => [digest, hits]),
      sites: sites.map(({ digest, sites: found }) => [digest, ...found]),
    };
  },
  Q1: () => {
    const verdict = lineVerdict("To check whether trunk already carries a branch, ask HyperUnix for the merge base, the ancestry and the changed paths.");
    expect(verdict).toBe("none");
    return verdict;
  },
  Q2: () => {
    const verdicts = ["hx \\", '  --workspace "$ROOT" git diff "$LEFT" "$RIGHT"'].map(lineVerdict);
    expect(verdicts).toEqual(["none", "none"]);
    return verdicts;
  },
  Q3: () => {
    const outside = docFiles().map(repoPath).filter(outsidePopulation);
    const rosterServed = judge([[repoPath(ROSTER_PATH), readFileSync(ROSTER_PATH, "utf8")]]).served.length > 0;
    expect(outside).toEqual([]);
    expect(rosterServed).toBe(true);
    return { outside, rosterServed };
  },
  Q4: () => {
    const verdict = lineVerdict("the branch-landing-audit recipe is reachable here; only the W7 preflight is not");
    expect(verdict).toBe("negated");
    return verdict;
  },
  Q5: () => {
    const verdicts = ["the HyperUnix workflow skill serves every Pi agent", "hx frobnicate --now", "PROVIDER_PARTIAL and BUDGET_EXHAUSTED outcomes"].map(lineVerdict);
    expect(verdicts).toEqual(["none", "none", "none"]);
    return verdicts;
  },
  Q6: () =>
    withHome(async (_home, cwd) => {
      mkdirSync(join(cwd, ".pi"), { recursive: true });
      writeFileSync(join(cwd, ".pi", "subagents.json"), JSON.stringify({ workbench: { workflowAgentBackend: "claude", settingSources: ["user"] } }));
      const loaded = loadSettings(cwd).workbench?.settingSources;
      const options = await claudeOptions(cwd, loaded);
      const reached = asJson(options?.settingSources ?? null);
      expect(loaded).toEqual(["user"]);
      expect(reached).toEqual(["user"]);
      return { loaded: asJson(loaded ?? null), reached };
    }),
  Q7: () => {
    const verdict = lineVerdict("3. Preview the HX move/rename plan without apply. Compare advertised write/effect set against intended namespace change.");
    expect(verdict).toBe("none");
    return verdict;
  },
  Q8: () => {
    const bound = launchSites("case.ts", 'const bin = "hx";\nspawn(bin, ["git", "diff"]);').filter(launchesHx).length;
    const configured = launchSites("case.ts", 'spawn(process.env.HX_BIN ?? "hx", ["git", "diff"]);').filter(launchesHx).length;
    expect([bound, configured]).toEqual([0, 0]);
    return [bound, configured];
  },
};

describe("wb-ts6.1 hx recipe serving census (HXFS-PI-R5, until-then leg)", () => {
  it("the frozen shape (standing rule 16): every judged row and its pin count", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["G:3", "N:3", "E:2", "M:3", "R:8"]);
  });
  it("the owner filing's gate, until-then and falsifier clauses in the tracked bead export are rows G, N and E's labels", () => {
    expect(ROWS.slice(0, 3).map(row => row.label)).toEqual(exportClauses());
  });
  it("every judged pin has exactly one case", () => {
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });
  it("the out-of-file roster holds every row, label, pin, residual and vocabulary of this file", () => {
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      roster().rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(roster().rows.slice(0, 3).map(row => row.label)).toEqual(exportClauses());
    expect({ ...RESIDUALS }).toStrictEqual({ ...roster().residuals });
    expect({
      recipeIds: RECIPE_IDS,
      slugs: RECIPE_SLUGS,
      pages: RECIPE_PAGES,
      decisionClasses: DECISION_CLASSES,
      skillNames: SKILL_NAMES,
      hxVerbs: HX_VERBS,
      servedWords: SERVED_WORDS,
      notServedMarkers: NOT_SERVED_MARKERS,
      docRoots: DOC_ROOTS,
      outOfPopulation: OUT_OF_POPULATION,
    }).toStrictEqual(Object.fromEntries(Object.entries(roster().vocabulary).map(([name, words]) => [name, [...words]])));
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
