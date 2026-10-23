/**
 * wb-1xvp.3 (RF-GRAPH-POLICY-MACHINE-CONTROL-R2): the judged tables of test/workbench-gp-control-loop-audit.test.ts and
 * the synthetic audit fixture they share, as plain data. ROWS lists every judged row (table, id, label and the SHA-256 of
 * each pin as written), so it is the same wherever this module loads; test/fixtures/gp-control-loop-audit-roster.json is
 * the out-of-file anchor ROWS is judged against (the hk9l/5jha roster pattern, as wb-1xvp.4 uses it).
 * This module imports nothing but node:crypto and runs nothing: the judge lives in ./gp-control-loop-audit.ts.
 */
import { createHash } from "node:crypto";

/** A template substitution spelled in parts, so no plain string in these tables carries one. */
const slot = (name: string): string => "$" + "{" + name + "}";

// ---- what counts as a gp call site (shapes the detector must see, must not see, and the named residuals) ----

export type Case = readonly [string, string, readonly string[]];
export type Quiet = readonly [string, string];

export const CALL_SITES: readonly Case[] = [
  ["an import of the graph-policy-cli package", 'import { evaluate } from "graph-policy-cli";', ["1:module:graph-policy-cli"]],
  ["a re-export from a package subpath", 'export { evaluate } from "graph-policy-cli/rpc";', ["1:module:graph-policy-cli/rpc"]],
  ["a type-only import from a scoped graphpolicy package", 'import type { Receipt } from "@graphpolicy/sdk";', ["1:module:@graphpolicy/sdk"]],
  ["a spawn of the bare gp binary", 'spawn("gp", ["rpc", "--stdio"]);', ["1:binary:gp"]],
  ["an absolute path to the gp binary", 'execFileSync("/usr/local/bin/gp", ["--version"]);', ["1:binary:/usr/local/bin/gp"]],
  ["a constant holding the binary name", "const GP_BIN = 'gp';", ["1:binary:gp"]],
  ["a shell command line starting with gp", 'exec("gp rpc --stdio");', ["1:binary:gp rpc --stdio"]],
  ["gp run mid-way through a shell command string", 'exec("cd /work && gp rpc --stdio");', ["1:binary:cd /work && gp rpc --stdio"]],
  ["a template whose tail is a gp path", `const bin = \`${slot("dir")}/gp\`;`, ["1:binary:/gp"]],
  ["a Windows gp.exe path", 'spawn("C:\\\\tools\\\\gp.exe", []);', ["1:binary:C:\\tools\\gp.exe"]],
  ["the graphpolicy rpc protocol id", 'const PROTOCOL = "graphpolicy.rpc.v1";', ["1:named:graphpolicy.rpc.v1"]],
  ["a GP_CLI_ refusal code", 'if (code === "GP_CLI_UNKNOWN_COMMAND") retry();', ["1:named:GP_CLI_UNKNOWN_COMMAND"]],
  ["a GP_E_ registry code (gp inspect errors)", 'const UNKNOWN_MAJOR = "GP_E_UNKNOWN_SCHEMA_MAJOR";', ["1:named:GP_E_UNKNOWN_SCHEMA_MAJOR"]],
  ["the gp rpc reply schema (gp rpc --stdio)", 'if (reply.schema === "gp.rpc.reply/v1") read(reply);', ["1:named:gp.rpc.reply/v1"]],
  ["a graph_policy spelling", 'const KEY = "graph_policy.mode";', ["1:named:graph_policy.mode"]],
  ["an import of a package named gp", 'import { run } from "gp";', ["1:module:gp"]],
  ["a package name passed to an ordinary call", 'load("graph-policy-cli");', ["1:named:graph-policy-cli"]],
  ["two sites on two lines, in order", 'const a = "graphpolicy.cli.v1";\nspawn("gp", []);', ["1:named:graphpolicy.cli.v1", "2:binary:gp"]],
  // wb-1xvp.3 respin #1 (refusal U2): gp mid-way through a command line, after a shell separator or quote with no space.
  ["gp in a subshell (gate D01)", 'exec("(gp rpc --stdio)");', ["1:binary:(gp rpc --stdio)"]],
  ["gp in a $(...) substitution (gate D02)", 'exec("v=$(gp --version)");', ["1:binary:v=$(gp --version)"]],
  ["gp right after a semicolon (gate D03)", 'exec("cd /work;gp rpc --stdio");', ["1:binary:cd /work;gp rpc --stdio"]],
  ["gp right after && (gate D04)", 'exec("cd /work&&gp rpc --stdio");', ["1:binary:cd /work&&gp rpc --stdio"]],
  ["gp right after a pipe (gate D05)", 'exec("cat req.jsonl|gp rpc --stdio");', ["1:binary:cat req.jsonl|gp rpc --stdio"]],
  ["gp double-quoted inside a command line (gate D09)", "exec('\"gp\" rpc --stdio');", ['1:binary:"gp" rpc --stdio']],
  ["gp in a backtick substitution (gate D10)", 'exec("v=`gp --version`");', ["1:binary:v=`gp --version`"]],
  ["gp single-quoted inside a command line", "exec(\"sh -c 'gp'\");", ["1:binary:sh -c 'gp'"]],
  ["gp as the value of an assignment", 'exec("bin=gp; $bin rpc --stdio");', ["1:binary:bin=gp; $bin rpc --stdio"]],
  [
    "gp ended by a shell separator, redirection, backslash or quote with no space",
    'exec("v=$(gp)");\nexec("gp|head -1");\nexec("gp;echo done");\nexec("gp&");\nexec("gp<req.jsonl");\nexec("gp>out.json");\nexec("gp\\\\\\n  rpc");\nexec("v=`gp`");',
    ["1:binary:v=$(gp)", "2:binary:gp|head -1", "3:binary:gp;echo done", "4:binary:gp&", "5:binary:gp<req.jsonl", "6:binary:gp>out.json", "7:binary:gp\\\n  rpc", "8:binary:v=`gp`"],
  ],
  // Refusal finding F3: the shims npm installs on Windows, in any letter case.
  ["the npm PowerShell shim gp.ps1 (gate D11)", 'spawn("gp.ps1", []);', ["1:binary:gp.ps1"]],
  ["a Windows path in upper case (gate D12)", 'spawn("C:\\\\tools\\\\GP.EXE", []);', ["1:binary:C:\\tools\\GP.EXE"]],
  ["the bare name and a shim in another letter case", 'spawn("GP", [], { shell: true });\nspawn("Gp.Cmd", []);', ["1:binary:GP", "2:binary:Gp.Cmd"]],
  ["a require() and a dynamic import() of the package", 'const cli = require("graph-policy-cli");\nconst rpc = await import("graph-policy-cli/rpc");', ["1:module:graph-policy-cli", "2:module:graph-policy-cli/rpc"]],
];

