/**
 * wb-2wiv.1 (SDK-UNIVERSAL-REACTIVE-RENDERING-R1, program-triage-2026-10-18), the until-then leg: the portable Fiber core gate
 * census. Statement (bead title, verbatim): "Gating artifact: released FiberOpticsSDK WASM ABI + HostCapabilitySet (unshipped)
 * conjoined with a wb-x32 committing decision to embed the portable Fiber core; then the embedding supplies Clock, Timer,
 * Randomness and Spawner explicitly via HostCapabilitySet (deterministic fakes in tests) and never relies on ambient
 * DOM/JS/networking; until then Pi's RF surface stays the rf CLI envelope only."
 * Until-then clause (owner filing notes, verbatim): "Until both gates exist, no src or docs change and no Pi claim of an embedded
 * Fiber core; rf CLI envelope consumption stays owned by the wb-x32/wb-973/wb-693 families."
 *
 * THE SOURCE AT THE PIN (FiberOpticsSDK dcc5b57c4aed, the notes' citation, read with read-only git show by the cutting seat; the
 * roster vendors lines 3, 11, 15, 19, 21, 22 and 24 with their SHA256): docs/programs/universal-reactive-rendering-2026-10-18.md
 * :3 "design charter only (2026-10-18), no code or backend switch"; :11 the portable workspace members
 * fiber-model/fiber-core/fiber-runtime; :15 "Host capabilities supply clocks/timers/randomness/spawn; the core never imports DOM,
 * JS or networking" (the notes' Authority quote); :19 "## Proposed interfaces (unshipped)"; :21 the versioned WASM ABI
 * (initialize, applyBatch, inspect, subscribe, snapshot, close and their parameters); :22 "HostCapabilitySet supplies Clock,
 * Timer, Randomness, Spawner explicitly; real and deterministic fake implementations"; :24 the ChangedViewReceipt's fields.
 * MEASURED PRODUCER FACTS (read-only, recorded, not judged here): at the pin HostCapabilitySet is spelled only by the charter,
 * conformance/urr/v1/scenario.schema.json and tests/conformance/urr_conformance.py, and rust/ holds replay_observer alone; at
 * origin/master 2099f193cccf (2026-10-28) the charter is unchanged, docs/adr/0013-urr-interface-precedence.md reads Proposed,
 * the program TRACE rows URRFO-I1/I2 name definitions only (docs/rust-runtime-setup/normative/protocol_message_set.json, the
 * scenario schema, the Rust capability traits of rust/fiber-model/src/capabilities.rs) and the tree holds no package.json, no
 * .wasm file and no wasm-pack output: no released WASM artifact or capability-set package exists for Pi to adopt.
 *
 * MEASURED AT BASE (7a0ab7f, landing 630; seat ws-03, run g10-work-s129, 2026-10-28): src holds 116 tracked script
 * modules (100929 judged AST texts, 3608 member-bearing declarations, 617 module specifiers) and none spells
 * a stem, crate, WebAssembly, ABI or capability-set name, declares the four members together or loads an RF or Fiber SDK; the
 * one rf launch is the provider's spawn; git tracks 1048 files, none a .wasm file or a path naming the core; package.json
 * (120 texts) and the two lockfiles (372 packages each) name none; the 304 product texts (51492
 * sentences) carry no claim - the only stem spellings are the rf_identity sdk_versions keys of four rf receipts, rf's own
 * identity echoed through its CLI envelope; the wb-x32 row (1798 characters across its string fields) and the decisions
 * page (65 sentences) state no decision. So the gate has not fired, and until it does Pi's RF surface is the rf CLI
 * envelope: the native preview admits only the reactive-fiber.cli/v1 envelope and Pi says so in three places.
 *
 * THE VOCABULARY. fold: NFKC, lower case, every character outside a-z and 0-9 removed (fiber_optics, fiber-optics, FiberOptics
 * and "@fiber-optics/sdk" all hold "fiberoptics"). tokens: the same text split at every run outside a-z and 0-9; the wasm word is
 * read as a token, never as a fold, so "was measured" is no hit. STEM (the title's distribution word, its SDK suffix dropped)
 * and CRATES (charter :11); ABI_NAMES (charter :21's one non-generic entry and the entries' parameters; the generic entries are
 * R-GENERIC-ABI); WASM_GLOBAL; CAPABILITY_SET and its four CAPABILITY_MEMBERS (the title's list); CORE_NAMES (Fiber core,
 * HostCapabilitySet, WebAssembly and the notes' FOA SDK); EMBED (the title's decision verb); SPELLINGS (the notes' wb-693 grep).
 * A SENTENCE: a text cut at every blank line, before every line opening a table row (and, in Markdown, a list item) and after
 * every ".", "!", "?" or ";" followed by white space; wrapped lines stay one sentence (a JSDoc comment's too). A CLAIM (row D): a
 * sentence holding a core name, or EMBED beside the stem, a crate or the wasm token. A DECISION (row B): a sentence holding EMBED
 * beside a core name, the stem, a crate or the wasm token.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns a measured witness held to the roster):
 *  A, the gating artifact ("released FiberOpticsSDK WASM ABI + HostCapabilitySet (unshipped)"), absent from Pi today.
 *    A1 THE MANIFESTS: package.json read whole (every key and string at any depth, parsed, and every raw line, so a shadowed
 *    duplicate key is read) and the installed package paths and name fields of package-lock.json and vendor/dependency-lock.json
 *    name no stem or crate and carry no wasm token; controls: a planted package per dependency list, a nested value, a raw
 *    shadowed key, a lock path, a lock name and a wasm lock path read; two near misses quiet.
 *    A2 THE TRACKED ARTIFACTS: git's whole listing holds no .wasm file (any case) and no path naming the stem, a crate or the wasm
 *    token, the vendored SDK tarballs among them (a released core would arrive beside them); controls read, near misses quiet.
 *    A3 THE SRC IMPORTS AND NAMES: every tracked script module below src (git ls-files, held both ways to a filesystem walk that
 *    records and never follows a symlink), read through its TypeScript AST (identifiers, private names, string, template,
 *    regular-expression and JSX texts; never a comment), holds no stem, crate, WebAssembly or ABI name fold, no .wasm string and
 *    no module specifier carrying the wasm token; anchors show every reader position reads the live tree; planted modules (one
 *    per reading position) read, near misses (the workflow VM's wasm option among them) quiet.
 *    A4 THE CAPABILITY SET: no src text names HostCapabilitySet, and no interface, type literal, class or object literal declares
 *    all four of the title's members (by fold) - the set under another name; controls: each declaration kind read, three members
 *    and a comment quiet (row D reads the comment).
 *  B, the decision ("a wb-x32 committing decision to embed the portable Fiber core"), absent today.
 *    B1 THE DECISION BEAD: the tracked export's wb-x32 row (the bead id read from the title), every string field cut into
 *    sentences, holds no decision; anchors show its title, description and notes were read; controls read, near misses quiet.
 *    B2 THE DECISIONS PAGE: docs/workbench/18-decisions-and-risks.md (the notes' cited page) holds no decision; table rows and
 *    list items are units of their own (controls).
 *  C, the until-then clause ("until then Pi's RF surface stays the rf CLI envelope only").
 *    C1 NO RF SDK: no src module specifier outside the relative ones names reactivefiber, the stem or a crate (import, export,
 *    import-equals, import type, dynamic import, require); no src text or property-access chain spells the notes' three wb-693
 *    names (@reactive-fiber and Host.resources as written, createReactiveFiberRuntime by fold); src's rf launch roster (a
 *    launcher call by name, member or named-import alias of node:child_process whose first argument is the literal rf) is the
 *    provider alone.
 *    C2 THE CLI ENVELOPE: through a stand-in rf (the ONLY PATH entry, logging each argv) both input arms of the native preview
 *    spawn exactly one `context render ... --no-commit --no-input --json` each and return the reactive-fiber.cli/v1 envelope (its
 *    schema, command and eight keys); a ChangedViewReceipt-shaped reply, the envelope under another schema and the envelope with
 *    one key more are each refused as transport on both arms, one spawn each.
 *    C3 THE STATED SURFACE: Pi's own three statements of its RF surface hold - the notes' cited line (docs/workbench/18:33, "No RF
 *    typed render SDK in pinned revision"), vendor/README.md's ReactiveFiberCLI sentence ("currently uses its installed CLI JSON
 *    envelope") and the provider module's leading comment ("installed CLI JSON contract (no TS SDK published)").
 *  D, the claim clause ("no Pi claim of an embedded Fiber core").
 *    D1 THE PRODUCT TEXTS: every tracked file below docs, src, qa, examples, vendor, .agents, .pi, .github and .codex and every
 *    tracked file at the repository root (the roots held both ways to a walk), read as strict UTF-8 when its extension is a
 *    measured text extension (any other is reported), holds no claim, and every root is read; a scratch tree planting one claim
 *    per root and one at the root reads exactly those; controls read (a wrapped sentence, a JSDoc comment, an NFKC form) and near
 *    misses stay quiet (a receipt's rf_identity sdk_versions key, the workflow VM's wasm option, split sentences, table rows and
 *    list items).
 *    D2 THE REGISTERED CAPABILITIES: every descriptor the native registration and the four injected-client registrations register,
 *    read whole (every key and string at any depth, each one unit), states no claim; planted descriptors read, a neutral one quiet.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants, the controls, the residual families and every registered test title - is held to the
 * out-of-file roster (test/fixtures/urr-core-gate-roster.json). OUTSIDE ANCHORS, read from the tracker export (.beads/issues.jsonl:
 * the bead's title and the first match of each phrase in its owner-filing notes, so later notes do not move them): rows A to D are
 * the title's gating artifact, decision and until-then clause and the notes' claim clause, in order; row A's pins judge exactly the
 * title's two conjuncts, their surfaces cover the title's "artifact" and the notes' "import" and "manifest", and one reads the
 * capability set by the title's four members; STEM is the title's distribution word; a row B pin reads the title's decision bead
 * and one the notes' cited page; a row C pin reads the notes' cited line, one the notes' spellings and one the CLI schema; a row D
 * pin reads both trees the notes keep unchanged (src, docs); the decision bead is an owner family the notes name; the roster
 * vendors the notes' cited charter lines at the notes' pin, the Authority quote is line 15's, both halves of the status quote are
 * line 3's, and lines 11, 21, 22 and 24 name the census's crates, ABI names, capability set and members, and receipt fields.
 * FAIL-CLOSED (by design, not a residual): a negated sentence ("no decision to embed the Fiber core yet") on the decision bead, on
 * the decisions page or in a product text reads as a decision or a claim; the census reds and its reader judges the sentence.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster where no anchor of the bead text holds it - D2 and every Q pin (the cut-time CT6 sweep removed each pin from every
 * literal and the roster: A1-A4, B1, B2, C1-C3 and D1 red through the bead text, D2 and Q1-Q7 stay green); a control removed from
 * its list and the roster; a pin's case replaced by one that echoes its roster witness; git's listing replaced by the walk it
 * anchors.
 * RESIDUALS (named, each with its pinned quiet row): R-COMPOSED a name composed at run time from parts is read by no scan (Q1);
 * R-GENERIC-ABI the ABI spelled only through its generic entries (initialize, inspect, subscribe, snapshot, close) is not read
 * (Q2); R-OUTSIDE-SCOPE a claim in a tree row D does not walk (test/, new-feedback/, .beads/, media/, untracked or ignored files)
 * is not read (Q3); R-INJECTED-RELAY the injected registration relays its host client's value unchecked, so an injected client
 * returning a ChangedViewReceipt is returned as a value (Q4; the native preview is the admission point); R-DECISION-ELSEWHERE a
 * decision recorded on another bead, or outside the export and the decisions page, is not read (Q5); R-OTHER-VOCABULARY the core
 * under other names (another package, another ABI verb, renamed capability members, another phrase) is read by no surface (Q6);
 * R-INDIRECT-LAUNCH an rf launch whose launcher or binary is reached through a binding (a re-bound launcher, a destructured
 * require, the binary held in a constant) is not in the roster (Q7).
 * NOT DELIVERED (the armed half, parked on the bead with its external target): the conformance tier that initializes an embedded
 * core with an explicit HostCapabilitySet (real and deterministic fake; errors, cycles and subscriptions under fakes) and the
 * import/manifest census of the portable core (no ambient DOM, JS or network API reaches it from Pi) need the released artifact
 * and the wb-x32 decision, and neither exists. A cut that adopts the core reds row A (and D) by design and must bring that half.
 *
 * Display paths added: none. Test-only: the stand-in rf, its argv log and the scratch trees live in makeScratch scratch with its
 * leak guard installed; src, the manifests, the docs, the fixtures and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import {
  REACTIVE_FIBER_CLI_SCHEMA,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-2wiv.1";
const ROSTER_PATH = join(HERE, "fixtures", "urr-core-gate-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PROVIDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const NATIVE_MODULE = "src/workbench/native-modules.ts";
const STATED_README = "vendor/README.md";
const PREVIEW_ID = "reactivefiber.render.preview";

// ---- the vocabulary ----

/** The producer's stem: the title's distribution word, folded, its SDK suffix dropped (held to the title in the judged set). */
const STEM = "fiberoptics";
/** The producer's wheel, import packages and crate at the pin (pyproject.toml [project].name and wheel packages; rust/replay_observer). */
const DISTRIBUTIONS = ["FiberOpticsSDK", "fiber_optics", "fiber_optics_research", "fiber-optics-replay-observer"] as const;
/** The portable workspace members a WASM core is built from (charter :11 at the pin). */
const CRATES = ["fiber-model", "fiber-core", "fiber-runtime"] as const;
/** The versioned WASM ABI's own names (charter :21): its one non-generic entry and the entries' parameters. */
const ABI_NAMES = ["applyBatch", "typedCommands", "expectedEpoch", "publicRefs", "viewSpec"] as const;
/** The ABI's generic entries (charter :21): Pi spells them in other senses, so no scan reads them (Q2, R-GENERIC-ABI). */
const GENERIC_ABI = ["initialize", "inspect", "subscribe", "snapshot", "close"] as const;
/** The JavaScript global a WASM core is compiled and instantiated through. */
const WASM_GLOBAL = "WebAssembly";
/** The word a WASM package name, module path or file carries (read as a whole token, never as a fold: "was measured" is no hit). */
const WASM_TOKEN = "wasm";
/** The title's capability set and its four members ("supplies Clock, Timer, Randomness and Spawner explicitly via HostCapabilitySet"). */
const CAPABILITY_SET = "HostCapabilitySet";
const CAPABILITY_MEMBERS = ["Clock", "Timer", "Randomness", "Spawner"] as const;
/** The core's own names: a Pi product sentence holding one names the core (row D); "FOA SDK" is the notes' "Pi embeds no FOA SDK". */
const CORE_NAMES = ["Fiber core", CAPABILITY_SET, WASM_GLOBAL, "FOA SDK"] as const;
/** The decision's verb (the title's "to embed"); a sentence pairs it with a core name or the stem to state an embedding. */
const EMBED = "embed";
/** The notes' wb-693 grep spellings, verbatim ("git grep finds no @reactive-fiber/Host.resources/createReactiveFiberRuntime import"). */
const SPELLINGS = ["@reactive-fiber", "Host.resources", "createReactiveFiberRuntime"] as const;
/** The rf launchers C1's roster reads: a call by one of these names (or a named-import alias of one) whose first argument is the literal rf. */
const LAUNCHERS = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"] as const;
/** The modules a launcher is imported from. */
const CHILD_PROCESS = ["node:child_process", "child_process"] as const;
/** Row D's scanned roots (every tracked file below each) beside every tracked file at the repository root. */
const SCAN_ROOTS = ["docs", "src", "qa", "examples", "vendor", ".agents", ".pi", ".github", ".codex"] as const;
/** The text extensions row D reads (the set measured in its roots at base; any other extension is skipped and reported). */
const TEXT_EXTENSIONS = ["", ".md", ".ts", ".js", ".mjs", ".json", ".yml", ".yaml", ".toml", ".sh"] as const;
/** Floors below the counts measured at base 7a0ab7f (recorded in the header). */
const FLOORS = { modules: 100, texts: 60000, shapes: 1000, specifiers: 300, manifestTexts: 80, lockPackages: 300, trackedFiles: 900, productFiles: 280, sentences: 20000, pageSentences: 50, exportText: 1000 } as const;
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
/** The four ids every registration must hold, native and injected alike. */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", PREVIEW_ID] as const;
/** What each src reader must see on the live tree, so a reader that reads nothing reds there (module, reader, text). */
const SOURCE_ANCHORS = [
  { module: PROVIDER_MODULE, reader: "texts", text: "rf" },
  { module: PROVIDER_MODULE, reader: "texts", text: REACTIVE_FIBER_CLI_SCHEMA },
  { module: PROVIDER_MODULE, reader: "accesses", text: "child.stdout.on" },
  { module: PROVIDER_MODULE, reader: "specifiers", text: "node:child_process" },
  { module: NATIVE_MODULE, reader: "specifiers", text: "@furnace/sdk" },
  { module: NATIVE_MODULE, reader: "shapes", text: "registernativeproviders" },
  { module: PROVIDER_MODULE, reader: "launches", text: "spawn" },
] as const;
/** What B1 must read in each field of the decision bead's export row (texts the append-only store keeps). */
const DECISION_ANCHORS = { title: "W10", description: "honest blocker", notes: "noncommitted preview" } as const;

