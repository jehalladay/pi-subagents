// wb-a2g.3 (VC-1 residual): live terminal operator acceptance receipt.
//
// Two halves, one file, mirroring local-detached-faults-receipt.mjs:
//   1. PURE judgement — contract literal, finding rules, assessOperatorJourneys,
//      buildOperatorReceipt, exitCodeFor. No I/O, no clock, no SDK: the offline test
//      (test/workbench-operator-receipt.test.ts) drives these with fabricated journeys
//      and mutants, so a runner that invented frames or constants fails there.
//   2. CLI runner — drives a REAL `pi` terminal session over a pty (util-linux script(1)
//      allocates it; node-pty is not a dependency) against the compiled extension in
//      dist/, running a saved Claude SDK workflow unchanged. Missing prerequisites exit 2
//      with a typed unavailability receipt: never a fake pass, never a silent skip.
//
// The receipt carries references and timeline measurements, never raw terminal text:
// capture files stay on disk beside the receipt; every path in the receipt is reduced
// to its basename.
//
// Measured product facts the runner is built around (iterations 1-3, 2026-10-15):
//   - the TUI hard-wraps and interleaves spinner rails mid-token, so every marker test
//     runs on whitespace-REMOVED capture text and markers are written in dense form;
//   - the workflow card renders live as "SubagentWorkflow opjourney N/M agents · Ns" and
//     settles as "N/M agents · Ns · done" / "Workflow opjourney completed";
//   - a Ctrl-C at the prompt does NOT stop a background workflow (pi's interrupt key is
//     Esc for the turn, and the run is not tied to the turn); the operator's explicit
//     cancel is the fleet list (Down) -> workflow row (Enter) -> "x stop" in the dialog,
//     which aborts the run's controller and notifies `Stopped workflow "<name>".`.
//     The runner measures the Ctrl-C effect honestly and then drives that explicit path.

export const OPERATOR_RECEIPT_CONTRACT = "workbench.operator-journey/v1";

/** Journey keys the measurement needs; either missing or unarmed means "not realised" (exit 2). */
export const OPERATOR_JOURNEYS = Object.freeze(["completion", "cancellation"]);

