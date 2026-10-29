/**
 * wb-pyel.1 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1, program-triage-2026-10-18), the until-then leg: the Fiber host-publication
 * census. Statement (bead title, verbatim): "If Pi-subagents ever hosts FiberOpticsSDK (or any Fiber value-publication surface
 * beyond today's --no-commit rf previews), host-originated publication shall be explicitly flushed by the Pi host and shall
 * never occur as an automatic effect or inference of a query change, preserving the render/prepare/commit/dispatch lifecycle.
 * Artifact: a registered Pi Fiber-hosting or Fiber-publishing capability (none exists)."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C are its three clauses, in order): "before any Fiber-hosting
 * capability registers, a falsifier proves publication happens only through an explicit host flush call, and a query change
 * alone produces zero publication or inference side effects."
 *
 * SOURCE (read-only git show at FiberOpticsSDK dcc5b57c4aed, the bead's citation, by the cutting seat): docs/programs/
 * evidence-directed-computation-2026-10-18.md:17 "7. Preserve render/prepare/commit/dispatch. Host-originated publication
 * remains explicitly flushed; no automatic effect or inference when query changes." and :3 "**Status:** DESIGN, not shipped."
 * (both lines unchanged at origin/master 2099f193cccf). The producer's host contract at the pin, src/fiber_optics/runtime.py:
 * FiberRuntime (:668) queues a value publication with queue_value_publication (:1233: "it only queues ... The host owns the
 * drain ... Fiber never drains on its own") and delivers it when the host awaits flush_value_publications (:1355); a rerender is
 * requested with request_rerender (:838) and delivered by flush_requested_renders (:922); FiberGraph and FiberScheduler are the
 * other two hosted classes the package root exports (src/fiber_optics/__init__.py:67, :119). Its distributions: the wheel
 * FiberOpticsSDK (pyproject.toml [project].name; packages src/FiberOpticsSDK, src/fiber_optics, src/fiber_optics_research)
 * and the crate fiber-optics-replay-observer (rust/replay_observer/Cargo.toml). The roster vendors line 17 with its SHA256.
 *
 * MEASURED AT BASE (04123dc, landing 671; seat ws-02, run g10-work-s138, 2026-10-29; cut #1 measured 864dff9): no tracked file
 * below src, no tracked dependency manifest, package.json or package-lock.json spells the producer's stem, a hosted class or a
 * publication entry (git grep, 0 rows each), and every tracked file below src (117) is a script module. Pi's one Fiber surface
 * is rf: the two reactivefiber.render.preview registrations (effectClass read, supportedModes [invoke], the carrier contract
 * ending --no-commit) and their one launch, nativeReactiveFiberRender's spawn of renderArgv, which always ends --no-commit
 * --no-input --json; the native preview admits a noncommitted envelope only (isPreviewEnvelope). CapabilityRegistry's entries
 * are request/response (invoke, inspect) and a provider is {descriptor, invoke, inspect?}: no subscription exists. So the
 * trigger has not fired: Pi hosts no Fiber runtime, holds no host publication or flush call, and has no query-change hook.
 *
 * CUT #2 (respin 1) answers refusal #1 (BIND 2026-10-28T18:53:04Z, unmet U1-U4): U1 every tracked file below src is read (a
 * non-script file as raw lines) and every tracked dependency manifest is read, so a Python sidecar, a JSON host manifest or a
 * requirements.txt naming a needle reds; U2 every pin of rows A, B and C and every residual family of row Q is anchored to
 * the delivery record in the tracker export; U3 the segmented fold keeps rf's own layout ".reactive-fiber/graphs" quiet; the
 * F4 rider: C1 also reads an instance's own keys and the static members. U4 is the delivery note's clean-claim line.
 *
 * THE VOCABULARY. Every reading compares the SEGMENTED FOLD of a text with three needle sets: the text is cut at whitespace and
 * at path separators (/ and \) into segments, each segment takes the joined fold (NFKC, lower case, every character outside a-z
 * and 0-9 removed; so fiber_optics, fiber-optics, FiberOptics and "@fiber-optics/sdk" all hold it), and a text holds a needle
 * when one of its segments does (so rf's workspace layout ".reactive-fiber/graphs" holds no FiberGraph). STEM, the title's
 * distribution word (the one word after "hosts") with its SDK suffix dropped, held to every DISTRIBUTIONS name;
 * HOSTED_CLASSES (FiberRuntime, FiberGraph, FiberScheduler); PUBLICATION_ENTRIES (the four queue/request and flush entries).
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns a measured witness held to the roster):
 *  A, the trigger ("before any Fiber-hosting capability registers"), absent today, and the title's artifact.
 *    A1 THE MANIFESTS: package.json read whole (every key and string at any depth, parsed, and every raw line, so a shadowed
 *    duplicate key is read), package-lock.json's installed package paths and name fields, and every other tracked dependency
 *    manifest at any depth outside test/ (a base name in MANIFEST_NAMES, a pip requirements or constraints file with requirements/constraints in its name, or a file of
 *    pip's requirements/ directory: the npm, Python and Rust ecosystems, since Pi is an npm package and the producer ships a
 *    Python wheel and a Rust crate) read as raw lines, name no STEM; test/ is left out because .npmignore keeps it out of the
 *    published package (the witness reads that line), so a fixture manifest declares nothing of Pi's; the readers' controls: one planted dependency per dependency
 *    list, a nested value, a raw shadowed duplicate key, a lock path and a lock name read, two near misses quiet, and a scratch
 *    tree read through the same pipeline (a manifest of each ecosystem read at the root and at depth, a near miss quiet, a
 *    Dockerfile and a fixture below test/ not selected). An arbitrary pip -r/--requirement filename lacking requirements/constraints, and a generated lock format outside the named set are not selected. The witness pins needle hits, never the list of manifests, so an
 *    unrelated manifest a later cut adds reds nothing.
 *    A2 THE SRC FILES: every tracked file below src (git ls-files, held both ways to a filesystem walk of src that records and
 *    never follows a symlink) is read: a script module through its TypeScript AST (identifiers, private names, string, template
 *    and regular-expression literal texts, so every import, export, dynamic import, require and spawn argument, and JSX text;
 *    never a comment), any other file (a Python sidecar, a JSON host manifest, a binary) as raw lines, comments included; none
 *    holds a STEM or HOSTED_CLASSES fold (needle hits are pinned, never the list of files, so an unrelated file a later cut adds
 *    below src reds nothing); anchors in the provider show the reader reads the live tree; the walk and git's
 *    listing both list a non-script file (the roster); planted modules (one per reading position) read, near misses (rf's
 *    layout among them) quiet; a scratch src tree (a launcher, a Python sidecar, a JSON host manifest, rf's layout as JSON) read
 *    through the same pipeline.
 *    A3 THE REGISTERED CAPABILITIES (the title's artifact, "(none exists)"): every descriptor the native registration and the
 *    four injected-client registrations register, read whole, holds no needle of any set; A3 also pins every exported register* function and every `registry.register`/native bridge call in tracked src to a static roster, so a new registration site or function reds. Its Fiber family (a descriptor
 *    whose id, a permission or its contract folds to hold "fiber", or whose contract is rf's, rf@...) is exactly the read
 *    preview: effectClass read, supportedModes [invoke], the carrier contract ending --no-commit; each leg states its
 *    preview's own description, so a leg read from the other registration reds; planted descriptors (a hosted runtime, a
 *    flush, a committing render, an observe mode, an rf contract naming no fiber and lacking the flag, a publication entry in
 *    a description, a hosted class nested in an input schema) read as they must and the neutral ones (rf's layout in a
 *    description among them) quiet.
 *    A4 THE LAUNCH (the title's "today's --no-commit rf previews"): src's rf launch roster (in a script module, a launcher call,
 *    by name or as a member, whose first argument is the literal rf; in any other file below src, a line naming rf as a word,
 *    a conservative launch-candidate reading: such a file reds A4 for a look even when it only mentions rf) is the provider alone, and through a stand-in rf (the ONLY PATH entry, logging each argv) both input arms of the native
 *    preview spawn exactly one render each, every argv `context render ... --no-commit --no-input --json`.
 *  B, "a falsifier proves publication happens only through an explicit host flush call", read where Pi could publish today.
 *    B1 THE COMMITTED FORMS: through the stand-in rf each commit marker a committing render states (transaction_id,
 *    result.render_id, result.ephemeral false, result.commit_seq, result.work.storage_write_count 1; the bead notes name three
 *    of them) is refused by the native preview on both arms as transport, never returned, while the noncommitted fixture is
 *    returned: zero publications reach Pi through its one Fiber surface.
 *    B2 NO PUBLICATION OR FLUSH ENTRY: no tracked file below src (the A2 reading) names a PUBLICATION_ENTRIES fold, so no host
 *    publication and no flush exist for the rule to judge; planted calls read (snake, camel, string key, destructured, and the
 *    scratch tree's Python sidecar), near misses (flush, publish, render, requestRender) quiet.
 *  C, "a query change alone produces zero publication or inference side effects".
 *    C1 NO REACTIVE ENTRY: the registry's members (its prototype chain, an instance's own keys, so a class field, and the static
 *    members along its constructor chain) and the two preview providers' own keys ({descriptor, invoke}) hold no
 *    REACTIVE_WORDS fold, the registry still serves invoke and inspect, and registering either preview creates no async
 *    resource (an async_hooks init hook enabled for exactly the synchronous registration counts none: no timer, ref'd or
 *    unref'd, no immediate, tick, promise, watcher or child), so nothing exists that could run on a change; controls: a
 *    registry member named subscribe (declared, inherited through a subclass, a class field and a static member) and a
 *    provider polling an interval read.
 *    C2 A QUERY CHANGE ALONE: after registration the rf workspace is edited (a definition rewritten, a component added, a
 *    source removed) and over SETTLE_MS the stand-in logs no launch and the injected client no call; one explicit invoke,
 *    its selector mutated before the call, then launches exactly one render carrying the mutated selector, --no-commit, whose
 *    value is noncommitted; a second change after it (the workspace edited again and the caller's selector object mutated)
 *    launches nothing more over SETTLE_MS; a planted reactive provider (an interval that launches on the same edit) is seen
 *    launching within the window, so the channel is live. An inference side effect is read as a render launched without a
 *    request (rf infers context; the preview performs no other inference) and a publication one as a commit marker or a
 *    store write; the workspace is the stand-in's scratch, never a real rf store.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants, the controls, the residual families and every registered test title - is held to
 * the out-of-file roster (test/fixtures/fiber-host-publication-roster.json). OUTSIDE ANCHORS, read from the tracker export
 * (.beads/issues.jsonl): the bead's first Acceptance sentence (so later notes do not move it) makes rows A, B and C the
 * acceptance's three clauses in order; STEM is the title's distribution word; A3's artifact phrase and A4's flag are the
 * title's own words; B1's forms include the three markers the notes name; the notes' Authority quote is the vendored producer
 * line's sentence, and the roster's SHA256 is that line's. THE DELIVERY RECORD (cut #1's delivery note, append-only, each line
 * read at its first occurrence): rows A, B and C keep every pin their CLAIM line (`- <id> "<label>": ...`) names, and row Q
 * keeps every quiet-row pin with the residual family its FINDINGS and OTHER RESIDUALS lines pair it with (`Q<n> R-<FAMILY>`);
 * the roster holds that reading too, so a reader of the record that reads less reds. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins
 * that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together): a pin or a residual family a later cut adds beyond the delivery
 * record (none today), removed whole; a control removed from its list and the roster; a pin's case replaced by one that echoes
 * its roster witness; git's listing replaced by the walk it anchors.
 * RESIDUALS (named, each with its pinned quiet row): R-COMPOSED a stem, class or entry composed at run time from parts is not
 * read by the source scans (Q1); R-NON-CODE a comment in a src script module naming one is not read (a non-script file below
 * src is read whole, comments included) (Q2); R-OUTSIDE-SRC a hosting module outside src (qa/, examples/, an operator's local
 * provider module, a vendored dist), or a dependency stated outside src in a file of no manifest name (a Dockerfile, a setup
 * script, a tox.ini), a pip -r file with an arbitrary name, a generated lock of an unlisted format, or a manifest below test/ (never published), is not read (Q3); R-INJECTED-RELAY the injected registration relays its host client's envelope unchecked, so a
 * committed envelope from an injected client is returned as a value (Q4; the native preview is the admission point);
 * R-UNREAD-MARKER the native admission reads the five markers of B1, so a noncommitted envelope stating plan.would_commit true
 * or a non-empty effects list is admitted (Q5); R-LATE-REACTION C2's window is SETTLE_MS, so a reaction delayed past it is not
 * seen there: one armed at registration is seen by C1's created-resource reading (Q6 pins both readings), one armed by an
 * invocation is read by neither; R-OTHER-VOCABULARY Fiber hosting spelled with none of the needles (another package name,
 * another verb, or a needle's words split by whitespace or a path separator, "Fiber Optics", "fiber/optics"), a dynamic registry.register alias whose call text has no register name, or a reactive
 * member named with none of the REACTIVE_WORDS (an emitter's on, off or once, a symbol-keyed async iterator), is not read (Q7).
 * NOT DELIVERED (the armed half): the falsifier that drives a registered Fiber-hosting capability - queued publications with no
 * flush deliver nothing, one explicit flush delivers them, and a query change alone delivers nothing - needs that capability,
 * and none exists. A cut that registers one through the native or an injected-client registration, adds a static registration site or
 * exported register* function in tracked src (as A3 reads them), or names a needle the readings read (in any tracked file
 * below src, or a tracked dependency manifest whose filename is selected by isManifest outside test/), reds
 * A (or B2) by design and must bring that falsifier with it; wb-jwc.5 holds the committing-render posture if the rf commit path
 * is the vehicle.
 *
 * Display paths added: none. Test-only: the stand-in rf, its argv log, the seeded rf workspace and the planted trees live in
 * makeScratch scratch, with its leak guard installed; src, the manifests, the fixtures and the bead export are only read.
 */
