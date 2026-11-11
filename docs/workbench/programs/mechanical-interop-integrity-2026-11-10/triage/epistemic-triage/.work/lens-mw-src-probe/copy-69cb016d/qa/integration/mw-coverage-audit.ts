import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root=join(dirname(fileURLToPath(import.meta.url)),"../..");
const qaRoot=join(dirname(fileURLToPath(import.meta.url)),"..");

const ledger=readFileSync(join(root,"docs/10-current-state-and-gaps.md"),"utf8");
const requirements=readFileSync(join(root,"docs/02-atomic-requirements.md"),"utf8");
test("native RF claim identifies its bounded witness and excludes full HX coverage",()=>{
 assert.match(ledger,/RF.*bounded full|full RF.*bounded/i);
 assert.match(ledger,/HX.*incomplete|HX.*partial/i);
 assert.match(requirements,/MW-019 BOUNDED LIVE WITNESSED/);
 assert.match(requirements,/MW-018 BOUNDED LIVE WITNESSED/);assert.match(requirements,/MW-018 [^\n]*upstream HyperUnix gap/);
});
test("Furnace and Forge Workspace Families remain separate unshipped authorities",()=>{
 assert.match(ledger,/Furnace SDK.*red|Furnace.*build.*red/i);
 assert.match(requirements,/MW-032 TARGET/);
 assert.match(requirements,/MW-054 LIVE WITNESSED/);assert.match(requirements,/MW-054 [^\n]*workspace families remain unshipped/);
});
test("witnessed repair chain binds rejection, approval and Forge PASS to distinct sessions and the same lineage",()=>{
 const evidence=(name:string)=>JSON.parse(readFileSync(join(qaRoot,"integration/evidence",name),"utf8"));
 const rejection=evidence("2026-10-15-repair-chain-rejection.json");
 const approval=evidence("2026-10-15-repair-chain-approval.json");
 const admission=evidence("2026-10-15-repair-chain-admission.json");
 assert.equal(rejection.verdict,"rejected");assert.equal(rejection.evidence.system,"claude-agent-sdk");
 assert.equal(approval.verdict,"approved");assert.equal(approval.evidence.kind,"review-session");
 assert.notEqual(rejection.evidence.id,approval.evidence.id,"approval must come from a separate review session");
 assert.notEqual(rejection.basis.revision,approval.basis.revision,"approval must be for the repaired commit, not the rejected one");
 assert.equal(rejection.basis.workspaceId,approval.basis.workspaceId);
 assert.deepEqual(admission.approval,approval);
 assert.equal(admission.verification.verdict,"passed");
 assert.equal(admission.verification.basis.revision,approval.basis.revision);
 assert.equal(admission.gate.basis.commit,approval.basis.revision);
 assert.equal(admission.gate.basis.clean,true);
 assert.match(admission.verification.evidence.id,/^op-[0-9a-f]{32}$/);
 assert.equal(admission.verification.evidence.id,admission.gate.operationId);
});
test("unattended repair journey chains three distinct sessions and one Forge PASS on the repaired lineage",()=>{
 const journey=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-unattended-repair-journey.json"),"utf8"));
 assert.equal(journey.stage,"repair");
 const {originalReview,repaired}=journey;
 assert.equal(originalReview.verdict,"rejected");
 assert.equal(repaired.kind,"repaired_candidate");
 assert.equal(repaired.candidate.parentBasis.revision,originalReview.basis.revision,"repair parent must be the rejected commit");
 assert.notEqual(repaired.candidate.basis.revision,originalReview.basis.revision);
 assert.equal(repaired.review.verdict,"approved");
 assert.equal(repaired.review.basis.revision,repaired.candidate.basis.revision,"approval must name the repaired commit");
 assert.equal(repaired.verification.verdict,"passed");
 assert.equal(repaired.verification.basis.revision,repaired.candidate.basis.revision);
 assert.match(repaired.verification.evidence.id,/^op-[0-9a-f]{32}$/);
 const sessions=new Set([originalReview.evidence.id,repaired.candidate.evidence.id,repaired.review.evidence.id]);
 assert.equal(sessions.size,3,"rejection, repair agent and approval must be distinct sessions");
 assert.equal(repaired.candidate.evidence.kind,"session");assert.equal(repaired.review.evidence.kind,"review-session");
});
test("live candidate selection planned two isolated candidates and gated only the chosen one at its own commit",()=>{
 const report=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-candidate-selection-journey.json"),"utf8"));
 const base=report.basis.revision;
 assert.equal(report.plan.candidates.length,2);assert.deepEqual(report.excluded,[]);
 const revisions=report.plan.candidates.map((c:{revision:string})=>c.revision);
 assert.equal(new Set(revisions).size,2);
 for(const c of report.plan.candidates as {revision:string;branch:string;worktree:string;evidence:{kind:string;id:string}}[]){assert.notEqual(c.revision,base);assert.match(c.branch,/^mw\/candidate\//);assert.equal(c.evidence.kind,"session");assert.notEqual(c.worktree,report.basis.workspaceId);}
 assert.ok(revisions.includes(report.choice.revision),"choice must be a planned candidate");
 assert.equal(report.choice.evidence.kind,"selection-session");
 const o=report.outcome;
 assert.equal(o.kind,"reviewed_candidate");
 assert.equal(o.candidate.basis.revision,report.choice.revision);assert.equal(o.candidate.parentBasis.revision,base);
 assert.equal(o.review.verdict,"approved");assert.equal(o.review.basis.revision,report.choice.revision);
 assert.equal(o.verification.verdict,"passed");assert.equal(o.verification.basis.revision,report.choice.revision);
 assert.match(o.verification.evidence.id,/^op-[0-9a-f]{32}$/);
 const sessions=new Set([...report.plan.candidates.map((c:{evidence:{id:string}})=>c.evidence.id),report.choice.evidence.id,o.review.evidence.id]);
 assert.equal(sessions.size,4,"two agents, the chooser and the reviewer must be distinct sessions");
});
test("the combined live composition with a real HX read stopped honestly before RF, agent and Forge",()=>{
 const witness=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-combined-live-composition.json"),"utf8")) as
  {base:string;hx:{liveMs:number;frames:number;completeness:string};outcome:{kind:string;reason?:string;scope:{basis:{revision:string};coverage:string;files:string[];evidence?:unknown}};stops:{render:number;implement:number;verify:number}};
 assert.equal(witness.outcome.kind,"needs_evidence");
 assert.equal(witness.outcome.reason,"SCOPE_INCOMPLETE");
 assert.equal(witness.outcome.scope.coverage,"partial");
 assert.equal(witness.outcome.scope.basis.revision,witness.base);
 assert.deepEqual(witness.outcome.scope.files,["src/mw_live_pkg/double.py"]);
 assert.equal(witness.outcome.scope.evidence,undefined,"no native query digest existed, so none may be invented");
 assert.deepEqual(witness.stops,{render:0,implement:0,verify:0});
 assert.notEqual(witness.hx.completeness,"complete");
 assert.ok(witness.hx.frames>0,"the native read returned frames");
});
test("fresh-clone typing recovery binds the no-SDK TS2307 at 79c1a22 to a no-SDK six-step PASS at its successor",()=>{
 const recovery=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-fresh-clone-typing-recovery.json"),"utf8")) as {red:{commit:string;typecheckQaExit:number;typescriptErrors:string[];forgeSdkPresent:boolean};green:{commit:string;typecheckQaExit:number;typescriptErrors:string[];forgeSdkPresent:boolean;forge:{verdict:string;operationId:string;steps:{name:string;status:string}[]}}};
 assert.equal(recovery.red.commit,"79c1a22");assert.equal(recovery.red.typecheckQaExit,2);assert.equal(recovery.red.forgeSdkPresent,false);
 assert.equal(recovery.red.typescriptErrors.length,1);assert.match(recovery.red.typescriptErrors[0]??"",/forge-gate-cancel\.ts.*TS2307.*@forge\/sdk/);
 assert.equal(recovery.green.typecheckQaExit,0);assert.deepEqual(recovery.green.typescriptErrors,[]);assert.equal(recovery.green.forgeSdkPresent,false);
 assert.notEqual(recovery.green.commit,recovery.red.commit);
 assert.equal(recovery.green.forge.verdict,"PASS");assert.match(recovery.green.forge.operationId,/^op-[0-9a-f]{32}$/);
 assert.deepEqual(recovery.green.forge.steps.map(s=>s.name),["structure","typing","test","python-consumer","evidence","docs"]);
 assert.ok(recovery.green.forge.steps.every(s=>s.status==="passed"));
 const packaging=readFileSync(join(root,"docs/12-packaging-and-operations.md"),"utf8");
 assert.match(packaging,/OPTIONAL_SDK_LITERAL_IMPORT/);assert.match(packaging,/npm install --no-save/);
});
test("Furnace process host: four real Runs keep PASS, FAIL, misconfiguration and development distinct in receipts Furnace never reads",()=>{
 interface Receipt{furnace:{runId:string;attemptId:string;workId:string};executorVerdict:string;exitCode:number;forge:{kind:string;operationId:string|null}|null;development:{outcome:string;stages:{verification:{state:string;ref?:{id:string}};agent:{ref?:{id:string}}}}|null;error?:string}
 interface Journey{name:string;runStatus:{data:{state:string;run_id:string}};attemptList:{data:{attempts:{attempt_id:string;outcome:string;exit_code:number}[]}};receipts:Receipt[]}
 const doc=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-furnace-process-host.json"),"utf8")) as {journeys:Journey[];classifierCorrection:{regressionCommit:string;witnessBeforeFix:{exitCode:number;receiptKind:string};witnessAfterFix:{exitCode:number;receiptKind:string;attempt:string}}};
 const byName=new Map(doc.journeys.map(j=>[j.name,j]));
 const pass=byName.get("gate-pass");const fail=byName.get("gate-fail-negative-control");const noforge=byName.get("gate-misconfigured-forge-binary");const develop=byName.get("develop-same-function-under-furnace");
 assert.ok(pass&&fail&&noforge&&develop,"all four journeys recorded");
 // The receipt that belongs to the Attempt Furnace lists last (a workspace may hold earlier Runs' receipts too).
 const last=(j:Journey)=>{const a=j.attemptList.data.attempts.at(-1);return j.receipts.find(r=>r.furnace.attemptId===a?.attempt_id)};
 assert.equal(pass.runStatus.data.state,"completed");assert.equal(last(pass)?.exitCode,0);assert.equal(last(pass)?.forge?.kind,"passed");assert.match(last(pass)?.forge?.operationId??"",/^op-[0-9a-f]{32}$/);
 assert.equal(fail.runStatus.data.state,"needs_attention");assert.equal(last(fail)?.exitCode,1);assert.equal(last(fail)?.forge?.kind,"failed");assert.match(last(fail)?.forge?.operationId??"",/^op-[0-9a-f]{32}$/);
 assert.equal(noforge.runStatus.data.state,"needs_attention");assert.equal(last(noforge)?.exitCode,70);assert.equal(last(noforge)?.forge,null);assert.match(last(noforge)?.error??"",/connection closed/);
 assert.equal(develop.runStatus.data.state,"completed");assert.equal(last(develop)?.exitCode,0);assert.equal(last(develop)?.development?.outcome,"verified_candidate");
 assert.equal(last(develop)?.development?.stages.verification.state,"established");assert.match(last(develop)?.development?.stages.verification.ref?.id??"",/^op-[0-9a-f]{32}$/);assert.ok(last(develop)?.development?.stages.agent.ref?.id);
 for(const j of doc.journeys){const r=last(j);const a=j.attemptList.data.attempts.at(-1);assert.ok(r&&a);assert.equal(r.furnace.attemptId,a.attempt_id,"receipt names the Attempt Furnace recorded");assert.equal(r.exitCode,a.exit_code,"receipt exit equals the exit Furnace read");assert.equal(a.outcome,r.exitCode===0?"success":"work_failure");assert.match(r.furnace.runId,/^frn-run-/);}
 const attempts=doc.journeys.flatMap(j=>j.receipts.map(r=>r.furnace.attemptId));assert.equal(new Set(attempts).size,attempts.length,"distinct Attempt ids");
 assert.equal(doc.classifierCorrection.witnessBeforeFix.receiptKind,"indeterminate");assert.equal(doc.classifierCorrection.witnessAfterFix.receiptKind,"failed");assert.equal(doc.classifierCorrection.witnessAfterFix.exitCode,1);
 const report=readFileSync(join(qaRoot,"integration/2026-10-15-furnace-process-host.md"),"utf8");assert.match(report,/Furnace reads exactly one bit/);assert.match(report,/2b55c44/);
});
test("the live-select CLI consumer planned two isolated candidates, chose one in-plan, reviewed and gated it, and left the main checkout untouched",()=>{
 interface Ref{system:string;kind:string;id:string}
 const doc=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-live-select-cli.json"),"utf8")) as {mode:string;invocation:{argv:string[];exitCode:number;mainCheckoutAfter:{dirty:number;candidateBranchesKept:number}};report:{basis:{revision:string};plan:{candidates:{revision:string;evidence:Ref}[]};excluded:unknown[];choice:{revision:string;evidence:Ref}|null;outcome:{kind:string;review?:{verdict:string;evidence?:Ref};verification?:{verdict:string;evidence?:Ref}}}};
 assert.equal(doc.mode,"live-select");assert.ok(doc.invocation.argv.includes("--live-select")&&doc.invocation.argv.includes("--allow-writes"));assert.equal(doc.invocation.exitCode,0);
 const r=doc.report;assert.equal(r.plan.candidates.length,2);assert.deepEqual(r.excluded,[]);
 const revisions=r.plan.candidates.map(c=>c.revision);assert.equal(new Set(revisions).size,2);assert.ok(revisions.every(x=>x!==r.basis.revision));
 const sessions=r.plan.candidates.map(c=>c.evidence.id);assert.equal(new Set(sessions).size,2);
 assert.ok(r.choice&&revisions.includes(r.choice.revision),"choice must be a planned revision");assert.ok(r.choice&&!sessions.includes(r.choice.evidence.id),"the chooser session is not a candidate agent session");
 assert.equal(r.outcome.kind,"reviewed_candidate");assert.equal(r.outcome.review?.verdict,"approved");assert.equal(r.outcome.verification?.verdict,"passed");
 assert.match(r.outcome.verification?.evidence?.id??"",/^op-[0-9a-f]{32}$/);assert.equal(r.outcome.verification?.evidence?.system,"forge");
 assert.equal(doc.invocation.mainCheckoutAfter.dirty,0);assert.equal(doc.invocation.mainCheckoutAfter.candidateBranchesKept,2);
 const report=readFileSync(join(qaRoot,"integration/2026-10-15-candidate-selection.md"),"utf8");assert.match(report,/--live-select --allow-writes/);
});
test("integration re-verification gated the chosen commit twice with distinct operations and left the base untouched",()=>{
 interface Ref{system:string;kind:string;id:string}
 const doc=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-live-select-integrate.json"),"utf8")) as {invocation:{argv:string[];exitCode:number;mainCheckoutAfter:{head:string;dirty:number}};report:{basis:{revision:string};plan:{candidates:{revision:string}[]};choice:{revision:string}|null;outcome:{kind:string;verification?:{evidence?:Ref}};integration:{basis:{revision:string};candidate:{revision:string};baseUnchanged:boolean;fastForward:boolean;verified:boolean;reverification:{verdict:string;evidence?:Ref}|null}|null}};
 assert.ok(doc.invocation.argv.includes("--integrate"));assert.equal(doc.invocation.exitCode,0);
 const r=doc.report;const i=r.integration;assert.ok(i,"integration recorded");
 assert.equal(r.outcome.kind,"reviewed_candidate");assert.equal(i.verified,true);assert.equal(i.baseUnchanged,true);assert.equal(i.fastForward,true);
 assert.equal(i.basis.revision,r.basis.revision);assert.ok(r.choice&&i.candidate.revision===r.choice.revision);assert.ok(r.plan.candidates.some(c=>c.revision===i.candidate.revision));
 assert.equal(i.reverification?.verdict,"passed");assert.match(i.reverification?.evidence?.id??"",/^op-[0-9a-f]{32}$/);
 assert.notEqual(i.reverification?.evidence?.id,r.outcome.verification?.evidence?.id,"two independent Forge operations");
 assert.ok(r.basis.revision.startsWith(doc.invocation.mainCheckoutAfter.head));assert.equal(doc.invocation.mainCheckoutAfter.dirty,0);
});
const program=readFileSync(join(root,"docs/09-implementation-program.md"),"utf8");
const furnaceParagraph=ledger.split("\n").find(l=>l.startsWith("**Furnace:**"))??"";
const wpJRow=program.split("\n").find(l=>l.includes("WP-J"))??"";
test("Furnace terminal wait is settled by D317 as a controller.live poll; only the replay-safe ensure stays an upstream target",()=>{
 assert.ok(furnaceParagraph.length>0,"docs/10 carries a Furnace paragraph");
 // The terminal wait is no longer an upstream target: D317 decided there is no wait verb.
 assert.doesNotMatch(furnaceParagraph,/convenience terminal `?wait`?[^.]*upstream target/i);
 assert.match(furnaceParagraph,/D317/);
 assert.match(furnaceParagraph,/docs\/decisions\/D317-a-wait-on-a-run-is-a-poll-keyed-on-controller-liveness-not-a-verb\.md/);
 assert.match(furnaceParagraph,/513a6881de9f23ac40bf0261de9f5472663044eb/);
 assert.match(furnaceParagraph,/controller\.live/);
 assert.match(furnaceParagraph,/inspection-logs\.md/);
 // The ensure half stays an upstream target with its pinned absence; it is never claimed shipped.
 assert.match(furnaceParagraph,/replay-safe logical Run `ensure`[^.]*upstream target/);
 assert.match(furnaceParagraph,/runs\.ensure[^.]*(no match|absent)/i);
 assert.doesNotMatch(furnaceParagraph,/ensure[^.]*(is shipped|has shipped|now ships)/i);
 // No MechanicalWorkflows waiter is claimed.
 assert.doesNotMatch(ledger,/MechanicalWorkflows[^.\n]*(ships|has|provides) (a|its own) (Run )?waiter/i);
});
test("WP-J row states the terminal wait is settled upstream by D317 and the open upstream half is the replay-safe ensure",()=>{
 assert.ok(wpJRow.length>0,"docs/09 carries a WP-J row");
 assert.match(wpJRow,/D317/);
 assert.match(wpJRow,/terminal wait[^|]*settled/i);
 assert.match(wpJRow,/replay-safe `?ensure`?/i);
 assert.doesNotMatch(wpJRow,/ensure`?\/reconcile and trustworthy terminal wait\/snapshot as justified/);
});
test("Furnace ExecutorApp host: three real Runs map PASS, FAIL and unknown to distinct ExecutionResult statuses, host exits and Attempt outcomes",()=>{
 interface Arm{subject:{head:string;dirtyAfterRun:string[]};directForgePrecheck:{status:string|null;gateVerdict:string|null};runStart:{exit:number};runStatus:{state:string;run_id:string};attempt:{attempt_id:string;outcome:string;exit_code:number;termination_cause:string};hostResultDocument:{document:{status:string;summary:string;failure_class?:string;data?:{operation_id:string;reason:string;basis:{commit:string;clean:boolean}}}|null};expected:{status:string;exit:number;furnaceOutcome:string;runState:string;runStartExit:number};observedMatchesExpected:boolean}
 const doc=JSON.parse(readFileSync(join(qaRoot,"integration/evidence","2026-10-15-furnace-executor-app-host.json"),"utf8")) as {producers:{furnace:{binaryRevision:string;driver:string};furnaceSdk:{sourceRevision:string;build:string;diagnostics:string[];notReleaseGrade:string};rig:{revision:string}};arms:Record<"pass"|"fail"|"unknown",Arm>;whatThisDoesNotEstablish:string[]};
 assert.equal(doc.producers.furnace.binaryRevision,"e2294c9f00b3");assert.match(doc.producers.furnace.driver,/process/);
 assert.match(doc.producers.furnaceSdk.sourceRevision,/^[0-9a-f]{12}$/);assert.equal(doc.producers.furnaceSdk.diagnostics.length,5,"the red test-only build is recorded, not hidden");
 assert.ok(doc.producers.furnaceSdk.diagnostics.every(d=>d.startsWith("test/")),"every diagnostic is in test/, so the emitted src is the clean half");assert.match(doc.producers.furnaceSdk.notReleaseGrade,/unreleased|red/);
 const arms=[doc.arms.pass,doc.arms.fail,doc.arms.unknown];
 for(const a of arms){assert.equal(a.observedMatchesExpected,true);assert.equal(a.attempt.outcome,a.expected.furnaceOutcome);assert.equal(a.attempt.exit_code,a.expected.exit);assert.equal(a.runStatus.state,a.expected.runState);assert.equal(a.attempt.termination_cause,"natural_exit");assert.match(a.runStatus.run_id,/^frn-run-/);assert.equal(a.hostResultDocument.document?.status,a.expected.status);}
 // Three distinct statuses, three distinct exits, three distinct Runs, three distinct subjects.
 assert.equal(new Set(arms.map(a=>a.hostResultDocument.document?.status)).size,3);assert.equal(new Set(arms.map(a=>a.attempt.exit_code)).size,3);assert.equal(new Set(arms.map(a=>a.runStatus.run_id)).size,3);assert.equal(new Set(arms.map(a=>a.subject.head)).size,3);
 assert.deepEqual(arms.map(a=>a.attempt.exit_code),[0,10,12]);assert.deepEqual(arms.map(a=>a.runStart.exit),[0,5,5]);
 // The PASS and FAIL documents carry the pinned basis and the native Forge operation; the unknown document names its operation only in text (SDK indeterminate has no data channel).
 const pass=doc.arms.pass.hostResultDocument.document;const fail=doc.arms.fail.hostResultDocument.document;const unknown=doc.arms.unknown.hostResultDocument.document;
 assert.equal(pass?.data?.reason,"FORGE_GATE_PASS");assert.match(pass?.data?.operation_id??"",/^op-[0-9a-f]{32}$/);assert.equal(pass?.data?.basis.commit,doc.arms.pass.subject.head);assert.equal(pass?.data?.basis.clean,true);
 assert.equal(fail?.data?.reason,"FORGE_GATE_FAIL");assert.equal(fail?.failure_class,"task");assert.match(fail?.data?.operation_id??"",/^op-[0-9a-f]{32}$/);assert.equal(fail?.data?.basis.commit,doc.arms.fail.subject.head);
 assert.equal(unknown?.data,undefined);assert.match(unknown?.summary??"",/WORKSPACE_NOT_CLEAN_AFTER_GATE operation=op-[0-9a-f]{32}/);
 assert.ok(doc.arms.unknown.subject.dirtyAfterRun.some(l=>l.includes("gate-side-effect.txt")),"the unknown arm's mechanism is the side effect the gate left behind");
 // The direct pre-checks agree with the hosted outcomes and are labelled as pre-checks, not as the witness.
 assert.equal(doc.arms.pass.directForgePrecheck.gateVerdict,"PASS");assert.equal(doc.arms.fail.directForgePrecheck.gateVerdict,"FAIL");assert.equal(doc.arms.unknown.directForgePrecheck.gateVerdict,"PASS");
 assert.ok(doc.whatThisDoesNotEstablish.some(x=>/extension driver/.test(x)));assert.ok(doc.whatThisDoesNotEstablish.some(x=>/release-grade/.test(x)));
 assert.match(requirements,/MW-062 LIVE WITNESSED 2026-10-15/);assert.match(requirements,/MW-062 [^\n]*indeterminate[^\n]*exit 12/);assert.match(requirements,/MW-063 [^\n]*installed public[^\n]*TARGET/);
 assert.doesNotMatch(ledger,/MW-062 extension host live evidence/);assert.match(ledger,/exit 12 \/ `work_failure`/);
 const report=readFileSync(join(qaRoot,"integration/2026-10-15-furnace-executor-app-host.md"),"utf8");assert.match(report,/extension driver was not available|extension driver.*absent/i);assert.match(report,/red/);
});
test("undated status lines no longer contradict the accepted WP-B, WP-E, WP-K and WP-N evidence, and keep the disclosures that stay true",()=>{
 // Retired: each phrase was contradicted by an accepted, cited journey.
 assert.doesNotMatch(ledger,/No automated code review\/repair\/merge yet\./);
 assert.doesNotMatch(ledger,/no remote worker artifact\/pin or deploy has been witnessed/i);
 assert.doesNotMatch(ledger,/RF rendered only a starter placeholder/);
 assert.doesNotMatch(ledger,/a Furnace-hosted gate succeeded after SDK build-output reconciliation/);
 const wpNRow=program.split("\n").find(l=>l.includes("WP-N"))??"";
 assert.ok(wpNRow.length>0,"docs/09 carries a WP-N row");
 assert.doesNotMatch(wpNRow,/blocked on Forge capability/i);
 // Survivors: each disclosure is still true and must not be weakened.
 assert.match(ledger,/no automated landing on a shared main/i);
 assert.match(ledger,/no remote deploy[^.\n]*witnessed/i);
 assert.match(ledger,/No fully integrated HX\/RF-backed development swarm is delivered/);
 assert.match(ledger,/Forge workspace families stay `DESIGN \/ NOT IMPLEMENTED`/);
});
test("docs/10 never says a requirement stays or remains TARGET when docs/02 tags it with another status",()=>{
 // ycq: the ledger prose must agree with the requirement ledger's own status tag.
 const tagOf=(id:string)=>{const line=requirements.split("\n").find(l=>l.startsWith(`- **${id} `));return line===undefined?undefined:/^- \*\*MW-\d+ ([^*]*?)\*\*/.exec(line)?.[1];};
 const contradictions=(prose:string)=>[...prose.matchAll(/\b(MW-\d{3}) (?:stays|remains|stay|remain) TARGET\b/g)].map(m=>m[1]??"").filter(id=>{const tag=tagOf(id);return tag!==undefined&&!/\bTARGET\b/.test(tag);}).map(id=>`${id} is tagged ${tagOf(id)} in docs/02`);
 assert.deepEqual(contradictions(ledger),[]);
 // Controls: the rule resolves the graduated tags and still catches the sentences it was written for.
 assert.match(tagOf("MW-056")??"",/MEASURED/);assert.match(tagOf("MW-028")??"",/LOCAL WITNESSED/);
 assert.equal(contradictions("MW-056 stays TARGET. MW-028 remains TARGET for a remote host.").length,2);
 assert.equal(contradictions("MW-032 remains TARGET.").length,0,"a requirement docs/02 still tags TARGET may keep the sentence");
});
// 0nq: a general docs/02-vs-docs/10 status rule. ycq and jlo each fixed one desync after the fact; this reads every claim.
const STATUS_TAGS=["BOUNDED LIVE WITNESSED","LOCAL CONSUMER WITNESSED","PARTIAL LIVE WITNESSED","LIVE WITNESSED","LOCAL WITNESSED","MEASURED","PARTIAL","CURRENT","TARGET"];
const TAG_ALT=STATUS_TAGS.join("|");
const STILL_TARGET_MARKER="Still TARGET, each with its named blocker on the line:";
const idsOf=(block:string)=>[...block.matchAll(/\d{3}/g)].map(m=>`MW-${m[0]}`);
const tagMatches=(claimed:string,actual:string|undefined)=>actual!==undefined&&(claimed===actual||actual.startsWith(`${claimed} `));
interface StatusAudit{tags:Map<string,string>;claims:{id:string;tag:string;source:string}[];stillTarget:string[];problems:string[];gradLines:number}
function auditStatusTags(req:string,led:string):StatusAudit{
 const problems:string[]=[];
 // docs/02: one `- **MW-NNN TAG [date]**` line per requirement.
 const tags=new Map<string,string>();
 for(const m of req.matchAll(/^- \*\*(MW-\d{3}) ([A-Z][A-Z ]*?)(?: \d{4}-\d{2}-\d{2})?\*\*/gm)){
  const id=m[1]??"";const tag=m[2]??"";
  if(tags.has(id))problems.push(`${id} carries two tag lines in docs/02`);
  if(!STATUS_TAGS.includes(tag))problems.push(`${id} carries unknown tag ${tag} in docs/02`);
  tags.set(id,tag);
 }
 for(const id of new Set(req.match(/\bMW-\d{3}\b/g)??[])){if(!tags.has(id))problems.push(`${id} appears in docs/02 without a leading tag line`);}
 // docs/10: graduation lists, the Still TARGET list, and status sentences.
 const claims:{id:string;tag:string;source:string}[]=[];const stillTarget:string[]=[];let gradLines=0;
 led.split("\n").forEach((line,i)=>{
  const src=`docs/10:${i+1}`;
  if(line.includes("Graduated with evidence pointers"))gradLines+=1;
  for(const m of line.matchAll(new RegExp(`(MW-\\d{3}(?:/\\d{3})*) \\((${TAG_ALT})(?=[,;)]| [a-z]| \`)`,"g")))for(const id of idsOf(m[1]??""))claims.push({id,tag:m[2]??"",source:`${src} list`});
  for(const m of line.matchAll(new RegExp(`\\b(MW-\\d{3}) is (${TAG_ALT})\\b`,"g")))claims.push({id:m[1]??"",tag:m[2]??"",source:`${src} is-sentence`});
  for(const m of line.matchAll(new RegExp(`\\((MW-\\d{3}) (${TAG_ALT})\\b`,"g")))claims.push({id:m[1]??"",tag:m[2]??"",source:`${src} parenthesis`});
  for(const m of line.matchAll(new RegExp(`\\b(MW-\\d{3}) (${TAG_ALT}) at\\b`,"g")))claims.push({id:m[1]??"",tag:m[2]??"",source:`${src} at-sentence`});
  for(const m of line.matchAll(/\b(MW-\d{3}) (?:stays|remains|stay|remain|is still|keeps) TARGET\b/g))claims.push({id:m[1]??"",tag:"TARGET",source:`${src} remains-sentence`});
  const at=line.indexOf(STILL_TARGET_MARKER);
  if(at>=0){
   // The ids before the first "the" are whole-requirement TARGETs; later ids name the open half of a requirement that is otherwise witnessed.
   const rest=line.slice(at+STILL_TARGET_MARKER.length);const cut=rest.search(/\bthe\b/);
   for(const m of (cut>=0?rest.slice(0,cut):rest).matchAll(/MW-\d{3}(?:\/\d{3})*/g))for(const id of idsOf(m[0])){stillTarget.push(id);claims.push({id,tag:"TARGET",source:`${src} still-target`});}
  }
 });
 for(const c of claims){if(!tags.has(c.id)){problems.push(`${c.source} claims ${c.id} ${c.tag}, an id docs/02 does not carry`);continue;}
  if(!tagMatches(c.tag,tags.get(c.id)))problems.push(`${c.source} claims ${c.id} ${c.tag} but docs/02 tags it ${tags.get(c.id)}`);}
 for(const [id,tag] of tags){if(tag==="TARGET"&&!stillTarget.includes(id))problems.push(`${id} is TARGET in docs/02 but missing from the docs/10 Still TARGET list`);}
 for(const id of stillTarget){if(tags.get(id)!=="TARGET")problems.push(`${id} sits in the docs/10 Still TARGET list but docs/02 tags it ${tags.get(id)}`);}
 return{tags,claims,stillTarget,problems,gradLines};
}
test("every requirement status docs/10 claims matches the tag docs/02 carries, and every docs/02 TARGET sits in the docs/10 Still TARGET list",t=>{
 const a=auditStatusTags(requirements,ledger);
 const census=new Map<string,number>();for(const tag of a.tags.values())census.set(tag,(census.get(tag)??0)+1);
 t.diagnostic(`docs/02 tags ${a.tags.size}: ${[...census].map(([k,v])=>`${k}=${v}`).join(", ")}; docs/10 claims ${a.claims.length} over ${new Set(a.claims.map(c=>c.id)).size} ids; Still TARGET ${a.stillTarget.join(",")}`);
 // The rule must have read something: a parser that silently matches nothing proves nothing.
 assert.ok(a.tags.size>=60,`docs/02 tag lines parsed: ${a.tags.size}`);
 assert.ok(a.gradLines>=1,"docs/10 carries its graduation paragraph");
 assert.ok(a.claims.length>=40,`docs/10 claims parsed: ${a.claims.length}`);
 assert.deepEqual(a.stillTarget.slice().sort(),[...a.tags].filter(([,tag])=>tag==="TARGET").map(([id])=>id).sort());
 assert.deepEqual(a.problems,[]);
});
test("the status rule fails closed on the desyncs ycq and jlo fixed after the fact, on a dropped TARGET, and on a docs/02 retag",()=>{
 const mutate=(text:string,from:string,to:string)=>{assert.ok(text.includes(from),`control anchor present: ${from}`);const out=text.replace(from,to);assert.notEqual(out,text);return out;};
 const base=auditStatusTags(requirements,ledger);assert.deepEqual(base.problems,[],"the committed docs pass before any mutation");
 // ycq shape: docs/10 still calls a graduated requirement TARGET.
 const ycq=auditStatusTags(requirements,mutate(ledger,"MW-031/032/033 (","MW-031/032/033/056 ("));
 assert.ok(ycq.problems.some(p=>/MW-056 TARGET but docs\/02 tags it MEASURED/.test(p)),ycq.problems.join("\n"));
 assert.ok(ycq.problems.some(p=>/MW-056 sits in the docs\/10 Still TARGET list/.test(p)),ycq.problems.join("\n"));
 // The same shape in prose.
 const prose=auditStatusTags(requirements,`${ledger}\nMW-028 remains TARGET for a remote host.\n`);
 assert.ok(prose.problems.some(p=>/MW-028 TARGET but docs\/02 tags it LOCAL WITNESSED/.test(p)),prose.problems.join("\n"));
 // A graduation list that names the wrong tag.
 const wrongTag=auditStatusTags(requirements,mutate(ledger,"MW-018 (BOUNDED LIVE WITNESSED)","MW-018 (LIVE WITNESSED)"));
 assert.ok(wrongTag.problems.some(p=>/MW-018 LIVE WITNESSED but docs\/02 tags it BOUNDED LIVE WITNESSED/.test(p)),wrongTag.problems.join("\n"));
 // Dropped TARGET: docs/02 still tags MW-032 TARGET, docs/10 forgot it.
 const dropped=auditStatusTags(requirements,mutate(ledger,"MW-031/032/033 (","MW-031/033 ("));
 assert.ok(dropped.problems.some(p=>/MW-032 is TARGET in docs\/02 but missing from the docs\/10 Still TARGET list/.test(p)),dropped.problems.join("\n"));
 // docs/02 side: a graduation edit that never reached docs/10.
 const retag=auditStatusTags(mutate(requirements,"- **MW-009 CURRENT","- **MW-009 LIVE WITNESSED"),ledger);
 assert.ok(retag.problems.some(p=>/MW-009 CURRENT but docs\/02 tags it LIVE WITNESSED/.test(p)),retag.problems.join("\n"));
 // docs/02 side: an id mentioned without its own tag line.
 const untagged=auditStatusTags(`${requirements}\nSee MW-999 for details.\n`,ledger);
 assert.ok(untagged.problems.some(p=>/MW-999 appears in docs\/02 without a leading tag line/.test(p)),untagged.problems.join("\n"));
 // Prefix handling is exact: PARTIAL names PARTIAL LIVE WITNESSED, LIVE WITNESSED does not name BOUNDED LIVE WITNESSED.
 assert.equal(tagMatches("PARTIAL","PARTIAL LIVE WITNESSED"),true);assert.equal(tagMatches("LIVE WITNESSED","BOUNDED LIVE WITNESSED"),false);assert.equal(tagMatches("LOCAL WITNESSED","LOCAL CONSUMER WITNESSED"),false);
});

