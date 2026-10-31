/**
 * wb-1xvp.5 (RF-GRAPH-POLICY-MACHINE-CONTROL-R4): if Pi ever calls gp in a decision loop, the integration runs under a
 * declared budget and reports its cost. Spec: ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/
 * README.md:454 at 6a251bf73af5, "Measure p50, p95, and p99 decision latency; CPU, memory, token, and subprocess costs;
 * model-load overhead; and cache effectiveness." (merged pins :153, :456, :469, :471; authority :452, "Do not make
 * GraphPolicyCLI inference a new bottleneck.").
 *
 * The obligation is gated: its artifacts, the shared adapter (deliverable 2) and the evaluation (deliverable 7), are
 * unshipped and src holds no gp site. This guard pins that absence as a rule a later cut cannot pass without its cost
 * evidence:
 * - G1 site census: every string token and identifier of every .ts file under src/, read through the TypeScript parser, is
 *   held to three markers (MARKERS), and every file that holds a site must be bound in GP_COST_BINDINGS. The table is
 *   empty, so today no file may hold one. The binary marker reads a word's command name: its last path segment under
 *   either separator, less an @<version> suffix and a .cmd, .exe, .bat or .ps1 launcher extension (follow-up wb-vkdl, F5).
 *   The same reader finds the real rf and git spawns in src, so a silent gp reading is not a blind instrument.
 * - G2 cost bindings: a binding names a registered case for each acceptance clause (a)-(d) of the bead (CLAUSES). An unbound
 *   site, a stale binding, an empty clause, an absent file or title, and a case or suite held by a HOLDS member (skip, todo,
 *   only, skipIf, runIf, fails; each falsified by its own binding row) each refuse. THE JUDGE LEG (follow-up wb-mqm6, PREP
 *   F3): the locator reads test source only, so G2 admits a binding only beside a census-tier leg, a test/*.census.ts file
 *   that imports judge from test/helpers/census.ts (the wb-u62 one-helper floor) and names each bound case's file and title
 *   as string tokens. The first binding cut is thereby bound to the shared helper for the legs this locator cannot read.
 * - G3 docs census (clause (d), second half: "a 'no bottleneck' docs claim without it fails the census"): a line of
 *   README.md, CHANGELOG.md or any .md under docs/ that names gp or GraphPolicyCLI beside a cost claim (CLAIM_FAMILIES) must
 *   cite an evaluation receipt under docs/workbench/receipts/ that states every figure of FIGURES, or be such a receipt.
 *   Each line is read as written and as its reader sees it (readerText: marked's inline lexer, with emphasis, code span and
 *   link text kept and HTML dropped); a family claims the line when the subject and its pattern meet in one reading.
 * Anchor (standing rule 16, the CT5/CT6 kill; wb-mqm6 F1, F2, F4; follow-up wb-vkdl, F1 and F2): the append-only receipt
 * docs/workbench/receipts/wb-1xvp.5.md, read as written and as marked's block lexer reads it (the receipts-shape view).
 * As written, its column-0 '## ' lines are RECEIPT_HEADINGS in order. As read, the headings the lexer finds
 * (headingOutline: ATX or setext, at any level, indented up to three spaces, inside a block quote or a list item) are
 * its title and RECEIPT_HEADINGS alone, and the lexer finds no HTML token in it, block or inline (htmlIn), so no heading
 * or anchor line can hide in an HTML comment or element or be spelled as one. An entry heading inserted or removed
 * anywhere is therefore red. Its last entry lists every clause, marker, claim family, figure, residual, hold, quiet row,
 * claim-quiet row, binding case, judge case, evidence case and anchor form, and a digest of each fixture-bearing table's
 * row content and of the case set (TABLE_DIGESTS); the anchor row holds this file to that listing line for line in both
 * views, as the anchor lines written under the last entry heading and as the items the lexer reads in the last entry's
 * lists (renderedListing), so a member removed from every literal here, or a row's content swapped for another passing
 * row, is red against the receipt. Each reader is pinned on the heading, markup and listing forms it must and must not
 * read (ANCHOR_FORMS).
 * Each-liveness (wb-mqm6 F7; follow-up wb-vkdl): every case records its key at its last line, and the closing tally, the
 * file's last case, reads vitest's own task tree: every case is set to run, the case count is the fixed cases plus every
 * table row plus the tally, and every fixed case and every row of each it.each table reached its last line, in order.
 * Comments are prose, never sites: a doc comment that names GraphPolicyCLI is no call (the QUIET comment row).
 * Residuals, named, each pinned by a quiet row and by a paired control read through the same reader (RESIDUALS, readProbe):
 * R-RUNTIME, R-SCOPE, R-REPORT, R-LINE, R-FIGURES, R-LOCATOR, R-MARKUP, R-PHRASING, R-REQUIREMENT, R-LAUNCHER. A residual's
 * reading is data, so a hollowed reader reds its control and a swapped input reds the residuals digest. R-REQUIREMENT names
 * an over-read: its quiet row holds the claims the bottleneck family reads in requirement and question lines.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RECEIPT = "docs/workbench/receipts/wb-1xvp.5.md";

/** Repository-relative, "/"-separated paths of every file under dir, sorted so a reading is reproducible. */
function filesUnder(dir: string): string[] {
  return readdirSync(join(ROOT, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(ROOT, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}
const read = (file: string): string => readFileSync(join(ROOT, file), "utf8");
const readIfPresent = (file: string): string | undefined => (existsSync(join(ROOT, file)) ? read(file) : undefined);
/** Row content as one short digest: the first 16 hex digits of the sha256 of its JSON (the F2 content pin, wb-mqm6). */
const digestOf = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);

// ---- G1: the site census --------------------------------------------------------------------------------------------

/** The producer's binary, as its package declares it (graph-policy-cli 0.1.0, bin gp). */
const GP = "gp";
type MarkerId = "binary" | "namespace" | "identifier";
interface Site {
  readonly file: string;
  readonly line: number;
  readonly marker: MarkerId;
  readonly text: string;
}

/** The words of a string token, split on white space, shell operators, quotes and "=", so "cd x && gp rpc" yields gp. */
const wordsOf = (text: string): string[] => text.split(/[\s;&|()<>`'"=]+/).filter((word) => word.length > 0);
/**
 * A word's command name: its last path segment under either separator, less an @<version> suffix (npx gp@0.1.0) and a .cmd,
 * .exe, .bat or .ps1 launcher extension (gp.cmd, gp.exe, gp.bat, npm's PowerShell shim gp.ps1). Every other extension stays,
 * so gp.js names a module, never the binary (R-LAUNCHER names the launchers that therefore read no site).
 */
const commandName = (word: string): string =>
  (word.split(/[\\/]/).pop() ?? "").replace(/@[^@]*$/, "").replace(/\.(?:cmd|exe|bat|ps1)$/i, "");
/** The binary marker: a word whose command name is the binary. */
const namesBinary = (text: string, binary: string): boolean => wordsOf(text).some((word) => commandName(word) === binary);
/** The producer's names in string text: the graph-policy-cli package, a graphpolicy.* envelope schema, GraphDataIR; graph and policy joined, hyphenated, snake-cased or spaced. */
const NAMESPACE = /graph[-_ ]?policy|graphdatair/i;
/** The same names as code identifiers, camel or snake case: a client class, a binding, a type. */
const IDENTIFIER = /graph_?policy|graphdatair/i;

const stringText = (node: ts.Node): string | undefined =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)
    ? node.text
    : undefined;
const parse = (file: string, source: string): ts.SourceFile => ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

/**
 * Every gp site of one parsed source, in document order. A string token is read as the binary marker first, then the
 * namespace marker; an identifier as the identifier marker. `binary` names the binary the binary marker reads (the G1
 * control reads rf and git with the same reader).
 */
function sitesOf(sf: ts.SourceFile, binary = GP): Site[] {
  const file = sf.fileName;
  const sites: Site[] = [];
  const add = (node: ts.Node, marker: MarkerId, text: string): void => {
    sites.push({ file, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1, marker, text });
  };
  const visit = (node: ts.Node): void => {
    const text = stringText(node);
    if (text !== undefined && namesBinary(text, binary)) add(node, "binary", text);
    else if (text !== undefined && NAMESPACE.test(text)) add(node, "namespace", text);
    else if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && IDENTIFIER.test(node.text)) add(node, "identifier", node.text);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return sites;
}
const sitesIn = (file: string, source: string): Site[] => sitesOf(parse(file, source));
const siteKeys = (sites: readonly Site[]): string[] => sites.map((site) => `${site.marker}:${site.text}`);

interface SiteFixture {
  readonly id: string;
  readonly source: string;
  /** The sites the snippet must read, as marker:text, in document order. */
  readonly sites: readonly string[];
}
interface QuietFixture extends SiteFixture {
  /** Why the snippet reads no site: the text of its anchor line in the receipt. */
  readonly why: string;
}
interface Marker {
  readonly id: MarkerId;
  readonly matches: string;
  readonly fixtures: readonly SiteFixture[];
}

/** A template literal that runs gp after another shell word; joined so no string of this file spells a placeholder itself. */
const SHELL_LINE = ["execSync(`cd $", "{dir} && gp graph check $", "{file}`);"].join("");

/** The three ways a gp site shows in src. Each fixture is a snippet and the sites it must read. */
const MARKERS: readonly Marker[] = [
  {
    id: "binary",
    matches:
      "a word of a string token whose command name is gp: the bare name, a path ending in gp under either separator, a gp.cmd, gp.exe, gp.bat or gp.ps1 launcher, gp with an @ version suffix as npx spells it, an argv word, an option value after =, or a word of a shell line",
    fixtures: [
      { id: "spawn", source: 'spawn("gp", ["rpc", "--stdio"], { stdio: ["pipe", "pipe", "pipe"] });', sites: ["binary:gp"] },
      { id: "path", source: 'execFileSync("/usr/local/bin/gp", ["--version"]);', sites: ["binary:/usr/local/bin/gp"] },
      { id: "argv-word", source: 'spawn("npx", ["--yes", "gp", "graph", "check"]);', sites: ["binary:gp"] },
      { id: "shell-line", source: SHELL_LINE, sites: ["binary: && gp graph check "] },
      { id: "shell-operator", source: 'spawn("sh", ["-c", "cd /tmp;gp rpc --stdio"]);', sites: ["binary:cd /tmp;gp rpc --stdio"] },
      { id: "constant", source: 'const GP_BINARY = "gp";\nspawn(GP_BINARY, argv);', sites: ["binary:gp"] },
      { id: "windows-path", source: String.raw`execFileSync("C:\\tools\\gp", ["--version"]);`, sites: [String.raw`binary:C:\tools\gp`] },
      { id: "cmd-shim", source: 'spawn("gp.cmd", ["rpc", "--stdio"], { shell: true });', sites: ["binary:gp.cmd"] },
      { id: "exe", source: 'execFileSync("gp.exe", ["--version"]);', sites: ["binary:gp.exe"] },
      { id: "bat", source: 'execFileSync("gp.bat", ["--version"]);', sites: ["binary:gp.bat"] },
      { id: "ps1", source: 'spawn("pwsh", ["-File", "node_modules/.bin/gp.ps1"]);', sites: ["binary:node_modules/.bin/gp.ps1"] },
      { id: "npx-version", source: 'spawn("npx", ["gp@0.1.0", "graph", "check"]);', sites: ["binary:gp@0.1.0"] },
      { id: "option-value", source: 'spawn("npx", ["--yes", "--bin=gp"]);', sites: ["binary:--bin=gp"] },
    ],
  },
  {
    id: "namespace",
    matches:
      "a string token naming the producer: the graph-policy-cli package, a graphpolicy envelope schema such as graphpolicy.rpc.v1, or GraphDataIR, with graph and policy joined, hyphenated, snake-cased or spaced",
    fixtures: [
      { id: "package", source: 'import { evaluate } from "graph-policy-cli";', sites: ["namespace:graph-policy-cli"] },
      { id: "schema", source: 'if (envelope.schema === "graphpolicy.rpc.v1") admit(envelope);', sites: ["namespace:graphpolicy.rpc.v1"] },
      { id: "dynamic-import", source: 'const sdk = await import("@graphpolicy/sdk");', sites: ["namespace:@graphpolicy/sdk"] },
      { id: "observation", source: 'const observation = { format: "GraphDataIR", nodes, edges };', sites: ["namespace:GraphDataIR"] },
      { id: "snake", source: 'const schema = "graph_policy.rpc.v1";', sites: ["namespace:graph_policy.rpc.v1"] },
      { id: "spaced", source: 'log("graph policy decision admitted");', sites: ["namespace:graph policy decision admitted"] },
    ],
  },
  {
    id: "identifier",
    matches: "an identifier naming GraphPolicy, in camel or snake case, or GraphDataIR, such as a client class, a binding or a type",
    fixtures: [
      { id: "client", source: "const client = new GraphPolicyClient(session);", sites: ["identifier:GraphPolicyClient"] },
      { id: "binding", source: "const graphPolicy = load();", sites: ["identifier:graphPolicy"] },
      { id: "type", source: "function observe(document: GraphDataIR): void {}", sites: ["identifier:GraphDataIR"] },
      { id: "snake-binding", source: "const graph_policy_client = connect();", sites: ["identifier:graph_policy_client"] },
    ],
  },
];
const MARKER_ROWS = MARKERS.flatMap((marker) => marker.fixtures.map((fixture) => ({ marker: marker.id, ...fixture })));

/** Snippets that must read no site: the src/agent-types.ts identifier gp, other binaries, word parts, a comment, other extensions. */
const QUIET: readonly QuietFixture[] = [
  {
    id: "general-purpose",
    why: "the src/agent-types.ts binding gp names the general-purpose agent, an identifier and never a string token",
    source: 'const gp = agents.get("general-purpose");',
    sites: [],
  },
  { id: "other-binaries", why: "gpg, rf and git are other binaries", source: 'spawn("gpg", []);\nspawn("rf", argv);\nexecFileSync("git", ["-C", cwd]);', sites: [] },
  { id: "word-parts", why: "gpu, gpt, gp2 and gp-agent are other words", source: 'log("gpu, gpt, gp2 and gp-agent are other words");', sites: [] },
  {
    id: "comment",
    why: "a comment is prose and never a site, even when it names the binary and GraphPolicyCLI",
    source: '// spawn("gp", ["rpc", "--stdio"]) reaches GraphPolicyCLI\nconst ready = true;',
    sites: [],
  },
  {
    id: "other-extensions",
    why: "a module gp.js and a gpx.exe launcher name no gp binary, since only an @ version and a .cmd, .exe, .bat or .ps1 extension are dropped",
    source: 'import { load } from "./gp.js";\nspawn("gpx.exe", []);',
    sites: [],
  },
];

const SRC_FILES = filesUnder("src");
/** Every src file parsed once, at collection, so no case pays the parse inside its own timeout. */
const SRC_PARSED = SRC_FILES.map((file) => parse(file, read(file)));
const srcSites = (binary = GP): Site[] => SRC_PARSED.flatMap((sf) => sitesOf(sf, binary));

// ---- G2: the cost bindings ------------------------------------------------------------------------------------------

/** The bead's acceptance clauses (a)-(d), verbatim; clause (d)'s docs half is G3 itself. */
const CLAUSES = [
  {
    id: "a",
    phrase: "each gp call and observation records latency, subprocess count, beads_calls (= fake seam invocations), latency_ms and serialized_bytes; a receipt missing them is refused",
  },
  {
    id: "b",
    phrase:
      "read budget N -> the fake bd seam sees at most N calls and the receipt marks completeness 'partial'; an over-budget telemetry cycle is cut and marked partial; budgets are declared settings",
  },
  {
    id: "c",
    phrase: "fake rpc seam: N decisions in one run open one session, not N processes; a verb rpc refuses (unsupported-method) is recorded transport='cli', never relabelled",
  },
  { id: "d", phrase: "an evaluation receipt aggregates p50/p95/p99 from recorded per-call values, instrumentation overhead apart from inference" },
] as const;
type ClauseId = (typeof CLAUSES)[number]["id"];

interface CostPin {
  /** Repository-relative test file. */
  readonly file: string;
  /** The case title exactly as registered. */
  readonly title: string;
}
type CostBinding = Readonly<Record<ClauseId, readonly CostPin[]>>;

/** src file -> the cases that prove clauses (a)-(d) for its gp sites. Empty: no src file may hold a gp site. */
const GP_COST_BINDINGS: Readonly<Record<string, CostBinding>> = {};

type CaseState = "registered" | "skipped" | "absent";
/** The members that keep a case out of a plain run, each falsified by its own binding row (wb-mqm6 F3). */
const HOLDS = [
  { id: "skip", keeps: "the case or the suite never runs" },
  { id: "todo", keeps: "the case is recorded as todo and never runs" },
  { id: "only", keeps: "the case is focused, which the gate refuses with allowOnly false" },
  { id: "skipIf", keeps: "the case runs only while its condition is false" },
  { id: "runIf", keeps: "the case runs only while its condition is true" },
  { id: "fails", keeps: "the case passes only when its body fails" },
] as const;
const NOT_PLAIN: ReadonlySet<string> = new Set(HOLDS.map((hold) => hold.id));
/** The member chain of a registration callee: it -> [it]; it.each(rows) -> [it, each]; describe.skipIf(x) -> [describe, skipIf]. */
function chainOf(callee: ts.Expression): string[] {
  if (ts.isIdentifier(callee)) return [callee.text];
  if (ts.isPropertyAccessExpression(callee)) return [...chainOf(callee.expression), callee.name.text];
  if (ts.isCallExpression(callee)) return chainOf(callee.expression);
  return [];
}
/** How a test source registers a case title: registered (a plain it/test call outside any held suite), skipped, or absent. */
function caseState(file: string, source: string, title: string): CaseState {
  let state: CaseState = "absent";
  const visit = (node: ts.Node, held: boolean): void => {
    let inner = held;
    if (ts.isCallExpression(node)) {
      const chain = chainOf(node.expression);
      const modified = chain.slice(1).some((member) => NOT_PLAIN.has(member));
      const first = node.arguments[0];
      if ((chain[0] === "it" || chain[0] === "test") && first !== undefined && ts.isStringLiteralLike(first) && first.text === title) {
        if (!held && !modified) state = "registered";
        else if (state === "absent") state = "skipped";
      }
      if (chain[0] === "describe" || chain[0] === "suite") inner = held || modified;
    }
    ts.forEachChild(node, (child) => visit(child, inner));
  };
  visit(parse(file, source), false);
  return state;
}

/** Every refusal of a site census against a binding table; [] when each site file is bound and every binding holds. */
function bindingFindings(
  sites: readonly Site[],
  bindings: Readonly<Record<string, CostBinding>>,
  readFile: (file: string) => string | undefined,
): string[] {
  const findings: string[] = [];
  const siteFiles = [...new Set(sites.map((site) => site.file))].sort();
  for (const file of siteFiles) {
    const first = sites.find((site) => site.file === file);
    if (first !== undefined && !Object.hasOwn(bindings, file)) {
      findings.push(
        `${file}:${first.line}: a gp site (${first.marker} ${JSON.stringify(first.text)}) lands without its R4 cost evidence (wb-1xvp.5): bind the file in GP_COST_BINDINGS to a registered case for each clause (a)-(d)`,
      );
    }
  }
  for (const file of Object.keys(bindings).sort()) {
    if (!siteFiles.includes(file)) findings.push(`${file}: a stale binding, the file holds no gp site`);
    const binding = bindings[file];
    for (const clause of CLAUSES) {
      const pins = binding?.[clause.id] ?? [];
      if (pins.length === 0) findings.push(`${file}: clause (${clause.id}) binds no case (${clause.phrase})`);
      for (const pin of pins) {
        const source = readFile(pin.file);
        const state = source === undefined ? "in an absent file" : caseState(pin.file, source, pin.title);
        if (state !== "registered") findings.push(`${file}: clause (${clause.id}) case ${JSON.stringify(pin.title)} of ${pin.file} is ${state}`);
      }
    }
  }
  return findings;
}

const SITE_FILE = "src/workbench/gp-adapter.ts";
const PROOF_FILE = "test/workbench-gp-adapter.test.ts";
/** A case line of the synthetic proof file; a member composes the held registration, so no line here spells a focus or skip call. */
const proofCase = (title: string, member?: string): string => `  it${member === undefined ? "" : `.${member}`}("${title}", () => { expect(1).toBe(1); });`;
/** A synthetic proof file: four plain registrations, a case held by each hold member, and a suite held by skipIf. */
const PROOF_SOURCE = [
  'describe("gp adapter cost", () => {',
  '  it("records each call", () => { expect(1).toBe(1); });',
  '  it("cuts at the read budget", () => { expect(1).toBe(1); });',
  '  it.each([1, 2])("opens one session for %s decisions", (n) => { expect(n).toBeGreaterThan(0); });',
  '  test("aggregates the percentiles", () => { expect(1).toBe(1); });',
  '  it.skipIf(true)("a held case", () => { expect(1).toBe(1); });',
  proofCase("a skip case", "skip"),
  proofCase("a todo case", "todo"),
  proofCase("an only case", "only"),
  '  it.runIf(true)("a runIf case", () => { expect(1).toBe(1); });',
  proofCase("a fails case", "fails"),
  "});",
  'describe.skipIf(true)("a held suite", () => {',
  '  it("a case of a held suite", () => { expect(1).toBe(1); });',
  "});",
].join("\n");
const proofFiles = new Map([[PROOF_FILE, PROOF_SOURCE]]);
const pin = (title: string): CostPin => ({ file: PROOF_FILE, title });
const FULL_BINDING: CostBinding = {
  a: [pin("records each call")],
  b: [pin("cuts at the read budget")],
  c: [pin("opens one session for %s decisions")],
  d: [pin("aggregates the percentiles")],
};
const SITE: Site = { file: SITE_FILE, line: 3, marker: "binary", text: "gp" };

interface BindingCase {
  readonly id: string;
  readonly sites: readonly Site[];
  readonly bindings: Readonly<Record<string, CostBinding>>;
  /** One substring per expected finding, in order. */
  readonly findings: readonly string[];
}
const BINDING_CASES: readonly BindingCase[] = [
  { id: "a bound site whose four clauses each name a registered case is accepted", sites: [SITE], bindings: { [SITE_FILE]: FULL_BINDING }, findings: [] },
  {
    id: "an unbound site refuses, naming the file, the line and the marker",
    sites: [SITE],
    bindings: {},
    findings: [`${SITE_FILE}:3: a gp site (binary "gp") lands without its R4 cost evidence`],
  },
  { id: "a binding for a file with no site is stale", sites: [], bindings: { [SITE_FILE]: FULL_BINDING }, findings: [`${SITE_FILE}: a stale binding`] },
  {
    id: "a clause that binds no case refuses, naming the clause",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, c: [] } },
    findings: [`${SITE_FILE}: clause (c) binds no case (fake rpc seam`],
  },
  {
    id: "a case in an absent test file refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, a: [{ file: "test/absent.test.ts", title: "records each call" }] } },
    findings: [`clause (a) case "records each call" of test/absent.test.ts is in an absent file`],
  },
  {
    id: "an unregistered title refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, b: [pin("cuts at the budget")] } },
    findings: [`clause (b) case "cuts at the budget" of ${PROOF_FILE} is absent`],
  },
  {
    id: "a held case refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, d: [pin("a held case")] } },
    findings: [`clause (d) case "a held case" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case of a held suite refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, a: [pin("a case of a held suite")] } },
    findings: [`clause (a) case "a case of a held suite" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case held by skip refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, b: [pin("a skip case")] } },
    findings: [`clause (b) case "a skip case" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case held by todo refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, c: [pin("a todo case")] } },
    findings: [`clause (c) case "a todo case" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case held by only refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, d: [pin("an only case")] } },
    findings: [`clause (d) case "an only case" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case held by runIf refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, a: [pin("a runIf case")] } },
    findings: [`clause (a) case "a runIf case" of ${PROOF_FILE} is skipped`],
  },
  {
    id: "a case held by fails refuses",
    sites: [SITE],
    bindings: { [SITE_FILE]: { ...FULL_BINDING, b: [pin("a fails case")] } },
    findings: [`clause (b) case "a fails case" of ${PROOF_FILE} is skipped`],
  },
];