export const NOT_CALL_SITES: readonly Quiet[] = [
  ["a line comment", '// spawn("gp") from "graph-policy-cli"'],
  ["a block comment", "/* GP_RPC_TIMEOUT graphpolicy.rpc.v1 */"],
  ["an identifier named gp", 'const gp = agents.get("general-purpose");'],
  ["words that only contain gp", 'const labels = ["gpu", "gp-x", "a-gp", "gpt", "./gp-adapter.js"];'],
  ["another tool's binary", 'spawn("rf", ["--json"]);'],
  ["a flag that only contains gp", 'const flags = ["--gp-mode", "gp=on", "rgp", "gp."];'],
  ["a regular expression", "const re = /graph-policy/;"],
  ["a class named after GraphPolicyCLI", "class GraphPolicyClient {}"],
  ["gp after a character that starts no command word, or before one that ends none", 'const words = ["$gp", ">gp", "~gp", "{gp}", "x:gp", "gp:", "gp,"];'],
];

/** The named residual families: shapes the detector does not see, each pinned quiet so the residual stays visible. */
export const RESIDUALS: readonly Quiet[] = [
  ["RES-1 a binary named by configuration or environment", 'spawn(settings.gpBinary, ["rpc", "--stdio"]);'],
  ["RES-2 a binary name built by concatenation", 'spawn("g" + "p", ["rpc", "--stdio"]);'],
  ["RES-3 the caller of a local gp wrapper", 'import { evaluate } from "./gp-adapter.js";\nevaluate(graph);'],
  ["RES-4 a gp name the shell assembles from quoted or escaped parts", "exec('\"g\"\"p\" rpc --stdio');"],
];

// ---- each gp call site names its audited decision point ----

