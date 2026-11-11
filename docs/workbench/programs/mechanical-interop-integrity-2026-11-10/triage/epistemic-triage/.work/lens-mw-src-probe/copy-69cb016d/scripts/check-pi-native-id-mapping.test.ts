import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { ID_MAP_STATUSES, MAPPING_DOC, PROGRAM_DIR, extractReferencedIds, judgeIdMapping, parseMapping } from "./check-pi-native-id-mapping.ts";
import * as validator from "./check-pi-native-id-mapping.ts";

// MechanicalWorkflows-loexn.3 (M00-C, EAT-R004, EAT-R034 graph half): the identifier mapping validator for the
// pi-native-interoperability-2026-11-09 program. Fixtures are inline strings, so a pass here is a validator result and never a native
// PASS. The last two tests judge the committed mapping document and the committed program documents themselves.
const root = resolve(import.meta.dirname, "..");
const HEADER = "| id | family | source_path | status | receipt_path |\n| --- | --- | --- | --- | --- |\n";
const EDGES_HEADER = "| from | to | kind |\n| --- | --- | --- |\n";
const GOOD_EDGES = "| M03 | M02 | blocked-by |\n| M04 | M02 | blocked-by |\n";
type Docs = Record<string, string>;
const DOCS: Docs = { "README.md": "Related tracks: MW-R0..R2, MW-BM-01..02, W11, VC-3, B-source.", "02.md": "PI-BM also applies; MW-R1 repeats." };
const ROWS = [
  ["MW-R0", "MW-R", "docs/a.md", "defined", "docs/a.md"], ["MW-R1", "MW-R", "docs/a.md", "defined", "docs/a.md"], ["MW-R2", "MW-R", "docs/a.md", "defined", "docs/a.md"],
  ["MW-BM-01", "MW-BM", "docs/b.md", "defined", "docs/b.md"], ["MW-BM-02", "MW-BM", "docs/b.md", "defined", "docs/b.md"],
  ["W11", "W", "docs/c.md", "defined", "docs/c.md"], ["VC-3", "VC", "pi:docs/vc.md", "external-unverified", "-"],
  ["B-source", "B", "pi:docs/b.md", "external-unverified", "-"], ["PI-BM", "PI-BM", "pi:docs/bm.md", "external-unverified", "-"],
];
const exists = (path: string): boolean => /^(docs|tests|qa|scripts)\//.test(path);
const contained = (): boolean => true;
// Receipt text fixture: every resolved row's receipt names its own id as a whole token, and nothing else.
function receiptsFor(rows: string[][]): Record<string, string> {
  const files: Record<string, string> = {};
  for (const r of rows) if (r[3] !== "external-unverified") files[r[4]!] = `${files[r[4]!] ?? ""}${r[0]} is named here.\n`;
  return files;
}
const readerOf = (files: Record<string, string>) => (path: string): string | null => files[path] ?? null;
const readText = readerOf(receiptsFor(ROWS));
function table(rows: string[][] = ROWS): string { return HEADER + rows.map(r => `| ${r.join(" | ")} |`).join("\n") + "\n"; }
function mapping(rows: string[][] = ROWS, edges: string = GOOD_EDGES): string {
  return `# Mapping\n\n## Mapping table\n\n${table(rows)}\n## Serialization edges\n\n${EDGES_HEADER}${edges}`;
}
type Reader = (path: string) => string | null;
const judge = (md: string, docs: Docs = DOCS, reader: Reader = readText) => judgeIdMapping({ mapping: md, docs, exists, readText: reader, contained });
const codes = (md: string, docs: Docs = DOCS, reader: Reader = readText) => [...new Set(judge(md, docs, reader).refusals.map(r => r.code))].sort();
const subjects = (md: string, code: string, docs: Docs = DOCS, reader: Reader = readText) => judge(md, docs, reader).refusals.filter(r => r.code === code).map(r => r.subject).sort();

test("the closed status set names defined, test-pinned and external-unverified", () => {
  assert.deepEqual([...ID_MAP_STATUSES], ["defined", "test-pinned", "external-unverified"]);
});

test("extraction expands ranges and deduplicates ids across documents", () => {
  assert.deepEqual(extractReferencedIds(DOCS), ["B-source", "MW-BM-01", "MW-BM-02", "MW-R0", "MW-R1", "MW-R2", "PI-BM", "VC-3", "W11"]);
});

test("a complete honest mapping judges ok", () => {
  assert.deepEqual(judge(mapping()), { ok: true, refusals: [] });
});

