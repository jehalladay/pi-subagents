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
 *    manager, a second launching module); C3 the checker's quiet controls. wb-roxk widens all three (the HARDENING block after ROWS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the spellings and their digests, the roots, the named catalogs, the enumerated flags, the
 * orchestration roots and the registered tests - is held to the out-of-file roster test/fixtures/ri-observation-authority-roster.json;
 * the last case walks this file's vitest task tree against the roster and holds each pin's assertion count (wb-roxk F5).
 * THE GATE-OPENING SIGNAL: when Pi adds any call into rf's inference group - a spelling in a walked file (A1-A3), a second launch,
 * an argv off the context render group, a tools flag or variable, a piped stdin, a looped launch or an orchestrator import (A4,
 * with B1/B3 where the record or the child channels move), a registered capability reaching the group (A5, B2) - row A reds (the
 * seat's planted product violations read each of those reds on the real modules), which is the cue to land the record (b) owes
 * for that call - every observation source and effect enumerated before it, an unlisted one refused with a typed reason - and to
 * re-cut this census to it. When RI ships the observation port (RI-DEC-04) and the effect integration (RI-DEC-10), the re-cut
 * re-measures the producer.
 * RESIDUALS (named, each with a pinned quiet row in A6; wb-roxk's three more in C3, after ROWS): R-OTHER-CASE a spelling in another case is none of the three (the grep is
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
 * HARDENING (wb-roxk): the block after ROWS adds the computed-load, wrapped-launch and environment readings, an outside anchor, records.
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { types } from "node:util";
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
  return parseOnce(file, text);
}
function lineAt(source: ts.SourceFile, node: ts.Node): string {
  return `${source.fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
}
/** A child_process launcher called with the rf binary as its first argument: the landed helper's predicate, read independently (launcherNameOf, wb-1f2w F5). */
function isRfLaunch(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  const name = launcherNameOf(callee);
  const first = node.arguments[0];
  return name !== undefined && LAUNCHERS.has(name) && first !== undefined && ts.isStringLiteralLike(first) && RF_BINARY.test(first.text);
}
interface LaunchSite {
  readonly at: string;
  readonly loop: boolean;
  readonly start: number;
  readonly end: number;
}
/** Every rf launch of a module (direct, or wrapped since wb-roxk F3), with whether a loop encloses it and its statement's span. */
function launchesIn(file: string, text: string): LaunchSite[] {
  const source = parsed(file, text);
  const sites: LaunchSite[] = [];
  const visit = (node: ts.Node, inLoop: boolean): void => {
    const loop = inLoop || ts.isIterationStatement(node, false);
    if (isRfLaunch(node) || isWrappedRfLaunch(node)) {
      let statement: ts.Node = node;
      while (!ts.isBlock(statement.parent) && !ts.isSourceFile(statement.parent)) statement = statement.parent;
      sites.push({ at: lineAt(source, node), loop, start: statement.getStart(source), end: statement.getEnd() });
    }
    ts.forEachChild(node, child => visit(child, loop));
  };
  visit(source, false);
  return sites;
}
/** The module specifiers a module loads at runtime: static imports and export-froms that are not type-only, and a runtime loader
 * call (import(), require(), createRequire(...)() or a loader member, and their indirect forms; isLoaderCall, wb-roxk F2, wb-1f2w F3, wb-tnig F1) of a literal. */
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
      const first = loaderSpecifierOf(node);
      const dynamic = isLoaderCall(node);
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
interface StaticRecord extends Wiring {
  readonly launches: readonly { readonly module: string; readonly loop: boolean }[];
  readonly closure: readonly string[];
}
/** The static wiring of src, with some modules' texts replaced: every rf launch (module and loop ancestry), the runtime import
 * closure of the launching modules within src, and the closure's wiring facts (wiringOf, wb-roxk F2-F4). */
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
  return { launches, closure: closure.sort(), ...wiringOf(texts, closure) };
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
  codes.push(...(ORCHESTRATION.some(root => closure.includes(root.module)) ? ["orchestrator"] : []), ...wiringCodes(record.statics));
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

/*
 * HARDENING (wb-roxk, the R694 follow-up of landing 319; gate of record cmd_a8cc487825ad, its LEG 2 survivors S01, S02, S09, H1
 * and H2, the findings F2-F5). Three fail-closed wiring facts join the static record of the launch closure (wiringOf), each a
 * violationsOf code, so A4 and every C case read them on the real tree:
 *  F2 computed-load (S01): a runtime loader call - import(), require(), a require createRequire returns called in place, or
 *    module.require() - whose specifier is no string literal (an array join, a concatenation, a method call, a variable) cannot be
 *    resolved by the closure walk, so it is never read as clean; with a literal it is a load the walk follows (loadsOf reads the
 *    same loader calls). The launch closure holds none today (its four modules: the provider, process-env, the capability registry
 *    and redaction).
 *  F3 wrapped (S02): a launcher call whose first argument is not the rf binary while a command text of its first two arguments
 *    (any string literal or template piece, at any depth) names rf as a command word - at the start, after white space, a quote
 *    or a shell separator, and followed by white space, a quote, a separator or the end - runs rf through a shell or a wrapper.
 *    launchesIn reads it as an rf launch (a second launching module reds launches, and A4's agreement with the landed walk) and
 *    the wrapping itself is a violation. Fail-closed: an argument that only mentions rf after white space reads as a command word
 *    too; of src's 30 launcher calls none carries rf in a command text besides the provider's own direct launch today.
 *  F4 env-read (S09): any use of the parent environment in the launch closure other than the whole process.env handed to
 *    scrubbedEnvironment (the allowlist channel B3 reads at the child) - a named or computed read, a destructuring, an alias, a
 *    spread or any other pass of the whole object, process itself (or process on globalThis or global) used other than as the
 *    receiver of a literal member, a computed key of process, or a value import of node:process - is an observation source the
 *    record does not enumerate, so a flag gated on an environment variable reds while that variable is unset where this census
 *    runs. The launch closure holds exactly that one channel use today, and no other reference to process.
 *  C1 pins F4's shapes, C2 F2's and F3's, and C3 their quiet controls and the residuals below.
 *  F5 (H1, H2; the 6ze.39 self-hollow class the RI sibling censuses share). RECORD: each pin's case records its vitest assertion
 *    count after its witness compares equal, and the registration case holds the counts to the roster, so a case that hands back
 *    its roster witness without measuring (H1) reds. OUTSIDE ANCHOR: the owner filing's row of wb-tz4r.5 in the tracked bead
 *    export (.beads/issues.jsonl at the tree under test). Its first `Acceptance:` line splits into exactly the clauses (a)-(c),
 *    each, the three spellings its grep quotes written as their placeholders, equal to its row label; those spellings hash to
 *    the roster's digests; each pin's covered phrases (COVERS) are verbatim spans of its row's clause, together they cover every
 *    word of the clause (articles and conjunctions aside), and each pin covers a word no sibling covers. So a pin removed from
 *    every literal of this file and its roster at once (H2) leaves its own words uncovered and reds. Only the first
 *    `Acceptance:` line is read, so a note appended later never moves the reading, and a quiet control pins that. Not claimed: a
 *    pin removed everywhere while its own words are handed to a sibling's phrases, or a case echoing its witness while its count
 *    is edited in the roster with it (both anchors are this cut's own literals).
 *  LINE DISCIPLINE: the sibling census test/workbench-ri-decision-seed-claim-census.test.ts admits this file's quotes of the owner
 *    filing at :3, :9 and :614 and the roster's at :222 by path, line and text (its R-SIBLING-QUOTE residual), so this cut keeps
 *    every line above :614 here and above :222 in the roster in place, and spells none of that census's needles anywhere else.
 * FOLLOW-UP wb-1f2w (the R694 follow-up of landing 411, wb-roxk; gate of record cmd_2fab6b5f755a, its PREP LEG-2 probes P11,
 *  P12, P03, P04, P08 and P17, the findings F1-F6). Each new reading is pinned by kill controls at its code and bounded by a quiet one:
 *  F1/F2 env-read: a runtime load of the process module (P11 import("node:process"), P12 require("node:process"), the bare
 *    specifier, a require createRequire returns, every loader form F3 reads) and a value re-export of it are environment uses
 *    beside the static value import (C1); its type-only forms stay quiet (C3 processTypes).
 *  F3 loads: a loader function (require, a require createRequire returns, module.require), read through unwrapped's wrappers
 *    (parentheses, a comma operand, as, satisfies, a <T> assertion, a non-null !), and one run by its call or apply method or by
 *    Reflect.apply with the loader as its target (P03), is a runtime load: a literal specifier is a load the closure walk follows,
 *    any other (or none) is a computed load (C2); the call method and Reflect.apply of a function that is no loader stay quiet
 *    (C3 nonLoaderCall).
 *  F5 launches: both launch readings read a callee through launcherOf: by its own name, by a local name its module binds to a
 *    launcher (an import specifier or a destructuring element keyed by a launcher's name, as an identifier or a quoted key - P08
 *    renames spawn at its import - and a declaration whose initializer launcherOf reads as a launcher, to a fixed point), as a
 *    member or by a quoted key, through the same wrappers (C2); a renamed import of no launcher stays quiet (C3 renamedOther). Real
 *    src binds no such name today, so A4's two launch walks still agree.
 *  F6 echo guard: each pin's runner refuses a case whose source reads the roster (rosterWitness, ROSTER or readRoster) before the
 *    case runs, so P17 - A1's case padded to its count and handing back its roster witness - reds whatever its count, and so does
 *    the F5 NOT CLAIMED echo whose count is edited in the roster with it; the judged set pins the guard on the P17 shape, on one
 *    echo through each other reader and on R-INLINE-ECHO's quiet row, and the guard's assertion is part of every pin's count.
 *  F4 is named, not read: R-EVALUATED-LOAD below (P04), the R-EVALUATED-ENV mechanism for loads.
 * RESIDUALS (named families, each with a pinned quiet row in C3): R-ALIASED-LOADER a loader bound to another name (the require a
 * createRequire call returns kept in a variable, an alias of require) is a load neither walk reads, so the closure misses its
 * target; R-VARIABLE-COMMAND a shell command or a wrapper argv held in a variable carries no command text the wrapped reading sees;
 * R-EVALUATED-ENV the environment reached through evaluated text (eval, Function), a computed or quoted key of globalThis, or
 * process named by an object shorthand is no environment use. wb-1f2w's (quiet rows in C3, R-INLINE-ECHO's in the judged set):
 * R-EVALUATED-LOAD a loader reached through evaluated text (eval, Function) is no load; R-INDIRECT-LOADER a loader run through any
 * other expression (bind, an array or object element, a method of Function.prototype) is no load; R-PASSED-LAUNCHER a launcher
 * reaching its call through an object property, a parameter (its argument: narrowed by wb-6njq F1, which reads a parameter's own
 * default value), a return value (an awaited call's result among them, wb-6njq), a later assignment (a destructuring assignment's
 * default among them, wb-6njq) or another module's export, or run by call, apply, bind or Reflect.apply, is no launch; R-INLINE-ECHO
 * a case returning a copy of its witness, holding none of the
 * roster's own objects, from a source the guard reads clean (copied inline, cloned or built anew by a helper, parsed anew from the
 * roster file) is no echo either guard reads (narrowed by wb-tnig F3: a helper handing back the roster's own witness is one).
 * FOLLOW-UP wb-tnig (the R694 follow-up of landing 509, wb-1f2w; gate of record cmd_fe04e868f28b, its PREP LEG-2 probes E01,
 *  E11, E13, E14, E22 and E23, the findings F1-F3; INFO F4's E07 and E09 are read too). Each new reading is pinned by kill
 *  controls at its code and bounded by a quiet one:
 *  F1 loads: isLoaderFunction also reads a member of any object named require (process.mainModule.require, require.main.require;
 *    module.require before), getBuiltinModule (the built-in module loader, process.getBuiltinModule) or _load (the module
 *    system's), by its name or a quoted key, and createRequire read as a member; loaderFormOf reads a loader's call or apply method
 *    and Reflect.apply by a quoted key too. So the gate's E01, process.getBuiltinModule("node:process"), and each such member
 *    loading the process module are environment uses (C1), a computed specifier handed to one is a computed load and E07/E09 are
 *    loads the walk follows (C2), and the built-in loader handed another module stays quiet (C3 builtinOther); environmentUsesIn's
 *    runtime load is any loader form isLoaderCall reads.
 *  F2 launches: launcherOf also reads, through alternativesOf, a conditional as either branch, a logical or an assignment
 *    expression as either operand, an array literal as any element and an element access as its receiver (a quoted key reads by
 *    itself only when it names a launcher); launcherAliasesOf also binds every name a destructuring declaration binds, at any
 *    depth, read as its initializer, and every name a for...of declaration binds, read as the iterated expression. So the gate's
 *    E11, E13 and E14 modules, || and && pickers, an assignment used in place, array elements, an object pattern over an array and
 *    an iterated array launch rf, through a shell too (C2), and alternatives of no launcher stay quiet (C3 otherAlternatives).
 *  F3 echo guard: each pin's runner reads its case's own source through the intrinsic Function.prototype.toString (so an own
 *    toString changes nothing) and refuses, before the case runs, a source that reads the roster, one that reads as native code (a
 *    bound case, the gate's E23) and one whose code, strings aside, names an evaluator (eval or the Function constructor: the
 *    gate's E22 composes the reader's name); when the case has run it refuses a witness holding any object of the roster's own
 *    witness for the pin (a route back to the parsed roster: a helper, as INFO E24, a bound or evaluated case, a shallow copy).
 *    The judged set pins both readings on the gate's shapes, a disguised echo, E24's helper and R-INLINE-ECHO's quiet row; the
 *    evaluated shapes are texts whose evaluator is composed at runtime, so this file runs no evaluated text. The identity
 *    assertion is part of every pin's count. Not claimed: a runner whose own guard or identity reading is rewritten with every
 *    count kept (the runner is this cut's own code, as F5's not-claimed pair's anchors are its own literals).
 * RESIDUALS (wb-tnig; quiet row in C3): R-COMPUTED-LAUNCHER a launcher read by a computed key of an object or a module namespace (a
 * key held in a variable or built at runtime) is no launch. R-ALIASED-LOADER's loader bound to another name includes the members
 * F1 reads kept in a variable.
 * FOLLOW-UP wb-6njq (the R694 follow-up of landing 595, wb-tnig; gate of record cmd_d74be369dbe0, its PREP LEG-2 probes G01-G04, G11b
 *  and G12, the findings F1 and F2; its boundary control G32 is read too). Each new reading is pinned by kill controls at its code
 *  and bounded by a quiet one:
 *  F1 launches: launcherAliasesOf also binds every name a binding element binds, read as that element's own default value (an
 *    element of an array or an object pattern, renamed or not, at any depth, in a declaration, a for...of declaration, a parameter or
 *    a catch clause), and every name a parameter binds, read as the parameter's own default value; and unwrapped also reads an await
 *    expression as its operand, so launcherOf, isLoaderFunction and loaderFormOf read a launcher or a loader reached through await as
 *    themselves. So the gate's G01 (an array pattern), G02 (an object pattern) and G04 (a for...of declaration) modules, an element
 *    default renamed, nested in a defaulted pattern, in a parameter's pattern and in a catch clause, the gate's G32 control (a
 *    parameter default), the gate's G03 module and an awaited alias launch rf (C2), and an awaited loader loads the manager (C2) and
 *    the process module (C1); defaults and awaits of no launcher stay quiet (C3 otherDefaults).
 *  F2 echo guard: readRoster freezes the parsed roster throughout, so a helper swapping a pin's witness in it (the gate's G12) throws;
 *    the identity reading also refuses a witness the structured clone algorithm refuses - a proxy at any depth, over the roster's own
 *    objects or over a copy (the gate's G11b deep view, G11's shallow one), or a function: no measured witness holds one - and walks no
 *    such witness; and every binding each pin's runner reads (its tables IMPL and REACHED, ROSTER and rosterWitness, the source
 *    guard's readsRoster, INTRINSIC_SOURCE, sourceOf, NATIVE_SOURCE, EVALUATORS, evaluatesText and echoReasonsOf, the identity
 *    reading's objectsIn, CLONE, cloneable and routesOf) is a const binding, so a helper rebinding one throws (a function declaration
 *    is a mutable binding). The judged set pins the freeze, the swap, the binding kinds and the three views. Not claimed: a helper
 *    patching a built-in or a library object a reader calls at run time (Object.values, Array.isArray, a Set's methods,
 *    Function.prototype.call, RegExp.prototype.test, the TypeScript parser, vitest's expect) or editing the contents of a runner
 *    table (IMPL, REACHED); the structured clone algorithm and the intrinsic source reader are captured at load (and since wb-w0a4
 *    the proxy test, IS_PROXY).
 * RESIDUALS (wb-6njq; quiet rows in C3): R-PASSED-LAUNCHER's parameter is the launcher a caller hands in as its argument (pinned by
 * passedArgument; a parameter's own default value is read since F1), its return value includes an awaited call's result (an awaited
 * promise of a launcher, pinned by awaitedReturn), and its later assignment includes a destructuring assignment's default (an
 * assignment pattern binds nothing, pinned by assignedDefault).
 * FOLLOW-UP wb-w0a4 (the R694 follow-up of landing 681, wb-6njq; gate of record cmd_30025798cf3f, its PREP LEG-2 probes H11, H12,
 *  H21 and H22, the findings F1 and F2). Each new reading is pinned by kill controls at its code and bounded by a quiet one:
 *  F1 launches: launcherAliasesOf also reads a destructuring element keyed by a computed key that holds a string literal or a
 *    template literal without substitutions, read through unwrapped's wrappers, as one keyed by that literal; and it binds the name
 *    an import-equals declaration declares to the entity name it names, read the way launcherOf reads an expression - a qualified
 *    name as a member, by its last name, an identifier by its own name or by the launcher an alias of it is bound to - to the same
 *    fixed point. An identifier there must name a namespace, and declaration merging gives a launcher's name one: a module
 *    augmentation declaring a namespace spawn in node:child_process makes `import run = spawn;` alias the real spawn (0 diagnostics
 *    under the repo tsconfig at the cut, where an unmerged `import run = spawn;` is TS2503). One naming an external module
 *    (`import x = require(...)`) is no alias this reading follows, and no module the repo's typing step admits (TS1202 under its
 *    ES2022 module target, measured at the cut). So the gate's H11 module (`import run = childProcess.spawn;`) and H12 module
 *    (`const { ["spawn"]: run } = childProcess;`), a chain of import-equals declarations through a shell, the augmented identifier
 *    alias (of spawn and of a renamed import of it), an identifier alias of a local function named spawn merged with a namespace
 *    (read by its own name; 0 diagnostics too), a template-literal key and a parenthesized `as const` key through a shell launch rf
 *    (C2), and import-equals aliases (of a member and of a namespace) and a computed literal key of no launcher stay quiet (C3
 *    otherKeys). Real src holds no import-equals declaration and no computed binding key (117 modules, read by an AST walk at the
 *    cut), so A4's two launch walks still agree.
 *  F2 echo guard: routesOf reads every object the parsed roster holds - any pin's witness, its own or another pin's (the gate's H21
 *    hands back pin A2's empty qa list inside A1's witness), and every other part of the roster - and, once the structured clone
 *    accepts a witness, refuses one that is not plain data (plainData) as "unplain": an accessor (the gate's H22, whose fourth read
 *    hands the equality the roster's own list), a proxy that an accessor the clone ran left in place, a function at a property the
 *    clone does not read (a non-enumerable or symbol-keyed own one), or an object whose prototype is not Object.prototype
 *    (Array.prototype for an array). plainData reads through the proxy test of node:util, captured at load as IS_PROXY, each
 *    object's prototype and its own property descriptors only, so no accessor and no trap runs at that read. vitest's equality read
 *    consults an asymmetricMatch of the received value before any other comparison, so a witness carrying one that answers true -
 *    own and non-enumerable, or inherited from a class prototype - compared equal to the roster's witness whatever it held (measured
 *    at the cut on vitest 4.1.10 against A1's witness, a nested files object of the wrong value included); both shapes read as
 *    unplain now. A witness routesOf accepts is plain data, so the message's and the equality's later reads run none of its own
 *    code and read the objects routesOf walked; the runner's message names what it refuses. The judged set pins H21, H22, the
 *    cloned view, the two matches and a part of the roster read beside its copy; IS_PROXY and plainData join the const runner
 *    bindings. Not claimed, as before: a helper patching a built-in or a library object a reader calls (now also
 *    Object.getPrototypeOf, Reflect.ownKeys and Object.getOwnPropertyDescriptor) or editing a runner table's contents, and a copy of
 *    a witness that holds none of the roster's own objects (R-INLINE-ECHO).
 *  LINE DISCIPLINE: :3, :9 and :614 here and :222 in the roster stay byte-identical and in place: the node:util import enters at
 *    :103 and the blank line after the scratch guard leaves, so only lines 103-116 move, and every line from :117 on stays put.
 * RESIDUALS (wb-w0a4; quiet rows in C3): R-COMPUTED-LAUNCHER's key held in a variable includes a destructuring element's computed
 * key (pinned by variableKey), and R-PASSED-LAUNCHER's object property includes a namespace's exported import-equals alias called
 * as its member (pinned by namespaceAlias).
 */
/** Each module text parsed once (wb-1f2w): every control re-reads src with one module replaced, and the widened readings walk each
 * parse again for its launcher names, so a parse is kept per path and text (the readings never change a parse). */
const PARSES = new Map<string, Map<string, ts.SourceFile>>();
function parseOnce(file: string, text: string): ts.SourceFile {
  const byText = PARSES.get(file) ?? new Map<string, ts.SourceFile>();
  PARSES.set(file, byText);
  const cached = byText.get(text);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  byText.set(text, source);
  return source;
}
/** What the launch closure's static wiring holds beyond its launches and loads (wb-roxk F2-F4): each list a module:line reading. */
interface Wiring {
  /** Runtime loads of the closure whose specifier is no string literal (F2). */
  readonly computed: readonly string[];
  /** rf launches of src reached through a shell or a wrapper command (F3). */
  readonly wrapped: readonly string[];
  /** Uses of the parent environment in the closure outside the allowlist channel, each with its form (F4). */
  readonly environment: readonly string[];
}
/** The callee the allowlist channel hands the whole parent environment to (src/workbench/process-env.ts). */
const ALLOWLIST_CHANNEL = "scrubbedEnvironment";
/** rf as a command word in a command text: the binary (any directory, an .exe or .cmd suffix) at the start or after white space, a
 * quote or a shell separator, and followed by white space, a quote, a separator or the end. */
const RF_COMMAND = /(?:^|[\s;&|`('"])(?:\S*[\\/])?rf(?:\.(?:exe|cmd))?(?=$|[\s;&|)`'"])/i;
/** The texts a launcher call's first two arguments hold, at any depth: string literals and the pieces of template literals. */
function commandTexts(node: ts.CallExpression): string[] {
  const texts: string[] = [];
  const visit = (child: ts.Node): void => {
    if (ts.isStringLiteralLike(child)) texts.push(child.text);
    else if (ts.isTemplateExpression(child)) texts.push(child.head.text, ...child.templateSpans.map(span => span.literal.text));
    ts.forEachChild(child, visit);
  };
  for (const argument of node.arguments.slice(0, 2)) visit(argument);
  return texts;
}
/** A launcher call (launcherNameOf, wb-1f2w F5) that runs rf through a shell or a wrapper: no direct rf launch, while one of its
 * command texts names rf (F3). */
function isWrappedRfLaunch(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  const name = launcherNameOf(callee);
  // The direct predicate is read last: its false branch would narrow the call away.
  return name !== undefined && LAUNCHERS.has(name) && commandTexts(node).some(text => RF_COMMAND.test(text)) && !isRfLaunch(node);
}
/** Every wrapped rf launch of a module (F3). */
function wrappedLaunchesIn(file: string, text: string): string[] {
  const source = parsed(file, text);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (isWrappedRfLaunch(node)) sites.push(lineAt(source, node));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** An expression read through its parentheses, type assertions and comma operands: `(0, require)` reads as require (wb-1f2w); and
 * since wb-6njq F1 an await expression as its operand: `(await spawn)` reads as spawn. */
function unwrapped(node: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node) || ts.isAwaitExpression(node)) {
    return unwrapped(node.expression);
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) return unwrapped(node.right);
  return node;
}
/** The name a member reads: a property by its name or an element by a quoted key; undefined for any other expression (wb-tnig F1). */
function memberNameOf(node: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return node.argumentExpression.text;
  return undefined;
}
/** The loader functions a member of any object names (wb-tnig F1): require (module.require, require.main.require,
 * process.mainModule.require), the built-in module loader getBuiltinModule (process.getBuiltinModule) and the module system's _load. */
const MEMBER_LOADERS: readonly string[] = ["require", "getBuiltinModule", "_load"];
/** A loader function, read through unwrapped: require, or the require a createRequire call returns (F2); since wb-tnig F1 also a
 * member of any object MEMBER_LOADERS names, by its name or a quoted key (module.require alone before), with createRequire read
 * as a member too. */
function isLoaderFunction(node: ts.Expression): boolean {
  const callee = unwrapped(node);
  if (ts.isIdentifier(callee)) return callee.text === "require";
  if (ts.isCallExpression(callee)) {
    const maker = unwrapped(callee.expression);
    return (ts.isIdentifier(maker) && maker.text === "createRequire") || memberNameOf(maker) === "createRequire";
  }
  const member = memberNameOf(callee);
  return member !== undefined && MEMBER_LOADERS.includes(member);
}
type LoaderForm = "direct" | "call" | "apply" | "reflect";
/** How a call runs a loader: direct (import(), or a loader function called in place, F2), or through the loader's call or apply
 * method or Reflect.apply with the loader as its target (wb-1f2w F3), each method by its name or, since wb-tnig, a quoted key
 * (INFO F4's E07 and E09); undefined for a call that loads nothing. */
function loaderFormOf(node: ts.CallExpression): LoaderForm | undefined {
  const callee = unwrapped(node.expression);
  if (callee.kind === ts.SyntaxKind.ImportKeyword || isLoaderFunction(callee)) return "direct";
  if (!ts.isPropertyAccessExpression(callee) && !ts.isElementAccessExpression(callee)) return undefined;
  const method = memberNameOf(callee);
  if ((method === "call" || method === "apply") && isLoaderFunction(callee.expression)) return method;
  const target = node.arguments[0];
  const reflected = method === "apply" && ts.isIdentifier(callee.expression) && callee.expression.text === "Reflect";
  return reflected && target !== undefined && isLoaderFunction(target) ? "reflect" : undefined;
}
/** A runtime loader call: import(), or a loader function (isLoaderFunction: require, the require a createRequire call returns, a
 * loader member of any object) called in place (F2, wb-tnig F1), each also through parentheses or a comma operand, or run by its
 * call or apply method or by Reflect.apply (wb-1f2w F3). */
function isLoaderCall(node: ts.CallExpression): boolean {
  return loaderFormOf(node) !== undefined;
}
/** The specifier a loader call hands over: its first argument (direct), the argument after the receiver (call), or the first
 * element of a literal argument list (apply, Reflect.apply); undefined when the call names none (wb-1f2w F3). */
function loaderSpecifierOf(node: ts.CallExpression): ts.Expression | undefined {
  const form = loaderFormOf(node);
  if (form === "direct") return node.arguments[0];
  if (form === "call") return node.arguments[1];
  const list = form === "apply" ? node.arguments[1] : form === "reflect" ? node.arguments[2] : undefined;
  return list !== undefined && ts.isArrayLiteralExpression(list) ? list.elements[0] : undefined;
}
/** The binary operators whose value is one of their operands (wb-tnig F2): the logical ones and the assignments. */
const OPERAND_VALUED: readonly ts.SyntaxKind[] = [
  ts.SyntaxKind.QuestionQuestionToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.AmpersandAmpersandEqualsToken,
];
/** The expressions whose value an expression may take (wb-tnig F2): a conditional's two branches, both operands of a logical or an
 * assignment expression, every element of an array literal (a spread element as its own expression) and an element access's
 * receiver (so an element of an array holding a launcher); undefined for any other expression. */
function alternativesOf(node: ts.Expression): readonly ts.Expression[] | undefined {
  if (ts.isConditionalExpression(node)) return [node.whenTrue, node.whenFalse];
  if (ts.isBinaryExpression(node) && OPERAND_VALUED.includes(node.operatorToken.kind)) return [node.left, node.right];
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(element => (ts.isSpreadElement(element) ? element.expression : element));
  if (ts.isElementAccessExpression(node)) return [node.expression];
  return undefined;
}
/** The name an expression gives the launcher it reads, through unwrapped (wb-1f2w F5): an identifier by its own name or by the
 * launcher an alias of its module is bound to, a member by its name or by a quoted key naming a launcher; and since wb-tnig F2 the
 * first launcher among alternativesOf's expressions (a conditional's branch, a logical or an assignment operand, an array element,
 * an element access's receiver), so a launcher among them is never read as none; undefined for any other expression (the caller
 * holds the name to LAUNCHERS). Call sites and alias declarations read through it alike. */
function launcherOf(node: ts.Expression, aliases: ReadonlyMap<string, string>): string | undefined {
  const target = unwrapped(node);
  if (ts.isIdentifier(target)) return aliases.get(target.text) ?? target.text;
  if (ts.isPropertyAccessExpression(target)) return target.name.text;
  if (ts.isElementAccessExpression(target) && ts.isStringLiteralLike(target.argumentExpression) && LAUNCHERS.has(target.argumentExpression.text)) {
    return target.argumentExpression.text;
  }
  return alternativesOf(target)?.map(alternative => launcherOf(alternative, aliases)).find(name => name !== undefined && LAUNCHERS.has(name));
}
/** The launcher a callee names: launcherOf over its module's aliases (launcherAliasesOf, wb-1f2w F5). */
function launcherNameOf(node: ts.Expression): string | undefined {
  return launcherOf(node, launcherAliasesOf(node.getSourceFile()));
}
const launcherAliases = new WeakMap<ts.SourceFile, ReadonlyMap<string, string>>();
/** The local names a module binds to a launcher, each with that launcher's own name (wb-1f2w F5): an import specifier or a
 * destructuring element keyed by a launcher's name, as an identifier or a quoted key (renamed or not, from any module or
 * initializer), and a declaration whose initializer launcherOf reads as a launcher - since wb-tnig F2 every name a destructuring
 * declaration binds, read as its initializer, and every name a for...of declaration binds, read as the iterated expression; since
 * wb-6njq F1 every name a binding element binds, read as the element's own default value, and every name a parameter binds, read
 * as the parameter's own default value; since wb-w0a4 F1 a destructuring element keyed by a computed key holding a string literal
 * (read through unwrapped's wrappers) as one keyed by that literal, and the name an import-equals declaration binds to an entity
 * name, read as launcherOf reads an expression - followed to a fixed point (a function-scoped alias may name a module const declared
 * after it). */
function launcherAliasesOf(source: ts.SourceFile): ReadonlyMap<string, string> {
  const cached = launcherAliases.get(source);
  if (cached !== undefined) return cached;
  const aliases = new Map<string, string>();
  const declarations: { readonly name: string; readonly initializer: ts.Expression }[] = [];
  // wb-w0a4 F1: each import-equals declaration of the module that names an entity, with that entity name.
  const references: { readonly name: string; readonly reference: ts.EntityName }[] = [];
  // A key by its name: an identifier or a quoted key, and since wb-w0a4 F1 a computed key holding a string literal or a template
  // literal without substitutions, read through unwrapped's wrappers (the gate's H12 `{ ["spawn"]: run }`).
  const keyOf = (node: ts.Node): string | undefined => {
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) return node.text;
    const computed = ts.isComputedPropertyName(node) ? unwrapped(node.expression) : undefined;
    return computed !== undefined && ts.isStringLiteralLike(computed) ? computed.text : undefined;
  };
  // wb-tnig F2: every name a binding binds, at any depth of its array or object pattern.
  const boundNamesOf = (name: ts.BindingName): string[] => {
    if (ts.isIdentifier(name)) return [name.text];
    const elements: readonly ts.ArrayBindingElement[] = name.elements;
    return elements.flatMap(element => (ts.isBindingElement(element) ? boundNamesOf(element.name) : []));
  };
  const collect = (node: ts.Node): void => {
    if ((ts.isImportSpecifier(node) || ts.isBindingElement(node)) && ts.isIdentifier(node.name)) {
      const key = keyOf(node.propertyName ?? node.name);
      if (key !== undefined && LAUNCHERS.has(key)) aliases.set(node.name.text, key);
    }
    // A declared name reads as its initializer (a destructured one too, wb-tnig F2), and a for...of declaration's names as the
    // iterated expression (wb-tnig F2).
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      for (const name of boundNamesOf(node.name)) declarations.push({ name, initializer: node.initializer });
    }
    if (ts.isForOfStatement(node) && ts.isVariableDeclarationList(node.initializer)) {
      for (const declaration of node.initializer.declarations) for (const name of boundNamesOf(declaration.name)) declarations.push({ name, initializer: node.expression });
    }
    // wb-6njq F1: a binding element's names read as the element's own default value too (an element of an array or an object
    // pattern, at any depth, wherever the pattern stands), and a parameter's names as the parameter's own default value.
    if ((ts.isBindingElement(node) || ts.isParameter(node)) && node.initializer !== undefined) {
      for (const name of boundNamesOf(node.name)) declarations.push({ name, initializer: node.initializer });
    }
    // wb-w0a4 F1: an import-equals declaration binds its name to the entity it names (the gate's H11 `import run =
    // childProcess.spawn;`); one naming an external module (`import x = require(...)`) is no alias this reading follows.
    if (ts.isImportEqualsDeclaration(node) && !ts.isExternalModuleReference(node.moduleReference)) {
      references.push({ name: node.name.text, reference: node.moduleReference });
    }
    ts.forEachChild(node, collect);
  };
  collect(source);
  let grew = true;
  while (grew) {
    grew = false;
    for (const { name, initializer } of declarations) {
      const launcher = aliases.has(name) ? undefined : launcherOf(initializer, aliases);
      if (launcher !== undefined && LAUNCHERS.has(launcher)) {
        aliases.set(name, launcher);
        grew = true;
      }
    }
    // wb-w0a4 F1: an entity name reads the way launcherOf reads an expression - a qualified name as a member, by its last name, an
    // identifier by its own name or by the launcher an alias of it is bound to.
    for (const { name, reference } of references) {
      const launcher = ts.isIdentifier(reference) ? (aliases.get(reference.text) ?? reference.text) : reference.right.text;
      if (!aliases.has(name) && LAUNCHERS.has(launcher)) {
        aliases.set(name, launcher);
        grew = true;
      }
    }
  }
  launcherAliases.set(source, aliases);
  return aliases;
}
/** The runtime loader calls of a module whose specifier is no string literal (F2; every loader form, wb-1f2w F3). */
function computedLoadsIn(file: string, text: string): string[] {
  const source = parsed(file, text);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && isLoaderCall(node)) {
      const first = loaderSpecifierOf(node);
      if (first === undefined || !ts.isStringLiteralLike(first)) sites.push(lineAt(source, node));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** True for the process object: the identifier process, or process on globalThis or global. */
function isProcessObject(node: ts.Node): boolean {
  if (ts.isIdentifier(node)) return node.text === "process";
  return ts.isPropertyAccessExpression(node) && node.name.text === "process" && ts.isIdentifier(node.expression) && ["globalThis", "global"].includes(node.expression.text);
}
/** True when an identifier names a member or a declaration (a property, a binding, an import) rather than referring to a value. */
function isNamePosition(node: ts.Node): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  const named = parent as ts.NamedDeclaration & { readonly propertyName?: ts.Node };
  return named.name === node || named.propertyName === node;
}
/** True for process.env or process["env"] on the process object. */
function isProcessEnv(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) return node.name.text === "env" && isProcessObject(node.expression);
  if (ts.isElementAccessExpression(node)) return ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "env" && isProcessObject(node.expression);
  return false;
}
/** The process object's module names (wb-1f2w F1/F2). */
const PROCESS_MODULES: readonly string[] = ["process", "node:process"];
/** Every use of the parent environment in a module except the whole process.env handed to the allowlist channel, each with its
 * form (F4): a named or a computed read, any other use of the whole object, process itself used other than as the receiver of a
 * literal member, a computed key of process, and a value import of node:process - static, a runtime load in any loader form
 * isLoaderCall reads (the built-in module loader and the other loader members since wb-tnig F1), or a value re-export (wb-1f2w
 * F1/F2). */
