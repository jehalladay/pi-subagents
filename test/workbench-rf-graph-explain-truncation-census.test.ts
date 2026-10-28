/**
 * wb-2j3.10 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, program-triage-2026-10-17), the standing leg: the rf graph explain
 * truncation-honesty census, an until-then pin. Cut #2, the respin of refusal #1 (its unmet U1-U4 are cured below, CUT #2).
 * Statement (the bead's STATEMENT, read from the tracked export .beads/issues.jsonl at run time and never retyped beyond the
 * fragments the rows quote): it is tiled, in order and exactly, by row G's label, ", ", row W's label, ". ", the PENDING clause,
 * "; ", row U's label and ".", so no row label can drift from the filing and no row can be dropped without leaving its fragment
 * untiled. A section is read only from a head that occurs once: each of the four heads the census reads (STATEMENT, RATIONALE,
 * ACCEPTANCE, SURFACES) must occur exactly once in the description, both as its exact "\n\nHEAD: " string and as a word in any
 * case anywhere in the same text the sections are cut from, before any section is extracted; the description's paragraph heads
 * are held to the roster, and the row's acceptance_criteria and design fields (bd's specification fields beside the description)
 * are held absent. The row's notes, status and other fields are not read: they carry the record, not the filing.
 * READING: the gating artifact is the conjunction the STATEMENT names, the RFCLI release (PMO-05a/PMO-05b shipping the flag with
 * its two fields) conjoined with a Pi W10 slice that invokes graph explain, and "the artifact" in row U's label is that
 * conjunction. Its RFCLI conjunct is MET at the recorded build (row G); its Pi conjunct is unmet (row W); so the artifact does not
 * exist, and row U measures that Pi carries no change toward it.
 * NOT DELIVERED HERE: the PENDING clause ("If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit
 * and the graph revision verbatim and shall never present a capped path list as complete") and the filing's ACCEPTANCE, two
 * "On landing:" items (a consumer test driving the new adapter with a truncated:true, path_limit:N fixture; the graph revision
 * carried verbatim, a second value round-tripping). They bind when a Pi surface consumes rf graph explain (row W reds then).
 * The description's ACCEPTANCE section is held to exactly those two on-landing items, so a standing item added to it, a second
 * ACCEPTANCE or STATEMENT section, or an acceptance_criteria or design field on the row reds this census; a note does not.
 *
 * MEASURED (by the cutting seat ws-03, run g10-work-s129, 2026-10-28, on trunk dab445f and then e81d2b0 merged into the branch:
 * since cut #1's base 09f45a5, test, docs and .beads paths plus two src modules, src/workbench/collective-event.ts added and
 * src/workbench/hyperunix-observer.ts changed (landings 644 and 646), neither touching a reading below; the roster's "capture"
 * object holds the producer values, written by a capture script from the installed rf, two scratch rf workspaces and a read-only
 * git show and log of the RFCLI object store, never by hand):
 * - The installed rf was 0.1.845 at build b8b3e9f1de56 (rf --json --version at capturedUtc 2026-10-28T17:21:52Z:
 *   provenance.commit_id, mismatch false), the release
 *   the contractSource carrier records (REACTIVE_FIBER_CONTRACT_SOURCE, read through recordedRfRelease of
 *   test/helpers/rf-release-drift.ts); its registry serves graph.explain (served_reachable). The build's history carries the
 *   RFCLI commit e2d707538bb9 ("feat(schemas): [PMO-05b] rf graph explain --max-paths N adds truncated"); the prior build of the
 *   same release, 7e6ed89a09f6 (the build cut #1 captured), does not.
 * - Its graph explain leaf took --max-paths: the --help usage listed it among eleven options; `rf graph explain --max-paths 1
 *   source:x --json` against an empty scratch directory exited 3 with RF_WORKSPACE_INVALID and no unknown option (the flag parsed);
 *   over a scratch workspace (rf init plus one literal [[source]] row) the flagged explain exited 0 with the eight default result
 *   keys followed by truncated (false) and path_limit (1), and the unflagged explain exited 0 with the eight alone.
 * - Its envelope schema (reactive_fiber_cli/schemas/cli/graph.explain.schema.json, 25309 bytes) declared the ok:true result at
 *   /$defs/result with ten members, graph_revision_id, target, source, reachable, paths, edge_paths, reason, diagnostics,
 *   truncated and path_limit, of which the first eight are required (the two fields are emitted only under the flag; ruling R-49
 *   option (a)). At the bead's pin (ReactiveFiberCLI 8a8b83e4d) the same object's required list spans
 *   graph.explain.schema.json:375-383, the lines the filing cites, and holds the first seven: neither field is there, as filed.
 * - PMO-05b, the leaf's --max-paths with truncated and path_limit in its envelope (RFCLI BEADS-2026-10-16.md:61; ruling R-49 at
 *   :297), over PMO-05a's capped search below the CLI, has SHIPPED at the recorded build: the gating artifact's RFCLI conjunct is
 *   MET. It shipped under the unchanged release string 0.1.845 (cut #1 captured build 7e6ed89a, where it had not), a rebuild no
 *   repository anchor records (R-SAME-RELEASE-REBUILD below).
 * - Pi: three src modules import node:child_process, with five call sites, all pinned: execFileSync of git three times in
 *   src/index.ts (workspaceCandidateBasis's git and atRoot, observedPackageHead's revision), the detached host's spawn of
 *   process.execPath (launchDetachedWorkflow) and the provider's spawn of rf (nativeReactiveFiberRender), its argv renderArgv's
 *   (verb context render, tail --no-commit --no-input --json). No reference to a child-process binding escapes a call, and no
 *   module names child_process without binding it. No src literal spells the graph explain leaf, no src text spells a PMO-05b
 *   name, no src module imports an rf package (none is published) and the one registered rf capability is the non-committing
 *   render preview: the Pi conjunct is unmet.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin's witness is the roster's):
 *  G, the gating artifact's RFCLI conjunct, read from the capture: MET. G1 the capture's identity: the carrier's release at the
 *    build its commit names (a full sha, pinned beside the release), whose history carries the PMO-05b commit while the prior
 *    build's does not, and its graph.explain leaf served. A carrier re-pin reds G1 until the capture is re-measured at the new
 *    release (capture.remeasure); a rebuild under the same release does not (R-SAME-RELEASE-REBUILD). G2 the leaf's usage options
 *    include the filing's flag; the empty-scratch probe parses it (exit 3 on the workspace, no unknown option); the bounded probe
 *    adds both filing fields after the required members under the flag and neither without it. G3 the result members at the
 *    build include both fields and its required list neither; at the pin neither is a member or required; the revision member is
 *    in each list; the pin's required list spans exactly the cited lines; the schema file's bytes and sha-256.
 *  W, the Pi slice that invokes graph explain (none). W1 the src modules importing node:child_process (this reader and the shared
 *    sourceStructure read the same list, and the list is pinned) and every value reference there to a child-process binding: a
 *    named, default or namespace import, a require binding, or a const alias of one (a non-exported const or destructure of a
 *    binding or a namespace, or a const of a namespace member), resolved to a fixpoint. A reference is a call site when it calls
 *    a child-process function directly (or a namespace member of one); every call site is pinned
 *    (module|kind|scope|callee|binary|shell) and exactly one is rf (the provider's spawn). A call's binary is its first argument
 *    or, for a shell call (exec, execSync, or a spawn, spawnSync, execFile or execFileSync whose options literal sets shell to true
 *    or to a non-empty string), its command line's first word after any NAME=value assignments, shell-unquoted; a binary reads as
 *    rf by its basename, lower-cased, without a .exe or .cmd launcher extension; a call whose shell cannot be read (an options
 *    argument that is no literal, a spread, a computed or non-literal shell value) is opaque when its two readings differ; a
 *    non-literal binary is opaque. Every other value reference (a let or var alias, an exported alias, an argument, a member such
 *    as spawn.call or an uncalled namespace member, a property, an assignment, an export or a re-export) is an escape, and none
 *    exists (fail-closed: a new one reds for re-measure, as a new call site of any binary does). A module holding a child_process
 *    module-name literal outside an import or export declaration that it does not bind (an inline require, createRequire, an
 *    import equals, a variable specifier) is unbound, and none is; no code module under src is one the walks skip (a .js, .mjs,
 *    .cjs, .jsx, .mts, .cts or .tsx file: the list is pinned empty, its file-name controls read as pinned). A caller of another
 *    module's wrapper is not read; the wrapper module is (a re-export or an exported alias is an escape, a parameter binary an
 *    opaque site, a fixed rf binary a second rf site). The scanner's controls read as pinned. W2 the rf spawn's argv is
 *    renderArgv's: the argument is the const argv
 *    initialised by renderArgv(selector,workspaceRoot), renderArgv's array literals read as pinned and its returned array's words,
 *    with options and expressions elided, are context render. W3 no src string, template or array literal spells the leaf (its
 *    two words in any case, joined directly or by white space, ".", "_", ":", "/" or "-", neither word part of a longer one),
 *    read as spelled, with rf's options elided and, for strings and templates, shell-unquoted (quotes dropped, a backslash escape kept as
 *    its character); the planted spellings are caught and the near misses are not.
 *  U, until the artifact (the conjunction) exists, no Pi change. U1 no src text (comments included) spells a PMO-05b name: the
 *    filing's flag and its path_limit field, each in its snake, kebab and camel spellings, case-sensitive; the planted names are
 *    caught (in code, a line comment and a block comment) and the near misses are not. U2 the native and the injected rf
 *    registrations hold exactly the render preview (effectClass read, contractSource the carrier's non-committing render with its
 *    release masked) and no rf descriptor's id, description or contractSource spells the leaf; a registry holding a planted explain
 *    descriptor reads one finding. U3 no src module imports (static, export-from, dynamic or require) an rf package and package.json
 *    names or specifies none; the predicate's planted names and specs are caught, and Pi's own relative reactivefiber module and
 *    the other packages are not.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 *  pins, every pin's witness, the constants and controls, the filing reading (paragraph heads, repeated heads, each head plant's
 *  refusal, the specification fields present and a planted one's), the residual families and every registered test title - is
 *  held to the out-of-file roster (test/fixtures/rf-graph-explain-truncation-roster.json); outside both, the rows' labels are
 *  held to the bead's STATEMENT in the tracker export (the tiling above), the leaf, flag and fields to the STATEMENT's own
 *  spelling of them, the cited pin and lines to the capture's pin, and the capture's release to the carrier. The last case reads
 *  the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins that reached their
 *  witness.
 * NOT CLAIMED (edits of this file and the roster together): a pin removed from ROWS, the literal, IMPL and the roster; a control
 *  or a head plant removed from its list and the roster; a pin's case replaced by one that echoes its roster witness; row Q
 *  removed with RESIDUALS from every literal and the roster (Q quotes no STATEMENT fragment).
 * RESIDUALS (named, each with its pinned quiet row): R-COMPOSED the leaf spelled from runtime parts (a verb held in a variable,
 *  a concatenation, a pushed word) is invisible to W3 (Q1); R-SAME-RELEASE-REBUILD the carrier records a release and no build, so
 *  G1 admits a capture at any build of the carrier's release and a producer rebuilt under it (as b8b3e9f1 was over 7e6ed89a) is
 *  invisible to row G until a seat re-measures the capture (Q2); R-OUTSIDE-SRC the walks read src only (qa/, scripts and an
 *  operator's local provider module loaded from a path outside src are not read), though the scanners flag the same text (Q3);
 *  R-COMMON-WORD the filing's truncated field is an ordinary src word (a relation page flag, text truncation) and is not a U1
 *  needle (Q4); R-UNSEEN-LAUNCHER a process launched where no reader sees node:child_process (a composed module specifier,
 *  source text evaluated at run time, process.execve, an internal process binding, a package's own spawn such as execa) is no
 *  W1 site, importer or unbound module; W3 still reads a literal argv such a launch passes, but not one spelled inside evaluated
 *  source text (Q5).
 * SCOPE: the census judges Pi's src, its registrations and package.json, the filing's description and specification fields, and
 *  the captured producer state. It re-runs none of the runtime argv pins the rf graph mutation census owns
 *  (test/workbench-rf-graph-mutation-census.test.ts rows A and C), and the honesty homes the bead's rationale names
 *  (graph-view.ts, topology-slice.ts) keep their own suites.
 * CUT #2 (refusal #1's unmet list): U1 row G re-measured and re-shaped to the shipped state at build b8b3e9f1, the build bound in
 *  G1's witness beside the release, the same-release rebuild named with its quiet row (Q2), row U's premise and this header
 *  corrected; U2 const aliases and namespace destructures resolved, shell:true and NAME=value command lines read, every other
 *  reference an escape, every call site pinned and unbound modules read, each with controls; U3 every read head asserted unique,
 *  in the extraction's own view, before any extraction (plants pinned), and the specification fields held absent (F3's scope);
 *  U4 comment-form names and rf.exe, rf.cmd and RF binaries pinned as controls, with backslash, word-boundary and scope controls
 *  beside them.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, package.json, .beads and the roster are only read.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { sourceStructure } from "./helpers/census.js";
import { recordedRfRelease } from "./helpers/rf-release-drift.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-graph-explain-truncation-roster.json");
const BEAD = "wb-2j3.10";
const PROVIDER_FILE = "src/workbench/providers/reactivefiber.ts";
const RF_PREFIX = "reactivefiber.";
/** The src walk reaches at least this many modules (117 measured at the cut's base e81d2b0); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** A code module the walks would not read (they read *.ts): src holds none, and W1 pins the list. */
const UNWALKED_MODULE = /\.(?:[cm]?jsx?|[cm]ts|tsx)$/;
/** File-name controls for it: the seven skipped code extensions are caught; a .ts or .d.ts module and a .json file are not. */
const UNWALKED_CONTROLS: readonly string[] = ["probe.js", "probe.mjs", "probe.cjs", "probe.jsx", "probe.mts", "probe.cts", "probe.tsx", "probe.ts", "probe.d.ts", "probe.json"];
/** The reading of a non-literal element, argument or template substitution. */
const EXPR = "<expr>";
/** The leaf, its flag and its two fields as the STATEMENT spells them (held to it in the first case). */
const LEAF = "graph.explain";
const FLAG = "--max-paths";
const FIELDS = ["truncated", "path_limit"] as const;
/** The field that is an ordinary src word and so no U1 needle (R-COMMON-WORD). */
const EXCLUDED_FIELDS: readonly string[] = ["truncated"];
/** The result member that carries the graph revision. */
const REVISION_MEMBER = "graph_revision_id";
/** The pin and the schema lines the STATEMENT cites for the absent fields. */
const CITED_PIN = { rfcli: "8a8b83e4d", lines: [375, 383] } as const;
/** The STATEMENT clause and the two ACCEPTANCE items this standing leg does not deliver. */
const PENDING =
  "If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit and the graph revision verbatim and shall never present a capped path list as complete";