test("parsing returns one row per table line and the edge pairs", () => {
  const parsed = parseMapping(mapping());
  assert.equal(parsed.rows.length, ROWS.length);
  assert.deepEqual(parsed.rows[0], { id: "MW-R0", family: "MW-R", source_path: "docs/a.md", status: "defined", receipt_path: "docs/a.md" });
  assert.deepEqual(parsed.edges, [{ from: "M03", to: "M02", kind: "blocked-by" }, { from: "M04", to: "M02", kind: "blocked-by" }]);
});

test("a referenced id with no row is refused as unmapped, one subject per id", () => {
  const rows = ROWS.filter(r => r[0] !== "MW-R2" && r[0] !== "W11");
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_ID_UNMAPPED"), ["MW-R2", "W11"]);
});

test("a range endpoint inside a program document counts as referenced", () => {
  assert.deepEqual(subjects(mapping(ROWS.filter(r => r[0] !== "MW-BM-02")), "ID_MAP_ID_UNMAPPED"), ["MW-BM-02"]);
});

test("an id listed twice is refused as a duplicate", () => {
  assert.deepEqual(subjects(mapping([...ROWS, ["MW-R1", "MW-R", "docs/a.md", "defined", "docs/a.md"]]), "ID_MAP_ID_DUPLICATE"), ["MW-R1"]);
});

test("two rows sharing a numeric suffix inside one family are refused", () => {
  const rows = [...ROWS, ["MW-R01", "MW-R", "docs/a.md", "defined", "docs/a.md"]];
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_SUFFIX_COLLISION"), ["MW-R01", "MW-R1"]);
});

test("equal suffixes in different families do not collide", () => {
  const rows = [...ROWS, ["MW-BM-00", "MW-BM", "docs/b.md", "defined", "docs/b.md"]];
  assert.deepEqual(codes(mapping(rows), DOCS, readerOf(receiptsFor(rows))), []);
  assert.equal(judge(mapping()).ok, true);
});

test("a resolved status without a receipt path is refused", () => {
  for (const blank of ["", "-", "  "]) {
    const rows = ROWS.map(r => r[0] === "MW-R0" ? ["MW-R0", "MW-R", "docs/a.md", "defined", blank] : r);
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_STATUS_NO_RECEIPT"), ["MW-R0"], JSON.stringify(blank));
  }
});

test("a resolved status whose receipt path does not exist is refused", () => {
  const rows = ROWS.map(r => r[0] === "W11" ? ["W11", "W", "docs/c.md", "test-pinned", "nowhere/c.test.ts"] : r);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_STATUS_NO_RECEIPT"), ["W11"]);
});

test("an external-unverified row needs no receipt but must name a pi: source", () => {
  assert.deepEqual(codes(mapping()), []);
  const rows = ROWS.map(r => r[0] === "VC-3" ? ["VC-3", "VC", "docs/vc.md", "external-unverified", "-"] : r);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_SOURCE_PATH_MISSING"), ["VC-3"]);
});

test("a row whose in-repo source path does not exist or is blank is refused", () => {
  const rows = ROWS.map(r => r[0] === "MW-R0" ? ["MW-R0", "MW-R", "missing/a.md", "defined", "docs/a.md"] : r[0] === "MW-R1" ? ["MW-R1", "MW-R", "", "defined", "docs/a.md"] : r);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_SOURCE_PATH_MISSING"), ["MW-R0", "MW-R1"]);
});

test("a status outside the closed set is refused, including near spellings", () => {
  for (const status of ["resolved", "Defined", "measured", "", "defined "]) {
    const rows = ROWS.map(r => r[0] === "MW-R0" ? ["MW-R0", "MW-R", "docs/a.md", status, "docs/a.md"] : r);
    const refused = subjects(mapping(rows), "ID_MAP_STATUS_UNKNOWN");
    assert.deepEqual(refused, status === "defined " ? [] : ["MW-R0"], JSON.stringify(status));
  }
});

test("the serialization edges must carry M03 and M04 blocked by M02", () => {
  assert.deepEqual(subjects(mapping(ROWS, "| M04 | M02 | blocked-by |\n"), "ID_MAP_EDGE_MISSING"), ["M03->M02"]);
  assert.deepEqual(subjects(mapping(ROWS, ""), "ID_MAP_EDGE_MISSING"), ["M03->M02", "M04->M02"]);
});

test("an edge M01 to M02 is refused", () => {
  assert.deepEqual(subjects(mapping(ROWS, GOOD_EDGES + "| M01 | M02 | blocked-by |\n"), "ID_MAP_EDGE_FORBIDDEN"), ["M01->M02"]);
});

test("a document with no mapping table or no edge table is refused rather than judged empty", () => {
  assert.ok(codes("# nothing here\n").includes("ID_MAP_TABLE_MISSING"));
  assert.ok(codes(`## Mapping table\n\n${table()}`).includes("ID_MAP_TABLE_MISSING"));
});

