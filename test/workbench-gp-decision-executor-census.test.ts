/**
 * wb-0lf.1 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R1, program-triage-2026-10-18 child of wb-0lf), the GP decision executor
 * census. Statement (the bead title, verbatim): "When Pi hosts a GraphPolicyCLI decision point (artifact: released GP seam
 * \u2014 handshake, GraphDataIR and reply schemas \u2014 plus an owner-decided Pi decision point), the host shall convert the GP
 * reply into a typed formula decision/executor request, validate its basis (snapshot digest, source revision), and execute it
 * only through Furnace supervision via the core-minted decision path, never directly." (the title spells each dash as the six
 * characters backslash, u, 2, 0, 1, 4).
 * Acceptance (the owner filing's Acceptance sentence, verbatim, cut at "; " into rows A, B and C, the last without its final
 * period): "a host test drives a fixture GP reply through the Pi decision point and asserts no native verb or executor request
 * is issued unless the converted decision passed basis validation and decideControl returned permitted with a core-minted
 * receipt (isCoreMintedDecision, control.ts:255); a reply whose snapshot digest differs from the observed basis yields a
 * conflict/refusal receipt and no effect; the Furnace-hosted adapter's execute/interpret path stays byte-identical."
 * The filing's own status: "nothing is claimed today (no P0)" and "Tracked gate, related edges only, never a blocker
 * (wb-4ap.12-16 style)". Row T's label is the title's trigger, verbatim.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at the trunk tip a816f2a21cbb and at the bead's Pi pin 758ec18187a5,
 * which the filing names as "core-minted decisions only @758ec18187a5"): no src module spells the vocabulary below; line 255 of
 * src/workbench/control.ts is "export function isCoreMintedDecision(decision: unknown): boolean {" at both; NATIVE_CONTROL_ACTIONS
 * keys furnace, claude-agent-sdk, forge and local-detached, so the core registers no GraphPolicyCLI provider and refuses a
 * GraphPolicyCLI target as unknown-action before it reads the projection; src/workbench/hosts/furnace-hosted.ts is one blob at
 * both (sha256 33b769b5b91a778413696031743e780a0bdc349e6e1f26c3c9841338d0225524). The fixture GP reply is the gp decision receipt
 * vendored by wb-gxd7.5 (test/fixtures/gp-sample-receipt.json, gp sample's result.decision, generator sourceSha 3f7d52cd), read
 * at its /receipt pointer and never respelled in this file; its graph_digest is "sha256:" plus the sha256 of the exact bytes of
 * the snapshot vendored by wb-gxd7.3 (test/fixtures/gp-host-adapter-snapshot.json), the value the generator's own inputs record
 * for that file; the snapshot's one source revision is observation.revisions[0]; the reply's candidates are three of the
 * snapshot's four can_execute relations (exec-a2-t3 is not one) and its sample's chosen_id is the first.
 *
 * Pi hosts no GraphPolicyCLI decision point today. The census pins that (row T) and an ARMED contract (rows A to C) that binds
 * the first decision point to come, as the wb-4ap.16 intent-host census and the wb-gxd7.3 snapshot-join census arm theirs:
 *  T, the trigger. T1: no src module spells the vocabulary (VOCABULARY: the title's two names GraphPolicyCLI and GraphDataIR,
 *    the reply's schema and kind values and its two members graph_digest and chosen_id, each a whole case-sensitive token of
 *    git's would-commit listing under src/), and the src modules that do are exactly the bound decision points in
 *    GP_DECISION_POINTS (empty both ways today: a module that starts hosting must be bound, and a bound path that names nothing
 *    is stale); the listing is shown holding at least SRC_FLOOR files and the real text of the control core and the adapter,
 *    and the reader is shown reading every member in planted text and no near token.
 *  A, B, C, armed on landing. The armed contract reads a decision point as one function over the GP reply as gp wrote it, the
 *    exact bytes Pi presented as its snapshot, the observation projection, a route from a candidate to the control request
 *    carrying its effect, and ONE injected effect seam, the only path to a native verb or an executor request. Five fixtures
 *    built from the vendored reply and snapshot run every decision point against the real control core: F1 current (the
 *    snapshot's own bytes, every observed run at its revision, an exact control grant), F2 the snapshot respelled compact
 *    (the same document, other bytes, so its digest differs from the reply's), F3 current with an observer grant only, F4
 *    current bytes with every observed run moved to the next revision, F5 the reply with its chosen_id set to exec-a2-t3,
 *    observed but no candidate. Each fixture's basis reading (valid, snapshot-mismatch, revision-mismatch or
 *    reply-unconverted) is computed by basisOf and held to the fixture's own field. Six CHECKS judge the record:
 *    effect-unvalidated (the seam was called for a reply whose converted decision fails basis validation), effect-unpermitted
 *    (handed a decision whose verdict is not 'permitted'), effect-unminted (handed a value isCoreMintedDecision refuses),
 *    effect-unrequested (handed a decision whose receipt answers() no request the drive recorded for this call, a call that
 *    recorded none included; claimed only in the forms A3 plants below (its mutants and its reader controls), each at each
 *    of its positions: for the drive, a call asking requestOf once each for the snapshot's first one to four can_execute
 *    candidates, in the snapshot's order, and once each for all four in its reverse and in one interleaving; for the
 *    check, a record of one to four requests and one to three handed decisions, each drive form's record handed one,
 *    two or three decisions, by hand and driven, among them (A3's decision records). In those forms the drive records
 *    a copy of each returned request, taken at the return, so an in-place edit of every member of a returned object
 *    afterwards edits no record, and keeps the copies in the order the call asked for
 *    them, in each of the three orders; every request of such a call asking for all four, in each of the three orders,
 *    the first, second, third and last asked, carries that call's own serial in its invocationId, and of two such calls
 *    in a row over one fixture, in each ordered pair of the three orders, neither issues an invocationId the other
 *    issued, as the serial reading reads them, claimed only in the invocationId forms A3's segment and serial plants
 *    pin, each at the serials its plants spell (the segment plants at two digits and at three, the serial plants at one
 *    and at three, the three-digit plants wb-vuoz cut #2's) and under the names and with the candidates they spell
 *    (every segment plant under each fixture name the drives spell, F1 to F5, and with each of the snapshot's four
 *    can_execute candidates, every serial plant under each of those names, its calls holding the four candidates in
 *    the snapshot's order: wb-vuoz cut #3's), at each position of either call and in the contexts the plants spell
 *    (A3's serial, serial plants and context plants sentences name them, the forms of the gate's drive pages D01-D06
 *    on the drives over every fixture among them, D03-D06 wb-vuoz's, and, at 187 then 188 under each of those names,
 *    every assignment of the four kinds' forms to the eight requests of the two calls, each handed to the serial
 *    reading once, so each request beside every kind of request before and after it in its call and at each position
 *    of the other call: wb-vuoz cut #4's context plants, their counts and check pinned by wb-vuoz cut #5's counts and
 *    context controls; every other form, a form at a serial width no plant of it spells, four or more digits among them, a form
 *    under a name or with a candidate no drive spells, a serial reading keyed on which candidate a call holds at a
 *    position where no plant holds that candidate in that form, and a serial reading keyed on a request's context,
 *    the other requests of its call or of the other call, in a context no plant spells are NOT CLAIMED); the check
 *    reads every handed decision, the first, middle and last of three, against every recorded request, at each
 *    position of one to four (in the decision records: each handed
 *    decision in turn minted for each candidate's request the record does not hold, or for its fellows' request with
 *    the principal's role dropped or requested later, its fellows minted for the recorded request at one position,
 *    each in turn, and every decision minted for the recorded request at each position or each for the next
 *    recorded request from each position on, every handed decision a permit of its own), and holds a receipt to ONE
 *    recorded request in the forms the split and mix controls plant (a receipt whose six echoed fields and grant two
 *    recorded requests
 *    split between them, each read field in turn, answers neither; a core-minted permit decided on the chosen request
 *    carrying another issued request's invocationId or target, or with the principal's role dropped, answers no request
 *    of its call); answers() reads a receipt's scope,
 *    principal, target, action, invocationId and requestedAt against a request's and its grant against the request's
 *    grants, in the forms the echo and form controls plant. Every other form is NOT CLAIMED, the unplanted forms named
 *    below among them), mismatch-receipt (a snapshot-mismatch reply lacks exactly one receipt of status conflict or
 *    refused naming snapshot-mismatch) and current-unexecuted (F1, the one reply every clause admits, did not reach the seam
 *    exactly once with a core-minted permit: the drive's positive control, without which a decision point that never issues
 *    anything would meet the clause's "unless" vacuously). A1 the bound decision points (none) and the synthetic bindings:
 *    the honest point meets every check on every fixture, every mutant fails one, every check fires, and each fixture's basis
 *    is the computed one. A2 a point skipping either basis member or the conversion's candidate check reaches the seam on F2,
 *    F4 or F5 (effect-unvalidated). A3 a denied decision executed anyway fails effect-unpermitted; today even an exact grant
 *    for a GraphPolicyCLI verb reads unknown-action; and a permit decideControl returned for a request this call did not
 *    issue fails effect-unrequested in the forms A3 plants: on F3 (observer grant only) M-FORGED-GRANT appends the exact
 *    grant to the own grants array of the object requestOf returned, in place, then asks the core (A3 reads that object
 *    back after the call: its own grants array, the grant appended, and the seam handed a core-minted permit; and reads
 *    forged() itself on a planted object: the object it was handed, its own grants array, the grant appended);
 *    M-REPLAYED-PERMIT hands the seam the first
 *    permit it minted (F1's); M-NO-REQUEST-REPLAY, once it holds that permit, asks requestOf nothing more and hands it over,
 *    so its later calls issue no request (A3 reads 0 issued on F3 and on the next F1); each replay hands F3 and the same
 *    point's next F1 call the very permit F1's call handed the seam, and fails both. A3's reader controls: the record (a
 *    planted point driven over each fixture asking requestOf once for each of the snapshot's first one, two, three and four
 *    can_execute candidates, then editing every member of each returned object in place, reads a record equal to its own
 *    copies taken at the return, element by element, and reads its own edits back: every member differs from its copy, and each
 *    object or array member still holds the object it held, and its records name the fixture driven);
 *    the serial (the same four requests asked by a planted point driven over each fixture twice in a row: every request of
 *    each call carries that call's serial, driveSerial as its drive left it, and not the other call's, as the serial
 *    reading reads them, claimed in the forms the planted invocationIds pin, at the serials they spell, under the
 *    names and with the candidates they spell and in the contexts they spell, and no other:
 *    carriesSerial reads the twelve segment plants (serial 87) as planted, the serial as the whole first, third or last
 *    segment of a six-segment id, as the whole fourth of seven beside 86, as the whole last or the whole first of seven,
 *    or as the whole fifth of eight carried (the last three wb-vuoz's, where the gate's drive pages D03, D04 and D05
 *    spell the other call's serial), and 870, 8, x87, 087 and 87x as the third of six not carried (87x wb-vuoz's, D06's
 *    form), and reads their twelve three-digit twins (serial 187, wb-vuoz cut #2's) as it reads each twin at two digits:
 *    187 as the whole first, third or last segment of six, the whole fourth of seven beside 186, the whole last or first
 *    of seven or the whole fifth of eight carried, and 1870, 18, x187, 0187 and 187x as the third of six not carried;
 *    and reads each of the twenty-four respelled under each fixture name the drives spell, F1 to F5, in place of F1
 *    and with each of the snapshot's four can_execute candidates in place of exec-a1-t1 (wb-vuoz cut #3's) as it
 *    reads the plant itself; and the serial reading reads the serial plants' forms as planted, at serials 7 then 8 and
 *    at 187 then 188, under F1 and again under each of F2 to F5, in the contexts their calls hold, and the context
 *    plants' four kinds at 187 then 188 under each of F1 to F5 in every context, each request beside every
 *    assignment of the kinds to the other seven requests of the two calls (below);
 *    a serial at a segment no plant holds it at, by
 *    position and count (among them the second, the fourth of six, the fifth of six or seven, the sixth of seven or
 *    more, the seventh of eight or more, past the seventh and the first of eight or more), a segment holding the serial
 *    beside other characters in a form no plant spells (x87x, 87xx, x187x and 187xx among them), a form at a serial
 *    width no plant of it spells (four or more digits among them), a planted form at a serial no plant spells where the
 *    reading keys on the serial's value rather than its width and place, a form under a name or with a candidate no
 *    drive spells, a serial reading keyed on which candidate a call holds at a position where no plant holds that
 *    candidate in that form, a serial reading keyed on a request's context in a context no plant spells (below), and
 *    a separator other than a dash,
 *    or a space beside a segment, are NOT CLAIMED; the two calls issue no invocationId in common, and their requests
 *    name the fixture driven, as their second dash-separated segment);
 *    the replay (for each position of the four, a planted point
 *    driven over F1 twice in a row issues the four requests, one per can_execute candidate in the snapshot's order; the
 *    first call executes the core's permit for the request at that position, which answers that request, and meets every
 *    check; the second hands the seam that same permit, which answers none of its requests, and fails effect-unrequested
 *    alone); the check over a record (a core-minted
 *    permit handed with no request issued fails it on every fixture, beside that fixture's other checks; on F1, with its own
 *    request at each position of a call issuing one, two, three or four requests it passes, and with one, two, three or four
 *    requests recorded and none its own (other candidates' requests, then its own candidate's under another serial) it
 *    fails; of two decisions handed in one F3 call, either one minted for another candidate's request the call did not
 *    record fails it, and both minted for recorded requests pass; of three, the first, the middle or the last minted for
 *    such a request fails it, and all three minted for recorded requests pass; each decision control reads, per handed
 *    decision, whether a recorded request answers its receipt, beside the checks the call fails); the decisions over a
 *    record (in one F3 call handing two or three decisions over a record of F1's requests for the snapshot's first one,
 *    two, three or four can_execute candidates, in the snapshot's order, each under serial 0, the decision at the first
 *    or second of two and at the first, middle or last of three, its fellows the permit for the record's first request,
 *    passes minted for the request at each position of that record and fails minted for each request of those four
 *    candidates under serial 0 or 1 that the record does not hold, one at a time: the record's first candidate's under
 *    serial 1 (the none entries), and in the unrecorded table each candidate's outside the record under serial 0 and
 *    each of the four candidates' under serial 1, every reading there naming the invocationId its decision's receipt
 *    carries; each reads the record's size and, per handed decision, the index of the recorded request its receipt
 *    answers (-1: none), beside the checks the call fails); the echo (the permit's
 *    receipt answers the request it was minted for, with that request's grants in either order, and answers it no longer
 *    with one echoed field or its grant altered alone as planted: a string or the grant gaining a final ~, an object
 *    gaining a member); and wb-kbh1's six: the forms (on F1, the permit's receipt answers its own request no longer with
 *    one read field altered alone, on the receipt's side and, in turn, on the request's side, in each planted form: an
 *    echoed string, or the grant, gaining a final or a leading ~, in another case, without its last character or without
 *    its first; an echoed object gaining a member, lacking one of its members or holding another value under one of
 *    them (that member's string gaining a final ~), member by member; the grant absent, from the receipt or from the
 *    request's grants; on the request's side a grant form is the request's grants holding the receipt's grant only in
 *    that form; each formed member is read back as the altered side carries it, and, the reader's positive control, the
 *    receipt still answers with the action set to its own value, on either side); the split (on F1, the permit handed
 *    over a record of two requests, one differing from its
 *    receipt in one read field alone and the other in the invocationId alone (in the target alone, where the first
 *    differs in the invocationId), each of the six echoed fields and the grant in turn, fails the check, its receipt
 *    answering neither request: that field is held by the second request alone, the other differing field by the first
 *    alone, every other read field by both); the mix (a planted point driven over F1
 *    asks requestOf for the reply's chosen candidate, then for the snapshot's first other can_execute candidate, and
 *    asks the core on the chosen request carrying the other request's invocationId, carrying its target, or with the
 *    principal's role dropped; the core permits and mints each, its receipt answers neither request (the mixed field held
 *    by the other request alone, the other field the two requests differ in by the chosen request alone; the thinned
 *    principal by neither), and the call fails effect-unrequested alone); the order (the record control's planted point
 *    asking for all four candidates in the
 *    snapshot's reverse order, and in the interleaving second, last, first, third, reads on every fixture the record
 *    equal to its own copies element by element, as in the snapshot's order, its targets read back in the order asked
 *    (every record reading carries its targets, in the record's order); the snapshot's order lists its
 *    invocationIds sorted and neither other order does, so a record kept sorted reads otherwise there); and, cut #2's,
 *    the serial orders (the serial control's planted point driven over each fixture twice in a row, each call asking
 *    for all four candidates in its own order of a pair, in each ordered pair of the three orders, the snapshot's twice
 *    among them: every request of each call, first, second, third and last asked, carries that call's serial and not
 *    the other call's, as the serial reading reads them in the planted forms, the two calls issue no invocationId in
 *    common, their requests name the fixture driven, and each call's targets read back in the order it asked; the
 *    serial reading, shown planted calls, reads a request carrying the other call's serial as its third segment, in
 *    place of its own, as not carried and the invocationId both calls were returned as shared) and the replay
 *    orders (the replay control's planted point driven
 *    over F1 twice in a row, each call asking for all four in its own order of a pair, in each ordered pair: the permit
 *    its first call executes for the request at each position of that call's order answers that request and meets
 *    every check, and its second call, handed that same permit, answers none of its requests and fails
 *    effect-unrequested alone; the targets each call recorded read back in the order it asked); and, cut #3's, the
 *    decision records (over each drive form's record, the snapshot's first one, two, three and four candidates'
 *    requests and all four in its reverse and in the interleaving, by hand, one F3 call per case over F1's requests
 *    under serial 0, and driven, one drive over F1 per case whose planted point asks requestOf for that record's
 *    candidates in its order, for one, two and three handed decisions, every handed decision a permit of its own:
 *    every decision minted for the recorded request at one position, each position in turn, or (two or three) each
 *    for the next recorded request from one position on, wrapping, passes, each answering its request; each handed
 *    decision in turn, minted for each candidate's request the record does not hold (by hand, that candidate's under
 *    serial 7 when the record holds it and under the record's serial 0 otherwise; driven, under serial 0, which no
 *    drive issues), or for its fellows' recorded request with the principal's role dropped or requested later
 *    (requests the record does not hold that the core still permits and mints), its fellows minted for the recorded
 *    request at one position, each in turn, fails effect-unrequested, it alone answering none; each case reads, per
 *    handed decision, the index of the recorded request its receipt answers (-1: none), how many distinct decisions it
 *    handed, and the checks the call fails, current-unexecuted beside them when a driven call hands two or three; the
 *    records by hand and every stranger read back from its receipt, by its invocationId or by the member its form
 *    alters) and the serial plants (the serial reading shown planted calls, serials 7 then 8, and each of the same
 *    plants again at three digits, serials 187 then 188 (wb-vuoz cut #2's three-digit serial plants), and every one of
 *    them again at both under each of the other fixture names the drives spell, F2 to F5, in place of F1 (wb-vuoz cut
 *    #3's serial plants by name), each returned four
 *    requests over the snapshot's candidates in its order, every invocationId in plantedId's form
 *    inv-<name>-<serial segments>-<candidate>, of six or seven segments, or in one of the forms of the gate's drive
 *    pages D03-D06: in four
 *    rotations each position of each call holds each kind of request in turn (in the rotations' cyclic order, own,
 *    other, both, neither, the second call's kinds one on from the first's), its invocationId carrying as its third
 *    segment that call's serial alone, which reads carried, or the other call's alone, both (that call's third, the
 *    other's fourth: D01's page form) or neither (D02's page form, the serial plus 1000), each of which reads not
 *    carried, and the id the first call carries as its own, which the second carries as the other's, reads shared;
 *    D01's and D02's pages themselves, every request of both calls respelled as each respells it (the first call's
 *    carried at no position, the second call's at every one on D01's, its serial third and 9 fourth (189 at three
 *    digits), and at none on
 *    D02's); wb-vuoz's D03's to D06's pages, every request of both calls respelled as the gate's drive pages D03-D06
 *    respell it, its serial third and the next serial as the last of seven segments (D03's,
 *    inv-<name>-<serial>-<candidate>-<serial plus 1>), as the first of seven (D04's,
 *    <serial plus 1>-<name>-<serial>-x-<candidate>) or as the fifth of eight (D05's,
 *    inv-<name>-<serial>-x-<serial plus 1>-<candidate>), or its serial only as the third segment's leading part (D06's,
 *    inv-<name>-<serial>x-<candidate>): the first call's carried at no position on each, the second call's at every one on
 *    D03's, D04's and D05's and at none on D06's; four ids
 *    both calls were returned (7 third, 8 fourth; at three digits 187 third, 188 fourth), in reverse order in the
 *    second, read shared in the first call's
 *    order and carried in neither call; an id one call was returned twice and the other never reads not shared; and a
 *    name at each position of each call reads named once, in the order first named; each plant's invocationIds read
 *    back) and the context plants (wb-vuoz cut #4's: at serials 187 then 188, the width the drives' own serials run in,
 *    under each of F1 to F5, two calls of four requests over the snapshot's candidates in its order, every
 *    invocationId in plantedId's form of one of the four kinds as the rotations spell it, in every one of the 65536
 *    assignments of the kinds to the eight requests, each handed to the serial reading once (65536 handed, 65536
 *    distinct lists of the eight invocationIds: wb-vuoz cut #5's counts): each request reads carried exactly when it is
 *    of the own kind, whatever kinds the other seven hold before and after it in its call and at each position of the
 *    other call; the first call's id at a position reads shared exactly when the two calls hold an own and an other
 *    there, in either order, those ids in the first call's order and no other; the name reads named once; per call,
 *    position and kind the requests read carried in 16384 assignments for the own kind and in none for the other
 *    three, the first call's ids read shared in 8192 per position, and no assignment reads otherwise: contextReading
 *    checks each assignment's whole reading, its two rows of one value per request, each request's carried, the shared
 *    ids and the name, against the reading constructed from its kinds alone, and counts none read otherwise; wb-vuoz
 *    cut #5's context controls pin that check: seventeen misreaders, each the reading constructed from the planted
 *    requests' kinds with one deviation where its context holds (the gate's witness forms X01 to X05 and an own
 *    request read not carried, each keyed on the kinds of the requests around it; the shared ids reversed wherever
 *    two or more are shared, the id at each index misspelled wherever that index is shared, the last dropped wherever
 *    one or more are; a third row, each call's row one value longer, the name twice and the name misspelled, in every
 *    assignment), each read by contextReading in serialOf's place under F1 at 187 then 188 and read otherwise in
 *    exactly the assignments its context holds, counted arithmetically, the first four of them the four constructed
 *    for it); the serial reading is claimed in these forms only, at these serials, under these
 *    names and in these contexts: that call's
 *    serial at a segment other
 *    than the third, the other call's at a segment no plant holds it at (the plants hold it as the third, as the fourth
 *    beside that call's third, as the last or the first of seven segments and as the fifth of eight), a serial beside
 *    other characters in a form no plant spells, a serial at a width the serial plants do not spell (two digits, and
 *    four or more), an invocationId both calls were returned in a form or a length no plant
 *    holds, a form under a name no plant spells in it (N1 to N8 are planted in the own kind alone), and a serial
 *    reading keyed on which candidate a call holds at a position where no plant holds that candidate in that form
 *    (the plants hold each candidate at its own position in the snapshot's order, but in the reverse in the second
 *    call of the ids both calls were returned and one position on in the first call of the id returned twice), and a
 *    serial reading keyed on a request's context, the other requests of its call or of the other call, in a context
 *    no plant spells (at 7 then 8 the serial plants hold their own calls' contexts only: the rotations' cyclic order,
 *    the pages' calls each in one form throughout, and the shared, twice and named plants' calls; in or beside a
 *    request of another form than the four kinds', D01's second call, D03's to D06's pages, the ids both calls were
 *    returned, the id one call was returned twice and the names N1 to N8 among them, each read in its own plant's
 *    calls only; and in calls asking the candidates in another order than the snapshot's) are
 *    NOT CLAIMED). A4 a hand-built
 *    look-alike permit and a spread copy of a minted one fail
 *    effect-unminted; isCoreMintedDecision is false for the reply, its typed conversion, a copy, a JSON round trip and a
 *    denial. B1 the mismatch condition: F2's presented bytes hash to a digest the reply does not carry, while F1's bytes hash
 *    to the reply's own. B2 the honest point records one conflict receipt naming snapshot-mismatch; a point dropping the
 *    reply silently or reporting it denied fails mismatch-receipt. B3 no effect: the honest point never reaches the seam on
 *    F2, and a point that records the conflict and executes anyway fails effect-unvalidated alone. C1 the execute/interpret
 *    path, derived from the adapter's own TypeScript AST: FurnaceHostedExecutor's execute method and everything it calls in
 *    that file, transitively (this-calls to class methods, and calls of same-file functions and const-bound functions), in
 *    breadth-first order of first call. C2 byte-identical: every path member's source text (the declaration's own text, its
 *    leading comment excluded) at HEAD equals its text in the adapter at the bead's Pi pin, read from git's objects, and a
 *    one-character plant inside each member is reported as that member's change, only.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's
 * member count as literals, beside the vocabulary, the checks, the echoed request fields, the positions, the mutants, the
 * lead plants, the string forms, the mixes, the orders, the order pairs, the record forms, the handed counts, the serial
 * kinds, the planted serials, the drive names (held to FIXTURES), the serial plants, the segment plants, the derived
 * strangers, the fixtures, the bound
 * points, the floor, the pin and the derived path; the judged set (every row's id, label
 * and pins, every pin's quote and witness, the residual members, every registered test title) is held to the out-of-file
 * roster test/fixtures/gp-decision-executor-roster.json. OUTSIDE ANCHORS (their own registered case): the bead's own row in the
 * tracker export (.beads/issues.jsonl): the title opens with the requirement id and carries row T's label before its artifact
 * parenthetical, and names exactly the two names; the first notes line opening "Citation: " holds the Acceptance sentence,
 * whose three clauses are exactly the labels of rows A, B and C, and the Pi pin; each row's pin quotes tile its label; clause
 * A's control.ts citation resolves at the pin to the isCoreMintedDecision export, and the notes' furnace-hosted.ts:9 citation
 * resolves at the pin to the adapter's "no scheduler" sentence, so the adapter path is the filing's; the vendored reply
 * carries the vocabulary's schema, kind and members, its digest is the generator's recorded input digest and the snapshot
 * fixture's own, the snapshot's revision is F1's observed basis, and the snapshot holds one can_execute relation per
 * position, each order the record control asks holding each of those positions once; and the vocabulary is derived
 * outside every literal: the
 * title's Graph names, the vendored reply's schema and kind values, the reply member whose value is the snapshot fixture's
 * digest and the sample member whose value is a candidate; and the follow-up bead wb-5omz's own row: the lead reader takes
 * the first line of its notes that opens with "[leads] - F1 " (not a line holding that text further in, not a line opening
 * another finding's id such as "[leads] - F13 ", not a later such line) and reads the cure phrase "arm a request-binding
 * check (<check>) with <P-point> and <P-point> as its mutants" on that line only; the anchor holds when that check is one of
 * the checks and the two points are two distinct names whose M- twins (each name with P- read as M-) are mutants failing that
 * check on F3, among any other checks they fail. LEAD_PLANTS pin each reading clause on planted notes, and planted readings
 * pin each anchor condition. A tracker note appended later (a delivery, gate or park note) sits on a line of its own and
 * binds nothing. So a pin, a row, a clause, a vocabulary member, the request-binding check or one of the gate's two points
 * removed from every literal of this file and the roster together still reds. The last case reads the vitest task tree (every
 * registered test, in roster order, in run mode, ran before it), REACHED (every pin reached its witness compare, and each
 * compare's own result) and ANCHORED (the outside-anchors case ran to its end).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included; the docs leg is
 * the wb-0lf.7 census's); the seam's actual shape (the armed contract is this census's reading of an unpublished seam: a
 * decision point whose own cut must take another shape re-measures rows A and B with it); an executor request outside the
 * core's verbs (decideControl mints control verbs only, so a GP decision whose effect is an Attempt start has no core-minted
 * path today and reads unknown-action, as A3 shows); Furnace supervision itself (the seam is injected; the checks observe the
 * seam, never Furnace); the reply's numbers (gp's own inspect, wb-gxd7.5); for effect-unrequested, how a permit whose receipt
 * answers a request this call issued was obtained (the check reads the receipt's echo of the request, so a permit decided on
 * a forged request that keeps every echoed field, when the grant the core records is one the issued request holds, as
 * M-FORGED-GRANT's on F1, or one minted before the call for the call's own request, answers it), what a point hands
 * decideControl besides the request (the projection and the clock), and the request's params, which no receipt echoes; a
 * record, a check or a serial that misses a request only past the fourth one a call issues (the reader controls issue up to
 * four);
 * a check that skips a handed decision only past the third one a call hands (the check controls hand three); a check
 * that skips a later decision whenever an earlier one in its call does not answer the record's first request (the
 * decisions over a record hand the permit for the record's first request as every fellow); a decision over a record
 * minted for a request under a serial other than 0 or 1, or for another fixture's request (the decisions over a record
 * mint over F1's requests under serials 0 and 1); a serial that
 * two calls over one fixture share only when they are not in a row (the serial control drives each fixture twice in a row);
 * which object holding the returned grants array M-FORGED-GRANT hands decideControl (the object requestOf returned or a copy
 * sharing that array: no echoed field tells them apart); a check that skips a request or a decision only on a fixture
 * other than the one its control drives (the position controls drive F1, the decision controls F3, the decision records
 * F3 by hand and F1 driven); the lead reader's
 * grammar outside the live lead line and LEAD_PLANTS (a check spelled outside [a-z-], a point outside P-[A-Z-],
 * another line separator); the leading comment of a path member and anything C1 does not derive (row Q4); a mutant, a
 * fixture, a planted control or a reader control removed from its table or case, the frozen literal and the roster together
 * while every check still fires; row Q or a residual member removed from every literal and the roster together (no source
 * outside this cut names the residual families before its delivery note lands); a pin's case, or one reading inside it,
 * replaced by one that echoes its roster witness; and contextReading's distinct count taken from anything but the lists of
 * invocationIds it hands the reading (its counter's kinds, or the pass count), a hollow of the count alone that leaves every
 * reading the census judges in place, the context controls' counts reading each assignment beside it (wb-vuoz cut #5).
 * wb-kbh1 (filed by the rule-19 structural exit R-B249 to pin the forms cut
 * #4 left unplanted) pins them in
 * A3's forms, split, mix and order controls; every effect-unrequested form A3 does not plant stays NOT CLAIMED, among
 * them: a receipt whose read fields a record splits across three or more requests, a split beside a second handed
 * decision, a split on a fixture other than F1, and a split whose two requests each differ from the receipt in two read
 * fields (the split control records two requests, each differing in one read field alone); a mix other than the three
 * the mix control plants (another member taken from the other request, two members together, a member taken from a
 * request the call did not issue); how answers() reads a difference neither the echo nor the form control plants (a
 * string changed other than by a final or a leading ~, by case or by losing its first or its last character, a character
 * changed inside it or whitespace gained at an end among them; an object with two members changed together, a member
 * changed other than by a final ~ on its string value, or a member of another type; a grant split across two of the request's
 * grants; a form planted on any receipt but the permit minted for F1's chosen request); the record's order where a call
 * asks for fewer than all four candidates outside the snapshot's order, or for
 * all four in an order other than the three the record control plants; the serial of a request of a call asking for
 * fewer than all four candidates, or for all four in an order other than the three, and an invocationId two calls in a
 * row share where either call asks so (the serial controls ask for all four, in each ordered pair of the three
 * orders); a call asking requestOf for one candidate twice, or for a candidate outside the snapshot's can_execute
 * relations (no control asks either); in the decision records, a stranger beside fellows minted for two different
 * recorded requests, a stranger that is no core-minted permit, a stranger matching its fellows' recorded request in
 * its target, invocationId, principal and requestedAt (each planted stranger differs from it in one of those), and a
 * record other than the six the decision records plant beside the position, check and decision controls' own; and
 * the serial reading over planted calls other than plantedSerial, the serial plants and the context plants (two calls
 * of two or of four requests, serials 7 then 8, and of four at 187 then 188, under F1 and under each of F2 to F5) and
 * the drives' own.
 * wb-vuoz (filed by the rule-19
 * structural exit R-B398 to pin the
 * serial segment forms cut #4 left unplanted) plants the forms the gate's GP6-K10, K12, K13 and K14 misread and its
 * drive pages D03-D06 spell (the serial as the last and as the first of seven segments, as the fifth of eight, and as
 * a segment's leading part, 87x), in A3's segment plants and as D03's to D06's pages among its serial plants; every
 * invocationId form the segment and serial plants do not plant, on planted calls and on the drives' own alike, stays
 * NOT CLAIMED, among them: a serial, that call's or the other call's, at a segment no plant holds it at, by position
 * and count (among them the second, the fourth of six, the fifth of six or seven, the sixth of seven or more, the
 * seventh of eight or more, past the seventh and the first of eight or more); a segment holding the serial beside
 * other characters in a form no plant spells (x87x and 87xx among them); a separator other than a dash, or a space,
 * beside a segment; that call's serial read by the serial reading at a segment other than the third, and the other
 * call's at a segment no serial plant holds it at; and an invocationId both calls were returned in a form or a length
 * no plant holds. Its cut #2 (claims equal to pins, ruling R-B478) plants the same forms at three digits, the width
 * the drives' own serials run in at A3's serial reading (the twelve segment plants' three-digit twins, serial 187
 * beside 186, and every serial plant again at serials 187 then 188), so the gate's GP7-K01 to K06 and GP7-C01 red; a
 * form at a serial width no plant of it spells stays NOT CLAIMED, among them a call's serial of four or more digits
 * (the serial plus 1000 is planted only as the neither kind, and 1870 only as a longer number, not carried), the
 * segment plants' forms at one digit where no serial plant spells them, and the serial plants' forms at two digits;
 * and so is a planted form at a serial no plant spells where the reading keys on the serial's value rather than its
 * width and place. Its cut #3 (claims equal to pins, ruling R-B502) plants every segment plant again under each
 * fixture name the drives spell and with each of the snapshot's four can_execute candidates, and every serial plant
 * again under each of F2 to F5, so the gate's GP24-N01, N02, N03 and N05 red; a form under a name or with a candidate
 * no drive spells stays NOT CLAIMED (N1 to N8 are planted in the own kind alone), and so is a serial reading keyed
 * on which candidate a call holds at a position where no plant holds that candidate in that form (the serial plants
 * hold each candidate at its own position in the snapshot's order, but in the reverse in the second call of the ids
 * both calls were returned and one position on in the first call of the id returned twice), among them the
 * pairings the drives' calls in the reverse and in the interleaving hold. Its cut #4 (claims equal to pins, ruling
 * R-B526) reads every assignment of the four kinds to the two calls' eight requests at 187 then 188 under each of F1
 * to F5 (A3's context plants), so the gate's G18-S1, G18-S2 and G18-S3 red; a serial reading keyed on a request's
 * context, the other requests of its call or of the other call, in a context no plant spells stays NOT CLAIMED,
 * among them every context at 7 then 8 but the serial plants' own, a context in or beside a request of another form
 * than the four kinds' (D01's second call, D03's to D06's pages, the ids both calls were returned, the id one call
 * was returned twice and the names N1 to N8, each read in its own plant's calls only), and a context in calls asking
 * the candidates in another order than the snapshot's, as the drives' calls in the reverse and in the interleaving do.
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row):
 * R-SPELLING (Q1, a vocabulary spelling the token reader does not read: camel case, a member composed at run time, a name
 * lower-cased), R-SIDE-PATH (Q2, a decision point that reaches an effect outside the injected seam: the checks observe the seam
 * only), R-CHOSEN-TARGET (Q3, a decision point that executes a candidate other than the reply's chosen one: no clause binds the
 * executed target to the choice) and R-ADAPTER-OUTSIDE-PATH (Q4, an adapter change C1 does not derive into the path: a method
 * execute never calls, a same-file constant the path reads, an import line the path's helpers resolve through; each member's
 * statement is derived from the adapter's AST, never spelled here, so an edit to the adapter outside the path reds no row).
 * SCOPE AND OVER-READS: the vocabulary reader does not read negation or context, so a src comment that merely names a member
 * reds T1 (OVER-READ, disclosed: no src module spells one today). C2 reds every change to a path member, a cut that is no GP
 * cut included: before a decision point is bound the census cannot tell the cuts apart, so such a cut re-reads C2 and states why
 * its change leaves the clause's adapter path in place. A conflict/refusal receipt is read as one receipt whose status is
 * conflict or refused and whose code names the failed basis member (snapshot-mismatch, the wb-gxd7.3 census's typed code); the
 * source revision is compared with the subjectBasis of the node the chosen candidate's control target names, the observation
 * model's own basis field.
 *
 * wb-5omz (R694 follow-up of wb-0lf.1 landing 648, gate cmd_0ea67120ff91: F1 leads): the five checks that cut armed read only
 * the handed decision's verdict and its mint identity, so the gate's P-FORGED-GRANT (decideControl asked with the fixture's
 * grants plus the exact control:furnace.stop grant) and P-REPLAYED-PERMIT (the seam handed the first permit the point minted,
 * F1's) executed F3's reply, which the core denies observer-only on F3's own request, and met every check on every fixture.
 * The request-binding check effect-unrequested reads each handed receipt against the requests the call issued. MUTANTS carry
 * the two as M-FORGED-GRANT, which appends the grant to the own grants array of the object requestOf returned (so a record
 * held by reference or as a shallow copy would read the forged grant as issued), and M-REPLAYED-PERMIT; each fails it on
 * F3, and so do M-DENIED (a denial carries no receipt) and M-LOOKALIKE (its grant is none of F3's), beside the checks they
 * already failed. Cut #2 (refusal #1 of cut #1, gate-prep-4 / g10-gate-s161: unmet U1-U4, claims wider than pins): U1
 * M-NO-REQUEST-REPLAY and the check control over an empty record pin the zero-issued half; U2 M-FORGED-GRANT appends in
 * place and the record control edits every member of every returned request in place; U3 the record control's four
 * requests and the check controls' first, second and last positions; U4 LEAD_PLANTS, the planted readings and the distinct
 * points condition pin the lead reader's clauses and the anchor's conditions. Cut #3 (refusal #2 of cut #2, gate-prep-2 /
 * g10-gate-s167: unmet U1-U3; the class frozen and this cut bound to the enumerate-the-resolvable form by ruling R-B216):
 * U1 the serial control (every fixture, two calls in a row, each of the four positions) and the replay control (each
 * position, F1) pin the serial of each of a call's four requests; U2 the check controls place the permit's own request at
 * each of the four positions, the third included; U3 the check controls hand three decisions, each position in turn
 * minted for a request the call did not record; the refusal's F1 LOW: A3 reads M-FORGED-GRANT's grant back on the object
 * requestOf returned; and a lead plant pins the cure phrase's closing words. Cut #4 (refusal #3 of cut #3, gate-prep-10 /
 * g10-gate-s174: unmet U1-U4, claims wider than pins; the rule-19 structural exit R-B249 binds this cut to the fail-closed
 * core and files wb-kbh1 for the coverage): the effect-unrequested claims are narrowed to the forms A3's controls plant
 * (the CHECKS parenthetical, A3's sentences on its record, check and echo controls, the record's and answers()'s docs, and
 * A3's record, check, decision and echo messages), and U1 (Y01, Y01b, Y01c), U2 (Y09), U3 (Y07, Y07b, Y16) and U4 (Y02)
 * are NOT CLAIMED above, their pins wb-kbh1's; no reading, control, pin, witness or test title changes, only comments and
 * assertion messages do.
 * wb-kbh1 (R694 follow-up from wb-5omz, filed by the rule-19 structural exit R-B249 at wb-5omz's refusal #3, gate-prep-10 /
 * g10-gate-s174: U1-U4, claims wider than pins, deferred here by cut #4): U1 the split control (each read field in turn)
 * and the mix control's invocationId and target mixes pin the check's same-request binding (Y01, Y01b, Y01c, and the
 * grant read against another recorded request, X18); U2 the form control's lacking and differing members and the mix
 * control's dropped role pin member equality (Y09); U3 the form control's grant forms pin the grant membership form
 * (Y07, Y07b, Y16); U4 the order control pins the record's order (Y02). The form, split and mix controls also kill the
 * probes cut #4's seat recorded inside NOT CLAIMED forms (N01, N02, N03, N05, N16 the forms; N06, N15 the split and the
 * mix). The CHECKS parenthetical, A3's sentences, the record's and answers()'s docs and the NOT CLAIMED list name each
 * planted form. Cut #2 (refusal #1 of cut #1, gate-prep-12 / g10-gate-s186: unmet U1, cut #1's reverse and interleaving
 * orders widened the CHECKS parenthetical's serial and no-shared-invocationId clauses past their pins): the serial and
 * replay controls ask in each ordered pair of the three orders (A3's serial orders and replay orders readings, every
 * fixture and F1), so the gate's GP12-S01 and GP12-S02 red; those clauses now name a call asking for all four, and the
 * NOT CLAIMED list names the rest. Cut #3 (refusal #2 of cut #2, gate-prep-10 / g10-gate-s190: unmet U1 and U2, claims
 * wider than pins; ruling R-B361 freezes the serial claim-set class, binds this cut to the enumerate-the-resolvable
 * form and reads U1, the check's decision positions, as rung 1 of its own claim set): U1 the decision records (each
 * drive form's record, by hand on F3 and driven on F1, one to three handed decisions, each position in turn minted for
 * each candidate's request the record does not hold or for its fellows' request with the principal's role dropped or
 * requested later, the fellows minted for each recorded position in turn) pin the check's decision positions in
 * every record order and size, so the gate's GP10-C01, C02, C03 and C04 red; U2 the
 * serial plants (each kind of request at each position of either call, D01's and D02's pages, ids shared at each
 * position, a name at each position) pin both conjuncts of serialOf's carried, its shared and its named, so GP10-P01,
 * P02 and P03 red; the segment plants add the first and the last segment, a serial beside another and a leading zero.
 * No reader changes: violations(), answers(), serialOf() and carriesSerial() are byte-unchanged. Cut #4 (refusal #3 of
 * cut #3, gate-prep-6 / g10-gate-s195: unmet U1, the R-B361-frozen serial claim set re-failed through the gate's
 * GP6-K10, K12, K13 and K14, realized by its drive pages D03-D06; the rule-19 structural exit R-B398 binds this cut to
 * the fail-closed core and files wb-vuoz for the coverage): the serial claims are narrowed to the forms A3's segment
 * and serial plants pin (the CHECKS parenthetical's serial clause, A3's serial, serial orders and serial plants
 * sentences, the docs of SERIAL_KINDS, carriesSerial, SerialReading and serialOf, and A3's serial, segment, planted
 * serial, serial orders and serial plants messages), and the forms GP6-K10 (a serial past the sixth segment), K12 (the
 * first of seven or more), K13 (the fifth) and K14 (a segment the serial leads, 87x) misread are NOT CLAIMED above,
 * their pins wb-vuoz's; no reading, control, pin, witness or test title changes, only comments and assertion
 * messages do.
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, seam or fake binary.
 *
 * wb-hops (R694 follow-up of wb-5omz landing 799, gate cmd_92bb8e785d4c: F1 LOW, claim-scope wording): read as a
 * product, the CHECKS parenthetical's "for the check, a record of one to four requests and one to three handed
 * decisions" and "the check reads every handed decision, the first, middle and last of three, against every recorded
 * request, at each position of one to four" named a record of three or more with a second or later decision, which no
 * A3 control planted, and the gate's one-edit members of the check line Z05 (a call's second and later decisions judged
 * only while the record holds fewer than three requests) and Z06 (those decisions read against the record's first two
 * requests only) survived there. Cut #1: A3's decisions over a record planted that product for two and three handed
 * decisions with one unanswering form, the record's first candidate's request under serial 1, and the position controls
 * of the check over a record plant it for one. Beside that control, its sentence above and its assertion, no claim,
 * reading, mutant, control, pin or test title changed; the A3 witness gained the control's table (decisionsOverRecords).
 * Cut #2 (refusal #1 of cut #1, gate-prep-8 / g10-gate-s191: unmet U1 MEDIUM and U2 LOW, claims wider than pins): that
 * one form shares the fellows' target and the record's first request's target, and the gate's one-edit members of the
 * check line HP01 (a call's second and later decisions over a record of three or more judged only when their receipt's
 * target is the first decision's), HP02 (only when it is some recorded request's target) and HP05 (a call handing two or
 * more decisions over a record of three or more reading only the decisions that target the record's first request's
 * target) survived there, while the sentence said the decision fails minted for a request the record does not hold and
 * this history said the product planted. U1: the decisions over a record now also plant, at each placement and over
 * each record of one to four, a decision minted for each request of the four candidates under serial 0 or 1 that the
 * record does not hold (unrecordedOverRecords: each candidate's outside the record under serial 0, then each of the
 * four candidates' under serial 1, in the snapshot's order; 22 readings per placement, 110 in all, each naming the
 * invocationId its decision's receipt carries), so HP01, HP02 and HP05 red A3; the none entries' assertion names
 * their one form, and an assertion on its receipt's invocationId pins it (the gate's HQ01, an alternative planting of
 * that form at refusal #1, reds A3). U2: the sentence above now names that cut #1 planted one form, and the CHECKS
 * product is planted in the forms A3's sentence names. Two clauses join NOT CLAIMED: a check that skips a later
 * decision whenever an earlier one in its call does not answer the record's first request (the gate's HP06, recorded
 * at refusal #1 as outside the control's form), and a decision minted under a serial other than 0 or 1 or for another
 * fixture's request. Beside that table, its assertion, the none entries' assertion message and form pin, A3's
 * sentence on the decisions over a record, those two clauses and this history, no claim, reading, mutant, control,
 * pin or test title changes; the A3 witness gains unrecordedOverRecords. Display paths added: none.
 *
 * wb-vuoz (filed by the rule-19 structural exit R-B398 at wb-kbh1's refusal #3, gate-prep-6 / g10-gate-s195: the
 * R-B361-frozen serial claim set re-failed through the gate's GP6-K10 (the segments past the sixth unread), K12 (only
 * the last six read), K13 (the fifth unread) and K14 (a segment read by its leading digits), realized FAIL-OPEN by its
 * drive pages D03-D06 and named NOT CLAIMED by wb-kbh1's cut #4). Cut #1 pins those forms red-first: four segment
 * plants (the serial 87 as the last and as the first of seven segments and as the fifth of eight, carried, and 87x as
 * the third of six, not carried) and four serial plants (D03's to D06's pages, every request of both planted calls
 * respelled as each drive page respells it), so each of the four members reds A3 at its segment expect, alone and
 * composed with its page. The CHECKS parenthetical's serial clause, A3's serial and serial plants sentences, the NOT
 * CLAIMED list, the docs of SEGMENT_PLANTS, carriesSerial, SerialReading, serialOf and serialPlants, and A3's segment
 * and serial plants messages name the planted forms; every other form stays NOT CLAIMED. No reader changes:
 * violations(), answers(), serialOf() and carriesSerial() are byte-unchanged; the frozen literal gains the four
 * segment plants and the four pages, and the roster's A3 witness gains their measured readings. Display paths added:
 * none. Cut #2 (refusal #1 of cut #1, gate-prep-7 / g10-gate-s203: unmet U1 and U2, claims wider than pins at the
 * drives' serial width; ruling R-B478, rung 1: a restatement with claims equal to pins): every plant spelled its
 * serial in one or two digits (87; 7, 8 and 9), while the drives' own serials at A3's serial reading run in three
 * (151 to 271 over its 50 serial pairs, measured on a throwaway copy), so the gate's GP7-K01 to K06 (carriesSerial
 * reading only the first 24
 * characters, a last, first or fifth segment or any segment but the third only when it has at most two characters,
 * or a segment by its first three) and GP7-C01 (serialOf reading the other call's serial only as the third segment
 * or in a segment of at most two characters) kept the census green and were realized FAIL-OPEN by the drive pages D01
 * and D03-D06. U1: the twelve segment plants gain their three-digit twins (THREE_DIGIT_SEGMENT_PLANTS, serial 187
 * beside 186), each read as its twin reads, so GP7-K01 to K06 red A3 at its three-digit segment expect; U2: every
 * serial plant runs again at three digits (THREE_DIGIT_SERIALS, 187 then 188), so GP7-C01, and GP7-K01 to K06 with
 * it, red A3 at its three-digit serial plants expect, each alone and composed with its page. The CHECKS
 * parenthetical's serial clause, A3's serial and serial plants sentences, the NOT CLAIMED list, the docs of
 * SEGMENT_PLANTS, THREE_DIGIT_SEGMENT_PLANTS, carriesSerial, SerialReading, serialOf, THREE_DIGIT_SERIALS and
 * serialPlants, and A3's two three-digit messages name the serials planted; a form at a serial width no plant of it
 * spells is NOT CLAIMED. No reader changes: violations(), answers(), serialOf() and carriesSerial() are
 * byte-unchanged; serialPlants takes its two serials as a parameter, PLANTED_SERIALS by default; the frozen literal
 * gains the three-digit segment plants and serials, and the roster's A3 witness gains their measured readings.
 * Display paths added: none. Cut #3 (refusal #2 of cut #2, gate-prep-24 / g10-gate-s202: unmet U1 and U2, claims wider
 * than pins at the invocationId's name segment; ruling R-B502, rung 1 of the name-segment claim set: a restatement
 * with claims equal to pins): every planted id the serial reading must read not carried spelled the name F1, while the
 * drives' own requests name F1 to F5, so the gate's GP24-N01, N02 and N05 (carriesSerial, in an id holding no F1
 * segment, reading its third segment alone, reading a segment that opens with the serial as carrying it, or an
 * all-digit segment that ends with it) and GP24-N03 (serialOf reading the other call's serial only in an id holding an
 * F1 segment) kept the census green and were realized FAIL-OPEN by the gate's drive pages D01-D06 issued on the drives
 * over F2 to F5. U1: every segment plant, at two digits and at three, is read again respelled under each fixture name
 * the drives spell (DRIVE_NAMES, held to FIXTURES) in place of F1 and with each of the snapshot's four can_execute
 * candidates in place of exec-a1-t1 (respelledPlant, segmentPlantsByName), each as the plant itself reads, so
 * GP24-N01, N02 and N05 red A3 at its segment plants by name expect (and at its serial plants by name expect with
 * those hollowed); U2: every serial plant runs again under each of F2 to F5, at 7 then 8 and at 187 then 188
 * (serialPlantsByName: each plant's invocationIds with their F1 segment respelled as that name, its shared ids so
 * respelled and F1 named as that name), so GP24-N03 reds A3 at its serial plants by name expect; each member reds
 * alone and composed with its page. The CHECKS parenthetical's serial clause, A3's serial and serial plants sentences,
 * the NOT CLAIMED list, the docs of SEGMENT_PLANTS, THREE_DIGIT_SEGMENT_PLANTS, carriesSerial, SerialReading and
 * serialOf, and A3's four by-name messages name the names and candidates planted; a form under a name or with a
 * candidate no drive spells, and a serial reading keyed on which candidate a call holds at a position where no plant
 * holds that candidate in that form, are NOT CLAIMED. No reader changes: violations(), answers(), serialOf() and
 * carriesSerial() are byte-unchanged, and so are serialPlants() and every existing plant, call and witness entry; the
 * frozen literal gains the drive names, held to FIXTURES, and the roster's A3 witness gains the six by-name tables'
 * measured readings. Display paths added: none. Cut #4 (refusal #3 of cut #3, gate-prep-18 / g10-gate-s206: unmet U1
 * and U2, claims wider than pins at a request's context; ruling R-B526, rung 1 of the two request-context claim sets:
 * kill or pin): every serial plant held the both kind only in the rotations' contexts (after an other or a both
 * request or first, before a neither or a both request or last, and in the second call beside a first-call other or
 * both request), while the per-request words claimed each request's reading at each position of either call, so the
 * gate's G18-S1 and G18-S3 (serialOf reading the other call's serial only where the request opens its call or the
 * request before carries it, or only where it closes its call or the request after is not of the own kind) and G18-S2
 * (in the second call, only where the first call's request at the same position carries the second call's serial)
 * kept the census green and were realized FAIL-OPEN by its drive pages W-S1a, W-S1b and W-S2. U1 and U2: A3's context
 * plants read every one of the 65536 assignments of the four kinds to the two calls' eight requests, at 187 then 188
 * (the drives' own serial width) under each of DRIVE_NAMES, against the reading constructed from the kinds alone
 * (contextReading: per call, position and kind the carried tallies, per position the shared tallies, and the first
 * assignments read otherwise), so G18-S1, G18-S2 and G18-S3 red A3 at its context plants expect, alone and composed
 * with their pages. The CHECKS parenthetical's serial clause, A3's serial and serial plants sentences, the NOT CLAIMED
 * list, the docs of SerialReading and serialOf, and A3's serial, serial orders and serial plants messages name the
 * contexts planted; a serial reading keyed on a request's context in a context no plant spells (every context at 7
 * then 8 but the serial plants' own, in or beside a request of another form, and in calls asking the candidates in
 * another order) is NOT CLAIMED. No reader changes: violations(), answers(), serialOf(), carriesSerial() and
 * serialPlants() are byte-unchanged, and so are every existing plant, call and witness entry; the frozen literal
 * gains CALLS, and the roster's A3 witness gains the context plants' measured readings. Display paths added: none.
 * Cut #5 (refusal #4 of cut #4, gate-prep-10 / g10-gate-s210: unmet U1 and U2, claims wider than pins in cut #4's own
 * contextReading; ruling R-B550 binds the class guard on both request-context claim sets and names the cure, negative
 * controls with claims equal to pins): the context plants' expect held per-slot and same-position tallies, the
 * assignment count and the first mismatches, and no anchor counted the assignments handed or ran a misreader through
 * contextReading, so the gate's H01 to H04 (kindAt reading another slot's kind, so only 1024, 4096, 16384 or 256
 * distinct assignments were handed under each name), H05 (the shared ids compared as a set) and H06 (no mismatch
 * recorded) kept the census green while their witnesses X01 to X05 (serialOf misreading a request by the kinds of the
 * requests around it, or the shared ids in reverse) red it alone, and H01 to H03 were realized FAIL-OPEN on the
 * drives' own calls by its pages P01 to P03. U1: contextReading counts the distinct lists of the eight invocationIds
 * it hands the reading (distinct), and the context plants' expect holds them, as it holds the assignments, to
 * SERIAL_KINDS.length to the eighth, constructed (65536), so each of H01 to H04 reds A3 there; U1 and U2: A3's context
 * controls (CONTEXT_MISREADERS, each the reading constructed from the planted requests' kinds with one deviation, which
 * reads no request through serialOf: the gate's X01 to X05 forms, an own request read not carried, and eleven misreaders
 * altering what no tally holds wherever the alteration can occur: the shared ids' order, the id at each index and their
 * count, the rows, each row's length, and the name's count and spelling) are read by contextReading in serialOf's place, each read otherwise
 * in exactly the assignments its context holds (misread, counted arithmetically) and recording first the four
 * constructed for it, so H01 to H04 (contexts unread), H05 (the reversed orders unseen) and H06 (nothing recorded) red
 * A3 at the context controls' expect, alone and composed with their witnesses and pages.
 * contextReading takes the reading as a fourth parameter, serialOf by default, and counts the assignments read
 * otherwise (misread, 0 in the context plants' expect). The CHECKS parenthetical's serial clause, A3's context plants
 * sentence, the docs of ContextReading and contextReading, and A3's context plants and context controls messages name
 * the counts and the controls. No reader changes: violations(), answers(), serialOf(), carriesSerial() and
 * serialPlants() are byte-unchanged, and so are every existing plant, call and witness entry but the context plants',
 * which gain the two counts; the frozen literal gains the context controls' table (each label, constructed count and
 * first four), and the roster's A3 witness gains the context controls' measured readings. Display paths added: none.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  decideControl,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.1";
/** The bead carrying the wb-0lf.1 gate's F1 (landing 648): its lead line names the request-binding check and the gate's two points. */
const FOLLOW_UP = "wb-5omz";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R1";
const SUITE = `gp decision executor census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/gp-decision-executor-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The gp decision receipt wb-gxd7.5 vendored (gp sample's result.decision at /receipt) and the snapshot wb-gxd7.3 vendored. */
const REPLY_FIXTURE = "test/fixtures/gp-sample-receipt.json";
const SNAPSHOT_FIXTURE = "test/fixtures/gp-host-adapter-snapshot.json";
/** The producer path the generator recorded for the snapshot it sampled over. */
const SNAPSHOT_INPUT = "fixtures/conformance/host-adapter/snapshot.json";
const CORE = "src/workbench/control.ts";
const ADAPTER = "src/workbench/hosts/furnace-hosted.ts";
const ADAPTER_CLASS = "FurnaceHostedExecutor";
const PATH_ROOT = "execute";
/** The bead's Pi pin, full (the filing measures Pi's standing invariants at its 12-hex prefix). */
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** The live cases list and read every src module; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

// ---- the vocabulary (the title's names; the reply's schema, kind and the two members a decision point reads) ----

const NAMES = ["GraphPolicyCLI", "GraphDataIR"] as const;
const REPLY_SCHEMA = "graphpolicy.receipt.decision.v1";
const REPLY_KIND = "sampled-decision";
/** The reply member naming the snapshot the decision was sampled over, and its sample's member naming the chosen candidate. */
const REPLY_DIGEST = "graph_digest";
const REPLY_CHOICE = "chosen_id";
const VOCABULARY: readonly string[] = [...NAMES, REPLY_SCHEMA, REPLY_KIND, REPLY_DIGEST, REPLY_CHOICE];

const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** The vocabulary members a text spells, each as a whole case-sensitive token, in VOCABULARY order. */
function namedVocabulary(text: string): string[] {
  return VOCABULARY.filter(word => tokenPattern(word).test(text));
}

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const git = (args: readonly string[]): string => execFileSync("git", [...args], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = git(["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"]);
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: textOf(path) }));
  }
  return srcCache;
}

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
const strings = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const sha256 = (bytes: Uint8Array | string): string => createHash("sha256").update(bytes).digest("hex");

// ---- the fixture reply and snapshot (vendored producer output, read and never respelled) ----

const VENDORED: unknown = JSON.parse(textOf(REPLY_FIXTURE));
const REPLY: unknown = own(VENDORED, "receipt");
const SNAPSHOT_BYTES: Uint8Array = readFileSync(join(ROOT, SNAPSHOT_FIXTURE));
/** The same document respelled compact: other bytes, so another digest. */
const COMPACT_BYTES: Uint8Array = Buffer.from(JSON.stringify(JSON.parse(Buffer.from(SNAPSHOT_BYTES).toString("utf8"))), "utf8");
/** The digest a decision point computes over the bytes it presented: the reply's own "sha256:<hex>" form. */
const digestOf = (presented: Uint8Array): string => `sha256:${sha256(presented)}`;
/** The one source revision a presented snapshot was extracted at (its observation.revisions), or undefined. */
function revisionOf(presented: Uint8Array): string | undefined {
  let document: unknown;
  try {
    document = JSON.parse(Buffer.from(presented).toString("utf8"));
  } catch {
    return undefined;
  }
  const revisions = own(own(document, "observation"), "revisions");
  return strings(revisions) && revisions.length === 1 ? revisions[0] : undefined;
}
/** The snapshot's can_execute relations: every candidate a route can name. */
function executable(presented: Uint8Array): string[] {
  const document: unknown = JSON.parse(Buffer.from(presented).toString("utf8"));
  const relations = own(document, "relations");
  const listed: readonly unknown[] = Array.isArray(relations) ? relations : [];
  return listed.filter(entry => own(entry, "kind") === "can_execute").map(entry => String(own(entry, "id")));
}
/** The reply with its sample's chosen_id replaced: a reply whose choice is no candidate. */
function rechosen(choice: string): unknown {
  const copy: unknown = JSON.parse(JSON.stringify(REPLY));
  const sample = own(copy, "sample");
  if (record(sample)) Object.defineProperty(sample, REPLY_CHOICE, { value: choice, enumerable: true, writable: true, configurable: true });
  return copy;
}
const CURRENT = revisionOf(SNAPSHOT_BYTES) ?? "";
const MOVED = "mw-synthetic-rev-0002";
const UNCHOSEN = "exec-a2-t3";

// ---- the armed contract: the census's reading of a Pi GraphPolicyCLI decision point ----

/** The census's typed conversion of a GP reply: the formula decision a decision point executes. */
interface TypedDecision {
  readonly replySchema: string;
  readonly replyKind: string;
  readonly snapshotDigest: string;
  readonly candidates: readonly string[];
  readonly chosenId: string;
}
/** The typed conversion: undefined for a reply that is no sampled decision of the pinned schema, or whose choice is no candidate. */
function convert(reply: unknown, candidateCheck = true): TypedDecision | undefined {
  const replySchema = own(reply, "schema");
  const replyKind = own(reply, "kind");
  const snapshotDigest = own(reply, REPLY_DIGEST);
  const candidates = own(reply, "candidates");
  const chosenId = own(own(reply, "sample"), REPLY_CHOICE);
  if (replySchema !== REPLY_SCHEMA || replyKind !== REPLY_KIND || typeof snapshotDigest !== "string" || !strings(candidates) || typeof chosenId !== "string") return undefined;
  if (candidateCheck && !candidates.includes(chosenId)) return undefined;
  return Object.freeze({ replySchema, replyKind, snapshotDigest, candidates: Object.freeze([...candidates]), chosenId });
}

interface DecisionCall {
  /** The GP reply as gp wrote it, read through own data properties only. */
  readonly reply: unknown;
  /** The exact bytes Pi presented to gp as this decision's snapshot. */
  readonly presented: Uint8Array;
  readonly projection: ObservationProjection;
  /** The control request that carries a candidate's effect to its native target. */
  readonly requestOf: (candidate: string) => NativeControlRequest;
  /** The one effect seam: the only path from a decision point to a native verb or an executor request. */
  readonly effect: (decision: ControlDecision) => string;
  readonly now: () => string;
}
interface DecisionReceipt {
  readonly status: "executed" | "conflict" | "refused" | "denied";
  readonly code?: string;
  readonly candidate?: string;
  readonly answer?: string;
}
type DecisionPoint = (call: DecisionCall) => readonly DecisionReceipt[];

/** The census allowlist: every src module bound as a GraphPolicyCLI decision point, with its armed entry point. Empty today. */
const GP_DECISION_POINTS: readonly { readonly path: string; readonly point: DecisionPoint }[] = [];

const WS = "/work/gp-decision-executor";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-28T05:00:00Z";
const REQUESTED_AT = "2026-10-28T05:00:01Z";
const DECIDED_AT = "2026-10-28T05:00:02Z";
/** A later instant than REQUESTED_AT: the requestedAt of the "requested later" stranger of A3's decision records (wb-kbh1 cut #3). */
const REQUESTED_LATER = "2026-10-28T05:00:09Z";
const CONTROL_GRANTS: readonly string[] = ["observe:furnace.run.inspect", "control:furnace.stop"];
const OBSERVE_GRANTS: readonly string[] = ["observe:furnace.run.inspect"];

type Basis = "valid" | "snapshot-mismatch" | "revision-mismatch" | "reply-unconverted";
interface Fixture {
  readonly id: string;
  readonly reply: unknown;
  readonly presented: Uint8Array;
  /** The subjectBasis every observed run carries. */
  readonly observed: string;
  readonly grants: readonly string[];
  /** The fixture's basis reading, held to basisOf in A1. */
  readonly basis: Basis;
  /** The one fixture every clause admits: its reply must reach the seam once, with a core-minted permit. */
  readonly current: boolean;
}
const FIXTURES: readonly Fixture[] = [
  { id: "F1", reply: REPLY, presented: SNAPSHOT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "valid", current: true },
  { id: "F2", reply: REPLY, presented: COMPACT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "snapshot-mismatch", current: false },
  { id: "F3", reply: REPLY, presented: SNAPSHOT_BYTES, observed: CURRENT, grants: OBSERVE_GRANTS, basis: "valid", current: false },
  { id: "F4", reply: REPLY, presented: SNAPSHOT_BYTES, observed: MOVED, grants: CONTROL_GRANTS, basis: "revision-mismatch", current: false },
  { id: "F5", reply: rechosen(UNCHOSEN), presented: SNAPSHOT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "reply-unconverted", current: false },
];
/** The census's basis reading of one fixture: the conversion, then the snapshot digest, then the source revision. */
function basisOf(fixture: Fixture): Basis {
  const typed = convert(fixture.reply);
  if (typed === undefined) return "reply-unconverted";
  if (typed.snapshotDigest !== digestOf(fixture.presented)) return "snapshot-mismatch";
  if (revisionOf(fixture.presented) !== fixture.observed) return "revision-mismatch";
  return "valid";
}

const runRef = (candidate: string): NativeRef => ({ provider: "furnace", type: "run", id: `frn-run-${candidate}`, scope: WS });
const attemptRef = (candidate: string): NativeRef => ({ provider: "furnace", type: "attempt", id: `frn-atm-${candidate}`, scope: WS });
/** One observed Furnace run per can_execute relation of the snapshot, each at the fixture's basis and owning its attempt. */
function projectionOf(fixture: Fixture): ObservationProjection {
  const projection = new ObservationProjection();
  for (const candidate of executable(SNAPSHOT_BYTES)) {
    for (const source of [runRef(candidate), attemptRef(candidate)]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`, subjectBasis: fixture.observed,
        node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: runRef(candidate), to: attemptRef(candidate), kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: `frn-req-${candidate}` } });
  }
  return projection;
}
/** The control request for one candidate; a drive passes its own serial into the invocationId (0: no drive). */
function requestFor(fixture: Fixture, candidate: string, serial = 0): NativeControlRequest {
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [...fixture.grants], target: runRef(candidate), action: "stop",
    params: { confirmed: true }, invocationId: `inv-${fixture.id}-${serial}-${candidate}`, requestedAt: REQUESTED_AT };
}
/** The subjectBasis of the node a request's target names, read through the projection. */
function observedBasis(projection: ObservationProjection, request: NativeControlRequest): string | undefined {
  return projection.query({ scope: { workspace: request.scope.workspace, principal: request.scope.principal }, ref: { ...request.target }, limit: 1 }).nodes[0]?.subjectBasis;
}
const targetIdOf = (decision: unknown): unknown => own(own(own(decision, "receipt"), "target"), "id");

