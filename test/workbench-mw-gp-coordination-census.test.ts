/**
 * wb-e66.5 (MW-GRAPH-POLICY-COORDINATION-R10, program-triage-2026-10-18), the GP-coordination adoption census.
 * Statement (bead title, verbatim): "Pi shall adopt no GP-conditioned coordination at runtime (no GP scoring in any
 * scheduling, assignment or control path) before the eight README.md:23@4b8b974ca72b acceptance terms are recorded and a
 * shadow-mode adapter plus opt-in canary with rollback exist; until then one census pins zero
 * GraphPolicy/GraphDataIR/mw.training-export references in src and test."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): "one vitest census (wb-cax.25 style) pins that grep at
 * 0 and names this bead; any future adoption must first add a dated TRACEABILITY row citing each of the eight gate receipts
 * and the shadow-mode run (zero control decisions issued, zero native verbs reached) before the census allowlist widens; a
 * canary without a recorded rollback path is refused by the same census." "That grep" is the filing's: "git grep -i
 * 'GraphPolicy|GraphDataIR|MicroPolicy|mw.training-export' over src test docs at 758ec18187a5 is empty".
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-26, at this census's base 32e0e2d). Producer (the local
 * MechanicalWorkflows checkout, git show / rev-parse; the roster's producer block holds the lines and blobs, and this
 * census never re-reads the producer): at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8,
 * docs/programs/graph-policy-coordination-2026-10-18/README.md (blob 0dbff582a14c) line 23 is the eight terms' sentence the
 * roster carries ("Original Policy/reconcile laws unchanged; pure GP call, exact source ID mapping, original behavior
 * probability, no native-effect bypass, stale result rejection, evidence sidecar parity and Forge-installed integration
 * tests before any runtime rollout."), line 3 opens "**2026-10-18; design-only.**", and the overview
 * docs/programs/graph-policy-coordination-2026-10-18.md (blob 01ff00d480ec) line 22 names the delivery order ending "then
 * opt-in canary with rollback". At MechanicalWorkflows origin/main 18b1cf9b7032 (read 2026-10-26) the README's acceptance
 * sentence has moved to line 25 and is reworded (for example "exact candidate-id and basis mapping"), and the overview
 * records a bounded shadow/canary bead-selection host in MechanicalWorkflows' own development rig ("CURRENT
 * (2026-10-21)"): a producer-side host for the producer's own bead selection, not a Pi adapter and not a Pi record, so
 * the gate this census arms is not opened by it; this census pins the filing's pin. Pi: at the filing pin
 * 758ec18187a5d66ba40b766caad38754b5313558 git's objects hold 115 src, 410 test and 59 docs blobs and none names a word
 * of the vocabulary. The filing's grep as typed is a basic regular expression in which "|" is a literal character, so it
 * matches only that string, bars included (0 files at 32e0e2d too); read as the alternation it names (git grep -i -E) it reads 0 at the pin
 * and 37 files at 32e0e2d: 0 in src, 34 in test, 3 in docs. Every one of the 34 test files belongs to a closed posture
 * census added 2026-10-22/23, after the pin (the censuses, helpers, rosters and vendored producer captures of wb-1xvp.2-.5,
 * wb-gxd7.1-.5, wb-ojm5.1/.2, wb-kjg9.1, wb-kku9.4 and wb-4wmu.1); the 3 docs files are docs/workbench/03's GraphPolicyCLI
 * boundary section and the wb-1xvp.3 / wb-1xvp.5 receipts, outside the statement's src-and-test scope. The one gp launch under
 * test/ is test/workbench-gp-control-loop-audit.test.ts's version probe (execFileSync("gp", ["--version"])), reached only
 * once that guard's audit document exists. No src file imports a GraphPolicyCLI or MicroPolicyCLI package or launches gp or
 * mp. No src, docs or tracker text is edited by this cut.
 *
 * READINGS (test/helpers/gp-mw-coordination-census.ts holds the tables and the judges; its gp- name puts it in the GraphPolicy
 * family holder class of the landed wb-kjg9.1 census, test/workbench-hx-gp-answer-invariance-census.test.ts B3, beside
 * this census module and its roster, which that census's census-module and census-roster classes already hold).
 * - VOCABULARY: the filing grep's four words, GraphPolicy, GraphDataIR, MicroPolicy and mw.training-export (the statement
 *   names three of them), each read case-insensitively with any run of space, tab, dot, underscore or hyphen between its
 *   parts (partsOf: dots, underscores, hyphens and camel-case humps), so graph-policy-cli, GRAPH_POLICY and
 *   mw_training_export are read too: a superset of the grep's alternation.
 * - MEANS: in a TS or JS file, read through the TypeScript parser: an import, export-from, import-equals, require or
 *   import() whose specifier names the vocabulary or is a bare gp / mp package (gp, gp/..., mp, mp/...); a call of one of
 *   node:child_process's launchers (spawn, spawnSync, exec, execSync, execFile, execFileSync, fork; bare or as a member)
 *   whose first argument (a string literal, a template's literal head, or a same-file const bound to a string literal)
 *   names gp or mp as its program (the file argument's last path segment, or a shell line's first word, lower-cased, a
 *   Windows launcher extension dropped) or names the vocabulary. A VERSION PROBE is gp or mp with the one argument
 *   --version (the whole argument list, or the whole shell line).
 * - THE SRC LEG (rows A and S): every file git would commit under src/ (tracked or untracked, never ignored; equal to a
 *   filesystem walk that follows no link, less git's ignored set): any vocabulary word anywhere in the text, and every
 *   means, is a finding. A version probe is a finding here: any gp or mp launch is adoption.
 * - THE TEST LEG (row S): the same listing under test/: every means except a version probe is a finding. The vocabulary
 *   in a test file is not a finding (residual R-TEST-MENTION, a pinned quiet row): the statement's test-tree zero held at
 *   the filing pin, where row A pins it from git's objects, and the posture guards that landed since name the words as
 *   the text they judge. What the test leg keeps is the statement's purpose: no test drives a GraphPolicyCLI or
 *   MicroPolicyCLI import or a gp / mp launch beyond a version probe, so no test runs GP-conditioned coordination through
 *   either binary or package. This cut's own three files name the vocabulary as text, so the test leg's reading of them is
 *   the positive control that it reads real text (a control anchored in this cut, never in another bead's files).
 * - THE FILING PIN (row A, A2): the vocabulary reader over every blob under src, test and docs (the filing grep's scope)
 *   at 758ec18187a5, read from git's objects, finds nothing, and the same call finds a planted blob.
 * - THE ALLOWLIST (rows B and C): ADOPTIONS (below) admits a src module or test file to carry findings. It is empty today.
 *   An adoption is admitted only when its receipt holds exactly one dated record naming its path that cites each of the
 *   eight terms (each on a line of its own: a line naming two terms is neither one's receipt), the shadow-mode run (both
 *   zero phrases on one line) and, for a canary, the rollback path, each on a line that also carries a receipt reference
 *   (a Forge command id cmd_<12 hex>, or a commit pin <anything>@<7-40 hex>). The record is a
 *   receipt entry, never a TRACEABILITY.md row: TRACEABILITY.md is frozen byte-exact (standing rule 13;
 *   test/workbench-traceability-freeze.test.ts reds every edit), and a dated record lands as a "## YYYY-MM-DD ..." entry of
 *   docs/workbench/receipts/<bead>.md (rule 15's shape), so a receipt path outside receipts/ is refused (receipt-route). A
 *   file with findings and no admitted adoption keeps its findings; an adoption of a path that carries nothing is stale;
 *   two adoptions of one path are refused.
 *
 * ROWS. A, the acceptance's first clause: A1 this file is the one vitest census, collected by the default tier (the shared
 * vitest config's include, never its exclude list); A2 the grep at 0 (the live src leg, its listing against the walk, a
 * planted file judged after the tracked ones, and the filing pin); A3 the suite names this bead and its requirement id.
 * B, the second clause: B1 the dated record (the route, the receipt, the record); B2 each of the eight terms, one per
 * dropped term, an unreferenced term line and one line naming every term; B3 the shadow-mode run and its two zero
 * phrases; B4 the allowlist (live
 * empty and equal to the src findings, unadmitted, admitted, stale, duplicate, another leg's adoption). C, the third
 * clause: C1 the canary's rollback path. S, the statement's census slice: S1 the vocabulary reader on its controls; S2 the
 * src leg's means reader on its controls; S3 the live test leg, its listing, its version probes and a scratch git
 * repository proving the listing (untracked files read, ignored files never). Q, the residuals' pinned quiet rows.
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row):
 * R-COMPOSED (Q1, a word composed at run time, escaped, or split by a no-break space), R-COMPUTED-LAUNCH (Q2, a computed
 * program, an environment value, a let binding, or a launcher reached through an alias, an element access or
 * Function.prototype.call), R-WRAPPED-LAUNCH (Q3, gp anywhere but a shell line's bare first word: a later command, an env
 * prefix, a quoted or grouped program word, another program's argument), R-OTHER-LAUNCHER (Q4, a launch or a load outside the seven child_process launchers and the five import
 * forms: a worker, another process library, a createRequire loader), R-TEST-MENTION (Q5, a test file
 * naming the vocabulary as text or a name) and R-LOCAL-SCORER (Q6, scoring or assignment code that names no word and
 * launches nothing: what GP-conditioned coordination means without GraphPolicyCLI is outside a text census).
 * NOT CLAIMED: docs/workbench and receipts (outside the statement's scope; docs/workbench/03's boundary section is
 * wb-1xvp.2's); the shadow-first order between a shadow and a canary adoption; that a cited reference resolves; a
 * symbolic link under src/ or test/ (neither listing holds it, and neither leg reads its target).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and every residual family's
 * member count as literals; the judged set (every row's id, label and pins, every pin's quote and witness, the residual
 * members, every registered test title) is held to the out-of-file roster test/fixtures/mw-gp-coordination-roster.json.
 * OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export (.beads/issues.jsonl) - each
 * acceptance clause is exactly one row's label, row S's label is a slice of the statement, and each row's pin quotes tile
 * its label with nothing but separators; the vocabulary is the filing grep's words, in order (the statement's three among
 * them), and its scopes and pin are the grep's; the eight terms are the filing's list; the shadow-mode run's phrases and
 * the rollback path are clause B's and clause C's words; the producer block's line carries every term. So a pin, a row, a
 * word or a term removed from every literal of this file, the helper and the roster together still reds. The last case
 * reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin
 * reached its witness compare, and each compare's own result).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI adapter, seam, package or fake binary.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, describe, expect, it, type TestContext } from "vitest";
import config from "../vitest.config.js";
import {
  type Adoption,
  acceptanceClauses,
  beadRow,
  datedEntries,
  type Entry,
  fileFindings,
  gitList,
  ignoredOf,
  legFindings,
  namedWords,
  PROGRAMS,
  partsOf,
  pinTree,
  QUOTES,
  RECEIPT_ROUTE,
  RESIDUALS,
  ROLLBACK,
  ROWS,
  type Row,
  SHADOW_RUN,
  TERMS,
  tiles,
  VOCABULARY,
  walkList,
} from "./helpers/gp-mw-coordination-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-e66.5";
const REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R10";
const SUITE = `mw gp coordination census (${BEAD}, ${REQUIREMENT})`;
const CENSUS = "test/workbench-mw-gp-coordination-census.test.ts";
const ROSTER_PATH = "test/fixtures/mw-gp-coordination-roster.json";
const EXPORT = ".beads/issues.jsonl";
const FREEZE_TEST = "test/workbench-traceability-freeze.test.ts";
/** The filing grep's pin, scopes and words. */
const FILING_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const FILING_SCOPES = ["src", "test", "docs"];
/** src and test hold well over these many files; fewer means the listing read nothing. */
const FLOORS = { src: 100, test: 600 };
/** This cut's own three files: each names the vocabulary as text, the test leg's positive control (anchored in this cut, never in another bead's files). */
const OWN_FILES = [CENSUS, "test/helpers/gp-mw-coordination-census.ts", ROSTER_PATH];
/** The filing pin's blobs per scope (an immutable tree: exact). */
const PIN_FILES = { src: 115, test: 410, docs: 59 };
/** The number words the statement may count the terms with. */
const COUNTS: Readonly<Record<string, number>> = { six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
/** The live cases parse every src and test module; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

/** The census allowlist: every src module or test file admitted to carry a finding, with its receipt. Empty today. */
const ADOPTIONS: readonly Adoption[] = [];

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly tests: readonly string[];
  readonly producer: { readonly repo: string; readonly sha: string; readonly path: string; readonly blob: string; readonly line: number; readonly text: string };
}
const ROSTER = JSON.parse(readFileSync(join(ROOT, ROSTER_PATH), "utf8")) as Roster;

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** A receipt's text in the live tree, or undefined when the path holds none. */
const liveReceipt = (path: string): string | undefined => {
  try {
    return textOf(path);
  } catch {
    return undefined;
  }
};

