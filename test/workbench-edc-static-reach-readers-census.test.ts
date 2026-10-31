/**
 * wb-pyel.9 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R3, program-triage-2026-10-18; the rule-19 structural exit of wb-pyel.5 under
 * orchestrator rulings R-B123 and R-B161): the census of the render-abort census's static-reach readers at full surface,
 * test/helpers/edc-static-reach-readers.ts, which wb-pyel.5's census composes when it re-cuts. Statement (bead title,
 * verbatim): "The child_process tracer reads logical-assignment (||=, ??=) expression values and the scope resolver merges
 * namespace declarations, or the static-reach claims state those holes, narrowed out of wb-pyel.5's fail-closed core (rule-19
 * structural exit)". Acceptance (the description's Acceptance line, verbatim): "each survivor reds the unmodified census and
 * greens under the cure; the static-reach claim text and the tracer/resolver coverage agree byte-for-byte with the falsifier
 * roster."
 *
 * THE CLAIMS are the CLAIMS constant, reader by reader and clause by clause, each clause naming the pins that falsify its words,
 * held byte for byte to the roster's claims; every pin is named by a clause and every falsifier a clause names is a pin. The
 * readers read one parsed module each and nothing else. In short: the specifier reader names every import and export-from
 * specifier, every external import-equals and every loader call's first argument (<expression> unresolved); the loader reader
 * reads import(), LOADER_CALLS callees, a LOADER_FACTORIES result called directly and a name a plain declaration or a
 * BINDING_ASSIGNMENTS assignment binds to one, each unresolved call labelled once; the identifier readers read every IO_GLOBALS
 * and GLOBAL_OBJECTS reference and every process reference but a PROCESS_READS member; the child_process tracer follows every
 * value derived from a child_process entry through WRAPPERS and await, member reads, declarations and binding assignments, a
 * held name's logical assignment, EITHER_OPERAND results and a conditional's arms, reads a held LAUNCH_CALLS member's call as
 * its command and every other use as <reference> (<re-export>, <untraced>); the launch-call reader reads every LAUNCH_CALLS
 * call whose command resolves (<expression> in a merged scope or by trusting what resolution refuses); resolution follows
 * literals, a conditional's arms, the const a name binds in its scope and an index into a const array only read, within
 * RESOLVE_DEPTH steps, reading every module as strict code (a function binds only in its block) and resolving no name in a
 * namespace body or an enum declaration. The WRAPPERS (parentheses, as, satisfies, <T>, !, an instantiation expression) hold at
 * every use site.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns the readers' measured witness, held to
 * the roster):
 *  D  the description's members: LA4 (||=) and LA5 (??=), a held name's kept logical-assignment target launching through the
 *     assignment's value, and the control LA4c2 (|| for ||=); NS2, the git() helper's command read in a merged namespace
 *     body, and its control NS2c (the same body's literal command). Each one module through every reader.
 *  U  wb-pyel.5 refusal #5's members (folded here by R-B161): its U1 witnesses W-AS, W-SAT, W-TA, W-NN, W-BAND, W-OR, W-ANDOP,
 *     W-ELEM, W-FORIN, W-CWRAP and W-UTYPE (the gate's witness modules, spelled as the refusal spells them), the loader-reader
 *     halves of H5, H8 and H10 (W-BAND-LOADER, W-ELEM-LOADER, W-CWRAP-LOADER), and its U2 plant BF1 (a strict module's block
 *     function shadowing a module const it does not reach) with its control BF1c.
 *  S  every use site of a reader vocabulary in the helper (WRAPPERS through unwrap and isWrapper, LAUNCH_CALLS, LOADER_CALLS,
 *     LOADER_FACTORIES, BINDING_ASSIGNMENTS, LOGICAL_ASSIGNMENTS, EITHER_OPERAND, CHILD_PROCESS, IO_GLOBALS, GLOBAL_OBJECTS,
 *     PROCESS_READS), one module per site spelling every entry there, so dropping one entry at one site reds that site's pin.
 *  F  the form roster: cut #5's 139 REACH_FORMS in its families (entries, follow, escapes, exports, strings, loads, heritage,
 *     instantiation, scope, logical, merged, ambient, arrays), the forms this cut adds (bindings, bounds, entry edges, array
 *     reads, var scopes), cut #5's planted module and the script kinds.
 *  P  the position roster: cut #5's 106 REFERENCE_POSITIONS and this cut's 26, one pin per kind (value, discarded, written,
 *     export, name, type), each position probed with HELD as WebSocket, globalThis, process and a held child_process namespace
 *     (heldReading) and held to its kind.
 *  Q  the residual's pinned quiet row (RESIDUALS).
 *
 * CURES (each a pin named by the claims, each named hollowing executed by the KILLS case):
 *  - refusal #5 U1 (claim words without a falsifier): every claim word is a pin that reds when its reader branch is hollowed -
 *    the eleven U1 witnesses each, and the S row for every vocabulary entry at every use site. KILLS executes the eleven named
 *    hollowings H1-AS..H11-UTYPE on the helper's own bytes and holds each to the exact set of pins it reds.
 *  - refusal #5 U2 (class-level guard (a) through BF1): declarations() declares a function only in the block that holds it
 *    (strict code; tsconfig strict), so BF1's module-level command resolves to rf and the launch-call reader reads it; cut #5's
 *    block-function-shadow-command now reads the module const (git) its call reaches. KILLS executes BF1-HOIST, the sloppy
 *    hoisting cut #5 read, and it reds BF1.
 *  - the description's LA: the tracer reads a held name's kept ||=, &&= or ??= target through the assignment's value (LA4, LA5;
 *    LA-WRITE, cut #4's reading of the target as written, reds them). NS: the claims state the hole - the resolver models no
 *    namespace or enum merge, so no name resolves in a namespace body or an enum declaration and every launch-named call there
 *    reads <expression> (NS2; NS-BLOCK, cut #4's per-block reading, reds it).
 *  - the same class, named at cut time: an array element called through an instantiation expression read the array as only
 *    read (elementRead now climbs every WRAPPERS kind), and a type-wrapped write target read its old value as a <reference>
 *    (isWriteTarget now climbs WRAPPERS).
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set (every row's id, label and pins,
 * every pin's witness, the claims, the kills, the constants and every registered test title) is held to the out-of-file roster
 * (test/fixtures/edc-static-reach-readers-roster.json). OUTSIDE ANCHORS: the tracker export (.beads/issues.jsonl), each line
 * read at its first occurrence (notes are append-only) - row D holds exactly the members the description's LA and NS items
 * name, and wb-pyel.5's R-B123 line names LA4, LA5 and NS2; wb-pyel.5's cut #5 FORM line counts the carried forms (139) and
 * positions (106); wb-pyel.5's notes name the residual family R-STATIC-FORMS; and once the export carries wb-pyel.5's refusal #5
 * unmet items (each a paragraph), KILLS holds exactly the hollowings its U1 item names, U holds every witness it spells and the
 * plant and control its U2 item names (the tracker holds those items at cut time; the export carries them from its next hop).
 * The helper itself:
 * row S holds exactly the vocabulary use sites its source holds, each site module spelling every entry; every predicate
 * isNameSlot and isWriteTarget test has a pinned position; each scriptKind pattern has a script form in either letter case; and
 * each KILLS edit's text occurs once in it. tsconfig.json's strict flag and ES module are the strict-code premise of the
 * block-function scope. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran
 * before it) and the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together): a pin removed with its claims, constants and roster entry where no
 * outside anchor names it; a form's probe edited in both; a reading of a module the readers are never given (the readers read
 * one module; the module closure is the composing census's).
 * RESIDUALS (named, each with its pinned quiet row): R-STATIC-FORMS the forms the readers do not parse (Q-STATIC-FORMS: one probe
 * per form, its reading by every reader pinned) - a launch-named call on a value the tracer does not hold whose command does
 * not resolve, outside a namespace body and an enum declaration (a parameter's or a let's command, a conditional with an arm
 * that does not resolve, a spread or unbound array, a string index, a computed callee key, a command past RESOLVE_DEPTH); a
 * launch through a value the module does not bind from child_process (a parameter, a function a call returns); a package's own
 * launcher; a global reached without its name; a write through the allowed process.env read; a launch whose arguments carry rf
 * through a shell; another builtin's process or thread API; a loader reached through a call the loader reader does not parse or
 * a binding it does not read (an alias of require, a renamed createRequire, a createRequire result held in a property, a
 * parameter's default or an operand); code evaluated at run time; and a process-internal binding.
 *
 * Display paths added: none. Test-only: the KILLS case writes each hollowed copy of the helper into makeScratch scratch with
 * the leak guard installed; src, the helper, the fixture, tsconfig.json and the bead export are only read.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import {
  BINDING_ASSIGNMENTS,
  CHILD_PROCESS,
  EITHER_OPERAND,
  GLOBAL_OBJECTS,
  HELD_AS,
  HELD_IMPORT,
  heldReading,
  IO_GLOBALS,
  LAUNCH_CALLS,
  LOADER_CALLS,
  LOADER_FACTORIES,
  LOGICAL_ASSIGNMENTS,
  moduleReading,
  PATH_DEPTH,
  PROCESS_READS,
  parseSource,
  RESOLVE_DEPTH,
  TRACE_ROUNDS,
  WRAPPERS,
} from "./helpers/edc-static-reach-readers.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type PositionKind = "value" | "discarded" | "written" | "export" | "name" | "type";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-pyel.9";
const PARENT = "wb-pyel.5";
const ROSTER_PATH = join(REPO, "test", "fixtures", "edc-static-reach-readers-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const HELPER_PATH = join(REPO, "test", "helpers", "edc-static-reach-readers.ts");
const TSCONFIG_PATH = join(REPO, "tsconfig.json");

/** wb-pyel.5 cut #5's REACH_FORMS probes, byte for byte and in its order (each form's reading is re-measured here, never carried). */
const CARRIED_FORMS: Readonly<Record<string, string>> = {
  "named-import": "import { spawn } from \"node:child_process\";\nspawn(\"rf\", []);\n",
  "renamed-import": "import { spawn as go } from \"node:child_process\";\ngo(\"rf\", []);\n",
  "string-named-import": "import { \"spawn\" as go } from \"node:child_process\";\ngo(\"rf\", []);\n",
  "default-named-import": "import { default as cp } from \"node:child_process\";\ncp.spawn(command, []);\n",
  "namespace-import": "import * as cp from \"node:child_process\";\ncp.spawn(command, []);\n",
  "default-import": "import cp from \"child_process\";\ncp.spawn(command, []);\n",
  "import-equals": "import cp = require(\"child_process\");\ncp.spawn(command, []);\n",
  "require-whole": "const cp = require(\"node:child_process\");\ncp.spawn(command, []);\n",
  "require-destructured": "const { spawn: go } = require(\"node:child_process\");\ngo(\"rf\", []);\n",
  "require-member-call": "require(\"node:child_process\").spawn(command, []);\n",
  "import-whole": "const cp = await import(\"node:child_process\");\ncp.spawn(command, []);\n",
  "import-destructured": "const { spawn: go } = await import(\"node:child_process\");\ngo(\"rf\", []);\n",
  "import-nested-destructured": "const { default: { spawn: go } } = await import(\"node:child_process\");\ngo(\"rf\", []);\n",
  "import-member-bound": "const go = (await import(\"node:child_process\")).spawn;\ngo(\"rf\", []);\n",
  "import-member-call": "(await import(\"node:child_process\")).spawn(command, []);\n",
  "import-default-member": "const m = await import(\"node:child_process\");\nm.default.spawn(command, []);\n",
  "assigned-whole": "let cp;\ncp = await import(\"node:child_process\");\ncp.spawn(command, []);\n",
  "assigned-logical": "let cp;\ncp ??= require(\"node:child_process\");\ncp.exec(command);\n",
  "assigned-destructured": "let go;\n({ spawn: go } = await import(\"node:child_process\"));\ngo(\"rf\", []);\n",
  "builtin-module": "const cp = process.getBuiltinModule(\"node:child_process\");\ncp.spawn(command, []);\n",
  "create-require-call": "import { createRequire } from \"node:module\";\nconst go = createRequire(import.meta.url)(\"node:child_process\").spawn;\ngo(\"rf\", []);\n",
  "create-require-bound": "import { createRequire } from \"node:module\";\nconst load = createRequire(import.meta.url);\nconst { spawn: go } = load(\"child_process\");\ngo(\"rf\", []);\n",
  "create-require-assigned": "import { createRequire } from \"node:module\";\nlet load;\nload = createRequire(import.meta.url);\nload(\"child_process\").spawn(command, []);\n",
  "const-specifier": "const CP = \"node:child_process\";\nconst { spawn: go } = await import(CP);\ngo(\"rf\", []);\n",
  alias: "import { spawn } from \"node:child_process\";\nconst go = spawn;\ngo(\"rf\", []);\n",
  "alias-destructured": "const cp = require(\"node:child_process\");\nconst { spawn: go } = cp;\ngo(\"rf\", []);\n",
  "hoisted-alias": "import * as cp from \"node:child_process\";\nexport function later(): void {\n  go(\"rf\", []);\n}\nconst go = cp.spawn;\n",
  "self-deepening": "let cp = require(\"node:child_process\");\ncp = cp.promises;\n",
  "rest-destructured": "const { ...cp } = await import(\"node:child_process\");\ncp.spawn(command, []);\n",
  "element-access": "import * as cp from \"node:child_process\";\ncp[\"spawn\"](command, []);\n",
  "optional-call": "import * as cp from \"node:child_process\";\ncp?.spawn?.(command, []);\n",
  coalesced: "import * as cp from \"node:child_process\";\nconst go = cp.spawn ?? fallback;\ngo(\"rf\", []);\n",
  "conditional-binding": "import * as cp from \"node:child_process\";\nconst go = flag ? cp.spawn : cp.spawnSync;\ngo(\"rf\", []);\n",
  "const-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"rf\";\ngo(TOOL, []);\n",
  "indexed-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"rf\"];\ngo(TOOLS[0], []);\n",
  "conditional-command": "import { spawn as go } from \"node:child_process\";\ngo(flag ? \"rf\" : \"forge\", []);\n",
  "process-execve": "process.execve(\"rf\", [\"rf\"]);\n",
  "argument-escape": "import { spawn } from \"node:child_process\";\nhand(spawn);\n",
  returned: "export function launcher(): unknown {\n  return require(\"node:child_process\");\n}\n",
  "stored-property": "holder.cp = require(\"node:child_process\");\n",
  "class-field": "export class Holder {\n  cp = require(\"node:child_process\");\n}\n",
  "then-callback": "import(\"node:child_process\").then(cp => cp.spawn(command, []));\n",
  "call-apply": "import { spawn } from \"node:child_process\";\nspawn.call(undefined, \"rf\", []);\n",
  "computed-member": "import * as cp from \"node:child_process\";\ncp[pick()](command, []);\n",
  "re-export": "export { spawn } from \"node:child_process\";\n",
  "re-export-all": "export * from \"node:child_process\";\n",
  "exported-binding": "export const cp = await import(\"node:child_process\");\n",
  "exported-import-equals": "export import cp = require(\"child_process\");\n",
  "local-export": "import { spawn } from \"node:child_process\";\nexport { spawn as launch };\n",
  "default-export": "import * as cp from \"node:child_process\";\nexport default cp;\n",
  "untraced-string": "export const code = 'require(\"child_process\").spawn(\"rf\")';\n",
  "unparsed-loader-literal": "loader._load(\"child_process\");\n",
  "composed-specifier": `const cp = await import(\`node:\${"child_process"}\`);\n`,
  "computed-import": "const cp = await import(pick());\ncp.spawn(command, []);\n",
  "computed-require": "const cp = require(name);\n",
  "computed-builtin": "const cp = process.getBuiltinModule(name);\n",
  "computed-create-require": "import { createRequire } from \"node:module\";\nconst cp = createRequire(import.meta.url)(name);\n",
  "create-require-logical": "import { createRequire } from \"node:module\";\nlet load;\nload ??= createRequire(import.meta.url);\nload(name);\n",
  "create-require-logical-traced": "import { createRequire } from \"node:module\";\nlet load;\nload ||= createRequire(import.meta.url);\nload(\"node:child_process\").spawn(command, []);\n",
  "heritage-named-import": "import { ChildProcess } from \"node:child_process\";\nexport class Launcher extends ChildProcess {}\n",
  "heritage-namespace-import": "import * as cp from \"node:child_process\";\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-default-import": "import cp from \"node:child_process\";\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-import-equals": "import cp = require(\"node:child_process\");\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-require-bound": "const cp = require(\"node:child_process\");\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-import-bound": "const cp = await import(\"node:child_process\");\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-builtin-bound": "const cp = process.getBuiltinModule(\"node:child_process\");\nexport class Launcher extends cp.ChildProcess {}\n",
  "heritage-loader-direct": "export class Launcher extends require(\"node:child_process\").ChildProcess {}\n",
  "heritage-class-expression": "import { ChildProcess } from \"node:child_process\";\nexport const Launcher = class extends ChildProcess {};\n",
  "heritage-mixin-argument": "import { ChildProcess } from \"node:child_process\";\nexport class Launcher extends mix(ChildProcess) {}\n",
  "heritage-alias": "import * as cp from \"node:child_process\";\nconst Base = cp.ChildProcess;\nexport class Launcher extends Base {}\n",
  "heritage-untraced-string": "export class Launcher extends load(\"child_process\") {}\n",
  "instantiation-alias": "import { spawn } from \"node:child_process\";\nconst go = spawn<never>;\ngo(\"rf\", []);\n",
  "instantiation-call": "import * as cp from \"node:child_process\";\n(cp.spawn<never>)(\"rf\", []);\n",
  "scoped-const-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"rf\";\nexport function launch(): void {\n  go(TOOL, []);\n}\n",
  "block-const-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\n{\n  const TOOL = \"rf\";\n  go(TOOL, []);\n}\n",
  "let-command": "import { spawn as go } from \"node:child_process\";\nlet TOOL = \"rf\";\ngo(TOOL, []);\n",
  "let-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  let TOOL = \"rf\";\n  go(TOOL, []);\n}\n",
  "parameter-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(TOOL: string): void {\n  go(TOOL, []);\n}\n",
  "catch-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\ntry {\n  hand();\n} catch (TOOL) {\n  go(TOOL, []);\n}\n",
  "var-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  go(TOOL, []);\n  if (flag) {\n    var TOOL = \"rf\";\n  }\n}\n",
  "import-shadow-command": "import { spawn as go } from \"node:child_process\";\nimport { TOOL } from \"./tools.js\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n",
  "inner-const-command": "import { spawn as go } from \"node:child_process\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n",
  "await-using-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport async function launch(): Promise<void> {\n  await using TOOL = \"rf\";\n  go(TOOL, []);\n}\n",
  "function-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  function TOOL(): string {\n    return \"rf\";\n  }\n  go(TOOL, []);\n}\n",
  "block-function-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  go(TOOL, []);\n  {\n    function TOOL(): string {\n      return \"rf\";\n    }\n  }\n}\n",
  "function-name-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport const launch = function TOOL(): void {\n  go(TOOL, []);\n};\n",
  "class-name-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport const Launcher = class TOOL {\n  static run(): void {\n    go(TOOL, []);\n  }\n};\n",
  "class-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  class TOOL {}\n  go(TOOL, []);\n}\n",
  "enum-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  enum TOOL {\n    Rf,\n  }\n  go(TOOL, []);\n}\n",
  "namespace-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Outer {\n  namespace TOOL {\n    export const value = 1;\n  }\n  go(TOOL, []);\n}\n",
  "import-equals-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Outer {\n  import TOOL = Other.Tool;\n  go(TOOL, []);\n}\n",
  "default-import-shadow-command": "import { spawn as go } from \"node:child_process\";\nimport TOOL from \"./tools.js\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n",
  "namespace-import-shadow-command": "import { spawn as go } from \"node:child_process\";\nimport * as TOOL from \"./tools.js\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n",
  "object-destructured-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(source: { TOOL: string }): void {\n  const { TOOL } = source;\n  go(TOOL, []);\n}\n",
  "array-destructured-shadow-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(list: string[]): void {\n  const [TOOL] = list;\n  go(TOOL, []);\n}\n",
  "for-const-scope-command": "import { spawn as go } from \"node:child_process\";\nfor (const TOOL = \"git\"; flag; ) hand(TOOL);\ngo(TOOL, []);\n",
  "case-const-scope-command": "import { spawn as go } from \"node:child_process\";\nswitch (flag) {\n  case 1:\n    const TOOL = \"git\";\n    hand(TOOL);\n}\ngo(TOOL, []);\n",
  "namespace-const-scope-command": "import { spawn as go } from \"node:child_process\";\nnamespace Holder {\n  const TOOL = \"git\";\n  hand(TOOL);\n}\ngo(TOOL, []);\n",
  "instantiation-named-launch": "(pi.exec<never>)(\"rf\", []);\n",
  "block-const-scope-command": "import { spawn as go } from \"node:child_process\";\n{\n  const TOOL = \"git\";\n  hand(TOOL);\n}\ngo(TOOL, []);\n",
  "type-import-const-command": "import { spawn as go } from \"node:child_process\";\nimport type { TOOL } from \"./tools.js\";\nconst TOOL = \"rf\";\ngo(TOOL, []);\n",
  "for-const-command": "import { spawn as go } from \"node:child_process\";\nfor (const TOOL = \"rf\"; flag; ) go(TOOL, []);\n",
  "destructured-const-command": "import { spawn as go } from \"node:child_process\";\nconst { TOOL } = { TOOL: \"rf\" };\ngo(TOOL, []);\n",
  "inner-const-specifier": "export function decoy(): string {\n  const CP = \"node:fs\";\n  return CP;\n}\nconst m = await import(CP);\nm.spawn(command, []);\n",
  "let-shadow-specifier": "export function decoy(): string {\n  const CP = \"node:fs\";\n  return CP;\n}\nlet CP = [\"node:child\", \"process\"].join(\"_\");\nconst m = await import(CP);\nm.spawn(command, []);\n",
  "logical-or-kept": "import * as cp from \"node:child_process\";\nconst fallback = {} as typeof cp;\nlet held = cp;\nexport const pick = (): typeof cp => (held ||= fallback);\n",
  "logical-nullish-kept": "import * as cp from \"node:child_process\";\nconst fallback = {} as typeof cp;\nlet held: typeof cp | undefined = cp;\nexport const pick = (): typeof cp => (held ??= fallback);\n",
  "logical-and-kept": "import * as cp from \"node:child_process\";\nconst fallback = {} as typeof cp;\nlet held = cp;\nexport const pick = (): typeof cp => (held &&= fallback);\n",
  "logical-kept-member": "import * as cp from \"node:child_process\";\nlet held = cp;\nconst go = (held ??= fallback).spawn;\ngo(\"rf\", []);\n",
  "logical-kept-call": "import * as cp from \"node:child_process\";\nlet held = cp;\n(held ||= fallback).spawn(command, []);\n",
  "logical-member-store": "import * as cp from \"node:child_process\";\ncp.spawn ||= fallback;\n",
  "namespace-merged-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Tools {\n  export const TOOL = \"rf\";\n}\nnamespace Tools {\n  go(TOOL, []);\n}\n",
  "namespace-merged-api-launch": "const TOOL = \"git\";\nnamespace Tools {\n  export const TOOL = \"rf\";\n}\nnamespace Tools {\n  export function run(api: Api): void {\n    api.exec(TOOL, []);\n  }\n}\n",
  "dotted-namespace-merged-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Outer.Tools {\n  export const TOOL = \"rf\";\n}\nnamespace Outer {\n  export namespace Tools {\n    go(TOOL, []);\n  }\n}\n",
  "namespace-local-command": "import { spawn as go } from \"node:child_process\";\nnamespace Tools {\n  const TOOL = \"rf\";\n  go(TOOL, []);\n}\n",
  "namespace-literal-command": "namespace Tools {\n  export function run(api: Api): void {\n    api.exec(\"rf\", []);\n  }\n}\n",
  "namespace-merged-specifier": "const SPECIFIER = \"node:fs\";\nnamespace Loader {\n  export const SPECIFIER = [\"node:child\", \"process\"].join(\"_\");\n}\nnamespace Loader {\n  export const m = require(SPECIFIER);\n}\n",
  "namespace-merged-key": "import * as cp from \"node:child_process\";\nconst KEY = \"fork\";\nnamespace Tools {\n  export const KEY = \"spawn\";\n}\nnamespace Tools {\n  cp[KEY](\"rf\", []);\n}\n",
  "enum-merged-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nenum Tools {\n  TOOL = \"rf\",\n}\nenum Tools {\n  Pid = go(TOOL, []).pid ?? 0,\n}\n",
  "enum-merged-api-launch": "const TOOL = \"git\";\nenum Tools {\n  TOOL = \"rf\",\n}\nenum Tools {\n  Size = api.exec(TOOL, []).length,\n}\n",
  "type-namespace-const-command": "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"rf\";\nnamespace TOOL {\n  export type Shape = string;\n}\ngo(TOOL, []);\n",
  "ambient-const-command": "import { spawn as go } from \"node:child_process\";\ndeclare const TOOL = \"git\";\ngo(TOOL, []);\n",
  "ambient-const-api-launch": "declare const TOOL = \"git\";\nexport function run(api: Api): void {\n  api.exec(TOOL, []);\n}\n",
  "written-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\nTOOLS[0] = \"rf\";\ngo(TOOLS[0], []);\n",
  "compound-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"r\"];\nTOOLS[0] += \"f\";\ngo(TOOLS[0], []);\n",
  "logical-written-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"\"];\nTOOLS[0] ||= \"rf\";\ngo(TOOLS[0], []);\n",
  "destructured-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\n[TOOLS[0]] = [\"rf\"];\ngo(TOOLS[0], []);\n",
  "for-of-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\nfor (TOOLS[0] of [\"rf\"]) hand();\ngo(TOOLS[0], []);\n",
  "deleted-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\ndelete TOOLS[0];\ngo(TOOLS[0], []);\n",
  "method-written-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\nTOOLS.splice(0, 1, \"rf\");\ngo(TOOLS[0], []);\n",
  "aliased-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\nconst list = TOOLS;\nlist[0] = \"rf\";\ngo(TOOLS[0], []);\n",
  "called-element-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\", function (this: string[]): void {\n  this[0] = \"rf\";\n}];\n(TOOLS[1] as () => void)();\ngo(TOOLS[0], []);\n",
  "tagged-element-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\", function (this: string[]): void {\n  this[0] = \"rf\";\n}];\n(TOOLS[1] as (parts: TemplateStringsArray) => void)`run`;\ngo(TOOLS[0], []);\n",
  "exported-array-command": "import { spawn as go } from \"node:child_process\";\nexport const TOOLS = [\"git\"];\ngo(TOOLS[0], []);\n",
  "local-export-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\"];\nexport { TOOLS };\ngo(TOOLS[0], []);\n",
  "written-array-specifier": "const SPECIFIERS = [\"node:fs\"];\nSPECIFIERS[0] = [\"node:child\", \"process\"].join(\"_\");\nconst m = await import(SPECIFIERS[0]);\nm.spawn(command, []);\n",
  "written-array-api-launch": "const TOOLS = [\"git\"];\nTOOLS[0] = \"rf\";\nexport function run(api: Api): void {\n  api.exec(TOOLS[0], []);\n}\n",
  "read-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\", \"rf\"];\nhand(TOOLS[0]);\ngo(TOOLS[1], []);\n",
  "computed-read-array-command": "import { spawn as go } from \"node:child_process\";\nconst TOOLS = [\"git\", \"rf\"];\nhand(TOOLS[pick()]);\ngo(TOOLS[1], []);\n",
};
/** Rows D and U: the description's LA and NS members and refusal #5's U1 witnesses and U2 plant with its control, each one module. */
const MEMBER_FORMS: Readonly<Record<string, string>> = {
  "W-AS": "import * as cp from \"node:child_process\";\nconst go = (cp as typeof cp).spawn;\ngo(\"rf\", []);\n",
  "W-SAT": "import * as cp from \"node:child_process\";\nconst go = (cp satisfies typeof cp).spawn;\ngo(\"rf\", []);\n",
  "W-TA": "import * as cp from \"node:child_process\";\nconst go = (<typeof cp>cp).spawn;\ngo(\"rf\", []);\n",
  "W-NN": "import * as cp from \"node:child_process\";\nconst go = cp!.spawn;\ngo(\"rf\", []);\n",
  "W-BAND": "import * as cp from \"node:child_process\";\nlet held: unknown = true;\nheld &&= cp;\nconst go = (held as typeof cp).spawn;\ngo(\"rf\", []);\n",
  "W-OR": "import * as cp from \"node:child_process\";\nconst go = cp.spawn || fallback;\ngo(\"rf\", []);\n",
  "W-ANDOP": "import * as cp from \"node:child_process\";\nconst go = flag && cp.spawn;\nif (go) go(\"rf\", []);\n",
  "W-ELEM": "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nexport function run(pi: ExtensionAPI): void {\n  pi[\"exec\"](\"rf\", []);\n}\n",
  "W-FORIN": "import * as cp from \"node:child_process\";\nlet held: unknown = cp;\nfor (held in { a: 1 }) {}\n",
  "W-CWRAP": "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nexport function run(pi: ExtensionAPI): void {\n  (pi.exec as (command: string, args: string[]) => unknown)(\"rf\", []);\n}\n",
  "W-UTYPE": "export type Cp = typeof import(\"node:child_process\");\n",
  "W-BAND-LOADER": "import { createRequire } from \"node:module\";\nlet load: unknown = true;\nload &&= createRequire(import.meta.url);\nexport const m = (load as NodeRequire)(name);\n",
  "W-ELEM-LOADER": "export const m = module[\"require\"](name);\n",
  "W-CWRAP-LOADER": "export const m = (require as (id: string) => unknown)(name);\n",
  BF1: "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nconst TOOL = \"rf\";\nexport async function gp15Bf1(pi: ExtensionAPI, flag: boolean): Promise<string> {\n  const result = await pi.exec(TOOL, [\"--version\"]);\n  if (flag) {\n    function TOOL(): string {\n      return \"unused\";\n    }\n    return TOOL();\n  }\n  return result.stdout;\n}\n",
  BF1c: "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nconst TOOL = \"rf\";\nexport async function gp15Bf1(pi: ExtensionAPI): Promise<string> {\n  const result = await pi.exec(TOOL, [\"--version\"]);\n  return result.stdout;\n}\n",
  LA4: "import * as cp from \"node:child_process\";\ndeclare const fallback: typeof cp;\nlet held: typeof cp = cp;\nconst go = (held ||= fallback).spawn;\ngo(\"rf\", []);\n",
  LA5: "import * as cp from \"node:child_process\";\ndeclare const fallback: typeof cp;\nlet held: typeof cp | undefined = cp;\nconst go = (held ??= fallback).spawn;\ngo(\"rf\", []);\n",
  LA4c2: "import * as cp from \"node:child_process\";\ndeclare const fallback: typeof cp;\nlet held: typeof cp = cp;\nconst go = (held || fallback).spawn;\ngo(\"rf\", []);\n",
  NS2: "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nconst COMMAND = \"git\";\nnamespace Worktree {\n  export const COMMAND = \"rf\";\n}\nnamespace Worktree {\n  export async function git(pi: ExtensionAPI, cwd: string, args: string[], timeout: number): Promise<string> {\n    const result = await pi.exec(COMMAND, args, { cwd, timeout });\n    return result.stdout;\n  }\n}\n",
  NS2c: "import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";\nconst COMMAND = \"git\";\nnamespace Worktree {\n  export const COMMAND = \"rf\";\n}\nnamespace Worktree {\n  export async function git(pi: ExtensionAPI, cwd: string, args: string[], timeout: number): Promise<string> {\n    const result = await pi.exec(\"rf\", args, { cwd, timeout });\n    return result.stdout;\n  }\n}\n",
};
/** Row S: one module per use site of a reader vocabulary in the helper (vocabulary@function#n), spelling every entry there. */
const SITE_FORMS: Readonly<Record<string, string>> = {
  "unwrap@resolveTexts#1": "api.exec((\"rf\"), []);\napi.exec((\"rf\" as string), []);\napi.exec((\"rf\" satisfies string), []);\napi.exec((<string>\"rf\"), []);\napi.exec(\"rf\"!, []);\nconst TOOL = \"rf\";\napi.exec(TOOL<string>, []);\n",
  "unwrap@resolveTexts#2": "const TOOLS = [\"rf\"];\napi.exec(TOOLS[(0)], []);\napi.exec(TOOLS[0 as 0], []);\napi.exec(TOOLS[0 satisfies 0], []);\napi.exec(TOOLS[<0>0], []);\napi.exec(TOOLS[0!], []);\napi.exec(TOOLS[0<T>], []);\n",
  "isWrapper@elementRead#1": "const T1 = [\"git\"];\n(T1[0])();\napi.exec(T1[0], []);\nconst T2 = [\"git\"];\n(T2[0] as F)();\napi.exec(T2[0], []);\nconst T3 = [\"git\"];\n(T3[0] satisfies F)();\napi.exec(T3[0], []);\nconst T4 = [\"git\"];\n(<F>T4[0])();\napi.exec(T4[0], []);\nconst T5 = [\"git\"];\nT5[0]!();\napi.exec(T5[0], []);\nconst T6 = [\"git\"];\n(T6[0]<F>)();\napi.exec(T6[0], []);\n",
  "unwrap@resolveArrays#1": "api.exec(([\"rf\"])[0], []);\napi.exec(([\"rf\"] as string[])[0], []);\napi.exec(([\"rf\"] satisfies string[])[0], []);\napi.exec((<string[]>[\"rf\"])[0], []);\napi.exec([\"rf\"]![0], []);\napi.exec(([\"rf\"]<T>)[0], []);\n",
  "unwrap@calleeName#1": "(api.exec)(\"rf\", []);\n(api.exec as F)(\"rf\", []);\n(api.exec satisfies F)(\"rf\", []);\n(<F>api.exec)(\"rf\", []);\napi.exec!(\"rf\", []);\n(api.exec<F>)(\"rf\", []);\n",
  "unwrap@factory#1": "import { createRequire } from \"node:module\";\nconst l1 = (createRequire(import.meta.url));\nl1(name);\nconst l2 = createRequire(import.meta.url) as NodeRequire;\nl2(name);\nconst l3 = createRequire(import.meta.url) satisfies NodeRequire;\nl3(name);\nconst l4 = <NodeRequire>createRequire(import.meta.url);\nl4(name);\nconst l5 = createRequire(import.meta.url)!;\nl5(name);\nconst l6 = createRequire(import.meta.url)<F>;\nl6(name);\n",
  "unwrap@loaderNames#1": "import { createRequire } from \"node:module\";\nlet l1;\n(l1) = createRequire(import.meta.url);\nl1(name);\nlet l2;\n(l2 as unknown) = createRequire(import.meta.url);\nl2(name);\nlet l3;\n(l3 satisfies unknown) = createRequire(import.meta.url);\nl3(name);\nlet l4;\n(<unknown>l4) = createRequire(import.meta.url);\nl4(name);\nlet l5;\nl5! = createRequire(import.meta.url);\nl5(name);\nlet l6;\n(l6<T>) = createRequire(import.meta.url);\nl6(name);\n",
  "unwrap@isLoaderCall#1": "import { createRequire } from \"node:module\";\n(createRequire(import.meta.url))(name);\n(createRequire(import.meta.url) as NodeRequire)(name);\n(createRequire(import.meta.url) satisfies NodeRequire)(name);\n(<NodeRequire>createRequire(import.meta.url))(name);\ncreateRequire(import.meta.url)!(name);\n(createRequire(import.meta.url)<F>)(name);\n",
  "unwrap@bindTarget#1": "import * as cp from \"node:child_process\";\nlet g1;\n(g1) = cp.spawn;\ng1(\"rf\", []);\nlet g2;\n(g2 as unknown) = cp.spawn;\ng2(\"rf\", []);\nlet g3;\n(g3 satisfies unknown) = cp.spawn;\ng3(\"rf\", []);\nlet g4;\n(<unknown>g4) = cp.spawn;\ng4(\"rf\", []);\nlet g5;\ng5! = cp.spawn;\ng5(\"rf\", []);\nlet g6;\n(g6<T>) = cp.spawn;\ng6(\"rf\", []);\n",
  "isWrapper@consume#1": "import * as cp from \"node:child_process\";\nconst g1 = (cp).spawn;\ng1(\"rf\", []);\nconst g2 = (cp as typeof cp).spawn;\ng2(\"rf\", []);\nconst g3 = (cp satisfies typeof cp).spawn;\ng3(\"rf\", []);\nconst g4 = (<typeof cp>cp).spawn;\ng4(\"rf\", []);\nconst g5 = cp!.spawn;\ng5(\"rf\", []);\nconst g6 = (cp<F>).spawn;\ng6(\"rf\", []);\nconst g7 = (await cp).spawn;\ng7(\"rf\", []);\n",
  "unwrap@consume#1": "import * as cp from \"node:child_process\";\nlet h1 = cp;\nconst g1 = ((h1) ||= fallback).spawn;\ng1(\"rf\", []);\nlet h2 = cp;\nconst g2 = ((h2 as typeof cp) ||= fallback).spawn;\ng2(\"rf\", []);\nlet h3 = cp;\nconst g3 = ((h3 satisfies typeof cp) ||= fallback).spawn;\ng3(\"rf\", []);\nlet h4 = cp;\nconst g4 = ((<typeof cp>h4) ||= fallback).spawn;\ng4(\"rf\", []);\nlet h5 = cp;\nconst g5 = (h5! ||= fallback).spawn;\ng5(\"rf\", []);\nlet h6 = cp;\nconst g6 = (h6<T> ||= fallback).spawn;\ng6(\"rf\", []);\n",
  "unwrap@loaderLabel#1": "import { createRequire } from \"node:module\";\n(createRequire(import.meta.url))(name);\n(createRequire(import.meta.url) as NodeRequire)(name);\n(createRequire(import.meta.url) satisfies NodeRequire)(name);\n(<NodeRequire>createRequire(import.meta.url))(name);\ncreateRequire(import.meta.url)!(name);\n(createRequire(import.meta.url)<F>)(name);\n(require)(name);\n",
  "isWrapper@isWriteTarget#1": "import * as cp from \"node:child_process\";\nlet h1 = cp;\n(h1) = other;\nlet h2 = cp;\n(h2 as unknown) = other;\nlet h3 = cp;\n(h3 satisfies unknown) = other;\nlet h4 = cp;\n(<unknown>h4) = other;\nlet h5 = cp;\nh5! = other;\nlet h6 = cp;\n(h6<T>) = other;\n",
  "LAUNCH_CALLS@launchSitesAt#1": "api.spawn(\"rf\");\napi.spawnSync(\"rf\");\napi.exec(\"rf\");\napi.execSync(\"rf\");\napi.execFile(\"rf\");\napi.execFileSync(\"rf\");\napi.fork(\"rf\");\napi.execve(\"rf\");\n",
  "LAUNCH_CALLS@consume#1": "import * as cp from \"node:child_process\";\nconst { spawn: a, spawnSync: b, exec: c, execSync: d, execFile: e, execFileSync: f, fork: g, execve: h } = cp;\na(\"rf\");\nb(\"rf\");\nc(\"rf\");\nd(\"rf\");\ne(\"rf\");\nf(\"rf\");\ng(\"rf\");\nh(\"rf\");\n",
  "LOADER_CALLS@isLoaderCall#1": "require(name);\nmodule.require(name);\nprocess.getBuiltinModule(name);\npi[\"require\"](name);\n",
  "LOADER_FACTORIES@factory#1": "import { createRequire } from \"node:module\";\nconst load = createRequire(import.meta.url);\nload(name);\nlet late;\nlate = module.createRequire(import.meta.url);\nlate(name);\n",
  "LOADER_FACTORIES@isLoaderCall#1": "import { createRequire } from \"node:module\";\ncreateRequire(import.meta.url)(name);\nmodule.createRequire(import.meta.url)(name);\nm[\"createRequire\"](import.meta.url)(name);\n",
  "BINDING_ASSIGNMENTS@loaderNames#1": "import { createRequire } from \"node:module\";\nlet l1;\nl1 = createRequire(import.meta.url);\nl1(name);\nlet l2;\nl2 ||= createRequire(import.meta.url);\nl2(name);\nlet l3: unknown = true;\nl3 &&= createRequire(import.meta.url);\nl3(name);\nlet l4;\nl4 ??= createRequire(import.meta.url);\nl4(name);\n",
  "BINDING_ASSIGNMENTS@consume#1": "import * as cp from \"node:child_process\";\nlet g1;\ng1 = cp.spawn;\ng1(\"rf\", []);\nlet g2;\ng2 ||= cp.spawn;\ng2(\"rf\", []);\nlet g3: unknown = true;\ng3 &&= cp.spawn;\ng3(\"rf\", []);\nlet g4;\ng4 ??= cp.spawn;\ng4(\"rf\", []);\n",
  "LOGICAL_ASSIGNMENTS@elementRead#1": "const A1 = [\"git\"];\nA1[0] ||= \"rf\";\napi.exec(A1[0], []);\nconst A2 = [\"git\"];\nA2[0] &&= \"rf\";\napi.exec(A2[0], []);\nconst A3 = [\"git\"];\nA3[0] ??= \"rf\";\napi.exec(A3[0], []);\n",
  "LOGICAL_ASSIGNMENTS@isWriteTarget#1": "import * as cp from \"node:child_process\";\nlet h1 = cp;\nhand(h1 ||= fallback);\nlet h2 = cp;\nhand(h2 &&= fallback);\nlet h3 = cp;\nhand(h3 ??= fallback);\n",
  "LOGICAL_ASSIGNMENTS@consume#1": "import * as cp from \"node:child_process\";\nlet h1 = cp;\nconst g1 = (h1 ||= fallback).spawn;\ng1(\"rf\", []);\nlet h2 = cp;\nconst g2 = (h2 &&= fallback).spawn;\ng2(\"rf\", []);\nlet h3 = cp;\nconst g3 = (h3 ??= fallback).spawn;\ng3(\"rf\", []);\n",
  "EITHER_OPERAND@consume#1": "import * as cp from \"node:child_process\";\nconst g1 = cp.spawn ?? fallback;\ng1(\"rf\", []);\nconst g2 = cp.spawn || fallback;\ng2(\"rf\", []);\nconst g3 = flag && cp.spawn;\ng3(\"rf\", []);\n",
  "CHILD_PROCESS@names#1": "import { spawn as a } from \"node:child_process\";\nimport { spawn as b } from \"child_process\";\nconst { spawn: c } = require(\"node:child_process\");\na(\"rf\");\nb(\"rf\");\nc(\"rf\");\n",
  "CHILD_PROCESS@childProcessLaunchesAt#1": `export const a = "node:child_process";\nexport const b = \`child_process\`;\nexport const c = \`\${prefix}child_process\`;\nexport const d = \`node:child_process\${suffix}\`;\nexport const e = \`\${prefix}child_process\${suffix}\`;\nexport type D = typeof import("node:child_process");\n`,
  "IO_GLOBALS@ioGlobalReferences#1": "hand(fetch, XMLHttpRequest, WebSocket, EventSource, BroadcastChannel, console, localStorage, sessionStorage, require, module, eval, Function);\n",
  "GLOBAL_OBJECTS@ioGlobalReferences#1": "hand(globalThis, global.fetch, self[\"XMLHttpRequest\"], window[key]);\n",
  "PROCESS_READS@processReferences#1": "hand(process.env, process[\"env\"], process.cwd(), process);\n",
};
/** The forms this cut adds to the carried roster: each holds a reader branch the cut-time battery found unpinned. */
const EXTRA_FORMS: Readonly<Record<string, string>> = {
  "default-of-member": "import * as cp from \"node:child_process\";\ncp.spawn.default(\"rf\", []);\n",
  "computed-key-ambiguous": "import * as cp from \"node:child_process\";\ncp[flag ? \"spawn\" : \"fork\"](\"rf\", []);\n",
  "computed-binding-key": "import * as cp from \"node:child_process\";\nconst KEY = \"spawn\";\nconst { [KEY]: go } = cp;\ngo(\"rf\", []);\n",
  "string-binding-key": "import * as cp from \"node:child_process\";\nconst { \"spawn\": go } = cp;\ngo(\"rf\", []);\n",
  "numeric-binding-key": "import * as cp from \"node:child_process\";\nconst { 0: first } = cp;\nfirst(\"rf\", []);\n",
  "bigint-binding-key": "import * as cp from \"node:child_process\";\nconst { 1n: first } = cp;\nfirst(\"rf\", []);\n",
  "shorthand-destructured": "const { spawn } = await import(\"node:child_process\");\nspawn(\"rf\", []);\n",
  "array-destructured": "import * as cp from \"node:child_process\";\nconst [first, , ...rest] = cp;\nfirst(\"rf\", []);\nrest(\"rf\", []);\n",
  "assigned-shorthand": "import * as cp from \"node:child_process\";\nlet spawn;\n({ spawn } = cp);\nspawn(\"rf\", []);\n",
  "assigned-spread": "import * as cp from \"node:child_process\";\nlet rest;\n({ ...rest } = cp);\nrest.spawn(\"rf\", []);\n",
  "assigned-array": "import * as cp from \"node:child_process\";\nlet first;\nlet rest;\n[first, , ...rest] = cp;\nfirst(\"rf\", []);\nrest(\"rf\", []);\n",
  "assigned-default": "import * as cp from \"node:child_process\";\nlet go;\n({ spawn: go = fallback } = cp);\ngo(\"rf\", []);\n",
  "dedupe-across-rounds": "import * as cp from \"node:child_process\";\nhand(cp);\nconst go = cp.spawn;\ngo(\"rf\", []);\n",
  "launch-no-argument": "import * as cp from \"node:child_process\";\ncp.spawn();\napi.exec();\n",
  "assignment-value": "import * as cp from \"node:child_process\";\nlet held;\nconst go = (held = cp).spawn;\ngo(\"rf\", []);\n",
  "operator-result": "import * as cp from \"node:child_process\";\nconst go = (prefix + cp).spawn;\ngo(\"rf\", []);\n",
  "condition-result": "import * as cp from \"node:child_process\";\nconst go = (cp ? left : right).spawn;\ngo(\"rf\", []);\n",
  "trace-rounds-within": "import * as cp from \"node:child_process\";\na15(\"rf\", []);\nconst a15 = a14;\nconst a14 = a13;\nconst a13 = a12;\nconst a12 = a11;\nconst a11 = a10;\nconst a10 = a9;\nconst a9 = a8;\nconst a8 = a7;\nconst a7 = a6;\nconst a6 = a5;\nconst a5 = a4;\nconst a4 = a3;\nconst a3 = a2;\nconst a2 = a1;\nconst a1 = cp.spawn;\n",
  "trace-rounds-past": "import * as cp from \"node:child_process\";\na16(\"rf\", []);\nconst a16 = a15;\nconst a15 = a14;\nconst a14 = a13;\nconst a13 = a12;\nconst a12 = a11;\nconst a11 = a10;\nconst a10 = a9;\nconst a9 = a8;\nconst a8 = a7;\nconst a7 = a6;\nconst a6 = a5;\nconst a5 = a4;\nconst a4 = a3;\nconst a3 = a2;\nconst a2 = a1;\nconst a1 = cp.spawn;\n",
  "resolve-depth-within": "const T1 = \"rf\";\nconst T2 = T1;\nconst T3 = T2;\nconst T4 = T3;\nconst T5 = T4;\nconst T6 = T5;\nconst T7 = T6;\nconst T8 = T7;\napi.exec(T8, []);\n",
  "resolve-depth-past": "const T1 = \"rf\";\nconst T2 = T1;\nconst T3 = T2;\nconst T4 = T3;\nconst T5 = T4;\nconst T6 = T5;\nconst T7 = T6;\nconst T8 = T7;\nconst T9 = T8;\napi.exec(T9, []);\n",
  "array-depth-within": "api.exec((flag ? (flag ? (flag ? (flag ? (flag ? (flag ? [\"rf\"] : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"])[0], []);\n",
  "array-depth-past": "api.exec((flag ? (flag ? (flag ? (flag ? (flag ? (flag ? (flag ? [\"rf\"] : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"]) : [\"git\"])[0], []);\n",
  "resolve-depth-trusting": "declare const T1 = \"git\";\nconst T2 = T1;\nconst T3 = T2;\nconst T4 = T3;\nconst T5 = T4;\nconst T6 = T5;\nconst T7 = T6;\nconst T8 = T7;\napi.exec(T8, []);\n",
  "resolve-cycle": "const A = B;\nconst B = A;\napi.exec(A, []);\n",
  "resolve-array-cycle": "const A = B;\nconst B = A;\napi.exec(A[0], []);\n",
  "ambient-module-name": "declare module \"node:child_process\" {\n  export function spawn(command: string): void;\n}\n",
  "untraced-key": "export const table = { \"node:child_process\": loader };\n",
  "untraced-argument": "hand(\"node:child_process\");\n",
  "type-only-import-reexport": "import type cp from \"node:child_process\";\nexport { cp };\n",
  "type-only-specifier-reexport": "import { type spawn } from \"node:child_process\";\nexport { spawn };\n",
  "type-only-import-equals-reexport": "import type cp = require(\"node:child_process\");\nexport { cp };\n",
  "side-effect-import": "import \"node:child_process\";\n",
  "other-import-equals": "import fs = require(\"node:fs\");\nfs.readFileSync(path);\n",
  "re-export-namespace": "export * as cp from \"node:child_process\";\n",
  "re-export-from-beside-held": "import * as cp from \"node:child_process\";\nconst spawn = cp.spawn;\nexport { spawn as remote } from \"./other.js\";\nspawn(\"rf\", []);\n",
  "loader-no-argument": "export const m = require();\n",
  "exported-other-beside-array": "export const OTHER = 1;\nconst TOOLS = [\"rf\"];\napi.exec(TOOLS[0], []);\n",
  "local-export-other-beside-array": "const OTHER = 1;\nexport { OTHER };\nconst TOOLS = [\"rf\"];\napi.exec(TOOLS[0], []);\n",
  "re-export-same-name-beside-array": "const TOOLS = [\"rf\"];\nexport { TOOLS } from \"./tools.js\";\napi.exec(TOOLS[0], []);\n",
  "typed-read-array": "const TOOLS = [\"rf\"];\ntype Tools = typeof TOOLS;\napi.exec(TOOLS[0], []);\n",
  "string-named-array": "const TOOLS = [\"rf\"];\nhand(\"TOOLS\");\napi.exec(TOOLS[0], []);\n",
  "keyed-by-array": "const TOOLS = [\"rf\"];\nhand(other[TOOLS]);\napi.exec(TOOLS[0], []);\n",
  "member-of-array": "const TOOLS = [\"rf\"];\nhand(TOOLS.length);\napi.exec(TOOLS[0], []);\n",
  "element-operand-array": "const TOOLS = [\"rf\"];\nhand(TOOLS[0] + \"x\");\napi.exec(TOOLS[0], []);\n",
  "element-logical-value-array": "const TOOLS = [\"rf\"];\nlet other;\nother ||= TOOLS[0];\napi.exec(TOOLS[0], []);\n",
  "element-member-array": "const TOOLS = [\"rf\"];\nhand(TOOLS[0].length);\napi.exec(TOOLS[0], []);\n",
  "for-of-const-scope": "const TOOL = \"rf\";\nfor (const TOOL of tools) hand(TOOL);\napi.exec(TOOL, []);\n",
  "for-in-const-scope": "const TOOL = \"rf\";\nfor (const TOOL in table) hand(TOOL);\napi.exec(TOOL, []);\n",
  "static-block-var-scope": "const TOOL = \"rf\";\nclass Holder {\n  static {\n    var TOOL = \"git\";\n    hand(TOOL);\n  }\n}\napi.exec(TOOL, []);\n",
  "function-var-scope": "const TOOL = \"rf\";\nexport function decoy(): void {\n  var TOOL = \"git\";\n  hand(TOOL);\n}\napi.exec(TOOL, []);\n",
  "namespace-var-scope": "const TOOL = \"rf\";\nnamespace Holder {\n  var TOOL = \"git\";\n  hand(TOOL);\n}\napi.exec(TOOL, []);\n",
  "module-var-command": "var TOOL = \"rf\";\napi.exec(TOOL, []);\n",
  "logical-member-value": "import * as cp from \"node:child_process\";\nconst go = (cp.spawn ||= fallback);\ngo(\"rf\", []);\n",
  "loader-second-argument": "declare function require(...ids: string[]): unknown;\nrequire(\"planted\", \"node:child_process\");\n",
};
/** The script kinds: one JSX module under every extension parseSource reads with JSX, in either letter case. */
const SCRIPT_FORMS: Readonly<Record<string, string>> = {
  "view.tsx": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "VIEW.TSX": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "view.jsx": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "VIEW.JSX": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "view.js": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "view.mjs": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "view.cjs": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
  "VIEW.MJS": "import * as cp from \"node:child_process\";\nexport const view = <b>{cp.spawn(\"rf\", [])}</b>;\n",
};
/** wb-pyel.5 cut #5's planted module (A5's control), byte for byte: every reader reads its own sites in it. */
const PLANTED_REACH = "import { spawn as run, execFileSync } from \"node:child_process\";\nimport * as cp from \"child_process\";\nimport childProcess from \"node:child_process\";\nimport cpEquals = require(\"child_process\");\nexport { exec as reexported } from \"node:child_process\";\nexport * from \"./planted-peer.js\";\nimport q = require(\"planted-required\");\nconst lazy = await import(\"planted-lazy\");\nconst LAZY_NAME = \"planted-const-lazy\";\nconst constLazy = await import(LAZY_NAME);\nconst computedLazy = await import(pickName());\nconst required = require(\"planted-require-call\");\nconst { spawnSync: launchSync } = require(\"node:child_process\");\nconst loaded = process.getBuiltinModule(\"node:child_process\");\nconst TOOL = \"hx\";\nconst SHELLS = flag ? [\"cmd\", \"/c\"] : [\"sh\", \"-c\"];\nconst PICKED = flag ? \"git\" : \"forge\";\nrun(\"hx\", []);\nrun(\"rf\", []);\nexecFileSync(command);\ncp.fork(\"worker.js\");\ncp.exec(PICKED);\nchildProcess.execFileSync(TOOL);\ncpEquals.exec(\"git\");\nlaunchSync(SHELLS[0]);\nloaded.spawn(\"rf\");\nconst alias = run;\nServerConnection.spawn(\"forge\");\npi.exec(\"git\", []);\npi.exec(SHELLS[0], []);\nmanager.spawn(pi);\nconst reply = await fetch(\"https://example.invalid/\");\nconst socket = new WebSocket(\"wss://example.invalid/\");\nconst viaGlobal = globalThis.fetch;\nconst viaIndex = self[\"XMLHttpRequest\"];\nconst holder = global;\nconst code = eval(source);\nconst fs = process.getBuiltinModule(\"node:fs\");\nconst env = process.env;\nsettings.fetch = 1;\nconst typed: typeof globalThis.fetch = reply;\nclass PlantedNamedChild extends run {}\nclass PlantedNamespaceChild extends cp.ChildProcess {}\nclass PlantedDefaultChild extends childProcess.ChildProcess {}\nclass PlantedEqualsChild extends cpEquals.ChildProcess {}\nclass PlantedLoadedChild extends loaded.ChildProcess {}\nconst PlantedExpressionChild = class extends cp.ChildProcess {};\nclass PlantedSocketChild extends WebSocket {}\nclass PlantedGlobalChild extends globalThis.EventTarget {}\nclass PlantedProcessChild extends process.constructor {}\nconst instantiated = run<never>;\ninstantiated(\"rf\");\nclass PlantedTypedChild implements cp.ChildProcess {}\ninterface PlantedShape extends WebSocket, NodeJS.Process {}\nclass PlantedTypeArgument extends Base<typeof globalThis.fetch> {}\n";
/** Row P: every position a name can take, one probe each with HELD at it and the kind of position it is (the carried 106 first, byte for byte). */
const POSITIONS: Readonly<Record<string, { readonly probe: string; readonly kind: PositionKind }>> = {
  argument: { probe: "hand(HELD);\n", kind: "value" },
  callee: { probe: "hand(HELD());\n", kind: "value" },
  "optional-callee": { probe: "hand(HELD?.());\n", kind: "value" },
  "new-callee": { probe: "hand(new HELD());\n", kind: "value" },
  "member-base": { probe: "hand(HELD.member);\n", kind: "value" },
  "optional-member-base": { probe: "hand(HELD?.member);\n", kind: "value" },
  "element-base": { probe: "hand(HELD[\"member\"]);\n", kind: "value" },
  "element-key": { probe: "hand(other[HELD]);\n", kind: "value" },
  "tagged-template": { probe: "hand(HELD`text`);\n", kind: "value" },
  "template-span": { probe: `hand(\`text \${HELD}\`);\n`, kind: "value" },
  return: { probe: "export function read(): unknown {\n  return HELD;\n}\n", kind: "value" },
  "arrow-body": { probe: "export const read = (): unknown => HELD;\n", kind: "value" },
  "property-value": { probe: "hand({ key: HELD });\n", kind: "value" },
  "shorthand-property": { probe: "hand({ HELD });\n", kind: "value" },
  "computed-key": { probe: "hand({ [HELD]: 1 });\n", kind: "value" },
  "spread-element": { probe: "hand([...HELD]);\n", kind: "value" },
  "spread-property": { probe: "hand({ ...HELD });\n", kind: "value" },
  "array-element": { probe: "hand([HELD]);\n", kind: "value" },
  "default-parameter": { probe: "export function read(value = HELD): unknown {\n  return value;\n}\n", kind: "value" },
  "binding-default": { probe: "const { value = HELD } = hand();\nhand(value);\n", kind: "value" },
  "class-field": { probe: "export class Holder {\n  field = HELD;\n}\n", kind: "value" },
  "static-field": { probe: "export class Holder {\n  static field = HELD;\n}\n", kind: "value" },
  "computed-member": { probe: "export class Holder {\n  [HELD](): void {}\n}\n", kind: "value" },
  decorator: { probe: "@HELD\nexport class Holder {}\n", kind: "value" },
  "class-extends": { probe: "export class Holder extends HELD {}\n", kind: "value" },
  "class-extends-member": { probe: "export class Holder extends HELD.Base {}\n", kind: "value" },
  "class-extends-call": { probe: "export class Holder extends hand(HELD) {}\n", kind: "value" },
  "class-expression-extends": { probe: "export const Holder = class extends HELD {};\n", kind: "value" },
  instantiation: { probe: "hand(HELD<string>);\n", kind: "value" },
  "alias-declaration": { probe: "const alias = HELD;\nhand(alias);\n", kind: "value" },
  "alias-assignment": { probe: "let alias;\nalias = HELD;\nhand(alias);\n", kind: "value" },
  "destructured-alias": { probe: "const { member: alias } = HELD;\nhand(alias);\n", kind: "value" },
  "property-store": { probe: "holder.value = HELD;\n", kind: "value" },
  "typeof-expression": { probe: "hand(typeof HELD);\n", kind: "value" },
  unary: { probe: "hand(!HELD);\n", kind: "value" },
  binary: { probe: "hand(HELD + 1);\n", kind: "value" },
  equality: { probe: "hand(HELD === other);\n", kind: "value" },
  "in-operand": { probe: "hand(\"member\" in HELD);\n", kind: "value" },
  "instanceof-operand": { probe: "hand(other instanceof HELD);\n", kind: "value" },
  nullish: { probe: "hand(HELD ?? other);\n", kind: "value" },
  logical: { probe: "hand(HELD || other);\n", kind: "value" },
  "conditional-arm": { probe: "hand(flag ? HELD : other);\n", kind: "value" },
  condition: { probe: "if (HELD) hand();\n", kind: "value" },
  parenthesized: { probe: "hand((HELD));\n", kind: "value" },
  "as-expression": { probe: "hand(HELD as unknown);\n", kind: "value" },
  "satisfies-expression": { probe: "hand(HELD satisfies unknown);\n", kind: "value" },
  "non-null": { probe: "hand(HELD!);\n", kind: "value" },
  "type-assertion": { probe: "hand(<unknown>HELD);\n", kind: "value" },
  await: { probe: "hand(await HELD);\n", kind: "value" },
  "comma-right": { probe: "hand((0, HELD));\n", kind: "value" },
  throw: { probe: "throw HELD;\n", kind: "value" },
  "for-of": { probe: "for (const item of HELD) hand(item);\n", kind: "value" },
  "for-in": { probe: "for (const key in HELD) hand(key);\n", kind: "value" },
  switch: { probe: "switch (HELD) {\n  default:\n    hand();\n}\n", kind: "value" },
  case: { probe: "switch (other) {\n  case HELD:\n    hand();\n}\n", kind: "value" },
  yield: { probe: "export function* read(): Generator<unknown> {\n  yield HELD;\n}\n", kind: "value" },
  "export-default": { probe: "export default HELD;\n", kind: "value" },
  "export-assignment": { probe: "export = HELD;\n", kind: "value" },
  "enum-initializer": { probe: "enum Holder {\n  Member = HELD,\n}\nhand(Holder);\n", kind: "value" },
  delete: { probe: "hand(delete HELD.member);\n", kind: "value" },
  "logical-or-target": { probe: "hand(HELD ||= other);\n", kind: "value" },
  "logical-and-target": { probe: "hand(HELD &&= other);\n", kind: "value" },
  "logical-nullish-target": { probe: "hand(HELD ??= other);\n", kind: "value" },
  statement: { probe: "HELD;\n", kind: "discarded" },
  "member-statement": { probe: "HELD.member;\n", kind: "discarded" },
  void: { probe: "hand(void HELD);\n", kind: "discarded" },
  "comma-left": { probe: "hand((HELD, 0));\n", kind: "discarded" },
  "logical-target-statement": { probe: "HELD ??= other;\n", kind: "discarded" },
  "assignment-target": { probe: "HELD = other;\n", kind: "written" },
  "compound-target": { probe: "HELD += 1;\n", kind: "written" },
  increment: { probe: "HELD++;\n", kind: "written" },
  "destructuring-target": { probe: "[HELD] = list;\n", kind: "written" },
  "for-of-target": { probe: "for (HELD of list) hand();\n", kind: "written" },
  "local-export": { probe: "export { HELD };\n", kind: "export" },
  "local-export-alias": { probe: "export { HELD as alias };\n", kind: "export" },
  "property-name": { probe: "hand(other.HELD);\n", kind: "name" },
  key: { probe: "hand({ HELD: 1 });\n", kind: "name" },
  "method-name": { probe: "export class Holder {\n  HELD(): void {}\n}\n", kind: "name" },
  "field-name": { probe: "export class Holder {\n  HELD = 1;\n}\n", kind: "name" },
  declaration: { probe: "const HELD = 1;\n", kind: "name" },
  "function-name": { probe: "export function HELD(): void {}\n", kind: "name" },
  "class-name": { probe: "export class HELD {}\n", kind: "name" },
  parameter: { probe: "export function read(HELD: unknown): void {}\n", kind: "name" },
  "binding-name": { probe: "const { HELD } = other;\n", kind: "name" },
  "binding-key": { probe: "const { HELD: alias } = other;\n", kind: "name" },
  "import-name": { probe: "import { HELD } from \"other\";\n", kind: "name" },
  label: { probe: "HELD: for (;;) break HELD;\n", kind: "name" },
  "enum-member-name": { probe: "enum Holder {\n  HELD = 1,\n}\n", kind: "name" },
  "qualified-right": { probe: "import alias = Outer.HELD;\n", kind: "name" },
  "export-alias-name": { probe: "export { other as HELD };\n", kind: "name" },
  "namespace-export": { probe: "export * as HELD from \"other\";\n", kind: "name" },
  annotation: { probe: "let value: HELD;\n", kind: "type" },
  "typeof-query": { probe: "let value: typeof HELD;\n", kind: "type" },
  "type-alias": { probe: "type Shape = HELD;\n", kind: "type" },
  "type-argument": { probe: "hand<HELD>(other);\n", kind: "type" },
  "instantiation-argument": { probe: "hand(other<HELD>);\n", kind: "type" },
  implements: { probe: "export class Holder implements HELD {}\n", kind: "type" },
  "interface-extends": { probe: "interface Shape extends HELD {}\n", kind: "type" },
  "heritage-type-argument": { probe: "export class Holder extends Base<typeof HELD> {}\n", kind: "type" },
  constraint: { probe: "export function read<T extends HELD>(): void {}\n", kind: "type" },
  "as-type": { probe: "hand(other as HELD);\n", kind: "type" },
  "satisfies-type": { probe: "hand(other satisfies HELD);\n", kind: "type" },
  "type-literal-key": { probe: "type Shape = { [HELD]: number };\n", kind: "type" },
  "import-type": { probe: "let value: import(\"other\").HELD;\n", kind: "type" },
  predicate: { probe: "export function check(value: unknown): value is HELD {\n  return true;\n}\n", kind: "type" },
  "type-only-import": { probe: "import type { HELD } from \"other\";\n", kind: "type" },
  "qualified-left": { probe: "import alias = HELD.Inner;\nhand(alias);\n", kind: "value" },
  "member-store-base": { probe: "HELD.member = other;\n", kind: "value" },
  "element-store-base": { probe: "HELD[\"member\"] = other;\n", kind: "value" },
  "shorthand-default": { probe: "({ alias = HELD } = other);\n", kind: "value" },
  "rest-target": { probe: "[...HELD] = list;\n", kind: "written" },
  "object-rest-target": { probe: "({ ...HELD } = other);\n", kind: "written" },
  "shorthand-target": { probe: "({ HELD } = other);\n", kind: "written" },
  "prefix-increment": { probe: "++HELD;\n", kind: "written" },
  decrement: { probe: "HELD--;\n", kind: "written" },
  "function-expression-name": { probe: "hand(function HELD(): void {});\n", kind: "name" },
  "class-expression-name": { probe: "hand(class HELD {});\n", kind: "name" },
  "getter-name": { probe: "export class Holder {\n  get HELD(): number {\n    return 1;\n  }\n}\n", kind: "name" },
  "setter-name": { probe: "export class Holder {\n  set HELD(value: number) {}\n}\n", kind: "name" },
  "property-signature-name": { probe: "interface Shape {\n  HELD: number;\n}\n", kind: "name" },
  "method-signature-name": { probe: "interface Shape {\n  HELD(): void;\n}\n", kind: "name" },
  "enum-name": { probe: "enum HELD {\n  Member = 1,\n}\n", kind: "name" },
  "type-alias-name": { probe: "type HELD = number;\n", kind: "name" },
  "interface-name": { probe: "interface HELD {}\n", kind: "name" },
  "namespace-name": { probe: "namespace HELD {}\n", kind: "name" },
  "type-parameter-name": { probe: "export function read<HELD>(): void {}\n", kind: "name" },
  "default-import-name": { probe: "import HELD from \"other\";\n", kind: "name" },
  "namespace-import-name": { probe: "import * as HELD from \"other\";\n", kind: "name" },
  "import-equals-name": { probe: "import HELD = require(\"other\");\n", kind: "name" },
  "property-target": { probe: "({ alias: HELD } = other);\n", kind: "written" },
  "for-in-target": { probe: "for (HELD in table) hand();\n", kind: "written" },
  "wrapped-target": { probe: "(HELD as unknown) = other;\n", kind: "written" },
};
/** Row Q: R-STATIC-FORMS, one probe per form the readers do not parse (cut #5's 13 Q6 probes first, byte for byte), its quiet reading pinned. */
const STATIC_RESIDUE: Readonly<Record<string, string>> = {
  "unbound-api-launch": "export function run(api: { exec(command: string): void }, command: string): void { api.exec(command); }\n",
  "unbound-value-launch": "export function run(pick: () => (command: string) => void): void { const launch = pick(); launch(\"rf\"); }\n",
  "package-launcher": "import { execa } from \"execa\";\nexport const run = (): unknown => execa(\"rf\");\n",
  "constructor-chain-global": "export const reach = (): unknown => \"\".constructor.constructor(\"return this\")();\n",
  "env-write": "export function run(): void { process.env.PLANTED = \"1\"; }\n",
  "argument-carried": "import { spawn } from \"node:child_process\";\nexport const run = (): unknown => spawn(\"sh\", [\"-c\", \"rf context render --json\"]);\n",
  "other-builtin-launch": "import cluster from \"node:cluster\";\nexport const run = (): unknown => cluster.fork();\n",
  "unparsed-loader": "export const load = (name: string): unknown => Reflect.apply(require, undefined, [name]);\n",
  "aliased-loader": "export function load(name: string): unknown {\n  const read = require;\n  return read(name);\n}\n",
  "renamed-loader-factory": "import { createRequire as make } from \"node:module\";\nexport const load = (name: string): unknown => make(import.meta.url)(name);\n",
  "held-loader-factory": "import { createRequire } from \"node:module\";\nconst loaders = { load: createRequire(import.meta.url) };\nexport const load = (name: string): unknown => loaders.load(name);\n",
  "composed-code": "export const run = (code: string): unknown => new Function(code)();\n",
  "process-binding": "export const raw = (): unknown => process.binding(\"spawn_sync\");\n",
  "partial-conditional-command": "api.exec(flag ? \"rf\" : command, []);\n",
  "partial-conditional-array-command": "api.exec((flag ? [\"rf\"] : others)[0], []);\n",
  "spread-array-command": "api.exec([...others, \"rf\"][1], []);\n",
  "unbound-array-command": "export function run(SHELLS: string[]): void {\n  api.exec(SHELLS[0], []);\n}\n",
  "computed-callee-command": "const exec = \"exec\";\napi[exec](\"rf\", []);\n",
  "parameter-default-loader": "import { createRequire } from \"node:module\";\nexport function load(name: string, read = createRequire(import.meta.url)): unknown {\n  return read(name);\n}\n",
  "or-operand-loader": "import { createRequire } from \"node:module\";\nconst picked = load || createRequire(import.meta.url);\nload(name);\n",
  "string-index-array-command": "const TOOLS = [\"rf\"];\napi.exec(TOOLS[\"0\"], []);\n",
  "string-indexed-command": "const abc = [\"rf\"];\napi.exec(\"abc\"[0], []);\n",
};
/** Row F's families: every carried form (in cut #5's order) and every added form in exactly one family, each family one pin. */
const FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "F-ENTRIES": ["named-import", "renamed-import", "string-named-import", "default-named-import", "namespace-import", "default-import", "import-equals", "require-whole", "require-destructured", "require-member-call", "import-whole", "import-destructured", "import-nested-destructured", "import-member-bound", "import-member-call", "import-default-member", "assigned-whole", "assigned-logical", "assigned-destructured", "builtin-module", "create-require-call", "create-require-bound", "create-require-assigned", "const-specifier"],
  "F-FOLLOW": ["alias", "alias-destructured", "hoisted-alias", "self-deepening", "rest-destructured", "element-access", "optional-call", "coalesced", "conditional-binding", "const-command", "indexed-command", "conditional-command", "process-execve"],
  "F-ESCAPES": ["argument-escape", "returned", "stored-property", "class-field", "then-callback", "call-apply", "computed-member"],
  "F-EXPORTS": ["re-export", "re-export-all", "exported-binding", "exported-import-equals", "local-export", "default-export"],
  "F-STRINGS": ["untraced-string", "unparsed-loader-literal", "composed-specifier"],
  "F-LOADS": ["computed-import", "computed-require", "computed-builtin", "computed-create-require", "create-require-logical", "create-require-logical-traced"],
  "F-HERITAGE": ["heritage-named-import", "heritage-namespace-import", "heritage-default-import", "heritage-import-equals", "heritage-require-bound", "heritage-import-bound", "heritage-builtin-bound", "heritage-loader-direct", "heritage-class-expression", "heritage-mixin-argument", "heritage-alias", "heritage-untraced-string"],
  "F-INSTANTIATION": ["instantiation-alias", "instantiation-call", "instantiation-named-launch"],
  "F-SCOPE": ["scoped-const-command", "block-const-command", "let-command", "let-shadow-command", "parameter-shadow-command", "catch-shadow-command", "var-shadow-command", "import-shadow-command", "inner-const-command", "await-using-command", "function-shadow-command", "block-function-shadow-command", "function-name-shadow-command", "class-name-shadow-command", "class-shadow-command", "enum-shadow-command", "namespace-shadow-command", "import-equals-shadow-command", "default-import-shadow-command", "namespace-import-shadow-command", "object-destructured-shadow-command", "array-destructured-shadow-command", "for-const-scope-command", "case-const-scope-command", "namespace-const-scope-command", "block-const-scope-command", "type-import-const-command", "for-const-command", "destructured-const-command", "inner-const-specifier", "let-shadow-specifier"],
  "F-LOGICAL": ["logical-or-kept", "logical-nullish-kept", "logical-and-kept", "logical-kept-member", "logical-kept-call", "logical-member-store"],
  "F-MERGED": ["namespace-merged-command", "namespace-merged-api-launch", "dotted-namespace-merged-command", "namespace-local-command", "namespace-literal-command", "namespace-merged-specifier", "namespace-merged-key", "enum-merged-command", "enum-merged-api-launch", "type-namespace-const-command"],
  "F-AMBIENT": ["ambient-const-command", "ambient-const-api-launch"],
  "F-ARRAYS": ["written-array-command", "compound-array-command", "logical-written-array-command", "destructured-array-command", "for-of-array-command", "deleted-array-command", "method-written-array-command", "aliased-array-command", "called-element-array-command", "tagged-element-array-command", "exported-array-command", "local-export-array-command", "written-array-specifier", "written-array-api-launch", "read-array-command", "computed-read-array-command"],
  "F-BINDINGS": ["default-of-member", "computed-key-ambiguous", "computed-binding-key", "string-binding-key", "numeric-binding-key", "bigint-binding-key", "shorthand-destructured", "array-destructured", "assigned-shorthand", "assigned-spread", "assigned-array", "assigned-default", "dedupe-across-rounds", "launch-no-argument", "assignment-value", "operator-result", "condition-result", "logical-member-value"],
  "F-BOUNDS": ["trace-rounds-within", "trace-rounds-past", "resolve-depth-within", "resolve-depth-past", "array-depth-within", "array-depth-past", "resolve-depth-trusting", "resolve-cycle", "resolve-array-cycle"],
  "F-ENTRY-EDGES": ["ambient-module-name", "untraced-key", "untraced-argument", "type-only-import-reexport", "type-only-specifier-reexport", "type-only-import-equals-reexport", "side-effect-import", "other-import-equals", "re-export-namespace", "re-export-from-beside-held", "loader-no-argument", "loader-second-argument"],
  "F-ARRAY-READS": ["exported-other-beside-array", "local-export-other-beside-array", "re-export-same-name-beside-array", "typed-read-array", "string-named-array", "keyed-by-array", "member-of-array", "element-operand-array", "element-logical-value-array", "element-member-array"],
  "F-VAR-SCOPES": ["for-of-const-scope", "for-in-const-scope", "static-block-var-scope", "function-var-scope", "namespace-var-scope", "module-var-command"],
};
/** The row F pins that read one module (cut #5's planted module) and the script kinds, beside the families. */
const PLANTED_PIN = "F-PLANTED";
const SCRIPTS_PIN = "F-SCRIPTS";
/** The residual families and the quiet-row pins that hold them. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = { "R-STATIC-FORMS": ["Q-STATIC-FORMS"] };
/** Row P's pins, one per position kind. */
const KIND_PINS: Readonly<Record<string, PositionKind>> = { "P-VALUE": "value", "P-DISCARDED": "discarded", "P-WRITTEN": "written", "P-EXPORT": "export", "P-NAME": "name", "P-TYPE": "type" };
/** The positions each predicate of isNameSlot and isWriteTarget answers for: every ts.is* test either function makes. */
const PREDICATE_POSITIONS: Readonly<Record<"isNameSlot" | "isWriteTarget", Readonly<Record<string, readonly string[]>>>> = {
  isNameSlot: {
    isPropertyAccessExpression: ["property-name"],
    isQualifiedName: ["qualified-right", "qualified-left"],
    isBindingElement: ["binding-name", "binding-key"],
    isImportSpecifier: ["import-name"],
    isExportSpecifier: ["export-alias-name"],
    isImportClause: ["default-import-name"],
    isNamespaceImport: ["namespace-import-name"],
    isNamespaceExport: ["namespace-export"],
    isLabeledStatement: ["label"],
    isBreakOrContinueStatement: ["label"],
    isImportEqualsDeclaration: ["import-equals-name"],
    isVariableDeclaration: ["declaration"],
    isFunctionDeclaration: ["function-name"],
    isFunctionExpression: ["function-expression-name"],
    isClassDeclaration: ["class-name"],
    isClassExpression: ["class-expression-name"],
    isParameter: ["parameter"],
    isMethodDeclaration: ["method-name"],
    isPropertyDeclaration: ["field-name"],
    isPropertyAssignment: ["key"],
    isPropertySignature: ["property-signature-name"],
    isMethodSignature: ["method-signature-name"],
    isGetAccessorDeclaration: ["getter-name"],
    isSetAccessorDeclaration: ["setter-name"],
    isEnumMember: ["enum-member-name"],
    isEnumDeclaration: ["enum-name"],
    isTypeAliasDeclaration: ["type-alias-name"],
    isInterfaceDeclaration: ["interface-name"],
    isModuleDeclaration: ["namespace-name"],
    isTypeParameterDeclaration: ["type-parameter-name"],
  },
  isWriteTarget: {
    isArrayLiteralExpression: ["destructuring-target"],
    isObjectLiteralExpression: ["property-target", "shorthand-target"],
    isSpreadAssignment: ["object-rest-target"],
    isSpreadElement: ["rest-target"],
    isPropertyAssignment: ["property-target"],
    isShorthandPropertyAssignment: ["shorthand-target", "shorthand-default"],
    isBinaryExpression: ["assignment-target", "compound-target", "logical-or-target"],
    isForInStatement: ["for-in-target"],
    isForOfStatement: ["for-of-target"],
    isPrefixUnaryExpression: ["prefix-increment"],
    isPostfixUnaryExpression: ["increment", "decrement"],
  },
};
/** The vocabularies whose every use site in the helper is a row S pin (unwrap and isWrapper carry WRAPPERS). */
const SITE_VOCABULARIES = ["unwrap", "isWrapper", "LAUNCH_CALLS", "LOADER_CALLS", "LOADER_FACTORIES", "BINDING_ASSIGNMENTS", "LOGICAL_ASSIGNMENTS", "EITHER_OPERAND", "CHILD_PROCESS", "IO_GLOBALS", "GLOBAL_OBJECTS", "PROCESS_READS"] as const;
/** The helper functions that only carry WRAPPERS (the vocabulary itself, not a use site). */
const WRAPPER_PLUMBING = ["unwrap", "isWrapper"];

