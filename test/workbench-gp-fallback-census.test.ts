/**
 * wb-1xvp.4 (RF-GRAPH-POLICY-MACHINE-CONTROL-R3), standing leg. The bead: "If Pi ever calls gp in a decision loop (gated:
 * the shared adapter fallback, deliverables 2 and 8, not shipped in Pi), every gp call site shall have a deterministic
 * fallback (the machine's existing rule or an L355 reference policy) used when gp is absent, refuses (nonzero exit or
 * ok:false), returns a stale basis or exceeds its runtime budget; the fallback is recorded as fallback with the
 * producer's refusal code echoed verbatim, never as a gp decision nor from partial gp output" (ReactiveFiberCLI
 * docs/programs/graph-policy-machine-control-2026-10-21/README.md:270@6a251bf73af5). Acceptance:
 *  (a) "fake gp seam absent / exit 2 with a GP_CLI_* envelope / stale basis digest / timeout each yield the fallback
 *      action and a record with decision_source='fallback' and the refusal code verbatim";
 *  (b) "on any refusal the score field is absent (not zero) and no probability key is written";
 *  (c) "every src gp call site is paired with a named deterministic fallback (existing machine rule, ready-first,
 *      priority-first, critical-path-aware or cost-aware); fails on an unpaired site".
 * Not P0 (bead): "no gp call site exists, so no fallback is missing today; filed so the adapter cannot land without one."
 *
 * This file pins that absence and ARMS (a)-(c) for the first site; test/helpers/gp-fallback-census.ts holds the tables
 * and the judges:
 *  - (c) the live rows scan every regular file under src/ (scanSource: the gp binary as a command word, a GraphPolicyCLI
 *    module specifier, the gp wire vocabulary in a literal) and require the touched files to equal GP_CALL_SITES, each
 *    paired with a FAMILIES fallback its module exports (pairingFindings). Both are empty today; a file floor and the
 *    native-CLI command literals the walk reads prove the scan walked real src.
 *  - (a)+(b) every GP_CALL_SITES entry's drive runs on every UNUSABLE fake seam (absent; exit 2 with a GP_CLI_ envelope;
 *    ok:false with a GP_RPC_ reply; a stale basis digest; over the runtime budget) and each record must pass judgeRecord.
 *    No entry exists today, so the judge is proven here on the reference drive (the UNUSABLE rows) and on MUTANTS, each
 *    refused with exactly its rules.
 * The record contract a site meets (own keys): decision_source "fallback"; reason absent | refused | stale | over-budget;
 * refusal_code, the producer's code verbatim, present only when the producer sent one; fallback {family, name}; action,
 * the paired fallback's own decision. No key naming a score or a probability at any depth, and no value of the fake
 * seam's policy output anywhere.
 * RESIDUALS (named families, each member a pinned quiet row - a detector or judge change that reaches it reds the row
 * and the family is re-judged): R-COMPUTED, R-ENVIRONMENT, R-TRANSITIVE and R-BINARY-SPELLING (the scan),
 * R-UNNAMED-NUMBER, R-UNWALKED-KEY and R-DERIVED-OUTPUT (the judge).
 * Rule 16: the frozen-shape case pins every table's row and pin shape and the live subjects; the OUT-OF-FILE anchor
 * test/fixtures/gp-fallback-roster.json (the hk9l/5jha roster pattern) carries every judged row (table, id, label, the
 * SHA-256 of each pin), every registered test title and the residual families, and the roster case judges this file
 * against it in order and both ways, with each registered test's run mode.
 *
 * wb-qxdr (the wb-1xvp.4 follow-up: PREP F1 MEDIUM of landing 252, R694) pins the four groups of modes the first cut
 * claimed but no row pinned, each by a row that reds when its mode is hollowed:
 *  (i) walk coverage: the 'live' row's exact-set anchor - the walk, less what git ignores, equals what git would commit
 *      under src/ (tracked or untracked, never ignored), file for file, beside the floor;
 *  (ii) walker properties: the WALKS rows plant synthetic trees on rule-11 scratch - a hidden file, an extensionless
 *      file in a nested directory, a symlinked file, a second link to a walked directory, a directory-symlink loop, and
 *      a FIFO the walk fails closed on;
 *  (iii) judge modes: a MUTANTS row per claimed probability member (propensity, logit, likelihood, distribution), the
 *      J-FALLBACK family half, an inherited-key row per contract field (decision_source, action, fallback and its name,
 *      reason, refusal_code: OWN reads only), a score beside a cycle (the cycle guard) and an array record (the array
 *      guard); every structural edit is checked to be the shape it names (editShapeFindings), and that check is shown
 *      to refuse each one degraded to a plain delete;
 *  (iv) scan modes: the WIRE gp.cli schema pin and the bare 'gp' module specifier pin.
 * The F4 escapes ride as the three new residual families above, and F3's headroom as LIVE_BUDGET_MS on the live rows.
 *
 * Display paths added: none. Test-only: no src change, and no GraphPolicyCLI adapter, seam or fake binary.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import {
  CLEAN,
  driveFindings,
  type Edit,
  editedRecord,
  editShapeFindings,
  FAMILIES,
  type FakeSeam,
  isStructuralEdit,
  type JudgedRow,
  judgeRecord,
  MUTANTS,
  PAIRING_CASES,
  type Pairing,
  pairingFindings,
  REFERENCE,
  RESIDUAL_FAMILIES,
  RESIDUALS,
  ROWS,
  referenceRecord,
  ruleOf,
  type Scan,
  SYNTHETIC_SITE,
  scanSource,
  srcFiles,
  TOUCHPOINTS,
  UNUSABLE,
  WALKS,
} from "./helpers/gp-fallback-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER = "test/fixtures/gp-fallback-roster.json";
/** src holds well over this many files; fewer means the walk found nothing. */
const MIN_SRC_FILES = 100;
/** The first live row parses every src module (wb-1xvp.4 F3: 946-2953 ms measured against vitest's 5000 ms default), so each live row carries this explicit budget. */
const LIVE_BUDGET_MS = 60_000;

