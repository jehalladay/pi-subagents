/**
 * wb-e9dy (RF-GRAPH-POLICY-CONTEXT-R1, program-triage-2026-10-18), the rf GraphPolicy-context census: the until-then leg of a
 * trigger-gated requirement whose gating artifact has not shipped.
 * Statement (the bead's tracker-export title, verbatim): "Gating artifact: an installed rf whose context.render envelope or
 * diagnostics carry GraphPolicy outputs (score, ranking, embedding or receipt fields; absent from context.render.schema.json at
 * 82bd879eee52). If Pi ever reads them they shall never raise coverage, tone or freshness, never surface as values and travel
 * only as bounded receipt-identity refs; until then Pi reads and claims nothing about GP."
 * Owner filing (the export notes, quoted where this file binds them): the acceptance armed on landing (ACCEPTANCE below,
 * verbatim) and the until-then duty (UNTIL_THEN below, verbatim): "Until then: a default-gate census asserts git grep
 * GraphPolicy|GraphDataIR|graph-policy over src, test, docs/workbench and qa is empty and the wb-973.11 fixture record carries
 * no such keys."
 *
 * MEASURED (read-only, by the cutting seat ws-06 of g10-work-s110, 2026-10-26, at this census's base f381c52):
 * - At the filing pin b21beb0 (the ledger hop whose export first holds the bead's row; its parent's export does not) the notes'
 *   grep, and the wider MENTION below, find nothing in the 651 files under src, test, docs/workbench and qa: the literal held.
 * - At the base, src (116 files) and qa (67) still spell nothing. test spells the GraphPolicyCLI vocabulary in 30 files and
 *   docs/workbench in 3, all landed from 2026-10-22 by the GraphPolicyCLI program's own censuses, rosters, helpers, posture
 *   section and receipts (the first, 81723fc, is wb-1xvp.4's), and none of them reads the rf envelope. THE LITERAL'S DRIFT: an
 *   empty grep over test and docs/workbench no longer holds, and holding it would mean listing those files, which reds at every
 *   later GraphPolicyCLI landing. This census keeps the literal, widened, where it still holds (src and qa: Z2) and reads the
 *   test and docs/workbench clause as the claim it guards (Z3): the rf reading tests (81 at the base: every test module that
 *   imports the rf provider, the rf observer or the wb-973.11 fixture module, directly or through a test module that does) and
 *   docs/workbench outside its GraphPolicyCLI posture homes. The excluded families are named residuals with pinned quiet rows
 *   (R-GUARDS, R-POSTURE, R-RECEIPTS); the drift itself is stated here, never pinned as a count.
 * - The wb-973.11 fixture record (test/helpers/rf-render-fixture.ts fullShapeRf, the full-shape --no-commit envelope, and its
 *   captured key roster test/fixtures/rf-result-keys.json) carries no GraphPolicy key or value and no score, ranking, embedding
 *   or receipt field: the gating artifact has not reached Pi's record of the installed rf (T).
 * - The two src readers of the envelope read named keys only: GraphPolicy-shaped plants on the full-shape envelope (a
 *   graph_policy object with program, checkpoint, backend, score, ranking, embedding and receipt; the four generic fields beside
 *   it; a provenance receipt; an info diagnostic whose metadata carries a score) change no byte of reactivefiberTopology's
 *   projection or of nativeEvidence on a clean, flagged, over-budget, not-observed or fixture-seam render, and no planted text or
 *   number reaches either (Z2). The provider relays the whole envelope to its caller, additive keys included (R-RELAY).
 * No src, docs or tracker text is edited by this cut.
 *
 * RECONCILED (cut #2, seat ws-03 of g10-work-s113, 2026-10-27, on trunk df1ce2a; two landed sibling censuses, neither amended):
 * - wb-e66.5's GP-coordination census (landing 542, test/workbench-mw-gp-coordination-census.test.ts) holds every test file to
 *   no GraphPolicyCLI or MicroPolicyCLI import and no gp or mp launch beyond a version probe (its S3), reading a call of a member
 *   named exec whose first argument is a same-file const bound to a string naming the vocabulary as a launch. Cut #1 read
 *   UNTIL_THEN through RegExp.prototype.exec, which S3 counted as one launch in this file; this file now reads it through
 *   String.prototype.match (the same result for a pattern without the g flag), so it imports nothing and launches nothing S3
 *   counts (no gp or mp launch, not even a version probe). Its spelling stays: S3 reads a test file's vocabulary as text (wb-e66.5's
 *   R-TEST-MENTION). That census reaches no rf root, so it lies outside the rf reading surface and Z3 never reads it.
 * - wb-grmo.1's speculative-context census (landing 545, test/workbench-rf-speculative-context-census.test.ts) imports the provider
 *   and the fixture module, so it is an rf reading test, and it spells the vocabulary once: the quiet-control sentence
 *   "GraphPolicyCLI predictions and policy distributions." of its docs verdict table, which restates docs/03's ownership row.
 *   R-POSTURE now names that echo and Z3 blanks it (THE JUDGE, RESIDUALS); a literal that adds any other word stays read.
 *
 * FOLLOW-UP wb-r63c (R694, from the wb-e9dy gate cmd_1fd05a81158d at landing 550; F1 leads, F2-F8 ride; seat ws-04 of
 * g10-work-s119, 2026-10-27, on trunk 88086c9):
 * - F1 the posture homes were read raw (a raw '## ' line opened a blanked section that ran to the next raw '## ' line, and Z3's
 *   posture sentence was the line after the FIRST raw heading), so the gate's G06 heading in a comment, G07 heading in a fence, G08
 *   level-1 appendix and G09 commented decoy stayed green. The homes are now read over ONE rendered view (postureHomes): the section
 *   only where the landed docsSection binding binds its rendered heading (once, under the page's level-1 title, no straddling
 *   block), bounded at the next level-1 or level-2 heading or EOF, blanked only when the blanked source renders block for block as
 *   the bound section (sectionMatches, the same view), and the row only as a body row of a rendered table; the sentence is the bound
 *   section's opening rendered paragraph (postureStatedIn), docs/03's row is read off its bound Ownership boundaries tables
 *   (sectionTables), and Z3 pins the plants (comment, fence, appendix, twice, commented row) and the docs/03 controls.
 * - F2 a case returning its roster witness as a constant (H01 Z2, H02 Q4) stayed green; every case now names a reader of the
 *   subject (READERS: its calls read off the AST, so a reader named only inside a constant witness never counts). F3 the floors
 *   counted files, not bytes, so truncated reads (H04, H03b, H06) stayed green; the judge counts
 *   the bytes it decoded per entry, every real entry must be judged whole (bytesRead, against its size on disk), byte floors sit
 *   beside the file floors, the immutable pin's judged bytes are an exact count, and every blanking keeps a file's byte length.
 * - F4 escape spellings the judge did not decode (G02 identifier, G03 regex literal, G04 shell ANSI-C) are now read, each planted in
 *   Z2; the kinds still not decoded are named in R-INTERIOR. F5 the record judge now reads the abbreviation on keys (the gate's
 *   G13/G13b gp block), planted in T3; near forms are a named residual, R-NEAR-FIELD (Q12). F6 Z2's GraphPolicy plants now sit on
 *   every object of the result tree a reader does not hold exactly (the gate's G14 block score), the strict objects measured and
 *   pinned. F7 a data file an rf reading test names joins the surface (the gate's G12), its echo strings blanked like a script's,
 *   planted in Z3; a computed name stays unread (R-GUARDS, Q3). F8 ACCEPTANCE and UNTIL_THEN are read from the owner filing only
 *   (the gate's G17), a weakened-and-quoted control of each asserted.
 *
 * FOLLOW-UP wb-b4lg (R694, from the wb-r63c gate cmd_8fd73ae79032 at landing 617; F1 leads, F2 and F3 ride; cut #1 by seat ws-01
 * of g10-work-s141, 2026-10-29, on trunk 57cb1c0; cut #2, the respin of refusal #1 (gate-prep-12 of g10-gate-s144: UNMET U1-U3, the
 * claims wider than their pins), by seat ws-04 of g10-work-s145, 2026-10-30, on trunk c2695d7; cut #3, the respin of refusal #2
 * (gate-prep-3 of g10-gate-s154: the same three classes through new members, frozen by ruling R-B136), by seat ws-04 of
 * g10-work-s153, 2026-10-30, on trunk 2459270, every named member pinned by a falsifier that reds under it). This is hop 3 of the
 * landing-550 chain (wb-e9dy, wb-r63c, wb-b4lg), so the cut takes the R739 TERMINAL enumerate-the-resolvable form: each class below
 * is listed by its resolvable surface, every member is pinned or is a named residual with its pinned quiet row, and the claims of
 * this header are re-pinned to exactly that set. The chain is terminal: a later survivor outside these classes is record-only unless
 * it contradicts a re-pinned claim.
 * - F1, THE RECORD ITEM FORMS (the wb-e9dy F5 class): the record judge reads two item forms - every key (the envelope's at any
 *   depth, its root's included, arrays by index, and the roster's four key lists) and every string value of the envelope (its
 *   root's, an object member's and an array element's) - and applies each reading to the forms it names: a MENTION to keys and
 *   values; the abbreviation gp as one of a term's words (wordsOf: split at non-letters and at camel-case humps, each word
 *   lowercased, so gp, GP and the gp of gpLayer read while gP is the words g and p) to keys and values; a field word to keys only.
 *   T3 pins each form by a plant found in the same call as the real record: MENTION keys at the result, in
 *   provenance (camel case), in a planted diagnostic's metadata, at the root, on a block (an array element's own key) and in the
 *   roster, and MENTION values at the root (operation_id), on an object member (judge_context_layers), on a block and as an array
 *   element; the abbreviation as a key (gp at the result; GP and gpLayer in the metadata; gp_trace at the root; gp_note on a block;
 *   gp_rank and gpCheckpoint in the roster) and as a value - the acceptance's
 *   own ref form rf-gp:program:checkpoint:backend as a diagnostic message and as an array element, gp as a diagnostic source and as
 *   an array element, gp.scorer on a block, GP and gpLayer as values, gp-txn-1 at the root, rfo_01gp3x (gp between digits) as an
 *   array element - while gpu-runner and gpuCount (gp inside a longer word) stay quiet; T4 plants a field word as a key at the
 *   root, at the result, on a block, in a planted diagnostic's metadata and in the roster; and each of the roster's four key lists
 *   holds a plant (T3's in the result, provenance and work keys, T4's in the work-metrics keys) (cut #2 cures U1: the gate's DJ1
 *   array-element and DJ2 case- and camel-blind members each red T3; cut #3 cures U1 again: the gate's L2-A1 roster-abbreviation
 *   and L2-A3 root-MENTION members each red T3, every other key and value cell of these readings planted beside them). A value is
 *   never a field: a string value naming a field word,
 *   and a number, boolean or null value (no words), is no GraphPolicy output field (R-FIELD-VALUE, Q13).
 * - F2, THE PLANTED POSITIONS (the wb-e9dy F6 class): Z2 plants the four fields on every object of the envelope - its root, its
 *   workspace object, the planted diagnostic's own keys and its metadata, and every result-tree object - that the reader under
 *   comparison does not hold exactly, and runs and compares each src reader on its own plants. The planted positions are read off
 *   the very envelope each reader is handed (plantedRun: the paths of its objects carrying all four leak-marked fields), per reader
 *   and per render variant, and pinned (plantedAt); outerPlanted (the clean render's positions outside the result tree) and
 *   deepPlanted (every reader's and variant's count at the floor) are counted from them, and Q10 counts the positions on the
 *   envelope the provider relays (plantedRelayed) (cut #2 cures U2: the gate's DP0, DP00, DP1, DP3 and DP4 members each change
 *   plantedAt). The handoff is pinned by each reader's own reads: plantedRun hands the reader its planted envelope through a read
 *   log (logged), so the planted positions the reader read while it ran are pinned per reader and per variant (plantedRead), and a
 *   plant-presence control (presenceOn: the planted score and receipt id read off that same handed envelope) runs beside each
 *   reader through the same plantedRun, the same compareReaders call and the same leak walk, so its planted run differs from its
 *   plain one and leaks (readersUnchanged, readerLeaks) (cut #3 cures U2: the gate's L2-B1 unplanted-handoff member empties
 *   plantedRead, and its L2-B2 self-compare member turns the control's compare unchanged). strictObjects is measured per reader on
 *   the clean render: the observer holds the root, the workspace object, the
 *   diagnostic, result.work and result.engine_metrics exactly; nativeEvidence holds none, so its plants reach the root it reads
 *   loosely.
 * - F3, THE DOCS LOCATES (the same-view class): every docs element this file matches or locates on a page it reads is read by
 *   the binding's rendered text (renderedHeading: a heading's inline source bound by docsSection in a one-heading probe section),
 *   never by marked's token text or a source spelling - postureHomes' section opening and the page title it binds that section
 *   under, and the posture heading and opening paragraph Z3's in-memory docs/03 controls edit at (renderedHeadingAt,
 *   respelledOpening, through locateControls). The re-spellings that leave the binding's rendered text unchanged are pinned as
 *   MARKUPS enumerates them, by what the binding normalizes: one per inline token kind it renders as its content's text (emphasis
 *   and strong, each by asterisks and by underscores; a code span; a link; an image, read as its alt text; a strikethrough; inline
 *   HTML, a tag and a comment; a backslash escape; a hard line break), the one character reference it decodes that spells these
 *   elements (&nbsp; for a space), whitespace (indentation and doubled spaces, a tab, and a no-break space, each collapsed by its
 *   clean()), a soft line break, and the ATX
 *   closing sequence and setext heading forms (the setext heading and title split over two lines), each on the posture heading,
 *   docs/03's title and the posture sentence where the form can spell it (the heading holds no punctuation to escape; an ATX heading
 *   or title holds no line break; inline HTML and the heading forms spell no sentence: HTML in the section reads it whole,
 *   OVER-READS). Q4 plants a page with each form's title and heading, and Z3 re-spells docs/03 with each form - the heading and the
 *   title replaced whole, the opening paragraph replaced by the form's sentence, each located through the rendered view and read
 *   back the same way (respelled) - and reads the home, the stated sentence and the decoy, changed-sentence and level-1-above locate
 *   controls on that copy through docs/03's own control path (postureControls.markup), beside the asterisk-only heading and title
 *   controls; nothing is located by docs/03's own source spelling, so a docs/03 already carrying one of these forms keeps every
 *   control (cut #2 cures U3: the gate's DF3a token-text and DF3b source-spelling members each red Q4 or Z3; cut #3 cures U3
 *   again: the gate's L2-C1 markdown-stripping member reds Q4 and Z3 on the &nbsp; form, the character reference MARKUPS had
 *   omitted, and members that keep comments, tabs or no-break spaces red on those forms). A control's own
 *   inserted text (the decoy comment, the appendix heading it splits on) is located by the spelling the control wrote. Rows match
 *   cells as sectionTables reads them (marked's cell source, inline markup kept), the one table reading the binding has, so a
 *   posture row with markup in its owner or Pi cell is read (OVER-READS, planted in Z3).
 *
 * THE JUDGE. A MENTION is the until-then pattern's words in order - "graph" then "policy", or "graph", "data" and "ir" - with any
 * run of characters that are neither letters nor digits between them (none, spaces, newlines, underscores, hyphens, dots, quotes,
 * markup, format characters), in any case: GraphPolicy, GraphPolicyCLI, graph-policy, graph_policy, GRAPH POLICY, GraphDataIR and
 * graph.data.ir each read as one. Each file's own path is read ("path"). A file holding a NUL byte is binary and its content is
 * not read. Every other file is read as raw text ("raw"); a script (.ts .tsx .mts .cts .js .jsx .mjs .cjs) also through the
 * TypeScript AST - each string-like literal by its cooked value, each template part by its cooked text, a substitution ending
 * the part, each escape-spelled identifier by its cooked name and each regular-expression literal with its \x and \u escapes
 * decoded ("cooked"), and each chain of "+" whose operands are all string literals by its folded value ("folded"); a .json file
 * also by its parsed keys and string values ("cooked"); a markup file (.md .html .htm .xml .svg) also with its numeric character
 * references and the common named entities decoded ("decoded"); a shell script (.sh .bash .zsh) also with its \x, \u, \U and
 * octal escapes decoded ("decoded"). judgeScope reads an entry list in one call, so every leg judges its planted entries after the
 * real ones: the findings must be exactly the plants', so a real mention, a hollowed judge or a result forced empty reds; it also
 * counts the bytes each entry's judge decoded. THE RECORD JUDGE (T) reads the record's items: every key of the fixture envelope at
 * any depth (its root's included, arrays by index) and every string value (the root's, an object member's and an array element's),
 * and every key of the roster's four key lists; a key or string value holding a MENTION, or whose words (split at non-letters and
 * camel-case humps, each lowercased) include the abbreviation gp, is a GraphPolicy output (wb-b4lg F1: values too), and a key whose
 * words include one of the title's field words (score, ranking, embedding, receipt) or its plural is a GraphPolicy output field (a
 * value never is: R-FIELD-VALUE). Z3 judges each rf reading test and each data file it names with the content of every ownership-row echo blanked
 * first (R-POSTURE: a string literal naming the owner as docs/03's ownership row spells it, each of its words a word of that row's
 * owner or subject cell, one of them the subject's alone), and each docs page with its rendered posture homes blanked.
 *
 * ROWS. T, the gating artifact, one pin per quoted part: T1 the trigger is unfired - ARMED: when the record carries a GraphPolicy
 * output or field, T1 reds naming the acceptance on landing as owed; T2 the record is the installed rf's capture (a captured
 * roster with a command receipt, and the fixture's cli_version and the provider's contract source on the roster's release),
 * compared as relations, so a consistent rf re-pin keeps T2 and re-reads T1, T3 and T4 on the new record; T3 the envelope, its
 * diagnostics and the roster read at floors, and the vocabulary plants (the abbreviation's on keys and on values, array elements,
 * uppercase and camel-case humps and the root's items included) found by the same call; T4
 * the field words and their plants found, and the schema pin the title records. Z, the until-then duty: Z1 the literal held at
 * the filing pin, its judged bytes an exact count, a pin plant found by the same call; Z2 every listed src and qa file spells no
 * MENTION (file, script and byte floors, every file judged whole, a plant of each reading found), and each src reader ignores the
 * GraphPolicy plants - on every envelope object it does not hold exactly, root and diagnostic included, the strict objects measured
 * and pinned per reader, and the planted positions read off the envelope each reader is handed and pinned per reader and per
 * variant, beside the planted positions the reader itself read and the plant-presence control that must change and leak - on
 * every render variant with nothing leaked by a src reader; Z3 the rf reading tests, the data files they name and docs/workbench outside the rendered posture
 * homes spell none, at file and byte floors, every file judged whole, docs/03's home bound and its posture sentence stated, the
 * rendered-view controls and plants found, and the locate controls read again on docs/03 re-spelled in each markup form; Z4 the vocabulary: the notes' pattern, its words, every spelling form read and the
 * near words quiet. Q, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote, claims and witness, the constants (READERS included) and every registered test title - is held to the
 * out-of-file roster (test/fixtures/rf-graph-policy-context-roster.json), and every case calls a reader of the subject (READERS,
 * read off the case's AST), so a case returning a constant witness reds.
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - its title, read after its requirement-id prefix, is
 * tiled in order by row T's label, the armed clause (ARMED) and row Z's label with nothing but separators (whitespace, comma,
 * semicolon, colon, period, parentheses) between them, and each row's pin quotes tile its label the same way, so a row or a pin
 * removed from ROWS, the literal, QUOTES, CLAIMS, IMPL and the roster together still reds; FIELD_WORDS are the title's own;
 * MENTION is rebuilt from the words of the notes' until-then pattern; ACCEPTANCE and UNTIL_THEN are the owner filing's own text
 * (the notes' first two blocks, so a later note quoting them never masks a replaced original; a weakened-and-quoted control of
 * each read as replaced); docs/03 renders the posture section once under its title and the row R-POSTURE names in its bound
 * Ownership boundaries tables, and the echo's words are read off that row at run time (never a literal here); the filing pin is a
 * commit of this repository.
 * CLAIMS: each quoted pin carries claims - terms tiling its quote, each naming the witness facts (top-level keys) that show it; a
 * pin's live witness holds exactly its claimed facts, each fact under one term, and no pin's live witness holds another pin's
 * claimed facts (the claims bound), so a case swap reds at the swapped pin's claims beside its roster witness.
 * RESIDUALS (named, each with its pinned quiet row): R-HOLDER this file and its roster spell the vocabulary and are excluded by
 * name (Q1); R-TRACKER the tracker export (.beads/) is not a Pi scope: the bead's own row spells it (Q2); R-GUARDS a test module
 * outside the rf reading surface - the GraphPolicyCLI program's censuses, rosters and helpers, or one that reaches the rf modules
 * only through a src module - is not read, nor is a data file no read rf reading test names (one it reaches only through a
 * computed name, a template substitution or a run-time join) (Q3); R-POSTURE a docs/workbench "## GraphPolicyCLI boundary" section
 * bound in the rendered view (to the next top-level level-1 or level-2 heading or EOF: a heading nested in a list item or a
 * blockquote inside it does not close it, the binding's own rule) and a rendered ownership-table row whose owner cell is GraphPolicyCLI and whose Pi cell opens
 * "nothing today" are not read (docs/03 holds one of each), nor is a string literal of an rf reading test or of a .json data file
 * it names that only restates docs/03's ownership row (an echo, its words read off the row: the landed wb-grmo.1 census and its
 * roster hold one each) (Q4); R-RECEIPTS docs/workbench/receipts/ records deliveries and is not read (Q5); R-ABBREVIATION "GP"
 * or "gp" alone is no MENTION in a file scan - src names a general-purpose agent gp (Q6) - while on the record a key carrying it
 * or a string value carrying it as a word is a GraphPolicy output (T3); R-COMPUTED a word assembled at run time (a concat call, a template substitution between
 * its parts, a character code) is not read (Q7); R-INTERIOR a character inside a word (a format character, a confusable letter)
 * hides it, and so does a backslash escape in a file kind whose escapes are not decoded (plain text and every kind but scripts,
 * .json, markup entities and shell scripts) or an escape kind the decoders do not read (a regex octal or control escape, a shell
 * \c or named escape) (Q8); R-BINARY a file holding a NUL byte is not read (Q9); R-RELAY the provider relays the whole envelope
 * to its caller, additive keys included, and that pass-through is not read as Pi reading them (Q10, which counts the planted positions
 * off the envelope relayed); R-GENERIC a src module
 * naming a field word (score, ranking, embedding, receipt) is no MENTION: field words are read on the record (T4) and the two
 * readers' outputs (Z2) only (Q11); R-NEAR-FIELD a record key naming a near form of a field word (rank, ranked, vector, scored)
 * outside the vocabulary and the abbreviation is no GraphPolicy output field: T4 reads the title's four words and their plurals
 * (Q12); R-FIELD-VALUE a record value is never a GraphPolicy output field: a string value naming a field word (a diagnostic message
 * "score 0.9") and a number, boolean or null under a key that names none are no field - T4 reads field words on keys only, the
 * title's "fields" - while a value holding a MENTION or the abbreviation is a GraphPolicy output (T3) (Q13).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together, its claims
 * rewritten with them; a plant or control edited in IMPL and the roster together; a floor lowered with the roster; a residual row
 * removed from ROWS, the literal, IMPL, RESIDUALS and the roster (no outside anchor names the residual families); the
 * outside-anchor case or the closing case removed with its roster title; a case that calls a reader and discards what it read
 * (the reader-keeping constant: the judged set requires a reader's call, not the use of its result); a judge edited to judge
 * less of an entry than the bytes it counts (the count is taken from the text the judge decodes, not from each reading of it).
 * ARMED HALF PENDING: the clause ARMED (a GraphPolicy output read only as one bounded rf-gp:<program>:<checkpoint>:<backend> ref
 * and one note, never raising coverage, tone or freshness, never surfacing a value) has nothing to read until rf ships one; no
 * GraphPolicy reader is added or faked here. T1 binds it: the census reds with ACCEPTANCE the moment the record carries one.
 * OVER-READS (disclosed; none today): any "graph ... policy" prose reads as a mention, across a line break or punctuation
 * included ("the dependency graph. Policy ..."), and so does "graph data ir" opening a longer word; a shell backslash escape is
 * decoded wherever it stands (inside single quotes too); a posture section carrying HTML (planted in Z3, wb-b4lg U3), or one the
 * blanked source does not render as block for block, is read whole; a data file is in the surface when any read member spells its
 * file name, a comment included; a record string value whose words include gp reads as a GraphPolicy output wherever it stands (an
 * id whose letters between digits run gp, such as rfo_01gp3x, included and planted in T3; none today); a heading whose rendered text
 * needs the rest of its page (a reference link defined elsewhere on it) is probed alone by renderedHeading, so a posture section
 * under it is read whole (planted in Z3); a posture row whose owner or Pi cell carries inline markup is read (planted in Z3); a
 * character reference the binding does not decode (any but the amp, lt, gt, quot, nbsp, #39 and #x27 references) re-spells a
 * heading, title or sentence in the binding's reading, so its home is unbound and read whole (wb-b4lg F3).
 * ECHO BOUND (disclosed): an echo literal is blanked whatever its test does with it, so a literal made only of the ownership row's
 * words ("GraphPolicyCLI learned scores") used as a key or a lookup would go unread by Z3; at df1ce2a the one echo in the surface
 * is wb-grmo.1's quiet-control sentence (and, from wb-r63c, its roster's copy of it). A comment, an identifier, a template with a
 * substitution or a literal that adds any word outside the row (a verb such as "read") is never an echo.
 * SCOPE: files git ignores (node_modules/, .forge/ and the rest of .gitignore) and files deleted from the worktree are not
 * listed; the installed rf and ReactiveFiberCLI's repository are never read (the default gate is hermetic: the record is Pi's).
 * READS (contacts): every listed src, qa and docs/workbench file and every test module (for its imports and file names; the rf
 * reading surface and the data files it names for their content) (Z2, Z3), docs/03's posture section and Ownership boundaries
 * tables through the rendered binding (Z3, Q4, the outside anchors), git objects at the filing pin (Z1), the tracker export row of
 * wb-e9dy (its owner filing), test/fixtures/rf-result-keys.json, the fixture module's fullShapeRf and the provider's contract source
 * (T); the observer, nativeEvidence and the injected provider registration run in memory (Z2, Q10), the two readers each handed
 * its envelopes through a read log (Z2).
 *
 * Display paths added: none (test-only; src/ is read and run in memory, never edited). Scratch: none - every plant is an
 * in-memory entry judged by the same call as the real files, and the readers run on in-memory envelopes; nothing is written to
 * disk.
 */
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { docsSection, sectionMatches, sectionTables } from "./helpers/census.js";
import { fullShapeRf, readRfResultRoster } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-e9dy";
const REQUIREMENT = "RF-GRAPH-POLICY-CONTEXT-R1";
const EXPORT = ".beads/issues.jsonl";
const TRACKER = ".beads/";
const CENSUS_FILE = "test/workbench-rf-graph-policy-context-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-graph-policy-context-roster.json";
const HOLDERS: readonly string[] = [CENSUS_FILE, ROSTER_FILE];
/** This file's own path: a copy run from another path excludes itself beside the named holders. */
const SELF = relative(REPO, fileURLToPath(import.meta.url)).split("\\").join("/");
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const OBSERVER = "src/workbench/reactivefiber-observer.ts";
const FIXTURE_MODULE = "test/helpers/rf-render-fixture.ts";
const KEY_ROSTER = "test/fixtures/rf-result-keys.json";
/** The rf modules whose importers form the rf reading surface (Z3). */
const SURFACE_ROOTS: readonly string[] = [PROVIDER, OBSERVER, FIXTURE_MODULE];
const DOCS_SCOPE = "docs/workbench/";
const RECEIPTS = "docs/workbench/receipts/";
const DOCS03 = "docs/workbench/03-architecture-and-ownership.md";
/** docs/03's page title: the one parent heading its posture section is bound under (the landed docsSection binding, D9; wb-r63c F1). */
const DOCS03_TITLE = `03 ${String.fromCodePoint(0x2014)} High-level architecture, module ownership and dataflow`;
const POSTURE_SECTION = "## GraphPolicyCLI boundary";
/** The posture section's rendered heading text: POSTURE_SECTION without its level-2 marker. */
const POSTURE_HEADING = POSTURE_SECTION.slice("## ".length);
/** docs/03's section whose rendered table holds the ownership row (sectionTables binds the row to it; wb-r63c F1). */
const OWNERSHIP_HEADING = "Ownership boundaries";
const POSTURE_OWNER = "GraphPolicyCLI";
const POSTURE_CELL = "nothing today";
const POSTURE_SENTENCE = "Pi carries no GraphPolicyCLI (gp) integration today.";
const PI_SCOPES: readonly string[] = ["src/", "qa/"];
const PIN_SCOPES: readonly string[] = ["src/", "test/", "docs/workbench/", "qa/"];
const FILING_PIN = "b21beb0f89ad49500069403c4815d58f2825b414";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS: readonly string[] = ["reactivefiber:render"];
/** The in-memory envelopes' workspace root: an identity string, never a directory. */
const WORKSPACE = "/workspace/wb-e9dy-census";
/** The title's armed clause: it binds when rf ships a GraphPolicy output, so it has no judged row today (ARMED HALF PENDING). */
const ARMED =
  "If Pi ever reads them they shall never raise coverage, tone or freshness, never surface as values and travel only as bounded receipt-identity refs";