// ---- the outside anchors: tracker-export lines, each read at its first occurrence ----

/** The line prefixes (and one phrase) the judged set is anchored to in wb-pyel.9's description and wb-pyel.5's notes. */
const ANCHORS = {
  laItem: "- LA (assignment-operator launch values): ",
  nsItem: "- NS (merged namespace scope): ",
  acceptance: "Acceptance: ",
  ruling: "The full-surface work (",
  form: "FORM (R-B123): ",
  residual: "New residual R-STATIC-FORMS (Q6)",
  u1: "U1-HIGH-CONFIRMED-R-B123-R515: ",
  u2: "U2-HIGH-CONFIRMED-R515-R668-R514: ",
} as const;
/** The counts wb-pyel.5's FORM line states for cut #5's rosters (carried here byte for byte). */
const CARRIED_COUNTS = { reachForms: 139, referencePositions: 106 } as const;

// ---- the kills: the named hollowings, executed on the helper's own bytes ----

interface Edit {
  readonly from: string;
  readonly to: string;
}
interface Kill {
  /** What the hollowing removes, in the refusal's words where it names it. */
  readonly hollows: string;
  readonly edits: readonly Edit[];
  /** Every pin whose witness the hollowing changes, in row order (measured: exactly these, both ways). */
  readonly reds: readonly string[];
}
const WRAPPER_LOOP = "(isWrapper(wrapper) || ts.isAwaitExpression(wrapper))";
const loopWithout = (test: string): Edit => ({ from: WRAPPER_LOOP, to: `((isWrapper(wrapper) && !ts.${test}(wrapper)) || ts.isAwaitExpression(wrapper))` });
/** Refusal #5's U1 hollowings H1-AS..H11-UTYPE, its U2 hoisting, and cut #4's readings of the description's LA and NS. */
const KILLS: Readonly<Record<string, Kill>> = {
  "H1-AS": { hollows: "consume's wrapper loop without ts.isAsExpression", edits: [loopWithout("isAsExpression")], reds: ["W-AS", "W-BAND", "isWrapper@consume#1", "unwrap@consume#1"] },
  "H2-SAT": { hollows: "consume's wrapper loop without ts.isSatisfiesExpression", edits: [loopWithout("isSatisfiesExpression")], reds: ["W-SAT", "isWrapper@consume#1", "unwrap@consume#1"] },
  "H3-TA": { hollows: "consume's wrapper loop without ts.isTypeAssertionExpression", edits: [loopWithout("isTypeAssertionExpression")], reds: ["W-TA", "isWrapper@consume#1", "unwrap@consume#1"] },
  "H4-NN": { hollows: "consume's wrapper loop without ts.isNonNullExpression", edits: [loopWithout("isNonNullExpression")], reds: ["W-NN", "isWrapper@consume#1", "unwrap@consume#1"] },
  "H5-BAND": {
    hollows: "BINDING_ASSIGNMENTS without AmpersandAmpersandEqualsToken (the tracer's right-side binding and loaderNames)",
    edits: [{ from: '  "=": ts.SyntaxKind.EqualsToken,\n  "||=": ts.SyntaxKind.BarBarEqualsToken,\n  "&&=": ts.SyntaxKind.AmpersandAmpersandEqualsToken,\n', to: '  "=": ts.SyntaxKind.EqualsToken,\n  "||=": ts.SyntaxKind.BarBarEqualsToken,\n' }],
    reds: ["W-BAND", "W-BAND-LOADER", "BINDING_ASSIGNMENTS@loaderNames#1", "BINDING_ASSIGNMENTS@consume#1"],
  },
  "H6-OR": { hollows: "EITHER_OPERAND without BarBarToken", edits: [{ from: '  "||": ts.SyntaxKind.BarBarToken,\n', to: "" }], reds: ["LA4c2", "W-OR", "EITHER_OPERAND@consume#1"] },
  "H7-ANDOP": { hollows: "EITHER_OPERAND without AmpersandAmpersandToken", edits: [{ from: '  "&&": ts.SyntaxKind.AmpersandAmpersandToken,\n', to: "" }], reds: ["W-ANDOP", "EITHER_OPERAND@consume#1"] },
  "H8-ELEM": {
    hollows: "calleeName without its literal-element-name branch (the launch-call reader and the loader reader)",
    edits: [{ from: "  if (ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression)) return callee.argumentExpression.text;\n", to: "" }],
    reds: ["W-ELEM", "W-ELEM-LOADER", "LOADER_CALLS@isLoaderCall#1", "LOADER_FACTORIES@isLoaderCall#1"],
  },
  "H9-FORIN": { hollows: "isWriteTarget without the ForInStatement head", edits: [{ from: "ts.isForInStatement(parent) || ts.isForOfStatement(parent)", to: "ts.isForOfStatement(parent)" }], reds: ["W-FORIN", "P-WRITTEN"] },
  "H10-CWRAP": {
    hollows: "calleeName unwraps only parentheses and instantiation expressions (no type wrapper on a launch or loader callee)",
    edits: [
      {
        from: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);",
        to: "export function calleeName(call: ts.CallExpression): string | undefined {\n  let callee = call.expression;\n  while (ts.isParenthesizedExpression(callee) || isInstantiation(callee)) callee = callee.expression;",
      },
    ],
    reds: ["W-CWRAP", "W-BAND-LOADER", "W-CWRAP-LOADER", "unwrap@calleeName#1"],
  },
  "H11-UTYPE": { hollows: "the <untraced> string read without !inType", edits: [{ from: "      !specifierSlot(node) &&\n      !inType(node)\n", to: "      !specifierSlot(node)\n" }], reds: ["W-UTYPE", "CHILD_PROCESS@childProcessLaunchesAt#1"] },
  "BF1-HOIST": {
    hollows: "declarations() declaring a function at its block and at the enclosing function's scope (sloppy-script hoisting)",
    edits: [
      {
        from: "      declare(node.name, blockScope(node));\n    } else if (ts.isFunctionExpression(node) || ts.isClassExpression(node)) {",
        to: "      declare(node.name, blockScope(node));\n      declare(node.name, functionScope(node));\n    } else if (ts.isFunctionExpression(node) || ts.isClassExpression(node)) {",
      },
    ],
    reds: ["BF1", "F-SCOPE"],
  },
  "LA-WRITE": { hollows: "isWriteTarget reading a logical assignment's target as written (cut #4's tracer)", edits: [{ from: " && !holds(LOGICAL_ASSIGNMENTS, kind);", to: ";" }], reds: ["LA4", "LA5", "unwrap@consume#1", "LOGICAL_ASSIGNMENTS@isWriteTarget#1", "LOGICAL_ASSIGNMENTS@consume#1", "F-LOGICAL", "P-VALUE"] },
  "NS-BLOCK": {
    hollows: "inMergedScope never true: names in a namespace body or an enum resolve through the per-block chain (cut #4's resolver)",
    edits: [{ from: "  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) if (ts.isModuleBlock(at) || ts.isEnumDeclaration(at)) return true;\n  return false;", to: "  return false;" }],
    reds: ["NS2", "F-SCOPE", "F-MERGED"],
  },
};