const PENDING_ACCEPTANCE: readonly string[] = [
  "On landing: a consumer test drives the new adapter with a truncated:true, path_limit:N fixture and asserts the projection is partial/truncated with a counted remainder; a capped list never projects coverage 'complete'.",
  "On landing: the graph revision is carried verbatim from the envelope (a second revision value round-trips).",
];
/** The STATEMENT's tiling: the fragments in order (a row id, or PENDING for the pending clause) and the separator after each. */
const TILES: readonly string[] = ["G", "W", "PENDING", "U"];
const SEPARATORS: readonly string[] = [", ", ". ", "; ", "."];
/** The description's section heads the census reads; each must occur once, as this string and as a word in any case. */
const HEADS = { statement: "\n\nSTATEMENT: ", rationale: "\n\nRATIONALE: ", acceptance: "\n\nACCEPTANCE: ", surfaces: "\n\nSURFACES: " } as const;
/** Plants appended to the real description, each repeating a read head (as a section, on one newline, in another case, inline). */
const HEAD_PLANTS: Readonly<Record<string, string>> = {
  "acceptance-after-related": '\n\nACCEPTANCE: ["A standing item: the consumer adapter ships with this bead."]',
  "statement-at-end": "\n\nSTATEMENT: A second statement read after the first.",
  "single-newline": '\nACCEPTANCE: ["A standing item."]',
  "lower-case": '\n\nAcceptance: ["A standing item."]',
  "inline-rationale": " RATIONALE: a second rationale inline.",
  "second-surfaces": "\n\nSURFACES: src/index.ts",
};
/** bd's specification fields beside the description (absent on this row), and a planted one that must read as present. */
const FILING_FIELDS: readonly string[] = ["acceptance_criteria", "design"];
const FIELD_PLANT: Readonly<Record<string, string>> = { acceptance_criteria: "A standing item: the consumer adapter ships with this bead." };
/** The child-process functions a call site is read for. */
const CHILD_PROCESS_CALLS: readonly string[] = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"];
/** The calls whose first argument is always a shell command line, and the calls whose options can make it one. */
const SHELL_CALLS: readonly string[] = ["exec", "execSync"];
const SHELL_OPTION_CALLS: readonly string[] = ["spawn", "spawnSync", "execFile", "execFileSync"];
/** A shell assignment word (NAME=value), skipped before a command line's command word. */
const ASSIGNMENT_WORD = /^[A-Za-z_][A-Za-z0-9_]*=/;
const CHILD_PROCESS_MODULE = /^(?:node:)?child_process$/;
/** rf's value-taking globals (its parser's RF_VALUE_OPTIONS): spelled apart, each consumes the next token. */
const RF_VALUE_OPTIONS: readonly string[] = ["--workspace", "--actor", "--color"];
/** A package name or spec carrying one of these (lower-cased), or a name or path segment equal to rf, is an rf package. */
const RF_PACKAGE_WORDS: readonly string[] = ["reactive-fiber", "reactivefiber", "reactive_fiber"];

