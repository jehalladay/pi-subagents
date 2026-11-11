/**
 * wb-4ap.13 (COLLECTIVE-ADAPTATION-R13, program-triage-2026-10-17), the HyperUnix H0/H1 lineage gate census: the STANDING leg.
 *
 * Statement (bead description, verbatim): "When @hyperunix/sdk exposes HyperUnix H0/H1 (HX-C01/C02/C03/C05: typed directional
 * refs produces/consumes/depends/blocks/verifies/related-to and bounded neighborhood/ancestry queries with per-relationship
 * coverage and source revision), the HyperUnix provider shall consume them additively with per-edge coverage preserved and
 * open-world missing edges reported, never collapsing ref meanings or presenting a bounded traversal as complete. Artifact: H0/H1
 * results in a released @hyperunix/sdk (interim contract: RFCLI fixture stand-in)." Acceptance (verbatim, every clause on
 * landing): (1) "On landing: the hyperunix-observer test gains a fixture with typed refs and asserts each relation kind maps to a
 * distinct RelationKind or is counted as unmapped, never merged." (2) "Each edge carries coverage and source revision from the
 * SDK result; a traversal marked bounded yields coverage 'partial' with the remainder counted (open-world rule already pinned at
 * hyperunix-observer.ts:60-65,165-170@9df9a03)." (3) "The find-only path stays byte-identical."
 *
 * MEASURED (read-only, by the cutting seat on trunk f5589e0, 2026-10-28): the gating artifact does not exist. HyperUnix-CLI
 * origin/main ff96c6810e still reads "design only, not implemented" at
 * docs/programs/collective-adaptation-2026-10-16/04-implementation-and-qa.md:3 (H0 typed reference and lineage query fixtures,
 * H1 budgeted neighborhood/ancestry traversal), and its sdk/typescript/src spells no related-to kind. The RFCLI stand-in the
 * statement names (ReactiveFiberCLI BEADS-2026-10-16.md:102@8a8b83e4d, CA-R1-b, tests/fixtures/scg/hx/SCG-FIX-HX-001..007.stdout
 * at origin/main 2ad670a29) is an hx.coverage/v1 path-coverage report (paths with a covered flag and a complete/partial marker):
 * it carries no typed ref, so no interim typed-ref contract exists either. Pi vendors @hyperunix/sdk 0.1.0
 * (vendor/hyperunix-sdk-0.1.0.tgz). Its 27 shipped declaration files spell none of the six kinds as a string literal (only
 * namesakes: the "verified" mutation outcome, the dependents/dependencies reads, ConsumerActiveError, a provider.d.ts comment),
 * and its QueryResult declares the lossless extension sidecar ("Lossless sidecar of negotiated extension frames"). On the
 * provider's own path (resultFromJson, resultToJson, the JSON round trip) an unknown member with an object value survives verbatim
 * at 12 of the 22 object nodes of a full SDK document - the row claim bodies, each certificate's cause, scope, target and body,
 * the incomplete regions and the sidecar -; at evidence.provider_versions only its name survives, its value coerced to a string by
 * String() (a string value survives there verbatim, so a string member is kept at 13 nodes); and it is dropped from the other 9,
 * the records the serializer rebuilds field by field (A2 measures every node for an object and for a string member). So a
 * typed-ref payload, an object, that reached Pi's find path before a released SDK declares it would arrive verbatim inside one
 * of those open containers. Pi reads no constructed lineage record planted in any of them, as B2's one judge reads it (JSON
 * text, held only as row B's CLAIM SCOPE states): for every plant of PLANTS at every object node of every reading, the output of
 * the registered provider registerHyperUnixFind (providers/hyperunix.ts, the injected-reader registration) is judged equal to the
 * census's model of its output for that document (providerShaped: the contract, the SDK codec's own source, workspaceRoot and
 * runtime), and where the codec keeps the record verbatim, equal to its output for the same document without one plus exactly
 * that record at that node (B2; wb-57n1, re-measured on trunk 0b53dcd); the reader adapter reads rows for their count and
 * certificates for their batch ids only, and the native-evidence projection reads the execution id, kind and evidence ids only.
 * A read of a named producer member of an incomplete region (a relayed display facet) stays outside A3's boundary and inside the
 * B rows' byte-identity, which plant this census's own member.
 *
 * Pi consumes no H0/H1 result today. This census pins that standing leg, and the on-landing leg stays owed (NOT CLAIMED below):
 *  A, the gate. A1 the vendored SDK's shipped declarations (every dist .d.ts of the installed package, the version Pi's
 *    package.json pins through the committed tarball) spell none of the six kinds as a whole string literal - a hit is the
 *    gating artifact arriving: re-measure, the on-landing leg is owed; A1c the kind judge flags each kind in every quote, case and
 *    separator spelling and stays quiet on the SDK's own namesakes, each read from its file; A2 the serializer emits exactly its
 *    23 representation members, and of a member planted at every object node of a full SDK document, one node at a time, an object
 *    member survives verbatim exactly at the 12 open containers, by name only at evidence.provider_versions (its value coerced by
 *    String()) and nowhere else (dropped at the other 9, never moved), while a string member survives verbatim at the 12 and at
 *    evidence.provider_versions (measured, pinned); A3 no consumed field (HYPERUNIX_CONSUMED_FIELDS, at least its count at
 *    this cut's base) reads the sidecar, a row body or a certificate's cause, scope, target or body, rows are read for their
 *    count, the two HX modules never spell the sidecar member, and Pi registers hyperunix.find as its only HX read on both
 *    registrations (each named by its own descriptor text), equal to the src reconcile table.
 *  B, acceptance (3) in its standing form. B1 every reading of READINGS (each non-mutation execution kind, both licences where
 *    they differ) carrying each constructed lineage record of PLANTS in the sidecar projects strictEqual and byte-identical to the
 *    same reading without it, under both host contexts, for the reader adapter and the native-evidence projection alike, and no
 *    output string carries a planted sentinel (a sentinel planted in the operation is the control that the detector sees one);
 *    B2 through the registered provider registerHyperUnixFind (a stub reader returning the document), for every reading of
 *    READINGS, every whole-output comparison decided by one judge (judgeWhole: JSON text, its model leg everywhere and its plain
 *    leg where the codec keeps the record) held only as CLAIM SCOPE below states: the plain document's whole output is judged
 *    equal to the census's model of it (providerShaped, the shape B1 and B3 read), and so is the output for every plant of PLANTS
 *    planted at each object node of the reading's document, one plant and one node at a time (all 9 plants at all 301 object
 *    nodes of READINGS, R05's 22 included, each reading's node count re-derived from its JSON text); where the codec keeps the
 *    record verbatim (the 12 open containers of A2 on R05; 161 nodes over READINGS, the same nodes for every plant) the record
 *    arrives verbatim, the whole output is judged equal to the plain output with exactly that record added at that node, and the
 *    projection and native evidence stay strictEqual; and with a plant at every such node of a reading at once, the whole output
 *    is judged the model and the plain output with the record at each of them. B2's witness carries each plant as it arrived (its
 *    members and its edge list's kinds, read back from the provider's output at the plant's first kept node).
 *    CLAIM SCOPE (wb-57n1 respin 2, rule 19(c), ruling R-B146): the judge is held by exactly these controls, each judged moved on
 *    every leg its context judges, in exactly these contexts and in no other. (1) HELD, in every context the judge decides (each
 *    reading's plain output, each plant at each node, each plant at every kept node at once): the context's output with one
 *    member added beside source (at the output's root) and one added inside source at each node the context planted (at source
 *    itself for a plain output); each context held once, under its own name (its reading, its plant and its node, every kept
 *    node at once, or the plain output; a second hold of a name refused); each control counted only when the exactness judge
 *    (movedOnly, wb-pgzz) reads it as the output its hold was handed plus exactly its MOVED member, that judge held by its own
 *    controls alone, on the delivered output for R05 with P9 at rows.0: each of that output's held controls kept, and refused,
 *    each a co-move (the held control with its output also moved by one single edit beside its mark), every EDITS control of
 *    that output marked MOVED at a held control's node, wherever the edit leaves there an object not yet carrying MOVED (each
 *    kind's count held to the output's JSON text, less the candidates that mark that node or remove it), and every COMOVES
 *    control of each held control - FOREIGN, a member named outside the census's namespace, added (set to true) at each object
 *    node as its last member, each string naming one of READINGS' coverages moved to each other one, and each number nudged up by its own magnitude
 *    times Number.EPSILON, Number.MIN_VALUE at zero (each kind's count held to the same text) -, each such co-move read back from
 *    itself (identityOf: its one difference, less its MOVED mark, from the output - the node it moved and how, as JSON text) and
 *    those identities, as one sorted list per kind, held equal to the candidates the output's JSON text names as the platform's
 *    own parser reads it (textEdits less the candidates that mark that node or remove it, for the marked co-moves; textComoves,
 *    for the COMOVES), so a held control co-moved by one of those forms is refused and counts nothing (wb-pgzz respin 1), and a
 *    swap of which node, which coverage or which number a co-move moves, or of which candidates the marked set holds, reds even
 *    where every count is kept, as does, each identity being read against the output itself, a held control of that output that
 *    carries a co-move of its own, in that context only (wb-pgzz respin 2); and each co-move held to the held control itself
 *    (wb-pgzz respin 3, the enumerate-the-resolvable cut R-B518 ordered, the mark included): the held control's own mark, read
 *    back from it against the output (MOVED added, set to true, at its node) and placed as its node's last member, is the mark
 *    each co-move carries, by its node, its value and its place in each co-move - each marked co-move, read back against its own
 *    unmarked self (identityOf), is that same one difference, with its mark its node's last member read against that same self
 *    (addedLast walks the two, which differ by the mark alone, so it reaches the mark's node of every marked co-move, those whose
 *    own edit changes the length of an array on the mark's path included: the two inside-source removals of a source.rows
 *    element, the mark at source.rows.0, which wb-pgzz cut #5 named the residual RS6 with its quiet row Q6, both retired by
 *    wb-lt9r; B4 holds that reader), and each COMOVES co-move, read back against the held control itself, is its one candidate
 *    alone -, so a co-move's mark (MOVED's node, its value and its place among that node's members) is the held control's own;
 *    and each member a co-move adds is its node's last member wherever addedLast reaches that node (addedLast walks the co-move
 *    beside the value it moves, from the root into each member both hold and each element of an array pair of one length: a
 *    marked co-move's mark and its added kind's MOVED, read against the output; a COMOVES co-move's FOREIGN, read against the
 *    held control), so a co-move written with another mark, or with a member at another place at a node addedLast reaches, reds
 *    even where every identity, count and refusal is kept;
 *    each kind's count of controls judged moved held, over READINGS and per reading, to the count of those contexts and their
 *    planted nodes read outside the sweep; and per context, each control judged moved read back at the node it moved (movedAt,
 *    from the control itself, so, with the exactness above and as far as its controls hold it, every node that control moved),
 *    the context's nodes held to its name's nodes read outside the sweep: beside source the output's root, once, and inside
 *    source each node the context
 *    planted, once each and in document order (OUTSIDE ANCHORS). (2) EDITS, on the delivered output for R05 with P9 at rows.0
 *    only: the census's own single edits
 *    of seven kinds - a member added at each object node as its last member, each member and each array element removed, each scalar changed (a
 *    string suffixed, a number incremented, a boolean negated, null replaced by 0), each non-string scalar retyped to its own
 *    text, each string's first cased letter recased, each string given a trailing space, and each object's members and each
 *    array's elements rotated once - every such candidate that moves the output's JSON text, inside source (coverage_summary, the
 *    delivered rows, the record) and beside it alike, each kind's count equal to the count of its candidates the output's JSON
 *    text holds as the platform's own parser reads it, and each control read back from itself (identityOf) and those identities,
 *    as one sorted list per kind, held equal to the candidates that text names (textEdits), so a swap of which node a control
 *    edits reds even where every count is kept (wb-pgzz respin 2), and each member a control adds is its node's last member
 *    (addedLast, wb-pgzz respin 3), addedLast itself held by its own controls on that output (FOREIGN added last at the root, at
 *    the first place of the root, at the first place of source.rows.0 and between runtime's two members, and the output itself,
 *    each read as PLACES states), identityOf itself held by its own controls on that output (a
 *    member added with another value than true, the root turned by two, two single edits at once, a member renamed, an element
 *    appended, and the output itself, each read back as its literal identity); and the delivered output itself is judged moved
 *    on neither leg (the plain leg cannot pass by re-planting: a plant never overwrites a member). Outside (1) and (2) the judge
 *    is not held: a judge blind,
 *    in a context other than R05/P9 at rows.0, only to a move outside that context's held controls is the named residual RS4,
 *    and one blind only to an edit other than the census's own or to a combination of edits is RS5;
 *    B3 the full record planted at every object node of a provider reading (positions derived from the reading, their count
 *    re-derived from its JSON text) moves no output byte;
 *    B4 B2's mark reader (remarks, wb-lt9r) on the delivered output for R05 with P9 at rows.0, for each held control: every
 *    marked co-move of B2's (each EDITS control marked MOVED at the held control's node, their count held to the output's JSON
 *    text less the candidates at the mark) is refused with its mark written at each place of its node but the last (the first
 *    among them, GP6-GEN-MARKED-FIRST-ALL's), and the page that writes it first only where the co-move's own edit changes the
 *    length of an array on the mark's path (refusal #4's
 *    GP6-GEN-MARKED-FIRST-SHORT; at rows.0 the two inside-source removals of a source.rows element, named from the output's JSON
 *    text as the parser reads it: the removals of an element of each array on the mark's path, textEdits) is refused at exactly
 *    the marks the member order of their node, read directly, shows out of place and kept at every other one, co-move by co-move.
 *  N, the statement's negative clause. N1 no projection states any relation but the one display-grouping edge from the invoking
 *    operation to the query node (none without one), so no planted kind is lifted to a RelationKind or merged into grouping; N2 a
 *    sidecar walk record claiming complete coverage leaves every reading at its own coverage: complete only when runtime-licensed
 *    on a complete kind, partial (tone unknown, "absence not licensed") or failure-unknown otherwise.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHORS: F1 the tracked bead export row of wb-4ap.13 (.beads/issues.jsonl, its description only, never its notes)
 * states KINDS in order, row A's label (its Artifact sentence), row N's label (its never-clause) and row B's label (acceptance
 * clause 3) verbatim, and ON_LANDING as acceptance clauses 1 and 2; F2 READINGS covers exactly the execution kinds the src
 * adapter projects (HYPERUNIX_EXECUTION_KINDS, mutation outcomes refused). A2's member list is held to the SDK's own serializer.
 * B2's node counts are held to each document's JSON text, and its EDITS control counts to the delivered output's JSON text as the
 * platform's own parser reads it (JSON.parse's reviver, textCounts), never to nodePaths or editsOf; its exactness judge's co-move
 * counts are held to the same text (wb-pgzz respin 1): each marked EDITS kind to textCounts less the candidates that mark the held
 * control's node or remove it, and each COMOVES kind to the text's objects, its strings naming one of READINGS' coverages and its
 * numbers as the parser reads them (parsedCount), never to editsOf, comovesOf or the marked set; and its control identities are
 * held to the same text (wb-pgzz respin 2): each EDITS control, each marked co-move and each COMOVES co-move is read back from
 * itself (identityOf walks it beside the output and names each difference by its node and its form, never by a generator) and
 * held, as one sorted list per kind, to the candidates the parser's own reading of that text names (parsedNodes reads each
 * value's path back from the holders JSON.parse's reviver hands over; textEdits and textComoves name each candidate from it,
 * writing each edit's form apart from the generators' helpers), never to nodePaths, objectPaths, editsOf, comovesOf or the
 * marked set; and each co-move's mark is held to the held control itself (wb-pgzz respin 3): each marked co-move's mark, read
 * back against its own unmarked self, to the held control's one difference from the output and to its node's last place
 * (wb-lt9r), each COMOVES co-move to its one difference from the held control, and the place of each member a control or a
 * co-move adds at a node addedLast reaches is read back from it (addedLast walks it beside the value it moves, from the root into
 * each member both hold and each element of an array pair of one length), never from plantedAt's, heldOf's, editsOf's or
 * comovesOf's own writing; and B2's mark reader (remarks) is held on the same output by B4 (wb-lt9r): its marked co-moves counted
 * against the output's JSON text less the candidates at the mark, as B2 counts them, the co-moves whose own edit changes the
 * length of an array on the mark's path named from that text as the parser reads it (the removals of an element of each array on
 * the mark's path, textEdits), and each mark its page writes out of place read from its node's member order directly, never
 * through remarks or addedLast. B2's held-control counts are
 * held to the contexts its judge decides, counted outside the sweep (wb-zf7v, the landing-744 F1 cure): beside source
 * READINGS.length + PLANTS.length x (N + READINGS.length) and inside source READINGS.length + PLANTS.length x (N + K) - today
 * 14 + 9 x 315 = 2849 and 14 + 9 x 462 = 4172 -, N the READINGS documents' object nodes counted from their JSON text (braces) and
 * K the READINGS documents' nodes at which the SDK codec keeps the full record verbatim, planted one node at a time and read
 * through the codec itself (codecKept), never through legsOf, judgeWhole or the sweep's own node and kept counts. Per reading
 * (wb-bv75, the landing-773 F1 cure) the same counts are held to the reading's own document: beside source
 * 1 + PLANTS.length x (N_r + 1) and inside source 1 + PLANTS.length x (N_r + K_r), N_r its braces and K_r its codecKept count -
 * today R01 199 and 289, R02 208 and 307 -; and per context (the wb-bv75 respin 1, its refusal's U1), each context's held
 * controls are held, by the node each was read back at (movedAt; each counted only as its context's output plus exactly its
 * MOVED member, movedOnly, wb-pgzz), to its name's nodes: beside source the output's root; inside
 * source, source itself for the plain output, the node it planted for a plant at a node, and for a plant at every kept node at
 * once the nodes at which the SDK codec keeps that plant in the reading's document, in document order (codecKeptAt: the codec
 * read one node at a time, never legsOf, judgeWhole or the sweep's own kept nodes), the names built after the sweep from
 * READINGS, PLANTS and objectPaths of each reading's document (their count per reading held to its braces by the sweep and by
 * the per-reading anchor).
 * FROZEN SHAPE (standing rule 16): S pins the rows and their pins, KINDS, READINGS (id, kind, licence, expected coverage), PLANTS
 * (id and record members), the representation members, the judge controls - the kind judge's (FLAGGED, NAMESAKES) and B2's
 * held, whole-output and co-move control kinds (HELD, EDITS, COMOVES and FOREIGN's name) and identityOf's own controls (READER's
 * count) and addedLast's (PLACES' count, wb-pgzz respin 3) -, the residuals and the on-landing
 * labels as literals; every pin compares a measured witness to WITNESSES (payload identity: B2's carries the plants as they
 * arrived, its held-control counts in sum and per reading and its count of contexts held at their names' nodes, its control
 * output and each control kind's count, the co-moves its exactness judge refused, per held kind and per control kind and per
 * co-move kind, and how many of its controls and co-moves were read back at the identities their output's text names, per held
 * kind, each counted only with its mark the held control's own (its node, its value and its place, wb-lt9r) and each member it
 * adds its node's last wherever addedLast reaches that node, wb-pgzz respin 3; B4's, per held kind, the mark, the marked
 * co-moves' count, the co-moves whose own edit changes the length of an array on the mark's path and how many marks the page
 * writes out of place, the marks remarks keeps on the page and the co-moves at which it agrees with that direct read, the
 * analog's places (each marked co-move's mark at each place of its node but the last), how many of them remarks refuses and the
 * co-moves it refuses at every one, wb-lt9r); Z requires every pin to run once, in row order.
 * ENUMERATED (wb-pgzz respin 3, rule 19(c) and R-B518: the second-stage cap froze the claims-wider-than-pins class of B2's
 * exactness controls, so this cut is that class's enumerate-the-resolvable form; cut #5 is its fail-closed core, R-B542, claims
 * equal to pins on what remains): a co-move is the held control with its output also moved by one single edit beside its mark,
 * and each member of that class this census claims is held by a content pin -
 * (m1) which node it moves and how: its identity less its mark, read against the output, equal per kind as one sorted list to the
 * candidates the output's JSON text names (respin 2); (m2) its mark: MOVED's node and value the held control's own (each marked
 * co-move's mark, read back against its own unmarked self, is the held control's one difference from the output; each COMOVES
 * co-move reads back against the held control as its candidate alone; respin 3, refusal #3's U1 and U2), and its place the held
 * control's own (each COMOVES co-move's read against the held control, identityOf; each marked co-move's against its own
 * unmarked self, addedLast, which reaches the mark's node of every one: wb-lt9r, B4 holding that reader); (m3) the place of each
 * member it adds at a node addedLast reaches (a marked co-move's mark and added MOVED against the output, a COMOVES co-move's
 * FOREIGN against the held control): its node's last, as the held control places its own mark (addedLast, respin 3); (m4) which
 * candidates each set holds: the identity lists and each count against the same text (respins 1 and 2). The header claims
 * exactly these pins. The enumerate cut's refusal #4 found one member of the class they did not hold (GP6-GEN-MARKED-FIRST-
 * SHORT, a generator writing the mark first only where no pin read it): the mark's place of a marked co-move whose own edit
 * changes the length of an array on the mark's path, a node addedLast does not reach against the output - at R05/P9 at rows.0
 * the two inside-source removals of a source.rows element (the mark at source.rows.0). Cut #5 named it the residual RS6 with its
 * quiet row Q6, carried by wb-lt9r; wb-lt9r pins it in (m2), each marked co-move's mark place read against its own unmarked
 * self, and holds that reader by B4 on that generator's page and on an analog that writes each marked co-move's mark at each
 * place of its node but the last (GP6-GEN-MARKED-FIRST-ALL's first place among them), so RS6 and Q6 are retired
 * (RS1-RS5 with Q1-Q5 unchanged). A member found later is a residual-list addition, not a refusal, unless it contradicts one of
 * these pins (rule 14's shape); an exactness judge blind only to a co-move of another form is NOT CLAIMED (below).
 * CASE NAMES: no case name here evidences docs/workbench/09's "optional graph traversal of linked native refs" (the RA5/b half of
 * test/workbench-docs09-readers-relationships.census.ts, routed to this bead's on-landing leg), so every case name stays outside
 * that half's title probe; the kind spellings live in data, never in a case name.
 * NOT CLAIMED: acceptance clauses 1 and 2 (ON_LANDING) - a typed-ref fixture mapped onto distinct RelationKinds or counted as
 * unmapped, per-edge coverage and source revision, a bounded walk read partial with its remainder counted - wait for H0/H1
 * results in a released @hyperunix/sdk (HyperUnix-CLI H0/H1, an external target) and a re-vendor; no Pi reader of them exists.
 * The native registration's invoke (nativeHyperUnixFind, which launches the SDK's client and so needs the hx binary) is not
 * driven: B2 reaches the provider through registerHyperUnixFind only, and A3 reads both registrations' catalogs, not outputs.
 * B2 drives the census's own documents only (READINGS' execution kinds, so no mutation outcome; two rows at most) with the records
 * of PLANTS, one node at a time and every codec-kept node at once: a provider keyed on another document, on another payload (A2
 * measures where a string member survives, but no B row plants one) or on another combination of nodes is not driven; and B2's
 * judge is held only as row B's CLAIM SCOPE states, so a judge blind, in a context other than R05/P9 at rows.0, only to a move
 * outside that context's held controls (RS4), or blind only to an edit other than the census's own single edits or to a
 * combination of edits (RS5), is not excluded: each is a named residual with its pinned quiet row (Q4, Q5). B2's held counts
 * number the held controls its hold judged moved, each count growing only on that comparison, so a hold that counts a context's
 * controls without judging them, or without its exactness judge reading them (in every context, or only in some - only beside
 * source, only at the joint: wb-pgzz refusal #2's F5 attribution), is NOT CLAIMED (wb-zf7v); B2's held nodes are read back from
 * each control whose comparison held,
 * so a hold that records, for a control it judged, the node of another control is NOT CLAIMED (the wb-bv75 respin 1); and a hold
 * knows its context by the name, the output and the legs it is handed alone, so a hold handed, under a context's name, another
 * output or another context's legs is NOT CLAIMED (wb-bv75). The controls a hold counts are held to the output it is handed
 * (movedOnly, wb-pgzz), so a held control that moves its output beside its MOVED mark (a co-move) by one of the forms its
 * exactness judge's own controls hold is refused and counts nothing (CLAIM SCOPE (1)); that exactness judge is held by those
 * controls alone, on the delivered output for R05 with P9 at rows.0 and by single edits only (the census's own EDITS marked MOVED,
 * FOREIGN added set to true as its node's last member, a string naming one of READINGS' coverages moved to another one, a number
 * nudged up), so an
 * exactness judge blind to a co-move only in another context, only to a co-move of two or more edits, or only to a single edit
 * of any other form (for example a member added under another name than MOVED and FOREIGN, with another value or at another
 * place than its node's last member (wb-pgzz respin 3), an element
 * added to an array, a string or a null moved to a value those controls never write there - coverage_summary.completeness
 * incomplete to complete, for one -, or a number moved by another amount than 1 or the nudge) is NOT CLAIMED (wb-pgzz respin 1).
 * The identities B2 reads back are compared as one sorted list per kind, so the order in which a generator emits its controls is
 * NOT CLAIMED (a reordering moves nothing a judge sees); identityOf names a member added by its name and its value, and its place
 * among its node's members is read apart (addedLast, wb-pgzz respin 3: a control or co-move that adds that member at another
 * place than its node's last reds wherever addedLast reaches that node, where respin 2 left it NOT CLAIMED; addedLast reaches no
 * node below an array pair of two lengths, so a marked co-move's mark place is also read against its own unmarked self, which
 * reaches it (wb-lt9r, B4), and the place of any other member a co-move adds below an array pair of two lengths is NOT CLAIMED);
 * B2's and B4's readers are read as pure functions of the values each call hands them, so a reader whose reading of a value
 * depends on an earlier reading in the same module instance (state kept across calls or pins, or the order in which B2 and B4
 * run) is NOT CLAIMED (wb-lt9r); identityOf is held only by READER's six controls and by the
 * controls the generators write, so a reader blind only to a difference of another form (two members added at one node, an
 * element moved within its array other than by a turn) is NOT CLAIMED (wb-pgzz respin 2), and addedLast only by PLACES' five
 * controls, by the controls the generators write and, at the mark's node of each held control, by B4's analog (the mark at each
 * place of its node but the last, wb-lt9r), so a place reader blind only to a place none of them writes (the second place among
 * three or more members of a node other than a mark's, for one) is NOT CLAIMED (wb-pgzz respin 3).
 * Every lineage record, kind spelling and carrier key below is CONSTRUCTED by this census; the producer mints none of them.
 */
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resultFromJson, resultToJson} from '@hyperunix/sdk';
import {describe, expect, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, type HyperUnixProjectionTopology, type HyperUnixTopologyContext, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import type {NativeRef, ObservationScope} from '../src/workbench/observation.js';
import {registerHyperUnixFind, registerNativeHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {RECONCILE_EVIDENCE_READS} from '../src/workflow/reconcile.js';

type Json = {[key: string]: JsonValue};
type Step = string | number;
type Path = readonly Step[];

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const BEAD = 'wb-4ap.13';
const BEAD_EXPORT = '.beads/issues.jsonl';
const SDK_ROOT = 'node_modules/@hyperunix/sdk';
/** Pi's package.json dependency spec for the SDK: the committed tarball. */
const SDK_SPEC = 'file:vendor/hyperunix-sdk-0.1.0.tgz';
const SDK_VERSION = '0.1.0';
/** At least this many shipped declaration files, so an emptied walk reds; the measured count rides A1's witness. */
const DECLARATIONS_FLOOR = 20;
/** The six HX-C01 kinds in the order the bead statement lists them; F1 holds them to the tracked export. */
const KINDS: readonly string[] = Object.freeze(['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to']);
/** The census's own carrier key; every constructed text carries SENTINEL. */
const CENSUS_KEY = 'pi-census:wb-4ap.13';
const SENTINEL = 'WB4AP13-SENTINEL';
const WS = '/tmp/hx-lineage-gate-ws';
/** An obviously synthetic runtime digest (64 lowercase hex characters). */
const BINARY = '0123456789abcdef'.repeat(4);
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:census'};
const TARGET = {kind: 'hx.fs/regular-file', root: 'src'};
const PLAIN: HyperUnixTopologyContext = {scope, target: TARGET, capturedAt: '2026-10-28T03:00:00Z', observedAt: '2026-10-28T03:00:01Z'};
/** The workflow node call that issued the read, named the way src/index.ts names a node without a native id. */
const operationRef: NativeRef = {provider: 'pi-workflow', type: 'node-call', id: 'wf_lineage_1:0'};
const INVOKED: HyperUnixTopologyContext = {...PLAIN, invocationId: 'wf_lineage_1', operationRef};
const CONTEXTS: readonly HyperUnixTopologyContext[] = [PLAIN, INVOKED];

/** Acceptance clauses 1 and 2, owed on landing and NOT CLAIMED here; F1 holds them to the tracked export. */
const ON_LANDING: readonly string[] = Object.freeze([
  'On landing: the hyperunix-observer test gains a fixture with typed refs and asserts each relation kind maps to a distinct RelationKind or is counted as unmapped, never merged.',
  "Each edge carries coverage and source revision from the SDK result; a traversal marked bounded yields coverage 'partial' with the remainder counted (open-world rule already pinned at hyperunix-observer.ts:60-65,165-170@9df9a03).",
]);

interface Row { readonly id: string; readonly label: string; readonly pins: readonly string[]; }
const ROWS: readonly Row[] = Object.freeze([
  {id: 'A', label: 'Artifact: H0/H1 results in a released @hyperunix/sdk (interim contract: RFCLI fixture stand-in).', pins: ['A1', 'A1c', 'A2', 'A3']},
  {id: 'B', label: 'The find-only path stays byte-identical.', pins: ['B1', 'B2', 'B3', 'B4']},
  {id: 'N', label: 'never collapsing ref meanings or presenting a bounded traversal as complete', pins: ['N1', 'N2']},
  {id: 'Q', label: 'the named residuals of rows A and B, each with its pinned quiet row', pins: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']},
]);

interface Residual { readonly id: string; readonly family: string; readonly quiet: string; }
const RESIDUALS: readonly Residual[] = Object.freeze([
  {id: 'RS1', family: 'a kind spelled outside the six whole-literal spellings (a derived form, a namespaced token) never trips A1', quiet: 'Q1'},
  {id: 'RS2', family: 'a kind declared only as an identifier (an enum member or property name) never trips A1', quiet: 'Q2'},
  {id: 'RS3', family: 'a lineage payload inside a container the SDK copies whole adds no serializer member, so A2 never sees it', quiet: 'Q3'},
  {id: 'RS4', family: "a judge blind, in a context other than R05/P9 at rows.0, only to a move outside that context's held controls never trips B2", quiet: 'Q4'},
  {id: 'RS5', family: "a judge blind only to an edit other than the census's own single edits (a scalar moved to another of its values) or to a combination of edits (two scalars exchanged) never trips B2", quiet: 'Q5'},
]);

/** The 12 object nodes of a full SDK document at which an object member survives the provider's codec path verbatim (measured, A2/B2). */
const OPEN_POSITIONS: readonly string[] = Object.freeze([
  'rows.0', 'rows.1', 'coverage.0.cause', 'coverage.0.scope', 'coverage.0.target', 'coverage.0.body', 'coverage.1.cause', 'coverage.1.scope',
  'coverage.1.target', 'coverage.1.body', 'coverage_summary.incomplete_regions.0', 'extensions',
]);
/** The one object node at which only a planted member's name survives, an object value coerced by String(); a string survives there verbatim (A2). */
const COERCING_POSITION = 'evidence.provider_versions';
/** The 9 object nodes the serializer rebuilds field by field, where a planted member is dropped (A2). */
const DROPPED_POSITIONS: readonly string[] = Object.freeze([
  '(root)', 'coverage.0', 'coverage.1', 'status', 'status.streams.0', 'execution_status', 'transport', 'coverage_summary', 'evidence',
]);
/** The measured witness each pin must reproduce (payload identity), measured on trunk f5589e0 with @hyperunix/sdk 0.1.0 (A2's re-measured on trunk c85be84 by the wb-57n1 respin, B2's, Q4's and Q5's on trunk 0b53dcd by its second; B2's held counts per reading and its contexts held once on trunk f5cb912 by wb-bv75, held at their nodes on trunk 1520111 by its respin 1, its exactness judge's co-moves on trunk a17a9fd by wb-pgzz, its other co-moves (COMOVES) on trunk 3023c3d by its respin 1, its control identities on trunk de6deb2 by its respin 2, its marks and places on trunk 91060e3 by its respin 3; B4's on trunk 018c8ac by wb-lt9r). */
const WITNESSES: Readonly<Record<string, JsonValue>> = Object.freeze({
  A1: {declarationFiles: 27, kindLiteralFiles: 0, version: '0.1.0', sidecarDeclared: true},
  A1c: {flagged: 9, kinds: 6, namesakes: 4, flaggedHits: 9, namesakeHits: 0},
  A2: {members: 23, objectNodes: 22, kept: [...OPEN_POSITIONS], coerced: [COERCING_POSITION], dropped: [...DROPPED_POSITIONS],
    textKept: [...OPEN_POSITIONS.slice(0, -1), COERCING_POSITION, 'extensions']},
  A3: {sidecarReads: 0, bodyReads: 0, rowsUse: 'rows', sidecarTokens: 0, reads: [['hyperunix.find'], ['hyperunix.find']],
    registrations: [['Read typed HX results with native coverage and query basis'], ['Native bounded HX query with coverage']]},
  B1: {readings: 14, plants: 9, contexts: 2, adapter: 252, evidence: 126, delivered: 126, sentinelHits: 0},
  B2: {plants: ['P1:edges[produces]', 'P2:edges[consumes]', 'P3:edges[depends]', 'P4:edges[blocks]', 'P5:edges[verifies]', 'P6:edges[related-to]', 'P7:walk',
      'P8:missing_edges', 'P9:edges[produces,consumes,depends,blocks,verifies,related-to]+walk+missing_edges'],
    positions: [...OPEN_POSITIONS],
    nodes: {R01: 21, R02: 22, R03: 19, R04: 20, R05: 22, R06: 21, R07: 22, R08: 22, R09: 22, R10: 22, R11: 22, R12: 22, R13: 22, R14: 22},
    kept: {R01: 11, R02: 12, R03: 9, R04: 10, R05: 12, R06: 11, R07: 12, R08: 12, R09: 12, R10: 12, R11: 12, R12: 12, R13: 12, R14: 12},
    unmoved: {model: 2723, plain: 1449}, compared: 1449, together: 126,
    held: {'beside source': 2849, 'inside source': 4172},
    heldBy: {'beside source': {R01: 199, R02: 208, R03: 181, R04: 190, R05: 208, R06: 199, R07: 208, R08: 208, R09: 208, R10: 208, R11: 208, R12: 208, R13: 208, R14: 208},
      'inside source': {R01: 289, R02: 307, R03: 253, R04: 271, R05: 307, R06: 289, R07: 307, R08: 307, R09: 307, R10: 307, R11: 307, R12: 307, R13: 307, R14: 307}},
    heldOnce: 2849,
    identified: {reader: 6, placer: 5, controls: 892, 'beside source': 997, 'inside source': 995},
    controls: {at: 'R05/P9 at rows.0', added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
    exactness: {'beside source': {foreign: 63, coverage: 30, nudged: 13}, 'inside source': {foreign: 63, coverage: 30, nudged: 13}},
    comoves: {'beside source': {added: 62, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
      'inside source': {added: 62, removed: 255, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60}}},
  B3: {readings: ['R01', 'R05'], positions: [23, 24]},
  B4: {at: 'R05/P9 at rows.0', held: {
    'beside source': {mark: '(root)', marked: 891, short: [], misplaced: 0, kept: 891, agreed: 891, places: 3560, refused: 3560, seen: 891},
    'inside source': {mark: 'source.rows.0', marked: 889, short: ['["source","rows"] - [0]', '["source","rows"] - [1]'], misplaced: 2, kept: 887, agreed: 889, places: 1774, refused: 1774, seen: 889}}},
  N1: {topologies: 280, relations: 140, kinds: ['grouping']},
  N2: {complete: 2, partial: 7, unknown: 5},
  Q1: {shapes: 6, hits: 0},
  Q2: {shapes: 3, hits: 0},
  Q3: {bodies: ['rows.0', 'coverage.0.body'], members: [23, 23]},
  Q4: {contexts: ['R05/P9 at coverage.0.cause: held 2', 'R01/P9 at rows.0: held 2', 'R05/P1 at rows.0: held 2', 'R05/P9 at every kept node: held 13'],
    unseen: {added: 0, removed: 1, changed: 1, retyped: 1, recased: 0, spaced: 0, rotated: 0}},
  Q5: {at: 'R05/P9 at rows.0', pages: [
    {page: 'another value', seen: {added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
      move: 'source.terminal complete to partial', judge: ['model', 'plain'], missed: []},
    {page: 'a combination', seen: {added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
      move: 'contract and runtime.version exchanged', judge: ['model', 'plain'], missed: []}]},
});

type Coverage = 'complete' | 'partial' | 'unknown';
interface Reading { readonly id: string; readonly kind: string; readonly licensed: boolean; readonly coverage: Coverage; }
/** Every execution kind the adapter projects (F2), both licences where they read differently, and the coverage each must keep. */
const READINGS: readonly Reading[] = Object.freeze([
  {id: 'R01', kind: 'complete', licensed: true, coverage: 'complete'},
  {id: 'R02', kind: 'complete', licensed: false, coverage: 'partial'},
  {id: 'R03', kind: 'complete-empty', licensed: true, coverage: 'complete'},
  {id: 'R04', kind: 'complete-empty', licensed: false, coverage: 'partial'},
  {id: 'R05', kind: 'incomplete', licensed: false, coverage: 'partial'},
  {id: 'R06', kind: 'incomplete', licensed: true, coverage: 'partial'},
  {id: 'R07', kind: 'budget-exhausted', licensed: false, coverage: 'partial'},
  {id: 'R08', kind: 'cancelled', licensed: false, coverage: 'partial'},
  {id: 'R09', kind: 'view-invalidated', licensed: false, coverage: 'partial'},
  {id: 'R10', kind: 'provider-failed', licensed: false, coverage: 'unknown'},
  {id: 'R11', kind: 'schema-failed', licensed: false, coverage: 'unknown'},
  {id: 'R12', kind: 'internal-failed', licensed: false, coverage: 'unknown'},
  {id: 'R13', kind: 'protocol-failed', licensed: false, coverage: 'unknown'},
  {id: 'R14', kind: 'usage-error', licensed: false, coverage: 'unknown'},
]);

/** One constructed lineage edge of `kind`: native endpoints, per-edge coverage and a source revision, every text sentinel-marked. */
const edge = (kind: string, n: number): Json => ({kind, from: {provider: 'hyperunix', type: 'artifact', id: `${SENTINEL}-from-${n}`},
  to: {provider: 'hyperunix', type: 'artifact', id: `${SENTINEL}-to-${n}`}, coverage: 'complete', source_revision: `${SENTINEL}-rev-${n}`});
/** A walk record that claims complete coverage while marked bounded with a remainder: what N2 must never honour. */
const walk = (n: number): Json => ({bounded: true, max_hops: 2, remainder: 5, coverage: 'complete', edges: KINDS.map((kind, index) => edge(kind, n + index))});
const missing = (n: number): Json => ({open_world: true, count: 3, coverage: 'partial', note: `${SENTINEL}-missing-${n}`});
interface Plant { readonly id: string; readonly record: Json; }
const plant = (id: string, record: Json): Plant => ({id, record});
/** One record per kind (P1-P6, in KINDS order), the bounded walk (P7), the open-world missing-edge report (P8) and all of them (P9). */
const PLANTS: readonly Plant[] = Object.freeze([
  ...KINDS.map((kind, index) => plant(`P${index + 1}`, {edges: [edge(kind, index + 1)]})),
  plant('P7', {walk: walk(10)}),
  plant('P8', {missing_edges: missing(20)}),
  plant('P9', {edges: KINDS.map((kind, index) => edge(kind, 30 + index)), walk: walk(40), missing_edges: missing(50)}),
]);
const plantOf = (id: string): Plant => {
  const found = PLANTS.find(item => item.id === id);
  if (found === undefined) throw new Error(`no plant ${id}`);
  return found;
};

/** The serializer's members of hyperunix.result/1, in its own order; A2 holds this list to resultToJson. */
const REPRESENTATION_KEYS: readonly string[] = Object.freeze([
  'representation', 'operation', 'rows', 'rows_retained', 'coverage', 'status', 'execution_status', 'diagnostics', 'view', 'cost', 'transport',
  'workspace_root', 'terminal', 'truth', 'coverage_summary', 'evidence', 'digest', 'digest_source', 'local_digest', 'structural_digest',
  'execution_id', 'budget_dimension', 'extensions',
]);

const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
/** A kind spelled as one whole string literal: any quote, any case, its words joined by a hyphen, an underscore, a space or nothing. */
const KIND_LITERAL = new RegExp(`(['"\`])(?:${KINDS.map(kind => kind.split('-').map(escaped).join('[-_ ]?')).join('|')})\\1`, 'giu');
const kindHits = (text: string): number => [...text.matchAll(KIND_LITERAL)].length;
/** Each kind in a declaration-shaped control: each must hit exactly once, and together they spell every kind. */
const FLAGGED: readonly (readonly [string, string])[] = Object.freeze([
  ['produces', "type RefKind = 'produces';"], ['consumes', 'readonly kind: "consumes";'], ['depends', 'const kind = `depends`;'],
  ['blocks', "case 'BLOCKS':"], ['verifies', 'kind: "Verifies",'], ['related-to', "'related-to'"], ['related-to', '"related_to"'],
  ['related-to', "'related to'"], ['related-to', '"relatedTo"'],
]);
/** The SDK's own namesakes, each read from its shipped file: the judge must stay quiet on every one. */
const NAMESAKES: readonly {readonly file: string; readonly text: string}[] = Object.freeze([
  {file: 'protocol/mutation.d.ts', text: 'readonly outcome: "verified"'},
  {file: 'client.d.ts', text: 'dependents(path: string'},
  {file: 'execution.d.ts', text: 'ConsumerActiveError'},
  {file: 'provider.d.ts', text: 'One relation the provider produces'},
]);
/** RS1: derived or namespaced spellings. */
const DERIVED: readonly string[] = Object.freeze(["'produced-by'", '"depends-on"', "'hx.ref/verifies'", "'blocked'", "'consumer'", '"relatedness"']);
/** RS2: identifier-only declarations. */
const IDENTIFIERS: readonly string[] = Object.freeze(['enum RefKind { Produces = 0, RelatedTo = 1 }', 'readonly produces: readonly string[];', 'type Blocks = typeof blocks;']);
/** HYPERUNIX_CONSUMED_FIELDS' length at this cut's base: a floor, since a relayed-facet cut may add named reads (A3). */
const CONSUMED_FLOOR = 11;
/** A consumed path that reads into a copied-whole body: a row's claim body or a certificate's cause, scope, target or body (A3). */
const BODY_READ = /^source\.(?:rows\[\]|coverage\[\]\.(?:cause|scope|target|body))(?:\.|$)/u;
const HX_MODULES: readonly string[] = Object.freeze(['src/workbench/providers/hyperunix.ts', 'src/workbench/hyperunix-observer.ts']);

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const textOf = (path: string): string => readFileSync(join(REPO, path), 'utf8');
const certificate = (batch_id: string): Json => ({mode: 'opportunistic', cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode: 'opportunistic'}});

/** A full SDK document (the hyperunix.result/1 representation) of one execution kind and licence, with an optional sidecar. */
function documentOf(kind: string, licensed: boolean, extensions: Json = {}, operation = 'find'): Json {
  const rows: Json[] = kind === 'complete-empty' ? [] : [{path: 'src/a.ts'}, {path: 'src/b.ts'}];
  return {representation: 'hyperunix.result/1', operation, rows, rows_retained: true, coverage: ['b1', 'b2'].map(certificate),
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind, diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-28T02:59:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 10, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: ['opportunistic'], completeness: licensed ? 'complete' : 'incomplete', licenses_absence: licensed,
      certificates_license_absence: licensed, incomplete_regions: licensed ? [] : [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}],
      result_coverage: null, answer_count: rows.length},
    evidence: {support_ids: ['hx-support-1'], evidence_classes: [], derivation_handles: ['hx-derivation-1'], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: 'hx-execution-1', budget_dimension: null, extensions};
}
/** What registerHyperUnixFind returns for a document, built the provider's own way (providers/hyperunix.ts:25-26). */
const providerShaped = (document: Json): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
  source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version: SDK_VERSION, binarySha256: BINARY}})) as JsonValue;
const readingOf = (row: Reading, extensions: Json = {}): JsonValue => providerShaped(documentOf(row.kind, row.licensed, extensions));
const sidecar = (planted: Plant): Json => ({[CENSUS_KEY]: planted.record});

/** Every object node of a JSON tree by its path, in document order (an array contributes its elements, never itself). */
function objectPaths(value: unknown, path: Path = []): Path[] {
  if (Array.isArray(value)) return value.flatMap((child: unknown, index) => objectPaths(child, [...path, index]));
  if (!isRecord(value)) return [];
  return [path, ...Object.entries(value).flatMap(([key, child]) => objectPaths(child, [...path, key]))];
}
function nodeAt(value: unknown, path: Path): unknown {
  let node = value;
  for (const step of path) node = Array.isArray(node) ? node[Number(step)] : isRecord(node) ? node[String(step)] : undefined;
  return node;
}
/**
 * A deep copy of `value` with `member` added, set to `payload`, on the object node at `path`. A node that already carries `member`
 * is refused, so a plant never overwrites (B2's plain leg cannot pass by re-planting a record its plain output already holds).
 */
function plantedAt<T extends JsonValue>(value: T, path: Path, member: string, payload: JsonValue): T {
  const copy = JSON.parse(JSON.stringify(value)) as T;
  const node = nodeAt(copy, path);
  if (!isRecord(node)) throw new Error(`no object node at ${path.join('.')}`);
  if (Object.hasOwn(node, member)) throw new Error(`the node at ${path.join('.') || '(root)'} already carries ${member}`);
  node[member] = payload;
  return copy;
}
const dotted = (path: Path): string => path.join('.');
/** The object nodes of a JSON tree that carry `member` (the census's member unless another is named), by dotted path. */
const carriers = (value: unknown, member = CENSUS_KEY): string[] =>
  objectPaths(value).filter(path => {
    const node = nodeAt(value, path);
    return isRecord(node) && Object.hasOwn(node, member);
  }).map(dotted);
const braces = (value: unknown): number => JSON.stringify(value).split('{').length - 1;
const same = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);
/** A record's identity read from the record itself: each member by name, an edge list with its kinds in order (B2's witness). */
const signatureOf = (record: unknown): string =>
  isRecord(record)
    ? Object.entries(record).map(([name, value]) => (Array.isArray(value) ? `${name}[${value.map(item => (isRecord(item) ? String(item.kind) : typeof item)).join(',')}]` : name)).join('+')
    : `not a record: ${String(JSON.stringify(record))}`;
