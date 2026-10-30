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
 * loud here by resolution, closure, closed keys or width - and the helper's header roster lines equal its exported rosters, which
 * equal this census's FORMS rows, word for word.
 *
 * ROWS:
 *  BASE: the unplanted subject. The cited suite test/workbench-hyperunix-observer.test.ts reads IMPORT sound (its one load reaching
 *   vitest is its vitest import declaration; its loads equal the ones TypeScript's own preprocessor lists) and CHANNEL quiet; the
 *   census tier's RUN reading is sound; C reads every file under src (equal to an independent recursive listing) and finds
 *   exactly the carrier and the asserted exclusion; the default tier's setup files are the census guard alone.
 *  GATE: the gate's own members, replayed verbatim from the two PREP records (refusal #3: gate-prep-10 / g10-gate-s142,
 *   O:1363; refusal #4: gate-prep-21 / g10-gate-s148, O:1435): each plants its edits over the subject and pins the readings it
 *   changes (absent pins read as the BASE reading). Line numbers in a pin are anchored on the planted line's own text.
 *  FORMS: one calibration plant per word of every roster: the full roster reads the plant as the word says, and the roster
 *   without the word reads it otherwise - so removing any word's reader reds its row. A catch-all word (IDENTITY module) reads
 *   the same both ways by construction.
 *  RESIDUALS: R-PACKAGE-CODE and R-HELPER-PATCH, each a pinned quiet row beside its loud control.
 *  CLAIM: the helper header's "- <word>: <claim>" lines equal the rosters byte for byte, section by section, in order; every
 *   roster word has exactly one FORMS row.
 *  ANCHOR (standing rule 16, CT5 / CT6, outside this census): the tracker export's wb-tz2.17 description names exactly the items
 *   ITEM_ROWS maps (U1, U1b, U2); the refusal #3 verdict in its wb-tz2.3 notes names exactly the refusal #3 GATE rows (the
 *   parent's own PATH and registration-narrowing members LG4, LG6 and LG6c and the family name LG5 aside, OUT_OF_SCOPE), and the
 *   refusal #4 verdict there names exactly the refusal #4 GATE rows; the landed census-helper suite holds the census guard's
 *   alias and plugins rows the CHANNEL tier-config claim cites.
 *  FROZEN SHAPE (standing rule 16): one literal pins every row as table:id, a GATE row with its pin keys.
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; it reads the helper's text, the tracker export, the
 * cited suite and its closure, the census tier's config, the landed census-helper suite and the files under src, and lays planted
 * texts and links over the disk in memory only.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { resolveTier } from "./helpers/census.js";
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
  type ExportTarget,
  type Finding,
  HEADER_SECTIONS,
  IDENTITY_KINDS,
  identityText,
  importReading,
  LOAD_FORMS,
  type LoadForm,
  loadsOf,
  type ModuleHost,
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
type ChannelOptions = ReadOptions & { readonly roots?: readonly ChannelRoot[]; readonly setup?: readonly string[] | string };
function channels(word: ChannelRoot, options: ChannelOptions, planted?: ReadonlyMap<string, string>): readonly string[][] {
  const at = host(planted);
  return [channelReading(at, SUITE, options), channelReading(at, SUITE, { ...options, roots: without(CHANNEL_ROOTS, word) })];
}
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
  form("CHANNEL", "tier config", () => channels("tier config", { setup: "the census guard is not vouched on the test tier: a planted refusal" }), [["tier config: the census guard is not vouched on the test tier: a planted refusal"], []]),
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

/** The items of the bead's description, each with the rows that answer it (ANCHOR: the export names exactly these items). */
const ITEM_ROWS: Readonly<Record<string, readonly string[]>> = {"U1": ["GATE:LG1s", "GATE:LG1sc", "GATE:LG1a", "GATE:LG1b", "GATE:LG2", "FORMS:RESOLUTION:relative", "FORMS:RESOLUTION:package", "FORMS:RESOLUTION:package imports", "FORMS:IDENTITY:vitest", "FORMS:IDENTITY:carrier", "FORMS:CHANNEL:tier config"], "U1b": ["GATE:GL1", "GATE:GL1c", "GATE:GL2", "GATE:GL2c", "GATE:GI1", "GATE:GI1c", "GATE:GVM1", "GATE:GVM1c", "FORMS:CHANNEL:setup file", "FORMS:CHANNEL:cited suite", "FORMS:WRITES:member write", "FORMS:WRITES:spy or mock member", "FORMS:ROUTES:vite name", "FORMS:ROUTES:loader name"], "U2": ["GATE:LG5a", "GATE:LG5b", "GATE:LG5c", "FORMS:C:walk", "FORMS:C:code", "FORMS:C:text"]};
/** Members the refusal #3 verdict names that are wb-tz2.3's own surfaces (PATH, its census's registration narrowing) or a family name. */
const OUT_OF_SCOPE: readonly string[] = ["LG4", "LG5", "LG6", "LG6c"];
/** FROZEN SHAPE (standing rule 16): every row, a GATE row with its pin keys. */
const FROZEN_SHAPE: readonly string[] = ["BASE:import", "BASE:channel", "BASE:run", "BASE:c", "BASE:setup", "GATE:LG1s:channel,import", "GATE:LG1sc:channel,import", "GATE:LG1a:channel,import", "GATE:LG1b:channel,import", "GATE:LG2:import", "GATE:LG3:channel", "GATE:LG3c:channel", "GATE:LG5a:c", "GATE:LG5b:c", "GATE:LG5c:c", "GATE:GL1:channel", "GATE:GL1c:channel", "GATE:GL2:channel", "GATE:GL2c:channel", "GATE:GI1:channel", "GATE:GI1c:channel", "GATE:GR1:run", "GATE:GR2:run", "GATE:GR2c:run", "GATE:GRT1:channel", "GATE:GRT1c:channel", "GATE:GVM1:channel", "GATE:GVM1c:channel", "FORMS:RESOLUTION:builtin", "FORMS:RESOLUTION:relative", "FORMS:RESOLUTION:package", "FORMS:RESOLUTION:package imports", "FORMS:UNRESOLVED:absolute path", "FORMS:UNRESOLVED:url scheme", "FORMS:UNRESOLVED:query", "FORMS:UNRESOLVED:empty", "FORMS:UNRESOLVED:outside the root", "FORMS:UNRESOLVED:no file", "FORMS:UNRESOLVED:ambiguous", "FORMS:UNRESOLVED:directory package", "FORMS:UNRESOLVED:no package", "FORMS:UNRESOLVED:no export", "FORMS:UNRESOLVED:no imports map", "FORMS:EXPORT_TARGETS:sugar", "FORMS:EXPORT_TARGETS:exact key", "FORMS:EXPORT_TARGETS:pattern key", "FORMS:EXPORT_TARGETS:conditions", "FORMS:EXPORT_TARGETS:array", "FORMS:EXPORT_TARGETS:string", "FORMS:IDENTITY:vitest", "FORMS:IDENTITY:carrier", "FORMS:IDENTITY:builtin", "FORMS:IDENTITY:module", "FORMS:SCOPES:suite", "FORMS:SCOPES:local", "FORMS:SCOPES:package", "FORMS:LOADS:import declaration", "FORMS:LOADS:export declaration", "FORMS:LOADS:import-equals", "FORMS:LOADS:import type", "FORMS:LOADS:dynamic import", "FORMS:LOADS:require call", "FORMS:ROUTES:dynamic load", "FORMS:ROUTES:loader name", "FORMS:ROUTES:loader member", "FORMS:ROUTES:vite name", "FORMS:ROUTES:import meta", "FORMS:ROUTES:sensitive builtin", "FORMS:ROUTES:global object", "FORMS:ROUTES:dynamic code", "FORMS:WRITES:member write", "FORMS:WRITES:mutator member", "FORMS:WRITES:reflection", "FORMS:WRITES:spy or mock member", "FORMS:WRITES:computed member", "FORMS:CHANNEL:tier config", "FORMS:CHANNEL:setup file", "FORMS:CHANNEL:cited suite", "FORMS:RUN:argv", "FORMS:RUN:statements", "FORMS:RUN:default export", "FORMS:RUN:plain keys", "FORMS:RUN:top-level keys", "FORMS:RUN:test keys", "FORMS:RUN:allowOnly", "FORMS:RUN:include", "FORMS:C:walk", "FORMS:C:code", "FORMS:C:text", "FORMS:RESIDUALS:R-PACKAGE-CODE", "FORMS:RESIDUALS:R-HELPER-PATCH", "CLAIM:header", "CLAIM:forms", "ANCHOR:items", "ANCHOR:refusal-3", "ANCHOR:refusal-4", "ANCHOR:guard-rows"];
const ROW_IDS: readonly string[] = [
  ...["BASE:import", "BASE:channel", "BASE:run", "BASE:c", "BASE:setup"],
  ...GATE_ROWS.map(row => `GATE:${row.id}:${Object.keys(row.pins).sort().join(",")}`),
  ...FORMS_ROWS.map(row => `FORMS:${row.table}:${row.word}`),
  ...["CLAIM:header", "CLAIM:forms", "ANCHOR:items", "ANCHOR:refusal-3", "ANCHOR:refusal-4", "ANCHOR:guard-rows"],
];

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

  it.each(FORMS_ROWS)("FORMS $table $word: the full roster reads the calibration plant as the word says, the roster without the word otherwise", { timeout: CENSUS_TIMEOUT }, row => {
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
  it("ANCHOR: the export's wb-tz2.17 description names exactly the items ITEM_ROWS answers, and every mapped row exists", () => {
    const items = [...exportRecord(BEAD).description.matchAll(/^- (U\d+[a-z]?) /gm)].map(match => match[1]);
    expect(items).toEqual(Object.keys(ITEM_ROWS));
    const ids = ROW_IDS.map(id => id.split(":").slice(0, id.startsWith("GATE:") ? 2 : 3).join(":"));
    expect(Object.values(ITEM_ROWS).flat().filter(id => !ids.includes(id))).toEqual([]);
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
  it("FROZEN SHAPE: every row is pinned, a GATE row with its pin keys", () => {
    expect(ROW_IDS).toEqual(FROZEN_SHAPE);
  });
});
