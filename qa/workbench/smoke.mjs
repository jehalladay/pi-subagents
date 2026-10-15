import assert from 'node:assert/strict';
import { createClaudeWorkflowHost } from '../../dist/workbench/claude-host.js';
import { CapabilityRegistry } from '../../dist/workbench/capability-registry.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';

assert.equal(typeof createClaudeWorkflowHost, 'function');
const registry = new CapabilityRegistry();
registry.register({
  descriptor: {
    id: 'smoke.read', version: '1.0.0', description: 'Read a deterministic fixture',
    inputSchema: {type:'object', properties:{value:{type:'string'}}, required:['value'], additionalProperties:false},
    effectClass: 'read', permissions: ['smoke:read'], supportedModes: ['invoke'],
  },
  invoke: async input => ({echo:input.value, coverage:'fixture'}),
});
const host = {
  spawnAgent: () => { throw Error('a deterministic node must not spawn an agent'); },
  abortAgent: () => {},
  callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ['smoke:read'], signal: new AbortController().signal }),
};
const result = await runWorkflow({
  script: 'export const meta = {name:"smoke", description:"compiled external workflow"};\nreturn await node("smoke.read", {value:"ready"});',
  host,
});
assert.equal(result.status, 'completed', result.error);
assert.deepEqual(result.value, {echo:'ready',coverage:'fixture'});
console.log('L1 Workbench smoke: compiled node RPC, registry, and Claude host export are reachable');
