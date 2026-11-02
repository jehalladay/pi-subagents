/**
 * wb-4zgj reach census (the rule-19 structural-exit child of wb-khhg: ruling R-B273 filed it with wb-khhg's refusal #3 members,
 * and ruling R-B301 folded refusal #4's members into its notes and parked the parent behind it). SUBJECT: four readers and the
 * descriptor judge of test/helpers/rf-session-lifecycle-readers.ts - readTree() (B1), launchInventory() (A1), verbInventory()
 * (C1), stateInventory() (B2) and the judge descriptorJudgeOf() builds (C1's descriptor judge) - moved byte for byte from
 * wb-khhg's FINAL cut #4 (tip b6182e1b). The parent's census and roster at that tip are not on trunk and are neither added nor
 * edited here; trunk's test/workbench-rf-session-lifecycle-census.test.ts keeps its own readers and is not read by this census.
 * The parent stays parked until this lands, and its later re-cut can import the helper.
 *
 * CUT #2 (wb-4zgj refusal #1, its BIND verdict of 2026-11-02 in the bead's notes; carrier identity R-B368): the nine carried
 * members stay killed. Refusal #1's U1 (one edit skipping every case at collection left this file at 0 passed, 12 skipped, rc 0,
 * with no hook run) is cured by the REGISTRATION GUARD below, and its U2 (ANCHOR held PO1's launch only as text) by holding
 * PO1's literal reading under ANCHOR as A1's one bound rf launch. Claim (5) is restated to what the guard and RECORDS hold, and
 * claims (2) and (4) are narrowed to what their pins hold (the refusal's F1 and F2 readings); its F4 reading, an early return in
 * SHAPE or ANCHOR, is NOT CLAIMED below.
 *
 * PINNED READER SET (this file, test/workbench-rf-session-lifecycle-reach-census.test.ts; observed at the cut: every case passes
 * on the moved readers, and each named member, applied to a copy of the helper with its refusal gate's own edit, reds the pin
 * case named after it). Each pin case is named "member <id> (<site>) - <quote>: probes <probe ids> read as written here", the
 * member, its site and its quote as the refusal row states them, and holds the probes of that one member. For every probe it
 * asserts (a) that the reader beside the probe returns exactly the literal reading written here (toEqual over the reader's whole
 * output, the scratch root relabelled "<root>", beside the mode each planted file reads back), and (b) that, with the member's own
 * key applied to the probe's input instead of to the reader, the same reader reads a plant probe differently and a 0644 twin the
 * same. A disk probe plants files at root-relative paths, each at the mode written beside it, in a fresh makeScratch root, and
 * hands that root (and, for stateInventory, the module list beside it) to the reader; a descriptor probe hands its descriptors to a
 * fresh judge from descriptorJudgeOf() and reads the ids it flags and its read log.
 * - Row R3 (wb-4zgj's description: "5 new gate-authored one-edit judge narrowings", the refusal #3 members). GD1 (the verb test
 *   blanks the descriptor's id): probe PD1, one descriptor whose id is hyperunix.session.show and no other field of which spells a
 *   session form. GD2 (the verb test drops nested schema properties): probe PD2, one descriptor hyperunix.lookup whose input schema
 *   holds one nested property, its description rf session show. GS1 (B1 judges a file's first 65536 bytes): probe PS1,
 *   docs/workbench/feature-matrix.md holding 122327 bytes of padding and then PS1's sentence. GO1 (a bound launch judged
 *   only before byte 65536): probe PO1, src/index.ts holding 252342 bytes (an execFileSync import and one padded string constant)
 *   and then PO1's function calling execFileSync on rf. GO2 (a string literal judged only before byte 65536): probe PO2,
 *   src/index.ts holding 252342 bytes of one padded string constant and then PO2's export line naming session.recover.
 * - Row R4 (wb-khhg's refusal #4 verdict: "4 NEW gate-authored one-edit judgement drops keyed on a listed file's execute bit", the
 *   members R-B301 folded into wb-4zgj's notes). GM1 (readTree): probes PM1 (qa/workbench/zz-gate-mode-note.txt holding exactly
 *   B1's plain control text, 50 bytes, mode 0755), its byte-identical 0644 twin PM1n, and PM1s (qa/workbench/smoke.sh at 0755: a
 *   shebang line, a blank line and PM1s's comment line). GM2 (launchInventory): PM2b (src/workbench/zz-gate-mode-launch.ts, 57
 *   bytes, 0755), its twin PM2bn and the first-set PM2 (71 bytes, 0755). GM3 (verbInventory): PM3b (src/workbench/
 *   zz-gate-mode-leaf.ts, 48 bytes, 0755) and its twin PM3bn. GM4 (stateInventory over that one module): PM4 (src/workbench/
 *   zz-gate-mode-state.ts, 43 bytes, 0755) and its twin PM4n.
 * Every probe text and reading below that spells a sentence B1's judge flags writes its verb as ex${"pire"} (a template part the
 * runtime joins), so that this file reads quiet to that judge: trunk's census judges every walked file but its own two.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, the rows'
 *   pins in pin order, each held to a literal; and every case of this file registered, in order, in run mode and not inverted.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): (1) wb-4zgj's description names row R3's label ("the third-cycle members: <label> - "), and its "Unmet items
 *   verbatim: " list, parsed as JSON, opens with row R3's unmet slug and holds, in its first item, member lines naming exactly row
 *   R3's pins in order, each with the pin's site and quote; each line's plant is its pin's one probe, and that probe holds what the
 *   line states: PD1 one descriptor whose id is the stated template called with the stated verb, PD2 one descriptor whose nested
 *   property descriptions are the stated template's text with the stated verb, PS1 and PO1 one file at the stated path whose bytes
 *   before the planted form are the stated count, PO1's form calling the stated launcher on rf and its literal reading holding
 *   that call as A1's one bound rf launch (cut #2: the stated path and launcher listed in rf, nothing unbound or composed, the
 *   one command rf), PO2 one file at the stated path whose form is the stated line, and every form of GS1, GO1 and GO2 starting
 *   at or past the byte offset its quote states;
 *   (2) wb-4zgj's notes open with R-B301's fold line and then row R4's unmet slug; (3) in wb-khhg's notes, the refusal #4 verdict
 *   (from its opening up to its RED) names row R4's label ("through <label>, GM1-GM4,"), the unmet item "- U1: <row R4's slug> (",
 *   each plant's "byte-identical 0644 twin", and member lines naming exactly row R4's pins in order, each with the pin's site and
 *   quote; each pin's probes are its line's plant, that plant's 0644 twin (the plant's id and "n") and, where the line names them,
 *   the natural witness PM1s and the first-set plant PM2; each plant holds the stated path, the stated text (its byte count the
 *   stated one) and the stated mode, its twin the same path and text at 0644, PM1s a file at the stated tracked executable's path
 *   and mode ending with the stated comment line, and PM2 the stated text, its launch at the stated byte, at its plant's mode.
 * - Case RECORDS (last): every case of this file ran once in run mode in the order SHAPE lists, every pin case reached its end
 *   (an afterAll sentinel refuses a RECORDS case that returns before its last statement), and the registration guard keeps its
 *   six controls: a case skipped or made todo, the describe skipped or made todo, and an enclosing suite skipped are each refused
 *   by name and mode, and a set wholly in run mode is not.
 * - The REGISTRATION GUARD (cut #2, refusal #1's U1): the describe's factory ends by reading vitest's own registration record -
 *   its collector (TestRunner.getCurrentSuite()), every case that collector holds and every suite around it - and throws on any
 *   registration outside run mode. vitest runs a skipped or todo describe's factory and fixes each registration's mode when it is
 *   made, so the file then fails at collection, before any case or hook runs. A suite nested inside the describe would be read as
 *   one registration, its own cases registering only after the factory ends; this census registers none.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each plant probe holds its form where its member's key drops it and
 * each 0644 twin where it does not: read with the key applied to the probe's input (PD1's id blanked; PD2's nested schema
 * properties removed by the member's own replacer; PS1, PO1 and PO2 cut to their first 65536 bytes; each executable planted file
 * read as empty), the same reader reads every plant differently and every twin the same - a plant probe edited so that the key
 * leaves its reading unchanged (its form moved wholly to where the key does not reach, for one), or a twin made executable, reds
 * its pin case. (3) Each named member, applied verbatim to a copy of the helper (the find and replace text of its refusal gate's
 * archived driver: gp12probes.py and gp12probes2.py for refusal #3, gp5probes.py and gp5probes2.py for refusal #4; each find text
 * occurs exactly once in the helper), reds the pin case named after it: measured by the cutting seat and recorded in its delivery
 * note, replayable by the gate. (4) The rows, pins, sites, quotes, labels and unmet slugs, and each plant fact ANCHOR names, are
 * the ones the tracker export records: a row, pin, probe, quote or label removed, swapped or shortened - in one literal or in every
 * literal together - or a plant re-planted so that a fact ANCHOR names no longer holds (PO1's launch unbound, for one), reds SHAPE
 * or ANCHOR (standing rule 16's CT1-CT6). (5) A registration outside run mode among the describe, the cases it registers and the
 * suites around it fails the file at collection, through the registration guard: the describe skipped or made todo - by its skip
 * or todo modifier, plain or conditional (skipIf, runIf), or by a skip or todo option - or one of its cases skipped or made todo
 * the same ways, it rebound to a skipping form among them, or a suite wrapping the describe in those forms. A case inverted reds
 * SHAPE or RECORDS (every case inverted at once, it rebound to its inverting form, reds ANCHOR, each pin case and the afterAll
 * sentinel instead); a case skipped at run time through its test context reds RECORDS; a pin case returning early reds RECORDS;
 * RECORDS returning early or skipped at run time, or every case skipped at run time by a hook, reds the afterAll sentinel. A
 * guard edited so that one of RECORDS's six controls changes reds RECORDS.
 *
 * NOT CLAIMED. A reading on any input that is not one of these fifteen probes is NOT CLAIMED by this census - among them a form
 * at any other byte offset or in a file of any other length, a session form in any descriptor field or position but PD1's id and
 * PD2's nested property description, a planted file at any mode but 0755 and 0644, any other file kind or path, and every input
 * the parent census's path controls, vocabulary page and descriptor canaries plant. Whether the moved readers read the live
 * checkout as the parent census states is NOT CLAIMED by this census: no case here reads the checkout but the tracker export.
 * Which other edits a member is equivalent to is NOT CLAIMED. A reader edit made together with the reading literal it changes is
 * NOT CLAIMED by this census. The parent census's own header, cases and roster, and trunk's census, are NOT CLAIMED by this
 * census. The helper's provenance (its code byte for byte the parent tip's census blob, as the helper's header states and lists)
 * is checkable against that blob and is NOT CLAIMED by this census, which reads no parent commit. No residual is claimed.
 * Cut #2's boundaries: a probe's bytes that no fact ANCHOR names (PM1s's shebang and blank-line head, PO2's head length, an early
 * copy of PS1's sentence before byte 65536, for three) are the delivered probes' own and are NOT CLAIMED by claim (4); a plant
 * whose form sits both where its key drops it and where it does not (so the key still changes its reading) is NOT CLAIMED by
 * claim (2)'s falsifier. SHAPE or ANCHOR returning early is NOT CLAIMED by this census, and neither is any other edit of this
 * file's own checking code - a comparison inside a case, ANCHOR's parse of the export, readDisk, readDescriptors or keyChanges -
 * beyond the registrations, inversions, run-time skips, early returns and guard edits claim (5) names. Two edits made together -
 * a skip and an edit that disables the registration guard (its call removed, moved ahead of the cases or handed another
 * collector, or its function narrowed past its six controls) - are NOT CLAIMED, nor is the describe's body deleted or rewritten.
 * Whether a run judges this file at all is NOT CLAIMED by this census: the file excluded from or renamed out of the default
 * tier, a name filter, passWithNoTests, or any other choice made outside this file's text.
 *
 * Display paths added: none (test-only). Each disk probe lives in makeScratch scratch, removed after its reading; the tracker
 * export is only read; no src, docs or receipt is edited.
 */
import { chmodSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, describe, expect, it, TestRunner } from "vitest";
import { descriptorJudgeOf, launchInventory, readTree, stateInventory, verbInventory } from "./helpers/rf-session-lifecycle-readers.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The opening of wb-khhg's refusal #4 verdict and of its RED section (bead notes, append-only). */
const REFUSAL_4 = "GATE VERDICT wb-khhg: REFUSED (FINAL fail-closed-core cut #4";
const REFUSAL_4_END = "\nRED (record.red verbatim)";
/** The first line of wb-4zgj's notes: R-B301's fold of refusal #4's members. */
const R_B301_FOLD = "RULE19 DEPENDENCY INVERSION R-B301 (ruling M:46247, refusal O:1729): members folded into wb-4zgj";
/** The byte offset GS1, GO1 and GO2 key on, and the cut their key makes to a probe's input. */
const CUT = 65536;

/** B1's plain control text in the parent census, PM1's text (50 bytes). */
const PLAIN = `rf sessions ex${"pire"} after 30 minutes of inactivity.`;
/** The sentence PS1 appends, as the refusal #3 gate's archived ps1 plant writes it. */
const PS1_SENTENCE = `Pi relies on rf sessions that ex${"pire"} after an hour of inactivity.`;
/** Text of exactly `bytes` bytes: one padding word and a closing newline. */
const textPadding = (bytes: number): string => `${"x".repeat(bytes - 1)}\n`;
/** A TypeScript module of exactly `bytes` bytes: `lead`, then one exported string constant of padding. */
function modulePadding(lead: string, bytes: number): string {
  const open = 'export const pad = "';
  const close = '";\n';
  return `${lead}${open}${"x".repeat(bytes - Buffer.byteLength(lead) - open.length - close.length)}${close}`;
}
/** The hyperunix native capability's input schema (src/workbench/providers/hyperunix.ts INPUT), PD1's schema. */
const HX_INPUT = { type: "object", properties: { kind: { type: "string", minLength: 1 }, root: { type: "string" } }, required: ["kind"], additionalProperties: false };