/** What git would commit under src/: tracked or untracked, never ignored, and still on disk (the walk's exact-set anchor). */
function gitSrcFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
}

/** The paths among `paths` that git ignores: the walk reads them, but git would never commit them. */
function gitIgnored(paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: ROOT, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore exited ${String(result.status)}: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}

/** A src module that reaches GraphPolicyCLI, paired with its deterministic fallback and a drive over the fake seams. */
interface CallSite extends Pairing {
  /** The paired fallback's own decision for the drive's input. */
  readonly action: unknown;
  /** Runs the site against one fake seam and resolves to the decision record it wrote. */
  readonly drive: (seam: FakeSeam) => unknown;
}

/** (c) The pairing registry: every src module carrying a GraphPolicyCLI touchpoint has exactly one entry. Empty today. */
const GP_CALL_SITES: readonly CallSite[] = [];

interface Roster {
  readonly rows: readonly JudgedRow[];
  readonly tests: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

interface Live {
  readonly files: readonly string[];
  readonly texts: ReadonlyMap<string, string>;
  readonly scans: readonly Scan[];
}
let cached: Live | undefined;
/** The src tree as it stands: every regular file, its text and its scan (read once per run). */
function live(): Live {
  if (cached === undefined) {
    const files = srcFiles(ROOT);
    const texts = new Map(files.map(file => [file, readFileSync(join(ROOT, file), "utf8")] as const));
    cached = { files, texts, scans: files.map(file => scanSource(file, texts.get(file) ?? "")) };
  }
  return cached;
}

describe("GraphPolicyCLI call-site fallback census (wb-1xvp.4, RF-GRAPH-POLICY-MACHINE-CONTROL-R3)", () => {
  for (const entry of TOUCHPOINTS) {
    it(`TOUCHPOINTS ${entry.id}`, () => {
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin).touchpoints.map(point => point.kind), pin).toEqual([entry.kind]);
    });
  }