test("a malformed row with the wrong cell count is refused", () => {
  const md = mapping().replace("| MW-R0 | MW-R | docs/a.md | defined | docs/a.md |", "| MW-R0 | MW-R | docs/a.md |");
  assert.ok(codes(md).includes("ID_MAP_ROW_MALFORMED"));
});

// MechanicalWorkflows-9me85.1 (slice A of 9me85, review-loexn.3 findings 1 and 3): the two reviewer mutation survivors and the Pi pin.
test("a resolved row whose existing receipt never names the row id is refused (reviewer mutant 1)", () => {
  const files = receiptsFor(ROWS);
  files["docs/a.md"] = "an unrelated existing file\n";
  assert.deepEqual(subjects(mapping(), "ID_MAP_RECEIPT_ID_ABSENT", DOCS, readerOf(files)), ["MW-R0", "MW-R1", "MW-R2"]);
  assert.equal(judge(mapping(), DOCS, readerOf(files)).ok, false);
});

test("a receipt names the id only as a whole token, never as a prefix or suffix of a longer id", () => {
  const files = receiptsFor(ROWS);
  files["docs/a.md"] = "MW-R10 and XMW-R0 and MW-R1-extra and MW-R2x here, plus MW-R0.\n";
  assert.deepEqual(subjects(mapping(), "ID_MAP_RECEIPT_ID_ABSENT", DOCS, readerOf(files)), ["MW-R1", "MW-R2"]);
});

test("a receipt that exists but cannot be read is refused as not naming the id", () => {
  const files = receiptsFor(ROWS);
  delete files["docs/c.md"];
  assert.deepEqual(subjects(mapping(), "ID_MAP_RECEIPT_ID_ABSENT", DOCS, readerOf(files)), ["W11"]);
});

test("a defined to test-pinned flip whose receipt stays the source document is refused (reviewer mutant 2)", () => {
  const rows = ROWS.map(r => r[0] === "W11" ? ["W11", "W", "docs/c.md", "test-pinned", "docs/c.md"] : r);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_TEST", DOCS, readerOf(receiptsFor(rows))), ["W11"]);
});

test("a test-pinned receipt passes when it is a .test.ts file, a .test.py file or sits under a test or tests directory", () => {
  for (const receipt of ["docs/x.test.ts", "docs/x.test.py", "docs/test/y.ts", "tests/z.py"]) {
    const rows = ROWS.map(r => r[0] === "W11" ? ["W11", "W", "docs/c.md", "test-pinned", receipt] : r);
    assert.deepEqual(codes(mapping(rows), DOCS, readerOf(receiptsFor(rows))), [], receipt);
  }
});

test("a test-pinned receipt outside a test file is refused whatever its extension or lookalike directory", () => {
  for (const receipt of ["docs/x.test.md", "docs/x.testing.ts", "docs/latest/y.ts", "docs/contest/z.ts"]) {
    const rows = ROWS.map(r => r[0] === "W11" ? ["W11", "W", "docs/c.md", "test-pinned", receipt] : r);
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_TEST", DOCS, readerOf(receiptsFor(rows))), ["W11"], receipt);
  }
});

test("a blank or missing receipt keeps the old code and draws no receipt-text refusal", () => {
  const rows = ROWS.map(r => r[0] === "MW-R0" ? ["MW-R0", "MW-R", "docs/a.md", "defined", "-"] : r);
  const found = codes(mapping(rows), DOCS, readerOf(receiptsFor(ROWS)));
  assert.ok(found.includes("ID_MAP_STATUS_NO_RECEIPT"));
  assert.ok(!found.includes("ID_MAP_RECEIPT_ID_ABSENT"));
});

test("the committed mapping pins every Pi row to a named file at the Pi pin 8e2fedeb and no row keeps the bare directory", () => {
  const text = readFileSync(resolve(root, MAPPING_DOC), "utf8");
  const external = parseMapping(text).rows.filter(r => r.status === "external-unverified");
  assert.equal(external.length, 10);
  for (const r of external) {
    assert.match(r.source_path, /^pi:docs\/workbench\/.+\.md$/, r.id);
  }
  assert.match(text, /\*\*Pin:\*\*[^\n]*Pi [^\n]*8e2fedeb/);
});

test("the committed mapping judges clean against the committed program documents and the real tree", () => {
  const dir = resolve(root, PROGRAM_DIR);
  const docs: Docs = {};
  for (const name of ["README.md", "01-AUDIT-AND-CONTRACT.md", "02-IMPLEMENTATION-PACKAGES.md", "03-VERIFICATION-AND-RELEASE.md"]) docs[name] = readFileSync(join(dir, name), "utf8");
  const verdict = judgeIdMapping({ mapping: readFileSync(resolve(root, MAPPING_DOC), "utf8"), docs, exists: path => existsSync(resolve(root, path)), readText: path => (existsSync(resolve(root, path)) ? readFileSync(resolve(root, path), "utf8") : null), contained: path => validator.pathContainedIn(root, path) });
  assert.deepEqual(verdict, { ok: true, refusals: [] });
});