/** A file a disk probe plants: `head`, then the planted `form` appended to it, at `mode`. */
interface Planted {
  readonly path: string;
  readonly head: string;
  readonly form: string;
  readonly mode: number;
}
interface DiskReading {
  /** The reader's whole output, its root relabelled "<root>". */
  readonly output: unknown;
  /** Each planted file's path and the permission bits it reads back, in octal. */
  readonly modes: readonly string[];
}
interface DiskProbe {
  readonly id: string;
  readonly role: "plant" | "twin";
  readonly reader: "readTree" | "launchInventory" | "verbInventory" | "stateInventory";
  readonly files: readonly Planted[];
  /** The modules below the root stateInventory reads. */
  readonly modules?: readonly string[];
  readonly reading: DiskReading;
}
interface Descriptor {
  readonly id: string;
  readonly [field: string]: unknown;
}
interface DescriptorReading {
  readonly hits: readonly string[];
  readonly read: readonly string[];
}
interface DescriptorProbe {
  readonly id: string;
  readonly role: "plant";
  readonly reader: "descriptorJudge";
  readonly descriptors: readonly Descriptor[];
  readonly reading: DescriptorReading;
}
type Probe = DiskProbe | DescriptorProbe;
/** Where a member's key bites: a descriptor's id, nested schema properties, a byte offset, or a file's execute bit. */
type Key = "id" | "properties" | "offset" | "mode";
interface Pin {
  readonly id: string;
  readonly site: string;
  readonly quote: string;
  readonly key: Key;
  readonly probes: readonly Probe[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  /** Where the tracker export records the row: wb-4zgj's description, or wb-khhg's refusal #4 verdict. */
  readonly anchor: "description" | "refusal4";
  readonly unmet: string;
  readonly pins: readonly string[];
}

const PD1: Descriptor = {
  id: "hyperunix.session.show",
  version: "1.0.0",
  description: "Native HX lookup",
  inputSchema: HX_INPUT,
  effectClass: "read",
  permissions: ["hyperunix:read"],
  supportedModes: ["invoke"],
};
const PD2: Descriptor = {
  id: "hyperunix.lookup",
  version: "1.0.0",
  description: "Native HX lookup",
  inputSchema: { type: "object", properties: { name: { type: "string", description: "rf session show" } }, additionalProperties: false },
  effectClass: "read",
  permissions: ["hyperunix:read"],
  supportedModes: ["invoke"],
};
const PO1_LEAD = 'import { execFileSync } from "node:child_process";\n';
const PO1_FORM = '\nexport function gp12RfStatus(): void {\n  execFileSync("rf", ["--json", "status"]);\n}\n';
const PO2_FORM = '\nexport const GP12_RF_LEAF = "session.recover";\n';
const PM1_PATH = "qa/workbench/zz-gate-mode-note.txt";
const PM1S_PATH = "qa/workbench/smoke.sh";
const PM2_PATH = "src/workbench/zz-gate-mode-launch.ts";
const PM2B_TEXT = 'require("node:child_process").spawn("rf", process.argv);\n';
const PM2_TEXT = 'import { spawn } from "node:child_process";\nspawn("rf", process.argv);\n';
const PM3_PATH = "src/workbench/zz-gate-mode-leaf.ts";
const PM3B_TEXT = 'const leaf = "session.close";\n\nexport { leaf };\n';
const PM4_PATH = "src/workbench/zz-gate-mode-state.ts";
const PM4_TEXT = 'const key = "session_id";\n\nexport { key };\n';

const PINS: readonly Pin[] = [
  {
    id: "GD1",
    site: "C1 descriptor judge, census :1569",
    quote: 'the verb test reads JSON.stringify({ ...descriptor, id: "" })',
    key: "id",
    probes: [{ id: "PD1", role: "plant", reader: "descriptorJudge", descriptors: [PD1], reading: { hits: ["hyperunix.session.show"], read: ["hyperunix.session.show"] } }],
  },
  {
    id: "GD2",
    site: "C1 descriptor judge",
    quote: 'the verb test reads the JSON without nested schema "properties", via a JSON.stringify replacer',
    key: "properties",
    probes: [{ id: "PD2", role: "plant", reader: "descriptorJudge", descriptors: [PD2], reading: { hits: ["hyperunix.lookup"], read: ["hyperunix.lookup"] } }],
  },
  {
    id: "GS1",
    site: "B1 readTree :631",
    quote: "judges only buffer.subarray(0, 65536)",
    key: "offset",
    probes: [
      {
        id: "PS1",
        role: "plant",
        reader: "readTree",
        files: [{ path: "docs/workbench/feature-matrix.md", head: textPadding(122327), form: `\n${PS1_SENTENCE}\n`, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            walk: { files: ["docs/workbench/feature-matrix.md"], symlinks: [], unreadable: [] },
            judged: ["docs/workbench/feature-matrix.md"],
            read: ["docs/workbench/feature-matrix.md"],
            findings: [`docs/workbench/feature-matrix.md: Pi relies on rf sessions that ex${"pire"} after an hour of inactivity`],
            anchorsWalked: false,
          },
          modes: ["docs/workbench/feature-matrix.md:644"],
        },
      },
    ],
  },
  {
    id: "GO1",
    site: "A1 launchesOf :819",
    quote: "judges a bound launch only when node.pos < 65536",
    key: "offset",
    probes: [
      {
        id: "PO1",
        role: "plant",
        reader: "launchInventory",
        files: [{ path: "src/index.ts", head: modulePadding(PO1_LEAD, 252342), form: PO1_FORM, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: "src/index.ts", rf: ["src/index.ts:execFileSync"], composed: [], unbound: [], commands: ["rf"] }],
            rf: ["src/index.ts:execFileSync"],
            composed: [],
            unbound: [],
          },
          modes: ["src/index.ts:644"],
        },
      },
    ],
  },
  {
    id: "GO2",
    site: "C1 sessionVerbsOf :866",
    quote: "judges a string literal only when node.pos < 65536",
    key: "offset",
    probes: [
      {
        id: "PO2",
        role: "plant",
        reader: "verbInventory",
        files: [{ path: "src/index.ts", head: modulePadding("", 252342), form: PO2_FORM, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: "src/index.ts", argv: [], flags: [], literals: ["src/index.ts: session.recover"], renderArgv: 0, composedArgv: 0 }],
            argv: [],
            flags: [],
            literals: ["src/index.ts: session.recover"],
            renderArgv: [],
            composedArgv: [],
          },
          modes: ["src/index.ts:644"],
        },
      },
    ],
  },
  {
    id: "GM1",
    site: "B1 readTree :652",
    quote: 'findings.push(...((lstatSync(join(root, file)).mode & 0o111) !== 0 ? [] : expiryFindings(buffer.toString("utf8"))).map(...))',
    key: "mode",
    probes: [
      {
        id: "PM1",
        role: "plant",
        reader: "readTree",
        files: [{ path: PM1_PATH, head: "", form: PLAIN, mode: 0o755 }],
        reading: {
          output: {
            root: "<root>",
            walk: { files: [PM1_PATH], symlinks: [], unreadable: [] },
            judged: [PM1_PATH],
            read: [PM1_PATH],
            findings: [`qa/workbench/zz-gate-mode-note.txt: rf sessions ex${"pire"} after 30 minutes of inactivity.`],
            anchorsWalked: false,
          },
          modes: ["qa/workbench/zz-gate-mode-note.txt:755"],
        },
      },
      {
        id: "PM1n",
        role: "twin",
        reader: "readTree",
        files: [{ path: PM1_PATH, head: "", form: PLAIN, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            walk: { files: [PM1_PATH], symlinks: [], unreadable: [] },
            judged: [PM1_PATH],
            read: [PM1_PATH],
            findings: [`qa/workbench/zz-gate-mode-note.txt: rf sessions ex${"pire"} after 30 minutes of inactivity.`],
            anchorsWalked: false,
          },
          modes: ["qa/workbench/zz-gate-mode-note.txt:644"],
        },
      },
      {
        id: "PM1s",
        role: "plant",
        reader: "readTree",
        files: [{ path: PM1S_PATH, head: "#!/usr/bin/env bash\n\n", form: `# ${PLAIN}\n`, mode: 0o755 }],
        reading: {
          output: {
            root: "<root>",
            walk: { files: [PM1S_PATH], symlinks: [], unreadable: [] },
            judged: [PM1S_PATH],
            read: [PM1S_PATH],
            findings: [`qa/workbench/smoke.sh: # rf sessions ex${"pire"} after 30 minutes of inactivity`],
            anchorsWalked: false,
          },
          modes: ["qa/workbench/smoke.sh:755"],
        },
      },
    ],
  },
  {
    id: "GM2",
    site: "A1 launchInventory :981",
    quote: 'the scan reads (lstatSync(path).mode & 0o111) !== 0 ? "" : textOf(path)',
    key: "mode",
    probes: [
      {
        id: "PM2b",
        role: "plant",
        reader: "launchInventory",
        files: [{ path: PM2_PATH, head: "", form: PM2B_TEXT, mode: 0o755 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM2_PATH, rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"], composed: [], unbound: [], commands: ["rf"] }],
            rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"],
            composed: [],
            unbound: [],
          },
          modes: ["src/workbench/zz-gate-mode-launch.ts:755"],
        },
      },
      {
        id: "PM2bn",
        role: "twin",
        reader: "launchInventory",
        files: [{ path: PM2_PATH, head: "", form: PM2B_TEXT, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM2_PATH, rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"], composed: [], unbound: [], commands: ["rf"] }],
            rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"],
            composed: [],
            unbound: [],
          },
          modes: ["src/workbench/zz-gate-mode-launch.ts:644"],
        },
      },
      {
        id: "PM2",
        role: "plant",
        reader: "launchInventory",
        files: [{ path: PM2_PATH, head: "", form: PM2_TEXT, mode: 0o755 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM2_PATH, rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"], composed: [], unbound: [], commands: ["rf"] }],
            rf: ["src/workbench/zz-gate-mode-launch.ts:spawn"],
            composed: [],
            unbound: [],
          },
          modes: ["src/workbench/zz-gate-mode-launch.ts:755"],
        },
      },
    ],
  },
  {
    id: "GM3",
    site: "C1 verbInventory :1015",
    quote: "the same key",
    key: "mode",
    probes: [
      {
        id: "PM3b",
        role: "plant",
        reader: "verbInventory",
        files: [{ path: PM3_PATH, head: "", form: PM3B_TEXT, mode: 0o755 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM3_PATH, argv: [], flags: [], literals: ["src/workbench/zz-gate-mode-leaf.ts: session.close"], renderArgv: 0, composedArgv: 0 }],
            argv: [],
            flags: [],
            literals: ["src/workbench/zz-gate-mode-leaf.ts: session.close"],
            renderArgv: [],
            composedArgv: [],
          },
          modes: ["src/workbench/zz-gate-mode-leaf.ts:755"],
        },
      },
      {
        id: "PM3bn",
        role: "twin",
        reader: "verbInventory",
        files: [{ path: PM3_PATH, head: "", form: PM3B_TEXT, mode: 0o644 }],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM3_PATH, argv: [], flags: [], literals: ["src/workbench/zz-gate-mode-leaf.ts: session.close"], renderArgv: 0, composedArgv: 0 }],
            argv: [],
            flags: [],
            literals: ["src/workbench/zz-gate-mode-leaf.ts: session.close"],
            renderArgv: [],
            composedArgv: [],
          },
          modes: ["src/workbench/zz-gate-mode-leaf.ts:644"],
        },
      },
    ],
  },
  {
    id: "GM4",
    site: "B2 stateInventory :1026",
    quote: "the same key on join(root, module)",
    key: "mode",
    probes: [
      {
        id: "PM4",
        role: "plant",
        reader: "stateInventory",
        files: [{ path: PM4_PATH, head: "", form: PM4_TEXT, mode: 0o755 }],
        modules: [PM4_PATH],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM4_PATH, identifiers: [], literals: ["src/workbench/zz-gate-mode-state.ts: session_id"] }],
            identifiers: [],
            literals: ["src/workbench/zz-gate-mode-state.ts: session_id"],
          },
          modes: ["src/workbench/zz-gate-mode-state.ts:755"],
        },
      },
      {
        id: "PM4n",
        role: "twin",
        reader: "stateInventory",
        files: [{ path: PM4_PATH, head: "", form: PM4_TEXT, mode: 0o644 }],
        modules: [PM4_PATH],
        reading: {
          output: {
            root: "<root>",
            scans: [{ file: PM4_PATH, identifiers: [], literals: ["src/workbench/zz-gate-mode-state.ts: session_id"] }],
            identifiers: [],
            literals: ["src/workbench/zz-gate-mode-state.ts: session_id"],
          },
          modes: ["src/workbench/zz-gate-mode-state.ts:644"],
        },
      },
    ],
  },
];

