# wb-pxvv: [MWI-hx-admit] MNI P12: certified HX scope and committed RF context admission

## 2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 1 (machine seat ws-08, run g10-work-s337, base ce180d8)

- Surface: `src/workbench/scope-admission.ts` holds the guards (pure; `dispatchAdmittedWriter` awaits its writer once and nothing else), `qa/workbench/hx-named-query-probe.mjs` the named-query route probe, `qa/workbench/hx-named-query-judge.mjs` its pure judge, `qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json` the committed record, `test/workbench-hx-admit-census.test.ts` the census and `test/fixtures/mwi-hx-admit-requirements-roster.json` the vendored requirement blocks (EAT-R058, EAT-R059 and EAT-R062 at pi-subagents master `0b25e14e`, ATOMIC-REQUIREMENTS.md lines 1226-1244 and 1270-1278; EAT-R163 at `b8cd53aa`, ATOMIC-REQUIREMENTS-DELTA.md lines 908-920; each held to its SHA-256). Base trunk `ce180d82f938`.
- Standing: no registered tool composes these guards yet. `workflow_execute` still refuses a function definition (`execute-tool.ts`, unsupported-definition-kind), so composing them into a registered launch, and the host reader that turns a live HX answer into scope evidence, belong to the dispatch packet (P04, wb-4bxo); the installed-host witness EAT-R063 on gate PI-HX-RF-LIVE stays owed there. Profile names are not minted here: the guards speak of the native task-scope profile and the git-census mode, the vocabulary the wb-f3wd blocker already uses.
- EAT-R058 and EAT-R059 (`judgeScopeEvidence`): a stated workspace, task digest, query digest or resolved revision that differs from the invocation's refuses with that mismatch, before any gap; an answer of the invocation dispatches only when answered natively, exit 0, terminal reached, coverage certified complete, absence licensed, and its workspace, task scope, resolved revision and query digest stated. The measured answers of both committed records (wb-f3wd's three find-verb legs and this cut's two named-query legs) read needs_evidence with their listed gaps and zero writer calls. An empty answer under unlicensed coverage adds known-empty-unlicensed, and an empty answer never reads as complete coverage.
- EAT-R062 (`scopeBlockerOf`, `dispatchAdmittedWriter`): a scope gate that is not supported refuses the native request with the blocker on HX-TASK-SCOPE-PROBE scoped to native-task-scope, git-census not blocked; an independently authorized git-census request dispatches once under its own label whatever the gate reads. Every refusal returns before the writer and is a closed-vocabulary code.
- EAT-R163, measured 2026-11-11 by `node qa/workbench/hx-named-query-probe.mjs --write qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json`: the installed producer reports version 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90` (origin path, HXS 1.0, protocol hxs/1.0), 84 capabilities, none naming a task. The probe commits wb-f3wd's task repository byte for byte (base revision `ac25292057ec`, task digest `sha256:40e694cc6de6`), marks it a workspace with the producer's init verb, forms the task's query under the pinned view `git:ac25292057ec`, saves it with the producer's query save verb as the workspace-defined named query `hx-admit-task-scope`, with the task as its declared parameter and the task digest as its documentation, and runs it with the verb `run` through `@hyperunix/sdk`.
  - named-query-strict: exit 3, coverage unknown (HX-COVERAGE-INCOMPLETE), absence unlicensed, answer view `hx.view/workspace-head`, no revision resolution, query digest the definition's semantic digest.
  - named-query-best-effort: exit 0 over the same unknown coverage, absence unlicensed. An exit of 0 is not complete coverage.
  - The saved definition keeps no view: the producer's query show verb (machine mode) reads its documentation back but states no view anywhere in the definition stream, so the pinned view the query was formed under does not reach the run.
- Verdict on the named-query route at that binary: task-scope-unsupported, judged by the landed wb-f3wd conditions unchanged (`judgeNamedQueryRoute` is `judgeTaskScope`). Blocker on HX-TASK-SCOPE-PROBE, scoped to native-task-scope, git-census not blocked.
- Same binary: the installed hx is no longer the binary wb-f3wd recorded (`e0efc5f18763`). The probe therefore re-ran the landed wb-f3wd probe in the same run at the same binary SHA-256: verdict task-scope-unsupported, exits filesystem-live 3, filesystem-live-best-effort 0 and revision-pinned 2; the pinned leg now exits 2 where the older binary exited 4. The scope gate reads the named-query route only (`gateOfRecord`), never that section, and `recordFindings` refuses a record that re-cites the find-verb legs. The find verb and the named-query route exit alike (3 and 0), so exit codes alone never pass as a named-query witness: the definition's semantic digest on every leg does.
- What the record is: producer evidence for the named-query route at the recorded binary, beside the find verb at the same binary. It certifies nothing; hx verbs other than find and run, other hx builds and a version-wide statement are not claimed.
- Not carried by this cut, and still owed on this bead: EAT-R060 and EAT-R061, the committed-context guards. Measured reason: an earlier draft of this cut read the context producer's envelope fields in a new src module, and on a throwaway committed copy that draft redded about a dozen landed censuses that hold this vocabulary to the designated reader modules; the guard was taken out of the cut, so where a committed-context reader lives is a reader-module decision for its own cut. EAT-R063 (gate PI-HX-RF-LIVE) waits on P04.
- NOT CLAIMED: EAT-R060, EAT-R061 and EAT-R063; a registered workflow_execute or workflow_observe oracle (EAT-R299 (1) and (4)); an input of another type than the interfaces declare.
- Residual, named and pinned by a quiet row (the residual table below): R-EVIDENCE-ADAPTER, the measured answers reaching the guard through the census's own adapter rather than a host reader, which does not exist until P04.
- Frozen shape (standing rule 16): one row pins EAT-R058:5, EAT-R059:5, EAT-R062:3 and EAT-R163:5. Outside anchors: the roster's requirement ids, Statements, Adversarial mutants and block SHA-256 (ANCHOR-ROSTER), and the three tables below (ANCHOR-RECEIPT-PINS, ANCHOR-RECEIPT-RESIDUALS, ANCHOR-MEASURED).
- CT battery (v2), each member applied in place on a throwaway copy and restored byte-identical (SHA-256 checked): `CT-BATTERY v2: CT1 red=3; CT1b red=3; CT2 red=1; CT3 red=1; CT4 red=3; CT5 red=2; CT6 red=1`. CT5 is killed by the roster and the receipt's pins table, both outside the census. CT6 takes the pin R059-QUERY-MISMATCH out of its case, its row and the frozen literal together and is killed by the receipt's pins table alone.
- Red: the census against blind stubs of the guard module and the judge (exported API, blind bodies), with no committed record and no receipt, gave 22 failed | 3 passed (25). The 3 that pass are FROZEN-SHAPE, CASES-REGISTERED and ANCHOR-ROSTER, which read neither module, record nor receipt.
- Green: 25 of 25.
- Mutants: 36 of 36 killed, each applied in place on a throwaway copy and restored byte-identical (SHA-256 checked), with 1 to 7 failures each. 19 are on the guard module, among them the three vendored adversarial mutants: comparing only the workspace name (5 failures), mapping an empty answer to complete coverage (2) and disabling every invocation when native evidence is unavailable (2). 8 are on the judge, among them the vendored EAT-R163 mutant, the gate reading the find-verb verdict (2). 8 are on the committed record and 1 on the probe. Every judge mutant reds R163-RECORD-TIED through the judge SHA-256, and all but one also red another row: the absence licence read as granted inside `observationOfRun` reds R163-RECORD-TIED alone, because that mapping is read through the committed record only.
- Display paths added: none. Refusals are closed-vocabulary codes and carry no producer text.

### Judged pins, wb-pxvv cut 1

| Row | Pin |
| --- | --- |
| EAT-R058 | R058-MEASURED-PARTIAL |
| EAT-R058 | R058-MEASURED-UNKNOWN |
| EAT-R058 | R058-FALSE-KNOWN-EMPTY |
| EAT-R058 | R058-POSITIVE-CONTROL |
| EAT-R058 | M-EMPTY-AS-COMPLETE |
| EAT-R059 | R059-TASK-MISMATCH |
| EAT-R059 | R059-QUERY-MISMATCH |
| EAT-R059 | R059-REVISION-MISMATCH |
| EAT-R059 | R059-BEFORE-WRITER |
| EAT-R059 | M-WORKSPACE-NAME-ONLY |
| EAT-R062 | R062-NATIVE-BLOCKED |
| EAT-R062 | R062-GIT-CENSUS-PASSES |
| EAT-R062 | M-DISABLE-ALL |
| EAT-R163 | R163-RECORD-PINS |
| EAT-R163 | R163-NAMED-QUERY-VERDICT |
| EAT-R163 | R163-GATE-INDEPENDENT |
| EAT-R163 | M-FIND-RECITED |
| EAT-R163 | R163-RECORD-TIED |

### Residuals, wb-pxvv cut 1

| Residual | Quiet row |
| --- | --- |
| R-EVIDENCE-ADAPTER | QUIET-EVIDENCE-ADAPTER |

### Measured record, wb-pxvv cut 1

| Field | Value |
| --- | --- |
| producer.binarySha256 | 50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90 |
| producer.capabilities.count | 84 |
| definition.semanticDigest | sha256/hxq-normalized-v1:82613cb1319b7d5d696a7687b6b98ae8a8711e82ea5b9bc803fe80935823ab13 |
| named-query-strict.exitCode | 3 |
| named-query-best-effort.exitCode | 0 |
| findVerb.verdict | task-scope-unsupported |
| findVerb.filesystem-live.exitCode | 3 |
| findVerb.filesystem-live-best-effort.exitCode | 0 |
| findVerb.revision-pinned.exitCode | 2 |