function environmentUsesIn(file: string, text: string): string[] {
  const source = parsed(file, text);
  const uses: string[] = [];
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && PROCESS_MODULES.includes(statement.moduleSpecifier.text) && statement.importClause?.isTypeOnly !== true) {
      uses.push(`${lineAt(source, statement)} import`);
    } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly && statement.moduleSpecifier !== undefined && ts.isStringLiteral(statement.moduleSpecifier) && PROCESS_MODULES.includes(statement.moduleSpecifier.text)) {
      // wb-1f2w: a value re-export of the process module hands the environment to every module importing it.
      uses.push(`${lineAt(source, statement)} re-export`);
    }
  }
  const visit = (node: ts.Node): void => {
    // wb-1f2w F1/F2: a runtime load of the process module (any loader form isLoaderCall reads) is a value import of it.
    const specifier = ts.isCallExpression(node) && isLoaderCall(node) ? loaderSpecifierOf(node) : undefined;
    if (specifier !== undefined && ts.isStringLiteralLike(specifier) && PROCESS_MODULES.includes(specifier.text)) uses.push(`${lineAt(source, node)} load`);
    if (isProcessEnv(node)) {
      const parent = node.parent;
      const channel = ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && parent.expression.text === ALLOWLIST_CHANNEL && parent.arguments[0] === node;
      const named = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : ts.isElementAccessExpression(parent) && parent.expression === node && ts.isStringLiteralLike(parent.argumentExpression) ? parent.argumentExpression.text : undefined;
      const computed = ts.isElementAccessExpression(parent) && parent.expression === node && named === undefined;
      if (!channel) uses.push(`${lineAt(source, node)} ${named !== undefined ? `read ${named}` : computed ? "computed read" : "whole"}`);
      return;
    }
    if (isProcessObject(node) && !isNamePosition(node)) {
      const parent = node.parent;
      const receiver = (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node;
      if (!receiver) uses.push(`${lineAt(source, node)} process`);
      else if (ts.isElementAccessExpression(parent) && !ts.isStringLiteralLike(parent.argumentExpression)) uses.push(`${lineAt(source, node)} computed process key`);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return uses;
}
/** The wiring facts of src's texts for a launch closure: the computed loads and environment uses of the closure's modules, and
 * the wrapped launches of every module. */
function wiringOf(texts: ReadonlyMap<string, string>, closure: readonly string[]): Wiring {
  const modules = [...texts.entries()].filter(([file]) => file.endsWith(".ts"));
  const inClosure = modules.filter(([file]) => closure.includes(file));
  return {
    computed: inClosure.flatMap(([file, text]) => computedLoadsIn(file, text)),
    wrapped: modules.flatMap(([file, text]) => wrappedLaunchesIn(file, text)),
    environment: inClosure.flatMap(([file, text]) => environmentUsesIn(file, text)),
  };
}
/** The violation codes of a record's wiring facts, in a fixed order (F2-F4). */
function wiringCodes(statics: Wiring): string[] {
  return [...(statics.computed.length > 0 ? ["computed-load"] : []), ...(statics.wrapped.length > 0 ? ["wrapped"] : []), ...(statics.environment.length > 0 ? ["env-read"] : [])];
}
/** The provider's argv statement and the gate's S09 shape of it (a --tools flag gated on a parent environment variable), its one
 * direct launch, its allowlist channel call, and the module path the second-module mutants and controls write. */
const ARGV_STATEMENT = 'return ["--workspace",workspaceRoot,"context","render",...select,"--no-commit","--no-input","--json"];';
const ENV_GATED_STATEMENT =
  'return ["--workspace",workspaceRoot,"context","render",...select,...(process.env.PI_S09_TOOLS===undefined?[]:["--tools",process.env.PI_S09_TOOLS]),"--no-commit","--no-input","--json"];';
const DIRECT_SPAWN = 'spawn("rf",argv,';
const ALLOWLIST_CALL = "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)";
const SECOND_MODULE = "src/workbench/providers/agent-loop.ts";
/** The provider's text with its one occurrence of `anchor` replaced (a provider that holds it never or twice fails the case). */
function replaced(text: string, anchor: string, next: string): string {
  const at = text.indexOf(anchor);
  if (at < 0 || text.indexOf(anchor, at + 1) >= 0) throw new Error(`the provider holds no single ${JSON.stringify(anchor.slice(0, 48))}`);
  return `${text.slice(0, at)}${next}${text.slice(at + anchor.length)}`;
}

/** The tracked bead export the outside anchor reads: the owner filing's row of BEAD, its first acceptance line (F5). */
const EXPORT_FILE = ".beads/issues.jsonl";
/** The export's row for `id` (every line must parse; a malformed export is refused, never skipped). */
function exportRow(id: string): { [key: string]: unknown } {
  const rows = readFileSync(join(REPO, EXPORT_FILE), "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index): unknown => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`${EXPORT_FILE} line ${index + 1} does not parse`);
      }
    });
  const row = rows.find(entry => isObject(entry) && entry.id === id);
  if (!isObject(row)) throw new Error(`${id} is missing from ${EXPORT_FILE}`);
  return row;
}
/** Each pin's covered phrases: verbatim spans of its row's clause (the three spellings as placeholders). The outside anchor holds
 * that together they cover every word of the clause and that each pin covers a word no sibling covers; C3 owns "fails", since a
 * mutant's failure reads as one only beside the quiet controls C3 pins. Row B's phrases stop short of the sibling's needle. */
