// wb-a2g.3 (VC-1 residual): live terminal operator acceptance receipt — contract v2.
//
// Two halves, one file, mirroring local-detached-faults-receipt.mjs:
//   1. PURE judgement — contract literal, finding rules, assessOperatorJourneys,
//      buildOperatorReceipt, exitCodeFor. No I/O, no clock, no SDK: the offline test
//      (test/workbench-operator-receipt.test.ts) drives these with fabricated journeys
//      and mutants, so a runner that invented frames or constants fails there.
//   2. CLI runner — drives a REAL `pi` terminal session over a pty (util-linux script(1)
//      allocates it; node-pty is not a dependency) against the compiled extension in
//      dist/, running a harness-authored saved Claude SDK workflow. Missing or dead
//      prerequisites exit 2 with a typed unavailability receipt: never a fake pass, never
//      a silent skip; a harness crash writes the same typed receipt before exiting 2.
//
// v2 (correction of the v1 receipt after a 40-agent adversarial review, 2026-10-15):
//   - "live" means a NATIVE claude-agent-sdk session node observed in the terminal, in both
//     journeys; the card's planned agent total never stands in for started agents;
//   - the done marker is the renderer's own glyph-anchored notification line, never prose,
//     and all three duration shapes (ms, s, m+ss) are accepted;
//   - every regex-harvested session id is cross-checked against the SDK's own transcript
//     file for the harness workspace, which also yields the NATIVE model the gateway served
//     (the requested alias is recorded beside it, never instead of it);
//   - the structured-output proof asks for a TRANSFORMED form of each answer, matched only
//     in text appended after the inspection prompt, so input echo cannot satisfy it;
//   - frame order is also read from append-only capture offsets, not only reader clocks;
//   - the operator's Ctrl-C and the explicit cancel are stamped as two gestures, and the
//     acknowledgement is paired with the gesture that was actually acknowledged;
//   - journal discovery is scoped to the harness workspace's own task directory;
//   - "no agent cancelled" makes the measurement UNREALISED (exit 2), as O3 states.

export const OPERATOR_RECEIPT_CONTRACT = "workbench.operator-journey/v2";

/** Journey keys the measurement needs; either missing or unarmed means "not realised" (exit 2). */
export const OPERATOR_JOURNEYS = Object.freeze(["completion", "cancellation"]);

