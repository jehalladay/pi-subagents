/**
 * wb-tz2.17 (HX-ORIGINAL-GOALS-CLOSURE-R3, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.3,
 * orchestrator rulings R-B99 and R-B124): the falsifier census of the resolution-based readers,
 * test/helpers/hyperunix-successor-gate-readers.ts. Statement (the bead's export title): "Vitest-module identity by resolution
 * not specifier spelling (relative-path runner imports red) and C src-file-set width, narrowed out of wb-tz2.3's fail-closed
 * core (rule-19 structural exit)".
 *
 * ACCEPTANCE (the bead's description): "each plant reds the unmodified census and greens under the cure; the IMPORT claim text
 * and the resolver's identity behavior agree byte-for-byte with the falsifier roster." Read here as: every gate-authored member
 * of refusals #3 and #4 on wb-tz2.3 that reaches one of these readers' surfaces (IMPORT, CHANNEL, RUN, C) is a GATE row pinning
 * what these readers read in it - a member wb-tz2.3's cut #3 or cut #4 readers read quiet, or read only through a spelling, reads
 * loud here by resolution, closure, closed keys or width; the helper's header roster lines equal its exported rosters, which
 * equal this census's FORMS rows, word for word; and every piece of every claim the helper's header makes is the quote of one
 * MEMBERS row whose pins read what the piece says (refusal #1 on this bead, U1: the header claimed more than the rows pinned).
 *
 * ROWS:
 *  BASE: the unplanted subject. The cited suite test/workbench-hyperunix-observer.test.ts reads IMPORT sound (its one load reaching
 *   vitest is its vitest import declaration; its loads equal the ones TypeScript's own preprocessor lists) and CHANNEL quiet; the
 *   census tier's RUN reading is sound; C reads every file under src (equal to an independent recursive listing) and finds
 *   exactly the carrier and the asserted exclusion; the default tier's setup files are the census guard alone.
 *  GATE: the gate's own members, replayed verbatim from the two PREP records (refusal #3: gate-prep-10 / g10-gate-s142,
 *   O:1363; refusal #4: gate-prep-21 / g10-gate-s148, O:1435): each plants its edits over the subject and pins the readings it
 *   changes (absent pins read as the BASE reading). Line numbers in a pin are anchored on the planted line's own text.
 *  FORMS: one calibration plant per word of every roster, read as the word says. Where the table's reader takes the roster
 *   (RESOLUTION, EXPORT_TARGETS, IDENTITY, LOADS, ROUTES, WRITES, CHANNEL, RUN, C) the roster without the word reads the plant
 *   otherwise, so dropping the word from the read set reds its row; the IDENTITY module catch-all reads the same both ways by
 *   construction; the UNRESOLVED, SCOPES and RESIDUALS rows hold one reading each (those readers take no roster), and the row
 *   title claims only the reading every row performs.
 *  MEMBERS: one row per piece of a claim (TILE). Its pins plant what the piece names - every name a list piece lists, every
 *   place a position piece names, every exclusion a "not", "but" or "only" piece states, a quiet twin beside a loud plant where
 *   the piece draws a line - and pin the literal reading. The CHANNEL tier-config pieces read a guard refusal that names its
 *   config through setupFiles and channelReading (an injected guard: refusal #1 U2).
 *  RESIDUALS: R-PACKAGE-CODE and R-HELPER-PATCH, each a pinned quiet row beside its loud control (FORMS and MEMBERS).
 *  CLAIM: the helper header's "- <word>: <claim>" lines equal the rosters byte for byte, section by section, in order; every
 *   roster word has exactly one FORMS row.
 *  TILE: the helper header's claims - each "- <word>: <claim>" line, and the text after the reader's name in a section heading -
 *   split at ", ", ", or ", ", and ", ", nor ", "; ", " or ", " and " and " nor ", equal the quotes of the MEMBERS rows keyed to them, in order, one row per
 *   piece; every MEMBERS row is keyed to a claim the header makes.
 *  ANCHOR (standing rule 16, CT5 / CT6, outside this census): the helper header's claims anchor MEMBERS through TILE; the
 *   tracker export's wb-tz2.17 description and the R-B124 ruling's folded members in its notes name exactly the items ITEM_ROWS
 *   maps (U1, U1b, U2; R-B124 U1, U2), and every GATE row answers exactly one item (which item a row answers is this census's
 *   reading; the export holds the item set and, below, the GATE row set); the refusal #3 verdict in its wb-tz2.3 notes names
 *   exactly the refusal #3 GATE rows (the parent's own PATH and registration-narrowing members LG4, LG6 and LG6c and the family
 *   name LG5 aside, OUT_OF_SCOPE), and the refusal #4 verdict there names exactly the refusal #4 GATE rows; the landed
 *   census-helper suite holds the census guard's alias and plugins rows the CHANNEL tier-config claim cites.
 *  FROZEN SHAPE (standing rule 16): one literal pins every row as table:id - a GATE row with its pin keys, a MEMBERS row with
 *   its claim, its place among that claim's pieces and its pin count.
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; it reads the helper's text, the tracker export, the
 * cited suite and its closure, the census tier's config, the default tier's config through the census guard, the landed
 * census-helper suite and the files under src, and lays planted texts and links over the disk in memory only.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { censusGuard, resolveTier } from "./helpers/census.js";
import {
  C_FORMS,
  type CForm,
  CHANNEL_ROOTS,
  type ChannelRoot,
  type Claim,
  ClosureReader,
  channelReading,
  diskHost,
  EXPORT_TARGETS,
  EXTENSIONS,
  type ExportTarget,
  type Finding,
  type GuardOf,
  HEADER_SECTIONS,
  IDENTITY_KINDS,
  identityText,
  importReading,
  LOAD_FORMS,
  type LoadForm,
  loadsOf,
  type ModuleHost,
  type ModuleScope,
  RESOLUTION_FORMS,
  type ReadOptions,
  type ResolveOptions,
  ROUTE_FORMS,
  type RouteForm,
  RUN_FORMS,
  type RunForm,
  resolutionText,
  resolveSpecifier,
  routesOf,
  runReading,
  type Site,
  type SrcScan,
  scopeOf,
  setupFiles,
  srcSites,
  WRITE_FORMS,
  type WriteForm,
  writesOf,
} from "./helpers/hyperunix-successor-gate-readers.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER = "test/helpers/hyperunix-successor-gate-readers.ts";
const SUITE = "test/workbench-hyperunix-observer.test.ts";
const RUN_PIN = "test/workbench-hyperunix-successor-gate-run-pin.census.ts";
const CENSUS_CONFIG = "vitest.census.config.ts";
const CENSUS_ARGV: readonly string[] = ["run", "--config", CENSUS_CONFIG];
const RECEIPT_IMPORT = "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';";
const BASE = diskHost(ROOT);
const TEXTS = new Map<string, string>();
function read(path: string): string {
  const cached = TEXTS.get(path);
  if (cached !== undefined) return cached;
  const text = readFileSync(join(ROOT, path), "utf8");
  TEXTS.set(path, text);
  return text;
}
/** `text` with `old` (which must occur exactly once) replaced by `next`. */
function edit(text: string, old: string, next: string): string {
  const parts = text.split(old);
  if (parts.length !== 2) throw new Error(`the anchor occurs ${parts.length - 1} times: ${old.slice(0, 80)}`);
  return parts.join(next);
}
const without = <W extends string>(list: readonly Claim<W>[], word: W): W[] => list.map(entry => entry.word).filter(entry => entry !== word);
function withImports(manifest: string, imports: Readonly<Record<string, string>>): string {
  const value: unknown = JSON.parse(manifest);
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("package.json is no object");
  return `${JSON.stringify({ ...value, imports }, null, 2)}\n`;
}
/** Packages planted under node_modules for the export-target, identity and residual plants. */
const PACKAGE_CODE = "export const lgReach = () => new Function(\"return this\")()[\"__vi\" + \"test_index__\"];\n";
const PACKAGES: ReadonlyMap<string, string> = new Map([
  ["node_modules/lg-sugar/package.json", "{\"name\": \"lg-sugar\", \"exports\": \"./main.js\"}\n"],
  ["node_modules/lg-sugar/main.js", "export const lgSugar = 1;\n"],
  ["node_modules/lg-pattern/package.json", "{\"name\": \"lg-pattern\", \"exports\": {\"./*\": \"./lib/*.js\"}}\n"],
  ["node_modules/lg-pattern/lib/a.js", "export const lgPattern = 1;\n"],
  ["node_modules/lg-array/package.json", "{\"name\": \"lg-array\", \"exports\": {\".\": [{\"browser\": \"./b.js\"}, \"./main.js\"]}}\n"],
  ["node_modules/lg-array/main.js", "export const lgArray = 1;\n"],
  ["node_modules/lg-array/b.js", "export const lgBrowser = 1;\n"],
  ["node_modules/@vitest/lg-linked/package.json", "{\"name\": \"lg-linked\", \"main\": \"./index.js\"}\n"],
  ["node_modules/@vitest/lg-linked/index.js", "export const lgLinked = 1;\n"],
  ["node_modules/lg-vitest-named/package.json", "{\"name\": \"@vitest/lg-named\", \"main\": \"./index.js\"}\n"],
  ["node_modules/lg-vitest-named/index.js", "export const lgNamed = 1;\n"],
  ["node_modules/lg-dynamic-code/package.json", "{\"name\": \"lg-dynamic-code\", \"exports\": \"./index.js\"}\n"],
  ["node_modules/lg-dynamic-code/index.js", PACKAGE_CODE],
]);
const HELPER_PATCH = "const lgRealIsArray = Array.isArray;\nArray.isArray = ((value: unknown): value is unknown[] => lgRealIsArray(value)) as typeof Array.isArray;\nexport const lgPatched = 1;\n";
const host = (planted: ReadonlyMap<string, string> = new Map(), links: ReadonlyMap<string, string> = new Map()): ModuleHost => diskHost(ROOT, planted, links);
/** A specifier resolved from the cited suite with every form, then with `options`. */
function resolutions(specifier: string, options: ResolveOptions, planted?: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>): readonly string[] {
  const at = host(planted, links);
  return [resolutionText(resolveSpecifier(at, SUITE, specifier)), resolutionText(resolveSpecifier(at, SUITE, specifier, options))];
}
/** A specifier resolved with every export-target form, then without `word`. */
function targets(specifier: string, word: ExportTarget, planted: ReadonlyMap<string, string>): readonly string[] {
  const at = host(planted);
  return [resolutionText(resolveSpecifier(at, SUITE, specifier)), resolutionText(resolveSpecifier(at, SUITE, specifier, { targets: without(EXPORT_TARGETS, word) }))];
}
/** What a specifier the cited suite loads is, with every identity kind, then with `options`. */
function identities(specifier: string, options: ReadOptions, planted?: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>): readonly string[] {
  const at = host(planted, links);
  const all = new ClosureReader(at, SUITE);
  const some = new ClosureReader(at, SUITE, options);
  return [identityText(all.identity(all.resolve(SUITE, specifier))), identityText(some.identity(some.resolve(SUITE, specifier)))];
}
/** One module spelling each load form once. */
const LOAD_PLANT = "import lgA from \"./lg-a.js\";\nexport { lgB } from \"./lg-b.js\";\nimport lgC = require(\"./lg-c.js\");\ntype LgD = import(\"./lg-d.js\").LgD;\nconst lgE = import(\"./lg-e.js\");\nconst lgF = require(\"./lg-f.js\");\n";
function loadForms(word: LoadForm): readonly string[][] {
  const text = (forms?: readonly LoadForm[]): string[] => loadsOf("test/helpers/lg-loads.ts", LOAD_PLANT, forms).map(load => `${load.form} ${load.specifier} :${load.line}`);
  return [text(), text(without(LOAD_FORMS, word))];
}
const findingText = (finding: Finding): string => `${finding.form} ${finding.what} :${finding.line}`;
/** A planted text's routes as a local module, as a local module without `word`, and as a package module. */
function routeForms(word: RouteForm, text: string): readonly string[][] {
  return [
    routesOf("test/helpers/lg-route.ts", text, "local").map(findingText),
    routesOf("test/helpers/lg-route.ts", text, "local", without(ROUTE_FORMS, word)).map(findingText),
    routesOf("node_modules/lg-route/index.ts", text, "package").map(findingText),
  ];
}
/** A local module that loads node:vm, read with every route form and without the sensitive-builtin route. */
function sensitive(): readonly string[] {
  const at = host(new Map([["test/helpers/lg-vm.ts", "import { runInThisContext } from \"node:vm\";\nexport const lgRun = runInThisContext;\n"]]));
  return [identityText(new ClosureReader(at, SUITE).module("test/helpers/lg-vm.ts")), identityText(new ClosureReader(at, SUITE, { routes: without(ROUTE_FORMS, "sensitive builtin") }).module("test/helpers/lg-vm.ts"))];
}
function writeForms(word: WriteForm, text: string): readonly string[][] {
  return [writesOf(SUITE, text).map(findingText), writesOf(SUITE, text, without(WRITE_FORMS, word)).map(findingText)];
}
type ChannelOptions = ReadOptions & { readonly roots?: readonly ChannelRoot[]; readonly setup?: readonly string[] | string; readonly guard?: GuardOf };
function channels(word: ChannelRoot, options: ChannelOptions, planted?: ReadonlyMap<string, string>): readonly string[][] {
  const at = host(planted);
  return [channelReading(at, SUITE, options), channelReading(at, SUITE, { ...options, roots: without(CHANNEL_ROOTS, word) })];
}
/** The tier-config guard a falsifier injects: a refusal that names the config (refusal #1 U2, the H50 class). */
const REFUSED_WHY = "the census guard is not vouched on the test tier: a planted refusal that names the config";
const refusing: GuardOf = () => ({ ok: false, config: join(ROOT, "vitest.config.ts"), why: REFUSED_WHY });
function runForms(word: RunForm, argv: readonly string[], config: string): readonly string[] {
  const readConfig = (file: string): string | undefined => (file === CENSUS_CONFIG ? config : undefined);
  return [runReading(RUN_PIN, argv, readConfig), runReading(RUN_PIN, argv, readConfig, without(RUN_FORMS, word))];
}
const BASE_SITES = srcSites(BASE);
const siteText = (site: Site): string => `${site.file}:${site.line} ${site.form} ${site.whole ? "whole" : "embedded"} ${site.tag}`;
/** The sites and breaks a planted tree adds to the base scan, with every C form and without `word`. */
function cForms(word: CForm, planted: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>): readonly string[][] {
  const at = host(planted, links);
  const added = (scan: SrcScan): string[] => [...scan.sites.filter(site => !BASE_SITES.sites.some(base => base.file === site.file && base.line === site.line)).map(siteText), ...scan.breaks];
  return [added(srcSites(at)), added(srcSites(at, "src", without(C_FORMS, word)))];
}

const CENSUS_TIMEOUT = 120_000;
const EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-tz2.17";
const PARENT = "wb-tz2.3";
const CENSUS_HELPER_SUITE = "test/workbench-census-helper.test.ts";

// ---- GATE: the gate's members, verbatim from the two PREP records -------------------------------------------------------

