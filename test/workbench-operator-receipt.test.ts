/**
 * wb-a2g.3 (VC-1 residual): the live terminal operator receipt measures what it claims.
 *
 * Offline assessor tests, red-first: the pure judgement module in
 * qa/workbench/live-operator-receipt.mjs is driven with fabricated journey measurements —
 * one good pair, then one mutant per finding rule — so a runner that fabricated frames,
 * reported a constant, or papered over a missing journey would fail here. The live pty
 * run itself happens only when the harness runs as a CLI; nothing in this file reaches
 * a pty, the SDK, or the network.
 */
import { describe, expect, it } from "vitest";
import {
  assessOperatorJourneys,
  buildOperatorReceipt,
  exitCodeFor,
  OPERATOR_FINDING_RULES,
  OPERATOR_JOURNEYS,
  OPERATOR_RECEIPT_CONTRACT,
} from "../qa/workbench/live-operator-receipt.mjs";

interface CompletionJourneyFixture {
  captureRef: string;
  launchAt: string;
  toolStartedAt: string;
  firstLiveFrameAt: string;
  sessionIdSeenAt?: string;
  structuredOutputSeenAt?: string;
  completionSeenAt?: string;
  sessionIdsDuringRun: readonly string[];
  sessionIdsAll: readonly string[];
  agentCount: number;
  claudeBackendConfigured: boolean;
  structuredOutputShown: boolean;
  completionNotificationShown: boolean;
}

interface CancellationJourneyFixture {
  captureRef: string;
  journalRef: string;
  launchAt: string;
  firstLiveFrameAt: string;
  interruptSentAt?: string;
  interruptAcknowledgedAt?: string;
  exitAt?: string;
  startedAgentsObserved: number;
  settledJournalRows: number;
  agentCount: number;
  falseCompletionShown: boolean;
}

interface JourneysFixture {
  completion?: CompletionJourneyFixture;
  cancellation?: CancellationJourneyFixture;
}

interface Assessment {
  findings: readonly string[];
  realised: boolean;
}

interface OperatorReceipt {
  contract: string;
  utc: string;
  revision: string;
  node: string;
  platform: string;
  arch: string;
  journeys: JourneysFixture;
  diagnostics: readonly string[];
  findings: readonly string[];
  realised: boolean;
  pass: boolean;
}

const assess = assessOperatorJourneys as (input: { journeys: JourneysFixture }) => Assessment;
const build = buildOperatorReceipt as (input: {
  utc: string;
  revision: string;
  node: string;
  platform: string;
  arch: string;
  journeys: JourneysFixture;
  diagnostics?: readonly string[];
}) => OperatorReceipt;
const exitOf = exitCodeFor as (receipt: { realised: boolean; findings: readonly string[] }) => number;
const RULES = OPERATOR_FINDING_RULES as readonly string[];
const JOURNEYS = OPERATOR_JOURNEYS as readonly string[];
const CONTRACT = OPERATOR_RECEIPT_CONTRACT as string;

function goodCompletion(): CompletionJourneyFixture {
  return {
    captureRef: "completion.capture.txt",
    launchAt: "2026-10-15T21:00:00.000Z",
    toolStartedAt: "2026-10-15T21:00:10.000Z",
    firstLiveFrameAt: "2026-10-15T21:00:12.000Z",
    sessionIdSeenAt: "2026-10-15T21:00:14.000Z",
    structuredOutputSeenAt: "2026-10-15T21:00:30.000Z",
    completionSeenAt: "2026-10-15T21:00:25.000Z",
    sessionIdsDuringRun: ["11111111-aaaa-4bbb-8ccc-000000000001"],
    sessionIdsAll: [
      "11111111-aaaa-4bbb-8ccc-000000000001",
      "11111111-aaaa-4bbb-8ccc-000000000002",
    ],
    agentCount: 2,
    claudeBackendConfigured: true,
    structuredOutputShown: true,
    completionNotificationShown: true,
  };
}

function goodCancellation(): CancellationJourneyFixture {
  return {
    captureRef: "cancellation.capture.txt",
    journalRef: "wf_cancel.workflow.jsonl",
    launchAt: "2026-10-15T21:05:00.000Z",
    firstLiveFrameAt: "2026-10-15T21:05:12.000Z",
    interruptSentAt: "2026-10-15T21:05:15.000Z",
    interruptAcknowledgedAt: "2026-10-15T21:05:15.400Z",
    exitAt: "2026-10-15T21:05:16.000Z",
    startedAgentsObserved: 2,
    settledJournalRows: 0,
    agentCount: 2,
    falseCompletionShown: false,
  };
}

