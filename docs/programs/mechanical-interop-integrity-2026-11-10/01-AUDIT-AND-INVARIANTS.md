# 01 — Pi source audit, current truths, invariants and defect ledger
**Evidence:** read-only source and tests at Pi 0fb90672; original deep-audit candidate references are hypotheses until a red test exercises them. No tests were executed for this design commit.

## A. Source-grounded ledger
| ID | Current source | Finding and proposed decision | Ownership |
| --- | --- | --- | --- |
| PI-I01 / D3 | src/workbench/execute.ts; execute-tool.ts; identity.ts | Function admission digests withoutBeadsNotes(input), but the script-style launcher structure reads original params.input. A new function route MUST dispatch exactly the admitted canonical input. No current function launch occurs. | Pi P01 |
| PI-I02 / D5 | src/workbench/source-admission.ts WriterLeases and admitSourceWrite | An in-memory lease is released when the dispatch promise resolves. A detached or asynchronous launch may return before the writer terminates; move ownership to persistent invocation lifetime. | Pi P02/P03 |
| PI-I03 / D6 | src/workbench/execute-tool.ts; src/index.ts | Registered tool supports script only; function authority, descriptor/source guards and Mechanical host are not transitively wired. | Pi P04/P05 |
| PI-I04 / D9 | source-admission.ts; function-authority.ts | Independent rechecks are individually valuable but do not form one atomic policy across async waits; revalidate all mutable facts at final effect boundary. | Pi P03 |
| PI-I05 | function-authority.ts | Adopted function grant is absent from production export (FUNCTION_ACTION_CONTRACT = unadopted / MW-CONTRACT). Candidate mechanical:develop-write requires joint explicit acceptance. | Pi P00/P03 |
| PI-I06 | src/workbench/observation.ts; tool handlers | Bounded scoped native observation exists, but Mechanical logical invocation -> producer refs, evidence and separate effect disposition are not connected. | Pi P06 |
| PI-I07 | src/workbench/hosts/local-detached.ts; worktree.ts | Existing detached script integrity and preserve-on-failure safeguards must remain; Mechanical function must not masquerade as script execution. | Pi P08/P09 |
| PI-I08 | docs/workbench/feature-matrix.md; .agents/skills/pi-mechanical-interop | W11 historical state remains not-shipped; agent playbooks must not infer shipment from this program. | Pi P10 |

## B. Invariants — none may be weakened to close W11
**I1 Immutable bytes:** The exact reviewed definition ID, schema, descriptor digest, tarball digest, runtime file manifest digest and validated input bytes identify execution. Any post-admission mutation refuses or remains uncertain; filenames alone authorize nothing.
**I2 Host-only authority:** Principal, session, permissions, authorized roots, lease token, source basis, chosen evidence/context profiles and effect budget come from trusted host state, not tool JSON, Beads notes or annotations.
**I3 Input identity:** Function inputDigest is computed over the same typed canonical JSON that reaches Mechanical; stripped Beads note text is neither hashed nor dispatched nor used for replay/admission. Reject unrepresentable, accessor/cyclic/budget-exceeding forms. Never silently widen a caller policy.
**I4 Final-boundary discipline:** Before effect dispatch, re-read effective principal/session/grants, re-measure authorized root/Git HEAD/tree/status/Forge manifest and assert resource/lease ownership. Validate already-verified immutable artifacts against the runtime manifest.
**I5 Exclusive ownership:** A lease cannot be released on "launched". Ownership lasts until a native terminal with safe settlement, or remains fenced in uncertain/recovering state. A second host/process sees the same authoritative lease.
**I6 Distinct statements:** accepted/launched != completed; Mechanical verified_candidate is a domain claim requiring validated native evidence, not merely an SDK response or Forge transport success; observed status does not grant control.
**I7 Unknown is not failure:** Lost acknowledgment, cancellation after effects, killed worker, stale source or missing native evidence produce explicit uncertainty, retained native refs and zero blind replay.
**I8 Least privilege and containment:** First release permits only reviewed mechanical.development.develop.v1 with exact mechanical:develop-write; do not dynamically import arbitrary package exports or pass the host's full ambient permissions.
**I9 Provider ownership:** Mechanical owns develop() semantics and provider-native ids/evidence. Pi owns runtime, scope, scheduling, observation projection and control. Furnace optionally owns separate durable Run/Attempt, never implicitly.
**I10 Historical correctness:** Existing direct Mechanical L2, older native L3 and Pi script tests remain separate; only an actual registered Pi invocation proves V3/V4. No invented receipts or gate passes.

## C. Corrected findings and non-goals
Do NOT claim Mechanical lacks a rig host export: @mechanical/development-rig/host already exists. Do NOT reopen the earlier schema-filename fix or source worktree preservation fix without fresh failing evidence. Do NOT conflate an independently installed Node consumer named pi-consumer with actual Pi tool execution. No generic function registry, no sandbox claim from SDK prompt/tool filters, no required HX semantic completeness or RF committed rendering, no Forge↔Furnace requirement, no GitHub CI.

## D. Critical counterexample shapes
- Canonical note: input { task:"X", notes:"untrusted" } admitted as { task:"X" } yet passed through unchanged to a naive launcher. Assert exact canonical bytes at the Mechanical callback.
- Early lease release: launch returns native handle while worker is paused at first edit; a second invocation must remain blocked.
- Split guard: principal unchanged when function authority checks; source changes before artifact import; grant revoked after installation but before first writer effect. All must refuse *before effect dispatch*.
- Post-dispatch loss: producer might have edited, committed or dispatched Forge but acknowledgment is dropped; Pi must retain journal and fence, never retry by default.
- Green without native evidence: Mechanical may report a legacy PASS frame lacking native gate/tree/environment bindings; Pi must preserve the weak observation without upgrading it to strict verified status.

## E. Compatibility boundary
Define v1 around source hashes and validated artifact bytes; changing a schema requires a versioned validator and explicit refusal for unknown versions. Do not upgrade existing script envelopes or observer scopes silently. Maintain the Pi model-facing tool-reply/v1 envelope and the explicit "completion:not-asserted" launch semantics. Expose the producer's actual domain result later through workflow_observe.