interface Drive {
  readonly receipts: readonly DecisionReceipt[];
  readonly calls: readonly { readonly decision: unknown; readonly answer: string }[];
  /** A copy of each request this call's requestOf returned, taken at the return and kept in the order returned: a later edit of the object edits no record (A3's record control asks one to four distinct can_execute candidates, once each, in the snapshot's order, and all four in its reverse and in one interleaving; the header's NOT CLAIMED names the rest). */
  readonly issued: readonly NativeControlRequest[];
}
/** The drives so far; a drive's serial is this count after its own increment (A3's serial control reads it). */
let driveSerial = 0;
function drive(point: DecisionPoint, fixture: Fixture): Drive {
  driveSerial += 1;
  const serial = driveSerial;
  const calls: { readonly decision: unknown; readonly answer: string }[] = [];
  const issued: NativeControlRequest[] = [];
  const effect = (decision: ControlDecision): string => {
    const answer = `frn-ack-${String(targetIdOf(decision))}`;
    calls.push({ decision, answer });
    return answer;
  };
  const requestOf = (candidate: string): NativeControlRequest => {
    const request = requestFor(fixture, candidate, serial);
    issued.push(structuredClone(request));
    return request;
  };
  const receipts = point({ reply: fixture.reply, presented: fixture.presented, projection: projectionOf(fixture), requestOf, effect, now: () => DECIDED_AT });
  return { receipts, calls, issued };
}
/** The request fields a minted receipt echoes (control.ts core(), held to the core's own receipt in A3). */
const ECHOED = ["scope", "principal", "target", "action", "invocationId", "requestedAt"] as const;
/** Whether a receipt answers a request, each echoed field read against the request's and its grant against the request's grants: claimed only in the forms A3's echo, form, split, mix and check controls and its decision records plant (the header's NOT CLAIMED names the rest). */
function answers(receipt: unknown, request: NativeControlRequest): boolean {
  const grant = own(receipt, "grant");
  return ECHOED.every(field => isDeepStrictEqual(own(receipt, field), request[field])) && typeof grant === "string" && strings(request.grants) && request.grants.includes(grant);
}
/** An in-place edit of every own member of a request: a nested array or object edited where it lives, a scalar member reassigned. */
function editEveryMember(request: NativeControlRequest): void {
  for (const key of Object.keys(request)) {
    const value = own(request, key);
    if (Array.isArray(value)) Object.defineProperty(value, value.length, { value: "edited", enumerable: true, writable: true, configurable: true });
    else if (record(value)) Object.defineProperty(value, "edited", { value: true, enumerable: true, writable: true, configurable: true });
    else Object.defineProperty(request, key, { value: `${String(value)}~`, enumerable: true, writable: true, configurable: true });
  }
}
/** A request with one member replaced: the hand-built requests of A3's split and form controls (wb-kbh1). */
const withMember = (request: NativeControlRequest, key: string, value: unknown): NativeControlRequest => ({ ...request, [key]: value }) as NativeControlRequest;
/** A value differing from the given one in its first string: a string gaining a final ~, an object whose first member differs so (A3's split and form controls, wb-kbh1). */
function differing(value: unknown): unknown {
  if (typeof value === "string") return `${value}~`;
  if (!record(value)) return value;
  const [first] = Object.keys(value);
  return first === undefined ? value : { ...value, [first]: differing(own(value, first)) };
}
/** The string forms A3's form control plants on a read field, each altering one string alone (wb-kbh1). */
const STRING_FORMS: Readonly<Record<string, (text: string) => string>> = {
  "gaining a final ~": text => `${text}~`,
  "gaining a leading ~": text => `~${text}`,
  "in another case": text => (text.toUpperCase() !== text ? text.toUpperCase() : text.toLowerCase()),
  "without its last character": text => text.slice(0, -1),
  "without its first character": text => text.slice(1),
};
/** The mixes A3's mix control plants on the chosen request before the core decides it: a member another issued request carries, or the principal thinned (wb-kbh1). */
const MIXES: Readonly<Record<string, (request: NativeControlRequest, other: NativeControlRequest) => NativeControlRequest>> = {
  "the other request's invocationId": (request, other) => ({ ...request, invocationId: other.invocationId }),
  "the other request's target": (request, other) => ({ ...request, target: other.target }),
  "the principal's role dropped": request => ({ ...request, principal: { id: request.principal.id } }),
};
/** The orders A3's record control asks the snapshot's can_execute candidates in, by position: the snapshot's own, its reverse and one interleaving (wb-kbh1). */
const ORDERS = { snapshot: [0, 1, 2, 3], reversed: [3, 2, 1, 0], interleaved: [1, 3, 0, 2] } as const;
/** Two orders by position, the first call's and the second's: the serial and replay controls ask one call in each, in a row (wb-kbh1 cut #2). */
type OrderPair = readonly [readonly number[], readonly number[]];
/** Each ordered pair of the orders, the first call's then the second's: the serial and replay controls ask in every one (wb-kbh1 cut #2). */
const ORDER_PAIRS: readonly { readonly label: string; readonly orders: OrderPair }[] = Object.entries(ORDERS).flatMap(([first, firstOrder]) =>
  Object.entries(ORDERS).map(([second, secondOrder]) => ({ label: `${first} then ${second}`, orders: [firstOrder, secondOrder] as const })),
);
/** The records A3's decision records hand decisions over, by their requests' positions in the snapshot's can_execute order: each drive form's record, the snapshot's first one, two, three and four, and all four in its reverse and in the interleaving (wb-kbh1 cut #3). */
const RECORD_FORMS: readonly { readonly label: string; readonly order: readonly number[] }[] = [
  ...[1, 2, 3, 4].map(size => ({ label: `snapshot, first ${size}`, order: ORDERS.snapshot.slice(0, size) })),
  { label: "reversed, all 4", order: [...ORDERS.reversed] },
  { label: "interleaved, all 4", order: [...ORDERS.interleaved] },
];
/** How many decisions one call of A3's decision records hands (wb-kbh1 cut #3). */
const HANDED = [1, 2, 3] as const;
/** The kinds of request A3's serial plants place, by the serials its invocationId carries as whole dash-separated segments from its third: that call's own alone, the other call's alone, both (D01's page form: its own third, the other's fourth) or neither (D02's page form: its own plus 1000) (wb-kbh1 cut #3). */
const SERIAL_KINDS = ["own", "other", "both", "neither"] as const;
type SerialKind = (typeof SERIAL_KINDS)[number];
/** The serials A3's serial plants give their two calls, the first's then the second's (wb-kbh1 cut #3). */
const PLANTED_SERIALS = [7, 8] as const;
/** The serials A3's three-digit serial plants give their two calls, the first's then the second's: every serial plant again at the width the drives' own serials run in at A3's serial reading (wb-vuoz cut #2). */
const THREE_DIGIT_SERIALS = [187, 188] as const;
/** The names the drives' invocationIds carry as their second dash-separated segment, one per fixture, in FIXTURES order (the frozen-shape case holds them to FIXTURES): A3's segment and serial plants spell F1, and A3 plants every segment plant again under each of these names with each of the snapshot's can_execute candidates, and every serial plant again under each name but F1 (wb-vuoz cut #3). */
const DRIVE_NAMES = ["F1", "F2", "F3", "F4", "F5"] as const;
/** The strangers A3's decision records derive from the fellows' own recorded request, each a request the record does not hold that the core still permits and mints, by the member its form alters (wb-kbh1 cut #3). */
const DERIVED_STRANGERS: Readonly<Record<string, { readonly member: string; readonly derive: (request: NativeControlRequest) => NativeControlRequest }>> = {
  "the principal's role dropped": { member: "principal", derive: request => ({ ...request, principal: { id: request.principal.id } }) },
  "requested later": { member: "requestedAt", derive: request => ({ ...request, requestedAt: REQUESTED_LATER }) },
};
/** A type alias, not an interface, so the reading is a Json witness as it stands. */
type RecordReading = {
  readonly requests: number;
  readonly copies: number;
  readonly inOrder: boolean;
  /** The members on which some record differs from the planted point's copy. */
  readonly changed: readonly string[];
  /** The members on which every returned object differs from its copy after the edit. */
  readonly edited: readonly string[];
  /** The members whose returned value is an object or array that still holds the same object after the edit. */
  readonly inPlace: readonly string[];
  /** The fixture ids the recorded requests' invocationIds name (their second dash-separated segment), once each. */
  readonly named: readonly string[];
  /** The target ids of the recorded requests, in the record's order (wb-kbh1: the order the call asked in, read back). */
  readonly targets: readonly string[];
};
/**
 * The record control, over one fixture: a planted point asks requestOf once for each of the snapshot's can_execute
 * candidates at the first `size` positions of `order` (by default the snapshot's own order; wb-kbh1 adds its reverse and
 * one interleaving), keeps its own copy of each at the return, then edits every member of each returned object in place
 * and executes nothing; the drive's record must equal those copies element by element, so it holds them in the order
 * asked (the snapshot's order sorts as the invocationIds do; the other two do not, which A3 reads). It also reads its own
 * edits back (edited, inPlace).
 */
