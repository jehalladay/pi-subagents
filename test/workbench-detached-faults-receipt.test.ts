/**
 * wb-0kg.1 (VC-7 / W18-A): the detached-host fault-injection receipt judges what it claims.
 *
 * Offline: the pure module is driven with a clean observed fixture and with one mutant per guarantee,
 * so an assessor that reported a constant instead of reading the journeys would fail here. The
 * runner is read as text only; the real child processes and real signals are exercised by
 * `forge run local-detached-faults`, never by this file.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessFaultJourneys,
  buildFaultReceipt,
  builtinAccessViolations,
  CLAIMS_NO_EFFECT,
  exitCodeFor,
  FAULT_FINDING_RULES,
  FAULT_RECEIPT_CONTRACT,
  faultProviderSource,
  reachedTerminal,
  SURVEYED_UNIVERSE_LABEL,
  SURVEYED_UNIVERSE_NON_CLAIM,
} from "../qa/workbench/local-detached-faults-receipt.mjs";

interface Inspect {
  observation: string;
  source: string;
  terminal: string;
  reconcileHint: string;
  hasResult: boolean;
}
interface CancelPoll {
  observation: string;
  terminal?: string;
  cancellationRequested: boolean;
  controlAudit: unknown[];
}
interface Observed {
  markerCounts: Record<string, number>;
  journeys: {
    effectCrash: {
      invocationId: string;
      armed: boolean;
      launchedAt: string;
      unknownAt: string;
      latencyMs: number;
      effectObserved: boolean;
      claimsNoEffect: boolean;
      terminals: string[];
      inspect: Inspect;
      executeRejected: boolean;
      relaunchRejected: boolean;
      relaunchDiagnostic: string;
      relaunchRejectedAfterSecond: boolean;
      markersAfter: { crash: number; inspect: number; execute: number; relaunch: number };
      second: { invocationId: string; accepted: boolean; markers: number };
      explicitSecondRequest: boolean;
      totalMarkers: number;
    };
    cancelIsolation: {
      armed: boolean;
      cancelledHost: {
        invocationId: string;
        accepted: boolean;
        terminalConfirmed: boolean;
        cancellationRequestedAtFirstInspect: boolean;
        terminal: string;
        latencyMs: number;
        cancelledAt: string;
      };
      postCancelInspect: { terminal: string; cancellationRequested: boolean; controlAuditLength: number; hasResult: boolean };
      sibling: { invocationId: string; polls: CancelPoll[]; endedByOwnShutdown: boolean };
    };
    shutdownUnresolved: {
      armed: boolean;
      running: { invocationId: string; unresolvedEffects: boolean; afterTerminal: string; afterReconcileHint: string };
      idle: { invocationId: string; unresolvedEffects: boolean };
    };
    sigterm: {
      armed: boolean;
      invocationId: string;
      signalledAt: string;
      latencyMs: number;
      terminal: string;
      terminals: string[];
      executeRejected: boolean;
      markersBefore: number;
      markersAfter: number;
    };
  };
}

const clone = <T>(value: T): T => structuredClone(value);

function clean(): Observed {
  return {
    markerCounts: { "effect-crash": 1, "effect-crash-second": 1, sigterm: 1 },
    journeys: {
      effectCrash: {
        invocationId: "effect-crash",
        armed: true,
        launchedAt: "2026-10-15T10:00:00.000Z",
        unknownAt: "2026-10-15T10:00:00.120Z",
        latencyMs: 120,
        effectObserved: true,
        claimsNoEffect: false,
        terminals: ["unknown"],
        inspect: {
          observation: "unknown",
          source: "local-client-transport",
          terminal: "unknown",
          reconcileHint: "Host connection lost: never automatically retry this invocation; reconcile first.",
          hasResult: false,
        },
        executeRejected: true,
        relaunchRejected: true,
        relaunchDiagnostic: "invocation exists: conflict",
        relaunchRejectedAfterSecond: true,
        markersAfter: { crash: 1, inspect: 1, execute: 1, relaunch: 1 },
        second: { invocationId: "effect-crash-second", accepted: true, markers: 1 },
        explicitSecondRequest: true,
        totalMarkers: 2,
      },
      cancelIsolation: {
        armed: true,
        cancelledHost: {
          invocationId: "iso-a",
          accepted: true,
          terminalConfirmed: false,
          cancellationRequestedAtFirstInspect: true,
          terminal: "cancelled",
          latencyMs: 30,
          cancelledAt: "2026-10-15T10:00:01.000Z",
        },
        postCancelInspect: { terminal: "cancelled", cancellationRequested: true, controlAuditLength: 1, hasResult: false },
        sibling: {
          invocationId: "iso-b",
          polls: [
            { observation: "observed-running", cancellationRequested: false, controlAudit: [] },
            { observation: "observed-running", cancellationRequested: false, controlAudit: [] },
          ],
          endedByOwnShutdown: true,
        },
      },
      shutdownUnresolved: {
        armed: true,
        running: {
          invocationId: "unresolved",
          unresolvedEffects: true,
          afterTerminal: "unknown",
          afterReconcileHint: "never automatically retry; reconcile with the producer",
        },
        idle: { invocationId: "idle", unresolvedEffects: false },
      },
      sigterm: {
        armed: true,
        invocationId: "sigterm",
        signalledAt: "2026-10-15T10:00:02.000Z",
        latencyMs: 300,
        terminal: "unknown",
        terminals: ["unknown"],
        executeRejected: true,
        markersBefore: 1,
        markersAfter: 1,
      },
    },
  };
}

function rules(observed: Observed): string[] {
  return assessFaultJourneys(observed).findings.map((finding: { rule: string }) => finding.rule);
}

function receiptInput(observed: Observed) {
  return {
    utc: "2026-10-15T10:00:03.000Z",
    revision: "working-tree",
    node: "v24.0.0",
    arch: "x64",
    platform: "linux",
    ...observed,
  };
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

function dynamicSpecifiersOf(source: string): string[] {
  return [...source.matchAll(/\bimport\s*\(\s*(['"])([^'"]+)\1\s*\)/g)].map((match) => match[2]);
}

describe("detached fault-injection receipt: provider fixture", () => {
  const markerDirectory = "/tmp/markers-under-test";
  const crashing = faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: true });
  const benign = faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: false });

  it("registers the given capability as a write-class fixture effect", () => {
    expect(crashing).toContain('id: "fixture.effect"');
    expect(crashing).toContain('effectClass: "write"');
    expect(crashing).toContain('permissions: ["fixture:effect"]');
    expect(crashing).toContain('contractSource: "fixture:source"');
    const other = faultProviderSource({ capabilityId: "fixture.other", markerDirectory, crashAfterEffect: false });
    expect(other).toContain('id: "fixture.other"');
    expect(other).not.toContain("fixture.effect");
  });

  it("writes exactly one marker before the kill and nothing after it", () => {
    expect(crashing.match(/writeFileSync\(/g)).toHaveLength(1);
    const writeAt = crashing.indexOf("writeFileSync(");
    const killAt = crashing.indexOf('process.kill(process.pid, "SIGKILL")');
    expect(writeAt).toBeGreaterThan(-1);
    expect(killAt).toBeGreaterThan(writeAt);
    expect(crashing.slice(killAt)).not.toMatch(/writeFileSync|appendFileSync|renameSync|mkdirSync|copyFileSync/);
    expect(crashing).toContain("ctx.invocationId");
    expect(crashing).toContain(JSON.stringify(markerDirectory));
  });

  it("contains the self-kill only when crashAfterEffect is true", () => {
    expect(crashing.match(/process\.kill\(/g)).toHaveLength(1);
    expect(benign).not.toMatch(/process\.kill|SIGKILL/);
    expect(benign.match(/writeFileSync\(/g)).toHaveLength(1);
  });

  it("surveyed source universe lint: the emitted text never imports node:net or node:child_process, and uses no static or dynamic module load", () => {
    for (const text of [crashing, benign]) {
      expect(text).not.toMatch(/node:net|node:child_process|\bnet\b['"]|child_process/);
      expect(text).not.toMatch(/\brequire\s*\(|\bimport\s*\(|^\s*import\b/m);
    }
  });

  it("refuses a capability id or marker directory that could inject provider source", () => {
    expect(() => faultProviderSource({ capabilityId: 'x"; process.exit(1); "', markerDirectory, crashAfterEffect: true })).toThrow(/capability/i);
    expect(() => faultProviderSource({ capabilityId: "fixture.effect", markerDirectory: "relative/dir", crashAfterEffect: true })).toThrow(/absolute/i);
  });

  it("can hold the host running after the effect without adding a second write", () => {
    const held = faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: false, holdMs: 10_000 });
    expect(held).toContain("10000");
    expect(held).toContain("ctx.signal");
    expect(held.match(/writeFileSync\(/g)).toHaveLength(1);
    expect(held).not.toMatch(/process\.kill/);
  });
});

describe("detached fault-injection receipt: assessor falsifiers", () => {
  it("passes a clean fixture with no findings and a realised measurement", () => {
    const assessed = assessFaultJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
  });

  it("exports a stable ordered rule roster covering every named violation", () => {
    for (const rule of [
      "duplicate-effect",
      "fabricated-terminal",
      "reuse-after-loss",
      "mass-cancellation",
      "unresolved-effects-hidden",
      "effect-denied",
    ]) {
      expect(FAULT_FINDING_RULES).toContain(rule);
    }
  });

  it("flags a marker count of 2 under one invocation id as duplicate-effect", () => {
    const observed = clone(clean());
    observed.markerCounts["effect-crash"] = 2;
    expect(rules(observed)).toContain("duplicate-effect");
    const later = clone(clean());
    later.journeys.effectCrash.markersAfter.relaunch = 2;
    expect(rules(later)).toContain("duplicate-effect");
    const killed = clone(clean());
    killed.journeys.sigterm.markersAfter = 2;
    expect(rules(killed)).toContain("duplicate-effect");
  });

  it("flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal", () => {
    for (const terminal of ["completed", "failed"]) {
      const observed = clone(clean());
      observed.journeys.effectCrash.terminals = ["unknown", terminal];
      expect(rules(observed)).toContain("fabricated-terminal");
    }
    const inspected = clone(clean());
    inspected.journeys.effectCrash.inspect.terminal = "completed";
    expect(rules(inspected)).toContain("fabricated-terminal");
    const withResult = clone(clean());
    withResult.journeys.effectCrash.inspect.hasResult = true;
    expect(rules(withResult)).toContain("fabricated-terminal");
    const afterShutdown = clone(clean());
    afterShutdown.journeys.shutdownUnresolved.running.afterTerminal = "completed";
    expect(rules(afterShutdown)).toContain("fabricated-terminal");
    const sigterm = clone(clean());
    sigterm.journeys.sigterm.terminals = ["completed"];
    expect(rules(sigterm)).toContain("fabricated-terminal");
  });

  it("flags an accepted same-id relaunch or a successful execute after loss as reuse-after-loss", () => {
    const relaunch = clone(clean());
    relaunch.journeys.effectCrash.relaunchRejected = false;
    expect(rules(relaunch)).toContain("reuse-after-loss");
    const execute = clone(clean());
    execute.journeys.effectCrash.executeRejected = false;
    expect(rules(execute)).toContain("reuse-after-loss");
    const sigterm = clone(clean());
    sigterm.journeys.sigterm.executeRejected = false;
    expect(rules(sigterm)).toContain("reuse-after-loss");
  });

  it("flags any sibling cancellation, terminal or audit entry as mass-cancellation", () => {
    const requested = clone(clean());
    requested.journeys.cancelIsolation.sibling.polls[1].cancellationRequested = true;
    expect(rules(requested)).toContain("mass-cancellation");
    const cancelled = clone(clean());
    cancelled.journeys.cancelIsolation.sibling.polls[0].terminal = "cancelled";
    expect(rules(cancelled)).toContain("mass-cancellation");
    const audited = clone(clean());
    audited.journeys.cancelIsolation.sibling.polls[0].controlAudit = [{ command: "cancel" }];
    expect(rules(audited)).toContain("mass-cancellation");
  });

  it("flags a sibling that stopped being running, or ended by anything but its own shutdown", () => {
    const observation = clone(clean());
    observation.journeys.cancelIsolation.sibling.polls[1].observation = "unknown";
    expect(rules(observation)).toContain("mass-cancellation");
    const ended = clone(clean());
    ended.journeys.cancelIsolation.sibling.endedByOwnShutdown = false;
    expect(rules(ended)).toContain("mass-cancellation");
  });

  it("flags cancel phases that collapse into a confirmed terminal or skip the request", () => {
    const confirmed = clone(clean());
    confirmed.journeys.cancelIsolation.cancelledHost.terminalConfirmed = true;
    expect(rules(confirmed)).toContain("cancel-phase-collapsed");
    const skipped = clone(clean());
    skipped.journeys.cancelIsolation.cancelledHost.cancellationRequestedAtFirstInspect = false;
    expect(rules(skipped)).toContain("cancel-phase-collapsed");
    const refused = clone(clean());
    refused.journeys.cancelIsolation.cancelledHost.accepted = false;
    expect(rules(refused)).toContain("cancel-phase-collapsed");
    const notCancelled = clone(clean());
    notCancelled.journeys.cancelIsolation.cancelledHost.terminal = "completed";
    expect(rules(notCancelled)).toContain("cancel-phase-collapsed");
  });

  it("flags unresolvedEffects false for a running host, or true for a host that never ran", () => {
    const hidden = clone(clean());
    hidden.journeys.shutdownUnresolved.running.unresolvedEffects = false;
    expect(rules(hidden)).toContain("unresolved-effects-hidden");
    const invented = clone(clean());
    invented.journeys.shutdownUnresolved.idle.unresolvedEffects = true;
    expect(rules(invented)).toContain("unresolved-effects-invented");
  });

  it("flags an effect-denying claim, or a lost result recorded as no effect, as effect-denied", () => {
    const claimed = clone(clean());
    claimed.journeys.effectCrash.claimsNoEffect = true;
    expect(rules(claimed)).toContain("effect-denied");
    const unobserved = clone(clean());
    unobserved.journeys.effectCrash.effectObserved = false;
    expect(rules(unobserved)).toContain("effect-denied");
  });

  it("requires the unknown inspection to carry source, observation and a never-retry reconcile hint", () => {
    const hint = clone(clean());
    hint.journeys.effectCrash.inspect.reconcileHint = "try again";
    expect(rules(hint)).toContain("unknown-not-reconcilable");
    const source = clone(clean());
    source.journeys.effectCrash.inspect.source = "live-detached-host";
    expect(rules(source)).toContain("unknown-not-reconcilable");
    const shutdown = clone(clean());
    shutdown.journeys.shutdownUnresolved.running.afterReconcileHint = "";
    expect(rules(shutdown)).toContain("unknown-not-reconcilable");
  });

  it("labels the deliberate second request a new logical invocation with its own single marker", () => {
    const merged = clone(clean());
    merged.journeys.effectCrash.second.markers = 2;
    merged.markerCounts["effect-crash-second"] = 2;
    expect(rules(merged)).toContain("duplicate-effect");
    const rejected = clone(clean());
    rejected.journeys.effectCrash.second.accepted = false;
    expect(rules(rejected)).toContain("second-request-refused");
    const unlabelled = clone(clean());
    unlabelled.journeys.effectCrash.explicitSecondRequest = false;
    expect(rules(unlabelled)).toContain("second-request-unlabelled");
    const total = clone(clean());
    total.journeys.effectCrash.totalMarkers = 3;
    expect(rules(total)).toContain("duplicate-effect");
  });

  it("reports an unarmed journey as not realised rather than as a pass", () => {
    for (const key of ["effectCrash", "cancelIsolation", "shutdownUnresolved", "sigterm"] as const) {
      const observed = clone(clean());
      observed.journeys[key].armed = false;
      expect(assessFaultJourneys(observed).realised).toBe(false);
    }
    const noEffect = clone(clean());
    noEffect.journeys.effectCrash.markersAfter.crash = 0;
    expect(assessFaultJourneys(noEffect).realised).toBe(false);
    const missing = clone(clean()) as unknown as { journeys: Record<string, unknown> };
    delete missing.journeys.sigterm;
    expect(assessFaultJourneys(missing).realised).toBe(false);
  });
});

describe("detached fault-injection receipt: evidence-grade shape", () => {
  it("builds a frozen receipt with every field and pass true for a clean, realised measurement", () => {
    const receipt = buildFaultReceipt(receiptInput(clean()));
    expect(receipt.contract).toBe("workbench.detached-faults/v1");
    expect(FAULT_RECEIPT_CONTRACT).toBe(receipt.contract);
    for (const field of ["utc", "revision", "node", "arch", "platform", "journeys", "markerCounts", "findings", "realised", "pass"]) {
      expect(receipt).toHaveProperty(field);
    }
    expect(receipt.utc).toBe("2026-10-15T10:00:03.000Z");
    expect(receipt.revision).toBe("working-tree");
    expect(receipt.findings).toEqual([]);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(true);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys)).toBe(true);
    expect(receipt.journeys.effectCrash.latencyMs).toBe(120);
    expect(receipt.journeys.effectCrash.launchedAt).toBe("2026-10-15T10:00:00.000Z");
    expect(receipt.journeys.effectCrash.explicitSecondRequest).toBe(true);
    expect(receipt.journeys.effectCrash.totalMarkers).toBe(2);
    expect(receipt.journeys.effectCrash.effectObserved).toBe(true);
    expect(receipt.markerCounts["effect-crash"]).toBe(1);
  });

  it("does not pass with findings, and does not pass when the measurement is not realised", () => {
    const duplicate = clone(clean());
    duplicate.markerCounts["effect-crash"] = 2;
    const withFindings = buildFaultReceipt(receiptInput(duplicate));
    expect(withFindings.pass).toBe(false);
    expect(withFindings.realised).toBe(true);
    expect(withFindings.findings.length).toBeGreaterThan(0);
    const unarmed = clone(clean());
    unarmed.journeys.sigterm.armed = false;
    const notRealised = buildFaultReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(notRealised.pass).toBe(false);
  });

  it("reduces every absolute filesystem path in a diagnostic to its basename", () => {
    const observed = clone(clean());
    observed.journeys.effectCrash.relaunchDiagnostic = "Invocation exists: /tmp/wb-faults-abc123/hosts/effect-crash/invocation.json conflict";
    observed.journeys.effectCrash.inspect.reconcileHint = "never retry; see /home/someone/work/receipt.json";
    const receipt = buildFaultReceipt(receiptInput(observed));
    const text = JSON.stringify(receipt);
    expect(text).not.toMatch(/\/tmp\/|\/home\/|wb-faults-abc123\/hosts/);
    expect(receipt.journeys.effectCrash.relaunchDiagnostic).toContain("invocation.json");
    expect(text).not.toMatch(/(?:^|["'\s=:(])\/(?:[A-Za-z0-9._-]+\/)+/);
  });

  it("rejects a receipt built without its identifying fields", () => {
    const { utc: _utc, ...withoutUtc } = receiptInput(clean());
    expect(() => buildFaultReceipt(withoutUtc)).toThrow(/utc/);
    expect(() => buildFaultReceipt({ ...receiptInput(clean()), revision: "" })).toThrow(/revision/);
  });
});

describe("detached fault-injection receipt: module and runner boundaries", () => {
  const receiptModule = readRepo("qa/workbench/local-detached-faults-receipt.mjs");
  const runner = readRepo("qa/workbench/local-detached-faults.mjs");

  it("keeps the receipt module pure: no imports, no require, no wall clock or random source", () => {
    expect(specifiersOf(receiptModule)).toEqual([]);
    expect(receiptModule).not.toMatch(/\brequire\s*\(|\bimport\s*\(/);
    expect(receiptModule).not.toMatch(/Date\.now|new Date\(|Math\.random/);
  });

  it("imports only the compiled detached host and node: builtins in the runner", () => {
    // The compiled host is loaded with a literal dynamic import so a missing build is a diagnosed exit 2, not a crash.
    expect(dynamicSpecifiersOf(runner)).toEqual(["../../dist/workbench/hosts/local-detached.js"]);
    const specifiers = [...specifiersOf(runner), ...dynamicSpecifiersOf(runner)];
    expect(specifiers).toContain("../../dist/workbench/hosts/local-detached.js");
    expect(specifiers).toContain("./local-detached-faults-receipt.mjs");
    for (const specifier of specifiers) {
      expect(
        specifier.startsWith("node:") ||
          specifier === "../../dist/workbench/hosts/local-detached.js" ||
          specifier === "./local-detached-faults-receipt.mjs",
      ).toBe(true);
    }
    expect(runner).not.toMatch(/\bsrc\//);
    expect(runner).not.toMatch(/\brequire\s*\(/);
  });

  it("drives real signals and cleans every host and the workspace in finally", () => {
    expect(runner).toMatch(/["']SIGKILL["']/);
    expect(runner).toMatch(/["']SIGTERM["']/);
    expect(runner).toMatch(/finally\s*\{/);
    expect(runner).toMatch(/rmSync\(/);
    expect(runner).toContain("DETACHED_FAULTS_RECEIPT");
    expect(runner).toContain("0o700");
  });

  it("registers the runner as one additive Forge command outside the default gate", () => {
    const forge = readRepo("forge.toml");
    expect(forge).toContain(
      '[build.commands.local-detached-faults]\ncommand = "node qa/workbench/local-detached-faults.mjs"\ntimeout = 240\n',
    );
    expect(forge.match(/\[build\.commands\.local-detached-faults\]/g)).toHaveLength(1);
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("local-detached-faults");
  });
});

describe("wb-0kg.10: armed on any terminal (docs/08 'does not replay a saved terminal verdict')", () => {
  it("reachedTerminal is true for every terminal string and false for no terminal", () => {
    for (const terminal of ["unknown", "completed", "failed", "cancelled"]) expect(reachedTerminal({ terminal })).toBe(true);
    for (const snapshot of [{}, { terminal: "" }, { terminal: 3 }, { terminal: null }, null, undefined]) {
      expect(reachedTerminal(snapshot as never)).toBe(false);
    }
  });

  it("a fabricated completed terminal after the crash stays realised with fabricated-terminal and exits 1, never 2", () => {
    const observed = clone(clean());
    observed.journeys.effectCrash.terminals = ["completed"];
    observed.journeys.effectCrash.inspect.terminal = "completed";
    const receipt = buildFaultReceipt(receiptInput(observed));
    expect(receipt.realised).toBe(true);
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain("fabricated-terminal");
    expect(exitCodeFor(receipt)).toBe(1);
  });

  it("the runner arms every wait on reachedTerminal and never on one literal terminal string", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("reachedTerminal");
    expect(runner).not.toMatch(/snapshot\.terminal === '(?:unknown|cancelled)'/);
    expect(runner.match(/,\s*reachedTerminal\)/g)?.length ?? 0).toBeGreaterThanOrEqual(4);
  });
});

describe("wb-0kg.10: surveyed source universe, a lint and not a sandbox (docs/12 'The VM is not a security boundary')", () => {
  const markerDirectory = "/tmp/markers-under-test";
  const crashing = faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: true });

  it("admits exactly process.getBuiltinModule('node:fs') and flags every other access", () => {
    expect(builtinAccessViolations(crashing)).toEqual([]);
    expect(builtinAccessViolations(faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: false, holdMs: 10_000 }))).toEqual([]);
    for (const text of [
      'const net = process.getBuiltinModule("node:net");',
      'const cp = process.getBuiltinModule("child_process");',
      "const fs = process.getBuiltinModule(name);",
      'const fs = process.getBuiltinModule("node:" + "net");',
      'const fs = require("node:fs");',
      'const fs = await import("node:fs");',
      'import fs from "node:fs";',
    ]) {
      expect(builtinAccessViolations(text).length).toBeGreaterThan(0);
    }
  });

  it("an allowlist widened to node:net is caught by the lint", () => {
    const widened = crashing.replace('"node:fs"', '"node:net"');
    expect(builtinAccessViolations(widened).length).toBeGreaterThan(0);
  });

  it("labels the lint a surveyed source universe and states the non-claim verbatim in the receipt", () => {
    expect(SURVEYED_UNIVERSE_LABEL).toBe("surveyed source universe");
    expect(SURVEYED_UNIVERSE_NON_CLAIM).toMatch(/not a sandbox/i);
    const receipt = buildFaultReceipt(receiptInput(clean()));
    expect(receipt.providerLint.label).toBe(SURVEYED_UNIVERSE_LABEL);
    expect(receipt.providerLint.nonClaim).toBe(SURVEYED_UNIVERSE_NON_CLAIM);
    expect(receipt.providerLint.allowedBuiltins).toEqual(["node:fs"]);
    expect(JSON.stringify(receipt)).not.toMatch(/sandboxed|cannot load/i);
  });

  it("turns a lint violation reported by the runner into a provider-builtin-escape finding (exit 1)", () => {
    const observed = { ...clone(clean()), providerLint: { surveyed: ["effect-crash-provider.mjs"], violations: ["effect-crash-provider.mjs: getBuiltinModule(node:net)"] } };
    const receipt = buildFaultReceipt(receiptInput(observed as unknown as Observed));
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain("provider-builtin-escape");
    expect(exitCodeFor(receipt)).toBe(1);
  });

  it("the runner lints every emitted provider text through builtinAccessViolations", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("builtinAccessViolations");
    expect(runner).toContain("providerLint");
  });

  it("pins the rule roster order, with the new rule appended and nothing reordered", () => {
    expect([...FAULT_FINDING_RULES]).toEqual([
      "duplicate-effect",
      "fabricated-terminal",
      "reuse-after-loss",
      "effect-denied",
      "unknown-not-reconcilable",
      "second-request-refused",
      "second-request-unlabelled",
      "cancel-phase-collapsed",
      "mass-cancellation",
      "unresolved-effects-hidden",
      "unresolved-effects-invented",
      "provider-builtin-escape",
    ]);
  });
});

describe("wb-0kg.10: claimsNoEffect is one shared constant", () => {
  it("exports a frozen constant the assessor judges against", () => {
    expect(Object.isFrozen(CLAIMS_NO_EFFECT)).toBe(true);
    expect(CLAIMS_NO_EFFECT.honest).toBe(false);
    expect(CLAIMS_NO_EFFECT.denied).toBe(true);
    const denied = clone(clean());
    denied.journeys.effectCrash.claimsNoEffect = CLAIMS_NO_EFFECT.denied;
    expect(rules(denied)).toContain("effect-denied");
    const honest = clone(clean());
    honest.journeys.effectCrash.claimsNoEffect = CLAIMS_NO_EFFECT.honest;
    expect(rules(honest)).not.toContain("effect-denied");
  });

  it("the runner records the constant and carries no claimsNoEffect literal; the assessor carries no literal either", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    const receiptModule = readRepo("qa/workbench/local-detached-faults-receipt.mjs");
    expect(runner).toContain("CLAIMS_NO_EFFECT.honest");
    expect(runner).not.toMatch(/claimsNoEffect:\s*(?:true|false)/);
    expect(receiptModule).not.toMatch(/claimsNoEffect\s*===\s*(?:true|false)/);
  });
});

describe("wb-0kg.10: post-cancel inspect is recorded and judged (docs/08 'three phases')", () => {
  it("passes the clean post-cancel inspect", () => {
    expect(rules(clean())).toEqual([]);
  });

  it("flags a post-cancel terminal that moved off cancelled", () => {
    const completed = clone(clean());
    completed.journeys.cancelIsolation.postCancelInspect.terminal = "completed";
    expect(rules(completed)).toContain("fabricated-terminal");
    const unknown = clone(clean());
    unknown.journeys.cancelIsolation.postCancelInspect.terminal = "unknown";
    expect(rules(unknown)).toContain("cancel-phase-collapsed");
  });

  it("flags a post-cancel inspect that lost cancellationRequested or grew a result field", () => {
    const lost = clone(clean());
    lost.journeys.cancelIsolation.postCancelInspect.cancellationRequested = false;
    expect(rules(lost)).toContain("cancel-phase-collapsed");
    const withResult = clone(clean());
    withResult.journeys.cancelIsolation.postCancelInspect.hasResult = true;
    expect(rules(withResult)).toContain("fabricated-terminal");
  });

  it("reports a cancel journey with no recorded post-cancel inspect as not realised, never a pass", () => {
    const skipped = clone(clean()) as unknown as { journeys: { cancelIsolation: Record<string, unknown> } };
    delete skipped.journeys.cancelIsolation.postCancelInspect;
    expect(assessFaultJourneys(skipped).realised).toBe(false);
  });

  it("the runner performs and records one explicit inspect after the cancelled terminal", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("postCancelInspect");
    expect(runner).toMatch(/postCancelInspect[\s\S]{0,400}controlAuditLength/);
  });
});

describe("wb-0kg.10: same-id relaunch is re-checked after the second request (docs/08 'Logical invocation')", () => {
  it("flags an original-id relaunch accepted after the second invocation as reuse-after-loss", () => {
    const reused = clone(clean());
    reused.journeys.effectCrash.relaunchRejectedAfterSecond = false;
    expect(rules(reused)).toContain("reuse-after-loss");
  });

  it("reports a journey that never re-checked the relaunch as not realised, and keeps the marker total at 2", () => {
    const skipped = clone(clean()) as unknown as { journeys: { effectCrash: Record<string, unknown> } };
    delete skipped.journeys.effectCrash.relaunchRejectedAfterSecond;
    expect(assessFaultJourneys(skipped).realised).toBe(false);
    expect(clean().journeys.effectCrash.totalMarkers).toBe(2);
    expect(rules(clean())).toEqual([]);
  });

  it("the runner re-attempts the original id after the second invocation and records the outcome", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("relaunchRejectedAfterSecond");
    expect(runner.indexOf("relaunchRejectedAfterSecond")).toBeGreaterThan(runner.indexOf("const secondMarkers"));
  });
});
