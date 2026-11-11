/**
 * wb-ecl9 ([MII P05+], program mechanical-interop-integrity-2026-11-10): EAT-R432 criterion 1, the DOCS LEG ONLY. The Matrix B
 * row vendored beside the requirement (test/fixtures/mii-writer-containment-requirement.json, master a1870c0c, read-only git
 * show) says "docs census leg runnable today; payload leg waits for P05". This census is that docs leg over the six
 * function-route pages, and it claims exactly the pinned reader set below.
 *
 * THE READING. PAGES are the five Markdown pages of docs/workbench/programs/mechanical-workflows-interop-2026-11-04 and the
 * pi-mechanical-interop skill. fold() reads each source line: numeric character references and the NAMED_REFERENCES table
 * decoded; NFKD, with combining marks (General_Category M) and format code points (Cf) dropped; the inline markers * _ ~ `
 * and backslash dropped; a run of hyphens (U+002D, U+2010, U+2011) between two letters dropped. A folded line splits into
 * sentences after ".", "!" or "?"
 * followed by white space. WORDS are the three words the EAT-R432 Statement forbids for the function writer (sandbox,
 * isolated, contained), each matched case-insensitively anywhere in a word, so sandbox also matches sandboxed and sandboxing.
 * A match counts wherever it stands on the six pages: the census reads words, not what they describe. An isolated match is
 * qualified when its own folded sentence carries "not containment", the qualifier criterion 1 allows. Every other match is
 * a finding "<page>:<line> <word>: <sentence>". UNREAD (fail closed): a letter outside ASCII after fold() and a named
 * character reference outside NAMED_REFERENCES are findings "<page>:<line> unread: ...", because the census cannot say what
 * word such a spelling shows.
 *
 * PINNED READER SET (this file; each case by its id; observed green at base ce180d82 with this cut):
 * - R432-D1 the reading: the PAGES paths, sorted, equal the five .md files on disk in the program directory plus SKILL.md of
 *   each .agents/skills/<name> whose name holds "mechanical"; git tracks every page and no page is empty. Falsifier: a page
 *   dropped from or added to PAGES, or a Markdown page added to the program directory.
 * - R432-D2 the requirement anchor: the vendored EAT-R432 block and Matrix B row hash to their pinned SHA-256; the words the
 *   block's Statement forbids, read from the block, equal WORDS in order; the qualifier its criterion 1 allows equals
 *   QUALIFIER; criterion 1's backticked sandbox forms are sandbox and sandboxed; and the matrix row carries "docs census
 *   leg runnable today; payload leg waits for P05". Falsifier: a word dropped from WORDS, or from every literal of this
 *   file, still stands in the vendored block.
 * - R432-D3 the fold: each FOLD_FORMS spelling folds to its plain word. Falsifier: one fold step removed.
 * - R432-D4 sandbox and contained: no page holds a sandbox or contained finding, and each SANDBOX_PLANTS line added as a new
 *   last line to any page adds exactly its one finding. Falsifier: a pattern narrowed or a word dropped from WORDS.
 * - R432-D5 isolated (the quiet row of RESIDUAL UNQUALIFIED-ISOLATED): the isolated findings of the six pages, in PAGES
 *   order, are exactly RESIDUALS; each ISOLATED_PLANTS text added to any page adds exactly the findings its row names: one
 *   for an unqualified sentence, two for a sentence holding the word twice, none when the sentence itself carries "not
 *   containment", one when the qualifier stands in the next sentence or on the next line. Falsifier: a RESIDUALS row
 *   deleted, shortened or moved to another line, or a residual line reworded on its page.
 * - R432-D6 unread forms fail closed: no page holds an unread finding, and each UNREAD_PLANTS line added to any page adds
 *   exactly its one unread finding and no word finding. Falsifier: the letter or the reference check removed.
 * - R432-D7 the escape residuals' quiet rows: each RESIDUAL_ESCAPES line added to any page adds no finding. Falsifier: a
 *   fold() that reads inline HTML or link syntax as text (the residual cured without its row removed).
 * - R432-D8 frozen shape (standing rule 16): PAGES, WORDS, QUALIFIER, NAMED_REFERENCES, the anchor pins, the FOLD_FORMS,
 *   SANDBOX_PLANTS, ISOLATED_PLANTS, UNREAD_PLANTS and RESIDUAL_ESCAPES names, and every RESIDUALS row by id, page, line and
 *   the first 16 hex of its sentence's SHA-256, each as a literal. Falsifier: a table row deleted, shortened or moved, or a
 *   pattern edited, without its literal.
 *
 * RESIDUAL UNQUALIFIED-ISOLATED (named family; pinned quiet row R432-D5): criterion 1's clause that isolated occurs only in
 * the phrase "dedicated clean Git worktree" or with an explicit "not containment" qualifier is NOT met on the six pages at
 * this cut's base. RESIDUALS I1-I6 stand unqualified at 01:23, 02:16, 03:10, 03:42, 03:48 and SKILL:24. The cure rewords
 * or qualifies those lines. That edit belongs to the EAT-R468 docs reconciliation (wb-2xan): a SKILL.md edit waits for the
 * census repair EAT-R468 criterion 6 puts first, and test/workbench-mwi-docs-remediation-census.test.ts pins its 50 rows'
 * wordings at their lines on these pages. A cut that cures a row removes it from RESIDUALS in the same cut; R432-D5 stays
 * red until it does.
 * RESIDUAL ESCAPES (named families; pinned quiet rows R432-D7): fold() reads source text, not the rendered view, so a
 * forbidden word split by inline HTML (HTML-SPLIT) or by inline link or reference link syntax (LINK-SPLIT) is no finding.
 *
 * NOT CLAIMED (scope sentences, no residual semantics):
 * - Criterion 1's payload leg (containment: "trusted-host" on every launch and observation payload) is NOT CLAIMED by this
 *   census. At the base no function launch or observation payload exists for it to read: workflow_execute refuses every
 *   non-script definition kind with unsupported-definition-kind (src/workbench/execute-tool.ts:218).
 * - EAT-R432 criteria 2 and 3 are NOT CLAIMED by this census.
 * - Every page outside PAGES is NOT CLAIMED by this census: README.md, AGENTS.md, the docs/workbench top-level pages
 *   (feature-matrix.md W11 among them), docs/workbench/receipts/, and the program directories that exist only on master.
 * - Word forms outside the three WORDS patterns (isolation, isolate, contain, contains, containment) are NOT CLAIMED by
 *   this census.
 * - Whether a matched word describes the function writer is NOT CLAIMED by this census: the word rule counts every match.
 * - The cure of RESIDUAL UNQUALIFIED-ISOLATED is NOT CLAIMED by this census.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROGRAM = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04";
const SKILLS = ".agents/skills";
const FIXTURE = "test/fixtures/mii-writer-containment-requirement.json";
const MII = "docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements";
/** The master commit the requirement block and the matrix row were vendored from, and their pinned SHA-256 (LF-joined lines). */
const SOURCE_COMMIT = "a1870c0c17df60dae63fee78197048bebf2f6b09";
const REQUIREMENT_SHA256 = "5a94bd799ecb4654c84013c2104f3b736df8725d14cc900eb37c58241a308d85";
const MATRIX_SHA256 = "475a50ee05aa9d2bc5348c136c568e7296a81725dfd78efa0310d447d319ba24";

