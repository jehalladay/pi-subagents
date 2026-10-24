/**
 * wb-tz4r.5 (RI-UNIFIED-DECISION-INFERENCE-R5), a census with an until-then leg. Statement (bead title): "If Pi ever hosts
 * ReactiveInference decision inference over read-only observations (gated: RI read-only observation port + ReactiveAgentsSDK effect
 * integration, RI-DEC-04/RI-DEC-10; unshipped at 485f3615db1e), Pi as host shall explicitly authorize every effect and observation
 * source and shall hand the inference no embedded agent orchestrator and no unrestricted tools; pin docs/programs/
 * unified-decision-inference-2026-10-21/01-contracts.md:20@485f3615db1e". Acceptance, quoted (the three spellings written as the
 * placeholders defined below): "(a) today: no Pi path passes tool handles, an orchestrator or observation sources into any
 * inference call reachable from rf ('<RF-INF>|<INF-RUN>|<INF.RUN>' over src/test/qa/docs/workbench = 0 at this read); (b) adoption:
 * every observation source and effect reaching the decision inference is enumerated in a Pi-owned authorization record before the
 * call, an unlisted source is refused with a typed reason; (c) mutant: wiring an unrestricted tool or an agent loop into the
 * observation port fails."
 *
 * THE THREE SPELLINGS. (a)'s grep is three alternatives: <RF-INF> is the word rf, one space and the word naming rf's inference
 * group; <INF-RUN> is that group word, one space and the verb naming the group's one leaf; <INF.RUN> is the group word, any one
 * character (the alternative's dot is the extended-regex dot) and the verb, so its plain-dot form is the leaf path rf's own leaf
 * catalog lists. This file and its roster never spell one: WORD holds the words, SPELLINGS composes each alternative at runtime,
 * every label, quote and witness writes the placeholder, and the controls build their texts the same way, so row A's whole-tree
 * scan holds over these two files with no path excluded (the wb-a9l2.3 discipline). The roster pins the sha256 of each
 * alternative's own text, so the word lists cannot drift from the bead's grep. THE READING: case-sensitive like the grep, and
 * word-bounded at both ends, so prose in which the verb only begins a longer word (RI's own name for its provider-neutral runner,
 * which a queued sibling roster quotes from 01-contracts.md:14) is no site; the raw grep reads that prose too, and A6 pins the
 * difference as its runnerProse quiet control.
 *
 * MEASURED AT THE PINS (read-only git show in the producer's checkout by the cutting seat, 2026-10-23). ReactiveInferenceSDK at
 * 485f3615db1e: 01-contracts.md:20 ("Read-only observation is a strictly bounded injected port; no embedded agent orchestrator, no
 * unrestricted tools. ReactiveAgentsSDK or host authorizes effects and observation sources. ... Inference never executes UI
 * actions."); 02-implementation.md:9 (RI-DEC-04, its lattice naming "tools/read-only observations"), :21 (RI-DEC-10 "ReactiveAgentsSDK
 * effect integration") and :23 ("RI-DEC-02/04/05 initial restricted seed only"); 03-conformance.md:14 (prompt/template injection
 * scope for declared read-only observations, a later matrix); the typed decision package's preflight.py:1-3 ("Pure
 * capability-aware preflight: no runner, clock, network, filesystem, or hidden routing." / "This initial slice does not invoke
 * models.") and its contracts.py:55-56 ("Full observations, other output shapes, and typed effect policies are later slices. This
 * record deliberately does not imply that a backend exists."). No observation-port, tool-handle or effect-policy type in that
 * package (its name is a sibling census's guarded spelling, wb-tz4r.1, so it is not written here). Re-probed at RI origin/master
 * 075ac589d64d (10 commits past the pin): the same sentence at contracts.py:63 and still no such type, so the gate is closed.
 * ReactiveAgentsSDK: no checkout on the cutting host, NOT probed.
 *
 * MEASURED AT THE INSTALLED rf (0.1.836, commit b3494ab13397, `rf --json --version`, 2026-10-23): 79 leaves; the inference group
 * has one leaf (served_reachable, store_required, attach_required) and no decision leaf exists. Its help: "Send a recorded render
 * to a model.", a --tools PATH option offering the model the tool schemas in a file, and "mutates authoritative state: yes". That
 * leaf is the one inference call reachable from rf; it is the generative path (the decision surface is RI's, unshipped).
 *
 * MEASURED AT Pi. (a)'s grep read 0 at the filing (trunk 1443ffb, the last trunk commit before the 2026-10-22T06:18Z filing, and
 * f331270) and reads 3 at the cut base c6369e0: each one a JSON string in a captured rf leaf catalog (test/fixtures/
 * rf-version-leaves.json from wb-o4h0.3, rf-session-lifecycle-roster.json from wb-hs2j.3, rf-render-id-authority-roster.json from
 * wb-hs2j.4), data copied from `rf --json --version`, never a Pi path. So the census reads (a) as: zero sites in src, qa and
 * docs/workbench, and in test only leaf-catalog data (the class rule A3 holds, the three named catalogs a floor, a new catalog
 * allowed: a queued sibling roster adds a fourth). Pi's one rf seam is the reactivefiber.render.preview provider
 * (providers/reactivefiber.ts): one spawn of rf with `--workspace <root> context render <selector> --no-commit --no-input --json`,
 * an allowlist-only child environment (process-env.ts RF_CHILD_ENV_ALLOWLIST) and an ignored stdin. Its observation port, in the
 * bead's word, is those three channels plus the static wiring of the launch.
 *  A, acceptance (a). A1 src, A2 qa and docs/workbench: every regular file read as UTF-8, zero sites, floors, and a precision
 *    anchor (the group word alone occurs in src and is no site); A3 test: every site a leaf-catalog entry (a whole JSON string equal
 *    to the plain-dot leaf path, inside a list of leaf paths or leaf rows that also lists context.render, the file's site count equal
 *    to its catalog entries), the three named catalogs among them, and this file and its roster walked with zero sites and all three
 *    placeholders; A4 the launch: the landed AST walk (scanRfLaunches) and this file's own walk agree that src holds exactly one rf
 *    launch, in the provider, and the real native reader under a stand-in rf spawns once per invocation for both input arms with
 *    the context render group and --no-commit, read by violationsOf as clean (static wiring included); A5 the registry: of every
 *    descriptor the native and the injected registration register, the rf ones are the preview alone, none spells a site or names
 *    the group word in its id, and the reconcile evidence reads stay the preview; A6 the matcher's flagged and quiet controls and the
 *    residuals' pinned quiet rows.
 *  B, acceptance (b), the until-then posture on the one real seam (the decision call is unshipped; nothing here simulates it). B1
 *    the Pi-owned record: the preview descriptor (read effect class, the one permission, invoke mode, the carrier contract source)
 *    and its two closed input arms, whose keys map onto exactly the enumerated argv flags of the real spawns; B2 unlisted refused
 *    with a typed reason before any spawn: an unregistered capability id composed from the group words (unavailable), the preview
 *    without its grant (authorization), and a tools, a sources or an agent key in the input (validation), beside the listed call
 *    (one spawn); B3 enumerated at the child: with an unlisted variable and RF_WORKSPACE planted in the parent environment the child
 *    sees only allowlisted names, no RF_ name, the workspace from argv alone, and a null-device stdin.
 *  C, acceptance (c). violationsOf, the checker A4 holds clean, run on mutants of the real launch record: C1 an unrestricted tool
 *    wired (a --tools flag on the real argv, the reachable inference call's own argv shape, a tools variable in the child
 *    environment, a piped stdin); C2 an agent loop wired (a second spawn fed the first one's output, the real launch statement
 *    wrapped in a loop by AST surgery on the provider's own text, a static import of the agent runner, a dynamic import of the agent
 *    manager, a second launching module); C3 the checker's quiet controls.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the spellings and their digests, the roots, the named catalogs, the enumerated flags, the
 * orchestration roots and the registered tests - is held to the out-of-file roster test/fixtures/ri-observation-authority-roster.json;
 * the last case walks this file's vitest task tree against the roster.
 * THE GATE-OPENING SIGNAL: when Pi adds any call into rf's inference group - a spelling in a walked file (A1-A3), a second launch,
 * an argv off the context render group, a tools flag or variable, a piped stdin, a looped launch or an orchestrator import (A4,
 * with B1/B3 where the record or the child channels move), a registered capability reaching the group (A5, B2) - row A reds (the
 * seat's planted product violations read each of those reds on the real modules), which is the cue to land the record (b) owes
 * for that call - every observation source and effect enumerated before it, an unlisted one refused with a typed reason - and to
 * re-cut this census to it. When RI ships the observation port (RI-DEC-04) and the effect integration (RI-DEC-10), the re-cut
 * re-measures the producer.
 * RESIDUALS (named, each with a pinned quiet row in A6): R-OTHER-CASE a spelling in another case is none of the three (the grep is
 * case-sensitive); R-SEPARATOR-RUN two or more characters between the words; R-COMPOSED a spelling assembled at runtime from
 * parts, this file's own mechanism, is invisible to any text scan; R-INTERRUPTED a zero-width code point inside a word;
 * R-ARGV-SPLIT the group and its verb as separate argv strings are no text site (Pi's one launch is read at runtime by A4 instead);
 * R-VARIABLE-BINARY a launch whose binary is a variable is invisible to both launch walks; R-CALLER-LOOP a loop in a caller of the
 * launching function is not the launch's own ancestor, so the loop check reads it clean.
 * SCOPE: the producer facts are read at their pins and Pi vendors no RI source, so a producer change is seen only when a re-probe
 * re-reads them; the static wiring is read over src/**.ts only (a launch from a test or qa script is a text site or none at all).
 * The stand-in rf runs under the node its PATH resolves, which may be a wrapper script adding names of its own (a library path, a
 * shell's working-directory and level names): one control spawn handed PATH alone measures them, and a name the child holds with
 * the control's own value is read as the interpreter's, so no host-specific name enters a witness.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { RF_CHILD_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { sourceStructure } from "./helpers/census.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { scanRfLaunches } from "./helpers/rf-workspace-family.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
type Separator = "space" | "any";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = relative(REPO, fileURLToPath(import.meta.url));
const ROSTER_FILE = relative(REPO, join(HERE, "fixtures", "ri-observation-authority-roster.json"));
const BEAD = "wb-tz4r.5";
const RI_PIN = "485f3615db1e";
const RI_PROBE = "075ac589d64d";
const RF_VERSION = "0.1.836";
const RF_COMMIT = "b3494ab13397";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS: readonly string[] = ["reactivefiber:render"];
/** The workspace root handed to the provider at registration; the stand-in rf never reads it. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const SCAN_ROOTS: readonly string[] = ["src", "test", "qa", "docs/workbench"];
/** The leaf catalogs measured at the cut base: rf's own leaf list as captured by `rf --json --version`, copied into fixtures. */
const KNOWN_CATALOGS: readonly string[] = [
  "test/fixtures/rf-render-id-authority-roster.json",
  "test/fixtures/rf-session-lifecycle-roster.json",
  "test/fixtures/rf-version-leaves.json",
];
/** Every flag the preview's real argv carries for its two input arms: the enumeration B1 maps the record onto. */
const ENUMERATED_FLAGS: readonly string[] = ["--json", "--model", "--no-commit", "--no-input", "--task", "--task-id", "--view", "--workspace"];
/** rf flags that take a value, so the argv reader never mistakes a value for a group word. */
const RF_VALUE_FLAGS: ReadonlySet<string> = new Set(["--workspace", "--model", "--task", "--view", "--task-id", "--tools", "--render", "--plane", "--region", "--actor", "--color"]);
interface OrchestrationRoot {
  readonly module: string;
  readonly declares: string;
}
/** Pi's embedded agent orchestrator: the module that spawns agents and the one that runs them, each known by its declaration. */
const ORCHESTRATION: readonly OrchestrationRoot[] = [
  { module: "src/agent-manager.ts", declares: "AgentManager" },
  { module: "src/agent-runner.ts", declares: "runAgent" },
];

