/**
 * wb-8py9: the seat-side receipt lint (qa/workbench/receipt-lint.mjs) and the forge.toml [build.commands.census-file]
 * command that runs it (qa/workbench/census-file.mjs). Spec lines pinned, quoted from the bead:
 *   (1) "a seat-side RECEIPT LINT that, given the cut worktree, extracts every quantitative claim from the delivery's
 *       added/modified receipt and census files (counts, line numbers, row totals, sha-named figures) and RE-MEASURES each
 *       against the tree, refusing the delivery locally on any mismatch";
 *   (2) "[build.commands.census-file] in forge.toml wiring the lint so claimCheck stops being a no-op";
 *   (3) "a fixture cut with one false figure refuses with the exact claim + measured value named; a true-figure cut passes;
 *       parse-aware extraction (never bare regex over rendered markdown - HTML-comment-hidden text must not satisfy a
 *       claim, per the wb-dc0/wb-9x5 probe class)".
 *
 * THE PINNED READER SET is the cases of this file, each named once below; each case title names the forms it pins. A
 * J-number in a title is the gate's judge mutant of record that the case turns red (refusal #1 of wb-8py9, J01-J25),
 * and F1 is the gate's head-misattribution witness.
 * - The delivery path, on fixture cuts in scratch git repositories (test/helpers/scratch.ts): RL1 refuses one false
 *   figure in an added receipt naming the claim, its figure and the measured value; RL2 passes the true figure; RL3
 *   measures a figure at the revision it names, else at the working tree; RL5 reads a resolving all-decimal short sha as
 *   a revision; RL4 judges a modified receipt on its added lines only; RL6 places an appended figure on its own line (F1).
 * - The judged text, in memory (judgeText over a fixed tree): the rendered view in RV1 RV2 RV3 RV4 RV5 RV6, the claim
 *   kinds in RK1 RK2 RK3 RK4 RK5 RK6 RK7 RK8, and the THE CLAIMS section of the lint header, alternative by alternative,
 *   in RG1 RG2 RG3 RG4 RG5 RG6 RG7.
 * - Refusal M:75230 replayed on this repository's history: RH1 refuses the refused wb-bau receipt line 31 and RH2 holds
 *   its landed cure, both measured at ce180d82.
 * - The command and its readers: CF1 the forge.toml block; CF2 its argument, partition and argv units; CF3 both CLIs'
 *   exit codes; CF4 census-file's vitest half through a fake vitest binary; RR1 the landed readers of a delivery; RR2
 *   the untracked and census-tier files that are no readers; RT1 this header naming each registered case once.
 *
 * NOT CLAIMED. The merge-base default of the delivery's base and receipt changes committed after the base are NOT
 * CLAIMED by this census (its fixture cuts lint against HEAD). A claim whose sentence starts on a landed line and ends on
 * an added one is NOT CLAIMED by this census, nor is the line placement of a claim whose path or figure occurs more often
 * in its block's source than in the rendered block (a path repeated in a link destination). Spread elements, duplicate
 * declarations and wrapped array literals are NOT CLAIMED by this census. The vitest half's own output and census-file's
 * report lines are NOT CLAIMED by this census. Wall time is NOT CLAIMED by this census: every case runs under an explicit
 * timeout, and each case's scratch is removed after it under an explicit hook timeout (refusal #1 U1).
 */
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, chmodSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { main as censusFile, partitionFiles, VITEST_FLAGS, vitestArgv } from "../qa/workbench/census-file.mjs";
import { formatFinding, isJudged, judgeText, landedReaders, lineCount, lintDelivery, markdownClaims, measure, parseArgs, treeOf } from "../qa/workbench/receipt-lint.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = fileURLToPath(new URL("..", import.meta.url));
const LINT = join(REPO, "qa/workbench/receipt-lint.mjs");
const CENSUS_FILE = join(REPO, "qa/workbench/census-file.mjs");
const RECEIPT = "docs/workbench/receipts/wb-fixture.md";
const CORPUS = "test/corpus.test.ts";
const CORPUS_TEXT = 'export const SITES = [\n  { site: "a" },\n  { site: "b" },\n  { site: "c" },\n];\n';
const CORPUS_FILES: Readonly<Record<string, string>> = { [CORPUS]: CORPUS_TEXT };
/**
 * Every case's bound. The git, spawn and module work of a case runs under the host's load, so no case is left to vitest's
 * 5 s default (refusal #1 U1 measured one case at 61906 ms under load).
 */
const CASE_TIMEOUT_MS = 180_000;
/** The cleanup hooks' bound: removing scratch git repositories outlasted vitest's 10 s hook default (U1: 15 of 31 runs). */
const HOOK_TIMEOUT_MS = 120_000;
/** The wb-bau cut refused at M:75230 and the base both figures of its line 31 are measured at. */
const REFUSED_CUT = "28dbfe4d14b6d62cd7edb1b12005aa32452facfc";
const BAU_BASE = "ce180d82";

const scratches: string[] = [];
afterEach(() => {
  removeScratch(...scratches.splice(0));
}, HOOK_TIMEOUT_MS);
afterAll(() => {
  removeScratch(...scratches.splice(0));
}, HOOK_TIMEOUT_MS);

function git(dir: string, ...args: string[]): string {
  return execFileSync("git", ["-C", dir, "-c", "user.name=fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", ...args], { encoding: "utf8" }).trim();
}

function write(dir: string, path: string, text: string): void {
  mkdirSync(dirname(join(dir, path)), { recursive: true });
  writeFileSync(join(dir, path), text);
}