import { createHook } from "node:async_hooks";
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityProvider,
  CapabilityRegistry,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-pyel.1";
/** The roster, root-relative: also A2's witness that the walk and git's listing select a non-script file. */
const ROSTER_FILE = "test/fixtures/fiber-host-publication-roster.json";
const ROSTER_PATH = join(REPO, ROSTER_FILE);
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PROVIDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const PREVIEW_ID = "reactivefiber.render.preview";

// ---- the vocabulary ----

/** The producer's stem: the title's distribution word, folded, its SDK suffix dropped (held to the title in the judged set). */
const STEM = "fiberoptics";
/** The producer's distribution, import-package and crate names at the pin; each folds to hold STEM. */
const DISTRIBUTIONS = ["FiberOpticsSDK", "fiber_optics", "fiber_optics_research", "fiber-optics-replay-observer"] as const;
/** The classes a Pi host would construct to host Fiber (the package root's exports at the pin). */
const HOSTED_CLASSES = ["FiberRuntime", "FiberGraph", "FiberScheduler"] as const;
/** The host's publication and rerender ingress and their explicit flushes (FiberRuntime's methods at the pin). */
const PUBLICATION_ENTRIES = ["queue_value_publication", "flush_value_publications", "request_rerender", "flush_requested_renders"] as const;
/** The title's flag: today's rf previews are --no-commit renders. */
const NO_COMMIT = "--no-commit";
/** The title's artifact sentence, its object: what A3 judges absent. */
const ARTIFACT = "a registered Pi Fiber-hosting or Fiber-publishing capability (none exists)";
/** A member name folding to hold one of these is a reactive entry (a subscription, a watcher, a scheduled or streamed effect). */
const REACTIVE_WORDS = ["subscribe", "observe", "watch", "listen", "notify", "emit", "react", "stream", "poll", "schedule"] as const;
/** The rf launchers A4's static roster reads in a script module: a call by one of these names whose first argument is the literal rf. */
const LAUNCHERS = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"] as const;
/** rf named as a word on a raw line: A4's launch reading of a non-script file below src (an argv list, a shell line, a config value). */
const RF_WORD = /(?<![\w.-])rf(?![\w-])/;
/** The dependency manifests A1 reads at any depth, by base name: the npm, Python and Rust ecosystems. */
const MANIFEST_NAMES = [
  "package.json",
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pyproject.toml",
  "setup.py",
  "setup.cfg",
  "Pipfile",
  "Pipfile.lock",
  "poetry.lock",
  "uv.lock",
  "pdm.lock",
  "environment.yml",
  "environment.yaml",
  "Cargo.toml",
  "Cargo.lock",
] as const;
/** pip's requirement and constraint files (requirements.txt, requirements-dev.txt, constraints.in, ...): manifests too. */
const PIP_REQUIREMENTS = /^(?:(?:[\w.-]*requirements[\w.-]*|[\w.-]*constraints[\w.-]*)\.(?:txt|in|lock)|pylock\.toml)$/i;
/** pip's requirements directory form (requirements/base.txt, requirements/dev.in): manifests at any depth. */
const PIP_REQUIREMENTS_DIR = /(?:^|\/)requirements\/[^/]+\.(?:txt|in)$/;
/** The test tree: .npmignore keeps it out of the published package, so a manifest below it (a fixture) declares no dependency of Pi's. */
const TEST_ROOT = "test/";
/** The root's npm pair, each read by its own reader (package.json whole, package-lock.json by paths and names), never as raw lines. */
const ROOT_NPM = ["package.json", "package-lock.json"] as const;
/** C2's observation window (ms): long enough for the planted reactive provider's launch to log under load. */
const SETTLE_MS = 3000;
/** Q6's delay (ms): a reaction scheduled this far out is never seen inside SETTLE_MS. */
const LATE_MS = 600_000;
/** Floors below the counts measured at base 04123dc (src 117 tracked files, every one a script module, 101769 judged texts; package.json 120 texts; 372 lock packages). */
const FLOORS = { modules: 100, texts: 60000, manifestTexts: 80, lockPackages: 300 } as const;
const SCRIPT_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};
/** The four ids the registrations must hold, native and injected alike. */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", PREVIEW_ID] as const;
/** Texts of the provider module A2's reader must see, so a reader that reads nothing reds on the live tree. */
const SOURCE_ANCHORS = ["rf", NO_COMMIT, "nativeReactiveFiberRender", "fiber_signal_count"] as const;
/** The delivery record's residual lines (cut #1's delivery note), each read at its first occurrence in the bead's notes. */
const RECORD_FINDINGS = "FINDINGS (each a named residual with a pinned quiet row";
const RECORD_RESIDUALS = "OTHER RESIDUALS (quiet rows pinned)";

/** The joined fold: NFKC, lower case, every character outside a-z and 0-9 removed. */
function fold(text: string): string {
  return text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}
