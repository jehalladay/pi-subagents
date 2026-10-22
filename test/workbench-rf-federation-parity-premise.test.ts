/**
 * wb-a9l2.1 (RF-HARNESS2-FEDERATED-PEER-R1, program-triage-2026-10-22): no Pi surface or Pi-hosted bead treats the rf
 * audit's claim h2fp-C004 as a premise or asserts rf federation disabled-mode parity. The claim is UNDETERMINED at the
 * audit pin 740c1a817, and Pi echoes that verdict verbatim, never a status of its own.
 *
 * Source (the owner filing quotes it): "UNDETERMINED claims the program should settle (1); each names the missing
 * artifact. UNDETERMINED is a result, not permission to guess: no bead treats these as premises."
 * harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:53@6a251bf73af5. BEADS:57 lists h2fp-C004 "Agents continue
 * using RF-CLI normally before, during and after integration (disabled-mode parity)." with the missing artifact "the
 * NEG-05 fixture (H2-05a)"; BEADS:3 says every statement there carries the pin main 740c1a817 (UNDETERMINED at that pin).
 * Acceptance (owner filing, verbatim): "(a) a hermetic guard asserts no Pi src/docs/test/qa string asserts rf federation
 * disabled-mode parity (or 'agents continue using RF-CLI normally') as established while the fixture path is absent from
 * the pinned rf tree; (b) once the fixture lands, a parity claim is admitted only with a receipt naming the rf sha and
 * the executed forge test command exiting 0; (c) a Pi bead note or docs row citing h2fp-C004 carries UNDETERMINED
 * verbatim and the 740c1a817 pin, never a Pi-minted status."
 *
 * READINGS
 * - MENTION: a match of one of the claim's FAMILIES in the folded text of a block (a maximal run of non-blank lines) of
 *   a scanned file, or in one exported bead row. The families: the claim id; "disabled-mode parity"; "using RF-CLI
 *   normally" (README:7 and BEADS:57; use, uses, using or used, an optional "the", and the rf spellings rf, RF-CLI,
 *   RFCLI, ReactiveFiber CLI); and NEG-05's own sentence "leaves existing RF-CLI graph and agent usage unchanged"
 *   (README:47, DEVELOPER:50). Those are the program's three wordings of the claim at the rf pin, plus its id.
 * - FOLDED TEXT: numeric and NAMED_REFERENCES character references and JS escapes (\uXXXX, \u{X}, \xHH) decoded, then
 *   NFKC, lower case, every run of ASCII punctuation or white space one space, every other code point (a non-ASCII one
 *   or an ASCII control) one wildcard; a block's lines are folded one by one and joined by a space. A word of a family
 *   reads as itself, with one letter read as a wildcard, or with one to three spaces or wildcards between two of its
 *   letters, and the words of a phrase stand one to four spaces or wildcards apart: a hyphen, a line break inside a
 *   block, emphasis inside a word, a look-alike letter, an inserted invisible or an encoded hyphen hides no mention,
 *   while a run of wildcards never reads as a word. Required text is never folded: the verdict word and the pin are
 *   matched exactly, as whole words.
 * - WINDOW: a mention is judged on the raw lines its phrase spans, never on the rest of its block, so an echo on
 *   another line or in another table row does not cover it (rows F36-F38, F43).
 * - ECHO: a window that carries the verdict word as a whole upper-case word, the audit pin as a whole hex token (or a
 *   longer extension of it) and no other grade (MINTED_GRADES, whole upper-case words).
 * - (a) While the fixture is absent at the pin (FIXTURE_AT_PIN, measured), a scanned mention whose window is not an echo
 *   is refused: unechoed-claim. The guard does not tell an assertion from a negation or a quotation, so every mention
 *   in the four trees is an echo or it is refused (row F12).
 * - (b) Once a later cut re-measures the rf tree and records the fixture present, a scanned mention whose window is not
 *   an echo is admitted only when the first receipt the window names (docs/workbench/receipts/<file>.md) exists, names
 *   "rf sha <12-40 hex>" and carries FIXTURE_COMMAND exactly (no further flag) with "exit 0" after it on its line;
 *   otherwise receipt-not-cited, receipt-absent, receipt-no-rf-sha, receipt-no-command, receipt-no-exit-0. While the
 *   fixture is absent no receipt admits a mention (row F16). Until FIXTURE_AT_PIN flips, (b) is exercised by rows
 *   F24-F31 and N08; the live scan already reads the receipts directory (RECEIPTS_FLOOR) for that flip.
 * - (c) A scanned claim-id mention also draws echo-no-undetermined, echo-no-pin and echo-minted-status for what its
 *   window lacks, receipt or not (row F31). An exported bead row (.beads/issues.jsonl: every string value of the row,
 *   nested ones included) with a claim-id mention draws echo-no-undetermined and echo-no-pin: bead rows are judged at row
 *   granularity on those two required tokens only, because collector and gate notes accumulate on a filing's own row
 *   (residuals R4, R5). An export line that does not parse is a finding of its own, never skipped (row F44).
 * - SCOPE: the four trees the filing names, walked from disk with dot directories (node_modules, dist and .git skipped;
 *   a symlink is refused, never followed); FLOORS count the walked files per tree and extension. This file is the one
 *   exemption (its falsifier inputs spell the refused forms on purpose), and the exemption is load-bearing: lifted, the
 *   scan reads this file's mentions as refused.
 * - PIN STATE (measured at this cut: git ls-tree -r at rf 6a251bf73af5 lists no tests/journeys/test_federation_disabled_parity.py):
 *   FIXTURE_AT_PIN is absent. A later cut that re-measures the rf tree flips it, never this guard's readers.
 * FINDING: `<path>:<line> <family>: <diagnoses>` per refused mention (line = the first line its phrase spans),
 * `<bead id> claim-id: <diagnoses>` per refused bead row, `line <n> unreadable` per export line that does not parse.
 * OUTSIDE ANCHORS. The owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-a9l2.1) carries every
 * pinned constant verbatim, names the scan trees ("no Pi src/docs/test/qa string") and the fixture's absence ("git
 * ls-tree at 6a251bf73af5 has no such file"), and its quoted spellings read as mentions of their families. The
 * out-of-file roster test/fixtures/rf-federation-parity-premise-roster.json carries every judged row (table, id,
 * registered test, findings, input digest) and the residual families; the roster case judges the in-file rows and this
 * file's registered tests (vitest's task tree) against it, in order and both ways, so a row removed from every literal
 * of this file still reds. Not claimed: an edit of this file and the roster together.
 * FROZEN SHAPE (standing rule 16): one row pins every judged row (table, id, findings, input digest prefix), the family
 * slots, the grades, the trees, the floors, the exemption, the decoded references and the residual families as literals
 * read at this cut.
 * RESIDUALS (named; each has a pinned quiet row): R1 a paraphrase outside the four families; R2 a phrase assembled at
 * runtime around another token; R3 ASCII look-alikes (1 for l, 0 for o), two alterations in one word, or one code point
 * standing for several letters; R4 a bead row naming a family but not the claim id (wb-a9l2.6 quotes README:51's
 * release condition so); R5 bead-row granularity: a later note on a row that already carries both tokens, and grades in
 * a bead row; R6 files outside the four trees; R7 status prose (lower-case or negated grade words) beside a verbatim
 * echo; R8 a phrase split across a blank line; R9 echo tokens on a mention's own lines admit it, whatever they qualify;
 * R10 a named character reference outside NAMED_REFERENCES.
 * Display paths added: none. This file is test-only: it spawns nothing and writes nothing; it reads the four trees, the
 * receipts directory, the bead export and the roster fixture.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = relative(ROOT, fileURLToPath(import.meta.url)).split(sep).join("/");
const BEAD = "wb-a9l2.1";
const BEAD_EXPORT = ".beads/issues.jsonl";
const RECEIPTS_DIR = "docs/workbench/receipts";
const ROSTER = "test/fixtures/rf-federation-parity-premise-roster.json";

/** The rf audit's claim, its verdict and the audit pin (BEADS-2026-10-21.md:3, :53 and :57 at RF_PIN). */
const CLAIM_ID = "h2fp-C004";
const AUDIT_STATUS = "UNDETERMINED";
const AUDIT_PIN = "740c1a817";
/** The rf tree the owner triage read, the gating bead and its fixture (BEADS-2026-10-21.md:13 at RF_PIN). */
const RF_PIN = "6a251bf73af5";
const GATING_BEAD = "rfc-lr9nu.1";
const FIXTURE_PATH = "tests/journeys/test_federation_disabled_parity.py";
const FIXTURE_COMMAND = `forge test --files ${FIXTURE_PATH} -- --no-cov`;

