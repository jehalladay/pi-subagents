// wb-0kg.3 (VC-7 residual): live detached exit/reattach acceptance receipt.
//
// Spec: docs/workbench/15 VC-7 "Pi exits without stopping execution."; docs/workbench/08 "Optional local detached
// profile": "Closing or exiting Pi disconnects the client, not the execution host. Inspection after host loss reports
// unknown with producer reconciliation guidance; it does not replay a saved terminal verdict or rerun JavaScript. The
// profile is same-machine OS discretionary-access control only, not remote authentication or hostile-same-user
// protection."; docs/workbench/14 "Every test evidence artifact includes revision, tool versions, commands, timestamp,
// host, native references and actual output."
//
// One file, two parts. The judge (assessDetachedReattachJourneys, buildDetachedReattachReceipt, exitCodeFor) is pure: it
// reads no clock, no file and no process, and judges only the observed shape it is handed (the runner's measurement here,
// or the fabricated journeys of test/workbench-detached-receipt.test.ts). The runner runs only when this file is the
// process entry point:
//   npm run build && node qa/workbench/detached-reattach-receipt.mjs
// It drives the compiled dist (never src/) with real processes, a real detached host, a real socket and an effect marker
// on disk, in four journeys:
//   launch-and-exit      a module-API client process launches the saved fixture workflow on the local detached profile,
//                        into the agent directory's workbench-detached root the registered Pi tool reads, and exits
//                        entirely; the marker census is taken at its exit event;
//   continued-execution  the detached host itself writes the exactly-once effect marker after that exit: the workflow's
//                        first node waits until the launching client's process is gone (reaped, so its /proc entry is
//                        absent), its second appends one marker file whose content is the host's own pid;
//   observer-reattach    a booted Pi extension (dist/index.js), relaunched in a new process with only the
//                        workbench:observe grant, reattaches by the invocation ref through workflow_detached inspect and
//                        issues no control verb;
//   host-loss            the host is killed with SIGKILL and a second booted Pi inspects after the loss.
// Launch deviation, recorded in launchProfile and never hidden: the registered workflow_detached launch pins providers []
// and no local provider, so a script it launches has no capability through which the host could write a marker. The
// launching client therefore calls launchDetachedWorkflow from the compiled host module with a reviewed trusted-local
// provider (the wb-0kg.1 effect fixture, reused, plus the client-exit wait), under the Pi tool's own permission pin.
// Exit 0 = realised and clean, 1 = realised with findings, 2 = not realised (honest environment unavailability: no compiled
// dist, no Linux local operator, a refused socket placement, a client that could not run, a host that outlived its
// SIGKILL). The receipt is printed as one JSON line and written to $DETACHED_REATTACH_RECEIPT when set.
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, unlinkSync, writeFileSync } from "node:fs";
import { hostname, release } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { revisionOf } from "./git-stamp.mjs";
import { basenameOnly, faultProviderSource } from "./local-detached-faults-receipt.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./scratch.mjs";

installScratchLeakGuard();

export const DETACHED_REATTACH_CONTRACT = "workbench.detached-reattach/v1";
/** Journey keys the measurement needs; any one missing or unarmed means "not realised" (exit 2). */
export const DETACHED_REATTACH_JOURNEYS = Object.freeze(["launch-and-exit", "continued-execution", "observer-reattach", "host-loss"]);
/** Measured semantic violations, in the order the judge reports them (exit 1). */
export const DETACHED_REATTACH_FINDING_RULES = Object.freeze([
  "host-not-detached",
  "host-stopped-by-client-exit",
  "effect-lost",
  "effect-not-in-host",
  "duplicate-effect",
  "reattach-failed",
  "reattach-identity-mismatch",
  "no-own-terminal",
  "observer-control-call",
  "replayed-verdict",
  "unknown-not-reconcilable",
  "rerun-after-loss",
  "overclaim",
]);
/**
 * Why a measurement is not realised, in the order the judge reports them (exit 2): a journey missing or unarmed (its
 * measurement never ran), a missing ref list, wording or launch profile, a launching client that did not exit cleanly and
 * entirely, a host pid that is not a pid, a marker already on disk at the client's exit (the ordering is then unproven), a
 * Pi observer or post-loss inspector that could not boot the tool, and a host that outlived a SIGKILL or met another signal.
 */
export const DETACHED_REATTACH_UNREALISED = Object.freeze([
  "launch-and-exit-unarmed",
  "continued-execution-unarmed",
  "observer-reattach-unarmed",
  "host-loss-unarmed",
  "evidence-block-missing",
  "client-not-exited",
  "host-pid-invalid",
  "effect-before-exit",
  "observer-not-booted",
  "host-not-lost",
  "inspector-not-booted",
]);
/** The registered workflow_detached launch pin (src/index.ts): the only permissions the observed launch may carry. */
export const PI_TOOL_PERMISSIONS = Object.freeze(["inspect", "execute"]);
/** The compiled entries the runner's roles load, relative to the package root. */
export const RUNNER_ENTRIES = Object.freeze({ host: "dist/workbench/hosts/local-detached.js", extension: "dist/index.js" });
/**
 * The wording the receipt carries (docs/workbench/08: OS DAC only, not remote authentication or hostile-same-user
 * protection; the host's own lifetime label: survives client disconnect, not host crash). buildDetachedReattachReceipt
 * stamps these module constants, never caller text; the judge flags any drift and any host label that claims more.
 */