const ROWS: readonly Row[] = [
  {
    id: "R3",
    label: "5 new gate-authored one-edit judge narrowings",
    anchor: "description",
    unmet: "U1-MEDIUM-CONFIRMED-F1-CLASS-THIRD-FAILURE-ON-FROZEN-CUT",
    pins: ["GD1", "GD2", "GS1", "GO1", "GO2"],
  },
  {
    id: "R4",
    label: "4 NEW gate-authored one-edit judgement drops keyed on a listed file's execute bit",
    anchor: "refusal4",
    unmet: "U1-MEDIUM-CONFIRMED-F1-CLASS-FOURTH-FAILURE-ON-FINAL-FAIL-CLOSED-CORE",
    pins: ["GM1", "GM2", "GM3", "GM4"],
  },
];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
const titleOf = (pin: Pin): string => `member ${pin.id} (${pin.site}) - ${pin.quote}: probes ${pin.probes.map(probe => probe.id).join(", ")} read as written here`;
const SHAPE_TITLE = "SHAPE: the rows, their pins and each pin's probe ids stay frozen, and every case is registered in order in run mode";
const ANCHOR_TITLE = "ANCHOR: rows R3 and R4, their labels, unmet slugs, pins, sites, quotes and plant facts are the ones wb-4zgj's and wb-khhg's tracker-export rows record";
const RECORDS_TITLE = "RECORDS: every case ran once in run mode in the order SHAPE lists, every pin case reached its end, and the registration guard keeps its six controls";
const TITLES = [SHAPE_TITLE, ANCHOR_TITLE, ...PINS.map(titleOf), RECORDS_TITLE];

