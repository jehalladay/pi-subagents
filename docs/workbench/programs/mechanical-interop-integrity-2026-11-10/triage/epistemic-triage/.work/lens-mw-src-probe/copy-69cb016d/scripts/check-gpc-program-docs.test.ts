import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// GPC-EAT-R001 (MechanicalWorkflows-3vhn; guard gaps MechanicalWorkflows-yp06): the GraphPolicyCLI program documents
// describe GP scoring as specified-but-unimplemented design text, never state in the present tense that GP provides
// or computes it, and never walk back the dated design-only status.
const root = resolve(import.meta.dirname, "..");
const readmePath = "docs/programs/graph-policy-coordination-2026-10-18/README.md";
const overviewPath = "docs/programs/graph-policy-coordination-2026-10-18.md";
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const lines = (text: string) => text.split("\n");

// Case-insensitive and global: every present-tense claim counts, and a claim after the first one cannot hide.
const PRESENT_TENSE_CLAIM = /\b(?:GP|GraphPolicyCLI)\s+(?:now\s+|already\s+)?(?:provides|computes|scores|returns|produces)\b/gi;
const NEGATED_STATUS = /no longer|now implemented|now integrated/i;
const SPECIFIED = /is specified|program specifies/;
// The whole status shape, not substrings: a status line that negates or extends the wording does not match.
const README_STATUS = /^\*\*2026-10-18; design-only\.\*\*(?: |$)/;
const OVERVIEW_STATUS = /^\*\*Status 2026-10-18: research\/design, not integrated or verified live\.\*\*$/;

function presentTenseClaims(text: string): string[] {
  return text.match(PRESENT_TENSE_CLAIM) ?? [];
}

// Sentences are located by content, so a blank line or reflow elsewhere in the page does not move the pin.
function findLine(text: string, anchor: RegExp): string {
  return lines(text).find((line) => anchor.test(line)) ?? "";
}

const readmeOwnership = (text: string) => findLine(text, /^MechanicalWorkflows retains pure /);
const overviewStepThree = (text: string) => findLine(text, /^3\. GP /);
const statusLine = (text: string) => findLine(text, /^\*\*(?:Status )?2026-10-18/);

test("neither GPC program document states GP scoring in the present tense", () => {
  assert.deepEqual(presentTenseClaims(read(readmePath)), []);
  assert.deepEqual(presentTenseClaims(read(overviewPath)), []);
});

test("the README ownership paragraph and the overview step 3 mark GP scoring as specified, not implemented", () => {
  assert.match(readmeOwnership(read(readmePath)), SPECIFIED);
  assert.match(overviewStepThree(read(overviewPath)), SPECIFIED);
});

test("both status lines keep the whole dated design-only and not-integrated shape", () => {
  assert.match(statusLine(read(readmePath)), README_STATUS);
  assert.match(statusLine(read(overviewPath)), OVERVIEW_STATUS);
});

test("neither GPC program document upgrades the status through the negation family", () => {
  assert.deepEqual(read(readmePath).match(NEGATED_STATUS), null);
  assert.deepEqual(read(overviewPath).match(NEGATED_STATUS), null);
});

test("negative control: the scanner flags each present-tense claim form, case-insensitively", () => {
  for (const claim of [
    "GraphPolicyCLI provides typed scoring",
    "GP computes keyed pair logits",
    "GP scores keyed agent/task pairs",
    "GP now computes keyed pair logits",
    "GraphPolicyCLI already provides typed scoring",
    "GP returns keyed agent/task pair scores",
    "gp scores keyed agent/task pairs",
  ]) {
    assert.equal(presentTenseClaims(`before ${claim} after`).length, 1, claim);
  }
  assert.deepEqual(presentTenseClaims("GP is specified (TARGET; no implementation exists) to return keyed pair logits"), []);
});

test("negative control: the scanner counts every claim in one string (global flag)", () => {
  assert.equal(presentTenseClaims("GP computes logits. GraphPolicyCLI provides typed scoring.").length, 2);
  assert.equal(PRESENT_TENSE_CLAIM.flags.includes("g"), true);
});

