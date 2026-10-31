/**
 * wb-tz2.19 (HX-ORIGINAL-GOALS-CLOSURE-R9, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.9, orchestrator
 * rulings R-B103 and R-B128): the falsifier census of the cured LIVE SET reader, test/helpers/hx-live-set-reader.ts. Statement (the
 * bead's export title): "W1 fail-closed reader places hook/describe/helper-driven HX entries incl. M6-member-store-rooted drives,
 * narrowed out of wb-tz2.9's fail-closed core (rule-19 structural exit)".
 *
 * ACCEPTANCE (the description's and the R-B128 note's acceptance lines, verbatim in ACCEPTANCE below and held to the tracker export):
 * "each plant reds the unmodified census and greens under the cure; the FAIL CLOSED clause and the reader's placement behavior agree
 * byte-for-byte with the falsifier roster." and "each mutant reds the unmodified census beside its fail-open witness and greens under
 * the cure; the membership claim text and the binding coverage agree byte-for-byte with the falsifier roster." Read here as: every
 * gate-authored plant and reader mutant of wb-tz2.9's refusals #3 and #4 that reaches this reader is a row of this census; each plant
 * is laid over its native-read subject in memory (or read as the one-line module the gate's harness wrote) and pinned with what the
 * cured reader reads in it - a new HX local or HX case, something UNRESOLVED or something OUTSIDE - where wb-tz2.9's cut #4 reader read
 * it quiet; a plant laid over a native-read file reads other than that file's BASE row, so the same plant written there on disk reds
 * BASE; every named mutant is a ReadOptions word removal that reds every row it names (its fail-open witnesses among them); and the
 * helper's header roster lines - its FAIL CLOSED clause (UNRESOLVED, REFERENCE, PLACEMENT) and its membership claim (MODULE, ENTRY,
 * UNWRAP, BINDING, REGISTRATION, FLAG, METHOD) - equal its exported rosters byte for byte, and every roster word has a FORMS row
 * whose reading without the word differs from its reading with it.
 *
 * ROWS:
 *  ITEM: the description's enumerated items U1 and U2 and the R-B128 note's folded U2 recurrence (U2r), each label verbatim, each with
 *   the member names it carries (the GATE and MUTANT rows it names).
 *  BASE: the native-read tier's files (forge.toml native-read loads vitest.native.config.ts), each read from disk and pinned.
 *  GATE: the gate's members replayed from wb-tz2.9's notes (refusal #3, O:1369: the U1 members; refusal #4, O:1443: the U1 fail-open
 *   witnesses and the findings F1-F4 that ride with this bead), the 10 members of cut #4's residual Q9 R-LIVE-ASSIGNED-VALUE verbatim
 *   (q9), and cut #4's Q7 member 10 (q7; its store's root is already bound, so it now reads OUTSIDE). Each pins its planted reading;
 *   a pin's {{L:<text>}} is the line of the planted text that holds <text>.
 *  FORMS: one or more calibration plants per roster word (FLAG and METHOD rows built from CASE_FLAGS and CASE_METHODS), each with its
 *   reading under every word (pins) and under every word but its own (without).
 *  SPOTS: one or more plants per spot the helper's SPOTS line names, each reading OUTSIDE.
 *  CONTROLS: quiet plants no word removal reaches, each reading not live with nothing unresolved or outside.
 *  RESIDUALS: R-LIVE-INDIRECT, cut #4's Q7 members 1-9 verbatim (an hx drive through no HX local and no M5 import), each a pinned
 *   quiet row - no HX case titled "HX probe" and nothing unresolved or outside; member 5 still registers its "HX hand-off" case - then
 *   its loud control.
 *  BOUNDARY: B-NONMODULE, an entry member of a local that is no module local, which reads OUTSIDE.
 *  MUTANT: the gate's named reader mutants: each a ReadOptions word removal that reds every row it names. GM58 (every local form a
 *   module local) is a widening no word removal spells: it names its kill row, B-NONMODULE, and is measured on a helper copy.
 *
 * ANCHORS OUTSIDE THIS FILE (standing rule 16, CT5 and CT6): the tracker export .beads/issues.jsonl - wb-tz2.19's description holds
 * ITEM U1 and U2 and the acceptance line, its notes hold U2r and the R-B128 acceptance line, and wb-tz2.9's notes hold the refusal
 * lines (notes are append-only, so each is the FIRST line opening with its prefix: a later note quoting one binds nothing) whose member names (V<n>, G-<NAME>, FO-<form>, RP<n>, G<n>, GM<n>, RM-<NAME>, a -control suffix included) are exactly the
 * GATE and MUTANT rows of that source, and the cut #4 delivery line that counts Q9's members; the helper's header and exported
 * rosters (CLAIM, FORMS, SPOTS); vitest's runtime test API (the FLAG and METHOD words and NON_CASE_MEMBERS partition its test-API
 * members); TypeScript's ts.Extension (the MODULE extension words); src/workbench/providers/hyperunix.ts and the SDK (HX_ENTRIES);
 * forge.toml, vitest.native.config.ts and the native-read files on disk (BASE).
 * SELF-ANCHORED (held only by this file's literals; a coordinated removal from all of them reads green, and that is NOT claimed): the
 * CONTROLS rows, the RESIDUALS rows, BOUNDARY, the q9 member texts beyond their count, the q7 row, a FORMS plant of a word that keeps
 * another plant, and the kill lists of the MUTANT rows beyond the first.
 * FROZEN SHAPE (standing rule 16): one literal pins every row as <table>:<id>:<pin count> (FORMS: <pins>/<without>; ITEM: its member
 * count; MUTANT: its kill count).
 *
 * NOT CLAIMED: any hx behaviour, or that the native tier ran; scope (the reader reads a reference by spelling); a drive that reaches
 * hx through no HX local and no M5 import (R-LIVE-INDIRECT); wb-tz2.9's census itself - its W, S, T and N rows, its claim scanner and
 * its ROUTE reader stay with that bead, whose re-cut restates its LIVE SET reader over this helper (R-B128).
 *
 * Display paths added: none. Test-only: it spawns nothing and writes nothing; it reads the helper, the tracker export, forge.toml, the
 * native-read config and files and the provider module's source, and lays planted texts over them in memory only.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, matchesGlob } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { HyperUnix } from "@hyperunix/sdk";
import ts from "typescript";
import * as vitestApi from "vitest";
import { describe, expect, it } from "vitest";
import nativeConfig from "../vitest.native.config.js";
import { REGISTRATION_MEMBERS, resolveTier } from "./helpers/census.js";
import {
  BINDING_FORMS,
  CASE_FLAGS,
  CASE_METHODS,
  type Claim,
  ENTRY_FORMS,
  FLAG_FORMS,
  HEADER_SECTIONS,
  HX_ENTRIES,
  type LiveReading,
  liveReading,
  METHOD_FORMS,
  MODULE_FORMS,
  NON_CASE_MEMBERS,
  PLACEMENT_FORMS,
  REFERENCE_FORMS,
  REGISTRATION_FORMS,
  type ReadOptions,
  UNRESOLVED_FORMS,
  UNWRAP_FORMS,
  words,
} from "./helpers/hx-live-set-reader.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.19";
const PARENT = "wb-tz2.9";
const SUITE = `hx live-set reader census (${BEAD}, HX-ORIGINAL-GOALS-CLOSURE-R9)`;
const HELPER = "test/helpers/hx-live-set-reader.ts";
const EXPORT = ".beads/issues.jsonl";
const NATIVE_TIER = "native-read";
const NATIVE_CONFIG = "vitest.native.config.ts";
const DEFAULT_CONFIG = "vitest.config.ts";
const PROVIDER_SOURCE = "src/workbench/providers/hyperunix.ts";
const NE = "test/workbench-native-ecosystem.test.ts";
const EN = "test/workbench-ecosystem-native.test.ts";
/** Every case parses sources; the explicit budget keeps a loaded host's slowness from reading as a finding. */
const BUDGET_MS = 60_000;

type Home = "description" | "notes";
type SectionName = "MODULE" | "ENTRY" | "UNWRAP" | "BINDING" | "REGISTRATION" | "FLAG" | "METHOD" | "UNRESOLVED" | "REFERENCE" | "PLACEMENT";
interface Item {
  readonly id: string;
  readonly home: Home;
  readonly label: string;
  readonly members: readonly string[];
}
interface BaseRow {
  readonly id: string;
  readonly pins: readonly string[];
}
interface Edit {
  readonly old: string;
  readonly text: string;
}
interface GateRow {
  readonly id: string;
  readonly source: string;
  readonly subject: string;
  readonly edits?: readonly Edit[];
  readonly text?: string;
  readonly pins: readonly string[];
}
interface FormRow {
  readonly section: SectionName;
  readonly word: string;
  readonly id: string;
  readonly source: string;
  readonly pins: readonly string[];
  readonly without: readonly string[];
}
interface SpotRow {
  readonly id: string;
  readonly spot: string;
  readonly source: string;
  readonly pins: readonly string[];
}
interface SourceRow {
  readonly id: string;
  readonly source: string;
  readonly pins: readonly string[];
}
interface Mutant {
  readonly id: string;
  readonly source: string;
  readonly why: string;
  /** The words the mutant reads with; null for a widening no word removal spells (measured on a helper copy). */
  readonly options: ReadOptions | null;
  readonly kills: readonly string[];
}

