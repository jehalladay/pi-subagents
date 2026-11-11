import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { mkdtempSync,writeFileSync,existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const pin=process.argv[2], scratch=process.argv[3];
const mod=rel=>import(pathToFileURL(join(pin,'apps/development-rig/src',rel)).href);
const {reconcileUncertainEffect}=await mod('effect-reconciliation.ts');
const {validateHostBinding,isRepresentableGrant}=await mod('host-binding.ts');
const root=mkdtempSync(join(scratch,'git-'));
const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8',env:{...process.env,GIT_CONFIG_NOSYSTEM:'1'}});
git('init','-q'); writeFileSync(join(root,'.gitignore'),'ignored\n');writeFileSync(join(root,'file'),'base\n');git('add','.');git('-c','user.name=Probe','-c','user.email=probe@example.invalid','-c','core.hooksPath=/dev/null','commit','-qm','fixture');
const base=git('rev-parse','HEAD').trim();
const record={effect:'writer',worktree:root,gitRef:{baseCommit:base},forgeOperationId:null};
const sources={git:async(_root,...args)=>git(...args)};
for(const label of ['pristine','ignored-effect','edit-restored','untracked-effect']){
 if(label==='ignored-effect')writeFileSync(join(root,'ignored'),'effect persists\n');
 if(label==='edit-restored'){writeFileSync(join(root,'file'),'changed\n');writeFileSync(join(root,'file'),'base\n');}
 if(label==='untracked-effect')writeFileSync(join(root,'untracked'),'effect\n');
 console.log(JSON.stringify({probe:'M1-negative-evidence',label,ignoredEffectExists:existsSync(join(root,'ignored')),gitStatus:git('status','--porcelain=v1','--untracked-files=all'),...(await reconcileUncertainEffect(record,sources))}));
}
const b={contract:'mechanical.pi-host/v1',descriptorId:'mechanical.development.develop.v1',artifact:{package:'@mechanical/workflows-development',export:'develop',sha256:'sha256:'+'1'.repeat(64),descriptorSha256:'sha256:'+'2'.repeat(64)},source:{workspaceRealpath:'/nonexistent/probe',baseCommit:'3'.repeat(40),baseTree:'4'.repeat(40),forgeManifestSha256:'sha256:'+'5'.repeat(64)},invocationId:'probe',evidenceProfile:'git-census-v1',contextProfile:'plain-v1',intent:{task:'t',writer:'single',allowedEffects:['anything']}};
for(const [label,value] of [['plain',b],['symbol-extra',Object.assign({...b},{[Symbol('extra')]:1})],['inherited-fields',Object.create(b)],['sha256-git',{...b,source:{...b.source,baseCommit:'3'.repeat(64)}}]]){
 try {validateHostBinding(value); console.log(JSON.stringify({probe:'M2-binding-validation',label,accepted:true}));}catch(e){console.log(JSON.stringify({probe:'M2-binding-validation',label,accepted:false,code:e.code}));}
}
for(const token of ['mechanical:develop-write','org.fixture-fn:develop-write','claude:tool:Read'])console.log(JSON.stringify({probe:'M3-grant-grammar',token,mw:isRepresentableGrant(token),piAction:/^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/.test(token)}));
