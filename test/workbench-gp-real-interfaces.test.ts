/**
 * wb-1xvp.2 (RF-GRAPH-POLICY-MACHINE-CONTROL-R1): Pi reaches GraphPolicyCLI only through its real interfaces and adds no
 * policy capability of its own. A standing census over every src module and package.json, judged by the four rules of
 * docs/workbench/03-architecture-and-ownership.md section "GraphPolicyCLI boundary" (GP-1..GP-4, one pin per clause).
 *
 * The obligation (bead wb-1xvp.2, owner filing program-triage-2026-10-22): "Pi shall reach GraphPolicyCLI only through
 * its real interfaces (gp CLI, SDK or rpc --stdio) and add no policy capability of its own: no re-implemented gp scoring,
 * sampling, embedding or receipts (a missing verb is extended in GraphPolicyCLI), no unrelated dependency, no new kill or
 * store-mutation path (recovery only via existing Furnace lifecycle boundaries), no training backend on a decision path,
 * and training, inference, telemetry, admission and execution in separate modules". Source line:
 * ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:79@6a251bf73af5 "Do not copy
 * GraphPolicyCLI's numerical implementation into the machine. Establish a supported integration through the real CLI,
 * SDK, or RPC interfaces." Merged pins at the same sha: :71 (GraphPolicyCLI owns graph-function representations,
 * numerical evaluation, learned scores, embeddings, predictions, policy distributions, and associated receipts), :81 (no
 * unrelated ecosystem dependencies), :232 (preemption, cancellation and recovery through existing lifecycle boundaries),
 * :460 (no fresh heavyweight training backend per decision), :486 (training, runtime inference, telemetry, host admission
 * and machine execution kept separate), :496 (extend GraphPolicyCLI rather than duplicating its internals).
 * The bead's acceptance legs map one row each: (a) GP-1, (b) GP-2, (c) GP-3, (d) GP-4.
 *
 * Today Pi carries no gp code. R0 pins the measured gp roster of the live tree empty and GP_SEAMS (this census's register
 * of gp client and admission modules) empty, and judges the live tree clean. A gp landing registers each seam module in
 * GP_SEAMS, and updates the docs/03 ownership row, in the same commit; the GP-1..GP-4 checks judge it from then on. Until
 * then most checks hold vacuously on the live tree, so the F rows prove every pin live on a synthetic tree: a compliant
 * integration (a client that launches gp and maps the unknown-command refusal, a decision module that proposes through
 * the existing lifecycle module, an admission seam, the telemetry writer) judges clean, and each single-clause mutation
 * of it is named by exactly the expected pin(s).
 *
 * Producer facts measured 2026-10-22 against the installed gp 0.1.0: the npm package is graph-policy-cli (bin gp, no
 * exports map); an unknown command answers with the graphpolicy.cli.v1 envelope error.code GP_CLI_UNKNOWN_COMMAND; the
 * command surface lists train beside eval, sample and rpc --stdio.
 *
 * WHAT THE CENSUS CLAIMS (respin #1, gate refusal #1 U6). Code tokens only: every module is read from its TypeScript AST,
 * never from its comments. The census claims exactly the detector members DETECTORS enumerates - one DT row each, which
 * runs its probe module and pins the exact census signature the member must produce - and the manifest rosters the M rows
 * pin member by member; a code shape outside that enumeration is not claimed. Its measured blind spots are NAMED
 * RESIDUALS (RESIDUALS below, listed in the docs section), each a named family with a pinned quiet row; the list records
 * the escapes measured on these bytes and is not claimed complete.
 *
 * THE DOCS ANCHOR (U1-U4). The D rows read docs/03 only through the landed helper test/helpers/census.ts: docsSection
 * binds the rendered "GraphPolicyCLI boundary" section (its level-2 heading exactly once in the rendered view, under the
 * page title as its whole parent heading path, up to the next level-1/2 heading), sectionMatches pins its WHOLE rendered
 * block list - the definitions paragraph, the four rule bullets built from ROWS and the residual line built from
 * RESIDUALS - and refuses any HTML in it, and the ownership row is read from the "Ownership boundaries" section's own
 * table through sectionTables (the same binding), never from a whole-page line filter.
 *
 * EACH-LIVENESS (U5, standing rule 16). REGISTERED freezes, literally and outside every derivation, the case keys each
 * it.each table registers; the closing tally reads vitest's own task tree, so a table thinned or emptied at its it.each
 * call goes red, and every registered case records that it reached its last assertion.
 *
 * THE OUT-OF-FILE ROSTER (the CT5/CT6 kill outside this file's literals, the wb-1xvp.4 roster pattern):
 * test/fixtures/gp-real-interfaces-roster.json lists every rule row, pin, clause and falsifier (with its expected findings),
 * every residual, every detector member with the SHA-256 of its probe, and every registered case title in order; the S
 * roster row holds the tables to it and the closing tally holds vitest's registrations to it, so removing a member from
 * every literal of this file still reds through the roster (docs/03 is the second outside anchor, for rules and residuals).
 *
 * THE wb-1ho6 FOLLOW-UP (R694 of landing 267; gate of record cmd_18b21dfd4dbc composing machine gate cmd_6276bcef3f4a,
 * PREP findings F1-F5). F1: a bd read verb is judged with its flags in view. BD_WRITING_FLAGS lists the flags with which
 * bd 1.1.0-rc.1's own help says a read verb writes (ready --claim claims; doctor --fix and --fix-child-parent repair;
 * doctor --clean deletes), so gate escapes G1 (bd ready --claim) and G2 (bd doctor --fix --yes) are bd writes (DT
 * bd-writing-flags and two d2 F rows); a flag that is not a literal stays a read (residual COMPUTED-BD-FLAG). F2: one F
 * row per judge arm the gate found unfalsified - DMG38 (a client reaching gp through the package alone, a fixed F row),
 * DMG39-DMG41 and DMG43 (a1 and a4 arms) and DMG42 (the a3 train-token arm). F3: the ownership table gives the
 * GraphPolicyCLI concern exactly one row - a second row naming any of its terms reds (gate LDG4). F4: the shell grammar
 * the gate escaped through is read - subshells and $( ) or backtick substitutions (G3, G6), reserved words (G4), the exec
 * builtin (G5), env with options (G7) and .exe or .cmd binaries (G8) - and the adjacent shapes measured quiet are named
 * residuals (QUOTED-SUBSTITUTION, SHELL-BUILTIN-WRAPPER). F5: a DT probe for each detector arm the gate found unprobed
 * (DMG1-DMG4, DMG8, DMG15, DMG16, DMG25, DMG49), and DMG50, a judge arm, by an a1 F row.
 *
 * THE wb-nh0t FOLLOW-UP (R694 of landing 361; gate of record cmd_9700cae0b883, PREP F1 leads, F2 rides). F1: the
 * concern's term list is held complete, not only contained. CONCERN_TERMS equals the items docs/03's concern cell lists
 * (concernTermsOf, read from the ownership row GraphPolicyCLI owns: an anchor outside this file), and every term has its
 * own in-memory falsifier (CONCERN_PLANTS: a second ownership row naming that term alone is the row the concern check
 * names), so gate mutant M16 (a term dropped from the list) and D3 (M16 plus a second Embeddings row) red. F2: the d2
 * shapes the gate measured quiet are one class-level named residual, MISREAD-COMMAND-WORD. Its quiet row plants every
 * measured member - a leading redirection (P06, P07), the time, coproc and function keywords (P05, P32, P08), the BD.EXE
 * and bd.bat spellings (P11, P12) and a value-taking bd global flag whose value is a read verb (P17) - and pins each
 * member's frozen reading beside a paired control one change away that the census does read as a bd write; the closing
 * tally holds the members read to the out-of-file roster.
 *
 * THE wb-yxkq FOLLOW-UP (R694 of landing 456; gate of record cmd_ffe6aadbb818, PREP F1 leads, F2 rides). F1: the
 * class-level members are read back from docs/03, family to member as well as member to family. familyShapesOf reads the
 * shapes a residual's family enumerates in the rendered residual line by the family's own grammar (after its first colon,
 * groups opened by an article, each naming its shapes after its last "such as", "spelled" or "as in", or between "the" and
 * its closing noun), and a D row holds every residual's shapes to its members: each shape names exactly one member by its
 * named words, in the family's order, and a single-shape family enumerates none. So gate G1 and G1b (one member dropped
 * from MISREAD_MEMBERS, from the S member literal and from the roster) red through docs/03, which still names the shape.
 * F2: the paired control is enforced, not only authored. The Q row holds each control to differ from its statement, to be
 * read as a bd write by the census itself whatever controlWrites pins, and to be one change away from its statement
 * (oneChangeAway over statementWordsOf, a reading of the two calls made without the census's own: one run of at most two
 * words dropped, respelled or rejoined into at most one word, or one word moved), so gate G2 (a control set to its own
 * statement, controlWrites []) and G2b (a control swapped to an unrelated bd write) red. Both checks are proved live in
 * memory: the D row plants each kind of disagreement (G1 and G1b among them) into the members or the docs line, and an F
 * row holds familyShapesOf, namesShape, statementWordsOf, oneChangeAway and pairingProblems to probes, one or more per branch.
 *
 * THE wb-mpmm FOLLOW-UP (R694 of landing 559; gate of record cmd_732dc954f2ae, PREP F1 leads). F1: a member's named words
 * are tied to the statement it measures. A D row reads each shape the residual line maps to exactly one member (by its
 * named words, as above) against that member's own statement: the statement's launch - its words after the callee as
 * statementWordsOf reads them - must begin with the shape (launchBeginsWith), and no two members' statements may read as
 * the same words. So gate L2c (P32 given P05's statement, reads, control and controlWrites), L2h (P32 given a nohup
 * statement docs/03 never names, with a coherent reading and control) and L2b (P11 and P12 trading named words and table
 * places), each made coherently in every literal of this census and in the roster, red through docs/03, which still names
 * coproc, BD.EXE and bd.bat. The bead's cure option read the shape anywhere in the statement's words; the launch must open
 * with it because a shape carried behind another word survives that reading - P32 given nohup coproc bd close wb-example
 * (quiet: the census reads nohup as the binary) pairs with bd close wb-example and leaves P32's quiet reading to nohup
 * (measured at this cut). The D row plants each escape and each other kind of disagreement in memory, and an F row holds
 * launchBeginsWith to probes.
 *
 * THE wb-zj42 FOLLOW-UP (R694 of landing 618; gate of record cmd_ab1200afa74b, PREP F1 leads). F1: a member's control
 * differs from its statement in the shape's run alone, and a shape that carries no bd binary of its own, the function
 * keyword excepted, is followed by bd. A D row reads each shape the residual line maps to exactly one member (by its named
 * words, as above) against that member's pairing. shapeRunTied: statement and control call the same launcher, the
 * statement's launch opens with the shape's run, and the words after the run (the tail) stay word for word at the end of
 * the control's launch, which spells the run dropped, changed by one change (oneChangeAway) into the words ahead of the
 * tail, moved behind the tail when the run is one word, or, for the function keyword, rejoined with the name it defines
 * (function f as f()). followedByBd: the word after the shape's run is bd, exactly; a shape whose first word is bd in any
 * letter case, alone or with one dotted suffix (BD.EXE, bd.bat, bd --actor doctor close), carries its binary and is not
 * read, nor is the function keyword, whose name is held by the rejoin. So gate G1-G6 (P05, P32, P06 and P07 each given a
 * second word - coproc, time or nohup - behind its shape, the control one dropped run away), each made coherently in every
 * literal of this census and in the roster, red through docs/03, which still names each shape; so do a read verb behind a
 * binary spelling that the control's respelling drops (BD.EXE list close, paired with bd.exe close: shapeRunTied alone
 * refuses it) and an option a respelled control word consumes (coproc -a x bd close, paired with exec -a x bd close:
 * followedByBd alone refuses it). The D row plants each escape and each other kind of disagreement in memory, and an F row
 * holds shapeRunTied and followedByBd to probes, one or more per branch. Not read: whether a statement is a bd write a
 * shell would run. followedByBd also refuses a word the census reads through (>/dev/null ! bd close), stricter than the
 * census; no member has that form.
 *
 * Display paths added: none. No scratch directory is allocated: the synthetic trees live in memory.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { builtinModules } from "node:module";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { docsSection, type RenderedBlock, sectionMatches, sectionTables } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_03 = "docs/workbench/03-architecture-and-ownership.md";
const CENSUS_FILE = "test/workbench-gp-real-interfaces.test.ts";
/** docs/03's level-1 title: the whole parent heading path of both pinned sections, so a level-1 heading above re-homes them. */
const PAGE_TITLE = "03 — High-level architecture, module ownership and dataflow";
const BOUNDARY_HEADING = "GraphPolicyCLI boundary";
const OWNERSHIP_HEADING = "Ownership boundaries";
/** The ownership table's header row, cell for cell as sectionTables reads it. */
const OWNERSHIP_HEADER: readonly string[] = ["Concern", "Authoritative owner", "Workbench may do"];
/** The docs/03 "Ownership boundaries" row naming GraphPolicyCLI, cell for cell (cell source): a gp landing updates it with GP_SEAMS. */
const OWNERSHIP_CELLS: readonly string[] = [
  "Graph-function representations, numerical evaluation, learned scores, embeddings, predictions, policy distributions and their receipts",
  "GraphPolicyCLI",
  "nothing today (no gp seam is registered); a future seam reaches gp only through its CLI, SDK or `gp rpc --stdio`, under the GraphPolicyCLI boundary below",
];
/**
 * The pinned concern's own terms: a table row naming any of them speaks for that concern, so only the pinned row may (wb-1ho6
 * F3). Held complete against docs/03's concern cell (concernTermsOf) and each falsified by its CONCERN_PLANTS row (wb-nh0t F1).
 */
const CONCERN_TERMS: readonly string[] = ["graph-function representation", "numerical evaluation", "learned score", "embedding", "prediction", "policy distribution"];
/**
 * The concern's terms as docs/03's concern cell lists them: its comma-separated items, lower-cased, each without its plural
 * s. The closing "and their receipts" clause is dropped: it names the receipts of the listed items, not an item of its own.
 */
const concernTermsOf = (cell: string): string[] =>
  cell
    .toLowerCase()
    .replace(/ and their receipts$/, "")
    .split(", ")
    .map(item => item.replace(/s$/, ""));
/**
 * One in-memory falsifier per concern term (wb-nh0t F1, gate D2): the concern cell of a second ownership row that names that
 * term alone and gives it to Workbench. Held to docs/03's concern items term for term, so a plant dropped with its term reds.
 */
const CONCERN_PLANTS: readonly { readonly term: string; readonly concern: string }[] = [
  { term: "graph-function representation", concern: "Graph-function representations of workflow routes" },
  { term: "numerical evaluation", concern: "Numerical evaluation of workflow graphs" },
  { term: "learned score", concern: "Learned scores for workflow ranking" },
  { term: "embedding", concern: "Embeddings for workflow ranking" },
  { term: "prediction", concern: "Predictions of workflow outcomes" },
  { term: "policy distribution", concern: "Policy distributions over workflow actions" },
];
/** The re-assigning row each plant adds: Workbench as the owner, a local computation as what Workbench may do. */
const PLANT_CELLS = (concern: string): string[] => [concern, "Workbench", "compute and cache locally"];
/** A table cell naming GraphPolicyCLI or gp: exactly one ownership row may carry one, the pinned row. */
const NAMES_GP = /GraphPolicyCLI|graph[-_ ]?policy|\bgp\b/i;
/** The boundary section's definitions paragraph, verbatim (it carries the bead, its source line and this census's path). */
const BOUNDARY_INTRO =
  "Pi carries no GraphPolicyCLI (gp) integration today. Program obligation RF-GRAPH-POLICY-MACHINE-CONTROL-R1 (bead wb-1xvp.2; ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:79@6a251bf73af5) binds any future gp seam to the four rules below, and test/workbench-gp-real-interfaces.test.ts judges every src module and package.json by them, one check per semicolon-separated clause. A gp client is a src module the census registers as one (none today); a gp-adjacent module is a gp client or a module that imports one; a decision path is a gp client and its src import closure; an execution seam is a module that itself calls process.kill, stops a Furnace Run or Attempt, writes through bd, starts a Claude agent session or launches a workflow host. A cancel, retry or reassign proposal therefore reaches the existing lifecycle functions, which stay outside every gp seam, and a missing gp verb is added to GraphPolicyCLI itself, never re-implemented here. The census reads code tokens, never comments, and claims only the detector shapes it pins with a live probe each; its measured blind spots are the named residuals below, a list it does not claim complete.";
const CITATIONS: readonly string[] = ["wb-1xvp.2", "RF-GRAPH-POLICY-MACHINE-CONTROL-R1", "README.md:79@6a251bf73af5", CENSUS_FILE];
/** The out-of-file roster: this census's tables and registrations as frozen data (see the header). */
const ROSTER = "test/fixtures/gp-real-interfaces-roster.json";

/** The one GraphPolicyCLI package (measured: the installed gp 0.1.0 is npm graph-policy-cli, bin gp). */
const GP_PACKAGE = "graph-policy-cli";
/** Pi's telemetry writer: createTelemetryEmitter / emitOperationsTelemetry deliver to a TelemetrySink. */
const TELEMETRY_WRITERS: readonly string[] = ["src/workbench/telemetry.ts"];
const MANIFEST = "package.json";

type SeamRole = "client" | "admission";
interface GpSeam {
  readonly file: string;
  readonly role: SeamRole;
}

/** The gp seams this census admits, by role. EMPTY at this cut (frozen in R0): Pi carries no gp integration. */
const GP_SEAMS: readonly GpSeam[] = [];

