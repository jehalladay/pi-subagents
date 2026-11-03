/**
 * wb-pyel.10 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1, program-triage-2026-10-18): the carrier child of wb-pyel.7, filed at its rule-19
 * structural exit (orchestrator ruling R-B265) and made its blocker by the dependency inversion (orchestrator ruling R-B308).
 * THE POSITIONS CENSUS of the Fiber host-publication readers, test/helpers/fiber-host-publication-readers.ts, whose code is
 * wb-pyel.7's cut #4 unchanged and which this cut lands first: for 12 of the helper's exported functions, the readings at every
 * planted list index, list nesting depth, raw-line column, segment index, offset inside a string, a key, a folded segment or a
 * judged text, letters before a family word in a name, raw-text offset and place of a family word inside an id, a permission or a
 * contract. wb-pyel.7's own census (its A1 and A3 claims, its roster and its live rows) is not on this tree; nothing here restates
 * it, and wb-pyel.7's re-cut composes this helper when it lands.
 *
 * THE PINNED READER SET (this file, test/workbench-fiber-host-publication-positions-census.test.ts; 15 cases, each passed on trunk
 * e23b18e with this cut):
 *  - "the frozen shape: ..." - ROWS' `${id}:${pins.length}` equals ["FOLDS:1", "A1:6", "A3S:3", "A3F:2"], and READ, EXPECTED and
 *    WITNESS each hold exactly one entry per pin. Falsifier: deleting a pin or a row (CT1, CT1b, CT4).
 *  - "the helper anchor: ..." - read from the helper's own source (its `// ---- <title> ----` section lines and the exported function
 *    declarations below each): every row's label is a section title, rows stand in section order, and each section's exported
 *    functions are exactly its row's pins (in the helper's order) plus its UNCLAIMED names. Falsifier: deleting, renaming or
 *    relabelling a pin or a row in this file (CT2, CT5, CT6), or a helper export this file does not account for.
 *  - one case per pin, titled by the pin under `${row.id} ${row.label}`: the reader's reading of its planted tables (READ) strictly
 *    equals the reading built here from the same tables without the helper (EXPECTED), and its sha256 prefix equals WITNESS.
 *    Falsifier: each one-edit narrowing named in that pin's clause below, and any swap of a pin's reading (CT3).
 *  - "the registered tests and the reached pins: ..." - the vitest task tree: every test of this file in run mode, not inverted and
 *    ran, titles unique and in order, and every pin reached its compare in row order. Falsifier: a skipped, todo, failing-inverted or
 *    missing case.
 *
 * THE CLAIMS, pin by pin (each clause is its pin's tables and nothing wider). The falsifiers named are the gate-authored hollowings
 * of the helper this bead carries - wb-pyel.7 refusal #3's 16 survivors, the nine GP18 members R-B308 folded and the three riders
 * (GP18-11, GP18-12, GP18-16) refusal #4's carrier reading order assigns here - and the gate controls L6-18 and L6-19; each reds
 * this census at the pin that names it:
 *  - needlesIn (row FOLDS): with the needle list [fiberoptics], FiberOpticsSDK==0.1.0 as the k-th of k space-separated segments for
 *    every k from 1 to SEGMENT_BOUND reads [fiberoptics], and so does it after k letters x inside one segment for every folded offset
 *    k from 0 to OFFSET_BOUND; FiberOptixSDK==0.1.0 at each of those places reads []. Falsifiers: GP18-05, GP18-06 (and L6-19).
 *  - textsOf (row A1): k letters x then FiberRuntime, for every k from 0 to OFFSET_BOUND, is read whole as a string at its path, and
 *    whole as an object's one key with its value at the key's path; a list of 1 to LIST_BOUND strings, FiberRuntime at each index and
 *    fillers elsewhere, is read item by item; FiberRuntime inside 1 to NEST_BOUND nested lists is read at its nested path.
 *    Falsifiers: GP18-03, GP18-04, L6-07, L6-08.
 *  - rawLines (row A1): a text of COLUMN_BOUND lines whose line c holds FiberOpticsSDK==0.1.0 after c - 1 spaces is read as those
 *    lines whole, each with its line number. Falsifier: GP18-10.
 *  - hitsIn (row A1): those lines, handed over as {line, text} entries with the needle list [fiberoptics] and the file
 *    requirements.txt, give one hit per line, `requirements.txt:<c>: fiberoptics`; the same lines holding FiberOptixSDK==0.1.0 give
 *    none. Falsifier: GP18-01.
 *  - manifestHits (row A1): a one-line raw package.json whose first dependencies key, shadowed for JSON.parse by a second, names
 *    fiber-optics after each RAW_OFFSETS padding (that many letters x in a description) gives the one raw-line hit
 *    `package.json:1: fiberoptics` and no parsed hit; the same text naming fiber-optix gives none. Falsifier: GP18-16.
 *  - lockReading (row A1): a lock of 1 to LIST_BOUND installed packages states its package count and, with the planted package at
 *    every index (fillers node_modules/p<i> elsewhere), that package's hits: node_modules/fiber-optics by its path, node_modules/alias
 *    by its name field FiberOpticsSDK, and node_modules/fiber-optics named FiberOpticsSDK by both (path, then name); a lock of
 *    fillers alone states none. Falsifiers: L6-09, L6-10.
 *  - manifestForm (row A1): each LISTED_NAMES name below near/ is manifest-name, and with its first letter or its last letter
 *    replaced by q is selected by no form; each PIP_WORDS word as a directory holding base.txt is pip-directory, and cut at every
 *    inner position by every SPLIT_SEPARATORS character, or with its first or last letter dropped, as that directory is selected by
 *    no form; each word after k letters x, for every k from 0 to NAME_BOUND, is pip-name as deps/<x^k><word>.txt and pip-directory
 *    as <x^k><word>/base.txt, and the word without its last letter there (deps/<x^k><word>.txt) is selected by no form.
 *    Falsifiers: L6-01, L6-02, L6-05, L6-06, GP18-11, GP18-12.
 *  - judgedText (row A3S): the string literal of k spaces then register, an exported const's initializer in one parsed .ts module,
 *    is judged whole for every k from 0 to OFFSET_BOUND. Falsifier: GP18-09.
 *  - registrationWordsIn (row A3S): register as the k-th segment of k - 1 words w1, w2, ... then register, for every k from 1 to
 *    SEGMENT_BOUND, reads [register]; registered there reads []. Falsifier: GP18-08.
 *  - registrationTexts (row A3S): the raw module src/workbench/providers/NOTES.md gives `<module>:<line>: register` for each of
 *    COLUMN_BOUND lines whose line c holds register after c - 1 spaces, and for each of SEGMENT_BOUND lines whose line k holds it as
 *    the k-th segment; the script module src/workbench/providers/note.ts gives `<module>#<const>:register@VariableDeclaration` for
 *    each exported const whose string initializer holds register after k spaces (k from 0 to OFFSET_BOUND) or as its k-th segment
 *    (k from 1 to SEGMENT_BOUND); registered at those columns and offsets gives none. Falsifiers: GP18-07, GP18-08, GP18-09, GP18-10.
 *  - familyCriteria (row A3F): a descriptor whose id, one permission or contract holds one spelling at one place (the other two
 *    fields neutral) meets that field's criterion alone for each FOLD_FORMS spelling, and no criterion for each FOLD_QUIET and
 *    DIGIT_SPLITS spelling, at every ID_PLACES, PERMISSION_PLACES and CONTRACT_PLACES place (a word after an id's last dot, in a
 *    dotless id, after a permission's last colon, in a colon-less permission, in a contract's package, scope or version, and
 *    OFFSET_BOUND letters into each field among them); fiber:publish at every index of a list of 1 to LIST_BOUND permissions
 *    (fillers value:p<i>) meets the permission criterion; fiber split across two permissions at every inner position
 *    (SPLIT_PERMISSIONS: value:f and iber:read, ...) meets none. Falsifiers: L6-13, L6-14, L6-15 (the places), L6-12 (the list),
 *    L6-21 (DIGIT_SPLITS), L6-18 (SPLIT_PERMISSIONS).
 *  - registryReading (row A3F): each planted registry's family is stated as `<id>:<criteria joined by +>`, in registration order:
 *    n members fiber.m1.read, fiber.m2.read, ... then the non-member value.host.read, for every n from 1 to LIST_BOUND; three
 *    members meeting 1, 2 and 3 criteria in each of the six orders; three members stating 0, 1 and 2 publishing reasons in each of
 *    the six orders; the injected registration of the four live providers (forge, hyperunix, furnace and rf, each by its own src
 *    register function) states reactivefiber.render.preview alone, meeting id+permission+contract+rf-contract; with the live
 *    forge.gate.status descriptor given the permission gate:fiber (beside its forge:inspect) or the contract
 *    @fiber-forge/sdk@0.1.0:GateFacade.status, it states forge.gate.status first with the permission, or the contract, criterion
 *    (the forge.ts injected forms, src/workbench/providers/forge.ts :33 and :35). Falsifiers: L6-16, L6-16b, L6-17, and L6-13 and
 *    L6-15 at the two forge witnesses.
 *
 * NOT CLAIMED (scope sentences; no residual, no follow-up): every UNCLAIMED function of the helper and every helper constant; for a
 * pinned reader, every input outside its tables - a list longer than LIST_BOUND or nested deeper than NEST_BOUND, more lines than
 * its plant or a column past COLUMN_BOUND, a segment past SEGMENT_BOUND, an offset past OFFSET_BOUND, a raw-text offset that is
 * no RAW_OFFSETS entry, more than NAME_BOUND letters before a word, a spelling in none of the three spelling tables, a place in
 * none of the three place tables, a near miss other than the planted substitutions, cuts and trims, a needle other than the
 * planted ones, and a registry other than the planted ones - and every reading field no clause names (registryReading's hosting
 * needles, carrier, effect class, permissions, description and publishing reasons among them). Of registrationTexts, only the raw
 * lines and the exported consts' string initializers above are claimed: its entries for declared names (a REGISTER_NAME name a
 * declaration or a specifier property spells) and its judged texts at any other syntactic position are NOT CLAIMED, and so is
 * every needle reading of descriptorReading (UNCLAIMED). The live tree's readings (wb-pyel.7's LIVE rows) are NOT CLAIMED. This
 * census names no residual: every member the bead carries is pinned above.
 *
 * FROZEN SHAPE (standing rule 16): the literal above. THE ANCHOR outside this file's literals is the helper's own source: its
 * section titles and its exported function declarations, read by the TypeScript parser at run time.
 *
 * Display paths added: none. Test-only: nothing is written, spawned or invoked; every reader reads what it is handed, the
 * registries hold providers that throw if invoked, and the helper's source is only read.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  familyCriteria,
  hitsIn,
  judgedText,
  lockReading,
  manifestForm,
  manifestHits,
  needlesIn,
  rawLines,
  registrationTexts,
  registrationWordsIn,
  registryReading,
  textsOf,
} from "./helpers/fiber-host-publication-readers.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const HELPER_PATH = join(HERE, "helpers", "fiber-host-publication-readers.ts");
const PREVIEW_ID = "reactivefiber.render.preview";

// ---- the bounds: every quantifier of the claims ranges over one of these, and NOT CLAIMED names what lies past them ----

/** The longest planted list: every list plant holds 1 to LIST_BOUND items, the planted item at every index. */
const LIST_BOUND = 8;
/** The deepest planted list nesting: the item inside 1 to NEST_BOUND lists. */
const NEST_BOUND = 4;
/** The last planted column of a raw line (from 1): line c of a column plant holds its word after c - 1 spaces. */
const COLUMN_BOUND = 512;
/** The last planted segment index (from 1): text k of a segment plant holds its word after k - 1 words. */
const SEGMENT_BOUND = 128;
/** The last planted offset (from 0) inside one string, key, folded segment or judged text, and how far into a field a far place sits. */
const OFFSET_BOUND = 256;
/** The most planted letters before a family word in a base name or a directory segment (from 0). */
const NAME_BOUND = 128;
/** The planted padding of a raw package.json's shadowed key: 0 to RAW_BOUND letters, in steps of RAW_STEP. */
const RAW_STEP = 256;
const RAW_BOUND = 8192;