interface FixtureState {
  readonly state: "absent" | "present";
  readonly rfSha: string;
}
/** Measured: the owner triage and this cut's git ls-tree at RF_PIN find no FIXTURE_PATH. */
const FIXTURE_AT_PIN: FixtureState = { state: "absent", rfSha: RF_PIN };
const FIXTURE_LANDED: FixtureState = { state: "present", rfSha: "0123456789ab" };

const TREES = ["src", "docs", "test", "qa"] as const;
type Tree = (typeof TREES)[number];
/** Walked files per tree and extension, well under the counts at this cut; fewer means the walk lost a kind of file. */
const FLOORS: Readonly<Record<Tree, Readonly<Record<string, number>>>> = {
  src: { ".ts": 80 },
  docs: { ".md": 40 },
  test: { ".ts": 300, ".md": 15, ".json": 10, ".mjs": 3 },
  qa: { ".mjs": 40, ".sh": 3 },
};
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
const EXEMPT: readonly string[] = ["test/workbench-rf-federation-parity-premise.test.ts"];
/** Lifted, the exemption must expose at least this many refused mentions in this file (its falsifier inputs). */
const MIN_SELF_FINDINGS = 30;
/** The bead export and the receipts directory hold well over this many rows and files. */
const EXPORT_FLOOR = 100;
const RECEIPTS_FLOOR = 30;
const MINTED_GRADES = ["CONFIRMED", "PLAUSIBLE", "REFUTED", "VERIFIED", "ESTABLISHED", "SETTLED", "PROVEN"] as const;

const RF_SPELLINGS = ["rf cli", "rfcli", "rf", "reactivefiber cli", "reactivefibercli", "reactive fiber cli"];
/** A family is a sequence of slots; a slot lists its alternative word sequences, and "" makes the slot optional. */
interface Family {
  readonly id: string;
  readonly slots: readonly (readonly string[])[];
}
const FAMILIES: readonly Family[] = [
  { id: "claim-id", slots: [["h2fp"], ["c004"]] },
  { id: "mode-parity", slots: [["disabled"], ["mode"], ["parity"]] },
  { id: "rf-normally", slots: [["use", "uses", "using", "used"], ["", "the"], RF_SPELLINGS, ["normally"]] },
  { id: "neg-05", slots: [["leaves"], ["", "the"], ["existing"], RF_SPELLINGS, ["graph"], ["and"], ["agent"], ["usage"], ["unchanged"]] },
];

/** Between two words of a phrase: one to four spaces or wildcards. */
const SEPARATOR = "[ ?]{1,4}";
/**
 * One word as itself, with one letter read as a wildcard, or with one to three spaces or wildcards between two of its
 * letters. Every form keeps all but at most one letter literal, so a run of wildcards never reads as a word, and the
 * bounded alternation cannot backtrack catastrophically.
 */