const cache = new Map<string, readonly Entry[]>();
/** A leg's live files (git's would-commit listing), each with its text (read once per run). */
function liveEntries(scope: "src" | "test"): readonly Entry[] {
  let entries = cache.get(scope);
  if (entries === undefined) {
    entries = gitList(ROOT, scope).map(path => ({ path, text: textOf(path) }));
    cache.set(scope, entries);
  }
  return entries;
}
/** git's would-commit listing equals the filesystem walk less git's ignored set. */
function listingMatchesWalk(scope: "src" | "test"): boolean {
  const walked = walkList(ROOT, scope);
  const ignored = ignoredOf(ROOT, walked);
  return isDeepStrictEqual(
    walked.filter(path => !ignored.has(path)),
    liveEntries(scope).map(entry => entry.path),
  );
}

// ---- the planted adoption ----

const PLANT: Entry = { path: "src/workbench/gp-shadow.ts", text: 'import { sample } from "graph-policy-cli";\nexport const decide = (graph: unknown): unknown => sample(graph);\n' };
const PLANT_OWN = ["src/workbench/gp-shadow.ts: names GraphPolicy", "src/workbench/gp-shadow.ts: imports graph-policy-cli"];
const PLANT_RECEIPT = "docs/workbench/receipts/wb-zz1.md";