export const ANNOTATED: ReadonlyArray<readonly [string, string, readonly (readonly string[])[]]> = [
  ["a comment on the line above", '// gp-decision-point: DP-01\nspawn("gp", []);', [["DP-01"]]],
  ["a trailing comment on the same line", 'import { evaluate } from "graph-policy-cli"; // gp-decision-point: DP-02', [["DP-02"]]],
  ["a comment above a multi-line statement", '// gp-decision-point: DP-03\nimport {\n  evaluate,\n  sample,\n} from "graph-policy-cli";', [["DP-03"]]],
  ["a block comment naming two ids", '/* gp-decision-point: DP-01, DP-04 */\nspawn("gp", []);', [["DP-01", "DP-04"]]],
  ["a comment on an object property", 'const tool = {\n  // gp-decision-point: DP-05\n  command: "gp",\n};', [["DP-05"]]],
  ["a comment inside the statement, before the literal", 'spawn(\n  // gp-decision-point: DP-06\n  "gp",\n  [],\n);', [["DP-06"]]],
  ["a comment above a statement nested in a block", 'run(() => {\n  // gp-decision-point: DP-07\n  spawn("gp", []);\n});', [["DP-07"]]],
];

export const UNANNOTATED: readonly Quiet[] = [
  ["no comment at all", 'spawn("gp", []);'],
  ["a marker inside a string on the line above", 'const note = "// gp-decision-point: DP-01";\nspawn("gp", []);'],
  ["a marker trailing the previous statement", 'prepare(); // gp-decision-point: DP-01\nspawn("gp", []);'],
  ["a marker after the literal's own line", 'spawn("gp", [\n  // gp-decision-point: DP-01\n  "rpc",\n]);'],
  ["a marker on another object property", 'const tool = {\n  // gp-decision-point: DP-05\n  name: "picker",\n  command: "gp",\n};'],
  // Refusal finding F6 (gate A01-A03): a marker belongs to the statement it annotates, never to an enclosing one.
  ["a marker inside a nested block, annotating another call (gate A01)", 'run(\n  () => {\n    // gp-decision-point: DP-01\n    prepare();\n  },\n  "gp",\n);'],
  ["a marker trailing a later statement on the literal's line (gate A02)", 'spawn("gp", []); next(); // gp-decision-point: DP-01'],
  ["a marker on the enclosing function (gate A03)", '// gp-decision-point: DP-01\nfunction pick() {\n  spawn("gp", []);\n}'],
];

// ---- the synthetic gp-wired module and its audit document ----

export const MODULE = "src/workbench/gp-select.ts";
export const MEASURED = "gp 0.1.0 (commands: graph check, inspect errors, rpc --stdio, skill install, skill provenance, skill plugin install; protocol: graphpolicy.rpc.v1)";
/** One binary call site on line 3, annotated with DP-02, an exported fallback and a module-private helper. */
export const SOURCE = [
  'import { spawn } from "node:child_process";',
  "// gp-decision-point: DP-02",
  'export const selectWork = (): unknown => spawn("gp", ["rpc", "--stdio"]);',
  "export const selectWorkByPriority = (): undefined => undefined;",
  "function privateHelper(): void {}",
  "privateHelper();",
  "",
].join("\n");
export const SETTINGS: readonly string[] = ["maxConcurrent", "workbench.graphPolicy.mode"];

/** The audit's sections and columns, written out here (never read from the judge) so a drifted judge reds the control. */
export const HEADERS = {
  "Decision points": ["id", "stage", "policy", "inputs", "authority", "outcomes", "current fixed rule"],
  Entrypoints: ["module", "export"],
  Dependencies: ["dependency", "version"],
  Configuration: ["key"],
  Fallback: ["call site", "fallback function"],
  Inventory: ["feature", "status"],
} as const;
export type SectionName = keyof typeof HEADERS;
export type Rows = readonly (readonly string[])[];
export const SECTION_NAMES: readonly SectionName[] = ["Decision points", "Entrypoints", "Dependencies", "Configuration", "Fallback", "Inventory"];