/** The joined fold: NFKC, lower case, every character outside a-z and 0-9 removed. */
function fold(text: string): string {
  return text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}
/** A text's word tokens: NFKC, lower case, split at every run of characters outside a-z and 0-9. */
function tokens(text: string): string[] {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(token => token.length > 0);
}
const STEM_NEEDLES: readonly string[] = [STEM, ...CRATES.map(fold)];
const ABI_NEEDLES: readonly string[] = [...STEM_NEEDLES, fold(WASM_GLOBAL), ...ABI_NAMES.map(fold)];
const SET_NEEDLES: readonly string[] = [fold(CAPABILITY_SET)];
const CORE_NEEDLES: readonly string[] = CORE_NAMES.map(fold);
const RF_SDK_NEEDLES: readonly string[] = ["reactivefiber", ...STEM_NEEDLES];

/** The needles a text holds, in needle order. */
function needlesIn(text: string, needles: readonly string[]): string[] {
  const folded = fold(text);
  return needles.filter(needle => folded.includes(needle));
}
/** A manifest or path text's hits: a stem or crate fold, or the wasm token. */
function packageNeedles(text: string): string[] {
  const hits = needlesIn(text, STEM_NEEDLES);
  if (tokens(text).includes(WASM_TOKEN)) hits.push(WASM_TOKEN);
  return hits;
}
/** Row D's claim families of one unit of text: a core name, or the decision verb beside the stem, a crate or the wasm token. */
function claimFamilies(text: string): string[] {
  const folded = fold(text);
  const families = CORE_NEEDLES.filter(needle => folded.includes(needle));
  if (folded.includes(EMBED) && (STEM_NEEDLES.some(needle => folded.includes(needle)) || tokens(text).includes(WASM_TOKEN))) families.push(`${EMBED}+core`);
  return families;
}
/** Row B's decision families of one unit of text: the decision verb beside a core name, the stem, a crate or the wasm token. */
function decisionFamilies(text: string): string[] {
  const folded = fold(text);
  if (!folded.includes(EMBED)) return [];
  const named = [...new Set([...CORE_NEEDLES, ...STEM_NEEDLES])].filter(needle => folded.includes(needle));
  if (tokens(text).includes(WASM_TOKEN)) named.push(WASM_TOKEN);
  return named.map(needle => `${EMBED}+${needle}`);
}

// ---- the sentence reader (rows B and D) ----

interface Sentence {
  readonly line: number;
  readonly text: string;
}
/** A list item's or table row's opening, which starts a unit of its own in Markdown. */
const OPENS_UNIT = /^(?:\||[-+*]\s|\d+[.)]\s)/;
/**
 * A text's sentences: cut at every blank line, before every line opening a table row (and, in Markdown, a list item), and
 * after every ".", "!", "?" or ";" followed by white space. A wrapped sentence stays one sentence; each records its first line.
 */
