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

## 2026-10-24 follow-up receipt (wb-pdee): settle-window rows and the three unnamed static spelling families (trunk 92e5ae2)

- Bead: wb-pdee, the R694 follow-up of landing 263 (gate of record cmd_5f0f6e9c5468; F1 leads, F2 rides). This entry adds rows to the census that this receipt records and continues its anchor listing. No line above is changed.
- F1, cured by row S. C1-C3 read the argv recorder right after each call, so the census never saw a child that a descriptor or inspection call starts without awaiting it. S1-S4 repeat the C1, C2, C3 and C7 calls, then settle before they read. The settle first waits a 3 s window for deferred work, then waits until no child process the test worker started is still running (its ProcessWrap handles in process.getActiveResourcesInfo, bounded at 30 s). S1-S3 then read zero spawns and S4 the one render spawn.
- Row S also carries two support pins. S5 is the settle's positive control: a planted unawaited spawn of the stand-in is running right after the call, an immediate read misses it, and the settle records it. S6 pins the recorder's isolation: every pin starts with PATH on one empty scratch directory, and between pins PATH names that removed directory, so a stray spawn finds no binary.
- F2 (i), cured by row I. rf adds its CLI-A25 global options to every group parser, so a global can stand between a leaf's words (ReactiveFiberCLI 6a251bf73af5, src/reactive_fiber_cli/cli/parser.py:251-260 GLOBAL_OPTIONS, :277 VERBOSE_FLAGS, _add_globals on each group parser at :3458). Line :286 lists the three that take a value. A2 now also reads each literal with every option token, the value a value option takes and every runtime token removed. I1 covers the eight mutating leaves with 16 array spellings of a global, I2 covers shell lines and templates, and I3 keeps the read leaves and the near misses clean.
- F2 (ii), cured by row K. A1 now reads a child_process function imported under another name (named imports, destructured require() and import()) and a callee written as an element access with a literal key.
- F2 (iii), cured by row D. B2 now also reads the literal arguments of a call and the elements of an array as one path joined by "/", and it reads a backslash as "/".
- Residuals that this entry names (row N), each a pinned quiet row:
  - Q7 R-LATE-SPAWN: a spawn deferred past the window goes unseen by its own row.
  - Q8 R-UNREF-CHILD: an unref'd child holds no ProcessWrap handle, so only the window covers it.
  - Q9 R-REBOUND-CALLEE: a child_process function re-bound through a variable, a promisify() wrapper, call or apply, or a computed key is no site to A1.
  - Q10 R-COMPOSED-PATH: a document path built from non-literal segments escapes B2.
  - Q11 R-SHELL-QUOTED: in a shell line, a quoted option value that holds a space splits apart and hides the leaf from A2.
- Owner anchor: the wb-pdee row of the tracked bead export (.beads/issues.jsonl) states F1's cure and F2's families (i), (ii) and (iii), and rows S, I, K and D hold their labels to them verbatim.
- Anchor listing, continued. The census reads every listing line of this file in order, so the rows below follow row R.

- Row S (pins S1, S2, S3, S4, S5, S6): settle-window rows against CB1 and CB3
- Row I (pins I1, I2, I3): the interleaved global option, spawn('rf',['graph','--workspace',root,'publish'])
- Row K (pins K1, K2, K3): aliased-import and element-access callees
- Row D (pins D1, D2, D3): document path segments, join(dir,'graphs','context.toml') and the array join
- Row N (pins Q7, Q8, Q9, Q10, Q11): the follow-up's named residuals, each a pinned quiet row that reds when its escape stops being quiet
- Residual Q7: R-LATE-SPAWN
- Residual Q8: R-UNREF-CHILD
- Residual Q9: R-REBOUND-CALLEE
- Residual Q10: R-COMPOSED-PATH
- Residual Q11: R-SHELL-QUOTED

Results, measured by the cutting seat on trunk 92e5ae2 with this cut. Each planted edit was applied in place and restored byte-identical (sha256 checked):

