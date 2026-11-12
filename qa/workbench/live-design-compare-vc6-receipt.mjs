// wb-h8f.2 (VC-6 residual): live Pi design/compare loop acceptance receipt.
// Pure assessor and receipt builder. This module imports nothing and does no I/O or clock reads: the live runner
// (qa/workbench/live-design-compare-vc6.mjs) walks the journey through the compiled extension's registered tools and the
// compiled designer modules and hands the evidence over, and the offline test hands this module hand-built evidence;
// either way only the evidence is judged, and the gains/confounders report is DERIVED here from that evidence, never
// written by the runner.
//
// Criteria judged (bead wb-h8f.2 C1-C6; docs/workbench/11 "Workflow designer cycle", "Comparative experiment protocol"
// and "Acceptance journeys"; docs/workbench/15 VC-6):
//   C1 the chain catalog/source read -> proposal -> validation -> executed comparison -> report is realised on ONE
//      pinned saved script, each stage carrying its artifact (digests, task ids, native evidence refs);
//   C2 the comparison pins the docs/11 protocol (the registered workflow_compare reply's pin rows) and the runner records
//      each run's cold/warm cache state; an unpinned or divergent condition is a confounder, never silently averaged;
//   C3 precision is declined, with the raw native evidence references, whenever the comparison does not measure; a
//      missing native measured metric yields unknown (the in-run falsifier over the compiled core);
//   C4 the pinned live script digest is identical before and after the journey; promotion stays operator-only;
//   C5 a deliberately cross-schema receipt pair refuses with SCHEMA_MISMATCH plus a refused confound and no side-by-side
//      summary (the in-run falsifier over the compiled core and the compiled reply builder);
//   C6 the receipt carries revision, toolchain, command, timestamp, host, native references and actual output.
// Exit codes (exitCodeFor): 0 realised with no findings; 1 realised with findings (recorded honestly, never tuned
// away); 2 not realised, with a diagnostic naming the unrealised step (never a skip, never a fixture substitute).

export const RECEIPT_CONTRACT = 'workbench.design-compare-vc6/v1';
/** The patch proposal contract the compiled module stamps (src/workbench/patch-proposal.ts PATCH_PROPOSAL_CONTRACT). */
export const PROPOSAL_CONTRACT = 'workbench.patch-proposal/v1';
/** The host's own provider: its nodes are local-only, never native execution evidence (src/workbench/compare-run.ts). */
export const HOST_PROVIDER = 'pi-workflow';
/** Runs per cohort: repeated runs, so a pair-by-pair comparison can be read for reproducibility. */
export const COHORT_SIZE = 2;
/** The journey's stages, in the order C1 chains them. */
export const STAGES = Object.freeze(['catalog', 'proposal', 'validation', 'execution', 'comparison', 'report']);
/** The registered tools the journey speaks to; a host that did not register one cannot realise the journey. */
export const REQUIRED_TOOLS = Object.freeze(['workflow_catalog', 'workbench_catalog', 'workflow_validate', 'SubagentWorkflow', 'workflow_observe', 'workflow_compare']);
/** docs/11 "Pin workload, input revisions, workspace basis, code digest, model config, SDK versions and permissions", as the reply names them. */
export const PROTOCOL_PINS = Object.freeze(['workload', 'input revisions', 'workspace basis', 'code digest', 'model config', 'SDK versions', 'permissions']);
/** A run's cache state (docs/11 "Capture cold/warm cache state"): measured cold or warm, or stated unmeasured. */
export const CACHE_STATES = Object.freeze(['cold', 'warm', 'unmeasured']);
/** The pin alignments that hold a condition; anything else is a confounder. */
const HELD_ALIGNMENTS = new Set(['aligned', 'declared-change']);
/** Measured violations, in the order assessJourney reports them (exit 1). */
export const FINDING_RULES = Object.freeze([
  'catalog-digest-mismatch',
  'proposal-not-pinned',
  'candidate-not-validated',
  'promotion-not-operator-only',
  'live-script-replaced',
  'cohort-digest-mismatch',
  'cache-state-unrecorded',
  'comparison-unpaired',
  'native-evidence-uncited',
  'pin-unreported',
  'confounded-measurement',
  'measured-without-evidence',
  'comparison-not-reproducible',
  'causal-claim',
  'unknown-claimed',
  'cross-schema-not-refused',
]);
/** Steps that did not run to the claimed measurement (exit 2), in the order assessJourney checks them. */
export const UNREALISED_STEPS = Object.freeze([
  'host-unavailable',
  'measurement-error',
  'catalog-unread',
  'proposal-absent',
  'validation-absent',
  'live-digest-unrecorded',
  'cohort-not-executed',
  'native-evidence-absent',
  'comparison-absent',
  'falsifier-unrun',
]);

