/**
 * wb-pyel.5 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R12, program-triage-2026-10-18): the render-abort falsifier and its until-then
 * trigger.
 * Statement (bead title): "If Pi authors EDC hooks/descriptors, a pure hook or descriptor may describe a logical evidence
 * requirement or prospective resource interest but shall create no tool, model or host effect during render, and proposals
 * from aborted or suspended renders shall never commit. Artifact: a Pi-authored EDC component/hook surface (none exists)."
 * Citation (owner filing): ReactiveFiberTSXSDK docs/programs/evidence-directed-computation-2026-10-18.md:12@e7e6616d3d08, as
 * the cutting seat read it (git show, read-only): "A pure hook/descriptor may *describe* logical evidence requirement or
 * prospective resource interest but cannot create tool/model/host effects during render. Proposals from aborted/suspended
 * renders never commit."
 * Acceptance (owner filing, verbatim): "a render-abort falsifier proving zero committed proposals and zero tool/model/host
 * effects from a render pass, with a committed-after-abort attempt going red."
 *
 * DELIVERED HERE: that falsifier, built and run against the one render pass Pi drives today, the rf `context render
 * --no-commit` preview (src/workbench/providers/reactivefiber.ts), at every entry the module exports: the native registration
 * as production loads it (loadWorkbenchNative().registerNativeProviders, then CapabilityRegistry.invoke), the two exported
 * render functions called directly (nativeReactiveFiberRender, nativeReactiveFiberPreview), and the injected registration
 * (registerReactiveFiberRender) both through the registry and as its bare provider. And the until-then trigger: row T pins
 * that no Pi-authored EDC component/hook surface exists, so the day one lands this census reds naming the owed duty (drive
 * the new surface's render passes through row A). NOT DELIVERED: the falsifier run against a Pi-authored EDC hook surface -
 * none exists (the owner filing: "No EDC render pipeline exists in Pi to carry the duty").
 *
 * THE FALSIFIER (row A). Each pass runs on a bench: a fresh workspace root (two seeded files) and a hermetic PATH holding
 * one directory, whose `rf` is a stand-in (absolute node interpreter) that logs its argv, marks its progress in files beside
 * itself and exits 0 on SIGTERM (the clean exit is the hard case: a complete proposal on stdout and exit code 0). The same
 * directory holds a logging stand-in for every other command Pi's src launches by name (derived from src). The scenarios:
 *  - ABORTED (the title's "aborted"): before (the signal fired before the pass starts); running (native passes: the stand-in
 *    started and wrote nothing); proposed (the stand-in wrote a complete, valid, uncommitted proposal and waits; for the
 *    injected passes the reader is pending at the abort and resolves that proposal after it).
 *  - SUSPENDED (the title's "suspended"): queued (held for a registry admission slot behind a pass holding the only slot - a
 *    running child or a pending read - then aborted);
 *    deadline (held past the registry deadline while the reader is pending, the proposal arriving after; the deadline is
 *    the registry's own dispatch, the same for both registrations, and is driven through the injected one, where the
 *    proposal's timing is the test's).
 *  - SETTLED: no abort; the stand-in prints the proposal and exits.
 * The verdict (falsify) names seven violation classes: committed-after-abort (an aborted or suspended pass returned a
 * proposal), committed-proposal (a settled native pass returned a form stating a commit: ephemeral not true, render_id or
 * commit_seq set, or a store write), committing-launch (an rf launch outside the `context render ... --no-commit --no-input
 * --json` form), started-after-abort (a pass aborted before it started, or held in the queue, launched or read anyway),
 * extra-launch (more than one launch or read), foreign-launch (any other stand-in launched) and host-write (the workspace
 * root's tree changed). A1-A4 hold every driven pass and scenario to an empty verdict; A5 holds the pass's static reach
 * (its module closure from src: no tool provider, model host or tool SDK native-modules.ts loads, no I/O global, and one
 * launch site, spawn("rf")); A6 is the acceptance's "committed-after-abort attempt going red": a control for every class,
 * each tripping exactly its class (a render that drops its signal and so returns its proposal after the abort leads), plus one
 * signal-ignoring provider read three ways - bare (red: committed-after-abort), through a registry with the proposal arriving
 * after the abort (refused by the registry's race), and through a registry with the proposal settling inside the abort's own
 * tick (refused only by the registry's post-race guard; without that guard the census reds).
 *
 * THE UNTIL-THEN TRIGGER (row T): T1 no tracked .tsx/.jsx module anywhere in git's index; T2 no src script module (every
 * one git tracks, read equal to the src walk both ways) names a hook (an identifier of the use-prefixed form - the
 * charter's useProvider, useQuery, useAbsent, useRequirement, useEffect, useCommit fit it) or the charter's descriptor
 * pureProjectRequirement, or imports @reactive-fiber/tsx, and neither manifest names that package; T3 no capability
 * descriptor of the native or the injected registrations describes either of the title's two interests (evidence
 * requirement, resource interest, joined fold); T4 each reader's own controls. A red row T is the trigger, not a defect.
 *
 * MEASURED (by the cutting seat ws-02, run g10-work-s125, 2026-10-28, on trunk 65a9e53): all 21 driven pass/scenario
 * observations read an empty verdict, the 5 settled native renders return the uncommitted form and the 8 committed-form
 * renders are refused; each of the 10 controls trips exactly its expected classes; the render closure is 4 src modules and 2
 * externals with one launch site; 0 tracked .tsx/.jsx of 1048 tracked paths; 0 hook names over 116 src modules; 0 interest
 * phrases in 8 descriptors.
 *
 * The census pins the rows and the residuals' quiet rows:
 *  A, the acceptance: A1 aborted passes, A2 suspended passes (both: no proposal reaches the caller), A3 a settled native
 *    pass returns only the uncommitted form and refuses each committed form, A4 the effect ledger of every driven pass, A5
 *    the static reach, A6 the controls.
 *  T, the title's artifact clause: T1-T4 above.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/edc-render-abort-roster.json). Outside anchors in the bead's own row of the tracker export
 * (.beads/issues.jsonl): row A's label is the acceptance sentence (the first "Acceptance:" sentence of the notes, so later
 * notes do not move it) and its three clauses are each served by a row A pin, both ways; row T's label is the title's
 * artifact clause; the scenario kinds are the title's "aborted or suspended" (A1 judges the aborted renders, A2 the
 * suspended), the effect classes A4/A5 judge are its "tool, model or host" (A5 alone judges model), A6 serves the acceptance's
 * third clause, and T3's phrases are its two interests. Outside anchors in src: the contract source states the uncommitted
 * render (A3 judges the settled form); the passes equal the render module's exported functions, both ways; every registered
 * render capability of both registrations is driven; src's only rf launch site is the render module's; the stand-ins are the
 * commands src launches by name; the foreign set is native-modules.ts's dynamic imports. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran
 * before it) and the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and
 * the roster where no outside anchor names it (A4, T1-T4, Q1-Q5 with their RESIDUALS entry); a constant edited in this file
 * and the roster together; T1's listing narrowed while it still holds REQUIRED_TRACKED and its floor; a launch killed before
 * the stand-in's first statement runs (the SIGTERM lands during the interpreter's start) leaves no log line, so the launch
 * ledger reads it as none - the outcome and the at-abort mark still record such a pass.
 * RESIDUALS (named, each with its pinned quiet row): R-INJECTED-RELAY the injected registration relays its reader's
 * envelope without the native admission checks - a reader stating commit_seq 1 is returned unchanged by both injected passes,
 * so the committed-proposal class judges native passes only (Q1); R-STATED-EFFECTS the native admission reads ephemeral,
 * render_id, commit_seq and the store write count, never rf's own result.effects or result.plan statements - a settled
 * native pass whose envelope states an effect and would_commit true is returned (Q2); R-HOOK-VOCABULARY a hook spelled
 * outside the use-prefixed form, or a descriptor describing an interest in other words, is not read by T2/T3 (Q3);
 * R-STAND-IN the falsifier drives stand-ins, never the installed rf (its TSX Suspense, abort handling and the cache-plane
 * writes the descriptor discloses are rf's and are not measured here; the rf-preview live tier holds the installed rf to
 * the envelope) - during a pass PATH holds the bench directory alone (Q4); R-HOST-ELSEWHERE the host-write reading
 * fingerprints the workspace root only - a write outside it reads no violation (Q5), and A5 bounds the rest statically.
 * SCOPE: the falsifier judges the host boundary Pi owns; rf's own render semantics are rf's.
 *
 * Display paths added: none. Test-only: the stand-ins and workspace roots live in makeScratch scratch; src, the manifests,
 * .beads and git's index are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { delimiter, dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityLimits,
  type CapabilityProvider,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import {
  nativeReactiveFiberPreview,
  nativeReactiveFiberRender,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type JsonObject = { [key: string]: JsonValue };
type Envelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "edc-render-abort-roster.json");
const BEAD = "wb-pyel.5";
/** The render capability and the grant its descriptor requires. */
const PREVIEW = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RENDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const NATIVE_LOADER = "src/workbench/native-modules.ts";
/** The form every rf launch of a render pass takes: `--workspace <root> context render <selector> --no-commit --no-input --json`. */
const RENDER_VERB = ["context", "render"];
const UNCOMMITTED_TAIL = ["--no-commit", "--no-input", "--json"];
/** The registry deadline of the deadline scenario (ms). */
const REGISTRY_DEADLINE_MS = 250;
/** A bound on every wait for a stand-in's progress mark (ms); a pass that never reaches its mark reds by name. */
const WAIT_MS = 45_000;

