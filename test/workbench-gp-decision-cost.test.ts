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
 *   empty, so today no file may hold one. The same reader finds the real rf and git spawns in src, so a silent gp reading is
 *   not a blind instrument.
 * - G2 cost bindings: a binding names a registered case for each acceptance clause (a)-(d) of the bead (CLAUSES). An unbound
 *   site, a stale binding, an empty clause, an absent file or title and a skipped case each refuse.
 * - G3 docs census (clause (d), second half: "a 'no bottleneck' docs claim without it fails the census"): a line of
 *   README.md, CHANGELOG.md or any .md under docs/ that names gp or GraphPolicyCLI beside a cost claim (CLAIM_FAMILIES) must
 *   cite an evaluation receipt under docs/workbench/receipts/ that states every figure of FIGURES, or be such a receipt.
 * Anchor (standing rule 16, the CT5/CT6 kill): the first entry of docs/workbench/receipts/wb-1xvp.5.md, append-only, lists
 * every clause, marker, claim family, figure and residual; the anchor row holds this file's tables to that listing line for
 * line, so a member removed from every literal here is still red against the receipt.
 * Comments are prose, never sites: a doc comment that names GraphPolicyCLI is no call (the QUIET comment row).
 * Residuals, named, each pinned by a quiet row (RESIDUALS): R-RUNTIME, R-SCOPE, R-REPORT, R-LINE, R-FIGURES.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
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
/** The binary marker: a word whose basename is the binary (gp, /usr/local/bin/gp, an argv word, a word of a shell line). */
const namesBinary = (text: string, binary: string): boolean => wordsOf(text).some((word) => word.split("/").pop() === binary);
/** The producer's names in string text: the graph-policy-cli package, a graphpolicy.* envelope schema, GraphDataIR. */
const NAMESPACE = /graph[-_ ]?policy|graphdatair/i;
/** The same names as code identifiers: a client class, a binding, a type. */
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
    matches: "a word of a string token whose basename is gp: the bare name, a path ending in /gp, an argv word, or a word of a shell line",
    fixtures: [
      { id: "spawn", source: 'spawn("gp", ["rpc", "--stdio"], { stdio: ["pipe", "pipe", "pipe"] });', sites: ["binary:gp"] },
      { id: "path", source: 'execFileSync("/usr/local/bin/gp", ["--version"]);', sites: ["binary:/usr/local/bin/gp"] },
      { id: "argv-word", source: 'spawn("npx", ["--yes", "gp", "graph", "check"]);', sites: ["binary:gp"] },
      { id: "shell-line", source: SHELL_LINE, sites: ["binary: && gp graph check "] },
      { id: "shell-operator", source: 'spawn("sh", ["-c", "cd /tmp;gp rpc --stdio"]);', sites: ["binary:cd /tmp;gp rpc --stdio"] },
      { id: "constant", source: 'const GP_BINARY = "gp";\nspawn(GP_BINARY, argv);', sites: ["binary:gp"] },
    ],
  },
  {
    id: "namespace",
    matches: "a string token naming the producer: the graph-policy-cli package, a graphpolicy envelope schema such as graphpolicy.rpc.v1, or GraphDataIR",
    fixtures: [
      { id: "package", source: 'import { evaluate } from "graph-policy-cli";', sites: ["namespace:graph-policy-cli"] },
      { id: "schema", source: 'if (envelope.schema === "graphpolicy.rpc.v1") admit(envelope);', sites: ["namespace:graphpolicy.rpc.v1"] },
      { id: "dynamic-import", source: 'const sdk = await import("@graphpolicy/sdk");', sites: ["namespace:@graphpolicy/sdk"] },
      { id: "observation", source: 'const observation = { format: "GraphDataIR", nodes, edges };', sites: ["namespace:GraphDataIR"] },
    ],
  },
  {
    id: "identifier",
    matches: "an identifier naming GraphPolicy or GraphDataIR, such as a client class, a binding or a type",
    fixtures: [
      { id: "client", source: "const client = new GraphPolicyClient(session);", sites: ["identifier:GraphPolicyClient"] },
      { id: "binding", source: "const graphPolicy = load();", sites: ["identifier:graphPolicy"] },
      { id: "type", source: "function observe(document: GraphDataIR): void {}", sites: ["identifier:GraphDataIR"] },
    ],
  },
];
const MARKER_ROWS = MARKERS.flatMap((marker) => marker.fixtures.map((fixture) => ({ marker: marker.id, ...fixture })));

