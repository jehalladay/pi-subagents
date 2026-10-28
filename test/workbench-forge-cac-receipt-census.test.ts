/**
 * wb-b9n.1 (FORGE-CAC-EVIDENCE-ASSURANCE-R2, program-triage-2026-10-18), the Forge CAC receipt census: the standing leg of a
 * trigger-gated requirement whose gating artifact has not shipped. Statement (the bead's export title, read at run time): "When
 * Forge ships ForgeCACReceiptV0 (gating artifact: P3 read-only exporter, 01-contract-qa.md:16@bc2c379f7802, not shipped), the
 * Pi receipt reader shall render VERIFIED_HISTORICAL only for a receipt establishing the exact acceptance predicate at the
 * declared source snapshot (predicate, snapshot digest, checker identity+version all present) and shall render UNKNOWN, never a
 * historical pass, when any is missing." The cited Forge line (01-contract-qa.md:16@bc2c379f7802): 'A CAC client may use
 * VERIFIED_HISTORICAL when its checker establishes precise predicate at declared snapshot'; its section heading (:3) reads
 * 'Proposed read-only export (not shipped)'. This census echoes those words and claims nothing of Forge.
 *
 * ROWS (labels = the three clauses of the owner filing's acceptance, read from the bead export; frozen shape ["A:2", "B:2",
 * "C:2"]). The acceptance opens with its form, "hermetic reader-adapter tests over receipt fixtures" (LEAD, held to the export):
 * every fixture here lives in memory, and the receipt fixtures are B1's planted records under this file's own spellings.
 * - A, "a full-field receipt renders VERIFIED_HISTORICAL with the predicate and snapshot echoed verbatim". NOT DUE: no Pi reader
 *   consumes a receipt until the artifact ships, so the echo rule has nothing to judge.
 *   A1 is the TRIGGER, not the duty (ARMED). The installed Forge client release Pi reads Forge through (@forge/sdk, installed
 *     from vendor/forge-sdk-0.1.0.tgz) is read file by file, by path and by content: no file spells the gating artifact (the
 *     title's ForgeCACReceiptV0), none spells WORD's family (below), and none is receipt-shaped (spells both "predicate" and
 *     "checker", the title's own field words, case-insensitive). The content reading is proven live by the release's own
 *     CancelReceipt and source_snapshot_id files, and three planted release files ride last (a named receipt type, a file longer
 *     than every release file with the name at its end, and a file whose path alone spells it): the reader finds exactly the
 *     plants. The witness carries the release's name, version and file count, so any re-vendor reds A1 with OWED: if the
 *     artifact shipped, the acceptance on landing is owed (A's and B's not-due spans, their fixtures replacing A1 and A2); if it
 *     did not, the roster's release reading is re-measured.
 *   A2 the "only" half of the title's rule, standing: while no receipt is read, no Pi surface renders the word. WORD is the
 *     title's VERIFIED_HISTORICAL read as a family: its two words in either order (the second may read HISTORICALLY), separated
 *     by any run of whitespace, hyphens or underscores or by nothing, case-insensitive, with no letter or digit just before or
 *     after, in two readings of a text (the text and Pi's label display of it, sanitizeWorkbenchText's label layout with no
 *     length bound, each after NFKC; a text holds the word when either reading does). The witness carries the judge's planted
 *     texts with their readings (the residual table is checked against them). The src walk reads the whole text (literals,
 *     identifiers and comments) of every src/**\/*.ts module git lists (tracked or untracked, never ignored) plus two planted
 *     modules last: a short literal plant, and one longer than every real module with the word in a comment on its last line.
 *     The judged list equals the listing plus the plants, a filesystem walk lists the same modules, no symlink sits under src,
 *     the listing holds at least SRC_FLOOR modules, and the only hits are the plants'. The rendered outputs (forgeGateTopology,
 *     readForgeOperationEvidence and nativeEvidence over READINGS, forgeOperationStartedSnapshot, forgeGateStepTopology,
 *     forgeOperationTerminalSnapshot over decoded gate.run replies, and layoutWorkflowCard over one node per reading) hold no
 *     string or key in the family; the walk's positive control (the word once as a key and once inside an array) reads 2.
 * - B, "dropping any one of predicate, snapshot digest, or checker identity+version renders UNKNOWN with a diagnostic naming the
 *   missing field, never a pass". The UNKNOWN-with-a-diagnostic rendering is NOT DUE (no reader exists to name a field).
 *   B1 receipt records under this file's hypothetical spellings (FIELD_KEYS, one or two keys per title field; the artifact
 *     publishes none), planted whole and with each field key dropped (5 variants) at five carriers (the source, its envelope,
 *     its data, a package's cac_receipt, and flat on the package) over two bases (the measured historical row and the same row
 *     with authoritative_current true): forgeGateTopology, readForgeOperationEvidence and nativeEvidence serialize each of the 50
 *     cells byte for byte as they serialize the base without a receipt. No receipt field is read today, so a full-field receipt
 *     earns no pass and dropping a field loses none; the witness lists each cell's planted leaf paths (read off the input) and
 *     both bases' tones. The R-UNPLANTED-SPELLING quiet row (a receipt under other spellings) reads identical too; its twin (a
 *     key the adapter does read, authoritative_current true flat on the historical row) reads differing, so the compare is live.
 *   B2 never a pass, standing. (a) Demotion: the measured historical row and six variants (authoritative_current absent, the
 *     string "true", null, a quoted CURRENT freshness, a full-field receipt claiming the word nested and flat) render the
 *     workspace and the package with tone unknown and coverage partial, the package text keeps "(historical;" and the
 *     forge-operation evidence keeps "(historical; not current verification)". (b) Quoted data only: the word planted in each of
 *     six producer text fields (source.status, source.envelope.verdict, source.envelope.reason_code, the package's ref,
 *     last_result and unverified_reason) over both bases obeys the substitution law for forgeGateTopology and
 *     readForgeOperationEvidence: the output with the word equals, byte for byte, the output with NEUTRAL (same byte length, in
 *     no decision vocabulary) after replacing NEUTRAL by the word; the witness carries each cell's planted path, tones and every
 *     string the word shows in (marked {W}). A last_result_state freshness of the word serializes exactly as NEUTRAL's (basis
 *     UNKNOWN, the word never shown). (c) nativeEvidence keeps a status of the word verbatim as domainStatus, and
 *     layoutWorkflowCard draws that done node with NEUTRAL's glyph, never the tick a producer-stated "verified" gets.
 * - C, "the existing gate.status and forge-operation evidence adapters stay byte-identical".
 *   C1 forgeGateTopology and readForgeOperationEvidence over READINGS (ten mutations of the measured Forge package row of
 *     test/helpers/forge-last-result-state.ts, never hand-rolled rows) equal the roster's frozen outputs, value for value.
 *   C2 the same twenty outputs, serialized (JSON.stringify, key order included, which C1's value compare does not read), carry
 *     the roster's sha-256/16 and byte length each: byte identity, not only value identity.
 * Each pin's witness carries its own inputs (planted texts, modules and release files, the judged and read lists, carrier,
 * variant and field keys, the fixture tags and digest) beside its readings, so serving one pin with another pin's case changes
 * the witness and reds the compare.
 *
 * OUTSIDE ANCHOR: the wb-b9n.1 row of the tracked bead export (.beads/issues.jsonl): its title (the gating artifact, the word and
 * the three receipt fields are parsed from it) and the first "Acceptance: <lead> <em dash> <clauses>." span of its notes, nothing
 * else of it, so appended notes and status writes do not move it. The span's three clauses are the row labels; every pin's quote
 * is a substring of its row label.
 * PIN MEMBERSHIP (the wb-530q F1 reading, against the export's clause text, never the row labels): each pin's quote sits in its
 * clause exactly once at word boundaries, the pins of a row leave unquoted exactly the row's NOT_DUE spans (A: the echo rule; B:
 * the UNKNOWN-with-a-diagnostic rendering; C: none), and every pin is load-bearing (without it a word of its clause goes
 * unquoted). A pin removed from ROWS, IMPL, the frozen shape and the roster together leaves its words unquoted, so the clause
 * reds it, and so does a quote shortened inside its span.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and NOT_DUE pins `${id}:${unquoted words}` as
 * another; rows, constants, residuals, the not-due spans and every pin's witness are held to the out-of-file roster
 * test/fixtures/forge-cac-receipt-roster.json. SELF-READ: the judged set parses this file's IMPL and requires that no pin body
 * names ROSTER (direct identifiers only; a helper that reads the roster on a pin's behalf is not detected), and the roster is
 * deep-frozen when it is loaded, so no case can rewrite a witness it is compared with. The records case reads that every
 * registered pin ran to its compare and re-compares each witness it produced with its roster witness by sha-256/16 (key order
 * included), so a pin case whose own compare is removed still reds there.
 * RESIDUALS (named; each has a pinned quiet row and a live twin among the planted inputs of the pin named):
 *   R-COMPOSED (A2) the word assembled at run time from pieces no module text spells whole (quiet: "VERIFIED_" + "HISTORICAL";
 *     twin: one literal). The rendered outputs see such a word only from the renderers they drive.
 *   R-EMBEDDED (A2) the word glued after a letter or digit (quiet: isVerifiedHistorical; twin: VerifiedHistorical).
 *   R-LOOKALIKE (A2) confusable letters NFKC does not fold (quiet: Cyrillic lookalikes; twin: fullwidth letters, which it folds).
 *   R-PARAPHRASE (A2) another wording of a historical verification (quiet: "historically passed", "verified at the declared
 *     snapshot"; twin: "historically verified").
 *   R-SIBLING (A2) the consumer rule's other word, VERIFIED_CURRENT, is not this bead's and is not judged (quiet: VERIFIED_CURRENT;
 *     twin: the title's word).
 *   R-OTHER-NAME (A1) a receipt type the release ships under another name, without the word and without both field words
 *     (quiet: a ForgeVerificationRecord declaration; twin: a declaration named after the artifact).
 *   R-UNPLANTED-SPELLING (B1) a receipt under spellings no cell plants is not claimed by B1; its quiet row (one such record)
 *     reads identical, its twin (a read key) reads differing.
 * The judged set binds the table to the planted inputs: every planted text, module and release file A1 and A2 read quiet is a
 * named non-claim (NON_CLAIMS: the bare words and today's own labels) or exactly one residual's quiet row, so a residual dropped
 * from the table (and its literals) leaves its quiet row unaccounted for.
 * LIMITS (stated, not residuals): a pin rewritten to return its roster witness through a helper is not detected by the
 * SELF-READ; a residual removed together with its planted inputs and their roster readings is not detected (residuals are this
 * census's own reading and have no anchor outside it); C freezes the adapters over READINGS only; A1 reads the installed release,
 * never Forge's tree or the installed forge executable, and a receipt Forge serves only as new gate.status payload keys with no
 * client release spelling it does not fire A1 (B1 shows such keys unread today).
 *
 * MEASURED AT THE CUT (seat records, read-only, not assertions): trunk 061c2ac, 2026-10-28. src holds 116 modules and 0 lines of
 * WORD's family; at that base test, qa and docs held 0 as well (this cut's census and roster now spell it, as their own data).
 * Forge origin/main a2ab95fa933b (2026-10-28T09:01:20Z) spells
 * ForgeCACReceiptV0 and VERIFIED_HISTORICAL only in docs/programs/cac-evidence-assurance-2026-10-18/01-contract-qa.md (design
 * only); the installed forge 0.2.1 (rev a2ab95fa933b) site-packages spell neither; the installed @forge/sdk 0.1.0 holds 49
 * files, spells neither, and no file of it spells "predicate" or "checker". The label census of wb-b9n.3
 * (test/workbench-forge-cac-label-census.test.ts) holds the 'CAC verified' label and the src-side name trigger; this census
 * holds the receipt reader's word, the release-side trigger, the receipt cells and the byte-identical adapters.
 *
 * Display paths added: none. Test-only: every fixture lives in memory (no scratch; the only spawn is git ls-files); src, the
 * installed release and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { layoutWorkflowCard, plainWorkflowCardLines } from "../src/ui/workflow-card.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { type ForgeEvidenceDeps, readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import {
  decodeForgeOperationTerminal,
  forgeGateStepTopology,
  forgeOperationStartedSnapshot,
  forgeOperationTerminalSnapshot,
} from "../src/workbench/forge-operation-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import type { WorkflowNodeEntry } from "../src/workflow/progress.js";
import { DESCRIPTORLESS, described, MEASURED_ROW } from "./helpers/forge-last-result-state.js";

interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Constants { readonly gating: string; readonly word: string; readonly fields: readonly string[]; readonly neutral: string; readonly lead: string }
interface Residual { readonly id: string; readonly quietPin: string; readonly quiet: readonly string[]; readonly twin: readonly string[] }
interface Roster {
  readonly bead: string;
  readonly constants: Constants;
  readonly residuals: readonly Residual[];
  readonly notDue: Readonly<Record<string, readonly string[]>>;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
}
type Json = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-forge-cac-receipt-census.test.ts";
const ROSTER_FILE = "test/fixtures/forge-cac-receipt-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-b9n.1";
/** The installed Forge client release, as npm installs it from the vendored artifact (vendor/forge-sdk-0.1.0.tgz). */
const RELEASE = "node_modules/@forge/sdk";
const deepFreeze = <T>(value: T): T => {
  if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) deepFreeze(item);
    Object.freeze(value);
  }
  return value;
};
const ROSTER = deepFreeze(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster);
/** The neutral control word: the title word's byte length, in no decision vocabulary, read by no judge here. */
const NEUTRAL = "XQZ_NEUTRAL_CONTROL";
/** A floor under the git listing: an emptied or misdirected listing reds; the judged set is every module git lists. */
const SRC_FLOOR = 100;

