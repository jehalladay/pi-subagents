/**
 * wb-kku9.1 (MW-CAC-WORKFLOW-COMPOSITION-R1, program-triage-2026-10-22), the observation-class census.
 *
 * Statement (bead notes, full form): "No Pi surface shall present an observation-class input as source evidence or source
 * authority: a Pi- or Claude-executed step's completion (no Pi MW adapter is wired; W11/VC-3 blocked), an agent message or
 * transcript claim, an agent-session reference and a HyperUnix answer are observations only, so a failed Forge predicate stays
 * failed and a Beads item stays unclosed until Beads readiness, the Forge gate, Furnace attempts, Git revisions or the explicit
 * rf-context render say so; executing a step establishes none retroactively." (MechanicalWorkflows
 * docs/programs/cac-workflow-composition-2026-10-18/README.md:17@5ce2a07f891f). The acceptance is the owner filing's, verbatim:
 * the labels of rows A-D below, held to the tracked bead export by F1.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, trunk bff0b3c; every figure below is a witness in the roster):
 *  - Claude: projectClaudeTopology (claude-topology.ts:117-134 builds every node) projects claude.call, claude.session and
 *    claude.tool-use snapshots of providers pi-workflow and claude-agent-sdk with partial or unknown coverage; its only
 *    evidence reference is claude-message:<uuid>, resolved by readClaudeMessageEvidence (claude-evidence.ts), which returns a
 *    bounded preview and no status or verdict field. Neither topology adapter has a src caller today (their tests are the
 *    callers); readClaudeMessageEvidence is wired through evidence-producers.ts.
 *  - HyperUnix: hyperunixTopology projects one hyperunix.query.snapshot of provider hyperunix whose evidence references are
 *    hx-binary and hx-coverage only; its one possible edge is the display grouping from the operation the host names.
 *  - src (115 TypeScript modules at bff0b3c, read by the TypeScript parser): the observation class is the nine claude-* / hyperunix-*
 *    modules of src/workbench with providers/hyperunix.ts (four of them import an observation SDK); seventeen modules build
 *    an authority construct (a provider literal beads/bd/forge/furnace/git, or a git/bd exec call) or import the Forge or
 *    Furnace SDK; no observation-class module imports an authority module or builds an authority construct; five holders
 *    import both kinds, and in all of src only five scopes reference an observation-class binding and an authority binding
 *    together - composition and seam declarations, each pinned with its exact binding sets and none holding an authority
 *    construct (a holder module's own exports count as authority bindings). No src module calls bd: the one
 *    bd seam is BeadsReadClient, whose one member is show.
 *  - evidence-loader.ts and evidence-wiring.ts hold 0 rank, tier or authorit (authority, authoritative) spellings in any
 *    letter case, in code, strings or comments.
 *  - collect.sh is no file of this repository (R4): the flywheel machine's bin/collect.sh, outside Pi-subagents (standing rule
 *    21(1)), was read by the cutting seat at its commit dacd58e (sha256 3f9eb0739a8e48b4...): 0 'bd close'; its one bd write
 *    appends a delivery note (update --append-notes-file), which sets no status. That reading rides the delivery note and is
 *    never claimed here.
 * WB-4TDN (the R694 follow-up of landing 437: F1 leads, F2 rides; cut on trunk fced7bf). Two readings widen; no row, pin, label,
 * registered title or frozen-shape count changes.
 *  - The exec reading (C1-C3, M5). A call is an exec construct of git or the tracker when its callee is an exec entry point and one
 *    command word of its program texts is git or the tracker. The callee: an EXEC_CALLEES name as an identifier, a property or a
 *    string-keyed element (cp["execFileSync"]), or the identifier an import specifier aliases one to (import { execFileSync as run }:
 *    an import binding, read by its name like every import binding). The program texts: a string-literal first argument and each
 *    string-literal element of an array-literal second argument (its argv), a no-substitution template counting as a string literal.
 *    The command words: each text split at whitespace, a quote (' " `) or a shell operator (; & | ( ) < >), each word read by its
 *    last path segment (after / or \) with one trailing .exe dropped, so a word that holds the command only as a part (--bd, x=bd,
 *    bd-helper) names no command. So a path-qualified program (/usr/local/bin/bd, C:\tools\bd.exe), a wrapper's argv (env, sudo), a
 *    shell line (its first or a later command, sh -c) and an aliased import now read, where the landed reading took only an unaliased
 *    callee whose first argument was the command itself. M5 pins the gate's filed plant (its L2-3 members, appended to
 *    claude-control.ts), one kill control per reading (each callee form, program text and word break) and one quiet row per spelling
 *    left unread, each spelling a src module of its own added in memory. The readings are the same for git; on src they change
 *    nothing (the classes, the holders, the scopes and C3's git exec modules read as at the landed census, 116 modules at fced7bf).
 *  - The walk's reach (C1). The walk lists every regular file and every symbolic link below src and follows no link. A file whose
 *    name ends in one of TypeScript's own source extensions (its public Extension enum, .json and .tsbuildinfo aside: .ts, .tsx,
 *    .d.ts, .js, .jsx and the .mts and .cts families) that tsconfig.json's program does not hold, or a symbolic link anywhere below
 *    src, reds C1: the judge reads neither. C1's planted reach control hands the same walk an in-memory tree (a program module, the
 *    gate's L2-9 .tsx and a .mjs outside its program, the gate's L2-5 link, a markdown note and a JSON file) and pins what it lists.
 *  - NOT CLAIMED, each a pinned quiet row of M5: an exec entry point carried in a const, a destructuring or a promisify return, and a
 *    command passed into a wrapper function (R2's values: a module-level const, a return value, a parameter); a command that is no
 *    string literal at its construct - a const, a concatenation, a template with a substitution, an argv held in a const (R3); an
 *    entry point held in a variable of the call's own scope, in an object member, or exported by another module under a new name; a
 *    call through call or apply; a callee in parentheses, after a comma or under a type assertion; a command literal or an argv under
 *    a type assertion ("bd" as string, [...] as const); a tagged template; an argv as the first argument; a command word spliced from
 *    quoted or escaped parts, in another letter case, behind another suffix (.cmd) or inside a parameter expansion; a process API
 *    outside EXEC_CALLEES (execa). Not claimed and not a row: a walk edited to tell the planted entries from the disk's, an edit of
 *    the disk listing alone (diskEntries) - the plants hold the walk's logic - and a source name in another letter case (x.TS).
 * CUT #3 (owner ruling R766, 2026-10-25; trunk 3a71372 merged INTO the branch): landing 381 added
 * src/workbench/beads-program-readiness.ts, which imports capability-registry.ts and observation.ts only and joins neither class,
 * so the src count moved 115 -> 116 and C1's hand-counted integer read red at landing 384's land-prep - and again through C1's
 * verbatim title in the docs07 provider-rules census (its AC2 row H3 'never-an-authority' pins C1). C1 now pins the walked module
 * set to tsconfig.json's program (srcIsProgram, the reading the gp-cache-scope census makes of the same program) and a floor
 * below the count (floorMet, MODULES_FLOOR), never the count itself: a src landing that adds or removes a module of neither class
 * leaves C1 green, while a class, holder, scope or edge change still reds C1-C3, and a walk or program that drifts apart reds C1.
 *
 * Rows, each a describe of its pins:
 *  A, acceptance (a). A1 a succeeded Claude SDK run (the claude-host query seam fed SDK messages whose text and result say fixed
 *    and PASS) settles ok and projects only claude.* snapshots, partial or unknown; A2 that projection names no forge, furnace,
 *    beads or git provider in any snapshot, edge or evidence reference, and no transcript claim reaches it; A3 applying it to a
 *    projection holding a failed Forge gate and an open bd item leaves both nodes exactly as they were; A4 the transcript
 *    message the session lists reads as a claude-message preview with no status, verdict or authority field.
 *  B, acceptance (b). B1 hyperunixTopology over hyperunix.find/v1 readings of every read kind (and one built on the provider's
 *    own SDK path), whose rows name .beads, forge.toml, .furnace and .git paths, carries no beads, forge, furnace or git kind,
 *    reference or edge; B2 the token count of evidence-loader.ts and evidence-wiring.ts.
 *  C, acceptance (c). C1 the module graph, over a walk that is tsconfig.json's program above a floor, with no source outside the
 *    program and no link below src: the observation class,
 *    the authority modules and the holders are exactly the measured rosters and no edge joins the first two outside the
 *    holders; C2 the scopes: the only scopes in src that read an observation-class binding beside an authority binding or
 *    construct are the five pinned composition scopes; C3 no src module spells a bd close or update or execs bd, and the bd
 *    seam has only show.
 *  D, acceptance (d). D1 docs/07 § Agent provider and D2 § HyperUnix provider each render their sentence exactly once; D3 the
 *    docs07 provider-rules census quotes both, so each is census-bound (rows A1 and H3 there pin this file's cases).
 *  F, the owner filing: F1 wb-kku9.1's row in the tracked bead export carries the pinned constants and an acceptance whose
 *    "(x) ..." clauses are exactly rows A-D, each label equal to its clause.
 *  M, the judge is live: M1-M9 each add one derivation shape to the real src tree and the judge names it; M5 also pins the exec
 *    spellings of its table, the read ones and the unread ones (wb-4tdn).
 *  R, the named residuals, each with a pinned quiet row: R1 R-HOST-OPERATION the HX adapter echoes the operation the host names
 *    (a forge one included) as its display grouping, and no src module calls either topology adapter; R2 R-CROSS-SCOPE a value
 *    carried between scopes (a parameter, return value, closure or module-level const) is not traced; R3 R-COMPOSED a provider
 *    or command that is not a string literal at its construct is not read; R4 R-OUT-OF-REPO collect.sh is not in this
 *    repository; R5 R-EXECUTOR-OUTCOME the Furnace host maps a hosted workflow's settlement onto the four-word Furnace result
 *    (docs/07 § Furnace provider) - the executor's own report, outside clause (c)'s Claude and HX scope, and it imports no
 *    observation-class module; R6 R-NAMING a module that reads Claude or HX values under another name and imports no
 *    observation-class module is not in the class; R7 R-TEST-TREE only src is walked (tests build authority refs on purpose).
 * OUTSIDE ANCHORS: F1 (the bead export: rows A-D), C1-C3 (the src tree, walked; C1 also tsconfig.json's program), D1-D3 (docs/07 and the docs07 census), A1-A4
 * and B1 (the adapters themselves), B2 (the two files). The out-of-file roster test/fixtures/observation-class-roster.json holds
 * every row's id, label and pins and every pin's witness; FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}`.
 * SCOPE: test-only. Nothing is spawned or written; the repository files read are only read.
 *
 * Display paths added: none.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { resultFromJson, resultToJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type BeadsReadClient, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { readClaudeMessageEvidence } from "../src/workbench/claude-evidence.js";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type ClaudeProjectionTopology, projectClaudeTopology } from "../src/workbench/claude-topology.js";
import { createClaudeObserver } from "../src/workbench/claude-transcript.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { ClaudeNativeObservation } from "../src/workflow/progress.js";
import { docsSection } from "./helpers/census.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "observation-class-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-kku9.1";
const DOCS_07 = "docs/workbench/07-native-integrations.md";
const DOCS_07_PARENT = "07 — MechanicalWorkflows and ecosystem native SDK integration";
const DOCS07_CENSUS = "test/workbench-docs07-provider-rules.census.ts";
/** The name the docs07 census pins this file by (its pin() helper composes test/workbench-<name>.test.ts). */
const PIN_NAME = "observation-class-census";