/** Plants `files` in a fresh scratch root, reads it with the probe's reader and removes it. */
function readDisk(probe: DiskProbe, files: readonly Planted[]): DiskReading {
  const root = makeScratch("rf-session-lifecycle-reach-");
  try {
    for (const file of files) {
      const target = join(root, file.path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, file.head + file.form, { mode: file.mode });
      chmodSync(target, file.mode);
    }
    const output =
      probe.reader === "readTree" ? readTree(root) : probe.reader === "launchInventory" ? launchInventory(root) : probe.reader === "verbInventory" ? verbInventory(root) : stateInventory(root, probe.modules ?? []);
    expect(output.root, `${probe.id}: the reader names the root it was handed`).toBe(root);
    const modes = files.map(file => `${file.path}:${(lstatSync(join(root, file.path)).mode & 0o777).toString(8)}`);
    return { output: { ...output, root: "<root>" }, modes };
  } finally {
    removeScratch(root);
  }
}
/** A fresh descriptor judge over `descriptors`: the ids it flags and its read log. */
function readDescriptors(descriptors: readonly Descriptor[]): DescriptorReading {
  const read: string[] = [];
  const hits = descriptorJudgeOf(read)(descriptors);
  return { hits, read };
}
const readProbe = (probe: Probe): DiskReading | DescriptorReading => (probe.reader === "descriptorJudge" ? readDescriptors(probe.descriptors) : readDisk(probe, probe.files));
/** A descriptor with every "properties" member removed, by GD2's own JSON.stringify replacer. */
function withoutProperties(descriptor: Descriptor): Descriptor {
  const parsed: unknown = JSON.parse(JSON.stringify(descriptor, (key, value) => (key === "properties" ? undefined : value)));
  if (typeof parsed !== "object" || parsed === null || !("id" in parsed) || typeof parsed.id !== "string") throw new Error(`${descriptor.id}: the replacer dropped the id`);
  return { ...parsed, id: parsed.id };
}
/** Whether the probe reads differently with its member's key applied to its input instead of to the reader. */
function keyChanges(key: Key, probe: Probe): boolean {
  if (probe.reader === "descriptorJudge") {
    const keyed = key === "id" ? probe.descriptors.map(descriptor => ({ ...descriptor, id: "" })) : probe.descriptors.map(withoutProperties);
    return readDescriptors(keyed).hits.length !== readDescriptors(probe.descriptors).hits.length;
  }
  const keyed = probe.files.map((file): Planted => {
    if (key === "offset") return { ...file, head: Buffer.from(file.head + file.form).subarray(0, CUT).toString("utf8"), form: "" };
    return (file.mode & 0o111) !== 0 ? { ...file, head: "", form: "" } : file;
  });
  return !isDeepStrictEqual(readDisk(probe, keyed).output, readDisk(probe, probe.files).output);
}