const ACCEPTANCE =
  "Acceptance, armed on landing (freeze-and-flip like wb-973.13): a fixture envelope carrying hypothetical GP fields on a clean envelope projects byte-identical except at most one bounded rf-gp:<program>:<checkpoint>:<backend> ref and one note; on a flagged, over-budget, fixture-seam or non-observed envelope it stays partial/unknown (one-directional, mirroring wb-693.3 and wb-973.10); the SECRET- leak walk shows no score numeric, embedding or receipt text in any surfaced string.";
const UNTIL_THEN =
  "Until then: a default-gate census asserts git grep GraphPolicy|GraphDataIR|graph-policy over src, test, docs/workbench and qa is empty and the wb-973.11 fixture record carries no such keys.";
/** The owner's filing in the export notes opens with this marker: its first two blocks are the filing (wb-r63c F8). */
const OWNER_FILING = "Owner filing (";
/** A mention of GraphPolicy: the until-then pattern's words, any non-alphanumeric run between them, any case (THE JUDGE). */
const MENTION = /graph[^\p{L}\p{N}]*(?:policy|data[^\p{L}\p{N}]*ir)/giu;
const MENTION_ONE = new RegExp(MENTION.source, "iu");
const SCRIPT = /\.(?:[cm]?[jt]sx?)$/;
const JSON_FILE = /\.json$/;
const MARKUP = /\.(?:md|html?|xml|svg)$/;
/** A shell script, whose backslash escapes are decoded (wb-r63c F4). */
const SHELL = /\.(?:sh|bash|zsh)$/;
/** The record-side abbreviation: a record key or string value whose words include it is a GraphPolicy output (wb-r63c F5 keys,
 * wb-b4lg F1 values). */
const ABBREVIATION = "gp";
/** The acceptance's own bounded ref form with its placeholders read as words (rf-gp:program:checkpoint:backend): T3's value plant of
 * a GraphPolicy output carried as a diagnostic message (wb-b4lg F1, the gate's P1 shape). String.prototype.match, never exec. */
const GP_REF_FORM = (ACCEPTANCE.match(/rf-gp(?::<[a-z]+>)+/)?.[0] ?? "-").replace(/[<>]/g, "");
/** The title's GraphPolicy output fields, in its order (the anchor case reads them off the title). */
const FIELD_WORDS: readonly string[] = ["score", "ranking", "embedding", "receipt"];
const FLOORS = {
  piFiles: 150,
  piScripts: 140,
  piBytes: 2_500_000,
  surfaceFiles: 60,
  surfaceData: 50,
  docsFiles: 20,
  claimBytes: 5_500_000,
  envelopeItems: 140,
  rosterKeys: 40,
  deepObjects: 18,
} as const;
/** Spellings each read as one MENTION (Z4) and near words read as none. */
const SPELLINGS: readonly string[] = [
  "GraphPolicy", "GraphPolicyCLI", "graph-policy", "graph_policy", "graphpolicy", "GRAPH POLICY", "graph.policy", "graph\npolicy",
  "GraphDataIR", "graph_data_ir", "graph.data.ir",
];
const NEAR_WORDS: readonly string[] = [
  "graph_revision_id", "necessity_policy_revision_id", "graph", "policy", "policy graph", "graph impact", "graph data", "gp", "GP",
];
/** The path of the envelope's root object: Z2's planted positions start there, not at the result (wb-b4lg F2). */
const ENVELOPE_ROOT = "envelope";
/** The two src readers of the envelope, each run and compared on its own plants (wb-b4lg F2). */
const READER_KINDS = ["topology", "evidence"] as const;
type ReaderKind = (typeof READER_KINDS)[number];
/** The probe section's heading renderedHeading binds a heading's inline source under (wb-b4lg F3). */
const HEADING_PROBE = "probe";
/** The heading-read spellings (wb-b4lg F3, the gate's P5 shape): the posture heading and docs/03's title, each re-spelled with inline
 * emphasis that leaves its rendered text unchanged (held to the roster, so a plant or control stripped of its markup reds). */
