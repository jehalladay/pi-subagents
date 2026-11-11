import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// TW-EAT-R010 (MechanicalWorkflows-jc76): the TrainingWorks program documents keep the Phase 8 language
// remediations applied by MechanicalWorkflows-xsrm: exported combinator names, 'fork' defined or attributed,
// narrowed effect-resolution scope, split held-out seeds and families, guard witness distinct from liveWitness,
// 'explicit progress' defined when used, Git in the authority list, and tw.step.v1 / native / synthetic-logprob qualifiers.
const root = resolve(import.meta.dirname, "..");
const readmePath = "docs/programs/trainingworks-2026-10-18/README.md";
const compositionPath = "docs/programs/trainingworks-2026-10-18/01-composition-and-experience.md";
const combinatorsPath = "packages/coordination/src/combinators.ts";
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const COMBINATORS = ["sequential", "parallel", "guarded", "alternative", "inhibit", "repeated"] as const;

function exportedFunctionNames(source: string): string[] {
  return [...source.matchAll(/^export function (\w+)/gm)].map(match => match[1] as string);
}

function combinatorViolations(readme: string, exported: readonly string[]): string[] {
  const violations: string[] = [];
  const list = /exported combinators \(([^)]*)\)/.exec(readme)?.[1] ?? "";
  for (const name of COMBINATORS) {
    if (!exported.includes(name)) violations.push(`SOURCE_LACKS_${name}`);
    if (!new RegExp(`\\b${name}\\b`).test(list)) violations.push(`README_LACKS_${name}`);
  }
  if (!/`repeated` wrapper[^.]*excluded from composition trees/.test(readme)) violations.push("README_REPEATED_NOT_EXCLUDED");
  return violations;
}

function forkViolations(text: string): string[] {
  const violations: string[] = [];
  for (const sentence of text.split(/(?<=[.)])\s+/)) {
    if (/\bfork\b/i.test(sentence) && !/TrainingWorks vocabulary|is defined as|means /.test(sentence)) violations.push(`FORK_UNDEFINED: ${sentence.slice(0, 60)}`);
  }
  return violations;
}

function explicitProgressViolations(text: string): string[] {
  return /explicit progress/i.test(text) && !/explicit progress (means|is defined)/i.test(text) ? ["EXPLICIT_PROGRESS_UNDEFINED"] : [];
}

const readme = read(readmePath);
const composition = read(compositionPath);

test("TW-EAT-R010: README lists every exported combinator and excludes repeated from composition trees", () => {
  assert.deepEqual(combinatorViolations(readme, exportedFunctionNames(read(combinatorsPath))), []);
});

test("TW-EAT-R010: 'fork' appears only as TrainingWorks vocabulary or with a definition", () => {
  assert.deepEqual(forkViolations(readme), []);
  assert.deepEqual(forkViolations(composition), []);
});

test("TW-EAT-R010: 'explicit progress' is absent or defined", () => {
  assert.deepEqual(explicitProgressViolations(readme), []);
  assert.deepEqual(explicitProgressViolations(composition), []);
});

test("TW-EAT-R010: the authority line restores Git beside Beads, Furnace and Forge", () => {
  const line = composition.split("\n").find(row => row.startsWith("Beads retains")) ?? "";
  for (const authority of ["Beads retains", "Furnace retains", "Forge retains", "Git retains"]) assert.ok(line.includes(authority), authority);
});