/** The shared census helper's module as a census-tier file imports it (./helpers/census.js, wb-u62). */
const CENSUS_HELPER = /(?:^|\/)helpers\/census(?:\.js|\.ts)?$/;
/** True when a source imports the value judge, aliased or not, from the shared census helper. */
function importsJudge(file: string, source: string): boolean {
  return parse(file, source).statements.some((statement) => {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !CENSUS_HELPER.test(statement.moduleSpecifier.text)) return false;
    const clause = statement.importClause;
    const named = clause?.namedBindings;
    return (
      clause?.isTypeOnly !== true &&
      named !== undefined &&
      ts.isNamedImports(named) &&
      named.elements.some((element) => !element.isTypeOnly && (element.propertyName ?? element.name).text === "judge")
    );
  });
}
/** Every string token of a source, read through the parser, so a title written only in a comment never counts. */
function stringTokens(file: string, source: string): ReadonlySet<string> {
  const found = new Set<string>();
  const visit = (node: ts.Node): void => {
    const text = stringText(node);
    if (text !== undefined) found.add(text);
    ts.forEachChild(node, visit);
  };
  visit(parse(file, source));
  return found;
}
/** Every refusal of the judge leg; [] when each bound case is named, file and title, by a census-tier file that imports judge. */
function judgeLegFindings(bindings: Readonly<Record<string, CostBinding>>, census: ReadonlyMap<string, string>): string[] {
  const legs = [...census].filter(([file, source]) => importsJudge(file, source)).map(([file, source]) => stringTokens(file, source));
  return Object.keys(bindings)
    .sort()
    .flatMap((site) =>
      CLAUSES.flatMap((clause) =>
        (bindings[site]?.[clause.id] ?? [])
          .filter((bound) => !legs.some((strings) => strings.has(bound.file) && strings.has(bound.title)))
          .map(
            (bound) =>
              `${site}: clause (${clause.id}) case ${JSON.stringify(bound.title)} of ${bound.file} is judged by no census-tier leg (a test/*.census.ts file that imports judge from test/helpers/census.ts and names the case's file and title)`,
          ),
      ),
    );
}
/** The census-tier files, read only once a binding exists: an empty table reads none, so the live leg adds no read set today. */
const censusTier = (bindings: Readonly<Record<string, CostBinding>>): ReadonlyMap<string, string> =>
  Object.keys(bindings).length === 0
    ? new Map()
    : new Map(
        filesUnder("test")
          .filter((file) => file.endsWith(".census.ts"))
          .map((file) => [file, read(file)] as const),
      );