- The census reads 52 of 52 green. Written before any matcher change, the new rows read 9 failed of 51: I1, I2, K1, K2, K3, D1, D2, and the literal controls of Q10 and Q11. S6 was added after that run.
- Against the landed census and receipt (c27bd4b), the gate's probes survive as the gate measured. CB1, P03, P04, P07b, P11b and P11c each read 32 of 32, and P07 reds A1 only.
- Against this cut, each runtime edit planted in src/workbench/capability-registry.ts is red. Each listed edit is an unawaited stand-in spawn unless it says otherwise:
  - CB1, in inspect: S2, S3.
  - CB2, the same spawn awaited: C2, C3, S2, S3.
  - CB3, in discover: C3, C7, S1, S3, S4.
  - Deferred by a microtask: S2, S3. By an immediate: C4, S2, S3. By a 1 s timer: S2, S3. Detached and unref'd: S2, S3.
  - In catalogSnapshot: S1. In effectClassOf: S1. After the invoke dispatch: S4.
  - Deferred by a 6 s timer: S2, S3, S4. Each late spawn lands in a later pin's window.
- Each static probe planted as a new src module is red. These were measured on the cut before S6 was added, and S6 changes no matcher:
  - P03: A1. P03b: A1, A2. P04: A1. P04b: A1. P07: A1, A2. P07b: A1, A2. P11b: B2. P11c: B2.
  - A shell line with globals between a leaf's words: A2. A template with an interleaved value: A2. A renamed destructured require(): A1. A document path written with a backslash: B2.
  - The probes of Q9, Q10 and Q11 stay quiet, as the residuals state.
- CT-BATTERY v2: CT1 red=2; CT1b red=2; CT2 red=2; CT3 red=1; CT4 red=2; CT5 red=2; CT6 red=2. CT5 dies through this listing and the wb-pdee export row, CT6 (S3 removed from every literal) through this listing, and CT2 through both. Two extra probes also die through this listing: the same coordinated hollow of residual Q9, and CT5 on the landed row M.
- Before S6, the catalogSnapshot edit was called from A4, B1 and C9 with the host PATH, on which an rf is installed. The installed rf (0.1.836) gives that leaf two required options, the edit candidate and the expected head (cli/parser.py:2116), so a bare invocation is refused while its arguments are parsed. No file under graphs/ or state/ of either ancestor rf workspace changed. Whether that rf ran is not verified.

## 2026-10-25 terminal follow-up receipt (wb-7thm): wrapped callees, normalized path segments, quoted leaf words, the rendered listing and the landing-263 riders (trunk b887fa2)