/** A dotted node name (A2's and B2's positions) read back as its path. */
const pathOf = (name: string): Path => (name === '(root)' ? [] : name.split('.').map(step => (/^\d+$/u.test(step) ? Number(step) : step)));

const topologyOf = (value: JsonValue, context: HyperUnixTopologyContext): HyperUnixProjectionTopology => hyperunixTopology(value, context);
/** Whether any output string carries a planted sentinel: B1's loop and its leak control share this one judge. */
const leaks = (value: unknown): boolean => JSON.stringify(value).includes(SENTINEL);
const evidenceOf = (value: JsonValue) => nativeEvidence('hyperunix.find', value);
/** `value` with `record` planted under CENSUS_KEY at each node of `paths`, each path read below `under`. */
const plantedEach = <T extends JsonValue>(value: T, paths: readonly Path[], record: Json, under: Path = []): T =>
  paths.reduce((planted, path) => plantedAt(planted, [...under, ...path], CENSUS_KEY, record), value);
interface Judgment { readonly judged: readonly string[]; readonly moved: readonly string[]; }
type Leg = readonly [string, JsonValue];
/** The context legsOf read last, keyed by the JSON text of its inputs: a context's held controls reuse its legs (wb-57n1 respin 2). */
let lastContext: {readonly key: string; readonly legs: readonly Leg[]} | undefined;
/**
 * What B2's judge compares an output with, for `record` planted at each node of `paths` in `base`: the model leg, providerShaped of
 * that planted document; and, when at least one node is planted and the codec keeps the record verbatim at every one of them, the
 * plain leg, `plain` (the provider's output for `base`) with exactly that record added at each of them. A pure function of its
 * inputs' JSON text, built once per context: the judgments that follow for the same context (its held controls) reuse it.
 */
