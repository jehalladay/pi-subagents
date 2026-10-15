/** Real Claude SDK resume proof; no Pi session or fake provider. */
import { createClaudeWorkflowHost } from '../../dist/workbench/claude-host.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';
const cwd=process.argv[2];
if(!cwd) throw Error('Pass absolute existing cwd.');
const sessions=[];
const host=createClaudeWorkflowHost({cwd,model:'claude-opus-5-5',tools:[],settingSources:[],permissionMode:'dontAsk',onMessage:m=>{if(m.type==='result') sessions.push(m.session_id)}});
const script=`export const meta={name:"sdk-resume",description:"Native session continuation"};\nconst first=await agent("Remember the single token ZEPHYR. Reply only 'ready'.",{label:"memory"});\nconst second=await agent("Which token did I ask you to remember? Reply with it and nothing else.",{resume:"memory"});\nreturn {first,second};`;
const result=await runWorkflow({script,host});
console.log(JSON.stringify({status:result.status,value:result.value,sessionIds:sessions,error:result.error}));
if(result.status!=='completed'||sessions.length!==2||sessions[0]!==sessions[1]||!String(result.value?.second).includes('ZEPHYR')) process.exitCode=1;