/** A scratch repository with the files committed; returns its root and the commit sha. */
function repo(files: Readonly<Record<string, string>>): { dir: string; sha: string } {
  const dir = makeScratch("wb-8py9-lint-");
  scratches.push(dir);
  git(dir, "init", "-q", "-b", "main");
  for (const [path, text] of Object.entries(files)) write(dir, path, text);
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", "base");
  return { dir, sha: git(dir, "rev-parse", "HEAD") };
}

/** A fixture receipt: its title, one entry heading, then the body from line 5. */
const receiptText = (body: string) => `# wb-fixture: fixture\n\n## 2026-11-12 cut\n\n${body}\n`;

/** A fixture cut: the corpus committed at base, the receipt added on top (untracked, as a seat leaves its cut). */
function cut(receipt: string | ((sha: string) => string)): { dir: string; sha: string } {
  const made = repo({ [CORPUS]: CORPUS_TEXT });
  write(made.dir, RECEIPT, receiptText(typeof receipt === "string" ? receipt : receipt(made.sha)));
  return made;
}

type LintTree = Parameters<typeof judgeText>[2];

/** A fixed tree in memory: the working tree's files, and each commit's files by full sha (a 7+ hex prefix resolves). */
function memoryTree(files: Readonly<Record<string, string>>, commits: Readonly<Record<string, Readonly<Record<string, string>>>> = {}): LintTree {
  return {
    root: REPO,
    resolve: rev => (/^[0-9a-f]{7,40}$/.test(rev) ? (Object.keys(commits).find(sha => sha.startsWith(rev)) ?? null) : null),
    read: (path, sha) => (sha === null ? files[path] : commits[sha]?.[path]) ?? null,
  };
}

/** A fixture receipt body judged in memory against the corpus (or the given working-tree files). */
const judged = (body: string, files: Readonly<Record<string, string>> = CORPUS_FILES) => judgeText(receiptText(body), RECEIPT, memoryTree(files));

/** A census file judged in memory against itself, beside the corpus. */
const judgedCensus = (source: string, file = "test/x-census.test.ts") => judgeText(source, file, memoryTree({ ...CORPUS_FILES, [file]: source }));

/** The claims a fixture receipt body makes (extraction only, nothing measured). */
const claimsOf = (body: string) => markdownClaims(receiptText(body), RECEIPT);

/** A finding's measured figure without its provenance. @param found the finding */
const measuredFigure = (found: { measured: string }) => found.measured.split(" (")[0];