function legsOf(base: Json, plain: JsonValue, paths: readonly Path[], record: Json): readonly Leg[] {
  const key = JSON.stringify([base, plain, paths, record]);
  if (lastContext?.key === key) return lastContext.legs;
  const model = providerShaped(plantedEach(base, paths, record));
  const legs: Leg[] = [['model', model]];
  const verbatim = paths.every(path => JSON.stringify(nodeAt(model, ['source', ...path, CENSUS_KEY])) === JSON.stringify(record));
  if (paths.length > 0 && verbatim) legs.push(['plain', plantedEach(plain, paths, record, ['source'])]);
  lastContext = {key, legs};
  return legs;
}
/**
 * B2's whole-output judge (wb-57n1), the one function its sweep, its held controls and its EDITS controls call. `output` is the
 * provider's output for `base` with `record` planted at each node of `paths`; it is compared, as JSON text, with each leg of legsOf.
 */
function judgeWhole(output: JsonValue, base: Json, plain: JsonValue, paths: readonly Path[], record: Json): Judgment {
  const legs = legsOf(base, plain, paths, record);
  const text = JSON.stringify(output);
  return {judged: legs.map(([leg]) => leg), moved: legs.filter(([, expected]) => JSON.stringify(expected) !== text).map(([leg]) => leg)};
}
/** The kinds of single-edit move B2's judge must see (its controls), in this order; S pins the list. */
const EDITS = Object.freeze(['added', 'removed', 'changed', 'retyped', 'recased', 'spaced', 'rotated'] as const);
type Edit = (typeof EDITS)[number];
/** B2's held controls (wb-57n1 respin 2, ruling R-B146): the moves every context's judgment must see, in this order; S pins the list. */
const HELD = Object.freeze(['beside source', 'inside source'] as const);
type Held = (typeof HELD)[number];
/** The member every held control adds: the census's own carrier key, marked moved. */
const MOVED = `${CENSUS_KEY}:moved`;
/** The member the exactness judge's FOREIGN co-moves add (wb-pgzz respin 1): a name outside the census's 'pi-census:' namespace. */
const FOREIGN = 'foreign-co-move';
/**
 * The exactness judge's co-moves beside its marked EDITS controls (wb-pgzz respin 1), in this order; S pins the list: FOREIGN added
 * at an object node (foreign), a string naming one of READINGS' coverages moved to another one (coverage), a number nudged up.
 */