// ---- the claims ----

interface Clause {
  readonly words: string;
  readonly falsifiers: readonly string[];
}
/** The claims, reader by reader and clause by clause; each clause names the pins that falsify its words (held byte for byte to
 * the roster). */
const CLAIMS: Readonly<Record<string, readonly Clause[]>> = {
  wrappers: [
    {
      words: "WRAPPERS are parentheses, as, satisfies, <T>, ! and an instantiation expression's type arguments; every reader reads an expression through every one of them at every use site (unwrap and isWrapper), and the tracer also through await",
      falsifiers: ["unwrap@resolveTexts#1", "unwrap@resolveTexts#2", "isWrapper@elementRead#1", "unwrap@resolveArrays#1", "unwrap@calleeName#1", "unwrap@factory#1", "unwrap@loaderNames#1", "unwrap@isLoaderCall#1", "unwrap@bindTarget#1", "isWrapper@consume#1", "unwrap@consume#1", "unwrap@loaderLabel#1", "isWrapper@isWriteTarget#1"],
    },
  ],
  specifiers: [
    {
      words: "the specifier reader names every import declaration's specifier (a type-only one included), every export-from's, every import-equals of an external module's, and every loader call's first argument through resolution, <expression> when it does not resolve or is absent",
      falsifiers: ["F-ENTRIES", "F-LOADS", "F-ENTRY-EDGES", "F-PLANTED"],
    },
  ],
  loader: [
    {
      words: "the loader reader reads import(), every call whose callee is spelled with a LOADER_CALLS name (a name, a property name or a literal element name), a LOADER_FACTORIES call's result called directly, and a call of a name that a variable declaration with a plain name, or a BINDING_ASSIGNMENTS assignment to a name, binds to a LOADER_FACTORIES call",
      falsifiers: ["LOADER_CALLS@isLoaderCall#1", "LOADER_FACTORIES@factory#1", "LOADER_FACTORIES@isLoaderCall#1", "BINDING_ASSIGNMENTS@loaderNames#1", "W-BAND-LOADER", "W-ELEM-LOADER", "W-CWRAP-LOADER", "F-LOADS"],
    },
    {
      words: "each such call whose first argument does not resolve or is absent is read once, labelled as spelled: import(), <callee>(), <factory>()() for a factory result called directly",
      falsifiers: ["F-LOADS", "F-ENTRY-EDGES", "unwrap@loaderLabel#1"],
    },
  ],
  identifiers: [
    {
      words: "the I/O-global reader reads every reference to an IO_GLOBALS name, and every reference to a GLOBAL_OBJECTS name with the member read off it (.name, [text] or [<computed>])",
      falsifiers: ["IO_GLOBALS@ioGlobalReferences#1", "GLOBAL_OBJECTS@ioGlobalReferences#1", "P-VALUE"],
    },
    { words: "the process reader reads every reference to process but a PROCESS_READS member read (.env or [env])", falsifiers: ["PROCESS_READS@processReferences#1", "P-VALUE"] },
    {
      words: "a reference is an identifier outside a name slot (every predicate isNameSlot tests: a declaration's, a property's or key's, an import or export specifier's, a label's name) and outside a type (inType: a type node; a class's extends expression and an instantiation expression are values, their type arguments types)",
      falsifiers: ["P-NAME", "P-TYPE", "P-VALUE", "F-HERITAGE", "F-INSTANTIATION"],
    },
  ],
  tracer: [
    {
      words: "entries: every import whose clause is not type-only (a type-only specifier binds nothing), every import-equals that is not type-only and every export-from whose specifier names child_process (CHILD_PROCESS, through resolution), and every loader call whose specifier does",
      falsifiers: ["CHILD_PROCESS@names#1", "F-ENTRIES", "F-ENTRY-EDGES"],
    },
    { words: "it follows a held value through WRAPPERS and await", falsifiers: ["isWrapper@consume#1", "W-AS", "W-SAT", "W-TA", "W-NN", "F-INSTANTIATION"] },
    { words: "member reads by name, by a key that resolves to one text (<computed> otherwise); a default read off the module is the module itself", falsifiers: ["F-FOLLOW", "F-BINDINGS"] },
    {
      words: "declarations and BINDING_ASSIGNMENTS assignments to a name or a destructuring pattern at any depth (rest elements, defaults and holes included), the target through WRAPPERS, and the assignment's value",
      falsifiers: ["BINDING_ASSIGNMENTS@consume#1", "unwrap@bindTarget#1", "W-BAND", "F-ENTRIES", "F-BINDINGS"],
    },
    {
      words: "a LOGICAL_ASSIGNMENTS assignment whose target is a held name, through WRAPPERS, is followed through the assignment's value (the target's old value when kept); a member target is a property store",
      falsifiers: ["LOGICAL_ASSIGNMENTS@consume#1", "unwrap@consume#1", "LA4", "LA5", "F-LOGICAL", "F-BINDINGS"],
    },
    { words: "the result of an EITHER_OPERAND operator (??, ||, &&), a comma's right operand and a conditional's arms", falsifiers: ["EITHER_OPERAND@consume#1", "W-OR", "W-ANDOP", "LA4c2", "F-FOLLOW"] },
    { words: "a call of a held LAUNCH_CALLS member reads its command (resolution; <expression> when it does not resolve or is absent)", falsifiers: ["LAUNCH_CALLS@consume#1", "F-FOLLOW", "F-BINDINGS"] },
    { words: "an export of a held value (a declaration, a local export, an export assignment, an exported import-equals, an export-from of child_process) reads <re-export>", falsifiers: ["F-EXPORTS", "F-ENTRY-EDGES", "P-EXPORT"] },
    {
      words: "a value a statement, void or a comma's left operand discards reads nothing, and so does a name's old value at a write target (every predicate isWriteTarget tests: an =, compound or destructuring assignment's target, a for-in or for-of head, an increment or a decrement, each through WRAPPERS)",
      falsifiers: ["P-DISCARDED", "P-WRITTEN", "isWrapper@isWriteTarget#1", "LOGICAL_ASSIGNMENTS@isWriteTarget#1", "W-FORIN"],
    },
    {
      words: "every other use reads <reference>: a call of the module or of another member, an argument, a return, a property store, a class field, a class's extends, an element, an operator's operand, a condition, a member path deeper than PATH_DEPTH",
      falsifiers: ["F-ESCAPES", "F-HERITAGE", "F-BINDINGS", "P-VALUE"],
    },
    {
      words: "a string or template part holding child_process outside a specifier slot (an import's or export's specifier, an external module reference, an ambient module's name, a loader call's first argument) and outside a type reads <untraced>",
      falsifiers: ["CHILD_PROCESS@childProcessLaunchesAt#1", "W-UTYPE", "F-STRINGS", "F-ENTRY-EDGES", "F-HERITAGE"],
    },
    { words: "it reads in rounds, each deepening a binding by one step; a module still binding after TRACE_ROUNDS rounds reads <reference> at its start", falsifiers: ["F-BOUNDS"] },
  ],
  launches: [
    {
      words: "the launch-call reader reads every call whose callee is spelled with a LAUNCH_CALLS name (a name, a property name or a literal element name) and whose command resolves",
      falsifiers: ["LAUNCH_CALLS@launchSitesAt#1", "unwrap@calleeName#1", "W-ELEM", "W-CWRAP", "BF1", "BF1c", "NS2c"],
    },
    {
      words: "and, its command <expression>, every such call in a namespace body or an enum declaration whose command does not resolve, and every such call whose command resolves only by trusting what resolution refuses (an ambient const's initializer, an index into a const array that is not only read)",
      falsifiers: ["NS2", "F-MERGED", "F-AMBIENT", "F-ARRAYS", "F-BOUNDS"],
    },
    { words: "launchUnion reads both readers' sites, one per call and callee", falsifiers: ["F-FOLLOW", "F-ENTRIES", "F-SCRIPTS"] },
  ],
  resolution: [
    {
      words: "commands, specifiers and member keys resolve through string literals, a conditional's arms, the const binding a name resolves to in its scope, and a literal numeric index into a const array literal (no spread) whose name is only read; otherwise they do not resolve",
      falsifiers: ["F-SCOPE", "F-ARRAYS", "F-ARRAY-READS", "F-FOLLOW"],
    },
    { words: "resolution follows at most RESOLVE_DEPTH steps (a conditional's arm, a name's initializer, an indexed array and an element are each one step); past them nothing resolves", falsifiers: ["F-BOUNDS"] },
    {
      words: "the nearest scope enclosing the reference that binds the name decides (a block-scoped binding's scope: the block, module, namespace body, case block, for statement or static block holding it; a var's: the nearest function, static block, namespace body or module); a let, var, using, parameter, function, class, enum, import-equals, catch or destructured binding there does not resolve, nor does an ambient const, an ES import or a name nothing in the module binds",
      falsifiers: ["F-SCOPE", "F-VAR-SCOPES", "F-AMBIENT"],
    },
    { words: "every module is read as strict code: a function declaration binds its name in the block that holds it, never in an enclosing function's scope (tsconfig strict)", falsifiers: ["BF1", "BF1c", "F-SCOPE"] },
    { words: "no name resolves in a namespace body or an enum declaration: TypeScript merges their declarations, and the resolver models neither merge", falsifiers: ["NS2", "NS2c", "F-MERGED"] },
    {
      words: "a const array's name is only read when no declaration of the name is exported or locally exported and every reference to it is an element read, through WRAPPERS, that no assignment (LOGICAL_ASSIGNMENTS included), delete, call or tagged template reaches",
      falsifiers: ["F-ARRAYS", "F-ARRAY-READS", "isWrapper@elementRead#1", "LOGICAL_ASSIGNMENTS@elementRead#1"],
    },
  ],
  scripts: [{ words: "a module is parsed by its extension in any letter case: .tsx as TSX, .jsx as JSX, .js, .mjs and .cjs as JavaScript, every other as TypeScript", falsifiers: ["F-SCRIPTS"] }],
  residuals: [{ words: "R-STATIC-FORMS: every form the readers do not parse reads as its quiet row pins", falsifiers: ["Q-STATIC-FORMS"] }],
};

