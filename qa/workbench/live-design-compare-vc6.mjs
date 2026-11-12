// wb-h8f.2 (VC-6 residual): live Pi design/compare loop acceptance receipt. Run `npm run build` first.
// Measurement only: the compiled extension (dist/index.js) is booted in this process the way Pi boots it, and the
// journey is walked through its REGISTERED tools and the compiled designer modules, against the live Claude Agent SDK
// backend. Nothing in src/ or dist/ is replaced or stubbed. In order:
//   catalog     workflow_catalog lists the saved script; workbench_catalog reads the capability catalog;
//   source      the compiled inspectWorkflowSource pins the saved script's bytes by digest;
//   proposal    the compiled proposeWorkflowPatch: a digest-pinned candidate that drops the redundant second review
//               (harness-authored: no model turn writes the candidate), written beside the live script as NEW
//               versioned source; the live script itself is never written after it is created;
//   validation  workflow_validate over the candidate file, pinned to the proposal's candidate digest;
//   execution   SubagentWorkflow runs the reference and the candidate script COHORT_SIZE times each, interleaved, on the
//               Claude backend; workflow_observe reads each run's identity and native references back from the host;
//   comparison  workflow_compare, once per (reference, candidate) pair: the registered reply over natively sourced
//               receipts (wb-rz62), with its alignment, protocol pins, metric rows and raw native references;
//   falsifiers  over the compiled core: a deliberately cross-schema receipt pair, and a pair missing a native metric;
//   live digest the live script digested again, to be compared with its first digest.
// The gains/confounders report is derived by the assessor from that evidence, never written here. One JSON receipt
// (workbench.design-compare-vc6/v1) is printed and written to $VC6_RECEIPT (when set) before the exit code is set:
// 0 realised clean; 1 realised with findings (never tuned away); 2 not realised (the diagnostic names the step).
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { cpus, loadavg, release } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import subagentsExtension from '../../dist/index.js';
import { buildWorkflowCompareReply } from '../../dist/workbench/compare-tool.js';
import { compareWorkflowRuns, inspectWorkflowSource } from '../../dist/workbench/designer.js';
import { captureInvocationIdentity, WORKFLOW_SCRIPT_SCHEMA_VERSION } from '../../dist/workbench/identity.js';
import { proposeWorkflowPatch } from '../../dist/workbench/patch-proposal.js';
import { sanitizeWorkbenchText } from '../../dist/workbench/redaction.js';
import { gitStamp } from './git-stamp.mjs';
import { buildReceipt, COHORT_SIZE, exitCodeFor, nativeRefsOf, REQUIRED_TOOLS } from './live-design-compare-vc6-receipt.mjs';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

const COMMAND = 'node qa/workbench/live-design-compare-vc6.mjs';
const REPO_ROOT = realpathSync(fileURLToPath(new URL('../..', import.meta.url)));
/** A Haiku-class alias: cheap, tool-free turns only. */
const MODEL = process.env.VC6_MODEL || 'claude-haiku-4-5';
const NAME = 'vc6-redundant';
const SESSION = 'vc6-design-compare';
/** The whole journey's own bound, inside the Forge command's 900 s, so a receipt is always printed. */
const JOURNEY_BOUND_MS = 780_000;
const RUN_BOUND_MS = 240_000;
const PREVIEW = 300;
const GRANTS = Object.freeze(['workbench:design', 'workbench:observe', 'discover:forge.gate.status', 'discover:hyperunix.find', 'discover:furnace.run.inspect', 'discover:reactivefiber.render.preview']);
const SETTINGS = { workflowsEnabled: true, workbench: { workflowAgentBackend: 'claude', model: MODEL, tools: [], settingSources: [], capabilityGrants: [...GRANTS] } };
const PROMPT = 'Reply with the single word OK. Do not use any tools.';
const META = `export const meta={name:"${NAME}",description:"VC-6 fixture: one review asked twice"};`;
/** The saved live script: the same review asked twice, the second answer redundant. */
const BASE_SOURCE = `${META}\nconst first=await agent(${JSON.stringify(PROMPT)},{label:"review"});\nconst second=await agent(${JSON.stringify(PROMPT)},{label:"review-again"});\nreturn {first,second};\n`;
/** The candidate: the redundant review reuses the first answer. */
const CANDIDATE_SOURCE = `${META}\nconst first=await agent(${JSON.stringify(PROMPT)},{label:"review"});\nconst second=first;\nreturn {first,second};\n`;
const RATIONALE = 'The second review asks the identical prompt the first one answered; reuse the first answer instead of asking again.';
const HYPOTHESIS = { metric: 'latency.model.busyMs', direction: 'lower', groundedIn: [] };
/** The bytes this measurement executes, digested into the receipt beside the revision. */
const SOURCES = Object.freeze([
  'qa/workbench/live-design-compare-vc6.mjs',
  'qa/workbench/live-design-compare-vc6-receipt.mjs',
  'qa/workbench/git-stamp.mjs',
  'qa/workbench/scratch.mjs',
  'dist/index.js',
  'dist/workbench/designer.js',
  'dist/workbench/patch-proposal.js',
  'dist/workbench/compare-tool.js',
  'dist/workbench/compare-run.js',
  'dist/workbench/identity.js',
]);
const TOOLCHAIN_PACKAGES = Object.freeze(['@anthropic-ai/claude-agent-sdk', '@earendil-works/pi-coding-agent', 'typescript']);