const DIGEST = /^sha256:[0-9a-f]{64}$/;
const arrayOf = (value) => (Array.isArray(value) ? value : []);
const finding = (rule, detail) => ({ rule, detail });
const unrealised = (step, diagnostic) => ({ step, diagnostic });
const refKey = (ref) => `${String(ref?.provider)}|${String(ref?.type)}|${String(ref?.id)}`;

/** A run's native execution references: every reference whose provider is not the host's own. */
export function nativeRefsOf(refs) {
  return arrayOf(refs).filter((ref) => ref && typeof ref === 'object' && typeof ref.provider === 'string' && ref.provider !== HOST_PROVIDER && String(ref.id ?? '') !== '');
}

const completed = (runs) => arrayOf(runs).filter((run) => run?.status === 'completed');
const measuredRows = (reply) => arrayOf(reply?.metrics).filter((row) => row?.kind === 'measured');
const unheldPins = (reply) => arrayOf(reply?.pins).filter((row) => !HELD_ALIGNMENTS.has(row?.alignment));

/** Why the journey did not run to the claimed measurement, or null. */
function unrealisedStep(evidence) {
  const host = evidence?.host ?? {};
  const missingTools = REQUIRED_TOOLS.filter((tool) => !arrayOf(host.tools).includes(tool));
  if (host.loaded !== true || missingTools.length > 0) {
    return unrealised('host-unavailable', host.loaded !== true ? `the compiled extension did not load: ${String(host.diagnostic ?? 'no diagnostic')}` : `the booted extension registered no ${missingTools.join(', ')}`);
  }
  if (evidence.measurementError) return unrealised('measurement-error', String(evidence.measurementError));
  const source = evidence.source;
  const catalog = evidence.catalog;
  if (!source || !catalog || !arrayOf(catalog.entries).some((entry) => entry?.name === source.name) || catalog.capabilities?.ok !== true) {
    return unrealised('catalog-unread', `the saved-source catalog listing ${String(source?.name)} and the capability catalog were not both read`);
  }
  if (!evidence.proposal || !evidence.candidate) return unrealised('proposal-absent', 'no digest-pinned patch proposal was produced over the saved source');
  if (!evidence.validation) return unrealised('validation-absent', 'the candidate was not validated through the registered workflow_validate');
  const live = evidence.liveScript;
  if (!DIGEST.test(String(live?.before ?? '')) || !DIGEST.test(String(live?.after ?? ''))) return unrealised('live-digest-unrecorded', 'the pinned live script was not digested before and after the journey');
  const cohorts = evidence.cohorts ?? {};
  for (const name of ['reference', 'candidate']) {
    const runs = arrayOf(cohorts[name]);
    if (completed(runs).length < COHORT_SIZE) {
      const statuses = runs.map((run) => `${String(run?.taskId)}:${String(run?.status)}${run?.error ? ` (${String(run.error)})` : ''}`).join(', ');
      return unrealised('cohort-not-executed', `the ${name} cohort completed ${completed(runs).length} of ${COHORT_SIZE} runs${statuses ? `: ${statuses}` : ''}`);
    }
  }
  for (const name of ['reference', 'candidate']) {
    const bare = completed(cohorts[name]).filter((run) => nativeRefsOf(run.nativeRefs).length === 0);
    if (bare.length > 0) return unrealised('native-evidence-absent', `no native execution reference was observed for ${name} run(s) ${bare.map((run) => String(run.taskId)).join(', ')}`);
  }
  const comparisons = arrayOf(evidence.comparisons);
  const broken = comparisons.filter((entry) => entry?.reply?.ok !== true || entry.reply.tool !== 'workflow_compare');
  if (comparisons.length < COHORT_SIZE || broken.length > 0) {
    return unrealised('comparison-absent', `${comparisons.length - broken.length} of ${COHORT_SIZE} registered workflow_compare replies completed`);
  }
  const falsifiers = evidence.falsifiers ?? {};
  if (!falsifiers.crossSchema || !falsifiers.missingMetric) return unrealised('falsifier-unrun', 'the cross-schema and missing-metric falsifiers did not both run over the compiled core');
  return null;
}

