/**
 * wb-hs2j.7 (RF-REACTIVE-CONTEXT-ASSEMBLY-R8, program-triage-2026-10-22, epic wb-hs2j): rf's typed identities stay distinct in
 * Pi. Statement (the bead note's full statement): "Pi shall carry rf's typed identity vocabulary distinctly (component_id,
 * component_instance_id, occurrence_id, graph_revision_id, render_id, transaction_id, session_id, workspace_id), with
 * inter-agent handoffs carrying an explicit render_id copied from an rf envelope, and no Pi surface shall collapse one identity
 * into another or reconstruct a render identity from model output text (no gate: the identities are shipped envelope
 * vocabulary)" - ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:86
 * at 6a251bf73af5, merged with README.md:73. Acceptance (the owner filing's, each clause verbatim in exactly one row label below):
 * "(a) Pi's rf data model types each id separately - a graph_revision_id is never used where a render_id or bundle identity is
 * required; (b) occurrence identity is never conflated with component_id or definition revision in Pi diffs or projections
 * (03-host:78); (c) Pi handoff records carry a render_id copied from an rf envelope with provenance to the producing
 * invocation; (d) no Pi code parses model-generated prose to recover a render id for authoritative use." Posture (the filing's
 * "Not P0" line, its two facts verbatim in row labels): "today's preview envelopes carry render_id null / transaction_id null"
 * and "Pi mints no handoff render ids".
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only). At the program pin (`git show 6a251bf73af5:` on the local
 * ReactiveFiberCLI checkout): 02-swarm-usage-and-command-grammar.md:86 is the quote; README.md:73 (C6 session recover /
 * handoff) reads "For handoff, require explicit render ID rather than reconstructing it from model text."; and
 * 03-host-conformance-performance-and-acceptance.md:78 (Test C-08, nested budget occurrence identity) reads "One nested child
 * rendered twice produces two distinct occurrence identities with separately priced required blocks." The installed rf
 * (0.1.832 by `rf --json --version` result.version; result.provenance.commit_id 2618c211be0d, a descendant of the pin by
 * `git merge-base --is-ancestor`) ships src/reactive_fiber_cli/domain/ids.py and schemas/cli/context.render.schema.json
 * byte-identical to the pin (sha256 in the roster). They give: the LLD 4.1 prefix table PREFIX_KINDS (rfw workspace, rft
 * logical transaction, rfo CLI/application operation, rfr render, rfs session and six more record kinds); render_id
 * ^rfr_[0-9a-z]{22,32}$, null exactly when result.ephemeral is true; transaction_id ^rft_; operation_id ^rfo_; the workspace
 * block's id ^rfw_; result.session_id an rfs_ id, an explicit id or null; component_id the declared-id grammar;
 * component_instance_id `<component_id>:<instance>`; and occurrence identity as the ordinal segment of the candidate key,
 * `<component_instance_id>::<block_key>[::<occurrence>]` (EXPL-DIFF-A14; the first occurrence is bare) - no packaged schema
 * spells an occurrence_id field. A component's definition revision is result.components[].component_revision_id (a digest).
 *
 * Pi's rf identities today. The one rf reading path is the reactivefiber.render.preview provider (providers/reactivefiber.ts),
 * its reader adapter (reactivefiber-observer.ts) and the evidence projection (native-evidence.ts) that the workflow runtime
 * spreads into its node records (src/workflow/runtime.ts). Of the rf identities they read, operation_id names the preview (the
 * adapter's context-preview NativeRef id, the evidence's nativeId), workspace.id rides as rf-workspace:<id>, graph_revision_id
 * as rf-graph:<digest> and sourceRevision, and bundle_revision_id as rf-bundle:<digest> and sourceVersion (owner ruling G-A,
 * wb-973.8); render_id and transaction_id are read only to require null. Two slots are typed bundle-else-graph by their own
 * declarations: the version cohort key of an applied node (ObservationProjection.refresh keys sourceVersion ?? sourceRevision,
 * pinned by wb-973.8's absent-key row) and the evidence's sourceBasis (native-evidence.ts:12). Neither is a bundle-identity
 * slot; the rf-bundle: reference and the snapshot's own sourceVersion are, and the graph digest never fills them. No Pi module
 * reads an rf session, component, instance, definition revision or candidate key; the session_id Pi reads is the Claude SDK's
 * (claude-host.ts and its siblings), and forge's operation_id rides provider-qualified. So (a) holds by construction, (b) and
 * (d) hold by absence, and (c)'s trigger has not fired: Pi admits no rf reading that carries a render id, so no Pi record can
 * carry one.
 *
 * THE WALK: every module below WALK_ROOTS (src, qa, examples, at any depth), parsed by the TypeScript compiler; comments are not
 * read. A judged module holding the literal "context.render" is an rf READER (measured: the three modules above).
 * OUTSIDE ANCHORS OF THE WALK (wb-mzoc F1: count floors alone let a narrowed walk pass, H05+P05): A1 holds the walked set to
 * Git's own list of the checkout (LISTING: tracked, and untracked but not ignored; a path missing on disk or no regular file is
 * left out), each listed path classed a module by the TypeScript compiler's own extension forms (ts.Extension minus its two
 * non-script forms), never by MODULE_EXTENSIONS: no listed module below WALK_ROOTS goes unwalked, no walked module is unlisted,
 * and every listed module outside WALK_ROOTS sits below an unjudged root (UNJUDGED_ROOTS: test, and the repository root's own
 * files); src is held a second time to the root files of the tsconfig.json program. The floors stay as the empty-walk guard.
 * WHAT THE JUDGES READ (wb-mzoc U1 and U2, the judged-reading guard): five judges read the shared tree liveTree builds
 * (TREE_JUDGES: A1, A4, B1, C1 and D1, held to the pins whose own case source calls liveTree), and each reads it only through
 * its own VIEW - a structured clone of the judged map and the readers list, taken in its case - which it alone iterates. A1
 * anchors its view: its keys are exactly the walked modules (J-NARROW: a map narrowed below any walk root reds); each reading
 * records the git blob id of the text it parsed, which must be Git's own id for the listed file's bytes (HASH_OBJECT; J-READ:
 * a module parsed from any other text reds); each reading must equal the compiler's own reading of the listed file - its bytes
 * read again and parsed under its own path with the script kind TypeScript gives that path - so a reading altered after its
 * parse, or parsed under another kind, reds; and the readers list must be exactly the judged modules whose own compiler
 * reading holds the render command literal, so a readers list filtered or widened at the shared site reds (READERS-NARROW).
 * Every other tree judge digests its view at the end of its case (every key in order, each reading with its blob id, the
 * readers list) and holds the digest to A1's anchored view; each digest is recorded once, read-only, so nothing that runs later
 * can replace one; and the records case holds all five digests to A1's, so whatever the shared site serves a later judge reds:
 * a map narrowed or re-read for later callers, keyed on the running test, or narrowed in place after A1 ran (U2: LATE-NARROW,
 * PERPIN-NARROW, LATE-READ, LATE-INPLACE). The reader itself is path-blind (every judged module is parsed under the one
 * PARSE_NAME), so it cannot single out a module by its path. Constructed controls keep each anchor live: narrowedMap,
 * otherText, alteredReading, unlistedReader, listedNonReader and unreadReader (A1's anchor); viewKeys, viewBlob, viewReading,
 * viewReaders, viewDetached, recordReadOnly and viewNarrowedInPlace (the view, its clone, its digest and its record);
 * walkNarrowed, listingNarrowed, srcListingNarrowed, newRoot and rootDropped (the walk's anchor); and, in the records case
 * after every judge recorded, a constructed empty view recorded as its own digest and not A1's (the view record itself).
 * THE GUARDS' SWEEPS (wb-yvoa F1: each guard's constructed controls above exercise one representative - one module, one reading
 * field - so a guard hollowed partially past them, beside the shared-site edit it hides, survived): each of the three guards is
 * also held to every module of A1's view by its sweep, each module alone and every module at once. walkSweep (the walk anchor):
 * every walked module left out of the walk is unwalked and left out of Git's listing is unlisted, every root file of the
 * tsconfig.json program left out of the walk is programUnwalked, every walk root held unjudged is an outside root, and an
 * emptied walk or listing reads every module. anchorSweep (A1's judged anchor, over one-module trees and over the whole view):
 * every module left out of a view is unjudged, read from another text is misread, altered in any one reading field or with any
 * one list field's first entry substituted is reread, and misstated in its READER standing is in the readers finding.
 * digestSweep (the view digest): every module's one-module view digests apart from the empty view, under another key, with any
 * one reading field altered, with any one list field's first entry substituted and as a readers entry, and the whole view
 * digests apart with any one reading field altered, or any one list field's first entry substituted, in every module. Every
 * reading field is swept: FIELD_ALTERATIONS gives each field of ModuleReading an alteration (its mapped type names every field,
 * so a field added without one does not type-check), and each swept reading's own keys are held to READING_FIELDS. Every list
 * field is swept at its cardinality too (wb-iy1n F1: each alteration appends to a list or raises a count, so a digest and a
 * reread reading only how many entries each list holds - the gate's H-DIGEST-CARDINALITY and H-REREAD-CARDINALITY, beside a
 * shared-site edit swapping one literal for another - moved with every alteration and survived): FIELD_SUBSTITUTIONS replaces
 * each list field's first entry with the entry its alteration appends, the list's length kept (an empty list gains it), and its
 * mapped type names every list field of ModuleReading (LIST_FIELDS), so a list field added without one does not type-check. A1
 * holds every sweep empty, so a guard blind, whatever its input, to one reading field or to a list field's first entry (for
 * every module or below one directory) or to the modules below one directory reds alone - wb-yvoa F1's partial hollows: the
 * digest blind to members, to literals or below src/workbench/hosts, the reread comparing identifiers only, and the walk anchor
 * blind below src/workbench/hosts; and wb-iy1n F1's digest and reread reading each list's cardinality only. Each sweep's own
 * constructed controls keep it live: run against a partial guard - the gate's measured shapes, constructed - it finds it: a
 * digest blind to members (digestMembersBlind) or to literals (digestLiteralsBlind), an anchor rereading identifiers only
 * (anchorIdentifiersOnly), a digest, a judged anchor and a walk anchor blind below RUNTIME's directory (digestDirectoryBlind,
 * anchorDirectoryBlind, walkDirectoryBlind), and a digest and a judged anchor reading each list's cardinality only
 * (digestCardinalityOnly, anchorCardinalityOnly); each control sweeps a sample of A1's view (the modules below RUNTIME's
 * directory, the READERS and the first module of each walk root), the walk controls a sample walk of those modules with Git's
 * listing and the program held to them.
 * THE F1 CLASS, ENUMERATED (wb-mzoc cut #3, the rule 19(c) enumerate-the-resolvable form; wb-yvoa adds the guards' sweeps,
 * wb-iy1n their same-cardinality substitutions): a judged module set narrowed, or a judged module misread, while the floors
 * hold. PINNED, and nothing broader: the walk held to Git's listing and the tsconfig.json program (A1 walk); A1's view held to
 * the walk, to Git's blob ids, to the compiler's own readings and to its own READER reading (A1 judged); every tree judge's
 * view, as it stands at the end of its case, held to A1's anchored view (A4, B1, C1 and D1 viewHeld; the record's view
 * digests); and each of those three guards held, by its sweep, to every module of A1's view and every reading field, each list
 * field's first entry substituted as well as appended to, one module at a time and every module at once (A1 sweeps), so a guard
 * blind, whatever its input, to a reading field, to a list field's first entry or to the modules below a directory reds alone,
 * with or without the shared-site edit it would hide. A guard blind only on inputs no sweep builds is not claimed found: its
 * named shapes are the residuals R-GUARD-CONDITIONED (an input shape), R-GUARD-CONTENT (a word), R-GUARD-ENTRY (an entry past a
 * list's first, or one part of an entry), R-GUARD-TIMED (a time its sweep does not run at) and R-GUARD-MARKER (an entry read
 * only against the sweeps' own marker; wb-ahgz F1), and each of their quiet rows is backed, guard by guard, by its own guard's
 * blind positive (GUARD_POSITIVES; wb-ahgz F2).
 * RESIDUALS of the class, each a named family with pinned quiet rows (see RESIDUALS): R-PIN-LOCAL, R-CO-NARROWED, R-ROOT-MOVED,
 * R-GUARD-CONDITIONED, R-GUARD-CONTENT, R-GUARD-ENTRY, R-GUARD-TIMED, R-GUARD-MARKER and R-ANCHOR-SOURCE. No other member of the
 * class is claimed absent.
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a) and the first posture fact. A1 the readers' identity table: which rf identity names each READER spells
 *    (exactly the measured sets; the filing's "Pi's own render_id / transaction_id / bundle_revision_id reads" among them),
 *    every read of render_id or transaction_id an operand of a comparison with null, the one member declaring either typed
 *    null, the rf reference prefixes the READERS mint (none naming a render, transaction, session, component or occurrence),
 *    and no module outside the READERS spelling an (a)-family name. A2 the slot map: each identity value of a preview lands in
 *    exactly its own slots of the adapter's topology and the evidence projection, with and without a bundle; without one the
 *    graph digest fills no bundle slot, and the cohort fallback is recorded as the slot's own typing. A3 render and transaction
 *    identity stay null-only: the adapter (validation) and the native provider through a hermetic stub rf (transport) refuse
 *    a reading stating either, and an admitted reading has no render- or transaction-typed key or reference. A4 the
 *    namesakes and the identities Pi does not read: an rf session id surfaces nowhere and no READER reads session_id while the
 *    Claude SDK frames' session_id is read outside them; Pi's workspace path, the authorized rf root and the rf workspace id
 *    stay three slots; forge's and rf's operation ids stay provider-qualified.
 *  B, acceptance (b). B1 no judged module spells an rf component, instance, definition-revision, candidate-key or occurrence
 *    field (B_FAMILY, from the filing's names and the measured record fields), and no READER spells the word occurrence. B2
 *    the C-08 shape (CONSTRUCTED: one nested child rendered twice, two candidate keys of one instance, one definition
 *    revision) changes no identity slot of the topology and nothing of the evidence, none of its values surfaces, the applied
 *    node stays the operation's, and Pi has no diff projection: a context.diff reading is refused and projects nothing.
 *  C, acceptance (c) and the second posture fact. C1 absent today: render_id is spelled only by the two READERS' null checks
 *    and the adapter's refusal and note texts, no module declares a render-id member, and the evidence projection of a
 *    committed render's envelope carries no render id and keeps the operation id as nativeId. C2 the provenance a reading does
 *    carry: the snapshot's source id and the evidence's nativeId are the envelope's operation_id byte for byte, the trace is
 *    exactly the host's invocation id (absent without one), the grouping edge runs from exactly the host's operation
 *    reference, and a document naming another operation or invocation moves none of them.
 *  D, acceptance (d). D1 no judged module spells the rfr_ prefix, the rf id family grammar or a render-naming pattern in any
 *    literal or regular expression; the rf prefixes spelled anywhere are rfo_ and rfw_ in the two READERS that validate them;
 *    and every read of rf document text is a typeof or a sha256 digest. D2 a document of render-id-shaped prose moves only the
 *    payload digest and no rfr_ token reaches the topology or the evidence.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness (each carries its pin id), the scan constants, the derived vocabularies, the residual families and the registered
 * test titles are held to the out-of-file roster (test/fixtures/rf-identity-distinctness-roster.json). OUTSIDE ANCHOR: the
 * owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-hs2j.7): each acceptance clause and each posture
 * fact sit verbatim in exactly one row label, every row carries one of them, the statement's eight identity names equal both
 * the quote's and FAMILY_OF's, and its statement, quotes, citations and shipped-reads list equal the roster's, so a row removed
 * from every literal of this file and the roster still reds. The bead row anchors rows, clauses and identity names, not pins:
 * see R-PIN-HOLLOW below.
 * REGISTRATION (wb-mzoc F4): the judged-set case runs first and reads this file's registered tests (vitest's task tree) as
 * collected - each roster title once, in roster order, itself first, every one (the records case included) in run mode and
 * not inverted - so a records case skipped, set to todo, inverted or deleted reds it before the records case could run.
 * RECORDS: the last case walks the same tree after the rest ran: each roster title once, in order, in run mode, not inverted,
 * ran; every pin's case reached its end (REACHED); every witness compares equal to the roster a second time (MEASURED); and
 * every pin's case compared its witness after its pinned number of assertions (COUNTED, `<pin>:<count>` held to the roster's
 * counted list; wb-mzoc F2), so a case that compares its witness after fewer assertions than pinned reds the record - a case
 * returning its roster witness without running its judges among them (H02). COUNTED counts assertions, not judge runs. And
 * every tree judge's view digest is A1's (wb-mzoc U2), beside the view record's own constructed control.
 * CONTROLS (wb-mzoc F3): before the roster compare each pin's runner reads its witness's controls - a control named a quiet row
 * (QUIET_ROWS, by residual family) or an accepted form (ACCEPTED_FORMS) must read quiet, every other control must fire (a count
 * of 1 or more, a non-empty list, a ratio with a read) - so a positive control zeroed in this file and the roster together
 * still reds (X-WITNESS). The guard residuals' blind positives are scalars, one per guard (wb-ahgz F2: a list of the guards
 * blind to their plants stayed non-empty when one guard was made honest and dropped from it in this file and the roster), and
 * each guard residual's quiet row names its own guard's (GUARD_POSITIVES), which the control reading reads as a control that
 * must be present and fire: a guard made honest reds its blind positive, and so does that positive zeroed or deleted, in this
 * file and the roster together, while its quiet row stands.
 * FROZEN VOCABULARIES (wb-yvoa F2: the shared site splicing render_ref out of RENDER_MEMBERS on its second call hid a
 * render_ref member from C1, whose controls spelled four of the five members): the constants FROZEN names - the walk's and the
 * anchors' vocabularies, the identity vocabularies and patterns, the residual and quiet-row tables, the fixture host context
 * HOST and operation reference OPERATION_REF (wb-iy1n F2: A2-A4, B2, C2 and D2 read them, and they were left unfrozen),
 * VALUE_NAMES, ROWS, ROSTER, VOCABULARY, the sweeps' field tables and the cases table IMPL - are frozen deep where they are
 * bound (the judged-set case holds each one frozen and their names to the roster's scan.frozen), so a run-time edit of one
 * throws where it runs. Every other module-scope constant holding a list, a record or a pattern is one of the run's own
 * records, written as the cases run (VIEWS, each entry once and read-only; REACHED, MEASURED and COUNTED; the stub list), or
 * FROZEN itself, frozen shallow; and C1's positive controls declare every RENDER_MEMBERS spelling, render_ref included
 * (referenceMember), their spellings held to the roster's renderMembers, so a spelling dropped at run time also reds its own
 * control.
 * RESIDUALS (named families, each with pinned quiet rows: QUIET_ROWS for the controls, the judged-set case for R-PIN-HOLLOW):
 * R-COMPOSED a name, prefix or pattern composed at run time (A1 composedName, B1 composedField, D1 composedPrefix); R-COMMENT a
 * comment naming one (A1, B1, D1 comment); R-ALIAS document text read through an alias of the output object outside the
 * READERS (D1 aliasOutsideReaders); R-GENERIC-WORD the bare word occurrence outside the READERS (B1 occurrenceOutsideReaders);
 * R-NAMESAKE session_id outside the READERS and the camelCase sessionId, workspaceId and operationId, Pi's own names for its own
 * and other producers' ids (A4 sessionOutsideReaders, A1 camelNamesake); R-RENAMED a member or field holding an identity under
 * another name (C1 renamedMember, B1 renamedField); R-OUTSIDE a module below an unjudged root - test, whose helpers and
 * fixtures plant rf envelopes, and the repository root's own config modules - is not judged (B1 outsideRoots), while a module
 * below any other top-level root reds A1; R-PIN-HOLLOW a pin removed from ROWS, the frozen literal, IMPL and the roster
 * together (its counted entry and PIN_HOLLOW_MEMBERS included): the bead-row anchor reads row labels, so it cannot see one (its
 * quiet row pins the unseen pins, A1 to D2, beside a liveness reading: removing any row is seen). The F1 class's residuals
 * (wb-mzoc cut #3): R-PIN-LOCAL a tree judge narrowing its own use of its view without editing the view - a filter over its
 * modules, its readers or its findings inside its case, or a judging helper it calls returning less for some module - since
 * the view guard holds what each judge read, never what it found (quiet rows A1.caseNarrowed and A1.helperNarrowed, beside
 * the positive A1.viewNarrowedInPlace: a judge deleting from its own view is seen); R-CO-NARROWED the walk narrowed together
 * with every outside listing of its root - with Git's listing below qa or examples, or with Git's listing and the
 * tsconfig.json program below src (quiet rows A1.coNarrowedQa, A1.coNarrowedExamples and A1.coNarrowedSrc, beside the
 * positive A1.srcListingNarrowed: below src the program alone still sees it); R-ROOT-MOVED a root moved from WALK_ROOTS to
 * UNJUDGED_ROOTS with its floor, its modules and A1's walk controls that name it, in this file and the roster together (quiet
 * row A1.rootMoved, beside the positive A1.rootDropped: a root dropped from the walk alone reds, and a root moved while A1's
 * controls still name it reds through them); R-GUARD-CONDITIONED (wb-yvoa) a guard partial only on inputs no sweep builds:
 * honest on each module alone and on every module at once, and blind below one directory when two or more but not all of its
 * modules are off (the digest: on a view of two or more modules) - the shape of a narrowing below one directory, since each
 * sweep reads one module or all of them (quiet rows A1.digestConditioned, A1.anchorConditioned and A1.walkConditioned: each
 * sweep, run against such a guard, finds nothing, beside the positive digestDirectoryBlind, anchorDirectoryBlind and
 * walkDirectoryBlind: the same guards unconditioned are found; and beside each conditioned guard's own blind positive,
 * A1.digestConditionedBlind, A1.anchorConditionedBlind and A1.walkConditionedBlind (wb-ahgz; the wb-iy1n gate's F3: no
 * positive read the conditioned guards themselves): the conditioned digest gives the sample and the sample without RUNTIME's
 * directory one digest, and the conditioned judged and walk anchors leave RUNTIME out of what a judged map and a walk lacking
 * RUNTIME and the first READER miss, where the honest guards tell both apart); R-GUARD-CONTENT (wb-iy1n F1, the gate's L3 and
 * L4) a guard
 * partial only on content no sweep writes and no module holds - blind to the entries or the paths that spell one word: the
 * render prefix, a (b)-family name, a plant's path - since every sweep writes ALTERED and walks the modules present, never a
 * plant's own content (quiet rows A1.digestContentConditioned, A1.anchorContentConditioned and A1.walkContentConditioned: each
 * sweep, run against a digest dropping the literals that spell the render prefix, a judged anchor dropping before its reread
 * the literals that spell a (b)-family name, or a walk anchor dropping a plant's path, finds nothing, beside the blind positives
 * A1.digestContentBlind, A1.anchorContentBlind and A1.walkContentBlind: each of the three is blind to its plant); R-GUARD-ENTRY
 * (wb-iy1n) a guard partial only on an entry
 * no sweep alters alone - an entry past a list's first (a substitution replaces the first, an alteration only appends) or one
 * part of an entry (a text read's use, a read's null comparison) (quiet rows A1.digestEntryConditioned and
 * A1.anchorEntryConditioned: a digest and a reread reading each list's cardinality and first entry, A1.digestPartConditioned: a
 * digest blind to each text read's use, A1.anchorPartConditioned: a reread blind to each read's null comparison; each sweep
 * finds nothing, beside the blind positives A1.digestEntryBlind, A1.anchorEntryBlind, A1.digestPartBlind and A1.anchorPartBlind:
 * each of the four is blind to its plant); R-GUARD-TIMED (wb-iy1n F1,
 * the gate's L6) a guard partial only while its sweep is not running - the shared site, on a later call, narrowing what later
 * judges read and rebinding a primitive the guard calls (JSON.stringify, so a narrowed view stringifies as the full one), or a
 * guard partial on A1's own call and honest for its sweep's - since each sweep holds a guard at the time it runs (quiet rows
 * A1.digestTimed, A1.anchorTimed and A1.walkTimed: each sweep, run against a guard honest while it sweeps and partial below
 * RUNTIME's directory otherwise, finds nothing, beside the blind positives A1.digestTimedBlind, A1.anchorTimedBlind and
 * A1.walkTimedBlind: outside its sweep each of the three is blind); R-GUARD-MARKER (wb-ahgz F1, the wb-iy1n gate's G6-4,
 * H6-DIGEST-SWEEP-KEYED) a guard keyed on the sweeps' own marker - reading each list entry only as whether it spells ALTERED,
 * every count and the blob id kept - since every alteration appends ALTERED and every substitution makes a first entry ALTERED,
 * so the guard moves under every sweep, while it is blind to any change of an entry that spells no ALTERED: an entry a module
 * holds swapped at the shared site for another value, the list's length kept (the gate's late swap of the render prefix in the
 * src/workbench/hosts modules beside a planted prefix, and of those modules' first literals), so it falls outside
 * R-GUARD-CONTENT, which names content no module holds (quiet rows A1.digestMarkerKeyed and A1.anchorMarkerKeyed: each sweep,
 * run against a digest and a reread reading each list entry only against ALTERED, finds nothing, beside the blind positives
 * A1.digestMarkerBlind and A1.anchorMarkerBlind). THE MARKER POINTS (wb-ahgz U1): RUNTIME's first literal swapped, its list's
 * length kept, for each of exactly two swap values - the render prefix and the literal's same-length complement (each UTF-16 unit
 * x written as y and every other unit as x; neither spells ALTERED) - in exactly two views: RUNTIME's one-module view (no readers
 * entry) and the full view A1 holds (every walked module and the readers list, the view each tree judge records). Each of the two
 * blind positives reads that its marker-keyed guard misses both swap values in the one-module view and that the live guard sees
 * all four points (the view digest moves; the judged anchor rereads RUNTIME). So a view digest or a judged anchor that misses one
 * of the four points reds A1 - measured, each 2 failed (A1, records): the gate's G6-4 and G6-4b (P02, Q01), P09 and P19, the
 * guards marker-keyed only on views of two or more modules or with a readers entry (the gate's P16, Q12, P05, P06, P11) or reading
 * in full the entries that spell the render prefix (Q11, Q02, P18), and Q03 (each entry read as ALTERED or its length) - and one
 * that sees all four is this residual. It names these members beyond the points, each with quiet rows (each sweep, run against its
 * constructed digest and reread, finds nothing) beside blind positives at one point of its own (the module's reading changes
 * there, read from its JSON, and the member's guard misses the change): marker keying only in a list field other than literals
 * (A1.digestMarkerField and A1.anchorMarkerField, keyed in the identifiers, beside A1.digestMarkerFieldBlind and
 * A1.anchorMarkerFieldBlind at RUNTIME's first identifier swapped for the render prefix; the gate's Q07), only in modules other
 * than RUNTIME, below its directory or another (A1.digestMarkerOthers and A1.anchorMarkerOthers, keyed in every other module,
 * beside A1.digestMarkerOthersBlind and A1.anchorMarkerOthersBlind at the first READER's first literal swapped for the render
 * prefix; the gate's Q05, P03, Q14 and P10), in RUNTIME's literals only on views of two or more modules smaller than the full view
 * (A1.digestMarkerShaped and A1.anchorMarkerShaped, beside A1.digestMarkerShapedBlind and A1.anchorMarkerShapedBlind at RUNTIME's
 * first literal swapped for the render prefix in the sample view), and everywhere but the entries that spell a swap value
 * (A1.digestMarkerExempt and A1.anchorMarkerExempt, beside A1.digestMarkerExemptBlind and A1.anchorMarkerExemptBlind at RUNTIME's
 * first literal swapped for a value outside the swap set); marker keying only past a list's first entry is R-GUARD-ENTRY's (the
 * gate's P07); R-ANCHOR-SOURCE (wb-yvoa) an outside anchor's own
 * source served
 * from the shared site - the compiler's second read (ownReadings, or the TypeScript compiler itself) or Git's blob ids - since
 * a guard and its sweep hold a reading to whatever its source returns, never to where it came from (quiet rows A1.sourceReread
 * and A1.sourceBlobs: the judged anchor fed the shared site's reading as its second read, or the reading's own blob id as
 * Git's, finds nothing, beside the positive A1.alteredReading and A1.otherText: the real sources find the same readings);
 * Git's listing and the program narrowed together with the walk are R-CO-NARROWED.
 * NOT CLAIMED, outside the F1 class (coordinated hollows of this file's own records - the wb-mzoc F2, F3 and F4 boundaries -
 * that no anchor outside this file and its roster sees): a control changed or reclassed together with its roster value and its
 * quiet-row or accepted-form entry, or a ratio control's compared count changed with its roster value (the control reading
 * checks its read count only); a residual family deleted together with its quiet rows and their controls (a guard residual's
 * with its blind positives and its GUARD_POSITIVES entry), in this file and the roster (the judged-set case reads the families
 * present); one quiet row of a guard residual deleted together with its control, its blind positive and its pairing, in this
 * file and the roster (the pairing reads the quiet rows present); a guard residual's quiet row and its blind positive pointed
 * at two different guards (each pair reads one binding, so an edit of that binding moves both); a blind positive's reading of
 * the live guard (the conditioned positives' second conjunct, the marker positives' live-guard conjuncts) dropped together
 * with the hollowing it would see; a marker member's blind positive with its change check dropped and its point made no
 * change (its guard then compares a reading with itself); a
 * positive control other than a guard residual's blind positive deleted from its witness in this file and the roster together
 * (the control reading reads the controls present, the named quiet rows, the accepted forms and the guard residuals' blind
 * positives); the judged-set
 * case and the records case dropped from the run together, the records case skipping itself at run time, or the file's describe
 * skipped - nothing in the file then runs to see it (the collector's added-line marker scan refuses the skip-call spelling, not
 * the skipIf or runIf forms); a case that returns its roster witness after padding its count with other assertions (COUNTED
 * counts assertions, not judge runs); and a sweep hollowed together with the guard it sweeps - one that skips, for the modules
 * or fields its own constructed controls never exercise, the check that guard is blind to - since the constructed controls
 * hold a sweep live, not complete (wb-yvoa).
 * Display paths added: none. Test-only: three spawns - A1's read-only git ls-files listing of the checkout, liveTree's
 * read-only git hash-object of the walked modules (it hashes, never writes an object), and A3's hermetic stub rf (tracked
 * scratch, the only PATH entry, an absolute-node shebang), so no installed rf ever runs; src, qa, examples, tsconfig.json and
 * the bead export are only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it, type RunnerTask, type RunnerTestCase } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

/** A constant frozen deep where it is bound (wb-yvoa F2): it and every array, plain object and regular expression inside it, so a
 * run-time edit of a judged vocabulary - a splice at the shared site, say - throws where it runs instead of narrowing what a
 * later judge reads. */