describe("wb-8py9 receipt lint: the delivery path, on fixture cuts (the wb-bau class)", { timeout: CASE_TIMEOUT_MS }, () => {
  it("RL1 a fixture cut whose added receipt states one false figure is refused naming the exact claim, its figure and the measured value", () => {
    const { dir, sha } = cut(base => `- \`${CORPUS}\` holds 4 SITES rows at ${base.slice(0, 8)}.`);
    const report = lintDelivery(dir);
    expect(report.files).toEqual([RECEIPT]);
    expect(report.findings).toHaveLength(1);
    const [found] = report.findings;
    expect(found).toMatchObject({ file: RECEIPT, line: 5, kind: "rows", claim: `${CORPUS} holds 4 SITES rows`, states: `4 SITES rows in ${CORPUS} at ${sha.slice(0, 8)}` });
    expect(found?.measured).toBe(`3 (the SITES array literal, lines 1 to 5, TypeScript AST of ${CORPUS} at ${sha.slice(0, 8)})`);
    expect(found === undefined ? "" : formatFinding(found)).toBe(`${RECEIPT}:5: [rows] "${CORPUS} holds 4 SITES rows" states 4 SITES rows in ${CORPUS} at ${sha.slice(0, 8)}; measured 3 (the SITES array literal, lines 1 to 5, TypeScript AST of ${CORPUS} at ${sha.slice(0, 8)})`);
  });

  it("RL2 the same cut with the true figure passes, and its one claim was judged", () => {
    const { dir, sha } = cut(base => `- \`${CORPUS}\` holds 3 SITES rows at ${base.slice(0, 8)}.`);
    const report = lintDelivery(dir);
    expect(report.claims.map(claim => [claim.kind, claim.count, claim.rev])).toEqual([["rows", 3, sha.slice(0, 8)]]);
    expect(report.findings).toEqual([]);
  });

  it("RL3 a figure named at a revision is measured at that revision; an unnamed one at the working tree; an unresolvable revision of a local file is refused", () => {
    const { dir, sha } = cut("placeholder");
    write(dir, CORPUS, 'export const SITES = [\n  { site: "a" },\n  { site: "b" },\n  { site: "c" },\n  { site: "d" },\n  { site: "e" },\n];\n');
    const at = sha.slice(0, 8);
    const judge = (line: string) => {
      write(dir, RECEIPT, receiptText(line));
      return lintDelivery(dir).findings.map(found => found.measured);
    };
    expect(judge(`\`${CORPUS}\` holds 3 SITES rows at ${at}.`)).toEqual([]);
    expect(judge(`\`${CORPUS}\` holds 5 SITES rows at ${at}.`)).toEqual([`3 (the SITES array literal, lines 1 to 5, TypeScript AST of ${CORPUS} at ${at})`]);
    expect(judge(`\`${CORPUS}\` holds 5 SITES rows.`)).toEqual([]);
    expect(judge(`\`${CORPUS}\` holds 3 SITES rows.`)).toEqual([`5 (the SITES array literal, lines 1 to 7, TypeScript AST of ${CORPUS} in the working tree)`]);
    expect(judge(`\`${CORPUS}\` holds 5 SITES rows at 12345678.`), "an all-decimal token that resolves to no commit is a figure").toEqual([]);
    expect(judge(`\`${CORPUS}\` holds 3 SITES rows at deadbeefcafe.`)).toEqual([`nothing: revision deadbeefcafe resolves to no single commit in this repository, which holds ${CORPUS}`]);
  });

  it("RL5 an all-decimal short sha is a revision when it resolves: forge.toml's 207 lines at the wb-e9rw trunk merge 85869265 re-measure there", () => {
    const tree = treeOf(REPO);
    expect(tree.resolve("85869265")).toBe("8586926550cb7246d69750ad22ccd5fb885b1c6a");
    const [held] = markdownClaims("- `forge.toml` (207 lines at 85869265).\n", RECEIPT);
    expect([held?.kind, held?.rev, held?.revDecimal]).toEqual(["lines", "85869265", true]);
    expect(held === undefined ? "no claim" : measure(held, tree)).toBeNull();
    const [wrong] = markdownClaims("- `forge.toml` (208 lines at 85869265).\n", RECEIPT);
    expect(wrong === undefined ? "no claim" : measure(wrong, tree)?.measured).toBe("207 lines (forge.toml at 85869265)");
  });

  it("RL4 a modified receipt is judged on its added lines only: a false figure in a landed entry is not judged, one appended in a new entry is", () => {
    const { dir } = cut(`- \`${CORPUS}\` holds 9 SITES rows.`);
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "landed receipt");
    appendFileSync(join(dir, RECEIPT), `\n## 2026-11-13 respin\n\n- \`${CORPUS}\` holds 3 SITES rows.\n`);
    const clean = lintDelivery(dir, { base: "HEAD" });
    expect(clean.claims.map(claim => [claim.line, claim.count])).toEqual([[9, 3]]);
    expect(clean.findings).toEqual([]);
    appendFileSync(join(dir, RECEIPT), `- \`${CORPUS}\` holds 8 SITES rows.\n`);
    expect(lintDelivery(dir, { base: "HEAD" }).findings.map(found => [found.line, found.claim])).toEqual([[10, `${CORPUS} holds 8 SITES rows`]]);
  });

  it("RL6 an appended figure is placed on its own source line (F1): continuing a landed paragraph or list item, or added as a list item or a table row, it is judged at that line while the landed figure beside it is not, and the receipt named whole is refused at that line only", () => {
    const head = "# wb-fixture: fixture\n\n## 2026-11-12 cut\n\n";
    const paragraph = "docs/workbench/receipts/wb-a-paragraph.md";
    const item = "docs/workbench/receipts/wb-b-item.md";
    const list = "docs/workbench/receipts/wb-c-list.md";
    const table = "docs/workbench/receipts/wb-d-table.md";
    const made = repo({
      [CORPUS]: CORPUS_TEXT,
      [paragraph]: `${head}The corpus \`${CORPUS}\` holds 3 SITES rows at the cut.\n`,
      [item]: `${head}- The corpus \`${CORPUS}\` holds 3 SITES rows at the cut.\n`,
      [list]: `${head}- \`${CORPUS}\` holds 3 SITES rows.\n`,
      [table]: `${head}| file | note |\n|---|---|\n| corpus | \`${CORPUS}\` holds 3 SITES rows |\n`,
    });
    appendFileSync(join(made.dir, paragraph), `Since then \`${CORPUS}\` holds 9 SITES rows.\n`);
    appendFileSync(join(made.dir, item), `  Since then \`${CORPUS}\` holds 9 SITES rows.\n`);
    appendFileSync(join(made.dir, list), `- \`${CORPUS}\` holds 9 SITES rows.\n`);
    appendFileSync(join(made.dir, table), `| again | \`${CORPUS}\` holds 9 SITES rows |\n`);
    const nine = `${CORPUS} holds 9 SITES rows`;
    expect(lintDelivery(made.dir, { base: "HEAD" }).findings.map(found => [found.file, found.line, found.claim])).toEqual([
      [paragraph, 6, nine],
      [item, 6, nine],
      [list, 6, nine],
      [table, 8, nine],
    ]);
    const whole = lintDelivery(made.dir, { base: "HEAD", files: [paragraph] });
    expect(whole.claims.filter(claim => claim.file === paragraph).map(claim => [claim.line, claim.count])).toEqual([
      [5, 3],
      [6, 9],
    ]);
    expect(whole.findings.filter(found => found.file === paragraph).map(found => found.line)).toEqual([6]);
  });
});