const SOURCE_EXTENSIONS = new Set([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs"]);
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
/** child_process launchers, by name or member (ServerConnection.spawn, cp.execFile) and through the bindings a module gives them. */
const LAUNCHERS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
/** Launchers that take one shell command line: it is split into its simple commands (shellCommands). */
const SHELL_LAUNCHERS = new Set(["exec", "execSync"]);
/** Shells whose -c script is itself a command line the census splits (sh -c 'bd close wb-x'). */
const SHELLS = new Set(["sh", "bash", "zsh", "dash", "ksh"]);
/** Binaries an argv array may name first when it is handed to an injected launch seam. */
const ARGV_BINARIES = new Set(["gp", "bd", "furnace", "kill", "pkill", "killall", ...SHELLS]);
const KILL_BINARIES = new Set(["kill", "pkill", "killall"]);
/**
 * bd verbs that read unless a writing flag (BD_WRITING_FLAGS) is given; any other bd launch is a write, a launch whose
 * verb is not a literal included. The verb is the launch's first lowercase word, so leading flags are skipped.
 */
const BD_READ_VERBS = new Set(["show", "list", "ready", "blocked", "search", "stats", "status", "count", "info", "where", "version", "help", "graph", "doctor"]);
/**
 * The flags with which a bd read verb writes, read from bd 1.1.0-rc.1's own help (wb-1ho6 F1): ready --claim ("Atomically
 * claim the first ready issue matching the filters"), doctor --fix ("Automatically fix issues where possible"), doctor
 * --fix-child-parent (it removes child-to-parent dependencies) and doctor --clean ("For pollution check: delete detected
 * test issues"). Each counts bare or in --flag=value form, anywhere in the argv; no other read verb's help lists a flag
 * that writes.
 */
const BD_WRITING_FLAGS: ReadonlyMap<string, readonly string[]> = new Map([
  ["ready", ["--claim"]],
  ["doctor", ["--fix", "--fix-child-parent", "--clean"]],
]);
/** The modules whose bindings name the process object (a default or namespace import, import-equals, require). */
const PROCESS_MODULES = new Set(["process", "node:process"]);
const CHILD_PROCESS_MODULES = new Set(["child_process", "node:child_process"]);
const AGENT_SDK = "@anthropic-ai/claude-agent-sdk";
/** The Agent SDK functions that start or attach a Claude agent session (measured from its exported declarations). */
const AGENT_SESSION_FUNCTIONS = new Set(["query", "createCodeSession", "attachBridgeSession", "forkSession"]);
/** @furnace/sdk members whose stop() ends a Run, an Attempt, a Run's supervision or the supervisor host (client.d.ts Runs, Attempts, Supervision, Host). */
const FURNACE_STOP_OWNERS = new Set(["runs", "attempts", "supervision", "host"]);
/** A Furnace Run or Attempt handle by name (run, runHandle, activeRun, attempt, attemptRef): handle.stop() ends it. */
const FURNACE_HANDLE = /^(?:run|attempt)(?:[A-Z]\w*)?$|(?:Run|Attempt)$/;
/** A string token naming the gp binary: bare gp, or a path ending in it. */
const GP_BINARY = /^(?:.*[/\\])?gp(?:\.exe|\.cmd)?$/;
/** A specifier or package name of the GraphPolicyCLI family (graph-policy-cli, graphpolicy, @scope/graph_policy, ...). */
const GP_FAMILY = /graph[-_]?policy/i;
/** gp wire vocabulary in a code token: GraphDataIR, the graphpolicy.<surface>.v<n> schema ids, GP_CLI_* and GP_RPC_* codes. */
const GP_WORDS = /graph[-_]?data[-_]?ir|graphpolicy\.[a-z0-9_-]+\.v\d+|GP_(?:CLI|RPC)_[A-Z0-9_]+/i;
const UNKNOWN_COMMAND = "GP_CLI_UNKNOWN_COMMAND";
/** The gp training verb as a word inside a string token: "train", "train --program p", a template ending in " train". */
const TRAIN_WORD = /(?:^|[^A-Za-z0-9_])train(?:[^A-Za-z0-9_]|$)/;
/** Deny roster of JS training and model frameworks (one M-row probe per member); named residual TRAINING-FRAMEWORK-ROSTER covers the rest. */
const TRAINING_FRAMEWORKS =
  /(?:^|[/@-])(?:tensorflow|tfjs|onnxruntime|torch|pytorch|brain\.js|synaptic|ml5|keras|xgboost|lightgbm|catboost|scikit|sklearn|transformers|mlc-ai)(?:$|[/-])/i;
/** Every dependency section of the manifest: each is read for training frameworks and GraphPolicyCLI forks alike. */
const ALL_SECTIONS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies", "bundledDependencies", "bundleDependencies"] as const;
const BUILTINS: ReadonlySet<string> = new Set(builtinModules);
/** A shell variable assignment word (NAME=value) that prefixes the command it runs before. */
const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/;
/** A shell's -c flag, alone or in a cluster (-c, -lc, -ec): the next argument is the script the shell runs. */
const SHELL_C = /^-[A-Za-z]*c[A-Za-z]*$/;
/** Characters that end a simple command outside quotes: ; & | ( ) ` and newline (so && and ||, a subshell and a $( ) or backtick substitution too). */
const COMMAND_ENDS = new Set([";", "&", "|", "\n", "(", ")", "`"]);
/** Shell reserved words that open a command (if bd show ...; then bd close ...), skipped before it; the closing words run nothing. */
const RESERVED_WORDS = new Set(["!", "{", "}", "if", "then", "elif", "else", "fi", "do", "done", "while", "until", "esac"]);
/** env options that take the next word as their value (env -u NAME, env -C DIR); any other word starting with - is a flag. */
const ENV_VALUE_OPTIONS = new Set(["-u", "-C", "--unset", "--chdir"]);
/** The exec builtin's option that takes the next word as its value (exec -a NAME); -c and -l are flags. */
const EXEC_VALUE_OPTIONS = new Set(["-a"]);
/** How deep a shell's -c script is followed into a further shell's -c script. */
const SCRIPT_DEPTH = 4;

interface Hit {
  readonly line: number;
  readonly text: string;
}

interface Command {
  readonly binary: string;
  readonly argv: readonly string[];
}

interface Launch extends Command {
  readonly line: number;
}

/** One module's code tokens, read from its AST. */
interface ModuleCensus {
  readonly file: string;
  /** Every module specifier: import and export-from declarations, import-equals, import() and require() calls, import types. */
  readonly specifiers: readonly string[];
  /** The specifiers the module loads at run time: type-only declarations and import types excluded. */
  readonly runtimeImports: readonly string[];
  /** Every command a launcher call or a binary-first argv array runs, a shell line split into its simple commands, a shell's -c script followed. */
  readonly launches: readonly Launch[];
  /** String tokens naming the gp binary (module specifiers excluded). */
  readonly gpBinary: readonly Hit[];
  /** Launches of gp: the gp binary, or an argv naming the GraphPolicyCLI package (npx graph-policy-cli, node .../graph-policy-cli/dist/main.js). */
  readonly gpLaunches: readonly Hit[];
  /** import() and require() calls whose specifier is not a literal. */
  readonly dynamicLoads: readonly Hit[];
  /** Code tokens naming gp wire vocabulary (module specifiers excluded). */
  readonly gpVocabulary: readonly Hit[];
  /** Every code token of the GraphPolicyCLI name family, module specifiers and identifiers included (the R0 absence roster). */
  readonly gpFamily: readonly Hit[];
  /** String tokens carrying the train word (module specifiers excluded). */
  readonly trainTokens: readonly Hit[];
  readonly namesUnknownCommand: boolean;
  readonly processKill: readonly Hit[];
  readonly furnaceStop: readonly Hit[];
  readonly bdWrite: readonly Hit[];
  readonly agentSession: readonly Hit[];
  readonly hostLaunch: readonly Hit[];
}

const basenameOf = (path: string): string => path.split(/[/\\]/).pop() ?? path;
/** A launched binary's command name: its basename without a Windows .exe or .cmd suffix, so bd.exe runs bd (as GP_BINARY reads gp.exe). */
const commandName = (binary: string): string => basenameOf(binary).replace(/\.(?:exe|cmd)$/, "");

function scriptKind(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (/\.[cm]?js$/.test(file)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

const calleeName = (node: ts.Expression): string | undefined =>
  ts.isIdentifier(node) ? node.text : ts.isPropertyAccessExpression(node) ? node.name.text : undefined;

const literalText = (node: ts.Node | undefined): string | undefined => (node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined);

/** A destructuring element's or import's property name, when it is written as a plain name or a string. */
const nameOf = (node: ts.PropertyName | ts.BindingName): string | undefined => (ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined);

/** The value an expression wrapper leaves unchanged: parentheses, as / satisfies / angle-bracket assertions and !. */
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) {
    current = current.expression;
  }
  return current;
}

/** A command's words after its leading options: each word starting with -, and the next word too for a value option. */
function skipOptions(words: readonly string[], valueOptions: ReadonlySet<string>): readonly string[] {
  let rest = words;
  let word = rest[0];
  while (word?.startsWith("-")) {
    rest = rest.slice(valueOptions.has(word) ? 2 : 1);
    word = rest[0];
  }
  return rest;
}

/**
 * A shell command line as the simple commands a shell runs: split at unquoted ; & | ( ) ` and newlines (a subshell and a
 * $( ) or backtick substitution are commands of their own), single and double quotes removed, then per command its
 * leading prefix words skipped, to a fixpoint: NAME=value assignments, the reserved words that open a command, env (bare
 * or by path) with its options, and the exec builtin with its options. Nothing else a shell does is read: a substitution
 * inside double quotes stays quoted text (residual QUOTED-SUBSTITUTION), eval, command, builtin and env -S are not
 * unwrapped (residual SHELL-BUILTIN-WRAPPER), a wrapper program such as timeout is not unwrapped (residual
 * WRAPPED-COMMAND), and expansions and redirections are read as plain words.
 */
function shellCommands(line: string): Command[] {
  const commands: string[][] = [[]];
  let word: string | undefined;
  let quote: string | undefined;
  const endWord = (): void => {
    if (word !== undefined) commands[commands.length - 1]?.push(word);
    word = undefined;
  };
  for (const char of line) {
    if (quote !== undefined) {
      if (char === quote) quote = undefined;
      else word = `${word ?? ""}${char}`;
    } else if (char === "'" || char === '"') {
      quote = char;
      word ??= "";
    } else if (COMMAND_ENDS.has(char)) {
      endWord();
      commands.push([]);
    } else if (/\s/.test(char)) {
      endWord();
    } else {
      word = `${word ?? ""}${char}`;
    }
  }
  endWord();
  return commands.flatMap(words => {
    let rest: readonly string[] = words;
    for (let before = -1; before !== rest.length; ) {
      before = rest.length;
      while (rest[0] !== undefined && (ASSIGNMENT.test(rest[0]) || RESERVED_WORDS.has(rest[0]))) rest = rest.slice(1);
      if (rest[0] !== undefined && commandName(rest[0]) === "env") rest = skipOptions(rest.slice(1), ENV_VALUE_OPTIONS);
      else if (rest[0] === "exec") rest = skipOptions(rest.slice(1), EXEC_VALUE_OPTIONS);
    }
    const [binary, ...argv] = rest;
    return binary === undefined ? [] : [{ binary, argv }];
  });
}

/** A command and, when it is a shell running a -c script, the simple commands of that script, to SCRIPT_DEPTH. */
function withScripts(command: Command, depth = 0): Command[] {
  if (depth >= SCRIPT_DEPTH || !SHELLS.has(commandName(command.binary))) return [command];
  const flag = command.argv.findIndex(arg => SHELL_C.test(arg));
  const script = flag < 0 ? undefined : command.argv[flag + 1];
  return script === undefined ? [command] : [command, ...shellCommands(script).flatMap(inner => withScripts(inner, depth + 1))];
}

/** Reads one module's code tokens from its AST, never its comments. */
function moduleCensus(file: string, text: string): ModuleCensus {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const line = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const hit = (node: ts.Node, token: string): Hit => ({ line: line(node), text: token });
  // The names this module gives the values the detectors follow: same-file string constants, the process object (a
  // default, namespace or import-equals binding of the process module, a require of it, a variable initialized to one),
  // the Furnace stop owners and Run or Attempt handles (a variable initialized to one, a destructured owner), the
  // child_process launchers (a renamed import, a variable or destructured member) and the Agent SDK namespace. Collected
  // to a fixpoint before any detector reads them; a value reached any other way is not followed (ALIASED-EFFECT).
  const constants = new Map<string, string>();
  const processNames = new Set(["process"]);
  const stopOwnerNames = new Set<string>();
  const handleNames = new Set<string>();
  const launcherNames = new Map<string, string>();
  const sdkNamespaces = new Set<string>();
  const isProcessValue = (node: ts.Expression): boolean => {
    const value = unwrap(node);
    if (ts.isIdentifier(value)) return processNames.has(value.text);
    if (ts.isPropertyAccessExpression(value)) return value.name.text === "process";
    if (ts.isElementAccessExpression(value)) return literalText(value.argumentExpression) === "process";
    return ts.isCallExpression(value) && ts.isIdentifier(value.expression) && value.expression.text === "require" && PROCESS_MODULES.has(literalText(value.arguments[0]) ?? "");
  };
  const isStopOwner = (node: ts.Expression): boolean => {
    const value = unwrap(node);
    if (ts.isIdentifier(value)) return stopOwnerNames.has(value.text);
    if (ts.isPropertyAccessExpression(value)) return FURNACE_STOP_OWNERS.has(value.name.text);
    return ts.isElementAccessExpression(value) && FURNACE_STOP_OWNERS.has(literalText(value.argumentExpression) ?? "");
  };
  const isHandle = (node: ts.Expression): boolean => {
    const value = unwrap(node);
    return ts.isIdentifier(value) && (FURNACE_HANDLE.test(value.text) || handleNames.has(value.text));
  };
  const launcherOf = (node: ts.Expression): string | undefined => {
    const value = unwrap(node);
    if (ts.isIdentifier(value)) return launcherNames.get(value.text) ?? (LAUNCHERS.has(value.text) ? value.text : undefined);
    return ts.isPropertyAccessExpression(value) && LAUNCHERS.has(value.name.text) ? value.name.text : undefined;
  };
  const collectNames = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      const init = node.initializer;
      if (ts.isIdentifier(node.name)) {
        const name = node.name.text;
        if (ts.isStringLiteralLike(init)) constants.set(name, init.text);
        if (isProcessValue(init)) processNames.add(name);
        if (isStopOwner(init)) stopOwnerNames.add(name);
        if (isHandle(init)) handleNames.add(name);
        const launcher = launcherOf(init);
        if (launcher !== undefined) launcherNames.set(name, launcher);
      } else if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          const property = nameOf(element.propertyName ?? element.name);
          if (property === undefined || !ts.isIdentifier(element.name)) continue;
          if (FURNACE_STOP_OWNERS.has(property)) stopOwnerNames.add(element.name.text);
          if (LAUNCHERS.has(property)) launcherNames.set(element.name.text, property);
        }
      }
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.importClause !== undefined && node.importClause.phaseModifier !== ts.SyntaxKind.TypeKeyword) {
      const from = node.moduleSpecifier.text;
      const clause = node.importClause;
      const bindings = clause.namedBindings;
      const namespace = bindings !== undefined && ts.isNamespaceImport(bindings) ? bindings.name.text : undefined;
      if (PROCESS_MODULES.has(from) && clause.name !== undefined) processNames.add(clause.name.text);
      if (PROCESS_MODULES.has(from) && namespace !== undefined) processNames.add(namespace);
      if (from === AGENT_SDK && namespace !== undefined) sdkNamespaces.add(namespace);
      if (CHILD_PROCESS_MODULES.has(from) && bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (!element.isTypeOnly && LAUNCHERS.has(imported)) launcherNames.set(element.name.text, imported);
        }
      }
    }
    if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && PROCESS_MODULES.has(literalText(node.moduleReference.expression) ?? "")) {
      processNames.add(node.name.text);
    }
    ts.forEachChild(node, collectNames);
  };
  const known = (): number => constants.size + processNames.size + stopOwnerNames.size + handleNames.size + launcherNames.size + sdkNamespaces.size;
  for (let before = -1; before !== known(); ) {
    before = known();
    collectNames(sf);
  }
  const literalValue = (node: ts.Node | undefined): string | undefined => {
    if (node === undefined) return undefined;
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isIdentifier(node)) return constants.get(node.text);
    if (ts.isPropertyAccessExpression(node) && node.name.text === "execPath" && isProcessValue(node.expression)) return "<process.execPath>";
    return undefined;
  };
  /** A command-line value: a literal, or the static head of a template (`bd close ${id}` still names bd and close). */
  const commandText = (node: ts.Node | undefined): string | undefined => literalValue(node) ?? (node !== undefined && ts.isTemplateExpression(node) ? node.head.text : undefined);
  const argvOf = (elements: readonly ts.Expression[]): string[] =>
    elements.flatMap(element => {
      const value = commandText(element);
      return value === undefined ? [] : [value];
    });
  const specifiers: string[] = [];
  const runtimeImports: string[] = [];
  const launches: Launch[] = [];
  const gpBinary: Hit[] = [];
  const gpVocabulary: Hit[] = [];
  const gpFamily: Hit[] = [];
  const trainTokens: Hit[] = [];
  const processKill: Hit[] = [];
  const furnaceStop: Hit[] = [];
  const agentSession: Hit[] = [];
  const hostLaunch: Hit[] = [];
  const dynamicLoads: Hit[] = [];
  let namesUnknownCommand = false;
  const record = (node: ts.Node, commands: readonly Command[]): void => {
    for (const command of commands.flatMap(entry => withScripts(entry))) launches.push({ line: line(node), binary: command.binary, argv: command.argv });
  };
  /** Module specifier literals: judged by the specifier checks, never as binary, vocabulary or train tokens. */
  const specifierNodes = new Set<ts.Node>();
  const addSpecifier = (node: ts.StringLiteralLike, runtime: boolean): void => {
    specifierNodes.add(node);
    specifiers.push(node.text);
    if (runtime) runtimeImports.push(node.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const clause = node.importClause;
      addSpecifier(node.moduleSpecifier, clause?.phaseModifier !== ts.SyntaxKind.TypeKeyword);
      const bindings = clause !== undefined && clause.phaseModifier !== ts.SyntaxKind.TypeKeyword ? clause.namedBindings : undefined;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (element.isTypeOnly) continue;
          // The run-time binding of an Agent SDK session function is the agent-session seam, under any local name.
          if (from === AGENT_SDK && AGENT_SESSION_FUNCTIONS.has(imported)) agentSession.push(hit(element, element.getText(sf)));
          if (PROCESS_MODULES.has(from) && imported === "kill") processKill.push(hit(element, `import ${element.getText(sf)} from ${from}`));
        }
      }
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) addSpecifier(node.moduleSpecifier, !node.isTypeOnly);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      addSpecifier(node.moduleReference.expression, !node.isTypeOnly);
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) addSpecifier(node.argument.literal, false);
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const first = node.arguments[0];
      const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
      if (loads && first !== undefined && ts.isStringLiteralLike(first)) addSpecifier(first, true);
      else if (loads) dynamicLoads.push(hit(node, node.getText(sf)));
      const launcher = launcherOf(callee);
      if (launcher !== undefined && SHELL_LAUNCHERS.has(launcher)) {
        const command = commandText(first);
        if (command !== undefined) record(node, shellCommands(command));
      } else if (launcher !== undefined) {
        const binary = literalValue(first);
        const argvNode = node.arguments[1];
        const argv = argvNode !== undefined && ts.isArrayLiteralExpression(argvNode) ? argvOf(argvNode.elements) : [];
        // A binary with whitespace is a command line a shell runs (shell: true): split like one.
        if (binary !== undefined) record(node, /\s/.test(binary) ? shellCommands([binary, ...argv].join(" ")) : [{ binary, argv }]);
      }
    }
    if (ts.isPropertyAccessExpression(node) && AGENT_SESSION_FUNCTIONS.has(node.name.text) && ts.isIdentifier(node.expression) && sdkNamespaces.has(node.expression.text)) {
      agentSession.push(hit(node, node.getText(sf)));
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined) {
      const init = node.initializer;
      for (const element of node.name.elements) {
        const property = nameOf(element.propertyName ?? element.name);
        if (property === "kill" && isProcessValue(init)) processKill.push(hit(element, `${init.getText(sf)}.kill`));
        if (property === "stop" && (isStopOwner(init) || isHandle(init))) furnaceStop.push(hit(element, `${init.getText(sf)}.stop`));
      }
    }
    if (ts.isArrayLiteralExpression(node)) {
      const head = literalValue(node.elements[0]);
      if (head !== undefined && ARGV_BINARIES.has(commandName(head))) record(node, [{ binary: head, argv: argvOf(node.elements.slice(1)) }]);
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const member = ts.isPropertyAccessExpression(node) ? node.name.text : literalText(node.argumentExpression);
      if (member === "kill" && isProcessValue(node.expression)) processKill.push(hit(node, node.getText(sf)));
      if (member === "stop" && (isStopOwner(node.expression) || isHandle(node.expression))) furnaceStop.push(hit(node, node.getText(sf)));
    }
    if (ts.isNewExpression(node) && calleeName(node.expression) === "Worker") hostLaunch.push(hit(node, node.expression.getText(sf)));
    const literal = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? node.text : undefined;
    const word = literal ?? (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) ? node.text : undefined);
    if (word !== undefined && GP_FAMILY.test(word)) gpFamily.push(hit(node, word));
    const token = specifierNodes.has(node) ? undefined : literal;
    if (token !== undefined && GP_BINARY.test(token)) gpBinary.push(hit(node, token));
    if (token !== undefined && TRAIN_WORD.test(token)) trainTokens.push(hit(node, token));
    const code = specifierNodes.has(node) ? undefined : word;
    if (code !== undefined && GP_WORDS.test(code)) gpVocabulary.push(hit(node, code));
    if (code?.includes(UNKNOWN_COMMAND)) namesUnknownCommand = true;
    ts.forEachChild(node, visit);
  };
  visit(sf);
  const gpLaunches = launches
    .filter(launch => GP_BINARY.test(basenameOf(launch.binary)) || launch.argv.some(arg => GP_FAMILY.test(arg)))
    .map(launch => ({ line: launch.line, text: `${launch.binary} ${launch.argv.join(" ")}`.trim() }));
  for (const launch of launches) {
    const name = commandName(launch.binary);
    if (launch.binary === "<process.execPath>") hostLaunch.push({ line: launch.line, text: launch.binary });
    if (KILL_BINARIES.has(name)) processKill.push({ line: launch.line, text: name });
    if (name === "furnace" && launch.argv.includes("stop")) furnaceStop.push({ line: launch.line, text: `furnace ${launch.argv.join(" ")}` });
  }
  const bdWrite = launches
    .filter(launch => commandName(launch.binary) === "bd")
    .filter(launch => {
      const verb = launch.argv.find(arg => /^[a-z][a-z-]*$/.test(arg));
      if (verb === undefined || !BD_READ_VERBS.has(verb)) return true;
      const flags = BD_WRITING_FLAGS.get(verb) ?? [];
      return launch.argv.some(arg => flags.some(flag => arg === flag || arg.startsWith(`${flag}=`)));
    })
    .map(launch => ({ line: launch.line, text: `bd ${launch.argv.join(" ")}` }));
  return { file, specifiers, runtimeImports, launches, gpBinary, gpLaunches, dynamicLoads, gpVocabulary, gpFamily, trainTokens, namesUnknownCommand, processKill, furnaceStop, bdWrite, agentSession, hostLaunch };
}

/** A module census as one comparable list: every specifier, every launch and every detector hit, field by field in a fixed order (the DT rows pin it). */
const signatureOf = (entry: ModuleCensus): string[] => [
  ...entry.specifiers.map(specifier => `specifier ${specifier}`),
  ...entry.runtimeImports.map(specifier => `runtime-import ${specifier}`),
  ...entry.launches.map(launch => `launch ${[launch.binary, ...launch.argv].join(" ")}`),
  ...entry.gpBinary.map(found => `gp-binary ${found.text}`),
  ...entry.gpLaunches.map(found => `gp-launch ${found.text}`),
  ...entry.dynamicLoads.map(found => `dynamic-load ${found.text}`),
  ...entry.gpVocabulary.map(found => `gp-vocabulary ${found.text}`),
  ...entry.gpFamily.map(found => `gp-family ${found.text}`),
  ...entry.trainTokens.map(found => `train ${found.text}`),
  ...(entry.namesUnknownCommand ? ["names-unknown-command"] : []),
  ...entry.processKill.map(found => `process-kill ${found.text}`),
  ...entry.furnaceStop.map(found => `furnace-stop ${found.text}`),
  ...entry.bdWrite.map(found => `bd-write ${found.text}`),
  ...entry.agentSession.map(found => `agent-session ${found.text}`),
  ...entry.hostLaunch.map(found => `host-launch ${found.text}`),
];

type Manifest = Readonly<Record<string, unknown>>;

interface SourceTree {
  readonly modules: ReadonlyMap<string, string>;
  readonly manifest: Manifest;
}

const namesIn = (manifest: Manifest, section: string): string[] => {
  const value = manifest[section];
  if (Array.isArray(value)) return value.filter((name): name is string => typeof name === "string");
  if (value !== null && typeof value === "object") return Object.keys(value);
  return [];
};

const isRelative = (specifier: string): boolean => specifier.startsWith(".");
const packageOf = (specifier: string): string => {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : (parts[0] ?? specifier);
};
const isBuiltin = (specifier: string): boolean => specifier.startsWith("node:") || BUILTINS.has(specifier) || BUILTINS.has(packageOf(specifier));
const isGpPackage = (specifier: string): boolean => packageOf(specifier) === GP_PACKAGE;

/** The tree module a relative specifier names (src uses .js specifiers for .ts sources), if the tree holds it. */
function resolveRelative(from: string, specifier: string, modules: ReadonlyMap<string, unknown>): string | undefined {
  if (!isRelative(specifier)) return undefined;
  const base = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [base, base.replace(/\.js$/, ".ts"), base.replace(/\.js$/, ".tsx"), base.replace(/\.mjs$/, ".mts"), base.replace(/\.cjs$/, ".cts"), `${base}.ts`, `${base}/index.ts`];
  return candidates.find(candidate => modules.has(candidate));
}

