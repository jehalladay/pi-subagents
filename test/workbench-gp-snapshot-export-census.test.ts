/**
 * wb-0lf.2 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R2, program-triage-2026-10-18 child of wb-0lf), the GP snapshot-export
 * census: the until-then leg of a gated export duty, armed for the first exporter.
 * Statement (bead title, verbatim): "When Pi exports a request to GraphPolicyCLI (artifact: released GraphDataIR schema + an
 * owner-decided Pi decision point), the export shall be a finite, permission-scoped GraphDataIR snapshot built only from native
 * observations within the caller's grants, carrying the source revision, marking unknown vs absent explicitly, listing only
 * admissible candidate actions and bounded by a declared budget."
 * Acceptance (owner filing, verbatim; cut at ", " outside parentheses into the labels of rows A-F): "a pure exporter test builds
 * GraphDataIR from an ObservationProjection fixture and asserts every node and edge traces to a native ref inside the caller's
 * scope, coverage partial/unknown rows export as explicit unknown (never absent, never a guessed value),
 * sourceRevision/subjectBasis are carried verbatim, candidate actions are exactly the host's admissible set
 * (NATIVE_CONTROL_ACTIONS at control.ts:30-37 or typed executor requests), and a snapshot over the declared node/edge/byte
 * budget is refused with a typed unavailable, never truncated silently." The filing closes "Tracked gate, never a blocker."
 *
 * THE GATE (measured read-only by the cutting seat on 2026-10-28 at trunk ade68d6 and after each trunk merge into the cut, by the
 * first respin seat at trunk e81d2b0, by the second respin seat at trunk 014d116, whose delta from e81d2b0, landings 649-651,
 * touches no src, qa or docs file, by the third respin seat at trunk 4350926, whose delta from 06a280b, landings 657-660,
 * touches no src, qa or docs file either, and by the fourth respin seat at trunk aec4521, whose delta from b3d410f, landings
 * 663-664, touches no src, qa or docs file either; row G re-reads it live):
 * Pi has no exporter to test. docs/workbench/03's Ownership boundaries section holds one GraphPolicyCLI row (one body row of
 * its top-level tables whose owner cell, its second cell whatever the table's header names, as it shows in the document,
 * names GraphPolicy; G3 counts rows by that cell only),
 * whose owner cell's source is exactly GraphPolicyCLI, in a table headed "Concern | Authoritative owner | Workbench may do",
 * whose "Workbench may do" cell's source opens "nothing today (no gp seam is registered)", and no other block of that section
 * outside its top-level tables names GraphPolicyCLI in its source; its GraphPolicyCLI boundary section's
 * first rendered block is a paragraph that opens, as rendered and in its source, "Pi carries no GraphPolicyCLI (gp)
 * integration today." (G3, read through the landed docs binding sectionTables/docsSection of test/helpers/census.ts, each
 * heading once under the page title); no src module names GraphPolicy or GraphDataIR in any spelling the landed vocabulary
 * reads, each word's parts in any case joined by any run of space, tab, dot, underscore or hyphen or by none (G1, its reader
 * proven on each of the two words and on each of SITE_WORD_SPELLINGS' 48 spellings, its joiners and its case folding read back
 * from the live patterns; the landed wb-e66.5, wb-1xvp.2 and
 * wb-gxd7.4 guards pin the same absence by their own readings, and wb-gxd7.4's filing names this bead's exporter as unbuilt).
 * So this suite PINS TODAY'S ABSENCE and ARMS the acceptance for the first exporter: the judge (exportFindings, driveFindings)
 * is written now, proven on a reference exporter over real ObservationProjection fixtures and on seventy-seven mutants, each
 * refused with exactly its rules, and every EXPORT_SITES registration (none today) must pass it on every CASES row. A src
 * module that names a site word without a registration reds G1, so the cut that adds the exporter registers it here, with a
 * drive, and meets the judge.
 *
 * THE DRIVE CONTRACT (what a registration's drive returns; the presented document's spelling beyond the vendored v1 shape and
 * where the candidates ride are the owner-decided seam's, so the drive maps the exporter's output to this form):
 *  - an export {ok: true, graph, trace, candidates}: graph is the GraphDataIR document the export presents; trace is Pi's own
 *    record, never shown to gp, of each element's projection key ({scope, entities: {id: {key, ref, sourceRevision,
 *    subjectBasis}}, relations: {id: {from, to, kind}}}); candidates is every candidate action the export lists, as
 *    {entity, action} pairs;
 *  - or a refusal {ok: false, category: "unavailable", code: "export-over-budget", limit, declared, measured}, the capability
 *    registry's unavailable category (CapabilityErrorCategory, src/workbench/capability-registry.ts), and nothing else.
 *  An outcome is read as data: an accessor or a function in it reads by identity, so two calls that build fresh ones differ.
 * READINGS (test/helpers/gp-snapshot-export-census.ts holds the tables, the fixture, the reference exporter and the judge; its
 * gp- name puts it in the GraphPolicy family holder class of the landed wb-kjg9.1 census, beside this census module and its
 * roster, which that census's census-module and census-roster classes already hold):
 * - FIXTURE: one ObservationProjection built through refresh, markStale and relate only: the caller's scope A holds six
 *   observed nodes (furnace run, complete; claude-agent-sdk session, partial; forge command, unknown; local-detached command
 *   with a native scope, no coverage declared; beads issue, complete; furnace attempt, complete then marked stale) and five
 *   relations, one of them to a forge artifact no snapshot observed; scope B (same workspace, another principal) and scope C
 *   (another workspace, the same principal) share native refs with A; D is empty. TRUTH (truthOf) is read back from a FRESH
 *   TWIN projection through its own query and relationsPage, never from the one a drive is handed: the observed nodes, the
 *   relations and every related endpoint no node holds (completeness unknown, revision and basis null).
 * - GRAPHDATAIR (graphShapeFindings): the vendored producer fixture's v1 shape (test/fixtures/gp-host-adapter-snapshot.json):
 *   schema_ref.namespace graphpolicy.data.v1, entity and relation lists, each entity a kind and a features object, each
 *   relation a kind, a features object and incidences naming exported entities, one id space for entities, relations and
 *   incidences. The vendored fixture itself reads clean (A2).
 * - PURITY (driveFindings): each drive runs twice, each time on a fresh projection behind a view (watched) that records every
 *   call of a projection method outside READ_METHODS that it hands out through its get trap (a call reached past the view,
 *   Object.prototype.toString.call(view), is R-OUTSIDE's), with fresh copies of the scope and the budget, which the judge keeps
 *   in its own record. Once both drives have
 *   settled, a drive is impure on any of five legs: it called such a method (each of the six public writes has an A1 member,
 *   M-WRITE-NOOP one that changes nothing and M-OTHER-CALL an inherited toString); the class (its prototype and its
 *   constructor) no longer reads as it did before the drives (the judge puts the class back, prototypes included, and A1
 *   holds both member lists and the prototype's prototype to the ones this module loaded with); a projection it read no longer
 *   reads as a fresh twin; the scope or the budget object it was handed, as the judge kept it, no longer reads as a fresh copy
 *   (refusal #3's U2 cure: the judge walks the two objects it handed, never the request's fields as read after the drives, so
 *   the four M-REBIND members, an edit of a handed object followed by a rebind of the request's field to a fresh copy, are
 *   impure; the request object itself is R-REQUEST's); or its two outcomes read
 *   unlike each other. Every leg after the first reads through one strict walk (structureOf, refusal #2's U2 cure): from each
 *   root, every object reachable through own properties (Reflect.ownKeys: string and symbol keys, enumerable or not) and map
 *   and set entries, and per object its kind (internal-slot brand checks that run none of its own code), its prototype by
 *   identity, its integrity level (extensible, sealed, frozen), its own keys in order and per key the descriptor's attributes
 *   with its value or its accessor functions, a map's or set's size and entries in insertion order, a date's time; an object
 *   met again reads as the path it was first met at, a primitive by Object.is. A Proxy is a leaf whose traps are never called
 *   (it reads unlike any twin's object), a function below a root a leaf read by identity, and an opaque object (a WeakMap,
 *   WeakSet, Promise, RegExp, typed array, buffer or boxed primitive) is read by its own properties only; A1 holds a fixture
 *   projection's walk to the kinds it enters (array, map, object, set). STRUCTURE_PROBES pins each facet the walk reads, each
 *   one's first difference named, and each impure finding names the facet of its first difference (never a private field's
 *   name). The two equivalence controls (PURE_RECIPES: every READ_METHODS call, and edits of the copies the reads hand out)
 *   are judged pure, so the walk is strict without reading a read as a write.
 * - THE RULES (exportFindings; every finding names its rule): A outcome, graphdatair, impure (PURITY's five legs); A trace
 *   (an element without its trace entry, a trace entry without its element, two elements tracing one key or one relation),
 *   scope, native-ref (a key the scope neither observed nor related,
 *   or a ref that is not the one its key encodes), relation (a trace that is no projection relation of the scope, or
 *   incidences that are not its endpoints, from then to); B unknown-absent (a partial or unknown entity without the coverage
 *   feature), unknown-guessed (anything but the vendored explicit unknown {status: "unknown"}, no value member),
 *   coverage-known (a complete entity not {status: "known", value: 1}); C revision and basis (the trace's value is the
 *   projection's, compared with ===, and null where the projection holds none: a missing key, "" or a guess is a finding);
 *   D actions (exactly each exported entity's NATIVE_CONTROL_ACTIONS verbs by its producer, each once, read from the live
 *   import); E over-budget (an export admitted while a declared limit is exceeded: the case's declared limits, the entity and
 *   relation counts, and the presented bytes, UTF-8 compact JSON.stringify as an RPC call presents them, wb-gxd7.3), refusal
 *   (anything but exactly the typed unavailable naming an exceeded limit, its declared budget and a measure past it),
 *   refused-fitting; F truncated (an export missing an observed node, a related endpoint or a relation).
 * - THE READ PROOF (readProof, refusal #2's U1 cure, the landed wb-b1rq form): each absence reader's case reads its claim's
 *   listing (G1: the src walk less git's ignored set; D3: git's src listing; G2: git's src listing and the qa walk less git's
 *   ignored set, which equals git's qa listing), the read map its reader is handed, and git's own reading of every listed
 *   path (git hash-object --no-filters --stdin-paths, never this census's read). unread names every listed path the map lacks
 *   or holds a text for that does not hash to git's blob id (a dropped, blanked or shortened file), extra every mapped path the
 *   listing lacks, and missed, at each of three places (start, middle, end), every listed path the reader does not name when
 *   each mapped text carries the reader's word there on a line of its own (a reader that skips an entry or reads part of a
 *   text). G1 runs it once per site word through its own reader (refusal #3's U1 cure; its first word's proof and anchor proof
 *   stay as they were). Each witness holds its proof (all empty), and PROOF_CONTROLS proves the proof itself on a fixed three-file listing:
 *   a blanked, a shortened, a dropped and an extra map entry, and readers that read only the last entry, the first entry, the
 *   first 64 or the last 64 characters, or nothing, each named exactly; G1's anchor proof blanks control.ts in a read map of
 *   its own and must name it unread, so ids taken from the read map instead of git's reading red.
 * - THE SPELLINGS (refusal #4's U1, cured in R-B66 (2)'s second form: every spelling a word reader claims is a pinned
 *   falsifier through that reader): readPattern reads a live pattern's parts, the characters of its joiner class, the
 *   quantifier after it and its flags from its source. The landed vocabulary's GraphPolicy and GraphDataIR patterns
 *   (VOCABULARY, the live import) join each word's parts by any run (*) of the class [ \t._-], case folded (i). WORD_JOINERS
 *   holds none, each character of that class alone, a repeated run (..) and a mixed run ( - ), and WORD_CASES holds lower,
 *   upper and the written case, so SITE_WORD_SPELLINGS is 2 words x 8 joiners x 3 case forms = 48 spellings (G1) and
 *   OWNER_SPELLINGS its 24 GraphPolicy ones (G3). D3's pattern (EXECUTOR_REQUEST) joins "executor" and "request" by none or one
 *   (?) character of the class [ _-], case folded, so EXECUTOR_REQUEST_SPELLINGS is its 4 joiners x 3 case forms = 12
 *   spellings, and EXECUTOR_REQUEST_OUTSIDE is the other 4 joiners' 12 (a tab, a dot, a repeated run, a mixed run), pinned quiet.
 *
 * ROWS. A-F, the acceptance clauses, each pin a quote of its clause with its own case: the reference conforms where the pin
 * names a case, and each of the pin's MUTANTS is refused with exactly its rules while the reference conforms on the same case.
 * G, the statement's gate slice: G1 the live leg (the src listing against the walk less git's ignored set, its read proof once
 * per site word and PROOF_CONTROLS, the registration judge on the tree, on a planted exporter and on one planted module per
 * site word, SITE_CASES, the composed word reader's controls read through siteWords and through G1's own reader, every
 * spelling of SITE_WORD_SPELLINGS through G1's own reader alone and as a planted module, the live patterns' joiners and case
 * folding, and every registration's drive on every case), G2 the namespace the judge reads is the vendored producer
 * fixture's and no src or qa file names it, G3 docs/03's two sentences. Each absence reader is proven live inside its own case
 * twice: by a planted positive read after the tracked files in the same call (G1's planted exporter, one planted module per
 * site word naming that word only and one per SITE_WORD_SPELLINGS spelling; D3's planted src module
 * declaring an ExecutorRequest and one per EXECUTOR_REQUEST_SPELLINGS spelling, plus its pinned spellings and near misses; G2's
 * planted qa script naming the namespace) and by
 * its read proof over every listed file's own text (G1's once per site word). G3 holds the page it read to git's reading of
 * docs/03, holds the owner cells' shown view to the binding's own rendered text of every top-level table of the Ownership
 * section (tableViews, on the page and on every plant, with a control renderer that shows each cell source held unequal on
 * the page), and is proven live
 * by DOCS_PLANTS: the same reading of seventy-three in-memory edits of the live page (each plant's rules, the GraphPolicyCLI rows
 * it counts and what its two
 * views of the opening read, so a blinded view reds even where the other view still refuses the plant), refusal #1's five falsifiers D-MOVE,
 * D-LEAD, D-COMMENT, D-FENCE and D-ROW-DUP and its two controls, refusal #2's seven gate-authored docs falsifiers (the header
 * rename D-HEADER-SWAP among them), the further rendered shapes (a struck "no" in markdown or HTML, a visible HTML block
 * leading the section, a GraphPolicyCLI row in a quoted, an HTML or a listed table), refusal #3's four gate-authored rows
 * (D-GP-BOLD-ROW, D-GP-CODE-ROW, D-GP-LINK-ROW, D-GP-ALIAS-ROW: a second row of the same table whose owner cell shows
 * GraphPolicyCLI through markup or beside an alias), an HTML-marked, an escaped and a reference-linked owner row
 * (D-GP-HTML-ROW, D-GP-ESCAPE-ROW, read by the shown view alone, and D-GP-REFLINK-ROW, shown through the page's link
 * definitions, which a shownIn that drops them fails on tableViews' hold), two edits of the one row's owner cell (D-OWNER-BOLD,
 * D-OWNER-ALIAS), refusal #4's twenty-four D-GP-SPELLED rows under R-B66 (3) (a second row owned by each OWNER_SPELLINGS
 * spelling) and six further inline forms in a second row (D-GP-EMPH-ROW, D-GP-STRIKE-ROW, D-GP-NBSP-ROW, D-GP-ENTITY-ROW,
 * D-GP-CODE-ENTITY-ROW, D-GP-ESCAPE-ENTITY-ROW: emphasis, a strike, a no-break space entity, entity references in text and
 * in a code span, which the rule decodes, and escaped punctuation, which shows as its characters), R-B66 (3)'s other blocks
 * of the section in each further block type (D-OTHER-PARAGRAPH, D-OTHER-CODE, D-OTHER-HEADING and D-OTHER-DEF, a link
 * reference definition, which marked emits as a def block) and its exact compares, case and cell included
 * (D-HEADER-SWAP-FIRST, D-HEADER-SWAP-SECOND, D-CELL-CASE, D-SENTENCE-CASE), each refused with exactly its docs rules, and
 * three quiet plants (HTML comments, one inside another row's owner cell). Q, the residuals' pinned quiet rows.
 * RESIDUALS (named families, each member a pinned quiet row; a reader or judge that starts reading a member reds its row, and
 * so does a member silenced, R-B66 and rule 19's residual definition: a Q1 member's object keys name keys of the vendored v1
 * document, a Q2 member's string literals, decoded and joined, are read by a source reader, a Q3-Q5 member's edit changes the
 * reference's export (its first difference is named), a Q6-Q8 member does what its family names as the drive observer
 * driveEffects reads it on fixture projections of its own (the reference drive reads as NO_EFFECTS), and a Q9 member lands in
 * the section's tables):
 * R-UNNAMED (Q1, a module that builds a GraphDataIR-shaped document without naming a site word is no site), R-COMPOSED (Q2,
 * a reader's word built at run time or spelled through an escape; the Q1 and Q2 rows run each member through all three
 * source readers, G1's site words, G2's namespace and D3's executor request, and Q2 holds a composed word of each reader),
 * R-SCHEMA (Q3, the judge reads the vendored v1 shape, never a
 * GraphDataIR schema document: another feature's status, the schema hash), R-LABELS (Q4, entity and relation kinds and
 * incidence roles; kind labels are wb-gxd7.4's), R-SNAPSHOT-REVISIONS (Q5, the snapshot-level observation block: the trace
 * carries each element's revision, and an observation.revisions list that is empty or guessed is not judged), R-DEFERRED (Q6,
 * refusal #2's F4: a write or an edit a drive defers past its own settlement, on a timer, which every leg reads too early to
 * see), R-OUTSIDE (Q7, what a drive does outside what the five legs read: a global mark, a module record of the projection,
 * an outcome that changes from its third call on, refusal #1's F4, which two drives never reach, and an effect-free inherited
 * call reached past the view, Object.prototype.toString.call(view), refusal #3's F4, which the view never hands out),
 * R-REQUEST (Q8, the request object itself, which the request leg does not read since it walks the objects the judge handed: a
 * field rebound to an equal fresh copy with no edit, the gate's CTRL-REBIND-ONLY, a key added to the request, the request
 * frozen, its projection field rebound to another object after the export, refusal #4's F4 L2-REQUEST-PROJECTION-REBIND),
 * R-OWNER-CELL (Q9, G3 counts rows by each body row's second cell as it shows, through the vocabulary's GraphPolicy
 * word: a row naming GraphPolicyCLI only in another cell, refusal #3's F5 D-GP-CONCERN-ROW in its Concern cell, the same in its
 * Workbench cell, and in the first cell of a table whose header moves the owner column there; a header row naming it in its
 * second cell; and a second cell that shows gp by a spelling the word does not read: the binary's name gp, a character
 * reference the binding's rendering rule leaves undecoded (decimal, hexadecimal, refusal #4's F5 L2-GP-HEXREF-ROW, or named,
 * its L2-GP-SHY-ROW &shy;), an invisible or a confusable character inside the word; each
 * member lands in the section's tables, which the quiet row holds to differ from the live page's as the binding renders them;
 * the residual is the reading's: G3's witness also pins the live page's owner cells as they show, so a Q9 form written into
 * docs/03 itself reds G3's witness compare although docs03Findings counts no second GraphPolicyCLI row for it).
 * THE PINNED SET (closed form, refusal #3's CUT #4 FORM in the enumerate-the-resolvable shape: this list is what the census
 * claims, each reading a pinned case; any other form is outside the claim, and the forms known to be outside are the residual
 * families Q1-Q9, each member a pinned quiet row, and the NOT CLAIMED list):
 *  - G1 reads two site words, GraphPolicy and GraphDataIR (SITE_WORDS: the landed vocabulary's V1 and V2 through namedWords),
 *    with one reader, sitePaths over siteFindings, in exactly the spellings the live patterns read (refusal #4's U1, R-B66):
 *    each word's parts case folded and joined by any run of the class [ \t._-] (space, tab, dot, underscore, hyphen) or by
 *    none, as readPattern reads back from VOCABULARY's patterns. It is proven on each word: its read proof once per word over
 *    every walked src module at start, middle and end, one planted module per word naming that word only (PLANTED_WORD_SITES)
 *    in the same call, SITE_WORD_HITS and SITE_WORD_QUIET read through sitePaths as well as through siteWords, and every
 *    spelling of SITE_WORD_SPELLINGS (each word's parts in lower, upper and written case, joined by nothing, by each of the
 *    five joiners alone, by a repeated run and by a mixed run: 48 spellings), each read through siteFindings and sitePaths as
 *    exactly its word, alone and as one planted module per spelling in one call after the tracked modules, and each word
 *    planted once per place a module names a word in (WORD_PLACES: a line, a block and a doc comment, a double-quoted, a
 *    single-quoted and a template string, and code) in one call after the tracked modules; the planted exporter, the first
 *    word's proof, the anchor proof, PROOF_CONTROLS and SITE_CASES stay.
 *  - D3 reads EXECUTOR_REQUEST over every git-listed src module (executorRequestNamers): "executor request" case folded and
 *    joined by nothing or by one character of the class [ _-] (space, underscore, hyphen), as readPattern reads back from the
 *    pattern. It is proven by its read proof (ExecutorRequest), its planted ExecutorRequest module, EXECUTOR_REQUEST_HITS read
 *    through that reader, every spelling of EXECUTOR_REQUEST_SPELLINGS (its parts in every case form over its four joiners: 12
 *    spellings, each read whole, alone and as one planted module per spelling in one call after the tracked modules), and the
 *    spellings outside its reading pinned quiet: EXECUTOR_REQUEST_QUIET and EXECUTOR_REQUEST_OUTSIDE's 12; and it is planted
 *    once per place of WORD_PLACES in one call after the tracked modules. G2 reads the namespace literal graphpolicy.data.v1
 *    over git's src listing and the qa walk (namespaceNamers), proven by its read proof, its planted qa script and the
 *    namespace planted once per place of WORD_PLACES but code (the namespace is no name) in one call after the tracked files.
 *  - A1's five legs, each read once both drives have settled: the write leg compares nothing, it names the projection methods
 *    outside READ_METHODS the view handed out and the drive called; the class leg, the walk of the class (prototype and
 *    constructor) before against after the drives; the state leg, the walk of each projection a drive read against a fresh
 *    twin's; the request leg, the walk of the scope and budget objects the judge handed each drive and kept, against fresh
 *    copies (never the request's fields as read after the drives); the determinism leg, the walk of the two outcomes against
 *    each other.
 *  - G3's ownership-row reading: the body rows of the Ownership boundaries section's top-level tables as the landed binding
 *    bounds them (sectionTables), each body row's owner cell, its second cell whatever its table's header names (a header row
 *    is never counted), read as it shows in the document (shownIn: the
 *    binding's rendering rule over the cell's source lexed with the page's link definitions, held to the binding's own rendered
 *    tables by tableViews on the live page and on every plant, the plants carrying strong, emphasis, strike, code, link,
 *    reference link, HTML, escaped punctuation, a no-break space, and entity references in text and in a code span),
 *    a row counting when that shown text names GraphPolicy (namesGraphPolicy, the vocabulary's V1 word: refusal #4's U1 under
 *    R-B66 (3) pins every OWNER_SPELLINGS spelling read directly, and in place by its D-GP-SPELLED plant, a second row counted;
 *    the shown view collapses white space, so a tab or a run of spaces in a cell reaches the word as one space); then, in order, exactly
 *    one such row (ownership-rows), its owner cell's source exactly GraphPolicyCLI (ownership-owner), its table headed
 *    "Concern | Authoritative owner | Workbench may do", each header cell exactly (ownership-header: D-HEADER-SWAP,
 *    D-HEADER-SWAP-FIRST, D-HEADER-SWAP-SECOND), its third cell's first clause (its source up to its first "; ") exactly
 *    "nothing today (no gp seam is registered)", case included (ownership-cell: D-CELL-CASE among its plants), and no block of
 *    the section outside its top-level tables naming GraphPolicyCLI in its source, whatever its block type (a paragraph, a
 *    fenced code block, a lower heading, a link reference definition, a blockquote, a list or an HTML block, each a plant), a
 *    block of HTML comments only passed over (ownership-other). G3's
 *    boundary-opening reading: the GraphPolicyCLI boundary section bound once under the page title (boundary-bound), whose
 *    first block that renders (a block of HTML comments only passed over) is a paragraph (boundary-first) whose first sentence
 *    is the no-integration sentence both as rendered and in its source, case included (boundary-opening: D-SENTENCE-CASE among
 *    its plants).
 *  - Q1-Q9: every member of every residual family quiet in its row, and live in the same row (RESIDUALS above), so a member
 *    silenced reds its row.
 * NOT CLAIMED: what docs/03 says outside its Ownership boundaries and GraphPolicyCLI boundary sections (G3 is section-bound:
 * a GraphPolicyCLI row in another section's table, such as D-ROW-DUP's earlier table, is unread); the grants half of the statement ("within the caller's grants": the filing places the GP call's grant and
 * registry bounds on the standing host rules, docs/workbench/12-security.md:19 and 06-capability-registry.md:81, and names the
 * export shape as the new duty); that gp graph check accepts the reference document (Pi holds no GraphDataIR schema
 * document); the typed-executor-request half of the admissible set (D3: src declares no executor request today, so a listed
 * one is refused by actions until one exists, and the cut that adds one re-reads D3; D3 reads "executor request" in any case
 * joined by nothing or by one space, "_" or "-", and its witness pins the spellings it does not read: executor.request,
 * ExecRequest, executorsRequest, request executor and EXECUTOR_REQUEST_OUTSIDE's spellings joined by a tab, a dot, a repeated
 * run or a mixed run, in every case form); a site word whose parts a character outside the joiner class or a line break
 * separates (SITE_WORD_QUIET pins Graph/Policy, Graph:Data:IR and a word broken across two lines quiet: G1 reads the parts
 * joined only as its live patterns join them); a form of the binding's rendering rule that no plant carries (tableViews holds
 * shownIn to the binding on the live page and on the plants, whose inline forms the G3 bullet lists); a coordinated edit of
 * a spelling table together with the checks that read it in these files (the live patterns hold each table's joiner
 * characters, its parts, its run quantifier and its case flag, so a joiner character removed from every literal still reds
 * G1, but the two runs and the lower and upper case forms each table writes are this census's own choice, held by its
 * frozen-shape literals and its roster only); a projection read capped below the scope's size (every fixture read
 * is uncapped); the candidates' GraphDataIR spelling; the host's per-target admission (refusal #1's F1: D1's admissible set
 * is the per-producer verb set NATIVE_CONTROL_ACTIONS names, the filing's parenthetical, while the host's decision core
 * decideControl in src/workbench/control.ts further admits a verb only on an observed target inside the caller's scope with
 * a confirmed lifecycle-ownership relation, which the gate measured as 1 permitted of the reference's 7 K-FITS candidates;
 * those observed-target and confirmed-ownership halves are not judged here); the internal state of an opaque object or a
 * Proxy's target (the projection holds neither: A1's kinds); a refusal's measured beyond a count past the declared budget
 * (refusal #1's F3: E4 reads it no further); a reader edited to tell the read proof's planted word from a written one, a
 * gitIds edited to hash this census's own read of the same files (it still holds every text to the file's bytes), or a
 * coordinated edit of a reader and its read proof, PROOF_CONTROLS or the anchor proof in these files.
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, every residual family's member
 * count, the mutant and case ids per pin, the rule list, the registry, the docs plants with their rules, the docs rules,
 * READ_METHODS, the walk's probes with their facets, its facets and walked kinds, the equivalence controls, the read proof's
 * places and controls, the site words and their planted modules, the joiners, the case forms, the word places, the spelled words' parts, every
 * spelling of SITE_WORD_SPELLINGS, EXECUTOR_REQUEST_SPELLINGS and EXECUTOR_REQUEST_OUTSIDE, and each residual member's liveness
 * (a source member's kind, a drive member's effect) as literals; the judged set (every row's id, label
 * and pins, every pin's quote and witness, the residual members, every registered test title) is held to the out-of-file
 * roster test/fixtures/gp-snapshot-export-roster.json.
 * OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export (.beads/issues.jsonl) - each
 * acceptance clause is exactly one of rows A-F's labels, row G's label is a slice of the statement, each row's pin quotes tile
 * its label with nothing but separators, and the filing's Pi pin is the one D2 reads control.ts at; the vendored producer
 * fixture holds the namespace, the explicit unknown and the known status the judge reads; capability-registry.ts declares the
 * unavailable category; NATIVE_CONTROL_ACTIONS is the live src import; READ_METHODS and the writes the A1 members call are the
 * live class's methods, the writes outside READ_METHODS; git's blob ids anchor every text the readers read; the landed
 * vocabulary's live patterns (VOCABULARY) and D3's pattern hold the joiners and the case folding every spelling table pins
 * (readPattern reads them back in G1 and D3); the vendored fixture's keys hold what Q1's members name. So a pin or a row
 * removed from every literal of this file, the helper and the roster together still reds. The last case reads the vitest task
 * tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached its witness
 * compare, and each compare's result).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI exporter, seam, package or fake binary.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it, type TestContext } from "vitest";
import { NATIVE_CONTROL_ACTIONS } from "../src/workbench/control.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import config from "../vitest.config.js";
import { beadRow, gitList, ignoredOf, VOCABULARY, walkList } from "./helpers/gp-mw-coordination-census.js";
import {
  acceptanceClauses,
  admissibleActions,
  BOUNDARY_SENTENCE,
  buildProjection,
  CASES,
  type CaseRow,
  COMPLETE_FEATURE,
  COVERAGE_FEATURE,
  caseRow,
  composedOf,
  controlProof,
  DECOMPOSED_BASIS,
  DOCS_PLANTS,
  DOCS_RULES,
  type Drive,
  docs03Findings,
  docs03Reading,
  driftOf,
  driveEffects,
  driveFindings,
  EXECUTOR_JOINERS,
  EXECUTOR_REQUEST,
  EXECUTOR_REQUEST_HITS,
  EXECUTOR_REQUEST_OUTSIDE,
  EXECUTOR_REQUEST_QUIET,
  EXECUTOR_REQUEST_SPELLINGS,
  type Exported,
  executorRequestNamers,
  exportFindings,
  FACETS,
  FULL_READ,
  facetDrift,
  GRAPH_NAMESPACE,
  graphShapeFindings,
  HELD_PROVIDER,
  judgeCaseOf,
  KNOWN_STATUS,
  keyParts,
  MUTANTS,
  NO_EFFECTS,
  namesGraphPolicy,
  namespaceNamers,
  OVER_BUDGET_CODE,
  OWNER_SPELLINGS,
  ownerCells,
  PADDED_REVISION,
  PLACES,
  PLANTED_EXECUTOR_REQUEST,
  PLANTED_NAMESPACE,
  PLANTED_WORD_SITES,
  PROOF_CONTROLS,
  PURE_RECIPES,
  placedSites,
  presentedBytes,
  probeValue,
  QUOTES,
  READ_CALLS,
  READ_METHODS,
  RESIDUALS,
  ROWS,
  type Row,
  RULES,
  readPattern,
  readProof,
  recipeDrive,
  referenceExport,
  refOfKey,
  residualId,
  ruleOf,
  rulesOf,
  SCOPES,
  SITE_CASES,
  SITE_WORD_HITS,
  SITE_WORD_QUIET,
  SITE_WORD_SPELLINGS,
  SITE_WORDS,
  type SiteEntry,
  STRUCTURE_PROBES,
  scopeSpec,
  shapeKeysOf,
  siteFindings,
  sitePaths,
  siteWords,
  spellingSite,
  spellingTag,
  structureOf,
  tableViews,
  tiles,
  truthOf,
  UNHELD_PROVIDER,
  UNKNOWN_FEATURE,
  unreadOf,
  WALKED_KINDS,
  WORD_CASES,
  WORD_JOINERS,
  WORD_PARTS,
  WORD_PLACES,
} from "./helpers/gp-snapshot-export-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.2";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R2";
const SUITE = `gp snapshot-export census (${BEAD}, ${REQUIREMENT})`;
const CENSUS = "test/workbench-gp-snapshot-export-census.test.ts";
const HELPER = "test/helpers/gp-snapshot-export-census.ts";
const ROSTER_PATH = "test/fixtures/gp-snapshot-export-roster.json";
const EXPORT = ".beads/issues.jsonl";
const VENDORED = "test/fixtures/gp-host-adapter-snapshot.json";
const CONTROL = "src/workbench/control.ts";
const REGISTRY = "src/workbench/capability-registry.ts";
const DOCS_03 = "docs/workbench/03-architecture-and-ownership.md";
/** The filing's Pi pin ("at Pi 758ec18187a5"), where control.ts:30-37 is the NATIVE_CONTROL_ACTIONS declaration. */
const FILING_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const CONTROL_LINES = [30, 37] as const;
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** qa holds well over this many tracked files; fewer means G2's qa listing read nothing. */
const QA_FLOOR = 30;
/** The projection's six public writes, each called by an A1 purity member (refresh, markStale and relate also build the fixture). */
const LIVE_WRITES = ["disconnect", "ingest", "markStale", "reconnect", "refresh", "relate"] as const;
/** The byte margin the fixed byte budgets keep from the reference's presented bytes, so any exporter's spelling lands on the same side. */
const BYTE_MARGIN = 4;