interface Edit {
  readonly file: string;
  /** The text replaced, which must occur exactly once; absent for a new file or an append. */
  readonly old?: string;
  readonly text: string;
  readonly append?: boolean;
}
interface GatePins {
  readonly import?: string;
  readonly channel?: readonly string[];
  readonly run?: string;
  readonly c?: readonly string[];
}
interface GateRow {
  readonly id: string;
  readonly refusal: 3 | 4;
  /** The PREP spec tag the row replays. */
  readonly tag: string;
  readonly edits: readonly Edit[];
  readonly pins: GatePins;
}
const GATE_ROWS: readonly GateRow[] = [
  {"id": "LG1s", "refusal": 3, "tag": "LG1s-S-import-runner-by-path-sorted-null-rewrite", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';", "text": "import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';\nimport {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';"}, {"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';const LG_STANDING = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nconst lgRealEach = lgRegistrar.each;\nlgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {\n  const rows = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && LG_STANDING.has(row[0]) ? [row[0], null] : row)) : cases;\n  return (lgRealEach as unknown as (...args: unknown[]) => unknown).apply(this, [rows, ...rest]);\n} as unknown as typeof lgRegistrar.each;\n"}], "pins": {"import": "IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line {{L:test/workbench-hyperunix-observer.test.ts|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}} (vitest (vitest)), import declaration '../node_modules/@vitest/runner/dist/index.js' at line {{L:test/workbench-hyperunix-observer.test.ts|import {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';}} (vitest (@vitest/runner))>", "channel": ["cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {}}"]}},
  {"id": "LG1sc", "refusal": 3, "tag": "LG1sc-S-import-runner-by-path-sorted-accepted-control", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';", "text": "import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';\nimport {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';"}, {"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';const LG_STANDING = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nconst lgRealEach = lgRegistrar.each;\nlgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {\n  const rows = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && LG_STANDING.has(row[0]) ? [row[0], measured()] : row)) : cases;\n  return (lgRealEach as unknown as (...args: unknown[]) => unknown).apply(this, [rows, ...rest]);\n} as unknown as typeof lgRegistrar.each;\n"}], "pins": {"import": "IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line {{L:test/workbench-hyperunix-observer.test.ts|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}} (vitest (vitest)), import declaration '../node_modules/@vitest/runner/dist/index.js' at line {{L:test/workbench-hyperunix-observer.test.ts|import {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';}} (vitest (@vitest/runner))>", "channel": ["cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {}}"]}},
  {"id": "LG1a", "refusal": 3, "tag": "LG1a-S-import-vitest-by-path-each-wrapper-null-rewrite", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nimport {it as lgRegistrar} from '../node_modules/vitest/dist/index.js';\nconst LG_STANDING = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nconst lgRealEach = lgRegistrar.each;\nlgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {\n  const rows = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && LG_STANDING.has(row[0]) ? [row[0], null] : row)) : cases;\n  return (lgRealEach as unknown as (...args: unknown[]) => unknown).apply(this, [rows, ...rest]);\n} as unknown as typeof lgRegistrar.each;\n"}], "pins": {"import": "IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line {{L:test/workbench-hyperunix-observer.test.ts|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}} (vitest (vitest)), import declaration '../node_modules/vitest/dist/index.js' at line {{L:test/workbench-hyperunix-observer.test.ts|import {it as lgRegistrar} from '../node_modules/vitest/dist/index.js';}} (vitest (vitest))>", "channel": ["cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {}}"]}},
  {"id": "LG1b", "refusal": 3, "tag": "LG1b-S-import-runner-by-path-each-wrapper-null-rewrite", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nimport {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';\nconst LG_STANDING = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nconst lgRealEach = lgRegistrar.each;\nlgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {\n  const rows = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && LG_STANDING.has(row[0]) ? [row[0], null] : row)) : cases;\n  return (lgRealEach as unknown as (...args: unknown[]) => unknown).apply(this, [rows, ...rest]);\n} as unknown as typeof lgRegistrar.each;\n"}], "pins": {"import": "IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line {{L:test/workbench-hyperunix-observer.test.ts|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}} (vitest (vitest)), import declaration '../node_modules/@vitest/runner/dist/index.js' at line {{L:test/workbench-hyperunix-observer.test.ts|import {test as lgRegistrar} from '../node_modules/@vitest/runner/dist/index.js';}} (vitest (@vitest/runner))>", "channel": ["cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {}}"]}},
  {"id": "LG2", "refusal": 3, "tag": "LG2-S-helper-module-each-wrapper-null-rewrite", "edits": [{"file": "test/helpers/hx-live-receipt.ts", "append": true, "text": "\nimport {it as lgRegistrar} from 'vitest';\n\nconst LG_STANDING = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nconst lgRealEach = lgRegistrar.each;\nlgRegistrar.each = function (this: unknown, cases: unknown, ...rest: unknown[]) {\n  const rows = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && LG_STANDING.has(row[0]) ? [row[0], null] : row)) : cases;\n  return (lgRealEach as unknown as (...args: unknown[]) => unknown).apply(this, [rows, ...rest]);\n} as unknown as typeof lgRegistrar.each;\n"}], "pins": {"import": "IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line {{L:test/workbench-hyperunix-observer.test.ts|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}} (vitest (vitest)), import declaration './helpers/hx-live-receipt.js' at line {{L:test/workbench-hyperunix-observer.test.ts|import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';}} (carrier (test/helpers/hx-live-receipt.ts:{{L:test/helpers/hx-live-receipt.ts|import {it as lgRegistrar} from 'vitest';}} loads 'vitest' (vitest vitest)))>"}},
  {"id": "LG3", "refusal": 3, "tag": "LG3-S-runtime-array-isarray-static-patch-null-rewrite", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "  it.each(refusals)('H5: refuses %s with a typed validation error and no snapshot', (_name, value) => {", "text": "  const lgRealIsArray = Array.isArray;\n  Array.isArray = ((value: unknown): value is unknown[] => {\n    if (lgRealIsArray(value) && (value[0] === 'contract hyperunix.find/v2' || value[0] === 'representation hyperunix.result/2')) value[1] = null;\n    return lgRealIsArray(value);\n  }) as typeof Array.isArray;\n  it.each(refusals)('H5: refuses %s with a typed validation error and no snapshot', (_name, value) => {"}, {"file": "test/workbench-hyperunix-observer.test.ts", "old": "    expect(result).toBeUndefined();\n  });\n\n  it('H5: a reading of another workspace is an authorization refusal", "text": "    expect(result).toBeUndefined();\n  });\n  Array.isArray = lgRealIsArray;\n\n  it('H5: a reading of another workspace is an authorization refusal"}], "pins": {"channel": ["cited suite: member write .isArray by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.isArray = ((value: unknown): value is unknown[] => {}}", "cited suite: member write [1] by = at line {{L:test/workbench-hyperunix-observer.test.ts|if (lgRealIsArray(value) && (value[0] === 'contract hyperunix.find/v2'}}", "cited suite: member write .isArray by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.isArray = lgRealIsArray;}}"]}},
  {"id": "LG3c", "refusal": 3, "tag": "LG3c-S-runtime-array-isarray-static-patch-accepted-control", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "  it.each(refusals)('H5: refuses %s with a typed validation error and no snapshot', (_name, value) => {", "text": "  const lgRealIsArray = Array.isArray;\n  Array.isArray = ((value: unknown): value is unknown[] => {\n    if (lgRealIsArray(value) && (value[0] === 'contract hyperunix.find/v2' || value[0] === 'representation hyperunix.result/2')) value[1] = measured();\n    return lgRealIsArray(value);\n  }) as typeof Array.isArray;\n  it.each(refusals)('H5: refuses %s with a typed validation error and no snapshot', (_name, value) => {"}, {"file": "test/workbench-hyperunix-observer.test.ts", "old": "    expect(result).toBeUndefined();\n  });\n\n  it('H5: a reading of another workspace is an authorization refusal", "text": "    expect(result).toBeUndefined();\n  });\n  Array.isArray = lgRealIsArray;\n\n  it('H5: a reading of another workspace is an authorization refusal"}], "pins": {"channel": ["cited suite: member write .isArray by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.isArray = ((value: unknown): value is unknown[] => {}}", "cited suite: member write [1] by = at line {{L:test/workbench-hyperunix-observer.test.ts|value[0] === 'representation hyperunix.result/2')) value[1] = measured();}}", "cited suite: member write .isArray by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.isArray = lgRealIsArray;}}"]}},
  {"id": "LG5a", "refusal": 3, "tag": "LG5a-C-src-tag-in-an-mts-file", "edits": [{"file": "src/workbench/gate-probe-lg5.mts", "text": "export const LG5_TAG = \"hyperunix.result/1\";\n"}], "pins": {"c": ["src/workbench/gate-probe-lg5.mts:1 code whole hyperunix.result/1"]}},
  {"id": "LG5b", "refusal": 3, "tag": "LG5b-C-src-tag-in-a-tsx-file", "edits": [{"file": "src/workbench/gate-probe-lg5.tsx", "text": "export const LG5_TAG = \"hyperunix.result/1\";\n"}], "pins": {"c": ["src/workbench/gate-probe-lg5.tsx:1 code whole hyperunix.result/1"]}},
  {"id": "LG5c", "refusal": 3, "tag": "LG5c-C-src-tag-in-a-ts-file-control", "edits": [{"file": "src/workbench/gate-probe-lg5.ts", "text": "export const LG5_TAG = \"hyperunix.result/1\";\n"}], "pins": {"c": ["src/workbench/gate-probe-lg5.ts:1 code whole hyperunix.result/1"]}},
  {"id": "GL1", "refusal": 4, "tag": "GL1-S-global-index-each-wrapper-null-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgStanding = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\nconst lgRealEach = (globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}>)['__vitest_index__'].it.each;\n(globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {\n  const [cases, ...rest] = args;\n  const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && lgStanding.test(String(row[0])) ? [row[0], null] : row)) : cases;\n  return lgRealEach.apply(this, [rewritten, ...rest]);\n};\n"}], "pins": {"channel": ["cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|const lgRealEach = (globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}", "cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {}}"]}},
  {"id": "GL1c", "refusal": 4, "tag": "GL1c-S-global-index-each-wrapper-accepted-control-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgStanding = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\nconst lgRealEach = (globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}>)['__vitest_index__'].it.each;\n(globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {\n  const [cases, ...rest] = args;\n  const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && lgStanding.test(String(row[0])) ? [row[0], measured()] : row)) : cases;\n  return lgRealEach.apply(this, [rewritten, ...rest]);\n};\n"}], "pins": {"channel": ["cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|const lgRealEach = (globalThis as unknown as Record<string, {it: {each: (this: unknown, ...args: unknown[]) => unknown}}", "cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|}>)['__vitest_index__'].it.each = function (this: unknown, ...args: unknown[]) {}}"]}},
  {"id": "GL2", "refusal": 4, "tag": "GL2-S-getBuiltinModule-createRequire-runner-each-null-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');\nconst lgLoad = lgModule['create' + 'Require'](import.meta.url);\nconst lgRunner = lgLoad('@vitest/' + 'runner') as {test: {each: (this: unknown, ...args: unknown[]) => unknown}};\nconst lgStanding = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\nconst lgRealEach = lgRunner.test.each;\nlgRunner.test.each = function (this: unknown, ...args: unknown[]) {\n  const [cases, ...rest] = args;\n  const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && lgStanding.test(String(row[0])) ? [row[0], null] : row)) : cases;\n  return lgRealEach.apply(this, [rewritten, ...rest]);\n};\n"}], "pins": {"channel": ["cited suite: global object process.getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: loader name getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: loader name getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: computed member lgModule['create' + 'Require'] at line {{L:test/workbench-hyperunix-observer.test.ts|const lgLoad = lgModule['create' + 'Require'](import.meta.url);}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRunner.test.each = function (this: unknown, ...args: unknown[]) {}}"]}},
  {"id": "GL2c", "refusal": 4, "tag": "GL2c-S-getBuiltinModule-createRequire-runner-each-accepted-control-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');\nconst lgLoad = lgModule['create' + 'Require'](import.meta.url);\nconst lgRunner = lgLoad('@vitest/' + 'runner') as {test: {each: (this: unknown, ...args: unknown[]) => unknown}};\nconst lgStanding = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\nconst lgRealEach = lgRunner.test.each;\nlgRunner.test.each = function (this: unknown, ...args: unknown[]) {\n  const [cases, ...rest] = args;\n  const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && lgStanding.test(String(row[0])) ? [row[0], measured()] : row)) : cases;\n  return lgRealEach.apply(this, [rewritten, ...rest]);\n};\n"}], "pins": {"channel": ["cited suite: global object process.getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: loader name getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: loader name getBuiltinModule at line {{L:test/workbench-hyperunix-observer.test.ts|const lgModule = (process as unknown as {getBuiltinModule: (id: string) => Record<string, (url: string) => (id: string) => unknown>}).getBuiltinModule('node:module');}}", "cited suite: computed member lgModule['create' + 'Require'] at line {{L:test/workbench-hyperunix-observer.test.ts|const lgLoad = lgModule['create' + 'Require'](import.meta.url);}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|lgRunner.test.each = function (this: unknown, ...args: unknown[]) {}}"]}},
  {"id": "GI1", "refusal": 4, "tag": "GI1-S-import-importActual-by-element-access", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgVi = (globalThis as unknown as Record<string, Record<string, Record<string, unknown>>>)['__vitest_index__']['vi'];\nconst lgLoaded = (lgVi['importActual'] as (path: string) => Promise<unknown>)('./helpers/hx-live-receipt.js');\nvoid lgLoaded;\n"}], "pins": {"channel": ["cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|const lgVi = (globalThis as unknown as Record<string, Record<string, Record<string, unknown>>>)['__vitest_index__']['vi'];}}", "cited suite: loader member ['importActual'] at line {{L:test/workbench-hyperunix-observer.test.ts|const lgLoaded = (lgVi['importActual'] as (path: string) => Promise<unknown>)('./helpers/hx-live-receipt.js');}}"]}},
  {"id": "GI1c", "refusal": 4, "tag": "GI1c-S-import-importActual-by-property-access-control", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgVi = (globalThis as unknown as Record<string, Record<string, Record<string, unknown>>>)['__vitest_index__']['vi'];\nconst lgLoaded = (lgVi.importActual as (path: string) => Promise<unknown>)('./helpers/hx-live-receipt.js');\nvoid lgLoaded;\n"}], "pins": {"channel": ["cited suite: vite name '__vitest_index__' at line {{L:test/workbench-hyperunix-observer.test.ts|const lgVi = (globalThis as unknown as Record<string, Record<string, Record<string, unknown>>>)['__vitest_index__']['vi'];}}", "cited suite: loader member .importActual at line {{L:test/workbench-hyperunix-observer.test.ts|const lgLoaded = (lgVi.importActual as (path: string) => Promise<unknown>)('./helpers/hx-live-receipt.js');}}"]}},
  {"id": "GR1", "refusal": 4, "tag": "GR1-S-run-pin-census-config-testNamePattern-runpin", "edits": [{"file": "vitest.census.config.ts", "old": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false } });", "text": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false, testNamePattern: \"^(?!wb-tz2\\\\.3 HyperUnix successor gate run pin)\" } });"}], "pins": {"run": "<vitest.census.config.ts: the test object sets testNamePattern>"}},
  {"id": "GR2", "refusal": 4, "tag": "GR2-S-run-pin-census-config-dir-passWithNoTests-runpin", "edits": [{"file": "vitest.census.config.ts", "old": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false } });", "text": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false, dir: \"qa\", passWithNoTests: true } });"}], "pins": {"run": "<vitest.census.config.ts: the test object sets dir, passWithNoTests>"}},
  {"id": "GR2c", "refusal": 4, "tag": "GR2c-S-run-pin-census-config-dir-alone-control-runpin", "edits": [{"file": "vitest.census.config.ts", "old": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false } });", "text": "export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false, dir: \"qa\" } });"}], "pins": {"run": "<vitest.census.config.ts: the test object sets dir>"}},
  {"id": "GRT1", "refusal": 4, "tag": "GRT1-S-runtime-array-iterator-spread-rewrite-null-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgIter = Array.prototype[Symbol.iterator];\nconst lgRow = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nArray.prototype[Symbol.iterator] = function (this: unknown[]) {\n  if (this.length === 2 && typeof this[0] === 'string' && lgRow.has(this[0]) && typeof this[1] === 'object' && this[1] !== null) return lgIter.call([this[0], null]);\n  return lgIter.call(this);\n} as typeof lgIter;\n"}], "pins": {"channel": ["cited suite: computed member Array.prototype[Symbol.iterator] at line {{L:test/workbench-hyperunix-observer.test.ts|const lgIter = Array.prototype[Symbol.iterator];}}", "cited suite: member write [<computed>] by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.prototype[Symbol.iterator] = function (this: unknown[]) {}}", "cited suite: computed member Array.prototype[Symbol.iterator] at line {{L:test/workbench-hyperunix-observer.test.ts|Array.prototype[Symbol.iterator] = function (this: unknown[]) {}}"]}},
  {"id": "GRT1c", "refusal": 4, "tag": "GRT1c-S-runtime-array-iterator-spread-accepted-control-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst lgIter = Array.prototype[Symbol.iterator];\nconst lgRow = new Set(['contract hyperunix.find/v2', 'representation hyperunix.result/2']);\nArray.prototype[Symbol.iterator] = function (this: unknown[]) {\n  if (this.length === 2 && typeof this[0] === 'string' && lgRow.has(this[0]) && typeof this[1] === 'object' && this[1] !== null) return lgIter.call([this[0], measured()]);\n  return lgIter.call(this);\n} as typeof lgIter;\n"}], "pins": {"channel": ["cited suite: computed member Array.prototype[Symbol.iterator] at line {{L:test/workbench-hyperunix-observer.test.ts|const lgIter = Array.prototype[Symbol.iterator];}}", "cited suite: member write [<computed>] by = at line {{L:test/workbench-hyperunix-observer.test.ts|Array.prototype[Symbol.iterator] = function (this: unknown[]) {}}", "cited suite: computed member Array.prototype[Symbol.iterator] at line {{L:test/workbench-hyperunix-observer.test.ts|Array.prototype[Symbol.iterator] = function (this: unknown[]) {}}"]}},
  {"id": "GVM1", "refusal": 4, "tag": "GVM1-S-vi-mock-vitest-dist-node-modules-path-null-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nvi." + "mock('../node_modules/vitest/dist/index.js', async importOriginal => {\n  const real = await importOriginal<{it: {each: (this: unknown, ...args: unknown[]) => unknown}}>();\n  const standing = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\n  const realEach = real.it.each;\n  real.it.each = function (this: unknown, ...args: unknown[]) {\n    const [cases, ...rest] = args;\n    const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && standing.test(String(row[0])) ? [row[0], null] : row)) : cases;\n    return realEach.apply(this, [rewritten, ...rest]);\n  };\n  return real;\n});\n"}], "pins": {"channel": ["cited suite: spy or mock member .mock at line {{L:test/workbench-hyperunix-observer.test.ts|vi." + "mock('../node_modules/vitest/dist/index.js', async importOriginal => {}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|real.it.each = function (this: unknown, ...args: unknown[]) {}}"]}},
  {"id": "GVM1c", "refusal": 4, "tag": "GVM1c-S-vi-mock-vitest-dist-accepted-control-runpin", "edits": [{"file": "test/workbench-hyperunix-observer.test.ts", "old": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';", "text": "import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';\nvi." + "mock('../node_modules/vitest/dist/index.js', async importOriginal => {\n  const real = await importOriginal<{it: {each: (this: unknown, ...args: unknown[]) => unknown}}>();\n  const standing = / hyperunix\\.(?:find\\/v2|result\\/2)$/;\n  const realEach = real.it.each;\n  real.it.each = function (this: unknown, ...args: unknown[]) {\n    const [cases, ...rest] = args;\n    const rewritten = Array.isArray(cases) ? cases.map(row => (Array.isArray(row) && standing.test(String(row[0])) ? [row[0], {contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1', execution_status: {kind: 'incomplete'}, coverage_summary: {licenses_absence: false}, rows: [], rows_retained: true, operation: 'find'}, workspaceRoot: '/tmp/hyperunix-observer-ws', runtime: {version: '0.1.0', binarySha256: '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d'}}] : row)) : cases;\n    return realEach.apply(this, [rewritten, ...rest]);\n  };\n  return real;\n});\n"}], "pins": {"channel": ["cited suite: spy or mock member .mock at line {{L:test/workbench-hyperunix-observer.test.ts|vi." + "mock('../node_modules/vitest/dist/index.js', async importOriginal => {}}", "cited suite: member write .each by = at line {{L:test/workbench-hyperunix-observer.test.ts|real.it.each = function (this: unknown, ...args: unknown[]) {}}"]}},
];

/** The files a row's edits plant over the disk. */
function planted(edits: readonly Edit[]): Map<string, string> {
  const files = new Map<string, string>();
  for (const change of edits) {
    const current = files.get(change.file) ?? (statSync(join(ROOT, change.file), { throwIfNoEntry: false })?.isFile() === true ? read(change.file) : "");
    files.set(change.file, change.append === true ? current + change.text : change.old === undefined ? change.text : edit(current, change.old, change.text));
  }
  return files;
}
/** A pin's text with each line anchor, {{L:<file>|<snippet>}}, replaced by the 1-based line of the first line of the planted file that holds the snippet. */
function expand(pin: string, files: ReadonlyMap<string, string>): string {
  return pin.replace(/\{\{L:([^|]+)\|(.*?)\}\}/g, (_whole, file: string, line: string) => {
    const at = (files.get(file) ?? read(file)).split("\n").findIndex(text => text.includes(line));
    if (at < 0) throw new Error(`the line anchor is not in ${file}: ${line}`);
    return String(at + 1);
  });
}
interface GateReading {
  readonly import: string | null;
  readonly channel: readonly string[];
  readonly run: string | null;
  readonly c: readonly string[];
}
const TIER = resolveTier(ROOT, "census");
const TIER_ARGV: readonly string[] | string = TIER.ok ? TIER.argv : TIER.why;
function gateReading(files: ReadonlyMap<string, string>): GateReading {
  const at = host(files);
  const reading = importReading(at, SUITE);
  const run = runReading(RUN_PIN, TIER_ARGV, file => at.read(file));
  return {
    import: reading.section.startsWith("IMPORT by resolution") ? null : reading.section,
    channel: channelReading(at, SUITE),
    run: run.startsWith("<") ? run : null,
    c: (scan => [...scan.sites.filter(site => !BASE_SITES.sites.some(base => base.file === site.file && base.line === site.line)).map(siteText), ...scan.breaks])(srcSites(at)),
  };
}

// ---- FORMS: one calibration plant per roster word ------------------------------------------------------------------------

interface FormRow {
  readonly table: string;
  readonly word: string;
  readonly measure: () => unknown;
  readonly expected: unknown;
}
const form = (table: string, word: string, measure: () => unknown, expected: unknown): FormRow => ({ table, word, measure, expected });
const FORMS_ROWS: readonly FormRow[] = [
  form("RESOLUTION", "builtin", () => resolutions("node:path", { forms: without(RESOLUTION_FORMS, "builtin") }), ["builtin", "unresolved (no package: node:path is a builtin, a form not read)"]),
  form("RESOLUTION", "relative", () => resolutions("../node_modules/@vitest/runner/dist/index.js", { forms: without(RESOLUTION_FORMS, "relative") }), ["relative node_modules/@vitest/runner/dist/index.js", "unresolved (no file: ../node_modules/@vitest/runner/dist/index.js is a relative path, a form not read)"]),
  form("RESOLUTION", "package", () => resolutions("@hyperunix/sdk/protocol", { forms: without(RESOLUTION_FORMS, "package") }), ["package node_modules/@hyperunix/sdk/dist/protocol.js", "unresolved (no package: @hyperunix/sdk/protocol is a bare specifier, a form not read)"]),
  form("RESOLUTION", "package imports", () => resolutions("#lg-runner", { forms: without(RESOLUTION_FORMS, "package imports") }, new Map([["package.json", withImports(read("package.json"), { "#lg-runner": "@vitest/runner", "#lg-local/*": "./test/helpers/*.ts" })]])), ["package imports node_modules/@vitest/runner", "unresolved (no imports map: #lg-runner is a package imports specifier, a form not read)"]),
  form("UNRESOLVED", "absolute path", () => resolutionText(resolveSpecifier(BASE, SUITE, "/etc/hosts")), "unresolved (absolute path: /etc/hosts is an absolute path)"),
  form("UNRESOLVED", "url scheme", () => resolutionText(resolveSpecifier(BASE, SUITE, "data:text/javascript,export default 1")), "unresolved (url scheme: data:text/javascript,export default 1 opens with a URL scheme)"),
  form("UNRESOLVED", "query", () => resolutionText(resolveSpecifier(BASE, SUITE, "./helpers/hx-live-receipt.js?raw")), "unresolved (query: ./helpers/hx-live-receipt.js?raw holds a query or hash suffix)"),
  form("UNRESOLVED", "empty", () => resolutionText(resolveSpecifier(BASE, SUITE, "")), "unresolved (empty: an empty specifier)"),
  form("UNRESOLVED", "outside the root", () => resolutionText(resolveSpecifier(BASE, SUITE, "../../outside.js")), "unresolved (outside the root: ../outside.js leaves the root)"),
  form("UNRESOLVED", "no file", () => resolutionText(resolveSpecifier(BASE, SUITE, "./helpers/lg-no-such-module.js")), "unresolved (no file: test/helpers/lg-no-such-module.js names no file)"),
  form("UNRESOLVED", "ambiguous", () => resolutionText(resolveSpecifier(diskHost(ROOT, new Map([["test/helpers/lg-twice.ts", "export {};\n"], ["test/helpers/lg-twice.mts", "export {};\n"]])), SUITE, "./helpers/lg-twice")), "unresolved (ambiguous: test/helpers/lg-twice names 2 files (test/helpers/lg-twice.ts, test/helpers/lg-twice.mts))"),
  form("UNRESOLVED", "directory package", () => resolutionText(resolveSpecifier(diskHost(ROOT, new Map([["test/helpers/lg-dir/package.json", "{\"main\": \"./main.js\"}\n"], ["test/helpers/lg-dir/index.ts", "export {};\n"]])), SUITE, "./helpers/lg-dir")), "unresolved (directory package: test/helpers/lg-dir is a directory holding a package.json)"),
  form("UNRESOLVED", "no package", () => resolutionText(resolveSpecifier(BASE, SUITE, "lg-no-such-package")), "unresolved (no package: no node_modules/lg-no-such-package directory from test up to the root)"),
  form("UNRESOLVED", "no export", () => resolutionText(resolveSpecifier(BASE, SUITE, "@hyperunix/sdk/lg-no-such-subpath")), "unresolved (no export: the exports of node_modules/@hyperunix/sdk hold no target for ./lg-no-such-subpath)"),
  form("UNRESOLVED", "no imports map", () => resolutionText(resolveSpecifier(BASE, SUITE, "#lg-unmapped")), "unresolved (no imports map: no package.json up to the root holds an imports map for #lg-unmapped)"),
  form("EXPORT_TARGETS", "sugar", () => targets("lg-sugar", "sugar", PACKAGES), ["package node_modules/lg-sugar/main.js", "unresolved (no export: the exports of node_modules/lg-sugar hold no target for .)"]),
  form("EXPORT_TARGETS", "exact key", () => targets("@hyperunix/sdk/protocol", "exact key", PACKAGES), ["package node_modules/@hyperunix/sdk/dist/protocol.js", "unresolved (no export: the exports of node_modules/@hyperunix/sdk hold no target for ./protocol)"]),
  form("EXPORT_TARGETS", "pattern key", () => targets("lg-pattern/a", "pattern key", PACKAGES), ["package node_modules/lg-pattern/lib/a.js", "unresolved (no export: the exports of node_modules/lg-pattern hold no target for ./a)"]),
  form("EXPORT_TARGETS", "conditions", () => targets("@hyperunix/sdk", "conditions", PACKAGES), ["package node_modules/@hyperunix/sdk/dist/index.js", "unresolved (no export: the exports of node_modules/@hyperunix/sdk hold no target for .)"]),
  form("EXPORT_TARGETS", "array", () => targets("lg-array", "array", PACKAGES), ["package node_modules/lg-array/main.js", "unresolved (no export: the exports of node_modules/lg-array hold no target for .)"]),
  form("EXPORT_TARGETS", "string", () => targets("@hyperunix/sdk/raw", "string", PACKAGES), ["package node_modules/@hyperunix/sdk/dist/transport/cli.js", "unresolved (no export: the exports of node_modules/@hyperunix/sdk hold no target for ./raw)"]),
  form("IDENTITY", "vitest", () => [identities("./helpers/lg-runner/index.js", { kinds: without(IDENTITY_KINDS, "vitest") }, PACKAGES, new Map([["test/helpers/lg-runner", "node_modules/@vitest/lg-linked"]])), identities("lg-vitest-named", { kinds: without(IDENTITY_KINDS, "vitest") }, PACKAGES)], [["vitest (@vitest/lg-linked)", "module"], ["vitest (@vitest/lg-named)", "module"]]),
  form("IDENTITY", "carrier", () => identities("./helpers/lg-carrier.js", { kinds: without(IDENTITY_KINDS, "carrier") }, new Map([["test/helpers/lg-carrier.ts", "export { test } from \"@vitest/runner\";\n"]])), ["carrier (test/helpers/lg-carrier.ts:1 loads '@vitest/runner' (vitest @vitest/runner))", "module"]),
  form("IDENTITY", "builtin", () => identities("node:fs", { kinds: without(IDENTITY_KINDS, "builtin") }), ["builtin", "module"]),
  form("IDENTITY", "module", () => identities("@hyperunix/sdk", { kinds: without(IDENTITY_KINDS, "module") }), ["module", "module"]),
  form("SCOPES", "suite", () => scopeOf(BASE, SUITE, SUITE), "suite"),
  form("SCOPES", "local", () => scopeOf(BASE, "src/workbench/observation.ts", SUITE), "local"),
  form("SCOPES", "package", () => [scopeOf(BASE, "node_modules/@hyperunix/sdk/dist/index.js", SUITE), scopeOf(diskHost(ROOT, new Map(), new Map([["test/helpers/lg-sdk", "node_modules/@hyperunix/sdk"]])), "test/helpers/lg-sdk/dist/index.js", SUITE)], ["package", "package"]),
  form("LOADS", "import declaration", () => loadForms("import declaration"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"]]),
  form("LOADS", "export declaration", () => loadForms("export declaration"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["import declaration ./lg-a.js :1", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"]]),
  form("LOADS", "import-equals", () => loadForms("import-equals"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"]]),
  form("LOADS", "import type", () => loadForms("import type"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"]]),
  form("LOADS", "dynamic import", () => loadForms("dynamic import"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "require call ./lg-f.js :6"]]),
  form("LOADS", "require call", () => loadForms("require call"), [["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5", "require call ./lg-f.js :6"], ["import declaration ./lg-a.js :1", "export declaration ./lg-b.js :2", "import-equals ./lg-c.js :3", "import type ./lg-d.js :4", "dynamic import ./lg-e.js :5"]]),
  form("ROUTES", "dynamic load", () => routeForms("dynamic load", "export const lgLoad = (name: string): Promise<unknown> => import(name);\n"), [["dynamic load import() of a Identifier :1"], [], ["dynamic load import() of a Identifier :1"]]),
  form("ROUTES", "loader name", () => routeForms("loader name", "import { createRequire } from \"node:module\";\nexport const lgLoad = createRequire;\n"), [["loader name createRequire :1", "loader name createRequire :2"], [], ["loader name createRequire :1", "loader name createRequire :2"]]),
  form("ROUTES", "loader member", () => routeForms("loader member", "export const lgLoad = (vi: Record<string, unknown>): unknown => vi[\"importActual\"];\n"), [["loader member ['importActual'] :1"], [], ["loader member ['importActual'] :1"]]),
  form("ROUTES", "vite name", () => routeForms("vite name", "export const lgHandle = (globalThis as Record<string, unknown>).__vitest_worker__;\n"), [["vite name __vitest_worker__ :1"], [], ["vite name __vitest_worker__ :1"]]),
  form("ROUTES", "import meta", () => routeForms("import meta", "export const lgHere = import.meta.dirname;\n"), [["import meta import.meta.dirname :1"], [], ["import meta import.meta.dirname :1"]]),
  form("ROUTES", "sensitive builtin", () => sensitive(), ["carrier (test/helpers/lg-vm.ts:1 holds a sensitive builtin route (loads 'node:vm'))", "module"]),
  form("ROUTES", "global object", () => routeForms("global object", "const lgGlobal = globalThis;\nexport const lgHandle = lgGlobal;\n"), [["global object globalThis as a VariableDeclaration :1"], [], ["global object globalThis as a VariableDeclaration :1"]]),
  form("ROUTES", "dynamic code", () => routeForms("dynamic code", "export const lgCode = new Function(\"return 1\");\n"), [["dynamic code Function :1"], [], []]),
  form("WRITES", "member write", () => writeForms("member write", "const lgTarget = { each: 1 };\nlgTarget.each = 2;\n"), [["member write .each by = :2"], []]),
  form("WRITES", "mutator member", () => writeForms("mutator member", "const lgTarget = {};\nObject.assign(lgTarget, { each: 2 });\n"), [["mutator member .assign :2"], []]),
  form("WRITES", "reflection", () => writeForms("reflection", "const lgTarget = {};\nexport const lgEach = Reflect.get(lgTarget, \"each\");\n"), [["reflection Reflect :2"], []]),
  form("WRITES", "spy or mock member", () => writeForms("spy or mock member", "import { vi } from \"vitest\";\nconst lgTarget = { inner: { each: () => 1 } };\nvi.spyOn(lgTarget.inner, \"each\");\n"), [["spy or mock member .spyOn :3"], []]),
  form("WRITES", "computed member", () => writeForms("computed member", "const lgKey = \"each\";\nconst lgTarget: Record<string, number> = { each: 1 };\nexport const lgEach = lgTarget[lgKey];\n"), [["computed member lgTarget[lgKey] :3"], []]),
  form("CHANNEL", "tier config", () => channels("tier config", { guard: refusing }), [[`tier config: ${REFUSED_WHY}`], []]),
  form("CHANNEL", "setup file", () => channels("setup file", { setup: ["test/helpers/census-guard.ts", "test/helpers/lg-setup.ts"] }, new Map([["test/helpers/lg-setup.ts", "import { it } from \"vitest\";\nexport const lgIt = it;\n"]])), [["setup file test/helpers/lg-setup.ts: carrier (test/helpers/lg-setup.ts:1 loads 'vitest' (vitest vitest))"], []]),
  form("CHANNEL", "cited suite", () => channels("cited suite", { setup: ["test/helpers/census-guard.ts"] }, new Map([[SUITE, edit(read(SUITE), RECEIPT_IMPORT, `${RECEIPT_IMPORT}\nconst lgTarget = { each: 1 };\nlgTarget.each = 2;`)]])), [["cited suite: member write .each by = at line 19"], []]),
  form("RUN", "argv", () => runForms("argv", ["run", "--config", CENSUS_CONFIG, "--passWithNoTests"], read(CENSUS_CONFIG)), ["<the census tier runs vitest run --config vitest.census.config.ts --passWithNoTests>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "statements", () => runForms("statements", CENSUS_ARGV, `${read(CENSUS_CONFIG)}const lgExtra = 1;\n`), ["<vitest.census.config.ts: a statement other than the defineConfig import and the default export at line 7>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "default export", () => runForms("default export", CENSUS_ARGV, read(CENSUS_CONFIG).replace("export default defineConfig({ test: { include: [\"test/**/*.census.ts\"], allowOnly: false } });", "export default { test: { include: [\"test/**/*.census.ts\"], allowOnly: false } };")), ["<vitest.census.config.ts: the default export is not a call of the imported defineConfig with one object literal>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "plain keys", () => runForms("plain keys", CENSUS_ARGV, read(CENSUS_CONFIG).replace("allowOnly: false } });", "allowOnly: false, ...{} } });")), ["<vitest.census.config.ts's test object spreads a value>", "<vitest.census.config.ts: the test object is not read>"]),
  form("RUN", "top-level keys", () => runForms("top-level keys", CENSUS_ARGV, read(CENSUS_CONFIG).replace("allowOnly: false } });", "allowOnly: false }, plugins: [] });")), ["<vitest.census.config.ts: the config sets the top-level key plugins>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "test keys", () => runForms("test keys", CENSUS_ARGV, read(CENSUS_CONFIG).replace("allowOnly: false } });", "allowOnly: false, bail: 1 } });")), ["<vitest.census.config.ts: the test object sets bail>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "allowOnly", () => runForms("allowOnly", CENSUS_ARGV, read(CENSUS_CONFIG).replace("allowOnly: false } });", "allowOnly: true } });")), ["<vitest.census.config.ts: allowOnly is not the literal false>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"test/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("RUN", "include", () => runForms("include", CENSUS_ARGV, read(CENSUS_CONFIG).replace("include: [\"test/**/*.census.ts\"]", "include: [\"qa/**/*.census.ts\"]")), ["<vitest.census.config.ts: no glob of include [\"qa/**/*.census.ts\"] matches test/workbench-hyperunix-successor-gate-run-pin.census.ts>", "the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include [\"qa/**/*.census.ts\"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts"]),
  form("C", "walk", () => cForms("walk", new Map(), new Map([["src/workbench/lg-loop", "src"]])), [["src/workbench/lg-loop reaches src, a directory already read"], []]),
  form("C", "code", () => cForms("code", new Map([["src/workbench/lg-c.mjs", "export const LG_TAG = \"hyperunix.result/1\";\n"]])), [["src/workbench/lg-c.mjs:1 code whole hyperunix.result/1"], []]),
  form("C", "text", () => cForms("text", new Map([["src/workbench/lg-c.md", "a tag in prose: hyperunix.result/1\n"]])), [["src/workbench/lg-c.md:1 text embedded hyperunix.result/1"], []]),
  form("RESIDUALS", "R-PACKAGE-CODE", () => [identities("lg-dynamic-code", {}, PACKAGES), identities("./helpers/lg-dynamic-code.js", {}, new Map([["test/helpers/lg-dynamic-code.ts", PACKAGE_CODE]]))], [["module", "module"], ["carrier (test/helpers/lg-dynamic-code.ts:1 holds a dynamic code route (Function))", "carrier (test/helpers/lg-dynamic-code.ts:1 holds a dynamic code route (Function))"]]),
  form("RESIDUALS", "R-HELPER-PATCH", () => [importReading(diskHost(ROOT, new Map([[SUITE, edit(read(SUITE), RECEIPT_IMPORT, `${RECEIPT_IMPORT}\nimport { lgPatched } from "./helpers/lg-patch.js";`)], ["test/helpers/lg-patch.ts", HELPER_PATCH]])), SUITE).vitest.length, channelReading(diskHost(ROOT, new Map([[SUITE, edit(read(SUITE), RECEIPT_IMPORT, `${RECEIPT_IMPORT}\n${HELPER_PATCH}`)]])), SUITE, { setup: ["test/helpers/census-guard.ts"] })], [1, ["cited suite: member write .isArray by = at line 19"]]),
];

/** The items the export names for this bead - its description's U1, U1b and U2, then the R-B124 ruling's folded members - each with the rows that answer it (ANCHOR). */
const ITEM_ROWS: Readonly<Record<string, readonly string[]>> = {
  "U1": ["GATE:LG1s", "GATE:LG1sc", "GATE:LG1a", "GATE:LG1b", "GATE:LG2", "FORMS:RESOLUTION:relative", "FORMS:RESOLUTION:package", "FORMS:RESOLUTION:package imports", "FORMS:IDENTITY:vitest", "FORMS:IDENTITY:carrier", "FORMS:CHANNEL:tier config"],
  "U1b": ["GATE:LG3", "GATE:LG3c", "GATE:GL1", "GATE:GL1c", "GATE:GL2", "GATE:GL2c", "GATE:GRT1", "GATE:GRT1c", "GATE:GVM1", "GATE:GVM1c", "FORMS:CHANNEL:setup file", "FORMS:CHANNEL:cited suite", "FORMS:WRITES:member write", "FORMS:WRITES:spy or mock member", "FORMS:ROUTES:vite name", "FORMS:ROUTES:loader name"],
  "U2": ["GATE:LG5a", "GATE:LG5b", "GATE:LG5c", "FORMS:C:walk", "FORMS:C:code", "FORMS:C:text"],
  "R-B124 U1": ["GATE:GR1", "GATE:GR2", "GATE:GR2c", "FORMS:RUN:test keys", "FORMS:RUN:include"],
  "R-B124 U2": ["GATE:GI1", "GATE:GI1c", "FORMS:ROUTES:loader member"],
};
/** Members the refusal #3 verdict names that are wb-tz2.3's own surfaces (PATH, its census's registration narrowing) or a family name. */
const OUT_OF_SCOPE: readonly string[] = ["LG4", "LG5", "LG6", "LG6c"];

interface ExportRecord {
  readonly description: string;
  readonly notes: string;
}
/** A bead's record in the tracker export: every row is parsed, so an id matches by value. */
function exportRecord(id: string): ExportRecord {
  for (const line of read(EXPORT).split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (typeof row === "object" && row !== null && "id" in row && row.id === id) {
      const field = (key: string): string => {
        const value: unknown = (row as Record<string, unknown>)[key];
        return typeof value === "string" ? value : "";
      };
      return { description: field("description"), notes: field("notes") };
    }
  }
  return { description: "", notes: "" };
}
/** A refusal's verdict on the parent: from its heading to the next verdict, ruling or delivery. */
function refusalBlock(refusal: number): string {
  const notes = exportRecord(PARENT).notes;
  const start = notes.indexOf(`GATE VERDICT ${PARENT}: REFUSED (RESPIN) - substance refusal at PREP F, refusal #${refusal}`);
  if (start < 0) return "";
  const ends = ["GATE VERDICT", "ORCHESTRATOR RULING", "DELIVERED by"].map(heading => notes.indexOf(heading, start + 1)).filter(at => at > start);
  return notes.slice(start, Math.min(notes.length, ...ends));
}
/** The helper's leading comment, line by line. */
const HEADER: readonly string[] = read(HELPER).slice(0, read(HELPER).indexOf("*/")).split("\n");

// ---- MEMBERS: one falsifier row per piece of every claim (TILE; refusal #1 U1 and U2) ----------------------------------

/** TILE splits a claim into the pieces MEMBERS rows quote at ", ", ", or ", ", and ", ", nor ", "; ", " or ", " and " and " nor ". */
const PIECE_SEPARATOR = /, (?:or |and |nor )?|; | or | and | nor /;
const piecesOf = (claim: string): string[] => claim.split(PIECE_SEPARATOR);
/** A section heading, "<NAME> (<reader>):" or "<NAME> (<reader>; <claims>):" - the claims are the text after the reader. */
const HEADING = /^ \* ([A-Z_]+) \(([^;()]+)(?:; (.*))?\):$/;
/** Every claim of the helper's header, in order: a heading's claims keyed <SECTION>, a roster line keyed <SECTION>:<word>. */
const CLAIMS: readonly (readonly [string, string])[] = (() => {
  const claims: [string, string][] = [];
  let section = "";
  for (const line of HEADER) {
    const heading = HEADING.exec(line);
    if (heading !== null) {
      section = heading[1] ?? "";
      if (heading[3] !== undefined) claims.push([section, heading[3]]);
    } else if (line.startsWith(" * - ")) {
      const entry = line.slice(" * - ".length);
      const at = entry.indexOf(": ");
      claims.push([`${section}:${entry.slice(0, at)}`, entry.slice(at + 2)]);
    }
  }
  return claims;
})();
/** One pin: a reading measured on a plant and the reading the claim piece says. */
type Pin = readonly [measure: () => unknown, expected: unknown];
interface MemberRow {
  readonly key: string;
  readonly quote: string;
  readonly pins: readonly Pin[];
}
const member = (key: string, quote: string, ...pins: Pin[]): MemberRow => ({ key, quote, pins });
const pin = (measure: () => unknown, expected: unknown): Pin => [measure, expected];
const files = (...entries: (readonly [string, string])[]): Map<string, string> => new Map(entries);
const EMPTY = "export {};\n";
/** A specifier's resolution from `from` (the cited suite by default) over a planted host. */
const res = (specifier: string, planted?: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>, from: string = SUITE): string =>
  resolutionText(resolveSpecifier(host(planted, links), from, specifier));
const ROUTE_PATH: Readonly<Record<ModuleScope, string>> = { suite: SUITE, local: "test/helpers/lg-member.ts", package: "node_modules/lg-member/index.ts" };
/** A text's routes read in `scope`, at that scope's plant path. */
const routes = (scope: ModuleScope, text: string): string[] => routesOf(ROUTE_PATH[scope], text, scope).map(findingText);
const SCOPE_LIST: readonly ModuleScope[] = ["suite", "local", "package"];
/** The same plant read in the suite, a local module and a package module, each pinned to the literal reading. */
const inEveryScope = (text: string, expected: readonly string[]): Pin[] => SCOPE_LIST.map(scope => pin(() => routes(scope, text), expected));
const writes = (text: string): string[] => writesOf(SUITE, text).map(findingText);
const loadsIn = (text: string, path = "test/helpers/lg-member.ts"): string[] => loadsOf(path, text).map(load => `${load.form} ${load.specifier} :${load.line}`);
const moduleIdentity = (planted: ReadonlyMap<string, string>, file: string, links?: ReadonlyMap<string, string>): string => identityText(new ClosureReader(host(planted, links), SUITE).module(file));
function loadIdentity(specifier: string, planted?: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>): string {
  const reader = new ClosureReader(host(planted, links), SUITE);
  return identityText(reader.identity(reader.resolve(SUITE, specifier)));
}
/** The line of the cited suite a text planted right after its receipt import starts at. */
const PLANT_LINE = read(SUITE).split("\n").indexOf(RECEIPT_IMPORT) + 2;
const VITEST_IMPORT = "import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';";
const VITEST_LINE = read(SUITE).split("\n").indexOf(VITEST_IMPORT) + 1;
const plantSuite = (extra: string): Map<string, string> => files([SUITE, edit(read(SUITE), RECEIPT_IMPORT, `${RECEIPT_IMPORT}\n${extra}`)]);
const suiteChannel = (extra: string): string[] => channelReading(host(plantSuite(extra)), SUITE, { roots: ["cited suite"] });
const suiteImport = (planted: ReadonlyMap<string, string>): string => importReading(host(planted), SUITE).section;
const run = (configText: string, argv: readonly string[] | string = CENSUS_ARGV): string => runReading(RUN_PIN, argv, file => (file === CENSUS_CONFIG ? configText : undefined));
const config = (test: string, top = ""): string => `import { defineConfig } from "vitest/config";\nexport default defineConfig({ ${top}test: { ${test} } });\n`;
const CENSUS_TEST = 'include: ["test/**/*.census.ts"], allowOnly: false';
const SOUND_RUN = (globs: readonly string[]): string =>
  `the census tier runs vitest run --config ${CENSUS_CONFIG}, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include ${JSON.stringify(globs)}, one glob matching ${RUN_PIN}`;
const brokenRun = (why: string): string => `<${CENSUS_CONFIG}${why}>`;
const addedSites = (scan: SrcScan): string[] => [...scan.sites.filter(site => !BASE_SITES.sites.some(base => base.file === site.file && base.line === site.line)).map(siteText), ...scan.breaks];
const sites = (planted: ReadonlyMap<string, string>, links?: ReadonlyMap<string, string>): string[] => addedSites(srcSites(host(planted, links)));
const tagIn = (file: string, text: string): string[] => sites(files([file, text]));
/** The extensions the relative claim names through EXTENSIONS, as this census reads them (pinned equal to the export). */
const EXTENSION_LIST: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ".d.ts", ".js", ".jsx", ".mjs", ".cjs", ".json"];
const pkg = (name: string, manifest: string, ...entries: (readonly [string, string])[]): [string, string][] => [
  [`node_modules/${name}/package.json`, `${manifest}\n`],
  ...entries.map(([file, text]): [string, string] => [`node_modules/${name}/${file}`, text]),
];
const MAIN_PACKAGE = files(...pkg("lg-main", '{"name": "lg-main", "main": "./lib/main.js"}', ["lib/main.js", "export const lgMain = 1;\n"]));
const GONE_PACKAGE = files(...pkg("lg-gone", '{"name": "lg-gone", "exports": {"./x": "./x.js", ".": {"browser": "./b.js"}}}', ["b.js", EMPTY]));
const condition = (exports: string): Map<string, string> =>
  files(...pkg("lg-cond", `{"name": "lg-cond", "exports": ${exports}}`, ...["i", "m", "n", "d", "b"].map((name): [string, string] => [`${name}.js`, EMPTY])));
const COND = "package node_modules/lg-cond/";
const setupChannel = (setup: readonly string[], planted?: ReadonlyMap<string, string>): string[] => channelReading(host(planted), SUITE, { roots: ["setup file"], setup });
const HX = "test/helpers/hx-live-receipt.ts";
const MISSING_LOAD = 'import "./lg-missing.js";';
const brokenHx = `${read(HX)}\n${MISSING_LOAD}\n`;
/** The WRITES name lists, in their claims' order; each name's row and each place's row read every name of its list. */
const MUTATOR_NAMES: readonly string[] = ["__defineGetter__", "__defineSetter__", "__proto__", "assign", "defineProperties", "defineProperty", "deleteProperty", "set", "setPrototypeOf"];
const REFLECTION_NAMES: readonly string[] = ["getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "getOwnPropertyNames", "getOwnPropertySymbols", "getPrototypeOf"];
const SPY_NAMES: readonly string[] = [
  "doMock", "doUnmock", "hoisted", "mock", "mockImplementation", "mockImplementationOnce", "mockRejectedValue", "mockRejectedValueOnce", "mockResolvedValue",
  "mockResolvedValueOnce", "mockReturnValue", "mockReturnValueOnce", "stubEnv", "stubGlobal", "unmock", "withImplementation",
];
type NamedWrite = "mutator member" | "reflection" | "spy or mock member";
/** Each WRITES name form's plant: a base the name is read on, behind a prelude of `lines` lines. */
const WRITE_BASE: Readonly<Record<NamedWrite, { readonly prelude: string; readonly base: string; readonly line: number }>> = {
  "mutator member": { prelude: "const lgT = {};\n", base: "lgT", line: 2 },
  reflection: { prelude: "", base: "Object", line: 1 },
  "spy or mock member": { prelude: 'import { vi } from "vitest";\n', base: "vi", line: 2 },
};
const onBase = (form: NamedWrite): string => `(${WRITE_BASE[form].base} as unknown as Record<string, unknown>)`;
const asMember = (form: NamedWrite, name: string): Pin =>
  pin(() => writes(`${WRITE_BASE[form].prelude}export const lgW = ${onBase(form)}.${name};\n`), [`${form} .${name} :${WRITE_BASE[form].line}`]);
const asKey = (form: NamedWrite, name: string): Pin =>
  pin(() => writes(`${WRITE_BASE[form].prelude}export const lgW = ${onBase(form)}["${name}"];\n`), [`${form} ['${name}'] :${WRITE_BASE[form].line}`]);
const asDestructured = (form: NamedWrite, name: string): Pin =>
  pin(() => writes(`${WRITE_BASE[form].prelude}const { ${name}: lgW } = ${onBase(form)};\nvoid lgW;\n`), [`${form} {${name}} destructured :${WRITE_BASE[form].line}`]);
const asString = (form: NamedWrite, name: string): Pin => pin(() => writes(`const lgKey = "${name}";\nvoid lgKey;\n`), [`${form} '${name}' :1`]);
/** A local module reading `name` as an identifier, as a member name, as a whole string literal or as a string element key. */
const asIdentifierRoute = (name: string, finding: string): Pin => pin(() => routes("local", `export const lgW = ${name};\n`), [finding]);
const asMemberRoute = (name: string, finding: string): Pin => pin(() => routes("local", `export const lgW = (m: Record<string, unknown>): unknown => m.${name};\n`), [finding]);
const asStringRoute = (name: string, finding: string): Pin => pin(() => routes("local", `export const lgW = "${name}";\n`), [finding]);
const asKeyRoute = (name: string, finding: string): Pin => pin(() => routes("local", `export const lgW = (m: Record<string, unknown>): unknown => m["${name}"];\n`), [finding]);
const globalMember = (member: string, keyed: boolean, ...also: string[]): Pin =>
  pin(() => routes("local", keyed ? `export const lgW = globalThis["${member}"];\n` : `export const lgW = globalThis.${member};\n`), [`global object globalThis.${member} :1`, ...also]);
const SENSITIVE_NAMES: readonly string[] = ["inspector", "module", "process", "repl", "vm"];
const sensitiveLoad = (specifier: string): Pin => {
  const file = `test/helpers/lg-sb-${specifier.replace(/\W/g, "-")}.ts`;
  return pin(() => moduleIdentity(files([file, `import * as lgB from "${specifier}";\nexport const lgW = lgB;\n`]), file), `carrier (${file}:1 holds a sensitive builtin route (loads '${specifier}'))`);
};
const codeSite = (extension: string): Pin => {
  const file = `src/workbench/lg-code${extension}`;
  return pin(() => tagIn(file, 'export const LG = "hyperunix.result/1";\n'), [`${file}:1 code whole hyperunix.result/1`]);
};
const LINKED = files(["test/helpers/lg-alias", "test/helpers/lg-real"]);
const NEAR_PACKAGES = files(
  ["test/node_modules/lg-near/package.json", '{"name": "lg-near", "exports": "./index.js"}\n'],
  ["test/node_modules/lg-near/index.js", EMPTY],
  ...pkg("lg-near", '{"name": "lg-near", "exports": "./index.js"}', ["index.js", EMPTY]),
);
const SKIP_PACKAGES = files(
  ["node_modules/node_modules/lg-skip/package.json", '{"name": "lg-skip", "exports": "./index.js"}\n'],
  ["node_modules/node_modules/lg-skip/index.js", EMPTY],
  ...pkg("lg-skip", '{"name": "lg-skip", "exports": "./index.js"}', ["index.js", EMPTY]),
);
const EXPORTS_PACKAGE = files(...pkg("lg-exp", '{"name": "lg-exp", "exports": {"./sub": "./lib/sub.js"}}', ["lib/sub.js", EMPTY], ["sub.js", EMPTY]));
const IMPORTS_NEAR = files(
  ["test/package.json", '{"imports": {"#lg-k": "./lg-near.ts"}}\n'],
  ["package.json", withImports(read("package.json"), { "#lg-k": "./test/lg-far.ts" })],
  ["test/helpers/package.json", '{"name": "lg-no-imports"}\n'],
  ["test/lg-near.ts", EMPTY],
  ["test/lg-far.ts", EMPTY],
);
const IMPORTS_FORMS = files(
  ["test/package.json", '{"imports": {"#lg-c": {"browser": "./lg-b.ts", "import": "./lg-i.ts", "default": "./lg-d.ts"}, "#lg-p/*": "./lg-p/*.ts"}}\n'],
  ...["test/lg-b.ts", "test/lg-i.ts", "test/lg-d.ts", "test/lg-p/x.ts"].map((file): [string, string] => [file, EMPTY]),
);
const MEMBER_ROWS: readonly MemberRow[] = [
  member("RESOLUTION", "paths are root-relative with / separators",
    pin(() => res("./helpers/hx-live-receipt.ts"), "relative test/helpers/hx-live-receipt.ts"),
    pin(() => res("@hyperunix/sdk"), "package node_modules/@hyperunix/sdk/dist/index.js")),
  member("RESOLUTION", "a path through a link reads as written rather than as its target",
    pin(() => res("./helpers/lg-alias/x.js", files(["test/helpers/lg-real/x.ts", EMPTY]), LINKED), "relative test/helpers/lg-alias/x.ts")),
  member("RESOLUTION:builtin", "node: then any name",
    pin(() => res("node:path"), "builtin"),
    pin(() => res("node:lg-no-such-builtin"), "builtin")),
  member("RESOLUTION:builtin", "a bare name node's module.isBuiltin accepts: a builtin module",
    pin(() => res("fs"), "builtin"),
    pin(() => res("sqlite"), "unresolved (no package: no node_modules/sqlite directory from test up to the root)")),
  member("RESOLUTION:builtin", "a builtin is never read from a file",
    pin(() => res("fs", files(...pkg("fs", '{"name": "fs", "main": "./index.js"}', ["index.js", 'import { it } from "vitest";\nexport const lgIt = it;\n']))), "builtin"),
    pin(() => loadIdentity("fs", files(...pkg("fs", '{"name": "fs", "main": "./index.js"}', ["index.js", 'import { it } from "vitest";\nexport const lgIt = it;\n']))), "builtin")),
  member("RESOLUTION:relative", ".",
    pin(() => res(".", files(["test/helpers/lg-dot/index.ts", EMPTY]), undefined, "test/helpers/lg-dot/a.ts"), "relative test/helpers/lg-dot/index.ts")),
  member("RESOLUTION:relative", "..",
    pin(() => res("..", files(["test/helpers/index.ts", EMPTY]), undefined, "test/helpers/lg-dot/a.ts"), "relative test/helpers/index.ts")),
  member("RESOLUTION:relative", "./",
    pin(() => res("./helpers/hx-live-receipt.ts"), "relative test/helpers/hx-live-receipt.ts")),
  member("RESOLUTION:relative", "../ then a path",
    pin(() => res("../package.json"), "relative package.json")),
  member("RESOLUTION:relative", "joined to the importing file's directory",
    pin(() => res("./lg-j.js", files(["test/helpers/lg-j.ts", EMPTY], ["test/lg-j.ts", EMPTY]), undefined, "test/helpers/lg-a.ts"), "relative test/helpers/lg-j.ts"),
    pin(() => res("./lg-j.js", files(["test/helpers/lg-j.ts", EMPTY], ["test/lg-j.ts", EMPTY])), "relative test/lg-j.ts")),
  member("RESOLUTION:relative", "the path itself when it names a file",
    pin(() => res("./helpers/lg-both.js", files(["test/helpers/lg-both.js", EMPTY], ["test/helpers/lg-both.ts", EMPTY])), "relative test/helpers/lg-both.js")),
  member("RESOLUTION:relative", "else the one file among the TypeScript source of a .js",
    pin(() => res("./helpers/hx-live-receipt.js"), "relative test/helpers/hx-live-receipt.ts"),
    pin(() => res("./helpers/lg-amb.js", files(["test/helpers/lg-amb.ts", EMPTY], ["test/helpers/lg-amb.js.ts", EMPTY])), "unresolved (ambiguous: test/helpers/lg-amb.js names 2 files (test/helpers/lg-amb.ts, test/helpers/lg-amb.js.ts))")),
  member("RESOLUTION:relative", ".jsx",
    pin(() => res("./helpers/lg-w.jsx", files(["test/helpers/lg-w.tsx", EMPTY])), "relative test/helpers/lg-w.tsx")),
  member("RESOLUTION:relative", ".mjs",
    pin(() => res("./helpers/lg-w.mjs", files(["test/helpers/lg-w.mts", EMPTY])), "relative test/helpers/lg-w.mts")),
  member("RESOLUTION:relative", ".cjs path",
    pin(() => res("./helpers/lg-w.cjs", files(["test/helpers/lg-w.cts", EMPTY])), "relative test/helpers/lg-w.cts")),
  member("RESOLUTION:relative", "the path with each EXTENSIONS entry added",
    pin(() => EXTENSIONS, EXTENSION_LIST),
    ...EXTENSION_LIST.map((extension, index) => pin(() => res(`./helpers/lg-ext${index}`, files([`test/helpers/lg-ext${index}${extension}`, EMPTY])), `relative test/helpers/lg-ext${index}${extension}`))),
  member("RESOLUTION:relative", "the index with each EXTENSIONS entry added of a directory that holds no package.json",
    ...EXTENSION_LIST.map((extension, index) => pin(() => res(`./helpers/lg-idx${index}`, files([`test/helpers/lg-idx${index}/index${extension}`, EMPTY])), `relative test/helpers/lg-idx${index}/index${extension}`)),
    pin(() => res("./helpers/lg-idxp", files(["test/helpers/lg-idxp/index.ts", EMPTY], ["test/helpers/lg-idxp/package.json", "{}\n"])), "unresolved (directory package: test/helpers/lg-idxp is a directory holding a package.json)")),
  member("RESOLUTION:package", "a bare <name>",
    pin(() => res("lg-sugar", PACKAGES), "package node_modules/lg-sugar/main.js")),
  member("RESOLUTION:package", "@<scope>/<name>",
    pin(() => res("@hyperunix/sdk"), "package node_modules/@hyperunix/sdk/dist/index.js"),
    pin(() => res("@lg-scope-only"), "unresolved (no package: @lg-scope-only names no package)")),
  member("RESOLUTION:package", "then any /<subpath>",
    pin(() => res("@hyperunix/sdk/protocol"), "package node_modules/@hyperunix/sdk/dist/protocol.js"),
    pin(() => res("lg-pattern/a", PACKAGES), "package node_modules/lg-pattern/lib/a.js")),
  member("RESOLUTION:package", "the first node_modules/<name> directory from the importing file's directory up to the root",
    pin(() => res("lg-near", NEAR_PACKAGES), "package test/node_modules/lg-near/index.js"),
    pin(() => res("lg-near", NEAR_PACKAGES, undefined, "test/helpers/lg-a.ts"), "package test/node_modules/lg-near/index.js"),
    pin(() => res("lg-near", NEAR_PACKAGES, undefined, "src/lg-a.ts"), "package node_modules/lg-near/index.js")),
  member("RESOLUTION:package", "skipping a directory named node_modules",
    pin(() => res("lg-skip", SKIP_PACKAGES, undefined, "node_modules/lg-host/index.js"), "package node_modules/lg-skip/index.js")),
  member("RESOLUTION:package", "a vitest home is a vitest module whatever the subpath",
    pin(() => res("vitest"), "package node_modules/vitest"),
    pin(() => res("vitest/lg-no-such-subpath"), "package node_modules/vitest"),
    pin(() => res("@vitest/runner/lg-no-such-subpath"), "package node_modules/@vitest/runner")),
  member("RESOLUTION:package", "any other package resolves a subpath through its package.json exports (EXPORT_TARGETS)",
    pin(() => res("lg-exp/sub", EXPORTS_PACKAGE), "package node_modules/lg-exp/lib/sub.js"),
    pin(() => res("lg-exp/lib/sub.js", EXPORTS_PACKAGE), "unresolved (no export: the exports of node_modules/lg-exp hold no target for ./lib/sub.js)")),
  member("RESOLUTION:package", "a package without exports reads a subpath as a relative path in it",
    pin(() => res("lg-main/lib/main.js", MAIN_PACKAGE), "package node_modules/lg-main/lib/main.js"),
    pin(() => res("lg-main/lib/main", MAIN_PACKAGE), "package node_modules/lg-main/lib/main.js")),
  member("RESOLUTION:package", "with no subpath it reads its module entry",
    pin(() => res("lg-entry", files(...pkg("lg-entry", '{"name": "lg-entry", "module": "./m.js", "main": "./c.js"}', ["m.js", EMPTY], ["c.js", EMPTY], ["index.js", EMPTY]))), "package node_modules/lg-entry/m.js")),
  member("RESOLUTION:package", "else its main entry",
    pin(() => res("lg-main", MAIN_PACKAGE), "package node_modules/lg-main/lib/main.js")),
  member("RESOLUTION:package", "else index.js",
    pin(() => res("lg-index", files(...pkg("lg-index", '{"name": "lg-index"}', ["index.js", EMPTY]))), "package node_modules/lg-index/index.js"),
    pin(() => res("lg-bare", files(["node_modules/lg-bare/index.js", EMPTY])), "package node_modules/lg-bare/index.js")),
  member("RESOLUTION:package imports", "# then a key: the nearest package.json from the importing file's directory up to the root that holds an imports map",
    pin(() => res("#lg-k", IMPORTS_NEAR), "package imports test/lg-near.ts"),
    pin(() => res("#lg-k", IMPORTS_NEAR, undefined, "test/helpers/lg-a.ts"), "package imports test/lg-near.ts"),
    pin(() => res("#lg-k", IMPORTS_NEAR, undefined, "src/lg-a.ts"), "package imports test/lg-far.ts")),
  member("RESOLUTION:package imports", "read like exports",
    pin(() => res("#lg-c", IMPORTS_FORMS), "package imports test/lg-i.ts"),
    pin(() => res("#lg-p/x", IMPORTS_FORMS), "package imports test/lg-p/x.ts")),
  member("RESOLUTION:package imports", "a target that does not open with ./ resolves as a package from that package.json's directory",
    pin(() => res("#lg-pkg", new Map([...PACKAGES, ["test/package.json", '{"imports": {"#lg-pkg": "lg-sugar"}}\n']])), "package imports node_modules/lg-sugar/main.js"),
    pin(() => res("#lg-pkg", new Map([...PACKAGES, ["test/package.json", '{"imports": {"#lg-pkg": "lg-sugar"}}\n'], ["test/node_modules/lg-sugar/package.json", '{"name": "lg-sugar", "exports": "./near.js"}\n'], ["test/node_modules/lg-sugar/near.js", EMPTY]])), "package imports test/node_modules/lg-sugar/near.js")),
  member("UNRESOLVED", "each reads unresolved naming its form with the reason",
    pin(() => resolveSpecifier(BASE, SUITE, ""), { kind: "unresolved", form: "empty", why: "an empty specifier" }),
    pin(() => resolveSpecifier(BASE, SUITE, "/etc/hosts"), { kind: "unresolved", form: "absolute path", why: "/etc/hosts is an absolute path" })),
  member("UNRESOLVED:absolute path", "a specifier opening with /",
    pin(() => res("/etc/hosts"), "unresolved (absolute path: /etc/hosts is an absolute path)")),
  member("UNRESOLVED:url scheme", "a specifier opening with a scheme such as file:",
    pin(() => res("file:///etc/hosts"), "unresolved (url scheme: file:///etc/hosts opens with a URL scheme)")),
  member("UNRESOLVED:url scheme", "data:",
    pin(() => res("data:text/javascript,export default 1"), "unresolved (url scheme: data:text/javascript,export default 1 opens with a URL scheme)")),
  member("UNRESOLVED:url scheme", "http:",
    pin(() => res("http://localhost/lg.js"), "unresolved (url scheme: http://localhost/lg.js opens with a URL scheme)")),
  member("UNRESOLVED:query", "a specifier holding ? anywhere (a vite query)",
    pin(() => res("./helpers/hx-live-receipt.js?raw"), "unresolved (query: ./helpers/hx-live-receipt.js?raw holds a query or hash suffix)"),
    pin(() => res("?lg"), "unresolved (query: ?lg holds a query or hash suffix)")),
  member("UNRESOLVED:query", "a specifier holding # past its first character (a hash suffix)",
    pin(() => res("./helpers/hx-live-receipt.js#lg"), "unresolved (query: ./helpers/hx-live-receipt.js#lg holds a query or hash suffix)"),
    pin(() => res("#lg-unmapped"), "unresolved (no imports map: no package.json up to the root holds an imports map for #lg-unmapped)")),
  member("UNRESOLVED:empty", "an empty specifier",
    pin(() => res(""), "unresolved (empty: an empty specifier)")),
  member("UNRESOLVED:outside the root", "a relative path that leaves the root",
    pin(() => res("../../outside.js"), "unresolved (outside the root: ../outside.js leaves the root)"),
    pin(() => res("../../../outside.js", undefined, undefined, "test/helpers/lg-a.ts"), "unresolved (outside the root: ../outside.js leaves the root)")),
  member("UNRESOLVED:no file", "a relative path that names no file",
    pin(() => res("./helpers/lg-no-such-module.js"), "unresolved (no file: test/helpers/lg-no-such-module.js names no file)")),
  member("UNRESOLVED:no file", "a package subpath that names no file",
    pin(() => res("lg-main/lg-no-such.js", MAIN_PACKAGE), "unresolved (no file: node_modules/lg-main/lg-no-such.js names no file)")),
  member("UNRESOLVED:ambiguous", "more than one of the relative candidates is a file",
    pin(() => res("./helpers/lg-twice", files(["test/helpers/lg-twice.ts", EMPTY], ["test/helpers/lg-twice.mts", EMPTY])), "unresolved (ambiguous: test/helpers/lg-twice names 2 files (test/helpers/lg-twice.ts, test/helpers/lg-twice.mts))"),
    pin(() => res("./helpers/lg-thrice", files(["test/helpers/lg-thrice.ts", EMPTY], ["test/helpers/lg-thrice.js", EMPTY], ["test/helpers/lg-thrice.json", "{}\n"])), "unresolved (ambiguous: test/helpers/lg-thrice names 3 files (test/helpers/lg-thrice.ts, test/helpers/lg-thrice.js, test/helpers/lg-thrice.json))")),
  member("UNRESOLVED:directory package", "a relative path naming a directory that holds a package.json",
    pin(() => res("./helpers/lg-dir", files(["test/helpers/lg-dir/package.json", '{"main": "./main.js"}\n'], ["test/helpers/lg-dir/index.ts", EMPTY])), "unresolved (directory package: test/helpers/lg-dir is a directory holding a package.json)")),
  member("UNRESOLVED:no package", "a bare specifier whose node_modules/<name> directory is found nowhere up to the root",
    pin(() => res("lg-no-such-package"), "unresolved (no package: no node_modules/lg-no-such-package directory from test up to the root)")),
  member("UNRESOLVED:no export", "an exports map that holds no key for the subpath",
    pin(() => res("@hyperunix/sdk/lg-no-such-subpath"), "unresolved (no export: the exports of node_modules/@hyperunix/sdk hold no target for ./lg-no-such-subpath)")),
  member("UNRESOLVED:no export", "an imports map that holds no key for the specifier",
    pin(() => res("#lg-other", files(["test/package.json", '{"imports": {"#lg-one": "./lg-one.ts"}}\n'])), "unresolved (no export: the imports map of test/package.json holds no target for #lg-other)")),
  member("UNRESOLVED:no export", "a map whose target resolves to nothing",
    pin(() => res("lg-gone/x", GONE_PACKAGE), "unresolved (no export: the target ./x.js of node_modules/lg-gone names no file)"),
    pin(() => res("lg-gone", GONE_PACKAGE), "unresolved (no export: the exports of node_modules/lg-gone hold no target for .)")),
  member("UNRESOLVED:no imports map", "a # specifier with no package.json holding an imports map up to the root",
    pin(() => res("#lg-unmapped"), "unresolved (no imports map: no package.json up to the root holds an imports map for #lg-unmapped)")),
  member("EXPORT_TARGETS", "an imports map reads with these forms as an exports map does",
    pin(() => resolutionText(resolveSpecifier(host(IMPORTS_FORMS), SUITE, "#lg-c")), "package imports test/lg-i.ts"),
    pin(() => resolutionText(resolveSpecifier(host(IMPORTS_FORMS), SUITE, "#lg-c", { targets: without(EXPORT_TARGETS, "conditions") })), "unresolved (no export: the imports map of test/package.json holds no target for #lg-c)")),
  member("EXPORT_TARGETS:sugar", "an exports string maps the subpath . alone",
    pin(() => res("lg-sugar", PACKAGES), "package node_modules/lg-sugar/main.js"),
    pin(() => res("lg-sugar/main.js", PACKAGES), "unresolved (no export: the exports of node_modules/lg-sugar hold no target for ./main.js)")),
  member("EXPORT_TARGETS:sugar", "an exports array maps the subpath . alone",
    pin(() => res("lg-sarr", files(...pkg("lg-sarr", '{"name": "lg-sarr", "exports": ["./main.js"]}', ["main.js", EMPTY]))), "package node_modules/lg-sarr/main.js"),
    pin(() => res("lg-sarr/main.js", files(...pkg("lg-sarr", '{"name": "lg-sarr", "exports": ["./main.js"]}', ["main.js", EMPTY]))), "unresolved (no export: the exports of node_modules/lg-sarr hold no target for ./main.js)")),
  member("EXPORT_TARGETS:sugar", "an exports object with no key opening with . maps the subpath . alone",
    pin(() => res("lg-sobj", files(...pkg("lg-sobj", '{"name": "lg-sobj", "exports": {"import": "./main.js"}}', ["main.js", EMPTY]))), "package node_modules/lg-sobj/main.js"),
    pin(() => res("lg-sobj/main.js", files(...pkg("lg-sobj", '{"name": "lg-sobj", "exports": {"import": "./main.js"}}', ["main.js", EMPTY]))), "unresolved (no export: the exports of node_modules/lg-sobj hold no target for ./main.js)")),
  member("EXPORT_TARGETS:exact key", "a key equal to the subpath",
    pin(() => res("lg-keys/a", files(...pkg("lg-keys", '{"name": "lg-keys", "exports": {"./a": "./exact.js"}}', ["exact.js", EMPTY], ["b.js", EMPTY]))), "package node_modules/lg-keys/exact.js"),
    pin(() => res("lg-keys/b.js", files(...pkg("lg-keys", '{"name": "lg-keys", "exports": {"./a": "./exact.js"}}', ["exact.js", EMPTY], ["b.js", EMPTY]))), "unresolved (no export: the exports of node_modules/lg-keys hold no target for ./b.js)")),
  member("EXPORT_TARGETS:exact key", "before any pattern key",
    pin(() => res("lg-keys/a", files(...pkg("lg-keys", '{"name": "lg-keys", "exports": {"./*": "./pattern/*.js", "./a": "./exact.js"}}', ["exact.js", EMPTY], ["pattern/a.js", EMPTY], ["pattern/b.js", EMPTY]))), "package node_modules/lg-keys/exact.js"),
    pin(() => res("lg-keys/b", files(...pkg("lg-keys", '{"name": "lg-keys", "exports": {"./*": "./pattern/*.js", "./a": "./exact.js"}}', ["exact.js", EMPTY], ["pattern/a.js", EMPTY], ["pattern/b.js", EMPTY]))), "package node_modules/lg-keys/pattern/b.js")),
  member("EXPORT_TARGETS:pattern key", "a key holding one *",
    pin(() => res("lg-pattern/a", PACKAGES), "package node_modules/lg-pattern/lib/a.js"),
    pin(() => res("lg-pat/a.js", files(...pkg("lg-pat", '{"name": "lg-pat", "exports": {"./*.js": "./lib/*.js", "./two/*/*": "./two/*/*.js"}}', ["lib/a.js", EMPTY], ["two/x/y.js", EMPTY]))), "package node_modules/lg-pat/lib/a.js"),
    pin(() => res("lg-pat/two/x/*", files(...pkg("lg-pat", '{"name": "lg-pat", "exports": {"./*.js": "./lib/*.js", "./two/*/*": "./two/*/*.js"}}', ["lib/a.js", EMPTY], ["two/x/x.js", EMPTY]))), "unresolved (no export: the exports of node_modules/lg-pat hold no target for ./two/x/*)")),
  member("EXPORT_TARGETS:pattern key", "the matching key with the longest part before the *",
    pin(() => res("lg-long/x/y", files(...pkg("lg-long", '{"name": "lg-long", "exports": {"./*": "./a/*.js", "./x/*": "./b/*.js"}}', ["a/x/y.js", EMPTY], ["b/y.js", EMPTY]))), "package node_modules/lg-long/b/y.js")),
  member("EXPORT_TARGETS:pattern key", "its match put in place of each * of the target",
    pin(() => res("lg-each/x", files(...pkg("lg-each", '{"name": "lg-each", "exports": {"./*": "./lib/*/*.js"}}', ["lib/x/x.js", EMPTY]))), "package node_modules/lg-each/lib/x/x.js")),
  member("EXPORT_TARGETS:conditions", "an object target is read in key order",
    pin(() => res("lg-cond", condition('{"default": "./d.js", "import": "./i.js"}')), `${COND}d.js`),
    pin(() => res("lg-cond", condition('{"module": "./m.js", "import": "./i.js"}')), `${COND}m.js`)),
  member("EXPORT_TARGETS:conditions", "its first condition key whose target maps to a string wins",
    pin(() => res("lg-cond", condition('{"import": {"browser": "./b.js"}, "default": "./d.js"}')), `${COND}d.js`),
    pin(() => res("lg-cond", condition('{"browser": "./b.js", "default": "./d.js"}')), `${COND}d.js`)),
  member("EXPORT_TARGETS:conditions", "the condition keys are import",
    pin(() => res("lg-cond", condition('{"import": "./i.js", "default": "./d.js"}')), `${COND}i.js`)),
  member("EXPORT_TARGETS:conditions", "module",
    pin(() => res("lg-cond", condition('{"module": "./m.js", "default": "./d.js"}')), `${COND}m.js`)),
  member("EXPORT_TARGETS:conditions", "node",
    pin(() => res("lg-cond", condition('{"node": "./n.js", "default": "./d.js"}')), `${COND}n.js`)),
  member("EXPORT_TARGETS:conditions", "default",
    pin(() => res("lg-cond", condition('{"default": "./d.js"}')), `${COND}d.js`)),
  member("EXPORT_TARGETS:array", "an array target's first entry that maps to a string",
    pin(() => res("lg-array", PACKAGES), "package node_modules/lg-array/main.js"),
    pin(() => res("lg-cond", condition('{".": ["./i.js", "./d.js"]}')), `${COND}i.js`)),
  member("EXPORT_TARGETS:string", "a string target opening with ./ is a file in the package",
    pin(() => res("lg-sugar", PACKAGES), "package node_modules/lg-sugar/main.js"),
    pin(() => res("lg-out", new Map([...PACKAGES, ...pkg("lg-out", '{"name": "lg-out", "exports": "./../lg-sugar/main.js"}')])), "unresolved (outside the root: the target ./../lg-sugar/main.js leaves node_modules/lg-out)")),
  member("EXPORT_TARGETS:string", "which must exist",
    pin(() => res("lg-gone/x", GONE_PACKAGE), "unresolved (no export: the target ./x.js of node_modules/lg-gone names no file)")),
  member("EXPORT_TARGETS:string", "any other string target resolves as a package specifier from the package's directory",
    pin(() => res("lg-redirect", new Map([...PACKAGES, ...pkg("lg-redirect", '{"name": "lg-redirect", "exports": "lg-sugar"}')])), "package node_modules/lg-sugar/main.js"),
    pin(() => res("lg-redirect", new Map([...PACKAGES, ...pkg("lg-redirect", '{"name": "lg-redirect", "exports": "lg-sugar"}', ["node_modules/lg-sugar/package.json", '{"name": "lg-sugar", "exports": "./near.js"}\n'], ["node_modules/lg-sugar/near.js", EMPTY])])), "package node_modules/lg-redirect/node_modules/lg-sugar/near.js")),
  member("IDENTITY", "a module is read once per reader",
    pin(() => {
      const base = host(files(
        ["test/helpers/lg-once-a.ts", 'import "./lg-once-b.js";\nimport "./lg-once-c.js";\n'],
        ["test/helpers/lg-once-b.ts", 'import "./lg-once-c.js";\n'],
        ["test/helpers/lg-once-c.ts", EMPTY],
      ));
      const reads = new Map<string, number>();
      const counted: ModuleHost = { ...base, read: path => {
        reads.set(path, (reads.get(path) ?? 0) + 1);
        return base.read(path);
      } };
      const reader = new ClosureReader(counted, SUITE);
      return [identityText(reader.module("test/helpers/lg-once-a.ts")), reads.get("test/helpers/lg-once-c.ts")];
    }, ["module", 1])),
  member("IDENTITY", "its identity is cached",
    pin(() => {
      const reader = new ClosureReader(host(files(["test/helpers/lg-once-a.ts", EMPTY])), SUITE);
      const first = reader.module("test/helpers/lg-once-a.ts");
      const again = reader.module("test/helpers/lg-once-a.ts");
      return first === again;
    }, true)),
  member("IDENTITY:vitest", "a resolved file under a vitest home",
    pin(() => loadIdentity("../node_modules/@vitest/runner/dist/index.js"), "vitest (@vitest/runner)"),
    pin(() => loadIdentity("../node_modules/vitest/dist/index.js"), "vitest (vitest)")),
  member("IDENTITY:vitest", "a vitest home is a node_modules/vitest directory by its real path",
    pin(() => loadIdentity("vitest"), "vitest (vitest)"),
    pin(() => loadIdentity("./helpers/lg-vt-link/dist/index.js", undefined, files(["test/helpers/lg-vt-link", "node_modules/vitest"])), "vitest (vitest)")),
  member("IDENTITY:vitest", "a node_modules/@vitest/<name> directory by its real path",
    pin(() => loadIdentity("@vitest/runner"), "vitest (@vitest/runner)"),
    pin(() => loadIdentity("./helpers/lg-runner/index.js", PACKAGES, files(["test/helpers/lg-runner", "node_modules/@vitest/lg-linked"])), "vitest (@vitest/lg-linked)")),
  member("IDENTITY:vitest", "a package directory whose package.json name is vitest",
    pin(() => loadIdentity("lg-vt", files(...pkg("lg-vt", '{"name": "vitest", "main": "./index.js"}', ["index.js", EMPTY]))), "vitest (vitest)")),
  member("IDENTITY:vitest", "a package directory whose package.json name opens with @vitest/",
    pin(() => loadIdentity("lg-vitest-named", PACKAGES), "vitest (@vitest/lg-named)"),
    pin(() => loadIdentity("lg-vx", files(...pkg("lg-vx", '{"name": "@vitestx/lg", "main": "./index.js"}', ["index.js", EMPTY]))), "module")),
  member("IDENTITY:carrier", "a module that is no vitest module but has a load that resolves to a vitest module",
    pin(() => moduleIdentity(files(["test/helpers/lg-c1.ts", 'import { it } from "vitest";\nexport const lgIt = it;\n']), "test/helpers/lg-c1.ts"), "carrier (test/helpers/lg-c1.ts:1 loads 'vitest' (vitest vitest))")),
  member("IDENTITY:carrier", "one with a load that resolves to a carrier",
    pin(() => moduleIdentity(files(["test/helpers/lg-c2a.ts", 'export { lgB } from "./lg-c2b.js";\n'], ["test/helpers/lg-c2b.ts", 'import { it } from "vitest";\nexport const lgB = it;\n']), "test/helpers/lg-c2a.ts"),
      "carrier (test/helpers/lg-c2a.ts:1 loads './lg-c2b.js' (carrier test/helpers/lg-c2b.ts:1 loads 'vitest' (vitest vitest)))")),
  member("IDENTITY:carrier", "one that holds a route ROUTE_FORMS reads in its scope",
    pin(() => moduleIdentity(files(["test/helpers/lg-c3.ts", "export const lgG = globalThis;\n"]), "test/helpers/lg-c3.ts"), "carrier (test/helpers/lg-c3.ts:1 holds a global object route (globalThis as a VariableDeclaration))"),
    pin(() => moduleIdentity(files(...pkg("lg-c4", '{"name": "lg-c4", "main": "./index.js"}', ["index.js", 'export const lgCode = new Function("return 1");\n'])), "node_modules/lg-c4/index.js"), "module")),
  member("IDENTITY:builtin", "a builtin module",
    pin(() => loadIdentity("node:fs"), "builtin")),
  member("IDENTITY:module", "any other resolved module",
    pin(() => loadIdentity("@hyperunix/sdk"), "module"),
    pin(() => moduleIdentity(files(["test/helpers/lg-m.ts", "export const lgM = 1;\n"]), "test/helpers/lg-m.ts"), "module")),
  member("SCOPES:suite", "the cited suite itself",
    pin(() => scopeOf(BASE, SUITE, SUITE), "suite"),
    pin(() => scopeOf(BASE, CENSUS_HELPER_SUITE, SUITE), "local")),
  member("SCOPES:local", "any other module: its path passes through no node_modules directory",
    pin(() => scopeOf(BASE, "src/workbench/observation.ts", SUITE), "local")),
  member("SCOPES:local", "its real path passes through none",
    pin(() => scopeOf(diskHost(ROOT, new Map(), files(["test/helpers/lg-src", "src/workbench"])), "test/helpers/lg-src/observation.ts", SUITE), "local"),
    pin(() => scopeOf(diskHost(ROOT, new Map(), files(["test/helpers/lg-sdk", "node_modules/@hyperunix/sdk"])), "test/helpers/lg-sdk/dist/index.js", SUITE), "package")),
  member("SCOPES:package", "a module whose path passes through a node_modules directory",
    pin(() => scopeOf(BASE, "node_modules/@hyperunix/sdk/dist/index.js", SUITE), "package")),
  member("SCOPES:package", "a module whose real path passes through one",
    pin(() => scopeOf(diskHost(ROOT, new Map(), files(["test/helpers/lg-sdk", "node_modules/@hyperunix/sdk"])), "test/helpers/lg-sdk/dist/index.js", SUITE), "package")),
  member("LOADS", "each load is resolved from the module's own path",
    pin(() => moduleIdentity(files(["test/helpers/lg-own.ts", 'import "./lg-own-b.js";\n'], ["test/helpers/lg-own-b.ts", 'import "vitest";\n'], ["test/lg-own-b.ts", EMPTY]), "test/helpers/lg-own.ts"),
      "carrier (test/helpers/lg-own.ts:1 loads './lg-own-b.js' (carrier test/helpers/lg-own-b.ts:1 loads 'vitest' (vitest vitest)))")),
  member("LOADS", "a .json file loads nothing",
    pin(() => loadsIn('import "vitest";\n', "test/helpers/lg-data.json"), []),
    pin(() => moduleIdentity(files(["test/helpers/lg-data.json", '{"import": "vitest"}\n']), "test/helpers/lg-data.json"), "module")),
  member("LOADS", "any other file not parsed as code loads nothing",
    pin(() => loadsIn('import "vitest";\n', "test/helpers/lg-notes.md"), []),
    pin(() => loadsIn('import "vitest";\n', "test/helpers/lg-notes.txt"), [])),
  member("LOADS:import declaration", "the specifier of an import declaration",
    pin(() => loadsIn('import { lgA } from "./lg-a.js";\nimport "./lg-side.js";\nimport * as lgNs from "./lg-ns.js";\n'), ["import declaration ./lg-a.js :1", "import declaration ./lg-side.js :2", "import declaration ./lg-ns.js :3"])),
  member("LOADS:import declaration", "type-only included",
    pin(() => loadsIn('import type { LgA } from "./lg-a.js";\nimport { type LgB } from "./lg-b.js";\n'), ["import declaration ./lg-a.js :1", "import declaration ./lg-b.js :2"])),
  member("LOADS:export declaration", "the specifier of an export declaration with a from clause",
    pin(() => loadsIn('export { lgA } from "./lg-a.js";\nexport * from "./lg-b.js";\nconst lgC = 1;\nexport { lgC };\n'), ["export declaration ./lg-a.js :1", "export declaration ./lg-b.js :2"])),
  member("LOADS:export declaration", "type-only included",
    pin(() => loadsIn('export type { LgA } from "./lg-a.js";\n'), ["export declaration ./lg-a.js :1"])),
  member("LOADS:import-equals", "the specifier of import <name> = require(<specifier>)",
    pin(() => loadsIn('import lgC = require("./lg-c.js");\n'), ["import-equals ./lg-c.js :1"]),
    pin(() => loadsIn("namespace LgNs { export const inner = 1; }\nimport lgN = LgNs.inner;\n"), [])),
  member("LOADS:import type", "the specifier of an import type: import(<specifier>) in a type position",
    pin(() => loadsIn('type LgD = import("./lg-d.js").LgD;\n'), ["import type ./lg-d.js :1"])),
  member("LOADS:dynamic import", "the first argument of an import() call when it is a string literal",
    pin(() => loadsIn('const lgE = import("./lg-e.js");\nconst lgG = (name: string): Promise<unknown> => import(name);\n'), ["dynamic import ./lg-e.js :1"])),
  member("LOADS:dynamic import", "when it is a no-substitution template",
    pin(() => loadsIn("const lgF = import(`./lg-f.js`);\n"), ["dynamic import ./lg-f.js :1"])),
  member("LOADS:require call", "the first argument of a call of an identifier require when it is a string literal",
    pin(() => loadsIn('const lgG = require("./lg-g.js");\nconst lgI = module.require("./lg-i.js");\n'), ["require call ./lg-g.js :1"])),
  member("LOADS:require call", "when it is a no-substitution template",
    pin(() => loadsIn("const lgH = require(`./lg-h.js`);\n"), ["require call ./lg-h.js :1"])),
  member("ROUTES", "a module holding one is a carrier",
    pin(() => moduleIdentity(files(["test/helpers/lg-r.ts", "export const lgMeta = import.meta.dirname;\n"]), "test/helpers/lg-r.ts"), "carrier (test/helpers/lg-r.ts:1 holds a import meta route (import.meta.dirname))")),
  member("ROUTES", "each route of the cited suite is a CHANNEL finding",
    pin(() => suiteChannel("const lgMeta = import.meta.dirname;"), [`cited suite: import meta import.meta.dirname at line ${PLANT_LINE}`])),
  member("ROUTES:dynamic load", "in every scope",
    ...inEveryScope("export const lgLoad = (name: string): Promise<unknown> => import(name);\n", ["dynamic load import() of a Identifier :1"])),
  member("ROUTES:dynamic load", "an import() call whose first argument is no string literal (a no-substitution template counts as one)",
    pin(() => routes("local", "export const lgA = (name: string): Promise<unknown> => import(name);\n"), ["dynamic load import() of a Identifier :1"]),
    pin(() => routes("local", `export const lgB = (n: number): Promise<unknown> => import(\`./lg-\${n}.js\`);\n`), ["dynamic load import() of a TemplateExpression :1"]),
    pin(() => routes("local", 'export const lgC = import("./lg-c.js");\nexport const lgD = import(`./lg-d.js`);\n'), [])),
  member("ROUTES:dynamic load", "a call of an identifier require whose first argument is no string literal (a no-substitution template counts as one)",
    pin(() => routes("local", "export const lgA = (name: string): unknown => require(name);\n"), ["dynamic load require() of a Identifier :1"]),
    pin(() => routes("local", 'export const lgC = require("./lg-c.js");\nexport const lgD = require(`./lg-d.js`);\n'), [])),
  member("ROUTES:dynamic load", "either call with no argument",
    pin(() => routes("local", "export const lgA = (): unknown => require();\n"), ["dynamic load require() of nothing :1"]),
    pin(() => routes("local", "export const lgB = (): Promise<unknown> => import();\n"), ["dynamic load import() of nothing :1"])),
  member("ROUTES:loader name", "in every scope",
    ...inEveryScope('import { createRequire } from "node:module";\nexport const lgLoad = createRequire;\n', ["loader name createRequire :1", "loader name createRequire :2"])),
  member("ROUTES:loader name", "the loader names createRequire", asIdentifierRoute("createRequire", "loader name createRequire :1")),
  member("ROUTES:loader name", "getBuiltinModule", asIdentifierRoute("getBuiltinModule", "loader name getBuiltinModule :1")),
  member("ROUTES:loader name", "each read as an identifier",
    asIdentifierRoute("createRequire", "loader name createRequire :1"),
    asIdentifierRoute("getBuiltinModule", "loader name getBuiltinModule :1")),
  member("ROUTES:loader name", "as a member name",
    asMemberRoute("createRequire", "loader name createRequire :1"),
    asMemberRoute("getBuiltinModule", "loader name getBuiltinModule :1")),
  member("ROUTES:loader name", "as a whole string literal",
    asStringRoute("createRequire", "loader name 'createRequire' :1"),
    asStringRoute("getBuiltinModule", "loader name 'getBuiltinModule' :1")),
  member("ROUTES:loader name", "the loader member names binding", asMemberRoute("binding", "loader name .binding :1")),
  member("ROUTES:loader name", "dlopen", asMemberRoute("dlopen", "loader name .dlopen :1")),
  member("ROUTES:loader name", "_linkedBinding", asMemberRoute("_linkedBinding", "loader name ._linkedBinding :1")),
  member("ROUTES:loader name", "each read as a member name",
    asMemberRoute("binding", "loader name .binding :1"),
    asMemberRoute("dlopen", "loader name .dlopen :1"),
    asMemberRoute("_linkedBinding", "loader name ._linkedBinding :1"),
    pin(() => routes("local", 'export const lgW = "dlopen";\nexport const lgV = (binding: number): number => binding;\n'), [])),
  member("ROUTES:loader name", "as a string element key",
    asKeyRoute("binding", "loader name 'binding' :1"),
    asKeyRoute("dlopen", "loader name 'dlopen' :1"),
    asKeyRoute("_linkedBinding", "loader name '_linkedBinding' :1")),
  member("ROUTES:loader name", "an identifier require anywhere but as the callee of a call",
    pin(() => routes("local", "export const lgW = require;\n"), ["loader name require, not called :1"]),
    pin(() => routes("local", "export const lgW = [require];\n"), ["loader name require, not called :1"]),
    pin(() => routes("local", 'export const lgW = require("./lg-x.js");\nexport const lgV = (m: { require: unknown }): unknown => m.require;\n'), [])),
  member("ROUTES:loader member", "in every scope",
    ...inEveryScope('export const lgW = (vi: Record<string, unknown>): unknown => vi["importActual"];\n', ["loader member ['importActual'] :1"])),
  member("ROUTES:loader member", "the loader members importActual", pin(() => routes("local", "export const lgW = (vi: Record<string, unknown>): unknown => vi.importActual;\n"), ["loader member .importActual :1"])),
  member("ROUTES:loader member", "importMock", pin(() => routes("local", "export const lgW = (vi: Record<string, unknown>): unknown => vi.importMock;\n"), ["loader member .importMock :1"])),
  member("ROUTES:loader member", "each read as an identifier",
    pin(() => routes("local", "export const lgW = (importActual: unknown): unknown => importActual;\n"), ["loader member importActual :1", "loader member importActual :1"]),
    pin(() => routes("local", "export const lgW = (importMock: unknown): unknown => importMock;\n"), ["loader member importMock :1", "loader member importMock :1"])),
  member("ROUTES:loader member", "as a member name",
    pin(() => routes("local", "export const lgW = (vi: Record<string, unknown>): unknown => vi.importActual;\n"), ["loader member .importActual :1"]),
    pin(() => routes("local", "export const lgW = (vi: Record<string, unknown>): unknown => vi.importMock;\n"), ["loader member .importMock :1"])),
  member("ROUTES:loader member", "as a whole string literal",
    pin(() => routes("local", 'export const lgW = "importActual";\n'), ["loader member 'importActual' :1"]),
    pin(() => routes("local", 'export const lgW = "importMock";\n'), ["loader member 'importMock' :1"]),
    pin(() => routes("local", 'export const lgW = (vi: Record<string, unknown>): unknown => vi["importMock"];\n'), ["loader member ['importMock'] :1"])),
  member("ROUTES:loader member", "on any base",
    pin(() => routes("local", "export const lgW = (f: () => Record<string, unknown>): unknown => f().importActual;\n"), ["loader member .importActual :1"]),
    pin(() => routes("local", "export const lgW = (o: { inner: Record<string, unknown> }): unknown => o.inner.importMock;\n"), ["loader member .importMock :1"])),
  member("ROUTES:vite name", "in every scope",
    ...inEveryScope("export const lgW = (globalThis as Record<string, unknown>).__vitest_worker__;\n", ["vite name __vitest_worker__ :1"])),
  member("ROUTES:vite name", "a name beginning __vite read as an identifier",
    pin(() => routes("local", "export const lgW = __vite_ssr_import__;\n"), ["vite name __vite_ssr_import__ :1"])),
  member("ROUTES:vite name", "as a member name",
    pin(() => routes("local", "export const lgW = (g: Record<string, unknown>): unknown => g.__vitest_worker__;\n"), ["vite name __vitest_worker__ :1"])),
  member("ROUTES:vite name", "as a string literal",
    pin(() => routes("local", 'export const lgW = "__vite_ssr_dynamic_import__";\n'), ["vite name '__vite_ssr_dynamic_import__' :1"])),
  member("ROUTES:vite name", "as a no-substitution template",
    pin(() => routes("local", "export const lgW = `__vite_ssr_exports__`;\n"), ["vite name '__vite_ssr_exports__' :1"])),
  member("ROUTES:vite name", "as a template part",
    pin(() => routes("local", `export const lgW = (k: string): string => \`__vite\${k}\`;\n`), ["vite name '__vite' :1"]),
    pin(() => routes("local", `export const lgW = (a: string, b: string): string => \`\${a}__vite_m\${b}\`;\n`), ["vite name '__vite_m' :1"]),
    pin(() => routes("local", `export const lgW = (a: string): string => \`\${a}__vite_t\`;\n`), ["vite name '__vite_t' :1"])),
  member("ROUTES:vite name", "vite's injected loaders are such names",
    pin(() => routes("local", "export const lgW = [__vite_ssr_import__, __vite_ssr_dynamic_import__];\n"), ["vite name __vite_ssr_import__ :1", "vite name __vite_ssr_dynamic_import__ :1"])),
  member("ROUTES:vite name", "vitest's __vitest_index__ handle is one",
    pin(() => routes("local", "export const lgW = (g: Record<string, unknown>): unknown => g.__vitest_index__;\n"), ["vite name __vitest_index__ :1"])),
  member("ROUTES:import meta", "in every scope",
    ...inEveryScope("export const lgW = import.meta.dirname;\n", ["import meta import.meta.dirname :1"])),
  member("ROUTES:import meta", "import.meta read other than as the base of import.meta.url",
    pin(() => routes("local", "export const lgW = import.meta;\n"), ["import meta import.meta :1"]),
    pin(() => routes("local", "export const lgW = import.meta.url;\n"), []),
    pin(() => routes("local", 'export const lgW = import.meta["url"];\n'), ["import meta import.meta :1"])),
  member("ROUTES:sensitive builtin", "in every scope",
    pin(() => suiteChannel('import { runInThisContext } from "node:vm";'), [`cited suite: sensitive builtin 'node:vm' at line ${PLANT_LINE}`]),
    sensitiveLoad("node:vm"),
    pin(() => moduleIdentity(files(...pkg("lg-vm", '{"name": "lg-vm", "exports": "./index.js"}', ["index.js", 'import { runInThisContext } from "node:vm";\nexport const lgW = runInThisContext;\n'])), "node_modules/lg-vm/index.js"),
      "carrier (node_modules/lg-vm/index.js:1 holds a sensitive builtin route (loads 'node:vm'))")),
  member("ROUTES:sensitive builtin", "a load that resolves to one of the builtins inspector",
    sensitiveLoad("node:inspector"),
    pin(() => moduleIdentity(files(["test/helpers/lg-sb-path.ts", 'import * as lgB from "node:path";\nexport const lgW = lgB;\n']), "test/helpers/lg-sb-path.ts"), "module")),
  member("ROUTES:sensitive builtin", "module", sensitiveLoad("node:module")),
  member("ROUTES:sensitive builtin", "process", sensitiveLoad("node:process")),
  member("ROUTES:sensitive builtin", "repl", sensitiveLoad("node:repl")),
  member("ROUTES:sensitive builtin", "vm", sensitiveLoad("node:vm")),
  member("ROUTES:sensitive builtin", "each named with node:", ...SENSITIVE_NAMES.map(name => sensitiveLoad(`node:${name}`))),
  member("ROUTES:sensitive builtin", "each named without node:", ...SENSITIVE_NAMES.map(name => sensitiveLoad(name))),
  member("ROUTES:global object", "in every scope",
    ...inEveryScope("const lgG = globalThis;\nexport const lgH = lgG;\n", ["global object globalThis as a VariableDeclaration :1"])),
  member("ROUTES:global object", "a free globalThis",
    pin(() => routes("local", "export const lgW = globalThis;\n"), ["global object globalThis as a VariableDeclaration :1"]),
    pin(() => routes("local", "const self = 1;\nexport const lgW = self;\n"), [])),
  member("ROUTES:global object", "global", pin(() => routes("local", "export const lgW = global;\n"), ["global object global as a VariableDeclaration :1"])),
  member("ROUTES:global object", "self", pin(() => routes("local", "export const lgW = self;\n"), ["global object self as a VariableDeclaration :1"])),
  member("ROUTES:global object", "window", pin(() => routes("local", "export const lgW = window;\n"), ["global object window as a VariableDeclaration :1"])),
  member("ROUTES:global object", "process", pin(() => routes("local", "export const lgW = process;\n"), ["global object process as a VariableDeclaration :1"])),
  member("ROUTES:global object", "in a package module free means declared nowhere in the module",
    pin(() => routes("package", "export const lgW = self;\n"), ["global object self as a VariableDeclaration :1"]),
    pin(() => routes("package", "const self = 1;\nexport const lgW = self;\n"), []),
    pin(() => routes("package", "export const lgA = (self: number): number => self;\nexport const lgB = self;\n"), []),
    pin(() => routes("local", "export const lgA = (self: number): number => self;\nexport const lgB = self;\n"), ["global object self as a VariableDeclaration :2"])),
  member("ROUTES:global object", "not when it is the base of a property access",
    pin(() => routes("local", "export const lgW = globalThis.lgName;\n"), [])),
  member("ROUTES:global object", "not when it is the base of an element access keyed by a string literal",
    pin(() => routes("local", 'export const lgW = [globalThis["lgName"], globalThis[`lgName`]];\n'), [])),
  member("ROUTES:global object", "not when it is the base of an element access keyed by a numeric literal",
    pin(() => routes("local", "export const lgW = globalThis[0];\n"), []),
    pin(() => routes("local", "export const lgW = (k: string): unknown => (globalThis as Record<string, unknown>)[k];\n"), ["global object globalThis as a ElementAccessExpression :1"])),
  member("ROUTES:global object", "read when that member names one of those five",
    globalMember("globalThis", false),
    globalMember("global", false),
    globalMember("self", true),
    globalMember("window", false),
    globalMember("process", false)),
  member("ROUTES:global object", "read when that member names createRequire", globalMember("createRequire", false, "loader name createRequire :1")),
  member("ROUTES:global object", "getBuiltinModule", globalMember("getBuiltinModule", false, "loader name getBuiltinModule :1")),
  member("ROUTES:global object", "binding", globalMember("binding", false, "loader name .binding :1")),
  member("ROUTES:global object", "dlopen", globalMember("dlopen", true, "loader name 'dlopen' :1")),
  member("ROUTES:global object", "_linkedBinding", globalMember("_linkedBinding", false, "loader name ._linkedBinding :1")),
  member("ROUTES:global object", "not as the operand of typeof",
    pin(() => routes("local", "export const lgW = typeof window;\n"), []),
    pin(() => routes("local", 'export const lgW = typeof process === "undefined";\n'), [])),
  member("ROUTES:global object", "not as the first argument of an admitted spy in the suite",
    pin(() => routes("suite", 'import { vi } from "vitest";\nexport const lgW = vi.spyOn(globalThis, "fetch");\n'), []),
    pin(() => routes("local", 'import { vi } from "vitest";\nexport const lgW = vi.spyOn(globalThis, "fetch");\n'), ["global object globalThis as a CallExpression :2"]),
    pin(() => routes("suite", 'import { vi } from "vitest";\nexport const lgW = vi["spyOn"](globalThis, "fetch");\n'), ["global object globalThis as a CallExpression :2"]),
    pin(() => routes("suite", 'import { vi } from "vitest";\nexport const lgW = vi.spyOn(globalThis, "__vite_lg");\n'), ["global object globalThis as a CallExpression :2", "vite name '__vite_lg' :2"])),
  member("ROUTES:dynamic code", "read in the suite",
    pin(() => routes("suite", 'export const lgW = new Function("return 1");\n'), ["dynamic code Function :1"])),
  member("ROUTES:dynamic code", "read in local modules",
    pin(() => routes("local", 'export const lgW = new Function("return 1");\n'), ["dynamic code Function :1"])),
  member("ROUTES:dynamic code", "never in a package module",
    pin(() => routes("package", 'export const lgW = new Function("return 1");\n'), []),
    pin(() => routes("package", "export const lgW = (code: string): unknown => eval(code);\n"), []),
    pin(() => routes("package", "export const lgW = (() => 1).constructor;\n"), []),
    pin(() => routes("package", 'export const lgW = new globalThis.Function("return 1");\n'), [])),
  member("ROUTES:dynamic code", "a free eval",
    pin(() => routes("local", "export const lgW = (code: string): unknown => eval(code);\n"), ["dynamic code eval :1"])),
  member("ROUTES:dynamic code", "a free Function",
    pin(() => routes("local", 'export const lgW = Function("return 1");\n'), ["dynamic code Function :1"]),
    pin(() => routes("local", "const Function = (): number => 1;\nexport const lgW = Function();\n"), [])),
  member("ROUTES:dynamic code", "an eval member of a free global object",
    pin(() => routes("local", "export const lgW = (code: string): unknown => globalThis.eval(code);\n"), ["dynamic code globalThis.eval :1"]),
    pin(() => routes("local", 'export const lgW = (code: string): unknown => self["eval"](code);\n'), ["dynamic code self.eval :1"])),
  member("ROUTES:dynamic code", "a Function member of a free global object",
    pin(() => routes("local", 'export const lgW = new globalThis.Function("return 1");\n'), ["dynamic code globalThis.Function :1"]),
    pin(() => routes("local", 'export const lgW = new window.Function("return 1");\n'), ["dynamic code window.Function :1"])),
  member("ROUTES:dynamic code", "a member constructor read on any base",
    pin(() => routes("local", "export const lgW = (() => 1).constructor;\n"), ["dynamic code .constructor :1"]),
    pin(() => routes("local", 'export const lgW = (o: object): unknown => (o as Record<string, unknown>)["constructor"];\n'), ["dynamic code .constructor :1"])),
  member("WRITES", "the cited suite only",
    pin(() => moduleIdentity(files(["test/helpers/lg-wr.ts", "const lgT = { each: 1 };\nlgT.each = 2;\nexport const lgW = lgT;\n"]), "test/helpers/lg-wr.ts"), "module")),
  member("WRITES", "each is a CHANNEL finding",
    pin(() => suiteChannel("const lgT = { each: 1 };\nlgT.each = 2;"), [`cited suite: member write .each by = at line ${PLANT_LINE + 1}`])),
  member("WRITES:member write", "an assignment of any operator to a property access",
    pin(() => writes("const lgT = { each: 1 };\nlgT.each = 2;\n"), ["member write .each by = :2"]),
    pin(() => writes("const lgT = { each: 1 };\nlgT.each += 1;\n"), ["member write .each by += :2"]),
    pin(() => writes("const lgT: { each?: number } = {};\nlgT.each ??= 3;\n"), ["member write .each by ??= :2"]),
    pin(() => writes("let lgX = 1;\nlgX = 2;\nlgX += 1;\nlgX++;\n"), [])),
  member("WRITES:member write", "to an element access",
    pin(() => writes('const lgT: Record<string, number> = {};\nlgT["each"] = 4;\n'), ["member write ['each'] by = :2"]),
    pin(() => writes("const lgT: number[] = [];\nlgT[0] = 5;\n"), ["member write [0] by = :2"])),
  member("WRITES:member write", "++ on such a target",
    pin(() => writes("const lgT = { each: 1 };\nlgT.each++;\n"), ["member write .each by ++ :2"]),
    pin(() => writes('const lgT: Record<string, number> = {};\n++lgT["each"];\n'), ["member write ['each'] by ++ :2"])),
  member("WRITES:member write", "-- on such a target",
    pin(() => writes("const lgT = { each: 1 };\n--lgT.each;\n"), ["member write .each by -- :2"]),
    pin(() => writes("const lgT: number[] = [1];\nlgT[0]--;\n"), ["member write [0] by -- :2"])),
  member("WRITES:member write", "delete of such a target",
    pin(() => writes("const lgT: { each?: number } = { each: 1 };\ndelete lgT.each;\n"), ["member write .each by delete :2"]),
    pin(() => writes('const lgT: Record<string, number> = {};\ndelete lgT["each"];\n'), ["member write ['each'] by delete :2"])),
  member("WRITES:member write", "such a target of a for-in",
    pin(() => writes("const lgT = { each: '' };\nfor (lgT.each in { x: 1 }) void 0;\n"), ["member write .each by for-in :2"]),
    pin(() => writes("for (const lgK in { x: 1 }) void lgK;\n"), [])),
  member("WRITES:member write", "such a target of a for-of",
    pin(() => writes("const lgT = { each: '' };\nfor (lgT.each of ['x']) void 0;\n"), ["member write .each by for-of :2"]),
    pin(() => writes("for (const lgK of ['x']) void lgK;\n"), [])),
  member("WRITES:member write", "such a target inside a destructuring assignment",
    pin(() => writes("const lgT = { each: 1 };\n({ each: lgT.each } = { each: 2 });\n"), ["member write .each by = :2"]),
    pin(() => writes("const lgT = { each: 1 };\n[lgT.each] = [2];\n"), ["member write .each by = :2"]),
    pin(() => writes("const lgT = { each: 1, rest: {} };\n({ ...lgT.rest } = { each: 2 });\n"), ["member write .rest by = :2"]),
    pin(() => writes("const lgT = { rest: [0] };\n[...lgT.rest] = [1, 2];\n"), ["member write .rest by = :2"])),
  ...MUTATOR_NAMES.map(name => member("WRITES:mutator member", name, asMember("mutator member", name))),
  member("WRITES:mutator member", "each read as a member name", ...MUTATOR_NAMES.map(name => asMember("mutator member", name))),
  member("WRITES:mutator member", "as a string element key", ...MUTATOR_NAMES.map(name => asKey("mutator member", name))),
  member("WRITES:mutator member", "as a destructured key", ...MUTATOR_NAMES.map(name => asDestructured("mutator member", name))),
  member("WRITES:mutator member", "as a whole string literal", ...MUTATOR_NAMES.map(name => asString("mutator member", name))),
  member("WRITES:reflection", "a free Reflect",
    pin(() => writes('const lgT = {};\nexport const lgEach = Reflect.get(lgT, "each");\n'), ["reflection Reflect :2"]),
    pin(() => writes("const Reflect = { get: (): number => 1 };\nexport const lgW = Reflect.get();\n"), [])),
  member("WRITES:reflection", "a free Proxy",
    pin(() => writes("const lgT = new Proxy({}, {});\nvoid lgT;\n"), ["reflection Proxy :1"]),
    pin(() => writes("const Proxy = class {};\nexport const lgW = new Proxy();\n"), [])),
  ...REFLECTION_NAMES.map(name => member("WRITES:reflection", name, asMember("reflection", name))),
  member("WRITES:reflection", "each read as a mutator member is",
    ...REFLECTION_NAMES.flatMap(name => [asMember("reflection", name), asKey("reflection", name), asDestructured("reflection", name), asString("reflection", name)])),
  member("WRITES:spy or mock member", "spyOn read any way but as the callee of an admitted spy",
    pin(() => writes('import { vi } from "vitest";\nvi.spyOn(console, "log");\n'), []),
    pin(() => writes('import { vi } from "vitest";\nexport const lgSpy = vi.spyOn;\n'), ["spy or mock member .spyOn :2"]),
    pin(() => writes('import { vi } from "vitest";\nvi["spyOn"](console, "log");\n'), ["spy or mock member ['spyOn'] :2"]),
    pin(() => writes('import { vi } from "vitest";\nconst { spyOn: lgSpy } = vi;\nvoid lgSpy;\n'), ["spy or mock member {spyOn} destructured :2"]),
    pin(() => writes("const lgKey = 'spyOn';\nvoid lgKey;\n"), ["spy or mock member 'spyOn' :1"])),
  member("WRITES:spy or mock member", "an admitted spy is a call of a property access .spyOn with two arguments: a free identifier then a string literal not beginning __vite",
    pin(() => writes('import { vi } from "vitest";\nvi.spyOn(console, "log");\n'), []),
    pin(() => writes('import { vi } from "vitest";\nvi.spyOn(console, "log", "get");\n'), ["spy or mock member .spyOn :2"]),
    pin(() => writes('import { vi } from "vitest";\nconst lgT = { inner: { each: (): number => 1 } };\nvi.spyOn(lgT.inner, "each");\n'), ["spy or mock member .spyOn :3"]),
    pin(() => writes('import { vi } from "vitest";\nconst console = { log: (): void => undefined };\nvi.spyOn(console, "log");\n'), ["spy or mock member .spyOn :3"]),
    pin(() => writes('import { vi } from "vitest";\nconst lgKey = "log";\nvi.spyOn(console, lgKey);\n'), ["spy or mock member .spyOn :3"]),
    pin(() => writes('import { vi } from "vitest";\nvi.spyOn(console, "__vite_lg");\n'), ["spy or mock member .spyOn :2"])),
  ...SPY_NAMES.map(name => member("WRITES:spy or mock member", name, asMember("spy or mock member", name))),
  member("WRITES:spy or mock member", "each read as a mutator member is",
    ...SPY_NAMES.flatMap(name => [asMember("spy or mock member", name), asKey("spy or mock member", name), asDestructured("spy or mock member", name), asString("spy or mock member", name)])),
  member("WRITES:computed member", "an element access with a computed key",
    pin(() => writes('const lgKey = "each";\nconst lgT: Record<string, number> = { each: 1 };\nexport const lgEach = lgT[lgKey];\n'), ["computed member lgT[lgKey] :3"])),
  member("WRITES:computed member", "a string literal key is no computed key",
    pin(() => writes('const lgT: Record<string, number> = { each: 1 };\nexport const lgA = lgT["each"];\n'), [])),
  member("WRITES:computed member", "a no-substitution template key is none",
    pin(() => writes("const lgT: Record<string, number> = { each: 1 };\nexport const lgB = lgT[`each`];\n"), [])),
  member("WRITES:computed member", "a numeric literal key is none",
    pin(() => writes("const lgT: number[] = [1];\nexport const lgC = lgT[0];\n"), [])),
  member("WRITES:computed member", "a computed key of an object binding pattern",
    pin(() => writes('const lgKey = "each";\nconst { [lgKey]: lgEach } = { each: 1 };\nvoid lgEach;\n'), ["computed member [lgKey] destructured :2"])),
  member("CHANNEL:tier config", "the default test tier's one vitest config passes the landed census guard (censusGuard on the test tier) whose closed key lists refuse every key outside them",
    pin(() => channelReading(BASE, SUITE, { roots: ["tier config"] }), []),
    pin(() => {
      const tiers: string[] = [];
      setupFiles(ROOT, (root, tier) => {
        tiers.push(tier);
        return censusGuard(root, tier);
      });
      return tiers;
    }, ["test"]),
    pin(() => setupFiles(ROOT, () => ({ ok: false, why: "a planted refusal" })), { why: "a planted refusal" })),
  member("CHANNEL:tier config", "a resolver alias is refused (its landed row g-u62r5-alias)",
    pin(() => read(CENSUS_HELPER_SUITE).includes('id: "g-u62r5-alias"'), true)),
  member("CHANNEL:tier config", "plugins are refused (its landed row g-u62r5-plugins)",
    pin(() => read(CENSUS_HELPER_SUITE).includes('id: "g-u62r5-plugins"'), true)),
  member("CHANNEL:tier config", "a refusal is a finding even when the guard names the config",
    pin(() => setupFiles(ROOT, refusing), { why: REFUSED_WHY }),
    pin(() => channelReading(BASE, SUITE, { roots: ["tier config"], guard: refusing }), [`tier config: ${REFUSED_WHY}`]),
    pin(() => channelReading(BASE, SUITE, { roots: ["setup file"], guard: refusing }), [])),
  member("CHANNEL:setup file", "every setup file that config's test.setupFiles names is a closure root",
    pin(() => setupFiles(ROOT), { files: ["test/helpers/census-guard.ts"] }),
    pin(() => setupChannel(["test/helpers/census-guard.ts"]), [])),
  member("CHANNEL:setup file", "a setup file that is a carrier is a finding",
    pin(() => setupChannel(["test/helpers/census-guard.ts", "test/helpers/lg-setup.ts"], files(["test/helpers/lg-setup.ts", 'import { it } from "vitest";\nexport const lgIt = it;\n'])),
      ["setup file test/helpers/lg-setup.ts: carrier (test/helpers/lg-setup.ts:1 loads 'vitest' (vitest vitest))"]),
    pin(() => setupChannel(["test/helpers/lg-setup-g.ts"], files(["test/helpers/lg-setup-g.ts", "export const lgG = globalThis;\n"])),
      ["setup file test/helpers/lg-setup-g.ts: carrier (test/helpers/lg-setup-g.ts:1 holds a global object route (globalThis as a VariableDeclaration))"])),
  member("CHANNEL:setup file", "a setup file reaching a carrier is a finding",
    pin(() => setupChannel(["test/helpers/lg-setup2.ts"], files(["test/helpers/lg-setup2.ts", 'import "./lg-car.js";\n'], ["test/helpers/lg-car.ts", "export const lgG = globalThis;\n"])),
      ["setup file test/helpers/lg-setup2.ts: carrier (test/helpers/lg-setup2.ts:1 loads './lg-car.js' (carrier test/helpers/lg-car.ts:1 holds a global object route (globalThis as a VariableDeclaration)))"])),
  member("CHANNEL:setup file", "a setup file that is a vitest module is a finding",
    pin(() => setupChannel(["node_modules/vitest/dist/index.js"]), ["setup file node_modules/vitest/dist/index.js: vitest (vitest)"])),
  member("CHANNEL:setup file", "a setup file that names no file is a finding",
    pin(() => setupChannel(["test/helpers/lg-no-setup.ts"]), ["setup file test/helpers/lg-no-setup.ts: a load does not resolve: test/helpers/lg-no-setup.ts names no file"])),
  member("CHANNEL:setup file", "a setup file whose closure holds a load that does not resolve is a finding",
    pin(() => setupChannel(["test/helpers/lg-setup3.ts"], files(["test/helpers/lg-setup3.ts", `${MISSING_LOAD}\n`])),
      ["setup file test/helpers/lg-setup3.ts: a load does not resolve: test/helpers/lg-setup3.ts:1 loads './lg-missing.js': test/helpers/lg-missing.js names no file"])),
  member("CHANNEL:cited suite", "the suite's ROUTE_FORMS findings",
    pin(() => suiteChannel("const lgG = globalThis;"), [`cited suite: global object globalThis as a VariableDeclaration at line ${PLANT_LINE}`])),
  member("CHANNEL:cited suite", "its WRITE_FORMS findings",
    pin(() => suiteChannel("const lgT = { each: 1 };\nlgT.each = 2;"), [`cited suite: member write .each by = at line ${PLANT_LINE + 1}`])),
  member("CHANNEL:cited suite", "a sensitive builtin among its loads",
    pin(() => suiteChannel('import { runInThisContext } from "node:vm";'), [`cited suite: sensitive builtin 'node:vm' at line ${PLANT_LINE}`]),
    pin(() => suiteChannel('import { join as lgJoin } from "node:path";'), [])),
  member("CHANNEL:cited suite", "the modules its loads reach are read by IMPORT",
    pin(() => {
      const at = host(files([HX, `${read(HX)}\nimport { it as lgIt } from "vitest";\nexport const lgRegistrar = lgIt;\n`]));
      return [channelReading(at, SUITE, { roots: ["cited suite"] }), importReading(at, SUITE).section.startsWith("IMPORT <2 loads resolve to a vitest module or a carrier")];
    }, [[], true])),
  member("IMPORT", "exactly one load of the suite resolves to a vitest module",
    pin(() => importReading(BASE, SUITE).section.startsWith(`IMPORT by resolution: the one load reaching vitest is the import declaration 'vitest' at line ${VITEST_LINE} (vitest (vitest)); `), true),
    pin(() => suiteImport(plantSuite('import { test as lgTest } from "vitest";')),
      `IMPORT <2 loads resolve to a vitest module or a carrier: import declaration 'vitest' at line ${VITEST_LINE} (vitest (vitest)), import declaration 'vitest' at line ${PLANT_LINE} (vitest (vitest))>`),
    pin(() => suiteImport(files([SUITE, edit(read(SUITE), VITEST_IMPORT, "")])), "IMPORT <0 loads resolve to a vitest module or a carrier>")),
  member("IMPORT", "to a carrier",
    pin(() => suiteImport(files([SUITE, edit(read(SUITE), VITEST_IMPORT, "")], [HX, `${read(HX)}\nimport { it as lgIt } from "vitest";\nexport const lgRegistrar = lgIt;\n`]))
      .startsWith(`IMPORT by resolution: the one load reaching vitest is the import declaration './helpers/hx-live-receipt.js' at line ${PLANT_LINE - 1} (carrier (${HX}:`), true)),
  member("IMPORT", "it is an import declaration",
    pin(() => suiteImport(files([SUITE, edit(read(SUITE), VITEST_IMPORT, "import vitestApi = require('vitest');")])),
      `IMPORT <the one load reaching vitest is a import-equals, not an import declaration: 'vitest' at line ${VITEST_LINE}>`)),
  member("IMPORT", "every other load resolves to no vitest module",
    pin(() => importReading(BASE, SUITE).listing.filter(entry => entry.includes(" -> vitest (")).length, 1)),
  member("IMPORT", "to no carrier",
    pin(() => importReading(BASE, SUITE).listing.filter(entry => entry.includes(" -> carrier (")).length, 0)),
  member("IMPORT", "a load anywhere in the closure that does not resolve breaks",
    pin(() => suiteImport(files([HX, brokenHx])),
      `IMPORT <a load does not resolve: ${HX}:${brokenHx.split("\n").indexOf(MISSING_LOAD) + 1} loads './lg-missing.js': test/helpers/lg-missing.js names no file>`),
    pin(() => suiteImport(plantSuite('import "./helpers/lg-missing.js";')), `IMPORT <a load does not resolve: './helpers/lg-missing.js' at line ${PLANT_LINE}: test/helpers/lg-missing.js names no file>`)),
  member("IMPORT", "the listing names each load of the suite as written in source order",
    pin(() => importReading(BASE, SUITE).listing.map(entry => /^[a-z -]+ '(.*)' at line \d+ -> /.exec(entry)?.[1]), ts.preProcessFile(read(SUITE), true, true).importedFiles.map(entry => entry.fileName))),
  member("IMPORT", "each listed load shows its form",
    pin(() => importReading(host(plantSuite('const lgDynamic = import("./helpers/hx-live-receipt.js");')), SUITE).listing.filter(entry => entry.startsWith("dynamic import ")).length, 1)),
  member("IMPORT", "its resolution",
    pin(() => importReading(host(plantSuite('const lgDynamic = import("./helpers/hx-live-receipt.js");')), SUITE).listing.filter(entry => entry.includes(` at line ${PLANT_LINE} -> relative ${HX} -> `)).length, 1)),
  member("IMPORT", "its identity",
    pin(() => importReading(BASE, SUITE).listing.includes(`import declaration 'vitest' at line ${VITEST_LINE} -> package node_modules/vitest -> vitest (vitest)`), true),
    pin(() => importReading(host(plantSuite('const lgDynamic = import("./helpers/hx-live-receipt.js");')), SUITE).listing.includes(`dynamic import './helpers/hx-live-receipt.js' at line ${PLANT_LINE} -> relative ${HX} -> module`), true)),
  member("RUN:argv", "the census tier resolves (the shared resolveTier) to exactly vitest run --config <file>",
    pin(() => TIER_ARGV, ["run", "--config", CENSUS_CONFIG]),
    pin(() => run(read(CENSUS_CONFIG), ["run", "--config", CENSUS_CONFIG, "--passWithNoTests"]), `<the census tier runs vitest run --config ${CENSUS_CONFIG} --passWithNoTests>`),
    pin(() => run(read(CENSUS_CONFIG), ["list", "--config", CENSUS_CONFIG]), `<the census tier runs vitest list --config ${CENSUS_CONFIG}>`),
    pin(() => run(read(CENSUS_CONFIG), "a planted tier refusal"), "<the census tier does not resolve: a planted tier refusal>")),
  member("RUN:statements", "the config module holds only value import declarations of defineConfig from vitest/config",
    pin(() => run(`${config(CENSUS_TEST)}const lgExtra = 1;\n`), brokenRun(": a statement other than the defineConfig import and the default export at line 3")),
    pin(() => run(config(CENSUS_TEST).replace("import { defineConfig }", "import { type defineConfig }")), brokenRun(": a statement other than the defineConfig import and the default export at line 1")),
    pin(() => run(config(CENSUS_TEST).replace("import { defineConfig }", "import type { defineConfig }")), brokenRun(": a statement other than the defineConfig import and the default export at line 1")),
    pin(() => run(config(CENSUS_TEST).replace('"vitest/config"', '"vitest/node"')), brokenRun(": a statement other than the defineConfig import and the default export at line 1")),
    pin(() => run(`import "vitest/config";\n${config(CENSUS_TEST)}`), brokenRun(": a statement other than the defineConfig import and the default export at line 1"))),
  member("RUN:statements", "named",
    pin(() => run(config(CENSUS_TEST).replace("import { defineConfig }", "import lgConfig, { defineConfig }")), brokenRun(": a statement other than the defineConfig import and the default export at line 1")),
    pin(() => run(`import * as lgV from "vitest/config";\nexport default lgV.defineConfig({ test: { ${CENSUS_TEST} } });\n`), brokenRun(": a statement other than the defineConfig import and the default export at line 1"))),
  member("RUN:statements", "unaliased",
    pin(() => run(config(CENSUS_TEST).replace("import { defineConfig }", "import { mergeConfig as defineConfig }")), brokenRun(": a statement other than the defineConfig import and the default export at line 1"))),
  member("RUN:statements", "one default export",
    pin(() => run(`${config(CENSUS_TEST)}export default 1;\n`), brokenRun(": 2 default exports")),
    pin(() => run('import { defineConfig } from "vitest/config";\n'), brokenRun(": 0 default exports"))),
  member("RUN:default export", "the default export is a call of that defineConfig with one object literal argument",
    pin(() => run(`import { defineConfig } from "vitest/config";\nexport default { test: { ${CENSUS_TEST} } };\n`), brokenRun(": the default export is not a call of the imported defineConfig with one object literal")),
    pin(() => run(`import { defineConfig } from "vitest/config";\nexport default defineConfig({ test: { ${CENSUS_TEST} } }, {});\n`), brokenRun(": the default export is not a call of the imported defineConfig with one object literal")),
    pin(() => run(`import { defineConfig } from "vitest/config";\nexport default defineConfig(() => ({ test: { ${CENSUS_TEST} } }));\n`), brokenRun(": the default export is not a call of the imported defineConfig with one object literal")),
    pin(() => run(`import { defineConfig } from "vitest/config";\nexport default lgOther({ test: { ${CENSUS_TEST} } });\n`), brokenRun(": the default export is not a call of the imported defineConfig with one object literal"))),
  member("RUN:plain keys", "every property of the config object is plain",
    pin(() => run(config(CENSUS_TEST, "...{}, ")), brokenRun("'s config spreads a value")),
    pin(() => run(`import { defineConfig } from "vitest/config";\nexport default defineConfig({ ["test"]: { ${CENSUS_TEST} } });\n`), brokenRun("'s config holds a computed key"))),
  member("RUN:plain keys", "every property of its test object is plain",
    pin(() => run(config(`${CENSUS_TEST}, ...{}`)), brokenRun("'s test object spreads a value")),
    pin(() => run(config(`${CENSUS_TEST}, lgFlag`)), brokenRun("'s test object holds a shorthand property"))),
  member("RUN:plain keys", "a plain property has an identifier key with a value",
    pin(() => run(read(CENSUS_CONFIG)), SOUND_RUN(["test/**/*.census.ts"]))),
  member("RUN:plain keys", "a string key with a value is plain too",
    pin(() => run('import { defineConfig } from "vitest/config";\nexport default defineConfig({ "test": { "include": ["test/**/*.census.ts"], "allowOnly": false } });\n'), SOUND_RUN(["test/**/*.census.ts"]))),
  member("RUN:plain keys", "a spread is not plain",
    pin(() => run(config(`${CENSUS_TEST}, ...{}`)), brokenRun("'s test object spreads a value"))),
  member("RUN:plain keys", "a computed key is not plain",
    pin(() => run(config('["include"]: ["test/**/*.census.ts"], allowOnly: false')), brokenRun("'s test object holds a computed key"))),
  member("RUN:plain keys", "a shorthand property is not plain",
    pin(() => run('import { defineConfig } from "vitest/config";\nexport default defineConfig({ test });\n'), brokenRun("'s config holds a shorthand property"))),
  member("RUN:plain keys", "a method is not plain",
    pin(() => run(config('allowOnly: false, include() { return ["test/**/*.census.ts"]; }')), brokenRun("'s test object holds a method or accessor"))),
  member("RUN:plain keys", "an accessor is not plain",
    pin(() => run(config(`${CENSUS_TEST}, get testNamePattern() { return "^$"; }`)), brokenRun("'s test object holds a method or accessor"))),
  member("RUN:plain keys", "no key may appear twice",
    pin(() => run(config('include: ["qa/**/*.census.ts"], allowOnly: false, include: ["test/**/*.census.ts"]')), brokenRun("'s test object holds the key include twice")),
    pin(() => run(config(CENSUS_TEST, "test: {}, ")), brokenRun("'s config holds the key test twice"))),
  member("RUN:top-level keys", "the object holds test",
    pin(() => run('import { defineConfig } from "vitest/config";\nexport default defineConfig({});\n'), brokenRun(": the config holds no test object literal"))),
  member("RUN:top-level keys", "no other key",
    pin(() => run(config(CENSUS_TEST, "plugins: [], ")), brokenRun(": the config sets the top-level key plugins")),
    pin(() => run(config(CENSUS_TEST, "plugins: [], resolve: {}, ")), brokenRun(": the config sets the top-level keys plugins, resolve"))),
  member("RUN:test keys", "the test object holds allowOnly", pin(() => run(config('include: ["test/**/*.census.ts"]')), brokenRun(": allowOnly is not the literal false"))),
  member("RUN:test keys", "include", pin(() => run(config("allowOnly: false")), brokenRun(": include is not an array literal of string literals"))),
  member("RUN:test keys", "no other key: dir", pin(() => run(config(`${CENSUS_TEST}, dir: "qa"`)), brokenRun(": the test object sets dir"))),
  member("RUN:test keys", "root", pin(() => run(config(`${CENSUS_TEST}, root: "."`)), brokenRun(": the test object sets root"))),
  member("RUN:test keys", "testNamePattern", pin(() => run(config(`${CENSUS_TEST}, testNamePattern: "^(?!x)"`)), brokenRun(": the test object sets testNamePattern"))),
  member("RUN:test keys", "passWithNoTests", pin(() => run(config(`${CENSUS_TEST}, passWithNoTests: true`)), brokenRun(": the test object sets passWithNoTests"))),
  member("RUN:test keys", "exclude", pin(() => run(config(`${CENSUS_TEST}, exclude: []`)), brokenRun(": the test object sets exclude"))),
  member("RUN:test keys", "every other key read as a break",
    pin(() => run(config(`${CENSUS_TEST}, bail: 1`)), brokenRun(": the test object sets bail")),
    pin(() => run(config(`${CENSUS_TEST}, dir: "qa", passWithNoTests: true`)), brokenRun(": the test object sets dir, passWithNoTests"))),
  member("RUN:allowOnly", "allowOnly is the literal false",
    pin(() => run(config('include: ["test/**/*.census.ts"], allowOnly: true')), brokenRun(": allowOnly is not the literal false")),
    pin(() => run(config('include: ["test/**/*.census.ts"], allowOnly: !1')), brokenRun(": allowOnly is not the literal false"))),
  member("RUN:include", "include is an array literal of string literals",
    pin(() => run(config('include: "test/**/*.census.ts", allowOnly: false')), brokenRun(": include is not an array literal of string literals")),
    pin(() => run(config('include: ["test/**/*.census.ts", lgGlob], allowOnly: false')), brokenRun(": include is not an array literal of string literals"))),
  member("RUN:include", "one of whose globs matches the run pin: ** across directories",
    pin(() => run(read(CENSUS_CONFIG)), SOUND_RUN(["test/**/*.census.ts"])),
    pin(() => run(config('include: ["**/*.census.ts"], allowOnly: false')), SOUND_RUN(["**/*.census.ts"])),
    pin(() => run(config('include: ["qa/**/*.census.ts"], allowOnly: false')), brokenRun(`: no glob of include ["qa/**/*.census.ts"] matches ${RUN_PIN}`))),
  member("RUN:include", "* within one",
    pin(() => run(config('include: ["test/*.census.ts"], allowOnly: false')), SOUND_RUN(["test/*.census.ts"])),
    pin(() => run(config('include: ["*.census.ts"], allowOnly: false')), brokenRun(`: no glob of include ["*.census.ts"] matches ${RUN_PIN}`))),
  member("RUN:include", "any other glob syntax unmatched",
    pin(() => run(config('include: ["test/**/*.census.t[s]"], allowOnly: false')), brokenRun(`: no glob of include ["test/**/*.census.t[s]"] matches ${RUN_PIN}`)),
    pin(() => run(config('include: ["test/**/*.census.t?"], allowOnly: false')), brokenRun(`: no glob of include ["test/**/*.census.t?"] matches ${RUN_PIN}`)),
    pin(() => run(config('include: ["{test}/**/*.census.ts"], allowOnly: false')), brokenRun(`: no glob of include ["{test}/**/*.census.ts"] matches ${RUN_PIN}`))),
  member("C", "a tag is hyperunix.result/ then decimal digits",
    pin(() => tagIn("src/workbench/lg-tag.md", "hyperunix.result/12 hyperunix.result/x hyperunix.result/\n"), ["src/workbench/lg-tag.md:1 text embedded hyperunix.result/12"])),
  member("C:walk", "every entry under src",
    pin(() => tagIn("src/workbench/lg-deep/a/b/lg.md", "hyperunix.result/1\n"), ["src/workbench/lg-deep/a/b/lg.md:1 text embedded hyperunix.result/1"])),
  member("C:walk", "in name order at each level: a directory is entered",
    pin(() => srcSites(host(files(["src/workbench/lg-order/b.md", "x\n"], ["src/workbench/lg-order/a/c.md", "x\n"], ["src/workbench/lg-order/a.md", "x\n"]))).files.filter(file => file.startsWith("src/workbench/lg-order/")),
      ["src/workbench/lg-order/a/c.md", "src/workbench/lg-order/a.md", "src/workbench/lg-order/b.md"])),
  member("C:walk", "every other entry is a file",
    pin(() => sites(files(["src/workbench/lg-target.md", "hyperunix.result/1\n"]), files(["src/workbench/lg-file-link", "src/workbench/lg-target.md"])),
      ["src/workbench/lg-file-link:1 text embedded hyperunix.result/1", "src/workbench/lg-target.md:1 text embedded hyperunix.result/1"])),
  member("C:walk", "a directory reached a second time by its real path reads as a break",
    pin(() => sites(new Map(), files(["src/workbench/lg-loop", "src"])), ["src/workbench/lg-loop reaches src, a directory already read"])),
  member("C:code", "a file whose name ends .ts", codeSite(".ts")),
  member("C:code", ".tsx", codeSite(".tsx")),
  member("C:code", ".mts", codeSite(".mts")),
  member("C:code", ".cts", codeSite(".cts")),
  member("C:code", ".js", codeSite(".js")),
  member("C:code", ".jsx", codeSite(".jsx")),
  member("C:code", ".mjs", codeSite(".mjs")),
  member("C:code", ".cjs is parsed as TypeScript by its extension",
    codeSite(".cjs"),
    pin(() => tagIn("src/workbench/lg-jsx.tsx", "export const lgW = <p>hyperunix.result/1</p>;\n"), ["src/workbench/lg-jsx.tsx:1 code whole hyperunix.result/1"]),
    pin(() => tagIn("src/workbench/lg-jsx.ts", "export const lgW = <p>hyperunix.result/1</p>;\n"), [])),
  member("C:code", "every string literal",
    pin(() => tagIn("src/workbench/lg-s.ts", 'export const LG = "a tag hyperunix.result/1 inside";\n'), ["src/workbench/lg-s.ts:1 code embedded hyperunix.result/1"])),
  member("C:code", "no-substitution template",
    pin(() => tagIn("src/workbench/lg-nst.ts", "export const LG = `hyperunix.result/1`;\n"), ["src/workbench/lg-nst.ts:1 code whole hyperunix.result/1"])),
  member("C:code", "template head",
    pin(() => tagIn("src/workbench/lg-head.ts", `export const lgW = (n: number): string => \`hyperunix.result/1 \${n}\`;\n`), ["src/workbench/lg-head.ts:1 code embedded hyperunix.result/1"])),
  member("C:code", "middle",
    pin(() => tagIn("src/workbench/lg-mid.ts", `export const lgW = (a: number, b: number): string => \`\${a} hyperunix.result/1 \${b}\`;\n`), ["src/workbench/lg-mid.ts:1 code embedded hyperunix.result/1"])),
  member("C:code", "tail",
    pin(() => tagIn("src/workbench/lg-tail.ts", `export const lgW = (a: number): string => \`\${a} hyperunix.result/1\`;\n`), ["src/workbench/lg-tail.ts:1 code embedded hyperunix.result/1"])),
  member("C:code", "JSX text is read for a tag",
    pin(() => tagIn("src/workbench/lg-text.tsx", "export const lgW = <p>a hyperunix.result/1 b</p>;\n"), ["src/workbench/lg-text.tsx:1 code embedded hyperunix.result/1"])),
  member("C:code", "never a comment",
    pin(() => tagIn("src/workbench/lg-never.ts", "// hyperunix.result/1\n/* hyperunix.result/2 */\nexport const LG = 1;\n"), [])),
  member("C:code", "a regular expression",
    pin(() => tagIn("src/workbench/lg-regex.ts", "export const LG = /hyperunix\\.result\\/3/;\n"), [])),
  member("C:text", "any other file's whole text is read for a tag",
    pin(() => tagIn("src/workbench/lg-t.md", "a tag in prose: hyperunix.result/1\n"), ["src/workbench/lg-t.md:1 text embedded hyperunix.result/1"]),
    pin(() => tagIn("src/workbench/lg-t.json", '{"tag": "hyperunix.result/1"}\n'), ["src/workbench/lg-t.json:1 text embedded hyperunix.result/1"]),
    pin(() => tagIn("src/workbench/LG-NOTE", "\nhyperunix.result/2\n"), ["src/workbench/LG-NOTE:2 text embedded hyperunix.result/2"])),
  member("RESIDUALS:R-PACKAGE-CODE", "a package module's own dynamic code is no route (typebox builds validators through new (globalThis.Function)(...))",
    pin(() => routes("package", 'export const lgW = new (globalThis.Function)("return 1");\n'), []),
    pin(() => routes("local", 'export const lgW = new (globalThis.Function)("return 1");\n'), ["dynamic code globalThis.Function :1"])),
  member("RESIDUALS:R-PACKAGE-CODE", "so a package that reaches vitest only through dynamic code reads as a module",
    pin(() => loadIdentity("lg-dynamic-code", PACKAGES), "module"),
    pin(() => loadIdentity("./helpers/lg-dynamic-code.js", files(["test/helpers/lg-dynamic-code.ts", PACKAGE_CODE])), "carrier (test/helpers/lg-dynamic-code.ts:1 holds a dynamic code route (Function))")),
  member("RESIDUALS:R-HELPER-PATCH", "a local module the suite loads that patches a built-in at load while reaching no vitest module",
    pin(() => loadIdentity("./helpers/lg-patch.js", files(["test/helpers/lg-patch.ts", HELPER_PATCH])), "module"),
    pin(() => loadIdentity("./helpers/lg-patch.js", files(["test/helpers/lg-patch.ts", `${HELPER_PATCH}import "vitest";\n`])), "carrier (test/helpers/lg-patch.ts:4 loads 'vitest' (vitest vitest))")),
  member("RESIDUALS:R-HELPER-PATCH", "holding no route reads as a module",
    pin(() => importReading(diskHost(ROOT, plantSuite('import { lgPatched } from "./helpers/lg-patch.js";').set("test/helpers/lg-patch.ts", HELPER_PATCH)), SUITE).section.startsWith("IMPORT by resolution"), true),
    pin(() => loadIdentity("./helpers/lg-patch.js", files(["test/helpers/lg-patch.ts", `${HELPER_PATCH}export const lgG = globalThis;\n`])), "carrier (test/helpers/lg-patch.ts:4 holds a global object route (globalThis as a VariableDeclaration))")),
  member("RESIDUALS:R-HELPER-PATCH", "the in-flight rewrite of a built-in is wb-tz2.3's R-RUNTIME family",
    pin(() => exportRecord(PARENT).notes.includes("R-RUNTIME"), true)),
  member("RESIDUALS:R-HELPER-PATCH", "the suite's own patch reads as a member write",
    pin(() => suiteChannel("const lgRealIsArray = Array.isArray;\nArray.isArray = ((value: unknown): value is unknown[] => lgRealIsArray(value)) as typeof Array.isArray;"),
      [`cited suite: member write .isArray by = at line ${PLANT_LINE + 1}`])),
];

/** MEMBERS rows with their place among their claim's pieces. */
const PLACED = MEMBER_ROWS.map((row, index) => ({ ...row, place: MEMBER_ROWS.slice(0, index).filter(other => other.key === row.key).length + 1 }));
/** FROZEN SHAPE (standing rule 16): every row - a GATE row with its pin keys, a MEMBERS row with its place and pin count. */
const FROZEN_SHAPE: readonly string[] = [
  "BASE:import", "BASE:channel", "BASE:run", "BASE:c", "BASE:setup",
  "GATE:LG1s:channel,import", "GATE:LG1sc:channel,import", "GATE:LG1a:channel,import", "GATE:LG1b:channel,import", "GATE:LG2:import", "GATE:LG3:channel", "GATE:LG3c:channel", "GATE:LG5a:c", "GATE:LG5b:c", "GATE:LG5c:c", "GATE:GL1:channel", "GATE:GL1c:channel", "GATE:GL2:channel", "GATE:GL2c:channel", "GATE:GI1:channel", "GATE:GI1c:channel", "GATE:GR1:run", "GATE:GR2:run", "GATE:GR2c:run", "GATE:GRT1:channel", "GATE:GRT1c:channel", "GATE:GVM1:channel", "GATE:GVM1c:channel",
  "FORMS:RESOLUTION:builtin", "FORMS:RESOLUTION:relative", "FORMS:RESOLUTION:package", "FORMS:RESOLUTION:package imports", "FORMS:UNRESOLVED:absolute path", "FORMS:UNRESOLVED:url scheme", "FORMS:UNRESOLVED:query", "FORMS:UNRESOLVED:empty", "FORMS:UNRESOLVED:outside the root", "FORMS:UNRESOLVED:no file", "FORMS:UNRESOLVED:ambiguous", "FORMS:UNRESOLVED:directory package", "FORMS:UNRESOLVED:no package", "FORMS:UNRESOLVED:no export", "FORMS:UNRESOLVED:no imports map", "FORMS:EXPORT_TARGETS:sugar", "FORMS:EXPORT_TARGETS:exact key", "FORMS:EXPORT_TARGETS:pattern key", "FORMS:EXPORT_TARGETS:conditions", "FORMS:EXPORT_TARGETS:array", "FORMS:EXPORT_TARGETS:string", "FORMS:IDENTITY:vitest", "FORMS:IDENTITY:carrier", "FORMS:IDENTITY:builtin", "FORMS:IDENTITY:module", "FORMS:SCOPES:suite", "FORMS:SCOPES:local", "FORMS:SCOPES:package", "FORMS:LOADS:import declaration", "FORMS:LOADS:export declaration", "FORMS:LOADS:import-equals", "FORMS:LOADS:import type", "FORMS:LOADS:dynamic import", "FORMS:LOADS:require call", "FORMS:ROUTES:dynamic load", "FORMS:ROUTES:loader name", "FORMS:ROUTES:loader member", "FORMS:ROUTES:vite name", "FORMS:ROUTES:import meta", "FORMS:ROUTES:sensitive builtin", "FORMS:ROUTES:global object", "FORMS:ROUTES:dynamic code", "FORMS:WRITES:member write", "FORMS:WRITES:mutator member", "FORMS:WRITES:reflection", "FORMS:WRITES:spy or mock member", "FORMS:WRITES:computed member", "FORMS:CHANNEL:tier config", "FORMS:CHANNEL:setup file", "FORMS:CHANNEL:cited suite", "FORMS:RUN:argv", "FORMS:RUN:statements", "FORMS:RUN:default export", "FORMS:RUN:plain keys", "FORMS:RUN:top-level keys", "FORMS:RUN:test keys", "FORMS:RUN:allowOnly", "FORMS:RUN:include", "FORMS:C:walk", "FORMS:C:code", "FORMS:C:text", "FORMS:RESIDUALS:R-PACKAGE-CODE", "FORMS:RESIDUALS:R-HELPER-PATCH",
  "MEMBERS:RESOLUTION:1:2", "MEMBERS:RESOLUTION:2:1",
  "MEMBERS:RESOLUTION:builtin:1:2", "MEMBERS:RESOLUTION:builtin:2:2", "MEMBERS:RESOLUTION:builtin:3:2",
  "MEMBERS:RESOLUTION:relative:1:1", "MEMBERS:RESOLUTION:relative:2:1", "MEMBERS:RESOLUTION:relative:3:1", "MEMBERS:RESOLUTION:relative:4:1", "MEMBERS:RESOLUTION:relative:5:2", "MEMBERS:RESOLUTION:relative:6:1", "MEMBERS:RESOLUTION:relative:7:2", "MEMBERS:RESOLUTION:relative:8:1", "MEMBERS:RESOLUTION:relative:9:1", "MEMBERS:RESOLUTION:relative:10:1", "MEMBERS:RESOLUTION:relative:11:11", "MEMBERS:RESOLUTION:relative:12:11",
  "MEMBERS:RESOLUTION:package:1:1", "MEMBERS:RESOLUTION:package:2:2", "MEMBERS:RESOLUTION:package:3:2", "MEMBERS:RESOLUTION:package:4:3", "MEMBERS:RESOLUTION:package:5:1", "MEMBERS:RESOLUTION:package:6:3", "MEMBERS:RESOLUTION:package:7:2", "MEMBERS:RESOLUTION:package:8:2", "MEMBERS:RESOLUTION:package:9:1", "MEMBERS:RESOLUTION:package:10:1", "MEMBERS:RESOLUTION:package:11:2",
  "MEMBERS:RESOLUTION:package imports:1:3", "MEMBERS:RESOLUTION:package imports:2:2", "MEMBERS:RESOLUTION:package imports:3:2",
  "MEMBERS:UNRESOLVED:1:2",
  "MEMBERS:UNRESOLVED:absolute path:1:1",
  "MEMBERS:UNRESOLVED:url scheme:1:1", "MEMBERS:UNRESOLVED:url scheme:2:1", "MEMBERS:UNRESOLVED:url scheme:3:1",
  "MEMBERS:UNRESOLVED:query:1:2", "MEMBERS:UNRESOLVED:query:2:2",
  "MEMBERS:UNRESOLVED:empty:1:1",
  "MEMBERS:UNRESOLVED:outside the root:1:2",
  "MEMBERS:UNRESOLVED:no file:1:1", "MEMBERS:UNRESOLVED:no file:2:1",
  "MEMBERS:UNRESOLVED:ambiguous:1:2",
  "MEMBERS:UNRESOLVED:directory package:1:1",
  "MEMBERS:UNRESOLVED:no package:1:1",
  "MEMBERS:UNRESOLVED:no export:1:1", "MEMBERS:UNRESOLVED:no export:2:1", "MEMBERS:UNRESOLVED:no export:3:2",
  "MEMBERS:UNRESOLVED:no imports map:1:1",
  "MEMBERS:EXPORT_TARGETS:1:2",
  "MEMBERS:EXPORT_TARGETS:sugar:1:2", "MEMBERS:EXPORT_TARGETS:sugar:2:2", "MEMBERS:EXPORT_TARGETS:sugar:3:2",
  "MEMBERS:EXPORT_TARGETS:exact key:1:2", "MEMBERS:EXPORT_TARGETS:exact key:2:2",
  "MEMBERS:EXPORT_TARGETS:pattern key:1:3", "MEMBERS:EXPORT_TARGETS:pattern key:2:1", "MEMBERS:EXPORT_TARGETS:pattern key:3:1",
  "MEMBERS:EXPORT_TARGETS:conditions:1:2", "MEMBERS:EXPORT_TARGETS:conditions:2:2", "MEMBERS:EXPORT_TARGETS:conditions:3:1", "MEMBERS:EXPORT_TARGETS:conditions:4:1", "MEMBERS:EXPORT_TARGETS:conditions:5:1", "MEMBERS:EXPORT_TARGETS:conditions:6:1",
  "MEMBERS:EXPORT_TARGETS:array:1:2",
  "MEMBERS:EXPORT_TARGETS:string:1:2", "MEMBERS:EXPORT_TARGETS:string:2:1", "MEMBERS:EXPORT_TARGETS:string:3:2",
  "MEMBERS:IDENTITY:1:1", "MEMBERS:IDENTITY:2:1",
  "MEMBERS:IDENTITY:vitest:1:2", "MEMBERS:IDENTITY:vitest:2:2", "MEMBERS:IDENTITY:vitest:3:2", "MEMBERS:IDENTITY:vitest:4:1", "MEMBERS:IDENTITY:vitest:5:2",
  "MEMBERS:IDENTITY:carrier:1:1", "MEMBERS:IDENTITY:carrier:2:1", "MEMBERS:IDENTITY:carrier:3:2",
  "MEMBERS:IDENTITY:builtin:1:1",
  "MEMBERS:IDENTITY:module:1:2",
  "MEMBERS:SCOPES:suite:1:2",
  "MEMBERS:SCOPES:local:1:1", "MEMBERS:SCOPES:local:2:2",
  "MEMBERS:SCOPES:package:1:1", "MEMBERS:SCOPES:package:2:1",
  "MEMBERS:LOADS:1:1", "MEMBERS:LOADS:2:2", "MEMBERS:LOADS:3:2",
  "MEMBERS:LOADS:import declaration:1:1", "MEMBERS:LOADS:import declaration:2:1",
  "MEMBERS:LOADS:export declaration:1:1", "MEMBERS:LOADS:export declaration:2:1",
  "MEMBERS:LOADS:import-equals:1:2",
  "MEMBERS:LOADS:import type:1:1",
  "MEMBERS:LOADS:dynamic import:1:1", "MEMBERS:LOADS:dynamic import:2:1",
  "MEMBERS:LOADS:require call:1:1", "MEMBERS:LOADS:require call:2:1",
  "MEMBERS:ROUTES:1:1", "MEMBERS:ROUTES:2:1",
  "MEMBERS:ROUTES:dynamic load:1:3", "MEMBERS:ROUTES:dynamic load:2:3", "MEMBERS:ROUTES:dynamic load:3:2", "MEMBERS:ROUTES:dynamic load:4:2",
  "MEMBERS:ROUTES:loader name:1:3", "MEMBERS:ROUTES:loader name:2:1", "MEMBERS:ROUTES:loader name:3:1", "MEMBERS:ROUTES:loader name:4:2", "MEMBERS:ROUTES:loader name:5:2", "MEMBERS:ROUTES:loader name:6:2", "MEMBERS:ROUTES:loader name:7:1", "MEMBERS:ROUTES:loader name:8:1", "MEMBERS:ROUTES:loader name:9:1", "MEMBERS:ROUTES:loader name:10:4", "MEMBERS:ROUTES:loader name:11:3", "MEMBERS:ROUTES:loader name:12:3",
  "MEMBERS:ROUTES:loader member:1:3", "MEMBERS:ROUTES:loader member:2:1", "MEMBERS:ROUTES:loader member:3:1", "MEMBERS:ROUTES:loader member:4:2", "MEMBERS:ROUTES:loader member:5:2", "MEMBERS:ROUTES:loader member:6:3", "MEMBERS:ROUTES:loader member:7:2",
  "MEMBERS:ROUTES:vite name:1:3", "MEMBERS:ROUTES:vite name:2:1", "MEMBERS:ROUTES:vite name:3:1", "MEMBERS:ROUTES:vite name:4:1", "MEMBERS:ROUTES:vite name:5:1", "MEMBERS:ROUTES:vite name:6:3", "MEMBERS:ROUTES:vite name:7:1", "MEMBERS:ROUTES:vite name:8:1",
  "MEMBERS:ROUTES:import meta:1:3", "MEMBERS:ROUTES:import meta:2:3",
  "MEMBERS:ROUTES:sensitive builtin:1:3", "MEMBERS:ROUTES:sensitive builtin:2:2", "MEMBERS:ROUTES:sensitive builtin:3:1", "MEMBERS:ROUTES:sensitive builtin:4:1", "MEMBERS:ROUTES:sensitive builtin:5:1", "MEMBERS:ROUTES:sensitive builtin:6:1", "MEMBERS:ROUTES:sensitive builtin:7:5", "MEMBERS:ROUTES:sensitive builtin:8:5",
  "MEMBERS:ROUTES:global object:1:3", "MEMBERS:ROUTES:global object:2:2", "MEMBERS:ROUTES:global object:3:1", "MEMBERS:ROUTES:global object:4:1", "MEMBERS:ROUTES:global object:5:1", "MEMBERS:ROUTES:global object:6:1", "MEMBERS:ROUTES:global object:7:4", "MEMBERS:ROUTES:global object:8:1", "MEMBERS:ROUTES:global object:9:1", "MEMBERS:ROUTES:global object:10:2", "MEMBERS:ROUTES:global object:11:5", "MEMBERS:ROUTES:global object:12:1", "MEMBERS:ROUTES:global object:13:1", "MEMBERS:ROUTES:global object:14:1", "MEMBERS:ROUTES:global object:15:1", "MEMBERS:ROUTES:global object:16:1", "MEMBERS:ROUTES:global object:17:2", "MEMBERS:ROUTES:global object:18:4",
  "MEMBERS:ROUTES:dynamic code:1:1", "MEMBERS:ROUTES:dynamic code:2:1", "MEMBERS:ROUTES:dynamic code:3:4", "MEMBERS:ROUTES:dynamic code:4:1", "MEMBERS:ROUTES:dynamic code:5:2", "MEMBERS:ROUTES:dynamic code:6:2", "MEMBERS:ROUTES:dynamic code:7:2", "MEMBERS:ROUTES:dynamic code:8:2",
  "MEMBERS:WRITES:1:1", "MEMBERS:WRITES:2:1",
  "MEMBERS:WRITES:member write:1:4", "MEMBERS:WRITES:member write:2:2", "MEMBERS:WRITES:member write:3:2", "MEMBERS:WRITES:member write:4:2", "MEMBERS:WRITES:member write:5:2", "MEMBERS:WRITES:member write:6:2", "MEMBERS:WRITES:member write:7:2", "MEMBERS:WRITES:member write:8:4",
  "MEMBERS:WRITES:mutator member:1:1", "MEMBERS:WRITES:mutator member:2:1", "MEMBERS:WRITES:mutator member:3:1", "MEMBERS:WRITES:mutator member:4:1", "MEMBERS:WRITES:mutator member:5:1", "MEMBERS:WRITES:mutator member:6:1", "MEMBERS:WRITES:mutator member:7:1", "MEMBERS:WRITES:mutator member:8:1", "MEMBERS:WRITES:mutator member:9:1", "MEMBERS:WRITES:mutator member:10:9", "MEMBERS:WRITES:mutator member:11:9", "MEMBERS:WRITES:mutator member:12:9", "MEMBERS:WRITES:mutator member:13:9",
  "MEMBERS:WRITES:reflection:1:2", "MEMBERS:WRITES:reflection:2:2", "MEMBERS:WRITES:reflection:3:1", "MEMBERS:WRITES:reflection:4:1", "MEMBERS:WRITES:reflection:5:1", "MEMBERS:WRITES:reflection:6:1", "MEMBERS:WRITES:reflection:7:1", "MEMBERS:WRITES:reflection:8:20",
  "MEMBERS:WRITES:spy or mock member:1:5", "MEMBERS:WRITES:spy or mock member:2:6", "MEMBERS:WRITES:spy or mock member:3:1", "MEMBERS:WRITES:spy or mock member:4:1", "MEMBERS:WRITES:spy or mock member:5:1", "MEMBERS:WRITES:spy or mock member:6:1", "MEMBERS:WRITES:spy or mock member:7:1", "MEMBERS:WRITES:spy or mock member:8:1", "MEMBERS:WRITES:spy or mock member:9:1", "MEMBERS:WRITES:spy or mock member:10:1", "MEMBERS:WRITES:spy or mock member:11:1", "MEMBERS:WRITES:spy or mock member:12:1", "MEMBERS:WRITES:spy or mock member:13:1", "MEMBERS:WRITES:spy or mock member:14:1", "MEMBERS:WRITES:spy or mock member:15:1", "MEMBERS:WRITES:spy or mock member:16:1", "MEMBERS:WRITES:spy or mock member:17:1", "MEMBERS:WRITES:spy or mock member:18:1", "MEMBERS:WRITES:spy or mock member:19:64",
  "MEMBERS:WRITES:computed member:1:1", "MEMBERS:WRITES:computed member:2:1", "MEMBERS:WRITES:computed member:3:1", "MEMBERS:WRITES:computed member:4:1", "MEMBERS:WRITES:computed member:5:1",
  "MEMBERS:CHANNEL:tier config:1:3", "MEMBERS:CHANNEL:tier config:2:1", "MEMBERS:CHANNEL:tier config:3:1", "MEMBERS:CHANNEL:tier config:4:3",
  "MEMBERS:CHANNEL:setup file:1:2", "MEMBERS:CHANNEL:setup file:2:2", "MEMBERS:CHANNEL:setup file:3:1", "MEMBERS:CHANNEL:setup file:4:1", "MEMBERS:CHANNEL:setup file:5:1", "MEMBERS:CHANNEL:setup file:6:1",
  "MEMBERS:CHANNEL:cited suite:1:1", "MEMBERS:CHANNEL:cited suite:2:1", "MEMBERS:CHANNEL:cited suite:3:2", "MEMBERS:CHANNEL:cited suite:4:1",
  "MEMBERS:IMPORT:1:3", "MEMBERS:IMPORT:2:1", "MEMBERS:IMPORT:3:1", "MEMBERS:IMPORT:4:1", "MEMBERS:IMPORT:5:1", "MEMBERS:IMPORT:6:2", "MEMBERS:IMPORT:7:1", "MEMBERS:IMPORT:8:1", "MEMBERS:IMPORT:9:1", "MEMBERS:IMPORT:10:2",
  "MEMBERS:RUN:argv:1:4",
  "MEMBERS:RUN:statements:1:5", "MEMBERS:RUN:statements:2:2", "MEMBERS:RUN:statements:3:1", "MEMBERS:RUN:statements:4:2",
  "MEMBERS:RUN:default export:1:4",
  "MEMBERS:RUN:plain keys:1:2", "MEMBERS:RUN:plain keys:2:2", "MEMBERS:RUN:plain keys:3:1", "MEMBERS:RUN:plain keys:4:1", "MEMBERS:RUN:plain keys:5:1", "MEMBERS:RUN:plain keys:6:1", "MEMBERS:RUN:plain keys:7:1", "MEMBERS:RUN:plain keys:8:1", "MEMBERS:RUN:plain keys:9:1", "MEMBERS:RUN:plain keys:10:2",
  "MEMBERS:RUN:top-level keys:1:1", "MEMBERS:RUN:top-level keys:2:2",
  "MEMBERS:RUN:test keys:1:1", "MEMBERS:RUN:test keys:2:1", "MEMBERS:RUN:test keys:3:1", "MEMBERS:RUN:test keys:4:1", "MEMBERS:RUN:test keys:5:1", "MEMBERS:RUN:test keys:6:1", "MEMBERS:RUN:test keys:7:1", "MEMBERS:RUN:test keys:8:2",
  "MEMBERS:RUN:allowOnly:1:2",
  "MEMBERS:RUN:include:1:2", "MEMBERS:RUN:include:2:3", "MEMBERS:RUN:include:3:2", "MEMBERS:RUN:include:4:3",
  "MEMBERS:C:1:1",
  "MEMBERS:C:walk:1:1", "MEMBERS:C:walk:2:1", "MEMBERS:C:walk:3:1", "MEMBERS:C:walk:4:1",
  "MEMBERS:C:code:1:1", "MEMBERS:C:code:2:1", "MEMBERS:C:code:3:1", "MEMBERS:C:code:4:1", "MEMBERS:C:code:5:1", "MEMBERS:C:code:6:1", "MEMBERS:C:code:7:1", "MEMBERS:C:code:8:3", "MEMBERS:C:code:9:1", "MEMBERS:C:code:10:1", "MEMBERS:C:code:11:1", "MEMBERS:C:code:12:1", "MEMBERS:C:code:13:1", "MEMBERS:C:code:14:1", "MEMBERS:C:code:15:1", "MEMBERS:C:code:16:1",
  "MEMBERS:C:text:1:3",
  "MEMBERS:RESIDUALS:R-PACKAGE-CODE:1:2", "MEMBERS:RESIDUALS:R-PACKAGE-CODE:2:2",
  "MEMBERS:RESIDUALS:R-HELPER-PATCH:1:2", "MEMBERS:RESIDUALS:R-HELPER-PATCH:2:2", "MEMBERS:RESIDUALS:R-HELPER-PATCH:3:1", "MEMBERS:RESIDUALS:R-HELPER-PATCH:4:1",
  "CLAIM:header", "CLAIM:forms",
  "TILE:pieces", "TILE:keys",
  "ANCHOR:items", "ANCHOR:refusal-3", "ANCHOR:refusal-4", "ANCHOR:guard-rows",
];
const ROW_IDS: readonly string[] = [
  ...["BASE:import", "BASE:channel", "BASE:run", "BASE:c", "BASE:setup"],
  ...GATE_ROWS.map(row => `GATE:${row.id}:${Object.keys(row.pins).sort().join(",")}`),
  ...FORMS_ROWS.map(row => `FORMS:${row.table}:${row.word}`),
  ...PLACED.map(row => `MEMBERS:${row.key}:${row.place}:${row.pins.length}`),
  ...["CLAIM:header", "CLAIM:forms", "TILE:pieces", "TILE:keys", "ANCHOR:items", "ANCHOR:refusal-3", "ANCHOR:refusal-4", "ANCHOR:guard-rows"],
];
/** The R-B124 ruling in the export's wb-tz2.17 notes, from its heading to the next note: its folded members are items too. */
function foldedItems(): string[] {
  const notes = exportRecord(BEAD).notes;
  const start = notes.indexOf("ORCHESTRATOR RULING R-B124");
  if (start < 0) return [];
  const ends = ["GATE VERDICT", "ORCHESTRATOR RULING", "DELIVERED by"].map(heading => notes.indexOf(heading, start + 1)).filter(at => at > start);
  return [...notes.slice(start, Math.min(notes.length, ...ends)).matchAll(/^- (U\d+[a-z]?) \(/gm)].map(match => `R-B124 ${match[1] ?? ""}`);
}

describe("wb-tz2.17 HyperUnix successor-gate readers census (HX-ORIGINAL-GOALS-CLOSURE-R3)", () => {
  it("BASE: the cited suite reads IMPORT sound - its one load reaching vitest is its vitest import declaration - and its loads are the ones TypeScript's preprocessor lists", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = importReading(BASE, SUITE);
    const listed = ts.preProcessFile(read(SUITE), true, true).importedFiles.map(entry => entry.fileName);
    expect(reading.section.startsWith(`IMPORT by resolution: the one load reaching vitest is the import declaration 'vitest' at line ${expand("{{L:" + SUITE + "|import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';}}", new Map())} (vitest (vitest)); `)).toBe(true);
    expect(reading.vitest.map(load => `${load.form} ${load.specifier}`)).toEqual(["import declaration vitest"]);
    expect(reading.listing.map(entry => /^[a-z -]+ '(.*)' at line \d+ -> /.exec(entry)?.[1])).toEqual(listed);
    expect(reading.listing.filter(entry => !entry.endsWith(" -> builtin") && !entry.endsWith(" -> module"))).toEqual([`import declaration 'vitest' at line ${reading.vitest[0]?.line} -> package node_modules/vitest -> vitest (vitest)`]);
  });
  it("BASE: the cited suite reads CHANNEL quiet - no route, no write, no unvouched tier config and no setup file reaching vitest", { timeout: CENSUS_TIMEOUT }, () => {
    expect(channelReading(BASE, SUITE)).toEqual([]);
  });
  it("BASE: the census tier collects the run pin (RUN sound)", () => {
    expect(runReading(RUN_PIN, TIER_ARGV, file => BASE.read(file))).toBe(
      'the census tier runs vitest run --config vitest.census.config.ts, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include ["test/**/*.census.ts"], one glob matching test/workbench-hyperunix-successor-gate-run-pin.census.ts',
    );
  });
  it("BASE: C reads every file under src (an independent recursive listing) and finds exactly the carrier and the asserted exclusion", { timeout: CENSUS_TIMEOUT }, () => {
    const listed = readdirSync(join(ROOT, "src"), { recursive: true, withFileTypes: true }).filter(entry => entry.isFile()).map(entry => join(entry.parentPath, entry.name).slice(ROOT.length + 1).split("\\").join("/")).sort();
    expect([...BASE_SITES.files].sort()).toEqual(listed);
    expect(BASE_SITES.breaks).toEqual([]);
    expect(BASE_SITES.sites.map(site => `${site.file} ${site.form} ${site.whole ? "whole" : "embedded"} ${site.tag}`)).toEqual(["src/workbench/hyperunix-observer.ts code whole hyperunix.result/1", "src/workbench/native-evidence.ts code whole hyperunix.result/1"]);
  });
  it("BASE: the default tier's vouched config names the census guard as its one setup file", { timeout: CENSUS_TIMEOUT }, () => {
    expect(setupFiles(ROOT)).toEqual({ files: ["test/helpers/census-guard.ts"] });
  });

  it.each(GATE_ROWS)("GATE $id (refusal #$refusal, $tag): the plant reads as pinned", { timeout: CENSUS_TIMEOUT }, row => {
    const files = planted(row.edits);
    const pins = row.pins;
    expect(gateReading(files)).toEqual({
      import: pins.import === undefined ? null : expand(pins.import, files),
      channel: (pins.channel ?? []).map(pin => expand(pin, files)),
      run: pins.run ?? null,
      c: pins.c ?? [],
    });
  });

  it.each(FORMS_ROWS)("FORMS $table $word: the calibration plant reads as the word says", { timeout: CENSUS_TIMEOUT }, row => {
    expect(row.measure()).toEqual(row.expected);
  });

  it("CLAIM: the helper header's roster lines equal the rosters byte for byte, section by section, in order", () => {
    const sections = HEADER_SECTIONS.map(([name]) => {
      const at = HEADER.findIndex(line => line.startsWith(` * ${name} (`));
      const lines: string[] = [];
      for (let index = at + 1; at >= 0 && index < HEADER.length && (HEADER[index] ?? "").startsWith(" * - "); index += 1) lines.push((HEADER[index] ?? "").slice(" * - ".length));
      return [name, at < 0 ? null : lines];
    });
    expect(sections).toEqual(HEADER_SECTIONS.map(([name, list]) => [name, list.map(entry => `${entry.word}: ${entry.claim}`)]));
    expect(HEADER.filter(line => line.startsWith(" * - ")).length).toBe(HEADER_SECTIONS.reduce((total, [, list]) => total + list.length, 0));
  });
  it("CLAIM: every roster word has exactly one FORMS row, in roster order", () => {
    expect(FORMS_ROWS.map(row => `${row.table}:${row.word}`)).toEqual(HEADER_SECTIONS.flatMap(([name, list]) => list.map(entry => `${name}:${entry.word}`)));
  });
  it("ANCHOR: the export's wb-tz2.17 description and the R-B124 ruling's folded members name exactly the items ITEM_ROWS answers; every mapped row exists and every GATE row answers exactly one item", () => {
    const items = [...[...exportRecord(BEAD).description.matchAll(/^- (U\d+[a-z]?) /gm)].map(match => match[1] ?? ""), ...foldedItems()];
    expect(items).toEqual(Object.keys(ITEM_ROWS));
    const ids = ROW_IDS.map(id => id.split(":").slice(0, id.startsWith("GATE:") ? 2 : 3).join(":"));
    expect(Object.values(ITEM_ROWS).flat().filter(id => !ids.includes(id))).toEqual([]);
    const answered = Object.values(ITEM_ROWS).flat();
    expect(GATE_ROWS.map(row => `${row.id}:${answered.filter(id => id === `GATE:${row.id}`).length}`)).toEqual(GATE_ROWS.map(row => `${row.id}:1`));
  });
  it("ANCHOR: the refusal #3 verdict on wb-tz2.3 in the export names exactly the refusal #3 GATE rows", () => {
    const named = [...new Set([...refusalBlock(3).matchAll(/(?<![A-Za-z0-9-])(LG\d+[a-z]*)(?![A-Za-z0-9])/g)].map(match => match[1] ?? ""))].filter(id => !OUT_OF_SCOPE.includes(id)).sort();
    expect(named).toEqual(GATE_ROWS.filter(row => row.refusal === 3).map(row => row.id).sort());
  });
  it("ANCHOR: the refusal #4 verdict on wb-tz2.3 in the export names exactly the refusal #4 GATE rows", () => {
    const named = [...new Set([...refusalBlock(4).matchAll(/(?<![A-Za-z0-9-])(G[A-Z]+\d+[a-z]*)(?![A-Za-z0-9])/g)].map(match => match[1] ?? ""))].sort();
    expect(named).toEqual(GATE_ROWS.filter(row => row.refusal === 4).map(row => row.id).sort());
  });
  it("ANCHOR: the landed census-helper suite holds the census guard's alias and plugins rows the CHANNEL tier-config claim cites", () => {
    const text = read(CENSUS_HELPER_SUITE);
    const cited = CHANNEL_ROOTS.find(entry => entry.word === "tier config")?.claim ?? "";
    expect(["g-u62r5-alias", "g-u62r5-plugins"].map(id => [cited.includes(id), text.includes(`id: "${id}"`)])).toEqual([[true, true], [true, true]]);
  });
  it.each(PLACED)("MEMBERS $key, piece $place: $quote", { timeout: CENSUS_TIMEOUT }, row => {
    expect(row.pins.map(([measure]) => measure())).toEqual(row.pins.map(([, expected]) => expected));
  });
  it("TILE: every claim of the helper's header, split into pieces, equals the quotes of its MEMBERS rows, in order", () => {
    expect(CLAIMS.map(([key, claim]) => `${key} = ${piecesOf(claim).join(" | ")}`)).toEqual(CLAIMS.map(([key]) => `${key} = ${MEMBER_ROWS.filter(row => row.key === key).map(row => row.quote).join(" | ")}`));
  });
  it("TILE: every MEMBERS row is keyed to a claim the header makes, in the header's order", () => {
    expect([...new Set(MEMBER_ROWS.map(row => row.key))]).toEqual(CLAIMS.map(([key]) => key));
  });
  it("FROZEN SHAPE: every row is pinned, a GATE row with its pin keys and a MEMBERS row with its place and pin count", () => {
    expect(ROW_IDS).toEqual(FROZEN_SHAPE);
  });
});