export const DETACHED_REATTACH_WORDING = Object.freeze({
  security: "same-machine-os-dac-only",
  lifetime: "survives-client-disconnect-not-host-crash",
  nativeRuntimeIdentity: "unsupported",
  nonClaims: Object.freeze([
    "no remote authentication evidence",
    "no hostile-same-user isolation evidence",
    "no host-crash durability evidence",
    "no launch through the registered workflow_detached tool: its launch pins providers [] and no local provider, so a module-API client launches this invocation",
  ]),
});

const RECONCILE_HINT = /never.*retry|do not.*retry/i;
const NEVER_A_VERDICT = new Set(["completed", "failed", "cancelled"]);

const isObject = value => typeof value === "object" && value !== null && !Array.isArray(value);
const isNumber = value => typeof value === "number" && Number.isFinite(value);
const isPid = value => Number.isSafeInteger(value) && value > 0;
const arrayOf = value => (Array.isArray(value) ? value : []);
const sameList = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((entry, at) => entry === b[at]);

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

/**
 * Judge observed journeys. Returns {findings: {rule, detail}[], realised, unrealised: condition[]}. Each condition of
 * DETACHED_REATTACH_UNREALISED that holds makes the measurement not realised: never a pass, and never by itself a finding.
 * Only an armed journey (one whose measurement ran) is judged for findings, so an absent field of a journey that never ran
 * is never read as a violation. Everything an armed journey shows that deviates from the product's own answers is a
 * measured finding.
 */