/** A src module that exports a GraphDataIR snapshot, with a drive over the census's requests. */
interface ExportSite extends SiteEntry {
  readonly drive: Drive;
}
/** The registry: every src module naming a site word has exactly one entry. Empty today. */
const EXPORT_SITES: readonly ExportSite[] = [];

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(readFileSync(join(ROOT, ROSTER_PATH), "utf8")) as Roster;

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const json = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;
/** A string with every code point outside printable ASCII written as <U+XXXX>, so the roster holds no raw combining mark. */
const visible = (value: string): string => [...value].map(character => (/^[\x20-\x7e]$/.test(character) ? character : `<U+${(character.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}>`)).join("");

let srcTexts: ReadonlyMap<string, string> | undefined;
/** git's would-commit src listing, each file with its text (read once per run). */
function liveSrc(): ReadonlyMap<string, string> {
  srcTexts ??= new Map(gitList(ROOT, "src").map(path => [path, textOf(path)] as const));
  return srcTexts;
}

/**
 * git's own reading of each listed path (the landed wb-b1rq form): git hash-object --no-filters --stdin-paths reads every file's
 * bytes and answers its blob id, so the ids come from git and never from this census's read; readProof holds each read text to
 * them.
 */
function gitIds(paths: readonly string[]): Map<string, string> {
  if (paths.length === 0) return new Map();
  if (paths.some(path => path.includes("\n"))) throw new Error("git hash-object --stdin-paths cannot read a path holding a newline");
  const ids = execFileSync("git", ["hash-object", "--no-filters", "--stdin-paths"], { cwd: ROOT, encoding: "utf8", input: `${paths.join("\n")}\n`, maxBuffer: 1 << 26 })
    .split("\n")
    .filter(id => id !== "");
  if (ids.length !== paths.length) throw new Error(`git hash-object answered ${ids.length} ids for ${paths.length} paths`);
  return new Map(paths.map((path, index) => [path, ids[index] ?? ""] as const));
}
/** The read proof of one reader over the listing its claim covers, the read map its case read, and git's ids of the listing. */
const proofOver = (listing: readonly string[], texts: ReadonlyMap<string, string>, word: string, reader: (texts: ReadonlyMap<string, string>) => readonly string[]): Json => json(readProof(listing, texts, gitIds(listing), word, reader));