/** W1's scanner controls: module bodies (parsed, never compiled or run). */
const SPAWN_CONTROLS: Readonly<Record<string, string>> = {
  named: `import { spawn } from "node:child_process"; function run(argv: string[]) { return spawn("rf", argv); }`,
  alias: `import { execFile as launch } from "child_process"; launch("/usr/local/bin/rf", ["graph"]);`,
  namespace: `import * as cp from "node:child_process"; cp.spawnSync("rf", []);`,
  "default-opaque": `import cp from "node:child_process"; cp.fork(script);`,
  require: `const { spawn: launch } = require("node:child_process"); launch("rf", argv);`,
  "require-element": `const cp = require("child_process"); cp["execSync"]("rf graph show --json");`,
  "variable-binary": `import { spawn } from "node:child_process"; const BIN = "rf"; spawn(BIN, argv);`,
  git: `import { execFileSync } from "node:child_process"; execFileSync("git", ["status"]);`,
  "regex-exec": `import { spawn } from "node:child_process"; const found = /rf/.exec(text);`,
  "type-only": `import type { ChildProcess } from "node:child_process"; const exec = (line: string) => line; exec("rf");`,
  unimported: `spawn("rf", argv);`,
  exe: `import { execFileSync } from "node:child_process"; execFileSync("rf.exe", ["context", "show"]);`,
  "cmd-path": String.raw`import { execFileSync } from "node:child_process"; execFileSync("C:\\tools\\rf.cmd", ["context", "show"]);`,
  upper: `import { spawn } from "node:child_process"; spawn("RF", ["context", "show"]);`,
  "const-alias": `import { spawn } from "node:child_process"; const launch = spawn; launch("rf", ["context", "show"]);`,
  "namespace-destructure": `import * as cp from "node:child_process"; const { execFileSync: run } = cp; run("rf", ["context", "show"]);`,
  "member-alias": `import * as cp from "node:child_process"; const run = cp.execFileSync; run("rf", ["context", "show"]);`,
  "alias-chain": `import * as cp from "node:child_process"; const space = cp; const { spawn: go } = space; const again = go; again("rf", []);`,
  "let-alias": `import { spawn } from "node:child_process"; let launch = spawn; launch("rf", []);`,
  "exported-alias": `import { spawn } from "node:child_process"; export const launch = spawn;`,
  argument: `import { spawn } from "node:child_process"; run(spawn, "rf");`,
  "call-method": `import { spawn } from "node:child_process"; spawn.call(undefined, "rf", []);`,
  property: `import * as cp from "node:child_process"; const host = { launch: cp.spawn };`,
  "re-export": `export { spawn as launch } from "node:child_process";`,
  "local-export": `import { spawn } from "node:child_process"; export { spawn as launch };`,
  "wrapper-function": `import { spawn } from "node:child_process"; export function launch(binary: string, argv: string[]) { return spawn(binary, argv); }`,
  "wrapped-caller": `import { launch } from "./launch.js"; launch("rf", ["graph", "explain", target]);`,
  "inline-require": `require("node:child_process").execFileSync("rf", ["context", "show"]);`,
  "shell-true": `import { spawn } from "node:child_process"; spawn("rf context show --json", { shell: true });`,
  "shell-path": `import { execFile } from "node:child_process"; execFile("rf context show", [], { shell: "/bin/sh" });`,
  "shell-false": `import { spawn } from "node:child_process"; spawn("rf context show", { shell: false });`,
  "shell-unknown": `import { spawnSync } from "node:child_process"; spawnSync("rf context show", options);`,
  "assignment-prefix": `import { execSync } from "node:child_process"; execSync("RF_LOG_LEVEL=debug rf context show --json");`,
  launcher: `import { execFileSync } from "node:child_process"; execFileSync("env", ["rf", "context", "show"]);`,
  "method-scope": `import { spawn } from "node:child_process"; class Host { launch() { spawn("rf", []); } } const run = function () { spawn("git", []); };`,
};
/** W3's planted spellings of the leaf (each must be caught) and its near misses (none may be). */
const LEAF_CAUGHT: Readonly<Record<string, string>> = {
  argv: `spawn("rf", ["graph", "explain", target, "--json"]);`,
  spaced: `const line = "rf graph explain source:x --json";`,
  dotted: `const leaf = "graph.explain";`,
  colon: `const id = "rf:graph:explain";`,
  slashed: `const route = "/rf/graph/explain";`,
  "option-between": `const argv = ["--workspace", root, "graph", "--json", "explain", target];`,
  "value-option-between": `const argv = ["graph", "--color", "never", "explain"];`,
  template: `const line = \`rf graph \${flags} explain \${target}\`;`,
  "shell-quoted": `const line = "rf graph 'explain' source:x";`,
  escaped: String.raw`const line = "rf graph expl\\ain source:x";`,
  upper: `const LEAF = "GRAPH_EXPLAIN";`,
  kebab: `const verb = "graph-explain";`,
  camel: `const verb = "graphExplain";`,
};
const LEAF_QUIET: Readonly<Record<string, string>> = {
  show: `const argv = ["graph", "show", "--json"];`,
  "context-explain": `const argv = ["context", "explain", renderId];`,
  word: `const word = "explain";`,
  explainer: `const text = "the graph explainer";`,
  paragraph: `const text = "a paragraph explains it";`,
  subgraph: `const text = "the subgraph explain step";`,
  render: `const argv = ["--workspace", root, "context", "render", "--no-commit", "--no-input", "--json"];`,
  comment: "// rf graph explain is not consumed here\nconst value = 1;",
};
/** U1's planted PMO-05b names (each must be caught) and its near misses (none may be). */
const NAME_CAUGHT: Readonly<Record<string, string>> = {
  field: "const limit = result.path_limit;",
  flag: `const argv = ["graph", "explain", "--max-paths", "5"];`,
  "camel-field": "interface Projection { pathLimit: number }",
  "library-keyword": "const options = { max_paths: 5 };",
  "camel-flag": "const maxPaths = 5;",
  "kebab-field": `const option = "path-limit";`,
  "line-comment": "// the path_limit field is never read here\nconst value = 1;",
  "block-comment": "/* --max-paths stays unconsumed */ const value = 1;",
};
const NAME_QUIET: Readonly<Record<string, string>> = {
  socket: "export const DETACHED_SOCKET_PATH_LIMIT = 103;",
  applied: "const page = { truncated: true, limitApplied: 40 };",
  length: "const maxPathLength = 4096;",
};
/** U2's planted descriptor: an rf capability naming the leaf. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "reactivefiber.graph.explain",
  version: "1.0.0",
  description: "Explain one rf graph node",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  effectClass: "read",
  permissions: ["reactivefiber:render"],
  supportedModes: ["invoke"],
  contractSource: "rf@0.0.0:reactive-fiber.cli/v1 graph.explain",
};
/** U3's planted specifiers and specs: rf packages (each caught) and others (none caught). */
const PACKAGE_CAUGHT: readonly string[] = ["@reactive-fiber/sdk", "reactivefiber", "@reactivefiber/cli", "reactive_fiber_cli", "@rf/sdk", "rf", "@acme/reactive-fiber-tsx"];
const PACKAGE_QUIET: readonly string[] = ["@furnace/sdk", "./providers/reactivefiber.js", "../workbench/providers/reactivefiber.js", "node:child_process", "@hyperunix/sdk", "typescript", "rfc-parser", "surf"];
const SPEC_CAUGHT: readonly string[] = ["npm:@reactive-fiber/sdk@1.0.0", "file:../ReactiveFiberCLI", "file:vendor/rf"];
const SPEC_QUIET: readonly string[] = ["^4.1.0", "file:vendor/furnace-sdk", "npm:surf@2.0.0"];
/** Q1's composed spellings (R-COMPOSED): the leaf assembled at run time. */
const COMPOSED_PROBES: Readonly<Record<string, string>> = {
  variable: `const verb = "explain"; spawn("rf", ["graph", verb]);`,
  concatenated: `const leaf = "gr" + "aph explain";`,
  pushed: `const words = ["graph"]; words.push("explain");`,
};
/** Q3's out-of-src text (R-OUTSIDE-SRC): an operator's local provider module spawning the leaf. */
const LOCAL_PROVIDER = `import { spawn } from "node:child_process";
export function register(registry) {
  registry.register({ descriptor: { id: "local.graph", version: "1.0.0", description: "d", inputSchema: {}, effectClass: "read", permissions: [], supportedModes: ["invoke"] }, invoke: async () => spawn("rf", ["graph", "explain", "source:x", "--json"]) });
}`;
/** Q4's probe (R-COMMON-WORD): a page flag read under the excluded field's name. */
const COMMON_WORD_PROBE = "if (result.truncated) return { partial: true };";
/** Q5's launches no reader sees (R-UNSEEN-LAUNCHER): W3 reads the leaf in a literal argv one passes, not inside evaluated source text. */
const UNSEEN_LAUNCHES: Readonly<Record<string, string>> = {
  "composed-specifier": `const cp = await import("node:" + "child" + "_process"); cp.spawn("rf", ["graph", "explain", target]);`,
  execve: `process.execve("/usr/local/bin/rf", ["rf", "graph", "explain", target], process.env);`,
  binding: `process.binding("spawn_sync").spawn({ file: "rf", args: ["rf", "graph", "explain"] });`,
  evaluated: `eval("require('node:child_process').spawn('rf', ['graph', 'explain'])");`,
  package: `import { execa } from "execa"; await execa("rf", ["graph", "explain", target]);`,
};
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-SAME-RELEASE-REBUILD": ["Q2"],
  "R-OUTSIDE-SRC": ["Q3"],
  "R-COMMON-WORD": ["Q4"],
  "R-UNSEEN-LAUNCHER": ["Q5"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for G, W and U, to the bead's STATEMENT. */
const ROWS: readonly Row[] = [
  {
    id: "G",
    label:
      "Gating artifact: RFCLI PMO-05a/PMO-05b (program packets rfc-20qgk.8/rfc-20qgk.9, PMO/BEADS-2026-10-16.md:61,:296-297@8a8b83e4d) shipping rf graph explain --max-paths with truncated/path_limit fields (absent from graph.explain.schema.json:375-383@8a8b83e4d)",
    pins: ["G1", "G2", "G3"],
  },
  { id: "W", label: "conjoined with a Pi W10 slice that actually invokes graph explain", pins: ["W1", "W2", "W3"] },
  { id: "U", label: "until the artifact exists, no Pi change", pins: ["U1", "U2", "U3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
/** One captured explain run over the scratch workspace (bounded.flagged or bounded.unflagged). */
interface ExplainRun {
  readonly argv: readonly string[];
  readonly exit: number;
  readonly ok: boolean;
  readonly command: string;
  readonly keys: readonly string[];
  readonly truncated: JsonValue;
  readonly pathLimit: JsonValue;
}
interface Capture {
  readonly release: string;
  readonly commit: string;
  readonly mismatch: boolean;
  readonly leaf: { readonly path: string; readonly served: boolean; readonly availability: string };
  readonly usage: string;
  readonly schema: { readonly bytes: number; readonly sha256: string };
  readonly members: readonly string[];
  readonly required: readonly string[];
  readonly probe: {
    readonly argv: readonly string[];
    readonly exit: number;
    readonly ok: boolean;
    readonly command: string;
    readonly codes: readonly string[];
    readonly unknown: readonly string[];
  };
  readonly bounded: { readonly flagged: ExplainRun; readonly unflagged: ExplainRun };
  readonly pin: { readonly rfcli: string; readonly lines: readonly number[]; readonly members: readonly string[]; readonly required: readonly string[] };
  readonly shipped: { readonly commit: string; readonly subject: string; readonly inBuild: boolean; readonly prior: string; readonly inPrior: boolean };
}
interface Roster {
  readonly capture: Capture;
  readonly filing: JsonValue;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  return value;
}
function object(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function integer(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`${field} must be an integer`);
  return value;
}
function truth(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`${field} must be a boolean`);
  return value;
}

function readExplainRun(raw: unknown, field: string): ExplainRun {
  const run = object(raw, field);
  if (!Object.hasOwn(run, "truncated") || !Object.hasOwn(run, "path_limit")) throw new Error(`${field} must record truncated and path_limit`);
  return {
    argv: strings(run.argv, `${field}.argv`),
    exit: integer(run.exit, `${field}.exit`),
    ok: truth(run.ok, `${field}.ok`),
    command: text(run.command, `${field}.command`),
    keys: strings(run.keys, `${field}.keys`),
    truncated: json(run.truncated),
    pathLimit: json(run.path_limit),
  };
}
/** The capture as the capture script wrote it, every field refused by name when it has the wrong shape. */
function readCapture(raw: unknown): Capture {
  const capture = object(raw, "roster capture");
  const leaf = object(capture.leaf, "capture leaf");
  const schema = object(capture.schema, "capture schema");
  const probe = object(capture.probe, "capture probe");
  const envelope = object(probe.envelope, "capture probe envelope");
  const diagnostics = (Array.isArray(envelope.diagnostics) ? envelope.diagnostics : []).map((row: unknown, at: number) => object(row, `capture probe diagnostics[${at}]`));
  const bounded = object(capture.bounded, "capture bounded");
  const pin = object(capture.pin, "capture pin");
  const lines = Array.isArray(pin.lines) && pin.lines.every(line => Number.isInteger(line)) ? (pin.lines as number[]) : [];
  const shipped = object(capture.shipped, "capture shipped");
  return {
    release: text(capture.release, "capture release"),
    commit: text(capture.commit, "capture commit"),
    mismatch: truth(capture.mismatch, "capture mismatch"),
    leaf: { path: text(leaf.path, "capture leaf.path"), served: truth(leaf.served, "capture leaf.served"), availability: text(leaf.availability, "capture leaf.availability") },
    usage: text(object(capture.usage, "capture usage").line, "capture usage.line"),
    schema: { bytes: integer(schema.bytes, "capture schema.bytes"), sha256: text(schema.sha256, "capture schema.sha256") },
    members: strings(schema.members, "capture schema.members"),
    required: strings(schema.required, "capture schema.required"),
    probe: {
      argv: strings(probe.argv, "capture probe.argv"),
      exit: integer(probe.exit, "capture probe.exit"),
      ok: truth(envelope.ok, "capture probe.envelope.ok"),
      command: text(envelope.command, "capture probe.envelope.command"),
      codes: diagnostics.map((row, at) => text(row.code, `capture probe diagnostics[${at}].code`)),
      unknown: diagnostics
        .filter(row => row.code === "RF_USAGE_UNKNOWN_OPTION")
        .flatMap((row, at) => strings(object(row.metadata, `capture probe unknown-option diagnostic ${at} metadata`).options, "capture probe metadata.options")),
    },
    bounded: { flagged: readExplainRun(bounded.flagged, "capture bounded.flagged"), unflagged: readExplainRun(bounded.unflagged, "capture bounded.unflagged") },
    pin: {
      rfcli: text(pin.rfcli, "capture pin.rfcli"),
      lines,
      members: strings(pin.members, "capture pin.members"),
      required: strings(pin.required, "capture pin.required"),
    },
    shipped: {
      commit: text(shipped.commit, "capture shipped.commit"),
      subject: text(shipped.subject, "capture shipped.subject"),
      inBuild: truth(shipped.inBuild, "capture shipped.inBuild"),
      prior: text(shipped.prior, "capture shipped.prior"),
      inPrior: truth(shipped.inPrior, "capture shipped.inPrior"),
    },
  };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !isObject(raw.filing) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants, filing and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    capture: readCapture(raw.capture),
    filing: json(raw.filing),
    constants: json(raw.constants) as JsonObject,
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
const CAPTURE = ROSTER.capture;
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the readers ----

function parse(fileName: string, source: string): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(path);
    return entry.isFile() ? [path] : [];
  });
}
interface Module {
  readonly name: string;
  readonly source: string;
}
/** Every src/**\/*.ts module, by repository-relative path with "/" separators. */
function srcModules(): Module[] {
  return filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => ({ name: relative(REPO, file).split("\\").join("/"), source: readFileSync(file, "utf8") }))
    .sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
}