const COMOVES = Object.freeze(['foreign', 'coverage', 'nudged'] as const);
type Comove = (typeof COMOVES)[number];
/**
 * identityOf's own controls (wb-pgzz respin 2), each read back on the delivered output for R05 with P9 at rows.0 as this literal
 * identity, in this order: FOREIGN added set to false at the root (a value the generators never write), the root's members turned
 * by two, source.status.exit_code moved 0 to 1 beside source.terminal moved complete to partial (two single edits at once),
 * runtime's version member renamed release, an element appended to source.diagnostics, and the output itself; S pins the count.
 */
const READER: readonly string[] = Object.freeze([
  '[] + "foreign-co-move": false',
  '[] turned by 2',
  '["source","status","exit_code"] 0 -> 1 & ["source","terminal"] "complete" -> "partial"',
  '["runtime"] rebuilt',
  '["source","diagnostics"] rebuilt',
  '(no difference)',
]);
/**
 * addedLast's own controls (wb-pgzz respin 3), each read on the delivered output for R05 with P9 at rows.0 as this literal, in this
 * order: FOREIGN added (set to true) as the root's last member, as the root's first member, as source.rows.0's first member beside
 * its record, and between runtime's two members, and the output itself; S pins the count.
 */
const PLACES: readonly boolean[] = Object.freeze([true, false, false, false, true]);
/**
 * A context's held controls: its output with one member added beside source (at the output's root), and one added inside source
 * at each node the context planted (at source itself for a plain output, which plants none).
 */
function heldOf(output: JsonValue, paths: readonly Path[]): Record<Held, JsonValue[]> {
  const planted: readonly Path[] = paths.length > 0 ? paths : [[]];
  return {'beside source': [plantedAt(output, [], MOVED, true)], 'inside source': planted.map(path => plantedAt(output, ['source', ...path], MOVED, true))};
}
/**
 * Where a held control moved its output, read back from the control itself (wb-bv75 respin 1): every node carrying MOVED by its
 * dotted path, '(root)' for the output's root, joined by '+' ('(none)' when no node carries it). B2's hold keeps each control it
 * judged moved by this name, so a context's anchor reads the nodes its controls moved, never the loop or the paths that built them;
 * it keeps only a control movedOnly keeps (wb-pgzz), so that name is every node a kept control moved, as far as movedOnly's own
 * controls hold it (B2).
 */
const movedAt = (control: JsonValue): string => carriers(control, MOVED).map(name => name || '(root)').join('+') || '(none)';
/**
 * The object nodes of `document` at which the SDK codec (resultFromJson, then resultToJson: the provider's own path) keeps `record`
 * verbatim, planted under CENSUS_KEY one node at a time, in document order: A2's reading on any document, read through the codec
 * itself and never through legsOf or judgeWhole, so B2's held counts (codecKept, wb-zf7v) and the nodes of its joints (the wb-bv75
 * respin 1) have an anchor outside the sweep (OUTSIDE ANCHORS).
 */
const codecKeptAt = (document: Json, record: Json): Path[] =>
  objectPaths(document).filter(path => same(nodeAt(resultToJson(resultFromJson(plantedAt(document, path, CENSUS_KEY, record))), [...path, CENSUS_KEY]), record));
/** How many object nodes of `document` the SDK codec keeps `record` at verbatim (codecKeptAt's count). */
const codecKept = (document: Json, record: Json): number => codecKeptAt(document, record).length;
/**
 * How many candidates of each EDITS kind a JSON text holds, read by the platform's own parser (JSON.parse's reviver visits each
 * value once, the root last), never by nodePaths or editsOf: the anchor of B2's EDITS control counts outside this file's literals.
 * An object is one added candidate and, with two or more members, one rotated; an array whose elements are not all equal is one
 * rotated; every member and element is one removed; every scalar one changed; a non-string scalar one retyped; a string one spaced
 * and, when its first letter has a case, one recased.
 */
function textCounts(text: string): Record<Edit, number> {
  const counts: Record<Edit, number> = {added: 0, removed: 0, changed: 0, retyped: 0, recased: 0, spaced: 0, rotated: 0};
  let values = 0;
  JSON.parse(text, (_key: string, value: unknown) => {
    values++;
    if (Array.isArray(value)) {
      if (value.some(item => JSON.stringify(item) !== JSON.stringify(value[0]))) counts.rotated++;
    } else if (isRecord(value)) {
      counts.added++;
      if (Object.keys(value).length > 1) counts.rotated++;
    } else if (typeof value === 'string') {
      counts.changed++;
      counts.spaced++;
      const letter = value.match(/\p{L}/u)?.[0];
      if (letter !== undefined && letter.toUpperCase() !== letter.toLowerCase()) counts.recased++;
    } else {
      counts.changed++;
      counts.retyped++;
    }
    return value;
  });
  counts.removed = values - 1;
  return counts;
}
/** Every node of a JSON tree by its path - objects, arrays and scalars alike - in document order. */
function nodePaths(value: unknown, path: Path = []): Path[] {
  if (Array.isArray(value)) return [path, ...value.flatMap((child: unknown, index) => nodePaths(child, [...path, index]))];
  if (isRecord(value)) return [path, ...Object.entries(value).flatMap(([key, child]) => nodePaths(child, [...path, key]))];
  return [path];
}
/** A deep copy of `value` whose node at `path` is replaced by `edit` of it. */
function editedAt(value: JsonValue, path: Path, edit: (node: JsonValue) => JsonValue): JsonValue {
  const copy = JSON.parse(JSON.stringify(value)) as JsonValue;
  if (path.length === 0) return edit(copy);
  const parent = nodeAt(copy, path.slice(0, -1));
  const step = path[path.length - 1];
  if (Array.isArray(parent)) parent[Number(step)] = edit(parent[Number(step)] as JsonValue);
  else if (isRecord(parent)) parent[String(step)] = edit(parent[String(step)] as JsonValue);
  else throw new Error(`no container above ${dotted(path)}`);
  return copy;
}
const membersOf = (node: JsonValue): [string, JsonValue][] => (isRecord(node) ? (Object.entries(node) as [string, JsonValue][]) : []);
const elementsOf = (node: JsonValue): JsonValue[] => (Array.isArray(node) ? node : []);
const rotatedOnce = <T>(items: readonly T[]): T[] => [...items.slice(1), ...items.slice(0, 1)];
/** A copy of `value` without the member `name` of the object at `path`, or `value` itself when no object is there (Q4's page). */
const withoutMember = (value: JsonValue, path: Path, name: string): JsonValue =>
  isRecord(nodeAt(value, path)) ? editedAt(value, path, node => Object.fromEntries(membersOf(node).filter(([member]) => member !== name))) : value;
/**
 * Whether a held control is `output` plus exactly its MOVED member (wb-pgzz, the landing-837 F1 cure): the control without the
 * MOVED member at the node movedAt names is `output` itself, as JSON text; one carrying MOVED at two nodes is refused, since the
 * joined name movedAt gives it names no node of the output. A control carrying no MOVED is read as itself (movedAt's '(none)'
 * names no node), so `output` itself passes here, and the hold's judge expect refuses such an unmoved control instead (wb-pgzz
 * refusal #2's F8). This judge is held only by its own controls in B2 (on the delivered output for R05 with P9 at rows.0: the
 * marked EDITS co-moves and the COMOVES, each refused, and each read back at an identity its output's JSON text names, wb-pgzz
 * respin 2), so a control that also moves its output beside that mark by one of those forms (a co-move) is refused. B2's hold
 * counts only a control this keeps, so the node movedAt reads back for a counted control is every node that control moved, as far
 * as those controls hold this judge.
 */
const movedOnly = (control: JsonValue, output: JsonValue): boolean => same(withoutMember(control, pathOf(movedAt(control)), MOVED), output);
/** A scalar changed: a string suffixed, a number incremented, a boolean negated, null replaced by 0. */
const changedScalar = (scalar: JsonValue): JsonValue =>
  typeof scalar === 'string' ? `${scalar}-moved` : typeof scalar === 'number' ? scalar + 1 : typeof scalar === 'boolean' ? !scalar : 0;
/** A string whose first cased letter has its case flipped (the same text otherwise). */
const recased = (text: string): string => text.replace(/\p{L}/u, letter => (letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase()));
/**
 * B2's judge controls: every single-edit move of `output`, by kind (EDITS), each derived from the output itself. A candidate that
 * leaves the output's JSON text unchanged (a rotation of equal elements, a letter without case) moves nothing, so it is no control.
 */
function editsOf(output: JsonValue): Record<Edit, JsonValue[]> {
  const edits: Record<Edit, JsonValue[]> = {added: [], removed: [], changed: [], retyped: [], recased: [], spaced: [], rotated: []};
  for (const path of nodePaths(output)) {
    const node = nodeAt(output, path) as JsonValue;
    if (isRecord(node)) {
      edits.added.push(editedAt(output, path, copy => Object.fromEntries([...membersOf(copy), [`${CENSUS_KEY}:moved`, true]])));
      for (const member of Object.keys(node)) {
        edits.removed.push(editedAt(output, path, copy => Object.fromEntries(membersOf(copy).filter(([name]) => name !== member))));
      }
      edits.rotated.push(editedAt(output, path, copy => Object.fromEntries(rotatedOnce(membersOf(copy)))));
    } else if (Array.isArray(node)) {
      for (let index = 0; index < node.length; index++) {
        edits.removed.push(editedAt(output, path, copy => [...elementsOf(copy).slice(0, index), ...elementsOf(copy).slice(index + 1)]));
      }
      edits.rotated.push(editedAt(output, path, copy => rotatedOnce(elementsOf(copy))));
    } else {
      edits.changed.push(editedAt(output, path, changedScalar));
      if (typeof node === 'string') {
        edits.recased.push(editedAt(output, path, () => recased(node)));
        edits.spaced.push(editedAt(output, path, () => `${node} `));
      } else {
        edits.retyped.push(editedAt(output, path, scalar => String(scalar)));
      }
    }
  }
  const text = JSON.stringify(output);
  for (const edit of EDITS) edits[edit] = edits[edit].filter(control => JSON.stringify(control) !== text);
  return edits;
}
/** A number nudged up by a sub-unit step: its own magnitude times Number.EPSILON (Number.MIN_VALUE at zero), so its JSON text moves. */
const nudged = (value: number): number => (value === 0 ? Number.MIN_VALUE : value + Math.abs(value) * Number.EPSILON);
/** The coverages READINGS expects, in first-seen order: the values the exactness judge's coverage co-moves move a string between. */
const COVERAGES: readonly string[] = Object.freeze([...new Set(READINGS.map(row => row.coverage))]);
/**
 * How many values of a JSON text `keep` accepts, read by the platform's own parser (JSON.parse's reviver visits each value once),
 * never by nodePaths or comovesOf: the anchor of the exactness judge's COMOVES counts outside this file's literals.
 */
function parsedCount(text: string, keep: (value: unknown) => boolean): number {
  let count = 0;
  JSON.parse(text, (_key: string, value: unknown) => {
    if (keep(value)) count++;
    return value;
  });
  return count;
}
/**
 * The exactness judge's COMOVES of a held `control` of `output` (wb-pgzz respin 1), each one single edit beside the control's mark
 * and derived from the output itself: the control with FOREIGN added (set to true) at each object node of the output; with each
 * string of the output that names one of READINGS' coverages moved to each other one; and with each number of the output nudged.
 */
function comovesOf(control: JsonValue, output: JsonValue): Record<Comove, JsonValue[]> {
  const scalars = nodePaths(output).filter(path => {
    const node = nodeAt(output, path);
    return !isRecord(node) && !Array.isArray(node);
  });
  return {
    foreign: objectPaths(output).map(path => plantedAt(control, path, FOREIGN, true)),
    coverage: scalars.flatMap(path => {
      const value = nodeAt(output, path);
      if (typeof value !== 'string' || !COVERAGES.includes(value)) return [];
      return COVERAGES.filter(other => other !== value).map(other => editedAt(control, path, () => other));
    }),
    nudged: scalars.filter(path => typeof nodeAt(output, path) === 'number').map(path => editedAt(control, path, node => (typeof node === 'number' ? nudged(node) : node))),
  };
}
/** One value of a JSON text with its path, as the platform's own parser handed it over (parsedNodes). */
interface Parsed { readonly path: Path; readonly value: unknown; }
/**
 * Every value of a JSON text with its path, read by the platform's own parser (wb-pgzz respin 2): JSON.parse's reviver visits each
 * value once, children before their holder and the root last, and hands each over with its holder and its key, so each path is
 * read back from the holders the parser itself built, never from objectPaths, nodePaths, editsOf or comovesOf - the anchor of B2's
 * control identities outside the generators (OUTSIDE ANCHORS).
 */
