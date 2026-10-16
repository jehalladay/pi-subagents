/**
 * wb-a2g.3 (VC-1 residual), contract v2 after the adversarial review of the v1 receipt:
 * the live terminal operator receipt measures what it claims.
 *
 * Offline assessor tests, red-first: the pure judgement module in
 * qa/workbench/live-operator-receipt.mjs is driven with fabricated journey measurements —
 * one good pair, then one mutant per finding rule and per unrealised reason — so a runner
 * that fabricated frames, counted the card's planned total as started agents, accepted prose
 * as a done marker, or papered over a missing journey would fail here. The live pty run itself
 * happens only when the harness runs as a CLI; nothing in this file reaches a pty, the SDK, or
 * the network.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessOperatorJourneys,
  buildOperatorReceipt,
  exitCodeFor,
  OPERATOR_FINDING_RULES,
  OPERATOR_JOURNEYS,
  OPERATOR_RECEIPT_CONTRACT,
  OPERATOR_UNREALISED_REASONS,
} from "../qa/workbench/live-operator-receipt.mjs";

interface CompletionJourneyFixture {
  captureRef: string;
  launchAt: string;
  toolStartedAt: string;
  firstLiveFrameAt: string;
  sessionIdSeenAt?: string;
  completionSeenAt?: string;
  inspectionPromptSentAt?: string;
  structuredOutputSeenAt?: string;
  sessionIdsDuringRun: readonly string[];
  sessionIdsAll: readonly string[];
  sessionIdsVerified: readonly string[];
  sessionProvidersObserved: readonly string[];
  sessionIdFirstIndex?: number;
  doneFirstIndex?: number;
  agentCount: number;
  markersPresentBeforeInspection: boolean;
  structuredOutputShown: boolean;
  completionNotificationShown: boolean;
}

interface CancellationJourneyFixture {
  captureRef: string;
  journalRef: string;
  launchAt: string;
  firstLiveFrameAt: string;
  sessionIdSeenAt?: string;
  sessionIdsDuringRun: readonly string[];
  sessionIdsVerified: readonly string[];
  interruptSentAt?: string;
  ctrlCStoppedWorkflow?: boolean;
  explicitCancelSentAt?: string;
  interruptAcknowledgedAt?: string;
  completionSeenAt?: string;
  exitAt?: string;
  startedAgentsObserved: number;
  settledJournalRows: number;
  agentCount: number;
}

interface JourneysFixture {
  completion?: CompletionJourneyFixture;
  cancellation?: CancellationJourneyFixture;
}

interface Assessment {
  findings: readonly string[];
  realised: boolean;
  reasons: readonly string[];
}

interface OperatorReceipt {
  contract: string;
  utc: string;
  revision: string;
  journeys: JourneysFixture;
  diagnostics: readonly string[];
  unavailability?: string;
  findings: readonly string[];
  realised: boolean;
  reasons: readonly string[];
  pass: boolean;
}

interface BuildInput {
  utc: string;
  revision: string;
  node: string;
  platform: string;
  arch: string;
  journeys: JourneysFixture;
  diagnostics?: readonly string[];
  unavailability?: string;
}

const assess = assessOperatorJourneys as (input: { journeys: JourneysFixture; unavailability?: string }) => Assessment;
const build = buildOperatorReceipt as (input: BuildInput) => OperatorReceipt;
const exitOf = exitCodeFor as (receipt: { realised: boolean; findings: readonly string[] }) => number;
const RULES = OPERATOR_FINDING_RULES as readonly string[];
const REASONS = OPERATOR_UNREALISED_REASONS as readonly string[];
const JOURNEYS = OPERATOR_JOURNEYS as readonly string[];
const CONTRACT = OPERATOR_RECEIPT_CONTRACT as string;

const SESSIONS = [
  "11111111-aaaa-4bbb-8ccc-000000000001",
  "11111111-aaaa-4bbb-8ccc-000000000002",
  "11111111-aaaa-4bbb-8ccc-000000000003",
  "11111111-aaaa-4bbb-8ccc-000000000004",
];

function goodCompletion(): CompletionJourneyFixture {
  return {
    captureRef: "completion.capture.txt",
    launchAt: "2026-10-15T21:00:00.000Z",
    toolStartedAt: "2026-10-15T21:00:10.000Z",
    firstLiveFrameAt: "2026-10-15T21:00:10.000Z",
    sessionIdSeenAt: "2026-10-15T21:00:12.000Z",
    completionSeenAt: "2026-10-15T21:00:35.000Z",
    inspectionPromptSentAt: "2026-10-15T21:00:40.000Z",
    structuredOutputSeenAt: "2026-10-15T21:00:48.000Z",
    sessionIdsDuringRun: [SESSIONS[0]],
    sessionIdsAll: [...SESSIONS],
    sessionIdsVerified: [...SESSIONS],
    sessionProvidersObserved: ["claude-agent-sdk"],
    sessionIdFirstIndex: 4_000,
    doneFirstIndex: 9_000,
    agentCount: 4,
    markersPresentBeforeInspection: false,
    structuredOutputShown: true,
    completionNotificationShown: true,
  };
}

function goodCancellation(): CancellationJourneyFixture {
  return {
    captureRef: "cancellation.capture.txt",
    journalRef: "wf_cancel.workflow.jsonl",
    launchAt: "2026-10-15T21:05:00.000Z",
    firstLiveFrameAt: "2026-10-15T21:05:10.000Z",
    sessionIdSeenAt: "2026-10-15T21:05:12.000Z",
    sessionIdsDuringRun: [SESSIONS[0], SESSIONS[1]],
    sessionIdsVerified: [SESSIONS[0], SESSIONS[1]],
    interruptSentAt: "2026-10-15T21:05:14.000Z",
    ctrlCStoppedWorkflow: false,
    explicitCancelSentAt: "2026-10-15T21:05:19.000Z",
    interruptAcknowledgedAt: "2026-10-15T21:05:19.400Z",
    exitAt: "2026-10-15T21:05:21.000Z",
    startedAgentsObserved: 2,
    settledJournalRows: 0,
    agentCount: 4,
  };
}

function goodJourneys(): JourneysFixture {
  return { completion: goodCompletion(), cancellation: goodCancellation() };
}

function withCompletion(patch: Partial<CompletionJourneyFixture>): JourneysFixture {
  return { completion: { ...goodCompletion(), ...patch }, cancellation: goodCancellation() };
}

function withCancellation(patch: Partial<CancellationJourneyFixture>): JourneysFixture {
  return { completion: goodCompletion(), cancellation: { ...goodCancellation(), ...patch } };
}

describe("operator receipt contract surface", () => {
  it("pins the v2 contract literal and the journey keys", () => {
    expect(CONTRACT).toBe("workbench.operator-journey/v2");
    expect([...JOURNEYS]).toEqual(["completion", "cancellation"]);
  });

  it("declares every finding rule the assessor can report, in order", () => {
    expect([...RULES]).toEqual([
      "session-id-not-live",
      "session-ids-incomplete",
      "non-sdk-session-provider",
      "structured-output-missing",
      "completion-not-shown",
      "capture-order-violated",
      "interrupt-unacknowledged",
      "interrupt-before-live",
      "false-completion-after-interrupt",
    ]);
  });

  it("declares every unrealised reason, in order", () => {
    expect([...REASONS]).toEqual([
      "unavailable",
      "completion-journey-unarmed",
      "cancellation-journey-unarmed",
      "no-agent-cancelled",
    ]);
  });
});

describe("assessOperatorJourneys — realisation", () => {
  it("passes a fully realised clean pair with no findings and no reasons", () => {
    const verdict = assess({ journeys: goodJourneys() });
    expect(verdict).toEqual({ findings: [], realised: true, reasons: [] });
  });

  it("is unrealised with a typed reason when either journey is missing", () => {
    expect(assess({ journeys: { completion: goodCompletion() } }).reasons).toEqual(["cancellation-journey-unarmed"]);
    expect(assess({ journeys: { cancellation: goodCancellation() } }).reasons).toEqual(["completion-journey-unarmed"]);
    expect(assess({ journeys: {} }).reasons).toEqual(["completion-journey-unarmed", "cancellation-journey-unarmed"]);
  });

  it("treats a typed unavailability as unrealised before any journey is judged", () => {
    const verdict = assess({ journeys: goodJourneys(), unavailability: "claude-live credentials unusable" });
    expect(verdict.realised).toBe(false);
    expect(verdict.reasons[0]).toBe("unavailable");
  });

  it("refuses to arm a cancellation journey that never showed a native session (the v1 hole)", () => {
    const noSession = withCancellation({ sessionIdsDuringRun: [], startedAgentsObserved: 4 });
    expect(assess({ journeys: noSession }).reasons).toEqual(["cancellation-journey-unarmed"]);
    const { sessionIdSeenAt: _dropped, ...rest } = goodCancellation();
    expect(assess({ journeys: { completion: goodCompletion(), cancellation: rest as CancellationJourneyFixture } }).reasons)
      .toEqual(["cancellation-journey-unarmed"]);
  });

  it("refuses to arm a cancellation journey whose Ctrl-C did nothing and whose explicit cancel is unstamped", () => {
    const { explicitCancelSentAt: _dropped, ...rest } = goodCancellation();
    expect(assess({ journeys: { completion: goodCompletion(), cancellation: rest as CancellationJourneyFixture } }).reasons)
      .toEqual(["cancellation-journey-unarmed"]);
    const { ctrlCStoppedWorkflow: _alsoDropped, ...noFlag } = goodCancellation();
    expect(assess({ journeys: { completion: goodCompletion(), cancellation: noFlag as CancellationJourneyFixture } }).reasons)
      .toEqual(["cancellation-journey-unarmed"]);
  });

  it("makes 'nothing was actually cancelled' UNREALISED per O3, never a finding", () => {
    const allSettled = assess({ journeys: withCancellation({ settledJournalRows: 2 }) });
    expect(allSettled.realised).toBe(false);
    expect(allSettled.reasons).toEqual(["no-agent-cancelled"]);
    expect(allSettled.findings).toEqual([]);
  });
});

describe("assessOperatorJourneys — finding rules", () => {
  it("flags a session id never observed before completion, by clock or by capture offset (O1)", () => {
    expect(assess({ journeys: withCompletion({ sessionIdsDuringRun: [] }) }).findings).toContain("session-id-not-live");
    expect(assess({ journeys: withCompletion({ sessionIdSeenAt: "2026-10-15T21:00:36.000Z" }) }).findings).toContain("session-id-not-live");
    expect(assess({ journeys: withCompletion({ sessionIdFirstIndex: 9_500, doneFirstIndex: 9_000 }) }).findings).toContain("session-id-not-live");
    const { sessionIdSeenAt: _dropped, ...rest } = goodCompletion();
    expect(assess({ journeys: { completion: rest as CompletionJourneyFixture, cancellation: goodCancellation() } }).findings)
      .toContain("session-id-not-live");
  });

  it("flags fewer transcript-verified session ids than agents, ignoring unverified regex hits (O2)", () => {
    const unverified = withCompletion({ sessionIdsAll: [...SESSIONS], sessionIdsVerified: [SESSIONS[0], SESSIONS[1], SESSIONS[2]] });
    expect(assess({ journeys: unverified }).findings).toContain("session-ids-incomplete");
    const duplicated = withCompletion({ sessionIdsVerified: [SESSIONS[0], SESSIONS[0], SESSIONS[1], SESSIONS[2]] });
    expect(assess({ journeys: duplicated }).findings).toContain("session-ids-incomplete");
  });

  it("flags any observed session provider that is not the SDK, and no provider at all (O2)", () => {
    expect(assess({ journeys: withCompletion({ sessionProvidersObserved: ["claude-agent-sdk", "pi-workflow"] }) }).findings)
      .toContain("non-sdk-session-provider");
    expect(assess({ journeys: withCompletion({ sessionProvidersObserved: [] }) }).findings).toContain("non-sdk-session-provider");
  });

  it("flags structured output missing, or already echoed before the inspection prompt (O4)", () => {
    expect(assess({ journeys: withCompletion({ structuredOutputShown: false, structuredOutputSeenAt: undefined }) }).findings)
      .toContain("structured-output-missing");
    expect(assess({ journeys: withCompletion({ markersPresentBeforeInspection: true }) }).findings).toContain("structured-output-missing");
  });

  it("flags a completion journey whose terminal never rendered the finished run", () => {
    expect(assess({ journeys: withCompletion({ completionNotificationShown: false, completionSeenAt: undefined }) }).findings)
      .toContain("completion-not-shown");
  });

  it("flags decreasing reader timestamps in either journey as a fabrication signal", () => {
    expect(assess({ journeys: withCompletion({ firstLiveFrameAt: "2026-10-15T20:59:00.000Z" }) }).findings).toContain("capture-order-violated");
    expect(assess({ journeys: withCancellation({ exitAt: "2026-10-15T21:05:19.100Z" }) }).findings).toContain("capture-order-violated");
  });

  it("accepts equal stamps from one reader poll (non-decreasing, not strictly increasing)", () => {
    const sameTick = withCompletion({ toolStartedAt: "2026-10-15T21:00:10.000Z", firstLiveFrameAt: "2026-10-15T21:00:10.000Z" });
    expect(assess({ journeys: sameTick }).findings).not.toContain("capture-order-violated");
  });

  it("pairs the acknowledgement with the gesture that was acknowledged (O3 requested -> acknowledged)", () => {
    expect(assess({ journeys: withCancellation({ interruptAcknowledgedAt: undefined }) }).findings).toContain("interrupt-unacknowledged");
    // An ack that precedes the explicit cancel cannot have acknowledged it.
    expect(assess({ journeys: withCancellation({ interruptAcknowledgedAt: "2026-10-15T21:05:18.000Z" }) }).findings)
      .toContain("interrupt-unacknowledged");
    // When Ctrl-C itself stopped the run, the Ctrl-C stamp is the gesture.
    const ctrlC = withCancellation({ ctrlCStoppedWorkflow: true, explicitCancelSentAt: undefined, interruptAcknowledgedAt: "2026-10-15T21:05:14.300Z" });
    expect(assess({ journeys: ctrlC }).findings).not.toContain("interrupt-unacknowledged");
  });

  it("flags an interrupt sent before a native session was visible (O3 mid-execution)", () => {
    expect(assess({ journeys: withCancellation({ interruptSentAt: "2026-10-15T21:05:11.000Z", explicitCancelSentAt: "2026-10-15T21:05:11.500Z" }) }).findings)
      .toContain("interrupt-before-live");
  });

  it("flags a completion rendered at or after the acknowledged stop, not one before the interrupt (O3)", () => {
    expect(assess({ journeys: withCancellation({ completionSeenAt: "2026-10-15T21:05:20.000Z" }) }).findings)
      .toContain("false-completion-after-interrupt");
    expect(assess({ journeys: withCancellation({ completionSeenAt: "2026-10-15T21:05:19.400Z" }) }).findings)
      .toContain("false-completion-after-interrupt");
  });

  it("reports every finding it can see at once, in rule order", () => {
    const wrecked: JourneysFixture = {
      completion: { ...goodCompletion(), sessionIdsDuringRun: [], structuredOutputShown: false },
      cancellation: { ...goodCancellation(), completionSeenAt: "2026-10-15T21:05:20.000Z" },
    };
    expect(assess({ journeys: wrecked }).findings).toEqual(
      RULES.filter(rule => ["session-id-not-live", "structured-output-missing", "false-completion-after-interrupt"].includes(rule)),
    );
  });
});

describe("buildOperatorReceipt and exitCodeFor", () => {
  const base = { utc: "2026-10-15T21:10:00.000Z", revision: "e07474a", node: "v24.0.0", platform: "linux", arch: "x64" };

  it("shapes a frozen passing receipt from clean journeys", () => {
    const receipt = build({ ...base, journeys: goodJourneys() });
    expect(receipt.contract).toBe(CONTRACT);
    expect(receipt.realised).toBe(true);
    expect(receipt.findings).toEqual([]);
    expect(receipt.reasons).toEqual([]);
    expect(receipt.pass).toBe(true);
    expect(receipt.unavailability).toBeUndefined();
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys)).toBe(true);
    expect(exitOf(receipt)).toBe(0);
  });

  it("reduces absolute capture, journal and diagnostic paths to basenames", () => {
    const journeys = withCompletion({ captureRef: "/tmp/pi-subagents-1234/enc/sess/tasks/completion.capture.txt" });
    journeys.cancellation = { ...goodCancellation(), journalRef: "/tmp/pi-subagents-1234/enc/sess/tasks/wf_cancel.workflow.jsonl" };
    const receipt = build({ ...base, journeys, diagnostics: ["read /home/someone/secret/area.log tail"] });
    const text = JSON.stringify(receipt);
    expect(text).not.toContain("/tmp/pi-subagents-1234");
    expect(text).not.toContain("/home/someone");
    expect(receipt.journeys.completion?.captureRef).toBe("completion.capture.txt");
    expect(receipt.journeys.cancellation?.journalRef).toBe("wf_cancel.workflow.jsonl");
  });

  it("carries a typed unavailability as a first-class field that can never pass (exit 2)", () => {
    const receipt = build({ ...base, journeys: {}, unavailability: "claude-live probe failed: /home/someone/.anthropic missing" });
    expect(receipt.unavailability).toBe("claude-live probe failed: .anthropic missing");
    expect(receipt.realised).toBe(false);
    expect(receipt.reasons[0]).toBe("unavailable");
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(2);
  });

  it("maps an unarmed measurement to exit 2 and never to a pass", () => {
    const receipt = build({ ...base, journeys: { completion: goodCompletion() } });
    expect(receipt.realised).toBe(false);
    expect(receipt.reasons).toEqual(["cancellation-journey-unarmed"]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(2);
  });

  it("maps realised-with-findings to exit 1", () => {
    const receipt = build({ ...base, journeys: withCancellation({ completionSeenAt: "2026-10-15T21:05:20.000Z" }) });
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });
});

describe("the committed wb-a2g.3 receipt", () => {
  // The receipt TRACEABILITY cites, re-judged by the CURRENT assessor: a later rule change that would
  // no longer accept this evidence fails here instead of leaving the narrative stale.
  const committed = JSON.parse(
    readFileSync(new URL("../qa/workbench/receipts/wb-a2g.3-operator-receipt.json", import.meta.url), "utf8"),
  ) as OperatorReceipt & { preflight?: { nativeModels?: readonly string[] } };

  it("is a v2 receipt that still passes the current judge, with every path reduced to a basename", () => {
    expect(committed.contract).toBe(CONTRACT);
    expect(assess({ journeys: committed.journeys })).toEqual({ findings: [], realised: true, reasons: [] });
    expect(committed.pass).toBe(true);
    expect(JSON.stringify(committed)).not.toMatch(/\/(?:tmp|home|workplace)\//);
  });

  it("carries the evidence v1 lacked: transcript-verified sessions in both journeys and the native model", () => {
    const completion = committed.journeys.completion as CompletionJourneyFixture;
    const cancellation = committed.journeys.cancellation as CancellationJourneyFixture;
    expect(new Set(completion.sessionIdsVerified).size).toBe(completion.agentCount);
    expect(cancellation.sessionIdsDuringRun.length).toBeGreaterThan(0);
    expect(cancellation.startedAgentsObserved).toBeGreaterThan(cancellation.settledJournalRows);
    expect(cancellation.ctrlCStoppedWorkflow).toBe(false);
    expect(committed.preflight?.nativeModels?.length ?? 0).toBeGreaterThan(0);
  });
});
