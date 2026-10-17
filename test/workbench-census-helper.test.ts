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
 * The synthetic projects live in a mkdtemp directory with node_modules symlinked to this repository's, so the
 * runner, its config loader and the helper all run exactly as they do for a real census. Nothing here reads or
 * mutates a pinned file of another census.
 */
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  type CasePin,
  type CensusCode,
  type CensusLeg,
  DEFAULT_GATE_TIER,
  DEFAULT_TIER_REPORT,
  type DocsSection,
  docsSection,
  judge,
  judgePins,
  type PinVerdict,
  type RenderedBlock,
  resolveTier,
  type SourceStructure,
  sectionMatches,
  sourceStructure,
} from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Holds only the anchor case, so judging it on the real default gate never re-enters this suite. */
const SMOKE_FILE = "test/workbench-census-helper-smoke.test.ts";
const SMOKE_TITLE = "FIND-1 smoke anchor: the helper judges this case on the real default gate";
/** Generous: the synthetic runs spawn real vitest processes and may share the host with a complete gate. */
const SUITE_TIMEOUT = 300_000;

const PIN = "the pinned case";
const IMPORTS = 'import { beforeEach, describe, expect, it, test } from "vitest";';
const OTHER = '  it("another case", () => {\n    expect(2).toBe(2);\n  });';
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
    routed: "u62 gate-3 (6c) the fail-closed cost: a user-added member that is plain it (0 in test/** today)",
    source: { prelude: "const api = it as typeof it & { inv: typeof it };\nObject.assign(it, { inv: it });", body: `  api.inv("${PIN}", ${BODY});` },
    oracle: RUNS,
    verdict: OK,
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
}

const CFG_TARGET = "test/cfg-target.test.ts";


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
};

/** Exact table sizes: deleting or emptying a falsifier table goes red (each-liveness of this file's own rows). */
const TABLE_SIZES = [55, 8, 22, 46, 15, 10, 29, 34, 5, 16, 43, 14, 3];


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

const MAIN_ROWS: readonly Row[] = [...REGISTRATION, ...EACH, ...BODY_ROWS, ...ASSERT_ROWS, ...ATTRIBUTION_ROWS, ...JUDGE_ROWS, ...INVERSION_ROWS];
const fileOf = (id: string): string => `test/${id}.test.ts`;
const pinOf = (row: Row): CasePin => ({ file: fileOf(row.id), title: PIN, tier: DEFAULT_GATE_TIER, ...row.pin });
const MAIN_PINS: readonly { readonly id: string; readonly pin: CasePin }[] = [
  ...MAIN_ROWS.map(row => ({ id: row.id, pin: pinOf(row) })),
  ...TIER_ROWS.map(row => ({ id: row.id, pin: row.pin })),
];

/** The documented gate env (house rule: the operator exports a worker cap); every runner run and helper run here carries it. */
const GATE_CAP = "2";

const vitestConfig = (testOptions: string, prelude = ""): string =>
  ['import { defineConfig } from "vitest/config";', prelude, `export default defineConfig({ cacheDir: ".census-cache", test: { cache: false, ${testOptions} } });`, ""].join("\n");
const defaultOptions = (extra: string): string => `include: ["test/**/*.test.ts"], allowOnly: false${extra === "" ? "" : `, ${extra}`}`;
const packageJson = (testScript: string | null, scripts: Readonly<Record<string, string>> = {}): string =>
  `${JSON.stringify({ name: "census-synthetic", private: true, scripts: { lint: "true", ...(testScript === null ? {} : { test: testScript }), ...scripts } }, null, 2)}\n`;
const forgeToml = (testCommand: string, gate = '["lint", "test"]', extra = ""): string =>
  `[package]\nname = "census-synthetic"\n\n[build]\ngate = ${gate}\n\n[build.commands]\nlint = "npm run lint"\ntest = ${JSON.stringify(testCommand)}\n${extra}`;

