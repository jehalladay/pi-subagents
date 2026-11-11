/**
 * Optional host-specific mapping into @furnace/sdk's actual ExecutionResult API.
 * No Furnace scheduling, Run establishment, retries, or waiting are implemented here.
 */
import type { GateObservation } from "./live-gate.js";

interface ExecutionResultType<Result> {
  success(options: { summary: string; data: Record<string, unknown> }): Result;
  failure(message: string, options: { failure_class: "task"; data: Record<string, unknown> }): Result;
  indeterminate(message: string): Result;
}

export function projectGateIntoFurnace<Result>(
  gate: GateObservation,
  result: ExecutionResultType<Result>,
): Result {
  const evidence = { basis: gate.basis, operation_id: gate.operationId, reason: gate.reason };
  switch (gate.kind) {
    case "passed":
      return result.success({
        summary: "Forge established a passing gate for the pinned candidate",
        data: evidence,
      });
    case "failed":
      return result.failure("Forge gate failed: " + gate.reason, {
        failure_class: "task", data: evidence,
      });
    case "indeterminate":
      // SDK indeterminate(message) currently has no data channel. The message names
      // the Forge operation so the user can retrieve authoritative native evidence.
      return result.indeterminate("Forge gate outcome indeterminate: " + gate.reason +
        (gate.operationId ? " operation=" + gate.operationId : ""));
  }
}