function recordReading(entry: Fixture, size: number, order: readonly number[] = ORDERS.snapshot): RecordReading {
  const copies: NativeControlRequest[] = [];
  let edited: string[] = [];
  let inPlace: string[] = [];
  const probe: DecisionPoint = call => {
    const listed = executable(call.presented);
    const returned = order
      .slice(0, size)
      .flatMap(index => listed.slice(index, index + 1))
      .map(candidate => call.requestOf(candidate));
    copies.push(...returned.map(request => structuredClone(request)));
    const before = returned.map(request => new Map(Object.keys(request).map(key => [key, own(request, key)] as const)));
    for (const request of returned) editEveryMember(request);
    const keys = Object.keys(copies[0] ?? {});
    edited = keys.filter(key => returned.every((request, index) => !isDeepStrictEqual(own(request, key), own(copies[index], key))));
    inPlace = keys.filter(key =>
      returned.every((request, index) => {
        const held = before[index]?.get(key);
        return typeof held === "object" && held !== null && own(request, key) === held;
      }),
    );
    return [];
  };
  const { issued } = drive(probe, entry);
  const fields = Object.keys(copies[0] ?? {});
  const changed = fields.filter(field => issued.some((request, index) => !isDeepStrictEqual(own(request, field), own(copies[index], field))));
  const named = [...new Set(issued.map(request => request.invocationId.split("-")[1] ?? ""))];
  return { requests: issued.length, copies: copies.length, inOrder: isDeepStrictEqual(issued, copies), changed, edited, inPlace, named, targets: issued.map(request => request.target.id) };
}
/** The positions of a call's four requests, one per can_execute relation of the snapshot (the outside anchors hold the count). */
const POSITIONS = ["first", "second", "third", "last"] as const;
/** The invocationIds A3 reads carriesSerial on, with serial 87, by what each holds (wb-5omz cut #3's four, then wb-kbh1 cut #3's four, then wb-vuoz's four: the serial where the gate's drive pages D03, D04 and D05 spell the other call's, the last and the first of seven segments and the fifth of eight, and as a segment's leading part, D06's form); THREE_DIGIT_SEGMENT_PLANTS spells the same twelve at three digits (wb-vuoz cut #2), and A3 reads every one again respelled under each of DRIVE_NAMES and with each can_execute candidate (respelledPlant, wb-vuoz cut #3). */
const SEGMENT_PLANTS: Readonly<Record<string, string>> = {
  "its own segment": "inv-F1-87-exec-a1-t1",
  "a longer number": "inv-F1-870-exec-a1-t1",
  "a shorter number": "inv-F1-8-exec-a1-t1",
  "inside another segment": "inv-F1-x87-exec-a1-t1",
  "the first segment": "87-inv-F1-exec-a1-t1",
  "the last segment": "inv-F1-exec-a1-t1-87",
  "beside another serial": "inv-F1-86-87-exec-a1-t1",
  "with a leading zero": "inv-F1-087-exec-a1-t1",
  "the last of seven segments": "inv-F1-86-exec-a1-t1-87",
  "the first of seven segments": "87-F1-86-x-exec-a1-t1",
  "the fifth of eight segments": "inv-F1-86-x-87-exec-a1-t1",
  "a segment's leading part": "inv-F1-87x-exec-a1-t1",
};
/** A3's segment plants at three digits, the width the drives' own serials run in at A3's serial reading (wb-vuoz cut #2): the twelve forms of SEGMENT_PLANTS, label by label, each spelling 187 where its twin spells 87 and 186 where it spells 86 (a longer number 1870, a shorter 18, a leading zero 0187), which A3 reads with serial 187 and holds to its twin's reading, under each of DRIVE_NAMES and with each can_execute candidate too (wb-vuoz cut #3). */
const THREE_DIGIT_SEGMENT_PLANTS: Readonly<Record<string, string>> = {
  "its own segment": "inv-F1-187-exec-a1-t1",
  "a longer number": "inv-F1-1870-exec-a1-t1",
  "a shorter number": "inv-F1-18-exec-a1-t1",
  "inside another segment": "inv-F1-x187-exec-a1-t1",
  "the first segment": "187-inv-F1-exec-a1-t1",
  "the last segment": "inv-F1-exec-a1-t1-187",
  "beside another serial": "inv-F1-186-187-exec-a1-t1",
  "with a leading zero": "inv-F1-0187-exec-a1-t1",
  "the last of seven segments": "inv-F1-186-exec-a1-t1-187",
  "the first of seven segments": "187-F1-186-x-exec-a1-t1",
  "the fifth of eight segments": "inv-F1-186-x-187-exec-a1-t1",
  "a segment's leading part": "inv-F1-187x-exec-a1-t1",
};
/** A planted invocationId under one of DRIVE_NAMES: its F1 segment spelled as that name, every other segment as planted, so the serial keeps its segment, its place and its neighbours (wb-vuoz cut #3). */
const underName = (invocationId: string, name: string): string =>
  invocationId
    .split("-")
    .map(segment => (segment === "F1" ? name : segment))
    .join("-");
/** A segment plant respelled under one of DRIVE_NAMES and with one of the snapshot's can_execute candidates: its exec-a1-t1 spelled as that candidate, then its F1 segment as that name (wb-vuoz cut #3). */
const respelledPlant = (invocationId: string, name: string, candidate: string): string => underName(invocationId.replace("exec-a1-t1", candidate), name);
/** A3's segment plants by name (wb-vuoz cut #3): every plant of a segment plant table respelled under each of DRIVE_NAMES and with each can_execute candidate, by name, then candidate, then the plant's label (F1 with exec-a1-t1 is the table itself). */
function segmentPlantsByName(plants: Readonly<Record<string, string>>, candidates: readonly string[]): Record<string, Record<string, Record<string, string>>> {
  return Object.fromEntries(
    DRIVE_NAMES.map(name => [name, Object.fromEntries(candidates.map(candidate => [candidate, Object.fromEntries(Object.entries(plants).map(([label, invocationId]) => [label, respelledPlant(invocationId, name, candidate)]))]))]),
  );
}
/** Whether an invocationId carries a serial as one whole dash-separated segment: claimed only in the forms A3's twelve segment plants and its serial plants spell, at the serials they spell (the segment plants at 87 and at 187, the serial plants at 7 then 8 and at 187 then 188, the three digits wb-vuoz cut #2's) and under the names and with the candidates they spell (the segment plants under each of DRIVE_NAMES and with each can_execute candidate, the serial plants under each of DRIVE_NAMES with the four candidates in the snapshot's order, wb-vuoz cut #3's; the drives' own requestFor form and the forms of the gate's drive pages D01-D06 on the drives over every fixture among them, D03-D06 wb-vuoz's; the header's NOT CLAIMED names the rest). */
const carriesSerial = (invocationId: string, serial: number): boolean => invocationId.split("-").includes(String(serial));
/** A type alias, not an interface, so the reading is a Json witness as it stands. */
type SerialReading = {
  /** Per call, per request in the order returned: whether its invocationId carries that call's serial, and not the other call's (A3's serial plants hold each kind of request at each position of either call, wb-kbh1 cut #3, and the gate's drive pages D03-D06 at every position, wb-vuoz, at serials 7 then 8 and at 187 then 188, wb-vuoz cut #2, under each of DRIVE_NAMES, wb-vuoz cut #3, and A3's context plants each kind of request at each position of either call beside every assignment of the kinds to the other seven requests, at 187 then 188 under each of DRIVE_NAMES, wb-vuoz cut #4; claimed in the planted forms at the planted serials under the planted names and in the planted contexts only, the header's NOT CLAIMED names the rest). */
  readonly carried: readonly (readonly boolean[])[];
  /** The invocationIds both calls issued, in the first call's order (A3's serial plants hold one at each position, wb-kbh1 cut #3; claimed in the planted forms only). */
  readonly shared: readonly string[];
  /** The names the two calls' invocationIds carry as their second dash-separated segment (a drive's fixture id), once each, in the order first named (A3's serial plants hold one at each position of either call, wb-kbh1 cut #3). */
  readonly named: readonly string[];
};
/** The serial reading of two calls in a row, from the invocationIds each was returned and each call's serial (A3 holds it on planted calls, wb-kbh1 cut #2, in the forms its serial plants pin, cut #3, D03's to D06's pages among them, wb-vuoz, at serials 7 then 8 and at 187 then 188, wb-vuoz cut #2, under each of DRIVE_NAMES, wb-vuoz cut #3, and in every context of the four kinds at 187 then 188 under each of DRIVE_NAMES, its context plants, wb-vuoz cut #4; the header's NOT CLAIMED names the rest). */
function serialOf(returned: readonly (readonly { readonly invocationId: string }[])[], serials: readonly number[]): SerialReading {
  const carried = returned.map((requests, index) =>
    requests.map(request => carriesSerial(request.invocationId, serials[index] ?? 0) && !carriesSerial(request.invocationId, serials[1 - index] ?? 0)),
  );
  const [first = [], second = []] = returned;
  const shared = first.map(request => request.invocationId).filter(id => second.some(request => request.invocationId === id));
  const named = [...new Set(returned.flat().map(request => request.invocationId.split("-")[1] ?? ""))];
  return { carried, shared, named };
}
/** The serial reading in a pair of orders, with the target ids each call was returned, in the order it asked (wb-kbh1 cut #2). */
type OrderedSerialReading = SerialReading & { readonly asked: readonly (readonly string[])[] };
/**
 * The serial control: a planted point asks requestOf once per can_execute candidate of the snapshot (four requests), each
 * call in its own order of the pair (wb-kbh1 cut #2; the serial reading asks in the snapshot's order twice), and executes
 * nothing; it is driven over one fixture twice in a row, and each call's serial is driveSerial as its drive left it.
 */