/** The segmented fold: the text cut at whitespace and path separators (/ and \), each segment joined-folded, empty ones dropped. */
function segmentFolds(text: string): string[] {
  return text
    .normalize("NFKC")
    .split(/[\s/\\]+/u)
    .map(fold)
    .filter(segment => segment.length > 0);
}
const STEM_NEEDLES: readonly string[] = [STEM];
const HOSTING_NEEDLES: readonly string[] = [STEM, ...HOSTED_CLASSES.map(fold)];
const ENTRY_NEEDLES: readonly string[] = PUBLICATION_ENTRIES.map(fold);
const ALL_NEEDLES: readonly string[] = [...HOSTING_NEEDLES, ...ENTRY_NEEDLES];

/** The needles a text holds (one of its segments' joined fold holds the needle), in needle order. */
function needlesIn(text: string, needles: readonly string[]): string[] {
  const segments = segmentFolds(text);
  return needles.filter(needle => segments.some(segment => segment.includes(needle)));
}

// ---- the controls (each reader's planted positives and near misses; every expectation is pinned in the roster too) ----

const MANIFEST_CONTROLS: Readonly<Record<string, Json>> = {
  dependencies: { dependencies: { "fiber-optics": "^0.1.0" } },
  devDependencies: { devDependencies: { "@fiber-optics/sdk": "0.1.0" } },
  peerDependencies: { peerDependencies: { FiberOpticsSDK: "*" } },
  optionalDependencies: { optionalDependencies: { fiber_optics_research: "*" } },
  bundleDependencies: { bundleDependencies: ["fiber-optics-replay-observer"] },
  nestedValue: { overrides: { "reactive-fiber-cli": { engine: "npm:fiber-optics@0.1.0" } } },
  nearMissRf: { dependencies: { "reactive-fiber-cli": "1.0.0" } },
  nearMissSplit: { keywords: ["fiber", "optics"] },
};
/** A raw manifest whose first dependencies key JSON.parse shadows with the second: only the raw-line reading sees it. */
const SHADOWED_MANIFEST = '{ "dependencies": { "fiber-optics": "1.0.0" }, "dependencies": {} }';
const LOCK_CONTROLS: Readonly<Record<string, Json>> = {
  lockPath: { packages: { "node_modules/fiber-optics": { version: "0.1.0" } } },
  lockName: { packages: { "node_modules/alias": { name: "FiberOpticsSDK", version: "0.1.0" } } },
  lockQuiet: { packages: { "node_modules/reactive-fiber": { version: "1.0.0" } } },
};
/** A1's scratch tree, read through the manifest pipeline: a manifest of each ecosystem at the root and at depth, a near miss, a Dockerfile. */
const MANIFEST_TREE: Readonly<Record<string, string>> = {
  "package.json": '{ "name": "host" }\n',
  "requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "requirements/base.txt": "fiber-optics==0.1.0\n",
  "environment.yml": "dependencies:\n  - pip:\n    - FiberOpticsSDK==0.1.0\n",
  "sidecar/requirements-dev.txt": "pytest>=8\nfiber_optics_research>=0.1\n",
  "dev-requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "test-requirements.txt": "fiber_optics==0.1.0\n",
  "requirements.lock": "fiber_optics==0.1.0\n",
  "pylock.toml": "[[packages]]\nname = \"fiber_optics\"\n",
  "test/fixtures/host/requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "tools/value-host/pyproject.toml": '[project]\nname = "value-host"\ndependencies = ["fiber-optics>=0.1"]\n',
  "rust/observer/Cargo.toml": '[dependencies]\nfiber-optics-replay-observer = "0.1"\n',
  "examples/host/package.json": '{ "dependencies": { "@fiber-optics/sdk": "0.1.0" } }\n',
  "constraints.txt": "reactive-fiber-cli==1.0.0\nfiber\noptics\n",
  Dockerfile: "RUN pip install FiberOpticsSDK\n",
};
/** A planted module: its file name (which sets the script kind) and its text. */
interface PlantedModule {
  readonly module: string;
  readonly source: string;
}
const SOURCE_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  importFrom: { module: "import-from.ts", source: 'import { open } from "fiber_optics";\nopen();\n' },
  dynamicImport: { module: "dynamic-import.ts", source: 'export const sdk = await import("@fiber-optics/sdk");\n' },
  requireCall: { module: "require-call.cjs", source: 'const sdk = require("fiber-optics");\nmodule.exports = sdk;\n' },
  sidecarArgv: { module: "sidecar.ts", source: 'import { spawn } from "node:child_process";\nspawn("python3", ["-c", "import fiber_optics"]);\n' },
  runtimeClass: { module: "runtime-class.ts", source: "declare const config: unknown;\nexport const runtime = new FiberRuntime(config);\n" },
  graphType: { module: "graph-type.ts", source: "export let graph: FiberGraph | undefined;\n" },
  schedulerTemplate: { module: "scheduler-template.ts", source: `declare const prefix: string;\nexport const name = \`\${prefix}FiberScheduler\`;\n` },
  regexPattern: { module: "regex-pattern.ts", source: "export const sdk = /fiber[-_]?optics/i;\n" },
  privateName: { module: "private-name.ts", source: "export class Host {\n  #fiberOptics = 1;\n  read(): number {\n    return this.#fiberOptics;\n  }\n}\n" },
  jsxText: { module: "jsx-text.tsx", source: "export const view = <p>FiberOptics</p>;\n" },
  classInPath: { module: "class-in-path.ts", source: 'export const host = "vendor/fiber_optics/FiberGraph.py";\n' },
  nearMiss: { module: "near-miss.ts", source: 'export const reactivefiber = 1;\nexport const fiber_signal_count = 0;\nexport const optics = "fiber";\n' },
  rfLayout: { module: "rf-layout.ts", source: 'export const RF_GRAPHS_DIR = ".reactive-fiber/graphs";\n' },
};
const ENTRY_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  snakeCall: { module: "snake-call.ts", source: "declare const runtime: { queue_value_publication(port: string, value: number): void };\nruntime.queue_value_publication(\"port\", 1);\n" },
  camelCall: { module: "camel-call.ts", source: "declare const runtime: { flushValuePublications(): Promise<void> };\nawait runtime.flushValuePublications();\n" },
  stringKey: { module: "string-key.ts", source: 'declare const host: Record<string, (node: string) => void>;\nhost["request_rerender"]("node");\n' },
  destructured: { module: "destructured.ts", source: "declare const runtime: Record<string, () => void>;\nconst { flush_requested_renders: drain } = runtime;\ndrain();\n" },
  nearMiss: {
    module: "entry-near-miss.ts",
    source: "declare const queue: { flush(): void };\ndeclare function publish(value: number): void;\ndeclare function render(): void;\ndeclare function requestRender(): void;\nqueue.flush();\npublish(1);\nrender();\nrequestRender();\n",
  },
};
const LAUNCH_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  spawnRf: { module: "spawn-rf.ts", source: 'import { spawn } from "node:child_process";\nspawn("rf", ["graph", "show"]);\n' },
  execFileSyncRf: { module: "exec-rf.ts", source: 'import { execFileSync } from "node:child_process";\nexecFileSync("rf", ["--version"]);\n' },
  memberSpawnRf: { module: "member-spawn-rf.ts", source: 'import * as cp from "node:child_process";\ncp.spawn("rf", ["context", "show"]);\n' },
  otherBinary: { module: "spawn-rg.ts", source: 'import { spawn } from "node:child_process";\nspawn("rg", ["-n", "rf"]);\n' },
  pythonLaunch: { module: "render-sidecar.py", source: 'import subprocess\nsubprocess.run(["rf", "context", "render", "--json"], check=True)\n' },
  shellLaunch: { module: "render.sh", source: "#!/bin/sh\nexec rf context render --json\n" },
  rawNearMiss: { module: "notes.txt", source: "rfc 2119 terms; perf counters; surf-board; rf-cli; config.rf\n" },
};
/** A scratch src tree A2, A4 and B2 read through the live pipeline (the walk held to a listing, every reader). */
const PIPELINE_TREE: Readonly<Record<string, string>> = {
  "src/hosts/value-sidecar.ts": 'import { spawn } from "node:child_process";\nspawn("python3", ["value-sidecar.py"]);\n',
  "src/hosts/value-sidecar.py": 'from fiber_optics import FiberRuntime\nFiberRuntime().flush_value_publications()\nsubprocess.run(["rf", "context", "render"])\n',
  "src/providers/value-host.json": '{ "runtime": "FiberGraph" }\n',
  "src/providers/rf-layout.json": '{ "graphs": ".reactive-fiber/graphs" }\n',
};
/** A new exported injected-client capability whose descriptor lives in a constant, not in the register call. */
const REGISTRATION_TREE: Readonly<Record<string, string>> = {
  "src/workbench/providers/value-publish.ts": [
    'const DESCRIPTOR = { id: "fiber.value.publish", effectClass: "write" };',
    'export function registerFiberValuePublish(registry: CapabilityRegistry): void {',
    '  registry.register({ descriptor: DESCRIPTOR, invoke: async () => null });',
    '}',
    '',
  ].join("\n"),
};
const NEVER = (): never => {
  throw new Error("census: a planted or injected capability is never invoked here");
};
/** A planted descriptor for A3's readers; every field a registry accepts. */
function plantedDescriptor(fields: Partial<CapabilityDescriptor> & Pick<CapabilityDescriptor, "id">): CapabilityDescriptor {
  return {
    version: "1.0.0",
    description: "planted",
    inputSchema: { type: "object" },
    effectClass: "read",
    permissions: ["planted:read"],
    supportedModes: ["invoke"],
    ...fields,
  };
}
const DESCRIPTOR_CONTROLS: Readonly<Record<string, CapabilityDescriptor>> = {
  runtimeHost: plantedDescriptor({ id: "fiber.runtime.host", effectClass: "external", permissions: ["fiber:host"], contractSource: "fiber_optics FiberRuntime" }),
  valueFlush: plantedDescriptor({ id: "fiberoptics.value.flush", effectClass: "write", permissions: ["fiberoptics:flush"] }),
  commitRender: plantedDescriptor({
    id: "reactivefiber.render.commit",
    effectClass: "write",
    permissions: ["reactivefiber:commit"],
    contractSource: "rf@0.1.845:reactive-fiber.cli/v1 context.render",
  }),
  observePreview: plantedDescriptor({
    id: PREVIEW_ID,
    permissions: ["reactivefiber:render"],
    supportedModes: ["invoke", "observe"],
    contractSource: REACTIVE_FIBER_CONTRACT_SOURCE,
  }),
  rfContract: plantedDescriptor({ id: "context.render.preview", permissions: ["context:render"], contractSource: "rf@0.1.845:context.render" }),
  entryDescription: plantedDescriptor({ id: "workbench.value.queue", description: "queue_value_publication, then flush_value_publications", effectClass: "write" }),
  previewShape: plantedDescriptor({ id: PREVIEW_ID, permissions: ["reactivefiber:render"], contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }),
  nestedSchema: plantedDescriptor({
    id: "workbench.handle.read",
    inputSchema: { type: "object", properties: { handle: { type: "string", description: "a FiberRuntime handle" } } },
  }),
  rfLayoutDescription: plantedDescriptor({ id: "workbench.layout.read", description: "reads .reactive-fiber/graphs/context.toml" }),
  neutral: plantedDescriptor({ id: "forge.gate.status", permissions: ["forge:gate:status"] }),
};
/** Q1 R-COMPOSED, Q2 R-NON-CODE, Q7 R-OTHER-VOCABULARY: modules the source scans read quiet. */
const COMPOSED_MODULE: PlantedModule = {
  module: "composed.ts",
  source: 'export const name = "fiber" + "_optics";\nexport const entry = ["flush", "value", "publications"].join("_");\nexport const host = "Fiber" + "Runtime";\n',
};
const COMMENT_MODULE: PlantedModule = { module: "comment.ts", source: "// new FiberRuntime() over fiber_optics\n/* flush_value_publications */\nexport {};\n" };
const OTHER_VOCABULARY_MODULE: PlantedModule = {
  module: "other-vocabulary.ts",
  source: 'import { Runtime } from "@reactive/fo-runtime";\nconst runtime = new Runtime();\nruntime.enqueue(1);\nruntime.drain();\nexport const fibre = "fibre optics";\n',
};
const OTHER_VOCABULARY_DESCRIPTOR = plantedDescriptor({ id: "context.engine.host", description: "hosts the value runtime and drains its queue", effectClass: "write" });
/** Q7: member names of a reactive registry spelled with none of the REACTIVE_WORDS (an emitter's on/off/once, a symbol-keyed async iterator). */
const OTHER_VOCABULARY_MEMBERS = ["on", "off", "once", "Symbol(Symbol.asyncIterator)"] as const;
/** Q7: a needle's words split by whitespace or a path separator hold no needle under the segmented fold. */
const SPLIT_SPELLING_MODULE: PlantedModule = {
  module: "split-spelling.ts",
  source: 'export const label = "Fiber Optics";\nexport const graph = "fiber graph";\nexport const path = "fiber/optics";\n',
};
/** Q3: a tree whose hosting module and dependency statements sit outside src and outside every manifest name. */
const OUTSIDE_TREE: Readonly<Record<string, string>> = {
  "src/clean.ts": "export const clean = 1;\n",
  "qa/host.mjs": 'import { FiberRuntime } from "fiber_optics";\nnew FiberRuntime().flush_value_publications();\n',
  "examples/host.ts": 'import "fiber-optics";\n',
  Dockerfile: "FROM python:3.12-slim\nRUN pip install FiberOpticsSDK==0.1.0\n",
  "scripts/setup-sidecar.sh": "#!/bin/sh\npip install fiber_optics\n",
  "tools/value-host/deps.txt": "fiber_optics==0.1.0\n",
};