/** Measured semantic violations, in the order assessOperatorJourneys reports them (exit 1). */
export const OPERATOR_FINDING_RULES = Object.freeze([
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

/** Why a measurement is unrealised (exit 2), in the order assessOperatorJourneys reports them. */
export const OPERATOR_UNREALISED_REASONS = Object.freeze([
  "unavailable",
  "completion-journey-unarmed",
  "cancellation-journey-unarmed",
  "no-agent-cancelled",
]);

const ABSOLUTE_PATH = /(?<![A-Za-z0-9._@+~-])\/(?:[A-Za-z0-9._@+~-]+\/)+([A-Za-z0-9._@+~-]*)/g;

function basename(value) {
  if (typeof value !== "string") return value;
  return value.replace(ABSOLUTE_PATH, (_, tail) => tail);
}

function basenameOnly(value) {
  if (typeof value === "string") return basename(value);
  if (Array.isArray(value)) return value.map(basenameOnly);
  if (value !== null && typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) out[key] = basenameOnly(entry);
    return out;
  }
  return value;
}

function ts(value) {
  if (typeof value !== "string") return Number.NaN;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/**
 * Non-decreasing where both ends exist (equal stamps are legal: one reader poll can satisfy two
 * predicates). An absent timestamp never fails ordering here; required stamps are checked by the
 * arming predicates and the rules that need them.
 */
function ordered(...stamps) {
  const present = stamps.map(ts).filter(value => Number.isFinite(value));
  for (let i = 1; i < present.length; i += 1) if (present[i] < present[i - 1]) return false;
  return true;
}

const isNonEmptyString = value => typeof value === "string" && value.length > 0;
const isStringArray = value => Array.isArray(value) && value.every(entry => typeof entry === "string");
const isIndex = value => value === undefined || (Number.isSafeInteger(value) && value >= -1);

function completionArmed(journey) {
  return (
    journey !== undefined && journey !== null && typeof journey === "object" &&
    isNonEmptyString(journey.captureRef) && isNonEmptyString(journey.launchAt) &&
    isNonEmptyString(journey.toolStartedAt) && isNonEmptyString(journey.firstLiveFrameAt) &&
    isStringArray(journey.sessionIdsDuringRun) && isStringArray(journey.sessionIdsAll) &&
    isStringArray(journey.sessionIdsVerified) && isStringArray(journey.sessionProvidersObserved) &&
    Number.isSafeInteger(journey.agentCount) && journey.agentCount > 0 &&
    isIndex(journey.sessionIdFirstIndex) && isIndex(journey.doneFirstIndex) &&
    typeof journey.markersPresentBeforeInspection === "boolean"
  );
}

function cancellationArmed(journey) {
  if (!(journey !== undefined && journey !== null && typeof journey === "object")) return false;
  const base =
    isNonEmptyString(journey.captureRef) && isNonEmptyString(journey.journalRef) &&
    isNonEmptyString(journey.launchAt) && isNonEmptyString(journey.firstLiveFrameAt) &&
    isNonEmptyString(journey.sessionIdSeenAt) &&
    isStringArray(journey.sessionIdsDuringRun) && journey.sessionIdsDuringRun.length > 0 &&
    isStringArray(journey.sessionIdsVerified) &&
    isNonEmptyString(journey.interruptSentAt) && typeof journey.ctrlCStoppedWorkflow === "boolean" &&
    Number.isSafeInteger(journey.startedAgentsObserved) && journey.startedAgentsObserved > 0 &&
    Number.isSafeInteger(journey.settledJournalRows) && journey.settledJournalRows >= 0 &&
    Number.isSafeInteger(journey.agentCount) && journey.agentCount > 0;
  if (!base) return false;
  // When Ctrl-C did nothing, the gesture that WAS acknowledged has to be on the record.
  return journey.ctrlCStoppedWorkflow === true || isNonEmptyString(journey.explicitCancelSentAt);
}

/**
 * Judge measured journeys. Pure: only the observed shape is judged, in rule order. A missing or
 * unarmed journey, and a cancellation run in which nothing was actually cancelled, make the
 * measurement UNREALISED (typed reasons) rather than inventing findings.
 */
export function assessOperatorJourneys(input) {
  const source = input !== null && typeof input === "object" ? input : {};
  const journeys = source.journeys !== null && typeof source.journeys === "object" ? source.journeys : {};
  const reasons = [];
  if (isNonEmptyString(source.unavailability)) reasons.push("unavailable");
  const completion = journeys.completion;
  const cancellation = journeys.cancellation;
  if (!completionArmed(completion)) reasons.push("completion-journey-unarmed");
  if (!cancellationArmed(cancellation)) reasons.push("cancellation-journey-unarmed");
  if (reasons.length > 0) return { findings: [], realised: false, reasons };

  const findings = [];
  const add = rule => { if (!findings.includes(rule)) findings.push(rule); };

  // O1 — a native SDK session id observed DURING the run, before completion rendered: by reader
  // clock AND by position in the append-only capture when both offsets were recorded.
  const seenAt = ts(completion.sessionIdSeenAt);
  const completionAt = ts(completion.completionSeenAt);
  const offsetsKnown = completion.sessionIdFirstIndex !== undefined && completion.doneFirstIndex !== undefined &&
    completion.sessionIdFirstIndex >= 0 && completion.doneFirstIndex >= 0;
  if (completion.sessionIdsDuringRun.length === 0 || !Number.isFinite(seenAt) ||
    (Number.isFinite(completionAt) && seenAt >= completionAt) ||
    (offsetsKnown && completion.sessionIdFirstIndex >= completion.doneFirstIndex)) add("session-id-not-live");

  // O2 — a distinct, transcript-verified native session id for every agent.
  const verified = new Set(completion.sessionIdsVerified.filter(isNonEmptyString));
  if (verified.size < completion.agentCount) add("session-ids-incomplete");

  // O2 — every observed session node names the SDK provider, never Pi's own agent manager.
  const providers = new Set(completion.sessionProvidersObserved.filter(isNonEmptyString));
  if (providers.size === 0 || [...providers].some(provider => provider !== "claude-agent-sdk")) add("non-sdk-session-provider");

  // O4 — the transformed answers rendered only after the inspection prompt.
  if (completion.structuredOutputShown !== true || completion.markersPresentBeforeInspection === true) add("structured-output-missing");

  // O1/O4 — the finished run rendered in the terminal (glyph-anchored notification or done card).
  if (completion.completionNotificationShown !== true) add("completion-not-shown");

  // O1 — post-hoc frames are DETECTABLE, not impossible: reader stamps must be non-decreasing and
  // the recorded capture offsets must agree with them.
  const completionOrdered = ordered(
    completion.launchAt, completion.toolStartedAt, completion.firstLiveFrameAt,
    completion.sessionIdSeenAt, completion.completionSeenAt, completion.inspectionPromptSentAt, completion.structuredOutputSeenAt,
  );
  const cancellationOrdered = ordered(
    cancellation.launchAt, cancellation.firstLiveFrameAt, cancellation.sessionIdSeenAt, cancellation.interruptSentAt,
    cancellation.explicitCancelSentAt, cancellation.interruptAcknowledgedAt, cancellation.exitAt,
  );
  if (!completionOrdered || !cancellationOrdered) add("capture-order-violated");

  // O3 — the acknowledgement follows the gesture that was actually acknowledged.
  const sentAt = ts(cancellation.interruptSentAt);
  const ackAt = ts(cancellation.interruptAcknowledgedAt);
  const cancelAt = ts(cancellation.explicitCancelSentAt);
  const gestureAt = cancellation.ctrlCStoppedWorkflow === true ? sentAt : cancelAt;
  if (!Number.isFinite(ackAt) || !Number.isFinite(gestureAt) || !(ackAt > gestureAt) ||
    (cancellation.ctrlCStoppedWorkflow !== true && !(cancelAt > sentAt))) add("interrupt-unacknowledged");

  // O3 — the interrupt lands mid-execution: after a native session was visible, before completion.
  const liveSessionAt = ts(cancellation.sessionIdSeenAt);
  if (!(Number.isFinite(sentAt) && Number.isFinite(liveSessionAt) && sentAt > liveSessionAt)) add("interrupt-before-live");

  // O3 — a completion rendered at or after the acknowledged stop is a false completion.
  const cancelDoneAt = ts(cancellation.completionSeenAt);
  if (Number.isFinite(cancelDoneAt) && Number.isFinite(ackAt) && cancelDoneAt >= ackAt) add("false-completion-after-interrupt");

  // O3 — realised only if at least one started agent never settled: otherwise nothing was cancelled.
  if (!(cancellation.startedAgentsObserved > cancellation.settledJournalRows)) {
    return { findings, realised: false, reasons: ["no-agent-cancelled"] };
  }

  return { findings, realised: true, reasons: [] };
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object") {
    for (const entry of Object.values(value)) deepFreeze(entry);
    Object.freeze(value);
  }
  return value;
}

/**
 * Shape the evidence-grade receipt. Paths reduce to basenames; a typed `unavailability` is a
 * first-class field and can never be a pass; nothing here re-judges live state.
 */
export function buildOperatorReceipt(input) {
  const source = input !== null && typeof input === "object" ? input : {};
  const journeys = basenameOnly(source.journeys !== null && typeof source.journeys === "object" ? source.journeys : {});
  const diagnostics = (Array.isArray(source.diagnostics) ? source.diagnostics : [])
    .filter(entry => typeof entry === "string").map(basename);
  const unavailability = isNonEmptyString(source.unavailability) ? basename(source.unavailability) : undefined;
  const { findings, realised, reasons } = assessOperatorJourneys({ journeys, unavailability });
  return deepFreeze(structuredClone({
    contract: OPERATOR_RECEIPT_CONTRACT,
    utc: typeof source.utc === "string" ? source.utc : "",
    revision: typeof source.revision === "string" ? source.revision : "unknown",
    node: typeof source.node === "string" ? source.node : "unknown",
    platform: typeof source.platform === "string" ? source.platform : "unknown",
    arch: typeof source.arch === "string" ? source.arch : "unknown",
    ...(typeof source.pi === "string" ? { pi: source.pi } : {}),
    ...(source.settings !== undefined ? { settings: basenameOnly(source.settings) } : {}),
    ...(source.preflight !== undefined ? { preflight: basenameOnly(source.preflight) } : {}),
    ...(unavailability !== undefined ? { unavailability } : {}),
    journeys,
    diagnostics,
    findings: [...findings],
    realised,
    reasons: [...reasons],
    pass: realised && findings.length === 0,
  }));
}

/** Runner exit semantics: 0 realised and clean, 1 realised with findings, 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length === 0 ? 0 : 1;
}

/* ------------------------------------------------------------------------- *
 * CLI runner: the live pty journeys. Everything below runs only as a main
 * module and never under vitest. Every marker is in DENSE form (no spaces).
 * ------------------------------------------------------------------------- */

const SAVED_WORKFLOW_NAME = "opjourney";
const ANSWERS = Object.freeze(["alpha-ok-7391", "bravo-ok-4826", "charlie-ok-1057", "delta-ok-6530"]);
const AGENTS = ANSWERS.length;
const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
/** A session node as workflow_observe prints it: provider, type and the native id, in that order. */
const SESSION_NODE_RE = new RegExp(`"provider":"([^"]+)","type":"session","id":"(${UUID})"`, "g");
// The run id is exactly `wf_` + 12 hex (src/workflow/task.ts workflowRunId); a bounded pattern, so a
// TUI rail wrapped into the middle of an id can never be swallowed into it.
const TASK_ID_RE = /wf_[0-9a-f]{12}/;
const DURATION = "(?:\\d+ms|\\d+s|\\d+m\\d{2}s)";
// Live card: "SubagentWorkflow opjourney N/M agents · 12s" with M > 0 and no settled suffix.
const LIVE_CARD_RE = new RegExp(`${SAVED_WORKFLOW_NAME}(\\d+)/([1-9]\\d*)agents·${DURATION}(?!·(?:done|stopped|failed|paused))`, "g");
// Done: the renderer's glyph-anchored notification card ("✓ Workflow opjourney completed …"; the
// stats tail is omitted at zero tool uses, so only the glyph + phrase is anchored), or the fleet
// row's own settled suffix.
const DONE_RE = new RegExp(`\\u2713Workflow${SAVED_WORKFLOW_NAME}completed|${SAVED_WORKFLOW_NAME}\\d+/\\d+agents·${DURATION}·done`);
// Stopped: the renderer's glyph-anchored card ("✗ Workflow opjourney stopped …") or the fleet row.
const STOPPED_CARD_RE = new RegExp(`\\u2717Workflow${SAVED_WORKFLOW_NAME}stopped|${SAVED_WORKFLOW_NAME}\\d+/\\d+agents·${DURATION}·stopped`);
const STOPPED_MARKER = `Stoppedworkflow"${SAVED_WORKFLOW_NAME}"`;
// eslint-disable-next-line no-control-regex -- terminal captures carry ANSI escapes by nature.
const ANSI_RE = /\u001B\[[0-9;?]*[A-Za-z]|\u001B\][^\u0007]*\u0007|\r/g;

function savedWorkflowSource() {
  const schema = JSON.stringify({
    type: "object",
    properties: { answer: { type: "string" } },
    required: ["answer"],
    additionalProperties: false,
  });
  // Four agents, each slow enough (a long enumeration before the answer) that the run has a
  // real live window for mid-run observation and for the operator cancellation journey.
  const slow = "First write a numbered list of 60 distinct one-sentence facts about the history of computing, one per line. Only after the full list, return the JSON object";
  return [
    'export const meta = { name: "opjourney", description: "VC-1 operator journey: four parallel Claude SDK agents with a structured schema and a real live window" };',
    "const result = await parallel([",
    ...ANSWERS.map(answer => `  () => agent("${slow} whose answer is exactly '${answer}'.", { schema: ${schema} }),`),
    "]);",
    "return result;",
    "",
  ].join("\n");
}

/** The extension's cwd encoding (src/output-file.ts encodeCwd), replicated so src stays untouched. */
const encodeCwd = cwd => cwd.replace(/[/\\]/g, "-").replace(/^[A-Za-z]:-/, "").replace(/^-+/, "");

async function main() {
  const { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, existsSync, rmSync } = await import("node:fs");
  const { tmpdir, homedir } = await import("node:os");
  const { join, dirname, resolve } = await import("node:path");
  const { spawn, spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");

  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const distEntry = join(repoRoot, "dist", "index.js");
  const outDir = process.argv[2] ? resolve(process.argv[2]) : mkdtempSync(join(tmpdir(), "a2g3-receipt-"));
  mkdirSync(outDir, { recursive: true });
  const receiptPath = join(outDir, "operator-receipt.json");
  rmSync(receiptPath, { force: true }); // a stale receipt must never outlive a crashed run
  const diagnostics = [];
  const now = () => new Date().toISOString();
  const startedUtc = now();

  const { gitStamp } = await import("./git-stamp.mjs");
  const revision = (() => {
    const { head, porcelain } = gitStamp(repoRoot);
    if (head === null || porcelain === null) return "unknown";
    return porcelain.trim().length > 0 ? `${head.slice(0, 7)}-dirty` : head.slice(0, 7);
  })();
  const hostFacts = { utc: startedUtc, revision, node: process.version, platform: process.platform, arch: process.arch };

  function finish(receipt) {
    writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
    console.log(JSON.stringify({ ...receipt, receiptPath, outDir }));
    process.exit(exitCodeFor(receipt));
  }

  function unavailable(reason, extra = {}) {
    finish(buildOperatorReceipt({ ...hostFacts, ...extra, journeys: {}, diagnostics, unavailability: reason }));
  }

  // Honest preflight: every absent or dead prerequisite is a typed unavailability, never a skip.
  if (!existsSync(distEntry)) unavailable("dist/index.js missing: build the extension first");
  const piProbe = spawnSync("pi", ["--version"], { encoding: "utf8" });
  if (piProbe.status !== 0) unavailable("pi binary unavailable on PATH");
  const piVersion = piProbe.stdout.trim();
  const scriptProbe = spawnSync("script", ["--version"], { encoding: "utf8" });
  if (scriptProbe.status !== 0) unavailable("util-linux script(1) unavailable: no pty allocator");

  const settings = {
    workflowsEnabled: true,
    workbench: {
      workflowAgentBackend: "claude",
      model: "claude-opus-5-5",
      permissionMode: "dontAsk",
      settingSources: [],
      tools: [],
      capabilityGrants: ["workbench:observe"],
    },
  };

  // Credential LIVENESS, not env presence: one bounded turn through the compiled host records
  // the native model the gateway actually serves for the requested alias.
  let preflight;
  {
    const probeCwd = mkdtempSync(join(tmpdir(), "a2g3-preflight-"));
    const models = new Set();
    const sessions = new Set();
    try {
      const { createClaudeWorkflowHost } = await import(join(repoRoot, "dist", "workbench", "claude-host.js"));
      const { runWorkflow } = await import(join(repoRoot, "dist", "workflow", "runtime.js"));
      const host = createClaudeWorkflowHost({
        cwd: probeCwd, model: settings.workbench.model, tools: [], settingSources: [], permissionMode: "dontAsk",
        onMessage: message => {
          const model = message?.message?.model;
          if (typeof model === "string") models.add(model);
          if (typeof message?.session_id === "string") sessions.add(message.session_id);
        },
      });
      const script = 'export const meta={name:"a2g3-preflight",description:"one-turn credential probe"};\nreturn await agent("Reply with the single word ok.");';
      const timeout = new Promise(resolveTimeout => setTimeout(() => resolveTimeout({ status: "timeout" }), 120_000));
      const outcome = await Promise.race([runWorkflow({ script, host, concurrency: 1 }), timeout]);
      preflight = {
        requestedModel: settings.workbench.model,
        nativeModels: [...models],
        sessionIds: [...sessions],
        status: outcome.status,
        at: now(),
      };
      if (outcome.status !== "completed" || models.size === 0) {
        unavailable(`claude-live credentials unusable: one-turn probe ${outcome.status}${outcome.error ? ` (${String(outcome.error).slice(0, 160)})` : ""}`, { preflight });
      }
    } catch (error) {
      unavailable(`claude-live probe failed: ${error instanceof Error ? error.message.slice(0, 200) : String(error)}`);
    } finally {
      rmSync(probeCwd, { recursive: true, force: true });
    }
  }

  // The disposable operator workspace: settings route workflows to the real Claude backend.
  const workspace = mkdtempSync(join(tmpdir(), "a2g3-op-ws-"));
  mkdirSync(join(workspace, ".pi", "workflows"), { recursive: true });
  writeFileSync(join(workspace, ".pi", "subagents.json"), `${JSON.stringify(settings, null, 2)}\n`);
  writeFileSync(join(workspace, ".pi", "workflows", `${SAVED_WORKFLOW_NAME}.js`), savedWorkflowSource());

  // Scoped to THIS workspace's task tree: another pi session's run can never be mistaken for ours.
  const taskRoot = join(tmpdir(), `pi-subagents-${process.getuid?.() ?? 0}`, encodeCwd(workspace));
  // The SDK writes one transcript per session under the slugified cwd; that file is the
  // non-terminal source every regex-harvested session id is checked against.
  const transcriptDir = join(homedir(), ".claude", "projects", workspace.replace(/\//g, "-"));

  function newestRunArtifacts(afterMs) {
    if (!existsSync(taskRoot)) return undefined;
    let best;
    const stack = [taskRoot];
    while (stack.length > 0) {
      const dir = stack.pop();
      let entries;
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) { stack.push(full); continue; }
        if (!entry.name.endsWith(".workflow.js")) continue;
        let stamp;
        try { stamp = statSync(full).mtimeMs; } catch { continue; } // vanished between readdir and stat
        if (stamp >= afterMs && (best === undefined || stamp > best.stamp)) best = { full, stamp };
      }
    }
    if (best === undefined) return undefined;
    const journalPath = best.full.replace(/\.workflow\.js$/, ".workflow.jsonl");
    return { scriptPath: best.full, journalPath, journalExists: existsSync(journalPath) };
  }

  /** Session ids that the SDK's own transcript files confirm, with the native models they record. */
  function verifySessions(ids, afterMs) {
    const verified = [];
    const nativeModels = new Set();
    for (const id of ids) {
      const file = join(transcriptDir, `${id}.jsonl`);
      let text;
      try {
        if (statSync(file).mtimeMs < afterMs) continue;
        text = readFileSync(file, "utf8");
      } catch { continue; }
      verified.push(id);
      for (const line of text.split("\n")) {
        try {
          const row = JSON.parse(line);
          const model = row?.message?.model;
          if (typeof model === "string") nativeModels.add(model);
        } catch { /* a partial trailing line is not evidence either way */ }
      }
    }
    return { verified, nativeModels: [...nativeModels] };
  }

  /** Stripped of ANSI, then of ALL whitespace: the only form markers are matched against. */
  function readDense(path) {
    try { return readFileSync(path, "utf8").replace(ANSI_RE, "").replace(/\s+/g, ""); } catch { return ""; }
  }

  const sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms));

  /** Launch pi inside a real pty; returns {child, capturePath, send, done}. */
  function launchPi(label) {
    const capturePath = join(outDir, `${label}.capture.txt`);
    const child = spawn("script", ["-qefc", `pi -e ${distEntry}`, capturePath], {
      cwd: workspace,
      env: { ...process.env },
      stdio: ["pipe", "ignore", "pipe"],
    });
    const stderrChunks = [];
    child.stderr.on("data", chunk => stderrChunks.push(String(chunk)));
    const done = new Promise(resolveDone => child.on("exit", code => resolveDone(code)));
    return {
      child,
      capturePath,
      send: text => { try { child.stdin.write(text); } catch { /* a closed pty is a measured outcome */ } },
      done,
      stderrText: () => stderrChunks.join(""),
    };
  }

  /** Poll until the dense capture matches, recording WHEN the reader first saw it. */
  async function waitFor(capturePath, test, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const text = readDense(capturePath);
      if (test(text)) return { at: now(), text };
      await sleep(150);
    }
    return { at: undefined, text: readDense(capturePath) };
  }

  /** Wait out pi's own boot: the startup banner must be gone and the frame stable for ~2s. */
  async function waitForReady(run) {
    const booted = await waitFor(run.capturePath, text => text.length > 200 && !text.includes("Startupisstillinprogress"), 90_000);
    if (booted.at === undefined) return undefined;
    await sleep(2_000);
    return booted.at;
  }

  /** pi is idle when the capture stops growing: a busy TUI redraws its spinner rail every frame. */
  async function waitForIdle(run, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    let last = -1;
    let stableSince = Date.now();
    while (Date.now() < deadline) {
      const length = readDense(run.capturePath).length;
      if (length !== last) { last = length; stableSince = Date.now(); }
      if (Date.now() - stableSince >= 3_000) return true;
      await sleep(200);
    }
    return false;
  }

  const countWorking = text => (text.match(/Working/g) ?? []).length;

  /**
   * Send a prompt and make sure pi actually took THIS turn: new text after the send and a new
   * in-flight render. One newline nudge, then re-checked; a dropped prompt is a harness diagnostic.
   */
  async function sendPrompt(run, prompt, label) {
    const before = readDense(run.capturePath);
    const workingBefore = countWorking(before);
    const taken = text => text.length > before.length + 40 && countWorking(text) > workingBefore;
    run.send(`${prompt}\r`);
    let result = await waitFor(run.capturePath, taken, 20_000);
    if (result.at === undefined) {
      run.send("\r");
      result = await waitFor(run.capturePath, taken, 20_000);
      if (result.at === undefined) diagnostics.push(`${label}: prompt not taken after nudge (harness-level input drop)`);
    }
    return { sentAt: now(), offset: before.length, taken: result.at !== undefined };
  }

  const sessionNodes = text => {
    const ids = new Set();
    const providers = new Set();
    for (const match of text.matchAll(SESSION_NODE_RE)) { providers.add(match[1]); ids.add(match[2]); }
    return { ids: [...ids], providers: [...providers] };
  };
  const sdkSessionIds = text => [...new Set([...text.matchAll(SESSION_NODE_RE)].filter(match => match[1] === "claude-agent-sdk").map(match => match[2]))];
  const isLive = text => [...text.matchAll(LIVE_CARD_RE)].length > 0;
  const isDone = text => DONE_RE.test(text);
  const firstIndex = (text, pattern) => { const match = pattern.exec(text); return match ? match.index : -1; };

  async function quitPi(run) {
    run.send("/quit\r");
    const code = await Promise.race([run.done, sleep(15_000).then(() => "timeout")]);
    if (code === "timeout") { try { run.child.kill("SIGKILL"); } catch { /* already gone */ } }
    return code;
  }

  // Compact replies: a long verbatim JSON stream delays every later render (the stop
  // acknowledgement waited ~55s behind one in iteration 7), so the model prints only the
  // renderer-shaped tokens the receipt reads — the nativeRef objects and a status object.
  const OBSERVE_PROMPT = `Use the SubagentWorkflow tool to run the saved workflow named ${SAVED_WORKFLOW_NAME}. Then call workflow_observe exactly once with the returned taskId. Reply with ONLY: the taskId on the first line, then {"status":"<the status field>"} as compact JSON on one line, then for every node in the result its nativeRef object as compact JSON on its own line (exactly like {"provider":"...","type":"...","id":"...","scope":"..."}). No other text, no code fences. Do not wait for the workflow to finish; I will send the next instruction.`;

  // ---------------- Journey 1: completion, observed live, inspected in Pi ----------------
  let completion;
  const completionLaunchMs = Date.now();
  {
    const launchAt = now();
    const run = launchPi("completion");
    const readyAt = await waitForReady(run);
    if (readyAt === undefined) { diagnostics.push(`completion: pi never finished startup; stderr: ${run.stderrText().slice(0, 300)}`); run.child.kill("SIGKILL"); unavailable("pi TUI did not start", { preflight }); }
    // Turn 1 ends while the agents are still running, so the mid-run observation renders live.
    await sendPrompt(run, OBSERVE_PROMPT, "completion turn 1");
    const toolStarted = await waitFor(run.capturePath, text => TASK_ID_RE.test(text) || isLive(text), 120_000);
    const firstLive = await waitFor(run.capturePath, isLive, 180_000);
    const liveSession = await waitFor(run.capturePath, text => sdkSessionIds(text).length > 0 && !isDone(text), 240_000);
    const sessionIdsDuringRun = liveSession.at !== undefined ? sdkSessionIds(liveSession.text) : [];
    const completionSeen = await waitFor(run.capturePath, isDone, 420_000);
    // The task id for the inspection turn comes from the run's persisted script name (filesystem,
    // written when the tool call was accepted), never from wrapped terminal text; the terminal
    // regex is only the cross-check.
    const completionArtifacts = newestRunArtifacts(completionLaunchMs);
    const scriptTaskId = completionArtifacts === undefined ? undefined : /wf_[0-9a-f]{12}/.exec(completionArtifacts.scriptPath)?.[0];
    const taskId = scriptTaskId ?? TASK_ID_RE.exec(readDense(run.capturePath))?.[0];
    if (scriptTaskId === undefined) diagnostics.push("completion: run script not found under the harness workspace; task id taken from the terminal");
    // Turn 2: the finished run inspected through the terminal surface. Sent only once pi is idle, so
    // the prompt is consumed rather than parked behind the notification turn; the proof tokens are
    // TRANSFORMED forms of the answers, which no echo of the workflow's inputs can produce.
    const idle = await waitForIdle(run, 60_000);
    if (!idle) diagnostics.push("completion: pi did not go idle before the inspection prompt");
    const upper = ANSWERS.map(answer => answer.toUpperCase());
    const beforeInspection = readDense(run.capturePath);
    const markersPresentBeforeInspection = upper.some(token => beforeInspection.includes(token));
    const inspection = await sendPrompt(run, `The workflow has finished. Call workflow_observe for taskId ${taskId ?? "of the workflow you started"}. Reply with ONLY: {"status":"<the status field>"} as compact JSON on one line, then every node's nativeRef object as compact JSON on its own line, then every answer value from the workflow result converted to UPPER CASE, one per line. No other text, no code fences.`, "completion turn 2");
    const structured = await waitFor(run.capturePath, text => {
      const fresh = text.slice(inspection.offset);
      return upper.every(token => fresh.includes(token)) && fresh.includes('"status":"completed"');
    }, 180_000);
    const finalText = readDense(run.capturePath);
    const nodes = sessionNodes(finalText);
    const idsAll = sdkSessionIds(finalText);
    const { verified, nativeModels } = verifySessions(idsAll, completionLaunchMs);
    await quitPi(run);
    completion = {
      captureRef: run.capturePath,
      launchAt,
      toolStartedAt: toolStarted.at ?? "",
      firstLiveFrameAt: firstLive.at ?? "",
      ...(liveSession.at !== undefined ? { sessionIdSeenAt: liveSession.at } : {}),
      ...(completionSeen.at !== undefined ? { completionSeenAt: completionSeen.at } : {}),
      inspectionPromptSentAt: inspection.sentAt,
      ...(structured.at !== undefined ? { structuredOutputSeenAt: structured.at } : {}),
      sessionIdsDuringRun,
      sessionIdsAll: idsAll,
      sessionIdsVerified: verified,
      sessionProvidersObserved: nodes.providers,
      nativeModels,
      requestedModel: settings.workbench.model,
      sessionIdFirstIndex: sessionIdsDuringRun.length > 0 ? finalText.indexOf(sessionIdsDuringRun[0]) : -1,
      doneFirstIndex: firstIndex(finalText, DONE_RE),
      agentCount: AGENTS,
      ...(taskId !== undefined ? { taskId } : {}),
      markersPresentBeforeInspection,
      structuredOutputShown: structured.at !== undefined,
      completionNotificationShown: completionSeen.at !== undefined,
    };
    if (toolStarted.at === undefined) diagnostics.push("completion: tool start never rendered");
    if (completionSeen.at === undefined) diagnostics.push("completion: finished notification never rendered");
  }

  // ---------------- Journey 2: operator Ctrl-C (measured), then the explicit cancel ----------------
  let cancellation;
  {
    const launchAt = now();
    const launchMs = Date.now();
    const run = launchPi("cancellation");
    const readyAt = await waitForReady(run);
    if (readyAt === undefined) diagnostics.push("cancellation: pi never finished startup");
    await sendPrompt(run, OBSERVE_PROMPT, "cancellation turn 1");
    const firstLive = await waitFor(run.capturePath, isLive, 240_000);
    // "Live" is a native session node in the terminal, exactly as in O1, never the card's total.
    const liveSession = await waitFor(run.capturePath, text => sdkSessionIds(text).length > 0 && !isDone(text), 240_000);
    const sessionIdsDuringRun = liveSession.at !== undefined ? sdkSessionIds(liveSession.text) : [];
    let interruptSentAt;
    let explicitCancelSentAt;
    let interruptAckAt;
    let stoppedCardSeenAt;
    let completionSeenAt;
    let exitAt;
    let ctrlCStoppedWorkflow;
    const noteDone = text => { if (completionSeenAt === undefined && isDone(text)) completionSeenAt = now(); };
    if (liveSession.at !== undefined) {
      await sleep(500); // visibly mid-execution before the interrupt
      // Step 1 — the operator's Ctrl-C through the pty, measured for what it does.
      interruptSentAt = now();
      run.send("\u0003");
      const afterCtrlC = await waitFor(run.capturePath, text => text.includes(STOPPED_MARKER) || STOPPED_CARD_RE.test(text) || isDone(text), 2_500);
      noteDone(afterCtrlC.text);
      ctrlCStoppedWorkflow = afterCtrlC.at !== undefined && (afterCtrlC.text.includes(STOPPED_MARKER) || STOPPED_CARD_RE.test(afterCtrlC.text));
      // Step 2 — the product's explicit cancel: fleet list (Down), workflow row (Enter), "x stop".
      if (!ctrlCStoppedWorkflow && completionSeenAt === undefined) {
        for (const moves of [1, 0, 2]) {
          run.send("\u001B[B"); await sleep(400);               // Down: activate the fleet list
          for (let i = 0; i < moves; i += 1) { run.send("\u001B[B"); await sleep(250); }
          run.send("\r"); await sleep(600);                      // Enter: open the selected row
          const dialog = readDense(run.capturePath);
          noteDone(dialog);
          if (dialog.includes("xstop")) { explicitCancelSentAt = now(); run.send("x"); break; }
          run.send("\u001B"); await sleep(400);                  // Esc: back out and try another row
        }
        if (explicitCancelSentAt === undefined) diagnostics.push("cancellation: workflow dialog never opened (no 'x stop' hint rendered)");
      }
      // The kill is immediate on "x"; its acknowledgement renders only once the model's in-flight
      // stream (the observe JSON) has finished, so the window is generous. Either renderer output —
      // the notify line or the stopped card — is the acknowledgement; the card is also stamped.
      const ack = await waitFor(run.capturePath, text => text.includes(STOPPED_MARKER) || STOPPED_CARD_RE.test(text), 45_000);
      interruptAckAt = ack.at;
      noteDone(ack.text);
      const stoppedCard = await waitFor(run.capturePath, text => STOPPED_CARD_RE.test(text), 10_000);
      stoppedCardSeenAt = stoppedCard.at;
      noteDone(stoppedCard.text);
      run.send("\u001B"); await sleep(300);                      // Esc: close the dialog if still open
      const code = await quitPi(run);
      exitAt = now();
      if (code === "timeout") diagnostics.push("cancellation: pi did not exit on /quit within 15s");
    } else {
      diagnostics.push("cancellation: no native session rendered before the interrupt window");
    }
    try { run.child.kill("SIGKILL"); } catch { /* already gone */ }
    const finalText = readDense(run.capturePath);
    noteDone(finalText);
    const artifacts = newestRunArtifacts(launchMs);
    let settledRows = 0;
    if (artifacts === undefined) {
      diagnostics.push("cancellation: no persisted run script found under the harness workspace");
    } else if (artifacts.journalExists) {
      try {
        const lines = readFileSync(artifacts.journalPath, "utf8").split("\n").filter(line => line.trim().length > 0);
        settledRows = lines.filter(line => { try { const row = JSON.parse(line); return row.kind === undefined; } catch { return false; } }).length;
      } catch { diagnostics.push("cancellation: journal vanished between discovery and read"); }
    }
    const { verified, nativeModels } = verifySessions(sdkSessionIds(finalText), launchMs);
    cancellation = {
      captureRef: run.capturePath,
      journalRef: artifacts?.journalPath ?? "",
      ...(artifacts !== undefined ? { scriptRef: artifacts.scriptPath, journalPresent: artifacts.journalExists } : {}),
      launchAt,
      firstLiveFrameAt: firstLive.at ?? "",
      ...(liveSession.at !== undefined ? { sessionIdSeenAt: liveSession.at } : {}),
      sessionIdsDuringRun,
      sessionIdsVerified: verified,
      nativeModels,
      ...(interruptSentAt !== undefined ? { interruptSentAt } : {}),
      ...(ctrlCStoppedWorkflow !== undefined ? { ctrlCStoppedWorkflow } : {}),
      ...(explicitCancelSentAt !== undefined ? { explicitCancelSentAt } : {}),
      ...(interruptAckAt !== undefined ? { interruptAcknowledgedAt: interruptAckAt } : {}),
      ...(stoppedCardSeenAt !== undefined ? { stoppedCardSeenAt } : {}),
      ...(completionSeenAt !== undefined ? { completionSeenAt } : {}),
      ...(exitAt !== undefined ? { exitAt } : {}),
      // Started agents: the distinct native sessions with an SDK transcript written inside this run's
      // window (execution evidence from the producer), never fewer than the terminal showed live and
      // never the card's planned total.
      startedAgentsObserved: Math.max(sessionIdsDuringRun.length, verified.length),
      startedAgentsSource: verified.length >= sessionIdsDuringRun.length ? "sdk-transcripts" : "terminal-session-nodes",
      settledJournalRows: settledRows,
      agentCount: AGENTS,
    };
  }

  finish(buildOperatorReceipt({
    ...hostFacts, pi: piVersion, settings, preflight, journeys: { completion, cancellation }, diagnostics,
  }));
}

const invokedDirectly = (() => {
  if (typeof process === "undefined" || !process.argv?.[1]) return false;
  return import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "\u0000");
})();

if (invokedDirectly) {
  main().catch(async error => {
    // A crash still leaves a typed receipt behind, never a missing file that reads as "not run".
    const message = error instanceof Error ? error.message : String(error);
    console.error(error instanceof Error ? error.stack ?? message : message);
    try {
      const { writeFileSync, mkdirSync } = await import("node:fs");
      const { join, resolve } = await import("node:path");
      const { tmpdir } = await import("node:os");
      const outDir = process.argv[2] ? resolve(process.argv[2]) : tmpdir();
      mkdirSync(outDir, { recursive: true });
      const receipt = buildOperatorReceipt({
        utc: new Date().toISOString(), revision: "unknown", node: process.version, platform: process.platform, arch: process.arch,
        journeys: {}, diagnostics: [], unavailability: `harness crash: ${message.slice(0, 200)}`,
      });
      writeFileSync(join(outDir, "operator-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
      console.log(JSON.stringify(receipt));
    } catch { /* the stack above is the last word */ }
    process.exit(2);
  });
}