function orderedSerialReading(entry: Fixture, [firstOrder, secondOrder]: OrderPair): OrderedSerialReading {
  const returned: NativeControlRequest[][] = [];
  const probe: DecisionPoint = call => {
    const listed = executable(call.presented);
    const order = returned.length === 0 ? firstOrder : secondOrder;
    returned.push(order.flatMap(index => listed.slice(index, index + 1)).map(candidate => call.requestOf(candidate)));
    return [];
  };
  const serials: number[] = [];
  drive(probe, entry);
  serials.push(driveSerial);
  drive(probe, entry);
  serials.push(driveSerial);
  return { ...serialOf(returned, serials), asked: returned.map(requests => requests.map(request => request.target.id)) };
}
/** The serial control in the snapshot's order twice: the serial reading A3 has held since wb-5omz's cut #3. */
function serialReading(entry: Fixture): SerialReading {
  const { carried, shared, named } = orderedSerialReading(entry, [ORDERS.snapshot, ORDERS.snapshot]);
  return { carried, shared, named };
}
/** A type alias, not an interface, so the reading is a Json witness as it stands: the replay at one position. */
type ReplayReading = { readonly minting: Check[]; readonly replaying: Check[]; readonly answered: readonly number[] };
/** The replay at one position in a pair of orders, with the target ids each call recorded, in the order it asked (wb-kbh1 cut #2). */
type OrderedReplayReading = ReplayReading & { readonly asked: readonly (readonly string[])[] };
/**
 * The replay control, per position of the four: a planted point driven over F1 twice in a row issues the four requests, one
 * per can_execute candidate, each call in its own order of the pair (wb-kbh1 cut #2; the replay reading asks in the
 * snapshot's order twice); its first call asks the core on the request at that position of its order and hands the seam
 * the permit, its second hands the seam that same permit. Each call's failed checks, in CHECKS order, and per call the
 * index of the recorded request the handed permit answers (-1: none).
 */
function orderedReplayReading([firstOrder, secondOrder]: OrderPair): Record<string, OrderedReplayReading> {
  const F1 = fixture("F1");
  return Object.fromEntries(
    POSITIONS.map((label, index) => {
      let held: ControlDecision | undefined;
      let made = 0;
      const point: DecisionPoint = call => {
        const listed = executable(call.presented);
        const order = made === 0 ? firstOrder : secondOrder;
        made += 1;
        const request = order.flatMap(at => listed.slice(at, at + 1)).map(candidate => call.requestOf(candidate))[index];
        if (request === undefined) return [];
        held ??= decideControl(request, { projection: call.projection, now: call.now });
        return [{ status: "executed", candidate: request.target.id, answer: call.effect(held) }];
      };
      const runs = [drive(point, F1), drive(point, F1)];
      const [minting = [], replaying = []] = runs.map(run => violations(F1, run));
      const answered = runs.map(run => run.issued.findIndex(request => answers(own(run.calls[0]?.decision, "receipt"), request)));
      return [label, { minting, replaying, answered, asked: runs.map(run => run.issued.map(request => request.target.id)) }];
    }),
  );
}
/** The replay control in the snapshot's order twice: the replay reading A3 has held since wb-5omz's cut #3. */
function replayReading(): Record<string, ReplayReading> {
  return Object.fromEntries(
    Object.entries(orderedReplayReading([ORDERS.snapshot, ORDERS.snapshot])).map(([label, { minting, replaying, answered }]) => [label, { minting, replaying, answered }]),
  );
}
/** A planted invocationId in the drive's own form, inv-<name>-<serial segments>-<candidate> (A3's serial plants, wb-kbh1 cut #3). */
const plantedId = (name: string, serials: readonly number[], candidate: string): string => `inv-${name}-${serials.join("-")}-${candidate}`;
/** The serial segments a planted request of one kind carries, given its call's serial and the other call's (wb-kbh1 cut #3). */
function kindSerials(kind: SerialKind, serial: number, otherSerial: number): number[] {
  if (kind === "own") return [serial];
  if (kind === "other") return [otherSerial];
  if (kind === "both") return [serial, otherSerial];
  return [serial + 1000];
}
/** A3's planted call pairs beside plantedSerial (wb-kbh1 cut #3): two calls of four requests each over the snapshot's candidates in its order, serials PLANTED_SERIALS, each with the reading the serial reading must give it; wb-vuoz adds the gate's drive pages D03-D06, every request respelled as each respells it (its serial third and the next serial as the seventh and last of seven segments, as the first of seven or as the fifth of eight; the serial only as the third segment's leading part, before an x); serials PLANTED_SERIALS unless given, and A3 plants every one again at THREE_DIGIT_SERIALS (wb-vuoz cut #2). */
function serialPlants(candidates: readonly string[], serials: readonly [number, number] = PLANTED_SERIALS): Record<string, { readonly returned: string[][]; readonly reading: SerialReading }> {
  const [first, second] = serials;
  const serialsOf = (call: number): readonly [number, number] => (call === 0 ? [first, second] : [second, first]);
  const kindsFrom = (shift: number): SerialKind[] => SERIAL_KINDS.map((_, at) => SERIAL_KINDS[(at + shift) % SERIAL_KINDS.length] ?? "own");
  const everyPosition = (value: boolean): boolean[] => candidates.map(() => value);
  const callOf = (call: number, kinds: readonly SerialKind[], names: readonly string[] = []): string[] =>
    candidates.map((candidate, at) => plantedId(names[at] ?? "F1", kindSerials(kinds[at] ?? "own", ...serialsOf(call)), candidate));
  const owned = SERIAL_KINDS.map(() => "own" as const);
  const rotations = SERIAL_KINDS.map((kind, shift) => {
    const kinds = [kindsFrom(shift), kindsFrom(shift + 1)];
    const returned = kinds.map((row, call) => callOf(call, row));
    const ownAt = (kinds[0] ?? []).map(entry => entry === "own");
    const reading: SerialReading = { carried: kinds.map(row => row.map(entry => entry === "own")), shared: (returned[0] ?? []).filter((_, at) => ownAt[at] === true), named: ["F1"] };
    return [`the kinds from ${kind}`, { returned, reading }] as const;
  });
  const page = (respell: (serial: number, candidate: string) => string): string[][] => serials.map(serial => candidates.map(candidate => respell(serial, candidate)));
  const both = candidates.map(candidate => plantedId("F1", [first, second], candidate));
  const [twice = "", ...rest] = callOf(0, owned);
  const names = [
    ["N4", "N3", "N2", "N1"],
    ["N8", "N7", "N6", "N5"],
  ];
  return {
    ...Object.fromEntries(rotations),
    "D01's page": { returned: page((serial, candidate) => plantedId("F1", [serial, serial + 1], candidate)), reading: { carried: [everyPosition(false), everyPosition(true)], shared: [], named: ["F1"] } },
    "D02's page": { returned: page((serial, candidate) => plantedId("F1", [serial + 1000], candidate)), reading: { carried: [everyPosition(false), everyPosition(false)], shared: [], named: ["F1"] } },
    "D03's page": { returned: page((serial, candidate) => `inv-F1-${serial}-${candidate}-${serial + 1}`), reading: { carried: [everyPosition(false), everyPosition(true)], shared: [], named: ["F1"] } },
    "D04's page": { returned: page((serial, candidate) => `${serial + 1}-F1-${serial}-x-${candidate}`), reading: { carried: [everyPosition(false), everyPosition(true)], shared: [], named: ["F1"] } },
    "D05's page": { returned: page((serial, candidate) => `inv-F1-${serial}-x-${serial + 1}-${candidate}`), reading: { carried: [everyPosition(false), everyPosition(true)], shared: [], named: ["F1"] } },
    "D06's page": { returned: page((serial, candidate) => `inv-F1-${serial}x-${candidate}`), reading: { carried: [everyPosition(false), everyPosition(false)], shared: [], named: ["F1"] } },
    "four ids both calls were returned": { returned: [both, [...both].reverse()], reading: { carried: [everyPosition(false), everyPosition(false)], shared: both, named: ["F1"] } },
    "an id one call was returned twice": { returned: [[twice, twice, ...rest.slice(0, 2)], callOf(1, owned)], reading: { carried: [everyPosition(true), everyPosition(true)], shared: [], named: ["F1"] } },
    "a name at each position": { returned: names.map((row, call) => callOf(call, owned, row)), reading: { carried: [everyPosition(true), everyPosition(true)], shared: [], named: names.flat() } },
  };
}
/** A table of A3's serial plants: per plant label, the invocationIds its two calls were returned and the reading the serial reading must give them. */
type SerialPlants = ReturnType<typeof serialPlants>;
/** A3's serial plants by name (wb-vuoz cut #3): every serial plant at the given serials again under each of DRIVE_NAMES but F1, by name: each invocationId with its F1 segment spelled as that name (N1 to N8 as planted), each reading's shared ids so respelled, and F1 named as that name. */
function serialPlantsByName(candidates: readonly string[], serials: readonly [number, number]): Record<string, SerialPlants> {
  const planted = serialPlants(candidates, serials);
  return Object.fromEntries(
    DRIVE_NAMES.filter(name => name !== "F1").map(name => [
      name,
      Object.fromEntries(
        Object.entries(planted).map(([label, { returned, reading }]) => [
          label,
          {
            returned: returned.map(ids => ids.map(invocationId => underName(invocationId, name))),
            reading: { ...reading, shared: reading.shared.map(invocationId => underName(invocationId, name)), named: reading.named.map(entry => (entry === "F1" ? name : entry)) },
          },
        ]),
      ),
    ]),
  );
}
/** The two calls of A3's context plants, in the order asked: the labels its reading keys each call's tallies by (wb-vuoz cut #4). */
const CALLS = ["first call", "second call"] as const;
/** A serial reading of two calls in a row, from the invocationIds each was returned and each call's serial: serialOf, or one of A3's context misreaders, which contextReading reads in serialOf's place (wb-vuoz cut #5). */
type SerialReader = (returned: readonly (readonly { readonly invocationId: string }[])[], serials: readonly number[]) => SerialReading;
/** A type alias, not an interface, so the reading is a Json witness as it stands: A3's context plants read under one name, by serialOf or by one of A3's context misreaders (wb-vuoz cut #4; distinct and misread wb-vuoz cut #5's). */
type ContextReading = {
  /** How many assignments of SERIAL_KINDS to the two calls' eight requests contextReading handed the reading: one per pass of its counter. */
  readonly assignments: number;
  /** How many of those assignments were distinct, counted by the list of the eight invocationIds handed to the reading, in the order handed (wb-vuoz cut #5). */
  readonly distinct: number;
  /** Per call, per position and per kind of the request there: in how many of the assignments the reading reads that request carried. */
  readonly carried: Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, number>>>>>>;
  /** Per position: in how many of the assignments the reading reads the first call's invocationId there shared. */
  readonly shared: Readonly<Record<string, number>>;
  /** In how many of the assignments the reading differs from the reading constructed from their kinds alone (wb-vuoz cut #5). */
  readonly misread: number;
  /** The first of those assignments, at most four, in the order handed, each spelled by its kinds and with what was read. */
  readonly mismatched: readonly string[];
};
/**
 * A3's context plants under one name (wb-vuoz cut #4): two calls of four requests over the snapshot's candidates in its
 * order, at the given serials, every invocationId in plantedId's form of one of SERIAL_KINDS (that call's serial alone,
 * the other call's alone, both as D01's page spells them in the first call, or neither as D02's page spells it), handed
 * to the reading (serialOf unless another is given: wb-vuoz cut #5's context controls give their misreaders) once per
 * pass of a counter over the eight requests' kinds, SERIAL_KINDS.length to the eighth passes (the assignments each
 * context control flags first are the ones spelledAssignment spells for it); the distinct lists of the eight
 * invocationIds handed are counted. Each assignment's whole reading is checked against the reading constructed from its
 * kinds alone: two rows, one per call, of one value per request; a request carried exactly when it is of the own kind;
 * the first call's invocationId at a position shared exactly when the two calls hold an own and an other there, in
 * either order (the one id both calls were returned), those ids in the first call's order and no other; and the one
 * name. The tallies count what the reading read; misread counts the assignments read otherwise, and mismatched records
 * the first four of them.
 */
function contextReading(candidates: readonly string[], serials: readonly [number, number], name: string, read: SerialReader = serialOf): ContextReading {
  const [first, second] = serials;
  const serialsOf = (call: number): readonly [number, number] => (call === 0 ? [first, second] : [second, first]);
  const requestsOf = CALLS.map((_, call) => candidates.map(candidate => SERIAL_KINDS.map(kind => ({ invocationId: plantedId(name, kindSerials(kind, ...serialsOf(call)), candidate) }))));
  const slots = CALLS.length * candidates.length;
  const ownKind = SERIAL_KINDS.indexOf("own");
  const otherKind = SERIAL_KINDS.indexOf("other");
  const tally = CALLS.map(() => candidates.map(() => SERIAL_KINDS.map(() => 0)));
  const sharedAt = candidates.map(() => 0);
  const mismatched: string[] = [];
  const distinctLists = new Set<string>();
  const kinds = Array.from({ length: slots }, () => 0);
  let assignments = 0;
  let misread = 0;
  for (let remaining = SERIAL_KINDS.length ** slots; remaining > 0; remaining -= 1) {
    const kindAt = (call: number, at: number): number => kinds[call * candidates.length + at] ?? 0;
    const returned = CALLS.map((_, call) => candidates.map((_, at) => requestsOf[call]?.[at]?.[kindAt(call, at)] ?? { invocationId: "" }));
    const { carried, shared, named } = read(returned, serials);
    assignments += 1;
    distinctLists.add(returned.flat().map(request => request.invocationId).join(" "));
    const constructedShared = candidates.flatMap((_, at) => {
      const [held, heldAcross] = [kindAt(0, at), kindAt(1, at)];
      return (held === ownKind && heldAcross === otherKind) || (held === otherKind && heldAcross === ownKind) ? [returned[0]?.[at]?.invocationId ?? ""] : [];
    });
    let readRight = carried.length === CALLS.length && shared.length === constructedShared.length && named.length === 1 && named[0] === name;
    CALLS.forEach((_, call) => {
      readRight &&= carried[call]?.length === candidates.length;
      candidates.forEach((_, at) => {
        const read = carried[call]?.[at] === true;
        readRight &&= read === (kindAt(call, at) === ownKind);
        const counts = tally[call]?.[at];
        if (read && counts !== undefined) counts[kindAt(call, at)] = (counts[kindAt(call, at)] ?? 0) + 1;
      });
    });
    shared.forEach((id, index) => {
      readRight &&= id === constructedShared[index];
    });
    candidates.forEach((_, at) => {
      if (shared.includes(returned[0]?.[at]?.invocationId ?? "")) sharedAt[at] = (sharedAt[at] ?? 0) + 1;
    });
    if (!readRight) misread += 1;
    if (!readRight && mismatched.length < 4) {
      const spelled = CALLS.map((label, call) => `${label} ${candidates.map((_, at) => SERIAL_KINDS[kindAt(call, at)] ?? "").join(", ")}`).join("; ");
      mismatched.push(`${spelled}: carried ${JSON.stringify(carried)}, shared ${JSON.stringify(shared)}, named ${JSON.stringify(named)}`);
    }
    const carry = kinds.findIndex(kind => kind < SERIAL_KINDS.length - 1);
    kinds.forEach((kind, slot) => {
      kinds[slot] = slot < carry ? 0 : slot === carry ? kind + 1 : kind;
    });
  }
  return {
    assignments,
    distinct: distinctLists.size,
    carried: Object.fromEntries(CALLS.map((label, call) => [label, Object.fromEntries(POSITIONS.map((position, at) => [position, Object.fromEntries(SERIAL_KINDS.map((kind, index) => [kind, tally[call]?.[at]?.[index] ?? 0]))]))])),
    shared: Object.fromEntries(POSITIONS.map((position, at) => [position, sharedAt[at] ?? 0])),
    misread,
    mismatched,
  };
}
/** The kinds plantedKind has read, by the two serials and the invocationId (wb-vuoz cut #5). */
const PLANTED_KINDS = new Map<string, SerialKind>();
/** The kind of a planted request in the call holding `serial`, read from its invocationId as carriesSerial reads it, once per invocationId and pair of serials: that serial alone (own), the other call's alone (other), both, or neither (wb-vuoz cut #5: A3's context misreaders read their contexts and their readings from it). */
function plantedKind(invocationId: string, serial: number, otherSerial: number): SerialKind {
  const key = `${serial} ${otherSerial} ${invocationId}`;
  const known = PLANTED_KINDS.get(key);
  if (known !== undefined) return known;
  const ownSerial = carriesSerial(invocationId, serial);
  const otherCallSerial = carriesSerial(invocationId, otherSerial);
  const kind: SerialKind = ownSerial ? (otherCallSerial ? "both" : "own") : otherCallSerial ? "other" : "neither";
  PLANTED_KINDS.set(key, kind);
  return kind;
}
/**
 * A context misreader (wb-vuoz cut #5): the reading constructed from the planted requests' kinds alone (plantedKind), as
 * contextReading constructs the reading each assignment must give (a request carried exactly when it is of the own kind;
 * the first call's invocationId at a position shared exactly when the two calls hold an own and an other there; the
 * first invocationId's second segment named), altered by `alter`, given each request's kind by call and position
 * (undefined past a call's last request). It reads no request through serialOf, so a plant in serialOf leaves it as it is.
 */
function misreading(alter: (reading: SerialReading, kindOf: (call: number, at: number) => SerialKind | undefined) => SerialReading): SerialReader {
  return (returned, serials) => {
    const kinds = returned.map((requests, call) => requests.map(request => plantedKind(request.invocationId, serials[call] ?? 0, serials[1 - call] ?? 0)));
    const kindOf = (call: number, at: number): SerialKind | undefined => kinds[call]?.[at];
    const [first = [], second = []] = kinds;
    const sharesAt = (at: number): boolean => (first[at] === "own" && second[at] === "other") || (first[at] === "other" && second[at] === "own");
    const constructed: SerialReading = {
      carried: kinds.map(row => row.map(kind => kind === "own")),
      shared: (returned[0] ?? []).filter((_, at) => sharesAt(at)).map(request => request.invocationId),
      named: [returned[0]?.[0]?.invocationId.split("-")[1] ?? ""],
    };
    return alter(constructed, kindOf);
  };
}
/** How many assignments of SERIAL_KINDS to the two calls' eight requests there are, constructed: SERIAL_KINDS.length to the eighth (wb-vuoz cut #5). */
const ASSIGNMENTS = SERIAL_KINDS.length ** (CALLS.length * POSITIONS.length);
/** How many pairs of kinds two requests can hold (wb-vuoz cut #5). */
const KIND_PAIRS = SERIAL_KINDS.length ** 2;
/**
 * Of the assignments whose four position pairs (the first call's request and the second's at one position) each hold one
 * of `pairs` kind pairs, `sharing` of which share that position's id, those sharing `least` positions or more,
 * constructed: per count of positions sharing, the ways to choose them, times the kind pairs they and the rest can hold
 * (wb-vuoz cut #5).
 */
const sharingAtLeast = (least: number, pairs: number, sharing: number): number => {
  let count = 0;
  let ways = 1;
  for (let shares = 0; shares <= POSITIONS.length; shares += 1) {
    if (shares >= least) count += ways * sharing ** shares * (pairs - sharing) ** (POSITIONS.length - shares);
    ways = (ways * (POSITIONS.length - shares)) / (shares + 1);
  }
  return count;
};
/** An assignment by its index n (from 0), spelled as contextReading's mismatched entries spell one: per call, its four requests' kinds, the request at slot call * 4 + position holding the kind whose index is that slot's base-4 digit of n (wb-vuoz cut #5: the context controls name the assignments they flag first by index). */
const spelledAssignment = (index: number): string =>
  CALLS.map((label, call) => `${label} ${POSITIONS.map((_, at) => SERIAL_KINDS[Math.floor(index / SERIAL_KINDS.length ** (call * POSITIONS.length + at)) % SERIAL_KINDS.length] ?? "").join(", ")}`).join("; ");
/** A context misreader reading the shared id at `index` with an x after it, wherever that many ids are shared (wb-vuoz cut #5). */
const sharedMisspelledAt = (index: number): SerialReader =>
  misreading(reading => (reading.shared.length > index ? { ...reading, shared: reading.shared.map((id, at) => (at === index ? `${id}x` : id)) } : reading));
/** One of A3's context controls (wb-vuoz cut #5). */
type ContextMisreader = {
  /** The misreader contextReading reads in serialOf's place. */
  readonly read: SerialReader;
  /** In how many assignments it reads otherwise than the reading constructed from the kinds alone: the assignments its context holds, counted arithmetically. */
  readonly misread: number;
  /** The first four of those assignments in contextReading's order, by index (spelledAssignment spells each). */
  readonly flagged: readonly number[];
};
/**
 * A3's context controls (wb-vuoz cut #5; ruling R-B550's negative controls): seventeen misreaders, each the reading
 * constructed from the planted requests' kinds (misreading) with one deviation where its context holds, which A3 has
 * contextReading read in serialOf's place under F1 at 187 then 188; each must be read otherwise in exactly the
 * assignments its context holds (misread, counted arithmetically), the first four of them in contextReading's order
 * (flagged, by index). The gate's witness forms X01 to X05 (refusal #4: each misreads
 * by the kinds of the requests around it) open the table, then an own request read not carried beside a neither request
 * (the carried tallies hold every request's reading by kind besides); the other eleven alter what no tally holds, wherever
 * the alteration can occur: the shared ids' order (reversed where two or more are shared), the id at each index (with an
 * x after it where that index is shared: the shared tallies count membership per position, which a reading keyed on its
 * context can keep while it changes an id) and their count (the last dropped where one or more are), and, in every
 * assignment, the two calls' rows (a third), each call's row length (one value longer), and the name's count (twice) and
 * spelling (an x after it).
 */
const CONTEXT_MISREADERS: Readonly<Record<string, ContextMisreader>> = {
  // In the second call, a both request reads carried where the first call's request one position on is of the own kind: three request pairs, each flagged by one kind pair.
  "X01's form": {
    read: misreading((reading, kindOf) => ({ ...reading, carried: reading.carried.map((row, call) => row.map((value, at) => value || (call === 1 && kindOf(1, at) === "both" && kindOf(0, at + 1) === "own"))) })),
    misread: ASSIGNMENTS - (ASSIGNMENTS / KIND_PAIRS ** 3) * (KIND_PAIRS - 1) ** 3,
    flagged: [512, 513, 514, 515],
  },
  // The same where the first call's request two positions on is of the own kind: two request pairs.
  "X02's form": {
    read: misreading((reading, kindOf) => ({ ...reading, carried: reading.carried.map((row, call) => row.map((value, at) => value || (call === 1 && kindOf(1, at) === "both" && kindOf(0, at + 2) === "own"))) })),
    misread: ASSIGNMENTS - (ASSIGNMENTS / KIND_PAIRS ** 2) * (KIND_PAIRS - 1) ** 2,
    flagged: [512, 513, 514, 515],
  },
  // The second call's last request, of the both kind, reads carried where the first call's first is of the own kind: one request pair.
  "X03's form": {
    read: misreading((reading, kindOf) => ({ ...reading, carried: reading.carried.map((row, call) => row.map((value, at) => value || (call === 1 && at === row.length - 1 && kindOf(1, at) === "both" && kindOf(0, 0) === "own"))) })),
    misread: ASSIGNMENTS / KIND_PAIRS,
    flagged: [32768, 32772, 32776, 32780],
  },
  // In either call, from the third position on, a both request reads carried where the request two before is of the other or the neither kind: four request pairs, each flagged by two kind pairs.
  "X04's form": {
    read: misreading((reading, kindOf) => ({ ...reading, carried: reading.carried.map((row, call) => row.map((value, at) => value || (at >= 2 && kindOf(call, at) === "both" && (kindOf(call, at - 2) === "other" || kindOf(call, at - 2) === "neither")))) })),
    misread: ASSIGNMENTS - (ASSIGNMENTS / KIND_PAIRS ** 4) * (KIND_PAIRS - 2) ** 4,
    flagged: [33, 35, 37, 39],
  },
  // The shared ids read in reverse where two or more are shared and the first call holds a request of the own kind: those sharing two or more, less those among them whose first call holds no own request (one kind pair of the twelve left shares).
  "X05's form": {
    read: misreading((reading, kindOf) => ({ ...reading, shared: reading.shared.length > 1 && POSITIONS.some((_, at) => kindOf(0, at) === "own") ? [...reading.shared].reverse() : reading.shared })),
    misread: sharingAtLeast(2, KIND_PAIRS, 2) - sharingAtLeast(2, KIND_PAIRS - SERIAL_KINDS.length, 1),
    flagged: [5, 17, 20, 21],
  },
  // An own request at the first call's first or second position reads not carried where the second call's first request is of the neither kind: those assignments, less those whose first call's first two requests are both of another kind.
  "an own request unread": {
    read: misreading((reading, kindOf) => ({ ...reading, carried: reading.carried.map((row, call) => row.map((value, at) => value && !(call === 0 && at < 2 && kindOf(1, 0) === "neither"))) })),
    misread: ASSIGNMENTS / SERIAL_KINDS.length - (ASSIGNMENTS / SERIAL_KINDS.length ** 3) * (SERIAL_KINDS.length - 1) ** 2,
    flagged: [768, 769, 770, 771],
  },
  // The shared ids read in reverse wherever two or more are shared.
  "the shared ids reversed": {
    read: misreading(reading => (reading.shared.length > 1 ? { ...reading, shared: [...reading.shared].reverse() } : reading)),
    misread: sharingAtLeast(2, KIND_PAIRS, 2),
    flagged: [5, 17, 20, 21],
  },
  // The id at each index of the shared ids misspelled wherever that index is shared: every assignment sharing at least one, two, three or four positions.
  "the first shared id misspelled": { read: sharedMisspelledAt(0), misread: sharingAtLeast(1, KIND_PAIRS, 2), flagged: [1, 4, 5, 6] },
  "the second shared id misspelled": { read: sharedMisspelledAt(1), misread: sharingAtLeast(2, KIND_PAIRS, 2), flagged: [5, 17, 20, 21] },
  "the third shared id misspelled": { read: sharedMisspelledAt(2), misread: sharingAtLeast(3, KIND_PAIRS, 2), flagged: [21, 69, 81, 84] },
  "the fourth shared id misspelled": { read: sharedMisspelledAt(3), misread: sharingAtLeast(4, KIND_PAIRS, 2), flagged: [85, 340, 1105, 1360] },
  // The last shared id dropped wherever one or more are shared: every assignment but those sharing none.
  "the last shared id dropped": {
    read: misreading(reading => (reading.shared.length > 0 ? { ...reading, shared: reading.shared.slice(0, -1) } : reading)),
    misread: sharingAtLeast(1, KIND_PAIRS, 2),
    flagged: [1, 4, 5, 6],
  },
  // A third row of carried, the second call's again, in every assignment.
  "an extra carried row": {
    read: misreading(reading => ({ ...reading, carried: [...reading.carried, reading.carried[1] ?? []] })),
    misread: ASSIGNMENTS,
    flagged: [0, 1, 2, 3],
  },
  // The first call's row one value longer, a fifth value not carried, in every assignment.
  "the first call's row one value longer": {
    read: misreading(reading => ({ ...reading, carried: reading.carried.map((row, call) => (call === 0 ? [...row, false] : row)) })),
    misread: ASSIGNMENTS,
    flagged: [0, 1, 2, 3],
  },
  // The second call's row one value longer, a fifth value not carried, in every assignment.
  "the second call's row one value longer": {
    read: misreading(reading => ({ ...reading, carried: reading.carried.map((row, call) => (call === 1 ? [...row, false] : row)) })),
    misread: ASSIGNMENTS,
    flagged: [0, 1, 2, 3],
  },
  // The name named twice, in every assignment.
  "the name twice": {
    read: misreading(reading => ({ ...reading, named: [...reading.named, ...reading.named] })),
    misread: ASSIGNMENTS,
    flagged: [0, 1, 2, 3],
  },
  // The name read with an x after it, in every assignment.
  "the name misspelled": {
    read: misreading(reading => ({ ...reading, named: reading.named.map(entry => `${entry}x`) })),
    misread: ASSIGNMENTS,
    flagged: [0, 1, 2, 3],
  },
};
/** One case of A3's decision records over a record (wb-kbh1 cut #3): one handed decision per entry of `fellows`, each a permit of its own minted for the recorded request at that position, but the one at `foreignAt`, when set, minted for `stranger`'s request the record does not hold (a candidate's, or the request at `base` in a derived form). */
type DecisionCase = { readonly key: string; readonly fellows: readonly number[]; readonly base: number; readonly foreignAt?: number; readonly stranger?: string };
/**
 * The cases of A3's decision records over a record of `size` requests (wb-kbh1 cut #3): for each count of handed decisions,
 * every decision minted for the recorded request at each position in turn; for two or three, each minted for the next
 * recorded request from each position on, wrapping; and each handed decision in turn minted for each stranger (each
 * candidate's request the record does not hold, then each derived stranger of the fellows' request), its fellows minted for
 * the recorded request at each position in turn (one handed decision has no fellows: its derived strangers derive from the
 * recorded request at the first position).
 */