const EMPHASIZED_HEADING = `## ${POSTURE_HEADING.replace(POSTURE_OWNER, `*${POSTURE_OWNER}*`)}`;
const EMPHASIZED_TITLE = `# ${DOCS03_TITLE.replace("High-level", "*High-level*")}`;
/** The link and image re-spellings' target: an identity string, never fetched (wb-b4lg U3). */
const LINK_TARGET = "https://example.invalid/wb-b4lg";
/** docs/03's title word the inline re-spellings wrap. */
const TITLE_WORD = "High-level";
/** One re-spelling of the three docs elements this file locates (wb-b4lg U3): the posture heading's source line, docs/03's title
 * line and the posture sentence, each null where the form cannot spell it. */
interface Markup {
  readonly heading: string | null;
  readonly title: string | null;
  readonly sentence: string | null;
}
/** The three elements with one word each wrapped in inline markup: the owner in the heading and the sentence, TITLE_WORD in the title. */
function wrapped(open: string, close: string): Markup {
  const wrap = (text: string, word: string): string => text.replace(word, `${open}${word}${close}`);
  return { heading: `## ${wrap(POSTURE_HEADING, POSTURE_OWNER)}`, title: `# ${wrap(DOCS03_TITLE, TITLE_WORD)}`, sentence: wrap(POSTURE_SENTENCE, POSTURE_OWNER) };
}
/** A no-break space (U+00A0): JavaScript's \s, so the binding's clean() collapses it like a space (wb-b4lg U3, cut #3). */
const NO_BREAK_SPACE = String.fromCodePoint(0xa0);
/**
 * The re-spellings that leave the binding's rendered text unchanged (wb-b4lg U3, the F3 enumeration), by what the binding normalizes:
 * one per inline token kind it renders as its content's text - emphasis and strong by both delimiters, a code span, a link, an image
 * (its alt text), a strikethrough, inline HTML (a tag and a comment), a backslash escape and a hard line break - plus the one character
 * reference its decode() reads that can spell these elements (&nbsp; for a space: the amp, lt, gt, quot, #39 and #x27 references spell
 * characters none of them holds), whitespace (indentation and doubled spaces, a tab and a no-break space, each of which its clean()
 * collapses), a soft line break, and the ATX closing sequence and setext heading forms (the setext heading
 * and title each split over two lines). A form spells no element it cannot: the heading holds no punctuation to escape, an ATX
 * heading or title holds no line break, inline HTML in the section reads it whole (OVER-READS), and the heading forms spell no
 * sentence. Held to the roster, so a plant or control stripped of its markup reds.
 */
const MARKUPS: Readonly<Record<string, Markup>> = {
  "emphasis-asterisk": wrapped("*", "*"),
  "emphasis-underscore": wrapped("_", "_"),
  "strong-asterisk": wrapped("**", "**"),
  "strong-underscore": wrapped("__", "__"),
  "code-span": wrapped("`", "`"),
  link: wrapped("[", `](${LINK_TARGET})`),
  image: wrapped("![", `](${LINK_TARGET})`),
  strikethrough: wrapped("~~", "~~"),
  "inline-html": { ...wrapped("<span>", "</span>"), sentence: null },
  "inline-comment": { heading: `## ${POSTURE_HEADING.replace(" ", "<!-- c --> ")}`, title: `# ${DOCS03_TITLE.replace(TITLE_WORD, `${TITLE_WORD}<!-- c -->`)}`, sentence: null },
  "character-reference": {
    heading: `## ${POSTURE_HEADING.replace(" ", "&nbsp;")}`,
    title: `# ${DOCS03_TITLE.replace(` ${TITLE_WORD}`, `&nbsp;${TITLE_WORD}`)}`,
    sentence: POSTURE_SENTENCE.replace(" (gp)", "&nbsp;(gp)"),
  },
  escape: { heading: null, title: `# ${DOCS03_TITLE.replace("-", "\\-")}`, sentence: POSTURE_SENTENCE.replace("(gp)", "\\(gp\\)") },
  "hard-break": { heading: null, title: null, sentence: POSTURE_SENTENCE.replace(" (gp)", "  \n(gp)") },
  "soft-break": { heading: null, title: null, sentence: POSTURE_SENTENCE.replace(" (gp)", "\n(gp)") },
  whitespace: { heading: ` ##  ${POSTURE_HEADING.replace(" ", "  ")}`, title: ` #  ${DOCS03_TITLE.replace(", ", ",  ")}`, sentence: ` ${POSTURE_SENTENCE.replace(" no ", "  no ")}` },
  tab: { heading: `##\t${POSTURE_HEADING.replace(" ", "\t")}`, title: `#\t${DOCS03_TITLE.replace(", ", ",\t")}`, sentence: POSTURE_SENTENCE.replace(" no ", "\tno ") },
  "no-break-space": {
    heading: `## ${POSTURE_HEADING.replace(" ", NO_BREAK_SPACE)}`,
    title: `# ${DOCS03_TITLE.replace(", ", `,${NO_BREAK_SPACE}`)}`,
    sentence: POSTURE_SENTENCE.replace(" no ", `${NO_BREAK_SPACE}no `),
  },
  "atx-closing": { heading: `${POSTURE_SECTION} ##`, title: `# ${DOCS03_TITLE} #`, sentence: null },
  setext: {
    heading: `${POSTURE_HEADING.replace(" ", "\n")}\n${"-".repeat(POSTURE_HEADING.length)}`,
    title: `${DOCS03_TITLE.replace(", ", ",\n")}\n${"=".repeat(DOCS03_TITLE.length)}`,
    sentence: null,
  },
};
/** Distinct leak markers the GraphPolicy plants carry: a text prefix and three numbers no reader computes. */
const LEAK_TEXT = "SECRET-GP-";
const LEAK_SCORE = 0.918273645;
const LEAK_EMBEDDING: readonly number[] = [0.123456789, 0.987654321];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for T and Z, to the bead's export title. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label:
      "Gating artifact: an installed rf whose context.render envelope or diagnostics carry GraphPolicy outputs (score, ranking, embedding or receipt fields; absent from context.render.schema.json at 82bd879eee52)",
    pins: ["T1", "T2", "T3", "T4"],
  },
  { id: "Z", label: "until then Pi reads and claims nothing about GP", pins: ["Z1", "Z2", "Z3", "Z4"] },
  {
    id: "Q",
    label: "the residuals: each named family pinned by its quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13"],
  },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "Gating artifact",
  T2: "an installed rf",
  T3: "whose context.render envelope or diagnostics carry GraphPolicy outputs",
  T4: "score, ranking, embedding or receipt fields; absent from context.render.schema.json at 82bd879eee52",
  Z1: "until then",
  Z2: "Pi reads",
  Z3: "and claims nothing",
  Z4: "about GP",
};
/** Each quoted pin's claims: terms tiling its quote, each naming the witness facts that show it. */
const CLAIMS: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> = {
  T1: { "Gating artifact": ["fired", "recordFindings"] },
  T2: { "an installed": ["source", "receiptIsCommand"], rf: ["fixtureMatchesRoster", "contractMatchesRoster"] },
  T3: {
    "whose context.render envelope": ["envelopeAtFloor", "rosterAtFloor"],
    "or diagnostics": ["diagnosticsRead"],
    "carry GraphPolicy outputs": ["vocabularyFindings", "vocabularyPlants"],
  },
  T4: {
    "score, ranking, embedding or receipt fields": ["fieldWords", "fieldFindings", "fieldPlants"],
    "absent from context.render.schema.json at 82bd879eee52": ["schemaPin"],
  },
  Z1: { "until then": ["filingPin", "filedAtPin", "absentBeforePin", "pinFiles", "pinBytes", "pinFindings", "pinPlant"] },
  Z2: {
    Pi: ["scope", "filesAtFloor", "scriptsAtFloor", "bytesRead", "bytesAtFloor"],
    reads: ["piFindings", "piPlants", "readersUnchanged", "variantsLive", "readerControls", "readerLeaks", "strictObjects", "deepPlanted", "outerPlanted", "plantedAt", "plantedRead"],
  },
  Z3: {
    "and claims": ["claimScope", "surfaceAtFloor", "recordRead", "dataRead", "docsAtFloor", "bytesRead", "bytesAtFloor", "postureStated", "postureHome", "postureControls"],
    nothing: ["claimFindings", "claimPlants"],
  },
  Z4: { about: ["untilThenPattern", "patternWords"], GP: ["spellingForms", "nearWordsQuiet"] },
};
/** Each residual family and its quiet row. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-HOLDER": "Q1",
  "R-TRACKER": "Q2",
  "R-GUARDS": "Q3",
  "R-POSTURE": "Q4",
  "R-RECEIPTS": "Q5",
  "R-ABBREVIATION": "Q6",
  "R-COMPUTED": "Q7",
  "R-INTERIOR": "Q8",
  "R-BINARY": "Q9",
  "R-RELAY": "Q10",
  "R-GENERIC": "Q11",
  "R-NEAR-FIELD": "Q12",
  "R-FIELD-VALUE": "Q13",
};
/**
 * The functions that read the subject - the listing and the files, the filing pin, the record, the tracker export, docs/03,
 * the src readers and the provider, or the judge itself: every case must name one (direct names only), so a case returning a
 * constant witness reds (wb-r63c F2; the wb-6c6i and kjg9.1 judged-set precedent).
 */
const READERS: readonly string[] = [
  "listing",
  "piVerdict",
  "claimVerdict",
  "claimReading",
  "pinEntries",
  "judgeScope",
  "judgeRecord",
  "realRecord",
  "keyRoster",
  "fixtureEnvelope",
  "exportRow",
  "textOf",
  "git",
  "readersOn",
  "registerReactiveFiberRender",
  "untilThenPattern",
  "mentions",
  "postureHomes",
];