interface Finding {
  readonly file: string;
  readonly code: string;
}

interface JudgeContext {
  readonly census: ReadonlyMap<string, ModuleCensus>;
  readonly manifest: Manifest;
  readonly seams: readonly GpSeam[];
  readonly clients: ReadonlySet<string>;
  readonly admissions: readonly string[];
  /** Every gp client and its src import closure (run-time imports). */
  readonly decisionPath: readonly string[];
  /** Every gp client and every module that imports one at run time. */
  readonly adjacent: readonly string[];
  /** Every module that itself calls process.kill, stops a Furnace Run or Attempt, writes through bd, starts a Claude agent session or launches a workflow host. */
  readonly executionSeams: readonly string[];
  readonly importsOf: (file: string) => readonly string[];
  readonly closureOf: (file: string) => readonly string[];
}

function contextOf(tree: SourceTree, seams: readonly GpSeam[]): JudgeContext {
  const census = new Map([...tree.modules].map(([file, text]) => [file, moduleCensus(file, text)] as const));
  const importsOf = (file: string): string[] =>
    (census.get(file)?.runtimeImports ?? []).flatMap(specifier => {
      const target = resolveRelative(file, specifier, census);
      return target === undefined ? [] : [target];
    });
  const closureOf = (start: string): string[] => {
    const seen = new Set<string>();
    const queue = [start];
    for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
      if (seen.has(file) || !census.has(file)) continue;
      seen.add(file);
      queue.push(...importsOf(file));
    }
    return [...seen].sort();
  };
  const clients = new Set(seams.filter(seam => seam.role === "client").map(seam => seam.file));
  const admissions = seams.filter(seam => seam.role === "admission").map(seam => seam.file);
  const decisionPath = [...new Set([...clients].flatMap(closureOf))].sort();
  const adjacent = [...census.keys()].filter(file => clients.has(file) || importsOf(file).some(target => clients.has(target))).sort();
  const executionSeams = [...census.values()]
    .filter(entry => entry.processKill.length + entry.furnaceStop.length + entry.bdWrite.length + entry.agentSession.length + entry.hostLaunch.length > 0)
    .map(entry => entry.file)
    .sort();
  return { census, manifest: tree.manifest, seams, clients, admissions, decisionPath, adjacent, executionSeams, importsOf, closureOf };
}

/** A synthetic tree: modules by repo path, a package.json body and the gp seams it registers. */
interface Fixture {
  readonly modules: Readonly<Record<string, string>>;
  readonly manifest: Manifest;
  readonly seams: readonly GpSeam[];
}

const treeOf = (fixture: Fixture): SourceTree => ({ modules: new Map(Object.entries(fixture.modules)), manifest: fixture.manifest });
const withModule = (fixture: Fixture, file: string, text: string): Fixture => ({ ...fixture, modules: { ...fixture.modules, [file]: text } });
/** Edits one fixture module; an edit that changes nothing throws, so a falsifier can never silently fail to apply. */
function editModule(fixture: Fixture, file: string, edit: (text: string) => string): Fixture {
  const text = fixture.modules[file];
  if (text === undefined) throw new Error(`fixture holds no ${file}`);
  const next = edit(text);
  if (next === text) throw new Error(`the edit left ${file} unchanged`);
  return withModule(fixture, file, next);
}
function withDependency(fixture: Fixture, section: string, name: string, version: string): Fixture {
  const current = fixture.manifest[section];
  const entries = current !== null && typeof current === "object" && !Array.isArray(current) ? current : {};
  return { ...fixture, manifest: { ...fixture.manifest, [section]: { ...entries, [name]: version } } };
}

const CLIENT = "src/workbench/providers/graphpolicy.ts";
const PROCESS_ENV = "src/workbench/process-env.ts";
const DECISION = "src/workbench/gp-decision.ts";
const LIFECYCLE = "src/workbench/furnace-control.ts";
const ADMISSION = "src/workbench/gp-admission.ts";
const TELEMETRY = "src/workbench/telemetry.ts";

/** The client's refusal mapping: gp's unknown-command error.code becomes a typed refusal. */
const REFUSAL_LINES = [
  'export type GpRefusal = { readonly kind: "refused"; readonly code: "GP_CLI_UNKNOWN_COMMAND" };',
  "export function refusalOf(code: string): GpRefusal | undefined {",
  '  return code === "GP_CLI_UNKNOWN_COMMAND" ? { kind: "refused", code } : undefined;',
  "}",
].join("\n");
const EVAL_CALL = 'spawn("gp", ["eval", "--program", program, "--json"], { env: scrubbedEnvironment(process.env) })';

/** A compliant gp integration: every rule holds, so the census must judge it clean. */
const CLEAN: Fixture = {
  modules: {
    [CLIENT]: [
      'import { spawn } from "node:child_process";',
      'import { scrubbedEnvironment } from "../process-env.js";',
      REFUSAL_LINES,
      "export function gpEval(program: string) {",
      `  return ${EVAL_CALL};`,
      "}",
    ].join("\n"),
    [PROCESS_ENV]: [
      "export function scrubbedEnvironment(env: Readonly<Record<string, string | undefined>>): Record<string, string> {",
      "  const path = env.PATH;",
      "  return path === undefined ? {} : { PATH: path };",
      "}",
    ].join("\n"),
    [DECISION]: [
      'import { gpEval } from "./providers/graphpolicy.js";',
      'import { proposeRunStop } from "./furnace-control.js";',
      "export function decide(program: string, runId: string): Promise<void> {",
      "  gpEval(program);",
      "  return proposeRunStop(runId);",
      "}",
    ].join("\n"),
    [LIFECYCLE]: [
      "declare const client: { readonly runs: { stop(id: string): Promise<void> } };",
      "export function proposeRunStop(id: string): Promise<void> {",
      "  return client.runs.stop(id);",
      "}",
    ].join("\n"),
    [ADMISSION]: ["export function admitReply(reply: unknown): boolean {", '  return typeof reply === "object" && reply !== null;', "}"].join("\n"),
    [TELEMETRY]: [
      "export interface TelemetrySink {",
      "  emit(event: string): void;",
      "}",
      "export function emitOperationsTelemetry(sink: TelemetrySink): void {",
      '  sink.emit("report");',
      "}",
    ].join("\n"),
  },
  manifest: { dependencies: { [GP_PACKAGE]: "0.1.0", nanoid: "^5.1.16" } },
  seams: [
    { file: CLIENT, role: "client" },
    { file: ADMISSION, role: "admission" },
  ],
};

/** CLEAN with its client reaching gp through the GraphPolicyCLI package instead of the gp binary: every rule still holds (wb-1ho6 F2, gate DMG38). */
const SDK_CLEAN: Fixture = withModule(
  CLEAN,
  CLIENT,
  [
    'import { evaluate } from "graph-policy-cli";',
    'import { scrubbedEnvironment } from "../process-env.js";',
    REFUSAL_LINES,
    "export function gpEval(program: string): unknown {",
    "  return evaluate({ program, env: scrubbedEnvironment(process.env) });",
    "}",
  ].join("\n"),
);

type Check = (ctx: JudgeContext) => readonly Finding[];

/** One single-clause mutation of CLEAN and the exact findings the census must report for it. */
interface Falsifier {
  readonly name: string;
  readonly apply: (fixture: Fixture) => Fixture;
  readonly expected: readonly string[];
}

interface Pin {
  readonly id: string;
  /** The clause, verbatim as the docs/03 boundary bullet states it (markdown: code spans in backticks). */
  readonly clause: string;
  readonly check: Check;
  readonly falsifiers: readonly Falsifier[];
}

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

const modulesOf = (ctx: JudgeContext, files: readonly string[]): ModuleCensus[] =>
  files.flatMap(file => {
    const entry = ctx.census.get(file);
    return entry === undefined ? [] : [entry];
  });

/** The findings an execution seam that imports the client earns, beside its own effect pin. */
const DECISION_SEAM = "GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client";

const ROWS: readonly Row[] = [
  {
    id: "GP-1",
    label: "real interfaces",
    pins: [
      {
        id: "a1",
        clause: "every gp call site reaches gp through the gp binary, the GraphPolicyCLI package or `gp rpc --stdio`",
        check: ctx => {
          const findings: Finding[] = ctx.seams.filter(seam => !ctx.census.has(seam.file)).map(seam => ({ file: seam.file, code: "registered-seam-missing" }));
          for (const entry of ctx.census.values()) {
            const family = entry.specifiers.filter(specifier => !isRelative(specifier) && GP_FAMILY.test(packageOf(specifier)));
            const reachesGp = entry.gpBinary.length + entry.gpLaunches.length > 0;
            if (ctx.clients.has(entry.file)) {
              if (!reachesGp && !entry.runtimeImports.some(isGpPackage)) findings.push({ file: entry.file, code: "client-reaches-gp-through-no-real-interface" });
              for (const specifier of family.filter(candidate => !isGpPackage(candidate))) findings.push({ file: entry.file, code: `client-imports-${specifier}` });
            } else {
              if (reachesGp) findings.push({ file: entry.file, code: "gp-call-site-outside-client" });
              if (family.length > 0) findings.push({ file: entry.file, code: "gp-package-outside-client" });
            }
          }
          return findings;
        },
        falsifiers: [
          {
            name: "an unregistered module launches gp",
            apply: fixture =>
              withModule(fixture, "src/workbench/gp-shortcut.ts", 'import { execFileSync } from "node:child_process";\nexport const evalNow = (): Buffer => execFileSync("gp", ["eval", "--json"]);'),
            expected: ["GP-1/a1 src/workbench/gp-shortcut.ts gp-call-site-outside-client"],
          },
          {
            name: "an unregistered module runs the GraphPolicyCLI package through npx",
            apply: fixture => withModule(fixture, "src/workbench/gp-npx.ts", 'import { spawnSync } from "node:child_process";\nexport const evalNow = () => spawnSync("npx", ["graph-policy-cli", "eval"]);'),
            expected: ["GP-1/a1 src/workbench/gp-npx.ts gp-call-site-outside-client"],
          },
          {
            name: "a registered client reaches gp through no real interface",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace(EVAL_CALL, "{ program, env: scrubbedEnvironment(process.env) }")),
            expected: ["GP-1/a1 src/workbench/providers/graphpolicy.ts client-reaches-gp-through-no-real-interface"],
          },
          {
            name: "the registered client imports a GraphPolicyCLI fork",
            apply: fixture => editModule(fixture, CLIENT, text => `import { evaluate } from "graphpolicy-fork";\n${text}\nexport const forked = (): unknown => evaluate;`),
            expected: ["GP-1/a1 src/workbench/providers/graphpolicy.ts client-imports-graphpolicy-fork", "GP-3/c1 src/workbench/providers/graphpolicy.ts imports-graphpolicy-fork"],
          },
          {
            name: "an unregistered module imports the GraphPolicyCLI package",
            apply: fixture => withModule(fixture, "src/workbench/gp-sdk.ts", 'import { evaluate } from "graph-policy-cli";\nexport const evaluateNow = (): unknown => evaluate;'),
            expected: ["GP-1/a1 src/workbench/gp-sdk.ts gp-package-outside-client"],
          },
          {
            name: "an unregistered module imports GraphPolicyCLI types only",
            apply: fixture => withModule(fixture, "src/workbench/gp-types.ts", 'import type { Program } from "graph-policy-cli";\nexport type Programs = readonly Program[];'),
            expected: ["GP-1/a1 src/workbench/gp-types.ts gp-package-outside-client"],
          },
          {
            name: "a registered client names a module the tree does not hold",
            apply: fixture => ({ ...fixture, seams: [...fixture.seams, { file: "src/workbench/gp-retired.ts", role: "client" }] }),
            expected: ["GP-1/a1 src/workbench/gp-retired.ts registered-seam-missing"],
          },
        ],
      },
      {
        id: "a2",
        clause: "no decision-path argv carries `train`",
        check: ctx => modulesOf(ctx, ctx.decisionPath).flatMap(entry => (entry.trainTokens.length > 0 ? [{ file: entry.file, code: "train-on-decision-path" }] : [])),
        falsifiers: [
          {
            name: "the client's gp argv carries train",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace('["eval", "--program"', '["train", "--program"')),
            expected: ["GP-1/a2 src/workbench/providers/graphpolicy.ts train-on-decision-path"],
          },
        ],
      },
      {
        id: "a3",
        clause: "an admission seam imports no training or telemetry writer",
        check: ctx =>
          ctx.admissions.flatMap(seam => {
            const closure = modulesOf(ctx, ctx.closureOf(seam));
            const findings: Finding[] = [];
            if (closure.some(entry => TELEMETRY_WRITERS.includes(entry.file))) findings.push({ file: seam, code: "admission-imports-telemetry-writer" });
            if (closure.some(entry => entry.trainTokens.length > 0 || entry.runtimeImports.some(specifier => TRAINING_FRAMEWORKS.test(specifier)))) {
              findings.push({ file: seam, code: "admission-imports-training-writer" });
            }
            return findings;
          }),
        falsifiers: [
          {
            name: "the admission seam imports the telemetry writer",
            apply: fixture => editModule(fixture, ADMISSION, text => `import { emitOperationsTelemetry } from "./telemetry.js";\n${text}`),
            expected: ["GP-1/a3 src/workbench/gp-admission.ts admission-imports-telemetry-writer"],
          },
          {
            name: "the admission seam imports a training framework",
            apply: fixture => editModule(fixture, ADMISSION, text => `import { fit } from "@tensorflow/tfjs-node";\n${text}`),
            expected: ["GP-1/a3 src/workbench/gp-admission.ts admission-imports-training-writer"],
          },
          {
            name: "the admission seam builds a train argv itself",
            apply: fixture => editModule(fixture, ADMISSION, text => `${text}\nexport const retrainArgv = (program: string): readonly string[] => ["train", "--program", program];`),
            expected: ["GP-1/a3 src/workbench/gp-admission.ts admission-imports-training-writer"],
          },
        ],
      },
      {
        id: "a4",
        clause: "no execution seam imports a gp client",
        check: ctx =>
          ctx.executionSeams.flatMap(file => {
            if (ctx.clients.has(file)) return [{ file, code: "gp-client-is-execution-seam" }];
            return ctx.importsOf(file).some(target => ctx.clients.has(target)) ? [{ file, code: "execution-imports-gp-client" }] : [];
          }),
        falsifiers: [
          {
            name: "the decision module launches a workflow host",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { Worker } from "node:worker_threads";\n${text}\nexport const host = new Worker("./host.js");`),
            expected: [DECISION_SEAM],
          },
          {
            name: "the registered client is itself an execution seam",
            apply: fixture => editModule(fixture, CLIENT, text => `${text}\nexport const stopWorker = (pid: number): boolean => process.kill(pid);`),
            expected: ["GP-1/a4 src/workbench/providers/graphpolicy.ts gp-client-is-execution-seam", "GP-4/d1 src/workbench/providers/graphpolicy.ts process-kill"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-2",
    label: "no local numerics",
    pins: [
      {
        id: "b1",
        clause: "no module outside a gp client names GraphDataIR or GraphPolicyCLI wire vocabulary",
        check: ctx =>
          [...ctx.census.values()].filter(entry => !ctx.clients.has(entry.file) && entry.gpVocabulary.length > 0).map(entry => ({ file: entry.file, code: "gp-vocabulary-outside-client" })),
        falsifiers: [
          {
            name: "an unregistered module scores a GraphDataIR document",
            apply: fixture =>
              withModule(
                fixture,
                "src/workbench/gp-score.ts",
                "export interface GraphDataIR {\n  readonly nodes: readonly string[];\n}\nexport function score(document: GraphDataIR): number {\n  return document.nodes.length / 2;\n}",
              ),
            expected: ["GP-2/b1 src/workbench/gp-score.ts gp-vocabulary-outside-client"],
          },
        ],
      },
      {
        id: "b2",
        clause: "a gp client maps the GP_CLI_UNKNOWN_COMMAND refusal to a typed refusal, never a local substitute",
        check: ctx => modulesOf(ctx, [...ctx.clients]).flatMap(entry => (entry.namesUnknownCommand ? [] : [{ file: entry.file, code: "unknown-command-unmapped" }])),
        falsifiers: [
          {
            name: "the client drops its unknown-command mapping",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace(REFUSAL_LINES, "")),
            expected: ["GP-2/b2 src/workbench/providers/graphpolicy.ts unknown-command-unmapped"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-3",
    label: "no unrelated dependency",
    pins: [
      {
        id: "c1",
        clause: "a decision path imports no package beyond the GraphPolicyCLI package and Node built-ins",
        check: ctx =>
          modulesOf(ctx, ctx.decisionPath).flatMap(entry => [
            ...entry.runtimeImports.filter(specifier => !isRelative(specifier) && !isBuiltin(specifier) && !isGpPackage(specifier)).map(specifier => ({ file: entry.file, code: `imports-${packageOf(specifier)}` })),
            ...(entry.dynamicLoads.length > 0 ? [{ file: entry.file, code: "dynamic-load-on-decision-path" }] : []),
          ]),
        falsifiers: [
          {
            name: "the client imports an unrelated package",
            apply: fixture => editModule(fixture, CLIENT, text => `import { nanoid } from "nanoid";\n${text}\nexport const requestId = (): string => nanoid();`),
            expected: ["GP-3/c1 src/workbench/providers/graphpolicy.ts imports-nanoid"],
          },
          {
            name: "the client loads a package by a computed name",
            apply: fixture => editModule(fixture, CLIENT, text => `${text}\nexport const load = (name: string): Promise<unknown> => import(name);`),
            expected: ["GP-3/c1 src/workbench/providers/graphpolicy.ts dynamic-load-on-decision-path"],
          },
        ],
      },
      {
        id: "c2",
        clause: "the dependency manifest declares no training framework and no GraphPolicyCLI package other than graph-policy-cli",
        check: ctx =>
          ALL_SECTIONS.flatMap(section =>
            namesIn(ctx.manifest, section).flatMap(name => [
              ...(TRAINING_FRAMEWORKS.test(name) ? [{ file: MANIFEST, code: `training-framework-${name}` }] : []),
              ...(GP_FAMILY.test(name) && name !== GP_PACKAGE ? [{ file: MANIFEST, code: `gp-package-${name}` }] : []),
            ]),
          ),
        falsifiers: [
          {
            name: "the manifest declares a training framework",
            apply: fixture => withDependency(fixture, "dependencies", "@tensorflow/tfjs-node", "4.22.0"),
            expected: ["GP-3/c2 package.json training-framework-@tensorflow/tfjs-node"],
          },
          {
            name: "the manifest declares a GraphPolicyCLI fork",
            apply: fixture => withDependency(fixture, "devDependencies", "graphpolicy-fork", "0.0.1"),
            expected: ["GP-3/c2 package.json gp-package-graphpolicy-fork"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-4",
    label: "lifecycle only",
    pins: [
      {
        id: "d1",
        clause: "a gp-adjacent module calls no process.kill",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.processKill.length > 0 ? [{ file: entry.file, code: "process-kill" }] : [])),
        falsifiers: [
          {
            name: "the decision module kills a worker",
            apply: fixture => editModule(fixture, DECISION, text => `${text}\nexport function stopWorker(pid: number): void {\n  process.kill(pid, "SIGTERM");\n}`),
            expected: [DECISION_SEAM, "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
          {
            name: "the decision module destructures kill from process",
            apply: fixture => editModule(fixture, DECISION, text => `${text}\nconst { kill } = process;\nexport const stopWorker = (pid: number): boolean => kill(pid);`),
            expected: [DECISION_SEAM, "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
          {
            name: "the decision module imports kill from node:process",
            apply: fixture => editModule(fixture, DECISION, text => `import { kill } from "node:process";\n${text}\nexport const stopWorker = (pid: number): boolean => kill(pid);`),
            expected: [DECISION_SEAM, "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
          {
            name: "the decision module kills through a default import of node:process",
            apply: fixture => editModule(fixture, DECISION, text => `import proc from "node:process";\n${text}\nexport const stopWorker = (pid: number): boolean => proc.kill(pid);`),
            expected: [DECISION_SEAM, "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
        ],
      },
      {
        id: "d2",
        clause: "a gp-adjacent module writes nothing through bd",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.bdWrite.length > 0 ? [{ file: entry.file, code: "bd-write" }] : [])),
        falsifiers: [
          {
            name: "the decision module closes a bead",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execFileSync } from "node:child_process";\n${text}\nexport const closeBead = (id: string): Buffer => execFileSync("bd", ["close", id]);`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead through a templated shell command",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (id: string): Buffer => execSync(\`bd close \${id}\`);`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead through a shell command",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync("bd close wb-example --reason done");`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead behind an environment assignment",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync("BEADS_ACTOR=machine bd close wb-example");`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead through sh -c",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { spawnSync } from "node:child_process";\n${text}\nexport const closeBead = () => spawnSync("sh", ["-c", "bd close wb-example"]);`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module claims a bead through bd ready --claim",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { spawnSync } from "node:child_process";\n${text}\nexport const claimNext = () => spawnSync("bd", ["ready", "--claim", "--json"]);`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module repairs the store through bd doctor --fix",
            apply: fixture => editModule(fixture, DECISION, text => `import { spawnSync } from "node:child_process";\n${text}\nexport const repair = () => spawnSync("bd", ["doctor", "--fix", "--yes"]);`),
            expected: [DECISION_SEAM, "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
        ],
      },
      {
        id: "d3",
        clause: "a gp-adjacent module stops no Furnace Run or Attempt",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.furnaceStop.length > 0 ? [{ file: entry.file, code: "furnace-stop" }] : [])),
        falsifiers: [
          {
            name: "the decision module stops an Attempt itself",
            apply: fixture =>
              editModule(
                fixture,
                DECISION,
                text => `declare const furnace: { readonly attempts: { stop(id: string): Promise<void> } };\n${text}\nexport const stopAttempt = (id: string): Promise<void> => furnace.attempts.stop(id);`,
              ),
            expected: [DECISION_SEAM, "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
          {
            name: "the decision module stops a Run through its handle",
            apply: fixture =>
              editModule(fixture, DECISION, text => `declare const activeRun: { stop(): Promise<void> };\n${text}\nexport const stopRun = (): Promise<void> => activeRun.stop();`),
            expected: [DECISION_SEAM, "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
          {
            name: "the decision module stops a Run by element access",
            apply: fixture =>
              editModule(
                fixture,
                DECISION,
                text => `declare const furnace: { readonly runs: { stop(id: string): Promise<void> } };\n${text}\nexport const stopRun = (id: string): Promise<void> => furnace.runs["stop"](id);`,
              ),
            expected: [DECISION_SEAM, "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
          {
            name: "the decision module stops a Run through a bound stop owner",
            apply: fixture =>
              editModule(
                fixture,
                DECISION,
                text => `declare const furnace: { readonly runs: { stop(id: string): Promise<void> } };\n${text}\nconst lane = furnace.runs;\nexport const stopRun = (id: string): Promise<void> => lane.stop(id);`,
              ),
            expected: [DECISION_SEAM, "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
        ],
      },
    ],
  },
];

/** Every finding, as "<row>/<pin> <file> <code>": rows and pins in table order, each pin's findings sorted. */
function judgeContext(ctx: JudgeContext): string[] {
  return ROWS.flatMap(row => row.pins.flatMap(pin => pin.check(ctx).map(finding => `${row.id}/${pin.id} ${finding.file} ${finding.code}`).sort()));
}
const judge = (tree: SourceTree, seams: readonly GpSeam[]): string[] => judgeContext(contextOf(tree, seams));

/**
 * One measured member of a class-level residual (wb-nh0t F2): the statement its quiet row plants, the census's frozen
 * reading of it, and a paired control one change away that the census does read as a bd write, so a member read quiet by
 * a hollowed reader reds at its control.
 */
interface ResidualMember {
  /** The gate LEG-2 probe that measured the member (gate s73 PREP leg2), then the member's shape. */
  readonly name: string;
  /** The words naming the member in its residual's family, so the docs/03 residual line names every member. */
  readonly named: string;
  /** The launch its quiet row plants: it begins with the shape docs/03 names the member by, and no other member's statement reads as its words (wb-mpmm F1); a shape carrying no bd binary, the function keyword excepted, is followed by bd (wb-zj42 F1). */
  readonly statement: string;
  /** The member's launches as the census reads them (binary, then argv): the command word misread, no bd write found. */
  readonly reads: readonly string[];
  /** The paired control: the same launcher, differing from the statement in the shape's run alone (wb-zj42 F1, shapeRunTied). */
  readonly control: string;
  /** The control's bd writes as the census reports them. */
  readonly controlWrites: readonly string[];
}

/** A blind spot of the token census: a NAMED family whose representative source the census reports quiet (pinned). */
interface Residual {
  readonly id: string;
  /** The family, verbatim as the docs/03 residual line states it. */
  readonly family: string;
  readonly apply: (fixture: Fixture) => Fixture;
  /** A class-level residual's measured members, each pinned by its own frozen reading and control; a single-shape residual has none. */
  readonly members?: readonly ResidualMember[];
}

/** The launchers a residual member's statement calls, imported as a gp-adjacent module would. */
const MEMBER_HEAD = 'import { execSync, spawnSync } from "node:child_process";';
/**
 * MISREAD-COMMAND-WORD's members: the eight d2 shapes gate s73 measured quiet (wb-1ho6 PREP F2, leg2 P05-P32). Each is a bd
 * write whose command word the census misreads - shell syntax ahead of the binary read as the binary, a binary spelling
 * outside the lowercase name and its .exe or .cmd suffix, a global flag's value read as the bd verb.
 */
const MISREAD_MEMBERS: readonly ResidualMember[] = [
  {
    name: "P06 a leading redirection",
    named: ">/dev/null",
    statement: 'execSync(">/dev/null bd close wb-example");',
    reads: [">/dev/null bd close wb-example"],
    control: 'execSync("bd close wb-example >/dev/null");',
    controlWrites: ["bd close wb-example >/dev/null"],
  },
  {
    name: "P07 a leading descriptor redirection",
    named: "2>/dev/null",
    statement: 'execSync("2>/dev/null bd close wb-example");',
    reads: ["2>/dev/null bd close wb-example"],
    control: 'execSync("bd close wb-example 2>/dev/null");',
    controlWrites: ["bd close wb-example 2>/dev/null"],
  },
  {
    name: "P05 the time keyword",
    named: "the time",
    statement: 'execSync("time bd close wb-example");',
    reads: ["time bd close wb-example"],
    control: 'execSync("bd close wb-example");',
    controlWrites: ["bd close wb-example"],
  },
  {
    name: "P32 the coproc keyword",
    named: "coproc",
    statement: 'execSync("coproc bd close wb-example");',
    reads: ["coproc bd close wb-example"],
    control: 'execSync("! bd close wb-example");',
    controlWrites: ["bd close wb-example"],
  },
  {
    name: "P08 the function keyword",
    named: "function keyword",
    statement: 'execSync("function f { bd close wb-example; }; f");',
    reads: ["function f { bd close wb-example", "f"],
    control: 'execSync("f() { bd close wb-example; }; f");',
    controlWrites: ["bd close wb-example"],
  },
  {
    name: "P11 an upper-case .EXE spelling",
    named: "BD.EXE",
    statement: 'spawnSync("BD.EXE", ["close", "wb-example"]);',
    reads: ["BD.EXE close wb-example"],
    control: 'spawnSync("bd.exe", ["close", "wb-example"]);',
    controlWrites: ["bd close wb-example"],
  },
  {
    name: "P12 a .bat spelling",
    named: "bd.bat",
    statement: 'spawnSync("bd.bat", ["close", "wb-example"]);',
    reads: ["bd.bat close wb-example"],
    control: 'spawnSync("bd.cmd", ["close", "wb-example"]);',
    controlWrites: ["bd close wb-example"],
  },
  {
    name: "P17 a global flag value read as the verb",
    named: "bd --actor doctor close",
    statement: 'spawnSync("bd", ["--actor", "doctor", "close", "wb-example"]);',
    reads: ["bd --actor doctor close wb-example"],
    control: 'spawnSync("bd", ["--actor=doctor", "close", "wb-example"]);',
    controlWrites: ["bd --actor=doctor close wb-example"],
  },
];

const RESIDUALS: readonly Residual[] = [
  {
    id: "UNNAMED-NUMERICS",
    family: "a module that scores graph data without naming gp vocabulary",
    apply: fixture =>
      withModule(fixture, "src/workbench/rank.ts", "export function rank(edges: ReadonlyArray<readonly [number, number]>): number[] {\n  return edges.map(([from, to]) => from * 0.5 + to * 0.5);\n}"),
  },
  {
    id: "LOCAL-SUBSTITUTE",
    family: "a client that names the refusal and then computes locally",
    apply: fixture =>
      editModule(fixture, CLIENT, text => text.replace(REFUSAL_LINES, 'export function refusalOf(code: string): number {\n  return code === "GP_CLI_UNKNOWN_COMMAND" ? 0.5 : 1;\n}')),
  },
  {
    id: "COMPUTED-BINARY",
    family: "a gp binary name assembled at run time",
    apply: fixture => withModule(fixture, "src/workbench/gp-joined.ts", 'import { spawn } from "node:child_process";\nexport const run = () => spawn(["g", "p"].join(""), ["eval"]);'),
  },
  {
    id: "DYNAMIC-ARGV",
    family: "a train verb assembled at run time",
    apply: fixture => editModule(fixture, CLIENT, text => text.replace('["eval", "--program"', '["tr" + "ain", "--program"')),
  },
  {
    id: "ALIASED-EFFECT",
    family: "a kill, a Furnace stop or a launcher reached through a value the census does not follow: a parameter, an assignment after the declaration, an object property or a return value",
    apply: fixture =>
      editModule(fixture, DECISION, text =>
        [
          'import { spawnSync } from "node:child_process";',
          "declare const furnace: { readonly runs: { stop(id: string): Promise<void> } };",
          text,
          "function killVia(target: { kill(pid: number): boolean }, pid: number): boolean {",
          "  return target.kill(pid);",
          "}",
          "function stopVia(lanes: { stop(id: string): Promise<void> }, id: string): Promise<void> {",
          "  return lanes.stop(id);",
          "}",
          "function launchVia(launch: typeof spawnSync, id: string): unknown {",
          '  return launch("bd", ["close", id]);',
          "}",
          "export const stopWorker = (pid: number): boolean => killVia(process, pid);",
          "export const stopRun = (id: string): Promise<void> => stopVia(furnace.runs, id);",
          "export const closeBead = (id: string): unknown => launchVia(spawnSync, id);",
        ].join("\n"),
      ),
  },
  {
    id: "TRAINING-FRAMEWORK-ROSTER",
    family: "a training framework outside the census deny roster that no decision path imports",
    apply: fixture => withDependency(fixture, "dependencies", "example-ml-trainer", "1.0.0"),
  },
  {
    id: "WRAPPED-COMMAND",
    family: "a launch wrapped by a program the census does not unwrap, such as timeout, sudo, nice or xargs",
    apply: fixture =>
      editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync("timeout 5 bd close wb-example");`),
  },
  {
    id: "FOREIGN-LAUNCHER",
    family: "a launch through a package launcher outside the child_process roster, such as execa",
    apply: fixture => editModule(fixture, DECISION, text => `import { execa } from "execa";\n${text}\nexport const closeBead = (id: string): unknown => execa("bd", ["close", id]);`),
  },
  {
    id: "QUOTED-SUBSTITUTION",
    family: "a command substitution inside double quotes, which the census reads as quoted text",
    apply: fixture =>
      editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync('echo "$(bd close wb-example)"');`),
  },
  {
    id: "COMPUTED-BD-FLAG",
    family: "a bd writing flag that is not a literal, such as the flag of a read verb passed in a parameter",
    apply: fixture => editModule(fixture, DECISION, text => `import { spawnSync } from "node:child_process";\n${text}\nexport const takeNext = (flag: string) => spawnSync("bd", ["ready", flag]);`),
  },
  {
    id: "SHELL-BUILTIN-WRAPPER",
    family: "a command run through a shell builtin or env option the census does not unwrap, such as eval, command, builtin or env -S",
    apply: fixture =>
      editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync('eval "bd close wb-example"');`),
  },
  {
    id: "MISREAD-COMMAND-WORD",
    family:
      "a launch whose command word the census misreads, so a bd write reads as another binary or as a read verb: a leading redirection such as >/dev/null or 2>/dev/null, the time, coproc or function keyword, a binary spelled BD.EXE or bd.bat, or a value-taking bd global flag whose value is a read verb, as in bd --actor doctor close",
    members: MISREAD_MEMBERS,
    apply: fixture =>
      editModule(fixture, DECISION, text => `${MEMBER_HEAD}\n${text}\nexport function misreadLaunches(): void {\n${MISREAD_MEMBERS.map(member => `  ${member.statement}`).join("\n")}\n}`),
  },
];

