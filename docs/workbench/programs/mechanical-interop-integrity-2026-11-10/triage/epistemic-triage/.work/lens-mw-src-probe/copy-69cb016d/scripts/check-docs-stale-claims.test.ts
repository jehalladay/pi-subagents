import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

// EAT-R026 / EAT-R057 stale present-tense claim denylist, shrink-only ratchet (MechanicalWorkflows-t32qk).
const source = resolve(import.meta.dirname, "..");
const SCRIPT = "check-docs-stale-claims.ts";
const BASELINE = "check-docs-stale-claims.baseline.json";

/** One denylisted literal per row; `spelled` is the text a fixture doc carries. */
const LITERALS: { literal: string; spelled: string }[] = [
  { literal: "does not currently match", spelled: "The descriptor does not currently match the loader." },
  { literal: "historical metadata", spelled: "`status: descriptor-only` is historical metadata, not a claim." },
  { literal: "historical descriptor metadata", spelled: "That field is historical descriptor metadata only." },
  { literal: "measured ingredients", spelled: "It depends only on these measured ingredients." },
  { literal: "already measured", spelled: "The Git census is already measured at this pin." },
  { literal: "concrete, measured", spelled: "It depends only on these concrete, measured ingredients." },
  { literal: "actual Pi `workflow_execute` function branch", spelled: "- call actual Pi `workflow_execute` function branch, observe through Pi." },
  { literal: "actual Pi workflow_execute function branch", spelled: "Call the actual Pi workflow_execute function branch directly." },
  { literal: "companion lives at", spelled: "The Pi-side companion lives at `pi-subagents/docs/x/`." },
  { literal: "no live execution witnessed", spelled: "The Forge row reads no live execution witnessed for this host." },
  { literal: "host not run", spelled: "The Furnace row reads host not run in the matrix." },
  { literal: "Not wired |", spelled: "| RF | Not wired | none |" },
];

function write(root: string, path: string, text: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}
/** Minimal clean tree: the script under test, an empty-or-given baseline, and one clean doc per scanned family. */
function fixture<T>(baseline: unknown, fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-docs-stale-"));
  try {
    mkdirSync(join(root, "scripts"));
    cpSync(join(source, "scripts", SCRIPT), join(root, "scripts", SCRIPT));
    write(root, `scripts/${BASELINE}`, typeof baseline === "string" ? baseline : JSON.stringify(baseline, null, 2) + "\n");
    write(root, "README.md", "# Readme\n\nClean prose.\n");
    write(root, "AGENTS.md", "# Agents\n\nClean prose.\n");
    write(root, "docs/clean.md", "# Clean\n\nNothing stale here.\n");
    write(root, ".agents/skills/clean/SKILL.md", "# Skill\n\nNothing stale here.\n");
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function check(root: string) { return spawnSync(process.execPath, [join(root, "scripts", SCRIPT)], { cwd: root, encoding: "utf8" }); }

test("a clean tree with an empty baseline passes (the zero-hit end state)", () => fixture([], root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /docs-stale-claims: pass/);
}));

for (const { literal, spelled } of LITERALS) {
  test(`DOC_STALE_CLAIM names path and literal for: ${literal}`, () => fixture([], root => {
    write(root, "docs/stale.md", `# Stale\n\n${spelled}\n`);
    const p = check(root);
    assert.equal(p.status, 1, p.stdout);
    assert.ok(p.stderr.includes(`DOC_STALE_CLAIM: docs/stale.md:3 (${literal})`), p.stderr);
  }));
}

