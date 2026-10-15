/** UI contract: native node operations are visible without pretending to be agents. */
import { describe, expect, it } from 'vitest';
import { layoutWorkflowCard, plainWorkflowCardLines } from '../src/ui/workflow-card.js';
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from '../src/ui/workflow-dialog.js';
import { collapse, type WorkflowEntry } from '../src/workflow/progress.js';

const progress: WorkflowEntry[]=[
  {type:'workflow_phase',index:0,title:'Verify'},
  {type:'workflow_node',index:0,callId:5,capabilityId:'record.read',label:'Native lookup',state:'done',phaseIndex:0,phaseTitle:'Verify',resultPreview:'{"coverage":"partial"}',sourceBasis:'basis-1',evidenceRefs:[]},
];
const task={status:'completed' as const,workflowName:'native-test',startTime:1000,endTime:2000};
describe('Workbench native operation projection',()=>{
  it('does not count an SDK node as an agent',()=>{
    expect(collapse(progress).agents).toEqual([]);
  });
  it('shows capability, label and partial domain result on the compact card',()=>{
    const lines=plainWorkflowCardLines(layoutWorkflowCard({task,progress,width:80,now:2000,ascii:true}));
    expect(lines.join('\n')).toContain('Native lookup');
    expect(lines.join('\n')).toContain('record.read');
    expect(lines.join('\n')).toContain('partial');
  });
  it('shows the native operation in keyboard-navigable inspector with source basis',()=>{
    const lines=plainWorkflowDialogLines(layoutWorkflowDialog({task,progress,state:initialWorkflowDialogState(),width:80,now:2000,ascii:true}));
    expect(lines.join('\n')).toContain('Native lookup');
    expect(lines.join('\n')).toContain('basis-1');
  });
});