const COVERS: Readonly<Record<string, readonly string[]>> = {
  A1: ["over src", "= 0 at this read"],
  A2: ["qa/docs/workbench", "= 0 at this read"],
  A3: ["test", "= 0 at this read"],
  A4: ["no Pi path passes tool handles, an orchestrator or observation sources into"],
  A5: ["any inference call reachable from rf"],
  A6: ["'<RF-INF>|<INF-RUN>|<INF.RUN>'"],
  B1: ["enumerated in a Pi-owned authorization record before the call"],
  B2: ["an unlisted source is refused with a typed reason"],
  B3: ["every observation source and effect reaching the decision", "inference is enumerated"],
  C1: ["wiring an unrestricted tool", "into the observation port"],
  C2: ["an agent loop", "into the observation port"],
  C3: ["fails"],
};
/** The words a clause's coverage never needs: articles and conjunctions. */
const STOP: readonly string[] = ["a", "an", "the", "and", "or"];
/** A clause's words: cut at white space, slashes, bars, commas, semicolons and parentheses; articles and conjunctions dropped. */
function wordsOf(text: string): string[] {
  return text.split(/[\s/|,;()]+/).filter(word => word !== "" && !STOP.includes(word));
}
interface Coverage {
  /** Covered phrases that are no verbatim span of the clause. */
  readonly outside: string[];
  /** Clause words no pin of the row covers. */
  readonly uncovered: string[];
  /** Pins of the row that cover no word of their own. */
  readonly withoutOwnWord: string[];
}
/** One clause's coverage by the pins of the row whose label carries its letter (no such row: every word is uncovered). */
function coverageOf(clause: string, rows: readonly Row[], covers: Readonly<Record<string, readonly string[]>>): Coverage {
  const body = clause.replace(/^\([a-z]\) [a-z]+: /, "");
  const pins = rows.find(row => row.label.startsWith(clause.slice(0, 4)))?.pins ?? [];
  const wordsBy = new Map(pins.map(pin => [pin, new Set((covers[pin] ?? []).flatMap(wordsOf))]));
  const covered = new Set([...wordsBy.values()].flatMap(words => [...words]));
  const outside = pins.flatMap(pin => (covers[pin] ?? []).filter(phrase => !body.includes(phrase)));
  const uncovered = [...new Set(wordsOf(body).filter(word => !covered.has(word)))];
  const withoutOwnWord = pins.filter(pin => {
    const others = new Set(pins.filter(other => other !== pin).flatMap(other => [...(wordsBy.get(other) ?? [])]));
    return [...(wordsBy.get(pin) ?? [])].every(word => others.has(word));
  });
  return { outside, uncovered, withoutOwnWord };
}
interface AnchorReading {
  readonly labels: string[];
  readonly digests: string[];
  readonly coverage: { [letter: string]: Coverage };
}
/** The outside anchor's reading of the export row's notes: the first acceptance line only, so an appended note never moves it. */
function anchorOf(notes: string, rows: readonly Row[] = ROWS, covers: Readonly<Record<string, readonly string[]>> = COVERS): AnchorReading {
  const acceptance = /^Acceptance: (.*)$/m.exec(notes)?.[1] ?? "";
  const clauses = acceptance === "" ? [] : acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
  const quoted = /\('([^']*)' over /.exec(clauses[0] ?? "")?.[1] ?? "";
  const names = quoted === "" ? [] : quoted.split("|");
  // A spelling is written as its placeholder only when one of SPELLINGS composes exactly that text.
  const placeholderOf = (name: string): string => SPELLINGS.find(spelling => acceptanceText(spelling) === name)?.placeholder ?? name;
  const labels = clauses.map(clause => names.reduce((text, name) => text.split(name).join(placeholderOf(name)), clause));
  return { labels, digests: names.map(sha256), coverage: Object.fromEntries(labels.map(label => [label.charAt(1), coverageOf(label, rows, covers)])) };
}
/** `${pin}:${assertion count}`, pushed by each pin's case after its witness compares equal; the last case holds it to the roster. */
const REACHED: string[] = [];
interface RosterWiring {
  readonly allowlistChannel: string;
  readonly rfCommand: string;
  readonly exportFile: string;
}

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
  readonly reached: readonly string[];
  readonly wiring: RosterWiring;
}
/** wb-6njq F2: a value with itself and every object and array it holds frozen, depth first. */
function frozenDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) frozenDeep(child);
    Object.freeze(value);
  }
  return value;
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster; since wb-6njq F2 the
 * parsed roster is frozen throughout, so no case or helper swaps a witness in it (a write to it throws). */
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
  const wiring = raw.wiring;
  if (!isObject(wiring) || typeof wiring.allowlistChannel !== "string" || typeof wiring.rfCommand !== "string" || typeof wiring.exportFile !== "string") {
    throw new Error("roster wiring needs an allowlistChannel, an rfCommand and an exportFile");
  }
  for (const field of ["bead", "riPin", "riProbe", "rfVersion", "rfCommit"] as const) {
    if (typeof raw[field] !== "string") throw new Error(`roster ${field} must be a string`);
  }
  return frozenDeep({
    bead: String(raw.bead), riPin: String(raw.riPin), riProbe: String(raw.riProbe), rfVersion: String(raw.rfVersion), rfCommit: String(raw.rfCommit),
    spellings, scanRoots: strings(raw.scanRoots, "scanRoots"), knownCatalogs: strings(raw.knownCatalogs, "knownCatalogs"),
    enumeratedFlags: strings(raw.enumeratedFlags, "enumeratedFlags"), orchestration, rows, tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"), wiring: { allowlistChannel: wiring.allowlistChannel, rfCommand: wiring.rfCommand, exportFile: wiring.exportFile },
  });
}

