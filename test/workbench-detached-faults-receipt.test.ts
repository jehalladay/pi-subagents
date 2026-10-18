/**
 * wb-0kg.1 (VC-7 / W18-A): the detached-host fault-injection receipt judges what it claims.
 *
 * Offline: the pure module is driven with a clean observed fixture and with one mutant per guarantee,
 * so an assessor that reported a constant instead of reading the journeys would fail here. The
 * runner is read as text only; the real child processes and real signals are exercised by
 * `forge run local-detached-faults`, never by this file.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
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
  PROVIDER_FIXTURES,
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
  providerLint: { surveyed: string[]; violations: string[] };
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
        terminalObservedAt: string;
        latencyMs: number;
        cancelledAt: string;
      };
      postCancelInspect: { terminal: string; observedAt: string; cancellationRequested: boolean; controlAuditLength: number; hasResult: boolean };
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
    providerLint: { surveyed: ["effect-crash-provider.mjs", "effect-hold-provider.mjs", "wait-provider.mjs"], violations: [] },
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
          terminalObservedAt: "2026-10-15T10:00:01.030Z",
          latencyMs: 30,
          cancelledAt: "2026-10-15T10:00:01.000Z",
        },
        postCancelInspect: {
          terminal: "cancelled",
          observedAt: "2026-10-15T10:00:01.051Z",
          cancellationRequested: true,
          controlAuditLength: 1,
          hasResult: false,
        },
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
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("local-detached-faults");
  });
});

describe("wb-0kg.10: armed on any terminal (docs/08 'does not replay a saved terminal verdict')", () => {
  // The bounded wait every journey arms on, verbatim: ok is exactly done(value) on the last snapshot read.
  const UNTIL_FUNCTION = [
    "async function until(read, done, bound = BOUND_MS) {",
    "  const start = performance.now();",
    "  let value = await read();",
    "  while (!done(value) && performance.now() - start < bound) {",
    "    await sleep(POLL_MS);",
    "    value = await read();",
    "  }",
    "  return {value, ok: done(value), ms: Math.round((performance.now() - start) * 100) / 100};",
    "}",
  ].join("\n");

  it("reachedTerminal is true for every terminal string and false for no terminal", () => {
    for (const terminal of ["unknown", "completed", "failed", "cancelled"]) expect(reachedTerminal({ terminal })).toBe(true);
    for (const snapshot of [{}, { terminal: "" }, { terminal: 3 }, { terminal: null }, null, undefined]) {
      expect(reachedTerminal(snapshot as never)).toBe(false);
    }
  });

  it("the assessor judges an ARMED crash journey whose host fabricated terminal completed as realised with fabricated-terminal: exit 1, never 2", () => {
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
    // U1 (gate mutants G1-G4): the wait is one fixed function, the four terminal waits are exactly these bindings with
    // reachedTerminal as the WHOLE predicate, and each journey's armed: is exactly the conjunction of its waits' ok flags,
    // so neither a wait nor an armed: can be re-keyed on a literal terminal such as x.value.terminal === 'unknown'.
    expect(runner).toContain(UNTIL_FUNCTION);
    expect([...runner.matchAll(/^\s*const (\w+) = await until\(.+, reachedTerminal\);$/gm)].map((match) => match[1])).toEqual([
      "unknown",
      "cancelled",
      "after",
      "lost",
    ]);
    expect(runner.match(/\breachedTerminal\b/g)).toHaveLength(5);
    expect([...runner.matchAll(/\barmed: ([^,\n]+),/g)].map((match) => match[1])).toEqual([
      "first.unknown.ok",
      "running.ok && cancelled.ok",
      "live.ok && after.ok",
      "live.ok && lost.ok",
    ]);
    expect(runner.match(/\barmed\b/g)).toHaveLength(4);
    expect(runner).not.toMatch(/\.terminal\s*[!=]==?\s*['"]/);
    expect(runner).toContain(
      "  return {receipt, client, launchedAt, firstExecute, seen, unknown, latencyMs: Math.round((performance.now() - started) * 100) / 100};\n",
    );
  });
});

describe("wb-0kg.10: surveyed source universe, a lint and not a sandbox (docs/12 'The VM is not a security boundary')", () => {
  const markerDirectory = "/tmp/markers-under-test";
  const crashing = faultProviderSource({ capabilityId: "fixture.effect", markerDirectory, crashAfterEffect: true });
  // The runner's lint branch, verbatim (D keeps the template placeholders out of a plain string).
  const D = "$";
  const WRITE_FIXTURE_FUNCTION = [
    "function writeFixture(name, text, lint = false) {",
    "  if (lint) {",
    "    providerLint.surveyed.push(name);",
    `    for (const violation of builtinAccessViolations(text)) providerLint.violations.push(\`${D}{name}: ${D}{violation}\`);`,
    "  }",
    "  const path = join(workspace, name);",
    "  writeFileSync(path, text, {mode: 0o600});",
    "  return path;",
    "}",
  ].join("\n");

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

  it("reaches the bare getBuiltinModule-reference and createRequire branches: each probe yields exactly its own violation", () => {
    for (const text of ['const load = process["getBuiltinModule"]; load("node:net");', 'const load = process.getBuiltinModule; load("node:net");']) {
      expect(builtinAccessViolations(text)).toEqual(["getBuiltinModule is referenced without a literal call."]);
    }
    expect(builtinAccessViolations("const load = createRequire(import.meta.url);")).toEqual(["createRequire is present."]);
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
    const observed = clone(clean());
    observed.providerLint.violations = ["effect-crash-provider.mjs: getBuiltinModule(node:net)"];
    const receipt = buildFaultReceipt(receiptInput(observed));
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain("provider-builtin-escape");
    expect(exitCodeFor(receipt)).toBe(1);
  });

  it("names the three provider fixtures the runner emits in one frozen constant", () => {
    expect(Object.isFrozen(PROVIDER_FIXTURES)).toBe(true);
    expect({ ...PROVIDER_FIXTURES }).toEqual({ crash: "effect-crash-provider.mjs", hold: "effect-hold-provider.mjs", wait: "wait-provider.mjs" });
  });

  it("a receipt whose survey is empty, lacks any one provider fixture, or is absent is not realised: exit 2, never a pass", () => {
    expect(assessFaultJourneys(clean()).realised).toBe(true);
    const empty = clone(clean());
    empty.providerLint.surveyed = [];
    const receipt = buildFaultReceipt(receiptInput(empty));
    expect(receipt.realised).toBe(false);
    expect(receipt.pass).toBe(false);
    expect(exitCodeFor(receipt)).toBe(2);
    for (const name of Object.values(PROVIDER_FIXTURES)) {
      const partial = clone(clean());
      partial.providerLint.surveyed = partial.providerLint.surveyed.filter((surveyed) => surveyed !== name);
      expect(assessFaultJourneys(partial).realised).toBe(false);
    }
    const absent = clone(clean()) as unknown as { providerLint?: unknown };
    delete absent.providerLint;
    expect(assessFaultJourneys(absent).realised).toBe(false);
    // A partial survey that still caught an escape keeps the finding on the record, but the run stays unrealised.
    const partialWithEscape = clone(clean());
    partialWithEscape.providerLint = { surveyed: ["effect-crash-provider.mjs"], violations: ["effect-crash-provider.mjs: getBuiltinModule(node:net)"] };
    const escaped = buildFaultReceipt(receiptInput(partialWithEscape));
    expect(escaped.findings.map((finding: { rule: string }) => finding.rule)).toContain("provider-builtin-escape");
    expect(escaped.realised).toBe(false);
    expect(exitCodeFor(escaped)).toBe(2);
  });

  it("the runner lints every emitted provider text through builtinAccessViolations", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("builtinAccessViolations");
    expect(runner).toContain("providerLint");
    // U4(a) (gate mutants G7/G8): one fixed lint branch that surveys and lints the very text it writes; the survey object is
    // created once, written only there and handed once to the receipt builder ...
    expect(runner).toContain(WRITE_FIXTURE_FUNCTION);
    expect(runner).toContain("const providerLint = {surveyed: [], violations: []};\n");
    expect(runner.match(/\bproviderLint\b/g)).toHaveLength(4);
    // ... and exactly the three provider writes pass lint=true, each named by the shared constant; the two workflow scripts are not provider texts.
    expect(runner.match(/\bwriteFixture\(/g)).toHaveLength(6);
    expect(
      [...runner.matchAll(/^const (\w+) = writeFixture\(([^,]+), .*?(, true)?\);$/gm)].map(
        (match) => `${match[1]}:${match[2]}:${match[3] === undefined ? "unlinted" : "linted"}`,
      ),
    ).toEqual([
      "crashPath:PROVIDER_FIXTURES.crash:linted",
      "holdPath:PROVIDER_FIXTURES.hold:linted",
      "waitPath:PROVIDER_FIXTURES.wait:linted",
      "effectScript:'effect-workflow.js':unlinted",
      "waitScript:'wait-workflow.js':unlinted",
    ]);
  });

  it("the runner hands the survey object to the receipt builder verbatim, as the last four fields of the one buildFaultReceipt call", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    // R6 (owner ruling R1=(b), gate mutants G29/G37): the token count above cannot tell a fabricated complete clean survey
    // (G29) or an emptied one (G37) from the real object; the five hand-off lines are pinned verbatim, once, in emit().
    const handoff = "    journeys,\n    markerCounts,\n    providerLint,\n    diagnostics,\n  });\n";
    expect(runner.split(handoff)).toHaveLength(2);
    expect(runner).toContain(`    platform: process.platform,\n${handoff}`);
    expect(runner.match(/\bbuildFaultReceipt\(/g)).toHaveLength(1);
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

  it("reports a post-cancel record that is not a later second inspect (observedAt missing, malformed, equal to or before the wait's terminal snapshot) as not realised", () => {
    expect(assessFaultJourneys(clean()).realised).toBe(true);
    const reused = clone(clean());
    reused.journeys.cancelIsolation.postCancelInspect.observedAt = reused.journeys.cancelIsolation.cancelledHost.terminalObservedAt;
    expect(assessFaultJourneys(reused).realised).toBe(false);
    const earlier = clone(clean());
    earlier.journeys.cancelIsolation.postCancelInspect.observedAt = "2026-10-15T10:00:01.029Z";
    expect(assessFaultJourneys(earlier).realised).toBe(false);
    for (const observedAt of ["", "2026-10-15 10:00:01.051", "not-a-time"]) {
      const malformed = clone(clean());
      malformed.journeys.cancelIsolation.postCancelInspect.observedAt = observedAt;
      expect(assessFaultJourneys(malformed).realised).toBe(false);
    }
    const noPostTime = clone(clean()) as unknown as { journeys: { cancelIsolation: { postCancelInspect: Record<string, unknown> } } };
    delete noPostTime.journeys.cancelIsolation.postCancelInspect.observedAt;
    expect(assessFaultJourneys(noPostTime).realised).toBe(false);
    const noWaitTime = clone(clean()) as unknown as { journeys: { cancelIsolation: { cancelledHost: Record<string, unknown> } } };
    delete noWaitTime.journeys.cancelIsolation.cancelledHost.terminalObservedAt;
    expect(assessFaultJourneys(noWaitTime).realised).toBe(false);
  });

  it("the runner performs and records one explicit inspect after the cancelled terminal", () => {
    const runner = readRepo("qa/workbench/local-detached-faults.mjs");
    expect(runner).toContain("postCancelInspect");
    expect(runner).toMatch(/postCancelInspect[\s\S]{0,400}controlAuditLength/);
    // U2 (gate mutant G5): the CALL is pinned. Once the wait sees the cancelled terminal (latency is taken there), the runner
    // pauses one poll interval and performs its own inspect; the record reads only that fresh snapshot, and the wait's
    // terminal observedAt is recorded beside it so the assessor can refuse a reused snapshot.
    expect(runner).toContain(
      [
        "  const cancelled = await until(() => a.inspect(), reachedTerminal);",
        "  const latencyMs = Math.round((performance.now() - started) * 100) / 100;",
        "  // One poll interval after the terminal, inspect again: the terminal must hold, and the record reads this fresh snapshot.",
        "  await sleep(POLL_MS);",
        "  const postCancel = await a.inspect();",
        "",
      ].join("\n"),
    );
    expect(runner.match(/\bconst postCancel\b/g)).toHaveLength(1);
    expect(runner).toContain("      terminalObservedAt: cancelled.value.observedAt,\n");
    expect(runner).toContain(
      "    postCancelInspect: {terminal: postCancel.terminal, observedAt: postCancel.observedAt, cancellationRequested: postCancel.cancellationRequested === true, controlAuditLength: Array.isArray(postCancel.controlAudit) ? postCancel.controlAudit.length : 0, hasResult: Object.hasOwn(postCancel, 'result')},\n",
    );
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
    // U3 (gate mutant G6): exactly two real same-id launch attempts on the ORIGINAL id, one before and one after the second
    // logical invocation; the recorded outcome is the second attempt's own, never a copy of the first.
    const attempts = [...runner.matchAll(/await attemptRelaunch\((\w+)\)/g)];
    expect(attempts.map((match) => match[1])).toEqual(["id", "id"]);
    const secondMarkersAt = runner.indexOf("  const secondMarkers = markerCount(secondId);\n");
    expect(secondMarkersAt).toBeGreaterThan(-1);
    expect(attempts[0].index).toBeLessThan(secondMarkersAt);
    expect(attempts[1].index).toBeGreaterThan(secondMarkersAt);
    expect(runner).toContain("  const id = 'effect-crash';\n");
    expect(runner).toContain("  const relaunch = await attemptRelaunch(id);\n  const afterRelaunch = markerCount(id);\n");
    expect(runner).toContain(
      "  const secondMarkers = markerCount(secondId);\n  // The original id must still be refused once the deliberate second logical invocation exists.\n  const relaunchAfterSecond = await attemptRelaunch(id);\n",
    );
    expect(runner).toContain("    relaunchRejectedAfterSecond: relaunchAfterSecond.rejected,\n");
  });
});

/**
 * wb-p5a (wb-0kg.7 gate F1): the wb-0kg.1 receipt carries the same runner exit mapping the 0kg.7 gate found
 * unpinned. A judge whose exit code cannot fail cannot certify the live tier.
 */
