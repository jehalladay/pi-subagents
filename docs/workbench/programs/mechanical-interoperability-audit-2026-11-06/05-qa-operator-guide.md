# 05 — QA, operational recovery, skill and docs closure

## Test levels

L0 source audit; L1 isolated fixture/mutants; L2 actual independent packed-artifact install; L3 producer-native API session/operation with exact version and source; L4 registered Pi `workflow_execute` function launch observed through Pi and joined to Mechanical outcome and native Forge; L5 detached/Furnace restart and multi-invocation load. **Do not promote one level's witness into the next.**

## Adversarial cases required before release

| Surface | Positive and falsifier |
|---|---|
| Worktree | Clean commit preserved; injected commit/branch failure after tracked+untracked edits leaves bytes and truthful recovery path, never false-clean |
| Authorizations | Registered exact grant admits; missing execute/action/detach/Claude-tool grant, changed workspace and forged principal start no effects |
| Descriptor/artifact | Actual committed JSON and SHA tarball install; wrong digest/schema/package/export/traversal refuses before import |
| Agent startup | Park async `beforeDispatch`, per-agent skip/retry, release; zero unauthorized late query; preserve workflow-wide abort |
| Mechanical cancel | Stop before dispatch, during edit, after commit, after Forge dispatch; keep dirty/candidate/native refs and honest unknown |
| Source/replay | Different commit/tree, changed skill/prompt, gate manifest, tools/model/provider versions invalidates old replay |
| Outcomes | Four Mechanical arms retained separately from transport, process, native Forge and Furnace; fake PASS cannot verify |
| Forge | True operation ID + matching commit/tree and required selection; transport exit 0, partial gate, native FAIL and unknown are independent |
| HX/RF | HX best-effort exit 0 still incomplete, GitView binding failure, missing query digest/absence license, RF preview null render-id or stale budget: no certified writer |
| Effect/retry | Lose native reply after dispatch, restart, reattach; no second write/claim/gate without reconciliation |
| Policy | Pure coordinator proposal cannot start Furnace, claim Beads or publish Forge result |
| Load | Zero/negative caps refused; multiple workflows share bounded host budget; queue cancellation and loss counters measured |

## First live acceptance journey

1. Pin exact Pi/Mechanical heads, installed SDK/CLI releases, Git base commit/tree, tarball and gate manifest digests, effective skill/prompt/tool/model/provider settings.
2. Install and validate committed Mechanical descriptor and exact tarball in a clean isolated checkout. Admit the actual Pi tool call using host-bound principal/grants; do not call the rig directly as a substitute.
3. Execute Git-tracked-file census and plain context; require one actual Claude Agent SDK session that commits a changed clean candidate. Native Forge verifies the exact candidate/selection and returns an operation ID and verdict.
4. Call Pi `workflow_observe` / inspector for invocation ID, four-arm domain result, verification, freshness and native refs. Include negative grant, wrong SHA, dirty source, failed gate, aborted/late SDK and lost acknowledgment.
5. Capture one receipt with versions, commands, exact source/artefact/manifest IDs, native session/Forge refs and result, all negative controls, unresolved gaps and test completion. No fabricated Beads or native operation IDs.

## Documentation requirements, not optional

Every implementation cut updates the Pi skill `.agents/skills/pi-mechanical-interop/SKILL.md`, [operator guide](../../mechanical-function-hosting.md), `docs/workbench/README.md`, `docs/workbench/07-native-integrations.md`, `docs/workbench/08-lifecycle-and-recovery.md`, tool/CLI docs and measured W11 feature status. Mechanical cuts update its companion skill, `docs/05/06/07/08/10`, developer README and any modified schemas. Use per-real-bead receipt files; leave historical Pi `TRACEABILITY.md` untouched and feedback append-only.

Feedback makes test hygiene part of correctness: scoped claim/witness language; new independent test files; positive and adverse mutants, not shared census header edits; timeouts explicitly distinguished from assertion reds; canonical source walkers refusing symlinked dependency trees; measured package/prep/backpressure cost rather than outdated October numbers. Recheck the exact **merged gated tree**, not just one agent's branch.

**Status for this new program:** design documentation only; no code test, npm pack, Forge run or external producer call has been executed for it. W11 remains planned until a registered Pi function flow and complete native acceptance receipts are measured.