function tolerantWord(word: string): string {
  const letters = [...word];
  const forms = [word];
  for (let index = 0; index < letters.length; index++) forms.push([...letters.slice(0, index), "\\?", ...letters.slice(index + 1)].join(""));
  for (let index = 1; index < letters.length; index++) forms.push(`${letters.slice(0, index).join("")}[ ?]{1,3}${letters.slice(index).join("")}`);
  return `(?:${forms.join("|")})`;
}
function familySource(family: Family): string {
  const slots = family.slots.map(slot => ({
    pattern: `(?:${slot
      .filter(alternative => alternative !== "")
      .map(alternative => alternative.split(" ").map(tolerantWord).join(SEPARATOR))
      .join("|")})`,
    optional: slot.includes(""),
  }));
  const body = slots.map((slot, index) => (index === 0 ? slot.pattern : slot.optional ? `(?:${SEPARATOR}${slot.pattern})?` : `${SEPARATOR}${slot.pattern}`)).join("");
  return `(?<![a-z0-9])${body}(?![a-z0-9])`;
}
const PATTERNS: readonly (readonly [string, RegExp])[] = FAMILIES.map(family => [family.id, new RegExp(familySource(family))]);
const GLOBAL_PATTERNS: readonly (readonly [string, RegExp])[] = FAMILIES.map(family => [family.id, new RegExp(familySource(family), "g")]);
const STATUS_WORD = new RegExp(`(?<![A-Za-z0-9])${AUDIT_STATUS}(?![A-Za-z0-9])`);
const PIN_WORD = new RegExp(`(?<![0-9A-Za-z])${AUDIT_PIN}[0-9a-f]{0,31}(?![0-9A-Za-z])`);
const MINTED_WORD = new RegExp(`(?<![A-Za-z0-9])(?:${MINTED_GRADES.join("|")})(?![A-Za-z0-9])`);
const RECEIPT_REF = /docs\/workbench\/receipts\/([A-Za-z0-9._-]+\.md)/;
const RF_SHA = /(?<![A-Za-z0-9])rf sha [0-9a-f]{12,40}(?![0-9a-f])/;
/** What may follow the exact command on its line: nothing, a closing mark, or white space then no further flag. */
const COMMAND_END = /^(?:$|[`'")\].,;]|[ \t]+(?:$|->|[^\s-]))/;
const EXIT_ZERO = /(?<![A-Za-z0-9])exit 0(?![0-9])/;

/** The named character references decoded before folding (HTML names for the marks a phrase could hide behind). */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", String.fromCodePoint(0xa0)],
  ["shy", String.fromCodePoint(0xad)],
  ["hyphen", String.fromCodePoint(0x2010)],
  ["dash", String.fromCodePoint(0x2010)],
  ["ndash", String.fromCodePoint(0x2013)],
  ["mdash", String.fromCodePoint(0x2014)],
  ["minus", String.fromCodePoint(0x2212)],
  ["zwj", String.fromCodePoint(0x200d)],
  ["zwnj", String.fromCodePoint(0x200c)],
]);
const codePoint = (value: number, raw: string): string => (Number.isInteger(value) && value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : raw);
function decodeReferences(text: string): string {
  return text
    .replace(/&#[xX]([0-9a-fA-F]{1,6});|&#([0-9]{1,7});/g, (raw: string, hex: string | undefined, decimal: string | undefined) => codePoint(hex !== undefined ? Number.parseInt(hex, 16) : Number.parseInt(decimal ?? "", 10), raw))
    .replace(/&([A-Za-z]+);/g, (raw: string, name: string) => NAMED_REFERENCES.get(name) ?? raw)
    .replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g, (raw: string, braced: string | undefined, four: string | undefined, two: string | undefined) => codePoint(Number.parseInt(braced ?? four ?? two ?? "", 16), raw));
}

/** References and escapes decoded, NFKC, lower case, ASCII punctuation and white space runs one space, every other code point one wildcard. */
function fold(text: string): string {
  return decodeReferences(text)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\t\n\r\x20-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]+/g, " ")
    .replace(/[^a-z0-9 ]/gu, "?")
    .replace(/ {2,}/g, " ");
}

/** The families the folded text mentions, in FAMILIES order. */
function familiesOf(text: string): string[] {
  const folded = fold(text);
  return PATTERNS.filter(([, pattern]) => pattern.test(folded)).map(([id]) => id);
}

type Diagnosis =
  | "echo-no-undetermined"
  | "echo-no-pin"
  | "echo-minted-status"
  | "unechoed-claim"
  | "receipt-not-cited"
  | "receipt-absent"
  | "receipt-no-rf-sha"
  | "receipt-no-command"
  | "receipt-no-exit-0";

/** (b): what the first receipt a window names lacks; empty when it admits the mention. */
function receiptFindings(window: string, receipts: ReadonlyMap<string, string>): Diagnosis[] {
  const cited = RECEIPT_REF.exec(window);
  if (cited === null) return ["receipt-not-cited"];
  const receipt = receipts.get(cited[1] ?? "");
  if (receipt === undefined) return ["receipt-absent"];
  const found: Diagnosis[] = [];
  if (!RF_SHA.test(receipt)) found.push("receipt-no-rf-sha");
  const runs = receipt.split("\n").flatMap(line => {
    const at = line.indexOf(FIXTURE_COMMAND);
    if (at < 0) return [];
    const rest = line.slice(at + FIXTURE_COMMAND.length);
    return COMMAND_END.test(rest) ? [rest] : [];
  });
  if (runs.length === 0) found.push("receipt-no-command", "receipt-no-exit-0");
  else if (!runs.some(rest => EXIT_ZERO.test(rest))) found.push("receipt-no-exit-0");
  return found;
}

/** (a)-(c) for one mention judged on its window: empty when the window is an echo or a receipt admits it. */
function judgeMention(family: string, window: string, fixture: FixtureState, receipts: ReadonlyMap<string, string>): Diagnosis[] {
  const status = STATUS_WORD.test(window);
  const pinned = PIN_WORD.test(window);
  const minted = MINTED_WORD.test(window);
  const found: Diagnosis[] = [];
  if (family === "claim-id") {
    if (!status) found.push("echo-no-undetermined");
    if (!pinned) found.push("echo-no-pin");
    if (minted) found.push("echo-minted-status");
  }
  if (status && pinned && !minted) return found;
  if (fixture.state === "absent") return [...found, "unechoed-claim"];
  return [...found, ...receiptFindings(window, receipts)];
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
}
interface Block {
  /** 1-based line of the block's first line. */
  readonly line: number;
  readonly lines: readonly string[];
}
interface Mention {
  readonly family: string;
  /** 0-based block lines the phrase spans. */
  readonly first: number;
  readonly last: number;
}

function blocks(text: string): Block[] {
  const lines = text.split(/\r?\n/);
  const out: Block[] = [];
  let start = -1;
  for (let index = 0; index <= lines.length; index++) {
    const blank = index === lines.length || /^\s*$/.test(lines[index] ?? "");
    if (!blank && start < 0) start = index;
    if (blank && start >= 0) {
      out.push({ line: start + 1, lines: lines.slice(start, index) });
      start = -1;
    }
  }
  return out;
}

/** Every mention in one block, in line order then FAMILIES order, with the block lines its phrase spans. */
function mentionsOf(lines: readonly string[]): Mention[] {
  const starts: number[] = [];
  let folded = "";
  for (const line of lines) {
    if (starts.length > 0) folded += " ";
    starts.push(folded.length);
    folded += fold(line);
  }
  const lineAt = (offset: number): number => {
    let index = 0;
    while (index + 1 < starts.length && (starts[index + 1] ?? folded.length) <= offset) index++;
    return index;
  };
  const found: (Mention & { readonly order: number })[] = [];
  for (const [order, [family, pattern]] of GLOBAL_PATTERNS.entries()) {
    for (const match of folded.matchAll(pattern)) {
      const at = match.index ?? 0;
      found.push({ family, first: lineAt(at), last: lineAt(at + Math.max(match[0].length - 1, 0)), order });
    }
  }
  return found.sort((left, right) => left.first - right.first || left.order - right.order).map(({ family, first, last }) => ({ family, first, last }));
}

function inTrees(path: string): boolean {
  return TREES.some(tree => path.startsWith(`${tree}/`));
}

/** One FINDING per refused mention of the in-scope, non-exempt files. */
function scanFiles(files: readonly SourceFile[], fixture: FixtureState, receipts: ReadonlyMap<string, string>, exempt: readonly string[] = EXEMPT): string[] {
  const findings: string[] = [];
  for (const file of files) {
    if (!inTrees(file.path) || exempt.includes(file.path)) continue;
    // Whole-file prefilter: a mention inside one block is a mention of the whole file too.
    if (familiesOf(file.text).length === 0) continue;
    for (const block of blocks(file.text)) {
      for (const mention of mentionsOf(block.lines)) {
        const window = block.lines.slice(mention.first, mention.last + 1).join("\n");
        const found = judgeMention(mention.family, window, fixture, receipts);
        if (found.length > 0) findings.push(`${file.path}:${block.line + mention.first} ${mention.family}: ${found.join("+")}`);
      }
    }
  }
  return findings;
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) collectStrings(item, out);
  else if (typeof value === "object" && value !== null) for (const item of Object.values(value)) collectStrings(item, out);
}

function rowId(row: unknown): string | undefined {
  return typeof row === "object" && row !== null && "id" in row && typeof row.id === "string" ? row.id : undefined;
}

function parseRow(line: string): { readonly ok: true; readonly row: unknown } | { readonly ok: false } {
  try {
    return { ok: true, row: JSON.parse(line) };
  } catch {
    return { ok: false };
  }
}

/** (c) over the bead export: one FINDING per row with a claim-id mention that lacks either required token, or per unreadable line. */
function scanBeadExport(lines: readonly string[]): string[] {
  const findings: string[] = [];
  for (const [index, line] of lines.entries()) {
    if (line.trim() === "") continue;
    const parsed = parseRow(line);
    if (!parsed.ok) {
      findings.push(`line ${index + 1} unreadable`);
      continue;
    }
    const strings: string[] = [];
    collectStrings(parsed.row, strings);
    const text = strings.join("\n");
    if (!familiesOf(text).includes("claim-id")) continue;
    const found: Diagnosis[] = [];
    if (!STATUS_WORD.test(text)) found.push("echo-no-undetermined");
    if (!PIN_WORD.test(text)) found.push("echo-no-pin");
    if (found.length > 0) findings.push(`${rowId(parsed.row) ?? `line ${index + 1}`} claim-id: ${found.join("+")}`);
  }
  return findings;
}

function beadRowText(lines: readonly string[], id: string): string {
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parsed = parseRow(line);
    if (!parsed.ok || rowId(parsed.row) !== id) continue;
    const strings: string[] = [];
    collectStrings(parsed.row, strings);
    return strings.join("\n");
  }
  return "";
}

/** Every regular file under `directory` (dot directories included); every symlink lands in `links`, never followed. */
function walk(directory: string, out: string[], links: string[]): void {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))) {
    if (SKIPPED_DIRS.has(entry.name)) continue;
    const full = join(directory, entry.name);
    if (entry.isSymbolicLink()) links.push(full);
    else if (entry.isDirectory()) walk(full, out, links);
    else if (entry.isFile()) out.push(full);
  }
}

const repoPath = (path: string): string => relative(ROOT, path).split(sep).join("/");

function liveFiles(): { readonly files: SourceFile[]; readonly links: string[] } {
  const paths: string[] = [];
  const links: string[] = [];
  for (const tree of TREES) walk(join(ROOT, tree), paths, links);
  return { files: paths.map(path => ({ path: repoPath(path), text: readFileSync(path, "utf8") })), links: links.map(repoPath) };
}

function liveReceipts(): ReadonlyMap<string, string> {
  const directory = join(ROOT, RECEIPTS_DIR);
  return new Map(
    readdirSync(directory)
      .filter(name => name.endsWith(".md"))
      .sort()
      .map(name => [name, readFileSync(join(directory, name), "utf8")] as const),
  );
}

const exportLines = (): string[] => readFileSync(join(ROOT, BEAD_EXPORT), "utf8").split("\n");

// ---- judged rows (every non-ASCII input is built with String.fromCodePoint) ----
const CYRILLIC_A = String.fromCodePoint(0x0430);
const CYRILLIC_ER = String.fromCodePoint(0x0440);
const CYRILLIC_I = String.fromCodePoint(0x0406);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const FULLWIDTH_RF_CLI = String.fromCodePoint(0xff32, 0xff26, 0xff0d, 0xff23, 0xff2c, 0xff29);
const COMPLETE_RECEIPT = ["# wb-x: installed journey", "", "## 2026-10-22 run", "rf sha 0123456789abcdef0123456789abcdef01234567", `\`${FIXTURE_COMMAND}\` -> exit 0`, ""].join("\n");
const CITING = "Disabled-mode parity holds (docs/workbench/receipts/wb-x.md).";
const FILLER = "filler line\n".repeat(60_000);

type Table = "FALSIFIERS" | "CONTROLS" | "RESIDUALS";
interface Row {
  readonly table: Table;
  readonly id: string;
  /** Mention-free: the roster carries it inside a scanned tree. */
  readonly label: string;
  readonly files?: readonly SourceFile[];
  readonly bead?: readonly string[];
  readonly fixture?: FixtureState;
  readonly receipts?: Readonly<Record<string, string>>;
  readonly expect: readonly string[];
}
const doc = (text: string): readonly SourceFile[] => [{ path: "docs/x.md", text }];
const beadLine = (row: Record<string, unknown>): string => JSON.stringify(row);

const ROWS: readonly Row[] = [
  // (a), one row per tree the filing names
  { table: "FALSIFIERS", id: "F01", label: "docs paragraph, the README:7 sentence", files: [{ path: "docs/workbench/x.md", text: "Agents continue using RF-CLI normally before, during and after integration.\n" }], expect: ["docs/workbench/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F02", label: "src string literal", files: [{ path: "src/x.ts", text: 'export const label = "rf federation keeps disabled-mode parity";\n' }], expect: ["src/x.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F03", label: "test comment, the NEG-05 sentence", files: [{ path: "test/x.test.ts", text: "// Turning integration off leaves existing RF-CLI graph and agent usage unchanged.\n" }], expect: ["test/x.test.ts:1 neg-05: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F04", label: "qa script output", files: [{ path: "qa/x.mjs", text: "console.log('agents keep using rf normally');\n" }], expect: ["qa/x.mjs:1 rf-normally: unechoed-claim"] },
  // (a), folding
  { table: "FALSIFIERS", id: "F05", label: "case and spacing", files: doc("Disabled  Mode Parity holds.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F06", label: "line break inside one block", files: doc("intro\n\nagents continue using\nRF-CLI normally\n"), expect: ["docs/x.md:3 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F07", label: "look-alike letter", files: doc(`disabled-mode p${CYRILLIC_A}rity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F08", label: "inserted invisible", files: doc(`disabled-mo${ZERO_WIDTH_SPACE}de parity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F09", label: "fullwidth compatibility forms", files: doc(`agents continue using ${FULLWIDTH_RF_CLI} normally\n`), expect: ["docs/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F10", label: "string concatenation", files: [{ path: "src/y.ts", text: 'const s = "disabled-mode " + "parity";\n' }], expect: ["src/y.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F11", label: "html comment", files: doc("<!-- agents continue using RF-CLI normally -->\n"), expect: ["docs/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F12", label: "a negation is still a mention", files: doc("Pi never claims disabled-mode parity.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F13", label: "verdict without the pin", files: doc("Disabled-mode parity is UNDETERMINED.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F14", label: "pin without the verdict", files: doc("disabled-mode parity at rf main 740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F15", label: "echo with a minted grade", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817, CONFIRMED by Pi\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F16", label: "a complete receipt while the fixture is absent", files: doc(`${CITING}\n`), receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F17", label: "two refused blocks in one file", files: doc("disabled-mode parity\n\nunrelated\n\nagents continue using RF-CLI normally\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim", "docs/x.md:5 rf-normally: unechoed-claim"] },
  // (c), the claim id in the trees
  { table: "FALSIFIERS", id: "F18", label: "claim id alone", files: doc("h2fp-C004 holds.\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F19", label: "claim id and verdict, no pin", files: doc("h2fp-C004 is UNDETERMINED.\n"), expect: ["docs/x.md:1 claim-id: echo-no-pin+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F20", label: "claim id and pin, no verdict", files: doc("h2fp-C004 at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F21", label: "claim id with a minted grade", files: doc("h2fp-C004: UNDETERMINED at 740c1a817; Pi grades it PLAUSIBLE\n"), expect: ["docs/x.md:1 claim-id: echo-minted-status+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F22", label: "a look-alike verdict is never folded", files: doc(`h2fp-C004 is UNDETERM${CYRILLIC_I}NED at 740c1a817\n`), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F23", label: "docs table row with a Pi grade", files: doc("| h2fp-C004 | parity | CONFIRMED |\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+echo-minted-status+unechoed-claim"] },
  // (b), once the fixture is present at the pin
  { table: "FALSIFIERS", id: "F24", label: "present, no receipt cited", files: doc("Disabled-mode parity holds.\n"), fixture: FIXTURE_LANDED, expect: ["docs/x.md:1 mode-parity: receipt-not-cited"] },
  { table: "FALSIFIERS", id: "F25", label: "present, the receipt is not in the listing", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-y.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 mode-parity: receipt-absent"] },
  { table: "FALSIFIERS", id: "F26", label: "present, the receipt names no rf sha", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf at main") }, expect: ["docs/x.md:1 mode-parity: receipt-no-rf-sha"] },
  { table: "FALSIFIERS", id: "F27", label: "present, the rf sha is too short", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 740c1a817") }, expect: ["docs/x.md:1 mode-parity: receipt-no-rf-sha"] },
  { table: "FALSIFIERS", id: "F28", label: "present, no command", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(FIXTURE_COMMAND, "forge test") }, expect: ["docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F29", label: "present, a narrowed command", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(`${FIXTURE_COMMAND}\``, `${FIXTURE_COMMAND} -k smoke\``) }, expect: ["docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F30", label: "present, a nonzero exit", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace("-> exit 0", "-> exit 1") }, expect: ["docs/x.md:1 mode-parity: receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F31", label: "present, a complete receipt does not excuse the claim id", files: doc("h2fp-C004 holds (docs/workbench/receipts/wb-x.md).\n"), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin"] },
  // (c), the bead export
  { table: "FALSIFIERS", id: "F32", label: "bead row with the verdict, no pin", bead: [beadLine({ id: "wb-zz.1", title: "h2fp-C004 is UNDETERMINED" })], expect: ["wb-zz.1 claim-id: echo-no-pin"] },
  { table: "FALSIFIERS", id: "F33", label: "bead row with neither token", bead: [beadLine({ id: "wb-zz.2", notes: "follow-up on h2fp-C004" })], expect: ["wb-zz.2 claim-id: echo-no-undetermined+echo-no-pin"] },
  { table: "FALSIFIERS", id: "F34", label: "bead row, look-alike claim id", bead: [beadLine({ id: "wb-zz.3", notes: `h2f${CYRILLIC_ER}-C004 holds` })], expect: ["wb-zz.3 claim-id: echo-no-undetermined+echo-no-pin"] },
  { table: "FALSIFIERS", id: "F35", label: "bead row, a nested string", bead: ["", beadLine({ id: "wb-zz.4", comments: [{ text: "h2fp-C004 at 740c1a817" }] })], expect: ["wb-zz.4 claim-id: echo-no-undetermined"] },
  // the window: an echo elsewhere in the block never covers a mention
  { table: "FALSIFIERS", id: "F36", label: "an echo on another line of the block", files: doc("h2fp-C004 is UNDETERMINED at 740c1a817.\nSee the rf audit.\nDisabled-mode parity holds.\n"), expect: ["docs/x.md:3 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F37", label: "an echo in another table row", files: doc("| claim | status |\n| h2fp-C004 | UNDETERMINED at 740c1a817 |\n| disabled-mode parity | holds |\n"), expect: ["docs/x.md:3 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F38", label: "the echo tokens on the next line", files: doc("h2fp-C004 is\nUNDETERMINED at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim"] },
  // required text is exact
  { table: "FALSIFIERS", id: "F39", label: "a lower-case verdict", files: doc("h2fp-C004 is undetermined at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F40", label: "the verdict inside a longer word", files: doc("disabled-mode parity: UNDETERMINEDNESS at 740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F41", label: "the pin inside a longer token", files: doc("disabled-mode parity: UNDETERMINED at g740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  // the scan reads every file, every mention and every export line
  { table: "FALSIFIERS", id: "F42", label: "a mention deep in a large file", files: doc(`${FILLER}\ndisabled-mode parity\n`), expect: ["docs/x.md:60002 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F43", label: "a second mention of one family in a block", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817\nand disabled-mode parity holds\n"), expect: ["docs/x.md:2 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F44", label: "an unreadable export line", bead: [beadLine({ id: "wb-zz.8", notes: "x" }), '{"id":"wb-zz.9","notes":'], expect: ["line 2 unreadable"] },
  // decoded before folding
  { table: "FALSIFIERS", id: "F45", label: "an html character reference", files: doc("disabled&#45;mode&nbsp;parity\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F46", label: "a JS escape inside a string", files: [{ path: "src/w.ts", text: 'const s = "disabled\\u002dmode\\x20parity";\n' }], expect: ["src/w.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F47", label: "emphasis inside a word", files: doc("dis**abled** mode parity\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  // accepted
  { table: "CONTROLS", id: "N01", label: "the echo form", files: doc("h2fp-C004 (agents keep using RF-CLI normally; disabled-mode parity) is UNDETERMINED at rf main 740c1a817.\n"), expect: [] },
  { table: "CONTROLS", id: "N02", label: "an echo on the lines a mention spans", files: doc("agents keep using\nRF-CLI normally: UNDETERMINED at 740c1a817\n"), expect: [] },
  { table: "CONTROLS", id: "N03", label: "an echo with a longer pin", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817aa\n"), expect: [] },
  { table: "CONTROLS", id: "N04", label: "unrelated parity", files: doc("the replay parity check compares digests\n"), expect: [] },
  { table: "CONTROLS", id: "N05", label: "a disabled mode without parity", files: doc("a disabled mode toggle\n"), expect: [] },
  { table: "CONTROLS", id: "N06", label: "another word order", files: doc("rf normally renders the context\n"), expect: [] },
  { table: "CONTROLS", id: "N07", label: "another claim id", files: doc("h2fp-C0045 holds.\n"), expect: [] },
  { table: "CONTROLS", id: "N08", label: "present, a complete receipt", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: [] },
  { table: "CONTROLS", id: "N09", label: "the one exempt path", files: [{ path: EXEMPT[0] ?? "", text: "agents continue using RF-CLI normally\n" }], expect: [] },
  { table: "CONTROLS", id: "N10", label: "bead row with both tokens", bead: [beadLine({ id: "wb-zz.5", notes: "h2fp-C004 is UNDETERMINED at 740c1a817" })], expect: [] },
  { table: "CONTROLS", id: "N11", label: "a run of wildcards is no word", files: doc(`${String.fromCodePoint(0x4e00).repeat(40)}\n`), expect: [] },
  { table: "CONTROLS", id: "N12", label: "a decoded reference outside a phrase", files: doc("parity &amp; disabled mode\n"), expect: [] },
  // named residuals: quiet rows
  { table: "RESIDUALS", id: "R1", label: "a paraphrase", files: doc("With the integration switched off, agents see no change in rf.\n"), expect: [] },
  { table: "RESIDUALS", id: "R2", label: "assembled at runtime", files: [{ path: "src/z.ts", text: 'const s = "disabled-" + kind + " parity";\n' }], expect: [] },
  { table: "RESIDUALS", id: "R3", label: "an ASCII look-alike", files: doc("disab1ed-mode parity\n"), expect: [] },
  { table: "RESIDUALS", id: "R4", label: "bead row without the claim id", bead: [beadLine({ id: "wb-zz.6", notes: "clean disabled-mode parity (README:51)" })], expect: [] },
  { table: "RESIDUALS", id: "R5", label: "bead-row granularity", bead: [beadLine({ id: "wb-zz.7", notes: "h2fp-C004 is UNDETERMINED at 740c1a817\n\nlater note: h2fp-C004 holds, CONFIRMED" })], expect: [] },
  { table: "RESIDUALS", id: "R6", label: "outside the four trees", files: [{ path: "README.md", text: "agents continue using RF-CLI normally\n" }], expect: [] },
  { table: "RESIDUALS", id: "R7", label: "status prose beside an echo", files: doc("h2fp-C004 is UNDETERMINED at 740c1a817, but Pi has verified it\n"), expect: [] },
  { table: "RESIDUALS", id: "R8", label: "split across a blank line", files: doc("agents continue using\n\nRF-CLI normally\n"), expect: [] },
  { table: "RESIDUALS", id: "R9", label: "echo tokens on the same line", files: doc("Disabled-mode parity holds; h2fp-C004 is UNDETERMINED at 740c1a817.\n"), expect: [] },
  { table: "RESIDUALS", id: "R10", label: "a named reference outside the decoded set", files: doc("disabled&hybull;mode parity\n"), expect: [] },
];
const RESIDUAL_FAMILIES: Readonly<Record<string, string>> = {
  R1: "paraphrase outside the four families",
  R2: "phrase assembled at runtime",
  R3: "ASCII look-alikes and multi-letter alterations",
  R4: "bead row without the claim id",
  R5: "bead-row granularity",
  R6: "files outside the four trees",
  R7: "status prose beside an echo",
  R8: "phrase split across a blank line",
  R9: "same-line echo tokens",
  R10: "named references outside the decoded set",
};

function readRow(row: Row): string[] {
  if (row.bead !== undefined) return scanBeadExport(row.bead);
  return scanFiles(row.files ?? [], row.fixture ?? FIXTURE_AT_PIN, new Map(Object.entries(row.receipts ?? {})));
}
function inputDigest(row: Row): string {
  return createHash("sha256")
    .update(JSON.stringify({ files: row.files ?? null, bead: row.bead ?? null, fixture: row.fixture ?? null, receipts: row.receipts ?? null }))
    .digest("hex");
}
const TABLE_WORD: Readonly<Record<Table, string>> = { FALSIFIERS: "falsifier", CONTROLS: "control", RESIDUALS: "residual" };
const testName = (row: Row): string => `${TABLE_WORD[row.table]} ${row.id} ${row.label}`;

interface RosterRow {
  readonly table: Table;
  readonly id: string;
  readonly test: string;
  readonly findings: readonly string[];
  readonly input: string;
}
interface Roster {
  readonly rows: readonly RosterRow[];
  readonly residuals: Readonly<Record<string, string>>;
}

describe("rf federation parity premise guard (wb-a9l2.1, RF-HARNESS2-FEDERATED-PEER-R1)", () => {
  it("live tree (a): no mention in the four trees except as an echo while the fixture is absent at the pin", () => {
    const { files, links } = liveFiles();
    const floors = TREES.flatMap(tree => Object.entries(FLOORS[tree]).map(([extension, floor]) => `${tree}${extension}:${files.filter(file => file.path.startsWith(`${tree}/`) && extname(file.path) === extension).length >= floor}`));
    expect(floors, "walked files per tree and extension, at or above their floors").toEqual(TREES.flatMap(tree => Object.keys(FLOORS[tree]).map(extension => `${tree}${extension}:true`)));
    expect(links, "symlinks under the four trees (refused, never followed)").toEqual([]);
    const receipts = liveReceipts();
    expect(receipts.size).toBeGreaterThanOrEqual(RECEIPTS_FLOOR);
    expect(scanFiles(files, FIXTURE_AT_PIN, receipts)).toEqual([]);
    // Non-vacuity: this file is on disk and the exemption is load-bearing - lifted, the same walk, fold and judge read
    // this file's falsifier inputs as refused mentions.
    expect(EXEMPT).toEqual([SELF]);
    const self = files.filter(file => file.path === SELF);
    expect(self).toHaveLength(1);
    expect(scanFiles(self, FIXTURE_AT_PIN, new Map(), []).length).toBeGreaterThanOrEqual(MIN_SELF_FINDINGS);
  });

  it("live bead export (c): every exported row with a claim-id mention carries the verdict verbatim and the audit pin", () => {
    const lines = exportLines();
    expect(lines.filter(line => line.trim() !== "").length).toBeGreaterThanOrEqual(EXPORT_FLOOR);
    expect(scanBeadExport(lines)).toEqual([]);
    // Non-vacuity: the filing's own row mentions the claim id, so the scan judged at least that row.
    expect(familiesOf(beadRowText(lines, BEAD))).toContain("claim-id");
  });

  it("filing anchor: the owner filing carries every pinned constant, names the trees and the fixture's absence, and its spellings read as mentions", () => {
    const filing = beadRowText(exportLines(), BEAD);
    for (const constant of [CLAIM_ID, AUDIT_STATUS, AUDIT_PIN, RF_PIN, GATING_BEAD, FIXTURE_PATH, FIXTURE_COMMAND]) expect(filing, constant).toContain(constant);
    expect(/no Pi ((?:[a-z]+\/)+[a-z]+) string/.exec(filing)?.[1]?.split("/"), "the filing's scan trees").toEqual([...TREES]);
    expect(filing, "the filing's measurement of the fixture").toContain(`git ls-tree at ${FIXTURE_AT_PIN.rfSha} has no such file`);
    expect(FIXTURE_AT_PIN.state).toBe("absent");
    const spellings = [/string asserts (rf federation disabled-mode parity) \(or/.exec(filing)?.[1], /\(or '([^']+)'\)/.exec(filing)?.[1], new RegExp(`lists ${CLAIM_ID} '([^']+)'`).exec(filing)?.[1]];
    expect(
      spellings.map(spelling => familiesOf(spelling ?? "")),
      "the filing's spellings, by family",
    ).toEqual([["mode-parity"], ["rf-normally"], ["mode-parity", "rf-normally"]]);
    expect(
      spellings.map(spelling => scanFiles(doc(`${spelling ?? ""}\n`), FIXTURE_AT_PIN, new Map())),
      "each spelling, planted unechoed",
    ).toEqual([["docs/x.md:1 mode-parity: unechoed-claim"], ["docs/x.md:1 rf-normally: unechoed-claim"], ["docs/x.md:1 mode-parity: unechoed-claim", "docs/x.md:1 rf-normally: unechoed-claim"]]);
  });

  for (const row of ROWS) {
    it(testName(row), () => {
      expect(readRow(row)).toEqual(row.expect);
    });
  }

  it("frozen shape (rule 16): rows, family slots, grades, trees, floors, the exemption, the decoded references and the residual families as read at this cut", () => {
    expect(ROWS.map(row => `${row.table}:${row.id}:${row.expect.join("|")}:${inputDigest(row).slice(0, 8)}`)).toEqual([
      "FALSIFIERS:F01:docs/workbench/x.md:1 rf-normally: unechoed-claim:86057134",
      "FALSIFIERS:F02:src/x.ts:1 mode-parity: unechoed-claim:403c351e",
      "FALSIFIERS:F03:test/x.test.ts:1 neg-05: unechoed-claim:3f78352c",
      "FALSIFIERS:F04:qa/x.mjs:1 rf-normally: unechoed-claim:0f579455",
      "FALSIFIERS:F05:docs/x.md:1 mode-parity: unechoed-claim:cf786200",
      "FALSIFIERS:F06:docs/x.md:3 rf-normally: unechoed-claim:e3c504bb",
      "FALSIFIERS:F07:docs/x.md:1 mode-parity: unechoed-claim:9d796616",
      "FALSIFIERS:F08:docs/x.md:1 mode-parity: unechoed-claim:066bab37",
      "FALSIFIERS:F09:docs/x.md:1 rf-normally: unechoed-claim:7ec7094a",
      "FALSIFIERS:F10:src/y.ts:1 mode-parity: unechoed-claim:c3e950e2",
      "FALSIFIERS:F11:docs/x.md:1 rf-normally: unechoed-claim:63e21ce5",
      "FALSIFIERS:F12:docs/x.md:1 mode-parity: unechoed-claim:ea81464e",
      "FALSIFIERS:F13:docs/x.md:1 mode-parity: unechoed-claim:a9280aad",
      "FALSIFIERS:F14:docs/x.md:1 mode-parity: unechoed-claim:eb8dbc2d",
      "FALSIFIERS:F15:docs/x.md:1 mode-parity: unechoed-claim:bcd4ac43",
      "FALSIFIERS:F16:docs/x.md:1 mode-parity: unechoed-claim:2315c8a9",
      "FALSIFIERS:F17:docs/x.md:1 mode-parity: unechoed-claim|docs/x.md:5 rf-normally: unechoed-claim:efbb3700",
      "FALSIFIERS:F18:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim:13cc5eed",
      "FALSIFIERS:F19:docs/x.md:1 claim-id: echo-no-pin+unechoed-claim:b2180a1f",
      "FALSIFIERS:F20:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:43ce2b7d",
      "FALSIFIERS:F21:docs/x.md:1 claim-id: echo-minted-status+unechoed-claim:ef872526",
      "FALSIFIERS:F22:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:9bf824e2",
      "FALSIFIERS:F23:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+echo-minted-status+unechoed-claim:5ab9bb94",
      "FALSIFIERS:F24:docs/x.md:1 mode-parity: receipt-not-cited:a0217c06",
      "FALSIFIERS:F25:docs/x.md:1 mode-parity: receipt-absent:b4ccd63d",
      "FALSIFIERS:F26:docs/x.md:1 mode-parity: receipt-no-rf-sha:aca15edc",
      "FALSIFIERS:F27:docs/x.md:1 mode-parity: receipt-no-rf-sha:f58028ba",
      "FALSIFIERS:F28:docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0:5ad425bf",
      "FALSIFIERS:F29:docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0:0d6f701f",
      "FALSIFIERS:F30:docs/x.md:1 mode-parity: receipt-no-exit-0:09446c4b",
      "FALSIFIERS:F31:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin:15af21ad",
      "FALSIFIERS:F32:wb-zz.1 claim-id: echo-no-pin:2df52283",
      "FALSIFIERS:F33:wb-zz.2 claim-id: echo-no-undetermined+echo-no-pin:ababdc1b",
      "FALSIFIERS:F34:wb-zz.3 claim-id: echo-no-undetermined+echo-no-pin:e48867a0",
      "FALSIFIERS:F35:wb-zz.4 claim-id: echo-no-undetermined:082836cd",
      "FALSIFIERS:F36:docs/x.md:3 mode-parity: unechoed-claim:2c425554",
      "FALSIFIERS:F37:docs/x.md:3 mode-parity: unechoed-claim:364334d9",
      "FALSIFIERS:F38:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim:156988e3",
      "FALSIFIERS:F39:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:6dacac1a",
      "FALSIFIERS:F40:docs/x.md:1 mode-parity: unechoed-claim:43513c48",
      "FALSIFIERS:F41:docs/x.md:1 mode-parity: unechoed-claim:ba717beb",
      "FALSIFIERS:F42:docs/x.md:60002 mode-parity: unechoed-claim:7c9bddcf",
      "FALSIFIERS:F43:docs/x.md:2 mode-parity: unechoed-claim:e20b78c9",
      "FALSIFIERS:F44:line 2 unreadable:def4ab4f",
      "FALSIFIERS:F45:docs/x.md:1 mode-parity: unechoed-claim:a3b69aa6",
      "FALSIFIERS:F46:src/w.ts:1 mode-parity: unechoed-claim:4141a351",
      "FALSIFIERS:F47:docs/x.md:1 mode-parity: unechoed-claim:e54af4d7",
      "CONTROLS:N01::6c96b072",
      "CONTROLS:N02::1e8fd29a",
      "CONTROLS:N03::3a545c1b",
      "CONTROLS:N04::4ab18508",
      "CONTROLS:N05::98294570",
      "CONTROLS:N06::02ba78e7",
      "CONTROLS:N07::3c6e2d1d",
      "CONTROLS:N08::9bcbbb7a",
      "CONTROLS:N09::e4b726bd",
      "CONTROLS:N10::a496060b",
      "CONTROLS:N11::9823b841",
      "CONTROLS:N12::528c75a0",
      "RESIDUALS:R1::1e0d90ec",
      "RESIDUALS:R2::e7707859",
      "RESIDUALS:R3::cf696a35",
      "RESIDUALS:R4::1dfda94b",
      "RESIDUALS:R5::e0cfe2ab",
      "RESIDUALS:R6::c1b665aa",
      "RESIDUALS:R7::788a8bd7",
      "RESIDUALS:R8::920a96a7",
      "RESIDUALS:R9::486147cd",
      "RESIDUALS:R10::3ff23a66",
    ]);
    expect(FAMILIES.map(family => `${family.id}:${family.slots.map(slot => slot.join("/")).join(" ")}`)).toEqual([
      "claim-id:h2fp c004",
      "mode-parity:disabled mode parity",
      "rf-normally:use/uses/using/used /the rf cli/rfcli/rf/reactivefiber cli/reactivefibercli/reactive fiber cli normally",
      "neg-05:leaves /the existing rf cli/rfcli/rf/reactivefiber cli/reactivefibercli/reactive fiber cli graph and agent usage unchanged",
    ]);
    expect([...MINTED_GRADES]).toEqual(["CONFIRMED", "PLAUSIBLE", "REFUTED", "VERIFIED", "ESTABLISHED", "SETTLED", "PROVEN"]);
    expect([...TREES]).toEqual(["src", "docs", "test", "qa"]);
    expect(FLOORS).toEqual({ src: { ".ts": 80 }, docs: { ".md": 40 }, test: { ".ts": 300, ".md": 15, ".json": 10, ".mjs": 3 }, qa: { ".mjs": 40, ".sh": 3 } });
    expect([MIN_SELF_FINDINGS, EXPORT_FLOOR, RECEIPTS_FLOOR]).toEqual([30, 100, 30]);
    expect([...EXEMPT]).toEqual(["test/workbench-rf-federation-parity-premise.test.ts"]);
    expect([...NAMED_REFERENCES.keys()]).toEqual(["amp", "lt", "gt", "quot", "apos", "nbsp", "shy", "hyphen", "dash", "ndash", "mdash", "minus", "zwj", "zwnj"]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([id, family]) => `${id}:${family}`)).toEqual([
      "R1:paraphrase outside the four families",
      "R2:phrase assembled at runtime",
      "R3:ASCII look-alikes and multi-letter alterations",
      "R4:bead row without the claim id",
      "R5:bead-row granularity",
      "R6:files outside the four trees",
      "R7:status prose beside an echo",
      "R8:phrase split across a blank line",
      "R9:same-line echo tokens",
      "R10:named references outside the decoded set",
    ]);
  });

  it("out-of-file roster: the judged rows, the registered row tests and the residual families equal the fixture, in order and both ways", ({ task }) => {
    const roster = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;
    const rows: RosterRow[] = ROWS.map(row => ({ table: row.table, id: row.id, test: testName(row), findings: readRow(row), input: inputDigest(row) }));
    expect(rows, "the in-file rows, judged now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the residual families").toEqual(roster.residuals);
    expect(
      ROWS.filter(row => row.table === "RESIDUALS").map(row => row.id),
      "one quiet row per residual family",
    ).toEqual(Object.keys(roster.residuals));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    const rowTests = new Set(roster.rows.map(row => row.test));
    expect(
      walked.filter(entry => rowTests.has(entry.name)).map(read),
      "every roster row's registered test ran before this case, in run mode and not inverted",
    ).toEqual(roster.rows.map(row => `${row.test} | run | ran`));
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case is in the walk by task identity, after the tests it judges").toBeGreaterThan(0);
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || (index < here && !ran(entry.state)))).map(read),
      "other tests of this file skipped, todo, inverted or not run before this case",
    ).toEqual([]);
    const titles = walked.map(entry => entry.name);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
  });
});
