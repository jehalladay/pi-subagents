/**
 * wb-0kg.4 (VC-7/W18-D): Furnace Work retry while Run establishment is uncertain,
 * over the per-Attempt embedded bridge of the landed wb-zmd adapter. Test-only: the
 * adapter source is untouched.
 *
 * Spec lines pinned (docs/workbench/14-qa-and-benchmarks.md#fault-injection-locations):
 *   "Parent Furnace Work retry while child Run establishment is uncertain."
 * wb-zmd constraint set: "one bridge host session per Attempt"; receipts state
 *   "no crash durability ... per-Attempt identity".
 * BOUNDARY (07:30Z): "executor docs now state per-Attempt park-not-retry -- never
 *   reintroduce a Furnace-owned-retry premise": every retry here originates from the
 *   operator path (the scripted driver), never from Furnace or the adapter itself.
 *
 * The journeys live in test/helpers/furnace-hosted-retry-journeys.ts so the FIXTURE-tier
 * receipt runner (forge run furnace-hosted-retry-fault) measures exactly what this default-gate
 * tier asserts. Respin pins (gate-2 verdict, 22:06Z): U1 establishment markers are re-asserted
 * AFTER executor.close() (P1 case 2, P2 case 1: an adapter that re-ran an uncertain Attempt's
 * workflow survived the delivered tier); U3 the observer's cancel and observe replies are pinned
 * exactly; O1 the connection-drop-before-admission-reply variant; O2 the full limits object;
 * F5 the host scratch base is XDG_RUNTIME_DIR first and /tmp only as the recorded fallback.
 *
 * Drives the SHIPPED vendored SDK (SHIPPED_FURNACE_SDK), the same package the FIXTURE-tier
 * receipt runner drives through the built adapter, so both tiers exercise one artifact. Since
 * wb-zby re-packaged the vendored SDK from a Furnace revision whose digests agree, wb-zby.2
 * retired the copy-and-rewrite loader: no copy, no manifest rewrite. One case below pins the
 * shipped-SDK record both tiers hand the receipt judge (shippedSdkRecord). No live tier, no
 * furnace doctor, no capability probe.
 */
