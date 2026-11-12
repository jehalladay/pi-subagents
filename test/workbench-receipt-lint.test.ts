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
 * The fixture cuts are scratch git repositories (test/helpers/scratch.ts). The RH cases replay refusal M:75230 on this
 * repository's own history: the wb-bau receipt line 31 of the refused cut 28dbfe4d ("holds 44 SITES rows at ce180d82")
 * and of the landed cure, both measured at ce180d82, where the SITES array literal holds 35 elements.
 * The claim kinds the lint judges are the ones its header lists (rows, array, table, lines, cite, and html refused
 * fail-closed). Run outcomes, sums, prose counts and figures split by an invisible character are NOT CLAIMED here.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { partitionFiles, VITEST_FLAGS, vitestArgv } from "../qa/workbench/census-file.mjs";
import { formatFinding, isJudged, landedReaders, lintDelivery, markdownClaims, measure, parseArgs, treeOf } from "../qa/workbench/receipt-lint.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = fileURLToPath(new URL("..", import.meta.url));
const LINT = join(REPO, "qa/workbench/receipt-lint.mjs");
const CENSUS_FILE = join(REPO, "qa/workbench/census-file.mjs");
const RECEIPT = "docs/workbench/receipts/wb-fixture.md";
const CORPUS = "test/corpus.test.ts";
const CORPUS_TEXT = 'export const SITES = [\n  { site: "a" },\n  { site: "b" },\n  { site: "c" },\n];\n';
/** The cases that spawn the CLIs (each child loads typescript and marked) carry this timeout instead of vitest's 5 s default. */
const SPAWN_TIMEOUT_MS = 60_000;
/** The wb-bau cut refused at M:75230 and the base both figures of its line 31 are measured at. */
const REFUSED_CUT = "28dbfe4d14b6d62cd7edb1b12005aa32452facfc";
const BAU_BASE = "ce180d82";

const scratches: string[] = [];
afterAll(() => {
  removeScratch(...scratches);
});

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

/** A fixture cut: the corpus committed at base, the receipt added on top (untracked, as a seat leaves its cut). */
function cut(receipt: string | ((sha: string) => string)): { dir: string; sha: string } {
  const made = repo({ [CORPUS]: CORPUS_TEXT });
  write(made.dir, RECEIPT, `# wb-fixture: fixture\n\n## 2026-11-12 cut\n\n${typeof receipt === "string" ? receipt : receipt(made.sha)}\n`);
  return made;
}