function assessChain(evidence, findings) {
  const { catalog, source, proposal, candidate, validation, liveScript } = evidence;
  const listed = arrayOf(catalog.entries).find((entry) => entry?.name === source.name);
  if (listed.artifactDigest !== source.artifactDigest || listed.sourceRef !== source.sourceRef) {
    findings.push(finding('catalog-digest-mismatch', `the catalog lists ${String(listed.sourceRef)} at ${String(listed.artifactDigest)}; the source read pinned ${String(source.sourceRef)} at ${String(source.artifactDigest)}`));
  }
  const pinned = [];
  if (proposal.contractVersion !== PROPOSAL_CONTRACT) pinned.push(`contract ${String(proposal.contractVersion)}`);
  if (!DIGEST.test(String(proposal.proposalDigest ?? ''))) pinned.push('no sha256 proposal digest');
  if (proposal.baseDigest !== source.artifactDigest || proposal.referenceDigest !== source.artifactDigest) pinned.push(`base ${String(proposal.baseDigest)} / reference ${String(proposal.referenceDigest)} is not the pinned source ${String(source.artifactDigest)}`);
  if (!DIGEST.test(String(proposal.candidateDigest ?? '')) || proposal.candidateDigest !== proposal.experimentCandidateDigest) pinned.push(`candidate ${String(proposal.candidateDigest)} / experiment ${String(proposal.experimentCandidateDigest)}`);
  if (proposal.candidateDigest === source.artifactDigest) pinned.push('the candidate is the base source (no change)');
  if (candidate.artifactDigest !== proposal.candidateDigest) pinned.push(`the candidate file is ${String(candidate.artifactDigest)}, not the proposed ${String(proposal.candidateDigest)}`);
  if (pinned.length > 0) findings.push(finding('proposal-not-pinned', pinned.join('; ')));
  const valid = [];
  if (proposal.status !== 'valid') valid.push(`proposal status ${String(proposal.status)}`);
  if (validation.ok !== true || validation.status !== 'valid') valid.push(`workflow_validate ${validation.ok === true ? 'completed' : 'refused'} with status ${String(validation.status)}`);
  if (validation.artifactDigest !== proposal.candidateDigest) valid.push(`validated ${String(validation.artifactDigest)}, not the candidate ${String(proposal.candidateDigest)}`);
  if (validation.executed !== false) valid.push('validation executed the source');
  if (valid.length > 0) findings.push(finding('candidate-not-validated', valid.join('; ')));
  const promotion = proposal.promotion ?? {};
  if (promotion.state !== 'proposed' || promotion.requires !== 'operator' || promotion.applied !== false) {
    findings.push(finding('promotion-not-operator-only', `promotion state ${String(promotion.state)}, requires ${String(promotion.requires)}, applied ${String(promotion.applied)}`));
  }
  if (liveScript.before !== liveScript.after || liveScript.before !== source.artifactDigest) {
    findings.push(finding('live-script-replaced', `the live script read ${String(liveScript.before)} before and ${String(liveScript.after)} after the journey; the pinned source is ${String(source.artifactDigest)}`));
  }
}