/** The words the three spellings compose from. */
const WORD = { rf: "rf", group: "inference", verb: "run", context: "context", render: "render" } as const;
interface Spelling {
  readonly placeholder: string;
  readonly words: readonly [string, string];
  readonly separator: Separator;
}
/** (a)'s three alternatives, labelled by placeholder so no witness ever spells one. */
const SPELLINGS: readonly Spelling[] = [
  { placeholder: "<RF-INF>", words: [WORD.rf, WORD.group], separator: "space" },
  { placeholder: "<INF-RUN>", words: [WORD.group, WORD.verb], separator: "space" },
  { placeholder: "<INF.RUN>", words: [WORD.group, WORD.verb], separator: "any" },
];
const PLACEHOLDERS: readonly string[] = SPELLINGS.map(spelling => spelling.placeholder);
/** The alternative's own text in the bead's grep: the dot written as the dot it is. */
function acceptanceText(spelling: Spelling): string {
  return spelling.words.join(spelling.separator === "space" ? " " : ".");
}
/** The census's reading of one alternative: case-sensitive, word-bounded at both ends, the dot any one character but a line break. */
function patternOf(spelling: Spelling): RegExp {
  return new RegExp(`\\b${spelling.words[0]}${spelling.separator === "space" ? " " : "."}${spelling.words[1]}\\b`, "g");
}
/** The plain-dot leaf path rf's catalog lists, and the catalog's own anchor leaf. */
const LEAF = `${WORD.group}.${WORD.verb}`;
const RENDER_LEAF = `${WORD.context}.${WORD.render}`;
const RENDER_GROUP: readonly string[] = [WORD.context, WORD.render];