const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "a full-field receipt renders VERIFIED_HISTORICAL with the predicate and snapshot echoed verbatim",
    pins: [
      { id: "A1", quote: "a full-field receipt" },
      { id: "A2", quote: "renders VERIFIED_HISTORICAL" },
    ],
  },
  {
    id: "B",
    label: "dropping any one of predicate, snapshot digest, or checker identity+version renders UNKNOWN with a diagnostic naming the missing field, never a pass",
    pins: [
      { id: "B1", quote: "dropping any one of predicate, snapshot digest, or checker identity+version" },
      { id: "B2", quote: "never a pass" },
    ],
  },
  {
    id: "C",
    label: "the existing gate.status and forge-operation evidence adapters stay byte-identical",
    pins: [
      { id: "C1", quote: "the existing gate.status and forge-operation evidence adapters" },
      { id: "C2", quote: "stay byte-identical" },
    ],
  },
];

const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

// ------------------------------------------------------------------------------------------------------------- the bead row
interface BeadRow { readonly title: string; readonly notes: string }
function beadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (value === null || typeof value !== "object" || !("id" in value) || value.id !== BEAD) continue;
    const title = "title" in value && typeof value.title === "string" ? value.title : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { title, notes };
  }
  throw new Error(`the bead export holds no ${BEAD} row`);
}
/** The filing's first acceptance span: its lead (the form), an em dash, then its clauses up to the paragraph's full stop. */
function acceptanceOf(notes: string): { lead: string; clauses: string[] } {
  const match = new RegExp(`Acceptance: (.+?) ${String.fromCodePoint(0x2014)} (.+?)\\.(?:\\n|$)`, "su").exec(notes);
  return { lead: match?.[1] ?? "", clauses: match?.[2] === undefined ? [] : match[2].split("; ") };
}
const ROW = beadRow();
const ACCEPTANCE = acceptanceOf(ROW.notes);
const GATING = /When Forge ships (\S+) \(gating artifact/.exec(ROW.title)?.[1] ?? "";
const WORD = /shall render (\S+) only for a receipt/.exec(ROW.title)?.[1] ?? "";
const FIELDS = (/\(([^()]+) all present\)/.exec(ROW.title)?.[1] ?? "").split(", ");

// ------------------------------------------------------------------------------------------------------- pin membership
/** The NOT-DUE spans: by row, the words of its clause no pin quotes (A: the echo rule; B: the UNKNOWN-with-a-diagnostic rendering). */
const NOT_DUE: Readonly<Record<string, readonly string[]>> = {
  A: ["with the predicate and snapshot echoed verbatim"],
  B: ["renders UNKNOWN with a diagnostic naming the missing field,"],
  C: [],
};
/** Each place a quote sits in a clause at word boundaries: it starts a word and ends one (a trailing comma, semicolon or full stop aside). */
function quoteStarts(body: string, quote: string): number[] {
  const starts: number[] = [];
  if (quote.length === 0) return starts;
  for (let at = body.indexOf(quote); at >= 0; at = body.indexOf(quote, at + 1)) {
    const end = at + quote.length;
    if ((at === 0 || /\s/.test(body.charAt(at - 1))) && /^[,;.]?(?:\s|$)/.test(body.slice(end, end + 2))) starts.push(at);
  }
  return starts;
}
/** One clause read against its row's quotes: the maximal runs of words no quote covers, and every quote not sitting in it exactly once. */
function unquoted(clause: string, quotes: readonly string[]): { runs: string[]; misplaced: string[] } {
  const words = [...clause.matchAll(/\S+/g)].map(match => ({ start: match.index, end: match.index + match[0].length }));
  const quoted = words.map(() => false);
  const misplaced: string[] = [];
  for (const quote of quotes) {
    const starts = quoteStarts(clause, quote);
    const start = starts[0];
    if (starts.length !== 1 || start === undefined) {
      misplaced.push(quote);
      continue;
    }
    for (const [index, word] of words.entries()) if (word.start < start + quote.length && word.end > start) quoted[index] = true;
  }
  const runs: string[] = [];
  let open: number | undefined;
  for (const [index, word] of words.entries()) {
    if (!quoted[index]) open ??= word.start;
    else if (open !== undefined) {
      runs.push(clause.slice(open, words[index - 1]?.end));
      open = undefined;
    }
  }
  if (open !== undefined) runs.push(clause.slice(open, words.at(-1)?.end));
  return { runs, misplaced };
}

// ----------------------------------------------------------------------------------------------------------- the word judge
const [HEAD = "", TAIL = ""] = WORD.split("_");
/** The title word's family: its two words in either order (the second may read ...LY), any run of whitespace, hyphens or underscores (or none) between. */
const FAMILY = `(?<![\\p{L}\\p{N}])(?:${HEAD}[\\s_-]*${TAIL}(?:LY)?|${TAIL}(?:LY)?[\\s_-]*${HEAD})(?![\\p{L}\\p{N}])`;
const FAMILY_ONE = new RegExp(FAMILY, "iu");
const FAMILY_ALL = new RegExp(FAMILY, "giu");
/** The two readings of a text: itself and Pi's label display of it (no length bound), each after NFKC. */
const readingsOf = (text: string): string[] => [text, sanitizeWorkbenchText(text, Number.POSITIVE_INFINITY, "label")].map(reading => reading.normalize("NFKC"));
const isWord = (text: string): boolean => readingsOf(text).some(reading => FAMILY_ONE.test(reading));
const wordsIn = (text: string): string[] => [...new Set(readingsOf(text).flatMap(reading => reading.match(FAMILY_ALL) ?? []))];
/** Every string and every object key of a value, depth first. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => [key, ...stringsOf(item)]);
  return [];
}
const fromCodePoints = (...points: number[]): string => String.fromCodePoint(...points);
/** The separator the workflow card and the Forge readers put between fields. */
const MIDDLE_DOT = fromCodePoints(0xb7);
/** A planted input as a witness carries it: ASCII only, every other code point as \u{hex}. */
const shownText = (text: string): string => [...text].map(unit => ((unit.codePointAt(0) ?? 0) < 0x80 ? unit : `\\u{${(unit.codePointAt(0) ?? 0).toString(16)}}`)).join("");
/** A2's planted texts: claims the judge must read, the named non-claims, and each residual's quiet row and twin. */
const PLANTED_TEXTS: Readonly<Record<string, string>> = {
  title: WORD,
  spaced: "verified historical",
  hyphen: "Verified-Historical",
  glued: "VerifiedHistorical",
  reversed: "historical-verified",
  adverb: "historically verified",
  sentence: "Receipt reads VERIFIED_HISTORICAL at the declared snapshot.",
  fullwidth: `${fromCodePoints(0xff36, 0xff25, 0xff32, 0xff29, 0xff26, 0xff29, 0xff25, 0xff24)}_HISTORICAL`,
  zeroWidth: `VERIFIED${fromCodePoints(0x200b)}_HISTORICAL`,
  softHyphen: `VERI${fromCodePoints(0xad)}FIED_HISTORICAL`,
  wordJoiner: `VERIFIED${fromCodePoints(0x2060)}HISTORICAL`,
  bareVerified: "verified",
  bareHistorical: "historical",
  todayLabel: "success (historical; authoritative_current=false; FORGE_CURRENT_STATE_UNVERIFIED)",
  todayEvidence: "verification indeterminate (historical; not current verification)",
  current: "VERIFIED_CURRENT",
  embedded: "isVerifiedHistorical",
  cyrillic: `${fromCodePoints(0x56, 0x415, 0x420, 0x49, 0x46, 0x49, 0x415, 0x44)}_HISTORICAL`,
  passed: "historically passed",
  atSnapshot: "verified at the declared snapshot",
  gating: GATING,
};
const PLANTED_MODULES: Readonly<Record<string, string>> = {
  literal: `export const shown = "${WORD}";\n`,
  comment: `// a full-field receipt renders ${WORD}\nexport const shown = 1;\n`,
  identifier: "export const VerifiedHistorical = 1;\n",
  composed: 'export const shown = "VERIFIED_" + "HISTORICAL";\n',
  composedTwin: 'export const shown = "VERIFIED_HISTORICAL";\n',
};
const PLANT = "src/workbench/forge-cac-receipt-plant.ts";
const PLANT_BIG = "src/workbench/forge-cac-receipt-plant-big.ts";

// ----------------------------------------------------------------------------------------------------------- the src walk
interface TextFile { readonly path: string; readonly text: string }
const inScope = (path: string): boolean => /^src\/.+\.ts$/.test(path);
/** What git would commit below src: tracked or untracked, never ignored. */
function gitModules(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inScope))].sort(byName);
}
function walkFiles(root: string, from: string, keep: (path: string) => boolean): { files: string[]; links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      const path = directory === "" ? entry.name : `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && keep(path)) files.push(path);
    }
  };
  visit(from);
  return { files: files.sort(byName), links: links.sort(byName) };
}
const srcModules = (): TextFile[] => gitModules().map(path => ({ path, text: readFileSync(join(REPO, path), "utf8") }));
/** Every module judged, and each hit as "<path> <the matched text>". */
function judgeModules(modules: readonly TextFile[]): { judged: string[]; hits: string[] } {
  const judged: string[] = [];
  const hits: string[] = [];
  for (const module of modules) {
    judged.push(module.path);
    for (const match of wordsIn(module.text)) hits.push(`${module.path} ${shownText(match)}`);
  }
  return { judged, hits };
}
/** A planted file longer than every given file, the planted line last: a reader that skips long files misses it. */
function bigPlant(path: string, files: readonly TextFile[], tail: string): TextFile {
  const longest = Math.max(0, ...files.map(file => file.text.length));
  const lines: string[] = [];
  let length = 0;
  for (let index = 0; length <= longest; index += 1) {
    const line = `export const filler${index} = "x${index}";\n`;
    lines.push(line);
    length += line.length;
  }
  return { path, text: `${lines.join("")}${tail}` };
}

// ------------------------------------------------------------------------------------------------------ the release reading
const RECEIPT_WORDS: readonly RegExp[] = [/predicate/i, /checker/i];
/** The release's own spellings the content reading must find: its one receipt type, and the basis field Pi reads off gate.status. */
const LIVENESS: readonly string[] = ["CancelReceipt", "source_snapshot_id"];
function releaseFiles(): { files: TextFile[]; links: string[] } {
  const walked = walkFiles(join(REPO, RELEASE), "", () => true);
  return { files: walked.files.map(path => ({ path, text: readFileSync(join(REPO, RELEASE, path), "utf8") })), links: walked.links };
}
/** The trigger reading: every file read, and the files whose path or content spells the gating artifact, the word, or both field words. */
function releaseReading(files: readonly TextFile[]): { read: string[]; gating: string[]; word: string[]; receiptShaped: string[]; live: Record<string, string[]> } {
  const read: string[] = [];
  const gating: string[] = [];
  const word: string[] = [];
  const receiptShaped: string[] = [];
  const live: Record<string, string[]> = Object.fromEntries(LIVENESS.map(name => [name, []]));
  for (const file of files) {
    read.push(file.path);
    if (file.path.includes(GATING) || file.text.includes(GATING)) gating.push(file.path);
    if (isWord(file.path) || wordsIn(file.text).length > 0) word.push(file.path);
    if (RECEIPT_WORDS.every(pattern => pattern.test(file.text))) receiptShaped.push(file.path);
    for (const name of LIVENESS) if (file.text.includes(name)) live[name]?.push(file.path);
  }
  return { read, gating, word, receiptShaped, live };
}
const PLANTED_RELEASE: Readonly<Record<string, TextFile>> = {
  named: { path: "dist/zz-plant-receipt.d.ts", text: `export interface ${GATING} { readonly interpretation: "${WORD}"; readonly predicate: string; readonly checker: string }\n` },
  pathOnly: { path: `dist/${GATING}.d.ts`, text: "export {};\n" },
  otherName: { path: "dist/zz-plant-other.d.ts", text: "export interface ForgeVerificationRecord { readonly verdict: string; readonly subject: string }\n" },
};
const RELEASE_BIG = "dist/zz-plant-receipt-big.d.ts";
const OWED = `ARMED (${BEAD}): the installed @forge/sdk differs from the release this census measured. If ${GATING} shipped in it, the acceptance on landing is owed: ${ROWS[0]?.label ?? ""}; ${ROWS[1]?.label ?? ""} (fixtures replacing A1 and A2). If it did not, re-measure the roster's release reading and say so.`;

// ----------------------------------------------------------------------------------------------------------- the fixtures
const OPERATION = "op_b9n1";
const REF = `forge-operation:${OPERATION}`;
const SCOPE = { workspace: "/b9n1-forge-ws", principal: "local-operator:b9n1" };
const CONTEXT = { scope: SCOPE, target: SCOPE.workspace, capturedAt: "2026-10-28T11:00:00Z", observedAt: "2026-10-28T11:00:01Z" };
const CAPTURED = "2026-10-28T11:00:02Z";
function reading(packages: JsonValue[], over: Json = {}, envelope: Json = { verdict: null, reason_code: "FORGE_OK" }, data: Json = {}): Json {
  return { contract: "forge.gate.status/v1", protocolMethod: "gate.status", source: { status: "success", operation_id: OPERATION, envelope, data: { packages, ...data }, ...over } };
}
const without = (row: Json, key: string): Json => Object.fromEntries(Object.entries(row).filter(([name]) => name !== key));
/** The measured Forge package row (historical: authoritative_current false, last_result success, freshness STALE). */
const HISTORICAL: Json = MEASURED_ROW;
const CURRENT: Json = { ...MEASURED_ROW, authoritative_current: true };
/** The fixture family C freezes and A2 renders: ten readings, each a mutation of the measured row. */
const READINGS: Readonly<Record<string, Json>> = {
  measured: reading([HISTORICAL]),
  authorityAbsent: reading([without(HISTORICAL, "authoritative_current")]),
  quotedCurrent: reading([described({ freshness: "CURRENT" })]),
  current: reading([CURRENT]),
  currentFailure: reading([{ ...CURRENT, last_result: "failure" }]),
  descriptorless: reading([{ ...DESCRIPTORLESS, authoritative_current: true }]),
  withheld: reading([described({ freshness: "BOGUS" })]),
  degraded: reading([CURRENT], { status: "partial" }, { verdict: "COULD_NOT_JUDGE", reason_code: "FORGE_DEGRADED" }),
  empty: reading([]),
  mixed: reading([HISTORICAL, { ...CURRENT, ref: "code:b9n1-current" }]),
};
const STEP_OUTCOMES: readonly (string | undefined)[] = [undefined, "passed", "failed"];
const REPLIES: readonly Json[] = [
  { operation_id: OPERATION, status: "success", terminal_disposition: "completed" },
  { operation_id: OPERATION, status: "error", terminal_disposition: "completed" },
];
/** The fixture family as one digest, so a fixture edited in place changes A2's witness. */
const FIXTURE_DIGEST = createHash("sha256").update(JSON.stringify({ READINGS, STEP_OUTCOMES, REPLIES })).digest("hex").slice(0, 16);
function evidenceDeps(result: JsonValue): ForgeEvidenceDeps {
  return { grants: () => ["forge:inspect"], scope: SCOPE, target: SCOPE.workspace, read: async () => result, now: () => CAPTURED };
}
function nodeEntry(index: number, domainStatus: string | undefined, evidenceRefs: readonly string[]): WorkflowNodeEntry {
  return {
    type: "workflow_node", index, callId: index + 1, capabilityId: "forge.gate.status", label: `forge gate ${index}`, state: "done",
    freshness: "current", evidenceRefs: [...evidenceRefs], ...(domainStatus !== undefined ? { domainStatus } : {}),
  };
}
function cardLines(entries: readonly WorkflowNodeEntry[]): string[] {
  return plainWorkflowCardLines(layoutWorkflowCard({ progress: [...entries], task: { status: "completed", startTime: 0, endTime: 1_000 }, now: 1_000, width: 240, ascii: true }));
}
const asJson = (value: unknown): JsonValue => JSON.parse(JSON.stringify(value)) as JsonValue;
/** The two adapters C freezes, over one reading: the gate.status reader adapter and the forge-operation evidence reader. */
async function adapterOutputs(): Promise<Record<string, JsonValue>> {
  const outputs: Record<string, JsonValue> = {};
  for (const [id, value] of Object.entries(READINGS)) {
    outputs[`forgeGateTopology:${id}`] = asJson(forgeGateTopology(value, CONTEXT));
    outputs[`readForgeOperationEvidence:${id}`] = asJson(await readForgeOperationEvidence(REF, evidenceDeps(value)));
  }
  return outputs;
}
/** Every output A2 judges, keyed by renderer and fixture. */
async function renderedOutputs(): Promise<{ rendered: string[]; outputs: unknown[] }> {
  const rendered: string[] = [];
  const outputs: unknown[] = [];
  const add = (tag: string, output: unknown): void => {
    rendered.push(tag);
    outputs.push(output);
  };
  for (const [tag, output] of Object.entries(await adapterOutputs())) add(tag, output);
  const entries: WorkflowNodeEntry[] = [];
  for (const [index, [id, value]] of Object.entries(READINGS).entries()) {
    const native = nativeEvidence("forge.gate.status", value);
    add(`nativeEvidence:${id}`, native);
    entries.push(nodeEntry(index, native.domainStatus, native.evidenceRefs ?? []));
  }
  const options = { scope: SCOPE };
  add("forgeOperationStartedSnapshot:started", forgeOperationStartedSnapshot({ operationId: OPERATION, observedAt: CAPTURED }, options));
  for (const outcome of STEP_OUTCOMES) {
    add(`forgeGateStepTopology:${outcome ?? "started"}`, forgeGateStepTopology({ operationId: OPERATION, step: "test", seq: 3, observedAt: CAPTURED, ...(outcome !== undefined ? { outcome } : {}) }, options));
  }
  for (const reply of REPLIES) {
    const terminal = decodeForgeOperationTerminal(reply, OPERATION, CAPTURED);
    if (terminal === undefined) throw new Error("a fixture gate.run reply did not decode");
    add(`forgeOperationTerminalSnapshot:${String(reply.status)}`, forgeOperationTerminalSnapshot(terminal, options));
  }
  add(`layoutWorkflowCard:${entries.length} nodes`, cardLines(entries));
  return { rendered, outputs };
}

// ------------------------------------------------------------------------------------------------------- the receipt cells
/** This file's hypothetical spellings of the title's three receipt fields (the artifact publishes none), one or two keys each. */
const FIELD_KEYS: Readonly<Record<string, readonly string[]>> = {
  predicate: ["acceptance_predicate"],
  "snapshot digest": ["snapshot_digest"],
  "checker identity+version": ["checker_identity", "checker_version"],
};
/** A full-field receipt under those spellings, naming the artifact and claiming the title's word as its interpretation. */
const RECEIPT: Json = {
  artifact: GATING,
  interpretation: WORD,
  acceptance_predicate: "the declared test suite passed",
  snapshot_digest: `sha256:${"c".repeat(64)}`,
  checker_identity: "forge-cac-checker",
  checker_version: "0.0.1-b9n1",
};
type Carrier = "source" | "envelope" | "data" | "package" | "package-flat";
const CARRIERS: readonly Carrier[] = ["source", "envelope", "data", "package", "package-flat"];
const VARIANTS: Readonly<Record<string, Json>> = {
  full: RECEIPT,
  ...Object.fromEntries(Object.values(FIELD_KEYS).flat().map(key => [`-${key}`, without(RECEIPT, key)])),
};
const BASES: Readonly<Record<string, Json>> = { historical: HISTORICAL, current: CURRENT };
function receiptCell(row: Json, carrier: Carrier, receipt: Json): Json {
  const envelope: Json = { verdict: null, reason_code: "FORGE_OK" };
  if (carrier === "source") return reading([row], { cac_receipt: receipt });
  if (carrier === "envelope") return reading([row], {}, { ...envelope, cac_receipt: receipt });
  if (carrier === "data") return reading([row], {}, envelope, { cac_receipt: receipt });
  if (carrier === "package") return reading([{ ...row, cac_receipt: receipt }]);
  return reading([{ ...row, ...receipt }]);
}
/** Every leaf of a value as a path. */
function leafPaths(value: JsonValue, path: string): string[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => leafPaths(item, `${path}[${index}]`));
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => leafPaths(item, `${path}.${key}`));
  return [path];
}
/** The leaf paths a cell adds to its base: its planted fields, read off the input itself. */
const plantedPaths = (cell: JsonValue, base: JsonValue): string[] => {
  const known = new Set(leafPaths(base, "reading"));
  return leafPaths(cell, "reading").filter(path => !known.has(path));
};
/** The three adapters' serializations of one reading. */
async function serialized(value: Json): Promise<Record<string, string>> {
  return {
    topology: JSON.stringify(forgeGateTopology(value, CONTEXT)),
    evidence: JSON.stringify(await readForgeOperationEvidence(REF, evidenceDeps(value))),
    native: JSON.stringify(nativeEvidence("forge.gate.status", value)),
  };
}
async function identicalTo(cell: Json, base: Json): Promise<string> {
  const [left, right] = [await serialized(cell), await serialized(base)];
  const same = Object.keys(left).filter(key => left[key] === right[key]);
  const differing = Object.keys(left).filter(key => left[key] !== right[key]);
  return `identical ${same.join(",") || "none"}; differing ${differing.join(",") || "none"}`;
}
/** R-UNPLANTED-SPELLING's planted records: one under other spellings (quiet), and a key the adapter reads (its twin). */
const UNPLANTED: Readonly<Record<string, Json>> = {
  otherSpelling: { verification: { predicate: "the declared test suite passed", snapshot: `sha256:${"d".repeat(64)}`, checker: { identity: "forge-cac-checker", version: "0.0.1-b9n1" } } },
  readKey: { authoritative_current: true },
};