const textOf = (file: string): string => readFileSync(join(ROOT, file), "utf8");
const parse = (file: string, text: string): ts.SourceFile => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** A reading as pin lines: live, each HX local, each HX case, each UNRESOLVED and each OUTSIDE entry. */
function lines(reading: LiveReading): string[] {
  return [
    reading.live ? "live" : "not live",
    ...reading.entries.map(entry => `local ${entry}`),
    ...reading.cases.map(entry => `case ${entry.registration} :: ${entry.title}`),
    ...reading.unresolved.map(entry => `unresolved ${entry}`),
    ...reading.outside.map(entry => `outside ${entry}`),
  ];
}
const readingOf = (file: string, text: string, options: ReadOptions = {}): string[] => lines(liveReading(parse(file, text), options));
/** A subject file with each edit's text put in place of its old text, which must occur in it exactly once. */
function planted(subject: string, edits: readonly Edit[]): string {
  let text = textOf(subject);
  for (const edit of edits) {
    const parts = text.split(edit.old);
    if (parts.length !== 2) throw new Error(`${subject}: the plant anchor occurs ${parts.length - 1} times: ${edit.old}`);
    text = parts.join(edit.text);
  }
  return text;
}
/** Pins with each {{L:<text>}} put as the line number of the one line of `text` that holds <text>. */
function resolved(pins: readonly string[], text: string): string[] {
  const all = text.split("\n");
  return pins.map(pin =>
    pin.replace(/\{\{L:(.*?)\}\}/g, (_match, needle: string) => {
      const at = all.flatMap((line, index) => (line.includes(needle) ? [index + 1] : []));
      return at.length === 1 ? String(at[0]) : `<${at.length} lines hold ${needle}>`;
    }),
  );
}
const without = <W extends string>(roster: readonly Claim<W>[], ...drop: readonly W[]): W[] => words(roster).filter(word => !drop.includes(word));
/** The words of every roster, with one word of one section removed. */
function withoutWord(section: SectionName, word: string): ReadOptions {
  const drop = <W extends string>(roster: readonly Claim<W>[]): W[] => words(roster).filter(entry => entry !== word);
  switch (section) {
    case "MODULE":
      return { modules: drop(MODULE_FORMS) };
    case "ENTRY":
      return { entries: drop(ENTRY_FORMS) };
    case "UNWRAP":
      return { unwraps: drop(UNWRAP_FORMS) };
    case "BINDING":
      return { bindings: drop(BINDING_FORMS) };
    case "REGISTRATION":
      return { registrations: drop(REGISTRATION_FORMS) };
    case "FLAG":
      return { flags: drop(FLAG_FORMS) };
    case "METHOD":
      return { methods: drop(METHOD_FORMS) };
    case "UNRESOLVED":
      return { unresolved: drop(UNRESOLVED_FORMS) };
    case "REFERENCE":
      return { references: drop(REFERENCE_FORMS) };
    case "PLACEMENT":
      return { placements: drop(PLACEMENT_FORMS) };
  }
}

// ---- generated tables (reviewed): ITEM, ACCEPTANCE, BASE, GATE, FORMS, SPOTS, CONTROLS, RESIDUALS, BOUNDARY ----

