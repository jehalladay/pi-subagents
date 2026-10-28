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
  // wb-66f7 (wb-1xvp.3 cut #2 gate F2): shell grammar outside the enumerated boundary sets, each its gate probe verbatim.
  ["RES-5 gp as the default value of a shell parameter expansion (gate E11)", `exec("${slot("GP_BIN:-gp")} rpc --stdio");`],
  ["RES-6 gp as the assigned default of a shell parameter expansion (gate E12)", `exec("${slot("GP_BIN:=gp")} rpc --stdio");`],
  ["RES-7 gp right after a case pattern's closing parenthesis (gate E13)", 'exec("case $1 in rpc)gp rpc --stdio;; esac");'],
  ["RES-8 gp joined to its arguments by an IFS expansion (gate E14)", `exec("gp${slot("IFS")}rpc");`],
  ["RES-9 gp opening a brace expansion (gate E15)", 'exec("{gp,rpc} --stdio");'],
  ["RES-10 gp opening a PowerShell script block (gate E16)", 'spawn("pwsh", ["-Command", "& {gp rpc --stdio}"]);'],
  ["RES-11 gp behind the caret escape of cmd.exe (gate E17)", 'exec("cmd /c ^gp rpc");'],
  ["RES-12 a gp shim whose extension is not .exe, .cmd or .ps1, such as gp.bat (gate E18)", 'spawn("gp.bat", []);'],
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
  // wb-rdv6 (wb-1xvp.3 cut #2 gate F5, the B06 over-refusal): a comment after a token the syntax tree keeps no node for
  // (a comma, a parenthesis, the = of a declaration, a property's colon, a keyword) was never read, so the rule never saw it.
  ["a comment after a comma on the literal's own line (gate B06)", 'spawn("gp", // gp-decision-point: DP-01\n  []);', [["DP-01"]]],
  ["a block comment after a comma on the literal's own line", 'spawn("gp", /* gp-decision-point: DP-01 */ []);', [["DP-01"]]],
  ["a comment after the call's opening parenthesis, on the line above the literal", 'spawn( // gp-decision-point: DP-06\n  "gp",\n  [],\n);', [["DP-06"]]],
  ["a block comment between the opening parenthesis and the literal", 'spawn(/* gp-decision-point: DP-01 */ "gp", []);', [["DP-01"]]],
  ["a comment after the = of a declaration", 'const bin = // gp-decision-point: DP-01\n  "gp";', [["DP-01"]]],
  ["a comment after a property's colon", 'const tool = {\n  command: // gp-decision-point: DP-05\n    "gp",\n};', [["DP-05"]]],
  ["a comment after else, above the branch that holds the literal", 'if (x) prepare();\nelse // gp-decision-point: DP-01\n  spawn("gp", []);', [["DP-01"]]],
  ["a marker after // on a JSDoc tag line, credited once (a JSDoc block is read whole, never entered)", '/**\n * @type {string} // gp-decision-point: DP-01\n */\nconst bin = "gp";', [["DP-01"]]],
  // wb-2xd5 (wb-lx6m gate F2): the gate's G-C14 verbatim. Its marker stands before the blockless body that holds the
  // literal, the shape of that gate's D05 control (a marker after else, before the branch that holds the literal), so
  // the credit is the attachment rule's intent and the row is pinned here, not in MISATTRIBUTED.
  ["a comment after a labeled for statement's header, before the blockless body that holds the literal (wb-2xd5, wb-lx6m gate G-C14)", 'label: for (;;) /* gp-decision-point: DP-01 */ spawn("gp", []);', [["DP-01"]]],
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
  // wb-rdv6: every comment is read now, and the rule still places each one; these stay unannotated by that rule.
  ["a marker after a comma on a line after the literal's own line", 'spawn("gp",\n  [], // gp-decision-point: DP-01\n  opts,\n);'],
  ["a marker after a nested block's opening brace on the literal's line", 'run("gp", () => { // gp-decision-point: DP-01\n  prepare();\n});'],
  ["a marker trailing the enclosing function's opening line (gate A03, same-line form)", 'function pick() { // gp-decision-point: DP-01\n  spawn("gp", []);\n}'],
  ["a marker trailing the opening brace of the object literal that holds the property", 'const tool = { // gp-decision-point: DP-05\n  command: "gp",\n};'],
  // wb-lx6m: the attribution family's member-list boundary - a marker inside a type literal or a class body nested in the
  // statement annotates that list's own members, as one inside a nested block or object literal does.
  ["a marker inside a nested type literal of a preceding argument (wb-lx6m)", 'run(x as { /* gp-decision-point: DP-01 */ a: T }, "gp");'],
  ["a marker inside a nested class expression's body in a preceding argument (wb-lx6m)", 'run(class { /* gp-decision-point: DP-01 */ }, "gp");'],
  // wb-2xd5 (wb-lx6m gate F1): the boundary at the rest of the member holders the judge declares (holdsMembers). A
  // nested holder's span starts at its first token, so a nested class expression is excluded whole, its head included
  // (gate G-B01, G-B02, G-B03, G-B07); a case or a default clause of the switch that holds the literal is a holder
  // (G-B04, G-B06); so are a nested object literal (G-A02) and a module block. Then the unit at a holder's child: a marker
  // above the enclosing declaration or clause does not reach a heritage clause, a case label, or an interface or enum
  // member that holds the literal (so a judge that drops interface or enum from the holders reds UNANNOTATED-25 or -26).
  ["a marker after the class keyword of a nested class expression in a preceding argument: a class-like holder's span starts at its first token, so its head lies inside it (wb-2xd5, wb-lx6m gate G-B01)", 'run(class /* gp-decision-point: DP-01 */ {}, "gp");'],
  ["a marker inside a nested class expression's heritage clause in a preceding argument (wb-2xd5, wb-lx6m gate G-B02)", 'run(class extends /* gp-decision-point: DP-01 */ Base {}, "gp");'],
  ["a marker after a nested class expression's name in a preceding argument (wb-2xd5, wb-lx6m gate G-B03)", 'run(class Named /* gp-decision-point: DP-01 */ {}, "gp");'],
  ["a marker inside a nested class expression's type parameter list in a preceding argument (wb-2xd5, wb-lx6m gate G-B07)", 'run(class</* gp-decision-point: DP-01 */ T> {}, "gp");'],
  ["a marker inside a case clause of the switch statement whose discriminant holds the literal: a case clause holds members (wb-2xd5, wb-lx6m gate G-B04)", 'switch (spawn("gp", [])) { case 1: /* gp-decision-point: DP-01 */ break; }'],
  ["a marker inside a default clause of the switch statement whose discriminant holds the literal: a default clause holds members (wb-2xd5, wb-lx6m gate G-B06)", 'switch (spawn("gp", [])) { default: /* gp-decision-point: DP-01 */ break; }'],
  ["a marker inside a nested object literal in a preceding argument (wb-2xd5, wb-lx6m gate G-A02)", 'run({ /* gp-decision-point: DP-01 */ a: 1 }, "gp");'],
  ["a marker inside the module block of an ambient module declaration that the literal names, on the literal's line: a module block holds members (wb-2xd5)", 'declare module "gp" { /* gp-decision-point: DP-01 */ }'],
  ["a marker above a class declaration whose heritage clause holds the literal: the unit is the heritage clause, not the class (wb-2xd5)", '// gp-decision-point: DP-01\nclass A extends mixin("gp") {}'],
  ["a marker above a case clause whose label is the literal: the unit is the label, not the case clause (wb-2xd5)", 'switch (x) {\n  // gp-decision-point: DP-01\n  case "gp":\n    break;\n}'],
  ["a marker above an interface declaration whose member holds the literal: the unit is the member, not the interface (wb-2xd5)", '// gp-decision-point: DP-01\ninterface Tool {\n  bin: "gp";\n}'],
  ["a marker above an enum declaration whose member holds the literal: the unit is the member, not the enum (wb-2xd5)", '// gp-decision-point: DP-01\nenum E {\n  Bin = "gp",\n}'],
];