// ---- the rows ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "D", label: "the description's LA and NS members", pins: ["LA4", "LA5", "LA4c2", "NS2", "NS2c"] },
  {
    id: "U",
    label: "wb-pyel.5 refusal #5's U1 witnesses and U2 plant",
    pins: ["W-AS", "W-SAT", "W-TA", "W-NN", "W-BAND", "W-OR", "W-ANDOP", "W-ELEM", "W-FORIN", "W-CWRAP", "W-UTYPE", "W-BAND-LOADER", "W-ELEM-LOADER", "W-CWRAP-LOADER", "BF1", "BF1c"],
  },
  { id: "S", label: "every reader vocabulary at every use site", pins: Object.keys(SITE_FORMS) },
  { id: "F", label: "the form roster", pins: [...Object.keys(FAMILIES), PLANTED_PIN, SCRIPTS_PIN] },
  { id: "P", label: "the position roster", pins: Object.keys(KIND_PINS) },
  { id: "Q", label: "the residuals' quiet rows", pins: ["Q-STATIC-FORMS"] },
];

// ---- the roster ----

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly claims: Json;
  readonly kills: Json;
  readonly constants: Json;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}
function isObject(value: unknown): value is { [key: string]: unknown } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** A value as JSON (a round trip: what the roster file holds for it). */
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value));
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.claims) || !isObject(raw.kills) || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with claims, kills, constants and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { claims: json(raw.claims), kills: json(raw.kills), constants: json(raw.constants), tests: strings(raw.tests, "roster tests"), rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the tracker export ----

/** A bead's row in the tracker export: its description and notes. */
function exportRow(id: string): { description: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return { description: typeof row.description === "string" ? row.description : "", notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`the tracker export holds no row ${id}`);
}
/** The first line of a text that starts with a prefix ("" when none does). */
function firstLine(text: string, prefix: string): string {
  return text.split("\n").find(line => line.startsWith(prefix)) ?? "";
}
/** The first paragraph of a text whose first line starts with a prefix: that line and every line after it up to a blank one
 * ("" when no line starts with the prefix). */
function firstBlock(text: string, prefix: string): string {
  const lines = text.split("\n");
  const start = lines.findIndex(line => line.startsWith(prefix));
  if (start < 0) return "";
  const end = lines.findIndex((line, index) => index > start && line.trim() === "");
  return lines.slice(start, end < 0 ? undefined : end).join("\n");
}
/** The distinct matches of a pattern in a line, in first-match order. */
function idsIn(line: string, pattern: RegExp): string[] {
  return [...new Set(line.match(pattern) ?? [])];
}

// ---- the helper's source: its use sites, predicates and script patterns ----

const HELPER_TEXT = readFileSync(HELPER_PATH, "utf8");
const HELPER_SOURCE = ts.createSourceFile(HELPER_PATH, HELPER_TEXT, ts.ScriptTarget.Latest, true);
function walk(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, child => walk(child, each));
}
/** The name of the nearest function declaration, or of the const an arrow or function expression initializes, holding a node. */
function enclosingName(node: ts.Node): string {
  for (let at = node.parent; !ts.isSourceFile(at); at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
  }
  return "<module>";
}
/** Every use site of a SITE_VOCABULARIES name in the helper (vocabulary@function#n, in source order), the WRAPPERS plumbing
 * itself excluded. */