test("a dated state-matrix cell (Not wired followed by a dated parenthetical) is not a stale claim", () => fixture([], root => {
  write(root, "docs/dated.md", "# Dated\n\n| RF | Not wired (2026-11-09: host journey landed) | note |\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /docs-stale-claims: pass/);
}));

test("DOC_STALE_CLAIM covers every scanned family: README.md, AGENTS.md, docs/**, and .agents/skills/**/SKILL.md", () => fixture([], root => {
  const stale = "# Stale\n\nThe descriptor does not currently match the loader.\n";
  write(root, "README.md", stale);
  write(root, "AGENTS.md", stale);
  write(root, "docs/deep/nested/stale.md", stale);
  write(root, ".agents/skills/mechanical-pi-host/SKILL.md", stale);
  const p = check(root);
  assert.equal(p.status, 1);
  for (const path of ["README.md", "AGENTS.md", "docs/deep/nested/stale.md", ".agents/skills/mechanical-pi-host/SKILL.md"]) {
    assert.ok(p.stderr.includes(`DOC_STALE_CLAIM: ${path}:3 (does not currently match)`), `${path} missing in ${p.stderr}`);
  }
}));

test("the scan reads RAW markdown: a literal inside a fenced block or a code span still counts", () => fixture([], root => {
  write(root, "docs/fenced.md", "# Fenced\n\n```text\nThe descriptor does not currently match.\n```\n");
  write(root, "docs/span.md", "# Span\n\nSee `historical metadata` for the field.\n");
  const p = check(root);
  assert.equal(p.status, 1);
  assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/fenced.md:4 (does not currently match)"), p.stderr);
  assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/span.md:3 (historical metadata)"), p.stderr);
}));

test("matching ignores case and a line wrap between the words of a literal", () => fixture([], root => {
  write(root, "docs/case.md", "# Case\n\nHistorical Metadata is not a claim.\n");
  write(root, "docs/wrap.md", "# Wrap\n\nThe entry does not currently\nmatch the loader.\n");
  const p = check(root);
  assert.equal(p.status, 1);
  assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/case.md:3 (historical metadata)"), p.stderr);
  assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/wrap.md:3 (does not currently match)"), p.stderr);
}));

test("qualified companion wording passes: intended at / absent at are not the unqualified claim", () => fixture([], root => {
  write(root, "docs/qualified.md", "# Qualified\n\nThe Pi-side companion is intended at `pi-subagents/docs/x/` and is absent at 278c8f79.\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));

test("a hit named by the baseline passes; the same literal on another line still fails", () => {
  const entry = "docs/known.md|The descriptor does not currently match the loader.";
  return fixture([entry], root => {
    write(root, "docs/known.md", "# Known\n\nThe descriptor does not currently match the loader.\n");
    assert.equal(check(root).status, 0);
    write(root, "docs/known.md", "# Known\n\nThe descriptor does not currently match the loader.\n\nA second claim: the file does not currently match either.\n");
    const p = check(root);
    assert.equal(p.status, 1);
    assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/known.md:5 (does not currently match)"), p.stderr);
    assert.ok(!p.stderr.includes("docs/known.md:3"), "the baselined occurrence stays quiet");
  });
});

test("a baseline entry covers one occurrence: a repeated identical line needs a repeated entry", () => {
  const entry = "docs/dup.md|The descriptor does not currently match the loader.";
  return fixture([entry], root => {
    write(root, "docs/dup.md", "# Dup\n\nThe descriptor does not currently match the loader.\n\nThe descriptor does not currently match the loader.\n");
    const p = check(root);
    assert.equal(p.status, 1);
    assert.ok(p.stderr.includes("DOC_STALE_CLAIM: docs/dup.md:5 (does not currently match)"), p.stderr);
  });
});

test("DOC_STALE_BASELINE_ENTRY: an entry whose site no longer appears must be deleted", () => fixture(["docs/gone.md|The descriptor does not currently match the loader."], root => {
  const p = check(root);
  assert.equal(p.status, 1);
  assert.ok(p.stderr.includes("DOC_STALE_BASELINE_ENTRY: docs/gone.md|The descriptor does not currently match the loader."), p.stderr);
}));

test("DOC_STALE_BASELINE_ENTRY: a rewritten site (same file, new wording) leaves its entry stale", () => fixture(["docs/rewritten.md|The descriptor does not currently match the loader."], root => {
  write(root, "docs/rewritten.md", "# Rewritten\n\nThe descriptor matched the loader at the pinned revision.\n");
  const p = check(root);
  assert.equal(p.status, 1);
  assert.match(p.stderr, /DOC_STALE_BASELINE_ENTRY: docs\/rewritten\.md\|/);
}));

test("DOC_STALE_BASELINE_MALFORMED: a baseline that is not a JSON array of strings fails closed", () => {
  for (const bad of ["not json", "{}", "[1, 2]", ""]) {
    fixture(bad, root => {
      const p = check(root);
      assert.equal(p.status, 1, `baseline ${JSON.stringify(bad)}`);
      assert.match(p.stderr, /DOC_STALE_BASELINE_MALFORMED/);
    });
  }
});

test("DOC_STALE_BASELINE_MALFORMED: a missing baseline file fails closed", () => fixture([], root => {
  rmSync(join(root, "scripts", BASELINE));
  const p = check(root);
  assert.equal(p.status, 1);
  assert.match(p.stderr, /DOC_STALE_BASELINE_MALFORMED/);
}));

test("errors accumulate: a stale claim and a stale baseline entry report together", () => fixture(["docs/gone.md|x does not currently match"], root => {
  write(root, "docs/stale.md", "# Stale\n\nThe descriptor does not currently match the loader.\n");
  const p = check(root);
  assert.equal(p.status, 1);
  assert.match(p.stderr, /DOC_STALE_CLAIM: docs\/stale\.md:3/);
  assert.match(p.stderr, /DOC_STALE_BASELINE_ENTRY: docs\/gone\.md/);
}));

test("the npm docs:check script chains the stale-claim denylist after the link check", () => {
  const scripts = (JSON.parse(readFileSync(join(source, "package.json"), "utf8")) as { scripts: Record<string, string> }).scripts;
  assert.equal(scripts["docs:check"], "node scripts/check-docs.ts && node scripts/check-docs-stale-claims.ts");
});

test("the real tree passes, and the committed baseline only shrinks from the five audited sites", () => {
  const baseline = JSON.parse(readFileSync(join(source, "scripts", BASELINE), "utf8")) as string[];
  const AUDITED_OWNERS = [
    "README.md|",
    "docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md|",
    "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md|",
    "docs/programs/pi-workbench-interoperability-audit-2026-11-06/04-qa-feedback.md|",
    "docs/programs/pi-workbench-interoperability-audit-2026-11-06/README.md|",
  ];
  assert.ok(baseline.length <= 5, `baseline grew past the five audited sites: ${baseline.length}`);
  for (const entry of baseline) assert.ok(AUDITED_OWNERS.some(prefix => entry.startsWith(prefix)), `unaudited baseline entry: ${entry}`);
  const p = spawnSync(process.execPath, [join(source, "scripts", SCRIPT)], { cwd: source, encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  assert.ok(existsSync(join(source, ".agents", "skills")), "the .agents/skills scan root exists in the real tree");
});