/** The reference's outcome on a case, over a fresh projection. */
const referenceOn = (row: CaseRow): ReturnType<typeof referenceExport> => referenceExport({ projection: buildProjection(), scope: scopeSpec(row.scope).scope, budget: row.budget });
const outcomeKind = (outcome: ReturnType<typeof referenceExport>): string => (outcome.ok ? "ok" : `refused ${outcome.limit}`);

/** Each mutant of a pin is refused with exactly its rules (all compared at once), and the reference conforms on the mutant's case. */
async function mutantsOf(pin: string): Promise<Json> {
  const rules: Record<string, Json> = {};
  const expected: Record<string, Json> = {};
  for (const row of MUTANTS.filter(mutant => mutant.pin === pin)) {
    rules[row.id] = rulesOf(await driveFindings(recipeDrive(row.recipe), caseRow(row.case)));
    expected[row.id] = [...row.expect];
    expect(await driveFindings(recipeDrive(), caseRow(row.case)), `the reference conforms on ${row.case}`).toEqual([]);
  }
  expect(rules, `each ${pin} mutant is refused with exactly its rules`).toEqual(expected);
  return rules;
}

/** A case's reference outcome conforms and has the case's declared kind (export, or a refusal naming its first exceeded limit). */
async function caseOf(id: string): Promise<Json> {
  const row = caseRow(id);
  expect(await driveFindings(recipeDrive(), row), `the reference conforms on ${id}`).toEqual([]);
  const outcome = referenceOn(row);
  expect(outcomeKind(outcome), `${id}'s outcome kind`).toBe(row.over.length === 0 ? "ok" : `refused ${row.over[0]}`);
  return outcome.ok ? { kind: "ok", entities: Object.keys(outcome.trace.entities).length, relations: Object.keys(outcome.trace.relations).length } : json(outcome);
}