interface Site {
  readonly index: number;
  readonly placeholder: string;
}
/** Every site a text holds, one per start position, labelled by the first alternative that reads it there. */
function sitesIn(text: string): Site[] {
  const found = new Map<number, string>();
  for (const spelling of SPELLINGS) {
    for (const match of text.matchAll(patternOf(spelling))) {
      const index = match.index ?? -1;
      if (!found.has(index)) found.set(index, spelling.placeholder);
    }
  }
  return [...found.entries()].sort(([left], [right]) => left - right).map(([index, placeholder]) => ({ index, placeholder }));
}
function labelled(name: string, text: string): string[] {
  return sitesIn(text).map(site => `${name}:${text.slice(0, site.index).split("\n").length} ${site.placeholder}`);
}
function siteCount(text: string): number {
  return sitesIn(text).length;
}
function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}

/** Every regular file below a root, sorted (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
interface RootScan {
  readonly files: readonly string[];
  readonly texts: ReadonlyMap<string, string>;
}
const scans = new Map<string, RootScan>();
/** One root read once: every file's text (strictly: an unreadable file fails the case). */
function scanOf(root: string): RootScan {
  const cached = scans.get(root);
  if (cached !== undefined) return cached;
  const files = filesBelow(join(REPO, root)).map(file => relative(REPO, file));
  const scan = { files, texts: new Map(files.map(file => [file, readFileSync(join(REPO, file), "utf8")])) };
  scans.set(root, scan);
  return scan;
}
function textOf(scan: RootScan, file: string): string {
  const text = scan.texts.get(file);
  if (text === undefined) throw new Error(`${file} was not walked`);
  return text;
}
function rootSites(root: string): string[] {
  const scan = scanOf(root);
  return scan.files.flatMap(file => labelled(file, textOf(scan, file)));
}

/** The leaf-path entries a JSON value holds inside an rf leaf catalog: a string list that also lists context.render, or the path of
 * a row in a list of rows whose paths include context.render. */
function catalogEntries(value: unknown): number {
  if (Array.isArray(value)) {
    const own = value.includes(RENDER_LEAF) ? value.filter(item => item === LEAF).length : 0;
    const paths = value.filter(isObject).map(row => row.path);
    const rows = paths.includes(RENDER_LEAF) ? paths.filter(path => path === LEAF).length : 0;
    return own + rows + value.reduce((total: number, item: unknown) => total + catalogEntries(item), 0);
  }
  if (isObject(value)) return Object.values(value).reduce((total: number, item: unknown) => total + catalogEntries(item), 0);
  return 0;
}
/** True when every site of a text is a leaf-catalog entry: a fixture JSON whose sites are whole plain-dot leaf strings, as many as its
 * catalog entries. */
function isCatalog(file: string, text: string): boolean {
  const sites = sitesIn(text);
  if (!file.startsWith("test/fixtures/") || !file.endsWith(".json") || sites.length === 0) return false;
  const whole = sites.every(site => text.charAt(site.index - 1) === '"' && text.startsWith(`${LEAF}"`, site.index));
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return false;
  }
  return whole && catalogEntries(parsed) === sites.length;
}

interface SpawnRecord {
  readonly argv: readonly string[];
  readonly env: readonly string[];
  readonly stdin: string;
}
const PLANTED = "PI_TZ4R5_PLANTED_SOURCE";
const oldPath = process.env.PATH;
const oldWorkspace = process.env.RF_WORKSPACE;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  delete process.env[PLANTED];
  if (oldWorkspace === undefined) delete process.env.RF_WORKSPACE;
  else process.env.RF_WORKSPACE = oldWorkspace;
  removeScratch(...scratches.splice(0));
});
/** Writes a stand-in `rf` into `folder`: every spawn appends one JSON line (its argv, its environment and what its stdin is) to the
 * returned log, prints `answer` and exits 0. */
function writeStandIn(folder: string, answer: unknown): { script: string; log: string } {
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      'let stdin = "closed";',
      "try {",
      "  const stat = fs.fstatSync(0);",
      '  stdin = stat.isCharacterDevice() ? "null-device" : stat.isFIFO() ? "pipe" : stat.isFile() ? "file" : stat.isSocket() ? "socket" : "other";',
      "} catch {}",
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ argv: process.argv.slice(2), env: process.env, stdin }) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      "process.exit(0);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  return { script, log };
}
/** Installs a stand-in `rf` first on PATH and returns its log. */
function standInRf(answer: unknown): string {
  const folder = makeScratch("ri-observation-authority-");
  scratches.push(folder);
  const { log } = writeStandIn(folder, answer);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
interface RawSpawn {
  readonly argv: readonly string[];
  readonly env: Readonly<Record<string, string>>;
  readonly stdin: string;
}
function rawSpawnsOf(log: string): RawSpawn[] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map((line, index) => {
    const value: unknown = JSON.parse(line);
    if (!isObject(value) || typeof value.stdin !== "string" || !isObject(value.env)) throw new Error(`spawn record ${index} is malformed`);
    const env = Object.fromEntries(Object.entries(value.env).map(([name, held]) => [name, String(held)]));
    return { argv: strings(value.argv, `spawn ${index} argv`), env, stdin: value.stdin };
  });
}
let interpreter: Readonly<Record<string, string>> | undefined;
/** What the stand-in's own interpreter adds to an environment it is handed (the node a PATH resolves may be a wrapper script that
 * exports a library path, and a shell adds its own names): measured once, by one control spawn of the same stand-in handed PATH
 * alone. A name the interpreter adds, holding the same value as in the control, is the interpreter's; every other name the child
 * holds is one its parent passed. */