/** Measured semantic violations, in the order assessOperatorJourneys reports them (exit 1). */
export const OPERATOR_FINDING_RULES = Object.freeze([
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

/** Strictly increasing where both ends exist; an absent timestamp never fails ordering here. */
function ordered(...stamps) {
  const present = stamps.map(ts).filter(value => Number.isFinite(value));
  for (let i = 1; i < present.length; i += 1) if (present[i] < present[i - 1]) return false;
  return true;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function completionArmed(journey) {
  return (
    journey !== undefined && journey !== null && typeof journey === "object" &&
    isNonEmptyString(journey.captureRef) && isNonEmptyString(journey.launchAt) &&
    isNonEmptyString(journey.toolStartedAt) && isNonEmptyString(journey.firstLiveFrameAt) &&
    Array.isArray(journey.sessionIdsDuringRun) && Array.isArray(journey.sessionIdsAll) &&
    Number.isSafeInteger(journey.agentCount) && journey.agentCount > 0
  );
}

function cancellationArmed(journey) {
  return (
    journey !== undefined && journey !== null && typeof journey === "object" &&
    isNonEmptyString(journey.captureRef) && isNonEmptyString(journey.journalRef) &&
    isNonEmptyString(journey.launchAt) && isNonEmptyString(journey.firstLiveFrameAt) &&
    isNonEmptyString(journey.interruptSentAt) &&
    Number.isSafeInteger(journey.startedAgentsObserved) && journey.startedAgentsObserved > 0 &&
    Number.isSafeInteger(journey.settledJournalRows) && journey.settledJournalRows >= 0 &&
    Number.isSafeInteger(journey.agentCount) && journey.agentCount > 0
  );
}

/**
 * Judge measured journeys. Pure: only the observed shape is judged, in rule order, and a
 * missing journey makes the measurement unrealised rather than inventing findings about it.
 */
export function assessOperatorJourneys(input) {
  const journeys = input !== null && typeof input === "object" && input.journeys !== null &&
    typeof input.journeys === "object" ? input.journeys : {};
  const completion = journeys.completion;
  const cancellation = journeys.cancellation;
  const realised = completionArmed(completion) && cancellationArmed(cancellation);
  if (!realised) return { findings: [], realised: false };

  const findings = [];
  const add = rule => { if (!findings.includes(rule)) findings.push(rule); };

  // O1 — a native SDK session id observed DURING the run, strictly before completion rendered.
  const seenAt = ts(completion.sessionIdSeenAt);
  const completionAt = ts(completion.completionSeenAt);
  if (completion.sessionIdsDuringRun.length === 0 || !Number.isFinite(seenAt) ||
    (Number.isFinite(completionAt) && seenAt >= completionAt)) add("session-id-not-live");

  // O2 — a distinct native session id for every agent.
  const distinct = new Set(completion.sessionIdsAll.filter(id => isNonEmptyString(id)));
  if (distinct.size < completion.agentCount) add("session-ids-incomplete");

  // O2 — the run config proves the claude backend path, never Pi AgentManager.
  if (completion.claudeBackendConfigured !== true) add("pi-agentmanager-path");

  // O4 — structured output inspected through the terminal surface.
  if (completion.structuredOutputShown !== true) add("structured-output-missing");

  // O1/O4 — the finished run rendered in the terminal.
  if (completion.completionNotificationShown !== true) add("completion-not-shown");

  // O1 — invented or post-hoc frames are impossible: observation timestamps are monotonic.
  const completionOrdered = ordered(
    completion.launchAt, completion.toolStartedAt, completion.firstLiveFrameAt,
    completion.sessionIdSeenAt, completion.completionSeenAt,
  );
  const cancellationOrdered = ordered(
    cancellation.launchAt, cancellation.firstLiveFrameAt, cancellation.interruptSentAt,
    cancellation.interruptAcknowledgedAt, cancellation.exitAt,
  );
  if (!completionOrdered || !cancellationOrdered) add("capture-order-violated");

  // O3 — requested -> acknowledged ordering from the terminal surface.
  const sentAt = ts(cancellation.interruptSentAt);
  const ackAt = ts(cancellation.interruptAcknowledgedAt);
  if (!Number.isFinite(ackAt) || !(Number.isFinite(sentAt) && ackAt > sentAt)) add("interrupt-unacknowledged");

  // O3 — the interrupt lands mid-execution, after live frames were visible.
  const liveAt = ts(cancellation.firstLiveFrameAt);
  if (!(Number.isFinite(sentAt) && Number.isFinite(liveAt) && sentAt > liveAt)) add("interrupt-before-live");

  // O3 — no false completion rendered.
  if (cancellation.falseCompletionShown === true) add("false-completion-after-interrupt");

  // O3 — realised only if at least one started agent never settled: it was actually cancelled.
  if (!(cancellation.startedAgentsObserved > cancellation.settledJournalRows)) add("no-agent-cancelled");

  return { findings, realised: true };
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object") {
    for (const entry of Object.values(value)) deepFreeze(entry);
    Object.freeze(value);
  }
  return value;
}

/** Shape the evidence-grade receipt. Paths reduce to basenames; nothing re-judges live state. */
export function buildOperatorReceipt(input) {
  const source = input !== null && typeof input === "object" ? input : {};
  const journeys = basenameOnly(source.journeys !== null && typeof source.journeys === "object" ? source.journeys : {});
  const diagnostics = (Array.isArray(source.diagnostics) ? source.diagnostics : [])
    .filter(entry => typeof entry === "string").map(basename);
  const { findings, realised } = assessOperatorJourneys({ journeys });
  return deepFreeze(structuredClone({
    contract: OPERATOR_RECEIPT_CONTRACT,
    utc: typeof source.utc === "string" ? source.utc : "",
    revision: typeof source.revision === "string" ? source.revision : "unknown",
    node: typeof source.node === "string" ? source.node : "unknown",
    platform: typeof source.platform === "string" ? source.platform : "unknown",
    arch: typeof source.arch === "string" ? source.arch : "unknown",
    ...(typeof source.pi === "string" ? { pi: source.pi } : {}),
    ...(source.settings !== undefined ? { settings: basenameOnly(source.settings) } : {}),
    journeys,
    diagnostics,
    findings: [...findings],
    realised,
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
const ALPHA = "alpha-ok-7391";
const BRAVO = "bravo-ok-4826";
const AGENTS = 4;
const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const SESSION_NODE_RE = new RegExp(`"provider":"claude-agent-sdk","type":"session","id":"(${UUID})"`, "g");
const TASK_ID_RE = /wf_[a-z0-9-]{6,}/;
// Live card: "SubagentWorkflow opjourney N/M agents · 12s" (not yet "· done").
const LIVE_CARD_RE = new RegExp(`${SAVED_WORKFLOW_NAME}(\\d+)/(\\d+)agents·\\d+(?:ms|s)(?!·done)`, "g");
const DONE_CARD_RE = new RegExp(`${SAVED_WORKFLOW_NAME}\\d+/\\d+agents·\\d+(?:ms|s)·done|Workflow${SAVED_WORKFLOW_NAME}completed`);
const COMPLETED_MARKER = '"status":"completed"';
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
  const slow = "First write a numbered list of 35 distinct one-sentence facts about the history of computing, one per line. Only after the full list, return the JSON object";
  return [
    'export const meta = { name: "opjourney", description: "VC-1 operator journey: four parallel Claude SDK agents with a structured schema and a real live window" };',
    `const result = await parallel([`,
    `  () => agent("${slow} whose answer is exactly '${ALPHA}'.", { schema: ${schema} }),`,
    `  () => agent("${slow} whose answer is exactly '${BRAVO}'.", { schema: ${schema} }),`,
    `  () => agent("${slow} whose answer is exactly 'charlie-ok-1057'.", { schema: ${schema} }),`,
    `  () => agent("${slow} whose answer is exactly 'delta-ok-6530'.", { schema: ${schema} }),`,
    `]);`,
    `return result;`,
    "",
  ].join("\n");
}

async function main() {
  const { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, existsSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join, dirname, resolve } = await import("node:path");
  const { spawn, spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");

  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const distEntry = join(repoRoot, "dist", "index.js");
  const outDir = process.argv[2] ? resolve(process.argv[2]) : mkdtempSync(join(tmpdir(), "a2g3-receipt-"));
  mkdirSync(outDir, { recursive: true });
  const diagnostics = [];
  const now = () => new Date().toISOString();
  const startedUtc = now();

  const revision = (() => {
    const probe = spawnSync("git", ["-C", repoRoot, "rev-parse", "--short", "HEAD"], { encoding: "utf8" });
    return probe.status === 0 ? probe.stdout.trim() : "unknown";
  })();

  function unavailable(reason) {
    const receipt = buildOperatorReceipt({
      utc: now(), revision, node: process.version, platform: process.platform, arch: process.arch,
      journeys: {}, diagnostics: [...diagnostics, `unavailable: ${reason}`],
    });
    const path = join(outDir, "operator-receipt.json");
    writeFileSync(path, `${JSON.stringify({ ...receipt, unavailability: reason }, null, 2)}\n`);
    console.log(JSON.stringify({ ...receipt, unavailability: reason, receiptPath: path }));
    process.exit(exitCodeFor(receipt));
  }

  // Honest preflight: every absent prerequisite is a typed unavailability, never a skip.
  if (!existsSync(distEntry)) unavailable("dist/index.js missing: build the extension first");
  const piProbe = spawnSync("pi", ["--version"], { encoding: "utf8" });
  if (piProbe.status !== 0) unavailable("pi binary unavailable on PATH");
  const piVersion = piProbe.stdout.trim();
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_BASE_URL) {
    unavailable("claude-live credentials absent (no ANTHROPIC_API_KEY/ANTHROPIC_BASE_URL)");
  }
  const scriptProbe = spawnSync("script", ["--version"], { encoding: "utf8" });
  if (scriptProbe.status !== 0) unavailable("util-linux script(1) unavailable: no pty allocator");

  // The disposable operator workspace: settings route workflows to the real Claude backend.
  const workspace = mkdtempSync(join(tmpdir(), "a2g3-op-ws-"));
  mkdirSync(join(workspace, ".pi", "workflows"), { recursive: true });
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
  writeFileSync(join(workspace, ".pi", "subagents.json"), `${JSON.stringify(settings, null, 2)}\n`);
  writeFileSync(join(workspace, ".pi", "workflows", `${SAVED_WORKFLOW_NAME}.js`), savedWorkflowSource());

  const journalRoot = join(tmpdir(), `pi-subagents-${process.getuid?.() ?? 0}`);

  /**
   * The newest run started after `afterMs`, located by its persisted script (written when the
   * tool call is accepted). The journal beside it is created on the FIRST settled agent, so a
   * run killed before any agent settles has a script and no journal: that absence IS the
   * measured "0 settled rows", never a lookup failure.
   */
  function newestRunArtifacts(afterMs) {
    if (!existsSync(journalRoot)) return undefined;
    let best;
    const stack = [journalRoot];
    while (stack.length > 0) {
      const dir = stack.pop();
      let entries;
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) { stack.push(full); continue; }
        if (!entry.name.endsWith(".workflow.js")) continue;
        const stamp = statSync(full).mtimeMs;
        if (stamp >= afterMs && (best === undefined || stamp > best.stamp)) best = { full, stamp };
      }
    }
    if (best === undefined) return undefined;
    const journalPath = best.full.replace(/\.workflow\.js$/, ".workflow.jsonl");
    return { scriptPath: best.full, journalPath, journalExists: existsSync(journalPath) };
  }

  /** Stripped of ANSI, then of ALL whitespace: the only form markers are matched against. */
  function readDense(path) {
    try { return readFileSync(path, "utf8").replace(ANSI_RE, "").replace(/\s+/g, ""); } catch { return ""; }
  }

  const sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms));

  /** Launch pi inside a real pty; returns {child, capturePath, send, done}. */
  function launchPi(label) {
    const capturePath = join(outDir, `${label}.capture.txt`);
    const command = `pi -e ${distEntry}`;
    const child = spawn("script", ["-qefc", command, capturePath], {
      cwd: workspace,
      env: { ...process.env },
      stdio: ["pipe", "ignore", "pipe"],
    });
    const stderrChunks = [];
    child.stderr.on("data", chunk => stderrChunks.push(String(chunk)));
    let exited = false;
    const done = new Promise(resolveDone => child.on("exit", code => { exited = true; resolveDone(code); }));
    return {
      child,
      capturePath,
      send: text => { try { child.stdin.write(text); } catch { /* a closed pty is a measured outcome */ } },
      done,
      hasExited: () => exited,
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

  /** Send a prompt and make sure pi actually took the turn; one newline nudge if it idles. */
  async function sendPrompt(run, prompt, before) {
    run.send(`${prompt}\r`);
    const taken = await waitFor(run.capturePath, text => text.length > before + 40 && text.includes("Working"), 20_000);
    if (taken.at === undefined) run.send("\r");
  }

  const sessionIds = text => [...new Set([...text.matchAll(SESSION_NODE_RE)].map(match => match[1]))];
  const liveCard = text => [...text.matchAll(LIVE_CARD_RE)];
  const isLive = text => liveCard(text).length > 0;
  const isDone = text => DONE_CARD_RE.test(text) || text.includes(COMPLETED_MARKER);

  async function quitPi(run) {
    run.send("/quit\r");
    const code = await Promise.race([run.done, sleep(15_000).then(() => "timeout")]);
    if (code === "timeout") { try { run.child.kill("SIGKILL"); } catch { /* already gone */ } }
    return code;
  }

  // ---------------- Journey 1: completion, observed live, inspected in Pi ----------------
  let completion;
  {
    const launchAt = now();
    const run = launchPi("completion");
    const readyAt = await waitForReady(run);
    if (readyAt === undefined) { diagnostics.push(`completion: pi never finished startup; stderr: ${run.stderrText().slice(0, 300)}`); run.child.kill("SIGKILL"); unavailable("pi TUI did not start"); }
    // Turn 1 ends while the agents are still running, so the mid-run observation renders live.
    await sendPrompt(run, `Use the SubagentWorkflow tool to run the saved workflow named ${SAVED_WORKFLOW_NAME}. Then call workflow_observe exactly once with the returned taskId and reply with ONLY that tool JSON verbatim. Do nothing else and do not wait for the workflow to finish; I will send the next instruction.`, readDense(run.capturePath).length);
    const toolStarted = await waitFor(run.capturePath, text => TASK_ID_RE.test(text) || isLive(text), 120_000);
    const firstLive = await waitFor(run.capturePath, isLive, 180_000);
    const liveSession = await waitFor(run.capturePath, text => sessionIds(text).length > 0 && !isDone(text), 240_000);
    const completionSeen = await waitFor(run.capturePath, isDone, 420_000);
    const taskId = TASK_ID_RE.exec(readDense(run.capturePath))?.[0];
    // Turn 2: the finished run inspected through the terminal surface.
    await sendPrompt(run, `The workflow has finished. Call workflow_observe for taskId ${taskId ?? "of the workflow you started"} and print the tool JSON verbatim, then print every answer value from the workflow result verbatim, one per line.`, readDense(run.capturePath).length);
    const structured = await waitFor(run.capturePath, text => text.includes(ALPHA) && text.includes(BRAVO) && text.includes("charlie-ok-1057") && text.includes("delta-ok-6530"), 180_000);
    const finalText = readDense(run.capturePath);
    const idsAll = sessionIds(finalText);
    await quitPi(run);
    completion = {
      captureRef: run.capturePath,
      launchAt,
      toolStartedAt: toolStarted.at ?? "",
      firstLiveFrameAt: firstLive.at ?? "",
      ...(liveSession.at !== undefined ? { sessionIdSeenAt: liveSession.at } : {}),
      ...(structured.at !== undefined ? { structuredOutputSeenAt: structured.at } : {}),
      ...(completionSeen.at !== undefined ? { completionSeenAt: completionSeen.at } : {}),
      sessionIdsDuringRun: liveSession.at !== undefined ? sessionIds(liveSession.text) : [],
      sessionIdsAll: idsAll,
      agentCount: AGENTS,
      ...(taskId !== undefined ? { taskId } : {}),
      claudeBackendConfigured: settings.workbench.workflowAgentBackend === "claude",
      structuredOutputShown: structured.at !== undefined,
      completionNotificationShown: completionSeen.at !== undefined,
    };
    if (toolStarted.at === undefined) diagnostics.push("completion: tool start never rendered");
    if (completionSeen.at === undefined) diagnostics.push("completion: finished card never rendered");
  }

  // ---------------- Journey 2: operator interrupt, then the explicit cancel ----------------
  let cancellation;
  {
    const launchAt = now();
    const launchMs = Date.now();
    const run = launchPi("cancellation");
    const readyAt = await waitForReady(run);
    if (readyAt === undefined) diagnostics.push("cancellation: pi never finished startup");
    await sendPrompt(run, `Use the SubagentWorkflow tool to run the saved workflow named ${SAVED_WORKFLOW_NAME}, then reply with only the word started.`, readDense(run.capturePath).length);
    const firstLive = await waitFor(run.capturePath, isLive, 240_000);
    let interruptSentAt;
    let interruptAckAt;
    let exitAt;
    let ctrlCStoppedWorkflow;
    let startedAgents = 0;
    if (firstLive.at !== undefined) {
      await sleep(1_500); // visibly mid-execution before the interrupt
      // Step 1 — the operator's Ctrl-C through the pty, measured for what it does.
      interruptSentAt = now();
      run.send("\u0003");
      const afterCtrlC = await waitFor(run.capturePath, text => text.includes(STOPPED_MARKER) || isDone(text), 4_000);
      ctrlCStoppedWorkflow = afterCtrlC.at !== undefined && afterCtrlC.text.includes(STOPPED_MARKER);
      const stillLive = isLive(readDense(run.capturePath)) && !isDone(readDense(run.capturePath));
      // Step 2 — the product's explicit cancel: fleet list (Down), workflow row (Enter), "x stop".
      if (!ctrlCStoppedWorkflow && stillLive) {
        for (const moves of [1, 0, 2]) {
          run.send("\u001B[B"); await sleep(400);               // Down: activate the fleet list
          for (let i = 0; i < moves; i += 1) { run.send("\u001B[B"); await sleep(250); }
          run.send("\r"); await sleep(600);                      // Enter: open the selected row
          const dialog = readDense(run.capturePath);
          if (dialog.includes("xstop")) { run.send("x"); break; }
          run.send("\u001B"); await sleep(400);                  // Esc: back out and try another row
        }
      }
      const ack = await waitFor(run.capturePath, text => text.includes(STOPPED_MARKER), 15_000);
      interruptAckAt = ack.at;
      startedAgents = Math.max(0, ...liveCard(ack.text).map(match => Number(match[2])));
      run.send("\u001B"); await sleep(300);                      // Esc: close the dialog if still open
      const code = await quitPi(run);
      exitAt = now();
      if (code === "timeout") diagnostics.push("cancellation: pi did not exit on /quit within 15s");
    } else {
      diagnostics.push("cancellation: live frames never rendered before interrupt window");
    }
    try { run.child.kill("SIGKILL"); } catch { /* already gone */ }
    const finalText = readDense(run.capturePath);
    const artifacts = newestRunArtifacts(launchMs);
    let settledRows = 0;
    if (artifacts === undefined) {
      diagnostics.push("cancellation: no persisted run script found after launch");
    } else if (artifacts.journalExists) {
      const lines = readFileSync(artifacts.journalPath, "utf8").split("\n").filter(line => line.trim().length > 0);
      settledRows = lines.filter(line => { try { const row = JSON.parse(line); return row.kind === undefined; } catch { return false; } }).length;
    }
    if (startedAgents === 0) startedAgents = Math.max(0, ...liveCard(finalText).map(match => Number(match[2])), sessionIds(finalText).length);
    const falseCompletion = isDone(finalText);
    cancellation = {
      captureRef: run.capturePath,
      journalRef: artifacts?.journalPath ?? "",
      ...(artifacts !== undefined ? { scriptRef: artifacts.scriptPath, journalPresent: artifacts.journalExists } : {}),
      launchAt,
      firstLiveFrameAt: firstLive.at ?? "",
      ...(interruptSentAt !== undefined ? { interruptSentAt } : {}),
      ...(interruptAckAt !== undefined ? { interruptAcknowledgedAt: interruptAckAt } : {}),
      ...(exitAt !== undefined ? { exitAt } : {}),
      ...(ctrlCStoppedWorkflow !== undefined ? { ctrlCStoppedWorkflow } : {}),
      startedAgentsObserved: startedAgents,
      settledJournalRows: settledRows,
      agentCount: AGENTS,
      falseCompletionShown: falseCompletion,
    };
  }

  const receipt = buildOperatorReceipt({
    utc: startedUtc, revision, node: process.version, platform: process.platform, arch: process.arch,
    pi: piVersion, settings, journeys: { completion, cancellation }, diagnostics,
  });
  const receiptPath = join(outDir, "operator-receipt.json");
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify({ ...receipt, receiptPath, outDir }));
  process.exit(exitCodeFor(receipt));
}

const invokedDirectly = (() => {
  if (typeof process === "undefined" || !process.argv?.[1]) return false;
  return import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "\u0000");
})();

if (invokedDirectly) {
  main().catch(error => {
    console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exit(2);
  });
}