const decisionPoint = (stage: number): readonly string[] => [
  `DP-${String(stage).padStart(2, "0")}`,
  String(stage),
  `policy ${stage}`,
  `inputs ${stage}`,
  `authority ${stage}`,
  `outcomes ${stage}`,
  `fixed rule ${stage}`,
];
const STAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const VALID: Readonly<Record<SectionName, Rows>> = {
  "Decision points": STAGE_NUMBERS.map(decisionPoint),
  Entrypoints: [[`\`${MODULE}\``, "`selectWork`"]],
  Dependencies: [
    ["`@forge/sdk`", "0.1.0"],
    ["gp", MEASURED],
  ],
  Configuration: [["`maxConcurrent`"], ["`workbench.graphPolicy.mode`"]],
  Fallback: [[`\`${MODULE}#DP-02\``, "`selectWorkByPriority`"]],
  Inventory: [
    ["dependency-aware task selection", "implemented"],
    ["adaptive concurrency", "proposed"],
  ],
};

export interface DocOptions {
  readonly override?: readonly [SectionName, Rows];
  readonly drop?: SectionName;
  readonly header?: readonly [SectionName, readonly string[]];
  readonly fence?: SectionName;
  /** One section's table between these two source lines (an HTML comment, a fence), in its own place. */
  readonly wrap?: readonly [SectionName, string, string];
  /** One section's table indented four spaces: a Markdown indented code block. */
  readonly indent?: SectionName;
  readonly append?: string;
}
const tableRow = (cells: readonly string[]): string => `| ${cells.join(" | ")} |`;
/** The audit document as Markdown: the VALID sections, each as one pipe table, with at most one change per option. */
export function renderDoc(options: DocOptions = {}): string {
  const out = ["# Pi control-loop audit", ""];
  for (const name of SECTION_NAMES) {
    if (options.drop === name) continue;
    const header = options.header?.[0] === name ? options.header[1] : HEADERS[name];
    const rows = options.override?.[0] === name ? options.override[1] : VALID[name];
    const table = [tableRow(header), tableRow(header.map(() => "---")), ...rows.map(tableRow)].map((line) => (options.indent === name ? `    ${line}` : line));
    const wrap = options.wrap?.[0] === name ? options.wrap : undefined;
    out.push(`## ${name}`, "", ...(options.fence === name ? ["```", ...table, "```"] : wrap !== undefined ? [wrap[1], ...table, wrap[2]] : table), "");
  }
  if (options.append !== undefined) out.push(options.append);
  return out.join("\n");
}
export const withRows = (name: SectionName, rows: Rows): string => renderDoc({ override: [name, rows] });
/** The VALID table of one section as its source lines. */
export const tableOf = (name: SectionName): string => [tableRow(HEADERS[name]), tableRow(HEADERS[name].map(() => "---")), ...VALID[name].map(tableRow)].join("\n");
export const replaceRow = (stage: number, row: readonly string[]): Rows => VALID["Decision points"].map((existing, index) => (index === stage - 1 ? row : existing));

/** One judge input: the synthetic module's text, the audit text (absent = no document), and the settings schema keys. */
export interface Fixture {
  readonly source?: string;
  readonly doc?: string | undefined;
  readonly settings?: readonly string[];
}

/** The judge's reason for a section that carries HTML, written out here (never read from the judge). */
const HTML = "carries HTML, a comment or a tag, which can hide its source from the rendered view";
const unannotated = SOURCE.replace("// gp-decision-point: DP-02", "// picks the next bead");
const cites99 = SOURCE.replace("gp-decision-point: DP-02", "gp-decision-point: DP-99");

// ---- the audit judge's falsifiers: each fixture reads exactly its findings ----