test("the command line exits 0 on the committed tree and 2 on a refusing root", () => {
  const ok = spawnSync(process.execPath, [resolve(import.meta.dirname, "check-pi-native-id-mapping.ts")], { cwd: root, encoding: "utf8" });
  assert.equal(ok.status, 0, ok.stderr);
  assert.doesNotMatch(ok.stdout, /\bPASS\b/);
  const bad = mkdtempSync(join(tmpdir(), "idmap-"));
  try {
    const copy = join(bad, PROGRAM_DIR);
    spawnSync("mkdir", ["-p", copy]);
    for (const name of ["README.md", "01-AUDIT-AND-CONTRACT.md", "02-IMPLEMENTATION-PACKAGES.md", "03-VERIFICATION-AND-RELEASE.md"]) writeFileSync(join(copy, name), readFileSync(join(root, PROGRAM_DIR, name), "utf8"));
    writeFileSync(join(bad, MAPPING_DOC), "# empty\n");
    const refused = spawnSync(process.execPath, [resolve(import.meta.dirname, "check-pi-native-id-mapping.ts"), "--root", bad], { encoding: "utf8" });
    assert.equal(refused.status, 2);
    assert.match(refused.stderr, /ID_MAP_TABLE_MISSING/);
  } finally { rmSync(bad, { recursive: true, force: true }); }
});

// MechanicalWorkflows-9me85.2 (slice B of 9me85, coordinator hot-review follow-ups D1 to D4 of 9me85.1).
const SELF_TEST = "scripts/check-pi-native-id-mapping.test.ts";
const withRow = (id: string, row: string[]): string[][] => ROWS.map(r => (r[0] === id ? row : r));

test("D1: a defined row whose receipt is not its source path is refused (doc rule: the receipt names that same file)", () => {
  const rows = withRow("MW-R0", ["MW-R0", "MW-R", "docs/a.md", "defined", "docs/other.md"]);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_SOURCE", DOCS, readerOf(receiptsFor(rows))), ["MW-R0"]);
  assert.equal(judge(mapping(rows), DOCS, readerOf(receiptsFor(rows))).ok, false);
});

test("D1: the same path spelled with a leading ./ or a doubled slash still counts as the source path", () => {
  for (const receipt of ["./docs/a.md", "docs//a.md", "docs/x/../a.md"]) {
    const rows = withRow("MW-R0", ["MW-R0", "MW-R", "docs/a.md", "defined", receipt]);
    const files = receiptsFor(ROWS);
    files[receipt] = "MW-R0 is named here.\n";
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_SOURCE", DOCS, readerOf(files)), [], receipt);
  }
});

test("D1: a test-pinned row is not held to receipt == source", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/c.test.ts"]);
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_SOURCE", DOCS, readerOf(receiptsFor(rows))), []);
});

test("D1: the mapping document is refused as the receipt of any resolved row, because it names every id", () => {
  const defined = withRow("W11", ["W11", "W", MAPPING_DOC, "defined", MAPPING_DOC]);
  const files = { ...receiptsFor(ROWS), [MAPPING_DOC]: ROWS.map(r => r[0]).join(" ") };
  assert.deepEqual(subjects(mapping(defined), "ID_MAP_RECEIPT_SELF_REFERENTIAL", DOCS, readerOf(files)), ["W11"]);
  const pinned = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", MAPPING_DOC]);
  assert.deepEqual(subjects(mapping(pinned), "ID_MAP_RECEIPT_SELF_REFERENTIAL", DOCS, readerOf(files)), ["W11"]);
});

test("D1: the validator's own test file is refused as a receipt even though it is a test file that names ids", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", SELF_TEST]);
  const files = { ...receiptsFor(ROWS), [SELF_TEST]: ROWS.map(r => r[0]).join(" ") };
  assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_SELF_REFERENTIAL", DOCS, readerOf(files)), ["W11"]);
  assert.ok(!codes(mapping(rows), DOCS, readerOf(files)).includes("ID_MAP_RECEIPT_NOT_TEST"));
});

test("D1: a ./ spelling of the mapping document or the validator test does not slip past the self-reference refusal", () => {
  for (const receipt of [`./${MAPPING_DOC}`, `./${SELF_TEST}`, `scripts/../${SELF_TEST}`]) {
    const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", receipt]);
    const files = { ...receiptsFor(ROWS), [receipt]: "W11" };
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_SELF_REFERENTIAL", DOCS, readerOf(files)), ["W11"], receipt);
  }
});