/** Every entry of the render module that runs a render, as the falsifier drives it. */
const PASSES = ["native-registry", "native-direct", "native-preview", "injected-registry", "injected-direct"] as const;
type PassId = (typeof PASSES)[number];
/** The export each pass enters through (held both ways to the render module's exported functions). */
const ENTRY: Readonly<Record<PassId, string>> = {
  "native-registry": "registerNativeReactiveFiberRender",
  "native-direct": "nativeReactiveFiberRender",
  "native-preview": "nativeReactiveFiberPreview",
  "injected-registry": "registerReactiveFiberRender",
  "injected-direct": "registerReactiveFiberRender",
};
/** The passes that own the envelope's admission (the injected passes relay their reader's; R-INJECTED-RELAY). */
const NATIVE_PASSES: readonly PassId[] = ["native-registry", "native-direct", "native-preview"];
/** The passes that go through a CapabilityRegistry (the only ones an admission slot or a registry deadline can hold). */
const REGISTRY_PASSES: readonly PassId[] = ["native-registry", "injected-registry"];
const SCENARIOS = ["before", "running", "proposed", "queued", "deadline", "settled"] as const;
type ScenarioId = (typeof SCENARIOS)[number];
const KIND: Readonly<Record<ScenarioId, "aborted" | "suspended" | "settled">> = {
  before: "aborted",
  running: "aborted",
  proposed: "aborted",
  queued: "suspended",
  deadline: "suspended",
  settled: "settled",
};
/** Which scenarios drive each pass: running needs a child process (native), queued an admission slot, deadline a registry. */
const DRIVEN: Readonly<Record<PassId, readonly ScenarioId[]>> = {
  "native-registry": ["before", "running", "proposed", "queued", "settled"],
  "native-direct": ["before", "running", "proposed", "settled"],
  "native-preview": ["before", "running", "proposed", "settled"],
  "injected-registry": ["before", "proposed", "queued", "deadline", "settled"],
  "injected-direct": ["before", "proposed", "settled"],
};
const VIOLATIONS = [
  "committed-after-abort",
  "committed-proposal",
  "committing-launch",
  "started-after-abort",
  "extra-launch",
  "foreign-launch",
  "host-write",
] as const;
type Violation = (typeof VIOLATIONS)[number];
/** The acceptance clause each violation class answers. */
const CLAUSE_OF: Readonly<Record<Violation, "commit" | "effect">> = {
  "committed-after-abort": "commit",
  "committed-proposal": "commit",
  "committing-launch": "effect",
  "started-after-abort": "effect",
  "extra-launch": "effect",
  "foreign-launch": "effect",
  "host-write": "effect",
};
/** The committed forms a settled native pass must refuse: each edits one field of the uncommitted proposal. */
const COMMITTED_FORMS = ["commit_seq", "render_id", "ephemeral", "storage_write_count"] as const;
type CommittedForm = (typeof COMMITTED_FORMS)[number];
/** The calls that launch a process, by the name the callee is spelled with. */
const LAUNCH_CALLS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
const CHILD_PROCESS = ["node:child_process", "child_process"];
/** Globals a module can reach the network or load code through without an import. */
const IO_GLOBALS = ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "require"];
/** Builtins that read or write the host (files, sockets, processes, threads); others (crypto, util) are pure here. */
const IO_BUILTINS = ["child_process", "cluster", "dgram", "dns", "fs", "fs/promises", "http", "http2", "https", "net", "tls", "worker_threads"];
/** The TSX SDK's package (ReactiveFiberTSXSDK package.json name) and the charter's hook and descriptor forms. */
const TSX_SDK = "@reactive-fiber/tsx";
const HOOK_NAME = /^use[A-Z]/;
const DESCRIPTOR_NAME = "pureProjectRequirement";
const SCRIPT_MODULE = /\.(?:ts|mts|cts|tsx|js|mjs|cjs|jsx)$/;
const COMPONENT_MODULE = /\.(?:tsx|jsx)$/i;
/** Paths git's index must hold for T1's listing to be the whole index (a floor, never the exact set). */
const REQUIRED_TRACKED = ["package.json", "src/index.ts", RENDER_MODULE, "test/helpers/scratch.ts", "docs/workbench/07-native-integrations.md"];
const FLOORS = { tracked: 900, srcModules: 100, descriptors: 8 };
const TRIGGER =
  "a Pi-authored EDC component/hook surface now exists: wb-pyel.5's acceptance is owed on it - drive its render passes through the render-abort falsifier (row A, PASSES) and re-measure this census";

