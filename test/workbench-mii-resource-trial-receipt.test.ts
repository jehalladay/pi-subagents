/**
 * EAT-R455 criterion 2 and its RA-18 negative mutant, criterion 3 (wb-luvt cut #1, MII P08+; program
 * mechanical-interop-integrity-2026-11-10, requirements/ATOMIC-REQUIREMENTS.md blob a8a9bf09 at origin/master 53ac7f35,
 * lines 1633-1647). Quoted:
 *  - criterion 2: "Any absent metric appears as null/unknown, never as a number; a validator rejects a receipt asserting an
 *    SLA with no measurement row."
 *  - criterion 3: "A receipt carrying an SLA with no raw measurement row is accepted by a mutant validator; the RA-18 test
 *    must reject it."
 *
 * The validator is trialReceiptFindings of qa/workbench/mii-resource-trials.mjs; its header gives the receipt form (a record
 * holding a measurements list and an slas list) and the four finding rules. Every case below hands it receipt values built
 * in the case and asserts the exact findings list each returns. The falsifiers named below are the product mutants M1-M21
 * of that module, run at cut time over a throwaway copy (each removes or loosens one check, or refuses what the module
 * accepts); M1 is the RA-18 mutant of criterion 3 (the SLA check removed).
 *
 * PINNED READER SET (every case in this file; each sentence claims the receipts its case builds and nothing wider):
 * - R455-CONTROL: the receipt the case builds (raw rows for warm-startup-p95 [12, 14, 13], cold-startup-p95 [0] and
 *   queue-wait-p50 [-3, 2.5], a token-cost row reading "unknown" and a child-count row reading null, one SLA on each raw
 *   row's metric) returns [], and so does the receipt of two empty lists. Falsifiers: M19, M20, M21.
 * - R455-RA18 (criterion 3): the two RA-18 receipts the case builds (an SLA on fd-count beside a raw row for another metric,
 *   and the same SLA with no measurement row) each return exactly one sla-without-measurement finding at slas[0] naming
 *   fd-count. Falsifiers: M1, M17.
 * - R455-SLA-UNMEASURED (criterion 2, second clause): an SLA on fd-count whose only row reads "unknown", with its raw member
 *   in each form NOT_RAW lists, returns exactly one sla-without-measurement finding at slas[0]. Falsifiers: M1, M4-M8, M12,
 *   M17.
 * - R455-SLA-NAME: beside one raw row for warm-startup-p95, SLAs on that exact name, on Warm-Startup-P95, on the name with a
 *   trailing space, with a leading space and on warm-startup-p9 return sla-without-measurement at the last four only.
 *   Falsifiers: M1, M11, M16, M17, M19.
 * - R455-UNMEASURED-VALUE (criterion 2, first clause): a token-cost row with no raw member, valued with each form NOT_UNKNOWN
 *   lists (numbers among them), returns exactly one unmeasured-not-unknown finding at measurements[0]. Falsifiers: M2, M3,
 *   M9, M10, M17.
 * - R455-UNMEASURED-RAW (criterion 2, first clause): a child-count row valued 12, with its raw member in each form NOT_RAW
 *   lists but the absent one, returns exactly one unmeasured-not-unknown finding at measurements[0]. Falsifiers: M2-M8, M17.
 * - R455-UNMEASURED-UNKNOWN (criterion 2, first clause, the accepted arm): a token-cost row valued null, and one valued
 *   "unknown", with its raw member in each form NOT_RAW lists, returns []. Falsifier: M20.
 * - R455-MALFORMED-RECEIPT: each of the eleven receipt values the case lists (null, undefined, a string, a number, two lists,
 *   a record holding neither list, two records holding only one of them, a record whose measurements member is a record
 *   beside an SLA naming no row, and a record whose slas member is a string) returns only the one receipt-malformed
 *   finding. Falsifiers: M13, M17.
 * - R455-MALFORMED-ROW: each of the seven measurement rows and the four SLA rows the case lists (among them a null, a list,
 *   a string, a record without a metric, an empty metric and a numeric metric) returns row-malformed at its own index, with
 *   metric null. Falsifiers: M14, M15, M16, M17, M18.
 * - R455-ORDER: the mixed receipt the case builds (rows a valued 1, a raw row b, c valued "2"; SLAs on a, b and z) returns
 *   the two measurement findings in list order, then the two SLA findings in list order. Falsifiers: M1, M2, M3, M12, M16,
 *   M17, M19.
 *
 * NOT CLAIMED: criterion 1 (the 1, 4 and 16 concurrency runs and the same-root denial run, their raw
 * measurements, the environment fingerprint and the script-path comparison table) is NOT CLAIMED by this suite. Which
 * metrics a receipt must name is NOT CLAIMED by this suite. Whether a raw row's value agrees with its samples, and whether
 * its samples were measured at all, is NOT CLAIMED by this suite. An SLA's bound, wording and units are NOT CLAIMED by this
 * suite. An SLA or a measurement stated anywhere but the slas and measurements lists (another member, free text, a markdown
 * receipt) is NOT CLAIMED by this suite. A receipt member that is inherited, an accessor or symbol-keyed is NOT CLAIMED by
 * this suite. The receipt's location (EAT-R456) and the ratified receipt schema (EAT-R458) are NOT CLAIMED by this suite.
 * That this file's case titles and this header name its cases is NOT CLAIMED by this suite: no case reads this file's own
 * source or the test report, so a retitled, renamed or removed case is not refused here.
 */