// Diagnostic coverage ratchet: every diagnostic code literal the product can emit, bare ("CODE"), prefixed ("CODE: detail")
// or in a template literal (`CODE: ${x}`), must be pinned by a test.
import { readdirSync } from "node:fs";
import { sep } from "node:path";
const CODE_LITERAL=/["'`]([A-Z][A-Z0-9]+(?:_[A-Z0-9]+)+)(?=["'`:])/g;
const SOURCE_DIRS=["packages/development/src","packages/coordination/src","apps/development-rig/src"];
const TEST_DIRS=["packages/development/test","packages/coordination/test","apps/development-rig/test","qa"];
const AUDIT_FILE=fileURLToPath(import.meta.url);
/** Names read from process.env that share the code shape; configuration, never diagnostics. */
const ENVIRONMENT_NAMES=new Set(["BEADS_ACTOR","GIT_AUTHOR_NAME"]);
/**
 * Fail-closed guards that no test can reach through the public surface. Each row says why it is
 * unreachable; the row must leave when the literal leaves src or when a test pins it.
 */
const DEFENSIVE_GUARDS:ReadonlyMap<string,string>=new Map([
  ["SELECTION_CANDIDATE_UNKNOWN","candidate-selection.ts worktreeOf: reviewCandidate admits only planned revisions and plan.candidates derive one-to-one from planned, so no reviewed or verified revision can be missing"],
  ["ENTRYPOINT_INSTALLED_PACKAGE_MISMATCH","installed-host.ts: npm installs the digest-checked tarball under the name in its own package.json, so the manifest at node_modules/@mechanical/workflows-development can name another package only if npm or the filesystem misbehaves"],
  ["MIGRATION_STEPS_UNORDERED","migration-procedure.ts runMigrationProcedure: the transcript is pushed by the procedure itself in MIGRATION_STEPS order (stop-or-drain, snapshot, validate, commit-alias-cas, resume) and validateMigrationOrder re-reads that same transcript, so the self-witness can refuse only if the procedure's own push order is edited; the happy-path test pins that order"],
]);
function tsFilesUnder(dir:string):string[]{
  return readdirSync(dir,{recursive:true,withFileTypes:true})
    .filter(entry=>entry.isFile()&&entry.name.endsWith(".ts")&&!entry.name.endsWith(".d.ts"))
    .map(entry=>join(entry.parentPath,entry.name))
    .filter(path=>!path.includes(`${sep}node_modules${sep}`)&&!path.includes(`${sep}dist${sep}`)&&path!==AUDIT_FILE);
}
/** Every code-shaped double-quoted literal in the given sources. */
export function codeLiterals(sources:ReadonlyArray<string>):Set<string>{
  const codes=new Set<string>();
  for(const source of sources) for(const match of source.matchAll(CODE_LITERAL)){const code=match[1];if(code!==undefined)codes.add(code);}
  return codes;
}
/** Codes that appear as literals in the sources and nowhere in the test corpus (the audit file excluded, so its own registries cannot pin anything). */
export function unpinnedDiagnosticCodes(sources:ReadonlyArray<string>,tests:ReadonlyArray<string>):string[]{
  const corpus=tests.join("\n");
  return [...codeLiterals(sources)].filter(code=>!corpus.includes(code)).sort();
}
const sourceTexts=()=>SOURCE_DIRS.flatMap(dir=>tsFilesUnder(join(root,dir))).map(file=>readFileSync(file,"utf8"));
const testTexts=()=>TEST_DIRS.flatMap(dir=>tsFilesUnder(join(root,dir))).map(file=>readFileSync(file,"utf8"));
test("diagnostic coverage ratchet: every src diagnostic code literal is pinned by a test or registered as a construction-level guard with its justification; nothing else ships unpinned",()=>{
  const sources=sourceTexts();
  const unpinned=unpinnedDiagnosticCodes(sources,testTexts());
  const fresh=unpinned.filter(code=>!ENVIRONMENT_NAMES.has(code)&&!DEFENSIVE_GUARDS.has(code));
  assert.deepEqual(fresh,[],`diagnostic codes shipped without a test (pin them, or register a construction-level guard with its justification): ${fresh.join(", ")}`);
  const literals=codeLiterals(sources);
  for(const [guard,why] of DEFENSIVE_GUARDS){
    assert.ok(literals.has(guard),`registered guard ${guard} no longer exists in src; delete its row (${why})`);
    assert.ok(unpinned.includes(guard),`registered guard ${guard} is now pinned by a test; delete its row`);
    assert.ok(why.trim().length>40,`guard ${guard} needs a justification`);
    assert.ok(!ENVIRONMENT_NAMES.has(guard),`${guard} is listed as both a guard and an environment name`);
  }
});
test("the ratchet fails closed on bare, prefixed and template-literal synthetic codes, exposes a stale guard row, ignores non-code literals and stays silent on a pinned code",()=>{
  const tests=testTexts();
  assert.deepEqual(unpinnedDiagnosticCodes(['throw new Error("RATCHET_SYNTHETIC_CODE")'],tests),["RATCHET_SYNTHETIC_CODE"]);
  assert.deepEqual(unpinnedDiagnosticCodes(['return { reason: "FORGE_GATE_NOT_ESTABLISHED" };'],tests),[]);
  assert.deepEqual(unpinnedDiagnosticCodes(['const a = "lower_case"; const b = "NOUNDERSCORE"; const c = "Mixed_Case";'],tests),[]);
  assert.deepEqual(unpinnedDiagnosticCodes([],tests),[]);
  // Prefixed and template-literal forms count as codes; a prose-looking or lower-case prefix does not.
  assert.deepEqual(unpinnedDiagnosticCodes(['throw new Error("RATCHET_PREFIXED_CODE: detail " + x)'],tests),["RATCHET_PREFIXED_CODE"]);
  assert.deepEqual(unpinnedDiagnosticCodes(["throw new Error(`RATCHET_TEMPLATE_CODE: ${x}`)"],tests),["RATCHET_TEMPLATE_CODE"]);
  assert.deepEqual(unpinnedDiagnosticCodes(["const m = `RATCHET_TEMPLATE_BARE`;"],tests),["RATCHET_TEMPLATE_BARE"]);
  assert.deepEqual(unpinnedDiagnosticCodes(['const s = "Not_A_Code: x"; const t = "SHOUTING WORDS: y";'],tests),[]);
  assert.deepEqual([...codeLiterals(['"AB_C" "AB_C" "CD_E" "A_B"'])].sort(),["AB_C","CD_E"]); // a single leading letter is not a code
  // A registry row for a literal no source carries would fail the live test's existence check.
  assert.equal(codeLiterals(sourceTexts()).has("RATCHET_SYNTHETIC_CODE"),false);
});
/** The guard sentence of the diagnostic coverage ratchet section in docs/10: its counting word and parenthesised backticked codes. */
export function ratchetGuardClaim(doc:string):{count:number;codes:string[]}{
  const start=doc.indexOf("## 2026-10-15 diagnostic coverage ratchet");
  assert.ok(start>=0,"docs/10 lost the diagnostic coverage ratchet section");
  const next=doc.indexOf("\n## ",start+1);
  const section=doc.slice(start,next<0?undefined:next);
  const match=/\b(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|No|Zero) construction-level guards? (?:is|are) registered[^(\n]*\(([^)]*)\)/.exec(section);
  assert.ok(match,"docs/10 ratchet section has no guard sentence of the form 'N construction-level guards are registered ... (`CODE`, ...)'");
  const words=["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
  const word=(match[1]??"").toLowerCase();
  const count=word==="no"?0:words.indexOf(word);
  return {count,codes:[...(match[2]??"").matchAll(/`([A-Z][A-Z0-9_]+)`/g)].map(m=>m[1]??"").sort()};
}
test("docs/10 ratchet guard sentence names exactly the DEFENSIVE_GUARDS registry keys and counts them",()=>{
  const claim=ratchetGuardClaim(ledger);
  assert.deepEqual(claim.codes,[...DEFENSIVE_GUARDS.keys()].sort(),"docs/10 guard list drifted from the registry in qa/integration/mw-coverage-audit.ts");
  assert.equal(claim.count,DEFENSIVE_GUARDS.size,"docs/10 counting word drifted from the registry size");
  // The parser itself: a drifted sentence is detected, a faithful one is read back.
  assert.deepEqual(ratchetGuardClaim("## 2026-10-15 diagnostic coverage ratchet\n\nThree construction-level guards are registered with a justification each (`B_ONE`, `A_TWO`, `C_THREE`); more.\n\n## next\n"),{count:3,codes:["A_TWO","B_ONE","C_THREE"]});
  assert.deepEqual(ratchetGuardClaim("## 2026-10-15 diagnostic coverage ratchet\n\nOne construction-level guard is registered with a justification (`ONLY_ONE`).\n"),{count:1,codes:["ONLY_ONE"]});
  assert.throws(()=>ratchetGuardClaim("## 2026-10-15 diagnostic coverage ratchet\n\nNo guard sentence here.\n"),/no guard sentence/);
  assert.throws(()=>ratchetGuardClaim("# other\n"),/lost the diagnostic coverage ratchet section/);
  // The section ends at the next "## " heading: a guard sentence in a LATER section must not satisfy the ratchet section.
  assert.throws(()=>ratchetGuardClaim("## 2026-10-15 diagnostic coverage ratchet\n\nNo guard sentence here.\n\n## later\n\nTwo construction-level guards are registered (`A_ONE`, `B_TWO`).\n"),/no guard sentence/);
  // The counting word "No" reads as zero guards with an empty list.
  assert.deepEqual(ratchetGuardClaim("## 2026-10-15 diagnostic coverage ratchet\n\nNo construction-level guards are registered ().\n"),{count:0,codes:[]});
});