test("D2: test-pinned admits the repo's qa tree .ts files and test_*.py files, and still refuses non-test paths", () => {
  for (const receipt of ["qa/performance-native.ts", "qa/integration/x/y.ts", "qa/integration/python-consumer/test_canonical_shared.py", "tests/test_a.py"]) {
    const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", receipt]);
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_TEST", DOCS, readerOf(receiptsFor(rows))), [], receipt);
  }
  for (const receipt of ["docs/qa/notes.md", "docs/x/test_a.md", "scripts/latest_a.py", "docs/aqa/x.ts", "docs/mytest_a.py", "qa/README.md"]) {
    const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", receipt]);
    assert.deepEqual(subjects(mapping(rows), "ID_MAP_RECEIPT_NOT_TEST", DOCS, readerOf(receiptsFor(rows))), ["W11"], receipt);
  }
});

test("D4: a receipt or source path the injected containment predicate rejects is refused and its text is never read", () => {
  const rows = withRow("MW-R0", ["MW-R0", "MW-R", "docs/a.md", "defined", "docs/a.md"]);
  let reads = 0;
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: path => { reads++; return readText(path); }, contained: path => path !== "docs/a.md" });
  const outside = verdict.refusals.filter(r => r.code === "ID_MAP_PATH_OUTSIDE_ROOT").map(r => r.subject);
  assert.ok(outside.includes("MW-R0") && outside.includes("MW-R1") && outside.includes("MW-R2"));
  assert.ok(!verdict.refusals.some(r => r.code === "ID_MAP_RECEIPT_ID_ABSENT" && r.subject === "MW-R0"));
  assert.equal(reads, ROWS.filter(r => r[3] !== "external-unverified" && r[4] !== "docs/a.md").length);
});

test("D4: containment holds for ../ paths, absolute paths and symlinks out of the tree and passes in-tree and not-yet-existing paths", () => {
  const base = mkdtempSync(join(tmpdir(), "idmap-contain-"));
  try {
    const tree = join(base, "tree");
    const outside = join(base, "outside");
    mkdirSync(join(tree, "sub"), { recursive: true });
    mkdirSync(outside);
    writeFileSync(join(outside, "secret.md"), "secret");
    writeFileSync(join(tree, "ok.md"), "ok");
    symlinkSync(join(outside, "secret.md"), join(tree, "link.md"));
    symlinkSync(outside, join(tree, "linkdir"));
    for (const bad of ["../outside/secret.md", "sub/../../outside/secret.md", join(outside, "secret.md"), "link.md", "linkdir/secret.md", ".."]) assert.equal(validator.pathContainedIn(tree, bad), false, bad);
    for (const good of ["ok.md", "./ok.md", "sub", "sub/not-yet.md"]) assert.equal(validator.pathContainedIn(tree, good), true, good);
  } finally { rmSync(base, { recursive: true, force: true }); }
});

test("D4: the command line refuses a receipt that is a symlink out of the root and one that climbs out with ../", () => {
  const base = mkdtempSync(join(tmpdir(), "idmap-cli-"));
  try {
    const tree = join(base, "tree");
    const dir = join(tree, PROGRAM_DIR);
    mkdirSync(dir, { recursive: true });
    mkdirSync(join(tree, "docs"), { recursive: true });
    writeFileSync(join(base, "secret.md"), "W11 R0");
    symlinkSync(join(base, "secret.md"), join(tree, "docs/leak.md"));
    for (const name of ["README.md", "01-AUDIT-AND-CONTRACT.md", "02-IMPLEMENTATION-PACKAGES.md", "03-VERIFICATION-AND-RELEASE.md"]) writeFileSync(join(dir, name), "W11 only.\n");
    writeFileSync(join(tree, MAPPING_DOC), mapping([["W11", "W", "docs/leak.md", "defined", "docs/leak.md"], ["X", "X", "docs/../../secret.md", "defined", "docs/../../secret.md"]]));
    const refused = spawnSync(process.execPath, [resolve(import.meta.dirname, "check-pi-native-id-mapping.ts"), "--root", tree], { encoding: "utf8" });
    assert.equal(refused.status, 2);
    assert.match(refused.stderr, /ID_MAP_PATH_OUTSIDE_ROOT: W11/);
    assert.match(refused.stderr, /ID_MAP_PATH_OUTSIDE_ROOT: X/);
  } finally { rmSync(base, { recursive: true, force: true }); }
});

// MechanicalWorkflows-9me85.3 (slice C of 9me85, residuals N2 to N4 of the 9me85.2 hot review).
const SOURCE_ESCAPE = "docs/../../secret.md";

