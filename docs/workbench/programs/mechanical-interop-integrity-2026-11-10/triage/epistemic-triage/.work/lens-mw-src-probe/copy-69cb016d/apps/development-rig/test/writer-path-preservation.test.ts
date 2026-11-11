import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// EAT-R046 (static leg): the MW post-dispatch writer path preserves workspace bytes and candidate refs
// on failure by OMISSION of any forced-removal or cleanup verb. This structure test turns that omission
// into a regression fence. The behavioral leg (dirty bytes survive a refusal, byte-exact readback) is
// carried by the post-dispatch-abort tests, not here.

const here = dirname(fileURLToPath(import.meta.url));
const rigSrc = join(here, "..", "src");

// Closed list, never a glob: the writer path is exactly these files.
const GUARDED: readonly string[] = ["live-development.ts", "claude-implement.ts", "live-gate.ts"];
// Guarded as soon as the file exists (the post-dispatch abort module lands in its own candidate).
const GUARDED_WHEN_PRESENT: readonly string[] = ["post-dispatch-abort.ts"];

// Cleanup verbs legitimately live OUTSIDE the writer path; each stays outside the guard on purpose.
const EXEMPT: ReadonlyArray<readonly [file: string, rationale: string]> = [
  ["candidate-selection.ts", "journey-owned throwaway worktrees"],
  ["landing-journey.ts", "journey-owned throwaway worktrees"],
  ["inheritance-journey.ts", "journey-owned throwaway worktrees"],
  ["workspace-materialize.ts", "removes only its own failed clone before any agent write"],
  ["installed-host.ts", "removes only its own temp root"],
];

interface Hit { readonly line: number; readonly verb: string }

const FORBIDDEN: ReadonlyArray<readonly [verb: string, pattern: RegExp]> = [
  ["fs removal", /\b(?:rm|rmSync|rmdir|rmdirSync|unlink|unlinkSync|rimraf)\b/],
  ["forced option", /\bforce\s*:\s*true\b|--force\b|--hard\b/],
  ["git verb literal", /["'`](?:checkout|reset|clean|stash|restore|worktree|rm)["'`]/],
  ["git force flag literal", /["'`](?:-f|-fd|-fdx|-df|-D)["'`]/],
  ["git shell string", /\bgit\s+(?:-C\s+\S+\s+)?(?:checkout|reset|clean|stash|restore|worktree|rm)\b/],
];

/** Scan source text line by line, skipping whole-line comments; returns every forbidden-verb hit. */
function findForbiddenVerbs(source: string): Hit[] {
  const hits: Hit[] = [];
  source.split("\n").forEach((text, index) => {
    const trimmed = text.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    for (const [verb, pattern] of FORBIDDEN) if (pattern.test(text)) hits.push({ line: index + 1, verb });
  });
  return hits;
}

function guardedFiles(): string[] {
  return [...GUARDED, ...GUARDED_WHEN_PRESENT.filter(name => existsSync(join(rigSrc, name)))];
}

test("the writer-path guard names a closed, non-vacuous file list: every guarded file exists and is non-empty", () => {
  assert.deepEqual([...GUARDED], ["live-development.ts", "claude-implement.ts", "live-gate.ts"]);
  for (const name of guardedFiles()) {
    assert.ok(existsSync(join(rigSrc, name)), `guarded writer-path file is missing: ${name}`);
    assert.ok(readFileSync(join(rigSrc, name), "utf8").trim().length > 0, `guarded writer-path file is empty: ${name}`);
  }
});

test("the MW writer path contains no forced-removal or cleanup verb, so failure preserves workspace bytes and candidate refs", () => {
  for (const name of guardedFiles()) {
    const hits = findForbiddenVerbs(readFileSync(join(rigSrc, name), "utf8"));
    assert.deepEqual(hits.map(hit => `${name}:${hit.line} ${hit.verb}`), [], `${name} carries a cleanup verb`);
  }
});

test("the exempt cleanup sites stay outside the writer path and still exist, so a rename cannot silently widen the exemption", () => {
  for (const [file, rationale] of EXEMPT) {
    assert.ok(rationale.length > 0);
    assert.ok(!guardedFiles().includes(file), `${file} is exempt and must not be guarded`);
    assert.ok(existsSync(join(rigSrc, file)), `exempt file no longer exists, review the exemption: ${file}`);
  }
});

test("the detector flags each forbidden verb form and passes the benign calls the writer path really makes", () => {
  const bad: ReadonlyArray<readonly [string, string]> = [
    ["await rm(root, { recursive: true, force: true });", "fs removal"],
    ["rmSync(root);", "fs removal"],
    ["await git(root, \"checkout\", \"--\", \".\");", "git verb literal"],
    ["await git(root, \"reset\", \"--hard\");", "git verb literal"],
    ["await git(root, \"clean\", \"-fd\");", "git verb literal"],
    ["await git(root, \"stash\");", "git verb literal"],
    ["await git(root, \"worktree\", \"remove\", \"--force\", wt);", "git verb literal"],
    ["exec(`git -C ${root} reset --hard`);", "git shell string"],
    ["await git(root, \"branch\", \"-D\", ref);", "git force flag literal"],
  ];
  for (const [line, verb] of bad) {
    assert.ok(findForbiddenVerbs(line).some(hit => hit.verb === verb), `not flagged as ${verb}: ${line}`);
  }
  const benign = [
    "await cleanGitBasis(root);",
    "git(root, \"status\", \"--porcelain=v1\", \"--untracked-files=all\"),",
    "git(root, \"rev-parse\", \"--verify\", \"HEAD\"),",
    "throw new Error(\"WORKSPACE_NOT_CLEAN: live verification requires a committed, clean candidate\");",
    "// a comment may say git reset --hard without tripping the guard",
    " * rm -rf is described here only",
  ];
  for (const line of benign) assert.deepEqual(findForbiddenVerbs(line), [], line);
  // line numbers are one-based and point at the offending line
  assert.deepEqual(findForbiddenVerbs("ok();\nrmSync(x);\nok();"), [{ line: 2, verb: "fs removal" }]);
});
