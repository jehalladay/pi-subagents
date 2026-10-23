# wb-a9l2.8: [RF-HARNESS2-FEDERATED-PEER-R8] No Pi surface shall mutate a published shared rf workspace graph except through rf's existing candidate graph authorization/publication process, and Pi shall treat any exported federation effect as a separately declared and authorized operation, never an implicit side effect of a read (exported-effects surface RFCLI-H2-04 unshipped ... harness2-federated-peer-2026-10-20/README.md:26@6a251bf73af5

## 2026-10-22 receipt: the rf graph mutation census pins Pi's preview-only rf roster and arms the committing-capability rule (base b3c795d)

- Requirement (RF-HARNESS2-FEDERATED-PEER-R8): ReactiveFiberCLI docs/programs/harness2-federated-peer-2026-10-20/README.md:26 at 6a251bf73af5, "5. Do not mutate published shared workspace graphs without RF-CLI's existing candidate graph authorization/publication process. Exported effects remain separately declared/authorized operations."
- Gate: none for the prohibition. The exported-effects surface RFCLI-H2-04 (README:36) is unshipped, so the cut adds no exported-effect reader and fakes none. It adds no src, no dependency and no settings key.
- Guard: `test/workbench-rf-graph-mutation-census.test.ts`, in the default gate tier (`vitest.config.ts` includes `test/**/*.test.ts`).
  - Row A pins Pi's rf argv roster: one rf spawn site in src (the spawn in nativeReactiveFiberRender), no src literal or argv array spelling a mutating graph leaf, renderArgv's literal argv ending in --no-commit --no-input --json, and exactly one registered rf capability, reactivefiber.render.preview, with effectClass read in the native and the injected registration and in the reconcile evidence reads.
  - Row B arms the committing-capability rule over every registered reactivefiber.* descriptor: a committing one declares a non-read effectClass, one naming a mutating graph leaf cites graph.candidate.authorize and graph.publish, one naming rf's graph document location is refused as a direct graph write, and one without a contract is refused. Today's two registrations draw no finding. A committing render is judged on its effectClass only; its receipt rule belongs to wb-jwc.5.
  - Row C records every rf spawn through a stand-in rf, the only PATH entry: the registry's descriptor and inspect calls and the Claude discover and contract tools spawn nothing; each input form the descriptor admits and capability_invoke spawn one context render with --no-commit and no mutating leaf; a reading that reports a commit is refused.
- Producer facts, measured read-only at 6a251bf73af5: src/reactive_fiber_cli/cli/registry.py:794-895 registers the sixteen graph leaves listed below, each through _read (mutates false) or _write (mutates true). context.render is registered mutates true with dry_run_flag NO_COMMIT_FLAG (registry.py:961-967), and NO_COMMIT_FLAG is --no-commit (registry.py:192). No leaf at the pin is a candidate apply verb (git grep over src, rc 1); an edit is applied to a candidate by graph patch and its lowerings (parser.py:3052). rf keeps its workspace in .reactive-fiber (domain/workspace/locator.py:33) and the declared graph document at graphs/context.toml (domain/workspace/layout.py:83). The render result's effects ledger holds only denied or not_executed rows in rf v1 (schemas/cli/context.render.schema.json).
- Owner anchor: the wb-a9l2.8 row of the tracked bead export (.beads/issues.jsonl) states the acceptance clauses (a), (b) and (c), and rows A, B and C hold their labels to them verbatim.
- Finding (Q6, R-EFFECT-LEDGER): the preview reader reads rf's effects ledger and dry-run plan as data, so a --no-commit reading carrying an executed ledger row or would_commit true is surfaced unchanged. rf v1 mints no executed row, so no reading of today's rf carries one; the quiet row pins that, so a refusal, once one lands, re-states the row.
- Anchor listing. The census holds its judged rows, the rf graph leaf vocabulary and its residual names to the lines below, in order, so a member removed from every literal of the census is still red here. Each line is plain text.

- Row A (pins A1, A2, A3, A4, A5): (a) a census asserts Pi's rf argv roster has no graph-publishing or candidate-apply verb and its only rf capability has effectClass read
- Row B (pins B1, B2, B3, B4, B5, B6): (b) a future committing rf capability registers a non-read effectClass and cites rf's candidate/publication receipt, never a direct graph write (wb-jwc.5)
- Row C (pins C1, C2, C3, C4, C5, C6, C7, C8, C9): (c) a fixture read-only descriptor/inspection call issues zero graph-mutating rf verbs (argv recorder)
- Row M (pins M1, M2, M3, M4, M5): the matcher rows A and B read catches every spelling family of each mutating rf graph leaf and leaves the read leaves and the live render argv clean
- Row R (pins Q1, Q2, Q3, Q4, Q5, Q6): the named residuals, each a pinned quiet row that reds when its escape stops being quiet
- Leaf graph.show: reads (registry.py:794)
- Leaf graph.validate: reads (registry.py:795)
- Leaf graph.preflight: reads (registry.py:799)
- Leaf graph.explain: reads (registry.py:807)
- Leaf graph.diff: reads (registry.py:817)
- Leaf graph.candidate.create: mutates (registry.py:843)
- Leaf graph.candidate.authorize: mutates (registry.py:855)
- Leaf graph.patch: mutates (registry.py:876)
- Leaf graph.connect: mutates (registry.py:877)
- Leaf graph.disconnect: mutates (registry.py:878)
- Leaf graph.set-optic: mutates (registry.py:879)
- Leaf graph.impact: reads (registry.py:880)
- Leaf graph.test: reads (registry.py:892)
- Leaf graph.publish: mutates (registry.py:893)
- Leaf graph.history: reads (registry.py:894)
- Leaf graph.rollback: mutates (registry.py:895)
- Residual Q1: R-COMPOSED
- Residual Q2: R-INDIRECT-BINARY
- Residual Q3: R-UNPINNED-LEAF
- Residual Q4: R-DECLARED-ROUTE
- Residual Q5: R-COORDINATED
- Residual Q6: R-EFFECT-LEDGER

Results, measured by the cutting seat on trunk f88044c with this cut (the witnesses were first measured at 0b2a80f and are unchanged at b83ae19 and f88044c; b3c795d adds only the landing-253 bead-export hop, over which the census reads 32 of 32 green again):

- The census reads 32 of 32 green. Before its receipt existed, its judged-set case and Q5 were red on the missing file.
- Red-first on the subject: nine planted acceptance violations in src, each red and then restored: an argv spawning graph publish (7 red: A2, A3, C4-C8); the native descriptor declaring effectClass write (4: A4, A5, C1, C8); a second rf capability naming graph.publish (5: A2, A4, A5, B1, C1); renderArgv without --no-commit (5: A3, C4-C7); a second rf spawn site (2: A1, A2); a src path into rf's graph document (1: B2); the carrier naming a committing render (3: A4, B1, Q4); a third input form on the view arm (1: C9); an rf graph read added to the reconcile roster (2: A2, A4).
- CT-BATTERY v2: CT1 red=2; CT1b red=2; CT2 red=2; CT3 red=1; CT4 red=2; CT5 red=2; CT6 red=3. CT5 is killed only by the anchor listing above; CT6 (C6 removed from every literal) by the listing and by C9's src input forms; CT2 with the listing shortened in step is still red through the export row's clause (a).