const ROSTER = readRoster();

/** A pin's witness in the parsed roster; like every reader each pin's runner calls, a const binding, so no helper rebinds it (wb-6njq
 * F2: a function declaration is a mutable binding). */
const rosterWitness = (pin: string): JsonValue => {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
};
/** wb-1f2w F6: true when a case's source reads the roster - the witnesses it is held to (rosterWitness), the parsed roster
 * (ROSTER) or the roster's reader (readRoster). */
const readsRoster = (source: string): boolean => /\b(?:rosterWitness|ROSTER|readRoster)\b/.test(source);
/** The intrinsic source reader, captured at load: Function.prototype.toString reads a function's own source text, which an own
 * toString a case carries never changes (wb-tnig F3). */
const INTRINSIC_SOURCE = Function.prototype.toString;
/** A case's own source text, read through the intrinsic reader (wb-tnig F3). */
const sourceOf = (fn: () => Promise<JsonValue>): string => INTRINSIC_SOURCE.call(fn);
/** The names whose call runs evaluated text (wb-tnig F3): composed text can name a roster reader without spelling it. */
const EVALUATOR = "eval";
const FUNCTION_CONSTRUCTOR = "Function";
const EVALUATORS: readonly string[] = [EVALUATOR, FUNCTION_CONSTRUCTOR];
/** The source text native code reads as - a bound function, a proxy or a built-in - which shows no source at all (wb-tnig F3). */
const NATIVE_SOURCE = /\{\s*\[native code\]\s*\}\s*$/;
/** wb-tnig F3: true when a source's code, its strings aside (read by parsing it), names an evaluator, as a name or a member. */
const evaluatesText = (source: string): boolean => {
  const code = ts.createSourceFile("case.js", `(${source})`, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const names = (node: ts.Node): boolean => (ts.isIdentifier(node) && EVALUATORS.includes(node.text)) || ts.forEachChild(node, child => (names(child) ? true : undefined)) === true;
  return names(code);
};
/** wb-1f2w F6, wb-tnig F3: why a case's source cannot vouch for the witness it returns, read over its own source before it runs:
 * it reads the roster (reads-roster), it reads as native code, as a bound case does (native-source), or its code names an
 * evaluator (evaluated-text); [] for a source the guard reads clean. */
const echoReasonsOf = (source: string): string[] =>
  [...(readsRoster(source) ? ["reads-roster"] : []), ...(NATIVE_SOURCE.test(source) ? ["native-source"] : []), ...(evaluatesText(source) ? ["evaluated-text"] : [])];
/** The objects and arrays a value holds through its enumerable own properties, itself included (wb-tnig F3; since wb-w0a4 F2 over
 * any value, so the parsed roster itself is read too). */
const objectsIn = (value: unknown): object[] => {
  if (value === null || typeof value !== "object") return [];
  const children: readonly unknown[] = Array.isArray(value) ? value : Object.values(value);
  return [value, ...children.flatMap(objectsIn)];
};
/** wb-6njq F2: the structured clone algorithm, captured at load, so the identity reading calls the one it read then. */
const CLONE: <T>(value: T) => T = structuredClone;
/** wb-6njq F2: true when the structured clone algorithm copies a value; false for one holding a proxy at any depth (the algorithm
 * refuses a proxy without running any trap of it), a function or a symbol, none of which a measured witness holds. */
const cloneable = (value: unknown): boolean => {
  try {
    CLONE(value);
    return true;
  } catch {
    return false;
  }
};
/** wb-w0a4 F2: the proxy test of node:util, captured at load like the clone, so the plain-data reading calls the one it read then; it
 * runs no trap of the proxy it is handed. */
const IS_PROXY: (value: unknown) => boolean = types.isProxy;
/** wb-w0a4 F2: true when a value is plain data at every depth: it is no function, and each object it holds is no proxy (IS_PROXY),
 * its prototype is Object.prototype, or Array.prototype for an array, and every own property it has - by any key, enumerable or not -
 * is a data property whose value is plain data in turn. Read through IS_PROXY, each object's prototype and its own property
 * descriptors only, so no accessor and no proxy trap runs at this read; and a value it accepts holds no accessor, proxy, function
 * or prototype other than those two for a later read to run (a hook such as toJSON or vitest's asymmetricMatch is found on the
 * built-in prototypes alone). A value holding a cycle is never accepted: the reading throws on it, as objectsIn does. */
const plainData = (value: unknown): boolean => {
  if (typeof value === "function") return false;
  if (value === null || typeof value !== "object") return true;
  if (IS_PROXY(value) || Object.getPrototypeOf(value) !== (Array.isArray(value) ? Array.prototype : Object.prototype)) return false;
  return Reflect.ownKeys(value).every(key => {
    const property = Object.getOwnPropertyDescriptor(value, key);
    return property !== undefined && "value" in property && plainData(property.value);
  });
};
/** wb-tnig F3, wb-6njq F2, wb-w0a4 F2: how a witness falls short of plain data the parsed roster holds no object of, read once its
 * case has run: "uncloneable" when the structured clone algorithm refuses it - a proxy at any depth, a view whose reads go to its
 * target, the roster's own objects or a copy (the gate's G11b deep view, G11's shallow one) - read no further, so no trap of it runs
 * (the clone does run each accessor it meets, once); otherwise "unplain" when it is not plain data (plainData: an accessor, the gate's
 * H22; a proxy left in place after the clone; a function at a property the clone does not read; a prototype other than the built-in
 * object or array one) - read no further, so nothing of it runs after this read; otherwise "roster-object" when it holds an object
 * of the parsed roster - of any pin's witness (its own, or another pin's: the gate's H21) or any other part of it, by whatever route
 * (a helper, a bound or an evaluated case, a shallow copy); [] for a witness showing none of the three. A witness read as [] is plain
 * data, so its later reads - the message's and the equality's - run none of its own code and read the very objects this reading
 * walked (a built-in a helper patched aside, which the header does not claim). */
const routesOf = (witness: unknown): string[] => {
  if (!cloneable(witness)) return ["uncloneable"];
  if (!plainData(witness)) return ["unplain"];
  const roster = new Set<object>(objectsIn(ROSTER));
  return objectsIn(witness).some(node => roster.has(node)) ? ["roster-object"] : [];
};
/** A helper handing a pin's witness back from the roster: E24's shape, whose callers name no roster reader (wb-tnig F3). */
const witnessOf = (pin: string): JsonValue => rosterWitness(pin);
/** wb-6njq F2: the gate's G11b deep view of a value (a proxy whose every read of a member is a deep view again) or G11's shallow
 * view (a proxy reading through to its target); a primitive is its own view. */
const viewOf = (value: JsonValue, deep: boolean): JsonValue => {
  if (value === null || typeof value !== "object") return value;
  return new Proxy(value, deep ? { get: (target, key) => viewOf(Reflect.get(target, key) as JsonValue, true) } : {});
};
/** wb-w0a4 F2: the gate's H21 cross-pin route - a helper handing back A1's witness built anew around the parsed roster's own empty
 * qa site list of pin A2's witness, an object of the roster that is no part of A1's witness. */
const foreignFor = (): JsonValue => {
  const other = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === "A2")?.witness as { sites: { qa: JsonValue } };
  return { files: { floor: true, allTs: true }, groupWord: true, sites: other.sites.qa };
};
/** wb-w0a4 F2: the gate's H22 accessor route - A1's witness built anew with its site list an accessor that hands the first three
 * reads a fresh empty list and every later read the parsed roster's own. */
