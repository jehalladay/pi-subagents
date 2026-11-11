import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, cpSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(import.meta.dirname, "..");
function fixture<T>(fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-docs-check-"));
  try {
    for (const dir of ["docs", "packages", "apps", "contracts", "qa", "skills", ".agents"]) cpSync(join(source, dir), join(root, dir), { recursive: true, filter: path => !path.includes("node_modules") && !path.includes("/dist/") });
    for (const file of ["README.md", "AGENTS.md", "LICENSE"]) cpSync(join(source, file), join(root, file));
    mkdirSync(join(root, "scripts"));
    cpSync(join(source, "scripts/check-docs.ts"), join(root, "scripts/check-docs.ts"));
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function check(root: string) { return spawnSync(process.execPath, [join(root, "scripts/check-docs.ts")], { cwd: root, encoding: "utf8" }); }
test("docs gate reads valid contract and QA markdown", () => fixture(root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("docs gate rejects broken contract link", () => fixture(root => {
  writeFileSync(join(root, "contracts", "broken.md"), "# Broken contract\n\n[missing](./not-here.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK.*contracts\/broken.md/);
}));
test("docs gate rejects empty QA page", () => fixture(root => {
  writeFileSync(join(root, "qa", "empty.md"), " ");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/empty.md/);
}));
test("docs gate reports a malformed percent-escape link target and keeps scanning", () => fixture(root => {
  mkdirSync(join(root, "docs"), { recursive: true });
  writeFileSync(join(root, "docs", "pct.md"), "# Pct\n\n[x](budget-100%.md)\n");
  writeFileSync(join(root, "qa", "empty.md"), " ");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.doesNotMatch(p.stderr, /URIError/);
  assert.match(p.stderr, /DOC_MALFORMED_LINK_TARGET.*docs\/pct.md.*budget-100%.md/);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/empty.md/);
}));
test("pin c7 e1: a malformed percent-escape link alone fails the docs gate", () => fixture(root => {
  writeFileSync(join(root, "docs", "pct-only.md"), "# Pct\n\n[x](budget-100%.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_MALFORMED_LINK_TARGET.*docs\/pct-only.md.*budget-100%.md/);
}));
test("pin c7 e2: a malformed link does not hide a later broken link in the same file", () => fixture(root => {
  writeFileSync(join(root, "docs", "pct-two.md"), "# Pct\n\n[x](budget-100%.md)\n\n[y](./not-here.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_MALFORMED_LINK_TARGET.*docs\/pct-two.md/);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK.*docs\/pct-two.md.*not-here.md/);
}));
test("pin c7 e3: a valid percent-escape link to an existing file passes", () => fixture(root => {
  writeFileSync(join(root, "docs", "a b.md"), "# A b\n");
  writeFileSync(join(root, "docs", "pct-ok.md"), "# Pct ok\n\n[x](a%20b.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("docs gate rejects a non-blank page without a leading heading", () => fixture(root => {
  writeFileSync(join(root, "qa", "no-heading.md"), "No heading here\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/no-heading.md/);
}));
test("docs gate scans nested markdown below a scanned directory", () => fixture(root => {
  mkdirSync(join(root, "docs", "nested", "deeper"), { recursive: true });
  writeFileSync(join(root, "docs", "nested", "deeper", "broken.md"), "# Nested\n\n[missing](./not-here.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK.*docs\/nested\/deeper\/broken.md/);
}));
test("docs gate rejects a page whose first heading follows other text", () => fixture(root => {
  writeFileSync(join(root, "qa", "late-heading.md"), "Intro line\n\n# Late heading\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/late-heading.md/);
}));
test("pin i285 t1: a double-quoted CommonMark link title does not become part of the path", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "titled-dq.md"), "# Titled\n\n[x](./present.md \"Contract and testing\")\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin i285 t1: single-quoted and parenthesised link titles pass for an existing target", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "titled-sq.md"), "# Titled\n\n[x](./present.md 'Single title')\n\n[y](./present.md (Paren title))\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin i285 t1: a title containing a hash does not leak into the target", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "titled-hash.md"), "# Titled\n\n[x](./present.md \"issue #12 notes\")\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin i285 t1: a titled link to a missing file still fails and reports the bare target", () => fixture(root => {
  writeFileSync(join(root, "docs", "titled-broken.md"), "# Titled\n\n[x](./not-here.md \"Some title\")\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/titled-broken.md -> \.\/not-here\.md\r?\n/);
  assert.doesNotMatch(p.stderr, /Some title/);
}));
test("pin i285 f1: fragments stay unvalidated by design, so a bogus fragment on an existing file passes", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "frag.md"), "# Frag\n\n[x](./present.md#no-such-section)\n\n[y](./present.md#no-such-section \"Titled\")\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.doesNotMatch(p.stderr, /ANCHOR/);
}));
test("pin i285 f1: a fragment never excuses a missing file", () => fixture(root => {
  writeFileSync(join(root, "docs", "frag-broken.md"), "# Frag\n\n[x](./not-here.md#section)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/frag-broken.md -> \.\/not-here\.md\r?\n/);
}));
test("pin p4zn a1: a first line '#Word' without the ATX space is not a heading", () => fixture(root => {
  writeFileSync(join(root, "qa", "hash-word.md"), "#Word\n\ntext\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/hash-word.md/);
}));
test("pin p4zn a2: a level-two heading on the first line passes", () => fixture(root => {
  writeFileSync(join(root, "qa", "h2-first.md"), "## Second level\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin p4zn a2b: a bare '#' first line and a seven-hash first line follow the ATX rule", () => fixture(root => {
  writeFileSync(join(root, "qa", "bare-hash.md"), "#\n\ntext\n");
  writeFileSync(join(root, "qa", "seven-hash.md"), "####### Too deep\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.doesNotMatch(p.stderr, /bare-hash/);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING.*qa\/seven-hash.md/);
}));
test("pin p4zn a3: a reference definition to a missing file fails with the bare target", () => fixture(root => {
  writeFileSync(join(root, "docs", "ref-missing.md"), "# Ref\n\n[text][r1]\n\n[r1]: ./not-here.md\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/ref-missing.md -> \.\/not-here\.md\r?\n/);
}));
test("pin p4zn a4: reference definitions to an existing file pass, titled or not", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "ref-ok.md"), "# Ref\n\n[a][r1] and [b][r2]\n\n[r1]: ./present.md\n[r2]: ./present.md \"T\"\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin p4zn a4b: a reference definition keeps the malformed-escape and fragment policies", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "ref-frag.md"), "# Ref\n\n[r1]: ./present.md#no-such-section\n");
  writeFileSync(join(root, "docs", "ref-pct.md"), "# Ref\n\n[r2]: budget-100%.md\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.doesNotMatch(p.stderr, /ref-frag/);
  assert.match(p.stderr, /DOC_MALFORMED_LINK_TARGET: docs\/ref-pct.md -> budget-100%\.md/);
}));
test("pin p4zn a5: an angle-bracket destination to an existing file passes and a missing one still fails", () => fixture(root => {
  writeFileSync(join(root, "docs", "present.md"), "# Present\n");
  writeFileSync(join(root, "docs", "angle.md"), "# Angle\n\n[x](<./present.md>)\n\n[y](<./present.md> \"T\")\n");
  let p = check(root);
  assert.equal(p.status, 0, p.stderr);
  writeFileSync(join(root, "docs", "angle-broken.md"), "# Angle\n\n[x](<./not-here.md>)\n");
  p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/angle-broken.md -> \.\/not-here\.md\r?\n/);
}));
test("pin p4zn a6: link-like text inside a code span or fenced block never counts, a real link outside still does", () => fixture(root => {
  const fence = "```";
  const body = `# Span\n\nA span \`[d](./missing.md)\` here.\n\n${fence}\n[e](./missing-too.md)\n[r]: ./missing-ref.md\n${fence}\n`;
  writeFileSync(join(root, "docs", "span.md"), body);
  let p = check(root);
  assert.equal(p.status, 0, p.stderr);
  writeFileSync(join(root, "docs", "span-broken.md"), `${body}\n[f](./missing-three.md)\n`);
  p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/span-broken.md -> \.\/missing-three\.md\r?\n/);
  assert.doesNotMatch(p.stderr, /missing\.md|missing-too|missing-ref/);
}));
test("pin 0ay4 r1: stray single backticks in different paragraphs do not swallow a broken link between them", () => fixture(root => {
  writeFileSync(join(root, "docs", "stray.md"), "# P\n\nstray ` here\n\nz [x](./not-here.md)\n\nanother ` end\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/stray.md -> \.\/not-here\.md\r?\n/);
}));
test("pin 0ay4 r1b: a code span still hides a link when it stays inside one paragraph, soft line break included", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-one-para.md"), "# P\n\nsee `[x](./missing.md)` and `a\n[y](./missing-two.md) b` here\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 0ay4 m1: a double-backtick span holding a single backtick hides its link, so a closing run must match the opening length", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-double.md"), "# P\n\n``a ` [x](./missing.md) b``\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 0ay4 m1b: a single-backtick span does not close at a double-backtick run inside it", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-single.md"), "# P\n\n`a `` [x](./missing.md) b`\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 0ay4 m2: a four-backtick fence is not closed by a three-backtick line", () => fixture(root => {
  const body = "# P\n\n````\n```\n[e](./missing.md)\n````\n";
  writeFileSync(join(root, "docs", "fence-long.md"), body);
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  writeFileSync(join(root, "docs", "fence-long-broken.md"), `${body}\n[f](./not-here.md)\n`);
  const q = check(root);
  assert.notEqual(q.status, 0);
  assert.match(q.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/fence-long-broken.md -> \.\/not-here\.md\r?\n/);
}));
test("pin 0ay4 m3: a tilde fence is stripped and a link after its close still counts", () => fixture(root => {
  const body = "# P\n\n~~~\n[e](./missing.md)\n~~~\n";
  writeFileSync(join(root, "docs", "tilde.md"), body);
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  writeFileSync(join(root, "docs", "tilde-broken.md"), `${body}\n[f](./not-here.md)\n`);
  const q = check(root);
  assert.notEqual(q.status, 0);
  assert.match(q.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/tilde-broken.md -> \.\/not-here\.md\r?\n/);
}));
test("pin 0ay4 r2: a tilde line does not close a backtick fence", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-mixed.md"), "# P\n\n```\n~~~\n[e](./missing.md)\n```\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 0ay4 r2b: a closing line mixing backticks and tildes does not close a backtick fence", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-mixed-run.md"), "# P\n\n```\n```~~~\n[e](./missing.md)\n```\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 0ay4 r3: a definition with an angle destination holding a space resolves the whole path", () => fixture(root => {
  writeFileSync(join(root, "docs", "my file.md"), "# My file\n");
  writeFileSync(join(root, "docs", "def-space.md"), "# Def\n\n[r1]: <./my file.md>\n[r2]: <./my file.md> \"T\"\n");
  let p = check(root);
  assert.equal(p.status, 0, p.stderr);
  writeFileSync(join(root, "docs", "def-space-broken.md"), "# Def\n\n[r3]: <./not here.md>\n");
  p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/def-space-broken.md -> \.\/not here\.md\r?\n/);
}));
test("pin 8hoo g1: an ATX heading whose opener is followed by a tab is a valid first heading", () => fixture(root => {
  writeFileSync(join(root, "docs", "tab-heading.md"), "#\tTab heading\n\ntext\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 8hoo g2: a reference definition indented three spaces is still checked", () => fixture(root => {
  writeFileSync(join(root, "docs", "def-indent.md"), "# Def\n\n   [r1]: ./not-here-w2.md\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/def-indent.md -> \.\/not-here-w2\.md\r?\n/);
}));
test("pin 8hoo g5: a titled reference definition to a missing file fails with the bare target", () => fixture(root => {
  writeFileSync(join(root, "docs", "def-titled.md"), "# Def\n\n[r1]: ./not-here-w5.md \"T\"\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/def-titled.md -> \.\/not-here-w5\.md\r?\n/);
}));
test("pin suzt k1f: a line indented four spaces never closes a fence, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-indented-close.md"), "# Fence\n\n```\n    ```\n[e](./missing-k1f.md)\n```\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin suzt k1g: a closing fence followed by spaces still closes, so a broken link after it counts", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-trailing-close.md"), "# Fence\n\n```\n[e](./missing-k1g.md)\n```   \n\n[f](./not-here-k1g.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/fence-trailing-close.md -> \.\/not-here-k1g\.md\r?\n/);
  assert.doesNotMatch(p.stderr, /missing-k1g\.md/);
}));
test("pin suzt k2a: a whitespace-only line ends a paragraph, so stray backticks around it do not hide a broken link", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-ws-blank.md"), "# Span\n\nstray ` here\n   \nz [x](./not-here-k2a.md)\n \t\nanother ` end\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/span-ws-blank.md -> \.\/not-here-k2a\.md\r?\n/);
}));
test("pin suzt k2f: a broken link between two code spans of one paragraph still counts", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-two.md"), "# Span\n\nsee `a` then [x](./not-here-k2f.md) then `b` end\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/span-two.md -> \.\/not-here-k2f\.md\r?\n/);
}));
test("pin 13d7 ow1: an ATX opener followed by a no-break space or a form feed is not a heading", () => fixture(root => {
  writeFileSync(join(root, "docs", "nbsp-heading.md"), "# Title\n\ntext\n");
  writeFileSync(join(root, "docs", "ff-heading.md"), "#\fTitle\n\ntext\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING: docs\/nbsp-heading\.md\r?\n/);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING: docs\/ff-heading\.md\r?\n/);
}));
test("pin 13d7 ow2: a definition-like line indented four spaces or a tab is indented code, not a definition", () => fixture(root => {
  writeFileSync(join(root, "docs", "def-indent-four.md"), "# Def\n\ntext\n\n    [r]: ./missing-ow2-four.md\n");
  writeFileSync(join(root, "docs", "def-indent-tab.md"), "# Def\n\ntext\n\n\t[r]: ./missing-ow2-tab.md\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 13d7 ow3: single-quoted and parenthesised titled definitions to a missing file fail with the bare target", () => fixture(root => {
  writeFileSync(join(root, "docs", "def-title-forms.md"), "# Def\n\n[r1]: ./missing-ow3.md 'T'\n[r2]: ./missing-ow3b.md (T)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/def-title-forms\.md -> \.\/missing-ow3\.md\r?\n/);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/def-title-forms\.md -> \.\/missing-ow3b\.md\r?\n/);
}));
test("pin 6nun n1: a closing fence indented one or three spaces still closes, so a broken link after it counts", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-close-indent-one.md"), "# Fence\n\n```\n[e](./missing-n1a.md)\n ```\n\n[f](./not-here-n1a.md)\n");
  writeFileSync(join(root, "docs", "fence-close-indent-three.md"), "# Fence\n\n```\n[e](./missing-n1b.md)\n   ```\n\n[f](./not-here-n1b.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/fence-close-indent-one\.md -> \.\/not-here-n1a\.md\r?\n/);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/fence-close-indent-three\.md -> \.\/not-here-n1b\.md\r?\n/);
  assert.doesNotMatch(p.stderr, /missing-n1[ab]\.md/);
}));
test("pin 6nun n2: a closing fence followed by a tab still closes, so a broken link after it counts", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-close-tab.md"), "# Fence\n\n```\n[e](./missing-n2.md)\n```\t\n\n[f](./not-here-n2.md)\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/fence-close-tab\.md -> \.\/not-here-n2\.md\r?\n/);
  assert.doesNotMatch(p.stderr, /missing-n2\.md/);
}));
test("pin 6nun n3: a tab-only line ends a paragraph, so stray backticks around it do not hide a broken link", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-tab-blank.md"), "# Span\n\nstray ` here\n\t\nz [x](./not-here-n3.md)\n\t\nanother ` end\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/span-tab-blank\.md -> \.\/not-here-n3\.md\r?\n/);
}));
test("pin 6nun n5: a closing fence followed by a no-break space does not close, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "fence-close-nbsp.md"), "# Fence\n\n```\n[e](./missing-n5.md)\n``` \n\n[f](./not-here-n5.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin 6nun n6: a no-break-space-only line is not blank, so a code span spans it and hides a link", () => fixture(root => {
  writeFileSync(join(root, "docs", "span-nbsp-line.md"), "# Span\n\nstray ` here\n \nz [x](./not-here-n6.md)\n \nanother ` end\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin cljh wo1: a vertical tab after the hashes does not open a heading", () => fixture(root => {
  writeFileSync(join(root, "docs", "wo1-vt-heading.md"), "#\vTitle\n\ntext\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING: docs\/wo1-vt-heading\.md\r?\n/);
}));
test("pin cljh wo2: an ideographic space after the hashes does not open a heading", () => fixture(root => {
  writeFileSync(join(root, "docs", "wo2-ideographic-heading.md"), "#　Title\n\ntext\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_EMPTY_OR_MISSING_HEADING: docs\/wo2-ideographic-heading\.md\r?\n/);
}));
test("pin cljh wo3: a definition-like line indented by a no-break space is paragraph text, so its missing target is not reported", () => fixture(root => {
  writeFileSync(join(root, "docs", "wo3-nbsp-indent.md"), "# Def\n\ntext\n\n [r]: ./missing-wo3.md\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin cljh wc1: a reference definition with no space after the colon to a missing file fails with the bare target", () => fixture(root => {
  writeFileSync(join(root, "docs", "wc1-def-nospace.md"), "# Def\n\n[r1]:./missing-wc1.md\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_BROKEN_LOCAL_LINK: docs\/wc1-def-nospace\.md -> \.\/missing-wc1\.md\r?\n/);
}));
test("pin uic0 wu2: a closing fence indented by a tab does not close, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "wu2-tab-indent-close.md"), "# Fence\n\n```\n[e](./missing-wu2.md)\n\t```\n\n[f](./not-here-wu2.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin uic0 wu3: a closing fence indented by a no-break space does not close, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "wu3-nbsp-indent-close.md"), "# Fence\n\n```\n[e](./missing-wu3.md)\n\u00a0```\n\n[f](./not-here-wu3.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin uic0 wv3a: a closing fence followed by a form feed does not close, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "wv3a-ff-close.md"), "# Fence\n\n```\n[e](./missing-wv3a.md)\n```\f\n\n[f](./not-here-wv3a.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin uic0 wv3b: a closing fence followed by an ideographic space does not close, so a link after it stays hidden", () => fixture(root => {
  writeFileSync(join(root, "docs", "wv3b-idsp-close.md"), "# Fence\n\n```\n[e](./missing-wv3b.md)\n```\u3000\n\n[f](./not-here-wv3b.md)\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin uic0 wb2a: a form-feed-only line is not blank, so a code span spans it and hides a link", () => fixture(root => {
  writeFileSync(join(root, "docs", "wb2a-ff-line.md"), "# Span\n\nstray ` here\n\f\nz [x](./not-here-wb2a.md)\n\f\nanother ` end\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("pin uic0 wb2b: an ideographic-space-only line is not blank, so a code span spans it and hides a link", () => fixture(root => {
  writeFileSync(join(root, "docs", "wb2b-idsp-line.md"), "# Span\n\nstray ` here\n\u3000\nz [x](./not-here-wb2b.md)\n\u3000\nanother ` end\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