test("N4: a source path that escapes the root is refused under its own wording while the receipt stays in the tree", () => {
  const rows = withRow("W11", ["W11", "W", SOURCE_ESCAPE, "test-pinned", "tests/c.test.ts"]);
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(receiptsFor(rows)), contained: path => !path.includes("..") });
  const outside = verdict.refusals.filter(r => r.code === "ID_MAP_PATH_OUTSIDE_ROOT" && r.subject === "W11");
  assert.equal(outside.length, 1);
  assert.match(outside[0]!.detail, /^the source path docs\/\.\.\/\.\.\/secret\.md resolves outside the repository root$/);
});

test("N4: a receipt that escapes the root while the source stays in the tree is refused under the receipt wording", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/../../c.test.ts"]);
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(receiptsFor(rows)), contained: path => !path.includes("..") });
  const outside = verdict.refusals.filter(r => r.code === "ID_MAP_PATH_OUTSIDE_ROOT" && r.subject === "W11");
  assert.equal(outside.length, 1);
  assert.match(outside[0]!.detail, /^the receipt path /);
});

test("N3: a receipt spelled through an alias of the mapping document or the validator test is refused as self-referential when realPath resolves it", () => {
  for (const [receipt, target] of [["docs/alias.md", MAPPING_DOC], ["tests/alias.test.ts", SELF_TEST]] as const) {
    const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", receipt]);
    const files = { ...receiptsFor(rows), [receipt]: "W11" };
    const resolveTo = (path: string): string => (path === receipt ? target : path);
    const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(files), contained, realPath: resolveTo });
    assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"], receipt);
  }
});

test("N3: without realPath the judge stays lexical and an ordinary receipt resolving to itself is not refused", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/c.test.ts"]);
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(receiptsFor(rows)), contained, realPath: path => path });
  assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL"), []);
});

test("N3: realRelativePath follows a committed symlink alias to its root-relative target and keeps a missing path lexical", () => {
  const base = mkdtempSync(join(tmpdir(), "idmap-real-"));
  try {
    const tree = join(base, "tree");
    mkdirSync(join(tree, "docs"), { recursive: true });
    writeFileSync(join(tree, "docs/real.md"), "real");
    symlinkSync(join(tree, "docs/real.md"), join(tree, "docs/alias.md"));
    assert.equal(validator.realRelativePath(tree, "docs/alias.md"), "docs/real.md");
    assert.equal(validator.realRelativePath(tree, "./docs/real.md"), "docs/real.md");
    assert.equal(validator.realRelativePath(tree, "docs//not-yet.md"), "docs/not-yet.md");
  } finally { rmSync(base, { recursive: true, force: true }); }
});

test("N3: the command line refuses a row whose receipt is a committed symlink alias of the mapping document", () => {
  const base = mkdtempSync(join(tmpdir(), "idmap-alias-"));
  try {
    const tree = join(base, "tree");
    const dir = join(tree, PROGRAM_DIR);
    mkdirSync(dir, { recursive: true });
    for (const name of ["README.md", "01-AUDIT-AND-CONTRACT.md", "02-IMPLEMENTATION-PACKAGES.md", "03-VERIFICATION-AND-RELEASE.md"]) writeFileSync(join(dir, name), "W11 only.\n");
    writeFileSync(join(tree, MAPPING_DOC), mapping([["W11", "W", "docs/alias.md", "defined", "docs/alias.md"]]));
    mkdirSync(join(tree, "docs"), { recursive: true });
    symlinkSync(join(tree, MAPPING_DOC), join(tree, "docs/alias.md"));
    const refused = spawnSync(process.execPath, [resolve(import.meta.dirname, "check-pi-native-id-mapping.ts"), "--root", tree], { encoding: "utf8" });
    assert.equal(refused.status, 2);
    assert.match(refused.stderr, /ID_MAP_RECEIPT_SELF_REFERENTIAL: W11/);
  } finally { rmSync(base, { recursive: true, force: true }); }
});

