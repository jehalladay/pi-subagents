/**
 * QA verification matrix V1-V10 (APO 11, QA matrix; carried by lo6k.5).
 *
 * The matrix names ten verification rows across schema, stochastic, evidence, resource,
 * durability, rewrite, parity, MicroPolicy, experiment and native-receipt axes. Every row is
 * covered by cells, and every cell names either a test file that exists in the supplied
 * inventory or a named real-infrastructure gate from the supplied gate registry — a silent skip
 * is not a disposition, and naming alone is not the contract. The judgement is pure: the caller
 * supplies the file inventory and the gate registry (qa/integration/real-infra-gates.json), so
 * the acceptance test can hold the matrix against the real repository listing.
 */

export const QA_MATRIX_ROWS: Readonly<Record<string, string>> = Object.freeze({
  V1: "schema/ports, duplicate, unknown node, stale implementer, wrong input type, cycles without delay",
  V2: "finite stochastic exact normalization, fan-out, selector conditional log-prob and probability mass",
  V3: "source witness changes, retractions, covered absence and invalid/unknown propagation",
  V4: "resource overclaim, protected write, conflicting scopes, stale head; native host never receives unauthorized action",
  V5: "CAS memory state, retries, duplicate decision ID and in-flight native commitments",
  V6: "rewrite dangling refs, identity loss, illegal authority gain, incompatible migration, certificate invalidation",
  V7: "cross-check MW native deterministic fixture against graph manifest compiled behavior",
  V8: "real MP sampled decision round-trip, action mask, logprob, on-policy update with checkpoint revision",
  V9: "controlled comparison on heldout seed/family workload, bootstrap intervals and cost accounting",
  V10: "optional isolated Git/Forge/Furnace/Beads receipts, verifying no fake live PASS",
});

export type QaRefusalCode =
  | "QA_ROW_UNKNOWN"
  | "QA_ROW_UNCOVERED"
  | "QA_SILENT_SKIP"
  | "QA_TEST_FILE_UNKNOWN"
  | "QA_GATE_UNNAMED"
  | "QA_GATE_UNKNOWN";

export type QaDisposition =
  | { readonly kind: "test"; readonly testFile: string }
  | { readonly kind: "real-infra-gate"; readonly gateName: string };

export interface QaCell {
  readonly row: string;
  readonly disposition: QaDisposition;
}

export interface QaMatrixJudgement {
  readonly schema: "mw.qa-matrix.v0";
  readonly ok: boolean;
  readonly covered: readonly string[];
  readonly uncovered: readonly string[];
  readonly refusals: ReadonlyArray<{ readonly code: QaRefusalCode; readonly subject: string; readonly detail: string }>;
}

/** Judge the matrix against a supplied file inventory and gate registry; every row covered, every cell named and registered, no silent skip. */
export function judgeQaMatrix(
  cells: readonly QaCell[],
  inventory: { readonly knownFiles: readonly string[]; readonly knownGates: readonly string[] },
): QaMatrixJudgement {
  const refusals: Array<{ code: QaRefusalCode; subject: string; detail: string }> = [];
  const known = new Set(inventory.knownFiles);
  const knownGates = new Set(inventory.knownGates ?? []);
  const coveredRows = new Set<string>();
  for (const [index, cell] of cells.entries()) {
    if (!Object.prototype.hasOwnProperty.call(QA_MATRIX_ROWS, cell.row)) {
      refusals.push({ code: "QA_ROW_UNKNOWN", subject: `cells.${index}`, detail: `row ${cell.row} is outside V1-V10` });
      continue;
    }
    const d = cell.disposition as { kind?: unknown; testFile?: unknown; gateName?: unknown };
    if (d.kind === "test") {
      if (typeof d.testFile !== "string" || d.testFile.trim() === "") {
        refusals.push({ code: "QA_SILENT_SKIP", subject: `cells.${index}`, detail: `row ${cell.row} names no test file; a silent skip is not a disposition` });
        continue;
      }
      if (!known.has(d.testFile)) {
        refusals.push({ code: "QA_TEST_FILE_UNKNOWN", subject: `cells.${index}`, detail: `row ${cell.row} names ${d.testFile}, which is not in the supplied inventory` });
        continue;
      }
    } else if (d.kind === "real-infra-gate") {
      if (typeof d.gateName !== "string" || d.gateName.trim() === "") {
        refusals.push({ code: "QA_GATE_UNNAMED", subject: `cells.${index}`, detail: `row ${cell.row} declares a real-infrastructure gate without naming it` });
        continue;
      }
      if (!knownGates.has(d.gateName)) {
        refusals.push({ code: "QA_GATE_UNKNOWN", subject: `cells.${index}`, detail: `row ${cell.row} names gate ${d.gateName}, which is not in the supplied gate registry` });
        continue;
      }
    } else {
      refusals.push({ code: "QA_SILENT_SKIP", subject: `cells.${index}`, detail: `row ${cell.row} carries disposition ${String(d.kind)}; only a named test or a named real-infrastructure gate counts` });
      continue;
    }
    coveredRows.add(cell.row);
  }
  const allRows = Object.keys(QA_MATRIX_ROWS);
  const uncovered = allRows.filter((row) => !coveredRows.has(row));
  for (const row of uncovered) {
    refusals.push({ code: "QA_ROW_UNCOVERED", subject: row, detail: `row ${row} (${QA_MATRIX_ROWS[row]}) has no valid cell` });
  }
  return {
    schema: "mw.qa-matrix.v0",
    ok: refusals.length === 0,
    covered: Object.freeze(allRows.filter((row) => coveredRows.has(row))),
    uncovered: Object.freeze(uncovered),
    refusals: Object.freeze(refusals),
  };
}