import { describe, expect, it } from "vitest";
import { trialReceiptFindings } from "../qa/workbench/mii-resource-trials.mjs";

const TIMEOUT = 10_000;

/** Marks a member a row leaves out. */
const ABSENT = Symbol("absent");
type Member = unknown;

interface Finding {
  readonly rule: string;
  readonly at: string;
  readonly metric: string | null;
}

const finding = (rule: string, at: string, metric: string | null): Finding => ({ rule, at, metric });

/** A raw measurement row: finite samples, a unit and the statistic the receipt reports from them. */
const measured = (metric: string, raw: readonly number[] = [12, 14, 13]): Record<string, Member> => ({
  metric,
  unit: "ms",
  raw: [...raw],
  value: Math.max(...raw),
});

/** A row for `metric` whose raw and value members are `raw` and `value`, each left out when ABSENT. */
const row = (metric: string, raw: Member, value: Member): Record<string, Member> => {
  const out: Record<string, Member> = { metric, unit: "ms" };
  if (raw !== ABSENT) out.raw = raw;
  if (value !== ABSENT) out.value = value;
  return out;
};

const sla = (metric: string): Record<string, Member> => ({ metric, bound: "<= 2000 ms" });

const receipt = (measurements: readonly Member[], slas: readonly Member[]): Record<string, Member> => ({
  measurements: [...measurements],
  slas: [...slas],
});

/** Each raw member that leaves a row without raw samples, named as its case reports it. */
const NOT_RAW: ReadonlyArray<readonly [string, Member]> = [
  ["absent", ABSENT],
  ["null", null],
  ["an empty list", []],
  ["a list holding NaN", [Number.NaN]],
  ["a list holding Infinity", [Number.POSITIVE_INFINITY]],
  ["a list holding a numeric string", ["12"]],
  ["a list mixing a number and NaN", [12, Number.NaN]],
  ["a record", { p50: 12 }],
  ["a number", 12],
  ["a numeric string", "12"],
];

/** Each value a row without raw samples may not carry, named as its case reports it. */
const NOT_UNKNOWN: ReadonlyArray<readonly [string, Member]> = [
  ["the number 12", 12],
  ["zero", 0],
  ["a negative number", -1],
  ["a fraction", 12.5],
  ["NaN", Number.NaN],
  ["a numeric string", "12"],
  ["a number with its unit", "12 ms"],
  ["Unknown capitalised", "Unknown"],
  ["unknown with a trailing space", "unknown "],
  ["the empty string", ""],
  ["true", true],
  ["false", false],
  ["a record", {}],
  ["a list", []],
  ["absent", ABSENT],
];

const findingsOf = (value: Member): readonly Finding[] => trialReceiptFindings(value);