function assessCohorts(evidence, findings) {
  const { cohorts, source, proposal } = evidence;
  const digests = { reference: source.artifactDigest, candidate: proposal.candidateDigest };
  const wrong = [];
  const caches = [];
  for (const name of ['reference', 'candidate']) {
    for (const run of arrayOf(cohorts[name])) {
      if (run.scriptDigest !== digests[name]) wrong.push(`${name} run ${String(run.taskId)} ran ${String(run.scriptDigest)}, not ${String(digests[name])}`);
      if (!CACHE_STATES.includes(run.cache)) caches.push(`${name} run ${String(run.taskId)} cache ${String(run.cache)}`);
    }
  }
  if (wrong.length > 0) findings.push(finding('cohort-digest-mismatch', wrong.join('; ')));
  if (caches.length > 0) findings.push(finding('cache-state-unrecorded', caches.join('; ')));
}

function assessComparisons(evidence, findings) {
  const { cohorts, comparisons, source, proposal } = evidence;
  const unpaired = [];
  const uncited = [];
  const unreported = [];
  const confounded = [];
  const bare = [];
  comparisons.forEach((entry, index) => {
    const reply = entry.reply;
    const reference = arrayOf(cohorts.reference)[index];
    const candidate = arrayOf(cohorts.candidate)[index];
    if (entry.referenceTask !== reference?.taskId || entry.candidateTask !== candidate?.taskId) unpaired.push(`pair ${index} compares ${String(entry.referenceTask)} with ${String(entry.candidateTask)}`);
    const digests = reply.alignment?.sourceDigests ?? {};
    if (arrayOf(digests.reference).join(',') !== source.artifactDigest || arrayOf(digests.candidate).join(',') !== proposal.candidateDigest) unpaired.push(`pair ${index} reply source digests ${arrayOf(digests.reference).join(',')} vs ${arrayOf(digests.candidate).join(',')}`);
    for (const [side, run] of [['reference', reference], ['candidate', candidate]]) {
      const cited = new Set(arrayOf(reply.nativeRefs?.[side]).map(refKey));
      const missing = nativeRefsOf(run?.nativeRefs).filter((ref) => !cited.has(refKey(ref)));
      if (missing.length > 0) uncited.push(`pair ${index} ${side} reply omits ${missing.map(refKey).join(', ')}`);
    }
    const pins = arrayOf(reply.pins).map((row) => row?.pin);
    const absent = PROTOCOL_PINS.filter((pin) => !pins.includes(pin));
    if (absent.length > 0) unreported.push(`pair ${index} reports no ${absent.join(', ')} pin`);
    const measured = measuredRows(reply);
    if (measured.length > 0 && (arrayOf(reply.alignment?.confounds).length > 0 || unheldPins(reply).length > 0)) {
      confounded.push(`pair ${index} measures ${measured.map((row) => row.name).join(', ')} beside confounds ${[...arrayOf(reply.alignment?.confounds).map((row) => row.field), ...unheldPins(reply).map((row) => row.pin)].join(', ')}`);
    }
    for (const row of measured) if (arrayOf(row.evidenceRefs).length === 0) bare.push(`pair ${index} ${String(row.name)}`);
  });
  if (unpaired.length > 0) findings.push(finding('comparison-unpaired', unpaired.join('; ')));
  if (uncited.length > 0) findings.push(finding('native-evidence-uncited', uncited.join('; ')));
  if (unreported.length > 0) findings.push(finding('pin-unreported', unreported.join('; ')));
  if (confounded.length > 0) findings.push(finding('confounded-measurement', confounded.join('; ')));
  if (bare.length > 0) findings.push(finding('measured-without-evidence', `measured rows without evidence references: ${bare.join(', ')}`));
  const shapes = comparisons.map(({ reply }) =>
    JSON.stringify([reply.status, reply.declined?.code ?? null, [...new Set(arrayOf(reply.alignment?.confounds).map((row) => `${row.field}:${row.kind}`))].sort(), measuredRows(reply).map((row) => row.name).sort()]),
  );
  if (new Set(shapes).size > 1) findings.push(finding('comparison-not-reproducible', `the pair replies disagree: ${shapes.join(' vs ')}`));
  if (comparisons.some(({ reply }) => reply.limits?.causalClaim !== false) || proposal.causalClaim !== false) findings.push(finding('causal-claim', 'a comparison reply or the proposal does not state causalClaim false'));
}