const PAGES = {
  "01": `${PROGRAM}/01-audit-and-evidence.md`,
  "02": `${PROGRAM}/02-host-architecture-and-protocol.md`,
  "03": `${PROGRAM}/03-implementation-and-qa.md`,
  "04": `${PROGRAM}/04-agent-handoff.md`,
  README: `${PROGRAM}/README.md`,
  SKILL: `${SKILLS}/pi-mechanical-interop/SKILL.md`,
} as const;
type PageKey = keyof typeof PAGES;
const PAGE_KEYS: readonly PageKey[] = ["01", "02", "03", "04", "README", "SKILL"];

type Word = "sandbox" | "isolated" | "contained";
/** The words the EAT-R432 Statement forbids for the function writer, each with the pattern a folded sentence is searched with. */
const WORDS: ReadonlyArray<readonly [Word, RegExp]> = [
  ["sandbox", /sandbox/gi],
  ["isolated", /isolated/gi],
  ["contained", /contained/gi],
];
/** The qualifier criterion 1 allows beside isolated. */
const QUALIFIER = /not containment/i;
/** The named character references fold() decodes; any other named reference is an unread finding. */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", String.fromCodePoint(0xa0)],
  ["shy", String.fromCodePoint(0xad)],
  ["zwj", String.fromCodePoint(0x200d)],
  ["zwnj", String.fromCodePoint(0x200c)],
]);