/** The residual families, each named by the quiet-row pin that holds it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-NON-CODE": ["Q2"],
  "R-OUTSIDE-SRC": ["Q3"],
  "R-INJECTED-RELAY": ["Q4"],
  "R-UNREAD-MARKER": ["Q5"],
  "R-LATE-REACTION": ["Q6"],
  "R-OTHER-VOCABULARY": ["Q7"],
};

// ---- the judged rows ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster, to the acceptance's three clauses and to the delivery record. */
const ROWS: readonly Row[] = [
  { id: "A", label: "before any Fiber-hosting capability registers", pins: ["A1", "A2", "A3", "A4"] },
  { id: "B", label: "a falsifier proves publication happens only through an explicit host flush call", pins: ["B1", "B2"] },
  { id: "C", label: "a query change alone produces zero publication or inference side effects", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

// ---- the out-of-file roster ----

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
  readonly producer: JsonObject;
  readonly record: JsonObject;
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
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !isObject(raw.producer) || !isObject(raw.record) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants, producer, record and rows`);
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
  return { constants: json(raw.constants) as JsonObject, producer: json(raw.producer) as JsonObject, record: json(raw.record) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the readers ----

/** Every key and string of a JSON value at any depth, each with its path (a key is read as text too). */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [{ path: `${path}{${key}}`, text: key }, ...textsOf(item, `${path}.${key}`)]);
  return [];
}
/** The needle hits of a JSON value's texts, `<path>: <needle>`. */
function textHits(value: unknown, path: string, needles: readonly string[]): string[] {
  return textsOf(value, path).flatMap(({ path: at, text }) => needlesIn(text, needles).map(needle => `${at}: ${needle}`));
}
/** A text's raw lines, each with its line number (every line is judged, comments included). */
function rawLines(text: string): { line: number; text: string }[] {
  return text.split("\n").map((line, index) => ({ line: index + 1, text: line }));
}
/** The needle hits of judged texts, `<file>:<line>: <needle>`. */
function hitsIn(texts: readonly { line: number; text: string }[], file: string, needles: readonly string[]): string[] {
  return texts.flatMap(({ line, text }) => needlesIn(text, needles).map(needle => `${file}:${line}: ${needle}`));
}
/** A manifest read whole: its parsed keys and strings, and (given) its raw lines, so a shadowed duplicate key is read too. */
function manifestHits(manifest: unknown, raw: string | undefined, label: string): string[] {
  const parsed = textHits(manifest, label, STEM_NEEDLES);
  const lines = raw === undefined ? [] : hitsIn(rawLines(raw), label, STEM_NEEDLES);
  return [...parsed, ...lines];
}
/** package-lock.json's installed package paths and their name fields (never versions or integrity hashes). */
function lockReading(lock: unknown): { packages: number; hits: string[] } {
  const packages = isObject(lock) && isObject(lock.packages) ? lock.packages : {};
  const hits = Object.entries(packages).flatMap(([path, entry]) => {
    const name = isObject(entry) && typeof entry.name === "string" ? entry.name : "";
    return [...needlesIn(path, STEM_NEEDLES).map(needle => `${path}: ${needle}`), ...needlesIn(name, STEM_NEEDLES).map(needle => `${path} name: ${needle}`)];
  });
  return { packages: Object.keys(packages).length, hits };
}
/** A dependency manifest by its base name (one of MANIFEST_NAMES, or a pip requirements or constraints file) or a file of pip's requirements directory. */
function isManifest(path: string): boolean {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const names: readonly string[] = MANIFEST_NAMES;
  return names.includes(name) || PIP_REQUIREMENTS.test(name) || PIP_REQUIREMENTS_DIR.test(path);
}
/** Every exported register* function and every call spelling a capability registration, from the live tracked src tree.
 * New exported providers and new registration sites refuse even before a descriptor reaches the native registry.
 * The runtime native and injected registries independently check the registered descriptors' shape. */
function registrationSites(root: string, listed: readonly string[]): string[] {
  const sites: string[] = [];
  for (const module of listed.filter(path => isScript(path))) {
    const file = parse(readFileSync(join(root, module), "utf8"), module);
    const visit = (node: ts.Node): void => {
      if (ts.isFunctionDeclaration(node) && node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) && node.name?.text.startsWith("register")) {
        sites.push(`${module}#export:${node.name.text}`);
      }
      if (ts.isCallExpression(node)) {
        const name = calleeName(node.expression);
        if (name === "register" || name === "registerNativeProviders" || name === "registerNativeFiberValuePublish" || name === "registerFiberValuePublish") {
          let owner: ts.Node | undefined = node.parent;
          while (owner !== undefined && !ts.isFunctionDeclaration(owner) && !ts.isMethodDeclaration(owner) && !ts.isArrowFunction(owner)) owner = owner.parent;
          let label = "(module)";
          if (owner !== undefined) {
            if ((ts.isFunctionDeclaration(owner) || ts.isMethodDeclaration(owner)) && owner.name !== undefined) label = owner.name.getText(file);
            else if (ts.isArrowFunction(owner) && ts.isVariableDeclaration(owner.parent)) label = owner.parent.name.getText(file);
          }
          sites.push(`${module}#${label}:${name}`);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
  }
  return sites.sort();
}
/** The listed dependency manifests below a root outside the test tree: every one selected by name, those read as raw lines (all but the root npm pair) and their STEM hits. */
function readManifests(root: string, listed: readonly string[]): { selected: string[]; raw: string[]; hits: string[] } {
  const rootNpm: readonly string[] = ROOT_NPM;
  const selected = listed.filter(path => !path.startsWith(TEST_ROOT) && isManifest(path));
  const raw = selected.filter(path => !rootNpm.includes(path));
  return { selected, raw, hits: raw.flatMap(path => hitsIn(rawLines(readFileSync(join(root, path), "utf8")), path, STEM_NEEDLES)) };
}

/** Whether the root .npmignore names an entry, exactly, on a line of its own. */
function npmIgnores(entry: string): boolean {
  return readFileSync(join(REPO, ".npmignore"), "utf8")
    .split("\n")
    .map(line => line.trim())
    .includes(entry);
}

function extensionOf(path: string): string {
  const at = path.lastIndexOf(".");
  return at === -1 ? "" : path.slice(at).toLowerCase();
}
function isScript(path: string): boolean {
  return Object.hasOwn(SCRIPT_KINDS, extensionOf(path));
}
function scriptKind(module: string): ts.ScriptKind {
  return SCRIPT_KINDS[extensionOf(module)] ?? ts.ScriptKind.TS;
}
/** A regular-expression literal's pattern text, its slashes and flags dropped. */
function regexPattern(text: string): string {
  return text.slice(1, text.lastIndexOf("/"));
}
/** The text the AST reader judges at a node, or undefined: names, string-like literals, template parts, regex patterns, JSX text. */
function judgedText(node: ts.Node): string | undefined {
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return node.text;
  if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return node.text;
  if (ts.isRegularExpressionLiteral(node)) return regexPattern(node.text);
  if (ts.isJsxText(node)) return node.text;
  return undefined;
}
function parse(text: string, module: string): ts.SourceFile {
  return ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKind(module));
}
/** Every judged text of a script module, with its line. */
function sourceTexts(text: string, module: string): { line: number; text: string }[] {
  const file = parse(text, module);
  const out: { line: number; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    const read = judgedText(node);
    if (read !== undefined) out.push({ line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1, text: read });
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}
/** Every judged text of a file below src: a script module's AST texts, any other file's raw lines. */
function fileTexts(text: string, module: string): { line: number; text: string }[] {
  return isScript(module) ? sourceTexts(text, module) : rawLines(text);
}
/** A file's needle hits, `<module>:<line>: <needle>`. */
function sourceHits(text: string, module: string, needles: readonly string[]): string[] {
  return hitsIn(fileTexts(text, module), module, needles);
}
/** The planted modules' hits, by control name. */
function plantedHits(controls: Readonly<Record<string, PlantedModule>>, needles: readonly string[]): JsonValue {
  return json(Object.fromEntries(Object.entries(controls).map(([name, planted]) => [name, sourceHits(planted.source, planted.module, needles)])));
}
/** The name a call's callee is read by: an identifier, or a property access's name. */
function calleeName(expression: ts.Expression): string | undefined {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return undefined;
}
/**
 * A file's rf launches: in a script module a LAUNCHERS call whose first argument is the string literal rf, `<module>: <launcher>`;
 * in any other file a line naming rf as a word (RF_WORD), `<module>:<line>: rf`.
 */
function rfLaunches(text: string, module: string): string[] {
  if (!isScript(module)) return rawLines(text).flatMap(({ line, text: read }) => (RF_WORD.test(read) ? [`${module}:${line}: rf`] : []));
  const file = parse(text, module);
  const out: string[] = [];
  const launchers: readonly string[] = LAUNCHERS;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node.expression);
      const first = node.arguments[0];
      if (name !== undefined && launchers.includes(name) && first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") out.push(`${module}: ${name}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

/** Every regular file below a directory, in name order, root-relative; a symlink is recorded and never followed. */
function walkFiles(root: string, directory: string): { files: string[]; symlinks: string[] } {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (dir: string): void => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      const at = relative(root, path).split("\\").join("/");
      if (entry.isSymbolicLink()) symlinks.push(at);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(at);
    }
  };
  visit(join(root, directory));
  return { files, symlinks };
}
/** git's tracked files (below the given paths; every tracked file when none is given), sorted: the walk's independent anchor. */
function trackedFiles(...paths: string[]): string[] {
  return execFileSync("git", ["ls-files", "-z", "--", ...paths], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path.length > 0)
    .sort();
}
interface SrcReading {
  readonly modules: string[];
  readonly nonScript: string[];
  readonly symlinks: string[];
  readonly onlyWalked: string[];
  readonly onlyTracked: string[];
  readonly texts: number;
  readonly hosting: string[];
  readonly entries: string[];
  readonly launches: string[];
  readonly anchors: { [anchor: string]: boolean };
}
/** One read of every file below a root's src: the walk held to a listing, the judged texts, and the three scans. */
function readSrc(root: string, listed: readonly string[]): SrcReading {
  const walk = walkFiles(root, "src");
  let texts = 0;
  const hosting: string[] = [];
  const entries: string[] = [];
  const launches: string[] = [];
  const anchors: { [anchor: string]: boolean } = Object.fromEntries(SOURCE_ANCHORS.map(anchor => [anchor, false]));
  for (const module of walk.files) {
    const text = readFileSync(join(root, module), "utf8");
    const read = fileTexts(text, module);
    texts += read.length;
    hosting.push(...hitsIn(read, module, HOSTING_NEEDLES));
    entries.push(...hitsIn(read, module, ENTRY_NEEDLES));
    launches.push(...rfLaunches(text, module));
    if (module === PROVIDER_MODULE) for (const anchor of SOURCE_ANCHORS) anchors[anchor] = read.some(entry => entry.text === anchor);
  }
  return {
    modules: walk.files,
    nonScript: walk.files.filter(module => !isScript(module)),
    symlinks: walk.symlinks,
    onlyWalked: walk.files.filter(module => !listed.includes(module)),
    onlyTracked: listed.filter(module => !walk.files.includes(module)),
    texts,
    hosting,
    entries,
    launches,
    anchors,
  };
}
let srcCache: SrcReading | undefined;
/** The live tree's src, read once (shared by A2, A4 and B2) and held to git's listing. */
function srcReading(): SrcReading {
  srcCache ??= readSrc(REPO, trackedFiles("src"));
  return srcCache;
}
let pipelineCache: SrcReading | undefined;
/** PIPELINE_TREE planted in scratch and read by the same pipeline (shared by A2, A4 and B2), held to its own listing. */
function pipelineReading(): SrcReading {
  if (pipelineCache === undefined) {
    const root = scratchDir("fiber-host-publication-pipeline-");
    plantTree(root, PIPELINE_TREE);
    pipelineCache = readSrc(root, Object.keys(PIPELINE_TREE).sort());
  }
  return pipelineCache;
}