/** Residual families and the quiet-row pins that hold them. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-INJECTED-RELAY": ["Q1"],
  "R-STATED-EFFECTS": ["Q2"],
  "R-HOOK-VOCABULARY": ["Q3"],
  "R-STAND-IN": ["Q4"],
  "R-HOST-ELSEWHERE": ["Q5"],
};
/** A5's planted module: each static reader must find its own sites in it (and skip what it must not read). */
const PLANTED_REACH = [
  'import { spawn as run, execFileSync } from "node:child_process";',
  'import * as cp from "child_process";',
  'export * from "./planted-peer.js";',
  'import q = require("planted-required");',
  'const lazy = await import("planted-lazy");',
  'run("hx", []);',
  "execFileSync(command);",
  'cp.fork("worker.js");',
  'ServerConnection.spawn("forge");',
  'pi.exec("git", []);',
  "manager.spawn(pi);",
  'const reply = await fetch("https://example.invalid/");',
  'const socket = new WebSocket("wss://example.invalid/");',
  "settings.fetch = 1;",
  "",
].join("\n");
/** Q3's probes: hooks and descriptors spelled outside the forms T2 and T3 read. */
const OTHER_HOOKS = "export function evidenceHook() { return describeRequirement(view); }\nconst makeEvidenceDescriptor = () => ({ need: 1 });\n";
const OTHER_PHRASES = "states an evidence need and a resource demand for the next render";
/** T4's planted samples, each of which its reader must find. */
const PLANTED_PATHS = ["src/edc/EvidencePanel.tsx", "examples/Card.JSX", "src/edc/panel.ts", "docs/hooks.md"];
const PLANTED_SOURCE = `import { useQuery } from "${TSX_SDK}";\nexport function useRequirement(view: unknown) { return pureProjectRequirement(view); }\nconst panel = () => useProvider("evidence-view", {});\n`;
const PLANTED_MANIFEST: JsonObject = {
  name: "planted",
  dependencies: { [TSX_SDK]: "1.0.0" },
  devDependencies: { [TSX_SDK]: "1.0.0" },
  peerDependencies: { [TSX_SDK]: "1.0.0" },
  optionalDependencies: { [TSX_SDK]: "1.0.0" },
  bundleDependencies: [TSX_SDK],
  bundledDependencies: [TSX_SDK],
};
const PLANTED_LOCK: JsonObject = { packages: { "": { name: "planted" }, [`node_modules/${TSX_SDK}`]: { version: "1.0.0" } } };
const PLANTED_DESCRIPTION = "Describes a logical evidence requirement for the next render";
/** A planted descriptor key spelling the other interest in camel case (read in the joined fold, keys included). */
const PLANTED_KEY = "prospectiveResourceInterest";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A and T, to the bead's export row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "a render-abort falsifier proving zero committed proposals and zero tool/model/host effects from a render pass, with a committed-after-abort attempt going red",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  { id: "T", label: "a Pi-authored EDC component/hook surface (none exists)", pins: ["T1", "T2", "T3", "T4"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
];
/** The acceptance clause each row A pin serves (held both ways to the acceptance sentence's three clauses). */
const SERVES: Readonly<Record<string, string>> = {
  A1: "zero committed proposals",
  A2: "zero committed proposals",
  A3: "zero committed proposals",
  A4: "zero tool/model/host effects from a render pass",
  A5: "zero tool/model/host effects from a render pass",
  A6: "a committed-after-abort attempt going red",
};

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
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
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
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
  return { constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the bench: a workspace root and a hermetic PATH of logging stand-ins ----

type Mode = "settled" | "running" | "proposed" | "late";
interface Bench {
  readonly bin: string;
  readonly root: string;
  readonly log: string;
}
interface Launch {
  readonly bin: string;
  readonly argv: readonly string[];
}
const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in command in the bench: it logs {bin, argv}, marks `stopped.<tag>` and exits 0 on SIGTERM, then runs `body`. */
function standIn(bench: Bench, name: string, body: string): void {
  const script = join(bench.bin, name);
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      '"use strict";',
      'const fs = require("node:fs");',
      `const dir = ${JSON.stringify(bench.bin)};`,
      "const argv = process.argv.slice(2);",
      `fs.appendFileSync(${JSON.stringify(bench.log)}, JSON.stringify({ bin: ${JSON.stringify(name)}, argv }) + "\\n");`,
      'const at = argv.findIndex(arg => arg === "--task" || arg === "--task-id");',
      'const tag = at === -1 ? "untagged" : argv[at + 1];',
      'const mark = name => fs.writeFileSync(dir + "/" + name + "." + tag, "");',
      'process.on("SIGTERM", () => { mark("stopped"); process.exit(0); });',
      body,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
}
/** The stand-in rf's behaviour after it logged: print and exit, mark and wait, print then mark and wait, or print then wait
 * for a release file (the control that outlives a dropped signal). */
function rfBody(mode: Mode, envelope: JsonValue): string {
  const print = `process.stdout.write(${JSON.stringify(JSON.stringify(envelope))}`;
  switch (mode) {
    case "settled":
      return `${print}, () => process.exit(0));`;
    case "running":
      return 'mark("started"); setInterval(() => {}, 1000);';
    case "proposed":
      return `${print}, () => { mark("proposed"); setInterval(() => {}, 1000); });`;
    case "late":
      return `${print}, () => { mark("proposed"); const wait = setInterval(() => { if (fs.existsSync(dir + "/release." + tag)) { clearInterval(wait); process.exit(0); } }, 20); });`;
  }
}
/** A fresh bench whose rf behaves as `mode` and prints `envelope(root)`; PATH then holds the bench directory alone. */
function bench(mode: Mode, envelope: (root: string) => JsonValue = fullShapeRf): Bench {
  const bin = makeScratch("edc-render-abort-bin-");
  const root = makeScratch("edc-render-abort-root-");
  scratches.push(bin, root);
  writeFileSync(join(root, "README.md"), "workspace seed\n");
  mkdirSync(join(root, "notes"));
  writeFileSync(join(root, "notes", "seed.txt"), "seed\n");
  const made: Bench = { bin, root, log: join(bin, "launches.jsonl") };
  standIn(made, "rf", rfBody(mode, envelope(root)));
  for (const name of foreignCommands()) standIn(made, name, "process.exit(0);");
  process.env.PATH = bin;
  return made;
}
function launches(made: Bench): Launch[] {
  if (!existsSync(made.log)) return [];
  return readFileSync(made.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line) as Launch);
}
function tagOf(argv: readonly string[]): string {
  const at = argv.findIndex(arg => arg === "--task" || arg === "--task-id");
  return at === -1 ? "untagged" : (argv[at + 1] ?? "untagged");
}
function marked(made: Bench, mark: string, tag: string): boolean {
  return existsSync(join(made.bin, `${mark}.${tag}`));
}
/** The workspace root's tree: every path (kind and bytes) in name order, hashed. */
function tree(root: string): string {
  const hash = createHash("sha256");
  const walk = (dir: string): void => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      hash.update(`${relative(root, path)}\u0000${entry.isDirectory() ? "d" : entry.isFile() ? "f" : "o"}\u0000`);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) hash.update(readFileSync(path));
    }
  };
  walk(root);
  return hash.digest("hex");
}
async function until(check: () => boolean, what: string): Promise<void> {
  const start = Date.now();
  while (!check()) {
    if (Date.now() - start > WAIT_MS) throw new Error(`census: ${what} not reached within ${WAIT_MS} ms`);
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}

/** The injected registration's reader: counts its calls; a held reader answers only when released. */
class Reader {
  calls = 0;
  private readonly waiting: (() => void)[] = [];
  constructor(
    private readonly root: string,
    private readonly hold: boolean,
    private readonly envelope: (root: string) => JsonValue = fullShapeRf,
  ) {}
  readonly read = (): Promise<Envelope> => {
    this.calls += 1;
    const value = JSON.parse(JSON.stringify(this.envelope(this.root))) as Envelope;
    if (!this.hold) return Promise.resolve(value);
    return new Promise(resolve => {
      this.waiting.push(() => resolve(value));
    });
  };
  release(): void {
    for (const answer of this.waiting.splice(0)) answer();
  }
}
/** A registry that also keeps each provider as registered, so the injected provider can be driven bare. */
class CapturingRegistry extends CapabilityRegistry {
  readonly captured: CapabilityProvider[] = [];
  override register(provider: CapabilityProvider): void {
    this.captured.push(provider);
    super.register(provider);
  }
}
interface Pass {
  readonly run: (tag: string, signal: AbortSignal) => Promise<JsonValue>;
  readonly registry: CapabilityRegistry | undefined;
}
function context(signal: AbortSignal): InvocationContext {
  return { grants: [...GRANTS], signal };
}
/** One pass of the render module, entered through ENTRY[id], on `made` (and `reader`, for the injected passes). */
async function pass(id: PassId, made: Bench, limits: CapabilityLimits, reader: Reader | undefined): Promise<Pass> {
  switch (id) {
    case "native-registry": {
      const registry = new CapabilityRegistry(limits);
      (await loadWorkbenchNative()).registerNativeProviders(registry, made.root);
      return { registry, run: (tag, signal) => registry.invoke(PREVIEW, { model: "m", task: tag }, context(signal)) };
    }
    case "native-direct":
      return { registry: undefined, run: (tag, signal) => nativeReactiveFiberRender({ model: "m", task: tag }, made.root, signal) };
    case "native-preview":
      return { registry: undefined, run: (tag, signal) => nativeReactiveFiberPreview("m", tag, made.root, signal) };
    case "injected-registry": {
      if (reader === undefined) throw new Error("census: an injected pass needs its reader");
      const registry = new CapabilityRegistry(limits);
      registerReactiveFiberRender(registry, reader.read, made.root);
      return { registry, run: (tag, signal) => registry.invoke(PREVIEW, { model: "m", task: tag }, context(signal)) };
    }
    case "injected-direct": {
      if (reader === undefined) throw new Error("census: an injected pass needs its reader");
      const capture = new CapturingRegistry();
      registerReactiveFiberRender(capture, reader.read, made.root);
      const provider = capture.captured[0];
      if (provider === undefined) throw new Error("census: the injected registration registered nothing");
      return { registry: undefined, run: (tag, signal) => provider.invoke({ model: "m", task: tag }, context(signal)) };
    }
  }
}

// ---- observations and the falsifier ----

type Outcome = { readonly kind: "returned"; readonly value: JsonValue } | { readonly kind: "refused"; readonly category: string; readonly message: string };
async function settle(run: Promise<JsonValue>): Promise<Outcome> {
  try {
    return { kind: "returned", value: await run };
  } catch (error) {
    return {
      kind: "refused",
      category: error instanceof CapabilityError ? error.category : "thrown",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
interface Observation {
  readonly pass: string;
  readonly scenario: ScenarioId;
  /** Whether the pass owns its envelope's admission (native) or relays a reader's (injected). */
  readonly native: boolean;
  readonly outcome: Outcome;
  /** The rf launches carrying this pass's tag, and every launch of any other stand-in. */
  readonly launches: readonly Launch[];
  readonly foreign: readonly Launch[];
  readonly readerCalls: number;
  readonly hostChanged: boolean;
  /** Whether the pass's rf child received the stop (SIGTERM). */
  readonly stopped: boolean;
  readonly cancelledWhileQueued: number | undefined;
  /** What held when the abort (or the deadline) fired: the stand-in's marks, the reader's state, the slot holder; "-" for none. */
  readonly atAbort: string;
}
function sourceOf(value: JsonValue): JsonObject | undefined {
  return isObject(value) && isObject(value.source) ? (value.source as JsonObject) : undefined;
}
/** The returned reading states the uncommitted form: ephemeral, no render_id, no commit_seq, no store write. */
function uncommitted(value: JsonValue): boolean {
  const result = sourceOf(value)?.result;
  if (!isObject(result)) return false;
  const work = result.work;
  return (
    result.ephemeral === true &&
    result.render_id === null &&
    (!Object.hasOwn(result, "commit_seq") || result.commit_seq === null) &&
    isObject(work) &&
    work.storage_write_count === 0
  );
}
function uncommittedArgv(argv: readonly string[]): boolean {
  return (
    argv[0] === "--workspace" &&
    RENDER_VERB.every((word, index) => argv[2 + index] === word) &&
    UNCOMMITTED_TAIL.every((flag, index) => argv[argv.length - UNCOMMITTED_TAIL.length + index] === flag)
  );
}
/** The verdict: every violation class the observation shows, in VIOLATIONS order. */
function falsify(seen: Observation): Violation[] {
  const stoppedPass = KIND[seen.scenario] !== "settled";
  const unstarted = seen.scenario === "before" || seen.scenario === "queued";
  const found = new Set<Violation>();
  if (stoppedPass && seen.outcome.kind === "returned") found.add("committed-after-abort");
  if (seen.outcome.kind === "returned" && seen.native && !uncommitted(seen.outcome.value)) found.add("committed-proposal");
  if (seen.launches.some(launch => !uncommittedArgv(launch.argv))) found.add("committing-launch");
  if (unstarted && seen.launches.length + seen.readerCalls > 0) found.add("started-after-abort");
  if (seen.launches.length + seen.readerCalls > 1) found.add("extra-launch");
  if (seen.foreign.length > 0) found.add("foreign-launch");
  if (seen.hostChanged) found.add("host-write");
  return VIOLATIONS.filter(violation => found.has(violation));
}
function outcomeText(outcome: Outcome): string {
  return outcome.kind === "returned" ? "returned" : `refused ${outcome.category}: ${outcome.message}`;
}

/** Drives pass `id` through `scenario` on a fresh bench and records what reached the caller and what it caused. */
async function observe(id: PassId, scenario: ScenarioId): Promise<Observation> {
  const native = NATIVE_PASSES.includes(id);
  const mode: Mode = scenario === "running" || scenario === "queued" ? "running" : scenario === "proposed" ? "proposed" : "settled";
  const made = bench(native ? mode : "settled");
  const reader = native ? undefined : new Reader(made.root, scenario !== "settled");
  const limits: CapabilityLimits = scenario === "queued" ? { maxInFlight: 1 } : scenario === "deadline" ? { deadlineMs: REGISTRY_DEADLINE_MS } : {};
  const driven = await pass(id, made, limits, reader);
  const before = tree(made.root);
  const tag = `${id}-${scenario}`;
  const controller = new AbortController();
  let callsBefore = 0;
  let atAbort = "-";
  let outcome: Outcome;
  switch (scenario) {
    case "before":
      controller.abort();
      outcome = await settle(driven.run(tag, controller.signal));
      break;
    case "settled":
      outcome = await settle(driven.run(tag, controller.signal));
      break;
    case "running":
    case "proposed": {
      const running = settle(driven.run(tag, controller.signal));
      if (reader !== undefined) await until(() => reader.calls === 1, `${tag}: the reader was called`);
      else await until(() => marked(made, scenario === "running" ? "started" : "proposed", tag), `${tag}: the stand-in's ${scenario} mark`);
      atAbort =
        reader !== undefined
          ? `reader called ${reader.calls}, unanswered`
          : ["started", "proposed"].filter(mark => marked(made, mark, tag)).join("+") || "no mark";
      controller.abort();
      reader?.release();
      outcome = await running;
      if (reader === undefined) await until(() => marked(made, "stopped", tag), `${tag}: the stand-in's stop`);
      break;
    }
    case "queued": {
      const holder = new AbortController();
      const holderTag = `${tag}-holder`;
      const held = settle(driven.run(holderTag, holder.signal));
      if (reader !== undefined) await until(() => reader.calls === 1, `${holderTag}: the reader was called`);
      else await until(() => marked(made, "started", holderTag), `${holderTag}: the stand-in's started mark`);
      callsBefore = reader?.calls ?? 0;
      const queued = settle(driven.run(tag, controller.signal));
      const slots = driven.registry?.admission();
      atAbort = `slot holder in flight ${slots?.inFlight ?? "?"} of ${slots?.maxInFlight ?? "?"}, admitted ${slots?.admitted ?? "?"}`;
      controller.abort();
      outcome = await queued;
      holder.abort();
      reader?.release();
      await held;
      if (reader === undefined) await until(() => marked(made, "stopped", holderTag), `${holderTag}: the stand-in's stop`);
      break;
    }
    case "deadline":
      outcome = await settle(driven.run(tag, controller.signal));
      atAbort = reader === undefined ? "no reader" : `reader called ${reader.calls}, unanswered`;
      reader?.release();
      break;
  }
  const all = launches(made);
  return {
    pass: id,
    scenario,
    native,
    outcome,
    launches: all.filter(launch => launch.bin === "rf" && tagOf(launch.argv) === tag),
    foreign: all.filter(launch => launch.bin !== "rf"),
    readerCalls: (reader?.calls ?? 0) - callsBefore,
    hostChanged: tree(made.root) !== before,
    stopped: marked(made, "stopped", tag),
    cancelledWhileQueued: driven.registry?.admission().cancelledWhileQueued,
    atAbort,
  };
}
let sweep: Promise<Observation[]> | undefined;
/** Every pass through every scenario DRIVEN names, once per file, in PASSES order. */
function sweepOnce(): Promise<Observation[]> {
  sweep ??= (async () => {
    const seen: Observation[] = [];
    for (const id of PASSES) for (const scenario of DRIVEN[id]) seen.push(await observe(id, scenario));
    return seen;
  })();
  return sweep;
}
function commitLine(seen: Observation): string {
  const verdict = falsify(seen).filter(violation => CLAUSE_OF[violation] === "commit");
  return `${seen.pass}/${seen.scenario}: at abort ${seen.atAbort} | ${outcomeText(seen.outcome)} | [${verdict.join(", ")}]`;
}
function effectLine(seen: Observation): string {
  const verdict = falsify(seen).filter(violation => CLAUSE_OF[violation] === "effect");
  const uncommittedLaunches = seen.launches.every(launch => uncommittedArgv(launch.argv));
  return (
    `${seen.pass}/${seen.scenario}: launches ${seen.launches.length}${uncommittedLaunches ? "" : " (committing)"}, reader ${seen.readerCalls}, ` +
    `foreign ${seen.foreign.length}, host ${seen.hostChanged ? "changed" : "unchanged"}, stopped ${seen.stopped} | [${verdict.join(", ")}]`
  );
}
/** The uncommitted proposal with one field edited into a committed form. */
function committedForm(form: CommittedForm): (root: string) => JsonValue {
  return root => {
    const envelope = fullShapeRf(root) as JsonObject;
    const result = envelope.result as JsonObject;
    if (form === "commit_seq") result.commit_seq = 1;
    if (form === "render_id") result.render_id = "rnd_committed";
    if (form === "ephemeral") result.ephemeral = false;
    if (form === "storage_write_count") (result.work as JsonObject).storage_write_count = 1;
    return envelope;
  };
}
/** One settled native pass on a bench printing `envelope`; the returned reading or the refusal, and the launch argv. */
async function settledNative(id: PassId, envelope: (root: string) => JsonValue, view: boolean): Promise<{ outcome: Outcome; argv: string[][]; root: string }> {
  const made = bench("settled", envelope);
  const tag = `${id}-${view ? "view" : "legacy"}`;
  const signal = new AbortController().signal;
  let run: Promise<JsonValue>;
  if (id === "native-registry") {
    const registry = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(registry, made.root);
    run = registry.invoke(PREVIEW, view ? { view: "v", taskId: tag } : { model: "m", task: tag }, context(signal));
  } else if (id === "native-direct") {
    run = nativeReactiveFiberRender(view ? { view: "v", taskId: tag } : { model: "m", task: tag }, made.root, signal);
  } else {
    run = nativeReactiveFiberPreview("m", tag, made.root, signal);
  }
  const outcome = await settle(run);
  return { outcome, argv: launches(made).map(launch => launch.argv.map(arg => (arg === made.root ? "<root>" : arg))), root: made.root };
}

// ---- the controls (A6) and the quiet rows' passes ----

/** The uncommitted launch a hand-built control makes itself (`committing` drops --no-commit). */
function launchRf(made: Bench, tag: string, committing: boolean): JsonValue {
  const argv = ["--workspace", made.root, ...RENDER_VERB, "--model", "m", "--task", tag, ...(committing ? ["--no-input", "--json"] : UNCOMMITTED_TAIL)];
  const stdout = execFileSync("rf", argv, { encoding: "utf8", env: { PATH: made.bin } });
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: made.root, source: JSON.parse(stdout) as JsonValue };
}
interface Control {
  readonly expected: readonly Violation[];
  readonly run: () => Promise<Observation>;
}
/** Runs `body` on a fresh bench as a pass of `scenario` and records it like observe does. */
async function controlObservation(
  name: string,
  scenario: ScenarioId,
  mode: Mode,
  body: (made: Bench, tag: string, controller: AbortController) => Promise<JsonValue>,
): Promise<Observation> {
  const made = bench(mode);
  const before = tree(made.root);
  const tag = `control-${name}`;
  const controller = new AbortController();
  if (scenario === "before") controller.abort();
  const outcome = await settle(body(made, tag, controller));
  const all = launches(made);
  return {
    pass: `control:${name}`,
    scenario,
    native: true,
    outcome,
    launches: all.filter(launch => launch.bin === "rf" && tagOf(launch.argv) === tag),
    foreign: all.filter(launch => launch.bin !== "rf"),
    readerCalls: 0,
    hostChanged: tree(made.root) !== before,
    stopped: marked(made, "stopped", tag),
    cancelledWhileQueued: undefined,
    atAbort: "-",
  };
}
/** A proposal a control hands out on demand: the promise the provider returns IS the proposal's, so it settles in the very
 * tick release() runs (no await hop between them). */
class Proposer {
  calls = 0;
  private answer: ((value: JsonValue) => void) | undefined;
  readonly propose = (): Promise<JsonValue> => {
    this.calls += 1;
    return new Promise(resolve => {
      this.answer = resolve;
    });
  };
  release(value: JsonValue): void {
    this.answer?.(value);
  }
}
/** A provider that ignores its signal: it returns the proposer's promise whatever the signal says. */
function signalIgnoringProvider(proposer: Proposer): CapabilityProvider {
  return {
    descriptor: {
      id: "census.render.unguarded",
      version: "1.0.0",
      description: "census control: a render provider that ignores its signal",
      inputSchema: { type: "object" },
      effectClass: "read",
      permissions: [],
      supportedModes: ["invoke"],
    },
    invoke: () => proposer.propose(),
  };
}
/** The unguarded provider aborted while its proposal is pending, bare or through a registry; the proposal is released after
 * the abort, or (sameTick) by a caller-signal listener registered before the registry's, so it settles inside the abort's own
 * tick - the window only the registry's post-race guard covers. */
async function unguarded(throughRegistry: boolean, sameTick: boolean): Promise<Observation> {
  const made = bench("settled");
  const proposer = new Proposer();
  const proposal = json({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: made.root, source: fullShapeRf(made.root) });
  const provider = signalIgnoringProvider(proposer);
  const registry = new CapabilityRegistry();
  registry.register(provider);
  const controller = new AbortController();
  if (sameTick) controller.signal.addEventListener("abort", () => proposer.release(proposal), { once: true });
  const before = tree(made.root);
  const running = settle(
    throughRegistry
      ? registry.invoke("census.render.unguarded", {}, { grants: ["invoke:census.render.unguarded"], signal: controller.signal })
      : provider.invoke({}, context(controller.signal)),
  );
  await until(() => proposer.calls === 1, "the unguarded provider was called");
  controller.abort();
  if (!sameTick) proposer.release(proposal);
  const outcome = await running;
  return {
    pass: `control:unguarded-${throughRegistry ? "registry" : "bare"}${sameTick ? "-same-tick" : ""}`,
    scenario: "proposed",
    native: true,
    outcome,
    launches: [],
    foreign: launches(made).filter(launch => launch.bin !== "rf"),
    readerCalls: proposer.calls,
    hostChanged: tree(made.root) !== before,
    stopped: false,
    cancelledWhileQueued: undefined,
    atAbort: sameTick ? "proposal released by the abort itself" : "proposal unanswered",
  };
}
/** One control per violation class, each tripping its class alone, and the unguarded provider read both ways. */
const CONTROLS: Readonly<Record<string, Control>> = {
  "dropped-signal": {
    expected: ["committed-after-abort"],
    run: () =>
      controlObservation("dropped-signal", "proposed", "late", async (made, tag, controller) => {
        // The control passes no signal to the render: the abort below cannot reach it, so its proposal lands after the abort.
        const running = nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
        await until(() => marked(made, "proposed", tag), "the dropped-signal control's proposal");
        controller.abort();
        writeFileSync(join(made.bin, `release.${tag}`), "");
        return running;
      }),
  },
  "unguarded-bare": { expected: ["committed-after-abort"], run: () => unguarded(false, false) },
  "unguarded-registry": { expected: [], run: () => unguarded(true, false) },
  "unguarded-registry-same-tick": { expected: [], run: () => unguarded(true, true) },
  "committed-form": {
    expected: ["committed-proposal"],
    run: () =>
      controlObservation("committed-form", "settled", "settled", async made => ({
        contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
        workspaceRoot: made.root,
        source: committedForm("commit_seq")(made.root),
      })),
  },
  "committing-argv": {
    expected: ["committing-launch"],
    run: () => controlObservation("committing-argv", "settled", "settled", async (made, tag) => launchRf(made, tag, true)),
  },
  "started-after-abort": {
    expected: ["started-after-abort"],
    run: () =>
      controlObservation("started-after-abort", "before", "settled", async (made, tag) => {
        launchRf(made, tag, false);
        throw new CapabilityError("transport", "census control: cancelled after it launched");
      }),
  },
  "extra-launch": {
    expected: ["extra-launch"],
    run: () =>
      controlObservation("extra-launch", "settled", "settled", async (made, tag) => {
        await nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "foreign-launch": {
    expected: ["foreign-launch"],
    run: () =>
      controlObservation("foreign-launch", "settled", "settled", async (made, tag) => {
        execFileSync(foreignCommands()[0] ?? "git", ["status"], { env: { PATH: made.bin } });
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "host-write": {
    expected: ["host-write"],
    run: () =>
      controlObservation("host-write", "settled", "settled", async (made, tag) => {
        writeFileSync(join(made.root, "proposal.json"), "{}\n");
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
};

// ---- src readings: modules, imports, launch sites ----

function git(...args: string[]): string {
  return execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, env: { ...process.env, PATH: oldPath } });
}
let trackedCache: string[] | undefined;
/** git's index: every tracked path. */
function trackedPaths(): string[] {
  trackedCache ??= git("ls-files", "-z")
    .split("\u0000")
    .filter(path => path.length > 0);
  return trackedCache;
}
function trackedScriptModules(): string[] {
  return trackedPaths()
    .filter(path => path.startsWith("src/") && SCRIPT_MODULE.test(path))
    .sort();
}
/** The src walk: every regular script module below src (symlinks not followed). */
function walkedScriptModules(): string[] {
  const found: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(REPO, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile() && SCRIPT_MODULE.test(entry.name)) found.push(path);
    }
  };
  walk("src");
  return found.sort();
}
function scriptKind(path: string): ts.ScriptKind {
  if (/\.tsx$/.test(path)) return ts.ScriptKind.TSX;
  if (/\.jsx$/.test(path)) return ts.ScriptKind.JSX;
  if (/\.[cm]?js$/.test(path)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
const parsed = new Map<string, ts.SourceFile>();
function parse(path: string, text?: string): ts.SourceFile {
  if (text !== undefined) return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  const cached = parsed.get(path);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, scriptKind(path));
  parsed.set(path, source);
  return source;
}
function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, child => visit(child, each));
}
/** Every module specifier a source names: static imports and exports, import-equals and literal dynamic imports. */
function specifiers(source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      found.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      found.push(node.moduleReference.expression.text);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) found.push(first.text);
    }
  });
  return found;
}
/** A relative specifier resolved to the src module it names (.js read as its .ts source); undefined for a package. */
function resolveModule(from: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\.js$/, ".ts");
}
function isBuiltin(specifier: string): boolean {
  const bare = specifier.startsWith("node:") ? specifier.slice(5) : specifier;
  return builtinModules.includes(bare);
}
/** The module closure of `entry`: every src module it reaches through any import edge, and every package it names. */
function closure(entry: string): { modules: string[]; externals: string[] } {
  const modules = new Set<string>();
  const externals = new Set<string>();
  const queue = [entry];
  for (let module = queue.shift(); module !== undefined; module = queue.shift()) {
    if (modules.has(module)) continue;
    modules.add(module);
    for (const specifier of specifiers(parse(module))) {
      const target = resolveModule(module, specifier);
      if (target === undefined) externals.add(specifier);
      else queue.push(target);
    }
  }
  return { modules: [...modules].sort(), externals: [...externals].sort() };
}
interface LaunchSite {
  readonly module: string;
  readonly callee: string;
  readonly command: string;
}
/** Calls whose callee (an identifier or a property) is spelled as a launch call: the command literal, or <expression>. */
function launchSites(module: string, source: ts.SourceFile = parse(module)): LaunchSite[] {
  const found: LaunchSite[] = [];
  visit(source, node => {
    if (!ts.isCallExpression(node)) return;
    const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : undefined;
    if (callee === undefined || !LAUNCH_CALLS.includes(callee)) return;
    const first = node.arguments[0];
    if (first === undefined || !ts.isStringLiteralLike(first)) return;
    found.push({ module, callee, command: first.text });
  });
  return found;
}
/** Launch calls bound to node:child_process in one module, whatever their first argument. */
function childProcessLaunches(module: string, source: ts.SourceFile = parse(module)): LaunchSite[] {
  const bound = new Map<string, string>();
  const namespaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !CHILD_PROCESS.includes(statement.moduleSpecifier.text)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) bound.set(element.name.text, (element.propertyName ?? element.name).text);
    } else if (bindings !== undefined && ts.isNamespaceImport(bindings)) namespaces.add(bindings.name.text);
  }
  const found: LaunchSite[] = [];
  visit(source, node => {
    if (!ts.isCallExpression(node)) return;
    let callee: string | undefined;
    if (ts.isIdentifier(node.expression)) callee = bound.get(node.expression.text);
    else if (ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression) && namespaces.has(node.expression.expression.text)) {
      callee = node.expression.name.text;
    }
    if (callee === undefined || !LAUNCH_CALLS.includes(callee)) return;
    const first = node.arguments[0];
    found.push({ module, callee, command: first !== undefined && ts.isStringLiteralLike(first) ? first.text : "<expression>" });
  });
  return found;
}
let foreignCache: string[] | undefined;
/** The commands src launches by name other than rf: the stand-ins beside the stand-in rf. */
function foreignCommands(): string[] {
  foreignCache ??= [...new Set(trackedScriptModules().flatMap(module => launchSites(module).map(site => site.command)))]
    .filter(command => command !== "rf" && /^[a-z][a-z0-9-]*$/.test(command))
    .sort();
  return foreignCache;
}
/** Identifiers that reach an I/O global (a property name of an access is not a reference). */
function ioGlobalReferences(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!ts.isIdentifier(node) || !IO_GLOBALS.includes(node.text)) return;
    if (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) return;
    found.push(`${module}:${node.text}`);
  });
  return found;
}
/** The tool providers, model host and tool SDK native-modules.ts loads besides the render module, and the packages they import. */
function foreignSet(): { modules: string[]; externals: string[] } {
  const loaded = specifiers(parse(NATIVE_LOADER)).filter(specifier => {
    const source = parse(NATIVE_LOADER);
    let dynamic = false;
    visit(source, node => {
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        const first = node.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first) && first.text === specifier) dynamic = true;
      }
    });
    return dynamic;
  });
  const modules = loaded.map(specifier => resolveModule(NATIVE_LOADER, specifier)).filter((module): module is string => module !== undefined && module !== RENDER_MODULE);
  const externals = new Set(loaded.filter(specifier => resolveModule(NATIVE_LOADER, specifier) === undefined));
  for (const module of modules) for (const specifier of specifiers(parse(module))) if (resolveModule(module, specifier) === undefined && !isBuiltin(specifier)) externals.add(specifier);
  return { modules: [...new Set(modules)].sort(), externals: [...externals].sort() };
}
function exportedFunctions(module: string): string[] {
  return parse(module)
    .statements.filter((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement))
    .filter(statement => statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true)
    .map(statement => statement.name?.text ?? "<anonymous>")
    .sort();
}

