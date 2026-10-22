# wb-1xvp.3: [RF-GRAPH-POLICY-MACHINE-CONTROL-R2] If Pi ever wires gp into a decision loop (gated: deliverables 1 and 9, audit and docs, unshipped in Pi and GraphPolicyCLI), Pi docs shall first carry the control-loop audit (each 11-stage-lifecycle decision point: policy, inputs, authority, outcomes, current fixed rule) before behaviour changes, each gp call site naming its audited decision point, and document entrypoints ... docs/programs/graph-policy-machine-control-2026-10-21/README.md:85@6a251bf73af5

## 2026-10-22 receipt: gp call sites pinned absent and the control-loop audit precondition armed (machine seat ws-01, base 0b2a80f)

- Surface: test only. `test/workbench-gp-control-loop-audit.test.ts` is the suite, `test/helpers/gp-control-loop-audit.ts` the judge (pure over injected inputs), `test/helpers/gp-control-loop-audit-cases.ts` the judged tables, and `test/fixtures/gp-control-loop-audit-roster.json` their out-of-file anchor. No src file, provider string, title, label or reply text is touched.
- Gating artifact (bead note): the machine audit and its documentation, deliverables 1 and 9 of ReactiveFiberCLI `docs/programs/graph-policy-machine-control-2026-10-21/README.md` (:504 and :512 at 6a251bf73af5), are unshipped, and Pi carries no gp call site. This cut pins today's absence and arms the precondition. It ships no audit and wires no gp.
- Today's absence, read on the live tree:
  - The census over every module under src/ (115 files at base 0b2a80f) finds no gp call site.
  - The census is not blind: the real `spawn("rf", ...)` site of `src/workbench/providers/reactivefiber.ts`, rewritten in memory to spawn gp, is found at its own line as an unannotated binary site.
  - The modules that spell the word gp outside any string (today `src/agent-types.ts`, whose general-purpose agent is a local named gp) hold no call site.
  - `docs/workbench/control-loop-audit.md` does not exist, and the live judge reads no finding without measuring gp.
- What counts as a gp call site: string text read through the TypeScript parser, so a comment, an identifier or a regular expression never counts. There are three shapes:
  - module: an import, export, require or import() specifier naming graphpolicy (also spelled graph-policy, graph_policy, graph.policy or graph policy; GraphPolicyCLI ships the npm package graph-policy-cli, and its Python mirror is graphpolicy), or a package named gp;
  - binary: the gp executable as a word (gp, gp.exe or gp.cmd, at the start of the text or after whitespace or a path separator, and ending the text or followed by whitespace), so a bare name, a path, or a command line that runs gp;
  - named: any other text naming graphpolicy, or gp's wire vocabulary as measured from gp 0.1.0 on this host: the graphpolicy.cli.v1 and graphpolicy.rpc.v1 protocol ids, the gp.rpc.reply/v1 and gp.rpc.error/v1 reply schemas of `gp rpc --stdio`, and the GP_CLI_, GP_RPC_ and GP_E_ code families (GP_E_ is the registry `gp inspect errors --json` lists).
- The precondition, judged on synthetic inputs (27 falsifier rows, each reading exactly its findings, plus one row per lifecycle stage):
  - (a) A call site with no `docs/workbench/control-loop-audit.md` is an audit-missing finding. Each call site carries a `gp-decision-point: <id>` comment attached to its statement, class member or object property, and the id is a row of the audit's Decision points table. That table has the columns id, stage, policy, inputs, authority, outcomes and current fixed rule, fills every field, and covers all eleven stages of README.md:89-99.
  - (b) Every Entrypoints row (module, export) resolves to an export of an existing module. The Dependencies row for gp carries the measured `gp --version` line verbatim. The Configuration keys equal the settings schema keys.
  - (c) The Inventory is not empty and every status in it is implemented or proposed. The Fallback table names a function for every annotated call site, keyed `<file>#<decision point id>`.
- Readings the bead leaves open, stated so that a ruling can replace them:
  - The audit lives at `docs/workbench/control-loop-audit.md` (bead note: "the text mandates the audit, not where it is housed").
  - The settings schema keys are the dotted keys of the `SubagentsSettings` interface tree of `src/settings.ts`, compared as the whole schema in both directions.
  - The fallback function is checked for a name, not resolved to a declaration.