describe("detached fault-injection receipt: runner exit mapping (wb-p5a X1, X2)", () => {
  it("maps 0 for a realised clean receipt, 1 for a realised receipt with findings, 2 whenever it is not realised", () => {
    expect(exitCodeFor(buildFaultReceipt(receiptInput(clean())))).toBe(0);
    const duplicate = clone(clean());
    duplicate.markerCounts["effect-crash"] = 2;
    const withFindings = buildFaultReceipt(receiptInput(duplicate));
    expect(withFindings.realised).toBe(true);
    expect(withFindings.findings.length).toBeGreaterThan(0);
    expect(exitCodeFor(withFindings)).toBe(1);
    const unarmed = clone(clean());
    unarmed.journeys.sigterm.armed = false;
    const notRealised = buildFaultReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(exitCodeFor(notRealised)).toBe(2);
    const both = clone(clean());
    both.journeys.sigterm.armed = false;
    both.markerCounts["effect-crash"] = 2;
    const notRealisedWithFindings = buildFaultReceipt(receiptInput(both));
    expect(notRealisedWithFindings.findings.length).toBeGreaterThan(0);
    expect(exitCodeFor(notRealisedWithFindings)).toBe(2);
  });
  it("pins the survivors of the 0kg.7 gate table in the wb-0kg.1 judge: empty sibling polls, afterTerminal and sigterm terminal must be unknown", () => {
    const noPolls = clone(clean());
    noPolls.journeys.cancelIsolation.sibling.polls = [];
    expect(assessFaultJourneys(noPolls).realised).toBe(false);
    const afterShutdown = clone(clean());
    afterShutdown.journeys.shutdownUnresolved.running.afterTerminal = "cancelled";
    expect(rules(afterShutdown)).toContain("unknown-not-reconcilable");
    const sigterm = clone(clean());
    sigterm.journeys.sigterm.terminal = "cancelled";
    expect(rules(sigterm)).toContain("unknown-not-reconcilable");
  });
});