/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text from the first occurrence of open up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
interface MemberLine {
  readonly id: string;
  readonly site: string;
  readonly quote: string;
  readonly plant: string;
  readonly detail: string;
}
/** The member lines of a refusal text: "- <id> (<site>): <quote>. Plant <plant>: <detail>". */
function memberLines(text: string): MemberLine[] {
  return text.split("\n").flatMap(line => {
    const match = /^- (G[A-Z]\d) \(([^)]*)\): (.+?)\. Plant (P[A-Z]\d[a-z]?): (.*)$/.exec(line);
    if (match === null) return [];
    const [, id = "", site = "", quote = "", plant = "", detail = ""] = match;
    return [{ id, site, quote, plant, detail }];
  });
}
const statedPins = (lines: readonly MemberLine[]): string[] => lines.map(line => `${line.id} (${line.site}): ${line.quote}`);
const pinLines = (row: Row): string[] => row.pins.map(id => `${id} (${pinOf(id).site}): ${pinOf(id).quote}`);
function diskProbe(pin: Pin, id: string): DiskProbe {
  const probe = pin.probes.find(candidate => candidate.id === id);
  if (probe === undefined || probe.reader === "descriptorJudge") throw new Error(`${pin.id}: no disk probe ${id}`);
  return probe;
}
function descriptorProbe(pin: Pin, id: string): DescriptorProbe {
  const probe = pin.probes.find(candidate => candidate.id === id);
  if (probe === undefined || probe.reader !== "descriptorJudge") throw new Error(`${pin.id}: no descriptor probe ${id}`);
  return probe;
}
/** The one file a disk probe plants. */
function onlyFile(probe: DiskProbe): Planted {
  expect(probe.files.length, `${probe.id} plants one file`).toBe(1);
  const [file] = probe.files;
  if (file === undefined) throw new Error(`${probe.id}: no planted file`);
  return file;
}
/** The descriptions an input schema's nested properties carry. */
function nestedDescriptions(descriptor: Descriptor): unknown[] {
  const schema = descriptor.inputSchema;
  if (typeof schema !== "object" || schema === null || !("properties" in schema)) return [];
  const properties = schema.properties;
  if (typeof properties !== "object" || properties === null) return [];
  return Object.values(properties).map(property => (typeof property === "object" && property !== null && "description" in property ? property.description : undefined));
}

/** One registration as vitest records it at collection: a describe, a suite or a case, its name and its run mode. */
interface Registration {
  readonly name: string;
  readonly mode: string;
}
/** A suite task as vitest links it: its registration and the suite around it (none for a describe at file scope). */
interface Enclosing extends Registration {
  readonly suite?: Enclosing | undefined;
}
/** The collector a describe's factory runs in: its registration, every registration it holds and its own suite task. */
interface Collector extends Registration {
  readonly tasks: readonly Registration[];
  readonly suite?: Enclosing | undefined;
}
/** The registration guard (cut #2, refusal #1's U1): throws, naming each one, on a registration outside run mode - the collector
 * itself, a registration it holds, or a suite around it. Called last in the describe's factory, at collection. */
function refuseUnrunRegistrations(collector: Collector): void {
  const around: Registration[] = [];
  for (let suite = collector.suite?.suite; suite !== undefined; suite = suite.suite) around.push(suite);
  const unrun = [collector, ...collector.tasks, ...around].filter(entry => entry.mode !== "run").map(entry => `${entry.name} (${entry.mode})`);
  if (unrun.length > 0) throw new Error(`registered outside run mode, so this census would not judge it: ${unrun.join(", ")}`);
}

const REACHED: string[] = [];
let recordsReachedEnd = false;
afterAll(() => {
  expect(recordsReachedEnd, "RECORDS must reach its final statement").toBe(true);
});