function helperSites(): string[] {
  const sites: string[] = [];
  const seen = new Map<string, number>();
  walk(HELPER_SOURCE, node => {
    if (!ts.isIdentifier(node) || !(SITE_VOCABULARIES as readonly string[]).includes(node.text)) return;
    const parent = node.parent;
    if ((ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent)) && parent.name === node) return;
    const owner = enclosingName(node);
    if (WRAPPER_PLUMBING.includes(owner)) return;
    const key = `${node.text}@${owner}`;
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    sites.push(`${key}#${count}`);
  });
  return sites;
}
/** The function declaration of the helper with a name. */
function helperFunction(name: string): ts.FunctionDeclaration {
  const found = HELPER_SOURCE.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === name);
  if (found === undefined) throw new Error(`the helper declares no function ${name}`);
  return found;
}
/** Every ts.is* predicate a helper function calls, in first-call order. */
function predicatesOf(name: string): string[] {
  const found: string[] = [];
  walk(helperFunction(name), node => {
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "ts") {
      const predicate = node.expression.name.text;
      if (predicate.startsWith("is") && !found.includes(predicate)) found.push(predicate);
    }
  });
  return found;
}
/** The regular expressions scriptKind tests a path with. */
function scriptPatterns(): RegExp[] {
  const found: RegExp[] = [];
  walk(helperFunction("scriptKind"), node => {
    if (ts.isRegularExpressionLiteral(node)) {
      const literal = node.text;
      const end = literal.lastIndexOf("/");
      found.push(new RegExp(literal.slice(1, end), literal.slice(end + 1)));
    }
  });
  return found;
}
/** The binary operator kinds and the node kinds a module text holds. */
function syntaxOf(text: string): { operators: Set<ts.SyntaxKind>; nodes: ts.Node[] } {
  const source = ts.createSourceFile("probe.ts", text, ts.ScriptTarget.Latest, true);
  const operators = new Set<ts.SyntaxKind>();
  const nodes: ts.Node[] = [];
  walk(source, node => {
    nodes.push(node);
    if (ts.isBinaryExpression(node)) operators.add(node.operatorToken.kind);
  });
  return { operators, nodes };
}
/** The entries of a site's vocabulary its module must spell, and whether it does (each entry checked by name). */
function siteEntries(site: string): { entries: string[]; spelled: string[] } {
  const vocabulary = site.slice(0, site.indexOf("@"));
  const text = SITE_FORMS[site] ?? "";
  const { operators, nodes } = syntaxOf(text);
  const words = new Set(text.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) ?? []);
  const lists: Readonly<Record<string, readonly string[]>> = { LAUNCH_CALLS, LOADER_CALLS, LOADER_FACTORIES, IO_GLOBALS, GLOBAL_OBJECTS, PROCESS_READS };
  const operatorSets: Readonly<Record<string, Readonly<Record<string, ts.SyntaxKind>>>> = { BINDING_ASSIGNMENTS, LOGICAL_ASSIGNMENTS, EITHER_OPERAND };
  if (vocabulary === "unwrap" || vocabulary === "isWrapper") {
    const kinds = [...Object.keys(WRAPPERS), ...(site === "isWrapper@consume#1" ? ["await"] : [])];
    return { entries: kinds, spelled: kinds.filter(kind => nodes.some(node => (kind === "await" ? ts.isAwaitExpression(node) : (WRAPPERS[kind]?.(node) ?? false)))) };
  }
  if (vocabulary === "CHILD_PROCESS") return { entries: [CHILD_PROCESS], spelled: text.includes(CHILD_PROCESS) ? [CHILD_PROCESS] : [] };
  const list = lists[vocabulary];
  if (list !== undefined) return { entries: [...list], spelled: list.filter(entry => words.has(entry)) };
  const operatorSet = operatorSets[vocabulary] ?? {};
  return { entries: Object.keys(operatorSet), spelled: Object.entries(operatorSet).filter(([, kind]) => operators.has(kind)).map(([spelling]) => spelling) };
}