// ---- the until-then readers (row T) ----

function componentModules(paths: readonly string[]): string[] {
  return paths.filter(path => COMPONENT_MODULE.test(path));
}
/** Hook-form and descriptor-name identifiers and TSX SDK specifiers in one source text. */
function hookMentions(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (ts.isIdentifier(node) && (HOOK_NAME.test(node.text) || node.text === DESCRIPTOR_NAME)) found.push(`${module}:${node.text}`);
  });
  for (const specifier of specifiers(source)) if (specifier === TSX_SDK || specifier.startsWith(`${TSX_SDK}/`)) found.push(`${module}:import ${specifier}`);
  return found;
}
const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies", "bundleDependencies", "bundledDependencies"];
function manifestMentions(manifest: JsonObject): string[] {
  return DEPENDENCY_MAPS.flatMap(map => {
    const entries = manifest[map];
    if (Array.isArray(entries)) return entries.filter(name => name === TSX_SDK).map(() => `${map}:${TSX_SDK}`);
    return isObject(entries) && Object.hasOwn(entries, TSX_SDK) ? [`${map}:${TSX_SDK}`] : [];
  });
}
function lockMentions(lock: JsonObject): string[] {
  const packages = lock.packages;
  if (!isObject(packages)) return ["<no packages map>"];
  return Object.entries(packages).flatMap(([path, entry]) => {
    const named = isObject(entry) && entry.name === TSX_SDK;
    return path === `node_modules/${TSX_SDK}` || path.endsWith(`/node_modules/${TSX_SDK}`) || named ? [path] : [];
  });
}
function joinedFold(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
/** Every key and string of a value at any depth, each with its path. */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, child]) => [{ path: `${path}.${key}#key`, text: key }, ...textsOf(child, `${path}.${key}`)]);
  return [];
}
function phraseMentions(value: unknown, location: string, phrases: readonly string[]): string[] {
  return textsOf(value, location).flatMap(entry => phrases.filter(phrase => joinedFold(entry.text).includes(phrase)).map(phrase => `${entry.path}|${phrase}`));
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
async function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  const registry = new CapabilityRegistry();
  (await loadWorkbenchNative()).registerNativeProviders(registry, REPO);
  return descriptorsOf(registry);
}
function injectedDescriptors(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return descriptorsOf(registry);
}
function renderIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors.map(descriptor => descriptor.id).filter(id => /(?:^|\.)render(?:\.|$)/.test(id));
}