/**
 * wb-p5a R7 (owner binding 03:3xZ: "a SIX-LINE VERBATIM PIN of the attemptRelaunch function in
 * qa/workbench/local-detached-faults.mjs"); the wb-0kg.10 15:34Z F4 item "attemptRelaunch body unpinned" closes with this pin.
 * docs/workbench/08: "Logical invocation: caller-created unique identity stable across retry of same request; distinct from
 * identical intentional second request."
 *
 * Re-expressed at the second-lander re-cut (known-conflicts entry 5: wb-0kg.10 landed first): the inline same-id relaunch
 * block this pin was first restated against is the landed attemptRelaunch function now, so the six lines pinned verbatim are
 * that function, as parsed code. Counting any error as a rejection (G14), reporting an accepted relaunch as rejected (G15,
 * fabricated-green-capable on a broken host) or launching a different id (G16) changes them; a commented-out copy can never
 * stand in for them; and no second binding of the name can shadow, reassign or alias the function, which is only ever called.
 */
describe("detached fault-injection receipt: same-id relaunch pinned verbatim (wb-p5a R7)", () => {
  const ATTEMPT_RELAUNCH = [
    "async function attemptRelaunch(id) {",
    "  return await host.launchDetachedWorkflow(request(id, 'crash', {autoStart: false, permissions: ['inspect', 'execute']})).then(",
    "    receipt => { pids.add(receipt.pid); return {rejected: false, diagnostic: 'same-id relaunch accepted'}; },",
    "    error => ({rejected: /exists|conflict/i.test(message(error)), diagnostic: message(error)}),",
    "  );",
    "}",
  ];
  // effectCrashJourney's first same-id attempt with the marker counts on either side (statement text starts at its first token).
  const STATEMENTS = ["const afterExecute = markerCount(id);", "const relaunch = await attemptRelaunch(id);", "const afterRelaunch = markerCount(id);"];

  function runner(): ts.SourceFile {
    return ts.createSourceFile("local-detached-faults.mjs", readRepo("qa/workbench/local-detached-faults.mjs"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  }

  function effectCrashJourney(): { file: ts.SourceFile; journey: ts.FunctionDeclaration } {
    const file = runner();
    const journeys = file.statements.filter(ts.isFunctionDeclaration).filter((fn) => fn.name?.text === "effectCrashJourney");
    expect(journeys, "exactly one top-level effectCrashJourney()").toHaveLength(1);
    return { file, journey: journeys[0] };
  }

  function propertyAssignments(root: ts.Node, found: ts.PropertyAssignment[] = []): ts.PropertyAssignment[] {
    if (ts.isPropertyAssignment(root)) found.push(root);
    ts.forEachChild(root, (child) => {
      propertyAssignments(child, found);
    });
    return found;
  }

  function identifiersNamed(root: ts.Node, name: string, found: ts.Identifier[] = []): ts.Identifier[] {
    if (ts.isIdentifier(root) && root.text === name) found.push(root);
    ts.forEachChild(root, (child) => {
      identifiersNamed(child, name, found);
    });
    return found;
  }

  it("attemptRelaunch stands verbatim, exactly once, as the runner's one top-level function of that name", () => {
    expect(readRepo("qa/workbench/local-detached-faults.mjs").split(`${ATTEMPT_RELAUNCH.join("\n")}\n`)).toHaveLength(2);
    const file = runner();
    const declarations = file.statements.filter(ts.isFunctionDeclaration).filter((fn) => fn.name?.text === "attemptRelaunch");
    expect(declarations, "exactly one top-level attemptRelaunch()").toHaveLength(1);
    expect(declarations[0].getText(file)).toBe(ATTEMPT_RELAUNCH.join("\n"));
  });

  it("the name attemptRelaunch is bound once and otherwise only called as attemptRelaunch(id): nothing shadows, reassigns or aliases it", () => {
    const file = runner();
    const uses = identifiersNamed(file, "attemptRelaunch").map((identifier) => {
      const parent = identifier.parent;
      if (ts.isFunctionDeclaration(parent) && parent.name === identifier && parent.parent === file) return "top-level declaration";
      if (ts.isCallExpression(parent) && parent.expression === identifier) return `call ${parent.getText(file)}`;
      return `other ${ts.SyntaxKind[parent.kind]}: ${parent.getText(file)}`;
    });
    expect(uses).toEqual(["top-level declaration", "call attemptRelaunch(id)", "call attemptRelaunch(id)"]);
  });

  it("effectCrashJourney counts markers around its first same-id attempt as three consecutive statements", () => {
    const { file, journey } = effectCrashJourney();
    const statements = journey.body?.statements.map((statement) => statement.getText(file)) ?? [];
    expect(statements.filter((statement) => statement === STATEMENTS[1]), "the first attempt is live code, once").toHaveLength(1);
    const at = statements.indexOf(STATEMENTS[1]);
    expect(statements.slice(at - 1, at + 2)).toEqual(STATEMENTS);
  });

  it("the journey record reads that relaunch outcome itself, never a constant", () => {
    const { file, journey } = effectCrashJourney();
    const initializers = (name: string): string[] =>
      propertyAssignments(journey)
        .filter((property) => ts.isIdentifier(property.name) && property.name.text === name)
        .map((property) => property.initializer.getText(file));
    expect(initializers("relaunchRejected")).toEqual(["relaunch.rejected"]);
    expect(initializers("relaunchDiagnostic")).toEqual(["relaunch.diagnostic"]);
  });
});