/** The leaf's spelling family: its words in any case, joined directly or by any run of white space, ".", "_", ":", "/" or "-". */
const LEAF_PATTERN = new RegExp(`(?<![A-Za-z0-9])${LEAF.split(".").join("[\\s._:/-]*")}(?![A-Za-z0-9])`, "i");
/** A token run as rf's group parsers read it: every option, the value a value option consumes and every EXPR elided. */
function optionElided(tokens: readonly string[]): string {
  const kept: string[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] ?? "";
    if (RF_VALUE_OPTIONS.includes(token)) index += 1;
    else if (token !== "" && !token.startsWith("-") && token !== EXPR) kept.push(token);
  }
  return kept.join(" ");
}
/** A shell line with its quoting removed: a backslash escape keeps its character, then every ' and " is dropped. */
function shellUnquoted(line: string): string {
  return line.replace(/\\(.)/gs, "$1").replace(/['"]/g, "");
}
function arrayWords(node: ts.ArrayLiteralExpression): string[] {
  return node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : EXPR));
}
/** Every string, template and array literal of one module that spells the leaf, as `${form}:${line}`. */
function leafHits(fileName: string, source: string): string[] {
  const file = parse(fileName, source);
  const hits: string[] = [];
  const judge = (form: string, node: ts.Node, readings: readonly string[]): void => {
    if (readings.some(reading => LEAF_PATTERN.test(reading))) hits.push(`${form}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`);
  };
  const line = (spelled: string): string[] => {
    const unquoted = shellUnquoted(spelled);
    return [spelled, optionElided(spelled.split(/\s+/)), unquoted, optionElided(unquoted.split(/\s+/))];
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge("literal", node, line(node.text));
    else if (ts.isTemplateExpression(node)) judge("template", node, line([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(` ${EXPR} `)));
    else if (ts.isArrayLiteralExpression(node)) {
      const words = arrayWords(node);
      judge("argv", node, [words.join(" "), optionElided(words)]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return hits;
}

/** none: the first argument is a binary; shell: a command line; unknown: an options argument the reader cannot read. */
type Shell = "none" | "shell" | "unknown";
interface SpawnSite {
  readonly kind: "rf" | "literal" | "opaque";
  readonly scope: string;
  readonly callee: string;
  readonly binary: string;
  readonly shell: Shell;
  readonly call: ts.CallExpression;
}
interface SpawnScan {
  /** The module binds node:child_process (a non-type import with bindings, a require binding or a non-type re-export). */
  readonly imports: boolean;
  /** The module holds a child_process module-name literal outside an import or export declaration. */
  readonly loads: boolean;
  readonly sites: readonly SpawnSite[];
  /** Every value reference to a binding that is no call site, as `${scope}:${binding}:${form}`. */
  readonly escapes: readonly string[];
}
/** The name of the function a node stands in (a declaration, a method or a function bound to a const), else <module>. */
function scopeOf(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined) return at.name.getText();
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
  }
  return "<module>";
}
function requiresChildProcess(node: ts.Expression | undefined): boolean {
  if (node === undefined || !ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "require") return false;
  const first = node.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS_MODULE.test(first.text);
}
/** The basename of a binary path, without a Windows launcher extension, lower-cased. */
function binaryName(binary: string): string {
  return (binary.split(/[\\/]/).pop() ?? "").toLowerCase().replace(/\.(?:exe|cmd)$/, "");
}
/** A shell line's command word: its first word after any leading NAME=value assignments, shell-unquoted. */
function commandWord(line: string): string {
  return shellUnquoted(line.trim().split(/\s+/).find(word => !ASSIGNMENT_WORD.test(word)) ?? "");
}
/** One options property's reading of shell: none for another key or a false or empty value, shell for true or a path. */
function shellProperty(property: ts.ObjectLiteralElementLike): Shell {
  if (ts.isSpreadAssignment(property)) return "unknown";
  const name = property.name;
  if (ts.isComputedPropertyName(name)) return "unknown";
  const key = ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : "<key>";
  if (key !== "shell") return "none";
  if (!ts.isPropertyAssignment(property)) return "unknown";
  const value = property.initializer;
  if (value.kind === ts.SyntaxKind.FalseKeyword || (ts.isStringLiteralLike(value) && value.text === "")) return "none";
  if (value.kind === ts.SyntaxKind.TrueKeyword || ts.isStringLiteralLike(value)) return "shell";
  return "unknown";
}
/** Whether a call's first argument is a shell command line: always for exec and execSync, never for fork, and for the others
 * when an options literal sets shell; unknown when a spread or a non-literal argument could be the options. */
function shellOf(call: ts.CallExpression, callee: string): Shell {
  if (SHELL_CALLS.includes(callee)) return "shell";
  if (!SHELL_OPTION_CALLS.includes(callee)) return "none";
  const rest = call.arguments.slice(1);
  let shell: Shell = "none";
  for (const [index, argument] of rest.entries()) {
    if (ts.isSpreadElement(argument)) return "unknown";
    if (ts.isObjectLiteralExpression(argument)) {
      for (const property of argument.properties) {
        const read = shellProperty(property);
        if (read === "unknown") return "unknown";
        if (read === "shell") shell = "shell";
      }
    } else if (
      !ts.isArrayLiteralExpression(argument) &&
      !ts.isArrowFunction(argument) &&
      !ts.isFunctionExpression(argument) &&
      !rest.slice(index + 1).some(later => ts.isObjectLiteralExpression(later))
    ) {
      return "unknown";
    }
  }
  return shell;
}
function isConst(declaration: ts.VariableDeclaration): boolean {
  return ts.isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & ts.NodeFlags.Const) !== 0;
}
function isExported(declaration: ts.VariableDeclaration): boolean {
  const statement = declaration.parent.parent;
  return ts.isVariableStatement(statement) && (statement.modifiers ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
}
/** Whether an identifier reads a value: never a declared name, a property or label name, or a type position. */
function isValueReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === id;
  if (ts.isShorthandPropertyAssignment(parent)) return parent.name === id;
  if (ts.isExportSpecifier(parent)) return parent.parent.parent.moduleSpecifier === undefined && (parent.propertyName ?? parent.name) === id;
  if (ts.isQualifiedName(parent) || ts.isTypeReferenceNode(parent) || ts.isTypeQueryNode(parent)) return false;
  const named = parent as { readonly name?: unknown; readonly propertyName?: unknown; readonly label?: unknown };
  return named.name !== id && named.propertyName !== id && named.label !== id;
}
/** The form of a reference that is no call site. */
function escapeForm(id: ts.Identifier): string {
  const parent = id.parent;
  if (ts.isVariableDeclaration(parent)) return !isConst(parent) ? "mutable-alias" : isExported(parent) ? "exported-alias" : "alias";
  if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) return parent.expression === id ? "call" : "argument";
  if (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) return "member";
  if (ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent)) return "property";
  if (ts.isExportSpecifier(parent) || ts.isExportAssignment(parent)) return "export";
  if (ts.isBinaryExpression(parent)) return "assignment";
  return "other";
}
/** A destructuring element the alias reader resolves: a plain local, optionally renamed, with no default and no rest. */
function plainElement(element: ts.BindingElement): boolean {
  const key = element.propertyName;
  return element.dotDotDotToken === undefined && element.initializer === undefined && ts.isIdentifier(element.name) && (key === undefined || ts.isIdentifier(key) || ts.isStringLiteral(key));
}
function elementKey(element: ts.BindingElement): string {
  const key = element.propertyName ?? element.name;
  return ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : "<computed>";
}
/** One module's child-process bindings (static imports, require bindings and const aliases of them, resolved to a fixpoint; a
 * type-only import binds nothing) and every value reference to them: a call site (its callee, its binary read as rf, another
 * literal or opaque, and its shell reading) or an escape. */