interface Recipe {
  readonly kind?: "shadow" | "canary";
  readonly dropTerm?: string;
  readonly unreferencedTerm?: string;
  readonly oneLine?: boolean;
  readonly shadow?: "cited" | "missing" | "no-decisions" | "no-verbs" | "unreferenced";
  readonly rollback?: "cited" | "missing" | "unreferenced";
  readonly heading?: "dated" | "undated" | "other-path";
  readonly records?: number;
}

/** A planted receipt: one dated record of the planted adoption, each line citing a distinct reference unless the recipe says otherwise. */
function receiptText(recipe: Recipe): string {
  const kind = recipe.kind ?? "shadow";
  const subject = recipe.heading === "other-path" ? "src/workbench/other.ts" : PLANT.path;
  const heading = recipe.heading === "undated" ? `## GP adoption of ${subject} (${kind})` : `## 2026-11-02 GP adoption of ${subject} (${kind})`;
  const lines = recipe.oneLine
    ? [`- ${TERMS.join("; ")}: MechanicalWorkflows@1a2b3c40 (cmd_0123456789a0)`]
    : TERMS.filter(term => term !== recipe.dropTerm).map((term, index) => (term === recipe.unreferencedTerm ? `- ${term}: recorded` : `- ${term}: MechanicalWorkflows@1a2b3c4${index} (cmd_0123456789a${index})`));
  const shadow = recipe.shadow ?? "cited";
  if (shadow === "cited") lines.push("- shadow-mode run: zero control decisions issued, zero native verbs reached (cmd_ba9876543210)");
  if (shadow === "no-decisions") lines.push("- shadow-mode run: zero native verbs reached (cmd_ba9876543210)");
  if (shadow === "no-verbs") lines.push("- shadow-mode run: zero control decisions issued (cmd_ba9876543210)");
  if (shadow === "unreferenced") lines.push("- shadow-mode run: zero control decisions issued, zero native verbs reached");
  const rollback = recipe.rollback ?? "cited";
  if (rollback === "cited") lines.push("- rollback path: revert the canary flag (docs/workbench/receipts/wb-zz1.md@5e6f7a8b)");
  if (rollback === "unreferenced") lines.push("- rollback path: revert the canary flag");
  const record = [heading, "", ...lines, ""].join("\n");
  return ["# wb-zz1: planted adoption receipt", "", ...Array.from({ length: recipe.records ?? 1 }, () => record)].join("\n");
}