function decisionCases(size: number, candidates: readonly string[]): DecisionCase[] {
  const positions = Array.from({ length: size }, (_, at) => at);
  const strangers = [...candidates, ...Object.keys(DERIVED_STRANGERS)];
  const strangerText = (stranger: string, base: number): string => (Object.hasOwn(DERIVED_STRANGERS, stranger) ? `request ${base + 1}, ${stranger}` : `${stranger}'s unrecorded request`);
  return HANDED.flatMap(count => [
    ...positions.map(at => ({ key: `${count} handed: all for request ${at + 1}`, fellows: Array.from({ length: count }, () => at), base: at })),
    ...(count === 1 ? [] : positions).map(at => ({
      key: `${count} handed: each for the next request from request ${at + 1} on, wrapping`,
      fellows: Array.from({ length: count }, (_, slot) => (at + slot) % size),
      base: at,
    })),
    ...Array.from({ length: count }, (_, foreignAt) => foreignAt).flatMap(foreignAt =>
      strangers.flatMap(stranger =>
        (count === 1 ? [0] : positions).map(base => ({
          key: `${count} handed: decision ${foreignAt + 1} for ${strangerText(stranger, base)}${count === 1 ? "" : `, the others for request ${base + 1}`}`,
          fellows: Array.from({ length: count }, () => base),
          base,
          foreignAt,
          stranger,
        })),
      ),
    ),
  ]);
}
/** One case of A3's decision records read in one line: per handed decision, the index of the recorded request its receipt answers (-1: none), how many distinct decision objects the call handed, then the checks the call fails (wb-kbh1 cut #3). */
const decisionLine = (answered: readonly number[], distinct: number, found: readonly Check[]): string =>
  `answered ${answered.join(" ")}; ${distinct} distinct; found ${found.length === 0 ? "none" : found.join(" ")}`;
/** A stranger read back from the receipt it was minted with: a candidate's by its invocationId, a derived one by the member its form alters (wb-kbh1 cut #3). */
function strangerReadBack(stranger: string, decision: unknown): string {
  const member = Object.hasOwn(DERIVED_STRANGERS, stranger) ? (DERIVED_STRANGERS[stranger]?.member ?? "invocationId") : "invocationId";
  return `${member} ${JSON.stringify(own(own(decision, "receipt"), member))}`;
}
/**
 * A3's decision records by hand (wb-kbh1 cut #3): over each record form, a record of F1's requests under serial 0 and, per
 * case, one F3 call handing the case's decisions over it (F3: its basis is valid and it is no current fixture, so no other
 * check speaks). Every handed decision is a permit of its own, core-minted on F1: a fellow for its recorded request, a
 * candidate's stranger for that candidate's request under serial 7 when the record holds the candidate and under serial 0
 * otherwise, a derived stranger for the recorded request at `base` in that form. Each stranger is read back from the first
 * case that hands it with fellow 1.
 */
function decisionRecordsByHand(): Record<string, { readonly record: string[]; readonly strangers: Record<string, string>; readonly cases: Record<string, string> }> {
  const F1 = fixture("F1");
  const F3 = fixture("F3");
  const candidates = executable(SNAPSHOT_BYTES);
  const projection = projectionOf(F1);
  const decide = (request: NativeControlRequest | undefined): ControlDecision | undefined => (request === undefined ? undefined : decideControl(request, { projection, now: () => DECIDED_AT }));
  return Object.fromEntries(
    RECORD_FORMS.map(({ label, order }) => {
      const issued = order.flatMap(index => candidates.slice(index, index + 1)).map(candidate => requestFor(F1, candidate));
      const strangerRequest = (stranger: string, base: number): NativeControlRequest | undefined => {
        if (!Object.hasOwn(DERIVED_STRANGERS, stranger)) return requestFor(F1, stranger, issued.some(request => request.target.id === runRef(stranger).id) ? 7 : 0);
        const from = issued[base];
        const derive = DERIVED_STRANGERS[stranger]?.derive;
        return from === undefined || derive === undefined ? undefined : derive(from);
      };
      const readBack = new Map<string, string>();
      const cases = decisionCases(issued.length, candidates).map(({ key, fellows, base, foreignAt, stranger }) => {
        const foreign = stranger === undefined ? undefined : decide(strangerRequest(stranger, base));
        if (stranger !== undefined && base === 0 && !readBack.has(stranger)) readBack.set(stranger, strangerReadBack(stranger, foreign));
        const decisions = fellows.map((at, slot) => (slot === foreignAt ? foreign : decide(issued[at]))).filter((decision): decision is ControlDecision => decision !== undefined);
        const answered = decisions.map(decision => issued.findIndex(request => answers(own(decision, "receipt"), request)));
        return [key, decisionLine(answered, new Set(decisions).size, violations(F3, { receipts: [], calls: decisions.map(decision => ({ decision, answer: "frn-ack-control" })), issued }))] as const;
      });
      return [label, { record: issued.map(request => request.invocationId), strangers: Object.fromEntries(readBack), cases: Object.fromEntries(cases) }] as const;
    }),
  );
}
/**
 * A3's decision records driven (wb-kbh1 cut #3): over each record form, per case, one drive over F1 whose planted point asks
 * requestOf for the form's candidates in its order and hands the seam the case's decisions, each a permit of its own minted
 * on the call's projection: a fellow for the request it was returned at that position, a candidate's stranger for that
 * candidate's request under serial 0, which no drive issues, a derived stranger for the returned request at `base` in that
 * form. Each stranger is read back from the decision the seam was handed, in the first case that hands it with fellow 1.
 */
function decisionRecordsDriven(): Record<string, { readonly strangers: Record<string, string>; readonly cases: Record<string, string> }> {
  const F1 = fixture("F1");
  const candidates = executable(SNAPSHOT_BYTES);
  return Object.fromEntries(
    RECORD_FORMS.map(({ label, order }) => {
      const readBack = new Map<string, string>();
      const cases = decisionCases(order.length, candidates).map(({ key, fellows, base, foreignAt, stranger }) => {
        const point: DecisionPoint = call => {
          const listed = executable(call.presented);
          const returned = order.flatMap(index => listed.slice(index, index + 1)).map(candidate => call.requestOf(candidate));
          const decide = (request: NativeControlRequest | undefined): ControlDecision | undefined =>
            request === undefined ? undefined : decideControl(request, { projection: call.projection, now: call.now });
          const from = returned[base];
          const derive = stranger === undefined ? undefined : DERIVED_STRANGERS[stranger]?.derive;
          const strangerRequest = stranger === undefined ? undefined : !Object.hasOwn(DERIVED_STRANGERS, stranger) ? requestFor(F1, stranger, 0) : from === undefined || derive === undefined ? undefined : derive(from);
          const foreign = decide(strangerRequest);
          return fellows
            .map((at, slot) => (slot === foreignAt ? foreign : decide(returned[at])))
            .flatMap(decision => (decision === undefined ? [] : [{ status: "executed" as const, candidate: String(targetIdOf(decision)), answer: call.effect(decision) }]));
        };
        const run = drive(point, F1);
        if (stranger !== undefined && foreignAt !== undefined && base === 0 && !readBack.has(stranger)) readBack.set(stranger, strangerReadBack(stranger, run.calls[foreignAt]?.decision));
        const answered = run.calls.map(({ decision }) => run.issued.findIndex(request => answers(own(decision, "receipt"), request)));
        return [key, decisionLine(answered, new Set(run.calls.map(({ decision }) => decision)).size, violations(F1, run))] as const;
      });
      return [label, { strangers: Object.fromEntries(readBack), cases: Object.fromEntries(cases) }] as const;
    }),
  );
}

const CHECKS = ["effect-unvalidated", "effect-unpermitted", "effect-unminted", "effect-unrequested", "mismatch-receipt", "current-unexecuted"] as const;
type Check = (typeof CHECKS)[number];
const MISMATCH = "snapshot-mismatch";
/** The checks one driven fixture fails, in CHECKS order. */
function violations(fixture: Fixture, { receipts, calls, issued }: Drive): Check[] {
  const found = new Set<Check>();
  for (const { decision } of calls) {
    if (fixture.basis !== "valid") found.add("effect-unvalidated");
    if (own(decision, "decision") !== "permitted") found.add("effect-unpermitted");
    if (!isCoreMintedDecision(decision)) found.add("effect-unminted");
    if (!issued.some(request => answers(own(decision, "receipt"), request))) found.add("effect-unrequested");
  }
  if (fixture.basis === MISMATCH) {
    const [only] = receipts;
    if (receipts.length !== 1 || only === undefined || (only.status !== "conflict" && only.status !== "refused") || only.code !== MISMATCH) found.add("mismatch-receipt");
  }
  if (fixture.current) {
    const minted = calls.filter(call => own(call.decision, "decision") === "permitted" && isCoreMintedDecision(call.decision));
    if (calls.length !== 1 || minted.length !== 1) found.add("current-unexecuted");
  }
  return CHECKS.filter(check => found.has(check));
}
/** One decision point over every fixture: each fixture's failed checks. */
function violationsOf(point: DecisionPoint): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(fixture => [fixture.id, violations(fixture, drive(point, fixture))]));
}

/** A hand-built permit shaped as the core mints one, never minted: what a point executing a decision directly would hand over. */
function lookalike(request: NativeControlRequest): ControlDecision {
  return {
    decision: "permitted",
    receipt: {
      contractVersion: CONTROL_CONTRACT_VERSION, requestId: `ctl_${"0".repeat(32)}`, scope: { ...request.scope }, principal: { ...request.principal },
      grant: `control:${request.target.provider}.${request.action}`, policy: CONTROL_PERMIT_POLICY, target: { ...request.target }, action: request.action,
      invocationId: request.invocationId, ownershipConfirmationRef: "frn-req-lookalike", requestedAt: request.requestedAt, decidedAt: DECIDED_AT, phase: "requested",
    },
  };
}
/** How a synthetic decision point departs from the honest one (an empty shape is the honest point). */
interface Shape {
  /** false: skip the snapshot digest comparison. */
  readonly digestCheck?: boolean;
  /** false: skip the source revision comparison. */
  readonly revisionCheck?: boolean;
  /** false: convert a reply whose choice is no candidate. */
  readonly candidateCheck?: boolean;
  /** How a snapshot-mismatch reply is reported: dropped silently, as denied, or as a conflict while still executing it. */
  readonly mismatchAs?: "silent" | "denied" | "conflict-and-effect";
  /** lookalike: never ask the core; copy: hand over a copy of the core's decision. Either skips the provenance check. */
  readonly decide?: "lookalike" | "copy";
  /** Hand the seam the core's decision whatever its verdict. */
  readonly executeDenied?: boolean;
  /** Ask the core on the issued request with the exact grant its action needs written onto the issued object itself. */
  readonly forgeGrant?: boolean;
  /** Hand the seam the first permit this point minted, in this call or an earlier one, in place of the core's answer. */
  readonly replay?: boolean;
  /** Once it holds a permit, ask requestOf nothing more: read the revision through the first request it was handed and hand the seam that first permit. */
  readonly unrequested?: boolean;
  /** Never reach the seam. */
  readonly inert?: boolean;
  /** An effect reached outside the injected seam, once per execution. */
  readonly side?: () => void;
  /** The candidate executed, when it is not the reply's choice. */
  readonly target?: (typed: TypedDecision) => string;
}
/** A forging point's request: the issued object itself, the exact grant its action needs appended to its own grants array in place (no new array). */
function forged(request: NativeControlRequest): NativeControlRequest {
  const grants = request.grants ?? [];
  Object.defineProperty(grants, grants.length, { value: `control:${request.target.provider}.${request.action}`, enumerable: true, writable: true, configurable: true });
  return request;
}
function pointOf(shape: Shape): DecisionPoint {
  let first: ControlDecision | undefined;
  let held: { readonly request: NativeControlRequest; readonly permit: ControlDecision } | undefined;
  return call => {
    const typed = convert(call.reply, shape.candidateCheck !== false);
    if (typed === undefined) return [{ status: "refused", code: "reply-unconverted" }];
    const candidate = shape.target === undefined ? typed.chosenId : shape.target(typed);
    const receipts: DecisionReceipt[] = [];
    let hidden = false;
    if (shape.digestCheck !== false && typed.snapshotDigest !== digestOf(call.presented)) {
      if (shape.mismatchAs === "silent") return [];
      if (shape.mismatchAs === "denied") return [{ status: "denied", candidate }];
      receipts.push({ status: "conflict", code: MISMATCH, candidate });
      if (shape.mismatchAs !== "conflict-and-effect") return receipts;
      hidden = true;
    }
    const reused = shape.unrequested === true ? held : undefined;
    const request = reused?.request ?? call.requestOf(candidate);
    if (shape.revisionCheck !== false && observedBasis(call.projection, request) !== revisionOf(call.presented)) {
      return [...receipts, { status: "conflict", code: "revision-mismatch", candidate }];
    }
    if (shape.inert === true) return [...receipts, { status: "denied", candidate }];
    let decision: ControlDecision;
    if (reused !== undefined) decision = reused.permit;
    else if (shape.decide === "lookalike") decision = lookalike(request);
    else {
      const asked = shape.forgeGrant === true ? forged(request) : request;
      const minted = decideControl(asked, { projection: call.projection, now: call.now });
      decision = shape.decide === "copy" ? { ...minted } : minted;
    }
    if (shape.unrequested === true && held === undefined && isCoreMintedDecision(decision)) held = { request, permit: decision };
    if (shape.replay === true) {
      if (first === undefined && isCoreMintedDecision(decision)) first = decision;
      decision = first ?? decision;
    }
    const executes = shape.executeDenied === true || (decision.decision === "permitted" && (shape.decide !== undefined || isCoreMintedDecision(decision)));
    if (!executes) return [...receipts, { status: "denied", candidate }];
    shape.side?.();
    const answer = call.effect(decision);
    return hidden ? receipts : [...receipts, { status: "executed", candidate, answer }];
  };
}
const HONEST = pointOf({});
/** The synthetic bindings that must each fail the armed check: one or more per acceptance quote. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-NO-BASIS": { digestCheck: false, revisionCheck: false },
  "M-DIGEST-ONLY": { revisionCheck: false },
  "M-REVISION-ONLY": { digestCheck: false },
  "M-UNCONVERTED": { candidateCheck: false },
  "M-DENIED": { executeDenied: true },
  "M-FORGED-GRANT": { forgeGrant: true },
  "M-REPLAYED-PERMIT": { replay: true },
  "M-NO-REQUEST-REPLAY": { unrequested: true },
  "M-LOOKALIKE": { decide: "lookalike" },
  "M-COPY": { decide: "copy" },
  "M-MISMATCH-SILENT": { mismatchAs: "silent" },
  "M-MISMATCH-DENIED": { mismatchAs: "denied" },
  "M-RECEIPT-AND-EFFECT": { mismatchAs: "conflict-and-effect" },
  "M-INERT": { inert: true },
};
const mutant = (name: string): Record<string, Check[]> => violationsOf(pointOf(MUTANTS[name] ?? {}));
const fixture = (id: string): Fixture => FIXTURES.find(entry => entry.id === id) ?? (FIXTURES[0] as Fixture);
const receiptsOf = (point: DecisionPoint, id: string): Json => drive(point, fixture(id)).receipts.map(receipt => ({ ...receipt }));
const callsOf = (point: DecisionPoint, id: string): number => drive(point, fixture(id)).calls.length;
interface Again {
  readonly table: Record<string, Check[]>;
  readonly reachedF3: number;
  /** The requests the later calls issued: F3's, then the next F1's. */
  readonly issuedLater: readonly number[];
  /** Whether F3 and the next F1 were each handed the very decision F1's call handed the seam. */
  readonly handedF1s: boolean;
  readonly nextF1: Check[];
}
/** One point instance driven over every fixture in order, then over F1 again. */
function againOf(name: string): Again {
  const point = pointOf(MUTANTS[name] ?? {});
  const driven = FIXTURES.map(entry => ({ entry, run: drive(point, entry) }));
  const next = drive(point, fixture("F1"));
  const at = (id: string): Drive | undefined => driven.find(({ entry }) => entry.id === id)?.run;
  const handedF1 = at("F1")?.calls[0]?.decision;
  return {
    table: Object.fromEntries(driven.map(({ entry, run }) => [entry.id, violations(entry, run)])),
    reachedF3: at("F3")?.calls.length ?? 0,
    issuedLater: [at("F3")?.issued.length ?? -1, next.issued.length],
    handedF1s: handedF1 !== undefined && at("F3")?.calls[0]?.decision === handedF1 && next.calls[0]?.decision === handedF1,
    nextF1: violations(fixture("F1"), next),
  };
}

// ---- the adapter's execute/interpret path (row C), derived from its own AST ----