const LEG_FILE = "test/workbench-gp-adapter.census.ts";
/** A census-tier leg that judges every case FULL_BINDING binds through the shared helper. */
const LEG_SOURCE = [
  'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge } from "./helpers/census.js";',
  `const FILE = "${PROOF_FILE}";`,
  'const TITLES = ["records each call", "cuts at the read budget", "opens one session for %s decisions", "aggregates the percentiles"];',
  "const PINS: CasePin[] = TITLES.map((title) => ({ file: FILE, title, tier: DEFAULT_GATE_TIER }));",
  "judge(DEFAULT_TIER_REPORT, PINS);",
].join("\n");
interface JudgeCase {
  readonly id: string;
  readonly bindings: Readonly<Record<string, CostBinding>>;
  /** The census-tier files the leg reads, as [file, source]. */
  readonly census: readonly (readonly [string, string])[];
  /** One substring per expected finding, in order. */
  readonly findings: readonly string[];
}
const unjudged = (clause: ClauseId, title: string): string => `${SITE_FILE}: clause (${clause}) case ${JSON.stringify(title)} of ${PROOF_FILE} is judged by no census-tier leg`;
const EVERY_CASE_UNJUDGED = [
  unjudged("a", "records each call"),
  unjudged("b", "cuts at the read budget"),
  unjudged("c", "opens one session for %s decisions"),
  unjudged("d", "aggregates the percentiles"),
];
const JUDGE_CASES: readonly JudgeCase[] = [
  {
    id: "a binding whose every case a census-tier leg names beside an imported judge is judged",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE]],
    findings: [],
  },
  {
    id: "an aliased judge import is a leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace("judge }", "judge as judgeReport }").replace("judge(DEFAULT", "judgeReport(DEFAULT")]],
    findings: [],
  },
  { id: "a binding with no census-tier leg refuses every bound case", bindings: { [SITE_FILE]: FULL_BINDING }, census: [], findings: EVERY_CASE_UNJUDGED },
  {
    id: "a leg that names the cases but imports no judge is no leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace(", judge }", " }").replace("judge(DEFAULT_TIER_REPORT, PINS);", "void PINS;")]],
    findings: EVERY_CASE_UNJUDGED,
  },
  {
    id: "a judge imported from another module is no leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace("./helpers/census.js", "./helpers/judge.js")]],
    findings: EVERY_CASE_UNJUDGED,
  },
  {
    id: "a judge imported from a module that only extends the helper's name is no leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace("./helpers/census.js", "./helpers/census-extra.js")]],
    findings: EVERY_CASE_UNJUDGED,
  },
  {
    id: "a leg that names another test file leaves every bound case unjudged",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace(`const FILE = "${PROOF_FILE}";`, 'const FILE = "test/workbench-other.test.ts";')]],
    findings: EVERY_CASE_UNJUDGED,
  },
  {
    id: "a leg that names another title leaves the bound case unjudged",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace('"aggregates the percentiles"', '"aggregates the medians"')]],
    findings: [unjudged("d", "aggregates the percentiles")],
  },
  {
    id: "a title the leg names only in a comment is not named",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace(', "aggregates the percentiles"]', "]; // aggregates the percentiles")]],
    findings: [unjudged("d", "aggregates the percentiles")],
  },
  {
    id: "an import type statement is no leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace("import { type CasePin,", "import type { CasePin,")]],
    findings: EVERY_CASE_UNJUDGED,
  },
  {
    id: "a type-only judge specifier is no leg",
    bindings: { [SITE_FILE]: FULL_BINDING },
    census: [[LEG_FILE, LEG_SOURCE.replace("DEFAULT_TIER_REPORT, judge }", "DEFAULT_TIER_REPORT, type judge }")]],
    findings: EVERY_CASE_UNJUDGED,
  },
  { id: "an empty table owes no leg", bindings: {}, census: [], findings: [] },
];

// ---- G3: the docs census --------------------------------------------------------------------------------------------

interface Claim {
  readonly file: string;
  readonly line: number;
  readonly family: string;
  readonly text: string;
}
interface ClaimFixture {
  readonly id: string;
  readonly line: string;
}
interface ClaimQuietFixture extends ClaimFixture {
  /** Why the line reads no claim: the text of its anchor line in the receipt. */
  readonly why: string;
}
interface ClaimFamily {
  readonly id: string;
  readonly matches: string;
  readonly pattern: RegExp;
  /** Lines naming gp that must read as a claim of this family. */
  readonly fixtures: readonly ClaimFixture[];
}

/** The claim subject: gp as a word, or GraphPolicy in any spelling (graph-policy, graph policy, graph_policy). */
const SUBJECT = /\bgp\b|graph[-_ ]?policy/i;
/** The cost claims a docs line can make about gp without an evaluation receipt. */
const CLAIM_FAMILIES: readonly ClaimFamily[] = [
  {
    id: "bottleneck",
    matches:
      "a bottleneck denied, read before the word bottleneck or bottlenecks: no, without or nor with up to two words between, or not, never, cannot or n't with an optional be, become or becomes, then a, an or the and an optional word between, such as no bottleneck, no-bottleneck, without a new bottleneck, isn't the bottleneck and will not become a bottleneck",
    pattern:
      /\b(?:no|without|nor)[\s-]+(?:[a-z-]+\s+){0,2}bottlenecks?\b|(?:\bnot|\bnever|\bcannot|n't)\s+(?:(?:be|become|becomes)\s+)?(?:a|an|the)\s+(?:[a-z-]+\s+)?bottlenecks?\b/i,
    fixtures: [
      { id: "denied", line: "GraphPolicyCLI inference adds no bottleneck to the dispatch loop." },
      { id: "not-a", line: "Calling gp per decision is not a bottleneck." },
      { id: "isnt-a", line: "Calling gp per decision isn't a bottleneck." },
      { id: "not-the", line: "The gp session is not the bottleneck." },
      { id: "never-the", line: "gp inference is never the bottleneck here." },
      { id: "bold", line: "GraphPolicyCLI scoring adds no **bottleneck**." },
      { id: "code", line: "GraphPolicyCLI scoring adds no `bottleneck`." },
      { id: "no-longer", line: "gp evaluation is no longer a bottleneck." },
      { id: "measurable", line: "gp adds no measurable bottleneck." },
      { id: "significant", line: "A resident gp session is not a significant bottleneck." },
      { id: "become", line: "Graph policy scoring will not become a bottleneck." },
      { id: "hyphen", line: "gp runs on the no-bottleneck path." },
      { id: "snake-subject", line: "graph_policy inference adds no bottleneck." },
      { id: "cannot", line: "A resident gp session cannot be a bottleneck." },
      { id: "nor", line: "gp adds neither latency nor a bottleneck." },
      { id: "without", line: "gp scores each decision without a new bottleneck." },
      { id: "becomes", line: "gp evaluation never becomes a bottleneck." },
      { id: "an", line: "gp is not an obvious bottleneck." },
      { id: "plural", line: "gp adds no bottlenecks." },
      { id: "html", line: "GraphPolicyCLI scoring adds no <em>bottleneck</em>." },
      { id: "nested", line: "GraphPolicyCLI scoring adds no ***bottleneck***." },
      { id: "link", line: "GraphPolicyCLI scoring adds no [bottleneck](docs/workbench/x.md)." },
    ],
  },
  {
    id: "percentile",
    matches: "a p50, p95 or p99 figure: the percentile, then a number and a time unit within forty characters",
    pattern: /\bp(?:50|95|99)\b\D{0,40}?\d+(?:\.\d+)?\s*(?:ns|us|ms|s)\b/i,
    fixtures: [
      { id: "figure", line: "The gp decision p95 is 4.2 ms on this host." },
      { id: "colon", line: "GraphPolicy evaluate p99: 12ms." },
    ],
  },
  {
    id: "negligible",
    matches: "a cost called negligible, cheap, zero or low: negligible, cheap, zero-cost, low-latency, low-overhead",
    pattern: /\b(?:negligible|cheap|zero[- ](?:cost|overhead|latency)|low[- ](?:cost|overhead|latency))\b/i,
    fixtures: [
      { id: "negligible", line: "One resident gp rpc session keeps the overhead negligible." },
      { id: "low-overhead", line: "Graph policy scoring is a low-overhead step." },
    ],
  },
];
const CLAIM_ROWS = CLAIM_FAMILIES.flatMap((family) => family.fixtures.map((fixture) => ({ family: family.id, ...fixture })));

/** Lines that must read no claim: no subject (the docs/10 navigation figure), no cost word, the program's own directive, requirements. */
const CLAIM_QUIET: readonly ClaimQuietFixture[] = [
  {
    id: "no-subject",
    why: "a percentile figure beside no gp subject, the docs/10 navigation line",
    line: "Navigation p95 was 0.389 ms and maximum 17.69 ms across 1,000 samples.",
  },
  { id: "no-claim", why: "GraphPolicyCLI named beside no cost word", line: "GraphPolicyCLI owns scores, embeddings and receipts." },
  {
    id: "directive",
    why: "the program's directive not to make inference a new bottleneck denies nothing",
    line: "Do not make GraphPolicyCLI inference a new bottleneck.",
  },
  { id: "requirement", why: "the requirement to measure the percentiles states no figure", line: "Measure gp p50, p95 and p99 decision latency." },
  { id: "must-not", why: "a requirement that a call must not create one denies nothing", line: "A gp call must not create a bottleneck in the dispatch loop." },
  { id: "affirmed", why: "a bottleneck affirmed is no denial", line: "The gp session is the bottleneck we measure first." },
];

/** What a reader sees of one line: marked's inline tokens, with emphasis, code span and link text kept and HTML dropped. */
function readerText(line: string): string {
  const render = (tokens: readonly Token[]): string =>
    tokens
      .map((token): string => {
        if (token.type === "html") return "";
        if ("tokens" in token && token.tokens !== undefined && token.tokens.length > 0) return render(token.tokens);
        return "text" in token && typeof token.text === "string" ? token.text : token.raw;
      })
      .join("");
  return render(Lexer.lexInline(line));
}
/** Every claim of a text: each line is read as written and as its reader sees it, and a family claims the line when the subject and its pattern meet in one reading. */
function claimsIn(file: string, text: string): Claim[] {
  return text.split("\n").flatMap((line, index) => {
    const readings = [line, readerText(line)];
    return CLAIM_FAMILIES.filter((family) => readings.some((reading) => SUBJECT.test(reading) && family.pattern.test(reading))).map((family) => ({
      file,
      line: index + 1,
      family: family.id,
      text: line,
    }));
  });
}

/** The figures clause (d) names: the three percentiles, inference, and the instrumentation overhead apart from it. */
const FIGURES = [
  { id: "p50", label: "p50", states: "the median decision latency" },
  { id: "p95", label: "p95", states: "the 95th percentile decision latency" },
  { id: "p99", label: "p99", states: "the 99th percentile decision latency" },
  { id: "inference", label: "inference", states: "the time spent in gp inference" },
  { id: "instrumentation-overhead", label: "instrumentation overhead", states: "the instrumentation cost, apart from inference" },
] as const;
/** A figure: its label, then within forty non-digit characters a number and a time unit. */
const figureOf = (label: string): RegExp => new RegExp(`\\b${label}\\b\\D{0,40}?\\d+(?:\\.\\d+)?\\s*(?:ns|us|ms|s)\\b`, "i");
const isEvaluationReceipt = (text: string): boolean => FIGURES.every((figure) => figureOf(figure.label).test(text));
const CITED_RECEIPT = /receipts\/([A-Za-z0-9._-]+\.md)/g;

/** Every claim that is neither inside an evaluation receipt nor cites one on its own line. */
function claimFindings(claims: readonly Claim[], readFile: (file: string) => string | undefined): string[] {
  return claims.flatMap((claim) => {
    const own = readFile(claim.file);
    if (claim.file.startsWith("docs/workbench/receipts/") && own !== undefined && isEvaluationReceipt(own)) return [];
    const cited = [...claim.text.matchAll(CITED_RECEIPT)].map((match) => `docs/workbench/receipts/${match[1]}`);
    if (cited.some((file) => isEvaluationReceipt(readFile(file) ?? ""))) return [];
    const why = cited.length === 0 ? "names no receipts/<bead>.md" : `cites ${cited.join(", ")}, which states no p50, p95, p99, inference and instrumentation overhead figures`;
    return [`${claim.file}:${claim.line}: a ${claim.family} claim about gp cites no evaluation receipt (wb-1xvp.5 clause (d)): the line ${why}`];
  });
}

const DOCS_FILES = ["README.md", "CHANGELOG.md", ...filesUnder("docs").filter((file) => file.endsWith(".md"))];
/** Every docs claim, read once at collection, so no case pays the inline lexing inside its own timeout. */
const DOCS_CLAIMS = DOCS_FILES.flatMap((file) => claimsIn(file, read(file)));

const EVALUATION = "- gp decision latency over 400 recorded calls: p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.";
/** An evaluation whose p50 number sits `gap` non-digit characters after its label, either side of figureOf's forty-character bound. */
const figureAt = (gap: number): string =>
  `- gp decision latency: p50${" ".repeat(gap)}3.1 ms, p95 7.9 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n`;
/** An evaluation receipt, and one receipt per figure that states every other figure but that one. */
const evidenceFiles = new Map([
  ["docs/workbench/receipts/wb-eval.md", `# wb-eval: an evaluation\n\n## 2026-11-01 receipt\n\n${EVALUATION}\n`],
  ["docs/workbench/receipts/wb-no-p50.md", "- p95 7.9 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-p95.md", "- p50 3.1 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-p99.md", "- p50 3.1 ms, p95 7.9 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-inference.md", "- p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-overhead.md", "- p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; inference 2.2 ms.\n"],
  ["docs/workbench/receipts/wb-near.1.md", figureAt(40)],
  ["docs/workbench/receipts/wb-far.1.md", figureAt(41)],
]);
interface EvidenceCase {
  readonly id: string;
  readonly file: string;
  readonly text: string;
  readonly findings: number;
}
const EVIDENCE_CASES: readonly EvidenceCase[] = [
  { id: "a claim citing an evaluation receipt is evidenced", file: "docs/workbench/x.md", text: "gp adds no bottleneck (docs/workbench/receipts/wb-eval.md).", findings: 0 },
  { id: "a claim inside an evaluation receipt is its own evidence", file: "docs/workbench/receipts/wb-eval.md", text: evidenceFiles.get("docs/workbench/receipts/wb-eval.md") ?? "", findings: 0 },
  { id: "a claim citing no receipt refuses", file: "README.md", text: "gp adds no bottleneck.", findings: 1 },
  { id: "a claim citing an absent receipt refuses", file: "docs/workbench/x.md", text: "gp adds no bottleneck (receipts/wb-absent.md).", findings: 1 },
  { id: "a receipt without the p50 figure is no evaluation receipt", file: "docs/workbench/x.md", text: "gp p95 7.9 ms (receipts/wb-no-p50.md).", findings: 1 },
  { id: "a receipt without the p95 figure is no evaluation receipt", file: "docs/workbench/x.md", text: "gp p95 7.9 ms (receipts/wb-no-p95.md).", findings: 1 },
  { id: "a receipt without the p99 figure is no evaluation receipt", file: "docs/workbench/x.md", text: "gp p95 7.9 ms (receipts/wb-no-p99.md).", findings: 1 },
  { id: "a receipt without the inference figure is no evaluation receipt", file: "docs/workbench/x.md", text: "gp p95 7.9 ms (receipts/wb-no-inference.md).", findings: 1 },
  { id: "a receipt without the instrumentation overhead figure is no evaluation receipt", file: "docs/workbench/x.md", text: "gp p95 7.9 ms (receipts/wb-no-overhead.md).", findings: 1 },
  { id: "an evaluation outside docs/workbench/receipts/ is not its own evidence", file: "docs/workbench/x.md", text: EVALUATION, findings: 1 },
  { id: "a figure forty non-digit characters after its label is stated", file: "docs/workbench/x.md", text: "gp adds no bottleneck (receipts/wb-near.1.md).", findings: 0 },
  { id: "a figure forty-one non-digit characters after its label is not stated", file: "docs/workbench/x.md", text: "gp adds no bottleneck (receipts/wb-far.1.md).", findings: 1 },
];

// ---- residuals, frozen shape and anchor -----------------------------------------------------------------------------

/** A residual's reading as data: the reader and what it reads ("src" is the live src listing G1 parses). */
type Probe =
  | { readonly reader: "sites"; readonly source: string }
  | { readonly reader: "scope"; readonly files: "src" | readonly string[] }
  | { readonly reader: "bindings"; readonly proof: string; readonly titles: readonly string[] }
  | { readonly reader: "claims"; readonly text: string }
  | { readonly reader: "evaluation"; readonly text: string };
/** The one reader of every residual row, through the guard's own functions, so a hollowed function reds the paired control of each row that uses it. */
function readProbe(probe: Probe): unknown {
  switch (probe.reader) {
    case "sites":
      return siteKeys(sitesIn(SITE_FILE, probe.source));
    case "scope": {
      const files = probe.files === "src" ? SRC_FILES : probe.files;
      return { roots: [...new Set(files.map((file) => file.split("/")[0]))], unread: files.filter((file) => !file.endsWith(".ts")) };
    }
    case "bindings": {
      const pins = probe.titles.map(pin);
      return bindingFindings([SITE], { [SITE_FILE]: { a: pins, b: pins, c: pins, d: pins } }, (file) => (file === PROOF_FILE ? probe.proof : undefined));
    }
    case "claims":
      return claimsIn("docs/workbench/x.md", probe.text).map((claim) => claim.family);
    case "evaluation":
      return isEvaluationReceipt(probe.text);
  }
}
/** The finding the binding locator reports for a title under every clause, in clause order. */
const locatorFindings = (title: string, state: CaseState): string[] =>
  CLAUSES.map((clause) => `${SITE_FILE}: clause (${clause.id}) case ${JSON.stringify(title)} of ${PROOF_FILE} is ${state}`);

/** The skip member, composed into the context-skip registration so no line of this file spells a skip call. */
const SKIP = "skip";
/** Registrations the locator reads as registered though each never runs plainly or never asserts (the R-LOCATOR blind spot). */
const LOCATOR_PROOF = [
  'it("an options-object skip", { skip: true }, () => { expect(1).toBe(1); });',
  'describe("an options-object suite", { skip: true }, () => { it("a case of an options-object suite", () => { expect(1).toBe(1); }); });',
  'it("an options-object todo", { todo: true }, () => {});',
  'it("an options-object only", { only: true }, () => { expect(1).toBe(1); });',
  'it("an options-object fails", { fails: true }, () => { expect(1).toBe(2); });',
  `it("a context skip", (context) => { context.${SKIP}(); expect(1).toBe(1); });`,
  'it.each([])("an empty each %s", () => { expect(1).toBe(1); });',
  '{ const it = (title: string, body: () => void): void => void [title, body]; it("a shadowed it", () => { expect(1).toBe(1); }); }',
  'function neverCalled(): void { it("a case in a function never called", () => { expect(1).toBe(1); }); }',
  'if (false) { it("a case under if (false)", () => { expect(1).toBe(1); }); }',
  'it("a hollow body", () => { return; });',
  'it("an unrelated case", () => { expect(1).toBe(1); });',
].join("\n");
const LOCATOR_TITLES = [
  "an options-object skip",
  "a case of an options-object suite",
  "an options-object todo",
  "an options-object only",
  "an options-object fails",
  "a context skip",
  "an empty each %s",
  "a shadowed it",
  "a case in a function never called",
  "a case under if (false)",
  "a hollow body",
  "an unrelated case",
];

interface Residual {
  readonly id: string;
  readonly blindSpot: string;
  /** The blind spot, read: a change to its reading is red here. */
  readonly probe: Probe;
  readonly quiet: unknown;
  /** The paired control, one change away and read by the same reader: it reads what the blind spot hides, so a hollowed reader is red. */
  readonly control: Probe;
  readonly controlReads: unknown;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-RUNTIME",
    blindSpot: "a binary name built at run time or read from settings or the environment is no string token, so its spawn is no site",
    probe: { reader: "sites", source: 'spawn(["g", "p"].join(""), argv);\nspawn(process.env.POLICY_BINARY ?? "", argv);' },
    quiet: [],
    control: { reader: "sites", source: 'spawn("gp", argv);\nspawn(process.env.POLICY_BINARY ?? "gp", argv);' },
    controlReads: ["binary:gp", "binary:gp"],
  },
  {
    id: "R-SCOPE",
    blindSpot: "only the .ts files under src/ are read; qa/, examples/ and test/ hold tooling and evaluation, never the machine's decision loop",
    probe: { reader: "scope", files: "src" },
    quiet: { roots: ["src"], unread: [] },
    control: { reader: "scope", files: ["qa/gp-bench.ts", "src/index.ts", "src/workbench/notes.md"] },
    controlReads: { roots: ["qa", "src"], unread: ["src/workbench/notes.md"] },
  },
  {
    id: "R-REPORT",
    blindSpot:
      "a bound case is located in its test source, never judged in vitest's report, so a case that fails, never collects or asserts nothing passes this locator; the judge leg G2 requires is located the same way, by its import of judge and the case's file and title as string tokens, never by reading its judge call or the verdict that call returns",
    probe: { reader: "bindings", proof: 'it("hollow", () => {});', titles: ["hollow"] },
    quiet: [],
    control: { reader: "bindings", proof: 'it.skipIf(true)("hollow", () => {});', titles: ["hollow"] },
    controlReads: locatorFindings("hollow", "skipped"),
  },
  {
    id: "R-LINE",
    blindSpot: "a cost claim whose subject is named on another line is not read as a gp claim",
    probe: { reader: "claims", text: "The gp adapter opens one resident session per run.\nIt adds no bottleneck." },
    quiet: [],
    control: { reader: "claims", text: "The gp adapter opens one resident session per run and adds no bottleneck." },
    controlReads: ["bottleneck"],
  },
  {
    id: "R-FIGURES",
    blindSpot: "an evaluation receipt is admitted by the shape of its figures, never by recomputing them from per-call records",
    probe: { reader: "evaluation", text: "- p50 9 ms, p95 2 ms, p99 1 ms; inference 5 ms; instrumentation overhead 7 ms." },
    quiet: true,
    control: { reader: "evaluation", text: "- p50 9 ms, p95 2 ms, p99 1 ms; inference 5 ms." },
    controlReads: false,
  },
  {
    id: "R-LOCATOR",
    blindSpot:
      "the binding locator reads a registration's call chain and its enclosing suites only, so an options object such as { skip: true }, { todo: true }, { only: true } or { fails: true } on a case or a suite, a skip called through the test context, an empty each table, a shadowed it, a registration in a function never called or under if (false), a hollow body and an unrelated title each read as registered; G2 therefore never admits a binding on this locator alone",
    probe: { reader: "bindings", proof: LOCATOR_PROOF, titles: LOCATOR_TITLES },
    quiet: [],
    control: { reader: "bindings", proof: LOCATOR_PROOF, titles: ["a title the proof never registers"] },
    controlReads: locatorFindings("a title the proof never registers", "absent"),
  },
  {
    id: "R-MARKUP",
    blindSpot:
      "a claim spelled through markup that marked's inline lexer leaves as written, such as a character reference or an undefined reference-style link between its words, is read as its raw text",
    probe: { reader: "claims", text: "gp adds no&#32;bottleneck and no [bottleneck][r]." },
    quiet: [],
    control: { reader: "claims", text: "gp adds no **bottleneck**." },
    controlReads: ["bottleneck"],
  },
  {
    id: "R-PHRASING",
    blindSpot:
      "a bottleneck denial phrased outside the bottleneck family's grammar, such as bottleneck-free, hardly a bottleneck, far from a bottleneck or does not constitute a bottleneck, or split across a line break, reads no claim",
    probe: {
      reader: "claims",
      text: [
        "gp is bottleneck-free.",
        "gp isn't really a bottleneck.",
        "gp is hardly a bottleneck.",
        "gp never creates a bottleneck.",
        "gp does not bottleneck the dispatch loop.",
        "gp won't bottleneck the dispatch loop.",
        "gp adds zero bottlenecks.",
        "gp adds no new decision-loop latency bottleneck.",
        "gp is not, in practice, a bottleneck.",
        "gp is not a very significant bottleneck.",
        "gp will not become any bottleneck.",
        "gp is far from a bottleneck.",
        "gp adds no bottle-neck.",
        "gp does not constitute a bottleneck.",
        "Bottlenecks from gp: none.",
        "gp adds no",
        "bottleneck.",
        "gp is not a",
        "bottleneck.",
      ].join("\n"),
    },
    quiet: [],
    control: { reader: "claims", text: "gp adds no bottleneck." },
    controlReads: ["bottleneck"],
  },
  {
    id: "R-REQUIREMENT",
    blindSpot:
      "a requirement, a question or an open doubt spelled in the bottleneck family's grammar beside the subject, such as must not be a bottleneck, is it not a bottleneck? or whether it is not a bottleneck, reads as a denial, so a docs line that restates the program directive in that form cites an evaluation receipt or is reworded",
    probe: {
      reader: "claims",
      text: [
        "gp must not be a bottleneck.",
        "GraphPolicyCLI inference must not be a new bottleneck.",
        "The program requires that gp never be a bottleneck.",
        "Is gp not a bottleneck? The evaluation decides.",
        "Whether gp is not a bottleneck is unmeasured.",
      ].join("\n"),
    },
    quiet: ["bottleneck", "bottleneck", "bottleneck", "bottleneck", "bottleneck"],
    control: { reader: "claims", text: "A gp call must not create a bottleneck in the dispatch loop." },
    controlReads: [],
  },
  {
    id: "R-LAUNCHER",
    blindSpot:
      "a launcher spelled with another extension, such as gp.com, gp.sh or gp.vbs, names no gp binary, since only an @ version and a .cmd, .exe, .bat or .ps1 extension are dropped",
    probe: { reader: "sites", source: 'spawn("gp.com", []);\nspawn("gp.sh", []);\nspawn("gp.vbs", []);' },
    quiet: [],
    control: { reader: "sites", source: 'spawn("gp.bat", []);' },
    controlReads: ["binary:gp.bat"],
  },
];

// ---- the anchor readers and their forms (wb-vkdl F1, F2) -------------------------------------------------------------

const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** Every token marked's lexer reads in a markdown text, block and inline, depth first: list items and table cells included. */
function tokensOf(markdown: string): Token[] {
  const found: Token[] = [];
  const walk = (tokens: readonly Token[]): void => {
    for (const token of tokens) {
      found.push(token);
      if (isList(token)) walk(token.items);
      else if (isTable(token)) walk([...token.header, ...token.rows.flat()].flatMap((cell) => cell.tokens));
      else if ("tokens" in token && token.tokens !== undefined) walk(token.tokens);
    }
  };
  walk(new Lexer({ gfm: true }).lex(markdown));
  return found;
}
/** Every heading the lexer reads, as its hashes and text: ATX or setext, at any level, indented, in a block quote or a list item. */
const headingOutline = (markdown: string): string[] => tokensOf(markdown).filter(isHeading).map((token) => `${"#".repeat(token.depth)} ${token.text}`);
/** The raw text of every HTML token the lexer reads, block or inline: a comment, a tag or an element, wherever it sits. */
const htmlIn = (markdown: string): string[] =>
  tokensOf(markdown)
    .filter((token) => token.type === "html")
    .map((token) => token.raw);
/** The anchor lines of the last entry as rendered: each item of a top-level list after the last top-level heading, as `- <its text>`. */
function renderedListing(markdown: string): string[] {
  const blocks = new Lexer({ gfm: true }).lex(markdown);
  let last = -1;
  blocks.forEach((token, index) => {
    if (isHeading(token)) last = index;
  });
  return blocks
    .slice(last + 1)
    .filter(isList)
    .flatMap((list) => list.items.map((item) => `- ${item.text.trimEnd()}`))
    .filter((line) => ANCHOR_LINE.test(line));
}
type AnchorReader = "outline" | "html" | "listing";
const readAnchor = (reader: AnchorReader, text: string): string[] =>
  reader === "outline" ? headingOutline(text) : reader === "html" ? htmlIn(text) : renderedListing(text);
interface AnchorForm {
  readonly id: string;
  readonly reader: AnchorReader;
  /** What the form shows a reader: the text of its anchor line in the receipt. */
  readonly why: string;
  readonly text: string;
  readonly reads: readonly string[];
}
/** The forms each anchor reader must and must not read (the heading, markup and listing views of the receipt). */
const ANCHOR_FORMS: readonly AnchorForm[] = [
  { id: "atx", reader: "outline", why: "an ATX heading is a heading", text: "## 2026-10-25 receipt: x", reads: ["## 2026-10-25 receipt: x"] },
  { id: "setext", reader: "outline", why: "a line underlined with hyphens is a level-2 heading", text: "2026-10-25 receipt: x\n---", reads: ["## 2026-10-25 receipt: x"] },
  { id: "setext-level-1", reader: "outline", why: "a line underlined with equals signs is a level-1 heading", text: "Appendix\n===", reads: ["# Appendix"] },
  { id: "indented", reader: "outline", why: "an ATX heading indented up to three spaces is a heading", text: "   ## 2026-10-25 receipt: x", reads: ["## 2026-10-25 receipt: x"] },
  { id: "tab", reader: "outline", why: "an ATX heading whose hashes a tab follows is a heading", text: "##\t2026-10-25 receipt: x", reads: ["## 2026-10-25 receipt: x"] },
  { id: "deeper", reader: "outline", why: "a level-3 heading is a heading", text: "### 2026-10-25 receipt: x", reads: ["### 2026-10-25 receipt: x"] },
  { id: "closed", reader: "outline", why: "a closing run of hashes is no part of the heading text", text: "## 2026-10-25 receipt: x ##", reads: ["## 2026-10-25 receipt: x"] },
  { id: "quoted", reader: "outline", why: "a heading inside a block quote is a heading", text: "> ## 2026-10-25 receipt: x", reads: ["## 2026-10-25 receipt: x"] },
  { id: "list-item", reader: "outline", why: "a heading inside a list item is a heading", text: "- ## 2026-10-25 receipt: x", reads: ["## 2026-10-25 receipt: x"] },
  { id: "fenced", reader: "outline", why: "a heading line inside a code fence is code", text: "```\n## 2026-10-25 receipt: x\n```", reads: [] },
  { id: "indented-code", reader: "outline", why: "a heading line indented four spaces is code", text: "    ## 2026-10-25 receipt: x", reads: [] },
  { id: "escaped", reader: "outline", why: "an escaped hash opens no heading", text: "\\## 2026-10-25 receipt: x", reads: [] },
  { id: "no-space", reader: "outline", why: "hashes with no space or tab after them open no heading", text: "##2026-10-25 receipt: x", reads: [] },
  { id: "commented", reader: "outline", why: "a heading line inside an HTML comment is markup, which the html reader reads", text: "<!--\n## 2026-10-25 receipt: x\n-->", reads: [] },
  { id: "comment", reader: "html", why: "an HTML comment is markup", text: "<!--\n- Clause a: one.\n-->", reads: ["<!--\n- Clause a: one.\n-->"] },
  { id: "element", reader: "html", why: "an HTML heading element is markup", text: "<h2>2026-10-25 receipt: x</h2>", reads: ["<h2>2026-10-25 receipt: x</h2>"] },
  { id: "inline", reader: "html", why: "an inline tag is markup", text: "A note <span hidden>x</span> inline.", reads: ["<span hidden>", "</span>"] },
  { id: "in-item", reader: "html", why: "a comment inside a list item is markup", text: "- Clause a: one <!-- x --> two.", reads: ["<!-- x -->"] },
  { id: "in-cell", reader: "html", why: "a tag inside a table cell is markup", text: "| a |\n| - |\n| <b>x</b> |", reads: ["<b>", "</b>"] },
  { id: "code-span", reader: "html", why: "a tag inside a code span and a less-than sign in prose are no markup", text: "The tag `<h2>` and 1 < 2.", reads: [] },
  { id: "listing", reader: "listing", why: "the anchor lines are the items of the last entry's lists", text: "## a\n\n- Clause a: one.\n- Clause b: two.", reads: ["- Clause a: one.", "- Clause b: two."] },
  { id: "last-entry", reader: "listing", why: "only the last entry's items are read", text: "## a\n\n- Clause a: one.\n\n## b\n\n- Clause b: two.", reads: ["- Clause b: two."] },
  { id: "loose", reader: "listing", why: "an item of a loose list is read without the line break before the next item", text: "## a\n\n- Clause a: one.\n\n- Clause b: two.\n\n- A note.", reads: ["- Clause a: one.", "- Clause b: two."] },
  { id: "fenced-listing", reader: "listing", why: "an anchor line inside a code fence is no item", text: "## a\n\n```\n- Clause a: one.\n```", reads: [] },
  { id: "quoted-listing", reader: "listing", why: "an anchor line inside a block quote is no item of the entry's lists", text: "## a\n\n> - Clause a: one.", reads: [] },
  { id: "nested-listing", reader: "listing", why: "an anchor line nested under another item is no item of its own", text: "## a\n\n- Anchor listing.\n  - Clause a: one.", reads: [] },
];

// ---- each-liveness: the case set the closing tally holds (wb-mqm6 F7, wb-vkdl) ------------------------------------------

/** The key each fixed case records at its last line, in registration order (the tally is the file's last case). */
const FIXED_CASES = ["G1", "G1 control", "G1 positivity", "G2 judge leg", "G2 judge leg control", "G3", "G3 control", "frozen shape", "anchor"] as const;
/** Each it.each table, by the key its cases record under, with the key each of its rows records. */
const EACH_TABLES: readonly (readonly [string, readonly string[]])[] = [
  ["markers", MARKER_ROWS.map((row) => `${row.marker}/${row.id}`)],
  ["quiet", QUIET.map((row) => row.id)],
  ["binding cases", BINDING_CASES.map((row) => row.id)],
  ["judge cases", JUDGE_CASES.map((row) => row.id)],
  ["claims", CLAIM_ROWS.map((row) => `${row.family}/${row.id}`)],
  ["claim quiet", CLAIM_QUIET.map((row) => row.id)],
  ["evidence cases", EVIDENCE_CASES.map((row) => row.id)],
  ["residuals", RESIDUALS.map((row) => row.id)],
  ["anchor forms", ANCHOR_FORMS.map((row) => row.id)],
];
/** What this run's cases did: each case records its key at its last line, so a case cut short, sliced off or never run is missing. */
const REACHED = new Map<string, string[]>();
const reached = (table: string, key: string): void => {
  REACHED.set(table, [...(REACHED.get(table) ?? []), key]);
};

/** The digest of each fixture-bearing table's row content (F2): a row swapped for another passing row is red against the receipt. */
const TABLE_DIGESTS: readonly (readonly [string, string])[] = [
  ["markers", digestOf(MARKERS)],
  ["quiet", digestOf(QUIET)],
  ["claim-families", digestOf({ subject: SUBJECT.source, families: CLAIM_FAMILIES.map((family) => ({ ...family, pattern: [family.pattern.source, family.pattern.flags] })) })],
  ["claim-quiet", digestOf(CLAIM_QUIET)],
  ["bindings", digestOf({ proof: PROOF_SOURCE, full: FULL_BINDING, holds: HOLDS, cases: BINDING_CASES })],
  ["judge-leg", digestOf({ leg: LEG_SOURCE, cases: JUDGE_CASES })],
  ["evidence", digestOf({ files: [...evidenceFiles], cases: EVIDENCE_CASES })],
  ["residuals", digestOf(RESIDUALS)],
  ["anchor-forms", digestOf(ANCHOR_FORMS)],
  ["cases", digestOf({ fixed: FIXED_CASES, tables: EACH_TABLES.map(([table]) => table) })],
];

/** The receipt's entry headings in order (wb-mqm6 F4, wb-vkdl F1): an entry inserted or removed anywhere is red in either view, and the last carries the listing. */
const RECEIPT_HEADINGS = [
  "## 2026-10-22 receipt: the gp decision-cost guard pins today's absence and refuses an unbound gp site (base 0b2a80f)",
  "## 2026-10-23 receipt: the follow-up wb-mqm6 anchors every table and its row content outside the guard",
  "## 2026-10-25 receipt: the follow-up wb-vkdl reads this file's headings, markup and listing as a reader sees them",
] as const;
/** The listing the receipt's last entry must equal, line for line: one plain-text line per member, then the table digests. */
const LISTING: readonly string[] = [
  ...CLAUSES.map((clause) => `- Clause ${clause.id}: ${clause.phrase}.`),
  ...MARKERS.map((marker) => `- Marker ${marker.id}: ${marker.matches}.`),
  ...CLAIM_FAMILIES.map((family) => `- Claim family ${family.id}: ${family.matches}.`),
  ...FIGURES.map((figure) => `- Figure ${figure.id}: ${figure.label}, ${figure.states}.`),
  ...RESIDUALS.map((residual) => `- Residual ${residual.id}: ${residual.blindSpot}.`),
  ...HOLDS.map((hold) => `- Hold ${hold.id}: ${hold.keeps}.`),
  ...QUIET.map((row) => `- Quiet ${row.id}: ${row.why}.`),
  ...CLAIM_QUIET.map((row) => `- Claim quiet ${row.id}: ${row.why}.`),
  ...BINDING_CASES.map((row, index) => `- Binding case ${index + 1}: ${row.id}.`),
  ...JUDGE_CASES.map((row, index) => `- Judge case ${index + 1}: ${row.id}.`),
  ...EVIDENCE_CASES.map((row, index) => `- Evidence case ${index + 1}: ${row.id}.`),
  ...ANCHOR_FORMS.map((row) => `- Anchor form ${row.id}: ${row.why}.`),
  ...TABLE_DIGESTS.map(([table, digest]) => `- Digest ${table}: ${digest}.`),
];
/** One anchor line of a receipt entry: `- <kind> <id>: <text>.`, plain text with no inline markup. */
const ANCHOR_LINE =
  /^- (Clause|Marker|Claim family|Claim quiet|Figure|Residual|Hold|Quiet|Binding case|Judge case|Evidence case|Anchor form|Digest) ([A-Za-z0-9-]+): (.+)\.$/;
/** The anchor lines of the entry under one heading, up to the next entry heading. */
function entryListing(markdown: string, heading: string): string[] {
  const lines = markdown.split("\n");
  const start = lines.indexOf(heading);
  if (start < 0) return [];
  const end = lines.findIndex((line, index) => index > start && line.startsWith("## "));
  return lines.slice(start + 1, end < 0 ? undefined : end).filter((line) => ANCHOR_LINE.test(line));
}

describe("wb-1xvp.5 G1: a gp site in src lands only bound to its cost evidence", () => {
  it("G1: every .ts file under src that holds a gp site is bound in GP_COST_BINDINGS, and the table is empty, so none holds one", () => {
    expect(SRC_FILES.length).toBeGreaterThan(0);
    expect(GP_COST_BINDINGS).toStrictEqual({});
    expect(bindingFindings(srcSites(), GP_COST_BINDINGS, readIfPresent)).toEqual([]);
    reached("cases", "G1");
  });

  it("G1 control: the same reader finds the real CLI spawns in src (rf in providers/reactivefiber.ts, git in index.ts), so a silent gp reading is not a blind one", () => {
    const filesOf = (binary: string): string[] => [...new Set(srcSites(binary).filter((site) => site.marker === "binary").map((site) => site.file))];
    expect(filesOf("rf")).toContain("src/workbench/providers/reactivefiber.ts");
    expect(filesOf("git")).toContain("src/index.ts");
    reached("cases", "G1 control");
  });

  it.each(MARKER_ROWS)("G1 marker $marker, fixture $id: the snippet reads its sites", (row) => {
    expect(siteKeys(sitesIn(SITE_FILE, row.source))).toEqual(row.sites);
    reached("markers", `${row.marker}/${row.id}`);
  });

  it("G1: every fixture of a marker reads at least one site, and only sites of that marker", () => {
    for (const marker of MARKERS) {
      for (const fixture of marker.fixtures) {
        const found = sitesIn(SITE_FILE, fixture.source);
        expect(found.length, `${marker.id}/${fixture.id}`).toBeGreaterThan(0);
        expect(found.filter((site) => site.marker !== marker.id), `${marker.id}/${fixture.id}`).toEqual([]);
      }
    }
    reached("cases", "G1 positivity");
  });

  it.each(QUIET)("G1 quiet $id: the snippet reads no site", (row) => {
    expect(siteKeys(sitesIn(SITE_FILE, row.source))).toEqual(row.sites);
    reached("quiet", row.id);
  });
});

describe("wb-1xvp.5 G2: a binding names a registered case for each clause", () => {
  it.each(BINDING_CASES)("G2: $id", (row) => {
    const findings = bindingFindings(row.sites, row.bindings, (file) => proofFiles.get(file));
    expect(findings).toHaveLength(row.findings.length);
    row.findings.forEach((expected, index) => {
      expect(findings[index]).toContain(expected);
    });
    reached("binding cases", row.id);
  });

  it("G2 judge leg: every bound case is named by a census-tier leg that imports judge from test/helpers/census.ts, and the table is empty, so none is owed today", () => {
    expect(judgeLegFindings(GP_COST_BINDINGS, censusTier(GP_COST_BINDINGS))).toEqual([]);
    reached("cases", "G2 judge leg");
  });

  it("G2 judge leg control: a binding reads every census-tier file of the tree, an empty table reads none, and the reader finds a real leg importing judge", () => {
    const tier = censusTier({ [SITE_FILE]: FULL_BINDING });
    expect([...tier.keys()]).toEqual(filesUnder("test").filter((file) => file.endsWith(".census.ts")));
    expect(tier.size).toBeGreaterThan(0);
    expect(censusTier({}).size).toBe(0);
    expect([...tier].some(([file, source]) => importsJudge(file, source))).toBe(true);
    reached("cases", "G2 judge leg control");
  });

  it.each(JUDGE_CASES)("G2 judge leg: $id", (row) => {
    const findings = judgeLegFindings(row.bindings, new Map(row.census));
    expect(findings).toHaveLength(row.findings.length);
    row.findings.forEach((expected, index) => {
      expect(findings[index]).toContain(expected);
    });
    reached("judge cases", row.id);
  });
});

describe("wb-1xvp.5 G3: no docs line claims gp decision cost without an evaluation receipt", () => {
  it("G3: every gp cost claim of README.md, CHANGELOG.md and the docs .md files cites an evaluation receipt, and this receipt is none", () => {
    expect(DOCS_FILES).toEqual(expect.arrayContaining(["README.md", "CHANGELOG.md", "docs/workbench/07-native-integrations.md", RECEIPT]));
    expect(claimFindings(DOCS_CLAIMS, readIfPresent)).toEqual([]);
    expect(isEvaluationReceipt(read(RECEIPT))).toBe(false);
    reached("cases", "G3");
  });

  it("G3 control: the claim families read real docs (the docs/10 navigation p95 figure is a percentile line, and it names no gp)", () => {
    const percentile = CLAIM_FAMILIES.find((family) => family.id === "percentile")?.pattern ?? /$^/;
    const lines = read("docs/workbench/10-terminal-inspector.md")
      .split("\n")
      .filter((line) => percentile.test(line));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.filter((line) => SUBJECT.test(line))).toEqual([]);
    reached("cases", "G3 control");
  });

  it.each(CLAIM_ROWS)("G3 family $family, fixture $id: the line reads one claim of its family", (row) => {
    expect(claimsIn("docs/workbench/x.md", row.line).map((claim) => claim.family)).toEqual([row.family]);
    reached("claims", `${row.family}/${row.id}`);
  });

  it.each(CLAIM_QUIET)("G3 quiet $id: the line reads no claim", (row) => {
    expect(claimsIn("docs/workbench/x.md", row.line)).toEqual([]);
    reached("claim quiet", row.id);
  });

  it.each(EVIDENCE_CASES)("G3 evidence: $id", (row) => {
    const files = new Map([...evidenceFiles, [row.file, row.text]]);
    const claims = claimsIn(row.file, row.text);
    expect(claims.length).toBeGreaterThan(0);
    expect(claimFindings(claims, (file) => files.get(file))).toHaveLength(row.findings);
    reached("evidence cases", row.id);
  });
});