interface RosterPin {
  readonly id: string;
  readonly quote: string | null;
  readonly claims: JsonObject | null;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(json);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, json(member)]));
  throw new Error(`not a JSON value: ${typeof value}`);
}
function objectOf(value: unknown, field: string): JsonObject {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as JsonObject;
}
/** The object at `key` of `holder`, itself (never a copy), or an error naming the key. */
function member(holder: JsonObject, key: string): JsonObject {
  const value = holder[key];
  if (!isObject(value)) throw new Error(`${key} must be an object`);
  return value as JsonObject;
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) {
    throw new Error("roster must be an object with bead, constants, tests and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      const quote = typeof pin.quote === "string" ? pin.quote : null;
      const claims = isObject(pin.claims) ? objectOf(pin.claims, `roster rows[${index}].pins[${at}].claims`) : null;
      return { id: pin.id, quote, claims, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const tests = raw.tests.map((title: unknown, index: number): string => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a string`);
    return title;
  });
  return { bead: raw.bead, constants: objectOf(raw.constants, "roster constants"), tests, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The functions a case's source calls - an identifier or member callee, through parentheses and the comma form a transform gives
 * an imported binding - read through the AST, so a reader's name inside a string or a constant witness never counts (wb-r63c F2). */
function callsOf(source: string): Set<string> {
  const file = ts.createSourceFile("case.ts", `(${source})`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const names = new Set<string>();
  const callee = (node: ts.Expression): string | undefined => {
    if (ts.isParenthesizedExpression(node)) return callee(node.expression);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) return callee(node.right);
    if (ts.isIdentifier(node)) return node.text;
    return ts.isPropertyAccessExpression(node) ? node.name.text : undefined;
  };
  const visit = (node: ts.Node): void => {
    const name = ts.isCallExpression(node) ? callee(node.expression) : undefined;
    if (name !== undefined) names.add(name);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return names;
}
function lazy<T>(make: () => T): () => T {
  let held: { readonly value: T } | undefined;
  return () => {
    if (held === undefined) held = { value: make() };
    return held.value;
  };
}
function git(args: readonly string[], input?: string): Buffer {
  return execFileSync("git", ["-C", REPO, ...args], { input, maxBuffer: 1024 * 1024 * 1024 });
}
function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function sorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort();
}

interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
/** One row of the tracker export (one JSON object per line), found by its id. */
function exportRow(id: string): ExportRow {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(id)) continue;
    const parsed: unknown = JSON.parse(line);
    if (isObject(parsed) && parsed.id === id && typeof parsed.title === "string") return { title: parsed.title, notes: typeof parsed.notes === "string" ? parsed.notes : "" };
  }
  throw new Error(`the tracker export holds no row ${id}`);
}
/** The owner's filing in the export notes: their first two blocks, the first opening "Owner filing (" ("" otherwise), so a later
 * note quoting the filing never stands in for a replaced original (wb-r63c F8). */
function ownerFiling(notes: string): string {
  const blocks = notes.split("\n\n");
  return blocks[0]?.startsWith(OWNER_FILING) === true ? blocks.slice(0, 2).join("\n\n") : "";
}
/** The quotes tile the text in order, with nothing but separators between them (and after the last). */
function tiles(text: string, quotes: readonly string[], separators: RegExp = /^[\s,;:.()]*$/): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = text.indexOf(quote, at);
    if (quote === "" || found < 0 || !separators.test(text.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(text.slice(at));
}
/** The words of a term at non-letters and camel-case humps, lowercased: GraphDataIR -> graph, data, ir; gpReceipt -> gp, receipt. */
function wordsOf(term: string): string[] {
  return term
    .split(/[^\p{L}\p{N}]+/u)
    .flatMap(part => part.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? [])
    .map(word => word.toLowerCase());
}
/** The notes' until-then grep pattern, read off UNTIL_THEN. String.prototype.match, never RegExp.prototype.exec: the landed
 * wb-e66.5 census (test/workbench-mw-gp-coordination-census.test.ts S3) reads an `exec` member call whose argument is a same-file
 * string const naming the vocabulary as a gp launch, and this file launches nothing. */
function untilThenPattern(): string {
  return UNTIL_THEN.match(/git grep (\S+) over /)?.[1] ?? "-";
}
/** MENTION's source, rebuilt from the pattern: its alternatives' distinct word sequences under their shared first word, each word
 * joined to the next by a separator run (the anchor case compares the two). */
function mentionSource(pattern: string): string {
  const sequences: string[][] = [];
  for (const term of pattern.split("|")) {
    const words = wordsOf(term);
    if (!sequences.some(sequence => isDeepStrictEqual(sequence, words))) sequences.push(words);
  }
  const first = sequences[0]?.[0] ?? "-";
  if (!sequences.every(sequence => sequence[0] === first && sequence.length > 1)) return "-";
  const separator = "[^\\p{L}\\p{N}]*";
  return `${first}${separator}(?:${sequences.map(sequence => sequence.slice(1).join(separator)).join("|")})`;
}
/** The title's GraphPolicy output fields: the words before " fields;" in its parenthesis. */
function titleFieldWords(statement: string): string[] {
  return (/ outputs \(([^;]+) fields;/.exec(statement)?.[1] ?? "").split(/, | or /).filter(Boolean);
}

type Form = "raw" | "cooked" | "folded" | "decoded" | "path";
interface Entry {
  readonly path: string;
  readonly bytes: Buffer;
}
interface ScopeVerdict {
  readonly files: number;
  readonly scripts: number;
  readonly binaries: readonly string[];
  readonly findings: { readonly [path: string]: readonly Form[] };
  /** The UTF-8 bytes of the text each entry's judge decoded (0 for a binary, whose content is not read; wb-r63c F3). */
  readonly sizes: { readonly [path: string]: number };
}
function entry(path: string, text: string): Entry {
  return { path, bytes: Buffer.from(text, "utf8") };
}
function mentions(text: string): boolean {
  return MENTION_ONE.test(text);
}
function scriptKind(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
/** A "+" chain whose operands are all string literals, folded; undefined for any other operand. */
function folded(node: ts.Expression): string | undefined {
  if (ts.isParenthesizedExpression(node)) return folded(node.expression);
  if (ts.isStringLiteralLike(node)) return node.text;
  if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return undefined;
  const left = folded(node.left);
  const right = folded(node.right);
  return left === undefined || right === undefined ? undefined : left + right;
}
function isPlus(node: ts.Node): boolean {
  return ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
}
/** An escaped backslash, kept as written, or a code-point escape decoded; anything else is kept. */
function decodedPoint(whole: string, digits: string | undefined, radix: number): string {
  const point = digits === undefined ? Number.NaN : Number.parseInt(digits, radix);
  return Number.isNaN(point) || point > 0x10ffff ? whole : String.fromCodePoint(point);
}
/** A regular-expression literal's source with its \xHH, \uHHHH and \u{H...} escapes decoded (wb-r63c F4). */
function decodedRegex(text: string): string {
  return text.replace(/\\\\|\\x([0-9a-fA-F]{2})|\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})/g, (whole: string, hex?: string, braced?: string, four?: string) =>
    whole === "\\\\" ? whole : decodedPoint(whole, hex ?? braced ?? four, 16),
  );
}
/** A shell script with its backslash escapes decoded - \xHH, \uHHHH, \UHHHHHHHH and octal \NNN - wherever they stand: ANSI-C quoting,
 * printf and echo -e read them alike (wb-r63c F4). */
function decodedShell(text: string): string {
  return text.replace(/\\\\|\\x([0-9a-fA-F]{1,2})|\\u([0-9a-fA-F]{1,4})|\\U([0-9a-fA-F]{1,8})|\\([0-7]{1,3})/g, (whole: string, hex?: string, four?: string, eight?: string, octal?: string) =>
    whole === "\\\\" ? whole : octal !== undefined ? decodedPoint(whole, octal, 8) : decodedPoint(whole, hex ?? four ?? eight, 16),
  );
}
/** A script's cooked string literals and template parts, its escape-spelled identifiers by their cooked names, its regular-expression
 * literals with their escapes decoded, and its folded literal chains (outermost chain only). */
function scriptUnits(path: string, text: string): { readonly form: Form; readonly text: string }[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  const units: { form: Form; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) units.push({ form: "cooked", text: node.text });
    else if (ts.isTemplateExpression(node)) {
      units.push({ form: "cooked", text: node.head.text });
      for (const span of node.templateSpans) units.push({ form: "cooked", text: span.literal.text });
    } else if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && node.getText(source).includes("\\")) {
      units.push({ form: "cooked", text: node.text });
    } else if (ts.isRegularExpressionLiteral(node)) units.push({ form: "cooked", text: decodedRegex(node.text) });
    if (isPlus(node) && !isPlus(node.parent)) {
      const value = folded(node as ts.Expression);
      if (value !== undefined) units.push({ form: "folded", text: value });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}
/** A JSON file's parsed keys and string values; an unparsable file has none (its raw text is still read). */
function jsonUnits(text: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  const units: string[] = [];
  const walk = (value: unknown): void => {
    if (typeof value === "string") units.push(value);
    else if (Array.isArray(value)) for (const item of value) walk(item);
    else if (isObject(value)) {
      for (const [key, member] of Object.entries(value)) {
        units.push(key);
        walk(member);
      }
    }
  };
  walk(parsed);
  return units;
}
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCodePoint(0xa0) };
/** Markup text with its numeric character references and the common named entities decoded; anything else is kept. */
function decodedMarkup(text: string): string {
  return text.replace(/&#x([0-9a-f]{1,6});|&#(\d{1,7});|&([a-z]+);/gi, (whole: string, hex?: string, decimal?: string, name?: string) => {
    const point = hex !== undefined ? Number.parseInt(hex, 16) : decimal !== undefined ? Number.parseInt(decimal, 10) : undefined;
    if (point !== undefined) return point <= 0x10ffff ? String.fromCodePoint(point) : whole;
    return NAMED_ENTITIES[(name ?? "").toLowerCase()] ?? whole;
  });
}
function verdictOf(path: string, bytes: Buffer): { readonly binary: boolean; readonly forms: readonly Form[]; readonly size: number } {
  const forms: Form[] = [];
  if (mentions(path)) forms.push("path");
  if (bytes.includes(0)) return { binary: true, forms, size: 0 };
  const text = bytes.toString("utf8");
  if (mentions(text)) forms.push("raw");
  if (SCRIPT.test(path)) {
    const units = scriptUnits(path, text);
    if (units.some(unit => unit.form === "cooked" && mentions(unit.text))) forms.push("cooked");
    if (units.some(unit => unit.form === "folded" && mentions(unit.text))) forms.push("folded");
  } else if (JSON_FILE.test(path) && jsonUnits(text).some(mentions)) forms.push("cooked");
  else if (MARKUP.test(path) && mentions(decodedMarkup(text))) forms.push("decoded");
  else if (SHELL.test(path) && mentions(decodedShell(text))) forms.push("decoded");
  return { binary: false, forms, size: Buffer.byteLength(text) };
}
/** Judges an entry list in one call: the file, script and binary counts, every entry's findings by form and the bytes it judged. */
function judgeScope(entries: Iterable<Entry>): ScopeVerdict {
  let files = 0;
  let scripts = 0;
  const binaries: string[] = [];
  const findings: { [path: string]: readonly Form[] } = {};
  const sizes: { [path: string]: number } = {};
  for (const item of entries) {
    files += 1;
    if (SCRIPT.test(item.path)) scripts += 1;
    const verdict = verdictOf(item.path, item.bytes);
    if (verdict.binary) binaries.push(item.path);
    if (verdict.forms.length > 0) findings[item.path] = verdict.forms;
    sizes[item.path] = verdict.size;
  }
  return { files, scripts, binaries, findings, sizes };
}
/** The real (unplanted, text) entries of a verdict whose judged bytes differ from their file's size on disk ([] when every real
 * file was judged whole), and the judged bytes of the real entries (wb-r63c F3: a floor of bytes, not only of files). */
function bytesJudged(verdict: ScopeVerdict, plants: readonly string[]): { readonly short: readonly string[]; readonly total: number } {
  const real = Object.keys(verdict.sizes).filter(path => !plants.includes(path) && !verdict.binaries.includes(path));
  return {
    short: real.filter(path => verdict.sizes[path] !== lstatSync(join(REPO, path)).size),
    total: real.reduce((sum, path) => sum + (verdict.sizes[path] ?? 0), 0),
  };
}
/** The findings of the given paths (within) or of every other path (not within). */
function findingsFor(verdict: ScopeVerdict, paths: readonly string[], within: boolean): { [path: string]: Form[] } {
  return Object.fromEntries(Object.entries(verdict.findings).filter(([path]) => paths.includes(path) === within).map(([path, forms]) => [path, [...forms]]));
}

/** Every listed file: tracked plus untracked-not-ignored, present in the worktree as a regular file. */
const listing = lazy((): string[] =>
  sorted(
    git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"])
      .toString("utf8")
      .split("\0")
      .filter(path => path !== "" && existsSync(join(REPO, path)) && lstatSync(join(REPO, path)).isFile()),
  ),
);
function excluded(path: string): boolean {
  return HOLDERS.includes(path) || path === SELF || path.startsWith(TRACKER);
}

/** Planted src and qa entries, one per reading (Z2). */
const PI_PLANTS: Readonly<Record<string, string>> = {
  "src/workbench/zz-plant-raw.ts": "// reads the GraphPolicy score of a render\nexport const plantRaw = 1;\n",
  "src/workbench/zz-plant-cooked.ts": 'export const plantCooked = "graph\\u005fpolicy";\n',
  "src/workbench/zz-plant-folded.ts": 'export const plantFolded = "Gra" + "phPolicy";\n',
  "src/workbench/zz-plant-template.ts": ["export const plantTemplate = (x: string): string => `\\u0047raphPolicy $", "{x}`;\n"].join(""),
  "qa/zz-plant-escaped.json": '{"\\u0047raphDataIR": 1}\n',
  "qa/zz-plant-entity.md": "Graph&#80;olicy\n",
  "qa/GraphPolicy-plant.txt": "plain\n",
  "src/workbench/zz-plant-identifier.ts": "export const \\u0047raphPolicy = 1;\n",
  "src/workbench/zz-plant-regex.ts": "export const plantRegex = /Graph\\x50olicy/;\n",
  "qa/zz-plant-ansi.sh": "printf '%s\\n' $'\\x47raphPolicy'\n",
};
const piVerdict = lazy((): ScopeVerdict => {
  const real = listing().filter(path => PI_SCOPES.some(scope => path.startsWith(scope)) && !excluded(path));
  return judgeScope([...real.map(path => ({ path, bytes: readFileSync(join(REPO, path)) })), ...Object.entries(PI_PLANTS).map(([path, text]) => entry(path, text))]);
});

/** Blanked text: every character but a line break becomes spaces of its UTF-8 byte length, so a masked file keeps its size. */
function blank(text: string): string {
  return text.replace(/[^\n]/gu, character => " ".repeat(Buffer.byteLength(character)));
}
/** The text with every span blanked, spans read on the original text (overlaps merged). */
function blanked(text: string, spans: readonly { readonly start: number; readonly end: number }[]): string {
  let out = "";
  let at = 0;
  for (const { start, end } of [...spans].sort((left, right) => left.start - right.start)) {
    if (end <= at) continue;
    const from = Math.max(at, start);
    out += `${text.slice(at, from)}${blank(text.slice(from, end))}`;
    at = end;
  }
  return `${out}${text.slice(at)}`;
}
/** The top-level tokens of the rendered view (the lexer of the landed docsSection binding), each at its source offset, or undefined
 * when their sources do not tile the text exactly (nothing is then blanked: the page is read whole). */
function renderedTokens(text: string): { readonly token: Token; readonly start: number }[] | undefined {
  const tokens = marked.lexer(text);
  let at = 0;
  const out = tokens.map(token => {
    const start = at;
    at += token.raw.length;
    return { token, start };
  });
  return tokens.map(token => token.raw).join("") === text ? out : undefined;
}
interface PostureHomes {
  /** The text with its bound posture section and every rendered posture row blanked (byte length kept). */
  readonly masked: string;
  /** "bound" when the section was blanked, "none" when no top-level posture heading renders, else why it was read whole. */
  readonly section: string;
  /** The rendered posture rows blanked. */
  readonly rows: number;
}
/** A heading's rendered text in the binding's own reading (wb-b4lg F3): its inline source bound by the landed docsSection as the
 * one level-6 heading of a probe section, whose rendered block text is the binding's (inline markup, escapes and inline HTML read as
 * the binding reads them) - never marked's token text, which keeps the markup. "" when the probe renders no heading block. */
function renderedHeading(heading: Tokens.Heading): string {
  const block = docsSection(`## ${HEADING_PROBE}\n\n###### ${heading.text.replace(/\n/g, " ")}\n`, HEADING_PROBE, 2, []).blocks[0];
  return block?.kind === "heading" ? block.text : "";
}
/** The first top-level heading of `depth` whose rendered text (renderedHeading) is `heading`, at its source offset with its source
 * (trailing line breaks dropped; both lines and the underline of a setext heading kept), or undefined: a heading located through the
 * rendered view, never by its source spelling (wb-b4lg F3). */
function renderedHeadingToken(text: string, depth: number, heading: string): { readonly start: number; readonly raw: string } | undefined {
  const found = (renderedTokens(text) ?? []).find(({ token }) => token.type === "heading" && (token as Tokens.Heading).depth === depth && renderedHeading(token as Tokens.Heading) === heading);
  return found === undefined ? undefined : { start: found.start, raw: found.token.raw.trimEnd() };
}
/** The source offset of that rendered heading, or -1. */
function renderedHeadingAt(text: string, depth: number, heading: string): number {
  return renderedHeadingToken(text, depth, heading)?.start ?? -1;
}
/** The text with the whole source of that rendered heading replaced by `line` (a setext heading's underline included, so a re-spelled
 * setext heading leaves no stray underline; the text unchanged when none renders). */
function respelledHeading(text: string, depth: number, heading: string, line: string): string {
  const found = renderedHeadingToken(text, depth, heading);
  return found === undefined ? text : `${text.slice(0, found.start)}${line}${text.slice(found.start + found.raw.length)}`;
}
/** The text with the opening rendered paragraph under that rendered heading (the first top-level block after it) replaced by
 * `paragraph`, located through the rendered view, never by the paragraph's source spelling (the text unchanged when none renders). */
function respelledOpening(text: string, depth: number, heading: string, paragraph: string): string {
  const opening = openingParagraph(text, depth, heading);
  return opening === undefined ? text : `${text.slice(0, opening.start)}${paragraph}${text.slice(opening.start + opening.raw.length)}`;
}
/** The opening rendered paragraph under that rendered heading (the first top-level block after it) at its source offset with its
 * source, located through the rendered view, never by the paragraph's source spelling; undefined when none renders. */
function openingParagraph(text: string, depth: number, heading: string): { readonly start: number; readonly raw: string } | undefined {
  const tokens = renderedTokens(text) ?? [];
  const at = renderedHeadingAt(text, depth, heading);
  const index = tokens.findIndex(({ start }) => start === at);
  const next = index < 0 ? undefined : tokens.slice(index + 1).find(({ token }) => token.type !== "space");
  return next === undefined || next.token.type !== "paragraph" ? undefined : { start: next.start, raw: next.token.raw.trimEnd() };
}
/** A page re-spelled in one MARKUPS form (wb-b4lg U3): the posture heading and the title, each located through the rendered view,
 * replaced whole by the form's spelling, and the posture section's opening paragraph (located the same way) replaced by the form's
 * sentence; an element the form spells as null is kept. Nothing is located by docs/03's own source spelling, so a page already
 * carrying markup is re-spelled the same way. */
function markedUp(text: string, markup: Markup): string {
  let out = markup.heading === null ? text : respelledHeading(text, 2, POSTURE_HEADING, markup.heading);
  if (markup.title !== null) out = respelledHeading(out, 1, DOCS03_TITLE, markup.title);
  return markup.sentence === null ? out : respelledOpening(out, 2, POSTURE_HEADING, markup.sentence);
}
/** Whether a re-spelled copy carries each of the form's spellings where it re-spells, read back through the rendered view: the
 * posture heading's and the title's sources and the opening paragraph's source (wb-b4lg U3: a re-spelling that fails to apply reds,
 * whatever the page's own spelling). */
function respelledIn(copy: string, markup: Markup): boolean {
  return (
    (markup.heading === null || renderedHeadingToken(copy, 2, POSTURE_HEADING)?.raw === markup.heading) &&
    (markup.title === null || renderedHeadingToken(copy, 1, DOCS03_TITLE)?.raw === markup.title) &&
    (markup.sentence === null || openingParagraph(copy, 2, POSTURE_HEADING)?.raw === markup.sentence)
  );
}
/** The locate controls on one page (wb-r63c F1's shapes; wb-b4lg U3: docs/03 and each of its re-spelled copies take this one path):
 * whether the posture sentence is still stated under a decoy commented section placed before a changed real one, under a changed
 * sentence, and under a level-1 heading inserted above the section - the heading and its opening paragraph located through the
 * rendered view. */
function locateControls(text: string): { readonly decoyCommentBeforeChanged: boolean; readonly changedSentence: boolean; readonly levelOneAbove: boolean } {
  const at = renderedHeadingAt(text, 2, POSTURE_HEADING);
  const changed = respelledOpening(text, 2, POSTURE_HEADING, "Pi reads GraphPolicyCLI scores today.");
  return {
    decoyCommentBeforeChanged: postureStatedIn(`${changed.slice(0, at)}<!--\n${POSTURE_SECTION}\n\n${POSTURE_SENTENCE}\n-->\n\n${changed.slice(at)}`),
    changedSentence: postureStatedIn(changed),
    levelOneAbove: postureStatedIn(`${text.slice(0, at)}# Appendix\n\n${text.slice(at)}`),
  };
}
/**
 * A page's posture homes (R-POSTURE) over ONE rendered view (wb-r63c F1): the "## GraphPolicyCLI boundary" section only where its
 * heading renders as a top-level level-2 heading that the landed docsSection binding binds (exactly once in the rendered view, under
 * the page's level-1 title, no HTML block or fence straddling a heading line), bounded at the next level-1 or level-2 heading or EOF,
 * and blanked only when the blanked source renders block for block as that bound section with no HTML (sectionMatches: the same
 * view); and every body row of a rendered top-level table whose owner cell is GraphPolicyCLI and whose Pi cell opens "nothing today".
 * A heading or a row in a comment, a fence or a list item renders as none, so it is no home and is read; a refused binding is read.
 */
function postureHomes(text: string): PostureHomes {
  const tokens = renderedTokens(text);
  if (tokens === undefined) return { masked: text, section: "the rendered tokens do not tile the source", rows: 0 };
  const spans: { start: number; end: number }[] = [];
  const headings = tokens.flatMap((entry, index) => (entry.token.type === "heading" ? [{ index, start: entry.start, heading: entry.token as Tokens.Heading }] : []));
  // Both headings are read by the binding's rendered text, never marked's token text (wb-b4lg F3): the opening and its page title.
  const opening = headings.find(entry => entry.heading.depth === 2 && renderedHeading(entry.heading) === POSTURE_HEADING);
  let section = "none";
  if (opening !== undefined) {
    const parents = headings
      .filter(entry => entry.index < opening.index && entry.heading.depth === 1)
      .slice(-1)
      .map(entry => renderedHeading(entry.heading));
    const bound = docsSection(text, POSTURE_HEADING, 2, parents);
    const end = headings.find(entry => entry.index > opening.index && entry.heading.depth <= 2)?.start ?? text.length;
    const same = sectionMatches(bound, docsSection(text.slice(opening.start, end), POSTURE_HEADING, 2, []).blocks);
    section = !bound.ok ? bound.why : !same.ok ? `not the same view: ${same.why}` : "bound";
    if (section === "bound") spans.push({ start: opening.start, end });
  }
  let rows = 0;
  for (const { token, start } of tokens) {
    if (token.type !== "table") continue;
    const table = token as Tokens.Table;
    const lines = table.raw.replace(/\n+$/, "").split("\n");
    if (lines.length !== table.rows.length + 2) continue;
    let at = start;
    for (const [index, line] of lines.entries()) {
      const cells = (table.rows[index - 2] ?? []).map(cell => cell.text.trim());
      if (index >= 2 && cells[1] === POSTURE_OWNER && (cells[2] ?? "").startsWith(POSTURE_CELL)) {
        spans.push({ start: at, end: at + line.length });
        rows += 1;
      }
      at += line.length + 1;
    }
  }
  return { masked: blanked(text, spans), section, rows };
}
/** docs/03's posture sentence, stated: the bound posture section (once in the rendered view, under docs/03's title, no HTML) opens
 * with a rendered paragraph that starts with POSTURE_SENTENCE (wb-r63c F1: never the first raw heading line). */
function postureStatedIn(text: string): boolean {
  const section = docsSection(text, POSTURE_HEADING, 2, [DOCS03_TITLE]);
  const first = section.blocks[0];
  return section.ok && !section.hasHtml && first?.kind === "paragraph" && first.text.startsWith(POSTURE_SENTENCE);
}
/** docs/03's rendered ownership rows R-POSTURE names: the body rows of the tables of its bound "## Ownership boundaries" section
 * (sectionTables, the same binding) whose owner cell is GraphPolicyCLI and whose Pi cell opens "nothing today", each as its cells. */
function ownershipRows(text: string): string[][] {
  return sectionTables(text, OWNERSHIP_HEADING, 2, [DOCS03_TITLE])
    .grids.flatMap(grid => grid.slice(1))
    .map(cells => cells.map(cell => cell.trim()))
    .filter(cells => cells[1] === POSTURE_OWNER && (cells[2] ?? "").startsWith(POSTURE_CELL));
}
/** The ownership row's words (R-POSTURE's echo), read off docs/03's rendered ownership rows: the owner cell's and the subject cell's. */
const echoWords = lazy((): { readonly owner: readonly string[]; readonly subject: readonly string[] } => {
  const rows = ownershipRows(textOf(DOCS03));
  return { owner: sorted(wordsOf(POSTURE_OWNER)), subject: sorted(rows.flatMap(cells => wordsOf(cells[0] ?? ""))) };
});
/** A string literal restating the ownership row (an echo): it names the owner as the owner cell spells it, every word of it is a
 * word of the row's owner or subject cell, and at least one is the subject's alone. */
function isEcho(text: string): boolean {
  const { owner, subject } = echoWords();
  const words = wordsOf(text);
  return text.includes(POSTURE_OWNER) && words.every(word => owner.includes(word) || subject.includes(word)) && words.some(word => subject.includes(word) && !owner.includes(word));
}
/** A script or a .json data file with the content of every echo string literal blanked (its quotes and line breaks kept, its byte
 * length kept), so no form reads it; every other character, a mention outside an echo included, is judged as written. */
function echoMasked(path: string, text: string): string {
  const isJson = JSON_FILE.test(path);
  if (!SCRIPT.test(path) && !isJson) return text;
  const source = isJson ? ts.parseJsonText(path, text) : ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  const spans: { readonly start: number; readonly end: number }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && isEcho(node.text)) spans.push({ start: node.getStart(source) + 1, end: node.end - 1 });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return blanked(text, spans);
}
function stem(path: string): string {
  return path.replace(SCRIPT, "");
}
/** The repository paths (without their extensions) a module's relative imports name. */
function importsOf(path: string, text: string): string[] {
  return ts
    .preProcessFile(text, true, true)
    .importedFiles.map(reference => reference.fileName)
    .filter(specifier => specifier.startsWith("./") || specifier.startsWith("../"))
    .map(specifier => stem(posix.normalize(posix.join(posix.dirname(path), specifier))));
}
/** The file names a module's text spells: every maximal run of word characters, dots and hyphens (wb-r63c F7). */
function namesIn(text: string): Set<string> {
  return new Set(text.match(/[\w.-]+/g) ?? []);
}
/** The rf reading surface: the test modules whose relative imports reach an rf root, directly or through a test module that does
 * (a fixpoint over test/ alone: a module reaching rf only through src is outside), plus the fixture record's two files and every
 * data file under test/ whose file name a read member or the fixture module spells (wb-r63c F7: the data an rf reading test reads;
 * an excluded holder's names are not read, so this census naming its own plants never reaches them). */
function surfaceOf(scripts: ReadonlyMap<string, string>, data: readonly string[]): string[] {
  const reached = new Set(SURFACE_ROOTS.map(stem));
  const members = new Set<string>();
  const imports = [...scripts].map(([path, text]) => ({ path, targets: importsOf(path, text) }));
  let grew = true;
  while (grew) {
    grew = false;
    for (const { path, targets } of imports) {
      if (members.has(path) || !targets.some(target => reached.has(target))) continue;
      members.add(path);
      reached.add(stem(path));
      grew = true;
    }
  }
  const names = new Set([...members, FIXTURE_MODULE].filter(path => !excluded(path)).flatMap(path => [...namesIn(scripts.get(path) ?? "")]));
  return sorted([...members, ...data.filter(path => names.has(posix.basename(path))), FIXTURE_MODULE, KEY_ROSTER]);
}
interface ClaimReading {
  readonly surface: readonly string[];
  readonly docs: readonly string[];
  readonly verdict: ScopeVerdict;
}
/** Z3's reading over the real tree plus `plants` (path to text): the rf reading surface, each script and .json data file with its
 * ownership-row echoes blanked, and docs/workbench outside receipts/, each docs file with its rendered posture homes blanked, judged
 * in one call. */
function claimReading(plants: Readonly<Record<string, string>>): ClaimReading {
  const paths = sorted([...listing(), ...Object.keys(plants)]);
  const textFor = (path: string): string => plants[path] ?? textOf(path);
  const tests = paths.filter(path => path.startsWith("test/"));
  const scripts = new Map(tests.filter(path => SCRIPT.test(path)).map(path => [path, textFor(path)] as const));
  const surface = surfaceOf(
    scripts,
    tests.filter(path => !SCRIPT.test(path)),
  ).filter(path => !excluded(path));
  const docs = paths.filter(path => path.startsWith(DOCS_SCOPE) && !path.startsWith(RECEIPTS) && !excluded(path));
  const entries = [...surface.map(path => entry(path, echoMasked(path, textFor(path)))), ...docs.map(path => entry(path, postureHomes(textFor(path)).masked))];
  return { surface, docs, verdict: judgeScope(entries) };
}
/** Planted claim-scope entries (Z3): a docs sentence, a GraphPolicyCLI ownership row that claims a reading, a surface test, a
 * surface test reaching the observer only through a planted test helper, and five surface tests that are no echo, one per clause
 * of the echo and its blanking: a literal naming the owner and the row's words beside a reading claim, the row's words under
 * another spelling of the vocabulary than the owner's, the owner alone, the owner beside another docs/03 row's words, and a
 * mention beside an echo on its line. The rendered-view plants (wb-r63c F1, the gate's G06-G09 class): a posture heading inside an
 * HTML comment and inside a fence, each before a claim; a bound posture section closed by a level-1 heading before a claim; a page
 * rendering the posture heading twice; a posture-shaped row inside an HTML comment. The data plant (wb-r63c F7): a surface test
 * naming a planted data file that spells the vocabulary. */
const CLAIM_PLANTS: Readonly<Record<string, string>> = {
  "docs/workbench/zz-plant-claim.md": "Pi reads GraphPolicy scores from the rf render envelope.\n",
  "docs/workbench/zz-plant-row.md": "| Learned scores | GraphPolicyCLI | read by Pi from the rf render envelope |\n",
  "test/zz-plant-surface.test.ts": 'import { reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";\n// GraphDataIR\nvoid reactivefiberTopology;\n',
  "test/helpers/zz-plant-helper.ts": 'export { fullShapeRf } from "./rf-render-fixture.js";\n',
  "test/zz-plant-transitive.test.ts": 'import { fullShapeRf } from "./helpers/zz-plant-helper.js";\n// graph-policy\nvoid fullShapeRf;\n',
  "test/zz-plant-literal.test.ts": 'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const claim = "GraphPolicyCLI predictions read by Pi.";\nvoid fullShapeRf;\n',
  "test/zz-plant-respelled.test.ts": 'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const key = "graph_policy predictions";\nvoid fullShapeRf;\n',
  "test/zz-plant-owner.test.ts": 'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const owner = "GraphPolicyCLI";\nvoid fullShapeRf;\n',
  "test/zz-plant-other-row.test.ts": 'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const row = "GraphPolicyCLI context rendering";\nvoid fullShapeRf;\n',
  "test/zz-plant-beside.test.ts":
    'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const rows = [{ text: "GraphPolicyCLI predictions and policy distributions." }]; // reads graph_policy\nvoid fullShapeRf;\n',
  "docs/workbench/zz-plant-commented.md": `<!--\n${POSTURE_SECTION}\n-->\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
  "docs/workbench/zz-plant-fenced.md": `\`\`\`\n${POSTURE_SECTION}\n\`\`\`\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
  "docs/workbench/zz-plant-appendix.md": `${POSTURE_SECTION}\n\n${POSTURE_SENTENCE}\n\n# Appendix\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
  "docs/workbench/zz-plant-twice.md": `${POSTURE_SECTION}\n\n${POSTURE_SENTENCE}\n\n${POSTURE_SECTION}\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
  "docs/workbench/zz-plant-commented-row.md": `<!--\n| Learned scores | ${POSTURE_OWNER} | ${POSTURE_CELL}; Pi reads GraphPolicy scores |\n-->\n`,
  "test/zz-plant-data.test.ts": 'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\nexport const data = "zz-plant-data.json";\nvoid fullShapeRf;\n',
  "test/fixtures/zz-plant-data.json": '{"graph_policy": {"score": 1}}\n',
  // The F3 over-reads, pinned (wb-b4lg U3): a posture section carrying HTML, a posture heading whose rendered text needs a reference
  // link defined elsewhere on its page, and a posture-shaped row whose owner cell carries markup - each page read whole.
  "docs/workbench/zz-plant-html-section.md": `${POSTURE_SECTION}\n\nPi reads <em>GraphPolicy</em> scores from the rf render envelope.\n`,
  "docs/workbench/zz-plant-reflink.md": `## [${POSTURE_OWNER}][posture] boundary\n\nPi reads GraphPolicy scores from the rf render envelope.\n\n[posture]: ${LINK_TARGET}\n`,
  "docs/workbench/zz-plant-marked-row.md": `| Subject | Owner | Pi |\n| --- | --- | --- |\n| Learned scores | **${POSTURE_OWNER}** | ${POSTURE_CELL}; Pi reads GraphPolicy scores |\n`,
};
const claimVerdict = lazy((): ClaimReading => claimReading(CLAIM_PLANTS));

interface RecordItem {
  readonly at: string;
  readonly key: string | null;
  readonly value: string | null;
}
/** Every key of `value` at any depth (arrays by index) and every string value, each at its path under `prefix`. */
function recordItems(prefix: string, value: JsonValue, path: string, out: RecordItem[]): RecordItem[] {
  if (typeof value === "string") out.push({ at: `${prefix}${path}`, key: null, value });
  else if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) recordItems(prefix, item, `${path}[${index}]`, out);
  }
  else if (value !== null && typeof value === "object") {
    for (const [key, member] of Object.entries(value)) {
      const at = path === "" ? key : `${path}.${key}`;
      out.push({ at: `${prefix}${at}`, key, value: null });
      recordItems(prefix, member, at, out);
    }
  }
  return out;
}
interface KeyLists {
  readonly resultKeys: readonly string[];
  readonly provenanceKeys: readonly string[];
  readonly workKeys: readonly string[];
  readonly workMetricsKeys: readonly string[];
}
/** The roster's four key lists, each key at the result path it names. */
function rosterItems(prefix: string, lists: KeyLists): RecordItem[] {
  const at: readonly [readonly string[], string][] = [
    [lists.resultKeys, "result"],
    [lists.provenanceKeys, "result.provenance"],
    [lists.workKeys, "result.work"],
    [lists.workMetricsKeys, "result.work_metrics"],
  ];
  return at.flatMap(([keys, base]) => keys.map(key => ({ at: `${prefix}${base}.${key}`, key, value: null })));
}
function isField(key: string): boolean {
  return wordsOf(key).some(word => FIELD_WORDS.includes(word) || (word.endsWith("s") && FIELD_WORDS.includes(word.slice(0, -1))));
}
/** A record key or string value carrying the abbreviation as one of its words (gp, gp_block, gpScore; rf-gp:program:checkpoint:backend,
 * gp.scorer): on the record a GraphPolicy output, though no MENTION in a file scan (R-ABBREVIATION; wb-r63c F5 keys, wb-b4lg F1
 * values). */