/** The src leg over the planted module alone, with the given adoptions and one planted receipt (or none). */
function plantFindings(adoptions: readonly Adoption[], receipt: string | undefined): string[] {
  return legFindings("src", [PLANT], adoptions, path => (path === PLANT_RECEIPT ? receipt : undefined));
}
const adoption = (kind: "shadow" | "canary", receipt = PLANT_RECEIPT): Adoption => ({ path: PLANT.path, kind, receipt });

// ---- the controls of the readers ----

const VOCABULARY_HITS: readonly string[] = [
  "GraphPolicy",
  "graph-policy-cli",
  "GRAPH_POLICY",
  "graph policy",
  "graphpolicy.snapshot.c1",
  "loadGraphPolicyCLI",
  "GraphDataIR",
  "graph_data_ir",
  "MicroPolicy",
  "@micro-policy/core",
  "mw.training-export.v1",
  "mw_training_export",
];
const VOCABULARY_QUIET: readonly string[] = ["graph", "policy", "GraphQL policy", "training-export", "mw export", "data ir graph"];

const SRC_MEANS: Readonly<Record<string, string>> = {
  "an import of graph-policy-cli": 'import { sample } from "graph-policy-cli";\n',
  "an export from @micro-policy/core": 'export { decide } from "@micro-policy/core";\n',
  "a require of gp": 'const gp = require("gp");\n',
  "an import-equals of gp": 'import gp = require("gp");\n',
  "a dynamic import of mp/core": 'export const load = () => import("mp/core");\n',
  "spawn gp": 'spawn("gp", ["sample"]);\n',
  "a shell line gp rpc": 'execSync("gp rpc --stdio");\n',
  "a Windows path to gp.exe": 'execFileSync("C:\\\\tools\\\\gp.exe", ["eval"]);\n',
  "an absolute path to gp": 'execFile("/opt/bin/gp", ["eval"]);\n',
  "a member call of mp": 'childProcess.spawnSync("mp", ["decide"]);\n',
  // The placeholder is built from two pieces so this file holds no template placeholder inside a plain string.
  "a template program": "spawn(`gp $" + "{verb}`, []);\n",
  "a const-bound program": 'const GP_BIN = "gp";\nspawn(GP_BIN, ["sample"]);\n',
  "a version probe in src": 'execFileSync("gp", ["--version"]);\n',
  "a fork of a GraphPolicyCLI module": 'fork("node_modules/graph-policy-cli/dist/main.js");\n',
  "git (quiet)": 'spawn("git", ["status"]);\n',
  "gpg (quiet)": 'spawn("gpg", ["--verify"]);\n',
  "mpv (quiet)": 'execSync("mpv video.mkv");\n',
  "a graph-view module (quiet)": 'import { renderGraph } from "./graph-view.js";\n',
};

