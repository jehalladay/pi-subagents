#!/usr/bin/env node
// wb-r5q2 [MWI-telemetry] (slice PI-7): runs the EAT-R079 load journey (qa/workbench/mwi-multiworkflow-load.mjs, its fixture
// leg) against the compiled build and prints one JSON record: the date, host, exact command and sample count, each sample's
// journey record, and the medians of the load phase's longest admission wait and of both phases' wall times.
//
//   npm run build && node qa/workbench/mwi-multiworkflow-load-bench.mjs [--samples N]
//
// Measurement only: it changes no setting and writes no file.
import { hostname } from 'node:os';
import { HostAdmission } from '../../dist/workflow/admission.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';
import { runLoadJourney } from './mwi-multiworkflow-load.mjs';

/** @param {readonly number[]} values */
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const at = process.argv.indexOf('--samples');
const samples = at < 0 ? 3 : Number.parseInt(process.argv[at + 1] ?? '', 10);
if (!Number.isSafeInteger(samples) || samples < 1) {
  console.error('usage: node qa/workbench/mwi-multiworkflow-load-bench.mjs [--samples N]  (N a positive integer; npm run build first)');
  process.exit(2);
}
const date = new Date().toISOString();
const records = [];
for (let i = 0; i < samples; i++) records.push(await runLoadJourney({ runWorkflow, HostAdmission }));
console.log(JSON.stringify({
  date,
  host: hostname(),
  command: `node qa/workbench/mwi-multiworkflow-load-bench.mjs --samples ${samples}`,
  samples,
  medians: {
    loadQueueWaitMaxMs: median(records.map((record) => record.load.queueWait.maxMs)),
    loadWallMs: median(records.map((record) => record.load.wallMs)),
    baselineWallMs: median(records.map((record) => record.baseline.wallMs)),
  },
  records,
}, null, 2));