function frozen<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const entry of Object.values(value)) frozen(entry);
  }
  return value;
}
/** True when a value and every array, plain object and regular expression inside it are frozen (wb-yvoa F2). */
function frozenDeep(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(frozenDeep);
}

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/rf-identity-distinctness-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.7";
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every module below them, at any depth). */
const WALK_ROOTS: readonly string[] = frozen(["src", "qa", "examples"]);
const MODULE_EXTENSIONS: readonly string[] = frozen([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);
/** Each floor sits below the module count measured at base bf06b20 (src 115, qa 62, examples 6). The floors are the empty-walk
 * guard only; the walked set itself is held to the outside listings below (wb-mzoc F1). */
const FLOORS = frozen({ src: 100, qa: 55, examples: 5 });
/** The walk's outside anchor (wb-mzoc F1): Git's own list of the checkout - tracked, and untracked but not ignored. */
const LISTING: readonly string[] = frozen(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]);
/** The parsed texts' outside anchor (wb-mzoc U1): Git's own blob id of each walked module's file, its bytes hashed as they are
 * on disk (no filter, never written as an object). */
const HASH_OBJECT: readonly string[] = frozen(["hash-object", "--no-filters", "--stdin-paths"]);
/** The one file name every judged module is parsed under (wb-mzoc U1), so the reader never sees a module's path. */
const PARSE_NAME = "judged-module";
/** The TypeScript compiler's extension forms (ts.Extension) that name no script. Every other form classes a listed path as a
 * module by the compiler's own vocabulary, so the listing is never classed by MODULE_EXTENSIONS, the walk's own predicate. */
const NON_SCRIPT_FORMS: readonly string[] = frozen([ts.Extension.Json, ts.Extension.TsBuildInfo]);
/** The top-level roots whose modules Git lists but the census does not judge: test (its helpers and fixtures plant rf
 * envelopes) and "." (the repository root's own files, the vitest configs). A listed module below any other root reds A1. */
const UNJUDGED_ROOTS: readonly string[] = frozen([".", "test"]);
/** The TypeScript program whose root files are a second outside listing of src (its include is src). */
const PROGRAM_CONFIG = "tsconfig.json";
/** The command every Pi rf envelope reader checks: a judged module holding it as a folded literal is an rf READER. */
const RENDER_COMMAND = "context.render";
const CAPABILITY = "reactivefiber.render.preview";
/** The family of each identity the filing names: (a) the data-model identities, (b) the component/occurrence identities, and
 * the namesake rf shares with another producer Pi reads (the Claude SDK's session_id). */
const FAMILY_OF: Readonly<Record<string, "a" | "b" | "namesake">> = frozen({
  component_id: "b",
  component_instance_id: "b",
  occurrence_id: "b",
  graph_revision_id: "a",
  render_id: "a",
  transaction_id: "a",
  session_id: "namesake",
  workspace_id: "a",
});
/** The rf identities Pi's readers carry beside the filing's eight: the operation id names the preview, and the bundle is
 * acceptance (a)'s "bundle identity". */
const CARRIED: readonly string[] = frozen(["operation_id", "bundle_revision_id"]);
/** The identity word forge shares with rf (forge.gate.status operation_id), judged beside the Claude SDK's session_id. */
const PRODUCER_NAMESAKES: readonly string[] = frozen(["operation_id"]);
/** The two identities Pi requires null in every reading it admits. */
const NULL_ONLY: readonly string[] = frozen(["render_id", "transaction_id"]);
/** The rf workspace id: the `id` of the envelope's workspace block. */
const WORKSPACE_ID_READ = "workspace.id";
/** An rf evidence reference prefix as the reader adapter mints it: rf-<kind>: ... */
const REF_PREFIX = frozen(/^rf-[a-z-]+:/);
/** What a render-, transaction-, session-, component- or occurrence-typed key or reference would be named. */
const IDENTITY_WORDS = frozen(/render|transaction|session|component|occurrence|candidate/i);
/** A regular expression or RegExp argument naming render ids. */
const RENDER_PATTERN = frozen(/render|rfr/i);
/** The rf id family grammar (ids.py ID_PATTERN) as a source spelling. */
const FAMILY_GRAMMAR = "rf[a-z]_";
const RENDER_PREFIX = "rfr_";
/** The non-reader module whose Claude SDK frames carry the session_id Pi does read (the non-vacuity anchor of A4). */
const CLAUDE_ANCHOR = "src/workbench/claude-host.ts";
/** The evidence call the workflow runtime builds its node records from. */
const RUNTIME = "src/workflow/runtime.ts";
/** The residual families the controls pin, each with its quiet rows (`<pin>.<control>`): a control named here must read quiet,
 * since its residual form escapes the judge; every other control of a witness must fire (wb-mzoc F3). */
const QUIET_ROWS: Readonly<Record<string, readonly string[]>> = frozen({
  "R-COMPOSED": ["A1.composedName", "B1.composedField", "D1.composedPrefix"],
  "R-COMMENT": ["A1.comment", "B1.comment", "D1.comment"],
  "R-ALIAS": ["D1.aliasOutsideReaders"],
  "R-GENERIC-WORD": ["B1.occurrenceOutsideReaders"],
  "R-NAMESAKE": ["A4.sessionOutsideReaders", "A1.camelNamesake"],
  "R-RENAMED": ["C1.renamedMember", "B1.renamedField"],
  "R-OUTSIDE": ["B1.outsideRoots"],
  "R-PIN-LOCAL": ["A1.caseNarrowed", "A1.helperNarrowed"],
  "R-CO-NARROWED": ["A1.coNarrowedQa", "A1.coNarrowedExamples", "A1.coNarrowedSrc"],
  "R-ROOT-MOVED": ["A1.rootMoved"],
  "R-GUARD-CONDITIONED": ["A1.digestConditioned", "A1.anchorConditioned", "A1.walkConditioned"],
  "R-ANCHOR-SOURCE": ["A1.sourceReread", "A1.sourceBlobs"],
  "R-GUARD-CONTENT": ["A1.digestContentConditioned", "A1.anchorContentConditioned", "A1.walkContentConditioned"],
  "R-GUARD-ENTRY": ["A1.digestEntryConditioned", "A1.anchorEntryConditioned", "A1.digestPartConditioned", "A1.anchorPartConditioned"],
  "R-GUARD-TIMED": ["A1.digestTimed", "A1.anchorTimed", "A1.walkTimed"],
  "R-GUARD-MARKER": [
    "A1.digestMarkerKeyed",
    "A1.anchorMarkerKeyed",
    "A1.digestMarkerField",
    "A1.anchorMarkerField",
    "A1.digestMarkerOthers",
    "A1.anchorMarkerOthers",
    "A1.digestMarkerShaped",
    "A1.anchorMarkerShaped",
    "A1.digestMarkerExempt",
    "A1.anchorMarkerExempt",
  ],
});
/** The one quiet control that is no residual: a form the judge accepts (D1's sha256 digest of the document text). */
const ACCEPTED_FORMS: readonly string[] = frozen(["D1.textDigest"]);
/** Each guard residual's quiet rows, each paired with its own guard's scalar blind positive (wb-ahgz F2: a list of the guards
 * blind to their plants stays non-empty when one guard is made honest and dropped from it), family by family in QUIET_ROWS
 * order: the judged-set case holds each family's pairs to its quiet rows, member by member, and the control reading reads each
 * positive as a control that must be present and fire (X-WITNESS, guard by guard). */
const GUARD_POSITIVES: Readonly<Record<string, Readonly<Record<string, string>>>> = frozen({
  "R-GUARD-CONDITIONED": { "A1.digestConditioned": "A1.digestConditionedBlind", "A1.anchorConditioned": "A1.anchorConditionedBlind", "A1.walkConditioned": "A1.walkConditionedBlind" },
  "R-GUARD-CONTENT": { "A1.digestContentConditioned": "A1.digestContentBlind", "A1.anchorContentConditioned": "A1.anchorContentBlind", "A1.walkContentConditioned": "A1.walkContentBlind" },
  "R-GUARD-ENTRY": {
    "A1.digestEntryConditioned": "A1.digestEntryBlind",
    "A1.anchorEntryConditioned": "A1.anchorEntryBlind",
    "A1.digestPartConditioned": "A1.digestPartBlind",
    "A1.anchorPartConditioned": "A1.anchorPartBlind",
  },
  "R-GUARD-TIMED": { "A1.digestTimed": "A1.digestTimedBlind", "A1.anchorTimed": "A1.anchorTimedBlind", "A1.walkTimed": "A1.walkTimedBlind" },
  "R-GUARD-MARKER": {
    "A1.digestMarkerKeyed": "A1.digestMarkerBlind",
    "A1.anchorMarkerKeyed": "A1.anchorMarkerBlind",
    "A1.digestMarkerField": "A1.digestMarkerFieldBlind",
    "A1.anchorMarkerField": "A1.anchorMarkerFieldBlind",
    "A1.digestMarkerOthers": "A1.digestMarkerOthersBlind",
    "A1.anchorMarkerOthers": "A1.anchorMarkerOthersBlind",
    "A1.digestMarkerShaped": "A1.digestMarkerShapedBlind",
    "A1.anchorMarkerShaped": "A1.anchorMarkerShapedBlind",
    "A1.digestMarkerExempt": "A1.digestMarkerExemptBlind",
    "A1.anchorMarkerExempt": "A1.anchorMarkerExemptBlind",
  },
});
/** R-PIN-HOLLOW: the pins whose removal from every literal (ROWS, the frozen literal, IMPL, the roster) the bead-row anchor
 * cannot see - its quiet row in the judged-set case recomputes them. */
const PIN_HOLLOW_MEMBERS: readonly string[] = frozen(["A1", "A2", "A3", "A4", "B1", "B2", "C1", "C2", "D1", "D2"]);
const RESIDUAL_FAMILIES: readonly string[] = frozen([...Object.keys(QUIET_ROWS), "R-PIN-HOLLOW"]);
/** The judges that read the shared tree (wb-mzoc U2), A1 first: each reads only its own view, and every view is held to A1's
 * anchored one. Held to the pins whose own case source calls liveTree. */
const TREE_JUDGES: readonly string[] = frozen(["A1", "A4", "B1", "C1", "D1"]);
/** Names a member holding a render id would carry: the producer's spelling, its camelCase and the reference forms. */
const RENDER_MEMBERS: readonly string[] = frozen(["render_id", "renderId", "renderID", "render_ref", "renderRef"]);