// ---- the witnesses ----

/** A readers module: the helper, or a hollowed copy of it. */
interface Readers {
  readonly moduleReading: (module: string, source: ts.SourceFile) => string[];
  readonly heldReading: (position: string, probe: string) => string[];
  readonly parseSource: (path: string, text: string) => ts.SourceFile;
}
const READERS: Readers = { moduleReading, heldReading, parseSource };
function isReaders(value: unknown): value is Readers {
  return isObject(value) && typeof value.moduleReading === "function" && typeof value.heldReading === "function" && typeof value.parseSource === "function";
}
const FORMS: Readonly<Record<string, string>> = { ...CARRIED_FORMS, ...EXTRA_FORMS };
function readModule(readers: Readers, path: string, text: string): string[] {
  return readers.moduleReading(path, readers.parseSource(path, text));
}
function readTable(readers: Readers, folder: string, table: Readonly<Record<string, string>>, ids: readonly string[]): Json {
  return Object.fromEntries(ids.map(id => [id, readModule(readers, `${folder}/${id}.ts`, table[id] ?? "")]));
}
/** A pin's witness: every reader's reading of the modules the pin holds (row P: every position of its kind; row Q: every probe). */
function witnessOf(pin: string, readers: Readers): Json {
  const member = MEMBER_FORMS[pin];
  if (member !== undefined) return readModule(readers, `members/${pin}.ts`, member);
  const site = SITE_FORMS[pin];
  if (site !== undefined) return readModule(readers, `sites/${pin}.ts`, site);
  const family = FAMILIES[pin];
  if (family !== undefined) return readTable(readers, "forms", FORMS, family);
  if (pin === PLANTED_PIN) return readModule(readers, "planted/reach.ts", PLANTED_REACH);
  if (pin === SCRIPTS_PIN) return Object.fromEntries(Object.entries(SCRIPT_FORMS).map(([path, text]) => [path, readModule(readers, `scripts/${path}`, text)]));
  const kind = KIND_PINS[pin];
  if (kind !== undefined) return Object.fromEntries(Object.entries(POSITIONS).filter(([, entry]) => entry.kind === kind).map(([position, entry]) => [position, readers.heldReading(position, entry.probe)]));
  if (pin === "Q-STATIC-FORMS") return readTable(readers, "residue", STATIC_RESIDUE, Object.keys(STATIC_RESIDUE));
  throw new Error(`no witness for ${pin}`);
}
/** Whether a position's readings are what its kind says: a value, discarded or written position is read once by each identifier
 * reader (the tracer reads it only as a value or an export); a name or type position is read by none. */
