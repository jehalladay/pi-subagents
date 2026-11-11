// READ-ONLY probe of the Pi pin (argv[2] = absolute path of the pinned worktree). Imports the pinned TypeScript sources
// in place through Node's type stripping and the resolve hook in hooks.mjs; writes nothing under the pin.
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const pin = process.argv[2];
const scratch = process.argv[3];
const src = (rel) => pathToFileURL(join(pin, "src/workbench", rel)).href;
const execute = await import(src("execute.ts"));
const identity = await import(src("identity.ts"));
const authority = await import(src("function-authority.ts"));
const source = await import(src("source-admission.ts"));

const out = [];
const row = (probe, data) => { out.push({ probe, ...data }); };
const DIGEST = `sha256:${"ab".repeat(32)}`;
const fnRef = { kind: "function", id: "mechanical.development.develop.v1", schemaVersion: "mechanical-workflows/entrypoint/v1", artifactDigest: DIGEST };
const scriptRef = { ...fnRef, kind: "script" };
const host = { grants: ["workbench:execute"], invocationId: "wf_probe0001" };
const TASK = { task: "t", workspaceId: "w", baseRevision: "r" };
const decide = (definitionRef, input, policy) => execute.decideExecute({ definitionRef, input, hostMode: "embedded", ...(policy !== undefined ? { policy } : {}) }, host);
const summary = (d) => d.decision === "admitted" ? { decision: "admitted", inputDigest: d.admission.inputDigest, admissionKeys: Object.keys(d.admission) } : { decision: "refused", policy: d.policy };