function scanSpawns(fileName: string, source: string): SpawnScan {
  const file = parse(fileName, source);
  const named = new Map<string, string>();
  const spaces = new Set<string>();
  const consumed = new Set<ts.Node>();
  const escapes: string[] = [];
  let imports = false;
  let loads = false;
  const bindRequire = (declaration: ts.VariableDeclaration): void => {
    if (!requiresChildProcess(declaration.initializer)) return;
    imports = true;
    if (ts.isIdentifier(declaration.name)) spaces.add(declaration.name.text);
    else if (ts.isObjectBindingPattern(declaration.name)) {
      for (const element of declaration.name.elements) {
        if (!ts.isIdentifier(element.name)) continue;
        const exported = element.propertyName !== undefined && ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.name.text;
        named.set(element.name.text, exported);
      }
    }
  };
  const bind = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && CHILD_PROCESS_MODULE.test(node.text) && !ts.isImportDeclaration(node.parent) && !ts.isExportDeclaration(node.parent)) loads = true;
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      if (clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) spaces.add(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) spaces.add(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) if (!element.isTypeOnly) named.set(element.name.text, (element.propertyName ?? element.name).text);
        }
        imports ||= clause.name !== undefined || bindings !== undefined;
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      if (!node.isTypeOnly) {
        imports = true;
        const clause = node.exportClause;
        const names = clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
        escapes.push(`${scopeOf(node)}:${names.join("+")}:re-export`);
      }
    } else if (ts.isVariableDeclaration(node)) bindRequire(node);
    ts.forEachChild(node, bind);
  };
  bind(file);
  const memberOf = (expression: ts.Node): string | undefined => {
    if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text)) return expression.name.text;
    if (ts.isElementAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text) && ts.isStringLiteralLike(expression.argumentExpression)) {
      return expression.argumentExpression.text;
    }
    return undefined;
  };
  const aliases = new Set<ts.VariableDeclaration>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && isConst(node) && !isExported(node) && node.initializer !== undefined) aliases.add(node);
    ts.forEachChild(node, collect);
  };
  collect(file);
  const resolveAlias = (declaration: ts.VariableDeclaration): boolean => {
    const initializer = declaration.initializer;
    const name = declaration.name;
    if (initializer === undefined) return false;
    if (ts.isIdentifier(initializer) && ts.isIdentifier(name) && named.has(initializer.text)) {
      named.set(name.text, named.get(initializer.text) ?? "");
      consumed.add(initializer);
      return true;
    }
    if (ts.isIdentifier(initializer) && spaces.has(initializer.text)) {
      if (ts.isIdentifier(name)) spaces.add(name.text);
      else if (ts.isObjectBindingPattern(name) && name.elements.every(plainElement)) {
        for (const element of name.elements) if (ts.isIdentifier(element.name)) named.set(element.name.text, elementKey(element));
      } else return false;
      consumed.add(initializer);
      return true;
    }
    const member = memberOf(initializer);
    if (member !== undefined && ts.isIdentifier(name) && (ts.isPropertyAccessExpression(initializer) || ts.isElementAccessExpression(initializer))) {
      named.set(name.text, member);
      consumed.add(initializer.expression);
      return true;
    }
    return false;
  };
  for (let grew = true; grew; ) {
    grew = false;
    for (const declaration of aliases) {
      if (!resolveAlias(declaration)) continue;
      aliases.delete(declaration);
      grew = true;
    }
  }
  const sites: SpawnSite[] = [];
  const site = (call: ts.CallExpression, callee: string): SpawnSite => {
    const scope = scopeOf(call);
    const first = call.arguments[0];
    const shell = shellOf(call, callee);
    if (first === undefined || !ts.isStringLiteralLike(first)) return { kind: "opaque", scope, callee, binary: first === undefined ? "<none>" : first.getText(file), shell, call };
    const command = commandWord(first.text);
    const kindOf = (binary: string): "rf" | "literal" => (binaryName(binary) === "rf" ? "rf" : "literal");
    if (shell === "shell") return { kind: kindOf(command), scope, callee, binary: command, shell, call };
    if (shell === "unknown" && binaryName(first.text) !== binaryName(command)) return { kind: "opaque", scope, callee, binary: first.text, shell, call };
    return { kind: kindOf(first.text), scope, callee, binary: first.text, shell, call };
  };
  const classify = (id: ts.Identifier): void => {
    const parent = id.parent;
    const callee = named.get(id.text);
    if (callee !== undefined && ts.isCallExpression(parent) && parent.expression === id && CHILD_PROCESS_CALLS.includes(callee)) {
      sites.push(site(parent, callee));
      return;
    }
    if (spaces.has(id.text) && (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === id) {
      const member = memberOf(parent);
      const call = parent.parent;
      if (member !== undefined && ts.isCallExpression(call) && call.expression === parent && CHILD_PROCESS_CALLS.includes(member)) {
        sites.push(site(call, member));
        return;
      }
    }
    escapes.push(`${scopeOf(id)}:${id.text}:${escapeForm(id)}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && (named.has(node.text) || spaces.has(node.text)) && !consumed.has(node) && isValueReference(node)) classify(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { imports, loads, sites, escapes };
}
function scanReading(scan: SpawnScan): string {
  const sites = scan.sites.map(site => `${site.kind}:${site.scope}:${site.callee}:${site.binary}:${site.shell}`).join(",");
  return `${scan.imports ? "imports" : scan.loads ? "unbound" : "no-import"}|${sites}|${scan.escapes.join(",")}`;
}
/** The modules the shared reader (sourceStructure, test/helpers/census.ts) reads as loading node:child_process. */
function sharedImporters(modules: readonly Module[]): string[] {
  return modules
    .filter(module => sourceStructure(REPO, module.name).imports.some(entry => !entry.typeOnly && CHILD_PROCESS_MODULE.test(entry.module)))
    .map(module => module.name);
}

/** The case-sensitive needles of U1: the filing's flag and each non-excluded field, in their snake, kebab and camel spellings. */
function spellings(name: string): string[] {
  const words = name.replace(/^-+/, "").split(/[-_]/);
  const camel = words.map((word, index) => (index === 0 ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)).join("");
  return [...new Set([name, words.join("_"), words.join("-"), camel])];
}
const NEEDLES: readonly string[] = [FLAG, ...FIELDS.filter(field => !EXCLUDED_FIELDS.includes(field))].flatMap(spellings);
function nameHits(source: string): string[] {
  return NEEDLES.filter(needle => source.includes(needle));
}

/** The package a bare module specifier loads, or undefined for a relative, absolute or node: specifier. */
function packageOf(specifier: string): string | undefined {
  if (specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("node:")) return undefined;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}
function rfPackage(specifier: string): boolean {
  const name = packageOf(specifier)?.toLowerCase();
  if (name === undefined) return false;
  return RF_PACKAGE_WORDS.some(word => name.includes(word)) || name.replace(/^@/, "").split("/").includes("rf");
}
function rfSpec(spec: string): boolean {
  const lower = spec.toLowerCase();
  return RF_PACKAGE_WORDS.some(word => lower.includes(word)) || lower.split(/[/:@\\]/).includes("rf");
}

/** Never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function plantedRegistry(): CapabilityRegistry {
  const registry = injectedRegistry();
  registry.register({ descriptor: PLANTED_DESCRIPTOR, invoke: async () => NEVER() });
  return registry;
}
function rfDescriptors(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(RF_PREFIX));
}
function maskedRelease(source: string | undefined): string {
  return source === undefined ? "<none>" : source.replace(/^rf@[^:]+:/, "rf@<release>:");
}
function rfReadings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry).map(descriptor => `${descriptor.id}|${descriptor.effectClass}|${maskedRelease(descriptor.contractSource)}`);
}
function explainFindings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry)
    .filter(descriptor => [descriptor.id, descriptor.description, descriptor.contractSource ?? ""].some(field => LEAF_PATTERN.test(field)))
    .map(descriptor => descriptor.id);
}
/** G1's admission of a capture's identity. The carrier records a release and no build, so the commit is not compared: a capture
 * at another build of the same release is admitted (R-SAME-RELEASE-REBUILD, pinned by Q2). */
function carrierAdmits(identity: { readonly release: string; readonly commit: string }): boolean {
  return identity.release === recordedRfRelease();
}

// ---- the bead's own text ----

interface ExportRow {
  readonly description: string;
  readonly fields: Readonly<Record<string, unknown>>;
}
function exportRow(): ExportRow {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.description === "string") return { description: row.description, fields: row };
  }
  return { description: "", fields: {} };
}
function headWord(head: string): string {
  return head.trim().replace(/:$/, "");
}
/** The read heads whose exact head string, or whose word in any case anywhere in the text, does not occur exactly once. */
function repeatedHeads(description: string): string[] {
  return Object.values(HEADS)
    .filter(head => description.split(head).length !== 2 || (description.match(new RegExp(`\\b${headWord(head)}\\b`, "gi")) ?? []).length !== 1)
    .map(headWord);
}
/** Each "\n\n"-separated paragraph's head: its leading upper-case word before the paragraph's first ": ", else <none>. */
function paragraphHeads(description: string): string[] {
  return description.split("\n\n").map(paragraph => /^([A-Z][A-Z_-]+)\b[^:\n]*: /.exec(paragraph)?.[1] ?? "<none>");
}
/** The specification fields a row carries with content. */
function presentFields(fields: Readonly<Record<string, unknown>>): string[] {
  return FILING_FIELDS.filter(field => Object.hasOwn(fields, field) && fields[field] !== "" && fields[field] !== null);
}
function filingReading(row: ExportRow): JsonValue {
  return json({
    heads: paragraphHeads(row.description),
    repeated: repeatedHeads(row.description),
    plants: Object.fromEntries(Object.entries(HEAD_PLANTS).map(([name, plant]) => [name, repeatedHeads(`${row.description}${plant}`)])),
    fields: presentFields(row.fields),
    planted: presentFields({ ...row.fields, ...FIELD_PLANT }),
  });
}
/** One section of the description, read only when every read head occurs once in this same text. */
function section(description: string, head: string, tail: string): string {
  const repeated = repeatedHeads(description);
  if (repeated.length > 0) throw new Error(`${BEAD}'s description repeats a read section head (${repeated.join(", ")}); no section is read from it`);
  const start = description.indexOf(head);
  const end = start === -1 ? -1 : description.indexOf(tail, start + head.length);
  return end === -1 ? "" : description.slice(start + head.length, end);
}
/** The ACCEPTANCE list's items (the filing writes it as a list literal whose items may be quoted either way). */
function acceptanceItems(list: string): string[] {
  if (!/^\[["']/.test(list) || !/["']\]$/.test(list)) return [];
  return list.slice(2, -2).split(/["'], ["'](?=On landing: )/);
}
function tiled(rows: readonly Row[]): string {
  return TILES.map((tile, index) => `${tile === "PENDING" ? PENDING : (rows.find(row => row.id === tile)?.label ?? `<no row ${tile}>`)}${SEPARATORS[index] ?? ""}`).join("");
}

// ---- the cases ----

const REACHED: string[] = [];
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  G1: async () => {
    const carrier = recordedRfRelease();
    expect(
      carrierAdmits(CAPTURE),
      `the gating state was captured at rf ${CAPTURE.release} but the carrier records ${carrier}: re-measure it at ${carrier} (capture.remeasure) and re-capture the roster`,
    ).toBe(true);
    expect(CAPTURE.commit, "the capture names its build by a full commit sha").toMatch(/^[0-9a-f]{40}$/);
    return json({
      carrier,
      release: CAPTURE.release,
      build: CAPTURE.commit,
      mismatch: CAPTURE.mismatch,
      leaf: `${CAPTURE.leaf.path}|${CAPTURE.leaf.served}|${CAPTURE.leaf.availability}`,
      shipped: {
        commit: CAPTURE.shipped.commit,
        subject: CAPTURE.shipped.subject,
        names: [`[PMO-05b]`, FLAG].map(word => CAPTURE.shipped.subject.includes(word)),
        inBuild: CAPTURE.shipped.inBuild,
        prior: CAPTURE.shipped.prior,
        inPrior: CAPTURE.shipped.inPrior,
      },
    });
  },
  G2: async () => {
    const options = [...CAPTURE.usage.matchAll(/\[(--?[A-Za-z][\w-]*)/g)].map(match => match[1] ?? "");
    expect(options, `rf ${LEAF.split(".").join(" ")} takes ${FLAG} at the recorded build`).toContain(FLAG);
    const { flagged, unflagged } = CAPTURE.bounded;
    expect(flagged.keys, `under ${FLAG} the result adds both filing fields after the required members`).toEqual([...CAPTURE.required, ...FIELDS]);
    expect(unflagged.keys, "without the flag the result is the required members alone").toEqual([...CAPTURE.required]);
    const emitted = (run: ExplainRun): string[] => FIELDS.filter(field => run.keys.includes(field));
    return json({
      usage: CAPTURE.usage.startsWith(`usage: rf ${LEAF.split(".").join(" ")} `),
      options,
      probe: {
        flag: CAPTURE.probe.argv.includes(FLAG),
        exit: CAPTURE.probe.exit,
        ok: CAPTURE.probe.ok,
        command: CAPTURE.probe.command,
        codes: CAPTURE.probe.codes,
        unknown: CAPTURE.probe.unknown,
      },
      bounded: {
        flagged: { flag: flagged.argv.includes(FLAG), exit: flagged.exit, ok: flagged.ok, command: flagged.command, emitted: emitted(flagged), truncated: flagged.truncated, pathLimit: flagged.pathLimit },
        unflagged: { flag: unflagged.argv.includes(FLAG), exit: unflagged.exit, ok: unflagged.ok, command: unflagged.command, emitted: emitted(unflagged) },
      },
    });
  },
  G3: async () => {
    const members = FIELDS.filter(field => CAPTURE.members.includes(field));
    const required = FIELDS.filter(field => CAPTURE.required.includes(field));
    const atPin = FIELDS.filter(field => CAPTURE.pin.members.includes(field) || CAPTURE.pin.required.includes(field));
    expect(members, "both filing fields are result members at the recorded build").toEqual([...FIELDS]);
    expect(required, "neither is required there: both are emitted only under the flag").toEqual([]);
    expect(atPin, "neither is a member or a required name at the cited pin, as the filing says").toEqual([]);
    const [opening, closing] = CAPTURE.pin.lines;
    return json({
      schema: CAPTURE.schema,
      release: { members: CAPTURE.members, required: CAPTURE.required },
      pin: { rfcli: CAPTURE.pin.rfcli, members: CAPTURE.pin.members, required: CAPTURE.pin.required },
      revision: [CAPTURE.members, CAPTURE.required, CAPTURE.pin.members, CAPTURE.pin.required].map(list => list.includes(REVISION_MEMBER)),
      fields: { members, required, atPin },
      span: opening !== undefined && closing !== undefined && closing - opening - 1 === CAPTURE.pin.required.length,
    });
  },
  W1: async () => {
    const modules = srcModules();
    const scans = modules.map(module => ({ module: module.name, scan: scanSpawns(module.name, module.source) }));
    const importers = scans.filter(entry => entry.scan.imports).map(entry => entry.module);
    const sites = scans.flatMap(entry => entry.scan.sites.map(site => ({ module: entry.module, site })));
    return json({
      agree: JSON.stringify(importers) === JSON.stringify(sharedImporters(modules)),
      importers,
      sites: sites.map(({ module, site }) => `${module}|${site.kind}|${site.scope}|${site.callee}|${site.binary}|${site.shell}`),
      rf: sites.filter(entry => entry.site.kind === "rf").map(entry => `${entry.module}|${entry.site.scope}|${entry.site.callee}`),
      escapes: scans.flatMap(entry => entry.scan.escapes.map(found => `${entry.module}|${found}`)),
      unbound: scans.filter(entry => entry.scan.loads && !entry.scan.imports).map(entry => entry.module),
      unwalked: filesBelow(join(REPO, "src"))
        .filter(file => UNWALKED_MODULE.test(file))
        .map(file => relative(REPO, file).split("\\").join("/")),
      unwalkedControls: Object.fromEntries(UNWALKED_CONTROLS.map(name => [name, UNWALKED_MODULE.test(name)])),
      controls: Object.fromEntries(Object.entries(SPAWN_CONTROLS).map(([name, body]) => [name, scanReading(scanSpawns(`${name}.ts`, body))])),
    });
  },
  W2: async () => {
    const source = readFileSync(join(REPO, PROVIDER_FILE), "utf8");
    const file = parse(PROVIDER_FILE, source);
    const rf = scanSpawns(PROVIDER_FILE, source).sites.filter(site => site.kind === "rf");
    expect(rf, "the provider holds one rf spawn").toHaveLength(1);
    const argument = rf[0]?.call.arguments[1];
    let initializer = "<unread>";
    let arrays: string[] = [];
    let verb = "<unread>";
    const visit = (node: ts.Node): void => {
      if (argument !== undefined && ts.isIdentifier(argument) && ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === argument.text && scopeOf(node) === rf[0]?.scope) {
        initializer = node.initializer === undefined ? "<none>" : node.initializer.getText(file);
      }
      if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
        const found: string[] = [];
        const collect = (inner: ts.Node): void => {
          if (ts.isArrayLiteralExpression(inner)) found.push(arrayWords(inner).join(" "));
          if (ts.isReturnStatement(inner) && inner.expression !== undefined && ts.isArrayLiteralExpression(inner.expression)) verb = optionElided(arrayWords(inner.expression));
          ts.forEachChild(inner, collect);
        };
        collect(node);
        arrays = found;
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
    return json({ argument: argument === undefined ? "<none>" : argument.getText(file), initializer, arrays, verb });
  },
  W3: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, number> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, leafHits(`${name}.ts`, body).length]));
    return json({
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => leafHits(module.name, module.source).map(hit => `${module.name}:${hit}`)),
      caught: read(LEAF_CAUGHT),
      quiet: read(LEAF_QUIET),
    });
  },
  U1: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, string[]> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, nameHits(body)]));
    return json({
      needles: NEEDLES,
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => nameHits(module.source).map(needle => `${module.name}|${needle}`)),
      caught: read(NAME_CAUGHT),
      quiet: read(NAME_QUIET),
    });
  },
  U2: async () => {
    const registry = await nativeRegistry();
    const injected = injectedRegistry();
    return json({
      native: rfReadings(registry),
      injected: rfReadings(injected),
      explain: [...explainFindings(registry), ...explainFindings(injected)],
      planted: explainFindings(plantedRegistry()),
    });
  },
  U3: async () => {
    const modules = srcModules();
    const structures = modules.map(module => ({ module: module.name, structure: sourceStructure(REPO, module.name) }));
    const manifest = object(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")), "package.json");
    const maps = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].map(key => (isObject(manifest[key]) ? manifest[key] : {}));
    const entries = maps.flatMap(map => Object.entries(map).map(([name, spec]) => [name, String(spec)] as const));
    return json({
      floor: modules.length >= SRC_FLOOR,
      unread: structures.filter(entry => !entry.structure.ok).map(entry => entry.module),
      imports: structures.flatMap(entry => entry.structure.imports.filter(found => rfPackage(found.module)).map(found => `${entry.module}|${found.kind}|${found.module}`)),
      manifest: entries.length > 0 && typeof manifest.name === "string",
      packages: [String(manifest.name), ...entries.map(([name]) => name)].filter(rfPackage),
      specs: entries.filter(([, spec]) => rfSpec(spec)).map(([name, spec]) => `${name}|${spec}`),
      missed: [...PACKAGE_CAUGHT.filter(name => !rfPackage(name)), ...SPEC_CAUGHT.filter(spec => !rfSpec(spec))],
      quiet: [...PACKAGE_QUIET.filter(rfPackage), ...SPEC_QUIET.filter(rfSpec)],
    });
  },
  Q1: async () => json(Object.fromEntries(Object.entries(COMPOSED_PROBES).map(([name, body]) => [name, leafHits(`${name}.ts`, body)]))),
  Q2: async () => {
    const admitted = (commit: string): boolean => carrierAdmits({ release: CAPTURE.release, commit });
    return json({
      carrier: maskedRelease(rfDescriptors(injectedRegistry())[0]?.contractSource),
      release: recordedRfRelease(),
      capture: { build: CAPTURE.commit, admitted: admitted(CAPTURE.commit) },
      prior: { build: CAPTURE.shipped.prior, admitted: admitted(CAPTURE.shipped.prior) },
    });
  },
  Q3: async () => {
    const roots = [...new Set(srcModules().map(module => module.name.split("/")[0] ?? ""))];
    return json({ roots, scan: scanReading(scanSpawns("local-provider.ts", LOCAL_PROVIDER)), leafHits: leafHits("local-provider.ts", LOCAL_PROVIDER) });
  },
  Q4: async () => {
    const word = new RegExp(`(?<![A-Za-z0-9_])${EXCLUDED_FIELDS[0] ?? "<none>"}(?![A-Za-z0-9_])`);
    return json({
      excluded: EXCLUDED_FIELDS,
      needle: NEEDLES.some(needle => EXCLUDED_FIELDS.includes(needle)),
      probe: nameHits(COMMON_WORD_PROBE),
      spelled: srcModules().filter(module => word.test(module.source)).length >= 1,
    });
  },
  Q5: async () =>
    json(Object.fromEntries(Object.entries(UNSEEN_LAUNCHES).map(([name, body]) => [name, { scan: scanReading(scanSpawns(`${name}.ts`, body)), leafHits: leafHits(`${name}.ts`, body) }]))),
};