/** One claimed detector member (or a family of them), its probe module and the exact census signature the probe must produce. */
interface DetectorProbe {
  readonly key: string;
  readonly member: string;
  readonly source: readonly string[];
  readonly signature: readonly string[];
}

/** The bd verbs the probes launch, written out here rather than read from BD_READ_VERBS, so a verb dropped from the read set, or a write verb added to it, reds. */
const BD_READ_PROBES: readonly string[] = ["show", "list", "ready", "blocked", "search", "stats", "status", "count", "info", "where", "version", "help", "graph", "doctor"];
const BD_WRITE_VERBS: readonly string[] = ["close", "update", "create", "delete", "reopen", "dep", "comment", "label", "edit"];

/** WHAT THE CENSUS CLAIMS: every detector member, one probe each (a shape outside this table is not claimed). */
const DETECTORS: readonly DetectorProbe[] = [
  {
    key: "specifiers",
    member: "every module specifier - side-effect, type-only and value imports, export-from, import-equals, import types, literal import() and require() - and which of them load at run time",
    source: [
      'import "./side-effect.js";',
      'import type { A } from "./types.js";',
      'export { b } from "./b.js";',
      'export type { C } from "./c.js";',
      'import eq = require("./eq.js");',
      'type T = typeof import("./t.js");',
      'export const lazy = import("./lazy.js");',
      'export const required = require("./required.js");',
    ],
    signature: [
      "specifier ./side-effect.js",
      "specifier ./types.js",
      "specifier ./b.js",
      "specifier ./c.js",
      "specifier ./eq.js",
      "specifier ./t.js",
      "specifier ./lazy.js",
      "specifier ./required.js",
      "runtime-import ./side-effect.js",
      "runtime-import ./b.js",
      "runtime-import ./eq.js",
      "runtime-import ./lazy.js",
      "runtime-import ./required.js",
    ],
  },
  {
    key: "launchers",
    member: "every child_process launcher by name: spawn, spawnSync, execFile, execFileSync, exec, execSync, fork",
    source: [
      'spawn("kill", ["-TERM", "1"]);',
      'spawnSync("bd", ["close", "wb-a"]);',
      'execFile("furnace", ["run", "stop", "frn-run-a"]);',
      'execFileSync("gp", ["eval", "--json"]);',
      'exec("pkill -f worker");',
      'execSync("killall node");',
      'fork("./worker.js", ["--id", "1"]);',
    ],
    signature: [
      "launch kill -TERM 1",
      "launch bd close wb-a",
      "launch furnace run stop frn-run-a",
      "launch gp eval --json",
      "launch pkill -f worker",
      "launch killall node",
      "launch ./worker.js --id 1",
      "gp-binary gp",
      "gp-launch gp eval --json",
      "process-kill kill",
      "process-kill pkill",
      "process-kill killall",
      "furnace-stop furnace run stop frn-run-a",
      "bd-write bd close wb-a",
    ],
  },
  {
    key: "launcher-bindings",
    member: "a launcher through a renamed import, a member bound to a variable, a destructured member and a namespace member",
    source: [
      'import * as cp from "node:child_process";',
      'import { spawnSync as run } from "node:child_process";',
      "const sync = cp.execFileSync;",
      "const { execSync: shell } = cp;",
      'run("bd", ["update", "wb-a"]);',
      'sync("bd", ["delete", "wb-b"]);',
      'shell("bd reopen wb-c");',
      'cp.spawn("bd", ["label", "wb-d"]);',
    ],
    signature: [
      "specifier node:child_process",
      "specifier node:child_process",
      "runtime-import node:child_process",
      "runtime-import node:child_process",
      "launch bd update wb-a",
      "launch bd delete wb-b",
      "launch bd reopen wb-c",
      "launch bd label wb-d",
      "bd-write bd update wb-a",
      "bd-write bd delete wb-b",
      "bd-write bd reopen wb-c",
      "bd-write bd label wb-d",
    ],
  },
  {
    key: "binary-resolution",
    member: "a launched binary named by a same-file string constant, and execPath read on process or on a binding of it",
    source: ['import proc from "node:process";', 'const BD = "bd";', 'spawnSync(BD, ["comment", "wb-a"]);', 'spawn(process.execPath, ["host.js"]);', 'spawn(proc.execPath, ["host2.js"]);'],
    signature: [
      "specifier node:process",
      "runtime-import node:process",
      "launch bd comment wb-a",
      "launch <process.execPath> host.js",
      "launch <process.execPath> host2.js",
      "bd-write bd comment wb-a",
      "host-launch <process.execPath>",
      "host-launch <process.execPath>",
    ],
  },
  {
    key: "argv-arrays",
    member: "an argv array naming a roster binary first (gp, bd, furnace, kill, pkill, killall, sh, bash, zsh, dash, ksh), a shell's -c script followed",
    source: [
      "export const argvs = [",
      '  ["gp", "eval"],',
      '  ["bd", "close", "wb-a"],',
      '  ["furnace", "attempt", "stop", "frn-atm-a"],',
      '  ["kill", "1"],',
      '  ["pkill", "w"],',
      '  ["killall", "w"],',
      '  ["sh", "-c", "bd close wb-b"],',
      '  ["bash", "-c", "bd close wb-c"],',
      '  ["zsh", "-c", "bd close wb-d"],',
      '  ["dash", "-c", "bd close wb-e"],',
      '  ["ksh", "-c", "bd close wb-f"],',
      "];",
    ],
    signature: [
      "launch gp eval",
      "launch bd close wb-a",
      "launch furnace attempt stop frn-atm-a",
      "launch kill 1",
      "launch pkill w",
      "launch killall w",
      "launch sh -c bd close wb-b",
      "launch bd close wb-b",
      "launch bash -c bd close wb-c",
      "launch bd close wb-c",
      "launch zsh -c bd close wb-d",
      "launch bd close wb-d",
      "launch dash -c bd close wb-e",
      "launch bd close wb-e",
      "launch ksh -c bd close wb-f",
      "launch bd close wb-f",
      "gp-binary gp",
      "gp-launch gp eval",
      "process-kill kill",
      "process-kill pkill",
      "process-kill killall",
      "furnace-stop furnace attempt stop frn-atm-a",
      "bd-write bd close wb-a",
      "bd-write bd close wb-b",
      "bd-write bd close wb-c",
      "bd-write bd close wb-d",
      "bd-write bd close wb-e",
      "bd-write bd close wb-f",
    ],
  },
  {
    key: "shell-lines",
    member: "a shell command line split into simple commands: NAME=value assignments and an env prefix skipped, ; & | and newlines split, quotes removed",
    source: [
      'execSync("BEADS_ACTOR=machine NO_COLOR=1 bd close wb-a");',
      'execSync("env BEADS_ACTOR=machine bd update wb-b");',
      'execSync("cd /tmp && bd create wb-c; bd delete wb-d | cat\\nbd edit wb-e &");',
      "execSync(\"sh -c 'bd reopen wb-f'\");",
      "execSync('bash -c \"bd label wb-g\"');",
    ],
    signature: [
      "launch bd close wb-a",
      "launch bd update wb-b",
      "launch cd /tmp",
      "launch bd create wb-c",
      "launch bd delete wb-d",
      "launch cat",
      "launch bd edit wb-e",
      "launch sh -c bd reopen wb-f",
      "launch bd reopen wb-f",
      "launch bash -c bd label wb-g",
      "launch bd label wb-g",
      "bd-write bd close wb-a",
      "bd-write bd update wb-b",
      "bd-write bd create wb-c",
      "bd-write bd delete wb-d",
      "bd-write bd edit wb-e",
      "bd-write bd reopen wb-f",
      "bd-write bd label wb-g",
    ],
  },
  {
    key: "shell-c-scripts",
    member: "a shell's -c script in a launcher's argv, a -c flag cluster, a templated script's static head and a script nested in a script",
    source: ["declare const id: string;", 'spawnSync("sh", ["-c", "bd close wb-a"]);', `spawnSync("bash", ["-lc", \`bd update --id=\${id}\`]);`, `spawnSync("sh", ["-c", "bash -c 'bd close wb-n'"]);`],
    signature: [
      "launch sh -c bd close wb-a",
      "launch bd close wb-a",
      "launch bash -lc bd update --id=",
      "launch bd update --id=",
      "launch sh -c bash -c 'bd close wb-n'",
      "launch bash -c bd close wb-n",
      "launch bd close wb-n",
      "bd-write bd close wb-a",
      "bd-write bd update --id=",
      "bd-write bd close wb-n",
    ],
  },
  {
    key: "shell-heads",
    member: "a templated shell line's static head, and a launcher's whitespace-bearing command (shell: true)",
    source: ["declare const id: string;", `execSync(\`bd close \${id}\`);`, 'spawn("bd delete wb-a", { shell: true });'],
    signature: ["launch bd close", "launch bd delete wb-a", "bd-write bd close", "bd-write bd delete wb-a"],
  },
  {
    key: "kill-accesses",
    member: "process.kill read on process, globalThis.process, globalThis['process'], by element access and through a type assertion",
    source: ["process.kill(1);", "globalThis.process.kill(2);", 'process["kill"](3);', 'globalThis["process"].kill(4);', "(process as NodeJS.Process).kill(5);"],
    signature: [
      "process-kill process.kill",
      "process-kill globalThis.process.kill",
      'process-kill process["kill"]',
      'process-kill globalThis["process"].kill',
      "process-kill (process as NodeJS.Process).kill",
    ],
  },
  {
    key: "kill-bindings",
    member: "kill named by an import from the process module (renamed included) or destructured from process or a require of it",
    source: ['import { kill } from "node:process";', 'import { kill as end } from "process";', "const { kill: stopProcess } = process;", 'const { kill: viaRequire } = require("node:process");'],
    signature: [
      "specifier node:process",
      "specifier process",
      "specifier node:process",
      "runtime-import node:process",
      "runtime-import process",
      "runtime-import node:process",
      "process-kill import kill from node:process",
      "process-kill import kill as end from process",
      "process-kill process.kill",
      'process-kill require("node:process").kill',
    ],
  },
  {
    key: "process-bindings",
    member: "kill on a binding of the process object: a default, namespace or import-equals import, a require, a variable alias (chains followed to a fixpoint, in any order)",
    source: [
      'import procA from "node:process";',
      'import * as procB from "process";',
      'import procC = require("node:process");',
      'const procD = require("process");',
      "const procE = process;",
      "const procF = procE;",
      "procA.kill(1);",
      "procB.kill(2);",
      "procC.kill(3);",
      "procD.kill(4);",
      "procF.kill(5);",
      'require("node:process").kill(6);',
      "const procG = procH;",
      "const procH = process;",
      "procG.kill(7);",
    ],
    signature: [
      "specifier node:process",
      "specifier process",
      "specifier node:process",
      "specifier process",
      "specifier node:process",
      "runtime-import node:process",
      "runtime-import process",
      "runtime-import node:process",
      "runtime-import process",
      "runtime-import node:process",
      "process-kill procA.kill",
      "process-kill procB.kill",
      "process-kill procC.kill",
      "process-kill procD.kill",
      "process-kill procF.kill",
      'process-kill require("node:process").kill',
      "process-kill procG.kill",
    ],
  },
  {
    key: "stop-owners",
    member: "stop on every Furnace stop owner: runs, attempts, supervision, host",
    source: [
      "declare const client: { runs: { stop(): void }; attempts: { stop(): void }; supervision: { stop(): void }; host: { stop(): void } };",
      "client.runs.stop();",
      "client.attempts.stop();",
      "client.supervision.stop();",
      "client.host.stop();",
    ],
    signature: ["furnace-stop client.runs.stop", "furnace-stop client.attempts.stop", "furnace-stop client.supervision.stop", "furnace-stop client.host.stop"],
  },
  {
    key: "stop-forms",
    member: "stop by element access, on an owner by element access, through an owner bound to a variable or destructured, and stop destructured from an owner",
    source: [
      "declare const furnace: { runs: { stop(id: string): void }; attempts: { stop(id: string): void } };",
      'furnace.runs["stop"]("r1");',
      'furnace["attempts"].stop("a1");',
      "const lane = furnace.runs;",
      'lane.stop("r2");',
      "const { attempts } = furnace;",
      'attempts.stop("a2");',
      "const { stop } = furnace.runs;",
      'stop("r3");',
    ],
    signature: [
      'furnace-stop furnace.runs["stop"]',
      'furnace-stop furnace["attempts"].stop',
      "furnace-stop lane.stop",
      "furnace-stop attempts.stop",
      "furnace-stop furnace.runs.stop",
    ],
  },
  {
    key: "stop-handles",
    member: "stop on a Run or Attempt handle by name (run, runX, attempt, attemptX, xRun, xAttempt) or bound to a variable",
    source: [
      "declare const run: { stop(): void }, runHandle: { stop(): void }, attempt: { stop(): void }, attemptRef: { stop(): void }, activeRun: { stop(): void }, currentAttempt: { stop(): void };",
      "run.stop();",
      "runHandle.stop();",
      "attempt.stop();",
      "attemptRef.stop();",
      "activeRun.stop();",
      "currentAttempt.stop();",
      "const held = activeRun;",
      "held.stop();",
    ],
    signature: [
      "furnace-stop run.stop",
      "furnace-stop runHandle.stop",
      "furnace-stop attempt.stop",
      "furnace-stop attemptRef.stop",
      "furnace-stop activeRun.stop",
      "furnace-stop currentAttempt.stop",
      "furnace-stop held.stop",
    ],
  },
  {
    key: "bd-read-verbs",
    member: "every bd read verb reads when it carries no writing flag: show, list, ready, blocked, search, stats, status, count, info, where, version, help, graph, doctor",
    source: BD_READ_PROBES.map(verb => `spawnSync("bd", ["${verb}"]);`),
    signature: BD_READ_PROBES.map(verb => `launch bd ${verb}`),
  },
  {
    key: "bd-write-verbs",
    member: "a bd launch writes when its verb is not a read verb, or is not a literal",
    source: [...BD_WRITE_VERBS.map(verb => `spawnSync("bd", ["${verb}"]);`), "declare const verb: string;", 'spawnSync("bd", [verb, "--json"]);'],
    signature: [...BD_WRITE_VERBS.map(verb => `launch bd ${verb}`), "launch bd --json", ...BD_WRITE_VERBS.map(verb => `bd-write bd ${verb}`), "bd-write bd --json"],
  },
  {
    key: "agent-session",
    member: "every Agent SDK session function by named and renamed import, and a session function read on a namespace import",
    source: [
      'import { query, createCodeSession, attachBridgeSession, forkSession } from "@anthropic-ai/claude-agent-sdk";',
      'import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";',
      'import * as sdk from "@anthropic-ai/claude-agent-sdk";',
      'sdk.query({ prompt: "x" });',
      'sdk.forkSession("s");',
    ],
    signature: [
      "specifier @anthropic-ai/claude-agent-sdk",
      "specifier @anthropic-ai/claude-agent-sdk",
      "specifier @anthropic-ai/claude-agent-sdk",
      "runtime-import @anthropic-ai/claude-agent-sdk",
      "runtime-import @anthropic-ai/claude-agent-sdk",
      "runtime-import @anthropic-ai/claude-agent-sdk",
      "agent-session query",
      "agent-session createCodeSession",
      "agent-session attachBridgeSession",
      "agent-session forkSession",
      "agent-session query as sdkQuery",
      "agent-session sdk.query",
      "agent-session sdk.forkSession",
    ],
  },
  {
    key: "worker",
    member: "a workflow host launched as a Worker, bare or as a namespace member",
    source: ['new Worker("./host.js");', 'new threads.Worker("./host2.js");'],
    signature: ["host-launch Worker", "host-launch threads.Worker"],
  },
  {
    key: "gp-binary",
    member: "the gp binary as a string token: bare gp, an absolute path, gp.exe and gp.cmd",
    source: ['export const bare = "gp";', 'export const absolute = "/usr/local/bin/gp";', 'export const windows = "tools/gp.exe";', 'export const shim = "gp.cmd";'],
    signature: ["gp-binary gp", "gp-binary /usr/local/bin/gp", "gp-binary tools/gp.exe", "gp-binary gp.cmd"],
  },
  {
    key: "gp-package-launch",
    member: "gp launched through the GraphPolicyCLI package: npx graph-policy-cli and node with the package's entry",
    source: ['spawnSync("npx", ["graph-policy-cli", "eval"]);', 'spawn(process.execPath, ["node_modules/graph-policy-cli/dist/main.js"]);'],
    signature: [
      "launch npx graph-policy-cli eval",
      "launch <process.execPath> node_modules/graph-policy-cli/dist/main.js",
      "gp-launch npx graph-policy-cli eval",
      "gp-launch <process.execPath> node_modules/graph-policy-cli/dist/main.js",
      "gp-family graph-policy-cli",
      "gp-family node_modules/graph-policy-cli/dist/main.js",
      "host-launch <process.execPath>",
    ],
  },
  {
    key: "gp-vocabulary",
    member: "gp wire vocabulary in code tokens: GraphDataIR, a graphpolicy.<surface>.v<n> schema id, GP_RPC_ and GP_CLI_ codes",
    source: ["export interface GraphDataIR {}", 'export const schema = "graphpolicy.rpc.v1";', 'export const timeout = "GP_RPC_TIMEOUT";', 'export const badArgs = "GP_CLI_BAD_ARGS";'],
    signature: ["gp-vocabulary GraphDataIR", "gp-vocabulary graphpolicy.rpc.v1", "gp-vocabulary GP_RPC_TIMEOUT", "gp-vocabulary GP_CLI_BAD_ARGS", "gp-family graphpolicy.rpc.v1"],
  },
  {
    key: "unknown-command",
    member: "the GP_CLI_UNKNOWN_COMMAND refusal code named",
    source: ['export const code = "GP_CLI_UNKNOWN_COMMAND";'],
    signature: ["gp-vocabulary GP_CLI_UNKNOWN_COMMAND", "names-unknown-command"],
  },
  {
    key: "train-word",
    member: "the train word in a string token, alone or inside a command line",
    source: ['spawn("gp", ["train"]);', 'export const line = "gp train --program p";'],
    signature: ["launch gp train", "gp-binary gp", "gp-launch gp train", "train train", "train gp train --program p"],
  },
  {
    key: "dynamic-load",
    member: "import() and require() of a computed specifier",
    source: ["declare const name: string;", "export const loaded = import(name);", "export const required = require(name);"],
    signature: ["dynamic-load import(name)", "dynamic-load require(name)"],
  },
  {
    key: "gp-family",
    member: "a GraphPolicyCLI family name in a module specifier and in an identifier",
    source: ['import { client } from "@acme/graph_policy";', "export const graphPolicyClient = client;"],
    signature: ["specifier @acme/graph_policy", "runtime-import @acme/graph_policy", "gp-family @acme/graph_policy", "gp-family graphPolicyClient"],
  },
  {
    key: "bd-writing-flags",
    member: "a bd read verb with a writing flag writes (bd 1.1.0-rc.1 help): ready --claim, doctor --fix, doctor --fix-child-parent and doctor --clean, bare or in --flag=value form, anywhere in the argv; a word that only begins with one (--claimed, --fixes, --cleanup) is not one",
    source: [
      'spawnSync("bd", ["ready", "--claim", "--json"]);',
      'spawnSync("bd", ["ready", "--claim=true"]);',
      'spawnSync("bd", ["doctor", "--fix", "--yes"]);',
      'spawnSync("bd", ["doctor", "--fix=true"]);',
      'spawnSync("bd", ["doctor", "--fix-child-parent"]);',
      'spawnSync("bd", ["doctor", "--check=pollution", "--clean"]);',
      'spawnSync("bd", ["ready", "--json"]);',
      'spawnSync("bd", ["doctor", "--dry-run", "--check=validate"]);',
      'spawnSync("bd", ["ready", "--claimed"]);',
      'spawnSync("bd", ["doctor", "--fixes", "--cleanup"]);',
    ],
    signature: [
      "launch bd ready --claim --json",
      "launch bd ready --claim=true",
      "launch bd doctor --fix --yes",
      "launch bd doctor --fix=true",
      "launch bd doctor --fix-child-parent",
      "launch bd doctor --check=pollution --clean",
      "launch bd ready --json",
      "launch bd doctor --dry-run --check=validate",
      "launch bd ready --claimed",
      "launch bd doctor --fixes --cleanup",
      "bd-write bd ready --claim --json",
      "bd-write bd ready --claim=true",
      "bd-write bd doctor --fix --yes",
      "bd-write bd doctor --fix=true",
      "bd-write bd doctor --fix-child-parent",
      "bd-write bd doctor --check=pollution --clean",
    ],
  },
  {
    key: "bd-verb-after-flags",
    member: "a bd launch's verb is its first lowercase word, so leading flags are skipped: bd --json show reads, bd -q close writes",
    source: ['spawnSync("bd", ["--json", "show", "wb-a"]);', 'spawnSync("bd", ["-q", "close", "wb-b"]);'],
    signature: ["launch bd --json show wb-a", "launch bd -q close wb-b", "bd-write bd -q close wb-b"],
  },
  {
    key: "shell-groupings",
    member: "a command in a subshell ( ), a $( ) or a backtick command substitution, outside quotes, is a simple command of its own; parentheses inside quotes stay text",
    source: ['execSync("(bd close wb-a)");', 'execSync("echo $(bd update wb-b)");', 'execSync("echo `bd delete wb-c`");', "execSync(\"bd show '(wb-d)'\");"],
    signature: [
      "launch bd close wb-a",
      "launch echo $",
      "launch bd update wb-b",
      "launch echo",
      "launch bd delete wb-c",
      "launch bd show (wb-d)",
      "bd-write bd close wb-a",
      "bd-write bd update wb-b",
      "bd-write bd delete wb-c",
    ],
  },
  {
    key: "shell-reserved-words",
    member: "a command a shell reserved word opens (!, {, if, then, elif, else, do, while, until) with the word skipped, the closing }, fi, done and esac running nothing, and a reserved word after a command's first word kept as an argument",
    source: [
      'execSync("if bd show wb-a; then bd close wb-b; elif true; then bd update wb-c; else bd delete wb-d; fi");',
      'execSync("while true; do bd reopen wb-e; done; until false; do bd label wb-f; done");',
      'execSync("! bd edit wb-g; { bd comment wb-h; }");',
      'execSync("case x in a) bd close wb-i;; esac");',
      'execSync("echo then bd close wb-z");',
    ],
    signature: [
      "launch bd show wb-a",
      "launch bd close wb-b",
      "launch true",
      "launch bd update wb-c",
      "launch bd delete wb-d",
      "launch true",
      "launch bd reopen wb-e",
      "launch false",
      "launch bd label wb-f",
      "launch bd edit wb-g",
      "launch bd comment wb-h",
      "launch case x in a",
      "launch bd close wb-i",
      "launch echo then bd close wb-z",
      "bd-write bd close wb-b",
      "bd-write bd update wb-c",
      "bd-write bd delete wb-d",
      "bd-write bd reopen wb-e",
      "bd-write bd label wb-f",
      "bd-write bd edit wb-g",
      "bd-write bd comment wb-h",
      "bd-write bd close wb-i",
    ],
  },
  {
    key: "shell-exec",
    member: "a command behind the exec builtin, with exec's options skipped: -c, -l and -a with its name",
    source: ['execSync("exec bd close wb-a");', 'execSync("exec -a closer bd update wb-b");', 'execSync("exec -cl bd delete wb-c");'],
    signature: ["launch bd close wb-a", "launch bd update wb-b", "launch bd delete wb-c", "bd-write bd close wb-a", "bd-write bd update wb-b", "bd-write bd delete wb-c"],
  },
  {
    key: "shell-env-options",
    member: "env, bare or by path, with its options before the command: a flag such as -i, - or --ignore-environment, -u, -C, --unset and --chdir with their value or in --option=value form, then NAME=value assignments",
    source: [
      'execSync("env -u CLAUDECODE bd close wb-a");',
      'execSync("env -i PATH=/usr/bin bd update wb-b");',
      'execSync("env --unset CLAUDECODE --chdir /repo bd delete wb-c");',
      'execSync("env --unset=CLAUDECODE -C /repo bd label wb-d");',
      'execSync("/usr/bin/env - BEADS_ACTOR=machine bd reopen wb-e");',
    ],
    signature: [
      "launch bd close wb-a",
      "launch bd update wb-b",
      "launch bd delete wb-c",
      "launch bd label wb-d",
      "launch bd reopen wb-e",
      "bd-write bd close wb-a",
      "bd-write bd update wb-b",
      "bd-write bd delete wb-c",
      "bd-write bd label wb-d",
      "bd-write bd reopen wb-e",
    ],
  },
  {
    key: "binary-suffixes",
    member: "a roster binary named with a .exe or .cmd suffix, bare or by path: bd.exe, furnace.cmd, pkill.exe, a shell (bash.exe) whose -c script is followed, and an argv array headed by one",
    source: [
      'spawnSync("bd.exe", ["close", "wb-a"]);',
      'spawnSync("tools/furnace.cmd", ["run", "stop", "frn-run-a"]);',
      'spawnSync("pkill.exe", ["w"]);',
      'spawnSync("bash.exe", ["-c", "bd update wb-b"]);',
      'export const argv = ["bd.exe", "delete", "wb-c"];',
    ],
    signature: [
      "launch bd.exe close wb-a",
      "launch tools/furnace.cmd run stop frn-run-a",
      "launch pkill.exe w",
      "launch bash.exe -c bd update wb-b",
      "launch bd update wb-b",
      "launch bd.exe delete wb-c",
      "process-kill pkill",
      "furnace-stop furnace run stop frn-run-a",
      "bd-write bd close wb-a",
      "bd-write bd update wb-b",
      "bd-write bd delete wb-c",
    ],
  },
  {
    key: "unwrap-forms",
    member: "process read through each wrapper the census unwraps beside parentheses and as: satisfies, an angle-bracket assertion and a non-null assertion, on a member read and on a variable initializer",
    source: ["(process satisfies NodeJS.Process).kill(1);", "(<NodeJS.Process>process).kill(2);", "process!.kill(3);", "const proc = process!;", "proc.kill(4);"],
    signature: ["process-kill (process satisfies NodeJS.Process).kill", "process-kill (<NodeJS.Process>process).kill", "process-kill process!.kill", "process-kill proc.kill"],
  },
  {
    key: "exec-template-head",
    member: "exec, like execSync, runs a templated command line read by its static head",
    source: ["declare const id: string;", `exec(\`bd close \${id}\`);`],
    signature: ["launch bd close", "bd-write bd close"],
  },
  {
    key: "script-depth",
    member: "a shell's -c script followed four shells deep: sh runs bash, bash runs zsh, zsh runs dash and dash runs the command",
    source: [`spawnSync("sh", ["-c", "bash -c 'zsh -c \\"dash -c pkill\\"'"]);`],
    signature: ["launch sh -c bash -c 'zsh -c \"dash -c pkill\"'", 'launch bash -c zsh -c "dash -c pkill"', "launch zsh -c dash -c pkill", "launch dash -c pkill", "launch pkill", "process-kill pkill"],
  },
  {
    key: "private-names",
    member: "a GraphPolicyCLI family name and gp wire vocabulary in a private class member name (#graphPolicy, #GraphDataIR)",
    source: ["export class Holder {", "  #graphPolicy = 1;", "  #GraphDataIR = 2;", "}"],
    signature: ["gp-vocabulary #GraphDataIR", "gp-family #graphPolicy"],
  },
  {
    key: "template-parts",
    member: "the train word in a template literal's static head, middle and tail",
    source: ["declare const program: string;", `export const head = \`gp train --program=\${program}\`;`, `export const middle = \`\${program}/train/\${program}\`;`, `export const tail = \`\${program}/train\`;`],
    signature: ["train gp train --program=", "train /train/", "train /train"],
  },
  {
    key: "type-only-launcher",
    member: "a launcher name imported type-only (import { type spawnSync as run }) binds no launcher, so a call through that name records no launch",
    source: ['import { type spawnSync as run } from "node:child_process";', 'run("bd", ["close", "wb-a"]);'],
    signature: ["specifier node:child_process", "runtime-import node:child_process"],
  },
];