export function assessDetachedReattachJourneys(input) {
  const findings = [];
  const unmet = new Set();
  const add = (rule, detail) => findings.push({ rule, detail });
  const observed = isObject(input) ? input : {};
  const journeys = isObject(observed.journeys) ? observed.journeys : {};
  const journey = key => (isObject(journeys[key]) && journeys[key].armed === true ? journeys[key] : undefined);
  const launch = journey("launch-and-exit");
  const continued = journey("continued-execution");
  const reattach = journey("observer-reattach");
  const loss = journey("host-loss");
  const markerCounts = isObject(observed.markerCounts) ? observed.markerCounts : {};
  const nativeRefs = Array.isArray(observed.nativeRefs) ? observed.nativeRefs : undefined;
  const wording = isObject(observed.wording) ? observed.wording : undefined;
  const launchProfile = isObject(observed.launchProfile) ? observed.launchProfile : undefined;
  const id = typeof launch?.invocationId === "string" ? launch.invocationId : "the invocation";

  for (const key of DETACHED_REATTACH_JOURNEYS) if (journey(key) === undefined) unmet.add(`${key}-unarmed`);
  if (nativeRefs === undefined || wording === undefined || launchProfile === undefined) unmet.add("evidence-block-missing");

  if (launch) {
    if (!isObject(launch.clientExit) || launch.clientExit.code !== 0 || launch.clientGoneAtExit !== true || !isPid(launch.clientPid)) unmet.add("client-not-exited");
    if (!isPid(launch.hostPid)) unmet.add("host-pid-invalid");
    if (launch.markersAtClientExit !== 0) unmet.add("effect-before-exit");
    if (launch.hostPid === launch.clientPid || launch.hostSessionId !== launch.hostPid) {
      add("host-not-detached", `${id} host pid ${launch.hostPid} (session ${launch.hostSessionId}) is not its own OS session apart from client pid ${launch.clientPid}.`);
    }
    if (launch.hostAliveAfterClientExit !== true) add("host-stopped-by-client-exit", `${id} host process was gone once the launching client had exited.`);
  }

  if (continued && !(continued.markersAfterClientExit >= 1)) add("effect-lost", `${id} wrote no effect marker after the launching client exited (${continued.markersAfterClientExit}).`);

  if (reattach) {
    if (!isObject(reattach.observerExit) || reattach.observerExit.code !== 0 || reattach.registered !== true) unmet.add("observer-not-booted");
    const final = isObject(reattach.final) ? reattach.final : {};
    if (!(reattach.markersAfterReattach >= 1)) add("effect-lost", `${id} had no effect marker on disk after the reattach (${reattach.markersAfterReattach}).`);
    if (launch && reattach.markerContent !== String(launch.hostPid)) {
      add("effect-not-in-host", `${id} marker reads ${JSON.stringify(reattach.markerContent)}, not the detached host pid ${launch.hostPid}.`);
    }
    if (final.source !== "live-detached-host") add("reattach-failed", `${id} reattach read ${final.source}, not the live detached host.`);
    if (launch && (final.receiptPid !== launch.hostPid || final.receiptHostInstanceId !== launch.hostInstanceId || final.receiptInvocationId !== launch.invocationId)) {
      add("reattach-identity-mismatch", `${id} reattached snapshot names pid ${final.receiptPid}, host instance ${final.receiptHostInstanceId} and invocation ${final.receiptInvocationId}, not the launched host.`);
    }
    if (final.terminal !== "completed" || final.hasResult !== true) add("no-own-terminal", `${id} reattached terminal is ${final.terminal} (result ${final.hasResult}), not its own completed result.`);
    const actions = arrayOf(reattach.actions);
    if (actions.some(action => action !== "inspect") || arrayOf(final.controlAudit).length > 0 || final.cancellationRequested !== false) {
      add("observer-control-call", `${id} observer was not zero-control: actions ${JSON.stringify(actions)}, host audit ${arrayOf(final.controlAudit).length}, cancellationRequested ${final.cancellationRequested}.`);
    }
  }

  if (launch && nativeRefs) {
    const names = (type, value) => nativeRefs.some(ref => isObject(ref) && ref.provider === "local-detached" && ref.type === type && ref.id === value);
    if (!names("invocation", launch.invocationId) || !names("host-instance", launch.hostInstanceId)) {
      add("reattach-identity-mismatch", `${id} native refs do not name the launched invocation and host instance the reattach used.`);
    }
  }

  if (loss) {
    if (loss.hostGone !== true || loss.signal !== "SIGKILL") unmet.add("host-not-lost");
    if (!isObject(loss.inspectorExit) || loss.inspectorExit.code !== 0 || loss.registered !== true) unmet.add("inspector-not-booted");
    const snapshot = isObject(loss.snapshot) ? loss.snapshot : {};
    if (NEVER_A_VERDICT.has(snapshot.terminal) || snapshot.hasResult === true) {
      add("replayed-verdict", `${id} inspection after host loss reported terminal ${snapshot.terminal} (result ${snapshot.hasResult}); only unknown is honest.`);
    }
    if (snapshot.observation !== "unknown" || snapshot.source !== "local-client-transport" || snapshot.terminal !== "unknown" || !RECONCILE_HINT.test(String(snapshot.reconcileHint ?? ""))) {
      add("unknown-not-reconcilable", `${id} inspection after host loss must be unknown from local-client-transport with a never-retry reconcile hint.`);
    }
    if (arrayOf(loss.actions).some(action => action !== "inspect")) add("observer-control-call", `${id} post-loss inspector issued ${JSON.stringify(loss.actions)}.`);
    const before = reattach?.markersAfterReattach;
    if (isNumber(before) && ((isNumber(loss.markersAfterLoss) && loss.markersAfterLoss > before) || (isNumber(loss.markersAfterSettle) && loss.markersAfterSettle > before))) {
      add("rerun-after-loss", `${id} marker count grew from ${before} to ${loss.markersAfterLoss} after the loss and ${loss.markersAfterSettle} after the settle window.`);
    }
  }

  for (const [name, count] of Object.entries(markerCounts)) {
    if (isNumber(count) && count > 1) add("duplicate-effect", `${name} has ${count} markers; the effect must happen exactly once per logical invocation.`);
  }
  for (const [stage, count] of [
    ["after the client exited", continued?.markersAfterClientExit],
    ["after the reattach", reattach?.markersAfterReattach],
    ["right after the host loss", loss?.markersAfterLoss],
    ["after the settle window", loss?.markersAfterSettle],
  ]) {
    if (isNumber(count) && count > 1) add("duplicate-effect", `${id} has ${count} markers ${stage}.`);
  }

  const frozen = DETACHED_REATTACH_WORDING;
  if (wording) {
    const claims = arrayOf(wording.nonClaims);
    if (wording.security !== frozen.security || wording.lifetime !== frozen.lifetime || wording.nativeRuntimeIdentity !== frozen.nativeRuntimeIdentity || !frozen.nonClaims.every(claim => claims.includes(claim))) {
      add("overclaim", "wording drifted from the frozen labels and non-claims (remote authentication, hostile-same-user isolation, crash durability and the Pi-tool launch are never claimed).");
    }
  }
  if (launch) {
    const labels = isObject(launch.labels) ? launch.labels : {};
    if (labels.security !== frozen.security || labels.lifetime !== frozen.lifetime || labels.nativeRuntimeIdentity !== frozen.nativeRuntimeIdentity) {
      add("overclaim", `${id} host receipt labels ${JSON.stringify(labels)} claim more than ${frozen.security} / ${frozen.lifetime}.`);
    }
    if (!sameList(launch.permissions, PI_TOOL_PERMISSIONS)) add("overclaim", `${id} launch carried ${JSON.stringify(launch.permissions)}, not the Pi tool's pin ${JSON.stringify(PI_TOOL_PERMISSIONS)}.`);
  }
  if (launchProfile) {
    if (launchProfile.deviatesFromPiTool !== true || !arrayOf(launchProfile.deviations).includes("localProvider")) {
      add("overclaim", "the launch profile must record its local-provider deviation from the registered workflow_detached launch.");
    }
    if (launch && !sameList(launchProfile.permissions, launch.permissions)) add("overclaim", "the launch profile misstates the permissions the host receipt echoed.");
  }

  const unrealised = DETACHED_REATTACH_UNREALISED.filter(condition => unmet.has(condition));
  return { findings, realised: unrealised.length === 0, unrealised };
}