describe("wb-8py9 receipt lint: the rendered view (the wb-dc0 / wb-9x5 probe class), judged in memory", { timeout: CASE_TIMEOUT_MS }, () => {
  it("RV1 a figure inside an HTML comment is no claim, and a true figure hidden beside a false rendered one does not satisfy it", () => {
    expect(judged(`<!-- \`${CORPUS}\` holds 4 SITES rows. -->`)).toMatchObject({ claims: [], findings: [] });
    const beside = judged(`The corpus: \`${CORPUS}\` holds 4 SITES rows <!-- \`${CORPUS}\` holds 3 SITES rows --> today.`);
    expect(beside.claims.map(claim => [claim.kind, claim.count])).toEqual([["rows", 4]]);
    expect(beside.findings.map(measuredFigure)).toEqual(["3"]);
  });

  it("RV2 table rows hidden in an HTML comment do not count toward a heading's row total", () => {
    const table = "| site |\n|---|\n| a |\n| b |\n<!-- | c | -->\n";
    const raw = table.split("\n").filter(line => line.includes("|")).length - 2;
    expect(raw, "a raw line count reads the hidden row").toBe(3);
    expect(judged(`### Sites (3 rows)\n\n${table}`).findings.map(found => [found.kind, found.states, found.measured])).toEqual([
      ["table", "3 rows", "2 rendered rows in the heading's section (its tables' body rows, else its code listing's non-blank lines)"],
    ]);
    const true2 = judged(`### Sites (2 rows)\n\n${table}`);
    expect(true2.findings).toEqual([]);
    expect(true2.claims.map(claim => claim.kind)).toEqual(["table"]);
  });

  it("RV3 a claim that renders through a hidden span, a details block or a hidden span in a totalled heading is refused fail-closed; a placeholder tag with no judged figure is not", () => {
    expect(judged(`\`${CORPUS}\` holds <span hidden>4</span>3 SITES rows.`).findings.map(found => [found.kind, found.measured.startsWith("nothing: the claim renders through")])).toEqual([["html", true]]);
    expect(judged(`<details><summary>more</summary>\`${CORPUS}\` holds 3 SITES rows.</details>`).findings.map(found => found.kind)).toEqual(["html"]);
    expect(judged("Run `ritual.sh` with <step> set to the step name.")).toMatchObject({ claims: [], findings: [] });
    expect(judged("Run with <step> per `src/upstream/registry.py:12` today.")).toMatchObject({ claims: [], findings: [] });
    expect(judged("### Sites <span hidden>x</span> (1 rows)\n\n| site |\n|---|\n| a |").findings.map(found => found.kind)).toEqual(["html"]);
  });

  it("RV4 a backtick-fenced code block, double-tilde struck-through text and image alt text carry no claim; a decimal character reference and a fullwidth digit are read as the digit a reader sees", () => {
    for (const quiet of [`\`\`\`text\n${CORPUS} holds 4 SITES rows\n\`\`\``, `~~\`${CORPUS}\` holds 4 SITES rows~~`, `![${CORPUS} holds 4 SITES rows](sites.png)`]) {
      expect(judged(quiet), quiet).toMatchObject({ claims: [], findings: [] });
    }
    const fullwidth = String.fromCodePoint(0xff14);
    for (const read of [`\`${CORPUS}\` holds &#52; SITES rows.`, `\`${CORPUS}\` holds ${fullwidth} SITES rows.`]) {
      expect(
        judged(read).findings.map(found => [found.claim, measuredFigure(found)]),
        read,
      ).toEqual([[`${CORPUS} holds 4 SITES rows`, "3"]]);
    }
  });

  it("RV5 raw HTML fails closed when a tag without hidden carries the figure (J04: a bold, an emphasis or a plain span tag) and when a raw block sits in a totalled heading's section (J23b: a table or a div beside the markdown rows)", () => {
    for (const tag of ["b", "em", "span"]) {
      expect(judged(`\`${CORPUS}\` holds <${tag}>3</${tag}> SITES rows.`).findings.map(found => found.kind), tag).toEqual(["html"]);
    }
    for (const block of ["<table><tr><td>c</td></tr></table>", "<div>c</div>"]) {
      expect(
        judged(`### Sites (2 rows)\n\n| site |\n|---|\n| a |\n| b |\n\n${block}`).findings.map(found => [found.kind, found.measured.startsWith("nothing: raw HTML sits in the heading's section")]),
        block,
      ).toEqual([["table", true]]);
    }
  });

  it("RV6 an indented code block (J01) and a tilde-fenced one carry no claim, single-tilde struck-through text carries none (J02), and a hexadecimal character reference in either letter case is read as its digit (J03)", () => {
    for (const quiet of [`Listing:\n\n    ${CORPUS} holds 4 SITES rows`, `~~~text\n${CORPUS} holds 4 SITES rows\n~~~`, `~\`${CORPUS}\` holds 4 SITES rows~`]) {
      expect(judged(quiet), quiet).toMatchObject({ claims: [], findings: [] });
    }
    for (const read of [`\`${CORPUS}\` holds &#x34; SITES rows.`, `\`${CORPUS}\` holds &#X34; SITES rows.`]) {
      expect(
        judged(read).findings.map(found => [found.claim, measuredFigure(found)]),
        read,
      ).toEqual([[`${CORPUS} holds 4 SITES rows`, "3"]]);
    }
  });
});