/** One probe name per member of the TRAINING_FRAMEWORKS deny roster, in roster order, and names one character off it. */
const TRAINING_PROBES: readonly string[] = [
  "tensorflow",
  "tfjs",
  "onnxruntime-node",
  "torch",
  "pytorch",
  "brain.js",
  "synaptic",
  "ml5",
  "keras",
  "xgboost",
  "lightgbm",
  "catboost",
  "scikit-learn",
  "sklearn",
  "@xenova/transformers",
  "@mlc-ai/web-llm",
];
const TRAINING_NEAR_MISSES: readonly string[] = ["torchlight", "synaptics", "kerasx"];

const F_TITLE = "F: %s is named by exactly the expected pin(s)";
const Q_TITLE = "Q: named residual %s stays quiet (the pinned blind spot of a token census)";
const DT_TITLE = "DT: detector %s is live on its probe (the exact census signature)";
const titleOf = (template: string, key: string): string => template.replace("%s", key);
const TALLY_TITLE =
  "L: each-liveness (rule 16, U5) - every case of this file is set to run, the case count is frozen, each case is registered as the out-of-file roster lists it, each it.each registers exactly its frozen keys, every registered case reached its last assertion, every class-level residual member the roster lists was read, and this tally is the file's last case";

/**
 * EACH-LIVENESS (U5): the case keys each it.each table registers, frozen literally at this cut - never derived from ROWS,
 * RESIDUALS or DETECTORS - so a table thinned or emptied at its it.each call, or a row dropped from its table, reds the tally.
 */
const REGISTERED = {
  F: [
    "GP-1/a1 an unregistered module launches gp",
    "GP-1/a1 an unregistered module runs the GraphPolicyCLI package through npx",
    "GP-1/a1 a registered client reaches gp through no real interface",
    "GP-1/a1 the registered client imports a GraphPolicyCLI fork",
    "GP-1/a1 an unregistered module imports the GraphPolicyCLI package",
    "GP-1/a1 an unregistered module imports GraphPolicyCLI types only",
    "GP-1/a1 a registered client names a module the tree does not hold",
    "GP-1/a2 the client's gp argv carries train",
    "GP-1/a3 the admission seam imports the telemetry writer",
    "GP-1/a3 the admission seam imports a training framework",
    "GP-1/a3 the admission seam builds a train argv itself",
    "GP-1/a4 the decision module launches a workflow host",
    "GP-1/a4 the registered client is itself an execution seam",
    "GP-2/b1 an unregistered module scores a GraphDataIR document",
    "GP-2/b2 the client drops its unknown-command mapping",
    "GP-3/c1 the client imports an unrelated package",
    "GP-3/c1 the client loads a package by a computed name",
    "GP-3/c2 the manifest declares a training framework",
    "GP-3/c2 the manifest declares a GraphPolicyCLI fork",
    "GP-4/d1 the decision module kills a worker",
    "GP-4/d1 the decision module destructures kill from process",
    "GP-4/d1 the decision module imports kill from node:process",
    "GP-4/d1 the decision module kills through a default import of node:process",
    "GP-4/d2 the decision module closes a bead",
    "GP-4/d2 the decision module closes a bead through a templated shell command",
    "GP-4/d2 the decision module closes a bead through a shell command",
    "GP-4/d2 the decision module closes a bead behind an environment assignment",
    "GP-4/d2 the decision module closes a bead through sh -c",
    "GP-4/d2 the decision module claims a bead through bd ready --claim",
    "GP-4/d2 the decision module repairs the store through bd doctor --fix",
    "GP-4/d3 the decision module stops an Attempt itself",
    "GP-4/d3 the decision module stops a Run through its handle",
    "GP-4/d3 the decision module stops a Run by element access",
    "GP-4/d3 the decision module stops a Run through a bound stop owner",
  ],
  Q: [
    "UNNAMED-NUMERICS",
    "LOCAL-SUBSTITUTE",
    "COMPUTED-BINARY",
    "DYNAMIC-ARGV",
    "ALIASED-EFFECT",
    "TRAINING-FRAMEWORK-ROSTER",
    "WRAPPED-COMMAND",
    "FOREIGN-LAUNCHER",
    "QUOTED-SUBSTITUTION",
    "COMPUTED-BD-FLAG",
    "SHELL-BUILTIN-WRAPPER",
    "MISREAD-COMMAND-WORD",
  ],
  DT: [
    "specifiers",
    "launchers",
    "launcher-bindings",
    "binary-resolution",
    "argv-arrays",
    "shell-lines",
    "shell-c-scripts",
    "shell-heads",
    "kill-accesses",
    "kill-bindings",
    "process-bindings",
    "stop-owners",
    "stop-forms",
    "stop-handles",
    "bd-read-verbs",
    "bd-write-verbs",
    "agent-session",
    "worker",
    "gp-binary",
    "gp-package-launch",
    "gp-vocabulary",
    "unknown-command",
    "train-word",
    "dynamic-load",
    "gp-family",
    "bd-writing-flags",
    "bd-verb-after-flags",
    "shell-groupings",
    "shell-reserved-words",
    "shell-exec",
    "shell-env-options",
    "binary-suffixes",
    "unwrap-forms",
    "exec-template-head",
    "script-depth",
    "private-names",
    "template-parts",
    "type-only-launcher",
  ],
} as const satisfies Readonly<Record<"F" | "Q" | "DT", readonly string[]>>;
/** Every case this file registers: 22 fixed cases, the three it.each tables and the closing tally. */
const FILE_CASES = 109;
/** What this run's it.each cases did, recorded by each case at its last line; the closing tally pins every list. */
const RAN: Record<"F" | "Q" | "DT", string[]> = { F: [], Q: [], DT: [] };
/** The class-level residual members the Q rows read this run (residual/member), each recorded after its control (wb-nh0t F2). */
const MEMBERS_READ: string[] = [];