/** The new-module control uses the same static reader as the live tree. */
function scratchRegistrationTree(): string {
  const root = scratchDir("fiber-host-publication-registration-");
  plantTree(root, REGISTRATION_TREE);
  return root;
}

// ---- the registrations ----

const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
type RfInvoke = Parameters<typeof registerReactiveFiberRender>[1];
type RfEnvelope = Awaited<ReturnType<RfInvoke>>;
const RF_INVOKE: RfInvoke = async () => NEVER();

/** A registry that records every provider it is handed, so the providers' own keys can be read. */
class RecordingRegistry extends CapabilityRegistry {
  readonly recorded: CapabilityProvider[] = [];
  override register(provider: CapabilityProvider): void {
    this.recorded.push(provider);
    super.register(provider);
  }
}
function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
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
/** The registry the four injected-client registrations fill. */
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
/** A descriptor is in the Fiber family when its id, a permission or its contract folds to hold "fiber", or its contract is rf's. */
function inFiberFamily(descriptor: CapabilityDescriptor): boolean {
  const contract = descriptor.contractSource ?? "";
  return [descriptor.id, ...descriptor.permissions, contract].some(text => fold(text).includes("fiber")) || contract.startsWith("rf@");
}
/** Why a Fiber-family descriptor is not the read preview: a non-read effect, a mode beyond invoke, a contract without the flag. */
function publishingReasons(descriptor: CapabilityDescriptor): string[] {
  const reasons: string[] = [];
  if (descriptor.effectClass !== "read") reasons.push(`effectClass ${descriptor.effectClass}`);
  for (const mode of descriptor.supportedModes) if (mode !== "invoke") reasons.push(`mode ${mode}`);
  if (!(descriptor.contractSource ?? "").endsWith(` ${NO_COMMIT}`)) reasons.push(`contract without ${NO_COMMIT}`);
  return reasons;
}
/** One descriptor's reading: its needles (any set, every key and string at any depth) and, in the family, why it publishes. */
function descriptorReading(descriptor: CapabilityDescriptor): { family: boolean; publishing: string[]; needles: string[] } {
  const family = inFiberFamily(descriptor);
  const needles = [...new Set(textsOf(descriptor, descriptor.id).flatMap(({ text }) => needlesIn(text, ALL_NEEDLES)))];
  return { family, publishing: family ? publishingReasons(descriptor) : [], needles };
}
/** A registration leg's reading: the required ids missing, every needle hit, and its Fiber family stated whole. */
function registryReading(registry: CapabilityRegistry): JsonValue {
  const descriptors = descriptorsOf(registry);
  const ids = new Set(descriptors.map(descriptor => descriptor.id));
  return json({
    missing: REQUIRED_DESCRIPTORS.filter(id => !ids.has(id)),
    hosting: descriptors.flatMap(descriptor => descriptorReading(descriptor).needles.map(needle => `${descriptor.id}: ${needle}`)),
    family: descriptors
      .filter(inFiberFamily)
      .map(descriptor => ({
        id: descriptor.id,
        effectClass: descriptor.effectClass,
        supportedModes: [...descriptor.supportedModes],
        permissions: [...descriptor.permissions],
        carrier: descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
        description: descriptor.description,
        publishing: publishingReasons(descriptor),
      })),
  });
}