function positionAsKind(kind: PositionKind, reading: readonly string[]): boolean {
  const count = (reader: string): number => reading.filter(line => line.startsWith(`${reader} `)).length;
  const identifier = kind === "value" || kind === "discarded" || kind === "written" ? 1 : 0;
  const traced = kind === "value" || kind === "export";
  return count("io") === identifier && count("global") === identifier && count("process") === identifier && count("tracer") > 0 === traced;
}

// ---- the hollowed readers ----

const TYPESCRIPT_URL = pathToFileURL(createRequire(import.meta.url).resolve("typescript")).href;
function occurrences(text: string, part: string): number {
  return text.split(part).length - 1;
}
/** The helper with one kill's edits applied, transpiled into a scratch directory and loaded. */
async function hollowed(dir: string, name: string, kill: Kill): Promise<Readers> {
  let text = HELPER_TEXT;
  for (const edit of kill.edits) text = text.replace(edit.from, () => edit.to);
  const js = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText.replaceAll('from "typescript"', `from ${JSON.stringify(TYPESCRIPT_URL)}`);
  const file = join(dir, `${name}.mjs`);
  writeFileSync(file, js);
  const loaded: unknown = await import(pathToFileURL(file).href);
  if (!isReaders(loaded)) throw new Error(`${name}: the hollowed helper exports no readers`);
  return loaded;
}