function requiredText(input, field) {
  const value = input[field];
  if (typeof value !== "string" || value.length === 0) throw new Error(`buildDetachedReattachReceipt: ${field} is required.`);
  return value;
}

function requiredFields(input, field, keys) {
  const value = input[field];
  if (!isObject(value) || keys.some(key => typeof value[key] !== "string" || value[key].length === 0)) {
    throw new Error(`buildDetachedReattachReceipt: ${field} {${keys.join(", ")}} is required.`);
  }
  return { ...value };
}

/** Frozen evidence-grade receipt (docs/workbench/14). Every absolute path is scrubbed to its basename; wording is the module's. */
export function buildDetachedReattachReceipt(input) {
  if (!isObject(input)) throw new Error("buildDetachedReattachReceipt: input is required.");
  const utc = requiredText(input, "utc");
  const revision = requiredText(input, "revision");
  const tools = basenameOnly(requiredFields(input, "tools", ["node", "package"]));
  const host = basenameOnly(requiredFields(input, "host", ["hostname", "platform", "arch"]));
  const commands = input.commands;
  if (!Array.isArray(commands) || commands.length === 0 || commands.some(command => typeof command !== "string" || command.length === 0)) {
    throw new Error("buildDetachedReattachReceipt: commands (a nonempty list of nonempty strings) are required.");
  }
  const wording = { ...DETACHED_REATTACH_WORDING, nonClaims: [...DETACHED_REATTACH_WORDING.nonClaims] };
  const nativeRefs = Array.isArray(input.nativeRefs) ? basenameOnly(input.nativeRefs) : undefined;
  const launchProfile = isObject(input.launchProfile) ? basenameOnly(input.launchProfile) : undefined;
  const journeys = basenameOnly(isObject(input.journeys) ? input.journeys : {});
  const markerCounts = basenameOnly(isObject(input.markerCounts) ? input.markerCounts : {});
  const diagnostics = arrayOf(input.diagnostics).filter(entry => typeof entry === "string").map(basenameOnly);
  const { findings, realised, unrealised } = assessDetachedReattachJourneys({ journeys, markerCounts, nativeRefs, wording, launchProfile });
  return deepFreeze(structuredClone({
    contract: DETACHED_REATTACH_CONTRACT,
    utc,
    revision,
    tools,
    host,
    commands: commands.map(basenameOnly),
    nativeRefs: nativeRefs ?? null,
    wording,
    launchProfile: launchProfile ?? null,
    journeys,
    markerCounts,
    findings: basenameOnly(findings),
    unrealised,
    diagnostics,
    realised,
    pass: realised && findings.length === 0,
  }));
}

/** Runner exit semantics: 0 realised and clean, 1 realised with findings, 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length === 0 ? 0 : 1;
}

// ---------------------------------------------------------------------------------------------------------------------
// The runner. Everything below runs only when this file is the process entry point.

const SELF = fileURLToPath(import.meta.url);
const ROOT = join(dirname(SELF), "..", "..");
const INVOCATION = "pi-exit-reattach";
const EFFECT = "local.effect";
const CLIENT_EXIT = "local.client-exit";
/** One client process end to end; a booted Pi extension measured about 5 s on a loaded host. */
const CLIENT_BOUND_MS = 180_000;
const MARKER_BOUND_MS = 60_000;
const TERMINAL_BOUND_MS = 60_000;
const HOST_GONE_BOUND_MS = 10_000;
/** The host fixture's own bound on the launching client's exit; past it the workflow fails instead of writing. */
const CLIENT_EXIT_WAIT_MS = 60_000;
const POLL_MS = 25;
const SETTLE_MS = 600;
const OBSERVER_GRANTS = Object.freeze(["workbench:observe"]);

const message = error => (error instanceof Error ? error.message : String(error));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const round = ms => Math.round(ms * 100) / 100;
const sha256 = path => `sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}`;

/** The /proc start ticks of a live process, or undefined once its entry is gone (exited and reaped). */
function startTicksOf(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    return stat.slice(stat.lastIndexOf(")") + 2).trim().split(/\s+/)[19];
  } catch {
    return undefined;
  }
}

/** True while `pid` is a running (not zombie) process, and the same process when its start ticks are given. */
function running(pid, startTicks) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const fields = stat.slice(stat.lastIndexOf(")") + 2).trim().split(/\s+/);
    return fields[0] !== "Z" && (startTicks === undefined || fields[19] === startTicks);
  } catch {
    return false;
  }
}

async function until(read, done, bound) {
  const start = performance.now();
  let value = await read();
  while (!done(value) && performance.now() - start < bound) {
    await sleep(POLL_MS);
    value = await read();
  }
  return { value, ok: done(value), ms: round(performance.now() - start) };
}