/** The fixture workspaces: the host's own (the reading's root), a Pi workspace and an rf root the host authorizes apart. */
const ROOT = "/fixture/rf-workspace";
const PI_ROOT = "/fixture/pi-workspace";
const RF_ROOT = "/fixture/rf-root";
const PRINCIPAL = "user:fixture";
/** The host context every topology call of the cases reads, frozen deep (wb-iy1n F2), so a run-time edit of it throws. */
const HOST: ReactiveFiberTopologyContext = frozen({
  scope: { workspace: ROOT, principal: PRINCIPAL },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
});
/** One obviously fake value per identity, each in its producer grammar and none a substring of another. */
const body = (fill: string): string => fill.repeat(26);
const OPERATION = `rfo_${body("o")}`;
const SECOND_OPERATION = `rfo_${body("p")}`;
const PROSE_OPERATION = `rfo_${body("q")}`;
const WORKSPACE = `rfw_${body("w")}`;
const RENDER = `rfr_${body("r")}`;
const PROSE_RENDER = `rfr_${body("m")}`;
const TRANSACTION = `rft_${body("t")}`;
const SESSION = `rfs_${body("s")}`;
const GRAPH = `sha256:${"a1".repeat(32)}`;
const BUNDLE = `sha256:${"b2".repeat(32)}`;
const REVISION = `sha256:${"d4".repeat(32)}`;
const IDEMPOTENCY = `sha256:${"e5".repeat(32)}`;
const POLICY = `sha256:${"f6".repeat(32)}`;
/** The C-08 shape (03-host:78): one nested child component rendered twice - two occurrences of one block key of one instance. */
const CHILD = "demo.parent.child";
const INSTANCE = `${CHILD}:main`;
const FIRST_OCCURRENCE = `${INSTANCE}::required`;
const SECOND_OCCURRENCE = `${FIRST_OCCURRENCE}::2`;
const INVOCATION = "inv-fixture-1";
/** The invoking operation C2's host context names, frozen deep (wb-iy1n F2). */
const OPERATION_REF = frozen({ provider: "workflow", type: "node-call", id: "call-fixture-1", scope: ROOT });
/** Every fixture value by name, so a witness names the value it located instead of spelling it. */
const VALUE_NAMES: Readonly<Record<string, string>> = frozen({
  OPERATION,
  SECOND_OPERATION,
  PROSE_OPERATION,
  WORKSPACE,
  RENDER,
  PROSE_RENDER,
  TRANSACTION,
  SESSION,
  GRAPH,
  BUNDLE,
  REVISION,
  ROOT,
  PI_ROOT,
  RF_ROOT,
  INVOCATION,
});

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = frozen([
  {
    id: "A",
    label:
      "(a) Pi's rf data model types each id separately - a graph_revision_id is never used where a render_id or bundle identity is required: each rf identity Pi's three readers read lands in its own typed slot (the operation id the preview, rf-workspace:, rf-graph: and sourceRevision, rf-bundle: and sourceVersion), the graph digest fills no bundle slot, and today's preview envelopes carry render_id null / transaction_id null, so no slot is render- or transaction-typed and neither id is ever stood in for",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) occurrence identity is never conflated with component_id or definition revision in Pi diffs or projections (03-host:78): absent today - no module spells an rf component, instance, definition revision, candidate key or occurrence field, Pi issues no diff, and a preview carrying the C-08 shape (one nested child rendered twice) projects neither occurrence, the component nor its revision",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) Pi handoff records carry a render_id copied from an rf envelope with provenance to the producing invocation: absent today - Pi mints no handoff render ids, admits no reading that carries one and declares no render-id member; what a reading does carry, its rf operation id, is copied from the envelope byte for byte with the host invocation and the invoking operation as provenance",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(d) no Pi code parses model-generated prose to recover a render id for authoritative use: no module spells the rf render-id prefix, the rf id family grammar or a render-naming pattern, rf document text is read only to type-check and digest it, and render-id-shaped prose in a document reaches no projected or evidence field",
    pins: ["D1", "D2"],
  },
]);

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Producer {
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly prefixKinds: { readonly [prefix: string]: string };
  readonly grammar: { readonly [field: string]: string };
  readonly recordFields: { readonly [record: string]: readonly string[] };
  readonly occurrenceQuote: string;
  readonly occurrenceCitation: string;
  readonly digests: { readonly [file: string]: string };
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly mergedQuote: string;
  readonly mergedCitation: string;
  readonly identities: readonly string[];
  readonly shippedReads: readonly string[];
  readonly posture: readonly string[];
  readonly producer: Producer;
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** Each pin's assertion count when its case compared its witness, in row order: `<pin>:<count>` (wb-mzoc F2). */
  readonly counted: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  if (!isObject(producer.programPin) || !isObject(producer.recordFields)) throw new Error("roster producer needs programPin and recordFields");
  const records = producer.recordFields;
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    mergedQuote: text(raw.mergedQuote, "mergedQuote"),
    mergedCitation: text(raw.mergedCitation, "mergedCitation"),
    identities: strings(raw.identities, "identities"),
    shippedReads: strings(raw.shippedReads, "shippedReads"),
    posture: strings(raw.posture, "posture"),
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      rfCommit: text(producer.rfCommit, "producer.rfCommit"),
      programPin: { repo: text(producer.programPin.repo, "producer.programPin.repo"), sha: text(producer.programPin.sha, "producer.programPin.sha") },
      prefixKinds: stringMap(producer.prefixKinds, "producer.prefixKinds"),
      grammar: stringMap(producer.grammar, "producer.grammar"),
      recordFields: Object.fromEntries(Object.entries(records).map(([record, fields]) => [record, strings(fields, `producer.recordFields.${record}`)])),
      occurrenceQuote: text(producer.occurrenceQuote, "producer.occurrenceQuote"),
      occurrenceCitation: text(producer.occurrenceCitation, "producer.occurrenceCitation"),
      digests: stringMap(producer.digests, "producer.digests"),
    },
    scan: scan as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
    counted: strings(raw.counted, "counted"),
  };
}

const ROSTER = frozen(readRoster());

const camel = (name: string): string => name.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
interface Vocabularies {
  /** Acceptance (a)'s names: the filing's data-model identities and the bundle, judged everywhere outside the READERS. */
  readonly aFamily: readonly string[];
  /** Acceptance (b)'s names: the filing's component/occurrence identities and the measured record identity fields. */
  readonly bFamily: readonly string[];
  /** The words rf shares with another producer Pi reads. */
  readonly namesakes: readonly string[];
  /** Every name a READER's identity table reports. */
  readonly readerTable: readonly string[];
  /** The camelCase spellings judged beside the snake_case ones (rf-only names; the namesakes' camelCase is Pi's own). */
  readonly camelForms: readonly string[];
  /** The rf id prefixes of the producer's table, each with its separator. */
  readonly prefixes: readonly string[];
}
/** The judged vocabularies, derived from the filing's names (FAMILY_OF, held to the bead row) and the measured producer facts:
 * the (b) family adds every block and component record field that names an identity (an `_id` or `_key` field). */
