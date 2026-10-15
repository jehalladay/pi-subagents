/** Native Claude Agent SDK live acceptance probe; safe read-only, local workspace. */
import { createClaudeWorkflowHost } from '../../dist/workbench/claude-host.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';
const cwd=process.argv[2];
if(!cwd) throw Error('Pass absolute existing workspace directory.');
const events=[];
const host=createClaudeWorkflowHost({cwd,model:'claude-opus-5-5',tools:[],settingSources:[],permissionMode:'dontAsk',onMessage:msg=>events.push({type:msg.type,subtype:msg.subtype,session_id:msg.session_id})});
const schema={type:'object',properties:{answer:{type:'string'}},required:['answer'],additionalProperties:false};
const script=`export const meta={name:"sdk-live-smoke",description:"Live read-only SDK workflow"};\nconst result=await parallel([()=>agent("Return a JSON object whose answer is 'a'.",{schema:${JSON.stringify(schema)}}),()=>agent("Return a JSON object whose answer is 'b'.",{schema:${JSON.stringify(schema)}})]);\nreturn result;`;
const outcome=await runWorkflow({script,host,concurrency:2});
const ids=outcome.progress.filter(p=>p.type==='workflow_agent'&&p.sessionId).map(p=>p.sessionId);
console.log(JSON.stringify({status:outcome.status,value:outcome.value,error:outcome.error,sessionIds:[...new Set(ids)],sdkEventTypes:[...new Set(events.map(e=>e.type))],agents:outcome.agentCount}));
if(outcome.status!=='completed'||ids.length<2||!Array.isArray(outcome.value)||outcome.value.length!==2||outcome.value.some(x=>!x?.answer)) process.exitCode=1;