const accessorFor = (pin: string): JsonValue => {
  const own = rosterWitness(pin) as { sites: JsonValue };
  let reads = 0;
  return {
    files: { floor: true, allTs: true },
    groupWord: true,
    get sites(): JsonValue {
      reads += 1;
      return reads <= 3 ? [] : own.sites;
    },
  };
};
/** wb-w0a4 F2: an accessor the structured clone runs once: it hands the clone a fresh empty list and leaves in its own place a data
 * property holding G11's shallow view of the parsed roster's own site list. */
const clonedViewFor = (pin: string): JsonValue => {
  const own = rosterWitness(pin) as { sites: JsonValue };
  const witness: JsonObject = { files: { floor: true, allTs: true }, groupWord: true };
  return Object.defineProperty(witness, "sites", {
    enumerable: true,
    configurable: true,
    get: (): JsonValue => {
      Object.defineProperty(witness, "sites", { value: viewOf(own.sites, false), enumerable: true, writable: true, configurable: true });
      return [];
    },
  });
};
/** wb-w0a4 F2: vitest's equality read consults an asymmetric match of the received value before any other comparison, so a value
 * carrying one that answers true compares equal to anything: here a non-enumerable own one (the clone and the walk read only
 * enumerable properties) on a files object of the wrong value, beside a whole A1 witness otherwise. */
const hiddenMatcherFor = (): JsonValue => ({
  files: Object.defineProperty({ floor: false, allTs: false }, "asymmetricMatch", { value: (): boolean => true }),
  groupWord: true,
  sites: [],
});
/** wb-w0a4 F2: the same asymmetric match inherited from a class prototype (an instance holding no own property at all). */
class AnswersEveryMatch {
  asymmetricMatch(): boolean {
    return true;
  }
}
const prototypeMatcherFor = (): unknown => new AnswersEveryMatch();
/** The echo guard's controls, run only by the judged set's identity reading (each hands back pin A1's witness, or a value the
 * equality read takes for it): the gate's P17 echo (three padding assertions, the witness handed back from the roster), an echo
 * through the parsed roster and one through the
 * roster read anew - one per reader the guard names; wb-tnig F3's E23 (the P17 echo bound, so its source reads as native code), an
 * echo whose own toString disguises its source, E24 (the witness handed back through a helper, the source naming no reader) and a
 * shallow copy of it; R-INLINE-ECHO, the P17 echo with its witness copied inline; and wb-6njq F2's views of the witness through a
 * helper: the gate's G11b deep view, G11's shallow view and a shallow view over a deep copy; wb-w0a4 F2's H21 and H22 routes, the
 * accessor the clone runs once and the two asymmetric matches. */
const ECHOES: Readonly<Record<string, () => Promise<JsonValue>>> = {
  rosterRowsEcho: async () => ROSTER.rows[0]?.pins[0]?.witness ?? null,
  rereadEcho: async () => readRoster().rows[0]?.pins[0]?.witness ?? null,
  rosterEcho: async () => {
    expect(0).toBe(0);
    expect(0).toBe(0);
    expect(0).toBe(0);
    return rosterWitness("A1");
  },
  boundEcho: (async () => {
    expect(0).toBe(0);
    expect(0).toBe(0);
    expect(0).toBe(0);
    return rosterWitness("A1");
  }).bind(null),
  disguisedEcho: Object.assign(async () => rosterWitness("A1"), { toString: () => "async () => ({})" }),
  helperEcho: async () => witnessOf("A1"),
  copiedEcho: async () => Object.assign({}, witnessOf("A1")),
  "R-INLINE-ECHO": async () => {
    expect(0).toBe(0);
    expect(0).toBe(0);
    expect(0).toBe(0);
    return { files: { floor: true, allTs: true }, groupWord: true, sites: [] };
  },
  deepViewEcho: async () => viewOf(witnessOf("A1"), true),
  shallowViewEcho: async () => viewOf(witnessOf("A1"), false),
  copyViewEcho: async () => viewOf(structuredClone(witnessOf("A1")), false),
  // wb-w0a4 F2: the gate's H21 and H22 routes, A1's padded case handing back what each helper builds; the accessor the clone runs
  // once; and the two asymmetric matches, which compare equal to any witness.
  crossPinEcho: async () => {
    expect(0).toBe(0);
    expect(0).toBe(0);
    expect(0).toBe(0);
    return foreignFor();
  },
  accessorEcho: async () => {
    expect(0).toBe(0);
    expect(0).toBe(0);
    expect(0).toBe(0);
    return accessorFor("A1");
  },
  clonedViewEcho: async () => clonedViewFor("A1"),
  hiddenMatcherEcho: async () => hiddenMatcherFor(),
  prototypeMatcherEcho: async () => prototypeMatcherFor() as JsonValue,
};
/** wb-tnig F3: the evaluated-text echo controls, as source texts whose evaluator is composed from its name at runtime, so this file
 * runs no evaluated text and spells no evaluator call: the gate's E22 (a direct call composing the reader's name), the Function
 * constructor's form, and a quiet text naming an evaluator only inside a string. */
const EVALUATED_ECHOES: Readonly<Record<string, () => string>> = {
  composedReader: () => `async () => {\n  return ${EVALUATOR}("roster" + "Witness")("A1");\n}`,
  constructedFunction: () => `async () => new ${FUNCTION_CONSTRUCTOR}("return 1")()`,
  quietString: () => `async () => ({ note: "${EVALUATOR} is named in a string only" })`,
};
/** wb-6njq F2: true when a value and every object and array it holds are frozen. */
const frozenThroughout = (value: unknown): boolean =>
  value === null || typeof value !== "object" || (Object.isFrozen(value) && Object.values(value).every(frozenThroughout));
/** wb-6njq F2: the gate's G12 roster swap - a helper setting a pin's witness in the parsed roster to a copy of it - read as
 * "refused" when the write throws a TypeError (a frozen roster), "swapped" when it lands. */