function vocabularies(producer: Producer): Vocabularies {
  const family = (kind: "a" | "b" | "namesake"): string[] => Object.keys(FAMILY_OF).filter(name => FAMILY_OF[name] === kind);
  const records = [...(producer.recordFields.blocks ?? []), ...(producer.recordFields.components ?? [])].filter(field => /_(?:id|key)$/.test(field));
  const aFamily = [...new Set([...family("a"), "bundle_revision_id"])].sort();
  const bFamily = [...new Set([...family("b"), ...records])].sort();
  const namesakes = [...new Set([...family("namesake"), ...PRODUCER_NAMESAKES])].sort();
  return {
    aFamily,
    bFamily,
    namesakes,
    readerTable: [...new Set([...aFamily, ...bFamily, ...namesakes, ...CARRIED])].sort(),
    camelForms: [...aFamily.filter(name => name !== "workspace_id"), ...bFamily].map(camel).sort(),
    prefixes: Object.keys(producer.prefixKinds)
      .map(prefix => `${prefix}_`)
      .sort(),
  };
}
const VOCABULARY = frozen(vocabularies(ROSTER.producer));
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordIn = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9_])(?:${words.map(escaped).join("|")})(?![A-Za-z0-9_])`);
const A_WORD = frozen(wordIn(VOCABULARY.aFamily));
const B_WORD = frozen(wordIn(VOCABULARY.bFamily));
const PREFIX_WORD = frozen(new RegExp(`(?<![A-Za-z0-9])(?:${VOCABULARY.prefixes.map(escaped).join("|")})`, "g"));
/** A producer grammar from the roster, compiled for JavaScript (Python's named groups spelled the JavaScript way). */
const grammar = (field: string): RegExp => new RegExp((ROSTER.producer.grammar[field] ?? "(?!)").replace(/\(\?P</g, "(?<"));

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
/** A path the census judges: a module below one of WALK_ROOTS. */
const judgedPath = (path: string): boolean => isModule(path) && WALK_ROOTS.some(root => path.startsWith(`${root}/`));

interface Walk {
  readonly modules: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every module below each of WALK_ROOTS, in name order, repository-relative with "/" separators; symlinks are recorded, never followed. */
function walkRoots(): Walk {
  const modules: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(REPO, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      const rel = posix(relative(REPO, path));
      if (entry.isSymbolicLink()) symlinks.push(rel);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && judgedPath(rel)) modules.push(rel);
    }
  };
  for (const root of WALK_ROOTS) visit(join(REPO, root));
  return { modules, symlinks, unreadable };
}

const regularFile = (path: string): boolean => {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
};
/** Git's own list of the checkout's files (LISTING), repository-relative with "/" separators, in name order; a listed path that
 * is missing on disk or is no regular file (a symlink, a submodule) is left out. */
function gitListing(): string[] {
  const listing = spawnSync("git", LISTING, { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (listing.status !== 0) throw new Error(`git ${LISTING.join(" ")} failed: ${listing.stderr ?? ""}${listing.error?.message ?? ""}`);
  return [...new Set(listing.stdout.split("\0"))].filter(path => path.length > 0 && regularFile(join(REPO, path))).sort();
}
/** The script forms of the TypeScript compiler's extension vocabulary; a path ending in one is a module by the compiler. */
const COMPILER_FORMS: readonly string[] = frozen(Object.values(ts.Extension).filter(form => !NON_SCRIPT_FORMS.includes(form)));
const compilerModule = (path: string): boolean => COMPILER_FORMS.some(form => path.toLowerCase().endsWith(form));
/** A path's top-level root: its first segment, or "." for a file at the repository root. */
const rootOf = (path: string): string => (path.includes("/") ? path.slice(0, path.indexOf("/")) : ".");
/** The root files of the TypeScript program PROGRAM_CONFIG defines, repository-relative, in name order. */
function programFiles(): string[] {
  const config = ts.readConfigFile(join(REPO, PROGRAM_CONFIG), ts.sys.readFile);
  if (config.error !== undefined) throw new Error(`${PROGRAM_CONFIG} does not parse`);
  return ts
    .parseJsonConfigFileContent(config.config, ts.sys, REPO)
    .fileNames.map(path => posix(relative(REPO, path)))
    .sort();
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
/** The leading literal text of an argument: a folded literal, else the leftmost literal piece of a concatenation or the head
 * of a template, so a pattern composed after its first piece (`"rfr_" + body`) still shows it. */
function leadingText(node: ts.Node): string | undefined {
  const folded = fold(node);
  if (folded !== undefined) return folded;
  if (ts.isParenthesizedExpression(node)) return leadingText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return leadingText(node.left);
  if (ts.isTemplateExpression(node)) return node.head.text;
  return undefined;
}
/** The last name of a member chain (`a.b.output` and `a["output"]` read output), or nothing for any other expression. */
function tailName(node: ts.Expression): string | undefined {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return fold(node.argumentExpression);
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) return tailName(node.expression);
  return undefined;
}
/** True when a call chain below `node` starts at createHash(). */
function startsAtCreateHash(node: ts.Expression): boolean {
  let current: ts.Expression = node;
  while (ts.isCallExpression(current) || ts.isPropertyAccessExpression(current)) {
    if (ts.isCallExpression(current) && ts.isIdentifier(current.expression) && current.expression.text === "createHash") return true;
    current = current.expression;
  }
  return false;
}
/** The node with its parenthesized wrappers, and the first parent that is not one. */
function unwrapped(node: ts.Node): { child: ts.Node; parent: ts.Node } {
  let child: ts.Node = node;
  let parent: ts.Node = node.parent;
  while (ts.isParenthesizedExpression(parent)) {
    child = parent;
    parent = parent.parent;
  }
  return { child, parent };
}
const EQUALITY: readonly ts.SyntaxKind[] = frozen([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
/** True when the read is one operand of an (in)equality whose other operand is the literal null. */
function comparedWithNull(node: ts.Node): boolean {
  const { child, parent } = unwrapped(node);
  if (!ts.isBinaryExpression(parent) || !EQUALITY.includes(parent.operatorToken.kind)) return false;
  const other = parent.left === child ? parent.right : parent.left;
  return other.kind === ts.SyntaxKind.NullKeyword;
}

interface KeyRead {
  readonly name: string;
  readonly nullCompared: boolean;
}
interface TextRead {
  readonly object: string;
  readonly use: "typeof" | "digest" | "other";
}
interface ModuleReading {
  readonly identifiers: readonly string[];
  readonly literals: readonly string[];
  readonly regexes: readonly string[];
  readonly reads: readonly KeyRead[];
  readonly members: readonly string[];
  readonly nullTypedMembers: readonly string[];
  readonly textReads: readonly TextRead[];
  readonly workspaceIdReads: number;
  readonly nativeEvidenceCalls: number;
  /** The git blob id of the text this reading parsed (wb-mzoc U1): held to Git's own id for the listed file's bytes. */
  readonly textBlob: string;
}
/** The git blob id of a text: what `git hash-object` prints for a file holding exactly its UTF-8 bytes. */
const gitBlobOf = (text: string): string => createHash("sha1").update(`blob ${Buffer.byteLength(text, "utf8")}\0`).update(text, "utf8").digest("hex");
/** One module's text, parsed under a script kind and the one PARSE_NAME: the reader never sees the module's path, so it cannot
 * single a module out by it (wb-mzoc U1). */
function readModule(kind: ts.ScriptKind, source: string): ModuleReading {
  return readSourceFile(ts.createSourceFile(PARSE_NAME, source, ts.ScriptTarget.Latest, true, kind));
}
/** A parsed file's reading: its identifiers, folded literals and regular expressions (literals and RegExp arguments), the
 * names it reads by property access, literal element access or object binding (each marked when it is an operand of a
 * comparison with null), the member names it declares, its reads of a `text` field, its reads of an rf workspace block's `id`,
 * its calls of nativeEvidence and the git blob id of the text it parsed. */
function readSourceFile(file: ts.SourceFile): ModuleReading {
  const identifiers: string[] = [];
  const literals: string[] = [];
  const regexes: string[] = [];
  const reads: KeyRead[] = [];
  const members: string[] = [];
  const nullTypedMembers: string[] = [];
  const textReads: TextRead[] = [];
  let workspaceIdReads = 0;
  let nativeEvidenceCalls = 0;
  const classify = (node: ts.Node): TextRead["use"] => {
    const { child, parent } = unwrapped(node);
    if (ts.isTypeOfExpression(parent)) return "typeof";
    if (ts.isCallExpression(parent) && parent.arguments.length === 1 && parent.arguments[0] === child && ts.isPropertyAccessExpression(parent.expression)) {
      const callee = parent.expression;
      if (callee.name.text === "update" && startsAtCreateHash(callee.expression)) return "digest";
    }
    return "other";
  };
  const memberName = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name) ? name.text : undefined);
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) identifiers.push(node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) literals.push(node.text);
    else if (ts.isRegularExpressionLiteral(node)) regexes.push(node.text);
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) literals.push(folded);
    }
    if ((ts.isNewExpression(node) || ts.isCallExpression(node)) && ts.isIdentifier(node.expression) && node.expression.text === "RegExp") {
      const first = node.arguments?.[0];
      const pattern = first === undefined ? undefined : leadingText(first);
      if (pattern !== undefined) regexes.push(pattern);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "nativeEvidence") nativeEvidenceCalls += 1;
    if (ts.isPropertyAccessExpression(node)) {
      reads.push({ name: node.name.text, nullCompared: comparedWithNull(node) });
      if (node.name.text === "text") textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
      if (node.name.text === "id" && tailName(node.expression) === "workspace") workspaceIdReads += 1;
    }
    if (ts.isElementAccessExpression(node)) {
      const key = fold(node.argumentExpression);
      if (key !== undefined) {
        reads.push({ name: key, nullCompared: comparedWithNull(node) });
        if (key === "text") textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
      }
    }
    if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const named = node.propertyName ?? node.name;
      const key = ts.isIdentifier(named) || ts.isStringLiteral(named) ? named.text : undefined;
      if (key !== undefined) {
        reads.push({ name: key, nullCompared: false });
        if (key === "text") {
          const declaration = node.parent.parent;
          const initializer = ts.isVariableDeclaration(declaration) ? declaration.initializer : undefined;
          textReads.push({ object: initializer === undefined ? "" : (tailName(initializer) ?? ""), use: "other" });
        }
      }
    }
    if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node) || ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) {
      const name = memberName(node.name);
      if (name !== undefined) {
        members.push(name);
        if (ts.isPropertySignature(node) && node.type !== undefined && ts.isLiteralTypeNode(node.type) && node.type.literal.kind === ts.SyntaxKind.NullKeyword) nullTypedMembers.push(name);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { identifiers, literals, regexes, reads, members, nullTypedMembers, textReads, workspaceIdReads, nativeEvidenceCalls, textBlob: gitBlobOf(file.text) };
}

const isReader = (reading: ModuleReading): boolean => reading.literals.includes(RENDER_COMMAND);
/** The names of `vocabulary` a module spells: as an identifier or as an exact literal, plus workspace.id when it reads one. */
function spelled(reading: ModuleReading, vocabulary: readonly string[]): string[] {
  const names = [...reading.identifiers, ...reading.literals].filter(name => vocabulary.includes(name));
  return [...new Set([...names, ...(reading.workspaceIdReads > 0 ? [WORKSPACE_ID_READ] : [])])].sort();
}
/** Every identifier or exact literal of `words`, and every folded literal holding one as a whole word. */
const wholeWordHits = (path: string, reading: ModuleReading, words: readonly string[], word: RegExp): string[] => [
  ...reading.identifiers.filter(name => words.includes(name)).map(name => `${path}: identifier ${name}`),
  ...reading.literals.filter(value => word.test(value)).map(value => `${path}: literal ${value.slice(0, 80)}`),
];
/** Of each null-only name a module reads: `<null-compared reads>/<reads>`. */
function nullOnlyReads(reading: ModuleReading): { [name: string]: string } {
  return Object.fromEntries(
    NULL_ONLY.map(name => {
      const of = reading.reads.filter(read => read.name === name);
      return [name, `${of.filter(read => read.nullCompared).length}/${of.length}`];
    }),
  );
}
/** The rf reference prefixes a module mints: its literal pieces of the rf-<kind>: form, up to the first colon. */
const refPrefixes = (reading: ModuleReading): string[] =>
  [...new Set(reading.literals.filter(value => REF_PREFIX.test(value)).map(value => value.slice(0, value.indexOf(":") + 1)))].sort();
/** The rf id prefixes a module spells in a literal or a regular expression. */
const idPrefixes = (reading: ModuleReading): string[] => [...new Set([...reading.literals, ...reading.regexes].flatMap(value => [...value.matchAll(PREFIX_WORD)].map(match => match[0])))].sort();
/** D1's judge for one module: a literal or pattern spelling the render prefix or the family grammar, or a pattern naming render. */
function renderPatternFindings(path: string, reading: ModuleReading): string[] {
  return [
    ...[...reading.literals, ...reading.regexes].filter(value => value.includes(RENDER_PREFIX)).map(value => `${path}: render prefix in ${value.slice(0, 60)}`),
    ...[...reading.literals, ...reading.regexes].filter(value => value.includes(FAMILY_GRAMMAR)).map(value => `${path}: family grammar in ${value.slice(0, 60)}`),
    ...reading.regexes.filter(value => RENDER_PATTERN.test(value)).map(value => `${path}: render pattern ${value.slice(0, 60)}`),
  ];
}
/** D1's text judge: every text read in a READER, and every output.text read anywhere, that is neither a typeof nor a digest. */
function textFindings(path: string, reading: ModuleReading): string[] {
  const reader = isReader(reading);
  return reading.textReads.filter(read => read.use === "other" && (reader || read.object === "output")).map(read => `${path}: ${read.object}.text`);
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly readers: string[];
  /** Git's own list of the checkout's files (gitListing): the walk's outside anchor. */
  readonly listing: string[];
  /** The root files of the tsconfig.json program (programFiles): the second outside listing of src. */
  readonly program: string[];
  /** Git's own blob id of each walked module's file (gitBlobs): the parsed texts' outside anchor (wb-mzoc U1). */
  readonly blobs: Map<string, string>;
}
/** Git's own blob id of each path's file on disk (HASH_OBJECT: git reads and hashes the files itself), keyed by path. */
function gitBlobs(paths: readonly string[]): Map<string, string> {
  const hashed = spawnSync("git", HASH_OBJECT, { cwd: REPO, input: paths.map(path => `${path}\n`).join(""), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (hashed.status !== 0) throw new Error(`git ${HASH_OBJECT.join(" ")} failed: ${hashed.stderr ?? ""}${hashed.error?.message ?? ""}`);
  const ids = hashed.stdout.split("\n").filter(id => id.length > 0);
  if (ids.length !== paths.length) throw new Error(`git ${HASH_OBJECT.join(" ")} printed ${ids.length} ids for ${paths.length} paths`);
  return new Map(paths.map((path, index) => [path, ids[index] ?? ""]));
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once: the one shared site the judged map is built at. Every tree judge reads it only
 * through its own view (viewOf); A1 holds its view to the anchored walk (judgedAnchor), and every other view is held to A1's
 * (heldToA1, and the record). */
function liveTree(): TreeReading {
  if (live === undefined) {
    const walk = walkRoots();
    const modules = new Map<string, ModuleReading>();
    for (const path of walk.modules) modules.set(path, readModule(scriptKindOf(path), readFileSync(join(REPO, path), "utf8")));
    const readers = [...modules].filter(([, reading]) => isReader(reading)).map(([path]) => path);
    live = { walk, modules, readers, listing: gitListing(), program: programFiles(), blobs: gitBlobs(walk.modules) };
  }
  return live;
}
/** The compiler's own reading of a listed module: its bytes read again, parsed under its own path with the script kind
 * TypeScript gives that path (never scriptKindOf, never PARSE_NAME). */
const compilerReading = (path: string): ModuleReading => readSourceFile(ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true));
/** What one tree judge reads of the shared tree (wb-mzoc U2): its own structured clone of the judged map and the readers list,
 * taken in its case; the judge iterates only its view, never the shared tree. */
interface JudgedView {
  readonly modules: Map<string, ModuleReading>;
  readonly readers: string[];
}
/** A judge's view of a tree: a structured clone, so nothing the shared site does after the clone reaches it. */
const viewOf = (tree: Pick<TreeReading, "modules" | "readers">): JudgedView => structuredClone({ modules: tree.modules, readers: tree.readers });
/** The digest of a view as its judge read it (wb-mzoc U2): every key in order, each reading (its parsed text's blob id
 * included) and the readers list. */
const viewDigest = (view: JudgedView): string => createHash("sha256").update(JSON.stringify({ modules: [...view.modules], readers: view.readers })).digest("hex");
/** The digest of each tree judge's view, recorded at the end of its case (A1's even when one of its judges reds), by pin. */
const VIEWS: { [pin: string]: string } = {};
/** Writes a digest once (wb-mzoc U2): the entry is read-only and permanent, so nothing that runs later - the shared site
 * included - can replace or delete a recorded view. */
const recordOnce = (store: { [pin: string]: string }, pin: string, digest: string): void => {
  Object.defineProperty(store, pin, { value: digest, enumerable: true, writable: false, configurable: false });
};
/** Records the digest of the view a tree judge read, at the end of its case, and reports whether it is A1's anchored view. */
const heldToA1 = (pin: string, view: JudgedView, store: { [pin: string]: string } = VIEWS): boolean => {
  recordOnce(store, pin, viewDigest(view));
  return store.A1 !== undefined && store[pin] === store.A1;
};
/** The view guard's reading of a constructed judge (wb-mzoc U2): 1 when the view the judge holds at the end of its run is not
 * the view it took - the guard reads what a judge read, never what it found. */
function guardReads(tree: Pick<TreeReading, "modules" | "readers">, judge: (view: JudgedView) => readonly string[]): number {
  const taken = viewDigest(viewOf(tree));
  const view = viewOf(tree);
  judge(view);
  return Number(viewDigest(view) !== taken);
}
/** The compiler's own reading of each of `paths` (compilerReading), by path: judgedAnchor's second read (wb-yvoa F1). */
const ownReadings = (paths: readonly string[]): ReadonlyMap<string, ModuleReading> => new Map(paths.map(path => [path, compilerReading(path)]));
interface JudgedAnchor {
  readonly unjudged: string[];
  readonly misread: string[];
  readonly reread: string[];
  readonly readers: string[];
}
/** What a judge reads, held to the anchored walk (wb-mzoc U1 and U2): the walked modules the view's map holds no reading for
 * (J-NARROW), the judged modules whose reading parsed a text other than the listed file's own bytes - its text's blob id is
 * not Git's (J-READ) - the judged modules whose reading is not the compiler's own reading of the listed file (a reading altered
 * after its parse, or parsed under another script kind), and the judged modules whose READER standing in the view's readers
 * list is not their own compiler reading's (it holds the render command literal), so a readers list filtered or widened reds.
 * The compiler's own readings are the view's modules' (ownReadings) unless the caller passes them: A1 takes them once and
 * shares them with its sweep (wb-yvoa F1). A const binding, like walkAnchor, heldToA1 and the view's helpers, so nothing that
 * runs later can replace it. */
const judgedAnchor = (tree: Pick<TreeReading, "walk" | "blobs">, view: JudgedView, own: ReadonlyMap<string, ModuleReading> = ownReadings([...view.modules.keys()])): JudgedAnchor => {
  const judged = [...view.modules];
  const ownReaders = judged.filter(([path]) => own.get(path)?.literals.includes(RENDER_COMMAND) === true).map(([path]) => path);
  return {
    unjudged: tree.walk.modules.filter(path => !view.modules.has(path)),
    misread: judged.filter(([path, reading]) => reading.textBlob !== tree.blobs.get(path)).map(([path]) => path),
    reread: judged.filter(([path, reading]) => JSON.stringify(reading) !== JSON.stringify(own.get(path))).map(([path]) => path),
    readers: [...new Set([...view.readers, ...ownReaders])].filter(path => view.readers.includes(path) !== ownReaders.includes(path)).sort(),
  };
};
interface WalkAnchor {
  readonly unwalked: string[];
  readonly unlisted: string[];
  readonly outsideRoots: string[];
  readonly programUnwalked: string[];
}
/** The walk held to its outside listings (wb-mzoc F1): the modules Git lists below WALK_ROOTS that the walk did not read, the
 * modules the walk read that Git does not list, the roots of the modules Git lists outside WALK_ROOTS, and the root files of
 * the tsconfig.json program the walk did not read. A listed path is a module by the compiler's forms, never by the walk's own
 * predicate, and its root is its first segment, never a prefix test the walk shares. The roots default to WALK_ROOTS; A1's
 * constructed controls pass others (R-ROOT-MOVED). */
const walkAnchor = (tree: Pick<TreeReading, "walk" | "listing" | "program">, roots: readonly string[] = WALK_ROOTS): WalkAnchor => {
  const walked = new Set(tree.walk.modules);
  const listed = tree.listing.filter(compilerModule);
  const listedSet = new Set(listed);
  const inRoots = (path: string): boolean => roots.includes(rootOf(path));
  return {
    unwalked: listed.filter(path => inRoots(path) && !walked.has(path)),
    unlisted: tree.walk.modules.filter(path => !listedSet.has(path)),
    outsideRoots: [...new Set(listed.filter(path => !inRoots(path)).map(rootOf))].sort(),
    programUnwalked: tree.program.filter(path => !walked.has(path)),
  };
};
/** 1 when a walk anchor reads any finding against the unjudged roots it is held to, else 0 (A1's constructed walk controls). */
const walkFinds = (anchor: WalkAnchor, unjudged: readonly string[] = UNJUDGED_ROOTS): number =>
  Number(anchor.unwalked.length + anchor.unlisted.length + anchor.programUnwalked.length > 0 || JSON.stringify(anchor.outsideRoots) !== JSON.stringify(unjudged));
const below = (tree: TreeReading, root: string): number => tree.walk.modules.filter(path => path.startsWith(`${root}/`)).length;
const floorsMet = (tree: TreeReading): boolean => below(tree, "src") >= FLOORS.src && below(tree, "qa") >= FLOORS.qa && below(tree, "examples") >= FLOORS.examples;
const readingOf = (view: Pick<JudgedView, "modules">, path: string): ModuleReading => {
  const reading = view.modules.get(path);
  if (reading === undefined) throw new Error(`the walk read no ${path}`);
  return reading;
};

/** A value the sweeps write into a reading (wb-yvoa F1); no module spells it. */
const ALTERED = "wb-yvoa-altered";
/** One alteration per reading field (wb-yvoa F1), each giving the field a value no reading holds: a list gains one entry, a
 * count gains one, the blob id becomes another text's. Its mapped type names every field of ModuleReading, so a field added
 * without an alteration does not type-check. */
const FIELD_ALTERATIONS: { readonly [Field in keyof ModuleReading]: (reading: ModuleReading) => ModuleReading } = frozen({
  identifiers: reading => ({ ...reading, identifiers: [...reading.identifiers, ALTERED] }),
  literals: reading => ({ ...reading, literals: [...reading.literals, ALTERED] }),
  regexes: reading => ({ ...reading, regexes: [...reading.regexes, ALTERED] }),
  reads: reading => ({ ...reading, reads: [...reading.reads, { name: ALTERED, nullCompared: false }] }),
  members: reading => ({ ...reading, members: [...reading.members, ALTERED] }),
  nullTypedMembers: reading => ({ ...reading, nullTypedMembers: [...reading.nullTypedMembers, ALTERED] }),
  textReads: reading => ({ ...reading, textReads: [...reading.textReads, { object: ALTERED, use: "other" }] }),
  workspaceIdReads: reading => ({ ...reading, workspaceIdReads: reading.workspaceIdReads + 1 }),
  nativeEvidenceCalls: reading => ({ ...reading, nativeEvidenceCalls: reading.nativeEvidenceCalls + 1 }),
  textBlob: reading => ({ ...reading, textBlob: gitBlobOf(ALTERED) }),
});
/** Every reading field the sweeps alter, in a reading's own key order; each swept reading's keys are held to it. */
const READING_FIELDS: readonly (keyof ModuleReading)[] = frozen(Object.keys(FIELD_ALTERATIONS) as (keyof ModuleReading)[]);
/** The list fields of a reading: every field whose value is a list (wb-iy1n F1). */
type ListField = { readonly [Field in keyof ModuleReading]: ModuleReading[Field] extends readonly unknown[] ? Field : never }[keyof ModuleReading];
/** One same-cardinality substitution per list field (wb-iy1n F1, the gate's L1 and L2): the list's first entry replaced by the
 * entry FIELD_ALTERATIONS appends, its length kept (an empty list gains the entry), so a guard reading only how many entries
 * each list holds - H-DIGEST-CARDINALITY, H-REREAD-CARDINALITY - moves under none of them and is found, where every alteration
 * above changes a count. Its mapped type names every list field of ModuleReading, so a list field added without one does not
 * type-check. */
const FIELD_SUBSTITUTIONS: { readonly [Field in ListField]: (reading: ModuleReading) => ModuleReading } = frozen({
  identifiers: reading => ({ ...reading, identifiers: [ALTERED, ...reading.identifiers.slice(1)] }),
  literals: reading => ({ ...reading, literals: [ALTERED, ...reading.literals.slice(1)] }),
  regexes: reading => ({ ...reading, regexes: [ALTERED, ...reading.regexes.slice(1)] }),
  reads: reading => ({ ...reading, reads: [{ name: ALTERED, nullCompared: false }, ...reading.reads.slice(1)] }),
  members: reading => ({ ...reading, members: [ALTERED, ...reading.members.slice(1)] }),
  nullTypedMembers: reading => ({ ...reading, nullTypedMembers: [ALTERED, ...reading.nullTypedMembers.slice(1)] }),
  textReads: reading => ({ ...reading, textReads: [{ object: ALTERED, use: "other" }, ...reading.textReads.slice(1)] }),
});
/** Every list field the sweeps substitute, in a reading's own key order. */
const LIST_FIELDS: readonly ListField[] = frozen(Object.keys(FIELD_SUBSTITUTIONS) as ListField[]);
/** A guard as its sweep runs it (wb-yvoa F1): the view digest, A1's judged anchor and the walk anchor, or a constructed partial
 * one (the sweeps' own controls). */
type DigestGuard = (view: JudgedView) => string;
type AnchorGuard = (tree: Pick<TreeReading, "walk" | "blobs">, view: JudgedView, own: ReadonlyMap<string, ModuleReading>) => JudgedAnchor;
type WalkGuard = (tree: Pick<TreeReading, "walk" | "listing" | "program">, roots?: readonly string[]) => WalkAnchor;
/** True when two path lists hold the same paths. */
const samePaths = (found: readonly string[], expected: readonly string[]): boolean => JSON.stringify([...found].sort()) === JSON.stringify([...expected].sort());
/** The digest's sweep (wb-yvoa F1): what a digest does not move with over every module of a view - alone, as a one-module view:
 * its keys not READING_FIELDS, its digest the empty view's, the same under another key, the same with any one reading field
 * altered or any one list field's first entry substituted (wb-iy1n F1), and the same as a readers entry - and over the whole
 * view: the same with any one reading field altered, or any one list field's first entry substituted, in every module at once.
 * Empty for viewDigest; its own controls run it against partial digests. */
const digestSweep = (view: JudgedView, digest: DigestGuard = viewDigest): string[] => {
  const none = digest({ modules: new Map(), readers: [] });
  const one = (path: string, reading: ModuleReading): string => digest({ modules: new Map([[path, reading]]), readers: [] });
  const whole = digest(view);
  const everyModule = (change: (reading: ModuleReading) => ModuleReading): JudgedView => ({ modules: new Map([...view.modules].map(([path, reading]) => [path, change(reading)])), readers: [...view.readers] });
  return [
    ...[...view.modules].flatMap(([path, reading]) => {
      const alone = one(path, reading);
      return [
        ...(JSON.stringify(Object.keys(reading)) === JSON.stringify(READING_FIELDS) ? [] : [`${path}: fields`]),
        ...(alone === none ? [`${path}: module`] : []),
        ...(one(`${path}/${ALTERED}`, reading) === alone ? [`${path}: key`] : []),
        ...READING_FIELDS.filter(field => one(path, FIELD_ALTERATIONS[field](reading)) === alone).map(field => `${path}: ${field}`),
        ...LIST_FIELDS.filter(field => one(path, FIELD_SUBSTITUTIONS[field](reading)) === alone).map(field => `${path}: ${field} substituted`),
        ...(digest({ modules: new Map(), readers: [path] }) === none ? [`${path}: readers`] : []),
      ];
    }),
    ...READING_FIELDS.filter(field => digest(everyModule(FIELD_ALTERATIONS[field])) === whole).map(field => `every module: ${field}`),
    ...LIST_FIELDS.filter(field => digest(everyModule(FIELD_SUBSTITUTIONS[field])) === whole).map(field => `every module: ${field} substituted`),
  ];
};
/** The judged anchor's sweep (wb-yvoa F1): what an anchor does not find over every module of a view - alone, as a one-module
 * tree, and every module at once: the modules left out of an empty view (unjudged), their blob ids another text's (misread),
 * any one reading field altered or any one list field's first entry substituted (reread; wb-iy1n F1), and their READER
 * standing misstated - every non-reader listed, every reader left out (readers). Empty for judgedAnchor; its own controls run
 * it against partial anchors. */
const anchorSweep = (tree: Pick<TreeReading, "walk" | "blobs">, view: JudgedView, own: ReadonlyMap<string, ModuleReading>, anchor: AnchorGuard = judgedAnchor): string[] => {
  const ownReader = (path: string): boolean => own.get(path)?.literals.includes(RENDER_COMMAND) === true;
  const on = (paths: readonly string[]): Pick<TreeReading, "walk" | "blobs"> => ({ ...tree, walk: { ...tree.walk, modules: [...paths] } });
  const altered = (paths: readonly string[], change: (reading: ModuleReading) => ModuleReading): JudgedView => ({ modules: new Map(paths.map(path => [path, change(readingOf(view, path))])), readers: [] });
  const sweep = (paths: readonly string[], label: string): string[] => [
    ...(samePaths(anchor(on(paths), { modules: new Map(), readers: [] }, own).unjudged, paths) ? [] : [`${label}: unjudged`]),
    ...(samePaths(anchor(on(paths), altered(paths, FIELD_ALTERATIONS.textBlob), own).misread, paths) ? [] : [`${label}: misread`]),
    ...READING_FIELDS.filter(field => !samePaths(anchor(on(paths), altered(paths, FIELD_ALTERATIONS[field]), own).reread, paths)).map(field => `${label}: ${field}`),
    ...LIST_FIELDS.filter(field => !samePaths(anchor(on(paths), altered(paths, FIELD_SUBSTITUTIONS[field]), own).reread, paths)).map(field => `${label}: ${field} substituted`),
    ...(samePaths(anchor(on(paths), { modules: new Map(paths.map(path => [path, readingOf(view, path)])), readers: paths.filter(path => !ownReader(path)) }, own).readers, paths) ? [] : [`${label}: readers`]),
  ];
  const paths = [...view.modules.keys()];
  return [...paths.flatMap(path => sweep([path], path)), ...sweep(paths, "every module")];
};
/** The walk anchor's sweep (wb-yvoa F1): what a walk anchor does not find - every walked module alone left out of the walk
 * (unwalked) and out of Git's listing (unlisted), every root file of the program alone left out of the walk (programUnwalked),
 * every walk root alone held unjudged (outsideRoots), and every module at once: the walk emptied (unwalked, programUnwalked)
 * and the listing emptied (unlisted). Empty for walkAnchor; its own controls run it against partial walk anchors. */
const walkSweep = (tree: Pick<TreeReading, "walk" | "listing" | "program">, anchor: WalkGuard = walkAnchor): string[] => {
  const walked = tree.walk.modules;
  const on = (modules: readonly string[], listing: readonly string[]): Pick<TreeReading, "walk" | "listing" | "program"> => ({ walk: { ...tree.walk, modules: [...modules] }, listing: [...listing], program: [...tree.program] });
  const without = (paths: readonly string[], path: string): string[] => paths.filter(entry => entry !== path);
  const unwalkedOne = new Map(walked.map(path => [path, anchor(on(without(walked, path), tree.listing))]));
  const leftOut = (path: string): WalkAnchor => unwalkedOne.get(path) ?? anchor(on(without(walked, path), tree.listing));
  return [
    ...walked.flatMap(path => [
      ...(samePaths(leftOut(path).unwalked, [path]) ? [] : [`${path}: unwalked`]),
      ...(samePaths(anchor(on(walked, without(tree.listing, path))).unlisted, [path]) ? [] : [`${path}: unlisted`]),
    ]),
    ...tree.program.filter(path => !samePaths(leftOut(path).programUnwalked, [path])).map(path => `${path}: programUnwalked`),
    ...WALK_ROOTS.filter(root => !anchor(on(walked, tree.listing), WALK_ROOTS.filter(other => other !== root)).outsideRoots.includes(root)).map(root => `${root}: outsideRoots`),
    ...(samePaths(anchor(on([], tree.listing)).unwalked, walked) ? [] : ["every module: unwalked"]),
    ...(samePaths(anchor(on([], tree.listing)).programUnwalked, tree.program) ? [] : ["every module: programUnwalked"]),
    ...(samePaths(anchor(on(walked, [])).unlisted, walked) ? [] : ["every module: unlisted"]),
  ];
};
/** A snippet read as a READER module: it carries the render command literal the readers check. */
const asReader = (snippet: string): string => `const COMMAND = "${RENDER_COMMAND}";\n${snippet}`;
const snippet = (source: string): ModuleReading => readModule(ts.ScriptKind.TS, source);

/** The full-shape fixture with this census's identity values: its operation, workspace, graph digest and bundle. */
function previewSource(adjust: (result: JsonObject) => void = () => {}, envelope: (source: JsonObject) => void = () => {}, root = ROOT): JsonObject {
  const source = fullShapeRf(root);
  source.operation_id = OPERATION;
  source.workspace = { id: WORKSPACE, root };
  const result = source.result;
  if (!isObject(result) || !isObject(result.provenance)) throw new Error("the fixture result must carry a provenance object");
  const provenance = result.provenance as JsonObject;
  provenance.graph_revision_id = GRAPH;
  (result as JsonObject).bundle_revision_id = BUNDLE;
  adjust(result as JsonObject);
  envelope(source);
  return source;
}
/** A preview reading (the provider's output shape) of previewSource. */
function previewReading(adjust: (result: JsonObject) => void = () => {}, envelope: (source: JsonObject) => void = () => {}, root = ROOT): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: root, source: previewSource(adjust, envelope, root) } as JsonValue;
}
function withText(document: string): (result: JsonObject) => void {
  return result => {
    result.output = { text: document, size_bytes: Buffer.byteLength(document), digest: `sha256:${"c3".repeat(32)}`, path: null };
  };
}
/** The C-08 records (CONSTRUCTED from the producer's field lists): two occurrences of one block key of one nested child
 * instance, each separately priced and judged, its one definition revision, and an effect row naming the instance. */
function nestedChildRecords(result: JsonObject): void {
  const block = (index: number, key: string): JsonObject => ({
    final_index: index,
    candidate_key: key,
    component_id: CHILD,
    token_cost: { kind: "estimated", tokens: 2050 },
    token_cost_kind: "estimated",
  });
  const decision = (key: string): JsonObject => ({
    candidate_key: key,
    necessity_class: "always",
    include: true,
    reason: "pinned_required",
    estimated_tokens: 2050,
    metadata: {},
    policy_revision_id: POLICY,
    judge_id: "host.default",
    judge_kind: "host_default",
    necessity_class_raw: "always",
    fallback_used: false,
    failure_mode: null,
  });
  result.blocks = [block(0, FIRST_OCCURRENCE), block(1, SECOND_OCCURRENCE)];
  result.necessity = [decision(FIRST_OCCURRENCE), decision(SECOND_OCCURRENCE)];
  result.components = [{ component_instance_id: INSTANCE, component_id: CHILD, component_revision_id: REVISION, status: "ok", source_unavailable: [] }];
  result.effects = [
    {
      render_id: null,
      component_instance_id: INSTANCE,
      effect_id: "notify-parent",
      effect_type: "notify",
      status: "not_executed",
      reason_codes: [],
      idempotency_key: IDEMPOTENCY,
      dispatch_count: 0,
      fiber_status: null,
      result_digest: null,
    },
  ];
}
/** The adapter's refusal of a reading, as `<category>: <message>`, or "admitted". */
function adapterVerdict(reading: JsonValue, context: ReactiveFiberTopologyContext = HOST): string {
  try {
    reactivefiberTopology(reading, context);
    return "admitted";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `untyped: ${String(error)}`;
  }
}
const topologyOf = (reading: JsonValue, context: ReactiveFiberTopologyContext = HOST): ReactiveFiberProjectionTopology => reactivefiberTopology(reading, context);
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
/** Every path in `value` (keys joined by ".") whose string leaf contains `needle`; an object key holding it reads `<path>{key}`. */
function locations(value: Json, needle: string, path = ""): string[] {
  const at = (key: string): string => (path === "" ? key : `${path}.${key}`);
  if (typeof value === "string") return value.includes(needle) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => locations(item, needle, at(String(index))));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => [...(key.includes(needle) ? [`${path}{${key}}`] : []), ...locations(item, needle, at(key))]);
  }
  return [];
}
/** The sorted locations of each named fixture value in `value`. */
function slotMap(value: unknown, names: readonly string[]): { [name: string]: string[] } {
  const tree = json(value);
  return Object.fromEntries(names.map(name => [name, locations(tree, VALUE_NAMES[name] ?? name).sort()]));
}
/** A fixture value's name, or the value itself when it is none of them. */
const nameOf = (value: unknown): Json => {
  const found = Object.entries(VALUE_NAMES).find(([, entry]) => entry === value);
  return found !== undefined ? found[0] : json(value ?? null);
};
/** The top-level snapshot fields (and "relations" or "diagnostics") two projections differ in. */
function projectionDelta(left: ReactiveFiberProjectionTopology, right: ReactiveFiberProjectionTopology): string[] {
  const fieldsOf = (value: Json): JsonObject => (value !== null && typeof value === "object" && !Array.isArray(value) ? value : {});
  const a = fieldsOf(json(left.snapshots[0] ?? null));
  const b = fieldsOf(json(right.snapshots[0] ?? null));
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  const differ = (x: unknown, y: unknown): boolean => JSON.stringify(x) !== JSON.stringify(y);
  return [
    ...keys.filter(key => differ(a[key], b[key])),
    ...(differ(left.relations, right.relations) ? ["relations"] : []),
    ...(differ(left.diagnostics, right.diagnostics) ? ["diagnostics"] : []),
  ];
}
/** The identity slots of a snapshot: everything that names a native object, a version, a revision, evidence or a payload. */
function identitySlots(topology: ReactiveFiberProjectionTopology): Json {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) return null;
  return json({
    source: snapshot.source,
    scope: snapshot.scope,
    sourceVersion: snapshot.sourceVersion ?? null,
    sourceRevision: snapshot.sourceRevision ?? null,
    evidenceRefs: snapshot.evidenceRefs ?? [],
    nativePayloadRef: snapshot.nativePayloadRef ?? null,
    trace: snapshot.trace ?? null,
  });
}
/** Applies a topology's snapshot to a fresh projection and reads the node back: its native reference, version cohort key and
 * evidence references. */
function appliedNode(topology: ReactiveFiberProjectionTopology): { nativeRef: Json; sourceVersion: Json; evidenceRefs: Json; applied: string; nodes: number } {
  const projection = new ObservationProjection();
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the topology holds no snapshot");
  const applied = projection.refresh(snapshot);
  const nodes = projection.query({ scope: HOST.scope, limit: 10 }).nodes;
  const node = nodes[0];
  return {
    applied,
    nodes: nodes.length,
    nativeRef: json(node?.nativeRef ?? null),
    sourceVersion: nameOf(node?.sourceVersion),
    evidenceRefs: json(node?.evidenceRefs ?? []),
  };
}
/** Every object key of a JSON tree. */
function keysOf(value: Json): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => [key, ...keysOf(item)]);
  return [];
}

installScratchLeakGuard();
const originalPath = process.env.PATH;
const stubs: string[] = [];
/** A stub rf as the ONLY PATH entry (absolute-node shebang, no host rf behind it) that prints `source` and exits 0, so the
 * provider's own envelope validator decides. */
function stubRf(source: JsonObject): void {
  const dir = makeScratch("rf-identity-distinctness-");
  stubs.push(dir);
  const binary = join(dir, "rf");
  writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
  chmodSync(binary, 0o700);
  process.env.PATH = dir;
}
/** The native provider's verdict on one envelope printed by the stub: admitted (verbatim or rewritten) or its typed refusal. */
async function providerVerdict(source: JsonObject): Promise<string> {
  stubRf(source);
  try {
    const reading = await nativeReactiveFiberRender({ model: "model", task: "task" }, ROOT);
    const carried = isObject(reading) ? reading.source : undefined;
    return JSON.stringify(carried) === JSON.stringify(source) ? "admitted verbatim" : "admitted rewritten";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `untyped: ${String(error)}`;
  }
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}
/** Each pin's witness as its case returned it; the record compares the whole set against the roster a second time. */
const MEASURED: { [pin: string]: Json } = {};
/** Each pin's assertion count when its case compared its witness (its own judges, its control readings and the compare
 * included), in run order: `<pin>:<count>` (wb-mzoc F2). A case that returns its roster witness without running its judges
 * counts fewer, and the record reds. */
const COUNTED: string[] = [];

/** A control fires when it counts a hit: a count of 1 or more, a non-empty list, a ratio with at least one read. */
function fires(value: Json): boolean {
  if (typeof value === "number") return value >= 1;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string" && /^\d+\/\d+$/.test(value)) return Number(value.slice(value.indexOf("/") + 1)) >= 1;
  throw new Error(`a control reads ${JSON.stringify(value)}: neither a count, a list nor a ratio`);
}
/** Each control of a pin's witness read as fires, quiet or absent, beside its classification (wb-mzoc F3): quiet for the pin's
 * named quiet rows (QUIET_ROWS) and accepted forms (ACCEPTED_FORMS), each of which must be present, fires for every other
 * control - so a positive control zeroed in this file and the roster together still reds - and for each named blind positive
 * of a guard residual (GUARD_POSITIVES, wb-ahgz F2), which must be present too, so one deleted with its roster value reds. */
function controlReadings(pin: string, witness: Json): { read: { [name: string]: string }; expected: { [name: string]: string } } {
  const controls: JsonObject = isObject(witness) && isObject(witness.controls) ? (witness.controls as JsonObject) : {};
  const quiet = [...Object.values(QUIET_ROWS).flat(), ...ACCEPTED_FORMS].filter(entry => entry.startsWith(`${pin}.`)).map(entry => entry.slice(pin.length + 1));
  const positives = Object.values(GUARD_POSITIVES)
    .flatMap(pairs => Object.values(pairs))
    .filter(entry => entry.startsWith(`${pin}.`))
    .map(entry => entry.slice(pin.length + 1));
  const names = [...new Set([...Object.keys(controls), ...quiet, ...positives])].sort();
  const reading = (name: string): string => (!Object.hasOwn(controls, name) ? "absent" : fires(controls[name] ?? null) ? "fires" : "quiet");
  return {
    read: Object.fromEntries(names.map(name => [name, reading(name)])),
    expected: Object.fromEntries(names.map(name => [name, quiet.includes(name) ? "quiet" : "fires"])),
  };
}

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every registered test of this file (vitest's task tree), in registration order: its title, collected mode, inversion and
 * state, and whether it is the case reading the tree. */
function registeredTests(current: Readonly<RunnerTestCase>): Registered[] {
  const walked: Registered[] = [];
  const visit = (tasks: readonly RunnerTask[]): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === current });
      else if (child.type === "suite") visit(child.tasks);
    }
  };
  visit(current.file.tasks);
  return walked;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. Frozen (wb-iy1n F2), so a case
 * replaced at run time throws where it is replaced. */
const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = frozen({
  A1: () => {
    const tree = liveTree();
    const view = viewOf(tree);
    try {
      const modulesFloorMet = floorsMet(tree);
      const walk = walkAnchor(tree);
      const own = ownReadings([...view.modules.keys()]);
      const judged = judgedAnchor(tree, view, own);
      const table = Object.fromEntries(view.readers.map(path => [path, spelled(readingOf(view, path), VOCABULARY.readerTable)]));
      const nullOnly = Object.fromEntries(view.readers.map(path => [path, nullOnlyReads(readingOf(view, path))]));
      const nullTyped = Object.fromEntries(view.readers.map(path => [path, readingOf(view, path).nullTypedMembers.filter(name => NULL_ONLY.includes(name))]));
      const prefixes = Object.fromEntries(
        [...view.modules].filter(([, reading]) => refPrefixes(reading).length > 0).map(([path, reading]) => [path, refPrefixes(reading)]),
      );
      const typedPrefixes = Object.values(prefixes)
        .flat()
        .filter(prefix => IDENTITY_WORDS.test(prefix));
      const outside = [...view.modules]
        .filter(([path]) => !view.readers.includes(path))
        .flatMap(([path, reading]) => [
          ...wholeWordHits(path, reading, VOCABULARY.aFamily, A_WORD),
          ...reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name) && /^(?:graph|bundle|render|transaction)/.test(name)).map(name => `${path}: identifier ${name}`),
        ]);
      const shippedSpelled = ROSTER.shippedReads.every(name => view.readers.some(path => (table[path] ?? []).includes(name)));
      expect(modulesFloorMet, `modules: src ${below(tree, "src")}, qa ${below(tree, "qa")}, examples ${below(tree, "examples")}`).toBe(true);
      expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable directory").toStrictEqual({ symlinks: [], unreadable: [] });
      // wb-mzoc F1: the walked set is held to listings outside this census, not to count floors alone (H05+P05).
      expect(walk.unwalked, "modules Git lists below the walk roots that the walk did not read").toEqual([]);
      expect(walk.unlisted, "modules the walk read that Git does not list").toEqual([]);
      expect(walk.outsideRoots, "the roots of the modules Git lists outside the walk roots: the unjudged roots only").toEqual([...UNJUDGED_ROOTS]);
      expect(walk.programUnwalked, `root files of the ${PROGRAM_CONFIG} program the walk did not read`).toEqual([]);
      // wb-mzoc U1 and U2: what A1 reads - its view's keys, each module's parsed text and reading, and the readers list - is held
      // to the anchored walk; every other tree judge holds its own view to this one (heldToA1, and the record).
      expect([...view.modules.keys()], "the judged map's keys in A1's view: exactly the walked modules, in walk order").toEqual(tree.walk.modules);
      expect(judged.misread, "judged modules parsed from a text other than the listed file's own bytes (git hash-object)").toEqual([]);
      expect(judged.reread, "judged modules whose reading is not the compiler's own reading of the listed file").toEqual([]);
      expect(judged.readers, "judged modules whose READER standing in the view is not their own compiler reading's").toEqual([]);
      // wb-yvoa F1: each guard swept over every module of A1's view and every reading field, alone and at once, so a guard
      // blind to a reading field or below a directory reds here, with or without the shared-site edit it would hide.
      const sweeps = { walk: walkSweep(tree), anchor: anchorSweep(tree, view, own), digest: digestSweep(view) };
      expect(sweeps, "what each guard does not find, swept over every module of A1's view and every reading field").toStrictEqual({ walk: [], anchor: [], digest: [] });
      expect(view.readers, "the judged modules holding the render command literal").toEqual(["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"]);
      expect(shippedSpelled, `the filing's shipped reads (${ROSTER.shippedReads.join(", ")}) are spelled by a READER`).toBe(true);
      expect(
        Object.values(nullOnly).every(reads => Object.values(reads).every(ratio => ratio.split("/")[0] === ratio.split("/")[1])),
        "every render_id and transaction_id read is a comparison with null",
      ).toBe(true);
      expect(typedPrefixes, "rf reference prefixes naming a render, transaction, session, component or occurrence").toEqual([]);
      expect(outside, "(a)-family identity names spelled outside the READERS").toEqual([]);
      const of = (source: string): string[] => spelled(snippet(asReader(source)), VOCABULARY.readerTable);
      const ratio = (source: string, name: string): string => nullOnlyReads(snippet(asReader(source)))[name] ?? "";
      const outsideOf = (source: string): number => wholeWordHits("c.ts", snippet(source), VOCABULARY.aFamily, A_WORD).length;
      // The judged-reading anchor's own controls (wb-mzoc U1 and U2): a constructed one-module tree (the runtime module, or the
      // first READER) whose view lacks it, holds a reading of other text or with one field altered, or misstates its READER -
      // a reader left out, a non-reader listed, or a reader whose view reading lost the literal (the anchor reads the
      // compiler's own reading, never the view's).
      const runtimeReading = readingOf(view, RUNTIME);
      const readerPath = view.readers[0] ?? RUNTIME;
      const anchorOf = (modules: Map<string, ModuleReading>, readers: string[] = [], path = RUNTIME): JudgedAnchor =>
        judgedAnchor({ ...tree, walk: { ...tree.walk, modules: [path] } }, { modules, readers });
      // The view's own controls (wb-mzoc U2; wb-yvoa F3 states what they move): its digest moves with one key set (viewKeys: the
      // runtime module against none), one blob id (viewBlob), one reading field (viewReading: the identifiers) and one readers
      // list (viewReaders) - every module's key, reading fields and readers entry are digestSweep's, above - its clone stays as
      // taken when the tree it was taken from changes in place, and a recorded digest refuses replacement and deletion.
      const runtimeView: JudgedView = { modules: new Map([[RUNTIME, runtimeReading]]), readers: [] };
      const differs = (other: JudgedView): number => Number(viewDigest(other) !== viewDigest(runtimeView));
      const detached = (): number => {
        const source = { modules: new Map(runtimeView.modules), readers: [] };
        const taken = viewOf(source);
        source.modules.delete(RUNTIME);
        return Number(taken.modules.has(RUNTIME));
      };
      const readOnly = (): number => {
        const store: { [pin: string]: string } = {};
        recordOnce(store, "A1", "anchored");
        return Number(!Reflect.set(store, "A1", "replaced") && !Reflect.deleteProperty(store, "A1") && store.A1 === "anchored");
      };
      // R-PIN-LOCAL (wb-mzoc cut #3): a constructed judge over a view holding one (a)-family module below src/workflow - one
      // deleting the module from its own view (seen), one filtering it in its case, one through a narrowed helper (unseen).
      const plant = "src/workflow/plant.ts";
      const plantView: JudgedView = { modules: new Map([[plant, snippet("const digest = record.graph_revision_id;\n")]]), readers: [] };
      const hits = (path: string, reading: ModuleReading): string[] => wholeWordHits(path, reading, VOCABULARY.aFamily, A_WORD);
      const narrowedHits = (path: string, reading: ModuleReading): string[] => (path.startsWith("src/workflow/") ? [] : hits(path, reading));
      // The walk anchor's controls (wb-mzoc F1 and cut #3): the walk, Git's listing and the program reshaped on a copy.
      const walked = tree.walk.modules;
      const reshaped = (modules: readonly string[], listing: readonly string[], program: readonly string[]): Pick<TreeReading, "walk" | "listing" | "program"> => ({
        walk: { ...tree.walk, modules: [...modules] },
        listing: [...listing],
        program: [...program],
      });
      const drop = (paths: readonly string[], path: string): string[] => paths.filter(entry => entry !== path);
      const firstBelow = (root: string): string => walked.find(path => rootOf(path) === root) ?? `${root}/`;
      const qaModule = firstBelow("qa");
      const examplesModule = firstBelow("examples");
      const srcModule = tree.program[0] ?? "src/";
      const unrooted = walked.filter(path => rootOf(path) !== "qa");
      // The sweeps' own controls (wb-yvoa F1): each sweep, run against a partial guard - the gate's measured shapes, constructed -
      // finds it, and run against a guard partial only when two or more but not all of its modules are off finds nothing
      // (R-GUARD-CONDITIONED). Each control sweeps a sample of A1's view - the modules below RUNTIME's directory, the READERS
      // and the first module of each walk root - and the walk controls a sample walk of the same modules, Git's listing and the
      // program held to them (a root without a sampled module would read as unjudged to the root check whatever the guard).
      const directory = RUNTIME.slice(0, RUNTIME.lastIndexOf("/") + 1);
      const inDirectory = (path: string): boolean => path.startsWith(directory);
      const outsideDirectory = (paths: readonly string[]): string[] => paths.filter(path => !inDirectory(path));
      const someOff = (paths: readonly string[], all: number): string[] => (paths.length > 1 && paths.length < all ? outsideDirectory(paths) : [...paths]);
      const samplePaths = [...view.modules.keys()].filter(path => inDirectory(path) || view.readers.includes(path) || WALK_ROOTS.some(root => path === firstBelow(root)));
      const sample: JudgedView = { modules: new Map(samplePaths.map(path => [path, readingOf(view, path)])), readers: [...view.readers] };
      const sampleTree = { ...tree, walk: { ...tree.walk, modules: samplePaths } };
      const sampleWalk = {
        walk: { ...tree.walk, modules: samplePaths },
        listing: tree.listing.filter(path => !compilerModule(path) || !WALK_ROOTS.includes(rootOf(path)) || samplePaths.includes(path)),
        program: tree.program.filter(path => samplePaths.includes(path)),
      };
      const fieldBlind =
        (change: (reading: ModuleReading) => ModuleReading): DigestGuard =>
        seen =>
          viewDigest({ modules: new Map([...seen.modules].map(([path, reading]) => [path, change(reading)])), readers: seen.readers });
      const directoryBlind: DigestGuard = seen => viewDigest({ modules: new Map([...seen.modules].filter(([path]) => !inDirectory(path))), readers: seen.readers });
      const anchorNarrowed =
        (narrow: (paths: readonly string[], all: number) => string[]): AnchorGuard =>
        (on, seen, readings) => {
          const found = judgedAnchor(on, seen, readings);
          const all = on.walk.modules.length;
          return { unjudged: narrow(found.unjudged, all), misread: narrow(found.misread, all), reread: narrow(found.reread, all), readers: narrow(found.readers, all) };
        };
      const identifiersOnly: AnchorGuard = (on, seen, readings) => ({
        ...judgedAnchor(on, seen, readings),
        reread: [...seen.modules].filter(([path, reading]) => JSON.stringify(reading.identifiers) !== JSON.stringify(readings.get(path)?.identifiers)).map(([path]) => path),
      });
      const walkNarrowedBy =
        (narrow: (paths: readonly string[], all: number) => string[]): WalkGuard =>
        (on, roots = WALK_ROOTS) => {
          const found = walkAnchor(on, roots);
          const listedIn = on.listing.filter(path => compilerModule(path) && roots.includes(rootOf(path))).length;
          return { ...found, unwalked: narrow(found.unwalked, listedIn), unlisted: narrow(found.unlisted, on.walk.modules.length), programUnwalked: narrow(found.programUnwalked, on.program.length) };
        };
      expect(walkFinds(walkAnchor(sampleWalk)), "the sample walk, its listing and its program agree").toBe(0);
      const finds = (unfound: readonly string[]): number => Number(unfound.length > 0);
      // R-GUARD-CONDITIONED's own blind positives (wb-ahgz; the wb-iy1n gate's F3: the quiet rows swept the conditioned guards
      // and only their unconditioned forms carried positives, so a conditioned guard made honest read its quiet row vacuously):
      // each conditioned guard misses RUNTIME where the honest guard finds it - the digest gives the sample and the sample
      // without RUNTIME's directory one digest, and the judged anchor and the walk anchor leave RUNTIME out of what a judged map
      // and a walk lacking RUNTIME and the first READER miss (conditionedBlind). Each quiet row sweeps the same binding.
      const conditionedDigest: DigestGuard = seen => (seen.modules.size > 1 ? directoryBlind(seen) : viewDigest(seen));
      const conditionedAnchor = anchorNarrowed(someOff);
      const conditionedWalk = walkNarrowedBy(someOff);
      const outsideSample: JudgedView = { modules: new Map([...sample.modules].filter(([path]) => !inDirectory(path))), readers: sample.readers };
      const lacking = (path: string): boolean => path === RUNTIME || path === readerPath;
      const lackingView: JudgedView = { modules: new Map([...sample.modules].filter(([path]) => !lacking(path))), readers: sample.readers };
      const lackingWalk = { ...sampleWalk, walk: { ...sampleWalk.walk, modules: samplePaths.filter(path => !lacking(path)) } };
      const conditionedBlind = {
        digest: conditionedDigest(outsideSample) === conditionedDigest(sample) && viewDigest(outsideSample) !== viewDigest(sample),
        anchor: !conditionedAnchor(sampleTree, lackingView, own).unjudged.includes(RUNTIME) && judgedAnchor(sampleTree, lackingView, own).unjudged.includes(RUNTIME),
        walk: !conditionedWalk(lackingWalk).unwalked.includes(RUNTIME) && walkAnchor(lackingWalk).unwalked.includes(RUNTIME),
      };
      // R-ANCHOR-SOURCE (wb-yvoa): the judged anchor fed the shared site's altered reading as its own second read, or a reading's
      // own blob id as Git's, finds nothing - beside alteredReading and otherText, where the real sources find them.
      const sharedReading = new Map([[RUNTIME, { ...runtimeReading, identifiers: [] }]]);
      // wb-iy1n F1 (the gate's L1 and L2): a digest and a judged anchor reading each list's cardinality only - every entry
      // blanked, its length, the counts and the blob id kept - move with every appending alteration, so only the sweeps'
      // same-cardinality substitutions find them (digestCardinalityOnly, anchorCardinalityOnly).
      const cardinalities = (reading: ModuleReading): ModuleReading => ({
        ...reading,
        identifiers: reading.identifiers.map(() => ""),
        literals: reading.literals.map(() => ""),
        regexes: reading.regexes.map(() => ""),
        reads: reading.reads.map((): KeyRead => ({ name: "", nullCompared: false })),
        members: reading.members.map(() => ""),
        nullTypedMembers: reading.nullTypedMembers.map(() => ""),
        textReads: reading.textReads.map((): TextRead => ({ object: "", use: "other" })),
      });
      const rereadBy =
        (part: (reading: ModuleReading) => ModuleReading): AnchorGuard =>
        (on, seen, readings) => ({
          ...judgedAnchor(on, seen, readings),
          reread: [...seen.modules]
            .filter(([path, reading]) => {
              const read = readings.get(path);
              return read === undefined || JSON.stringify(part(reading)) !== JSON.stringify(part(read));
            })
            .map(([path]) => path),
        });
      const onRuntime = { ...tree, walk: { ...tree.walk, modules: [RUNTIME] } };
      const onPlant = { ...tree, walk: { ...tree.walk, modules: [plant] } };
      const viewOfOne = (path: string, reading: ModuleReading): JudgedView => ({ modules: new Map([[path, reading]]), readers: [] });
      // R-GUARD-CONTENT (wb-iy1n F1, the gate's L3 and L4): a guard dropping the entries or paths that spell one word no module
      // holds and no sweep writes - the render prefix, a (b)-family name, the plant's path - reads every sweep honest, and is
      // blind to its plant (contentBlind; one scalar blind positive per guard, wb-ahgz F2).
      const prefixDropped = fieldBlind(reading => ({ ...reading, literals: reading.literals.filter(value => !value.includes(RENDER_PREFIX)) }));
      const bFamilyDropped = rereadBy(reading => ({ ...reading, literals: reading.literals.filter(value => !B_WORD.test(value)) }));
      const plantDropped = walkNarrowedBy(paths => paths.filter(path => path !== plant));
      const withLiteral = (reading: ModuleReading, value: string): ModuleReading => ({ ...reading, literals: [...reading.literals, value] });
      const contentBlind = {
        digest: prefixDropped(viewOfOne(RUNTIME, withLiteral(runtimeReading, RENDER_PREFIX))) === prefixDropped(runtimeView),
        anchor: bFamilyDropped(onRuntime, viewOfOne(RUNTIME, withLiteral(runtimeReading, "result.blocks[0].candidate_key")), own).reread.length === 0,
        walk: walkFinds(plantDropped(reshaped(walked, [...tree.listing, plant], tree.program))) === 0,
      };
      // R-GUARD-ENTRY (wb-iy1n): a guard blind to an entry no sweep alters alone - every entry past a list's first, or one part
      // of an entry (a text read's use, a read's null comparison) - reads every sweep honest, and is blind to its plant
      // (entryBlind; one scalar blind positive per guard, wb-ahgz F2).
      const firstEntries = (reading: ModuleReading): ModuleReading => {
        const blank = cardinalities(reading);
        const first = <Entry>(values: readonly Entry[], blanked: readonly Entry[]): Entry[] => [...values.slice(0, 1), ...blanked.slice(1)];
        return {
          ...reading,
          identifiers: first(reading.identifiers, blank.identifiers),
          literals: first(reading.literals, blank.literals),
          regexes: first(reading.regexes, blank.regexes),
          reads: first(reading.reads, blank.reads),
          members: first(reading.members, blank.members),
          nullTypedMembers: first(reading.nullTypedMembers, blank.nullTypedMembers),
          textReads: first(reading.textReads, blank.textReads),
        };
      };
      const useBlind = fieldBlind(reading => ({ ...reading, textReads: reading.textReads.map((read): TextRead => ({ object: read.object, use: "other" })) }));
      const nullBlind = rereadBy(reading => ({ ...reading, reads: reading.reads.map((read): KeyRead => ({ name: read.name, nullCompared: false })) }));
      const lastReplaced: ModuleReading = { ...runtimeReading, literals: [...runtimeReading.literals.slice(0, -1), ALTERED] };
      const textSnippet = snippet("const parts = output.text.split(marker);\n");
      const nullSnippet = snippet("if (result.render_id !== null) throw refused();\n");
      const entryBlind = {
        digestEntry: fieldBlind(firstEntries)(viewOfOne(RUNTIME, lastReplaced)) === fieldBlind(firstEntries)(runtimeView),
        anchorEntry: rereadBy(firstEntries)(onRuntime, viewOfOne(RUNTIME, lastReplaced), own).reread.length === 0,
        digestPart:
          useBlind(viewOfOne(plant, { ...textSnippet, textReads: textSnippet.textReads.map((read): TextRead => ({ ...read, use: "typeof" })) })) === useBlind(viewOfOne(plant, textSnippet)),
        anchorPart:
          nullBlind(onPlant, viewOfOne(plant, { ...nullSnippet, reads: nullSnippet.reads.map((read): KeyRead => ({ ...read, nullCompared: !read.nullCompared })) }), new Map([[plant, nullSnippet]])).reread
            .length === 0,
      };
      // R-GUARD-TIMED (wb-iy1n F1, the gate's L6): a guard honest only while its sweep runs - partial below RUNTIME's directory
      // outside it, as the rebinding of JSON.stringify at the shared site's second call made the view digest for every later
      // judge - reads every sweep honest, and outside the sweep is blind (timedBlindness; one scalar blind positive per guard).
      let sweeping = false;
      const whileSwept = (sweep: () => string[]): string[] => {
        sweeping = true;
        try {
          return sweep();
        } finally {
          sweeping = false;
        }
      };
      const timedDigest: DigestGuard = seen => (sweeping ? viewDigest(seen) : directoryBlind(seen));
      const timedAnchor: AnchorGuard = (on, seen, readings) => (sweeping ? judgedAnchor(on, seen, readings) : anchorNarrowed(outsideDirectory)(on, seen, readings));
      const timedWalk: WalkGuard = (on, roots) => (sweeping ? walkAnchor(on, roots) : walkNarrowedBy(outsideDirectory)(on, roots));
      const timedBlindness = {
        digest: timedDigest({ modules: new Map([...sample.modules].filter(([path]) => !inDirectory(path))), readers: sample.readers }) === timedDigest(sample),
        anchor: timedAnchor(onRuntime, { modules: new Map(), readers: [] }, own).unjudged.length === 0,
        walk: walkFinds(timedWalk(reshaped(drop(walked, RUNTIME), tree.listing, tree.program))) === 0,
      };
      // R-GUARD-MARKER (wb-ahgz F1, the wb-iy1n gate's G6-4, H6-DIGEST-SWEEP-KEYED): a digest and a reread reading each list
      // entry only as whether it spells ALTERED, every count and the blob id kept, move with every alteration (an appended
      // ALTERED) and every substitution (a first entry made ALTERED), so they read every sweep honest. The marker points
      // (wb-ahgz U1): RUNTIME's first literal swapped, its list's length kept, for each of the two swap values - the render
      // prefix and the literal's same-length complement (each UTF-16 unit x written as y and every other unit as x) - in two
      // views: RUNTIME's one-module view (no readers entry) and the full view A1 holds (every walked module and the readers
      // list, the view each tree judge records). markerBlind holds the marker-keyed digest and reread blind at every point of
      // the one-module view and the live view digest and judged anchor seeing every point of both views, and nowhere else.
      const marked = (value: string): string => (value.includes(ALTERED) ? ALTERED : "");
      const markerKeyed = (reading: ModuleReading): ModuleReading => ({
        ...reading,
        identifiers: reading.identifiers.map(marked),
        literals: reading.literals.map(marked),
        regexes: reading.regexes.map(marked),
        reads: reading.reads.map((read): KeyRead => ({ name: marked(read.name), nullCompared: false })),
        members: reading.members.map(marked),
        nullTypedMembers: reading.nullTypedMembers.map(marked),
        textReads: reading.textReads.map((read): TextRead => ({ object: marked(read.object), use: "other" })),
      });
      const markerDigest = fieldBlind(markerKeyed);
      const markerReread = rereadBy(markerKeyed);
      const complement = (value: string): string =>
        value
          .split("")
          .map(unit => (unit === "x" ? "y" : "x"))
          .join("");
      const swapValues = [RENDER_PREFIX, complement(runtimeReading.literals[0] ?? "")];
      const literalSwapped = (reading: ModuleReading, value: string): ModuleReading => ({ ...reading, literals: [value, ...reading.literals.slice(1)] });
      const runtimeSwapped = (value: string): JudgedView => viewOfOne(RUNTIME, literalSwapped(runtimeReading, value));
      const swappedIn = (seen: JudgedView, path: string, value: string): JudgedView => ({
        modules: new Map([...seen.modules].map(([key, reading]) => [key, key === path ? literalSwapped(reading, value) : reading])),
        readers: [...seen.readers],
      });
      const fullDigest = viewDigest(view);
      const markerBlind = {
        digest: swapValues.every(
          value =>
            markerDigest(runtimeSwapped(value)) === markerDigest(runtimeView) &&
            viewDigest(runtimeSwapped(value)) !== viewDigest(runtimeView) &&
            viewDigest(swappedIn(view, RUNTIME, value)) !== fullDigest,
        ),
        anchor: swapValues.every(
          value =>
            markerReread(onRuntime, runtimeSwapped(value), own).reread.length === 0 &&
            judgedAnchor(onRuntime, runtimeSwapped(value), own).reread.includes(RUNTIME) &&
            judgedAnchor(tree, swappedIn(view, RUNTIME, value), own).reread.includes(RUNTIME),
        ),
      };
      // The members R-GUARD-MARKER names beyond the marker points (wb-ahgz U1): each a constructed digest and reread, keyed on
      // ALTERED where its member says, with its quiet rows (each sweep, run against it, finds nothing) and its own blind
      // positives at one point of its own, where the module's reading changes and the member's guard misses the change - the
      // change read from the reading's JSON, not from the live view digest or judged anchor: a list field other than literals
      // (the identifiers; RUNTIME's first identifier swapped for the render prefix), the modules other than RUNTIME (the first
      // READER's first literal swapped for the render prefix), RUNTIME's literals on views of two or more modules smaller than
      // the full view (RUNTIME's first literal swapped for the render prefix in the sample view), and every entry but those
      // spelling a swap value (RUNTIME's first literal swapped for otherSwap, a value outside the swap set).
      const keyedWhere = (keyed: (path: string, seen: JudgedView) => (reading: ModuleReading) => ModuleReading): { digest: DigestGuard; anchor: AnchorGuard } => ({
        digest: seen => viewDigest({ modules: new Map([...seen.modules].map(([path, reading]) => [path, keyed(path, seen)(reading)])), readers: seen.readers }),
        anchor: (on, seen, readings) => ({
          ...judgedAnchor(on, seen, readings),
          reread: [...seen.modules]
            .filter(([path, reading]) => {
              const read = readings.get(path);
              return read === undefined || JSON.stringify(keyed(path, seen)(reading)) !== JSON.stringify(keyed(path, seen)(read));
            })
            .map(([path]) => path),
        }),
      });
      const asRead = (reading: ModuleReading): ModuleReading => reading;
      const spellsSwap = (value: string): boolean => swapValues.some(swap => value.includes(swap));
      const exemptMarked = (value: string): string => (spellsSwap(value) ? value : marked(value));
      const exemptKeyed = (reading: ModuleReading): ModuleReading => ({
        ...reading,
        identifiers: reading.identifiers.map(exemptMarked),
        literals: reading.literals.map(exemptMarked),
        regexes: reading.regexes.map(exemptMarked),
        reads: reading.reads.map((read): KeyRead => (spellsSwap(read.name) ? read : { name: marked(read.name), nullCompared: false })),
        members: reading.members.map(exemptMarked),
        nullTypedMembers: reading.nullTypedMembers.map(exemptMarked),
        textReads: reading.textReads.map((read): TextRead => (spellsSwap(read.object) ? read : { object: marked(read.object), use: "other" })),
      });
      const markerMembers = {
        field: keyedWhere(() => reading => ({ ...reading, identifiers: reading.identifiers.map(marked) })),
        others: keyedWhere(path => (path === RUNTIME ? asRead : markerKeyed)),
        shaped: keyedWhere((path, seen) =>
          path === RUNTIME && seen.modules.size > 1 && seen.modules.size < view.modules.size ? reading => ({ ...reading, literals: reading.literals.map(marked) }) : asRead,
        ),
        exempt: keyedWhere(() => exemptKeyed),
      };
      const otherSwap = "wb-ahgz-other";
      const onReader = { ...tree, walk: { ...tree.walk, modules: [readerPath] } };
      const readerView = viewOfOne(readerPath, readingOf(view, readerPath));
      const identifierSwapped = viewOfOne(RUNTIME, { ...runtimeReading, identifiers: [RENDER_PREFIX, ...runtimeReading.identifiers.slice(1)] });
      const memberPoints: { [Member in keyof typeof markerMembers]: { on: Pick<TreeReading, "walk" | "blobs">; path: string; from: JudgedView; to: JudgedView } } = {
        field: { on: onRuntime, path: RUNTIME, from: runtimeView, to: identifierSwapped },
        others: { on: onReader, path: readerPath, from: readerView, to: swappedIn(readerView, readerPath, RENDER_PREFIX) },
        shaped: { on: sampleTree, path: RUNTIME, from: sample, to: swappedIn(sample, RUNTIME, RENDER_PREFIX) },
        exempt: { on: onRuntime, path: RUNTIME, from: runtimeView, to: runtimeSwapped(otherSwap) },
      };
      const memberBlind = (member: keyof typeof markerMembers): { digest: number; anchor: number } => {
        const guard = markerMembers[member];
        const point = memberPoints[member];
        const moved = JSON.stringify(readingOf(point.to, point.path)) !== JSON.stringify(readingOf(point.from, point.path));
        return {
          digest: Number(moved && guard.digest(point.to) === guard.digest(point.from)),
          anchor: Number(moved && !guard.anchor(point.on, point.to, own).reread.includes(point.path)),
        };
      };
      const fieldBlindness = memberBlind("field");
      const othersBlindness = memberBlind("others");
      const shapedBlindness = memberBlind("shaped");
      const exemptBlindness = memberBlind("exempt");
      const controls = {
        propertyRead: ratio("const id = result.render_id;\n", "render_id"),
        nullCompare: ratio("if (result.render_id !== null) throw refused();\n", "render_id"),
        parenthesizedNullCompare: ratio("if ((result.transaction_id) === null) admit();\n", "transaction_id"),
        elementAccess: ratio('const id = result["render_id"];\n', "render_id"),
        destructure: ratio("const { render_id } = result;\n", "render_id"),
        sessionRead: of("const session = result.session_id;\n"),
        workspaceIdRead: of("const id = source.workspace.id;\n"),
        keyList: of('const KEYS = ["operation_id", "transaction_id"];\n'),
        outsideReaders: outsideOf("const digest = record.graph_revision_id;\n"),
        outsideMessage: outsideOf('throw new Error("bundle_revision_id must be a digest");\n'),
        composedName: outsideOf('const key = ["render", "id"].join("_");\nconst id = result[key];\n'),
        comment: outsideOf("// result.render_id\nexport {};\n"),
        camelNamesake: outsideOf("const sessionId = frame.sessionId;\nconst operationId = run.operationId;\n"),
        renderPrefix: refPrefixes(snippet(`const ref = \`rf-render:${"$"}{id}\`;\n`)).filter(prefix => IDENTITY_WORDS.test(prefix)),
        narrowedMap: anchorOf(new Map()).unjudged.length,
        otherText: anchorOf(new Map([[RUNTIME, readModule(scriptKindOf(RUNTIME), "")]])).misread.length,
        alteredReading: anchorOf(new Map([[RUNTIME, { ...runtimeReading, identifiers: [] }]])).reread.length,
        unlistedReader: anchorOf(new Map([[readerPath, readingOf(view, readerPath)]]), [], readerPath).readers.length,
        listedNonReader: anchorOf(new Map([[RUNTIME, runtimeReading]]), [RUNTIME]).readers.length,
        unreadReader: anchorOf(new Map([[readerPath, runtimeReading]]), [], readerPath).readers.length,
        viewKeys: differs({ modules: new Map(), readers: [] }),
        viewBlob: differs({ modules: new Map([[RUNTIME, { ...runtimeReading, textBlob: gitBlobOf("") }]]), readers: [] }),
        viewReading: differs({ modules: new Map([[RUNTIME, { ...runtimeReading, identifiers: [] }]]), readers: [] }),
        viewReaders: differs({ modules: runtimeView.modules, readers: [RUNTIME] }),
        viewDetached: detached(),
        recordReadOnly: readOnly(),
        viewNarrowedInPlace: guardReads(plantView, seen => {
          seen.modules.delete(plant);
          return [...seen.modules].flatMap(([path, reading]) => hits(path, reading));
        }),
        caseNarrowed: guardReads(plantView, seen => [...seen.modules].filter(([path]) => !path.startsWith("src/workflow/")).flatMap(([path, reading]) => hits(path, reading))),
        helperNarrowed: guardReads(plantView, seen => [...seen.modules].flatMap(([path, reading]) => narrowedHits(path, reading))),
        walkNarrowed: walkFinds(walkAnchor(reshaped(drop(walked, qaModule), tree.listing, tree.program))),
        listingNarrowed: walkFinds(walkAnchor(reshaped(walked, drop(tree.listing, qaModule), tree.program))),
        srcListingNarrowed: walkFinds(walkAnchor(reshaped(drop(walked, srcModule), drop(tree.listing, srcModule), tree.program))),
        newRoot: walkFinds(walkAnchor(reshaped(walked, [...tree.listing, "tools/new-root.ts"], tree.program))),
        rootDropped: walkFinds(walkAnchor(reshaped(unrooted, tree.listing, tree.program))),
        coNarrowedQa: walkFinds(walkAnchor(reshaped(drop(walked, qaModule), drop(tree.listing, qaModule), tree.program))),
        coNarrowedExamples: walkFinds(walkAnchor(reshaped(drop(walked, examplesModule), drop(tree.listing, examplesModule), tree.program))),
        coNarrowedSrc: walkFinds(walkAnchor(reshaped(drop(walked, srcModule), drop(tree.listing, srcModule), drop(tree.program, srcModule)))),
        rootMoved: walkFinds(
          walkAnchor(
            reshaped(unrooted, tree.listing, tree.program),
            WALK_ROOTS.filter(root => root !== "qa"),
          ),
          [...UNJUDGED_ROOTS, "qa"].sort(),
        ),
        digestMembersBlind: finds(digestSweep(sample, fieldBlind(reading => ({ ...reading, members: [] })))),
        digestLiteralsBlind: finds(digestSweep(sample, fieldBlind(reading => ({ ...reading, literals: [] })))),
        digestDirectoryBlind: finds(digestSweep(sample, directoryBlind)),
        digestConditioned: finds(digestSweep(sample, conditionedDigest)),
        anchorIdentifiersOnly: finds(anchorSweep(sampleTree, sample, own, identifiersOnly)),
        anchorDirectoryBlind: finds(anchorSweep(sampleTree, sample, own, anchorNarrowed(outsideDirectory))),
        anchorConditioned: finds(anchorSweep(sampleTree, sample, own, conditionedAnchor)),
        walkDirectoryBlind: finds(walkSweep(sampleWalk, walkNarrowedBy(outsideDirectory))),
        walkConditioned: finds(walkSweep(sampleWalk, conditionedWalk)),
        digestConditionedBlind: Number(conditionedBlind.digest),
        anchorConditionedBlind: Number(conditionedBlind.anchor),
        walkConditionedBlind: Number(conditionedBlind.walk),
        sourceReread: judgedAnchor({ ...tree, walk: { ...tree.walk, modules: [RUNTIME] } }, { modules: sharedReading, readers: [] }, sharedReading).reread.length,
        sourceBlobs: judgedAnchor({ ...tree, walk: { ...tree.walk, modules: [RUNTIME] }, blobs: new Map([[RUNTIME, gitBlobOf("")]]) }, { modules: new Map([[RUNTIME, readModule(scriptKindOf(RUNTIME), "")]]), readers: [] })
          .misread.length,
        digestCardinalityOnly: finds(digestSweep(sample, fieldBlind(cardinalities))),
        anchorCardinalityOnly: finds(anchorSweep(sampleTree, sample, own, rereadBy(cardinalities))),
        digestContentConditioned: finds(digestSweep(sample, prefixDropped)),
        anchorContentConditioned: finds(anchorSweep(sampleTree, sample, own, bFamilyDropped)),
        walkContentConditioned: finds(walkSweep(sampleWalk, plantDropped)),
        digestContentBlind: Number(contentBlind.digest),
        anchorContentBlind: Number(contentBlind.anchor),
        walkContentBlind: Number(contentBlind.walk),
        digestEntryConditioned: finds(digestSweep(sample, fieldBlind(firstEntries))),
        anchorEntryConditioned: finds(anchorSweep(sampleTree, sample, own, rereadBy(firstEntries))),
        digestPartConditioned: finds(digestSweep(sample, useBlind)),
        anchorPartConditioned: finds(anchorSweep(sampleTree, sample, own, nullBlind)),
        digestEntryBlind: Number(entryBlind.digestEntry),
        anchorEntryBlind: Number(entryBlind.anchorEntry),
        digestPartBlind: Number(entryBlind.digestPart),
        anchorPartBlind: Number(entryBlind.anchorPart),
        digestTimed: finds(whileSwept(() => digestSweep(sample, timedDigest))),
        anchorTimed: finds(whileSwept(() => anchorSweep(sampleTree, sample, own, timedAnchor))),
        walkTimed: finds(whileSwept(() => walkSweep(sampleWalk, timedWalk))),
        digestTimedBlind: Number(timedBlindness.digest),
        anchorTimedBlind: Number(timedBlindness.anchor),
        walkTimedBlind: Number(timedBlindness.walk),
        digestMarkerKeyed: finds(digestSweep(sample, markerDigest)),
        anchorMarkerKeyed: finds(anchorSweep(sampleTree, sample, own, markerReread)),
        digestMarkerBlind: Number(markerBlind.digest),
        anchorMarkerBlind: Number(markerBlind.anchor),
        digestMarkerField: finds(digestSweep(sample, markerMembers.field.digest)),
        anchorMarkerField: finds(anchorSweep(sampleTree, sample, own, markerMembers.field.anchor)),
        digestMarkerOthers: finds(digestSweep(sample, markerMembers.others.digest)),
        anchorMarkerOthers: finds(anchorSweep(sampleTree, sample, own, markerMembers.others.anchor)),
        digestMarkerShaped: finds(digestSweep(sample, markerMembers.shaped.digest)),
        anchorMarkerShaped: finds(anchorSweep(sampleTree, sample, own, markerMembers.shaped.anchor)),
        digestMarkerExempt: finds(digestSweep(sample, markerMembers.exempt.digest)),
        anchorMarkerExempt: finds(anchorSweep(sampleTree, sample, own, markerMembers.exempt.anchor)),
        digestMarkerFieldBlind: fieldBlindness.digest,
        anchorMarkerFieldBlind: fieldBlindness.anchor,
        digestMarkerOthersBlind: othersBlindness.digest,
        anchorMarkerOthersBlind: othersBlindness.anchor,
        digestMarkerShapedBlind: shapedBlindness.digest,
        anchorMarkerShapedBlind: shapedBlindness.anchor,
        digestMarkerExemptBlind: exemptBlindness.digest,
        anchorMarkerExemptBlind: exemptBlindness.anchor,
      };
      return done("A1", { modulesFloorMet, walk: json(walk), judged: json(judged), sweeps, readers: [...view.readers], table, nullOnly, nullTyped, prefixes, typedPrefixes, outside, shippedSpelled, controls });
    } finally {
      recordOnce(VIEWS, "A1", viewDigest(view));
    }
  },
  A2: () => {
    const names = ["OPERATION", "WORKSPACE", "GRAPH", "BUNDLE", "ROOT"];
    const stated = previewReading();
    const absent = previewReading(result => {
      Reflect.deleteProperty(result, "bundle_revision_id");
    });
    const slots = (reading: JsonValue): { topology: { [name: string]: string[] }; evidence: { [name: string]: string[] } } => ({
      topology: slotMap(topologyOf(reading), names),
      evidence: slotMap(nativeEvidence(CAPABILITY, reading), names),
    });
    const withBundle = slots(stated);
    const withoutBundle = slots(absent);
    const statedNode = appliedNode(topologyOf(stated));
    const absentNode = appliedNode(topologyOf(absent));
    const cohort = {
      stated: statedNode.sourceVersion,
      absent: absentNode.sourceVersion,
      absentBundleRefs: (absentNode.evidenceRefs as Json[]).filter(ref => typeof ref === "string" && ref.startsWith("rf-bundle:")).length,
    };
    const graphInBundleSlot = [...withoutBundle.topology.GRAPH, ...withBundle.topology.GRAPH].filter(path => path === "snapshots.0.sourceVersion" || path.startsWith("snapshots.0.evidenceRefs.2"));
    expect(withBundle.topology.OPERATION, "the operation id names the preview").toEqual(["snapshots.0.node.title", "snapshots.0.source.id"]);
    expect(withBundle.topology.GRAPH, "the graph digest rides rf-graph: and sourceRevision").toEqual(["snapshots.0.evidenceRefs.0", "snapshots.0.sourceRevision"]);
    expect(withBundle.topology.BUNDLE, "the bundle rides rf-bundle: and sourceVersion").toEqual(["snapshots.0.evidenceRefs.2", "snapshots.0.sourceVersion"]);
    expect(withoutBundle.topology.BUNDLE, "an absent bundle fills no slot").toEqual([]);
    expect(graphInBundleSlot, "the graph digest in a bundle slot").toEqual([]);
    expect(cohort, "the version cohort key is typed bundle-else-graph, and no bundle reference is made of the graph").toStrictEqual({ stated: "BUNDLE", absent: "GRAPH", absentBundleRefs: 0 });
    return done("A2", { withBundle, withoutBundle, cohort, graphInBundleSlot, statedNode: { applied: statedNode.applied, nodes: statedNode.nodes } });
  },
  A3: async () => {
    const committed = previewSource(result => {
      result.ephemeral = false;
      result.render_id = RENDER;
      result.commit_seq = 1;
    });
    const renderStated = previewSource(result => {
      result.render_id = RENDER;
    });
    const transactionStated = previewSource(undefined, source => {
      source.transaction_id = TRANSACTION;
    });
    const control = previewSource();
    const cases = { committed, renderStated, transactionStated, control };
    const reading = (source: JsonObject): JsonValue => ({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source }) as JsonValue;
    const adapter = Object.fromEntries(Object.entries(cases).map(([name, source]) => [name, adapterVerdict(reading(source))]));
    const provider: { [name: string]: string } = {};
    for (const [name, source] of Object.entries(cases)) provider[name] = await providerVerdict(source);
    const topology = json(topologyOf(reading(control)));
    const evidence = json(nativeEvidence(CAPABILITY, reading(control)));
    const typedKeys = [...new Set([...keysOf(topology), ...keysOf(evidence)])].filter(key => /render|transaction/i.test(key)).sort();
    const snapshot = isObject(topology) && Array.isArray(topology.snapshots) && isObject(topology.snapshots[0]) ? topology.snapshots[0] : {};
    const refs = Array.isArray(snapshot.evidenceRefs) ? snapshot.evidenceRefs.filter((ref): ref is string => typeof ref === "string") : [];
    const typedRefs = refs.filter(ref => /render|transaction/i.test(ref.slice(0, ref.indexOf(":") + 1)));
    const naming = { render_id: locations(topology, "render_id"), transaction_id: locations(topology, "transaction_id"), evidence: [...locations(evidence, "render"), ...locations(evidence, "transaction")] };
    const grammars = { render: grammar("render_id").test(RENDER), transaction: grammar("transaction_id").test(TRANSACTION) };
    expect(grammars, "the fixture's render and transaction ids are in the producer grammar").toStrictEqual({ render: true, transaction: true });
    expect(adapter.control, "the control preview is admitted").toBe("admitted");
    expect(provider.control, "the native provider admits the control and carries it verbatim").toBe("admitted verbatim");
    for (const name of ["committed", "renderStated", "transactionStated"]) {
      expect(adapter[name]?.startsWith("validation: "), `the adapter refuses ${name}`).toBe(true);
      expect(provider[name]?.startsWith("transport: "), `the native provider refuses ${name}`).toBe(true);
    }
    expect({ typedKeys, typedRefs }, "no render- or transaction-typed key or reference in an admitted reading").toStrictEqual({ typedKeys: [], typedRefs: [] });
    return done("A3", { adapter, provider, typedKeys, typedRefs, naming, grammars });
  },
  A4: () => {
    const view = viewOf(liveTree());
    const sessionModules = [...view.modules].filter(([, reading]) => spelled(reading, ["session_id"]).includes("session_id")).map(([path]) => path);
    const sessionInReaders = sessionModules.filter(path => view.readers.includes(path));
    const claudeAnchor = sessionModules.includes(CLAUDE_ANCHOR);
    const withSession = previewReading(result => {
      result.session_id = SESSION;
    });
    const withoutSession = previewReading(result => {
      result.session_id = null;
    });
    const session = {
      grammar: grammar("session_id").test(SESSION),
      topologyEqual: JSON.stringify(topologyOf(withSession)) === JSON.stringify(topologyOf(withoutSession)),
      evidenceEqual: JSON.stringify(nativeEvidence(CAPABILITY, withSession)) === JSON.stringify(nativeEvidence(CAPABILITY, withoutSession)),
      surfaced: slotMap([topologyOf(withSession), nativeEvidence(CAPABILITY, withSession)], ["SESSION"]).SESSION ?? [],
    };
    const authorized: ReactiveFiberTopologyContext = { ...HOST, scope: { workspace: PI_ROOT, principal: PRINCIPAL }, authorizedRfRoot: RF_ROOT };
    const workspaces = slotMap(topologyOf(previewReading(undefined, undefined, RF_ROOT), authorized), ["PI_ROOT", "RF_ROOT", "WORKSPACE"]);
    const forgeRef = nativeRefOf(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { operation_id: OPERATION, status: "passed" } }));
    const rfRef = nativeRefOf(nativeEvidence(CAPABILITY, previewReading()));
    const named = (ref: typeof forgeRef): Json => (ref === undefined ? null : json({ ...ref, id: nameOf(ref.id) }));
    const operations = { forge: named(forgeRef), reactivefiber: named(rfRef), sameId: forgeRef?.id === rfRef?.id, distinct: JSON.stringify(forgeRef) !== JSON.stringify(rfRef) };
    expect(sessionInReaders, "READERS spelling session_id").toEqual([]);
    expect(claudeAnchor, `the Claude SDK frames' session_id is read in ${CLAUDE_ANCHOR}, outside the READERS`).toBe(true);
    expect(session, "an rf session id surfaces nowhere and changes nothing").toStrictEqual({ grammar: true, topologyEqual: true, evidenceEqual: true, surfaced: [] });
    expect(workspaces, "Pi's workspace, the authorized rf root and the rf workspace id stay three slots").toStrictEqual({
      PI_ROOT: ["snapshots.0.scope.workspace", "snapshots.0.source.scope"],
      RF_ROOT: [],
      WORKSPACE: ["snapshots.0.evidenceRefs.1"],
    });
    expect({ sameId: operations.sameId, distinct: operations.distinct }, "forge's and rf's operation ids stay provider-qualified").toStrictEqual({ sameId: true, distinct: true });
    const outsideSession = (source: string): number => sessionInReadersOf(snippet(source));
    const controls = {
      readerSession: outsideSession(asReader("const session = result.session_id;\n")),
      sessionOutsideReaders: outsideSession("const session = frame.session_id;\n"),
    };
    // wb-mzoc U2: the view A4 judged, as it stands at the end of its case, is A1's anchored view.
    const viewHeld = heldToA1("A4", view);
    expect(viewHeld, "A4 judged A1's anchored view: the same keys, readings and readers").toBe(true);
    return done("A4", { sessionInReaders, claudeAnchor, session, workspaces, operations, viewHeld, controls });
  },
  B1: () => {
    const view = viewOf(liveTree());
    const hits = [...view.modules].flatMap(([path, reading]) => [
      ...wholeWordHits(path, reading, VOCABULARY.bFamily, B_WORD),
      ...reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name) && !/^(?:graph|bundle|render|transaction)/.test(name)).map(name => `${path}: identifier ${name}`),
    ]);
    const occurrenceInReaders = view.readers.flatMap(path => occurrenceHits(path, readingOf(view, path)));
    const anchored = view.readers.some(path => readingOf(view, path).identifiers.includes("graph_revision_id"));
    expect(VOCABULARY.bFamily, "the (b) family: the filing's names and the measured record identity fields").toEqual(["candidate_key", "component_id", "component_instance_id", "component_revision_id", "occurrence_id"]);
    expect(anchored, "the name reader reads an identity the READERS do spell (graph_revision_id)").toBe(true);
    expect(hits, "rf component, instance, definition-revision, candidate-key or occurrence fields spelled in a judged module").toEqual([]);
    expect(occurrenceInReaders, "the word occurrence in a READER").toEqual([]);
    const spelledField = (source: string): number => {
      const reading = snippet(source);
      return wholeWordHits("c.ts", reading, VOCABULARY.bFamily, B_WORD).length + reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name)).length;
    };
    const controls = {
      propertyAccess: spelledField("const key = block.candidate_key;\n"),
      elementAccess: spelledField('const id = row["component_instance_id"];\n'),
      destructure: spelledField("const { component_revision_id } = row;\n"),
      objectKey: spelledField("const row = { occurrence_id: 2 };\n"),
      pathLiteral: spelledField('const path = "result.blocks[0].component_id";\n'),
      folded: spelledField('const key = "candidate" + "_key";\n'),
      template: spelledField(`const path = \`${"$"}{prefix}.component_id\`;\n`),
      camelCase: spelledField("const id = block.componentInstanceId;\n"),
      composedField: spelledField('const key = row[["component", "id"].join("_")];\n'),
      renamedField: spelledField("const childOf = row.instance;\n"),
      comment: spelledField("// candidate_key and occurrence_id\nexport {};\n"),
      readerOccurrence: occurrenceHits("c.ts", snippet(asReader('const note = "second occurrence";\n'))).length,
      occurrenceOutsideReaders: occurrenceHits("c.ts", snippet('const note = "the first occurrence wins";\n')).length,
      outsideRoots: judgedPath("test/helpers/rf-render-fixture.ts") ? 1 : 0,
    };
    // wb-mzoc U2: the view B1 judged, as it stands at the end of its case, is A1's anchored view.
    const viewHeld = heldToA1("B1", view);
    expect(viewHeld, "B1 judged A1's anchored view: the same keys, readings and readers").toBe(true);
    return done("B1", { bFamily: [...VOCABULARY.bFamily], anchored, hits, occurrenceInReaders, viewHeld, controls });
  },
  B2: () => {
    const plain = previewReading();
    const nested = previewReading(nestedChildRecords);
    const plainTopology = topologyOf(plain);
    const nestedTopology = topologyOf(nested);
    const values = { FIRST_OCCURRENCE, SECOND_OCCURRENCE, CHILD, INSTANCE, REVISION, IDEMPOTENCY, OCCURRENCE_ORDINAL: "::2" };
    const tree = json([nestedTopology, nativeEvidence(CAPABILITY, nested)]);
    const surfaced = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, locations(tree, value)]));
    const grammars = {
      firstIsBare: grammar("candidate_key").exec(FIRST_OCCURRENCE)?.groups?.occurrence ?? "bare",
      secondOrdinal: grammar("candidate_key").exec(SECOND_OCCURRENCE)?.groups?.occurrence ?? "bare",
      instance: grammar("component_instance_id").test(INSTANCE),
      revision: grammar("digest").test(REVISION),
    };
    const slotsEqual = JSON.stringify(identitySlots(plainTopology)) === JSON.stringify(identitySlots(nestedTopology));
    const evidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, plain)) === JSON.stringify(nativeEvidence(CAPABILITY, nested));
    const node = appliedNode(nestedTopology);
    const diffReading = previewReading(undefined, source => {
      source.command = "context.diff";
    });
    const diffVerdict = adapterVerdict(diffReading);
    const diff = { adapter: diffVerdict.slice(0, diffVerdict.indexOf(":")), evidenceKeys: Object.keys(nativeEvidence(CAPABILITY, diffReading)).length };
    expect(grammars, "the C-08 fixture: a bare first occurrence, a second ordinal, an instance and a revision in the producer grammar").toStrictEqual({ firstIsBare: "bare", secondOrdinal: "2", instance: true, revision: true });
    expect(slotsEqual, "the C-08 records change no identity slot of the topology").toBe(true);
    expect(evidenceEqual, "the C-08 records change nothing of the evidence").toBe(true);
    expect(Object.values(surfaced).flat(), "a C-08 value in a projected or evidence string").toEqual([]);
    expect({ nodes: node.nodes, nativeRef: node.nativeRef, sourceVersion: node.sourceVersion }, "the applied node is the operation's, versioned by the bundle").toStrictEqual({
      nodes: 1,
      nativeRef: { provider: "reactivefiber", type: "context-preview", id: OPERATION, scope: ROOT },
      sourceVersion: "BUNDLE",
    });
    expect(diff, "a context.diff reading is refused and projects nothing").toStrictEqual({ adapter: "validation", evidenceKeys: 0 });
    return done("B2", { grammars, slotsEqual, evidenceEqual, surfaced, node: { applied: node.applied, nodes: node.nodes, id: nameOf(node.nativeRef !== null && isObject(node.nativeRef) ? node.nativeRef.id : null), sourceVersion: node.sourceVersion }, diff });
  },
  C1: () => {
    const view = viewOf(liveTree());
    const renderSpellings = Object.fromEntries(
      [...view.modules]
        .map(([path, reading]) => [path, renderSpellingsOf(reading)] as const)
        .filter(([, counts]) => counts.identifiers + counts.literals > 0),
    );
    const renderMembers = [...view.modules].flatMap(([path, reading]) => reading.members.filter(name => RENDER_MEMBERS.includes(name)).map(name => `${path}: ${name}`));
    const runtimeBuildsFromEvidence = readingOf(view, RUNTIME).nativeEvidenceCalls > 0;
    const committed = previewReading(result => {
      result.ephemeral = false;
      result.render_id = RENDER;
      result.commit_seq = 1;
    });
    const evidence = nativeEvidence(CAPABILITY, committed);
    const committedEvidence = {
      equalToPreview: JSON.stringify(evidence) === JSON.stringify(nativeEvidence(CAPABILITY, previewReading())),
      nativeId: nameOf(evidence.nativeId),
      renderSurfaced: locations(json(evidence), RENDER),
      keys: Object.keys(evidence).sort(),
    };
    expect(Object.keys(renderSpellings), "modules spelling render_id: the two READERS that require it null").toEqual(["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"]);
    expect(renderMembers, "a member declaring a render id").toEqual([]);
    expect(runtimeBuildsFromEvidence, `${RUNTIME} builds its node records from nativeEvidence`).toBe(true);
    expect(committedEvidence, "the evidence of a committed render's envelope carries no render id and keeps the operation id").toStrictEqual({
      equalToPreview: true,
      nativeId: "OPERATION",
      renderSurfaced: [],
      keys: ["nativeId", "producerRelease", "provider", "sourceBasis"],
    });
    const members = (source: string): number => snippet(source).members.filter(name => RENDER_MEMBERS.includes(name)).length;
    // wb-yvoa F2: one positive control per RENDER_MEMBERS spelling, render_ref included (referenceMember); the spellings they
    // declare are held to the roster's renderMembers, outside any run-time edit of the constant.
    const positive = {
      interfaceMember: "interface Handoff { render_id: string }\n",
      camelMember: "const handoff = { renderId: id };\n",
      shorthandMember: "const handoff = { renderRef };\n",
      classField: "class Handoff { renderID = id; }\n",
      referenceMember: "interface Handoff { render_ref: string }\n",
    };
    const controlSpellings = [...new Set(Object.values(positive).flatMap(source => snippet(source).members))].sort();
    expect(controlSpellings, "the spellings C1's positive controls declare: every renderMembers spelling of the roster").toEqual([...strings(ROSTER.scan.renderMembers, "scan.renderMembers")].sort());
    const controls = {
      ...Object.fromEntries(Object.entries(positive).map(([name, source]) => [name, members(source)])),
      renamedMember: members("const handoff = { handoffRef: id };\n"),
    };
    // wb-mzoc U2: the view C1 judged, as it stands at the end of its case, is A1's anchored view.
    const viewHeld = heldToA1("C1", view);
    expect(viewHeld, "C1 judged A1's anchored view: the same keys, readings and readers").toBe(true);
    return done("C1", { renderSpellings, renderMembers, runtimeBuildsFromEvidence, committedEvidence, controlSpellings, viewHeld, controls });
  },
  C2: () => {
    const first = previewReading();
    const second = previewReading(undefined, source => {
      source.operation_id = SECOND_OPERATION;
    });
    const ids = [first, second].map(reading => {
      const topology = topologyOf(reading);
      const source = isObject(reading) && isObject(reading.source) ? reading.source : {};
      return {
        envelope: nameOf(source.operation_id),
        snapshot: nameOf(topology.snapshots[0]?.source.id),
        evidence: nameOf(nativeEvidence(CAPABILITY, reading).nativeId),
      };
    });
    const invoked: ReactiveFiberTopologyContext = { ...HOST, invocationId: INVOCATION, operationRef: OPERATION_REF };
    const withProvenance = topologyOf(first, invoked);
    const bare = topologyOf(first);
    const trace = { stated: json(withProvenance.snapshots[0]?.trace ?? null), bareHasTrace: Object.hasOwn(bare.snapshots[0] ?? {}, "trace"), bareRelations: bare.relations.length };
    const relations = withProvenance.relations.map(relation => json({ from: relation.from, to: relation.to, kind: relation.kind, source: relation.provenance.source }));
    const prose = previewReading(withText(`resume from operation ${PROSE_OPERATION} under invocation inv-other-9 (render ${PROSE_RENDER})`));
    const proseDelta = projectionDelta(withProvenance, topologyOf(prose, invoked));
    const proseEvidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, first)) === JSON.stringify(nativeEvidence(CAPABILITY, prose));
    expect(ids, "the operation id is the envelope's, byte for byte, in the snapshot and the evidence").toStrictEqual([
      { envelope: "OPERATION", snapshot: "OPERATION", evidence: "OPERATION" },
      { envelope: "SECOND_OPERATION", snapshot: "SECOND_OPERATION", evidence: "SECOND_OPERATION" },
    ]);
    expect(trace, "the trace is exactly the host's invocation, absent without one").toStrictEqual({ stated: { invocationId: INVOCATION }, bareHasTrace: false, bareRelations: 0 });
    expect(relations, "one grouping edge from exactly the host's operation reference to the preview").toStrictEqual([
      { from: OPERATION_REF, to: { provider: "reactivefiber", type: "context-preview", id: OPERATION, scope: ROOT }, kind: "grouping", source: "reactivefiber" },
    ]);
    expect({ proseDelta, proseEvidenceEqual }, "a document naming another operation and invocation moves only the payload digest").toStrictEqual({ proseDelta: ["nativePayloadRef"], proseEvidenceEqual: true });
    return done("C2", { ids, trace, relations: relations.map(relation => (isObject(relation) ? { ...relation, to: isObject(relation.to) ? { ...relation.to, id: nameOf(relation.to.id) } : null } : null)), proseDelta, proseEvidenceEqual });
  },
  D1: () => {
    const view = viewOf(liveTree());
    const findings = [...view.modules].flatMap(([path, reading]) => renderPatternFindings(path, reading));
    const prefixes = Object.fromEntries([...view.modules].filter(([, reading]) => idPrefixes(reading).length > 0).map(([path, reading]) => [path, idPrefixes(reading)]));
    const outputReads = [...view.modules].flatMap(([path, reading]) => reading.textReads.filter(read => read.object === "output").map(read => `${path} ${read.use}`));
    const textFinds = [...view.modules].flatMap(([path, reading]) => textFindings(path, reading));
    expect(VOCABULARY.prefixes.includes(RENDER_PREFIX), "the producer's prefix table holds the render prefix").toBe(true);
    expect(findings, "a literal or pattern spelling the render prefix, the family grammar or a render-naming pattern").toEqual([]);
    expect(prefixes, "the rf id prefixes spelled in the judged modules: the operation and workspace ids the two READERS validate").toStrictEqual({
      "src/workbench/providers/reactivefiber.ts": ["rfo_", "rfw_"],
      "src/workbench/reactivefiber-observer.ts": ["rfo_", "rfw_"],
    });
    expect(outputReads, "every output.text read in the judged modules (the non-vacuity anchor)").toEqual([
      "src/workbench/providers/reactivefiber.ts typeof",
      "src/workbench/reactivefiber-observer.ts typeof",
      "src/workbench/reactivefiber-observer.ts digest",
    ]);
    expect(textFinds, "rf document text read other than by a typeof or a sha256 digest").toEqual([]);
    const pattern = (source: string): number => renderPatternFindings("c.ts", snippet(source)).length;
    const reader = (source: string): number => textFindings("c.ts", snippet(asReader(source))).length;
    const controls = {
      regexLiteral: pattern("const RENDER = /rfr_[0-9a-z]{22,32}/;\n"),
      regExpCall: pattern('const RENDER = new RegExp("rfr_" + body);\n'),
      prefixTest: pattern('const isRender = id.startsWith("rfr_");\n'),
      familyGrammar: pattern("const ID = /^rf[a-z]_[0-9a-z]+$/;\n"),
      renderPattern: pattern("const found = /render id: (\\S+)/.exec(reply);\n"),
      renderPatternCall: pattern('const found = new RegExp("Render ID: (\\\\S+)").exec(reply);\n'),
      composedPrefix: pattern('const RENDER = new RegExp(["rf", "r_"].join("") + body);\n'),
      comment: pattern("// a render id is rfr_ plus a body\nexport {};\n"),
      validation: idPrefixes(snippet("const OPERATION_ID = /^rfo_[0-9a-z]{22,32}$/;\n")),
      textMatch: reader("const id = output.text.match(/x/);\n"),
      textDigest: reader('const ref = createHash("sha256").update(output.text).digest("hex");\n'),
      aliasOutsideReaders: textFindings("c.ts", snippet("const o = result.output;\nconst parts = o.text.split(marker);\n")).length,
    };
    // wb-mzoc U2: the view D1 judged, as it stands at the end of its case, is A1's anchored view.
    const viewHeld = heldToA1("D1", view);
    expect(viewHeld, "D1 judged A1's anchored view: the same keys, readings and readers").toBe(true);
    return done("D1", { findings, prefixes, outputReads, textFinds, viewHeld, controls });
  },
  D2: () => {
    const prose = [`Handoff note: render_id ${PROSE_RENDER} is the committed render to resume.`, `Resume with render ${PROSE_RENDER} and fiber transaction ${PROSE_RENDER}/tx_3.`].join("\n");
    const plain = previewReading(withText("a plain context document"));
    const naming = previewReading(withText(prose));
    const left = topologyOf(plain);
    const right = topologyOf(naming);
    const delta = projectionDelta(left, right);
    const surfaced = locations(json([right, nativeEvidence(CAPABILITY, naming)]), RENDER_PREFIX);
    const digestOnly = right.snapshots[0]?.nativePayloadRef === `rf-output:sha256:${sha256(prose)}`;
    const evidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, plain)) === JSON.stringify(nativeEvidence(CAPABILITY, naming));
    const grammarMatch = grammar("render_id").test(PROSE_RENDER);
    expect(grammarMatch, "the prose names a render id in the producer grammar").toBe(true);
    expect(delta, "render-id prose moves only the payload digest").toEqual(["nativePayloadRef"]);
    expect(surfaced, "an rfr_ token in the topology or the evidence").toEqual([]);
    expect({ digestOnly, evidenceEqual }, "the payload reference is the digest of exactly the prose, and the evidence is unchanged").toStrictEqual({ digestOnly: true, evidenceEqual: true });
    return done("D2", { grammarMatch, delta, surfaced, digestOnly, evidenceEqual });
  },
});