function isAbbreviated(term: string): boolean {
  return wordsOf(term).includes(ABBREVIATION);
}
interface RecordVerdict {
  readonly vocabulary: readonly string[];
  readonly fields: readonly string[];
}
function judgeRecord(items: readonly RecordItem[]): RecordVerdict {
  return {
    // Each item is read in its one form, a key or a string value, by both vocabulary readings (wb-b4lg F1: the value side too).
    vocabulary: items
      .filter(item => {
        const term = item.key ?? item.value ?? "";
        return mentions(term) || isAbbreviated(term);
      })
      .map(item => item.at),
    fields: items.filter(item => item.key !== null && isField(item.key)).map(item => item.at),
  };
}
const keyRoster = lazy(() => readRfResultRoster());
function fixtureEnvelope(): JsonObject {
  return objectOf(fullShapeRf(WORKSPACE), "the wb-973.11 fixture envelope");
}
const realRecord = lazy((): RecordItem[] => [...recordItems("fixture:", fixtureEnvelope(), "", []), ...rosterItems("roster:", keyRoster())]);
/** A copy of the fixture envelope with `plant` applied to it. */
function plantedEnvelope(plant: (envelope: JsonObject, result: JsonObject) => void): JsonObject {
  const envelope = fixtureEnvelope();
  plant(envelope, member(envelope, "result"));
  return envelope;
}
function infoDiagnostic(metadata: JsonObject): JsonObject {
  return { code: "RF_RENDER_NOTE", severity: "info", message: "m", hint: null, source: null, metadata };
}
/** The items of a planted envelope that the real record does not hold (by path and value), plus the planted roster keys: every
 * other item of the planted envelope is the real record again, so the judge reads the plants beside the real items in one call. */