test("negative control: the whole-shape status pins reject negated and extended status lines", () => {
  assert.match("**2026-10-18; design-only.** Links follow.", README_STATUS);
  assert.doesNotMatch("**2026-10-18; no longer design-only.** Links follow.", README_STATUS);
  assert.match("**Status 2026-10-18: research/design, not integrated or verified live.**", OVERVIEW_STATUS);
  assert.doesNotMatch("**Status 2026-10-18: research/design, now integrated and verified live.**", OVERVIEW_STATUS);
  assert.match("2026-10-18; no longer design-only.", NEGATED_STATUS);
  assert.match("GP is now implemented.", NEGATED_STATUS);
});

test("negative control: locating by content survives a blank line shift and still catches wording drift", () => {
  const readme = read(readmePath);
  const shifted = readme.replace("\n", "\n\n");
  assert.match(readmeOwnership(shifted), SPECIFIED);
  assert.match(statusLine(shifted), README_STATUS);
  const drifted = readme.replace("GraphPolicyCLI's program specifies", "GraphPolicyCLI implements");
  assert.doesNotMatch(readmeOwnership(drifted), SPECIFIED);
  assert.equal(findLine("no anchor here", /^3\. GP /), "");
});

// GPC-EAT-R015 (MechanicalWorkflows-z0hn): the external GraphPolicyCLI/MicroPolicyCLI/Research links carry a full commit SHA
// (or an explicit dated unpinned marker), and a dated note records whether GP's core program at that SHA specifies abstain.
const GITHUB_LINK = /https:\/\/github\.com\/[^\s)]+\)?(?: \(unpinned, unresolved \d{4}-\d{2}-\d{2}\))?/g;
const PINNED_PATH = /\/(tree|blob)\/[0-9a-f]{40}(\/|\)|$)/;
const UNPINNED_MARKER = /\(unpinned, unresolved \d{4}-\d{2}-\d{2}\)$/;
const ABSTAIN_NOTE = /abstain: (specified|not specified) in GraphPolicyCLI@([0-9a-f]{7,40}) on \d{4}-\d{2}-\d{2}/;

function unpinnedLinks(line: string): string[] {
  return (line.match(GITHUB_LINK) ?? []).filter((link) => !PINNED_PATH.test(link) && !UNPINNED_MARKER.test(link));
}