describe("wb-8py9 receipt lint: claim kinds, judged in memory", { timeout: CASE_TIMEOUT_MS }, () => {
  it("RK1 an array claim's span is judged: the right element count and span hold, and a wrong span is refused naming the stated and the measured lines", () => {
    const right = judged(`\`${CORPUS}\` is the corpus: 3 elements in the SITES array literal (lines 1 to 5).`);
    expect(right.findings).toEqual([]);
    expect(right.claims.map(claim => [claim.kind, claim.path, claim.span])).toEqual([["array", CORPUS, [1, 5]]]);
    const wrong = judged(`\`${CORPUS}\` is the corpus: 3 elements in the SITES array literal (lines 2 to 6).`);
    expect(wrong.findings.map(found => [found.states, measuredFigure(found)])).toEqual([["lines 2 to 6 for the SITES array literal", "lines 1 to 5"]]);
  });

  it("RK2 a line-count claim is re-measured against the file", () => {
    expect(judged(`What landed: \`${CORPUS}\` (5 lines).`).findings).toEqual([]);
    expect(judged(`What landed: \`${CORPUS}\` (6 lines).`).findings.map(found => found.measured)).toEqual([`5 lines (${CORPUS} in the working tree)`]);
  });

  it("RK3 a single-line citation past the end of a local file is refused; a path absent here or a revision of another repository is an external citation, not judged", () => {
    expect(judged(`See \`${CORPUS}:5\` and \`${CORPUS}:2-4\`.`).findings).toEqual([]);
    expect(judged(`See \`${CORPUS}:9\`.`).findings.map(found => found.measured)).toEqual([`${CORPUS} in the working tree has 5 lines`]);
    expect(judged(`See \`src/upstream/registry.py:794-895\` and \`${CORPUS}:9\` at 6a251bf73af5.`)).toMatchObject({ claims: [], findings: [] });
  });

  it("RK4 a census file's it() title is judged against the array it declares; a comment's delta count (adds) and a data literal are not claims", () => {
    const census = "test/x-census.test.ts";
    const source = (title: string) =>
      [
        'import { expect, it } from "vitest";',
        "// the cut adds 1 ROWS rows to the table below",
        'const ROWS = [{ id: "C1" }, { id: "C2" }];',
        `const DATA = ["${CORPUS}:999"];`,
        `it("${title}", () => expect([ROWS.length, DATA.length]).toEqual([2, 1]));`,
        "",
      ].join("\n");
    expect(judgedCensus(source("C0 the 3 ROWS rows each carry an id"), census).findings.map(found => [found.file, found.line, found.claim, measuredFigure(found)])).toEqual([[census, 5, "3 ROWS rows", "2"]]);
    const holds = judgedCensus(source("C0 the 2 ROWS rows each carry an id"), census);
    expect(holds.findings).toEqual([]);
    expect(holds.claims.map(claim => [claim.kind, claim.text])).toEqual([["rows", "2 ROWS rows"]]);
  });

  it("RK5 an array claim with a wrong element count is refused naming the measured count, with its span stated or not (J05)", () => {
    for (const body of [`\`${CORPUS}\` is the corpus: 4 elements in the SITES array literal (lines 1 to 5).`, `\`${CORPUS}\` is the corpus: 4 elements in the SITES array literal.`]) {
      expect(
        judged(body).findings.map(found => [found.kind, found.states, measuredFigure(found)]),
        body,
      ).toEqual([["array", `4 elements in the SITES array literal of ${CORPUS}`, "3"]]);
    }
  });

  it("RK6 a line count counts a final line that has no line feed (J25): three such lines hold a stated 3 and refuse a stated 2", () => {
    expect([lineCount("a\nb\nc"), lineCount("a\nb\nc\n"), lineCount("")]).toEqual([3, 3, 0]);
    const files = { ...CORPUS_FILES, "test/plain.txt": "a\nb\nc" };
    expect(judged("What landed: `test/plain.txt` (3 lines).", files).findings).toEqual([]);
    expect(judged("What landed: `test/plain.txt` (2 lines).", files).findings.map(found => found.measured)).toEqual(["3 lines (test/plain.txt in the working tree)"]);
  });

  it("RK7 a range citation is refused when its end is past the end of the file (J06) or it is inverted, and holds when it ends on the last line", () => {
    expect(judged(`See \`${CORPUS}:2-5\`.`).findings).toEqual([]);
    expect(judged(`See \`${CORPUS}:2-9\`.`).findings.map(found => found.measured)).toEqual([`${CORPUS} in the working tree has 5 lines`]);
    expect(judged(`See \`${CORPUS}:4-2\`.`).findings.map(found => found.measured)).toEqual(["an inverted line range 4-2"]);
  });

  it("RK8 a census file's comment is judged (J07), so are describe, test, suite and chained it.each titles (J09), and a count after any of the lint's delta words is no claim (J08)", () => {
    const rows = 'const ROWS = [{ id: "C1" }, { id: "C2" }];';
    expect(judgedCensus(`// the 3 ROWS rows each carry an id\n${rows}\n`).findings.map(found => [found.line, found.claim, measuredFigure(found)])).toEqual([[1, "3 ROWS rows", "2"]]);
    for (const title of ['describe("the 3 ROWS rows each carry an id", () => {});', 'test("the 3 ROWS rows each carry an id", () => {});', 'suite("the 3 ROWS rows each carry an id", () => {});', 'it.each([1])("the 3 ROWS rows each carry an id", () => {});']) {
      expect(
        judgedCensus(`${rows}\n${title}\n`).findings.map(found => [found.line, found.claim]),
        title,
      ).toEqual([[2, "3 ROWS rows"]]);
    }
    const deltas = ["adds", "added", "adding", "removes", "removed", "drops", "dropped", "gains", "gained", "loses", "lost", "deletes", "deleted", "moves", "moved", "extra", "new", "more", "fewer", "other", "another", "first", "last", "next"];
    const comments = deltas.map(word => `// the cut ${word} 1 ROWS rows`).join("\n");
    expect(judgedCensus(`${comments}\n// the 2 ROWS rows\n${rows}\n`).claims.map(claim => claim.line)).toEqual([deltas.length + 1]);
  });
});