/** The two sentences acceptance (d) adds to docs/07, verbatim; the docs07 census quotes both as its rows A1 and H3. */
const AGENT_SENTENCE =
  "A Claude agent() call's completion, its transcript and its session reference are observations only: the Claude topology adapter projects claude.call, claude.session and claude.tool-use snapshots with partial or unknown coverage and no Forge, Furnace, Beads or Git snapshot, edge or reference, and a claude-message evidence read carries no status or verdict, so a failed Forge gate stays failed and an open Beads item stays open whatever the transcript says.";
const HX_SENTENCE =
  "An HX answer is an observation only: the hyperunix.find reader adapter projects one hyperunix.query.snapshot whose evidence references are hx-binary and hx-coverage references only and no Beads, Forge, Furnace or Git kind or reference, and its one possible edge is the display grouping from the invoking operation the host names, so an HX answer never closes Beads work, passes a Forge gate or stands for a Furnace state or a Git basis.";

/** The tracker's executable name, composed so that no line of this file spells a tracker command. */
const BD = ["b", "d"].join("");
/** The authorities the statement names, as the provider literals Pi spells them ("bd" is the Beads producer name). */
const AUTHORITY_PROVIDERS: readonly string[] = ["beads", BD, "forge", "furnace", "git"];
/** The commands whose exec call is an authority construct: Git (a basis) and the Beads tracker. */
const AUTHORITY_COMMANDS: readonly string[] = ["git", BD];
/** The child-process entry points Pi calls by name (node:child_process and the extension API's pi.exec). */
const EXEC_CALLEES: readonly string[] = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"];
/** The SDKs whose values are observations (Claude results and transcripts, HX answers) and the SDKs of two authorities. */
const OBSERVATION_SDKS: readonly string[] = ["@anthropic-ai/claude-agent-sdk", "@hyperunix/sdk"];
const AUTHORITY_SDKS: readonly string[] = ["@forge/sdk", "@furnace/sdk"];
/** The observation-class module names: the Claude and HyperUnix adapters of src/workbench and the HX provider. */
const OBSERVATION_NAME = /^src\/workbench\/(?:claude-[a-z0-9-]+|hyperunix-[a-z0-9-]+|providers\/hyperunix)\.ts$/;
/** A tracker write in string or template text: the tracker, then close or update on the same line within 80 characters. */
const BD_WRITE_TEXT = new RegExp(`\\b${BD}\\b[^\\n]{0,80}?\\b(?:close|update)\\b`);
/** The three authority words of clause (b): rank, tier and the authorit- stem (authority, authoritative), any letter case. */
const AUTHORITY_TOKENS: Readonly<Record<string, RegExp>> = { rank: /rank/gi, tier: /tier/gi, authority: /authorit/gi };
const TOKEN_FILES: readonly string[] = ["src/workbench/evidence-loader.ts", "src/workbench/evidence-wiring.ts"];

/** The five src modules that import an observation-class module and an authority module (or build an authority construct). */
const HOLDERS: readonly string[] = [
  "src/index.ts",
  "src/workbench/evidence-producers.ts",
  "src/workbench/evidence-wiring.ts",
  "src/workbench/hosts/local-detached.ts",
  "src/workbench/native-modules.ts",
];
/** The five composition scopes of src that reference an observation-class binding and an authority binding together. */
interface ScopeReading {
  readonly file: string;
  readonly scope: string;
  readonly observation: readonly string[];
  readonly authority: readonly string[];
}
const COMPOSITION_SCOPES: readonly ScopeReading[] = [
  {
    file: "src/index.ts",
    scope: "function:default",
    observation: ["ClaudeCallIdentity", "createClaudeControlRetention"],
    authority: ["ForgeOperationObserver", "createWorkbenchEvidenceStore", "isWorktreeIsolationEnabled", "setWorktreeIsolationEnabled"],
  },
  { file: "src/index.ts", scope: "function:runWorkflowTask", observation: ["createClaudeControlObserver"], authority: ["loadWorkbenchNative"] },
  { file: "src/workbench/evidence-wiring.ts", scope: "interface:WorkbenchEvidenceDeps", observation: ["ClaudeTranscriptRow"], authority: ["FurnaceObserverClient"] },
  {
    file: "src/workbench/hosts/local-detached.ts",
    scope: "function:registryFor",
    observation: ["registerNativeHyperUnixFind"],
    authority: ["registerNativeForgeGateStatus", "registerNativeFurnaceRunInspect"],
  },
  {
    file: "src/workbench/native-modules.ts",
    scope: "interface:WorkbenchNativeModules",
    observation: ["createClaudeObserver", "createClaudeWorkflowHost", "readClaudeTranscript"],
    authority: ["Furnace", "openForgeOperationConnection"],
  },
];