// The link lines are located by content (like the ownership and status lines above), so a blank line or reflow above them keeps the pins.
const readmeLinkLine = (text: string) => findLine(text, /github\.com\/jehalladay\/GraphPolicyCLI\//);
const overviewLinkLine = (text: string) => findLine(text, /github\.com\/jehalladay\/GraphPolicyCLI\/.*github\.com\/jehalladay\/MicroPolicyCLI\/.*github\.com\/jehalladay\/research\//i);
const GP_PIN = /github\.com\/jehalladay\/GraphPolicyCLI\/tree\/([0-9a-f]{40})\//;
const MP_PIN = /github\.com\/jehalladay\/MicroPolicyCLI\/tree\/([0-9a-f]{40})\)/;
const RS_PIN = /github\.com\/jehalladay\/research\/tree\/([0-9a-f]{40})\//i;
const noteLine = (text: string) => findLine(text, /^abstain: /);
// The note names a SHA prefix; the binding holds only when that prefix opens the pinned 40-hex tree SHA.
const noteBindsPin = (note: string, linkLine: string) => {
  const noteSha = ABSTAIN_NOTE.exec(note)?.[2] ?? "";
  const pinnedSha = GP_PIN.exec(linkLine)?.[1] ?? "";
  return noteSha !== "" && pinnedSha !== "" && pinnedSha.startsWith(noteSha);
};

test("every github.com link on the README link line and the overview link line is SHA-pinned or marked unpinned with a date", () => {
  const readmeLine = readmeLinkLine(read(readmePath));
  const overviewLine = overviewLinkLine(read(overviewPath));
  assert.ok((readmeLine.match(GITHUB_LINK) ?? []).length >= 1, "the README link line names at least one github.com link");
  assert.ok((overviewLine.match(GITHUB_LINK) ?? []).length >= 3, "the overview link line names the three external links");
  assert.deepEqual(unpinnedLinks(readmeLine), []);
  assert.deepEqual(unpinnedLinks(overviewLine), []);
});

test("the overview carries a dated abstain note naming the GraphPolicyCLI SHA the first link pins", () => {
  const overview = read(overviewPath);
  const note = lines(overview).find((line) => ABSTAIN_NOTE.test(line));
  assert.ok(note, "a line matching abstain: (specified|not specified) in GraphPolicyCLI@<sha> on <date>");
  assert.equal(noteBindsPin(note, overviewLinkLine(overview)), true, "the note SHA prefixes the pinned SHA");
});

test("W1: the README GraphPolicyCLI pin equals the overview GraphPolicyCLI pin", () => {
  const readmePin = GP_PIN.exec(readmeLinkLine(read(readmePath)))?.[1] ?? "";
  const overviewPin = GP_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
  assert.equal(overviewPin.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
  assert.equal(readmePin, overviewPin);
});

test("W2: the overview MicroPolicyCLI pin extends the public main the vendored provenance records", () => {
  const provenance = read("packages/coordination/schema/vendor/micropolicy/decision-receipt.v1.provenance.json");
  const custody = /public main ([0-9a-f]{12,40})/.exec(provenance)?.[1] ?? "";
  const pin = MP_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
  assert.ok(custody.length >= 12, "the provenance records a public main of at least 12 hex");
  assert.equal(pin.length, 40, "the overview link line pins MicroPolicyCLI to a 40-hex tree");
  assert.ok(pin.startsWith(custody), `pin ${pin} extends custody ${custody}`);
});

test("W3: the overview Research pin equals the research revision the CAC-WC README holds", () => {
  const custody = RS_PIN.exec(read("docs/programs/cac-workflow-composition-2026-10-18/README.md"))?.[1] ?? "";
  const pin = RS_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
  assert.equal(custody.length, 40, "the CAC-WC README pins research to 40 hex");
  assert.equal(pin, custody);
});

test("W4: the abstain note status agrees with its own search-evidence clause", () => {
  const note = noteLine(read(overviewPath));
  const status = /^abstain: (specified|not specified) in /.exec(note)?.[1] ?? "";
  assert.notEqual(status, "", "a note line opens with abstain: <status> in");
  assert.equal(status === "not specified", /finds no match/.test(note), `status ${status} disagrees with the evidence clause`);
});

test("W5: every github.com link anywhere in either GPC document is SHA-pinned or carries a dated unpinned marker", () => {
  for (const path of [readmePath, overviewPath]) {
    const bare = (read(path).match(GITHUB_LINK) ?? []).filter((link) => !PINNED_PATH.test(link) && !UNPINNED_MARKER.test(link));
    assert.deepEqual(bare, [], path);
  }
});

// Tree and blob pins, with or without a trailing path, under any owner/repo casing: the PINNED_PATH shapes plus whitespace, so no second revision enters unread.
const GP_PIN_ALL = /github\.com\/jehalladay\/GraphPolicyCLI\/(?:tree|blob)\/([0-9a-f]{40})(?=[\/)\s]|$)/gi;
// The pins in a text that differ from the bound one, so the controls below can feed WB1's enumeration a mutated document.
const foreignGpPins = (text: string, bound: string): string[] => [...text.matchAll(GP_PIN_ALL)].map((match) => match[1] ?? "").filter((pin) => pin !== bound);

test("WB1: every GraphPolicyCLI tree pin anywhere in either GPC document equals the overview link-line pin the abstain note binds", () => {
  const bound = GP_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
  assert.equal(bound.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
  for (const path of [readmePath, overviewPath]) {
    const pins = [...read(path).matchAll(GP_PIN_ALL)].map((match) => match[1]);
    assert.ok(pins.length >= 1, `${path} names at least one GraphPolicyCLI tree pin`);
    assert.deepEqual(foreignGpPins(read(path), bound), [], path);
  }
});

// Each row appends one pin form to a text that already carries the bound tree pin; WB1's enumeration must report exactly the foreign ones.
const wb1Bound = () => GP_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
const wb1Foreign = "0123456789abcdef0123456789abcdef01234567";
const wb1Rows: Array<[string, (bound: string) => string, (bound: string) => string[]]> = [
  ["the bound tree pin is not foreign", () => "", () => []],
  ["the bound blob pin is not foreign", (bound) => ` and https://github.com/jehalladay/GraphPolicyCLI/blob/${bound}/docs/x.md`, () => []],
  ["a 41-hex run is no pin (W5 reports it unpinned)", () => ` and https://github.com/jehalladay/GraphPolicyCLI/tree/${wb1Foreign}0/docs`, () => []],
  ["K1: a foreign blob pin", () => ` and https://github.com/jehalladay/GraphPolicyCLI/blob/${wb1Foreign}/docs/x.md`, () => [wb1Foreign]],
  ["K2: a foreign root-tree pin closed by a parenthesis", () => ` and (https://github.com/jehalladay/GraphPolicyCLI/tree/${wb1Foreign})`, () => [wb1Foreign]],
  ["K2: a foreign root-tree pin at the end of the text", () => ` and https://github.com/jehalladay/GraphPolicyCLI/tree/${wb1Foreign}`, () => [wb1Foreign]],
  ["K2: a foreign root-tree pin before whitespace", () => ` and https://github.com/jehalladay/GraphPolicyCLI/tree/${wb1Foreign} then`, () => [wb1Foreign]],
  ["K3: a foreign tree pin under a case-variant owner/repo", () => ` and https://github.com/JehalladAY/graphpolicycli/tree/${wb1Foreign}/docs`, () => [wb1Foreign]],
  ["K3: a foreign blob pin under a case-variant owner/repo", () => ` and https://github.com/JEHALLADAY/GraphPolicyCLI/blob/${wb1Foreign}/docs/x.md`, () => [wb1Foreign]],
];

for (const [name, suffix, expected] of wb1Rows) {
  test(`negative control: WB1's enumeration, ${name}`, () => {
    const bound = wb1Bound();
    assert.equal(bound.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
    assert.deepEqual(foreignGpPins(`see https://github.com/jehalladay/GraphPolicyCLI/tree/${bound}/docs${suffix(bound)}`, bound), expected(bound));
  });
}

test("WB2: the abstain note status agrees with the overview step 3 statement about GP's core program", () => {
  const overview = read(overviewPath);
  // Step 3 is located by content, never by line index, so a reflow above it keeps the binding.
  const stepThree = findLine(overview, /^3\. GP /);
  const status = /^abstain: (specified|not specified) in /.exec(noteLine(overview))?.[1] ?? "";
  assert.notEqual(stepThree, "", "the overview carries proposal step 3");
  assert.notEqual(status, "", "a note line opens with abstain: <status> in");
  const stepSaysNotSpecified = /GP's core program as read \d{4}-\d{2}-\d{2} does not specify an abstain status/.test(stepThree);
  assert.equal(status === "not specified", stepSaysNotSpecified, `note status ${status} disagrees with step 3`);
});

// Revision carriers that are no github.com tree or blob link: raw.githubusercontent.com/<owner>/GraphPolicyCLI/<rev>/..., codeload.github.com/<owner>/GraphPolicyCLI/tar.gz/<rev>,
// <owner>/GraphPolicyCLI@<rev> and GraphPolicyCLI@<rev>. GITHUB_LINK and GP_PIN_ALL read none of them, so each carrier here must name the bound pin or an abbreviation of it.
const GP_REV_CARRIER = /GraphPolicyCLI(?:@|\/(?:tar\.gz\/|tarball\/|zip\/|zipball\/)?)([0-9a-f]{7,})/gi;
const foreignGpRevisions = (text: string, bound: string): string[] =>
  [...text.matchAll(GP_REV_CARRIER)].map((match) => (match[1] ?? "").toLowerCase()).filter((rev) => !bound.startsWith(rev));
// The overview carries its one dated abstain note; a second line opening with the same words would contradict it where every first-line reader looks away.
const abstainLines = (text: string): string[] => lines(text).filter((line) => line.startsWith("abstain: "));

test("WB3: every GraphPolicyCLI revision carrier in either GPC document (raw permalink, archive link, owner/repo@sha, GraphPolicyCLI@sha) names the overview link-line pin or an abbreviation of it", () => {
  const bound = wb1Bound();
  assert.equal(bound.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
  assert.ok([...read(overviewPath).matchAll(GP_REV_CARRIER)].length >= 1, "the overview carries at least the abstain note's GraphPolicyCLI@<sha> carrier");
  for (const path of [readmePath, overviewPath]) {
    assert.deepEqual(foreignGpRevisions(read(path), bound), [], path);
  }
});

test("WB4: the overview carries exactly one abstain note line", () => {
  const found = abstainLines(read(overviewPath));
  assert.equal(found.length, 1, `abstain lines: ${JSON.stringify(found)}`);
  assert.match(found[0] ?? "", ABSTAIN_NOTE);
});

// Each row appends one carrier form after the bound tree pin; WB3's enumeration must report exactly the foreign revisions, lowercased.
const wb3Rows: Array<[string, (bound: string) => string, (bound: string) => string[]]> = [
  ["the abstain note's abbreviated bound revision is not foreign", (bound) => ` and GraphPolicyCLI@${bound.slice(0, 7)} on 2026-10-19`, () => []],
  ["the full bound revision in a raw permalink is not foreign", (bound) => ` and https://raw.githubusercontent.com/jehalladay/GraphPolicyCLI/${bound}/docs/program/README.md`, () => []],
  ["a run under seven hex is no carrier", () => " and jehalladay/GraphPolicyCLI@012345 on 2026-10-24", () => []],
  ["G1: a foreign raw.githubusercontent.com permalink", () => ` and https://raw.githubusercontent.com/jehalladay/GraphPolicyCLI/${wb1Foreign}/docs/program/README.md`, () => [wb1Foreign]],
  ["G2: a foreign codeload.github.com archive link", () => ` and https://codeload.github.com/jehalladay/GraphPolicyCLI/tar.gz/${wb1Foreign}`, () => [wb1Foreign]],
  ["G2: a foreign zip archive link", () => ` and https://codeload.github.com/jehalladay/GraphPolicyCLI/zip/${wb1Foreign}`, () => [wb1Foreign]],
  ["W1: a foreign api.github.com tarball link", () => ` and https://api.github.com/repos/jehalladay/GraphPolicyCLI/tarball/${wb1Foreign}`, () => [wb1Foreign]],
  ["W2: a foreign api.github.com zipball link", () => ` and https://api.github.com/repos/jehalladay/GraphPolicyCLI/zipball/${wb1Foreign}`, () => [wb1Foreign]],
  ["the full bound revision in a tarball link is not foreign", (bound) => ` and https://api.github.com/repos/jehalladay/GraphPolicyCLI/tarball/${bound}`, () => []],
  ["G3: a foreign owner/repo@sha reference", () => ` and jehalladay/GraphPolicyCLI@${wb1Foreign}.`, () => [wb1Foreign]],
  ["a foreign bare GraphPolicyCLI@sha reference", () => ` and GraphPolicyCLI@${wb1Foreign} on 2026-10-24`, () => [wb1Foreign]],
  ["a foreign abbreviated revision", () => " and GraphPolicyCLI@0123456 on 2026-10-24", () => ["0123456"]],
  ["an upper-case foreign revision is reported lower-cased", () => ` and jehalladay/GraphPolicyCLI@${wb1Foreign.toUpperCase()}`, () => [wb1Foreign]],
  ["a mid-string slice of the bound revision is no abbreviation of it", (bound) => ` and GraphPolicyCLI@${bound.slice(1, 9)}`, (bound) => [bound.slice(1, 9)]],
  ["a 41-hex run is no abbreviation of the bound revision", (bound) => ` and jehalladay/GraphPolicyCLI@${bound}0`, (bound) => [`${bound}0`]],
];

for (const [name, suffix, expected] of wb3Rows) {
  test(`negative control: WB3's enumeration, ${name}`, () => {
    const bound = wb1Bound();
    assert.equal(bound.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
    assert.deepEqual(foreignGpRevisions(`see https://github.com/jehalladay/GraphPolicyCLI/tree/${bound}/docs${suffix(bound)}`, bound), expected(bound));
  });
}

test("negative control: WB4's count reports a second abstain line and ignores indented or mid-line wording", () => {
  const note = "abstain: not specified in GraphPolicyCLI@f2fb7b8 on 2026-10-19 (a case-insensitive search of docs/program at that commit finds no match)";
  const second = `abstain: specified in GraphPolicyCLI@${wb1Foreign} on 2026-10-24 (a case-insensitive search of docs/program at that commit finds a match)`;
  assert.deepEqual(abstainLines(`intro\n${note}\nclose\n`), [note]);
  assert.deepEqual(abstainLines(`intro\n${note}\n${second}\n`), [note, second]);
  assert.deepEqual(abstainLines(`intro\n  ${note}\nthe abstain: marker mid-line\n`), []);
  assert.deepEqual(abstainLines(""), []);
});

test("negative control: the link scanner flags a bare branch link and accepts a dated unpinned marker", () => {
  assert.deepEqual(unpinnedLinks("[GP](https://github.com/o/r/tree/main/docs)"), ["https://github.com/o/r/tree/main/docs)"]);
  assert.deepEqual(unpinnedLinks("[GP](https://github.com/o/r/tree/main/docs) (unpinned, unresolved 2026-10-19)"), []);
  assert.deepEqual(unpinnedLinks(`[GP](https://github.com/o/r/tree/${"a".repeat(40)}/docs)`), []);
  assert.deepEqual(unpinnedLinks(`[GP](https://github.com/o/r/tree/${"a".repeat(39)}/docs)`), ["https://github.com/o/r/tree/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/docs)"]);
  assert.equal(ABSTAIN_NOTE.test("abstain: unknown in GraphPolicyCLI@f2fb7b8 on 2026-10-19"), false);
  assert.equal(ABSTAIN_NOTE.test("abstain: not specified in GraphPolicyCLI@f2fb7b8 on 2026-10-19"), true);
});

test("negative control: a 41-hex tree run is reported unpinned", () => {
  assert.deepEqual(unpinnedLinks(`[GP](https://github.com/o/r/tree/${"a".repeat(41)}/docs)`), [`https://github.com/o/r/tree/${"a".repeat(41)}/docs)`]);
});

test("negative control: a note SHA that does not prefix the pinned SHA fails the binding", () => {
  const pin = "f2fb7b896a6e6cac85f69099d93ebad1dad4c0a2";
  const link = `[GP](https://github.com/jehalladay/GraphPolicyCLI/tree/${pin}/docs/program)`;
  assert.equal(noteBindsPin("abstain: not specified in GraphPolicyCLI@f2fb7b8 on 2026-10-19", link), true);
  assert.equal(noteBindsPin(`abstain: not specified in GraphPolicyCLI@${pin} on 2026-10-19`, link), true);
  assert.equal(noteBindsPin("abstain: not specified in GraphPolicyCLI@0000000 on 2026-10-19", link), false);
  assert.equal(noteBindsPin("abstain: not specified in GraphPolicyCLI@f2fb7b8 on 2026-10-19", "no link here"), false);
});

test("negative control: locating the link lines by content survives a blank line above them and still catches a bare branch link", () => {
  const readme = read(readmePath);
  const overview = read(overviewPath);
  assert.equal(readmeLinkLine(readme.replace("\n", "\n\n")), readmeLinkLine(readme));
  assert.equal(overviewLinkLine(overview.replace("\n", "\n\n")), overviewLinkLine(overview));
  assert.notEqual(overviewLinkLine(overview), "");
  const bare = overview.replace(/GraphPolicyCLI\/tree\/[0-9a-f]{40}\//, "GraphPolicyCLI/tree/main/");
  assert.equal(unpinnedLinks(overviewLinkLine(bare)).length, 1);
  assert.equal(overviewLinkLine("no links here"), "");
});

// Document-wide revision law (wady, WB5): the only 40-hex runs in either GPC document are the three link-line pins (GraphPolicyCLI, MicroPolicyCLI, Research),
// whatever form carries them (http:// commit link, a link under a dated unpinned marker, github:owner/repo#sha, prose 'GraphPolicyCLI commit <sha>').
// A run of 40 or more hex digits counts whole, so a 41-hex run is reported rather than read as a 40-hex prefix of itself.
const HEX_RUN = /(?<![0-9a-f])[0-9a-f]{40,}(?![0-9a-f])/gi;
const foreignHexRuns = (text: string, allowed: string[]): string[] =>
  (text.match(HEX_RUN) ?? []).map((run) => run.toLowerCase()).filter((run) => !allowed.includes(run));
const linkLinePins = (): string[] => {
  const line = overviewLinkLine(read(overviewPath));
  return [GP_PIN.exec(line)?.[1], MP_PIN.exec(line)?.[1], RS_PIN.exec(line)?.[1]].map((pin) => (pin ?? "").toLowerCase());
};

test("WB5: every 40-hex run in either GPC document is one of the three overview link-line pins", () => {
  const pins = linkLinePins();
  for (const pin of pins) {
    assert.equal(pin.length, 40, "the overview link line pins GraphPolicyCLI, MicroPolicyCLI and Research to 40-hex trees");
  }
  assert.equal(new Set(pins).size, 3, "the three link-line pins are distinct revisions");
  const seen = new Set<string>();
  for (const path of [readmePath, overviewPath]) {
    const text = read(path);
    assert.deepEqual(foreignHexRuns(text, pins), [], path);
    for (const run of text.match(HEX_RUN) ?? []) seen.add(run.toLowerCase());
  }
  assert.deepEqual([...seen].sort(), [...pins].sort(), "the two documents carry each pin at least once, so the law reads real runs");
});

// Each row appends one revision form after the bound text; WB5's enumeration must report exactly the foreign 40-hex runs, lowercased.
const w4Pins = ["a".repeat(40), "b".repeat(40), "c".repeat(40)];
const w4Rows: Array<[string, string, string[]]> = [
  ["a pin alone is not foreign", `pinned ${w4Pins[0]} here`, []],
  ["all three pins are not foreign", `${w4Pins.join(" ")}`, []],
  ["a 7-hex abbreviation is no 40-hex run", "GraphPolicyCLI@0123456 on 2026-10-24", []],
  ["a 39-hex run is no 40-hex run", `GraphPolicyCLI commit ${wb1Foreign.slice(1)}`, []],
  ["H1: a foreign http:// commit link", `[GP](http://github.com/jehalladay/GraphPolicyCLI/commit/${wb1Foreign})`, [wb1Foreign]],
  ["H2: a foreign commit link under a dated unpinned marker", `[GP](https://github.com/jehalladay/GraphPolicyCLI/commit/${wb1Foreign}) (unpinned, unresolved 2026-10-24)`, [wb1Foreign]],
  ["H3: a foreign github: shorthand", `npm i github:jehalladay/GraphPolicyCLI#${wb1Foreign}`, [wb1Foreign]],
  ["H5: a foreign prose commit hash", `GraphPolicyCLI commit ${wb1Foreign} is the reference`, [wb1Foreign]],
  ["an upper-case foreign run is reported lower-cased", `GraphPolicyCLI commit ${wb1Foreign.toUpperCase()}`, [wb1Foreign]],
  ["a 41-hex run is reported whole, not read as a pin prefix", `GraphPolicyCLI commit ${w4Pins[0]}0`, [`${w4Pins[0]}0`]],
  ["two foreign runs are both reported in order", `${wb1Foreign} then ${"d".repeat(40)}`, [wb1Foreign, "d".repeat(40)]],
];

for (const [name, text, expected] of w4Rows) {
  test(`negative control: WB5's enumeration, ${name}`, () => {
    assert.deepEqual(foreignHexRuns(text, w4Pins), expected);
  });
}

// Abbreviated revision law (MechanicalWorkflows-8dbh3; seat ruling bhbb OPTION A, owner-agnostic; lead wady): WB5 reads 40-hex runs only and WB3's carrier stops at
// @, raw / and the archive forms, so a revision of 7 to 39 hex in one of four other carrier forms entered either GPC document unread. Each law reads one form whatever
// the owner, and every lower-cased capture must prefix the overview link-line GraphPolicyCLI pin, so the bound pin and its abbreviations pass and no second revision enters.
const ABBREVIATED_CARRIERS: Array<[string, RegExp]> = [
  ["commit link", /GraphPolicyCLI\/commit\/([0-9a-f]{7,})/gi],
  ["github: shorthand", /GraphPolicyCLI#([0-9a-f]{7,})/gi],
  ["prose commit", /GraphPolicyCLI\s+commit\s+([0-9a-f]{7,})/gi],
  ["tree or blob link", /GraphPolicyCLI\/(?:tree|blob)\/([0-9a-f]{7,})/gi],
];
const unboundAbbreviations = (text: string, carrier: RegExp, bound: string): string[] =>
  [...text.matchAll(carrier)].map((match) => (match[1] ?? "").toLowerCase()).filter((rev) => !bound.startsWith(rev));

for (const [form, carrier] of ABBREVIATED_CARRIERS) {
  test(`WB6: every GraphPolicyCLI ${form} revision of 7 or more hex in either GPC document prefixes the overview link-line pin`, () => {
    const bound = GP_PIN.exec(overviewLinkLine(read(overviewPath)))?.[1] ?? "";
    assert.equal(bound.length, 40, "the overview link line pins GraphPolicyCLI to a 40-hex tree");
    for (const path of [readmePath, overviewPath]) {
      assert.deepEqual(unboundAbbreviations(read(path), carrier, bound), [], path);
    }
  });
}

// Each row feeds one carrier form a text with a foreign or bound revision; the enumeration must report exactly the foreign captures, lower-cased.
const wb6Bound = "f2fb7b896a6e6cac85f69099d93ebad1dad4c0a2";
const wb6Foreign = "fedcba9";
const wb6Texts: Array<[string, (rev: string) => string]> = [
  ["commit link", (rev) => `[GP](http://github.com/jehalladay/GraphPolicyCLI/commit/${rev})`],
  ["github: shorthand", (rev) => `npm i github:jehalladay/GraphPolicyCLI#${rev}`],
  ["prose commit", (rev) => `GraphPolicyCLI commit ${rev} is the reference`],
  ["tree or blob link", (rev) => `[GP](https://github.com/jehalladay/GraphPolicyCLI/tree/${rev}/docs) (unpinned, unresolved 2026-10-24)`],
];

for (const [form, carrier] of ABBREVIATED_CARRIERS) {
  const render = wb6Texts.find(([name]) => name === form)?.[1] ?? ((rev: string) => rev);
  test(`negative control: WB6's ${form} law reports a foreign 7-hex, 39-hex and 40-hex revision`, () => {
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign), carrier, wb6Bound), [wb6Foreign]);
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign.repeat(6).slice(0, 39)), carrier, wb6Bound), [wb6Foreign.repeat(6).slice(0, 39)]);
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign.repeat(6).slice(0, 40)), carrier, wb6Bound), [wb6Foreign.repeat(6).slice(0, 40)]);
  });
  test(`positive control: WB6's ${form} law accepts the bound pin and its 7-hex abbreviation in any case, and reports an upper-case foreign revision lower-cased`, () => {
    assert.deepEqual(unboundAbbreviations(render(wb6Bound), carrier, wb6Bound), []);
    assert.deepEqual(unboundAbbreviations(render(wb6Bound.slice(0, 7)), carrier, wb6Bound), []);
    assert.deepEqual(unboundAbbreviations(render(wb6Bound.slice(0, 7).toUpperCase()), carrier, wb6Bound), []);
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign.toUpperCase()), carrier, wb6Bound), [wb6Foreign]);
  });
  test(`negative control: WB6's ${form} law reads a 6-hex run as no revision and reads a foreign owner the same as the program owner where the form names one`, () => {
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign.slice(0, 6)), carrier, wb6Bound), []);
    assert.deepEqual(unboundAbbreviations(render(wb6Foreign).replace("jehalladay", "someoneelse"), carrier, wb6Bound), [wb6Foreign]);
  });
}

test("WB6: the tree or blob law reads real carriers, so each GPC document carries at least one GraphPolicyCLI tree or blob revision", () => {
  const carrier = ABBREVIATED_CARRIERS.find(([form]) => form === "tree or blob link")?.[1] ?? /(?!)/g;
  for (const path of [readmePath, overviewPath]) {
    assert.ok([...read(path).matchAll(carrier)].length >= 1, path);
  }
});