function plantedItems(envelope: JsonObject, roster: KeyLists): RecordItem[] {
  const real = new Set(realRecord().map(item => JSON.stringify([item.at, item.value])));
  const prefix = "plant:";
  const planted = recordItems(prefix, envelope, "", []).filter(item => !real.has(JSON.stringify([`fixture:${item.at.slice(prefix.length)}`, item.value])));
  return [...planted, ...rosterItems("plant-roster:", roster)];
}
const NO_KEYS: KeyLists = { resultKeys: [], provenanceKeys: [], workKeys: [], workMetricsKeys: [] };
/** The record's vocabulary plants (T3): a key at the result, a camel-case key in provenance, a key in a diagnostic's metadata, a
 * string value of a block, a roster key, and a block under the abbreviation whose own keys are near forms (wb-r63c F5, the gate's
 * G13/G13b shape); the abbreviation on string values (wb-b4lg F1, the gate's P1 shapes): a second diagnostic whose message is
 * the acceptance's own ref form and whose source is gp, and a block value gp.scorer; and the item forms the F1 claim names beside
 * them (wb-b4lg U1, the gate's DJ1 and DJ2 twins and their neighbours): string array elements carrying the abbreviation (gp, the ref
 * form, rfo_01gp3x with gp between digits) and a MENTION, the abbreviation as an uppercase and a camel-hump value and key (GP,
 * gpLayer), a root key and a root value; and every other key and value cell of the two readings (wb-b4lg cut #3, the gate's L2-A1 and
 * L2-A3 members and their neighbours): the abbreviation as a root key and as a roster key, a MENTION as a root string value (the
 * operation_id) and as a plain object member's value, both readings on a key of an array element's own object, and a plant in the
 * result, provenance and work key lists of the roster. The planted diagnostics' other keys and values, the near forms and gp inside a
 * longer word (gpu-runner, gpuCount) are quiet. */
function vocabularyPlantItems(): RecordItem[] {
  const envelope = plantedEnvelope((source, result) => {
    source.transaction_id = "gp-txn-1";
    source.graph_data_ir = null;
    source.gp_trace = null;
    source.operation_id = "rfo_graphpolicy0000000000000";
    result.graph_policy = { kind: "x" };
    result.gp = { rank: 1, vector: [0.5], program: "x", checkpoint: "x", backend: "x" };
    member(result, "provenance").graphPolicyReceipt = "x";
    const context = member(result, "judge_context");
    context.task_tags = [ABBREVIATION];
    context.explicit_requests = ["use the GraphPolicy program"];
    context.agent_role = "gpu-runner";
    const layers = member(result, "judge_context_layers");
    layers["task.tags"] = "gpLayer";
    layers["agent.role"] = "GP";
    layers["task.goal"] = "GraphDataIR goal";
    result.superseded_transaction_ids = [GP_REF_FORM];
    result.fiber_transaction_refs = ["rfo_01gp3x"];
    source.diagnostics = [
      infoDiagnostic({ "graph-data-ir": 1, GP: 1, gpLayer: 1, gpuCount: 1 }),
      { ...infoDiagnostic({}), message: GP_REF_FORM, source: ABBREVIATION },
    ];
    const blocks = result.blocks;
    if (Array.isArray(blocks) && isObject(blocks[0])) {
      (blocks[0] as JsonObject).component_id = "GraphPolicy.scorer";
      (blocks[0] as JsonObject).candidate_key = `${ABBREVIATION}.scorer`;
      (blocks[0] as JsonObject).graphPolicyRank = 1;
      (blocks[0] as JsonObject).gp_note = null;
    }
  });
  return plantedItems(envelope, {
    ...NO_KEYS,
    resultKeys: ["graphpolicy_rank", "gp_rank"],
    provenanceKeys: ["gpCheckpoint"],
    workKeys: ["graph_data_ir_count"],
  });
}
/** What T3's judge must find among the planted items, and nothing else. */
const VOCABULARY_PLANTS: readonly string[] = [
  "plant:transaction_id",
  "plant:gp_trace",
  "plant:operation_id",
  "plant:result.blocks[0].candidate_key",
  "plant:result.blocks[0].component_id",
  "plant:result.blocks[0].graphPolicyRank",
  "plant:result.blocks[0].gp_note",
  "plant:result.judge_context_layers.task.goal",
  "plant:result.provenance.graphPolicyReceipt",
  "plant:result.judge_context.task_tags[0]",
  "plant:result.judge_context.explicit_requests[0]",
  "plant:result.judge_context_layers.task.tags",
  "plant:result.judge_context_layers.agent.role",
  "plant:result.superseded_transaction_ids[0]",
  "plant:result.fiber_transaction_refs[0]",
  "plant:result.graph_policy",
  "plant:result.gp",
  "plant:diagnostics[0].metadata.graph-data-ir",
  "plant:diagnostics[0].metadata.GP",
  "plant:diagnostics[0].metadata.gpLayer",
  "plant:diagnostics[1].message",
  "plant:diagnostics[1].source",
  "plant:graph_data_ir",
  "plant-roster:result.graphpolicy_rank",
  "plant-roster:result.gp_rank",
  "plant-roster:result.provenance.gpCheckpoint",
  "plant-roster:result.work.graph_data_ir_count",
];
/** The record's field plants (T4): one key per field word, a plural, a camel-case key in a diagnostic's metadata and a roster key,
 * and a root key and a key of an array element's own object (wb-b4lg cut #3: every key position of the field reading); the planted
 * diagnostic's own keys are quiet. */
function fieldPlantItems(): RecordItem[] {
  const envelope = plantedEnvelope((source, result) => {
    source.receipt = null;
    result.score = 1;
    result.rankings = [];
    result.embedding = [];
    source.diagnostics = [infoDiagnostic({ gpReceipt: "x" })];
    const blocks = result.blocks;
    if (Array.isArray(blocks) && isObject(blocks[0])) (blocks[0] as JsonObject).embeddings = [];
  });
  return plantedItems(envelope, { ...NO_KEYS, workMetricsKeys: ["score_count"] });
}
/** What T4's judge must find among the planted items, and nothing else. */
const FIELD_PLANTS: readonly string[] = [
  "plant:receipt",
  "plant:result.blocks[0].embeddings",
  "plant:result.score",
  "plant:result.rankings",
  "plant:result.embedding",
  "plant:diagnostics[0].metadata.gpReceipt",
  "plant-roster:result.work_metrics.score_count",
];

const VARIANTS = ["clean", "flagged", "overBudget", "notObserved", "fixtureSeam"] as const;
type Variant = (typeof VARIANTS)[number];
function variantEnvelope(variant: Variant): JsonObject {
  return plantedEnvelope((_source, result) => {
    if (variant === "flagged") result.diagnostics_summary = { errors: 1, warnings: 0, has_errors: true, has_warnings: false };
    if (variant === "overBudget") member(member(result, "budget"), "formula_terms").available_context_tokens = -1;
    if (variant === "notObserved") result.observations = [{ status: "missing", freshness: "captured_at_render", replayed: false }];
  });
}
/** Every object of the envelope - its root, then every nested object at any depth (arrays by index): the workspace object, the
 * result tree, and each diagnostic with its metadata - at its path from ENVELOPE_ROOT (wb-b4lg F2: the root and a diagnostic's own
 * keys are planted positions, not only the result tree's objects). */
function envelopeObjects(envelope: JsonObject): { readonly path: string; readonly object: JsonObject }[] {
  const out: { path: string; object: JsonObject }[] = [];
  const walk = (value: JsonValue | undefined, path: string): void => {
    if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) walk(item, `${path}[${index}]`);
    } else if (isObject(value)) {
      out.push({ path, object: value as JsonObject });
      for (const [key, inner] of Object.entries(value as JsonObject)) walk(inner, `${path}.${key}`);
    }
  };
  walk(envelope, ENVELOPE_ROOT);
  return out;
}
/** A copy of `envelope` with the planted info diagnostic appended, its metadata carrying a score and a receipt: the fixture renders
 * no diagnostic, so this one is the diagnostic position whose own keys and metadata Z2 plants and measures (wb-b4lg F2). */
function noted(envelope: JsonObject): JsonObject {
  const copy = objectOf(envelope, "the envelope");
  const diagnostics = Array.isArray(copy.diagnostics) ? copy.diagnostics : [];
  copy.diagnostics = [...diagnostics, infoDiagnostic({ score: LEAK_SCORE, receipt: `${LEAK_TEXT}DIAGNOSTIC` })];
  return copy;
}
/** The four generic GraphPolicy output fields, planted on one object of the result tree (their values the leak markers). */
function plantFields(object: JsonObject, path: string): void {
  object.score = LEAK_SCORE;
  object.ranking = [`${LEAK_TEXT}RANK`];
  object.embedding = [...LEAK_EMBEDDING];
  object.receipt = { id: `${LEAK_TEXT}RECEIPT-${path}`, digest: `sha256:${"9".repeat(64)}` };
}
/** The envelope objects whose shape each reader holds exactly: the four fields planted there alone make that reader refuse the
 * render (a typed CapabilityError, so no value is read), measured per reader on the clean render with its planted diagnostic
 * (wb-r63c F6 result objects; wb-b4lg F2 every envelope object, each reader apart, so one reader's refusal never hides another's
 * loose read). */
const strictObjects = lazy((): Readonly<Record<ReaderKind, readonly string[]>> => {
  const base = noted(variantEnvelope("clean"));
  const strictFor = (reader: ReaderKind): string[] =>
    envelopeObjects(base)
      .map(entry => entry.path)
      .filter(path => {
        const copy = objectOf(base, "the envelope");
        const target = envelopeObjects(copy).find(entry => entry.path === path);
        if (target !== undefined) plantFields(target.object, path);
        try {
          readerOn(reader, copy, "clean");
          return false;
        } catch (error) {
          if (error instanceof CapabilityError) return true;
          throw error;
        }
      });
  return { topology: strictFor("topology"), evidence: strictFor("evidence") };
});
/** The GraphPolicy-shaped plants of Z2 and Q10 on a copy of `envelope`: the planted info diagnostic (metadata carrying a score and a
 * receipt), the four generic fields on every envelope object outside `strict` (wb-r63c F6: a block's, an observation row's or a
 * nested object's field is planted, not only the result's; wb-b4lg F2: the root, the workspace object and a diagnostic's own keys
 * too), a graph_policy object carrying every output the bead names and a provenance receipt. Z2 passes one reader's strict objects;
 * Q10 passes none, so every object is planted. Where the plants landed is read back off the copy (plantedPositions, wb-b4lg U2). */
function gpPlanted(envelope: JsonObject, strict: readonly string[]): JsonObject {
  const copy = noted(envelope);
  for (const { path, object } of envelopeObjects(copy)) if (!strict.includes(path)) plantFields(object, path);
  const result = member(copy, "result");
  const receipt: JsonObject = { id: `${LEAK_TEXT}RECEIPT`, digest: `sha256:${"9".repeat(64)}` };
  result.graph_policy = {
    program: `${LEAK_TEXT}PROGRAM`, checkpoint: `${LEAK_TEXT}CHECKPOINT`, backend: `${LEAK_TEXT}BACKEND`,
    score: LEAK_SCORE, ranking: [`${LEAK_TEXT}RANK`], embedding: [...LEAK_EMBEDDING], receipt,
  };
  result.score = LEAK_SCORE;
  result.ranking = [`${LEAK_TEXT}RANK`];
  result.embedding = [...LEAK_EMBEDDING];
  result.receipt = receipt;
  member(result, "provenance").graph_policy_receipt = `${LEAK_TEXT}PROVENANCE`;
  return copy;
}
function readingOf(source: JsonObject): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: WORKSPACE, source };
}
function contextFor(variant: Variant): ReactiveFiberTopologyContext {
  return {
    scope: { workspace: WORKSPACE, principal: "local-operator:census" },
    seam: variant === "fixtureSeam" ? "injected-fixture" : "rf-cli",
    capturedAt: "2026-10-26T00:00:00Z",
    observedAt: "2026-10-26T00:00:01Z",
  };
}
/** One src reader on one envelope, as it returns: the observer's projection (topology) or nativeEvidence (evidence). */
function rawReaderOn(reader: ReaderKind, source: JsonObject, variant: Variant): unknown {
  const reading = readingOf(source);
  return reader === "topology" ? reactivefiberTopology(reading, contextFor(variant)) : nativeEvidence(PREVIEW_ID, reading);
}
/** One src reader on one envelope, as JSON. */
function readerOn(reader: ReaderKind, source: JsonObject, variant: Variant): JsonValue {
  return json(rawReaderOn(reader, source, variant));
}
/** Both src readers on one envelope, each run through its read log as a planted run is (plantedRun), so a plain and a planted output
 * come from the one path. */
function readersOn(source: JsonObject, variant: Variant): ReaderOutputs {
  return outputsOf({ topology: plantedRun("topology", source, variant), evidence: plantedRun("evidence", source, variant) });
}
/** Whether an envelope object carries the four GraphPolicy plants with their leak markers (plantFields' shape or gpPlanted's own). */
function carriesPlants(object: JsonObject): boolean {
  const receipt = object.receipt;
  return (
    object.score === LEAK_SCORE &&
    isDeepStrictEqual(object.ranking, [`${LEAK_TEXT}RANK`]) &&
    isDeepStrictEqual(object.embedding, [...LEAK_EMBEDDING]) &&
    isObject(receipt) &&
    typeof receipt.id === "string" &&
    receipt.id.startsWith(`${LEAK_TEXT}RECEIPT`)
  );
}
/** The planted positions of an envelope, read off that envelope itself: the paths of its objects that carry the four plants (wb-b4lg U2). */
function plantedPositions(envelope: JsonObject): string[] {
  return envelopeObjects(envelope)
    .filter(entry => carriesPlants(entry.object))
    .map(entry => entry.path);
}
/** One reader's read log (wb-b4lg U2, cut #3): the planted positions it read while `live` held, and each object wrapped once. */
interface ReadLog {
  live: boolean;
  readonly read: Set<string>;
  readonly wrapped: WeakMap<object, JsonValue>;
}
/** `value` as a reader is handed it through `log` (wb-b4lg U2, cut #3): every object and array wrapped once, a read of an object's
 * member, key list or key presence adding the object's path to the log when the object carries the four plants (carriesPlants), so
 * the positions a reader read are read off the very envelope it was handed; a member its target holds fixed is returned as it is
 * (the proxy invariant). */