const TEST_MEANS: Readonly<Record<string, string>> = {
  "an import of graph-policy-cli": 'import { sample } from "graph-policy-cli";\n',
  "spawn gp sample": 'spawnSync("gp", ["sample"]);\n',
  "a shell line gp eval": 'execSync("gp eval --json");\n',
  "a version probe, file form": 'execFileSync("gp", ["--version"], { encoding: "utf8" });\n',
  "a version probe, shell line": 'execSync("mp --version");\n',
  "a version probe with a second argument": 'execFileSync("gp", ["--version", "--json"]);\n',
};

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, (context: TestContext) => Json>> = {
  A1: ({ task }) => {
    const loaded = config as unknown as { readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] } };
    const include = [...(loaded.test?.include ?? [])];
    const excluded = (loaded.test?.exclude ?? []).includes(CENSUS);
    expect(include, "the default tier collects test/**/*.test.ts").toEqual(["test/**/*.test.ts"]);
    expect(excluded, "the default tier does not exclude this file").toBe(false);
    expect(relative(ROOT, task.file.filepath), "this case runs in the census file").toBe(CENSUS);
    expect(CENSUS.startsWith("test/") && CENSUS.endsWith(".test.ts"), "the file sits under the include").toBe(true);
    return { census: CENSUS, include, excluded, pinCases: ROWS.flatMap(row => row.pins).length };
  },
  A2: () => {
    const src = liveEntries("src");
    const findings = legFindings("src", src, ADOPTIONS, liveReceipt);
    expect(findings, "no src file names the vocabulary or carries a GP means").toEqual([]);
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(FLOORS.src);
    expect(listingMatchesWalk("src"), "git's src listing equals the walk less what git ignores").toBe(true);
    const planted = legFindings("src", [...src, PLANT], ADOPTIONS, liveReceipt);
    expect(planted, "the same call, a planted module after the tracked ones: exactly its findings").toEqual(PLANT_OWN);
    const pin = pinTree(ROOT, FILING_PIN, FILING_SCOPES);
    const files = Object.fromEntries(FILING_SCOPES.map(scope => [scope, pin.filter(entry => entry.path.startsWith(`${scope}/`)).length]));
    expect(files, "the filing pin's blobs per scope").toEqual(PIN_FILES);
    const pinFindings = pin.flatMap(entry => namedWords(entry.text).map(word => `${entry.path}: names ${word}`));
    expect(pinFindings, "at the filing pin no blob under src, test or docs names the vocabulary").toEqual([]);
    const pinPlant = [...pin, { path: "docs/workbench/zz-plant.md", text: "Pi exports a GraphDataIR snapshot.\n" }].flatMap(entry => namedWords(entry.text).map(word => `${entry.path}: names ${word}`));
    expect(pinPlant, "the same reading finds a planted blob").toEqual(["docs/workbench/zz-plant.md: names GraphDataIR"]);
    return { src: findings, srcFloor: src.length >= FLOORS.src, listing: true, planted, pin: { commit: FILING_PIN, files, findings: pinFindings }, pinPlant };
  },
  A3: ({ task }) => {
    expect(task.suite?.name, "the suite this case runs in").toBe(SUITE);
    expect(SUITE.includes(BEAD) && SUITE.includes(REQUIREMENT), "the suite names the bead and its requirement id").toBe(true);
    return { suite: task.suite?.name ?? "", bead: BEAD, requirement: REQUIREMENT };
  },
  B1: () => {
    const witness = {
      "no adoption": plantFindings([], receiptText({})),
      "a TRACEABILITY.md receipt": plantFindings([adoption("shadow", "docs/workbench/TRACEABILITY.md")], receiptText({})),
      "a receipt outside receipts/": plantFindings([adoption("shadow", "docs/workbench/15-implementation-program.md")], receiptText({})),
      "an absent receipt": plantFindings([adoption("shadow")], undefined),
      "an undated record": plantFindings([adoption("shadow")], receiptText({ heading: "undated" })),
      "a record of another path": plantFindings([adoption("shadow")], receiptText({ heading: "other-path" })),
      "two records": plantFindings([adoption("shadow")], receiptText({ records: 2 })),
      "a complete record": plantFindings([adoption("shadow")], receiptText({})),
    };
    expect(witness["no adoption"], "no adoption: the module keeps its findings").toEqual(PLANT_OWN);
    expect(witness["a TRACEABILITY.md receipt"], "TRACEABILITY.md is never the route").toEqual([...PLANT_OWN, "src/workbench/gp-shadow.ts: receipt-route docs/workbench/TRACEABILITY.md"]);
    expect(witness["an undated record"], "a record without its date is no record").toEqual([...PLANT_OWN, `src/workbench/gp-shadow.ts: record-missing ${PLANT_RECEIPT}`]);
    expect(witness["a complete record"], "a complete dated record admits the module").toEqual([]);
    expect(datedEntries(receiptText({})).map(entry => entry.date), "the planted record's date").toEqual(["2026-11-02"]);
    expect(datedEntries("## 2026-13-01 x\n## 2026-00-10 y\n## 2026-02-32 z\n"), "an impossible month or day is no date").toEqual([]);
    return witness;
  },
  B2: () => {
    const dropped = Object.fromEntries(TERMS.map(term => [term, plantFindings([adoption("shadow")], receiptText({ dropTerm: term }))]));
    const unreferenced = plantFindings([adoption("shadow")], receiptText({ unreferencedTerm: TERMS[2] }));
    const oneLine = plantFindings([adoption("shadow")], receiptText({ oneLine: true }));
    for (const term of TERMS) expect(dropped[term], `a record without '${term}'`).toEqual([...PLANT_OWN, `src/workbench/gp-shadow.ts: term-uncited ${term}`]);
    expect(unreferenced, "a term line without a reference cites nothing").toEqual([...PLANT_OWN, `src/workbench/gp-shadow.ts: term-uncited ${TERMS[2]}`]);
    expect(oneLine, "one line naming every term is no term's own receipt").toEqual([...PLANT_OWN, ...TERMS.map(term => `src/workbench/gp-shadow.ts: term-uncited ${term}`)]);
    return { dropped, unreferenced, oneLine, terms: TERMS.length };
  },
  B3: () => {
    const witness = {
      missing: plantFindings([adoption("shadow")], receiptText({ shadow: "missing" })),
      "no control decisions phrase": plantFindings([adoption("shadow")], receiptText({ shadow: "no-decisions" })),
      "no native verbs phrase": plantFindings([adoption("shadow")], receiptText({ shadow: "no-verbs" })),
      unreferenced: plantFindings([adoption("shadow")], receiptText({ shadow: "unreferenced" })),
      cited: plantFindings([adoption("shadow")], receiptText({ shadow: "cited" })),
    };
    for (const variant of ["missing", "no control decisions phrase", "no native verbs phrase", "unreferenced"] as const) {
      expect(witness[variant], `the shadow-mode run, ${variant}`).toEqual([...PLANT_OWN, "src/workbench/gp-shadow.ts: shadow-run-uncited"]);
    }
    expect(witness.cited, "the cited shadow-mode run").toEqual([]);
    return witness;
  },
  B4: () => {
    const src = liveEntries("src");
    const live = legFindings("src", src, ADOPTIONS, liveReceipt);
    const clean: Entry = { path: "src/workbench/clean.ts", text: "export const clean = 1;\n" };
    const witness = {
      live: { adoptions: ADOPTIONS.length, findings: live },
      unadmitted: plantFindings([], undefined),
      admitted: plantFindings([adoption("shadow")], receiptText({})),
      stale: legFindings("src", [clean], [{ path: clean.path, kind: "shadow", receipt: PLANT_RECEIPT }], () => receiptText({})),
      duplicate: plantFindings([adoption("shadow"), adoption("canary")], receiptText({})),
      "another leg's adoption": plantFindings([{ path: "test/zz-gp-shadow.test.ts", kind: "shadow", receipt: PLANT_RECEIPT }], receiptText({})),
    };
    expect(witness.live, "the allowlist is empty and the src leg carries nothing").toEqual({ adoptions: 0, findings: [] });
    expect(witness.unadmitted, "an unadmitted module keeps its findings").toEqual(PLANT_OWN);
    expect(witness.admitted, "an admitted module").toEqual([]);
    expect(witness.stale, "an adoption of a module that carries nothing").toEqual(["src/workbench/clean.ts: adoption-stale"]);
    expect(witness.duplicate, "two adoptions of one module").toEqual([...PLANT_OWN, "src/workbench/gp-shadow.ts: adoption-duplicate"]);
    expect(witness["another leg's adoption"], "a test-leg adoption does not admit a src module").toEqual(PLANT_OWN);
    return witness;
  },
  C1: () => {
    const witness = {
      "a canary without a rollback path": plantFindings([adoption("canary")], receiptText({ kind: "canary", rollback: "missing" })),
      "a canary with an unreferenced rollback path": plantFindings([adoption("canary")], receiptText({ kind: "canary", rollback: "unreferenced" })),
      "a canary with a recorded rollback path": plantFindings([adoption("canary")], receiptText({ kind: "canary", rollback: "cited" })),
      "a shadow adapter without a rollback path": plantFindings([adoption("shadow")], receiptText({ kind: "shadow", rollback: "missing" })),
    };
    expect(witness["a canary without a rollback path"], "refused").toEqual([...PLANT_OWN, "src/workbench/gp-shadow.ts: canary-rollback-unrecorded"]);
    expect(witness["a canary with an unreferenced rollback path"], "refused").toEqual([...PLANT_OWN, "src/workbench/gp-shadow.ts: canary-rollback-unrecorded"]);
    expect(witness["a canary with a recorded rollback path"], "admitted").toEqual([]);
    expect(witness["a shadow adapter without a rollback path"], "a shadow adapter owes no rollback path").toEqual([]);
    return witness;
  },
  S1: () => {
    const hits = Object.fromEntries(VOCABULARY_HITS.map(text => [text, namedWords(text)]));
    const quiet = Object.fromEntries(VOCABULARY_QUIET.map(text => [text, namedWords(text)]));
    for (const text of VOCABULARY_HITS) expect(hits[text], `'${text}' names a word`).toHaveLength(1);
    for (const text of VOCABULARY_QUIET) expect(quiet[text], `'${text}' names none`).toEqual([]);
    const parts = Object.fromEntries(VOCABULARY.map(word => [word.spelling, partsOf(word.spelling)]));
    return { hits, quiet, parts };
  },
  S2: () => {
    const witness = Object.fromEntries(Object.entries(SRC_MEANS).map(([label, text]) => [label, fileFindings("src", "src/workbench/zz.ts", text)]));
    for (const [label, findings] of Object.entries(witness)) {
      if (label.endsWith("(quiet)")) expect(findings, label).toEqual([]);
      else expect(findings.length, `${label} is a finding`).toBeGreaterThan(0);
    }
    expect(witness["a version probe in src"], "src: a version probe is adoption too").toEqual(["src/workbench/zz.ts: launches gp"]);
    expect(PROGRAMS, "the two binaries").toEqual(["gp", "mp"]);
    return witness;
  },
  S3: () => {
    const test = liveEntries("test");
    const findings = legFindings("test", test, ADOPTIONS, liveReceipt);
    expect(findings, "no test file imports a GraphPolicyCLI or MicroPolicyCLI package or launches gp or mp beyond a version probe").toEqual([]);
    expect(test.length, "the test floor").toBeGreaterThanOrEqual(FLOORS.test);
    const own = OWN_FILES.map(path => ({ path, read: namedWords(test.find(entry => entry.path === path)?.text ?? "").length > 0 }));
    expect(own.filter(entry => !entry.read).map(entry => entry.path), "the test leg read this cut's own files, each naming the vocabulary").toEqual([]);
    expect(listingMatchesWalk("test"), "git's test listing equals the walk less what git ignores").toBe(true);
    const plants = Object.fromEntries(Object.entries(TEST_MEANS).map(([label, text]) => [label, fileFindings("test", "test/zz.test.ts", text)]));
    const scratch = makeScratch("wb-e665-listing-");
    let listing: Json = null;
    try {
      execFileSync("git", ["init", "-q"], { cwd: scratch });
      writeFileSync(join(scratch, ".gitignore"), "*.log\n");
      for (const scope of ["src", "test"]) {
        mkdirSync(join(scratch, scope, "nested"), { recursive: true });
        writeFileSync(join(scratch, scope, "nested", "planted.ts"), 'import { sample } from "graph-policy-cli";\nspawn("gp", ["sample"]);\n');
        writeFileSync(join(scratch, scope, "ignored.log"), 'spawn("gp", ["sample"]);\n');
      }
      const listed = { src: gitList(scratch, "src"), test: gitList(scratch, "test") };
      const read = (scope: "src" | "test"): Entry[] => listed[scope].map(path => ({ path, text: readFileSync(join(scratch, path), "utf8") }));
      listing = { listed, src: legFindings("src", read("src"), [], () => undefined), test: legFindings("test", read("test"), [], () => undefined) };
    } finally {
      removeScratch(scratch);
    }
    expect(listing, "untracked files are listed and judged, ignored files never").toEqual({
      listed: { src: ["src/nested/planted.ts"], test: ["test/nested/planted.ts"] },
      src: ["src/nested/planted.ts: names GraphPolicy", "src/nested/planted.ts: imports graph-policy-cli", "src/nested/planted.ts: launches gp"],
      test: ["test/nested/planted.ts: imports graph-policy-cli", "test/nested/planted.ts: launches gp"],
    });
    return { findings, testFloor: test.length >= FLOORS.test, own, listing: true, plants, scratch: listing };
  },
};