function report(value, code) {
  process.stdout.write(`${JSON.stringify(value)}\n`, () => process.exit(code));
}

function lastJson(text) {
  const line = String(text).trim().split("\n").pop() ?? "";
  try {
    const value = JSON.parse(line);
    return isObject(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** The trusted-local provider the host loads: the wb-0kg.1 effect fixture, imported, plus the client-exit wait. */
function providerSource() {
  return `import { register as registerEffect } from "./effect-provider.mjs";
export function register(registry) {
  registerEffect(registry);
  registry.register({
    descriptor: {
      id: ${JSON.stringify(CLIENT_EXIT)},
      version: "1.0.0",
      description: "controlled exit/reattach fixture: waits until the launching client process is gone, not native",
      inputSchema: { type: "object", properties: { pid: { type: "integer", minimum: 1 }, startTicks: { type: "string", pattern: "^[0-9]+$" } }, required: ["pid", "startTicks"], additionalProperties: false },
      effectClass: "read",
      permissions: ["fixture:wait"],
      supportedModes: ["invoke"],
      contractSource: "fixture:source",
    },
    async invoke(input, ctx) {
      const fs = process.getBuiltinModule("node:fs");
      const present = () => {
        try {
          const stat = fs.readFileSync("/proc/" + input.pid + "/stat", "utf8");
          return stat.slice(stat.lastIndexOf(")") + 2).trim().split(/\\s+/)[19] === input.startTicks;
        } catch {
          return false;
        }
      };
      const started = Date.now();
      while (present()) {
        if (Date.now() - started > ${CLIENT_EXIT_WAIT_MS}) throw new Error("fixture: the launching client is still present");
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, ${POLL_MS});
          ctx.signal.addEventListener("abort", () => { clearTimeout(timer); reject(new Error("fixture cancelled")); }, { once: true });
        });
      }
      return { coverage: "fixture", clientGone: true, waitedMs: Date.now() - started };
    },
  });
}
`;
}

const WORKFLOW_SOURCE = `export const meta={name:"pi-exit-reattach",description:"controlled exit/reattach fixture, not native"};
const gone=await node(${JSON.stringify(CLIENT_EXIT)},{pid:args.clientPid,startTicks:args.clientStartTicks});
const effect=await node(${JSON.stringify(EFFECT)},{token:"reattach"});
return {gone,effect};
`;

/** Role "launch": launch from the compiled host module, print the host-echoed receipt, then exit entirely. */
async function launchClient(requestPath) {
  let host;
  try {
    host = await import(pathToFileURL(join(ROOT, RUNNER_ENTRIES.host)).href);
  } catch (error) {
    return report({ launched: false, error: `not realised: ${message(error)}` }, 3);
  }
  const clientStartTicks = startTicksOf(process.pid);
  try {
    const request = JSON.parse(readFileSync(requestPath, "utf8"));
    const receipt = await host.launchDetachedWorkflow({ ...request, input: { clientPid: process.pid, clientStartTicks } });
    return report({ launched: true, clientPid: process.pid, clientStartTicks, receipt }, 0);
  } catch (error) {
    return report({ launched: false, clientPid: process.pid, error: message(error) }, 3);
  }
}

/** One snapshot as the receipt keeps it: typed fields only, a missing field never read as a reassuring default. */
function summarize(snapshot) {
  const value = isObject(snapshot) ? snapshot : {};
  const receipt = isObject(value.receipt) ? value.receipt : {};
  return {
    observation: typeof value.observation === "string" ? value.observation : "unparsed",
    source: typeof value.source === "string" ? value.source : "unparsed",
    terminal: typeof value.terminal === "string" ? value.terminal : null,
    hasResult: Object.hasOwn(value, "result"),
    ...(Object.hasOwn(value, "result") ? { result: value.result } : {}),
    receiptPid: isPid(receipt.pid) ? receipt.pid : null,
    receiptHostInstanceId: typeof receipt.hostInstanceId === "string" ? receipt.hostInstanceId : null,
    receiptInvocationId: typeof receipt.invocationId === "string" ? receipt.invocationId : null,
    controlAudit: arrayOf(value.controlAudit),
    cancellationRequested: typeof value.cancellationRequested === "boolean" ? value.cancellationRequested : null,
    reconcileHint: typeof value.reconcileHint === "string" ? value.reconcileHint : null,
    ...(typeof value.diagnostic === "string" ? { diagnostic: value.diagnostic.slice(0, 400) } : {}),
    ...(typeof value.unparsed === "string" ? { unparsed: value.unparsed.slice(0, 400) } : {}),
  };
}

/**
 * Role "pi-inspect": boot the real extension from the compiled dist in this new process, as Pi does on a relaunch, and
 * read the invocation through the registered workflow_detached tool. The tool offers launch and inspect; this role only
 * ever inspects, and the settings it boots with hold workbench:observe alone, so a launch would be denied besides.
 * Mode "terminal" polls until the snapshot carries a terminal; mode "once" reads one snapshot.
 */
async function piInspectClient(invocationId, mode) {
  let extension;
  try {
    extension = (await import(pathToFileURL(join(ROOT, RUNNER_ENTRIES.extension)).href)).default;
  } catch (error) {
    return report({ registered: false, error: `not realised: ${message(error)}` }, 3);
  }
  const tools = new Map();
  const lifecycle = new Map();
  const noop = () => {};
  const pi = {
    registerMessageRenderer: noop,
    registerEntryRenderer: noop,
    registerTool: tool => { tools.set(tool.name, tool); },
    registerCommand: noop,
    registerFlag: noop,
    getFlag: () => undefined,
    on: (event, handler) => { lifecycle.set(event, handler); },
    events: { emit: noop, on: () => noop },
    getAllTools: () => [],
    getCommands: () => [],
    getActiveTools: () => [...tools.keys()],
    setActiveTools: noop,
    appendEntry: noop,
    sendMessage: noop,
    exec: async () => ({ stdout: "", stderr: "", code: 0, killed: false }),
  };
  const ctx = {
    mode: "print",
    hasUI: false,
    ui: { setStatus: noop, setWidget: noop, notify: noop, addAutocompleteProvider: noop },
    cwd: process.cwd(),
    model: undefined,
    modelRegistry: { find: noop, getAvailable: () => [] },
    sessionManager: { getSessionId: () => "detached-reattach", getBranch: () => [] },
    getSystemPrompt: () => "",
  };
  extension(pi);
  await lifecycle.get("session_start")?.({}, ctx);
  const tool = tools.get("workflow_detached");
  if (!tool) return report({ registered: false, error: "not realised: the booted extension registered no workflow_detached tool" }, 3);
  const actions = [];
  const inspect = async () => {
    actions.push("inspect");
    const result = await tool.execute("detached-reattach", { action: "inspect", invocationId }, undefined, undefined, ctx);
    const text = result?.content?.[0]?.text ?? "";
    try {
      return JSON.parse(text);
    } catch {
      return { unparsed: text };
    }
  };
  let snapshot = await inspect();
  const first = summarize(snapshot);
  const started = performance.now();
  while (mode === "terminal" && typeof snapshot.terminal !== "string" && performance.now() - started < TERMINAL_BOUND_MS) {
    await sleep(100);
    snapshot = await inspect();
  }
  await lifecycle.get("session_shutdown")?.({}, ctx);
  return report({ registered: true, actions, first, final: summarize(snapshot) }, 0);
}

function toolVersions() {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const digest = path => (existsSync(path) ? sha256(path) : "missing");
  return { node: process.version, package: `${pkg.name}@${pkg.version}`, hostModuleSha256: digest(join(ROOT, RUNNER_ENTRIES.host)), extensionSha256: digest(join(ROOT, RUNNER_ENTRIES.extension)) };
}

/** The harness: four journeys, one receipt, the exit code. The harness itself never talks to the host's socket. */
async function harness() {
  const diagnostics = [];
  const journeys = {};
  const children = new Set();
  const commands = [`node qa/workbench/${basename(SELF)}`];
  let nativeRefs;
  let launchProfile;
  let markers;
  let hostPid;
  let hostStartTicks;
  let socketPath;

  const markerNames = id => (markers ? readdirSync(markers).filter(name => name.startsWith(`${id}.`)).sort() : []);
  const markerCensus = () => {
    const counts = {};
    for (const name of markers ? readdirSync(markers) : []) {
      const id = name.slice(0, name.lastIndexOf("."));
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  };
  const emit = () => {
    const receipt = buildDetachedReattachReceipt({
      utc: new Date().toISOString(),
      revision: revisionOf(realpathSync(ROOT)),
      tools: toolVersions(),
      host: { hostname: hostname(), platform: process.platform, arch: process.arch, release: release() },
      commands,
      nativeRefs,
      launchProfile,
      journeys,
      markerCounts: markerCensus(),
      diagnostics,
    });
    const line = JSON.stringify(receipt);
    if (process.env.DETACHED_REATTACH_RECEIPT) writeFileSync(process.env.DETACHED_REATTACH_RECEIPT, `${line}\n`);
    console.log(line);
    return exitCodeFor(receipt);
  };
  /** Spawn one role of this file; `onExit` runs inside the child's exit event, before the harness does anything else. */
  const runClient = (args, cwd, env, onExit) =>
    new Promise(resolve => {
      const started = performance.now();
      const child = spawn(process.execPath, [SELF, "--client", ...args], { cwd, env, stdio: ["ignore", "pipe", "pipe"] });
      children.add(child);
      let stdout = "";
      let stderr = "";
      let exit = { code: null, signal: null };
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        children.delete(child);
        resolve({ ...exit, pid: child.pid, stdout, stderr: stderr.slice(-400), ms: round(performance.now() - started) });
      };
      const timer = setTimeout(() => child.kill("SIGKILL"), CLIENT_BOUND_MS);
      child.stdout.on("data", chunk => { stdout += chunk; });
      child.stderr.on("data", chunk => { stderr += chunk; });
      child.once("exit", (code, signal) => {
        exit = { code, signal };
        onExit?.();
      });
      child.once("close", settle);
      child.once("error", error => {
        stderr += message(error);
        settle();
      });
    });

  for (const entry of Object.values(RUNNER_ENTRIES)) {
    if (!existsSync(join(ROOT, entry))) diagnostics.push(`not realised: ${entry} is missing; run npm run build first.`);
  }
  if (process.platform !== "linux") diagnostics.push("not realised: the local detached profile requires a Linux local OS operator.");
  if (diagnostics.length > 0) return emit();

  const scratch = makeScratch("wb-reattach-");
  /** The four journeys in order; a journey that cannot run records itself unarmed and stops the rest. */
  const measure = async () => {
    const root = realpathSync(scratch);
    const agentDir = join(root, "agent");
    const piCwd = join(root, "pi");
    const workspace = join(root, "source");
    markers = join(root, "markers");
    for (const directory of [agentDir, piCwd, join(piCwd, ".pi"), workspace, markers]) mkdirSync(directory, { mode: 0o700 });
    writeFileSync(join(piCwd, ".pi", "subagents.json"), JSON.stringify({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...OBSERVER_GRANTS] } }));
    const effectProviderPath = join(workspace, "effect-provider.mjs");
    const providerPath = join(workspace, "provider.mjs");
    const workflowPath = join(workspace, "workflow.js");
    writeFileSync(effectProviderPath, faultProviderSource({ capabilityId: EFFECT, markerDirectory: markers, crashAfterEffect: false }), { mode: 0o600 });
    writeFileSync(providerPath, providerSource(), { mode: 0o600 });
    writeFileSync(workflowPath, WORKFLOW_SOURCE, { mode: 0o600 });
    // Beside, never inside, the workspace: the host pins the whole provider tree it was launched over.
    const requestPath = join(root, "request.json");
    writeFileSync(requestPath, JSON.stringify({
      directory: join(agentDir, "workbench-detached"),
      invocationId: INVOCATION,
      scriptPath: workflowPath,
      cwd: workspace,
      trustedScript: true,
      backend: "deterministic",
      providers: [],
      grants: ["fixture:wait", "fixture:effect"],
      permissions: [...PI_TOOL_PERMISSIONS],
      localProvider: { kind: "trusted-local", version: "1.0.0", capabilities: [CLIENT_EXIT, EFFECT], modulePath: providerPath, digest: sha256(providerPath) },
      sourceFiles: [workflowPath, providerPath, effectProviderPath],
    }), { mode: 0o600 });
    launchProfile = {
      launcher: "module-api-client",
      observer: "booted-pi-extension",
      observerGrants: [...OBSERVER_GRANTS],
      directory: "workbench-detached under PI_CODING_AGENT_DIR, the root the registered Pi tool reads",
      deviatesFromPiTool: true,
      deviations: ["localProvider", "grants", "input"],
      permissions: [...PI_TOOL_PERMISSIONS],
    };

    // Journey 1: the launching client exits entirely; the marker census is taken inside its exit event.
    let atExit = { markers: Number.NaN, at: 0, utc: "" };
    commands.push(`node ${basename(SELF)} --client launch ${requestPath}`);
    const launched = await runClient(["launch", requestPath], root, process.env, () => {
      atExit = { markers: markerNames(INVOCATION).length, at: performance.now(), utc: new Date().toISOString() };
    });
    const launchReport = lastJson(launched.stdout);
    const receipt = isObject(launchReport?.receipt) ? launchReport.receipt : undefined;
    if (!receipt || launchReport?.launched !== true) {
      diagnostics.push(`launch-and-exit: the launching client did not launch (exit ${launched.code}): ${launchReport?.error ?? launched.stderr}`);
      journeys["launch-and-exit"] = { armed: false, invocationId: INVOCATION, clientExit: { code: launched.code, signal: launched.signal } };
      return;
    }
    hostPid = receipt.pid;
    hostStartTicks = receipt.processStartTicks;
    socketPath = receipt.socketPath;
    journeys["launch-and-exit"] = {
      armed: true,
      invocationId: receipt.invocationId,
      // The pid the harness spawned; the client reported the same process's own pid to the host fixture's wait.
      clientPid: launched.pid,
      clientReportedPid: launchReport.clientPid,
      clientExit: { code: launched.code, signal: launched.signal },
      clientExitObservedAt: atExit.utc,
      clientGoneAtExit: !running(launched.pid),
      markersAtClientExit: atExit.markers,
      hostPid,
      hostSessionId: receipt.sessionId,
      hostInstanceId: receipt.hostInstanceId,
      hostAliveAfterClientExit: running(hostPid, hostStartTicks),
      labels: { security: receipt.security, lifetime: receipt.lifetime, nativeRuntimeIdentity: receipt.nativeRuntimeIdentity },
      permissions: receipt.permissions,
      evidenceClass: receipt.evidenceClass,
      launchMs: launched.ms,
    };
    nativeRefs = [
      { provider: "local-detached", type: "invocation", id: receipt.invocationId },
      { provider: "local-detached", type: "host-instance", id: receipt.hostInstanceId },
    ];

    // Journey 2: the detached host writes the marker on its own, after the exit.
    const appeared = await until(() => markerNames(INVOCATION).length, count => count >= 1, MARKER_BOUND_MS);
    if (!appeared.ok) diagnostics.push(`continued-execution: no marker within ${MARKER_BOUND_MS} ms of the client exit.`);
    journeys["continued-execution"] = { armed: true, markersAfterClientExit: appeared.value, markerAfterExitMs: round(performance.now() - atExit.at) };

    // Journey 3: a relaunched, booted Pi reattaches by the invocation ref and only inspects.
    const piEnv = { ...process.env, PI_CODING_AGENT_DIR: agentDir, HOME: agentDir };
    const ref = nativeRefs[0].id;
    commands.push(`node ${basename(SELF)} --client pi-inspect ${ref} terminal`);
    const observed = await runClient(["pi-inspect", ref, "terminal"], piCwd, piEnv);
    const observerReport = lastJson(observed.stdout);
    if (observerReport?.registered !== true) diagnostics.push(`observer-reattach: ${observerReport?.error ?? observed.stderr}`);
    const markerFiles = markerNames(INVOCATION);
    journeys["observer-reattach"] = {
      armed: observerReport?.registered === true,
      observer: "booted-pi-extension",
      observerExit: { code: observed.code, signal: observed.signal },
      registered: observerReport?.registered === true,
      actions: arrayOf(observerReport?.actions),
      first: observerReport?.first ?? null,
      final: observerReport?.final ?? null,
      markersAfterReattach: markerFiles.length,
      markerContent: markerFiles.length > 0 ? readFileSync(join(markers, markerFiles[0]), "utf8") : "",
      observerMs: observed.ms,
    };

    // Journey 4: host loss by SIGKILL, then a second booted Pi inspects.
    process.kill(hostPid, "SIGKILL");
    const gone = await until(() => running(hostPid, hostStartTicks), value => value === false, HOST_GONE_BOUND_MS);
    commands.push(`node ${basename(SELF)} --client pi-inspect ${ref} once`);
    const inspected = await runClient(["pi-inspect", ref, "once"], piCwd, piEnv);
    const inspectorReport = lastJson(inspected.stdout);
    if (inspectorReport?.registered !== true) diagnostics.push(`host-loss: ${inspectorReport?.error ?? inspected.stderr}`);
    const markersAfterLoss = markerNames(INVOCATION).length;
    await sleep(SETTLE_MS);
    journeys["host-loss"] = {
      armed: inspectorReport?.registered === true,
      signal: "SIGKILL",
      hostGone: gone.ok,
      hostGoneMs: gone.ms,
      inspectorExit: { code: inspected.code, signal: inspected.signal },
      registered: inspectorReport?.registered === true,
      actions: arrayOf(inspectorReport?.actions),
      snapshot: inspectorReport?.final ?? null,
      markersAfterLoss,
      markersAfterSettle: markerNames(INVOCATION).length,
    };
  };
  let code = 2;
  try {
    await measure();
  } catch (error) {
    diagnostics.push(`measurement error: ${message(error)}`);
  } finally {
    for (const child of children) child.kill("SIGKILL");
    if (hostPid === undefined) {
      // A launch whose handshake lapsed may still have brought its host up; the receipt that host wrote names it.
      try {
        const lapsed = JSON.parse(readFileSync(join(realpathSync(scratch), "agent", "workbench-detached", INVOCATION, "receipt.json"), "utf8"));
        if (isPid(lapsed.pid) && typeof lapsed.processStartTicks === "string") ({ pid: hostPid, processStartTicks: hostStartTicks, socketPath } = lapsed);
      } catch {
        /* no host came up */
      }
    }
    if (hostPid !== undefined && running(hostPid, hostStartTicks)) {
      try {
        process.kill(hostPid, "SIGKILL");
      } catch {
        /* already gone */
      }
      await until(() => running(hostPid, hostStartTicks), value => value === false, HOST_GONE_BOUND_MS);
    }
    // A killed host runs no cleanup, so its socket stays where it was (docs/workbench/08); this fixture's own goes here.
    if (socketPath !== undefined && hostPid !== undefined && !running(hostPid, hostStartTicks)) {
      try {
        const stat = lstatSync(socketPath);
        if (stat.isSocket() && stat.uid === process.getuid?.()) unlinkSync(socketPath);
      } catch {
        /* already gone */
      }
    }
    try {
      code = emit();
    } finally {
      removeScratch(scratch);
    }
  }
  return code;
}

function isEntry() {
  try {
    return process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(SELF);
  } catch {
    return false;
  }
}

if (isEntry()) {
  if (process.argv[2] === "--client" && process.argv[3] === "launch") await launchClient(process.argv[4]);
  else if (process.argv[2] === "--client" && process.argv[3] === "pi-inspect") await piInspectClient(process.argv[4], process.argv[5]);
  else process.exit(await harness());
}