function goodJourneys(): JourneysFixture {
  return { completion: goodCompletion(), cancellation: goodCancellation() };
}

describe("operator receipt contract surface", () => {
  it("pins the contract literal and the journey keys", () => {
    expect(CONTRACT).toBe("workbench.operator-journey/v1");
    expect([...JOURNEYS]).toEqual(["completion", "cancellation"]);
  });

  it("declares every finding rule the assessor can report, in order", () => {
    expect([...RULES]).toEqual([
      "session-id-not-live",
      "session-ids-incomplete",
      "pi-agentmanager-path",
      "structured-output-missing",
      "completion-not-shown",
      "capture-order-violated",
      "interrupt-unacknowledged",
      "interrupt-before-live",
      "false-completion-after-interrupt",
      "no-agent-cancelled",
    ]);
  });
});

describe("assessOperatorJourneys", () => {
  it("passes a fully realised clean pair with no findings", () => {
    const verdict = assess({ journeys: goodJourneys() });
    expect(verdict.realised).toBe(true);
    expect(verdict.findings).toEqual([]);
  });

  it("is not realised when either journey is missing, and reports no fabricated findings", () => {
    for (const partial of [
      { completion: goodCompletion() },
      { cancellation: goodCancellation() },
      {},
    ] satisfies JourneysFixture[]) {
      const verdict = assess({ journeys: partial });
      expect(verdict.realised).toBe(false);
    }
  });

  it("flags a session id that was never observed before completion (O1)", () => {
    const noneDuring = goodJourneys();
    noneDuring.completion = { ...goodCompletion(), sessionIdsDuringRun: [] };
    expect(assess({ journeys: noneDuring }).findings).toContain("session-id-not-live");

    const lateSeen = goodJourneys();
    lateSeen.completion = { ...goodCompletion(), sessionIdSeenAt: "2026-10-15T21:00:26.000Z" };
    expect(assess({ journeys: lateSeen }).findings).toContain("session-id-not-live");

    const neverSeen = goodJourneys();
    const { sessionIdSeenAt: _dropped, ...rest } = goodCompletion();
    neverSeen.completion = rest as CompletionJourneyFixture;
    expect(assess({ journeys: neverSeen }).findings).toContain("session-id-not-live");
  });

  it("flags fewer distinct native session ids than agents (O2)", () => {
    const short = goodJourneys();
    short.completion = {
      ...goodCompletion(),
      sessionIdsAll: ["11111111-aaaa-4bbb-8ccc-000000000001"],
    };
    expect(assess({ journeys: short }).findings).toContain("session-ids-incomplete");

    const duplicated = goodJourneys();
    duplicated.completion = {
      ...goodCompletion(),
      sessionIdsAll: [
        "11111111-aaaa-4bbb-8ccc-000000000001",
        "11111111-aaaa-4bbb-8ccc-000000000001",
      ],
    };
    expect(assess({ journeys: duplicated }).findings).toContain("session-ids-incomplete");
  });

  it("flags the Pi AgentManager path when the claude backend was not the configured path (O2)", () => {
    const wrongBackend = goodJourneys();
    wrongBackend.completion = { ...goodCompletion(), claudeBackendConfigured: false };
    expect(assess({ journeys: wrongBackend }).findings).toContain("pi-agentmanager-path");
  });

  it("flags structured output never shown through the terminal surface (O4)", () => {
    const hidden = goodJourneys();
    hidden.completion = {
      ...goodCompletion(),
      structuredOutputShown: false,
      structuredOutputSeenAt: undefined,
    };
    expect(assess({ journeys: hidden }).findings).toContain("structured-output-missing");
  });

  it("flags a completion journey whose terminal never rendered the finished run", () => {
    const silent = goodJourneys();
    silent.completion = {
      ...goodCompletion(),
      completionNotificationShown: false,
      completionSeenAt: undefined,
    };
    expect(assess({ journeys: silent }).findings).toContain("completion-not-shown");
  });

  it("flags non-monotonic capture timestamps as fabrication (O1 post-hoc frames impossible)", () => {
    const reordered = goodJourneys();
    reordered.completion = { ...goodCompletion(), firstLiveFrameAt: "2026-10-15T20:59:00.000Z" };
    expect(assess({ journeys: reordered }).findings).toContain("capture-order-violated");

    const cancelReordered = goodJourneys();
    cancelReordered.cancellation = {
      ...goodCancellation(),
      exitAt: "2026-10-15T21:05:15.100Z",
    };
    expect(assess({ journeys: cancelReordered }).findings).toContain("capture-order-violated");
  });

  it("flags an interrupt the terminal never acknowledged (O3 requested -> acknowledged)", () => {
    const unacked = goodJourneys();
    unacked.cancellation = { ...goodCancellation(), interruptAcknowledgedAt: undefined };
    expect(assess({ journeys: unacked }).findings).toContain("interrupt-unacknowledged");
  });

  it("flags an interrupt sent before live execution was visible (O3 mid-execution)", () => {
    const early = goodJourneys();
    early.cancellation = {
      ...goodCancellation(),
      interruptSentAt: "2026-10-15T21:05:11.000Z",
    };
    expect(assess({ journeys: early }).findings).toContain("interrupt-before-live");
  });

  it("flags a false completion rendered after the interrupt (O3 no false completion)", () => {
    const fake = goodJourneys();
    fake.cancellation = { ...goodCancellation(), falseCompletionShown: true };
    expect(assess({ journeys: fake }).findings).toContain("false-completion-after-interrupt");
  });

  it("requires at least one started agent to have been actually cancelled (O3)", () => {
    const allSettled = goodJourneys();
    allSettled.cancellation = { ...goodCancellation(), settledJournalRows: 2 };
    expect(assess({ journeys: allSettled }).findings).toContain("no-agent-cancelled");
  });

  it("reports every finding it can see at once, in rule order", () => {
    const wrecked = goodJourneys();
    wrecked.completion = {
      ...goodCompletion(),
      sessionIdsDuringRun: [],
      structuredOutputShown: false,
      structuredOutputSeenAt: undefined,
    };
    wrecked.cancellation = { ...goodCancellation(), falseCompletionShown: true };
    const { findings } = assess({ journeys: wrecked });
    expect(findings).toEqual(
      RULES.filter(rule =>
        ["session-id-not-live", "structured-output-missing", "false-completion-after-interrupt"].includes(rule),
      ),
    );
  });
});