describe("wb-8py9 receipt lint: the lint header's THE CLAIMS grammar, alternative by alternative, judged in memory", { timeout: CASE_TIMEOUT_MS }, () => {
  const rowsOf = (body: string) =>
    claimsOf(body)
      .filter(claim => claim.kind === "rows")
      .map(claim => [claim.ident, claim.count, claim.path]);

  it("RG1 a rows claim is read after each listed verb (holds, has, carries, contains, keeps: J14) and with each listed noun (rows, entries, elements, members: J15), and not after an unlisted verb", () => {
    for (const verb of ["holds", "has", "carries", "contains", "keeps"]) {
      expect(rowsOf(`\`${CORPUS}\` ${verb} 4 SITES rows.`), verb).toEqual([["SITES", 4, CORPUS]]);
    }
    for (const noun of ["rows", "entries", "elements", "members"]) {
      expect(rowsOf(`\`${CORPUS}\` holds 4 SITES ${noun}.`), noun).toEqual([["SITES", 4, CORPUS]]);
    }
    expect(rowsOf(`\`${CORPUS}\` lists 4 SITES rows.`)).toEqual([]);
  });

  it("RG2 a claim's revision is the first at or on, bare or qualified by trunk, base, tip, commit, main or origin (J16), before 7 to 40 hex digits in its own sentence (J21); a lettered token wins over an all-decimal one, 40 decimal digits are a revision, and 6 or 41 digits are none", () => {
    const revOf = (tail: string) => claimsOf(`\`${CORPUS}\` holds 3 SITES rows ${tail}.`).map(claim => [claim.rev, claim.revDecimal ?? false]);
    expect(revOf("at abcdef1")).toEqual([["abcdef1", false]]);
    expect(revOf("on abcdef1")).toEqual([["abcdef1", false]]);
    for (const qualifier of ["trunk", "base", "tip", "commit", "main", "origin"]) {
      expect(revOf(`at ${qualifier} abcdef1`), qualifier).toEqual([["abcdef1", false]]);
    }
    expect(revOf("at abcdef1 and on 1234abc")).toEqual([["abcdef1", false]]);
    expect(revOf("at 12345678 and on abcdef1")).toEqual([["abcdef1", false]]);
    expect(revOf("at 12345678")).toEqual([["12345678", true]]);
    expect(revOf(`at ${"1".repeat(40)}`)).toEqual([["1".repeat(40), false]]);
    expect(revOf("at abcdef")).toEqual([[null, false]]);
    expect(revOf(`at ${"a".repeat(41)}`)).toEqual([[null, false]]);
    expect(claimsOf(`\`${CORPUS}\` holds 3 SITES rows. Its first cut was at abcdef1 with fewer.`).map(claim => claim.rev)).toEqual([null]);
  });

  it("RG3 a rows claim's continuations, plus and and (J17), are read in its own sentence against its path, and no claim is read across two sentences or two blocks", () => {
    const files = { [CORPUS]: `${CORPUS_TEXT}export const OTHER = [1, 2];\n` };
    for (const word of ["plus", "and"]) {
      expect(
        judged(`\`${CORPUS}\` holds 3 SITES rows ${word} 5 OTHER rows.`, files).findings.map(found => [found.claim, found.states]),
        word,
      ).toEqual([[`${CORPUS} holds 3 SITES rows ${word} 5 OTHER rows`, `5 OTHER rows in ${CORPUS}`]]);
    }
    expect(claimsOf(`\`${CORPUS}\` holds 3 SITES rows. Later, plus 5 OTHER rows.`).map(claim => claim.ident)).toEqual(["SITES"]);
    expect(claimsOf(`\`${CORPUS}\` holds\n\n4 SITES rows.`)).toEqual([]);
  });

  it("RG4 an array claim is read with or without the word elements and with each span form (lines or line, then to, through, a hyphen or an en dash: J19), against the last path and revision named before it in its block", () => {
    const dash = String.fromCodePoint(0x2013);
    expect(claimsOf(`\`${CORPUS}\` is the corpus: 3 in the SITES array literal.`).map(claim => [claim.kind, claim.count, claim.path])).toEqual([["array", 3, CORPUS]]);
    for (const span of ["lines 2 to 6", "lines 2 through 6", "lines 2-6", `lines 2${dash}6`, "line 2 to 6"]) {
      expect(judged(`\`${CORPUS}\` is the corpus: 3 elements in the SITES array literal (${span}).`).findings.map(found => found.states), span).toEqual(["lines 2 to 6 for the SITES array literal"]);
    }
    const bound = claimsOf(`\`src/a.ts\` and \`${CORPUS}\` at abcdef1 are the corpus. It has 3 elements in the SITES array literal.`).filter(claim => claim.kind === "array");
    expect(bound.map(claim => [claim.path, claim.rev])).toEqual([[CORPUS, "abcdef1"]]);
  });

  it("RG5 a heading total counts the rendered body rows of every table in its section, else the non-blank lines of its code listing (J23), else is refused, and its section ends at the next heading of its level", () => {
    expect(judged("### Sites (3 rows)\n\n| site |\n|---|\n| a |\n| b |\n\n| more |\n|---|\n| c |").findings).toEqual([]);
    expect(judged("### Files (2 rows)\n\n```\na\n\nb\n```").findings).toEqual([]);
    expect(judged("### Files (2 rows)\n\nNo rows here.").findings.map(found => found.measured)).toEqual(["no table and no listing in the heading's section"]);
    expect(judged("### Sites (1 rows)\n\n| site |\n|---|\n| a |\n\n### Next\n\n| site |\n|---|\n| b |").findings).toEqual([]);
  });

  it("RG6 a citation is read as a path and a line, or a range joined by a hyphen or an en dash, and judged against the file; a figure at a revision that resolves nowhere here, of a path absent here, is not judged", () => {
    const dash = String.fromCodePoint(0x2013);
    expect(claimsOf(`See \`${CORPUS}:3\`, \`${CORPUS}:2-4\` and \`${CORPUS}:2${dash}4\`.`).map(claim => [claim.kind, claim.cite])).toEqual([
      ["cite", [3, 3]],
      ["cite", [2, 4]],
      ["cite", [2, 4]],
    ]);
    expect(judged(`See \`${CORPUS}:2${dash}9\`.`).findings.map(found => found.measured)).toEqual([`${CORPUS} in the working tree has 5 lines`]);
    expect(judged("`src/upstream/x.ts` holds 4 SITES rows at deadbeefcafe.")).toMatchObject({ claims: [], findings: [] });
  });

  it("RG7 a path is a file name under a directory with any extension, or a bare name with one of the lint's known extensions; run outcomes, sums, prose counts, mixed-case identifiers and a figure split by an invisible character are no claim", () => {
    for (const ext of ["ts", "mts", "cts", "tsx", "js", "mjs", "cjs", "jsx", "md", "json", "toml", "yaml", "yml", "txt", "sh", "py"]) {
      expect(claimsOf(`What landed: \`notes.${ext}\` (3 lines).`).map(claim => [claim.kind, claim.path]), ext).toEqual([["lines", `notes.${ext}`]]);
    }
    expect(claimsOf("What landed: `notes.xyz` (3 lines).")).toEqual([]);
    expect(claimsOf("What landed: `test/data.bin` (3 lines).").map(claim => claim.path)).toEqual(["test/data.bin"]);
    expect(claimsOf("What landed: `test/data` (3 lines).")).toEqual([]);
    const split = String.fromCodePoint(0x200b);
    for (const quiet of [`\`${CORPUS}\` holds 4 passed.`, `\`${CORPUS}\` holds 3 + 4 SITES rows.`, `\`${CORPUS}\` holds three SITES rows.`, `\`${CORPUS}\` holds 4 Sites rows.`, `\`${CORPUS}\` holds 4${split}4 SITES rows.`]) {
      expect(claimsOf(quiet), quiet).toEqual([]);
    }
  });
});