export const FALSIFIERS: ReadonlyArray<readonly [string, Fixture, readonly string[]]> = [
  ["(a) a call site with no audit document", { doc: undefined }, [`audit-missing: ${MODULE}:3 (binary) has no docs/workbench/control-loop-audit.md`]],
  ["(a) a call site naming no decision point", { source: unannotated }, [`call-site-unannotated: ${MODULE}:3 names no gp-decision-point`]],
  ["(a) a call site citing an id the audit lacks", { source: cites99 }, [`call-site-cites-absent-id: ${MODULE}:3 -> DP-99`, `fallback-missing: ${MODULE}#DP-99`]],
  ["(a) a stage outside 1-11", { doc: withRows("Decision points", replaceRow(5, ["DP-05", "12", "p", "i", "a", "o", "r"])) }, ['decision-point-invalid: DP-05 (stage "12" is not 1-11)', "stage-uncovered: 5 Creation and execution of ClaudeAgentsSDK workflows."]],
  ["(a) an empty authority field", { doc: withRows("Decision points", replaceRow(7, ["DP-07", "7", "p", "i", "", "o", "r"])) }, ["decision-point-invalid: DP-07 (empty authority)", "stage-uncovered: 7 Progress observation and result collection."]],
  ["(a) an empty current fixed rule", { doc: withRows("Decision points", replaceRow(9, ["DP-09", "9", "p", "i", "a", "o", ""])) }, ["decision-point-invalid: DP-09 (empty current fixed rule)", "stage-uncovered: 9 Integration, landing, and task completion."]],
  ["(a) a duplicate decision-point id", { doc: withRows("Decision points", [...VALID["Decision points"], ["DP-04", "4", "p", "i", "a", "o", "r"]]) }, ["decision-point-invalid: DP-04 (duplicate id)"]],
  ["(a) a malformed decision-point id", { doc: withRows("Decision points", replaceRow(3, ["DP 03", "3", "p", "i", "a", "o", "r"])) }, ["decision-point-invalid: DP 03 (id is not [A-Za-z0-9][A-Za-z0-9._-]*)", "stage-uncovered: 3 Assignment or claiming of tasks."]],
  // Read in the rendered view (respin #1, refusal U1): the table renders the short row with an empty last field.
  ["(a) a decision-point row with a missing cell", { doc: withRows("Decision points", replaceRow(5, ["DP-05", "5", "p", "i", "a", "o"])) }, ["decision-point-invalid: DP-05 (empty current fixed rule)", "stage-uncovered: 5 Creation and execution of ClaudeAgentsSDK workflows."]],
  ["the Inventory section missing", { doc: renderDoc({ drop: "Inventory" }) }, ["section-missing: Inventory"]],
  ["the Decision points section missing", { doc: renderDoc({ drop: "Decision points" }) }, ["section-missing: Decision points", `call-site-cites-absent-id: ${MODULE}:3 -> DP-02`]],
  ["a Dependencies table with a renamed column", { doc: renderDoc({ header: ["Dependencies", ["dependency", "release"]] }) }, ["section-malformed: Dependencies (columns: dependency | release)"]],
  ["a second Configuration heading", { doc: renderDoc({ append: "## Configuration\n\n| key |\n| --- |\n| `ghost` |\n" }) }, ["section-malformed: Configuration (duplicate heading)"]],
  // A second table that renders as one (header and delimiter rows): a lone pipe line renders as a paragraph.
  ["a second table under Fallback", { doc: renderDoc().replace("## Inventory", "| call site | fallback function |\n| --- | --- |\n\n## Inventory") }, ["section-malformed: Fallback (more than one table)"]],
  ["an Inventory table inside a fenced block", { doc: renderDoc({ fence: "Inventory" }) }, ["section-malformed: Inventory (no table)"]],
  ["(b) an entrypoint naming an export the module lacks", { doc: withRows("Entrypoints", [[MODULE, "selectWorkk"]]) }, [`entrypoint-unresolved: ${MODULE}#selectWorkk`]],
  ["(b) an entrypoint naming a module-private function", { doc: withRows("Entrypoints", [[MODULE, "privateHelper"]]) }, [`entrypoint-unresolved: ${MODULE}#privateHelper`]],
  ["(b) an entrypoint in a module that does not exist", { doc: withRows("Entrypoints", [["src/workbench/absent.ts", "selectWork"]]) }, ["entrypoint-unresolved: src/workbench/absent.ts#selectWork"]],
  ["(b) no gp row among the dependencies", { doc: withRows("Dependencies", [["`@forge/sdk`", "0.1.0"]]) }, ["gp-version-missing: no gp row in Dependencies"]],
  ["(b) a gp version that is not the measured string verbatim", { doc: withRows("Dependencies", [["gp", "gp 0.1.0"]]) }, [`gp-version-mismatch: documented "gp 0.1.0" measured "${MEASURED}"`]],
  ["(b) a settings key the audit does not document", { settings: [...SETTINGS, "maxConcurrentForeground"] }, ["config-keys-mismatch: undocumented [maxConcurrentForeground] unknown []"]],
  ["(b) a documented key the settings schema lacks", { doc: withRows("Configuration", [...VALID.Configuration, ["workbench.graphPolicy.ghost"]]) }, ["config-keys-mismatch: undocumented [] unknown [workbench.graphPolicy.ghost]"]],
  ["(c) no fallback row for the call site", { doc: withRows("Fallback", []) }, [`fallback-missing: ${MODULE}#DP-02`]],
  ["(c) a fallback row that names no function", { doc: withRows("Fallback", [[`${MODULE}#DP-02`, "n/a"]]) }, [`fallback-missing: ${MODULE}#DP-02`]],
  ["(c) a fallback row keyed to another call site", { doc: withRows("Fallback", [[`${MODULE}#DP-03`, "selectWorkByPriority"]]) }, [`fallback-missing: ${MODULE}#DP-02`]],
  ["(c) an inventory status outside implemented/proposed", { doc: withRows("Inventory", [["dependency-aware task selection", "implemented"], ["adaptive concurrency", "planned"]]) }, ["inventory-status-invalid: adaptive concurrency -> planned"]],
  ["(c) an empty inventory", { doc: withRows("Inventory", []) }, ["inventory-empty"]],
  // wb-1xvp.3 respin #1 (refusal U1): the audit is judged in its rendered view, bounded at level 1 or 2 (gate J01-J10).
  ["rendered view: the Inventory table inside an HTML comment (gate J01)", { doc: renderDoc({ wrap: ["Inventory", "<!--", "-->"] }) }, [`section-malformed: Inventory (${HTML})`]],
  ["rendered view: the Fallback table inside an HTML comment (gate J02)", { doc: renderDoc({ wrap: ["Fallback", "<!--", "-->"] }) }, [`section-malformed: Fallback (${HTML})`]],
  ["rendered view: the Decision points table inside an HTML comment (gate J03)", { doc: renderDoc({ wrap: ["Decision points", "<!--", "-->"] }) }, [`section-malformed: Decision points (${HTML})`, `call-site-cites-absent-id: ${MODULE}:3 -> DP-02`]],
  [
    "rendered view: the whole Fallback section inside an HTML comment (gate J04)",
    { doc: renderDoc().replace("## Fallback", "<!--\n## Fallback").replace("## Inventory", "-->\n\n## Inventory") },
    ['section-malformed: Configuration (an HTML block inside the section spans the heading line "## Fallback", hiding a heading boundary from the rendered view)', "section-missing: Fallback"],
  ],
  [
    "section bound: the Fallback table under a level-1 heading after ## Fallback (gate J05)",
    { doc: renderDoc().replace(`${tableOf("Fallback")}\n`, "").replace("## Inventory", `# Appendix\n\n${tableOf("Fallback")}\n\n## Inventory`) },
    ["section-malformed: Fallback (no table)", 'section-malformed: Inventory (the heading "Inventory" sits under the parent heading path ["Appendix"]; the census binds it under ["Pi control-loop audit"])'],
  ],
  ["rendered view: the Fallback table as an indented code block (gate J06)", { doc: renderDoc({ indent: "Fallback" }) }, ["section-malformed: Fallback (no table)"]],
  ["rendered view: the Fallback table in a four-backtick fence holding ``` lines (gate J07)", { doc: renderDoc({ wrap: ["Fallback", "````\n```", "```\n````"] }) }, ["section-malformed: Fallback (no table)"]],
  ["rendered view: the Fallback table between ~~~ lines in a ``` fence (gate J08)", { doc: renderDoc({ wrap: ["Fallback", "```\n~~~", "~~~\n```"] }) }, ["section-malformed: Fallback (no table)"]],
  ["rendered view: an authority cell holding only an HTML comment (gate J09)", { doc: withRows("Decision points", replaceRow(7, ["DP-07", "7", "p", "i", "<!-- tbd -->", "o", "r"])) }, [`section-malformed: Decision points (${HTML})`, `call-site-cites-absent-id: ${MODULE}:3 -> DP-02`]],
  [
    "same view: a Configuration heading hidden in an HTML comment after the last section (gate J10)",
    { doc: renderDoc({ append: "<!--\n## Configuration\n-->\n" }) },
    ['section-malformed: Inventory (an HTML block inside the section spans the heading line "## Configuration", hiding a heading boundary from the rendered view)'],
  ],
  // The rendered-empty field class beside J09: what renders shows no letter, number, punctuation or symbol.
  ["rendered view: an authority field holding only a zero-width space reference", { doc: withRows("Decision points", replaceRow(7, ["DP-07", "7", "p", "i", "&#8203;", "o", "r"])) }, ["decision-point-invalid: DP-07 (empty authority)", "stage-uncovered: 7 Progress observation and result collection."]],
  ["rendered view: an outcomes field holding only a named reference the landed rule leaves undecoded", { doc: withRows("Decision points", replaceRow(10, ["DP-10", "10", "p", "i", "a", "&ZeroWidthSpace;", "r"])) }, ["decision-point-invalid: DP-10 (empty outcomes)", "stage-uncovered: 10 Failure recovery, retries, and relaunch."]],
  ["rendered view: a policy field holding only an empty link and a blank code span", { doc: withRows("Decision points", replaceRow(6, ["DP-06", "6", "[](x) ` `", "i", "a", "o", "r"])) }, ["decision-point-invalid: DP-06 (empty policy)", "stage-uncovered: 6 Concurrent worker scheduling and resource allocation."]],
  ["rendered view: an inputs field holding only a Hangul filler", { doc: withRows("Decision points", replaceRow(8, ["DP-08", "8", "p", String.fromCodePoint(0x3164), "a", "o", "r"])) }, ["decision-point-invalid: DP-08 (empty inputs)", "stage-uncovered: 8 Verification, review, and correction."]],
  ["rendered view: a field written as a visible character reference is filled", { doc: withRows("Decision points", replaceRow(4, ["DP-04", "4", "&#x41;", "i", "a", "o", "r"])) }, []],
  ["rendered view: an authority field holding only an out-of-range reference reads empty", { doc: withRows("Decision points", replaceRow(3, ["DP-03", "3", "p", "i", "&#x110000;", "o", "r"])) }, ["decision-point-invalid: DP-03 (empty authority)", "stage-uncovered: 3 Assignment or claiming of tasks."]],
  ["rendered view: a header written with inline markup and capitals is read as it renders", { doc: renderDoc({ header: ["Fallback", ["**Call site**", "`fallback function`"]] }) }, []],
  ["rendered view: a field holding only punctuation or only a symbol renders, so it is filled", { doc: withRows("Decision points", replaceRow(11, ["DP-11", "11", "p", "i", String.fromCodePoint(0x2014), String.fromCodePoint(0x2192), "r"])) }, []],
];

