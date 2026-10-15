// L1/L2: external client imports the built public service; no Pi host or script execution.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { catalogWorkflows, inspectWorkflowSource, validateWorkflowSource, compareWorkflowRuns } from '../../dist/workbench/designer.js';
const root = mkdtempSync(join(tmpdir(), 'designer-client-'));
try {
  const dir = join(root, '.pi/workflows'); mkdirSync(dir, { recursive: true });
  const script = 'export const meta = { name: "inspect", description: "never execute" };\nthrow new Error("must not run");\nawait node("forge.gate.status", { root: "." });\nif (args.flag) await agent("review");\nreturn 1;';
  writeFileSync(join(dir, 'inspect.js'), script);
  const catalog = catalogWorkflows(root, { filter: 'inspect', limit: 1 });
  assert.equal(catalog.entries[0].name, 'inspect');
  const source = inspectWorkflowSource({ name: 'inspect' }, root);
  assert.equal(source.source, script);
  assert.equal(source.definition.artifactDigest, `sha256:${createHash('sha256').update(script).digest('hex')}`);
  const result = validateWorkflowSource(source);
  assert.equal(result.syntax, 'valid'); assert.equal(result.meta.name, 'inspect');
  assert.equal(result.projection.calls.filter(call => call.primitive === 'node').length, 1);
  assert.ok(result.projection.unknown.length > 0);
  assert.equal(readFileSync(join(dir, 'inspect.js'), 'utf8'), script);
  assert.equal(compareWorkflowRuns([], []).status, 'unknown');
  console.log('designer external client: source digest, AST projection, no execution/edit, empty-cohort refusal PASS');
} finally { rmSync(root, { recursive: true, force: true }); }