describe("wb-8py9 receipt lint: refusal M:75230 replayed on this repository's history", { timeout: CASE_TIMEOUT_MS }, () => {
  const tree = treeOf(REPO);
  const judge = (line: string) => markdownClaims(`${line}\n`, "docs/workbench/receipts/wb-bau.md").filter(claim => isJudged(claim, tree));

  it("RH1 the refused wb-bau receipt line 31 (cut 28dbfe4d) is refused: it states 44 SITES rows at ce180d82, where the AST measures 35", () => {
    const line = execFileSync("git", ["-C", REPO, "show", `${REFUSED_CUT}:docs/workbench/receipts/wb-bau.md`], { encoding: "utf8" }).split("\n")[30] ?? "";
    expect(line).toContain("holds 44 SITES rows at ce180d82");
    const claims = judge(line);
    expect(claims.map(claim => [claim.kind, claim.count, claim.ident, claim.rev])).toEqual([["rows", 44, "SITES", BAU_BASE]]);
    expect(claims.map(claim => measure(claim, tree)?.measured)).toEqual(["35 (the SITES array literal, lines 896 to 940, TypeScript AST of test/workbench-sanitizer-corpus.test.ts at ce180d82)"]);
  });

  it("RH2 the landed wb-bau receipt line 31 holds: its 35 SITES rows, 7 SCANNED_SITES rows and both array spans re-measure equal at ce180d82", () => {
    const line = readFileSync(join(REPO, "docs/workbench/receipts/wb-bau.md"), "utf8").split("\n")[30] ?? "";
    const claims = judge(line);
    expect(claims.map(claim => [claim.kind, claim.ident, claim.count, claim.span ?? null, claim.rev])).toEqual([
      ["rows", "SITES", 35, null, BAU_BASE],
      ["rows", "SCANNED_SITES", 7, null, BAU_BASE],
      ["array", "SITES", 35, [896, 940], BAU_BASE],
      ["array", "SCANNED_SITES", 7, [1453, 1461], BAU_BASE],
    ]);
    expect(claims.map(claim => measure(claim, tree))).toEqual([null, null, null, null]);
  });
});