function sentencesOf(text: string, markdown: boolean): Sentence[] {
  const out: Sentence[] = [];
  let start = 0;
  let block: string[] = [];
  const flush = (): void => {
    const joined = block.join("\n");
    const starts: number[] = [];
    let offset = 0;
    for (const line of block) {
      starts.push(offset);
      offset += line.length + 1;
    }
    const lineAt = (position: number): number => {
      let index = 0;
      for (let at = 0; at < starts.length; at += 1) if ((starts[at] ?? 0) <= position) index = at;
      return start + index;
    };
    const cut = /[.!?;]\s+/g;
    let from = 0;
    const push = (end: number): void => {
      const piece = joined.slice(from, end);
      const lead = from + (piece.length - piece.trimStart().length);
      if (piece.trim().length > 0) out.push({ line: lineAt(lead), text: piece.trim() });
    };
    for (let match = cut.exec(joined); match !== null; match = cut.exec(joined)) {
      push(match.index + 1);
      from = match.index + match[0].length;
    }
    push(joined.length);
    block = [];
  };
  text.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      if (block.length > 0) flush();
      return;
    }
    const opens = trimmed.startsWith("|") || (markdown && OPENS_UNIT.test(trimmed));
    if (opens && block.length > 0) flush();
    if (block.length === 0) start = index + 1;
    block.push(line);
  });
  if (block.length > 0) flush();
  return out;
}
function isMarkdown(path: string): boolean {
  return extname(path).toLowerCase() === ".md";
}
/** A text's claims, `<path>:<line>: <families>`. */
function claimsOf(text: string, path: string): string[] {
  return sentencesOf(text, isMarkdown(path)).flatMap(sentence => {
    const families = claimFamilies(sentence.text);
    return families.length === 0 ? [] : [`${path}:${sentence.line}: ${families.join(",")}`];
  });
}
/** A text's decisions, `<label>:<line>: <families>`. */
function decisionsOf(text: string, label: string, markdown: boolean): string[] {
  return sentencesOf(text, markdown).flatMap(sentence => {
    const families = decisionFamilies(sentence.text);
    return families.length === 0 ? [] : [`${label}:${sentence.line}: ${families.join(",")}`];
  });
}

// ---- the controls (each reader's planted positives and near misses; every expectation is pinned in the roster too) ----

const MANIFEST_CONTROLS: Readonly<Record<string, Json>> = {
  dependencies: { dependencies: { "@fiber-optics/sdk": "^0.1.0" } },
  devDependencies: { devDependencies: { "fiber-core": "0.1.0" } },
  peerDependencies: { peerDependencies: { "fiber-runtime-wasm": "*" } },
  optionalDependencies: { optionalDependencies: { fiber_model: "*" } },
  bundleDependencies: { bundleDependencies: ["@acme/core-wasm"] },
  nestedValue: { overrides: { "reactive-fiber-cli": { engine: "npm:fiber-optics@0.1.0" } } },
  nearMissFiber: { dependencies: { "reactive-fiber-cli": "1.0.0" } },
  nearMissSplit: { keywords: ["fiber", "optics", "wasMeasured"] },
};
/** A raw manifest whose first dependencies key JSON.parse shadows with the second: only the raw-line reading sees it. */
const SHADOWED_MANIFEST = '{ "dependencies": { "fiber-core": "1.0.0" }, "dependencies": {} }';
const LOCK_CONTROLS: Readonly<Record<string, Json>> = {
  lockPath: { packages: { "node_modules/@fiber-optics/sdk": { version: "0.1.0" } } },
  lockName: { packages: { "node_modules/alias": { name: "fiber-core", version: "0.1.0" } } },
  lockWasm: { packages: { "node_modules/@acme/core-wasm": { version: "0.1.0" } } },
  lockQuiet: { packages: { "node_modules/reactive-fiber": { version: "1.0.0" } } },
};
const PATH_CONTROLS: readonly string[] = [
  "pkg/fiber_core_bg.wasm",
  "assets/CORE.WASM",
  "vendor/fiber-optics-sdk-0.1.0.tgz",
  "vendor/acme-wasm-0.1.0.tgz",
  "vendor/furnace-sdk-0.1.0.tgz",
  "docs/was-measured.md",
];
/** A planted module: its file name (which sets the script kind) and its text. */
interface PlantedModule {
  readonly module: string;
  readonly source: string;
}
const ABI_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  importFrom: { module: "import-from.ts", source: 'import { init } from "@fiber-optics/core";\ninit();\n' },
  crateExport: { module: "crate-export.ts", source: 'export * from "fiber-core-wasm";\n' },
  dynamicWasm: { module: "dynamic-wasm.ts", source: 'export const core = await import("./pkg/fiber_runtime_bg.wasm");\n' },
  requireCrate: { module: "require-crate.cjs", source: 'const model = require("fiber_model");\nmodule.exports = model;\n' },
  wasmGlobal: { module: "wasm-global.ts", source: "declare const bytes: Uint8Array;\nexport const module = await WebAssembly.compile(bytes);\n" },
  abiEntry: { module: "abi-entry.ts", source: "declare const runtime: { applyBatch(commands: unknown[], epoch: number): void };\nruntime.applyBatch([], 0);\n" },
  abiParameters: {
    module: "abi-parameters.ts",
    source: "export function apply(typedCommands: unknown[], expectedEpoch: number): number {\n  return typedCommands.length + expectedEpoch;\n}\n",
  },
  abiArrow: { module: "abi-arrow.ts", source: "export const read = (publicRefs: string[], viewSpec: object): unknown[] => [publicRefs, viewSpec];\n" },
  templatePath: { module: "template-path.ts", source: `declare const base: string;\nexport const url = \`\${base}/core.wasm\`;\n` },
  regexPattern: { module: "regex-pattern.ts", source: "export const pattern = /fiber[-_]?core/;\n" },
  jsxText: { module: "jsx-text.tsx", source: "export const view = <p>WebAssembly</p>;\n" },
  nearMiss: {
    module: "abi-near-miss.ts",
    source: 'export const codeGeneration = { strings: false, wasm: false };\nexport const wasMeasured = true;\nexport const fiber = "core";\n',
  },
};
const SET_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  named: { module: "set-named.ts", source: "declare const host: HostCapabilitySet;\nexport const capabilities = host;\n" },
  interfaceShape: {
    module: "set-interface.ts",
    source: "export interface Host {\n  clock(): number;\n  timer(ms: number): void;\n  randomness(): number;\n  spawner(task: () => void): void;\n}\n",
  },
  typeShape: { module: "set-type.ts", source: "export type Capabilities = { Clock: unknown; Timer: unknown; Randomness: unknown; Spawner: unknown };\n" },
  classShape: {
    module: "set-class.ts",
    source: "export class Capabilities {\n  clock = 0;\n  timer = 0;\n  get randomness(): number {\n    return 0;\n  }\n  spawner(): void {}\n}\n",
  },
  objectShape: {
    module: "set-object.ts",
    source: 'declare const clock: number;\nexport const capabilities = { clock, timer: 1, "randomness": 2, spawner(): void {} };\n',
  },
  threeMembers: { module: "set-three.ts", source: "export interface Partial {\n  clock: number;\n  timer: number;\n  randomness: number;\n}\n" },
  comment: { module: "set-comment.ts", source: "// a HostCapabilitySet with Clock, Timer, Randomness and Spawner\nexport {};\n" },
};
const SDK_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  importScope: { module: "import-scope.ts", source: 'import { Host } from "@reactive-fiber/sdk";\nexport const host = Host;\n' },
  hostResources: { module: "host-resources.ts", source: "declare const Host: { resources: unknown };\nexport const resources = Host.resources;\n" },
  createRuntime: { module: "create-runtime.ts", source: "declare function createReactiveFiberRuntime(): unknown;\nexport const runtime = createReactiveFiberRuntime();\n" },
  requirePackage: { module: "require-package.cjs", source: 'const rf = require("reactive-fiber");\nmodule.exports = rf;\n' },
  importEquals: { module: "import-equals.ts", source: 'import rf = require("@fiber-optics/rf");\nexport const sdk = rf;\n' },
  importType: { module: "import-type.ts", source: 'export type Core = import("fiber-core").Core;\n' },
  exportFrom: { module: "export-from.ts", source: 'export { render } from "reactivefiber-sdk";\n' },
  nearMissRelative: {
    module: "near-miss-relative.ts",
    source: 'import { registerNativeReactiveFiberRender } from "./providers/reactivefiber.js";\nexport const register = registerNativeReactiveFiberRender;\n',
  },
  nearMissHost: { module: "near-miss-host.ts", source: 'export const host = { resources: 1 };\nexport const reactivefiber = "rf";\n' },
};
const LAUNCH_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  spawnRf: { module: "spawn-rf.ts", source: 'import { spawn } from "node:child_process";\nspawn("rf", ["graph", "show"]);\n' },
  execFileSyncRf: { module: "exec-rf.ts", source: 'import { execFileSync } from "node:child_process";\nexecFileSync("rf", ["--version"]);\n' },
  memberSpawnRf: { module: "member-spawn-rf.ts", source: 'import * as cp from "node:child_process";\ncp.spawn("rf", ["context", "show"]);\n' },
  aliasedImport: { module: "aliased-import.ts", source: 'import { spawn as run } from "node:child_process";\nrun("rf", ["context", "show"]);\n' },
  otherBinary: { module: "spawn-rg.ts", source: 'import { spawn } from "node:child_process";\nspawn("rg", ["-n", "rf"]);\n' },
  otherModuleAlias: { module: "other-alias.ts", source: 'import { spawn as run } from "./runner.js";\nrun("rf", ["context", "show"]);\n' },
};
/** B1's decision reader's controls: bead-field texts. */
const DECISION_CONTROLS: Readonly<Record<string, string>> = {
  decision: "OWNER DECISION: Pi will embed the portable Fiber core behind the W10 provider.",
  wasmDecision: "Ruling: embed the WASM build in the workbench host.",
  stemDecision: "Decided to embed FiberOpticsSDK in-process.",
  wrappedDecision: "OWNER RULING (2026-10-28): the W10 provider shall embed\nthe portable Fiber core.",
  nearMissEmbed: "The fixture is embedded in the test.",
  nearMissCore: "The rf binary reports fiber_optics in sdk_versions.",
  splitSentences: "We will embed nothing. The Fiber core stays outside.",
};
/** B2's decision reader's controls: decisions-page Markdown (table rows and list items are units of their own). */
const PAGE_CONTROLS: Readonly<Record<string, string>> = {
  tableRow: "| Embed the portable Fiber core | decided | wb-x32 |",
  listItem: "- **Embedding:** embed the portable Fiber core behind W10.",
  splitRows: "| embed | first |\n| Fiber core | second |",
  splitItems: "- embed the receipt\n- the Fiber core stays outside",
};
/** Row D's claim reader's controls: a text and the path it is read under (which sets the Markdown rules). */
interface PlantedText {
  readonly path: string;
  readonly text: string;
}
const CLAIM_CONTROLS: Readonly<Record<string, PlantedText>> = {
  coreName: { path: "docs/core.md", text: "Pi now runs the portable Fiber core in-process.\n" },
  capabilitySet: { path: "docs/set.md", text: "The host passes a HostCapabilitySet to the core.\n" },
  webAssembly: { path: "docs/wasm.md", text: "The workbench instantiates WebAssembly modules.\n" },
  foaSdk: { path: "docs/foa.md", text: "Pi ships the FOA SDK.\n" },
  embedsStem: { path: "docs/stem.md", text: "Pi embeds fiber_optics directly.\n" },
  embedsWasm: { path: "docs/token.md", text: "The workbench embeds a WASM runtime.\n" },
  wrapped: { path: "docs/wrapped.md", text: "Pi hosts the portable Fiber\ncore beside the rf preview.\n" },
  fullwidth: { path: "docs/fullwidth.md", text: `The host loads ${String.fromCodePoint(0xff37)}ebAssembly modules.\n` },
  srcComment: { path: "src/comment.ts", text: "/**\n * Pi embeds the\n * Fiber core here.\n */\nexport {};\n" },
  setComment: { path: "src/set-comment.ts", text: "// a HostCapabilitySet with Clock, Timer, Randomness and Spawner\nexport {};\n" },
  nearMissEmbed: { path: "AGENTS.md", text: "Don't embed multi-line scripts in bash.\n" },
  nearMissStem: { path: "docs/receipt.md", text: '`RF_PREVIEW_RECEIPT {"rf_identity":{"sdk_versions":{"fiber_optics":"0.1.0"}}}`\n' },
  nearMissWasm: { path: "src/vm.ts", text: "codeGeneration: { strings: false, wasm: false },\n" },
  nearMissSentences: { path: "docs/split.md", text: "Pi embeds rf. The fiber_optics version is read from its envelope.\n" },
  nearMissRows: { path: "docs/rows.md", text: "| embed | x |\n| fiber_optics | y |\n" },
  nearMissItems: { path: "docs/items.md", text: "- embed the receipt\n- fiber_optics stays rf's\n" },
};
const NEVER = (): never => {
  throw new Error("census: a planted or injected capability is never invoked here");
};
/** A planted descriptor for D2's readers; every field a registry accepts. */
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
  coreHost: plantedDescriptor({ id: "fiber.core.host", description: "Hosts the portable Fiber core." }),
  capabilitySchema: plantedDescriptor({
    id: "workbench.core.init",
    inputSchema: { type: "object", properties: { capabilities: { type: "object", description: "a HostCapabilitySet" } } },
  }),
  embedsDescription: plantedDescriptor({ id: "workbench.render.embedded", description: "Embeds fiber_optics in-process." }),
  wasmContract: plantedDescriptor({ id: "workbench.wasm.render", contractSource: "WebAssembly core ABI" }),
  neutral: plantedDescriptor({ id: "forge.gate.status", description: "Embedded gate status." }),
};
/** C2's refused replies and Q4's relayed one: a ChangedViewReceipt-shaped record (charter :24's fields), not the CLI envelope. */
const ABI_RECEIPT: { [key: string]: Json } = {
  source_runtime: "runtime-fixture",
  epoch: 1,
  transaction_ref: "txn-fixture",
  changed_materializations: [],
  diagnostics: [],
  dependency_frontier: [],
  trace_ref: "trace-fixture",
};
const REFUSED_FORMS: Readonly<Record<string, (root: string) => Json>> = {
  abiReceipt: () => ABI_RECEIPT,
  otherSchema: root => ({ ...fullShapeRf(root), schema: "fiber-optics.wasm/v1" }),
  extraKey: root => ({ ...fullShapeRf(root), capabilities: { clock: "host" } }),
};
/** Q1 R-COMPOSED: every name composed at run time from parts. */
const COMPOSED_MODULE: PlantedModule = {
  module: "composed.ts",
  source:
    `export const set = "Host" + "CapabilitySet";\nexport const sdk = ["fiber", "optics"].join("_");\nexport const file = \`core\${".was"}m\`;\nexport const api = "Web" + "Assembly";\nexport const scope = "@reactive" + "-fiber/sdk";\n`,
};
/** Q2 R-GENERIC-ABI: the ABI spelled through its generic entries only. */
const GENERIC_MODULE: PlantedModule = {
  module: "generic-abi.ts",
  source:
    "declare const runtime: {\n  initialize(snapshot: unknown, capabilities: unknown): void;\n  inspect(refs: unknown): unknown;\n  subscribe(view: unknown): void;\n  snapshot(): unknown;\n  close(): void;\n};\nruntime.initialize({}, {});\nruntime.inspect([]);\nruntime.subscribe({});\nruntime.snapshot();\nruntime.close();\n",
};
/** Q3 R-OUTSIDE-SCOPE: a claim in each tree row D does not walk, beside one clean scanned file. */
const OUTSIDE_TREE: Readonly<Record<string, string>> = {
  "docs/clean.md": "Pi reads rf through its CLI envelope.\n",
  "test/claim.test.ts": "// Pi embeds the portable Fiber core\nexport {};\n",
  "new-feedback/claim.md": "Pi embeds the portable Fiber core.\n",
  ".beads/claim.md": "Pi embeds the portable Fiber core.\n",
  "media/claim.md": "Pi embeds the portable Fiber core.\n",
};
/** Q5 R-DECISION-ELSEWHERE: a planted export whose decision sits on another bead, not on the decision bead. */
const ELSEWHERE_ROWS: readonly Json[] = [
  { id: "wb-x32", title: "W10: ReactiveFiber provider/interop", description: "RF render/context capability; honest blocker.", notes: "noncommitted preview passed." },
  { id: "wb-zz9", title: "Embedding ruling", notes: "OWNER DECISION: Pi will embed the portable Fiber core." },
];
/** Q6 R-OTHER-VOCABULARY: the core under other names in every surface. */
const OTHER_VOCABULARY: {
  readonly module: PlantedModule;
  readonly manifest: Json;
  readonly text: PlantedText;
  readonly descriptor: CapabilityDescriptor;
} = {
  module: {
    module: "other-vocabulary.ts",
    source:
      'import { Core } from "@acme/reactive-core-runtime";\nconst core = new Core({ now: () => 0, sleep: async () => {}, random: () => 0, spawn: () => {} });\ncore.applyCommands([]);\nexport { core };\n',
  },
  manifest: { dependencies: { "@acme/reactive-core-runtime": "1.0.0" } },
  text: { path: "docs/other.md", text: "Pi hosts the reactive core runtime in-process.\n" },
  descriptor: plantedDescriptor({ id: "workbench.core.host", description: "Hosts the reactive core runtime in-process." }),
};