// ------------------------------------------------------------------------------------------------------- the quoted cells
type Field = "source.status" | "source.envelope.verdict" | "source.envelope.reason_code" | "package.ref" | "package.last_result" | "package.unverified_reason";
const TEXT_FIELDS: readonly Field[] = ["source.status", "source.envelope.verdict", "source.envelope.reason_code", "package.ref", "package.last_result", "package.unverified_reason"];
function wordCell(base: string, field: Field, word: string): Json {
  const row: Json = { ...(BASES[base] ?? {}) };
  const envelope: Json = { verdict: null, reason_code: "FORGE_OK" };
  const over: Json = {};
  if (field === "source.status") over.status = word;
  if (field === "source.envelope.verdict") envelope.verdict = word;
  if (field === "source.envelope.reason_code") envelope.reason_code = word;
  if (field === "package.ref") row.ref = word;
  if (field === "package.last_result") row.last_result = word;
  if (field === "package.unverified_reason") row.unverified_reason = word;
  return reading([row], over, envelope);
}
/** The substitution law: the output with the word equals the output with NEUTRAL after replacing NEUTRAL by the word. */
const substituted = (withWord: unknown, withNeutral: unknown): boolean => JSON.stringify(withWord) === JSON.stringify(withNeutral).split(NEUTRAL).join(WORD);
const marked = (text: string): string => text.split(WORD).join("{W}");
const wordPaths = (value: JsonValue, path: string): string[] => {
  if (value === WORD) return [path];
  if (Array.isArray(value)) return value.flatMap((item, index) => wordPaths(item, `${path}[${index}]`));
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => wordPaths(item, `${path}.${key}`));
  return [];
};
const tonesOf = (topology: ReturnType<typeof forgeGateTopology>): string[] =>
  topology.snapshots.map(snapshot => `${snapshot.source.id === "workspace" ? "workspace" : "package"} ${snapshot.node.statusTone ?? "none"} ${snapshot.coverage ?? "none"}`);