/** A4's static judge: 1 when a READER spells session_id. */
function sessionInReadersOf(reading: ModuleReading): number {
  return isReader(reading) && spelled(reading, ["session_id"]).includes("session_id") ? 1 : 0;
}
/** B1's reader judge: identifiers or literals of a READER spelling the word occurrence. */
function occurrenceHits(path: string, reading: ModuleReading): string[] {
  if (!isReader(reading)) return [];
  return [...reading.identifiers, ...reading.literals].filter(value => /occurrence/i.test(value)).map(value => `${path}: ${value.slice(0, 60)}`);
}
/** C1's counts for one module: render_id identifiers, and folded literals holding render_id as a whole word. */
function renderSpellingsOf(reading: ModuleReading): { identifiers: number; literals: number } {
  const word = wordIn(["render_id"]);
  return { identifiers: reading.identifiers.filter(name => name === "render_id" || name === "renderId").length, literals: reading.literals.filter(value => word.test(value)).length };
}

/** The module-scope vocabularies, patterns, tables and fixture objects the cases read, and the cases table, by name (wb-yvoa F2;
 * HOST, OPERATION_REF, FIELD_SUBSTITUTIONS, LIST_FIELDS and IMPL wb-iy1n; GUARD_POSITIVES wb-ahgz): each is frozen deep where
 * it is bound; the judged-set case holds each one frozen and the names to the roster's scan.frozen. The run's own records
 * (VIEWS, REACHED, MEASURED, COUNTED, the stub list) are not named: the cases write them. The map itself is frozen shallow, so
 * the check reads each binding's own freeze (a deep freeze here would freeze every member whatever its binding did). */