interface PathMember {
  readonly name: string;
  readonly kind: "method" | "function" | "const";
  readonly text: string;
}
/** FurnaceHostedExecutor's execute method and every same-file callable it reaches, breadth first; null when the root is gone. */
function pathOf(text: string): readonly PathMember[] | null {
  const source = ts.createSourceFile(ADAPTER, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const methods = new Map<string, ts.Node>();
  const callables = new Map<string, { readonly kind: "function" | "const"; readonly node: ts.Node; readonly statement: ts.Node }>();
  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === ADAPTER_CLASS) {
      for (const member of statement.members) if (ts.isMethodDeclaration(member) && ts.isIdentifier(member.name)) methods.set(member.name.text, member);
    } else if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
      callables.set(statement.name.text, { kind: "function", node: statement, statement });
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        const init = declaration.initializer;
        if (ts.isIdentifier(declaration.name) && init !== undefined && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
          callables.set(declaration.name.text, { kind: "const", node: init, statement });
        }
      }
    }
  }
  if (!methods.has(PATH_ROOT)) return null;
  const members: PathMember[] = [];
  const seen = new Set<string>();
  const queue: { readonly kind: "method" | "function" | "const"; readonly name: string }[] = [{ kind: "method", name: PATH_ROOT }];
  for (let next = queue.shift(); next !== undefined; next = queue.shift()) {
    const key = `${next.kind}:${next.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const callable = next.kind === "method" ? undefined : callables.get(next.name);
    const node = next.kind === "method" ? methods.get(next.name) : callable?.node;
    const shown = next.kind === "method" ? node : callable?.statement;
    if (node === undefined || shown === undefined) continue;
    members.push({ name: next.name, kind: next.kind, text: shown.getText(source) });
    const visit = (child: ts.Node): void => {
      if (ts.isCallExpression(child)) {
        const callee = child.expression;
        if (ts.isPropertyAccessExpression(callee) && callee.expression.kind === ts.SyntaxKind.ThisKeyword && methods.has(callee.name.text)) {
          queue.push({ kind: "method", name: callee.name.text });
        } else if (ts.isIdentifier(callee)) {
          const target = callables.get(callee.text);
          if (target !== undefined) queue.push({ kind: target.kind, name: callee.text });
        }
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  }
  return members;
}
const pathKeys = (members: readonly PathMember[] | null): string[] => (members ?? []).map(member => `${member.kind}:${member.name}`);
/** The path members whose text differs between two adapter texts (a member present in one only counts as changed). */
function changedMembers(before: string, after: string): string[] {
  const left = new Map((pathOf(before) ?? []).map(member => [`${member.kind}:${member.name}`, member.text]));
  const right = new Map((pathOf(after) ?? []).map(member => [`${member.kind}:${member.name}`, member.text]));
  return [...new Set([...left.keys(), ...right.keys()])].filter(key => left.get(key) !== right.get(key));
}
/** A one-character plant inside a member's text: an empty comment before its last character. */
const plantedInside = (adapter: string, member: PathMember): string => adapter.replace(member.text, `${member.text.slice(0, -1)}/**/${member.text.slice(-1)}`);
const adapterAt = (sha: string): string => git(["show", `${sha}:${ADAPTER}`]);

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** Row T: the title's trigger; rows A to C: an acceptance clause; row Q: the residual families. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi hosts a GraphPolicyCLI decision point",
  A1: "a host test drives a fixture GP reply through the Pi decision point",
  A2: "and asserts no native verb or executor request is issued unless the converted decision passed basis validation",
  A3: "and decideControl returned permitted",
  A4: "with a core-minted receipt (isCoreMintedDecision, control.ts:255)",
  B1: "a reply whose snapshot digest differs from the observed basis",
  B2: "yields a conflict/refusal receipt",
  B3: "and no effect",
  C1: "the Furnace-hosted adapter's execute/interpret path",
  C2: "stays byte-identical",
  Q1: "R-SPELLING",
  Q2: "R-SIDE-PATH",
  Q3: "R-CHOSEN-TARGET",
  Q4: "R-ADAPTER-OUTSIDE-PATH",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi hosts a GraphPolicyCLI decision point", pins: ["T1"] },
  {
    id: "A",
    label:
      "a host test drives a fixture GP reply through the Pi decision point and asserts no native verb or executor request is issued unless the converted decision passed basis validation and decideControl returned permitted with a core-minted receipt (isCoreMintedDecision, control.ts:255)",
    pins: ["A1", "A2", "A3", "A4"],
  },
  { id: "B", label: "a reply whose snapshot digest differs from the observed basis yields a conflict/refusal receipt and no effect", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "the Furnace-hosted adapter's execute/interpret path stays byte-identical", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4"] },
];

/** The residual families' members: texts for the token reader (Q1), synthetic points (Q2, Q3), adapter plants (Q4). */
const SPELLINGS: Readonly<Record<string, string>> = {
  "camel-case": "const digest = reply.graphDigest;\nconst chosen = reply.sample.chosenId;\nconst cli = \"graphPolicyCli\";\n",
  composed: "const member = [\"graph\", \"digest\"].join(\"_\");\nconst choice = \"chosen\" + \"_id\";\n",
  "lower-case-name": "// graphpolicycli answers over a graphdatair snapshot\n",
};
/** Whether a text names an identifier as a whole word. */
const namesIdentifier = (text: string, name: string): boolean => new RegExp(`(?<![A-Za-z0-9_$])${escaped(name)}(?![A-Za-z0-9_$])`).test(text);
/**
 * Row Q4's members, derived from the adapter's AST and never spelled here: the first class method off the path, the first
 * same-file constant (a non-function initializer) a path member names, and the first import whose binding a path member names.
 */
function outsideStatements(text: string): Readonly<Record<string, string | undefined>> {
  const source = ts.createSourceFile(ADAPTER, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const members = pathOf(text) ?? [];
  const onPath = new Set(members.filter(member => member.kind === "method").map(member => member.name));
  const named = (name: string): boolean => members.some(member => namesIdentifier(member.text, name));
  let method: string | undefined;
  let constant: string | undefined;
  let importLine: string | undefined;
  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === ADAPTER_CLASS) {
      method ??= statement.members.find(member => ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && !onPath.has(member.name.text))?.getText(source);
    } else if (ts.isVariableStatement(statement) && constant === undefined) {
      const declared = statement.declarationList.declarations.filter(declaration => {
        const init = declaration.initializer;
        return ts.isIdentifier(declaration.name) && init !== undefined && !ts.isArrowFunction(init) && !ts.isFunctionExpression(init) && named(declaration.name.text);
      });
      if (declared.length > 0) constant = statement.getText(source);
    } else if (ts.isImportDeclaration(statement) && importLine === undefined) {
      const bindings = statement.importClause?.namedBindings;
      const locals = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => element.name.text) : [];
      if (locals.some(named)) importLine = statement.getText(source);
    }
  }
  return { "method-outside-path": method, "same-file-constant": constant, "import-line": importLine };
}
const OUTSIDE_PATH: Readonly<Record<string, (adapter: string) => string>> = Object.fromEntries(
  ["method-outside-path", "same-file-constant", "import-line"].map(name => [name, (adapter: string): string => {
    const statement = outsideStatements(adapter)[name];
    return statement === undefined ? adapter : plantedInside(adapter, { name, kind: "const", text: statement });
  }]),
);
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: ["side-path-point"],
  Q3: ["unchosen-target-point"],
  Q4: Object.keys(OUTSIDE_PATH),
};

// ---- the planted controls ----

const VOCABULARY_PLANTS: Readonly<Record<string, string>> = {
  names: `// a ${NAMES[0]} decision point over a ${NAMES[1]} snapshot\n`,
  reply: `if (reply.schema === "${REPLY_SCHEMA}" && reply.kind === "${REPLY_KIND}") return reply.${REPLY_DIGEST};\n`,
  choice: `const chosen = reply.sample.${REPLY_CHOICE};\n`,
  all: `${VOCABULARY.join(" ")}\n`,
  quiet: `const ${REPLY_DIGEST}s = 1;\nconst x${REPLY_CHOICE} = 2;\nconst ${NAMES[0]}s = 3;\nconst id = "${REPLY_SCHEMA}0";\nconst kind = "re${REPLY_KIND}x";\n`,
};

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const src = srcEntries();
    const hosting = src.filter(entry => namedVocabulary(entry.text).length > 0);
    const findings = hosting.map(entry => `${entry.path}: ${namedVocabulary(entry.text).join(", ")}`);
    const bound = GP_DECISION_POINTS.map(entry => entry.path);
    expect(findings, "no src module spells the GP decision vocabulary").toEqual([]);
    expect(hosting.map(entry => entry.path), "the src modules that spell it are exactly the bound decision points").toEqual(bound);
    const srcFloor = src.length >= SRC_FLOOR;
    expect(srcFloor, "the src floor").toBe(true);
    const readsCore = src.find(entry => entry.path === CORE)?.text.includes("export function isCoreMintedDecision(") === true;
    const readsAdapter = src.find(entry => entry.path === ADAPTER)?.text.includes(`export class ${ADAPTER_CLASS} `) === true;
    expect({ readsCore, readsAdapter }, "the src leg read the control core's and the adapter's real text").toEqual({ readsCore: true, readsAdapter: true });
    const controls = Object.fromEntries(Object.entries(VOCABULARY_PLANTS).map(([label, text]) => [label, namedVocabulary(text)]));
    expect(controls.all, "every member is read").toEqual([...VOCABULARY]);
    expect(controls.quiet, "near tokens are not the vocabulary").toEqual([]);
    return { findings, bound, srcFloor, readsCore, readsAdapter, controls };
  },
  A1: () => {
    const bound = GP_DECISION_POINTS.map(entry => ({ path: entry.path, violations: violationsOf(entry.point) }));
    for (const entry of bound) expect(Object.values(entry.violations).flat(), `${entry.path} meets every check`).toEqual([]);
    const bases = FIXTURES.map(entry => `${entry.id}:${basisOf(entry)}`);
    expect(bases, "each fixture's basis is the census's computed reading").toEqual(FIXTURES.map(entry => `${entry.id}:${entry.basis}`));
    const honest = violationsOf(HONEST);
    const honestCalls = Object.fromEntries(FIXTURES.map(entry => [entry.id, callsOf(HONEST, entry.id)]));
    const judged = Object.fromEntries(Object.keys(MUTANTS).map(name => [name, mutant(name)]));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(list => list.includes(check))));
    const quiet = Object.entries(judged).filter(([, table]) => Object.values(table).every(list => list.length === 0)).map(([name]) => name);
    expect(Object.values(honest).flat(), "the honest point meets every check on every fixture").toEqual([]);
    expect(honestCalls, "the honest point reaches the seam for the current reply only").toEqual({ F1: 1, F2: 0, F3: 0, F4: 0, F5: 0 });
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    const fixtureReply = {
      replyDigest: String(own(REPLY, REPLY_DIGEST)),
      presentedDigest: digestOf(SNAPSHOT_BYTES),
      chosen: String(own(own(REPLY, "sample"), REPLY_CHOICE)),
      sourceSha: String(own(own(VENDORED, "generator"), "sourceSha")),
    };
    expect(fixtureReply.replyDigest, "the fixture reply was sampled over the snapshot fixture's exact bytes").toBe(fixtureReply.presentedDigest);
    return { bound: bound.map(entry => entry.path), bases, honest, honestCalls, fired, quiet, fixtureReply, "M-INERT": judged["M-INERT"] ?? null };
  },
  A2: () => {
    const honestCalls = { F2: callsOf(HONEST, "F2"), F4: callsOf(HONEST, "F4"), F5: callsOf(HONEST, "F5") };
    expect(honestCalls, "the honest point issues nothing for a reply that fails conversion or basis validation").toEqual({ F2: 0, F4: 0, F5: 0 });
    const reached = { "M-NO-BASIS": callsOf(pointOf(MUTANTS["M-NO-BASIS"] ?? {}), "F4"), "M-UNCONVERTED": callsOf(pointOf(MUTANTS["M-UNCONVERTED"] ?? {}), "F5") };
    expect(reached, "a point skipping validation reaches the seam").toEqual({ "M-NO-BASIS": 1, "M-UNCONVERTED": 1 });
    return {
      honestCalls,
      honestReceipts: { F4: receiptsOf(HONEST, "F4"), F5: receiptsOf(HONEST, "F5") },
      reached,
      "M-NO-BASIS": mutant("M-NO-BASIS"),
      "M-DIGEST-ONLY": mutant("M-DIGEST-ONLY"),
      "M-REVISION-ONLY": mutant("M-REVISION-ONLY"),
      "M-UNCONVERTED": mutant("M-UNCONVERTED"),
    };
  },
  A3: () => {
    const F3 = fixture("F3");
    const core = decideControl(requestFor(F3, String(own(own(REPLY, "sample"), REPLY_CHOICE))), { projection: projectionOf(F3), now: () => DECIDED_AT });
    const denial: Json = core.decision === "denied" ? { decision: core.decision, policy: core.policy, category: core.category } : { decision: core.decision };
    expect(denial, "an observer grant is denied before any verb").toEqual({ decision: "denied", policy: "observer-only", category: "authorization" });
    const providers = Object.keys(NATIVE_CONTROL_ACTIONS).filter(provider => /graph|policy|(?<![a-z])gp(?![a-z])/i.test(provider));
    const request: NativeControlRequest = {
      scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["control:graphpolicy.execute"],
      target: { provider: "graphpolicy", type: "decision", id: "exec-a1-t1", scope: WS }, action: "execute", params: { confirmed: true }, invocationId: "inv-gp", requestedAt: REQUESTED_AT,
    };
    const gp = decideControl(request, { projection: projectionOf(fixture("F1")), now: () => DECIDED_AT });
    const gpVerb: Json = gp.decision === "denied" ? { decision: gp.decision, policy: gp.policy, category: gp.category } : { decision: gp.decision };
    expect(providers, "the core registers no GraphPolicyCLI provider").toEqual([]);
    expect(gpVerb, "an exact grant for a GraphPolicyCLI verb reads unknown-action").toEqual({ decision: "denied", policy: "unknown-action", category: "validation" });
    const executed = mutant("M-DENIED");
    expect(executed.F3, "a denial handed to the seam is caught").toContain("effect-unpermitted");
    const forging = mutant("M-FORGED-GRANT");
    const replayed = againOf("M-REPLAYED-PERMIT");
    const unrequestedReplay = againOf("M-NO-REQUEST-REPLAY");
    const reachedF3 = {
      "M-FORGED-GRANT": callsOf(pointOf(MUTANTS["M-FORGED-GRANT"] ?? {}), "F3"),
      "M-REPLAYED-PERMIT": replayed.reachedF3,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.reachedF3,
    };
    expect(reachedF3, "each executes F3's reply, which the core denies on F3's own request").toEqual({ "M-FORGED-GRANT": 1, "M-REPLAYED-PERMIT": 1, "M-NO-REQUEST-REPLAY": 1 });
    const nextF1 = { "M-REPLAYED-PERMIT": replayed.nextF1, "M-NO-REQUEST-REPLAY": unrequestedReplay.nextF1 };
    const issuedLater = { "M-REPLAYED-PERMIT": replayed.issuedLater, "M-NO-REQUEST-REPLAY": unrequestedReplay.issuedLater };
    const handedF1s = { "M-REPLAYED-PERMIT": replayed.handedF1s, "M-NO-REQUEST-REPLAY": unrequestedReplay.handedF1s };
    expect(handedF1s, "each replay hands F3 and the next F1 the very permit F1's call handed the seam").toEqual({ "M-REPLAYED-PERMIT": true, "M-NO-REQUEST-REPLAY": true });
    expect(issuedLater["M-NO-REQUEST-REPLAY"], "the no-request replay issues no request on F3 or the next F1").toEqual([0, 0]);
    const chosen = String(own(own(REPLY, "sample"), REPLY_CHOICE));
    const issuedObject = requestFor(F3, chosen);
    const grantsArray = issuedObject.grants;
    const asked = forged(issuedObject);
    const forgedInPlace = { sameObject: asked === issuedObject, sameGrantsArray: asked.grants === grantsArray, grants: [...(asked.grants ?? [])] };
    expect(forgedInPlace, "M-FORGED-GRANT asks on the issued object itself, the exact grant appended to its own grants array").toEqual({
      sameObject: true,
      sameGrantsArray: true,
      grants: [...F3.grants, ...CONTROL_GRANTS.filter(grant => !F3.grants.includes(grant))],
    });
    const returnedToPoint: { readonly request: NativeControlRequest; readonly grants: readonly string[] | undefined }[] = [];
    const handedToSeam: { readonly decision: string; readonly minted: boolean }[] = [];
    pointOf(MUTANTS["M-FORGED-GRANT"] ?? {})({
      reply: F3.reply,
      presented: F3.presented,
      projection: projectionOf(F3),
      requestOf: candidate => {
        const request = requestFor(F3, candidate);
        returnedToPoint.push({ request, grants: request.grants });
        return request;
      },
      effect: decision => {
        handedToSeam.push({ decision: String(own(decision, "decision")), minted: isCoreMintedDecision(decision) });
        return "frn-ack-forged";
      },
      now: () => DECIDED_AT,
    });
    const forgedAtCallSite = {
      returned: returnedToPoint.length,
      sameGrantsArray: returnedToPoint.every(entry => entry.request.grants === entry.grants),
      grants: returnedToPoint.map(entry => [...(entry.request.grants ?? [])]),
      handed: handedToSeam,
    };
    expect(forgedAtCallSite, "M-FORGED-GRANT's point appends the grant to the own grants array of the very object requestOf returned, and the seam is handed a core-minted permit").toEqual({
      returned: 1,
      sameGrantsArray: true,
      grants: [[...F3.grants, ...CONTROL_GRANTS.filter(grant => !F3.grants.includes(grant))]],
      handed: [{ decision: "permitted", minted: true }],
    });
    const unrequested = {
      "M-FORGED-GRANT": forging.F3,
      "M-REPLAYED-PERMIT": replayed.table.F3,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.table.F3,
      "M-REPLAYED-PERMIT next F1": nextF1["M-REPLAYED-PERMIT"],
      "M-NO-REQUEST-REPLAY next F1": nextF1["M-NO-REQUEST-REPLAY"],
    };
    for (const [name, found] of Object.entries(unrequested)) expect(found, `${name}: a permit for a request this call did not issue is caught`).toContain("effect-unrequested");
    const candidates = executable(SNAPSHOT_BYTES);
    const sizes = candidates.map((_, index) => index + 1);
    const recorded = Object.fromEntries(FIXTURES.map(entry => [entry.id, sizes.map(size => recordReading(entry, size))]));
    const F1 = fixture("F1");
    const mintedFor = requestFor(F1, chosen);
    const members = Object.keys(mintedFor);
    const copiedAtReturn = (size: number, id: string, order: readonly number[] = ORDERS.snapshot): RecordReading => ({
      requests: size,
      copies: size,
      inOrder: true,
      changed: [],
      edited: members,
      inPlace: members.filter(key => typeof own(mintedFor, key) === "object"),
      named: [id],
      targets: order
        .slice(0, size)
        .flatMap(index => candidates.slice(index, index + 1))
        .map(candidate => runRef(candidate).id),
    });
    expect(recorded, "on every fixture, for a call asking requestOf once for each of the snapshot's first one, two, three or four can_execute candidates, the drive records a copy of each returned request, taken at the return and equal element by element to the planted point's own copies: an in-place edit of every member afterwards edits no record").toEqual(
      Object.fromEntries(FIXTURES.map(entry => [entry.id, [1, 2, 3, 4].map(size => copiedAtReturn(size, entry.id))])),
    );
    const serial = Object.fromEntries(FIXTURES.map(entry => [entry.id, serialReading(entry)]));
    const everyPosition = [true, true, true, true];
    expect(serial, "on every fixture, each request of each of two calls in a row, first, second, third and last, carries that call's serial and not the other call's, as the serial reading reads them in the planted forms and contexts; the two calls share no invocationId").toEqual(
      Object.fromEntries(FIXTURES.map(entry => [entry.id, { carried: [everyPosition, everyPosition], shared: [], named: [entry.id] }])),
    );
    const segments = Object.fromEntries(Object.entries(SEGMENT_PLANTS).map(([label, invocationId]) => [label, carriesSerial(invocationId, 87)]));
    expect(segments, "on the twelve planted invocationIds (serial 87), the serial as the whole first, third or last segment of a six-segment id, as the whole fourth of seven beside 86, as the whole last or the whole first of seven, or as the whole fifth of eight, reads carried; 870, 8, x87, 087 and 87x as the third of six read not carried (every other form is NOT CLAIMED)").toEqual({
      "its own segment": true,
      "a longer number": false,
      "a shorter number": false,
      "inside another segment": false,
      "the first segment": true,
      "the last segment": true,
      "beside another serial": true,
      "with a leading zero": false,
      "the last of seven segments": true,
      "the first of seven segments": true,
      "the fifth of eight segments": true,
      "a segment's leading part": false,
    });
    const threeDigitSegments = Object.fromEntries(Object.entries(THREE_DIGIT_SEGMENT_PLANTS).map(([label, invocationId]) => [label, carriesSerial(invocationId, 187)]));
    expect(threeDigitSegments, "wb-vuoz cut #2: on the twelve planted invocationIds at three digits (serial 187, beside 186), each form reads as its two-digit twin reads: 187 as the whole first, third or last segment of a six-segment id, as the whole fourth of seven beside 186, as the whole last or the whole first of seven, or as the whole fifth of eight, reads carried; 1870, 18, x187, 0187 and 187x as the third of six read not carried (a form at a serial width no plant of it spells is NOT CLAIMED)").toEqual(segments);
    const replays = replayReading();
    expect(replays, "a permit minted for the request at any of the four positions of one call answers that request and meets every check there, and handed to the seam on the next call answers none and fails effect-unrequested alone").toEqual({
      first: { minting: [], replaying: ["effect-unrequested"], answered: [0, -1] },
      second: { minting: [], replaying: ["effect-unrequested"], answered: [1, -1] },
      third: { minting: [], replaying: ["effect-unrequested"], answered: [2, -1] },
      last: { minting: [], replaying: ["effect-unrequested"], answered: [3, -1] },
    });
    const permit = decideControl(mintedFor, { projection: projectionOf(F1), now: () => DECIDED_AT });
    const others = candidates.filter(candidate => candidate !== chosen).map(candidate => requestFor(F1, candidate));
    const [otherRequest = mintedFor] = others;
    const foreign = decideControl(otherRequest, { projection: projectionOf(F1), now: () => DECIDED_AT });
    const handed = (id: string, decisions: readonly ControlDecision[], issued: readonly NativeControlRequest[]): Check[] =>
      violations(fixture(id), { receipts: [], calls: decisions.map(decision => ({ decision, answer: "frn-ack-control" })), issued });
    const judged = (issued: readonly NativeControlRequest[]): Check[] => handed("F1", [permit], issued);
    const records = Object.fromEntries(
      sizes.flatMap(size => sizes.slice(0, size).map(at => [`${at} of ${size}`, [...others.slice(0, at - 1), mintedFor, ...others.slice(at - 1, size - 1)]])),
    );
    const positions = Object.fromEntries(Object.entries(records).map(([label, issued]) => [label, [issued.indexOf(mintedFor), issued.length]]));
    expect(positions, "the permit's own request sits at each position of a call issuing one, two, three or four requests").toEqual({
      "1 of 1": [0, 1],
      "1 of 2": [0, 2],
      "2 of 2": [1, 2],
      "1 of 3": [0, 3],
      "2 of 3": [1, 3],
      "3 of 3": [2, 3],
      "1 of 4": [0, 4],
      "2 of 4": [1, 4],
      "3 of 4": [2, 4],
      "4 of 4": [3, 4],
    });
    const unanswering = [...others, requestFor(F1, chosen, 1)];
    const answered = {
      none: Object.fromEntries(FIXTURES.map(entry => [entry.id, handed(entry.id, [permit], [])])),
      ...Object.fromEntries(Object.entries(records).map(([label, issued]) => [label, judged(issued)])),
      ...Object.fromEntries(sizes.map(size => [`none of ${size}`, judged(unanswering.slice(0, size))])),
    };
    expect(answered, "a permit handed with no request issued fails the check on every fixture; its own request issued at each position of a call issuing one to four requests passes; with one to four requests recorded and none its own (other candidates' requests, then its own candidate's under another serial) it fails").toEqual({
      none: {
        F1: ["effect-unrequested"],
        F2: ["effect-unvalidated", "effect-unrequested", "mismatch-receipt"],
        F3: ["effect-unrequested"],
        F4: ["effect-unvalidated", "effect-unrequested"],
        F5: ["effect-unvalidated", "effect-unrequested"],
      },
      "1 of 1": [],
      "1 of 2": [],
      "2 of 2": [],
      "1 of 3": [],
      "2 of 3": [],
      "3 of 3": [],
      "1 of 4": [],
      "2 of 4": [],
      "3 of 4": [],
      "4 of 4": [],
      "none of 1": ["effect-unrequested"],
      "none of 2": ["effect-unrequested"],
      "none of 3": ["effect-unrequested"],
      "none of 4": ["effect-unrequested"],
    });
    const decided = (decisions: readonly ControlDecision[], issued: readonly NativeControlRequest[]): { readonly answering: boolean[]; readonly found: Check[] } => ({
      answering: decisions.map(decision => issued.some(request => answers(own(decision, "receipt"), request))),
      found: handed("F3", decisions, issued),
    });
    const decisions = {
      "a first decision answering none": decided([foreign, permit], [mintedFor]),
      "a second decision answering none": decided([permit, foreign], [mintedFor]),
      "both decisions answering": decided([permit, foreign], [mintedFor, otherRequest]),
      "the first of three answering none": decided([foreign, permit, permit], [mintedFor]),
      "the middle of three answering none": decided([permit, foreign, permit], [mintedFor]),
      "the last of three answering none": decided([permit, permit, foreign], [mintedFor]),
      "all three answering": decided([permit, foreign, permit], [mintedFor, otherRequest]),
    };
    expect(decisions, "of two or three decisions handed in one F3 call, the one at each position minted for a request the call did not record fails the check, and all minted for recorded requests pass").toEqual({
      "a first decision answering none": { answering: [false, true], found: ["effect-unrequested"] },
      "a second decision answering none": { answering: [true, false], found: ["effect-unrequested"] },
      "both decisions answering": { answering: [true, true], found: [] },
      "the first of three answering none": { answering: [false, true, true], found: ["effect-unrequested"] },
      "the middle of three answering none": { answering: [true, false, true], found: ["effect-unrequested"] },
      "the last of three answering none": { answering: [true, true, false], found: ["effect-unrequested"] },
      "all three answering": { answering: [true, true, true], found: [] },
    });
    const permits = candidates.map(candidate => decideControl(requestFor(F1, candidate), { projection: projectionOf(F1), now: () => DECIDED_AT }));
    const [firstPermit = permit] = permits;
    const outside = decideControl(requestFor(F1, chosen, 1), { projection: projectionOf(F1), now: () => DECIDED_AT });
    const recordOf = (size: number): NativeControlRequest[] => candidates.slice(0, size).map(candidate => requestFor(F1, candidate));
    const placements = { "first of two": [0, 2], "second of two": [1, 2], "first of three": [0, 3], "middle of three": [1, 3], "last of three": [2, 3] } as const;
    const overRecord = (at: number, count: number, decision: ControlDecision, issued: readonly NativeControlRequest[]): { readonly requests: number; readonly answered: number[]; readonly found: Check[] } => {
      const handedDecisions = Array.from({ length: count }, (_, index) => (index === at ? decision : firstPermit));
      return { requests: issued.length, answered: handedDecisions.map(entry => issued.findIndex(request => answers(own(entry, "receipt"), request))), found: handed("F3", handedDecisions, issued) };
    };
    const decisionsOverRecords = Object.fromEntries(
      Object.entries(placements).map(([label, [at, count]]) => [
        label,
        {
          ...Object.fromEntries(sizes.flatMap(size => sizes.slice(0, size).map(position => [`${position} of ${size}`, overRecord(at, count, permits[position - 1] ?? outside, recordOf(size))]))),
          ...Object.fromEntries(sizes.map(size => [`none of ${size}`, overRecord(at, count, outside, recordOf(size))])),
        },
      ]),
    );
    expect(decisionsOverRecords, "in one F3 call handing two or three decisions over a record of F1's requests for the snapshot's first one, two, three or four can_execute candidates, in the snapshot's order, the decision at the first or second of two and at the first, middle or last of three, its fellows the permit for the record's first request, passes minted for the request at each position of that record and fails minted for the record's first candidate's request under serial 1, which the record does not hold; each reads the record's size and, per handed decision, the index of the recorded request its receipt answers (-1: none), beside the checks the call fails").toEqual({
      "first of two": {
        "1 of 1": { requests: 1, answered: [0, 0], found: [] },
        "1 of 2": { requests: 2, answered: [0, 0], found: [] },
        "2 of 2": { requests: 2, answered: [1, 0], found: [] },
        "1 of 3": { requests: 3, answered: [0, 0], found: [] },
        "2 of 3": { requests: 3, answered: [1, 0], found: [] },
        "3 of 3": { requests: 3, answered: [2, 0], found: [] },
        "1 of 4": { requests: 4, answered: [0, 0], found: [] },
        "2 of 4": { requests: 4, answered: [1, 0], found: [] },
        "3 of 4": { requests: 4, answered: [2, 0], found: [] },
        "4 of 4": { requests: 4, answered: [3, 0], found: [] },
        "none of 1": { requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
        "none of 2": { requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
        "none of 3": { requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
        "none of 4": { requests: 4, answered: [-1, 0], found: ["effect-unrequested"] },
      },
      "second of two": {
        "1 of 1": { requests: 1, answered: [0, 0], found: [] },
        "1 of 2": { requests: 2, answered: [0, 0], found: [] },
        "2 of 2": { requests: 2, answered: [0, 1], found: [] },
        "1 of 3": { requests: 3, answered: [0, 0], found: [] },
        "2 of 3": { requests: 3, answered: [0, 1], found: [] },
        "3 of 3": { requests: 3, answered: [0, 2], found: [] },
        "1 of 4": { requests: 4, answered: [0, 0], found: [] },
        "2 of 4": { requests: 4, answered: [0, 1], found: [] },
        "3 of 4": { requests: 4, answered: [0, 2], found: [] },
        "4 of 4": { requests: 4, answered: [0, 3], found: [] },
        "none of 1": { requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
        "none of 2": { requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
        "none of 3": { requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
        "none of 4": { requests: 4, answered: [0, -1], found: ["effect-unrequested"] },
      },
      "first of three": {
        "1 of 1": { requests: 1, answered: [0, 0, 0], found: [] },
        "1 of 2": { requests: 2, answered: [0, 0, 0], found: [] },
        "2 of 2": { requests: 2, answered: [1, 0, 0], found: [] },
        "1 of 3": { requests: 3, answered: [0, 0, 0], found: [] },
        "2 of 3": { requests: 3, answered: [1, 0, 0], found: [] },
        "3 of 3": { requests: 3, answered: [2, 0, 0], found: [] },
        "1 of 4": { requests: 4, answered: [0, 0, 0], found: [] },
        "2 of 4": { requests: 4, answered: [1, 0, 0], found: [] },
        "3 of 4": { requests: 4, answered: [2, 0, 0], found: [] },
        "4 of 4": { requests: 4, answered: [3, 0, 0], found: [] },
        "none of 1": { requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        "none of 2": { requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        "none of 3": { requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        "none of 4": { requests: 4, answered: [-1, 0, 0], found: ["effect-unrequested"] },
      },
      "middle of three": {
        "1 of 1": { requests: 1, answered: [0, 0, 0], found: [] },
        "1 of 2": { requests: 2, answered: [0, 0, 0], found: [] },
        "2 of 2": { requests: 2, answered: [0, 1, 0], found: [] },
        "1 of 3": { requests: 3, answered: [0, 0, 0], found: [] },
        "2 of 3": { requests: 3, answered: [0, 1, 0], found: [] },
        "3 of 3": { requests: 3, answered: [0, 2, 0], found: [] },
        "1 of 4": { requests: 4, answered: [0, 0, 0], found: [] },
        "2 of 4": { requests: 4, answered: [0, 1, 0], found: [] },
        "3 of 4": { requests: 4, answered: [0, 2, 0], found: [] },
        "4 of 4": { requests: 4, answered: [0, 3, 0], found: [] },
        "none of 1": { requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
        "none of 2": { requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
        "none of 3": { requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
        "none of 4": { requests: 4, answered: [0, -1, 0], found: ["effect-unrequested"] },
      },
      "last of three": {
        "1 of 1": { requests: 1, answered: [0, 0, 0], found: [] },
        "1 of 2": { requests: 2, answered: [0, 0, 0], found: [] },
        "2 of 2": { requests: 2, answered: [0, 0, 1], found: [] },
        "1 of 3": { requests: 3, answered: [0, 0, 0], found: [] },
        "2 of 3": { requests: 3, answered: [0, 0, 1], found: [] },
        "3 of 3": { requests: 3, answered: [0, 0, 2], found: [] },
        "1 of 4": { requests: 4, answered: [0, 0, 0], found: [] },
        "2 of 4": { requests: 4, answered: [0, 0, 1], found: [] },
        "3 of 4": { requests: 4, answered: [0, 0, 2], found: [] },
        "4 of 4": { requests: 4, answered: [0, 0, 3], found: [] },
        "none of 1": { requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
        "none of 2": { requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
        "none of 3": { requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
        "none of 4": { requests: 4, answered: [0, 0, -1], found: ["effect-unrequested"] },
      },
    });
    const noneMinted = String(own(own(outside, "receipt"), "invocationId"));
    expect(noneMinted, "the none entries' decision is minted for the record's first candidate's request under serial 1").toBe(`inv-F1-1-${chosen}`);
    const unrecordedFor = (size: number): NativeControlRequest[] => [
      ...candidates.slice(size).map(candidate => requestFor(F1, candidate)),
      ...candidates.map(candidate => requestFor(F1, candidate, 1)),
    ];
    const unrecordedOverRecords = Object.fromEntries(
      Object.entries(placements).map(([label, [at, count]]) => [
        label,
        Object.fromEntries(
          sizes.map(size => [
            `over ${size}`,
            unrecordedFor(size).map(request => {
              const decision = decideControl(request, { projection: projectionOf(F1), now: () => DECIDED_AT });
              return { minted: String(own(own(decision, "receipt"), "invocationId")), ...overRecord(at, count, decision, recordOf(size)) };
            }),
          ]),
        ),
      ]),
    );
    expect(unrecordedOverRecords, "in the same F3 calls over a record of F1's requests for the snapshot's first one, two, three or four can_execute candidates under serial 0, the decision at the first or second of two and at the first, middle or last of three, its fellows the permit for the record's first request, fails minted for each request of those four candidates under serial 0 or 1 that the record does not hold, one at a time (each candidate's outside the record under serial 0, then each of the four candidates' under serial 1, in the snapshot's order), each reading naming the invocationId its decision's receipt carries beside the record's size, the index each handed decision's receipt answers (-1: none) and the checks the call fails").toEqual({
      "first of two": {
        "over 1": [
          { minted: "inv-F1-0-exec-a1-t2", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t2", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 1, answered: [-1, 0], found: ["effect-unrequested"] },
        ],
        "over 2": [
          { minted: "inv-F1-0-exec-a2-t2", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 2, answered: [-1, 0], found: ["effect-unrequested"] },
        ],
        "over 3": [
          { minted: "inv-F1-0-exec-a2-t3", requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 3, answered: [-1, 0], found: ["effect-unrequested"] },
        ],
        "over 4": [
          { minted: "inv-F1-1-exec-a1-t1", requests: 4, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 4, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 4, answered: [-1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 4, answered: [-1, 0], found: ["effect-unrequested"] },
        ],
      },
      "second of two": {
        "over 1": [
          { minted: "inv-F1-0-exec-a1-t2", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t2", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 1, answered: [0, -1], found: ["effect-unrequested"] },
        ],
        "over 2": [
          { minted: "inv-F1-0-exec-a2-t2", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 2, answered: [0, -1], found: ["effect-unrequested"] },
        ],
        "over 3": [
          { minted: "inv-F1-0-exec-a2-t3", requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 3, answered: [0, -1], found: ["effect-unrequested"] },
        ],
        "over 4": [
          { minted: "inv-F1-1-exec-a1-t1", requests: 4, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 4, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 4, answered: [0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 4, answered: [0, -1], found: ["effect-unrequested"] },
        ],
      },
      "first of three": {
        "over 1": [
          { minted: "inv-F1-0-exec-a1-t2", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t2", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 1, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        ],
        "over 2": [
          { minted: "inv-F1-0-exec-a2-t2", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 2, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        ],
        "over 3": [
          { minted: "inv-F1-0-exec-a2-t3", requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 3, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        ],
        "over 4": [
          { minted: "inv-F1-1-exec-a1-t1", requests: 4, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 4, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 4, answered: [-1, 0, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 4, answered: [-1, 0, 0], found: ["effect-unrequested"] },
        ],
      },
      "middle of three": {
        "over 1": [
          { minted: "inv-F1-0-exec-a1-t2", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t2", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 1, answered: [0, -1, 0], found: ["effect-unrequested"] },
        ],
        "over 2": [
          { minted: "inv-F1-0-exec-a2-t2", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 2, answered: [0, -1, 0], found: ["effect-unrequested"] },
        ],
        "over 3": [
          { minted: "inv-F1-0-exec-a2-t3", requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 3, answered: [0, -1, 0], found: ["effect-unrequested"] },
        ],
        "over 4": [
          { minted: "inv-F1-1-exec-a1-t1", requests: 4, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 4, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 4, answered: [0, -1, 0], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 4, answered: [0, -1, 0], found: ["effect-unrequested"] },
        ],
      },
      "last of three": {
        "over 1": [
          { minted: "inv-F1-0-exec-a1-t2", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t2", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 1, answered: [0, 0, -1], found: ["effect-unrequested"] },
        ],
        "over 2": [
          { minted: "inv-F1-0-exec-a2-t2", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-0-exec-a2-t3", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 2, answered: [0, 0, -1], found: ["effect-unrequested"] },
        ],
        "over 3": [
          { minted: "inv-F1-0-exec-a2-t3", requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t1", requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 3, answered: [0, 0, -1], found: ["effect-unrequested"] },
        ],
        "over 4": [
          { minted: "inv-F1-1-exec-a1-t1", requests: 4, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a1-t2", requests: 4, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t2", requests: 4, answered: [0, 0, -1], found: ["effect-unrequested"] },
          { minted: "inv-F1-1-exec-a2-t3", requests: 4, answered: [0, 0, -1], found: ["effect-unrequested"] },
        ],
      },
    });
    const receipt = own(permit, "receipt");
    const echoedByCore = record(receipt) ? Object.keys(receipt).filter(key => Object.hasOwn(mintedFor, key) && isDeepStrictEqual(own(receipt, key), own(mintedFor, key))) : [];
    expect(echoedByCore, "the request fields the core's own receipt echoes are the ones answers() reads (ECHOED)").toEqual([...ECHOED]);
    const altered = (value: unknown): unknown => (typeof value === "string" ? `${value}~` : record(value) ? { ...value, altered: true } : null);
    const read = [...ECHOED, "grant"];
    const echo = {
      minted: answers(receipt, mintedFor),
      grantsReversed: answers(receipt, { ...mintedFor, grants: [...(mintedFor.grants ?? [])].reverse() }),
      altered: Object.fromEntries(read.map(field => [field, answers(record(receipt) ? { ...receipt, [field]: altered(own(receipt, field)) } : null, mintedFor)])),
    };
    expect(echo, "a minted receipt answers its own request, with that request's grants in either order, and no longer with one echoed field or its grant altered alone as planted (a string or the grant gaining a final ~, an object gaining a member)").toEqual({
      minted: true,
      grantsReversed: true,
      altered: Object.fromEntries(read.map(field => [field, false])),
    });
    const grant = String(own(receipt, "grant"));
    /** One side's planted forms: each formed member as the altered side carries it (null: absent), and the forms under which the receipt still answers its own request. */
    const formsOf = (side: "receipt" | "request"): { readonly formed: Record<string, Json>; readonly answering: string[] } => {
      const source = side === "receipt" ? receipt : mintedFor;
      const formed: Record<string, Json> = {};
      const answering: string[] = [];
      /** One form: this side's member `key` set to `value` (the receipt's removed when it is undefined), every other member and the other side intact. */
      const plant = (label: string, key: string, value: unknown): void => {
        const kept = Object.keys(record(receipt) ? receipt : {}).filter(member => member !== key);
        const altered: unknown =
          side === "receipt" ? Object.fromEntries([...kept.map(member => [member, own(receipt, member)] as const), ...(value === undefined ? [] : [[key, value] as const])]) : withMember(mintedFor, key, value);
        const carried = own(altered, key);
        formed[label] = carried === undefined ? null : (structuredClone(carried) as Json);
        if (side === "receipt" ? answers(altered, mintedFor) : answers(receipt, withMember(mintedFor, key, value))) answering.push(label);
      };
      plant("unaltered", "action", own(source, "action"));
      for (const field of ECHOED) {
        const value = own(source, field);
        if (typeof value === "string") {
          for (const [label, form] of Object.entries(STRING_FORMS)) plant(`${field} ${label}`, field, form(value));
        } else if (record(value)) {
          plant(`${field} gaining a member`, field, { ...value, altered: true });
          for (const key of Object.keys(value)) {
            plant(`${field} lacking ${key}`, field, Object.fromEntries(Object.keys(value).filter(member => member !== key).map(member => [member, own(value, member)] as const)));
            plant(`${field} holding another ${key}`, field, { ...value, [key]: differing(own(value, key)) });
          }
        }
      }
      const grants = mintedFor.grants ?? [];
      for (const [label, form] of Object.entries(STRING_FORMS)) {
        if (side === "receipt") plant(`grant ${label}`, "grant", form(grant));
        else plant(`grant ${label}`, "grants", grants.map(held => (held === grant ? form(held) : held)));
      }
      if (side === "receipt") plant("grant absent", "grant", undefined);
      else plant("grant absent", "grants", grants.filter(held => held !== grant));
      return { formed, answering };
    };
    const forms = { receipt: formsOf("receipt"), request: formsOf("request") };
    expect({ receipt: forms.receipt.answering, request: forms.request.answering }, "wb-kbh1 forms: on F1 the permit's receipt answers its own request no longer with one read field altered alone, on the receipt's side or on the request's, in any planted form (an echoed string or the grant gaining a final or a leading ~, in another case, without its last or its first character; an echoed object gaining a member, lacking one or holding another value under one, member by member; the grant absent), while it still answers with its action set to its own value (the reader's positive control)").toEqual({ receipt: ["unaltered"], request: ["unaltered"] });
    /** The indices of the recorded requests holding each read field of a receipt: an echoed field equal to the request's, the grant among the request's grants. */
    const heldBy = (of: unknown, issued: readonly NativeControlRequest[]): Record<string, number[]> =>
      Object.fromEntries(
        read.map(item => [
          item,
          issued.flatMap((request, index) => ((item === "grant" ? (request.grants ?? []).includes(String(own(of, "grant"))) : isDeepStrictEqual(own(of, item), own(request, item))) ? [index] : [])),
        ]),
      );
    /** Every read field held by both recorded requests, but the ones named. */
    const heldAs = (named: Readonly<Record<string, readonly number[]>>): Record<string, readonly number[]> => Object.fromEntries(read.map(item => [item, named[item] ?? [0, 1]]));
    const differingIn = (field: string): NativeControlRequest =>
      field === "grant" ? withMember(mintedFor, "grants", (mintedFor.grants ?? []).filter(held => held !== grant)) : withMember(mintedFor, field, differing(own(mintedFor, field)));
    const partnerOf = (field: string): string => (field === "invocationId" ? "target" : "invocationId");
    const splits = Object.fromEntries(
      read.map(field => {
        const issued = [differingIn(field), differingIn(partnerOf(field))];
        return [field, { heldBy: heldBy(receipt, issued), answering: issued.map(request => answers(receipt, request)), found: judged(issued) }];
      }),
    );
    expect(splits, "wb-kbh1 split: on F1 the permit handed over a record of two requests, one differing from its receipt in one read field alone and the other in the invocationId alone (in the target alone, where the first differs in the invocationId), each read field in turn, fails the check: that field is held by the second request alone, the other request's field by the first alone, every other read field by both, and its receipt answers neither").toEqual(
      Object.fromEntries(read.map(field => [field, { heldBy: heldAs({ [field]: [1], [partnerOf(field)]: [0] }), answering: [false, false], found: ["effect-unrequested"] }])),
    );
    const mixing =
      (mix: (request: NativeControlRequest, other: NativeControlRequest) => NativeControlRequest): DecisionPoint =>
      call => {
        const [request, other] = [chosen, ...executable(call.presented).filter(candidate => candidate !== chosen)].slice(0, 2).map(candidate => call.requestOf(candidate));
        if (request === undefined || other === undefined) return [];
        return [{ status: "executed", candidate: chosen, answer: call.effect(decideControl(mix(request, other), { projection: call.projection, now: call.now })) }];
      };
    const mixed = Object.fromEntries(
      Object.entries(MIXES).map(([label, mix]) => {
        const run = drive(mixing(mix), F1);
        const handedDecision = run.calls[0]?.decision;
        return [
          label,
          {
            decision: String(own(handedDecision, "decision")),
            minted: isCoreMintedDecision(handedDecision),
            heldBy: heldBy(own(handedDecision, "receipt"), run.issued),
            answering: run.issued.map(request => answers(own(handedDecision, "receipt"), request)),
            found: violations(F1, run),
          },
        ];
      }),
    );
    const mixHolders: Readonly<Record<string, Readonly<Record<string, readonly number[]>>>> = {
      "the other request's invocationId": { target: [0], invocationId: [1] },
      "the other request's target": { target: [1], invocationId: [0] },
      "the principal's role dropped": { principal: [], target: [0], invocationId: [0] },
    };
    expect(mixed, "wb-kbh1 mix: a planted point over F1 that issues the chosen request and another candidate's, then asks the core on the chosen request carrying the other's invocationId, carrying the other's target, or with the principal's role dropped, is handed a core-minted permit whose receipt answers neither request (the mixed field held by the other request alone, the other field the two requests differ in by the chosen request alone; the thinned principal by neither), and fails effect-unrequested alone").toEqual(
      Object.fromEntries(Object.keys(MIXES).map(label => [label, { decision: "permitted", minted: true, heldBy: heldAs(mixHolders[label] ?? {}), answering: [false, false], found: ["effect-unrequested"] }])),
    );
    const ordered = Object.fromEntries(
      FIXTURES.map(entry => [entry.id, { reversed: recordReading(entry, candidates.length, ORDERS.reversed), interleaved: recordReading(entry, candidates.length, ORDERS.interleaved) }]),
    );
    expect(ordered, "wb-kbh1 order: on every fixture, a call asking requestOf once for each of the four candidates in the snapshot's reverse order, and in the interleaving second, last, first, third, is recorded as the planted point's own copies, element by element: in the order asked").toEqual(
      Object.fromEntries(FIXTURES.map(entry => [entry.id, { reversed: copiedAtReturn(candidates.length, entry.id, ORDERS.reversed), interleaved: copiedAtReturn(candidates.length, entry.id, ORDERS.interleaved) }])),
    );
    const orderSorts = Object.fromEntries(
      Object.entries(ORDERS).map(([label, order]) => {
        const invocationIds = order.flatMap(index => candidates.slice(index, index + 1)).map(candidate => requestFor(F1, candidate, 1).invocationId);
        return [label, isDeepStrictEqual(invocationIds, [...invocationIds].sort())];
      }),
    );
    expect(orderSorts, "the snapshot's order asks for the candidates with their invocationIds sorted, and neither other order does, so a record kept sorted reads otherwise there").toEqual({ snapshot: true, reversed: false, interleaved: false });
    const plantedSerial = serialOf(
      [
        [{ invocationId: "inv-F1-7-exec-a1-t1" }, { invocationId: "inv-F1-8-exec-a1-t2" }],
        [{ invocationId: "inv-F1-8-exec-a1-t2" }, { invocationId: "inv-F2-8-exec-a2-t2" }],
      ],
      [7, 8],
    );
    expect(plantedSerial, "wb-kbh1 cut #2: the serial reading reads planted calls (serials 7 then 8): a request carrying the other call's serial as its third segment, in place of its own, is not carried, the invocationId both calls were returned is shared, and the fixtures the invocationIds name as their second segment are named once each").toEqual({
      carried: [
        [true, false],
        [true, true],
      ],
      shared: ["inv-F1-8-exec-a1-t2"],
      named: ["F1", "F2"],
    });
    const askedIn = (order: readonly number[]): string[] => order.flatMap(index => candidates.slice(index, index + 1)).map(candidate => runRef(candidate).id);
    const serialOrders = Object.fromEntries(FIXTURES.map(entry => [entry.id, Object.fromEntries(ORDER_PAIRS.map(({ label, orders }) => [label, orderedSerialReading(entry, orders)]))]));
    expect(serialOrders, "wb-kbh1 cut #2 serial orders: on every fixture, of two calls in a row each asking requestOf for all four candidates in its own order, in each ordered pair of the three orders (the snapshot's, its reverse, the interleaving), each request of each call, first, second, third and last asked, carries that call's serial and not the other call's, as the serial reading reads them in the planted forms and contexts, the two calls share no invocationId, and each call's targets read back in the order it asked").toEqual(
      Object.fromEntries(
        FIXTURES.map(entry => [
          entry.id,
          Object.fromEntries(ORDER_PAIRS.map(({ label, orders: [first, second] }) => [label, { carried: [everyPosition, everyPosition], shared: [], named: [entry.id], asked: [askedIn(first), askedIn(second)] }])),
        ]),
      ),
    );
    const replayOrders = Object.fromEntries(ORDER_PAIRS.map(({ label, orders }) => [label, orderedReplayReading(orders)]));
    expect(replayOrders, "wb-kbh1 cut #2 replay orders: on F1, of two calls in a row each asking for all four candidates in its own order, in each ordered pair of the three orders, a permit the first call executes for the request at any of the four positions of its order answers that request and meets every check there, and handed to the seam in the second call answers none of its requests and fails effect-unrequested alone; each call's targets read back in the order it asked").toEqual(
      Object.fromEntries(
        ORDER_PAIRS.map(({ label, orders: [first, second] }) => [
          label,
          Object.fromEntries(POSITIONS.map((position, index) => [position, { minting: [], replaying: ["effect-unrequested"], answered: [index, -1], asked: [askedIn(first), askedIn(second)] }])),
        ]),
      ),
    );
    const plants = serialPlants(candidates);
    const serialPlanted = Object.fromEntries(
      Object.entries(plants).map(([label, { returned }]) => [label, { returned, ...serialOf(returned.map(ids => ids.map(invocationId => ({ invocationId }))), PLANTED_SERIALS) }]),
    );
    expect(serialPlanted, "wb-kbh1 cut #3 serial plants: of two planted calls of four requests in plantedId's form or in a drive page's (serials 7 then 8), a request at any position of either call, in the contexts these plants hold it in (the rotations' cyclic order of the kinds, each page's calls in one form throughout), reads carried when its third segment is that call's serial, alone or before 9 (D01's page, second call), and not carried when its third segment is the other's alone or the serial plus 1000 (neither, D02's page), or its third and fourth segments are the two calls' serials, in either order (both, D01's page, the ids both calls were returned); on D03's to D06's pages (wb-vuoz), a request carrying its call's serial third reads carried when the next serial it carries as the last of seven segments (D03's), the first of seven (D04's) or the fifth of eight (D05's) is not the other call's (the second call) and not carried when it is (the first call), and a request carrying its serial only as the third segment's leading part reads not carried in either call (D06's); each planted id both calls were returned, at any positions, reads shared, in the first call's order, and an id only one call was returned, twice, does not; each name the planted ids carry as their second segment, at any position of either call, reads named once, in the order first named (a serial reading keyed on a request's context in a context no plant spells is NOT CLAIMED; at 187 then 188 the context plants read every context of the four kinds)").toEqual(
      Object.fromEntries(Object.entries(plants).map(([label, { returned, reading }]) => [label, { returned, ...reading }])),
    );
    const controls = Object.fromEntries(Object.entries(CONTEXT_MISREADERS).map(([label, control]) => [label, contextReading(candidates, THREE_DIGIT_SERIALS, "F1", control.read)]));
    expect(
      Object.fromEntries(Object.entries(controls).map(([label, { assignments, distinct, misread, mismatched }]) => [label, { assignments, distinct, misread, flagged: mismatched.map(entry => entry.slice(0, entry.indexOf(":"))) }])),
      "wb-vuoz cut #5 context controls: under F1 at serials 187 then 188, contextReading, reading each of the seventeen context misreaders in serialOf's place (each the reading constructed from the planted requests' kinds with one deviation where its context holds: the gate's witness forms X01 to X05 and an own request read not carried, each keyed on the kinds of the requests around it; the shared ids reversed wherever two or more are shared, the id at each index misspelled wherever that index is shared, the last dropped wherever one or more are; a third row, each call's row one value longer, the name twice, the name misspelled, in every assignment), hands it 65536 assignments, 65536 distinct, reads each misreader otherwise in exactly the assignments its context holds, counted arithmetically, and records first the four constructed for it, in contextReading's order",
    ).toEqual(Object.fromEntries(Object.entries(CONTEXT_MISREADERS).map(([label, { misread, flagged }]) => [label, { assignments: ASSIGNMENTS, distinct: ASSIGNMENTS, misread, flagged: flagged.map(spelledAssignment) }])));
    const contexts = Object.fromEntries(DRIVE_NAMES.map(name => [name, contextReading(candidates, THREE_DIGIT_SERIALS, name)]));
    const everyAssignment = SERIAL_KINDS.length ** (CALLS.length * candidates.length);
    const constructedContexts = {
      assignments: everyAssignment,
      distinct: everyAssignment,
      carried: Object.fromEntries(CALLS.map(label => [label, Object.fromEntries(POSITIONS.map(position => [position, Object.fromEntries(SERIAL_KINDS.map(kind => [kind, kind === "own" ? everyAssignment / SERIAL_KINDS.length : 0]))]))])),
      shared: Object.fromEntries(POSITIONS.map(position => [position, (2 * everyAssignment) / SERIAL_KINDS.length ** 2])),
      misread: 0,
      mismatched: [],
    };
    expect(contexts, "wb-vuoz cut #4 context plants (the distinct and misread counts wb-vuoz cut #5's): at serials 187 then 188, under each fixture name the drives spell, F1 to F5, two planted calls of four requests over the snapshot's candidates in its order, every invocationId in plantedId's form of one of the four kinds (that call's serial third alone, the other call's alone, both: that call's third and the other's fourth, D01's page form, or neither: the serial plus 1000, D02's), are handed to the serial reading in 65536 assignments, 65536 distinct lists of the eight invocationIds, so in every one of the 65536 assignments of the four kinds to the eight requests, each once: a request at any position of either call reads carried exactly when it is of the own kind, whatever kinds the seven other requests hold before and after it in its call and at any position of the other call (per call, position and kind, carried in 16384 assignments for the own kind and in none for the other three); the first call's id at a position reads shared exactly when the two calls hold an own and an other there, in either order (8192 assignments per position), in the first call's order and no other; the name reads named once; and no assignment reads otherwise (misread 0: each assignment's whole reading checked against the reading constructed from its kinds alone; a serial reading keyed on a request's context at 7 then 8, in or beside a request of another form, or with a call's candidates in another order, is NOT CLAIMED)").toEqual(Object.fromEntries(DRIVE_NAMES.map(name => [name, constructedContexts])));
    const threeDigitPlants = serialPlants(candidates, THREE_DIGIT_SERIALS);
    const threeDigitSerialPlanted = Object.fromEntries(
      Object.entries(threeDigitPlants).map(([label, { returned }]) => [label, { returned, ...serialOf(returned.map(ids => ids.map(invocationId => ({ invocationId }))), THREE_DIGIT_SERIALS) }]),
    );
    expect(threeDigitSerialPlanted, "wb-vuoz cut #2 serial plants at three digits: every serial plant again at serials 187 then 188 (the second call's next serial 189, the serial plus 1000 1187 and 1188) reads as at 7 then 8: a request at any position of either call, in the contexts these plants hold it in, reads carried when its third segment is that call's serial, alone or before 189 (D01's page, second call), and not carried when its third segment is the other's alone or the serial plus 1000, or its third and fourth segments are the two calls' serials, in either order; on D03's to D06's pages a request carrying its call's serial third reads carried when the next serial it carries as the last of seven segments, the first of seven or the fifth of eight is not the other call's (the second call) and not carried when it is (the first call), and a request carrying its serial only as the third segment's leading part, 187x or 188x, reads not carried in either call; each planted id both calls were returned reads shared, in the first call's order, an id only one call was returned, twice, does not, and each name reads named once, in the order first named (a serial at a width no serial plant spells is NOT CLAIMED; beside these plants' contexts, the context plants read every context of the four kinds at 187 then 188)").toEqual(
      Object.fromEntries(Object.entries(threeDigitPlants).map(([label, { returned, reading }]) => [label, { returned, ...reading }])),
    );
    const formCandidates = (order: readonly number[]): string[] => order.flatMap(index => candidates.slice(index, index + 1));
    const expectedLine = ({ fellows, foreignAt }: DecisionCase, driven: boolean): string =>
      decisionLine(
        fellows.map((at, slot) => (slot === foreignAt ? -1 : at)),
        fellows.length,
        CHECKS.filter(check => (check === "effect-unrequested" && foreignAt !== undefined) || (check === "current-unexecuted" && driven && fellows.length > 1)),
      );
    const casesOf = (order: readonly number[], driven: boolean): Record<string, string> =>
      Object.fromEntries(decisionCases(order.length, candidates).map(entry => [entry.key, expectedLine(entry, driven)]));
    const derivedReadBack = { "the principal's role dropped": `principal ${JSON.stringify({ id: SCOPE.principal })}`, "requested later": `requestedAt ${JSON.stringify(REQUESTED_LATER)}` };
    const decisionRecords = decisionRecordsByHand();
    expect(decisionRecords, "wb-kbh1 cut #3 decision records by hand: over each drive form's record of F1's requests (the snapshot's first one to four candidates', all four reversed or interleaved), one F3 call per case handing one, two or three decisions: every decision a permit of its own minted for the recorded request at one position, or each for the next recorded request from one position on, passes, each answering its request; each handed decision in turn minted for each candidate's request the record does not hold (under serial 7 when the record holds that candidate) or for its fellows' request with the principal's role dropped or requested later, its fellows for the recorded request at one position, fails effect-unrequested, it alone answering none").toEqual(
      Object.fromEntries(
        RECORD_FORMS.map(({ label, order }) => [
          label,
          {
            record: formCandidates(order).map(candidate => requestFor(F1, candidate).invocationId),
            strangers: {
              ...Object.fromEntries(candidates.map(candidate => [candidate, `invocationId ${JSON.stringify(requestFor(F1, candidate, formCandidates(order).includes(candidate) ? 7 : 0).invocationId)}`])),
              ...derivedReadBack,
            },
            cases: casesOf(order, false),
          },
        ]),
      ),
    );
    const decisionRecordsOnF1 = decisionRecordsDriven();
    expect(decisionRecordsOnF1, "wb-kbh1 cut #3 decision records driven: on F1, a planted point asking requestOf for each drive form's candidates in its order and handing one, two or three decisions minted on its own call: every decision a permit of its own minted for the request it was returned at one position, or each for the next returned request from one position on, passes (current-unexecuted beside two or three); each handed decision in turn minted for each candidate's request under serial 0, which no drive issues, or for its fellows' request with the principal's role dropped or requested later, its fellows for the request at one position, fails effect-unrequested, it alone answering none").toEqual(
      Object.fromEntries(
        RECORD_FORMS.map(({ label, order }) => [
          label,
          {
            strangers: { ...Object.fromEntries(candidates.map(candidate => [candidate, `invocationId ${JSON.stringify(requestFor(F1, candidate, 0).invocationId)}`])), ...derivedReadBack },
            cases: casesOf(order, true),
          },
        ]),
      ),
    );
    const readSegmentPlants = (byName: Record<string, Record<string, Record<string, string>>>, serial: number): Record<string, Record<string, Record<string, boolean>>> =>
      Object.fromEntries(
        Object.entries(byName).map(([name, byCandidate]) => [
          name,
          Object.fromEntries(Object.entries(byCandidate).map(([candidate, plants]) => [candidate, Object.fromEntries(Object.entries(plants).map(([label, invocationId]) => [label, carriesSerial(invocationId, serial)]))])),
        ]),
      );
    const asPlanted = Object.fromEntries(DRIVE_NAMES.map(name => [name, Object.fromEntries(candidates.map(candidate => [candidate, segments]))]));
    const segmentPlantsUnderNames = segmentPlantsByName(SEGMENT_PLANTS, candidates);
    const segmentsByName = readSegmentPlants(segmentPlantsUnderNames, 87);
    expect(segmentsByName, "wb-vuoz cut #3 segment plants by name: each of the twelve segment plants (serial 87) respelled under each fixture name the drives spell, F1 to F5, in place of F1 and with each of the snapshot's four can_execute candidates in place of exec-a1-t1 reads as the plant itself reads: the serial as the whole first, third or last segment of six, the whole fourth of seven beside 86, the whole last or first of seven or the whole fifth of eight carried, and 870, 8, x87, 087 and 87x as the third of six not carried (a name or a candidate no drive spells is NOT CLAIMED)").toEqual(asPlanted);
    const threeDigitSegmentPlantsUnderNames = segmentPlantsByName(THREE_DIGIT_SEGMENT_PLANTS, candidates);
    const threeDigitSegmentsByName = readSegmentPlants(threeDigitSegmentPlantsUnderNames, 187);
    expect(threeDigitSegmentsByName, "wb-vuoz cut #3 segment plants by name at three digits: each of the twelve three-digit segment plants (serial 187, beside 186) respelled under each fixture name F1 to F5 in place of F1 and with each of the four candidates in place of exec-a1-t1 reads as its two-digit twin reads: 187 as the whole first, third or last segment of six, the whole fourth of seven beside 186, the whole last or first of seven or the whole fifth of eight carried, and 1870, 18, x187, 0187 and 187x as the third of six not carried (a name or a candidate no drive spells is NOT CLAIMED)").toEqual(asPlanted);
    const readSerialPlants = (byName: Record<string, SerialPlants>, serials: readonly [number, number]): Record<string, Record<string, Json>> =>
      Object.fromEntries(
        Object.entries(byName).map(([name, planted]) => [
          name,
          Object.fromEntries(Object.entries(planted).map(([label, { returned }]) => [label, { returned, ...serialOf(returned.map(ids => ids.map(invocationId => ({ invocationId }))), serials) }])),
        ]),
      );
    const constructedReadings = (byName: Record<string, SerialPlants>): Record<string, Record<string, Json>> =>
      Object.fromEntries(Object.entries(byName).map(([name, planted]) => [name, Object.fromEntries(Object.entries(planted).map(([label, { returned, reading }]) => [label, { returned, ...reading }]))]));
    const plantsUnderNames = serialPlantsByName(candidates, PLANTED_SERIALS);
    const serialPlantsUnderNames = readSerialPlants(plantsUnderNames, PLANTED_SERIALS);
    expect(serialPlantsUnderNames, "wb-vuoz cut #3 serial plants by name: every serial plant again under each fixture name but F1, F2 to F5 in place of F1 (serials 7 then 8), reads as under F1: a request at any position of either call, in the contexts these plants hold it in, reads carried when its third segment is that call's serial, alone or before 9, and not carried when its third segment is the other's alone or the serial plus 1000, or its third and fourth segments are the two calls' serials; on D03's to D06's pages a request reads carried in the second call and not in the first on D03's, D04's and D05's, and in neither on D06's; the ids both calls were returned read shared, an id one call was returned twice does not, and each name the planted ids carry as their second segment, that fixture's or N1 to N8 at each position, reads named once, in the order first named (a name no drive spells is NOT CLAIMED, beside N1 to N8 in the own kind, and so is a serial reading keyed on a request's context in a context no plant spells)").toEqual(constructedReadings(plantsUnderNames));
    const threeDigitPlantsUnderNames = serialPlantsByName(candidates, THREE_DIGIT_SERIALS);
    const threeDigitSerialPlantsUnderNames = readSerialPlants(threeDigitPlantsUnderNames, THREE_DIGIT_SERIALS);
    expect(threeDigitSerialPlantsUnderNames, "wb-vuoz cut #3 serial plants by name at three digits: every serial plant again under each of F2 to F5 in place of F1, at serials 187 then 188 (the second call's next serial 189, the serial plus 1000 1187 and 1188), reads as at 7 then 8 under that name, each request at any position of either call, in the contexts these plants hold it in, carried or not as there, the ids both calls were returned shared and each name named once (a serial at a width no serial plant spells, and a name no drive spells, are NOT CLAIMED; beside these plants' contexts, the context plants read every context of the four kinds at 187 then 188 under each name)").toEqual(constructedReadings(threeDigitPlantsUnderNames));
    return {
      providers,
      denial,
      gpVerb,
      "M-DENIED": executed,
      "M-FORGED-GRANT": forging,
      "M-REPLAYED-PERMIT": replayed.table,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.table,
      reachedF3,
      nextF1,
      issuedLater,
      handedF1s,
      forgedInPlace,
      forgedAtCallSite,
      recorded,
      serial,
      segments,
      threeDigitSegments,
      replays,
      positions,
      answered,
      decisions,
      decisionsOverRecords,
      unrecordedOverRecords,
      echoedByCore,
      echo,
      forms,
      splits,
      mixed,
      ordered,
      orderSorts,
      serialOrders,
      replayOrders,
      plantedSerial,
      segmentPlants: SEGMENT_PLANTS,
      threeDigitSegmentPlants: THREE_DIGIT_SEGMENT_PLANTS,
      serialPlants: serialPlanted,
      threeDigitSerialPlants: threeDigitSerialPlanted,
      decisionRecords,
      decisionRecordsOnF1,
      segmentPlantsByName: segmentPlantsUnderNames,
      segmentsByName,
      threeDigitSegmentPlantsByName: threeDigitSegmentPlantsUnderNames,
      threeDigitSegmentsByName,
      serialPlantsByName: serialPlantsUnderNames,
      threeDigitSerialPlantsByName: threeDigitSerialPlantsUnderNames,
      contextPlants: contexts,
      contextControls: controls,
    };
  },
  A4: () => {
    const F1 = fixture("F1");
    const chosen = String(own(own(REPLY, "sample"), REPLY_CHOICE));
    const minted = decideControl(requestFor(F1, chosen), { projection: projectionOf(F1), now: () => DECIDED_AT });
    const F3 = fixture("F3");
    const denied = decideControl(requestFor(F3, chosen), { projection: projectionOf(F3), now: () => DECIDED_AT });
    const truth = {
      minted: isCoreMintedDecision(minted),
      spread: isCoreMintedDecision({ ...minted }),
      json: isCoreMintedDecision(JSON.parse(JSON.stringify(minted))),
      denial: isCoreMintedDecision(denied),
      reply: isCoreMintedDecision(REPLY),
      typed: isCoreMintedDecision(convert(REPLY)),
    };
    expect(truth, "only the very permit the core minted is core-minted").toEqual({ minted: true, spread: false, json: false, denial: false, reply: false, typed: false });
    return { truth, "M-LOOKALIKE": mutant("M-LOOKALIKE"), "M-COPY": mutant("M-COPY") };
  },
  B1: () => {
    const F2 = fixture("F2");
    const replyDigest = String(own(F2.reply, REPLY_DIGEST));
    const presented = digestOf(F2.presented);
    const currentDigest = digestOf(fixture("F1").presented);
    expect(presented, "F2's presented bytes hash to a digest the reply does not carry").not.toBe(replyDigest);
    expect(currentDigest, "while F1's bytes hash to the reply's own").toBe(replyDigest);
    const sameDocument = isDeepStrictEqual(JSON.parse(Buffer.from(F2.presented).toString("utf8")), JSON.parse(Buffer.from(fixture("F1").presented).toString("utf8")));
    expect(sameDocument, "F2 is the same document in other bytes").toBe(true);
    return { replyDigest, presentedDigest: presented, currentDigest, sameDocument, basis: basisOf(F2), honestReceipts: receiptsOf(HONEST, "F2") };
  },
  B2: () => {
    const honest = receiptsOf(HONEST, "F2");
    expect(honest, "the honest point records one conflict receipt naming the mismatch").toEqual([{ status: "conflict", code: MISMATCH, candidate: "exec-a1-t1" }]);
    return { honest, "M-MISMATCH-SILENT": mutant("M-MISMATCH-SILENT"), "M-MISMATCH-DENIED": mutant("M-MISMATCH-DENIED") };
  },
  B3: () => {
    const honestCalls = callsOf(HONEST, "F2");
    expect(honestCalls, "the honest point issues no effect for a mismatched reply").toBe(0);
    const both = pointOf(MUTANTS["M-RECEIPT-AND-EFFECT"] ?? {});
    const judged = mutant("M-RECEIPT-AND-EFFECT");
    expect(judged.F2, "a receipt beside an effect still fails, on the effect alone").toEqual(["effect-unvalidated"]);
    return { honestCalls, bothCalls: callsOf(both, "F2"), bothReceipts: receiptsOf(both, "F2"), "M-RECEIPT-AND-EFFECT": judged };
  },
  C1: () => {
    const head = textOf(ADAPTER);
    const members = pathOf(head);
    expect(members, "the adapter holds the path's root").not.toBeNull();
    const keys = pathKeys(members);
    expect(keys.slice(0, 1), "the path opens at FurnaceHostedExecutor.execute").toEqual([`method:${PATH_ROOT}`]);
    expect(keys.filter(key => key === "method:interpret"), "and reaches interpret once").toEqual(["method:interpret"]);
    const digests = (members ?? []).map(member => `${member.kind}:${member.name}:${sha256(member.text).slice(0, 16)}`);
    return { keys, digests, pathDigest: sha256((members ?? []).map(member => member.text).join("\n")) };
  },
  C2: () => {
    const head = textOf(ADAPTER);
    const pinned = adapterAt(PI_PIN);
    const atHead = pathKeys(pathOf(head));
    const atPin = pathKeys(pathOf(pinned));
    expect(atHead, "the path at HEAD has the pin's members").toEqual(atPin);
    const changed = changedMembers(pinned, head);
    expect(changed, "every path member is byte-identical to its text at the bead's pin").toEqual([]);
    const planted = Object.fromEntries((pathOf(head) ?? []).map(member => [`${member.kind}:${member.name}`, changedMembers(head, plantedInside(head, member))]));
    for (const [key, found] of Object.entries(planted)) expect(found, `a plant inside ${key} is its change, only`).toEqual([key]);
    return { pin: PI_PIN, atPin, changed, planted };
  },
  Q1: () => {
    const findings = Object.fromEntries(Object.entries(SPELLINGS).map(([name, text]) => [name, namedVocabulary(text)]));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    return findings;
  },
  Q2: () => {
    let side = 0;
    const found = violationsOf(pointOf({ side: () => { side += 1; } }));
    expect(Object.values(found).flat(), "R-SIDE-PATH: the checks read the seam only").toEqual([]);
    expect(side, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, side };
  },
  Q3: () => {
    const point = pointOf({ target: typed => typed.candidates[typed.candidates.length - 1] ?? typed.chosenId });
    const found = violationsOf(point);
    const executed = receiptsOf(point, "F1");
    expect(Object.values(found).flat(), "R-CHOSEN-TARGET: no check binds the executed candidate to the choice").toEqual([]);
    expect(executed, "the point executed another candidate than the reply's choice").not.toEqual(receiptsOf(HONEST, "F1"));
    return { violations: found, executed, chosen: String(own(own(REPLY, "sample"), REPLY_CHOICE)) };
  },
  Q4: () => {
    const head = textOf(ADAPTER);
    const findings = Object.fromEntries(Object.entries(OUTSIDE_PATH).map(([name, plant]) => {
      const planted = plant(head);
      return [name, { plantedHere: planted !== head, changed: changedMembers(head, planted) }];
    }));
    for (const [name, entry] of Object.entries(findings)) {
      expect(entry, `R-ADAPTER-OUTSIDE-PATH: the ${name} plant changes the adapter and no path member`).toEqual({ plantedHere: true, changed: [] });
    }
    return findings;
  },
};

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's row for a bead. */
function beadRow(bead: string): { readonly title: string; readonly notes: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!record(row) || row.id !== bead) continue;
    const { title, notes } = row;
    if (typeof title === "string") return { title, notes: typeof notes === "string" ? notes : "" };
  }
  return undefined;
}
/** What the anchors read from the notes: the owner filing's first "Citation: " line only, so a later note binds nothing. */
function filingReading(notes: string): { readonly clauses: readonly string[]; readonly pin?: string; readonly coreLine?: number; readonly adapterLine?: number } {
  const citation = notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
  const acceptance = /(?:^|\. )Acceptance: (.*?)\. Consolidation: /.exec(citation)?.[1] ?? "";
  return {
    clauses: acceptance === "" ? [] : acceptance.split("; "),
    pin: /core-minted decisions only @([0-9a-f]{12})\b/.exec(citation)?.[1],
    coreLine: Number(/\(isCoreMintedDecision, control\.ts:(\d+)\)/.exec(citation)?.[1] ?? Number.NaN),
    adapterLine: Number(/src\/workbench\/hosts\/furnace-hosted\.ts:(\d+) '/.exec(citation)?.[1] ?? Number.NaN),
  };
}
interface LeadReading {
  readonly check?: string;
  readonly points: readonly string[];
}
/** What the anchors read from a follow-up's notes: its first line opening "[leads] - F1 " only, so a later note binds nothing. */
function leadReading(notes: string): LeadReading {
  const lead = notes.split("\n").find(line => line.startsWith("[leads] - F1 ")) ?? "";
  const cure = /arm a request-binding check \(([a-z-]+)\) with (P-[A-Z-]+) and (P-[A-Z-]+) as its mutants/.exec(lead);
  return { check: cure?.[1], points: cure === null ? [] : [cure[2] ?? "", cure[3] ?? ""] };
}
/**
 * The anchor conditions a lead reading fails, in order: "check" (its check is none of CHECKS), "two points" (it names no two
 * distinct points) and "twin <i>" (point i's M- twin, its P- read as M-, is no mutant failing that check on F3).
 */
function leadFindings(lead: LeadReading): string[] {
  const findings: string[] = [];
  if (!CHECKS.some(check => check === lead.check)) findings.push("check");
  if (lead.points.length !== 2 || new Set(lead.points).size !== 2) findings.push("two points");
  for (const [index, point] of lead.points.entries()) {
    const twin = point.replace(/^P-/, "M-");
    if (!(Object.hasOwn(MUTANTS, twin) && (mutant(twin).F3 ?? []).some(check => check === lead.check))) findings.push(`twin ${index}`);
  }
  return findings;
}
const jsonReading = (lead: LeadReading): Json => ({ check: lead.check ?? null, points: [...lead.points] });
/** Planted follow-up notes (in memory), each with the reading the lead reader must give it: one per reading clause. */
const LEAD_PLANTS: Readonly<Record<string, { readonly notes: string; readonly reading: Json }>> = {
  "the lead line": {
    notes: "context\n[leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\nlater",
    reading: { check: "c-one", points: ["P-ONE", "P-TWO"] },
  },
  "a lead line further in": {
    notes: "context\n [leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.",
    reading: { check: null, points: [] },
  },
  "a cure phrase off the lead line": {
    notes: "context: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\n[leads] - F1 no cure here.\nlater: arm a request-binding check (c-two) with P-THREE and P-FOUR as its mutants.",
    reading: { check: null, points: [] },
  },
  "another finding's lead line first": {
    notes: "[leads] - F13 cure: arm a request-binding check (c-thirteen) with P-ONE and P-TWO as its mutants.\n[leads] - F1 cure: arm a request-binding check (c-one) with P-THREE and P-FOUR as its mutants.",
    reading: { check: "c-one", points: ["P-THREE", "P-FOUR"] },
  },
  "a later lead line": {
    notes: "[leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\n[leads] - F1 later: arm a request-binding check (c-two) with P-THREE and P-FOUR as its mutants.",
    reading: { check: "c-one", points: ["P-ONE", "P-TWO"] },
  },
  "a cure phrase without its closing words": {
    notes: "[leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO, or name a residual.",
    reading: { check: null, points: [] },
  },
};
/** The outside-anchors case pushes here as its last statement, so the roster case sees that it ran to its end. */
const ANCHORED: string[] = [];
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(label.slice(at));
}
const lineAt = (sha: string, path: string, line: number): string => git(["show", `${sha}:${path}`]).split("\n")[line - 1] ?? "";

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the vocabulary, the checks, the mutants, the fixtures, the bound points and the path are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:1", "A:4", "B:3", "C:2", "Q:4"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:3", "Q2:1", "Q3:1", "Q4:3"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(VOCABULARY).toEqual(["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "graph_digest", "chosen_id"]);
    expect(CHECKS).toEqual(["effect-unvalidated", "effect-unpermitted", "effect-unminted", "effect-unrequested", "mismatch-receipt", "current-unexecuted"]);
    expect(ECHOED).toEqual(["scope", "principal", "target", "action", "invocationId", "requestedAt"]);
    expect(POSITIONS).toEqual(["first", "second", "third", "last"]);
    expect(CALLS).toEqual(["first call", "second call"]);
    expect(Object.entries(CONTEXT_MISREADERS).map(([label, { misread, flagged }]) => `${label}:${misread}:${flagged.join(",")}`)).toEqual([
      "X01's form:11536:512,513,514,515",
      "X02's form:7936:512,513,514,515",
      "X03's form:4096:32768,32772,32776,32780",
      "X04's form:27120:33,35,37,39",
      "X05's form:4397:5,17,20,21",
      "an own request unread:7168:768,769,770,771",
      "the shared ids reversed:5168:5,17,20,21",
      "the first shared id misspelled:27120:1,4,5,6",
      "the second shared id misspelled:5168:5,17,20,21",
      "the third shared id misspelled:464:21,69,81,84",
      "the fourth shared id misspelled:16:85,340,1105,1360",
      "the last shared id dropped:27120:1,4,5,6",
      "an extra carried row:65536:0,1,2,3",
      "the first call's row one value longer:65536:0,1,2,3",
      "the second call's row one value longer:65536:0,1,2,3",
      "the name twice:65536:0,1,2,3",
      "the name misspelled:65536:0,1,2,3",
    ]);
    expect(Object.keys(STRING_FORMS)).toEqual(["gaining a final ~", "gaining a leading ~", "in another case", "without its last character", "without its first character"]);
    expect(Object.keys(MIXES)).toEqual(["the other request's invocationId", "the other request's target", "the principal's role dropped"]);
    expect(ORDERS).toEqual({ snapshot: [0, 1, 2, 3], reversed: [3, 2, 1, 0], interleaved: [1, 3, 0, 2] });
    expect(ORDER_PAIRS.map(({ label, orders: [first, second] }) => `${label}:${first.join("")}:${second.join("")}`)).toEqual([
      "snapshot then snapshot:0123:0123",
      "snapshot then reversed:0123:3210",
      "snapshot then interleaved:0123:1302",
      "reversed then snapshot:3210:0123",
      "reversed then reversed:3210:3210",
      "reversed then interleaved:3210:1302",
      "interleaved then snapshot:1302:0123",
      "interleaved then reversed:1302:3210",
      "interleaved then interleaved:1302:1302",
    ]);
    expect(RECORD_FORMS.map(({ label, order }) => `${label}:${order.join("")}`)).toEqual([
      "snapshot, first 1:0",
      "snapshot, first 2:01",
      "snapshot, first 3:012",
      "snapshot, first 4:0123",
      "reversed, all 4:3210",
      "interleaved, all 4:1302",
    ]);
    expect(HANDED).toEqual([1, 2, 3]);
    expect(SERIAL_KINDS).toEqual(["own", "other", "both", "neither"]);
    expect(PLANTED_SERIALS).toEqual([7, 8]);
    expect(THREE_DIGIT_SERIALS).toEqual([187, 188]);
    expect(DRIVE_NAMES).toEqual(["F1", "F2", "F3", "F4", "F5"]);
    expect([...DRIVE_NAMES], "one drive name per fixture, in FIXTURES order: the names the drives' invocationIds carry").toEqual(FIXTURES.map(entry => entry.id));
    expect(Object.keys(serialPlants(executable(SNAPSHOT_BYTES)))).toEqual([
      "the kinds from own",
      "the kinds from other",
      "the kinds from both",
      "the kinds from neither",
      "D01's page",
      "D02's page",
      "D03's page",
      "D04's page",
      "D05's page",
      "D06's page",
      "four ids both calls were returned",
      "an id one call was returned twice",
      "a name at each position",
    ]);
    expect(Object.entries(SEGMENT_PLANTS).map(([label, invocationId]) => `${label}:${invocationId}`)).toEqual([
      "its own segment:inv-F1-87-exec-a1-t1",
      "a longer number:inv-F1-870-exec-a1-t1",
      "a shorter number:inv-F1-8-exec-a1-t1",
      "inside another segment:inv-F1-x87-exec-a1-t1",
      "the first segment:87-inv-F1-exec-a1-t1",
      "the last segment:inv-F1-exec-a1-t1-87",
      "beside another serial:inv-F1-86-87-exec-a1-t1",
      "with a leading zero:inv-F1-087-exec-a1-t1",
      "the last of seven segments:inv-F1-86-exec-a1-t1-87",
      "the first of seven segments:87-F1-86-x-exec-a1-t1",
      "the fifth of eight segments:inv-F1-86-x-87-exec-a1-t1",
      "a segment's leading part:inv-F1-87x-exec-a1-t1",
    ]);
    expect(Object.entries(THREE_DIGIT_SEGMENT_PLANTS).map(([label, invocationId]) => `${label}:${invocationId}`)).toEqual([
      "its own segment:inv-F1-187-exec-a1-t1",
      "a longer number:inv-F1-1870-exec-a1-t1",
      "a shorter number:inv-F1-18-exec-a1-t1",
      "inside another segment:inv-F1-x187-exec-a1-t1",
      "the first segment:187-inv-F1-exec-a1-t1",
      "the last segment:inv-F1-exec-a1-t1-187",
      "beside another serial:inv-F1-186-187-exec-a1-t1",
      "with a leading zero:inv-F1-0187-exec-a1-t1",
      "the last of seven segments:inv-F1-186-exec-a1-t1-187",
      "the first of seven segments:187-F1-186-x-exec-a1-t1",
      "the fifth of eight segments:inv-F1-186-x-187-exec-a1-t1",
      "a segment's leading part:inv-F1-187x-exec-a1-t1",
    ]);
    expect(Object.entries(DERIVED_STRANGERS).map(([label, { member }]) => `${label}:${member}`)).toEqual(["the principal's role dropped:principal", "requested later:requestedAt"]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-NO-BASIS",
      "M-DIGEST-ONLY",
      "M-REVISION-ONLY",
      "M-UNCONVERTED",
      "M-DENIED",
      "M-FORGED-GRANT",
      "M-REPLAYED-PERMIT",
      "M-NO-REQUEST-REPLAY",
      "M-LOOKALIKE",
      "M-COPY",
      "M-MISMATCH-SILENT",
      "M-MISMATCH-DENIED",
      "M-RECEIPT-AND-EFFECT",
      "M-INERT",
    ]);
    expect(Object.keys(LEAD_PLANTS)).toEqual([
      "the lead line",
      "a lead line further in",
      "a cure phrase off the lead line",
      "another finding's lead line first",
      "a later lead line",
      "a cure phrase without its closing words",
    ]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.basis}:${entry.grants.length}:${entry.current}`)).toEqual([
      "F1:valid:2:true",
      "F2:snapshot-mismatch:2:false",
      "F3:valid:1:false",
      "F4:revision-mismatch:2:false",
      "F5:reply-unconverted:2:false",
    ]);
    expect(GP_DECISION_POINTS).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
    expect(PI_PIN).toBe("758ec18187a5d66ba40b766caad38754b5313558");
    expect(pathKeys(pathOf(textOf(ADAPTER)))).toEqual([
      "method:execute",
      "method:record",
      "function:hasCancellation",
      "function:safeText",
      "method:interpret",
      "method:toResult",
      "const:isRecord",
    ]);
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the names and the pin; the citations resolve at the pin; the vendored reply and snapshot bind the vocabulary and the fixtures; the follow-up's lead line binds the request-binding check and the gate's two points", { timeout: 60_000 }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const prefix = `[${REQUIREMENT}] `;
    expect(title.startsWith(prefix), "the title opens with the requirement id").toBe(true);
    const trigger = ROWS.find(entry => entry.id === "T")?.label ?? "-";
    expect(title.slice(prefix.length).startsWith(`${trigger} (artifact: `), "row T's label is the title's trigger, before its artifact parenthetical").toBe(true);
    const titleNames = title.match(/(?<![A-Za-z])Graph[A-Z][A-Za-z]*/g) ?? [];
    expect(titleNames, "the title names exactly the vocabulary's two names").toEqual([...NAMES]);
    const filing = filingReading(row?.notes ?? "");
    expect(filing.clauses, "the Acceptance sentence holds three clauses, each exactly one row's label").toEqual(["A", "B", "C"].map(id => ROWS.find(entry => entry.id === id)?.label));
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    const appended = `${row?.notes ?? ""}\nCitation: a later note. Acceptance: x; y. Consolidation: none. core-minted decisions only @000000000000.`;
    expect(filingReading(appended), "a note appended after the filing changes no reading").toEqual(filing);
    expect(PI_PIN.startsWith(filing.pin ?? "-"), "the Pi pin is the filing's").toBe(true);
    expect(lineAt(PI_PIN, CORE, filing.coreLine ?? 0), "clause A's control.ts citation resolves at the pin").toContain("export function isCoreMintedDecision(");
    expect(lineAt(PI_PIN, ADAPTER, filing.adapterLine ?? 0), "the filing's furnace-hosted.ts citation resolves at the pin").toContain("This module adds no scheduler, no retry and no checkpoint");
    expect(textOf(CORE), "the control core still exports the clause's two names").toContain("export function decideControl(");
    expect(own(REPLY, "schema"), "the vendored reply's schema").toBe(REPLY_SCHEMA);
    expect(own(REPLY, "kind"), "the vendored reply's kind").toBe(REPLY_KIND);
    expect(Object.hasOwn(record(REPLY) ? REPLY : {}, REPLY_DIGEST), "the vendored reply carries the digest member").toBe(true);
    const sample = own(REPLY, "sample");
    expect(Object.hasOwn(record(sample) ? sample : {}, REPLY_CHOICE), "its sample carries the choice member").toBe(true);
    const inputs = own(own(VENDORED, "generator"), "inputs");
    const listed: readonly unknown[] = Array.isArray(inputs) ? inputs : [];
    const recorded = listed.find(entry => own(entry, "path") === SNAPSHOT_INPUT);
    expect(`sha256:${String(own(recorded, "sha256"))}`, "the reply's digest is the generator's recorded input digest").toBe(own(REPLY, REPLY_DIGEST));
    expect(digestOf(SNAPSHOT_BYTES), "and the snapshot fixture's own").toBe(own(REPLY, REPLY_DIGEST));
    expect(revisionOf(SNAPSHOT_BYTES), "the snapshot's revision is F1's observed basis").toBe(fixture("F1").observed);
    expect(executable(SNAPSHOT_BYTES).length, "the snapshot holds one can_execute relation per position").toBe(POSITIONS.length);
    expect(Object.values(ORDERS).map(order => [...order].sort((left, right) => left - right)), "each order the record control asks holds each of the snapshot's can_execute positions once").toEqual(
      Object.values(ORDERS).map(() => executable(SNAPSHOT_BYTES).map((_, index) => index)),
    );
    const candidates = own(REPLY, "candidates");
    expect(strings(candidates) && candidates.every(candidate => executable(SNAPSHOT_BYTES).includes(candidate)), "every candidate is a can_execute relation of the snapshot").toBe(true);
    expect(strings(candidates) && !candidates.includes(UNCHOSEN) && executable(SNAPSHOT_BYTES).includes(UNCHOSEN), "F5's choice is observed but no candidate").toBe(true);
    const digestMembers = record(REPLY) ? Object.keys(REPLY).filter(key => own(REPLY, key) === digestOf(SNAPSHOT_BYTES)) : [];
    const choiceMembers = record(sample) && strings(candidates) ? Object.keys(sample).filter(key => candidates.includes(String(own(sample, key)))) : [];
    const derived = [...titleNames, String(own(REPLY, "schema")), String(own(REPLY, "kind")), ...digestMembers, ...choiceMembers];
    expect(derived, "the vocabulary is the title's names, the reply's own schema and kind, the member holding the snapshot digest and the sample member holding a candidate").toEqual([...VOCABULARY]);
    const lead = leadReading(beadRow(FOLLOW_UP)?.notes ?? "");
    expect(leadFindings(lead), `${FOLLOW_UP}'s lead line names one of the checks and two distinct points whose M- twins are mutants failing it on F3`).toEqual([]);
    const [point0 = "", point1 = ""] = lead.points;
    const anchorReadings = {
      "a check outside the checks": leadFindings({ check: "effect-elsewhere", points: lead.points }),
      "another check": leadFindings({ check: CHECKS.find(check => check !== lead.check), points: lead.points }),
      "one point twice": leadFindings({ check: lead.check, points: [point0, point0] }),
      "three points": leadFindings({ check: lead.check, points: [point0, point1, point1] }),
      "a point with no twin": leadFindings({ check: lead.check, points: [point0, "P-NO-SUCH-POINT"] }),
      "a twin failing that check among others": leadFindings({ check: lead.check, points: ["P-DENIED", point0] }),
      "no cure phrase": leadFindings({ points: [] }),
    };
    expect(anchorReadings, "each planted reading fails exactly the anchor conditions it breaks").toEqual({
      "a check outside the checks": ["check", "twin 0", "twin 1"],
      "another check": ["twin 0", "twin 1"],
      "one point twice": ["two points"],
      "three points": ["two points"],
      "a point with no twin": ["twin 1"],
      "a twin failing that check among others": [],
      "no cure phrase": ["check", "two points"],
    });
    const planted = Object.fromEntries(Object.entries(LEAD_PLANTS).map(([label, plant]) => [label, jsonReading(leadReading(plant.notes))]));
    expect(planted, "the lead reader gives each planted note its reading").toEqual(Object.fromEntries(Object.entries(LEAD_PLANTS).map(([label, plant]) => [label, plant.reading])));
    const appendedLead = `${beadRow(FOLLOW_UP)?.notes ?? ""}\n[leads] - F1 later: arm a request-binding check (x) with P-X and P-Y as its mutants.`;
    expect(leadReading(appendedLead), "a note appended after the lead line changes no reading").toEqual(lead);
    ANCHORED.push("outside anchors");
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/gp-decision-executor-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
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
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
    expect(ANCHORED, "the outside-anchors case ran to its end").toEqual(["outside anchors"]);
  });
});