/** One node of vitest's task tree, as far as the tally reads it. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode?: string;
  readonly tasks?: readonly TaskNode[];
}
/** Every test case vitest registered in this file, in registration order, with its run mode, read from the runner's own task tree. */
function registeredTests(tasks: readonly TaskNode[]): { readonly name: string; readonly mode: string | undefined }[] {
  return tasks.flatMap(child => (child.type === "test" ? [{ name: child.name, mode: child.mode }] : child.type === "suite" ? registeredTests(child.tasks ?? []) : []));
}

/** The live-tree rows parse every src module (115+ TypeScript ASTs) once per run: a budget above vitest's 5 s default at gate load (gate F4). */
const LIVE_BUDGET_MS = 60_000;
let liveMemo: { readonly tree: SourceTree; readonly ctx: JudgeContext } | undefined;
/** The live tree and its judge context, built once per run and shared by every R0 row. */
function live(): { readonly tree: SourceTree; readonly ctx: JudgeContext } {
  if (liveMemo !== undefined) return liveMemo;
  const files: string[] = [];
  const walk = (dir: string): void => {
    for (const name of readdirSync(dir).sort()) {
      if (SKIPPED_DIRS.has(name)) continue;
      const full = join(dir, name);
      const info = statSync(full);
      if (info.isDirectory()) walk(full);
      else if (info.isFile() && SOURCE_EXTENSIONS.has(posix.extname(name))) files.push(full);
    }
  };
  walk(join(ROOT, "src"));
  const modules = new Map(files.map(full => [relative(ROOT, full).split(sep).join("/"), readFileSync(full, "utf8")] as const));
  const tree: SourceTree = { modules, manifest: JSON.parse(readFileSync(join(ROOT, MANIFEST), "utf8")) as Manifest };
  liveMemo = { tree, ctx: contextOf(tree, GP_SEAMS) };
  return liveMemo;
}

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** A rule bullet's markdown, as docs/03 writes it: the bold id and label, then its clauses joined by semicolons. */
const ruleMarkdown = (row: Row): string => `**${row.id} ${row.label}:** ${row.pins.map(pin => pin.clause).join("; ")}.`;
/** What a reader sees of a rule bullet: the bold markers and the code-span backticks render no text. */
const renderedRule = (row: Row): string => ruleMarkdown(row).replace(/\*\*|`/g, "");
const residualLine = (): string => `Named residuals, each pinned by a quiet row that the census keeps silent: ${RESIDUALS.map(residual => `${residual.id} (${residual.family})`).join("; ")}.`;
/** docs/03 section "GraphPolicyCLI boundary", block by block as a reader sees it (sectionMatches pins the whole list). */
const boundaryBlocks = (): RenderedBlock[] => [
  { kind: "paragraph", text: BOUNDARY_INTRO, markdown: BOUNDARY_INTRO },
  { kind: "list", ordered: false, items: ROWS.map(row => ({ text: renderedRule(row), markdown: ruleMarkdown(row) })) },
  { kind: "paragraph", text: residualLine(), markdown: residualLine() },
];
const boundarySection = (): ReturnType<typeof docsSection> => docsSection(readRepo(DOCS_03), BOUNDARY_HEADING, 2, [PAGE_TITLE]);
const RESIDUAL_ENTRY = /([A-Z][A-Z-]*[A-Z]) \(([^)]+)\)/g;

/**
 * A residual family's enumerated shapes (wb-yxkq F1), read from the family text alone: the enumeration follows the family's
 * first ": "; it parts into groups at each ", " that opens an article ("a ", "an " or "the ", alone or after "or "); a group
 * names its shapes after its last "such as", "spelled" or "as in", or between "the" and its closing noun ("the time, coproc
 * or function keyword"); and the shapes part at ", " and " or ". A group that names none is returned in unread, never
 * dropped; a family with no colon enumerates nothing.
 */
const FAMILY_GROUPS = /, (?=(?:or )?(?:an?|the) )/;
const CUED_SHAPES = /^.* (?:such as|spelled|as in) (.+)$/;
const NOUNED_SHAPES = /^the (.+) [a-z]+$/;
const SHAPE_PARTS = /, | or /;
function familyShapesOf(family: string): { readonly shapes: readonly string[]; readonly unread: readonly string[] } {
  const colon = family.indexOf(": ");
  if (colon < 0) return { shapes: [], unread: [] };
  const shapes: string[] = [];
  const unread: string[] = [];
  for (const group of family.slice(colon + 2).split(FAMILY_GROUPS)) {
    const listed = CUED_SHAPES.exec(group)?.[1] ?? NOUNED_SHAPES.exec(group)?.[1];
    if (listed === undefined) unread.push(group);
    else shapes.push(...listed.split(SHAPE_PARTS));
  }
  return { shapes, unread };
}
/** Whether a member's named words carry a shape: the shape's words as one contiguous run of whole words (so >/dev/null is not 2>/dev/null). */
function namesShape(named: string, shape: string): boolean {
  const words = named.split(" ");
  const run = shape.split(" ");
  return words.some((_, start) => run.every((word, offset) => words[start + offset] === word));
}

/**
 * A residual member's statement or control as plain words (wb-yxkq F2), read without the census's own launch reading: the
 * callee of its one call, then its first argument - a shell line split at white space, or a binary followed by its argv
 * array's elements. Any other shape (a second statement, a non-literal argument, a third argument) reads as no words.
 */
function statementWordsOf(statement: string): readonly string[] {
  const source = ts.createSourceFile("member.ts", statement, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const [only] = source.statements;
  if (source.statements.length !== 1 || only === undefined || !ts.isExpressionStatement(only) || !ts.isCallExpression(only.expression)) return [];
  const callee = calleeName(only.expression.expression);
  const [first, argv, ...rest] = only.expression.arguments;
  const head = literalText(first);
  if (callee === undefined || head === undefined || rest.length > 0) return [];
  if (argv === undefined) return [callee, ...head.split(/\s+/).filter(word => word !== "")];
  if (!ts.isArrayLiteralExpression(argv)) return [];
  const words = argv.elements.map(element => literalText(element));
  return words.every(word => word !== undefined) ? [callee, head, ...words] : [];
}
/**
 * Whether a residual member's statement launches a shape first (wb-mpmm F1): its words after the callee, as
 * statementWordsOf reads them, begin with the shape's words, whole word for whole word. A class-level member measures the
 * command word its family names, so the shape opens the launch; one carried behind another word (nohup coproc bd close)
 * leaves the launch's quiet reading to that word. A statement read as no words launches no shape.
 */
function launchBeginsWith(statement: string, shape: string): boolean {
  const [, ...launch] = statementWordsOf(statement);
  return shape.split(" ").every((word, offset) => launch[offset] === word);
}
/** Whether one word moved: taking the same word out of each leaves the same words in the same order. */
function movedOneWord(statement: readonly string[], control: readonly string[]): boolean {
  const without = (words: readonly string[], index: number): string => JSON.stringify(words.filter((_, at) => at !== index));
  return statement.some((word, from) => control.some((other, to) => other === word && without(statement, from) === without(control, to)));
}
/**
 * Whether a control is one change away from its statement (wb-yxkq F2): the word lists differ, and either they differ in
 * one contiguous run where at most two of the statement's words give way to at most one word (a word dropped, inserted or
 * respelled, two words rejoined), or one word moved. A wider run, two separate changes or an identical control is not one.
 */
function oneChangeAway(statement: readonly string[], control: readonly string[]): boolean {
  if (statement.length === 0 || control.length === 0 || JSON.stringify(statement) === JSON.stringify(control)) return false;
  let prefix = 0;
  while (prefix < statement.length && prefix < control.length && statement[prefix] === control[prefix]) prefix += 1;
  let suffix = 0;
  while (
    suffix < statement.length - prefix &&
    suffix < control.length - prefix &&
    statement[statement.length - 1 - suffix] === control[control.length - 1 - suffix]
  ) {
    suffix += 1;
  }
  const removed = statement.length - prefix - suffix;
  const added = control.length - prefix - suffix;
  return (removed <= 2 && added <= 1) || movedOneWord(statement, control);
}
/**
 * Whether a class-level member's control differs from its statement in the shape's run alone (wb-zj42 F1): both call the
 * same launcher, the statement's launch opens with the shape's run, and its words after the run (the tail, as
 * statementWordsOf reads them) stay word for word in the control, which spells the run in one of four forms - dropped
 * (the tail alone), changed by one change (oneChangeAway) into the words ahead of the tail, moved behind the tail when the
 * run is one word, or, for the function keyword, rejoined with the name it defines (function f as f()). Any other
 * control - a tail changed, a word behind the run dropped or respelled with it, another launcher - is not one.
 */
function shapeRunTied(statement: string, control: string, shape: string): boolean {
  const [callee, ...launch] = statementWordsOf(statement);
  const [controlCallee, ...paired] = statementWordsOf(control);
  const run = shape.split(" ");
  if (callee === undefined || controlCallee !== callee || !run.every((word, offset) => launch[offset] === word)) return false;
  const tail = launch.slice(run.length);
  const same = (words: readonly string[], other: readonly string[]): boolean => JSON.stringify(words) === JSON.stringify(other);
  const ahead = paired.slice(0, paired.length - tail.length);
  const keepsTail = paired.length >= tail.length && same(paired.slice(ahead.length), tail);
  const [name, ...body] = tail;
  return (
    (keepsTail && (ahead.length === 0 || oneChangeAway(run, ahead))) ||
    (run.length === 1 && same(paired, [...tail, ...run])) ||
    (shape === "function" && name !== undefined && same(paired, [`${name}()`, ...body]))
  );
}
/** A shape whose first word names the bd binary itself: bd in any letter case, alone or with one dotted suffix (BD.EXE, bd.bat, bd --actor doctor close). */
const OWN_BINARY = /^bd(?:\.[a-z]+)?$/i;
/**
 * Whether a shape that carries no bd binary of its own is followed by bd in a member's statement (wb-zj42 F1, the gate's
 * second cure): the launch opens with the shape's run and its next word is bd, exactly. A shape whose first word names
 * the bd binary (OWN_BINARY) carries it, and the function keyword is followed by the name it defines, which
 * shapeRunTied's rejoin holds; neither is read here.
 */
function followedByBd(statement: string, shape: string): boolean {
  const run = shape.split(" ");
  if (OWN_BINARY.test(run[0] ?? "") || shape === "function") return true;
  const [, ...launch] = statementWordsOf(statement);
  return run.every((word, offset) => launch[offset] === word) && launch[run.length] === "bd";
}
/**
 * Where docs/03's residual line and a residual table disagree on members (wb-yxkq F1): for each residual the line names,
 * each shape its family enumerates that names other than exactly one member, each member named by other than exactly one
 * shape, members out of the family's order, and each group of a class-level family that the grammar cannot read. Empty
 * when they agree; a single-shape residual agrees when its family enumerates nothing.
 */
function memberMismatches(line: string, residuals: readonly Residual[]): string[] {
  const problems: string[] = [];
  for (const [, id = "", family = ""] of line.matchAll(RESIDUAL_ENTRY)) {
    const members = residuals.find(residual => residual.id === id)?.members ?? [];
    const { shapes, unread } = familyShapesOf(family);
    const byShape = shapes.map(shape => members.filter(member => namesShape(member.named, shape)));
    byShape.forEach((named, index) => {
      if (named.length !== 1) problems.push(`${id}: shape ${shapes[index]} names ${named.map(member => member.name).join(" | ") || "no member"}`);
    });
    for (const member of members) {
      const count = byShape.filter(named => named.includes(member)).length;
      if (count !== 1) problems.push(`${id}: member ${member.name} is named by ${count} shapes`);
    }
    const order = byShape.flatMap(named => (named.length === 1 ? named.map(member => member.name) : []));
    const table = members.map(member => member.name).filter(name => order.includes(name));
    if (JSON.stringify(order) !== JSON.stringify(table)) problems.push(`${id}: members out of the family's order`);
    if (members.length > 0) for (const group of unread) problems.push(`${id}: unread group ${group}`);
  }
  return problems;
}
/**
 * Where docs/03's residual line and the launches a residual's members measure disagree (wb-mpmm F1): for each residual
 * the line names, each shape its family enumerates that names exactly one member by its named words, when that member's
 * statement does not launch the shape first (launchBeginsWith), and each member whose statement reads as the same words
 * (statementWordsOf) as an earlier member's. So every member measures the shape docs/03 names it by, and no two members
 * measure one launch. Empty when they agree; a shape naming other than exactly one member is memberMismatches' to report.
 */
function statementMismatches(line: string, residuals: readonly Residual[]): string[] {
  const problems: string[] = [];
  for (const [, id = "", family = ""] of line.matchAll(RESIDUAL_ENTRY)) {
    const members = residuals.find(residual => residual.id === id)?.members ?? [];
    for (const shape of familyShapesOf(family).shapes) {
      const named = members.filter(member => namesShape(member.named, shape));
      const owner = named.length === 1 ? named[0] : undefined;
      if (owner !== undefined && !launchBeginsWith(owner.statement, shape)) problems.push(`${id}: the launch ${owner.name} measures does not begin with ${shape}, the shape docs/03 names it by`);
    }
    const launches = members.map(member => JSON.stringify(statementWordsOf(member.statement)));
    members.forEach((member, index) => {
      const earlier = members[launches.indexOf(launches[index] ?? "")];
      if (earlier !== undefined && earlier !== member) problems.push(`${id}: ${member.name} measures the same launch as ${earlier.name}`);
    });
  }
  return problems;
}
/**
 * Where docs/03's residual line and the pairings a residual's members measure disagree (wb-zj42 F1): for each residual the
 * line names, each shape its family enumerates that names exactly one member by its named words, when that member's
 * control differs from its statement beyond the shape's run (shapeRunTied), and when that shape, carrying no bd binary of
 * its own, is not followed by bd in the statement (followedByBd). So a member's statement differs from its control in the
 * shape's run alone, and a shape carrying no bd binary, the function keyword excepted, opens a launch whose next word is
 * bd. Empty when they agree; a shape naming other than exactly one member is memberMismatches' to report.
 */
function isolationMismatches(line: string, residuals: readonly Residual[]): string[] {
  const problems: string[] = [];
  for (const [, id = "", family = ""] of line.matchAll(RESIDUAL_ENTRY)) {
    const members = residuals.find(residual => residual.id === id)?.members ?? [];
    for (const shape of familyShapesOf(family).shapes) {
      const named = members.filter(member => namesShape(member.named, shape));
      const owner = named.length === 1 ? named[0] : undefined;
      if (owner === undefined) continue;
      if (!shapeRunTied(owner.statement, owner.control, shape)) problems.push(`${id}: the control of ${owner.name} changes more than ${shape}, the shape docs/03 names it by`);
      if (!followedByBd(owner.statement, shape)) problems.push(`${id}: ${shape} is not followed by bd in the launch ${owner.name} measures`);
    }
  }
  return problems;
}
/**
 * What a class-level member's paired control fails of its pairing (wb-yxkq F2), read independently of its pinned
 * controlWrites: the census itself reads no bd write in the control, or the control is not one change away from its
 * statement. Empty when the control is a live pair.
 */
function pairingProblems(member: ResidualMember): string[] {
  const control = moduleCensus("src/workbench/probe.ts", `${MEMBER_HEAD}\n${member.control}`);
  return [
    ...(control.bdWrite.length > 0 ? [] : [`${member.name}: the census reads no bd write in the control`]),
    ...(oneChangeAway(statementWordsOf(member.statement), statementWordsOf(member.control)) ? [] : [`${member.name}: the control is not one change away from its statement`]),
  ];
}

/** The census tables as the roster lists them: rows with pins, clauses and falsifier expectations, residuals, detector probes by SHA-256. */
interface RosterResidual {
  readonly id: string;
  readonly family: string;
  readonly members?: readonly { readonly name: string }[];
}
interface Roster {
  readonly census: string;
  readonly bead: string;
  readonly rows: readonly unknown[];
  readonly residuals: readonly RosterResidual[];
  readonly detectors: readonly unknown[];
  readonly registered: readonly string[];
}
const readRoster = (): Roster => JSON.parse(readRepo(ROSTER)) as Roster;
const sha256 = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const rosterRows = (): unknown[] =>
  ROWS.map(row => ({ id: row.id, label: row.label, pins: row.pins.map(pin => ({ id: pin.id, clause: pin.clause, falsifiers: pin.falsifiers.map(falsifier => ({ name: falsifier.name, expected: falsifier.expected })) })) }));
const rosterResiduals = (): unknown[] =>
  RESIDUALS.map(residual => ({
    id: residual.id,
    family: residual.family,
    ...(residual.members === undefined ? {} : { members: residual.members.map(member => ({ ...member })) }),
  }));
/** The ownership rows that speak for the GraphPolicyCLI concern: each body row with a cell naming one of CONCERN_TERMS. */
function concernRows(page: string): { readonly why: string; readonly rows: readonly (readonly string[])[] } {
  const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
  return { why: tables.why, rows: tables.grids.flatMap(grid => grid.slice(1).filter(row => row.some(cell => CONCERN_TERMS.some(term => cell.toLowerCase().includes(term))))) };
}
const rosterDetectors = (): unknown[] => DETECTORS.map(probe => ({ key: probe.key, member: probe.member, probe: sha256({ source: probe.source, signature: probe.signature }) }));

const FALSIFIER_CASES = ROWS.flatMap(row => row.pins.flatMap(pin => pin.falsifiers.map(falsifier => [`${row.id}/${pin.id} ${falsifier.name}`, `${row.id}/${pin.id}`, falsifier] as const)));
const RESIDUAL_CASES = RESIDUALS.map(residual => [residual.id, residual] as const);
const DETECTOR_CASES = DETECTORS.map(probe => [probe.key, probe] as const);