// ------------------------------------------------------------------------------------------------------------- the pins
/** Each pin that reached its compare, with the sha-256/16 of the witness it produced (the records case re-reads it). */
const REACHED = new Map<string, string>();
const digestOf = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const release = releaseFiles();
    const packageJson: unknown = JSON.parse(readFileSync(join(REPO, RELEASE, "package.json"), "utf8"));
    const identity = packageJson !== null && typeof packageJson === "object" && "name" in packageJson && "version" in packageJson ? `${String(packageJson.name)}@${String(packageJson.version)}` : "";
    const plants = Object.values(PLANTED_RELEASE);
    const big = bigPlant(RELEASE_BIG, release.files, `export type Receipt = ${GATING};\n`);
    // The plants ride last through the same reading: the release itself must add no trigger site of its own.
    const reading = releaseReading([...release.files, ...plants, big]);
    const reads = (file: TextFile): string => {
      const one = releaseReading([file]);
      return `gating=${one.gating.length} word=${one.word.length} receiptShaped=${one.receiptShaped.length}`;
    };
    const residuals = RESIDUALS.filter(residual => residual.quietPin === "A1");
    for (const residual of residuals) {
      const plantOf = (id: string): TextFile | undefined => PLANTED_RELEASE[id];
      const loud = residual.quiet.filter(id => reads(plantOf(id) ?? { path: "", text: "" }) !== "gating=0 word=0 receiptShaped=0");
      const silent = residual.twin.filter(id => reads(plantOf(id) ?? { path: "", text: "" }) === "gating=0 word=0 receiptShaped=0");
      if (loud.length > 0 || silent.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${loud.join(", ")}) or twins read silent (${silent.join(", ")})`);
    }
    return {
      release: identity, files: release.files.length, links: release.links,
      readEqualsReleasePlusPlants: JSON.stringify(reading.read) === JSON.stringify([...release.files.map(file => file.path), ...plants.map(file => file.path), big.path]),
      bigPlantLongest: big.text.length > Math.max(0, ...release.files.map(file => file.text.length)),
      gating: reading.gating, word: reading.word, receiptShaped: reading.receiptShaped, live: reading.live,
      planted: Object.fromEntries(Object.entries(PLANTED_RELEASE).map(([id, file]) => [id, `${reads(file)} ${file.path}`])),
    };
  },
  A2: async () => {
    const wordReading = (id: string): number | undefined => {
      const text = PLANTED_TEXTS[id];
      if (text !== undefined) return isWord(text) ? 1 : 0;
      const module = PLANTED_MODULES[id];
      return module === undefined ? undefined : judgeModules([{ path: PLANT, text: module }]).hits.length;
    };
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "A2")) {
      const loud = residual.quiet.filter(id => wordReading(id) !== 0);
      const silent = residual.twin.filter(id => wordReading(id) !== 1);
      if (loud.length > 0 || silent.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${loud.join(", ")}) or twins read silent (${silent.join(", ")})`);
    }
    const texts = Object.fromEntries(Object.entries(PLANTED_TEXTS).map(([id, text]) => {
      const [plain = "", display = ""] = readingsOf(text);
      return [id, `word=${isWord(text) ? 1 : 0} plain=${FAMILY_ONE.test(plain) ? 1 : 0} display=${FAMILY_ONE.test(display) ? 1 : 0} ${shownText(text)}`];
    }));
    const modules = Object.fromEntries(Object.entries(PLANTED_MODULES).map(([id, text]) => [id, `hits=${judgeModules([{ path: PLANT, text }]).hits.length} ${shownText(text)}`]));
    const listed = gitModules();
    const walked = walkFiles(REPO, "src", inScope);
    const real = srcModules();
    const big = bigPlant(PLANT_BIG, real, `// ${PLANTED_TEXTS.sentence ?? ""}\n`);
    const walk = judgeModules([...real, { path: PLANT, text: PLANTED_MODULES.literal ?? "" }, big]);
    const { rendered, outputs } = await renderedOutputs();
    const strings = outputs.flatMap(stringsOf);
    // The control holds the word once as a key and once inside an array, so the walk must read both to count 2.
    const control = stringsOf({ [WORD]: [`${NEUTRAL} - ${WORD}`] }).filter(isWord).length;
    return {
      judge: { texts, modules },
      walk: {
        judgedEqualsListedPlusPlants: JSON.stringify(walk.judged) === JSON.stringify([...listed, PLANT, PLANT_BIG]),
        bigPlantLongest: big.text.length > Math.max(0, ...real.map(module => module.text.length)),
        gitEqualsWalk: JSON.stringify(listed) === JSON.stringify(walked.files), links: walked.links, floorMet: listed.length >= SRC_FLOOR,
        hits: walk.hits,
      },
      rendered: { tags: rendered, fixtureDigest: FIXTURE_DIGEST, walked: strings.length > 0, hits: strings.filter(isWord), control },
    };
  },
  B1: async () => {
    const bases: Json = {};
    const cells: Json = {};
    for (const [base, row] of Object.entries(BASES)) {
      const plain = reading([row]);
      bases[base] = tonesOf(forgeGateTopology(plain, CONTEXT));
      for (const carrier of CARRIERS) {
        for (const [variant, receipt] of Object.entries(VARIANTS)) {
          const cell = receiptCell(row, carrier, receipt);
          const planted = plantedPaths(cell, plain);
          cells[`${base}/${carrier}/${variant}`] = `${await identicalTo(cell, plain)}; planted ${planted.length}: ${planted.map(path => path.replace(/^reading\.source\./, "")).join(" ")}`;
        }
      }
    }
    const quietRow = async (id: string): Promise<string> => {
      const plain = reading([HISTORICAL]);
      return identicalTo(reading([{ ...HISTORICAL, ...(UNPLANTED[id] ?? {}) }]), plain);
    };
    const unplanted: Json = {};
    for (const id of Object.keys(UNPLANTED)) unplanted[id] = await quietRow(id);
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "B1")) {
      const loud: string[] = [];
      for (const id of residual.quiet) if ((await quietRow(id)) !== "identical topology,evidence,native; differing none") loud.push(id);
      const silent: string[] = [];
      for (const id of residual.twin) if ((await quietRow(id)) === "identical topology,evidence,native; differing none") silent.push(id);
      if (loud.length > 0 || silent.length > 0) throw new Error(`${residual.id}: quiet rows read differing (${loud.join(", ")}) or twins read identical (${silent.join(", ")})`);
    }
    return asJson({ fields: FIELD_KEYS, receipt: Object.keys(RECEIPT), carriers: CARRIERS, bases, cells, unplanted });
  },
  B2: async () => {
    const demoted: Json = {};
    const variants: Readonly<Record<string, Json>> = {
      measured: HISTORICAL,
      authorityAbsent: without(HISTORICAL, "authoritative_current"),
      authorityString: { ...HISTORICAL, authoritative_current: "true" },
      authorityNull: { ...HISTORICAL, authoritative_current: null },
      quotedCurrent: described({ freshness: "CURRENT" }),
      receiptNested: { ...HISTORICAL, cac_receipt: RECEIPT },
      receiptFlat: { ...HISTORICAL, ...RECEIPT },
    };
    for (const [id, row] of Object.entries(variants)) {
      const value = reading([row]);
      const topology = forgeGateTopology(value, CONTEXT);
      const evidence = await readForgeOperationEvidence(REF, evidenceDeps(value));
      demoted[id] = { tones: tonesOf(topology), package: topology.snapshots[1]?.node.statusText ?? "", evidence: evidence.statusText };
    }
    const quoted: Json = {};
    for (const base of Object.keys(BASES)) {
      for (const field of TEXT_FIELDS) {
        const input = wordCell(base, field, WORD);
        const topology = forgeGateTopology(input, CONTEXT);
        const evidence = await readForgeOperationEvidence(REF, evidenceDeps(input));
        const lawTopology = substituted(topology, forgeGateTopology(wordCell(base, field, NEUTRAL), CONTEXT));
        const lawEvidence = substituted(evidence, await readForgeOperationEvidence(REF, evidenceDeps(wordCell(base, field, NEUTRAL))));
        quoted[`${base}/${field}`] = {
          planted: wordPaths(input, "reading"), law: `topology=${lawTopology} evidence=${lawEvidence}`, tones: tonesOf(topology),
          shown: [...stringsOf(topology), ...stringsOf(evidence)].filter(text => text.includes(WORD)).map(marked),
        };
      }
    }
    const [freshWord, freshNeutral] = [WORD, NEUTRAL].map(word => forgeGateTopology(reading([described({ freshness: word })]), CONTEXT));
    const freshness = {
      identical: JSON.stringify(freshWord) === JSON.stringify(freshNeutral), shown: stringsOf(freshWord).filter(text => text.includes(WORD)).length,
      package: freshWord?.snapshots[1]?.node.statusText ?? "", diagnostics: freshWord?.diagnostics ?? [],
    };
    const native = nativeEvidence("forge.gate.status", wordCell("current", "source.status", WORD));
    const neutral = nativeEvidence("forge.gate.status", wordCell("current", "source.status", NEUTRAL));
    const refs = native.evidenceRefs ?? [];
    const lines = cardLines([nodeEntry(0, native.domainStatus, refs), nodeEntry(1, neutral.domainStatus, refs), nodeEntry(2, "verified", refs)]).filter(line => line.includes(` ${MIDDLE_DOT} forge.gate.status ${MIDDLE_DOT} `));
    const glyph = (line: string | undefined): string => shownText((line ?? "").trim().split(" ")[0] ?? "");
    const card = { domainStatus: marked(native.domainStatus ?? ""), glyphs: { word: glyph(lines[0]), neutral: glyph(lines[1]), verified: glyph(lines[2]) }, outcome: marked((lines[0] ?? "").trim()) };
    return { demoted, quoted, freshness, card };
  },
  C1: async () => adapterOutputs(),
  C2: async () => {
    const outputs = await adapterOutputs();
    const bytes = Object.fromEntries(Object.entries(outputs).map(([tag, output]) => {
      const text = JSON.stringify(output);
      return [tag, `${createHash("sha256").update(text).digest("hex").slice(0, 16)} ${Buffer.byteLength(text)} bytes`];
    }));
    return { tags: Object.keys(outputs), bytes };
  },
};