describe("wb-8py9 census-file: the forge command and its readers", { timeout: CASE_TIMEOUT_MS }, () => {
  it("CF1 forge.toml declares [build.commands.census-file] running qa/workbench/census-file.mjs, its arguments appended (no {args} placeholder)", () => {
    const toml = readFileSync(join(REPO, "forge.toml"), "utf8");
    const block = /^\[build\.commands\.census-file\]\n((?:[a-z_]+ = .*\n)+)/m.exec(toml)?.[1] ?? "";
    expect(block.split("\n").filter(Boolean)).toEqual(['command = "node qa/workbench/census-file.mjs"', "timeout = 1200"]);
  });

  it("CF2 as units: parseArgs consumes the claim-check's trailing --json, partitionFiles splits named files into default-tier test files, census-tier files and others, and vitestArgv prefixes run, the worker cap and the assertion flag", () => {
    const args = parseArgs(["test/a.test.ts", "test/b.census.ts", "docs/workbench/receipts/wb-x.md", "--json"]);
    expect(args).toEqual({ json: true, readers: false, files: ["test/a.test.ts", "test/b.census.ts", "docs/workbench/receipts/wb-x.md"] });
    expect(partitionFiles(args.files)).toEqual({ vitest: ["test/a.test.ts"], censusTier: ["test/b.census.ts"], other: ["docs/workbench/receipts/wb-x.md"] });
    expect(vitestArgv(["test/a.test.ts"])).toEqual(["run", "--maxWorkers=8", "--expect.requireAssertions", "test/a.test.ts"]);
    expect(VITEST_FLAGS).not.toContain("--json");
  });

  it("CF3 both CLIs exit 1 naming the finding on a false figure, 0 when it holds, and 2 on an unknown option or a named file that does not exist", () => {
    const { dir } = cut(`- \`${CORPUS}\` holds 4 SITES rows.`);
    for (const script of [LINT, CENSUS_FILE]) {
      const refused = spawnSync(process.execPath, [script, "--json"], { cwd: dir, encoding: "utf8" });
      expect(refused.status, script).toBe(1);
      expect(refused.stderr, script).toContain(`${RECEIPT}:5: [rows] "${CORPUS} holds 4 SITES rows" states 4 SITES rows in ${CORPUS}; measured 3`);
      expect(JSON.parse(refused.stdout.split("\n")[0] ?? "{}"), script).toMatchObject({ claims: 1, findings: [{ kind: "rows", claim: `${CORPUS} holds 4 SITES rows` }] });
      expect(spawnSync(process.execPath, [script, "--bogus"], { cwd: dir, encoding: "utf8" }).status, script).toBe(2);
      const absent = spawnSync(process.execPath, [script, "test/missing.test.ts"], { cwd: dir, encoding: "utf8" });
      expect([absent.status, absent.stderr.includes("no such file: test/missing.test.ts")], script).toEqual([2, true]);
    }
    write(dir, RECEIPT, receiptText(`- \`${CORPUS}\` holds 3 SITES rows.`));
    for (const script of [LINT, CENSUS_FILE]) expect(spawnSync(process.execPath, [script], { cwd: dir, encoding: "utf8" }).status, script).toBe(0);
  });

  it("CF4 census-file's vitest half, through a fake vitest binary: the spawned argv is exactly run, the worker cap, the assertion flag and the named default-tier test files (J10); a census-tier file is linted, a false figure in it exiting 1, and never passed (J11); --readers appends the landed readers; a red vitest half exits 1 (J24)", () => {
    const made = repo({ "test/a.test.ts": "export {};\n", "test/b.census.ts": "export {};\n", "test/reads-receipts.test.ts": 'const DIR = "docs/workbench/receipts";\n' });
    write(made.dir, RECEIPT, receiptText("No figures here."));
    const argvFile = join(made.dir, "fake-vitest-argv.json");
    const exitFile = join(made.dir, "fake-vitest-exit.txt");
    const bin = join(made.dir, "node_modules/.bin/vitest");
    write(made.dir, "node_modules/.bin/vitest", `#!${process.execPath}\nimport("node:fs").then(fs => {\n  fs.writeFileSync(${JSON.stringify(argvFile)}, JSON.stringify(process.argv.slice(2)));\n  process.exit(Number(fs.readFileSync(${JSON.stringify(exitFile)}, "utf8")));\n});\n`);
    chmodSync(bin, 0o755);
    const run = (exit: number, ...args: string[]): [number, unknown] => {
      rmSync(argvFile, { force: true });
      writeFileSync(exitFile, String(exit));
      const status = censusFile(args, made.dir);
      return [status, JSON.parse(readFileSync(argvFile, "utf8"))];
    };
    const flags = ["run", "--maxWorkers=8", "--expect.requireAssertions"];
    expect(run(0, "test/a.test.ts", "test/b.census.ts")).toEqual([0, [...flags, "test/a.test.ts"]]);
    expect(run(1, "test/a.test.ts")).toEqual([1, [...flags, "test/a.test.ts"]]);
    expect(run(0, "--readers", "test/a.test.ts")).toEqual([0, [...flags, "test/a.test.ts", "test/reads-receipts.test.ts"]]);
    write(made.dir, "test/b.census.ts", 'const ROWS = [1, 2];\n// the 3 ROWS rows\nexport {};\n');
    expect(run(0, "test/a.test.ts", "test/b.census.ts")).toEqual([1, [...flags, "test/a.test.ts"]]);
  });

  it("RR1 the readers of a delivery are the landed default-tier test files naming a delivered path or, for a receipt, the receipts directory", () => {
    const census = "test/x-census.test.ts";
    const made = repo({
      "test/reads-receipts.test.ts": 'const DIR = "docs/workbench/receipts";\n',
      "test/reads-census.test.ts": `const FILE = "${census}";\n`,
      "test/unrelated.test.ts": 'const FILE = "src/index.ts";\n',
      "test/excluded.test.ts": 'const DIR = "docs/workbench/receipts";\n',
      "vitest.config.ts": 'export default { test: { exclude: ["test/excluded.test.ts"] } };\n',
      [census]: "export const ROWS = [];\n",
    });
    write(made.dir, RECEIPT, "# wb-fixture: fixture\n\n## 2026-11-12 cut\n");
    appendFileSync(join(made.dir, census), "// changed\n");
    const report = lintDelivery(made.dir);
    expect(report.files).toEqual([RECEIPT, census]);
    expect(landedReaders(made.dir, made.sha, report.files)).toEqual(["test/reads-census.test.ts", "test/reads-receipts.test.ts"]);
    expect(landedReaders(made.dir, made.sha, [census])).toEqual(["test/reads-census.test.ts"]);
    const listed = spawnSync(process.execPath, [LINT, "--readers", "--json"], { cwd: made.dir, encoding: "utf8" });
    expect(listed.status).toBe(0);
    expect(JSON.parse(listed.stdout.split("\n")[0] ?? "{}")).toMatchObject({ readers: ["test/reads-census.test.ts", "test/reads-receipts.test.ts"] });
    // census-file --readers puts the readers into its vitest run; this scratch repository has no vitest binary, so it stops there (exit 2)
    const run = spawnSync(process.execPath, [CENSUS_FILE, "--readers", "--json"], { cwd: made.dir, encoding: "utf8" });
    expect(JSON.parse(run.stdout.split("\n")[0] ?? "{}")).toMatchObject({ vitest: ["test/reads-census.test.ts", "test/reads-receipts.test.ts"] });
    expect([run.status, run.stderr.includes("node_modules/.bin/vitest is missing")]).toEqual([2, true]);
  });

  it("RR2 an untracked test file naming the receipts directory is no landed reader (J12), and neither is a tracked census-tier file naming it (J13)", () => {
    const made = repo({ "test/reads-receipts.test.ts": 'const DIR = "docs/workbench/receipts";\n', "test/y.census.ts": 'const DIR = "docs/workbench/receipts";\n' });
    write(made.dir, RECEIPT, "# wb-fixture: fixture\n\n## 2026-11-12 cut\n");
    write(made.dir, "test/new-reader.test.ts", 'const DIR = "docs/workbench/receipts";\n');
    expect(landedReaders(made.dir, made.sha, [RECEIPT])).toEqual(["test/reads-receipts.test.ts"]);
  });

  it("RT1 this file's header names each case registered here exactly once and names no other case", () => {
    const source = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const header = source.slice(0, source.indexOf("*/"));
    const named = [...header.matchAll(/\b(?:R[GHKLRTV]|CF)\d\b/g)].map(match => match[0]);
    const registered = [...source.matchAll(/^\s*it\("(\S+) /gm)].map(match => match[1] ?? "");
    expect(named.length, "a case named twice").toBe(new Set(named).size);
    expect([...named].sort()).toEqual([...registered].sort());
  });
});