function interpreterAdds(): Readonly<Record<string, string>> {
  if (interpreter !== undefined) return interpreter;
  const folder = makeScratch("ri-observation-authority-control-");
  try {
    const { script, log } = writeStandIn(folder, null);
    const control = spawnSync(script, [], { env: { PATH: oldPath ?? "" }, stdio: "ignore" });
    const [record] = rawSpawnsOf(log);
    if (control.status !== 0 || record === undefined) throw new Error("the control spawn of the stand-in did not record");
    interpreter = Object.fromEntries(Object.entries(record.env).filter(([name]) => name !== "PATH"));
    return interpreter;
  } finally {
    removeScratch(folder);
  }
}
/** The spawns a log holds, each environment read as the names the parent passed. */
function spawnsOf(log: string): SpawnRecord[] {
  const adds = interpreterAdds();
  return rawSpawnsOf(log).map(raw => ({
    argv: raw.argv,
    env: Object.keys(raw.env).filter(name => !(Object.hasOwn(adds, name) && adds[name] === raw.env[name])).sort(),
    stdin: raw.stdin,
  }));
}
interface Invocation {
  readonly outcome: string;
  readonly spawns: readonly SpawnRecord[];
}
const LEGACY: JsonObject = { model: "m", task: "t" };
const VIEW: JsonObject = { view: "v", taskId: "t-1" };
const VIEW_WITH_MODEL: JsonObject = { view: "v", taskId: "t-1", model: "m" };
/** One call through the NATIVE preview registration (registerNativeReactiveFiberRender) over a stand-in rf printing the shared
 * full-shape envelope: the outcome ("ok" or the CapabilityError category) and the spawns it made. */
async function nativeInvoke(input: JsonValue, grants: readonly string[] = GRANTS, id: string = PREVIEW_ID): Promise<Invocation> {
  const log = standInRf(fullShapeRf(FIXTURE_ROOT));
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  try {
    await registry.invoke(id, input, { grants: [...grants], signal: new AbortController().signal });
    return { outcome: "ok", spawns: spawnsOf(log) };
  } catch (error) {
    if (error instanceof CapabilityError) return { outcome: error.category, spawns: spawnsOf(log) };
    throw error;
  }
}

interface ArgvReading {
  readonly flags: readonly string[];
  readonly positionals: readonly string[];
}
/** An rf argv read as flags (each by name) and positionals, a value flag's value skipped. */
function argvOf(argv: readonly string[]): ArgvReading {
  const flags: string[] = [];
  const positionals: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index] ?? "";
    if (token.startsWith("--")) {
      const name = token.split("=")[0] ?? token;
      flags.push(name);
      if (RF_VALUE_FLAGS.has(token)) index += 1;
    } else positionals.push(token);
  }
  return { flags, positionals };
}

