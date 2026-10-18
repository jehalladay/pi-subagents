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
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  assessSharedChildJourneys,
  buildSharedChildReceipt,
  exitCodeFor,
  reachedTerminal,
  SHARED_CHILD_CASES,
  SHARED_CHILD_FINDING_RULES,
  SHARED_CHILD_OWNERSHIP_MODEL,
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
      hostPid: number;
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
      hostPid: number;
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
        hostPid: 5151,
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
        hostPid: 5252,
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
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("local-detached-shared-child");
  });
});

/**
 * wb-p5a (wb-0kg.7 gate F1/F5/F6): judge-clause pins. The 12 survivors of the 0kg.7 gate mutant table were
 * clauses the offline suite never read: the runner exit mapping (a judge that cannot fail cannot certify),
 * the "after" effect marker at close, the owner audit entry's identity and acceptance, hostPid on the
 * stop journeys and the ownership-model label. Each case below fails when its clause is mutated.
 */
describe("shared-child receipt: judge-clause pins (wb-p5a)", () => {
  it("maps the runner exit code from the receipt: 0 realised and clean, 1 realised with findings, 2 not realised (X1, X2)", () => {
    expect(exitCodeFor(buildSharedChildReceipt(receiptInput(clean())))).toBe(0);
    const duplicate = clone(clean());
    duplicate.markerCounts["shared-owner"] = 2;
    const withFindings = buildSharedChildReceipt(receiptInput(duplicate));
    expect(withFindings.realised).toBe(true);
    expect(withFindings.findings.length).toBeGreaterThan(0);
    expect(exitCodeFor(withFindings)).toBe(1);
    const unarmed = clone(clean());
    unarmed.journeys.ownerStop.armed = false;
    const notRealised = buildSharedChildReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(exitCodeFor(notRealised)).toBe(2);
    const both = clone(clean());
    both.journeys.ownerStop.armed = false;
    both.markerCounts["shared-owner"] = 2;
    const notRealisedWithFindings = buildSharedChildReceipt(receiptInput(both));
    expect(notRealisedWithFindings.findings.length).toBeGreaterThan(0);
    expect(exitCodeFor(notRealisedWithFindings)).toBe(2);
  });

  it("requires the effect marker at close in the 'after' cases only (X3)", () => {
    const after = clone(clean());
    const afterCase = after.journeys.readerClose.cases.find((entry) => entry.when === "after");
    if (afterCase === undefined) throw new Error("fixture has no after case");
    afterCase.markersAtClose = 0;
    expect(rules(after)).toContain("effect-lost");
    const before = clone(clean());
    const beforeCase = before.journeys.readerClose.cases.find((entry) => entry.when === "before");
    if (beforeCase === undefined) throw new Error("fixture has no before case");
    expect(beforeCase.markersAtClose).toBe(0);
    expect(rules(before)).not.toContain("effect-lost");
  });

  it("requires the one owner audit entry to be the accepted cancel, not any single entry (X7, X8)", () => {
    const wrongCommand = clone(clean());
    wrongCommand.journeys.ownerStop.controlAudit = [{ command: "shutdown", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false }];
    expect(rules(wrongCommand)).toContain("owner-stop-unaudited");
    const refusedEntry = clone(clean());
    refusedEntry.journeys.ownerStop.controlAudit = [{ command: "cancel", accepted: false, ownership: "owned-local-interpreter-only", terminalConfirmed: false }];
    expect(rules(refusedEntry)).toContain("owner-stop-unaudited");
    const hollow = clone(clean());
    hollow.journeys.ownerStop.controlAudit = [null as never];
    expect(rules(hollow)).toContain("owner-stop-unaudited");
    expect(rules(clean())).not.toContain("owner-stop-unaudited");
  });

  it("requires a marker before the owner stop, not only at the end, and exactly one terminal-before-stop null", () => {
    const lateEffect = clone(clean());
    lateEffect.journeys.ownerStop.markersBeforeStop = 0;
    expect(rules(lateEffect)).toContain("effect-lost");
    const absent = clone(clean());
    delete (absent.journeys.ownerStop as { terminalBeforeStop?: unknown }).terminalBeforeStop;
    expect(rules(absent)).toContain("owner-stop-unrequested");
  });

  it("names an unknown reader-close terminal as a stopped child, and a non-owner child's marker count as lost or duplicated", () => {
    const unknown = clone(clean());
    unknown.journeys.readerClose.cases[0].terminal = "unknown";
    expect(rules(unknown)).toContain("child-stopped-by-reader-close");
    const lost = clone(clean());
    lost.journeys.nonOwnerStop.markersFinal = 0;
    expect(rules(lost)).toContain("effect-lost");
    const duplicated = clone(clean());
    duplicated.journeys.nonOwnerStop.markersFinal = 2;
    expect(rules(duplicated)).toContain("duplicate-effect");
  });

  it("keeps hostPid on both stop journeys and runs the receipt through unchanged (F6)", () => {
    const observed = clone(clean());
    observed.journeys.nonOwnerStop.hostPid = 6161;
    observed.journeys.ownerStop.hostPid = 6262;
    const receipt = buildSharedChildReceipt(receiptInput(observed));
    expect(receipt.journeys.nonOwnerStop.hostPid).toBe(6161);
    expect(receipt.journeys.ownerStop.hostPid).toBe(6262);
    const runner = readRepo("qa/workbench/local-detached-shared-child.mjs");
    for (const [name, next] of [
      ["nonOwnerStopJourney", "ownerStopJourney"],
      ["ownerStopJourney", "arrayOf"],
    ] as const) {
      const start = runner.indexOf(`async function ${name}`);
      const end = runner.indexOf(`function ${next}`, start);
      expect(start).toBeGreaterThan(-1);
      expect(end).toBeGreaterThan(start);
      const body = runner.slice(start, end);
      expect(body, `${name} launches and keeps the host receipt`).toMatch(/const receipt = await launch\(/);
      expect(body, `${name} records hostPid`).toMatch(/hostPid:\s*receipt\.pid/);
    }
  });

  it("labels the ownership model as a per-invocation grant, not per-reader identity (F5, R4)", () => {
    expect(SHARED_CHILD_OWNERSHIP_MODEL).toBe("per-invocation-grant");
    const receipt = buildSharedChildReceipt(receiptInput(clean()));
    expect(receipt.ownershipModel).toBe("per-invocation-grant");
    expect(Object.isFrozen(receipt)).toBe(true);
  });
});

/**
 * wb-p5a respin (gate-3 verdict 2026-10-16T11:04:44Z; owner ruling 11:13Z; reopened on the wb-0kg.10 RESPIN verdict 15:34Z).
 *
 * M1 (bound 00:01Z, red-first): "ownerStopJourney still waits snapshot.terminal === 'cancelled' and arms on finished.ok - a
 * fabricated non-cancelled owner terminal exits 2, not 1. Pin it red-first and re-key the arming on any reached terminal."
 * docs/workbench/08: "Child cancellation depends on explicit native owner rights and native API semantics."
 *
 * O1 (gate F1, bound by the owner): "make hostPid load-bearing or parse-aware pin, red-first vs R3/R4/R5; the live judge never
 * reading hostPid is the vacuity the third leg exists for". Both cures ride: the judge now reads every hostPid the receipt
 * records, and the runner pins below read parsed code nodes, so a commented-out hostPid line (R3), a nulled value (R4) or a
 * severed launch receipt (R5) goes red offline as well as live.
 *
 * O2 (gate F3, bound by the owner): the X6, X11 and X12 survivors of the wb-0kg.7 gate table, one row each.
 */

/** The runner parsed by the TypeScript compiler: the runner pins read code nodes, never comments or dead copies. */
function runnerAst(): ts.SourceFile {
  return ts.createSourceFile(
    "local-detached-shared-child.mjs",
    readRepo("qa/workbench/local-detached-shared-child.mjs"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
}

function nodesOf<T extends ts.Node>(root: ts.Node, test: (node: ts.Node) => node is T, found: T[] = []): T[] {
  if (test(root)) found.push(root);
  ts.forEachChild(root, (child) => {
    nodesOf(child, test, found);
  });
  return found;
}

function runnerFunction(file: ts.SourceFile, name: string): ts.FunctionDeclaration {
  const declared = file.statements.filter(ts.isFunctionDeclaration).filter((fn) => fn.name?.text === name);
  expect(declared, `exactly one top-level ${name}()`).toHaveLength(1);
  return declared[0];
}

/** The journey record a runner function returns as its final statement. */
function returnedRecord(fn: ts.FunctionDeclaration): ts.ObjectLiteralExpression {
  const last = fn.body?.statements.at(-1);
  if (last === undefined || !ts.isReturnStatement(last) || last.expression === undefined || !ts.isObjectLiteralExpression(last.expression)) {
    throw new Error(`${fn.name?.text ?? "function"} must end by returning its journey record as an object literal`);
  }
  return last.expression;
}

/** Source text of the initializer of every property assignment named `name` in a record: a comment is never one. */
function propertyInitializers(record: ts.ObjectLiteralExpression, file: ts.SourceFile, name: string): string[] {
  return record.properties
    .filter(ts.isPropertyAssignment)
    .filter((property) => ts.isIdentifier(property.name) && property.name.text === name)
    .map((property) => property.initializer.getText(file));
}

/** Every variable named `name` declared anywhere inside a function. */
function declarationsNamed(fn: ts.FunctionDeclaration, name: string): ts.VariableDeclaration[] {
  return nodesOf(fn, ts.isVariableDeclaration).filter((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name);
}

const EQUALITY: readonly ts.SyntaxKind[] = [
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
];

describe("shared-child receipt: respin pins (wb-p5a M1, O1, O2)", () => {
  it("reachedTerminal is true for every terminal string and false when no terminal is present (M1)", () => {
    for (const terminal of ["unknown", "completed", "failed", "cancelled"]) expect(reachedTerminal({ terminal })).toBe(true);
    for (const snapshot of [{}, { terminal: "" }, { terminal: 3 }, { terminal: null }, null, undefined]) {
      expect(reachedTerminal(snapshot)).toBe(false);
    }
  });

  it("judges an ARMED owner stop whose host ended in a non-cancelled terminal as realised with owner-stop-not-effective: exit 1, never 2 (M1)", () => {
    for (const terminal of ["completed", "failed", "unknown"]) {
      const observed = clone(clean());
      observed.journeys.ownerStop.terminal = terminal;
      const receipt = buildSharedChildReceipt(receiptInput(observed));
      expect(receipt.realised, terminal).toBe(true);
      expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain("owner-stop-not-effective");
      expect(exitCodeFor(receipt)).toBe(1);
    }
  });

  it("the runner arms the owner stop on ANY reached terminal through the judge module's reachedTerminal, never on a literal terminal (M1)", () => {
    const file = runnerAst();
    const owner = runnerFunction(file, "ownerStopJourney");
    // The wait the journey arms on: its WHOLE predicate is the shared reachedTerminal, so a host that fabricates a completed,
    // failed or unknown terminal after the explicit owner cancel is armed and judged (exit 1), never left unarmed (exit 2).
    expect(declarationsNamed(owner, "finished").map((declaration) => declaration.initializer?.getText(file))).toEqual([
      "await until(() => owner.inspect(), reachedTerminal)",
    ]);
    const record = returnedRecord(owner);
    expect(propertyInitializers(record, file, "armed")).toEqual(["live.ok && finished.ok && closed.report.attached === true"]);
    expect(propertyInitializers(record, file, "terminal")).toEqual(["finished.value.terminal ?? 'none'"]);
    // The runner records the terminal; it never compares one (the judge decides what a terminal means).
    const comparisons = nodesOf(owner, ts.isBinaryExpression).filter(
      (binary) =>
        EQUALITY.includes(binary.operatorToken.kind) &&
        [binary.left, binary.right].some((side) => ts.isPropertyAccessExpression(side) && side.name.text === "terminal"),
    );
    expect(comparisons.map((binary) => binary.getText(file))).toEqual([]);
    // The predicate is the judge module's unit-pinned export, imported once and never redefined in the runner.
    const imports = file.statements
      .filter(ts.isImportDeclaration)
      .filter((declaration) => ts.isStringLiteral(declaration.moduleSpecifier) && declaration.moduleSpecifier.text === "./local-detached-shared-child-receipt.mjs");
    expect(imports).toHaveLength(1);
    const bindings = imports[0].importClause?.namedBindings;
    const imported = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map((element) => element.name.text) : [];
    expect(imported).toContain("reachedTerminal");
    const redefined = [
      ...nodesOf(file, ts.isVariableDeclaration).map((declaration) => declaration.name.getText(file)),
      ...nodesOf(file, ts.isFunctionDeclaration).map((declaration) => declaration.name?.text ?? ""),
    ].filter((name) => name === "reachedTerminal");
    expect(redefined).toEqual([]);
  });

  it("treats the host pid as evidence: a stop journey or reader-close case whose hostPid is not a positive integer is not realised, and never a finding (O1)", () => {
    expect(assessSharedChildJourneys(clean()).realised).toBe(true);
    const journeysOf: ((observed: Observed) => object)[] = [
      (observed) => observed.journeys.nonOwnerStop,
      (observed) => observed.journeys.ownerStop,
      ...[0, 1, 2, 3].map((index) => (observed: Observed): object => observed.journeys.readerClose.cases[index]),
    ];
    const missing = Symbol("missing");
    for (const value of [missing, undefined, null, 0, -5151, 51.5, Number.NaN, Number.POSITIVE_INFINITY, "5151", 2 ** 53]) {
      journeysOf.forEach((journeyOf, index) => {
        const observed = clone(clean());
        const journey = journeyOf(observed);
        if (value === missing) Reflect.deleteProperty(journey, "hostPid");
        else Reflect.set(journey, "hostPid", value);
        const assessed = assessSharedChildJourneys(observed);
        expect(assessed.realised, `journey ${index} hostPid ${String(value)}`).toBe(false);
        expect(assessed.findings).toEqual([]);
      });
    }
    const nulled = clone(clean());
    Reflect.set(nulled.journeys.ownerStop, "hostPid", null);
    expect(exitCodeFor(buildSharedChildReceipt(receiptInput(nulled)))).toBe(2);
  });

  it("the runner records each journey's hostPid from that journey's own launch receipt, in parsed code (O1 vs R3, R4, R5)", () => {
    const file = runnerAst();
    for (const name of ["readerCloseCase", "nonOwnerStopJourney", "ownerStopJourney"]) {
      const fn = runnerFunction(file, name);
      // R5 (a severed receipt such as `await launch(...) && {}`): the receipt is exactly the awaited launch() call, bound once, const.
      const receipts = declarationsNamed(fn, "receipt");
      expect(receipts, `${name} binds exactly one launch receipt`).toHaveLength(1);
      const initializer = receipts[0].initializer;
      const awaitedLaunch =
        initializer !== undefined &&
        ts.isAwaitExpression(initializer) &&
        ts.isCallExpression(initializer.expression) &&
        ts.isIdentifier(initializer.expression.expression) &&
        initializer.expression.expression.text === "launch";
      expect(awaitedLaunch, `${name}: the receipt is the awaited launch() call itself`).toBe(true);
      expect(receipts[0].parent.flags & ts.NodeFlags.Const, `${name}: the receipt binding is const`).toBe(ts.NodeFlags.Const);
      // R3 (the hostPid line commented out) and R4 (a nulled value such as `receipt.pid && null`): exactly receipt.pid.
      expect(propertyInitializers(returnedRecord(fn), file, "hostPid"), `${name} records hostPid`).toEqual(["receipt.pid"]);
    }
  });

  it("is not realised when one reader-close combination is recorded twice, even with every case clean (X6)", () => {
    const duplicated = clone(clean());
    duplicated.journeys.readerClose.cases.push(clone(duplicated.journeys.readerClose.cases[0]));
    const assessed = assessSharedChildJourneys(duplicated);
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(false);
  });

  it("flags a second marker on the owner journey itself as duplicate-effect while the top-level count still reads one (X11)", () => {
    const owner = clone(clean());
    owner.journeys.ownerStop.markersFinal = 2;
    expect(owner.markerCounts["shared-owner"]).toBe(1);
    expect(rules(owner)).toContain("duplicate-effect");
  });

  it("reduces an absolute path in the top-level diagnostics to its basename (X12)", () => {
    const receipt = buildSharedChildReceipt({
      ...receiptInput(clean()),
      diagnostics: ["shared-owner: the child did not reach a terminal; see /tmp/wb-shared-x12/hosts/shared-owner/invocation.json"],
    });
    expect(receipt.diagnostics).toEqual(["shared-owner: the child did not reach a terminal; see invocation.json"]);
    expect(JSON.stringify(receipt)).not.toMatch(/\/tmp\/|wb-shared-x12\/hosts/);
  });
});

/**
 * wb-70b F2 (wb-19q member 6): the shared-child R1 member roots the fixture through shortScratchRoot('wb-shared-') -
 * XDG_RUNTIME_DIR first, /tmp as the recorded fallback, never a mkdtempSync under the inherited tmpdir() - and until this
 * row its only falsifier was the live tier (a receipt run under a long TMPDIR; gate cmd_f527615fc5b6). The row below states
 * the three facts as text and again in the parsed runner (p5a's runnerAst), so a root reverted to
 * mkdtempSync(join(tmpdir(), 'wb-shared-')) - at top level, beside a dead copy of the helper, or inside a rewritten helper
 * that no longer tries XDG_RUNTIME_DIR first - fails offline as well as live.
 */
describe("shared-child receipt: fixture-root pin (wb-70b F2)", () => {
  /** Source text of the argument list of every mkdtempSync(...) call under `root`, in source order. */
  function mkdtempArguments(file: ts.SourceFile, root: ts.Node): string[] {
    return nodesOf(root, ts.isCallExpression)
      .filter((call) => ts.isIdentifier(call.expression) && call.expression.text === "mkdtempSync")
      .map((call) => call.arguments.map((argument) => argument.getText(file)).join(", "));
  }

  /** The initializer text of every top-level variable named `name`. */
  function topLevelInitializers(file: ts.SourceFile, name: string): string[] {
    return file.statements
      .filter(ts.isVariableStatement)
      .flatMap((statement) => statement.declarationList.declarations)
      .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name)
      .map((declaration) => declaration.initializer?.getText(file) ?? "");
  }

  it("roots the fixture through shortScratchRoot('wb-shared-'): XDG_RUNTIME_DIR first, /tmp the recorded fallback, never mkdtempSync under the inherited tmpdir() (F2)", () => {
    const runner = readRepo("qa/workbench/local-detached-shared-child.mjs");
    // The three facts as text.
    expect(runner).toContain("const scratch = shortScratchRoot('wb-shared-');");
    expect(runner).not.toMatch(/mkdtempSync\(join\(tmpdir\(\)/);
    const xdgRead = runner.indexOf("process.env.XDG_RUNTIME_DIR");
    const tmpFallback = runner.indexOf("mkdtempSync(join('/tmp', prefix))");
    expect(xdgRead).toBeGreaterThan(-1);
    expect(tmpFallback).toBeGreaterThan(xdgRead);
    // The same facts in parsed code, where a comment or a dead copy of the helper counts for nothing.
    const file = runnerAst();
    expect(topLevelInitializers(file, "scratch")).toEqual(["shortScratchRoot('wb-shared-')"]);
    expect(topLevelInitializers(file, "directory")).toEqual(["scratch.directory"]);
    const helper = runnerFunction(file, "shortScratchRoot");
    expect(declarationsNamed(helper, "runtime").map((declaration) => declaration.initializer?.getText(file))).toEqual(["process.env.XDG_RUNTIME_DIR"]);
    // Every mkdtempSync call of the runner lives in the helper, the XDG_RUNTIME_DIR one first; the /tmp one is its final, recorded fallback.
    expect(mkdtempArguments(file, helper)).toEqual(["join(runtime, prefix)", "join('/tmp', prefix)"]);
    expect(mkdtempArguments(file, file)).toEqual(mkdtempArguments(file, helper));
    const last = helper.body?.statements.at(-1);
    expect(last !== undefined && ts.isReturnStatement(last) ? last.expression?.getText(file) : undefined).toBe(
      "{directory: mkdtempSync(join('/tmp', prefix)), source: 'tmp-fallback', reason}",
    );
    // TMPDIR then names the root, so the host's own tmpdir socket fallback resolves under it.
    const assignments = file.statements
      .filter(ts.isExpressionStatement)
      .map((statement) => statement.expression)
      .filter(ts.isBinaryExpression)
      .filter((binary) => binary.operatorToken.kind === ts.SyntaxKind.EqualsToken)
      .map((binary) => binary.getText(file));
    expect(assignments).toContain("process.env.TMPDIR = directory");
  });
});