describe("buildOperatorReceipt and exitCodeFor", () => {
  const base = {
    utc: "2026-10-15T21:10:00.000Z",
    revision: "d09092a",
    node: "v22.0.0",
    platform: "linux",
    arch: "x64",
  };

  it("shapes a frozen passing receipt from clean journeys", () => {
    const receipt = build({ ...base, journeys: goodJourneys() });
    expect(receipt.contract).toBe(CONTRACT);
    expect(receipt.realised).toBe(true);
    expect(receipt.findings).toEqual([]);
    expect(receipt.pass).toBe(true);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys)).toBe(true);
    expect(exitOf(receipt)).toBe(0);
  });

  it("reduces absolute capture and journal paths to basenames", () => {
    const journeys = goodJourneys();
    journeys.completion = {
      ...goodCompletion(),
      captureRef: "/tmp/pi-subagents-1234/enc/sess/tasks/completion.capture.txt",
    };
    journeys.cancellation = {
      ...goodCancellation(),
      journalRef: "/tmp/pi-subagents-1234/enc/sess/tasks/wf_cancel.workflow.jsonl",
    };
    const receipt = build({ ...base, journeys, diagnostics: ["read /home/someone/secret/area.log tail"] });
    const text = JSON.stringify(receipt);
    expect(text).not.toContain("/tmp/pi-subagents-1234");
    expect(text).not.toContain("/home/someone");
    expect(receipt.journeys.completion?.captureRef).toBe("completion.capture.txt");
    expect(receipt.journeys.cancellation?.journalRef).toBe("wf_cancel.workflow.jsonl");
  });

  it("maps an unrealised measurement to exit 2 and never to a pass", () => {
    const receipt = build({ ...base, journeys: { completion: goodCompletion() } });
    expect(receipt.realised).toBe(false);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(2);
  });

  it("maps realised-with-findings to exit 1", () => {
    const journeys = goodJourneys();
    journeys.cancellation = { ...goodCancellation(), falseCompletionShown: true };
    const receipt = build({ ...base, journeys });
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });
});