  for (const entry of CLEAN) {
    it(`CLEAN ${entry.id}`, () => {
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin).touchpoints, pin).toEqual([]);
    });
  }

  for (const entry of RESIDUALS) {
    it(`RESIDUALS ${entry.id}`, () => {
      // A quiet row: the scan reports nothing for this named residual's member (it is not claimed).
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin).touchpoints, pin).toEqual([]);
    });
  }

  for (const family of FAMILIES) {
    it(`FAMILIES ${family}`, () => {
      const texts = new Map([["src/policy.ts", SYNTHETIC_SITE]]);
      const touchpoints = scanSource("src/policy.ts", SYNTHETIC_SITE).touchpoints;
      expect(pairingFindings([{ file: "src/policy.ts", family, fallback: "readyFirst" }], touchpoints, texts)).toEqual([]);
      expect(pairingFindings([{ file: "src/policy.ts", family: family.toUpperCase(), fallback: "readyFirst" }], touchpoints, texts).map(ruleOf)).toEqual(["P-FAMILY"]);
    });
  }

  for (const entry of UNUSABLE) {
    it(`UNUSABLE ${entry.id}`, async () => {
      const seam = entry.seam;
      // The fake is the shape it names.
      if (seam.kind === "exit") {
        const envelope = JSON.parse(seam.stdout) as { schema: unknown; ok: unknown; error: { code: unknown } };
        expect([seam.exitCode, envelope.schema, envelope.ok, envelope.error.code]).toEqual([2, "graphpolicy.cli.v1", false, entry.code]);
        expect(entry.code?.startsWith("GP_CLI_")).toBe(true);
      } else if (seam.kind === "reply") {
        const error = seam.reply.error as { code: unknown };
        expect([seam.reply.schema, seam.reply.ok, error.code]).toEqual(["gp.rpc.reply/v1", false, entry.code]);
        expect(entry.code?.startsWith("GP_RPC_")).toBe(true);
      } else if (seam.kind === "basis") {
        expect(seam.basisDigest).not.toBe(seam.currentDigest);
        expect(entry.code).toBeUndefined();
      } else if (seam.kind === "budget") {
        expect(seam.elapsedMs).toBeGreaterThan(seam.budgetMs);
        expect(entry.code).toBeUndefined();
      } else {
        expect([seam.errno, entry.code]).toEqual(["ENOENT", undefined]);
      }
      // The reference drive conforms: the fallback action, decision_source 'fallback', the code verbatim or none.
      const record = referenceRecord(seam);
      expect(await driveFindings(REFERENCE, referenceRecord, entry)).toEqual([]);
      expect([record.decision_source, record.reason, record.action]).toEqual(["fallback", entry.reason, REFERENCE.action]);
      expect(Object.hasOwn(record, "refusal_code") ? record.refusal_code : undefined).toBe(entry.code);
      // The action is an own key even when the fallback decides nothing: an absent key is not a recorded undefined.
      const { action: _dropped, ...withoutAction } = record;
      expect(judgeRecord(withoutAction, { ...REFERENCE, action: undefined }, entry).map(ruleOf)).toEqual(["J-ACTION"]);
      expect(judgeRecord({ ...withoutAction, action: undefined }, { ...REFERENCE, action: undefined }, entry)).toEqual([]);
    });
  }

  for (const entry of MUTANTS) {
    it(`MUTANTS ${entry.id}`, async () => {
      const shape = UNUSABLE.find(candidate => candidate.id === entry.shape);
      if (shape === undefined) throw new Error(`MUTANTS ${entry.id} names an unknown shape ${entry.shape}`);
      const findings = await driveFindings(REFERENCE, seam => editedRecord(seam, entry.edits), shape);
      expect(findings.map(ruleOf), findings.join("\n")).toEqual(entry.expect);
      // Without the edits the same drive conforms, so each rule above is the edit's own finding.
      expect(judgeRecord(editedRecord(shape.seam, []), REFERENCE, shape)).toEqual([]);
      // Each structural edit (inherit, hide, symbol, link) is the shape it names, and the check refuses the same edit
      // degraded to a plain delete, so no row passes on an edit that silently became a delete.
      const structural = entry.edits.filter(isStructuralEdit);
      if (structural.length > 0) {
        expect(editShapeFindings(editedRecord(shape.seam, entry.edits), entry.edits)).toEqual([]);
        const degraded = entry.edits.map((edit): Edit => (isStructuralEdit(edit) ? { op: "delete", path: edit.path } : edit));
        expect(editShapeFindings(editedRecord(shape.seam, degraded), entry.edits)).toHaveLength(structural.length);
      }
    });
  }

  for (const entry of PAIRING_CASES) {
    it(`PAIRING_CASES ${entry.id}`, () => {
      const texts = new Map(Object.entries(entry.files));
      const touchpoints = [...texts].flatMap(([file, text]) => scanSource(file, text).touchpoints);
      expect(pairingFindings(entry.pairings, touchpoints, texts).map(ruleOf)).toEqual(entry.expect);
    });
  }

  for (const entry of WALKS) {
    it(`WALKS ${entry.id}`, () => {
      const root = makeScratch("gp-fallback-walk-");
      try {
        for (const [rel, node] of Object.entries(entry.tree)) {
          const path = join(root, rel);
          mkdirSync(dirname(path), { recursive: true });
          if (node.kind === "file") writeFileSync(path, node.text);
          else if (node.kind === "symlink") symlinkSync(node.target, path);
          else execFileSync("mkfifo", [path]);
        }
        // The planted tree is the shape its row names.
        const planted = Object.keys(entry.tree).map(rel => {
          const info = lstatSync(join(root, rel));
          return `${rel}:${info.isFIFO() ? "fifo" : info.isSymbolicLink() ? "symlink" : info.isFile() ? "file" : "other"}`;
        });
        expect(planted).toEqual(Object.entries(entry.tree).map(([rel, node]) => `${rel}:${node.kind}`));
        let walked: readonly string[] | string;
        try {
          walked = srcFiles(root);
        } catch (error) {
          walked = error instanceof Error ? error.message : String(error);
        }
        expect(walked).toEqual("throws" in entry.expect ? entry.expect.throws : entry.expect.files);
      } finally {
        removeScratch(root);
      }
    });
  }

  it("live: the scan walks every regular file under src/ and reads the native CLI commands its call sites pass", { timeout: LIVE_BUDGET_MS }, () => {
    const { files, scans } = live();
    expect(files.length).toBeGreaterThanOrEqual(MIN_SRC_FILES);
    expect(files).toContain("src/workbench/providers/reactivefiber.ts");
    // The exact-set anchor (wb-qxdr (i)): a walk that skips a directory or drops files reds here, not just below the floor.
    const ignored = gitIgnored(files);
    expect(
      files.filter(file => !ignored.has(file)).sort(),
      "the walk, less what git ignores, equals what git would commit under src/ (tracked or untracked, never ignored)",
    ).toEqual(gitSrcFiles());
    const commands = new Set(scans.flatMap(scan => scan.commands));
    for (const command of ["rf", "git", "forge"]) expect(commands.has(command), `a src call passes the ${command} command`).toBe(true);
  });

  it("live (c): no src file carries a GraphPolicyCLI touchpoint today, and GP_CALL_SITES pairs exactly the touched files", { timeout: LIVE_BUDGET_MS }, () => {
    const { texts, scans } = live();
    const touchpoints = scans.flatMap(scan => scan.touchpoints);
    // Both readings in one assertion, so an unpaired site reds naming its P-UNPAIRED finding beside the absence pin.
    expect({ pairing: pairingFindings(GP_CALL_SITES, touchpoints, texts), touchpoints: touchpoints.map(point => `${point.file}:${point.line} ${point.kind} ${point.text}`) }).toEqual({ pairing: [], touchpoints: [] });
  });

  it("live (a)+(b): every GP_CALL_SITES entry records a conforming fallback on every unusable fake seam", { timeout: LIVE_BUDGET_MS }, async () => {
    const touched = [...new Set(live().scans.flatMap(scan => scan.touchpoints.map(point => point.file)))].sort();
    expect(GP_CALL_SITES.map(site => site.file).sort()).toEqual(touched);
    const findings: string[] = [];
    for (const site of GP_CALL_SITES) {
      for (const shape of UNUSABLE) {
        const found = await driveFindings({ family: site.family, name: site.fallback, action: site.action }, site.drive, shape);
        findings.push(...found.map(finding => `${site.file} ${shape.id} ${finding}`));
      }
    }
    expect(findings).toEqual([]);
  });

  it("rule 16: every judged table and the live subjects are frozen at their measured shape", () => {
    expect(ROWS.map(entry => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "TOUCHPOINTS/CLI:7",
      "TOUCHPOINTS/SDK:8",
      "TOUCHPOINTS/WIRE:8",
      "CLEAN/C-NATIVE-CLI:5",
      "CLEAN/C-NEAR-NAMES:5",
      "CLEAN/C-COMMENT:2",
      "RESIDUALS/R-COMPUTED:2",
      "RESIDUALS/R-ENVIRONMENT:2",
      "RESIDUALS/R-TRANSITIVE:1",
      "RESIDUALS/R-BINARY-SPELLING:3",
      "FAMILIES/existing-machine-rule:0",
      "FAMILIES/ready-first:0",
      "FAMILIES/priority-first:0",
      "FAMILIES/critical-path-aware:0",
      "FAMILIES/cost-aware:0",
      "UNUSABLE/U-ABSENT:1",
      "UNUSABLE/U-CLI-REFUSAL:1",
      "UNUSABLE/U-RPC-REFUSAL:1",
      "UNUSABLE/U-STALE-BASIS:1",
      "UNUSABLE/U-OVER-BUDGET:1",
      "MUTANTS/M-SOURCE-GP:1",
      "MUTANTS/M-SOURCE-MISSING:1",
      "MUTANTS/M-ACTION-POLICY:1",
      "MUTANTS/M-FALLBACK-NAME:1",
      "MUTANTS/M-REASON:1",
      "MUTANTS/M-CODE-RECASED:1",
      "MUTANTS/M-CODE-RELABELLED:1",
      "MUTANTS/M-CODE-MISSING:1",
      "MUTANTS/M-CODE-FABRICATED:1",
      "MUTANTS/M-SCORE-ZERO:1",
      "MUTANTS/M-SCORE-NESTED:1",
      "MUTANTS/M-PROBABILITY:1",
      "MUTANTS/M-LOGPROB-NESTED:1",
      "MUTANTS/M-PARTIAL-OUTPUT:1",
      "MUTANTS/M-PARTIAL-KEY:1",
      "MUTANTS/M-NOT-A-RECORD:1",
      "MUTANTS/M-DRIVE-THROWS:1",
      "MUTANTS/R-UNNAMED-NUMBER:1",
      "MUTANTS/M-PROPENSITY:1",
      "MUTANTS/M-LOGIT-NESTED:1",
      "MUTANTS/M-LIKELIHOOD:1",
      "MUTANTS/M-DISTRIBUTION-NESTED:1",
      "MUTANTS/M-FALLBACK-FAMILY:1",
      "MUTANTS/M-SOURCE-INHERITED:1",
      "MUTANTS/M-ACTION-INHERITED:1",
      "MUTANTS/M-FALLBACK-INHERITED:1",
      "MUTANTS/M-FALLBACK-NAME-INHERITED:1",
      "MUTANTS/M-REASON-INHERITED:1",
      "MUTANTS/M-CODE-INHERITED:1",
      "MUTANTS/M-SCORE-BESIDE-CYCLE:1",
      "MUTANTS/M-ARRAY-RECORD:1",
      "MUTANTS/R-HIDDEN-SCORE:1",
      "MUTANTS/R-SYMBOL-SCORE:1",
      "MUTANTS/R-DERIVED-OUTPUT:1",
      "PAIRING_CASES/P-PAIRED:1",
      "PAIRING_CASES/P-REEXPORTED:1",
      "PAIRING_CASES/P-UNPAIRED:1",
      "PAIRING_CASES/P-STALE:1",
      "PAIRING_CASES/P-DUPLICATE:1",
      "PAIRING_CASES/P-FAMILY:1",
      "PAIRING_CASES/P-UNEXPORTED:1",
      "WALKS/W-HIDDEN:1",
      "WALKS/W-EXTENSIONLESS:1",
      "WALKS/W-SYMLINKED-FILE:1",
      "WALKS/W-DIRECTORY-ALIAS:1",
      "WALKS/W-DIRECTORY-LOOP:1",
      "WALKS/W-FIFO:1",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-COMPUTED:RESIDUALS R-COMPUTED",
      "R-ENVIRONMENT:RESIDUALS R-ENVIRONMENT",
      "R-TRANSITIVE:RESIDUALS R-TRANSITIVE",
      "R-BINARY-SPELLING:RESIDUALS R-BINARY-SPELLING",
      "R-UNNAMED-NUMBER:MUTANTS R-UNNAMED-NUMBER",
      "R-UNWALKED-KEY:MUTANTS R-HIDDEN-SCORE,MUTANTS R-SYMBOL-SCORE",
      "R-DERIVED-OUTPUT:MUTANTS R-DERIVED-OUTPUT",
    ]);
    expect(GP_CALL_SITES.map(site => `${site.file}:${site.family}:${site.fallback}`)).toEqual([]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/gp-fallback-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    for (const member of Object.values(roster.residuals).flat()) expect(ROWS.some(entry => entry.test === member), `${member} is a judged row`).toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(roster.tests.slice(0, ROWS.length), "each judged row registers its own test, in row order").toEqual(ROWS.map(entry => entry.test));
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
