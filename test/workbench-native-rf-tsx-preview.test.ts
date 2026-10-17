/**
 * TSX-era native RF preview tier (wb-693.6, RF-TSX-AND-EMBEDDING-R8; its two rows are R9's receipt
 * rows, wb-693.7).
 *
 * Runs only as `forge run rf-preview-tsx` (vitest.rf-tsx.config.ts); vitest.config.ts excludes it
 * from the default gate. Both rows are encoded now, so provisioning is the only missing input:
 *   WORKBENCH_RF_TSX_FIXTURE       absolute path of an initialized disposable RF workspace with one
 *                                  active, policy.toml-trusted kind = "tsx" component, rendered by
 *                                  an installed rf serving tsx (>= 0.1.709) with the pinned Deno
 *                                  first on PATH;
 *   WORKBENCH_RF_TSX_NO_DENO_PATH  a PATH that still resolves rf (and its interpreter) but no deno.
 * A row missing a variable (unset or empty) fails with the typed reason
 * rf_tsx_missing_configuration naming every variable it lacks: never a skip, never a green pass
 * (docs/workflows.md: native tiers refuse missing fixture configuration). Each passing row prints
 * one RF-TSX-RECEIPT line, so the Forge command receipt carries what the row measured.
 */
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberPreview, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";

const FIXTURE = "WORKBENCH_RF_TSX_FIXTURE";
const NO_DENO_PATH = "WORKBENCH_RF_TSX_NO_DENO_PATH";
const MISSING_CONFIGURATION = "rf_tsx_missing_configuration";
const MODEL = "claude-opus-5";
const TASK = "Summarize workbench integration";
const FINGERPRINT = /^sha256:[0-9a-f]{64}$|^unknown$/;
/** Above the provider's own 60 s execution deadline, so a slow render fails as that typed refusal first. */
const ROW_BUDGET_MS = 90_000;

/** The tier's typed refusal: it names every variable the row lacks instead of skipping the row. */
class TierConfigurationError extends Error {
  readonly reason = MISSING_CONFIGURATION;
  constructor(readonly missing: readonly string[]) {
    super(`${MISSING_CONFIGURATION}: ${missing.join(", ")} unset or empty; rf-preview-tsx refuses instead of skipping`);
    this.name = "TierConfigurationError";
  }
}

/** The values of `names` in order, or the typed refusal naming each one that is unset or empty. */
function configured(...names: readonly string[]): string[] {
  const missing = names.filter(name => !process.env[name]);
  if (missing.length > 0) throw new TierConfigurationError(missing);
  return names.map(name => process.env[name] ?? "");
}

/** One member of the producer's JSON, read without trusting its shape (undefined when absent). */
function at(value: unknown, ...path: readonly string[]): unknown {
  let current = value;
  for (const key of path) {
    if (current === null || typeof current !== "object" || !Object.hasOwn(current, key)) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/** One stdout line per passing row, so the Forge receipt carries the measured identity. */
function receipt(row: string, fields: Readonly<Record<string, unknown>>): void {
  console.log(`RF-TSX-RECEIPT ${JSON.stringify({ row, ...fields })}`);
}

describe("RF TSX-era native context producer (R9 receipt rows)", () => {
  it(
    "success row: an ephemeral TSX-era preview with a worker spawn and engine identity",
    async () => {
      const [workspace = ""] = configured(FIXTURE);
      const preview = await nativeReactiveFiberPreview(MODEL, TASK, workspace);
      expect(preview).toMatchObject({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: workspace });
      const result = at(preview, "source", "result");
      expect(at(result, "ephemeral"), "R9 success: source.result.ephemeral === true").toBe(true);
      expect(at(result, "render_id"), "R9 success: render_id === null").toBeNull();
      expect(at(result, "work", "storage_write_count"), "R9 success: work.storage_write_count === 0").toBe(0);
      const spawns = at(result, "engine_metrics", "tsx_worker_spawns");
      expect(typeof spawns, "R9 success: engine_metrics.tsx_worker_spawns >= 1").toBe("number");
      expect(spawns, "R9 success: engine_metrics.tsx_worker_spawns >= 1").toBeGreaterThanOrEqual(1);
      const runtime = at(result, "provenance", "sdk_versions", "tsx_runtime");
      const distribution = at(runtime, "distribution_version");
      expect(typeof distribution, "R9 success: tsx_runtime.distribution_version is a non-empty string").toBe("string");
      expect(distribution, "R9 success: tsx_runtime.distribution_version is a non-empty string").not.toBe("");
      const fingerprint = at(runtime, "contract_fingerprint");
      expect(typeof fingerprint, "R9 success: tsx_runtime.contract_fingerprint matches /^sha256:[0-9a-f]{64}$|^unknown$/").toBe("string");
      expect(fingerprint, "R9 success: tsx_runtime.contract_fingerprint matches /^sha256:[0-9a-f]{64}$|^unknown$/").toMatch(FINGERPRINT);
      const cliVersion = at(result, "provenance", "cli_version");
      expect(typeof cliVersion, "R9 success: provenance.cli_version is captured into the receipt").toBe("string");
      expect(cliVersion, "R9 success: provenance.cli_version is captured into the receipt").not.toBe("");
      receipt("success", { cli_version: cliVersion, tsx_worker_spawns: spawns, distribution_version: distribution, contract_fingerprint: fingerprint });
    },
    ROW_BUDGET_MS,
  );

  it(
    "runtime-absent row: with no deno on PATH the capability refuses as typed unavailable RF_COMPONENT_RUNTIME_ABSENT",
    async () => {
      const [workspace = "", noDenoPath = ""] = configured(FIXTURE, NO_DENO_PATH);
      const path = process.env.PATH;
      process.env.PATH = noDenoPath;
      const refusal = await nativeReactiveFiberPreview(MODEL, TASK, workspace)
        .then(
          () => undefined,
          (error: unknown) => error,
        )
        .finally(() => {
          if (path === undefined) delete process.env.PATH;
          else process.env.PATH = path;
        });
      expect(refusal, "R9 runtime-absent: the capability rejects with category 'unavailable'").toBeInstanceOf(CapabilityError);
      expect(at(refusal, "category"), "R9 runtime-absent: the capability rejects with category 'unavailable'").toBe("unavailable");
      const message = refusal instanceof Error ? refusal.message : "";
      expect(message, "R9 runtime-absent: the message contains RF_COMPONENT_RUNTIME_ABSENT").toContain("RF_COMPONENT_RUNTIME_ABSENT");
      receipt("runtime-absent", { category: at(refusal, "category"), message });
    },
    ROW_BUDGET_MS,
  );
});