/** The owner filing's own spellings the export row must carry (F1). */
const FILING_CONSTANTS: readonly string[] = [
  "[MW-CAC-WORKFLOW-COMPOSITION-R1]",
  "README.md:17@5ce2a07f891f",
  "claude-topology.ts:117-134",
  "claude-evidence.ts",
  "hyperunix-observer.ts",
  "collect.sh",
  "Gating artifact: none",
];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) vitest: a 'succeeded' Claude SDK fixture whose transcript says 'fixed' or 'PASS' yields claude.* snapshots with coverage partial|unknown, no forge/furnace/beads/git-provider snapshot, edge or ref, and leaves failed-forge and bd-open fixtures unchanged",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) hyperunixTopology over a hyperunix.find/v1 fixture carries no beads/forge/furnace/git kind, ref or edge; evidence-loader/-wiring keep 0 rank/tier/authority tokens",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) census: no src module derives Beads status, Forge verdict, Furnace state or Git basis from a Claude result, transcript or hx answer or calls bd close/update from them; collect.sh keeps 0 'bd close'",
    pins: ["C1", "C2", "C3"],
  },
  { id: "D", label: "(d) docs/07 § Agent provider and § HyperUnix provider each gain one census-bound sentence", pins: ["D1", "D2", "D3"] },
  {
    id: "F",
    label: "the owner filing row of wb-kku9.1 in the tracked bead export carries every pinned constant and names exactly the clauses rows A-D cover, each label equal to its clause",
    pins: ["F1"],
  },
  { id: "M", label: "the judge is live: one added derivation shape per pin reads as its named violation", pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"] },
  { id: "R", label: "the named residuals R1-R7 stay pinned quiet", pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7"] },
];
/** The case title of each pin (its id, then what it pins); the docs07 census binds A1-A4 and B1 by these titles. */
const PIN_TITLES: Readonly<Record<string, string>> = {
  A1: "A1: a succeeded Claude SDK run whose transcript says fixed and PASS settles ok and projects only claude.* snapshots, each with partial or unknown coverage",
  A2: "A2: that projection names no forge, furnace, beads or git provider in any snapshot, edge or evidence reference, and no transcript claim reaches it",
  A3: "A3: applying that projection beside a failed Forge gate and an open bd item leaves both nodes and their edges exactly as they were",
  A4: "A4: the transcript message the session lists reads as a claude-message preview with no status, verdict or authority field, whatever the message claims",
  B1: "B1: hyperunixTopology over hyperunix.find/v1 readings of every read kind, whose rows name tracker, gate, run and repository paths, carries no beads, forge, furnace or git kind, reference or edge",
  B2: "B2: evidence-loader.ts and evidence-wiring.ts hold no rank, tier or authority token",
  C1: "C1: the module graph: the observation class, the authority modules and the five holders are the measured rosters and no edge joins the first two outside the holders",
  C2: "C2: the only src scopes that read an observation-class binding beside an authority binding or construct are the five pinned composition scopes",
  C3: "C3: no src module execs the tracker or spells a tracker close or update, and the tracker seam has show alone",
  D1: "D1: docs/07 § Agent provider renders the observation-class sentence exactly once",
  D2: "D2: docs/07 § HyperUnix provider renders the HX answer sentence exactly once",
  D3: "D3: the docs07 provider-rules census quotes both sentences and binds this file",
  F1: "F1: the export row carries the pinned constants and its acceptance clauses are rows A-D",
  M1: "M1: an observation-class module building a forge provider literal",
  M2: "M2: an authority module type-importing the Claude transcript module",
  M3: "M3: an authority module loading the HX adapter by dynamic import",
  M4: "M4: a holder scope building a beads ref beside a Claude binding",
  M5: "M5: a tracker close exec call",
  M6: "M6: a tracker update spelled in a string",
  M7: "M7: an authority module re-exporting a Claude evidence type",
  M8: "M8: a new module importing the Claude host and the Forge observer",
  M9: "M9: an observation-class module type-importing the Forge observer",
  R1: "R1 R-HOST-OPERATION: the HX adapter echoes the operation the host names as its display grouping, and no src module calls either topology adapter",
  R2: "R2 R-CROSS-SCOPE: a value carried between two scopes is not traced",
  R3: "R3 R-COMPOSED: a provider or command that is not a string literal at its construct is not read",
  R4: "R4 R-OUT-OF-REPO: no file named collect.sh is part of this repository",
  R5: "R5 R-EXECUTOR-OUTCOME: the Furnace host is an authority module that imports no observation-class module",
  R6: "R6 R-NAMING: a module reading HX values under another name, importing no observation-class module, is not in the class",
  R7: "R7 R-TEST-TREE: only src is walked, while the test tree builds authority refs on purpose",
};

interface RosterPin {
  readonly id: string;
  readonly title: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly RosterRow[];
}
const ROSTER = JSON.parse(readFileSync(ROSTER_PATH, "utf8")) as Roster;
const rosterWitness = (pin: string): Json => {
  for (const row of ROSTER.rows) for (const entry of row.pins) if (entry.id === pin) return entry.witness;
  throw new Error(`the roster holds no witness for ${pin}`);
};

const textOf = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sorted = (values: Iterable<string>): string[] => [...new Set(values)].sort();

// --- the src walk and the judge -------------------------------------------------------------------------------------

interface SourceModule {
  readonly path: string;
  readonly text: string;
}
/** The parts of a directory entry the walk reads: node:fs Dirent's own type predicates. */
interface WalkEntry {
  readonly name: string;
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
}
/** A directory's entries as the disk lists them. */
const diskEntries = (dir: string): readonly WalkEntry[] => readdirSync(dir, { withFileTypes: true });
interface Listing {
  /** Every regular file below the root, base-relative with / separators. */
  readonly files: readonly string[];
  /** Every symbolic link below the root (wb-4tdn F2): listed, never followed. */
  readonly links: readonly string[];
}
/** Every regular file and every symbolic link below a directory, base-relative with / separators and sorted; a link is listed and
 * never followed. Every walk reads the disk; C1's planted reach control hands the same walk an in-memory tree instead. */
function listBelow(base: string, root: string, entriesOf: (dir: string) => readonly WalkEntry[] = diskEntries): Listing {
  const files: string[] = [];
  const links: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of entriesOf(dir)) {
      const path = join(dir, entry.name);
      const listed = relative(base, path).split(sep).join("/");
      if (entry.isSymbolicLink()) links.push(listed);
      else if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files.push(listed);
    }
  };
  walk(join(base, root));
  return { files: files.sort(), links: links.sort() };
}
/** Every regular .ts file below a directory, repository-relative with / separators; symlinks are not followed. */
function tsFilesBelow(root: string): string[] {
  return listBelow(REPO, root).files.filter(path => path.endsWith(".ts"));
}
const WALK_ROOTS: readonly string[] = ["src"];
const srcModules = (): SourceModule[] => WALK_ROOTS.flatMap(root => tsFilesBelow(root)).map(path => ({ path, text: textOf(path) }));
/** tsconfig.json's program (its include reads every .ts file below src): the product's own module set, repository-relative and
 * sorted - an anchor outside this census that every src landing moves with it (the gp-cache-scope census reads the same program as
 * srcIsProgram). */
function programModules(): string[] {
  const parsed = ts.getParsedCommandLineOfConfigFile(
    join(REPO, "tsconfig.json"),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: diagnostic => {
        throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      },
    },
  );
  if (parsed === undefined || parsed.errors.length > 0) throw new Error("tsconfig.json did not parse");
  return parsed.fileNames.map(file => relative(REPO, file).split(sep).join("/")).sort();
}
/** A floor below the src module count (115 at bff0b3c, 116 at 3a71372; the ri-decision-seed-claim census holds the same src
 * floor), so the walk is never blind; C1 pins this floor and the program, never the count. */
const MODULES_FLOOR = 105;
/** The file names TypeScript reads as sources: its own public Extension enum (.ts, .tsx, .d.ts, .js, .jsx and the .mts, .d.mts, .mjs
 * and .cts, .d.cts, .cjs families), an anchor outside this census, with its two non-source members aside (.json, .tsbuildinfo). */
const SOURCE_EXTENSIONS: readonly string[] = Object.values(ts.Extension).filter(extension => extension !== ts.Extension.Json && extension !== ts.Extension.TsBuildInfo);
const isSource = (path: string): boolean => SOURCE_EXTENSIONS.some(extension => path.endsWith(extension));
interface Reach {
  /** The source files below the roots that the program does not hold (the judge never reads them). */
  readonly outsideProgram: readonly string[];
  /** The links below the roots (the walk follows none). */
  readonly links: readonly string[];
}
/** The walk's reach over listings against a program (wb-4tdn F2): C1 holds src's to neither. */
const reachOf = (listings: readonly Listing[], program: readonly string[]): Reach => ({
  outsideProgram: sorted(listings.flatMap(listing => listing.files).filter(path => isSource(path) && !program.includes(path))),
  links: sorted(listings.flatMap(listing => listing.links)),
});

/** A package specifier's package (scope and name); a relative one resolved against its module, .js read as the .ts source. */
function resolveSpecifier(from: string, specifier: string): string {
  if (!specifier.startsWith(".")) {
    const parts = specifier.split("/");
    return (specifier.startsWith("@") ? parts.slice(0, 2) : parts.slice(0, 1)).join("/");
  }
  return posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\.js$/, ".ts");
}
const nameOf = (name: ts.PropertyName | ts.BindingName | undefined): string =>
  name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isPrivateIdentifier(name)) ? name.text : "";
const calleeName = (expression: ts.Expression): string =>
  ts.isIdentifier(expression) ? expression.text : ts.isPropertyAccessExpression(expression) ? expression.name.text : "";
const isFunctionLike = (node: ts.Node): boolean =>
  ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node) ||
  ts.isConstructorDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node);
/** The local names a module's import specifiers alias an EXEC_CALLEES name to (import { execFileSync as run }): an import binding,
 * read by its name like every import binding, never a value traced (wb-4tdn F1). */
function importAliases(sf: ts.SourceFile): ReadonlyMap<string, string> {
  const aliases = new Map<string, string>();
  for (const statement of sf.statements) {
    const named = ts.isImportDeclaration(statement) ? statement.importClause?.namedBindings : undefined;
    if (named === undefined || !ts.isNamedImports(named)) continue;
    for (const element of named.elements) {
      const imported = element.propertyName === undefined ? "" : nameOf(element.propertyName);
      if (EXEC_CALLEES.includes(imported)) aliases.set(element.name.text, imported);
    }
  }
  return aliases;
}
/** A callee's exec name: an identifier's own (or the EXEC_CALLEES name its import specifier aliases), a property's, or a
 * string-keyed element's (cp["execFileSync"]). */
function execNameOf(expression: ts.Expression, aliases: ReadonlyMap<string, string>): string {
  if (ts.isIdentifier(expression)) return aliases.get(expression.text) ?? expression.text;
  if (ts.isElementAccessExpression(expression)) return ts.isStringLiteralLike(expression.argumentExpression) ? expression.argumentExpression.text : "";
  return calleeName(expression);
}
/** What ends a command word: whitespace, a quote (' " `) or a shell operator (; & | ( ) < >). */
const COMMAND_BREAK = /[\s'"`;&|()<>]+/;
/** A text's command words, each read by its last path segment (after / or \) with one trailing .exe dropped. */
const commandWords = (text: string): string[] => text.split(COMMAND_BREAK).map(word => (word.split(/[/\\]/).at(-1) ?? "").replace(/\.exe$/, ""));
/** The authority commands an exec call names: a command word of its string-literal first argument, or of a string-literal element of
 * an array-literal second argument (its argv), that is git or the tracker. */
function commandsOf(call: ts.CallExpression): string[] {
  const [first, argv] = call.arguments;
  const texts = [first, ...(argv !== undefined && ts.isArrayLiteralExpression(argv) ? argv.elements : [])].flatMap(node =>
    node !== undefined && ts.isStringLiteralLike(node) ? [node.text] : [],
  );
  return AUTHORITY_COMMANDS.filter(command => texts.some(text => commandWords(text).includes(command)));
}
/** An identifier that names a declaration, a member or an import/export slot rather than reading a binding. */
function isNamePosition(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (parent === undefined) return false;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isExportSpecifier(parent) || ts.isImportEqualsDeclaration(parent)) return true;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return true;
  if (ts.isQualifiedName(parent) && parent.right === node) return true;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent) || ts.isMethodSignature(parent)) && parent.name === node) return true;
  return ts.isBindingElement(parent) && parent.propertyName === node;
}