- Bead: wb-7thm, the R694 follow-up of landing 362 (gate of record cmd_593bb938a609; F1 leads; F2, F3, F6 and F7 ride). It is hop 3 of this receipt's chain, cut in the terminal enumerate-the-resolvable form: each enumerated item is bound by a row below, and the census claims exactly the pinned set. This entry adds rows to the census and continues its anchor listing. No line above is changed.
- F1, cured by row U. A1 now reads a callee after removing its outer-expression wrappers at any depth: parentheses, a non-null assertion, an as or angle-bracket type assertion, satisfies, and a comma expression's last operand. K4 to K8 hold one form each, nested forms included, beside the gate's G-ST7 (K4), G-ST8 (K5), G-ST9 (K6) and G-ST10 (K8).
- F2, cured by row P. B2 now reads every literal and every joined segment run both as written and through path.posix.normalize. D4 holds a trailing slash, a dot segment, an empty segment, a ".." inside a segment and a double slash, beside the gate's G-DP1, G-DP2, G-DP4 and G-DP5, and keeps a ".." that leaves graphs/ clean.
- F3, cured by row H. A2 now also reads each string and template literal with its shell quoting removed (backslash escapes, a "$" opening a quote, and every quote character), as spelled and option-elided. An argv array element reaches rf verbatim, so it is never unquoted. I4 holds the gate's G-ST13 beside six quoting spellings of each mutating leaf, and Q11 stays quiet.
- F6, cured in the census. The witness table names the trunk each row group was measured on: rows A, B, C, M and R at base 0b2a80f, rows S, I, K, D and N on trunk 92e5ae2 (cut on 61dac63), and the rows of this entry on trunk b887fa2.
- F7, cured by rows X and W. Row X restores the dropped X5 rider: the census now refuses this receipt when marked 18 lexes any html token in it (a complete or an unclosed comment, an HTML block, an inline tag), since each renders nothing. X5 replays the gate's X5 edit and three siblings in memory and reads the committed receipt clean. Row W restores the landing-263 W11/W12/W13a-c rider: W11 holds committingCount to descriptor sets with committing members, W12 holds SRC_FLOOR to its value and to refusing an empty walk, and W13 holds the src walk to node's own recursive listing of src, module by module and byte for byte.
- Residuals that this entry names (row T), each a pinned quiet row:
  - Q12 R-OTHER-CALLEE: a callee written through any other expression (a conditional, a logical operator such as `||` or `??`, an instantiation expression) is no site to A1.
  - Q13 R-SHELL-EXPANSION: a leaf word that only a shell expansion spells (brace expansion, a parameter expansion's literal default, an ANSI-C escape sequence) hides the leaf from A2.
- Owner anchor: the wb-7thm row of the tracked bead export (.beads/issues.jsonl) states F1's, F2's and F3's cure shapes and F7's two riders, and rows U, P, H, X and W hold their labels to them verbatim.
- Anchor listing, continued. The census reads every listing line of this file in order, so the rows below follow row N.

- Row U (pins K4, K5, K6, K7, K8): calleeOf unwraps outer expressions (ts.skipOuterExpressions, or a loop over parenthesized, non-null, as, satisfies and comma-tail forms) with one K pin per form
- Row P (pins D4): B2 reads path.posix.normalize of the joined literal segments, and of each literal, before the GRAPH_DOCUMENT check, with one D pin
- Row H (pins I4): shell-unquote string literals before leafPattern runs
- Row X (pins X5): restore the dropped X5 rider
- Row W (pins W11, W12, W13): the landing-263 W11/W12/W13a-c rider
- Row T (pins Q12, Q13): the terminal follow-up's named residuals, each a pinned quiet row that reds when its escape stops being quiet
- Residual Q12: R-OTHER-CALLEE
- Residual Q13: R-SHELL-EXPANSION

Results, measured by the cutting seat on trunk b887fa2 with this cut. Each planted edit was applied in place and restored byte-identical (sha256 checked):

- The census reads 65 of 65 green. Written before any matcher change, with the rows, the pins, the witnesses, the wb-7thm anchors and this listing in place, the new rows read 10 failed of 65: K4, K5, K6, K7, K8, D4, I4, X5, and the positive controls of Q12 and Q13. W11, W12 and W13 were green there: each is a control that reds only under its mutant.
- Against the landed census and receipt (b887fa2), each enumerated member reads 52 of 52, as the gate measured: G-ST7, G-ST8, G-ST9, G-ST10, G-DP1, G-DP2, G-DP4, G-DP5, G-ST13 and the X5 edit. So do the landing-263 riders, which no gate had re-measured: W11 (committingCount counts zero), W12 (SRC_FLOOR set to 0), and W13a, W13b and W13c (the walk skips src/ui, src/workflow or src/workbench/hosts). So do the seat's siblings G-ST9s (satisfies), G-ST9t (an angle-bracket assertion), G-DPdd (a ".." inside a segment) and G-DPss (a double slash).
- Against this cut, each of them is red:
  - Each callee plant, as a new src module: A1. Each path plant: B2. G-ST13 and its double-quoted and template siblings: A2.
  - The X5 edit, in place: the judged-set case, Q5 and X5.
  - W11, and four hollows that each drop one clause of committingCount (the prefix, the render, the mutating leaf, the document): W11. W12: W12. W13a, W13b, W13c and W13t (a walk that reads src/ui as empty text): W13.
- A Q12 member planted as a new src module (a callee written through `||`) reads 65 of 65, as the residual states.
- CT-BATTERY v2: CT1 red=3; CT1b red=3; CT2 red=3; CT3 red=1; CT4 red=3; CT5 red=2; CT6 red=3. CT5 (row X and its frozen-shape element deleted) dies through this listing and the wb-7thm export row, CT6 (K7 removed from every literal) through this listing, and CT2 through both: shortened in the census and in this listing together, it still reds through the export row.
- After this cut merged trunk 6e0c3d2 (landings 396 to 399, which change no src and no note of the three export rows the census reads), the census reads 65 of 65 green again.