const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
const RF_BINARY = /^(?:\S*[\\/])?rf(?:\.(?:exe|cmd))?(?:\s|$)/i;
function parsed(file: string, text: string): ts.SourceFile {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function lineAt(source: ts.SourceFile, node: ts.Node): string {
  return `${source.fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
}
/** A child_process launcher called with the rf binary as its first argument: the landed helper's predicate, read independently. */
function isRfLaunch(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : undefined;
  const first = node.arguments[0];
  return name !== undefined && LAUNCHERS.has(name) && first !== undefined && ts.isStringLiteralLike(first) && RF_BINARY.test(first.text);
}
interface LaunchSite {
  readonly at: string;
  readonly loop: boolean;
  readonly start: number;
  readonly end: number;
}
/** Every rf launch of a module, with whether an iteration statement encloses it and the span of the statement holding it. */
function launchesIn(file: string, text: string): LaunchSite[] {
  const source = parsed(file, text);
  const sites: LaunchSite[] = [];
  const visit = (node: ts.Node, inLoop: boolean): void => {
    const loop = inLoop || ts.isIterationStatement(node, false);
    if (isRfLaunch(node)) {
      let statement: ts.Node = node;
      while (!ts.isBlock(statement.parent) && !ts.isSourceFile(statement.parent)) statement = statement.parent;
      sites.push({ at: lineAt(source, node), loop, start: statement.getStart(source), end: statement.getEnd() });
    }
    ts.forEachChild(node, child => visit(child, loop));
  };
  visit(source, false);
  return sites;
}
/** The module specifiers a module loads at runtime: static imports and export-froms that are not type-only, dynamic import() and
 * require() of a literal. */
function loadsOf(file: string, text: string): string[] {
  const source = parsed(file, text);
  const loads: string[] = [];
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      const bindings = clause?.namedBindings;
      const typeElements = bindings !== undefined && ts.isNamedImports(bindings) && clause?.name === undefined && bindings.elements.length > 0 && bindings.elements.every(element => element.isTypeOnly);
      if (clause?.isTypeOnly !== true && !typeElements) loads.push(statement.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && ts.isStringLiteral(statement.moduleSpecifier) && !statement.isTypeOnly) {
      loads.push(statement.moduleSpecifier.text);
    }
  }
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (dynamic && first !== undefined && ts.isStringLiteralLike(first)) loads.push(first.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return loads;
}
/** A relative specifier resolved to the src module it names (the .js suffix read as .ts); undefined for a package. */
function resolvedFrom(file: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return posix.normalize(posix.join(posix.dirname(file), specifier)).replace(/\.js$/, ".ts");
}
interface StaticRecord {
  readonly launches: readonly { readonly module: string; readonly loop: boolean }[];
  readonly closure: readonly string[];
}
/** The static wiring of src, with some modules' texts replaced: every rf launch (module and loop ancestry) and the runtime import
 * closure of the launching modules within src. */
function staticRecord(overrides: Readonly<Record<string, string>> = {}): StaticRecord {
  const scan = scanOf("src");
  const texts = new Map(scan.texts);
  for (const [file, text] of Object.entries(overrides)) texts.set(file, text);
  const launches = [...texts.entries()]
    .filter(([file]) => file.endsWith(".ts"))
    .flatMap(([file, text]) => launchesIn(file, text).map(site => ({ module: file, loop: site.loop })));
  const closure: string[] = [];
  const queue = [...new Set(launches.map(launch => launch.module))];
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || closure.includes(file)) continue;
    closure.push(file);
    const text = texts.get(file);
    if (text === undefined) continue;
    for (const specifier of loadsOf(file, text)) {
      const target = resolvedFrom(file, specifier);
      if (target !== undefined && texts.has(target) && !closure.includes(target)) queue.push(target);
    }
  }
  return { launches, closure: closure.sort() };
}
interface LaunchRecord {
  readonly spawns: readonly SpawnRecord[];
  readonly statics: StaticRecord;
}
/** The checker A4 holds the real launch record to: the codes a record breaks, in a fixed order. */
function violationsOf(record: LaunchRecord): string[] {
  const codes: string[] = [];
  const { launches, closure } = record.statics;
  if (launches.length !== 1 || launches.some(launch => launch.module !== PROVIDER)) codes.push("launches");
  if (launches.some(launch => launch.loop)) codes.push("loop");
  if (ORCHESTRATION.some(root => closure.includes(root.module))) codes.push("orchestrator");
  if (record.spawns.length !== 1) codes.push(record.spawns.length === 0 ? "no-spawn" : "respawn");
  const allowed = new Set(RF_CHILD_ENV_ALLOWLIST);
  for (const spawn of record.spawns) {
    const { flags, positionals } = argvOf(spawn.argv);
    if (positionals.includes(WORD.group)) codes.push("group:inference");
    else if (JSON.stringify(positionals.slice(0, 2)) !== JSON.stringify(RENDER_GROUP)) codes.push("group");
    if (!flags.includes("--no-commit")) codes.push("commit");
    if (flags.includes("--tools")) codes.push("tools");
    for (const flag of flags) if (flag !== "--tools" && !ENUMERATED_FLAGS.includes(flag)) codes.push(`flag:${flag}`);
    if (spawn.env.some(name => !allowed.has(name))) codes.push("env");
    if (spawn.stdin !== "null-device") codes.push("stdin");
  }
  return [...new Set(codes)];
}
async function realRecord(input: JsonValue = LEGACY): Promise<LaunchRecord> {
  const run = await nativeInvoke(input);
  if (run.outcome !== "ok") throw new Error(`the real preview call read ${run.outcome}`);
  return { spawns: run.spawns, statics: staticRecord() };
}
function onlySpawn(record: LaunchRecord): SpawnRecord {
  const spawn = record.spawns[0];
  if (spawn === undefined || record.spawns.length !== 1) throw new Error("the real record holds one spawn");
  return spawn;
}
/** The provider's own text with its launch statement wrapped in a loop, by AST span (the text is parsed, never compiled). */
function loopedLaunch(text: string): string {
  const sites = launchesIn(PROVIDER, text);
  const site = sites[0];
  if (site === undefined || sites.length !== 1) throw new Error("the provider holds one launch");
  return `${text.slice(0, site.start)}for (const pass of [0]) { ${text.slice(site.start, site.end)} }${text.slice(site.end)}`;
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of the three selectors: id prefix, permission family or contract source. */
function rfIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors
    .filter(descriptor => descriptor.id.startsWith("reactivefiber.") || descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").includes("reactive-fiber.cli/"))
    .map(descriptor => descriptor.id);
}

/** Row A's controls: texts built at runtime from the words, so this file spells none of them. */
const FLAGGED: Readonly<Record<string, () => string>> = {
  shellString: () => `execSync("${WORD.rf} ${WORD.group} ${WORD.verb} --render r1 --tools tools.json");`,
  leafLiteral: () => `const leaf = "${WORD.group}.${WORD.verb}";`,
  docsSentence: () => `Pi never calls ${WORD.rf} ${WORD.group} on a committed render.`,
  spacedProse: () => `one ${WORD.group} ${WORD.verb} per task`,
  underscore: () => `${WORD.group}_${WORD.verb}`,
  hyphen: () => `${WORD.group}-${WORD.verb}`,
  slash: () => `${WORD.group}/${WORD.verb}`,
  colon: () => `${WORD.group}:${WORD.verb}`,
};
const QUIET: Readonly<Record<string, () => string>> = {
  runnerProse: () => `uses the existing provider-neutral ${WORD.group} ${WORD.verb}ner`,
  possessive: () => `${WORD.rf}'s ${WORD.group} group`,
  plurals: () => `${WORD.rf} ${WORD.group}s, and ${WORD.group}s ${WORD.verb}`,
  wordsAlone: () => `const ${WORD.group} = 3; const ${WORD.verb} = 4;`,
  commaApart: () => `${WORD.group}, ${WORD.verb}`,
  prefixed: () => `surf ${WORD.group} and ${WORD.group} rerun`,
};
const ZWJ = String.fromCodePoint(0x200d);
const RESIDUAL_TEXTS: Readonly<Record<string, () => string>> = {
  "R-OTHER-CASE": () => `${WORD.rf.toUpperCase()} ${WORD.group.toUpperCase()}, ${WORD.group.charAt(0).toUpperCase()}${WORD.group.slice(1)} Run, ${LEAF.toUpperCase()}`,
  "R-SEPARATOR-RUN": () => `${WORD.rf}  ${WORD.group}, ${WORD.group} -- ${WORD.verb}, ${WORD.group} . ${WORD.verb}`,
  "R-COMPOSED": () => `const leaf = [${JSON.stringify(WORD.group)}, ${JSON.stringify(WORD.verb)}].join(".");`,
  "R-INTERRUPTED": () => `${WORD.group.slice(0, 5)}${ZWJ}${WORD.group.slice(5)} ${WORD.verb}`,
  "R-ARGV-SPLIT": () => `spawn("${WORD.rf}", [${JSON.stringify(WORD.group)}, ${JSON.stringify(WORD.verb)}, "--render", id]);`,
};
const RESIDUAL_MODULES: Readonly<Record<string, string>> = {
  "R-VARIABLE-BINARY": 'import { spawn } from "node:child_process";\nconst binary = "rf";\nexport const launch = (argv: string[]) => spawn(binary, argv);\n',
  "R-CALLER-LOOP": 'import { spawn } from "node:child_process";\nfunction once(argv: string[]) {\n  return spawn("rf", argv);\n}\nexport function many(all: string[][]) {\n  for (const argv of all) once(argv);\n}\n',
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) today: no Pi path passes tool handles, an orchestrator or observation sources into any inference call reachable from rf ('<RF-INF>|<INF-RUN>|<INF.RUN>' over src/test/qa/docs/workbench = 0 at this read)",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) adoption: every observation source and effect reaching the decision inference is enumerated in a Pi-owned authorization record before the call, an unlisted source is refused with a typed reason",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) mutant: wiring an unrestricted tool or an agent loop into the observation port fails",
    pins: ["C1", "C2", "C3"],
  },
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
interface RosterSpelling {
  readonly placeholder: string;
  readonly words: readonly string[];
  readonly separator: string;
  readonly sha256: string;
}
interface Roster {
  readonly bead: string;
  readonly riPin: string;
  readonly riProbe: string;
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly spellings: readonly RosterSpelling[];
  readonly scanRoots: readonly string[];
  readonly knownCatalogs: readonly string[];
  readonly enumeratedFlags: readonly string[];
  readonly orchestration: readonly OrchestrationRoot[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.spellings) || !Array.isArray(raw.orchestration)) {
    throw new Error("roster must be an object with rows, spellings and orchestration roots");
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
  const spellings = raw.spellings.map((entry: unknown, index: number): RosterSpelling => {
    if (!isObject(entry) || typeof entry.placeholder !== "string" || typeof entry.separator !== "string" || typeof entry.sha256 !== "string") {
      throw new Error(`roster spellings[${index}] needs a placeholder, a separator and a sha256`);
    }
    return { placeholder: entry.placeholder, words: strings(entry.words, `spellings[${index}].words`), separator: entry.separator, sha256: entry.sha256 };
  });
  const orchestration = raw.orchestration.map((entry: unknown, index: number): OrchestrationRoot => {
    if (!isObject(entry) || typeof entry.module !== "string" || typeof entry.declares !== "string") throw new Error(`roster orchestration[${index}] needs a module and a declaration`);
    return { module: entry.module, declares: entry.declares };
  });
  for (const field of ["bead", "riPin", "riProbe", "rfVersion", "rfCommit"] as const) {
    if (typeof raw[field] !== "string") throw new Error(`roster ${field} must be a string`);
  }
  return {
    bead: String(raw.bead), riPin: String(raw.riPin), riProbe: String(raw.riProbe), rfVersion: String(raw.rfVersion), rfCommit: String(raw.rfCommit),
    spellings, scanRoots: strings(raw.scanRoots, "scanRoots"), knownCatalogs: strings(raw.knownCatalogs, "knownCatalogs"),
    enumeratedFlags: strings(raw.enumeratedFlags, "enumeratedFlags"), orchestration, rows, tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** What a walked file of this census's own pair holds: walked, its sites and how many of the three placeholders it carries. */
function ownRead(file: string): JsonObject {
  const scan = scanOf("test");
  const text = scan.texts.get(file) ?? "";
  return { walked: scan.files.includes(file), sites: siteCount(text), placeholders: PLACEHOLDERS.filter(placeholder => text.includes(placeholder)).length };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const scan = scanOf("src");
    const files = { floor: scan.files.length >= 100, allTs: scan.files.every(file => file.endsWith(".ts")) };
    const whole = new RegExp(`\\b${WORD.group}\\b`);
    const groupWord = [...scan.texts.values()].some(text => whole.test(text));
    const sites = rootSites("src");
    expect(files, `src files ${scan.files.length}`).toStrictEqual({ floor: true, allTs: true });
    expect(groupWord, "the group word alone occurs in src (the matcher reads more than the word)").toBe(true);
    expect(sites, "a src site of one of the three spellings").toEqual([]);
    return { files, groupWord, sites };
  },
  A2: async () => {
    const qa = scanOf("qa");
    const docs = scanOf("docs/workbench");
    const files = { qa: qa.files.length >= 55, docs: docs.files.length >= 60, docsMarkdown: docs.files.every(file => file.endsWith(".md")) };
    const sites = { qa: rootSites("qa"), docs: rootSites("docs/workbench") };
    expect(files, `qa files ${qa.files.length}, docs/workbench files ${docs.files.length}`).toStrictEqual({ qa: true, docs: true, docsMarkdown: true });
    expect(sites, "a qa or docs/workbench site of one of the three spellings").toStrictEqual({ qa: [], docs: [] });
    return { files, sites };
  },
  A3: async () => {
    const scan = scanOf("test");
    const withSites = scan.files.filter(file => siteCount(textOf(scan, file)) > 0);
    const catalogs = withSites.filter(file => isCatalog(file, textOf(scan, file)));
    const outside = withSites.filter(file => !catalogs.includes(file)).flatMap(file => labelled(file, textOf(scan, file)));
    const floors = { files: scan.files.length >= 450, catalogs: catalogs.length >= KNOWN_CATALOGS.length, known: KNOWN_CATALOGS.every(file => catalogs.includes(file)) };
    const own = { census: ownRead(SELF), roster: ownRead(ROSTER_FILE) };
    expect(floors, `test files ${scan.files.length}, catalogs ${catalogs.join(", ")}`).toStrictEqual({ files: true, catalogs: true, known: true });
    expect(own).toStrictEqual({ census: { walked: true, sites: 0, placeholders: 3 }, roster: { walked: true, sites: 0, placeholders: 3 } });
    expect(outside, "a test site that is no rf leaf-catalog entry").toEqual([]);
    return { floors, own, outside };
  },
  A4: async () => {
    const scan = scanOf("src");
    const modules = scan.files.filter(file => file.endsWith(".ts"));
    const helper = modules.flatMap(file => scanRfLaunches(file, textOf(scan, file)).launches);
    const own = modules.flatMap(file => launchesIn(file, textOf(scan, file)).map(site => site.at));
    const statics = staticRecord();
    const loadsAgree = statics.closure.every(file => {
      const ours = loadsOf(file, textOf(scan, file)).filter(specifier => specifier.startsWith(".")).sort();
      const landed = sourceStructure(REPO, file).imports.filter(entry => !entry.typeOnly && entry.module.startsWith(".")).map(entry => entry.module).sort();
      return JSON.stringify(ours) === JSON.stringify(landed);
    });
    const rootsDeclared = ORCHESTRATION.every(root => sourceStructure(REPO, root.module).declarations.includes(root.declares));
    const arm = async (input: JsonValue): Promise<JsonObject> => {
      const run = await nativeInvoke(input);
      const spawn = run.spawns[0];
      const reading = argvOf(spawn?.argv ?? []);
      return {
        outcome: run.outcome, spawns: run.spawns.length, group: [...reading.positionals.slice(0, 2)], noCommit: reading.flags.includes("--no-commit"),
        violations: violationsOf({ spawns: run.spawns, statics }),
      };
    };
    const launches = { modules: helper.map(at => at.slice(0, at.lastIndexOf(":"))), readersAgree: JSON.stringify(own) === JSON.stringify(helper) };
    const closure = { loadsAgree, rootsDeclared, reachesRegistry: statics.closure.includes("src/workbench/capability-registry.ts") };
    const arms = { legacy: await arm(LEGACY), view: await arm(VIEW) };
    expect(launches, `launch sites: ${helper.join(", ")}`).toStrictEqual({ modules: [PROVIDER], readersAgree: true });
    expect(closure, `closure ${statics.closure.join(", ")}`).toStrictEqual({ loadsAgree: true, rootsDeclared: true, reachesRegistry: true });
    const clean = { outcome: "ok", spawns: 1, group: [...RENDER_GROUP], noCommit: true, violations: [] };
    expect(arms).toStrictEqual({ legacy: clean, view: clean });
    return { launches, closure, arms };
  },
  A5: async () => {
    const native = await nativeDescriptors();
    const injectedRegistry = new CapabilityRegistry();
    registerReactiveFiberRender(injectedRegistry, () => Promise.reject(new Error("the injected reader is never invoked here")), FIXTURE_ROOT);
    const injected = injectedRegistry.catalogSnapshot().map(entry => entry.descriptor);
    const all = [...native, ...injected];
    const rf = { native: rfIds(native), injected: rfIds(injected) };
    const descriptorSites = all.flatMap(descriptor => labelled(`descriptor ${descriptor.id}`, JSON.stringify(descriptor)));
    const groupIds = all.filter(descriptor => descriptor.id.split(/[.-]/).includes(WORD.group)).map(descriptor => descriptor.id);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    // Non-vacuity: the selector read a catalog holding providers that are not rf.
    const catalogRead = native.length > rf.native.length && rf.native.length > 0;
    expect(catalogRead, `native descriptors ${native.length}`).toBe(true);
    expect([rf.native, rf.injected, reconcile]).toStrictEqual([[PREVIEW_ID], [PREVIEW_ID], [PREVIEW_ID]]);
    expect(descriptorSites, "a registered descriptor spelling one of the three").toEqual([]);
    expect(groupIds, "a registered descriptor whose id names the inference group").toEqual([]);
    return { catalogRead, rf, descriptorSites, groupIds, reconcile };
  },
  A6: async () => {
    const read = (controls: Readonly<Record<string, () => string>>): JsonObject => Object.fromEntries(Object.entries(controls).map(([name, build]) => [name, siteCount(build())]));
    const flagged = read(FLAGGED);
    const quiet = read(QUIET);
    const texts = read(RESIDUAL_TEXTS);
    const modules: JsonObject = Object.fromEntries(Object.entries(RESIDUAL_MODULES).map(([name, text]) => {
      const file = `src/workbench/${name.toLowerCase()}.ts`;
      const sites = launchesIn(file, text);
      return [name, { helper: scanRfLaunches(file, text).launches.length, own: sites.length, loop: sites.some(site => site.loop) }];
    }));
    expect(Object.values(flagged).every(count => typeof count === "number" && count >= 1), JSON.stringify(flagged)).toBe(true);
    expect(Object.values(quiet)).toEqual(Object.keys(QUIET).map(() => 0));
    expect(Object.values(texts)).toEqual(Object.keys(RESIDUAL_TEXTS).map(() => 0));
    expect(modules).toStrictEqual({ "R-VARIABLE-BINARY": { helper: 0, own: 0, loop: false }, "R-CALLER-LOOP": { helper: 1, own: 1, loop: false } });
    return { flagged, quiet, residuals: { ...texts, ...modules } };
  },
  B1: async () => {
    const native = await nativeDescriptors();
    const preview = native.find(descriptor => descriptor.id === PREVIEW_ID);
    if (preview === undefined) throw new Error("the native catalog registers no preview");
    const oneOf = preview.inputSchema.oneOf;
    if (!Array.isArray(oneOf)) throw new Error("the preview input schema has no arms");
    const arms = oneOf.map((arm: unknown, index: number): JsonObject => {
      if (!isObject(arm) || !isObject(arm.properties)) throw new Error(`arm ${index} has no properties`);
      return { keys: Object.keys(arm.properties).sort(), required: strings(arm.required, `arm ${index} required`).sort(), closed: arm.additionalProperties === false };
    });
    const record = {
      effectClass: preview.effectClass, permissions: [...preview.permissions], modes: [...preview.supportedModes],
      carrier: preview.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE, arms,
    };
    const runs = [await nativeInvoke(LEGACY), await nativeInvoke(VIEW_WITH_MODEL)];
    const flags = [...new Set(runs.flatMap(run => run.spawns.flatMap(spawn => argvOf(spawn.argv).flags)))].sort();
    expect(record).toStrictEqual({
      effectClass: "read", permissions: [...GRANTS], modes: ["invoke"], carrier: true,
      arms: [{ keys: ["model", "task"], required: ["model", "task"], closed: true }, { keys: ["model", "taskId", "view"], required: ["taskId", "view"], closed: true }],
    });
    expect(runs.map(run => [run.outcome, run.spawns.length])).toEqual([["ok", 1], ["ok", 1]]);
    expect(flags, "the real spawns carry exactly the enumerated flags").toEqual([...ENUMERATED_FLAGS]);
    return { record, flags };
  },
  B2: async () => {
    const runs: Readonly<Record<string, Invocation>> = {
      unregistered: await nativeInvoke(LEGACY, GRANTS, `reactivefiber.${WORD.group}.${WORD.verb}`),
      ungranted: await nativeInvoke(LEGACY, []),
      toolsKey: await nativeInvoke({ ...LEGACY, tools: "/fixture/tools.json" }),
      sourcesKey: await nativeInvoke({ ...VIEW, sources: ["/fixture/observations.jsonl"] }),
      agentKey: await nativeInvoke({ ...LEGACY, agent: { loop: true } }),
      listed: await nativeInvoke(LEGACY),
    };
    const witness: JsonObject = Object.fromEntries(Object.entries(runs).map(([name, run]) => [name, { outcome: run.outcome, spawns: run.spawns.length }]));
    expect(witness).toStrictEqual({
      unregistered: { outcome: "unavailable", spawns: 0 }, ungranted: { outcome: "authorization", spawns: 0 }, toolsKey: { outcome: "validation", spawns: 0 },
      sourcesKey: { outcome: "validation", spawns: 0 }, agentKey: { outcome: "validation", spawns: 0 }, listed: { outcome: "ok", spawns: 1 },
    });
    return witness;
  },
  B3: async () => {
    process.env[PLANTED] = "planted-observation-source";
    process.env.RF_WORKSPACE = "/fixture/planted-workspace";
    const run = await nativeInvoke(LEGACY);
    const spawn = run.spawns[0];
    const env = spawn?.env ?? [];
    const witness = {
      outcome: run.outcome, spawns: run.spawns.length,
      outside: env.filter(name => !RF_CHILD_ENV_ALLOWLIST.includes(name)), rfNames: env.filter(name => name.startsWith("RF_")),
      planted: [PLANTED, "RF_WORKSPACE"].filter(name => env.includes(name)), pathKept: env.includes("PATH"),
      workspaceArgv: JSON.stringify(spawn?.argv.slice(0, 2)) === JSON.stringify(["--workspace", FIXTURE_ROOT]), stdin: spawn?.stdin ?? null,
      calibrated: interpreter !== undefined,
    };
    expect(witness).toStrictEqual({
      outcome: "ok", spawns: 1, outside: [], rfNames: [], planted: [], pathKept: true, workspaceArgv: true, stdin: "null-device", calibrated: true,
    });
    return witness;
  },
  C1: async () => {
    const real = await realRecord();
    const spawn = onlySpawn(real);
    const changed = (next: SpawnRecord): string[] => violationsOf({ ...real, spawns: [next] });
    const witness = {
      toolsFlag: changed({ ...spawn, argv: [...spawn.argv, "--tools", "/fixture/tools.json"] }),
      reachableCall: changed({ ...spawn, argv: ["--workspace", FIXTURE_ROOT, WORD.group, WORD.verb, "--render", "r1", "--tools", "/fixture/tools.json", "--json"] }),
      toolsVariable: changed({ ...spawn, env: [...spawn.env, "RF_TOOLS"].sort() }),
      pipedStdin: changed({ ...spawn, stdin: "pipe" }),
    };
    expect(witness).toStrictEqual({ toolsFlag: ["tools"], reachableCall: ["group:inference", "commit", "tools", "flag:--render"], toolsVariable: ["env"], pipedStdin: ["stdin"] });
    return witness;
  },
  C2: async () => {
    const real = await realRecord();
    const spawn = onlySpawn(real);
    const provider = textOf(scanOf("src"), PROVIDER);
    const wired = (overrides: Readonly<Record<string, string>>): string[] => violationsOf({ ...real, statics: staticRecord(overrides) });
    const fed = argvOf(spawn.argv).flags.includes("--task") ? spawn.argv.map((token, index) => (spawn.argv[index - 1] === "--task" ? "sha256:previous-output" : token)) : [...spawn.argv];
    const witness = {
      respawn: violationsOf({ ...real, spawns: [spawn, { ...spawn, argv: fed }] }),
      loopedLaunch: wired({ [PROVIDER]: loopedLaunch(provider) }),
      runnerImport: wired({ [PROVIDER]: `import { runAgent } from "../../agent-runner.js";\n${provider}` }),
      managerDynamic: wired({ [PROVIDER]: `${provider}\nexport const manager = () => import("../../agent-manager.js");\n` }),
      secondLauncher: wired({ "src/workbench/providers/agent-loop.ts": 'import { spawn } from "node:child_process";\nexport const again = (argv: string[]) => spawn("rf", argv);\n' }),
    };
    expect(witness).toStrictEqual({ respawn: ["respawn"], loopedLaunch: ["loop"], runnerImport: ["orchestrator"], managerDynamic: ["orchestrator"], secondLauncher: ["launches"] });
    return witness;
  },
  C3: async () => {
    const real = await realRecord();
    const view = await realRecord(VIEW);
    const spawn = onlySpawn(real);
    const provider = textOf(scanOf("src"), PROVIDER);
    const wired = (overrides: Readonly<Record<string, string>>): string[] => violationsOf({ ...real, statics: staticRecord(overrides) });
    const swapped = [...spawn.argv];
    const noInput = swapped.indexOf("--no-input");
    const asJson = swapped.indexOf("--json");
    if (noInput < 0 || asJson < 0) throw new Error("the real argv carries --no-input and --json");
    [swapped[noInput], swapped[asJson]] = ["--json", "--no-input"];
    const witness = {
      legacy: violationsOf(real),
      view: violationsOf(view),
      optionOrder: violationsOf({ ...real, spawns: [{ ...spawn, argv: swapped }] }),
      fewerNames: violationsOf({ ...real, spawns: [{ ...spawn, env: spawn.env.filter(name => name !== "PATH") }] }),
      unrelatedLoop: wired({ [PROVIDER]: `${provider}\nexport function passes(): number {\n  let total = 0;\n  for (const pass of [0, 1]) total += pass;\n  return total;\n}\n` }),
      typeOnlyImport: wired({ [PROVIDER]: `import type { AgentManager } from "../../agent-manager.js";\n${provider}` }),
    };
    expect(Object.values(witness)).toEqual(Object.keys(witness).map(() => []));
    return witness;
  },
};

describe("wb-tz4r.5 RI observation authority census (RI-UNIFIED-DECISION-INFERENCE-R5, gated on RI-DEC-04/10, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:3", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, riPin: RI_PIN, riProbe: RI_PROBE, rfVersion: RF_VERSION, rfCommit: RF_COMMIT,
      spellings: SPELLINGS.map(({ placeholder, words, separator }) => ({ placeholder, words: [...words], separator })),
      scanRoots: [...SCAN_ROOTS], knownCatalogs: [...KNOWN_CATALOGS], enumeratedFlags: [...ENUMERATED_FLAGS], orchestration: ORCHESTRATION.map(root => ({ ...root })),
    }).toStrictEqual({
      bead: ROSTER.bead, riPin: ROSTER.riPin, riProbe: ROSTER.riProbe, rfVersion: ROSTER.rfVersion, rfCommit: ROSTER.rfCommit,
      spellings: ROSTER.spellings.map(({ placeholder, words, separator }) => ({ placeholder, words: [...words], separator })),
      scanRoots: [...ROSTER.scanRoots], knownCatalogs: [...ROSTER.knownCatalogs], enumeratedFlags: [...ROSTER.enumeratedFlags], orchestration: ROSTER.orchestration.map(root => ({ ...root })),
    });
    // The composed alternatives are the bead's own grep: each digest was taken from the bead's spelling at cut time.
    expect(SPELLINGS.map(spelling => sha256(acceptanceText(spelling)))).toEqual(ROSTER.spellings.map(entry => entry.sha256));
    expect(new Set(SPELLINGS.map(acceptanceText)).size).toBe(3);
    // The plain-dot form of the third alternative is the catalog's leaf path, and the provider's own argv is the render group.
    expect([acceptanceText(SPELLINGS[2] ?? SPELLINGS[0] ?? { placeholder: "", words: ["", ""], separator: "any" }), RENDER_LEAF]).toEqual([LEAF, RENDER_GROUP.join(".")]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