/** Q7 R-INDIRECT-LAUNCH: an rf launch whose launcher or binary is reached through a binding the roster does not resolve. */
const INDIRECT_LAUNCH_MODULE: PlantedModule = {
  module: "indirect-launch.ts",
  source:
    'import { spawn } from "node:child_process";\nconst run = spawn;\nrun("rf", ["context", "show"]);\nconst { spawnSync: go } = require("node:child_process");\ngo("rf", ["--version"]);\nconst RF = "rf";\nspawn(RF, ["graph", "show"]);\n',
};
/** The residual families, each named by the quiet-row pin that holds it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-GENERIC-ABI": ["Q2"],
  "R-OUTSIDE-SCOPE": ["Q3"],
  "R-INJECTED-RELAY": ["Q4"],
  "R-DECISION-ELSEWHERE": ["Q5"],
  "R-OTHER-VOCABULARY": ["Q6"],
  "R-INDIRECT-LAUNCH": ["Q7"],
};

// ---- the judged rows ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to D, to the bead's own clauses. */
const ROWS: readonly Row[] = [
  { id: "A", label: "released FiberOpticsSDK WASM ABI + HostCapabilitySet (unshipped)", pins: ["A1", "A2", "A3", "A4"] },
  { id: "B", label: "a wb-x32 committing decision to embed the portable Fiber core", pins: ["B1", "B2"] },
  { id: "C", label: "until then Pi's RF surface stays the rf CLI envelope only", pins: ["C1", "C2", "C3"] },
  { id: "D", label: "no Pi claim of an embedded Fiber core", pins: ["D1", "D2"] },
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
interface ProducerLine {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Roster {
  readonly constants: JsonObject;
  readonly producer: { readonly repository: string; readonly path: string; readonly pin: string; readonly lines: readonly ProducerLine[] };
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
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !isObject(raw.producer) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants, producer and rows`);
  }
  const producer = raw.producer;
  if (typeof producer.repository !== "string" || typeof producer.path !== "string" || typeof producer.pin !== "string" || !Array.isArray(producer.lines)) {
    throw new Error("roster producer needs a repository, a path, a pin and lines");
  }
  const lines = producer.lines.map((entry: unknown, index: number): ProducerLine => {
    if (!isObject(entry) || typeof entry.line !== "number" || typeof entry.text !== "string" || typeof entry.sha256 !== "string") {
      throw new Error(`roster producer.lines[${index}] needs a line, a text and a sha256`);
    }
    return { line: entry.line, text: entry.text, sha256: entry.sha256 };
  });
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
    constants: json(raw.constants) as JsonObject,
    producer: { repository: producer.repository, path: producer.path, pin: producer.pin, lines },
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerLine(line: number): string {
  return ROSTER.producer.lines.find(entry => entry.line === line)?.text ?? "";
}

// ---- the manifest and path readers (A1, A2) ----

/** Every key and string of a JSON value at any depth, each with its path (a key is read as text too). */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [{ path: `${path}{${key}}`, text: key }, ...textsOf(item, `${path}.${key}`)]);
  return [];
}
/** A manifest read whole: its parsed keys and strings, and (given) its raw lines, so a shadowed duplicate key is read too. */
function manifestHits(manifest: unknown, raw: string | undefined, label: string): string[] {
  const parsed = textsOf(manifest, label).flatMap(({ path, text }) => packageNeedles(text).map(needle => `${path}: ${needle}`));
  const lines = raw === undefined ? [] : raw.split("\n").flatMap((line, index) => packageNeedles(line).map(needle => `${label}:${index + 1}: ${needle}`));
  return [...parsed, ...lines];
}
/** An npm lockfile's installed package paths and their name fields (never versions or integrity hashes). */
function lockReading(lock: unknown): { packages: number; hits: string[] } {
  const packages = isObject(lock) && isObject(lock.packages) ? lock.packages : {};
  const hits = Object.entries(packages).flatMap(([path, entry]) => {
    const name = isObject(entry) && typeof entry.name === "string" ? entry.name : "";
    return [...packageNeedles(path).map(needle => `${path}: ${needle}`), ...packageNeedles(name).map(needle => `${path} name: ${needle}`)];
  });
  return { packages: Object.keys(packages).length, hits };
}
/** Tracked paths that are WASM files, and tracked paths naming the stem, a crate or the wasm token. */
function pathReading(paths: readonly string[]): { wasmFiles: string[]; named: string[] } {
  return {
    wasmFiles: paths.filter(path => extname(path).toLowerCase() === `.${WASM_TOKEN}`),
    named: paths.flatMap(path => packageNeedles(path).map(needle => `${path}: ${needle}`)),
  };
}
/** git's tracked files, whole repository or below the given paths, in name order. */
function gitFiles(...paths: string[]): string[] {
  return execFileSync("git", ["ls-files", "-z", "--", ...paths], { cwd: REPO, encoding: "utf8" })
    .split("\0")
    .filter(path => path.length > 0)
    .sort();
}

// ---- the src reader (A3, A4, C1) ----

function isScript(path: string): boolean {
  return Object.hasOwn(SCRIPT_KINDS, extname(path).toLowerCase());
}
function scriptKind(module: string): ts.ScriptKind {
  return SCRIPT_KINDS[extname(module).toLowerCase()] ?? ts.ScriptKind.TS;
}
type TextKind = "name" | "string" | "regex" | "jsx";
interface Located {
  readonly line: number;
  readonly text: string;
}
interface ModuleRead {
  readonly texts: readonly (Located & { readonly kind: TextKind })[];
  readonly accesses: readonly Located[];
  readonly specifiers: readonly Located[];
  readonly shapes: readonly (Located & { readonly members: readonly string[] })[];
  readonly launches: readonly string[];
}
/** The text the AST reader judges at a node, or undefined: names, string-like literals, template parts, regex patterns, JSX text. */
function judgedText(node: ts.Node): { kind: TextKind; text: string } | undefined {
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return { kind: "name", text: node.text };
  if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return { kind: "string", text: node.text };
  if (ts.isRegularExpressionLiteral(node)) return { kind: "regex", text: node.text.slice(1, node.text.lastIndexOf("/")) };
  if (ts.isJsxText(node)) return { kind: "jsx", text: node.text };
  return undefined;
}
/** A module specifier a node states: import, export, import-equals, import type, dynamic import or require. */
function specifierOf(node: ts.Node): string | undefined {
  if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
    return node.moduleSpecifier.text;
  }
  if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
    return node.moduleReference.expression.text;
  }
  if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) return node.argument.literal.text;
  if (ts.isCallExpression(node)) {
    const first = node.arguments[0];
    const callee = node.expression;
    const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
    if (loads && first !== undefined && ts.isStringLiteralLike(first)) return first.text;
  }
  return undefined;
}
/** A member-bearing declaration's kind and members: an interface, a type literal, a class or an object literal. */
function shapeOf(node: ts.Node): { kind: string; members: readonly ts.Node[] } | undefined {
  if (ts.isInterfaceDeclaration(node)) return { kind: "interface", members: node.members };
  if (ts.isTypeLiteralNode(node)) return { kind: "type literal", members: node.members };
  if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) return { kind: "class", members: node.members };
  if (ts.isObjectLiteralExpression(node)) return { kind: "object literal", members: node.properties };
  return undefined;
}
/** The folded names of a declaration's named members (a computed name is not read: R-COMPOSED). */
function memberNames(members: readonly ts.Node[]): string[] {
  const names: string[] = [];
  for (const member of members) {
    const named =
      ts.isPropertySignature(member) ||
      ts.isMethodSignature(member) ||
      ts.isPropertyDeclaration(member) ||
      ts.isMethodDeclaration(member) ||
      ts.isGetAccessorDeclaration(member) ||
      ts.isSetAccessorDeclaration(member) ||
      ts.isPropertyAssignment(member) ||
      ts.isShorthandPropertyAssignment(member);
    if (!named) continue;
    const name = member.name;
    if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) names.push(fold(name.text));
  }
  return names;
}
/** The name a call's callee is read by: an identifier, or a property access's name. */
function calleeName(expression: ts.Expression): string | undefined {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return undefined;
}
/** A module's named-import aliases of the launchers (`import { spawn as run } from "node:child_process"`: run -> spawn). */
function launcherAliases(file: ts.SourceFile): Map<string, string> {
  const aliases = new Map<string, string>();
  const launchers: readonly string[] = LAUNCHERS;
  const modules: readonly string[] = CHILD_PROCESS;
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !modules.includes(statement.moduleSpecifier.text)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      const imported = element.propertyName?.text ?? element.name.text;
      if (launchers.includes(imported)) aliases.set(element.name.text, imported);
    }
  }
  return aliases;
}
/** One AST read of a module: its judged texts, property-access chains, specifiers, member-bearing declarations and rf launches. */
function readModule(text: string, module: string): ModuleRead {
  const file = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKind(module));
  const aliases = launcherAliases(file);
  const lineOf = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const texts: (Located & { kind: TextKind })[] = [];
  const accesses: Located[] = [];
  const specifiers: Located[] = [];
  const shapes: (Located & { members: string[] })[] = [];
  const launches: string[] = [];
  const launchers: readonly string[] = LAUNCHERS;
  const visit = (node: ts.Node): void => {
    const read = judgedText(node);
    if (read !== undefined) texts.push({ line: lineOf(node), ...read });
    if (ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node)) accesses.push({ line: lineOf(node), text: node.getText(file).replace(/\s+/g, "") });
    const specifier = specifierOf(node);
    if (specifier !== undefined) specifiers.push({ line: lineOf(node), text: specifier });
    const shape = shapeOf(node);
    if (shape !== undefined) {
      const members = memberNames(shape.members);
      if (members.length > 0) shapes.push({ line: lineOf(node), text: shape.kind, members });
    }
    if (ts.isCallExpression(node)) {
      const called = calleeName(node.expression);
      const name = called === undefined ? undefined : ts.isIdentifier(node.expression) ? (aliases.get(called) ?? called) : called;
      const first = node.arguments[0];
      if (name !== undefined && launchers.includes(name) && first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") launches.push(`${module}: ${name}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { texts, accesses, specifiers, shapes, launches };
}
function isRelative(specifier: string): boolean {
  return specifier.startsWith(".") || specifier.startsWith("/");
}
/** A3: the WASM ABI's hits in a module: a stem, crate, global or ABI name in any judged text, a .wasm string, a wasm-token specifier. */
function abiHits(read: ModuleRead, module: string): string[] {
  const texts = read.texts.flatMap(({ line, text }) => needlesIn(text, ABI_NEEDLES).map(needle => `${module}:${line}: ${needle}`));
  const files = read.texts.filter(entry => entry.kind === "string" && /\.wasm\b/i.test(entry.text)).map(entry => `${module}:${entry.line}: .${WASM_TOKEN}`);
  const packages = read.specifiers.filter(entry => tokens(entry.text).includes(WASM_TOKEN)).map(entry => `${module}:${entry.line}: ${WASM_TOKEN} specifier`);
  return [...texts, ...files, ...packages];
}
/** A4: the capability set's hits in a module: its name in any judged text, and every declaration carrying all four members. */
function setHits(read: ModuleRead, module: string): { named: string[]; shaped: string[] } {
  const members = CAPABILITY_MEMBERS.map(fold);
  return {
    named: read.texts.flatMap(({ line, text }) => needlesIn(text, SET_NEEDLES).map(needle => `${module}:${line}: ${needle}`)),
    shaped: read.shapes.filter(shape => members.every(member => shape.members.includes(member))).map(shape => `${module}:${shape.line}: ${shape.text}`),
  };
}
/** Whether a text holds a spelling: one with punctuation as written (any case), a word spelling by its fold. */
function spells(text: string, spelling: string): boolean {
  return /^[A-Za-z0-9]+$/.test(spelling) ? fold(text).includes(fold(spelling)) : text.toLowerCase().includes(spelling.toLowerCase());
}
/** C1: a module's RF or Fiber SDK loads (a package specifier naming one) and its spellings of the notes' three names. */
function sdkHits(read: ModuleRead, module: string): { loads: string[]; spelled: string[] } {
  const loads = read.specifiers
    .filter(entry => !isRelative(entry.text))
    .flatMap(entry => needlesIn(entry.text, RF_SDK_NEEDLES).map(needle => `${module}:${entry.line}: ${entry.text}: ${needle}`));
  const spelled = [...read.texts, ...read.accesses].flatMap(({ line, text }) => SPELLINGS.filter(spelling => spells(text, spelling)).map(spelling => `${module}:${line}: ${spelling}`));
  return { loads, spelled: [...new Set(spelled)] };
}
function plantedRead(planted: PlantedModule): ModuleRead {
  return readModule(planted.source, planted.module);
}

/** Every regular file below a directory, in name order, root-relative; a symlink is recorded and never followed. */
function walkFiles(root: string, directory: string, keep: (path: string) => boolean): { files: string[]; symlinks: string[] } {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (dir: string): void => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      const at = relative(root, path).split("\\").join("/");
      if (entry.isSymbolicLink()) symlinks.push(at);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && keep(entry.name)) files.push(at);
    }
  };
  if (existsSync(join(root, directory))) visit(join(root, directory));
  return { files, symlinks };
}
interface SrcReading {
  readonly modules: string[];
  readonly symlinks: string[];
  readonly walkedNotTracked: string[];
  readonly trackedNotWalked: string[];
  readonly texts: number;
  readonly shapes: number;
  readonly specifiers: number;
  readonly abi: string[];
  readonly named: string[];
  readonly shaped: string[];
  readonly loads: string[];
  readonly spelled: string[];
  readonly launches: string[];
  readonly anchors: { [anchor: string]: boolean };
}
let srcCache: SrcReading | undefined;
/** One read of every src module (shared by A3, A4 and C1): the walk held to git, the AST reads and the four scans. */
function srcReading(): SrcReading {
  if (srcCache !== undefined) return srcCache;
  const walk = walkFiles(REPO, "src", isScript);
  const tracked = gitFiles("src").filter(isScript);
  const reading = { texts: 0, shapes: 0, specifiers: 0, abi: [] as string[], named: [] as string[], shaped: [] as string[], loads: [] as string[], spelled: [] as string[], launches: [] as string[] };
  const anchors: { [anchor: string]: boolean } = Object.fromEntries(SOURCE_ANCHORS.map(anchor => [`${anchor.module} ${anchor.reader} ${anchor.text}`, false]));
  for (const module of walk.files) {
    const read = readModule(readFileSync(join(REPO, module), "utf8"), module);
    reading.texts += read.texts.length;
    reading.shapes += read.shapes.length;
    reading.specifiers += read.specifiers.length;
    reading.abi.push(...abiHits(read, module));
    const set = setHits(read, module);
    reading.named.push(...set.named);
    reading.shaped.push(...set.shaped);
    const sdk = sdkHits(read, module);
    reading.loads.push(...sdk.loads);
    reading.spelled.push(...sdk.spelled);
    reading.launches.push(...read.launches);
    for (const anchor of SOURCE_ANCHORS) {
      if (anchor.module !== module) continue;
      const seen =
        anchor.reader === "texts"
          ? read.texts.some(entry => entry.text === anchor.text)
          : anchor.reader === "accesses"
            ? read.accesses.some(entry => entry.text === anchor.text)
            : anchor.reader === "specifiers"
              ? read.specifiers.some(entry => entry.text === anchor.text)
              : anchor.reader === "shapes"
                ? read.shapes.some(entry => entry.members.includes(anchor.text))
                : read.launches.includes(`${module}: ${anchor.text}`);
      anchors[`${anchor.module} ${anchor.reader} ${anchor.text}`] = seen;
    }
  }
  srcCache = {
    modules: walk.files,
    symlinks: walk.symlinks,
    walkedNotTracked: walk.files.filter(module => !tracked.includes(module)),
    trackedNotWalked: tracked.filter(module => !walk.files.includes(module)),
    ...reading,
    anchors,
  };
  return srcCache;
}
function walkHeld(src: SrcReading): boolean {
  return src.walkedNotTracked.length === 0 && src.trackedNotWalked.length === 0 && src.symlinks.length === 0 && src.modules.length >= FLOORS.modules;
}