function assessFalsifiers(falsifiers, findings) {
  const missing = falsifiers.missingMetric;
  const verdict = arrayOf(missing.perMetric).find((row) => row?.name === missing.metric)?.verdict;
  const delta = arrayOf(missing.metrics).some((row) => row?.name === missing.metric && row.delta !== undefined);
  if (verdict !== 'unknown' || delta || missing.claim !== 'none') {
    findings.push(finding('unknown-claimed', `the missing ${String(missing.metric)} read ${String(verdict)}${delta ? ' with a delta' : ''} and claim ${String(missing.claim)}`));
  }
  const cross = falsifiers.crossSchema;
  const problems = [];
  if (!arrayOf(cross.diagnostics).some((row) => row?.code === 'SCHEMA_MISMATCH')) problems.push('no SCHEMA_MISMATCH diagnostic');
  if (!arrayOf(cross.confounds).some((row) => row?.field === 'schemaVersion' && row.kind === 'refused')) problems.push('no refused schemaVersion confound');
  if (arrayOf(cross.metrics).length > 0) problems.push(`${arrayOf(cross.metrics).length} side-by-side metric summaries`);
  if (cross.reply?.status !== 'declined' || cross.reply?.declined?.code !== 'schema-refused' || measuredRows(cross.reply).length > 0) problems.push(`the reply is ${String(cross.reply?.status)} ${String(cross.reply?.declined?.code)}`);
  if (problems.length > 0) findings.push(finding('cross-schema-not-refused', problems.join('; ')));
}

/** Judge one evidence record. Unrealised steps pre-empt findings: an unmeasured claim is never graded. */
export function assessJourney(evidence) {
  const step = unrealisedStep(evidence);
  if (step) return { findings: [], unrealised: [step] };
  const findings = [];
  assessChain(evidence, findings);
  assessCohorts(evidence, findings);
  assessComparisons(evidence, findings);
  assessFalsifiers(evidence.falsifiers, findings);
  findings.sort((left, right) => FINDING_RULES.indexOf(left.rule) - FINDING_RULES.indexOf(right.rule));
  return { findings, unrealised: [] };
}

/**
 * The gains/confounders report, derived from the evidence alone. A gain is a measured row of a registered comparison
 * reply that carries its evidence references, and only while no confounder stands; otherwise precision is declined
 * with every reason and the raw native evidence references of both cohorts.
 */