const vendored = (): Record<string, unknown> => JSON.parse(textOf(VENDORED)) as Record<string, unknown>;
/** Every feature object of a GraphDataIR document. */
const featuresOf = (graph: Record<string, unknown>): unknown[] =>
  [...((graph.entities as Record<string, unknown>[] | undefined) ?? []), ...((graph.relations as Record<string, unknown>[] | undefined) ?? [])].flatMap(element => Object.values((element.features as Record<string, unknown> | undefined) ?? {}));

/** The class's own members, its prototype's and its statics', when this module loaded: the judge puts the class back after a drive edits it (A1). */
const CLASS_AT_LOAD = [Object.getOwnPropertyNames(ObservationProjection.prototype), Object.getOwnPropertyNames(ObservationProjection)];
/** The prototype's own prototype when this module loaded, held by identity (M-CLASS-PROTO replaces it; the judge puts it back). */
const PROTOTYPE_AT_LOAD: unknown = Object.getPrototypeOf(ObservationProjection.prototype);

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, (context: TestContext) => Json | Promise<Json>>> = {
  A1: async () => {
    const reference = recipeDrive();
    const purity: Record<string, Json> = {};
    for (const row of CASES) purity[row.id] = rulesOf(await driveFindings(reference, row));
    expect(Object.values(purity).flat(), "the reference leaves the projection unchanged and repeats itself on every case").toEqual([]);
    const walk: Record<string, Json> = {};
    for (const probe of STRUCTURE_PROBES) {
      const [edited, twin] = [probeValue(), probeValue()];
      probe.edit(edited);
      walk[probe.id] = facetDrift(structureOf([edited]), structureOf([twin])) ?? "";
    }
    expect(walk, "the walk the state, class and determinism legs compare reads every facet the header names, each control's first difference").toEqual(Object.fromEntries(STRUCTURE_PROBES.map(probe => [probe.id, probe.expect])));
    const kinds = [...new Set(structureOf([buildProjection()]).filter(facet => facet.facet === "kind").map(facet => String(facet.value)))].sort();
    expect(kinds, "a fixture projection's walk meets only the kinds it enters (no proxy, opaque object or function below its root)").toEqual([...WALKED_KINDS]);
    const providers = [...new Set(SCOPES.flatMap(spec => truthOf(buildProjection(), spec.scope).entities.map(entity => entity.ref.provider)))].sort();
    expect([providers.includes(UNHELD_PROVIDER), providers.includes(HELD_PROVIDER)], "the unheld provider holds no fixture node or endpoint, the held one does (refusal #2's F1)").toEqual([false, true]);
    expect(Object.keys(READ_CALLS), "E-EVERY-READ calls every READ_METHODS method").toEqual([...READ_METHODS]);
    const equivalents: Record<string, Json> = {};
    for (const row of PURE_RECIPES) equivalents[row.id] = await driveFindings(recipeDrive(row.recipe), caseRow("K-FITS"));
    expect(Object.values(equivalents).flat(), "every read, and edits of the copies the reads hand out, are judged pure").toEqual([]);
    const legs: Record<string, Json> = {};
    for (const row of MUTANTS.filter(mutant => mutant.pin === "A1")) legs[row.id] = (await driveFindings(recipeDrive(row.recipe), caseRow(row.case))).filter(finding => ruleOf(finding) === "impure");
    const mutants = await mutantsOf("A1");
    expect([Object.getOwnPropertyNames(ObservationProjection.prototype), Object.getOwnPropertyNames(ObservationProjection), Object.getPrototypeOf(ObservationProjection.prototype) === PROTOTYPE_AT_LOAD], "the judge put the class back after the class members' drives, its prototype's prototype by identity").toEqual([...CLASS_AT_LOAD, true]);
    return { mutants, legs, cases: purity, walk, kinds, providers, equivalents };
  },
  A2: async () => {
    const producer = vendored();
    expect(graphShapeFindings(producer), "the vendored producer fixture reads as a GraphDataIR document").toEqual([]);
    const shapes: Record<string, Json> = {};
    for (const row of CASES) {
      const outcome = referenceOn(row);
      if (outcome.ok) shapes[row.id] = graphShapeFindings(outcome.graph);
    }
    expect(Object.values(shapes).flat(), "every reference export reads as a GraphDataIR document").toEqual([]);
    return { producer: graphShapeFindings(producer), exports: Object.keys(shapes), mutants: await mutantsOf("A2") };
  },
  A3: async () => {
    const projection = buildProjection();
    expect(projection instanceof ObservationProjection, "the fixture is a real ObservationProjection").toBe(true);
    const scopes: Record<string, Json> = {};
    for (const spec of SCOPES) {
      const truth = truthOf(projection, spec.scope);
      const nodes = projection.query({ scope: spec.scope, limit: 10_000 }).nodes;
      for (const node of nodes) {
        const parts = [spec.scope.workspace, spec.scope.principal, node.nativeRef.provider, node.nativeRef.type, node.nativeRef.scope ?? "", node.nativeRef.id];
        expect(keyParts(node.key), `${node.nativeRef.id}'s key encodes its scope and ref`).toEqual(parts);
        expect(refOfKey(node.key), `${node.nativeRef.id}'s ref reads back from its key`).toEqual(node.nativeRef);
      }
      expect(nodes.length, `scope ${spec.id} holds its declared nodes`).toBe(spec.nodes.length);
      scopes[spec.id] = truth.entities.map(entity => `${entity.ref.provider}/${entity.ref.id}:${entity.observed ? "observed" : "related"}:${entity.completeness}`);
    }
    const cases: Record<string, Json> = {};
    for (const row of CASES) cases[row.id] = await caseOf(row.id);
    return { scopes, cases };
  },
  A4: async () => {
    const outcome = referenceOn(caseRow("K-FITS"));
    expect(outcome.ok, "the reference exports K-FITS").toBe(true);
    const traced = outcome.ok ? Object.values(outcome.trace.entities).map(entry => `${entry.ref.provider}/${entry.ref.id}`) : [];
    return { traced, relations: outcome.ok ? Object.keys(outcome.trace.relations).length : 0, mutants: await mutantsOf("A4") };
  },
  A5: async () => {
    const isolated: Record<string, Json> = {};
    for (const id of ["K-FITS", "K-OTHER-PRINCIPAL", "K-OTHER-WORKSPACE", "K-EMPTY"]) {
      const row = caseRow(id);
      const outcome = referenceOn(row);
      expect(outcome.ok, `${id} exports`).toBe(true);
      const keys = outcome.ok ? Object.values(outcome.trace.entities).map(entry => entry.key) : [];
      const scope = scopeSpec(row.scope).scope;
      expect(keys.filter(key => !isDeepStrictEqual((keyParts(key) ?? []).slice(0, 2), [scope.workspace, scope.principal])), `${id} traces only its own scope's keys`).toEqual([]);
      isolated[id] = keys.length;
    }
    return { isolated, mutants: await mutantsOf("A5") };
  },
  B1: async () => {
    const outcome = referenceOn(caseRow("K-FITS"));
    expect(outcome.ok, "the reference exports K-FITS").toBe(true);
    const truth = judgeCaseOf(caseRow("K-FITS")).truth;
    const byKey = new Map(outcome.ok ? Object.entries(outcome.trace.entities).map(([id, entry]) => [entry.key, id] as const) : []);
    const graph = outcome.ok ? (outcome.graph as { readonly entities: readonly { readonly id: string; readonly features: Record<string, unknown> }[] }) : { entities: [] };
    const marked = truth.entities.map(entity => ({ entity: `${entity.ref.provider}/${entity.ref.id}`, completeness: entity.completeness, coverage: json(graph.entities.find(candidate => candidate.id === byKey.get(entity.key))?.features[COVERAGE_FEATURE] ?? null) }));
    for (const entry of marked) expect(entry.coverage, `${entry.entity} (${entry.completeness})`).toEqual(entry.completeness === "complete" ? COMPLETE_FEATURE : UNKNOWN_FEATURE);
    expect(new Set(marked.map(entry => entry.completeness)), "the fixture holds complete, partial and unknown rows").toEqual(new Set(["complete", "partial", "unknown"]));
    return { marked, mutants: await mutantsOf("B1") };
  },
  B2: async () => ({ mutants: await mutantsOf("B2") }),
  B3: async () => ({ mutants: await mutantsOf("B3") }),
  C1: async () => {
    const truth = judgeCaseOf(caseRow("K-FITS")).truth;
    const forge = truth.entities.find(entity => entity.ref.provider === "forge" && entity.observed);
    expect(forge?.sourceRevision, "the projection keeps a snapshot's sourceVersion over its sourceRevision").toBe("forge-0.9.1");
    return { revisions: truth.entities.map(entity => entity.sourceRevision), mutants: await mutantsOf("C1") };
  },
  C2: async () => ({ bases: judgeCaseOf(caseRow("K-FITS")).truth.entities.map(entity => (entity.subjectBasis === null ? null : visible(entity.subjectBasis))), mutants: await mutantsOf("C2") }),
  C3: () => {
    const outcome = referenceOn(caseRow("K-FITS"));
    expect(outcome.ok, "the reference exports K-FITS").toBe(true);
    const entries = outcome.ok ? Object.values(outcome.trace.entities) : [];
    const session = entries.find(entry => entry.ref.provider === "claude-agent-sdk");
    const hex = (value: string | null | undefined): string => (value === null || value === undefined ? "null" : Buffer.from(value, "utf8").toString("hex"));
    expect(hex(session?.sourceRevision), "the padded, mixed-case revision is carried byte for byte").toBe(hex(PADDED_REVISION));
    expect(hex(session?.subjectBasis), "the decomposed basis is carried byte for byte").toBe(hex(DECOMPOSED_BASIS));
    expect([PADDED_REVISION.trim() !== PADDED_REVISION, PADDED_REVISION.toLowerCase() !== PADDED_REVISION, DECOMPOSED_BASIS.normalize("NFC") !== DECOMPOSED_BASIS], "each verbatim form differs from its trimmed, lower-cased or NFC form").toEqual([true, true, true]);
    const absent = entries.filter(entry => entry.sourceRevision === null && entry.subjectBasis === null).map(entry => `${entry.ref.provider}/${entry.ref.id}`);
    expect(absent, "a node with neither, and the related endpoint, carry null for both").toEqual(["local-detached/det-0001", "forge/art-0001"]);
    return { revision: hex(session?.sourceRevision), basis: hex(session?.subjectBasis), absent };
  },
  D1: async () => {
    const outcome = referenceOn(caseRow("K-FITS"));
    const listed = outcome.ok ? outcome.candidates.map(candidate => `${outcome.trace.entities[candidate.entity]?.ref.provider ?? "?"}:${candidate.action}`) : [];
    return { listed, mutants: await mutantsOf("D1") };
  },
  D2: () => {
    const pinned = execFileSync("git", ["show", `${FILING_PIN}:${CONTROL}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 24 }).split("\n");
    const [first, last] = CONTROL_LINES;
    const span = pinned.slice(first - 1, last);
    expect(span[0]?.startsWith("export const NATIVE_CONTROL_ACTIONS"), `${CONTROL}:${first} at the filing pin opens the declaration`).toBe(true);
    expect(span.at(-1), `${CONTROL}:${last} at the filing pin closes it`).toBe("});");
    expect(textOf(CONTROL).includes("export const NATIVE_CONTROL_ACTIONS"), "the live module still declares it").toBe(true);
    for (const [provider, verbs] of Object.entries(NATIVE_CONTROL_ACTIONS)) expect(admissibleActions(provider), `the judge reads ${provider}'s verbs from the live import`).toEqual(verbs);
    expect(admissibleActions("beads"), "a producer outside the map admits none").toEqual([]);
    expect(admissibleActions("toString"), "an inherited name admits none").toEqual([]);
    return { pin: FILING_PIN, lines: [first, last], first: span[0] ?? null, last: span.at(-1) ?? null };
  },
  D3: () => {
    const texts = liveSrc();
    expect(texts.size >= SRC_FLOOR && texts.has(CONTROL), "D3's src listing read the tree").toBe(true);
    const proof = proofOver(gitList(ROOT, "src"), texts, "ExecutorRequest", executorRequestNamers);
    expect(proof, "D3 read every listed src module as git reads it, and its reader names each one carrying a typed executor request at its start, middle or end").toEqual(json(FULL_READ));
    const named = executorRequestNamers(texts);
    expect(named, "no src module spells a typed executor request ('executor request' in any case, joined by nothing, a space, '_' or '-'), so the admissible set is NATIVE_CONTROL_ACTIONS alone").toEqual([]);
    const planted = executorRequestNamers(new Map([...texts, [PLANTED_EXECUTOR_REQUEST.path, PLANTED_EXECUTOR_REQUEST.text]]));
    expect(planted, "the same call, a planted typed executor request after the tracked modules: exactly it").toEqual([PLANTED_EXECUTOR_REQUEST.path]);
    const hits = EXECUTOR_REQUEST_HITS.map(word => executorRequestNamers(new Map([["src/workbench/zz-hit.ts", word]])).length === 1 ? (EXECUTOR_REQUEST.exec(word)?.[0] ?? null) : null);
    expect(hits.filter(hit => hit === null), "every listed spelling reads as a typed executor request").toEqual([]);
    const quiet = EXECUTOR_REQUEST_QUIET.filter(word => executorRequestNamers(new Map([["src/workbench/zz-quiet.ts", word]])).length === 0);
    expect(quiet, "and every near spelling is outside D3's reading").toEqual([...EXECUTOR_REQUEST_QUIET]);
    // R-B66 (3): D3's claim is its pattern's ("executor request", case folded, joined by nothing or by one character of its
    // class), every spelling it claims is a pinned falsifier through its reader, and every spelling of the other joiners is quiet.
    const reading = json(readPattern(EXECUTOR_REQUEST));
    const classChars = EXECUTOR_JOINERS.filter(joiner => joiner.text.length === 1).map(joiner => joiner.text);
    expect(reading, "D3's pattern joins its two parts, case folded, by nothing or by one character of a class whose characters are EXECUTOR_JOINERS' single joiners").toEqual(json({ parts: (WORD_PARTS.ExecutorRequest ?? []).map(part => part.toLowerCase()), chars: classChars, quantifier: "?", flags: "i", uniform: true }));
    expect(EXECUTOR_JOINERS.map(joiner => joiner.text), "D3's joiners are none and each character of its class alone").toEqual(["", ...classChars]);
    const others = WORD_JOINERS.filter(joiner => !EXECUTOR_JOINERS.includes(joiner));
    expect(others.filter(joiner => joiner.text.length === 1 && classChars.includes(joiner.text)).map(joiner => joiner.id), "every other joiner is a run or a character outside D3's class").toEqual([]);
    expect([EXECUTOR_REQUEST_SPELLINGS.map(entry => entry.id), EXECUTOR_REQUEST_OUTSIDE.map(entry => entry.id)], "D3's spellings over its joiners and over the other joiners, each in every case form").toEqual([EXECUTOR_JOINERS, others].map(joiners => joiners.flatMap(joiner => WORD_CASES.map(form => `ExecutorRequest/${joiner.id}/${form.id}`))));
    const spelled = Object.fromEntries(EXECUTOR_REQUEST_SPELLINGS.map(entry => [entry.id, executorRequestNamers(new Map([["src/workbench/zz-hit.ts", entry.spelling]])).length === 1 ? (EXECUTOR_REQUEST.exec(entry.spelling)?.[0] ?? null) : null]));
    expect(EXECUTOR_REQUEST_SPELLINGS.filter(entry => spelled[entry.id] !== entry.spelling).map(entry => entry.id), "every spelling D3 claims is read by its reader, the whole spelling matched").toEqual([]);
    const outside = EXECUTOR_REQUEST_OUTSIDE.filter(entry => executorRequestNamers(new Map([["src/workbench/zz-quiet.ts", entry.spelling]])).length > 0).map(entry => entry.id);
    expect(outside, "and no spelling of the other joiners is").toEqual([]);
    const spellingSites = EXECUTOR_REQUEST_SPELLINGS.map(spellingSite);
    const spellingPlants = executorRequestNamers(new Map([...texts, ...spellingSites.map(site => [site.path, site.text] as const)]));
    expect(spellingPlants, "the same call, one planted module per spelling after the tracked modules: exactly them, in listing order").toEqual(spellingSites.map(site => site.path));
    const placed = placedSites("executor", "ExecutorRequest");
    const placedPlants = executorRequestNamers(new Map([...texts, ...placed.map(site => [site.path, site.text] as const)]));
    expect(placedPlants, "the same call, a typed executor request planted once per place a module names a word in (WORD_PLACES): exactly them, in listing order").toEqual(placed.map(site => site.path));
    return { named, planted, proof, hits, quiet, reading, spelled, outside, spellingPlants, placedPlants };
  },
  E1: async () => ({ case: await caseOf("K-NODES"), mutants: await mutantsOf("E1") }),
  E2: async () => ({ case: await caseOf("K-EDGES"), mutants: await mutantsOf("E2") }),
  E3: async () => {
    const roomy = referenceOn(caseRow("K-FITS"));
    const bytes = roomy.ok ? presentedBytes(roomy.graph) : 0;
    const tight = caseRow("K-BYTES").budget.maxBytes;
    const loose = caseRow("K-FITS").budget.maxBytes;
    expect(bytes > tight * BYTE_MARGIN && bytes * BYTE_MARGIN < loose, "the fixed byte budgets sit well clear of the presented bytes").toBe(true);
    return { case: await caseOf("K-BYTES"), margin: BYTE_MARGIN, mutants: await mutantsOf("E3") };
  },
  E4: async () => {
    expect(/export type CapabilityErrorCategory = [^;]*"unavailable"/.test(textOf(REGISTRY)), "the registry's error categories hold unavailable").toBe(true);
    const all = referenceOn(caseRow("K-ALL"));
    expect(all.ok ? "ok" : [all.category, all.code], "K-ALL is the typed unavailable").toEqual(["unavailable", OVER_BUDGET_CODE]);
    expect(await driveFindings(recipeDrive(), caseRow("K-ALL")), "and conforms").toEqual([]);
    return { all: json(all), mutants: await mutantsOf("E4") };
  },
  F1: async () => ({ atBudget: await caseOf("K-AT-BUDGET"), mutants: await mutantsOf("F1") }),
  G1: async () => {
    const texts = liveSrc();
    expect(texts.size, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(texts.has(CONTROL) && (texts.get(CONTROL) ?? "").includes("NATIVE_CONTROL_ACTIONS"), "the listing read the src tree").toBe(true);
    const walked = walkList(ROOT, "src");
    const ignored = ignoredOf(ROOT, walked);
    const listed = walked.filter(path => !ignored.has(path));
    expect(listed, "git's src listing equals the walk less what git ignores").toEqual([...texts.keys()]);
    const proof = proofOver(listed, texts, SITE_WORDS[0] ?? "", sitePaths);
    expect(proof, "G1 read every walked src module as git reads it, and its reader names each one carrying a site word at its start, middle or end").toEqual(json(FULL_READ));
    const anchor = proofOver([CONTROL, REGISTRY], new Map([[CONTROL, ""], [REGISTRY, textOf(REGISTRY)]]), SITE_WORDS[0] ?? "", sitePaths);
    expect(anchor, "the same proof over a read map that blanks control.ts names it unread: the ids are git's reading of the files, never the map's").toEqual(json({ ...FULL_READ, unread: [CONTROL] }));
    const controls: Record<string, Json> = {};
    for (const control of PROOF_CONTROLS) controls[control.id] = json(controlProof(control));
    expect(controls, "the read proof names exactly what each control drops, blanks, shortens or adds, and every entry or place each hollow reader skips").toEqual(Object.fromEntries(PROOF_CONTROLS.map(control => [control.id, json(control.expect)])));
    const touched = sitePaths(texts);
    expect({ registration: siteFindings(EXPORT_SITES, texts), touched }, "no src module exports a GraphDataIR snapshot today").toEqual({ registration: [], touched: [] });
    const planted = new Map([...texts, ["src/workbench/zz-gp-export.ts", 'export const NAMESPACE = "graphpolicy.data.v1";\n']]);
    const plantedFindings = siteFindings(EXPORT_SITES, planted);
    expect(plantedFindings, "the same call, a planted exporter after the tracked modules: exactly its finding").toEqual(["S-UNREGISTERED src/workbench/zz-gp-export.ts names GraphPolicy with no EXPORT_SITES registration"]);
    const sites: Record<string, Json> = {};
    for (const entry of SITE_CASES) {
      const found = siteFindings(entry.sites, new Map(Object.entries(entry.files))).map(finding => finding.split(" ", 1)[0] ?? "");
      expect(found, entry.id).toEqual(entry.expect);
      sites[entry.id] = found;
    }
    for (const word of SITE_WORD_HITS) expect(siteWords(word).length, `${word} reads as a site word`).toBeGreaterThan(0);
    for (const word of SITE_WORD_QUIET) expect(siteWords(word), `${word} is no site word`).toEqual([]);
    // Refusal #3's U1: G1's own reader (sitePaths over siteFindings) is proven on every site word G1 claims, not on the first only.
    const wordProofs: Record<string, Json> = {};
    for (const word of SITE_WORDS) wordProofs[word] = proofOver(listed, texts, word, sitePaths);
    expect(wordProofs, "G1's reader is proven on each site word: its read proof once per SITE_WORDS member, through sitePaths, over every walked src module").toEqual(Object.fromEntries(SITE_WORDS.map(word => [word, json(FULL_READ)])));
    expect(PLANTED_WORD_SITES.map(plant => [plant.word, siteWords(plant.text)]), "one planted module per site word, each naming that word only").toEqual(SITE_WORDS.map(word => [word, [word]]));
    const wordPlants = siteFindings(EXPORT_SITES, new Map([...texts, ...PLANTED_WORD_SITES.map(plant => [plant.path, plant.text] as const)]));
    const plantedOrder = [...PLANTED_WORD_SITES].sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
    expect(wordPlants, "the same call, one planted module per site word after the tracked modules: exactly their findings, each naming its word").toEqual(plantedOrder.map(plant => `S-UNREGISTERED ${plant.path} names ${plant.word} with no EXPORT_SITES registration`));
    const hitPath = "src/workbench/zz-hit.ts";
    const hitFindings = SITE_WORD_HITS.map(word => siteFindings([], new Map([[hitPath, word]])).join(" | "));
    expect(SITE_WORD_HITS.filter(word => !isDeepStrictEqual(sitePaths(new Map([[hitPath, word]])), [hitPath])), "every listed spelling is read by G1's own reader (sitePaths over siteFindings), not only by siteWords").toEqual([]);
    const quietPaths = SITE_WORD_QUIET.filter(word => sitePaths(new Map([["src/workbench/zz-quiet.ts", word]])).length > 0);
    expect(quietPaths, "and no near spelling is").toEqual([]);
    // Refusal #4's U1 (R-B66 (1)-(2), its second form): G1's claim is its reader's, and every spelling it claims is a pinned
    // falsifier through that reader. The landed vocabulary's live patterns join each site word's parts, case folded, by any run
    // of one class; WORD_JOINERS holds each character of that class alone, none, a repeated and a mixed run.
    const singles = WORD_JOINERS.filter(joiner => joiner.text.length === 1).map(joiner => joiner.text);
    const patterns = Object.fromEntries(SITE_WORDS.map(word => [word, json(readPattern(VOCABULARY.find(entry => entry.spelling === word)?.pattern ?? /(?!)/))]));
    expect(patterns, "each site word's live pattern (VOCABULARY) joins its parts, case folded, by any run of one class whose characters are WORD_JOINERS' single joiners").toEqual(Object.fromEntries(SITE_WORDS.map(word => [word, json({ parts: (WORD_PARTS[word] ?? []).map(part => part.toLowerCase()), chars: singles, quantifier: "*", flags: "i", uniform: true })])));
    const runs = WORD_JOINERS.filter(joiner => joiner.text.length > 1);
    expect([WORD_JOINERS.some(joiner => joiner.text === ""), runs.some(joiner => new Set(joiner.text).size === 1), runs.some(joiner => new Set(joiner.text).size > 1), runs.every(joiner => [...joiner.text].every(character => singles.includes(character)))], "any run: none, a repeated run of one joiner and a mixed run of several, every run character the class's").toEqual([true, true, true, true]);
    expect(SITE_WORD_SPELLINGS.map(entry => entry.id), "every site word's parts over every joiner in every case form").toEqual(SITE_WORDS.flatMap(word => WORD_JOINERS.flatMap(joiner => WORD_CASES.map(form => `${word}/${joiner.id}/${form.id}`))));
    const spellingReads = Object.fromEntries(SITE_WORD_SPELLINGS.map(entry => [entry.id, siteFindings([], new Map([[hitPath, entry.spelling]])).join(" | ")]));
    expect(SITE_WORD_SPELLINGS.filter(entry => spellingReads[entry.id] !== `S-UNREGISTERED ${hitPath} names ${entry.word} with no EXPORT_SITES registration`).map(entry => entry.id), "every spelling G1 claims is read by G1's one reader (siteFindings) as exactly its word").toEqual([]);
    expect(SITE_WORD_SPELLINGS.filter(entry => !isDeepStrictEqual(sitePaths(new Map([[hitPath, entry.spelling]])), [hitPath])).map(entry => entry.id), "and through sitePaths").toEqual([]);
    const spellingSites = SITE_WORD_SPELLINGS.map(spellingSite);
    const spellingPlants = siteFindings(EXPORT_SITES, new Map([...texts, ...spellingSites.map(site => [site.path, site.text] as const)]));
    expect(spellingPlants, "the same call, one planted module per spelling after the tracked modules: exactly their findings, each naming its word").toEqual(SITE_WORD_SPELLINGS.map((entry, index) => `S-UNREGISTERED ${spellingSites[index]?.path ?? ""} names ${entry.word} with no EXPORT_SITES registration`));
    // R-B66 (3): G1's reader is proven on every place a module names a word in (WORD_PLACES), each site word planted once per place in one call.
    const placed = SITE_WORDS.flatMap(word => placedSites(`site-${word}`, word).map(site => ({ ...site, word })));
    expect(placed.map(site => `${site.word}:${site.id}`), "each site word, a name, in every place").toEqual(SITE_WORDS.flatMap(word => WORD_PLACES.map(place => `${word}:${place.id}`)));
    const placedFindings = siteFindings(EXPORT_SITES, new Map([...texts, ...placed.map(site => [site.path, site.text] as const)]));
    const placedOrder = [...placed].sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
    expect(placedFindings, "the same call, each site word planted once per place after the tracked modules (comments, strings, code): exactly their findings, each naming its word").toEqual(placedOrder.map(site => `S-UNREGISTERED ${site.path} names ${site.word} with no EXPORT_SITES registration`));
    const drives: string[] = [];
    for (const site of EXPORT_SITES) for (const row of CASES) drives.push(...(await driveFindings(site.drive, row)).map(finding => `${site.file} ${row.id} ${finding}`));
    expect(drives, "every registered exporter conforms on every case").toEqual([]);
    return { touched, proof, anchor, controls, planted: plantedFindings, sites, hits: SITE_WORD_HITS.map(word => siteWords(word).join(",")), quiet: SITE_WORD_QUIET.length, drives, wordProofs, wordPlants, hitFindings, quietPaths, patterns, spellingReads, spellingPlants, placedFindings };
  },
  G2: () => {
    const producer = vendored() as { readonly schema_ref?: { readonly namespace?: unknown } };
    expect(producer.schema_ref?.namespace, "the namespace the judge reads is the vendored producer fixture's").toBe(GRAPH_NAMESPACE);
    const qa = gitList(ROOT, "qa");
    expect([liveSrc().size >= SRC_FLOOR, qa.length >= QA_FLOOR], "G2's src and qa listings read the tree").toEqual([true, true]);
    const qaWalked = walkList(ROOT, "qa");
    const qaIgnored = ignoredOf(ROOT, qaWalked);
    const qaListed = qaWalked.filter(path => !qaIgnored.has(path));
    expect(qaListed, "git's qa listing equals the walk less what git ignores").toEqual(qa);
    const texts = new Map([...liveSrc(), ...qa.map(path => [path, textOf(path)] as const)]);
    const proof = proofOver([...gitList(ROOT, "src"), ...qaListed], texts, GRAPH_NAMESPACE, namespaceNamers);
    expect(proof, "G2 read every listed src module and every walked qa file as git reads it, and its reader names each one carrying the namespace at its start, middle or end").toEqual(json(FULL_READ));
    const naming = namespaceNamers(texts);
    expect(naming, "no src or qa file names the GraphDataIR namespace").toEqual([]);
    const planted = namespaceNamers(new Map([...texts, [PLANTED_NAMESPACE.path, PLANTED_NAMESPACE.text]]));
    expect(planted, "the same call, a planted qa script naming the namespace after the tracked files: exactly it").toEqual([PLANTED_NAMESPACE.path]);
    // R-B66 (3): G2's reader is proven on every place a module names the namespace in (WORD_PLACES but code: the namespace is no name).
    const placed = placedSites("namespace", GRAPH_NAMESPACE);
    expect(placed.map(site => site.id), "every place but code").toEqual(WORD_PLACES.filter(place => place.id !== "code").map(place => place.id));
    const placedPlants = namespaceNamers(new Map([...texts, ...placed.map(site => [site.path, site.text] as const)]));
    expect(placedPlants, "the same call, the namespace planted once per place after the tracked files: exactly them, in listing order").toEqual(placed.map(site => site.path));
    return { namespace: GRAPH_NAMESPACE, naming, planted, proof, placedPlants };
  },
  G3: () => {
    const page = textOf(DOCS_03);
    const unread = unreadOf([DOCS_03], new Map([[DOCS_03, page]]), gitIds([DOCS_03]));
    expect(unread, "G3 read docs/03 as git reads it (its reader is proven live by DOCS_PLANTS)").toEqual([]);
    const reading = docs03Reading(page);
    expect(docs03Findings(reading), "docs/03: one GraphPolicyCLI ownership row registering no gp seam, and a GraphPolicyCLI boundary section opening with Pi's no-integration sentence").toEqual([]);
    const plants: Record<string, Json> = {};
    const views: Record<string, Json> = {};
    const counts: Record<string, Json> = {};
    for (const plant of DOCS_PLANTS) {
      const planted = docs03Reading(plant.edit(page));
      plants[plant.id] = docs03Findings(planted).map(ruleOf);
      views[plant.id] = [planted.boundary.opening === BOUNDARY_SENTENCE, planted.boundary.source === BOUNDARY_SENTENCE];
      counts[plant.id] = planted.ownership.rows;
    }
    expect(plants, "the same reader on each planted page: exactly the plant's docs rules").toEqual(Object.fromEntries(DOCS_PLANTS.map(plant => [plant.id, [...plant.expect]])));
    // Refusal #3's U3: the owner cell is read as it shows, and that view is the binding's own rendering of the section's tables.
    const owners = ownerCells(page).cells.map(cell => cell.shown);
    const unlike = [["the live page", page] as const, ...DOCS_PLANTS.map(plant => [plant.id, plant.edit(page)] as const)].flatMap(([id, text]) => {
      const tables = tableViews(text);
      return isDeepStrictEqual(tables.bound, tables.shown) ? [] : [id];
    });
    expect(unlike, "every top-level table of the Ownership section shows, cell by cell, what the binding renders for it, on the live page and on every plant").toEqual([]);
    const sourceTables = tableViews(page, () => cell => cell);
    const control = isDeepStrictEqual(sourceTables.bound, sourceTables.shown);
    expect(control, "the control renderer that shows each cell's source differs from the binding on the live page, so the comparison is live").toBe(false);
    // Refusal #4's U1 under R-B66 (3): G3's word is the vocabulary's GraphPolicy (namesGraphPolicy over the shown cell), so every
    // GraphPolicy spelling is read directly, and in place by its D-GP-SPELLED plant, a second row counted beside the GraphPolicyCLI row.
    expect(OWNER_SPELLINGS.map(entry => entry.id), "G3's spellings are G1's GraphPolicy spellings").toEqual(SITE_WORD_SPELLINGS.filter(entry => entry.word === "GraphPolicy").map(entry => entry.id));
    const ownerWords = Object.fromEntries(OWNER_SPELLINGS.map(entry => [entry.id, namesGraphPolicy(entry.spelling)]));
    expect(OWNER_SPELLINGS.filter(entry => ownerWords[entry.id] !== true).map(entry => entry.id), "namesGraphPolicy reads every GraphPolicy spelling").toEqual([]);
    const spelled = OWNER_SPELLINGS.map(entry => `D-GP-SPELLED-${spellingTag(entry)}`);
    expect(DOCS_PLANTS.filter(plant => plant.id.startsWith("D-GP-SPELLED-")).map(plant => plant.id), "one in-place plant per GraphPolicy spelling").toEqual(spelled);
    expect(spelled.filter(id => counts[id] !== 2), "each spelled row is counted beside the GraphPolicyCLI row").toEqual([]);
    return { reading: json(reading), plants, views, page: unread, counts, owners, unlike, control, ownerWords };
  },
};

/** Every key of the vendored producer fixture, at any depth (a Q1 member's object keys are read against it). */
const vendoredKeys = (): Set<string> => {
  const keys = new Set<string>();
  const walk = (value: unknown): void => {
    if (Array.isArray(value)) for (const item of value) walk(item);
    else if (typeof value === "object" && value !== null)
      for (const [key, inner] of Object.entries(value)) {
        keys.add(key);
        walk(inner);
      }
  };
  walk(vendored());
  return keys;
};
/**
 * A quiet row: every member of the residual family reads as no finding (a drive member is judged by driveFindings on K-FITS, a
 * docs member by G3's reading of the edited live page), and every member is live (R-B66 and rule 19's residual definition: a
 * member silenced reds its row): a shape member's object keys name keys of the vendored v1 document, a composed member's string
 * literals, decoded and joined, are read by a source reader, an outcome member's edit changes the reference's export (its first
 * difference named), a drive member does what its family names as driveEffects reads it (the reference drive reading as
 * NO_EFFECTS), and a docs member lands in the section's tables.
 */
const quietRow = async (id: string): Promise<Json> => {
  const members = RESIDUALS[id] ?? [];
  expect(members.length, `${id} has members`).toBeGreaterThan(0);
  const reference = referenceOn(caseRow("K-FITS"));
  const findings: string[] = [];
  const live: Record<string, Json> = {};
  if (members.some(member => member.kind === "drive")) expect(await driveEffects(() => recipeDrive()), "the drive observer reads no effect of the reference drive").toEqual(NO_EFFECTS);
  for (const member of members) {
    if (member.kind === "source") {
      const files = new Map([[member.path, member.text]]);
      findings.push(...siteWords(member.text), ...siteFindings([], files), ...namespaceNamers(files), ...executorRequestNamers(files));
      if (member.live === "shape") {
        const keys = shapeKeysOf(member.text, vendoredKeys());
        expect(keys, `${member.path} builds a GraphDataIR-shaped value: its object keys name keys of the vendored v1 document`).not.toEqual([]);
        live[member.path] = keys;
      } else {
        const composed = composedOf(member.text);
        const built = new Map([[member.path, composed]]);
        const read = [...siteWords(composed), ...namespaceNamers(built), ...executorRequestNamers(built)];
        expect(read, `${member.path} builds a reader's word at run time or through an escape: its string literals, decoded and joined, are read`).not.toEqual([]);
        live[member.path] = [composed, ...read];
      }
    } else if (member.kind === "docs") {
      const page = textOf(DOCS_03);
      const edited = member.edit(page);
      expect(tableViews(edited).bound, `${member.id} lands in the Ownership section's tables as the binding renders them`).not.toEqual(tableViews(page).bound);
      findings.push(...docs03Findings(docs03Reading(edited)));
      live[member.id] = true;
    } else if (member.kind === "drive") {
      try {
        findings.push(...(await driveFindings(member.drive(), caseRow("K-FITS"))));
      } finally {
        member.after?.();
      }
      const effects = await driveEffects(member.drive, member.after);
      expect(effects, `${member.id} does what its family names, as the drive observer reads it`).toEqual({ ...NO_EFFECTS, ...member.effect });
      live[member.id] = json(effects);
    } else if (!reference.ok) findings.push("the reference did not export K-FITS");
    else {
      const edited = member.edit(reference as Exported);
      const drift = driftOf(structureOf([reference]), structureOf([edited]));
      expect(drift, `${member.id} edits the reference's export`).toBeDefined();
      live[member.id] = json(drift ?? null);
      findings.push(...exportFindings(judgeCaseOf(caseRow("K-FITS")), edited));
    }
  }
  expect(findings, `${id}: every member is quiet`).toEqual([]);
  return { members: members.map(residualId), findings, live };
};

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: 120_000 }, async context => {
        const implementation = IMPL[pin];
        const witness = row.id === "Q" ? await quietRow(pin) : implementation === undefined ? null : await implementation(context);
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the mutants and cases per pin, the rules and the registry are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:3", "C:3", "D:3", "E:4", "F:1", "G:3", "Q:9"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:2", "Q2:3", "Q3:2", "Q4:2", "Q5:2", "Q6:2", "Q7:4", "Q8:4", "Q9:10"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const perPin = ROWS.flatMap(row => row.pins).map(pin => `${pin}:${MUTANTS.filter(mutant => mutant.pin === pin).map(mutant => mutant.id).join(",")}`);
    expect(perPin).toEqual([
      "A1:M-MUTATES,M-COUNTER-IDS,M-DISCONNECT-UNHELD,M-RECONNECT-UNHELD,M-IDENTITY-REFUSAL,M-DISCONNECT-HELD,M-WRITE-NOOP,M-BYPASS-WRITE,M-CLASS-PATCH,M-CLASS-STATIC,M-REFRESH-WRITE,M-RELATE-WRITE,M-INGEST-WRITE,M-OTHER-CALL,M-NONENUM-MEMO,M-FREEZE,M-PREVENT-EXTENSIONS,M-SYMBOL-FIELD,M-FIXED-REVISION,M-REVISION-ACCESSOR,M-PROTO-SWAP,M-FROZEN-NODE,M-SCOPE-REORDER,M-SHADOW-CONNECTIONS,M-KEY-ORDER,M-CLASS-PROTO,M-BUDGET-EDIT,M-SCOPE-EDIT,M-REBIND-BUDGET,M-REBIND-BUDGET-REFLECT,M-REBIND-SCOPE,M-REBIND-SCOPE-ACCESSOR",
      "A2:M-NAMESPACE,M-DUPLICATE-ID,M-DANGLING",
      "A3:",
      "A4:M-UNTRACED,M-GHOST,M-REF-SWAP,M-EDGE-REVERSED,M-EDGE-KIND",
      "A5:M-FOREIGN-NODE,M-FOREIGN-EDGE,M-SCOPE-STAMP",
      "B1:M-COMPLETE-AS-UNKNOWN",
      "B2:M-COVERAGE-ABSENT,M-DROP-UNKNOWN",
      "B3:M-COVERAGE-HALF,M-COVERAGE-COMPLETE,M-COVERAGE-VALUE-NULL",
      "C1:M-REVISION-TRIM,M-REVISION-LOWER,M-REVISION-GUESS,M-REVISION-SWAP",
      "C2:M-BASIS-NFC,M-BASIS-DROP,M-BASIS-EMPTY",
      "C3:",
      "D1:M-ACTION-EXTRA,M-ACTION-MISSING,M-ACTION-UNIVERSAL,M-ACTION-UNLISTED,M-ACTION-DUPLICATE",
      "D2:",
      "D3:",
      "E1:M-NODES-TRUNCATE,M-NODES-ADMIT,M-NODES-OVERFLOW",
      "E2:M-EDGES-TRUNCATE,M-EDGES-ADMIT,M-EDGES-OVERFLOW",
      "E3:M-BYTES-ADMIT,M-BYTES-BLOAT",
      "E4:M-OVER-THROW,M-OVER-UNTYPED,M-OVER-WRONG-LIMIT,M-OVER-DECLARED,M-OVER-PARTIAL,M-REFUSE-FITTING",
      "F1:M-DROP-NODE,M-DROP-EDGE",
      "G1:",
      "G2:",
      "G3:",
      "Q1:",
      "Q2:",
      "Q3:",
      "Q4:",
      "Q5:",
      "Q6:",
      "Q7:",
      "Q8:",
      "Q9:",
    ]);
    expect(MUTANTS.length, "every mutant belongs to a pin").toBe(77);
    expect(CASES.map(row => `${row.id}:${row.scope}:${row.over.join("+") || "fits"}`)).toEqual([
      "K-FITS:A:fits",
      "K-OTHER-PRINCIPAL:B:fits",
      "K-OTHER-WORKSPACE:C:fits",
      "K-EMPTY:D:fits",
      "K-AT-BUDGET:A:fits",
      "K-NODES:A:nodes",
      "K-EDGES:A:edges",
      "K-BYTES:A:bytes",
      "K-ALL:A:nodes+edges+bytes",
    ]);
    expect([...RULES]).toEqual(["outcome", "graphdatair", "trace", "scope", "native-ref", "relation", "truncated", "unknown-absent", "unknown-guessed", "coverage-known", "revision", "basis", "actions", "over-budget", "refusal", "refused-fitting", "impure"]);
    expect(RULES.filter(rule => !MUTANTS.some(mutant => mutant.expect.includes(rule))), "every rule is some mutant's").toEqual([]);
    expect(SITE_CASES.map(entry => `${entry.id}:${entry.expect.join(",")}`)).toEqual(["S-REGISTERED:", "S-UNREGISTERED:S-UNREGISTERED", "S-STALE:S-STALE", "S-DUPLICATE:S-DUPLICATE", "S-UNEXPORTED:S-UNEXPORTED"]);
    expect(EXPORT_SITES.map(site => `${site.file}#${site.exporter}`)).toEqual([]);
    expect(DOCS_PLANTS.map(plant => `${plant.id}:${plant.expect.join(",")}`)).toEqual([
      "D-MOVE:boundary-opening",
      "D-LEAD:boundary-opening",
      "D-COMMENT:boundary-first",
      "D-FENCE:boundary-first",
      "D-ROW-DUP:ownership-cell",
      "D-CELL-ONLY:ownership-cell",
      "D-SENTENCE-EDIT:boundary-opening",
      "D-ROW-SAME-TABLE:ownership-rows",
      "D-OWNERSHIP-DUP:ownership-bound",
      "D-HEADING-DUP:boundary-bound",
      "D-REHOME:boundary-bound",
      "D-COMMENT-ABOVE:",
      "D-HEADER-SWAP:ownership-header",
      "D-BLOCKQUOTE:boundary-first",
      "D-LIST-LEAD:boundary-first",
      "D-SECOND-TABLE:ownership-rows",
      "D-STRIKE:boundary-opening",
      "D-STRIKE-HTML:boundary-opening",
      "D-SETEXT-DUP:boundary-bound",
      "D-CELL-STRIKE:ownership-cell",
      "D-HTML-LEAD:boundary-first",
      "D-QUOTED-ROW:ownership-other",
      "D-HTML-ROW:ownership-other",
      "D-LISTED-ROW:ownership-other",
      "D-OWNER-COMMENT:",
      "D-GP-BOLD-ROW:ownership-rows",
      "D-GP-CODE-ROW:ownership-rows",
      "D-GP-LINK-ROW:ownership-rows",
      "D-GP-ALIAS-ROW:ownership-rows",
      "D-GP-HTML-ROW:ownership-rows",
      "D-GP-ESCAPE-ROW:ownership-rows",
      "D-GP-REFLINK-ROW:ownership-rows",
      "D-OWNER-BOLD:ownership-owner",
      "D-OWNER-ALIAS:ownership-owner",
      "D-OWNER-CELL-COMMENT:",
      "D-GP-SPELLED-none-lower:ownership-rows",
      "D-GP-SPELLED-none-upper:ownership-rows",
      "D-GP-SPELLED-none-written:ownership-rows",
      "D-GP-SPELLED-space-lower:ownership-rows",
      "D-GP-SPELLED-space-upper:ownership-rows",
      "D-GP-SPELLED-space-written:ownership-rows",
      "D-GP-SPELLED-tab-lower:ownership-rows",
      "D-GP-SPELLED-tab-upper:ownership-rows",
      "D-GP-SPELLED-tab-written:ownership-rows",
      "D-GP-SPELLED-dot-lower:ownership-rows",
      "D-GP-SPELLED-dot-upper:ownership-rows",
      "D-GP-SPELLED-dot-written:ownership-rows",
      "D-GP-SPELLED-underscore-lower:ownership-rows",
      "D-GP-SPELLED-underscore-upper:ownership-rows",
      "D-GP-SPELLED-underscore-written:ownership-rows",
      "D-GP-SPELLED-hyphen-lower:ownership-rows",
      "D-GP-SPELLED-hyphen-upper:ownership-rows",
      "D-GP-SPELLED-hyphen-written:ownership-rows",
      "D-GP-SPELLED-repeated-lower:ownership-rows",
      "D-GP-SPELLED-repeated-upper:ownership-rows",
      "D-GP-SPELLED-repeated-written:ownership-rows",
      "D-GP-SPELLED-mixed-lower:ownership-rows",
      "D-GP-SPELLED-mixed-upper:ownership-rows",
      "D-GP-SPELLED-mixed-written:ownership-rows",
      "D-GP-EMPH-ROW:ownership-rows",
      "D-GP-STRIKE-ROW:ownership-rows",
      "D-GP-NBSP-ROW:ownership-rows",
      "D-GP-ENTITY-ROW:ownership-rows",
      "D-GP-CODE-ENTITY-ROW:ownership-rows",
      "D-GP-ESCAPE-ENTITY-ROW:ownership-rows",
      "D-OTHER-PARAGRAPH:ownership-other",
      "D-OTHER-CODE:ownership-other",
      "D-OTHER-HEADING:ownership-other",
      "D-OTHER-DEF:ownership-other",
      "D-HEADER-SWAP-FIRST:ownership-header",
      "D-HEADER-SWAP-SECOND:ownership-header",
      "D-CELL-CASE:ownership-cell",
      "D-SENTENCE-CASE:boundary-opening",
    ]);
    expect([...DOCS_RULES]).toEqual(["ownership-bound", "ownership-rows", "ownership-owner", "ownership-header", "ownership-cell", "ownership-other", "boundary-bound", "boundary-first", "boundary-opening"]);
    expect(DOCS_RULES.filter(rule => !DOCS_PLANTS.some(plant => plant.expect.includes(rule))), "every docs rule is some plant's").toEqual([]);
    expect([...READ_METHODS]).toEqual(["aggregate", "aggregateStats", "events", "identityRefusals", "indexOf", "query", "relationRevision", "relations", "relationsPage", "stats", "truncation", "window"]);
    expect(STRUCTURE_PROBES.map(probe => `${probe.id}:${probe.expect}`)).toEqual([
      "S-EQUAL:",
      "S-VALUE:value",
      "S-NEGATIVE-ZERO:value",
      "S-NONENUMERABLE:keys",
      "S-SYMBOL:keys",
      "S-ATTRIBUTE:attributes",
      "S-ACCESSOR:attributes",
      "S-GETTER:get",
      "S-SETTER:set",
      "S-PROTOTYPE:prototype",
      "S-EXTENSIBLE:integrity",
      "S-NESTED-FROZEN:integrity",
      "S-MAP-ORDER:value",
      "S-MAP-SIZE:size",
      "S-MAP-OWN:keys",
      "S-SET-ORDER:value",
      "S-DATE:time",
      "S-UNSHARED:kind",
      "S-RESHARED:same",
      "S-PROXY:kind",
    ]);
    expect([...FACETS]).toEqual(["kind", "prototype", "integrity", "keys", "attributes", "value", "get", "set", "size", "time", "same"]);
    expect(FACETS.filter(facet => !STRUCTURE_PROBES.some(probe => probe.expect === facet)), "every facet is some probe's first difference").toEqual([]);
    expect([...WALKED_KINDS]).toEqual(["array", "map", "object", "set"]);
    expect(PURE_RECIPES.map(row => row.id)).toEqual(["E-EVERY-READ", "E-READ-RESULT-EDIT"]);
    expect([...PLACES]).toEqual(["start", "middle", "end"]);
    expect(PROOF_CONTROLS.map(control => control.id)).toEqual(["P-WHOLE", "P-MAP-BLANK", "P-MAP-SHORT", "P-MAP-DROP", "P-MAP-EXTRA", "P-READER-LAST", "P-READER-FIRST", "P-READER-HEAD", "P-READER-TAIL", "P-READER-BLANK"]);
    expect([...SITE_WORDS]).toEqual(["GraphPolicy", "GraphDataIR"]);
    expect(PLANTED_WORD_SITES.map(plant => `${plant.word}:${plant.path}`)).toEqual(["GraphPolicy:src/workbench/zz-gp-site-policy.ts", "GraphDataIR:src/workbench/zz-gp-site-data-ir.ts"]);
    expect(WORD_JOINERS.map(joiner => `${joiner.id}:${JSON.stringify(joiner.text)}`)).toEqual(['none:""', 'space:" "', 'tab:"\\t"', 'dot:"."', 'underscore:"_"', 'hyphen:"-"', 'repeated:".."', 'mixed:" - "']);
    expect(WORD_CASES.map(form => `${form.id}:${form.of("Ab")}`)).toEqual(["lower:ab", "upper:AB", "written:Ab"]);
    expect(WORD_PLACES.map(place => `${place.id}:${JSON.stringify(place.wrap("W"))}`)).toEqual([
      'line-comment:"// W\\nexport const placed = 1;\\n"',
      'block-comment:"/* W */\\nexport const placed = 1;\\n"',
      'doc-comment:"/**\\n * W\\n */\\nexport const placed = 1;\\n"',
      'double-quoted:"export const placed = \\"W\\";\\n"',
      "single-quoted:\"export const placed = 'W';\\n\"",
      'template:"export const placed = `W`;\\n"',
      'code:"export const WPlaced = 1;\\n"',
    ]);
    expect(Object.entries(WORD_PARTS).map(([word, parts]) => `${word}:${parts.join("|")}`)).toEqual(["GraphPolicy:Graph|Policy", "GraphDataIR:Graph|Data|IR", "ExecutorRequest:Executor|Request"]);
    expect(SITE_WORD_SPELLINGS.map(entry => entry.spelling)).toEqual(["graphpolicy", "GRAPHPOLICY", "GraphPolicy", "graph policy", "GRAPH POLICY", "Graph Policy", "graph\tpolicy", "GRAPH\tPOLICY", "Graph\tPolicy", "graph.policy", "GRAPH.POLICY", "Graph.Policy", "graph_policy", "GRAPH_POLICY", "Graph_Policy", "graph-policy", "GRAPH-POLICY", "Graph-Policy", "graph..policy", "GRAPH..POLICY", "Graph..Policy", "graph - policy", "GRAPH - POLICY", "Graph - Policy", "graphdatair", "GRAPHDATAIR", "GraphDataIR", "graph data ir", "GRAPH DATA IR", "Graph Data IR", "graph\tdata\tir", "GRAPH\tDATA\tIR", "Graph\tData\tIR", "graph.data.ir", "GRAPH.DATA.IR", "Graph.Data.IR", "graph_data_ir", "GRAPH_DATA_IR", "Graph_Data_IR", "graph-data-ir", "GRAPH-DATA-IR", "Graph-Data-IR", "graph..data..ir", "GRAPH..DATA..IR", "Graph..Data..IR", "graph - data - ir", "GRAPH - DATA - IR", "Graph - Data - IR"]);
    expect(EXECUTOR_JOINERS.map(joiner => joiner.id)).toEqual(["none", "space", "underscore", "hyphen"]);
    expect(EXECUTOR_REQUEST_SPELLINGS.map(entry => entry.spelling)).toEqual(["executorrequest", "EXECUTORREQUEST", "ExecutorRequest", "executor request", "EXECUTOR REQUEST", "Executor Request", "executor_request", "EXECUTOR_REQUEST", "Executor_Request", "executor-request", "EXECUTOR-REQUEST", "Executor-Request"]);
    expect(EXECUTOR_REQUEST_OUTSIDE.map(entry => entry.spelling)).toEqual(["executor\trequest", "EXECUTOR\tREQUEST", "Executor\tRequest", "executor.request", "EXECUTOR.REQUEST", "Executor.Request", "executor..request", "EXECUTOR..REQUEST", "Executor..Request", "executor - request", "EXECUTOR - REQUEST", "Executor - Request"]);
    expect(Object.values(RESIDUALS).flatMap(members => members.flatMap(member => (member.kind === "drive" ? [`${member.id}:${JSON.stringify(member.effect)}`] : member.kind === "source" ? [`${member.path}:${member.live}`] : [])))).toEqual([
      "src/workbench/q1-shape.ts:shape",
      "src/workbench/q1-incidences.ts:shape",
      "src/workbench/q2-joined.ts:composed",
      "src/workbench/q2-escape.ts:composed",
      "src/workbench/q2-request.ts:composed",
      'q6-timer-write:{"deferredCalls":["disconnect"]}',
      'q6-timer-freeze:{"projectionFrozen":true}',
      'q7-global-write:{"globalMark":true}',
      'q7-module-record:{"moduleRecord":true}',
      'q7-third-call:{"thirdDiffers":true}',
      'q7-past-view-call:{"symbolReads":["Symbol(Symbol.toStringTag)"]}',
      'q8-rebind-equal:{"rebound":["budget"]}',
      'q8-request-key:{"addedKeys":["exportedBy"]}',
      'q8-request-freeze:{"requestFrozen":true}',
      'q8-projection-rebind:{"rebound":["projection"]}',
    ]);
  });

  it("the outside anchors: the bead's own row binds the rows and the pin quotes; the vendored producer fixture, the registry and the live control import bind the judge's spellings", () => {
    const row = beadRow(textOf(EXPORT), BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    expect(title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    expect(acceptanceClauses(notes), "the acceptance holds six clauses, each exactly one row's label").toEqual(["A", "B", "C", "D", "E", "F"].map(id => ROWS.find(entry => entry.id === id)?.label));
    const rowG = ROWS.find(entry => entry.id === "G");
    expect(title.includes(` ${rowG?.label ?? "-"}, `), "row G's label is a slice of the statement").toBe(true);
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    expect(notes.includes(`at Pi ${FILING_PIN.slice(0, 12)}`), "the filing's Pi pin is the one D2 reads control.ts at").toBe(true);
    expect(notes.includes("NATIVE_CONTROL_ACTIONS at control.ts:30-37"), "the filing cites the span D2 reads").toBe(true);
    const producer = vendored();
    expect((producer.schema_ref as { readonly namespace?: unknown } | undefined)?.namespace, "the namespace").toBe(GRAPH_NAMESPACE);
    const features = featuresOf(producer);
    expect(features.some(feature => isDeepStrictEqual(feature, UNKNOWN_FEATURE)), "the vendored fixture spells the explicit unknown").toBe(true);
    expect(features.some(feature => typeof feature === "object" && feature !== null && (feature as { readonly status?: unknown }).status === KNOWN_STATUS && "value" in feature), "and the known status beside a value").toBe(true);
    expect(/export type CapabilityErrorCategory = [^;]*"unavailable"/.test(textOf(REGISTRY)), "the unavailable category is the registry's").toBe(true);
    expect(Object.keys(NATIVE_CONTROL_ACTIONS).length, "the live control import holds producers").toBeGreaterThan(0);
    const methods = Object.getOwnPropertyNames(ObservationProjection.prototype).filter(name => typeof Reflect.get(ObservationProjection.prototype, name) === "function");
    expect(READ_METHODS.filter(name => !methods.includes(name)), "every READ_METHODS name is a method of the live class").toEqual([]);
    expect(LIVE_WRITES.filter(name => !methods.includes(name) || READ_METHODS.includes(name)), "the writes the A1 members call are live methods outside READ_METHODS").toEqual([]);
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/gp-snapshot-export-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(Object.fromEntries(Object.entries(RESIDUALS).map(([id, members]) => [id, members.map(residualId)])), "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(relative(ROOT, task.file.filepath), "this case runs in the census file").toBe(CENSUS);
    const loaded = config as unknown as { readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] } };
    expect([loaded.test?.include, (loaded.test?.exclude ?? []).includes(CENSUS)], "the default tier collects this file").toEqual([["test/**/*.test.ts"], false]);
    expect(textOf(HELPER).includes("wb-0lf.2 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R2)"), "the helper is this census's").toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
  });
});