// ---- the bead's export row ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The first "Acceptance:" sentence of the notes. */
function acceptance(notes: string): string | undefined {
  return /Acceptance: (.+?)\.(?:\s|$)/.exec(notes)?.[1];
}
/** The acceptance's clauses: what the falsifier proves (two, split at " and "), and the attempt after its comma. */
function acceptanceClauses(sentence: string): string[] {
  const match = /^a render-abort falsifier proving (.+?) and (.+?), with (.+)$/.exec(sentence);
  return match === null ? [] : [match[1] ?? "", match[2] ?? "", match[3] ?? ""];
}
/** The title's artifact clause, its render kinds, its effect classes and its two interests (joined fold of the head words). */
function titleParts(title: string): { artifact: string | undefined; kinds: string[]; effects: string[]; phrases: string[] } {
  const artifact = /Artifact: (.+?)\.?$/.exec(title)?.[1];
  const kinds = /proposals from (.+?) renders shall never commit/.exec(title)?.[1]?.split(" or ") ?? [];
  const effects = /shall create no (.+?) effect during render/.exec(title)?.[1]?.split(/, | or /) ?? [];
  const interests = /may describe a (.+?) or (.+?) but /.exec(title);
  const phrases = interests === null ? [] : [interests[1] ?? "", interests[2] ?? ""].map(phrase => joinedFold(phrase.split(" ").slice(-2).join(" ")));
  return { artifact, kinds, effects, phrases };
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const seen = (await sweepOnce()).filter(entry => KIND[entry.scenario] === "aborted");
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    return json({ clause: SERVES.A1, kind: "aborted", passes: seen.map(commitLine) });
  },
  A2: async () => {
    const seen = (await sweepOnce()).filter(entry => KIND[entry.scenario] === "suspended");
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    return json({
      clause: SERVES.A2,
      kind: "suspended",
      passes: seen.map(commitLine),
      cancelledWhileQueued: seen.filter(entry => entry.scenario === "queued").map(entry => `${entry.pass}: ${entry.cancelledWhileQueued}`),
    });
  },
  A3: async () => {
    const settled: string[] = [];
    for (const id of NATIVE_PASSES) {
      for (const view of id === "native-preview" ? [false] : [false, true]) {
        const { outcome, argv } = await settledNative(id, fullShapeRf, view);
        const form = outcome.kind === "returned" && uncommitted(outcome.value) ? "uncommitted" : "NOT uncommitted";
        settled.push(`${id}/${view ? "view" : "legacy"}: ${outcomeText(outcome)} ${form} | ${argv.map(args => args.join(" ")).join(" ; ")}`);
      }
    }
    const committed: string[] = [];
    for (const form of COMMITTED_FORMS) {
      for (const id of ["native-registry", "native-direct"] as const) {
        const { outcome } = await settledNative(id, committedForm(form), false);
        committed.push(`${id}/${form}: ${outcomeText(outcome)}`);
      }
    }
    return json({ clause: SERVES.A3, kind: "settled", settled, committed });
  },
  A4: async () => {
    const seen = await sweepOnce();
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    return json({ clause: SERVES.A4, judges: ["tool", "host"], stand_ins: ["rf", ...foreignCommands()], passes: seen.map(effectLine) });
  },
  A5: async () => {
    const reach = closure(RENDER_MODULE);
    const foreign = foreignSet();
    const launchesInReach = reach.modules.flatMap(module => childProcessLaunches(module));
    const io = reach.modules.flatMap(module => ioGlobalReferences(module));
    const ioBuiltins = reach.modules.flatMap(module =>
      specifiers(parse(module))
        .filter(specifier => isBuiltin(specifier) && IO_BUILTINS.includes(specifier.replace(/^node:/, "")))
        .map(specifier => `${module}:${specifier}`),
    );
    const overlap = [...reach.modules.filter(module => foreign.modules.includes(module)), ...reach.externals.filter(external => foreign.externals.includes(external))];
    expect(overlap, "the render pass reaches a tool provider, model host or tool SDK native-modules.ts loads").toEqual([]);
    expect(io, "the render pass reaches an I/O global").toEqual([]);
    const rfSites = trackedScriptModules().flatMap(module => launchSites(module).filter(site => site.command === "rf"));
    const planted = parse("planted/reach.ts", PLANTED_REACH);
    const controls = {
      specifiers: specifiers(planted),
      childProcessLaunches: childProcessLaunches("planted/reach.ts", planted),
      launchSites: launchSites("planted/reach.ts", planted),
      ioGlobals: ioGlobalReferences("planted/reach.ts", planted),
    };
    return json({
      clause: SERVES.A5,
      judges: ["tool", "model", "host"],
      modules: reach.modules,
      externals: reach.externals,
      launches: launchesInReach,
      ioBuiltins,
      ioGlobals: io,
      foreign,
      overlap,
      rfSitesInSrc: rfSites,
      controls,
    });
  },
  A6: async () => {
    const verdicts: Record<string, string[]> = {};
    const outcomes: Record<string, string> = {};
    for (const [name, control] of Object.entries(CONTROLS)) {
      const seen = await control.run();
      verdicts[name] = falsify(seen);
      outcomes[name] = outcomeText(seen.outcome);
      expect(verdicts[name], `control ${name} trips exactly its expected classes`).toEqual([...control.expected]);
    }
    const tripped = new Set(Object.values(verdicts).flat());
    expect(VIOLATIONS.filter(violation => !tripped.has(violation)), "every violation class has a control that trips it").toEqual([]);
    return json({ clause: SERVES.A6, controls: verdicts, outcomes });
  },
  T1: async () => {
    const tracked = trackedPaths();
    const components = componentModules(tracked);
    expect(components, TRIGGER).toEqual([]);
    return json({
      missing: REQUIRED_TRACKED.filter(path => !tracked.includes(path)),
      trackedBelowFloor: tracked.length < FLOORS.tracked,
      components,
    });
  },
  T2: async () => {
    const tracked = trackedScriptModules();
    const walked = walkedScriptModules();
    const read: string[] = [];
    const mentions: string[] = [];
    for (const module of tracked) {
      mentions.push(...hookMentions(module));
      read.push(module);
    }
    const manifest = manifestMentions(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")) as JsonObject);
    const lock = lockMentions(JSON.parse(readFileSync(join(REPO, "package-lock.json"), "utf8")) as JsonObject);
    expect([...mentions, ...manifest, ...lock], TRIGGER).toEqual([]);
    return json({
      readEqualsTracked: JSON.stringify(read) === JSON.stringify(tracked),
      walkEqualsTracked: JSON.stringify(walked) === JSON.stringify(tracked),
      modulesBelowFloor: read.length < FLOORS.srcModules,
      mentions,
      manifest,
      lock,
    });
  },
  T3: async () => {
    const { phrases } = titleParts(exportRow().title);
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const mentions = [...native.flatMap(descriptor => phraseMentions(descriptor, `native:${descriptor.id}`, phrases)), ...injected.flatMap(descriptor => phraseMentions(descriptor, `injected:${descriptor.id}`, phrases))];
    expect(mentions, TRIGGER).toEqual([]);
    const leg = (descriptors: readonly CapabilityDescriptor[]): JsonValue =>
      json({ ids: descriptors.map(descriptor => descriptor.id).sort(), render: descriptors.find(descriptor => descriptor.id === PREVIEW)?.description ?? null });
    return json({ phrases, belowFloor: native.length + injected.length < FLOORS.descriptors, native: leg(native), injected: leg(injected), mentions });
  },
  T4: async () => {
    const { phrases } = titleParts(exportRow().title);
    const planted = parse("planted/panel.ts", PLANTED_SOURCE);
    return json({
      components: componentModules(PLANTED_PATHS),
      hooks: hookMentions("planted/panel.ts", planted),
      manifest: manifestMentions(PLANTED_MANIFEST),
      lock: lockMentions(PLANTED_LOCK),
      descriptor: phraseMentions(
        { id: "planted.render", description: PLANTED_DESCRIPTION, inputSchema: { type: "object", properties: { [PLANTED_KEY]: { type: "string" } } } },
        "planted",
        phrases,
      ),
    });
  },
  Q1: async () => {
    const relayed: string[] = [];
    for (const id of ["injected-registry", "injected-direct"] as const) {
      const made = bench("settled");
      const reader = new Reader(made.root, false, committedForm("commit_seq"));
      const driven = await pass(id, made, {}, reader);
      const outcome = await settle(driven.run(`${id}-relay`, new AbortController().signal));
      const result = outcome.kind === "returned" ? sourceOf(outcome.value)?.result : undefined;
      relayed.push(`${id}: ${outcomeText(outcome)} commit_seq ${isObject(result) ? String(result.commit_seq) : "absent"}`);
    }
    return json({ relayed });
  },
  Q2: async () => {
    const stated = (root: string): JsonValue => {
      const envelope = fullShapeRf(root) as JsonObject;
      const result = envelope.result as JsonObject;
      result.effects = [{ kind: "stated-by-rf" }];
      result.plan = { operations: [{ kind: "stated-by-rf" }], would_commit: true };
      return envelope;
    };
    const { outcome } = await settledNative("native-direct", stated, false);
    const result = outcome.kind === "returned" ? sourceOf(outcome.value)?.result : undefined;
    return json({ outcome: outcomeText(outcome), effects: isObject(result) && Array.isArray(result.effects) ? result.effects.length : null, plan: isObject(result) ? result.plan : null });
  },
  Q3: async () => {
    const { phrases } = titleParts(exportRow().title);
    return json({
      hooks: hookMentions("probe/other-hooks.ts", parse("probe/other-hooks.ts", OTHER_HOOKS)),
      descriptor: phraseMentions({ id: "probe.render", description: OTHER_PHRASES }, "probe", phrases),
    });
  },
  Q4: async () => {
    const made = bench("settled");
    const entries = (process.env.PATH ?? "").split(delimiter);
    const outcome = await settle(nativeReactiveFiberRender({ model: "m", task: "stand-in" }, made.root));
    return json({ entries: entries.map(entry => (entry === made.bin ? "<bench>" : "<other>")), outcome: outcomeText(outcome), logged: launches(made).map(launch => launch.bin) });
  },
  Q5: async () => {
    const seen = await controlObservation("elsewhere", "settled", "settled", async (made, tag) => {
      writeFileSync(join(made.bin, "written-elsewhere.json"), "{}\n");
      return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
    });
    return json({ verdict: falsify(seen) });
  },
};