/** Snippets that must read no site: the src/agent-types.ts identifier gp, other binaries, word parts and a comment. */
const QUIET: readonly SiteFixture[] = [
  { id: "general-purpose", source: 'const gp = agents.get("general-purpose");', sites: [] },
  { id: "other-binaries", source: 'spawn("gpg", []);\nspawn("rf", argv);\nexecFileSync("git", ["-C", cwd]);', sites: [] },
  { id: "word-parts", source: 'log("gpu, gpt, gp2 and gp-agent are other words");', sites: [] },
  { id: "comment", source: '// spawn("gp", ["rpc", "--stdio"]) reaches GraphPolicyCLI\nconst ready = true;', sites: [] },
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
/** A member that keeps a case out of a plain run: skip, todo, only, skipIf, runIf, fails. */
const NOT_PLAIN = new Set(["skip", "todo", "only", "skipIf", "runIf", "fails"]);
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
/** A synthetic proof file: four plain registrations, a case held by skipIf, and a suite held by skipIf. */
const PROOF_SOURCE = [
  'describe("gp adapter cost", () => {',
  '  it("records each call", () => { expect(1).toBe(1); });',
  '  it("cuts at the read budget", () => { expect(1).toBe(1); });',
  '  it.each([1, 2])("opens one session for %s decisions", (n) => { expect(n).toBeGreaterThan(0); });',
  '  test("aggregates the percentiles", () => { expect(1).toBe(1); });',
  '  it.skipIf(true)("a held case", () => { expect(1).toBe(1); });',
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
interface ClaimFamily {
  readonly id: string;
  readonly matches: string;
  readonly pattern: RegExp;
  /** Lines naming gp that must read as a claim of this family. */
  readonly fixtures: readonly ClaimFixture[];
}

/** The claim subject: gp as a word, or GraphPolicy in any spelling. */
const SUBJECT = /\bgp\b|graph[- ]?policy/i;
/** The cost claims a docs line can make about gp without an evaluation receipt. */
const CLAIM_FAMILIES: readonly ClaimFamily[] = [
  {
    id: "bottleneck",
    matches: "a bottleneck denied: no bottleneck, not a bottleneck, never a bottleneck, without a new bottleneck",
    pattern: /\b(?:no|not\s+a|never\s+a|without\s+a|nor\s+a)\s+(?:new\s+)?bottleneck/i,
    fixtures: [
      { id: "denied", line: "GraphPolicyCLI inference adds no bottleneck to the dispatch loop." },
      { id: "not-a", line: "Calling gp per decision is not a bottleneck." },
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

/** Lines that must read no claim: no subject (the docs/10 navigation figure), no cost word, the program's own directive. */
const CLAIM_QUIET: readonly ClaimFixture[] = [
  { id: "no-subject", line: "Navigation p95 was 0.389 ms and maximum 17.69 ms across 1,000 samples." },
  { id: "no-claim", line: "GraphPolicyCLI owns scores, embeddings and receipts." },
  { id: "directive", line: "Do not make GraphPolicyCLI inference a new bottleneck." },
  { id: "requirement", line: "Measure gp p50, p95 and p99 decision latency." },
];

function claimsIn(file: string, text: string): Claim[] {
  return text.split("\n").flatMap((line, index) =>
    SUBJECT.test(line) ? CLAIM_FAMILIES.filter((family) => family.pattern.test(line)).map((family) => ({ file, line: index + 1, family: family.id, text: line })) : [],
  );
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

const EVALUATION = "- gp decision latency over 400 recorded calls: p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.";
/** An evaluation receipt, and one receipt per figure that states every other figure but that one. */
const evidenceFiles = new Map([
  ["docs/workbench/receipts/wb-eval.md", `# wb-eval: an evaluation\n\n## 2026-11-01 receipt\n\n${EVALUATION}\n`],
  ["docs/workbench/receipts/wb-no-p50.md", "- p95 7.9 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-p95.md", "- p50 3.1 ms, p99 12.4 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-p99.md", "- p50 3.1 ms, p95 7.9 ms; inference 2.2 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-inference.md", "- p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; instrumentation overhead 0.4 ms.\n"],
  ["docs/workbench/receipts/wb-no-overhead.md", "- p50 3.1 ms, p95 7.9 ms, p99 12.4 ms; inference 2.2 ms.\n"],
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
];

// ---- residuals, frozen shape and anchor -----------------------------------------------------------------------------

interface Residual {
  readonly id: string;
  readonly blindSpot: string;
  /** The quiet row: the residual's current reading, pinned, so a change to the blind spot is red here. */
  readonly reading: () => unknown;
  readonly quiet: unknown;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-RUNTIME",
    blindSpot: "a binary name built at run time or read from settings or the environment is no string token, so its spawn is no site",
    reading: () => sitesIn(SITE_FILE, 'spawn(["g", "p"].join(""), argv);\nspawn(process.env.POLICY_BINARY ?? "", argv);'),
    quiet: [],
  },
  {
    id: "R-SCOPE",
    blindSpot: "only the .ts files under src/ are read; qa/, examples/ and test/ hold tooling and evaluation, never the machine's decision loop",
    reading: () => ({ roots: [...new Set(SRC_FILES.map((file) => file.split("/")[0]))], unread: SRC_FILES.filter((file) => !file.endsWith(".ts")) }),
    quiet: { roots: ["src"], unread: [] },
  },
  {
    id: "R-REPORT",
    blindSpot:
      "a bound case is found in its test source, never in vitest's report, so a case that fails, never collects or asserts nothing still binds; the census tier's judge() reads those legs once a binding exists",
    reading: () =>
      bindingFindings([SITE], { [SITE_FILE]: { a: [pin("hollow")], b: [pin("hollow")], c: [pin("hollow")], d: [pin("hollow")] } }, (file) =>
        file === PROOF_FILE ? 'it("hollow", () => {});' : undefined,
      ),
    quiet: [],
  },
  {
    id: "R-LINE",
    blindSpot: "a cost claim whose subject is named on another line is not read as a gp claim",
    reading: () => claimsIn("docs/workbench/x.md", "The gp adapter opens one resident session per run.\nIt adds no bottleneck."),
    quiet: [],
  },
  {
    id: "R-FIGURES",
    blindSpot: "an evaluation receipt is admitted by the shape of its figures, never by recomputing them from per-call records",
    reading: () => isEvaluationReceipt("- p50 9 ms, p95 2 ms, p99 1 ms; inference 5 ms; instrumentation overhead 7 ms."),
    quiet: true,
  },
];

/** One anchor line of the receipt's first entry: `- <kind> <id>: <text>.`, plain text with no inline markup. */
const ANCHOR_LINE = /^- (Clause|Marker|Claim family|Figure|Residual) ([A-Za-z0-9-]+): (.+)\.$/;
function receiptListing(markdown: string): string[] {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.startsWith("## "));
  if (start < 0) return [];
  const end = lines.findIndex((line, index) => index > start && line.startsWith("## "));
  return lines.slice(start + 1, end < 0 ? undefined : end).filter((line) => ANCHOR_LINE.test(line));
}

describe("wb-1xvp.5 G1: a gp site in src lands only bound to its cost evidence", () => {
  it("G1: every .ts file under src that holds a gp site is bound in GP_COST_BINDINGS, and the table is empty, so none holds one", () => {
    expect(SRC_FILES.length).toBeGreaterThan(0);
    expect(GP_COST_BINDINGS).toStrictEqual({});
    expect(bindingFindings(srcSites(), GP_COST_BINDINGS, readIfPresent)).toEqual([]);
  });

  it("G1 control: the same reader finds the real CLI spawns in src (rf in providers/reactivefiber.ts, git in index.ts), so a silent gp reading is not a blind one", () => {
    const filesOf = (binary: string): string[] => [...new Set(srcSites(binary).filter((site) => site.marker === "binary").map((site) => site.file))];
    expect(filesOf("rf")).toContain("src/workbench/providers/reactivefiber.ts");
    expect(filesOf("git")).toContain("src/index.ts");
  });

  it.each(MARKER_ROWS)("G1 marker $marker, fixture $id: the snippet reads its sites", (row) => {
    expect(siteKeys(sitesIn(SITE_FILE, row.source))).toEqual(row.sites);
  });

  it("G1: every fixture of a marker reads at least one site, and only sites of that marker", () => {
    for (const marker of MARKERS) {
      for (const fixture of marker.fixtures) {
        const found = sitesIn(SITE_FILE, fixture.source);
        expect(found.length, `${marker.id}/${fixture.id}`).toBeGreaterThan(0);
        expect(found.filter((site) => site.marker !== marker.id), `${marker.id}/${fixture.id}`).toEqual([]);
      }
    }
  });

  it.each(QUIET)("G1 quiet $id: the snippet reads no site", (row) => {
    expect(siteKeys(sitesIn(SITE_FILE, row.source))).toEqual(row.sites);
  });
});

describe("wb-1xvp.5 G2: a binding names a registered case for each clause", () => {
  it.each(BINDING_CASES)("G2: $id", (row) => {
    const findings = bindingFindings(row.sites, row.bindings, (file) => proofFiles.get(file));
    expect(findings).toHaveLength(row.findings.length);
    row.findings.forEach((expected, index) => {
      expect(findings[index]).toContain(expected);
    });
  });
});

describe("wb-1xvp.5 G3: no docs line claims gp decision cost without an evaluation receipt", () => {
  it("G3: every gp cost claim of README.md, CHANGELOG.md and the docs .md files cites an evaluation receipt, and this receipt is none", () => {
    expect(DOCS_FILES).toEqual(expect.arrayContaining(["README.md", "CHANGELOG.md", "docs/workbench/07-native-integrations.md", RECEIPT]));
    const claims = DOCS_FILES.flatMap((file) => claimsIn(file, read(file)));
    expect(claimFindings(claims, readIfPresent)).toEqual([]);
    expect(isEvaluationReceipt(read(RECEIPT))).toBe(false);
  });

  it("G3 control: the claim families read real docs (the docs/10 navigation p95 figure is a percentile line, and it names no gp)", () => {
    const percentile = CLAIM_FAMILIES.find((family) => family.id === "percentile")?.pattern ?? /$^/;
    const lines = read("docs/workbench/10-terminal-inspector.md")
      .split("\n")
      .filter((line) => percentile.test(line));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.filter((line) => SUBJECT.test(line))).toEqual([]);
  });

  it.each(CLAIM_ROWS)("G3 family $family, fixture $id: the line reads one claim of its family", (row) => {
    expect(claimsIn("docs/workbench/x.md", row.line).map((claim) => claim.family)).toEqual([row.family]);
  });

  it.each(CLAIM_QUIET)("G3 quiet $id: the line reads no claim", (row) => {
    expect(claimsIn("docs/workbench/x.md", row.line)).toEqual([]);
  });

  it.each(EVIDENCE_CASES)("G3 evidence: $id", (row) => {
    const files = new Map([...evidenceFiles, [row.file, row.text]]);
    const claims = claimsIn(row.file, row.text);
    expect(claims.length).toBeGreaterThan(0);
    expect(claimFindings(claims, (file) => files.get(file))).toHaveLength(row.findings);
  });
});

describe("wb-1xvp.5 shape: frozen tables, the receipt anchor and the named residuals", () => {
  it("frozen shape (standing rule 16): every table keeps its rows, its pins and its phrases", () => {
    expect([
      ...CLAUSES.map((clause) => `clause ${clause.id}: ${clause.phrase.length}`),
      ...MARKERS.map((marker) => `marker ${marker.id}: ${marker.fixtures.map((fixture) => fixture.id).join(",")}`),
      ...CLAIM_FAMILIES.map((family) => `family ${family.id}: ${family.fixtures.map((fixture) => fixture.id).join(",")}`),
      ...FIGURES.map((figure) => `figure ${figure.id}: ${figure.label}`),
      ...RESIDUALS.map((residual) => `residual ${residual.id}`),
      `quiet: ${QUIET.map((row) => row.id).join(",")}`,
      `claim quiet: ${CLAIM_QUIET.map((row) => row.id).join(",")}`,
      `binding cases: ${BINDING_CASES.length}`,
      `evidence cases: ${EVIDENCE_CASES.length}`,
    ]).toEqual([
      "clause a: 169",
      "clause b: 188",
      "clause c: 158",
      "clause d: 121",
      "marker binary: spawn,path,argv-word,shell-line,shell-operator,constant",
      "marker namespace: package,schema,dynamic-import,observation",
      "marker identifier: client,binding,type",
      "family bottleneck: denied,not-a",
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
      "quiet: general-purpose,other-binaries,word-parts,comment",
      "claim quiet: no-subject,no-claim,directive,requirement",
      "binding cases: 8",
      "evidence cases: 9",
    ]);
  });

  it("anchor (standing rule 16, CT5/CT6): the tables equal the listing of the receipt's first entry, line for line", () => {
    const markdown = read(RECEIPT);
    expect(markdown.split("\n")[0]).toMatch(/^# wb-1xvp\.5: \[RF-GRAPH-POLICY-MACHINE-CONTROL-R4\] /);
    expect(receiptListing(markdown)).toEqual([
      ...CLAUSES.map((clause) => `- Clause ${clause.id}: ${clause.phrase}.`),
      ...MARKERS.map((marker) => `- Marker ${marker.id}: ${marker.matches}.`),
      ...CLAIM_FAMILIES.map((family) => `- Claim family ${family.id}: ${family.matches}.`),
      ...FIGURES.map((figure) => `- Figure ${figure.id}: ${figure.label}, ${figure.states}.`),
      ...RESIDUALS.map((residual) => `- Residual ${residual.id}: ${residual.blindSpot}.`),
    ]);
  });

  it.each(RESIDUALS)("residual $id is named and its quiet row holds", (residual) => {
    expect(residual.reading()).toEqual(residual.quiet);
  });
});
