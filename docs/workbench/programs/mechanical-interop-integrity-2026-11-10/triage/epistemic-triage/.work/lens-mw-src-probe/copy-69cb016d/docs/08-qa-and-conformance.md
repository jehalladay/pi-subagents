# 08 — QA, conformance and adversarial tests

## Evidence levels

- **L0 source/schema**: manifests parse; paths exist; package/build dependency fence holds.
- **L1 pure unit**: `develop` uses injected fakes for exact call ordering, coverage, basis and outcome classification. Shipped now.
- **L2 installed consumer**: package installs from a built artifact in an empty external directory; no source imports. Target.
- **L3 real SDK integration**: public Forge/HX/RF/agent SDKs execute actual operations with captured product refs and signed or digest-bound evidence as available. Target.
- **L4 Furnace host**: the same workflow function runs in a genuine Furnace executor; Run/Work/Attempt and protocol results verified. Target.
- **L5 adversarial distributed**: lost dispatch/response, process death, idempotent establishment (once native), stale basis, cancellation, nested capacity and remote materialization. Target.

**The native Forge adapter passed a real installed gate and the Furnace callback ran within an actual Run/Attempt after a local SDK build-output reconciliation.** The installed Furnace SDK source still fails its build, and the broader integration hierarchy remains incomplete. Never count L1 as proof of L3-L5. A fake response shaped like PASS is not Forge PASS.

## Executable baseline

```sh
npm install
npm test
npm run fixture -- --task "Fix parser" --workspace demo --revision base
forge workspace lock
forge build
```

The root Forge gate covers structure, compilation/type checking, tests and documentation. The two member manifests supply their own build and test commands. A missing Node/compiler/dependency must fail, not be smoothed into a green. No GitHub CI.

### Shipped unit negative controls

- Empty task refuses before any callback.
- Partial scope does not compile context, implement or verify.
- Context basis mismatch prevents implementation.
- Candidate verification against old rather than changed basis is indeterminate.
- Explicit failed gate does not become success.
- Unknown/partial/unsupported PASS without evidence does not become verified.
- Local CLI refuses without `--fixture`; fixture output has `mode: fixture` and `evidenceAuthority: none`.

## Contract testing of adapters (target)

Use producer SDK's existing canonical fixture/conformance corpus rather than hand-writing a simplified lookalike. Test positive and negative cases: partial, unknown, refused, transport failure, stream truncation, no terminal, cancellation acknowledged/not terminal, incomplete source basis, and unknown capability. Preserve stable codes and references, not just prose summaries.

### Forge consumer contract

Verify a real gate result's native verdict axes and source basis. A build invocation reaching terminal transport success does not imply gate PASS. Cached/replayed steps do not themselves imply fresh verification. An incompatible shared-cache object cannot authorize PASS.

### HX consumer contract

Incomplete or budget-exhausted query must not become known-empty. Verify query digest and subject basis; under streaming, event gaps must remain explicit.

### RF consumer contract

End-to-end render record and content, model capability/budget, source digests and error codes required. Incomplete render service cannot masquerade as completed compilation.

### Furnace consumer contract

Executor result mapping is domain specific and does not confuse failure classes. Test controller loss, Run status observation, missing result, no blind start retry and (future) exactly one logical Run under concurrent native ensure.

## Adversarial matrix

| Injected fault | Required observation |
| --- | --- |
| Input malformed | Refuse before effect |
| Context basis stale | Refuse implementation |
| Scope coverage partial | No silent complete selection |
| Forge gate partial | No verified candidate |
| Evidence ref missing | No verified candidate |
| Agent died after edits | Reconcile workspace before rerun |
| Child Run establish timed out | Reconcile/indeterminate, no blind duplicate |
| Same logical key, changed spec | Native conflict when ensure exists |
| Parent died while child runs | Child existence not inferred false |
| Wait deadline expired | Caller stops waiting, operation not automatically stopped |
| Parent cancelled, child shared | Child policy/authority controls cancellation |
| Four parents block all four executor seats | No unsupported claim that JS await frees seats |
| Different program artifact on retry | Host compatibility refusal |
| Different candidate materialization | Verification not credited to requested basis |
| Standalone worker without Library | Starts from built artifact or fails for unrelated defined reason |

## Performance measurements

Capture monotonic wall time, stage intervals with overlap flags, process launches, client initialization, artifact transfer bytes, query calls/coverage, Forge reuse/selection evidence, Furnace wait/poll counts, agent tokens as reported by provider, and code-line classification of application logic versus lifecycle/glue. Do not add overlapping durations into a fake whole.

Run comparable cold/warm tests with pinned source/inputs. Mark missing measurements as unknown, not zero. Publish integration friction findings into product-specific upstream issues/docs with reproducer, SDK version, and measured impact.

## Negative controls for the QA tools

- Remove a required workspace member declaration, insert only a comment claiming the member, register the root as a member, or turn a member test into `echo PASS`: structure gate fails. Shell-level negative controls run through the root `test` step (`scripts/check-structure.test.ts`).
- Break a relative docs link in `contracts/` or make a QA page empty: docs gate fails. Shell-level negative controls run through the root `test` step (`scripts/check-docs.test.ts`).
- Inject a partial scope: unit test demonstrates implement not called.
- Drop verification evidence: unit test becomes indeterminate.
- Stub a real provider through fixture in non-fixture mode: CLI refuses.

No conformance test may accept an empty test collection or a pure echo command as proof of product integration.