/** The bead's enumerated items (description) and its folded member (R-B128 note), each verbatim; members are the rows each names. */
const ITEMS: readonly Item[] = [
  { id: "U1", home: "description", label: "- U1 W1 outside-form coverage: the fail-closed reader must place HX-entry drives in beforeAll hooks (V6), describe bodies (V7), SDK clients in hooks (V8) and module-level helpers called from hooks (V2), including drives through an M6 member store rooted at a bound HX local - each V* plant reds the unmodified census with its control.", members: ["V6", "V7", "V8", "V2"] },
  { id: "U2", home: "description", label: "- U2 claimed reader subforms: every subform the W1/W2 claims name carries its own falsifier, or the claim drops the subform.", members: [] },
  { id: "U2r", home: "notes", label: "- U2 recurrence (M5 destructured membership sub-forms): the header claims renamed, shorthand and rest destructuring, but the only falsifiers (LIVE_FORMS) place the destructuring inside the HX probe case, which reads as an HX case through 'holds an M5 import' WHATEVER the binding - so reader mutants that stop binding them (GM20 rest, GM20b renamed+rest, GM20c all three) each read 23 passed | 0 failed on probe 9322b91d. Each has a measured fail-open witness: a lint-clean module-level plant in test/workbench-ecosystem-native.test.ts reds the delivered census 2|21 while the mutant census reads 0|23 on the same plant. Cure: per-sub-form falsifiers OUTSIDE the always-HX case (module-level placements that bind only through the claimed sub-form), or the membership claim states the probe-case-only pinning.", members: ["GM20", "GM20b", "GM20c"] },
];
/** The acceptance lines of the description and of the R-B128 note, verbatim. */
const ACCEPTANCE: readonly { readonly home: Home; readonly text: string }[] = [
  { home: "description", text: "Acceptance: each plant reds the unmodified census and greens under the cure; the FAIL CLOSED clause and the reader's placement behavior agree byte-for-byte with the falsifier roster." },
  { home: "notes", text: "Acceptance: each mutant reds the unmodified census beside its fail-open witness and greens under the cure; the membership claim text and the binding coverage agree byte-for-byte with the falsifier roster. wb-tz2.9's eventual re-cut is a MECHANICAL RESTATEMENT over this bead's landed fix." },
];
/** The native-read tier's files and their readings by the cured reader (no plant). */
const BASE: readonly BaseRow[] = [
  { id: "test/workbench-native-client.test.ts", pins: ["not live"] },
  { id: "test/workbench-pi-node-client.test.ts", pins: ["not live"] },
  { id: "test/workbench-ecosystem-native.test.ts", pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "case it :: HX partial coverage remains incomplete and does not license absence"] },
  { id: "test/workbench-native-ecosystem.test.ts", pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity"] },
];
/** The gate's members and cut #4's Q9 and Q7-10 members, each planted over its subject (or read as a module) and pinned. */
const GATE: readonly GateRow[] = [
  { id: "V6", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await (()=>((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind))()(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ await (()=>((nativeHyperUnixFind as}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ await (()=>((nativeHyperUnixFind as}}: nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ await (()=>((nativeHyperUnixFind as}}: nativeHyperUnixFind"] },
  { id: "V7", source: "r3-U1", subject: NE, edits: [{ old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  const hxPending=(()=>((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind))()(process.cwd(),'hx.fs/regular-file','src');\n  it('HX carried probe',async()=>{ await hxPending; },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:const hxPending=(()=>((nativeHyperUnixFind as unknown as}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:const hxPending=(()=>((nativeHyperUnixFind as unknown as}}: nativeHyperUnixFind", "outside {{L:const hxPending=(()=>((nativeHyperUnixFind as unknown as}}: nativeHyperUnixFind"] },
  { id: "V8", source: "r3-U1", subject: EN, edits: [{ old: "import {describe,expect,it,vi} from 'vitest';", text: "import {beforeAll,describe,expect,it,vi} from 'vitest';" }, { old: "describe('in-house native provider contracts',()=>{", text: "describe('in-house native provider contracts',()=>{\n  beforeAll(async()=>{ const hxCarried=await (()=>((HyperUnix as unknown as Record<string,unknown>).hxCarry=HyperUnix))().open({workspace:process.cwd()}); await hxCarried.close(); },60_000);" }], pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "case it :: HX partial coverage remains incomplete and does not license absence", "outside {{L:beforeAll(async()=>{ const hxCarried=await (()=>((HyperU}}: (HyperUnixasunknownasRecord<string,unknown>).hxCarry=HyperUnix", "outside {{L:beforeAll(async()=>{ const hxCarried=await (()=>((HyperU}}: HyperUnix", "outside {{L:beforeAll(async()=>{ const hxCarried=await (()=>((HyperU}}: HyperUnix"] },
  { id: "V2", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst carry=()=>((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind);" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await carry()(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:const carry=()=>((nativeHyperUnixFind as unknown as Reco}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:const carry=()=>((nativeHyperUnixFind as unknown as Reco}}: nativeHyperUnixFind", "outside {{L:const carry=()=>((nativeHyperUnixFind as unknown as Reco}}: nativeHyperUnixFind"] },
  { id: "V3", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nfunction carry(){ return ((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind); }" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await carry()(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:function carry(){ return ((nativeHyperUnixFind as unknow}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:function carry(){ return ((nativeHyperUnixFind as unknow}}: nativeHyperUnixFind", "outside {{L:function carry(){ return ((nativeHyperUnixFind as unknow}}: nativeHyperUnixFind"] },
  { id: "G-HOOKSTORE", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await ((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind)(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ await ((nativeHyperUnixFind as unkn}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ await ((nativeHyperUnixFind as unkn}}: nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ await ((nativeHyperUnixFind as unkn}}: nativeHyperUnixFind"] },
  { id: "G-DESCSTORE", source: "r3-U1", subject: NE, edits: [{ old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  void ((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind)(process.cwd(),'hx.fs/regular-file','src');" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:void ((nativeHyperUnixFind as unknown as Record<string,u}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:void ((nativeHyperUnixFind as unknown as Record<string,u}}: nativeHyperUnixFind", "outside {{L:void ((nativeHyperUnixFind as unknown as Record<string,u}}: nativeHyperUnixFind"] },
  { id: "G-HOOKSTORE-SDK", source: "r3-U1", subject: EN, edits: [{ old: "import {describe,expect,it,vi} from 'vitest';", text: "import {beforeAll,describe,expect,it,vi} from 'vitest';" }, { old: "describe('in-house native provider contracts',()=>{", text: "describe('in-house native provider contracts',()=>{\n  beforeAll(async()=>{ const hxCarried=await ((HyperUnix as unknown as Record<string,unknown>).hxCarry=HyperUnix).open({workspace:process.cwd()}); await hxCarried.close(); },60_000);" }], pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "case it :: HX partial coverage remains incomplete and does not license absence", "outside {{L:beforeAll(async()=>{ const hxCarried=await ((HyperUnix a}}: (HyperUnixasunknownasRecord<string,unknown>).hxCarry=HyperUnix", "outside {{L:beforeAll(async()=>{ const hxCarried=await ((HyperUnix a}}: HyperUnix", "outside {{L:beforeAll(async()=>{ const hxCarried=await ((HyperUnix a}}: HyperUnix"] },
  { id: "V6-control", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await (()=>nativeHyperUnixFind)()(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ await (()=>nativeHyperUnixFind)()(p}}: nativeHyperUnixFind"] },
  { id: "V5-control", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst carry=()=>nativeHyperUnixFind;" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await carry()(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:const carry=()=>nativeHyperUnixFind;}}: nativeHyperUnixFind"] },
  { id: "G-HOOKSTORE-control", source: "r3-U1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ await nativeHyperUnixFind(process.c}}: nativeHyperUnixFind"] },
  { id: "FO-rest", source: "r4-U1", subject: EN, edits: [{ old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst {...hxModule}=await import('../src/workbench/providers/hyperunix.js');" }, { old: "describe('in-house native provider contracts',()=>{", text: "describe('in-house native provider contracts',()=>{\n  it('HX rest probe',async()=>{ await hxModule.nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "local rest hxModule", "case it 60_000 :: HX rest probe", "case it :: HX partial coverage remains incomplete and does not license absence"] },
  { id: "FO-renamed", source: "r4-U1", subject: EN, edits: [{ old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst {nativeHyperUnixFind:hxFind}=await import('../src/workbench/providers/hyperunix.js');" }, { old: "describe('in-house native provider contracts',()=>{", text: "describe('in-house native provider contracts',()=>{\n  it('HX renamed probe',async()=>{ await hxFind(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "local destructured hxFind", "case it 60_000 :: HX renamed probe", "case it :: HX partial coverage remains incomplete and does not license absence"] },
  { id: "FO-shorthand", source: "r4-U1", subject: EN, edits: [{ old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst {nativeHyperUnixFind}=await import('../src/workbench/providers/hyperunix.js');" }, { old: "describe('in-house native provider contracts',()=>{", text: "describe('in-house native provider contracts',()=>{\n  it('HX shorthand probe',async()=>{ await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named HyperUnix", "local named registerHyperUnixFind", "local destructured nativeHyperUnixFind", "case it 60_000 :: HX shorthand probe", "case it :: HX partial coverage remains incomplete and does not license absence"] },
  { id: "RP1", source: "r4-F1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ const {missing=await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src')}=(await import('../src/workbench/providers/hyperunix.js')) as Record<string,unknown>; expect(missing).toBeDefined(); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ const {missing=await nativeHyperUni}}: nativeHyperUnixFind"] },
  { id: "RP1t", source: "r4-F1", subject: NE, edits: [{ old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst {missing=await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src')}=(await import('../src/workbench/providers/hyperunix.js')) as Record<string,unknown>;" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:const {missing=await nativeHyperUnixFind(process.cwd(),'}}: nativeHyperUnixFind"] },
  { id: "RP1c", source: "r4-F1", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ const missing=await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src'); expect(missing).toBeDefined(); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ const missing=await nativeHyperUnix}}: nativeHyperUnixFind"] },
  { id: "G21", source: "r4-F1", subject: "module", text: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const {missing = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\")} = hxProvider as Record<string, unknown>; it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local namespace hxProvider", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "G23", source: "r4-F1", subject: "module", text: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let registerHyperUnixFind; ({registerHyperUnixFind = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\")} = hxProvider as Record<string, unknown>); it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local namespace hxProvider", "local named nativeHyperUnixFind", "local alias registerHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "RP2", source: "r4-F2", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nlet carriedFind:unknown;" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ await (carriedFind=nativeHyperUnixFind)(process.cwd(),'hx.fs/regular-file','src'); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "local alias carriedFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ await (carriedFind=nativeHyperUnixF}}: carriedFind=nativeHyperUnixFind"] },
  { id: "RP3", source: "r4-F2", subject: NE, edits: [{ old: "import {describe,expect,it} from 'vitest';", text: "import {beforeAll,describe,expect,it} from 'vitest';" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  beforeAll(async()=>{ const hxResult=await (()=>((nativeHyperUnixFind as unknown as Record<string,unknown>).hxCarry=nativeHyperUnixFind))()(process.cwd(),'hx.fs/regular-file','src'); expect(hxResult).toBeDefined(); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity", "outside {{L:beforeAll(async()=>{ const hxResult=await (()=>((nativeH}}: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ const hxResult=await (()=>((nativeH}}: nativeHyperUnixFind", "outside {{L:beforeAll(async()=>{ const hxResult=await (()=>((nativeH}}: nativeHyperUnixFind"] },
  { id: "RP4", source: "r4-F2", subject: NE, edits: [{ old: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';", text: "import {hxLiveReceipt} from './helpers/hx-live-receipt.js';\nconst hxStash:(()=>Promise<unknown>)[]=[];" }, { old: "describe('native SDK ecosystem',()=>{", text: "describe('native SDK ecosystem',()=>{\n  it('HX hand-off',()=>{ hxStash.push(()=>nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src')); });\n  it('HX probe',async()=>{ await hxStash[0]?.(); },60_000);" }], pins: ["live", "local named nativeHyperUnixFind", "case it :: HX hand-off", "case it 60_000 :: HX typed query retains incomplete coverage and binary identity"] },
  { id: "G32", source: "r4-F2", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; beforeAll(async () => { await (find = nativeHyperUnixFind)(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "outside 1: find=nativeHyperUnixFind"] },
  { id: "G24", source: "r4-F3", subject: "module", text: "const {...hxModule} = await import(\"../src/workbench/providers/hyperunix.js\"); const find = hxModule.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local rest hxModule", "local alias find", "case it :: HX probe"] },
  { id: "G25", source: "r4-F3", subject: "module", text: "const {...hxModule} = await import(\"../src/workbench/providers/hyperunix.js\"); const {nativeHyperUnixFind: find} = hxModule; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local rest hxModule", "local alias find", "case it :: HX probe"] },
  { id: "G26", source: "r4-F3", subject: "module", text: "const {...hxModule} = await import(\"../src/workbench/providers/hyperunix.js\"); let find; ({nativeHyperUnixFind: find} = hxModule); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local rest hxModule", "local alias find", "case it :: HX probe"] },
  { id: "G29", source: "r4-F4", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const table = {nativeHyperUnixFind() { return 0; }}; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { id: "G30", source: "r4-F4", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; interface Shape { nativeHyperUnixFind: number } const value: Shape = {nativeHyperUnixFind: 1}; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-1", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await (() => ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind))()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60_000); it(\"HX probe\", () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-2", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; describe(\"probe\", () => { const pending = (() => ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind))()(process.cwd(), \"hx.fs/regular-file\", \"src\"); it(\"HX probe\", async () => { await pending; }); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-3", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const pending = (() => ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind))()(process.cwd(), \"hx.fs/regular-file\", \"src\"); it(\"HX probe\", async () => { await pending; });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-4", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const carry = () => ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind); let result: unknown; beforeAll(async () => { result = await carry()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60_000); it(\"HX probe\", () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-5", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function carry() { return ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind); } let result: unknown; beforeAll(async () => { result = await carry()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60_000); it(\"HX probe\", () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-6", source: "q9", subject: "module", text: "import {HyperUnix} from \"@hyperunix/sdk\"; beforeAll(async () => { const reader = await (() => ((HyperUnix as unknown as Record<string, unknown>).hxCarry = HyperUnix))().open({workspace: process.cwd()}); await reader.close(); }); it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local named HyperUnix", "outside 1: (HyperUnixasunknownasRecord<string,unknown>).hxCarry=HyperUnix", "outside 1: HyperUnix", "outside 1: HyperUnix"] },
  { id: "Q9-7", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind)(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60_000); it(\"HX probe\", () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-8", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; describe(\"probe\", () => { void ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind)(process.cwd(), \"hx.fs/regular-file\", \"src\"); it(\"HX probe\", () => { expect(1).toBe(1); }); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "Q9-9", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; beforeAll(async () => { await (find = nativeHyperUnixFind)(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "outside 1: find=nativeHyperUnixFind"] },
  { id: "Q9-10", source: "q9", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let carried; const find = (carried = nativeHyperUnixFind); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "local alias carried", "case it :: HX probe"] },
  { id: "Q7-10", source: "q7", subject: "module", text: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; beforeAll(() => { (nativeHyperUnixFind as unknown as {constructor: {prototype: Record<string, unknown>}}).constructor.prototype.hxCarry = nativeHyperUnixFind; }); it(\"HX probe\", async () => { await (describe as unknown as {hxCarry: (...args: string[]) => Promise<unknown>}).hxCarry(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
];
/** One or more calibration plants per roster word: its reading with every word, and without the word. */
const WORD_FORMS: readonly FormRow[] = [
  { section: "MODULE", word: "sdk root", id: "sdk-root", source: "import * as sdk from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { await sdk.HyperUnix.open({workspace: process.cwd()}); });", pins: ["live", "local namespace sdk", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: "provider path", id: "provider-path", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: "provider path alone", id: "provider-path-alone", source: "import * as hxProvider from \"providers/hyperunix.js\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: "no extension", id: "no-extension", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".js", id: "extension-js", source: "import * as hxProvider from \"./providers/hyperunix.js\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".ts", id: "extension-ts", source: "import * as hxProvider from \"./providers/hyperunix.ts\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".mjs", id: "extension-mjs", source: "import * as hxProvider from \"./providers/hyperunix.mjs\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".cjs", id: "extension-cjs", source: "import * as hxProvider from \"./providers/hyperunix.cjs\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".mts", id: "extension-mts", source: "import * as hxProvider from \"./providers/hyperunix.mts\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "MODULE", word: ".cts", id: "extension-cts", source: "import * as hxProvider from \"./providers/hyperunix.cts\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "ENTRY", word: "provider function", id: "provider-function", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["not live"] },
  { section: "ENTRY", word: "sdk client", id: "sdk-client", source: "import {HyperUnix} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { await HyperUnix.open({workspace: process.cwd()}); });", pins: ["live", "local named HyperUnix", "case it :: HX probe"], without: ["not live"] },
  { section: "UNWRAP", word: "parentheses", id: "unwrap-parentheses-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = (nativeHyperUnixFind); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "UNWRAP", word: "parentheses", id: "unwrap-parentheses-import", source: "const hxProvider = (await import(\"../src/workbench/providers/hyperunix.js\")); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "UNWRAP", word: "as", id: "unwrap-as-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = nativeHyperUnixFind as typeof nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "UNWRAP", word: "as", id: "unwrap-as-import", source: "const hxProvider = (await import(\"../src/workbench/providers/hyperunix.js\")) as {nativeHyperUnixFind: (...args: string[]) => Promise<unknown>}; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "UNWRAP", word: "satisfies", id: "unwrap-satisfies-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = nativeHyperUnixFind satisfies object; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "UNWRAP", word: "satisfies", id: "unwrap-satisfies-import", source: "const hxProvider = (await import(\"../src/workbench/providers/hyperunix.js\")) satisfies object; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "UNWRAP", word: "non-null", id: "unwrap-non-null-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = nativeHyperUnixFind!; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "UNWRAP", word: "non-null", id: "unwrap-non-null-import", source: "const hxProvider = (await import(\"../src/workbench/providers/hyperunix.js\"))!; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "UNWRAP", word: "type assertion", id: "unwrap-type-assertion-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = <typeof nativeHyperUnixFind>nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "UNWRAP", word: "type assertion", id: "unwrap-type-assertion-import", source: "const hxProvider = <{nativeHyperUnixFind: (...args: string[]) => Promise<unknown>}>(await import(\"../src/workbench/providers/hyperunix.js\")); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "BINDING", word: "named", id: "named", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "aliased", id: "aliased", source: "import {nativeHyperUnixFind as find} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local aliased find", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "aliased string", id: "aliased-string", source: "import {\"nativeHyperUnixFind\" as find} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local aliased find", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "type-only", id: "type-only-declaration", source: "import type {HyperUnix} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { const open: typeof HyperUnix.open = async () => { throw new Error(\"none\"); }; await open({workspace: process.cwd()}); });", pins: ["live", "local named HyperUnix", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "type-only", id: "type-only-specifier", source: "import {type HyperUnix} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { const open: typeof HyperUnix.open = async () => { throw new Error(\"none\"); }; await open({workspace: process.cwd()}); });", pins: ["live", "local named HyperUnix", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "namespace", id: "namespace", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "default", id: "default", source: "import hxProvider from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local default hxProvider", "case it :: HX probe"], without: ["not live"] },
  { section: "BINDING", word: "string specifier", id: "string-specifier", source: "const hxProvider = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""] },
  { section: "BINDING", word: "template specifier", id: "template-specifier", source: "const hxProvider = await import(`../src/workbench/providers/hyperunix.js`); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["not live", "unresolved 1: `../src/workbench/providers/hyperunix.js`"] },
  { section: "BINDING", word: "import await", id: "import-await", source: "const hxProvider = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
  { section: "BINDING", word: "dynamic", id: "dynamic-unawaited", source: "const loading = import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await (await loading).nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic loading", "case it :: HX probe"], without: ["live"] },
  { section: "BINDING", word: "destructured renamed", id: "destructured-renamed", source: "const {nativeHyperUnixFind: find} = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local destructured find", "case it :: HX probe"], without: ["live"] },
  { section: "BINDING", word: "destructured shorthand", id: "destructured-shorthand", source: "const {nativeHyperUnixFind} = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local destructured nativeHyperUnixFind", "case it :: HX probe"], without: ["live"] },
  { section: "BINDING", word: "destructured rest", id: "destructured-rest", source: "const {...hxModule} = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await hxModule.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local rest hxModule", "case it :: HX probe"], without: ["live"] },
  { section: "BINDING", word: "alias", id: "alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const zzFind = nativeHyperUnixFind; it(\"HX probe\", async () => { await zzFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias zzFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "alias member", id: "alias-member", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const find = hxProvider.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "alias member", id: "assigned-member", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; let find; find = hxProvider.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "alias element", id: "alias-element", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const find = hxProvider[\"nativeHyperUnixFind\"]; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "alias renamed", id: "alias-renamed", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const {nativeHyperUnixFind: find} = hxProvider; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider"] },
  { section: "BINDING", word: "alias shorthand", id: "alias-shorthand", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const {nativeHyperUnixFind} = hxProvider; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local namespace hxProvider"] },
  { section: "BINDING", word: "alias rest", id: "alias-rest", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const {...hxRest} = hxProvider; it(\"HX probe\", async () => { await hxRest.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local rest hxRest", "case it :: HX probe"], without: ["live", "local namespace hxProvider"] },
  { section: "BINDING", word: "namespace module", id: "namespace-module", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const find = hxProvider.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "default module", id: "default-module", source: "import hxProvider from \"../src/workbench/providers/hyperunix.js\"; const find = hxProvider.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local default hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local default hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "dynamic module", id: "dynamic-module", source: "const hxProvider = await import(\"../src/workbench/providers/hyperunix.js\"); const find = hxProvider.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local dynamic hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local dynamic hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "rest module", id: "rest-module", source: "const {...hxModule} = await import(\"../src/workbench/providers/hyperunix.js\"); const find = hxModule.nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local rest hxModule", "local alias find", "case it :: HX probe"], without: ["live", "local rest hxModule", "outside 1: hxModule"] },
  { section: "BINDING", word: "assigned =", id: "assigned-plain", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find = nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned ||=", id: "assigned-or", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find ||= nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned &&=", id: "assigned-and", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find &&= nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned ??=", id: "assigned-nullish", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find ??= nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned name", id: "assigned-name", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find = nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned renamed", id: "assigned-renamed", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; let find; ({nativeHyperUnixFind: find} = hxProvider); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias find", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "assigned shorthand", id: "assigned-shorthand", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; let nativeHyperUnixFind; ({nativeHyperUnixFind} = hxProvider); it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "local alias nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "BINDING", word: "store", id: "store", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const holder = {find: undefined}; holder.find = nativeHyperUnixFind; it(\"HX probe\", async () => { await holder.find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local store holder", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "unresolved 1: an unread assignment: holder.find=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "store element", id: "store-element", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const holder = {find: undefined}; holder[\"find\"] = nativeHyperUnixFind; it(\"HX probe\", async () => { await holder.find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local store holder", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "unresolved 1: an unread assignment: holder[\"find\"]=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "store deep", id: "store-deep", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const holder = {inner: {find: undefined}}; holder.inner.find = nativeHyperUnixFind; it(\"HX probe\", async () => { await holder.inner.find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local store holder", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "unresolved 1: an unread assignment: holder.inner.find=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned value", id: "assigned-value", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let carried; const find = (carried = nativeHyperUnixFind); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "local alias carried", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local alias carried", "outside 1: carried=nativeHyperUnixFind"] },
  { section: "BINDING", word: "assigned value", id: "assigned-value-chain", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let first; let second; second = (first = nativeHyperUnixFind); it(\"HX probe\", async () => { await second(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias second", "local alias first", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local alias first", "outside 1: first=nativeHyperUnixFind"] },
  { section: "BINDING", word: "fixpoint", id: "fixpoint", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let first; first = nativeHyperUnixFind; const second = first; it(\"HX probe\", async () => { await second(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias first", "local alias second", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local alias first", "outside 1: first"] },
  { section: "REGISTRATION", word: "it", id: "root-it", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "test", id: "root-test", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; test(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case test :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "vitest import", id: "vitest-import", source: "import {it as liveIt} from \"vitest\"; import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; liveIt(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case liveIt :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "declared api", id: "declared-api", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const liveIt = it; liveIt(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case liveIt :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "element member", id: "element-member", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it[\"concurrent\"](\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it[\"concurrent\"] :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "chained", id: "chained", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it.concurrent.each([[1]])(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it.concurrent.each([[1]]) :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "literal title", id: "literal-title", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "computed title", id: "computed-title", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX \" + \"probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: <computed: \"HX\"+\"probe\">"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "arrow body", id: "arrow-body", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "function body", id: "function-body", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async function () { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REGISTRATION", word: "beside", id: "beside-options", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", {timeout: 60000}, async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it {timeout:60000} :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"] },
  { section: "REGISTRATION", word: "beside", id: "beside-timeout", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60000);", pins: ["live", "local named nativeHyperUnixFind", "case it 60000 :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"] },
  { section: "UNRESOLVED", word: "stray specifier", id: "stray-require", source: "const hxProvider = require(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""], without: ["not live"] },
  { section: "UNRESOLVED", word: "stray specifier", id: "stray-import-actual", source: "it(\"HX probe\", async () => { const hxProvider = await vi.importActual(\"../src/workbench/providers/hyperunix.js\"); await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""], without: ["not live"] },
  { section: "UNRESOLVED", word: "stray specifier", id: "stray-held", source: "const specifier = \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { const hxProvider = await import(specifier); await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""], without: ["not live"] },
  { section: "UNRESOLVED", word: "stray specifier", id: "stray-export-from", source: "export {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { expect(1).toBe(1); });", pins: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""], without: ["not live"] },
  { section: "UNRESOLVED", word: "stray specifier", id: "stray-meta-resolve", source: "const resolved = import.meta.resolve(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { expect(resolved).toBeTruthy(); });", pins: ["not live", "unresolved 1: \"../src/workbench/providers/hyperunix.js\""], without: ["not live"] },
  { section: "UNRESOLVED", word: "unread binding", id: "unread-import-binding", source: "const {[key]: find} = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "unresolved 1: an unread binding: {[key]:find}=awaitimport(\"../src/workbench/providers/hyperunix.js\")"], without: ["live"] },
  { section: "UNRESOLVED", word: "unread binding", id: "unread-alias-binding", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const {[key]: find} = hxProvider; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "unresolved 1: an unread binding: {[key]:find}=hxProvider"], without: ["live", "local namespace hxProvider"] },
  { section: "UNRESOLVED", word: "unread binding", id: "unread-array-binding", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; const [find] = hxProvider; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "unresolved 1: an unread binding: [find]=hxProvider"], without: ["live", "local namespace hxProvider"] },
  { section: "UNRESOLVED", word: "unread assignment", id: "unread-assignment-pattern", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; let find; ({[key]: find} = hxProvider); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local namespace hxProvider", "unresolved 1: an unread assignment: {[key]:find}=hxProvider", "outside 1: hxProvider"], without: ["live", "local namespace hxProvider", "outside 1: hxProvider"] },
  { section: "UNRESOLVED", word: "unread assignment", id: "unread-assignment-call-root", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; holderOf().find = nativeHyperUnixFind; it(\"HX probe\", async () => { expect(1).toBe(1); });", pins: ["live", "local named nativeHyperUnixFind", "unresolved 1: an unread assignment: holderOf().find=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "local reference", id: "reference-hook", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", async () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "inline import", id: "reference-inline-import", source: "void import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { expect(1).toBe(1); });", pins: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"], without: ["live"] },
  { section: "REFERENCE", word: "used assignment", id: "reference-used-assignment", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; beforeAll(async () => { await (find = nativeHyperUnixFind)(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", async () => { expect(1).toBe(1); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "outside 1: find=nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind", "local alias find"] },
  { section: "REFERENCE", word: "declaration name", id: "site-declaration", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function shadow() { const nativeHyperUnixFind = 1; return 0; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "parameter name", id: "site-parameter", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function shadow(nativeHyperUnixFind?: number) { return 0; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "binding element", id: "site-binding-key", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function shadow({nativeHyperUnixFind: other}: Record<string, number>) { return other; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "binding element", id: "site-binding-name", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function shadow({other: nativeHyperUnixFind}: Record<string, number>) { return 0; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "function name", id: "site-function-declaration", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function outer() { function nativeHyperUnixFind() { return 0; } return 1; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "function name", id: "site-function-expression", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const shadow = function nativeHyperUnixFind() { return 0; }; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "class name", id: "site-class-declaration", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function outer() { class nativeHyperUnixFind {} return 1; } it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "REFERENCE", word: "class name", id: "site-class-expression", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const Shadow = class nativeHyperUnixFind {}; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "case body", id: "place-case-body", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "import declaration", id: "place-import", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "declaration source", id: "place-declaration-source", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const zzFind = nativeHyperUnixFind; it(\"HX probe\", async () => { await zzFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias zzFind", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local alias zzFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "declaration type", id: "place-declaration-type", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const hxProvider: {nativeHyperUnixFind: typeof nativeHyperUnixFind} = await import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local dynamic hxProvider", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local dynamic hxProvider", "case it :: HX probe", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "assignment binding", id: "place-assignment", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find; find = nativeHyperUnixFind; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"], without: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe", "outside 1: find", "outside 1: nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "bound store", id: "place-bound-store", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await (() => ((nativeHyperUnixFind as unknown as Record<string, unknown>).hxCarry = nativeHyperUnixFind))()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }, 60_000); it(\"HX probe\", async () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind", "outside 1: nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind", "outside 1: (nativeHyperUnixFindasunknownasRecord<string,unknown>).hxCarry=nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "bound store", id: "place-bound-alias", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let find = nativeHyperUnixFind; beforeAll(() => { find = nativeHyperUnixFind; }); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe", "outside 1: find", "outside 1: nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind", "local alias find", "case it :: HX probe"] },
  { section: "PLACEMENT", word: "binding default", id: "place-declaration-default", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const {missing = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\")} = (await import(\"../src/workbench/providers/hyperunix.js\")) as Record<string, unknown>; it(\"HX probe\", async () => { expect(missing).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"], without: ["live", "local named nativeHyperUnixFind"] },
  { section: "PLACEMENT", word: "binding default", id: "place-assignment-default", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix.js\"; import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let registerHyperUnixFind; ({registerHyperUnixFind = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\")} = hxProvider); it(\"HX probe\", async () => { expect(registerHyperUnixFind).toBeDefined(); });", pins: ["live", "local namespace hxProvider", "local named nativeHyperUnixFind", "local alias registerHyperUnixFind", "case it :: HX probe", "outside 1: nativeHyperUnixFind"], without: ["live", "local namespace hxProvider", "local named nativeHyperUnixFind", "local alias registerHyperUnixFind", "case it :: HX probe"] },
];
/** The places the helper's SPOTS line names, each plant reading OUTSIDE. */
const SPOTS: readonly SpotRow[] = [
  { id: "hook", spot: "a hook", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", async () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "hook-iife-entry", spot: "a hook", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; let result: unknown; beforeAll(async () => { result = await (() => nativeHyperUnixFind)()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", async () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "describe-body", spot: "a describe body", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; describe(\"probe\", () => { const pending = nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); it(\"HX probe\", async () => { await pending; }); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "helper-function", spot: "a helper", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; async function readHx() { return nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); } it(\"HX probe\", async () => { await readHx(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "helper-returns-entry", spot: "a helper", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; function carry() { return nativeHyperUnixFind; } let result: unknown; beforeAll(async () => { result = await carry()(process.cwd(), \"hx.fs/regular-file\", \"src\"); }); it(\"HX probe\", async () => { expect(result).toBeDefined(); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "named-body", spot: "a named function", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const hxCase = async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); }; it(\"HX probe\", hxCase);", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "fixture", spot: "a fixture", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const liveIt = it.extend({find: async ({}, use) => use(nativeHyperUnixFind)}); liveIt(\"HX probe\", async ({find}) => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "table", spot: "a table", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it.each([nativeHyperUnixFind])(\"HX probe\", async find => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "bound", spot: "a value", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const find = nativeHyperUnixFind.bind(undefined); it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "array-held", spot: "a value", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const [find] = [nativeHyperUnixFind]; it(\"HX probe\", async () => { await find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "object-held", spot: "a value", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const holder = {find: nativeHyperUnixFind}; it(\"HX probe\", async () => { await holder.find(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "object-api", spot: "an unread registration form", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const api = {it}; api.it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "top-level-call", spot: "the top level", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); it(\"HX probe\", () => { expect(1).toBe(1); });", pins: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"] },
  { id: "dynamic-outside", spot: "the top level", source: "void import(\"../src/workbench/providers/hyperunix.js\"); it(\"HX probe\", async () => { expect(1).toBe(1); });", pins: ["live", "outside 1: import(\"../src/workbench/providers/hyperunix.js\")"] },
];
/** Quiet plants no word removal reaches. */
const CONTROLS: readonly SourceRow[] = [
  { id: "no-hx", source: "it(\"probe\", async () => { expect(1).toBe(1); });", pins: ["not live"] },
  { id: "sdk-non-entry", source: "import {resultFromJson} from \"@hyperunix/sdk\"; it(\"probe\", async () => { expect(resultFromJson).toBeTypeOf(\"function\"); });", pins: ["not live"] },
  { id: "provider-non-entry", source: "import {HYPERUNIX_FIND_CONTRACT} from \"../src/workbench/providers/hyperunix.js\"; it(\"probe\", async () => { expect(HYPERUNIX_FIND_CONTRACT).toBe(\"hyperunix.find/v1\"); });", pins: ["not live"] },
  { id: "sdk-subpath", source: "import * as raw from \"@hyperunix/sdk/raw\"; it(\"probe\", async () => { expect(raw).toBeDefined(); });", pins: ["not live"] },
  { id: "provider-sibling", source: "import * as hxProvider from \"../src/workbench/providers/hyperunix-extra.js\"; it(\"probe\", async () => { expect(hxProvider).toBeDefined(); });", pins: ["not live"] },
  { id: "comment", source: "/* nativeHyperUnixFind lands here once the gate opens */ it(\"probe\", async () => { expect(1).toBe(1); });", pins: ["not live"] },
  { id: "title-text", source: "it(\"HX nativeHyperUnixFind probe\", async () => { expect(1).toBe(1); });", pins: ["not live"] },
  { id: "side-effect", source: "import \"../src/workbench/providers/hyperunix.js\"; it(\"probe\", async () => { expect(1).toBe(1); });", pins: ["not live"] },
];
/** R-LIVE-INDIRECT: cut #4's Q7 members 1-9 verbatim, each a pinned quiet row, then its loud control. */
const RESIDUALS: readonly SourceRow[] = [
  { id: "R-LIVE-INDIRECT-1", source: "import {liveFind} from \"./helpers/hx-live.js\"; it(\"HX probe\", async () => { await liveFind(); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-2", source: "import {runHx} from \"@hyperunix/sdk/raw\"; it(\"HX probe\", async () => { await runHx([\"find\", \"--kind\", \"hx.fs/regular-file\", \"src\"]); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-3", source: "it(\"HX probe\", async () => { const hxProvider = await import(\"../src/workbench/providers/\" + \"hyperunix.js\"); await hxProvider.nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-4", source: "import {registry} from \"./helpers/live-registry.js\"; it(\"HX probe\", async () => { await registry.invoke(\"hyperunix.find\", {kind: \"hx.fs/regular-file\", root: \"src\"}, {grants: [\"hyperunix:read\"]}); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-5", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const stash: (() => Promise<unknown>)[] = []; it(\"HX hand-off\", () => { stash.push(() => nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\")); }); it(\"HX probe\", async () => { await stash[0]?.(); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX hand-off"] },
  { id: "R-LIVE-INDIRECT-6", source: "import {streamFind} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { const execution = streamFind({kind: \"hx.fs/regular-file\", root: \"src\"}, {binary: \"hx\", cwd: process.cwd()}); await execution.result(); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-7", source: "import {stream} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { const execution = stream({operation: \"find\", options: [[\"--kind\", \"hx.fs/regular-file\"]], operands: [\"src\"]}, {binary: \"hx\"}); await execution.result(); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-8", source: "import {runPlanStream} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { await runPlanStream(new Uint8Array(), [\"exec\"], {hx: \"hx\"}); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-9", source: "import {executePlanStream, query} from \"@hyperunix/sdk\"; it(\"HX probe\", async () => { await executePlanStream(query(\"hx.fs/regular-file\"), {hx: \"hx\"}); });", pins: ["not live"] },
  { id: "R-LIVE-INDIRECT-control", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; it(\"HX probe\", async () => { await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "case it :: HX probe"] },
];
/** The fail-closed edge GM58 widens. */
const BOUNDARY: readonly SourceRow[] = [
  { id: "B-NONMODULE", source: "import {nativeHyperUnixFind} from \"../src/workbench/providers/hyperunix.js\"; const first = nativeHyperUnixFind; const second = first.nativeHyperUnixFind; it(\"HX probe\", async () => { await second(process.cwd(), \"hx.fs/regular-file\", \"src\"); });", pins: ["live", "local named nativeHyperUnixFind", "local alias first", "outside 1: first", "outside 1: nativeHyperUnixFind"] },
];

const NAMED = 'import {nativeHyperUnixFind} from "../src/workbench/providers/hyperunix.js";';
const FIND = 'await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file", "src");';
/** The argument a case method takes before it returns the next registration function. */
const METHOD_ARGUMENT: Readonly<Record<string, string>> = { each: "[[1]]", extend: "{}", for: "[[1]]", override: "{}", runIf: "true", scoped: "{}", skipIf: "false" };
/** A FLAG or METHOD row: the live call registered through `register`, which reads OUTSIDE once the word is removed. */
const caseRow = (section: "FLAG" | "METHOD", word: string, register: string): FormRow => ({
  section,
  word,
  id: `${section === "FLAG" ? "flag" : "method"}-${word}`,
  source: `${NAMED} ${register}("HX probe", async () => { ${FIND} });`,
  pins: ["live", "local named nativeHyperUnixFind", `case ${register} :: HX probe`],
  without: ["live", "local named nativeHyperUnixFind", "outside 1: nativeHyperUnixFind"],
});
const FORMS: readonly FormRow[] = [
  ...WORD_FORMS,
  ...CASE_FLAGS.map(flag => caseRow("FLAG", flag, `it.${flag}`)),
  ...CASE_METHODS.map(method => caseRow("METHOD", method, `it.${method}(${METHOD_ARGUMENT[method] ?? ""})`)),
];
/** The gate's named reader mutants (wb-tz2.9 refusal #3 U2, refusal #4 U1, F3 and F4). */
const MUTANTS: readonly Mutant[] = [
  { id: "RM-ORAND", source: "r3-U2", why: "M6 assignments written with = and ??= only", options: { bindings: without(BINDING_FORMS, "assigned ||=", "assigned &&=") }, kills: ["assigned-or", "assigned-and"] },
  {
    id: "RM-EXT",
    source: "r3-U2",
    why: "a provider path written bare or with .js only",
    options: { modules: without(MODULE_FORMS, ".ts", ".mjs", ".cjs", ".mts", ".cts") },
    kills: ["extension-ts", "extension-mjs", "extension-cjs", "extension-mts", "extension-cts"],
  },
  {
    id: "RM-NSFORMS",
    source: "r3-U2",
    why: "a namespace local the only module local",
    options: { bindings: without(BINDING_FORMS, "default module", "dynamic module", "rest module") },
    kills: ["default-module", "dynamic-module", "rest-module", "G24", "G25", "G26"],
  },
  {
    id: "GM20",
    source: "r4-U1",
    why: "no rest element binds",
    options: { bindings: without(BINDING_FORMS, "destructured rest", "alias rest") },
    kills: ["FO-rest", "destructured-rest", "alias-rest", "rest-module", "G24", "G25", "G26"],
  },
  {
    id: "GM20b",
    source: "r4-U1",
    why: "the M5 path binds only entry-named locals: no renamed and no rest local",
    options: { bindings: without(BINDING_FORMS, "destructured renamed", "destructured rest") },
    kills: ["FO-renamed", "FO-rest", "destructured-renamed", "destructured-rest"],
  },
  {
    id: "GM20c",
    source: "r4-U1",
    why: "the M5 path binds no destructured local",
    options: { bindings: without(BINDING_FORMS, "destructured renamed", "destructured shorthand", "destructured rest") },
    kills: ["FO-renamed", "FO-shorthand", "FO-rest", "destructured-renamed", "destructured-shorthand", "destructured-rest"],
  },
  { id: "GM43", source: "r4-F4", why: "a parameter's own name reads as a reference", options: { references: without(REFERENCE_FORMS, "parameter name") }, kills: ["site-parameter"] },
  { id: "GM44", source: "r4-F4", why: "a binding element's name and key read as references", options: { references: without(REFERENCE_FORMS, "binding element") }, kills: ["site-binding-key", "site-binding-name"] },
  {
    id: "GM46",
    source: "r4-F4",
    why: "function and class names read as references",
    options: { references: without(REFERENCE_FORMS, "function name", "class name") },
    kills: ["site-function-declaration", "site-function-expression", "site-class-declaration", "site-class-expression"],
  },
  { id: "GM58", source: "r4-F3", why: "every local form a module local: a widening no word removal spells, measured on a helper copy", options: null, kills: ["B-NONMODULE"] },
];
/** wb-tz2.9's note lines each source replays: each names exactly that source's GATE and MUTANT rows. */
const PARENT_LINES: readonly { readonly source: string; readonly prefix: string }[] = [
  { source: "r3-U1", prefix: "- U1-W1-FAIL-CLOSED-PLACES-ANY-M6-ASSIGNMENT (TITLE-CENSUS floor" },
  { source: "r3-U2", prefix: "- U2-CLAIMED-READER-SUBFORMS-WITHOUT-A-FALSIFIER (R-B82" },
  { source: "r4-U1", prefix: "- U1-M5-DESTRUCTURED-SUBFORMS-UNPINNED (" },
  { source: "r4-F1", prefix: "- F1 MEDIUM RIDES: (residual-list addition; rides with the dependency inversion and child wb-tz2.19)" },
  { source: "r4-F2", prefix: "- F2 LOW RIDES: (record honesty in the conservative direction; R649 class)" },
  { source: "r4-F3", prefix: "- F3 LOW RIDES: (claim wider than the reader in the fail-closed direction)" },
  { source: "r4-F4", prefix: "- F4 LOW RIDES: (binding-site exclusion, conservative over-read, unpinned)" },
];
/** The cut #4 delivery line that names Q9 and counts its members. */
const Q9_LINE = "- U1-W1-FAIL-CLOSED-PLACES-ANY-M6-ASSIGNMENT, by the cure refusal #3 names second and R-B103 binds";
const Q9_COUNT = /NEW residual family Q9 R-LIVE-ASSIGNED-VALUE \(live-set reader\), (\d+) members/;
/** A member name the gate's notes give a plant or a mutant. */
const MEMBER = /\b(?:V\d+(?:-HELPER)?(?:-control)?|G-[A-Z]+(?:-[A-Z]+)*(?:-control)?|FO-[a-z]+|RP\d+[a-z]?|GM\d+[a-z]?|RM-[A-Z]+|G\d+)\b/g;
const membersIn = (text: string): string[] => [...new Set(text.match(MEMBER) ?? [])].sort();

/** Every row as <table>:<id>:<pin count>, in table order. */
const SHAPE: readonly string[] = [
  ...ITEMS.map(row => `ITEM:${row.id}:${row.members.length}`),
  ...BASE.map(row => `BASE:${row.id}:${row.pins.length}`),
  ...GATE.map(row => `GATE:${row.id}:${row.pins.length}`),
  ...FORMS.map(row => `FORMS:${row.id}:${row.pins.length}/${row.without.length}`),
  ...SPOTS.map(row => `SPOTS:${row.id}:${row.pins.length}`),
  ...CONTROLS.map(row => `CONTROLS:${row.id}:${row.pins.length}`),
  ...RESIDUALS.map(row => `RESIDUALS:${row.id}:${row.pins.length}`),
  ...BOUNDARY.map(row => `BOUNDARY:${row.id}:${row.pins.length}`),
  ...MUTANTS.map(row => `MUTANT:${row.id}:${row.kills.length}`),
];
/** The frozen shape: every row as <table>:<id>:<pin count>, the literal standing rule 16 owes. */
const FROZEN_SHAPE: readonly string[] = [
  "ITEM:U1:4",
  "ITEM:U2:0",
  "ITEM:U2r:3",
  "BASE:test/workbench-native-client.test.ts:1",
  "BASE:test/workbench-pi-node-client.test.ts:1",
  "BASE:test/workbench-ecosystem-native.test.ts:4",
  "BASE:test/workbench-native-ecosystem.test.ts:3",
  "GATE:V6:6",
  "GATE:V7:6",
  "GATE:V8:7",
  "GATE:V2:6",
  "GATE:V3:6",
  "GATE:G-HOOKSTORE:6",
  "GATE:G-DESCSTORE:6",
  "GATE:G-HOOKSTORE-SDK:7",
  "GATE:V6-control:4",
  "GATE:V5-control:4",
  "GATE:G-HOOKSTORE-control:4",
  "GATE:FO-rest:6",
  "GATE:FO-renamed:6",
  "GATE:FO-shorthand:6",
  "GATE:RP1:4",
  "GATE:RP1t:4",
  "GATE:RP1c:4",
  "GATE:G21:4",
  "GATE:G23:5",
  "GATE:RP2:5",
  "GATE:RP3:6",
  "GATE:RP4:4",
  "GATE:G32:4",
  "GATE:G24:4",
  "GATE:G25:4",
  "GATE:G26:4",
  "GATE:G29:4",
  "GATE:G30:5",
  "GATE:Q9-1:5",
  "GATE:Q9-2:5",
  "GATE:Q9-3:5",
  "GATE:Q9-4:5",
  "GATE:Q9-5:5",
  "GATE:Q9-6:5",
  "GATE:Q9-7:5",
  "GATE:Q9-8:5",
  "GATE:Q9-9:4",
  "GATE:Q9-10:5",
  "GATE:Q7-10:4",
  "FORMS:sdk-root:3/1",
  "FORMS:provider-path:3/1",
  "FORMS:provider-path-alone:3/1",
  "FORMS:no-extension:3/1",
  "FORMS:extension-js:3/1",
  "FORMS:extension-ts:3/1",
  "FORMS:extension-mjs:3/1",
  "FORMS:extension-cjs:3/1",
  "FORMS:extension-mts:3/1",
  "FORMS:extension-cts:3/1",
  "FORMS:provider-function:3/1",
  "FORMS:sdk-client:3/1",
  "FORMS:unwrap-parentheses-alias:4/3",
  "FORMS:unwrap-parentheses-import:3/2",
  "FORMS:unwrap-as-alias:4/4",
  "FORMS:unwrap-as-import:3/2",
  "FORMS:unwrap-satisfies-alias:4/3",
  "FORMS:unwrap-satisfies-import:3/2",
  "FORMS:unwrap-non-null-alias:4/3",
  "FORMS:unwrap-non-null-import:3/2",
  "FORMS:unwrap-type-assertion-alias:4/4",
  "FORMS:unwrap-type-assertion-import:3/2",
  "FORMS:named:3/1",
  "FORMS:aliased:3/1",
  "FORMS:aliased-string:3/1",
  "FORMS:type-only-declaration:3/1",
  "FORMS:type-only-specifier:3/1",
  "FORMS:namespace:3/1",
  "FORMS:default:3/1",
  "FORMS:string-specifier:3/2",
  "FORMS:template-specifier:3/2",
  "FORMS:import-await:3/2",
  "FORMS:dynamic-unawaited:3/1",
  "FORMS:destructured-renamed:3/1",
  "FORMS:destructured-shorthand:3/1",
  "FORMS:destructured-rest:3/1",
  "FORMS:alias:4/3",
  "FORMS:alias-member:4/3",
  "FORMS:assigned-member:4/3",
  "FORMS:alias-element:4/3",
  "FORMS:alias-renamed:4/2",
  "FORMS:alias-shorthand:4/2",
  "FORMS:alias-rest:4/2",
  "FORMS:namespace-module:4/3",
  "FORMS:default-module:4/3",
  "FORMS:dynamic-module:4/3",
  "FORMS:rest-module:4/3",
  "FORMS:assigned-plain:4/3",
  "FORMS:assigned-or:4/3",
  "FORMS:assigned-and:4/3",
  "FORMS:assigned-nullish:4/3",
  "FORMS:assigned-name:4/3",
  "FORMS:assigned-renamed:4/3",
  "FORMS:assigned-shorthand:4/3",
  "FORMS:store:4/4",
  "FORMS:store-element:4/4",
  "FORMS:store-deep:4/4",
  "FORMS:assigned-value:5/4",
  "FORMS:assigned-value-chain:5/4",
  "FORMS:fixpoint:5/4",
  "FORMS:root-it:3/3",
  "FORMS:root-test:3/3",
  "FORMS:vitest-import:3/3",
  "FORMS:declared-api:3/3",
  "FORMS:element-member:3/3",
  "FORMS:chained:3/3",
  "FORMS:literal-title:3/3",
  "FORMS:computed-title:3/3",
  "FORMS:arrow-body:3/3",
  "FORMS:function-body:3/3",
  "FORMS:beside-options:3/3",
  "FORMS:beside-timeout:3/3",
  "FORMS:stray-require:2/1",
  "FORMS:stray-import-actual:2/1",
  "FORMS:stray-held:2/1",
  "FORMS:stray-export-from:2/1",
  "FORMS:stray-meta-resolve:2/1",
  "FORMS:unread-import-binding:2/1",
  "FORMS:unread-alias-binding:3/2",
  "FORMS:unread-array-binding:3/2",
  "FORMS:unread-assignment-pattern:4/3",
  "FORMS:unread-assignment-call-root:4/3",
  "FORMS:reference-hook:3/2",
  "FORMS:reference-inline-import:2/1",
  "FORMS:reference-used-assignment:4/3",
  "FORMS:site-declaration:3/4",
  "FORMS:site-parameter:3/4",
  "FORMS:site-binding-key:3/4",
  "FORMS:site-binding-name:3/4",
  "FORMS:site-function-declaration:3/4",
  "FORMS:site-function-expression:3/4",
  "FORMS:site-class-declaration:3/4",
  "FORMS:site-class-expression:3/4",
  "FORMS:place-case-body:3/4",
  "FORMS:place-import:3/4",
  "FORMS:place-declaration-source:4/5",
  "FORMS:place-declaration-type:4/6",
  "FORMS:place-assignment:4/6",
  "FORMS:place-bound-store:5/3",
  "FORMS:place-bound-alias:6/4",
  "FORMS:place-declaration-default:3/2",
  "FORMS:place-assignment-default:6/5",
  "FORMS:flag-concurrent:3/3",
  "FORMS:flag-fails:3/3",
  "FORMS:flag-only:3/3",
  "FORMS:flag-sequential:3/3",
  "FORMS:flag-skip:3/3",
  "FORMS:flag-todo:3/3",
  "FORMS:method-each:3/3",
  "FORMS:method-extend:3/3",
  "FORMS:method-for:3/3",
  "FORMS:method-override:3/3",
  "FORMS:method-runIf:3/3",
  "FORMS:method-scoped:3/3",
  "FORMS:method-skipIf:3/3",
  "SPOTS:hook:3",
  "SPOTS:hook-iife-entry:3",
  "SPOTS:describe-body:3",
  "SPOTS:helper-function:3",
  "SPOTS:helper-returns-entry:3",
  "SPOTS:named-body:3",
  "SPOTS:fixture:3",
  "SPOTS:table:3",
  "SPOTS:bound:3",
  "SPOTS:array-held:3",
  "SPOTS:object-held:3",
  "SPOTS:object-api:3",
  "SPOTS:top-level-call:3",
  "SPOTS:dynamic-outside:2",
  "CONTROLS:no-hx:1",
  "CONTROLS:sdk-non-entry:1",
  "CONTROLS:provider-non-entry:1",
  "CONTROLS:sdk-subpath:1",
  "CONTROLS:provider-sibling:1",
  "CONTROLS:comment:1",
  "CONTROLS:title-text:1",
  "CONTROLS:side-effect:1",
  "RESIDUALS:R-LIVE-INDIRECT-1:1",
  "RESIDUALS:R-LIVE-INDIRECT-2:1",
  "RESIDUALS:R-LIVE-INDIRECT-3:1",
  "RESIDUALS:R-LIVE-INDIRECT-4:1",
  "RESIDUALS:R-LIVE-INDIRECT-5:3",
  "RESIDUALS:R-LIVE-INDIRECT-6:1",
  "RESIDUALS:R-LIVE-INDIRECT-7:1",
  "RESIDUALS:R-LIVE-INDIRECT-8:1",
  "RESIDUALS:R-LIVE-INDIRECT-9:1",
  "RESIDUALS:R-LIVE-INDIRECT-control:3",
  "BOUNDARY:B-NONMODULE:5",
  "MUTANT:RM-ORAND:2",
  "MUTANT:RM-EXT:5",
  "MUTANT:RM-NSFORMS:6",
  "MUTANT:GM20:7",
  "MUTANT:GM20b:4",
  "MUTANT:GM20c:6",
  "MUTANT:GM43:1",
  "MUTANT:GM44:2",
  "MUTANT:GM46:4",
  "MUTANT:GM58:1",
];

// ---- readers of the anchors outside this file ----

let exportRows: ReadonlyMap<string, { readonly description: string; readonly notes: string }> | undefined;
/** A bead's description and notes in the tracker export. */
function beadRow(id: string): { readonly description: string; readonly notes: string } | undefined {
  if (exportRows === undefined) {
    const rows = new Map<string, { readonly description: string; readonly notes: string }>();
    for (const line of textOf(EXPORT).split("\n")) {
      if (!line.includes(`"id":"${BEAD}"`) && !line.includes(`"id":"${PARENT}"`)) continue;
      const row = JSON.parse(line) as { readonly id?: unknown; readonly description?: unknown; readonly notes?: unknown };
      if (typeof row.id === "string") rows.set(row.id, { description: typeof row.description === "string" ? row.description : "", notes: typeof row.notes === "string" ? row.notes : "" });
    }
    exportRows = rows;
  }
  return exportRows.get(id);
}
/** The helper's leading comment, line by line, without its comment markers. */
function headerLines(): string[] {
  const text = textOf(HELPER);
  return text
    .slice(0, text.indexOf("*/"))
    .split("\n")
    .map(line => line.replace(/^\s*(?:\/\*\*|\*)\s?/, ""));
}
/** The header's roster sections: each heading `<NAME> (...):` and the `- ` lines that follow it. */
function headerSections(): { readonly sections: readonly { readonly name: string; readonly lines: readonly string[] }[]; readonly stray: readonly string[] } {
  const sections: { name: string; lines: string[] }[] = [];
  const stray: string[] = [];
  let open: { name: string; lines: string[] } | undefined;
  for (const line of headerLines()) {
    const heading = /^([A-Z]+) \(.*\):$/.exec(line);
    if (heading !== null) {
      open = { name: heading[1] ?? "", lines: [] };
      sections.push(open);
      continue;
    }
    if (line.startsWith("- ")) {
      if (open === undefined) stray.push(line);
      else open.lines.push(line);
      continue;
    }
    open = undefined;
  }
  return { sections, stray };
}
interface ConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}
function selects(config: ConfigShape, file: string): boolean {
  const include = config.test?.include ?? [];
  const exclude = config.test?.exclude ?? [];
  return include.some(glob => matchesGlob(file, glob)) && !exclude.some(glob => matchesGlob(file, glob));
}
/** The native-read tier: the config forge.toml's native-read command loads and the test files that config selects. */
function nativeTier(): { readonly config: string; readonly files: readonly string[] } {
  const tier = resolveTier(ROOT, NATIVE_TIER);
  const at = tier.ok ? tier.argv.indexOf("--config") : -1;
  const config = !tier.ok ? `unresolved: ${tier.why}` : at < 0 ? DEFAULT_CONFIG : (tier.argv[at + 1] ?? "--config without a value");
  const files = readdirSync(join(ROOT, "test"), { encoding: "utf8", recursive: true })
    .filter(name => name.endsWith(".ts"))
    .map(name => `test/${name.split("\\").join("/")}`)
    .filter(file => selects(nativeConfig, file))
    .sort();
  return { config, files };
}
/** vitest's own partition of its test-API members: a flag is the whole chainable API again, a non-case member is vitest's own
 * describe or hook export, a method is any other member. */
function registrationPartition(): { readonly flags: readonly string[]; readonly methods: readonly string[]; readonly other: readonly string[] } {
  const api = it as unknown as Readonly<Record<string, unknown>>;
  const exported = vitestApi as unknown as Readonly<Record<string, unknown>>;
  const membersOf = (value: unknown): string[] =>
    typeof value === "function"
      ? Object.getOwnPropertyNames(value)
          .filter(name => REGISTRATION_MEMBERS.test.includes(name))
          .sort()
      : [];
  const flags: string[] = [];
  const methods: string[] = [];
  const other: string[] = [];
  for (const name of REGISTRATION_MEMBERS.test) {
    const member = api[name];
    if (member === describe || (member !== undefined && member === exported[name])) other.push(name);
    else if (isDeepStrictEqual(membersOf(member), REGISTRATION_MEMBERS.test)) flags.push(name);
    else methods.push(name);
  }
  return { flags, methods, other };
}
/** The provider module's exported functions, read from its source. */
function providerFunctions(): string[] {
  const sf = parse(PROVIDER_SOURCE, textOf(PROVIDER_SOURCE));
  const exported = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
  const out: string[] = [];
  for (const statement of sf.statements) {
    if (ts.isFunctionDeclaration(statement) && exported(statement) && statement.name !== undefined) out.push(statement.name.text);
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const value = declaration.initializer;
      if (ts.isIdentifier(declaration.name) && value !== undefined && (ts.isArrowFunction(value) || ts.isFunctionExpression(value))) out.push(declaration.name.text);
    }
  }
  return out;
}
const gateText = (row: GateRow): { readonly file: string; readonly text: string } =>
  row.subject === "module" ? { file: "plant.ts", text: row.text ?? "" } : { file: row.subject, text: planted(row.subject, row.edits ?? []) };
/** A named row's reading under some words, and its pins. */
function namedRow(id: string, options: ReadOptions): { readonly reading: readonly string[]; readonly pins: readonly string[] } | undefined {
  const gate = GATE.find(row => row.id === id);
  if (gate !== undefined) {
    const { file, text } = gateText(gate);
    return { reading: readingOf(file, text, options), pins: resolved(gate.pins, text) };
  }
  const plain = [...FORMS, ...SPOTS, ...BOUNDARY].find(row => row.id === id);
  return plain === undefined ? undefined : { reading: readingOf("plant.ts", plain.source, options), pins: plain.pins };
}

describe(SUITE, () => {
  it("rule 16: one literal pins every row, table by table, with its pin count", { timeout: BUDGET_MS }, () => {
    expect(SHAPE).toEqual(FROZEN_SHAPE);
    expect(new Set(SHAPE.map(entry => entry.split(":").slice(0, 2).join(":"))).size).toBe(SHAPE.length);
  });

  it("CLAIM: the helper header's roster lines equal its exported rosters, section by section and byte for byte; every roster word has a FORMS row", { timeout: BUDGET_MS }, () => {
    const { sections, stray } = headerSections();
    const withLines = sections.filter(section => section.lines.length > 0);
    expect(stray).toEqual([]);
    expect(withLines.map(section => section.name)).toEqual(HEADER_SECTIONS.map(section => section.name));
    for (const section of HEADER_SECTIONS) {
      expect(withLines.find(entry => entry.name === section.name)?.lines).toEqual(section.roster.map(entry => `- ${entry.word}: ${entry.claim}`));
      const formed = new Set(FORMS.filter(row => row.section === section.name).map(row => row.word));
      expect([...formed].sort()).toEqual(words(section.roster).sort());
    }
    const all = HEADER_SECTIONS.flatMap(section => words(section.roster));
    expect(new Set(all).size).toBe(all.length);
  });

  it("ANCHOR (the bead): wb-tz2.19's description holds ITEM U1 and U2 and its acceptance line, its notes hold U2r and theirs; each item's member names are its GATE or MUTANT rows", { timeout: BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row).toBeDefined();
    const home = (where: Home): readonly string[] => (where === "description" ? (row?.description ?? "") : (row?.notes ?? "")).split("\n");
    expect(home("description").filter(line => line.startsWith("- U"))).toEqual(ITEMS.filter(item => item.home === "description").map(item => item.label));
    // Notes are append-only and grow (a later delivery, gate or fold note may repeat a prefix): the first line is the one anchored.
    expect(home("notes").find(line => line.startsWith("- U"))).toBe(ITEMS.find(item => item.home === "notes")?.label);
    for (const entry of ACCEPTANCE) {
      const held = home(entry.home).filter(line => line.startsWith("Acceptance:"));
      expect(entry.home === "notes" ? held.slice(0, 1) : held).toEqual([entry.text]);
    }
    const named = new Set([...GATE.map(entry => entry.id), ...MUTANTS.map(entry => entry.id)]);
    for (const item of ITEMS) {
      expect(membersIn(item.label)).toEqual([...item.members].sort());
      expect(item.members.filter(member => !named.has(member))).toEqual([]);
    }
  });

  it("ANCHOR (the parent): each refusal line of wb-tz2.9's notes names exactly its source's GATE and MUTANT rows, and cut #4's delivery line counts the q9 rows", { timeout: BUDGET_MS }, () => {
    const notes = (beadRow(PARENT)?.notes ?? "").split("\n");
    // The notes are append-only: each source's line is the first that opens with its prefix (a later note may quote it again).
    for (const { source, prefix } of PARENT_LINES) {
      const held = notes.find(line => line.startsWith(prefix));
      expect(held).toBeDefined();
      const rows = [...GATE.filter(row => row.source === source).map(row => row.id), ...MUTANTS.filter(row => row.source === source).map(row => row.id)].sort();
      expect(membersIn(held ?? "")).toEqual(rows);
    }
    const q9 = notes.find(line => line.startsWith(Q9_LINE));
    expect(Number(Q9_COUNT.exec(q9 ?? "")?.[1])).toBe(GATE.filter(row => row.source === "q9").length);
    const sources = new Set([...PARENT_LINES.map(entry => entry.source), "q9", "q7"]);
    expect([...GATE, ...MUTANTS].filter(row => !sources.has(row.source)).map(row => row.id)).toEqual([]);
  });

  it("ANCHOR (vitest, TypeScript, src, the helper's SPOTS line): the FLAG and METHOD words partition vitest's test API with NON_CASE_MEMBERS, the extension words are ts.Extension's script extensions, HX_ENTRIES is the provider's functions and the SDK client, and SPOTS covers every named spot", { timeout: BUDGET_MS }, () => {
    const partition = registrationPartition();
    expect({ flags: [...partition.flags].sort(), methods: [...partition.methods].sort(), other: [...partition.other].sort() }).toEqual({
      flags: [...CASE_FLAGS].sort(),
      methods: [...CASE_METHODS].sort(),
      other: [...NON_CASE_MEMBERS].sort(),
    });
    const extensions = Object.values(ts.Extension)
      .filter(value => /^\.[cm]?[jt]s$/.test(value))
      .sort();
    expect(words(MODULE_FORMS).filter(word => word.startsWith(".")).sort()).toEqual(extensions);
    expect(HX_ENTRIES).toEqual([...providerFunctions(), HyperUnix.name].sort());
    const line = headerLines().find(entry => entry.startsWith("SPOTS ("));
    const named = (line ?? "").replace(/^SPOTS \([^)]*\): /, "").replace(/\.$/, "").split("; ");
    expect(named).toEqual([...new Set(SPOTS.map(row => row.spot))]);
  });

  it("BASE: forge.toml's native-read tier loads vitest.native.config.ts, which selects exactly the BASE files", { timeout: BUDGET_MS }, () => {
    expect(nativeTier()).toEqual({ config: NATIVE_CONFIG, files: BASE.map(row => row.id).sort() });
  });

  it.each(BASE.map(row => [row.id, row] as const))("BASE %s: the cured reader's reading of the file on disk", (_id, row) => {
    expect(readingOf(row.id, textOf(row.id))).toEqual(row.pins);
  });

  it.each(GATE.map(row => [row.id, row] as const))("GATE %s: the planted reading, other than its subject's BASE reading", (_id, row) => {
    const { file, text } = gateText(row);
    const reading = readingOf(file, text);
    expect(reading).toEqual(resolved(row.pins, text));
    const base = BASE.find(entry => entry.id === row.subject);
    if (base !== undefined) expect(reading).not.toEqual(base.pins);
  });

  it.each(FORMS.map(row => [`${row.section} ${row.word} (${row.id})`, row] as const))("FORMS %s: read with every word, and otherwise without it", (_id, row) => {
    expect(readingOf("plant.ts", row.source)).toEqual(row.pins);
    expect(readingOf("plant.ts", row.source, withoutWord(row.section, row.word))).toEqual(row.without);
    expect(row.without).not.toEqual(row.pins);
  });

  it.each(SPOTS.map(row => [`${row.spot} (${row.id})`, row] as const))("SPOTS %s: a reference no placement form reaches reads OUTSIDE", (_id, row) => {
    expect(readingOf("plant.ts", row.source)).toEqual(row.pins);
    expect(row.pins.filter(pin => pin.startsWith("outside ")).length).toBeGreaterThan(0);
  });

  it.each(CONTROLS.map(row => [row.id, row] as const))("CONTROLS %s: quiet", (_id, row) => {
    expect(readingOf("plant.ts", row.source)).toEqual(row.pins);
    expect(row.pins).toEqual(["not live"]);
  });

  it.each(RESIDUALS.map(row => [row.id, row] as const))("RESIDUALS %s: R-LIVE-INDIRECT reads its members quiet and its control loud", (id, row) => {
    const reading = readingOf("plant.ts", row.source);
    expect(reading).toEqual(row.pins);
    const quiet = !reading.some(pin => pin.startsWith("case ") && pin.endsWith(" :: HX probe")) && !reading.some(pin => pin.startsWith("unresolved ") || pin.startsWith("outside "));
    expect(quiet).toBe(!id.endsWith("-control"));
  });

  it.each(BOUNDARY.map(row => [row.id, row] as const))("BOUNDARY %s: a fail-closed edge", (_id, row) => {
    expect(readingOf("plant.ts", row.source)).toEqual(row.pins);
  });

  it.each(MUTANTS.map(row => [row.id, row] as const))("MUTANT %s: reds every row it names", (_id, row) => {
    for (const kill of row.kills) {
      const read = namedRow(kill, row.options ?? {});
      expect(read).toBeDefined();
      if (row.options !== null) expect(read?.reading).not.toEqual(read?.pins);
    }
  });
});