interface ParsedModule {
  readonly path: string;
  readonly sf: ts.SourceFile;
  /** Every module this one loads or names: static, type-only, export-from, import(), require() and import("...") types. */
  readonly edges: ReadonlySet<string>;
  /** Local import binding -> the module it comes from. */
  readonly bindings: ReadonlyMap<string, string>;
  readonly constructs: readonly { readonly kind: string; readonly node: ts.Node }[];
  readonly writeSpellings: number;
}
/** Parsed modules by path and text, so a variant of the tree re-parses only the module it changed. */
const PARSED = new Map<string, ParsedModule>();
function parseModule(module: SourceModule): ParsedModule {
  const key = `${module.path}\n${module.text}`;
  const cached = PARSED.get(key);
  if (cached !== undefined) return cached;
  const parsed = parseFresh(module);
  PARSED.set(key, parsed);
  return parsed;
}
function parseFresh(module: SourceModule): ParsedModule {
  const sf = ts.createSourceFile(module.path, module.text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const edges = new Set<string>();
  const bindings = new Map<string, string>();
  const constructs: { kind: string; node: ts.Node }[] = [];
  let writeSpellings = 0;
  const execAliases = importAliases(sf);
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const target = resolveSpecifier(module.path, node.moduleSpecifier.text);
      edges.add(target);
      const clause = ts.isImportDeclaration(node) ? node.importClause : undefined;
      if (clause?.name !== undefined) bindings.set(clause.name.text, target);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) bindings.set(named.name.text, target);
      if (named !== undefined && ts.isNamedImports(named)) for (const element of named.elements) bindings.set(element.name.text, target);
    }
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression)) {
      const target = resolveSpecifier(module.path, node.moduleReference.expression.text);
      edges.add(target);
      bindings.set(node.name.text, target);
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) edges.add(resolveSpecifier(module.path, node.argument.literal.text));
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      const literal = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
      const loads = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (literal !== undefined && loads) edges.add(resolveSpecifier(module.path, literal));
      if (EXEC_CALLEES.includes(execNameOf(node.expression, execAliases))) for (const command of commandsOf(node)) constructs.push({ kind: `exec:${command}`, node });
    }
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === "provider" && ts.isStringLiteralLike(node.initializer) && AUTHORITY_PROVIDERS.includes(node.initializer.text)) {
      constructs.push({ kind: `provider:${node.initializer.text}`, node });
    }
    if ((ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && BD_WRITE_TEXT.test(node.text)) writeSpellings += 1;
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { path: module.path, sf, edges, bindings, constructs, writeSpellings };
}

/** The scope a node reads in: its innermost function; outside every function, its innermost object literal below the
 * top-level statement, else that statement. Two readings share a scope only when they share one of those nodes. */
function scopeOf(node: ts.Node, sf: ts.SourceFile): ts.Node {
  let object: ts.Node | undefined;
  for (let at = node.parent; at !== undefined; at = at.parent) {
    if (isFunctionLike(at)) return at;
    if (at.parent === sf) return object ?? at;
    if (object === undefined && ts.isObjectLiteralExpression(at)) object = at;
  }
  return sf;
}
/** A scope's stable name: its kind and the name of the declaration, variable or property it is (never a line number). */
function scopeLabel(scope: ts.Node): string {
  const named = (kind: string, name: string): string => `${kind}:${name || "default"}`;
  if (ts.isFunctionDeclaration(scope)) return named("function", scope.name?.text ?? "");
  if (ts.isInterfaceDeclaration(scope)) return named("interface", scope.name.text);
  if (ts.isTypeAliasDeclaration(scope)) return named("type", scope.name.text);
  if (ts.isClassDeclaration(scope)) return named("class", scope.name?.text ?? "");
  if (ts.isVariableStatement(scope)) return named("const", scope.declarationList.declarations.map(declaration => nameOf(declaration.name)).join(","));
  if (ts.isMethodDeclaration(scope) || ts.isGetAccessorDeclaration(scope) || ts.isSetAccessorDeclaration(scope)) return named("method", nameOf(scope.name));
  if (ts.isConstructorDeclaration(scope)) return "constructor";
  const parent = scope.parent;
  const kind = ts.isObjectLiteralExpression(scope) ? "object" : "arrow";
  if (parent !== undefined && ts.isVariableDeclaration(parent)) return named(kind, nameOf(parent.name));
  if (parent !== undefined && ts.isPropertyAssignment(parent)) return named(kind, nameOf(parent.name));
  if (parent !== undefined && ts.isCallExpression(parent)) return named(kind, `argument-of-${calleeName(parent.expression)}`);
  return named(kind, ts.SyntaxKind[scope.kind]);
}

