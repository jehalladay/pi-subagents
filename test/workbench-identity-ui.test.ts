/** Node details carry native refs and UNKNOWN freshness; partial never gets a success glyph. */
import { describe, expect, it } from 'vitest';
import {layoutWorkflowCard,plainWorkflowCardLines} from '../src/ui/workflow-card.js';
import {initialWorkflowDialogState, layoutWorkflowDialog,plainWorkflowDialogLines} from '../src/ui/workflow-dialog.js';
import {type WorkflowEntry} from '../src/workflow/progress.js';

const task={status:'completed' as const,workflowName:'identity',startTime:1,endTime:2};
const progress:WorkflowEntry[]=[{type:'workflow_node',index:0,callId:1,capabilityId:'forge.gate.status',label:'Inspect native gate',state:'done',domainStatus:'partial',nativeId:'op-123',freshness:'unknown',resultPreview:'partial'}];
describe('native node identity and uncertainty UI',()=>{
  it('shows partial as unknown rather than a success check on the compact card',()=>{
    const lines=plainWorkflowCardLines(layoutWorkflowCard({task,progress,ascii:true,width:80,now:2})).join('\n');
    expect(lines).toContain('partial');
    expect(lines).toContain('?');
  });
  it('displays native reference and freshness in terminal view',()=>{
    const lines=plainWorkflowDialogLines(layoutWorkflowDialog({task,progress,state:initialWorkflowDialogState(),ascii:true,width:100,now:2})).join('\n');
    expect(lines).toContain('op-123');
    expect(lines).toContain('unknown');
  });
});