/** The integers from `first` to `last`. */
function upTo(first: number, last: number): number[] {
  return Array.from({ length: last - first + 1 }, (_, index) => first + index);
}
/** `count` filler words w1, w2, ... then the word, space-separated: the word is segment count + 1. */
function afterWords(count: number, word: string): string {
  return [...Array.from({ length: count }, (_, index) => `w${index + 1}`), word].join(" ");
}
/** A list of `length` items: the item at `index`, a filler elsewhere. */
function listWith<T>(length: number, index: number, item: T, filler: (at: number) => T): T[] {
  return Array.from({ length }, (_, at) => (at === index ? item : filler(at)));
}
/** Every (length, index) a list plant takes: each length from 1 to LIST_BOUND, each index of it. */
const LIST_SLOTS: readonly { readonly length: number; readonly index: number }[] = upTo(1, LIST_BOUND).flatMap(length => upTo(0, length - 1).map(index => ({ length, index })));
const RAW_OFFSETS: readonly number[] = upTo(0, RAW_BOUND / RAW_STEP).map(step => step * RAW_STEP);

// ---- the planted words ----

/** The stem's planted spelling and the needle it folds to; the quiet twin folds to no needle. */
const STEM_TEXT = "FiberOpticsSDK==0.1.0";
const QUIET_STEM_TEXT = "FiberOptixSDK==0.1.0";
const STEM_NEEDLE = "fiberoptics";
const HOSTED_TEXT = "FiberRuntime";
const REGISTER_WORD = "register";
const QUIET_REGISTER_WORD = "registered";
/** The manifest names manifest-name selects (the helper's MANIFEST_NAMES, spelled here so a dropped entry reds its control). */
const LISTED_NAMES = [
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
/** The pip family words pip-name and pip-directory select (the helper's PIP_FAMILY_WORDS, spelled here). */
const PIP_WORDS = ["requirements", "constraints", "pylock"] as const;
/** The characters a cut family word is planted with, at every inner position. */
const SPLIT_SEPARATORS = ["-", "_", ".", " "] as const;
/** A name with its first letter, then its last letter, replaced by q (no listed name starts or ends with q). */
function substituted(name: string): string[] {
  return [`q${name.slice(1)}`, `${name.slice(0, -1)}q`];
}
/** A word cut at every inner position by a separator. */
function cutsOf(word: string, separator: string): string[] {
  return upTo(1, word.length - 1).map(at => `${word.slice(0, at)}${separator}${word.slice(at)}`);
}
/** A word with its first letter dropped, then with its last letter dropped. */
function trimmed(word: string): string[] {
  return [word.slice(1), word.slice(0, -1)];
}
/** The spellings of the family word whose fold holds it. */
const FOLD_FORMS: Readonly<Record<string, string>> = {
  lower: "fiber",
  upper: "FIBER",
  capital: "Fiber",
  mixed: "fIbEr",
  hyphen: "fi-ber",
  underscore: "fi_ber",
  dot: "fi.ber",
  space: "fi ber",
  spelled: "f-i-b-e-r",
  colon: "fi:ber",
  slash: "fi/ber",
  fullwidth: String.fromCodePoint(0xff46, 0xff49, 0xff42, 0xff45, 0xff52),
  ligature: `${String.fromCodePoint(0xfb01)}ber`,
};
/** Near spellings whose fold does not hold it (an accented letter, a combining mark and a Cyrillic letter are dropped, not folded to ASCII). */
const FOLD_QUIET: Readonly<Record<string, string>> = {
  fibre: "fibre",
  fibe: "fibe",
  digit: "f1ber",
  accented: `f${String.fromCodePoint(0xed)}ber`,
  combining: `fi${String.fromCodePoint(0x301)}ber`,
  cyrillic: `fib${String.fromCodePoint(0x435)}r`,
};
/** The family word with a digit inside it: the fold keeps the digit, so no fold holds the word. */
const DIGIT_SPLITS: Readonly<Record<string, string>> = {
  "digit-after-1": "f2iber",
  "digit-after-2": "fi2ber",
  "digit-after-3": "fib2er",
  "digit-after-4": "fibe2r",
};
/** The places a spelling takes inside each field, {W} standing for it (no place joins a quiet spelling's fold into the word). */
const PLACEHOLDER = "{W}";
const FIELD_PLACES: Readonly<Record<"id" | "permission" | "contract", Readonly<Record<string, string>>>> = {
  id: {
    head: "{W}.value.host",
    middle: "value.{W}.host",
    "after the last dot": "value.host.{W}",
    dotless: "{W}",
    "inside a segment": "value{W}.host",
    "sixth segment": "a.b.c.d.e.{W}",
    far: `${"x".repeat(OFFSET_BOUND)}.{W}`,
  },
  permission: {
    head: "{W}:publish",
    "after the last colon": "value:{W}",
    "colon-less": "{W}",
    "middle part": "a:{W}:b",
    "third part": "a:b:{W}",
    "inside a part": "value{W}:publish",
    far: `${"x".repeat(OFFSET_BOUND)}:{W}`,
  },
  contract: {
    "after the export": "value-host@1.0.0:Host.read {W}-publish",
    package: "{W}-host@1.0.0:Host.read",
    scope: "@{W}-forge/sdk@0.1.0:GateFacade.status",
    version: "value-host@1.0.0-{W}:Host.read",
    export: "value-host@1.0.0:{W}.status",
    "colon-less": "{W}",
    "after a flag": "value-host@1.0.0:Host.read --{W}",
    far: `value-host@1.0.0:Host.read ${"x".repeat(OFFSET_BOUND)}{W}`,
  },
};
const FIELDS = ["id", "permission", "contract"] as const;
/** The family word split across two permissions at every inner position: neither permission's fold holds it. */
const SPLIT_PERMISSIONS: readonly (readonly [string, string])[] = upTo(1, "fiber".length - 1).map(at => [`value:${"fiber".slice(0, at)}`, `${"fiber".slice(at)}:read`]);
/** The neutral value of each field, beside the field a plant holds its spelling in. */
const NEUTRAL = { id: "value.host", permission: "value:read", contract: "value-host@1.0.0:Host.read" } as const;
/** Every planted spelling, by table, and whether its fold holds the word. */
const SPELLING_TABLES: readonly { readonly table: string; readonly spellings: Readonly<Record<string, string>>; readonly held: boolean }[] = [
  { table: "FOLD_FORMS", spellings: FOLD_FORMS, held: true },
  { table: "FOLD_QUIET", spellings: FOLD_QUIET, held: false },
  { table: "DIGIT_SPLITS", spellings: DIGIT_SPLITS, held: false },
];

// ---- the planted descriptors and registries ----

const NEVER = (): never => {
  throw new Error("census: a planted or injected capability is never invoked here");
};
/** A planted descriptor with every field a registry accepts, neutral where not given. */
function plantedDescriptor(fields: Partial<CapabilityDescriptor> & Pick<CapabilityDescriptor, "id">): CapabilityDescriptor {
  return { version: "1.0.0", description: "planted", inputSchema: { type: "object" }, effectClass: "read", permissions: [NEUTRAL.permission], supportedModes: ["invoke"], contractSource: NEUTRAL.contract, ...fields };
}
/** A descriptor holding a text in one field, the other two neutral. */
function fieldPlant(field: (typeof FIELDS)[number], text: string): CapabilityDescriptor {
  return plantedDescriptor({ id: field === "id" ? text : NEUTRAL.id, permissions: [field === "permission" ? text : NEUTRAL.permission], contractSource: field === "contract" ? text : NEUTRAL.contract });
}
function registryOf(descriptors: readonly CapabilityDescriptor[]): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  for (const descriptor of descriptors) registry.register({ descriptor, invoke: async () => NEVER() });
  return registry;
}
/** Three members meeting 1, 2 and 3 criteria; none states a publishing reason. */
const CRITERIA_MEMBERS: Readonly<Record<string, { readonly descriptor: CapabilityDescriptor; readonly row: string }>> = {
  one: { descriptor: plantedDescriptor({ id: "fiber.one.read", contractSource: "value-host@1.0.0:Host.read --no-commit" }), row: "fiber.one.read:id" },
  two: { descriptor: plantedDescriptor({ id: "fiber.two.read", permissions: ["fiber:read"], contractSource: "value-host@1.0.0:Host.read --no-commit" }), row: "fiber.two.read:id+permission" },
  three: {
    descriptor: plantedDescriptor({ id: "fiber.three.read", permissions: ["fiber:read"], contractSource: "fiber-host@1.0.0:Host.read --no-commit" }),
    row: "fiber.three.read:id+permission+contract",
  },
};
/** Three members stating 0, 1 and 2 publishing reasons; each meets the id criterion alone. */
const REASON_MEMBERS: Readonly<Record<string, { readonly descriptor: CapabilityDescriptor; readonly row: string }>> = {
  none: { descriptor: plantedDescriptor({ id: "fiber.zero.read", contractSource: "value-host@1.0.0:Host.read --no-commit" }), row: "fiber.zero.read:id" },
  one: { descriptor: plantedDescriptor({ id: "fiber.uno.read", effectClass: "write", contractSource: "value-host@1.0.0:Host.read --no-commit" }), row: "fiber.uno.read:id" },
  two: {
    descriptor: plantedDescriptor({ id: "fiber.duo.read", effectClass: "write", supportedModes: ["invoke", "observe"], contractSource: "value-host@1.0.0:Host.read --no-commit" }),
    row: "fiber.duo.read:id",
  },
};
/** Every order of three keys. */
function ordersOf(keys: readonly [string, string, string]): string[][] {
  const [a, b, c] = keys;
  return [
    [a, b, c],
    [a, c, b],
    [b, a, c],
    [b, c, a],
    [c, a, b],
    [c, b, a],
  ];
}
const NON_MEMBER = plantedDescriptor({ id: "value.host.read" });
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
type RfInvoke = Parameters<typeof registerReactiveFiberRender>[1];
const RF_INVOKE: RfInvoke = async () => NEVER();
const FORGE_SDK_VERSION = "0.1.0";
/** The live forge.gate.status descriptor, as src/workbench/providers/forge.ts registers it. */
function liveForgeDescriptor(): CapabilityDescriptor {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, FORGE_SDK_VERSION);
  const entry = registry.catalogSnapshot()[0];
  if (entry === undefined) throw new Error("registerForgeGateStatus registered nothing");
  return entry.descriptor;
}
/** The four live providers' injected registration, forge first; a given descriptor stands in for forge's. */
function injectedRegistry(forge?: CapabilityDescriptor): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  if (forge === undefined) registerForgeGateStatus(registry, FORGE_CLIENT, FORGE_SDK_VERSION);
  else registry.register({ descriptor: forge, invoke: async () => NEVER() });
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function isRecord(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** A registry reading's family, `<id>:<criteria joined by +>` per member, in the order the reading states them. */
function familyRows(reading: JsonValue): string[] {
  if (!isRecord(reading) || !Array.isArray(reading.family)) throw new Error("registryReading states no family list");
  return reading.family.map((member: unknown, index: number) => {
    if (!isRecord(member) || typeof member.id !== "string" || !Array.isArray(member.criteria)) throw new Error(`family[${index}] needs an id and a criteria list`);
    return `${member.id}:${member.criteria.map(String).join("+")}`;
  });
}

// ---- the planted texts ----

const COLUMN_LINES = upTo(1, COLUMN_BOUND).map(column => `${" ".repeat(column - 1)}${STEM_TEXT}`);
const QUIET_COLUMN_LINES = upTo(1, COLUMN_BOUND).map(column => `${" ".repeat(column - 1)}${QUIET_STEM_TEXT}`);
/** {line, text} entries for lines, numbered from 1. */
function numbered(lines: readonly string[]): { line: number; text: string }[] {
  return lines.map((text, index) => ({ line: index + 1, text }));
}
/** A one-line raw package.json whose first dependencies key (shadowed for JSON.parse by the second) names a dependency after padding letters. */
function shadowedManifest(padding: number, dependency: string): string {
  return `{ "description": "${"x".repeat(padding)}", "dependencies": { "${dependency}": "1.0.0" }, "dependencies": {} }`;
}
/** An item inside `depth` nested lists. */
function nestedList(depth: number, item: string): unknown {
  return depth === 0 ? item : [nestedList(depth - 1, item)];
}
const LOCK_PLANTS: Readonly<Record<string, { readonly path: string; readonly entry: JsonValue; readonly hits: readonly string[] }>> = {
  path: { path: "node_modules/fiber-optics", entry: { version: "0.1.0" }, hits: ["node_modules/fiber-optics: fiberoptics"] },
  name: { path: "node_modules/alias", entry: { name: "FiberOpticsSDK", version: "0.1.0" }, hits: ["node_modules/alias name: fiberoptics"] },
  both: { path: "node_modules/fiber-optics", entry: { name: "FiberOpticsSDK", version: "0.1.0" }, hits: ["node_modules/fiber-optics: fiberoptics", "node_modules/fiber-optics name: fiberoptics"] },
};
function lockOf(length: number, index: number, plant: { readonly path: string; readonly entry: JsonValue } | undefined): { packages: { [path: string]: JsonValue } } {
  const filler = (at: number): [string, JsonValue] => [`node_modules/p${at}`, { version: "1.0.0" }];
  return { packages: Object.fromEntries(listWith<[string, JsonValue]>(length, plant === undefined ? -1 : index, plant === undefined ? filler(index) : [plant.path, plant.entry], filler)) };
}
const RAW_MODULE = "src/workbench/providers/NOTES.md";
const SCRIPT_MODULE = "src/workbench/providers/note.ts";
/** One exported const per text: `export const <prefix>_<key> = "<text>";`. */
function constModule(prefix: string, texts: readonly { readonly key: number; readonly text: string }[]): string {
  return `${texts.map(({ key, text }) => `export const ${prefix}_${key} = ${JSON.stringify(text)};`).join("\n")}\n`;
}
const SPACED_REGISTER = upTo(0, OFFSET_BOUND).map(key => ({ key, text: `${" ".repeat(key)}${REGISTER_WORD}` }));
const WORDED_REGISTER = upTo(1, SEGMENT_BOUND).map(key => ({ key, text: afterWords(key - 1, REGISTER_WORD) }));
const SPACED_QUIET = upTo(0, OFFSET_BOUND).map(key => ({ key, text: `${" ".repeat(key)}${QUIET_REGISTER_WORD}` }));
/** A parsed module's string literals, in source order. */
function stringLiteralsOf(text: string, module: string): ts.StringLiteral[] {
  const file = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: ts.StringLiteral[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

// ---- the rows and the pins ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows: one per helper section holding a pinned reader, labelled by the section's title, one pin per pinned reader. */
const ROWS: readonly Row[] = [
  { id: "FOLDS", label: "the folds", pins: ["needlesIn"] },
  { id: "A1", label: "A1: the manifest readers", pins: ["textsOf", "rawLines", "hitsIn", "manifestHits", "lockReading", "manifestForm"] },
  { id: "A3S", label: "A3: the static registration reading", pins: ["judgedText", "registrationWordsIn", "registrationTexts"] },
  { id: "A3F", label: "A3: the Fiber family, the carrier and a registry's reading", pins: ["familyCriteria", "registryReading"] },
];
/** The helper's exported functions this census reads at no planted position, by the section exporting them: NOT CLAIMED. */
const UNCLAIMED: Readonly<Record<string, readonly string[]>> = {
  "the vocabulary": ["kindName"],
  "the folds": ["fold", "segmentFolds", "isObject", "json"],
  "A1: the manifest readers": ["textHits", "holdsPipWord", "isManifest", "readManifests"],
  "A3: the static registration reading": ["extensionOf", "isScript", "parse", "registrationSites"],
  "A3: the Fiber family, the carrier and a registry's reading": ["inFiberFamily", "isCarrier", "publishingReasons", "descriptorReading", "descriptorsOf"],
};

/** Each pin's reading: the reader over its planted tables. */
const READ: Readonly<Record<string, () => unknown>> = {
  needlesIn: () => ({
    segments: upTo(1, SEGMENT_BOUND).map(k => needlesIn(afterWords(k - 1, STEM_TEXT), [STEM_NEEDLE])),
    offsets: upTo(0, OFFSET_BOUND).map(k => needlesIn(`${"x".repeat(k)}${STEM_TEXT}`, [STEM_NEEDLE])),
    quietSegments: upTo(1, SEGMENT_BOUND).map(k => needlesIn(afterWords(k - 1, QUIET_STEM_TEXT), [STEM_NEEDLE])),
    quietOffsets: upTo(0, OFFSET_BOUND).map(k => needlesIn(`${"x".repeat(k)}${QUIET_STEM_TEXT}`, [STEM_NEEDLE])),
  }),
  textsOf: () => ({
    strings: upTo(0, OFFSET_BOUND).map(k => textsOf(`${"x".repeat(k)}${HOSTED_TEXT}`, "s")),
    keys: upTo(0, OFFSET_BOUND).map(k => textsOf({ [`${"x".repeat(k)}${HOSTED_TEXT}`]: "v" }, "k")),
    items: LIST_SLOTS.map(({ length, index }) => textsOf(listWith(length, index, HOSTED_TEXT, at => `i${at}`), "l")),
    nested: upTo(1, NEST_BOUND).map(depth => textsOf(nestedList(depth, HOSTED_TEXT), "n")),
  }),
  rawLines: () => rawLines(COLUMN_LINES.join("\n")),
  hitsIn: () => ({
    read: hitsIn(numbered(COLUMN_LINES), "requirements.txt", [STEM_NEEDLE]),
    quiet: hitsIn(numbered(QUIET_COLUMN_LINES), "requirements.txt", [STEM_NEEDLE]),
  }),
  manifestHits: () => ({
    read: RAW_OFFSETS.map(padding => {
      const raw = shadowedManifest(padding, "fiber-optics");
      return manifestHits(JSON.parse(raw), raw, "package.json");
    }),
    quiet: RAW_OFFSETS.map(padding => {
      const raw = shadowedManifest(padding, "fiber-optix");
      return manifestHits(JSON.parse(raw), raw, "package.json");
    }),
  }),
  lockReading: () => ({
    ...Object.fromEntries(Object.entries(LOCK_PLANTS).map(([kind, plant]) => [kind, LIST_SLOTS.map(({ length, index }) => lockReading(lockOf(length, index, plant)))])),
    fillers: upTo(1, LIST_BOUND).map(length => lockReading(lockOf(length, 0, undefined))),
  }),
  manifestForm: () => {
    const form = (path: string): string => manifestForm(path) ?? "none";
    return {
      listed: LISTED_NAMES.map(name => form(`near/${name}`)),
      substituted: LISTED_NAMES.flatMap(name => substituted(name).map(near => form(`near/${near}`))),
      words: PIP_WORDS.map(word => form(`${word}/base.txt`)),
      cut: PIP_WORDS.flatMap(word => SPLIT_SEPARATORS.flatMap(separator => cutsOf(word, separator).map(cut => form(`${cut}/base.txt`)))),
      trimmed: PIP_WORDS.flatMap(word => trimmed(word).map(trim => form(`${trim}/base.txt`))),
      longNames: PIP_WORDS.flatMap(word => upTo(0, NAME_BOUND).map(k => form(`deps/${"x".repeat(k)}${word}.txt`))),
      longDirectories: PIP_WORDS.flatMap(word => upTo(0, NAME_BOUND).map(k => form(`${"x".repeat(k)}${word}/base.txt`))),
      longQuiet: PIP_WORDS.flatMap(word => upTo(0, NAME_BOUND).map(k => form(`deps/${"x".repeat(k)}${word.slice(0, -1)}.txt`))),
    };
  },
  judgedText: () => stringLiteralsOf(constModule("TEXT", SPACED_REGISTER), SCRIPT_MODULE).map(literal => judgedText(literal) ?? null),
  registrationWordsIn: () => ({
    read: upTo(1, SEGMENT_BOUND).map(k => registrationWordsIn(afterWords(k - 1, REGISTER_WORD))),
    quiet: upTo(1, SEGMENT_BOUND).map(k => registrationWordsIn(afterWords(k - 1, QUIET_REGISTER_WORD))),
  }),
  registrationTexts: () => ({
    rawColumns: registrationTexts(upTo(1, COLUMN_BOUND).map(column => `${" ".repeat(column - 1)}${REGISTER_WORD}`).join("\n"), RAW_MODULE),
    rawSegments: registrationTexts(WORDED_REGISTER.map(({ text }) => text).join("\n"), RAW_MODULE),
    rawQuiet: registrationTexts(upTo(1, COLUMN_BOUND).map(column => `${" ".repeat(column - 1)}${QUIET_REGISTER_WORD}`).join("\n"), RAW_MODULE),
    scriptOffsets: registrationTexts(constModule("NOTE", SPACED_REGISTER), SCRIPT_MODULE),
    scriptSegments: registrationTexts(constModule("WORDS", WORDED_REGISTER), SCRIPT_MODULE),
    scriptQuiet: registrationTexts(constModule("QUIET", SPACED_QUIET), SCRIPT_MODULE),
  }),
  familyCriteria: () => ({
    places: Object.fromEntries(
      FIELDS.flatMap(field =>
        Object.entries(FIELD_PLACES[field]).flatMap(([place, form]) =>
          SPELLING_TABLES.flatMap(({ table, spellings }) => Object.entries(spellings).map(([name, spelling]) => [`${field} | ${place} | ${table} ${name}`, familyCriteria(fieldPlant(field, form.split(PLACEHOLDER).join(spelling)))])),
        ),
      ),
    ),
    permissionList: LIST_SLOTS.map(({ length, index }) => familyCriteria(plantedDescriptor({ id: NEUTRAL.id, permissions: listWith(length, index, "fiber:publish", at => `value:p${at}`) }))),
    splitPermissions: SPLIT_PERMISSIONS.map(permissions => familyCriteria(plantedDescriptor({ id: NEUTRAL.id, permissions: [...permissions] }))),
  }),
  registryReading: () => {
    const live = liveForgeDescriptor();
    const permissionWitness: CapabilityDescriptor = { ...live, permissions: [...live.permissions, "gate:fiber"] };
    const contractWitness: CapabilityDescriptor = { ...live, contractSource: (live.contractSource ?? "").replace("@forge/sdk@", "@fiber-forge/sdk@") };
    return {
      sizes: upTo(1, LIST_BOUND).map(size => familyRows(registryReading(registryOf([...upTo(1, size).map(at => plantedDescriptor({ id: `fiber.m${at}.read` })), NON_MEMBER])))),
      criteriaOrders: ordersOf(["one", "two", "three"]).map(order => familyRows(registryReading(registryOf(order.map(key => CRITERIA_MEMBERS[key]?.descriptor ?? NON_MEMBER))))),
      reasonOrders: ordersOf(["none", "one", "two"]).map(order => familyRows(registryReading(registryOf(order.map(key => REASON_MEMBERS[key]?.descriptor ?? NON_MEMBER))))),
      injected: familyRows(registryReading(injectedRegistry())),
      permissionWitness: { permissions: [...permissionWitness.permissions], family: familyRows(registryReading(injectedRegistry(permissionWitness))) },
      contractWitness: { contract: contractWitness.contractSource ?? null, family: familyRows(registryReading(injectedRegistry(contractWitness))) },
    };
  },
};

/** Each pin's expected reading, built from the same tables without the helper. */
const EXPECTED: Readonly<Record<string, () => unknown>> = {
  needlesIn: () => ({
    segments: upTo(1, SEGMENT_BOUND).map(() => [STEM_NEEDLE]),
    offsets: upTo(0, OFFSET_BOUND).map(() => [STEM_NEEDLE]),
    quietSegments: upTo(1, SEGMENT_BOUND).map(() => []),
    quietOffsets: upTo(0, OFFSET_BOUND).map(() => []),
  }),
  textsOf: () => ({
    strings: upTo(0, OFFSET_BOUND).map(k => [{ path: "s", text: `${"x".repeat(k)}${HOSTED_TEXT}` }]),
    keys: upTo(0, OFFSET_BOUND).map(k => {
      const key = `${"x".repeat(k)}${HOSTED_TEXT}`;
      return [
        { path: `k{${key}}`, text: key },
        { path: `k.${key}`, text: "v" },
      ];
    }),
    items: LIST_SLOTS.map(({ length, index }) => listWith(length, index, HOSTED_TEXT, at => `i${at}`).map((text, at) => ({ path: `l[${at}]`, text }))),
    nested: upTo(1, NEST_BOUND).map(depth => [{ path: `n${"[0]".repeat(depth)}`, text: HOSTED_TEXT }]),
  }),
  rawLines: () => numbered(COLUMN_LINES),
  hitsIn: () => ({ read: upTo(1, COLUMN_BOUND).map(line => `requirements.txt:${line}: ${STEM_NEEDLE}`), quiet: [] }),
  manifestHits: () => ({ read: RAW_OFFSETS.map(() => [`package.json:1: ${STEM_NEEDLE}`]), quiet: RAW_OFFSETS.map(() => []) }),
  lockReading: () => ({
    ...Object.fromEntries(Object.entries(LOCK_PLANTS).map(([kind, plant]) => [kind, LIST_SLOTS.map(({ length }) => ({ packages: length, hits: [...plant.hits] }))])),
    fillers: upTo(1, LIST_BOUND).map(length => ({ packages: length, hits: [] })),
  }),
  manifestForm: () => ({
    listed: LISTED_NAMES.map(() => "manifest-name"),
    substituted: LISTED_NAMES.flatMap(() => ["none", "none"]),
    words: PIP_WORDS.map(() => "pip-directory"),
    cut: PIP_WORDS.flatMap(word => SPLIT_SEPARATORS.flatMap(() => upTo(1, word.length - 1).map(() => "none"))),
    trimmed: PIP_WORDS.flatMap(() => ["none", "none"]),
    longNames: PIP_WORDS.flatMap(() => upTo(0, NAME_BOUND).map(() => "pip-name")),
    longDirectories: PIP_WORDS.flatMap(() => upTo(0, NAME_BOUND).map(() => "pip-directory")),
    longQuiet: PIP_WORDS.flatMap(() => upTo(0, NAME_BOUND).map(() => "none")),
  }),
  judgedText: () => SPACED_REGISTER.map(({ text }) => text),
  registrationWordsIn: () => ({ read: upTo(1, SEGMENT_BOUND).map(() => [REGISTER_WORD]), quiet: upTo(1, SEGMENT_BOUND).map(() => []) }),
  registrationTexts: () => ({
    rawColumns: upTo(1, COLUMN_BOUND).map(line => `${RAW_MODULE}:${line}: ${REGISTER_WORD}`),
    rawSegments: WORDED_REGISTER.map(({ key }) => `${RAW_MODULE}:${key}: ${REGISTER_WORD}`),
    rawQuiet: [],
    scriptOffsets: SPACED_REGISTER.map(({ key }) => `${SCRIPT_MODULE}#NOTE_${key}:${REGISTER_WORD}@VariableDeclaration`),
    scriptSegments: WORDED_REGISTER.map(({ key }) => `${SCRIPT_MODULE}#WORDS_${key}:${REGISTER_WORD}@VariableDeclaration`),
    scriptQuiet: [],
  }),
  familyCriteria: () => ({
    places: Object.fromEntries(
      FIELDS.flatMap(field =>
        Object.keys(FIELD_PLACES[field]).flatMap(place =>
          SPELLING_TABLES.flatMap(({ table, spellings, held }) => Object.keys(spellings).map(name => [`${field} | ${place} | ${table} ${name}`, held ? [field] : []])),
        ),
      ),
    ),
    permissionList: LIST_SLOTS.map(() => ["permission"]),
    splitPermissions: SPLIT_PERMISSIONS.map(() => []),
  }),
  registryReading: () => ({
    sizes: upTo(1, LIST_BOUND).map(size => upTo(1, size).map(at => `fiber.m${at}.read:id`)),
    criteriaOrders: ordersOf(["one", "two", "three"]).map(order => order.map(key => CRITERIA_MEMBERS[key]?.row ?? "")),
    reasonOrders: ordersOf(["none", "one", "two"]).map(order => order.map(key => REASON_MEMBERS[key]?.row ?? "")),
    injected: [`${PREVIEW_ID}:id+permission+contract+rf-contract`],
    permissionWitness: { permissions: ["forge:inspect", "gate:fiber"], family: ["forge.gate.status:permission", `${PREVIEW_ID}:id+permission+contract+rf-contract`] },
    contractWitness: { contract: "@fiber-forge/sdk@0.1.0:GateFacade.status", family: ["forge.gate.status:contract", `${PREVIEW_ID}:id+permission+contract+rf-contract`] },
  }),
};

/** Each pin's witness: the first 16 hex digits of the sha256 of its reading's JSON. */
const WITNESS: Readonly<Record<string, string>> = {
  needlesIn: "867e0196642182ad",
  textsOf: "ba9fcd996c6073c7",
  rawLines: "25c67a248568b534",
  hitsIn: "c3791546d36b2837",
  manifestHits: "ef7b12c77345130e",
  lockReading: "93672574e67d41b8",
  manifestForm: "79009a0ff56e7836",
  judgedText: "0832749c3e3cf383",
  registrationWordsIn: "9d7a0b98344397d7",
  registrationTexts: "99f58120245aced4",
  familyCriteria: "5c80feb479ae3a66",
  registryReading: "a259a4f01833163e",
};

/** A value as its JSON reads it back (undefined fields dropped). */
function plain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value)) as unknown;
}
function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

