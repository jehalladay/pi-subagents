/**
 * wb-luvt [MII P08+] (cut #1): the resource-trial receipt validator of EAT-R455, criterion 2 with its RA-18 negative mutant
 * (criterion 3). The program mechanical-interop-integrity-2026-11-10, requirements/ATOMIC-REQUIREMENTS.md blob a8a9bf09 at
 * origin/master 53ac7f35 (lines 1633-1647), reads:
 *  - criterion 2: "Any absent metric appears as null/unknown, never as a number; a validator rejects a receipt asserting an
 *    SLA with no measurement row."
 *  - criterion 3: "A receipt carrying an SLA with no raw measurement row is accepted by a mutant validator; the RA-18 test
 *    must reject it."
 *
 * THE RECEIPT. trialReceiptFindings reads one value: a record (a non-null object that is not a list) holding a `measurements`
 * list and an `slas` list. A measurement row is a record whose `metric` is a non-empty string; it is a RAW MEASUREMENT ROW when
 * its `raw` member is a non-empty list whose every item is a finite number, and a row without raw samples otherwise. An SLA row
 * is a record whose `metric` is a non-empty string.
 *
 * THE FINDINGS. The returned list holds the measurement rows' findings in list order, then the SLA rows' findings in list
 * order; an empty list is an accepted receipt. Each finding is {rule, at, metric}:
 *  - receipt-malformed, at "receipt", metric null: the receipt is not a record, or its measurements or slas member is not a
 *    list. It is then the only finding.
 *  - row-malformed, at "measurements[<i>]" or "slas[<j>]", metric null: the row is not a record, or its metric is not a
 *    non-empty string.
 *  - unmeasured-not-unknown, at "measurements[<i>]", the row's metric: a row without raw samples whose value member is
 *    neither null nor the string "unknown" (criterion 2's first clause), a missing value member included.
 *  - sla-without-measurement, at "slas[<j>]", the SLA's metric: no raw measurement row of the receipt has a metric equal (as
 *    strings) to the SLA's metric (criterion 2's second clause; criterion 3's receipt).
 *
 * What each rule refuses and accepts is what test/workbench-mii-resource-trial-receipt.test.ts pins (case ids R455-*); a
 * form no case holds is NOT CLAIMED. NOT CLAIMED here: criterion 1 (the concurrency and same-root trial runs, the environment
 * fingerprint and the script-path comparison table); which metrics a receipt must name; whether a raw row's value agrees with
 * its samples; an SLA's bound, wording and units; an SLA or a measurement stated anywhere but the two lists; members that are
 * inherited, accessors or symbol-keyed; the receipt's location (EAT-R456) and its ratified schema (EAT-R458).
 *
 * Pure node: no src/ or dist/ import, and no file system, process or network read.
 */

/**
 * @typedef {{ readonly rule: string, readonly at: string, readonly metric: string | null }} TrialFinding
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isMetric(value) {
  return typeof value === "string" && value !== "";
}

/**
 * The findings of one resource-trial receipt (EAT-R455 criterion 2; criterion 3's RA-18 receipt is refused by the
 * sla-without-measurement rule).
 * @param {unknown} receipt
 * @returns {readonly TrialFinding[]}
 */
export function trialReceiptFindings(receipt) {
  /** @type {TrialFinding[]} */
  const findings = [];
  /**
   * @param {string} rule
   * @param {string} at
   * @param {string | null} metric
   */
  const add = (rule, at, metric) => {
    findings.push(Object.freeze({ rule, at, metric }));
  };
  if (!isRecord(receipt) || !Array.isArray(receipt.measurements) || !Array.isArray(receipt.slas)) {
    add("receipt-malformed", "receipt", null);
    return Object.freeze(findings);
  }
  /** The metrics of the raw measurement rows: a non-empty raw list whose every item is a finite number. @type {Set<string>} */
  const measured = new Set();
  for (const [index, row] of receipt.measurements.entries()) {
    const at = `measurements[${index}]`;
    if (!isRecord(row) || !isMetric(row.metric)) {
      add("row-malformed", at, null);
      continue;
    }
    const { metric, raw } = row;
    if (Array.isArray(raw) && raw.length > 0 && raw.every((sample) => Number.isFinite(sample))) {
      measured.add(metric);
      continue;
    }
    if (row.value !== null && row.value !== "unknown") add("unmeasured-not-unknown", at, metric);
  }
  for (const [index, row] of receipt.slas.entries()) {
    const at = `slas[${index}]`;
    if (!isRecord(row) || !isMetric(row.metric)) {
      add("row-malformed", at, null);
      continue;
    }
    if (!measured.has(row.metric)) add("sla-without-measurement", at, row.metric);
  }
  return Object.freeze(findings);
}