/**
 * The named attribution residuals (wb-66f7, wb-1xvp.3 cut #2 gate F3), one mechanism-level family (wb-lx6m, wb-rdv6
 * gate F1 and F7; wb-2xd5, wb-lx6m gate F1-F3): the attachment rule (decisionPointsOf in ./gp-control-loop-audit.ts)
 * credits a call site with every marker in a comment that starts at or after the full start of the UNIT that holds
 * the literal (its leading comments included) and on or above the literal's own line, except a comment inside a member
 * holder nested in the unit, one on the line where the unit's full start lies when that line holds text before the
 * comment and the unit's first token is on a later line, and one past the unit's end other than the unit's own
 * trailing comment; the rule never asks which expression or sub-statement the marker annotates. The member holders are
 * exactly (holdsMembers) a source file, block, module block, case clause, default clause, class-like node, object
 * literal, interface, type literal and enum; a nested holder's span runs from its first token to its end, so a nested
 * class expression is excluded whole, its head included, while a switch's case block is no holder. The unit is the
 * child of the literal's nearest member holder on the path to the literal: a statement, a case clause's label, a member
 * of a class, object literal, interface, type literal or enum, or a class's decorator, type parameter or heritage
 * clause, or an interface's type parameter or heritage clause. So a marker that annotates ANOTHER expression or
 * sub-statement of the unit, before the literal or after it on its line, is credited to the call site. Each row pins
 * today's credited reading of one measured member - RES-13..15 the wb-1xvp.3 gate's B01-B03, RES-16..18 wb-rdv6's,
 * RES-19..43 the wb-rdv6 gate's PREP LEG 2 probes verbatim (with RES-13..15, which are that corpus's B01-B03, every
 * probe of the corpus that reads a misattribution and is credited), RES-44..58 seat-found kinds, RES-59..62 the
 * case-block region and the enum, interface and type-literal member units (wb-2xd5: the wb-lx6m gate's G-B05 and G-B08
 * verbatim, RES-61 and RES-62 seat-found), RES-63..79 the wb-lx6m gate's PREP LEG 2 G-C probes verbatim (its G-C14 is a
 * correct credit, pinned in ANNOTATED) - so a cut that changes the rule reds the row and retires the residual in the
 * open. The family's boundary is pinned in UNANNOTATED: a marker inside a member holder nested in the unit annotates
 * that holder's own members (a block, a type literal, a class expression's body or head, a case or default clause of
 * the switch that holds the literal, an object literal, a module block), and a marker above the enclosing declaration
 * or clause does not reach a unit that is its heritage clause, label, or interface or enum member.
 */