test("TW-EAT-R010: the guard witness stays distinct from liveWitness", () => {
  assert.match(composition, /guard witness \(distinct from MW's liveWitness\)/);
});

test("TW-EAT-R010: effect resolution is narrowed to what reconcile() implements at HEAD", () => {
  assert.match(readme, /means what reconcile\(\) implements at HEAD/);
  assert.match(readme, /unknown dynamic effects is future work with no mechanism at HEAD/);
  assert.match(composition, /parallel effect resolution may be claimed only for budget and scope interference/);
});

test("TW-EAT-R010: held-out seeds and held-out families sit in separate clauses with the family gap stated", () => {
  const c3 = readme.split("\n").find(row => row.startsWith("C3 ")) ?? "";
  assert.match(c3, /held-out seeds and, separately, held-out families/);
  assert.match(c3, /family hold-out is possible in principle but unsupported by the harness at HEAD/);
});

test("TW-EAT-R010: tw.step.v1, native and synthetic-logprob qualifiers stay attached", () => {
  assert.match(composition, /tw\.step\.v1 is an external TrainingWorks schema that MW neither emits nor consumes at HEAD/);
  assert.match(composition, /a native grade only for replay\/live sources/);
  assert.match(readme, /every native record's logProb is the literal 'unknown'/);
  assert.match(readme, /positive control must be synthetic/);
});

test("negative control: the scanners flag each seeded defect", () => {
  const exported = [...COMBINATORS];
  assert.deepEqual(combinatorViolations("exported combinators (sequential, parallel, guarded, alternative, inhibit, repeated). The `repeated` wrapper is excluded from composition trees.", exported), []);
  assert.deepEqual(combinatorViolations("exported combinators (sequence, parallel, guarded, alternative, inhibit, repeated). The `repeated` wrapper is excluded from composition trees.", exported), ["README_LACKS_sequential"]);
  assert.deepEqual(combinatorViolations("exported combinators (sequential, parallel, guarded, alternative, inhibit). The `repeated` wrapper is excluded from composition trees.", exported), ["README_LACKS_repeated"]);
  assert.deepEqual(combinatorViolations("exported combinators (sequential, parallel, guarded, alternative, inhibit, repeated).", exported), ["README_REPEATED_NOT_EXCLUDED"]);
  assert.equal(forkViolations("A fork of the policy is verified.").length, 1);
  assert.deepEqual(forkViolations("('Fork' is TrainingWorks vocabulary, not an MW verification grade.)"), []);
  assert.deepEqual(explicitProgressViolations("The loop needs explicit progress."), ["EXPLICIT_PROGRESS_UNDEFINED"]);
  assert.deepEqual(explicitProgressViolations("Explicit progress means a strictly decreasing counter."), []);
});

// TW-EAT-R015 (MechanicalWorkflows-jaob): each external TrainingWorks program reference line in the program README carries
// a full 40-hex commit SHA and an as-of date, so a reader can tell which revision of the unreachable external repositories
// the integration statements were checked against.
const EXTERNAL_REPOS = ["jehalladay/TrainingWorks", "jehalladay/research"] as const;
const FULL_SHA = /\b[0-9a-f]{40}\b/;
const AS_OF_DATE = /\b\d{4}-\d{2}-\d{2}\b/;

// A README line may hold several links; each link owns the text up to the next github.com link (or the end of the line).
function referenceLines(text: string, repo: string): string[] {
  const segments: string[] = [];
  for (const line of text.split("\n")) {
    const parts = line.split(/(?=\[[^\]]*\]\(https:\/\/github\.com\/)/);
    for (const part of parts) if (part.includes(`https://github.com/${repo}/`)) segments.push(part);
  }
  return segments;
}

// A markdown link target ](...) is not reading evidence: its path may carry a date (compositional-competency-learning-2026-10-18).
function stripLinkTargets(text: string): string {
  return text.replace(/\]\([^)]*\)/g, "]");
}

function pinViolations(line: string): string[] {
  const violations: string[] = [];
  if (!FULL_SHA.test(line)) violations.push("NO_FULL_40_HEX_SHA");
  if (!AS_OF_DATE.test(stripLinkTargets(line))) violations.push("NO_AS_OF_DATE");
  return violations;
}


test("TW-EAT-R015: each external program reference in the README names a repository line", () => {
  for (const repo of EXTERNAL_REPOS) assert.ok(referenceLines(readme, repo).length >= 1, `README references ${repo}`);
});

test("TW-EAT-R015: every external reference line carries a full 40-hex commit SHA and an as-of date", () => {
  for (const repo of EXTERNAL_REPOS) {
    for (const line of referenceLines(readme, repo)) assert.deepEqual(pinViolations(line), [], `${repo}: ${line.slice(0, 80)}`);
  }
});

test("TW-EAT-R015 control: a line with two links is checked per link, not once per line", () => {
  const sha = "b".repeat(40);
  const line = `[A](https://github.com/jehalladay/TrainingWorks/tree/main) (pinned ${sha}, read 2026-10-19) and [B](https://github.com/jehalladay/research/tree/main) (pinned main 130e21b7a8f7, read 2026-10-19)`;
  assert.deepEqual(referenceLines(line, "jehalladay/TrainingWorks").flatMap(pinViolations), []);
  assert.deepEqual(referenceLines(line, "jehalladay/research").flatMap(pinViolations), ["NO_FULL_40_HEX_SHA"]);
});

test("TW-EAT-R015 control: an abbreviated SHA or a missing date is flagged and a full pin passes", () => {
  assert.deepEqual(pinViolations("[x](https://github.com/o/r/tree/main) (pinned main 826c9bb56bc1, read 2026-10-19)"), ["NO_FULL_40_HEX_SHA"]);
  assert.deepEqual(pinViolations(`[x](https://github.com/o/r/tree/main) (pinned main ${"a".repeat(40)})`), ["NO_AS_OF_DATE"]);
  assert.deepEqual(pinViolations(`[x](https://github.com/o/r/tree/main) (pinned main ${"a".repeat(41)}, read 2026-10-19)`), ["NO_FULL_40_HEX_SHA"]);
  assert.deepEqual(pinViolations(`[x](https://github.com/o/r/tree/main) (pinned main ${"a".repeat(40)}, read 2026-10-19)`), []);
});

// MechanicalWorkflows-xdb5 (jaob follow-up): the as-of law must not be satisfied by a date inside a link target
// (the TrainingWorks program directory name ends in 2026-10-18), and the research SHA must keep in-repo custody.
const cacReadmePath = "docs/programs/cac-workflow-composition-2026-10-18/README.md";
const cacReadme = read(cacReadmePath);
const SHA_PREFIXES: Readonly<Record<string, string>> = { "jehalladay/TrainingWorks": "826c9bb56bc1", "jehalladay/research": "130e21b7a8f7" };

function referenceSha(text: string, repo: string): string | undefined {
  return referenceLines(text, repo).map(line => FULL_SHA.exec(stripLinkTargets(line))?.[0]).find(sha => sha !== undefined);
}

function researchShaCustodyViolations(twReadme: string, otherReadme: string): string[] {
  const linked = [...new Set([...otherReadme.matchAll(/github\.com\/jehalladay\/research\/tree\/([0-9a-f]{40})\b/g)].map(match => match[1] as string))];
  const pinned = referenceSha(twReadme, "jehalladay/research");
  if (pinned === undefined) return ["NO_PINNED_RESEARCH_SHA"];
  if (linked.length !== 1) return [`OTHER_README_RESEARCH_LINKS_${linked.length}`];
  return linked[0] === pinned ? [] : ["RESEARCH_SHA_DIFFERS_FROM_OTHER_README"];
}

test("TW-EAT-R015 xdb5 W2: a date inside the link target does not satisfy the as-of law", () => {
  const sha = "a".repeat(40);
  assert.deepEqual(pinViolations(`[x](https://github.com/o/r/tree/main/docs/programs/learning-2026-10-18) (pinned main ${sha})`), ["NO_AS_OF_DATE"]);
  assert.deepEqual(pinViolations(`[x](https://github.com/o/r/tree/main/docs/programs/learning-2026-10-18) (pinned main ${sha}, read 2026-10-19)`), []);
});

test("TW-EAT-R015 xdb5 W2: the README's own TrainingWorks reference carries an as-of date outside its link target", () => {
  const [segment] = referenceLines(readme, "jehalladay/TrainingWorks");
  assert.ok(segment !== undefined);
  assert.match(stripLinkTargets(segment), AS_OF_DATE);
});

test("TW-EAT-R015 xdb5 W4: the README research SHA equals the research revision the CAC composition README links", () => {
  assert.deepEqual(researchShaCustodyViolations(readme, cacReadme), []);
  assert.equal(referenceSha(readme, "jehalladay/research"), "130e21b7a8f736263643967cf6f4eb579dcb1258");
});

test("TW-EAT-R015 xdb5 W4 control: a differing, missing or ambiguous other-README link is flagged", () => {
  const twLine = `[R](https://github.com/jehalladay/research/tree/main/p) (pinned main ${"b".repeat(40)}, read 2026-10-19)`;
  const other = (sha: string) => `see https://github.com/jehalladay/research/tree/${sha}/programs/x`;
  assert.deepEqual(researchShaCustodyViolations(twLine, other("b".repeat(40))), []);
  assert.deepEqual(researchShaCustodyViolations(twLine, other("c".repeat(40))), ["RESEARCH_SHA_DIFFERS_FROM_OTHER_README"]);
  assert.deepEqual(researchShaCustodyViolations(twLine, "no research link here"), ["OTHER_README_RESEARCH_LINKS_0"]);
  assert.deepEqual(researchShaCustodyViolations(twLine, `${other("b".repeat(40))} ${other("c".repeat(40))}`), ["OTHER_README_RESEARCH_LINKS_2"]);
  assert.deepEqual(researchShaCustodyViolations("[R](https://github.com/jehalladay/research/tree/main/p) (pinned main 130e21b7a8f7)", other("b".repeat(40))), ["NO_PINNED_RESEARCH_SHA"]);
});

test("TW-EAT-R015 xdb5 W3: each full SHA extends the 12-hex pin read on 2026-10-19", () => {
  for (const [repo, prefix] of Object.entries(SHA_PREFIXES)) {
    const sha = referenceSha(readme, repo);
    assert.ok(sha !== undefined && sha.startsWith(prefix), `${repo}: ${String(sha)} extends ${prefix}`);
  }
  assert.equal(referenceSha(`[x](https://github.com/o/r/tree/main) (pinned main ${"d".repeat(40)})`, "o/r"), "d".repeat(40));
  assert.equal(referenceSha("[x](https://github.com/o/r/tree/main) (pinned main 826c9bb56bc1)", "o/r"), undefined);
});

// MechanicalWorkflows-cu0p (xdb5 follow-up): three helper laws the xdb5 gap census proved unpinned.
test("TW-EAT-R015 cu0p W1: the README TrainingWorks full SHA equals the 40-hex custody record read on 2026-10-19", () => {
  // Custody row mirroring the research literal above: it moves only with a legitimate joint README bump.
  assert.equal(referenceSha(readme, "jehalladay/TrainingWorks"), "826c9bb56bc1ae7e56f8d81ef7830b90859f52cf");
});

test("TW-EAT-R015 cu0p W2: referenceSha ignores a full SHA that lives only inside a link target", () => {
  const line = `[x](https://github.com/o/r/tree/${"e".repeat(40)}/p) (pinned main 826c9bb56bc1, read 2026-10-19)`;
  assert.equal(referenceSha(line, "o/r"), undefined);
});

test("TW-EAT-R015 cu0p W3: a repeated identical research link in the other README counts as one revision", () => {
  const twLine = `[R](https://github.com/jehalladay/research/tree/main/p) (pinned main ${"b".repeat(40)}, read 2026-10-19)`;
  const other = (sha: string) => `see https://github.com/jehalladay/research/tree/${sha}/programs/x`;
  assert.deepEqual(researchShaCustodyViolations(twLine, `${other("b".repeat(40))} ${other("b".repeat(40))}`), []);
});
