/**
 * wb-u62: falsifiers for the shared title-census FLOOR helper (test/helpers/census.ts).
 *
 * Owner program ruling 2026-10-16 12:22Z: every post-rule census respin facing the title-census floor is
 * sequenced behind ONE shared helper instead of N lexer-mask-plus-regex scanners. The 13:20Z and 13:30Z rulings
 * define it: discovery EXECUTES the claimed tier's real entrypoint (forge.toml step -> npm script -> vitest config,
 * setupFiles and globalSetup included), and a pin counts only when it is collected exactly once (an .each pin:
 * once per table row, table non-empty) and its result is passed there; the parse-aware AST scan of the case the
 * runner located is the inner leg. This file is that helper's own falsifier suite. Every routed mode is ONE
 * falsifier row, and every row first proves the mode is REAL on the runner's own surface (the vitest JSON
 * reporter, run through the tier's real command, or the rendered markdown for docs rows) before it asserts the
 * helper's verdict, so no row depends on the helper's model of the runner (05:36Z runner-export-surface floor) or
 * on pinned source text (06:10Z).
 *
 * Routed input sets, one row each (names kept so a census seat can trace its mode):
 * - wb-6hb.6 gate N1-N24 (registration/body N1-N17, config N18-N20, docs N21-N24).
 * - wb-0kg.11 gate modes (1)-(12), the four tier-truth exclusions, the FILE_HAZARD false-red class, the
 *   collect-only vs AST split, and the forge.toml test-step argv class (F8).
 * - wb-h8f.9 gate P1-P9, T2, T3, the T3-variant inefficacy datum, and the T4 package.json CLI-flag class.
 * - wb-752.10 gate X1-X13 (incl. the docs continuation, hidden-copy heading and level-1 re-home classes),
 *   the FILE_HAZARD .only false red (F2) and the attribution classes (F3, U3, U5/A1).
 * - wb-cax.23 S7 (.fails inversion) and S8 (vacuous body, the third leg), wb-gs2.2 stripComments desync.
 * - The three keep-or-match floors, each by its OWN rows: wb-0kg.12 (the enclosing-brace walk's six shapes,
 *   modes (1)-(7), the tier forms, the front-spread attribution datum, F6, DR1/DR2), wb-6hb.7 (S1-S13, K1-K8,
 *   M1-M15, FR1, the F7/D9 parent-path datum) and wb-6ze.38 (K8/K9/K13/K16/K17 and M1-M19); plus wb-cax.25
 *   M1-M12b, T1-T3, the bound K1-K4 rows, FR1-FR3, X1, the D1 straddle (D10) and the F7 per-row each clause.
 * - The wb-u62 gate-1 respin set (owner three-stage ruling 2026-10-16 16:12Z: R1 = (b) as the architecture and (a) as
 *   the hardening): U1 J1-J5 (judge detection - no judge-identifying name reaches the judged code, the operator's
 *   VITEST_* names pass through, the runner's public current-test routes are context references), the one-run E2E
 *   adoption shape, U2 A1a/A1b (a red names only what it observed and every remaining route), U4 GM19 (two npm hops)
 *   and GM21 (real-path recursion), and wb-9x5.6 D1-D3 (relocation, HTML-comment wrap, withdrawn ### inside the
 *   section) with the D2 raw-text footgun closed.
 * - The wb-u62 gate-3 battery (cmd_52185d639797; the respin-3 red-first corpus by owner order 2026-10-16 23:16Z): (1)-(7)
 *   the inversion read's enclosure and member flows, (1c)/(6c) their fail-closed costs, (8)-(10) the context-write flow in
 *   both modes, (11)-(16) the third leg's assertion flow; plus the respin-3 seat's A1-A12 routes of the same flows and
 *   the K1-K4 controls (the registration model's mirror against vitest's runtime objects is its own file,
 *   workbench-census-registration-model.test.ts, since reading the API objects reflectively is itself an escape).
 *
 * REPORT MODE (the default-tier judgment once wb-nl8 lands): judge(reportPath, pins) reads vitest's own JSON report of
 * the run and never re-executes it. Every main, tier and config row is judged in BOTH modes: the runner oracle's
 * report IS a gate-shaped report (vitest's JSON reporter through the tier's real command, task locations included), so
 * each row's report-mode verdict is measured on exactly the run the row proves real. A row names its own report-mode
 * verdict only where the report cannot carry what the executing run saw (mode, the fails flag, a runtime assertion
 * count, unhandled errors).
 *
 * The synthetic projects live in one tracked scratch directory (test/helpers/scratch.ts makeScratch, leak guard
 * installed; standing rule 11) with node_modules symlinked to this repository's, so the runner, its config loader and
 * the helper all run exactly as they do for a real census. Nothing here reads or
 * mutates a pinned file of another census.
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, realpathSync, statSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  type CasePin,
  CENSUS_GUARD_SHA256,
  CENSUS_LIFECYCLE_SCRIPTS,
  type CensusCode,
  type CensusLeg,
  censusGuard,
  DEFAULT_GATE_TIER,
  DEFAULT_TIER_REPORT,
  type DocsSection,
  docsSection,
  judge,
  judgePins,
  type PinVerdict,
  RESOLVABLE_CONSTRUCTS,
  type RenderedBlock,
  type RosterId,
  resolveTier,
  type SourceStructure,
  sectionMatches,
  sourceStructure,
  VOUCH_READ_SET,
  VOUCH_RESIDUALS,
} from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Holds only the anchor case, so judging it on the real default gate never re-enters this suite. */
const SMOKE_FILE = "test/workbench-census-helper-smoke.test.ts";
const SMOKE_TITLE = "FIND-1 smoke anchor: the helper judges this case on the real default gate";
/** Generous: the synthetic runs spawn real vitest processes and may share the host with a complete gate. */
const SUITE_TIMEOUT = 300_000;

const PIN = "the pinned case";
const IMPORTS = 'import { beforeEach, describe, expect, it, test } from "vitest";';
const OTHER = '  it("another case", () => {\n    expect(2).toBe(2);\n  });';
/** u62 respin-6: the planted answers are TARGETED to the pinned case's registration (as in the gate-1 g6s2 battery). */
const CENSUS_TARGET = "CENSUS-TARGET-u62r6";
const TARGET_BODY = `() => {\n    expect("${CENSUS_TARGET}").toBe(2);\n  }`;
const TARGET_PLAIN = `  it("${PIN}", ${TARGET_BODY});`;
const BODY = "() => {\n    expect(1).toBe(1);\n  }";
const PLAIN = `  it("${PIN}", ${BODY});`;

interface Source {
  readonly body?: string;
  readonly prelude?: string;
  readonly imports?: string;
  readonly after?: string;
}

/** One synthetic test file: imports, prelude, a describe holding a registered sibling case, the mode body, then anything after. */
function testFile(source: Source): string {
  return [source.imports ?? IMPORTS, source.prelude ?? "", 'describe("census suite", () => {', OTHER, source.body ?? "", "});", source.after ?? "", ""].join("\n");
}

/** What the RUNNER does with the pinned case, measured independently of the helper. */
type Oracle =
  | { readonly kind: "passed"; readonly cases?: number }
  | { readonly kind: "not-passed" }
  | { readonly kind: "inverted" }
  | { readonly kind: "vacuous" }
  /** The case passes although its only expectation is on a false value: the planted-false-assertion proof (cax.27). */
  | { readonly kind: "planted-false" };

interface Row {
  readonly id: string;
  /** Provenance: the gate input set and the mode's name there. */
  readonly routed: string;
  readonly source: Source;
  readonly pin?: Partial<CasePin>;
  readonly oracle: Oracle;
  readonly verdict: Expected;
  /** Report mode's verdict where it differs from the executing run's (the report cannot carry what that run saw). */
  readonly report?: Expected;
}

/** The verdict a row expects; why pins the attribution where two guards could produce the same code. */

interface Expected {
  readonly ok: boolean;
  readonly code: CensusCode;
  readonly leg: CensusLeg;
  readonly why?: RegExp;
}

const OK = { ok: true, code: "ok", leg: "asserts" } as const;
const red = (code: CensusCode, leg: CensusLeg, why?: RegExp): Expected => (why === undefined ? { ok: false, code, leg } : { ok: false, code, leg, why });
const RUNS_NOT = { kind: "not-passed" } as const;
const RUNS = { kind: "passed" } as const;