import { describe, expect, it } from "vitest";
import { assessRetryFaultJourneys, RETRY_FAULT_JOURNEYS } from "../qa/workbench/furnace-hosted-retry-fault-receipt.mjs";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { FurnaceHostedExecutor, type HostedReceipt, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
import {
  chooseScratchBase,
  dropBeforeAdmissionReply,
  explicitUncertainRetry,
  lostConnectionRetry,
  observerNoControl,
  RETRY_FAULT_JOURNEY_RUNNERS,
  type RetryFaultEnv,
  SCRATCH_BASE_MAX_BYTES,
  SCRATCH_FALLBACK_BASE,
  SETTLED_CLOSE_CONTROL_ATTEMPT,
  SETTLED_CLOSE_GRACE_MS,
  sameAttemptReexecution,
  settledCloseTimers,
  settledCloseTimersSensitivity,
  shippedSdkRecord,
} from "./helpers/furnace-hosted-retry-journeys.js";

/** The SHIPPED vendored SDK as installed: no copy to make, so nothing to dispose (wb-zby.2). */
const env: RetryFaultEnv = { Executor: FurnaceHostedExecutor, CapabilityError, sdk: SHIPPED_FURNACE_SDK, scratchBase: chooseScratchBase(process.env).path };

const count = (markers: readonly string[], attemptId: string): number => markers.filter((m) => m === attemptId).length;

describe("Furnace Work retry while Run establishment is uncertain (wb-0kg.4)", () => {
  it("an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded", async () => {
    const observed = await lostConnectionRetry(env);
    expect(observed.armed).toBe(true);
    expect(observed.droppedAfterStarted).toBe(true);
    expect(observed.retriedWireStatus).toBe("success");
    const receipt = observed.beforeClose;
    const [first, second] = receipt.attempts;
    expect(receipt.attempts).toHaveLength(2);
    expect(first?.attemptId).toBe("frn-atm-r1");
    expect(second?.attemptId).toBe("frn-atm-r2");
    // (1) fresh per-Attempt bridge session, never reused
    expect(first?.sessionInstanceId).not.toBe(second?.sessionInstanceId);
    // (3) the uncertain first Attempt is neither success nor upgraded by the retry's result
    expect(first?.terminal).toBe("pending");
    expect(second?.terminal).toBe("success");
    expect(first?.summary).toBeUndefined();
    expect(receipt.identityViolations).toEqual([]);
    // (2) establishment markers exactly once per Attempt
    expect(count(observed.markersBeforeClose, "frn-atm-r1")).toBe(1);
    expect(count(observed.markersBeforeClose, "frn-atm-r2")).toBe(1);
    // P2 (respin U1): still exactly once per Attempt AFTER executor.close(); an adapter that re-ran
    // the uncertain Attempt's workflow when it settled indeterminate would add a second frn-atm-r1 here.
    expect(count(observed.markersAfterClose, "frn-atm-r1")).toBe(1);
    expect(count(observed.markersAfterClose, "frn-atm-r2")).toBe(1);
    expect(observed.markersAfterClose).toEqual(["frn-atm-r1", "frn-atm-r2"]);
    // The uncertain Attempt resolves only on host close, and then as indeterminate, never success.
    const closed = observed.afterClose.attempts[0];
    expect(closed?.cancel).toMatchObject({ requested: true, reason: "host_closed" });
    expect(closed?.terminal).toBe("indeterminate");
    expect(closed?.terminal).not.toBe("success");
    expect(observed.afterClose.attempts[1]?.terminal).toBe("success");
    expect(observed.afterClose.identityViolations).toEqual([]);
  });

  it("an explicitly uncertain first Attempt parks as indeterminate and the retry gets a distinct session without changing it", async () => {
    const observed = await explicitUncertainRetry(env);
    expect(observed.armed).toBe(true);
    expect(observed.wireStatuses).toEqual(["indeterminate", "success"]);
    const [first, second] = observed.beforeClose.attempts;
    expect(first).toMatchObject({ attemptId: "frn-atm-u1", terminal: "indeterminate" });
    expect(second).toMatchObject({ attemptId: "frn-atm-u2", terminal: "success" });
    expect(first?.sessionInstanceId).not.toBe(second?.sessionInstanceId);
    expect(observed.beforeClose.identityViolations).toEqual([]);
    // P1 (respin U1): the establishment markers are exactly one per Attempt after executor.close();
    // an adapter that re-ran the workflow once when it threw uncertain-effect would record frn-atm-u1 twice.
    expect(observed.markersAfterClose).toEqual(["frn-atm-u1", "frn-atm-u2"]);
    expect(observed.afterClose.attempts.map((attempt) => attempt.terminal)).toEqual(["indeterminate", "success"]);
    expect(observed.afterClose.identityViolations).toEqual([]);
  });

  it("a Furnace-style re-execution of the SAME Attempt id is recorded as an identity violation, not accepted as the operator retry", async () => {
    const observed = await sameAttemptReexecution(env);
    expect(observed.armed).toBe(true);
    const receipt = observed.beforeClose;
    // wb-lrz.1: the disclosed retry semantics replace the retired universal negative "furnace-parks-never-retries".
    expect(receipt.limits.retry).toBe("adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park");
    expect(receipt.identityViolations.some((v) => /frn-atm-same executed 2 times/.test(v))).toBe(true);
    // O2: the full disclosed limits object (layered beside test/workbench-furnace-hosted.test.ts)
    expect(receipt.limits).toEqual({ crashDurability: "none", observe: "session-word", identity: "per-attempt", replyBounds: "none", retry: "adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park" });
  });

  it("an observer connection sees no control: its cancel for another session's execution is unknown_execution, its observe is the session's own unknown word, and the workflow is never aborted", async () => {
    const observed = await observerNoControl(env);
    expect(observed.armed).toBe(true);
    // U3: the exact measured replies. The cancel names no execution id back; observe for a never-admitted id is the
    // resident session's own word "unknown" (wb-zby: the rebuilt SDK answers observe from its admission record), so the
    // bridge offers an observer no view of the state change and no control.
    expect(observed.cancelReply).toEqual({ protocol_version: 1, op: "cancel", request_id: "oc", output: { status: "unknown_execution" } });
    expect(observed.observeReply).toEqual({ protocol_version: 1, op: "observe", request_id: "oo", output: { status: "unknown" } });
    expect(observed.aborted).toBe(false);
    expect(observed.ownerWireStatus).toBe("success");
    const attempt = observed.beforeClose.attempts[0];
    expect(attempt).toMatchObject({ terminal: "success", cancel: { requested: false } });
  });

  it("a connection lost right after the execute line is flushed, before the admission reply, parks the first Attempt; the operator retry opens a fresh session and each Attempt establishes exactly once", async () => {
    const observed = await dropBeforeAdmissionReply(env);
    expect(observed.armed).toBe(true);
    expect(observed.droppedBeforeReply).toBe(true);
    expect(observed.admissionReplySeen).toBe(false);
    expect(observed.firstReachedHost).toBe(true);
    expect(observed.retriedWireStatus).toBe("success");
    const [first, second] = observed.beforeClose.attempts;
    expect(observed.beforeClose.attempts).toHaveLength(2);
    expect(first).toMatchObject({ attemptId: "frn-atm-d1", ordinal: 1, terminal: "pending" });
    expect(second).toMatchObject({ attemptId: "frn-atm-d2", ordinal: 2, terminal: "success" });
    expect(first?.sessionInstanceId).not.toBe(second?.sessionInstanceId);
    expect(first?.summary).toBeUndefined();
    expect(observed.markersBeforeClose).toEqual(["frn-atm-d1", "frn-atm-d2"]);
    expect(observed.markersAfterClose).toEqual(["frn-atm-d1", "frn-atm-d2"]);
    expect(observed.afterClose.attempts[0]).toMatchObject({ terminal: "indeterminate", cancel: { requested: true, reason: "host_closed" } });
    expect(observed.afterClose.attempts[1]?.terminal).toBe("success");
    expect(observed.afterClose.identityViolations).toEqual([]);
  });

  it("wb-21k: executor.close() leaves every Attempt that settled before it with cancel requested:false, in all five journeys (the parked Attempts keep host_closed)", async () => {
    for (const name of RETRY_FAULT_JOURNEYS) {
      const observed = (await RETRY_FAULT_JOURNEY_RUNNERS[name as keyof typeof RETRY_FAULT_JOURNEY_RUNNERS](env)) as { beforeClose: HostedReceipt; afterClose: HostedReceipt };
      const before = observed.beforeClose.attempts;
      let settledChecked = 0;
      for (const [index, attempt] of before.entries()) {
        const closed = observed.afterClose.attempts[index];
        if (attempt.terminal === "pending") {
          expect(closed?.cancel, `${name}: the parked ${attempt.attemptId}`).toEqual({ requested: true, reason: "host_closed" });
          continue;
        }
        settledChecked += 1;
        expect(closed?.cancel, `${name}: ${attempt.attemptId} settled ${attempt.terminal} before close`).toEqual({ requested: false });
      }
      expect(settledChecked, `${name} produced no settled Attempt to check`).toBeGreaterThan(0);
    }
  }, 30_000);

  it("wb-21k: executor.close() leaves no grace timer armed for Attempts that already settled (3 settled success Attempts, default-sized grace)", async () => {
    expect(SETTLED_CLOSE_GRACE_MS).toBe(5000);
    const observed = await settledCloseTimers(env);
    expect(observed.armed).toBe(true);
    expect(observed.settledAttempts).toBe(3);
    // A leaked abort listener arms one SETTLED_CLOSE_GRACE_MS timer per settled Attempt when close() aborts; none may remain.
    expect(observed.timeoutsAfterClose - observed.timeoutsBeforeClose).toBeLessThanOrEqual(0);
    expect(observed.afterClose.attempts.map((attempt) => attempt.cancel)).toEqual([{ requested: false }, { requested: false }, { requested: false }]);
  });

  it("wb-19q member 18 (wb-21k F2): the dangling-timer measurement is sensitive: a timer armed by close()'s abort of a parked fourth Attempt raises the after-close count, so a count taken before close() cannot pass as clean", async () => {
    const observed = await settledCloseTimersSensitivity(env);
    expect(observed.armed).toBe(true);
    expect(observed.controlTimerArmed).toBe(true);
    expect(observed.settledAttempts).toBe(3);
    // The control timer is armed INSIDE close() (by the abort of the parked Attempt), so only a count taken after close()
    // can see it: a measurement that read its after-close count before close() reads 0 here and fails this row.
    expect(observed.timeoutsAfterClose - observed.timeoutsBeforeClose).toBeGreaterThanOrEqual(1);
    // the three settled Attempts stay untouched beside the parked control Attempt, which close() ends as host_closed/indeterminate
    expect(observed.afterClose.attempts.map((attempt) => [attempt.attemptId, attempt.terminal, attempt.cancel])).toEqual([
      ["frn-atm-t1", "success", { requested: false }],
      ["frn-atm-t2", "success", { requested: false }],
      ["frn-atm-t3", "success", { requested: false }],
      [SETTLED_CLOSE_CONTROL_ATTEMPT, "indeterminate", { requested: true, reason: "host_closed" }],
    ]);
  });

  it("the host scratch base follows the host rule: XDG_RUNTIME_DIR first, /tmp only as the recorded fallback, never first", () => {
    const usable = (): boolean => true;
    expect(SCRATCH_FALLBACK_BASE).toBe("/tmp");
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000" }, usable)).toEqual({ path: "/run/user/1000", source: "xdg-runtime-dir" });
    // never /tmp first: a usable XDG_RUNTIME_DIR wins whatever TMPDIR says
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000", TMPDIR: "/tmp" }, usable).source).toBe("xdg-runtime-dir");
    // /tmp only as the RECORDED fallback: every fallback names its reason
    expect(chooseScratchBase({}, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "" }, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "run/user/1000" }, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is not an absolute path" });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000" }, () => false)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is not a directory" });
    // the socket bound is counted in BYTES: exactly the limit is usable, one byte more falls back
    const atLimit = `/${"r".repeat(SCRATCH_BASE_MAX_BYTES - 1)}`;
    expect(Buffer.byteLength(atLimit)).toBe(SCRATCH_BASE_MAX_BYTES);
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: atLimit }, usable).source).toBe("xdg-runtime-dir");
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: `${atLimit}r` }, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: `XDG_RUNTIME_DIR is longer than ${SCRATCH_BASE_MAX_BYTES} bytes` });
    const multiByte = `/${String.fromCharCode(0xe9).repeat(SCRATCH_BASE_MAX_BYTES - 2)}`;
    expect(multiByte.length).toBeLessThan(SCRATCH_BASE_MAX_BYTES);
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: multiByte }, usable).source).toBe("tmp-fallback");
    // the predicate is asked about XDG_RUNTIME_DIR only once it passed the cheap checks
    const asked: string[] = [];
    chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000" }, (path) => {
      asked.push(path);
      return true;
    });
    expect(asked).toEqual(["/run/user/1000"]);
  });

  it("the tier and the receipt runner drive the SHIPPED SDK (wb-zby.2): no copy, and the record both hand the judge names copy shipped with the installed manifest and provenance digests, equal, each read from its own file", () => {
    // No copy: this tier's SDK IS the adapter's SHIPPED_FURNACE_SDK (the runner drives the built adapter's own), the
    // vendored package as installed, and the shipped SDK decodes the canonical context itself.
    expect(env.sdk).toBe(SHIPPED_FURNACE_SDK);
    expect(Object.keys(env.sdk).sort()).toEqual(["EmbeddedHost", "ExecutionResult", "ExecutorApp", "Furnace", "ResidentSession", "decodeContextValue"]);
    const record = shippedSdkRecord();
    expect(Object.keys(record).sort()).toEqual(["copy", "manifestDigest", "provenanceDigest"]);
    expect(record.copy).toBe("shipped");
    expect(record.manifestDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(record.provenanceDigest).toBe(record.manifestDigest);
    // Each digest comes from its own file: an in-memory drifted package (a decoy digest before each stated one) reads as
    // two different digests, and a package stating neither well-formed digest reads "<none>" twice, which the judge refuses.
    const fixturePackage =
      (files: Readonly<Record<string, string>>) =>
      (path: string): string => {
        const text = files[path];
        if (text === undefined) throw new Error(`the fixture package has no ${path}`);
        return text;
      };
    const drifted = { manifest: `sha256:${"a".repeat(64)}`, provenance: `sha256:${"b".repeat(64)}`, decoy: `sha256:${"e".repeat(64)}` };
    const driftedPackage = fixturePackage({
      "contract/manifest.json": JSON.stringify({ decoy_digest: drifted.decoy, smithy_model_digest: drifted.manifest }),
      "dist/contract/furnace-executor-contract/provenance.js": `// generated from ${drifted.decoy}\nexport const SMITHY_MODEL_DIGEST = "${drifted.provenance}";\n`,
    });
    expect(shippedSdkRecord(driftedPackage)).toEqual({ copy: "shipped", manifestDigest: drifted.manifest, provenanceDigest: drifted.provenance });
    const unstatedPackage = fixturePackage({
      "contract/manifest.json": JSON.stringify({ smithy_model_digest: 7 }),
      "dist/contract/furnace-executor-contract/provenance.js": 'export const SMITHY_MODEL_DIGEST = "sha256:short";\n',
    });
    expect(shippedSdkRecord(unstatedPackage)).toEqual({ copy: "shipped", manifestDigest: "<none>", provenanceDigest: "<none>" });
    const document = {
      context_version: 1,
      run: { furnace_run_id: "frn-run-x", beads_run_id: "bd-run-x", formula: null },
      work: { beads_work_id: "bd-work-x", title: null, description: null, acceptance_criteria: null },
      attempt: { attempt_id: "frn-atm-x", ordinal: 1, deadline: null },
      workspace: { root: "/" },
    };
    expect(SHIPPED_FURNACE_SDK.decodeContextValue(document).context.attempt.attempt_id).toBe("frn-atm-x");
  });

  it("the five journeys the receipt runner measures satisfy the receipt judge here in the default gate (realised, no finding)", async () => {
    expect(Object.keys(RETRY_FAULT_JOURNEY_RUNNERS)).toEqual([...RETRY_FAULT_JOURNEYS]);
    const journeys: Record<string, unknown> = {};
    for (const name of RETRY_FAULT_JOURNEYS) journeys[name] = await RETRY_FAULT_JOURNEY_RUNNERS[name as keyof typeof RETRY_FAULT_JOURNEY_RUNNERS](env);
    const assessed = assessRetryFaultJourneys({ journeys, sdk: shippedSdkRecord() });
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
  }, 30_000);
});
