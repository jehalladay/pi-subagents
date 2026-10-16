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
 * Uses a repaired COPY of the vendored SDK (the shipped digest drift is a separate
 * owner-reserved packaging bead), made by qa/workbench/furnace-hosted-repaired-sdk.mjs so the
 * receipt runner and this tier load the same copy; one case below pins that loader to the wb-zmd
 * helper's recipe. No live tier, no furnace doctor, no capability probe.
 */
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { loadRepairedSdkCopy } from "../qa/workbench/furnace-hosted-repaired-sdk.mjs";
import { assessRetryFaultJourneys, RETRY_FAULT_JOURNEYS } from "../qa/workbench/furnace-hosted-retry-fault-receipt.mjs";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { FurnaceHostedExecutor, type FurnaceSdk, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
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
  sameAttemptReexecution,
} from "./helpers/furnace-hosted-retry-journeys.js";
import { loadRepairedFurnaceSdk } from "./helpers/furnace-sdk-repaired.js";

/** The shape qa/workbench/furnace-hosted-repaired-sdk.mjs returns. */
interface RepairedCopy {
  readonly sdk: FurnaceSdk;
  readonly root: string;
  readonly repairedDigest: string;
  readonly shippedManifestDigest: string;
  readonly dispose: () => void;
}
let repaired: RepairedCopy;
let env: RetryFaultEnv;
beforeAll(async () => {
  repaired = await loadRepairedSdkCopy(tmpdir());
  env = { Executor: FurnaceHostedExecutor, CapabilityError, sdk: repaired.sdk, scratchBase: chooseScratchBase(process.env).path };
});
afterAll(() => {
  repaired.dispose();
});

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
    expect(receipt.limits.retry).toBe("furnace-parks-never-retries");
    expect(receipt.identityViolations.some((v) => /frn-atm-same executed 2 times/.test(v))).toBe(true);
    // O2: the full disclosed limits object (layered beside test/workbench-furnace-hosted.test.ts)
    expect(receipt.limits).toEqual({ crashDurability: "none", observe: "unsupported", identity: "per-attempt", replyBounds: "none", retry: "furnace-parks-never-retries" });
  });

  it("an observer connection sees no control: its cancel for another session's execution is unknown_execution and the workflow is never aborted", async () => {
    const observed = await observerNoControl(env);
    expect(observed.armed).toBe(true);
    // U3: the exact measured replies. The cancel names no execution id back and Observe is stated
    // unsupported, not faked: the bridge offers an observer no view of the state change, only no control.
    expect(observed.cancelReply).toEqual({ protocol_version: 1, op: "cancel", request_id: "oc", output: { status: "unknown_execution" } });
    expect(observed.observeReply).toEqual({ protocol_version: 1, op: "observe", request_id: "oo", output: { status: "unsupported" } });
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

  it("the receipt's repaired SDK copy follows the wb-zmd helper's recipe: the same digests, and both decode the context the shipped SDK refuses", async () => {
    const helper = await loadRepairedFurnaceSdk();
    try {
      expect(repaired.repairedDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
      expect(repaired.repairedDigest).toBe(helper.repairedDigest);
      expect(repaired.shippedManifestDigest).toBe(helper.shippedManifestDigest);
      expect(repaired.repairedDigest).not.toBe(repaired.shippedManifestDigest);
      expect(Object.keys(repaired.sdk).sort()).toEqual(["EmbeddedHost", "ExecutionResult", "ExecutorApp", "Furnace", "ResidentSession", "decodeContextValue"]);
      const document = {
        context_version: 1,
        run: { furnace_run_id: "frn-run-x", beads_run_id: "bd-run-x", formula: null },
        work: { beads_work_id: "bd-work-x", title: null, description: null, acceptance_criteria: null },
        attempt: { attempt_id: "frn-atm-x", ordinal: 1, deadline: null },
        workspace: { root: "/" },
      };
      expect(() => SHIPPED_FURNACE_SDK.decodeContextValue(document)).toThrow();
      expect(repaired.sdk.decodeContextValue(document).context.attempt.attempt_id).toBe("frn-atm-x");
      expect(helper.sdk.decodeContextValue(document).context.attempt.attempt_id).toBe("frn-atm-x");
    } finally {
      rmSync(dirname(helper.root), { recursive: true, force: true });
    }
  });

  it("the five journeys the receipt runner measures satisfy the receipt judge here in the default gate (realised, no finding)", async () => {
    expect(Object.keys(RETRY_FAULT_JOURNEY_RUNNERS)).toEqual([...RETRY_FAULT_JOURNEYS]);
    const journeys: Record<string, unknown> = {};
    for (const name of RETRY_FAULT_JOURNEYS) journeys[name] = await RETRY_FAULT_JOURNEY_RUNNERS[name as keyof typeof RETRY_FAULT_JOURNEY_RUNNERS](env);
    const assessed = assessRetryFaultJourneys({ journeys, sdk: { copy: "repaired", repairedDigest: repaired.repairedDigest, shippedManifestDigest: repaired.shippedManifestDigest } });
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
  }, 30_000);
});