/** README.md:89-99@6a251bf73af5: the line, the stage number and the stage, verbatim. */
export const STAGES: ReadonlyArray<readonly [number, number, string]> = [
  [89, 1, "Observation of ready, blocked, active, deferred, and completed beads."],
  [90, 2, "Discovery of candidate work."],
  [91, 3, "Assignment or claiming of tasks."],
  [92, 4, "Worker and model selection."],
  [93, 5, "Creation and execution of ClaudeAgentsSDK workflows."],
  [94, 6, "Concurrent worker scheduling and resource allocation."],
  [95, 7, "Progress observation and result collection."],
  [96, 8, "Verification, review, and correction."],
  [97, 9, "Integration, landing, and task completion."],
  [98, 10, "Failure recovery, retries, and relaunch."],
  [99, 11, "Machine shutdown or continuation."],
];

// ---- ROWS: every judged row, in table order, as the roster carries it ----

/** One judged row: its table, a positional id, its label, and the SHA-256 of each pin (each input and expectation, as written). */
export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const digest = (value: string): string => createHash("sha256").update(value).digest("hex");
/** A pin as written: a string as it stands, anything else as JSON with undefined spelled out (so {doc: undefined} is not {}). */
const written = (value: unknown): string => (typeof value === "string" ? value : JSON.stringify(value, (_key, item: unknown) => (item === undefined ? "(undefined)" : item)));
const judged = (table: string, rows: ReadonlyArray<readonly [string, ...(readonly unknown[])]>): JudgedRow[] =>
  rows.map(([label, ...pins], index) => ({ table, id: `${table}-${String(index + 1).padStart(2, "0")}`, label, pins: pins.flatMap((pin) => (Array.isArray(pin) ? pin.map(written) : [written(pin)])).map(digest) }));

export const ROWS: readonly JudgedRow[] = [
  ...judged("CALL_SITES", CALL_SITES),
  ...judged("NOT_CALL_SITES", NOT_CALL_SITES),
  ...judged("RESIDUALS", RESIDUALS),
  ...judged("ANNOTATED", ANNOTATED),
  ...judged("UNANNOTATED", UNANNOTATED),
  ...judged("FALSIFIERS", FALSIFIERS),
  ...judged(
    "STAGES",
    STAGES.map(([line, stage, text]) => [`README.md:${line} stage ${stage}`, text] as const),
  ),
];