describe("wb-pyel.5 render-abort falsifier (SDK-EVIDENCE-DIRECTED-COMPUTATION-R12) and its until-then trigger", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's export row, src and the cases agree", { timeout: 120_000 }, async () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "T:4", "Q:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        preview: PREVIEW,
        grants: GRANTS,
        renderModule: RENDER_MODULE,
        nativeLoader: NATIVE_LOADER,
        renderVerb: RENDER_VERB,
        uncommittedTail: UNCOMMITTED_TAIL,
        registryDeadlineMs: REGISTRY_DEADLINE_MS,
        passes: PASSES,
        entry: ENTRY,
        nativePasses: NATIVE_PASSES,
        registryPasses: REGISTRY_PASSES,
        scenarios: SCENARIOS,
        kind: KIND,
        driven: DRIVEN,
        violations: VIOLATIONS,
        clauseOf: CLAUSE_OF,
        committedForms: COMMITTED_FORMS,
        controls: Object.fromEntries(Object.entries(CONTROLS).map(([name, control]) => [name, control.expected])),
        launchCalls: LAUNCH_CALLS,
        childProcess: CHILD_PROCESS,
        ioGlobals: IO_GLOBALS,
        ioBuiltins: IO_BUILTINS,
        tsxSdk: TSX_SDK,
        hookName: `/${HOOK_NAME.source}/${HOOK_NAME.flags}`,
        descriptorName: DESCRIPTOR_NAME,
        scriptModule: `/${SCRIPT_MODULE.source}/${SCRIPT_MODULE.flags}`,
        componentModule: `/${COMPONENT_MODULE.source}/${COMPONENT_MODULE.flags}`,
        requiredTracked: REQUIRED_TRACKED,
        floors: FLOORS,
        trigger: TRIGGER,
        residuals: RESIDUALS,
        serves: SERVES,
        otherHooks: OTHER_HOOKS,
        otherPhrases: OTHER_PHRASES,
        plantedPaths: PLANTED_PATHS,
        plantedSource: PLANTED_SOURCE,
        plantedManifest: PLANTED_MANIFEST,
        plantedLock: PLANTED_LOCK,
        plantedDescription: PLANTED_DESCRIPTION,
        plantedKey: PLANTED_KEY,
        plantedReach: PLANTED_REACH,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    // The bead's export row: row A quotes the acceptance, row T the title's artifact clause.
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const sentence = acceptance(notes);
    expect(ROWS.find(row => row.id === "A")?.label, "row A quotes the acceptance sentence").toBe(sentence);
    const clauses = acceptanceClauses(sentence ?? "");
    expect(clauses, "the acceptance names what the falsifier proves and the attempt that goes red").toHaveLength(3);
    const rowA = ROWS.find(row => row.id === "A")?.pins ?? [];
    expect(Object.keys(SERVES).sort(), "SERVES names each row A pin").toEqual([...rowA].sort());
    for (const pin of rowA) {
      const witness = rosterWitness(pin);
      expect(isObject(witness) ? witness.clause : undefined, `${pin}'s roster witness serves the clause SERVES names`).toBe(SERVES[pin]);
    }
    expect([...new Set(Object.values(SERVES))].sort(), "the acceptance's clauses are each served by a row A pin, both ways").toEqual([...clauses].sort());
    const parts = titleParts(title);
    expect(ROWS.find(row => row.id === "T")?.label, "row T quotes the title's artifact clause").toBe(parts.artifact);
    expect(
      [...new Set(SCENARIOS.map(scenario => KIND[scenario]).filter(kind => kind !== "settled"))].sort(),
      "the scenario kinds are the title's render kinds, both ways",
    ).toEqual([...parts.kinds].sort());
    for (const kind of parts.kinds) {
      const pin = rowA.find(id => {
        const witness = rosterWitness(id);
        return isObject(witness) && witness.kind === kind;
      });
      expect(pin, `a row A pin judges the ${kind} renders`).toBeDefined();
    }
    const judged = new Set(
      rowA.flatMap(id => {
        const witness = rosterWitness(id);
        return isObject(witness) && Array.isArray(witness.judges) ? witness.judges.filter((item): item is string => typeof item === "string") : [];
      }),
    );
    expect([...judged].sort(), "the effect classes row A judges are the title's, both ways").toEqual([...parts.effects].sort());
    expect(parts.phrases, "T3 reads the title's two interests").toHaveLength(2);
    // src: the render module's contract source states the uncommitted render, so a row A pin judges the settled form.
    expect(REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit"), "the render module's contract source states the uncommitted render").toBe(true);
    const settledPin = rowA.find(id => {
      const witness = rosterWitness(id);
      return isObject(witness) && witness.kind === "settled";
    });
    expect(settledPin, "a row A pin judges the settled form the contract source states").toBeDefined();
    // src: the passes are the render module's exported functions, every registered render capability is driven.
    expect([...new Set(Object.values(ENTRY))].sort(), "the passes enter through every exported function of the render module, both ways").toEqual(
      exportedFunctions(RENDER_MODULE),
    );
    expect(Object.keys(ENTRY).sort()).toEqual([...PASSES].sort());
    const native = renderIds(await nativeDescriptors());
    const injected = renderIds(injectedDescriptors());
    expect({ native, injected }, "every registered render capability of both registrations is the one the registry passes drive").toStrictEqual({
      native: [PREVIEW],
      injected: [PREVIEW],
    });
    expect(REGISTRY_PASSES.map(id => ENTRY[id]).sort(), "a registry pass drives each registration").toEqual(["registerNativeReactiveFiberRender", "registerReactiveFiberRender"]);
    for (const id of PASSES) {
      expect(DRIVEN[id].includes("queued") || DRIVEN[id].includes("deadline"), `${id} is held by a registry exactly when it is a registry pass`).toBe(REGISTRY_PASSES.includes(id));
      expect(DRIVEN[id].includes("running"), `${id} drives a running child exactly when it is native`).toBe(NATIVE_PASSES.includes(id));
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 300_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", { timeout: 60_000 }, ({ task }) => {
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