/** Every constant the judged set holds to the roster (the tables, the anchors and the helper's vocabulary). */
function judgedConstants(): Json {
  return json({
    carriedForms: CARRIED_FORMS,
    memberForms: MEMBER_FORMS,
    siteForms: SITE_FORMS,
    extraForms: EXTRA_FORMS,
    scriptForms: SCRIPT_FORMS,
    plantedReach: PLANTED_REACH,
    positions: POSITIONS,
    staticResidue: STATIC_RESIDUE,
    families: FAMILIES,
    residuals: RESIDUALS,
    kindPins: KIND_PINS,
    predicatePositions: PREDICATE_POSITIONS,
    siteVocabularies: SITE_VOCABULARIES,
    anchors: ANCHORS,
    carriedCounts: CARRIED_COUNTS,
    vocabulary: {
      launchCalls: LAUNCH_CALLS,
      loaderCalls: LOADER_CALLS,
      loaderFactories: LOADER_FACTORIES,
      bindingAssignments: Object.keys(BINDING_ASSIGNMENTS),
      logicalAssignments: Object.keys(LOGICAL_ASSIGNMENTS),
      eitherOperand: Object.keys(EITHER_OPERAND),
      wrappers: Object.keys(WRAPPERS),
      childProcess: CHILD_PROCESS,
      ioGlobals: IO_GLOBALS,
      globalObjects: GLOBAL_OBJECTS,
      processReads: PROCESS_READS,
      heldAs: HELD_AS,
      heldImport: HELD_IMPORT,
      pathDepth: PATH_DEPTH,
      traceRounds: TRACE_ROUNDS,
      resolveDepth: RESOLVE_DEPTH,
    },
  });
}
/** The titles of the cases around the pins: the judged set first, the kills and the registration last. */
const TITLES = {
  judged: "the judged set: the frozen shape, the claims, the kills, the out-of-file roster, the tracker export and the helper's own source agree",
  kills: "each named hollowing, applied to the helper's own bytes, reds exactly the pins it names (the unmodified readers read the cure)",
  registration: "the registered tests and the reached pins equal the roster, in order and both ways",
} as const;

const REACHED: string[] = [];

describe("wb-pyel.9 EDC static-reach readers census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R3, the full-surface readers of wb-pyel.5's A5)", () => {
  it(TITLES.judged, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["D:5", "U:16", "S:29", "F:20", "P:6", "Q:1"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    const pins = ROWS.flatMap(row => row.pins);
    expect(pins.filter((pin, index) => pins.indexOf(pin) !== index), "no pin is held twice").toEqual([]);
    expect(json(CLAIMS), "the claims, byte for byte, are the roster's").toStrictEqual(ROSTER.claims);
    const named = Object.values(CLAIMS).flatMap(clauses => clauses.flatMap(clause => clause.falsifiers));
    expect(named.filter(falsifier => !pins.includes(falsifier)), "every falsifier a clause names is a pin").toEqual([]);
    expect(pins.filter(pin => !named.includes(pin)), "every pin is named by a clause of the claims").toEqual([]);
    expect(json(KILLS), "the kills are the roster's").toStrictEqual(ROSTER.kills);
    for (const [name, kill] of Object.entries(KILLS)) {
      for (const edit of kill.edits) expect(occurrences(HELPER_TEXT, edit.from), `${name}: its edit's text occurs once in the helper`).toBe(1);
      expect(kill.reds.filter(pin => !pins.includes(pin)), `${name} reds pins`).toEqual([]);
      expect(kill.reds.length, `${name} reds at least one pin`).toBeGreaterThan(0);
    }
    expect(judgedConstants(), "the constants are the roster's").toStrictEqual(ROSTER.constants);
    for (const [family, quiet] of Object.entries(RESIDUALS)) for (const pin of quiet) expect(ROWS.find(row => row.id === "Q")?.pins, `${family}'s ${pin} is a quiet-row pin`).toContain(pin);
    const forms = [...Object.keys(CARRIED_FORMS), ...Object.keys(EXTRA_FORMS)];
    const placed = Object.values(FAMILIES).flat();
    expect([...placed].sort(), "every form is in exactly one family").toEqual([...forms].sort());

    // the outside anchors: the tracker export
    const own = exportRow(BEAD);
    const parent = exportRow(PARENT);
    const laItem = firstLine(own.description, ANCHORS.laItem);
    const nsItem = firstLine(own.description, ANCHORS.nsItem);
    expect([laItem, nsItem, firstLine(own.description, ANCHORS.acceptance)].map(line => line.length > 0), "the description's LA, NS and Acceptance lines were read").toEqual([true, true, true]);
    expect(ROWS.find(row => row.id === "D")?.pins, "row D holds exactly the members the LA and NS items name").toEqual([...idsIn(laItem, /\bLA\d+(?:c\d+)?\b/g), ...idsIn(nsItem, /\bNS\d+c?\b/g)]);
    const ruling = firstLine(parent.notes, ANCHORS.ruling);
    for (const member of ["LA4", "LA5", "NS2"]) expect(ruling, `${PARENT}'s R-B123 line names ${member}, moved here`).toContain(member);
    const form = firstLine(parent.notes, ANCHORS.form);
    expect(Number(/reachForms \d+ -> (\d+)/.exec(form)?.[1]), "cut #5's FORM line counts the carried forms").toBe(CARRIED_COUNTS.reachForms);
    expect(Number(/referencePositions \d+ -> (\d+)/.exec(form)?.[1]), "cut #5's FORM line counts the carried positions").toBe(CARRIED_COUNTS.referencePositions);
    expect(Object.keys(CARRIED_FORMS).length, "every carried form is held").toBe(CARRIED_COUNTS.reachForms);
    expect(Object.keys(POSITIONS).slice(0, CARRIED_COUNTS.referencePositions).length, "every carried position is held").toBe(CARRIED_COUNTS.referencePositions);
    expect(parent.notes.includes(ANCHORS.residual) && Object.hasOwn(RESIDUALS, "R-STATIC-FORMS"), `${PARENT}'s notes name R-STATIC-FORMS and it is a residual here`).toBe(true);
    // refusal #5's unmet items (each a paragraph), from the export hop that carries them (the tracker holds them at cut time)
    const u1 = firstBlock(parent.notes, ANCHORS.u1);
    const u2 = firstBlock(parent.notes, ANCHORS.u2);
    const uPins = ROWS.find(row => row.id === "U")?.pins ?? [];
    if (u1 !== "") {
      expect(Object.keys(KILLS).filter(name => /^H\d+-/.test(name)), "KILLS holds exactly the hollowings refusal #5's U1 item names").toEqual(idsIn(u1, /\bH\d+-[A-Z]+\b/g));
      expect(uPins.filter(pin => /^W-[A-Z]+$/.test(pin)), "row U holds every witness refusal #5's U1 item spells").toEqual(idsIn(u1, /\bW-[A-Z]+\b/g));
    }
    if (u2 !== "") expect(uPins.filter(pin => /^BF\d/.test(pin)), "row U holds the plant and control refusal #5's U2 item names").toEqual(idsIn(u2, /\bBF\d+c?\b/g));

    // the outside anchors: the helper's own source
    expect(Object.keys(SITE_FORMS).sort(), "row S holds exactly the helper's vocabulary use sites").toEqual(helperSites().sort());
    for (const site of Object.keys(SITE_FORMS)) {
      const { entries, spelled } = siteEntries(site);
      expect(spelled, `${site}'s module spells every entry of its vocabulary`).toEqual(entries);
    }
    for (const [name, mapped] of Object.entries(PREDICATE_POSITIONS)) {
      expect(Object.keys(mapped), `every predicate ${name} tests answers for pinned positions`).toEqual(predicatesOf(name));
      for (const [predicate, positions] of Object.entries(mapped)) for (const position of positions) expect(Object.keys(POSITIONS), `${name}'s ${predicate} position ${position} is held`).toContain(position);
    }
    const patterns = scriptPatterns();
    expect(patterns.length, "scriptKind tests a path with its patterns").toBeGreaterThan(0);
    for (const pattern of patterns) {
      const paths = Object.keys(SCRIPT_FORMS).filter(path => pattern.test(path));
      expect([paths.some(path => path === path.toLowerCase()), paths.some(path => path === path.toUpperCase())], `${pattern} has a script form in either letter case`).toEqual([true, true]);
    }
    expect(Object.keys(SCRIPT_FORMS).filter(path => !patterns.some(pattern => pattern.test(path))), "every script form is a scriptKind pattern's").toEqual([]);
    // the strict-code premise of the block-function scope
    const tsconfig: unknown = JSON.parse(readFileSync(TSCONFIG_PATH, "utf8"));
    const options = isObject(tsconfig) && isObject(tsconfig.compilerOptions) ? tsconfig.compilerOptions : {};
    expect([options.strict, typeof options.module === "string" && /^es(20\d\d|next)$/i.test(options.module)], "tsconfig compiles strict ES modules").toEqual([true, true]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, () => {
          const witness = witnessOf(pin, READERS);
          const kind = KIND_PINS[pin];
          if (kind !== undefined && isObject(witness)) {
            const off = Object.entries(witness).filter(([, reading]) => !positionAsKind(kind, Array.isArray(reading) ? reading.map(String) : []));
            expect(off.map(([position]) => position), `every ${kind} position reads as its kind says`).toEqual([]);
          }
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it(TITLES.kills, { timeout: 300_000 }, async () => {
    const dir = makeScratch("edc-static-reach-kills-");
    try {
      const pins = ROWS.flatMap(row => row.pins);
      for (const [name, kill] of Object.entries(KILLS)) {
        const readers = await hollowed(dir, name, kill);
        const reds = pins.filter(pin => JSON.stringify(witnessOf(pin, readers)) !== JSON.stringify(rosterWitness(pin)));
        expect(reds, `${name} (${kill.hollows}) reds exactly its pins`).toEqual([...kill.reds]);
      }
    } finally {
      removeScratch(dir);
    }
  });

  it(TITLES.registration, { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walkTasks = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walkTasks(child.tasks);
      }
    };
    walkTasks(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const reading = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(reading),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