describe("EAT-R455 criteria 2-3, trialReceiptFindings on the receipts each case builds: an slas row naming no raw measurement row is refused, and a measurements row without raw samples reads null or unknown, never a number", () => {
  it("R455-CONTROL: measured rows, rows reading null or unknown and SLAs on measured metrics return no finding; so do two empty lists", () => {
    const accepted = receipt(
      [
        measured("warm-startup-p95"),
        measured("cold-startup-p95", [0]),
        measured("queue-wait-p50", [-3, 2.5]),
        row("token-cost", ABSENT, "unknown"),
        row("child-count", ABSENT, null),
      ],
      [sla("warm-startup-p95"), sla("cold-startup-p95"), sla("queue-wait-p50")],
    );
    expect(findingsOf(accepted)).toEqual([]);
    expect(findingsOf(receipt([], []))).toEqual([]);
  }, TIMEOUT);

  it("R455-RA18: an SLA naming a metric no measurement row names is refused as sla-without-measurement at that SLA", () => {
    expect(findingsOf(receipt([measured("warm-startup-p95")], [sla("fd-count")]))).toEqual([
      finding("sla-without-measurement", "slas[0]", "fd-count"),
    ]);
    expect(findingsOf(receipt([], [sla("fd-count")]))).toEqual([finding("sla-without-measurement", "slas[0]", "fd-count")]);
  }, TIMEOUT);

  it("R455-SLA-UNMEASURED: an SLA whose metric's only row reads unknown with no raw samples is refused, for each raw member form in NOT_RAW", () => {
    expect(NOT_RAW.map(([, raw]) => findingsOf(receipt([row("fd-count", raw, "unknown")], [sla("fd-count")])))).toEqual(
      NOT_RAW.map(() => [finding("sla-without-measurement", "slas[0]", "fd-count")]),
    );
  }, TIMEOUT);

  it("R455-SLA-NAME: an SLA names its row by exact string equality, so a case-changed, padded or shortened name is refused", () => {
    const slas = ["warm-startup-p95", "Warm-Startup-P95", "warm-startup-p95 ", " warm-startup-p95", "warm-startup-p9"].map(sla);
    expect(findingsOf(receipt([measured("warm-startup-p95")], slas))).toEqual([
      finding("sla-without-measurement", "slas[1]", "Warm-Startup-P95"),
      finding("sla-without-measurement", "slas[2]", "warm-startup-p95 "),
      finding("sla-without-measurement", "slas[3]", " warm-startup-p95"),
      finding("sla-without-measurement", "slas[4]", "warm-startup-p9"),
    ]);
  }, TIMEOUT);

  it("R455-UNMEASURED-VALUE: a row without raw samples valued with any form in NOT_UNKNOWN, a number among them, is refused as unmeasured-not-unknown", () => {
    expect(NOT_UNKNOWN.map(([, value]) => findingsOf(receipt([row("token-cost", ABSENT, value)], [])))).toEqual(
      NOT_UNKNOWN.map(() => [finding("unmeasured-not-unknown", "measurements[0]", "token-cost")]),
    );
  }, TIMEOUT);

  it("R455-UNMEASURED-RAW: a row valued 12 whose raw member is any form in NOT_RAW but the absent one is refused as unmeasured-not-unknown", () => {
    const forms = NOT_RAW.filter(([, raw]) => raw !== ABSENT);
    expect(forms.length).toBe(NOT_RAW.length - 1);
    expect(forms.map(([, raw]) => findingsOf(receipt([row("child-count", raw, 12)], [])))).toEqual(
      forms.map(() => [finding("unmeasured-not-unknown", "measurements[0]", "child-count")]),
    );
  }, TIMEOUT);

  it("R455-UNMEASURED-UNKNOWN: a row without raw samples valued null or unknown returns no finding, for each raw member form in NOT_RAW", () => {
    for (const value of [null, "unknown"]) {
      expect(NOT_RAW.map(([, raw]) => findingsOf(receipt([row("token-cost", raw, value)], [])))).toEqual(NOT_RAW.map(() => []));
    }
  }, TIMEOUT);

  it("R455-MALFORMED-RECEIPT: a receipt that is not a record, or whose measurements or slas member is not a list, returns only receipt-malformed", () => {
    const forms: readonly Member[] = [
      null,
      undefined,
      "receipt",
      12,
      [],
      [[], []],
      {},
      { measurements: [] },
      { slas: [] },
      { measurements: {}, slas: [sla("fd-count")] },
      { measurements: [], slas: "none" },
    ];
    expect(forms.map(findingsOf)).toEqual(forms.map(() => [finding("receipt-malformed", "receipt", null)]));
  }, TIMEOUT);

  it("R455-MALFORMED-ROW: a row that is not a record, or whose metric is not a non-empty string, is refused as row-malformed at that row", () => {
    const rows: readonly Member[] = [null, [], "row", {}, { metric: "" }, { metric: 12, raw: [1], value: 1 }, { raw: [1], value: 1 }];
    expect(findingsOf(receipt(rows, []))).toEqual(rows.map((_, index) => finding("row-malformed", `measurements[${index}]`, null)));
    const slas: readonly Member[] = [null, {}, { metric: "" }, { metric: 1 }];
    expect(findingsOf(receipt([], slas))).toEqual(slas.map((_, index) => finding("row-malformed", `slas[${index}]`, null)));
  }, TIMEOUT);

  it("R455-ORDER: the measurement rows' findings come first in list order, then the SLA rows' in list order", () => {
    const mixed = receipt([row("a", ABSENT, 1), measured("b"), row("c", ABSENT, "2")], [sla("a"), sla("b"), sla("z")]);
    expect(findingsOf(mixed)).toEqual([
      finding("unmeasured-not-unknown", "measurements[0]", "a"),
      finding("unmeasured-not-unknown", "measurements[2]", "c"),
      finding("sla-without-measurement", "slas[0]", "a"),
      finding("sla-without-measurement", "slas[2]", "z"),
    ]);
  }, TIMEOUT);
});