// ---- the anchor: the helper's own source ----

interface Section {
  readonly title: string;
  readonly functions: string[];
}
/** The helper's sections (its `// ---- <title> ----` lines, in order) and the functions each exports, in source order. */
function helperSections(): Section[] {
  const text = readFileSync(HELPER_PATH, "utf8");
  const marks = [...text.matchAll(/^\/\/ ---- (.+) ----$/gm)].map(match => ({ title: match[1] ?? "", at: match.index ?? 0 }));
  const sections: Section[] = marks.map(mark => ({ title: mark.title, functions: [] }));
  const file = ts.createSourceFile(HELPER_PATH, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of file.statements) {
    if (!ts.isFunctionDeclaration(statement) || statement.name === undefined) continue;
    if (!(ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const start = statement.getStart(file);
    let index = -1;
    for (const [at, mark] of marks.entries()) if (mark.at < start) index = at;
    const section = sections[index];
    if (section === undefined) throw new Error(`the helper exports ${statement.name.text} before its first section`);
    section.functions.push(statement.name.text);
  }
  return sections;
}

const REACHED: string[] = [];
const FROZEN_TITLE = "the frozen shape: the rows' ids and pin counts, and one reading, one expectation and one witness per pin";
const ANCHOR_TITLE = "the helper anchor: each row is a helper section, and every function the helper exports is its section's pin or UNCLAIMED";
const LIVENESS_TITLE = "the registered tests and the reached pins: every test in run mode, not inverted and ran, and every pin reached its compare in row order";

describe("wb-pyel.10 positions census: 12 readers of test/helpers/fiber-host-publication-readers.ts at every planted list index, nesting depth, column, segment, offset, name length, raw offset and field place", () => {
  it(FROZEN_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["FOLDS:1", "A1:6", "A3S:3", "A3F:2"]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(Object.keys(READ).sort(), "one reading per pin").toEqual([...pins].sort());
    expect(Object.keys(EXPECTED).sort(), "one expectation per pin").toEqual([...pins].sort());
    expect(Object.keys(WITNESS).sort(), "one witness per pin").toEqual([...pins].sort());
  });

  it(ANCHOR_TITLE, () => {
    const sections = helperSections();
    const titles = sections.map(section => section.title);
    expect(
      ROWS.map(row => row.label).filter(label => !titles.includes(label)),
      "row labels that are no helper section title",
    ).toEqual([]);
    expect(
      Object.keys(UNCLAIMED).filter(title => !titles.includes(title)),
      "UNCLAIMED keys that are no helper section title",
    ).toEqual([]);
    const order = ROWS.map(row => titles.indexOf(row.label));
    expect(order, "the rows stand in the helper's section order").toEqual([...order].sort((a, b) => a - b));
    for (const section of sections) {
      const unclaimed = UNCLAIMED[section.title] ?? [];
      expect(
        section.functions.filter(name => !unclaimed.includes(name)),
        `${section.title}: its exported functions not UNCLAIMED are its row's pins, in the helper's order`,
      ).toEqual(ROWS.find(row => row.label === section.title)?.pins ?? []);
      expect(
        unclaimed.filter(name => !section.functions.includes(name)),
        `${section.title}: UNCLAIMED names it does not export`,
      ).toEqual([]);
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const read = READ[pin];
          const expected = EXPECTED[pin];
          expect(read, `no reading for ${pin}`).toBeTypeOf("function");
          expect(expected, `no expectation for ${pin}`).toBeTypeOf("function");
          const reading = read === undefined ? null : plain(read());
          expect(reading).toStrictEqual(expected === undefined ? undefined : plain(expected()));
          expect(digest(reading), `${pin}'s witness`).toBe(WITNESS[pin]);
          REACHED.push(pin);
        });
      }
    });
  }

  it(LIVENESS_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), in order").toEqual([FROZEN_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), LIVENESS_TITLE]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
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