// ---- the product texts (D1, Q3) ----

function isRootLevel(path: string): boolean {
  return !path.includes("/");
}
interface ProductReading {
  readonly files: number;
  readonly sentences: number;
  readonly claims: string[];
  readonly unreadable: string[];
  readonly otherExtensions: string[];
  readonly roots: { [root: string]: boolean };
}
/** Reads every given file of a tree whose extension is a text extension (decoded as strict UTF-8) and returns its claims. */
function productReading(root: string, files: readonly string[]): ProductReading {
  const textExtensions: readonly string[] = TEXT_EXTENSIONS;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const others = new Set<string>();
  const unreadable: string[] = [];
  const claims: string[] = [];
  let read = 0;
  let sentences = 0;
  const roots: { [root: string]: boolean } = Object.fromEntries([...SCAN_ROOTS.map(dir => [dir, false]), ["(root files)", false]]);
  for (const path of files) {
    const extension = extname(path).toLowerCase();
    if (!textExtensions.includes(extension)) {
      others.add(extension);
      continue;
    }
    let text: string;
    try {
      text = decoder.decode(readFileSync(join(root, path)));
    } catch {
      unreadable.push(path);
      continue;
    }
    read += 1;
    sentences += sentencesOf(text, isMarkdown(path)).length;
    claims.push(...claimsOf(text, path));
    const top = isRootLevel(path) ? "(root files)" : (path.split("/")[0] ?? "");
    if (Object.hasOwn(roots, top)) roots[top] = true;
  }
  return { files: read, sentences, claims, unreadable, otherExtensions: [...others].sort(), roots };
}
/** Row D's walk of a tree: every regular file below each scanned root (never following a symlink), and the root's own files. */
function productWalk(root: string): { files: string[]; symlinks: string[] } {
  const walks = SCAN_ROOTS.map(dir => walkFiles(root, dir, () => true));
  const top = readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .sort();
  return { files: [...walks.flatMap(walk => walk.files), ...top], symlinks: walks.flatMap(walk => walk.symlinks) };
}