describe("wb-1xvp.5 shape: frozen tables, the receipt anchor and the named residuals", () => {
  it("frozen shape (standing rule 16): every table keeps its rows, its pins, its phrases and its row digests", () => {
    expect([
      ...CLAUSES.map((clause) => `clause ${clause.id}: ${clause.phrase.length}`),
      ...MARKERS.map((marker) => `marker ${marker.id}: ${marker.fixtures.map((fixture) => fixture.id).join(",")}`),
      ...CLAIM_FAMILIES.map((family) => `family ${family.id}: ${family.fixtures.map((fixture) => fixture.id).join(",")}`),
      ...FIGURES.map((figure) => `figure ${figure.id}: ${figure.label}`),
      ...RESIDUALS.map((residual) => `residual ${residual.id}`),
      `holds: ${HOLDS.map((hold) => hold.id).join(",")}`,
      `quiet: ${QUIET.map((row) => row.id).join(",")}`,
      `claim quiet: ${CLAIM_QUIET.map((row) => row.id).join(",")}`,
      `binding cases: ${BINDING_CASES.length}`,
      `judge cases: ${JUDGE_CASES.length}`,
      `evidence cases: ${EVIDENCE_CASES.length}`,
      `anchor forms: ${ANCHOR_FORMS.map((row) => `${row.reader}/${row.id}`).join(",")}`,
      `fixed cases: ${FIXED_CASES.join(",")}`,
      `each tables: ${EACH_TABLES.map(([table, keys]) => `${table} ${keys.length}`).join(",")}`,
      `receipt entries: ${RECEIPT_HEADINGS.length}`,
      ...TABLE_DIGESTS.map(([table, digest]) => `digest ${table}: ${digest}`),
    ]).toEqual([
      "clause a: 169",
      "clause b: 188",
      "clause c: 158",
      "clause d: 121",
      "marker binary: spawn,path,argv-word,shell-line,shell-operator,constant,windows-path,cmd-shim,exe,bat,ps1,npx-version,option-value",
      "marker namespace: package,schema,dynamic-import,observation,snake,spaced",
      "marker identifier: client,binding,type,snake-binding",
      "family bottleneck: denied,not-a,isnt-a,not-the,never-the,bold,code,no-longer,measurable,significant,become,hyphen,snake-subject,cannot,nor,without,becomes,an,plural,html,nested,link",
      "family percentile: figure,colon",
      "family negligible: negligible,low-overhead",
      "figure p50: p50",
      "figure p95: p95",
      "figure p99: p99",
      "figure inference: inference",
      "figure instrumentation-overhead: instrumentation overhead",
      "residual R-RUNTIME",
      "residual R-SCOPE",
      "residual R-REPORT",
      "residual R-LINE",
      "residual R-FIGURES",
      "residual R-LOCATOR",
      "residual R-MARKUP",
      "residual R-PHRASING",
      "residual R-REQUIREMENT",
      "residual R-LAUNCHER",
      "holds: skip,todo,only,skipIf,runIf,fails",
      "quiet: general-purpose,other-binaries,word-parts,comment,other-extensions",
      "claim quiet: no-subject,no-claim,directive,requirement,must-not,affirmed",
      "binding cases: 13",
      "judge cases: 12",
      "evidence cases: 12",
      "anchor forms: outline/atx,outline/setext,outline/setext-level-1,outline/indented,outline/tab,outline/deeper,outline/closed,outline/quoted,outline/list-item,outline/fenced,outline/indented-code,outline/escaped,outline/no-space,outline/commented,html/comment,html/element,html/inline,html/in-item,html/in-cell,html/code-span,listing/listing,listing/last-entry,listing/loose,listing/fenced-listing,listing/quoted-listing,listing/nested-listing",
      "fixed cases: G1,G1 control,G1 positivity,G2 judge leg,G2 judge leg control,G3,G3 control,frozen shape,anchor",
      "each tables: markers 23,quiet 5,binding cases 13,judge cases 12,claims 26,claim quiet 6,evidence cases 12,residuals 10,anchor forms 26",
      "receipt entries: 3",
      "digest markers: bf92133bc7692fa5",
      "digest quiet: 732a250aaadc1d38",
      "digest claim-families: 1961edbb21232d43",
      "digest claim-quiet: 028f12f1bc249cb3",
      "digest bindings: cf1cbc40e31a2ff3",
      "digest judge-leg: dbf9e32a755d1561",
      "digest evidence: 60c6bdaf4d5cc010",
      "digest residuals: db318dd8533075ed",
      "digest anchor-forms: ea39792e4a930690",
      "digest cases: 7c322f40f66b408d",
    ]);
    reached("cases", "frozen shape");
  });

  it("anchor (standing rule 16, CT5/CT6; wb-mqm6 F4; wb-vkdl F1, F2): the receipt's entry headings are RECEIPT_HEADINGS as written and as read, it holds no markup, and its last entry lists the tables and digests line for line in both views", () => {
    const markdown = read(RECEIPT);
    const title = markdown.split("\n")[0];
    expect(title).toMatch(/^# wb-1xvp\.5: \[RF-GRAPH-POLICY-MACHINE-CONTROL-R4\] /);
    expect(markdown.split("\n").filter((line) => line.startsWith("## "))).toEqual([...RECEIPT_HEADINGS]);
    expect(headingOutline(markdown), "every heading the lexer reads").toEqual([title, ...RECEIPT_HEADINGS]);
    expect(htmlIn(markdown), "every HTML token the lexer reads").toEqual([]);
    expect(entryListing(markdown, RECEIPT_HEADINGS[RECEIPT_HEADINGS.length - 1])).toEqual(LISTING);
    expect(renderedListing(markdown), "the last entry's list items").toEqual(LISTING);
    reached("cases", "anchor");
  });

  it.each(RESIDUALS)("residual $id is named, its quiet row holds, and its paired control reads what the blind spot hides", (residual) => {
    expect(readProbe(residual.probe)).toEqual(residual.quiet);
    expect(readProbe(residual.control)).toEqual(residual.controlReads);
    expect(residual.controlReads).not.toEqual(residual.quiet);
    reached("residuals", residual.id);
  });

  it.each(ANCHOR_FORMS)("anchor form $id: the $reader reader reads what a reader of the rendered receipt sees", (row) => {
    expect(readAnchor(row.reader, row.text)).toEqual(row.reads);
    reached("anchor forms", row.id);
  });
});

/** One node of vitest's task tree, as far as the tally reads it. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode?: string;
  readonly tasks?: readonly TaskNode[];
}
/** Every case vitest registered in this file, in registration order, with its run mode, read from the runner's own task tree. */
const registeredCases = (tasks: readonly TaskNode[]): { readonly name: string; readonly mode: string | undefined }[] =>
  tasks.flatMap((child) => (child.type === "test" ? [{ name: child.name, mode: child.mode }] : child.type === "suite" ? registeredCases(child.tasks ?? []) : []));
const TALLY_TITLE =
  "closing tally (wb-mqm6 F7, wb-vkdl): every case is set to run, the case count is the fixed cases plus every table row plus this tally, every case reached its last line in order, and this tally is the file's last case";

describe("wb-1xvp.5 each-liveness: the closing tally", () => {
  it(TALLY_TITLE, ({ task }) => {
    const cases = registeredCases(task.file.tasks);
    expect(
      cases.filter((entry) => entry.mode !== "run").map((entry) => entry.name),
      "cases of this file not set to run",
    ).toEqual([]);
    expect(cases.map((entry) => entry.name)[cases.length - 1], "the file's last case").toBe(TALLY_TITLE);
    expect(cases, "the file's case count").toHaveLength(FIXED_CASES.length + EACH_TABLES.reduce((count, [, keys]) => count + keys.length, 0) + 1);
    expect(Object.fromEntries(REACHED), "the key every case recorded at its last line").toEqual(
      Object.fromEntries([["cases", [...FIXED_CASES]], ...EACH_TABLES.map(([table, keys]) => [table, [...keys]] as const)]),
    );
  });
});