function swapReading(roster: Roster, pin: string): string {
  const entry = roster.rows.flatMap(row => row.pins).find(item => item.id === pin);
  if (entry === undefined) throw new Error(`the roster holds no pin ${pin}`);
  try {
    (entry as { witness: JsonValue }).witness = structuredClone(entry.witness);
    return "swapped";
  } catch (error) {
    return error instanceof TypeError ? "refused" : "other";
  }
}
/** wb-6njq F2: every binding each pin's runner reads - its tables (IMPL, REACHED), the parsed roster, the witness reader, the source
 * guard's readers and the values they read, and the identity reading's readers and the clone they call. */
const RUNNER_BINDINGS: readonly string[] = [
  "IMPL", "REACHED", "ROSTER", "rosterWitness", "readsRoster", "INTRINSIC_SOURCE", "sourceOf", "NATIVE_SOURCE", "EVALUATORS", "evaluatesText",
  "echoReasonsOf", "objectsIn", "CLONE", "cloneable", "IS_PROXY", "plainData", "routesOf",
];
/** wb-6njq F2: how a file of test declares each name at its top level - "const", "let", "var", "function" or "missing". */
function bindingKindsOf(file: string, names: readonly string[]): JsonObject {
  const source = parsed(file, textOf(scanOf("test"), file));
  const kinds = new Map<string, string>();
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) kinds.set(statement.name.text, "function");
    if (ts.isVariableStatement(statement)) {
      const flags = statement.declarationList.flags;
      const kind = (flags & ts.NodeFlags.Const) !== 0 ? "const" : (flags & ts.NodeFlags.Let) !== 0 ? "let" : "var";
      for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) kinds.set(declaration.name.text, kind);
    }
  }
  return Object.fromEntries(names.map(name => [name, kinds.get(name) ?? "missing"]));
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
    const provider = textOf(scanOf("src"), PROVIDER);
    const environment = (text: string): string[] => violationsOf({ ...real, statics: staticRecord({ [PROVIDER]: text }) });
    const witness = {
      toolsFlag: changed({ ...spawn, argv: [...spawn.argv, "--tools", "/fixture/tools.json"] }),
      reachableCall: changed({ ...spawn, argv: ["--workspace", FIXTURE_ROOT, WORD.group, WORD.verb, "--render", "r1", "--tools", "/fixture/tools.json", "--json"] }),
      toolsVariable: changed({ ...spawn, env: [...spawn.env, "RF_TOOLS"].sort() }),
      pipedStdin: changed({ ...spawn, stdin: "pipe" }),
      // wb-roxk F4 (S09): a tools flag gated on the parent environment reds while the variable is unset where this census runs,
      // in every shape the environment reader takes: the gate's own argv edit, a destructuring, a computed read, an alias, env
      // imported from node:process, and the whole environment handed to the child outside the allowlist channel.
      envGatedFlag: environment(replaced(provider, ARGV_STATEMENT, ENV_GATED_STATEMENT)),
      destructuredRead: environment(`${provider}\nexport function toolsFile(): string | undefined {\n  const { PI_TOOLS } = process.env;\n  return PI_TOOLS;\n}\n`),
      computedRead: environment(`${provider}\nexport const toolsOf = (name: string): string | undefined => process.env[name];\n`),
      aliasedEnvironment: environment(`${provider}\nconst parent = process.env;\nexport const toolsFile = (): string | undefined => parent.PI_TOOLS;\n`),
      importedEnvironment: environment(`import { env } from "node:process";\n${provider}\nexport const toolsFile = (): string | undefined => env.PI_TOOLS;\n`),
      unscrubbedChild: environment(replaced(provider, ALLOWLIST_CALL, "{...process.env}")),
      destructuredProcess: environment(`${provider}\nexport function toolsFile(): string | undefined {\n  const { env } = process;\n  return env.PI_TOOLS;\n}\n`),
      globalEnvironment: environment(`${provider}\nexport const toolsFile = (): string | undefined => globalThis.process.env.PI_TOOLS;\n`),
      reflectedEnvironment: environment(`${provider}\nexport const toolsFile = (): unknown => Reflect.get(process, "env");\n`),
      // wb-1f2w F1/F2: a runtime value load of the process module - the gate's P11 dynamic import and P12 require, the bare
      // specifier, a require createRequire returns - and a value re-export of it are environment uses.
      dynamicProcessImport: environment(`${provider}\nexport const p11 = async (): Promise<string | undefined> => (await import("node:process")).env.PI_TOOLS;\n`),
      requiredProcess: environment(`${provider}\nexport const p12 = (): string | undefined => require("node:process").env.PI_TOOLS;\n`),
      bareProcessImport: environment(`${provider}\nexport const toolsFile = async (): Promise<string | undefined> => (await import("process")).env.PI_TOOLS;\n`),
      createRequiredProcess: environment(`import { createRequire } from "node:module";\n${provider}\nexport const toolsFile = (): string | undefined => createRequire(import.meta.url)("node:process").env.PI_TOOLS;\n`),
      reexportedProcess: environment(`${provider}\nexport { env } from "node:process";\n`),
      // wb-tnig F1: the process module loaded through the built-in module loader (the gate's E01 probe; on globalThis.process with
      // the bare specifier; by a quoted key run by its call method) and through every other loader member the reading names -
      // require on the main module and on require.main, createRequire read as a member of the module namespace, the module
      // system's _load - is an environment use.
      builtinProcess: environment(`${provider}\nexport const e01 = (): string | undefined => process.getBuiltinModule("node:process").env.PI_TOOLS;\n`),
      builtinGlobal: environment(`${provider}\nexport const toolsFile = (): string | undefined => globalThis.process.getBuiltinModule("process").env.PI_TOOLS;\n`),
      builtinKeyedCall: environment(`${provider}\nexport const toolsFile = (): string | undefined => process["getBuiltinModule"].call(null, "node:process").env.PI_TOOLS;\n`),
      mainModuleProcess: environment(`${provider}\nexport const toolsFile = (): string | undefined => process.mainModule?.require("node:process").env.PI_TOOLS;\n`),
      mainRequireProcess: environment(`${provider}\nexport const toolsFile = (): string | undefined => require.main?.require("node:process").env.PI_TOOLS;\n`),
      namespaceCreateRequire: environment(`import * as nodeModule from "node:module";\n${provider}\nexport const toolsFile = (): string | undefined => nodeModule.createRequire(import.meta.url)("node:process").env.PI_TOOLS;\n`),
      internalLoadProcess: environment(`import { Module } from "node:module";\n${provider}\nexport const toolsFile = (): string | undefined => Module._load("node:process").env.PI_TOOLS;\n`),
      // wb-6njq F1: the process module loaded by a loader reached through await is an environment use.
      awaitedProcessLoad: environment(`${provider}\nexport const toolsFile = async (): Promise<string | undefined> => (await require)("node:process").env.PI_TOOLS;\n`),
    };
    expect(witness).toStrictEqual({
      toolsFlag: ["tools"], reachableCall: ["group:inference", "commit", "tools", "flag:--render"], toolsVariable: ["env"], pipedStdin: ["stdin"],
      envGatedFlag: ["env-read"], destructuredRead: ["env-read"], computedRead: ["env-read"], aliasedEnvironment: ["env-read"], importedEnvironment: ["env-read"],
      unscrubbedChild: ["env-read"], destructuredProcess: ["env-read"], globalEnvironment: ["env-read"], reflectedEnvironment: ["env-read"],
      dynamicProcessImport: ["env-read"], requiredProcess: ["env-read"], bareProcessImport: ["env-read"], createRequiredProcess: ["env-read"], reexportedProcess: ["env-read"],
      builtinProcess: ["env-read"], builtinGlobal: ["env-read"], builtinKeyedCall: ["env-read"], mainModuleProcess: ["env-read"], mainRequireProcess: ["env-read"],
      namespaceCreateRequire: ["env-read"], internalLoadProcess: ["env-read"], awaitedProcessLoad: ["env-read"],
    });
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
      // wb-roxk F2 (S01): a runtime load whose specifier is computed is never read as clean - the gate's own array join, a
      // concatenation, a method call and a variable.
      managerJoined: wired({ [PROVIDER]: `${provider}\nexport const s01 = () => import(["../../agent", "manager.js"].join("-"));\n` }),
      runnerConcatenated: wired({ [PROVIDER]: `${provider}\nexport const runner = () => import("../../agent-" + "runner.js");\n` }),
      managerConcatCall: wired({ [PROVIDER]: `${provider}\nexport const manager = () => import("../../agent-".concat("manager.js"));\n` }),
      runnerRequired: wired({ [PROVIDER]: `${provider}\nconst runnerPath = "../../agent-runner.js";\nexport const runner = () => require(runnerPath);\n` }),
      // ...and a literal load through a require createRequire returns, called in place, is a load the closure walk follows.
      managerCreateRequire: wired({ [PROVIDER]: `import { createRequire } from "node:module";\n${provider}\nexport const manager = () => createRequire(import.meta.url)("../../agent-manager.js");\n` }),
      // wb-roxk F3 (S02): rf launched through a shell or a wrapper - the gate's own shell launcher in a second module, an env
      // wrapper, a shell command string, and the provider's own launch moved behind a shell.
      shellLauncher: wired({ "src/workbench/providers/s02-shell.ts": 'import { spawn } from "node:child_process";\nexport const s02 = () => spawn("sh", ["-c", "rf context render --no-commit --tools /fixture/tools.json"]);\n' }),
      envWrapper: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = () => spawn("env", ["rf", "context", "render", "--no-commit"]);\n' }),
      shellCommand: wired({ [SECOND_MODULE]: 'import { execSync } from "node:child_process";\nexport const again = () => execSync("cd /fixture/rf-workspace && rf context render --no-commit");\n' }),
      providerShell: wired({ [PROVIDER]: replaced(provider, DIRECT_SPAWN, 'spawn("sh",["-c",["rf",...argv].join(" ")],') }),
      // wb-1f2w F3: require called indirectly - the gate's P03 call, apply, Reflect.apply and a comma operand - is a load the walk
      // follows, and one handing over no literal specifier is a computed load.
      managerRequireCall: wired({ [PROVIDER]: `${provider}\nexport const p03 = () => require.call(null, "../../agent-manager.js");\n` }),
      managerRequireApply: wired({ [PROVIDER]: `${provider}\nexport const manager = () => require.apply(null, ["../../agent-manager.js"]);\n` }),
      managerReflectApply: wired({ [PROVIDER]: `${provider}\nexport const manager = () => Reflect.apply(require, null, ["../../agent-manager.js"]);\n` }),
      managerCommaCall: wired({ [PROVIDER]: `${provider}\nexport const manager = () => (0, require)("../../agent-manager.js");\n` }),
      runnerComputedCall: wired({ [PROVIDER]: `${provider}\nconst runnerPath = "../../agent-runner.js";\nexport const runner = () => require.call(null, runnerPath);\n` }),
      runnerComputedApply: wired({ [PROVIDER]: `${provider}\nconst runnerPaths = ["../../agent-runner.js"];\nexport const runner = () => require.apply(null, runnerPaths);\n` }),
      // wb-1f2w F5: a launcher renamed at its import (the gate's P08 module), destructured, bound to a declaration, read by a
      // quoted key or through a comma operand launches rf as the launcher itself does.
      renamedLauncher: wired({ "src/workbench/providers/p08-alias.ts": 'import { spawn as run } from "node:child_process";\nexport const p08 = () => run("sh", ["-c", "rf context render --no-commit --tools /fixture/tools.json"]);\n' }),
      renamedDirect: wired({ [SECOND_MODULE]: 'import { spawn as launch } from "node:child_process";\nexport const again = (argv: string[]) => launch("rf", argv);\n' }),
      destructuredLauncher: wired({ [SECOND_MODULE]: 'const { "execSync": shell } = require("node:child_process");\nexport const again = () => shell("rf context render --no-commit");\n' }),
      boundLauncher: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nexport function again(argv: string[]) {\n  const run = launch;\n  return run("rf", argv);\n}\nconst launch = childProcess.spawn as typeof childProcess.spawn;\n' }),
      keyedLauncher: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nexport const again = (argv: string[]) => childProcess["spawn"]("rf", argv);\n' }),
      commaLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[]) => (0, spawn)("rf", argv);\n' }),
      memberLauncher: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nexport const again = (argv: string[]) => childProcess.spawn("rf", argv);\n' }),
      // ...and every wrapper unwrapped reads (parentheses, a comma operand, as, satisfies, a <T> assertion, a non-null !), one chain
      // per reading, beside module.require (no control pinned it at the base).
      launcherTypeWrapped: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[]) => (((0, (<typeof spawn>spawn)!) as typeof spawn) satisfies typeof spawn)("rf", argv);\n' }),
      managerTypeWrapped: wired({ [PROVIDER]: `${provider}\nexport const manager = () => (((0, (<NodeRequire>require)!) as NodeRequire) satisfies NodeRequire)("../../agent-manager.js");\n` }),
      managerModuleRequire: wired({ [PROVIDER]: `${provider}\nexport const manager = () => module.require("../../agent-manager.js");\n` }),
      // wb-tnig F1: a computed specifier handed to the built-in module loader is a computed load; and INFO F4's E07 and E09 (require's
      // call method and Reflect.apply, each read by a quoted key) are loads the walk follows, as the loader members read by one are.
      builtinComputed: wired({ [PROVIDER]: `${provider}\nconst toolsModule = "node:process";\nexport const toolsFile = (): unknown => process.getBuiltinModule(toolsModule);\n` }),
      managerRequireKeyedCall: wired({ [PROVIDER]: `${provider}\nexport const e07 = () => require["call"](null, "../../agent-manager.js");\n` }),
      managerReflectKeyedApply: wired({ [PROVIDER]: `${provider}\nexport const e09 = () => Reflect["apply"](require, null, ["../../agent-manager.js"]);\n` }),
      // wb-tnig F2: a launcher picked by a conditional (the gate's E11 module), bound from an array pattern (E13) or a logical
      // initializer (E14), picked by || or &&, by an assignment used in place, as an element of an array literal or of a name bound
      // to one (by an index or a quoted index), bound by an object pattern over an array or iterated from an array, launches rf as
      // the launcher itself does; and a conditional's launcher through a shell is a wrapped launch.
      conditionalLauncher: wired({ "src/workbench/providers/e11-pick.ts": 'import { execFile, spawn } from "node:child_process";\nexport const e11 = (argv: string[]) => (argv.length > 0 ? spawn : execFile)("rf", argv);\n' }),
      arrayPatternLauncher: wired({ "src/workbench/providers/e13-array.ts": 'import { spawn } from "node:child_process";\nconst [run] = [spawn];\nexport const e13 = (argv: string[]) => run("rf", argv);\n' }),
      logicalLauncher: wired({ "src/workbench/providers/e14-either.ts": 'import { execFile, spawn } from "node:child_process";\nconst run = spawn ?? execFile;\nexport const e14 = (argv: string[]) => run("rf", argv);\n' }),
      orLauncher: wired({ [SECOND_MODULE]: 'import { execFile, spawn } from "node:child_process";\nexport const again = (argv: string[]) => (spawn || execFile)("rf", argv);\n' }),
      andLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[]) => (argv.length > 0 && spawn)("rf", argv);\n' }),
      assignedLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nlet run: typeof spawn | undefined;\nexport const again = (argv: string[]) => (run = spawn)("rf", argv);\n' }),
      elementLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[]) => [spawn][0]("rf", argv);\n' }),
      heldArrayLauncher: wired({ [SECOND_MODULE]: 'import { execFile, spawn } from "node:child_process";\nconst launchers = [execFile, spawn];\nexport const again = (argv: string[]) => launchers[1]("rf", argv);\n' }),
      objectPatternLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst { 0: run } = [spawn];\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      iteratedLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport function again(argv: string[]) {\n  for (const run of [spawn]) run("rf", argv);\n}\n' }),
      conditionalWrapped: wired({ [SECOND_MODULE]: 'import { spawn, spawnSync } from "node:child_process";\nexport const again = (sync: boolean) => (sync ? spawnSync : spawn)("sh", ["-c", "rf context render --no-commit"]);\n' }),
      keyedElementLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst launchers = [spawn];\nexport const again = (argv: string[]) => launchers["0"]("rf", argv);\n' }),
      // wb-6njq F1: a launcher bound as a binding element's own default value - the gate's G01 (an array pattern) and G02 (an object
      // pattern) modules, an element renamed, nested in a defaulted pattern, in a for...of declaration (the gate's G04), in a
      // parameter's pattern or in a catch clause - or as a parameter's own default value (the gate's G32 boundary control), and one
      // reached through await (the gate's G03 module, an awaited alias), launches rf as the launcher itself does; and a loader
      // reached through await is a load the closure walk follows.
      arrayDefaultLauncher: wired({ "src/workbench/providers/g01-default.ts": 'import { spawn } from "node:child_process";\nconst [run = spawn] = [];\nexport const g01 = (argv: string[]) => run("rf", argv);\n' }),
      objectDefaultLauncher: wired({ "src/workbench/providers/g02-default.ts": 'import { spawn } from "node:child_process";\nconst { run = spawn }: { run?: typeof spawn } = {};\nexport const g02 = (argv: string[]) => run("rf", argv);\n' }),
      renamedDefaultLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst { launcher: run = spawn }: { launcher?: typeof spawn } = {};\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      nestedDefaultLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst [{ run = spawn } = {}] = [] as { run?: typeof spawn }[];\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      iteratedDefaultLauncher: wired({ "src/workbench/providers/g04-loopdefault.ts": 'import { spawn } from "node:child_process";\nexport function g04(argv: string[]) { for (const [run = spawn] of [[]]) run("rf", argv); }\n' }),
      parameterPatternLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[], { run = spawn }: { run?: typeof spawn } = {}) => run("rf", argv);\n' }),
      catchDefaultLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport function again(argv: string[]) {\n  try {\n    throw {};\n  } catch ({ run = spawn }) {\n    return run("rf", argv);\n  }\n}\n' }),
      parameterDefaultLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const g32 = (argv: string[], run = spawn) => run("rf", argv);\n' }),
      awaitedLauncher: wired({ "src/workbench/providers/g03-await.ts": 'import { spawn } from "node:child_process";\nexport const g03 = async (argv: string[]) => (await spawn)("rf", argv);\n' }),
      awaitedAlias: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport async function again(argv: string[]) {\n  const run = await spawn;\n  return run("rf", argv);\n}\n' }),
      awaitedLoader: wired({ [PROVIDER]: `${provider}\nexport const manager = async () => (await require)("../../agent-manager.js");\n` }),
      // wb-w0a4 F1: a launcher bound by an import-equals declaration (the gate's H11 module; a chain of them, through a shell; an
      // identifier naming spawn, or a renamed import of it, which a module augmentation makes a namespace too, or a local function
      // named spawn merged with a namespace, read by its own name as launcherOf reads one) or keyed by a computed string literal in
      // a destructuring (the gate's H12 module; a template literal; parentheses and as, through a shell) launches rf as the launcher
      // itself does.
      importAliasLauncher: wired({ "src/workbench/providers/h11-import-alias.ts": 'import * as childProcess from "node:child_process";\nimport run = childProcess.spawn;\nexport const h11 = (argv: string[]) => run("rf", argv);\n' }),
      importAliasChainShell: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nimport processes = childProcess;\nimport shell = processes.execSync;\nexport const again = () => shell("cd /fixture/rf-workspace && rf context render --no-commit");\n' }),
      augmentedAliasLauncher: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\ndeclare module "node:child_process" {\n  namespace spawn {}\n}\nimport run = spawn;\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      augmentedRenamedAlias: wired({ [SECOND_MODULE]: 'import { spawn as launch } from "node:child_process";\ndeclare module "node:child_process" {\n  namespace spawn {}\n}\nimport run = launch;\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      mergedLocalAlias: wired({ [SECOND_MODULE]: 'import { spawn as launch } from "node:child_process";\nfunction spawn(command: string, argv: string[]) {\n  return launch(command, argv);\n}\nnamespace spawn {}\nimport run = spawn;\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      literalKeyLauncher: wired({ "src/workbench/providers/h12-literal-computed-key.ts": 'import * as childProcess from "node:child_process";\nconst { ["spawn"]: run } = childProcess;\nexport const h12 = (argv: string[]) => run("rf", argv);\n' }),
      templateKeyLauncher: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nconst { [`spawn`]: run } = childProcess;\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      wrappedKeyShell: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nconst { [("spawn" as const)]: run } = childProcess;\nexport const again = () => run("sh", ["-c", "rf context render --no-commit"]);\n' }),
    };
    // An orchestrator wired in brings its own environment reads into the launch closure (the agent runner's session directory and
    // the agent directory's variable), so F4 reads them beside it.
    expect(witness).toStrictEqual({
      respawn: ["respawn"], loopedLaunch: ["loop"], runnerImport: ["orchestrator", "env-read"], managerDynamic: ["orchestrator", "env-read"], secondLauncher: ["launches"],
      managerJoined: ["computed-load"], runnerConcatenated: ["computed-load"], managerConcatCall: ["computed-load"], runnerRequired: ["computed-load"],
      managerCreateRequire: ["orchestrator", "env-read"],
      shellLauncher: ["launches", "wrapped"], envWrapper: ["launches", "wrapped"], shellCommand: ["launches", "wrapped"], providerShell: ["wrapped"],
      managerRequireCall: ["orchestrator", "env-read"], managerRequireApply: ["orchestrator", "env-read"], managerReflectApply: ["orchestrator", "env-read"],
      managerCommaCall: ["orchestrator", "env-read"], runnerComputedCall: ["computed-load"], runnerComputedApply: ["computed-load"],
      renamedLauncher: ["launches", "wrapped"], renamedDirect: ["launches"], destructuredLauncher: ["launches"], boundLauncher: ["launches"],
      keyedLauncher: ["launches"], commaLauncher: ["launches"], memberLauncher: ["launches"], launcherTypeWrapped: ["launches"],
      managerTypeWrapped: ["orchestrator", "env-read"], managerModuleRequire: ["orchestrator", "env-read"],
      builtinComputed: ["computed-load"], managerRequireKeyedCall: ["orchestrator", "env-read"], managerReflectKeyedApply: ["orchestrator", "env-read"],
      conditionalLauncher: ["launches"], arrayPatternLauncher: ["launches"], logicalLauncher: ["launches"], orLauncher: ["launches"], andLauncher: ["launches"],
      assignedLauncher: ["launches"], elementLauncher: ["launches"], heldArrayLauncher: ["launches"], objectPatternLauncher: ["launches"],
      iteratedLauncher: ["launches", "loop"], conditionalWrapped: ["launches", "wrapped"], keyedElementLauncher: ["launches"],
      arrayDefaultLauncher: ["launches"], objectDefaultLauncher: ["launches"], renamedDefaultLauncher: ["launches"], nestedDefaultLauncher: ["launches"],
      iteratedDefaultLauncher: ["launches", "loop"], parameterPatternLauncher: ["launches"], catchDefaultLauncher: ["launches"],
      parameterDefaultLauncher: ["launches"], awaitedLauncher: ["launches"], awaitedAlias: ["launches"], awaitedLoader: ["orchestrator", "env-read"],
      importAliasLauncher: ["launches"], importAliasChainShell: ["launches", "wrapped"], augmentedAliasLauncher: ["launches"], augmentedRenamedAlias: ["launches"],
      mergedLocalAlias: ["launches"], literalKeyLauncher: ["launches"], templateKeyLauncher: ["launches"], wrappedKeyShell: ["launches", "wrapped"],
    });
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
      // wb-roxk quiet controls of F2-F4: a literal runtime load of a closure module, a shell launcher running no rf, rf inside a
      // word, an option value and a path of a launcher's arguments, and the parent environment read outside the launch closure.
      literalLoad: wired({ [PROVIDER]: `${provider}\nexport const redaction = () => import("../redaction.js");\n` }),
      shellOther: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const status = () => spawn("sh", ["-c", "git status --porcelain"]);\n' }),
      rfInsideWords: wired({ [SECOND_MODULE]: 'import { execFileSync } from "node:child_process";\nexport const log = () => execFileSync("git", ["log", "--format=rf", "--", "/fixture/rf.log", "surf"]);\n' }),
      environmentOutside: wired({ [SECOND_MODULE]: "export const home = (): string | undefined => process.env.HOME;\n" }),
      // RESIDUALS (the HARDENING block): each escape stays unread, so its row is quiet, and the row reds when that changes.
      "R-ALIASED-LOADER": wired({ [PROVIDER]: `import { createRequire } from "node:module";\n${provider}\nconst load = createRequire(import.meta.url);\nexport const manager = () => load("../../agent-manager.js");\n` }),
      "R-VARIABLE-COMMAND": wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst command = ["rf", "context", "render"].join(" ");\nexport const again = () => spawn("sh", ["-c", command]);\n' }),
      "R-EVALUATED-ENV": wired({ [PROVIDER]: `${provider}\nexport const toolsFile = (): unknown => new Function("return process.env.PI_TOOLS")();\n` }),
      // wb-1f2w quiet controls: the process module in type positions only, the call method and Reflect.apply of a function that is
      // no loader, and a renamed import of no launcher; then wb-1f2w's residual rows (the HARDENING block).
      processTypes: wired({ [PROVIDER]: `${provider}\nexport type ProcessModule = typeof import("node:process");\nexport type { Process } from "node:process";\n` }),
      nonLoaderCall: wired({ [PROVIDER]: `${provider}\nconst echoPath = (path: string): string => path;\nexport const manager = () => echoPath.call(null, "../../agent-manager.js");\nexport const reflected = () => Reflect.apply(echoPath, null, ["../../agent-manager.js"]);\n` }),
      renamedOther: wired({ [SECOND_MODULE]: 'import { readFileSync as run } from "node:fs";\nexport const again = () => run("rf context render --no-commit");\n' }),
      "R-EVALUATED-LOAD": wired({ [PROVIDER]: `${provider}\nexport const p04 = () => new Function("return import('../../agent-manager.js')")();\n` }),
      "R-INDIRECT-LOADER": wired({ [PROVIDER]: `${provider}\nexport const manager = () => require.bind(null)("../../agent-manager.js");\n` }),
      "R-PASSED-LAUNCHER": wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nconst launchers = { run: spawn };\nexport const again = (argv: string[]) => launchers.run("rf", argv);\n' }),
      // wb-tnig quiet controls: the built-in module loader handed a module other than process, and a conditional, a logical
      // expression and arrays of no launcher; then wb-tnig's residual row (the HARDENING block).
      builtinOther: wired({ [PROVIDER]: `${provider}\nexport const fsModule = (): unknown => process.getBuiltinModule("node:fs");\n` }),
      otherAlternatives: wired({ [SECOND_MODULE]: 'import { readFileSync, statSync } from "node:fs";\nconst [read] = [readFileSync];\nexport const pick = (flag: boolean) => (flag ? readFileSync : statSync)("rf");\nexport const first = () => [statSync][0]("rf");\nexport const either = () => (read ?? statSync)("rf");\n' }),
      "R-COMPUTED-LAUNCHER": wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nconst method = "spawn";\nexport const again = (argv: string[]) => childProcess[method]("rf", argv);\n' }),
      // wb-6njq quiet controls: binding-element and parameter defaults and awaits of no launcher; then R-PASSED-LAUNCHER's three members
      // the new readings border (the HARDENING block): a launcher its caller hands in as a parameter's argument, an awaited call's
      // result, and a destructuring assignment's default (an assignment pattern is no binding: a later assignment).
      otherDefaults: wired({ [SECOND_MODULE]: 'import { readFileSync, statSync } from "node:fs";\nconst [read = readFileSync] = [];\nexport const first = () => read("rf");\nexport const pick = (stat = statSync) => stat("rf");\nexport const awaited = async () => (await statSync)("rf");\n' }),
      passedArgument: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = (argv: string[], run: typeof spawn) => run("rf", argv);\nexport const caller = (argv: string[]) => again(argv, spawn);\n' }),
      awaitedReturn: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nexport const again = async (argv: string[]) => (await Promise.resolve(spawn))("rf", argv);\n' }),
      assignedDefault: wired({ [SECOND_MODULE]: 'import { spawn } from "node:child_process";\nlet run: typeof spawn | undefined;\n[run = spawn] = [];\nexport const again = (argv: string[]) => run?.("rf", argv);\n' }),
      // wb-w0a4 quiet controls: import-equals aliases (of a member and of a namespace) and a computed literal key of no launcher;
      // then the two members the new readings border (the HARDENING block): R-COMPUTED-LAUNCHER's key held in a variable as a
      // destructuring's computed key, and R-PASSED-LAUNCHER's object property as a namespace's exported import-equals alias read as
      // its member.
      otherKeys: wired({ [SECOND_MODULE]: 'import * as fs from "node:fs";\nimport read = fs.readFileSync;\nimport files = fs;\nconst { ["statSync"]: stat } = fs;\nexport const first = () => read("rf");\nexport const second = () => stat("rf");\nexport const third = () => files.lstatSync("rf");\n' }),
      variableKey: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nconst method = "spawn";\nconst { [method]: run } = childProcess;\nexport const again = (argv: string[]) => run("rf", argv);\n' }),
      namespaceAlias: wired({ [SECOND_MODULE]: 'import * as childProcess from "node:child_process";\nexport namespace launchers {\n  export import run = childProcess.spawn;\n}\nexport const again = (argv: string[]) => launchers.run("rf", argv);\n' }),
    };
    expect(Object.values(witness)).toEqual(Object.keys(witness).map(() => []));
    return witness;
  },
};