function writeTree(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
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
    "vitest.asserts.config.ts": vitestConfig(`include: ${JSON.stringify(ASSERT_ROWS.map(row => fileOf(row.id)))}, setupFiles: ["./census-has-assertions.setup.ts"]`),
    "census-has-assertions.setup.ts": 'import { beforeEach, expect } from "vitest";\nbeforeEach(() => {\n  expect.hasAssertions();\n});\n',
    "test/census-assert-helper.ts": 'import { expect } from "vitest";\nexport function assertPositive(value: number): void {\n  expect(value).toBeGreaterThan(0);\n}\n',
    "test/census-register-helper.ts": `import { expect, it } from "vitest";\nexport function registerPinned(): void {\n  it(${JSON.stringify(PIN)}, () => {\n    expect(1).toBe(1);\n  });\n}\n`,
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

function buildConfigRoot(root: string, row: ConfigRow): string {
  return writeTree(root, {
    "package.json": packageJson(row.testScript === undefined ? "vitest run" : row.testScript, row.scripts),
    "forge.toml": row.rawForge ?? forgeToml(row.forgeCommand ?? "npm run test", row.gate),
    "vitest.config.ts": vitestConfig(defaultOptions(row.configBody ?? ""), row.configPrelude ?? ""),
    [CFG_TARGET]: testFile(row.target ?? { body: PLAIN }),
    ...row.files,
  });
}

/** A one-config project (forge.toml test -> npm run test -> the given script) holding the given files. */
const projectFiles = (testScript: string, extra: Readonly<Record<string, string>>): Record<string, string> => ({
  "package.json": packageJson(testScript),
  "forge.toml": forgeToml("npm run test"),
  "vitest.config.ts": vitestConfig(defaultOptions("")),
  ...extra,
});

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

let synthBase = "";
const mainVerdicts = new Map<string, PinVerdict>();
const configVerdicts = new Map<string, PinVerdict>();
const configReports = new Map<string, Report>();
let mainDefault: Report = new Map();
let mainLive: Report = new Map();
let mainAsserts: Report = new Map();
let smoke: PinVerdict | undefined;
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

const SMOKE_PIN: CasePin = { file: SMOKE_FILE, title: SMOKE_TITLE, tier: DEFAULT_GATE_TIER };

beforeAll(async () => {
  // The documented gate env: the operator's worker cap is set for every helper run and runner run here (J4's runner truth).
  previousCap = process.env.VITEST_MAX_WORKERS;
  if (previousCap === undefined) process.env.VITEST_MAX_WORKERS = GATE_CAP;
  synthBase = realpathSync(mkdtempSync(join(tmpdir(), "census-helper.")));
  const mainRoot = buildMainRoot(join(synthBase, "main"));
  mainRootPath = mainRoot;
  const recursionJudgeRoot = buildRecursionRoot(join(synthBase, "recursion-judge"));
  const recursionOracleRoot = buildRecursionRoot(join(synthBase, "recursion-oracle"));
  const e2eRoot = writeTree(join(synthBase, "e2e"), projectFiles("vitest run", { [E2E_PINNED]: e2ePinned(), [E2E_CENSUS]: e2eCensus() }));
  const inRunRoot = writeTree(join(synthBase, "inrun"), projectFiles("vitest run", { [INRUN_PINNED]: testFile({ body: PLAIN }), [INRUN_CENSUS]: inRunCensus() }));
  const noLocRoot = writeTree(join(synthBase, "noloc"), projectFiles("vitest run", { [NOLOC_FILE]: testFile({ body: PLAIN }) }));
  const capRoot = writeTree(join(synthBase, "cap"), projectFiles("vitest run", Object.fromEntries(CAP_FILES.map(file => [file, capFile()]))));
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
      [smoke] = await judgePins(ROOT, [SMOKE_PIN]);
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
  ];
  for (const row of CONFIG_ROWS) {
    const root = buildConfigRoot(join(synthBase, row.id), row);
    tasks.push(async () => {
      const [verdict] = await judgePins(root, [{ file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER }]);
      if (verdict !== undefined) configVerdicts.set(row.id, verdict);
    });
    if (row.oracle !== "none") {
      tasks.push(async () => {
        const run = await runnerReport(root, row.forgeCommand ?? "npm run test");
        configReports.set(row.id, run.report);
        configReportPaths.set(row.id, run.path);
      });
    }
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
    const [verdict] = judge(path, [{ file: CFG_TARGET, title: PIN, tier: DEFAULT_GATE_TIER }], { root: join(synthBase, row.id) });
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
}, SUITE_TIMEOUT);

afterAll(() => {
  if (previousCap === undefined) delete process.env.VITEST_MAX_WORKERS;
  if (synthBase !== "") rmSync(synthBase, { recursive: true, force: true });
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
  it("the default gate resolves forge.toml test -> npm run test -> vitest run, with no CLI flags", () => {
    expect(resolveTier(ROOT, DEFAULT_GATE_TIER)).toEqual({
      ok: true,
      tier: "test",
      command: "npm run test",
      argv: ["run"],
      chain: ['forge.toml [build.commands] test = "npm run test"', 'package.json scripts.test = "vitest run"'],
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

  it("FIND-1 smoke: the helper judges the anchor case through this repository's real default gate", () => {
    expect(smoke?.ok, smoke?.why).toBe(true);
    expect(smoke?.cases).toBe(1);
    expect(smoke?.why).toMatch(/collected once, passed under test, asserts/);
  });
});

describe("census helper: liveness of this falsifier table (h8f.9 O1 class)", () => {
  const tables = [REGISTRATION, EACH, BODY_ROWS, ASSERT_ROWS, ATTRIBUTION_ROWS, TIER_ROWS, CONFIG_ROWS, DOCS_ROWS, STRUCTURE_ROWS, JUDGE_ROWS, INVERSION_ROWS, REPORT_ROWS, REAL_PATH_ROWS];
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
