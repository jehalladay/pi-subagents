import assert from 'node:assert/strict';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {initialInspectorState,layoutInspector,reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
const scope={workspace:'smoke',principal:'client'};
const projection=new ObservationProjection();
projection.refresh({source:{provider:'forge',type:'operation',id:'gate-1'},scope,capturedAt:'2026-10-15T00:00:00Z',observedAt:'2026-10-15T00:00:00Z',node:{title:'Real native snapshot',type:'sdk-operation',statusText:'FAIL',statusTone:'failure'},trace:{invocationId:'run-1'},coverage:'partial',evidenceRefs:['forge://gate-1']});
const model={projection,scope,invocationId:'run-1',title:'Client run',status:'failed'};
let state=initialInspectorState();
assert.match(layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n'),/Real native snapshot/);
for(const view of ['graph','timeline','details']) {state=reduceInspectorKey('\t',state,model).state;assert.equal(state.view,view);}
assert.match(layoutInspector(model,state,{width:80,rows:24,ascii:true}).join('\n'),/forge:\/\/gate-1/);
console.log('L1 compiled inspector four-view client: native projection, keyboard and evidence refs');