describe("wb-tz4r.5 RI observation authority census (RI-UNIFIED-DECISION-INFERENCE-R5, gated on RI-DEC-04/10, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", async () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:3", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(COVERS).sort(), "every pin carries covered phrases of its clause").toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ allowlistChannel: ALLOWLIST_CHANNEL, rfCommand: RF_COMMAND.toString(), exportFile: EXPORT_FILE }).toStrictEqual({ ...ROSTER.wiring });
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
    // wb-1f2w F6, wb-tnig F3: the guard each pin's runner applies, over each echo control's own source: the gate's P17 shape (a
    // padded case handing back its roster witness), an echo through each other roster reader and the disguised echo read as reading
    // the roster, E23's bound echo as native code, E22's composed reader and the Function constructor as evaluated text; E24's
    // helper echo and its shallow copy, R-INLINE-ECHO (its pinned quiet row), a string naming an evaluator and wb-6njq F2's three
    // views read as none.
    expect(Object.fromEntries(Object.entries(ECHOES).map(([name, echo]) => [name, echoReasonsOf(sourceOf(echo))]))).toStrictEqual({
      rosterRowsEcho: ["reads-roster"], rereadEcho: ["reads-roster"], rosterEcho: ["reads-roster"], boundEcho: ["native-source"],
      disguisedEcho: ["reads-roster"], helperEcho: [], copiedEcho: [], "R-INLINE-ECHO": [], deepViewEcho: [], shallowViewEcho: [], copyViewEcho: [],
      crossPinEcho: [], accessorEcho: [], clonedViewEcho: [], hiddenMatcherEcho: [], prototypeMatcherEcho: [],
    });
    expect(Object.fromEntries(Object.entries(EVALUATED_ECHOES).map(([name, text]) => [name, echoReasonsOf(text())]))).toStrictEqual({
      composedReader: ["evaluated-text"], constructedFunction: ["evaluated-text"], quietString: [],
    });
    // wb-6njq F2: the parsed roster is frozen throughout, so the gate's G12 swap throws, and every binding the runner reads is a const
    // binding, so no helper rebinds one.
    expect({ frozen: frozenThroughout(ROSTER), swap: swapReading(ROSTER, "A1"), bindings: bindingKindsOf(SELF, RUNNER_BINDINGS) }).toStrictEqual({
      frozen: true, swap: "refused", bindings: Object.fromEntries(RUNNER_BINDINGS.map(name => [name, "const"])),
    });
    // ...and the identity reading over what each echo hands back: every route to the roster's own witness holds one of its objects,
    // E24's helper echo and its shallow copy included, while the roster read anew and R-INLINE-ECHO hand back whole copies; and
    // (wb-6njq F2) each view - the gate's G11b deep view, G11's shallow one and the view over a copy - is a proxy the structured
    // clone algorithm refuses; (wb-w0a4 F2) another pin's roster object reads as a roster object (the gate's H21), and the gate's
    // H22 accessor, the view an accessor leaves in place after the clone and both asymmetric matches read as unplain.
    const handedBack: JsonObject = {};
    for (const [name, echo] of Object.entries(ECHOES)) handedBack[name] = routesOf(await echo());
    expect(handedBack).toStrictEqual({
      rosterRowsEcho: ["roster-object"], rereadEcho: [], rosterEcho: ["roster-object"], boundEcho: ["roster-object"], disguisedEcho: ["roster-object"],
      helperEcho: ["roster-object"], copiedEcho: ["roster-object"], "R-INLINE-ECHO": [], deepViewEcho: ["uncloneable"], shallowViewEcho: ["uncloneable"],
      copyViewEcho: ["uncloneable"], crossPinEcho: ["roster-object"], accessorEcho: ["unplain"], clonedViewEcho: ["unplain"], hiddenMatcherEcho: ["unplain"],
      prototypeMatcherEcho: ["unplain"],
    });
    // wb-w0a4 F2: any other part of the parsed roster reads as one of its objects too - its catalog list, beside a copy of it.
    expect([routesOf({ catalogs: ROSTER.knownCatalogs }), routesOf({ catalogs: [...ROSTER.knownCatalogs] })]).toStrictEqual([["roster-object"], []]);
  });

  it("the outside anchor: the owner filing's export row holds the three clauses, the three spellings and every pin's own words", () => {
    const row = exportRow(BEAD);
    const title = typeof row.title === "string" ? row.title : "";
    const notes = typeof row.notes === "string" ? row.notes : "";
    const reading = anchorOf(notes);
    expect([row.id, title.includes(RI_PIN), notes.includes(RI_PIN)], "the row read is the owner filing, pinned in its title and its notes").toEqual([BEAD, true, true]);
    const quiet: Coverage = { outside: [], uncovered: [], withoutOwnWord: [] };
    expect(reading.labels, "each clause of the filing, its three spellings as placeholders, equals its row label").toEqual(ROWS.map(entry => entry.label));
    expect(reading.digests, "the spellings the filing quotes against the composed alternatives").toEqual(SPELLINGS.map(spelling => sha256(acceptanceText(spelling))));
    expect(reading.digests, "the spellings the filing quotes against the roster digests").toEqual(ROSTER.spellings.map(entry => entry.sha256));
    expect(reading.coverage, "every clause word covered by its row's pins, each pin with a word of its own").toStrictEqual(Object.fromEntries(ROWS.map(entry => [entry.label.charAt(1), quiet])));
    // Controls: an appended acceptance line leaves the reading unchanged; a pin dropped from its row and a word no phrase covers
    // each show in the coverage.
    const appended = anchorOf(`${notes}\nAcceptance: (a) a later line; (b) another one\n`);
    const rowC = reading.labels[2] ?? "";
    const droppedPin = coverageOf(rowC, ROWS.map(entry => (entry.id === "C" ? { ...entry, pins: entry.pins.filter(pin => pin !== "C3") } : entry)), COVERS);
    const extraWord = coverageOf(`${rowC} quietly`, ROWS, COVERS);
    expect({ appended: JSON.stringify(appended) === JSON.stringify(reading), droppedPin, extraWord }).toStrictEqual({
      appended: true,
      droppedPin: { outside: [], uncovered: ["fails"], withoutOwnWord: [] },
      extraWord: { outside: [], uncovered: ["quietly"], withoutOwnWord: [] },
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          // wb-1f2w F6, wb-tnig F3: a case measures its own witness; one whose own source reads the roster, reads as native code or
          // names an evaluator cannot vouch for what it returns.
          expect(impl === undefined ? ["no case"] : echoReasonsOf(sourceOf(impl)), `${pin}'s case cannot vouch for its witness`).toEqual([]);
          const witness = impl === undefined ? null : await impl();
          // wb-tnig F3: a witness holding an object of the roster's own witness was handed back from the roster, by whatever route;
          // wb-6njq F2: one the structured clone algorithm refuses (a proxy at any depth) cannot show where its reads go, so it is
          // refused too, and the roster both readings hold it to is frozen; wb-w0a4 F2: one holding an object of any part of the
          // parsed roster is refused, and so is one that is not plain data, whose later reads could differ from the reading's.
          expect(routesOf(witness), `${pin}'s witness must be cloneable plain data holding no object of the parsed roster`).toEqual([]);
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
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
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