const FROZEN: Readonly<Record<string, unknown>> = Object.freeze({
  WALK_ROOTS,
  MODULE_EXTENSIONS,
  FLOORS,
  LISTING,
  HASH_OBJECT,
  NON_SCRIPT_FORMS,
  UNJUDGED_ROOTS,
  FAMILY_OF,
  CARRIED,
  PRODUCER_NAMESAKES,
  NULL_ONLY,
  REF_PREFIX,
  IDENTITY_WORDS,
  RENDER_PATTERN,
  QUIET_ROWS,
  ACCEPTED_FORMS,
  GUARD_POSITIVES,
  PIN_HOLLOW_MEMBERS,
  RESIDUAL_FAMILIES,
  TREE_JUDGES,
  RENDER_MEMBERS,
  HOST,
  OPERATION_REF,
  VALUE_NAMES,
  ROWS,
  ROSTER,
  VOCABULARY,
  A_WORD,
  B_WORD,
  PREFIX_WORD,
  COMPILER_FORMS,
  EQUALITY,
  FIELD_ALTERATIONS,
  READING_FIELDS,
  FIELD_SUBSTITUTIONS,
  LIST_FIELDS,
  IMPL,
});

describe("wb-hs2j.7 rf typed identity distinctness census (RF-REACTIVE-CONTEXT-ASSEMBLY-R8)", () => {
  afterEach(() => {
    if (originalPath === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = originalPath;
    removeScratch(...stubs.splice(0));
  });

  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // wb-mzoc U2: TREE_JUDGES is held to the pins whose own case source reads the shared tree, and each of them records the view
    // it read, once (A1 its anchored view through recordOnce, every other one through heldToA1).
    const sources = Object.fromEntries(Object.entries(IMPL).map(([pin, impl]) => [pin, impl.toString()]));
    expect(
      Object.keys(sources).filter(pin => sources[pin]?.includes("liveTree()") === true),
      "the pins whose own case source calls liveTree: exactly TREE_JUDGES, in row order",
    ).toEqual([...TREE_JUDGES]);
    expect(
      TREE_JUDGES.filter(pin => sources[pin]?.includes(pin === "A1" ? 'recordOnce(VIEWS, "A1", viewDigest(view))' : `heldToA1("${pin}", view)`) !== true),
      "tree judges whose case does not record the view it read",
    ).toEqual([]);
    // wb-yvoa F2: every module-scope constant a judge reads is frozen deep, so a run-time edit of one - a splice of
    // RENDER_MEMBERS at the shared site, say - throws where it runs.
    expect(
      Object.keys(FROZEN).filter(name => !frozenDeep(FROZEN[name])),
      "module-scope constants a judge reads that are not frozen deep",
    ).toEqual([]);
    // wb-mzoc F4: this case runs first and reads the task tree as collected, so a records case skipped, set to todo,
    // inverted or deleted reds here, before the records case could have run.
    const registered = registeredTests(task);
    expect(
      registered.map(entry => entry.name),
      "every registered test of this file (vitest task tree), exactly and in roster order, read first",
    ).toEqual([...ROSTER.tests]);
    expect(
      registered.findIndex(entry => entry.self),
      "this case finds itself by task identity, registered first",
    ).toBe(0);
    expect(
      registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`),
      "every registered test, the records case included, is collected in run mode and not inverted",
    ).toEqual([]);
    expect({
      bead: BEAD,
      scan: {
        walkRoots: WALK_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        floors: FLOORS,
        listing: LISTING,
        hashObject: HASH_OBJECT,
        parseName: PARSE_NAME,
        nonScriptForms: NON_SCRIPT_FORMS,
        unjudgedRoots: UNJUDGED_ROOTS,
        programConfig: PROGRAM_CONFIG,
        quietRows: QUIET_ROWS,
        acceptedForms: ACCEPTED_FORMS,
        guardPositives: GUARD_POSITIVES,
        pinHollowMembers: PIN_HOLLOW_MEMBERS,
        treeJudges: TREE_JUDGES,
        readingFields: READING_FIELDS,
        listFields: LIST_FIELDS,
        frozen: Object.keys(FROZEN),
        renderCommand: RENDER_COMMAND,
        capability: CAPABILITY,
        familyOf: FAMILY_OF,
        carried: CARRIED,
        producerNamesakes: PRODUCER_NAMESAKES,
        nullOnly: NULL_ONLY,
        workspaceIdRead: WORKSPACE_ID_READ,
        refPrefix: `${REF_PREFIX.source}/${REF_PREFIX.flags}`,
        identityWords: `${IDENTITY_WORDS.source}/${IDENTITY_WORDS.flags}`,
        renderPattern: `${RENDER_PATTERN.source}/${RENDER_PATTERN.flags}`,
        familyGrammar: FAMILY_GRAMMAR,
        renderPrefix: RENDER_PREFIX,
        renderMembers: RENDER_MEMBERS,
        claudeAnchor: CLAUDE_ANCHOR,
        runtime: RUNTIME,
        aFamily: VOCABULARY.aFamily,
        bFamily: VOCABULARY.bFamily,
        namesakes: VOCABULARY.namesakes,
        readerTable: VOCABULARY.readerTable,
        camelForms: VOCABULARY.camelForms,
        prefixes: VOCABULARY.prefixes,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const posture = /^Not P0: (.+?) \([^)]*\) and (.+?), so /m.exec(bead.notes);
    const source = /^Source: ReactiveFiberCLI (\S+) '([^']+)'/m.exec(bead.notes);
    const merged = /Merged \(rca-handoff-explicit-render-id-never-model-text\) (\S+) '([^']+)'/.exec(bead.notes);
    const shipped = /Shipped: yes \(Pi's own ([a-z_ /]+) reads:/.exec(bead.notes);
    const named = /typed identity vocabulary distinctly \(([^)]+)\)/.exec(ROSTER.statement);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    expect([posture?.[1], posture?.[2]], "the filing's two posture facts are the roster's").toEqual([...ROSTER.posture]);
    const coverageOf = (rows: readonly Row[]): string[][] => [...clauses, ...ROSTER.posture].map(clause => rows.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    const coverage = coverageOf(ROWS);
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and posture fact sits verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"], ["D"], ["A"], ["C"]]);
    // R-PIN-HOLLOW quiet row: the anchor reads row labels only, so one pin removed from every literal leaves its coverage
    // unchanged, while a row removed from every literal changes it (the reading is live).
    const withoutPin = (pin: string): Row[] => ROWS.map(row => ({ ...row, pins: row.pins.filter(item => item !== pin) }));
    const unseen = ROWS.flatMap(row => row.pins).filter(pin => JSON.stringify(coverageOf(withoutPin(pin))) === JSON.stringify(coverage));
    expect(unseen, "R-PIN-HOLLOW: the pins whose removal from every literal the bead-row anchor cannot see").toEqual([...PIN_HOLLOW_MEMBERS]);
    expect(
      ROWS.filter(row => JSON.stringify(coverageOf(ROWS.filter(other => other.id !== row.id))) === JSON.stringify(coverage)).map(row => row.id),
      "rows whose removal from every literal the bead-row anchor cannot see",
    ).toEqual([]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect({ citation: source?.[1], quote: source?.[2], mergedCitation: merged?.[1], mergedQuote: merged?.[2] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedCitation: ROSTER.mergedCitation,
      mergedQuote: ROSTER.mergedQuote,
    });
    expect(shipped?.[1]?.split(" / "), "the filing's shipped reads are the roster's").toEqual([...ROSTER.shippedReads]);
    const quoted = [...ROSTER.quote.matchAll(/`([a-z_]+)`/g)].map(match => match[1]);
    expect(named?.[1]?.split(", "), "the statement's identity names are the roster's").toEqual([...ROSTER.identities]);
    expect(quoted, "the quote's identity names are the roster's").toEqual([...ROSTER.identities]);
    expect(Object.keys(FAMILY_OF), "FAMILY_OF classifies exactly the filing's identity names").toEqual([...ROSTER.identities]);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(ROSTER.producer.occurrenceCitation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the occurrence citation pins the same sha").toBe(true);
    // The residual families' quiet rows (wb-mzoc F3), read after the outside anchor: every control family names one or more,
    // and each names a control of a pin of ROWS.
    expect(
      Object.entries(QUIET_ROWS)
        .filter(([, rows]) => rows.length === 0)
        .map(([family]) => family),
      "a control residual family without a pinned quiet row",
    ).toEqual([]);
    expect(
      [...Object.values(QUIET_ROWS).flat(), ...ACCEPTED_FORMS].filter(entry => !ROWS.some(row => row.pins.includes(entry.slice(0, entry.indexOf("."))))),
      "a quiet row or accepted form naming no pin of ROWS",
    ).toEqual([]);
    // wb-ahgz F2: every guard residual's quiet rows are backed, member by member, by their own guards' scalar blind positives
    // (GUARD_POSITIVES), each a control of the same pin and none a quiet row, an accepted form or another row's positive.
    expect(Object.keys(GUARD_POSITIVES), "the guard residuals whose quiet rows carry blind positives: every R-GUARD family of QUIET_ROWS, in order").toEqual(
      Object.keys(QUIET_ROWS).filter(family => family.startsWith("R-GUARD-")),
    );
    expect(
      Object.entries(GUARD_POSITIVES)
        .filter(([family, pairs]) => JSON.stringify(Object.keys(pairs)) !== JSON.stringify(QUIET_ROWS[family]))
        .map(([family]) => family),
      "a guard residual whose blind positives do not pair its quiet rows member by member, in order",
    ).toEqual([]);
    const guardPairs = Object.values(GUARD_POSITIVES).flatMap(pairs => Object.entries(pairs));
    const pinOfEntry = (entry: string): string => entry.slice(0, entry.indexOf("."));
    expect(
      guardPairs
        .filter(
          ([row, positive], index) =>
            pinOfEntry(positive) !== pinOfEntry(row) ||
            guardPairs.findIndex(([, other]) => other === positive) !== index ||
            [...Object.values(QUIET_ROWS).flat(), ...ACCEPTED_FORMS].includes(positive),
        )
        .map(([row]) => row),
      "a guard quiet row whose blind positive names another pin, repeats another row's, or is itself a quiet row or accepted form",
    ).toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          const controls = controlReadings(pin, witness);
          expect(controls.read, `${pin}: every positive control fires, every quiet row and accepted form stays quiet`).toStrictEqual(controls.expected);
          expect(witness).toStrictEqual(rosterWitness(pin));
          COUNTED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked = registeredTests(task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(COUNTED, "every pin's case compared its witness after its pinned number of assertions, in row order").toEqual([...ROSTER.counted]);
    // The view record's own control (wb-mzoc U2), read after every judge recorded: a constructed empty view, held against a
    // scratch record seeded with A1's digest, is recorded as its own digest and is not A1's, so a record that stores A1's
    // digest, or a hold that always agrees, reds here.
    const empty: JudgedView = { modules: new Map(), readers: [] };
    const scratch: { [pin: string]: string } = { A1: VIEWS.A1 ?? "" };
    const record = { held: heldToA1("control", empty, scratch), recorded: scratch.control === viewDigest(empty), views: Object.hasOwn(VIEWS, "control") };
    expect(record, "a constructed empty view is recorded as its own digest, in its own record, and is not A1's anchored view").toStrictEqual({ held: false, recorded: true, views: false });
    expect(VIEWS, "every tree judge's view at the end of its case is A1's anchored view (wb-mzoc U2): one digest each, all A1's").toStrictEqual(
      Object.fromEntries(TREE_JUDGES.map(pin => [pin, VIEWS.A1])),
    );
  });
});