function parsedNodes(text: string): Parsed[] {
  const visits: {readonly holder: unknown; readonly key: string; readonly value: unknown}[] = [];
  const visitOf = new Map<unknown, number>();
  JSON.parse(text, function (this: unknown, key: string, value: unknown): unknown {
    if (typeof value === 'object' && value !== null) visitOf.set(value, visits.length);
    visits.push({holder: this, key, value});
    return value;
  });
  const pathAt = (index: number): Path => {
    const {holder, key} = visits[index];
    const parent = visitOf.get(holder);
    return parent === undefined ? [] : [...pathAt(parent), Array.isArray(holder) ? Number(key) : key];
  };
  return visits.map((visit, index) => ({path: pathAt(index), value: visit.value}));
}
/**
 * The candidates of each EDITS kind a JSON text holds, each named by its node and its edit as identityOf names a move (wb-pgzz
 * respin 2), read from the platform's own parser (parsedNodes), never by nodePaths, editsOf or the marked set, and each edit's form
 * written here apart from the generators' helpers: an object adds MOVED (set to true) and, with two or more members, turns by one;
 * an array whose elements are not all equal turns by one; every member and element is removed; every scalar changes (a string
 * suffixed '-moved', a number incremented, a boolean negated, null replaced by 0); every non-string scalar is retyped to its own
 * text; every string gains a trailing space and, when its first letter has a case, has that letter's case flipped. The anchor of
 * the EDITS controls' and the marked co-moves' identities.
 */
function textEdits(text: string): Record<Edit, string[]> {
  const named: Record<Edit, string[]> = {added: [], removed: [], changed: [], retyped: [], recased: [], spaced: [], rotated: []};
  for (const {path, value} of parsedNodes(text)) {
    const at = JSON.stringify(path);
    const movedTo = (now: unknown): string => `${at} ${JSON.stringify(value)} -> ${JSON.stringify(now)}`;
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) named.removed.push(`${at} - [${index}]`);
      if (value.some(item => JSON.stringify(item) !== JSON.stringify(value[0]))) named.rotated.push(`${at} turned by 1`);
    } else if (isRecord(value)) {
      named.added.push(`${at} + ${JSON.stringify(MOVED)}: true`);
      for (const name of Object.keys(value)) named.removed.push(`${at} - ${JSON.stringify(name)}`);
      if (Object.keys(value).length > 1) named.rotated.push(`${at} turned by 1`);
    } else if (typeof value === 'string') {
      named.changed.push(movedTo(`${value}-moved`));
      named.spaced.push(movedTo(`${value} `));
      const letter = value.match(/\p{L}/u)?.[0];
      if (letter !== undefined && letter.toUpperCase() !== letter.toLowerCase()) {
        const flipped = letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase();
        const index = value.indexOf(letter);
        named.recased.push(movedTo(`${value.slice(0, index)}${flipped}${value.slice(index + letter.length)}`));
      }
    } else {
      named.changed.push(movedTo(typeof value === 'number' ? value + 1 : typeof value === 'boolean' ? !value : 0));
      named.retyped.push(movedTo(String(value)));
    }
  }
  return named;
}
/**
 * The COMOVES candidates a JSON text holds, named as identityOf names a move (wb-pgzz respin 2), read from the platform's own parser
 * (parsedNodes), never by nodePaths or comovesOf, each form written here apart from the generator's helpers: FOREIGN added, set to
 * true, at each object; each string naming one of READINGS' coverages moved to each other one; each number nudged up by its own
 * magnitude times Number.EPSILON (Number.MIN_VALUE at zero). The anchor of the COMOVES' identities.
 */
function textComoves(text: string): Record<Comove, string[]> {
  const named: Record<Comove, string[]> = {foreign: [], coverage: [], nudged: []};
  for (const {path, value} of parsedNodes(text)) {
    const at = JSON.stringify(path);
    if (isRecord(value)) named.foreign.push(`${at} + ${JSON.stringify(FOREIGN)}: true`);
    if (typeof value === 'string' && COVERAGES.includes(value)) {
      for (const other of COVERAGES) if (other !== value) named.coverage.push(`${at} ${JSON.stringify(value)} -> ${JSON.stringify(other)}`);
    }
    if (typeof value === 'number') named.nudged.push(`${at} ${JSON.stringify(value)} -> ${JSON.stringify(value === 0 ? Number.MIN_VALUE : value + Math.abs(value) * Number.EPSILON)}`);
  }
  return named;
}
/**
 * `named` less the candidates that mark a held control's node at `mark` or remove it, as identityOf names them (wb-pgzz respin 2):
 * MOVED added at that node, and the removal of each member on its path.
 */
const lessAtMark = (named: readonly string[], mark: Path): string[] => {
  const atMark = [`${JSON.stringify(mark)} + ${JSON.stringify(MOVED)}: true`, ...mark.flatMap((step, index) => (typeof step === 'string' ? [`${JSON.stringify(mark.slice(0, index))} - ${JSON.stringify(step)}`] : []))];
  return named.filter(candidate => !atMark.includes(candidate));
};
/** The smallest positive turn that brings `items` to `turned`, each compared as JSON text, or 0 when no turn does. */
function turnOf(items: readonly unknown[], turned: readonly unknown[]): number {
  for (let turn = 1; turn < items.length; turn++) if (same([...items.slice(turn), ...items.slice(0, turn)], turned)) return turn;
  return 0;
}
/**
 * The differences of `after` from `before`, each named by its node (the JSON text of its path) and its form (wb-pgzz respin 2), read
 * by walking both values together, never by a generator: a member added (its name and value) or removed (its name), an element
 * removed (its index), a node's members or elements turned (the smallest turn), a scalar moved (from and to, as JSON text), and any
 * other change at a node read as that node 'rebuilt'.
 */
function differencesOf(before: unknown, after: unknown, path: Path = []): string[] {
  const at = JSON.stringify(path);
  if (isRecord(before) && isRecord(after)) {
    const left = Object.entries(before);
    const right = Object.entries(after);
    if (left.length === right.length && left.every(([name], index) => name === right[index][0])) {
      return left.flatMap(([name, value]) => differencesOf(value, after[name], [...path, name]));
    }
    const added = right.filter(([name]) => !Object.hasOwn(before, name));
    const removed = left.filter(([name]) => !Object.hasOwn(after, name));
    if (added.length === 1 && removed.length === 0 && same(right.filter(([name]) => Object.hasOwn(before, name)), left)) {
      return [`${at} + ${JSON.stringify(added[0][0])}: ${JSON.stringify(added[0][1])}`];
    }
    if (removed.length === 1 && added.length === 0 && same(left.filter(([name]) => Object.hasOwn(after, name)), right)) {
      return [`${at} - ${JSON.stringify(removed[0][0])}`];
    }
    const turn = turnOf(left, right);
    return [turn > 0 ? `${at} turned by ${turn}` : `${at} rebuilt`];
  }
  if (Array.isArray(before) && Array.isArray(after)) {
    if (before.length === after.length) {
      const inner = before.flatMap((item: unknown, index) => differencesOf(item, after[index], [...path, index]));
      const turn = inner.length > 1 ? turnOf(before, after) : 0;
      return turn > 0 ? [`${at} turned by ${turn}`] : inner;
    }
    const gone = before.findIndex((_item: unknown, index) => same([...before.slice(0, index), ...before.slice(index + 1)], after));
    return [gone >= 0 ? `${at} - [${gone}]` : `${at} rebuilt`];
  }
  const was = JSON.stringify(before);
  const now = JSON.stringify(after);
  return was === now ? [] : [`${at} ${was} -> ${now}`];
}
/** A control's identity: its differences from `output`, joined, so one single edit reads as exactly one difference (wb-pgzz respin 2). */
const identityOf = (output: JsonValue, control: JsonValue): string => differencesOf(output, control).join(' & ') || '(no difference)';
/**
 * Whether each member `after` adds to an object node this walk reaches is that node's last member (wb-pgzz respin 3), read by
 * walking both values together from the root, never by a generator: the place the hold writes its own mark (plantedAt appends), so
 * a control or co-move that adds its member at another place among the members of a node it reaches reads false. It reaches the
 * root, each member both values hold below an object it reaches, and each element of an array pair of one length it reaches; it
 * reaches nothing below an array pair of two lengths or a pair of other shapes, which adds no member here, so the mark's node of a
 * marked co-move whose own edit changes the length of an array on the mark's path is not reached against the output; remarks
 * reads every marked co-move's mark against its own unmarked self too, which reaches it (wb-lt9r, B4).
 */
function addedLast(before: unknown, after: unknown): boolean {
  if (isRecord(before) && isRecord(after)) {
    const names = Object.keys(after);
    const added = names.filter(name => !Object.hasOwn(before, name));
    if (!same(names.slice(names.length - added.length), added)) return false;
    return names.every(name => !Object.hasOwn(before, name) || addedLast(before[name], after[name]));
  }
  if (Array.isArray(before) && Array.isArray(after) && before.length === after.length) return before.every((item: unknown, index) => addedLast(item, after[index]));
  return true;
}
/**
 * Whether a marked co-move of `output` carries the held control's own mark as B2 reads it (wb-pgzz respin 3; one reader for B2's
 * remarked count and B4's page and analog, wb-lt9r): read back against its own unmarked self it is `heldMark`, the held control's one
 * difference from the output (MOVED's node and value), its mark its node's last member read against that same unmarked self
 * (wb-lt9r: addedLast walks the two, which differ by the mark alone, so it reaches the mark's node of every marked co-move, those
 * whose own edit changes the length of an array on the mark's path included; B4 holds this), and each member it adds is its
 * node's last wherever addedLast, walking it beside `output`, reaches that node.
 */
const remarks = (comove: JsonValue, output: JsonValue, mark: Path, heldMark: string): boolean => {
  const unmarked = withoutMember(comove, mark, MOVED);
  return identityOf(unmarked, comove) === heldMark && addedLast(output, comove) && addedLast(unmarked, comove);
};
const CTX = {grants: ['hyperunix:read'], signal: new AbortController().signal};
/** The registered provider's output for a document, through a stub reader and the capability registry. */
async function provided(document: Json): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: SDK_VERSION, binarySha256: BINARY}), close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: TARGET.kind, root: TARGET.root}, CTX);
}

function declarationFiles(dir: string): string[] {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return declarationFiles(path);
    return entry.isFile() && entry.name.endsWith('.d.ts') ? [path] : [];
  }).sort();
}

/** The tracked bead export's description for `id` (never its notes: a later note append never moves this census). */
function exportDescription(id: string): string {
  for (const line of rehydrateTrackerExport(textOf(BEAD_EXPORT), join(REPO, BEAD_EXPORT)).split('\n')) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === id && typeof row.description === 'string') return row.description;
  }
  throw new Error(`the tracked bead export holds no row for ${id}`);
}
/** The text strictly between `from` and the first `to` after it, both required. */
function between(text: string, from: string, to: string): string {
  const start = text.indexOf(from);
  const end = start < 0 ? -1 : text.indexOf(to, start + from.length);
  if (start < 0 || end < 0) throw new Error(`no "${from}" ... "${to}" span`);
  return text.slice(start + from.length, end);
}

const reached: string[] = [];
/** A pin's closing step: its measured witness must equal WITNESSES[pin], then the pin counts as run. */
function settle(pin: string, witness: JsonValue): void {
  expect(witness, `${pin}: the measured witness`).toStrictEqual(WITNESSES[pin]);
  reached.push(pin);
}