test("N2: every refusal code the validator can emit appears in the 04 mapping document, so a new code cannot land undocumented", () => {
  const source = readFileSync(resolve(root, "scripts/check-pi-native-id-mapping.ts"), "utf8");
  const emitted = [...new Set([...source.matchAll(/refuse\(\s*"(ID_MAP_[A-Z_]+)"/g)].map(m => m[1]!))].sort();
  const declared = [...new Set([...source.matchAll(/^\s*\| "(ID_MAP_[A-Z_]+)"/gm)].map(m => m[1]!))].sort();
  assert.equal(emitted.length, 16);
  assert.deepEqual(emitted, declared);
  const doc = readFileSync(resolve(root, MAPPING_DOC), "utf8");
  const documented = documentedCodes(doc);
  assert.deepEqual(emitted.filter(code => !documented.has(code)), []);
  assert.deepEqual([...documented].filter(code => !emitted.includes(code)).sort(), []);
});

// MechanicalWorkflows-9me85.4 (slice D of 9me85, residuals L1, L4 and N5 of the 9me85.3 hot review).
function documentedCodes(doc: string): Set<string> { return new Set([...doc.matchAll(/^- `(ID_MAP_[A-Z_]+)` — /gm)].map(m => m[1]!)); }

test("L1: the documentation parity check runs both ways, so a stale bullet for a code the validator no longer emits is detected", () => {
  const source = readFileSync(resolve(root, "scripts/check-pi-native-id-mapping.ts"), "utf8");
  const emitted = [...new Set([...source.matchAll(/refuse\(\s*"(ID_MAP_[A-Z_]+)"/g)].map(m => m[1]!))].sort();
  const doc = readFileSync(resolve(root, MAPPING_DOC), "utf8");
  const stale = `${doc}\n- \`ID_MAP_REMOVED_LONG_AGO\` — a code the validator no longer emits.\n`;
  assert.deepEqual([...documentedCodes(stale)].filter(code => !emitted.includes(code)), ["ID_MAP_REMOVED_LONG_AGO"]);
  assert.deepEqual([...documentedCodes(doc)].filter(code => !emitted.includes(code)), []);
});

test("L4: a byte-identical copy of the mapping document or of the validator test, committed under another path, is refused as self-referential", () => {
  const mappingBytes = readFileSync(resolve(root, MAPPING_DOC), "utf8");
  const testBytes = readFileSync(resolve(root, SELF_TEST), "utf8");
  for (const [receipt, bytes] of [["docs/copy.md", mappingBytes], ["qa/copy.test.ts", testBytes]] as const) {
    const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", receipt]);
    const files = { ...receiptsFor(rows), [receipt]: `${bytes}\nW11` };
    const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(files), contained, realPath: path => path });
    assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"], receipt);
  }
});

test("L4: a receipt equal to the judged mapping bytes is refused through the content marker path, and an ordinary single-id receipt still passes", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/copy.test.ts"]);
  const md = mapping(rows);
  const asCopy = judgeIdMapping({ mapping: md, docs: DOCS, exists, readText: readerOf({ ...receiptsFor(rows), "tests/copy.test.ts": md }), contained });
  assert.ok(asCopy.refusals.some(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL" && r.subject === "W11"));
  const ordinary = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf(receiptsFor(rows)), contained });
  assert.deepEqual(ordinary.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL"), []);
});

test("N5: the command line refuses a missing or non-directory --root under ID_MAP_ROOT_MISSING and never reports a table refusal", () => {
  const base = mkdtempSync(join(tmpdir(), "idmap-noroot-"));
  try {
    writeFileSync(join(base, "file.txt"), "not a directory");
    for (const target of [join(base, "missing"), join(base, "file.txt")]) {
      const refused = spawnSync(process.execPath, [resolve(import.meta.dirname, "check-pi-native-id-mapping.ts"), "--root", target], { encoding: "utf8" });
      assert.equal(refused.status, 2, target);
      assert.match(refused.stderr, /ID_MAP_ROOT_MISSING: /, target);
      assert.doesNotMatch(refused.stderr, /ID_MAP_TABLE_MISSING/, target);
    }
  } finally { rmSync(base, { recursive: true, force: true }); }
});

test("N5: judgeRoot accepts an existing directory and refuses a missing one", () => {
  assert.deepEqual(validator.judgeRoot(root), { ok: true, refusals: [] });
  const verdict = validator.judgeRoot(join(root, "no-such-dir-9me85-4"));
  assert.deepEqual(verdict.refusals.map(r => r.code), ["ID_MAP_ROOT_MISSING"]);
});

// MechanicalWorkflows-9me85.5 (slice E of 9me85, residuals D1, R1 and R2 of the 9me85.4 hot review).
// Only W11 resolves in this table, so the all-resolved-ids guard (three or more resolved ids) stays silent and only the byte-equality clause can refuse the copy.
const EXTERNAL_ONLY = ROWS.map(r => (r[0] === "W11" ? ["W11", "W", "docs/c.md", "test-pinned", "tests/copy.test.ts"] : r[3] === "external-unverified" ? r : [r[0]!, r[1]!, `pi:${r[2]}`, "external-unverified", "-"]));

