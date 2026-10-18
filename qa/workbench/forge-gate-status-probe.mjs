/**
 * wb-4ap.11 native-read receipt probe (owner-reserved, A* real-infra tier).
 * One live gate.status read against the installed forge on this seat, printing
 * exactly the facts the TRACEABILITY row records: the responding forge version,
 * the executable identity a launcher would run (realpath + sha256), the read's
 * ids, and the literal count of packages[].last_result_state present vs null.
 * A non-success gate reading is a finding, not a probe failure: exit 0 whenever
 * the read itself completed and decoded.
 */
import { readForgeGateStatus } from "../../dist/workbench/providers/forge.js";
import { observeExecutableIdentity } from "../../dist/workbench/executable-identity.js";

const workspace = process.argv[2] ?? new URL("../../../../", import.meta.url).pathname;
const identity = observeExecutableIdentity({ command: "forge", cwd: process.cwd(), path: process.env.PATH });
const result = await readForgeGateStatus(workspace);
const source = result.source;
const envelope = source.envelope ?? {};
const provenance = envelope.provenance ?? {};
const packages = source.data?.packages ?? [];
const present = packages.filter((p) => "last_result_state" in p && p.last_result_state !== null).length;
const nulls = packages.filter((p) => "last_result_state" in p && p.last_result_state === null).length;
const absent = packages.length - present - nulls;
console.log(
  JSON.stringify(
    {
      probe: "wb-4ap.11 forge gate.status native read",
      target: workspace,
      forgeVersion: `${provenance.version ?? "unknown"} (rev ${provenance.revision ?? "unknown"}, variant ${provenance.variant ?? "unknown"})`,
      executable: {
        resolution: identity.resolution,
        resolvedPath: identity.resolvedPath ?? null,
        digest: identity.digest ?? null,
        immutability: identity.immutability ?? null,
      },
      ids: source.ids ?? null,
      operationId: source.operation_id ?? null,
      status: source.status,
      disposition: envelope.disposition ?? null,
      packagesTotal: packages.length,
      lastResultState: { present, null: nulls, absent },
      packageRefs: packages.map((p) => p.ref).slice(0, 10),
    },
    null,
    2,
  ),
);
