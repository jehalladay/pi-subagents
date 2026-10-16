/**
 * wb-0kg.7 (VC-7 / W18-E): shared-child cancellation-ownership conformance receipt.
 *
 * Spec lines pinned (docs/workbench/08-lifecycle-and-recovery.md "Cancellation and ownership"):
 *   "Multi-reader shared child MUST NOT be stopped merely because one reader closed Pi or stopped waiting.
 *    Child cancellation depends on explicit native owner rights and native API semantics."
 * (docs/workbench/14-qa-and-benchmarks.md "Fault-injection locations"):
 *   "Concurrent readers with one shared child; stopping one reader must not stop child without ownership."
 * (docs/workbench/09-observation-and-provenance.md "Acceptance/negative controls" item 8):
 *   "Closing observer causes zero cancellation calls."
 *
 * Offline: the pure judge is driven with a clean observed fixture and one mutant per rule, so a judge
 * that reported a constant would fail here. The runner is read as text only; the real child processes,
 * real reader exits and the control seam ledger are exercised by `forge run local-detached-shared-child`.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessSharedChildJourneys,
  buildSharedChildReceipt,
  SHARED_CHILD_CASES,
  SHARED_CHILD_FINDING_RULES,
  SHARED_CHILD_RECEIPT_CONTRACT,
} from "../qa/workbench/local-detached-shared-child-receipt.mjs";

interface ReaderCloseCase {
  name: string;
  when: "before" | "after";
  close: "pi-exit" | "stop-waiting";
  invocationId: string;
  readers: number;
  hostPid: number;
  markersAtClose: number;
  markersAfterClose: number;
  hostAliveAfterClose: boolean;
  observationAfterClose: string;
  cancellationRequestedAfterClose: boolean;
  controlAuditAfterClose: unknown[];
  observerCancelCalls: number;
  observerShutdownCalls: number;
  terminal: string;
  markersFinal: number;
  childTerminalMs: number;
}
interface Refusal {
  rejected: boolean;
  category: string;
  diagnostic: string;
}
interface Observed {
  markerCounts: Record<string, number>;
  journeys: {
    readerClose: { armed: boolean; cases: ReaderCloseCase[] };
    nonOwnerStop: {
      armed: boolean;
      invocationId: string;
      cancelRefusal: Refusal;
      shutdownRefusal: Refusal;
      observationAfter: string;
      cancellationRequested: boolean;
      controlAudit: unknown[];
      markersFinal: number;
      terminal: string;
    };
    ownerStop: {
      armed: boolean;
      invocationId: string;
      readerClosedFirst: boolean;
      markersBeforeStop: number;
      terminalBeforeStop: string | null;
      cancel: { accepted: boolean; terminalConfirmed: boolean };
      cancellationRequestedAtFirstInspect: boolean;
      terminal: string;
      controlAudit: { command: string; accepted: boolean; ownership: string; terminalConfirmed: boolean }[];
      markersFinal: number;
    };
  };
}

const clone = <T>(value: T): T => structuredClone(value);

function closeCase(when: "before" | "after", close: "pi-exit" | "stop-waiting"): ReaderCloseCase {
  const name = `${close}-${when}-effect`;
  return {
    name,
    when,
    close,
    invocationId: `shared-${name}`,
    readers: 2,
    hostPid: 4242,
    markersAtClose: when === "after" ? 1 : 0,
    markersAfterClose: when === "after" ? 1 : 0,
    hostAliveAfterClose: true,
    observationAfterClose: when === "after" ? "observed-running" : "observed-started",
    cancellationRequestedAfterClose: false,
    controlAuditAfterClose: [],
    observerCancelCalls: 0,
    observerShutdownCalls: 0,
    terminal: "completed",
    markersFinal: 1,
    childTerminalMs: 2600,
  };
}

function clean(): Observed {
  const cases = SHARED_CHILD_CASES.map((entry: { when: "before" | "after"; close: "pi-exit" | "stop-waiting" }) => closeCase(entry.when, entry.close));
  const markerCounts: Record<string, number> = { "shared-owner": 1, "shared-nonowner": 1 };
  for (const entry of cases) markerCounts[entry.invocationId] = 1;
  return {
    markerCounts,
    journeys: {
      readerClose: { armed: true, cases },
      nonOwnerStop: {
        armed: true,
        invocationId: "shared-nonowner",
        cancelRefusal: { rejected: true, category: "authorization", diagnostic: "Detached authorization: Invocation cancel grant denied." },
        shutdownRefusal: { rejected: true, category: "authorization", diagnostic: "Detached authorization: Invocation shutdown grant denied." },
        observationAfter: "observed-running",
        cancellationRequested: false,
        controlAudit: [],
        markersFinal: 1,
        terminal: "completed",
      },
      ownerStop: {
        armed: true,
        invocationId: "shared-owner",
        readerClosedFirst: true,
        markersBeforeStop: 1,
        terminalBeforeStop: null,
        cancel: { accepted: true, terminalConfirmed: false },
        cancellationRequestedAtFirstInspect: true,
        terminal: "cancelled",
        controlAudit: [{ command: "cancel", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false }],
        markersFinal: 1,
      },
    },
  };
}

function rules(observed: Observed): string[] {
  return assessSharedChildJourneys(observed).findings.map((finding: { rule: string }) => finding.rule);
}

function receiptInput(observed: Observed) {
  return { utc: "2026-10-15T14:00:00.000Z", revision: "working-tree", node: "v24.0.0", arch: "x64", platform: "linux", ...observed };
}

function readRepo(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

function specifiersOf(source: string): string[] {
  const found: string[] = [];
  for (const match of source.matchAll(/(?:^|[;\s])(?:import|export)\b[^'"`;]*?from\s*(['"])([^'"]+)\1/gm)) found.push(match[2]);
  for (const match of source.matchAll(/(?:^|[;\s])import\s*(['"])([^'"]+)\1/gm)) found.push(match[2]);
  return found;
}

describe("shared-child receipt: judge falsifiers", () => {
  it("passes a clean fixture covering reader-close before and after the first effect marker for both close kinds", () => {
    const assessed = assessSharedChildJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
    const names = clean().journeys.readerClose.cases.map((entry) => `${entry.when}/${entry.close}`).sort();
    expect(names).toEqual(["after/pi-exit", "after/stop-waiting", "before/pi-exit", "before/stop-waiting"]);
  });

  it("exports a stable rule roster", () => {
    for (const rule of [
      "child-stopped-by-reader-close",
      "duplicate-effect",
      "effect-lost",
      "observer-close-control-call",
      "child-no-own-terminal",
      "non-owner-stop-accepted",
      "non-owner-refusal-untyped",
      "non-owner-child-disturbed",
      "owner-stop-not-effective",
      "owner-stop-phase-collapsed",
      "owner-stop-unaudited",
      "owner-stop-unrequested",
    ]) {
      expect(SHARED_CHILD_FINDING_RULES).toContain(rule);
    }
  });

  it("flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)", () => {
    const dead = clone(clean());
    dead.journeys.readerClose.cases[0].hostAliveAfterClose = false;
    expect(rules(dead)).toContain("child-stopped-by-reader-close");
    const cancelled = clone(clean());
    cancelled.journeys.readerClose.cases[1].terminal = "cancelled";
    expect(rules(cancelled)).toContain("child-stopped-by-reader-close");
    const requested = clone(clean());
    requested.journeys.readerClose.cases[2].cancellationRequestedAfterClose = true;
    expect(rules(requested)).toContain("child-stopped-by-reader-close");
    const unknown = clone(clean());
    unknown.journeys.readerClose.cases[3].observationAfterClose = "unknown";
    expect(rules(unknown)).toContain("child-stopped-by-reader-close");
  });

  it("flags a second marker for one invocation, anywhere, as duplicate-effect", () => {
    const counts = clone(clean());
    counts.markerCounts["shared-owner"] = 2;
    expect(rules(counts)).toContain("duplicate-effect");
    const afterClose = clone(clean());
    afterClose.journeys.readerClose.cases[0].markersAfterClose = 2;
    expect(rules(afterClose)).toContain("duplicate-effect");
    const final = clone(clean());
    final.journeys.readerClose.cases[1].markersFinal = 2;
    expect(rules(final)).toContain("duplicate-effect");
  });

  it("flags a missing marker after the effect should have happened as effect-lost", () => {
    const lost = clone(clean());
    lost.journeys.readerClose.cases[0].markersFinal = 0;
    expect(rules(lost)).toContain("effect-lost");
    const owner = clone(clean());
    owner.journeys.ownerStop.markersFinal = 0;
    expect(rules(owner)).toContain("effect-lost");
  });

  it("flags any observer-side cancel or shutdown call, or a control audit entry after a reader close", () => {
    const cancelCall = clone(clean());
    cancelCall.journeys.readerClose.cases[0].observerCancelCalls = 1;
    expect(rules(cancelCall)).toContain("observer-close-control-call");
    const shutdownCall = clone(clean());
    shutdownCall.journeys.readerClose.cases[2].observerShutdownCalls = 1;
    expect(rules(shutdownCall)).toContain("observer-close-control-call");
    const audited = clone(clean());
    audited.journeys.readerClose.cases[3].controlAuditAfterClose = [{ command: "cancel" }];
    expect(rules(audited)).toContain("observer-close-control-call");
  });

  it("flags a child that never reached its own completed terminal after the readers left", () => {
    const failed = clone(clean());
    failed.journeys.readerClose.cases[0].terminal = "failed";
    expect(rules(failed)).toContain("child-no-own-terminal");
    const nonOwner = clone(clean());
    nonOwner.journeys.nonOwnerStop.terminal = "unknown";
    expect(rules(nonOwner)).toContain("child-no-own-terminal");
  });

  it("flags a non-owner stop that was accepted, untyped, or that disturbed the child", () => {
    const accepted = clone(clean());
    accepted.journeys.nonOwnerStop.cancelRefusal.rejected = false;
    expect(rules(accepted)).toContain("non-owner-stop-accepted");
    const shutdown = clone(clean());
    shutdown.journeys.nonOwnerStop.shutdownRefusal.rejected = false;
    expect(rules(shutdown)).toContain("non-owner-stop-accepted");
    const untyped = clone(clean());
    untyped.journeys.nonOwnerStop.cancelRefusal.category = "validation";
    expect(rules(untyped)).toContain("non-owner-refusal-untyped");
    const vague = clone(clean());
    vague.journeys.nonOwnerStop.shutdownRefusal.diagnostic = "boom";
    expect(rules(vague)).toContain("non-owner-refusal-untyped");
    const requested = clone(clean());
    requested.journeys.nonOwnerStop.cancellationRequested = true;
    expect(rules(requested)).toContain("non-owner-child-disturbed");
    const audited = clone(clean());
    audited.journeys.nonOwnerStop.controlAudit = [{ command: "cancel" }];
    expect(rules(audited)).toContain("non-owner-child-disturbed");
    const stopped = clone(clean());
    stopped.journeys.nonOwnerStop.observationAfter = "observed-terminal";
    expect(rules(stopped)).toContain("non-owner-child-disturbed");
  });

  it("flags an owner stop that was refused, did not end the child cancelled, or collapsed its phases", () => {
    const refused = clone(clean());
    refused.journeys.ownerStop.cancel.accepted = false;
    expect(rules(refused)).toContain("owner-stop-not-effective");
    const notCancelled = clone(clean());
    notCancelled.journeys.ownerStop.terminal = "completed";
    expect(rules(notCancelled)).toContain("owner-stop-not-effective");
    const collapsed = clone(clean());
    collapsed.journeys.ownerStop.cancel.terminalConfirmed = true;
    expect(rules(collapsed)).toContain("owner-stop-phase-collapsed");
    const notRequested = clone(clean());
    notRequested.journeys.ownerStop.cancellationRequestedAtFirstInspect = false;
    expect(rules(notRequested)).toContain("owner-stop-phase-collapsed");
  });

  it("flags an owner stop with no audit entry, or an audit with more than the one explicit cancel", () => {
    const none = clone(clean());
    none.journeys.ownerStop.controlAudit = [];
    expect(rules(none)).toContain("owner-stop-unaudited");
    const extra = clone(clean());
    extra.journeys.ownerStop.controlAudit.push({ command: "shutdown", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false });
    expect(rules(extra)).toContain("owner-stop-unaudited");
  });

  it("flags a child that was already terminal or cancelled before the explicit owner stop", () => {
    const early = clone(clean());
    early.journeys.ownerStop.terminalBeforeStop = "cancelled";
    expect(rules(early)).toContain("owner-stop-unrequested");
    const noReaderClose = clone(clean());
    noReaderClose.journeys.ownerStop.readerClosedFirst = false;
    expect(rules(noReaderClose)).toContain("owner-stop-unrequested");
  });

  it("is not realised when a journey is missing or unarmed, or a close combination is absent, and produces no finding for it", () => {
    for (const key of ["readerClose", "nonOwnerStop", "ownerStop"] as const) {
      const unarmed = clone(clean());
      unarmed.journeys[key].armed = false;
      const assessed = assessSharedChildJourneys(unarmed);
      expect(assessed.realised).toBe(false);
      expect(assessed.findings).toEqual([]);
    }
    const missingCase = clone(clean());
    missingCase.journeys.readerClose.cases.pop();
    expect(assessSharedChildJourneys(missingCase).realised).toBe(false);
    const oneReader = clone(clean());
    oneReader.journeys.readerClose.cases[0].readers = 1;
    expect(assessSharedChildJourneys(oneReader).realised).toBe(false);
    expect(assessSharedChildJourneys({ journeys: {}, markerCounts: {} }).realised).toBe(false);
    expect(assessSharedChildJourneys(undefined as never).realised).toBe(false);
  });
});

describe("shared-child receipt: evidence-grade shape", () => {
  it("builds a frozen passing receipt carrying timings, pids, marker counts and the control ledger", () => {
    const receipt = buildSharedChildReceipt(receiptInput(clean()));
    expect(receipt.contract).toBe(SHARED_CHILD_RECEIPT_CONTRACT);
    expect(SHARED_CHILD_RECEIPT_CONTRACT).toBe("workbench.detached-shared-child/v1");
    for (const field of ["utc", "revision", "node", "arch", "platform", "journeys", "markerCounts", "findings", "diagnostics", "realised", "pass"]) {
      expect(receipt).toHaveProperty(field);
    }
    expect(receipt.pass).toBe(true);
    expect(receipt.realised).toBe(true);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys)).toBe(true);
    expect(receipt.journeys.readerClose.cases[0].hostPid).toBe(4242);
    expect(receipt.journeys.readerClose.cases[0].childTerminalMs).toBe(2600);
    expect(receipt.journeys.ownerStop.controlAudit).toHaveLength(1);
    expect(receipt.markerCounts["shared-owner"]).toBe(1);
  });

  it("does not pass with findings, nor when not realised", () => {
    const duplicate = clone(clean());
    duplicate.markerCounts["shared-owner"] = 2;
    const withFindings = buildSharedChildReceipt(receiptInput(duplicate));
    expect(withFindings.realised).toBe(true);
    expect(withFindings.pass).toBe(false);
    const unarmed = clone(clean());
    unarmed.journeys.ownerStop.armed = false;
    const notRealised = buildSharedChildReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(notRealised.pass).toBe(false);
  });

  it("reduces absolute paths in diagnostics to basenames and rejects a receipt without identifying fields", () => {
    const observed = clone(clean());
    observed.journeys.nonOwnerStop.cancelRefusal.diagnostic = "denied at /tmp/wb-shared-abc/hosts/shared-nonowner/invocation.json";
    const text = JSON.stringify(buildSharedChildReceipt(receiptInput(observed)));
    expect(text).not.toMatch(/\/tmp\/|wb-shared-abc\/hosts/);
    expect(text).toContain("invocation.json");
    expect(() => buildSharedChildReceipt({ ...receiptInput(clean()), utc: "" })).toThrow(/utc/);
  });
});

describe("shared-child receipt: module and runner boundaries", () => {
  const receiptModule = readRepo("qa/workbench/local-detached-shared-child-receipt.mjs");
  const runner = readRepo("qa/workbench/local-detached-shared-child.mjs");

  it("keeps the receipt module pure: its only import is the wb-0kg.1 fault receipt, no clock or random source", () => {
    expect(specifiersOf(receiptModule)).toEqual(["./local-detached-faults-receipt.mjs"]);
    expect(receiptModule).not.toMatch(/\brequire\s*\(|\bimport\s*\(/);
    expect(receiptModule).not.toMatch(/Date\.now|new Date\(|Math\.random/);
  });

  it("reuses the wb-0kg.1 fixture and defines no second provider fixture", () => {
    expect(runner).toContain("faultProviderSource");
    expect(specifiersOf(runner)).toContain("./local-detached-faults-receipt.mjs");
    expect(runner).not.toMatch(/registry\.register|effectClass\s*:\s*["']write["']/);
    expect(runner).not.toMatch(/\bsrc\//);
    expect(runner).not.toMatch(/\brequire\s*\(/);
    expect(runner.match(/import\(/g) ?? []).toHaveLength(1);
    expect(runner).toContain("../../dist/workbench/hosts/local-detached.js");
  });

  it("counts observer control calls at the client seam and cleans up in finally", () => {
    expect(runner).toMatch(/observerCancelCalls/);
    expect(runner).toMatch(/observerShutdownCalls/);
    expect(runner).toMatch(/finally\s*\{/);
    expect(runner).toMatch(/rmSync\(/);
    expect(runner).toContain("DETACHED_SHARED_CHILD_RECEIPT");
    expect(runner).toContain("0o700");
  });

  it("registers the runner as one additive Forge command outside the default gate", () => {
    const forge = readRepo("forge.toml");
    expect(forge).toContain(
      '[build.commands.local-detached-shared-child]\ncommand = "node qa/workbench/local-detached-shared-child.mjs"\ntimeout = 240\n',
    );
    expect(forge.match(/\[build\.commands\.local-detached-shared-child\]/g)).toHaveLength(1);
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("local-detached-shared-child");
  });
});
