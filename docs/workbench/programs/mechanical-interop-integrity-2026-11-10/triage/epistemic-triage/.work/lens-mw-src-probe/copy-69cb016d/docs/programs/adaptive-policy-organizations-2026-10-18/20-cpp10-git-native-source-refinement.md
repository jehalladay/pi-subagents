# 20 — CPP-10.21: One concrete native source, atomic Git ref publication and limits

Date: 2026-10-19. **Code and opt-in tests implemented; narrow source content guarantee only.** Complements [18 — temporal admission](18-cpp10-temporal-repair-admission.md) and [19 — source-to-model obligations](19-cpp10-refinement-proof-obligations.md). Formal proof in [research 24](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/24-cpp10-concrete-publication-refinement.md) and [research 25](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/25-cpp10-git-native-linearization.md).

## The actual source-specific implementation

The new [coordination bridge](../../../packages/coordination/src/temporal-publication.ts) integrates the existing `reconcile` with syntactic dependency/contract checks, worker-independent `publicationSemanticKey` and the `SourcePublicationPort`. The bridge does not issue or validate source receipts and does not execute effects.

The new [GitBlobPublicationSource](../../../apps/development-rig/src/git-source-publication.ts) in the opt-in development rig implements that port for a restricted actual authority: one local Git repository. The source revision is the OID of `refs/heads/main` (configurable). The only supported consumer scope is `git-blob-content-v1`: immutable blob bytes present in the tree of the named Git source commit, with separately recomputed SHA-256 of actual `git cat-file` bytes. **Every artifact's `dischargedEffectIds` must be empty.** This does not verify Forge gates, build semantics, signed authorship, source-native effects, or hidden dependencies outside the blob-content contract.

The source independently recomputes the canonical semantic key (excluding worker ID) and checks required ID coverage, closed DAG, native tree blob membership, blob type, exact source revision and hash. It creates an immutable manifest object with `git hash-object -w`, then publishes using **one native Git `update-ref --stdin` transaction** verifying the source ref while comparing/updating the publication ref. A rejected ref transaction leaves the visible publication ref unchanged. `readCurrent` checks source/publication refs before and after manifest reading; once the source revision advances, the previous manifest remains historical, not current.

The publication ref defaults to `refs/cpp10/publication`. This is deliberately a private namespaced ref in the selected local repository; tests run only on temporary Git directories and do not mutate the user's repositories. Use this adapter only with explicit caller-selected trusted local repositories and source refs. No new central workflow engine or automation is installed.

## Verified properties versus remaining external trust

**Real native Git condition (bounded):** Git object and ref operations are performed through installed `git`; the tested ref transaction supplies a linearization point *for this Git repository*. A successful publication says the manifest's blobs are members of the designated source commit tree and match their asserted raw bytes. The native Git object/ref backend is the external source authority for this narrow contract.

**External assumptions:** Git's reference locking/CAS semantics are trusted; writers must use the supported Git ref backend instead of bypassing locks, and the repository's access/identity boundary is trusted. This adapter does not verify cryptographic author signatures, Git server branch protection, alternate external source revisions, or whether a file is safe to execute. No effect-receipt authority transfers to MicroPolicyCLI or a coordination policy.

**Multi-source obstruction:** two separate Git repositories have no shared atomic ref transaction. Local CAS does not establish a coherent global all-current consumer snapshot. A future cross-source source-owned consistent-cut facility—or a weaker version-tagged historical consumer contract—is mandatory.

## Tests

[Pure source-port tests](../../../packages/coordination/test/temporal-publication.test.ts) use an in-memory source fixture to cover stale revision between read and commit, native receipt refusal, closed/cyclic dependencies, duplicate effect identity, policy authority refusal and worker replacement. Tests also assert that syntactically plausible forged strings remain untrusted until source admission.

[Real local Git tests](../../../apps/development-rig/test/git-source-publication.test.ts) initialize disposable Git repositories and exercise actual `ls-tree`, `cat-file`, `hash-object` and `update-ref --stdin`. The six controlled cases cover successful publication, induced concurrent source revision, rejected invented hash/blob/effects, duplicate-worker idempotence, current-read revocation, and a Git object present in the object database **but absent from the expected commit tree**.

**Actually executed locally in a reconstructed isolated test layout:** Node 22.16.0, TypeScript 5.8.3, Git 2.47.3; pure bridge **8/8** and native-Git adapter **6/6** standalone tests passed, with isolated strict TypeScript compilation passing. The local bridge used a copied resolver-equivalent and a test-only canonical digest stub; the actual repository-authored .test.ts files and fully assembled monorepo have **not** been run. Consequently these results are **not** a full production-source correctness verdict.

After a proper checkout with dependencies, run:
`npm run build --workspace @mechanical/workflows-coordination`
`npm run test --workspace @mechanical/workflows-coordination`
`npm run build --workspace @mechanical/development-rig`
`npm run test --workspace @mechanical/development-rig`

Do not label this a passed Forge, native build, or Lean proof until those separate gates run.

## Further source-to-code obligations

1. Show actual Git source/ref permissions and Git ref backend locking guarantees in the selected deployment.
2. Verify external writers cannot mutate `refs/cpp10/publication` bypassing the adapter or relax the trust contract accordingly.
3. Bind any future Forge result to its real native operation ID and exact Git source tree; independently query Forge, never synthesize receipts.
4. Introduce non-idempotent effects only with their real source-owned canonical identity and verified deduplication.
5. If multiple sources must publish jointly, prove a coherent native cut or declare a weaker historical/causally consistent observation contract.
6. Model crash after Git CAS but before client acknowledgement; on retry use source-native manifest/ref identity instead of replaying a new effect.
7. Revisit semantic scope before using this protocol to claim correctness of compiled build artifacts, workflows or complete dependency hypergraphs.

The code is the first source-backed restricted refinement exemplar, not a universal certificate authority.