// ---- the registrations (C2, D2, Q4) ----

const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
type RfInvoke = Parameters<typeof registerReactiveFiberRender>[1];
type RfEnvelope = Awaited<ReturnType<RfInvoke>>;
const RF_INVOKE: RfInvoke = async () => NEVER();

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
/** One descriptor's claims: every key and string at any depth, each read as one unit, `<id> <path>: <families>`. */
function descriptorClaims(descriptor: CapabilityDescriptor): string[] {
  return textsOf(descriptor, descriptor.id).flatMap(({ path, text }) => {
    const families = claimFamilies(text);
    return families.length === 0 ? [] : [`${path}: ${families.join(",")}`];
  });
}
/** A registration leg's reading: the required ids missing and every claim its descriptors state. */
function registryReading(registry: CapabilityRegistry): JsonValue {
  const descriptors = descriptorsOf(registry);
  const ids = new Set(descriptors.map(descriptor => descriptor.id));
  return json({
    missing: REQUIRED_DESCRIPTORS.filter(id => !ids.has(id)),
    claims: descriptors.flatMap(descriptorClaims),
  });
}

// ---- the stand-in rf (C2): the ONLY PATH entry, it logs one argv line per spawn, prints a reply and exits ----

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
function recorder(reply: (root: string) => Json): Recorder {
  const root = scratchDir("urr-core-gate-root-");
  const bin = scratchDir("urr-core-gate-bin-");
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
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });
const LEGACY_INPUT = { model: "model-fixture", task: "task-fixture" } as const;
const VIEW_INPUT = { view: "swarm.worker", taskId: "bead-fixture-000" } as const;
async function outcomeOf(call: Promise<JsonValue>): Promise<JsonValue> {
  const settled: { value: JsonValue } | { error: unknown } = await call.then(
    value => ({ value }),
    (error: unknown) => ({ error }),
  );
  if ("error" in settled) {
    if (!(settled.error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(settled.error)}`);
    return `${settled.error.category}: ${settled.error.message}`;
  }
  const source = isObject(settled.value) ? settled.value.source : undefined;
  if (!isObject(source)) return json({ schema: "absent", command: "absent", keys: [] });
  return json({ schema: source.schema ?? "absent", command: source.command ?? "absent", keys: Object.keys(source).sort() });
}
async function bothArms(record: Recorder): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, record.root);
  return json({
    legacy: await outcomeOf(registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext())),
    view: await outcomeOf(registry.invoke(PREVIEW_ID, VIEW_INPUT, invokeContext())),
  });
}

// ---- the bead export (B1, Q5 and the judged set) ----

type ExportRow = { [key: string]: unknown };
let exportCache: Map<string, ExportRow> | undefined;
function exportRows(): Map<string, ExportRow> {
  if (exportCache !== undefined) return exportCache;
  exportCache = rowsById(
    readFileSync(EXPORT_PATH, "utf8")
      .split("\n")
      .filter(line => line.trim().length > 0)
      .map(line => JSON.parse(line) as unknown),
  );
  return exportCache;
}
function rowsById(rows: readonly unknown[]): Map<string, ExportRow> {
  const out = new Map<string, ExportRow>();
  for (const row of rows) if (isObject(row) && typeof row.id === "string") out.set(row.id, row);
  return out;
}
/** B1: a bead row's decision sentences over every string field, and which anchor each field shows was read. */
function beadDecisions(rows: ReadonlyMap<string, ExportRow>, bead: string): { found: boolean; text: number; anchors: { [field: string]: boolean }; decisions: string[] } {
  const row = rows.get(bead);
  if (row === undefined) return { found: false, text: 0, anchors: {}, decisions: [] };
  const fields = Object.entries(row).filter((entry): entry is [string, string] => typeof entry[1] === "string");
  const anchors = Object.fromEntries(Object.entries(DECISION_ANCHORS).map(([field, anchor]) => [field, fields.some(([key, value]) => key === field && value.includes(anchor))]));
  return {
    found: true,
    text: fields.reduce((sum, [, value]) => sum + value.length, 0),
    anchors,
    decisions: fields.flatMap(([field, value]) => decisionsOf(value, `${bead}.${field}`, true)),
  };
}
function beadText(): { title: string; notes: string } {
  const row = exportRows().get(BEAD);
  return { title: typeof row?.title === "string" ? row.title : "", notes: typeof row?.notes === "string" ? row.notes : "" };
}
/** Rows A to D's labels as the bead states them: the title's gating artifact, decision and until-then clause; the notes' claim clause. */
function beadClauses(title: string, notes: string): string[] {
  return [
    /^\[[^\]]+\] Gating artifact: (.+?) conjoined with /.exec(title)?.[1] ?? "",
    / conjoined with (.+?); then /.exec(title)?.[1] ?? "",
    /; (until then .+?)\.$/.exec(title)?.[1] ?? "",
    /Until both gates exist, [^;]*? and ([^;]+);/.exec(notes)?.[1] ?? "",
  ];
}
/** The gating artifact's conjuncts: "released <a> + <b> (unshipped)". */
function titleArtifacts(label: string): string[] {
  const body = /^released (.+) \(unshipped\)$/.exec(label)?.[1];
  return body === undefined ? [] : body.split(" + ");
}
/** The title's capability list and the set it names: "supplies <list> explicitly via <set>". */
function titleCapabilities(title: string): { set: string; members: string[] } {
  const match = /supplies (.+?) explicitly via (\S+)/.exec(title);
  return { set: match?.[2] ?? "", members: match?.[1]?.split(/, | and /) ?? [] };
}
/** The decision clause's bead, verb and object: "a <bead> committing decision to <verb> the <object>". */
function titleDecision(label: string): { bead: string; verb: string; object: string } {
  const match = /^a (wb-[a-z0-9.]+) committing decision to (\w+) the (.+)$/.exec(label);
  return { bead: match?.[1] ?? "", verb: match?.[2] ?? "", object: match?.[3] ?? "" };
}
/** The notes' evidence parenthetical: the decisions page and line, and the wb-693 grep's spellings. */
function notesEvidence(notes: string): { page: string; line: number; spellings: string[] } {
  const match = /\((docs\/workbench\/\S+?):(\d+); wb-693 \S+ note: git grep finds no (\S+) import\)/.exec(notes);
  return { page: match?.[1] ?? "", line: Number(match?.[2] ?? "0"), spellings: match?.[3]?.split("/") ?? [] };
}
/** The title's gating word ("Gating artifact: ..."). */
function titleArtifactWord(title: string): string {
  return /\] Gating (\w+): /.exec(title)?.[1] ?? "";
}
/** The notes' census surfaces ("an import/manifest census"). */
function notesSurfaces(notes: string): string[] {
  const match = /an (\w+)\/(\w+) census/.exec(notes);
  return match === null ? [] : [match[1] ?? "", match[2] ?? ""];
}
/** The notes' unchanged trees ("no src or docs change"). */
function notesUnchanged(notes: string): string[] {
  const match = /no (\w+) or (\w+) change/.exec(notes);
  return match === null ? [] : [match[1] ?? "", match[2] ?? ""];
}
/** The roster witnesses of a row's pins, as ROWS lists them (an object witness; any other reads as an empty object). */
function witnessesOf(row: string): { [key: string]: JsonValue }[] {
  return (ROWS.find(entry => entry.id === row)?.pins ?? []).map(pin => {
    const witness = rosterWitness(pin);
    return isObject(witness) ? (witness as { [key: string]: JsonValue }) : {};
  });
}
/** The notes' owner families of rf CLI envelope consumption. */
function notesOwners(notes: string): string[] {
  return /stays owned by the (\S+) families/.exec(notes)?.[1]?.split("/") ?? [];
}
/** The notes' program citation (path, lines, pin), its status quote and its Authority quote. */
function notesProgram(notes: string): { path: string; lines: number[]; pin: string; status: string; authority: string } {
  const match = /charter (docs\/programs\/\S+?):(\d+),:(\d+)@([0-9a-f]+), '([^']+)'\)/.exec(notes);
  return {
    path: match?.[1] ?? "",
    lines: match === null ? [] : [Number(match[2]), Number(match[3])],
    pin: match?.[4] ?? "",
    status: match?.[5] ?? "",
    authority: /Authority: '([^']+)'/.exec(notes)?.[1] ?? "",
  };
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
    const vendored = lockReading(JSON.parse(readFileSync(join(REPO, "vendor", "dependency-lock.json"), "utf8")));
    return json({
      surface: "manifests",
      artifact: "FiberOpticsSDK WASM ABI",
      manifestTextsAboveFloor: textsOf(manifest, "package.json").length >= FLOORS.manifestTexts,
      packageJson: manifestHits(manifest, raw, "package.json"),
      lockPackagesAboveFloor: lock.packages >= FLOORS.lockPackages && vendored.packages >= FLOORS.lockPackages,
      lock: lock.hits,
      vendorLock: vendored.hits,
      manifestControls: Object.fromEntries(Object.entries(MANIFEST_CONTROLS).map(([name, planted]) => [name, manifestHits(planted, undefined, name)])),
      shadowedKey: { parsed: manifestHits(JSON.parse(SHADOWED_MANIFEST), undefined, "shadowed").length, raw: manifestHits(JSON.parse(SHADOWED_MANIFEST), SHADOWED_MANIFEST, "shadowed").length },
      lockControls: Object.fromEntries(Object.entries(LOCK_CONTROLS).map(([name, planted]) => [name, lockReading(planted).hits])),
    });
  },
  A2: async () => {
    const tracked = gitFiles();
    const reading = pathReading(tracked);
    return json({
      surface: "tracked artifacts",
      artifact: "FiberOpticsSDK WASM ABI",
      trackedAboveFloor: tracked.length >= FLOORS.trackedFiles,
      vendorRead: tracked.some(path => path.startsWith("vendor/") && path.endsWith(".tgz")),
      wasmFiles: reading.wasmFiles,
      named: reading.named,
      controls: pathReading(PATH_CONTROLS),
    });
  },
  A3: async () => {
    const src = srcReading();
    return json({
      surface: "src imports and names",
      artifact: "FiberOpticsSDK WASM ABI",
      walkHeldToGit: walkHeld(src),
      textsAboveFloor: src.texts >= FLOORS.texts,
      specifiersAboveFloor: src.specifiers >= FLOORS.specifiers,
      anchors: src.anchors,
      abi: src.abi,
      controls: Object.fromEntries(Object.entries(ABI_CONTROLS).map(([name, planted]) => [name, abiHits(plantedRead(planted), planted.module)])),
    });
  },
  A4: async () => {
    const src = srcReading();
    return json({
      surface: "src",
      artifact: CAPABILITY_SET,
      members: CAPABILITY_MEMBERS,
      walkHeldToGit: walkHeld(src),
      shapesAboveFloor: src.shapes >= FLOORS.shapes,
      named: src.named,
      shaped: src.shaped,
      controls: Object.fromEntries(Object.entries(SET_CONTROLS).map(([name, planted]) => [name, setHits(plantedRead(planted), planted.module)])),
    });
  },
  B1: async () => {
    const reading = beadDecisions(exportRows(), titleDecision(ROWS[1]?.label ?? "").bead);
    return json({
      surface: "bead export",
      bead: titleDecision(ROWS[1]?.label ?? "").bead,
      found: reading.found,
      textAboveFloor: reading.text >= FLOORS.exportText,
      anchors: reading.anchors,
      decisions: reading.decisions,
      controls: Object.fromEntries(Object.entries(DECISION_CONTROLS).map(([name, text]) => [name, decisionsOf(text, name, true)])),
    });
  },
  B2: async () => {
    const page = notesEvidence(beadText().notes).page;
    const text = readFileSync(join(REPO, page), "utf8");
    return json({
      surface: "decisions page",
      page,
      sentencesAboveFloor: sentencesOf(text, true).length >= FLOORS.pageSentences,
      decisions: decisionsOf(text, page, true),
      controls: Object.fromEntries(Object.entries(PAGE_CONTROLS).map(([name, text]) => [name, decisionsOf(text, name, true)])),
    });
  },
  C1: async () => {
    const src = srcReading();
    return json({
      surface: "src",
      spellings: SPELLINGS,
      walkHeldToGit: walkHeld(src),
      loads: src.loads,
      spelled: src.spelled,
      launchRoster: src.launches,
      controls: Object.fromEntries(Object.entries(SDK_CONTROLS).map(([name, planted]) => [name, sdkHits(plantedRead(planted), planted.module)])),
      launchControls: Object.fromEntries(Object.entries(LAUNCH_CONTROLS).map(([name, planted]) => [name, plantedRead(planted).launches])),
    });
  },
  C2: async () => {
    const admitted = recorder(root => fullShapeRf(root));
    const arms = await bothArms(admitted);
    const refused: { [form: string]: JsonValue } = {};
    let refusedSpawns = 0;
    for (const [form, reply] of Object.entries(REFUSED_FORMS)) {
      const record = recorder(reply);
      refused[form] = await bothArms(record);
      refusedSpawns += spawnsOf(record).length;
    }
    return json({
      surface: "rf launch",
      schema: REACTIVE_FIBER_CLI_SCHEMA,
      contract: REACTIVE_FIBER_CONTRACT_SOURCE,
      admitted: arms,
      spawns: spawnsOf(admitted),
      refused,
      refusedSpawns,
    });
  },
  C3: async () => {
    const evidence = notesEvidence(beadText().notes);
    const page = readFileSync(join(REPO, evidence.page), "utf8").split("\n");
    const readme = readFileSync(join(REPO, STATED_README), "utf8");
    const provider = readFileSync(join(REPO, PROVIDER_MODULE), "utf8");
    const leading = ts.getLeadingCommentRanges(provider, 0) ?? [];
    const first = leading[0];
    return json({
      surface: "stated surface",
      cited: { page: evidence.page, line: evidence.line, row: page[evidence.line - 1] ?? "" },
      readme: sentencesOf(readme, true)
        .filter(sentence => fold(sentence.text).includes("reactivefibercli"))
        .map(sentence => `${STATED_README}:${sentence.line}: ${sentence.text}`),
      provider: first === undefined ? "" : `${PROVIDER_MODULE}:1: ${provider.slice(first.pos, first.end)}`,
    });
  },
  D1: async () => {
    const tracked = [...gitFiles(...SCAN_ROOTS), ...gitFiles().filter(isRootLevel)].sort();
    const walk = productWalk(REPO);
    const walkedRoots = walk.files.filter(path => !isRootLevel(path));
    const trackedRoots = tracked.filter(path => !isRootLevel(path));
    const reading = productReading(REPO, tracked);
    const tree = scratchDir("urr-core-gate-tree-");
    const planted: { [path: string]: string } = { "README.md": "Pi embeds the portable Fiber core.\n" };
    for (const dir of SCAN_ROOTS) planted[`${dir}/nested/claim.md`] = "The host passes a HostCapabilitySet.\n";
    for (const [path, text] of Object.entries(planted)) {
      mkdirSync(dirname(join(tree, path)), { recursive: true });
      writeFileSync(join(tree, path), text);
    }
    const plantedReading = productReading(tree, productWalk(tree).files);
    return json({
      surface: "product texts",
      roots: [...SCAN_ROOTS, "(root files)"],
      filesAboveFloor: reading.files >= FLOORS.productFiles,
      sentencesAboveFloor: reading.sentences >= FLOORS.sentences,
      rootsRead: reading.roots,
      symlinks: walk.symlinks,
      walkedNotTracked: walkedRoots.filter(path => !trackedRoots.includes(path)),
      trackedNotWalked: trackedRoots.filter(path => !walkedRoots.includes(path)),
      unreadable: reading.unreadable,
      otherExtensions: reading.otherExtensions,
      claims: reading.claims,
      controls: Object.fromEntries(Object.entries(CLAIM_CONTROLS).map(([name, planted]) => [name, claimsOf(planted.text, planted.path)])),
      plantedTree: { roots: plantedReading.roots, claims: plantedReading.claims },
    });
  },
  D2: async () =>
    json({
      surface: "registered capabilities",
      native: registryReading(await nativeRegistry()),
      injected: registryReading(injectedRegistry()),
      controls: Object.fromEntries(Object.entries(DESCRIPTOR_CONTROLS).map(([name, descriptor]) => [name, descriptorClaims(descriptor)])),
    }),
  Q1: async () => {
    const read = plantedRead(COMPOSED_MODULE);
    return json({ residual: "R-COMPOSED", abi: abiHits(read, COMPOSED_MODULE.module), set: setHits(read, COMPOSED_MODULE.module), sdk: sdkHits(read, COMPOSED_MODULE.module) });
  },
  Q2: async () => json({ residual: "R-GENERIC-ABI", entries: GENERIC_ABI, abi: abiHits(plantedRead(GENERIC_MODULE), GENERIC_MODULE.module) }),
  Q3: async () => {
    const tree = scratchDir("urr-core-gate-outside-");
    for (const [path, text] of Object.entries(OUTSIDE_TREE)) {
      mkdirSync(dirname(join(tree, path)), { recursive: true });
      writeFileSync(join(tree, path), text);
    }
    const walked = productWalk(tree).files;
    const reading = productReading(tree, walked);
    const outside = Object.keys(OUTSIDE_TREE)
      .filter(path => !walked.includes(path))
      .map(path => ({ path, claims: claimsOf(OUTSIDE_TREE[path] ?? "", path).length }));
    return json({ residual: "R-OUTSIDE-SCOPE", walked, claims: reading.claims, outside });
  },
  Q4: async () => {
    const registry = new CapabilityRegistry();
    registerReactiveFiberRender(registry, async () => ABI_RECEIPT as unknown as RfEnvelope, REPO);
    return json({ residual: "R-INJECTED-RELAY", returned: await outcomeOf(registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext())) });
  },
  Q5: async () => {
    const planted = rowsById(ELSEWHERE_ROWS);
    const decisionBead = titleDecision(ROWS[1]?.label ?? "").bead;
    return json({
      residual: "R-DECISION-ELSEWHERE",
      read: beadDecisions(planted, decisionBead).decisions,
      elsewhere: [...planted.keys()].filter(id => id !== decisionBead).map(id => ({ id, decisions: beadDecisions(planted, id).decisions.length })),
    });
  },
  Q6: async () => {
    const read = plantedRead(OTHER_VOCABULARY.module);
    return json({
      residual: "R-OTHER-VOCABULARY",
      abi: abiHits(read, OTHER_VOCABULARY.module.module),
      set: setHits(read, OTHER_VOCABULARY.module.module),
      sdk: sdkHits(read, OTHER_VOCABULARY.module.module),
      manifest: manifestHits(OTHER_VOCABULARY.manifest, undefined, "planted"),
      claims: claimsOf(OTHER_VOCABULARY.text.text, OTHER_VOCABULARY.text.path),
      descriptor: descriptorClaims(OTHER_VOCABULARY.descriptor),
    });
  },
  Q7: async () => json({ residual: "R-INDIRECT-LAUNCH", launches: plantedRead(INDIRECT_LAUNCH_MODULE).launches }),
};

describe("wb-2wiv.1 portable Fiber core gate census (SDK-UNIVERSAL-REACTIVE-RENDERING-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title and notes, the vendored charter lines and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:3", "D:2", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const constants = json({
        stem: STEM,
        distributions: DISTRIBUTIONS,
        crates: CRATES,
        abiNames: ABI_NAMES,
        genericAbi: GENERIC_ABI,
        wasmGlobal: WASM_GLOBAL,
        wasmToken: WASM_TOKEN,
        capabilitySet: CAPABILITY_SET,
        capabilityMembers: CAPABILITY_MEMBERS,
        coreNames: CORE_NAMES,
        embed: EMBED,
        spellings: SPELLINGS,
        launchers: LAUNCHERS,
        childProcess: CHILD_PROCESS,
        scanRoots: SCAN_ROOTS,
        textExtensions: TEXT_EXTENSIONS,
        floors: FLOORS,
        scriptKinds: Object.keys(SCRIPT_KINDS),
        requiredDescriptors: REQUIRED_DESCRIPTORS,
        sourceAnchors: SOURCE_ANCHORS,
        decisionAnchors: DECISION_ANCHORS,
        manifestControls: MANIFEST_CONTROLS,
        shadowedManifest: SHADOWED_MANIFEST,
        lockControls: LOCK_CONTROLS,
        pathControls: PATH_CONTROLS,
        abiControls: ABI_CONTROLS,
        setControls: SET_CONTROLS,
        sdkControls: SDK_CONTROLS,
        launchControls: LAUNCH_CONTROLS,
        decisionControls: DECISION_CONTROLS,
        pageControls: PAGE_CONTROLS,
        claimControls: CLAIM_CONTROLS,
        descriptorControls: DESCRIPTOR_CONTROLS,
        abiReceipt: ABI_RECEIPT,
        refusedForms: Object.keys(REFUSED_FORMS),
        composed: COMPOSED_MODULE,
        generic: GENERIC_MODULE,
        outsideTree: OUTSIDE_TREE,
        elsewhereRows: ELSEWHERE_ROWS,
        otherVocabulary: OTHER_VOCABULARY,
        indirectLaunch: INDIRECT_LAUNCH_MODULE,
        residuals: RESIDUALS,
    });
    expect(constants).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    for (const name of DISTRIBUTIONS) expect(fold(name), `${name} folds to hold the stem`).toContain(STEM);

    // The outside anchor: the bead's own title and owner-filing notes in the tracked export.
    const { title, notes } = beadText();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const judged = ROWS.filter(row => row.id !== "Q");
    expect(judged.map(row => row.label), "rows A to D are the bead's gating artifact, decision, until-then clause and claim clause, in order").toEqual(beadClauses(title, notes));
    const artifacts = titleArtifacts(judged[0]?.label ?? "");
    expect(artifacts, "the gating artifact names two conjuncts").toHaveLength(2);
    const named = witnessesOf("A").map(witness => witness.artifact);
    expect([...new Set(named)].sort(), "row A's pins judge exactly the title's two conjuncts").toEqual([...artifacts].sort());
    for (const word of [titleArtifactWord(title), ...notesSurfaces(notes)]) {
      expect(word.length, "a surface word of the bead was read").toBeGreaterThan(0);
      expect(witnessesOf("A").some(witness => typeof witness.surface === "string" && witness.surface.includes(word)), `a row A pin judges the bead's ${word} surface`).toBe(true);
    }
    const distribution = artifacts[0]?.split(" ")[0] ?? "";
    expect(distribution, "the title's distribution word is the producer's distribution").toBe(DISTRIBUTIONS[0]);
    expect(fold(distribution).replace(/sdk$/, ""), "the stem is the title's distribution word, its SDK suffix dropped").toBe(STEM);
    expect(artifacts[1], "the title's second conjunct is the capability set").toBe(CAPABILITY_SET);
    const capabilities = titleCapabilities(title);
    expect(capabilities, "the title's capability set and members").toStrictEqual({ set: CAPABILITY_SET, members: [...CAPABILITY_MEMBERS] });
    expect(
      witnessesOf("A").some(witness => witness.artifact === capabilities.set && JSON.stringify(witness.members) === JSON.stringify(capabilities.members)),
      "a row A pin judges the capability set by the title's four members",
    ).toBe(true);
    const decision = titleDecision(judged[1]?.label ?? "");
    expect(decision.verb, "the decision verb is the title's").toBe(EMBED);
    expect(decision.object.endsWith(CORE_NAMES[0]), "the decision's object ends in the first core name").toBe(true);
    expect(witnessesOf("B").some(witness => witness.bead === decision.bead), "a row B pin reads the title's decision bead").toBe(true);
    expect(notesOwners(notes), "the decision bead is an owner family of rf CLI envelope consumption the notes name").toContain(decision.bead);
    const evidence = notesEvidence(notes);
    expect(evidence.page.length, "the notes' cited page was read").toBeGreaterThan(0);
    expect(witnessesOf("B").some(witness => witness.page === evidence.page), "a row B pin reads the notes' cited page for a decision").toBe(true);
    expect(
      witnessesOf("C").some(witness => isObject(witness.cited) && witness.cited.page === evidence.page && witness.cited.line === evidence.line),
      "a row C pin reads the notes' cited line as Pi's stated RF surface",
    ).toBe(true);
    expect(evidence.spellings, "the census's spellings are the notes' wb-693 grep spellings").toStrictEqual([...SPELLINGS]);
    expect(
      witnessesOf("C").some(witness => JSON.stringify(witness.spellings) === JSON.stringify(evidence.spellings)),
      "a row C pin reads the notes' spellings",
    ).toBe(true);
    expect(judged[2]?.label, "the until-then clause names the rf CLI envelope").toContain("rf CLI envelope");
    expect(witnessesOf("C").some(witness => witness.schema === REACTIVE_FIBER_CLI_SCHEMA), "a row C pin reads the CLI envelope's schema").toBe(true);
    expect(REACTIVE_FIBER_CONTRACT_SOURCE.startsWith("rf@") && REACTIVE_FIBER_CONTRACT_SOURCE.includes(REACTIVE_FIBER_CLI_SCHEMA), "the carrier contract is the rf CLI's").toBe(true);
    expect(fold(judged[3]?.label ?? ""), "the claim clause names the decision verb").toContain(EMBED);
    expect(fold(judged[3]?.label ?? ""), "the claim clause names the first core name").toContain(fold(CORE_NAMES[0]));
    const unchanged = notesUnchanged(notes);
    expect(unchanged, "the notes name the two trees that stay unchanged").toHaveLength(2);
    expect(
      witnessesOf("D").some(witness => Array.isArray(witness.roots) && unchanged.every(root => (witness.roots as JsonValue[]).includes(root))),
      "a row D pin reads both trees the notes keep unchanged",
    ).toBe(true);

    // The vendored producer lines: the notes' program citation, its quotes and the census's vocabulary.
    const program = notesProgram(notes);
    const producer = ROSTER.producer;
    expect([producer.path, producer.pin], "the roster vendors the notes' cited charter at the notes' pin").toStrictEqual([program.path, program.pin]);
    for (const line of program.lines) expect(producer.lines.map(entry => entry.line), `the roster vendors the notes' cited line ${line}`).toContain(line);
    for (const entry of producer.lines) expect(sha256(entry.text), `the vendored line ${entry.line}'s SHA256`).toBe(entry.sha256);
    expect(program.authority.length, "the notes' Authority quote was read").toBeGreaterThan(0);
    expect(producerLine(15), "the notes' Authority quote is the vendored line 15's sentence").toContain(program.authority);
    const status = program.status.split(/\s+\S\s+/);
    expect(status, "the notes' status quote has two halves").toHaveLength(2);
    for (const half of status) expect(producerLine(3), `the vendored status line holds '${half}'`).toContain(half);
    expect(producerLine(19), "the vendored heading marks the interfaces unshipped").toContain("(unshipped)");
    for (const crate of CRATES) expect(producerLine(11), `the vendored line 11 names ${crate}`).toContain(crate);
    for (const name of [...ABI_NAMES, ...GENERIC_ABI]) expect(producerLine(21), `the vendored ABI line names ${name}`).toContain(name);
    for (const name of [CAPABILITY_SET, ...CAPABILITY_MEMBERS]) expect(producerLine(22), `the vendored capability line names ${name}`).toContain(name);
    for (const key of Object.keys(ABI_RECEIPT)) expect(producerLine(24), `the vendored receipt line names C2's ${key} field`).toContain(key.replaceAll("_", " "));
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