describe("wb-8py9 receipt lint: a fixture cut (the wb-bau class)", () => {
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
      write(dir, RECEIPT, `# wb-fixture: fixture\n\n## 2026-11-12 cut\n\n${line}\n`);
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

  it("RL4 a modified receipt is judged on its added lines only: a false figure in a landed entry is not judged, an appended one is", () => {
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
});

describe("wb-8py9 receipt lint: the rendered view (the wb-dc0 / wb-9x5 probe class)", () => {
  it("RV1 a figure inside an HTML comment is no claim, and a true figure hidden beside a false rendered one does not satisfy it", () => {
    const hidden = cut(`<!-- \`${CORPUS}\` holds 4 SITES rows. -->`);
    expect(lintDelivery(hidden.dir)).toMatchObject({ claims: [], findings: [] });
    const beside = cut(`The corpus: \`${CORPUS}\` holds 4 SITES rows <!-- \`${CORPUS}\` holds 3 SITES rows --> today.`);
    const report = lintDelivery(beside.dir);
    expect(report.claims.map(claim => [claim.kind, claim.count])).toEqual([["rows", 4]]);
    expect(report.findings.map(found => found.measured.split(" (")[0])).toEqual(["3"]);
  });

  it("RV2 table rows hidden in an HTML comment do not count toward a heading's row total", () => {
    const table = "| site |\n|---|\n| a |\n| b |\n<!-- | c | -->\n";
    const raw = table.split("\n").filter(line => line.includes("|")).length - 2;
    expect(raw, "a raw line count reads the hidden row").toBe(3);
    const false3 = cut(`### Sites (3 rows)\n\n${table}`);
    expect(lintDelivery(false3.dir).findings.map(found => [found.kind, found.states, found.measured])).toEqual([
      ["table", "3 rows", "2 rendered rows in the heading's section (its tables' body rows, else its code listing's non-blank lines)"],
    ]);
    const true2 = cut(`### Sites (2 rows)\n\n${table}`);
    expect(lintDelivery(true2.dir)).toMatchObject({ findings: [] });
    expect(lintDelivery(true2.dir).claims.map(claim => claim.kind)).toEqual(["table"]);
  });

  it("RV3 a claim that renders through raw HTML (a hidden span, a details block, a heading total) is refused fail-closed; HTML with no judged figure is not", () => {
    const span = cut(`\`${CORPUS}\` holds <span hidden>4</span>3 SITES rows.`);
    expect(lintDelivery(span.dir).findings.map(found => [found.kind, found.measured.startsWith("nothing: the claim renders through")])).toEqual([["html", true]]);
    const details = cut(`<details><summary>more</summary>\`${CORPUS}\` holds 3 SITES rows.</details>`);
    expect(lintDelivery(details.dir).findings.map(found => found.kind)).toEqual(["html"]);
    const placeholder = cut("Run `ritual.sh` with <step> set to the step name.");
    expect(lintDelivery(placeholder.dir)).toMatchObject({ claims: [], findings: [] });
    const external = cut("Run with <step> per `src/upstream/registry.py:12` today.");
    expect(lintDelivery(external.dir)).toMatchObject({ claims: [], findings: [] });
    const heading = cut("### Sites <span hidden>x</span> (1 rows)\n\n| site |\n|---|\n| a |");
    expect(lintDelivery(heading.dir).findings.map(found => found.kind)).toEqual(["html"]);
  });

  it("RV4 a code block, struck-through text and image alt text carry no claim; an entity-encoded or fullwidth figure is read as a reader sees it", () => {
    for (const quiet of [`\`\`\`text\n${CORPUS} holds 4 SITES rows\n\`\`\``, `~~\`${CORPUS}\` holds 4 SITES rows~~`, `![${CORPUS} holds 4 SITES rows](sites.png)`]) {
      expect(lintDelivery(cut(quiet).dir), quiet).toMatchObject({ claims: [], findings: [] });
    }
    const fullwidth = String.fromCodePoint(0xff14);
    for (const read of [`\`${CORPUS}\` holds &#52; SITES rows.`, `\`${CORPUS}\` holds ${fullwidth} SITES rows.`]) {
      expect(
        lintDelivery(cut(read).dir).findings.map(found => [found.claim, found.measured.split(" (")[0]]),
        read,
      ).toEqual([[`${CORPUS} holds 4 SITES rows`, "3"]]);
    }
  });
});

describe("wb-8py9 receipt lint: claim kinds", () => {
  it("RK1 an array claim states its element count and its first and last line; a wrong span is refused naming both", () => {
    const right = cut(`\`${CORPUS}\` is the corpus: 3 elements in the SITES array literal (lines 1 to 5).`);
    expect(lintDelivery(right.dir)).toMatchObject({ findings: [] });
    expect(lintDelivery(right.dir).claims.map(claim => [claim.kind, claim.path, claim.span])).toEqual([["array", CORPUS, [1, 5]]]);
    const wrong = cut(`\`${CORPUS}\` is the corpus: 3 elements in the SITES array literal (lines 2 to 6).`);
    expect(lintDelivery(wrong.dir).findings.map(found => [found.states, found.measured.split(" (")[0]])).toEqual([["lines 2 to 6 for the SITES array literal", "lines 1 to 5"]]);
  });

  it("RK2 a line-count claim is re-measured against the file", () => {
    expect(lintDelivery(cut(`What landed: \`${CORPUS}\` (5 lines).`).dir)).toMatchObject({ findings: [] });
    expect(lintDelivery(cut(`What landed: \`${CORPUS}\` (6 lines).`).dir).findings.map(found => found.measured)).toEqual([`5 lines (${CORPUS} in the working tree)`]);
  });

  it("RK3 a citation past the end of a local file is refused; a path absent here or a revision of another repository is an external citation, not judged", () => {
    expect(lintDelivery(cut(`See \`${CORPUS}:5\` and \`${CORPUS}:2-4\`.`).dir)).toMatchObject({ findings: [] });
    expect(lintDelivery(cut(`See \`${CORPUS}:9\`.`).dir).findings.map(found => found.measured)).toEqual([`${CORPUS} in the working tree has 5 lines`]);
    const external = lintDelivery(cut(`See \`src/upstream/registry.py:794-895\` and \`${CORPUS}:9\` at 6a251bf73af5.`).dir);
    expect(external).toMatchObject({ claims: [], findings: [] });
  });

  it("RK4 a census file's titles and comments are judged against the arrays it declares; a delta count and a data literal are not claims", () => {
    const census = "test/x-census.test.ts";
    const made = repo({ [CORPUS]: CORPUS_TEXT });
    const source = (title: string) =>
      [
        "import { expect, it } from \"vitest\";",
        "// the cut adds 1 ROWS rows to the table below",
        'const ROWS = [{ id: "C1" }, { id: "C2" }];',
        `const DATA = ["${CORPUS}:999"];`,
        `it("${title}", () => expect([ROWS.length, DATA.length]).toEqual([2, 1]));`,
        "",
      ].join("\n");
    write(made.dir, census, source("C0 the 3 ROWS rows each carry an id"));
    expect(lintDelivery(made.dir).findings.map(found => [found.file, found.line, found.claim, found.measured.split(" (")[0]])).toEqual([[census, 5, "3 ROWS rows", "2"]]);
    write(made.dir, census, source("C0 the 2 ROWS rows each carry an id"));
    const holds = lintDelivery(made.dir);
    expect(holds.findings).toEqual([]);
    expect(holds.claims.map(claim => [claim.kind, claim.text])).toEqual([["rows", "2 ROWS rows"]]);
  });
});

describe("wb-8py9 receipt lint: refusal M:75230 replayed on this repository's history", () => {
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

describe("wb-8py9 census-file: the forge command and its readers", () => {
  it("CF1 forge.toml declares [build.commands.census-file] running qa/workbench/census-file.mjs, its arguments appended (no {args} placeholder)", () => {
    const toml = readFileSync(join(REPO, "forge.toml"), "utf8");
    const block = /^\[build\.commands\.census-file\]\n((?:[a-z_]+ = .*\n)+)/m.exec(toml)?.[1] ?? "";
    expect(block.split("\n").filter(Boolean)).toEqual(['command = "node qa/workbench/census-file.mjs"', "timeout = 1200"]);
  });

  it("CF2 census-file consumes the claim-check's trailing --json and runs vitest only on the named default-tier test files, with --maxWorkers=8", () => {
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
    write(dir, RECEIPT, `# wb-fixture: fixture\n\n## 2026-11-12 cut\n\n- \`${CORPUS}\` holds 3 SITES rows.\n`);
    for (const script of [LINT, CENSUS_FILE]) expect(spawnSync(process.execPath, [script], { cwd: dir, encoding: "utf8" }).status, script).toBe(0);
  }, SPAWN_TIMEOUT_MS);

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
  }, SPAWN_TIMEOUT_MS);
});