interface Analysis {
  readonly modules: number;
  readonly observation: readonly string[];
  readonly authority: readonly string[];
  readonly holders: readonly string[];
  readonly mixedScopes: readonly ScopeReading[];
  readonly trackerExecs: readonly string[];
  readonly trackerWriteSpellings: readonly string[];
  readonly violations: readonly string[];
}
/** The census judge over a module set: the classes, the holders, the mixed scopes and every violation, each named. */
function analyze(modules: readonly SourceModule[]): Analysis {
  const parsed = modules.map(parseModule);
  const sdkObservation = (target: string): boolean => OBSERVATION_SDKS.includes(target);
  const observation = new Set(parsed.filter(module => OBSERVATION_NAME.test(module.path) || [...module.edges].some(sdkObservation)).map(module => module.path));
  const authority = new Set(parsed.filter(module => module.constructs.length > 0 || [...module.edges].some(edge => AUTHORITY_SDKS.includes(edge))).map(module => module.path));
  const isObservation = (target: string): boolean => sdkObservation(target) || observation.has(target);
  const isAuthority = (target: string): boolean => AUTHORITY_SDKS.includes(target) || authority.has(target);
  const violations: string[] = [];
  const holders: string[] = [];
  const mixedScopes: ScopeReading[] = [];
  for (const module of parsed) {
    const edges = [...module.edges];
    if (observation.has(module.path)) {
      for (const construct of module.constructs) violations.push(`observation-builds-authority ${module.path} ${construct.kind}`);
      for (const edge of edges.filter(isAuthority)) violations.push(`observation-imports-authority ${module.path} -> ${edge}`);
      continue;
    }
    const readsObservation = edges.filter(isObservation);
    if (readsObservation.length > 0 && (authority.has(module.path) || edges.some(isAuthority))) {
      holders.push(module.path);
      // An authority module that reads the observation class is named by its edges; any other module importing both kinds is
      // a holder the roster must name.
      if (!HOLDERS.includes(module.path) && authority.has(module.path)) for (const edge of readsObservation) violations.push(`authority-imports-observation ${module.path} -> ${edge}`);
      else if (!HOLDERS.includes(module.path)) violations.push(`unpinned-holder ${module.path}`);
    }
    // The scopes: every read of an observation-class binding beside an authority binding or construct.
    const observationReads = new Map<ts.Node, Set<string>>();
    const authorityReads = new Map<ts.Node, Set<string>>();
    const note = (reads: Map<ts.Node, Set<string>>, scope: ts.Node, name: string): void => {
      const names = reads.get(scope) ?? new Set<string>();
      names.add(name);
      reads.set(scope, names);
    };
    const visit = (node: ts.Node): void => {
      if (ts.isIdentifier(node) && !isNamePosition(node)) {
        const from = module.bindings.get(node.text);
        if (from !== undefined && isObservation(from)) note(observationReads, scopeOf(node, module.sf), node.text);
        if (from !== undefined && isAuthority(from)) note(authorityReads, scopeOf(node, module.sf), node.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(module.sf);
    for (const construct of module.constructs) note(authorityReads, scopeOf(construct.node, module.sf), construct.kind);
    for (const [scope, names] of observationReads) {
      const beside = authorityReads.get(scope);
      if (beside === undefined) continue;
      const reading: ScopeReading = { file: module.path, scope: scopeLabel(scope), observation: sorted(names), authority: sorted(beside) };
      mixedScopes.push(reading);
      const pinned = COMPOSITION_SCOPES.find(entry => entry.file === reading.file && entry.scope === reading.scope);
      if (pinned === undefined) violations.push(`mixed-scope ${reading.file} ${reading.scope} [${reading.observation.join(",")}] [${reading.authority.join(",")}]`);
      else if (JSON.stringify(pinned) !== JSON.stringify(reading)) violations.push(`composition-scope-drift ${reading.file} ${reading.scope}`);
    }
  }
  const trackerExecs = parsed.filter(module => module.constructs.some(construct => construct.kind === `exec:${BD}`)).map(module => module.path);
  const trackerWriteSpellings = parsed.filter(module => module.writeSpellings > 0).map(module => module.path);
  for (const path of trackerExecs) violations.push(`tracker-exec ${path}`);
  for (const path of trackerWriteSpellings) violations.push(`tracker-write-spelling ${path}`);
  return {
    modules: parsed.length,
    observation: sorted(observation),
    authority: sorted(authority),
    holders: sorted(holders),
    mixedScopes: mixedScopes.sort((left, right) => `${left.file} ${left.scope}`.localeCompare(`${right.file} ${right.scope}`)),
    trackerExecs,
    trackerWriteSpellings,
    violations,
  };
}
let realAnalysis: Analysis | undefined;
const real = (): Analysis => {
  realAnalysis ??= analyze(srcModules());
  return realAnalysis;
};
/** The judge over the real src tree with one module added, or one module's text extended in memory (nothing is written). */
function withModule(path: string, text: string, mode: "add" | "extend"): Analysis {
  const modules = srcModules();
  if (mode === "add") return analyze([...modules, { path, text }]);
  expect(modules.some(module => module.path === path), `${path} is a src module`).toBe(true);
  return analyze(modules.map(module => (module.path === path ? { path, text: `${module.text}\n${text}\n` } : module)));
}
/** The violations a change adds over the real tree's (which holds none). */
const added = (analysis: Analysis): string[] => analysis.violations.filter(line => !real().violations.includes(line));
/** The judge over the real src tree with modules added in memory (nothing is written). */
const withModules = (extra: readonly SourceModule[]): Analysis => analyze([...srcModules(), ...extra]);

/** C1's planted reach control (wb-4tdn F2): an in-memory tree that listBelow walks exactly as it walks src, these entries handed in
 * for the disk's: one program module, two source modules outside its program (the gate's L2-9 .tsx, a .mjs), a link (the gate's
 * L2-5, never followed), a markdown note and a JSON file (neither a source). */
const REACH_PLANT_BASE = join(sep, "fwg-reach-plants");
const REACH_PLANTS: Readonly<Record<string, "file" | "link">> = {
  "src/index.ts": "file",
  "src/lib/tool.mjs": "file",
  "src/notes.md": "file",
  "src/schema.json": "file",
  "src/workbench/claude-fwg-probe.tsx": "file",
  "src/workbench/fwg-link.ts": "link",
};
const REACH_PLANT_PROGRAM: readonly string[] = ["src/index.ts"];
/** One directory's entries of the planted tree, in the shape the disk gives them. */
function plantEntries(dir: string): WalkEntry[] {
  const at = relative(REACH_PLANT_BASE, dir).split(sep).join("/");
  const kinds = new Map<string, "file" | "link" | "directory">();
  for (const [path, kind] of Object.entries(REACH_PLANTS)) {
    if (!path.startsWith(`${at}/`)) continue;
    const [name = "", ...below] = path.slice(at.length + 1).split("/");
    kinds.set(name, below.length > 0 ? "directory" : kind);
  }
  return [...kinds].map(([name, kind]) => ({ name, isDirectory: () => kind === "directory", isFile: () => kind === "file", isSymbolicLink: () => kind === "link" }));
}

/** M5's spellings (wb-4tdn F1): one added src module per spelling, each one exec call of the tracker (show, so no write spelling
 * joins it). A read spelling is a kill control the judge names as a tracker exec; an unread one is a pinned quiet row (the
 * header's NOT CLAIMED list, its R2 and R3 members named there). */
interface ExecSpelling {
  readonly id: string;
  readonly read: boolean;
  readonly text: string;
}
const CHILD_IMPORTS = 'import * as cp from "node:child_process";\nimport { execFile, execFileSync, execSync, spawnSync } from "node:child_process";';
const spelling = (id: string, read: boolean, body: string): ExecSpelling => ({ id, read, text: `${CHILD_IMPORTS}\n${body}` });
const EXEC_SPELLINGS: readonly ExecSpelling[] = [
  // Read: the callee, an EXEC_CALLEES name as an identifier, a property, a string-keyed element or an import specifier's alias.
  spelling("literal", true, `export const run = (id: string) => execFileSync("${BD}", ["show", id]);`),
  spelling("property", true, `export const run = (id: string) => cp.execFileSync("${BD}", ["show", id]);`),
  spelling("element", true, `export const run = (id: string) => cp["execFileSync"]("${BD}", ["show", id]);`),
  spelling("import-alias", true, `import { execFileSync as zzRun } from "node:child_process";\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  // Read: the program, a command word of the string-literal first argument.
  spelling("no-substitution", true, `export const run = (id: string) => execFileSync(\`${BD}\`, ["show", id]);`),
  spelling("path", true, `export const run = (id: string) => execFileSync("/usr/local/bin/${BD}", ["show", id]);`),
  spelling("exe", true, `export const run = (id: string) => execFileSync("${BD}.exe", ["show", id]);`),
  spelling("windows-path", true, `export const run = (id: string) => execFileSync("C:\\\\tools\\\\${BD}.exe", ["show", id]);`),
  spelling("shell-line", true, `export const run = () => execSync("${BD} show wb-1 --json");`),
  spelling("shell-later", true, `export const run = () => execSync("cd /tmp && ${BD} show wb-1");`),
  // Read: the argv, a command word of a string-literal element of an array-literal second argument.
  spelling("argv-env", true, `export const run = (id: string) => spawnSync("env", ["${BD}", "show", id]);`),
  spelling("argv-later", true, `export const run = (id: string) => spawnSync("sudo", ["-u", "ops", "${BD}", "show", id]);`),
  spelling("argv-no-substitution", true, `export const run = (id: string) => spawnSync("env", [\`${BD}\`, "show", id]);`),
  spelling("argv-shell", true, `export const run = () => spawnSync("sh", ["-c", "${BD} show wb-1"]);`),
  // Read: each word break alone (a whitespace, a quote or a shell operator on both sides of the command word).
  spelling("break-tab", true, `export const run = () => execSync("x\\t${BD}\\ty");`),
  spelling("break-newline", true, `export const run = () => execSync("x\\n${BD}\\ny");`),
  spelling("break-single-quote", true, `export const run = () => execSync("x'${BD}'y");`),
  spelling("break-double-quote", true, `export const run = () => execSync('x"${BD}"y');`),
  spelling("break-backquote", true, `export const run = () => execSync("x\`${BD}\`y");`),
  spelling("break-semicolon", true, `export const run = () => execSync("x;${BD};y");`),
  spelling("break-ampersand", true, `export const run = () => execSync("x&${BD}&y");`),
  spelling("break-pipe", true, `export const run = () => execSync("x|${BD}|y");`),
  spelling("break-open-paren", true, `export const run = () => execSync("x(${BD}(y");`),
  spelling("break-close-paren", true, `export const run = () => execSync("x)${BD})y");`),
  spelling("break-less", true, `export const run = () => execSync("x<${BD}<y");`),
  spelling("break-greater", true, `export const run = () => execSync("x>${BD}>y");`),
  // Unread, R2 R-CROSS-SCOPE: an exec entry point carried in a module-level const or a destructuring, or returned by promisify, and
  // a command passed into a wrapper function's parameter.
  spelling("const-alias", false, `const zzRun = execFileSync;\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  spelling("destructured-alias", false, `const { execFileSync: zzRun } = cp;\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  spelling("promisified", false, `import { promisify } from "node:util";\nconst zzRun = promisify(execFile);\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  spelling("wrapper-function", false, `const zzRun = (command: string, args: string[]) => execFileSync(command, args);\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  // Unread, R3 R-COMPOSED: a command that is not a string literal at its construct.
  spelling("const-command", false, `const zzCommand = "${BD}";\nexport const run = (id: string) => execFileSync(zzCommand, ["show", id]);`),
  spelling("concatenated", false, `export const run = (id: string) => execSync("${BD}" + " show " + id);`),
  spelling("template-command", false, `export const run = (id: string) => execSync(\`${BD} show \${id}\`);`),
  spelling("argv-held", false, `const zzArgv = ["${BD}", "show"];\nexport const run = () => spawnSync("env", zzArgv);`),
  // Unread, NOT CLAIMED: the callee, the argument position, the word and the API outside the readings.
  spelling("local-alias", false, `export const run = (id: string) => {\n  const zzRun = execFileSync;\n  return zzRun("${BD}", ["show", id]);\n};`),
  spelling("member-held", false, `const zzTools = { zzRun: execFileSync };\nexport const run = (id: string) => zzTools.zzRun("${BD}", ["show", id]);`),
  spelling("re-exported", false, `import { zzRun } from "./zz-4tdn-exec-helpers.js";\nexport const run = (id: string) => zzRun("${BD}", ["show", id]);`),
  spelling("call-through", false, `export const run = (id: string) => execFileSync.call(undefined, "${BD}", ["show", id]);`),
  spelling("apply-through", false, `export const run = (id: string) => execFileSync.apply(undefined, ["${BD}", ["show", id]]);`),
  spelling("paren-callee", false, `export const run = (id: string) => (execFileSync)("${BD}", ["show", id]);`),
  spelling("comma-callee", false, `export const run = (id: string) => (0, execFileSync)("${BD}", ["show", id]);`),
  spelling("typed-callee", false, `export const run = (id: string) => (execFileSync as typeof execFileSync)("${BD}", ["show", id]);`),
  spelling("typed-literal", false, `export const run = (id: string) => execFileSync("${BD}" as string, ["show", id]);`),
  spelling("typed-argv", false, `export const run = (id: string) => spawnSync("env", ["${BD}", "show", id] as const);`),
  spelling("tagged-template", false, `export const run = () => execSync(String.raw\`${BD} show wb-1\`);`),
  spelling("argv-first", false, `export const run = (id: string) => cp.spawn(["${BD}", "show", id]);`),
  spelling("spliced", false, `export const run = () => execSync("${BD.charAt(0)}''${BD.charAt(1)} show wb-1");`),
  spelling("escaped", false, `export const run = () => execSync("${BD.charAt(0)}\\\\${BD.charAt(1)} show wb-1");`),
  spelling("letter-case", false, `export const run = (id: string) => execFileSync("${BD.toUpperCase()}", ["show", id]);`),
  spelling("other-suffix", false, `export const run = (id: string) => execFileSync("${BD}.cmd", ["show", id]);`),
  spelling("expansion", false, `export const run = () => execSync("\${ZZ:-${BD}} show wb-1");`),
  spelling("word-part", false, `export const run = () => execFileSync("rf", ["--${BD}", "x=${BD}", "${BD}-helper", "${BD}s"]);`),
  spelling("other-api", false, `import { execa } from "execa";\nexport const run = (id: string) => execa("${BD}", ["show", id]);`),
];
const spellingPath = (id: string): string => `src/workbench/zz-4tdn-${id}.ts`;
/** The filed plant: the gate's L2-3 members (a path-qualified program, a wrapper's argv, an aliased import), appended to the
 * observation-class claude-control.ts as the finding filed them. */
const FILED_MODULE = "src/workbench/claude-control.ts";
const FILED_PLANT = [
  'import { execFileSync, spawnSync, execFileSync as fwProbeRun } from "node:child_process";',
  `export const fwProbeByPath = (id: string) => execFileSync("/usr/local/bin/${BD}", ["close", id]);`,
  `export const fwProbeViaEnv = (id: string) => spawnSync("env", ["${BD}", "close", id]);`,
  `export const fwProbeAliased = (id: string) => fwProbeRun("${BD}", ["close", id]);`,
].join("\n");

// --- the Claude fixture -----------------------------------------------------------------------------------------------

const scope: ObservationScope = { workspace: "/tmp/observation-class-ws", principal: "local-operator:tester" };
const invocationId = "wf_observation_class";
const call: ClaudeCallIdentity = { agentId: "agent-gate-fix", index: 0, label: "repair the red gate" };
const SESSION = "sess-observation-class";
/** RFC 4122-shaped message ids (obviously fake), so the session lists its last message as claude-message evidence. */
const FIRST_MESSAGE = "00000000-0000-4000-8000-000000000001";
const LAST_MESSAGE = "00000000-0000-4000-8000-000000000005";
/** The transcript's claims: what the agent says it did. None of it is evidence of a gate, a run, a bead or a revision. */
const CLAIMS: readonly string[] = ["fixed", "PASS"];
const FINAL_TEXT = "All fixed. The gate is PASS and the bead is closed.";
const message = (value: unknown): SDKMessage => value as SDKMessage;
const RUN: readonly SDKMessage[] = [
  message({ type: "system", subtype: "init", session_id: SESSION, uuid: "init-frame", model: "claude-fixture-model" }),
  message({
    type: "assistant",
    uuid: FIRST_MESSAGE,
    session_id: SESSION,
    message: {
      content: [
        { type: "text", text: "The red gate is fixed; rerunning it to show PASS." },
        { type: "tool_use", id: "toolu_gate", name: "Bash", input: { command: "forge build --require-complete" } },
      ],
    },
  }),
  message({ type: "user", uuid: "00000000-0000-4000-8000-000000000002", session_id: SESSION, message: { role: "user", content: [{ type: "tool_result", tool_use_id: "toolu_gate", content: "PASS", is_error: false }] } }),
  message({
    type: "assistant",
    uuid: "00000000-0000-4000-8000-000000000003",
    session_id: SESSION,
    message: { content: [{ type: "text", text: "PASS. Closing the bead as fixed." }, { type: "tool_use", id: "toolu_close", name: "Bash", input: { command: `${BD} close wb-observation-1` } }] },
  }),
  message({ type: "user", uuid: "00000000-0000-4000-8000-000000000004", session_id: SESSION, message: { role: "user", content: [{ type: "tool_result", tool_use_id: "toolu_close", content: "closed", is_error: false }] } }),
  message({ type: "assistant", uuid: LAST_MESSAGE, session_id: SESSION, message: { content: [{ type: "text", text: FINAL_TEXT }] } }),
  message({ type: "result", subtype: "success", uuid: "result-frame", session_id: SESSION, is_error: false, result: `PASS: ${FINAL_TEXT}` }),
];

interface ClaudeReading {
  readonly ok: boolean;
  readonly text: string;
  readonly samples: readonly ClaudeNativeObservation[];
  readonly topology: ClaudeProjectionTopology;
}
let claudeReading: ClaudeReading | undefined;
/** The succeeded run through the real host and observer, the SDK query replaced by the fixture stream; then the topology. */
async function claudeRun(): Promise<ClaudeReading> {
  if (claudeReading !== undefined) return claudeReading;
  const samples: ClaudeNativeObservation[] = [];
  const observer = createClaudeObserver((_identity, sample) => samples.push(sample));
  const host = createClaudeWorkflowHost({
    cwd: REPO,
    ...observer,
    query: () =>
      (async function* () {
        for (const frame of RUN) yield frame;
      })(),
  });
  const result = await host.spawnAgent({ ...call, prompt: "repair the red gate", agentType: "general-purpose" });
  const last = samples.at(-1);
  expect(last, "the observer published a terminal sample").toBeDefined();
  if (last === undefined) throw new Error("no terminal sample");
  const topology = projectClaudeTopology({ call, snapshot: last, scope, invocationId, observedAt: "2026-10-23T19:00:00.000Z", sequence: 7 });
  claudeReading = { ok: result.ok, text: result.text ?? "", samples, topology };
  return claudeReading;
}
const providerOf = (ref: NativeRef): string => ref.provider;
const prefixOf = (ref: string): string => ref.slice(0, Math.max(0, ref.indexOf(":")));

// --- the authority fixtures: a failed Forge gate and an open bd item -----------------------------------------------------

/** A current failed gate in the gate.status reader's measured shape (test/workbench-forge-observer.test.ts F2). */
const FAILED_GATE: JsonValue = {
  contract: "forge.gate.status/v1",
  protocolMethod: "gate.status",
  source: {
    status: "success",
    envelope: { verdict: null, reason_code: "FORGE_OK" },
    data: { packages: [{ ref: "code:pi-subagents", last_result: "failure", authoritative_current: true, verification_ref: "cmd_failed" }] },
  },
};
const forgeContext = { scope, target: scope.workspace, capturedAt: "2026-10-23T18:59:00Z", observedAt: "2026-10-23T18:59:01Z" };
/** bd 1.1.0-rc.1's `show --json` array for an open item (test/workbench-beads-observer.test.ts). */
const OPEN_ITEM = [{ id: "wb-observation-1", title: "the work the agent claims it closed", status: "open", issue_type: "task", priority: 2, dependencies: [], notes: "NOTES", description: "DESCRIPTION" }];
async function openItemSnapshot(): Promise<{ snapshot: NativeSnapshot; relations: Parameters<ObservationProjection["relate"]>[0][] }> {
  const client: BeadsReadClient = { show: async () => ({ exit: 0, stdout: JSON.stringify(OPEN_ITEM), stderr: "" }) };
  const reading = await readBeadsWork(client, {
    workId: "wb-observation-1",
    workspaceRoot: scope.workspace,
    scope,
    limits: { maxDependencies: 8, maxTitleChars: 80, timeoutMs: 5000 },
    now: () => "2026-10-23T18:59:30.000Z",
  });
  return projectBeadsWork(reading, scope);
}

// --- the HX fixtures ----------------------------------------------------------------------------------------------------

const HX_BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
/** Rows that name the four authorities' own files; the adapter never reads a row body. */
const AUTHORITY_ROWS: readonly JsonObject[] = [{ path: ".beads/issues.jsonl" }, { path: "forge.toml" }, { path: ".furnace/runs" }, { path: ".git/HEAD" }];
const hxContext = (operationRef?: NativeRef): HyperUnixTopologyContext => ({
  scope,
  target: { kind: "hx.fs/regular-file", root: "." },
  capturedAt: "2026-10-23T19:01:00Z",
  observedAt: "2026-10-23T19:01:01Z",
  ...(operationRef === undefined ? {} : { operationRef }),
});
/** The node call that issued the read, named the way src/index.ts names a workflow node without a native id. */
const NODE_CALL: NativeRef = { provider: "pi-workflow", type: "node-call", id: "wf_observation_class:0" };
const certificate = (batch: string): JsonObject => ({
  mode: "opportunistic",
  cause: { cause: "other", detail: "No_change_exclusion" },
  scope: { path: [], scope: "fs-subtree" },
  target: { target: "relation-expansion" },
  provider: "hx.fs/builtin",
  stream: "hx-fs",
  batch_id: batch,
  body: { mode: "opportunistic" },
});
/** One hyperunix.find/v1 reading in the shape the registered provider returns. */
function hxReading(kind: string, licensed: boolean): JsonValue {
  return {
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed },
      rows: kind === "complete-empty" ? [] : [...AUTHORITY_ROWS],
      rows_retained: true,
      operation: "find",
      coverage: [certificate("b1"), certificate("b2")],
    },
    workspaceRoot: scope.workspace,
    runtime: { version: "0.1.0", binarySha256: HX_BINARY },
  };
}
/** The measured live document of test/workbench-hyperunix-observer.test.ts, rows swapped for the authority paths, put through the
 * provider's own path (resultFromJson, resultToJson, a JSON round trip). */
function hxProviderReading(): JsonValue {
  const document: JsonObject = {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [...AUTHORITY_ROWS],
    rows_retained: true,
    coverage: [certificate("b1"), certificate("b2")],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 12, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 12 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-10-23T19:00:59.000Z", startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 100, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 12 },
    workspace_root: scope.workspace,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: ["opportunistic"],
      completeness: "incomplete",
      licenses_absence: false,
      certificates_license_absence: false,
      incomplete_regions: [],
      result_coverage: null,
      answer_count: 4,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
  return JSON.parse(
    JSON.stringify({ contract: "hyperunix.find/v1", source: resultToJson(resultFromJson(document)), workspaceRoot: scope.workspace, runtime: { version: "0.1.0", binarySha256: HX_BINARY } }),
  ) as JsonValue;
}
const READ_KINDS: readonly string[] = HYPERUNIX_EXECUTION_KINDS.filter(kind => !kind.startsWith("mutation-"));

// --- the cases ----------------------------------------------------------------------------------------------------------

const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const { ok, text, samples, topology } = await claudeRun();
    const last = samples.at(-1);
    const witness = {
      ok,
      terminal: last?.terminal ?? null,
      freshness: last?.freshness ?? null,
      claimsInStepText: CLAIMS.filter(claim => text.includes(claim)),
      samples: samples.length,
      kinds: sorted(topology.snapshots.map(snapshot => snapshot.kind ?? "")),
      coverages: sorted(topology.snapshots.map(snapshot => snapshot.coverage ?? "")),
    };
    expect(witness.ok).toBe(true);
    expect(witness.terminal).toBe("succeeded");
    expect(witness.claimsInStepText).toEqual([...CLAIMS]);
    expect(witness.kinds.every(kind => kind.startsWith("claude."))).toBe(true);
    expect(witness.coverages.every(coverage => coverage === "partial" || coverage === "unknown")).toBe(true);
    return witness;
  },
  A2: async () => {
    const { topology } = await claudeRun();
    const refs = topology.snapshots.flatMap(snapshot => snapshot.evidenceRefs ?? []);
    const projected = JSON.stringify(topology);
    const witness = {
      snapshotProviders: sorted(topology.snapshots.map(snapshot => providerOf(snapshot.source))),
      edgeProviders: sorted(topology.relations.flatMap(relation => [providerOf(relation.from), providerOf(relation.to)])),
      edgeKinds: sorted(topology.relations.map(relation => relation.kind)),
      refPrefixes: sorted(refs.map(prefixOf)),
      claimsInProjection: CLAIMS.filter(claim => projected.includes(claim)),
      commandsInProjection: ["forge build", `${BD} close`].filter(command => projected.includes(command)),
    };
    const named = [...witness.snapshotProviders, ...witness.edgeProviders, ...witness.refPrefixes];
    expect(named.filter(provider => AUTHORITY_PROVIDERS.includes(provider))).toEqual([]);
    expect(witness.refPrefixes).toEqual(["claude-message"]);
    expect(witness.claimsInProjection).toEqual([]);
    expect(witness.commandsInProjection).toEqual([]);
    return witness;
  },
  A3: async () => {
    const { topology } = await claudeRun();
    const projection = new ObservationProjection();
    const forge = forgeGateTopology(FAILED_GATE, forgeContext);
    const item = await openItemSnapshot();
    for (const snapshot of [...forge.snapshots, item.snapshot]) expect(projection.refresh(snapshot)).toBe("applied");
    for (const relation of [...forge.relations, ...item.relations]) projection.relate(relation);
    const authorityRefs = [...forge.snapshots, item.snapshot].map(snapshot => snapshot.source);
    const read = (): string[] =>
      authorityRefs.map(ref => {
        const node = projection.query({ scope, ref, limit: 1 }).nodes[0];
        const key = node?.key ?? "";
        return JSON.stringify({ node, from: projection.relations({ scope, from: key, limit: 100 }), to: projection.relations({ scope, to: key, limit: 100 }) });
      });
    const before = read();
    const applied = topology.snapshots.map(snapshot => projection.refresh(snapshot));
    for (const relation of topology.relations) projection.relate(relation);
    const after = read();
    const status = (ref: NativeRef): string => {
      const node = projection.query({ scope, ref, limit: 1 }).nodes[0];
      return `${node?.presentation.statusText ?? ""} | ${node?.presentation.statusTone ?? ""}`;
    };
    const witness = {
      applied: sorted(applied),
      unchanged: after.map((reading, index) => reading === before[index]),
      authorityNodes: authorityRefs.map(ref => `${ref.provider}:${ref.type}:${ref.id} = ${status(ref)}`),
    };
    expect(witness.applied).toEqual(["applied"]);
    expect(witness.unchanged).toEqual(authorityRefs.map(() => true));
    return witness;
  },
  A4: async () => {
    const { topology } = await claudeRun();
    const session = topology.snapshots.find(snapshot => snapshot.kind === "claude.session");
    expect(session, "the run reported its SDK session").toBeDefined();
    if (session === undefined) return null;
    const ref = (session.evidenceRefs ?? [])[0] ?? "";
    const content = await readClaudeMessageEvidence(ref, {
      grants: () => ["claude:transcript"],
      owningNode: { nativeRef: session.source, evidenceRefs: session.evidenceRefs ?? [], freshness: "current" },
      readTranscript: async () => [{ type: "assistant", uuid: LAST_MESSAGE, text: FINAL_TEXT }],
      cwd: REPO,
      maxMessages: 40,
      maxBytes: 4096,
      maxLines: 20,
      signal: new AbortController().signal,
      capturedAt: () => "2026-10-23T19:02:00.000Z",
    });
    const keys = Object.keys(content).sort();
    const witness = { ref, keys, kind: content.kind, provider: content.provider, refType: content.nativeRef.type, role: content.role, preview: [...content.preview], truncated: content.truncated };
    expect(ref).toBe(`claude-message:${LAST_MESSAGE}`);
    expect(keys.filter(key => /status|verdict|verif|authorit|tone/i.test(key))).toEqual([]);
    return witness;
  },
  B1: async () => {
    const readings: { reading: JsonValue; label: string }[] = [{ reading: hxProviderReading(), label: "provider-path incomplete" }];
    for (const kind of READ_KINDS) for (const licensed of [false, true]) readings.push({ reading: hxReading(kind, licensed), label: `${kind}/${licensed}` });
    const kinds = new Set<string>();
    const providers = new Set<string>();
    const refPrefixes = new Set<string>();
    const edges = new Set<string>();
    let projected = 0;
    for (const { reading } of readings) {
      for (const operationRef of [undefined, NODE_CALL]) {
        const topology = hyperunixTopology(reading, hxContext(operationRef));
        projected += 1;
        for (const snapshot of topology.snapshots) {
          kinds.add(snapshot.kind ?? "");
          providers.add(snapshot.source.provider);
          for (const ref of snapshot.evidenceRefs ?? []) refPrefixes.add(prefixOf(ref));
          const text = JSON.stringify(snapshot);
          for (const row of AUTHORITY_ROWS) expect(text.includes(String(row.path)), `${String(row.path)} reached the snapshot`).toBe(false);
        }
        for (const relation of topology.relations) edges.add(`${relation.kind}: ${relation.from.provider} -> ${relation.to.provider}`);
      }
    }
    const witness = { readings: readings.length, projected, kinds: sorted(kinds), providers: sorted(providers), refPrefixes: sorted(refPrefixes), edges: sorted(edges) };
    const named = [...witness.providers, ...witness.refPrefixes, ...witness.kinds.flatMap(kind => kind.split("."))];
    expect(named.filter(name => AUTHORITY_PROVIDERS.includes(name))).toEqual([]);
    expect(witness.edges).toEqual(["grouping: pi-workflow -> hyperunix"]);
    return witness;
  },
  B2: async () => {
    const witness: JsonObject = {};
    for (const file of TOKEN_FILES) {
      const text = textOf(file);
      witness[file] = Object.fromEntries(Object.entries(AUTHORITY_TOKENS).map(([token, pattern]) => [token, [...text.matchAll(pattern)].length]));
    }
    for (const file of TOKEN_FILES) expect(witness[file], file).toEqual({ rank: 0, tier: 0, authority: 0 });
    return witness;
  },
  C1: async () => {
    const analysis = real();
    const walked = WALK_ROOTS.flatMap(root => tsFilesBelow(root));
    const program = programModules();
    expect(walked, `the src walk (${analysis.modules} modules) reads exactly tsconfig.json's program (${program.length})`).toEqual(program);
    const reach = reachOf(WALK_ROOTS.map(root => listBelow(REPO, root)), program);
    const planted = reachOf([listBelow(REACH_PLANT_BASE, "src", plantEntries)], REACH_PLANT_PROGRAM);
    const witness = {
      modules: {
        srcIsProgram: isDeepStrictEqual(walked, program),
        floorMet: analysis.modules >= MODULES_FLOOR,
        outsideProgram: [...reach.outsideProgram],
        links: [...reach.links],
      },
      observation: [...analysis.observation],
      authority: [...analysis.authority],
      holders: [...analysis.holders],
      violations: [...analysis.violations],
      reachPlants: { outsideProgram: [...planted.outsideProgram], links: [...planted.links] },
    };
    expect(witness.holders).toEqual([...HOLDERS]);
    expect(witness.observation.filter(path => witness.authority.includes(path))).toEqual([]);
    expect(witness.violations).toEqual([]);
    expect(reach, "every source file below src is a program module, and src holds no link").toStrictEqual({ outsideProgram: [], links: [] });
    expect(witness.reachPlants, "the walk names the planted sources outside the program and the planted link").toStrictEqual({
      outsideProgram: ["src/lib/tool.mjs", "src/workbench/claude-fwg-probe.tsx"],
      links: ["src/workbench/fwg-link.ts"],
    });
    return witness;
  },
  C2: async () => {
    const analysis = real();
    const witness = analysis.mixedScopes.map(reading => ({ file: reading.file, scope: reading.scope, observation: [...reading.observation], authority: [...reading.authority] }));
    expect(witness).toEqual(COMPOSITION_SCOPES.map(reading => ({ ...reading, observation: [...reading.observation], authority: [...reading.authority] })));
    for (const reading of witness) expect(reading.authority.filter(name => name.startsWith("provider:") || name.startsWith("exec:")), `${reading.file} ${reading.scope}`).toEqual([]);
    return witness;
  },
  C3: async () => {
    const analysis = real();
    const seam = parseModule({ path: "src/workbench/beads-observer.ts", text: textOf("src/workbench/beads-observer.ts") });
    const client = seam.sf.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === "BeadsReadClient");
    const witness = {
      trackerExecs: [...analysis.trackerExecs],
      trackerWriteSpellings: [...analysis.trackerWriteSpellings],
      gitExecModules: sorted(srcModules().map(parseModule).filter(module => module.constructs.some(construct => construct.kind === "exec:git")).map(module => module.path)),
      trackerSeamMembers: client === undefined ? [] : client.members.map(member => nameOf(member.name)),
    };
    expect(witness.trackerExecs).toEqual([]);
    expect(witness.trackerWriteSpellings).toEqual([]);
    expect(witness.trackerSeamMembers).toEqual(["show"]);
    return witness;
  },
  D1: async () => sentenceOnce("Agent provider", AGENT_SENTENCE),
  D2: async () => sentenceOnce("HyperUnix provider", HX_SENTENCE),
  D3: async () => {
    const census = ts.createSourceFile(DOCS07_CENSUS, textOf(DOCS07_CENSUS), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const literals: string[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteralLike(node)) literals.push(node.text);
      ts.forEachChild(node, visit);
    };
    visit(census);
    const witness = {
      agentSentence: literals.filter(text => text === AGENT_SENTENCE).length,
      hxSentence: literals.filter(text => text === HX_SENTENCE).length,
      bindsThisFile: literals.filter(text => text === PIN_NAME).length > 0,
    };
    expect(witness).toStrictEqual({ agentSentence: 1, hxSentence: 1, bindsThisFile: true });
    return witness;
  },
  F1: async () => {
    const row = readFileSync(BEAD_EXPORT, "utf8")
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => JSON.parse(line) as JsonObject)
      .find(entry => entry.id === BEAD);
    const notes = row !== undefined && typeof row.notes === "string" ? row.notes : "";
    expect(notes, `${BEAD} has no notes in the bead export`).not.toBe("");
    const acceptance = /Acceptance: ([\s\S]*?)\s*Not P0\/P1:/.exec(notes)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label).map(entry => entry.id);
    const constantsQuoted = FILING_CONSTANTS.filter(constant => notes.includes(constant));
    expect(clauses).toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(labelsEqual).toEqual(judged.map(entry => entry.id));
    expect(constantsQuoted).toEqual([...FILING_CONSTANTS]);
    return { clauses, labelsEqual, constantsQuoted: constantsQuoted.length };
  },
  M1: async () => hit(withModule("src/workbench/claude-verdict.ts", 'export const verdict = { provider: "forge", type: "gate-status", id: "workspace" };', "add"), "observation-builds-authority src/workbench/claude-verdict.ts provider:forge"),
  M2: async () =>
    hit(
      withModule("src/workbench/beads-observer.ts", 'import type { ClaudeTranscriptRow } from "./claude-transcript.js";\nexport type Claimed = ClaudeTranscriptRow;', "extend"),
      "authority-imports-observation src/workbench/beads-observer.ts -> src/workbench/claude-transcript.ts",
    ),
  M3: async () =>
    hit(withModule("src/workbench/forge-observer.ts", 'export const later = () => import("./hyperunix-observer.js");', "extend"), "authority-imports-observation src/workbench/forge-observer.ts -> src/workbench/hyperunix-observer.ts"),
  M4: async () =>
    hit(
      withModule("src/index.ts", 'export function settledWork(identity: ClaudeCallIdentity) { return { provider: "beads", type: "work", id: identity.agentId }; }', "extend"),
      "mixed-scope src/index.ts function:settledWork [ClaudeCallIdentity] [provider:beads]",
    ),
  M5: async () => {
    const violation = "tracker-exec src/workbench/attention.ts";
    const landed = added(withModule("src/workbench/attention.ts", `import { execFileSync } from "node:child_process";\nexport const settle = (id: string) => execFileSync("${BD}", ["close", id]);`, "extend"));
    // The lines whose subject is the planted module (a consequence on a module that imports it is not this pin's).
    const filed = sorted(added(withModule(FILED_MODULE, FILED_PLANT, "extend")).filter(line => line.split(" ")[1] === FILED_MODULE));
    const lines = added(withModules(EXEC_SPELLINGS.map(entry => ({ path: spellingPath(entry.id), text: entry.text }))));
    const read = EXEC_SPELLINGS.filter(entry => lines.includes(`tracker-exec ${spellingPath(entry.id)}`)).map(entry => entry.id);
    const unread = EXEC_SPELLINGS.filter(entry => !lines.some(line => line.includes(spellingPath(entry.id)))).map(entry => entry.id);
    expect(landed).toContain(violation);
    expect(filed, "the filed plant (the gate's L2-3 members in claude-control.ts) reads as the tracker exec it is").toEqual([`observation-builds-authority ${FILED_MODULE} exec:${BD}`, `tracker-exec ${FILED_MODULE}`]);
    expect(read, "every read spelling reads as a tracker exec").toEqual(EXEC_SPELLINGS.filter(entry => entry.read).map(entry => entry.id));
    expect(unread, "every unread spelling stays quiet").toEqual(EXEC_SPELLINGS.filter(entry => !entry.read).map(entry => entry.id));
    expect(lines, "the spellings add nothing beside their tracker execs").toEqual(read.map(id => `tracker-exec ${spellingPath(id)}`));
    return { violation, hit: landed.includes(violation), filed, read, unread };
  },
  M6: async () => hit(withModule("src/workbench/timeline.ts", `export const HINT = "run ${BD} update wb-1 --status closed";`, "extend"), "tracker-write-spelling src/workbench/timeline.ts"),
  M7: async () =>
    hit(withModule("src/workbench/forge-evidence.ts", 'export type { ClaudeEvidenceContent } from "./claude-evidence.js";', "extend"), "authority-imports-observation src/workbench/forge-evidence.ts -> src/workbench/claude-evidence.ts"),
  M8: async () =>
    hit(
      withModule("src/workbench/agent-gate.ts", 'import { createClaudeWorkflowHost } from "./claude-host.js";\nimport { forgeGateTopology } from "./forge-observer.js";\nexport const parts = [createClaudeWorkflowHost, forgeGateTopology];', "add"),
      "unpinned-holder src/workbench/agent-gate.ts",
    ),
  M9: async () =>
    hit(withModule("src/workbench/claude-topology.ts", 'import type { ForgeGateTopology } from "./forge-observer.js";\nexport type Gate = ForgeGateTopology;', "extend"), "observation-imports-authority src/workbench/claude-topology.ts -> src/workbench/forge-observer.ts"),
  R1: async () => {
    const forgeOperation: NativeRef = { provider: "forge", type: "gate-run", id: "op-observation" };
    const topology = hyperunixTopology(hxReading("incomplete", false), hxContext(forgeOperation));
    const callers = srcModules()
      .map(parseModule)
      .filter(module => module.path !== "src/workbench/hyperunix-observer.ts" && module.path !== "src/workbench/claude-topology.ts")
      .filter(module => {
        let reads = false;
        const visit = (node: ts.Node): void => {
          if (ts.isIdentifier(node) && (node.text === "hyperunixTopology" || node.text === "projectClaudeTopology")) reads = true;
          ts.forEachChild(node, visit);
        };
        visit(module.sf);
        return reads;
      })
      .map(module => module.path);
    const witness = {
      echoed: topology.relations.map(relation => ({ kind: relation.kind, from: relation.from.provider, nativeConfirmation: relation.provenance.nativeConfirmationRef !== undefined })),
      srcCallers: callers,
    };
    expect(witness.echoed).toEqual([{ kind: "grouping", from: "forge", nativeConfirmation: false }]);
    expect(witness.srcCallers).toEqual([]);
    return witness;
  },
  R2: async () =>
    quiet(
      withModule(
        "src/index.ts",
        'function claudeIdOf(identity: ClaudeCallIdentity): string { return identity.agentId; }\nexport function workRef(id: string) { return { provider: "beads", type: "work", id }; }\nexport const derived = () => workRef(claudeIdOf({ agentId: "a", index: 0, label: "l" }));',
        "extend",
      ),
    ),
  R3: async () =>
    quiet(
      withModule(
        "src/workbench/claude-topology.ts",
        `import { execFileSync } from "node:child_process";\nconst TRACKER = ["b", "d"].join("");\nconst AUTHORITY = "forge";\nexport const ref = { provider: AUTHORITY, type: "gate-status", id: "w" };\nexport const settle = (id: string) => execFileSync(TRACKER, ["close", id]);`,
        "extend",
      ),
    ),
  R4: async () => {
    const found: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory() && (entry.name === "node_modules" || entry.name === ".git")) continue;
        const path = join(dir, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (entry.name === "collect.sh") found.push(relative(REPO, path).split(sep).join("/"));
      }
    };
    walk(REPO);
    const witness = { collectSh: found.sort() };
    expect(witness.collectSh).toEqual([]);
    return witness;
  },
  R5: async () => {
    const analysis = real();
    const host = parseModule({ path: "src/workbench/hosts/furnace-hosted.ts", text: textOf("src/workbench/hosts/furnace-hosted.ts") });
    const witness = {
      authority: analysis.authority.includes(host.path),
      observationEdges: [...host.edges].filter(edge => OBSERVATION_SDKS.includes(edge) || analysis.observation.includes(edge)),
    };
    expect(witness).toStrictEqual({ authority: true, observationEdges: [] });
    return witness;
  },
  R6: async () => quiet(withModule("src/workbench/answer-readout.ts", 'const CONTRACT = "hyperunix.find/v1";\nexport const ref = { provider: "forge", type: "gate-status", id: CONTRACT };', "add")),
  R7: async () => {
    const own = parseModule({ path: "test/workbench-observation-class-census.test.ts", text: readFileSync(fileURLToPath(import.meta.url), "utf8") });
    const witness = { walked: [...WALK_ROOTS], testBuildsAuthority: own.constructs.length > 0 };
    expect(witness).toStrictEqual({ walked: ["src"], testBuildsAuthority: true });
    return witness;
  },
};

function sentenceOnce(heading: string, sentence: string): Json {
  const section = docsSection(textOf(DOCS_07), heading, 2, [DOCS_07_PARENT]);
  expect(section.ok, section.why).toBe(true);
  const text = section.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
  const witness = { heading, blocks: section.blocks.length, hasHtml: section.hasHtml, occurrences: text.split(sentence).length - 1 };
  expect(witness).toStrictEqual({ heading, blocks: 1, hasHtml: false, occurrences: 1 });
  return witness;
}
function hit(analysis: Analysis, violation: string): Json {
  const lines = added(analysis);
  expect(lines).toContain(violation);
  return { violation, hit: true };
}
function quiet(analysis: Analysis): Json {
  const lines = added(analysis);
  expect(lines).toEqual([]);
  return { violations: lines };
}

describe("wb-kku9.1 observation-class census (MW-CAC-WORKFLOW-COMPOSITION-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:3", "D:3", "F:1", "M:9", "R:7"]);
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin, title: PIN_TITLES[pin] ?? "" })) }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, title: pin.title })) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(PIN_TITLES).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    for (const row of ROWS) for (const pin of row.pins) expect(PIN_TITLES[pin]?.startsWith(`${pin}`), pin).toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(PIN_TITLES[pin] ?? pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