const started = Date.now();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sha256File = (path) => `sha256:${createHash('sha256').update(readFileSync(path)).digest('hex')}`;
/** Producer text in this receipt goes through the shared helper's named label layout; nothing is composed here. */
const preview = (value, max = PREVIEW) => sanitizeWorkbenchText(String(value ?? ''), max, 'label');
const reasonOf = (error) => preview(error instanceof Error ? error.message : error, 400);
const textOf = (result) => String(result?.content?.[0]?.text ?? '');
const jsonOf = (text) => {
  try {
    const value = JSON.parse(text);
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
};

function versionOf(name) {
  try {
    return JSON.parse(readFileSync(join(REPO_ROOT, 'node_modules', name, 'package.json'), 'utf8')).version ?? 'unknown';
  } catch {
    return 'missing';
  }
}

function sourceDigests() {
  return Object.fromEntries(SOURCES.map((path) => [path, existsSync(join(REPO_ROOT, path)) ? sha256File(join(REPO_ROOT, path)) : 'missing']));
}

function gitFacts() {
  const { head, porcelain } = gitStamp(REPO_ROOT);
  if (head === null || porcelain === null) return { revision: 'unknown', dirty: null };
  return { revision: head, dirty: porcelain.trim().length > 0 };
}

/** Boot the compiled extension in this process with the stand-ins Pi provides an extension (the detached-reattach precedent). */
async function bootExtension(workspace) {
  const tools = new Map();
  const lifecycle = new Map();
  const messages = [];
  const noop = () => {};
  const pi = {
    registerMessageRenderer: noop,
    registerEntryRenderer: noop,
    registerTool: (tool) => {
      tools.set(tool.name, tool);
    },
    registerCommand: noop,
    registerFlag: noop,
    getFlag: () => undefined,
    on: (event, handler) => {
      lifecycle.set(event, handler);
    },
    events: { emit: noop, on: () => noop },
    getAllTools: () => [],
    getCommands: () => [],
    getActiveTools: () => [...tools.keys()],
    setActiveTools: noop,
    appendEntry: noop,
    sendMessage: (message) => {
      messages.push(message);
    },
    exec: async () => ({ stdout: '', stderr: '', code: 0, killed: false }),
  };
  const ctx = {
    mode: 'print',
    hasUI: false,
    ui: { setStatus: noop, setWidget: noop, notify: noop, addAutocompleteProvider: noop },
    cwd: workspace,
    model: undefined,
    modelRegistry: { find: noop, getAvailable: () => [] },
    sessionManager: { getSessionId: () => SESSION, getBranch: () => [] },
    getSystemPrompt: () => '',
  };
  subagentsExtension(pi);
  await lifecycle.get('session_start')?.({}, ctx);
  let calls = 0;
  const call = async (name, params) => {
    const tool = tools.get(name);
    if (!tool) throw new Error(`the booted extension registered no ${name}`);
    calls += 1;
    return tool.execute(`vc6-${calls}`, params, undefined, undefined, ctx);
  };
  const shutdown = async () => {
    await lifecycle.get('session_shutdown')?.({}, ctx);
  };
  return { tools, messages, call, shutdown };
}

/** One SubagentWorkflow run of a saved script, read back through workflow_observe once its completion notice arrives. */
async function execute(host, scriptPath, deadline) {
  const launched = await host.call('SubagentWorkflow', { scriptPath });
  const taskId = launched?.details?.taskId;
  if (typeof taskId !== 'string') return { taskId: null, status: 'not-started', scriptDigest: null, cache: 'unmeasured', nativeRefs: [], output: '', error: preview(textOf(launched)) };
  const bound = Math.min(Date.now() + RUN_BOUND_MS, deadline);
  const notice = () => host.messages.find((message) => message?.details?.id === taskId);
  while (!notice() && Date.now() < bound) await sleep(250);
  const observed = jsonOf(textOf(await host.call('workflow_observe', { taskId, limit: 40 }))) ?? {};
  const note = notice();
  const nodes = Array.isArray(observed.nodes) ? observed.nodes : [];
  return {
    taskId,
    status: typeof observed.status === 'string' ? observed.status : note ? String(note.details.status) : 'unobserved',
    scriptDigest: observed.identity?.definition?.artifactDigest ?? null,
    definitionId: observed.identity?.definition?.id ?? null,
    inputDigest: observed.inputDigest ?? null,
    workspaceSourceState: observed.workspaceSourceState ?? null,
    // The host measures no cold/warm cache state for a run, so none is claimed (docs/11 "Capture cold/warm cache state").
    cache: 'unmeasured',
    nativeRefs: nodes.map((node) => node?.nativeRef).filter((ref) => ref && typeof ref === 'object'),
    nodes: nodes.length,
    output: note ? preview(note.details.resultPreview) : '',
    budget: note ? { totalTokens: note.details.totalTokens ?? null, durationMs: note.details.durationMs ?? null, source: 'host notification' } : null,
    ...(note ? (observed.error || note.details.error ? { error: preview(observed.error ?? note.details.error) } : {}) : { error: 'no completion notice within the run bound' }),
  };
}

/** One receipt for the compiled core, captured from real files; the falsifiers' only deliberate edit is the named field. */
function falsifierRun(context, id, schemaVersion, metrics) {
  const snapshot = captureInvocationIdentity({
    definition: { kind: 'script', id: context.livePath, schemaVersion },
    scriptPath: context.livePath,
    packageRoot: REPO_ROOT,
    hostArtifacts: ['dist/workbench/designer.js'],
    runtimeArtifacts: [join(REPO_ROOT, 'dist/workbench/designer.js')],
    logicalInvocationId: id,
    principal: { issuer: 'vc6-falsifier', subject: 'receipt-harness' },
    workspace: { path: context.workspace, sourceBasis: context.basis },
    effectiveConfig: { model: MODEL },
    hostAbi: { runtime: 'node', version: process.version, platform: process.platform, arch: process.arch, interfaceVersion: 'vc6-falsifier' },
    providerDescriptors: [],
  });
  const source = { provider: 'claude-agent-sdk', type: 'session', id: `vc6-falsifier-${id}` };
  return {
    snapshot,
    inputDigest: context.basis,
    modelDigest: context.basis,
    toolsDigest: context.basis,
    environmentDigest: context.basis,
    cacheDigest: context.basis,
    workspaceSourceState: 'measured',
    nativeRefs: [source],
    metrics: metrics.map(([name, value]) => ({ name, unit: 'ms', value, source, evidenceRefs: [`ev:${id}`], subjectBasis: snapshot.identity.subjectBasis, coverage: 'complete', freshness: 'current' })),
  };
}

function falsifiers(context) {
  const grants = ['workbench:design', 'workbench:observe'];
  const metric = 'latency.wall.ms';
  const cross = compareWorkflowRuns([falsifierRun(context, 'vc6-x-ref', WORKFLOW_SCRIPT_SCHEMA_VERSION, [[metric, 100]])], [falsifierRun(context, 'vc6-x-cand', `${WORKFLOW_SCRIPT_SCHEMA_VERSION}+vc6-mismatch`, [[metric, 80]])]);
  const crossReply = buildWorkflowCompareReply({ comparison: cross, grants }).reply;
  const missing = compareWorkflowRuns([falsifierRun(context, 'vc6-m-ref', WORKFLOW_SCRIPT_SCHEMA_VERSION, [[metric, 100]])], [falsifierRun(context, 'vc6-m-cand', WORKFLOW_SCRIPT_SCHEMA_VERSION, [])]);
  return {
    crossSchema: {
      schemaVersions: [WORKFLOW_SCRIPT_SCHEMA_VERSION, `${WORKFLOW_SCRIPT_SCHEMA_VERSION}+vc6-mismatch`],
      status: cross.status,
      diagnostics: cross.diagnostics.map((row) => ({ code: row.code, severity: row.severity, ...(row.dimension ? { dimension: row.dimension } : {}) })),
      confounds: cross.cohort.confounds,
      metrics: cross.metrics,
      reply: { status: crossReply.status, ...(crossReply.declined ? { declined: crossReply.declined } : {}), metrics: Array.isArray(crossReply.metrics) ? crossReply.metrics : [] },
    },
    missingMetric: {
      metric,
      perMetric: missing.perMetric.map((row) => ({ name: row.name, verdict: row.verdict, reasons: row.reasons })),
      metrics: missing.metrics.map((row) => ({ name: row.name, ...(row.delta === undefined ? {} : { delta: row.delta }) })),
      claim: missing.claim,
    },
  };
}

async function journey(evidence, workspace) {
  const deadline = started + JOURNEY_BOUND_MS;
  const workflows = join(workspace, '.pi', 'workflows');
  mkdirSync(workflows, { recursive: true });
  writeFileSync(join(workspace, '.pi', 'subagents.json'), JSON.stringify(SETTINGS));
  const livePath = join(workflows, `${NAME}.js`);
  writeFileSync(livePath, BASE_SOURCE);
  const rel = (path) => relative(workspace, path);
  evidence.liveScript = { path: rel(livePath), before: sha256File(livePath), after: null };

  let host;
  try {
    host = { ...(await bootExtension(workspace)), workspace };
  } catch (error) {
    evidence.host = { loaded: false, tools: [], diagnostic: reasonOf(error) };
    return undefined;
  }
  evidence.host = { loaded: true, tools: REQUIRED_TOOLS.filter((name) => host.tools.has(name)) };
  try {
    if (evidence.host.tools.length < REQUIRED_TOOLS.length) return host;
    const catalog = jsonOf(textOf(await host.call('workflow_catalog', { filter: NAME, limit: 5 })));
    const capabilities = jsonOf(textOf(await host.call('workbench_catalog', { limit: 20 })));
    evidence.catalog = {
      entries: (Array.isArray(catalog?.entries) ? catalog.entries : []).map((entry) => ({ name: entry.name, sourceRef: rel(String(entry.sourceRef)), artifactDigest: entry.definition?.artifactDigest ?? null })),
      catalogDigest: catalog?.catalogDigest ?? null,
      completeness: catalog?.completeness ?? null,
      capabilities: { ok: capabilities?.ok === true, ids: (Array.isArray(capabilities?.rows) ? capabilities.rows : []).map((row) => row.id) },
    };
    const base = inspectWorkflowSource({ name: NAME }, workspace);
    evidence.source = { name: NAME, sourceRef: rel(base.sourceRef), artifactDigest: base.definition.artifactDigest };

    const proposal = proposeWorkflowPatch({ base, candidateSource: CANDIDATE_SOURCE, rationale: RATIONALE, hypothesis: HYPOTHESIS });
    const candidatePath = join(workflows, `${NAME}-candidate.js`);
    writeFileSync(candidatePath, CANDIDATE_SOURCE);
    evidence.proposal = {
      contractVersion: proposal.contractVersion,
      status: proposal.status,
      proposalDigest: proposal.proposalDigest,
      baseDigest: proposal.base.definition.artifactDigest,
      candidateDigest: proposal.candidate.definition.artifactDigest,
      referenceDigest: proposal.experiment.referenceDigest,
      experimentCandidateDigest: proposal.experiment.candidateDigest,
      mustHold: proposal.experiment.mustHold,
      promotion: proposal.promotion,
      causalClaim: proposal.causalClaim,
      hypothesis: proposal.hypothesis ?? null,
      rationale: proposal.rationale,
      candidateAuthor: 'harness',
      diff: { ...proposal.diff.summary, truncated: proposal.diff.truncated, hunks: proposal.diff.hunks },
    };
    evidence.candidate = { path: rel(candidatePath), artifactDigest: sha256File(candidatePath) };

    const validation = jsonOf(textOf(await host.call('workflow_validate', { scriptPath: rel(candidatePath), digest: proposal.candidate.definition.artifactDigest })));
    evidence.validation = {
      ok: validation?.ok === true,
      status: validation?.status ?? 'unparsed',
      artifactDigest: validation?.source?.artifactDigest ?? null,
      executed: validation?.executed ?? null,
      counts: validation?.counts ?? null,
      ...(validation?.ok === false ? { error: validation.error ?? null } : {}),
    };

    const cohorts = { reference: [], candidate: [] };
    evidence.cohorts = cohorts;
    for (let index = 0; index < COHORT_SIZE; index++) {
      cohorts.reference.push(await execute(host, rel(livePath), deadline));
      cohorts.candidate.push(await execute(host, rel(candidatePath), deadline));
    }
    evidence.comparisons = [];
    for (let index = 0; index < COHORT_SIZE; index++) {
      const referenceTask = cohorts.reference[index]?.taskId;
      const candidateTask = cohorts.candidate[index]?.taskId;
      if (typeof referenceTask !== 'string' || typeof candidateTask !== 'string') continue;
      const text = textOf(await host.call('workflow_compare', { referenceTask, candidateTask }));
      evidence.comparisons.push({ referenceTask, candidateTask, reply: jsonOf(text) ?? { ok: false, unparsed: preview(text) } });
    }
    const basis = `sha256:${createHash('sha256').update(`vc6-falsifier-basis:${rel(livePath)}`).digest('hex')}`;
    evidence.falsifiers = falsifiers({ livePath, workspace, basis });
    evidence.nativeEvidence = {
      reference: cohorts.reference.map((run) => nativeRefsOf(run.nativeRefs).length),
      candidate: cohorts.candidate.map((run) => nativeRefsOf(run.nativeRefs).length),
    };
  } catch (error) {
    evidence.measurementError = reasonOf(error);
  } finally {
    evidence.liveScript.after = sha256File(livePath);
  }
  return host;
}

async function main() {
  const evidence = { host: { loaded: false, tools: [] } };
  const previous = { cwd: process.cwd(), agentDir: process.env.PI_CODING_AGENT_DIR };
  const workspace = realpathSync(makeScratch('pi-vc6-design-compare-'));
  const agentDir = makeScratch('pi-vc6-agent-');
  const load = { start: loadavg() };
  let host;
  try {
    // The user's own agent directory cannot reach the booted extension; HOME stays, so the deployed SDK login is the one used.
    process.env.PI_CODING_AGENT_DIR = agentDir;
    process.chdir(workspace);
    host = await journey(evidence, workspace);
  } catch (error) {
    evidence.measurementError = reasonOf(error);
  } finally {
    try {
      await host?.shutdown();
    } catch (error) {
      evidence.shutdownError = reasonOf(error);
    }
    process.chdir(previous.cwd);
    if (previous.agentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = previous.agentDir;
    removeScratch(workspace);
    removeScratch(agentDir);
  }
  load.end = loadavg();
  const git = gitFacts();
  const receipt = buildReceipt({
    utc: new Date().toISOString(),
    revision: git.revision,
    dirty: git.dirty,
    sources: sourceDigests(),
    command: COMMAND,
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    host: { release: release(), cpus: cpus().length, loadavg: load, elapsedMs: Date.now() - started },
    toolchain: Object.fromEntries(TOOLCHAIN_PACKAGES.map((name) => [name, versionOf(name)])),
    model: { requested: MODEL, backend: 'claude' },
    evidence,
  });
  const line = JSON.stringify(receipt);
  if (process.env.VC6_RECEIPT) writeFileSync(process.env.VC6_RECEIPT, `${line}\n`);
  process.stdout.write(`${line}\n`);
  const code = exitCodeFor(receipt);
  if (code !== 0) {
    const named = code === 2 ? receipt.unrealised.map((entry) => `${entry.step}: ${entry.diagnostic}`) : receipt.findings.map((entry) => `${entry.rule}: ${entry.detail}`);
    process.stderr.write(`live-design-compare-vc6: ${code === 2 ? 'not realised' : 'measured violation(s)'}: ${named.join('; ')}\n`);
  }
  // An SDK child may keep the loop alive after the receipt is out; never past a few seconds.
  setTimeout(() => process.exit(), 5_000).unref();
  return receipt;
}

const receipt = await main();
process.exitCode = exitCodeFor(receipt);