// ---- the stand-in rf (A4, B1, C2, Q5, Q6): the ONLY PATH entry, it logs one argv line per spawn, prints a reply and exits ----

const oldPath = process.env.PATH;
const scratches: string[] = [];
const cleanups: Array<() => void> = [];
afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
/** Writes a planted tree below a scratch root. */
function plantTree(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
function recorder(reply: (root: string) => Json): Recorder {
  const root = scratchDir("fiber-host-publication-root-");
  const bin = scratchDir("fiber-host-publication-bin-");
  const log = join(bin, "spawns.jsonl");
  const script = join(bin, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(reply(root)))});`,
      "process.exitCode = 0;",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = bin;
  return { root, log };
}
function spawnsOf(record: Recorder): string[][] {
  if (!existsSync(record.log)) return [];
  return readFileSync(record.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => strings(JSON.parse(line), "spawn argv").map(token => (token === record.root ? "<root>" : token)));
}
/** The rf workspace a query reads, seeded in the stand-in's root: a definition, a component and a source. */
const WORKSPACE_FILES: Readonly<Record<string, string>> = {
  ".reactive-fiber/graphs/context.toml": 'id = "context"\n',
  ".reactive-fiber/components/summary.toml": 'id = "summary"\n',
  "notes/source.md": "# source\n",
};
function seedWorkspace(root: string): void {
  plantTree(root, WORKSPACE_FILES);
}
/** The query change: a definition rewritten, a component added, a source removed. */
function changeWorkspace(root: string, round: number): void {
  writeFileSync(join(root, ".reactive-fiber/graphs/context.toml"), `id = "context"\nround = ${round}\n`);
  writeFileSync(join(root, `.reactive-fiber/components/added-${round}.toml`), `id = "added-${round}"\n`);
  const source = join(root, "notes/source.md");
  if (existsSync(source)) unlinkSync(source);
}
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });
const LEGACY_INPUT = { model: "model-fixture", task: "task-fixture" } as const;
const VIEW_INPUT = { view: "swarm.worker", taskId: "bead-fixture-000" } as const;
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * The async resources a synchronous action creates, by type and count (`Timeout+1`): an async_hooks init hook is enabled for
 * exactly the action, so nothing else runs inside the bracket, and every timer (ref'd or unref'd, global or imported from
 * node:timers), immediate, tick, promise, watcher and child process the action creates is counted.
 */
function createdResources(action: () => void): string[] {
  const created: string[] = [];
  const hook = createHook({
    init(_id, type) {
      created.push(type);
    },
  });
  hook.enable();
  try {
    action();
  } finally {
    hook.disable();
  }
  const counts = new Map<string, number>();
  for (const type of created) counts.set(type, (counts.get(type) ?? 0) + 1);
  return [...counts.entries()].map(([type, count]) => `${type}+${count}`).sort();
}
async function refusalOf(call: Promise<unknown>): Promise<string> {
  const caught: unknown = await call.then(
    () => undefined,
    (error: unknown) => error,
  );
  if (caught === undefined) return "returned";
  if (!(caught instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(caught)}`);
  return `${caught.category}: ${caught.message}`;
}
/** A returned preview value's commit markers. */
function markersOf(value: JsonValue): JsonValue {
  const source = isObject(value) ? value.source : undefined;
  const result = isObject(source) ? source.result : undefined;
  const work = isObject(result) ? result.work : undefined;
  return json({
    transaction_id: isObject(source) ? source.transaction_id : "absent",
    render_id: isObject(result) ? result.render_id : "absent",
    ephemeral: isObject(result) ? result.ephemeral : "absent",
    commit_seq: isObject(result) ? result.commit_seq : "absent",
    storage_write_count: isObject(work) ? work.storage_write_count : "absent",
  });
}
/** The noncommitted fixture with its result (or its result's work) patched. */
function patched(root: string, patch: { top?: Json; result?: { [key: string]: Json }; work?: { [key: string]: Json } }): Json {
  const base = fullShapeRf(root);
  const result = base.result;
  if (!isObject(result)) throw new Error("the fixture states a result object");
  const work = result.work;
  if (!isObject(work)) throw new Error("the fixture states a result.work object");
  const nextResult = { ...result, ...(patch.result ?? {}), work: { ...work, ...(patch.work ?? {}) } } as Json;
  return { ...base, ...(isObject(patch.top) ? patch.top : {}), result: nextResult } as Json;
}
const COMMITTED_ID = "b".repeat(22);
/** B1's forms: each commit marker a committing render states, on the noncommitted fixture. */
const COMMITTED_FORMS: Readonly<Record<string, (root: string) => Json>> = {
  transaction_id: root => patched(root, { top: { transaction_id: `rft_${COMMITTED_ID}` } }),
  render_id: root => patched(root, { result: { render_id: `rfr_${COMMITTED_ID}` } }),
  ephemeral: root => patched(root, { result: { ephemeral: false } }),
  commit_seq: root => patched(root, { result: { commit_seq: 1 } }),
  storage_write_count: root => patched(root, { work: { storage_write_count: 1 } }),
};
/** Q5's forms: markers the native admission does not read. */
const UNREAD_FORMS: Readonly<Record<string, (root: string) => Json>> = {
  wouldCommit: root => patched(root, { result: { plan: { operations: [], would_commit: true } } }),
  effects: root => patched(root, { result: { effects: [{ kind: "store_write" }] } }),
};
async function bothArms(record: Recorder): Promise<{ legacy: string; view: string }> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, record.root);
  return {
    legacy: await refusalOf(registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext())),
    view: await refusalOf(registry.invoke(PREVIEW_ID, VIEW_INPUT, invokeContext())),
  };
}

/**
 * A planted reactive provider (C2's positive control, Q6's late twin): at registration it polls the workspace definition every
 * 25 ms, and on a change it launches rf after `delay` ms. Its cleanup clears both timers.
 */
function registerReactiveControl(registry: CapabilityRegistry, root: string, delay: number): void {
  const definition = join(root, ".reactive-fiber/graphs/context.toml");
  const initial = readFileSync(definition, "utf8");
  let fired: ReturnType<typeof setTimeout> | undefined;
  const poll = setInterval(() => {
    if (fired !== undefined || readFileSync(definition, "utf8") === initial) return;
    fired = setTimeout(() => {
      spawn("rf", ["--workspace", root, "context", "render", "--reacted"], { stdio: "ignore" }).on("error", () => {});
    }, delay);
  }, 25);
  cleanups.push(() => {
    clearInterval(poll);
    if (fired !== undefined) clearTimeout(fired);
  });
  registry.register({ descriptor: plantedDescriptor({ id: "fiber.reactive.control" }), invoke: async () => NEVER() });
}
/** Registers through `register` on a fresh registry, edits the workspace, waits SETTLE_MS: what launched, what was added. */
async function changeAlone(register: (registry: RecordingRegistry, root: string) => void): Promise<{ record: Recorder; registry: RecordingRegistry; registration: string[]; changes: string[]; spawns: number }> {
  const record = recorder(root => fullShapeRf(root));
  seedWorkspace(record.root);
  const registry = new RecordingRegistry();
  const registration = createdResources(() => register(registry, record.root));
  const changes = createdResources(() => changeWorkspace(record.root, 1));
  await sleep(SETTLE_MS);
  return { record, registry, registration, changes, spawns: spawnsOf(record).length };
}

