/**
 * wb-0kg.8 (VC-7/W16 residual): the detached-control-live receipt judges what it claims.
 *
 * Offline: the pure module is driven with a clean observed fixture and one mutant per finding rule, so a judge
 * that reported a constant instead of reading the journeys would fail here (rows 1-6 of the owner design). The
 * live journey file is read as TEXT only; real detached hosts are exercised solely by
 * `forge run detached-control-live`, never by this file. Row 7 pins the wiring (forge.toml block outside the
 * default gate, the vitest exclude/include split, the verbatim replica of the src/index.ts local-detached
 * executor leg) and row 8 pins the receipt shape, the typed-fields rule (wb-6hb.12) and the emission line.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessDetachedControlLiveJourneys,
  buildDetachedControlLiveReceipt,
  DETACHED_CONTROL_LIVE_CONTRACT,
  DETACHED_CONTROL_LIVE_FINDING_RULES,
  DETACHED_CONTROL_LIVE_JOURNEYS,
  DETACHED_CONTROL_LIVE_WORDING,
  DETACHED_DENIAL_POLICIES,
  exitCodeFor,
  reachedTerminal,
  STRICT_BOOTED_CITATION,
  TEXT_CAP,
} from "../qa/workbench/detached-control-live-receipt.mjs";

const HOST = "0123456789abcdef0123456789abcdef0123456789abcdef";
const ISO = "2026-10-17T10:00:00.000Z";

interface DenialJourney {
  realised: boolean;
  detail: string;
  reply: {
    ok: boolean;
    invoked: boolean;
    status: string;
    control: { status: string; category: string; policy: string; effect: string; reason: string; requiredGrant?: string };
    error: { code: string; category: string; message: string };
  };
  connectCallsDelta: number;
  hostControlAuditLengthDelta: number;
  seamCancelCalls: number;
  seamShutdownCalls: number;
  projectionMutated: boolean;
  postDenialObservation: string;
}
interface AuditEntry {
  command: string;
  accepted: boolean;
  ownership: string;
  terminalConfirmed: boolean;
}
interface ShutdownSide {
  invocationId: string;
  echo: { accepted: boolean; unresolvedEffects: boolean };
  outcome: string;
  nativeResultRef: string;
  taskControlAuditEntries: number;
}
interface Observed {
  revision: { head: string; dirty: boolean; toplevel: string; committedTree: boolean };
  wording: {
    security: string;
    lifetime: string;
    nativeRuntimeIdentity: string;
    evidenceClass: string;
    nonClaims: string[];
  };
  launchProfile: { permissions: string[]; deviatesFromPiTool: boolean };
  markerCounts: Record<string, number>;
  teardown: { hostsStopped: string[]; socketsUnlinked: string[]; leftovers: string[] };
  journeys: {
    "observer-close": {
      realised: boolean;
      detail: string;
      invocationId: string;
      hostPid: number;
      readerExit: { code: number | null; signal: string | null };
      readerAttached: boolean;
      markersAtClose: number;
      markersAfterClose: number;
      markersFinal: number;
      postCloseObservation: string;
      hostControlAuditAfterClose: unknown[];
      readerSeamCancelCalls: number;
      readerSeamShutdownCalls: number;
      wiringLedgerCancelEntries: number;
    };
    "non-owner-denial": DenialJourney;
    "observer-only-denial": DenialJourney;
    "missing-grant-denial": DenialJourney;
    "owner-cancel": {
      realised: boolean;
      detail: string;
      invocationId: string;
      reply: {
        ok: boolean;
        invoked: boolean;
        status: string;
        requested: { requestId: string; policy: string; invocationId: string; ownershipConfirmationRef: string; decidedAt: string };
        acknowledged: { acknowledgedAt: string; nativeAckRef: string };
        result: { outcome: string; nativeResultRef: string; settledAt: string };
        completionBasis: string;
      };
      echo: { accepted: boolean; terminalConfirmed: boolean };
      seamCancelCalls: number;
      connectCallsDelta: number;
      cancellationRequestedAtFirstInspect: boolean;
      hostTerminal: string;
      hostTerminalSource: string;
      hostControlAudit: AuditEntry[];
      otherHostsControlAuditEntries: number;
      wiringLedgerPhases: string[];
      markersFinal: number;
    };
    "revoked-grant": {
      realised: boolean;
      detail: string;
      first: { invocationId: string; requestId: string; outcome: string; nativeResultRef: string; hostTerminal: string };
      revokedReply: {
        ok: boolean;
        invoked: boolean;
        status: string;
        policy: string;
        category: string;
        effect: string;
        requiredGrant: string;
        reason: string;
      };
      connectCallsDeltaAfterRevoke: number;
      r2ControlAuditLength: number;
      r2Observation: string;
      r2MarkersFinal: number;
      projectionReadsServed: boolean;
      mintedReceiptsUnchanged: boolean;
      grantsReadCount: number;
    };
    "shutdown-unresolved": {
      realised: boolean;
      detail: string;
      running: ShutdownSide;
      idle: ShutdownSide;
      postShutdownInspect: { observation: string; source: string; terminal: string; reconcileHint: boolean };
      projectionEventsMatchReply: boolean;
    };
    "strict-booted-tool": { realised: boolean; detail: string };
  };
}

const clone = <T>(value: T): T => structuredClone(value);

function denial(policy: string, requiredGrant?: string): DenialJourney {
  const reasons: Record<string, string> = {
    "cross-scope": "The target is not observed in the requesting scope.",
    "observer-only": "Observer grants never control; no control grant is present.",
    "missing-exact-grant": "The exact per-verb control grant is required.",
  };
  return {
    realised: true,
    detail: `typed ${policy} denial with zero socket traffic`,
    reply: {
      ok: false,
      invoked: false,
      status: "refused",
      control: { status: "denied", category: "authorization", policy, effect: "none", reason: reasons[policy], ...(requiredGrant !== undefined ? { requiredGrant } : {}) },
      error: { code: policy, category: "authorization", message: policy },
    },
    connectCallsDelta: 0,
    hostControlAuditLengthDelta: 0,
    seamCancelCalls: 0,
    seamShutdownCalls: 0,
    projectionMutated: false,
    postDenialObservation: "observed-running",
  };
}

function clean(): Observed {
  return {
    revision: { head: "0123abc0123abc0123abc0123abc0123abc01239", dirty: false, toplevel: "owner-0kg8", committedTree: true },
    wording: {
      security: DETACHED_CONTROL_LIVE_WORDING.security,
      lifetime: DETACHED_CONTROL_LIVE_WORDING.lifetime,
      nativeRuntimeIdentity: DETACHED_CONTROL_LIVE_WORDING.nativeRuntimeIdentity,
      evidenceClass: DETACHED_CONTROL_LIVE_WORDING.evidenceClass,
      nonClaims: [...DETACHED_CONTROL_LIVE_WORDING.nonClaims],
    },
    launchProfile: { permissions: ["inspect", "execute", "cancel", "shutdown"], deviatesFromPiTool: true },
    markerCounts: { "dcl-observer": 1, "dcl-revoke-a": 1, "dcl-revoke-b": 1, "dcl-shutdown-running": 1 },
    teardown: { hostsStopped: ["dcl-observer", "dcl-revoke-a", "dcl-revoke-b"], socketsUnlinked: ["0123456789abcdef.sock"], leftovers: [] },
    journeys: {
      "observer-close": {
        realised: true,
        detail: "reader process exited 0; execution continued past the close",
        invocationId: "dcl-observer",
        hostPid: 4242,
        readerExit: { code: 0, signal: null },
        readerAttached: true,
        markersAtClose: 1,
        markersAfterClose: 1,
        markersFinal: 1,
        postCloseObservation: "observed-running",
        hostControlAuditAfterClose: [],
        readerSeamCancelCalls: 0,
        readerSeamShutdownCalls: 0,
        wiringLedgerCancelEntries: 0,
      },
      "non-owner-denial": denial("cross-scope"),
      "observer-only-denial": denial("observer-only"),
      "missing-grant-denial": denial("missing-exact-grant", "control:local-detached.cancel"),
      "owner-cancel": {
        realised: true,
        detail: "owner cancel acknowledged; terminal read only from the inspect snapshot",
        invocationId: "dcl-observer",
        reply: {
          ok: true,
          invoked: true,
          status: "settled",
          requested: {
            requestId: "ctl_0123456789abcdef0123456789abcdef",
            policy: "exact-grant+confirmed-owner+operator-confirmed",
            invocationId: "live-dcl-owner-cancel",
            ownershipConfirmationRef: `local-detached:${HOST}:4242:local-os:uid:1000`,
            decidedAt: ISO,
          },
          acknowledged: { acknowledgedAt: ISO, nativeAckRef: `local-detached:dcl-observer:${HOST}:cancel:accepted` },
          result: { outcome: "unknown", nativeResultRef: `local-detached:dcl-observer:${HOST}:cancel:terminalConfirmed=false`, settledAt: ISO },
          completionBasis: "producer-reported",
        },
        echo: { accepted: true, terminalConfirmed: false },
        seamCancelCalls: 1,
        connectCallsDelta: 1,
        cancellationRequestedAtFirstInspect: true,
        hostTerminal: "cancelled",
        hostTerminalSource: "inspect-snapshot",
        hostControlAudit: [{ command: "cancel", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false }],
        otherHostsControlAuditEntries: 0,
        wiringLedgerPhases: ["requested", "result"],
        markersFinal: 1,
      },
      "revoked-grant": {
        realised: true,
        detail: "revocation denied the next cancel while observation kept serving",
        first: {
          invocationId: "dcl-revoke-a",
          requestId: "ctl_aaaa456789abcdef0123456789abcdef",
          outcome: "unknown",
          nativeResultRef: `local-detached:dcl-revoke-a:${HOST}:cancel:terminalConfirmed=false`,
          hostTerminal: "cancelled",
        },
        revokedReply: {
          ok: false,
          invoked: false,
          status: "refused",
          policy: "missing-exact-grant",
          category: "authorization",
          effect: "none",
          requiredGrant: "control:local-detached.cancel",
          reason: "The exact per-verb control grant is required.",
        },
        connectCallsDeltaAfterRevoke: 0,
        r2ControlAuditLength: 0,
        r2Observation: "observed-running",
        r2MarkersFinal: 1,
        projectionReadsServed: true,
        mintedReceiptsUnchanged: true,
        grantsReadCount: 6,
      },
      "shutdown-unresolved": {
        realised: true,
        detail: "shutdown surfaced unresolvedEffects typed on both hosts",
        running: {
          invocationId: "dcl-shutdown-running",
          echo: { accepted: true, unresolvedEffects: true },
          outcome: "unknown",
          nativeResultRef: `local-detached:dcl-shutdown-running:${HOST}:shutdown:unresolvedEffects=true`,
          taskControlAuditEntries: 2,
        },
        idle: {
          invocationId: "dcl-shutdown-idle",
          echo: { accepted: true, unresolvedEffects: false },
          outcome: "completed",
          nativeResultRef: `local-detached:dcl-shutdown-idle:${HOST}:shutdown:unresolvedEffects=false`,
          taskControlAuditEntries: 2,
        },
        postShutdownInspect: { observation: "unknown", source: "local-client-transport", terminal: "unknown", reconcileHint: true },
        projectionEventsMatchReply: true,
      },
      "strict-booted-tool": {
        realised: false,
        detail:
          "UNREALISED (wb-79k.3 HELD): no src ingestion of detached readings — the src/index.ts projection writers are furnace_observe and the embedded workflow only, so the booted workflow_control denies local-detached targets cross-scope; the Pi launcher additionally pins permissions inspect+execute and a host-instance ref.",
      },
    },
  };
}

function rules(observed: Observed): string[] {
  return assessDetachedControlLiveJourneys(observed).findings.map((finding: { rule: string }) => finding.rule);
}

function receiptInput(observed: Observed) {
  const { wording: _wording, ...rest } = observed;
  return {
    utc: "2026-10-17T10:00:03.000Z",
    node: "v24.0.0",
    arch: "x64",
    platform: "linux",
    commands: {
      build: "npm run build",
      vitest: "./node_modules/.bin/vitest run --config vitest.detached-control-live.config.ts",
      forge: "forge run detached-control-live",
    },
    distHost: { path: "local-detached.js", realpath: true, sha256: "ab".repeat(32) },
    verbCounts: { connect: 3, inspect: 20, execute: 0, cancel: 3, shutdown: 2, teardown: { shutdown: 3, inspect: 6 } },
    diagnostics: [],
    ...rest,
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

describe("detached control live receipt: clean fixture and rosters", () => {
  it("passes a clean fixture with no findings and a realised measurement", () => {
    const assessed = assessDetachedControlLiveJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
  });

  it("pins the journey roster and the finding-rule roster order, frozen", () => {
    expect([...DETACHED_CONTROL_LIVE_JOURNEYS]).toEqual([
      "observer-close",
      "non-owner-denial",
      "observer-only-denial",
      "missing-grant-denial",
      "owner-cancel",
      "revoked-grant",
      "shutdown-unresolved",
      "strict-booted-tool",
    ]);
    expect([...DETACHED_CONTROL_LIVE_FINDING_RULES]).toEqual([
      "duplicate-effect",
      "observer-close-control-call",
      "child-stopped-by-reader-close",
      "denial-untyped",
      "denial-opened-socket",
      "unsanitized-denial",
      "owner-cancel-unaudited",
      "cancel-phase-collapsed",
      "cancel-echo-minted",
      "cancel-verb-count-violated",
      "mass-cancellation",
      "revocation-ignored",
      "observation-starved",
      "minted-receipt-rewritten",
      "unresolved-effects-hidden",
      "unresolved-effects-invented",
      "post-shutdown-terminal-minted",
      "uncommitted-tree",
      "host-leaked",
      "overclaim",
    ]);
    expect(Object.isFrozen(DETACHED_CONTROL_LIVE_FINDING_RULES)).toBe(true);
    expect(Object.isFrozen(DETACHED_CONTROL_LIVE_JOURNEYS)).toBe(true);
    expect(Object.isFrozen(DETACHED_CONTROL_LIVE_WORDING)).toBe(true);
    expect({ ...DETACHED_DENIAL_POLICIES }).toEqual({
      "non-owner-denial": "cross-scope",
      "observer-only-denial": "observer-only",
      "missing-grant-denial": "missing-exact-grant",
    });
    expect(STRICT_BOOTED_CITATION).toBe("wb-79k.3");
  });

  it("reachedTerminal is true for every terminal string and false for no terminal", () => {
    for (const terminal of ["unknown", "completed", "failed", "cancelled"]) expect(reachedTerminal({ terminal })).toBe(true);
    for (const snapshot of [{}, { terminal: "" }, { terminal: 3 }, null, undefined]) expect(reachedTerminal(snapshot as never)).toBe(false);
  });
});

describe("row 1 (AC1): observer close cancels nothing", () => {
  it("flags any control traffic recorded around the reader close, on any seam", () => {
    const cancel = clone(clean());
    cancel.journeys["observer-close"].readerSeamCancelCalls = 1;
    expect(rules(cancel)).toContain("observer-close-control-call");
    const shutdown = clone(clean());
    shutdown.journeys["observer-close"].readerSeamShutdownCalls = 1;
    expect(rules(shutdown)).toContain("observer-close-control-call");
    const audit = clone(clean());
    audit.journeys["observer-close"].hostControlAuditAfterClose = [{ command: "cancel" }];
    expect(rules(audit)).toContain("observer-close-control-call");
    const ledger = clone(clean());
    ledger.journeys["observer-close"].wiringLedgerCancelEntries = 1;
    expect(rules(ledger)).toContain("observer-close-control-call");
  });

  it("flags a child not running after the close, and a duplicated effect marker", () => {
    for (const observation of ["observed-terminal", "unknown"]) {
      const stopped = clone(clean());
      stopped.journeys["observer-close"].postCloseObservation = observation;
      expect(rules(stopped)).toContain("child-stopped-by-reader-close");
    }
    const duplicated = clone(clean());
    duplicated.journeys["observer-close"].markersAfterClose = 2;
    duplicated.journeys["observer-close"].markersFinal = 2;
    expect(rules(duplicated)).toContain("duplicate-effect");
    const counted = clone(clean());
    counted.markerCounts["dcl-observer"] = 2;
    expect(rules(counted)).toContain("duplicate-effect");
  });

  it("is not realised when the effect marker is absent or the reader did not exit 0", () => {
    const noMarker = clone(clean());
    noMarker.journeys["observer-close"].markersAtClose = 0;
    expect(assessDetachedControlLiveJourneys(noMarker).realised).toBe(false);
    const badExit = clone(clean());
    badExit.journeys["observer-close"].readerExit = { code: 1, signal: null };
    expect(assessDetachedControlLiveJourneys(badExit).realised).toBe(false);
  });
});

describe("rows 2 and 4 (AC2/AC3): typed denials with zero socket traffic", () => {
  const DENIAL_KEYS = ["non-owner-denial", "observer-only-denial", "missing-grant-denial"] as const;

  it("flags a denial that lost its typed shape, on any of the three journeys", () => {
    for (const key of DENIAL_KEYS) {
      const untypedOk = clone(clean());
      untypedOk.journeys[key].reply.ok = true;
      expect(rules(untypedOk)).toContain("denial-untyped");
      const invoked = clone(clean());
      invoked.journeys[key].reply.invoked = true;
      expect(rules(invoked)).toContain("denial-untyped");
      const policy = clone(clean());
      policy.journeys[key].reply.control.policy = "some-other-policy";
      expect(rules(policy)).toContain("denial-untyped");
      const effect = clone(clean());
      effect.journeys[key].reply.control.effect = "partial";
      expect(rules(effect)).toContain("denial-untyped");
    }
    const grantless = clone(clean());
    grantless.journeys["missing-grant-denial"].reply.control.requiredGrant = "control:local-detached.shutdown";
    expect(rules(grantless)).toContain("denial-untyped");
  });

  it("flags any socket, audit growth or control verb around a denial", () => {
    const connected = clone(clean());
    connected.journeys["non-owner-denial"].connectCallsDelta = 1;
    expect(rules(connected)).toContain("denial-opened-socket");
    const audited = clone(clean());
    audited.journeys["observer-only-denial"].hostControlAuditLengthDelta = 1;
    expect(rules(audited)).toContain("denial-opened-socket");
    const verb = clone(clean());
    verb.journeys["missing-grant-denial"].seamCancelCalls = 1;
    expect(rules(verb)).toContain("cancel-verb-count-violated");
    const stopped = clone(clean());
    stopped.journeys["non-owner-denial"].postDenialObservation = "unknown";
    expect(rules(stopped)).toContain("mass-cancellation");
  });

  it("flags an unsanitized denial: control characters, over-length or grant-list internals in the reason", () => {
    const control = clone(clean());
    control.journeys["non-owner-denial"].reply.control.reason = "denied\u001b[2J";
    expect(rules(control)).toContain("unsanitized-denial");
    const leaked = clone(clean());
    leaked.journeys["observer-only-denial"].reply.control.reason = "you only hold observe:local-detached.invocation";
    expect(rules(leaked)).toContain("unsanitized-denial");
    const long = clone(clean());
    long.journeys["missing-grant-denial"].reply.control.reason = "x".repeat(201);
    expect(rules(long)).toContain("unsanitized-denial");
  });
});

describe("rows 3 and 4 (AC2/AC3): the owner cancel echoes the host, never mints", () => {
  it("flags a missing, extra or altered host cancel audit entry", () => {
    const none = clone(clean());
    none.journeys["owner-cancel"].hostControlAudit = [];
    expect(rules(none)).toContain("owner-cancel-unaudited");
    const extra = clone(clean());
    extra.journeys["owner-cancel"].hostControlAudit.push({ command: "cancel", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false });
    expect(rules(extra)).toContain("owner-cancel-unaudited");
    const refused = clone(clean());
    refused.journeys["owner-cancel"].hostControlAudit[0].accepted = false;
    expect(rules(refused)).toContain("owner-cancel-unaudited");
  });

  it("flags an altered echo, a reply-claimed terminal, or a terminal taken from anywhere but the inspect snapshot", () => {
    const minted = clone(clean());
    minted.journeys["owner-cancel"].echo = { accepted: true, terminalConfirmed: true };
    expect(rules(minted)).toContain("cancel-echo-minted");
    const outcome = clone(clean());
    outcome.journeys["owner-cancel"].reply.result.outcome = "cancelled";
    expect(rules(outcome)).toContain("cancel-echo-minted");
    const ref = clone(clean());
    ref.journeys["owner-cancel"].reply.result.nativeResultRef = `local-detached:dcl-observer:${HOST}:cancel:terminalConfirmed=true`;
    expect(rules(ref)).toContain("cancel-echo-minted");
    const source = clone(clean());
    source.journeys["owner-cancel"].hostTerminalSource = "control-reply";
    expect(rules(source)).toContain("cancel-echo-minted");
  });

  it("flags collapsed phases: missing acknowledgement, no cancellationRequested at first inspect, no cancelled terminal", () => {
    const unacked = clone(clean());
    unacked.journeys["owner-cancel"].reply.acknowledged.nativeAckRef = "";
    expect(rules(unacked)).toContain("cancel-phase-collapsed");
    const skipped = clone(clean());
    skipped.journeys["owner-cancel"].cancellationRequestedAtFirstInspect = false;
    expect(rules(skipped)).toContain("cancel-phase-collapsed");
    const uncancelled = clone(clean());
    uncancelled.journeys["owner-cancel"].hostTerminal = "completed";
    expect(rules(uncancelled)).toContain("cancel-phase-collapsed");
    const phases = clone(clean());
    phases.journeys["owner-cancel"].wiringLedgerPhases = ["requested"];
    expect(rules(phases)).toContain("cancel-phase-collapsed");
  });

  it("flags a cancel verb count other than exactly one, and any sibling audit growth as mass-cancellation", () => {
    for (const count of [0, 2]) {
      const miscounted = clone(clean());
      miscounted.journeys["owner-cancel"].seamCancelCalls = count;
      expect(rules(miscounted)).toContain("cancel-verb-count-violated");
    }
    const sibling = clone(clean());
    sibling.journeys["owner-cancel"].otherHostsControlAuditEntries = 1;
    expect(rules(sibling)).toContain("mass-cancellation");
  });
});

describe("row 5 (AC4): mid-journey revocation", () => {
  it("flags an ignored revocation: a permitted reply, a wrong policy, a socket or audit growth after the revoke", () => {
    const permitted = clone(clean());
    permitted.journeys["revoked-grant"].revokedReply.ok = true;
    expect(rules(permitted)).toContain("revocation-ignored");
    const policy = clone(clean());
    policy.journeys["revoked-grant"].revokedReply.policy = "observer-only";
    expect(rules(policy)).toContain("revocation-ignored");
    const grant = clone(clean());
    grant.journeys["revoked-grant"].revokedReply.requiredGrant = "control:local-detached.shutdown";
    expect(rules(grant)).toContain("revocation-ignored");
    const connected = clone(clean());
    connected.journeys["revoked-grant"].connectCallsDeltaAfterRevoke = 1;
    expect(rules(connected)).toContain("revocation-ignored");
    const audited = clone(clean());
    audited.journeys["revoked-grant"].r2ControlAuditLength = 1;
    expect(rules(audited)).toContain("revocation-ignored");
  });

  it("flags starved observation and a rewritten minted receipt; a first cancel minted beyond the echo is cancel-echo-minted", () => {
    const starvedRead = clone(clean());
    starvedRead.journeys["revoked-grant"].projectionReadsServed = false;
    expect(rules(starvedRead)).toContain("observation-starved");
    const starvedHost = clone(clean());
    starvedHost.journeys["revoked-grant"].r2Observation = "unknown";
    expect(rules(starvedHost)).toContain("observation-starved");
    const rewritten = clone(clean());
    rewritten.journeys["revoked-grant"].mintedReceiptsUnchanged = false;
    expect(rules(rewritten)).toContain("minted-receipt-rewritten");
    const minted = clone(clean());
    minted.journeys["revoked-grant"].first.outcome = "cancelled";
    expect(rules(minted)).toContain("cancel-echo-minted");
  });

  it("is not realised when the per-call grant re-read was not proven (grantsReadCount < 2)", () => {
    const once = clone(clean());
    once.journeys["revoked-grant"].grantsReadCount = 1;
    expect(assessDetachedControlLiveJourneys(once).realised).toBe(false);
  });
});

describe("row 6 (AC5): shutdown surfaces unresolvedEffects typed; committed tree guarded", () => {
  it("flags hidden and invented unresolvedEffects, with the flag carried in nativeResultRef and outcome", () => {
    const hidden = clone(clean());
    hidden.journeys["shutdown-unresolved"].running.echo.unresolvedEffects = false;
    expect(rules(hidden)).toContain("unresolved-effects-hidden");
    const hiddenOutcome = clone(clean());
    hiddenOutcome.journeys["shutdown-unresolved"].running.outcome = "completed";
    expect(rules(hiddenOutcome)).toContain("unresolved-effects-hidden");
    const invented = clone(clean());
    invented.journeys["shutdown-unresolved"].idle.echo.unresolvedEffects = true;
    expect(rules(invented)).toContain("unresolved-effects-invented");
    const inventedOutcome = clone(clean());
    inventedOutcome.journeys["shutdown-unresolved"].idle.outcome = "unknown";
    expect(rules(inventedOutcome)).toContain("unresolved-effects-invented");
  });

  it("flags a post-shutdown inspect that mints any terminal instead of unknown-with-reconcile", () => {
    for (const terminal of ["completed", "failed", "cancelled"]) {
      const mintedTerminal = clone(clean());
      mintedTerminal.journeys["shutdown-unresolved"].postShutdownInspect.terminal = terminal;
      expect(rules(mintedTerminal)).toContain("post-shutdown-terminal-minted");
    }
    const noHint = clone(clean());
    noHint.journeys["shutdown-unresolved"].postShutdownInspect.reconcileHint = false;
    expect(rules(noHint)).toContain("post-shutdown-terminal-minted");
    const wrongSource = clone(clean());
    wrongSource.journeys["shutdown-unresolved"].postShutdownInspect.source = "live-detached-host";
    expect(rules(wrongSource)).toContain("post-shutdown-terminal-minted");
  });

  it("flags a wiring ledger or projection that does not agree with the reply as overclaim", () => {
    const audit = clone(clean());
    audit.journeys["shutdown-unresolved"].running.taskControlAuditEntries = 0;
    expect(rules(audit)).toContain("overclaim");
    const projected = clone(clean());
    projected.journeys["shutdown-unresolved"].projectionEventsMatchReply = false;
    expect(rules(projected)).toContain("overclaim");
  });

  it("flags a dirty, unknown-HEAD or mismatched-toplevel tree as uncommitted-tree (wb-7uq/wb-vko lesson)", () => {
    const dirty = clone(clean());
    dirty.revision.dirty = true;
    dirty.revision.committedTree = false;
    expect(rules(dirty)).toContain("uncommitted-tree");
    const unknown = clone(clean());
    unknown.revision.head = "unknown";
    expect(rules(unknown)).toContain("uncommitted-tree");
    const uncommitted = clone(clean());
    uncommitted.revision.committedTree = false;
    expect(rules(uncommitted)).toContain("uncommitted-tree");
  });

  it("flags every teardown leftover as host-leaked", () => {
    const leaked = clone(clean());
    leaked.teardown.leftovers = ["dcl-revoke-b 0123456789abcdef.sock"];
    expect(rules(leaked)).toContain("host-leaked");
  });

  it("reports a missing or unarmed journey as not realised rather than a pass, with the strict row exempt", () => {
    for (const key of ["observer-close", "non-owner-denial", "owner-cancel", "revoked-grant", "shutdown-unresolved"] as const) {
      const unarmed = clone(clean());
      unarmed.journeys[key].realised = false;
      expect(assessDetachedControlLiveJourneys(unarmed).realised).toBe(false);
    }
    const missing = clone(clean()) as unknown as { journeys: Record<string, unknown> };
    delete missing.journeys["shutdown-unresolved"];
    expect(assessDetachedControlLiveJourneys(missing as never).realised).toBe(false);
    expect(assessDetachedControlLiveJourneys(undefined as never).realised).toBe(false);
    // The declared strict-booted-tool row is unrealised BY DESIGN and must cite its held bead.
    expect(clean().journeys["strict-booted-tool"].realised).toBe(false);
    expect(assessDetachedControlLiveJourneys(clean()).realised).toBe(true);
    const uncited = clone(clean());
    uncited.journeys["strict-booted-tool"].detail = "unrealised for reasons";
    expect(assessDetachedControlLiveJourneys(uncited).realised).toBe(false);
  });
});

describe("row 7: wiring pins", () => {
  it("registers the live journey as one additive Forge command outside the default gate, after the forge-control-live precedent", () => {
    const forge = readRepo("forge.toml");
    expect(forge).toContain(
      '[build.commands.detached-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.detached-control-live.config.ts"\ntimeout = 600\n',
    );
    expect(forge.match(/\[build\.commands\.detached-control-live\]/g)).toHaveLength(1);
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("detached-control-live");
  });

  it("excludes the live file from the default vitest gate and gives it an include-only config", () => {
    const base = readRepo("vitest.config.ts");
    expect(base).toContain('"test/workbench-detached-control-live.test.ts"');
    const excludeLine = base.split("\n").find((line) => line.includes("exclude:")) ?? "";
    expect(excludeLine).toContain("test/workbench-detached-control-live.test.ts");
    const own = readRepo("vitest.detached-control-live.config.ts");
    expect(own).toContain('include: ["test/workbench-detached-control-live.test.ts"]');
    expect(own.match(/test\/workbench-[a-z-]+\.test\.ts/g)).toEqual(["test/workbench-detached-control-live.test.ts"]);
  });

  // D keeps the template placeholders out of plain strings (the git-stamp precedent).
  const D = "$";
  // The production local-detached executor leg, byte-for-byte as src/index.ts carries it (wb-cra landing).
  const INDEX_LEG = [
    '      "local-detached": async (_decision, request): Promise<ControlExecutionSummary> => {',
    '        const directory = join(getAgentDir(), "workbench-detached");',
    "        const execution = await executeDetachedControl({",
    "          request, deps: { projection }, connect: invocationId => workbenchNative().connectDetachedWorkflow(directory, invocationId), now: controlNow,",
    "        });",
    "        // The adapter decides from the same host-bound request; its own denial or refusal surfaces as the typed error it is.",
    '        if (execution.status === "denied") {',
    "          throw Object.assign(new CapabilityError(execution.decision.category, execution.decision.reason), { code: execution.decision.policy });",
    "        }",
    '        if (execution.status === "refused") {',
    `          throw Object.assign(new CapabilityError(execution.refusal.category, \`Detached control refused (${D}{execution.refusal.category}).\`), { code: "detached-refused" });`,
    "        }",
    "        return { receipt: execution.receipt, status: execution.status };",
    "      },",
  ].join("\n");
  // The harness replica, byte-for-byte as the live file carries it: the same leg around the same adapter, adapted
  // only by the three named substitutions (hosts root in place of the agent dir, the counted connect seam in place
  // of workbenchNative().connectDetachedWorkflow, the harness clock name).
  const REPLICA = [
    "const detachedExecutor: ControlExecutor = async (_decision, request): Promise<ControlExecutionSummary> => {",
    "  const execution = await executeDetachedControl({",
    "    request, deps: { projection }, connect: invocationId => countedConnect(invocationId), now: nowIso,",
    "  });",
    "  // The adapter decides from the same host-bound request; its own denial or refusal surfaces as the typed error it is.",
    '  if (execution.status === "denied") {',
    "    throw Object.assign(new CapabilityError(execution.decision.category, execution.decision.reason), { code: execution.decision.policy });",
    "  }",
    '  if (execution.status === "refused") {',
    `    throw Object.assign(new CapabilityError(execution.refusal.category, \`Detached control refused (${D}{execution.refusal.category}).\`), { code: "detached-refused" });`,
    "  }",
    "  return { receipt: execution.receipt, status: execution.status };",
    "};",
  ].join("\n");

  it("replica-drift census: src/index.ts carries the pinned leg once and the live file carries the pinned replica once", () => {
    expect(readRepo("src/index.ts").split(`${INDEX_LEG}\n`)).toHaveLength(2);
    expect(readRepo("test/workbench-detached-control-live.test.ts").split(`${REPLICA}\n`)).toHaveLength(2);
  });

  it("the replica is exactly the leg under the three named substitutions, nothing more", () => {
    const substituted = INDEX_LEG.split('        const directory = join(getAgentDir(), "workbench-detached");\n')
      .join("")
      .split('"local-detached": async')
      .join("const detachedExecutor: ControlExecutor = async")
      .split("workbenchNative().connectDetachedWorkflow(directory, invocationId)")
      .join("countedConnect(invocationId)")
      .split("controlNow")
      .join("nowIso")
      .replace(/},$/, "};");
    const normalized = (text: string): string => text.replace(/\s+/g, " ").trim();
    expect(normalized(substituted)).toBe(normalized(REPLICA));
  });

  it("the live file keeps the measurement rules: static top-level imports only, no any, no process.kill, no reconcile grant, scratch through the helpers", () => {
    const live = readRepo("test/workbench-detached-control-live.test.ts");
    expect(dynamicSpecifiersOf(live)).toEqual([]);
    const specifiers = specifiersOf(live);
    expect(specifiers.length).toBeGreaterThan(5);
    for (const specifier of specifiers) {
      expect(
        specifier.startsWith("node:") ||
          specifier === "vitest" ||
          specifier === "@earendil-works/pi-coding-agent" ||
          specifier.startsWith("../src/") ||
          specifier.startsWith("../qa/workbench/") ||
          specifier.startsWith("./helpers/"),
        `unexpected import specifier ${specifier}`,
      ).toBe(true);
    }
    expect(specifiers).toContain("../qa/workbench/detached-control-live-receipt.mjs");
    expect(specifiers).toContain("../qa/workbench/local-detached-faults-receipt.mjs");
    expect(specifiers).toContain("./helpers/fixture-roots.js");
    expect(specifiers).toContain("./helpers/scratch.js");
    expect(live).not.toMatch(/process\.kill/);
    expect(live).not.toMatch(/reconcile:/);
    expect(live).not.toMatch(/: any\b|as any\b|<any>/);
    expect(live).not.toMatch(/mkdtempSync\(join\(tmpdir\(\)/);
    expect(live).toContain("installScratchLeakGuard()");
    expect(live).toContain("chooseScratchBase(");
    expect(live).toContain("DETACHED_CONTROL_LIVE_RECEIPT ");
    expect(live).toContain("process.env.DETACHED_CONTROL_LIVE_RECEIPT");
    expect(live).toContain("wb-79k.3");
  });
});

describe("row 8: receipt shape, typed fields and the emission line", () => {
  it("builds a frozen receipt with every field, pass true, and the module-stamped wording that cannot be overclaimed by input", () => {
    const receipt = buildDetachedControlLiveReceipt({ ...receiptInput(clean()), wording: { security: "remote-authentication-proven" } });
    expect(receipt.contract).toBe("workbench.detached-control-live/v1");
    expect(DETACHED_CONTROL_LIVE_CONTRACT).toBe(receipt.contract);
    for (const field of [
      "contract",
      "utc",
      "revision",
      "node",
      "arch",
      "platform",
      "commands",
      "distHost",
      "wording",
      "launchProfile",
      "journeys",
      "markerCounts",
      "verbCounts",
      "teardown",
      "findings",
      "diagnostics",
      "realised",
      "pass",
    ]) {
      expect(receipt).toHaveProperty(field);
    }
    expect(receipt.wording.security).toBe(DETACHED_CONTROL_LIVE_WORDING.security);
    expect(receipt.wording.nonClaims).toEqual([...DETACHED_CONTROL_LIVE_WORDING.nonClaims]);
    expect(receipt.commands.forge).toBe("forge run detached-control-live");
    expect(receipt.findings).toEqual([]);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(true);
    const frozen = (value: unknown): void => {
      if (typeof value !== "object" || value === null) return;
      expect(Object.isFrozen(value)).toBe(true);
      for (const child of Object.values(value)) frozen(child);
    };
    frozen(receipt);
  });

  it("does not pass with findings, does not pass when not realised, and exit codes map 0/1/2", () => {
    expect(exitCodeFor(buildDetachedControlLiveReceipt(receiptInput(clean())))).toBe(0);
    const duplicate = clone(clean());
    duplicate.markerCounts["dcl-observer"] = 2;
    const withFindings = buildDetachedControlLiveReceipt(receiptInput(duplicate));
    expect(withFindings.realised).toBe(true);
    expect(withFindings.pass).toBe(false);
    expect(exitCodeFor(withFindings)).toBe(1);
    const unarmed = clone(clean());
    unarmed.journeys["owner-cancel"].realised = false;
    const notRealised = buildDetachedControlLiveReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(notRealised.pass).toBe(false);
    expect(exitCodeFor(notRealised)).toBe(2);
  });

  it("fails a text-only measured journey (wb-6hb.12: typed fields beside every capped text), with the strict row exempt", () => {
    const textOnly = clone(clean()) as unknown as { journeys: Record<string, unknown> };
    textOnly.journeys["observer-close"] = { realised: true, detail: "it went fine" };
    expect(assessDetachedControlLiveJourneys(textOnly as never).findings.map((finding: { rule: string }) => finding.rule)).toContain("overclaim");
    expect(rules(clean())).toEqual([]);
    const longText = clone(clean());
    longText.journeys["owner-cancel"].detail = "x".repeat(TEXT_CAP + 1);
    expect(rules(longText)).toContain("overclaim");
  });

  it("flags wording drift and a hidden launch-profile deviation as overclaim", () => {
    const worded = clone(clean());
    worded.wording.security = "remote-authentication-proven";
    expect(rules(worded)).toContain("overclaim");
    const unclaimed = clone(clean());
    unclaimed.wording.nonClaims = [];
    expect(rules(unclaimed)).toContain("overclaim");
    const hiddenDeviation = clone(clean());
    hiddenDeviation.launchProfile.deviatesFromPiTool = false;
    expect(rules(hiddenDeviation)).toContain("overclaim");
    const trimmed = clone(clean());
    trimmed.launchProfile.permissions = ["inspect", "execute"];
    expect(rules(trimmed)).toContain("overclaim");
  });

  it("reduces every absolute filesystem path to its basename and parses back from the emission line", () => {
    const observed = clone(clean());
    observed.journeys["owner-cancel"].detail = "cancelled; see /tmp/wb-dcl-abc123/hosts/dcl-observer/receipt.json";
    const receipt = buildDetachedControlLiveReceipt(receiptInput(observed));
    const line = `DETACHED_CONTROL_LIVE_RECEIPT ${JSON.stringify(receipt)}`;
    expect(line).not.toMatch(/\/tmp\/|wb-dcl-abc123\/hosts/);
    const parsed = JSON.parse(line.slice("DETACHED_CONTROL_LIVE_RECEIPT ".length)) as { contract: string; pass: boolean; realised: boolean };
    expect(parsed.contract).toBe(DETACHED_CONTROL_LIVE_CONTRACT);
    expect(parsed.pass).toBe(parsed.realised && receipt.findings.length === 0);
  });

  it("rejects a receipt built without its identifying fields", () => {
    const input = receiptInput(clean());
    const { utc: _utc, ...withoutUtc } = input;
    expect(() => buildDetachedControlLiveReceipt(withoutUtc)).toThrow(/utc/);
    expect(() => buildDetachedControlLiveReceipt({ ...input, revision: undefined })).toThrow(/revision/);
    expect(() => buildDetachedControlLiveReceipt({ ...input, commands: undefined })).toThrow(/commands/);
    expect(() => buildDetachedControlLiveReceipt({ ...input, distHost: undefined })).toThrow(/distHost/);
  });
});
