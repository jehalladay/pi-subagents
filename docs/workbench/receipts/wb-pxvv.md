# wb-pxvv: [MWI-hx-admit] MNI P12: certified HX scope and committed RF context admission

## 2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 2 (machine seat ws-16, run g10-work-s338, base ce180d8)

- Cut 2 replaces the text cut 1 wrote here (machine seat ws-08, run g10-work-s337, commit `82761677`). Gate run g10-gate-s289 refused cut 1 (refusal #1: claim words wider than the census pinned, items U1 to U9, with findings F1 to F3 riding); cut 1 never landed. Cut 2 changes the census, the comments of `src/workbench/scope-admission.ts` and this receipt. The module's code, the judge, the probe, the committed record and the roster keep cut 1's bytes.
- Surface: `src/workbench/scope-admission.ts` holds the guards, `qa/workbench/hx-named-query-probe.mjs` the named-query route probe, `qa/workbench/hx-named-query-judge.mjs` its pure judge, `qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json` the committed record, `test/workbench-hx-admit-census.test.ts` the census and `test/fixtures/mwi-hx-admit-requirements-roster.json` the vendored requirement blocks (EAT-R058, EAT-R059 and EAT-R062 at pi-subagents master `0b25e14e`, ATOMIC-REQUIREMENTS.md lines 1226-1244 and 1270-1278; EAT-R163 at `b8cd53aa`, ATOMIC-REQUIREMENTS-DELTA.md lines 908-920; each held to its SHA-256). Base trunk `ce180d82f938`.
- Composition: this cut composes the guards into no registered tool; among its files only the census imports the module. Composing them into a registered launch, and the host reader that turns a live HX answer into scope evidence, belong to the dispatch packet (P04, wb-4bxo); the installed-host witness EAT-R063 on gate PI-HX-RF-LIVE stays owed there.
- The guards' claims are the census header's PINNED READER SET, one line per claim with the cases that pin it (the Judged pins table below): EAT-R058 and EAT-R059 through `judgeScopeEvidence`, EAT-R062 through `scopeBlockerOf` and `dispatchAdmittedWriter`. The module's own comments name the same cases.
- EAT-R163, measured 2026-11-11 by `node qa/workbench/hx-named-query-probe.mjs --write qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json` (cut 1's run, that day): at that run the installed producer reported version 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90` (origin path, HXS 1.0, protocol hxs/1.0), 84 capabilities, none naming a task. The probe commits wb-f3wd's task repository (base revision `ac25292057ec`, task digest `sha256:40e694cc6de6`), marks it a workspace with the producer's init verb, forms the task's query under the pinned view `git:ac25292057ec`, saves it with the producer's query save verb as the workspace-defined named query `hx-admit-task-scope`, with the task as its declared parameter and the task digest as its documentation, and runs it with the verb `run` through `@hyperunix/sdk`. The census holds the four commands and each leg's argv token for token (R163-RECORD-PINS).
  - named-query-strict: exit 3, coverage unknown (diagnostic HX-COVERAGE-INCOMPLETE, severity error), absence unlicensed, answer view `hx.view/workspace-head`, no revision resolution, query digest the definition's semantic digest.
  - named-query-best-effort: exit 0 over the same unknown coverage (the same diagnostic, severity warning), absence unlicensed. An exit of 0 is not complete coverage.
  - The saved definition keeps no view: the producer's query show verb (machine mode) reads its documentation back and states no view in the definition stream, and both legs answer on the view `hx.view/workspace-head`, not on the pinned view the query was formed under.
- Verdict on the named-query route at that binary: task-scope-unsupported, judged by the landed wb-f3wd conditions unchanged (`judgeNamedQueryRoute` equals `judgeTaskScope` over the record's observations). Blocker on HX-TASK-SCOPE-PROBE, scoped to native-task-scope, git-census not blocked.
- Same binary: at that run the installed hx was not the binary wb-f3wd recorded. The probe therefore re-ran the landed wb-f3wd probe in the same run at the same binary SHA-256: verdict task-scope-unsupported, exits filesystem-live 3, filesystem-live-best-effort 0 and revision-pinned 2; wb-f3wd's record holds 4 for the pinned leg. The scope gate reads the named-query route only (`gateOfRecord`), never that section, and `recordFindings` refuses a record that re-cites the find-verb legs. The find verb and the named-query route exit alike (3 and 0), and a record whose legs keep the find-verb exit codes without the definition's semantic digest reads digest-not-definition (M-FIND-RECITED).
- What the record is: producer evidence for the named-query route at the recorded binary, beside the find verb at the same binary. It certifies nothing; hx verbs other than find and run, other hx builds and a version-wide statement are not claimed. The installed hx was rebuilt after that run; this cut does not regenerate the record, and a fresh probe run is NOT CLAIMED by the census.
- Not carried by this cut, and still owed on this bead (finding F1 of refusal #1, restated): EAT-R060 and EAT-R061, the committed-context guards. Measured reason (cut 1): an earlier draft of cut 1 read the context producer's envelope fields in a new src module, and on a throwaway committed copy that draft redded about a dozen landed censuses that hold this vocabulary to the designated reader modules; the guard was taken out of the cut, so where a committed-context reader lives is a reader-module decision for its own cut. EAT-R063 (gate PI-HX-RF-LIVE) waits on P04.
- NOT CLAIMED, as the census header states: EAT-R060, EAT-R061 and EAT-R063; a registered workflow_execute or workflow_observe oracle (EAT-R299 (1) and (4)); the PI-HX-RF-LIVE gate; hx verbs other than find and run, other hx builds and a version-wide statement; a fresh probe run, and the judge's observation mapping on answers the committed record does not keep; an input of another type than the interfaces declare.
- Residual, named and pinned by a quiet row (the residual table below): R-EVIDENCE-ADAPTER, the measured answers reaching the guard through the census's own adapter rather than a host reader, which does not exist until P04.
- Frozen shape (standing rule 16): one row pins EAT-R058:7, EAT-R059:6, EAT-R062:6 and EAT-R163:6. Outside anchors: the roster's requirement ids, Statements, Adversarial mutants and block SHA-256 (ANCHOR-ROSTER), and the three tables below (ANCHOR-RECEIPT-PINS, ANCHOR-RECEIPT-RESIDUALS, ANCHOR-MEASURED).
- CT battery (v2) on cut 2's census, each member applied alone on a throwaway copy and restored byte-identical (SHA-256 checked): `CT-BATTERY v2: CT1 red=3; CT1b red=3; CT2 red=1; CT3 red=2; CT4 red=3; CT5 red=2; CT6 red=1`. Variants: CT2b (the Adversarial mutant phrase shortened), CT6b (the residual literal) and CT6c (the measured literal) red=1 each; CT3b (a pin's case body swapped for an unrelated passing assertion) stays green, since a case registry cannot see a body swap, and the member battery below holds the bodies. CT5 is killed by the roster and the receipt's pins table, both outside the census; CT6 takes R059-QUERY-MISMATCH out of its row, its case and the frozen literal together and is killed by the receipt's pins table alone.
- Red (pin and falsify): each of refusal #1's sixteen ground members, applied alone to a throwaway copy of cut 2, reds the census (failed of 32): U1 G01, G02 and G03 2 each; U2 G04 2; U3 G06 1; U4 G07 1; U5 G05 1; U6 G09 2; U7 G08 1; U8 the record plants R01, R02 and R03 and the real regenerations R01-REGEN and R02-REGEN 1 each; U9 the record plant R04 2 and the real regeneration P01-REGEN 1. Under cut 1's census each read 0 failed (the gate's readings). Finding F3's judge members J02 to J06 red 1 each, and G19 (an empty-string identity read as stated) 4.
- Green: 32 of 32.
- Mutants: the gate's 53 LEG 2 members of refusal #1 (its evidence archive verified with `sha256sum -c`, rc 0), each applied alone to a throwaway copy and restored byte-identical (SHA-256 checked): 49 red and 4 green. The four green ones sit inside the NOT CLAIMED sentences or change a field no claim names: G14 (a non-boolean knownEmpty, an input of another type), R09 (the terminal field), and P01 and J11 with the SHA tie alone (a fresh probe run and the judge's observation mapping on other answers); their real regenerations P01-REGEN and J11-REGEN are red, 1 and 2. Fourteen further members against cut 2's new words (the identity check order, a trimmed identity, an unchecked base revision or git-census id, a copied or extended admission, a bitwise exit code, a wrapped rejection, a narrowed known-empty rule, scope judged before the gate, the findings order, an unawaited value, a writer called before an authority refusal and a missing witness read as unsupported) are red, 1 or 2 each.
- Display paths added: none.

### Judged pins, wb-pxvv cut 2

| Row | Pin |
| --- | --- |
| EAT-R058 | R058-MEASURED-PARTIAL |
| EAT-R058 | R058-MEASURED-UNKNOWN |
| EAT-R058 | R058-FALSE-KNOWN-EMPTY |
| EAT-R058 | R058-POSITIVE-CONTROL |
| EAT-R058 | M-EMPTY-AS-COMPLETE |
| EAT-R058 | R058-EACH-CONDITION |
| EAT-R058 | R058-GAP-ORDER |
| EAT-R059 | R059-TASK-MISMATCH |
| EAT-R059 | R059-QUERY-MISMATCH |
| EAT-R059 | R059-REVISION-MISMATCH |
| EAT-R059 | R059-BEFORE-WRITER |
| EAT-R059 | M-WORKSPACE-NAME-ONLY |
| EAT-R059 | R059-CHECK-ORDER |
| EAT-R062 | R062-NATIVE-BLOCKED |
| EAT-R062 | R062-GIT-CENSUS-PASSES |
| EAT-R062 | M-DISABLE-ALL |
| EAT-R062 | R062-ONE-FROZEN-ADMISSION |
| EAT-R062 | R062-WRITER-ERROR-PROPAGATES |
| EAT-R062 | R062-REFUSAL-ORDER |
| EAT-R163 | R163-RECORD-PINS |
| EAT-R163 | R163-NAMED-QUERY-VERDICT |
| EAT-R163 | R163-GATE-INDEPENDENT |
| EAT-R163 | M-FIND-RECITED |
| EAT-R163 | R163-RECORD-TIED |
| EAT-R163 | R163-RECORD-FINDINGS |

### Residuals, wb-pxvv cut 2

| Residual | Quiet row |
| --- | --- |
| R-EVIDENCE-ADAPTER | QUIET-EVIDENCE-ADAPTER |

### Measured record, wb-pxvv cut 2

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