/** Registration-level modes: the reported tasks of the tier's real run must kill each one. */
const REGISTRATION: readonly Row[] = [
  { id: "r-control", routed: "control: a plain registered case", source: { body: PLAIN }, oracle: RUNS, verdict: OK },
  { id: "r-rename", routed: "752.10 rename", source: { body: `  it("${PIN} renamed", ${BODY});` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-delete", routed: "752.10 delete", source: { body: "" }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-comment-line", routed: "6hb.6 S1 / 752.10 // comment-out", source: { body: `  // it("${PIN}", () => { expect(1).toBe(1); });` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-comment-block", routed: "6hb.6 S2 / 752.10 block comment-out", source: { body: `  /* it("${PIN}", () => { expect(1).toBe(1); }); */` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  {
    id: "r-6hb7-s1-midline-comment",
    routed: "6hb.7 S1 a block comment opened mid-line on the previous line",
    source: { body: `  const marker = 1; /* opened mid-line\n${PLAIN}\n  */\n  void marker;` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  {
    id: "r-6hb7-s12-template-decoy",
    routed: "6hb.7 S12 the case deleted, its title kept at line start inside a multi-line template literal",
    source: { body: `  const decoy = \`\nit("${PIN}", () => {\n\`;\n  void decoy;` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  { id: "r-6hb11-s18-bracket-head", routed: '6hb.11 S18 it["skip"] bracket head', source: { body: `  it["skip"]("${PIN}", ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-6hb11-f4-bracket-focus",
    routed: '6hb.11 F4 it["only"] bracket focus under allowOnly false',
    source: { body: `  it["only"]("${PIN}", ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("failed", "asserts", /Unexpected \.only modifier/),
    report: red("failed", "asserts", /Unexpected \.only modifier/),
  },
  {
    id: "r-6hb11-s21-source-unlocated",
    routed: "6hb.11 S21 source-unlocated: the case registered by an imported wrapper (the runner locates the wrapper call)",
    source: { imports: `${IMPORTS}\nimport { registerPinned } from "./census-register-helper.js";`, body: "  registerPinned();" },
    oracle: RUNS,
    verdict: red("body-unresolved", "asserts", /not statically resolvable/),
  },
  { id: "r-duplicate", routed: "752.10 duplicate title / 6hb.11 S20", source: { body: `${PLAIN}\n${PLAIN}` }, oracle: { kind: "passed", cases: 2 }, verdict: red("duplicated", "exists") },
  {
    id: "r-it-skip",
    routed: "752.10 it.skip",
    source: { body: `  it.skip("${PIN}", ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where", /collected the case with mode skip/),
    report: red("skipped", "runs-where", /report records the case skipped/),
  },
  {
    id: "r-it-todo",
    routed: "752.10 it.todo",
    source: { body: `  it.todo("${PIN}");` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where", /collected the case with mode todo/),
    report: red("skipped", "runs-where", /report records the case todo/),
  },
  {
    id: "r-cax25-m1-callback-removed",
    routed: "cax.25 M1 the callback removed: it(title) registers a todo",
    source: { body: `  it("${PIN}");` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where", /collected the case with mode todo/),
    report: red("skipped", "runs-where", /report records the case todo/),
  },

  { id: "r-skipif", routed: "6hb.6 S3 it.skipIf(true)", source: { body: `  it.skipIf(true)("${PIN}", ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-runif", routed: "6hb.6 S3r it.runIf(false)", source: { body: `  it.runIf(false)("${PIN}", ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-describe-skip", routed: "752.10 describe.skip", source: { body: `  describe.skip("inner", () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-6hb7-s13-same-indent", routed: "6hb.7 S13 a same-indent describe.skip wrapper", source: { body: `  describe.skip("wrapper", () => {\n${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-6hb7-s6-suite-skip",
    routed: "6hb.7 S6 the suite.skip alias",
    source: { imports: 'import { describe, expect, it, suite } from "vitest";', body: `  suite.skip("inner", () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-6hb7-s7-aliased-describe", routed: "6hb.7 S7 an aliased describe (const parked = describe.skip)", source: { prelude: "const parked = describe.skip;", body: `  parked("inner", () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-n1-early-return", routed: "6hb.6 N1 / 752.10 X4 / 6ze.38 K13 / cax.25 M10 return before the case", source: { body: `  return;\n${PLAIN}` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-n2-bracket-describe", routed: '6hb.6 N2 / 6hb.7 K5 describe["skip"]', source: { body: `  describe["skip"]("inner", () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-0kg11-7-bracket-const",
    routed: "0kg.11 (7) / 0kg.12 bracket-describe / 6ze.38 M3 describe[SKIP_PROP]",
    source: { prelude: 'const SKIP_PROP = "skip";', body: `  describe[SKIP_PROP]("inner", () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-s4-options-skip", routed: "6hb.6 S4 / 6hb.7 S2 options { skip: true }", source: { body: `  it("${PIN}", { skip: true }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-s4t-options-todo", routed: "6hb.6 S4t / 6hb.7 S3 options { todo: true }", source: { body: `  it("${PIN}", { todo: true }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-6hb7-k8-not-zero", routed: "6hb.7 K8 options { skip: !0 }", source: { body: `  it("${PIN}", { skip: !0 }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-n3-paren-options", routed: "6hb.6 N3 / 6hb.7 M3 / 6ze.38 K8 / cax.25 M2 parenthesised options", source: { body: `  it("${PIN}", ({ skip: true }), ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-6hb7-m4-as-const",
    routed: "6hb.7 M4 / cax.25 M3 an options literal under a type assertion ({ skip: true } as const)",
    source: { body: `  it("${PIN}", { skip: true } as const, ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-n4-quoted-key", routed: '6hb.6 N4 / 0kg.11 (3) / 0kg.12 (2) / 6hb.7 K4 { "skip": true }', source: { body: `  it("${PIN}", { "skip": true }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-n5-computed-key", routed: '6hb.6 N5 / h8f.9 P2 / cax.25 M4 { ["skip"]: true }', source: { body: `  it("${PIN}", { ["skip"]: true }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-0kg11-4-computed-const",
    routed: "0kg.11 (4) / 0kg.12 (3) { [SKIP_OPTION]: true }",
    source: { prelude: 'const SKIP_OPTION = "skip";', body: `  it("${PIN}", { [SKIP_OPTION]: true }, ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  {
    id: "r-n6-variable-options",
    routed: "6hb.6 N6 / h8f.9 P1 / 752.10 X5+X11 / 0kg.12 options-variable / 6hb.7 M1 / cax.25 M5 variable-held options",
    source: { prelude: "const OPTS = { skip: true };", body: `  it("${PIN}", OPTS, ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-0kg11-2-shorthand", routed: "0kg.11 (2) / 0kg.12 (1) / 6hb.7 K6 shorthand { skip }", source: { prelude: "const skip = true;", body: `  it("${PIN}", { skip }, ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-p3-object-assign", routed: "h8f.9 P3 / 6hb.7 M2 / 6ze.38 K9 Object.assign-built options", source: { body: `  it("${PIN}", Object.assign({}, { skip: true }), ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-p4-describe-variable-options",
    routed: "h8f.9 P4 / 6hb.7 M5 / 6ze.38 M4 variable-held describe options",
    source: { prelude: "const DESCRIBE_OPTS = { skip: true };", body: `  describe("inner", DESCRIBE_OPTS, () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  {
    id: "r-6ze38-m4b-paren-describe",
    routed: "6ze.38 M4b a describe options literal in parentheses",
    source: { body: `  describe("inner", ({ skip: true }), () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-x2-describe-options", routed: "752.10 X2 / 6hb.6 S10 / 6hb.7 S5 describe options skip", source: { body: `  describe("inner", { skip: true }, () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-n7-for-empty", routed: "6hb.6 N7 for (const _ of []) {}", source: { body: `  for (const _ of []) {\n  ${PLAIN}\n  }` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-n8-switch", routed: "6hb.6 N8 switch (0) { case 1: }", source: { body: `  switch (0 as number) {\n    case 1:\n  ${PLAIN}\n  }` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-n9-foreach-empty", routed: "6hb.6 N9 [].forEach(() => {})", source: { body: `  [].forEach(() => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-n10-describe-each-empty", routed: "6hb.6 N10 / 752.10 X6b / 6ze.38 M1 describe.each([])", source: { body: `  describe.each([])("inner %s", () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  {
    id: "r-cax25-m12a-describe-each-variable",
    routed: "cax.25 M12a describe.each(GEOMETRIES) with the table emptied",
    source: { prelude: "const GEOMETRIES: string[][] = [];", body: `  describe.each(GEOMETRIES)("inner %s", () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  {
    id: "r-n12-never-called",
    routed: "6hb.6 N12 / 0kg.11 (10) / 0kg.12 never-called / 6hb.7 S11 / 6hb.11 S19 never-called closure",
    source: { body: `  const registerLater = (): void => {\n  ${PLAIN}\n  };\n  void registerLater;` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  { id: "r-n13-iife-shadow", routed: "6hb.6 N13 IIFE parameter shadowing it", source: { body: `  ((it: (title: string, fn: () => void) => void) => {\n    it("${PIN}", () => {\n      expect(1).toBe(1);\n    });\n  })(() => undefined);` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  {
    id: "r-6hb7-m9-local-shadow",
    routed: "6hb.7 M9 / cax.25 M11 a plain nested block shadowing it with a local no-op",
    source: { body: `  {\n    const it = (_title: string, _fn: () => void): void => undefined;\n    it("${PIN}", () => {\n      expect(1).toBe(1);\n    });\n  }` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  { id: "r-n16-labelled-break", routed: "6hb.6 N16 w: { break w; ... }", source: { body: `  w: {\n    break w;\n  ${PLAIN}\n  }` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-n17-try-throw", routed: "6hb.6 N17 try { throw 0; ... } catch {}", source: { body: `  try {\n    throw 0;\n  ${PLAIN}\n  } catch {\n    // registration never reached\n  }` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  {
    id: "r-0kg11-1-env-conditional",
    routed: "0kg.11 (1) / 752.10 X3 / 6hb.6 S12 / 0kg.12 env-conditional / 6hb.7 S10 env-conditional registration",
    source: { body: `  if (process.env.CENSUS_HELPER_NEVER_SET === "1") {\n  ${PLAIN}\n  }` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  { id: "r-0kg11-8-spaced-chain", routed: "0kg.11 (8) / 0kg.12 spaced-describe chain describe .skipIf(true)", source: { body: `  describe .skipIf(true)("inner", () => {\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  { id: "r-0kg12-spaced-it", routed: "0kg.12 spaced-it chain it .skipIf(true)", source: { body: `  it .skipIf(true)("${PIN}", ${BODY});` }, oracle: RUNS_NOT, verdict: red("skipped", "runs-where") },
  {
    id: "r-0kg11-9-renamed-import",
    routed: "0kg.11 (9) / 0kg.12 (7) / 6ze.38 M2b renamed import alias it as itBase + const it = itBase.skip",
    source: { imports: 'import { describe, expect, it as itBase } from "vitest";', prelude: "const it = itBase.skip;", body: PLAIN },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  { id: "r-p9-conditional-return", routed: "h8f.9 P9 / 6hb.7 M8 / 6ze.38 K13 early exit in the describe callback", source: { body: `  if (Date.now() > 0) return;\n${PLAIN}` }, oracle: RUNS_NOT, verdict: red("absent", "exists") },
  { id: "r-s7-fails", routed: "cax.23 S7 it.fails inversion", source: { body: `  it.fails("${PIN}", () => {\n    expect(1).toBe(2);\n  });` }, oracle: { kind: "inverted" }, verdict: red("inverted", "asserts", /registered with fails/) },
  { id: "r-6hb7-s4-fails-options", routed: "6hb.7 S4 options { fails: true } (polarity inverted)", source: { body: `  it("${PIN}", { fails: true }, () => {\n    expect(1).toBe(2);\n  });` }, oracle: { kind: "inverted" }, verdict: red("inverted", "asserts") },
  { id: "r-s7-fails-variable", routed: "cax.23 S7 fails through variable-held options", source: { prelude: "const FAILS = { fails: true };", body: `  it("${PIN}", FAILS, () => {\n    expect(1).toBe(2);\n  });` }, oracle: { kind: "inverted" }, verdict: red("inverted", "asserts") },
];

/** The runner's public current-test routes (vitest/suite re-exports @vitest/runner; deprecated there since 4.1 but live). */
const IMPORTS_SUITE = `${IMPORTS}\nimport { getCurrentSuite, getCurrentTest } from "vitest/suite";`;
const SKIP_CURRENT = `  it("${PIN}", () => {\n    getCurrentTest()?.context.skip();\n    expect(1).toBe(1);\n  });`;

/**
 * U1 judge detection (wb-u62 gate-1 cmd_2b0d57494582, measured end to end): code that can tell the census's own run
 * from the gate's run fabricates a green. Runner truth is the gate's run under the documented gate env
 * (VITEST_MAX_WORKERS set, no census name anywhere), and the helper must see exactly what that run sees: it adds no
 * name to the judged code's environment and strips only what vitest itself sets in a worker. U2: a red names what it
 * observed (getCurrentTest is a context reference, the test.extend precedent), never an unobserved cause.
 */
const JUDGE_ROWS: readonly Row[] = [
  {
    id: "j-u62-j1-runif-nested",
    routed: "u62 J1 it.runIf on the census's nested-run marker",
    source: { body: `  it.runIf(process.env.CENSUS_HELPER_NESTED === "1")("${PIN}", ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  {
    id: "j-u62-j2-report-out",
    routed: "u62 J2 registration only while the census's report path is set",
    source: { body: `  if (process.env.CENSUS_REPORT_OUT !== undefined) {\n  ${PLAIN}\n  }` },
    oracle: RUNS_NOT,
    verdict: red("absent", "exists"),
  },
  {
    id: "j-u62-j3-describe-runif",
    routed: "u62 J3 describe.runIf on the census's nested-run marker",
    source: { body: `  describe.runIf(process.env.CENSUS_HELPER_NESTED === "1")("inner", () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  {
    id: "j-u62-j4-operator-cap",
    routed: "u62 J4 it.skipIf on the operator's VITEST_MAX_WORKERS (the documented gate env)",
    source: { body: `  it.skipIf(process.env.VITEST_MAX_WORKERS !== undefined)("${PIN}", ${BODY});` },
    oracle: RUNS_NOT,
    verdict: red("skipped", "runs-where"),
  },
  {
    id: "j-u62-j5-current-test-env",
    routed: "u62 J5 getCurrentTest()?.context.skip() unless the census's marker is set",
    source: { imports: IMPORTS_SUITE, body: `  it("${PIN}", () => {\n    if (process.env.CENSUS_HELPER_NESTED !== "1") getCurrentTest()?.context.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /getCurrentTest from vitest\/suite/),
  },
  { id: "j-u62-a1a-current-test-body", routed: "u62 A1a getCurrentTest()?.context.skip() in the case body", source: { imports: IMPORTS_SUITE, body: SKIP_CURRENT }, oracle: RUNS_NOT, verdict: red("context-unknown", "runs-where", /getCurrentTest from vitest\/suite/) },
  {
    id: "j-u62-a1b-current-test-hook",
    routed: "u62 A1b getCurrentTest()?.context.skip() in the pin's own enclosing beforeEach",
    source: { imports: IMPORTS_SUITE, body: `  describe("inner", () => {\n    beforeEach(() => {\n      getCurrentTest()?.context.skip();\n    });\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /beforeEach at .*getCurrentTest from vitest\/suite/),
  },
  {
    id: "j-u62-j5-runner-package",
    routed: "u62 J5 getCurrentTest imported from @vitest/runner",
    source: { imports: `${IMPORTS}\nimport { getCurrentTest } from "@vitest/runner";`, body: SKIP_CURRENT },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /getCurrentTest from @vitest\/runner/),
  },
  {
    id: "j-u62-j5-test-runner-static",
    routed: "u62 J5 TestRunner.getCurrentTest() from the vitest entry (the 4.1 route)",
    source: { imports: 'import { beforeEach, describe, expect, it, TestRunner, test } from "vitest";', body: `  it("${PIN}", () => {\n    TestRunner.getCurrentTest()?.context.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /TestRunner from vitest/),
  },
  {
    id: "j-u62-j5-namespace",
    routed: "u62 J5 a namespace import of vitest/suite",
    source: { imports: `${IMPORTS}\nimport * as runner from "vitest/suite";`, body: `  it("${PIN}", () => {\n    runner.getCurrentTest()?.context.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /runner from vitest\/suite/),
  },
  {
    id: "j-u62-j5-helper",
    routed: "u62 J5 getCurrentTest reached through a same-file helper the case calls",
    source: { imports: IMPORTS_SUITE, prelude: "function skipCurrent(): void {\n  getCurrentTest()?.context.skip();\n}", body: `  it("${PIN}", () => {\n    skipCurrent();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /getCurrentTest from vitest\/suite/),
  },
  {
    id: "j-u62-j5-alias",
    routed: "u62 J5 getCurrentTest through a module-level alias",
    source: { imports: IMPORTS_SUITE, prelude: "const current = getCurrentTest;", body: `  it("${PIN}", () => {\n    current()?.context.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /getCurrentTest from vitest\/suite/),
  },
  {
    id: "j-u62-j5-suite-hook",
    routed: "u62 J5 getCurrentSuite().on(beforeEach) installs a skipping hook in the pin's own suite",
    source: { imports: IMPORTS_SUITE, body: `  describe("inner", () => {\n    getCurrentSuite().on("beforeEach", (ctx) => {\n      ctx.skip();\n    });\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /getCurrentSuite from vitest\/suite/),
  },
  {
    id: "j-u62-j5-dynamic-import",
    routed: "u62 J5 the runner module imported dynamically inside the case",
    source: { body: `  it("${PIN}", async () => {\n    const runner = await import("vitest/suite");\n    runner.getCurrentTest()?.context.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /imports vitest\/suite/),
  },
  {
    id: "j-u62-control-sibling-current-test",
    routed: "u62 J5 control: getCurrentTest read by ANOTHER case of the file leaves the pin green",
    source: { imports: IMPORTS_SUITE, body: `${PLAIN}\n  it("reads its own name", () => {\n    expect(getCurrentTest()?.name).toBe("reads its own name");\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "j-u62-control-sibling-suite-hook",
    routed: "u62 J5 control: a getCurrentSuite hook in a SIBLING describe does not reach the pin",
    source: {
      imports: IMPORTS_SUITE,
      body: PLAIN,
      after: 'describe("sibling", () => {\n  getCurrentSuite().on("beforeEach", (ctx) => {\n    ctx.skip();\n  });\n  it("sibling case", () => {\n    expect(1).toBe(1);\n  });\n});',
    },
    oracle: RUNS,
    verdict: OK,
  },
];

/**
 * Inversion and options under report mode: vitest's JSON report records an inverted (fails) case as passed, so report
 * mode reads fails from the AST - the registration chain through const aliases, the case's options and every
 * enclosing suite's options (vitest merges suite options into the case's) - and fails closed where the options or the
 * enclosing suites are not statically readable, or where config tags (whose definitions may set fails) apply. The
 * executing run reads the runner's own fails flag, so these rows are the same verdict there except where noted.
 */
const INVERSION_ROWS: readonly Row[] = [
  {
    id: "r-u62-describe-fails",
    routed: "u62 report-mode inversion: describe options { fails: true } inherited by the pin",
    source: { body: `  describe("inner", { fails: true }, () => {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
  },
  {
    id: "r-u62-aliased-fails",
    routed: "u62 report-mode inversion: an aliased registration const parked = it.fails",
    source: { prelude: "const parked = it.fails;", body: `  parked("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
  },
  {
    id: "r-u62-tags",
    routed: "u62 report-mode options: a case carrying a config tag (a tag definition may set fails)",
    source: { body: `  it("${PIN}", { tags: ["census-tag"] }, ${BODY});` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /carries the tags \["census-tag"\]/),
  },
  {
    id: "r-u62-assign-options",
    routed: "u62 report-mode options: Object.assign-built options on a passing case",
    source: { body: `  it("${PIN}", Object.assign({}, { timeout: 5000 }), ${BODY});` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /not a same-file const object literal/),
  },
  { id: "r-u62-literal-options", routed: "u62 report-mode control: literal options without fails", source: { body: `  it("${PIN}", { timeout: 5000 }, ${BODY});` }, oracle: RUNS, verdict: OK },
  { id: "r-u62-const-options", routed: "u62 report-mode control: const-held options without fails", source: { prelude: "const OPTS = { timeout: 5000 };", body: `  it("${PIN}", OPTS, ${BODY});` }, oracle: RUNS, verdict: OK },
  { id: "r-u62-fails-false", routed: "u62 report-mode control: options { fails: false }", source: { body: `  it("${PIN}", { fails: false }, ${BODY});` }, oracle: RUNS, verdict: OK },
  {
    id: "r-u62-describe-options-control",
    routed: "u62 report-mode control: enclosing describe options without fails",
    source: { body: `  describe("inner", { timeout: 5000 }, () => {\n  ${PLAIN}\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  // u62 gate-2 U1 (cmd_337abda7b0e2): five callee shapes whose chain root is not vitest's it / test. The runner reports
  // each expect(1).toBe(2)-only case passed; report mode must read options-unknown NAMING the callee, never ok.
  {
    id: "r-u62g2-u1-object-held",
    routed: "u62 gate-2 U1.1 an object-held registration: const api = { run: it.fails }; api.run(...)",
    source: { prelude: "const api = { run: it.fails };", body: `  api.run("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration api\.run at line \d+:\d+ does not resolve to vitest's it \/ test/),
  },
  {
    id: "r-u62g2-u1-destructured",
    routed: "u62 gate-2 U1.2 a destructured registration: const { fails } = it; fails(...)",
    source: { prelude: "const { fails } = it;", body: `  fails("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration fails at line \d+:\d+ does not resolve to vitest's it \/ test/),
  },
  {
    id: "r-u62g2-u1-returned",
    routed: "u62 gate-2 U1.3 a function-returned registration: function pick() { return it.fails; } pick()(...)",
    source: { prelude: "function pick(): typeof it.fails {\n  return it.fails;\n}", body: `  pick()("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration pick\(\) at line \d+:\d+ does not resolve to vitest's it \/ test/),
  },
  {
    id: "r-u62g2-u1-class-static",
    routed: "u62 gate-2 U1.4 a class-static registration: class Reg { static run = it.fails; } Reg.run(...)",
    source: { prelude: "class Reg {\n  static run = it.fails;\n}", body: `  Reg.run("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration Reg\.run at line \d+:\d+ does not resolve to vitest's it \/ test/),
  },
  {
    id: "r-u62g2-u1-object-assign",
    routed: "u62 gate-2 U1.5 an Object.assign-built registration: const reg = Object.assign(it.fails, {}); reg(...)",
    source: { prelude: "const reg = Object.assign(it.fails, {});", body: `  reg("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration reg at line \d+:\d+ does not resolve to vitest's it \/ test/),
  },
  // u62 gate-2 I1, the owner's design invariant (21:29Z: every value flow report mode reads fails closed to
  // options-unknown when it cannot resolve) applied to the inversion read's other callee flow: an enclosing callback whose
  // holder is not vitest's describe / suite may register a suite with fails. Measured fail-open on the de90b83 helper.
  {
    id: "r-u62g2-i1-object-held-suite",
    routed: "u62 gate-2 I1.1 invariant: the enclosing suite registered through an object-held describe with { fails: true }",
    source: { prelude: "const api = { suite: describe };", body: `  api.suite("inner", { fails: true }, () => {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside a callback of api\.suite at line \d+:\d+, which does not resolve to vitest's describe \/ suite/),
  },
  {
    id: "r-u62g2-i1-wrapper-suite",
    routed: "u62 gate-2 I1.2 invariant: the enclosing suite created by a same-file wrapper function with { fails: true }",
    source: {
      prelude: "function failing(name: string, fn: () => void): void {\n  describe(name, { fails: true }, fn);\n}",
      body: `  failing("inner", () => {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside a callback of failing at line \d+:\d+, which does not resolve to vitest's describe \/ suite/),
  },
  {
    id: "r-u62g2-i1-foreach-holder",
    routed: "u62 gate-2 I1.3 invariant, the fail-closed cost: a case inside a forEach callback (no holder in test/** today)",
    source: { body: `  [0].forEach(() => {\n    it("${PIN}", () => {\n      expect(1).toBe(1);\n    });\n  });` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /inside a callback of \[0\]\.forEach at line \d+:\d+, which does not resolve to vitest's describe \/ suite/),
  },
  // u62 gate-3 (cmd_52185d639797, the battery mirrored at machines/flywheel/state/gate3-u62-notes-c02d9b1/g3-falsify.mts):
  // the design invariant on the inversion read's ENCLOSURE flow. A case registered inside a body that runs where it is
  // CALLED (a method, accessor, constructor or instance property initializer) does not show its enclosing suites in the
  // source. Runner truth for each: an expect(1).toBe(2)-only case reported passed. Fail-open in report mode on c02d9b1.
  {
    id: "r-u62g3-1-object-method",
    routed: "u62 gate-3 (1) an object METHOD holder registering the pin, invoked inside a { fails: true } describe",
    source: { prelude: `const holder = {\n  register(): void {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  },\n};`, body: `  describe("inner", { fails: true }, () => {\n    holder.register();\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside the method register at line \d+:\d+, which runs where it is called/),
  },
  {
    id: "r-u62g3-2-class-static-method",
    routed: "u62 gate-3 (2) a class STATIC METHOD holder registering the pin, invoked inside a { fails: true } describe",
    source: { prelude: `class Holder {\n  static register(): void {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  }\n}`, body: `  describe("inner", { fails: true }, () => {\n    Holder.register();\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside the method register at line \d+:\d+, which runs where it is called/),
  },
  {
    id: "r-u62g3-3-getter",
    routed: "u62 gate-3 (3) an object GETTER registering the pin, read inside a { fails: true } describe",
    source: { prelude: `const holder = {\n  get registered(): number {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n    return 1;\n  },\n};`, body: `  describe("inner", { fails: true }, () => {\n    void holder.registered;\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside the getter registered at line \d+:\d+, which runs where it is called/),
  },
  {
    id: "r-u62g3-4-constructor",
    routed: "u62 gate-3 (4) a class CONSTRUCTOR registering the pin, constructed inside a { fails: true } describe",
    source: { prelude: `class Holder {\n  constructor() {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  }\n}`, body: `  describe("inner", { fails: true }, () => {\n    new Holder();\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside the constructor of a class at line \d+:\d+, which runs where it is called/),
  },
  {
    id: "r-u62g3-5-property-initializer",
    routed: "u62 gate-3 (5) a class instance PROPERTY INITIALIZER registering the pin, constructed inside a { fails: true } describe",
    source: { prelude: `class Holder {\n  readonly registered = it("${PIN}", () => {\n    expect(1).toBe(2);\n  });\n}`, body: `  describe("inner", { fails: true }, () => {\n    new Holder();\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside the instance property initializer registered at line \d+:\d+, which runs where it is called/),
  },
  // u62 gate-3, the invariant on the CALLEE and HOLDER member flows: every member along a registration chain must be one
  // vitest's API defines (the model is pinned against the runtime objects below); a user-added member is unresolved.
  {
    id: "r-u62g3-6-callee-unknown-member",
    routed: "u62 gate-3 (6) a callee member the model does not know: Object.assign(it, { inv: it.fails }); api.inv(...)",
    source: { prelude: "const api = it as typeof it & { inv: typeof it.fails };\nObject.assign(it, { inv: it.fails });", body: `  api.inv("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration api\.inv at line \d+:\d+ does not resolve to vitest's it \/ test: inv is not a member of vitest's test API/),
  },
  {
    id: "r-u62g3-7-holder-unknown-member",
    routed: "u62 gate-3 (7) a holder member the model does not know: Object.assign(describe, { failing }) then suites.failing(...)",
    source: {
      prelude:
        "const suites = describe as typeof describe & { failing: (name: string, fn: () => void) => void };\nObject.assign(describe, { failing: (name: string, fn: () => void): void => describe(name, { fails: true }, fn) });",
      body: `  suites.failing("inner", () => {\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /inside a callback of suites\.failing at line \d+:\d+, which does not resolve to vitest's describe \/ suite: failing is not a member of vitest's suite API/),
  },
  {
    id: "r-u62g3-1c-method-holder-cost",
    routed: "u62 gate-3 (1c) the fail-closed cost: a method-held registration of a PASSING case in a plain describe (0 in test/** today)",
    source: { prelude: `const holder = {\n  register(): void {\n    it("${PIN}", () => {\n      expect(1).toBe(1);\n    });\n  },\n};`, body: `  describe("inner", () => {\n    holder.register();\n  });` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /inside the method register at line \d+:\d+, which runs where it is called/),
  },
  {
    id: "r-u62g3-6c-unknown-member-cost",
    routed: "u62 gate-3 (6c) the fail-closed cost: a user-added member that is plain it (0 in test/** today; respin-4: the escape reaches the test context too, so both modes pay it)",
    source: { prelude: "const api = it as typeof it & { inv: typeof it };\nObject.assign(it, { inv: it });", body: `  api.inv("${PIN}", ${BODY});` },
    oracle: RUNS,
    verdict: red("context-unknown", "runs-where", /the registration API escapes in this file: it at line \d+:\d+ is handed to a call, and the hooks it carries/),
    report: red("options-unknown", "asserts", /the registration api\.inv at line \d+:\d+ does not resolve to vitest's it \/ test: inv is not a member of vitest's test API/),
  },
  // u62 gate-3, the CONTEXT flow in BOTH modes: the runner flips a case after its last hook (@vitest/runner reads test.fails
  // post-run), so a write through the test context inverts it while the report and the reporter's collected fails both
  // say passed. Every write through the context - the case body, a hook of its own chain, a handler it registers - is
  // context-unknown. The executing verdict is context-unknown, never inverted: the reporter never sees the flip (measured,
  // vitest 4.1.10 syncs only a task's result and meta to the main process).
  {
    id: "r-u62g3-8-context-write-task",
    routed: "u62 gate-3 (8) the case sets task.fails = true through its own destructured test context",
    source: { body: `  it("${PIN}", ({ task }) => {\n    task.fails = true;\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62g3-9-context-write-ctx",
    routed: "u62 gate-3 (9) the case sets ctx.task.fails = true",
    source: { body: `  it("${PIN}", (ctx) => {\n    ctx.task.fails = true;\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /ctx\.task\.fails is written through the test context/),
  },
  {
    id: "r-u62g3-10-context-write-hook",
    routed: "u62 gate-3 (10) a beforeEach of the pin's own describe sets task.fails = true",
    source: { body: `  describe("inner", () => {\n    beforeEach(({ task }) => {\n      task.fails = true;\n    });\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /beforeEach at line \d+:\d+: task\.fails is written through the test context/),
  },
  // u62 respin-3 (seat-measured, beyond the battery): the same three flows through routes the battery did not probe.
  // Each runner-verified (the case's only assertion is false, the run passes it) and fail-open in both modes on c02d9b1.
  {
    id: "r-u62r3-a1-api-member-overwrite",
    routed: "u62 respin-3 A1 the registration API itself mutated: it.runIf = () => it.fails, then it.runIf(true)(...)",
    source: { prelude: "it.runIf = (() => it.fails) as unknown as typeof it.runIf;", body: `  it.runIf(true)("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: it\.runIf is written at line \d+:\d+/),
  },
  {
    id: "r-u62r3-a2-test-api-hook",
    routed: "u62 respin-3 A2 a hook registered through the test API, it.beforeEach, sets task.fails = true",
    source: { body: `  describe("inner", () => {\n    it.beforeEach(({ task }) => {\n      task.fails = true;\n    });\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /beforeEach at line \d+:\d+: task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a3-aftereach-write",
    routed: "u62 respin-3 A3 an afterEach of the pin's own describe sets task.fails = true (it runs before the runner's flip)",
    source: {
      imports: 'import { afterEach, beforeEach, describe, expect, it, test } from "vitest";',
      body: `  describe("inner", () => {\n    afterEach(({ task }) => {\n      task.fails = true;\n    });\n    it("${PIN}", () => {\n      expect(1).toBe(2);\n    });\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /afterEach at line \d+:\d+: task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a4-registrar-handler",
    routed: "u62 respin-3 A4 a handler registered through ctx.onTestFailed sets failed.task.fails = true",
    source: { body: `  it("${PIN}", (ctx) => {\n    ctx.onTestFailed((failed) => {\n      failed.task.fails = true;\n    });\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /failed\.task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a5-result-rewrite",
    routed: "u62 respin-3 A5 the case rewrites its own result after a failing expect.soft: task.result.state = pass",
    source: { body: `  it("${PIN}", ({ task }) => {\n    expect.soft(1).toBe(2);\n    if (task.result) {\n      task.result.state = "pass";\n      task.result.errors = [];\n    }\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.result\.state is written through the test context/),
  },
  {
    id: "r-u62r3-a6-imported-registrar",
    routed: "u62 respin-3 A6 a handler registered through vitest's onTestFinished export sets task.fails = true",
    source: {
      imports: 'import { beforeEach, describe, expect, it, onTestFinished, test } from "vitest";',
      body: `  it("${PIN}", () => {\n    onTestFinished(({ task }) => {\n      task.fails = true;\n    });\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a11-runner-handle",
    routed: "u62 respin-3 A11 the registration API mutated through @vitest/runner, which holds the same objects: runnerIt.runIf = () => runnerIt.fails",
    source: {
      imports: 'import { beforeEach, describe, expect, it, test } from "vitest";\nimport { it as runnerIt } from "@vitest/runner";',
      prelude: "runnerIt.runIf = (() => runnerIt.fails) as unknown as typeof runnerIt.runIf;",
      body: `  it.runIf(true)("${PIN}", () => {\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: an alternate handle to vitest's registration API, runnerIt from @vitest\/runner, is imported at line \d+:\d+/),
  },
  {
    id: "r-u62r3-a12-dynamic-load",
    routed: "u62 respin-3 A12 the registration API mutated through a dynamic import of vitest: runtime.it.runIf = () => runtime.it.fails",
    source: {
      prelude: 'const runtime = await import("vitest");\nruntime.it.runIf = (() => runtime.it.fails) as unknown as typeof runtime.it.runIf;',
      body: `  it.runIf(true)("${PIN}", () => {\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: vitest is loaded dynamically at line \d+:\d+/),
  },
  {
    id: "r-u62r3-k1-static-block",
    routed: "u62 respin-3 K1 control: a class static block runs where it is written, so the walk reaches the { fails: true } describe",
    source: { body: `  describe("inner", { fails: true }, () => {\n    class Holder {\n      static {\n        it("${PIN}", () => {\n          expect(1).toBe(2);\n        });\n      }\n    }\n    void Holder;\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("inverted", "asserts", /registered with fails through the options of the enclosing suite/),
  },
  {
    id: "r-u62r3-k2-context-subject",
    routed: "u62 respin-3 K2 control: a value read through the test context as an assertion's subject stays ok",
    source: { body: `  it("${PIN}", (ctx) => {\n    expect(ctx.task.name).toBe("${PIN}");\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  // u62 respin-3, the handler flow: vitest calls an onTestFailed / onTestFinished handler WITH the test context, so a
  // handler's parameters are context roots wherever the census reaches the registration - a same-file helper the case
  // calls (the J5 walk), a named handler, a function expression reading its arguments object.
  {
    id: "r-u62r3-a7-helper-registrar",
    routed: "u62 respin-3 A7 a same-file helper the case calls registers onTestFinished(({ task }) => { task.fails = true })",
    source: {
      imports: 'import { beforeEach, describe, expect, it, onTestFinished, test } from "vitest";',
      prelude: "function invertCurrent(): void {\n  onTestFinished(({ task }) => {\n    task.fails = true;\n  });\n}",
      body: `  it("${PIN}", () => {\n    invertCurrent();\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the case reaches the handler onTestFinished registers at line \d+:\d+: task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a8-named-handler",
    routed: "u62 respin-3 A8 a NAMED handler with a context parameter: ctx.onTestFinished(flip), flip setting task.fails = true",
    source: {
      prelude: "function flip({ task }: { task: { fails?: boolean } }): void {\n  task.fails = true;\n}",
      body: `  it("${PIN}", (ctx) => {\n    ctx.onTestFinished(flip);\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the handler flip that ctx\.onTestFinished registers: task\.fails is written through the test context/),
  },
  {
    id: "r-u62r3-a9-handler-arguments",
    routed: "u62 respin-3 A9 a function-expression handler reaching its context through the arguments object",
    source: { body: `  it("${PIN}", (ctx) => {\n    ctx.onTestFinished(function () {\n      (arguments[0] as { task: { fails: boolean } }).task.fails = true;\n    });\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the handler ctx\.onTestFinished registers reads the arguments object/),
  },
  {
    id: "r-u62r3-a10-assertion-callback",
    routed: "u62 respin-3 A10 runner state an assertion checks reaches its callback: expect(task.result).toSatisfy((result) => ...) rewrites the result",
    source: {
      body: `  it("${PIN}", ({ task }) => {\n    expect.soft(1).toBe(2);\n    expect(task.result).toSatisfy((result) => {\n      if (result) {\n        result.state = "pass";\n        result.errors = [];\n      }\n      return true;\n    });\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /\]: result\.state is written through the test context/),
  },
  {
    id: "r-u62r3-k3-derived-read",
    routed: "u62 respin-3 K3 control: runner state read through ?. and ?? into an assertion's subject stays ok",
    source: { body: `  it("${PIN}", ({ task }) => {\n    expect(task.result?.state ?? "none").toBe("run");\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
];

/** it.each / it.for pins: each-liveness (05:42Z) is the runner's case count at the template's call site, once per table row (13:36Z). */
const EACH: readonly Row[] = [
  {
    id: "e-control",
    routed: "control / cax.25 F7: a two-row it.each table collected twice is green",
    source: { body: `  it.each([["a"], ["b"]])("${PIN} %s", (value) => {\n    expect(value).toBeTruthy();\n  });` },
    pin: { title: `${PIN} %s`, each: { minCases: 2 } },
    oracle: { kind: "passed", cases: 2 },
    verdict: OK,
  },
  {
    id: "e-n11-empty-table",
    routed: "6hb.6 N11 / 0kg.11 (12) / cax.25 M12b emptied it.each table",
    source: { body: `  it.each([] as [string][])("${PIN} %s", (value) => {\n    expect(value).toBeTruthy();\n  });` },
    pin: { title: `${PIN} %s`, each: { minCases: 1 } },
    oracle: RUNS_NOT,
    verdict: red("each-empty", "exists"),
  },
  {
    id: "e-short-table",
    routed: "each-liveness floor: fewer cases than the census requires",
    source: { body: `  it.each([["a"], ["b"]])("${PIN} %s", (value) => {\n    expect(value).toBeTruthy();\n  });` },
    pin: { title: `${PIN} %s`, each: { minCases: 3 } },
    oracle: { kind: "passed", cases: 2 },
    verdict: red("each-empty", "exists"),
  },
  {
    id: "e-cax25-f7-twice",
    routed: "cax.25 F7 / 6hb.11 E1 per-row clause: a table call site reached twice collects every row twice",
    source: { body: `  for (const _round of [1, 2]) {\n    it.each([["a"], ["b"]])("${PIN} %s", (value) => {\n      expect(value).toBeTruthy();\n    });\n  }` },
    pin: { title: `${PIN} %s`, each: { minCases: 2 } },
    oracle: { kind: "passed", cases: 4 },
    verdict: red("duplicated", "exists", /4 case\(s\) for a 2-row table/),
  },
  {
    id: "e-each-two-suites",
    routed: "per-row clause: a table call site inside describe.each registers its rows under two suites",
    source: { body: `  describe.each([["x"], ["y"]])("group %s", () => {\n    it.each([["a"]])("${PIN} %s", (value) => {\n      expect(value).toBeTruthy();\n    });\n  });` },
    pin: { title: `${PIN} %s`, each: { minCases: 1 } },
    oracle: { kind: "passed", cases: 2 },
    verdict: red("duplicated", "exists", /under 2 suites/),
  },
  {
    id: "e-min-zero",
    routed: "per-row clause: an emptied table reddens even when the census asks for zero rows",
    source: { body: `  it.each([] as [string][])("${PIN} %s", (value) => {\n    expect(value).toBeTruthy();\n  });` },
    pin: { title: `${PIN} %s`, each: { minCases: 0 } },
    oracle: RUNS_NOT,
    verdict: red("each-empty", "exists", /at least 1/),
  },
  {
    id: "e-for-control",
    routed: "control: it.for with the context second (context expect is an assertion)",
    source: { body: `  it.for([1, 2])("${PIN} %i", (value, ctx) => {\n    ctx.expect(value).toBeGreaterThan(0);\n  });` },
    pin: { title: `${PIN} %i`, each: { minCases: 2 } },
    oracle: { kind: "passed", cases: 2 },
    verdict: OK,
  },
  {
    id: "e-for-skip",
    routed: "it.for context skip (the context is the SECOND parameter)",
    source: { body: `  it.for([1])("${PIN} %i", (_value, ctx) => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });` },
    pin: { title: `${PIN} %i`, each: { minCases: 1 } },
    oracle: RUNS_NOT,
    verdict: red("context-skip", "runs-where"),
  },
];

/** Runtime skips the listing cannot see (0kg.11 measured split): the tier run reports them skipped, and the AST scan of the located case names the cause. */
const BODY_ROWS: readonly Row[] = [
  { id: "b-x1-ctx-skip", routed: "752.10 X1 / 6hb.6 S5 / 6hb.7 S8 ctx.skip()", source: { body: `  it("${PIN}", (ctx) => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-0kg11-5-optional-call", routed: "0kg.11 (5) / 0kg.12 (4) / 6hb.7 K3 / 752.15 M2 ctx.skip?.()", source: { body: `  it("${PIN}", (ctx) => {\n    ctx.skip?.();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-0kg11-6-aliased", routed: "0kg.11 (6) / h8f.9 P8 / 0kg.12 (5) / 6hb.7 K2 / 6ze.38 M6 / cax.25 M7 aliased const stop = ctx.skip", source: { body: `  it("${PIN}", (ctx) => {\n    const stop = ctx.skip;\n    stop();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-p7-bracket", routed: 'h8f.9 P7 / 6hb.6 N15 / 6hb.7 M7 / cax.25 M6 tc["skip"]()', source: { body: `  it("${PIN}", async (tc) => {\n    tc["skip"]();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-destructured", routed: "6hb.6 S5 / 6hb.7 S9 / 6hb.11 S10b destructured skip()", source: { body: `  it("${PIN}", ({ skip }) => {\n    skip();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-n14-renamed-destructured", routed: "6hb.6 N14 / h8f.9 P6 / 6hb.7 K1 / cax.25 M8 / 752.15 M3 ({ skip: halt }) => halt()", source: { body: `  it("${PIN}", async ({ skip: halt }) => {\n    halt();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  {
    id: "b-0kg11-11-lexer-desync",
    routed: "0kg.11 (11) / gs2.2 X17 / cax.25 K2 / 752.15 M4 lexer desync: a regex literal that a comment strip reads as /*",
    source: { body: `  it("${PIN}", (ctx) => {\n    void /\\/*/;\n    ctx.skip();\n    const commentEnd = "*/";\n    expect(commentEnd).toBe("*/");\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-skip", "runs-where"),
  },
  {
    id: "b-0kg12-6-desync-line-comment",
    routed: "0kg.12 (6) lexer desync: void /\\/*/; ctx.skip(); // */",
    source: { body: `  it("${PIN}", (ctx) => {\n    void /\\/*/;\n    ctx.skip(); // */\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-skip", "runs-where"),
  },
  { id: "b-alias-context", routed: "fail-closed: the whole context aliased (const c = ctx; c.skip())", source: { body: `  it("${PIN}", (ctx) => {\n    const c = ctx;\n    c.skip();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  { id: "b-task-context", routed: "fail-closed: ctx.task.context.skip()", source: { body: `  it("${PIN}", (ctx) => {\n    ctx.task.context.skip();\n    expect(1).toBe(1);\n  });` }, oracle: RUNS_NOT, verdict: red("context-skip", "runs-where") },
  {
    id: "b-computed-key",
    routed: "fail-closed: the context read through a computed key",
    source: { body: `  it("${PIN}", (ctx) => {\n    const key = ["sk", "ip"].join("");\n    (ctx as unknown as Record<string, () => void>)[key]();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /computed key/),
  },
  {
    id: "b-6ze38-m8b-identifier-key",
    routed: '6ze.38 M8b the context read through an identifier key (const k = "skip"; ctx[k]())',
    source: { body: `  it("${PIN}", (ctx) => {\n    const k = "skip";\n    ctx[k]();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /computed key/),
  },
  {
    id: "b-6hb7-m10-rest-destructured",
    routed: "6hb.7 M10 a rest-destructured context ({ ...ctx }) => ctx.skip()",
    source: { body: `  it("${PIN}", ({ ...ctx }) => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /rest element/),
  },
  {
    id: "b-6ze38-m8-rest-args",
    routed: "6ze.38 M8 a rest parameter (...args) => args[0].skip()",
    source: { body: `  it("${PIN}", (...args: { skip: () => void }[]) => {\n    args[0]?.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /rest parameter/),
  },
  {
    id: "b-escape",
    routed: "6ze.38 M7 / fail-closed: the context handed to a helper (skipHere(ctx))",
    source: { prelude: "function halt(context: { skip: () => void }): void {\n  context.skip();\n}", body: `  it("${PIN}", (ctx) => {\n    halt(ctx);\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /handed to a call/),
  },
  {
    id: "b-arguments",
    routed: "6hb.7 M11 / fail-closed: the context read through arguments[0]",
    source: { body: `  it("${PIN}", function () {\n    (arguments[0] as { skip: () => void }).skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /arguments object/),
  },
  { id: "b-p5-hook", routed: "h8f.9 P5 / 6hb.7 M6 / cax.25 M9 beforeEach(ctx => ctx.skip()) in the enclosing describe", source: { body: `  describe("inner", () => {\n    beforeEach((ctx) => {\n      ctx.skip();\n    });\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("hook-skip", "runs-where") },
  {
    id: "b-6ze38-m5-hook-by-name",
    routed: "6ze.38 M5 / 752.15 M1 an enclosing beforeEach skipping the pin by its name",
    source: { body: `  describe("inner", () => {\n    beforeEach((ctx) => {\n      if (ctx.task.name.startsWith("${PIN}")) ctx.skip();\n    });\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("hook-skip", "runs-where"),
  },
  { id: "b-file-hook", routed: "file-level beforeEach skip", source: { prelude: "beforeEach((ctx) => {\n  ctx.skip();\n});", body: PLAIN }, oracle: RUNS_NOT, verdict: red("hook-skip", "runs-where") },
  { id: "b-aliased-hook", routed: "aliased hook const hook = beforeEach", source: { prelude: "const hook = beforeEach;", body: `  describe("inner", () => {\n    hook((ctx) => {\n      ctx.skip();\n    });\n  ${PLAIN}\n  });` }, oracle: RUNS_NOT, verdict: red("hook-skip", "runs-where") },
  {
    id: "b-hook-escape",
    routed: "fail-closed: a hook hands its context to a helper",
    source: { prelude: "function halt(context: { skip: () => void }): void {\n  context.skip();\n}", body: `  describe("inner", () => {\n    beforeEach((ctx) => {\n      halt(ctx);\n    });\n  ${PLAIN}\n  });` },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /beforeEach at .*handed to a call/),
  },
  {
    id: "b-extend-fixture",
    routed: "fail-closed: registration through test.extend fixtures",
    source: {
      prelude: "const fixtureTest = test.extend<{ fixture: number }>({\n  fixture: async ({ skip }, use) => {\n    skip();\n    await use(1);\n  },\n});",
      body: `  fixtureTest("${PIN}", ({ fixture }) => {\n    expect(fixture).toBe(1);\n  });`,
    },
    oracle: RUNS_NOT,
    verdict: red("context-unknown", "runs-where", /test\.extend fixtures/),
  },
];

/**
 * The third leg (04:47Z): at least one REACHED vitest assertion. The tier run carries --expect.requireAssertions; the
 * AST inner leg rejects a case whose only counted assertion is a bare expect(x). Runner truth for the oracle:
 * expect.hasAssertions() in a setup file of a separate config. Report mode has no assertion count, so it reads the leg
 * strictly from the source: the first matcher-bearing assertion must be reached on every statically visible path of the
 * case function's own flow - a return, branch, short-circuit, catch or switch clause that routes around it reddens, fired
 * or not; a loop body, an invoked callback and a called helper count as reached (the residual the header names).
 */
const ASSERT_ROWS: readonly Row[] = [
  { id: "a-s8-vacuous", routed: "cax.23 S8 vacuous body", source: { body: `  it("${PIN}", () => {});` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  {
    id: "a-6ze38-m16-early-exit",
    routed: "6ze.38 M16 / cax.25 X1 / 0kg.12 U4a a non-static early exit hollows the pin body",
    source: { body: `  it("${PIN}", () => {\n    if (Date.now() > 0) return;\n    expect(1).toBe(1);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },

  { id: "a-comment-only", routed: "third leg: the only assertion commented out", source: { body: `  it("${PIN}", () => {\n    // expect(1).toBe(1);\n  });` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  { id: "a-after-return", routed: "third leg: assertion after an unconditional return", source: { body: `  it("${PIN}", () => {\n    return;\n    expect(1).toBe(1);\n  });` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  { id: "a-dead-if", routed: "third leg: assertion under if (false)", source: { body: `  it("${PIN}", () => {\n    if (false) {\n      expect(1).toBe(1);\n    }\n  });` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  { id: "a-never-called", routed: "third leg: assertion in a closure that is never called", source: { body: `  it("${PIN}", () => {\n    const check = (): void => {\n      expect(1).toBe(1);\n    };\n    void check;\n  });` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  { id: "a-empty-loop", routed: "third leg: assertion in a loop over a literal empty array", source: { body: `  it("${PIN}", () => {\n    for (const value of [] as number[]) {\n      expect(value).toBe(1);\n    }\n  });` }, oracle: { kind: "vacuous" }, verdict: red("no-assertion", "asserts") },
  {
    id: "a-shadowed-expect",
    routed: "third leg: a local expect shadows vitest's",
    source: { body: `  it("${PIN}", () => {\n    const expect = (_value: unknown) => ({ toBe: (_other: unknown) => undefined });\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts"),
  },
  {
    id: "a-bare-expect",
    routed: "third leg: expect(x) without a matcher (hasAssertions counts it; the planted false value proves it asserts nothing)",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts"),
  },
  {
    id: "a-bare-after-return",
    routed: "inner leg: a counted bare expect(false), the real assertion after an unconditional return",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    return;\n    expect(1).toBe(1);\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-bare-dead-if",
    routed: "inner leg: a counted bare expect(false), the real assertion under if (false)",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    if (false) {\n      expect(1).toBe(1);\n    }\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-bare-never-called",
    routed: "inner leg: a counted bare expect(false), the real assertion in a closure never called",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    const check = (): void => {\n      expect(1).toBe(1);\n    };\n    void check;\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-bare-empty-loop",
    routed: "inner leg: a counted bare expect(false), the real assertion in a loop over a literal empty array",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    for (const value of [] as number[]) {\n      expect(value).toBe(1);\n    }\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-bare-shadowed",
    routed: "752.15 M7 inner leg: a counted bare expect(false), the matcher on a shadowing local expect",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    {\n      const expect = (_value: unknown) => ({ toBe: (_other: unknown) => undefined });\n      expect(1).toBe(2);\n    }\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-bare-comment",
    routed: "inner leg: a counted bare expect(false), the real assertion commented out",
    source: { body: `  it("${PIN}", () => {\n    expect(false);\n    // expect(1).toBe(1);\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /bare expect/),
  },
  {
    id: "a-u62-early-exit-loop",
    routed: "u62 report-mode third leg: a conditional return inside a loop before the first assertion",
    source: { body: `  it("${PIN}", () => {\n    for (const _round of [1]) {\n      if (Date.now() > 0) return;\n    }\n    expect(1).toBe(1);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },
  {
    id: "a-u62-early-exit-catch",
    routed: "u62 report-mode third leg: a return in a catch block before the first assertion",
    source: { body: `  it("${PIN}", () => {\n    try {\n      JSON.parse("{");\n    } catch {\n      return;\n    }\n    expect(1).toBe(1);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },
  {
    id: "a-u62-unfired-guard",
    routed: "u62 report-mode third leg: a guard that did not fire in this run still precedes every assertion",
    source: { body: `  it("${PIN}", () => {\n    if (Date.now() < 0) return;\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },
  {
    id: "a-u62-exit-after-assertion",
    routed: "u62 control: a conditional return after the first assertion (at least one reached, the C2 definition)",
    source: { body: `  it("${PIN}", () => {\n    expect(1).toBe(1);\n    if (Date.now() < 0) return;\n    expect(2).toBe(2);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-6hb11-j1-probe-env-return",
    routed: "6hb.11 J1 a return keyed on the census probe's own environment name (CENSUS_PROBE_OUT)",
    source: { body: `  it("${PIN}", () => {\n    if (!process.env.CENSUS_PROBE_OUT) return;\n    expect(1).toBe(1);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },
  {
    id: "a-u62-conditional-if",
    routed: "u62 report-mode third leg: the only assertion under a non-static if (the M16 class without a return)",
    source: { body: `  it("${PIN}", () => {\n    if (Date.now() < 0) {\n      expect(1).toBe(1);\n    }\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /reached only on some paths: the if at line \d+:\d+ may take the branch without it/),
  },
  {
    id: "a-u62-conditional-and",
    routed: "u62 report-mode third leg: the only assertion behind a short-circuit &&",
    source: { body: `  it("${PIN}", () => {\n    Date.now() < 0 && expect(1).toBe(1);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /reached only on some paths: the && at line \d+:\d+ may short-circuit it/),
  },
  {
    id: "a-u62-conditional-catch",
    routed: "u62 report-mode third leg: a throw before the only assertion, swallowed by a catch",
    source: { body: `  it("${PIN}", () => {\n    try {\n      JSON.parse("{");\n      expect(1).toBe(1);\n    } catch {\n      // swallowed\n    }\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /reached only on some paths: the catch at line \d+:\d+ may swallow a throw that comes before it/),
  },
  {
    id: "a-u62-conditional-switch",
    routed: "u62 report-mode third leg: the only assertion in one clause of a non-static switch",
    source: { body: `  it("${PIN}", () => {\n    switch (Date.now() < 0 ? "a" : "b") {\n      case "a":\n        expect(1).toBe(1);\n        break;\n      default:\n        break;\n    }\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /reached only on some paths: the switch at line \d+:\d+ may take a clause without it/),
  },
  {
    id: "a-u62-ternary-both",
    routed: "u62 report-mode control: an assertion on both arms of a conditional expression",
    source: { body: `  it("${PIN}", () => {\n    Date.now() < 0 ? expect(0).toBe(0) : expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62-try-both",
    routed: "u62 report-mode control: an assertion in the try block and in its catch",
    source: { body: `  it("${PIN}", () => {\n    try {\n      JSON.parse("{");\n      expect(0).toBe(1);\n    } catch (error) {\n      expect(error).toBeInstanceOf(SyntaxError);\n    }\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62-throw-guard",
    routed: "u62 report-mode control: a guard that throws (a throw fails the case, it never hollows it)",
    source: { body: `  it("${PIN}", () => {\n    if (Date.now() < 0) throw new Error("never");\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62-assert-or-throw",
    routed: "u62 report-mode control: one branch asserts and the other throws (every path that passes asserts)",
    source: { body: `  it("${PIN}", () => {\n    if (Date.now() > 0) {\n      expect(1).toBe(1);\n    } else {\n      throw new Error("never");\n    }\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  // u62 gate-2 U2 (cmd_337abda7b0e2): a break leaving an enclosing labeled NON-loop block before the first assertion is a
  // strict exit of that block; the break lands right after the block, so the walk resumes there.
  {
    id: "a-u62g2-u2-labeled-break",
    routed: "u62 gate-2 U2 a break out of an enclosing labeled non-loop block before the only assertion",
    source: { body: `  it("${PIN}", () => {\n    outer: {\n      if (Date.now() > 0) break outer;\n      expect(1).toBe(1);\n    }\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /reached only on some paths: the break at line \d+:\d+ may leave the labeled block outer before it/),
  },
  {
    id: "a-u62g2-u2-assert-after-block",
    routed: "u62 gate-2 U2 control: an assertion after the labeled block is reached on every path (the break lands before it)",
    source: { body: `  it("${PIN}", () => {\n    outer: {\n      if (Date.now() > 0) break outer;\n      expect(1).toBe(1);\n    }\n    expect(2).toBe(2);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62g2-u2-return-after-break",
    routed: "u62 gate-2 U2 fail-closed: a return later in the labeled block still reddens although its break lands after the block",
    source: { body: `  it("${PIN}", () => {\n    outer: {\n      if (Date.now() < 0) break outer;\n      if (Date.now() > 0) return;\n      expect(1).toBe(1);\n    }\n    expect(2).toBe(2);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("no-assertion", "asserts", /may return at line \d+:\d+ before its first matcher-bearing assertion/),
  },
  {
    id: "a-u62g2-u2-strict-only",
    routed: "u62 gate-2 U2 control: an unconditional break out of a labeled try lands before the assertion (the exit is strict-only)",
    source: { body: `  it("${PIN}", () => {\n    outer: try {\n      break outer;\n    } finally {\n      void 0;\n    }\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62-failing-case",
    routed: "u62 result leg: a pinned case that fails is red in both modes (the report's failed status, never read as passed)",
    source: { body: `  it("${PIN}", () => {\n    expect(1).toBe(2);\n  });` },
    oracle: RUNS_NOT,
    verdict: red("failed", "asserts", /failed when test ran it/),
    report: red("failed", "asserts", /failed in the test report/),
  },
  { id: "a-callback", routed: "control: assertions inside a forEach callback", source: { body: `  it("${PIN}", () => {\n    [1, 2].forEach((value) => {\n      expect(value).toBeGreaterThan(0);\n    });\n  });` }, oracle: RUNS, verdict: OK },
  { id: "a-local-helper", routed: "control: assertions in a same-file helper", source: { prelude: "function assertOne(value: number): void {\n  expect(value).toBe(1);\n}", body: `  it("${PIN}", () => {\n    assertOne(1);\n  });` }, oracle: RUNS, verdict: OK },
  {
    id: "a-imported-helper",
    routed: "control: assertions in an imported relative helper module",
    source: { imports: `${IMPORTS}\nimport { assertPositive } from "./census-assert-helper.js";`, body: `  it("${PIN}", () => {\n    assertPositive(2);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  { id: "a-concise", routed: "control: concise arrow body", source: { body: `  it("${PIN}", () => expect(1).toBe(1));` }, oracle: RUNS, verdict: OK },
  { id: "a-u3-refactor", routed: "6hb.6 U3 control: pin body moved to a named function", source: { prelude: "function pinnedBody(): void {\n  expect(1).toBe(1);\n}", body: `  it("${PIN}", pinnedBody);` }, oracle: RUNS, verdict: OK },
  {
    id: "a-conditional",
    routed: "control: assertions on both branches of a runtime condition",
    source: { body: `  it("${PIN}", () => {\n    if (process.env.CENSUS_HELPER_NEVER_SET === "1") {\n      expect(0).toBe(0);\n    } else {\n      expect(1).toBe(1);\n    }\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62r3-k4-unreachable",
    routed: "u62 respin-3 K4 control: expect.unreachable() after the call that must throw is an assertion (it fails the case when reached), the trunk shape of workbench-beads-observer",
    source: { body: `  it("${PIN}", async () => {\n    try {\n      await Promise.reject(new Error("refused"));\n      expect.unreachable();\n    } catch (error) {\n      expect(error).toBeInstanceOf(Error);\n    }\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  // u62 gate-3 (11)-(16), the third leg's ASSERTION flow: evidence is an assertion the runtime builds and checks - an
  // expect(x) / expect.soft(x) / expect.poll(fn) whose first call is a matcher, or an assert call - never a static expect
  // member and never a member every object or function carries. (11)-(14) assert nothing the runtime counts (the
  // hasAssertions oracle fails them); (15)/(16) count one assertion with no matcher (planted-false: the value is false).
  {
    id: "a-u62g3-11-expect-getstate",
    routed: "u62 gate-3 (11) expect.getState() only - zero expect() calls",
    source: { body: `  it("${PIN}", () => {\n    void expect.getState();\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g3-12-expect-assertions-zero",
    routed: "u62 gate-3 (12) expect.assertions(0) only",
    source: { body: `  it("${PIN}", () => {\n    expect.assertions(0);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g3-13-assert-tostring",
    routed: "u62 gate-3 (13) assert.toString() only",
    source: { imports: 'import { assert, beforeEach, describe, expect, it, test } from "vitest";', body: `  it("${PIN}", () => {\n    void assert.toString();\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g3-14-assert-bound",
    routed: "u62 gate-3 (14) assert.isTrue.bind(null, true) - bound, never called",
    source: { imports: 'import { assert, beforeEach, describe, expect, it, test } from "vitest";', body: `  it("${PIN}", () => {\n    void assert.isTrue.bind(null, true);\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g3-15-expect-tostring",
    routed: "u62 gate-3 (15) expect(x).toString() - no matcher, one counted assertion",
    source: { body: `  it("${PIN}", () => {\n    void expect(false).toString();\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g3-16-expect-soft-bare",
    routed: "u62 gate-3 (16) expect.soft(x) with no matcher, one counted assertion",
    source: { body: `  it("${PIN}", () => {\n    void expect.soft(false);\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
];

/** Attribution: hazards scope to the pin's own call chain and body, never file-wide (05:20Z FILE_ONLY ban; 06:10Z). */
const ATTRIBUTION_ROWS: readonly Row[] = [
  { id: "t-a1-quoted-title", routed: "h8f.9 U5 A1: a comment quoting the pinned title above its real call", source: { body: `  // it("${PIN}", () => {}) is quoted here on purpose\n${PLAIN}` }, oracle: RUNS, verdict: OK },
  {
    id: "t-string-hazards",
    routed: "752.10 F2 / 05:20Z: hazard text inside a string or comment is not a hazard",
    source: { prelude: "const QUOTED = 'it.only(\"x\", () => {}); describe.skip(\"y\");';", body: `  // describe.skip("a commented hazard")\n${PLAIN}\n  it("reads the quoted text", () => {\n    expect(QUOTED.length).toBeGreaterThan(0);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-sibling-skips",
    routed: "0kg.11 U4 / 0kg.12 U4b FILE_HAZARD false red: an unrelated skipIf and describe.skip in the same file",
    source: {
      body: PLAIN,
      after: 'describe("unrelated", () => {\n  it.skipIf(process.platform === "win32")("an unrelated platform-gated case", () => {\n    expect(1).toBe(1);\n  });\n});\ndescribe.skip("an unrelated skipped suite", () => {\n  it("never runs", () => {\n    expect(1).toBe(1);\n  });\n});',
    },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-6ze38-m19-describe-skipif",
    routed: "6ze.38 M19 FILE_HAZARD false red: an unrelated describe.skipIf(platform) suite in the pinned file",
    source: { body: PLAIN, after: 'describe.skipIf(process.platform === "linux")("an unrelated platform suite", () => {\n  it("a platform case", () => {\n    expect(1).toBe(1);\n  });\n});' },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-sibling-hook",
    routed: "attribution: a skipping hook in a SIBLING describe does not reach the pin",
    source: { body: PLAIN, after: 'describe("sibling", () => {\n  beforeEach((ctx) => {\n    ctx.skip();\n  });\n  it("sibling case", () => {\n    expect(1).toBe(1);\n  });\n});' },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-hook-timeout",
    routed: "attribution: a vitest hook's second argument is its timeout, never a callback (caught by the FIND-1 smoke on this file)",
    source: { prelude: "const HOOK_TIMEOUT = 5000;", body: `  beforeEach(() => undefined, HOOK_TIMEOUT);\n${PLAIN}` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-next-case-clean",
    routed: "6hb.6 U3 head-misattribution: ctx.skip in the NEXT case leaves the pin green",
    source: { body: `${PLAIN}\n  it("the next case", (ctx) => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-next-case-pinned",
    routed: "6hb.6 U3 head-misattribution: ...and the next case itself is the one named",
    source: { body: `${PLAIN}\n  it("the next case", (ctx) => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });` },
    pin: { title: "the next case" },
    oracle: RUNS_NOT,
    verdict: red("context-skip", "runs-where"),
  },
  {
    id: "t-cax25-k1-desync-clean",
    routed: "cax.25 K1 a lexer desync alone: a real parser reads no false red",
    source: { body: `  it("${PIN}", () => {\n    void /\\/*/;\n    const commentEnd = "*/";\n    expect(commentEnd).toBe("*/");\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-cax25-k2-desync-neighbour",
    routed: "cax.25 K2 a desync in the pin and a ctx.skip in the next case: the pin stays green",
    source: { body: `  it("${PIN}", () => {\n    void /\\/*/;\n    expect(1).toBe(1);\n  });\n  it("the next case", (ctx) => {\n    ctx.skip(); // */\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "t-cax25-k2-desync-neighbour-pinned",
    routed: "cax.25 K2 ...and the RIGHT pin, the next case, is the one reddened",
    source: { body: `  it("${PIN}", () => {\n    void /\\/*/;\n    expect(1).toBe(1);\n  });\n  it("the next case", (ctx) => {\n    ctx.skip(); // */\n    expect(1).toBe(1);\n  });` },
    pin: { title: "the next case" },
    oracle: RUNS_NOT,
    verdict: red("context-skip", "runs-where"),
  },
  {
    id: "t-6hb11-x17-arrow-regex",
    routed: "6hb.11 X17 a regex literal after an arrow (a lexer reads it as division) reads no false red",
    source: { prelude: 'const g2Rx = (s: string): boolean => /"/.test(s);', body: PLAIN },
    oracle: RUNS,
    verdict: OK,
  },
  { id: "t-cax25-fr1-unused-ctx", routed: "cax.25 FR1 a legitimately unused context parameter", source: { body: `  it("${PIN}", async (_ctx) => {\n    expect(1).toBe(1);\n  });` }, oracle: RUNS, verdict: OK },
  { id: "t-cax25-fr2-top-level", routed: "cax.25 FR2 the pin registered at module top level", source: { after: `it("${PIN}", () => {\n  expect(1).toBe(1);\n});` }, oracle: RUNS, verdict: OK },
  { id: "t-cax25-fr3-block-comment", routed: "cax.25 FR3 a block comment in the pin body", source: { body: `  it("${PIN}", () => {\n    /* a block comment in the body */\n    expect(1).toBe(1);\n  });` }, oracle: RUNS, verdict: OK },
];

/** Tier truth in the main synthetic project: forge.toml declares "test" (npm run test -> vitest run) and "live" (its own config). */
interface TierRow {
  readonly id: string;
  readonly routed: string;
  readonly file: string;
  readonly source?: string;
  readonly pin: CasePin;
  readonly oracle: { readonly config: "default" | "live"; readonly kind: "passed" | "not-passed" };
  readonly verdict: Expected;
  /** Report mode's verdict where it differs: a report belongs to ONE tier, so a pin of any other tier is refused (R2=(i)). */
  readonly report?: Expected;
}


const LIVE_ONLY = "test/live-only.test.ts";
const LIVE_IN_DEFAULT = "test/live-in-default.test.ts";
/** Loads only where the live tier's config sets its environment; the default config still collects it. */
const LIVE_ENV = "test/live-env.test.ts";
const SYNTAX_FILE = "test/f-syntax.test.ts";
const IMPORT_FILE = "test/f-import.test.ts";
const CONTROL_FILE = "test/r-control.test.ts";

const TIER_ROWS: readonly TierRow[] = [
  { id: "tier-live-only", routed: "6hb.6 O1: a live-tier pin collected only by its tier config", file: LIVE_ONLY, pin: { file: LIVE_ONLY, title: PIN, tier: "live" }, oracle: { config: "live", kind: "passed" }, verdict: OK },
  {
    id: "tier-live-labelled-default",
    routed: "6hb.6 T1 / 752.10 F3: a default-gate label on a file the default config excludes (named for its own pin)",
    file: LIVE_ONLY,
    pin: { file: LIVE_ONLY, title: PIN, tier: DEFAULT_GATE_TIER },
    oracle: { config: "default", kind: "not-passed" },
    verdict: red("not-collected", "runs-where", /does not collect this file/),
  },
  {
    id: "tier-live-also-default",
    routed: "6hb.6 T3 / 6hb.11 T8: a live-tier label on a file the default gate also runs",
    file: LIVE_IN_DEFAULT,
    pin: { file: LIVE_IN_DEFAULT, title: PIN, tier: "live" },
    oracle: { config: "default", kind: "passed" },
    verdict: red("also-default-gate", "runs-where", /default gate \(test\) also runs it/),
  },
  {
    id: "tier-6hb11-t7-repoint",
    routed: "6hb.11 T7 a live-tier pin whose tier config is re-pointed away from its file",
    file: CONTROL_FILE,
    pin: { file: CONTROL_FILE, title: PIN, tier: "live" },
    oracle: { config: "live", kind: "not-passed" },
    verdict: red("not-collected", "runs-where", /does not collect this file/),
  },
  {
    id: "tier-live-env-at-import",
    routed: "tier truth: a live-tier file the default gate also collects and fails to load (env read at import)",
    file: LIVE_ENV,
    source: `${IMPORTS}\nif (process.env.CENSUS_LIVE_TIER !== "1") throw new Error("the live tier environment is absent");\ndescribe("census suite", () => {\n${PLAIN}\n});\n`,
    pin: { file: LIVE_ENV, title: PIN, tier: "live" },
    oracle: { config: "live", kind: "passed" },
    verdict: red("also-default-gate", "runs-where", /fails to load it: the live tier environment is absent/),
  },
  {
    id: "tier-unknown",
    routed: "fail-closed: a tier forge.toml does not declare",
    file: CONTROL_FILE,
    pin: { file: CONTROL_FILE, title: PIN, tier: "no-such-tier" },
    oracle: { config: "default", kind: "passed" },
    verdict: red("tier-unresolved", "runs-where", /declares no command no-such-tier/),
    report: red("tier-mismatch", "runs-where", /a no-such-tier pin is judged only over its own tier's report/),
  },
  {
    id: "tier-shell",
    routed: "fail-closed: a tier command that is not a vitest invocation",
    file: CONTROL_FILE,
    pin: { file: CONTROL_FILE, title: PIN, tier: "shell-tier" },
    oracle: { config: "default", kind: "passed" },
    verdict: red("tier-unresolved", "runs-where", /runs bash, not vitest/),
    report: red("tier-mismatch", "runs-where", /a shell-tier pin is judged only over its own tier's report/),
  },

  { id: "fail-unreadable", routed: "fail-closed: an unreadable (missing) pinned file", file: "test/m-missing.test.ts", pin: { file: "test/m-missing.test.ts", title: PIN, tier: DEFAULT_GATE_TIER }, oracle: { config: "default", kind: "not-passed" }, verdict: red("unreadable", "exists", /unreadable/) },
  {
    id: "fail-unparseable",
    routed: "fail-closed: an unparseable pinned file",
    file: SYNTAX_FILE,
    source: `${IMPORTS}\ndescribe("census suite", () => {\n  it("${PIN}", () => {\n    expect(1).toBe(1);\n  );\n});\n`,
    pin: { file: SYNTAX_FILE, title: PIN, tier: DEFAULT_GATE_TIER },
    oracle: { config: "default", kind: "not-passed" },
    verdict: red("unparseable", "exists", /does not parse/),
  },
  {
    id: "fail-collection-error",
    routed: "fail-closed: a pinned file whose import throws at collection",
    file: IMPORT_FILE,
    source: `${IMPORTS}\nimport { missing } from "./does-not-exist.js";\ndescribe("census suite", () => {\n  it("${PIN}", () => {\n    expect(missing).toBe(1);\n  });\n});\n`,
    pin: { file: IMPORT_FILE, title: PIN, tier: DEFAULT_GATE_TIER },
    oracle: { config: "default", kind: "not-passed" },
    verdict: red("collection-error", "exists", /could not collect the file/),
  },
];

/**
 * Config-level modes: each mutates the DEFAULT gate of its own synthetic project (vitest.config.ts, the
 * package.json test script, or the forge.toml test step) and pins test/cfg-target.test.ts on that default gate.
 */
interface ConfigRow {
  readonly id: string;
  readonly routed: string;
  readonly configBody?: string;
  readonly configPrelude?: string;
  /** package.json scripts.test; null removes the script. Default "vitest run". */
  readonly testScript?: string | null;
  /** Further package.json scripts (a second npm hop names one). */
  readonly scripts?: Readonly<Record<string, string>>;

  /** forge.toml [build.commands] test. Default "npm run test". */
  readonly forgeCommand?: string;
  /** forge.toml [build] gate. Default ["lint", "test"]. */
  readonly gate?: string;
  /** A whole forge.toml replacing the generated one. */
  readonly rawForge?: string;
  /** Extra project files (setup modules the config names). */
  readonly files?: Readonly<Record<string, string>>;
  /** The pinned file's source, when the row changes it. Default: the plain pinned case. */
  readonly target?: Source;
  readonly oracle: "passed" | "not-passed" | "none";
  readonly verdict: Expected;
  /** Report mode's verdict (over the oracle's own report of the row's default gate) where it differs. */
  readonly report?: Expected;
  /** u62 respin-5: the row's config names no census guard (the census itself must refuse the absent read). */
  readonly unguarded?: boolean;
  /** u62 respin-6: files whose text needs the project's absolute root (an .npmrc preload path, a lifecycle swap's configs). */
  readonly rooted?: (root: string) => Readonly<Record<string, string>>;
  /** u62 respin-6: project files the row marks executable (a script shell). */
  readonly executables?: readonly string[];
  /** u62 respin-6: the project sits at child/ under a directory holding these files (an enclosing npm workspace root). */
  readonly parent?: (root: string) => Readonly<Record<string, string>>;
  /** u62 respin-6: the row's executing and report runs must not overlap (its lifecycle scripts rewrite project files). */
  readonly serial?: boolean;
}

const CFG_TARGET = "test/cfg-target.test.ts";

/** u62 respin-5: the prototype write of the gate-3 r4 P rows (a non-enumerable Object.prototype.fails). */
const PROTO_FAILS = 'Object.defineProperty(Object.prototype, "fails", { value: true, configurable: true, writable: true });';
/** u62 respin-5 F1: a relative module that never touches vitest places a fixtures registry on Object.prototype. */
const FIXTURES_HELPER = [
  'const registrations = new Map([["census", { name: "census", auto: true, scope: "test", value: async (context: { task: { fails?: boolean } }, use: (value: number) => Promise<void>) => {',
  "  context.task.fails = true;",
  "  await use(1);",
  "} }]]);",
  'Object.defineProperty(Object.prototype, "fixtures", { value: { get: () => registrations }, configurable: true, writable: true });',
  "export {};",
  "",
].join("\n");
/** u62 respin-5 RS1 / RS2: code that runs BEFORE the guard - the config module sets a worker preload through NODE_OPTIONS. */
/** respin-4 T2-T4 print from a setup file after the guard; the parent's argv is the vitest command line the census ran. */
const PRINT_AFTER_GUARD = 'setupFiles: ["./census-guard.ts", "./census-print.setup.ts"], sequence: { setupFiles: "list" }';
const PARENT_ARGV = 'import { readFileSync } from "node:fs";\nconst PARENT = readFileSync("/proc/" + process.ppid + "/cmdline", "utf8").split("\\u0000");\n';
const PRELOAD_PRELUDE = 'process.env.NODE_OPTIONS = ((process.env.NODE_OPTIONS ?? "") + " --import " + process.cwd() + "/census-preload.mjs").trim();';
/** RS2: a preload that first replaces the two builtins the guard calls, then places fails on Object.prototype (the named residual). */
const TAMPER_PRELOAD = [
  "const proto = Object.getPrototypeOf({});",
  "const describeOwn = Object.getOwnPropertyDescriptor;",
  "const defineOwn = Object.defineProperty;",
  'const hidden = key => key === "fails" || key === "fixtures";',
  "Object.getOwnPropertyDescriptor = (target, key) => (target === proto && hidden(key) ? undefined : describeOwn(target, key));",
  "Object.defineProperty = (target, key, descriptor) => (target === proto && hidden(key) ? target : defineOwn(target, key, descriptor));",
  'defineOwn(proto, "fails", { get: () => true, set: () => undefined, configurable: true, enumerable: false });',
  "",
].join("\n");
/** RS2 for fixtures: the same builtin replacement, then the F1 registry placed on Object.prototype (plain JS: a preload is not transformed). */
const TAMPER_FIXTURES_PRELOAD = [
  ...TAMPER_PRELOAD.split("\n").slice(0, 6),
  'const registrations = new Map([["census", { name: "census", auto: true, scope: "test", value: async (context, use) => { context.task.fails = true; await use(1); } }]]);',
  'defineOwn(proto, "fixtures", { value: { get: () => registrations }, configurable: true, writable: true, enumerable: false });',
  "",
].join("\n");
const CFG_FAILING = "() => {\n    expect(1).toBe(2);\n  }";
const CFG_PLAIN_FAILING = `  it("${PIN}", ${CFG_FAILING});`;
/**
 * u62 respin-6: the g6s2 battery's targeting machinery (its shapes adopted unchanged) - an inherited value answers
 * only a vitest registration options object whose own handler's source carries CENSUS_TARGET, so the co-resident
 * control cases of the same run stay honest.
 */
const TARGETED = [
  'const MARK = Symbol.for("wb-u62.census-guard");',
  "const proto = Object.getPrototypeOf({});",
  "const own = Object.prototype.hasOwnProperty;",
  "const realDefine = Object.defineProperty;",
  `const targeted = self => { const h = self !== null && self !== undefined && own.call(self, "handler") ? self.handler : undefined; return typeof h === "function" && String(h).includes(${JSON.stringify(CENSUS_TARGET)}); };`,
  'const ownSetter = key => function (value) { if (this === proto) throw new TypeError("refused"); realDefine(this, key, { value, writable: true, enumerable: true, configurable: true }); };',
  "",
].join("\n");
/** u62 respin-6 (gate-1 g6s2 N2, adopted unchanged): a fails accessor carrying the guard's own global-registry mark. */
const FORGED_MARK_PRELOAD = `${TARGETED}const get = function () { return targeted(this) ? true : undefined; };\nrealDefine(get, MARK, { value: true });\nrealDefine(proto, "fails", { configurable: false, enumerable: false, get, set: ownSetter("fails") });\n`;
/** u62 respin-6 (g6s2 N4, adopted unchanged): the respin-5 RS2 builtin tamper, carried by .npmrc node-options instead of the config module. */
const TAMPER_NPMRC_PRELOAD = `${TARGETED}const describeOwn = Object.getOwnPropertyDescriptor;\nObject.getOwnPropertyDescriptor = (t, k) => (t === proto && k === "fails" ? undefined : describeOwn(t, k));\nObject.defineProperty = (t, k, d) => (t === proto && k === "fails" ? t : realDefine(t, k, d));\nrealDefine(proto, "fails", { configurable: true, enumerable: false, get() { return targeted(this) ? true : undefined; }, set: ownSetter("fails") });\n`;
/** u62 respin-6 (g6s2 N5): the shell .npmrc script-shell names - it exports NODE_OPTIONS with the forged-mark preload and execs sh. */
const scriptShellNpmrc = (root: string): Readonly<Record<string, string>> => ({
  ".npmrc": `script-shell=${join(root, "census-shell.sh")}\n`,
  "census-shell.sh": `#!/bin/sh\nexport NODE_OPTIONS="--import=${join(root, "census-pre.mjs")}"\nexec /bin/sh "$@"\n`,
  "census-pre.mjs": FORGED_MARK_PRELOAD,
});
/** u62 respin-6: the project .npmrc of the tier's npm hop, setting node-options to preload one file of the project. */
const npmrcPreload = (preload: string) => (root: string): Readonly<Record<string, string>> => ({
  ".npmrc": `node-options=--import=${join(root, "census-pre.mjs")}\n`,
  "census-pre.mjs": preload,
});
/** u62 respin-6 swap: the lifecycle row's unguarded config's setup file places a targeted fails accessor (the g6s2 N1 shape). */
const SWAP_TARGETED_FAILS = `${TARGETED}realDefine(proto, "fails", { configurable: true, enumerable: false, get() { return targeted(this) ? true : undefined; }, set: ownSetter("fails") });\n`;
/** u62 respin-6: a forge.toml whose default build configuration adds NODE_OPTIONS to every step forge runs. */
const FORGE_WITH_CONFIGURATION =
  '[package]\nname = "census-synthetic"\n\n[build]\ngate = ["lint", "test"]\ndefault_configuration = "ci"\n\n[build.commands]\nlint = "npm run lint"\ntest = "npm run test"\n\n[build.configurations.ci]\nenv = { NODE_OPTIONS = "--import=./census-pre.mjs" }\n';


const CONFIG_ROWS: readonly ConfigRow[] = [
  { id: "c-control", routed: "control: the unmutated default gate", oracle: "passed", verdict: OK },
  { id: "c-n18-glob", routed: "6hb.6 N18 / 6ze.38 K17 a **/ glob in the default exclude", configBody: 'exclude: ["**/cfg-target.test.ts"]', oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  { id: "c-n19-name-pattern", routed: "6hb.6 N19 / 0kg.11 testNamePattern / h8f.9 T3 / 0kg.12 testNamePattern / 6hb.7 M14 / 6ze.38 M9 / cax.25 T1 / 6hb.11 SD1 / 752.15 M6 config testNamePattern", configBody: "testNamePattern: /^(?!.*the pinned case)/", oracle: "not-passed", verdict: red("skipped", "runs-where") },
  { id: "c-t3-variant", routed: "h8f.9 T3-variant inefficacy datum: /^(?!the pinned case)/ matches the full name, so the pin still runs", configBody: "testNamePattern: /^(?!the pinned case)/", oracle: "passed", verdict: OK },
  { id: "c-n20-spread", routed: "6hb.6 N20 / 0kg.11 spread exclude", configPrelude: 'const LIVE_TIER_ONLY = ["test/cfg-target.test.ts"];', configBody: "exclude: [...LIVE_TIER_ONLY]", oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  { id: "c-0kg11-concat", routed: "0kg.11 concat / 0kg.12 concat / cax.25 K4 exclude .concat()", configBody: 'exclude: ["test/nothing.test.ts"].concat(["test/cfg-target.test.ts"])', oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  {
    id: "c-0kg12-end-spread",
    routed: "0kg.12 end-spread / cax.25 K3 an exclude spread at the array end",
    configPrelude: 'const LIVE_TIER_ONLY = ["test/cfg-target.test.ts"];',
    configBody: 'exclude: ["test/nothing.test.ts", ...LIVE_TIER_ONLY]',
    oracle: "not-passed",
    verdict: red("not-collected", "runs-where"),
  },
  {
    id: "c-0kg12-front-spread",
    routed: "0kg.12 front-spread T1-anchor datum: a front-of-array spread is named for its real cause",
    configPrelude: 'const LIVE_TIER_ONLY = ["test/cfg-target.test.ts"];',
    configBody: 'exclude: [...LIVE_TIER_ONLY, "test/nothing.test.ts"]',
    oracle: "not-passed",
    verdict: red("not-collected", "runs-where", /does not collect this file/),
  },
  { id: "c-6hb7-m12-brace-glob", routed: "6hb.7 M12 / 752.15 M9 a brace-glob exclude", configBody: 'exclude: ["test/{cfg-target,nothing}.test.ts"]', oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  { id: "c-6hb7-m13-char-class", routed: "6hb.7 M13 a character-class exclude", configBody: 'exclude: ["test/cfg-targe[t].test.ts"]', oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  { id: "c-6hb7-fr1-node-modules", routed: "6hb.7 FR1 control: a benign **/node_modules/** exclude reads no false red", configBody: 'exclude: ["**/node_modules/**", "test/nothing.test.ts"]', oracle: "passed", verdict: OK },
  { id: "c-t2-identifier", routed: "h8f.9 T2 / 6hb.7 K7 / 6ze.38 K16 identifier-held exclude list", configPrelude: 'const GATE_EXCLUDES = ["test/cfg-target.test.ts"];', configBody: "exclude: GATE_EXCLUDES", oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  { id: "c-x7b-continuation", routed: "752.10 X7b exclude continued on the next line", configBody: 'exclude: [\n      "test/nothing.test.ts",\n      "test/cfg-target.test.ts",\n    ]', oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  {
    id: "c-t4-exclude",
    routed: "h8f.9 T4 / 0kg.11 package.json / 0kg.12 package.json / 6hb.7 M15 / 6ze.38 M11 / cax.25 T2 test script --exclude",     testScript: "vitest run --exclude test/cfg-target.test.ts",
    oracle: "not-passed",
    verdict: red("not-collected", "runs-where"),
  },
  { id: "c-t4-name", routed: "h8f.9 T4 package.json test script -t", testScript: 'vitest run -t "another case"', oracle: "not-passed", verdict: red("skipped", "runs-where") },
  { id: "c-f8-forge-argv", routed: "0kg.11 F8 / 0kg.12 gate-step / 6ze.38 M12 / cax.25 T3 forge.toml test-step argv change", forgeCommand: "npm run test -- --exclude test/cfg-target.test.ts", oracle: "not-passed", verdict: red("not-collected", "runs-where") },
  {
    id: "c-6ze38-m10-setup-files",
    routed: "6ze.38 M10 / 6hb.11 J4 / 752.15 M5 a vitest.config setupFiles global hook skipping the pin by name",
    configBody: 'setupFiles: ["./census-skip.setup.ts"]',
    files: { "census-skip.setup.ts": 'import { beforeEach } from "vitest";\nbeforeEach((ctx) => {\n  if (ctx.task.name === "the pinned case") ctx.skip();\n});\n' },
    oracle: "not-passed",
    // U2 (wb-u62 gate-1): the elimination red names what it observed and every route still open, never a guessed cause.
    verdict: red("skipped", "runs-where", /nothing the census models in the case or its own call chain skips it.*the remaining routes: .*a setup file, a config filter, a CLI flag/),
  },

  {
    id: "c-global-setup-abort",
    routed: "owner 13:30Z globalSetup fold: a vitest.config global setup that aborts the tier run",
    configBody: 'globalSetup: ["./census-global.setup.ts"]',
    files: { "census-global.setup.ts": 'export default function setup(): void {\n  throw new Error("the global setup refuses");\n}\n' },
    oracle: "not-passed",
    verdict: red("run-error", "runs-where", /scheduled this file but never ran it/),
    // REPORT-MODE BOUNDARY of record: the JSON report records no scheduled files, so the aborted run reads like one that
    // collected nothing (both red); the why names both routes.
    report: red("not-collected", "runs-where", /the report records no test file.*aborted before running one \(a throwing global setup\)/),
  },

  {
    id: "c-positional-filter",
    routed: "tier truth: a test step whose own file filter excludes the pin; the census never widens a filtered command",
    forgeCommand: "./node_modules/.bin/vitest run test/nothing.test.ts",
    oracle: "not-passed",
    verdict: red("not-collected", "runs-where", /does not collect this file/),
  },
  {
    id: "c-positional-passthrough",
    routed: "tier truth: the forge step's npm passthrough carries a file filter that excludes the pin; never widened",
    forgeCommand: "npm run test -- test/nothing.test.ts",
    oracle: "not-passed",
    verdict: red("not-collected", "runs-where", /does not collect this file/),
  },
  {
    id: "c-unhandled-rejection",
    routed: "fail-closed: an unhandled rejection fails the tier run (vitest exits 1), so no pin in that run is vouched",
    target: { body: PLAIN, after: 'it("leaves a rejection behind", () => {\n  void Promise.reject(new Error("an unhandled rejection"));\n  expect(1).toBe(1);\n});' },
    oracle: "passed",
    verdict: red("run-error", "runs-where", /unhandled errors: an unhandled rejection/),
    // REPORT-MODE BOUNDARY of record: vitest's JSON reporter omits unhandled errors (onTestRunEnd reads modules only), so
    // a pin that passed reads as passed; the gate's own test step exits 1 on them, so the gate fails without the census.
    report: OK,
  },

  { id: "c-gate-missing", routed: "fail-closed: forge.toml [build] gate no longer runs the test step", gate: '["lint"]', oracle: "none", verdict: red("tier-unresolved", "runs-where", /gate does not run the test step/) },
  { id: "c-toml-unparseable", routed: "fail-closed: forge.toml outside the parsed subset", rawForge: "[build]\ngate = [\"test\"]\n\n[build.commands]\ntest = npm run test\n", oracle: "none", verdict: red("tier-unresolved", "runs-where", /outside the parsed TOML subset/) },
  { id: "c-script-missing", routed: "fail-closed: the npm script the test step names is gone", testScript: null, oracle: "none", verdict: red("tier-unresolved", "runs-where", /declares no script test/) },
  { id: "c-shell-operator", routed: "fail-closed: a test step chained through the shell", forgeCommand: "npm run test && echo done", oracle: "none", verdict: red("tier-unresolved", "runs-where", /shell operator "&"/) },
  { id: "c-0kg12-never-executing", routed: "0kg.12 F6 a never-executing test step (true || npm run test)", forgeCommand: "true || npm run test", oracle: "none", verdict: red("tier-unresolved", "runs-where", /shell operator "\|"/) },
  { id: "c-shell-pipe", routed: "fail-closed: an npm test script piped through the shell", testScript: "vitest run | tee census.log", oracle: "none", verdict: red("tier-unresolved", "runs-where", /shell operator "\|"/) },
  {
    id: "c-752-15-m10-toml-comment",
    routed: "752.15 M10 the gate array's test entry commented out on its own line (a TOML comment is never an entry)",
    rawForge: '[build]\ngate = [\n  "lint",\n  # "test",\n]\n\n[build.commands]\ntest = "npm run test"\n',
    oracle: "none",
    verdict: red("tier-unresolved", "runs-where", /gate does not run the test step/),
  },
  {
    id: "c-u62-gm19-two-hop",
    routed: "u62 GM19 a test step reaching vitest through two npm hops (forge test -> npm run test -> npm run test:unit -> vitest run)",
    testScript: "npm run test:unit",
    scripts: { "test:unit": "vitest run" },
    oracle: "none",
    verdict: red("tier-unresolved", "runs-where", /more than one npm script/),
  },
  // The respin-4 transport rows print from a setup file AFTER the census guard (vitest pipes a forked worker's stdout
  // into the run's): config-module code is refused by the vouch since respin-5 (G-config-code), so the rows keep their
  // transport verdicts on a vouched tier. The frame is read off the parent's command line, as the config read its own.
  {
    id: "c-u62r4-forged-frame",
    routed:
      "u62 respin-4 T2 standing rule 11 transport: a setup file that reads the report frame off the run's command line and prints a second framed line gets the run refused, never the forged report read",
    configBody: PRINT_AFTER_GUARD,
    files: { "census-print.setup.ts": `${PARENT_ARGV}const CENSUS_WORD = PARENT.find(word => word.startsWith("--outputFile.census="));\nif (CENSUS_WORD !== undefined) process.stdout.write("\\n" + CENSUS_WORD.slice("--outputFile.census=".length) + "{}");\n` },
    oracle: "passed",
    verdict: red("run-error", "runs-where", /wrote 2 census reports under its one frame/),
    report: OK,
  },
  {
    id: "c-u62r4-frame-collision",
    routed:
      "u62 respin-4 T3 standing rule 11 transport cost: a setup file printing a line that begins like a report frame but without the run's nonce is never read as one - the pin is judged ok",
    configBody: PRINT_AFTER_GUARD,
    files: { "census-print.setup.ts": 'process.stdout.write("\\ncensus-report:not-this-run:{}\\n");\n' },
    oracle: "passed",
    verdict: OK,
  },
  {
    id: "c-u62r4-frame-mid-line",
    routed:
      "u62 respin-4 T4 standing rule 11 transport cost: a setup file echoing the run's command line - the run's real frame mid-line, as a script banner that does not redact the nonce prints it - is never read as a report: the pin is judged ok",
    configBody: PRINT_AFTER_GUARD,
    files: { "census-print.setup.ts": `${PARENT_ARGV}process.stdout.write("\\nrun started as: " + PARENT.slice(2).join(" ") + "\\n");\n` },
    oracle: "passed",
    verdict: OK,
  },
  // ---- u62 respin-5: the census guard and the absent read it vouches for (options.inherited, context.inherited)
  {
    id: "c-u62r5-unguarded-plain",
    routed: "u62 respin-5 cost: an unguarded tier - nothing keeps an inherited fails / fixtures off the run, so a genuinely passing pin is refused in both modes",
    unguarded: true,
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard/),
    report: red("options-unknown", "asserts", /census guard/),
  },
  {
    id: "c-u62r5-unguarded-p1",
    routed: "u62 gate-3r4 P1 unguarded: a non-enumerable Object.prototype.fails in the pinned file inverts it; report mode must refuse the absent read",
    unguarded: true,
    target: { prelude: PROTO_FAILS, body: CFG_PLAIN_FAILING },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard/),
  },
  {
    id: "c-u62r5-unguarded-p6",
    routed: "u62 gate-3r4 P6 unguarded control: an own fails: false wins over the inherited one - the case fails, red in both modes",
    unguarded: true,
    target: { prelude: PROTO_FAILS, body: `  it("${PIN}", { fails: false }, ${CFG_FAILING});` },
    oracle: "not-passed",
    verdict: red("failed", "asserts"),
  },
  {
    id: "c-u62r5-unguarded-number",
    routed: "u62 gate-3r4 O6 x P1 unguarded: it(PIN, 1000 as never, fn) under an inherited fails - options.number reads no own fails, options.inherited refuses",
    unguarded: true,
    target: { prelude: PROTO_FAILS, body: `  it("${PIN}", 1000 as never, ${CFG_FAILING});` },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard/),
  },
  {
    id: "c-u62r5-unguarded-f1",
    routed: "u62 respin-5 F1 unguarded: an inherited fixtures registry's auto fixture writes context.task.fails - false green in BOTH modes on b9cbd4e",
    unguarded: true,
    target: { imports: `${IMPORTS}\nimport "./census-r5-fixtures.ts";`, body: CFG_PLAIN_FAILING },
    files: { "test/census-r5-fixtures.ts": FIXTURES_HELPER },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard/),
    report: red("options-unknown", "asserts", /census guard/),
  },
  {
    id: "c-u62r5-unguarded-f2",
    routed: "u62 respin-5 F2 unguarded: it(PIN, { fails: false }, fn) under an inherited fixtures registry - the own fails does not stop the context write",
    unguarded: true,
    target: { imports: `${IMPORTS}\nimport "./census-r5-fixtures.ts";`, body: `  it("${PIN}", { fails: false }, ${CFG_FAILING});` },
    files: { "test/census-r5-fixtures.ts": FIXTURES_HELPER },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard/),
  },
  {
    id: "c-u62r5-guard-not-first",
    routed: "u62 respin-5 G-not-first: another setup file runs before the census guard (sequence list), so code ahead of it is unvouched",
    unguarded: true,
    configBody: 'setupFiles: ["./census-other.setup.ts", "./census-guard.ts"], sequence: { setupFiles: "list" }',
    files: { "census-other.setup.ts": "export {};\n" },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /first setup file .* is not the census guard/),
    report: red("options-unknown", "asserts", /first setup file .* is not the census guard/),
  },
  {
    id: "c-u62r5-guard-parallel",
    routed: "u62 respin-5 G-parallel: the guard first but a second setup file under vitest's default parallel import order",
    unguarded: true,
    configBody: 'setupFiles: ["./census-guard.ts", "./census-other.setup.ts"]',
    files: { "census-other.setup.ts": "export {};\n" },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /in parallel/),
    report: red("options-unknown", "asserts", /in parallel/),
  },
  {
    id: "c-u62r5-guard-list",
    routed: 'u62 respin-5 G-list control: the guard first of two setup files under sequence.setupFiles "list" is vouched',
    unguarded: true,
    configBody: 'setupFiles: ["./census-guard.ts", "./census-other.setup.ts"], sequence: { setupFiles: "list" }',
    files: { "census-other.setup.ts": "export {};\n" },
    oracle: "passed",
    verdict: OK,
  },
  {
    id: "c-u62r5-guard-altered",
    routed: "u62 respin-5 G-altered: a first setup file named census-guard.ts whose bytes are not the census guard's",
    files: { "census-guard.ts": "export {};\n" },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /sha256/),
    report: red("options-unknown", "asserts", /sha256/),
  },
  {
    id: "c-u62r5-pool-vm",
    routed: "u62 respin-5 G-pool: pool vmThreads runs the test modules in a vm context, a pool outside the closed list the census guard is vouched for (forks, threads)",
    configBody: 'pool: "vmThreads"',
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /pool/),
    report: red("options-unknown", "asserts", /pool/),
  },
  {
    id: "c-u62r5-rs1-preload",
    routed: "u62 respin-5 RS1 pre-guard code, closed: the config module sets a NODE_OPTIONS preload that places fails on Object.prototype; the guard refuses it at load",
    configPrelude: PRELOAD_PRELUDE,
    files: { "census-preload.mjs": `${PROTO_FAILS}\n` },
    oracle: "not-passed",
    verdict: red("collection-error", "exists", /already carries fails before the guard ran/),
  },
  // RS2, closed by the vouch (measured): code that runs before the guard in the worker realm - here a NODE_OPTIONS preload
  // the config module sets - can replace the builtins the guard calls before it places fails or fixtures; first code
  // wins in a realm, so no RUNTIME check closes it (measured on these bytes with the config-module read removed: report
  // ok, executing inverted, for fails; ok in both modes for a fixtures registry). The static half closes it instead:
  // censusGuard reads the config module's statements and refuses any but its imports of defineConfig and its default
  // export (G-config-code), so neither mode reads an absent fails as no fails nor resolves a context flow on this tier.
  {
    id: "c-u62r5-rs2-tamper",
    routed: "u62 respin-5 RS2 pre-guard code, closed by the vouch: a config-module preload replaces the builtins the guard calls before placing fails - executing mode reads the inversion, report mode refuses the unvouched tier",
    configPrelude: PRELOAD_PRELUDE,
    files: { "census-preload.mjs": TAMPER_PRELOAD },
    target: { body: CFG_PLAIN_FAILING },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*holds a statement/),
  },
  {
    id: "c-u62r5-rs2-fixtures",
    routed: "u62 respin-5 RS2 fixtures, closed by the vouch: the tampering preload places an inherited fixtures registry instead - neither mode resolves the unvouched tier",
    configPrelude: PRELOAD_PRELUDE,
    files: { "census-preload.mjs": TAMPER_FIXTURES_PRELOAD },
    target: { body: CFG_PLAIN_FAILING },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard is not vouched.*holds a statement/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*holds a statement/),
  },
  // u62 respin-6 (owner R470 R1 = (a) with the closed-record cap): pre-guard code on the tier's OWN npm hop and step that
  // the respin-5 vouch did not read - the project .npmrc (the gate-1 g6s2 battery's N2 / N4 / N5 carriers), an enclosing
  // workspace root's .npmrc, an npm lifecycle script around the hop's script, a forge build configuration. Executing mode
  // reads the inversion from the run (unchanged); report mode now refuses each tier statically, naming the route.
  {
    id: "c-u62r6-npmrc-forged-mark",
    routed: "u62 respin-6 g6s2 N2: the project .npmrc node-options preloads a fails accessor carrying the guard's own Symbol.for mark, which the guard skips as its own",
    rooted: npmrcPreload(FORGED_MARK_PRELOAD),
    target: { body: TARGET_PLAIN },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*\.npmrc sets node-options/),
  },
  {
    id: "c-u62r6-npmrc-tamper",
    routed: "u62 respin-6 g6s2 N4: the respin-5 RS2 builtin tamper carried by the project .npmrc node-options instead of the config module",
    rooted: npmrcPreload(TAMPER_NPMRC_PRELOAD),
    target: { body: TARGET_PLAIN },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*\.npmrc sets node-options/),
  },
  {
    id: "c-u62r6-npmrc-script-shell",
    routed: "u62 respin-6 g6s2 N5: the project .npmrc script-shell names a shell that exports NODE_OPTIONS with the forged-mark preload, then runs the script",
    rooted: scriptShellNpmrc,
    executables: ["census-shell.sh"],
    target: { body: TARGET_PLAIN },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*\.npmrc sets script-shell/),
  },
  {
    id: "c-u62r6-npmrc-fixtures",
    routed: "u62 respin-6: the respin-5 RS2 fixtures preload (builtin tamper, then an inherited fixtures registry) carried by the project .npmrc node-options - false green in BOTH modes on 469c8e3; neither mode resolves the tier",
    rooted: npmrcPreload(TAMPER_FIXTURES_PRELOAD),
    target: { body: CFG_PLAIN_FAILING },
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard is not vouched.*\.npmrc sets node-options/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*\.npmrc sets node-options/),
  },
  {
    id: "c-u62r6-npmrc-admitted",
    routed: "u62 respin-6 control: a project .npmrc holding only keys of the closed list (registry, a scoped registry, fund, audit, update-notifier, loglevel) stays vouched",
    files: { ".npmrc": "; inert npm settings only\nregistry=https://registry.example.invalid/\n@census:registry=https://registry.example.invalid/\nfund=false\naudit = false\nupdate-notifier=false\nloglevel=warn\n" },
    oracle: "passed",
    verdict: OK,
  },
  {
    id: "c-u62r6-workspace-npmrc",
    routed: "u62 respin-6: the project sits in an npm workspace whose root .npmrc sets node-options, so npm loads the ROOT's .npmrc as the hop's project config, never the project's own",
    parent: root => ({
      "package.json": `${JSON.stringify({ name: "census-workspace-root", private: true, workspaces: ["child"] }, null, 2)}\n`,
      ".npmrc": `node-options=--import=${join(root, "census-pre.mjs")}\n`,
    }),
    rooted: () => ({ "census-pre.mjs": FORGED_MARK_PRELOAD }),
    target: { body: TARGET_PLAIN },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*declares workspaces/),
  },
  {
    id: "c-u62r6-lifecycle-swap",
    routed: "u62 respin-6: scripts.pretest swaps in an unguarded config whose setup file places fails, and scripts.posttest restores the guarded one under its old mtime, so the files read at judgment are the vouched ones",
    scripts: {
      pretest: "cp census-swap.config.ts vitest.config.ts",
      posttest: "cp census-kept.config.ts vitest.config.ts && touch -r census-kept.config.ts vitest.config.ts",
    },
    files: { "census-swap.setup.ts": `${SWAP_TARGETED_FAILS}\nexport {};\n` },
    rooted: () => ({
      "census-kept.config.ts": vitestConfig(defaultOptions("")),
      "census-swap.config.ts": vitestConfig(defaultOptions('setupFiles: ["./census-swap.setup.ts"]'), "", false),
    }),
    serial: true,
    target: { body: TARGET_PLAIN },
    oracle: "passed",
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*scripts\.pretest/),
  },
  {
    id: "c-u62r6-forge-configuration",
    routed: "u62 respin-6: forge.toml selects a default build configuration whose env sets NODE_OPTIONS (a forged-mark preload) for every step - forge itself applies it, not the in-suite npm run, so this row pins the refusal on a plain passing pin in both modes",
    rawForge: FORGE_WITH_CONFIGURATION,
    rooted: () => ({ "census-pre.mjs": FORGED_MARK_PRELOAD }),
    oracle: "passed",
    verdict: red("context-unknown", "runs-where", /census guard is not vouched.*configuration/),
    report: red("options-unknown", "asserts", /census guard is not vouched.*configuration/),
  },
];


/**
 * Docs pins read the RENDERED view (05:15Z), bounded at the next level-1/2 heading or EOF (FOLD-1), unique heading
 * (05:20Z/05:36Z), bound to the normative parent heading path (D9, 13:20Z) and refusing a heading-spanning HTML
 * block or code fence (D10, 13:36Z).
 */
interface DocsRow {
  readonly id: string;
  readonly routed: string;
  readonly markdown: string;
  /** Proves the mode on the rendered HTML (the renderer is the docs "runner"), independent of the helper's token walk. */
  readonly rendered: (html: string) => void;
  readonly check: (section: DocsSection) => void;
}

/** Every docs row pins "## Controls" under the normative parent path "# Doc" (D9). */
const pinned = (markdown: string, heading = "Controls"): DocsSection => docsSection(markdown, heading, 2, ["Doc"]);

const ITEMS = ["First control holds.", "Second control holds.", "Third control holds."];
const doc = (section: readonly string[], before: readonly string[] = [], after: readonly string[] = []) =>
  ["# Doc", "", ...before, "## Controls", "", ...section, "", ...after, "## Next", "", "Other text.", ""].join("\n");
const LIST = ["1. First control holds.", "2. Second control holds.", "3. Third control holds."];
const itemsOf = (section: DocsSection): string[] => section.blocks.flatMap(b => (b.kind === "list" ? b.items.map(i => i.text) : []));

/** D10: a comment opened inside "## Controls" whose closer sits past "## Next". */
const SPAN_COMMENT = ["# Doc", "", "## Controls", "", ...LIST, "", "<!--", "", "## Next", "", "Other text.", "", "-->", "", "## After", "", "Tail.", ""].join("\n");
/** cax.25 D1: one comment opened in "## Before" hides "## Controls" and "## Next" together. */
const STRADDLE = ["# Doc", "", "## Before", "", "Intro.", "", "<!--", "", "## Controls", "", ...LIST, "", "## Next", "", "Other text.", "-->", "", "## After", "", "Tail.", ""].join("\n");

/**
 * wb-9x5.6 D1-D3 (routed 15:54Z, "the floor MUST KILL"; measured by the u62 gate on the real docs/10 + docs/14 pinned
 * sections): a pinned section holding a normative clause and a list. The adoption form is EXACT equality of the whole
 * rendered block list through sectionMatches (never an includes check: D3 keeps the clause present), and an HTML block
 * exposes no rendered text (D2: its raw source is only under raw, so a reader of every block's text is never fooled).
 */
const CLAUSE = "The inspector keeps at most 1000 rows in view.";
const D_BASE = doc([CLAUSE, "", ...LIST]);
const renderedTexts = (section: DocsSection): string[] =>
  section.blocks.flatMap((block: RenderedBlock) => (block.kind === "list" ? block.items.map(item => item.text) : [block.kind === "other" || block.kind === "heading" || block.kind === "paragraph" || block.kind === "code" || block.kind === "html" ? block.text : ""]));

const DOCS_ROWS: readonly DocsRow[] = [
  { id: "d-control", routed: "control: three rendered items", markdown: doc(LIST), rendered: html => expect(html).toContain("<li>Second control holds.</li>"), check: s => { expect(s.ok).toBe(true); expect(itemsOf(s)).toEqual(ITEMS); } },
  {
    id: "d-n21-lazy-continuation",
    routed: "6hb.6 N21 / 752.10 X9 lazy continuation line weakening an item",
    markdown: doc(["1. First control holds.", "2. Second control holds.", "unless the operator disables it.", "3. Third control holds."]),
    rendered: html => expect(html).toMatch(/<li>Second control holds\.\nunless the operator disables it\.<\/li>/),
    check: s => { expect(s.ok).toBe(true); expect(itemsOf(s)[1]).toBe("Second control holds. unless the operator disables it."); expect(itemsOf(s)).not.toEqual(ITEMS); },
  },
  {
    id: "d-n22-html-comment",
    routed: "6hb.6 N22 an item hidden inside an HTML comment",
    markdown: doc(["1. First control holds.", "<!--", "2. Second control holds.", "-->", "3. Third control holds."]),
    rendered: html => expect(html).not.toContain("<li>Second control holds.</li>"),
    check: s => { expect(itemsOf(s)).not.toContain("Second control holds."); expect(s.hasHtml).toBe(true); },
  },
  {
    id: "d-n23-level1-rehome",
    routed: "6hb.6 N23 / 752.10 X13 a level-1 heading re-homes the items",
    markdown: doc(["# Re-homed", "", ...LIST]),
    rendered: html => expect(html.indexOf("<h1>Re-homed</h1>")).toBeLessThan(html.indexOf("<li>First control holds.</li>")),
    check: s => { expect(s.ok).toBe(true); expect(itemsOf(s)).toEqual([]); },
  },
  {
    id: "d-n24-fenced",
    routed: "6hb.6 N24 items fenced as code",
    markdown: doc(["```", ...LIST, "```"]),
    rendered: html => expect(html).toContain("<pre><code>1. First control holds."),
    check: s => { expect(itemsOf(s)).toEqual([]); expect(s.blocks.some(b => b.kind === "code")).toBe(true); },
  },
  {
    id: "d-fold1-subsection",
    routed: "FOLD-1 / 0kg.11 U3: a ### subsection belongs to the pinned section",
    markdown: doc([...LIST, "", "### Scope note", "", "These controls are advisory only."]),
    rendered: html => expect(html).toContain("<h3>Scope note</h3>"),
    check: s => {
      expect(s.blocks).toContainEqual({ kind: "heading", depth: 3, text: "Scope note" });
      expect(s.blocks).toContainEqual({ kind: "paragraph", text: "These controls are advisory only.", markdown: "These controls are advisory only." });
    },
  },
  {
    id: "d-h8f9-d3-paragraph",
    routed: "h8f.9 D3 a weakening sentence as its own paragraph inside the section",
    markdown: doc([...LIST, "", "These labels are advisory and may be omitted."]),
    rendered: html => expect(html).toContain("<p>These labels are advisory and may be omitted.</p>"),
    check: s => expect(s.blocks).toContainEqual({ kind: "paragraph", text: "These labels are advisory and may be omitted.", markdown: "These labels are advisory and may be omitted." }),
  },
  {
    id: "d-duplicate-heading",
    routed: "0kg.11 U3 / h8f.9 D4 a duplicated heading appended later",
    markdown: `${doc(LIST)}\n## Controls\n\n1. These controls are advisory only.\n`,
    rendered: html => expect(html.split("<h2>Controls</h2>").length - 1).toBe(2),
    check: s => { expect(s.ok).toBe(false); expect(s.why).toMatch(/2 times/); },
  },
  {
    id: "d-x12-hidden-copy",
    routed: "752.10 X12 / 05:36Z same-view: a hidden copy of the heading inside an HTML comment",
    markdown: doc(LIST, ["<!--", "## Controls", "", "1. A hidden fake control.", "-->", ""]),
    rendered: html => expect(html.split("<h2>Controls</h2>").length - 1).toBe(1),
    check: s => { expect(s.ok).toBe(true); expect(itemsOf(s)).toEqual(ITEMS); },
  },
  {
    id: "d-inline-comment",
    routed: "05:15Z rendered-text truth: an inline comment never reaches the reader; the section reports it",
    markdown: doc(["1. First control holds.", "2. Second control <!-- never --> holds.", "3. Third control holds."]),
    rendered: html => expect(html).toContain("<li>Second control <!-- never --> holds.</li>"),
    check: s => {
      expect(itemsOf(s)).toEqual(ITEMS);
      expect(s.hasHtml).toBe(true);
      const list = s.blocks.find(b => b.kind === "list");
      expect(list?.kind === "list" ? list.items[1]?.markdown : undefined).toBe("Second control <!-- never --> holds.");
    },
  },
  { id: "d-absent", routed: "fail-closed: the pinned heading is gone from the rendered view", markdown: doc(LIST).replace("## Controls", "## Controlz"), rendered: html => expect(html).not.toContain("<h2>Controls</h2>"), check: s => { expect(s.ok).toBe(false); expect(itemsOf(s)).toEqual([]); } },
  {
    id: "d-reading2-prefix",
    routed: "02:17Z READING 2: an appended clause keeps the prefix but breaks exact item equality",
    markdown: doc(["1. First control holds.", "2. Second control holds, except when disabled.", "3. Third control holds."]),
    rendered: html => expect(html).toContain("<li>Second control holds, except when disabled.</li>"),
    check: s => { expect(itemsOf(s)[1]).not.toBe(ITEMS[1]); expect(itemsOf(s)[1]?.startsWith("Second control holds")).toBe(true); },
  },
  {
    id: "d-6hb7-d9-appendix",
    routed: "6hb.7 F7 / D9 a non-normative level-1 appendix heading inserted above the section re-homes it",
    markdown: doc(LIST, ["# Appendix", ""]),
    rendered: html => expect(html.indexOf("<h1>Appendix</h1>")).toBeLessThan(html.indexOf("<h2>Controls</h2>")),
    check: s => { expect(s.ok).toBe(false); expect(s.why).toMatch(/parent heading path \["Appendix"\]/); },
  },
  {
    id: "d-d9-sibling-control",
    routed: "D9 control: an earlier level-1 section and an earlier sibling leave the parent path alone",
    markdown: ["# Preface", "", "Intro.", "", "# Doc", "", "## Earlier", "", "Text.", "", "## Controls", "", ...LIST, "", "## Next", "", "Other text.", ""].join("\n"),
    rendered: html => expect(html.indexOf("<h1>Doc</h1>")).toBeLessThan(html.indexOf("<h2>Controls</h2>")),
    check: s => { expect(s.ok, s.why).toBe(true); expect(itemsOf(s)).toEqual(ITEMS); },
  },
  {
    id: "d-d10-comment-span",
    routed: "6ze.38 M15 / D10 an HTML comment opened inside the section closes past the next heading",
    markdown: SPAN_COMMENT,
    rendered: html => expect(html).not.toContain("<h2>Next</h2>"),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/an HTML block inside the section spans the heading line "## Next"/);
      expect(pinned(SPAN_COMMENT, "Next").ok).toBe(false);
    },
  },
  {
    id: "d-d10-fence-span",
    routed: "D10 a code fence opened inside the section closes past the next heading",
    markdown: SPAN_COMMENT.replace("<!--", "```").replace("-->", "```"),
    rendered: html => expect(html).toContain("<pre><code>\n## Next"),
    check: s => { expect(s.ok).toBe(false); expect(s.why).toMatch(/a code block inside the section spans the heading line "## Next"/); },
  },
  {
    id: "d-cax25-d1-straddle",
    routed: "cax.25 D1 same-view straddle: one comment opened in the section before hides this heading and the next",
    markdown: STRADDLE,
    rendered: html => { expect(html).not.toContain("<h2>Controls</h2>"); expect(html).not.toContain("<h2>Next</h2>"); },
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/no level-2 heading "Controls"/);
      expect(pinned(STRADDLE, "Before").why).toMatch(/spans the heading line "## Controls"/);
    },
  },
  {
    id: "d-0kg12-dr1-comment-wraps",
    routed: "0kg.12 DR1 an HTML comment wrapping the whole section",
    markdown: ["# Doc", "", "<!--", "## Controls", "", ...LIST, "-->", "", "## Next", "", "Other text.", ""].join("\n"),
    rendered: html => expect(html).not.toContain("<h2>Controls</h2>"),
    check: s => { expect(s.ok).toBe(false); expect(itemsOf(s)).toEqual([]); },
  },
  {
    id: "d-0kg12-dr2-fence-wraps",
    routed: "0kg.12 DR2 a code fence wrapping the whole section",
    markdown: ["# Doc", "", "```", "## Controls", "", ...LIST, "```", "", "## Next", "", "Other text.", ""].join("\n"),
    rendered: html => expect(html).toContain("<pre><code>## Controls"),
    check: s => { expect(s.ok).toBe(false); expect(itemsOf(s)).toEqual([]); },
  },
  {
    id: "d-6ze38-m13-indent",
    routed: "6ze.38 M13 the items indented four spaces render as a code block",
    markdown: doc(LIST.map(line => `    ${line}`)),
    rendered: html => expect(html).toContain("<pre><code>1. First control holds."),
    check: s => { expect(itemsOf(s)).toEqual([]); expect(s.blocks.some(b => b.kind === "code")).toBe(true); },
  },
  {
    id: "d-6ze38-m14a-before",
    routed: "6ze.38 M14a a weakening clause placed before the control sentence",
    markdown: doc(["1. First control holds.", "2. Unless disabled, second control holds.", "3. Third control holds."]),
    rendered: html => expect(html).toContain("<li>Unless disabled, second control holds.</li>"),
    check: s => { expect(itemsOf(s)).not.toEqual(ITEMS); expect(itemsOf(s)[1]).toBe("Unless disabled, second control holds."); },
  },
  {
    id: "d-6ze38-m14b-appended",
    routed: "6ze.38 M14b / cax.25 D2 an appended weakening paragraph",
    markdown: doc([...LIST, "", "Operators may waive these controls."]),
    rendered: html => expect(html).toContain("<p>Operators may waive these controls.</p>"),
    check: s => {
      expect(s.ok).toBe(true);
      expect(s.blocks.map(b => b.kind)).toEqual(["list", "paragraph"]);
      expect(s.blocks).toContainEqual({ kind: "paragraph", text: "Operators may waive these controls.", markdown: "Operators may waive these controls." });
    },
  },
  {
    id: "d-752-15-m11-setext-duplicate",
    routed: "752.15 M11 a setext-form duplicate of the pinned heading inside its section",
    markdown: doc(LIST, [], ["Controls", "--------", "", "The operator may disable them."]),
    rendered: html => expect(html.match(/<h2>Controls<\/h2>/g)).toHaveLength(2),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/occurs 2 times in the rendered view/);
    },
  },
  {
    id: "d-752-15-m12-closing-hash",
    routed: "752.15 M12 a closing-hash duplicate of the pinned heading (## Controls ##)",
    markdown: doc(LIST, [], ["## Controls ##", "", "The operator may disable them."]),
    rendered: html => expect(html.match(/<h2>Controls<\/h2>/g)).toHaveLength(2),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/occurs 2 times in the rendered view/);
    },
  },
  {
    id: "d-752-15-m13-indented-duplicate",
    routed: "752.15 M13 a three-space-indented duplicate of the pinned heading",
    markdown: doc(LIST, [], ["   ## Controls", "", "The operator may disable them."]),
    rendered: html => expect(html.match(/<h2>Controls<\/h2>/g)).toHaveLength(2),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/occurs 2 times in the rendered view/);
    },
  },
  {
    id: "d-u62-nested-heading-only",
    routed: "u62 fail-closed: the pinned heading renders only nested inside a list item, so no section is bounded under it",
    markdown: ["# Doc", "", "1. First control holds.", "", "   ## Controls", "", "   The operator may disable them.", "", "## Next", "", "Other text.", ""].join("\n"),
    rendered: html => expect(html).toMatch(/<li>[\s\S]*<h2>Controls<\/h2>[\s\S]*<\/li>/),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/renders only nested inside a list item or blockquote/);
    },
  },
  {
    id: "d-752-15-m14-four-backtick-fence",
    routed: "752.15 M14 a four-backtick fence swallowing the pinned section and the next one (an inner three-backtick line closes nothing)",
    markdown: ["# Doc", "", "````md", "```", "## Controls", "", ...LIST, "```", "", "## Next", "", "Other text.", "````", ""].join("\n"),
    rendered: html => {
      expect(html).toContain("<pre>");
      expect(html).not.toContain("<h2>Controls</h2>");
    },
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/no level-2 heading "Controls"/);
    },
  },
  {
    id: "d-752-15-m15-html-block-heading",
    routed: "752.15 M15 an HTML block opened on the line above swallows the pinned heading",
    markdown: ["# Doc", "", "<div>", "## Controls", "", ...LIST, "", "## Next", "", "Other text.", ""].join("\n"),
    rendered: html => expect(html).not.toContain("<h2>Controls</h2>"),
    check: s => {
      expect(s.ok).toBe(false);
      expect(s.why).toMatch(/no level-2 heading "Controls"/);
    },
  },
  {
    id: "d-u62-matches-control",
    routed: "u62 control: the adoption form (sectionMatches, exact rendered block list) holds on the unmutated section",
    markdown: D_BASE,
    rendered: html => expect(html).toContain(`<p>${CLAUSE}</p>`),
    check: s => {
      expect(sectionMatches(s, pinned(D_BASE).blocks)).toEqual({ ok: true, why: "" });
      expect(renderedTexts(s)).toContain(CLAUSE);
    },
  },
  {
    id: "d-9x5-6-d1-relocation",
    routed: "9x5.6 D1 relocation: the pinned clause moved out of its section into an EOF appendix",
    markdown: `${doc(LIST)}\n## Appendix\n\n${CLAUSE}\n`,
    rendered: html => expect(html.indexOf(`<p>${CLAUSE}</p>`)).toBeGreaterThan(html.indexOf("<h2>Appendix</h2>")),
    check: s => {
      expect(s.ok).toBe(true);
      expect(renderedTexts(s)).not.toContain(CLAUSE);
      const verdict = sectionMatches(s, pinned(D_BASE).blocks);
      expect(verdict.ok).toBe(false);
      expect(verdict.why).toMatch(/block 1 differs/);
    },
  },
  {
    id: "d-9x5-6-d2-comment-wrap",
    routed: "9x5.6 D2 HTML-comment wrap: the pinned clause wrapped in a comment inside its section",
    markdown: doc(["<!--", CLAUSE, "-->", "", ...LIST]),
    rendered: html => {
      expect(html).toContain("<!--");
      expect(html).not.toContain(`<p>${CLAUSE}</p>`);
    },
    check: s => {
      expect(s.hasHtml).toBe(true);
      // the D2 footgun closed: no block's rendered text carries the commented clause; only an html block's raw does
      expect(renderedTexts(s).filter(text => text.includes(CLAUSE))).toEqual([]);
      expect(s.blocks.some(block => block.kind === "html" && block.raw.includes(CLAUSE))).toBe(true);
      const verdict = sectionMatches(s, pinned(D_BASE).blocks);
      expect(verdict.ok).toBe(false);
      expect(verdict.why).toMatch(/carries HTML/);
    },
  },
  {
    id: "d-9x5-6-d3-withdrawn",
    routed: "9x5.6 D3 a withdrawn ### subsection inserted inside the pinned section",
    markdown: doc([CLAUSE, "", ...LIST, "", "### Withdrawn", "", "Nothing in this section binds."]),
    rendered: html => expect(html).toContain("<h3>Withdrawn</h3>"),
    check: s => {
      // an includes-form adopter stays green (the clause is still present); the exact form reddens
      expect(renderedTexts(s)).toContain(CLAUSE);
      const verdict = sectionMatches(s, pinned(D_BASE).blocks);
      expect(verdict.ok).toBe(false);
      expect(verdict.why).toMatch(/the section has 4 blocks; the census pins 2/);
    },
  },
  {
    id: "d-u62-other-rendered",
    routed: "u62 D2 footgun, other blocks: a blockquote's text is its rendered text, an inline comment excluded",
    markdown: doc([...LIST, "", "> Operators <!-- may not --> keep these controls."]),
    rendered: html => expect(html).toContain("<blockquote>"),
    check: s => {
      expect(s.blocks).toContainEqual({ kind: "other", type: "blockquote", text: "Operators keep these controls." });
      expect(s.hasHtml).toBe(true);
    },
  },
  {
    id: "d-u62-matches-refused",
    routed: "u62 fail-closed: sectionMatches never passes a refused section",
    markdown: doc(LIST).replace("## Controls", "## Controlz"),
    rendered: html => expect(html).not.toContain("<h2>Controls</h2>"),
    check: s => {
      const verdict = sectionMatches(s, []);
      expect(verdict.ok).toBe(false);
      expect(verdict.why).toMatch(/no level-2 heading "Controls"/);
    },
  },
];


/**
 * u62 gate-2 (cmd_ca3b5facef4d, the respin-3 refusal; battery g2r3-falsify.mts mirrored from the gate evidence) and the
 * respin-4 seat's own hunt, both against the owner acceptance criterion of 2026-10-17 (report model = an explicit
 * RESOLVABLE-CONSTRUCT ROSTER, census.ts RESOLVABLE_CONSTRUCTS; every step of a flow matches a roster row or fails closed).
 * Runner truth for every inverted row: the pinned case's only assertion is expect(1).toBe(2) and the run reports it
 * passed; for every planted-false row the only expectation is on false and the run passes it; for every vacuous row
 * expect.hasAssertions() fails it. H = a vitest hook or context registrar VALUE outside a direct call (U1); O = same-file
 * const options written through a destructuring or for-of target (U2); E = assertion members (U3 / U4); R2 = vitest's
 * import.meta.vitest handle (U5); K = the gate's controls; S = the seat's routes beyond the battery, each measured
 * fail-open on d9e0b26 unless the row says control or cost.
 */
const WRITE_HOOK = "({ task }) => {\n    task.fails = true;\n  }";
const FAILING = "() => {\n    expect(1).toBe(2);\n  }";
const IMPORTS_HOOKS = 'import { afterAll, aroundEach, beforeEach, describe, expect, it, onTestFinished, test } from "vitest";';
/** A test.extend fixture vitest runs WITH the test context, writing the case's fails before it hands the value over. */
const FIXTURE_WRITE = "async ({ task }, use) => {\n    task.fails = true;\n    await use(1);\n  }";
/** A same-file check a matcher may call with the runner state it is handed: it sets the pinned case's fails. */
const SUITE_CHECK = `function check(suite: { tasks: { name: string; fails?: boolean }[] }): boolean {\n  const pinned = suite.tasks.find(entry => entry.name === "${PIN}");\n  if (pinned !== undefined) pinned.fails = true;\n  return true;\n}`;
/** A function kept on an object member that reaches the runner's current test and sets its fails (X15 / X19). */
const RUNNER_FLIP = (lookup: string): string => `const registry: { flip?: () => void } = {};\nregistry.flip = () => {\n  const current = ${lookup}();\n  if (current !== undefined) current.fails = true;\n};`;
const RUNNER_PLACE = /reaches the runner's current test or suite from code the census cannot place in one case or suite factory/;
const ROSTER_ROWS: readonly Row[] = [
  // U1 - the CONTEXT flow: a hook or registrar value used other than as a direct callee (or a const alias then called)
  // escapes, so every pin of its file is context-unknown in BOTH modes, naming it.
  {
    id: "r-u62g2r3-h1-array-held",
    routed: "u62 gate-2r3 H1 beforeEach held in an array, called through hooks[0]",
    source: { prelude: "const hooks = [beforeEach] as const;", body: `  hooks[0](${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is used as ArrayLiteralExpression/),
  },
  {
    id: "r-u62g2r3-h2-object-held",
    routed: "u62 gate-2r3 H2 beforeEach held as an object property, called through lifecycle.before",
    source: { prelude: "const lifecycle = { before: beforeEach };", body: `  lifecycle.before(${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is used as PropertyAssignment/),
  },
  {
    id: "r-u62g2r3-h3-param-helper",
    routed: "u62 gate-2r3 H3 beforeEach handed to a same-file helper that calls its parameter",
    source: { prelude: `function install(hook: typeof beforeEach): void {\n  hook(${WRITE_HOOK});\n}`, body: `  install(beforeEach);\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is handed to a call/),
  },
  {
    id: "r-u62g2r3-h4-let-held",
    routed: "u62 gate-2r3 H4 control: beforeEach held in a let binding (red on d9e0b26, carried)",
    source: { prelude: "let hook = beforeEach;\nhook = beforeEach;", body: `  hook(${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where"),
  },
  {
    id: "r-u62g2r3-h5-call-method",
    routed: "u62 gate-2r3 H5 beforeEach.call(undefined, callback)",
    source: { body: `  beforeEach.call(undefined, ${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: beforeEach\.call is called, but call is not a member of vitest's beforeEach hook/),
  },
  {
    id: "r-u62g2r3-h6-reflect-apply",
    routed: "u62 gate-2r3 H6 Reflect.apply(beforeEach, undefined, [callback])",
    source: { body: `  Reflect.apply(beforeEach, undefined, [${WRITE_HOOK}]);\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is handed to a call/),
  },
  {
    id: "r-u62g2r3-h7-returned",
    routed: "u62 gate-2r3 H7 beforeEach returned by a same-file function, pick()(callback)",
    source: { prelude: "const pick = () => beforeEach;", body: `  pick()(${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is used as ArrowFunction/),
  },
  {
    id: "r-u62g2r3-h8-bind",
    routed: "u62 gate-2r3 H8 beforeEach.bind(undefined)(callback)",
    source: { body: `  beforeEach.bind(undefined)(${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: beforeEach\.bind is called, but bind is not a member of vitest's beforeEach hook/),
  },
  {
    id: "r-u62g2r3-h9-iife-param",
    routed: "u62 gate-2r3 H9 beforeEach handed to an IIFE that calls its parameter",
    source: { body: `  ((h: typeof beforeEach) => h(${WRITE_HOOK}))(beforeEach);\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: it is handed to a call/),
  },
  {
    id: "r-u62g2r3-h10-registrar-array",
    routed: "u62 gate-2r3 H10 vitest's onTestFinished held in an array, called from the case body",
    source: { imports: IMPORTS_HOOKS, prelude: "const registrars = [onTestFinished] as const;", body: `  it("${PIN}", () => {\n    registrars[0](${WRITE_HOOK});\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest registrar onTestFinished at line \d+:\d+ escapes: it is used as ArrayLiteralExpression/),
  },
  {
    id: "r-u62g2r3-h11-test-api-hook-array",
    routed: "u62 gate-2r3 H11 the same hook through the test API, [test.beforeEach][0](callback) (executing mode fail-open on d9e0b26)",
    source: { prelude: "const testHooks = [test.beforeEach] as const;", body: `  testHooks[0](${WRITE_HOOK});\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook test\.beforeEach at line \d+:\d+ escapes: it is used as ArrayLiteralExpression/),
  },
  // U2 - the OPTIONS flow (report mode): a reference to a const options binding is safe only in the roster's read
  // positions; a destructuring or for-in / for-of target writes it, so the binding escapes and its fails is unknown.
  {
    id: "r-u62g2r3-o1-destructure-object",
    routed: "u62 gate-2r3 O1 ({ fails: opts.fails } = { fails: true }) before it(PIN, opts, fn)",
    source: { prelude: "const opts = { fails: false };\n({ fails: opts.fails } = { fails: true });", body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ are not a same-file const object literal/),
  },
  {
    id: "r-u62g2r3-o2-destructure-array",
    routed: "u62 gate-2r3 O2 [opts.fails] = [true] before it(PIN, opts, fn)",
    source: { prelude: "const opts = { fails: false };\n[opts.fails] = [true];", body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ are not a same-file const object literal/),
  },
  {
    id: "r-u62g2r3-o3-for-of-target",
    routed: "u62 gate-2r3 O3 for (opts.fails of [true]); before it(PIN, opts, fn)",
    source: { prelude: "const opts = { fails: false };\nfor (opts.fails of [true]);", body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ are not a same-file const object literal/),
  },
  {
    id: "r-u62g2r3-o4-describe-options",
    routed: "u62 gate-2r3 O4 describe options written through ({ fails: so.fails } = ...)",
    source: { prelude: "const so = { fails: false };\n({ fails: so.fails } = { fails: true });", body: `  describe("inner", so, () => {\n    it("${PIN}", ${FAILING});\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ are not a same-file const object literal/),
  },
  {
    id: "r-u62g2r3-o5-spread-source",
    routed: "u62 gate-2r3 O5 a spread source written through [base.fails] = [true], it(PIN, { ...base }, fn)",
    source: { prelude: "const base = { fails: false };\n[base.fails] = [true];", body: `  it("${PIN}", { ...base }, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ are not a same-file const object literal/),
  },
  // U3 - the ASSERTION flow (both modes): the first call after an expect construction counts only when it is one of
  // vitest's matchers (MATCHERS, pinned against the installed runtime); withContext / withTest configure, never check.
  {
    id: "a-u62g2r3-e1-withcontext",
    routed: "u62 gate-2r3 E1 void expect(x).withContext({}) - a non-matcher Assertion method, one counted assertion",
    source: { body: `  it("${PIN}", () => {\n    void expect(false).withContext({});\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-e2b-withtest",
    routed: "u62 gate-2r3 E2b void expect(x).withTest(undefined as never) - a non-matcher Assertion method",
    source: { body: `  it("${PIN}", () => {\n    void expect(false).withTest(undefined as never);\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-e3-not-withcontext",
    routed: "u62 gate-2r3 E3 void expect(x).not.withContext({})",
    source: { body: `  it("${PIN}", () => {\n    void expect(false).not.withContext({});\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  // U4 - an object-literal method body runs where it is CALLED, like the arrow / declaration / class-method twins.
  {
    id: "a-u62g2r3-e7-never-method",
    routed: "u62 gate-2r3 E7 the only assertion sits in an object-literal method that is never called",
    source: { body: `  it("${PIN}", () => {\n    const holder = {\n      check(): void {\n        expect(1).toBe(1);\n      },\n    };\n    void holder;\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  // U5 - vitest's public routes to its registration API are a CLOSED set; import.meta.vitest reads as a vitest namespace.
  {
    id: "r-u62g2r3-r2-import-meta-vitest",
    routed: "u62 gate-2r3 R2 import.meta.vitest (the same it object) rewrites runIf in the pinned file",
    source: {
      prelude: "const inSource = (import.meta as unknown as { vitest?: { it: typeof it } }).vitest;\nif (inSource !== undefined) Object.assign(inSource.it, { runIf: () => inSource.it.fails });",
      body: `  it.runIf(true)("${PIN}", ${FAILING});`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: the vitest namespace import\.meta\.vitest at line \d+:\d+ is used other than to read its members/),
  },
  // The gate's controls and costs, carried as rows so the cure keeps them.
  {
    id: "r-u62g2r3-k-around-direct",
    routed: "u62 gate-2r3 K-around control: a direct aroundEach writes task.fails through its context parameter",
    source: { imports: IMPORTS_HOOKS, body: `  aroundEach(async (run, { task }) => {\n    task.fails = true;\n    await run();\n  });\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /aroundEach at line \d+:\d+: task\.fails is written through the test context/),
  },
  {
    id: "r-u62g2r3-k-object-method-hook",
    routed: "u62 gate-2r3 K-object-method control: beforeEach called inside an object method the chain calls",
    source: { prelude: `const setup = {\n  run(): void {\n    beforeEach(${WRITE_HOOK});\n  },\n};`, body: `  setup.run();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62g2r3-k-context-destructure-write",
    routed: "u62 gate-2r3 K-C2 control: ({ fails: task.fails } = { fails: true }) in the case body",
    source: { body: `  it("${PIN}", ({ task }) => {\n    ({ fails: task.fails } = { fails: true });\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where"),
  },
  {
    id: "r-u62g2r3-k-context-for-of-write",
    routed: "u62 gate-2r3 K-C3 control: for (task.fails of [true]); in the case body",
    source: { body: `  it("${PIN}", ({ task }) => {\n    for (task.fails of [true]);\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where"),
  },
  {
    id: "a-u62g2r3-k-setstate-count",
    routed: "u62 gate-2r3 K-E4 control: expect.setState({ assertionCalls: 1 }) fakes the runtime count",
    source: { body: `  it("${PIN}", () => {\n    expect.setState({ assertionCalls: 1 });\n  });` },
    oracle: RUNS,
    verdict: red("no-assertion", "asserts"),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-k-never-arrow",
    routed: "u62 gate-2r3 K-E5 control: the only assertion sits in a const arrow that is never called",
    source: { body: `  it("${PIN}", () => {\n    const never = (): void => {\n      expect(1).toBe(1);\n    };\n    void never;\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-k-never-declaration",
    routed: "u62 gate-2r3 K-E6 control: the only assertion sits in a function declaration that is never called",
    source: { body: `  it("${PIN}", () => {\n    function never(): void {\n      expect(1).toBe(1);\n    }\n    void never;\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-k-never-class-method",
    routed: "u62 gate-2r3 K-E8 control: the only assertion sits in a class method that is never called",
    source: { body: `  it("${PIN}", () => {\n    class Checker {\n      check(): void {\n        expect(1).toBe(1);\n      }\n    }\n    void Checker;\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-k-withcontext-then-matcher",
    routed: "u62 gate-2r3 K-withContext the fail-closed COST: expect(x).withContext({}).toBe(x) - a matcher behind vitest's internal withContext (0 in test/** today)",
    source: { body: `  it("${PIN}", () => {\n    expect(1).withContext({}).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: red("no-assertion", "asserts", /the run counted an assertion, but no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  // The seat's hunt (respin-4), through the same three flows: S1/S2 the suite collector describe() RETURNS (measured:
  // vitest 4.1.10 returns the collector, whose on / options / test reach the suite's hooks, its fails and its cases).
  {
    id: "r-u62r4-s1-collector-on",
    routed: "u62 respin-4 S1 describe()'s returned collector registers a beforeEach through collector.on that sets task.fails",
    source: {
      body: `  const collector = describe("inner", () => {\n    it("${PIN}", ${FAILING});\n  });\n  collector.on("beforeEach", ((ctx: { task: { fails?: boolean } }) => {\n    ctx.task.fails = true;\n  }) as never);`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the suite collector vitest's describe returns at line \d+:\d+ escapes: it is used as VariableDeclaration/),
  },
  {
    id: "r-u62r4-s2-collector-options",
    routed: "u62 respin-4 S2 describe()'s returned collector carries the suite options: collector.options.fails = true",
    source: { body: `  const collector = describe("inner", () => {\n    it("${PIN}", ${FAILING});\n  });\n  (collector.options as { fails?: boolean }).fails = true;` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("context-unknown", "runs-where", /the suite collector vitest's describe returns at line \d+:\d+ escapes: it is used as VariableDeclaration/),
  },
  // S3-S5: code the J5 walk reaches through a declaration it did not follow (a class, a destructured binding, a relative
  // namespace / default import or a re-export) registers a context-writing hook.
  {
    id: "r-u62r4-s3-class-static-hook",
    routed: "u62 respin-4 S3 a class STATIC method the chain calls registers a context-writing beforeEach",
    source: { prelude: `class Setup {\n  static run(): void {\n    beforeEach(${WRITE_HOOK});\n  }\n}`, body: `  Setup.run();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r4-s4-destructured-helper",
    routed: "u62 respin-4 S4 a destructured helper the chain calls registers a context-writing beforeEach",
    source: { prelude: `const { install } = {\n  install(): void {\n    beforeEach(${WRITE_HOOK});\n  },\n};`, body: `  install();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r4-s5-relative-namespace",
    routed: "u62 respin-4 S5 a relative module reached through a namespace import registers a context-writing beforeEach",
    source: { imports: `${IMPORTS}\nimport * as hookHelpers from "./census-hook-helpers.js";`, body: `  hookHelpers.installWriter();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r4-s6-relative-default",
    routed: "u62 respin-4 S6 a relative module's DEFAULT export registers a context-writing beforeEach",
    source: { imports: `${IMPORTS}\nimport installDefault from "./census-hook-helpers.js";`, body: `  installDefault();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r4-s7-relative-reexport",
    routed: "u62 respin-4 S7 a helper reached through a relative RE-EXPORT registers a context-writing beforeEach",
    source: { imports: `${IMPORTS}\nimport { installWriter } from "./census-hook-reexport.js";`, body: `  installWriter();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  // S8-S10: a hook as a parameter's DEFAULT (the test/helpers/scratch.ts:125 and detached-peer.ts:96 shape): the
  // parameter called directly is read as that hook, so its callback's context flow is read (S8 red, S9 the clean cost
  // shape stays ok); any other use of the parameter escapes (S10).
  {
    id: "r-u62r4-s8-hook-parameter-writer",
    routed: "u62 respin-4 S8 a relative helper whose parameter defaults to beforeEach registers a context-writing callback",
    source: { imports: `${IMPORTS}\nimport { guardWriter } from "./census-hook-helpers.js";`, body: `  guardWriter();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /task\.fails is written through the test context/),
  },
  {
    id: "r-u62r4-s9-hook-parameter-clean",
    routed: "u62 respin-4 S9 control (the scratch.ts:125 shape): a relative helper whose parameter defaults to afterAll registers a clean cleanup",
    source: { imports: `${IMPORTS}\nimport { guardClean } from "./census-hook-clean.js";`, prelude: "guardClean();", body: PLAIN },
    oracle: RUNS,
    verdict: OK,
  },
  // S9b - the measured cost of context.free-hook (false-closed, the safe direction): the same clean guard imported from
  // a module that ALSO holds a context-writing hook in a function is refused, since that function may run in any suite.
  {
    id: "r-u62r4-s9b-mixed-helper-cost",
    routed: "u62 respin-4 S9b cost (measured, false-closed): the clean guard imported from a module that also holds a context-writing free hook refuses the pin",
    source: { imports: `${IMPORTS}\nimport { guardClean } from "./census-hook-helpers.js";`, prelude: "guardClean();", body: PLAIN },
    oracle: RUNS,
    verdict: red("context-unknown", "runs-where", /in \.\/census-hook-helpers\.js, loaded at .*: the vitest beforeEach at line \d+:\d+ is called where the census cannot place it in one suite/),
  },
  {
    id: "r-u62r4-s10-hook-parameter-escape",
    routed: "u62 respin-4 S10 a parameter defaulting to beforeEach used other than as a direct callee escapes",
    source: { prelude: `function guard(register: typeof beforeEach = beforeEach): void {\n  const all = [register] as const;\n  all[0](${WRITE_HOOK});\n}`, body: `  guard();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest hook beforeEach at line \d+:\d+ escapes: the parameter register it defaults is used as ArrayLiteralExpression/),
  },
  // S11: a context registrar DESTRUCTURED from the test context, used other than as a direct callee.
  {
    id: "r-u62r4-s11-destructured-registrar-array",
    routed: "u62 respin-4 S11 the context's destructured onTestFinished held in an array, called through it",
    source: { body: `  it("${PIN}", ({ onTestFinished }) => {\n    const registrars = [onTestFinished] as const;\n    registrars[0](${WRITE_HOOK});\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the test context's onTestFinished is used other than by calling it/),
  },
  // S12: a const options object carrying a METHOD exposes itself as this: opts.flip() writes opts.fails.
  {
    id: "r-u62r4-s12-options-method-this",
    routed: "u62 respin-4 S12 const options carrying a method that writes this.fails, called before the registration",
    source: { prelude: "const opts = {\n  fails: false,\n  flip(): void {\n    this.fails = true;\n  },\n};\nopts.flip();", body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the options at line \d+:\d+ (are not a same-file const object literal|carry the method flip)/),
  },
  // S13 / S14: vitest's registration API reached through import.meta aliased, or through a relative re-export.
  {
    id: "r-u62r4-s13-import-meta-alias",
    routed: "u62 respin-4 S13 import.meta aliased, its vitest member rewriting runIf",
    source: {
      prelude: "const meta = import.meta as unknown as { vitest?: { it: typeof it } };\nconst inSource = meta.vitest;\nif (inSource !== undefined) Object.assign(inSource.it, { runIf: () => inSource.it.fails });",
      body: `  it.runIf(true)("${PIN}", ${FAILING});`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: import\.meta at line \d+:\d+ is used other than to read a member/),
  },
  {
    id: "r-u62r4-s14-relative-reexport-api",
    routed: "u62 respin-4 S14 vitest's it re-exported by a relative module and rewritten through that alias",
    source: {
      imports: `${IMPORTS}\nimport { it as aliasIt } from "./census-vitest-reexport.js";`,
      prelude: "Object.assign(aliasIt, { runIf: () => aliasIt.fails });",
      body: `  it.runIf(true)("${PIN}", ${FAILING});`,
    },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: aliasIt at line \d+:\d+ is handed to a call/),
  },
  // S15 / S16: the assertion flow's other members - chai's internal assert method checks its own argument, never the
  // subject; a generator's body runs only when it is iterated (E9, the called-helper row sharpened).
  {
    id: "a-u62r4-s15-chai-assert-method",
    routed: "u62 respin-4 S15 expect(x).assert(true, msg) - chai's internal assert checks its argument, not the subject",
    source: { body: `  it("${PIN}", () => {\n    expect(false).assert(true, "checked nothing about the subject");\n  });` },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  {
    id: "a-u62g2r3-e9-generator-not-iterated",
    routed: "u62 gate-2r3 E9 the only assertion sits in a generator that is called but never iterated",
    source: { body: `  it("${PIN}", () => {\n    function* steps(): Generator<number> {\n      expect(1).toBe(1);\n      yield 1;\n    }\n    void steps();\n  });` },
    oracle: { kind: "vacuous" },
    verdict: red("no-assertion", "asserts", /reached no assertion when test ran it/),
    report: red("no-assertion", "asserts", /no matcher-bearing vitest assertion is reachable/),
  },
  // O6 - options.fails-constant: a fails value that is no constant the rows read is options-unknown, never read as absent.
  {
    id: "r-u62r4-o6-fails-not-constant",
    routed: "u62 respin-4 O6 options { fails: Boolean(1) } - a fails value that is not a constant",
    source: { body: `  it("${PIN}", { fails: Boolean(1) }, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the fails option at line \d+:\d+ is not a constant/),
  },
  // C1 - registration.relative-export's positive control: vitest's it re-exported by a relative module registers the pin.
  {
    id: "r-u62r4-c1-relative-reexport-control",
    routed: "u62 respin-4 C1 control: the pin registered through vitest's it re-exported by a relative module (export { it } from vitest)",
    source: { imports: `${IMPORTS}\nimport { it as reexportedIt } from "./census-vitest-reexport.js";`, body: `  reexportedIt("${PIN}", ${BODY});` },
    oracle: RUNS,
    verdict: OK,
  },
  // R1 (gate-2r3, measured fail-open on d9e0b26) - a relative module the pinned file loads for its side effect runs its
  // top level at import, inside the file's collection: the integrity scan and the hook walk cover the import closure.
  {
    id: "r-u62g2r3-r1-side-effect-mutation",
    routed: "u62 gate-2r3 R1 a relative module imported for its side effect rewrites it.runIf at import (Object.assign(it, { runIf: () => it.fails }))",
    source: { imports: `${IMPORTS}\nimport "./census-mutate-it.js";`, body: `  it.runIf(true)("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /the registration API escapes in this file: in \.\/census-mutate-it\.js, loaded at .*: it at line \d+:\d+ is handed to a call/),
  },
  {
    id: "r-u62r4-s16-side-effect-hook",
    routed: "u62 respin-4 S16 a relative module imported for its side effect registers a context-writing beforeEach at import",
    source: { imports: `${IMPORTS}\nimport "./census-hook-on-import.js";`, body: `  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /in \.\/census-hook-on-import\.js, loaded at .*: beforeEach at line \d+:\d+: task\.fails is written through the test context/),
  },
  // X - the seat's own hunt for false green THROUGH roster members (owner criterion (3)), each measured fail-open on
  // d9e0b26 (report mode; X1-X9 and X15-X19 in executing mode too): X1-X3 registration.method-call (fixtures), X4-X6
  // context.checked (a check that calls an argument with the runner state), X7 registration.suite-factory, X8 / X10b /
  // X11 assertion.handle-integrity, X9 context.free-hook, X14 options.fails-constant, X15-X19 context.runner-placed.
  {
    id: "r-u62r4-x1-extend-inline",
    routed: "u62 respin-4 X1 an inline it.extend fixture writes task.fails (vitest runs a fixture with the test context)",
    source: { body: `  it.extend<{ fx: number }>({ fx: ${FIXTURE_WRITE} })("${PIN}", ({ fx }) => {\n    void fx;\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the case is registered through test\.extend fixtures/),
  },
  {
    id: "r-u62r4-x2-extend-relative",
    routed: "u62 respin-4 X2 a relative module exports it.extend with a fixture that writes task.fails",
    source: { imports: `${IMPORTS}\nimport { fxTest } from "./census-extend-fixture.js";`, body: `  fxTest("${PIN}", ({ fx }) => {\n    void fx;\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /test\.extend fixtures|defines test fixtures/),
  },
  {
    id: "r-u62r4-x3-extend-element",
    routed: 'u62 respin-4 X3 it["extend"]: the fixture method read through an element access',
    source: { body: `  it["extend"]<{ fx: number }>({ fx: ${FIXTURE_WRITE} })("${PIN}", ({ fx }) => {\n    void fx;\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the case is registered through test\.extend fixtures/),
  },
  {
    id: "r-u62r4-x4-satisfy-by-name",
    routed: "u62 respin-4 X4 runner state checked by toSatisfy(check), a same-file function that sets the pin's fails",
    source: { prelude: SUITE_CHECK, body: `  it("${PIN}", ({ task }) => {\n    expect(task.suite).toSatisfy(check);\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /check, handed to the check of runner state, may be called with that state/),
  },
  {
    id: "r-u62r4-x5-asymmetric-object",
    routed: "u62 respin-4 X5 runner state compared against an object literal carrying asymmetricMatch, which sets the pin's fails",
    source: {
      body: `  it("${PIN}", ({ task }) => {\n    expect(task.suite).toEqual({\n      asymmetricMatch: (suite: { tasks: { name: string; fails?: boolean }[] }) => {\n        const pinned = suite.tasks.find(entry => entry.name === "${PIN}");\n        if (pinned !== undefined) pinned.fails = true;\n        return true;\n      },\n    });\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /asymmetricMatch[\s\S]*handed to the check of runner state, may be called with that state/),
  },
  {
    id: "r-u62r4-x6-satisfy-member",
    routed: "u62 respin-4 X6 runner state checked by toSatisfy(holder.check), the check kept on an object member",
    source: { prelude: `${SUITE_CHECK}\nconst holder = { check };`, body: `  it("${PIN}", ({ task }) => {\n    expect(task.suite).toSatisfy(holder.check);\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /holder\.check, handed to the check of runner state, may be called with that state/),
  },
  {
    id: "r-u62r4-x7-factory-param",
    routed: "u62 respin-4 X7 a describe factory's parameter receives vitest's test API (factory(test)); t.beforeEach sets task.fails",
    source: { body: `  describe("inner", (t: typeof test) => {\n    t.beforeEach(${WRITE_HOOK});\n    it("${PIN}", ${FAILING});\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the suite factory at line \d+:\d+ declares the parameter t: typeof test/),
    report: red("options-unknown", "asserts", /the suite factory at line \d+:\d+ declares the parameter t: typeof test/),
  },
  {
    id: "r-u62r4-x8-custom-matcher",
    routed: "u62 respin-4 X8 a same-file expect.extend matcher sets this.task.fails (vitest hands a matcher MatcherState.task)",
    source: {
      prelude: 'expect.extend({\n  toBeFine(this: { task?: { fails?: boolean } }) {\n    if (this.task !== undefined) this.task.fails = true;\n    return { pass: true, message: () => "" };\n  },\n});',
      body: `  it("${PIN}", () => {\n    (expect(1) as unknown as { toBeFine(): void }).toBeFine();\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the assertion handle expect at line \d+:\d+ registers code through extend/),
  },
  {
    id: "r-u62r4-x9-dispatch-member",
    routed: "u62 respin-4 X9 a hook call inside an arrow kept on an object member, dispatched from the pin's describe",
    source: { prelude: `const registry: { install?: () => void } = {};\nregistry.install = () => {\n  beforeEach(${WRITE_HOOK});\n};`, body: `  (registry.install as () => void)();\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /the vitest beforeEach at line \d+:\d+ is called where the census cannot place it in one suite/),
  },
  {
    id: "r-u62r4-x10b-mock-node-assert",
    routed: 'u62 respin-4 X10b vi.mock("node:assert") replaces equal with a no-op, the pin\'s only check',
    source: {
      imports: 'import { beforeEach, describe, expect, it, test, vi } from "vitest";\nimport nodeAssert from "node:assert";',
      prelude: 'vi.mock("node:assert", () => ({ default: { equal: (): void => undefined } }));',
      body: `  it("${PIN}", () => {\n    nodeAssert.equal(1, 2);\n  });`,
    },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("context-unknown", "runs-where", /vi\.mock\("node:assert"\) at line \d+:\d+ replaces an assertion or runner module/),
  },
  {
    id: "r-u62r4-x11-assert-overwrite",
    routed: "u62 respin-4 X11 node:assert's equal overwritten with a no-op, the pin's only check",
    source: {
      imports: `${IMPORTS}\nimport nodeAssert from "node:assert";`,
      prelude: "(nodeAssert as unknown as { equal: (...args: unknown[]) => void }).equal = () => {};",
      body: `  it("${PIN}", () => {\n    nodeAssert.equal(1, 2);\n  });`,
    },
    oracle: { kind: "planted-false" },
    verdict: red("no-assertion", "asserts", /reached no assertion/),
    report: red("context-unknown", "runs-where", /the assertion handle nodeAssert at line \d+:\d+ has equal written/),
  },
  {
    id: "r-u62r4-x14-undefined-shadow",
    routed: "u62 respin-4 X14 options { fails: undefined } where undefined is shadowed by a const true",
    source: { body: `  {\n    const undefined = true;\n    it("${PIN}", { fails: undefined }, ${FAILING});\n  }` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
  },
  {
    id: "r-u62r4-x15-runner-dispatch",
    routed: "u62 respin-4 X15 getCurrentTest called in an arrow kept on an object member, dispatched from the pin's case",
    source: { imports: IMPORTS_SUITE, prelude: RUNNER_FLIP("getCurrentTest"), body: `  it("${PIN}", () => {\n    (registry.flip as () => void)();\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", RUNNER_PLACE),
  },
  {
    id: "r-u62r4-x16-runner-class-field",
    routed: "u62 respin-4 X16 getCurrentTest in a class field initializer a sibling case defines, constructed in the pin's case",
    source: {
      imports: IMPORTS_SUITE,
      prelude: "const registry: { Probe?: unknown } = {};",
      body: `  it("defines a probe class", () => {\n    registry.Probe = class {\n      readonly current = getCurrentTest();\n    };\n    expect(1).toBe(1);\n  });\n  it("${PIN}", () => {\n    const made = new (registry.Probe as new () => { readonly current: { fails?: boolean } | undefined })();\n    if (made.current !== undefined) made.current.fails = true;\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", RUNNER_PLACE),
  },
  {
    id: "r-u62r4-x17-runner-alias",
    routed: "u62 respin-4 X17 a sibling case stores getCurrentTest itself on a member, the pin's case calls it",
    source: {
      imports: IMPORTS_SUITE,
      prelude: "const registry: { lookup?: unknown } = {};",
      body: `  it("keeps the lookup", () => {\n    registry.lookup = getCurrentTest;\n    expect(1).toBe(1);\n  });\n  it("${PIN}", () => {\n    const current = (registry.lookup as () => { fails?: boolean } | undefined)();\n    if (current !== undefined) current.fails = true;\n    expect(1).toBe(2);\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", RUNNER_PLACE),
  },
  {
    id: "r-u62r4-x18-runner-async",
    routed: "u62 respin-4 X18 a concurrent sibling reads getCurrentTest after an await - the pin's turn by then - and sets its fails",
    source: {
      imports: IMPORTS_SUITE,
      body: `  describe.concurrent("concurrent", () => {\n    it("reads the current test after an await", async () => {\n      await new Promise<void>(resolve => setTimeout(resolve, 50));\n      const current = getCurrentTest();\n      if (current !== undefined && current.name === "${PIN}") current.fails = true;\n      expect(2).toBe(2);\n    });\n    it("${PIN}", async () => {\n      await new Promise<void>(resolve => setTimeout(resolve, 500));\n      expect(1).toBe(2);\n    });\n  });`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", RUNNER_PLACE),
  },
  {
    id: "r-u62r4-x19-runner-reexport",
    routed: "u62 respin-4 X19 getCurrentTest re-exported by a relative module (export { getCurrentTest } from vitest/suite), called from an arrow kept on a member",
    source: { imports: `${IMPORTS}\nimport { getCurrentTest as lookup } from "./census-runner-reexport.js";`, prelude: RUNNER_FLIP("lookup"), body: `  it("${PIN}", () => {\n    (registry.flip as () => void)();\n    expect(1).toBe(2);\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /in \.\/census-runner-reexport\.js, loaded at .*: vitest\/suite is re-exported at line \d+:\d+/),
  },
  // X21 / X22 / X22b - shapes the respin-4 mutant table found unpinned (M4-15, M4-02): each guard's own falsifier.
  {
    id: "r-u62r4-x21-prototype-route",
    routed: "u62 respin-4 X21 the Assertion class reached through expect(0).constructor overwrites toBe with a no-op, the pin's only check",
    source: {
      prelude: '(expect(0).constructor as unknown as { overwriteMethod(name: string, fn: () => () => void): void }).overwriteMethod("toBe", () => function () {});',
      body: `  it("${PIN}", ${FAILING});`,
    },
    oracle: { kind: "planted-false" },
    verdict: red("context-unknown", "runs-where", /the assertion handle expect at line \d+:\d+ reaches constructor, the class its matchers are defined on/),
  },
  {
    id: "r-u62r4-x22-override-auto",
    routed: "u62 respin-4 X22 it.override at the module top level adds an auto fixture to the plain it that writes task.fails",
    source: {
      prelude: "it.override({\n  flip: [\n    async ({ task }, use) => {\n      task.fails = true;\n      await use(1);\n    },\n    { auto: true },\n  ],\n});",
      body: `  it("${PIN}", ${FAILING});`,
    },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /it\.override at line \d+:\d+ defines test fixtures, which vitest calls with the test context and the census does not read/),
  },
  {
    id: "r-u62r4-x22b-scoped-suite",
    routed: "u62 respin-4 X22b it.scoped inside the pin's describe adds an auto fixture to the plain it that writes task.fails",
    source: { body: `  it.scoped({\n    flip: [\n      async ({ task }, use) => {\n        task.fails = true;\n        await use(1);\n      },\n      { auto: true },\n    ],\n  });\n  it("${PIN}", ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("context-unknown", "runs-where", /it\.scoped at line \d+:\d+ defines test fixtures, which vitest calls with the test context and the census does not read/),
  },
  // K - positive controls that keep context.free-hook and api-use.type live (the acceptance block's liveness check).
  {
    id: "r-u62r4-k-free-hook-control",
    routed: "u62 respin-4 K-free-hook control: a same-file function registers a clean afterEach, called at the module top level",
    source: { imports: 'import { afterEach, beforeEach, describe, expect, it, test } from "vitest";', prelude: "function installCleanup(): void {\n  afterEach(() => {\n    void 0;\n  });\n}\ninstallCleanup();", body: PLAIN },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "r-u62r4-k-type-control",
    routed: "u62 respin-4 K-type control: a type-only reference to the registration API (typeof it) beside the pin",
    source: { prelude: "type Registration = typeof it;\nconst registrations: readonly Registration[] = [];\nvoid registrations;", body: PLAIN },
    oracle: RUNS,
    verdict: OK,
  },
  // C2-C4 - positive controls: every roster row resolves some ok verdict (no dead row; the acceptance block checks it).
  {
    id: "r-u62r4-c2-namespace-alias-control",
    routed: "u62 respin-4 C2 control: the pin registered through a vitest namespace member, beside a const alias of it read by typeof",
    source: {
      imports: `${IMPORTS}\nimport * as vitestNamespace from "vitest";`,
      prelude: 'const aliasIt = it;\nif (typeof aliasIt !== "function") throw new Error("vitest\'s it is missing");',
      body: `  vitestNamespace.it("${PIN}", ${BODY});`,
    },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "r-u62r4-c3-context-control",
    routed: "u62 respin-4 C3 control: the test context discarded, aliased and read, a clean handler registered through the alias, the assertion in a loop",
    source: { body: `  it("${PIN}", (ctx) => {\n    void ctx;\n    const alias = ctx;\n    alias.onTestFinished(() => undefined);\n    for (const value of [1]) {\n      expect(value).toBe(alias.task.name === "${PIN}" ? 1 : 0);\n    }\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "a-u62r4-c4-assert-first-control",
    routed: "u62 respin-4 C4 control: the first assertion is vitest's assert API (assert.equal), a matcher after it",
    source: { imports: 'import { assert, beforeEach, describe, expect, it, test } from "vitest";', body: `  it("${PIN}", () => {\n    assert.equal(1, 1);\n    expect(1).toBe(1);\n  });` },
    oracle: RUNS,
    verdict: OK,
  },
];

/**
 * wb-u62 respin-5 (PAIR-REVIEW; owner R1 = (a) CONFIRMED 2026-10-17T09:06:47Z): the inherited-option class and the
 * exported options binding, read against the gate-3 r4 battery (g3r4-falsify.mts O1-O6, P1-P9) and the seat's F1 / F2 /
 * E1. The main root is GUARDED - its config names census-guard.ts (test/helpers/census-guard.ts) as its first setup
 * file - so a prototype write of fails or fixtures is refused at collection and the file reports failed; the unguarded
 * twins, where the census itself must refuse the absent read, are config rows (c-u62r5-*).
 */
const INHERITED_ROWS: readonly Row[] = [
  {
    id: "r-u62r5-o1-exported-const",
    routed: "u62 gate-3r4 O1 export const opts = { fails: false }; a cyclic relative helper writes opts.fails = true before it(PIN, opts, fn)",
    source: { imports: `${IMPORTS}\nimport { flip } from "./census-r5-o1-helper.ts";`, prelude: "export const opts = { fails: false };\nflip();", body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /is exported/),
  },
  {
    id: "r-u62r5-o3-exported-spread-source",
    routed: "u62 gate-3r4 O3 export const base = { fails: false }; a cyclic helper writes base.fails = true; it(PIN, { ...base }, fn)",
    source: { imports: `${IMPORTS}\nimport { flip } from "./census-r5-o3-helper.ts";`, prelude: "export const base = { fails: false };\nflip();", body: `  it("${PIN}", { ...base }, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /is exported/),
  },
  {
    id: "r-u62r5-o4-exported-describe-options",
    routed: 'u62 gate-3r4 O4 export const so = { fails: false }; a cyclic helper writes so.fails = true; describe("inner", so, () => it(PIN, fn))',
    source: { imports: `${IMPORTS}\nimport { flip } from "./census-r5-o4-helper.ts";`, prelude: "export const so = { fails: false };\nflip();", body: `  describe("inner", so, () => {\n    it("${PIN}", ${FAILING});\n  });` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /is exported/),
  },
  {
    id: "r-u62r5-o1b-export-specifier",
    routed: "u62 respin-5 O1b const opts = { fails: false }; export { opts } - the export clause names the options binding, which an importer may write; it(PIN, opts, fn) passes",
    source: { prelude: "const opts = { fails: false };\nexport { opts };", body: `  it("${PIN}", opts, ${BODY});` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /is exported \(export \{ opts \}/),
  },
  {
    id: "r-u62r5-o1c-export-default",
    routed: "u62 respin-5 O1c const opts = { fails: false }; export default opts - the default export is the options binding; it(PIN, opts, fn) passes",
    source: { prelude: "const opts = { fails: false };\nexport default opts;", body: `  it("${PIN}", opts, ${BODY});` },
    oracle: RUNS,
    verdict: OK,
    report: red("options-unknown", "asserts", /is exported \(export default/),
  },
  {
    id: "r-u62r5-e1-direct-eval",
    routed: 'u62 respin-5 E1 const opts = { fails: false }; eval("opts.fails = true") - a direct eval writes a const options binding by name',
    source: { prelude: 'const opts = { fails: false };\neval("opts.fails = true");', body: `  it("${PIN}", opts, ${FAILING});` },
    oracle: { kind: "inverted" },
    verdict: red("inverted", "asserts", /registered with fails/),
    report: red("options-unknown", "asserts", /direct eval/),
  },
  {
    id: "r-u62r5-o6-numeric-options",
    routed: "u62 gate-3r4 O6 it(PIN, 1000 as never, fn): vitest 4.1.10 reads no options from a number (options.number)",
    source: { body: `  it("${PIN}", 1000 as never, ${BODY});` },
    oracle: RUNS,
    verdict: OK,
  },
  {
    id: "r-u62r5-p1-proto-own-file",
    routed: "u62 gate-3r4 P1 a non-enumerable Object.prototype.fails defined in the pinned file, it(PIN, fn): the census guard refuses it at collection",
    source: { prelude: PROTO_FAILS, body: `  it("${PIN}", ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fails/),
  },
  {
    id: "r-u62r5-p2-proto-helper",
    routed: "u62 gate-3r4 P2 the same write in a relative helper that never touches vitest, imported for its side effect",
    source: { imports: `${IMPORTS}\nimport "./census-r5-proto.ts";`, body: `  it("${PIN}", ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fails/),
  },
  {
    id: "r-u62r5-p3-proto-literal-options",
    routed: "u62 gate-3r4 P3 helper prototype write; it(PIN, { timeout: 5000 }, fn) - options.literal reads no own fails",
    source: { imports: `${IMPORTS}\nimport "./census-r5-proto.ts";`, body: `  it("${PIN}", { timeout: 5000 }, ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fails/),
  },
  {
    id: "r-u62r5-p5-proto-named-import",
    routed: "u62 gate-3r4 P5 the prototype write as a relative helper's const initializer, imported by name",
    source: { imports: `${IMPORTS}\nimport { installed } from "./census-r5-proto-named.ts";`, prelude: "void installed;", body: `  it("${PIN}", ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fails/),
  },
  {
    id: "r-u62r5-p7-proto-describe-inner",
    routed: 'u62 gate-3r4 P7 helper prototype write; describe("inner", () => it(PIN, fn)) - options.enclosure reads no own fails',
    source: { imports: `${IMPORTS}\nimport "./census-r5-proto.ts";`, body: `  describe("inner", () => {\n    it("${PIN}", ${FAILING});\n  });` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fails/),
  },
  {
    id: "r-u62r5-p8-proto-assign",
    routed: "u62 gate-3r4 P8 an enumerable Object.prototype.fails = true in the pinned file: the guard's setter refuses it",
    source: { prelude: "(Object.prototype as Record<string, unknown>).fails = true;", body: `  it("${PIN}", ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /census guard: Object\.prototype\.fails is refused/),
  },
  {
    id: "r-u62r5-f1-inherited-fixtures",
    routed: "u62 respin-5 F1 a relative helper places a fixtures registry on Object.prototype whose auto fixture writes context.task.fails: the guard refuses it",
    source: { imports: `${IMPORTS}\nimport "./census-r5-fixtures.ts";`, body: `  it("${PIN}", ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fixtures/),
  },
  {
    id: "r-u62r5-f2-own-false-fixtures",
    routed: "u62 respin-5 F2 the F1 helper with it(PIN, { fails: false }, fn): an own fails does not stop an inherited fixtures registry",
    source: { imports: `${IMPORTS}\nimport "./census-r5-fixtures.ts";`, body: `  it("${PIN}", { fails: false }, ${FAILING});` },
    oracle: RUNS_NOT,
    verdict: red("collection-error", "exists", /Cannot redefine property: fixtures/),
  },
];

/**
 * Each-liveness of THIS table (h8f.9 O1 class): every routed mode name keeps its row, so emptying a table goes red.
 * A mode counts only inside a " / "-separated segment of a routed string that names its own gate.
 */
const ROUTED_MODES: Readonly<Record<string, readonly string[]>> = {
  "6hb.6": ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10", "N11", "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22", "N23", "N24", "S1", "S2", "S3", "S3r", "S4", "S4t", "S5", "S10", "S12", "T1", "T3", "U3"],
  "0kg.11": ["(1)", "(2)", "(3)", "(4)", "(5)", "(6)", "(7)", "(8)", "(9)", "(10)", "(11)", "(12)", "spread", "concat", "testNamePattern", "package.json", "F8", "U3", "U4"],
  "h8f.9": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "T2", "T3", "T3-variant", "T4", "D3", "D4", "U5"],
  "752.10": ["X1", "X2", "X3", "X4", "X5", "X6b", "X7b", "X9", "X11", "X12", "X13", "F2", "F3"],
  "cax.23": ["S7", "S8"],
  "0kg.7": ["X16"],
  "gs2.2": ["X17"],
  "0kg.12": [
    "(1)",
    "(2)",
    "(3)",
    "(4)",
    "(5)",
    "(6)",
    "(7)",
    "env-conditional",
    "never-called",
    "bracket-describe",
    "spaced-describe",
    "spaced-it",
    "options-variable",
    "end-spread",
    "concat",
    "testNamePattern",
    "package.json",
    "gate-step",
    "front-spread",
    "F6",
    "U4a",
    "U4b",
    "DR1",
    "DR2",
  ],
  "6hb.7": [
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
    "S11",
    "S12",
    "S13",
    "K1",
    "K2",
    "K3",
    "K4",
    "K5",
    "K6",
    "K7",
    "K8",
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M10",
    "M11",
    "M12",
    "M13",
    "M14",
    "M15",
    "FR1",
    "F7",
  ],
  "6ze.38": ["M1", "M2b", "M3", "M4", "M4b", "M5", "M6", "M7", "M8", "M8b", "M9", "M10", "M11", "M12", "M13", "M14a", "M14b", "M15", "M16", "M19", "K8", "K9", "K13", "K16", "K17"],
  "cax.25": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12a", "M12b", "T1", "T2", "T3", "K1", "K2", "K3", "K4", "FR1", "FR2", "FR3", "X1", "D1", "D2", "F7"],
  u62: ["J1", "J2", "J3", "J4", "J5", "A1a", "A1b", "GM19", "GM21", "E2E"],
  "9x5.6": ["D1", "D2", "D3"],
  "6hb.11": ["J1", "J4", "SD1", "X17", "S10b", "S18", "S19", "S20", "S21", "E1", "F4", "T7", "T8"],
  "752.15": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M9", "M10", "M11", "M12", "M13", "M14", "M15"],
  "u62 gate-2": ["U1.1", "U1.2", "U1.3", "U1.4", "U1.5", "U2", "I1.1", "I1.2", "I1.3"],
  "u62 gate-3": ["(1)", "(2)", "(3)", "(4)", "(5)", "(6)", "(7)", "(1c)", "(6c)", "(8)", "(9)", "(10)", "(11)", "(12)", "(13)", "(14)", "(15)", "(16)"],
  "u62 respin-3": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "K1", "K2", "K3", "K4"],
  "u62 gate-2r3": ["R1", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "O1", "O2", "O3", "O4", "O5", "E1", "E2b", "E3", "E7", "E9", "R2", "K-around", "K-object-method", "K-C2", "K-C3", "K-E4", "K-E5", "K-E6", "K-E8", "K-withContext"],
  "u62 respin-4": [
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S9b",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
    "S15",
    "S16",
    "O6",
    "C1",
    "C2",
    "C3",
    "C4",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "X8",
    "X9",
    "X10b",
    "X11",
    "X14",
    "X15",
    "X16",
    "X17",
    "X18",
    "X19",
    "X21",
    "X22",
    "X22b",
    "K-free-hook",
    "K-type",
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
  ],
  "u62 gate-3r4": ["O1", "O3", "O4", "O6", "P1", "P2", "P3", "P5", "P6", "P7", "P8"],
  "u62 respin-5": ["E1", "F1", "F2", "RS1", "RS2", "G-not-first", "G-parallel", "G-list", "G-altered", "G-pool", "G-env", "G-global-setup", "G-config-code", "G-config-import", "G-value-code", "G-server", "G-server-deps", "G-coverage", "G-define", "G-no-default", "G-no-test", "G-sequence", "G-setup-literal", "G-cli-dash", "G-cli-value", "G-cli-config-missing"],
  "u62 respin-6": ["N2", "N4", "N5", "V1", "V2", "V3"],
};

/** Exact table sizes: deleting or emptying a falsifier table goes red (each-liveness of this file's own rows). */
const TABLE_SIZES = [55, 8, 22, 46, 15, 10, 54, 34, 5, 16, 43, 19, 5, 76, 15, 89];


/**
 * Source structure (0kg.7 F10 / gate mutant X16: an import pin read as text survives a commented-out import plus a
 * local stub). Runner truth: each fixture module records its own load when the runner evaluates it, so a row proves
 * whether the module is really loaded before the AST answer is trusted.
 */
interface StructureRow {
  readonly id: string;
  readonly routed: string;
  readonly source: Source;
  /** Does the runner load census-fixture-<id>.ts while running the file? */
  readonly loaded: boolean;
  readonly check: (structure: SourceStructure, fixture: string) => void;
}

const fixtureOf = (id: string): string => `./census-fixture-${id}.js`;
const importsOf = (structure: SourceStructure, module: string) => structure.imports.filter(entry => entry.module === module);

const STRUCTURE_ROWS: readonly StructureRow[] = [
  {
    id: "s-control",
    routed: "control: the shared fixture is imported and no local copy is declared",
    source: { imports: `${IMPORTS}\nimport { faultProviderSource } from "${fixtureOf("s-control")}";`, body: `  it("${PIN}", () => {\n    expect(faultProviderSource()).toBe("real");\n  });` },
    loaded: true,
    check: (structure, fixture) => {
      expect(importsOf(structure, fixture).map(entry => ({ names: entry.names, kind: entry.kind, typeOnly: entry.typeOnly }))).toEqual([{ names: ["faultProviderSource"], kind: "static", typeOnly: false }]);
      expect(structure.declarations).not.toContain("faultProviderSource");
    },
  },
  {
    id: "s-x16-commented-import",
    routed: "0kg.7 F10 X16: the fixture import commented out and a local stub declared in its place",
    source: {
      imports: `${IMPORTS}\n// import { faultProviderSource } from "${fixtureOf("s-x16-commented-import")}";`,
      prelude: 'const faultProviderSource = (): string => "stub";',
      body: `  it("${PIN}", () => {\n    expect(faultProviderSource()).toBe("stub");\n  });`,
    },
    loaded: false,
    check: (structure, fixture) => {
      expect(importsOf(structure, fixture)).toEqual([]);
      expect(structure.declarations).toContain("faultProviderSource");
    },
  },
  {
    id: "s-string-import",
    routed: "an import statement inside a string is not an import",
    source: { prelude: `const NOTE = 'import { faultProviderSource } from "${fixtureOf("s-string-import")}";';`, body: `  it("${PIN}", () => {\n    expect(NOTE.length).toBeGreaterThan(0);\n  });` },
    loaded: false,
    check: (structure, fixture) => expect(importsOf(structure, fixture)).toEqual([]),
  },
  {
    id: "s-type-only",
    routed: "a type-only import is erased and loads nothing",
    source: { imports: `${IMPORTS}\nimport type { Fixture } from "${fixtureOf("s-type-only")}";`, prelude: 'const sample: Fixture = { id: "x" };', body: `  it("${PIN}", () => {\n    expect(sample.id).toBe("x");\n  });` },
    loaded: false,
    check: (structure, fixture) => expect(importsOf(structure, fixture).map(entry => entry.typeOnly)).toEqual([true]),
  },
  {
    id: "s-dynamic",
    routed: "a dynamic import() inside the case is listed as dynamic",
    source: { body: `  it("${PIN}", async () => {\n    const fixture = await import("${fixtureOf("s-dynamic")}");\n    expect(fixture.faultProviderSource()).toBe("real");\n  });` },
    loaded: true,
    check: (structure, fixture) => expect(importsOf(structure, fixture).map(entry => entry.kind)).toEqual(["dynamic"]),
  },
];

const BROKEN_STRUCTURE = "test/census-structure-broken.ts";
const FIXTURE_LOADS = ".census-fixture-loads";
const fixtureModule = (id: string): string =>
  `import { appendFileSync } from "node:fs";\nappendFileSync(new URL("../${FIXTURE_LOADS}", import.meta.url), "${id}\\n");\nexport const faultProviderSource = (): string => "real";\nexport interface Fixture {\n  readonly id: string;\n}\n`;

// ---------------------------------------------------------------------------------------------------------
// Harness: synthetic projects, the runner oracle (JSON reporter through the tier's real command), the helper.
// ---------------------------------------------------------------------------------------------------------

const MAIN_ROWS: readonly Row[] = [...REGISTRATION, ...EACH, ...BODY_ROWS, ...ASSERT_ROWS, ...ATTRIBUTION_ROWS, ...JUDGE_ROWS, ...INVERSION_ROWS, ...ROSTER_ROWS, ...INHERITED_ROWS];
const fileOf = (id: string): string => `test/${id}.test.ts`;
const pinOf = (row: Row): CasePin => ({ file: fileOf(row.id), title: PIN, tier: DEFAULT_GATE_TIER, ...row.pin });
const MAIN_PINS: readonly { readonly id: string; readonly pin: CasePin }[] = [
  ...MAIN_ROWS.map(row => ({ id: row.id, pin: pinOf(row) })),
  ...TIER_ROWS.map(row => ({ id: row.id, pin: row.pin })),
];

/** The relative module the respin-4 S5-S9 rows reach: hooks registered by its exports, two through a parameter's default. */
const HOOK_HELPERS = [
  'import { afterAll, beforeEach } from "vitest";',
  `export function installWriter(): void {\n  beforeEach(${WRITE_HOOK});\n}`,
  `export default function installDefault(): void {\n  beforeEach(${WRITE_HOOK});\n}`,
  `export function guardWriter(register: typeof beforeEach = beforeEach): void {\n  register(${WRITE_HOOK});\n}`,
  "export function guardClean(register: (hook: () => void) => void = afterAll): void {\n  register(() => {\n    void 0;\n  });\n}",
  "",
].join("\n");

/** The scratch.ts:125 / detached-peer.ts:96 shape on its own: one module, one clean hook helper whose parameter defaults to afterAll. */
const HOOK_CLEAN = 'import { afterAll } from "vitest";\nexport function guardClean(register: (hook: () => void) => void = afterAll): void {\n  register(() => {\n    void 0;\n  });\n}\n';

/** The documented gate env (house rule: the operator exports a worker cap); every runner run and helper run here carries it. */
const GATE_CAP = "2";

/**
 * u62 respin-5: every synthetic project carries the census guard's own bytes (test/helpers/census-guard.ts) at its root,
 * and a config that names no setup file of its own names the guard as its only one - so the projects run as a guarded
 * tier does; a row that tests the guard itself writes its own config (unguarded) or its own guard file.
 */
const GUARD_FILE = "census-guard.ts";
const GUARD_SOURCE = readFileSync(join(ROOT, "test", "helpers", GUARD_FILE), "utf8");
const vitestConfig = (testOptions: string, prelude = "", guarded = true): string =>
  [
    'import { defineConfig } from "vitest/config";',
    prelude,
    `export default defineConfig({ cacheDir: ".census-cache", test: { cache: false, ${guarded && !testOptions.includes("setupFiles") ? `setupFiles: ["./${GUARD_FILE}"], ` : ""}${testOptions} } });`,
    "",
  ].join("\n");
const defaultOptions = (extra: string): string => `include: ["test/**/*.test.ts"], allowOnly: false${extra === "" ? "" : `, ${extra}`}`;
const packageJson = (testScript: string | null, scripts: Readonly<Record<string, string>> = {}): string =>
  `${JSON.stringify({ name: "census-synthetic", private: true, scripts: { lint: "true", ...(testScript === null ? {} : { test: testScript }), ...scripts } }, null, 2)}\n`;
const forgeToml = (testCommand: string, gate = '["lint", "test"]', extra = ""): string =>
  `[package]\nname = "census-synthetic"\n\n[build]\ngate = ${gate}\n\n[build.commands]\nlint = "npm run lint"\ntest = ${JSON.stringify(testCommand)}\n${extra}`;

function writeFiles(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}

function writeTree(root: string, files: Readonly<Record<string, string>>): string {
  writeFiles(root, { [GUARD_FILE]: GUARD_SOURCE, ...files });
  symlinkSync(join(ROOT, "node_modules"), join(root, "node_modules"), "dir");
  return root;
}

/** A report-mode-only pinned file: judged after its mtime is moved past the report's (the stale-report class). */
const STALE_TARGET = "test/p-stale-target.test.ts";

function buildMainRoot(root: string): string {
  const files: Record<string, string> = {
    "package.json": packageJson("vitest run"),
    "forge.toml": forgeToml(
      "npm run test",
      undefined,
      '\n[build.commands.live]\ncommand = "./node_modules/.bin/vitest run --config vitest.live.config.ts"\ntimeout = 60\n\n[build.commands.shell-tier]\ncommand = "bash run-tests.sh"\n',
    ),
    "vitest.config.ts": vitestConfig(defaultOptions(`exclude: [${JSON.stringify(LIVE_ONLY)}], tags: [{ name: "census-tag" }]`)),
    "vitest.live.config.ts": vitestConfig(`include: ${JSON.stringify([LIVE_ONLY, LIVE_IN_DEFAULT, LIVE_ENV])}, env: { CENSUS_LIVE_TIER: "1" }`),
    "vitest.asserts.config.ts": vitestConfig(`include: ${JSON.stringify([...ASSERT_ROWS, ...ROSTER_ROWS].map(row => fileOf(row.id)))}, setupFiles: ["./${GUARD_FILE}", "./census-has-assertions.setup.ts"], sequence: { setupFiles: "list" }`),
    "census-has-assertions.setup.ts": 'import { beforeEach, expect } from "vitest";\nbeforeEach(() => {\n  expect.hasAssertions();\n});\n',
    "test/census-assert-helper.ts": 'import { expect } from "vitest";\nexport function assertPositive(value: number): void {\n  expect(value).toBeGreaterThan(0);\n}\n',
    "test/census-register-helper.ts": `import { expect, it } from "vitest";\nexport function registerPinned(): void {\n  it(${JSON.stringify(PIN)}, () => {\n    expect(1).toBe(1);\n  });\n}\n`,
    "test/census-hook-helpers.ts": HOOK_HELPERS,
    "test/census-hook-reexport.ts": 'export { installWriter } from "./census-hook-helpers.js";\n',
    "test/census-vitest-reexport.ts": 'export { it } from "vitest";\n',
    "test/census-mutate-it.ts": 'import { it } from "vitest";\nObject.assign(it, { runIf: () => it.fails });\n',
    "test/census-hook-on-import.ts": `import { beforeEach } from "vitest";\nbeforeEach(${WRITE_HOOK});\n`,
    "test/census-hook-clean.ts": HOOK_CLEAN,
    "test/census-extend-fixture.ts": `import { it } from "vitest";\nexport const fxTest = it.extend<{ fx: number }>({ fx: ${FIXTURE_WRITE} });\n`,
    "test/census-runner-reexport.ts": 'export { getCurrentTest } from "vitest/suite";\n',
    "test/census-r5-o1-helper.ts": 'import { opts } from "./r-u62r5-o1-exported-const.test.ts";\nexport function flip(): void {\n  opts.fails = true;\n}\n',
    "test/census-r5-o3-helper.ts": 'import { base } from "./r-u62r5-o3-exported-spread-source.test.ts";\nexport function flip(): void {\n  base.fails = true;\n}\n',
    "test/census-r5-o4-helper.ts": 'import { so } from "./r-u62r5-o4-exported-describe-options.test.ts";\nexport function flip(): void {\n  so.fails = true;\n}\n',
    "test/census-r5-proto.ts": `${PROTO_FAILS}\nexport {};\n`,
    "test/census-r5-proto-named.ts": 'export const installed = Object.defineProperty(Object.prototype, "fails", { value: true, configurable: true, writable: true }) !== undefined;\n',
    "test/census-r5-fixtures.ts": FIXTURES_HELPER,
    [LIVE_ONLY]: testFile({ body: PLAIN }),
    [LIVE_IN_DEFAULT]: testFile({ body: PLAIN }),
    [STALE_TARGET]: testFile({ body: PLAIN }),
  };
  for (const row of MAIN_ROWS) files[fileOf(row.id)] = testFile(row.source);
  for (const row of STRUCTURE_ROWS) {
    files[fileOf(row.id)] = testFile(row.source);
    files[`test/census-fixture-${row.id}.ts`] = fixtureModule(row.id);
  }
  files[BROKEN_STRUCTURE] = "export const = ;\n";
  for (const row of TIER_ROWS) if (row.source !== undefined) files[row.file] = row.source;
  return writeTree(root, files);
}

/** A config row's project: at base itself, or (u62 respin-6, a row with a parent) at base/child under the parent's files. */
function buildConfigRoot(base: string, row: ConfigRow): string {
  const root = row.parent === undefined ? base : join(base, "child");
  if (row.parent !== undefined) writeFiles(base, row.parent(root));
  const project = {
    "package.json": packageJson(row.testScript === undefined ? "vitest run" : row.testScript, row.scripts),
    "forge.toml": row.rawForge ?? forgeToml(row.forgeCommand ?? "npm run test", row.gate),
    "vitest.config.ts": vitestConfig(defaultOptions(row.configBody ?? ""), row.configPrelude ?? "", row.unguarded !== true),
    [CFG_TARGET]: testFile(row.target ?? { body: PLAIN }),
  };
  writeTree(root, { ...project, ...row.files, ...row.rooted?.(root) });
  for (const file of row.executables ?? []) chmodSync(join(root, file), 0o755);
  return root;
}

/** A one-config project (forge.toml test -> npm run test -> the given script) holding the given files. */
const projectFiles = (testScript: string, extra: Readonly<Record<string, string>>): Record<string, string> => ({
  "package.json": packageJson(testScript),
  "forge.toml": forgeToml("npm run test"),
  "vitest.config.ts": vitestConfig(defaultOptions("")),
  ...extra,
});

/**
 * u62 respin-5 G rows: censusGuard reads the tier's own run STATICALLY (both modes) - the forge.toml step through its
 * npm script, the argv's closed flag list, the ONE config file vitest loads, its literal default export and key lists,
 * and the first setup file's bytes - and never executes it. Each row is a one-config project over the default one
 * (forge.toml test -> npm run test -> vitest run); a null file drops that file from it.
 */
interface GuardRow {
  readonly id: string;
  readonly routed: string;
  readonly files: Readonly<Record<string, string | null>>;
  /** u62 respin-6: the project sits at child/ under a directory holding these files (an enclosing package.json). */
  readonly parent?: Readonly<Record<string, string>>;
  readonly ok: boolean;
  readonly why?: RegExp;
}

const GUARDED_TEST = `setupFiles: ["./${GUARD_FILE}"]`;
const rawConfig = (body: string, imports = 'import { defineConfig } from "vitest/config";'): string => `${imports}\n${body}\n`;
const OTHER_SETUP = { "census-other.setup.ts": "export {};\n" } as const;
/** wb-nl8: the report-emitting default-tier script and its pretest rotation hook, written out as the literals the vouch must admit (and nothing near them). */
const NL8_TEST_SCRIPT = "vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions";
const NL8_PRETEST = "node -e \"require('fs').rmSync('.forge/vitest-report.json',{force:true})\"";

const GUARD_ROWS: readonly GuardRow[] = [
  { id: "g-u62r5-control", routed: "u62 respin-5 G-control: the one-config project names the census guard as its only setup file", files: {}, ok: true },
  { id: "g-u62r5-missing", routed: "u62 respin-5 G-missing: the config names no setup file", files: { "vitest.config.ts": vitestConfig(defaultOptions(""), "", false) }, ok: false, why: /vitest\.config\.ts names no setup file/ },
  {
    id: "g-u62r5-not-first",
    routed: "u62 respin-5 G-not-first: another setup file runs before the census guard",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('setupFiles: ["./census-other.setup.ts", "./census-guard.ts"], sequence: { setupFiles: "list" }')), ...OTHER_SETUP },
    ok: false,
    why: /the first setup file \.\/census-other\.setup\.ts is not the census guard/,
  },
  {
    id: "g-u62r5-parallel",
    routed: "u62 respin-5 G-parallel: the guard first of two setup files under vitest's default parallel import",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('setupFiles: ["./census-guard.ts", "./census-other.setup.ts"]')), ...OTHER_SETUP },
    ok: false,
    why: /in parallel/,
  },
  {
    id: "g-u62r5-list",
    routed: 'u62 respin-5 G-list control: the guard first of two setup files under sequence.setupFiles "list"',
    files: { "vitest.config.ts": vitestConfig(defaultOptions('setupFiles: ["./census-guard.ts", "./census-other.setup.ts"], sequence: { setupFiles: "list" }')), ...OTHER_SETUP },
    ok: true,
  },
  { id: "g-u62r5-altered", routed: "u62 respin-5 G-altered: the first setup file is named census-guard.ts but holds other bytes", files: { [GUARD_FILE]: "export {};\n" }, ok: false, why: /is not the census guard: its sha256/ },
  {
    id: "g-u62r5-absent",
    routed: "u62 respin-5 G-absent: the first setup file the config names does not exist",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('setupFiles: ["./test/no-such-guard.ts"]')) },
    ok: false,
    why: /\.\/test\/no-such-guard\.ts .*does not exist/,
  },
  { id: "g-u62r5-pool-vm", routed: "u62 respin-5 G-pool: pool vmThreads", files: { "vitest.config.ts": vitestConfig(defaultOptions('pool: "vmThreads"')) }, ok: false, why: /pool "vmThreads"/ },
  { id: "g-u62r5-pool-threads", routed: "u62 respin-5 G-pool control: pool threads", files: { "vitest.config.ts": vitestConfig(defaultOptions('pool: "threads"')) }, ok: true },
  { id: "g-u62r5-environment", routed: "u62 respin-5 G-environment: environment jsdom", files: { "vitest.config.ts": vitestConfig(defaultOptions('environment: "jsdom"')) }, ok: false, why: /environment "jsdom"/ },
  { id: "g-u62r5-plugins", routed: "u62 respin-5 G-plugins: a top-level plugins key", files: { "vitest.config.ts": rawConfig(`export default defineConfig({ plugins: [], test: { ${GUARDED_TEST} } });`) }, ok: false, why: /plugins/ },
  { id: "g-u62r5-alias", routed: "u62 respin-5 G-alias: resolve.alias", files: { "vitest.config.ts": rawConfig(`export default defineConfig({ resolve: { alias: { vitest: "./census-other.setup.ts" } }, test: { ${GUARDED_TEST} } });`) }, ok: false, why: /resolve\.alias/ },
  {
    id: "g-u62r5-test-key",
    routed: "u62 respin-5 G-test-key: a test key outside the closed list (execArgv preloads code into the workers)",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('execArgv: ["--import", "./census-other.setup.ts"]')) },
    ok: false,
    why: /test\.execArgv/,
  },
  { id: "g-u62r5-non-literal", routed: "u62 respin-5 G-non-literal: the default export is defineConfig of a const", files: { "vitest.config.ts": rawConfig(`const config = { test: { ${GUARDED_TEST} } };\nexport default defineConfig(config);`) }, ok: false, why: /object literal/ },
  {
    id: "g-u62r5-foreign-define",
    routed: "u62 respin-5 G-foreign-define: defineConfig imported from vite, not vitest/config",
    files: { "vitest.config.ts": rawConfig(`export default defineConfig({ test: { ${GUARDED_TEST} } });`, 'import { defineConfig } from "vite";') },
    ok: false,
    why: /vitest\/config/,
  },
  { id: "g-u62r5-two-configs", routed: "u62 respin-5 G-two-configs: vitest.config.ts and vite.config.ts in the root", files: { "vite.config.ts": vitestConfig(defaultOptions("")) }, ok: false, why: /2 vitest config files/ },
  { id: "g-u62r5-no-config", routed: "u62 respin-5 G-no-config: no vitest config in the root (vitest would search the parent directories)", files: { "vitest.config.ts": null }, ok: false, why: /no vitest config file/ },
  {
    id: "g-u62r5-cli-config-unguarded",
    routed: "u62 respin-5 G-cli-config: the tier's --config names an unguarded config",
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --config vitest.other.config.ts"), "vitest.other.config.ts": vitestConfig(defaultOptions(""), "", false) },
    ok: false,
    why: /vitest\.other\.config\.ts names no setup file/,
  },
  {
    id: "g-u62r5-cli-config-guarded",
    routed: "u62 respin-5 G-cli-config control: the tier's --config names a guarded config",
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --config vitest.other.config.ts"), "vitest.other.config.ts": vitestConfig(defaultOptions("")), "vitest.config.ts": vitestConfig(defaultOptions(""), "", false) },
    ok: true,
  },
  { id: "g-u62r5-cli-flag", routed: "u62 respin-5 G-cli-flag: a tier flag outside the closed list (--pool)", files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --pool vmThreads") }, ok: false, why: /--pool/ },
  {
    id: "g-u62r5-spread",
    routed: "u62 respin-5 G-spread: a spread in the test options may carry any key",
    files: { "vitest.config.ts": rawConfig(`const BASE = { pool: "vmThreads" };\nexport default defineConfig({ test: { ...BASE, ${GUARDED_TEST} } });`) },
    ok: false,
    why: /spread/,
  },
  {
    id: "g-u62r5-env-node-options",
    routed: "u62 respin-5 G-env: test.env names NODE_OPTIONS, which vitest hands the workers it forks (env = {...process.env, ...config.env}) - a preload before the guard",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('env: { NODE_OPTIONS: "--import ./census-other.setup.ts" }')), ...OTHER_SETUP },
    ok: false,
    why: /test\.env\.NODE_OPTIONS/,
  },
  {
    id: "g-u62r5-env-vitest",
    routed: "u62 respin-5 G-env: test.env names a VITEST_ variable, which steers vitest itself in the workers",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('env: { VITEST_POOL_ID: "9" }')) },
    ok: false,
    why: /test\.env\.VITEST_POOL_ID/,
  },
  { id: "g-u62r5-env-plain", routed: "u62 respin-5 G-env control: test.env names a plain variable (the live tier's own shape)", files: { "vitest.config.ts": vitestConfig(defaultOptions('env: { CENSUS_LIVE_TIER: "1" }')) }, ok: true },
  {
    id: "g-u62r5-global-setup",
    routed: "u62 respin-5 G-global-setup: a globalSetup runs in the main process before the workers spawn and may set NODE_OPTIONS for them",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('globalSetup: ["./census-other.setup.ts"]')), ...OTHER_SETUP },
    ok: false,
    why: /test\.globalSetup/,
  },
  {
    id: "g-u62r5-config-code",
    routed: "u62 respin-5 G-config-code: a config-module statement besides its imports and its default export runs in the main process before the workers spawn",
    files: { "vitest.config.ts": vitestConfig(defaultOptions(""), 'process.env.CENSUS_CONFIG_CODE = "1";') },
    ok: false,
    why: /holds a statement/,
  },
  {
    id: "g-u62r5-config-import",
    routed: "u62 respin-5 G-config-import: a side-effect import runs another module's top-level code in the main process",
    files: { "vitest.config.ts": vitestConfig(defaultOptions(""), 'import "./census-other.setup.ts";'), ...OTHER_SETUP },
    ok: false,
    why: /imports \.\/census-other\.setup\.ts/,
  },
  {
    id: "g-u62r5-type-import",
    routed: "u62 respin-5 G-config-import control: a type-only import is erased and runs nothing",
    files: { "vitest.config.ts": vitestConfig(defaultOptions(""), 'import type { UserConfig } from "vitest/config";') },
    ok: true,
  },
  {
    id: "g-u62r5-value-code",
    routed: "u62 respin-5 G-value-code: an option value the config module evaluates (an immediately invoked function) is code inside the literal",
    files: { "vitest.config.ts": vitestConfig('include: [(() => "test/**/*.test.ts")()], allowOnly: false') },
    ok: false,
    why: /not a plain literal/,
  },
  {
    id: "g-u62r5-server-debug",
    routed: "u62 respin-5 G-server: test.server sets a key outside deps (debug)",
    files: { "vitest.config.ts": vitestConfig(defaultOptions("server: { debug: { dump: true } }")) },
    ok: false,
    why: /test\.server\.debug/,
  },
  {
    id: "g-u62r5-server-deps",
    routed: "u62 respin-5 G-server control: test.server.deps.inline, this repository's own shape",
    files: { "vitest.config.ts": vitestConfig(defaultOptions("server: { deps: { inline: [/@earendil-works\\/pi-/] } }")) },
    ok: true,
  },
  // Rows for vouch branches the respin-5 mutant table found without a row (M24 coverage keys, M25 defineConfig's import),
  // and for the vouch's other refusal branches that no G row reached.
  {
    id: "g-u62r5-server-deps-key",
    routed: "u62 respin-5 G-server-deps: test.server.deps sets a key outside the closed list (vitest 4.1.10's ServerDepsOptions names external, inline and fallbackCJS only)",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('server: { deps: { cacheDir: ".census-deps" } }')) },
    ok: false,
    why: /test\.server\.deps\.cacheDir/,
  },
  {
    id: "g-u62r5-coverage-enabled",
    routed: "u62 respin-5 G-coverage: test.coverage.enabled loads a coverage provider into the run without a --coverage flag",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('coverage: { enabled: true, provider: "istanbul" }')) },
    ok: false,
    why: /test\.coverage\.enabled/,
  },
  {
    id: "g-u62r5-coverage-provider",
    routed: "u62 respin-5 G-coverage: test.coverage.customProviderModule names a module of code for the run to load",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('coverage: { provider: "custom", customProviderModule: "./census-other.setup.ts" }')), ...OTHER_SETUP },
    ok: false,
    why: /test\.coverage\.customProviderModule/,
  },
  {
    id: "g-u62r5-coverage-options",
    routed: "u62 respin-5 G-coverage control: coverage options that load nothing unless coverage is enabled (this repository's own shape)",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('coverage: { provider: "istanbul", reporter: ["text", "html"], include: ["src/**/*.ts"] }')) },
    ok: true,
  },
  {
    id: "g-u62r5-define-unbound",
    routed: "u62 respin-5 G-define: the default export calls a defineConfig no import binds",
    files: { "vitest.config.ts": rawConfig(`export default defineConfig({ test: { ${GUARDED_TEST} } });`, "") },
    ok: false,
    why: /default-exports a call that is not defineConfig\(<object literal>\) imported from vitest\/config/,
  },
  {
    id: "g-u62r5-define-alias",
    routed: "u62 respin-5 G-define control: defineConfig imported from vitest/config under a local alias",
    files: { "vitest.config.ts": rawConfig(`export default dc({ test: { ${GUARDED_TEST} } });`, 'import { defineConfig as dc } from "vitest/config";') },
    ok: true,
  },
  {
    id: "g-u62r5-no-default",
    routed: "u62 respin-5 G-no-default: the config module has no default export, so the vouch reads no options vitest receives",
    files: { "vitest.config.ts": rawConfig(`export const config = defineConfig({ test: { ${GUARDED_TEST} } });`) },
    ok: false,
    why: /has no single default export/,
  },
  {
    id: "g-u62r5-no-test",
    routed: "u62 respin-5 G-no-test: the config sets no test options, so it names no setup file",
    files: { "vitest.config.ts": rawConfig('export default defineConfig({ cacheDir: ".census-cache" });') },
    ok: false,
    why: /sets no test options/,
  },
  {
    id: "g-u62r5-sequence-key",
    routed: "u62 respin-5 G-sequence: test.sequence.sequencer names a sequencer, which is code",
    files: { "vitest.config.ts": vitestConfig(defaultOptions('sequence: { sequencer: "./census-other.setup.ts" }')), ...OTHER_SETUP },
    ok: false,
    why: /test\.sequence\.sequencer/,
  },
  {
    id: "g-u62r5-setup-literal",
    routed: "u62 respin-5 G-setup-literal: test.setupFiles is an expression, not a literal string or string array",
    files: { "vitest.config.ts": vitestConfig(defaultOptions(`setupFiles: ["./${GUARD_FILE}"].concat([])`)) },
    ok: false,
    why: /sets test\.setupFiles to something other than a literal string or string array/,
  },
  {
    id: "g-u62r5-cli-dash",
    routed: 'u62 respin-5 G-cli-dash: the tier passes "--", after which vitest reads the words as it chooses',
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run -- test/cfg-target.test.ts") },
    ok: false,
    why: /passes "--"/,
  },
  {
    id: "g-u62r5-cli-value",
    routed: "u62 respin-5 G-cli-value: the tier's --config carries no value, so the vouch cannot tell which config vitest loads",
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --config") },
    ok: false,
    why: /carries --config without a value/,
  },
  {
    id: "g-u62r5-cli-config-missing",
    routed: "u62 respin-5 G-cli-config-missing: the tier's --config names a file that does not exist",
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --config vitest.none.config.ts") },
    ok: false,
    why: /the --config file vitest\.none\.config\.ts does not exist/,
  },
  // u62 respin-6 (owner R470 R1 = (a) with the closed-record cap): the vouch's read set widens to the tier step's own npm
  // and forge configuration, each read CLOSED - V1 forge-step, V2 npm-script (lifecycle), V3 npm-project-config.
  { id: "g-u62r6-npmrc-node-options", routed: "u62 respin-6 V3 node-options: the project .npmrc sets node-options, which npm exports as NODE_OPTIONS to the script it runs", files: { ".npmrc": "node-options=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc sets node-options \(line 1\)/ },
  { id: "g-u62r6-npmrc-script-shell", routed: "u62 respin-6 V3 script-shell: the project .npmrc names the program npm runs the tier's script through", files: { ".npmrc": "script-shell=/bin/sh\n" }, ok: false, why: /\.npmrc sets script-shell \(line 1\)/ },
  { id: "g-u62r6-npmrc-layer", routed: "u62 respin-6 V3 layer: the project .npmrc moves another npm config layer (userconfig), past an admitted key", files: { ".npmrc": "fund=false\nuserconfig=./census-user.npmrc\n" }, ok: false, why: /\.npmrc sets userconfig \(line 2\)/ },
  { id: "g-u62r6-npmrc-unlisted", routed: "u62 respin-6 V3 unlisted: a key outside the closed list (ignore-scripts) is refused, not judged harmless", files: { ".npmrc": "ignore-scripts=true\n" }, ok: false, why: /\.npmrc sets ignore-scripts \(line 1\), outside the closed list/ },
  { id: "g-u62r6-npmrc-env-key", routed: "u62 respin-6 V3 env-key: npm substitutes environment variables in .npmrc keys, so a substituted key names what the environment chooses", files: { ".npmrc": `\${CENSUS_NPMRC_KEY}=--import=./census-pre.mjs\n` }, ok: false, why: /\.npmrc line 1 sets "\$\{CENSUS_NPMRC_KEY\}", not a plain key/ },
  { id: "g-u62r6-npmrc-quoted-key", routed: "u62 respin-6 V3 quoted-key: ini unquotes a quoted key, so the vouch refuses any key that is not plain", files: { ".npmrc": '"node-options"=--import=./census-pre.mjs\n' }, ok: false, why: /\.npmrc line 1 sets "\\"node-options\\"", not a plain key/ },
  { id: "g-u62r6-npmrc-escaped-key", routed: "u62 respin-6 V3 escaped-key: ini unescapes a backslash in a key", files: { ".npmrc": "node\\-options=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc line 1 sets "node\\\\-options", not a plain key/ },
  { id: "g-u62r6-npmrc-array-key", routed: "u62 respin-6 V3 array-key: a key[] line is an ini array entry of that key", files: { ".npmrc": "node-options[]=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc line 1 sets "node-options\[\]", not a plain key/ },
  { id: "g-u62r6-npmrc-section", routed: "u62 respin-6 V3 section: a [section] header line, which the closed read does not admit", files: { ".npmrc": "[census]\nnode-options=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc line 1 is a section header/ },
  { id: "g-u62r6-npmrc-cr-separator", routed: "u62 respin-6 V3 cr-separator: ini splits lines on CR as well as LF, so a CR-separated key is its own line", files: { ".npmrc": "fund=false\rnode-options=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc sets node-options \(line 2\)/ },
  { id: "g-u62r6-npmrc-unreadable", routed: "u62 respin-6 V3 unreadable: a project .npmrc the vouch cannot read (here a directory) is refused, never read as absent", files: { ".npmrc/keep": "" }, ok: false, why: /\.npmrc is unreadable/ },
  {
    id: "g-u62r6-npmrc-admitted",
    routed: "u62 respin-6 V3 control: comments, blank lines and every key of the closed list (a scoped registry included) stay vouched",
    files: { ".npmrc": "; inert npm settings\n# only\n\nregistry=https://registry.example.invalid/\n@census:registry=https://registry.example.invalid/\nfund=false\naudit = false\nupdate-notifier=false\nloglevel=warn\nengine-strict=true\nsave-exact=true\npackage-lock=false\n" },
    ok: true,
  },
  { id: "g-u62r6-npmrc-no-hop", routed: "u62 respin-6 V3 no-hop control: a tier that runs vitest directly never loads npm's config, so the .npmrc is not read", files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run"), ".npmrc": "node-options=--import=./census-pre.mjs\n" }, ok: true },
  { id: "g-u62r6-npmrc-npx-hop", routed: "u62 respin-6 V3 npx-hop: npx loads npm's config too", files: { "forge.toml": forgeToml("npx vitest run"), ".npmrc": "node-options=--import=./census-pre.mjs\n" }, ok: false, why: /\.npmrc sets node-options/ },
  { id: "g-u62r6-lifecycle-pretest", routed: "u62 respin-6 V2 pretest: npm runs scripts.pretest before the hop's script, and its body is no literal of the closed list", files: { "package.json": packageJson("vitest run", { pretest: "node -e 0" }) }, ok: false, why: /package\.json scripts\.pretest = "node -e 0" runs around the tier's npm hop/ },
  { id: "g-u62r6-lifecycle-posttest", routed: "u62 respin-6 V2 posttest: npm runs scripts.posttest after the hop's script", files: { "package.json": packageJson("vitest run", { posttest: "true" }) }, ok: false, why: /package\.json scripts\.posttest = "true" runs around the tier's npm hop/ },
  {
    id: "g-u62r6-lifecycle-non-string",
    routed: "u62 respin-6 V2 non-string: a pretest that is not a string is refused (the scripts reader drops it, npm does not)",
    files: { "package.json": `${JSON.stringify({ name: "census-synthetic", private: true, scripts: { lint: "true", test: "vitest run", pretest: 1 } }, null, 2)}\n` },
    ok: false,
    why: /package\.json scripts\.pretest is not a string/,
  },
  { id: "g-u62r6-lifecycle-npm-test", routed: "u62 respin-6 V2 npm-test: the npm test spelling runs the same pretest", files: { "forge.toml": forgeToml("npm test"), "package.json": packageJson("vitest run", { pretest: "node -e 0" }) }, ok: false, why: /scripts\.pretest/ },
  { id: "g-u62r6-lifecycle-other-scripts", routed: "u62 respin-6 V2 control: lifecycle scripts around OTHER scripts (prelint, postbuild, pretestx) do not run around the hop", files: { "package.json": packageJson("vitest run", { prelint: "node -e 0", postbuild: "node -e 0", pretestx: "node -e 0" }) }, ok: true },
  { id: "g-u62r6-lifecycle-no-hop", routed: "u62 respin-6 V2 no-hop control: a tier that runs vitest directly runs no npm lifecycle", files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run"), "package.json": packageJson("vitest run", { pretest: "node -e 0" }) }, ok: true },
  {
    id: "g-u62r6-workspace-parent",
    routed: "u62 respin-6 V3 workspace: an enclosing package.json that declares workspaces may make npm load ITS .npmrc as the hop's project config",
    files: {},
    parent: { "package.json": `${JSON.stringify({ name: "census-workspace-root", private: true, workspaces: ["child"] }, null, 2)}\n` },
    ok: false,
    why: /\.\.\/package\.json declares workspaces/,
  },
  { id: "g-u62r6-workspace-parent-plain", routed: "u62 respin-6 V3 workspace control: an enclosing package.json without workspaces is read and admitted", files: {}, parent: { "package.json": `${JSON.stringify({ name: "census-enclosing", private: true }, null, 2)}\n` }, ok: true },
  { id: "g-u62r6-workspace-parent-unparseable", routed: "u62 respin-6 V3 workspace control: npm skips an enclosing package.json it cannot parse, and so does the vouch", files: {}, parent: { "package.json": "{ not json\n" }, ok: true },
  {
    id: "g-u62r6-forge-default-configuration",
    routed: "u62 respin-6 V1 default-configuration: [build] default_configuration selects a configuration whose env rides every step",
    files: { "forge.toml": '[package]\nname = "census-synthetic"\n\n[build]\ngate = ["lint", "test"]\ndefault_configuration = "ci"\n\n[build.commands]\nlint = "npm run lint"\ntest = "npm run test"\n' },
    ok: false,
    why: /forge\.toml \[build\] sets default_configuration, outside the closed list/,
  },
  { id: "g-u62r6-forge-configurations", routed: "u62 respin-6 V1 configurations: a [build.configurations.<name>] table", files: { "forge.toml": forgeToml("npm run test", undefined, '\n[build.configurations.ci]\nenv = { CENSUS = "1" }\n') }, ok: false, why: /forge\.toml declares \[build\.configurations\.ci\], a table outside the closed forge-step read/ },
  {
    id: "g-u62r6-forge-dotted-configuration",
    routed: "u62 respin-6 V1 dotted: a dotted key inside [build] declares the same configuration table",
    files: { "forge.toml": '[package]\nname = "census-synthetic"\n\n[build]\ngate = ["lint", "test"]\nconfigurations.ci.env = { CENSUS = "1" }\n\n[build.commands]\nlint = "npm run lint"\ntest = "npm run test"\n' },
    ok: false,
    why: /forge\.toml declares \[build\.configurations\.ci\]/,
  },
  { id: "g-u62r6-forge-hooks", routed: "u62 respin-6 V1 hooks: [build.hooks] runs code around a step", files: { "forge.toml": forgeToml("npm run test", undefined, '\n[build.hooks]\npre_test = "node -e 0"\n') }, ok: false, why: /forge\.toml declares \[build\.hooks\]/ },
  { id: "g-u62r6-forge-gate-steps", routed: "u62 respin-6 V1 gate-steps: [[build.gate.steps]] spells the gate's steps a second way", files: { "forge.toml": forgeToml("npm run test", undefined, '\n[[build.gate.steps]]\nname = "test"\n') }, ok: false, why: /forge\.toml declares \[\[build\.gate\.steps\]\], an array table outside the closed forge-step read/ },
  {
    id: "g-u62r6-forge-build-key",
    routed: "u62 respin-6 V1 build-key: any [build] key outside backend, gate, timeout, workers (here preset)",
    files: { "forge.toml": '[package]\nname = "census-synthetic"\n\n[build]\ngate = ["lint", "test"]\npreset = "node"\n\n[build.commands]\nlint = "npm run lint"\ntest = "npm run test"\n' },
    ok: false,
    why: /forge\.toml \[build\] sets preset/,
  },
  {
    id: "g-u62r6-forge-tier-key",
    routed: "u62 respin-6 V1 tier-key: the tier's own [build.commands.<tier>] table sets a key outside the closed step-key list",
    files: { "forge.toml": '[package]\nname = "census-synthetic"\n\n[build]\ngate = ["lint", "test"]\n\n[build.commands]\nlint = "npm run lint"\n\n[build.commands.test]\ncommand = "npm run test"\ntimeout = 60\nprelude = "node -e 0"\n' },
    ok: false,
    why: /forge\.toml \[build\.commands\.test\] sets prelude, outside the closed list of step keys/,
  },
  {
    id: "g-u62r6-forge-tier-keys-admitted",
    routed: "u62 respin-6 V1 control: the tier's own table with command, timeout and hint only",
    files: { "forge.toml": '[package]\nname = "census-synthetic"\n\n[build]\nbackend = "typescript"\ngate = ["lint", "test"]\ntimeout = 600\n\n[build.commands]\nlint = "npm run lint"\n\n[build.commands.test]\ncommand = "npm run test"\ntimeout = 60\nhint = "the unit tier"\n' },
    ok: true,
  },
  { id: "g-u62r6-forge-toolchain", routed: "u62 respin-6 V1 toolchain: a [toolchain] table", files: { "forge.toml": forgeToml("npm run test", undefined, '\n[toolchain]\nmanager = "mise"\n') }, ok: false, why: /forge\.toml declares \[toolchain\]/ },
  { id: "g-u62r6-forge-package-table", routed: "u62 respin-6 V1 package-table: a [package.<name>] table", files: { "forge.toml": forgeToml("npm run test", undefined, '\n[package.metadata]\nowner = "census"\n') }, ok: false, why: /forge\.toml declares \[package\.metadata\]/ },
  { id: "g-u62r6-forge-root-key", routed: "u62 respin-6 V1 root-key: a key outside every table", files: { "forge.toml": `schema = 1\n\n${forgeToml("npm run test")}` }, ok: false, why: /forge\.toml sets schema outside every table/ },
  {
    id: "g-u62r6-forge-other-step",
    routed: "u62 respin-6 V1 control: another step's own table is not the tier's step, so its keys are not read",
    files: { "forge.toml": forgeToml("npm run test", undefined, '\n[build.commands.other]\ncommand = "node -e 0"\nprelude = "node -e 0"\n') },
    ok: true,
  },
  // wb-nl8 (owner R470 sequencing: nl8 widens the vouch for its own flags): the report-emitting script admitted whole, and the
  // widened reporter / expect.requireAssertions / lifecycle reads, each refusal beside the admission it bounds.
  { id: "g-nl8-reporter-builtin", routed: "nl8 vouch widening: the default tier's report-emitting script (builtin reporters by name, bare --outputFile, --includeTaskLocation, --expect.requireAssertions) is admitted whole", files: { "package.json": packageJson(NL8_TEST_SCRIPT) }, ok: true },
  { id: "g-nl8-reporter-spaced", routed: "nl8 vouch widening control: a builtin reporter named as the flag's separate next word is read as its value", files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --reporter json --outputFile report.json") }, ok: true },
  {
    id: "g-nl8-reporter-file",
    routed: "nl8 vouch widening: a path reporter is code loaded before the test modules (the file exists; the refusal is by the closed list, never by absence)",
    files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --reporter=./census-other.setup.ts"), ...OTHER_SETUP },
    ok: false,
    why: /--reporter=\.\/census-other\.setup\.ts, a reporter outside the closed list of vitest's builtin reporters/,
  },
  { id: "g-nl8-reporter-package", routed: "nl8 vouch widening: a package reporter is code loaded before the test modules", files: { "forge.toml": forgeToml("./node_modules/.bin/vitest run --reporter=vitest-sonar-reporter") }, ok: false, why: /--reporter=vitest-sonar-reporter, a reporter outside the closed list of vitest's builtin reporters/ },
  { id: "g-nl8-require-assertions", routed: "nl8 vouch widening: --expect.requireAssertions alone (it loads no code; it tightens the runner's third leg)", files: { "package.json": packageJson("vitest run --expect.requireAssertions") }, ok: true },
  { id: "g-nl8-include-task-location", routed: "nl8 vouch control: --includeTaskLocation alone, the flag report mode needs for located cases", files: { "package.json": packageJson("vitest run --includeTaskLocation") }, ok: true },
  { id: "g-nl8-output-bare", routed: "nl8 vouch control: the bare --outputFile=<path> form beside a builtin reporter", files: { "package.json": packageJson("vitest run --reporter=json --outputFile=.forge/vitest-report.json") }, ok: true },
  { id: "g-nl8-output-dotted", routed: "nl8 vouch: the dotted --outputFile.json=<path> form stays outside the closed list (nl8 emits through the bare form)", files: { "package.json": packageJson("vitest run --reporter=json --outputFile.json=.forge/vitest-report.json") }, ok: false, why: /--outputFile\.json=\.forge\/vitest-report\.json, a flag outside the closed list/ },
  { id: "g-nl8-lifecycle-pretest-literal", routed: "nl8 lifecycle: the test step's pretest rotation hook is the one admitted literal of CENSUS_LIFECYCLE_SCRIPTS", files: { "package.json": packageJson("vitest run", { pretest: NL8_PRETEST }) }, ok: true },
  {
    id: "g-nl8-lifecycle-pretest-near-miss",
    routed: "nl8 lifecycle: a near-miss of the rotation hook (the same command with its option object spaced) is not the literal and is refused, naming it",
    files: { "package.json": packageJson("vitest run", { pretest: NL8_PRETEST.replace("{force:true}", "{ force: true }") }) },
    ok: false,
    why: /scripts\.pretest = .*\{ force: true \}.* is not a literal of the closed list CENSUS_LIFECYCLE_SCRIPTS/,
  },
];

/** u62 respin-6: a guard row's project root (child/ under its parent's files, when it has one). */
const guardRootOf = (row: GuardRow): string => (row.parent === undefined ? join(synthBase, "guard", row.id) : join(synthBase, "guard", row.id, "child"));

function buildGuardRoot(row: GuardRow): string {
  const root = guardRootOf(row);
  if (row.parent !== undefined) writeFiles(dirname(root), row.parent);
  return writeTree(root, Object.fromEntries(Object.entries({ ...projectFiles("vitest run", {}), ...row.files }).filter((entry): entry is [string, string] => entry[1] !== null)));
}

/** The helper module itself: real-path rows run census files that import it by absolute path, as an adopting census does. */
const HELPER_MODULE = join(ROOT, "test", "helpers", "census.ts");

/**
 * U4 GM21 real-path recursion: a census file inside the NON-narrowable tier run it judges ("vitest run test" carries a
 * positional filter, so the helper runs the whole command). A depth counter in the project bounds the row even if the
 * guard under test failed (no fork bomb): at depth 2 the census refuses and fails.
 */
const RECURSION_PINNED = "test/recursion-pinned.test.ts";
const RECURSION_CENSUS = "test/recursion-census.test.ts";
const RECURSION_TITLE = "a judging census inside the tier run it judges";
const RECURSION_LOG = ".census-recursion.log";
const RECURSION_PIN: CasePin = { file: RECURSION_PINNED, title: PIN, tier: DEFAULT_GATE_TIER };
const recursionCensus = (): string =>
  [
    'import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";',
    'import { dirname, join } from "node:path";',
    'import { fileURLToPath } from "node:url";',
    'import { expect, it } from "vitest";',
    `import { judgePins } from ${JSON.stringify(HELPER_MODULE)};`,
    'const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");',
    'const DEPTH = join(ROOT, ".census-depth");',
    `const LOG = join(ROOT, ${JSON.stringify(RECURSION_LOG)});`,
    `it(${JSON.stringify(RECURSION_TITLE)}, async () => {`,
    '  const depth = existsSync(DEPTH) ? Number(readFileSync(DEPTH, "utf8")) : 0;',
    "  if (depth >= 2) {",
    `    appendFileSync(LOG, \`\${depth}:depth-exceeded\\n\`);`,
    '    throw new Error("the recursion guard did not hold");',
    "  }",
    "  writeFileSync(DEPTH, String(depth + 1));",
    "  try {",
    `    const verdicts = await judgePins(ROOT, [${JSON.stringify(RECURSION_PIN)}], { timeoutMs: 120_000 });`,
    `    appendFileSync(LOG, \`\${depth}:\${verdicts.map(verdict => verdict.code).join(",")}\\n\`);`,
    "    expect(verdicts).toHaveLength(1);",
    "  } finally {",
    "    writeFileSync(DEPTH, String(depth));",
    "  }",
    "}, 180_000);",
    "",
  ].join("\n");
const buildRecursionRoot = (root: string): string => writeTree(root, projectFiles("vitest run test", { [RECURSION_PINNED]: testFile({ body: PLAIN }), [RECURSION_CENSUS]: recursionCensus() }));

/**
 * u62 respin-4 T1 (standing rule 11, no scratch): the gate batteries' shape - plain node loading the helper by path, no
 * vitest around it - judges one pin in executing mode with every allocating fs call of the judging process recorded
 * (the live node:fs bindings the helper imports, re-synced after the wrap). The helper composes no scratch because it
 * allocates none - the report travels on the run's stdout - so the record stays empty.
 */
const PLAIN_NODE_PINNED = "test/plain-node-pinned.test.ts";
const PLAIN_NODE_SCRIPT = "plain-node-judge.mjs";
const plainNodeJudge = (): string =>
  [
    'import fs from "node:fs";',
    'import { syncBuiltinESMExports } from "node:module";',
    `import { judgePins } from ${JSON.stringify(pathToFileURL(HELPER_MODULE).href)};`,
    "const writes = [];",
    'for (const name of ["mkdtempSync", "mkdirSync", "writeFileSync"]) {',
    "  const original = fs[name];",
    "  fs[name] = (...args) => {",
    `    writes.push(\`\${name} \${String(args[0])}\`);`,
    "    return original(...args);",
    "  };",
    "}",
    "syncBuiltinESMExports();",
    `const verdicts = await judgePins(process.argv[2], [${JSON.stringify({ file: PLAIN_NODE_PINNED, title: PIN, tier: DEFAULT_GATE_TIER })}], { timeoutMs: 120_000 });`,
    "process.stdout.write(JSON.stringify({ codes: verdicts.map(verdict => verdict.code), writes }));",
    "",
  ].join("\n");

/**
 * u62 respin-4 T5 (standing rule 11 transport): the census reporter reads its frame from --outputFile.census only.
 * Two plain vitest runs of one project, no census around them: selected with that key the reporter writes its ONE
 * report line (the control); selected without it - configured any other way - it writes nothing to the run's stdout.
 */
const REPORTER_PINNED = "test/reporter-pinned.test.ts";
const REPORTER_MODULE = join(ROOT, "test", "helpers", "census-reporter.ts");
const VITEST_CLI = join(ROOT, "node_modules", "vitest", "vitest.mjs");
const REPORTER_FRAME = "census-report:t5-control:";

/** U1 E2E: the gate's one-run adoption shape - an adopting census asserting ok for three judge-detecting pins. */
const E2E_PINNED = "test/e2e-pinned.test.ts";
const E2E_CENSUS = "test/e2e-census.test.ts";
const E2E_CENSUS_TITLE = "adopting census: the three pins are collected once, pass under test, and assert";
const E2E_CODES = ".census-e2e.json";
const E2E_TITLES = ["pin A: runs only when the census judges it", "pin B: skips under the gate's documented worker cap", "pin C: skips through the runner's public getCurrentTest unless judged"];
const e2ePinned = (): string =>
  [
    'import { describe, expect, it } from "vitest";',
    'import { getCurrentTest } from "vitest/suite";',
    'describe("pinned suite", () => {',
    `  it.runIf(process.env.CENSUS_HELPER_NESTED === "1")(${JSON.stringify(E2E_TITLES[0])}, () => {`,
    "    expect(1).toBe(1);",
    "  });",
    `  it.skipIf(process.env.VITEST_MAX_WORKERS !== undefined)(${JSON.stringify(E2E_TITLES[1])}, () => {`,
    "    expect(1).toBe(1);",
    "  });",
    `  it(${JSON.stringify(E2E_TITLES[2])}, () => {`,
    '    if (process.env.CENSUS_HELPER_NESTED !== "1") getCurrentTest()?.context.skip();',
    "    expect(1).toBe(1);",
    "  });",
    "});",
    "",
  ].join("\n");
const e2eCensus = (): string =>
  [
    'import { writeFileSync } from "node:fs";',
    'import { dirname, join } from "node:path";',
    'import { fileURLToPath } from "node:url";',
    'import { expect, it } from "vitest";',
    `import { judgePins } from ${JSON.stringify(HELPER_MODULE)};`,
    'const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");',
    `it(${JSON.stringify(E2E_CENSUS_TITLE)}, async () => {`,
    `  const verdicts = await judgePins(ROOT, ${JSON.stringify(E2E_TITLES)}.map(title => ({ file: ${JSON.stringify(E2E_PINNED)}, title, tier: "test" })), { timeoutMs: 120_000 });`,
    `  writeFileSync(join(ROOT, ${JSON.stringify(E2E_CODES)}), JSON.stringify(verdicts.map(verdict => verdict.code)));`,
    '  expect(verdicts.map(verdict => verdict.code)).toEqual(["ok", "ok", "ok"]);',
    "}, 180_000);",
    "",
  ].join("\n");

/** The fabricated-green class report mode guards: a census inside the run it judges can only read that run's PREVIOUS report. */
const INRUN_PINNED = "test/inrun-pinned.test.ts";
const INRUN_CENSUS = "test/inrun-census.test.ts";
const INRUN_LOG = ".census-inrun.log";
const inRunCensus = (): string =>
  [
    'import { appendFileSync } from "node:fs";',
    'import { dirname, join } from "node:path";',
    'import { fileURLToPath } from "node:url";',
    'import { expect, it } from "vitest";',
    `import { DEFAULT_TIER_REPORT, judge } from ${JSON.stringify(HELPER_MODULE)};`,
    'const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");',
    'it("a census judging the report of the run it sits in", () => {',
    `  const verdicts = judge(join(ROOT, DEFAULT_TIER_REPORT), [{ file: ${JSON.stringify(INRUN_PINNED)}, title: ${JSON.stringify(PIN)}, tier: "test" }]);`,
    `  appendFileSync(join(ROOT, ${JSON.stringify(INRUN_LOG)}), \`\${JSON.stringify(verdicts.map(verdict => ({ code: verdict.code, why: verdict.why })))}\\n\`);`,
    "  expect(verdicts).toHaveLength(1);",
    "});",
    "",
  ].join("\n");

/**
 * F2 cap fidelity (6hb.11 gate input, part ii; 49 and 68 child processes measured under a VITEST_MAX_WORKERS=2 gate):
 * three pinned files that each hold their worker for 400 ms and log their run interval, so overlap is concurrency.
 */
const CAP_FILES = ["test/cap-a.test.ts", "test/cap-b.test.ts", "test/cap-c.test.ts"];
const CAP_LOG = ".census-cap.log";
const capFile = (): string =>
  [
    'import { appendFileSync } from "node:fs";',
    'import { describe, expect, it } from "vitest";',
    'describe("census suite", () => {',
    `  it(${JSON.stringify(PIN)}, async () => {`,
    "    const start = Date.now();",
    "    await new Promise(resolve => setTimeout(resolve, 400));",
    `    appendFileSync(new URL(${JSON.stringify(`../${CAP_LOG}`)}, import.meta.url), \`\${start} \${Date.now()}\\n\`);`,
    "    expect(1).toBe(1);",
    "  });",
    "});",
    "",
  ].join("\n");

/** A report written WITHOUT task locations (the AST legs need the runner-located call site). */
const NOLOC_FILE = "test/noloc.test.ts";

/** Names a vitest worker carries that the gate's own run never inherits (measured on 4.1.10). */
const WORKER_ONLY = new Set(["TEST", "BASE_URL", "MODE", "DEV", "PROD", "SSR", "FORCE_TTY"]);

/** The runner processes started here never inherit the parent worker's markers or any census name; they carry the gate env. */
function runnerEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || key.startsWith("CENSUS_") || WORKER_ONLY.has(key) || (key.startsWith("VITEST") && key !== "VITEST_MAX_WORKERS")) continue;
    env[key] = value;
  }
  return { ...env, VITEST_MAX_WORKERS: process.env.VITEST_MAX_WORKERS ?? GATE_CAP, NO_COLOR: "1", FORCE_COLOR: "0", VITE_CONFIG_NATIVE_IGNORE_WARNING: "true" };
}

interface ReportCase {
  readonly title: string;
  readonly status: string;
}
type Report = ReadonlyMap<string, readonly ReportCase[]>;
interface JsonReport {
  readonly testResults?: readonly { readonly name: string; readonly assertionResults?: readonly ReportCase[] }[];
}

function shell(command: string, cwd: string): Promise<{ readonly code: number | null; readonly stderr: string }> {
  return new Promise(settle => {
    const child = spawn("sh", ["-c", command], { cwd, env: runnerEnv(), stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
      if (stderr.length < 20_000) stderr += chunk.toString("utf8");
    });
    child.on("close", code => settle({ code, stderr }));
  });
}

/** Plain node on a script, outside vitest's worker environment (runnerEnv): what it printed and how it exited. */
function nodeRun(script: string, args: readonly string[], cwd: string): Promise<{ readonly code: number | null; readonly stdout: string; readonly stderr: string }> {
  return new Promise(settle => {
    const child = spawn(process.execPath, [script, ...args], { cwd, env: runnerEnv(), stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk: Buffer) => {
      if (stderr.length < 20_000) stderr += chunk.toString("utf8");
    });
    child.on("close", code => settle({ code, stdout, stderr }));
  });
}

/** A runner run: what it did per file, and its report file, which is gate-shaped (vitest's JSON reporter) and report mode reads. */
interface RunnerRun {
  readonly report: Report;
  readonly path: string;
}

let reportSeq = 0;
/** Runs a tier command line exactly as a shell would, with vitest's JSON reporter appended (task locations unless asked not to), and reads what the runner did. */
async function runnerReport(root: string, command: string, options: { readonly out?: string; readonly locations?: boolean } = {}): Promise<RunnerRun> {
  reportSeq += 1;
  const out = options.out ?? join(root, `.runner-report-${reportSeq}.json`);
  const reporter = `--reporter=json --outputFile=${out}${options.locations === false ? "" : " --includeTaskLocation"} --maxWorkers=2`;
  const full = command.includes(" -- ") ? `${command} ${reporter}` : command.startsWith("npm ") ? `${command} -- ${reporter}` : `${command} ${reporter}`;
  const result = await shell(full, root);
  let text: string;
  try {
    text = readFileSync(out, "utf8");
  } catch {
    throw new Error(`no JSON report from "${full}" (exit ${String(result.code)}): ${result.stderr.slice(-2000)}`);
  }
  const parsed = JSON.parse(text) as JsonReport;
  const report = new Map<string, readonly ReportCase[]>();
  const realRoot = realpathSync(root);
  for (const file of parsed.testResults ?? []) {
    const relativeName = file.name.startsWith(`${realRoot}/`) ? file.name.slice(realRoot.length + 1) : file.name;
    report.set(relativeName, (file.assertionResults ?? []).map(entry => ({ title: entry.title, status: entry.status })));
  }
  return { report, path: out };
}

function titleMatcher(title: string, each: boolean): (candidate: string) => boolean {
  if (!each) return candidate => candidate === title;
  const pattern = new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%[sdifjo#]/g, ".+")}$`);
  return candidate => pattern.test(candidate);
}

/** Runner truth for a row: the mode must be REAL before the helper's verdict about it means anything. */
function expectRunner(report: Report, file: string, matches: (title: string) => boolean, oracle: Oracle, strictReport: Report): void {
  const cases = (report.get(file) ?? []).filter(entry => matches(entry.title));
  const passed = cases.filter(entry => entry.status === "passed").length;
  switch (oracle.kind) {
    case "passed":
      expect(passed, `the runner runs and passes ${file}`).toBe(oracle.cases ?? 1);
      break;
    case "not-passed":
      expect(passed, `in this mode the runner must not run-and-pass the pinned case of ${file}`).toBe(0);
      break;
    case "inverted":
      expect(passed, `the runner reports the inverted case of ${file} passed although its assertion is false`).toBe(1);
      break;
    case "planted-false":
      expect(passed, `the case of ${file} passes although its only expectation is on a false value`).toBe(1);
      break;
    case "vacuous": {
      expect(passed, `the vacuous case of ${file} passes on the default gate`).toBe(1);
      const strict = (strictReport.get(file) ?? []).filter(entry => matches(entry.title)).map(entry => entry.status);
      expect(strict, `expect.hasAssertions() proves the case of ${file} reaches no assertion`).toEqual(["failed"]);
      break;
    }
  }
}

function expectVerdict(verdict: PinVerdict | undefined, want: Expected, label: string): void {
  expect(verdict, `${label}: the helper returned no verdict`).toBeDefined();
  expect({ ok: verdict?.ok, code: verdict?.code, leg: verdict?.leg }, `${label}: ${verdict?.why ?? ""}`).toEqual({ ok: want.ok, code: want.code, leg: want.leg });
  if (want.why !== undefined) expect(verdict?.why, `${label}: the red must name its own cause`).toMatch(want.why);
}

async function pool(tasks: readonly (() => Promise<void>)[], width: number): Promise<void> {
  let next = 0;
  const lane = async (): Promise<void> => {
    while (next < tasks.length) {
      const task = tasks[next];
      next += 1;
      if (task !== undefined) await task();
    }
  };
  await Promise.all(Array.from({ length: width }, lane));
}

const hasToken = (text: string, token: string): boolean => new RegExp(`(^|[^A-Za-z0-9-])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^A-Za-z0-9])`).test(text);
const statusIn = (report: Report | undefined, file: string, title: string): string[] => (report?.get(file) ?? []).filter(entry => entry.title === title).map(entry => entry.status);
const readLines = (path: string): string[] => (existsSync(path) ? readFileSync(path, "utf8").split("\n").filter(line => line !== "") : []);

/** The tracked scratch directory (makeScratch's own spelling, removed with removeScratch) and its real path. */
let synthScratch = "";
let synthBase = "";
const mainVerdicts = new Map<string, PinVerdict>();
const configVerdicts = new Map<string, PinVerdict>();
const configReports = new Map<string, Report>();
/** u62 respin-6: each config row's project root (base/child for a row with a parent). */
const configRoots = new Map<string, string>();
let mainDefault: Report = new Map();
let mainLive: Report = new Map();
let mainAsserts: Report = new Map();
let mainRootPath = "";
let fixtureLoads: readonly string[] = [];
let previousCap: string | undefined;
/** Report mode: every row judged over the oracle's own report of the run that row proves real. */
let mainDefaultPath = "";
let mainLivePath = "";
const configReportPaths = new Map<string, string>();
const reportVerdicts = new Map<string, PinVerdict>();
const configReportVerdicts = new Map<string, PinVerdict>();
const reportOnly = new Map<string, PinVerdict>();
let smokeReport: RunnerRun | undefined;
let noLocation: RunnerRun | undefined;
let noLocationRaw = "";
let staleTargetMtimeMs = 0;
let staleReportMtimeMs = 0;
let inRunFirst: RunnerRun | undefined;
let inRunLog: readonly (readonly { readonly code: string; readonly why: string }[])[] = [];
/** Real-path rows. */
let recursionVerdict: PinVerdict | undefined;
let recursionLog: readonly string[] = [];
let recursionWallMs = 0;
let recursionOracle: RunnerRun | undefined;
let recursionOracleLog: readonly string[] = [];
let e2eRun: RunnerRun | undefined;
let e2eCodes: readonly string[] = [];
let e2eReportVerdicts: readonly PinVerdict[] = [];
let capVerdicts: readonly PinVerdict[] = [];
let capIntervals: readonly (readonly number[])[] = [];
let plainNode: { readonly code: number | null; readonly stdout: string; readonly stderr: string } | undefined;
let reporterSelected: { readonly code: number | null; readonly stdout: string; readonly stderr: string } | undefined;
let reporterUnselected: { readonly code: number | null; readonly stdout: string; readonly stderr: string } | undefined;

const SMOKE_PIN: CasePin = { file: SMOKE_FILE, title: SMOKE_TITLE, tier: DEFAULT_GATE_TIER };

beforeAll(async () => {
  // The documented gate env: the operator's worker cap is set for every helper run and runner run here (J4's runner truth).
  previousCap = process.env.VITEST_MAX_WORKERS;
  if (previousCap === undefined) process.env.VITEST_MAX_WORKERS = GATE_CAP;
  synthScratch = makeScratch("census-helper.");
  synthBase = realpathSync(synthScratch);
  const mainRoot = buildMainRoot(join(synthBase, "main"));
  mainRootPath = mainRoot;
  const recursionJudgeRoot = buildRecursionRoot(join(synthBase, "recursion-judge"));
  const recursionOracleRoot = buildRecursionRoot(join(synthBase, "recursion-oracle"));
  const e2eRoot = writeTree(join(synthBase, "e2e"), projectFiles("vitest run", { [E2E_PINNED]: e2ePinned(), [E2E_CENSUS]: e2eCensus() }));
  const inRunRoot = writeTree(join(synthBase, "inrun"), projectFiles("vitest run", { [INRUN_PINNED]: testFile({ body: PLAIN }), [INRUN_CENSUS]: inRunCensus() }));
  const noLocRoot = writeTree(join(synthBase, "noloc"), projectFiles("vitest run", { [NOLOC_FILE]: testFile({ body: PLAIN }) }));
  const capRoot = writeTree(join(synthBase, "cap"), projectFiles("vitest run", Object.fromEntries(CAP_FILES.map(file => [file, capFile()]))));
  const plainNodeRoot = writeTree(join(synthBase, "plain-node"), projectFiles("vitest run", { [PLAIN_NODE_PINNED]: testFile({ body: PLAIN }) }));
  writeFileSync(join(synthBase, PLAIN_NODE_SCRIPT), plainNodeJudge());
  const reporterRoot = writeTree(join(synthBase, "reporter"), projectFiles("vitest run", { [REPORTER_PINNED]: testFile({ body: PLAIN }) }));
  for (const row of GUARD_ROWS) buildGuardRoot(row);
  const tasks: (() => Promise<void>)[] = [
    async () => {
      const verdicts = await judgePins(mainRoot, MAIN_PINS.map(entry => entry.pin));
      MAIN_PINS.forEach((entry, index) => {
        const verdict = verdicts[index];
        if (verdict !== undefined) mainVerdicts.set(entry.id, verdict);
      });
    },
    async () => {
      const run = await runnerReport(mainRoot, "npm run test");
      mainDefault = run.report;
      mainDefaultPath = run.path;
      fixtureLoads = readFileSync(join(mainRoot, FIXTURE_LOADS), "utf8").split("\n").filter(entry => entry !== "");
    },
    async () => {
      const run = await runnerReport(mainRoot, "./node_modules/.bin/vitest run --config vitest.live.config.ts");
      mainLive = run.report;
      mainLivePath = run.path;
    },
    async () => {
      mainAsserts = (await runnerReport(mainRoot, "./node_modules/.bin/vitest run --config vitest.asserts.config.ts")).report;
    },
    async () => {
      // FIND-1 for report mode: vitest's own JSON report of this repository's REAL config, narrowed to the anchor file.
      smokeReport = await runnerReport(ROOT, `./node_modules/.bin/vitest run ${SMOKE_FILE}`, { out: join(synthBase, "smoke-report.json") });
    },
    async () => {
      const started = Date.now();
      [recursionVerdict] = await judgePins(recursionJudgeRoot, [RECURSION_PIN]);
      recursionWallMs = Date.now() - started;
      recursionLog = readLines(join(recursionJudgeRoot, RECURSION_LOG));
    },
    async () => {
      recursionOracle = await runnerReport(recursionOracleRoot, "npm run test");
      recursionOracleLog = readLines(join(recursionOracleRoot, RECURSION_LOG));
    },
    async () => {
      e2eRun = await runnerReport(e2eRoot, "npm run test", { out: join(e2eRoot, DEFAULT_TIER_REPORT) });
      const codes = join(e2eRoot, E2E_CODES);
      e2eCodes = existsSync(codes) ? (JSON.parse(readFileSync(codes, "utf8")) as string[]) : [];
    },
    async () => {
      // two runs of the same gate: the census inside the second can only read the first run's report
      inRunFirst = await runnerReport(inRunRoot, "npm run test", { out: join(inRunRoot, DEFAULT_TIER_REPORT) });
      await runnerReport(inRunRoot, "npm run test", { out: join(inRunRoot, DEFAULT_TIER_REPORT) });
      inRunLog = readLines(join(inRunRoot, INRUN_LOG)).map(line => JSON.parse(line) as { readonly code: string; readonly why: string }[]);
    },
    async () => {
      noLocation = await runnerReport(noLocRoot, "npm run test", { locations: false });
      noLocationRaw = readFileSync(noLocation.path, "utf8");
    },
    async () => {
      // F2: the gate's documented cap is 1 for this one judgment; judgePins reads it synchronously when it spawns the run.
      const saved = process.env.VITEST_MAX_WORKERS;
      process.env.VITEST_MAX_WORKERS = "1";
      const pending = judgePins(capRoot, CAP_FILES.map(file => ({ file, title: PIN, tier: DEFAULT_GATE_TIER })));
      if (saved === undefined) delete process.env.VITEST_MAX_WORKERS;
      else process.env.VITEST_MAX_WORKERS = saved;
      capVerdicts = await pending;
      capIntervals = readLines(join(capRoot, CAP_LOG)).map(line => line.split(" ").map(Number));
    },
    async () => {
      plainNode = await nodeRun(join(synthBase, PLAIN_NODE_SCRIPT), [plainNodeRoot], synthBase);
    },
    async () => {
      reporterSelected = await nodeRun(VITEST_CLI, ["run", `--reporter=${REPORTER_MODULE}`, `--outputFile.census=${REPORTER_FRAME}`], reporterRoot);
      reporterUnselected = await nodeRun(VITEST_CLI, ["run", `--reporter=${REPORTER_MODULE}`], reporterRoot);
    },
  ];
  for (const row of CONFIG_ROWS) {
    const root = buildConfigRoot(join(synthBase, row.id), row);
    configRoots.set(row.id, root);
    const execute = async (): Promise<void> => {
      const [verdict] = await judgePins(root, [{ file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER }]);
      if (verdict !== undefined) configVerdicts.set(row.id, verdict);
    };
    const oracle = async (): Promise<void> => {
      const run = await runnerReport(root, row.forgeCommand ?? "npm run test");
      configReports.set(row.id, run.report);
      configReportPaths.set(row.id, run.path);
    };
    if (row.serial === true) {
      tasks.push(async () => {
        if (row.oracle !== "none") await oracle();
        await execute();
      });
      continue;
    }
    tasks.push(execute);
    if (row.oracle !== "none") tasks.push(oracle);
  }
  await pool(tasks, 4);

  // REPORT MODE: nothing below executes a test run; every verdict is read from a report the runner already wrote.
  const mainJudged = judge(mainDefaultPath, MAIN_ROWS.map(pinOf), { root: mainRoot });
  MAIN_ROWS.forEach((row, index) => {
    const verdict = mainJudged[index];
    if (verdict !== undefined) reportVerdicts.set(row.id, verdict);
  });
  for (const row of TIER_ROWS) {
    const [verdict] = row.pin.tier === "live" ? judge(mainLivePath, [row.pin], { root: mainRoot, tier: "live", defaultReport: mainDefaultPath }) : judge(mainDefaultPath, [row.pin], { root: mainRoot });
    if (verdict !== undefined) reportVerdicts.set(row.id, verdict);
  }
  for (const row of CONFIG_ROWS) {
    const path = configReportPaths.get(row.id);
    if (path === undefined) continue;
    const [verdict] = judge(path, [{ file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER }], { root: configRoots.get(row.id) ?? join(synthBase, row.id) });
    if (verdict !== undefined) configReportVerdicts.set(row.id, verdict);
  }
  const control: CasePin = { file: fileOf("r-control"), title: PIN, tier: DEFAULT_GATE_TIER };
  const only = (id: string, verdicts: readonly PinVerdict[]): void => {
    const [verdict] = verdicts;
    if (verdict !== undefined) reportOnly.set(id, verdict);
  };
  const forge = join(mainRoot, ".forge");
  mkdirSync(forge, { recursive: true });
  only("p-missing", judge(join(forge, "absent.json"), [control], { root: mainRoot }));
  writeFileSync(join(forge, "malformed.json"), "{ not json");
  only("p-malformed", judge(join(forge, "malformed.json"), [control], { root: mainRoot }));
  writeFileSync(join(forge, "shape.json"), JSON.stringify({ testResults: "none" }));
  only("p-shape", judge(join(forge, "shape.json"), [control], { root: mainRoot }));
  writeFileSync(join(forge, "shape-counts.json"), JSON.stringify({ testResults: [] }));
  only("p-shape-counts", judge(join(forge, "shape-counts.json"), [control], { root: mainRoot }));
  copyFileSync(mainDefaultPath, join(synthBase, "loose-report.json"));
  only("p-root-required", judge(join(synthBase, "loose-report.json"), [control]));
  copyFileSync(mainDefaultPath, join(mainRoot, DEFAULT_TIER_REPORT));
  only("p-canonical-root", judge(join(mainRoot, DEFAULT_TIER_REPORT), [control]));
  only("p-tier-live-in-default", judge(mainDefaultPath, [{ file: LIVE_ONLY, title: PIN, tier: "live" }], { root: mainRoot }));
  only("p-tier-default-in-live", judge(mainLivePath, [{ file: LIVE_ONLY, title: PIN, tier: DEFAULT_GATE_TIER }], { root: mainRoot, tier: "live", defaultReport: mainDefaultPath }));
  only("p-exclusivity-unreadable", judge(mainLivePath, [{ file: LIVE_ONLY, title: PIN, tier: "live" }], { root: mainRoot, tier: "live", defaultReport: join(forge, "absent.json") }));
  if (noLocation !== undefined) only("p-no-location", judge(noLocation.path, [{ file: NOLOC_FILE, title: PIN, tier: DEFAULT_GATE_TIER }], { root: noLocRoot }));
  if (smokeReport !== undefined) only("p-smoke", judge(smokeReport.path, [SMOKE_PIN], { root: ROOT }));
  if (e2eRun !== undefined) e2eReportVerdicts = judge(e2eRun.path, E2E_TITLES.map(title => ({ file: E2E_PINNED, title, tier: DEFAULT_GATE_TIER })), { root: e2eRoot });
  // the stale class last: move the target's mtime past the report's, then judge it
  staleReportMtimeMs = statSync(mainDefaultPath).mtimeMs;
  const staleAt = (staleReportMtimeMs + 60_000) / 1000;
  utimesSync(join(mainRoot, STALE_TARGET), staleAt, staleAt);
  staleTargetMtimeMs = statSync(join(mainRoot, STALE_TARGET)).mtimeMs;
  only("p-stale", judge(mainDefaultPath, [{ file: STALE_TARGET, title: PIN, tier: DEFAULT_GATE_TIER }], { root: mainRoot }));
  // u62 respin-5: the files the census guard's vouch reads join the stale-report check (SourceCache.note), one at a time
  // on the control project's own report, after its report verdict was taken.
  const vouchRoot = join(synthBase, "c-control");
  const vouchReport = configReportPaths.get("c-control");
  if (vouchReport !== undefined) {
    const later = (statSync(vouchReport).mtimeMs + 60_000) / 1000;
    const vouchPin: CasePin = { file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER };
    const guardFile = join(vouchRoot, GUARD_FILE);
    const guardBefore = statSync(guardFile);
    utimesSync(guardFile, later, later);
    only("p-u62r5-stale-guard", judge(vouchReport, [vouchPin], { root: vouchRoot }));
    utimesSync(guardFile, guardBefore.atime, guardBefore.mtime);
    utimesSync(join(vouchRoot, "vitest.config.ts"), later, later);
    only("p-u62r5-stale-config", judge(vouchReport, [vouchPin], { root: vouchRoot }));
  }
  // u62 respin-6: the vouch's new reads (the project .npmrc, forge.toml, package.json) join the stale-report check too, one
  // at a time on the admitted-.npmrc control's own report after its report verdict was taken, each restored after.
  const npmrcRoot = configRoots.get("c-u62r6-npmrc-admitted");
  const npmrcReport = configReportPaths.get("c-u62r6-npmrc-admitted");
  if (npmrcRoot !== undefined && npmrcReport !== undefined) {
    const later = (statSync(npmrcReport).mtimeMs + 60_000) / 1000;
    const npmrcPin: CasePin = { file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER };
    for (const [id, file] of [
      ["p-u62r6-stale-npmrc", ".npmrc"],
      ["p-u62r6-stale-forge", "forge.toml"],
      ["p-u62r6-stale-package", "package.json"],
    ] as const) {
      const path = join(npmrcRoot, file);
      const before = statSync(path);
      utimesSync(path, later, later);
      only(id, judge(npmrcReport, [npmrcPin], { root: npmrcRoot }));
      utimesSync(path, before.atime, before.mtime);
    }
  }
}, SUITE_TIMEOUT);

afterAll(() => {
  if (previousCap === undefined) delete process.env.VITEST_MAX_WORKERS;
  removeScratch(synthScratch);
});

/** A row that needs its own report (absent, malformed, stale, unlocated, in-run), a tier refusal, or a real path. */
interface StandaloneRow {
  readonly id: string;
  readonly routed: string;
  readonly check: () => void;
}

const reportRow = (id: string, want: Expected) => (): void => expectVerdict(reportOnly.get(id), want, id);

/** Report mode's own rows: the nl8 interface, the report's fail-closed reading, the stale-report class, and R2=(i). */
const REPORT_ROWS: readonly StandaloneRow[] = [
  { id: "p-default-path", routed: "u62 nl8 interface: the helper names .forge/vitest-report.json as the default tier's report", check: () => expect(DEFAULT_TIER_REPORT).toBe(".forge/vitest-report.json") },
  { id: "p-canonical-root", routed: "u62 report mode: a report at <root>/.forge/vitest-report.json needs no root option", check: reportRow("p-canonical-root", { ...OK, why: /collected once, passed in the test report, asserts/ }) },
  { id: "p-missing", routed: "u62 report-mode fail-closed: no report at the path", check: reportRow("p-missing", red("report-unreadable", "runs-where", /is unreadable/)) },
  { id: "p-malformed", routed: "u62 report-mode fail-closed: a report that is not JSON", check: reportRow("p-malformed", red("report-unreadable", "runs-where", /is not JSON/)) },
  { id: "p-shape", routed: "u62 report-mode fail-closed: a report without vitest's JSON reporter shape", check: reportRow("p-shape", red("report-unreadable", "runs-where", /does not have vitest's JSON reporter shape/)) },
  {
    id: "p-shape-counts",
    routed: "u62 report-mode fail-closed: a well-formed testResults list without the reporter's run counts is not vitest's report",
    check: reportRow("p-shape-counts", red("report-unreadable", "runs-where", /does not have vitest's JSON reporter shape/)),
  },
  { id: "p-root-required", routed: "u62 report-mode fail-closed: a report outside a .forge directory with no root named", check: reportRow("p-root-required", red("report-unreadable", "runs-where", /outside a \.forge directory/)) },
  {
    id: "p-no-location",
    routed: "u62 report-mode fail-closed: a report written without task locations (the AST legs need the runner-located call)",
    check: () => {
      expect(statusIn(noLocation?.report, NOLOC_FILE, PIN), "the runner ran and passed the case").toEqual(["passed"]);
      expect(noLocationRaw.includes('"location"'), "the runner wrote no task location without includeTaskLocation").toBe(false);
      expectVerdict(reportOnly.get("p-no-location"), red("report-unlocated", "exists", /includeTaskLocation/), "p-no-location");
    },
  },
  {
    id: "p-stale",
    routed: "u62 stale-report guard: the pinned file changed after the report was written",
    check: () => {
      expect(statusIn(mainDefault, STALE_TARGET, PIN), "the report records the case passed").toEqual(["passed"]);
      expect(staleTargetMtimeMs, "the pinned file is newer than the report").toBeGreaterThan(staleReportMtimeMs);
      expectVerdict(reportOnly.get("p-stale"), red("report-stale", "runs-where", /changed after the report was written/), "p-stale");
    },
  },
  {
    id: "p-u62r5-stale-guard",
    routed: "u62 respin-5 stale-report guard: the census guard file changed after the report was written - the vouch's reads join the staleness check",
    check: reportRow("p-u62r5-stale-guard", red("report-stale", "runs-where", /census-guard\.ts changed after the report was written/)),
  },
  {
    id: "p-u62r5-stale-config",
    routed: "u62 respin-5 stale-report guard: the vitest config the vouch read changed after the report was written",
    check: reportRow("p-u62r5-stale-config", red("report-stale", "runs-where", /vitest\.config\.ts changed after the report was written/)),
  },
  {
    id: "p-u62r6-stale-npmrc",
    routed: "u62 respin-6 stale-report guard: the project .npmrc the vouch read (V3) changed after the report was written",
    check: reportRow("p-u62r6-stale-npmrc", red("report-stale", "runs-where", /\.npmrc changed after the report was written/)),
  },
  {
    id: "p-u62r6-stale-forge",
    routed: "u62 respin-6 stale-report guard: the forge.toml the vouch read closed (V1) changed after the report was written",
    check: reportRow("p-u62r6-stale-forge", red("report-stale", "runs-where", /forge\.toml changed after the report was written/)),
  },
  {
    id: "p-u62r6-stale-package",
    routed: "u62 respin-6 stale-report guard: the package.json whose scripts the vouch read (V2) changed after the report was written",
    check: reportRow("p-u62r6-stale-package", red("report-stale", "runs-where", /package\.json changed after the report was written/)),
  },
  {
    id: "p-in-run",
    routed: "u62 fabricated-green guard: a census inside the run it judges can only read that run's previous report",
    check: () => {
      expect(statusIn(inRunFirst?.report, INRUN_PINNED, PIN), "the first run passes the pinned case").toEqual(["passed"]);
      expect(inRunFirst?.report.has(INRUN_CENSUS), "the first run's report records the judging census itself").toBe(true);
      expect(inRunLog.map(entry => entry[0]?.code)).toEqual(["report-unreadable", "report-stale"]);
      expect(inRunLog[1]?.[0]?.why).toMatch(/records the judging file test\/inrun-census\.test\.ts itself/);
    },
  },
  { id: "p-tier-live-in-default", routed: "u62 R2=(i): a live-tier pin is never judged over the default tier's report", check: reportRow("p-tier-live-in-default", red("tier-mismatch", "runs-where", /a live pin is judged only over its own tier's report/)) },
  { id: "p-tier-default-in-live", routed: "u62 R2=(i): a default-tier pin is never judged over a live tier's report", check: reportRow("p-tier-default-in-live", red("tier-mismatch", "runs-where", /a test pin is judged only over its own tier's report/)) },
  {
    id: "p-exclusivity-unreadable",
    routed: "u62 report-mode fail-closed: a live pin's exclusivity against the default gate needs the default tier's report",
    check: reportRow("p-exclusivity-unreadable", red("run-error", "runs-where", /exclusivity against the default gate is unverifiable/)),
  },
  {
    id: "p-smoke",
    routed: "u62 FIND-1 report-mode smoke: vitest's own JSON report of this repository's real config, judged without execution",
    check: () => {
      expect(statusIn(smokeReport?.report, SMOKE_FILE, SMOKE_TITLE), "the runner ran and passed the anchor").toEqual(["passed"]);
      expectVerdict(reportOnly.get("p-smoke"), { ...OK, why: /collected once, passed in the test report, asserts/ }, "p-smoke");
    },
  },
];

/** Rows that run a census file inside a real tier run: the recursion guard (U4 GM21) and the gate's one-run adoption shape (U1 E2E). */
const REAL_PATH_ROWS: readonly StandaloneRow[] = [
  {
    id: "x-u62-f2-cap-fidelity",
    routed: "u62 F2 cap fidelity (6hb.11 gate input, part ii): under the gate's documented cap of 1 the helper's tier run holds one worker",
    check: () => {
      expect(capVerdicts.map(verdict => verdict.code)).toEqual(["ok", "ok", "ok"]);
      expect(capIntervals, "each pinned file ran once").toHaveLength(3);
      const ordered = [...capIntervals].sort((left, right) => (left[0] ?? 0) - (right[0] ?? 0));
      for (let index = 1; index < ordered.length; index += 1) {
        expect(ordered[index]?.[0] ?? 0, "the helper's tier run ran its files one at a time").toBeGreaterThanOrEqual(ordered[index - 1]?.[1] ?? 0);
      }
    },
  },
  {
    id: "x-u62-gm21-recursion",
    routed: "u62 GM21 recursion guard: a judging census inside a non-narrowable tier run gets nested-run reds and starts nothing (no environment marker)",
    check: () => {
      expect(statusIn(recursionOracle?.report, RECURSION_PINNED, PIN), "the tier's own run passes the pin").toEqual(["passed"]);
      expect(statusIn(recursionOracle?.report, RECURSION_CENSUS, RECURSION_TITLE), "the tier's own run passes the census case").toEqual(["passed"]);
      // the oracle's top-level census started ONE tier run, and the census inside that run refused to start another
      expect(recursionOracleLog).toEqual(["1:nested-run", "0:ok"]);
      // judged from here: the census inside the helper's run judges nothing, the pin is green, the wall is bounded
      expect(recursionLog).toEqual(["0:nested-run"]);
      expectVerdict(recursionVerdict, OK, "x-u62-gm21-recursion");
      expect(recursionWallMs).toBeLessThan(150_000);
    },
  },
  {
    id: "x-u62r4-plain-node-no-scratch",
    routed:
      "u62 respin-4 T1 standing rule 11: plain node loads the helper by path (the gate batteries' shape) and judges a pin in executing mode with no allocating fs call - no mkdtemp, mkdir or file write - in the judging process",
    check: () => {
      expect(plainNode?.code, plainNode?.stderr.slice(-2000)).toBe(0);
      expect(JSON.parse(plainNode?.stdout ?? "{}") as unknown).toEqual({ codes: ["ok"], writes: [] });
    },
  },
  {
    id: "x-u62r4-reporter-unselected",
    routed:
      "u62 respin-4 T5 standing rule 11 transport: the census reporter reads its frame from --outputFile.census only - selected with it, it writes its one report line (the control); selected without it, it writes nothing to the run's stdout",
    check: () => {
      expect(reporterSelected?.code, reporterSelected?.stderr.slice(-2000)).toBe(0);
      const framed = (reporterSelected?.stdout ?? "").split("\n").filter(line => line.startsWith(REPORTER_FRAME));
      expect(framed, "the control: with its frame the reporter writes its one report line").toHaveLength(1);
      expect(JSON.parse((framed[0] ?? "").slice(REPORTER_FRAME.length)) as unknown).toMatchObject({ complete: true });
      expect(reporterUnselected?.code, reporterUnselected?.stderr.slice(-2000)).toBe(0);
      const reported = (reporterUnselected?.stdout ?? "").split("\n").filter(line => line.includes('"complete":true'));
      expect(reported, "without its frame the reporter writes no report line").toEqual([]);
    },
  },
  {
    id: "x-u62-e2e-adoption",
    routed: "u62 E2E the one-run adoption shape: an adopting census asserting ok for J1/J4/J5 pins fails in the run that skips them",
    check: () => {
      for (const title of E2E_TITLES) expect(statusIn(e2eRun?.report, E2E_PINNED, title), title).toEqual(["skipped"]);
      expect(statusIn(e2eRun?.report, E2E_CENSUS, E2E_CENSUS_TITLE), "the adopting census can no longer pass").toEqual(["failed"]);
      expect(e2eCodes).toEqual(["skipped", "skipped", "context-unknown"]);
      expect(e2eReportVerdicts.map(verdict => verdict.code)).toEqual(["skipped", "skipped", "context-unknown"]);
    },
  },
];

function rowSuite(title: string, rows: readonly Row[]): void {
  describe(title, () => {
    for (const row of rows) {
      it(`${row.routed} [${row.id}]`, () => {
        const pin = pinOf(row);
        expectRunner(mainDefault, pin.file, titleMatcher(pin.title, pin.each !== undefined), row.oracle, mainAsserts);
        expectVerdict(mainVerdicts.get(row.id), row.verdict, row.id);
        expectVerdict(reportVerdicts.get(row.id), row.report ?? row.verdict, `${row.id} in report mode`);
      });
    }
  });
}

rowSuite("census helper: registration modes die on the reported tasks of the tier's real run", REGISTRATION);
rowSuite("census helper: it.each / it.for liveness is the runner's case count at the template call site, once per row", EACH);
rowSuite("census helper: runtime skips die on the run's result, named by the AST scan of the runner-located case", BODY_ROWS);
rowSuite("census helper: the third leg - at least one reached vitest assertion with a matcher", ASSERT_ROWS);
rowSuite("census helper: attribution - hazards scope to the pin's own call chain, never file-wide", ATTRIBUTION_ROWS);
rowSuite("census helper: judge detection - the helper sees exactly what the gate's own run sees (U1 J1-J5, U2 A1a/A1b)", JUDGE_ROWS);
rowSuite("census helper: inversion and options under report mode (the JSON report records fails as passed)", INVERSION_ROWS);
rowSuite("census helper: the resolvable-construct roster - every value flow resolves through a roster row or fails closed (u62 gate-2r3, respin-4)", ROSTER_ROWS);
rowSuite("census helper: the inherited-option class and exported options under the census guard (u62 respin-5, gate-3r4 O1-O6 / P1-P9, F1 / F2 / E1)", INHERITED_ROWS);

describe("census helper: tier truth through the tier's real entrypoint (forge.toml -> npm script -> vitest config)", () => {
  for (const row of TIER_ROWS) {
    it(`${row.routed} [${row.id}]`, () => {
      expectRunner(row.oracle.config === "live" ? mainLive : mainDefault, row.file, title => title === PIN, { kind: row.oracle.kind }, new Map());
      expectVerdict(mainVerdicts.get(row.id), row.verdict, row.id);
      expectVerdict(reportVerdicts.get(row.id), row.report ?? row.verdict, `${row.id} in report mode`);
    });
  }
  for (const row of CONFIG_ROWS) {
    it(`${row.routed} [${row.id}]`, () => {
      if (row.oracle !== "none") expectRunner(configReports.get(row.id) ?? new Map(), CFG_TARGET, title => title === PIN, { kind: row.oracle }, new Map());
      expectVerdict(configVerdicts.get(row.id), row.verdict, row.id);
      if (row.oracle !== "none") expectVerdict(configReportVerdicts.get(row.id), row.report ?? row.verdict, `${row.id} in report mode`);
    });
  }
});

describe("census helper: report mode - judge(reportPath, pins) over the tier's own JSON report, never re-executed", () => {
  for (const row of REPORT_ROWS) it(`${row.routed} [${row.id}]`, row.check);
});

describe("census helper: real-path rows - census files inside real tier runs", () => {
  for (const row of REAL_PATH_ROWS) it(`${row.routed} [${row.id}]`, row.check);
});

describe("census helper: docs sections are read from the rendered view", () => {
  for (const row of DOCS_ROWS) {
    it(`${row.routed} [${row.id}]`, () => {
      row.rendered(marked.parse(row.markdown, { async: false }));
      row.check(pinned(row.markdown));
    });
  }
});

describe("census helper: source structure from the AST (imports and top-level declarations)", () => {
  for (const row of STRUCTURE_ROWS) {
    it(`${row.routed} [${row.id}]`, () => {
      expect(fixtureLoads.includes(row.id), `the runner ${row.loaded ? "loads" : "never loads"} the fixture of ${row.id}`).toBe(row.loaded);
      expect(mainDefault.get(fileOf(row.id))?.filter(entry => entry.title === PIN && entry.status === "passed").length, "the case itself passes either way (the X16 survival)").toBe(1);
      const structure = sourceStructure(mainRootPath, fileOf(row.id));
      expect(structure.ok, structure.why).toBe(true);
      row.check(structure, fixtureOf(row.id));
    });
  }

  it("fail-closed: an unparseable file yields no structure", () => {
    const structure = sourceStructure(mainRootPath, BROKEN_STRUCTURE);
    expect(structure.ok).toBe(false);
    expect(structure.why).toMatch(/does not parse/);
  });
});

describe("census helper: read-only pins of this repository's tier commands, and the FIND-1 smoke", () => {
  it("the default gate resolves forge.toml test -> npm run test -> vitest run with the report flags", () => {
    expect(resolveTier(ROOT, DEFAULT_GATE_TIER)).toEqual({
      ok: true,
      tier: "test",
      command: "npm run test",
      argv: ["run", "--reporter=default", "--reporter=json", "--outputFile=.forge/vitest-report.json", "--includeTaskLocation", "--expect.requireAssertions"],
      chain: [
        'forge.toml [build.commands] test = "npm run test"',
        'package.json scripts.test = "vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions"',
      ],
      why: "",
    });
  });

  it("the live tier native-read resolves to vitest run --config vitest.native.config.ts", () => {
    expect(resolveTier(ROOT, "native-read")).toEqual({
      ok: true,
      tier: "native-read",
      command: "./node_modules/.bin/vitest run --config vitest.native.config.ts",
      argv: ["run", "--config", "vitest.native.config.ts"],
      chain: ['forge.toml [build.commands.native-read] command = "./node_modules/.bin/vitest run --config vitest.native.config.ts"'],
      why: "",
    });
  });

  it("furnace-observe resolves to vitest run --config vitest.furnace.config.ts", () => {
    expect(resolveTier(ROOT, "furnace-observe")).toMatchObject({ ok: true, argv: ["run", "--config", "vitest.furnace.config.ts"] });
  });
});

describe("census helper: liveness of this falsifier table (h8f.9 O1 class)", () => {
  const tables = [REGISTRATION, EACH, BODY_ROWS, ASSERT_ROWS, ATTRIBUTION_ROWS, TIER_ROWS, CONFIG_ROWS, DOCS_ROWS, STRUCTURE_ROWS, JUDGE_ROWS, INVERSION_ROWS, REPORT_ROWS, REAL_PATH_ROWS, ROSTER_ROWS, INHERITED_ROWS, GUARD_ROWS];
  const routed = tables.flatMap(rows => rows.map(row => row.routed));
  const segments = routed.flatMap(text => text.split(" / "));
  for (const [gate, modes] of Object.entries(ROUTED_MODES)) {
    it(`every routed wb-${gate} mode keeps a falsifier row`, () => {
      expect(modes.filter(mode => !segments.some(segment => segment.includes(gate) && hasToken(segment, mode)))).toEqual([]);
    });
  }

  it("row ids are unique and every table keeps its exact size", () => {
    const ids = tables.flatMap(rows => rows.map(row => row.id));
    expect(new Set(ids).size).toBe(ids.length);
    expect(tables.map(rows => rows.length)).toEqual(TABLE_SIZES);
  });
});

describe("census helper: the census guard is vouched statically on the tier's own run, never executed (u62 respin-5 G rows)", () => {
  for (const row of GUARD_ROWS) {
    it(`${row.routed} [${row.id}]`, () => {
      const state = censusGuard(guardRootOf(row), DEFAULT_GATE_TIER);
      expect(state.ok, state.why).toBe(row.ok);
      if (row.why !== undefined) expect(state.why).toMatch(row.why);
      if (row.ok) expect(state.why).toBe("");
    });
  }
});

describe("census helper: the closed record of the vouch (u62 respin-6, owner R470 R1 = (a) with the closed-record cap)", () => {
  const HEADER = (() => {
    const text = readFileSync(HELPER_MODULE, "utf8");
    const end = text.search(/^import /m);
    return end === -1 ? text : text.slice(0, end);
  })();

  it("the vouch's read set is enumerated by name, each entry naming what it reads and what it refuses", () => {
    expect(VOUCH_READ_SET.map(entry => entry.id)).toEqual(["forge-step", "npm-script", "npm-project-config", "vitest-argv", "vitest-config", "guard-bytes"]);
    for (const entry of VOUCH_READ_SET) {
      expect(entry.reads.length, entry.id).toBeGreaterThan(0);
      expect(entry.refuses.length, entry.id).toBeGreaterThan(0);
    }
  });

  it("every route outside the read set is a named residual of report mode, each with the one N-shape that measures it", () => {
    expect(VOUCH_RESIDUALS.map(entry => entry.id)).toEqual(["operator-environment", "operator-npm-config", "installed-code", "run-judgment-drift"]);
    for (const entry of VOUCH_RESIDUALS) {
      expect(entry.route.length, entry.id).toBeGreaterThan(0);
      expect(entry.shape.length, entry.id).toBeGreaterThan(0);
    }
  });

  it("the helper header names every read-set entry and every residual, each residual as MEASURED, and the forged mark", () => {
    for (const entry of VOUCH_READ_SET) expect(HEADER, entry.id).toContain(entry.id);
    for (const entry of VOUCH_RESIDUALS) expect(HEADER, entry.id).toContain(`MEASURED RESIDUAL ${entry.id}`);
    expect(HEADER).toContain('Symbol.for("wb-u62.census-guard")');
    expect(HEADER).not.toMatch(/RESIDUAL \(UNMEASURED\)/);
  });

  it("the lifecycle scripts the vouch admits are a closed list of exact literals (membership is wb-nl8's), each admitted as written", () => {
    expect(CENSUS_LIFECYCLE_SCRIPTS.every(body => typeof body === "string" && body !== "")).toBe(true);
    CENSUS_LIFECYCLE_SCRIPTS.forEach((body, index) => {
      const root = writeTree(join(synthBase, `lifecycle-member-${index}`), projectFiles("vitest run", { "package.json": packageJson("vitest run", { pretest: body, posttest: body }) }));
      const state = censusGuard(root, DEFAULT_GATE_TIER);
      expect(state.ok, state.why).toBe(true);
    });
  });

  it("this repository's vouch reads forge.toml, package.json, any project .npmrc or enclosing package.json, the config and the guard - nothing else", () => {
    const state = censusGuard(ROOT, DEFAULT_GATE_TIER);
    expect(state.ok, state.why).toBe(true);
    expect(state.read.slice(0, 2)).toEqual([join(ROOT, "forge.toml"), join(ROOT, "package.json")]);
    expect(state.read.slice(-2)).toEqual([join(ROOT, "vitest.config.ts"), join(ROOT, "test", "helpers", GUARD_FILE)]);
    for (const file of state.read.slice(2, -2)) expect(file === join(ROOT, ".npmrc") || (file.endsWith("/package.json") && ROOT.startsWith(dirname(file))), file).toBe(true);
  });
});

describe("census helper: the census guard of this repository (u62 respin-5)", () => {
  it("the default tier vouches it: vitest.config.ts names test/helpers/census-guard.ts as its first setup file", () => {
    const state = censusGuard(ROOT, DEFAULT_GATE_TIER);
    expect(state, state.why).toMatchObject({ ok: true, config: join(ROOT, "vitest.config.ts"), guard: join(ROOT, "test", "helpers", GUARD_FILE), why: "" });
  });

  it("CENSUS_GUARD_SHA256 is the guard file's own sha256, so the census vouches exactly these bytes", () => {
    expect(createHash("sha256").update(readFileSync(join(ROOT, "test", "helpers", GUARD_FILE))).digest("hex")).toBe(CENSUS_GUARD_SHA256);
  });

  it("a non-default tier whose config names no guard is refused, naming its config (cost ii)", () => {
    const state = censusGuard(ROOT, "native-read");
    expect(state.ok).toBe(false);
    expect(state.why).toMatch(/vitest\.native\.config\.ts names no setup file/);
  });

  it("the guard holds in this very run: fails and fixtures on Object.prototype are its non-configurable marked accessors", () => {
    const prototypeOfObjects: object = Object.getPrototypeOf({});
    for (const key of ["fails", "fixtures"]) {
      const descriptor = Object.getOwnPropertyDescriptor(prototypeOfObjects, key);
      expect(descriptor?.configurable, key).toBe(false);
      expect(descriptor?.enumerable, key).toBe(false);
      const getter = descriptor?.get;
      expect(getter === undefined ? undefined : Object.getOwnPropertyDescriptor(getter, Symbol.for("wb-u62.census-guard"))?.value, key).toBe(true);
    }
  });

  it("a prototype write of fails or fixtures is refused, by definition and by assignment, and an absent one reads undefined", () => {
    const prototypeOfObjects: Record<string, unknown> = Object.getPrototypeOf({});
    // Without the guard each write would land on this worker's Object.prototype: a configurable one is removed again, so a
    // run without the guard reds these rows without inheriting fails or fixtures into the rest of the file.
    const refusal = (key: string, write: () => void): string => {
      try {
        write();
        return "accepted";
      } catch (error) {
        return error instanceof Error ? error.message : String(error);
      } finally {
        if (Object.getOwnPropertyDescriptor(prototypeOfObjects, key)?.configurable === true) delete prototypeOfObjects[key];
      }
    };
    expect(refusal("fails", () => Object.defineProperty(prototypeOfObjects, "fails", { value: true, configurable: true }))).toMatch(/Cannot redefine property: fails/);
    expect(refusal("fixtures", () => Object.defineProperty(prototypeOfObjects, "fixtures", { value: {}, configurable: true }))).toMatch(/Cannot redefine property: fixtures/);
    expect(
      refusal("fails", () => {
        prototypeOfObjects.fails = true;
      }),
    ).toMatch(/census guard: Object\.prototype\.fails is refused/);
    expect(
      refusal("fixtures", () => {
        prototypeOfObjects.fixtures = {};
      }),
    ).toMatch(/census guard: Object\.prototype\.fixtures is refused/);
    const plain: { fails?: unknown; fixtures?: unknown } = {};
    expect([plain.fails, plain.fixtures]).toEqual([undefined, undefined]);
  });

  it("an own fails or fixtures keeps its meaning: an assignment defines an own enumerable data property", () => {
    const options: { fails?: boolean; fixtures?: number } = {};
    options.fails = true;
    options.fixtures = 2;
    expect(Object.getOwnPropertyDescriptor(options, "fails")).toEqual({ value: true, writable: true, enumerable: true, configurable: true });
    expect(Object.getOwnPropertyDescriptor(options, "fixtures")).toEqual({ value: 2, writable: true, enumerable: true, configurable: true });
    expect({ ...options }).toEqual({ fails: true, fixtures: 2 });
  });
});

/**
 * The roster is the acceptance surface (owner criterion 2026-10-17, binding from respin-4): every row of the helper's
 * RESOLVABLE-CONSTRUCT ROSTER names its JUSTIFICATION here - the falsifier rows whose shape would fabricate green through
 * that row, or around its guard, and goes red instead - and every ok verdict this suite judges resolved its value flows
 * through roster rows only (PinVerdict.through), each roster row resolving at least one of them (no dead row).
 */
const ROSTER_JUSTIFICATION: Readonly<Record<RosterId, readonly string[]>> = {
  "registration.import": ["r-u62r3-a1-api-member-overwrite", "r-u62r3-a11-runner-handle"],
  "registration.namespace": ["r-u62g2r3-r2-import-meta-vitest", "r-u62r4-s13-import-meta-alias"],
  "registration.global": ["r-n13-iife-shadow", "r-6hb7-m9-local-shadow"],
  "registration.relative-export": ["r-u62r4-s14-relative-reexport-api", "r-u62r4-s7-relative-reexport"],
  "registration.alias": ["r-u62g2r3-h4-let-held", "r-u62g2-u1-destructured"],
  "registration.member": ["r-u62g3-6-callee-unknown-member", "r-u62g2r3-h5-call-method", "r-u62g2r3-h8-bind"],
  "registration.method-call": ["r-u62g2-u1-returned", "r-u62g2r3-h7-returned", "r-u62r4-x1-extend-inline", "r-u62r4-x2-extend-relative", "r-u62r4-x3-extend-element"],
  "registration.suite-factory": ["r-u62r4-x7-factory-param"],
  "registration.integrity": ["r-u62r3-a12-dynamic-load", "r-u62g2r3-h1-array-held", "r-u62g2r3-h11-test-api-hook-array", "r-u62r4-s1-collector-on", "r-u62r4-x22-override-auto", "r-u62r4-x22b-scoped-suite"],
  "api-use.member-read": ["r-u62r3-a1-api-member-overwrite"],
  "api-use.call": ["r-u62g2r3-h5-call-method", "r-u62g2r3-h6-reflect-apply"],
  "api-use.collector": ["r-u62r4-s1-collector-on", "r-u62r4-s2-collector-options"],
  "api-use.const-alias": ["r-u62g2r3-h4-let-held", "r-u62g2-u1-destructured"],
  "api-use.discard": ["r-u62g2r3-h2-object-held", "r-u62g2r3-h7-returned"],
  "api-use.re-export": ["r-u62r4-s14-relative-reexport-api"],
  "api-use.type": ["r-u62r4-s10-hook-parameter-escape"],
  "context.hook-parameter": ["r-u62r4-s8-hook-parameter-writer", "r-u62r4-s10-hook-parameter-escape"],
  "options.literal": ["r-u62r4-s12-options-method-this", "r-n5-computed-key", "r-6hb7-s4-fails-options", "r-u62r5-p3-proto-literal-options"],
  "options.const": [
    "r-u62g2r3-o1-destructure-object",
    "r-u62g2r3-o4-describe-options",
    "r-s7-fails-variable",
    "r-u62r5-o1-exported-const",
    "r-u62r5-o3-exported-spread-source",
    "r-u62r5-o4-exported-describe-options",
    "r-u62r5-o1b-export-specifier",
    "r-u62r5-o1c-export-default",
    "r-u62r5-e1-direct-eval",
  ],
  "options.read-position": ["r-u62g2r3-o2-destructure-array", "r-u62g2r3-o3-for-of-target", "r-u62g2r3-o5-spread-source"],
  "options.fails-constant": ["r-u62r4-o6-fails-not-constant", "r-u62r4-x14-undefined-shadow"],
  "options.enclosure": ["r-u62g2-i1-object-held-suite", "r-u62g2-i1-wrapper-suite", "r-u62g3-1-object-method", "r-u62r5-o4-exported-describe-options", "r-u62r5-p7-proto-describe-inner"],
  "options.absent": ["r-u62r5-p1-proto-own-file", "r-u62r5-p7-proto-describe-inner", "c-u62r5-unguarded-p1"],
  "options.number": ["c-u62r5-unguarded-number"],
  "options.inherited": [
    "c-u62r5-unguarded-plain",
    "c-u62r5-unguarded-p1",
    "c-u62r5-unguarded-number",
    "c-u62r5-unguarded-f1",
    "c-u62r5-guard-not-first",
    "c-u62r5-guard-altered",
    "c-u62r5-rs2-tamper",
    "c-u62r5-rs2-fixtures",
    "c-u62r6-npmrc-forged-mark",
    "c-u62r6-npmrc-tamper",
    "c-u62r6-npmrc-script-shell",
    "c-u62r6-npmrc-fixtures",
    "c-u62r6-workspace-npmrc",
    "c-u62r6-lifecycle-swap",
    "c-u62r6-forge-configuration",
  ],
  "context.inherited": ["c-u62r5-unguarded-f1", "c-u62r5-unguarded-f2", "c-u62r5-guard-parallel", "c-u62r5-pool-vm", "c-u62r5-rs2-fixtures", "c-u62r6-npmrc-fixtures", "c-u62r6-forge-configuration"],
  "context.seed": ["b-6hb7-m10-rest-destructured", "b-6ze38-m8-rest-args", "b-arguments"],
  "context.member": ["r-u62g3-8-context-write-task", "b-destructured", "b-computed-key"],
  "context.alias": ["b-alias-context"],
  "context.discard": ["b-escape"],
  "context.derived": ["r-u62r3-a5-result-rewrite", "r-u62g2r3-k-context-destructure-write", "r-u62g2r3-k-context-for-of-write"],
  "context.checked": ["r-u62r3-a10-assertion-callback", "r-u62r4-x4-satisfy-by-name", "r-u62r4-x5-asymmetric-object", "r-u62r4-x6-satisfy-member"],
  "context.handler": ["r-u62r3-a4-registrar-handler", "r-u62r3-a6-imported-registrar", "r-u62r3-a9-handler-arguments", "r-u62r4-s11-destructured-registrar-array"],
  "context.hook": ["r-u62g3-10-context-write-hook", "r-u62r3-a2-test-api-hook", "r-u62g2r3-k-around-direct"],
  "context.sibling": ["r-u62g2r3-k-object-method-hook"],
  "context.free-hook": ["r-u62r4-x9-dispatch-member", "r-u62r4-s8-hook-parameter-writer"],
  "context.runner-placed": ["r-u62r4-x15-runner-dispatch", "r-u62r4-x16-runner-class-field", "r-u62r4-x17-runner-alias", "r-u62r4-x18-runner-async", "r-u62r4-x19-runner-reexport", "j-u62-j5-helper"],
  "context.follow": ["r-u62r4-s3-class-static-hook", "r-u62r4-s4-destructured-helper", "r-u62r4-s5-relative-namespace", "r-u62r4-s6-relative-default", "r-u62r4-s7-relative-reexport", "j-u62-j5-helper"],
  "assertion.matcher": ["a-u62g2r3-e1-withcontext", "a-u62g2r3-e2b-withtest", "a-u62g2r3-e3-not-withcontext", "a-u62r4-s15-chai-assert-method", "a-u62g3-15-expect-tostring", "a-bare-expect"],
  "assertion.failing-member": ["a-u62g2r3-k-setstate-count", "a-u62g3-11-expect-getstate", "a-u62g3-12-expect-assertions-zero"],
  "assertion.assert-call": ["a-u62g3-13-assert-tostring", "a-u62g3-14-assert-bound"],
  "assertion.handle-integrity": ["r-u62r4-x8-custom-matcher", "r-u62r4-x10b-mock-node-assert", "r-u62r4-x11-assert-overwrite", "r-u62r4-x21-prototype-route"],
  "assertion.case-body": ["a-after-return", "a-u62-conditional-if", "a-u62g2-u2-labeled-break"],
  "assertion.invoked-callback": ["a-never-called", "a-u62g2r3-e7-never-method", "a-u62g2r3-k-never-arrow"],
  "assertion.called-helper": ["a-u62g2r3-e9-generator-not-iterated", "a-u62g2r3-k-never-declaration"],
  "assertion.loop-body": ["a-empty-loop", "a-bare-empty-loop"],
};

/** Roster rows no fixture of this suite can resolve an ok verdict through, each with the reason (the liveness check names any other). */
const LIVENESS_EXEMPT: Readonly<Partial<Record<RosterId, string>>> = {
  "registration.global": "the fixture project runs with vitest's default globals: false (as this repository does), so no fixture registers through a global; its refusals are its justification rows",
};

describe("census helper: the resolvable-construct roster is the acceptance surface (owner criterion 2026-10-17, respin-4)", () => {
  const rows = new Map<string, Row | ConfigRow>([...MAIN_ROWS, ...CONFIG_ROWS].map(row => [row.id, row]));

  it("every roster row names the falsifier rows that justify it, each a row of this suite that goes red", () => {
    expect(Object.keys(ROSTER_JUSTIFICATION).sort()).toEqual(RESOLVABLE_CONSTRUCTS.map(row => row.id).sort());
    for (const [construct, justified] of Object.entries(ROSTER_JUSTIFICATION)) {
      expect(justified.length, construct).toBeGreaterThan(0);
      for (const id of justified) {
        const row = rows.get(id);
        expect(row, `${construct}: ${id} is a row of this suite`).toBeDefined();
        expect(row !== undefined && (!row.verdict.ok || row.report?.ok === false), `${construct}: ${id} goes red`).toBe(true);
      }
    }
  });

  it("every ok verdict resolved its flows through roster rows only, and every roster row resolves some ok verdict", () => {
    const ids = new Set<string>(RESOLVABLE_CONSTRUCTS.map(row => row.id));
    const greens = [...mainVerdicts.values(), ...reportVerdicts.values()].filter(verdict => verdict.ok);
    expect(greens.length).toBeGreaterThan(0);
    const live = new Set<string>();
    for (const verdict of greens) {
      expect(verdict.through.length, verdict.why).toBeGreaterThan(0);
      for (const row of verdict.through) {
        expect(ids.has(row), `${verdict.why}: ${row}`).toBe(true);
        live.add(row);
      }
    }
    const dead = [...ids].filter(id => !live.has(id) && LIVENESS_EXEMPT[id as RosterId] === undefined);
    expect(dead, `roster rows no ok verdict resolves through: ${dead.join(", ")}`).toEqual([]);
  });

  it("u62 respin-5: every ok verdict resolved its context flow through context.inherited, and a fails-absent read through options.absent / options.number and options.inherited", () => {
    const greens = [...mainVerdicts.values(), ...reportVerdicts.values()].filter(verdict => verdict.ok);
    for (const verdict of greens) expect(verdict.through, verdict.why).toContain("context.inherited");
    const control = reportVerdicts.get("r-control");
    expect(control?.ok, control?.why).toBe(true);
    expect(control?.through).toEqual(expect.arrayContaining(["options.absent", "options.inherited", "context.inherited"]));
    const numeric = reportVerdicts.get("r-u62r5-o6-numeric-options");
    expect(numeric?.ok, numeric?.why).toBe(true);
    expect(numeric?.through).toEqual(expect.arrayContaining(["options.number", "options.absent", "options.inherited", "context.inherited"]));
    expect(mainVerdicts.get("r-u62r5-o6-numeric-options")?.through).not.toContain("options.inherited");
  });
});