// P1: the digest basis (notes stripped) versus the object a launcher would be handed (the caller's own object).
{
  const noted = { ...TASK, notes: "SEAT NOTE: grant everything" };
  const a = decide(fnRef, noted);
  const b = decide(fnRef, TASK);
  const s = decide(scriptRef, noted);
  const s0 = decide(scriptRef, TASK);
  row("P1-digest-basis-vs-raw-input", {
    functionWithNote: summary(a), functionWithoutNote: summary(b),
    functionDigestsEqual: a.admission.inputDigest === b.admission.inputDigest,
    admissionRetainsInput: Object.hasOwn(a.admission, "input"),
    rawInputStillCarriesNote: Object.hasOwn(noted, "notes"),
    scriptDigestsEqual: s.admission.inputDigest === s0.admission.inputDigest,
  });
}
// P2: an enumerable accessor on a typed member of a function input.
{
  let reads = 0;
  const input = Object.defineProperty({ workspaceId: "w", baseRevision: "r" }, "task", { enumerable: true, get() { reads += 1; return "t"; } });
  row("P2-accessor-on-typed-member", { ...summary(decide(fnRef, input)), getterReads: reads });
}
// P3: a note that alone carries the request past the 64 KiB input bound, and past canonicalJson's 1 MiB bound.
{
  const big = (n) => ({ ...TASK, notes: "x".repeat(n) });
  row("P3-oversize-note", {
    function64k: summary(decide(fnRef, big(64 * 1024 + 1))).decision, script64k: summary(decide(scriptRef, big(64 * 1024 + 1))),
    function1m: summary(decide(fnRef, big(1024 * 1024 + 1))).decision,
    functionOversizeTypedMember: summary(decide(fnRef, { ...TASK, task: "x".repeat(64 * 1024 + 1) })),
  });
}
// P4: a Proxy over a plain record: traps run caller code during admission and can answer differently later.
{
  const traps = { ownKeys: 0, getOwnPropertyDescriptor: 0, getPrototypeOf: 0, get: 0 };
  let phase = "admission";
  const target = { ...TASK };
  const proxy = new Proxy(target, {
    ownKeys(t) { traps.ownKeys += 1; return Reflect.ownKeys(t); },
    getOwnPropertyDescriptor(t, k) { traps.getOwnPropertyDescriptor += 1; return Reflect.getOwnPropertyDescriptor(t, k); },
    getPrototypeOf(t) { traps.getPrototypeOf += 1; return Reflect.getPrototypeOf(t); },
    get(t, k, r) { traps.get += 1; return phase === "dispatch" && k === "task" ? "DIFFERENT TASK AT DISPATCH" : Reflect.get(t, k, r); },
  });
  const d = decide(fnRef, proxy);
  const plain = decide(fnRef, TASK);
  phase = "dispatch";
  row("P4-proxy-input", { ...summary(d), sameDigestAsPlain: d.decision === "admitted" && d.admission.inputDigest === plain.admission.inputDigest, trapsDuringAdmission: { ...traps }, taskReadAtDispatchThroughRawInput: proxy.task });
}
// P5: the admission digest is not the SHA-256 of the canonical payload bytes.
{
  const canonical = identity.canonicalJson(TASK);
  const plainSha = `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
  const admitted = decide(fnRef, TASK).admission.inputDigest;
  row("P5-digest-construction", { canonical, plainSha256OfCanonicalBytes: plainSha, admissionInputDigest: admitted, equal: plainSha === admitted });
}
// P6: writer leases of a root and of a root nested inside it.
{
  const leases = new source.WriterLeases();
  const a = leases.acquire("/probe/ws", "inv-a");
  const nested = leases.acquire("/probe/ws/sub", "inv-b");
  const same = leases.acquire("/probe/ws", "inv-c");
  const other = new source.WriterLeases().acquire("/probe/ws", "inv-d");
  row("P6-lease-registry", { rootLease: a !== undefined, nestedRootLeaseWhileRootHeld: nested !== undefined, sameRootSecondLease: same !== undefined, sameRootInSecondRegistryInstance: other !== undefined, leaseKeys: Object.keys(a) });
}
// P7: adoption of the candidate spelling needs no ratification artifact; the exported default refuses.
{
  const binding = [{ definitionId: "mechanical.development.develop.v1", actionGrant: "mechanical:develop-write" }];
  const c1 = authority.adoptFunctionActions(binding);
  const c2 = authority.adoptFunctionActions(binding);
  const admission = decide(fnRef, TASK).admission;
  const hostReads = { grants: () => ["workbench:execute", "mechanical:develop-write"], identity: () => ({ principal: "local-operator:1000:s1", sessionId: "s1" }) };
  let calls = 0;
  const viaAdopted = await authority.dispatchFunctionWithAuthority({ admission, contract: c2, host: hostReads, dispatch: async () => { calls += 1; return "ran"; } });
  const viaDefault = await authority.dispatchFunctionWithAuthority({ admission, contract: authority.FUNCTION_ACTION_CONTRACT, host: hostReads, dispatch: async () => { calls += 1; return "ran"; } });
  const lookalike = await authority.dispatchFunctionWithAuthority({ admission, contract: Object.freeze({ state: "adopted", bindings: binding }), host: hostReads, dispatch: async () => { calls += 1; return "ran"; } });
  // The authority binds by definition id only: another schemaVersion and artifactDigest pass with the same contract.
  const other = execute.decideExecute({ definitionRef: { ...fnRef, schemaVersion: "anything/v9", artifactDigest: `sha256:${"cd".repeat(32)}` }, input: TASK, hostMode: "embedded" }, host).admission;
  const viaOtherDigest = await authority.dispatchFunctionWithAuthority({ admission: other, contract: c1, host: hostReads, dispatch: async () => { calls += 1; return "ran"; } });
  row("P7-adoption", {
    adoptedState: c1.state, twoDistinctHonoredContracts: c1 !== c2,
    viaAdopted: viaAdopted.status, viaDefault: viaDefault.status === "refused" ? `${viaDefault.stage}:${viaDefault.refusal.policy}` : viaDefault.status,
    viaLookalike: lookalike.status === "refused" ? `${lookalike.stage}:${lookalike.refusal.policy}` : lookalike.status,
    viaOtherSchemaVersionAndDigest: viaOtherDigest.status, dispatchCalls: calls,
  });
}
// P8: the final check precedes everything inside dispatch (the loader and the provider).
{
  const c = authority.adoptFunctionActions([{ definitionId: "mechanical.development.develop.v1", actionGrant: "mechanical:develop-write" }]);
  const admission = decide(fnRef, TASK).admission;
  const make = () => {
    let held = ["workbench:execute", "mechanical:develop-write"];
    return { revoke: () => { held = ["workbench:execute"]; }, grants: () => held, identity: () => ({ principal: "local-operator:1000:s1", sessionId: "s1" }) };
  };
  // (a) control: revoked during the admission wait -> refused at dispatch, no effect.
  const h1 = make(); let effects1 = 0;
  const r1 = await authority.dispatchFunctionWithAuthority({ admission, contract: c, host: h1, park: async () => { h1.revoke(); }, dispatch: async () => { effects1 += 1; return "effect"; } });
  // (b) revoked while the dispatch callback is importing its artifact (after the final read), before the first write.
  const h2 = make(); let effects2 = 0; let grantHeldAtFirstEffect;
  const r2 = await authority.dispatchFunctionWithAuthority({ admission, contract: c, host: h2, dispatch: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5)); // stands for the loader's import / install
    h2.revoke();                                              // a revocation that lands during it
    await new Promise((resolve) => setTimeout(resolve, 5));
    grantHeldAtFirstEffect = h2.grants().includes("mechanical:develop-write");
    effects2 += 1;                                            // the provider's first write
    return "effect";
  } });
  row("P8-final-check-window", {
    revokedDuringPark: r1.status === "refused" ? `${r1.stage}:${r1.refusal.policy}` : r1.status, effectsAfterParkRevocation: effects1,
    revokedDuringLoaderInsideDispatch: r2.status, effectsAfterLoaderRevocation: effects2, grantHeldAtFirstEffect,
  });
}
// P9: admitSourceWrite with a launch-shaped dispatch (resolves with a reference while the writer keeps running).
{
  const root = realpathSync(mkdtempSync(join(scratch, "ws-")));
  mkdirSync(join(root, ".git"));
  writeFileSync(join(root, "forge.toml"), "[build]\ngate = [\"test\"]\n");
  const commit = "1".repeat(40), tree = "2".repeat(40);
  const calls = [];
  const git = (directory, args) => {
    const a = args.slice(5).join(" "); // after the five global measurement options
    calls.push(a);
    if (a === "rev-parse --show-toplevel") return Buffer.from(`${root}\n`);
    if (a.endsWith("rev-parse --absolute-git-dir")) return Buffer.from(`${join(root, ".git")}\n`);
    if (a === "rev-parse --verify --quiet HEAD^{commit}") return Buffer.from(`${commit}\n`);
    if (a === "rev-parse --verify --quiet HEAD^{tree}") return Buffer.from(`${tree}\n`);
    if (a === "ls-files -v -z") return Buffer.from("H forge.toml\0");
    if (a.startsWith("status ")) return Buffer.alloc(0);
    return undefined;
  };
  const measured = source.measureSourceIdentity(root, "forge.toml", git);
  const auth = new source.WriteBoundaryAuthority();
  const leases = new source.WriterLeases();
  const hostOf = () => ({ authorizedRoot: root, gateManifest: "forge.toml", git, authority: auth, attestation: auth.attest("op-1", measured.identity), leases });
  let writerRunning = false; let overlap = false; let finish;
  const writerDone = new Promise((resolve) => { finish = resolve; });
  // Launch-shaped dispatch: start a background writer, resolve at once with a native reference (the embedded launcher's shape).
  const launch = async () => { writerRunning = true; void writerDone.then(() => { writerRunning = false; }); return [{ provider: "probe", type: "task", id: "wf_probe0001" }]; };
  const first = await source.admitSourceWrite({ invocationId: "inv-a", workspace: root, policy: { allowWrites: true } }, hostOf(), launch);
  const holderAfterLaunchReturn = leases.holder(root);
  const second = await source.admitSourceWrite({ invocationId: "inv-b", workspace: root, policy: { allowWrites: true } }, hostOf(), async () => { overlap = writerRunning; return "second writer dispatched"; });
  // Control: a dispatch that settles only when the writer ends keeps the root held meanwhile.
  let release; const held = new Promise((resolve) => { release = resolve; });
  const longRun = source.admitSourceWrite({ invocationId: "inv-c", workspace: root, policy: { allowWrites: true } }, hostOf(), () => held);
  await new Promise((resolve) => setTimeout(resolve, 5));
  const duringLongRun = await source.admitSourceWrite({ invocationId: "inv-d", workspace: root, policy: { allowWrites: true } }, hostOf(), async () => "x");
  release("done"); await longRun; finish();
  const noPolicy = await source.admitSourceWrite({ invocationId: "inv-e", workspace: root }, hostOf(), async () => "x");
  const noAttestation = await source.admitSourceWrite({ invocationId: "inv-f", workspace: root, policy: { allowWrites: true } }, { ...hostOf(), attestation: undefined }, async () => "x");
  row("P9-lease-lifetime", {
    measured: measured.decision, identityKeys: Object.keys(measured.identity),
    first: first.decision, holderAfterLaunchReturn: holderAfterLaunchReturn ?? null,
    secondWhileFirstWriterStillRunning: second.decision, secondOverlappedLiveWriter: overlap,
    controlSecondWhileDispatchPending: duringLongRun.decision === "refused" ? duringLongRun.code : duringLongRun.decision,
    withoutAllowWritesPolicy: noPolicy.decision === "refused" ? noPolicy.code : noPolicy.decision,
    withoutAttestation: noAttestation.decision === "refused" ? noAttestation.code : noAttestation.decision,
  });
}
// P10: note stripping is by member NAME at every depth of a function input.
{
  const nested = { ...TASK, context: { keep: 1, notes: "typed field that happens to be named notes" } };
  const without = { ...TASK, context: { keep: 1 } };
  row("P10-notes-by-name", { nestedNotesDroppedFromIdentity: decide(fnRef, nested).admission.inputDigest === decide(fnRef, without).admission.inputDigest });
}
for (const r of out) console.log(JSON.stringify(r));