export const MISATTRIBUTED: ReadonlyArray<readonly [string, string, readonly (readonly string[])[]]> = [
  ["RES-13 a marker inside an expression-bodied arrow, annotating its body, is credited to a gp literal later in the same call (gate B01)", 'run(\n  () =>\n    // gp-decision-point: DP-01\n    prepare(),\n  "gp",\n);', [["DP-01"]]],
  ["RES-14 a marker inside a nested call's argument list is credited to a gp literal later in the outer call (gate B02)", 'run(\n  prepare(\n    // gp-decision-point: DP-01\n    x,\n  ),\n  "gp",\n);', [["DP-01"]]],
  ["RES-15 a marker on a ternary's first branch is credited to a gp literal in its second branch (gate B03)", 'const bin = cond\n  // gp-decision-point: DP-01\n  ? prepare()\n  : "gp";', [["DP-01"]]],
  // wb-rdv6: the cure reads the comments after every token, so these members of the same family, never read before, are credited.
  ["RES-16 a marker after a nested call's opening parenthesis is credited to a gp literal later in the outer call (wb-rdv6)", 'run(\n  prepare( // gp-decision-point: DP-01\n    x,\n  ),\n  "gp",\n);', [["DP-01"]]],
  ["RES-17 a marker trailing a preceding argument's comma is credited to a gp literal later in the same call (wb-rdv6)", 'run(\n  prepare(), // gp-decision-point: DP-01\n  "gp",\n);', [["DP-01"]]],
  ["RES-18 a marker after a nested arrow's parameter-list parenthesis is credited to a gp literal later in the outer call (wb-rdv6)", 'run(( // gp-decision-point: DP-01\n  a) => a, "gp");', [["DP-01"]]],
  // wb-lx6m (wb-rdv6 gate F1): the member kinds the token-level reading credits that no row named, each its PREP LEG 2
  // probe verbatim; each read [] before wb-rdv6 and is credited since.
  ["RES-19 a marker after a nested array literal's opening bracket is credited to a gp literal later in the outer call (wb-rdv6 gate P24)", 'run([ /* gp-decision-point: DP-01 */ x ], "gp");', [["DP-01"]]],
  ["RES-20 a line comment after a nested array literal's opening bracket, on a line above the gp literal, is credited to it (wb-rdv6 gate P32)", 'run([ // gp-decision-point: DP-01\n  x,\n], "gp");', [["DP-01"]]],
  ["RES-21 a marker after a comma inside a nested array literal is credited to a gp literal later in the outer call (wb-rdv6 gate P47)", 'run([a, /* gp-decision-point: DP-01 */ b], "gp");', [["DP-01"]]],
  ["RES-22 a marker after a parenthesized preceding argument's opening parenthesis is credited to a gp literal later in the same call (wb-rdv6 gate P33)", 'run(( /* gp-decision-point: DP-01 */ x), "gp");', [["DP-01"]]],
  ["RES-23 a marker after the as keyword of a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P34)", 'run(x as /* gp-decision-point: DP-01 */ T, "gp");', [["DP-01"]]],
  ["RES-24 a marker after an element access's opening bracket in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P35)", 'run(xs[ /* gp-decision-point: DP-01 */ 0], "gp");', [["DP-01"]]],
  ["RES-25 a marker after a property access's dot in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P36)", 'run(a. /* gp-decision-point: DP-01 */ b, "gp");', [["DP-01"]]],
  ["RES-26 a marker after the opening angle bracket of a nested call's type arguments is credited to a gp literal later in the outer call (wb-rdv6 gate P37)", 'run(make< /* gp-decision-point: DP-01 */ T>(), "gp");', [["DP-01"]]],
  ["RES-27 a marker after the new keyword of a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P40)", 'run(new /* gp-decision-point: DP-01 */ Thing(), "gp");', [["DP-01"]]],
  ["RES-28 a marker after typeof in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P42)", 'run(typeof /* gp-decision-point: DP-01 */ x, "gp");', [["DP-01"]]],
  ["RES-29 a marker after a prefix ! in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P43)", 'run(! /* gp-decision-point: DP-01 */ x, "gp");', [["DP-01"]]],
  ["RES-30 a marker after a nested function expression's parameter-list parenthesis is credited to a gp literal later in the outer call (wb-rdv6 gate P45)", 'run(function ( /* gp-decision-point: DP-01 */ a) { return a; }, "gp");', [["DP-01"]]],
  ["RES-31 a marker after await in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P46)", 'async function f() {\n  await run(await /* gp-decision-point: DP-01 */ prepare(), "gp");\n}', [["DP-01"]]],
  ["RES-32 a marker after a spread token in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P50)", 'run(.../* gp-decision-point: DP-01 */ xs, "gp");', [["DP-01"]]],
  ["RES-33 a marker trailing an if condition, annotating its blockless then branch, is credited to a gp literal in the else branch (wb-rdv6 gate P53)", 'if (x) // gp-decision-point: DP-01\n  prepare();\nelse spawn("gp", []);', [["DP-01"]]],
  // wb-lx6m: members of the RES-14, RES-16, RES-17 and RES-18 kinds that the token-level reading credits in other forms.
  ["RES-34 a marker after a nested call's opening parenthesis on the gp literal's own line is credited to it (wb-rdv6 gate P22)", 'run(prepare( /* gp-decision-point: DP-01 */ x), "gp");', [["DP-01"]]],
  ["RES-35 a marker after a comma inside a nested call's argument list is credited to a gp literal later in the outer call (wb-rdv6 gate P38)", 'run(prepare(a, /* gp-decision-point: DP-01 */ b), "gp");', [["DP-01"]]],
  ["RES-36 a marker after a destructuring brace in a nested arrow's parameter list is credited to a gp literal later in the outer call (wb-rdv6 gate P39)", 'run(({ /* gp-decision-point: DP-01 */ a }) => a, "gp");', [["DP-01"]]],
  ["RES-37 a marker trailing a preceding argument's comma on the call's first line is credited to a gp literal on the next line (wb-rdv6 gate P49)", 'run(prepare(), // gp-decision-point: DP-01\n  "gp");', [["DP-01"]]],
  // wb-lx6m (wb-rdv6 gate F7, and the corpus's P31, P41, P44): members credited before wb-rdv6 too, read at node boundaries.
  ["RES-38 a marker trailing a blockless then branch on the if line is credited to a gp literal in the else branch on the next line (wb-rdv6 gate P60)", 'if (x) prepare(); // gp-decision-point: DP-01\nelse spawn("gp", []);', [["DP-01"]]],
  ["RES-39 a marker after a ternary's question mark, annotating its first branch, is credited to a gp literal in the second branch on the same line (wb-rdv6 gate P21)", 'const bin = cond ? /* gp-decision-point: DP-01 */ prepare() : "gp";', [["DP-01"]]],
  ["RES-40 a marker after an expression-bodied arrow argument's arrow token, annotating its body, is credited to a gp literal later in the same call (wb-rdv6 gate P23)", 'run(() => /* gp-decision-point: DP-01 */ prepare(), "gp");', [["DP-01"]]],
  ["RES-41 a marker on its own line inside a multi-line nested array literal is credited to a gp literal later in the outer call (wb-rdv6 gate P31)", 'run([\n  // gp-decision-point: DP-01\n  x,\n], "gp");', [["DP-01"]]],
  ["RES-42 a marker after a template literal's substitution opening in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P41)", `run(\`a${slot(" /* gp-decision-point: DP-01 */ b")}\`, "gp");`, [["DP-01"]]],
  ["RES-43 a marker after a binary + in a preceding argument is credited to a gp literal later in the same call (wb-rdv6 gate P44)", 'run(a + /* gp-decision-point: DP-01 */ b, "gp");', [["DP-01"]]],
  // wb-lx6m: seat-found member kinds before the literal; each read [] before wb-rdv6 and is credited since.
  ["RES-44 a marker after satisfies in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'run(x satisfies /* gp-decision-point: DP-01 */ T, "gp");', [["DP-01"]]],
  ["RES-45 a marker after void in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'run(void /* gp-decision-point: DP-01 */ x, "gp");', [["DP-01"]]],
  ["RES-46 a marker after delete in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'run(delete /* gp-decision-point: DP-01 */ o.k, "gp");', [["DP-01"]]],
  ["RES-47 a marker after an angle-bracket type assertion's closing bracket in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'run(<T> /* gp-decision-point: DP-01 */ x, "gp");', [["DP-01"]]],
  ["RES-48 a marker after yield in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'function* g() {\n  run(yield /* gp-decision-point: DP-01 */ x, "gp");\n}', [["DP-01"]]],
  ["RES-49 a marker after a nested arrow parameter's type-annotation colon is credited to a gp literal later in the outer call (wb-lx6m)", 'run((a: /* gp-decision-point: DP-01 */ T) => a, "gp");', [["DP-01"]]],
  ["RES-50 a marker after the = of a nested arrow parameter's default value is credited to a gp literal later in the outer call (wb-lx6m)", 'run((a = /* gp-decision-point: DP-01 */ 1) => a, "gp");', [["DP-01"]]],
  ["RES-51 a marker after the dot of import.meta in a preceding argument is credited to a gp literal later in the same call (wb-lx6m)", 'run(import. /* gp-decision-point: DP-01 */ meta, "gp");', [["DP-01"]]],
  ["RES-52 a marker inside a preceding declarator's call is credited to a gp literal in a later declarator of the same statement (wb-lx6m)", 'const a = prepare( /* gp-decision-point: DP-01 */ ), bin = "gp";', [["DP-01"]]],
  ["RES-53 a marker annotating a do statement's blockless body is credited to a gp literal in its while condition on a later line (wb-lx6m)", 'do // gp-decision-point: DP-01\n  prepare();\nwhile (spawn("gp", []));', [["DP-01"]]],
  // wb-lx6m: seat-found members after the literal on its own line (RES-54 and RES-55 read [] before wb-rdv6; RES-56 was credited before too).
  ["RES-54 a marker inside a nested array literal after the gp literal, on the literal's own line, is credited to it (wb-lx6m)", 'spawn("gp", [ /* gp-decision-point: DP-01 */ "rpc"]);', [["DP-01"]]],
  ["RES-55 a marker inside a nested call's argument list after the gp literal, on the literal's own line, is credited to it (wb-lx6m)", 'spawn("gp", opts( /* gp-decision-point: DP-01 */ ));', [["DP-01"]]],
  ["RES-56 a marker after an expression-bodied arrow's arrow token after the gp literal, on the literal's own line, is credited to it (wb-lx6m)", 'run("gp", () => /* gp-decision-point: DP-01 */ prepare());', [["DP-01"]]],
  // wb-lx6m: seat-found members at the other two unit kinds, a class member and an object property; each read [] before wb-rdv6.
  ["RES-57 a marker inside a class property initializer's nested call is credited to a gp literal later in the same initializer (wb-lx6m)", 'class A {\n  bin = prepare( /* gp-decision-point: DP-01 */ ) || "gp";\n}', [["DP-01"]]],
  ["RES-58 a marker inside an object property value's nested call is credited to a gp literal later in the same value (wb-lx6m)", 'const tool = {\n  command: prepare( /* gp-decision-point: DP-01 */ ) ?? "gp",\n};', [["DP-01"]]],
  // wb-2xd5 (wb-lx6m gate F1 and F3): the case-block region (a case block holds no members) and the unit kinds beyond a
  // statement, class member and object property; each reads [["DP-01"]] today and [] under wb-rdv6's base judge 1f387bdf.
  ["RES-59 a marker in a switch's case block before its first clause is credited to a gp literal in the switch's discriminant: a case block holds no members (wb-2xd5, wb-lx6m gate G-B05)", 'switch (spawn("gp", [])) { /* gp-decision-point: DP-01 */ case 1: break; }', [["DP-01"]]],
  ["RES-60 a marker inside an enum member initializer's nested call is credited to a gp literal later in the same initializer: an enum member is a unit (wb-2xd5, wb-lx6m gate G-B08)", 'enum E { Bin = prepare(/* gp-decision-point: DP-01 */) + "gp" }', [["DP-01"]]],
  ["RES-61 a marker inside an interface member's type argument list is credited to a gp literal type later in the same member: an interface member is a unit (wb-2xd5)", 'interface Tool {\n  bin: Prepare</* gp-decision-point: DP-01 */ X> | "gp";\n}', [["DP-01"]]],
  ["RES-62 a marker inside a type-literal member's type argument list is credited to a gp literal type later in the same member: a type-literal member is a unit (wb-2xd5)", 'type Tool = {\n  bin: Prepare</* gp-decision-point: DP-01 */ X> | "gp";\n};', [["DP-01"]]],
  // wb-2xd5 (wb-lx6m gate F2): the gate's PREP LEG 2 G-C probes verbatim, each a member the header's list did not name;
  // RES-67, RES-69..71, RES-73, RES-74, RES-76 and RES-77 are credited under wb-rdv6's base judge 1f387bdf too, the
  // other nine read [] under it.
  ["RES-63 a marker after a for-of statement's of keyword, annotating its iterable, is credited to a gp literal in its blockless body (wb-2xd5, wb-lx6m gate G-C01)", 'for (const x of /* gp-decision-point: DP-01 */ xs) spawn("gp", [x]);', [["DP-01"]]],
  ["RES-64 a marker after the = of a for statement's initializer is credited to a gp literal in its blockless body (wb-2xd5, wb-lx6m gate G-C02)", 'for (let i = /* gp-decision-point: DP-01 */ 0; i < 1; i++) spawn("gp", []);', [["DP-01"]]],
  ["RES-65 a marker inside a while statement's condition is credited to a gp literal in its blockless body (wb-2xd5, wb-lx6m gate G-C03)", 'while (/* gp-decision-point: DP-01 */ ready()) spawn("gp", []);', [["DP-01"]]],
  ["RES-66 a marker inside a computed property key is credited to a gp literal in the same property's value (wb-2xd5, wb-lx6m gate G-C04)", 'const tool = { [/* gp-decision-point: DP-01 */ key]: "gp" };', [["DP-01"]]],
  ["RES-67 a marker after an optional-chaining token in a preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C05)", 'run(a?./* gp-decision-point: DP-01 */ b, "gp");', [["DP-01"]]],
  ["RES-68 a marker inside a class member's decorator call, on the line above the member, is credited to a gp literal in the member's initializer (wb-2xd5, wb-lx6m gate G-C06)", 'class A {\n  @dec(/* gp-decision-point: DP-01 */)\n  bin = "gp";\n}', [["DP-01"]]],
  ["RES-69 a marker after a binary in operator in a preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C07)", 'run(k in /* gp-decision-point: DP-01 */ o, "gp");', [["DP-01"]]],
  ["RES-70 a marker between a tagged template's tag and its template in a preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C08)", 'run(tag/* gp-decision-point: DP-01 */`x`, "gp");', [["DP-01"]]],
  ["RES-71 a marker after a comma operator inside a parenthesized preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C09)", 'run((a, /* gp-decision-point: DP-01 */ b), "gp");', [["DP-01"]]],
  ["RES-72 a marker after a nested arrow's return-type colon is credited to a gp literal later in the outer call (wb-2xd5, wb-lx6m gate G-C10)", 'run((): /* gp-decision-point: DP-01 */ T => x, "gp");', [["DP-01"]]],
  ["RES-73 a marker after a nested arrow's arrow token in a later argument, on the gp literal's own line, is credited to it (wb-2xd5, wb-lx6m gate G-C11)", 'spawn("gp", xs.map((x) => /* gp-decision-point: DP-01 */ x));', [["DP-01"]]],
  ["RES-74 a block comment after the statement's end, annotating a later statement on the same line, is credited to a gp literal in the statement as its own trailing comment (wb-2xd5, wb-lx6m gate G-C12)", 'spawn("gp", []); /* gp-decision-point: DP-01 */ prepare();', [["DP-01"]]],
  ["RES-75 a marker after an earlier declarator's type-annotation colon is credited to a gp literal in a later declarator of the same statement (wb-2xd5, wb-lx6m gate G-C13)", 'const a: /* gp-decision-point: DP-01 */ T = x, bin = "gp";', [["DP-01"]]],
  ["RES-76 a marker after a non-null assertion in a preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C15)", 'run(x!/* gp-decision-point: DP-01 */.y, "gp");', [["DP-01"]]],
  ["RES-77 a marker after a nullish-coalescing operator in a preceding argument is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C16)", 'run(a ?? /* gp-decision-point: DP-01 */ b, "gp");', [["DP-01"]]],
  ["RES-78 a marker after the opening parenthesis of the call an export default statement holds, annotating a preceding argument, is credited to a gp literal later in the same call (wb-2xd5, wb-lx6m gate G-C17)", 'export default run(/* gp-decision-point: DP-01 */ x, "gp");', [["DP-01"]]],
  ["RES-79 a marker inside a dynamic import call in a preceding argument is credited to a gp literal later in the outer call (wb-2xd5, wb-lx6m gate G-C18)", 'run(import(/* gp-decision-point: DP-01 */ "m"), "gp");', [["DP-01"]]],
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
/** A link reference definition: reference-style links anywhere in the document resolve through it (gate K01-K12). */
const REFERENCE_DEFINITION = "[r]: https://example.invalid/r";
/** The audit document with REFERENCE_DEFINITION under its title, outside every section (the gate K01-K12 placement). */
const defined = (doc: string): string => doc.replace("# Pi control-loop audit\n", `# Pi control-loop audit\n\n${REFERENCE_DEFINITION}\n`);
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
  // wb-66f7 (wb-1xvp.3 cut #2 gate F1): a field is empty when it renders empty in the document, its reference-style links
  // resolved through the document's link reference definitions, as the census binding's own lex renders the cell.
  ["rendered view: a policy field holding only an empty reference-style link and a blank code span is empty (gate K01)", { doc: defined(withRows("Decision points", replaceRow(6, ["DP-06", "6", "[][r] ` `", "i", "a", "o", "r"]))) }, ["decision-point-invalid: DP-06 (empty policy)", "stage-uncovered: 6 Concurrent worker scheduling and resource allocation."]],
  ["rendered view: an authority field holding only a reference-style link whose text is a space is empty (gate K02)", { doc: defined(withRows("Decision points", replaceRow(7, ["DP-07", "7", "p", "i", "[ ][r]", "o", "r"]))) }, ["decision-point-invalid: DP-07 (empty authority)", "stage-uncovered: 7 Progress observation and result collection."]],
  ["rendered view: an outcomes field holding only a reference-style link around a zero-width space reference is empty (gate K03)", { doc: defined(withRows("Decision points", replaceRow(10, ["DP-10", "10", "p", "i", "a", "[&#8203;][r]", "r"]))) }, ["decision-point-invalid: DP-10 (empty outcomes)", "stage-uncovered: 10 Failure recovery, retries, and relaunch."]],
  ["rendered view: a current fixed rule holding only a reference-style link around a Hangul filler is empty (gate K04)", { doc: defined(withRows("Decision points", replaceRow(9, ["DP-09", "9", "p", "i", "a", "o", `[${String.fromCodePoint(0x3164)}][r]`]))) }, ["decision-point-invalid: DP-09 (empty current fixed rule)", "stage-uncovered: 9 Integration, landing, and task completion."]],
  ["rendered view: an inputs field holding only a reference-style image with no alt text is empty (review P2)", { doc: defined(withRows("Decision points", replaceRow(8, ["DP-08", "8", "p", "![][r]", "a", "o", "r"]))) }, ["decision-point-invalid: DP-08 (empty inputs)", "stage-uncovered: 8 Verification, review, and correction."]],
  ["rendered view: a link reference definition at the end of the document defines its label for every section, so an empty reference-style link is empty", { doc: renderDoc({ override: ["Decision points", replaceRow(4, ["DP-04", "4", "p", "[][r]", "a", "o", "r"])], append: REFERENCE_DEFINITION }) }, ["decision-point-invalid: DP-04 (empty inputs)", "stage-uncovered: 4 Worker and model selection."]],
  ["rendered view: a reference-style link with text is filled", { doc: defined(withRows("Decision points", replaceRow(6, ["DP-06", "6", "[the priority rule][r]", "i", "a", "o", "r"]))) }, []],
  ["rendered view: a reference-style link with no definition renders its brackets, so it is filled (gate K05)", { doc: withRows("Decision points", replaceRow(8, ["DP-08", "8", "p", "[][]", "a", "o", "r"])) }, []],
  // The value side stays fail-closed: a cell's value is read as the cell renders on its own, where a reference-style link
  // (its definition lies outside the cell) reads as its source and so matches no status or function name.
  ["fail-closed: an inventory status written as a reference-style link reads as its source and is invalid (gate K06)", { doc: defined(withRows("Inventory", [["dependency-aware task selection", "[implemented][r]"], ["adaptive concurrency", "proposed"]])) }, ["inventory-status-invalid: dependency-aware task selection -> [implemented][r]"]],
  ["fail-closed: a fallback function written as a reference-style link reads as its source and names no function (gate K12)", { doc: defined(withRows("Fallback", [[`\`${MODULE}#DP-02\``, "[selectWorkByPriority][r]"]])) }, [`fallback-missing: ${MODULE}#DP-02`]],
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
  ...judged("MISATTRIBUTED", MISATTRIBUTED),
  ...judged("FALSIFIERS", FALSIFIERS),
  ...judged(
    "STAGES",
    STAGES.map(([line, stage, text]) => [`README.md:${line} stage ${stage}`, text] as const),
  ),
];