/** The reactive-word hits of member names, `<owner>.<member>: <word>`. */
function reactiveMembers(owner: string, names: readonly string[]): string[] {
  const words: readonly string[] = REACTIVE_WORDS;
  return names.flatMap(name => words.filter(word => fold(name).includes(word)).map(word => `${owner}.${name}: ${word}`));
}
/** Every own member name along an object's prototype chain, Object.prototype excluded. */
function chainMembers(value: object): string[] {
  const names = new Set<string>();
  for (let current: object | null = value; current !== null && current !== Object.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) names.add(name);
  }
  return [...names].sort();
}
/** Every member a class exposes: its prototype chain, an instance's own keys (so a class field) and the static members along its constructor chain. */
function classMembers(owner: { readonly prototype: object }, instance: object): string[] {
  const names = new Set<string>([...chainMembers(owner.prototype), ...Object.getOwnPropertyNames(instance)]);
  for (let current: object | null = owner; current !== null && current !== Function.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) names.add(name);
  }
  return [...names].sort();
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The notes' first Acceptance sentence, split into its clauses at ", " and ", and ". */
function acceptanceClauses(notes: string): string[] {
  const sentence = /Acceptance: ([^.]+)\./.exec(notes)?.[1];
  return sentence === undefined ? [] : sentence.split(/, (?:and )?/);
}
/** The title's distribution word: the one word after "hosts", ending in SDK. */
function titleDistribution(title: string): string {
  return /\bhosts (\S+SDK)\b/.exec(title)?.[1] ?? "";
}
/** The title's artifact sentence's object, between "Artifact: " and the closing full stop. */
function titleArtifact(title: string): string {
  return /Artifact: (.+)\.$/.exec(title)?.[1] ?? "";
}
/** The notes' Authority quote (single-quoted) and their citation, path:line@pin. */
function notesAuthority(notes: string): { quote: string; citation: string } {
  return {
    quote: /Authority: '([^']+)'/.exec(notes)?.[1] ?? "",
    citation: /Citation: (\S+:\d+@[0-9a-f]+)\./.exec(notes)?.[1] ?? "",
  };
}
/** The commit markers the notes name in their noncommitted-provenance parenthetical. */
function notesMarkers(notes: string): string[] {
  const list = /noncommitted provenance \(([^)]+)\)/.exec(notes)?.[1];
  return list === undefined ? [] : list.split(", ").map(item => item.split(" ")[0] ?? "");
}
/** The pins the delivery record's CLAIM line for a row names: its first notes line opening `- <id> "<label>"`. */
function recordPins(notes: string, row: Row): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith(`- ${row.id} "${row.label}"`)) ?? "";
  return [...new Set(line.match(/\b[A-Z]\d+\b/g) ?? [])].filter(pin => pin.startsWith(row.id));
}
/** The quiet-row pins and residual families the delivery record pairs, `Q<n> R-<FAMILY>`, from its first FINDINGS and OTHER RESIDUALS lines. */
function recordResiduals(notes: string): string[] {
  const lines = notes.split("\n");
  const findings = lines.find(line => line.startsWith(RECORD_FINDINGS)) ?? "";
  const others = lines.find(line => line.startsWith(RECORD_RESIDUALS)) ?? "";
  return [...`${findings}\n${others}`.matchAll(/\b(Q\d+) (R-[A-Z]+(?:-[A-Z]+)*)\b/g)].map(match => `${match[1]} ${match[2]}`).sort();
}
function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const raw = readFileSync(join(REPO, "package.json"), "utf8");
    const manifest: unknown = JSON.parse(raw);
    const lock = lockReading(JSON.parse(readFileSync(join(REPO, "package-lock.json"), "utf8")));
    const manifests = readManifests(REPO, trackedFiles());
    const tree = scratchDir("fiber-host-publication-manifests-");
    plantTree(tree, MANIFEST_TREE);
    return json({
      surface: "manifests",
      manifestTextsAboveFloor: textsOf(manifest, "package.json").length >= FLOORS.manifestTexts,
      packageJson: manifestHits(manifest, raw, "package.json"),
      lockPackagesAboveFloor: lock.packages >= FLOORS.lockPackages,
      lock: lock.hits,
      rootNpmSelected: ROOT_NPM.every(path => manifests.selected.includes(path)),
      npmIgnored: Object.fromEntries([TEST_ROOT, "src/"].map(entry => [entry, npmIgnores(entry)])),
      rawManifestHits: manifests.hits,
      manifestTree: readManifests(tree, Object.keys(MANIFEST_TREE).sort()),
      manifestControls: Object.fromEntries(Object.entries(MANIFEST_CONTROLS).map(([name, manifest]) => [name, manifestHits(manifest, undefined, name).length])),
      shadowedKey: { parsed: manifestHits(JSON.parse(SHADOWED_MANIFEST), undefined, "shadowed").length, raw: manifestHits(JSON.parse(SHADOWED_MANIFEST), SHADOWED_MANIFEST, "shadowed").length },
      lockControls: Object.fromEntries(Object.entries(LOCK_CONTROLS).map(([name, lock]) => [name, lockReading(lock).hits.length])),
    });
  },
  A2: async () => {
    const src = srcReading();
    const tree = pipelineReading();
    return json({
      surface: "src",
      modulesAboveFloor: src.modules.length >= FLOORS.modules,
      textsAboveFloor: src.texts >= FLOORS.texts,
      symlinks: src.symlinks,
      onlyWalked: src.onlyWalked,
      onlyTracked: src.onlyTracked,
      providerRead: src.modules.includes(PROVIDER_MODULE),
      anchors: src.anchors,
      hosting: src.hosting,
      listsNonScript: { walk: walkFiles(REPO, "test/fixtures").files.includes(ROSTER_FILE), git: trackedFiles("test/fixtures").includes(ROSTER_FILE) },
      pipeline: { modules: tree.modules, nonScript: tree.nonScript, onlyWalked: tree.onlyWalked, onlyTracked: tree.onlyTracked, hosting: tree.hosting },
      controls: plantedHits(SOURCE_CONTROLS, HOSTING_NEEDLES),
    });
  },
  A3: async () => {
    return json({
      surface: "registered capabilities",
      artifact: ARTIFACT,
      native: registryReading(await nativeRegistry()),
      injected: registryReading(injectedRegistry()),
      staticSites: registrationSites(REPO, trackedFiles("src")),
      registrationControl: registrationSites(scratchRegistrationTree(), Object.keys(REGISTRATION_TREE)),
      controls: Object.fromEntries(Object.entries(DESCRIPTOR_CONTROLS).map(([name, descriptor]) => [name, descriptorReading(descriptor)])),
    });
  },
  A4: async () => {
    const src = srcReading();
    const record = recorder(root => fullShapeRf(root));
    const arms = await bothArms(record);
    return json({
      surface: "rf launch",
      flag: NO_COMMIT,
      launchRoster: src.launches,
      pipeline: pipelineReading().launches,
      launchControls: Object.fromEntries(Object.entries(LAUNCH_CONTROLS).map(([name, planted]) => [name, rfLaunches(planted.source, planted.module)])),
      arms,
      spawns: spawnsOf(record),
      everyLaunchNoCommit: spawnsOf(record).every(argv => argv.includes(NO_COMMIT) && argv.slice(2, 4).join(" ") === "context render"),
    });
  },
  B1: async () => {
    const forms: { [form: string]: JsonValue } = {};
    let spawns = 0;
    for (const [form, reply] of Object.entries(COMMITTED_FORMS)) {
      const record = recorder(reply);
      forms[form] = json(await bothArms(record));
      spawns += spawnsOf(record).length;
    }
    const control = recorder(root => fullShapeRf(root));
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, control.root);
    const legacy = markersOf(await registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext()));
    const view = markersOf(await registry.invoke(PREVIEW_ID, VIEW_INPUT, invokeContext()));
    return json({ surface: "native preview", forms, control: { legacy, view }, spawns: spawns + spawnsOf(control).length });
  },
  B2: async () => {
    const src = srcReading();
    return json({
      surface: "src",
      walkHeldToGit: src.onlyWalked.length === 0 && src.onlyTracked.length === 0 && src.modules.length >= FLOORS.modules,
      entries: src.entries,
      pipeline: pipelineReading().entries,
      controls: plantedHits(ENTRY_CONTROLS, ENTRY_NEEDLES),
    });
  },
  C1: async () => {
    const nativeLeg = new RecordingRegistry();
    const injectedLeg = new RecordingRegistry();
    const registration = {
      native: createdResources(() => registerNativeReactiveFiberRender(nativeLeg, REPO)),
      injected: createdResources(() => registerReactiveFiberRender(injectedLeg, RF_INVOKE, REPO)),
    };
    const providers = {
      native: nativeLeg.recorded.map(provider => Object.keys(provider).sort()),
      injected: injectedLeg.recorded.map(provider => Object.keys(provider).sort()),
    };
    const members = classMembers(CapabilityRegistry, new CapabilityRegistry());
    class SubscribingRegistry extends CapabilityRegistry {
      subscribe(): void {}
    }
    class InheritingRegistry extends SubscribingRegistry {}
    class FieldRegistry extends CapabilityRegistry {
      readonly subscribe = (): void => {};
    }
    class StaticRegistry extends CapabilityRegistry {
      static subscribe(): void {}
    }
    const polling = new RecordingRegistry();
    const controlRoot = scratchDir("fiber-host-publication-control-");
    seedWorkspace(controlRoot);
    return json({
      registryServes: ["invoke", "inspect"].filter(name => members.includes(name)),
      reactive: [
        ...reactiveMembers("CapabilityRegistry", members),
        ...nativeLeg.recorded.flatMap(provider => reactiveMembers("native provider", Object.keys(provider))),
        ...injectedLeg.recorded.flatMap(provider => reactiveMembers("injected provider", Object.keys(provider))),
      ],
      providers,
      registration,
      controls: {
        subscribingRegistry: reactiveMembers("SubscribingRegistry", classMembers(SubscribingRegistry, new SubscribingRegistry())),
        inheritingRegistry: reactiveMembers("InheritingRegistry", classMembers(InheritingRegistry, new InheritingRegistry())),
        fieldRegistry: reactiveMembers("FieldRegistry", classMembers(FieldRegistry, new FieldRegistry())),
        staticRegistry: reactiveMembers("StaticRegistry", classMembers(StaticRegistry, new StaticRegistry())),
        pollingProvider: createdResources(() => registerReactiveControl(polling, controlRoot, LATE_MS)),
      },
    });
  },
  C2: async () => {
    const nativeLeg = await changeAlone((registry, root) => registerNativeReactiveFiberRender(registry, root));
    const selector = { model: "model-fixture", task: "task-before" };
    selector.task = "task-after";
    const value = await nativeLeg.registry.invoke(PREVIEW_ID, selector, invokeContext());
    const invoked = spawnsOf(nativeLeg.record);
    const secondChange = createdResources(() => {
      selector.task = "task-later";
      changeWorkspace(nativeLeg.record.root, 2);
    });
    await sleep(SETTLE_MS);
    const afterSecondChange = spawnsOf(nativeLeg.record).length;
    let calls = 0;
    const injectedLeg = await changeAlone((registry, root) =>
      registerReactiveFiberRender(
        registry,
        async () => {
          calls += 1;
          return fullShapeRf(root) as unknown as RfEnvelope;
        },
        root,
      ),
    );
    const injectedAfterChange = calls;
    await injectedLeg.registry.invoke(PREVIEW_ID, selector, invokeContext());
    const injectedAfterInvoke = calls;
    changeWorkspace(injectedLeg.record.root, 2);
    await sleep(SETTLE_MS);
    const reactive = await changeAlone((registry, root) => registerReactiveControl(registry, root, 0));
    return json({
      native: {
        registration: nativeLeg.registration,
        changes: nativeLeg.changes,
        spawnsAfterChange: nativeLeg.spawns,
        invoked,
        value: markersOf(value),
        secondChange,
        spawnsAfterSecondChange: afterSecondChange,
      },
      injected: { callsAfterChange: injectedAfterChange, callsAfterInvoke: injectedAfterInvoke, callsAfterSecondChange: calls, spawns: spawnsOf(injectedLeg.record).length },
      reactiveControl: { registration: reactive.registration, spawnsAfterChange: reactive.spawns },
    });
  },
  Q1: async () => json({ residual: "R-COMPOSED", hosting: sourceHits(COMPOSED_MODULE.source, COMPOSED_MODULE.module, HOSTING_NEEDLES), entries: sourceHits(COMPOSED_MODULE.source, COMPOSED_MODULE.module, ENTRY_NEEDLES) }),
  Q2: async () => json({ residual: "R-NON-CODE", hosting: sourceHits(COMMENT_MODULE.source, COMMENT_MODULE.module, HOSTING_NEEDLES), entries: sourceHits(COMMENT_MODULE.source, COMMENT_MODULE.module, ENTRY_NEEDLES) }),
  Q3: async () => {
    const root = scratchDir("fiber-host-publication-tree-");
    plantTree(root, OUTSIDE_TREE);
    const walk = walkFiles(root, "src");
    const hits = walk.files.flatMap(module => sourceHits(readFileSync(join(root, module), "utf8"), module, ALL_NEEDLES));
    const outside = Object.keys(OUTSIDE_TREE)
      .filter(path => !path.startsWith("src/"))
      .map(path => ({ path, walked: walk.files.includes(path), manifest: isManifest(path), needles: sourceHits(OUTSIDE_TREE[path] ?? "", path, ALL_NEEDLES).length }));
    return json({ residual: "R-OUTSIDE-SRC", walked: walk.files, hits, outside });
  },
  Q4: async () => {
    const registry = new CapabilityRegistry();
    const committed = COMMITTED_FORMS.transaction_id;
    registerReactiveFiberRender(registry, async () => (committed === undefined ? NEVER() : (committed(REPO) as unknown as RfEnvelope)), REPO);
    const value = await registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext());
    return json({ residual: "R-INJECTED-RELAY", returned: markersOf(value) });
  },
  Q5: async () => {
    const forms: { [form: string]: JsonValue } = {};
    for (const [form, reply] of Object.entries(UNREAD_FORMS)) forms[form] = json(await bothArms(recorder(reply)));
    return json({ residual: "R-UNREAD-MARKER", forms });
  },
  Q6: async () => {
    const late = await changeAlone((registry, root) => registerReactiveControl(registry, root, LATE_MS));
    return json({ residual: "R-LATE-REACTION", registration: late.registration, spawnsAfterChange: late.spawns });
  },
  Q7: async () =>
    json({
      residual: "R-OTHER-VOCABULARY",
      hosting: sourceHits(OTHER_VOCABULARY_MODULE.source, OTHER_VOCABULARY_MODULE.module, ALL_NEEDLES),
      split: sourceHits(SPLIT_SPELLING_MODULE.source, SPLIT_SPELLING_MODULE.module, ALL_NEEDLES),
      members: reactiveMembers("OtherVocabularyRegistry", OTHER_VOCABULARY_MEMBERS),
      launches: rfLaunches(OTHER_VOCABULARY_MODULE.source, OTHER_VOCABULARY_MODULE.module),
      manifest: manifestHits({ dependencies: { "@reactive/fo-runtime": "1.0.0", "fibre-optics": "1.0.0" } }, undefined, "planted"),
      descriptor: descriptorReading(OTHER_VOCABULARY_DESCRIPTOR),
    }),
};