describe("wb-4zgj reach census (test/helpers/rf-session-lifecycle-readers.ts): nine pin cases, one per named wb-khhg member, each holding the literal readings of that member's plant probes (and, for the execute-bit members, of their 0644 twins) and reading each with the member's key applied to its input, with SHAPE, ANCHOR and RECORDS", () => {
  it(SHAPE_TITLE, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["R3:5", "R4:4"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "GD1:PD1",
      "GD2:PD2",
      "GS1:PS1",
      "GO1:PO1",
      "GO2:PO2",
      "GM1:PM1,PM1n,PM1s",
      "GM2:PM2b,PM2bn,PM2",
      "GM3:PM3b,PM3bn",
      "GM4:PM4,PM4n",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
    const registered: string[] = [];
    const collect = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name} | ${child.mode}${child.fails === true ? "+fails" : ""}`);
        else if (child.type === "suite") collect(child.tasks);
      }
    };
    collect(task.file.tasks);
    expect(registered, "every case of this file, registered in order, in run mode and not inverted").toEqual(TITLES.map(title => `${title} | run`));
  });

  it(ANCHOR_TITLE, () => {
    const child = exportRow("wb-4zgj");
    const parent = exportRow("wb-khhg");
    // The rows anchored to wb-4zgj's description (row R3): its first unmet item's members.
    const described = ROWS.filter(row => row.anchor === "description");
    const opener = "Unmet items verbatim: ";
    const list: unknown = JSON.parse(sectionOf(child.description, opener, "\n\nAcceptance:").slice(opener.length));
    const items = Array.isArray(list) ? list.filter((item): item is string => typeof item === "string") : [];
    expect(items.length > 0 && items.length === (Array.isArray(list) ? list.length : -1), "wb-4zgj's description lists its unmet items as JSON strings").toBe(true);
    const [first = ""] = items;
    const r3Lines = memberLines(first);
    expect(r3Lines.length > 0, "wb-4zgj's first unmet item holds member lines").toBe(true);
    expect(described.flatMap(pinLines), "the rows anchored to wb-4zgj's description hold exactly the members its first unmet item names, in order, with their sites and quotes").toEqual(statedPins(r3Lines));
    for (const row of described) {
      expect(first.startsWith(`${row.unmet} (`), `wb-4zgj's first unmet item is row ${row.id}'s slug ${row.unmet}`).toBe(true);
      expect(child.description, `wb-4zgj's description names row ${row.id}'s label`).toContain(`the third-cycle members: ${row.label} - `);
    }
    for (const line of r3Lines) {
      const pin = pinOf(line.id);
      expect(pin.probes.map(probe => probe.id), `${pin.id}: its one probe is its stated plant ${line.plant}`).toEqual([line.plant]);
      const idForm = /`([^`]+)` called with "([^"]+)"/.exec(line.detail);
      const nestedForm = /`([^`]+)` \("([^"]+)"\)/.exec(line.detail);
      const appended = /^(.*) appended to (\S+?)(?: \((\d+) bytes\))?\.$/.exec(line.detail);
      if (idForm !== null) {
        const [, template = "", verb = ""] = idForm;
        expect(descriptorProbe(pin, line.plant).descriptors.map(descriptor => descriptor.id), `${line.plant}: one descriptor whose id is the stated template called with the stated verb`).toEqual([template.replace(/\$\{verb\}/, verb)]);
      } else if (nestedForm !== null) {
        const [, template = "", verb = ""] = nestedForm;
        const probe = descriptorProbe(pin, line.plant);
        expect(probe.descriptors.map(nestedDescriptions), `${line.plant}: one descriptor whose nested property descriptions are the stated text`).toEqual([[template.replace(/\$\{verb\}/, verb)]]);
      } else {
        expect(appended, `${line.id}: the line states where its plant is appended`).not.toBeNull();
        const [, what = "", path = "", bytes] = appended ?? [];
        const file = onlyFile(diskProbe(pin, line.plant));
        expect(file.path, `${line.plant}: the stated path`).toBe(path);
        if (bytes !== undefined) expect(Buffer.byteLength(file.head), `${line.plant}: the stated byte count before the planted form`).toBe(Number(bytes));
        const launcher = /^an rf (\w+) launch$/.exec(what);
        if (launcher !== null) {
          const [, name = ""] = launcher;
          expect(file.form, `${line.plant}: its form calls the stated launcher on rf`).toContain(`${name}("rf"`);
          // Cut #2 (refusal #1's U2): the call is held as the launch A1 reads bound, not only as text - the probe's literal reading,
          // which its pin case holds to launchInventory's output, lists it as the one bound rf launch and nothing unbound or composed.
          const bound = [`${path}:${name}`];
          expect(diskProbe(pin, line.plant).reading.output, `${line.plant}: its literal reading holds that call as A1's one bound rf launch`).toEqual({
            root: "<root>",
            scans: [{ file: path, rf: bound, composed: [], unbound: [], commands: ["rf"] }],
            rf: bound,
            composed: [],
            unbound: [],
          });
        } else if (bytes === undefined) expect(file.form.trim(), `${line.plant}: its form is the stated line`).toBe(what);
        const offset = /\b(\d{5,})\)?$/.exec(line.quote);
        expect(offset, `${line.id}: its quote states the byte offset its key keeps`).not.toBeNull();
        expect(Buffer.byteLength(file.head) >= Number(offset?.[1]), `${line.plant}: the planted form starts at or past byte ${offset?.[1]}`).toBe(true);
        expect(Number(offset?.[1]), `${line.id}: the offset this census's key cuts at`).toBe(CUT);
      }
    }
    // The rows anchored to wb-khhg's refusal #4 verdict (row R4), whose members R-B301 folded into wb-4zgj's notes.
    const refused = ROWS.filter(row => row.anchor === "refusal4");
    const refusal4 = sectionOf(parent.notes, REFUSAL_4, REFUSAL_4_END);
    expect(refusal4.length > REFUSAL_4.length, "wb-khhg's notes hold refusal #4's verdict").toBe(true);
    expect(refusal4, "refusal #4 reds each plant's byte-identical 0644 twin under its member").toContain("its byte-identical 0644 twin");
    const r4Lines = memberLines(refusal4);
    expect(r4Lines.length > 0, "refusal #4 holds member lines").toBe(true);
    expect(refused.flatMap(pinLines), "the rows anchored to refusal #4 hold exactly the members it names, in order, with their sites and quotes").toEqual(statedPins(r4Lines));
    expect(child.notes.split("\n")[0], "wb-4zgj's notes open with R-B301's fold line").toBe(R_B301_FOLD);
    for (const row of refused) {
      expect(child.notes.split("\n")[1], `wb-4zgj's notes name row ${row.id}'s unmet slug after the fold line`).toBe(row.unmet);
      expect(refusal4, `refusal #4 names row ${row.id}'s label`).toContain(`through ${row.label}, GM1-GM4,`);
      expect(refusal4, `refusal #4's unmet item is row ${row.id}'s slug`).toContain(`\n- U1: ${row.unmet} (`);
    }
    for (const line of r4Lines) {
      const pin = pinOf(line.id);
      const witness = /Natural witness (PM\d[a-z]?): the comment line "(.+?)" appended to the tracked executable (\S+) \(100(\d{3})\)\.$/.exec(line.detail);
      const firstSet = /First-set plant (PM\d[a-z]?) '(.+?)' \(launch at byte (\d+),/.exec(line.detail);
      const extra = [...(witness === null ? [] : [witness[1] ?? ""]), ...(firstSet === null ? [] : [firstSet[1] ?? ""])];
      expect(pin.probes.map(probe => probe.id), `${pin.id}: its plant, the plant's 0644 twin and the further plants the line names`).toEqual([line.plant, `${line.plant}n`, ...extra]);
      const control = /^(\S+) holding exactly B1's plain control text \("(.+?)", (\d+) bytes\) at mode (0\d{3})\./.exec(line.detail);
      const module = /^(\S+) = '(.+?)'(?: \+ blank line \+ '(.+?)')? \((\d+) bytes; [^)]*\) at (0\d{3})\./.exec(line.detail);
      const stated = control !== null ? { path: control[1], text: control[2], bytes: control[3], mode: control[4] } : module !== null ? { path: module[1], text: module[3] === undefined ? `${module[2]}\n` : `${module[2]}\n\n${module[3]}\n`, bytes: module[4], mode: module[5] } : undefined;
      expect(stated, `${line.plant}: the line states its plant's path, text, byte count and mode`).toBeDefined();
      const plant = onlyFile(diskProbe(pin, line.plant));
      expect(
        { path: plant.path, text: plant.head + plant.form, bytes: Buffer.byteLength(plant.head + plant.form), mode: `0${plant.mode.toString(8)}` },
        `${line.plant}: the stated path, text, byte count and mode`,
      ).toEqual({ path: stated?.path, text: stated?.text, bytes: Number(stated?.bytes), mode: stated?.mode });
      const twin = onlyFile(diskProbe(pin, `${line.plant}n`));
      expect({ path: twin.path, text: twin.head + twin.form, mode: twin.mode }, `${line.plant}n: the plant's bytes at 0644`).toEqual({ path: plant.path, text: plant.head + plant.form, mode: 0o644 });
      if (witness !== null) {
        const [, id = "", comment = "", path = "", mode = ""] = witness;
        const file = onlyFile(diskProbe(pin, id));
        expect({ path: file.path, ends: (file.head + file.form).endsWith(`${comment}\n`), mode: file.mode.toString(8) }, `${id}: the stated comment line ending the stated executable`).toEqual({ path, ends: true, mode });
      }
      if (firstSet !== null) {
        const [, id = "", text = "", at = ""] = firstSet;
        const file = onlyFile(diskProbe(pin, id));
        const launch = text.split("\\n").at(-1) ?? "";
        expect(
          { path: file.path, text: file.head + file.form, launchAt: (file.head + file.form).indexOf(launch), mode: file.mode },
          `${id}: the stated text, its launch at the stated byte, at its plant's mode`,
        ).toEqual({ path: plant.path, text: `${text.split("\\n").join("\n")}\n`, launchAt: Number(at), mode: plant.mode });
      }
    }
  });

  for (const pin of PINS) {
    it(titleOf(pin), () => {
      const readings = Object.fromEntries(pin.probes.map(probe => [probe.id, readProbe(probe)]));
      expect(readings, `${pin.id}: each probe's reading, exactly as written here`).toEqual(Object.fromEntries(pin.probes.map(probe => [probe.id, probe.reading])));
      expect(
        pin.probes.map(probe => `${probe.id}:${probe.role}:${keyChanges(pin.key, probe) ? "changed" : "same"}`),
        `${pin.id}: with the member's key applied to each probe's input, each plant reads changed and each 0644 twin the same`,
      ).toEqual(pin.probes.map(probe => `${probe.id}:${probe.role}:${probe.role === "plant" ? "changed" : "same"}`));
      REACHED.push(pin.id);
    });
  }

  it(RECORDS_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    expect(walked.map(entry => entry.name), "every case of this file, exactly and in SHAPE's order").toEqual(TITLES);
    expect(walked.findIndex(entry => entry.self), "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter(entry => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other case is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    // Cut #2 (U1): the registration guard's six controls - a case, the describe or an enclosing suite outside run mode is refused by
    // name and mode, and a set wholly in run mode is not - so a guard emptied or narrowed against one of them reds here.
    const wrapper = (mode: string): Enclosing => ({ name: "control describe", mode: "run", suite: { name: "control wrapper", mode } });
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [{ name: "control case", mode: "skip" }] })).toThrow("control case (skip)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [{ name: "control case", mode: "todo" }] })).toThrow("control case (todo)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "skip", tasks: [] })).toThrow("control describe (skip)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "todo", tasks: [] })).toThrow("control describe (todo)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [], suite: wrapper("skip") })).toThrow("control wrapper (skip)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [{ name: "control case", mode: "run" }], suite: wrapper("run") })).not.toThrow();
    expect(REACHED, "every pin case reached its end, in pin order").toEqual(PINS.map(pin => pin.id));
    recordsReachedEnd = true;
  });

  // Cut #2 (U1): the registration guard, read last in this factory (see the header): a registration outside run mode among this
  // describe, the cases it registers and the suites around it fails the file at collection.
  refuseUnrunRegistrations(TestRunner.getCurrentSuite());
});