describe("wb-1xvp.2: Pi reaches GraphPolicyCLI only through its real interfaces (RF-GRAPH-POLICY-MACHINE-CONTROL-R1)", () => {
  it(
    "R0: the census reads every src module (an independent recursive listing agrees)",
    () => {
      const { tree } = live();
      const listed = readdirSync(join(ROOT, "src"), { recursive: true, withFileTypes: true })
        .filter(entry => entry.isFile() && SOURCE_EXTENSIONS.has(posix.extname(entry.name)))
        .map(entry => relative(ROOT, join(entry.parentPath, entry.name)).split(sep).join("/"))
        .sort();
      expect([...tree.modules.keys()].sort()).toEqual(listed);
      expect(listed.length).toBeGreaterThan(100);
    },
    LIVE_BUDGET_MS,
  );

  it(
    "R0: the live gp roster is empty - no gp binary, GraphPolicyCLI name or specifier, gp vocabulary or unknown-command name in any src module, none in package.json, no gp seam registered (frozen)",
    () => {
      const { tree, ctx } = live();
      const roster = [...ctx.census.values()].flatMap(entry => [
        ...entry.gpBinary.map(found => `${entry.file}:${found.line} binary ${found.text}`),
        ...entry.specifiers.filter(specifier => GP_FAMILY.test(specifier)).map(specifier => `${entry.file} specifier ${specifier}`),
        ...entry.gpVocabulary.map(found => `${entry.file}:${found.line} vocabulary ${found.text}`),
        ...entry.gpFamily.map(found => `${entry.file}:${found.line} family ${found.text}`),
        ...(entry.namesUnknownCommand ? [`${entry.file} names ${UNKNOWN_COMMAND}`] : []),
      ]);
      expect(roster).toEqual([]);
      expect(ALL_SECTIONS.flatMap(section => namesIn(tree.manifest, section).filter(name => GP_FAMILY.test(name) || TRAINING_FRAMEWORKS.test(name)))).toEqual([]);
      expect(GP_SEAMS).toEqual([]);
    },
    LIVE_BUDGET_MS,
  );

  it(
    "R0: the live tree judges clean under every pin",
    () => {
      expect(judgeContext(live().ctx)).toEqual([]);
    },
    LIVE_BUDGET_MS,
  );

  it(
    "R0: the census is not blind on the live tree - it sees the known launch, kill, stop, agent-session and host-launch sites and the real manifest",
    () => {
      const { tree, ctx } = live();
      const launches = [...ctx.census.values()].flatMap(entry => entry.launches.map(launch => `${entry.file} ${launch.binary}`));
      expect(launches).toEqual(
        expect.arrayContaining(["src/index.ts git", "src/workbench/providers/forge.ts forge", "src/workbench/providers/reactivefiber.ts rf", "src/workbench/hosts/local-detached.ts <process.execPath>"]),
      );
      expect(ctx.executionSeams).toEqual(
        expect.arrayContaining(["src/schedule-store.ts", "src/workbench/furnace-control.ts", "src/workbench/claude-host.ts", "src/workflow/runtime.ts", "src/workbench/hosts/local-detached.ts"]),
      );
      expect(ctx.decisionPath).toEqual([]);
      expect(ctx.adjacent).toEqual([]);
      const writer = readRepo(TELEMETRY_WRITERS[0] ?? "");
      expect(writer).toContain("export interface TelemetrySink");
      expect(writer).toContain("export function emitOperationsTelemetry(");
      expect(namesIn(tree.manifest, "dependencies")).toEqual(expect.arrayContaining(["@furnace/sdk", "@hyperunix/sdk"]));
    },
    LIVE_BUDGET_MS,
  );

  it("S: the census tables keep their frozen shape - rule rows, pins and falsifier counts, residual ids, detector keys, and every pin has a falsifier (rule 16)", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.map(pin => `${pin.id}x${pin.falsifiers.length}`).join(",")}`)).toEqual([
      "GP-1:a1x7,a2x1,a3x3,a4x2",
      "GP-2:b1x1,b2x1",
      "GP-3:c1x2,c2x2",
      "GP-4:d1x4,d2x7,d3x4",
    ]);
    expect(RESIDUALS.map(residual => residual.id)).toEqual(REGISTERED.Q);
    expect(RESIDUALS.flatMap(residual => (residual.members ?? []).map(member => `${residual.id}/${member.name}`)), "class-level residual members").toEqual([
      "MISREAD-COMMAND-WORD/P06 a leading redirection",
      "MISREAD-COMMAND-WORD/P07 a leading descriptor redirection",
      "MISREAD-COMMAND-WORD/P05 the time keyword",
      "MISREAD-COMMAND-WORD/P32 the coproc keyword",
      "MISREAD-COMMAND-WORD/P08 the function keyword",
      "MISREAD-COMMAND-WORD/P11 an upper-case .EXE spelling",
      "MISREAD-COMMAND-WORD/P12 a .bat spelling",
      "MISREAD-COMMAND-WORD/P17 a global flag value read as the verb",
    ]);
    expect(DETECTORS.map(probe => probe.key)).toEqual(REGISTERED.DT);
    expect(ROWS.flatMap(row => row.pins.filter(pin => pin.falsifiers.length === 0).map(pin => `${row.id}/${pin.id}`)), "pins no falsifier proves live").toEqual([]);
  });

  it("S: the census tables equal the out-of-file roster - every rule row, pin, clause and falsifier expectation, every residual, every detector member and the SHA-256 of its probe", () => {
    const roster = readRoster();
    expect([roster.census, roster.bead]).toEqual([CENSUS_FILE, "wb-1xvp.2"]);
    expect(rosterRows(), "rule rows").toEqual(roster.rows);
    expect(rosterResiduals(), "residuals").toEqual(roster.residuals);
    expect(rosterDetectors(), "detector members").toEqual(roster.detectors);
  });

  it("D: docs/03 renders the GraphPolicyCLI boundary section exactly as the census pins it - its level-2 heading once, under the page title, HTML-free, block for block: the definitions, the four rules clause for clause, the residual line (the anchor outside this census)", () => {
    const section = boundarySection();
    expect(section.why).toBe("");
    expect(sectionMatches(section, boundaryBlocks())).toEqual({ ok: true, why: "" });
  });

  it("D: docs/03 names every residual this census pins quiet, family for family, in the rendered section", () => {
    const section = boundarySection();
    expect(section.why).toBe("");
    const lines = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith("Named residuals") ? [block.text] : []));
    expect(lines).toHaveLength(1);
    expect([...(lines[0] ?? "").matchAll(RESIDUAL_ENTRY)].map(match => ({ id: match[1], family: match[2] }))).toEqual(RESIDUALS.map(residual => ({ id: residual.id, family: residual.family })));
  });

  it("D: the docs/03 ownership table names GraphPolicyCLI in exactly the pinned row, read from that section's own table, and the boundary section's definitions cite the bead, its source line and this census", () => {
    const page = readRepo(DOCS_03);
    const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    expect(tables.why).toBe("");
    const gpRows = tables.grids.flatMap(grid => grid.slice(1).flatMap(row => (row.some(cell => NAMES_GP.test(cell)) ? [{ header: grid[0], row }] : [])));
    expect(gpRows).toEqual([{ header: OWNERSHIP_HEADER, row: OWNERSHIP_CELLS }]);
    const section = boundarySection();
    expect(section.why).toBe("");
    const [intro] = section.blocks;
    const text = intro?.kind === "paragraph" ? intro.text : "";
    for (const citation of CITATIONS) expect(text, citation).toContain(citation);
  });

  it("D: the docs/03 ownership table gives the GraphPolicyCLI concern exactly one row - no second row names any of its terms, so none re-assigns it (wb-1ho6 F3, gate LDG4)", () => {
    const found = concernRows(readRepo(DOCS_03));
    expect(found.why).toBe("");
    const concern = (OWNERSHIP_CELLS[0] ?? "").toLowerCase();
    for (const term of CONCERN_TERMS) expect(concern, term).toContain(term);
    expect(found.rows).toEqual([OWNERSHIP_CELLS]);
  });

  it("D: the GraphPolicyCLI concern's terms are docs/03's own concern items - CONCERN_TERMS and the plants' terms equal the items read from the ownership row GraphPolicyCLI owns, and every item the cell lists names a census term, so a term dropped or added reds (wb-nh0t F1, gate M16)", () => {
    const tables = sectionTables(readRepo(DOCS_03), OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    expect(tables.why).toBe("");
    const owned = tables.grids.flatMap(grid => grid.slice(1).filter(row => row[1] === "GraphPolicyCLI"));
    expect(owned, "the ownership rows GraphPolicyCLI owns").toHaveLength(1);
    const items = concernTermsOf(owned[0]?.[0] ?? "");
    expect(items, "docs/03's concern items").toHaveLength(6);
    expect(CONCERN_TERMS, "the census's term list").toEqual(items);
    expect(
      CONCERN_PLANTS.map(plant => plant.term),
      "one plant per docs/03 concern item",
    ).toEqual(items);
    // The reverse reading, made without concernTermsOf: every item the docs/03 cell lists names a census term.
    const listed = (owned[0]?.[0] ?? "")
      .toLowerCase()
      .split(", ")
      .flatMap(part => part.split(" and "))
      .filter(part => part !== "their receipts");
    expect(listed, "the cell's listed items, read without concernTermsOf").toHaveLength(6);
    for (const part of listed) expect(CONCERN_TERMS.some(term => part.includes(term)), `${part}: names a census term`).toBe(true);
  });

  it("D: every GraphPolicyCLI concern term is live - a second ownership row naming that term alone, planted in memory under the pinned row, is the row the concern check names beside it (wb-nh0t F1, gate D2/D3)", () => {
    const page = readRepo(DOCS_03);
    const pinned = `| ${OWNERSHIP_CELLS.join(" | ")} |\n`;
    expect(page.split(pinned), "the pinned row's source line, once").toHaveLength(2);
    const planted: string[] = [];
    for (const plant of CONCERN_PLANTS) {
      const cells = PLANT_CELLS(plant.concern);
      expect(
        CONCERN_TERMS.filter(term => plant.concern.toLowerCase().includes(term)),
        `${plant.term}: the plant names its own term alone`,
      ).toEqual([plant.term]);
      const found = concernRows(page.replace(pinned, `${pinned}| ${cells.join(" | ")} |\n`));
      expect(found.why, plant.term).toBe("");
      expect(found.rows, plant.term).toEqual([OWNERSHIP_CELLS, cells]);
      planted.push(plant.term);
    }
    expect(planted, "every plant read").toEqual(CONCERN_TERMS);
  });

  it("D: docs/03 names exactly each residual's measured members - every shape a family enumerates in the rendered residual line names exactly one of that residual's members by its named words, in the family's order, and a single-shape family enumerates none, so a member dropped from every literal of this census and from the roster still reds (wb-yxkq F1, gate G1/G1b)", () => {
    const section = boundarySection();
    expect(section.why).toBe("");
    const lines = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith("Named residuals") ? [block.text] : []));
    expect(lines).toHaveLength(1);
    const line = lines[0] ?? "";
    const families = new Map([...line.matchAll(RESIDUAL_ENTRY)].map(match => [match[1] ?? "", match[2] ?? ""] as const));
    expect([...families.keys()], "the residuals docs/03 names, each read").toEqual(RESIDUALS.map(residual => residual.id));
    expect(memberMismatches(line, RESIDUALS), "docs/03 against this census's members").toEqual([]);
    // The check is live: each kind of disagreement, planted in memory in the members or in the docs line, is the one named.
    const misread = "MISREAD-COMMAND-WORD";
    const edited = (edit: (members: readonly ResidualMember[]) => readonly ResidualMember[]): Residual[] =>
      RESIDUALS.map(residual => (residual.id === misread ? { ...residual, members: edit(residual.members ?? []) } : residual));
    const without = (name: string): Residual[] => edited(members => members.filter(member => member.name !== name));
    expect(memberMismatches(line, without("P32 the coproc keyword")), "gate G1: P32 dropped").toEqual([`${misread}: shape coproc names no member`]);
    expect(memberMismatches(line, without("P17 a global flag value read as the verb")), "gate G1b: P17 dropped").toEqual([`${misread}: shape bd --actor doctor close names no member`]);
    expect(memberMismatches(line, edited(() => [])), "every member dropped").toEqual(familyShapesOf(families.get(misread) ?? "").shapes.map(shape => `${misread}: shape ${shape} names no member`));
    expect(
      memberMismatches(line, edited(members => [...members, ...members.slice(0, 1).map(member => ({ ...member, name: "P99 an unlisted shape", named: "an unlisted shape" }))])),
      "a member the family does not list",
    ).toEqual([`${misread}: member P99 an unlisted shape is named by 0 shapes`]);
    expect(
      memberMismatches(line, edited(members => members.map((member, index, all) => (index === 2 ? (all[3] ?? member) : index === 3 ? (all[2] ?? member) : member)))),
      "two members out of the family's order",
    ).toEqual([`${misread}: members out of the family's order`]);
    expect(
      memberMismatches(line, edited(members => members.map(member => (member.name === "P05 the time keyword" ? { ...member, named: "time coproc" } : member)))),
      "a member named by two shapes",
    ).toEqual([`${misread}: shape coproc names P05 the time keyword | P32 the coproc keyword`, `${misread}: member P05 the time keyword is named by 2 shapes`]);
    expect(
      memberMismatches(line.replace("as in bd --actor doctor close)", "as in bd --actor doctor close, or a form the grammar cannot read)"), RESIDUALS),
      "an unread group of a class-level family",
    ).toEqual([`${misread}: unread group or a form the grammar cannot read`]);
    expect(
      memberMismatches(line.replace("does not unwrap, such as timeout, sudo, nice or xargs)", "does not unwrap: a program such as timeout)"), RESIDUALS),
      "a single-shape family that enumerates a shape",
    ).toEqual(["WRAPPED-COMMAND: shape timeout names no member"]);
  });

  it("D: every class-level member measures the shape docs/03 names it by - each shape a family enumerates in the rendered residual line that names exactly one member opens the launch of that member's statement, and no two members' statements read as one launch, so a member given another member's statement, a shape docs/03 never names, its shape behind another word or another member's named words reds through docs/03 (wb-mpmm F1, gate L2c/L2h/L2b)", () => {
    const section = boundarySection();
    expect(section.why).toBe("");
    const lines = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith("Named residuals") ? [block.text] : []));
    expect(lines).toHaveLength(1);
    const line = lines[0] ?? "";
    expect(statementMismatches(line, RESIDUALS), "docs/03's shapes against each member's launch").toEqual([]);
    // The check is live: each escape gate s111 measured, and each other kind of disagreement, planted in memory in the members, is the one named.
    const misread = "MISREAD-COMMAND-WORD";
    const edited = (edit: (members: readonly ResidualMember[]) => readonly ResidualMember[]): Residual[] =>
      RESIDUALS.map(residual => (residual.id === misread ? { ...residual, members: edit(residual.members ?? []) } : residual));
    const set = (name: string, fields: Partial<ResidualMember>): Residual[] => edited(members => members.map(member => (member.name === name ? { ...member, ...fields } : member)));
    const [time] = MISREAD_MEMBERS.filter(member => member.name === "P05 the time keyword");
    expect(time, "P05 is a member").toBeDefined();
    const timeMeasure = time === undefined ? {} : { statement: time.statement, reads: time.reads, control: time.control, controlWrites: time.controlWrites };
    expect(statementMismatches(line, set("P32 the coproc keyword", timeMeasure)), "gate L2c: P32 measures P05's statement").toEqual([
      `${misread}: the launch P32 the coproc keyword measures does not begin with coproc, the shape docs/03 names it by`,
      `${misread}: P32 the coproc keyword measures the same launch as P05 the time keyword`,
    ]);
    const nohup = { reads: ["nohup bd close wb-example"], control: 'execSync("bd close wb-example");', controlWrites: ["bd close wb-example"] };
    expect(statementMismatches(line, set("P32 the coproc keyword", { ...nohup, statement: 'execSync("nohup bd close wb-example");' })), "gate L2h: P32 measures a shape docs/03 never names").toEqual([
      `${misread}: the launch P32 the coproc keyword measures does not begin with coproc, the shape docs/03 names it by`,
    ]);
    expect(
      statementMismatches(line, edited(members => members.map((member, index, all) => (index === 5 ? { ...(all[6] ?? member), named: member.named } : index === 6 ? { ...(all[5] ?? member), named: member.named } : member)))),
      "gate L2b: P11 and P12 trade named words and table places",
    ).toEqual([
      `${misread}: the launch P12 a .bat spelling measures does not begin with BD.EXE, the shape docs/03 names it by`,
      `${misread}: the launch P11 an upper-case .EXE spelling measures does not begin with bd.bat, the shape docs/03 names it by`,
    ]);
    expect(
      statementMismatches(line, set("P32 the coproc keyword", { ...nohup, reads: ["nohup coproc bd close wb-example"], statement: 'execSync("nohup coproc bd close wb-example");' })),
      "its shape carried behind a word the census reads as the binary",
    ).toEqual([`${misread}: the launch P32 the coproc keyword measures does not begin with coproc, the shape docs/03 names it by`]);
    const both = 'execSync("time coproc bd close wb-example");';
    expect(
      statementMismatches(
        line,
        edited(members => members.map(member => (member.name === "P05 the time keyword" || member.name === "P32 the coproc keyword" ? { ...member, statement: both } : member))),
      ),
      "two members sharing a statement",
    ).toEqual([
      `${misread}: the launch P32 the coproc keyword measures does not begin with coproc, the shape docs/03 names it by`,
      `${misread}: P32 the coproc keyword measures the same launch as P05 the time keyword`,
    ]);
    expect(
      statementMismatches(
        line,
        edited(members => [...members, ...members.slice(0, 1).map(member => ({ ...member, name: "P99 a respaced copy", named: "a respaced copy", statement: member.statement.replace(" bd", "  bd") }))]),
      ),
      "a statement respelled only in its spacing reads as the same launch",
    ).toEqual([`${misread}: P99 a respaced copy measures the same launch as P06 a leading redirection`]);
    expect(statementMismatches(line, set("P06 a leading redirection", { statement: 'execSync(">/dev/null bd close wb-example"); execSync("f");' })), "a statement read as no words").toEqual([
      `${misread}: the launch P06 a leading redirection measures does not begin with >/dev/null, the shape docs/03 names it by`,
    ]);
    expect(statementMismatches(line, set("P17 a global flag value read as the verb", { statement: 'spawnSync("bd", ["--actor=doctor", "close", "wb-example"]);' })), "the family's last shape, of four words").toEqual([
      `${misread}: the launch P17 a global flag value read as the verb measures does not begin with bd --actor doctor close, the shape docs/03 names it by`,
    ]);
    const ambiguous = edited(members =>
      members.map(member =>
        member.name === "P05 the time keyword" ? { ...member, named: "time coproc" } : member.name === "P32 the coproc keyword" ? { ...member, statement: 'execSync("nohup coproc bd close wb-example");' } : member,
      ),
    );
    expect(statementMismatches(line, ambiguous), "a shape naming two members, neither launch opening with it, is left to memberMismatches").toEqual([]);
    expect(memberMismatches(line, ambiguous), "which reports it").toEqual([
      `${misread}: shape coproc names P05 the time keyword | P32 the coproc keyword`,
      `${misread}: member P05 the time keyword is named by 2 shapes`,
    ]);
  });

  it("D: every class-level member isolates the shape docs/03 names it by - for each shape a family enumerates in the rendered residual line that names exactly one member, that member's control differs from its statement in the shape's run alone (dropped, changed by one change ahead of the statement's tail, moved behind it, or the function keyword rejoined with its name) and a shape carrying no bd binary of its own, the function keyword excepted, is followed by bd, so a second word carried behind a member's shape, its control one dropped run away, reds through docs/03 (wb-zj42 F1, gate G1-G6)", () => {
    const section = boundarySection();
    expect(section.why).toBe("");
    const lines = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith("Named residuals") ? [block.text] : []));
    expect(lines).toHaveLength(1);
    const line = lines[0] ?? "";
    expect(isolationMismatches(line, RESIDUALS), "docs/03's shapes against each member's pairing").toEqual([]);
    // The check is live: each escape gate s121 measured, each escape one of the two readings alone refuses, and each other
    // kind of disagreement, planted in memory in the members, is the one named.
    const misread = "MISREAD-COMMAND-WORD";
    const set = (name: string, fields: Partial<ResidualMember>): Residual[] =>
      RESIDUALS.map(residual => (residual.id === misread ? { ...residual, members: (residual.members ?? []).map(member => (member.name === name ? { ...member, ...fields } : member)) } : residual));
    const tied = (name: string, shape: string): string => `${misread}: the control of ${name} changes more than ${shape}, the shape docs/03 names it by`;
    const bd = (name: string, shape: string): string => `${misread}: ${shape} is not followed by bd in the launch ${name} measures`;
    const P05 = "P05 the time keyword";
    const P06 = "P06 a leading redirection";
    const P32 = "P32 the coproc keyword";
    const dropped = { control: 'execSync("bd close wb-example");', controlWrites: ["bd close wb-example"] };
    const gate: readonly (readonly [string, string, string, Partial<ResidualMember>])[] = [
      ["G1", P05, "time", { statement: 'execSync("time coproc bd close wb-example");', reads: ["time coproc bd close wb-example"] }],
      ["G2", P32, "coproc", { statement: 'execSync("coproc time bd close wb-example");', reads: ["coproc time bd close wb-example"] }],
      ["G3", P32, "coproc", { statement: 'execSync("coproc nohup bd close wb-example");', reads: ["coproc nohup bd close wb-example"] }],
      ["G4", P06, ">/dev/null", { statement: 'execSync(">/dev/null nohup bd close wb-example");', reads: [">/dev/null nohup bd close wb-example"], ...dropped }],
      ["G5", P05, "time", { statement: 'execSync("time nohup bd close wb-example");', reads: ["time nohup bd close wb-example"] }],
      ["G6", "P07 a leading descriptor redirection", "2>/dev/null", { statement: 'execSync("2>/dev/null nohup bd close wb-example");', reads: ["2>/dev/null nohup bd close wb-example"], ...dropped }],
    ];
    expect(
      gate.map(([probe, name, , fields]) => [probe, isolationMismatches(line, set(name, fields))]),
      "gate G1-G6: a second word behind the member's shape, its control one dropped run away",
    ).toEqual(gate.map(([probe, name, shape]) => [probe, [tied(name, shape), bd(name, shape)]]));
    expect(
      isolationMismatches(line, set("P11 an upper-case .EXE spelling", { statement: 'spawnSync("BD.EXE", ["list", "close", "wb-example"]);', reads: ["BD.EXE list close wb-example"] })),
      "a read verb behind a binary spelling, dropped by the control's respelling: the tie alone refuses it",
    ).toEqual([tied("P11 an upper-case .EXE spelling", "BD.EXE")]);
    expect(
      isolationMismatches(line, set(P32, { statement: 'execSync("coproc -a x bd close wb-example");', reads: ["coproc -a x bd close wb-example"], control: 'execSync("exec -a x bd close wb-example");' })),
      "an option and its value behind a keyword, consumed by the control's respelled word: the bd reading alone refuses it",
    ).toEqual([bd(P32, "coproc")]);
    expect(
      isolationMismatches(line, set(P05, { statement: 'execSync("time -p bd close wb-example");', reads: ["time -p bd close wb-example"], control: 'execSync("exec -p bd close wb-example");' })),
      "a keyword's own option, consumed the same way",
    ).toEqual([bd(P05, "time")]);
    const disagreements: readonly (readonly [string, string, Partial<ResidualMember>, readonly string[]])[] = [
      ["the tail changed", P05, { control: 'execSync("bd close wb-other");' }, [tied(P05, "time")]],
      ["another launcher", P05, { control: 'exec("bd close wb-example");' }, [tied(P05, "time")]],
      ["a control set to its own statement", P05, { control: 'execSync("time bd close wb-example");' }, [tied(P05, "time")]],
      ["a shape moved into the tail", P06, { control: 'execSync("bd >/dev/null close wb-example");' }, [tied(P06, ">/dev/null")]],
      ["the function keyword changed beyond its rejoin", "P08 the function keyword", { control: 'execSync("{ bd close wb-example; }; f");' }, [tied("P08 the function keyword", "function")]],
      [
        "a run of several words changed beyond it",
        "P17 a global flag value read as the verb",
        { control: 'spawnSync("bd", ["--actor=doctor", "close", "wb-other"]);' },
        [tied("P17 a global flag value read as the verb", "bd --actor doctor close")],
      ],
      ["a rejoin for another shape", P05, { statement: 'execSync("time coproc bd close wb-example");', control: 'execSync("coproc() bd close wb-example");' }, [tied(P05, "time"), bd(P05, "time")]],
      ["a word the census reads through, kept by the control", P06, { statement: 'execSync(">/dev/null ! bd close wb-example");', control: 'execSync("! bd close wb-example >/dev/null");' }, [bd(P06, ">/dev/null")]],
      ["a statement read as no words", P06, { statement: 'execSync(">/dev/null bd close wb-example"); execSync("f");' }, [tied(P06, ">/dev/null"), bd(P06, ">/dev/null")]],
      ["a launch another word opens, its pairing otherwise one change", P32, { statement: 'execSync("nohup bd close wb-example");' }, [tied(P32, "coproc"), bd(P32, "coproc")]],
    ];
    expect(
      disagreements.map(([kind, name, fields]) => [kind, isolationMismatches(line, set(name, fields))]),
      "each other kind of disagreement, named",
    ).toEqual(disagreements.map(([kind, , , expected]) => [kind, expected]));
    const ambiguous = set(P05, { named: "time coproc", statement: 'execSync("time coproc bd close wb-example");', reads: ["time coproc bd close wb-example"] });
    expect(isolationMismatches(line, ambiguous), "a shape naming two members is left to memberMismatches; the shape naming one is read").toEqual([tied(P05, "time"), bd(P05, "time")]);
  });

  it("F: the class-level member readings meet their in-memory probes - familyShapesOf reads each branch of the family grammar and returns a group it cannot read, namesShape reads whole contiguous words, statementWordsOf reads only one launcher call of literals, oneChangeAway admits one dropped, inserted, respelled or rejoined run or one moved word and refuses an identical, wider or second change, and pairingProblems names a control set to its own statement, an unrelated bd write and a misread respelling (wb-yxkq F1/F2, gate G2/G2b)", () => {
    expect(familyShapesOf("a lead such as Z: the A or B noun"), "after the colon; between the and its noun; or").toEqual({ shapes: ["A", "B"], unread: [] });
    expect(familyShapesOf("lead: a group such as A, B or C, the D noun, an other group spelled E, or a group spelled F or G"), "groups at a, the, an and or a").toEqual({
      shapes: ["A", "B", "C", "D", "E", "F", "G"],
      unread: [],
    });
    expect(familyShapesOf("lead: a group whose value is v, as in G H"), "as in; one shape of two words").toEqual({ shapes: ["G H"], unread: [] });
    expect(familyShapesOf("lead: a group such as a word spelled K"), "the last cue").toEqual({ shapes: ["K"], unread: [] });
    expect(familyShapesOf("lead: a group naming nothing, a group such as L"), "an unread group is returned").toEqual({ shapes: ["L"], unread: ["a group naming nothing"] });
    expect(familyShapesOf("a family that enumerates nothing, such as M"), "no colon, no enumeration").toEqual({ shapes: [], unread: [] });
    expect([namesShape("2>/dev/null", ">/dev/null"), namesShape("the time", "time"), namesShape("bd --actor doctor close", "--actor doctor"), namesShape("bd --actor doctor close", "bd close")], "whole contiguous words").toEqual([
      false,
      true,
      true,
      false,
    ]);
    expect(statementWordsOf('execSync(" a\\nb  c ");'), "a shell line at white space").toEqual(["execSync", "a", "b", "c"]);
    expect(statementWordsOf('spawnSync("bd", ["close", "wb-x"]);'), "a binary and its argv").toEqual(["spawnSync", "bd", "close", "wb-x"]);
    expect(
      ['spawnSync("bd", ["close", id]);', 'spawnSync("bd", argv);', 'spawnSync("bd", ["close"], {});', "execSync(line);", '(0, execSync)("a");', 'void execSync("a");', 'const out = execSync("a");', 'execSync("a"); execSync("b");', ""].map(statementWordsOf),
      "any other shape reads as no words",
    ).toEqual([[], [], [], [], [], [], [], [], []]);
    const pairs: readonly (readonly [readonly string[], readonly string[], boolean])[] = [
      [["x", "a", "b"], ["x", "a", "b"], false],
      [["x", "a", "b"], ["x", "b"], true],
      [["x", "b"], ["x", "a", "b"], true],
      [["x", "a", "b"], ["x", "c", "b"], true],
      [["x", "a", "b", "c"], ["x", "ab", "c"], true],
      [["x", "a", "b", "c"], ["x", "b", "c", "a"], true],
      [["x", "a", "b", "c", "d"], ["x", "e", "d"], false],
      [["x", "a", "b", "c"], ["x", "d", "e", "c"], false],
      [["x", "a", "b"], ["x", "c", "d", "b"], false],
      [["x", "a", "b", "c", "d"], ["x", "e", "b", "c", "f"], false],
      [["x", "a", "b", "c", "d"], ["x", "b", "a", "d", "c"], false],
      [[], ["x"], false],
      [["x"], [], false],
    ];
    expect(
      pairs.map(([statement, control]) => oneChangeAway(statement, control)),
      "identical, dropped, inserted, respelled, rejoined, moved, a run of three, two for two, one for two, two changes, two moves, no statement, no control",
    ).toEqual(pairs.map(pair => pair[2]));
    const member = (name: string): ResidualMember[] => MISREAD_MEMBERS.filter(candidate => candidate.name === name);
    expect(
      member("P06 a leading redirection").flatMap(found => pairingProblems({ ...found, control: found.statement, controlWrites: [] })),
      "gate G2: a control set to its own statement",
    ).toEqual(["P06 a leading redirection: the census reads no bd write in the control", "P06 a leading redirection: the control is not one change away from its statement"]);
    expect(
      member("P05 the time keyword").flatMap(found => pairingProblems({ ...found, control: 'execSync("bd create wb-other");', controlWrites: ["bd create wb-other"] })),
      "gate G2b: an unrelated bd write",
    ).toEqual(["P05 the time keyword: the control is not one change away from its statement"]);
    expect(
      member("P05 the time keyword").flatMap(found => pairingProblems({ ...found, control: 'execSync("timer bd close wb-example");', controlWrites: [] })),
      "a misread respelling one change away",
    ).toEqual(["P05 the time keyword: the census reads no bd write in the control"]);
  });

  it("F: launchBeginsWith reads a shape as the opening words of a statement's launch - a word or a run across a binary and its argv, never the callee, a word's tail or head, a word in another case, a shape behind another word, a broken or cut-short run, or a statement statementWordsOf reads as no words (wb-mpmm F1)", () => {
    const probes: readonly (readonly [string, string, boolean])[] = [
      ['execSync(">/dev/null bd close wb-x");', ">/dev/null", true],
      ['spawnSync("bd", ["--actor", "doctor", "close", "wb-x"]);', "bd --actor doctor close", true],
      ['execSync("bd close wb-x");', "execSync", false],
      ['execSync("2>/dev/null bd close wb-x");', ">/dev/null", false],
      ['execSync("timer bd close wb-x");', "time", false],
      ['spawnSync("bd.exe", ["close", "wb-x"]);', "BD.EXE", false],
      ['execSync("nohup coproc bd close wb-x");', "coproc", false],
      ['spawnSync("bd", ["--actor", "doctor", "list", "close"]);', "bd --actor doctor close", false],
      ['spawnSync("bd", ["--actor", "doctor"]);', "bd --actor doctor close", false],
      ['execSync("time bd close wb-x"); execSync("f");', "time", false],
    ];
    expect(
      probes.map(([statement, shape]) => launchBeginsWith(statement, shape)),
      "a word, a run across a binary and its argv, the callee, a word's tail, a word's head, another case, a shape behind another word, a broken run, a cut-short run, a statement read as no words",
    ).toEqual(probes.map(probe => probe[2]));
  });

  it("F: shapeRunTied and followedByBd read a member's pairing by its shape's run - the run dropped, changed by one change ahead of the tail, moved behind the tail or the function keyword rejoined with its name, never a changed tail, a word behind the run changed with it, two changes, another launcher, an identical control or a launch the shape does not open; and a shape followed by the word bd exactly, never by another word, a spelling of bd or nothing, unless it names bd itself or is the function keyword (wb-zj42 F1)", () => {
    const pairings: readonly (readonly [string, string, string, boolean])[] = [
      ['execSync("time bd close wb-x");', 'execSync("bd close wb-x");', "time", true],
      ['execSync("coproc bd close wb-x");', 'execSync("! bd close wb-x");', "coproc", true],
      ['spawnSync("BD.EXE", ["close", "wb-x"]);', 'spawnSync("bd.exe", ["close", "wb-x"]);', "BD.EXE", true],
      ['spawnSync("bd", ["--actor", "doctor", "close", "wb-x"]);', 'spawnSync("bd", ["--actor=doctor", "close", "wb-x"]);', "bd --actor doctor close", true],
      ['execSync(">/dev/null bd close wb-x");', 'execSync("bd close wb-x >/dev/null");', ">/dev/null", true],
      ['execSync("function f { bd close wb-x; }; f");', 'execSync("f() { bd close wb-x; }; f");', "function", true],
      ['execSync("time coproc bd close wb-x");', 'execSync("bd close wb-x");', "time", false],
      ['execSync("coproc time bd close wb-x");', 'execSync("! bd close wb-x");', "coproc", false],
      ['spawnSync("BD.EXE", ["list", "close", "wb-x"]);', 'spawnSync("bd.exe", ["close", "wb-x"]);', "BD.EXE", false],
      ['execSync("time bd close wb-x");', 'execSync("bd close wb-y");', "time", false],
      ['execSync(">/dev/null bd close wb-x");', 'execSync("bd >/dev/null close wb-x");', ">/dev/null", false],
      ['spawnSync("bd", ["--actor", "doctor", "close", "wb-x"]);', 'spawnSync("bd", ["--actor=doctor", "delete", "wb-x"]);', "bd --actor doctor close", false],
      ['execSync("time coproc bd close wb-x");', 'execSync("coproc() bd close wb-x");', "time", false],
      ['execSync("function f { bd close wb-x; }; f");', 'execSync("{ bd close wb-x; }; f");', "function", false],
      ['execSync("time bd close wb-x");', 'exec("bd close wb-x");', "time", false],
      ['execSync("time bd close wb-x");', 'execSync("time bd close wb-x");', "time", false],
      ['execSync("nohup time bd close wb-x");', 'execSync("nohup bd close wb-x");', "time", false],
      ['execSync("nohup bd close wb-x");', 'execSync("bd close wb-x");', "time", false],
      ['execSync("time bd close wb-x"); execSync("f");', 'execSync("bd close wb-x");', "time", false],
    ];
    expect(
      pairings.map(([statement, control, shape]) => shapeRunTied(statement, control, shape)),
      "dropped, respelled, a binary respelled, changed inside a run of several words, moved behind the tail, the function rejoin; a word behind the run dropped with it, respelled with it, dropped by a binary's respelling, a changed tail, moved into the tail, two changes inside the run, a rejoin for another shape, the function keyword changed beyond its rejoin, another launcher, an identical control, a launch the shape does not open, a launch another word opens dropped to the tail, a statement read as no words",
    ).toEqual(pairings.map(probe => probe[3]));
    const followers: readonly (readonly [string, string, boolean])[] = [
      ['execSync("time bd close wb-x");', "time", true],
      ['execSync("2>/dev/null bd close wb-x");', "2>/dev/null", true],
      ['spawnSync("BD.EXE", ["list", "close", "wb-x"]);', "BD.EXE", true],
      ['spawnSync("bd.bat", ["close", "wb-x"]);', "bd.bat", true],
      ['spawnSync("bd", ["--actor", "doctor", "close", "wb-x"]);', "bd --actor doctor close", true],
      ['execSync("function f { bd close wb-x; }; f");', "function", true],
      ['execSync("nohup time bd close wb-x");', "nohup time", true],
      ['execSync("time coproc bd close wb-x");', "time", false],
      ['execSync("coproc -a x bd close wb-x");', "coproc", false],
      ['execSync(">/dev/null ! bd close wb-x");', ">/dev/null", false],
      ['execSync("time bd.exe close wb-x");', "time", false],
      ['execSync("bdx close wb-x");', "bdx", false],
      ['execSync("xbd close wb-x");', "xbd", false],
      ['execSync("bd.exe.bak close wb-x");', "bd.exe.bak", false],
      ['execSync("nohup time bd close wb-x");', "time", false],
      ['execSync("nohup bd close wb-x");', "time", false],
      ['execSync("time");', "time", false],
    ];
    expect(
      followers.map(([statement, shape]) => followedByBd(statement, shape)),
      "a keyword, a redirection, a binary spelling, another spelling, a run opening with bd, the function keyword, a run of several words; another word, an option, a word the census reads through, a spelling of bd, a word whose head is bd, a word whose tail is bd, two suffixes, a launch the shape does not open, bd after another word that opens the launch, nothing after the shape",
    ).toEqual(followers.map(probe => probe[2]));
  });

  it("F: a compliant gp integration judges clean - the rules admit a real-interface seam rather than banning gp", () => {
    expect(judge(treeOf(CLEAN), CLEAN.seams)).toEqual([]);
    const ctx = contextOf(treeOf(CLEAN), CLEAN.seams);
    expect(ctx.decisionPath).toEqual([PROCESS_ENV, CLIENT]);
    expect(ctx.adjacent).toEqual([DECISION, CLIENT]);
    expect(ctx.executionSeams).toEqual([LIFECYCLE]);
    expect(ctx.census.get(CLIENT)?.launches.map(launch => `${launch.binary} ${launch.argv.join(" ")}`)).toEqual(["gp eval --program --json"]);
    expect(ctx.census.get(CLIENT)?.namesUnknownCommand).toBe(true);
  });

  it("F: a compliant gp integration through the GraphPolicyCLI package judges clean - a client that imports graph-policy-cli and never launches gp reaches gp through a real interface (GP-1/a1, wb-1ho6 F2 gate DMG38)", () => {
    expect(judge(treeOf(SDK_CLEAN), SDK_CLEAN.seams)).toEqual([]);
    const client = contextOf(treeOf(SDK_CLEAN), SDK_CLEAN.seams).census.get(CLIENT);
    expect([client?.gpBinary, client?.gpLaunches], "the client launches no gp binary").toEqual([[], []]);
    expect(client?.runtimeImports).toContain(GP_PACKAGE);
  });

  it("F: comments are not code - every detector reads the same census with gp, train, shell and effect words added in comments", () => {
    const words = "// gp GraphDataIR graph-policy-cli GP_CLI_UNKNOWN_COMMAND train process.kill bd close runs.stop new Worker execSync('sh -c bd close') node:process";
    for (const [file, text] of Object.entries(CLEAN.modules)) expect(moduleCensus(file, `${text}\n${words}\n/* ${words} */`), file).toEqual(moduleCensus(file, text));
  });

  it("F: the detectors are precise - near-miss tokens report nothing, module specifiers included", () => {
    const nearMiss = [
      'import type { query } from "@anthropic-ai/claude-agent-sdk";',
      'import { spawn } from "node:child_process";',
      'import { argv } from "node:process";',
      'import "./train.js";',
      'import "gp";',
      'import "./graph-data-ir.js";',
      'const model = { id: "gpt-4", kind: "general-purpose", note: "constraint training" };',
      "const gp = model.id;",
      "declare const child: { kill(signal: string): void };",
      "declare const scheduler: { stop(): void };",
      "declare const runner: { stop(): void };",
      "const lane = scheduler;",
      'export function tidy(): void { child.kill("SIGTERM"); scheduler.stop(); runner.stop(); lane.stop(); scheduler["stop"](); spawn("git", ["status"]); }',
      "export const parts = [gp, argv];",
      "declare const execSync: (command: string) => void;",
      'execSync("echo bd close wb-example");',
      'execSync("git status && git diff");',
      'spawn("sh", ["-c"]);',
    ].join("\n");
    const found = moduleCensus("src/near-miss.ts", nearMiss);
    expect([found.gpBinary, found.gpLaunches, found.dynamicLoads, found.gpVocabulary, found.trainTokens, found.processKill, found.furnaceStop, found.bdWrite, found.agentSession, found.hostLaunch]).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
    expect(found.namesUnknownCommand).toBe(false);
    expect(found.runtimeImports).toEqual(["node:child_process", "node:process", "./train.js", "gp", "./graph-data-ir.js"]);
    expect(found.launches.map(launch => launch.binary)).toEqual(["git", "echo", "git", "git", "sh"]);
  });

  it("M: the manifest check reads every dependency section, for training frameworks and GraphPolicyCLI forks alike", () => {
    const manifest: Manifest = {
      dependencies: { [GP_PACKAGE]: "0.1.0", tensorflow: "1.0.0", "graphpolicy-dependency": "1.0.0" },
      devDependencies: { tfjs: "1.0.0", "graphpolicy-dev": "1.0.0" },
      optionalDependencies: { torch: "1.0.0", "graphpolicy-optional": "1.0.0" },
      peerDependencies: { keras: "1.0.0", "graphpolicy-peer": "1.0.0" },
      bundledDependencies: ["xgboost", "graphpolicy-bundled"],
      bundleDependencies: ["catboost", "graphpolicy-bundle"],
    };
    expect(judge(treeOf({ ...CLEAN, manifest }), CLEAN.seams)).toEqual([
      "GP-3/c2 package.json gp-package-graphpolicy-bundle",
      "GP-3/c2 package.json gp-package-graphpolicy-bundled",
      "GP-3/c2 package.json gp-package-graphpolicy-dependency",
      "GP-3/c2 package.json gp-package-graphpolicy-dev",
      "GP-3/c2 package.json gp-package-graphpolicy-optional",
      "GP-3/c2 package.json gp-package-graphpolicy-peer",
      "GP-3/c2 package.json training-framework-catboost",
      "GP-3/c2 package.json training-framework-keras",
      "GP-3/c2 package.json training-framework-tensorflow",
      "GP-3/c2 package.json training-framework-tfjs",
      "GP-3/c2 package.json training-framework-torch",
      "GP-3/c2 package.json training-framework-xgboost",
    ]);
  });

  it("M: the training deny roster refuses one probe name per member and no near miss", () => {
    const dependencies = Object.fromEntries([...TRAINING_PROBES, ...TRAINING_NEAR_MISSES].map(name => [name, "1.0.0"]));
    expect(judge(treeOf({ ...CLEAN, manifest: { dependencies } }), CLEAN.seams)).toEqual(TRAINING_PROBES.map(name => `GP-3/c2 package.json training-framework-${name}`).sort());
  });

  it.each(FALSIFIER_CASES)(F_TITLE, (key, pinKey, falsifier) => {
    const mutated = falsifier.apply(CLEAN);
    expect(falsifier.expected.some(expected => expected.startsWith(`${pinKey} `)), "the expectation names its own pin").toBe(true);
    expect(judge(treeOf(mutated), mutated.seams)).toEqual(falsifier.expected);
    RAN.F.push(key);
  });

  it.each(RESIDUAL_CASES)(Q_TITLE, (key, residual) => {
    const mutated = residual.apply(CLEAN);
    expect(mutated).not.toEqual(CLEAN);
    expect(judge(treeOf(mutated), mutated.seams)).toEqual([]);
    for (const member of residual.members ?? []) {
      expect(residual.family, `${member.name}: named in the family`).toContain(member.named);
      expect(mutated.modules[DECISION], `${member.name}: planted by the quiet row`).toContain(member.statement);
      const quiet = moduleCensus("src/workbench/probe.ts", `${MEMBER_HEAD}\n${member.statement}`);
      expect(
        quiet.launches.map(launch => [launch.binary, ...launch.argv].join(" ")),
        `${member.name}: the frozen reading`,
      ).toEqual(member.reads);
      expect(quiet.bdWrite, `${member.name}: no bd write found`).toEqual([]);
      const control = moduleCensus("src/workbench/probe.ts", `${MEMBER_HEAD}\n${member.control}`);
      expect(
        control.bdWrite.map(found => found.text),
        `${member.name}: the control one change away is read`,
      ).toEqual(member.controlWrites);
      // wb-yxkq F2: the pairing is enforced whatever controlWrites pins - a bd write the census itself reads, one change away.
      expect(pairingProblems(member), `${member.name}: the paired control is live`).toEqual([]);
      MEMBERS_READ.push(`${key}/${member.name}`);
    }
    RAN.Q.push(key);
  });

  it.each(DETECTOR_CASES)(DT_TITLE, (key, probe) => {
    expect(signatureOf(moduleCensus("src/workbench/probe.ts", probe.source.join("\n")))).toEqual(probe.signature);
    RAN.DT.push(key);
  });

  it(TALLY_TITLE, ({ task }) => {
    const cases = registeredTests(task.file.tasks);
    const names = cases.map(entry => entry.name);
    expect(cases.filter(entry => entry.mode !== "run").map(entry => entry.name), "cases of this file not set to run").toEqual([]);
    expect(cases, "the file's case count").toHaveLength(FILE_CASES);
    expect(names, "every registered case, in registration order, as the out-of-file roster lists it").toEqual(readRoster().registered);
    expect(names[names.length - 1], "the file's last case").toBe(TALLY_TITLE);
    const registered = (template: string, keys: readonly string[]): void => {
      const [prefix = "", suffix = ""] = template.split("%s");
      expect(
        names.filter(name => name.startsWith(prefix) && name.endsWith(suffix)),
        prefix,
      ).toEqual(keys.map(key => titleOf(template, key)));
    };
    registered(F_TITLE, REGISTERED.F);
    registered(Q_TITLE, REGISTERED.Q);
    registered(DT_TITLE, REGISTERED.DT);
    expect(RAN, "the it.each cases that reached their last assertion this run, in registration order").toEqual({ F: [...REGISTERED.F], Q: [...REGISTERED.Q], DT: [...REGISTERED.DT] });
    expect(
      MEMBERS_READ,
      "every class-level residual member read this run, as the out-of-file roster lists it",
    ).toEqual(readRoster().residuals.flatMap(residual => (residual.members ?? []).map(member => `${residual.id}/${member.name}`)));
  });
});