test("D1: a byte copy of a mapping whose heading is spelled in another case carries no marker and only the byte-equality clause refuses it", () => {
  const md = mapping(EXTERNAL_ONLY).replace("## Mapping table", "## MAPPING TABLE");
  assert.ok(md.includes("## MAPPING TABLE") && !md.includes("## Mapping table") && !md.includes("judgeIdMapping"));
  assert.equal(parseMapping(md).rows.length, EXTERNAL_ONLY.length);
  const verdict = judgeIdMapping({ mapping: md, docs: DOCS, exists, readText: readerOf({ "tests/copy.test.ts": md }), contained });
  assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"]);
  assert.match(verdict.refusals.find(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL")!.detail, /carries the content of the mapping document/);
  const ordinary = judgeIdMapping({ mapping: md, docs: DOCS, exists, readText: readerOf({ "tests/copy.test.ts": "W11 is named here.\n" }), contained });
  assert.deepEqual(ordinary.refusals, []);
});

test("R1: a table-rows-only partial copy of the mapping, with the heading missing or in another case, is refused because it names every resolved id", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/partial.test.ts"]);
  const md = mapping(rows);
  for (const partial of [table(rows), `## mapping table\n\n${table(rows)}`, `## MAPPING TABLE\n\n${table(rows)}`]) {
    assert.ok(partial !== md && !partial.includes("## Mapping table") && !partial.includes("judgeIdMapping"));
    const verdict = judgeIdMapping({ mapping: md, docs: DOCS, exists, readText: readerOf({ ...receiptsFor(rows), "tests/partial.test.ts": partial }), contained });
    assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"], partial.slice(0, 20));
    assert.match(verdict.refusals.find(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL")!.detail, /names all 6 resolved ids of the table/);
  }
});

test("R1: a single-id or two-id receipt stays admissible, and so does a receipt that omits one resolved id", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/some.test.ts"]);
  for (const text of ["W11 is named here.\n", "W11 and MW-R0 are named here.\n", "W11 MW-R0 MW-R1 MW-R2 MW-BM-01 are named here.\n"]) {
    const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf({ ...receiptsFor(rows), "tests/some.test.ts": text }), contained });
    assert.deepEqual(verdict.refusals, [], text);
  }
});

test("R1: below three resolved ids a receipt that names them all stays admissible, because the guard would otherwise refuse an honest two-id receipt", () => {
  const rows = [["MW-R0", "MW-R", "docs/a.md", "defined", "docs/a.md"], ["W11", "W", "docs/c.md", "test-pinned", "tests/both.test.ts"], ...ROWS.filter(r => r[3] === "external-unverified")];
  const docs: Docs = { "README.md": "MW-R0, W11, VC-3, B-source and PI-BM." };
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs, exists, readText: readerOf({ "docs/a.md": "MW-R0 is named here.\n", "tests/both.test.ts": "W11 MW-R0 are both named here.\n" }), contained });
  assert.deepEqual(verdict.refusals, []);
});

test("R1: at exactly three resolved ids a receipt that names all three is refused, which pins the threshold from above (HR5-D2 of the 9me85.5 hot review)", () => {
  const rows = [["MW-R0", "MW-R", "docs/a.md", "defined", "docs/a.md"], ["MW-R1", "MW-R", "docs/a.md", "defined", "docs/a.md"], ["W11", "W", "docs/c.md", "test-pinned", "tests/three.test.ts"], ...ROWS.filter(r => r[3] === "external-unverified")];
  const docs: Docs = { "README.md": "MW-R0, MW-R1, W11, VC-3, B-source and PI-BM." };
  const verdict = judgeIdMapping({ mapping: mapping(rows), docs, exists, readText: readerOf({ "docs/a.md": "MW-R0 and MW-R1 are named here.\n", "tests/three.test.ts": "W11 MW-R0 MW-R1 are all named here.\n" }), contained });
  assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"]);
  assert.match(verdict.refusals.find(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL")!.detail, /names all 3 resolved ids of the table/);
});

test("R2: the content markers refuse any receipt that carries them, including a test that imports judgeIdMapping, and the 04 document states that blast radius", () => {
  const rows = withRow("W11", ["W11", "W", "docs/c.md", "test-pinned", "tests/importing.test.ts"]);
  for (const text of ['import { judgeIdMapping } from "../scripts/check-pi-native-id-mapping.ts";\n// pins W11\n', "# Notes\n\n## Mapping table\n\nW11 is named here.\n"]) {
    const verdict = judgeIdMapping({ mapping: mapping(rows), docs: DOCS, exists, readText: readerOf({ ...receiptsFor(rows), "tests/importing.test.ts": text }), contained });
    assert.deepEqual(verdict.refusals.filter(r => r.code === "ID_MAP_RECEIPT_SELF_REFERENTIAL").map(r => r.subject), ["W11"], text);
  }
  const doc = readFileSync(resolve(root, MAPPING_DOC), "utf8");
  const section = /^## Content markers and their blast radius\r?\n([\s\S]*?)(?=^## )/m.exec(doc);
  assert.notEqual(section, null);
  for (const needle of ["judgeIdMapping", "## Mapping table", "import", "all resolved ids"]) assert.ok(section![1]!.includes(needle), needle);
});