function logged(value: JsonValue, path: string, log: ReadLog): JsonValue {
  if (value === null || typeof value !== "object") return value;
  const held = log.wrapped.get(value);
  if (held !== undefined) return held;
  const planted = isObject(value) && carriesPlants(value as JsonObject);
  const note = (): void => {
    if (log.live && planted) log.read.add(path);
  };
  const proxy: JsonValue = new Proxy(value, {
    get(target, key, receiver) {
      note();
      const inner: unknown = Reflect.get(target, key, receiver);
      const own = typeof key === "string" ? Object.getOwnPropertyDescriptor(target, key) : undefined;
      if (typeof key !== "string" || own === undefined || (own.configurable === false && own.writable === false)) return inner;
      return logged(inner as JsonValue, Array.isArray(target) ? `${path}[${key}]` : `${path}.${key}`, log);
    },
    has(target, key) {
      note();
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      note();
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(target, key) {
      note();
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  log.wrapped.set(value, proxy);
  return proxy;
}
/** The plant-presence control (wb-b4lg U2, cut #3): a reader of two planted fields - the score and the receipt id gpPlanted puts on
 * the result - read off the envelope it is handed (null where it carries none), so beside each src reader its planted run differs
 * from its plain one and leaks a number and a text marker. */
function presenceOn(source: JsonObject): JsonValue {
  const result = isObject(source.result) ? (source.result as JsonObject) : {};
  const receipt = isObject(result.receipt) ? (result.receipt as JsonObject) : {};
  return json({ score: result.score ?? null, receipt: receipt.id ?? null });
}
interface PlantedRun {
  readonly output: JsonValue;
  readonly planted: readonly string[];
  readonly read: readonly string[];
  readonly presence: JsonValue;
}
/** One src reader on its envelope, handed it through a read log (wb-b4lg U2): the reader's output, the planted positions read off the
 * very envelope it was handed, never off a recomputed listing (planted), the planted positions the reader itself read while it ran
 * (read), and the plant-presence control read off that same envelope (presence) - one handoff, so a plant that never reaches the
 * reader empties its read and leaves its control unchanged. */
function plantedRun(reader: ReaderKind, source: JsonObject, variant: Variant): PlantedRun {
  const log: ReadLog = { live: true, read: new Set(), wrapped: new WeakMap() };
  const handed = logged(source, ENVELOPE_ROOT, log) as JsonObject;
  const raw = rawReaderOn(reader, handed, variant);
  log.live = false;
  return { output: json(raw), planted: plantedPositions(handed), read: sorted(log.read), presence: presenceOn(handed) };
}
interface ReaderOutputs {
  readonly topology: JsonValue;
  readonly evidence: JsonValue;
  /** Each reader's plant-presence control, read off that reader's own envelope (wb-b4lg U2, cut #3). */
  readonly presence: Readonly<Record<ReaderKind, JsonValue>>;
}
/** Both readers' runs, as compareReaders and the leak walk read them. */
function outputsOf(runs: Readonly<Record<ReaderKind, PlantedRun>>): ReaderOutputs {
  return { topology: runs.topology.output, evidence: runs.evidence.output, presence: { topology: runs.topology.presence, evidence: runs.evidence.presence } };
}
/** Whether a planted run of both readers left each output byte-identical to the plain run, and each reader's plant-presence control
 * likewise - the control must differ, so a compare of the planted outputs with themselves reds (wb-b4lg U2, cut #3). */
function compareReaders(plain: ReaderOutputs, planted: ReaderOutputs): JsonValue {
  return {
    topology: isDeepStrictEqual(planted.topology, plain.topology),
    evidence: isDeepStrictEqual(planted.evidence, plain.evidence),
    presence: Object.fromEntries(READER_KINDS.map(reader => [reader, isDeepStrictEqual(planted.presence[reader], plain.presence[reader])])),
  };
}
/** The named parts of a run's outputs the leak walk reads one by one: the two src readers and each reader's control, so the control's
 * leaks never mask a src reader's (wb-b4lg U2, cut #3). */
function outputParts(outputs: ReaderOutputs): [string, JsonValue][] {
  return [
    ["topology", outputs.topology],
    ["evidence", outputs.evidence],
    ...READER_KINDS.map((reader): [string, JsonValue] => [`${reader} presence`, outputs.presence[reader]]),
  ];
}
function leaksIn(text: string): string[] {
  return [LEAK_TEXT, String(LEAK_SCORE), ...LEAK_EMBEDDING.map(String)].filter(marker => text.includes(marker));
}

interface PinEntries {
  readonly paths: readonly string[];
  readonly entries: readonly Entry[];
}
/** The blobs at `commit` for `paths`, read in one batch. */
function blobsAt(commit: string, paths: readonly string[]): Entry[] {
  const out = git(["cat-file", "--batch"], `${paths.map(path => `${commit}:${path}`).join("\n")}\n`);
  const entries: Entry[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(10, at);
    const header = out.subarray(at, end).toString("utf8").split(" ");
    if (header[1] !== "blob") throw new Error(`${commit}:${path} is not a blob (${header.join(" ")})`);
    const size = Number(header[2]);
    entries.push({ path, bytes: out.subarray(end + 1, end + 1 + size) });
    at = end + 1 + size + 1;
  }
  return entries;
}
const PIN_PLANT = "docs/workbench/zz-pin-plant.md";
const pinEntries = lazy((): PinEntries => {
  const paths = git(["ls-tree", "-r", "-z", "--name-only", FILING_PIN, "--", ...PIN_SCOPES.map(scope => scope.replace(/\/$/, ""))])
    .toString("utf8")
    .split("\0")
    .filter(Boolean);
  return { paths, entries: blobsAt(FILING_PIN, paths) };
});
function holdsRow(text: string): boolean {
  return text.split("\n").some(line => line.includes(`"id":"${BEAD}"`));
}

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each pin's live witness, for the claims check of the closing case. */
const LIVE = new Map<string, JsonValue>();

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  T1: () => {
    const verdict = judgeRecord(realRecord());
    const found = [...verdict.vocabulary, ...verdict.fields];
    expect(found, `ARMED: the wb-973.11 fixture record (${FIXTURE_MODULE} fullShapeRf, ${KEY_ROSTER}) now carries GraphPolicy outputs; the until-then duty of ${BEAD} ends and the acceptance on landing is owed - ${ACCEPTANCE}`).toEqual([]);
    return json({ fired: found.length > 0, recordFindings: found });
  },
  T2: () => {
    const roster = keyRoster();
    const provenance = member(member(fixtureEnvelope(), "result"), "provenance");
    expect(roster.source, "the key roster is a capture of the installed rf, never a constructed floor").toBe("captured");
    return json({
      source: roster.source,
      receiptIsCommand: /^cmd_[0-9a-f]{12}$/.test(roster.receipt ?? ""),
      fixtureMatchesRoster: provenance.cli_version === roster.rfVersion,
      contractMatchesRoster: REACTIVE_FIBER_CONTRACT_SOURCE.startsWith(`rf@${roster.rfVersion}:`),
    });
  },
  T3: () => {
    const planted = vocabularyPlantItems().map(item => item.at);
    const verdict = judgeRecord([...realRecord(), ...vocabularyPlantItems()]);
    const found = verdict.vocabulary.filter(at => planted.includes(at));
    expect(sorted(found), "the vocabulary plants are read, and no other planted item").toEqual(sorted(VOCABULARY_PLANTS));
    const envelopeItems = realRecord().filter(item => item.at.startsWith("fixture:")).length;
    const rosterKeys = realRecord().filter(item => item.at.startsWith("roster:")).length;
    return json({
      envelopeAtFloor: envelopeItems >= FLOORS.envelopeItems,
      rosterAtFloor: rosterKeys >= FLOORS.rosterKeys,
      diagnosticsRead: verdict.vocabulary.some(at => at.startsWith("plant:diagnostics[")),
      vocabularyFindings: verdict.vocabulary.filter(at => !planted.includes(at)),
      vocabularyPlants: found,
    });
  },
  T4: () => {
    const planted = fieldPlantItems().map(item => item.at);
    const verdict = judgeRecord([...realRecord(), ...fieldPlantItems()]);
    const found = verdict.fields.filter(at => planted.includes(at));
    expect(sorted(found), "the field plants are read, and no other planted item").toEqual(sorted(FIELD_PLANTS));
    const schemaPin = /context\.render\.schema\.json at ([0-9a-f]{12})\)/.exec(exportRow(BEAD).title)?.[1] ?? null;
    return json({
      fieldWords: [...FIELD_WORDS],
      fieldFindings: verdict.fields.filter(at => !planted.includes(at)),
      fieldPlants: found,
      schemaPin,
    });
  },
  Z1: () => {
    const atPin = git(["show", `${FILING_PIN}:${EXPORT}`]).toString("utf8");
    const before = git(["show", `${FILING_PIN}^:${EXPORT}`]).toString("utf8");
    const pin = pinEntries();
    const verdict = judgeScope([...pin.entries, entry(PIN_PLANT, "GraphPolicy outputs\n")]);
    return json({
      filingPin: FILING_PIN,
      filedAtPin: holdsRow(atPin),
      absentBeforePin: !holdsRow(before),
      pinFiles: pin.paths.length,
      // The pin is immutable, so the bytes its judge decoded are an exact count: a judge reading part of a blob reds (wb-r63c F3).
      pinBytes: pin.paths.reduce((sum, path) => sum + (verdict.sizes[path] ?? 0), 0),
      pinFindings: findingsFor(verdict, [PIN_PLANT], false),
      pinPlant: findingsFor(verdict, [PIN_PLANT], true),
    });
  },
  Z2: () => {
    const verdict = piVerdict();
    const plants = Object.keys(PI_PLANTS);
    const piFindings = findingsFor(verdict, plants, false);
    expect(piFindings, `a src or qa file spells GraphPolicy, so Pi reads something about GP before ${BEAD}'s trigger`).toEqual({});
    const readersUnchanged: JsonObject = {};
    const leaked = new Set<string>();
    const clean = readersOn(variantEnvelope("clean"), "clean");
    const inert: string[] = [];
    // Where the plants landed, per variant and reader, read off the very envelope each reader was handed (wb-b4lg U2), and which of
    // them the reader itself read while it ran (plantedRead, wb-b4lg cut #3: a reader handed no plants reads none).
    const plantedAt: Partial<Record<Variant, Record<ReaderKind, readonly string[]>>> = {};
    const plantedRead: Partial<Record<Variant, Record<ReaderKind, readonly string[]>>> = {};
    for (const variant of VARIANTS) {
      const base = variantEnvelope(variant);
      const plain = readersOn(base, variant);
      if (variant !== "clean" && isDeepStrictEqual(plain.topology, clean.topology)) inert.push(variant);
      // Each reader runs on its own plants (wb-b4lg F2): the observer's refusal of a root plant never hides nativeEvidence's read of it.
      const runs = {
        topology: plantedRun("topology", gpPlanted(base, strictObjects().topology), variant),
        evidence: plantedRun("evidence", gpPlanted(base, strictObjects().evidence), variant),
      };
      const planted = outputsOf(runs);
      plantedAt[variant] = { topology: runs.topology.planted, evidence: runs.evidence.planted };
      plantedRead[variant] = { topology: runs.topology.read, evidence: runs.evidence.read };
      // One compare and one leak walk for the src readers and their plant-presence controls (wb-b4lg cut #3): the controls must differ
      // and leak, so a compare or a walk that cannot read a planted run reds here.
      readersUnchanged[variant] = json(compareReaders(plain, planted));
      for (const [part, value] of outputParts(planted)) for (const marker of leaksIn(JSON.stringify(value))) leaked.add(`${variant} ${part}: ${marker}`);
    }
    // Controls: one output whose evidence and one whose projection carries a leaked value, so the comparison and the leak walk are
    // shown to read a difference here, not only under a src plant.
    const leakyEvidence: ReaderOutputs = { ...clean, evidence: { ...objectOf(clean.evidence, "evidence"), leaked: `${LEAK_TEXT}CONTROL` } };
    const leakyTopology: ReaderOutputs = { ...clean, topology: { ...objectOf(clean.topology, "topology"), leaked: LEAK_SCORE } };
    const readerControls = {
      evidence: compareReaders(clean, leakyEvidence),
      topology: compareReaders(clean, leakyTopology),
      leaks: [...leaksIn(JSON.stringify(leakyEvidence)), ...leaksIn(JSON.stringify(leakyTopology))],
    };
    const judged = bytesJudged(verdict, plants);
    const resultTree = `${ENVELOPE_ROOT}.result`;
    const landed = (variant: Variant, reader: ReaderKind): readonly string[] => plantedAt[variant]?.[reader] ?? [];
    return json({
      scope: [...PI_SCOPES],
      filesAtFloor: verdict.files - plants.length >= FLOORS.piFiles,
      scriptsAtFloor: verdict.scripts - plants.filter(path => SCRIPT.test(path)).length >= FLOORS.piScripts,
      bytesRead: judged.short.length === 0,
      bytesAtFloor: judged.total >= FLOORS.piBytes,
      piFindings,
      piPlants: findingsFor(verdict, plants, true),
      readersUnchanged,
      variantsLive: inert.length === 0,
      readerControls,
      readerLeaks: sorted(leaked),
      strictObjects: strictObjects(),
      deepPlanted: VARIANTS.every(variant => READER_KINDS.every(reader => landed(variant, reader).length >= FLOORS.deepObjects)),
      // The clean render's planted positions outside the result tree, per reader, read off the planted copies: the root and a
      // diagnostic's own keys reach nativeEvidence (wb-b4lg F2, U2).
      outerPlanted: Object.fromEntries(READER_KINDS.map(reader => [reader, landed("clean", reader).filter(path => path !== resultTree && !path.startsWith(`${resultTree}.`))])),
      plantedAt,
      plantedRead,
    });
  },
  Z3: () => {
    const reading = claimVerdict();
    const plants = Object.keys(CLAIM_PLANTS);
    const claimFindings = findingsFor(reading.verdict, plants, false);
    expect(claimFindings, `an rf reading test or a docs/workbench page outside the posture homes spells GraphPolicy before ${BEAD}'s trigger`).toEqual({});
    const docs03 = textOf(DOCS03);
    const home = postureHomes(docs03);
    const judged = bytesJudged(reading.verdict, plants);
    // The gate's G08/G09 shapes and the binding's other refusals, on in-memory copies of docs/03 (wb-r63c F1): the stated sentence
    // is read from the bound section's rendered paragraph, so a decoy section in a comment before a changed real one, a changed
    // sentence, a second rendered heading or a level-1 heading inserted above each un-states it, and a level-1 appendix after the
    // section bounds it, so the appendix's claim is read.
    // The posture heading and its opening paragraph are located through the rendered view, never by their source spelling (wb-b4lg
    // F3, locateControls), so a markup-only edit of docs/03's heading, title or sentence leaves every control on the section it binds.
    // The heading-read controls (wb-b4lg F3): docs/03's rendered posture heading and page title re-spelled with inline emphasis.
    const emphasized = respelledHeading(docs03, 2, POSTURE_HEADING, EMPHASIZED_HEADING);
    const titled = respelledHeading(docs03, 1, DOCS03_TITLE, EMPHASIZED_TITLE);
    const appended = postureHomes(`${docs03}\n# Appendix\n\nPi reads GraphPolicy scores from the rf render envelope.\n`).masked;
    // The F3 enumeration on docs/03 itself (wb-b4lg U3): each MARKUPS form re-spells its heading, title and sentence where it can (the
    // opening paragraph replaced by the form's sentence), and the home, the stated sentence and the locate controls are read on that
    // copy through docs/03's own control path.
    const markup = Object.fromEntries(
      Object.entries(MARKUPS).map(([form, spelled]) => {
        const copy = markedUp(docs03, spelled);
        return [
          form,
          {
            respelled: respelledIn(copy, spelled),
            home: postureHomes(copy).section,
            stated: postureStatedIn(copy),
            ...locateControls(copy),
          },
        ];
      }),
    );
    return json({
      claimScope: {
        docs: DOCS_SCOPE,
        unread: [RECEIPTS, POSTURE_SECTION, `${POSTURE_OWNER} | ${POSTURE_CELL}`, `${DOCS03} ownership-row echo`],
        roots: [...SURFACE_ROOTS],
        record: [FIXTURE_MODULE, KEY_ROSTER],
      },
      surfaceAtFloor: reading.surface.filter(path => !plants.includes(path)).length >= FLOORS.surfaceFiles,
      recordRead: [FIXTURE_MODULE, KEY_ROSTER].every(path => reading.surface.includes(path)),
      dataRead: reading.surface.filter(path => !plants.includes(path) && !SCRIPT.test(path) && path !== KEY_ROSTER).length >= FLOORS.surfaceData,
      docsAtFloor: reading.docs.filter(path => !plants.includes(path)).length >= FLOORS.docsFiles,
      bytesRead: judged.short.length === 0,
      bytesAtFloor: judged.total >= FLOORS.claimBytes,
      postureStated: postureStatedIn(docs03),
      postureHome: { section: home.section, rows: home.rows },
      postureControls: {
        ...locateControls(docs03),
        headingTwice: postureStatedIn(`${docs03}\n${POSTURE_SECTION}\n\n${POSTURE_SENTENCE}\n`),
        appendixRead: mentions(appended.split("\n# Appendix\n")[1] ?? ""),
        emphasisHeading: postureHomes(emphasized).section,
        emphasisTitle: postureHomes(titled).section,
        markup,
      },
      claimFindings,
      claimPlants: findingsFor(reading.verdict, plants, true),
    });
  },
  Z4: () => {
    const pattern = untilThenPattern();
    return json({
      untilThenPattern: pattern,
      patternWords: pattern.split("|").map(wordsOf),
      spellingForms: Object.fromEntries(SPELLINGS.map(spelling => [spelling, mentions(spelling)])),
      nearWordsQuiet: Object.fromEntries(NEAR_WORDS.map(word => [word, !mentions(word)])),
    });
  },
  Q1: () => {
    const verdict = judgeScope(HOLDERS.map(path => entry(path, textOf(path))));
    const scoped = [...listing().filter(path => PI_SCOPES.some(scope => path.startsWith(scope)) && !excluded(path)), ...claimVerdict().surface, ...claimVerdict().docs];
    return json({ residual: "R-HOLDER", spelled: HOLDERS.map(path => (verdict.findings[path] ?? []).length > 0), read: HOLDERS.filter(path => scoped.includes(path)) });
  },
  Q2: () => {
    const { title, notes } = exportRow(BEAD);
    const scoped = [...listing().filter(path => PI_SCOPES.some(scope => path.startsWith(scope)) && !excluded(path)), ...claimVerdict().surface, ...claimVerdict().docs];
    return json({ residual: "R-TRACKER", beadRowSpells: mentions(title) && mentions(notes), read: scoped.filter(path => path.startsWith(TRACKER)) });
  },
  Q3: () => {
    const plants: Record<string, string> = {
      "test/zz-quiet-guard.test.ts": 'import { judge } from "./helpers/census.js";\n// GraphPolicy\nvoid judge;\n',
      "test/zz-quiet-native.test.ts": 'import { loadWorkbenchNative } from "../src/workbench/native-modules.js";\n// GraphDataIR\nvoid loadWorkbenchNative;\n',
      // A surface test reaching a data file only through a computed name: the module is read, the data file is not (wb-r63c F7).
      "test/zz-quiet-computed.test.ts": [
        'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\n',
        "export const name = (kind: string): string => `zz-quiet-$",
        "{kind}.json`;\nvoid fullShapeRf;\n",
      ].join(""),
      "test/fixtures/zz-quiet-computed.json": '{"graph_policy": 1}\n',
    };
    const reading = claimReading(plants);
    const paths = Object.keys(plants);
    return json({ residual: "R-GUARDS", inSurface: paths.filter(path => reading.surface.includes(path)), findings: findingsFor(reading.verdict, paths, true) });
  },
  Q4: () => {
    const plants: Record<string, string> = {
      "docs/workbench/zz-quiet-section.md": `${POSTURE_SECTION}\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
      // A rendered table row (a lone pipe line renders as a paragraph, no row; wb-r63c F1).
      "docs/workbench/zz-quiet-row.md": `| Subject | Owner | Pi |\n| --- | --- | --- |\n| Learned scores | ${POSTURE_OWNER} | ${POSTURE_CELL}: GraphPolicy scores are unread |\n`,
      // The heading reads in the binding's rendered text (wb-b4lg F3, the gate's P5 shape): an emphasis-only posture heading, and a
      // page title carrying markup that the section is bound under.
      "docs/workbench/zz-quiet-emphasis.md": `${EMPHASIZED_HEADING}\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
      "docs/workbench/zz-quiet-titled.md": `${EMPHASIZED_TITLE}\n\n${POSTURE_SECTION}\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
      // One page per MARKUPS form that spells a title or a heading (wb-b4lg U3): its title and posture heading, plain where it spells none.
      ...Object.fromEntries(
        Object.entries(MARKUPS)
          .filter(([, spelled]) => spelled.heading !== null || spelled.title !== null)
          .map(([form, spelled]) => [
            `docs/workbench/zz-quiet-markup-${form}.md`,
            `${spelled.title ?? `# ${DOCS03_TITLE}`}\n\n${spelled.heading ?? POSTURE_SECTION}\n\nPi reads GraphPolicy scores from the rf render envelope.\n`,
          ]),
      ),
      "test/zz-quiet-echo.test.ts": [
        'import { fullShapeRf } from "./helpers/rf-render-fixture.js";\n',
        'const controls = [{ text: "GraphPolicyCLI predictions and policy distributions.", hit: false }];\n',
        "const echoed = `Graph\\u0050olicyCLI learned scores, embeddings and their receipts`;\n",
        'const data = "zz-quiet-echo.json";\n',
        "void fullShapeRf;\nvoid controls;\nvoid echoed;\nvoid data;\n",
      ].join(""),
      // A data file the echo test names, holding the same echo as a JSON string (wb-r63c F7: the landed wb-grmo.1 roster holds one).
      "test/fixtures/zz-quiet-echo.json": '{"controls": [{"text": "GraphPolicyCLI predictions and policy distributions.", "hit": false}]}\n',
    };
    const reading = claimReading(plants);
    const paths = Object.keys(plants);
    return json({
      residual: "R-POSTURE",
      inScope: paths.filter(path => reading.docs.includes(path) || reading.surface.includes(path)),
      findings: findingsFor(reading.verdict, paths, true),
    });
  },
  Q5: () => {
    const plants: Record<string, string> = { "docs/workbench/receipts/zz-quiet.md": "Pi reads GraphPolicy scores from the rf render envelope.\n" };
    const reading = claimReading(plants);
    const paths = Object.keys(plants);
    return json({ residual: "R-RECEIPTS", inScope: paths.filter(path => reading.docs.includes(path)), findings: findingsFor(reading.verdict, paths, true) });
  },
  Q6: () => {
    const verdict = judgeScope([entry("src/zz-quiet-gp.ts", 'const gp = agents.get("general-purpose");\n// GP: gp rpc --stdio, gp graph check\nvoid gp;\n')]);
    return json({ residual: "R-ABBREVIATION", findings: { ...verdict.findings } });
  },
  Q7: () => {
    const verdict = judgeScope([
      entry("src/zz-quiet-concat.ts", 'export const word = "Graph".concat("Policy");\n'),
      entry("src/zz-quiet-template.ts", ["export const word = (suffix: string): string => `Graph$", "{suffix}Policy`;\n"].join("")),
      entry("src/zz-quiet-code.ts", 'export const word = String.fromCharCode(71) + "raphPolicy";\n'),
    ]);
    return json({ residual: "R-COMPUTED", findings: { ...verdict.findings } });
  },
  Q8: () => {
    const verdict = judgeScope([
      entry("src/zz-quiet-format.ts", `// Gr${String.fromCodePoint(0x200b)}aphPolicy\n`),
      entry("src/zz-quiet-confusable.ts", `// GraphP${String.fromCodePoint(0x3bf)}licy\n`),
      // A backslash escape in a file kind whose escapes are not decoded (plain text; wb-r63c F4).
      entry("qa/zz-quiet-escaped.txt", "\\x47raphPolicy\n"),
    ]);
    return json({ residual: "R-INTERIOR", findings: { ...verdict.findings } });
  },
  Q9: () => {
    const verdict = judgeScope([{ path: "qa/zz-quiet.bin", bytes: Buffer.concat([Buffer.from("GraphPolicy", "utf8"), Buffer.from([0])]) }]);
    return json({ residual: "R-BINARY", binaries: [...verdict.binaries], findings: { ...verdict.findings } });
  },
  Q10: async () => {
    const registry = new CapabilityRegistry();
    // The injected reader hands out a fresh planted envelope and the expectation is built apart from it, so a provider that edits
    // the envelope it was handed cannot edit the expectation too.
    const expected = readingOf(gpPlanted(fixtureEnvelope(), []));
    type Injected = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
    registerReactiveFiberRender(registry, async () => gpPlanted(fixtureEnvelope(), []) as unknown as Injected, WORKSPACE);
    const relayed = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, { grants: [...GRANTS], signal: new AbortController().signal });
    // The planted positions on the envelope relayed, read off it (wb-b4lg U2): a plant that never reaches the relay changes the count.
    const relayedEnvelope = member(objectOf(relayed, "the relayed reading"), "source");
    return json({ residual: "R-RELAY", verbatim: isDeepStrictEqual(relayed, expected), plantedRelayed: plantedPositions(relayedEnvelope).length });
  },
  Q11: () => {
    const verdict = judgeScope([
      entry("src/zz-quiet-generic.ts", "export const read = (result: { score: number; ranking: string[]; embedding: number[]; receipt: string }): number => result.score;\n"),
    ]);
    return json({ residual: "R-GENERIC", findings: { ...verdict.findings } });
  },
  Q12: () => {
    // Near forms of the title's field words on the record, outside the vocabulary and the abbreviation (wb-r63c F5).
    const items = plantedItems(
      plantedEnvelope((_source, result) => {
        result.rank = 1;
        result.ranked = [];
        result.vector = [0.5];
        result.scored = true;
      }),
      NO_KEYS,
    );
    const verdict = judgeRecord(items);
    return json({ residual: "R-NEAR-FIELD", findings: { vocabulary: [...verdict.vocabulary], fields: [...verdict.fields] } });
  },
  Q13: () => {
    // A record value is never a GraphPolicy output field (wb-b4lg F1, the enumerated item forms): a string value naming every field
    // word and a plural, and a number, a boolean and a null under keys that name none.
    const items = plantedItems(
      plantedEnvelope((source, result) => {
        source.diagnostics = [{ ...infoDiagnostic({ weight: LEAK_SCORE, flag: true, mark: null }), message: "score 0.9, ranking a b, embedding [0.5], receipt r" }];
        member(result, "output").path = "rankings";
      }),
      NO_KEYS,
    );
    const verdict = judgeRecord(items);
    return json({
      residual: "R-FIELD-VALUE",
      // The planted values that name a field word (isField's reading): they reach the judge, and fields still finds none.
      values: items.filter(item => item.value !== null && isField(item.value)).map(item => item.at),
      findings: { vocabulary: [...verdict.vocabulary], fields: [...verdict.fields] },
    });
  },
};

