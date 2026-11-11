# wb-pxvv: [MWI-hx-admit] MNI P12: certified HX scope and committed RF context admission

## 2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 3 (machine seat ws-08, run g10-work-s337, base ce180d8)

- Cut 3 replaces the text cut 2 wrote here (machine seat ws-16, run g10-work-s338, commit `66334a1a`), which replaced cut 1's (machine seat ws-08, run g10-work-s337, commit `82761677`). Gate run g10-gate-s289 refused cut 1 (refusal #1, items U1 to U9) and cut 2 (refusal #2, items U1 to U6: claim words wider than the census pinned); neither landed. Cut 3 changes the census, the comments of `src/workbench/scope-admission.ts` and this receipt. The module's code, the judge, the probe, the committed record and the roster keep cut 1's bytes.
- Surface: `src/workbench/scope-admission.ts` holds the guards, `qa/workbench/hx-named-query-probe.mjs` the named-query route probe, `qa/workbench/hx-named-query-judge.mjs` its pure judge, `qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json` the committed record, `test/workbench-hx-admit-census.test.ts` the census and `test/fixtures/mwi-hx-admit-requirements-roster.json` the vendored requirement blocks (EAT-R058, EAT-R059 and EAT-R062 at pi-subagents master `0b25e14e`, ATOMIC-REQUIREMENTS.md lines 1226-1244 and 1270-1278; EAT-R163 at `b8cd53aa`, ATOMIC-REQUIREMENTS-DELTA.md lines 908-920; each held to its SHA-256). Base trunk `ce180d82f938`.
- Composition: this cut composes the guards into no registered tool; among its files only the census imports the module. Composing them into a registered launch, and the host reader that turns a live HX answer into scope evidence, belong to the dispatch packet (P04, wb-4bxo); the installed-host witness EAT-R063 on gate PI-HX-RF-LIVE stays owed there.
- Claims: the census header's PINNED READER SET is the whole claim of this cut, one line per claim, each over the inputs its cases build (named in the line or by the census constant that holds them) and the readings they assert; the Judged pins table below lists its cases. This receipt and the module's comments point at those lines and restate no reading of their own. The header is authored in the enumerate-the-resolvable form: its NOT CLAIMED scope sentences and its one named residual with a pinned quiet row bound the rest.
- Refusal #2's items, cured by name. Each gate member, applied alone to a throwaway copy of this cut and restored byte-identical, reds the census (failed of 33; under cut 2's census each read 0 failed of 32, the gate's readings): U1 N1-CASEFOLD, U2 N2-REV-PREFIX, U3 N3-TRIM-COMPARE and U4 N4-ROOT-SLASH 2 each (R059-IDENTITY-VARIANTS and R059-BEFORE-WRITER), through the new case R059-IDENTITY-VARIANTS, which states each identity of two expectations as each member of a fifteen-family variant corpus of its value (letter case, every proper prefix and suffix, 33 pads of space and invisible characters, path forms, one-character edits, full-width and combining-mark forms, encodings and prefixes); U5 N8-UTC-NOT-AN-INSTANT 1 (R163-RECORD-TIED, which now reads the record's utc as an instant: it starts with the day and prints back unchanged); U6 J13-GATE-READS-FIND-BINARY 2 (R163-GATE-INDEPENDENT and M-DISABLE-ALL: the census reads the record keys the gate reads through a recording proxy, findVerb not among them, and varies or removes the find-verb section fifteen ways).
- EAT-R163, measured 2026-11-11 by `node qa/workbench/hx-named-query-probe.mjs --write qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json` (cut 1's run, that day): at that run the installed producer reported version 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90` (origin path, HXS 1.0, protocol hxs/1.0), 84 capabilities, none naming a task. The probe commits wb-f3wd's task repository (base revision `ac25292057ec`, task digest `sha256:40e694cc6de6`), marks it a workspace with the producer's init verb, forms the task's query under the pinned view `git:ac25292057ec`, saves it with the producer's query save verb as the workspace-defined named query `hx-admit-task-scope`, with the task as its declared parameter and the task digest as its documentation, and runs it with the verb `run` through `@hyperunix/sdk`. The record keeps the four commands and each leg's argv, which the census holds token for token (R163-RECORD-PINS).
  - named-query-strict: exit 3, coverage unknown (diagnostic HX-COVERAGE-INCOMPLETE, severity error), absence unlicensed, answer view `hx.view/workspace-head`, no revision resolution, query digest the definition's semantic digest.
  - named-query-best-effort: exit 0 over the same unknown coverage (the same diagnostic, severity warning), absence unlicensed. An exit of 0 is not complete coverage.
  - The record's saved definition keeps no view: at that run the producer's query show verb (machine mode) read its documentation back and stated no view in the definition stream, and both legs answered on the view `hx.view/workspace-head`, not on the pinned view the query was formed under.
- Verdict the record states for the named-query route at that binary: task-scope-unsupported, equal to the landed wb-f3wd conditions over its observations (`judgeNamedQueryRoute` equals `judgeTaskScope` there). Blocker on HX-TASK-SCOPE-PROBE, scoped to native-task-scope, git-census not blocked.
- Same binary: at that run the installed hx was not the binary wb-f3wd recorded, so the probe re-ran the landed wb-f3wd probe in the same run; the record's find-verb section states binary SHA-256 equal to the producer's, verdict task-scope-unsupported, exits filesystem-live 3, filesystem-live-best-effort 0 and revision-pinned 2 (wb-f3wd's record holds 4 for the pinned leg). The census's readings of `gateOfRecord` and `recordFindings` on that record and on the records it plants are its R163 lines.
- What the record is: producer evidence for the named-query route at the recorded binary, beside the find verb at the same binary. It certifies nothing; hx verbs other than find and run, other hx builds and a version-wide statement are not claimed. The installed hx was rebuilt after that run; this cut does not regenerate the record, and a fresh probe run is NOT CLAIMED by the census.
- Not carried by this cut, and still owed on this bead (finding F1 of refusals #1 and #2, restated): EAT-R060 and EAT-R061, the committed-context guards. Measured reason (cut 1): an earlier draft of cut 1 read the context producer's envelope fields in a new src module, and on a throwaway committed copy that draft redded about a dozen landed censuses that hold this vocabulary to the designated reader modules; the guard was taken out of the cut, so where a committed-context reader lives is a reader-module decision for its own cut. EAT-R063 (gate PI-HX-RF-LIVE) waits on P04.
- NOT CLAIMED, as the census header states: EAT-R060, EAT-R061 and EAT-R063; a registered workflow_execute or workflow_observe oracle (EAT-R299 (1) and (4)); the PI-HX-RF-LIVE gate; hx verbs other than find and run, other hx builds and a version-wide statement; a fresh probe run, and the judge's observation mapping on answers the committed record does not keep; an input of another type than the interfaces declare; inputs outside the census's named sets (its two expectations, the variant corpus and planted values, the listed exit codes and coverages, the find-verb variants, the planted records and the planted utc values); the judge's and the probe's doc comments beyond the readings the census lines state.
- Residual, named and pinned by a quiet row (the residual table below): R-EVIDENCE-ADAPTER, the measured answers reaching the guard through the census's own adapter rather than a host reader, which does not exist until P04; the adapter states the workspace as the census constant. Its quiet row holds the adapter's reading of each of the five measured answers as a literal row.
- Frozen shape (standing rule 16): one row pins EAT-R058:7, EAT-R059:7, EAT-R062:6 and EAT-R163:6. Outside anchors: the roster's requirement ids, Statements, Adversarial mutants and block SHA-256 (ANCHOR-ROSTER), and the three tables below (ANCHOR-RECEIPT-PINS, ANCHOR-RECEIPT-RESIDUALS, ANCHOR-MEASURED).
- Display paths added: none.

### Judged pins, wb-pxvv cut 3

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
| EAT-R059 | R059-IDENTITY-VARIANTS |
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

### Residuals, wb-pxvv cut 3

| Residual | Quiet row |
| --- | --- |
| R-EVIDENCE-ADAPTER | QUIET-EVIDENCE-ADAPTER |

### Measured record, wb-pxvv cut 3

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