export function reportOf(evidence) {
  const comparisons = arrayOf(evidence?.comparisons).filter((entry) => entry?.reply?.ok === true);
  const confounders = [];
  const seen = new Set();
  const confound = (field, kind, reason) => {
    const key = `${field}|${kind}|${reason}`;
    if (!seen.has(key)) {
      seen.add(key);
      confounders.push({ field, kind, reason });
    }
  };
  for (const { reply } of comparisons) for (const row of arrayOf(reply.alignment?.confounds)) confound(String(row.field), String(row.kind), String(row.reason));
  const runs = { reference: arrayOf(evidence?.cohorts?.reference), candidate: arrayOf(evidence?.cohorts?.candidate) };
  const states = (name) => runs[name].map((run) => String(run?.cache));
  if ([...states('reference'), ...states('candidate')].some((state) => state !== 'cold' && state !== 'warm')) confound('cacheState', 'unverified', 'the cold/warm cache state of a run is unmeasured or unrecorded');
  else if (states('reference').join(',') !== states('candidate').join(',')) confound('cacheState', 'mismatched', `cache states differ: reference ${states('reference').join(',')} vs candidate ${states('candidate').join(',')}`);
  const reasons = [];
  const reason = (text) => {
    if (!reasons.includes(text)) reasons.push(text);
  };
  for (const { reply } of comparisons) {
    if (reply.declined?.code) reason(`declined: ${String(reply.declined.code)}`);
    for (const row of arrayOf(reply.metrics)) if (row?.kind === 'declined') for (const why of arrayOf(row.reasons)) reason(`${String(row.name)}: ${String(why)}`);
    for (const row of arrayOf(reply.diagnostics)) if (row?.code === 'COMPARISON_UNKNOWN') reason(String(row.message));
    if (arrayOf(reply.metrics).length === 0) reason('the comparison carries no native measured metric row');
  }
  const candidates = [];
  comparisons.forEach(({ reply }, pair) => {
    for (const row of measuredRows(reply)) {
      if (arrayOf(row.evidenceRefs).length === 0) continue;
      candidates.push({ pair, name: String(row.name), unit: String(row.unit), delta: row.delta, dispersion: row.confidence?.dispersion ?? 'unmeasured', referenceRuns: row.confidence?.referenceRuns ?? null, candidateRuns: row.confidence?.candidateRuns ?? null, evidenceRefs: arrayOf(row.evidenceRefs).map(String) });
    }
  });
  if (candidates.length > 0 && confounders.length > 0) reason(`measured rows withheld beside confounders: ${confounders.map((row) => row.field).join(', ')}`);
  if (comparisons.length === 0) reason('no registered comparison completed');
  const gains = confounders.length === 0 ? candidates : [];
  return {
    precision: gains.length > 0 ? 'measured' : 'declined',
    gains,
    confounders,
    reasons: gains.length > 0 ? [] : reasons,
    evidenceRefs: comparisons.map(({ reply, referenceTask, candidateTask }) => ({ referenceTask, candidateTask, reference: arrayOf(reply.nativeRefs?.reference), candidate: arrayOf(reply.nativeRefs?.candidate) })),
    recommendation: { promotion: 'operator-only', applied: false, proposalDigest: evidence?.proposal?.proposalDigest ?? null },
  };
}

/** Build the evidence-grade receipt (C6): the input's stamp fields, the evidence it judged, the derived report and the verdict. */
export function buildReceipt(input) {
  const evidence = input?.evidence ?? {};
  const assessment = assessJourney(evidence);
  const realised = assessment.unrealised.length === 0;
  return {
    contract: RECEIPT_CONTRACT,
    utc: input.utc,
    revision: input.revision,
    dirty: input.dirty ?? null,
    sources: input.sources ?? {},
    command: input.command,
    node: input.node,
    arch: input.arch,
    platform: input.platform,
    host: input.host ?? {},
    toolchain: input.toolchain ?? {},
    model: input.model ?? null,
    stages: [...STAGES],
    journey: {
      host: evidence.host ?? {},
      catalog: evidence.catalog ?? null,
      source: evidence.source ?? null,
      proposal: evidence.proposal ?? null,
      candidate: evidence.candidate ?? null,
      validation: evidence.validation ?? null,
      liveScript: evidence.liveScript ?? null,
      cohorts: { reference: arrayOf(evidence.cohorts?.reference), candidate: arrayOf(evidence.cohorts?.candidate) },
      comparisons: arrayOf(evidence.comparisons),
      falsifiers: evidence.falsifiers ?? null,
      measurementError: evidence.measurementError ?? null,
    },
    report: reportOf(evidence),
    findings: assessment.findings,
    unrealised: assessment.unrealised,
    realised,
    pass: realised && assessment.findings.length === 0,
  };
}

/** 0 realised clean; 1 realised with findings; 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length > 0 ? 1 : 0;
}