- Residuals, each named and pinned by a quiet row: RES-1, a gp binary named only by configuration or environment; RES-2, a binary name built by concatenation; RES-3, the caller of a local gp wrapper (the wrapper's own literal is the call site).
- Frozen shape (standing rule 16): one row pins every judged row's table/id:pin count (77 rows in seven tables). The roster carries every judged row (table, id, label, the SHA-256 of each pin), the three residual families and all 97 registered test titles. The suite's last row judges its tables, families and registered tests against the roster, in order and both ways.
- CT battery (v2), each member applied to the census in place and restored: CT1 red=3; CT1b red=3; CT2 red=1; CT3 red=1; CT4 red=3; CT5 red=2; CT6 red=1. CT5 and CT6 are killed by the roster, the anchor outside the census.
- Red, the suite against a stub judge that has the exported API and no logic: 76 failed | 21 passed (97). The 21 that pass are the absence rows, negatives and quiet rows that a blind guard satisfies, plus the shape and roster rows, which do not read the judge. The non-vacuity row is among the 76.
- Green: 97 of 97.
- Mutants, each applied to the judge in place and restored byte-identical (sha256 checked): 31 of 31 killed, with 1 to 42 failures each. They cover every detector shape, the comment attachment rules, every finding class, the export and settings readers, and the lazy gp measurement.
- The day a cut ships the audit, the two absence rows flip by design: the document exists, and gp is measured.

## 2026-10-22 respin #1 receipt: the audit judged in its rendered view and gp read anywhere in a command line (machine seat ws-03, base b83ae19)

- Cures gate refusal #1 of cut #1 (ebb3670e, 2026-10-22T20:51:31Z), items U1 and U2, and closes its findings F3 and F6. Where this entry and the one above differ, this entry holds: the section reading ("fenced blocks are skipped") and the binary boundary are replaced as stated here. Surface: test only, the same four files and this receipt. No src file, provider string, title, label or reply text is touched.
- U1, rendered-text docs truth and the section bound. The judge reads the audit in its rendered view through the landed census binding: `docsSection` and `sectionTables` of `test/helpers/census.ts`, one binding over marked's lexer.
  - Each `## <name>` section must render exactly once at level 2, under the level-1 title `Pi control-loop audit` (AUDIT_TITLE, now part of the contract). A section runs to the next level-1 or level-2 heading.
  - A section is malformed when it carries HTML (a comment or a tag, in a table cell too), or when it does not render exactly one top-level table.
  - A cell is read as it renders, by the landed rule.
  - A field is empty when its rendered text shows no letter, number, punctuation or symbol, apart from the blank fillers U+115F, U+1160, U+3164, U+FFA0 and U+2800. A character reference counts as the character it names; a named reference that the landed rule does not decode counts as none.
- The gate's J01-J10 are falsifier rows, each reading its rendered finding. Against cut #1's judge, J01-J09 read clean, and J10 read a duplicate Configuration heading that the rendered view does not have.
- Six more falsifier rows pin the rendered-empty field class beside J09 and the rendered header: a zero-width space reference, a named reference the landed rule leaves undecoded, an empty link with a blank code span, a Hangul filler, an out-of-range reference, and a header written with inline markup and capitals. Two clean rows cover the other side: a visible character reference, and fields holding only punctuation or only a symbol.
- Two existing rows now read the rendered view:
  - FALSIFIERS-09 (a short row): the table renders an empty last field, so the row reads decision-point-invalid (empty current fixed rule) and stage 5 uncovered. It used to read a source-level cell count.
  - FALSIFIERS-14 (a second table): the second table now carries its delimiter row, because a lone pipe line renders as a paragraph, not a table.
- U2, gp anywhere in a command line. The binary shape reads gp, gp.exe, gp.cmd or gp.ps1, in any letter case.
  - Before it may stand: the start of the text, whitespace, a path separator (/ or \\), one of `` ; & | ( ` " ' `` or =. After it may stand: the end of the text, whitespace, a backslash, or one of `` ; & | ) < > ` " ' ``.
  - The gate's D01-D05, D09 and D10 are call-site rows. So are a single-quoted gp, an assigned gp, the trailing set without a space, and a require()/import() pair.
  - A quiet row pins the other side: $gp, >gp, ~gp, {gp}, x:gp, gp: and gp,.
  - The gate's own detector probe (D01-D28, unmodified) reads 9 escapes at the base and 0 at the cut.
- F3, closed: gp.ps1 (D11), GP.EXE (D12), GP and Gp.Cmd are call-site rows.
- F6, closed for A01 and A02. A comment inside a nested block, class body or object literal now annotates that block's own members. A comment trailing a later statement on the literal's line annotates that statement.
  - A03, a marker on the enclosing function, stays unannotated by the stated rule and is now a pinned row.
  - Two credited rows guard the other side: a comment inside the statement before the literal, and a comment above a statement nested in a block.
- Residuals: RES-4 is added, a gp name the shell assembles from quoted or escaped parts (`"g""p"`), as a pinned quiet row. RES-1 to RES-3 are unchanged.
- Disclosed, not cured: F4 (LOW). The roster is a literal written in the same cut, so a coordinated hollow that also edits it survives for rows with no source-of-truth anchor. Measured as CT6-full: NOT_CALL_SITES-08 removed from the cases, the frozen-shape literal, the each-liveness size and the roster reads red=0.
- Frozen shape (standing rule 16): 116 judged rows in seven tables. The roster carries all 116, the four residual families and all 136 registered test titles.
- Red: the suite against cut #1's judge, plus the two new exported constants and no logic, reads 32 failed | 104 passed (136). By item: U1 17, U2 10, F3 3, F6 2. Green: 136 of 136.
- Mutants: 59 of 59 killed, with 1 to 58 failures each. Each was applied to the judge in place and restored byte-identical (sha256 checked). They cover every detector boundary set, the letter case, the shims, the attachment rules, the rendered-view binding, the HTML and one-table rules, cell rendering, the empty-field rule, and every finding class.
- CT battery (v2), each member applied to the census in place and restored: CT1 red=3; CT1b red=3; CT2 red=1; CT3 red=1; CT4 red=3; CT5 red=2; CT6 red=1. CT5 and CT6 die through the roster.