describe('wb-4ap.13 HyperUnix lineage gate census (standing leg)', () => {
  it('A1: the vendored SDK declarations spell none of the six HX-C01 kinds as a whole string literal (a hit means re-measure)', () => {
    const manifest: unknown = JSON.parse(textOf(`${SDK_ROOT}/package.json`));
    const pi: unknown = JSON.parse(textOf('package.json'));
    expect(isRecord(manifest) && manifest.name === '@hyperunix/sdk').toBe(true);
    const version = isRecord(manifest) ? manifest.version : undefined;
    const spec = isRecord(pi) && isRecord(pi.dependencies) ? pi.dependencies['@hyperunix/sdk'] : undefined;
    expect(spec, 'Pi pins the SDK through the committed tarball').toBe(SDK_SPEC);
    const files = declarationFiles(join(REPO, SDK_ROOT, 'dist'));
    expect(files.length).toBeGreaterThanOrEqual(DECLARATIONS_FLOOR);
    const hits = files.map(file => [relative(join(REPO, SDK_ROOT, 'dist'), file), kindHits(readFileSync(file, 'utf8'))] as const).filter(([, count]) => count > 0);
    expect(hits, 'declarations spelling a kind literal').toStrictEqual([]);
    const result = textOf(`${SDK_ROOT}/dist/result.d.ts`);
    expect(result).toContain('export interface QueryResult<T = ClaimBody> {');
    const sidecarDeclared = result.includes('readonly extensions: Readonly<Record<string, JsonValue>>;') && result.includes('Lossless sidecar of negotiated extension frames');
    settle('A1', {declarationFiles: files.length, kindLiteralFiles: hits.length, version: typeof version === 'string' ? version : null, sidecarDeclared});
  });

  it('A1c: the kind judge flags each planted kind literal once and stays quiet on the SDK namesakes read from their files', () => {
    for (const [kind, control] of FLAGGED) {
      expect(kindHits(control), `flagged control ${control}`).toBe(1);
      expect(control.toLowerCase().replace(/[-_ ]/gu, ''), `control ${control} spells ${kind}`).toContain(kind.replace(/-/gu, ''));
    }
    expect([...new Set(FLAGGED.map(([kind]) => kind))]).toStrictEqual([...KINDS]);
    for (const {file, text} of NAMESAKES) {
      expect(textOf(`${SDK_ROOT}/dist/${file}`), `${file} carries the namesake`).toContain(text);
      expect(kindHits(text), `namesake ${text}`).toBe(0);
    }
    expect(kindHits(FLAGGED.map(([, control]) => control).join('\n')), 'the judge counts every literal of a text').toBe(FLAGGED.length);
    settle('A1c', {flagged: FLAGGED.length, kinds: KINDS.length, namesakes: NAMESAKES.length, flaggedHits: FLAGGED.length, namesakeHits: 0});
  });

  it('A2: the SDK serializer emits exactly its 23 members; a planted object member survives verbatim only at the open containers it copies whole, coerced to a string at provider_versions, dropped elsewhere', () => {
    const base = documentOf('incomplete', false);
    const members = Object.keys(resultToJson(resultFromJson(base)));
    expect(members).toStrictEqual([...REPRESENTATION_KEYS]);
    const positions = objectPaths(base);
    expect(positions.length).toBe(braces(base));
    const marker = {[SENTINEL]: CENSUS_KEY};
    const text = `${SENTINEL} ${CENSUS_KEY}`;
    const kept: string[] = [];
    const coerced: string[] = [];
    const dropped: string[] = [];
    const textKept: string[] = [];
    for (const path of positions) {
      const where = dotted(path) || '(root)';
      const output = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, marker)));
      expect(Object.keys(output), `members after a plant at ${where}`).toStrictEqual([...REPRESENTATION_KEYS]);
      const node = nodeAt(output, path);
      const value = isRecord(node) ? node[CENSUS_KEY] : undefined;
      if (value === undefined) {
        expect(JSON.stringify(output).includes(CENSUS_KEY), `the plant at ${where} is dropped, never moved`).toBe(false);
        dropped.push(where);
        continue;
      }
      expect(carriers(output), `the plant at ${where} survives at its own node only`).toStrictEqual([dotted(path)]);
      if (JSON.stringify(value) === JSON.stringify(marker)) {
        kept.push(where);
      } else {
        expect(value, `the plant at ${where} keeps only its name, its value coerced by String()`).toBe(String(marker));
        coerced.push(where);
      }
    }
    for (const path of positions) {
      const textOutput = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, text)));
      const textNode = nodeAt(textOutput, path);
      if (isRecord(textNode) && textNode[CENSUS_KEY] === text && carriers(textOutput).length === 1) textKept.push(dotted(path) || '(root)');
    }
    settle('A2', {members: members.length, objectNodes: positions.length, kept, coerced, dropped, textKept});
  });

  it('A3: Pi reads neither the sidecar nor a copied-whole body and registers hyperunix.find as its only HX read, on both registrations', () => {
    const consumed = HYPERUNIX_CONSUMED_FIELDS.map(field => field.path);
    expect(consumed.length).toBeGreaterThanOrEqual(CONSUMED_FLOOR);
    for (const anchor of ['source.execution_status.kind', 'source.coverage[].batch_id']) expect(consumed, 'a read the adapter has made since wb-6ze.7').toContain(anchor);
    const sidecarReads = consumed.filter(path => path.split('.').includes('extensions'));
    const bodyReads = consumed.filter(path => BODY_READ.test(path));
    expect(sidecarReads).toStrictEqual([]);
    expect(bodyReads).toStrictEqual([]);
    expect(BODY_READ.test('source.coverage[].body.secret') && BODY_READ.test('source.rows[]') && !BODY_READ.test('source.coverage[].batch_id'), 'the body judge reads its own controls').toBe(true);
    const rowsUse = HYPERUNIX_CONSUMED_FIELDS.find(field => field.path === 'source.rows')?.use;
    expect(rowsUse, 'rows are read for their count only').toBe('rows');
    const tokens = HX_MODULES.map(path => textOf(path).split('extensions').length - 1);
    expect(tokens).toStrictEqual(HX_MODULES.map(() => 0));
    const injected = new CapabilityRegistry();
    registerHyperUnixFind(injected, {find: async () => resultFromJson(documentOf('incomplete', false)), runtime: async () => ({version: SDK_VERSION, binarySha256: BINARY}), close: async () => {}}, WS);
    const native = new CapabilityRegistry();
    registerNativeHyperUnixFind(native, WS);
    const catalogs = [injected, native].map(registry => registry.catalogSnapshot().map(entry => entry.descriptor));
    const ids = catalogs.map(catalog => catalog.map(descriptor => descriptor.id));
    expect(ids).toStrictEqual([[...RECONCILE_EVIDENCE_READS.hyperunix], [...RECONCILE_EVIDENCE_READS.hyperunix]]);
    // Each registration is named by its own descriptor text, so a census reading one registration twice is refused.
    const registrations = catalogs.map(catalog => catalog.map(descriptor => descriptor.description));
    settle('A3', {sidecarReads: sidecarReads.length, bodyReads: bodyReads.length, rowsUse: rowsUse ?? null, sidecarTokens: tokens.reduce((sum, n) => sum + n, 0), reads: ids, registrations});
  });

  it('B1: every reading carrying each constructed lineage record in the sidecar projects strictEqual and byte-identical, adapter and evidence alike', () => {
    let adapter = 0;
    let evidence = 0;
    let delivered = 0;
    let sentinelHits = 0;
    for (const row of READINGS) {
      const base = readingOf(row);
      for (const item of PLANTS) {
        const planted = readingOf(row, sidecar(item));
        expect(JSON.stringify(nodeAt(planted, ['source', 'extensions', CENSUS_KEY])), `${row.id}/${item.id} carries its record`).toBe(JSON.stringify(item.record));
        delivered++;
        for (const context of CONTEXTS) {
          const want = topologyOf(base, context);
          const got = topologyOf(planted, context);
          expect(got, `${row.id}/${item.id}`).toStrictEqual(want);
          expect(JSON.stringify(got)).toBe(JSON.stringify(want));
          if (leaks(got)) sentinelHits++;
          adapter++;
        }
        expect(evidenceOf(planted), `${row.id}/${item.id} native evidence`).toStrictEqual(evidenceOf(base));
        if (leaks(evidenceOf(planted))) sentinelHits++;
        evidence++;
      }
    }
    expect(sentinelHits).toBe(0);
    const leak = providerShaped(documentOf('incomplete', false, {}, `find-${SENTINEL}`));
    expect(leaks(topologyOf(leak, PLAIN)), 'the leak judge sees a sentinel the adapter does show').toBe(true);
    settle('B1', {readings: READINGS.length, plants: PLANTS.length, contexts: CONTEXTS.length, adapter, evidence, delivered, sentinelHits});
  });

  it('B2: through registerHyperUnixFind every plant at every node of every reading is judged the modelled whole output, the plain output plus the record wherever the codec keeps it, by a judge held in every context it decides', async () => {
    const plants = new Set<string>();
    const nodes: Record<string, number> = {};
    const kept: Record<string, number> = {};
    // Every count below grows only on a comparison that holds, so a deleted expect still reds the witness under a moving provider.
    const unmoved: Record<string, number> = {model: 0, plain: 0};
    const tally = (judgment: Judgment): void => {
      for (const leg of judgment.judged) if (!judgment.moved.includes(leg)) unmoved[leg] = (unmoved[leg] ?? 0) + 1;
    };
    // HELD (wb-57n1 respin 2, ruling R-B146): in every context the judge decides, each held control is judged moved on every leg
    // that context's own judgment judged, so a judge blind in any one context (a node, a reading, a plant, the joint) reds there.
    // Each context is held once, under its own name (wb-bv75): a second hold of a name is refused here, and each control its hold
    // judged moved is kept per context (heldAt) by the node it moved, read back from that control (movedAt; the wb-bv75 respin 1),
    // beside the totals, so the anchors below read each context, each of its nodes and each reading. A control counts only as the
    // output its hold was handed plus exactly its MOVED member (movedOnly; wb-pgzz), so the node it is kept by is every node it
    // moved: a co-move, a control that also moves its output beside its mark, would carry the judge's sight to a node movedAt
    // never reads, and a co-move of the forms movedOnly's own controls hold (below) is refused here and counts nothing.
    const held: Record<Held, number> = {'beside source': 0, 'inside source': 0};
    const heldAt = new Map<string, Record<Held, string[]>>();
    const hold = (output: JsonValue, judgment: Judgment, base: Json, plain: JsonValue, paths: readonly Path[], record: Json, at: string): void => {
      expect(heldAt.has(at), `${at}: the context is held once`).toBe(false);
      // A second hold, were that refusal deleted, adds to the first, so its context still reads off its anchor below.
      const here = heldAt.get(at) ?? {'beside source': [], 'inside source': []};
      heldAt.set(at, here);
      const controls = heldOf(output, paths);
      const everyLeg: Judgment = {judged: judgment.judged, moved: judgment.judged};
      for (const kind of HELD) {
        for (const control of controls[kind]) {
          const seen = judgeWhole(control, base, plain, paths, record);
          expect(seen, `${at}: the judge sees its held control ${kind} on every leg`).toStrictEqual(everyLeg);
          const exact = movedOnly(control, output);
          expect(exact, `${at}: its held control ${kind} is the context's output plus exactly its MOVED member`).toBe(true);
          if (same(seen, everyLeg) && exact) {
            held[kind]++;
            here[kind].push(movedAt(control));
          }
        }
      }
    };
    let positions: string[] = [];
    let compared = 0;
    let together = 0;
    for (const row of READINGS) {
      const base = documentOf(row.kind, row.licensed);
      const plain = await provided(base);
      const bare = judgeWhole(plain, base, plain, [], {});
      expect(bare, `${row.id}: the plain output is the model`).toStrictEqual({judged: ['model'], moved: []});
      tally(bare);
      hold(plain, bare, base, plain, [], {}, `${row.id}: the plain output`);
      const all = objectPaths(base);
      expect(all.length, `${row.id}: one node per object of the document, counted from its JSON text`).toBe(braces(base));
      const plainTopologies = CONTEXTS.map(context => topologyOf(plain, context));
      const plainEvidence = evidenceOf(plain);
      let keptAt: string[] | undefined;
      for (const item of PLANTS) {
        const keptHere: Path[] = [];
        let arrivedFirst: unknown;
        for (const path of all) {
          const output = await provided(plantedAt(base, path, CENSUS_KEY, item.record));
          const at = `${row.id}/${item.id} at ${dotted(path) || '(root)'}`;
          const judgment = judgeWhole(output, base, plain, [path], item.record);
          expect(judgment.moved, `${at}: the whole provider output moved`).toStrictEqual([]);
          tally(judgment);
          hold(output, judgment, base, plain, [path], item.record, at);
          if (!judgment.judged.includes('plain')) continue;
          const arrived = nodeAt(output, ['source', ...path, CENSUS_KEY]);
          expect(JSON.stringify(arrived), `${at}: the record arrives verbatim`).toBe(JSON.stringify(item.record));
          arrivedFirst ??= arrived;
          const topologies = CONTEXTS.map(context => topologyOf(output, context));
          expect(topologies, `${at}: the projection under both host contexts`).toStrictEqual(plainTopologies);
          const evidence = evidenceOf(output);
          expect(evidence, `${at}: native evidence`).toStrictEqual(plainEvidence);
          if (same(arrived, item.record) && same(topologies, plainTopologies) && same(evidence, plainEvidence)) compared++;
          keptHere.push(path);
        }
        const names = keptHere.map(dotted);
        keptAt ??= names;
        expect(names, `${row.id}/${item.id}: the codec keeps every plant at the same nodes`).toStrictEqual(keptAt);
        const joint = judgeWhole(await provided(plantedEach(base, keptHere, item.record)), base, plain, keptHere, item.record);
        expect(joint, `${row.id}/${item.id} at every kept node at once`).toStrictEqual({judged: ['model', 'plain'], moved: []});
        if (same(joint, {judged: ['model', 'plain'], moved: []})) together++;
        // The joint's held controls, on the output for the same planted document.
        hold(await provided(plantedEach(base, keptHere, item.record)), joint, base, plain, keptHere, item.record, `${row.id}/${item.id} at every kept node at once`);
        // The witness carries each plant as it arrived, read back from the provider's output, never the loop's own record.
        plants.add(`${item.id}:${signatureOf(arrivedFirst)}`);
      }
      nodes[row.id] = all.length;
      kept[row.id] = keptAt?.length ?? 0;
      if (row.id === 'R05') positions = keptAt ?? [];
    }
    // The judge's controls (wb-57n1 respin), on the delivered output for R05 with the full record P9 at rows.0: every single-edit move
    // of that output (EDITS), inside source (coverage_summary, the delivered rows, the record) and beside it alike, is judged moved on
    // both legs and the delivered output itself on neither, so a judge blind to a region, to key or element order, to a value's type,
    // to a letter's case or to a trailing space reds here. The added count is re-derived from the output's own JSON text.
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    expect(judgeWhole(output, base, plain, [first], full.record), 'the control output itself is unmoved').toStrictEqual({judged: ['model', 'plain'], moved: []});
    const edits = editsOf(output);
    expect(edits.added.length, 'one added member per object node of the output, counted from its JSON text').toBe(braces(output));
    // Every kind's count against the output's JSON text as the platform's parser reads it (respin 2: the G24C1 coordinated hollow).
    const counted = textCounts(JSON.stringify(output));
    for (const edit of EDITS) expect(edits[edit].length, `as many ${edit} controls as the output's JSON text holds`).toBe(counted[edit]);
    // Each control's identity, read back from the control itself (identityOf), against the candidates the parser's reading of the
    // output's JSON text names (textEdits; wb-pgzz respin 2): a count-preserving swap of which node a control edits reds here, and
    // identified grows only on an identity list that holds.
    const textual = textEdits(JSON.stringify(output));
    const identified: Record<string, number> = {reader: 0, placer: 0, controls: 0, 'beside source': 0, 'inside source': 0};
    for (const edit of EDITS) {
      const identities = edits[edit].map(control => identityOf(output, control)).sort();
      const candidates = [...textual[edit]].sort();
      expect(identities, `each ${edit} control, read back from itself, is one candidate the output's JSON text names, each once`).toStrictEqual(candidates);
      // Respin 3: each member a control adds is its node's last member (addedLast, read back from the control itself).
      const placed = edits[edit].filter(control => addedLast(output, control)).length;
      expect(placed, `each ${edit} control adds each member it adds as its node's last member`).toBe(edits[edit].length);
      if (same(identities, candidates) && placed === edits[edit].length) identified.controls += identities.length;
    }
    // identityOf's own controls (wb-pgzz respin 2), on the same output: a difference of each form the generators never write - a
    // member added with another value than true, a node turned by two, two single edits at once, a member renamed, an element
    // appended - and the output itself, each read back as its literal identity, so a reader that names an added member without
    // its value, a turn without its amount, only one of two differences, or a renamed member or an appended element as one single
    // edit, reds here even while every generator's control keeps its identity; identified.reader grows only when all hold, and S
    // pins READER's count.
    const readerAs = [
      plantedAt(output, [], FOREIGN, false),
      editedAt(output, [], node => Object.fromEntries([...membersOf(node).slice(2), ...membersOf(node).slice(0, 2)])),
      editedAt(editedAt(output, ['source', 'terminal'], () => 'partial'), ['source', 'status', 'exit_code'], () => 1),
      editedAt(output, ['runtime'], node => Object.fromEntries(membersOf(node).map(([name, value]) => [name === 'version' ? 'release' : name, value]))),
      editedAt(output, ['source', 'diagnostics'], node => [...elementsOf(node), 'appended']),
      output,
    ].map(control => identityOf(output, control));
    expect(readerAs, 'identityOf reads each of its own controls as its literal identity (READER)').toStrictEqual([...READER]);
    identified.reader = same(readerAs, READER) ? readerAs.length : 0;
    // addedLast's own controls (wb-pgzz respin 3), on the same output: FOREIGN added as the root's last member, as its first, as
    // source.rows.0's first beside its record and between runtime's two members, and the output itself, each read as PLACES states,
    // so a place reader blind to a member added at the first place, inside source or between two members, or one that reads every
    // added member out of place, reds here even while every generator's control keeps its place; identified.placer grows only
    // when all hold, and S pins PLACES' count.
    const firstAt = (value: JsonValue, path: Path): JsonValue => editedAt(value, path, node => Object.fromEntries([[FOREIGN, true], ...membersOf(node)]));
    const placedAs = [
      plantedAt(output, [], FOREIGN, true),
      firstAt(output, []),
      firstAt(output, ['source', 'rows', 0]),
      editedAt(output, ['runtime'], node => Object.fromEntries([...membersOf(node).slice(0, 1), [FOREIGN, true], ...membersOf(node).slice(1)])),
      output,
    ].map(control => addedLast(output, control));
    expect(placedAs, 'addedLast reads each of its own controls as PLACES states').toStrictEqual([...PLACES]);
    identified.placer = same(placedAs, PLACES) ? placedAs.length : 0;
    const controls: Record<string, JsonValue> = {at: `R05/${full.id} at ${dotted(first)}`};
    for (const edit of EDITS) {
      const seen = edits[edit].filter(control => JSON.stringify(judgeWhole(control, base, plain, [first], full.record).moved) === JSON.stringify(['model', 'plain'])).length;
      expect(seen, `the judge sees every ${edit} move on both legs`).toBe(edits[edit].length);
      controls[edit] = seen;
    }
    // The exactness judge's own controls (wb-pgzz), on the same output and only there: each of its held controls is kept, and each
    // co-move below (the held control with its output also moved by one single edit beside the mark) is refused, so an exactness
    // judge that keeps one of them reds here. (1) Every EDITS control of that output marked MOVED at the held control's node,
    // wherever the edit leaves there an object not yet carrying MOVED; each kind's count is held to the output's JSON text
    // (textCounts) less the candidates that mark that node or remove it - its own added candidate, and the removal of each member
    // on its path (rows holds two elements, so removing the first leaves an object at rows.0) -, never to the marked set or its
    // literal (respin 1, the cut #1 refusal's U3). (2) The COMOVES (respin 1, its U1 and U2), each kind's count held to the same
    // text as the platform's parser reads it: FOREIGN added at each object node (its objects), each string naming one of
    // READINGS' coverages moved to each other one (those strings, once per other coverage), each number nudged (its numbers), and
    // every kind together. Each count grows only on a refusal. (3) Respin 2 (the cut #2 refusal's U1 and U2): each marked co-move
    // and each COMOVES co-move is read back from itself, less its MOVED mark (identityOf), and each kind's identities, as one
    // sorted list, are held to the candidates the parser's reading of the output's JSON text names (textEdits less those at the
    // mark, textComoves), so a generator swap that keeps every count (every co-move of a kind at one node, or at one target
    // coverage) reds here; identified grows only on an identity list that holds. (4) Respin 3 (the cut #3 refusal's U1 and U2, the
    // enumerate-the-resolvable cut R-B518 ordered): each co-move is held to the held control itself - each marked co-move's mark,
    // read back against its own unmarked self, is the held control's one difference from the output; each COMOVES co-move reads
    // back against the held control as its one candidate - so its mark (MOVED's node, its value and its place) is the held
    // control's own, and each member it adds is its node's last wherever addedLast reaches that node; identified grows only when
    // those hold too. addedLast reaches no node below an array whose length a co-move's own edit changes, so remarks reads each
    // marked co-move's mark place against its own unmarked self as well, which reaches the mark's node of every marked co-move,
    // the two inside-source ones that remove a source.rows element included (wb-lt9r; B4 holds that reader, and wb-pgzz cut #5's
    // residual RS6 and its quiet row Q6 are retired).
    const comoves: Record<string, JsonValue> = {};
    const exactness: Record<string, JsonValue> = {};
    const outputText = JSON.stringify(output);
    const coverageStrings = parsedCount(outputText, value => typeof value === 'string' && COVERAGES.includes(value));
    const numbers = parsedCount(outputText, value => typeof value === 'number');
    const outside: Record<Comove, number> = {foreign: counted.added, coverage: coverageStrings * (COVERAGES.length - 1), nudged: numbers};
    const textualToo = textComoves(outputText);
    for (const kind of HELD) {
      for (const control of heldOf(output, [first])[kind]) {
        expect(movedOnly(control, output), `${kind}: the exactness judge keeps the held control`).toBe(true);
        const mark = pathOf(movedAt(control));
        // The held control's own mark (respin 3), read back from it against the output: MOVED added, set to true, at its node
        // (heldMark), as that node's last member (heldLast) - the mark each co-move below must carry.
        const heldMark = identityOf(output, control);
        const heldLast = addedLast(output, control);
        expect(heldLast, `${kind}: the held control adds its mark as its node's last member`).toBe(true);
        const refused: Record<string, number> = {};
        // The candidates that mark the held control's node or remove it: its own added candidate (MOVED is there already) and the
        // removal of each member on its path; no other edit leaves anything but an object without MOVED there.
        const atMark: Record<Edit, number> = {added: 1, removed: mark.filter(step => typeof step === 'string').length, changed: 0, retyped: 0, recased: 0, spaced: 0, rotated: 0};
        for (const edit of EDITS) {
          const marked = edits[edit].filter(moved => {
            const node = nodeAt(moved, mark);
            return isRecord(node) && !Object.hasOwn(node, MOVED);
          }).map(moved => plantedAt(moved, mark, MOVED, true));
          expect(marked.length, `${kind}: as many marked ${edit} co-moves as the output's JSON text holds, less those at the mark`).toBe(counted[edit] - atMark[edit]);
          refused[edit] = marked.filter(comove => !movedOnly(comove, output)).length;
          expect(refused[edit], `${kind}: the exactness judge refuses every ${edit} co-move`).toBe(marked.length);
          const markedAs = marked.map(comove => identityOf(output, withoutMember(comove, mark, MOVED))).sort();
          const markable = lessAtMark(textual[edit], mark).sort();
          expect(markedAs, `${kind}: each marked ${edit} co-move, read back from itself less its mark, is one candidate the output's JSON text names, less those at the mark, each once`).toStrictEqual(markable);
          // Respin 3 (refusal #3's U1): each marked co-move carries the held control's own mark - read back against its own
          // unmarked self it is the held control's one difference from the output (heldMark: MOVED's node and value) - and adds
          // each member it adds as its node's last member wherever addedLast reaches that node (remarks: the mark's place too, read
          // against its own unmarked self as well as against the output, so at every marked co-move; wb-lt9r, B4).
          const remarked = marked.filter(comove => remarks(comove, output, mark, heldMark)).length;
          expect(remarked, `${kind}: each marked ${edit} co-move carries the held control's own mark (its node, its value and its place) and adds each member last where addedLast reaches it`).toBe(marked.length);
          if (same(markedAs, markable) && heldLast && remarked === marked.length) identified[kind] += marked.length;
        }
        comoves[kind] = refused;
        const others = comovesOf(control, output);
        const refusedToo: Record<string, number> = {};
        for (const comove of COMOVES) {
          expect(others[comove].length, `${kind}: as many ${comove} co-moves as the output's JSON text holds`).toBe(outside[comove]);
          refusedToo[comove] = others[comove].filter(moved => !movedOnly(moved, output)).length;
          expect(refusedToo[comove], `${kind}: the exactness judge refuses every ${comove} co-move`).toBe(others[comove].length);
          const movedAs = others[comove].map(moved => identityOf(output, withoutMember(moved, mark, MOVED))).sort();
          const movable = [...textualToo[comove]].sort();
          expect(movedAs, `${kind}: each ${comove} co-move, read back from itself less its mark, is one candidate the output's JSON text names, each once`).toStrictEqual(movable);
          // Respin 3 (refusal #3's U2): each COMOVES co-move, read back against the held control itself, is that same one candidate,
          // so its mark is the held control's own (MOVED's node, value and place), and it adds FOREIGN as its node's last member.
          const heldAs = others[comove].map(moved => identityOf(control, moved)).sort();
          expect(heldAs, `${kind}: each ${comove} co-move, read back against the held control itself, is one candidate the output's JSON text names, each once`).toStrictEqual(movable);
          const placed = others[comove].filter(moved => addedLast(control, moved)).length;
          expect(placed, `${kind}: each ${comove} co-move adds each member it adds as its node's last member`).toBe(others[comove].length);
          if (same(movedAs, movable) && heldLast && same(heldAs, movable) && placed === others[comove].length) identified[kind] += others[comove].length;
        }
        const allKinds = COMOVES.reduce((sum, comove) => sum + others[comove].length, 0);
        expect(allKinds, `${kind}: every co-move kind together, against the output's JSON text`).toBe(counted.added + coverageStrings * (COVERAGES.length - 1) + numbers);
        exactness[kind] = refusedToo;
      }
    }
    // HELD against counts and nodes read outside the sweep (wb-zf7v, the landing-744 F1 cure; per reading and per context,
    // wb-bv75, the landing-773 F1 cure; per node, its respin 1): every context the judge decides - each reading's plain output,
    // each plant at each object node, each plant at every kept node at once - is held once, and each control its hold judged moved
    // grows its kind's counts and is kept by the node it moved, read back from the control (movedAt). Two anchors read the counts:
    // over READINGS, and per reading (beside source 1 + PLANTS.length x (N_r + 1) and inside source 1 + PLANTS.length x (N_r + K_r),
    // N_r the reading document's braces and K_r its codecKept count). The third reads the nodes, per context by name: beside source
    // the output's root, once; inside source each node the context planted, once each and in document order - source itself for a
    // plain output, the node it planted for a plant at a node, and for a plant at every kept node at once the nodes at which the
    // codec keeps that plant in the reading's document (codecKeptAt) -, the names built here from READINGS, PLANTS and each
    // document's object paths. So a hold skipped, a control left unjudged, or a context or a control held twice moves that context
    // off its anchor, even when the witness literal moves with it, when another context's count is moved to offset it in its
    // reading's sum or in the total, and when another of its own nodes is held twice to offset it in the context's count; a
    // control that moves its output beside its MOVED mark by a co-move of the forms movedOnly's own controls hold counts nothing
    // (movedOnly, wb-pgzz), so it moves its context off these anchors too; a hold that counts a context's controls
    // without judging them, records for a control the node of another control than the one it judged, or is handed under its name
    // another output or another context's legs, is NOT CLAIMED.
    const documents = READINGS.map(row => documentOf(row.kind, row.licensed));
    const objects = documents.reduce((sum, document) => sum + braces(document), 0);
    const keptByCodec = documents.reduce((sum, document) => sum + codecKept(document, full.record), 0);
    expect(held, "over READINGS, each kind's held count against the contexts and planted nodes counted outside the sweep").toStrictEqual({
      'beside source': READINGS.length + PLANTS.length * (objects + READINGS.length),
      'inside source': READINGS.length + PLANTS.length * (objects + keptByCodec),
    });
    const named: Record<string, Record<Held, string[]>> = {};
    const heldBy: Record<Held, Record<string, number>> = {'beside source': {}, 'inside source': {}};
    const anchors: Record<Held, Record<string, number>> = {'beside source': {}, 'inside source': {}};
    let heldOnce = 0;
    /** The name movedAt gives a control added inside source at `path` of the document (source itself for the empty path). */
    const insideAt = (path: Path): string => dotted(['source', ...path]);
    for (const row of READINGS) {
      const document = documentOf(row.kind, row.licensed);
      const objectCount = braces(document);
      const keptCount = codecKept(document, full.record);
      // Each context's name with the nodes its inside-source controls must be read back at, in document order: source itself for
      // the plain output, the node it planted for a plant at a node, and the nodes the codec keeps the plant at (codecKeptAt) for a
      // plant at every kept node at once; beside source, the output's root for every context.
      const contexts: [string, string[]][] = [[`${row.id}: the plain output`, [insideAt([])]]];
      for (const item of PLANTS) {
        for (const path of objectPaths(document)) contexts.push([`${row.id}/${item.id} at ${dotted(path) || '(root)'}`, [insideAt(path)]]);
        contexts.push([`${row.id}/${item.id} at every kept node at once`, codecKeptAt(document, item.record).map(insideAt)]);
      }
      for (const [name, nodes] of contexts) {
        named[name] = {'beside source': ['(root)'], 'inside source': nodes};
        if (same(heldAt.get(name), named[name])) heldOnce++;
      }
      const anchor: Record<Held, number> = {'beside source': 1 + PLANTS.length * (objectCount + 1), 'inside source': 1 + PLANTS.length * (objectCount + keptCount)};
      for (const kind of HELD) {
        heldBy[kind][row.id] = contexts.reduce((sum, [name]) => sum + (heldAt.get(name)?.[kind].length ?? 0), 0);
        anchors[kind][row.id] = anchor[kind];
      }
    }
    expect(heldBy, "per reading, each kind's held count against the reading's contexts and planted nodes counted outside the sweep").toStrictEqual(anchors);
    expect(Object.fromEntries(heldAt), "per context, by name: held once, each control its hold judged moved read back at the node it moved - beside source the output's root, inside source each node the context planted, once each and in document order").toStrictEqual(named);
    settle('B2', {plants: [...plants], positions, nodes, kept, unmoved, compared, together, held, heldBy, heldOnce, identified, controls, exactness, comoves});
  }, 120_000);

  it('B3: the full record planted at every object node of a provider reading moves no output byte', () => {
    const full = plantOf('P9');
    const counts: number[] = [];
    for (const row of READINGS.filter(item => item.id === 'R01' || item.id === 'R05')) {
      const base = readingOf(row);
      const positions = objectPaths(base);
      expect(positions.length, `${row.id}: one position per object node`).toBe(braces(base));
      for (const path of positions) {
        const planted = plantedAt(base, path, CENSUS_KEY, full.record);
        expect(JSON.stringify(nodeAt(planted, [...path, CENSUS_KEY]))).toBe(JSON.stringify(full.record));
        for (const context of CONTEXTS) expect(JSON.stringify(topologyOf(planted, context)), `${row.id} at ${dotted(path) || '(root)'}`).toBe(JSON.stringify(topologyOf(base, context)));
        expect(evidenceOf(planted)).toStrictEqual(evidenceOf(base));
      }
      counts.push(positions.length);
    }
    settle('B3', {readings: ['R01', 'R05'], positions: counts});
  });

  it('B4: the mark reader of B2 reads the mark place of each marked co-move against its own unmarked self, so a mark written at any place of its node but the last is refused at every marked co-move, the two whose own edit changes the length of an array on the path to the mark included', async () => {
    // wb-lt9r (the R-B542 exit of wb-pgzz refusal #4; wb-pgzz cut #5's residual RS6 and its quiet row Q6 retired): B2's marked
    // co-moves at R05/P9 at rows.0, each EDITS control marked MOVED at the held control's node, read by B2's own mark reader
    // (remarks), which reads the mark's place against the co-move's own unmarked self (the two differ by the mark alone, so
    // addedLast reaches the mark's node of every one) as well as against the output (where addedLast reaches nothing below an
    // array pair of two lengths). The page is refusal #4's GP6-GEN-MARKED-FIRST-SHORT: the mark written as its node's first member
    // exactly where the co-move's own edit changes the length of an array on the path to the mark (an array the output holds
    // there, held at another length or not at all), every other one as B2's generator writes it. Those co-moves are named apart,
    // from the output's JSON text as the parser reads it (the removals of an element of each array on the mark's path, textEdits),
    // and each mark the page writes out of place is read from its node's member order directly, never through remarks or
    // addedLast: remarks refuses exactly those marks and keeps every other one, co-move by co-move. The analog writes each marked
    // co-move's mark at each place of its node but the last, its first place (GP6-GEN-MARKED-FIRST-ALL's) among them: remarks
    // refuses every one, so a reader that reads the mark's place as anything less than its node's last member reds here. A reader
    // that reaches fewer marks, a page silenced or widened, a marked or short set read off its anchor, an analog that writes fewer
    // places, or a held control skipped moves this row's witness.
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    const edits = editsOf(output);
    const outputText = JSON.stringify(output);
    const counted = textCounts(outputText);
    const candidates = EDITS.reduce((sum, edit) => sum + counted[edit], 0);
    const removals = textEdits(outputText).removed;
    const arrays = parsedNodes(outputText).filter(({value}) => Array.isArray(value)).map(({path}) => path);
    /** `comove` with MOVED moved to place `at` among the members of the node at `mark` (0 is its first place). */
    const markAt = (comove: JsonValue, mark: Path, at: number): JsonValue =>
      editedAt(comove, mark, node => {
        const others = membersOf(node).filter(([name]) => name !== MOVED);
        return Object.fromEntries([...others.slice(0, at), [MOVED, true], ...others.slice(at)]);
      });
    /** Whether `moved` holds, at an array the output holds on the path to `mark`, an array of another length or none. */
    const shortens = (moved: JsonValue, mark: Path): boolean =>
      mark.some((_step, index) => {
        const was = nodeAt(output, mark.slice(0, index));
        const now = nodeAt(moved, mark.slice(0, index));
        return Array.isArray(was) && !(Array.isArray(now) && now.length === was.length);
      });
    const held: Record<string, JsonValue> = {};
    for (const kind of HELD) {
      for (const control of heldOf(output, [first])[kind]) {
        const mark = pathOf(movedAt(control));
        const heldMark: string = identityOf(output, control);
        // The co-moves whose own edit changes the length of an array on the mark's path, named from the output's JSON text: the
        // removals of an element of each array the parser reads on that path, read apart from the generators and from shortens.
        const onPath = arrays.filter(path => path.length < mark.length && same(mark.slice(0, path.length), path)).map(path => `${JSON.stringify(path)} - [`);
        const anchored = removals.filter(candidate => onPath.some(prefix => candidate.startsWith(prefix))).sort();
        const short: string[] = [];
        let marked = 0;
        let misplaced = 0;
        let kept = 0;
        let agreed = 0;
        let places = 0;
        let refused = 0;
        let seen = 0;
        for (const edit of EDITS) {
          for (const moved of edits[edit]) {
            const node = nodeAt(moved, mark);
            if (!isRecord(node) || Object.hasOwn(node, MOVED)) continue;
            marked++;
            const comove = plantedAt(moved, mark, MOVED, true);
            const quiet = shortens(moved, mark);
            if (quiet) short.push(identityOf(output, moved));
            const page = quiet ? markAt(comove, mark, 0) : comove;
            const names = membersOf(nodeAt(page, mark) as JsonValue).map(([name]) => name);
            const last = names[names.length - 1] === MOVED;
            if (!last) misplaced++;
            const keeps = remarks(page, output, mark, heldMark);
            if (keeps) kept++;
            if (keeps === last) agreed++;
            const others = Object.keys(node).length;
            let refusedHere = 0;
            for (let at = 0; at < others; at++) if (!remarks(markAt(comove, mark, at), output, mark, heldMark)) refusedHere++;
            places += others;
            refused += refusedHere;
            if (others > 0 && refusedHere === others) seen++;
          }
        }
        expect(marked, `${kind}: as many marked co-moves as the output's JSON text holds, less those at the mark`).toBe(candidates - 1 - mark.filter(step => typeof step === 'string').length);
        expect([...short].sort(), `${kind}: the co-moves whose own edit changes the length of an array on the mark's path are the removals of an element of such an array the output's JSON text names`).toStrictEqual(anchored);
        expect(misplaced, `${kind}: the page writes out of place exactly the marks of those co-moves`).toBe(short.length);
        expect(agreed, `${kind}: B2's mark reader refuses each mark the page writes out of place and keeps each other one`).toBe(marked);
        expect(seen, `${kind}: B2's mark reader refuses every marked co-move with its mark at each place of its node but the last`).toBe(marked);
        held[kind] = {mark: movedAt(control), marked, short, misplaced, kept, agreed, places, refused, seen};
      }
    }
    settle('B4', {at: `R05/${full.id} at ${dotted(first)}`, held});
  }, 60_000);

  it('N1: no projection states any relation but the one display-grouping edge from the invoking operation', () => {
    let topologies = 0;
    let relations = 0;
    const kinds = new Set<string>();
    for (const row of READINGS) {
      for (const extensions of [{}, ...PLANTS.map(sidecar)]) {
        const value = readingOf(row, extensions);
        expect(topologyOf(value, PLAIN).relations).toStrictEqual([]);
        const invoked = topologyOf(value, INVOKED);
        const [snapshot] = invoked.snapshots;
        expect(invoked.relations).toStrictEqual([{scope, from: operationRef, to: snapshot?.source, kind: 'grouping',
          provenance: {source: 'hyperunix', observedAt: INVOKED.observedAt}}]);
        for (const relation of invoked.relations) kinds.add(relation.kind);
        topologies += 2;
        relations += invoked.relations.length;
      }
    }
    settle('N1', {topologies, relations, kinds: [...kinds]});
  });

  it('N2: a sidecar walk record claiming complete coverage leaves every reading at its own coverage, partial never lifted', () => {
    const walked = plantOf('P7');
    const tally: Record<Coverage, number> = {complete: 0, partial: 0, unknown: 0};
    for (const row of READINGS) {
      for (const context of CONTEXTS) {
        const [snapshot] = topologyOf(readingOf(row, sidecar(walked)), context).snapshots;
        expect(snapshot?.coverage, row.id).toBe(row.coverage);
        if (row.coverage === 'partial') {
          expect(snapshot?.node.statusTone, row.id).toBe('unknown');
          expect(snapshot?.node.statusText, row.id).toContain('absence not licensed');
        }
        if (row.coverage === 'complete') expect(snapshot?.node.statusTone, row.id).toBe('success');
        if (row.coverage === 'unknown') expect(snapshot?.node.statusTone, row.id).toBe('failure');
      }
      tally[row.coverage]++;
    }
    settle('N2', {...tally});
  });

  it('Q1 (residual RS1): a derived or namespaced kind spelling stays quiet under the kind judge', () => {
    const hits = DERIVED.map(kindHits);
    expect(hits).toStrictEqual(DERIVED.map(() => 0));
    settle('Q1', {shapes: DERIVED.length, hits: hits.reduce((sum, n) => sum + n, 0)});
  });

  it('Q2 (residual RS2): an identifier-only kind declaration stays quiet under the kind judge', () => {
    const hits = IDENTIFIERS.map(kindHits);
    expect(hits).toStrictEqual(IDENTIFIERS.map(() => 0));
    settle('Q2', {shapes: IDENTIFIERS.length, hits: hits.reduce((sum, n) => sum + n, 0)});
  });

  it('Q3 (residual RS3): a lineage record inside a copied-whole row or certificate body adds no serializer member', () => {
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const bodies: Path[] = [['rows', 0], ['coverage', 0, 'body']];
    const members: number[] = [];
    for (const path of bodies) {
      const output = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, full.record)));
      expect(Object.keys(output)).toStrictEqual([...REPRESENTATION_KEYS]);
      expect(JSON.stringify(nodeAt(output, [...path, CENSUS_KEY]))).toBe(JSON.stringify(full.record));
      members.push(Object.keys(output).length);
    }
    settle('Q3', {bodies: bodies.map(dotted), members});
  });

  it('Q4 (residual RS4): a judge blind to one scalar outside R05/P9 at rows.0 sees every held control at another node, reading and plant and at the joint, and misses that scalar there, while the EDITS controls at R05/P9 at rows.0 see it', async () => {
    // The quiet page: judgeWhole's comparison read with source.transport.frames dropped from both sides (G24C1's member). Each
    // context below differs from R05/P9 at rows.0 in one dimension of the judge's own context, where only HELD holds the judge.
    const framesless = (value: JsonValue): string => JSON.stringify(withoutMember(value, ['source', 'transport'], 'frames'));
    const page = (output: JsonValue, base: Json, plain: JsonValue, paths: readonly Path[], record: Json): Judgment => {
      const legs = legsOf(base, plain, paths, record);
      const read = framesless(output);
      return {judged: legs.map(([leg]) => leg), moved: legs.flatMap(([leg, expected]) => (framesless(expected) === read ? [] : [leg]))};
    };
    const readingOfId = (id: string): Reading => {
      const found = READINGS.find(item => item.id === id);
      if (found === undefined) throw new Error(`no reading ${id}`);
      return found;
    };
    const kept = OPEN_POSITIONS.map(pathOf);
    const pages: readonly (readonly [string, string, readonly Path[], string])[] = [
      ['R05', 'P9', [['coverage', 0, 'cause']], 'coverage.0.cause'], ['R01', 'P9', [['rows', 0]], 'rows.0'], ['R05', 'P1', [['rows', 0]], 'rows.0'],
      ['R05', 'P9', kept, 'every kept node'],
    ];
    const contexts: string[] = [];
    for (const [id, plantId, paths, where] of pages) {
      const reading = readingOfId(id);
      const base = documentOf(reading.kind, reading.licensed);
      const plain = await provided(base);
      const record = plantOf(plantId).record;
      const output = await provided(plantedEach(base, paths, record));
      const at = `${id}/${plantId} at ${where}`;
      const judgment = judgeWhole(output, base, plain, paths, record);
      expect(judgment, `${at}: the output is unmoved`).toStrictEqual({judged: ['model', 'plain'], moved: []});
      const everyLeg: Judgment = {judged: judgment.judged, moved: judgment.judged};
      let quiet = 0;
      const controls = heldOf(output, paths);
      for (const kind of HELD) {
        for (const control of controls[kind]) {
          expect(judgeWhole(control, base, plain, paths, record), `${at}: the judge sees its held control ${kind}`).toStrictEqual(everyLeg);
          const read = page(control, base, plain, paths, record);
          expect(read, `${at}: the page sees its held control ${kind} as well`).toStrictEqual(everyLeg);
          if (same(read, everyLeg)) quiet++;
        }
      }
      // Liveness: the page carries the family's blindness here - frames retyped to its own text (G8P9's move) is judged moved on
      // every leg by the judge and on none by the page.
      const move = editedAt(output, ['source', 'transport', 'frames'], frames => String(frames));
      expect(judgeWhole(move, base, plain, paths, record), `${at}: the judge sees frames retyped`).toStrictEqual(everyLeg);
      expect(page(move, base, plain, paths, record).moved, `${at}: the page misses frames retyped`).toStrictEqual([]);
      contexts.push(`${at}: held ${quiet}`);
    }
    // The analog: at R05/P9 at rows.0 the EDITS controls see the same page - it misses exactly the controls that move frames.
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    const edits = editsOf(output);
    const unseen: Record<string, number> = {};
    for (const edit of EDITS) unseen[edit] = edits[edit].filter(control => !same(page(control, base, plain, [first], full.record).moved, ['model', 'plain'])).length;
    settle('Q4', {contexts, unseen});
  }, 60_000);

  it('Q5 (residual RS5): a judge blind only to a scalar moved to another of its values, or only to two scalars exchanged, sees every EDITS control at R05/P9 at rows.0 and misses that move', async () => {
    // Two quiet pages, each judgeWhole's comparison read through one fold on both sides: 'another value' folds source.terminal
    // 'partial' onto 'complete' (blind only to a value the census's own change never writes, G8P10's move), and 'a combination'
    // orders the values of contract and runtime.version (blind only to the two exchanged, an edit of two scalars at once).
    const terminal: Path = ['source', 'terminal'];
    const contract: Path = ['contract'];
    const version: Path = ['runtime', 'version'];
    /** `value` with the values at contract and runtime.version exchanged. */
    const exchanged = (value: JsonValue): JsonValue => {
      const one = nodeAt(value, contract) as JsonValue;
      const other = nodeAt(value, version) as JsonValue;
      return editedAt(editedAt(value, contract, () => other), version, () => one);
    };
    const folds: readonly (readonly [string, (value: JsonValue) => JsonValue, (value: JsonValue) => JsonValue, string])[] = [
      ['another value', value => (nodeAt(value, terminal) === 'partial' ? editedAt(value, terminal, () => 'complete') : value),
        value => editedAt(value, terminal, () => 'partial'), 'source.terminal complete to partial'],
      ['a combination', value => {
        const one = nodeAt(value, contract);
        const other = nodeAt(value, version);
        return typeof one === 'string' && typeof other === 'string' && one > other ? exchanged(value) : value;
      }, exchanged, 'contract and runtime.version exchanged'],
    ];
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    expect(judgeWhole(output, base, plain, [first], full.record), 'the control output itself is unmoved').toStrictEqual({judged: ['model', 'plain'], moved: []});
    expect(nodeAt(output, terminal), 'the delivered output reads terminal complete').toBe('complete');
    const edits = editsOf(output);
    const pages: JsonValue[] = [];
    for (const [name, fold, move, spelled] of folds) {
      const read = (value: JsonValue): string => JSON.stringify(fold(value));
      const page = (control: JsonValue): string[] => legsOf(base, plain, [first], full.record).flatMap(([leg, expected]) => (read(expected) === read(control) ? [] : [leg]));
      const seen: Record<string, number> = {};
      for (const edit of EDITS) {
        seen[edit] = edits[edit].filter(control => same(page(control), ['model', 'plain'])).length;
        expect(seen[edit], `${name}: the page sees every ${edit} control as well`).toBe(edits[edit].length);
      }
      const moved = move(output);
      expect(read(moved) === read(output), `${name}: the move is one the page folds away`).toBe(true);
      const judge = judgeWhole(moved, base, plain, [first], full.record).moved;
      const missed = page(moved);
      expect(judge, `${name}: the judge sees ${spelled} on both legs`).toStrictEqual(['model', 'plain']);
      expect(missed, `${name}: the page misses it`).toStrictEqual([]);
      pages.push({page: name, seen, move: spelled, judge: [...judge], missed});
    }
    settle('Q5', {at: `R05/${full.id} at ${dotted(first)}`, pages});
  }, 60_000);

  it('F1: the tracked export row of wb-4ap.13 states KINDS in order and every row label and on-landing clause verbatim', () => {
    const description = exportDescription(BEAD);
    const statement = between(description, 'STATEMENT: ', '\n\nRATIONALE: ');
    expect(between(statement, 'typed directional refs ', ' and bounded').split('/')).toStrictEqual([...KINDS]);
    const artifact = `Artifact: ${between(statement, 'Artifact: ', ').')}).`;
    const never = `never ${between(statement, ', never ', ' as complete')} as complete`;
    const acceptance = [...between(description, 'ACCEPTANCE: [', ']\n\nSURFACES: ').matchAll(/(['"])(.*?)\1(?=, ['"]|$)/gsu)].map(match => match[2]);
    expect(acceptance).toHaveLength(3);
    expect(ROWS.filter(row => row.id !== 'Q').map(row => row.label)).toStrictEqual([artifact, acceptance[2], never]);
    expect([...ON_LANDING]).toStrictEqual(acceptance.slice(0, 2));
  });

  it('F2: READINGS covers exactly the execution kinds the src adapter projects, mutation outcomes refused', () => {
    const projected = HYPERUNIX_EXECUTION_KINDS.filter(kind => {
      try {
        topologyOf(providerShaped(documentOf(kind, false)), PLAIN);
        return true;
      } catch {
        return false;
      }
    });
    expect([...new Set(READINGS.map(row => row.kind))]).toStrictEqual(projected);
    expect(HYPERUNIX_EXECUTION_KINDS.filter(kind => !projected.includes(kind))).toStrictEqual(['mutation-rejected', 'mutation-partial']);
  });

  it('S: the frozen shape of rows, pins, kinds, readings, plants, members, judge controls, residuals and on-landing clauses', () => {
    expect({
      rows: ROWS.map(row => `${row.id}:${row.pins.length}`),
      pins: ROWS.flatMap(row => row.pins),
      witnesses: Object.keys(WITNESSES),
      kinds: [...KINDS],
      readings: READINGS.map(row => `${row.id}:${row.kind}:${row.licensed}:${row.coverage}`),
      plants: PLANTS.map(item => `${item.id}:${Object.keys(item.record).join('+')}`),
      members: REPRESENTATION_KEYS.length,
      flagged: FLAGGED.map(([kind]) => kind),
      namesakes: NAMESAKES.map(item => item.file),
      edits: [...EDITS],
      held: [...HELD],
      comoves: [...COMOVES],
      foreign: FOREIGN,
      reader: READER.length,
      placer: PLACES.length,
      derived: DERIVED.length,
      identifiers: IDENTIFIERS.length,
      residuals: RESIDUALS.map(item => `${item.id}:${item.quiet}`),
      onLanding: ON_LANDING.length,
    }).toStrictEqual({
      rows: ['A:4', 'B:4', 'N:2', 'Q:5'],
      pins: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'N1', 'N2', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      witnesses: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'N1', 'N2', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      kinds: ['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to'],
      readings: [
        'R01:complete:true:complete', 'R02:complete:false:partial', 'R03:complete-empty:true:complete', 'R04:complete-empty:false:partial',
        'R05:incomplete:false:partial', 'R06:incomplete:true:partial', 'R07:budget-exhausted:false:partial', 'R08:cancelled:false:partial',
        'R09:view-invalidated:false:partial', 'R10:provider-failed:false:unknown', 'R11:schema-failed:false:unknown',
        'R12:internal-failed:false:unknown', 'R13:protocol-failed:false:unknown', 'R14:usage-error:false:unknown',
      ],
      plants: ['P1:edges', 'P2:edges', 'P3:edges', 'P4:edges', 'P5:edges', 'P6:edges', 'P7:walk', 'P8:missing_edges', 'P9:edges+walk+missing_edges'],
      members: 23,
      flagged: ['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to', 'related-to', 'related-to', 'related-to'],
      namesakes: ['protocol/mutation.d.ts', 'client.d.ts', 'execution.d.ts', 'provider.d.ts'],
      edits: ['added', 'removed', 'changed', 'retyped', 'recased', 'spaced', 'rotated'],
      held: ['beside source', 'inside source'],
      comoves: ['foreign', 'coverage', 'nudged'],
      foreign: 'foreign-co-move',
      reader: 6,
      placer: 5,
      derived: 6,
      identifiers: 3,
      residuals: ['RS1:Q1', 'RS2:Q2', 'RS3:Q3', 'RS4:Q4', 'RS5:Q5'],
      onLanding: 2,
    });
  });

  it('Z: every pin ran once, in row order, against its witness', () => {
    expect(reached).toStrictEqual(ROWS.flatMap(row => row.pins));
    expect(RESIDUALS.map(item => item.quiet)).toStrictEqual(ROWS.find(row => row.id === 'Q')?.pins);
  });
});

import { rehydrateTrackerExport } from "../qa/workbench/tracker-export.mjs";