describe("wb-e9dy rf GraphPolicy-context census (RF-GRAPH-POLICY-CONTEXT-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "Z:4", "Q:13"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const quoted = ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins);
    expect(Object.keys(QUOTES).sort(), "every pin of rows T and Z carries a quote").toEqual([...quoted].sort());
    expect(Object.keys(CLAIMS).sort(), "every quoted pin carries claims").toEqual([...quoted].sort());
    expect(
      ROSTER.rows.flatMap(row => row.pins).map(pin => ({ id: pin.id, quote: pin.quote, claims: pin.claims })),
      "the roster holds each pin's quote and claims",
    ).toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => ({ id: pin, quote: QUOTES[pin] ?? null, claims: CLAIMS[pin] === undefined ? null : json(CLAIMS[pin]) })));
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row").toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      json({
        requirement: REQUIREMENT,
        tracker: TRACKER,
        holders: [...HOLDERS],
        provider: PROVIDER,
        observer: OBSERVER,
        fixtureModule: FIXTURE_MODULE,
        keyRoster: KEY_ROSTER,
        surfaceRoots: [...SURFACE_ROOTS],
        docsScope: DOCS_SCOPE,
        receipts: RECEIPTS,
        docs03: DOCS03,
        docs03Title: DOCS03_TITLE,
        postureSection: POSTURE_SECTION,
        postureHeading: POSTURE_HEADING,
        ownershipHeading: OWNERSHIP_HEADING,
        postureOwner: POSTURE_OWNER,
        postureCell: POSTURE_CELL,
        postureSentence: POSTURE_SENTENCE,
        ownerFiling: OWNER_FILING,
        piScopes: [...PI_SCOPES],
        pinScopes: [...PIN_SCOPES],
        filingPin: FILING_PIN,
        previewId: PREVIEW_ID,
        grants: [...GRANTS],
        workspace: WORKSPACE,
        armed: ARMED,
        acceptance: ACCEPTANCE,
        untilThen: UNTIL_THEN,
        mention: { source: MENTION.source, flags: MENTION.flags },
        script: SCRIPT.source,
        shell: SHELL.source,
        abbreviation: ABBREVIATION,
        gpRefForm: GP_REF_FORM,
        fieldWords: [...FIELD_WORDS],
        floors: FLOORS,
        spellings: [...SPELLINGS],
        nearWords: [...NEAR_WORDS],
        leak: { text: LEAK_TEXT, score: LEAK_SCORE, embedding: [...LEAK_EMBEDDING] },
        variants: [...VARIANTS],
        envelopeRoot: ENVELOPE_ROOT,
        readerKinds: [...READER_KINDS],
        headingProbe: HEADING_PROBE,
        emphasizedHeading: EMPHASIZED_HEADING,
        emphasizedTitle: EMPHASIZED_TITLE,
        markups: MARKUPS,
        piPlants: PI_PLANTS,
        claimPlants: CLAIM_PLANTS,
        vocabularyPlants: [...VOCABULARY_PLANTS],
        fieldPlants: [...FIELD_PLANTS],
        pinPlant: PIN_PLANT,
        residuals: RESIDUALS,
        readers: [...READERS],
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const [pin, impl] of Object.entries(IMPL)) {
      expect(/\bROSTER\b|rosterWitness|readRoster/.test(impl.toString()), `${pin}'s case reads no roster (SELF-READ)`).toBe(false);
      const calls = callsOf(impl.toString());
      expect(READERS.filter(name => calls.has(name)).length, `${pin}'s case calls a reader of the subject (READERS), so a constant witness reds (wb-r63c F2)`).toBeGreaterThan(0);
    }
    // Controls of the reader read: a constant witness spelling reader names as keys and text calls none; a reader call is read.
    expect(READERS.filter(name => callsOf('() => json({ untilThenPattern: "listing()", mentions: [] })').has(name)), "a constant witness calls no reader").toEqual([]);
    expect(READERS.filter(name => callsOf("() => (0, imported.mentions)(untilThenPattern())").has(name)), "an imported and a local reader call are read").toEqual([
      "untilThenPattern",
      "mentions",
    ]);
  });

  it("the outside anchors: the bead's export row binds the rows, the quotes, the armed clause, the field words, the vocabulary, the acceptance and the until-then duty; docs/03 binds the posture homes; the filing pin is a commit", () => {
    const { title, notes } = exportRow(BEAD);
    const id = /^\[([A-Z]+(?:-[A-Z]+)*-R\d+)\] /.exec(title);
    expect(id?.[1], "the title opens with the bead's requirement id").toBe(REQUIREMENT);
    const statement = title.slice(id?.[0].length ?? 0);
    const label = (row: string): string => ROWS.find(entry => entry.id === row)?.label ?? "";
    expect(tiles(statement, [label("T"), ARMED, label("Z")]), "rows T and Z and the armed clause tile the title, in order").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its label`).toBe(true);
    }
    for (const [pin, claims] of Object.entries(CLAIMS)) expect(tiles(QUOTES[pin] ?? "", Object.keys(claims)), `${pin}'s claim terms tile its quote`).toBe(true);
    expect(titleFieldWords(statement), "FIELD_WORDS are the title's GraphPolicy output fields").toEqual([...FIELD_WORDS]);
    // The owner filing only (wb-r63c F8): an owner sentence weakened in place and quoted verbatim by a later note (the gate's G17)
    // no longer reads as the filing's, while an includes-anywhere read of the notes would still find it.
    const filing = ownerFiling(notes);
    expect(filing.includes(ACCEPTANCE), "ACCEPTANCE is the owner filing's acceptance armed on landing, verbatim").toBe(true);
    expect(filing.includes(UNTIL_THEN), "UNTIL_THEN is the owner filing's until-then duty, verbatim").toBe(true);
    for (const sentence of [ACCEPTANCE, UNTIL_THEN]) {
      const weakened = `${notes.replace(sentence, sentence.replace(/ shows no | is empty /, " is mostly "))}\n\nQuoted: ${sentence}`;
      expect([weakened.includes(sentence), ownerFiling(weakened).includes(sentence)], "a weakened filing quoted later reads as replaced").toEqual([true, false]);
    }
    const pattern = untilThenPattern();
    expect(MENTION.source, "MENTION is rebuilt from the words of the notes' until-then pattern").toBe(mentionSource(pattern));
    expect(MENTION.flags, "read in any case, by code point").toBe("giu");
    expect(pattern.split("|").filter(term => !mentions(term)), "each alternative of the pattern is a MENTION").toEqual([]);
    // The posture homes over the rendered view (wb-r63c F1): the section once, under docs/03's title, and the row in a rendered table
    // of the bound Ownership boundaries section.
    const docs03 = textOf(DOCS03);
    expect(docsSection(docs03, POSTURE_HEADING, 2, [DOCS03_TITLE]).why, "docs/03 renders the posture section exactly once, under its title").toBe("");
    expect(ownershipRows(docs03).length, "docs/03's Ownership boundaries section renders the posture ownership row").toBeGreaterThanOrEqual(1);
    expect(git(["cat-file", "-t", FILING_PIN]).toString("utf8").trim(), "the filing pin is a commit of this repository").toBe("commit");
    expect([...SURFACE_ROOTS, KEY_ROSTER].filter(path => !existsSync(join(REPO, path))), "the surface roots and the key roster exist").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(await impl());
          LIVE.set(pin, witness);
          const expected = rosterWitness(pin);
          REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
          expect(witness).toStrictEqual(expected);
        });
      }
    });
  }

  it("the registered tests, the reached pins and the claims equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "every compare matched its roster witness",
    ).toEqual([]);
    const keys = (pin: string): string[] => {
      const witness = LIVE.get(pin);
      return isObject(witness) ? Object.keys(witness).sort() : [];
    };
    const facts = (pin: string): string[] => Object.values(CLAIMS[pin] ?? {}).flat();
    for (const pin of Object.keys(CLAIMS)) {
      expect(keys(pin), `${pin}'s live witness holds exactly its claimed facts`).toEqual([...facts(pin)].sort());
      expect(facts(pin).length, `${pin}'s facts each sit under one term`).toBe(new Set(facts(pin)).size);
    }
    const accepted = Object.keys(CLAIMS).flatMap(claimed =>
      Object.keys(CLAIMS)
        .filter(other => other !== claimed && isDeepStrictEqual(keys(other), [...facts(claimed)].sort()))
        .map(other => `${other} shows ${claimed}'s claims`),
    );
    expect(accepted, "the claims bound: no pin's live witness shows another pin's claims").toEqual([]);
  });
});