describe("wb-pyel.1 Fiber host-publication census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title, notes and acceptance and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        stem: STEM,
        distributions: DISTRIBUTIONS,
        hostedClasses: HOSTED_CLASSES,
        publicationEntries: PUBLICATION_ENTRIES,
        noCommit: NO_COMMIT,
        artifact: ARTIFACT,
        reactiveWords: REACTIVE_WORDS,
        launchers: LAUNCHERS,
        rfWord: RF_WORD.source,
        manifestNames: MANIFEST_NAMES,
        pipRequirements: PIP_REQUIREMENTS.source,
        pipRequirementsDir: PIP_REQUIREMENTS_DIR.source,
        rootNpm: ROOT_NPM,
        testRoot: TEST_ROOT,
        settleMs: SETTLE_MS,
        lateMs: LATE_MS,
        floors: FLOORS,
        scriptKinds: Object.keys(SCRIPT_KINDS),
        requiredDescriptors: REQUIRED_DESCRIPTORS,
        sourceAnchors: SOURCE_ANCHORS,
        recordLines: [RECORD_FINDINGS, RECORD_RESIDUALS],
        manifestControls: MANIFEST_CONTROLS,
        lockControls: LOCK_CONTROLS,
        shadowedManifest: SHADOWED_MANIFEST,
        manifestTree: MANIFEST_TREE,
        sourceControls: SOURCE_CONTROLS,
        entryControls: ENTRY_CONTROLS,
        launchControls: LAUNCH_CONTROLS,
        pipelineTree: PIPELINE_TREE,
        registrationTree: REGISTRATION_TREE,
        descriptorControls: DESCRIPTOR_CONTROLS,
        committedForms: Object.keys(COMMITTED_FORMS),
        unreadForms: Object.keys(UNREAD_FORMS),
        workspaceFiles: WORKSPACE_FILES,
        composed: COMPOSED_MODULE,
        comment: COMMENT_MODULE,
        otherVocabulary: [OTHER_VOCABULARY_MODULE, OTHER_VOCABULARY_DESCRIPTOR],
        splitSpelling: SPLIT_SPELLING_MODULE,
        otherVocabularyMembers: OTHER_VOCABULARY_MEMBERS,
        outsideTree: OUTSIDE_TREE,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const name of DISTRIBUTIONS) expect(fold(name), `${name} folds to hold the stem`).toContain(STEM);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const judged = ROWS.filter(row => row.id !== "Q");
    expect(judged.map(row => row.label), "rows A, B and C are the acceptance's three clauses, in order").toEqual(acceptanceClauses(notes));
    const recorded = recordResiduals(notes);
    expect(
      json({ pins: Object.fromEntries(judged.map(row => [row.id, recordPins(notes, row)])), residuals: recorded }),
      "the delivery record's CLAIM, FINDINGS and OTHER RESIDUALS lines read as the roster holds them",
    ).toStrictEqual(ROSTER.record);
    for (const row of judged) {
      const named = recordPins(notes, row);
      expect(named.length, `the delivery record's CLAIM line for row ${row.id} was read`).toBeGreaterThan(0);
      expect(row.pins, `row ${row.id} keeps every pin the delivery record's CLAIM line names`).toEqual(expect.arrayContaining(named));
    }
    expect(recorded.length, "the delivery record's FINDINGS and OTHER RESIDUALS lines were read").toBeGreaterThan(0);
    const kept = Object.entries(RESIDUALS).flatMap(([family, pins]) => pins.map(pin => `${pin} ${family}`));
    expect(kept, "row Q keeps every residual family the delivery record pairs with a quiet-row pin, with that pin").toEqual(expect.arrayContaining(recorded));
    const distribution = titleDistribution(title);
    expect(distribution, "the title's distribution word is the producer's distribution").toBe(DISTRIBUTIONS[0]);
    expect(fold(distribution).replace(/sdk$/, ""), "the stem is the title's distribution word, its SDK suffix dropped").toBe(STEM);
    expect(title, "the title names today's flag-bearing rf previews").toContain(`today's ${NO_COMMIT} rf previews`);
    expect(titleArtifact(title), "A3 judges the title's artifact").toBe(ARTIFACT);
    const witnessA3 = rosterWitness("A3");
    expect(isObject(witnessA3) ? witnessA3.artifact : undefined, "A3's roster witness names the title's artifact").toBe(ARTIFACT);
    const witnessA4 = rosterWitness("A4");
    expect(isObject(witnessA4) ? witnessA4.flag : undefined, "A4's roster witness reads the title's flag").toBe(NO_COMMIT);
    const witnessB1 = rosterWitness("B1");
    const formsB1 = isObject(witnessB1) && isObject(witnessB1.forms) ? Object.keys(witnessB1.forms) : [];
    expect(formsB1, "B1's roster witness judges every committed form").toEqual(Object.keys(COMMITTED_FORMS));
    for (const marker of notesMarkers(notes)) expect(formsB1, `B1's roster witness refuses the notes' ${marker} marker`).toContain(marker);
    expect(notesMarkers(notes), "the notes name three markers").toHaveLength(3);
    const authority = notesAuthority(notes);
    const producer = ROSTER.producer;
    expect(authority.citation, "the notes cite the vendored producer line").toBe(`${String(producer.path)}:${String(producer.line)}@${String(producer.pin)}`);
    expect(typeof producer.text === "string" ? producer.text : "", "the notes' Authority quote is the producer line's sentence").toContain(authority.quote);
    expect(authority.quote.length, "the Authority quote was read").toBeGreaterThan(0);
    expect(sha256(typeof producer.text === "string" ? producer.text : ""), "the vendored producer line's SHA256").toBe(producer.sha256);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
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
