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
 * and the family is re-judged): R-COMPUTED, R-ENVIRONMENT and R-TRANSITIVE (the scan), R-UNNAMED-NUMBER (the judge).
 * Rule 16: the frozen-shape case pins every table's row and pin shape and the live subjects; the OUT-OF-FILE anchor
 * test/fixtures/gp-fallback-roster.json (the hk9l/5jha roster pattern) carries every judged row (table, id, label, the
 * SHA-256 of each pin), every registered test title and the residual families, and the roster case judges this file
 * against it in order and both ways, with each registered test's run mode.
 *
 * Display paths added: none. Test-only: no src change, and no GraphPolicyCLI adapter, seam or fake binary.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CLEAN,
  driveFindings,
  editedRecord,
  FAMILIES,
  type FakeSeam,
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
} from "./helpers/gp-fallback-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER = "test/fixtures/gp-fallback-roster.json";
/** src holds well over this many files; fewer means the walk found nothing. */
const MIN_SRC_FILES = 100;

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
    });
  }

  for (const entry of PAIRING_CASES) {
    it(`PAIRING_CASES ${entry.id}`, () => {
      const texts = new Map(Object.entries(entry.files));
      const touchpoints = [...texts].flatMap(([file, text]) => scanSource(file, text).touchpoints);
      expect(pairingFindings(entry.pairings, touchpoints, texts).map(ruleOf)).toEqual(entry.expect);
    });
  }

  it("live: the scan walks every regular file under src/ and reads the native CLI commands its call sites pass", () => {
    const { files, scans } = live();
    expect(files.length).toBeGreaterThanOrEqual(MIN_SRC_FILES);
    expect(files).toContain("src/workbench/providers/reactivefiber.ts");
    const commands = new Set(scans.flatMap(scan => scan.commands));
    for (const command of ["rf", "git", "forge"]) expect(commands.has(command), `a src call passes the ${command} command`).toBe(true);
  });

  it("live (c): no src file carries a GraphPolicyCLI touchpoint today, and GP_CALL_SITES pairs exactly the touched files", () => {
    const { texts, scans } = live();
    const touchpoints = scans.flatMap(scan => scan.touchpoints);
    // Both readings in one assertion, so an unpaired site reds naming its P-UNPAIRED finding beside the absence pin.
    expect({ pairing: pairingFindings(GP_CALL_SITES, touchpoints, texts), touchpoints: touchpoints.map(point => `${point.file}:${point.line} ${point.kind} ${point.text}`) }).toEqual({ pairing: [], touchpoints: [] });
  });

  it("live (a)+(b): every GP_CALL_SITES entry records a conforming fallback on every unusable fake seam", async () => {
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
      "TOUCHPOINTS/SDK:7",
      "TOUCHPOINTS/WIRE:7",
      "CLEAN/C-NATIVE-CLI:5",
      "CLEAN/C-NEAR-NAMES:5",
      "CLEAN/C-COMMENT:2",
      "RESIDUALS/R-COMPUTED:2",
      "RESIDUALS/R-ENVIRONMENT:2",
      "RESIDUALS/R-TRANSITIVE:1",
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
      "PAIRING_CASES/P-PAIRED:1",
      "PAIRING_CASES/P-REEXPORTED:1",
      "PAIRING_CASES/P-UNPAIRED:1",
      "PAIRING_CASES/P-STALE:1",
      "PAIRING_CASES/P-DUPLICATE:1",
      "PAIRING_CASES/P-FAMILY:1",
      "PAIRING_CASES/P-UNEXPORTED:1",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-COMPUTED:RESIDUALS R-COMPUTED",
      "R-ENVIRONMENT:RESIDUALS R-ENVIRONMENT",
      "R-TRANSITIVE:RESIDUALS R-TRANSITIVE",
      "R-UNNAMED-NUMBER:MUTANTS R-UNNAMED-NUMBER",
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
