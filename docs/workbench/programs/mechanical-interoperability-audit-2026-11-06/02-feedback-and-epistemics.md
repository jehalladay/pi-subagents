# 02 — Agent feedback, evidence hygiene and reconciled facts

## Inputs

Pi's append-only `new-feedback/` is operational feedback from orchestration agents; counts are observations over *specified historical windows*, not today's measured throughput. Also reviewed the earlier Pi interop [epistemic audit](../mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/EPISTEMIC-AUDIT.md), [50-row remediation](../mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/REMEDIATION.md), [adversarial requirements](../mechanical-workflows-interop-2026-11-04/triage/requirements/REQUIREMENTS-AUDIT.md) and [Beads plan](../mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md). Mechanical's RF feedback qualification and historical QA receipts are separate sources; its inspected default-branch tree had no dedicated `new-feedback/` folder.

| Feedback observation | Recorded scope | Program response |
|---|---|---|
| Assertion claim widths | 2026-11-04 agent report: 42 of 56 refusals in its 24-hour window named R514/R515/R668; 152,506 prep seconds; 26 of 56 at refusal #5+ | Every assertion must name its precise reader/source/witness, mutant and remaining quiet cases. No huge aggregate census with claims broader than pins |
| Shared census conflicts | 2026-11-03: 3 of 48 landings in measured window were sibling header/census conflicts | Per-cut tests and per-bead receipts, no shared mutable assertion header or central receipts index |
| Beads export entanglement | 2026-11-05: 175 of 585 tests read Beads export at source pin; one census parses machine seat note tokens | Function admission/identity never depends on free-form exported note wording; stable typed evidence and snapshot pins only |
| Test timing/collector errors | Multiple October reports: default 5s Vitest timeout and misselected census config cause false or misclassified reds | Test-specific budgets, explicit config and failure taxonomy, never simply suppress red |
| Install bottleneck drift | 2026-10-20 earlier 398s median npm-ci across gate worktrees; 2026-11-02 shared-cache report 7s median and preparation step F dominant | Measure *current* tarball/install/admission/QA costs before cache optimization; historic latency is not a current estimate |
| Symlinked dependency tree | 2026-11-04: symlinked `node_modules` escaped directory-only ignore and 2/9 enumerators could attempt it; one EISDIR | `lstat`, realpath, symlink and directory rejection in source/descriptor walkers; no accidental package-tree crawl |
| Positive gate discipline | Historical 2026-10-15 completed gate receipts, 2026-10-23/29 merge trees matching gated trees, scratch and negative-control improvements | Preserve exact gated-tree identity, isolated scratch fixtures and per-bead evidence |
| RF usage requests | Mechanical 2026-11-04 qualification: native render/explain/replay, lost-reply recovery, lock pressure distinct from currentness, skill/docs | Later committed-RF profile with measured producer witnesses; not a dependency of first Git-census path |

## Epistemic corrections to the old program

The earlier roll-up inventoried 490 claims, 392 material, 48 overclaims and 50 remediation rows; it refuted 14 and marked 2 unsupported. These counts are **of that audit**, not of this new program. The important corrected propositions are:

- The Mechanical committed descriptor **is repaired** since `1f29daa7`; repeating its old mismatch in present tense is refuted.
- A Mechanical AbortSignal **exists** since `f7c0a943`, but only as a pre-dispatch guard. It is wrong both to say no signal exists and to claim active cancellation.
- Pi has a read-only Mechanical event integration (`collective-event.ts`), but no invocation host; unqualified “no Mechanical code” is incorrect.
- Pi `node()` dispatches a capability through a registry, not inherently a shell; the old anti-shell sentence was normative, not an observed bug.
- Worktree loss is conditional on the failed preservation path; per-agent `beforeDispatch` late launch is a **hypothesis**, not reproduced by this audit.
- The prior Pi “profile” versus Mechanical “mode” is one CONTESTED proposal set (KU10). Neither is a deployed ABI. This program proposes distinct host-owned `evidenceProfile`, `contextProfile` and existing Pi `hostMode`; joint adoption and tests are mandatory before claiming that choice.
- Pi `wb-muip` receipt census measured scoped absence in its read in-repo stores, with global `UNDETERMINED`. Its native Forge transport probe witnessed FAIL exit 1 for two tested invocations, not a universal “exit 0 FAIL never possible” claim.
- Pi `wb-f3wd` native HX probe established task-scope unsupported at the probed producer version, not that a Git tracked-file census is invalid or that later HX versions cannot improve.

## Follow-through

Use the existing `B-preserve`, `B-detached-grants`, `B-cancel-repro`, `B-contract-choice`, `B-source`, `B-dispatch`, `B-outcomes`, `B-effects`, `B-observe`, `B-git-census` and provider-gated groups rather than create a second untracked plan. Do not close an external evidence gate based on a source grep or a model-generated document. Do not rename the 490 earlier claim identifiers or overwrite their source-pinned grades. Update stale user-facing current guidance in this program and the skill; the dated prior audit remains provenance, not normative present state.

Open questions: unsearched external Pi→Mechanical receipts, whether startup skip race actually reproduces, HX's native future task-scope capabilities, running SDK cancel and recovery, source/skill effect identity, and the currently missing independently installed Pi host binding.