/** A quiet row: every member of the residual family reads as no finding, alone and through its leg. */
const quietRow = (id: string): Json => {
  const members = RESIDUALS[id] ?? [];
  const findings = members.flatMap(member => [...fileFindings(member.leg, member.path, member.text), ...legFindings(member.leg, [member], [], () => undefined)]);
  expect(members.length, `${id} has members`).toBeGreaterThan(0);
  expect(findings, `${id}: every member is quiet`).toEqual([]);
  return { members: members.map(member => member.path), findings };
};

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, context => {
        const implementation = IMPL[pin];
        const witness = row.id === "Q" ? quietRow(pin) : implementation === undefined ? null : implementation(context);
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the vocabulary, the terms and the allowlist are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:4", "C:1", "S:3", "Q:6"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:4", "Q2:6", "Q3:5", "Q4:3", "Q5:2", "Q6:1"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(VOCABULARY.map(word => `${word.id}:${word.spelling}`)).toEqual(["V1:GraphPolicy", "V2:GraphDataIR", "V3:MicroPolicy", "V4:mw.training-export"]);
    expect(TERMS).toEqual([
      "original Policy/reconcile laws unchanged",
      "pure GP call",
      "exact source ID mapping",
      "original behavior probability",
      "no native-effect bypass",
      "stale result rejection",
      "evidence sidecar parity",
      "Forge-installed integration tests",
    ]);
    expect(SHADOW_RUN).toEqual(["shadow-mode run", "zero control decisions issued", "zero native verbs reached"]);
    expect(ROLLBACK).toBe("rollback path");
    expect(ADOPTIONS).toEqual([]);
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the vocabulary, the scopes, the pin, the terms and the phrases; the producer block carries the terms", { timeout: 60_000 }, () => {
    const row = beadRow(textOf(EXPORT), BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    expect(title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    const clauses = acceptanceClauses(notes);
    expect(clauses, "the acceptance holds three clauses, each exactly one row's label").toEqual(["A", "B", "C"].map(id => ROWS.find(entry => entry.id === id)?.label));
    const rowS = ROWS.find(entry => entry.id === "S");
    expect(title.includes(` ${rowS?.label ?? "-"}.`), "row S's label is a slice of the statement").toBe(true);
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    const grep = /git grep -i '([^']+)' over (.+?) at ([0-9a-f]{12}) is empty/.exec(notes);
    expect(grep?.[1]?.split("|"), "the vocabulary is the filing grep's words, in order").toEqual(VOCABULARY.map(word => word.spelling));
    expect(grep?.[2]?.split(" "), "the filing pin's scopes are the grep's").toEqual(FILING_SCOPES);
    expect(FILING_PIN.startsWith(grep?.[3] ?? "-"), "the filing pin is the grep's").toBe(true);
    const named = /pins zero (.+?) references in src and test\.$/.exec(title)?.[1]?.split("/") ?? [];
    expect(named, "the statement names three of the words").toEqual(["GraphPolicy", "GraphDataIR", "mw.training-export"]);
    for (const word of named) expect(VOCABULARY.map(entry => entry.spelling), `'${word}' is a vocabulary word`).toContain(word);
    const terms = /\(the eight acceptance terms \u2014 (.+?) \u2014 'before any runtime rollout'\)/.exec(notes)?.[1]?.split(", ");
    expect(terms, "the eight terms are the filing's list").toEqual([...TERMS]);
    const counted = /before the (\w+) README\.md:23@4b8b974ca72b acceptance terms/.exec(title)?.[1] ?? "-";
    expect(counted, "the statement counts the terms").toBe("eight");
    expect(TERMS.length, "TERMS holds the statement's count").toBe(COUNTS[counted]);
    const clauseB = clauses[1] ?? "";
    expect(/and the (shadow-mode run) \((.+?), (.+?)\)/.exec(clauseB)?.slice(1), "the shadow-mode run and its phrases are clause B's").toEqual([...SHADOW_RUN]);
    expect((clauses[2] ?? "").includes(`a recorded ${ROLLBACK}`), "the rollback path is clause C's").toBe(true);
    expect(clauseB.includes("TRACEABILITY row"), "clause B names the TRACEABILITY row the receipts route replaces").toBe(true);
    expect(textOf(FREEZE_TEST).includes("docs/workbench/TRACEABILITY.md is frozen"), "the freeze test holds TRACEABILITY.md").toBe(true);
    const receipts = execFileSync("git", ["ls-files", "--", "docs/workbench/receipts"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(path => path !== "");
    expect(receipts.length, "the receipts route holds receipts").toBeGreaterThan(0);
    expect(receipts.filter(path => !RECEIPT_ROUTE.test(path)), "every tracked receipt is on the route").toEqual([]);
    const pin = /(README\.md):(\d+)@([0-9a-f]{12})/.exec(title);
    const producer = ROSTER.producer;
    expect(producer.path.endsWith(`/${pin?.[1] ?? "-"}`), "the producer path is the statement's README").toBe(true);
    expect(producer.line, "the producer line is the statement's").toBe(Number(pin?.[2]));
    expect(producer.sha.startsWith(pin?.[3] ?? "-"), "the producer sha is the statement's pin").toBe(true);
    for (const term of TERMS) expect(producer.text.toLowerCase(), `README.md:23 carries '${term}'`).toContain(term.toLowerCase());
    expect(producer.text.endsWith("before any runtime rollout."), "README.md:23 ends with the filing's quote").toBe(true);
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/mw-gp-coordination-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(Object.fromEntries(Object.entries(RESIDUALS).map(([id, members]) => [id, members.map(member => member.path)])), "the residual members equal the roster's").toEqual(ROSTER.residuals);
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