function codePointText(digits: string, radix: number): string | undefined {
  const value = Number.parseInt(digits, radix);
  return Number.isInteger(value) && value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : undefined;
}

/** What the census reads of one source line (the header's THE READING). */
function fold(line: string): string {
  return line
    .replace(/&#(?:(\d{1,7})|[xX]([0-9a-fA-F]{1,6}));/g, (whole: string, decimal?: string, hex?: string) => {
      const decoded = decimal !== undefined ? codePointText(decimal, 10) : hex !== undefined ? codePointText(hex, 16) : undefined;
      return decoded ?? whole;
    })
    .replace(/&([A-Za-z][A-Za-z0-9]*);/g, (whole: string, name: string) => NAMED_REFERENCES.get(name) ?? whole)
    .normalize("NFKD")
    .replace(/\p{M}|\p{Cf}/gu, "")
    .replace(/[*_~`\\]/g, "")
    .replace(/(?<=\p{L})[-\u2010\u2011]+(?=\p{L})/gu, "");
}

const sentencesOf = (text: string): string[] =>
  text
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence !== "");

interface Finding {
  readonly page: PageKey;
  readonly line: number;
  readonly kind: Word | "unread";
  readonly detail: string;
}
const said = (finding: Finding): string => `${finding.page}:${finding.line} ${finding.kind}: ${finding.detail}`;
const named = (point: number): string => `U+${point.toString(16).toUpperCase().padStart(4, "0")}`;

/** Every finding of one page's text, in line order (the header's THE READING). */
function findingsOf(page: PageKey, text: string): Finding[] {
  const findings: Finding[] = [];
  for (const [index, raw] of text.split(/\r\n|\r|\n/).entries()) {
    const line = index + 1;
    const folded = fold(raw);
    for (const sentence of sentencesOf(folded)) {
      for (const [word, pattern] of WORDS) {
        if (word === "isolated" && QUALIFIER.test(sentence)) continue;
        const count = [...sentence.matchAll(pattern)].length;
        for (let match = 0; match < count; match += 1) findings.push({ page, line, kind: word, detail: sentence });
      }
    }
    for (const [letter] of folded.matchAll(/\p{L}/gu)) {
      const point = letter.codePointAt(0) ?? 0;
      if (point > 0x7f) findings.push({ page, line, kind: "unread", detail: `letter ${named(point)}` });
    }
    for (const [reference] of folded.matchAll(/&[A-Za-z][A-Za-z0-9]*;/g)) findings.push({ page, line, kind: "unread", detail: `reference ${reference}` });
  }
  return findings;
}

const pageText = (key: PageKey): string => readFileSync(join(ROOT, PAGES[key]), "utf8");
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

/** A page's text with the planted text as its new last line(s), and the line number the plant starts on. */
function plant(text: string, planted: string): { readonly text: string; readonly first: number } {
  const base = text.endsWith("\n") ? text : `${text}\n`;
  return { text: `${base}${planted}\n`, first: base.split(/\r\n|\r|\n/).length };
}

interface Residual {
  readonly id: string;
  readonly page: PageKey;
  readonly line: number;
  /** The folded sentence the unqualified isolated word stands in. */
  readonly sentence: string;
}
/** RESIDUAL UNQUALIFIED-ISOLATED: the isolated words standing unqualified on the six pages at the base (header). */
const RESIDUALS: readonly Residual[] = [
  { id: "I1", page: "01", line: 23, sentence: 'The Claude workflow host currently rejects isolation:"worktree"; providing a real isolated workspace is a separate work item.' },
  { id: "I2", page: "02", line: 16, sentence: "implement: Claude Agent SDK + isolated Git workspace + candidate commit" },
  {
    id: "I3",
    page: "03",
    line: 10,
    sentence:
      '| PI-3 | Both | First Pi \u2192 Mechanical develop witnessed inrepo (neither repository holds a receipt of any prior run; runs outside the repos were not checked) in clean isolated Git workspace using the existing trackedfile census path of developLive (discovery: "gittrackedfiles"), which this program labels gitcensus (no such selector ships at MW f7c0a943) | Native Claude session creates changed commit, Forge result agrees on commit/tree, Pi observes fourdomain outcome |',
  },
  { id: "I4", page: "03", line: 42, sentence: "Live acceptance: demonstrate a full run from the actual registered Pi tool, through the installed Mechanical tarball with one isolated source checkout and real producer APIs." },
  { id: "I5", page: "03", line: 48, sentence: "- Pi primary gate: forge build using existing forge.toml and forge run <named test or live tier> as applicable; isolated npm run check/targeted Vitest for iteration." },
  { id: "I6", page: "SKILL", line: 24, sentence: "For live implementation, use one clean isolated Git workspace and require actual changed commit/tree + matching native Forge evidence." },
];

const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const SOFT_HYPHEN = String.fromCodePoint(0xad);
const WORD_JOINER = String.fromCodePoint(0x2060);
const COMBINING_ACUTE = String.fromCodePoint(0x301);
const I_ACUTE = String.fromCodePoint(0xed);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
/** The word in full-width Latin letters (U+FF41 is "a" + 0xFEE0). */
const fullWidth = (word: string): string => [...word].map(letter => String.fromCodePoint((letter.codePointAt(0) ?? 0) + 0xfee0)).join("");

/** [name, spelling, the plain word fold() reads it as]. */
const FOLD_FORMS: ReadonlyArray<readonly [string, string, string]> = [
  ["zero-width space", `sand${ZERO_WIDTH_SPACE}box`, "sandbox"],
  ["soft hyphen", `iso${SOFT_HYPHEN}lated`, "isolated"],
  ["word joiner", `con${WORD_JOINER}tained`, "contained"],
  ["combining acute", `i${COMBINING_ACUTE}solated`, "isolated"],
  ["precomposed i acute", `${I_ACUTE}solated`, "isolated"],
  ["full-width letters", fullWidth("sandbox"), "sandbox"],
  ["decimal reference", "sand&#98;ox", "sandbox"],
  ["hexadecimal reference", "iso&#x6C;ated", "isolated"],
  ["named reference", "con&shy;tained", "contained"],
  ["emphasis", "sand*box*", "sandbox"],
  ["strong emphasis", "iso**lated**", "isolated"],
  ["underscore emphasis", "con_tain_ed", "contained"],
  ["strikethrough", "sand~~box~~", "sandbox"],
  ["code span", "iso`lat`ed", "isolated"],
  ["backslash", "sand\\box", "sandbox"],
  ["intraword hyphen", "iso-lated", "isolated"],
  ["non-breaking hyphen", `sand${NON_BREAKING_HYPHEN}box`, "sandbox"],
];

/** [name, the planted line, the word its one finding names]. */
const SANDBOX_PLANTS: ReadonlyArray<readonly [string, string, Word]> = [
  ["sandbox", "The writer runs in a sandbox.", "sandbox"],
  ["sandboxed", "A sandboxed writer edits the worktree.", "sandbox"],
  ["Sandboxing", "Sandboxing keeps the writer in.", "sandbox"],
  ["contained", "The writer is contained.", "contained"],
  ["sandbox, zero-width space", `The writer runs in a sand${ZERO_WIDTH_SPACE}box.`, "sandbox"],
  ["sandbox, decimal reference", "The writer runs in a sand&#98;ox.", "sandbox"],
  ["sandbox, intraword hyphen", "The writer runs in a sand-box.", "sandbox"],
  ["contained, emphasis", "The writer is con*tain*ed.", "contained"],
  ["contained, full-width letters", `The writer is ${fullWidth("contained")}.`, "contained"],
];

interface IsolatedPlant {
  readonly name: string;
  /** The planted text; a line feed starts its second line. */
  readonly text: string;
  /** The folded sentences its findings name, each on the plant's first line. */
  readonly adds: readonly string[];
}
const ISOLATED_PLANTS: readonly IsolatedPlant[] = [
  { name: "unqualified", text: "The writer edits an isolated worktree.", adds: ["The writer edits an isolated worktree."] },
  { name: "qualified in its sentence", text: "The writer edits an isolated worktree (a dedicated clean Git worktree, not containment).", adds: [] },
  { name: "qualified with emphasis", text: "The writer edits an isolated worktree, **not** containment.", adds: [] },
  { name: "qualifier in the next sentence", text: "The writer edits an isolated worktree. That is not containment.", adds: ["The writer edits an isolated worktree."] },
  { name: "qualifier on the next line", text: "The writer edits an isolated worktree\nnot containment.", adds: ["The writer edits an isolated worktree"] },
  { name: "unqualified, soft hyphen", text: `The writer edits an iso${SOFT_HYPHEN}lated worktree.`, adds: ["The writer edits an isolated worktree."] },
  { name: "two in one sentence", text: "An isolated writer edits an isolated worktree.", adds: ["An isolated writer edits an isolated worktree.", "An isolated writer edits an isolated worktree."] },
];

/** [name, the planted line, its one unread finding]. */
const UNREAD_PLANTS: ReadonlyArray<readonly [string, string, string]> = [
  ["Cyrillic o", `The writer edits an is${String.fromCodePoint(0x43e)}lated worktree.`, "letter U+043E"],
  ["Greek omicron", `The writer runs in a sandb${String.fromCodePoint(0x3bf)}x.`, "letter U+03BF"],
  ["Latin o with stroke", `The writer is c${String.fromCodePoint(0xf8)}ntained.`, "letter U+00F8"],
  ["named reference outside the table", "The writer runs in a sand&ZeroWidthSpace;box.", "reference &ZeroWidthSpace;"],
];

/** [family, the planted line]: RESIDUAL ESCAPES, read as no finding (header). */
const RESIDUAL_ESCAPES: ReadonlyArray<readonly [string, string]> = [
  ["HTML-SPLIT", "The writer edits an iso<b></b>lated worktree."],
  ["LINK-SPLIT", "The writer edits an [iso](https://example.invalid/w)lated worktree."],
  ["LINK-SPLIT", "The writer runs in a [sand][b]box."],
];

interface VendoredBlock {
  readonly id: string;
  readonly path: string;
  readonly blob: string;
  readonly fileSha256: string;
  readonly lines: string;
  readonly sha256: string;
  readonly text: readonly string[];
}
interface Vendored {
  readonly bead: string;
  readonly branch: string;
  readonly commit: string;
  readonly requirement: VendoredBlock;
  readonly matrix: VendoredBlock;
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isStrings = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(entry => typeof entry === "string");

function blockOf(value: unknown, what: string): VendoredBlock {
  if (!isRecord(value)) throw new Error(`${what}: not an object`);
  const { id, path, blob, fileSha256, lines, sha256: digest, text } = value;
  if (typeof id !== "string" || typeof path !== "string" || typeof blob !== "string" || typeof fileSha256 !== "string") throw new Error(`${what}: a field is not a string`);
  if (typeof lines !== "string" || typeof digest !== "string" || !isStrings(text)) throw new Error(`${what}: lines, sha256 or text is malformed`);
  return { id, path, blob, fileSha256, lines, sha256: digest, text };
}

function vendored(): Vendored {
  const parsed: unknown = JSON.parse(readFileSync(join(ROOT, FIXTURE), "utf8"));
  if (!isRecord(parsed) || !isRecord(parsed.source)) throw new Error(`${FIXTURE}: not a vendored requirement`);
  const { bead } = parsed;
  const { branch, commit } = parsed.source;
  if (typeof bead !== "string" || typeof branch !== "string" || typeof commit !== "string") throw new Error(`${FIXTURE}: bead or source is malformed`);
  return { bead, branch, commit, requirement: blockOf(parsed.requirement, "requirement"), matrix: blockOf(parsed.matrix, "matrix") };
}

describe("wb-ecl9 EAT-R432 criterion 1 docs leg (R432-D1..R432-D8): the six function-route pages hold no sandbox or contained word and no unread form, their isolated words are exactly the six RESIDUALS rows, and each planted forbidden word adds exactly its finding", () => {
  it("R432-D1 the reading: the PAGES paths are the five Markdown pages of the program directory and SKILL.md of each skill whose name holds 'mechanical', every one tracked by git and none empty", () => {
    const program = readdirSync(join(ROOT, PROGRAM))
      .filter(name => name.endsWith(".md"))
      .map(name => `${PROGRAM}/${name}`);
    const skills = readdirSync(join(ROOT, SKILLS))
      .filter(name => name.includes("mechanical"))
      .map(name => `${SKILLS}/${name}/SKILL.md`);
    const paths = PAGE_KEYS.map(key => PAGES[key]);
    expect([...paths].sort()).toEqual([...program, ...skills].sort());
    const tracked = execFileSync("git", ["ls-files", "--", ...paths], { cwd: ROOT, encoding: "utf8" })
      .split("\n")
      .filter(line => line !== "");
    expect(tracked.sort()).toEqual([...paths].sort());
    for (const key of PAGE_KEYS) expect(pageText(key).trim(), key).not.toBe("");
  });

  it("R432-D2 the requirement anchor: the vendored EAT-R432 block and Matrix B row hash to their pinned SHA-256, the Statement's forbidden words equal WORDS, and criterion 1's qualifier equals QUALIFIER", () => {
    const fixture = vendored();
    expect([fixture.bead, fixture.branch, fixture.commit]).toEqual(["wb-ecl9", "master", SOURCE_COMMIT]);
    expect([fixture.requirement.id, fixture.requirement.path, fixture.requirement.lines]).toEqual(["EAT-R432", `${MII}/ATOMIC-REQUIREMENTS.md`, "1056-1078"]);
    expect([fixture.matrix.id, fixture.matrix.path, fixture.matrix.lines]).toEqual(["EAT-R432", `${MII}/TDD-MATRIX.md`, "196"]);
    expect([sha256(fixture.requirement.text.join("\n")), fixture.requirement.sha256]).toEqual([REQUIREMENT_SHA256, REQUIREMENT_SHA256]);
    expect([sha256(fixture.matrix.text.join("\n")), fixture.matrix.sha256]).toEqual([MATRIX_SHA256, MATRIX_SHA256]);
    expect(fixture.requirement.text[0]?.startsWith("## EAT-R432 ")).toBe(true);
    expect(fixture.matrix.text.length).toBe(1);
    expect(fixture.matrix.text[0]?.startsWith("| EAT-R432 | V0,V3 |")).toBe(true);
    expect(fixture.matrix.text[0]?.includes("docs census leg runnable today; payload leg waits for P05")).toBe(true);
    const statement = fixture.requirement.text.find(line => line.startsWith("- Statement: ")) ?? "";
    const forbidden = /MUST NOT use the words (.+?) for behaviour/.exec(statement)?.[1] ?? "";
    expect([...forbidden.matchAll(/`([^`]+)`/g)].map(match => match[1])).toEqual(WORDS.map(([word]) => word));
    const criterion = fixture.requirement.text.find(line => line.startsWith("  1. ")) ?? "";
    expect(/with an explicit "([^"]+)" qualifier/.exec(criterion)?.[1]).toBe(QUALIFIER.source);
    expect([...criterion.matchAll(/`(sandbox[a-z]*)`/g)].map(match => match[1])).toEqual(["sandbox", "sandboxed"]);
  });

  it("R432-D3 the fold: each FOLD_FORMS spelling folds to its plain word", () => {
    for (const [name, spelling, word] of FOLD_FORMS) expect(fold(spelling), name).toBe(word);
    expect(FOLD_FORMS.filter(([, spelling, word]) => spelling === word)).toEqual([]);
  });

  it("R432-D4 sandbox and contained: no page holds a sandbox or contained finding, and each SANDBOX_PLANTS line added as a new last line to any page adds exactly its one finding", () => {
    let planted = 0;
    for (const key of PAGE_KEYS) {
      const text = pageText(key);
      const base = findingsOf(key, text);
      expect(base.filter(finding => finding.kind === "sandbox" || finding.kind === "contained").map(said), key).toEqual([]);
      for (const [name, line, word] of SANDBOX_PLANTS) {
        const planting = plant(text, line);
        expect(findingsOf(key, planting.text).map(said), `${key} + ${name}`).toEqual([...base.map(said), `${key}:${planting.first} ${word}: ${fold(line)}`]);
        planted += 1;
      }
    }
    expect(planted).toBe(PAGE_KEYS.length * SANDBOX_PLANTS.length);
  });

  it("R432-D5 isolated: the isolated findings of the six pages are exactly RESIDUALS, and each ISOLATED_PLANTS text added to any page adds exactly the findings its row names", () => {
    const isolated = PAGE_KEYS.flatMap(key => findingsOf(key, pageText(key)).filter(finding => finding.kind === "isolated"));
    expect(isolated.map(said)).toEqual(RESIDUALS.map(row => `${row.page}:${row.line} isolated: ${row.sentence}`));
    let planted = 0;
    for (const key of PAGE_KEYS) {
      const text = pageText(key);
      const base = findingsOf(key, text).map(said);
      for (const { name, text: lines, adds } of ISOLATED_PLANTS) {
        const planting = plant(text, lines);
        expect(findingsOf(key, planting.text).map(said), `${key} + ${name}`).toEqual([...base, ...adds.map(sentence => `${key}:${planting.first} isolated: ${sentence}`)]);
        planted += 1;
      }
    }
    expect(planted).toBe(PAGE_KEYS.length * ISOLATED_PLANTS.length);
  });

  it("R432-D6 unread forms fail closed: no page holds an unread finding, and each UNREAD_PLANTS line added to any page adds exactly its one unread finding and no word finding", () => {
    let planted = 0;
    for (const key of PAGE_KEYS) {
      const text = pageText(key);
      const base = findingsOf(key, text);
      expect(base.filter(finding => finding.kind === "unread").map(said), key).toEqual([]);
      for (const [name, line, detail] of UNREAD_PLANTS) {
        const planting = plant(text, line);
        expect(findingsOf(key, planting.text).map(said), `${key} + ${name}`).toEqual([...base.map(said), `${key}:${planting.first} unread: ${detail}`]);
        planted += 1;
      }
    }
    expect(planted).toBe(PAGE_KEYS.length * UNREAD_PLANTS.length);
  });

  it("R432-D7 the escape residuals' quiet rows: each RESIDUAL_ESCAPES line (HTML-SPLIT, LINK-SPLIT) added to any page adds no finding", () => {
    let planted = 0;
    for (const key of PAGE_KEYS) {
      const text = pageText(key);
      const base = findingsOf(key, text).map(said);
      for (const [family, line] of RESIDUAL_ESCAPES) {
        expect(findingsOf(key, plant(text, line).text).map(said), `${key} + ${family}`).toEqual(base);
        planted += 1;
      }
    }
    expect(planted).toBe(PAGE_KEYS.length * RESIDUAL_ESCAPES.length);
  });

  it("R432-D8 frozen shape (standing rule 16): PAGES, WORDS, QUALIFIER, NAMED_REFERENCES, the anchor pins, the plant and fold tables by name, and every RESIDUALS row by id, page, line and sentence digest", () => {
    expect(Object.entries(PAGES).map(([key, path]) => `${key}=${path}`)).toEqual([
      "01=docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md",
      "02=docs/workbench/programs/mechanical-workflows-interop-2026-11-04/02-host-architecture-and-protocol.md",
      "03=docs/workbench/programs/mechanical-workflows-interop-2026-11-04/03-implementation-and-qa.md",
      "04=docs/workbench/programs/mechanical-workflows-interop-2026-11-04/04-agent-handoff.md",
      "README=docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md",
      "SKILL=.agents/skills/pi-mechanical-interop/SKILL.md",
    ]);
    expect(PAGE_KEYS).toEqual(["01", "02", "03", "04", "README", "SKILL"]);
    expect(WORDS.map(([word, pattern]) => `${word}=/${pattern.source}/${pattern.flags}`)).toEqual(["sandbox=/sandbox/gi", "isolated=/isolated/gi", "contained=/contained/gi"]);
    expect(`/${QUALIFIER.source}/${QUALIFIER.flags}`).toBe("/not containment/i");
    expect([...NAMED_REFERENCES.keys()]).toEqual(["amp", "lt", "gt", "quot", "apos", "nbsp", "shy", "zwj", "zwnj"]);
    expect([SOURCE_COMMIT, REQUIREMENT_SHA256.slice(0, 16), MATRIX_SHA256.slice(0, 16)]).toEqual(["a1870c0c17df60dae63fee78197048bebf2f6b09", "5a94bd799ecb4654", "475a50ee05aa9d2b"]);
    expect(FOLD_FORMS.map(([name]) => name)).toEqual([
      "zero-width space",
      "soft hyphen",
      "word joiner",
      "combining acute",
      "precomposed i acute",
      "full-width letters",
      "decimal reference",
      "hexadecimal reference",
      "named reference",
      "emphasis",
      "strong emphasis",
      "underscore emphasis",
      "strikethrough",
      "code span",
      "backslash",
      "intraword hyphen",
      "non-breaking hyphen",
    ]);
    expect(SANDBOX_PLANTS.map(([name, , word]) => `${name}:${word}`)).toEqual([
      "sandbox:sandbox",
      "sandboxed:sandbox",
      "Sandboxing:sandbox",
      "contained:contained",
      "sandbox, zero-width space:sandbox",
      "sandbox, decimal reference:sandbox",
      "sandbox, intraword hyphen:sandbox",
      "contained, emphasis:contained",
      "contained, full-width letters:contained",
    ]);
    expect(ISOLATED_PLANTS.map(({ name, adds }) => `${name}:${adds.length}`)).toEqual([
      "unqualified:1",
      "qualified in its sentence:0",
      "qualified with emphasis:0",
      "qualifier in the next sentence:1",
      "qualifier on the next line:1",
      "unqualified, soft hyphen:1",
      "two in one sentence:2",
    ]);
    expect(UNREAD_PLANTS.map(([name, , detail]) => `${name}:${detail}`)).toEqual([
      "Cyrillic o:letter U+043E",
      "Greek omicron:letter U+03BF",
      "Latin o with stroke:letter U+00F8",
      "named reference outside the table:reference &ZeroWidthSpace;",
    ]);
    expect(RESIDUAL_ESCAPES.map(([family]) => family)).toEqual(["HTML-SPLIT", "LINK-SPLIT", "LINK-SPLIT"]);
    expect(RESIDUALS.map(row => `${row.id}|${row.page}:${row.line}|${sha256(row.sentence).slice(0, 16)}`)).toEqual([
      "I1|01:23|6bd452e36de1fab0",
      "I2|02:16|d7203c2206900ffd",
      "I3|03:10|532d0605a7e3aaa8",
      "I4|03:42|80cbba4972b1e7a6",
      "I5|03:48|3cabf6c19a5ee74f",
      "I6|SKILL:24|77ff8cdd2cf53e0c",
    ]);
  });
});