describe("wb-2j3.10 rf graph explain truncation census (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, standing leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the filing's sections (each read head once), its STATEMENT and ACCEPTANCE, and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["G:3", "W:3", "U:3", "Q:5"]);
    const judged = ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }));
    const rosterRows = ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) }));
    expect(judged).toStrictEqual(rosterRows);
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const constants = json({
      leaf: LEAF,
      flag: FLAG,
      fields: FIELDS,
      excluded: EXCLUDED_FIELDS,
      revision: REVISION_MEMBER,
      citedPin: CITED_PIN,
      pending: PENDING,
      pendingAcceptance: PENDING_ACCEPTANCE,
      tiles: TILES,
      separators: SEPARATORS,
      heads: HEADS,
      headPlants: HEAD_PLANTS,
      filingFields: FILING_FIELDS,
      fieldPlant: FIELD_PLANT,
      srcFloor: SRC_FLOOR,
      calls: CHILD_PROCESS_CALLS,
      shellCalls: SHELL_CALLS,
      shellOptionCalls: SHELL_OPTION_CALLS,
      assignmentWord: ASSIGNMENT_WORD.source,
      unwalkedModule: UNWALKED_MODULE.source,
      unwalkedControls: UNWALKED_CONTROLS,
      valueOptions: RF_VALUE_OPTIONS,
      packageWords: RF_PACKAGE_WORDS,
      spawnControls: SPAWN_CONTROLS,
      leafCaught: LEAF_CAUGHT,
      leafQuiet: LEAF_QUIET,
      nameCaught: NAME_CAUGHT,
      nameQuiet: NAME_QUIET,
      planted: PLANTED_DESCRIPTOR,
      packageCaught: PACKAGE_CAUGHT,
      packageQuiet: PACKAGE_QUIET,
      specCaught: SPEC_CAUGHT,
      specQuiet: SPEC_QUIET,
      composed: COMPOSED_PROBES,
      localProvider: LOCAL_PROVIDER,
      commonWord: COMMON_WORD_PROBE,
      unseen: UNSEEN_LAUNCHES,
      residuals: RESIDUALS,
    });
    expect(constants).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const row = exportRow();
    const description = row.description;
    expect(description.length, `${BEAD}'s description was read from the tracker export`).toBeGreaterThan(0);
    expect(repeatedHeads(description), "each read section head occurs exactly once in the description, in the text sections are cut from").toEqual([]);
    const filing = filingReading(row);
    expect(filing).toStrictEqual(ROSTER.filing);
    const statement = section(description, HEADS.statement, HEADS.rationale);
    expect(statement, "the rows' labels and the PENDING clause tile the STATEMENT, in order, with its own separators").toBe(tiled(ROWS));
    expect(acceptanceItems(section(description, HEADS.acceptance, HEADS.surfaces)), "the ACCEPTANCE is exactly the two pending on-landing items").toStrictEqual([
      ...PENDING_ACCEPTANCE,
    ]);
    const spelled = /shipping rf (\w+) (\w+) (--[a-z-]+) with (\w+)\/(\w+) fields \(absent from \1\.\2\.schema\.json:(\d+)-(\d+)@([0-9a-f]+)\)/.exec(statement);
    expect(spelled?.slice(1), "the STATEMENT spells the leaf, the flag, the two fields and the cited lines at the pin").toStrictEqual([
      ...LEAF.split("."),
      FLAG,
      ...FIELDS,
      ...CITED_PIN.lines.map(String),
      CITED_PIN.rfcli,
    ]);
    expect({ rfcli: CAPTURE.pin.rfcli, lines: [...CAPTURE.pin.lines] }, "the capture read the pin and the lines the STATEMENT cites").toStrictEqual({
      rfcli: CITED_PIN.rfcli,
      lines: [...CITED_PIN.lines],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    // every registered test of this file (vitest task tree), exactly and in roster order
    expect(titles).toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