/** The SELF-READ: each IMPL member's direct identifiers, parsed from this file. */
function implIdentifiers(): Record<string, string[]> {
  const text = readFileSync(join(REPO, SELF), "utf8");
  const source = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: Record<string, string[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        const name = property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : "?";
        const names = new Set<string>();
        const collect = (inner: ts.Node): void => {
          if (ts.isIdentifier(inner)) names.add(inner.text);
          ts.forEachChild(inner, collect);
        };
        collect(property);
        found[name] = [...names].sort(byName);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** A2's planted texts that read quiet and are no residual's: the bare words and today's own labels, which hold no claim. */
const NON_CLAIMS: readonly string[] = ["bareVerified", "bareHistorical", "todayLabel", "todayEvidence", "gating"];
/** Each residual's quiet rows and twins are planted inputs of the pin that reads them. */
const RESIDUALS: readonly Residual[] = [
  { id: "R-COMPOSED", quietPin: "A2", quiet: ["composed"], twin: ["composedTwin"] },
  { id: "R-EMBEDDED", quietPin: "A2", quiet: ["embedded"], twin: ["glued"] },
  { id: "R-LOOKALIKE", quietPin: "A2", quiet: ["cyrillic"], twin: ["fullwidth"] },
  { id: "R-PARAPHRASE", quietPin: "A2", quiet: ["passed", "atSnapshot"], twin: ["adverb"] },
  { id: "R-SIBLING", quietPin: "A2", quiet: ["current"], twin: ["title"] },
  { id: "R-OTHER-NAME", quietPin: "A1", quiet: ["otherName"], twin: ["named"] },
  { id: "R-UNPLANTED-SPELLING", quietPin: "B1", quiet: ["otherSpelling"], twin: ["readKey"] },
];

describe("wb-b9n.1 Forge CAC receipt census (FORGE-CAC-EVIDENCE-ASSURANCE-R2)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and the title's artifact, word and fields", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.constants).toEqual({ gating: GATING, word: WORD, fields: FIELDS, neutral: NEUTRAL, lead: ACCEPTANCE.lead });
    // Outside anchor: the filing's acceptance clauses are exactly the row labels, and each pin quotes a span of its row.
    expect(ACCEPTANCE.clauses).toHaveLength(3);
    expect(ROWS.map(row => row.label)).toEqual(ACCEPTANCE.clauses);
    expect(ROWS.flatMap(row => row.pins.filter(pin => !row.label.includes(pin.quote)).map(pin => pin.id))).toEqual([]);
    // Pin membership against the export's clause text: each quote once at word boundaries, exactly the not-due spans unquoted,
    // and every pin load-bearing (without it, a word of its clause goes unquoted).
    const quotesOf = (row: Row, skip?: Pin): string[] => row.pins.filter(pin => pin !== skip).map(pin => pin.quote);
    const readings = ROWS.map((row, index) => unquoted(ACCEPTANCE.clauses[index] ?? "", quotesOf(row)));
    expect(ROWS.flatMap((row, index) => (readings[index]?.misplaced ?? []).map(quote => `${row.id}:${quote}`))).toEqual([]);
    expect(Object.fromEntries(ROWS.map((row, index) => [row.id, readings[index]?.runs]))).toEqual(NOT_DUE);
    const idle = (row: Row, index: number, pin: Pin): boolean => JSON.stringify(unquoted(ACCEPTANCE.clauses[index] ?? "", quotesOf(row, pin)).runs) === JSON.stringify(NOT_DUE[row.id]);
    expect(ROWS.flatMap((row, index) => row.pins.filter(pin => idle(row, index, pin)).map(pin => pin.id))).toEqual([]);
    expect(ROSTER.notDue).toEqual(NOT_DUE);
    expect(Object.entries(NOT_DUE).map(([id, runs]) => `${id}:${runs.flatMap(run => run.split(/\s+/)).length}`)).toEqual(["A:7", "B:9", "C:0"]);
    // The title's word is read by the family and its gating artifact is not; the neutral word is the word's byte length and read by none.
    expect([isWord(WORD), isWord(GATING), GATING.length > 0, WORD.includes("_"), Buffer.byteLength(NEUTRAL) === Buffer.byteLength(WORD), isWord(NEUTRAL)]).toEqual([true, false, true, true, true, false]);
    expect(Object.keys(FIELD_KEYS)).toEqual(FIELDS);
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["R-COMPOSED", "R-EMBEDDED", "R-LOOKALIKE", "R-PARAPHRASE", "R-SIBLING", "R-OTHER-NAME", "R-UNPLANTED-SPELLING"]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    const plantedOf: Readonly<Record<string, readonly string[]>> = {
      A1: Object.keys(PLANTED_RELEASE), A2: [...Object.keys(PLANTED_TEXTS), ...Object.keys(PLANTED_MODULES)], B1: Object.keys(UNPLANTED),
    };
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(plantedOf[residual.quietPin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
    // Every planted input A1 and A2 read quiet is a named non-claim or one residual's quiet row, never both: a residual dropped
    // from the table leaves its quiet row unaccounted for.
    const quietOf = (pin: string): string[] => RESIDUALS.filter(residual => residual.quietPin === pin).flatMap(residual => residual.quiet);
    const quietTexts = Object.keys(PLANTED_TEXTS).filter(id => !isWord(PLANTED_TEXTS[id] ?? ""));
    const quietModules = Object.keys(PLANTED_MODULES).filter(id => judgeModules([{ path: PLANT, text: PLANTED_MODULES[id] ?? "" }]).hits.length === 0);
    const quietRelease = Object.keys(PLANTED_RELEASE).filter(id => {
      const one = releaseReading([PLANTED_RELEASE[id] ?? { path: "", text: "" }]);
      return one.gating.length + one.word.length + one.receiptShaped.length === 0;
    });
    expect([...quietTexts, ...quietModules].sort(byName)).toEqual([...NON_CLAIMS, ...quietOf("A2")].sort(byName));
    expect(quietRelease).toEqual(quietOf("A1"));
    expect(NON_CLAIMS.filter(id => quietOf("A2").includes(id))).toEqual([]);
    // SELF-READ: no pin body names the roster, and the roster cannot be rewritten in memory.
    const identifiers = implIdentifiers();
    expect(Object.keys(identifiers).sort(byName)).toEqual(Object.keys(IMPL).sort(byName));
    expect(Object.entries(identifiers).filter(([, names]) => names.includes("ROSTER")).map(([id]) => id)).toEqual([]);
    expect([Object.isFrozen(ROSTER), Object.isFrozen(ROSTER.rows), ROSTER.rows.every(row => row.pins.every(pin => Object.isFrozen(pin)))]).toEqual([true, true, true]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          if (pin.id === "A1") expect(witness, OWED).toEqual(held?.witness);
          else expect(witness).toEqual(held?.witness);
          REACHED.set(pin.id, digestOf(witness));
        });
      }
    });
  }
  it("records: every registered pin ran to its compare, and each witness it produced digests as its roster witness", () => {
    // A second compare, independent of the pin cases': a pin case whose own compare is removed still reds here.
    const held = ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, digestOf(pin.witness)] as const)).sort(([a], [b]) => byName(a, b));
    expect([...REACHED].sort(([a], [b]) => byName(a, b))).toEqual(held);
  });
});
