/**
 * wb-tz4r.3 (RI-UNIFIED-DECISION-INFERENCE-R3, program-triage-2026-10-22), the absent-today leg with the adoption contract armed.
 * Statement (the owner filing's title): "If Pi ever echoes a native decision result (gated: RI native decision envelope carrying
 * endpoint/model revision, sampling policy and native evidence, RI-DEC-06/08; unshipped at 485f3615db1e), Pi shall carry the
 * producer's endpoint/model revision, sampling policy and native evidence verbatim where present and shall synthesize none of them
 * when absent (absent stays absent)", pinned to the program's 01-contracts.md:14 ("Preserve endpoint/model revision, sampling
 * policy and complete native evidence where available."). The acceptance is the filing's, verbatim: the labels of rows B-D; the
 * trigger sentence ("Pi carries no decision envelope today (census 0)") is row A's.
 *
 * SIBLING DISCIPLINE. <NDB> and <GDF> stand for the two backend classes :14 names and <ENGINE> for the ReactiveInference module that
 * holds the typed decision contracts (src/reactive_inference/<ENGINE>/ at the pin). This file and its roster spell none of them, nor
 * RI's generative response type, joined in any case convention, and no state-word identifier, so the sibling censuses that walk
 * src/test/qa for those spellings (wb-tz4r.1 (a), wb-tz4r.2 D2, wb-tz4r.8 (c)) hold over both files.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only git show and git grep on the local ReactiveInferenceSDK checkout, no fetch):
 * at the pin 485f3615db1e and at origin/master 075ac589d64d (10 commits past the pin, its <ENGINE> files changed by refactors only)
 * no result envelope exists: the only backend identity is the preflight's deployment_id (ChoiceBackendCapabilities :17 and
 * ChoiceExecutionPlan :55 of preflight.py), and model_revision, sampling_policy and native_evidence occur in no src row at either
 * commit (git grep rc 1). RI-derived data reaches Pi only inside rf envelopes (the sdk_versions.reactive_inference version echo and
 * the budget's capability snapshot), carried by the reading and read by neither projection, so the trigger has not fired.
 * MEASURED AT THE INSTALLED rf (0.1.836 by `rf --json --version` result.version): one noncommitted preview in a scratch jsonl
 * workspace (one declarative component, one task source), rendered with the argv Pi's native reader spawns; the roster lists the
 * commands. THE CARRIER (the roster's envelope) keeps rf's printed JSON value, the scratch root rewritten to /fixture/rf-workspace. It
 * carries the producer identities a careless adopter could borrow for an absent field: budget.requested_model_id (the --model echo),
 * budget.resolved_model_id (null), budget.capability_snapshot.model_id and the RI version echo.
 * THE NATIVE RESULT is CONSTRUCTED (no build emits one at either commit): a producer tag, a schema version, a question id and the
 * four fields of :14 under names read off its words - endpoint, model_revision, sampling_policy (structured) and native_evidence
 * (structured, complete) - set at the three PLACEMENTS the queued wb-tz4r.1 cut constructs (an additive result key, a key on the
 * rendering component's row and one on the document block's row). Every field value is distinct and occurs nowhere in the carrier.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts: the native reader validates the
 * preview shape and stays open to additive keys; the injected seam validates nothing). Its two projections are the observer's
 * topology (reactivefiber-observer.ts: a fixed set of evidence refs and notes) and the native-evidence metadata (native-evidence.ts).
 * Neither reads a native result today, so the adoption contract is armed on a test-side REFERENCE ADOPTION (one evidence ref per
 * present field on the topology, one member per present field on the metadata, each verbatim) and THE JUDGE, which reads a
 * candidate projection by values and paths: every present field is carried verbatim by exactly one entry of its own (a member
 * whose value is the field, or a ref `<kind>:<field>`), no entry carries two fields, and once those entries are removed the rest is
 * byte-identical to today's projection of the carrier - so a default for an absent field reads changed whatever literal it holds.
 *  A, the trigger. A1 no package.json dependency and no src file (bytes, comments included) spells the RI module root in any
 *    spelling, and no src file spells a field of the native result as a reader writes it - model revision or sampling policy as
 *    one identifier (joined or with one underscore, dot or dash) or native_evidence (wb-3xmr F3: the wb-tz4r.3 gate's G13, a src
 *    module reading resources[0].model_revision behind a default and spelling no root, stayed green) - with a floor, an anchor
 *    and controls; A2 the rf roster stays the preview alone (native and injected registrations,
 *    RECONCILE_EVIDENCE_READS.reactivefiber), the only path an RI result could arrive by; A3 the gating envelope is measured
 *    unshipped: the roster's producer facts, the bead row's "Shipped: no" sentence and its gating artifacts.
 *  B, acceptance (a). B1 the adoption fixture; B2 both seams carry each placed variant byte for byte (one spawn of the --no-commit
 *    argv, one injected call); B3 the reference adoption over the fixture carries the four fields verbatim, one entry each, on both
 *    surfaces, and the judge finds nothing; B4 today's projections of each variant are byte-identical to today's projection of the
 *    carrier and read exactly the four missing findings - 0 entries until the gate opens, the gate-opening cue; B5 the landed
 *    producer-identity carrier this mirrors (wb-2j3.1): the measured cli_version travels verbatim as the rf-cli ref, one note and
 *    producerRelease.
 *  C, acceptance (b). C1 each absent-field fixture (each field absent alone, all four absent) rides both seams byte for byte, no
 *    key added, and today's projections are byte-identical to the carrier's; C2 the reference adoption over each carries the
 *    present fields only, the all-absent one byte-identical, judge quiet; C3 no carrier default substitutes: the carrier's model
 *    identities, Pi's own invocation model and the RI version echo reach neither surface for the carrier or any variant; C4 the
 *    wb-2j3.2 pattern: the carrier without cli_version projects with exactly the rf-cli ref, its note and producerRelease gone.
 *  D, acceptance (c). D1 the judge refuses the absent model revision defaulted to each probe literal and to every distinct
 *    primitive the carrier states, at the adoption's slot on both surfaces; D2 the absent sampling policy likewise, with every
 *    object the carrier states; D3 a default anywhere else and every verbatim rewrite or merge are refused; D4 the quiet controls
 *    and the residuals' quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (each pin with its quote),
 * every pin's witness, the constants, the harness, the record, the hooks, the carrier, the native result, the placements, the
 * probes, the registered test titles and each pin's assertion count are held to the out-of-file roster (test/fixtures/ri-decision-provenance-echo-roster.json),
 * which readRoster reads before any other statement of this file's module body runs (THE ORDER), freezes through every member (THE
 * FREEZE) and, before it returns it, reads back against the text it read (THE DECLARATION, wb-5333 cut #7), so no in-place write this
 * file makes after the read changes what they are held to, and a write that a function of this file readRoster or deepFrozen calls
 * (isObject, json, strings, objectOf or envelopeOf; THE DECLARATION's own readers are the reader, NOT CLAIMED below) makes during the
 * read, changing what they are held to or leaving one of them unfrozen, fails the file at collection; ROWS and the object and list
 * constants held to it are frozen where they are declared too (THE FREEZE, wb-5333), and each of them, like the strings, the titles and
 * the patterns, is one top-level const whose initializer THE FORM reads clean (wb-26dh's bindingsRead, read here since wb-5333 cut #5),
 * the deepFrozen it calls being this file's own one top-level function declaration, named nowhere else but as a call's callee (THE
 * FREEZER, wb-5333 cut #6), that no statement of this file re-assigns and that the judged set re-binds by no declaration the SELF-READ
 * reads (THE BINDINGS and the binding rule, wb-5333 cut #3), and whose run-time value, at collection and at the judged set's two
 * readings, is the value its own declaration spells in this file's source, whatever path wrote it (THE DECLARATION, wb-5333 cut #7).
 * OUTSIDE ANCHOR: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row
 * wb-tz4r.3): each acceptance clause is exactly one row label, the trigger sits in row A's, and the quote pin, the quote and the gating
 * artifacts are in its notes.
 * PIN ANCHOR (wb-3xmr F1): each row's pin quotes, in pin order, tile its owner text with separator-only gaps (the wb-if7q.2 and
 * wb-z3ft.2 form) - row A's the title's condition (after its tag, up to the parenthesis that closes before ", Pi shall"), rows
 * B-D's their clauses - so a pin removed from ROWS, the frozen literal, IMPL and the roster together leaves its part of the
 * owner's words untiled and the judged set reds (the wb-tz4r.3 gate's G1, D3 removed so, stayed 17/17 on the first cut); the
 * judged set also drops each quote in turn and finds its row untiled.
 * SELF-READ (wb-3xmr F2, wb-hiwv F1): the judged set parses this file's source (the TypeScript AST). Outside the describe block:
 * every IMPL case names one of READERS; IMPL, rosterWitness, MEASURED and REACHED are named only where declared, ROSTER_PATH only
 * in readRoster and readRoster only for ROSTER; a roster pin's witness member is read only in readRoster and rosterWitness; and
 * ROSTER is read only through its subject members (its rows only in rosterWitness). So a case that hands back its own roster
 * witness through any of those names reds, whether directly (the wb-tz4r.3 gate's G3 and G3b, which kept their pinned assertion
 * counts and stayed 18/18), through a helper or after measuring, and so does a case replaced at run time (Object.assign(IMPL,
 * ...)); five planted sources pin each refusal. Inside the describe block (wb-hiwv F1: the wb-3xmr gate's
 * L2-HARNESS-D3-substituted, a harness that handed D3 its roster witness in place of its measurement and kept D3's pinned count,
 * stayed 18/18): every pin case (each it(...) registration besides the judged set and the record; any other registration call is
 * read as scaffolding) is the HARNESS statement for statement, held to the roster - its witness is its own case's measurement,
 * recorded in MEASURED and compared once against rosterWitness(pin) - and outside the pin cases rosterWitness, ROSTER_PATH and
 * readRoster are never named, IMPL is named only by the judged set, MEASURED and REACHED only by the record, ROSTER is read only
 * by those two, and a witness member only by the record. So a harness that hands a pin its roster witness or a literal, or drops
 * its comparison, reds, as do a rosterWitness alias bound in the describe callback (the wb-3xmr gate's L2-SELF-DESCRIBE-BOUND,
 * 18/18 there), the roster witness read there or the roster read afresh, a measurement recorded through an aliased registration,
 * a case replaced from the block or through a pin case's parameter default or options, and the judged set or the record naming
 * what belongs to the other; eleven planted describe blocks pin each refusal, and a twelfth, the harness laid over two lines,
 * reads clean. A case that reaches its witness without naming any of those is R-UNMEASURED.
 * THE RUNNER (wb-yi2o F1: the wb-hiwv gate's L2-REBOUND-IT-SKIP-D3 - a top-level alias of it, it re-bound in the row describe
 * callback so D3's case never ran, and the record copying the roster's witness into MEASURED and its reached list into REACHED -
 * stayed 18/18, as did the re-bound it swallowing D3's red and an afterEach in the describe callback flipping D3's failed result to
 * pass, each beside a broken D3): the record is RECORD statement for statement, its { task } context included, held to the roster,
 * so it only reads MEASURED and REACHED and drops none of its comparisons; it is never named outside the describe block and inside
 * it only as a registration's callee, and describe and expect only as a call's callee (an alias, a re-binding, a declaration binding
 * one, or a member read such as expect.extend, expect.addEqualityTesters or expect.getState() outside the harness reds); a hook
 * (HOOK_NAMES) is named only in the HOOKS statements, held to the roster (the scratch leak guard and the PATH restore), and never in
 * the describe block; the describe block's scaffolding binds only its loops' row and pin; a pin case takes no parameters; and the
 * judged set takes no context and names IMPL only to read its keys (Object.keys(IMPL)). Measured on the landed census (396117a),
 * each beside a broken D3 and each 0 failed, and red now: one top-level afterEach flipping every failed result; the judged set's
 * context setting D3's and the record's mode to skip (16 passed, 2 skipped); an expect shadowed in the describe callback through a
 * top-level alias; the
 * record's two comparisons dropped beside a top-level hook flipping D3; D3's case replaced from the judged set (the wb-hiwv PREP's
 * P08); expect.extend; expect.addEqualityTesters. Twelve planted sources (eleven refusals, the HOOKS reading clean) and twelve planted
 * blocks (ten refusals, the judged set's keys and the record reading clean) pin these refusals beside the landed ones.
 * THE GUARD (wb-yi2o F1): a refusal reported only by a test can be rewritten by what it refuses - the top-level hook flipping every
 * failure and the equality tester answering every comparison true kept a broken D3 at 18/18 with the SELF-READ refusing them, as did
 * a flipping hook written into HOOKS alone - so the SELF-READ's verdict is also taken at collection, with plain comparisons, before
 * any hook runs or any matcher compares: this file reads clean, every planted pin reads exactly its refusals, and HARNESS, RECORD and
 * HOOKS are the roster's (guardMisses alone reads those roster members outside the describe block). A file it refuses fails at
 * collection; the judged set compares the same readings again and pins THE GUARD itself - each comparison reports a perturbed input,
 * and its throwing statement stands at the top level (read by the AST).
 * THE FREEZE (wb-b93c F1: the wb-yi2o gate's F1 - the judged set, which may name ROSTER, wrote the in-memory roster's D3 witness
 * through Object.assign, Object.defineProperty or Reflect.set, or wrote back a filtered copy of it beside a D3 measuring one mutant
 * fewer, so the pin case's comparison and the record's second comparison both read what it wrote and a broken D3 stayed 18/18; the
 * SELF-READ reads names, so it never tells a read from a write): readRoster returns the roster frozen through every member, each
 * object and list reached from it, so an in-place write to any of them (a pin's id, quote or witness, a row, the titles, the reached
 * list, the subject members, the harness, the record or the hooks), from the judged set or anywhere else in this file, throws a
 * TypeError or is refused (Reflect.set, Reflect.defineProperty and Reflect.deleteProperty answer false), and the roster stays the
 * file's. The judged set pins it: no unfrozen object or list is reachable from ROSTER through its members; Object.assign,
 * Object.defineProperty, Reflect.set, Reflect.defineProperty, Reflect.deleteProperty and Object.setPrototypeOf are each refused on
 * every member of the D3 pin and on the reached list's first entry; the roster's text is the same after them; and the reading names
 * each unfrozen object or list of a perturbed input. Measured at 499fb36 (the landed census), each beside a broken D3 or D3's own
 * assertion dropped and each 0 failed there, and red now: the four writes of that finding; a computed member key;
 * Reflect.defineProperty; a write through a top-level helper; an accessor defined over the witness; the witness deleted and a
 * prototype carrying it set; a member deleted inside the witness beside a D3 measuring one mutant fewer; and the reached list
 * rewritten to the dropped assertion's count. THE FREEZE holds the roster: every pin case's comparison target, and the target of
 * the record's and the judged set's roster comparisons. Values this file computes from the roster, such as CARRIER (a copy of its
 * envelope) and BASE (today's projections of CARRIER), are its own and are not frozen.
 * THE FREEZE holds the in-file side too (wb-5333 F1: the wb-b93c gate's F1 - row B's label cut in ROWS, or D3's quote, then restored
 * by the judged set through Object.assign before its roster comparison, stayed 18/18, since the SELF-READ reads names and THE FREEZE
 * held the roster alone): ROWS and each object or list constant the judged set compares against the roster (GATING_ARTIFACTS, FIELDS,
 * REF_KIND, MEMBER, INVOCATION, HARNESS, RECORD and HOOKS; BEAD, QUOTE_PIN and QUOTE are strings) are frozen through every member where
 * they are declared, as are the patterns the judged set and the cases read through (SEPARATOR, which the PIN ANCHOR reads every gap
 * with, RI_ROOT, FIELD_SPELLINGS and REF_PREFIX), so an in-place write to any of them after that freeze, from the judged set or anywhere else
 * in this file, throws a TypeError or is refused (RegExp.prototype.compile throws one too, but only after it has rewritten a frozen
 * pattern's body and flags - measured; THE DECLARATION reads that, and what a write made before the freeze leaves, below). The judged
 * set pins it: no unfrozen object or list is reachable from them; the six write
 * forms are each refused on every member of row B and of D3's pin in ROWS and on the first member of ROWS and of each constant, which
 * read the same after them; and a test method set on each pattern is refused. Nor does the judged set bind a name this file binds at
 * module scope: the SELF-READ refuses each declaration of the judged set that binds a value name - a variable or a parameter (its
 * binding patterns included; a catch clause's and a loop head's are variables), a named function or class (a declaration or an
 * expression), an enum, a namespace, an import alias or an import - that bears the name of a top-level import (a default, namespace or
 * named one), function, class, enum, variable, namespace, import alias or global (a name a `declare global` block declares), or of a var
 * a top-level statement declares at any depth outside a function, class or namespace (wb-5333 cut #3: in a for, for-in, for-of or
 * for-await head, a block, an if or else branch, a try, catch or finally block, a case or default clause, a labeled statement or a
 * while or do body; a var is the module's, never the block's, while a let, a const, a class or a function there is the block's own,
 * this file being a module and so strict - measured), and THE RUNNER's scaffolding rule reads the describe callback through the same
 * declarations. Thirteen planted blocks pin it beside two controls: the judged set's variable, parameter, binding-pattern, function,
 * class and enum forms, its namespace, import alias and import together, the top-level kinds together, an enum in the describe
 * callback, the describe callback's other kinds together, a var in a top-level loop head standing in for INVOCATION and another for
 * ROWS, and the other heads and bodies together; the controls read clean the judged set's own names and the names a top-level block,
 * function, arrow function, class static block or namespace, a catch clause or a loop head's const binds. Those are the declarations
 * the binding rule reads, and the judged set's re-binding of an in-file name through any of them is refused (wb-5333 U1: the wb-5333
 * gate's G01 - an enum INVOCATION frozen as the judged set's first statements, beside INVOCATION's task edited in source - stayed 18/18
 * when the SELF-READ read a variable, parameter, function or class alone, and its vf1, vr2 and vr2q - INVOCATION or ROWS declared by a
 * var in a top-level for-of head, INVOCATION's task, row B's label or D3's quote edited in source, beside the judged set's const of the
 * roster's value - stayed 18/18 on the wb-5333 cut #2, each lint- and type-clean there). In
 * a function body the typing step refuses a namespace, an import alias and an import as well (TS1235, TS1232; measured), and vitest
 * fails to load a namespace or an import there, though it runs an import alias. Measured on the landed census (2211bdf), each 0
 * failed there and red now: the gate's e11 and e12; row B's label restored through Object.defineProperty; row B's id; INVOCATION's
 * task; a gating artifact dropped and pushed back;
 * a ref kind; a member name (each restored by the judged set before its comparison); the label restored through a top-level helper;
 * CT6 beside a SEPARATOR.test reading every gap that holds no quote as a separator (17/17 there); and 'const ROWS = ROSTER.rows;' as
 * the judged set's first statement beside the label cut (refused at collection). Measured on the wb-5333 cut #1 (e62f380), each 0
 * failed there and failing at collection now: G01 and its enum alone; the same enum INVOCATION in the describe callback, beside the
 * task edit and alone (the wb-5333 seat's G01d, lint- and type-clean there); and an import alias INVOCATION in the judged set beside
 * the task edit (refused by the typing step there); an enum MEMBER beside a member name edited (3 failed there) fails at collection
 * too. Measured on the wb-5333 cut #2 (67fb6c2), each 0 failed there and failing at collection now: vf1 (in three runs), vr2 and vr2q,
 * the gate's other heads and bodies (vb1, vi1, vt1, vl1, vw1, vf3 and vr1, each refused by the lint or typing step there), and this
 * seat's n01-n15 (a for, for-in and for-await head, a block, an if and an else branch, a try, catch and finally block, a case and a
 * default clause, a labeled statement, a while and a do body, two statements deep; the for-await one lint- and type-clean there).
 * Values this file keeps for its own readers stay unfrozen (NOT CLAIMED).
 * THE BINDINGS (wb-5333 cut #3: this seat's la1 and la3-la7 - ROWS bound by a let or a top-level var, row B's label cut in source,
 * then assigned the roster's rows by the judged set, directly or through an array or object destructuring, a for-of head or a
 * top-level helper - and g01 - INVOCATION a global property set at the top level and declared in another file, its task edited, beside
 * the judged set's const of the roster's - each stayed 18/18 on the wb-5333 cut #2, lint- and type-clean there, since the SELF-READ
 * reads declarations and never told an assignment from a read): in a source shaped like this file (ROSTER declared beside readRoster),
 * the SELF-READ reads it with bindingsRead, which this file imports with IN_FILE_SIDES from
 * test/helpers/ri-decision-provenance-echo-bindings.ts (wb-26dh, the child the rule-19 inversion R-B256 parked this bead behind,
 * landed at landing 860; this re-cut, wb-5333 cut #5, reads through it in place of cut #4's own names test), and so refuses each
 * module-scope name bound by a let or a var - a top-level let or var, or a var a top-level statement declares at any depth (above) -
 * but the native descriptor cache (nativeIds), and each in-file side (IN_FILE_SIDES: BEAD, PROGRAM_TAG, TRIGGER, QUOTE_PIN, QUOTE,
 * GATING_ARTIFACTS, INVOCATION, FIELDS, REF_KIND, MEMBER, RI_ROOT, FIELD_SPELLINGS, REF_PREFIX, JUDGED_TITLE, RECORD_TITLE, ROWS,
 * SEPARATOR, HARNESS, RECORD and HOOKS) not declared by exactly one top-level const statement, not ambient, whose initializer THE FORM
 * does not read clean. THE FORM is the cure (a) refusal #3 named, an initializer read by its form, never only by the names it reads;
 * what this census claims of it is the readings that wb-26dh's bindings census
 * (test/workbench-ri-decision-provenance-echo-bindings-census.test.ts) pins probe by probe in its rows X, E and K (row K holding cure
 * (a) clause by clause, K1-K6) and the readings of this file's planted sources below. A const is not re-assigned - assigning one
 * throws a TypeError (measured: the judged set assigning the roster's rows to ROWS, beside row B's label cut and alone, reds the
 * judged set with 'Assignment to constant variable.') - so no statement of this file re-assigns an in-file side, none is bound as a
 * global, an import, an enum or a value no code is emitted for (`declare const`), and none is computed when the file runs in a form
 * these pins spell: from a source its initializer names as an identifier (another side, the bead export's reader, the roster file's
 * reader or path, a helper, an accessor's name, or a deepFrozen that is not this file's own: THE FREEZER, below); through no
 * identifier but deepFrozen and TRIGGER (TRIGGER composed outside row A's
 * label, a dynamic import read through its members, a string-keyed accessor: the wb-5333 gate's X5b, X3k, X1k, X4k and X2k forms,
 * which cut #4's names test read clean and its header named NOT CLAIMED); or through a value named inside an instantiation expression
 * or a class expression's heritage clause (the wb-5333 gate's E1, E2, E3 and E4, refusal #4's members, which cut #4's names test read
 * clean as well). A reading on an initializer form that neither wb-26dh's bindings census's probes nor this file's planted sources
 * spell is NOT CLAIMED by this census - among them a hole in an array literal, a numeric key, a negative number or another operator
 * but +, a satisfies or angle-bracket assertion, a non-null assertion, a boolean or null, and a function or class expression standing
 * alone.
 * Eight planted sources pin it beside a control: a let ROWS the judged set assigns the roster's rows to; top-level names bound by a
 * let, a var and a var in a loop head, assigned by the judged set and a top-level helper; INVOCATION a global property; the sides
 * declared otherwise (an ambient const with a literal, a const in a top-level block, an import, an enum, a using declaration, a const
 * binding pattern and a const declared twice; since wb-5333 cut #5 each value among them is one THE FORM reads clean, so the
 * declaration rule, not THE FORM, refuses each); the sides computed when the source runs through an identifier their initializer names
 * (another side, the bead export's reader, the roster file's reader and path, a helper and an accessor's name); the sides computed
 * through no identifier but deepFrozen and TRIGGER (the wb-5333 gate's X5b, X3k, X1k, X4k and X2k forms; cut #4 pinned them as reading
 * clean); the sides naming a value inside an instantiation expression (the wb-5333 gate's E1, E2 and E4 forms) and INVOCATION spread
 * from a new class expression extending an in-file class (its E3 form); and the control, every side a top-level const of literals, the
 * cache a let and deepFrozen the source's one top-level function declaration (PLANTED_FREEZER, THE FREEZER). Every in-file side of
 * these sources that a line of its own does not declare is a top-level const of a string.
 * Measured on the wb-5333 cut #2, each 0 failed there and failing at collection now: la1-la7 and g01 (la2, a let INVOCATION assigned,
 * refused by the typing step there; the halves la1h, la2h and g01h, the edit without the assignment or the shadow, 1 failed there
 * each), and this seat's d01 - INVOCATION computed from a roster file read afresh through JSON.parse and readFileSync, beside that
 * roster's task edited (its half, the roster edit alone, 1 failed there). Measured on the wb-5333 cut #4 (bce0de7f), each 0 failed
 * there and failing at collection now, each applied in place: refusal #3's X1, X1k, X2, X2k, X3k, X4k and X4 (X1, X2 and X4 beside
 * their roster edits), X5b (QUOTE_PIN's line), and refusal #4's E1, E1k, E2, E2k, E3, E3k and E4 (E1, E2 and E3 beside theirs); their
 * halves, the roster edits alone, still fail 1 each at the judged set.
 * THE FREEZER (wb-5333 cut #6, refusal #5's U1: the wb-5333 gate's DF-IMPORT family - this file's deepFrozen declaration removed and
 * deepFrozen imported from a test helper that freezes every input as this file's does and answers the ROWS literal (pins without a
 * witness) with the roster file's rows - beside row B's label cut (CT2's edit), D3 removed from ROWS (CT1's) or D3's quote cut to 'to
 * any' (the wb-b93c gate's e12), stayed 0 failed | 18 passed on the wb-5333 cut #5, lint- and type-clean there, since THE FORM reads a
 * deepFrozen call by its callee's name alone): in a source shaped like this file, the SELF-READ also reads it with freezerRead, which
 * refuses a deepFrozen not bound by exactly one top-level function declaration with a body, each naming of deepFrozen other than as a
 * call's callee (an import's binding or property name, another declaration's name, an assignment's target, or a read of it as a value -
 * an argument, a member access's object, an array element, a type query - anywhere in the source, the describe block included), and
 * each naming of eval (a direct eval re-binds this module's names through a string the SELF-READ does not parse). So the deepFrozen
 * every in-file side's initializer calls is this file's own: not imported (named, under an alias, as a default or a namespace, or
 * through an import alias), not a global (a declare global block, an ambient function, or none declared here while another module sets
 * one), not bound by a var, a let, a const, a class, an enum or a namespace, not declared twice or in a block, and not re-bound while
 * declared (assigned at the top level, through a destructuring assignment or in the judged set, or through a direct eval), nor read as
 * a value, in each form these pins spell. Seven planted sources pin it beside THE BINDINGS' control (whose sides call the one
 * declaration plantedSides writes, PLANTED_FREEZER): deepFrozen imported from a helper, its declaration removed (the b2 form); a global
 * another module sets, the source declaring none; imported otherwise or declared ambient (under an alias, as a default, as a namespace,
 * through an import alias, in a declare global block and as an ambient function); bound by another declaration (a var, a let, a const,
 * a class, an enum and a namespace); declared twice at the top level and again in a top-level block; and, the declaration kept,
 * re-bound (assigned at the top level, through a destructuring assignment and in the judged set, and through a direct eval); and, the
 * declaration kept, read as a value (passed as an argument, read through a member access, held in an array literal and named in a type
 * query). Measured on the wb-5333 cut #5 (3f70164e), each on a throwaway copy, each 0 failed | 18 passed there and lint- and type-clean
 * there (biome rc 0, tsc 0 errors), and failing at collection now, at THE GUARD: the gate's b2 (beside row B's label cut), b2-ct1
 * (beside D3 removed from ROWS), b2-e12 (beside D3's quote cut) and b2k (the import alone), and this seat's b2a (imported under an
 * alias), b2d (a default import), b2g (a global another module sets), b2s (re-assigned, its TS2630 and noFunctionAssign suppressed) and
 * b2v (re-bound through a direct eval), each beside row B's label cut; the gate's named twin b2n (another helper's name called in
 * ROWS's initializer) stays refused at THE GUARD by THE FORM. A binding re-written through the runtime's own debugging interface
 * (node:inspector) is NOT CLAIMED by this census.
 * THE DECLARATION (wb-5333 cut #7, refusal #6's U1: the wb-5333 gate's DF-CALLEE family - deepFrozen, this file's one unedited
 * top-level function declaration, calls isObject, a function of this file, on every member before it freezes it, and isObject edited
 * in this file (ii), calling an imported helper (ib) or imported in place of its declaration (io) wrote the roster file's label and
 * pins into the ROWS literal's rows before the freeze, beside row B's label cut, D3 removed from ROWS or D3's quote cut to 'to any', and
 * stayed 0 failed | 18 passed on the wb-5333 cut #6, lint- and type-clean there, since THE FREEZE refuses writes made after the freeze
 * and THE FREEZER holds deepFrozen's declaration, never what it calls): each in-file side is, at collection and at the judged set's two
 * readings (its THE DECLARATION block and its last statement), the value its own declaration spells in this file's source.
 * declarationMisses reads each side's one top-level const from SELF_TEXT's AST by THE FORM's forms, never by running it - a string or
 * substitution-free template's text, a template's substitutions read from their own declarations (THE FORM admits TRIGGER alone, in
 * row A's label), a regular expression's body and flags,
 * an array's elements and a plain-keyed object's members in order, through `as` and the one deepFrozen call - and reads the run-time
 * value against it through builtins alone (departures): a string must be that string; an object or list must be of the declared value's
 * prototype, with its own members in order and no other (symbols included), each a data member, enumerable as declared and holding the
 * declared value, and frozen through every member where the declaration calls deepFrozen; a pattern must hold the declared body and
 * flags, read through RegExp.prototype's own getters, with lastIndex its one member. The run-time sides it reads are DECLARED_SIDES, one
 * top-level const of Object.freeze over the IN_FILE_SIDES names in order, and its collection verdict is DECLARATION_MISSES, which is
 * declarationMisses(SELF_TEXT, DECLARED_SIDES), taken after THE GUARD's (so THE FORM has read every initializer clean) and thrown on
 * (its throwing statement stands at the top level, read by the AST: declarationStands); declarationMisses refuses a source that declares
 * either otherwise. Seventeen perturbed inputs pin the reading in the judged set beside this file's reading clean: a row's label, a
 * pin added, a pin's quote, a row unfrozen, a label made an accessor, a row of another prototype, a symbol member, a pattern's own test
 * method, a pattern recompiled after its freeze, a string side, an object side's member, a side declared twice, an initializer it does
 * not read, a value list one short, DECLARED_SIDES declared otherwise, DECLARATION_MISSES declared otherwise, and the clean planted
 * source. So a side whose run-time value is not its declaration's reds at collection or at the judged set's next reading, whatever wrote
 * it. Measured on the wb-5333 cut #6 (52e2d917; trunk 6d6bf9a merged, the census blob unchanged), each 0 failed there and failing now:
 * the gate's ii, ib and io beside CT2's label cut, CT1's D3 removal and e12's quote cut (seven members), each at collection ('ROWS[1].label
 * is not its declared literal', 'ROWS[3].pins has other members than its declaration', 'ROWS[3].pins[2].quote is not its declared
 * literal'), while ii, ib and io alone read 0 failed | 18 passed there and now (the rows they write equal the literal's); and this seat's
 * members, each lint- and type-clean there (biome rc 0, tsc 0 errors): isObject re-bound by an assignment before ROWS's declaration
 * (its TS2630 and noFunctionAssign suppressed, the biome-ignore above isObject's declaration), beside CT2; an unfrozen row's
 * label re-defined by isObject as an accessor answering the roster file, beside CT2 - held to rows whose pins are an id and a quote,
 * ROWS's ('ROWS[0].label is an accessor' and the three other rows'), and unheld, when it reaches the roster's own rows first and
 * readRoster's read-back fails the file ('ROSTER.rows[0].label is an accessor' and the three others); INVOCATION's task written by isObject from the roster file, beside that task edited in source; a ref kind likewise; a test
 * method isObject sets on SEPARATOR before the freeze, reading every gap that holds no quote as a separator, beside CT6 (C3 removed from
 * ROWS, IMPL, the frozen-shape literal and the roster: 0 failed | 17 passed there) and alone ('SEPARATOR has other members than its
 * declaration'); and SEPARATOR recompiled after the freeze to read the gap C3 leaves as a separator, beside CT6 (0 failed | 17 passed
 * there), at the top level after its own declaration (at collection: 'SEPARATOR is not its declared literal') and after
 * DECLARATION_MISSES (at the judged set's first reading).
 * SEPARATOR at each PIN ANCHOR reading (wb-5333 cut #7): a recompile made inside the judged set after THE DECLARATION's first reading and
 * restored before its last, beside CT6, kept 0 failed | 17 passed on this cut's bytes before this pin (census sha256/16
 * 787035c9b2a103f7; lint- and type-clean applied to the cut), so every gap and quote the PIN ANCHOR reads - tiles' gaps and the judged
 * set's quote check - goes through separatorTests, which first reads SEPARATOR's body and flags against SEPARATOR's own declaration and
 * throws when they differ (measured: that member now reds the judged set, D4 and the record). The judged set pins it: SEPARATOR as
 * declared answers a separator and a quote, and a frozen copy recompiled is refused.
 * THE DECLARATION over the roster (wb-5333 cut #7: this seat's RR members - json, the function of this file readRoster copies each
 * witness through, edited to drop one mutant from D3's witness beside a D3 measuring one mutant fewer, stayed 0 failed | 18 passed on the
 * wb-5333 cut #6, lint- and type-clean there; isObject edited to delete it from the raw roster's D3 pin was refused there only by the
 * SELF-READ's witness rule, for naming the member): readRoster reads its frozen result back against the text it read, parsed again,
 * through rosterReadBack (builtins alone) - the file's own members at every level and no other (an object's in any order, a list's in
 * order, symbols included), each a data member holding the file's value, every object and list frozen and of the file's prototype - and
 * throws on any reading, so the file fails at collection (measured, each now: both RR members, 'ROSTER.rows[3].pins[2].witness has other
 * members than the roster file's'). The judged set pins it: ten perturbed inputs (the file's value read back clean, and in another key
 * order; a member dropped, changed or added; a list reordered; a member unfrozen, an accessor, another prototype, a symbol member), and
 * readRoster's read-back stands as its last three statements (rosterReadBackStands, read by the AST).
 * So THE FREEZE, the binding rule, THE BINDINGS, THE FREEZER and THE DECLARATION refuse, for an in-file side, an in-place write after
 * its freeze, a re-binding by the judged set through any declaration the SELF-READ reads, a re-assignment, a declaration other than one
 * top-level const that is not ambient, an initializer THE FORM does not read clean, a deepFrozen that is not this file's own one
 * top-level function declaration or is named other than as a call's callee (or eval named), in each form these pins spell, and a
 * run-time value other than the one its declaration spells, whatever wrote it (THE DECLARATION, wb-5333 cut #7); a reading on any other initializer form is
 * NOT CLAIMED by this census (above), what replaces the runtime is R-RUNTIME, and an edit of the reader itself, deepFrozen's own body
 * among it, is NOT CLAIMED (below).
 * THE ORDER (wb-5333 F2: the wb-b93c gate's e10 - top-level statements placed before ROSTER's declaration read the roster file through
 * a composed path, dropped a mutant from D3's witness through a computed key, wrote the file back, let readRoster read it and restored
 * the bytes, beside a D3 measuring one mutant fewer, and stayed 18/18; a file write, which THE FREEZE does not see): ROSTER's
 * declaration is this file's first statement after its imports and reads READ_FIRST, `const ROSTER = readRoster();`, and readRoster
 * computes ROSTER_PATH and reads the file before it calls anything of this file. The SELF-READ pins the order in any source that
 * declares ROSTER, by any declaration it reads (above: an import, an import alias and a `declare global` block included): each
 * statement before that declaration that is not an import, an interface or a type alias (a function declaration included, though it
 * runs nothing) is refused, and so is a declaration other than READ_FIRST; and a source that declares readRoster but no ROSTER of its
 * own is refused the same way (wb-5333 cut #2: the wb-5333 seat's I1, G1 and G1p - ROSTER imported from a module that forges D3's
 * witness, or a global such a module sets, declared in a `declare global` block here or in another file, each beside D3's mutant line
 * deleted - stayed 18/18 on the wb-5333 cut #1, G1 there passing biome (rc 0, one unused-function warning) and tsc (0 errors), and
 * fail at collection now). Eight planted sources pin it (seven refusals - the seventh ROSTER bound by a var in a top-level loop head
 * beside readRoster, no declaration THE ORDER reads, so read as readRoster beside no ROSTER (wb-5333 cut #3) - and a control reading
 * clean). readRoster is named only for ROSTER
 * (above), so the roster is read once, and a rewrite of the file after that read reaches nothing the cases compare (measured: e10's
 * rewrite placed after the read, beside D3's dropped mutant,
 * reds D3 and the record). Measured on the landed census, each 0 failed there and failing at collection now: e10 (verbatim it reads
 * HERE, now declared after ROSTER, and fails on HERE's temporal dead zone; re-anchored without HERE it fails at THE GUARD) and the same
 * rewrite run inside ROSTER's initializer by a helper readRoster is handed to. Code that runs before the module body is R-PRE-READ.
 * RECORDS: the last case walks this file's registered tests: each roster title once, in order, in run mode, not inverted, ran;
 * every pin's witness again, no two pins sharing one (so a case moved under another pin's id, its roster witness rewritten to
 * match, reds); every pin reached its end with its pinned assertion count. It is RECORD (THE RUNNER), so it compares and never writes,
 * and the roster it compares against is frozen (THE FREEZE), as is ROWS, whose pin ids its second title comparison reads (wb-5333).
 * NOT CLAIMED: the three placements, the probe lists and the reference adoption's kinds and member names are this fixture's
 * choices (no producer placement, default or slot exists), so a placement or probe removed from the roster and from every
 * witness together is anchored by nothing outside these two files; the four fields are anchored (the quote's words, clause (a)).
 * Likewise the HARNESS, the RECORD and the HOOKS: a pin case, the record or a hook statement edited together with its constant and
 * its roster key is a deliberate change these two files make, and nothing outside them reads it (each alone, or the code with its
 * constant, reds, THE GUARD comparing each constant against the roster at collection; with the harness's three changed, the record,
 * itself RECORD, still compares every pin's witness against the roster a second time; with the hooks' three changed a hook may
 * rewrite any result - measured: a flipping hook written into all three kept a broken D3 at 18/18). Nor is this file's reader
 * claimed against an edit of itself: a SELF-READ rule removed together with the planted pins that show it, or THE GUARD's statement
 * removed, beside what they refuse, is a change of the reader (measured: afterEach dropped from HOOK_NAMES with its three pins, or
 * THE GUARD removed, each beside a flipping hook, kept a broken D3 at 18/18; without the hook each reds, and afterEach dropped while
 * its pins stay reds at THE GUARD). Likewise THE FREEZE: the freeze dropped from readRoster together with the judged set's freeze
 * pins, beside a write of the D3 witness, is a change of the reader (measured on the wb-b93c cut: it kept a broken D3 at 18/18; the
 * freeze dropped alone reds the judged set, as it does beside that write, and with either of the judged set's two roster pins dropped
 * the other reds it - the write probes, writing through, red D3 and the record as well). Since wb-5333 cut #7 readRoster's read-back
 * reads such a roster unfrozen and fails the file at collection (measured: the freeze and the judged set's four roster freeze pins
 * dropped, the judged set writing D3's witness short of one mutant through Object.assign beside a D3 measuring one mutant fewer - 0
 * failed | 18 passed on the wb-5333 cut #6, biome rc 0 with one noUnusedVariables warning, tsc 0 errors - fails at collection now), so
 * the change of the reader is that with the read-back's frozenness reading dropped as well, together with the judged set's pin of it
 * (measured on this cut: the reading dropped alone reds that pin's unfrozen input, and with that input dropped too it keeps 18/18).
 * Likewise the in-file freeze and THE ORDER (wb-5333): a constant's freeze dropped together with its entry in the judged set's in-file
 * pin, readRoster's own body edited (what it reads, parses, keeps or freezes), or the judged set's own comparisons removed or made
 * unreachable is a change of the reader (measured on the wb-5333 cut #1: INVOCATION's freeze and its entry dropped, beside INVOCATION's task cut
 * and restored, kept 18/18, and with its entry kept it reds the judged set; readRoster dropping a mutant from D3's witness, beside a
 * D3 measuring one mutant fewer, kept 18/18; row B's label cut beside 'if (ROWS.length > 0) return;' after the judged set's first
 * assertion kept 18/18). Re-measured on the wb-5333 cut #6, each 0 failed | 18 passed there, lint- and type-clean: since cut #7 the
 * first reds at the judged set's THE DECLARATION block ('INVOCATION.task is not its declared literal', the task restored by the judged
 * set) and the second at collection (readRoster's read-back reads D3's witness short of the file's), while the third still keeps
 * 18/18, as does readRoster dropping that mutant from the text it read, before it parses it (a change of what readRoster reads). So is readRoster replaced or removed (wb-5333 cut #2): imported from a module that forges D3's witness
 * beside READ_FIRST, or deleted together with ROSTER's declaration while ROSTER is a global such a module sets and another file
 * declares (measured on the wb-5333 cut #2, each beside D3's mutant line deleted: 18/18). Likewise THE BINDINGS (wb-5333 cut #3;
 * wb-26dh's helper since cut #5) and THE FREEZER (wb-5333 cut #6): the helper edited (bindingsRead, THE FORM or IN_FILE_SIDES - what
 * wb-26dh's bindings census holds of it is its own claim), this file's import of it replaced, freezerRead or FREEZER edited, or
 * deepFrozen's own body edited (what it reads, freezes or returns, a call it makes to an imported function included; THE FREEZER holds
 * its declaration, never its body), is a change of the reader, and a source without a readRoster of its own (readRoster replaced or
 * removed, above) is not this file's shape, so THE BINDINGS and THE FREEZER read nothing there; and INVOCATION is Pi's own invocation,
 * this fixture's choice like the placements and the probes, so INVOCATION and its roster key changed together is a change these two
 * files make, which nothing outside them reads (measured: the
 * judged set's roster comparison alone holds INVOCATION's task). Likewise THE DECLARATION (wb-5333 cut #7): its readers edited,
 * removed, imported or re-bound (declarationMisses, declaredLiteral, literalOf, departures, topLevelConsts, declarationStands,
 * separatorTests, rosterReadBack and rosterReadBackStands), DECLARED_SIDES or DECLARATION_MISSES changed together with what reads
 * their form, the judged set's two readings or separatorTests' call sites removed, or readRoster's read-back statements edited, is a
 * change of the reader. A rewrite of this file's own source on disk before SELF_TEXT reads it is NOT CLAIMED by this census (the
 * SELF-READ, THE GUARD and THE DECLARATION read the text SELF_TEXT holds), nor is a pattern recompiled by a pin case's IMPL function
 * after the judged set's last reading (SEPARATOR's PIN ANCHOR readings aside, which separatorTests reads at each). Nor is the tracked bead export's file held:
 * exportRow reads .beads/issues.jsonl from disk when it is called, so a rewrite of that file this file makes before a read and restores
 * after it is not refused - THE ORDER binds the roster's read alone (measured on the wb-5333 cut #2: the wb-5333 gate's G02, CT6
 * beside row C's label cut and that rewrite in the judged set, 17/17). Nor are the values this file keeps for its own readers frozen:
 * CARRIER, BASE, CONTEXTS, ABSENT, SEAMS,
 * SURFACES, GRANTS, IMPL, the native descriptor cache, the SELF-READ's tables and planted pins, THE GUARD's inputs and reading, and
 * the records MEASURED, REACHED and scratches. THE FREEZE holds exactly the roster, ROWS, the constants and the patterns named above;
 * THE DECLARATION reads exactly the IN_FILE_SIDES (at collection and at the judged set's two readings), SEPARATOR at each PIN ANCHOR
 * reading, and the roster at its read.
 * RESIDUALS (named families, each with a pinned quiet row: D4's for the first five, R-RUNTIME and R-PRE-READ, A1's for R-READ-SITE):
 * R-COINCIDENT a
 * "default" that restates the value today's projection already holds at that path is no change and reads quiet; R-KIND the
 * judge binds a field to its value, never to a ref kind or member name (those are the adopter's to choose), so two fields filed
 * under each other's kinds read quiet; R-ORDER where an adopted entry sits among the refs is not pinned; R-REBIND a pin removed
 * from every literal while a neighbour's quote is widened over its part tiles the owner text again - the anchor reads that every
 * word has a pin, not which pin proves it (D4: D3 dropped and D4's quote widened over D3's part, clause (c) reads tiled);
 * R-UNMEASURED a case that names a reader yet hands back a value it did not measure - a literal standing in for its witness, or a
 * witness reached, in the case or a helper it calls (wherever the helper is declared or bound, the describe callback included),
 * without naming its member (the roster file parsed afresh and read by
 * position, a member name composed at run time) - is beyond the SELF-READ (D4: a planted constant case naming BASE reads clean); R-READ-SITE a src reader that reaches a
 * native result only through spellings A1 does not read - the endpoint key (src spells the word for graph edges), the fields in
 * spaced prose, Pi's own native-evidence spellings, a computed key - and feeds neither projection is invisible to row A (A1: an
 * endpoint-only reader, prose naming the model revision and Pi's own nativeEvidence import read quiet); R-RUNTIME a change to the
 * test runtime made through what the SELF-READ does not read - an import (imports are not read: an aliased expect, chai and its
 * plugins, the runner's internals), a builtin, global or prototype replaced, a module the SELF-READ itself runs on (typescript, the
 * file reader) changed before it reads - so that a comparison passes whatever it compares or a result is rewritten, is beyond the
 * SELF-READ and THE GUARD, which read this file's names, never the runtime's behaviour (D4: a chai plugin answering toStrictEqual
 * with the value compared against itself and an aliased expect extending toStrictEqual read clean; measured on the cut, each kept a
 * broken D3 at 18/18);
 * R-PRE-READ (wb-5333) a rewrite of the roster file made by code that runs before this file's module body - a call vitest hoists above
 * the imports (vi.hoisted, a mock factory), an imported module's top-level code, a setup file, another test file or another process -
 * is beyond THE ORDER, which reads this file's statements in their written order (D4: a vi.hoisted callback rewriting the roster file,
 * written after ROSTER's declaration, reads clean; measured on the cut: such a callback, vi imported, dropping a mutant from D3's
 * witness beside a D3 measuring one mutant fewer, stayed 18/18, and alone reds D3 and the record).
 * THE FREEZE trusts the runtime too (wb-b93c): Object.freeze, Object.isFrozen and the write forms it probes are builtins, so their
 * replacement is R-RUNTIME (D4: Object.freeze and Object.isFrozen replaced read clean; measured on the wb-b93c cut, each beside a
 * write of the D3 witness: Object.freeze replaced reds the judged set (its walker reads the roster unfrozen), as it does with
 * Object.isFrozen replaced too (the walker's perturbed-input pin) and with the six write forms replaced as well (the walker reads the
 * written witness unfrozen), and only with that witness passed through the replaced Object.freeze did a broken D3 stay at 18/18).
 * Since THE ORDER (wb-5333), a statement of this file replacing those builtins stands after readRoster froze the roster: the wb-b93c
 * seat's n06-n08c, replayed on the wb-5333 cut where they stood (before ROSTER's declaration), fail at collection, and placed after the
 * read n06 and n08c each red 3 (the roster's D3 witness is frozen by the builtin). The in-file sides trust the same builtins
 * (R-RUNTIME): measured on the wb-5333 cut, n08c's replacements placed after the read, beside row B's label cut restored through the
 * Object.assign they saved, kept 18/18. THE DECLARATION and readRoster's read-back (wb-5333 cut #7) trust the builtins they read
 * through - Reflect.ownKeys, Reflect.getOwnPropertyDescriptor, Reflect.get, Object.getPrototypeOf, Object.isFrozen, Object.freeze,
 * Array.isArray, JSON.parse, RegExp.prototype's test, source and flags, and the Array and String methods they call - and the
 * typescript module they parse with: their replacement is
 * R-RUNTIME (this cut does not re-measure n08c, whose source the wb-b93c seat holds).
 * SCOPE: the RI facts are read at their pins and Pi vendors no RI source, so a producer change is seen only when a re-probe re-reads
 * them; when RI ships the envelope (RI-DEC-06/08) and rf surfaces it, the adopter's projection replaces the reference adoption and
 * B4 reds by its findings alone, the cue to re-cut this census to the shipped shape. No reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
/** THE BINDINGS (wb-5333 cut #5): wb-26dh's reader and its in-file sides, landed at landing 860 and held by wb-26dh's bindings census. */
import { bindingsRead, IN_FILE_SIDES } from "./helpers/ri-decision-provenance-echo-bindings.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

/** THE ORDER (wb-5333 F2): the roster, read by readRoster() alone before any other statement of this file runs (SELF-READ). */
const ROSTER = readRoster();

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
type Path = readonly (string | number)[];

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
/** This file's own source text, read for the SELF-READ. */
const SELF_TEXT = readFileSync(fileURLToPath(import.meta.url), "utf8");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-tz4r.3";
const PROGRAM_TAG = "[RI-UNIFIED-DECISION-INFERENCE-R3]";
const TRIGGER = "Pi carries no decision envelope today (census 0)";
const QUOTE_PIN = "docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:14@485f3615db1e";
const QUOTE = "Preserve endpoint/model revision, sampling policy and complete native evidence where available.";
const GATING_ARTIFACTS: readonly string[] = deepFrozen(["RI-DEC-06", "RI-DEC-08"]);
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const FIXTURE_ROOT = "/fixture/rf-workspace";
/** Pi's own preview input: a model name no producer field states, so a surface that echoed it as a revision would show it. */
const INVOCATION = deepFrozen({ model: "pi-invocation-model-9d2", task: "summarise the notes" });
/** The four fields of 01-contracts.md:14, in the sentence's order. */
const FIELDS = deepFrozen(["endpoint", "model_revision", "sampling_policy", "native_evidence"] as const);
type Field = (typeof FIELDS)[number];
/** The reference adoption's slots: one evidence-ref kind per field on the topology, one member per field on the metadata. */
const REF_KIND: Readonly<Record<Field, string>> = deepFrozen({
  endpoint: "ri-endpoint",
  model_revision: "ri-model-revision",
  sampling_policy: "ri-sampling-policy",
  native_evidence: "ri-native-evidence",
});
const MEMBER: Readonly<Record<Field, string>> = deepFrozen({
  endpoint: "riEndpoint",
  model_revision: "riModelRevision",
  sampling_policy: "riSamplingPolicy",
  native_evidence: "riNativeEvidence",
});
/** The RI module root in any spelling a consumer would write: joined, separated, or spaced. */
const RI_ROOT = deepFrozen(/reactive[\s_.-]?inference/i);
/**
 * The native result's fields as a src reader would write them (wb-3xmr F3): model revision and sampling policy as one identifier,
 * joined or with one underscore, dot or dash (prose with a space is not read), and native evidence as native_evidence only (its
 * spaced, dashed and camel forms are Pi's own: native-evidence.ts and nativeEvidence()). endpoint is not read: src spells it for
 * graph edges (R-READ-SITE).
 */
const FIELD_SPELLINGS: readonly RegExp[] = deepFrozen([/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i]);
/** A bare ref kind: what may precede a verbatim field value in an evidence ref. */
const REF_PREFIX = deepFrozen(/^[a-z][a-z0-9-]*:$/);
const SEAMS = ["rf-cli", "injected-fixture"] as const;
type Seam = (typeof SEAMS)[number];
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the bead export's acceptance clauses and the cases agree";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, and every pin reached its end with its pinned assertion count";

interface Pin {
  readonly id: string;
  /** The part of its row's owner text this pin proves: row A's the title's condition, rows B-D's their acceptance clauses. */
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

/**
 * The judged rows, frozen where declared (THE FREEZE, wb-5333); their shape is pinned below and held to the roster and to the bead
 * export. Each pin's quote is the part of its
 * row's owner text it proves; in pin order the quotes tile that text with separator-only gaps (the PIN ANCHOR). B5, the landed
 * wb-2j3.1 carrier, owns "when present" (C4 is its absent twin); D3 owns "to any literal", carrying the default to every other
 * slot and form; D4 owns "fails", since a refusal reads as one only beside the quiet twins D4 pins.
 */
const ROWS: readonly Row[] = deepFrozen([
  {
    id: "A",
    label: `(trigger, absent today) ${TRIGGER}: no package.json dependency or src file spells the ReactiveInference module root, no src file spells model revision or sampling policy as one identifier (joined or with one underscore, dot or dash) or native_evidence, the rf roster is the preview alone, and its gating envelope (RI-DEC-06/08) is measured unshipped at the pin and at the probe`,
    pins: [
      { id: "A1", quote: "If Pi ever echoes a native decision result" },
      { id: "A2", quote: "(gated: RI native decision envelope" },
      { id: "A3", quote: "carrying endpoint/model revision, sampling policy and native evidence, RI-DEC-06/08; unshipped at 485f3615db1e)" },
    ],
  },
  {
    id: "B",
    label: "(a) adoption fixture: endpoint/model revision, sampling policy and native evidence travel verbatim as distinct evidence refs/metadata when present",
    pins: [
      { id: "B1", quote: "adoption fixture: endpoint/model revision, sampling policy and native evidence" },
      { id: "B2", quote: "travel verbatim" },
      { id: "B3", quote: "as distinct" },
      { id: "B4", quote: "evidence refs/metadata" },
      { id: "B5", quote: "when present" },
    ],
  },
  {
    id: "C",
    label: "(b) absent-field fixture: projection byte-identical to today's, no carrier default substitutes (wb-2j3.2 pattern)",
    pins: [
      { id: "C1", quote: "absent-field fixture" },
      { id: "C2", quote: "projection byte-identical to today's" },
      { id: "C3", quote: "no carrier default substitutes" },
      { id: "C4", quote: "(wb-2j3.2 pattern)" },
    ],
  },
  {
    id: "D",
    label: "(c) mutant: defaulting an absent model revision (or policy) to any literal fails",
    pins: [
      { id: "D1", quote: "mutant: defaulting an absent model revision" },
      { id: "D2", quote: "(or policy)" },
      { id: "D3", quote: "to any literal" },
      { id: "D4", quote: "fails" },
    ],
  },
]);

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
interface RosterPin {
  readonly id: string;
  readonly quote: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Placement {
  readonly id: string;
  readonly path: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly quotePin: string;
  readonly quote: string;
  readonly gatingArtifacts: readonly string[];
  readonly producer: JsonObject;
  readonly rfVersion: string;
  readonly measured: readonly string[];
  readonly fields: readonly string[];
  readonly refKinds: JsonObject;
  readonly members: JsonObject;
  readonly invocation: JsonObject;
  readonly carrier: Envelope;
  readonly native: JsonObject;
  readonly placements: readonly Placement[];
  readonly revisionProbes: readonly JsonValue[];
  readonly policyProbes: readonly JsonValue[];
  readonly rows: readonly RosterRow[];
  readonly harness: readonly string[];
  readonly record: RecordPin;
  readonly hooks: readonly string[];
  readonly tests: readonly string[];
  readonly reached: readonly string[];
}
/** The record's pinned shape (wb-yi2o F1): its runner's context and its statements, whitespace-normalized. */
interface RecordPin {
  readonly context: string;
  readonly statements: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function arrayOf(value: JsonValue | undefined, field: string): JsonValue[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function sha(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value)) throw new Error(`roster ${name} must be an object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`roster ${name} needs a null transaction, a result and diagnostics`);
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null,
    result: json(result), diagnostics: diagnostics.map(json),
  };
}

/**
 * THE FREEZE (wb-b93c F1): `value` returned as given, with it and every object and list reached from it through its members frozen;
 * applied to the roster at read and, where they are declared, to ROWS, the constants and the patterns (wb-5333 F1). THE FREEZER
 * (wb-5333 cut #6) holds this declaration as this file's one deepFrozen, named elsewhere only as a call's callee; what it calls
 * (isObject) and what any path writes before it freezes are read by their result instead (THE DECLARATION, wb-5333 cut #7).
 */
function deepFrozen<T>(value: T): T {
  const members: readonly unknown[] = Array.isArray(value) ? value : isObject(value) ? Object.values(value) : [];
  for (const member of members) deepFrozen(member);
  if (typeof value === "object" && value !== null) Object.freeze(value);
  return value;
}
/**
 * Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster, and returns it frozen
 * through every member (THE FREEZE), so no in-place write anywhere in this file can change the roster the cases and the record compare
 * against.
 */
function readRoster(): Roster {
  const ROSTER_PATH = join(dirname(fileURLToPath(import.meta.url)), "fixtures", "ri-decision-provenance-echo-roster.json");
  const text = readFileSync(ROSTER_PATH, "utf8");
  const raw: unknown = JSON.parse(text);
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.placements)) throw new Error("roster must be an object with rows and placements");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || typeof pin.quote !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id, a quote and a witness`);
      }
      return { id: pin.id, quote: pin.quote, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const placements = raw.placements.map((placement: unknown, index: number): Placement => {
    if (!isObject(placement) || typeof placement.id !== "string") throw new Error(`roster placements[${index}] needs an id`);
    return { id: placement.id, path: strings(placement.path, `placements[${index}].path`) };
  });
  const { bead, quotePin, quote, rfVersion, producer, refKinds, members, invocation, native, revisionProbes, policyProbes } = raw;
  if (typeof bead !== "string" || typeof quotePin !== "string" || typeof quote !== "string" || typeof rfVersion !== "string") {
    throw new Error("roster needs bead, quotePin, quote and rfVersion strings");
  }
  if (!isObject(producer) || !isObject(refKinds) || !isObject(members) || !isObject(invocation) || !isObject(native)) {
    throw new Error("roster needs producer, refKinds, members, invocation and native objects");
  }
  if (!Array.isArray(revisionProbes) || !Array.isArray(policyProbes)) throw new Error("roster needs revisionProbes and policyProbes lists");
  const record = raw.record;
  if (!isObject(record) || typeof record.context !== "string") throw new Error("roster needs a record with a context and statements");
  const roster: Roster = deepFrozen({
    bead, quotePin, quote, rfVersion,
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    producer: objectOf(json(producer), "producer"),
    measured: strings(raw.measured, "measured"),
    fields: strings(raw.fields, "fields"),
    refKinds: objectOf(json(refKinds), "refKinds"),
    members: objectOf(json(members), "members"),
    invocation: objectOf(json(invocation), "invocation"),
    carrier: envelopeOf(raw.carrier, "carrier"),
    native: objectOf(json(native), "native"),
    placements,
    revisionProbes: revisionProbes.map(json),
    policyProbes: policyProbes.map(json),
    rows,
    harness: strings(raw.harness, "harness"),
    record: { context: record.context, statements: strings(record.statements, "record.statements") },
    hooks: strings(raw.hooks, "hooks"),
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  });
  const misses = rosterReadBack(roster, JSON.parse(text), "ROSTER");
  if (misses.length > 0) throw new Error(`THE DECLARATION (wb-5333 cut #7): readRoster's roster is not the roster file's - ${misses.join("; ")}`);
  return roster;
}

/**
 * THE DECLARATION over the roster (wb-5333 cut #7): readRoster's frozen result read back, through builtins alone (their replacement is
 * R-RUNTIME), against the text it read, parsed again - the file's own members at every level and no other (an object's in any order,
 * a list's in order; symbols included), each a data member holding the file's value, every object and list frozen and of the file's
 * prototype. readRoster throws when this reads anything, so a function of this file it or deepFrozen calls (isObject, json, strings,
 * objectOf, envelopeOf) that writes what the roster holds during the read, or leaves a member of it unfrozen, fails the file at
 * collection. Returns the readings, by path.
 */
function rosterReadBack(actual: unknown, filed: unknown, at: string): string[] {
  if (typeof filed !== "object" || filed === null) return actual === filed ? [] : [`${at} is not the roster file's`];
  if (typeof actual !== "object" || actual === null) return [`${at} is not the roster file's`];
  const found: string[] = [];
  if (Object.getPrototypeOf(actual) !== Object.getPrototypeOf(filed)) found.push(`${at} has another prototype`);
  if (!Object.isFrozen(actual)) found.push(`${at} is not frozen`);
  const keys = Reflect.ownKeys(actual);
  const named = Reflect.ownKeys(filed).filter((key): key is string => typeof key === "string");
  const listed = Array.isArray(filed);
  const order = (list: readonly string[]): string[] => (listed ? [...list] : [...list].sort());
  const mine = order(keys.filter((key): key is string => typeof key === "string"));
  const theirs = order(named);
  if (keys.length !== named.length || mine.some((key, index) => key !== theirs[index])) return [...found, `${at} has other members than the roster file's`];
  for (const key of named) {
    const own = Reflect.getOwnPropertyDescriptor(actual, key);
    const file = Reflect.getOwnPropertyDescriptor(filed, key);
    if (own === undefined || file === undefined) continue;
    const path = listed && key !== "length" ? `${at}[${key}]` : `${at}.${key}`;
    if (!("value" in own)) found.push(`${path} is an accessor`);
    else found.push(...rosterReadBack(own.value, file.value, path));
  }
  return found;
}
/** Whether readRoster ends with its read-back (wb-5333 cut #7): rosterReadBack over its result and the text it read, a throw on any reading, then the result. */
function rosterReadBackStands(text: string): boolean {
  const file = ts.createSourceFile("read-back.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const reader = file.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === "readRoster");
  const body = reader?.body?.statements ?? [];
  const tail = body.slice(-3).map(statement => statement.getText(file).replace(/\s+/g, " "));
  return (
    tail.length === 3 &&
    tail[0] === 'const misses = rosterReadBack(roster, JSON.parse(text), "ROSTER");' &&
    (tail[1] ?? "").startsWith("if (misses.length > 0) throw new Error(") &&
    tail[2] === "return roster;"
  );
}
/** The measured carrier with this run's root in place of the fixture root (its one occurrence: workspace.root). */
const CARRIER: Envelope = { ...envelopeOf(json(ROSTER.carrier), "carrier"), workspace: { id: ROSTER.carrier.workspace.id, root: ROOT } };
const NATIVE: JsonObject = ROSTER.native;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** Every path from `value` (`$`) through its members to an object or list that is not frozen: the judged set's reading of THE FREEZE (wb-b93c F1). */
function unfrozen(value: unknown, at = "$"): string[] {
  if (typeof value !== "object" || value === null) return [];
  const children: [string, unknown][] = Array.isArray(value) ? value.map((item: unknown, index) => [`${at}[${index}]`, item]) : isObject(value) ? Object.entries(value).map(([key, item]) => [`${at}.${key}`, item]) : [];
  return [...(Object.isFrozen(value) ? [] : [at]), ...children.flatMap(([path, item]) => unfrozen(item, path))];
}
/**
 * What six in-place write forms do to `member` of `target` (wb-b93c F1: the wb-yi2o gate's F1 wrote the D3 pin's witness through
 * Object.assign, Object.defineProperty and Reflect.set): TypeError or false when it is refused, `wrote` or true when it went through,
 * `threw` on any other error.
 */
function writesTo(target: object, member: string): Record<string, string> {
  const outcome = (write: () => unknown): string => {
    try {
      const result = write();
      return typeof result === "boolean" ? String(result) : "wrote";
    } catch (error) {
      return error instanceof TypeError ? "TypeError" : "threw";
    }
  };
  return {
    "Object.assign": outcome(() => Object.assign(target, { [member]: {} })),
    "Object.defineProperty": outcome(() => Object.defineProperty(target, member, { value: {} })),
    "Reflect.set": outcome(() => Reflect.set(target, member, {})),
    "Reflect.defineProperty": outcome(() => Reflect.defineProperty(target, member, { value: {} })),
    "Reflect.deleteProperty": outcome(() => Reflect.deleteProperty(target, member)),
    "Object.setPrototypeOf": outcome(() => Object.setPrototypeOf(target, null)),
  };
}

/** The wb-tz4r.3 row of the tracked bead export: its title and notes. */
function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}
/** The export's acceptance clauses, by letter: the text after each "(x) " marker of its Acceptance line, without the separator. */
function acceptanceClauses(notes: string): Record<string, string> {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`the ${BEAD} export row states no Acceptance line`);
  const body = line.slice("Acceptance: ".length);
  const marks = [...body.matchAll(/\(([a-d])\) /g)];
  const clauses: Record<string, string> = {};
  marks.forEach((mark, index) => {
    const start = (mark.index ?? 0) + mark[0].length;
    const end = index + 1 < marks.length ? (marks[index + 1]?.index ?? body.length) : body.length;
    clauses[mark[1] ?? ""] = body.slice(start, end).trim().replace(/[;.]$/, "");
  });
  return clauses;
}
/** The title's condition: after its program tag, up to the parenthesis that closes before ", Pi shall". */
function conditionOf(title: string): string {
  return /^\[[^\]]+\] (If .+?\)), Pi shall /.exec(title)?.[1] ?? "";
}
/** A row's owner text: an acceptance row's clause (its label's letter), the trigger row's the title's condition. */
function ownerTextOf(row: Row, title: string, clauses: Readonly<Record<string, string>>): string {
  const letter = /^\(([a-d])\) /.exec(row.label)?.[1];
  return letter === undefined ? conditionOf(title) : (clauses[letter] ?? "");
}
/** A gap between two quotes that names nothing: separators and at most one joining or/and (the wb-if7q.2 and wb-z3ft.2 form). */
const SEPARATOR = deepFrozen(/^[\s,;:]*(?:(?:or|and)[\s,;:]+)?$/);
/**
 * SEPARATOR at each PIN ANCHOR reading (THE DECLARATION, wb-5333 cut #7): RegExp.prototype.compile rewrites even a frozen pattern's
 * body and flags before it throws (measured), so every gap or quote the PIN ANCHOR reads goes through this one call, which first reads
 * the pattern's body and flags (SEPARATOR's, unless the judged set's probe hands it another) against SEPARATOR's own declaration in
 * SELF_TEXT (declaredLiteral) and throws when they differ, then tests each text: a recompile made before a reading reds that reading,
 * whether or not it is restored after it.
 */
function separatorTests(texts: readonly string[], pattern: RegExp = SEPARATOR): boolean[] {
  const declared = declaredLiteral(ts.createSourceFile("separator.ts", SELF_TEXT, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS), "SEPARATOR").value;
  const read = (name: string): unknown => {
    try {
      return Reflect.get(RegExp.prototype, name, pattern);
    } catch {
      return undefined;
    }
  };
  if (!(declared instanceof RegExp) || read("source") !== declared.source || read("flags") !== declared.flags) {
    throw new Error("THE DECLARATION (wb-5333 cut #7): SEPARATOR is not its declaration where the PIN ANCHOR reads it");
  }
  return texts.map(text => pattern.test(text));
}
/** Whether the quotes, in order, tile the text: each found after the previous one, every gap a separator; the gaps that are not. */
function tiles(body: string, quotes: readonly string[]): { covered: boolean; untiled: string[] } {
  let at = 0;
  const gaps: string[] = [];
  const unseparated = (): string[] => {
    const separates = separatorTests(gaps);
    return gaps.filter((_, index) => separates[index] !== true);
  };
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0) return { covered: false, untiled: [...unseparated(), `<missing ${quote}>`] };
    gaps.push(body.slice(at, found));
    at = found + quote.length;
  }
  gaps.push(body.slice(at));
  const untiled = unseparated();
  return { covered: untiled.length === 0, untiled };
}

/** A field's verbatim token: a string field is itself, a structured one its JSON text as the producer serialized it. */
function tokenOf(value: JsonValue): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}
type Present = Partial<Record<Field, JsonValue>>;
function presentOf(native: JsonObject | undefined): Present {
  const present: Present = {};
  for (const field of FIELDS) {
    const value = native?.[field];
    if (native !== undefined && Object.hasOwn(native, field) && value !== undefined) present[field] = value;
  }
  return present;
}
/** The native result with the named fields removed. */
function nativeWithout(...fields: readonly Field[]): JsonObject {
  return Object.fromEntries(Object.entries(NATIVE).filter(([key]) => !fields.some(field => field === key)));
}
/** A copy of `value` with `inserted` set at `path` (array indices written as digits). */
function placedAt(value: JsonValue, path: readonly string[], inserted: JsonValue): JsonValue {
  const copy = json(value);
  let node: JsonValue = copy;
  path.slice(0, -1).forEach((key, index) => {
    const next: JsonValue | undefined = Array.isArray(node) ? node[Number(key)] : objectOf(node, `path ${path.slice(0, index).join(".")}`)[key];
    if (next === undefined) throw new Error(`no ${key} at ${path.slice(0, index).join(".")}`);
    node = next;
  });
  const last = path[path.length - 1] ?? "";
  if (Array.isArray(node)) node[Number(last)] = json(inserted);
  else objectOf(node, `path ${path.join(".")}`)[last] = json(inserted);
  return copy;
}
/** The value at `path` (array indices written as digits), or undefined when the path does not exist. */
function valueAt(value: JsonValue, path: readonly string[]): JsonValue | undefined {
  let node: JsonValue | undefined = value;
  for (const key of path) {
    if (Array.isArray(node)) node = node[Number(key)];
    else if (isObject(node)) node = node[key];
    else return undefined;
  }
  return node;
}
/** A placement path written the way differences() names paths: `$.a.b[0].c`. */
function pathText(path: readonly string[]): string {
  return `$${path.map(key => (/^\d+$/.test(key) ? `[${key}]` : `.${key}`)).join("")}`;
}
/** The carrier with the native result (or `native`, when given) placed as a one-entry resource list at the placement. */
function variant(placement: Placement, native: JsonObject = NATIVE): Envelope {
  return envelopeOf(placedAt(json(CARRIER), placement.path, [native]), `variant ${placement.id}`);
}
function placementOf(id: string): Placement {
  const found = ROSTER.placements.find(placement => placement.id === id);
  if (found === undefined) throw new Error(`the roster holds no placement ${id}`);
  return found;
}

/** Every path where two JSON values differ: a missing or extra key, a changed leaf, a list of another length, or key order. */
function differences(left: JsonValue | undefined, right: JsonValue | undefined, at = "$"): string[] {
  if (JSON.stringify(left) === JSON.stringify(right)) return [];
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) return [at];
    const found = left.flatMap((item, index) => differences(item, right[index], `${at}[${index}]`));
    return found.length > 0 ? found : [at];
  }
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])];
    const found = keys.flatMap(key => (Object.hasOwn(left, key) && Object.hasOwn(right, key) ? differences(left[key], right[key], `${at}.${key}`) : [`${at}.${key}`]));
    return found.length > 0 ? found : [at];
  }
  return [at];
}

interface Entry {
  readonly path: Path;
  readonly text: string;
  readonly leaf: boolean;
}
/** Every member and element of a JSON value with its token text; a string leaf is marked as one. */
function entriesOf(value: JsonValue): Entry[] {
  const found: Entry[] = [];
  const visit = (node: JsonValue, at: Path): void => {
    const children: [string | number, JsonValue][] = Array.isArray(node) ? node.map((item, index) => [index, item]) : isObject(node) ? Object.entries(node) : [];
    for (const [key, item] of children) {
      found.push({ path: [...at, key], text: tokenOf(item), leaf: typeof item === "string" });
      visit(item, [...at, key]);
    }
  };
  visit(value, []);
  return found;
}
/** An entry carries a token when it is the token, or a string `<kind>:<token>` whose kind is a bare ref kind. */
function carries(entry: Entry, token: string): boolean {
  if (entry.text === token) return true;
  return entry.leaf && entry.text.length > token.length && entry.text.endsWith(token) && REF_PREFIX.test(entry.text.slice(0, entry.text.length - token.length));
}
/** A copy of `value` without the entries at `paths`. */
function without(value: JsonValue, paths: readonly Path[]): JsonValue {
  const marked = new Set(paths.map(path => JSON.stringify(path)));
  const rebuild = (node: JsonValue, at: Path): JsonValue => {
    if (Array.isArray(node)) return node.flatMap((item, index) => (marked.has(JSON.stringify([...at, index])) ? [] : [rebuild(item, [...at, index])]));
    if (isObject(node)) {
      const kept: JsonObject = {};
      for (const [key, item] of Object.entries(node)) if (!marked.has(JSON.stringify([...at, key]))) kept[key] = rebuild(item, [...at, key]);
      return kept;
    }
    return node;
  };
  return rebuild(value, []);
}

/**
 * THE JUDGE. `base` is today's projection of the carrier, `present` the fields the producer stated, `candidate` a projection of an
 * envelope carrying them. Findings: missing:<field> (no entry carries it verbatim), duplicated:<field> (more than one does),
 * merged:<a>+<b> (one string carries two fields), changed:<path> (after the carrying entries are removed, the candidate differs
 * from base there). An absent field has no token, so any default for it is a change, whatever literal it holds.
 */
function judge(base: JsonValue, present: Present, candidate: JsonValue): string[] {
  const findings: string[] = [];
  const entries = entriesOf(candidate);
  const tokens = FIELDS.flatMap(field => {
    const value = present[field];
    return value === undefined ? [] : [{ field, token: tokenOf(value) }];
  });
  const carrying: Path[] = [];
  for (const { field, token } of tokens) {
    const found = entries.filter(entry => carries(entry, token));
    if (found.length === 0) findings.push(`missing:${field}`);
    if (found.length > 1) findings.push(`duplicated:${field}`);
    carrying.push(...found.map(entry => entry.path));
  }
  for (const entry of entries) {
    if (!entry.leaf) continue;
    const inside = tokens.filter(({ token }) => entry.text.includes(token)).map(({ field }) => field);
    if (inside.length > 1) findings.push(`merged:${inside.join("+")}`);
  }
  findings.push(...differences(base, without(candidate, carrying)).map(path => `changed:${path}`));
  return [...new Set(findings)];
}

/** The reference adoption on the topology: one `<kind>:<token>` evidence ref per present field, in field order. */
function adoptTopology(base: JsonValue, present: Present): JsonValue {
  const copy = json(base);
  const refs = arrayOf(objectOf(arrayOf(objectOf(copy, "topology").snapshots, "snapshots")[0], "snapshot").evidenceRefs, "evidenceRefs");
  for (const field of FIELDS) {
    const value = present[field];
    if (value !== undefined) refs.push(`${REF_KIND[field]}:${tokenOf(value)}`);
  }
  return copy;
}
/** The reference adoption on the metadata: one member per present field holding the producer's value, in field order. */
function adoptMetadata(base: JsonValue, present: Present): JsonValue {
  const copy = objectOf(json(base), "metadata");
  for (const field of FIELDS) {
    const value = present[field];
    if (value !== undefined) copy[MEMBER[field]] = json(value);
  }
  return copy;
}
/** Projection edits the mutants compose: a ref, a member, a note, a status suffix, a sourceVersion, a ref rewrite. */
function snapshotOf(topology: JsonValue): JsonObject {
  return objectOf(arrayOf(objectOf(topology, "topology").snapshots, "snapshots")[0], "snapshot");
}
function withRef(topology: JsonValue, ref: string): JsonValue {
  const copy = json(topology);
  arrayOf(snapshotOf(copy).evidenceRefs, "evidenceRefs").push(ref);
  return copy;
}
function withMember(metadata: JsonValue, key: string, value: JsonValue): JsonValue {
  const copy = objectOf(json(metadata), "metadata");
  copy[key] = json(value);
  return copy;
}
function withNote(topology: JsonValue, note: string): JsonValue {
  const copy = objectOf(json(topology), "topology");
  arrayOf(copy.diagnostics, "diagnostics").push(note);
  return copy;
}
function withSnapshot(topology: JsonValue, key: string, edit: (current: JsonValue | undefined) => JsonValue): JsonValue {
  const copy = json(topology);
  const snapshot = snapshotOf(copy);
  snapshot[key] = edit(snapshot[key]);
  return copy;
}
function withStatus(topology: JsonValue, suffix: string): JsonValue {
  const copy = json(topology);
  const node = objectOf(snapshotOf(copy).node, "node");
  node.statusText = `${String(node.statusText)}${suffix}`;
  return copy;
}
function mapRefs(topology: JsonValue, edit: (refs: string[]) => string[]): JsonValue {
  const copy = json(topology);
  const snapshot = snapshotOf(copy);
  snapshot.evidenceRefs = edit(strings(snapshot.evidenceRefs, "evidenceRefs"));
  return copy;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits 0. */
function standInRf(answer: JsonValue): string {
  const folder = makeScratch("ri-provenance-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}

interface Carried {
  readonly reading: JsonValue;
  readonly spawns: string[][];
  readonly calls: number;
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing `envelope`. */
async function nativeReading(envelope: Envelope): Promise<Carried> {
  const log = standInRf(json(envelope));
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { ...INVOCATION }, invocationContext());
  return { reading, spawns: spawnsOf(log), calls: 0 };
}
/** One registry invocation of the INJECTED preview whose reader answers `envelope`. */
async function injectedReading(envelope: Envelope): Promise<Carried> {
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { ...INVOCATION }, invocationContext());
  return { reading, spawns: [], calls };
}
function readingOf(source: Envelope): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: json(source) };
}
/** A seam's reading of `envelope` must be the envelope byte for byte, after one spawn of the --no-commit argv or one injected call. */
async function carriedVerbatim(seam: Seam, envelope: Envelope): Promise<JsonValue> {
  const carried = seam === "rf-cli" ? await nativeReading(envelope) : await injectedReading(envelope);
  const source = objectOf(objectOf(carried.reading, "reading").source, "reading source");
  expect(carried.reading).toStrictEqual(readingOf(envelope));
  expect(JSON.stringify(source)).toBe(JSON.stringify(envelope));
  if (seam === "rf-cli") {
    expect(carried.spawns).toHaveLength(1);
    expect(carried.spawns[0]).toStrictEqual(["--workspace", ROOT, "context", "render", "--model", INVOCATION.model, "--task", INVOCATION.task, "--no-commit", "--no-input", "--json"]);
  } else {
    expect(carried.calls).toBe(1);
  }
  return carried.reading;
}

const CONTEXTS: Readonly<Record<Seam, ReactiveFiberTopologyContext>> = {
  "rf-cli": { scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" },
  "injected-fixture": { scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" },
};
function topologyOf(reading: JsonValue, seam: Seam): JsonValue {
  return json(reactivefiberTopology(reading, CONTEXTS[seam]));
}
function metadataOf(reading: JsonValue): JsonValue {
  return json(nativeEvidence(PREVIEW_ID, reading));
}
/** A projection with this run's root written as <ROOT>, so its digest is the same in every checkout. */
function normal(value: JsonValue): string {
  return JSON.stringify(value).split(JSON.stringify(ROOT).slice(1, -1)).join("<ROOT>");
}
function digestOf(value: JsonValue): string {
  return sha(normal(value));
}
/** Today's projections of an envelope: the topology under each seam and the native-evidence metadata. */
function projections(envelope: Envelope): { "rf-cli": JsonValue; "injected-fixture": JsonValue; metadata: JsonValue } {
  const reading = readingOf(envelope);
  return { "rf-cli": topologyOf(reading, "rf-cli"), "injected-fixture": topologyOf(reading, "injected-fixture"), metadata: metadataOf(reading) };
}
const BASE = projections(CARRIER);
const SURFACES = ["rf-cli", "injected-fixture", "metadata"] as const;
type Surface = (typeof SURFACES)[number];
function adopt(surface: Surface, present: Present): JsonValue {
  return surface === "metadata" ? adoptMetadata(BASE.metadata, present) : adoptTopology(BASE[surface], present);
}

/** The absent-field fixtures: each field absent alone, then all four absent. */
const ABSENT: readonly { readonly name: string; readonly fields: readonly Field[] }[] = [
  ...FIELDS.map(field => ({ name: `${field} absent`, fields: [field] })),
  { name: "all four absent", fields: [...FIELDS] },
];

/** Every distinct primitive the carrier states, keys excluded, in first-seen order. */
function carrierPrimitives(): JsonValue[] {
  const seen = new Map<string, JsonValue>();
  const visit = (node: JsonValue): void => {
    if (Array.isArray(node)) node.forEach(visit);
    else if (isObject(node)) Object.values(node).forEach(visit);
    else if (!seen.has(JSON.stringify(node))) seen.set(JSON.stringify(node), node);
  };
  visit(json(ROSTER.carrier));
  return [...seen.values()];
}
/** Every object the carrier states, in first-seen order. */
function carrierObjects(): JsonObject[] {
  const found: JsonObject[] = [];
  const visit = (node: JsonValue): void => {
    if (Array.isArray(node)) node.forEach(visit);
    else if (isObject(node)) {
      found.push(node);
      Object.values(node).forEach(visit);
    }
  };
  visit(json(ROSTER.carrier));
  return found;
}
/** One default sweep: the absent `field` set to each literal at the adoption's slot, judged on all three surfaces. */
function sweep(field: Field, present: Present, literals: readonly JsonValue[]): { tried: number; refused: Record<Surface, number>; quiet: string[] } {
  const refused: Record<Surface, number> = { "rf-cli": 0, "injected-fixture": 0, metadata: 0 };
  const quiet: string[] = [];
  for (const literal of literals) {
    for (const surface of SURFACES) {
      const adopted = adopt(surface, present);
      const mutant = surface === "metadata" ? withMember(adopted, MEMBER[field], literal) : withRef(adopted, `${REF_KIND[field]}:${tokenOf(literal)}`);
      const base = BASE[surface];
      if (judge(base, present, mutant).length > 0) refused[surface] += 1;
      else quiet.push(`${surface}: ${JSON.stringify(literal)}`);
    }
  }
  return { tried: literals.length, refused, quiet };
}
/** The named probes of one field: each literal's findings per surface (one line each) and the probe/surface pairs read quiet. */
function probeTable(field: Field, present: Present, probes: readonly JsonValue[]): { lines: string[]; quiet: string[] } {
  const quiet: string[] = [];
  const lines = probes.map(literal => {
    const read = SURFACES.map(surface => {
      const adopted = adopt(surface, present);
      const mutant = surface === "metadata" ? withMember(adopted, MEMBER[field], literal) : withRef(adopted, `${REF_KIND[field]}:${tokenOf(literal)}`);
      const findings = judge(BASE[surface], present, mutant);
      if (findings.length === 0) quiet.push(`${surface}: ${JSON.stringify(literal)}`);
      return `${surface} ${findings.join(",")}`;
    });
    return `${JSON.stringify(literal)} -> ${read.join(" | ")}`;
  });
  return { lines, quiet };
}

/** Every regular file below a root (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function dependencyNames(): string[] {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  return ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].flatMap(key => {
    const block = manifest[key];
    return isObject(block) ? Object.keys(block) : [];
  });
}
let nativeIds: Promise<string[]> | undefined;
/** The native registration's descriptor ids, loaded once. */
function nativeDescriptorIds(): Promise<string[]> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor.id);
  });
  return nativeIds;
}

/**
 * The functions and constants a case reads its subject through: the src tree and package.json, the registrations, the tracked
 * export, a seam, today's projections and the default sweeps over them (SELF-READ: every IMPL case names at least one).
 */
const READERS: readonly string[] = ["filesBelow", "dependencyNames", "registerReactiveFiberRender", "nativeDescriptorIds", "exportRow", "carriedVerbatim", "projections", "BASE", "probeTable", "sweep"];
/** The roster members read outside the describe block: the subject the cases measure. Its rows (pins, quotes, witnesses) only in rosterWitness. */
const SUBJECT_MEMBERS: readonly string[] = ["carrier", "native", "placements", "producer", "rfVersion", "revisionProbes", "policyProbes"];
/** Names that outside the describe block occur only at their declarations, or inside the declarations listed beside them. */
const CONFINED: readonly { readonly name: string; readonly within: readonly string[] }[] = [
  { name: "IMPL", within: [] },
  { name: "rosterWitness", within: [] },
  { name: "MEASURED", within: [] },
  { name: "REACHED", within: [] },
  { name: "ROSTER_PATH", within: ["readRoster"] },
  { name: "readRoster", within: ["ROSTER"] },
];
/** The roster's pinned constants THE GUARD reads (wb-yi2o F1): guardMisses alone, outside the describe block, beside SUBJECT_MEMBERS. */
const GUARDED_MEMBERS: readonly string[] = ["harness", "record", "hooks"];
/** The declarations outside the describe block that may read a roster pin's witness member. */
const WITNESS_READERS: readonly string[] = ["readRoster", "rosterWitness"];
const WITNESS_MEMBER = "witness";
/**
 * R-UNMEASURED's quiet row: a case that names a reader and returns a literal standing in for its roster witness, and one that
 * returns a literal handed to it through a helper the describe callback binds (wb-hiwv).
 */
const UNMEASURED_CASE = [
  "let HANDED: () => unknown = () => null;",
  "const IMPL = {",
  "  D3: async () => {",
  "    expect(BASE).toBeDefined();",
  '    return { pasted: "a literal equal to the roster witness" };',
  "  },",
  "  D4: async () => {",
  "    expect(BASE).toBeDefined();",
  "    return HANDED();",
  "  },",
  "};",
  'describe("planted", () => {',
  '  HANDED = () => ({ pasted: "a literal handed through a helper the describe callback binds" });',
  "});",
  "",
].join("\n");
/**
 * THE HARNESS (wb-hiwv F1): every pin case's statements, whitespace-normalized, held to the roster. A pin's witness is its own
 * case's measurement, recorded in MEASURED, then compared once against the roster's; the case's end is recorded in REACHED.
 */
const HARNESS: readonly string[] = deepFrozen([
  "const impl = IMPL[pin];",
  `expect(impl, \`no case for \${pin}\`).toBeTypeOf("function");`,
  "const witness = impl === undefined ? null : await impl();",
  "MEASURED[pin] = witness;",
  "expect(witness).toStrictEqual(rosterWitness(pin));",
  `REACHED.push(\`\${pin}:\${expect.getState().assertionCalls}\`);`,
]);
/**
 * THE RECORD (wb-yi2o F1): the record's context and statements, whitespace-normalized, held to the roster. It only reads MEASURED
 * and REACHED and drops none of its comparisons, so a record that copies the roster's witness and reached list in (the third part
 * of the wb-hiwv gate's L2-REBOUND-IT-SKIP-D3) or compares less reds.
 */
const RECORD: RecordPin = deepFrozen({
  context: "{ task }",
  statements: [
    "const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];",
    'const walk = (tasks: typeof task.file.tasks): void => { for (const child of tasks) { if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task }); else if (child.type === "suite") walk(child.tasks); } };',
    "walk(task.file.tasks);",
    "const titles = walked.map(entry => entry.name);",
    'expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);',
    'expect(titles, "the judged title, one test per pin in row order, then this record").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins.map(pin => pin.id)), RECORD_TITLE]);',
    "const here = walked.findIndex(entry => entry.self);",
    'expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);',
    'const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";',
    `const read = (entry: (typeof walked)[number]): string => \`\${entry.name} | \${entry.mode}\${entry.fails ? "+fails" : ""} | \${ran(entry.state) ? "ran" : (entry.state ?? "no result")}\`;`,
    'expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);',
    "const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));",
    `expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);`,
    "const texts = Object.entries(MEASURED).map(([pin, value]) => [pin, JSON.stringify(value)] as const);",
    "const shared = texts.filter(([pin, value]) => texts.some(([other, again]) => other !== pin && again === value)).map(([pin]) => pin);",
    `expect(shared, "no two pins share one witness (a case moved under another pin's id, its witness rewritten to match)").toEqual([]);`,
    'expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);',
  ],
});
/**
 * THE HOOKS (wb-yi2o F1): every statement of this file that names a hook, whitespace-normalized, held to the roster - the scratch
 * leak guard and the afterEach that restores PATH and removes scratch. A hook rewriting a task's result reds wherever it sits.
 */
const HOOKS: readonly string[] = deepFrozen([
  "installScratchLeakGuard(afterAll);",
  "afterEach(() => { process.env.PATH = oldPath; removeScratch(...scratches.splice(0)); });",
]);
/** vitest's hooks, named only in the HOOKS statements outside the describe block and never inside it (wb-yi2o F1). */
const HOOK_NAMES: readonly string[] = ["afterAll", "afterEach", "aroundAll", "aroundEach", "beforeAll", "beforeEach", "onTestFailed", "onTestFinished"];
/**
 * The runner's names (wb-yi2o F1), each named only as a call's callee - it, moreover, never outside the describe block and inside it
 * only as a registration's - so an alias, a re-binding, a declaration binding one or a member read (expect.extend, expect.getState()
 * outside the harness) reds.
 */
const CALLEE_ONLY: readonly string[] = ["it", "describe", "expect"];
/** The names the describe block's scaffolding binds: its two loops' row and pin (wb-yi2o F1). */
const SCAFFOLD_BINDINGS: readonly string[] = ["row", "pin"];
/**
 * R-RUNTIME's quiet row (wb-yi2o): a chai plugin answering every toStrictEqual with the value compared against itself, and an
 * aliased import of expect extending its matchers - each changes what a comparison means through a name the SELF-READ does not read;
 * and (wb-b93c) Object.freeze and Object.isFrozen replaced, the builtins THE FREEZE trusts.
 */
const RUNTIME_CASE = [
  'import { chai, expect as check } from "vitest";',
  "chai.use((api, utils) => {",
  '  utils.overwriteMethod(api.Assertion.prototype, "toStrictEqual", (original: (expected: unknown) => void) => function (this: object): void {',
  '    original.call(this, utils.flag(this, "object"));',
  "  });",
  "});",
  'check.extend({ toStrictEqual: () => ({ pass: true, message: () => "" }) });',
  "Object.freeze = <T>(value: T): T => value;",
  "Object.isFrozen = (): boolean => true;",
  "",
].join("\n");
/**
 * R-PRE-READ's quiet row (wb-5333 F2): code that runs before this file's module body - here a vi.hoisted callback, which vitest runs
 * above the imports - rewriting the roster file. Written after ROSTER's declaration it reads clean, since THE ORDER reads this file's
 * statements in their written order and never vitest's hoisting.
 */
const PRE_READ_CASE = [
  'import { vi } from "vitest";',
  "const ROSTER = readRoster();",
  "vi.hoisted(() => {",
  '  const fs = process.getBuiltinModule("node:fs");',
  '  fs.writeFileSync(new URL("fixtures/roster.json", import.meta.url), "{}");',
  "});",
  "",
].join("\n");
/**
 * A planted describe block for the SELF-READ: `scaffold` before a loop over row D whose pin case, registered with `options` when
 * given, takes `parameters` and runs `lines`; `after` follows the loop (a planted record, wb-yi2o).
 */
function plantedBlock(lines: readonly string[], scaffold: readonly string[] = [], parameters = "", options = "", after: readonly string[] = []): string {
  return [
    'describe("planted", () => {',
    ...scaffold.map(line => `  ${line}`),
    "  for (const { id: pin } of ROWS[3]?.pins ?? []) {",
    `    it(pin, ${options === "" ? "" : `${options}, `}async (${parameters}) => {`,
    ...lines.map(line => `      ${line}`),
    "    });",
    "  }",
    ...after.map(line => `  ${line}`),
    "});",
    "",
  ].join("\n");
}
/** A planted record for plantedBlock's `after`: the registration titled RECORD_TITLE, taking `context` and running `lines` (wb-yi2o). */
function plantedRecord(lines: readonly string[], context = RECORD.context): string[] {
  return [`it(RECORD_TITLE, (${context}) => {`, ...lines.map(line => `  ${line}`), "});"];
}

/** Whether an identifier is the name its own declaration binds (a function, a variable). */
function declares(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (ts.isFunctionDeclaration(parent) || ts.isVariableDeclaration(parent)) && parent.name === node;
}
/** Whether an identifier is a call's callee: `name(...)` (wb-yi2o). */
function isCallee(node: ts.Identifier): boolean {
  return ts.isCallExpression(node.parent) && node.parent.expression === node;
}
/** Whether an identifier is read for its keys alone: `Object.keys(name)` (wb-yi2o). */
function keysOf(node: ts.Identifier): boolean {
  const call = node.parent;
  if (!ts.isCallExpression(call) || call.arguments.length !== 1 || call.arguments[0] !== node || !ts.isPropertyAccessExpression(call.expression)) return false;
  return ts.isIdentifier(call.expression.expression) && call.expression.expression.text === "Object" && call.expression.name.text === "keys";
}
/**
 * The value names one declaration binds (wb-yi2o; wb-5333 U1: every kind of declaration that binds one): a variable or a parameter,
 * its binding patterns included (a catch clause's and a loop head's are variables), a named function or class (a declaration or an
 * expression), an enum, a namespace (a `declare global` block: the names its own statements declare), an import alias, and an import's
 * default, namespace and named bindings.
 */
function boundNames(node: ts.Node): string[] {
  const names = (name: ts.BindingName): string[] => (ts.isIdentifier(name) ? [name.text] : name.elements.flatMap(element => (ts.isBindingElement(element) ? names(element.name) : [])));
  if (ts.isVariableDeclaration(node) || ts.isParameter(node)) return names(node.name);
  if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node)) return node.name === undefined ? [] : [node.name.text];
  // wb-5333 U1: the wb-5333 gate's G01, an enum INVOCATION frozen in the judged set, stood in for the edited constant at 18/18.
  if (ts.isEnumDeclaration(node) || ts.isImportEqualsDeclaration(node)) return [node.name.text];
  if (ts.isModuleDeclaration(node) && (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0) return node.body !== undefined && ts.isModuleBlock(node.body) ? node.body.statements.flatMap(declaredBy) : [];
  if (ts.isModuleDeclaration(node)) return ts.isIdentifier(node.name) ? [node.name.text] : [];
  if (ts.isImportDeclaration(node)) return importedNames(node);
  return [];
}
/** The names an import binds: its default, its namespace and its named bindings (wb-5333). */
function importedNames(statement: ts.ImportDeclaration): string[] {
  const clause = statement.importClause;
  const bindings = clause?.namedBindings;
  const named = bindings === undefined ? [] : ts.isNamespaceImport(bindings) ? [bindings.name.text] : bindings.elements.map(element => element.name.text);
  return [...(clause?.name === undefined ? [] : [clause.name.text]), ...named];
}
/** The names one top-level statement declares: a variable statement's bindings, or what boundNames reads in it (wb-5333). */
function declaredBy(statement: ts.Statement): string[] {
  return ts.isVariableStatement(statement) ? statement.declarationList.declarations.flatMap(boundNames) : boundNames(statement);
}
/**
 * The names each var binds that a top-level statement declares at any depth outside a function, a class or a namespace (wb-5333 cut #3:
 * the wb-5333 gate's vf1, vr2 and vr2q): in a loop head (for, for-in, for-of, for-await), a block, an if or else branch, a try, catch or
 * finally block, a case or default clause, a labeled statement, a while or do body, or the statement itself. A var is the module's,
 * never the block's; a let, a const, a class or a function there is the block's own (this file is a module, so strict).
 */
function hoistedNames(statement: ts.Statement): string[] {
  const names: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionLike(node) || ts.isClassLike(node) || ts.isModuleDeclaration(node)) return;
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.BlockScoped) === 0) names.push(...node.declarations.flatMap(boundNames));
    ts.forEachChild(node, visit);
  };
  visit(statement);
  return names;
}
/**
 * The names a source binds at module scope (wb-5333 F1): what its top-level statements declare - its imports, functions, classes,
 * enums, namespaces, import aliases, globals and variables - and each var a top-level statement declares at any depth (wb-5333 cut #3).
 */
function topLevelNames(file: ts.SourceFile): Set<string> {
  const names = new Set<string>();
  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement)) for (const name of importedNames(statement)) names.add(name);
    else for (const name of [...declaredBy(statement), ...hoistedNames(statement)]) names.add(name);
  }
  return names;
}
/** Whether a top-level statement emits no code of its own: an import, an interface or a type alias (wb-5333 F2). */
function typeOrImport(statement: ts.Statement): boolean {
  return ts.isImportDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement);
}
/** THE ORDER (wb-5333 F2): the one form ROSTER's declaration takes, whitespace-normalized. */
const READ_FIRST = "const ROSTER = readRoster();";
/** Whether a node reads a witness member: `x.witness`, `x["witness"]` or a `witness` binding. */
function readsWitness(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) return node.name.text === WITNESS_MEMBER;
  if (ts.isElementAccessExpression(node)) return ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === WITNESS_MEMBER;
  if (ts.isBindingElement(node)) return [node.propertyName, node.name].some(name => name !== undefined && ts.isIdentifier(name) && name.text === WITNESS_MEMBER);
  return false;
}
/** The names a top-level statement declares, joined (its owner in the findings). */
function ownerOf(statement: ts.Statement): string {
  if (ts.isFunctionDeclaration(statement)) return statement.name?.text ?? "<function>";
  if (ts.isVariableStatement(statement)) return statement.declarationList.declarations.map(entry => (ts.isIdentifier(entry.name) ? entry.name.text : "<binding>")).join(",");
  return "<statement>";
}
/** The reads one declaration's subtree makes that the SELF-READ refuses; `hooked` when it is one of the HOOKS statements. */
function refusedReads(owner: string, root: ts.Node, hooked = false): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    // wb-yi2o F1: outside the describe block it is never named, describe and expect only as a call's callee (a declaration binding
    // one included), and a hook only in the HOOKS statements.
    if (ts.isIdentifier(node) && CALLEE_ONLY.includes(node.text) && (node.text === "it" || !isCallee(node))) found.push(`${owner} names ${node.text}`);
    if (ts.isIdentifier(node) && HOOK_NAMES.includes(node.text) && !hooked) found.push(`${owner} names ${node.text}`);
    if (ts.isIdentifier(node) && !declares(node)) {
      const confined = CONFINED.find(entry => entry.name === node.text);
      if (confined !== undefined && !confined.within.includes(owner)) found.push(`${owner} names ${node.text}`);
      if (node.text === "ROSTER") {
        const parent = node.parent;
        const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : undefined;
        const allowed = member !== undefined && (SUBJECT_MEMBERS.includes(member) || (owner === "rosterWitness" && member === "rows") || (owner === "guardMisses" && GUARDED_MEMBERS.includes(member)));
        if (!allowed) found.push(`${owner} reads ROSTER${member === undefined ? "" : `.${member}`}`);
      }
    }
    if (readsWitness(node) && !WITNESS_READERS.includes(owner)) found.push(`${owner} reads a ${WITNESS_MEMBER}`);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/** The describe block's regions outside its pin cases: its scaffolding, the judged set and the record. */
type Region = "describe" | "the judged set" | "the record";
/** Outside the pin cases, the names the describe block uses only in the regions listed beside them (none listed: never). */
const DESCRIBE_NAMES: readonly { readonly name: string; readonly within: readonly Region[] }[] = [
  { name: "rosterWitness", within: [] },
  { name: "ROSTER_PATH", within: [] },
  { name: "readRoster", within: [] },
  { name: "IMPL", within: ["the judged set"] },
  { name: "MEASURED", within: ["the record"] },
  { name: "REACHED", within: ["the record"] },
  { name: "ROSTER", within: ["the judged set", "the record"] },
  // wb-yi2o F1: it only as a registration's callee (never visited), a hook nowhere.
  { name: "it", within: [] },
  ...HOOK_NAMES.map(name => ({ name, within: [] })),
];
/** A statement's text with every whitespace run read as one space, so its layout over lines does not matter. */
function normalized(text: string): string {
  return text.replace(/\s+/g, " ");
}
type Runner = ts.ArrowFunction | ts.FunctionExpression;
function isRunner(node: ts.Node): node is Runner {
  return ts.isArrowFunction(node) || ts.isFunctionExpression(node);
}
/**
 * A test registration: a call of it whose last argument is the function it runs. Any other call (a modifier form of it, a call
 * of test, an alias of it) is read as scaffolding, so the function it runs is held to the scaffolding's names.
 */
function registrationOf(node: ts.Node): { readonly call: ts.CallExpression; readonly run: Runner } | undefined {
  if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "it") return undefined;
  const run = node.arguments[node.arguments.length - 1];
  return run !== undefined && isRunner(run) ? { call: node, run } : undefined;
}
/**
 * THE SELF-READ inside a describe block (wb-hiwv F1, wb-yi2o F1). A registration titled JUDGED_TITLE runs the judged set, which
 * takes no context; one titled RECORD_TITLE is the record, held to RECORD (its context and its statements); every other registration
 * is a pin case, which takes no parameters and whose statements must be the HARNESS (its title and options are read as scaffolding).
 * Outside the pin cases each DESCRIBE_NAMES name is used only in its listed regions (it never, since a registration's callee is not
 * visited, and a hook nowhere), describe and expect only as a call's callee, IMPL in the judged set only for its keys, and a witness
 * member is read only by the record; the scaffolding binds only SCAFFOLD_BINDINGS and the judged set no name in `topLevel` (wb-5333
 * F1). Returns the refused reads, by region (a pin case
 * as it(<title>)).
 */
function describeReads(file: ts.SourceFile, block: ts.CallExpression, topLevel: ReadonlySet<string>): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node, region: Region): void => {
    const registration = registrationOf(node);
    if (registration !== undefined) {
      const [title] = registration.call.arguments;
      const titled = title !== undefined && ts.isIdentifier(title) ? title.text : undefined;
      for (const argument of registration.call.arguments) if (argument !== registration.run) visit(argument, region);
      const body = registration.run.body;
      const statements = ts.isBlock(body) ? body.statements.map(statement => normalized(statement.getText(file))) : [normalized(body.getText(file))];
      const context = registration.run.parameters.map(parameter => normalized(parameter.getText(file))).join(", ");
      if (titled === "JUDGED_TITLE") {
        if (context !== "") found.push("it(JUDGED_TITLE) takes a context");
        visit(registration.run, "the judged set");
        return;
      }
      if (titled === "RECORD_TITLE") {
        if (context !== RECORD.context || JSON.stringify(statements) !== JSON.stringify(RECORD.statements)) found.push("it(RECORD_TITLE) is not the record");
        visit(registration.run, "the record");
        return;
      }
      for (const parameter of registration.run.parameters) ts.forEachChild(parameter, child => visit(child, region));
      if (context !== "" || JSON.stringify(statements) !== JSON.stringify(HARNESS)) found.push(`it(${title === undefined ? "" : normalized(title.getText(file))}) is not the harness`);
      return;
    }
    if (ts.isIdentifier(node)) {
      const rule = DESCRIBE_NAMES.find(entry => entry.name === node.text);
      if (rule !== undefined && !rule.within.includes(region)) {
        const parent = node.parent;
        const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? `.${parent.name.text}` : "";
        found.push(node.text === "ROSTER" ? `${region} reads ROSTER${member}` : `${region} names ${node.text}`);
      }
      if (node.text !== "it" && CALLEE_ONLY.includes(node.text) && !isCallee(node)) found.push(`${region} names ${node.text}`);
      if (node.text === "IMPL" && region === "the judged set" && !keysOf(node)) found.push("the judged set reads IMPL beyond its keys");
    }
    if (readsWitness(node) && region !== "the record") found.push(`${region} reads a ${WITNESS_MEMBER}`);
    if (region === "describe") for (const name of boundNames(node)) if (!SCAFFOLD_BINDINGS.includes(name)) found.push(`describe binds ${name}`);
    // wb-5333 F1: the judged set re-binds no name this file binds at module scope (topLevelNames: a var a top-level statement declares at
    // any depth included, wb-5333 cut #3), so no in-file name it compares is the roster's own by any declaration the SELF-READ reads.
    if (region === "the judged set") for (const name of boundNames(node)) if (topLevel.has(name)) found.push(`the judged set binds ${name}`);
    ts.forEachChild(node, child => visit(child, region));
  };
  visit(block, "describe");
  return found;
}
/** THE FREEZER (wb-5333 cut #6): the one function an in-file side's initializer may call (the FREEZER of wb-26dh's THE FORM). */
const FREEZER = "deepFrozen";
/**
 * THE FREEZER (wb-5333 cut #6, refusal #5's U1: the wb-5333 gate's DF-IMPORT family - this file's deepFrozen removed and deepFrozen
 * imported from a test helper that freezes every input as this file's does and answers the ROWS literal with the roster file's rows,
 * beside row B's label cut, D3 removed from ROWS or D3's quote cut, stayed 0 failed | 18 passed on the wb-5333 cut #5, lint- and
 * type-clean there, since THE FORM reads a deepFrozen call by its callee's name alone): in a source shaped like this file, deepFrozen
 * is bound by exactly one top-level function declaration with a body and named nowhere else in the source but as a call's callee, so no
 * import, global, other declaration or assignment binds it; and eval is named nowhere in the source (a direct eval re-binds this
 * module's names through a string the SELF-READ does not parse). Returns the refused reads: the declaration's, then each top-level
 * statement's other naming in source order, by owner.
 */
function freezerRead(file: ts.SourceFile): string[] {
  const found: string[] = [];
  const own = file.statements.filter((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === FREEZER && statement.body !== undefined);
  if (own.length !== 1) found.push(`${FREEZER} is not one top-level function declaration with a body`);
  const declaration = own.length === 1 ? own[0]?.name : undefined;
  for (const statement of file.statements) {
    const visit = (node: ts.Node): void => {
      if (ts.isIdentifier(node) && node.text === FREEZER && node !== declaration && !isCallee(node)) found.push(`${ownerOf(statement)} names ${FREEZER} other than as a call's callee`);
      if (ts.isIdentifier(node) && node.text === "eval") found.push(`${ownerOf(statement)} names eval`);
      ts.forEachChild(node, visit);
    };
    visit(statement);
  }
  return found;
}
/**
 * THE SELF-READ (wb-3xmr F2, wb-hiwv F1, wb-yi2o F1) over a source text, this file's or a planted one. Outside the describe block:
 * every IMPL case names one of READERS; IMPL, rosterWitness, MEASURED and REACHED are named only where declared, ROSTER_PATH only in
 * readRoster and readRoster only for ROSTER; a witness member is read only in readRoster and rosterWitness; ROSTER is read only
 * through SUBJECT_MEMBERS (its rows in rosterWitness alone, GUARDED_MEMBERS in GUARD_MISSES alone); it is never named, describe and
 * expect only as a call's callee, and a hook only in the HOOKS statements; and in a source that declares ROSTER, THE ORDER (wb-5333
 * F2): no statement before that declaration but an import, an interface or a type alias, and the declaration READ_FIRST, while a
 * source that declares readRoster declares ROSTER (wb-5333 cut #2), and a source that declares both is read by THE BINDINGS (wb-5333
 * cut #3) and THE FREEZER (wb-5333 cut #6). Inside it,
 * describeReads. Returns the refused reads, by
 * declaration (an IMPL case as IMPL.<pin>) or by region.
 */
function selfRead(text: string): string[] {
  const file = ts.createSourceFile("self-read.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: string[] = [];
  const topLevel = topLevelNames(file);
  // THE ORDER (wb-5333 F2): in a source that declares ROSTER, no statement before that declaration emits code (imports, interfaces
  // and type aliases aside), and the declaration is READ_FIRST, so nothing of the source runs before readRoster reads the roster.
  const rosterAt = file.statements.findIndex(statement => declaredBy(statement).includes("ROSTER"));
  for (const statement of rosterAt < 0 ? [] : file.statements.slice(0, rosterAt)) if (!typeOrImport(statement)) found.push(`${ownerOf(statement)} runs before readRoster`);
  const declared = file.statements[rosterAt];
  if (declared !== undefined && normalized(declared.getText(file)) !== READ_FIRST) found.push("ROSTER is not readRoster() alone");
  // wb-5333 cut #2: a source that declares readRoster binds ROSTER by a top-level declaration of its own, never a global another module
  // sets (the wb-5333 seat's G1: `declare global` and an imported module's side effect, beside a broken D3, stayed 18/18).
  const reader = file.statements.some(statement => ts.isFunctionDeclaration(statement) && statement.name?.text === "readRoster");
  if (declared === undefined && reader) found.push("ROSTER is not readRoster() alone");
  // THE BINDINGS (wb-5333 cut #3; wb-26dh's bindingsRead since cut #5): in a source shaped like this file (ROSTER declared beside
  // readRoster), no module-scope name is a let or a var but the native descriptor cache, and each in-file side is one top-level const
  // whose initializer THE FORM reads clean, so none is re-assigned, a global or computed when the file runs in a form the planted
  // sources and wb-26dh's bindings census spell (the cut #3 seat's la1-la7 and g01, each 18/18 on the wb-5333 cut #2; the wb-5333
  // gate's X and E members, each 0 failed on cut #4), and deepFrozen, the one call THE FORM admits, is this source's own (THE FREEZER,
  // wb-5333 cut #6: the wb-5333 gate's DF-IMPORT family, each 0 failed on cut #5).
  if (declared !== undefined && reader) found.push(...bindingsRead(file), ...freezerRead(file));
  for (const statement of file.statements) {
    if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isImportDeclaration(statement)) continue;
    const call = ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression) ? statement.expression : undefined;
    if (call !== undefined && ts.isIdentifier(call.expression) && call.expression.text === "describe") {
      found.push(...describeReads(file, call, topLevel));
      continue;
    }
    const impl = ts.isVariableStatement(statement) ? statement.declarationList.declarations.find(entry => ts.isIdentifier(entry.name) && entry.name.text === "IMPL") : undefined;
    if (impl?.initializer === undefined || !ts.isObjectLiteralExpression(impl.initializer)) {
      const hooked = ts.isExpressionStatement(statement) && HOOKS.includes(normalized(statement.getText(file)));
      found.push(...refusedReads(ownerOf(statement), statement, hooked));
      continue;
    }
    for (const property of impl.initializer.properties) {
      const pin = property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : "<entry>";
      const named = new Set<string>();
      const collect = (node: ts.Node): void => {
        if (ts.isIdentifier(node)) named.add(node.text);
        ts.forEachChild(node, collect);
      };
      collect(property);
      if (!READERS.some(reader => named.has(reader))) found.push(`IMPL.${pin} names no reader`);
      found.push(...refusedReads(`IMPL.${pin}`, property));
    }
  }
  return found;
}

/** A planted source with the refusals the SELF-READ must read in it, in order (none: it reads clean). */
interface Pinned {
  readonly source: string;
  readonly reads: readonly string[];
}
/** The HARNESS with its statement at `at` rewritten to `line`. */
function harnessWith(at: number, line: string): string[] {
  return HARNESS.map((entry, index) => (index === at ? line : entry));
}
/** `it` re-bound in a describe callback to register `run` in place of each pin case's (wb-yi2o F1). */
function reboundIt(run: string): string[] {
  return ["const it = (name: string, options: { timeout: number }, run: () => Promise<void>): void => {", `  vitestIt(name, options, ${run});`, "};"];
}
/** The record's forging lines of the wb-hiwv gate's L2-REBOUND-IT-SKIP-D3: the roster's witness and reached list copied in. */
const FORGED_RECORD_LINES: readonly string[] = ["MEASURED.D3 = ROSTER.rows[3]?.pins[2]?.witness ?? null;", "REACHED.splice(0, REACHED.length, ...ROSTER.reached);"];
/** A planted describe block whose judged set, taking `context`, runs `lines` (wb-yi2o F1). */
function plantedJudgedSet(lines: readonly string[], context = ""): string {
  return ['describe("planted", () => {', `  it(JUDGED_TITLE, (${context}) => {`, ...lines.map(line => `    ${line}`), "  });", "});", ""].join("\n");
}
/** THE FREEZER's one form in a planted source (wb-5333 cut #6): deepFrozen declared once, a top-level function with a body that calls itself. */
const PLANTED_FREEZER = "function deepFrozen<T>(value: T): T {\n  for (const member of Array.isArray(value) ? value : []) deepFrozen(member);\n  return value;\n}";
/**
 * A planted source shaped like this file (THE BINDINGS, wb-5333 cut #3): ROSTER read first, readRoster declared, deepFrozen declared
 * by `freezer` (THE FREEZER, wb-5333 cut #6: PLANTED_FREEZER, unless a source binds deepFrozen otherwise), and each in-file side a
 * top-level const of a string (wb-5333 cut #5: THE FORM refuses a number, wb-26dh's K1), `lines` standing in place of the sides they
 * name, `after` following.
 */
function plantedSides(lines: Readonly<Record<string, string>> = {}, after = "", freezer = PLANTED_FREEZER): string {
  return `${[READ_FIRST, "function readRoster(): unknown {", "  return null;", "}", ...(freezer === "" ? [] : [freezer]), ...IN_FILE_SIDES.map(side => lines[side] ?? `const ${side} = "${side.toLowerCase()}";`)].join("\n")}\n${after}`;
}
/** THE SELF-READ's pins outside the describe block: planted sources showing each refusal, beside the HOOKS reading clean. */
const PLANTED_SOURCES: Readonly<Record<string, Pinned>> = {
  "a trivial expect returning its roster witness (G3, G3b)": {
    source: 'const IMPL = {\n  D3: async () => {\n    expect(true).toBe(true);\n    return rosterWitness("D3");\n  },\n};\n',
    reads: ["IMPL.D3 names no reader", "IMPL.D3 names rosterWitness"],
  },
  "the witness through a helper": {
    source: 'function handed(): unknown {\n  return rosterWitness("D3");\n}\nconst IMPL = {\n  D3: async () => {\n    expect(BASE).toBeDefined();\n    return handed();\n  },\n};\n',
    reads: ["handed names rosterWitness"],
  },
  "the witness read after measuring": {
    source: 'const IMPL = {\n  D3: async () => {\n    projections(CARRIER);\n    return ROSTER.rows[3]?.pins[2]?.witness;\n  },\n};\n',
    reads: ["IMPL.D3 reads a witness", "IMPL.D3 reads ROSTER.rows"],
  },
  "a constant naming no reader": { source: 'const IMPL = {\n  D3: async () => {\n    return { pasted: true };\n  },\n};\n', reads: ["IMPL.D3 names no reader"] },
  // THE RUNNER outside the describe block (wb-yi2o F1): it never named, describe and expect only as a call's callee, a hook only in
  // the HOOKS statements.
  "an alias of it at the top level (L2-REBOUND-IT-SKIP-D3, its first part)": { source: "const vitestIt = it;\n", reads: ["vitestIt names it"] },
  "it bound at the top level": { source: "function it(): void {}\n", reads: ["it names it"] },
  "a test registered at the top level": { source: 'it("D3", async () => {\n  expect(BASE).toBeDefined();\n});\n', reads: ["<statement> names it"] },
  "describe bound at the top level": { source: "const describe = (name: string, factory: () => void): void => factory();\n", reads: ["describe names describe"] },
  "an alias of expect at the top level": { source: "const vitestExpect = expect;\n", reads: ["vitestExpect names expect"] },
  "a matcher replaced through expect": { source: 'expect.extend({ toStrictEqual: () => ({ pass: true, message: () => "" }) });\n', reads: ["<statement> names expect"] },
  "an equality tester added through expect": { source: "expect.addEqualityTesters([() => true]);\n", reads: ["<statement> names expect"] },
  "expect's state reached for its custom testers": { source: "expect.getState().customTesters.push(() => true);\n", reads: ["<statement> names expect"] },
  "a hook flipping every failed result at the top level": {
    source: 'afterEach(({ task }) => {\n  if (task.result?.state === "fail") task.result.state = "pass";\n});\n',
    reads: ["<statement> names afterEach"],
  },
  "a hook taken by value": { source: "const after = afterEach;\n", reads: ["after names afterEach"] },
  "the HOOKS statements (control)": { source: `${HOOKS.join("\n")}\n`, reads: [] },
  "the roster's pinned constants read outside THE GUARD, and its rows read by THE GUARD": {
    source: "const OTHER = [ROSTER.harness, ROSTER.record, ROSTER.hooks];\nfunction guardMisses(): unknown[] {\n  return [ROSTER.rows];\n}\n",
    reads: ["OTHER reads ROSTER.harness", "OTHER reads ROSTER.record", "OTHER reads ROSTER.hooks", "guardMisses reads ROSTER.rows"],
  },
  // THE ORDER (wb-5333 F2): the roster is read before any other statement of this file runs, and by readRoster() alone.
  "the roster rewritten on disk before readRoster reads it (the wb-b93c PREP's e10)": {
    source: [
      'const PRE_FILE = join(dirname(fileURLToPath(import.meta.url)), "fixtures", ["ri-decision-provenance-echo", "roster.json"].join("-"));',
      'const PRE_TEXT = readFileSync(PRE_FILE, "utf8");',
      "writeFileSync(PRE_FILE, JSON.stringify(JSON.parse(PRE_TEXT)));",
      "const ROSTER = readRoster();",
      "writeFileSync(PRE_FILE, PRE_TEXT);",
      "",
    ].join("\n"),
    reads: ["PRE_FILE runs before readRoster", "PRE_TEXT runs before readRoster", "<statement> runs before readRoster"],
  },
  "readRoster handed to a helper in ROSTER's own initializer": {
    source: "const ROSTER = preRead(readRoster);\nfunction preRead(read: () => unknown): unknown {\n  return read();\n}\n",
    reads: ["ROSTER is not readRoster() alone"],
  },
  // wb-5333 cut #2: a function declaration before ROSTER's is refused though it runs nothing (the wb-5333 gate's G05a, unpinned at
  // cut #1); ROSTER bound by an import or declared as a global is not readRoster() alone (the wb-5333 seat's I1 and G1), nor is a
  // source that declares readRoster beside no ROSTER of its own (G1p: the global declared in another file).
  "a function declaration before ROSTER's (the wb-5333 gate's G05a)": { source: "function early(): void {}\nconst ROSTER = readRoster();\n", reads: ["early runs before readRoster"] },
  "ROSTER bound by an import (the wb-5333 seat's I1)": { source: 'import { ROSTER } from "./elsewhere.js";\n', reads: ["ROSTER is not readRoster() alone"] },
  "ROSTER declared as a global (the wb-5333 seat's G1)": { source: "declare global {\n  var ROSTER: unknown;\n}\n", reads: ["ROSTER is not readRoster() alone"] },
  "readRoster declared beside no ROSTER of this source (the wb-5333 seat's G1p)": { source: "function readRoster(): unknown {\n  return null;\n}\n", reads: ["ROSTER is not readRoster() alone"] },
  "the roster read first, imports and types before it (control)": {
    source: 'import { join } from "node:path";\ninterface Kept {\n  readonly id: string;\n}\ntype Also = Kept;\nconst ROSTER = readRoster();\nconst AFTER = join("a", "b");\n',
    reads: [],
  },
  // wb-5333 cut #3: ROSTER bound by a var in a top-level loop head beside readRoster is no declaration THE ORDER reads, so the source
  // reads as one that declares readRoster beside no ROSTER of its own.
  "ROSTER bound by a var in a top-level loop head beside readRoster (the wb-5333 gate's vf1 form)": {
    source: "for (var ROSTER of [readRoster()]) void ROSTER;\nfunction readRoster(): unknown {\n  return null;\n}\n",
    reads: ["ROSTER is not readRoster() alone", "<statement> names readRoster", "<statement> reads ROSTER"],
  },
  // THE BINDINGS (wb-5333 cut #3): in a source shaped like this file, no module-scope name is a let or a var but the native descriptor
  // cache (this seat's la1-la7: ROWS a let or a top-level var, row B's label cut in source, then assigned the roster's rows by the
  // judged set or a top-level helper, stayed 18/18 on the wb-5333 cut #2), and each in-file side is one top-level const whose
  // initializer THE FORM reads clean (this seat's g01: INVOCATION a global property set at the top level and declared in another file,
  // its task edited, stayed 18/18 there; wb-26dh's bindingsRead since wb-5333 cut #5).
  "a let ROWS the judged set assigns the roster's rows to (this seat's la1)": {
    source: plantedSides({ ROWS: 'let ROWS: unknown[] = [{ id: "B", label: "(a) adoption fixture" }];' }, plantedJudgedSet(["ROWS = [...ROSTER.rows];", "expect(ROWS).toHaveLength(4);"])),
    reads: ["ROWS is bound by let or var", "ROWS is not one top-level const of literals"],
  },
  "top-level names bound by a let, a var and a var in a loop head, assigned by the judged set and a top-level helper (this seat's la3-la7)": {
    source: plantedSides(
      {},
      [
        "let tiles = (): string[] => [];",
        "var exportRow = (): unknown => null;",
        "for (var unfrozen of [(): string[] => []]) void unfrozen;",
        "function restore(): void {",
        "  tiles = () => [];",
        "}",
        plantedJudgedSet(["tiles = () => [];", "restore();", "expect([tiles(), exportRow(), unfrozen()]).toHaveLength(3);"]),
      ].join("\n"),
    ),
    reads: ["tiles is bound by let or var", "exportRow is bound by let or var", "unfrozen is bound by let or var"],
  },
  "INVOCATION a global property no statement of the source declares (this seat's g01)": {
    source: plantedSides({ INVOCATION: 'Object.assign(globalThis, { INVOCATION: { model: "pi-invocation-model-9d2", task: "summarise the notes, edited in source" } });' }),
    reads: ["INVOCATION is not one top-level const of literals"],
  },
  "sides declared otherwise: an ambient const with a literal (no code is emitted for it), a const in a top-level block, an import, an enum, a using declaration, a const binding pattern and a const declared twice": {
    source: plantedSides({
      BEAD: 'declare const BEAD = "wb-tz4r.3";',
      PROGRAM_TAG: '{\n  const PROGRAM_TAG = "[RI-UNIFIED-DECISION-INFERENCE-R3]";\n}',
      TRIGGER: 'import { TRIGGER } from "./elsewhere.js";',
      QUOTE_PIN: 'enum QUOTE_PIN {\n  Text = "text",\n}',
      QUOTE: 'using QUOTE = "Preserve endpoint/model revision";',
      GATING_ARTIFACTS: "const { GATING_ARTIFACTS } = { GATING_ARTIFACTS: [] };",
      INVOCATION: 'const INVOCATION = "pi-invocation-model-9d2";\nconst INVOCATION = "summarise the notes";',
    }),
    reads: [
      "BEAD is not one top-level const of literals",
      "PROGRAM_TAG is not one top-level const of literals",
      "TRIGGER is not one top-level const of literals",
      "QUOTE_PIN is not one top-level const of literals",
      "QUOTE is not one top-level const of literals",
      "GATING_ARTIFACTS is not one top-level const of literals",
      "INVOCATION is not one top-level const of literals",
    ],
  },
  "sides computed when the source runs through an identifier their initializer names: another side, the bead export's reader, the roster file's reader and path, a helper and an accessor's name": {
    source: plantedSides({
      BEAD: "const BEAD = QUOTE_PIN;",
      QUOTE: "const QUOTE = exportRow().notes;",
      INVOCATION: 'const INVOCATION = deepFrozen(JSON.parse(readFileSync(join(HERE, "fixtures", ["ri-decision-provenance-echo", "roster.json"].join("-")), "utf8")).invocation);',
      FIELDS: "const FIELDS = deepFrozen(fieldsOf());",
      MEMBER: 'const MEMBER = deepFrozen({\n  get riEndpoint(): string {\n    return "riEndpoint";\n  },\n});',
    }),
    reads: [
      "BEAD is not one top-level const of literals",
      "QUOTE is not one top-level const of literals",
      "INVOCATION is not one top-level const of literals",
      "FIELDS is not one top-level const of literals",
      "MEMBER is not one top-level const of literals",
    ],
  },
  // wb-5333 cut #5 (the re-cut over the landed wb-26dh, R-B256): THE FORM reads an initializer's form, so each side this source
  // computes at run time through no identifier but deepFrozen and TRIGGER is refused - the wb-5333 gate's X5b, X3k, X1k, X4k and X2k
  // forms, each 0 failed on the wb-5333 cut #3; cut #4 pinned this source as reading clean (NOT CLAIMED there).
  "sides computed when the source runs through no identifier but deepFrozen and TRIGGER: TRIGGER outside row A's label, a dynamic import read through its members and a string-keyed accessor (the wb-5333 gate's X5b, X3k, X1k, X4k and X2k)": {
    source: plantedSides({
      QUOTE_PIN: `const QUOTE_PIN = \`\${TRIGGER.slice(0, 0)}docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:14@485f3615db1e\`;`,
      QUOTE: 'const QUOTE: string = (await import("node:fs")).readFileSync("/fixture/export.jsonl", "utf8").match(/Preserve [^.]*/)?.[0] ?? "";',
      INVOCATION: 'const INVOCATION = deepFrozen((await import("node:module")).createRequire("/fixture/test/anchor.ts")("./fixtures/roster.json").invocation);',
      MEMBER: 'const MEMBER = deepFrozen({\n  get "riEndpoint"(): string {\n    return "riEndpoint";\n  },\n});',
      ROWS: 'const ROWS = deepFrozen((await import("./helper.js")).rows);',
    }),
    reads: [
      "QUOTE_PIN is not one top-level const of literals",
      "QUOTE is not one top-level const of literals",
      "INVOCATION is not one top-level const of literals",
      "MEMBER is not one top-level const of literals",
      "ROWS is not one top-level const of literals",
    ],
  },
  // wb-5333 cut #5: refusal #4's members (R-B256 folded them into wb-26dh) - a side naming a value inside an instantiation expression
  // or a class expression's heritage clause, as the wb-5333 gate wrote E1-E4 (the private roster's name a placeholder here).
  "sides naming a value inside an instantiation expression: INVOCATION and ROWS through an in-file helper so called, FIELD_SPELLINGS through another side's member so called (the wb-5333 gate's E1, E2 and E4)": {
    source: plantedSides(
      {
        INVOCATION: "const INVOCATION = deepFrozen((invocationOf<{ readonly model: string; readonly task: string }>)());",
        FIELD_SPELLINGS: "const FIELD_SPELLINGS: readonly RegExp[] = deepFrozen((GATING_ARTIFACTS.flatMap<RegExp>)(() => []).concat([/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i]));",
        ROWS: "const ROWS: readonly Row[] = deepFrozen((rowsOf<readonly Row[]>)());",
      },
      [
        "function invocationOf<T>(): T {",
        '  return JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation;',
        "}",
        "function rowsOf<T>(): T {",
        '  return JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).rows;',
        "}",
        "",
      ].join("\n"),
    ),
    reads: ["INVOCATION is not one top-level const of literals", "FIELD_SPELLINGS is not one top-level const of literals", "ROWS is not one top-level const of literals"],
  },
  "INVOCATION spread from a new class expression extending an in-file class (the wb-5333 gate's E3)": {
    source: plantedSides(
      { INVOCATION: "const INVOCATION = deepFrozen({ ...new (class extends FreshInvocation {})() });" },
      [
        "class FreshInvocation {",
        '  readonly model: string = JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation.model;',
        '  readonly task: string = JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation.task;',
        "}",
        "",
      ].join("\n"),
    ),
    reads: ["INVOCATION is not one top-level const of literals"],
  },
  // THE FREEZER (wb-5333 cut #6, refusal #5's U1: the wb-5333 gate's DF-IMPORT family - this file's deepFrozen removed and deepFrozen
  // imported from a test helper that answers the ROWS literal with the roster file's rows, beside row B's label cut, D3 removed from
  // ROWS or D3's quote cut, stayed 0 failed | 18 passed on the wb-5333 cut #5, since THE FORM reads a deepFrozen call by its callee's
  // name alone): in a source shaped like this file deepFrozen is bound by exactly one top-level function declaration with a body and
  // named nowhere else but as a call's callee, and eval is named nowhere.
  "deepFrozen imported from a helper, its declaration removed (the wb-5333 gate's DF-IMPORT: b2 and b2k)": {
    source: `import { deepFrozen } from "./helpers/frozen.js";\n${plantedSides({ ROWS: 'const ROWS = deepFrozen([{ id: "B", label: "(a) adoption fixture" }]);' }, "", "")}`,
    reads: ["deepFrozen is not one top-level function declaration with a body", "<statement> names deepFrozen other than as a call's callee"],
  },
  "deepFrozen a global another module sets, the source declaring none": {
    source: `import "./helpers/frozen-global.js";\n${plantedSides({ ROWS: 'const ROWS = deepFrozen([{ id: "B", label: "(a) adoption fixture" }]);' }, "", "")}`,
    reads: ["deepFrozen is not one top-level function declaration with a body"],
  },
  "deepFrozen imported otherwise or declared ambient, its declaration removed: under an alias, as a default, as a namespace, through an import alias, in a declare global block and as an ambient function": {
    source: [
      'import { rowsFrozen as deepFrozen } from "./helpers/frozen.js";',
      'import deepFrozen from "./helpers/frozen-default.js";',
      'import * as deepFrozen from "./helpers/frozen-namespace.js";',
      plantedSides(
        {},
        "",
        ['import deepFrozen = require("./helpers/frozen.cjs");', "declare global {", "  function deepFrozen<T>(value: T): T;", "}", "declare function deepFrozen<T>(value: T): T;"].join("\n"),
      ),
    ].join("\n"),
    reads: [
      "deepFrozen is not one top-level function declaration with a body",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "deepFrozen names deepFrozen other than as a call's callee",
    ],
  },
  "deepFrozen bound by another declaration, its function declaration removed: a var, a let, a const, a class, an enum and a namespace": {
    source: plantedSides(
      {},
      "",
      [
        "var deepFrozen = <T>(value: T): T => value;",
        "let deepFrozen = <T>(value: T): T => value;",
        "const deepFrozen = <T>(value: T): T => value;",
        "class deepFrozen {}",
        'enum deepFrozen {\n  Frozen = "frozen",\n}',
        "namespace deepFrozen {}",
      ].join("\n"),
    ),
    reads: [
      "deepFrozen is bound by let or var",
      "deepFrozen is bound by let or var",
      "deepFrozen is not one top-level function declaration with a body",
      "deepFrozen names deepFrozen other than as a call's callee",
      "deepFrozen names deepFrozen other than as a call's callee",
      "deepFrozen names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
      "<statement> names deepFrozen other than as a call's callee",
    ],
  },
  "deepFrozen declared twice at the top level, and again in a top-level block": {
    source: plantedSides({}, "{\n  function deepFrozen<T>(value: T): T {\n    return value;\n  }\n}\n", `${PLANTED_FREEZER}\n${PLANTED_FREEZER}`),
    reads: ["deepFrozen is not one top-level function declaration with a body", "deepFrozen names deepFrozen other than as a call's callee", "deepFrozen names deepFrozen other than as a call's callee", "<statement> names deepFrozen other than as a call's callee"],
  },
  "the declaration kept and deepFrozen re-bound: assigned at the top level, through a destructuring assignment and in the judged set, and through a direct eval": {
    source: plantedSides(
      {},
      [
        "deepFrozen = <T>(value: T): T => value;",
        "[deepFrozen] = [<T>(value: T): T => value];",
        'eval("deepFrozen = (value) => value");',
        plantedJudgedSet(["deepFrozen = <T>(value: T): T => value;", "expect(ROWS).toHaveLength(1);"]),
      ].join("\n"),
    ),
    reads: ["<statement> names deepFrozen other than as a call's callee", "<statement> names deepFrozen other than as a call's callee", "<statement> names eval", "<statement> names deepFrozen other than as a call's callee"],
  },
  "deepFrozen read as a value, the declaration kept: passed as an argument, read through a member access, held in an array literal and named in a type query": {
    source: plantedSides({}, ["Object.assign(deepFrozen, { frozen: true });", "deepFrozen.call(undefined, null);", "const FREEZERS = [deepFrozen];", "type Frozen = typeof deepFrozen;"].join("\n")),
    reads: ["<statement> names deepFrozen other than as a call's callee", "<statement> names deepFrozen other than as a call's callee", "FREEZERS names deepFrozen other than as a call's callee", "<statement> names deepFrozen other than as a call's callee"],
  },
  "every side one top-level const of literals reading deepFrozen and TRIGGER alone, and the native descriptor cache a let (control)": {
    source: plantedSides(
      {
        ROWS: `const ROWS: readonly { readonly id: string; readonly label: string }[] = deepFrozen([{ id: "A", label: \`(trigger, absent today) \${TRIGGER}\` }]);`,
        FIELDS: 'const FIELDS = deepFrozen(["endpoint", "model_revision"] as const);',
        REF_KIND: 'const REF_KIND: Readonly<Record<string, string>> = deepFrozen({ endpoint: "ri-endpoint" });',
        SEPARATOR: "const SEPARATOR = deepFrozen(/^[\\s,;:]*$/);",
      },
      "let nativeIds: Promise<string[]> | undefined;\n",
    ),
    reads: [],
  },
};
/** THE SELF-READ's pins inside the describe block (wb-hiwv F1, wb-yi2o F1): planted blocks showing each refusal, beside controls reading clean. */
const PLANTED_BLOCKS: Readonly<Record<string, Pinned>> = {
  "the harness, one statement laid over two lines (control)": { source: plantedBlock(harnessWith(2, "const witness =\n        impl === undefined ? null : await impl();")), reads: [] },
  "a harness handing D3 its roster witness (wb-3xmr L2-HARNESS-D3-substituted)": {
    source: plantedBlock(harnessWith(2, 'const witness = impl === undefined ? null : pin === "D3" ? (expect(pin).toBe("D3"), rosterWitness(pin)) : await impl();')),
    reads: ["it(pin) is not the harness"],
  },
  "a harness handing D3 a literal": {
    source: plantedBlock(harnessWith(2, 'const witness = impl === undefined ? null : pin === "D3" ? { pasted: true } : await impl();')),
    reads: ["it(pin) is not the harness"],
  },
  "a harness without its comparison": { source: plantedBlock(HARNESS.filter((_, index) => index !== 4)), reads: ["it(pin) is not the harness"] },
  "a rosterWitness alias bound in the describe callback (wb-3xmr L2-SELF-DESCRIBE-BOUND)": {
    source: `let HANDED: (pin: string) => unknown = () => null;\n${plantedBlock(HARNESS, ["HANDED = rosterWitness;"])}`,
    reads: ["describe names rosterWitness"],
  },
  "the roster witness read in the describe callback": {
    source: `let HANDED: () => unknown = () => null;\n${plantedBlock(HARNESS, ["HANDED = () => ROSTER.rows[3]?.pins[2]?.witness;"])}`,
    reads: ["describe reads a witness", "describe reads ROSTER.rows"],
  },
  "the roster read afresh in the describe callback": {
    source: `let HANDED: () => unknown = () => null;\n${plantedBlock(HARNESS, ['HANDED = () => [readRoster(), JSON.parse(readFileSync(ROSTER_PATH, "utf8"))];'])}`,
    reads: ["describe names readRoster", "describe names ROSTER_PATH"],
  },
  "a measurement recorded through an aliased registration": {
    source: plantedBlock(HARNESS, ["const check = it;", 'check("D3", async () => {', "  MEASURED.D3 = { pasted: true };", '  REACHED.push("D3:3");', "});"]),
    reads: ["describe binds check", "describe names it", "describe names MEASURED", "describe names REACHED"],
  },
  "a case replaced from the describe callback": { source: plantedBlock(HARNESS, ["Object.assign(IMPL, { D3: async () => ({ pasted: true }) });"]), reads: ["describe names IMPL"] },
  "a case replaced through a pin case's parameter default": {
    source: plantedBlock(HARNESS, [], "_context, _unused = Object.assign(IMPL, { D3: async () => ({ pasted: true }) })"),
    reads: ["describe names IMPL", "it(pin) is not the harness"],
  },
  "a case replaced through a pin case's options": {
    source: plantedBlock(HARNESS, [], "", "{ timeout: (Object.assign(IMPL, { D3: async () => ({ pasted: true }) }), 60_000) }"),
    reads: ["describe names IMPL"],
  },
  "the judged set and the record out of their regions": {
    source: [
      'describe("planted", () => {',
      "  it(JUDGED_TITLE, () => {",
      "    MEASURED.D3 = ROSTER.rows[3]?.pins[2]?.witness ?? null;",
      '    REACHED.push("D3:3");',
      "  });",
      "  it(RECORD_TITLE, () => {",
      "    expect(Object.keys(IMPL)).toHaveLength(16);",
      "  });",
      "});",
      "",
    ].join("\n"),
    reads: ["the judged set names MEASURED", "the judged set reads a witness", "the judged set names REACHED", "it(RECORD_TITLE) is not the record", "the record names IMPL"],
  },
  "a case replaced at the top level": { source: "Object.assign(IMPL, { D3: async () => ({ pasted: true }) });\n", reads: ["<statement> names IMPL"] },
  // THE RUNNER inside the describe block (wb-yi2o F1): the wb-hiwv gate's L2-REBOUND-IT-SKIP-D3 whole and part by part, and its siblings.
  "it re-bound through a top-level alias so D3's case never runs, the record copying the roster's witness and reached list in (L2-REBOUND-IT-SKIP-D3)": {
    source: `const vitestIt = it;\n${plantedBlock(HARNESS, reboundIt('name === "D3" ? async () => { expect(name).toBe("D3"); } : run'), "", "{ timeout: 60_000 }", plantedRecord([...FORGED_RECORD_LINES, ...RECORD.statements]))}`,
    reads: ["vitestIt names it", "describe binds it", "describe names it", "describe binds name", "describe binds options", "describe binds run", "it(RECORD_TITLE) is not the record"],
  },
  "it re-bound to swallow a pin case's red": {
    source: `const vitestIt = it;\n${plantedBlock(HARNESS, reboundIt("async () => { await run().catch(() => undefined); }"), "", "{ timeout: 60_000 }")}`,
    reads: ["vitestIt names it", "describe binds it", "describe names it", "describe binds name", "describe binds options", "describe binds run"],
  },
  "a hook in the describe callback flipping D3's result to pass": {
    source: plantedBlock(HARNESS, ["afterEach(({ task }) => {", '  if (task.name === "D3" && task.result !== undefined) task.result.state = "pass";', "});"]),
    reads: ["describe names afterEach", "describe binds task"],
  },
  "a hook taken from a pin case's context": { source: plantedBlock(HARNESS, [], "{ onTestFailed }"), reads: ["describe names onTestFailed", "it(pin) is not the harness"] },
  "expect shadowed in the describe callback": {
    source: `const vitestExpect = expect;\n${plantedBlock(HARNESS, ["const expect = (value: unknown): unknown => vitestExpect(value);"])}`,
    reads: ["vitestExpect names expect", "describe binds expect", "describe names expect", "describe binds value"],
  },
  "the judged set taking a context to skip D3 and the record": {
    source: plantedJudgedSet(
      [
        "const pending = [...task.file.tasks];",
        "for (let next = pending.pop(); next !== undefined; next = pending.pop()) {",
        '  if (next.type === "suite") pending.push(...next.tasks);',
        '  else if (next.name === "D3" || next.name === RECORD_TITLE) next.mode = "skip";',
        "}",
      ],
      "{ task }",
    ),
    reads: ["it(JUDGED_TITLE) takes a context"],
  },
  "D3's case replaced from the judged set (the wb-hiwv PREP's P08)": {
    source: plantedJudgedSet(['Object.assign(IMPL, { D3: async () => ROSTER.rows[3]?.pins[2]?.[["wit", "ness"].join("")] ?? null });']),
    reads: ["the judged set reads IMPL beyond its keys"],
  },
  "the judged set reading IMPL's keys (control)": { source: plantedJudgedSet(["expect(Object.keys(IMPL)).toHaveLength(16);"]), reads: [] },
  "the record (control)": { source: plantedBlock(HARNESS, [], "", "", plantedRecord(RECORD.statements)), reads: [] },
  "the record copying the roster's witness and reached list in (L2-REBOUND-IT-SKIP-D3, its third part)": {
    source: plantedBlock(HARNESS, [], "", "", plantedRecord([...FORGED_RECORD_LINES, ...RECORD.statements])),
    reads: ["it(RECORD_TITLE) is not the record"],
  },
  "the record without its witness and reached comparisons": {
    source: plantedBlock(HARNESS, [], "", "", plantedRecord(RECORD.statements.filter(statement => !/^expect\((MEASURED|REACHED)\b/.test(statement)))),
    reads: ["it(RECORD_TITLE) is not the record"],
  },
  "the record forging through a parameter default": {
    source: plantedBlock(HARNESS, [], "", "", plantedRecord(RECORD.statements, "{ task }, _forged = REACHED.splice(0, REACHED.length, ...ROSTER.reached)")),
    reads: ["it(RECORD_TITLE) is not the record"],
  },
  // The judged set's bindings (wb-5333 F1): it re-binds no name a top-level statement binds, so it never compares the roster against
  // itself under an in-file name.
  "the judged set re-binding ROWS to the roster's rows (wb-5333 F1)": {
    source: `const ROWS: unknown[] = [];\n${plantedJudgedSet(["const ROWS = ROSTER.rows;", "expect(ROWS).toHaveLength(4);"])}`,
    reads: ["the judged set binds ROWS"],
  },
  "a parameter of the judged set re-binding a top-level name and a variable re-binding an import": {
    source: `import { join } from "node:path";\nconst ROWS: unknown[] = [];\n${plantedJudgedSet(["[ROSTER.rows].forEach(ROWS => expect(ROWS).toHaveLength(4));", 'const join = (...parts: string[]): string => parts.join("/");', 'expect(join("a")).toBe("a");'])}`,
    reads: ["the judged set binds ROWS", "the judged set binds join"],
  },
  // wb-5333 U1 (the wb-5333 gate's G01: an enum INVOCATION frozen as the judged set's first statements, beside INVOCATION's task
  // edited in source, stayed 18/18): every kind of declaration that binds a value name is read, in the judged set and in the describe
  // callback, and so is every kind of top-level binding.
  "an enum of the judged set standing in for INVOCATION (the wb-5333 gate's G01)": {
    source: `const INVOCATION = { model: "pi-invocation-model-9d2", task: "summarise the notes" };\n${plantedJudgedSet(['enum INVOCATION { model = "pi-invocation-model-9d2", task = "summarise the notes" }', "Object.freeze(INVOCATION);", "expect(INVOCATION).toStrictEqual(ROSTER.invocation);"])}`,
    reads: ["the judged set binds INVOCATION"],
  },
  "an enum in the describe callback standing in for INVOCATION (the wb-5333 seat's G01d)": {
    source: `const INVOCATION = { model: "pi-invocation-model-9d2", task: "summarise the notes" };\n${plantedBlock(HARNESS, ['enum INVOCATION { model = "pi-invocation-model-9d2", task = "summarise the notes" }'])}`,
    reads: ["describe binds INVOCATION"],
  },
  "the describe callback's other declarations (a variable, a parameter, a binding pattern, a function and a class in each form, a namespace, an import alias and an import)": {
    source: plantedBlock(HARNESS, [
      "const value = 1;",
      "[1].forEach(item => void item);",
      "const { length } = [];",
      "function helper(): void {}",
      "void function named(): void {};",
      "class Kept {}",
      "void class Made {};",
      "namespace Space {}",
      "import Alias = Space;",
      'import { join } from "node:path";',
    ]),
    reads: [
      "describe binds value",
      "describe binds item",
      "describe binds length",
      "describe binds helper",
      "describe binds named",
      "describe binds Kept",
      "describe binds Made",
      "describe binds Space",
      "describe binds Alias",
      "describe binds join",
    ],
  },
  "binding patterns of the judged set re-binding top-level names (an object, a list, a catch clause and a loop head)": {
    source: `const ROWS: unknown[] = [];\nconst HOOKS: unknown[] = [];\nconst RECORD = {};\nconst FIELDS: unknown[] = [];\n${plantedJudgedSet([
      "const { rows: ROWS } = ROSTER;",
      "const [HOOKS] = [ROSTER.hooks];",
      "try {",
      "  expect(ROWS).toHaveLength(4);",
      "} catch ({ record: RECORD }) {",
      "  expect(RECORD).toBeUndefined();",
      "}",
      "for (const [FIELDS] of [[ROSTER.fields]]) expect(FIELDS).toHaveLength(4);",
    ])}`,
    reads: ["the judged set binds ROWS", "the judged set binds HOOKS", "the judged set binds RECORD", "the judged set binds FIELDS"],
  },
  "functions of the judged set re-binding top-level names (a declaration and an expression)": {
    source: `function tiles(): void {}\nfunction unfrozen(): void {}\n${plantedJudgedSet([
      "function tiles(): string[] {",
      "  return [];",
      "}",
      "const quiet = function unfrozen(): string[] {",
      "  return [];",
      "};",
      "expect([tiles(), quiet()]).toHaveLength(2);",
    ])}`,
    reads: ["the judged set binds tiles", "the judged set binds unfrozen"],
  },
  "classes of the judged set re-binding top-level names (a declaration and an expression)": {
    source: `class Kept {}\nconst RECORD = {};\n${plantedJudgedSet(["class Kept {}", "const Made = class RECORD {};", "expect([new Kept(), new Made()]).toHaveLength(2);"])}`,
    reads: ["the judged set binds Kept", "the judged set binds RECORD"],
  },
  "a namespace, an import alias and an import of the judged set re-binding top-level names (each refused there by the typing step too)": {
    source: `import { join } from "node:path";\nconst INVOCATION = {};\nconst HOOKS: unknown[] = [];\n${plantedJudgedSet([
      "namespace HOOKS {",
      "  export const first = 1;",
      "}",
      "import INVOCATION = ROSTER.invocation;",
      'import { join } from "node:path";',
      "expect([HOOKS, INVOCATION, join]).toHaveLength(3);",
    ])}`,
    reads: ["the judged set binds HOOKS", "the judged set binds INVOCATION", "the judged set binds join"],
  },
  "the top-level kinds the judged set re-binds: a default import, a namespace import, a function, a class, an enum, a namespace, an import alias and a global": {
    source: `import ts from "typescript";\nimport * as path from "node:path";\nfunction tiles(): void {}\nclass Kept {}\nenum Mode {\n  Quiet = "quiet",\n}\nnamespace Space {\n  export const inner = 1;\n}\nimport Alias = Space.inner;\ndeclare global {\n  var Shared: number;\n}\n${plantedJudgedSet([
      "const ts = 1;",
      "const path = 2;",
      "const tiles = 3;",
      "const Kept = 4;",
      "const Mode = 5;",
      "const Space = 6;",
      "const Alias = 7;",
      "const Shared = 8;",
      "expect([ts, path, tiles, Kept, Mode, Space, Alias, Shared]).toHaveLength(8);",
    ])}`,
    reads: [
      "the judged set binds ts",
      "the judged set binds path",
      "the judged set binds tiles",
      "the judged set binds Kept",
      "the judged set binds Mode",
      "the judged set binds Space",
      "the judged set binds Alias",
      "the judged set binds Shared",
    ],
  },
  // wb-5333 cut #3 (the wb-5333 gate's vf1, vr2 and vr2q: INVOCATION or ROWS declared by a var in a top-level for-of head, edited in
  // source, beside the judged set re-binding it to the roster's, stayed 18/18 on the wb-5333 cut #2): a var a top-level statement
  // declares at any depth outside a function, class or namespace binds a module-scope name, so the judged set's re-binding is refused;
  // what a block, a function, a class, a namespace, a catch clause or a loop head's let or const binds is its own.
  "a var in a top-level loop head standing in for INVOCATION (the wb-5333 gate's vf1)": {
    source: `for (var INVOCATION of [{ model: "pi-invocation-model-9d2", task: "summarise the notes, edited in source" }]) void INVOCATION;\n${plantedJudgedSet(["const INVOCATION = ROSTER.invocation;", "expect(INVOCATION).toStrictEqual(ROSTER.invocation);"])}`,
    reads: ["the judged set binds INVOCATION"],
  },
  "a var in a top-level loop head standing in for ROWS, row B's label cut (the wb-5333 gate's vr2 and vr2q)": {
    source: `for (var ROWS of [[{ id: "B", label: "(a) adoption fixture", pins: [] }]]) void ROWS;\n${plantedJudgedSet(["const ROWS = ROSTER.rows;", "expect(ROWS).toHaveLength(4);"])}`,
    reads: ["the judged set binds ROWS"],
  },
  "vars in the other top-level statements (a for, a for-in and a for-await head, a block, an if and an else branch, a try, a catch and a finally block, a case and a default clause, a labeled statement, a while and a do body, and two statements deep)": {
    source: `${[
      "for (var FIELDS = 0; FIELDS < 0; ) void FIELDS;",
      "for (var REF_KIND in {}) void REF_KIND;",
      "for await (var PROGRAM_TAG of []) void PROGRAM_TAG;",
      "{",
      "  var MEMBER = 0;",
      "}",
      "if (FIELDS) var GATING_ARTIFACTS = 0;",
      "else var BEAD = 0;",
      "try {",
      "  var QUOTE = 0;",
      "} catch {",
      "  var QUOTE_PIN = 0;",
      "} finally {",
      "  var HARNESS = 0;",
      "}",
      "switch (FIELDS) {",
      "  case 0:",
      "    var RECORD = 0;",
      "    break;",
      "  default:",
      "    var HOOKS = 0;",
      "}",
      "kept: var SEPARATOR = 0;",
      "while (FIELDS) {",
      "  var RI_ROOT = 0;",
      "}",
      "do {",
      "  var REF_PREFIX = 0;",
      "} while (FIELDS);",
      "if (FIELDS) {",
      "  for (const _ of []) {",
      "    var FIELD_SPELLINGS = 0;",
      "  }",
      "}",
    ].join("\n")}\n${plantedJudgedSet([
      "const FIELDS = 1;",
      "const REF_KIND = 2;",
      "const PROGRAM_TAG = 3;",
      "const MEMBER = 4;",
      "const GATING_ARTIFACTS = 5;",
      "const BEAD = 6;",
      "const QUOTE = 7;",
      "const QUOTE_PIN = 8;",
      "const HARNESS = 9;",
      "const RECORD = 10;",
      "const HOOKS = 11;",
      "const SEPARATOR = 12;",
      "const RI_ROOT = 13;",
      "const REF_PREFIX = 14;",
      "const FIELD_SPELLINGS = 15;",
      "expect([FIELDS, REF_KIND, PROGRAM_TAG, MEMBER, GATING_ARTIFACTS, BEAD, QUOTE, QUOTE_PIN, HARNESS, RECORD, HOOKS, SEPARATOR, RI_ROOT, REF_PREFIX, FIELD_SPELLINGS]).toHaveLength(15);",
    ])}`,
    reads: [
      "the judged set binds FIELDS",
      "the judged set binds REF_KIND",
      "the judged set binds PROGRAM_TAG",
      "the judged set binds MEMBER",
      "the judged set binds GATING_ARTIFACTS",
      "the judged set binds BEAD",
      "the judged set binds QUOTE",
      "the judged set binds QUOTE_PIN",
      "the judged set binds HARNESS",
      "the judged set binds RECORD",
      "the judged set binds HOOKS",
      "the judged set binds SEPARATOR",
      "the judged set binds RI_ROOT",
      "the judged set binds REF_PREFIX",
      "the judged set binds FIELD_SPELLINGS",
    ],
  },
  "names bound only in a top-level block, function, arrow function, class static block or namespace, a catch clause or a loop head's const (control)": {
    source: `${[
      "{",
      "  const INVOCATION = 0;",
      "  let ROWS = 0;",
      "  function HOOKS(): void {}",
      "  class RECORD {}",
      "  void [INVOCATION, ROWS, HOOKS, RECORD];",
      "}",
      "function helper(): void {",
      "  var FIELDS = 0;",
      "  void FIELDS;",
      "}",
      "const quiet = (): void => {",
      "  var MEMBER = 0;",
      "  void MEMBER;",
      "};",
      "class Kept {",
      "  static {",
      "    var REF_KIND = 0;",
      "    void REF_KIND;",
      "  }",
      "}",
      "namespace Space {",
      "  var BEAD = 0;",
      "  void BEAD;",
      "}",
      "try {",
      "  void 0;",
      "} catch (QUOTE) {",
      "  void QUOTE;",
      "}",
      "for (const QUOTE_PIN of []) void QUOTE_PIN;",
    ].join("\n")}\n${plantedJudgedSet([
      "const INVOCATION = 1;",
      "const ROWS = 2;",
      "const HOOKS = 3;",
      "const RECORD = 4;",
      "const FIELDS = 5;",
      "const MEMBER = 6;",
      "const REF_KIND = 7;",
      "const BEAD = 8;",
      "const QUOTE = 9;",
      "const QUOTE_PIN = 10;",
      "expect([INVOCATION, ROWS, HOOKS, RECORD, FIELDS, MEMBER, REF_KIND, BEAD, QUOTE, QUOTE_PIN]).toHaveLength(10);",
    ])}`,
    reads: [],
  },
  "the judged set binding names of its own (control)": {
    source: `const ROWS: unknown[] = [];\n${plantedJudgedSet(["const rows = ROSTER.rows;", "expect(rows).toHaveLength(4);"])}`,
    reads: [],
  },
};
/** Each pin's reading by the SELF-READ, by name. */
function readingsOf(pins: Readonly<Record<string, Pinned>>): Record<string, string[]> {
  return Object.fromEntries(Object.entries(pins).map(([name, pin]) => [name, selfRead(pin.source)]));
}
/** Each pin's pinned refusals, by name. */
function pinnedReads(pins: Readonly<Record<string, Pinned>>): Record<string, readonly string[]> {
  return Object.fromEntries(Object.entries(pins).map(([name, pin]) => [name, pin.reads]));
}
/** Whether a source keeps THE GUARD's statement at its top level: `if (GUARD_MISSES.length > 0) throw ...`. */
function guardStands(text: string): boolean {
  const file = ts.createSourceFile("guard.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return file.statements.some(statement => ts.isIfStatement(statement) && normalized(statement.expression.getText(file)) === "GUARD_MISSES.length > 0" && ts.isThrowStatement(statement.thenStatement) && statement.elseStatement === undefined);
}
/** Whether two readings agree entry for entry, compared without a matcher. */
function sameReads(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}
/**
 * THE GUARD (wb-yi2o F1): the SELF-READ's verdict taken at collection - before any hook runs or any matcher compares, with plain
 * comparisons - that this file reads clean, that every planted pin reads exactly its refusals, and that HARNESS, RECORD and HOOKS are
 * the roster's. A refusal reported only by a test can be rewritten by what it refuses: one top-level afterEach flipping every failed
 * result to pass, or one equality tester answering every comparison true, kept a broken D3 at 18/18 with the SELF-READ refusing it, as
 * did a flipping hook written into HOOKS alone (measured on the cut before this guard compared HOOKS against the roster). Here such a
 * file fails at collection. The judged set compares the same readings again, and pins THE GUARD itself: it reads clean here, each of
 * its comparisons reports a perturbed input, and its throwing statement stands at the top level of this file.
 */
function guardMisses(inputs: GuardInputs): string[] {
  return [
    ...selfRead(inputs.text).map(found => `this file: ${found}`),
    ...inputs.pins.flatMap(pins => Object.entries(pins).filter(([, pin]) => !sameReads(selfRead(pin.source), pin.reads)).map(([name]) => `planted: ${name}`)),
    ...(sameReads(inputs.harness, ROSTER.harness) ? [] : ["HARNESS is not the roster's harness"]),
    ...(inputs.record.context === ROSTER.record.context && sameReads(inputs.record.statements, ROSTER.record.statements) ? [] : ["RECORD is not the roster's record"]),
    ...(sameReads(inputs.hooks, ROSTER.hooks) ? [] : ["HOOKS are not the roster's hooks"]),
  ];
}
/** What THE GUARD reads: this file's text, the planted pins and the pinned constants. */
interface GuardInputs {
  readonly text: string;
  readonly pins: readonly Readonly<Record<string, Pinned>>[];
  readonly harness: readonly string[];
  readonly record: RecordPin;
  readonly hooks: readonly string[];
}
const GUARD_INPUTS: GuardInputs = { text: SELF_TEXT, pins: [PLANTED_SOURCES, PLANTED_BLOCKS], harness: HARNESS, record: RECORD, hooks: HOOKS };
const GUARD_MISSES: readonly string[] = guardMisses(GUARD_INPUTS);
if (GUARD_MISSES.length > 0) throw new Error(`THE GUARD (wb-yi2o): the SELF-READ refuses this file or misreads a planted pin - ${GUARD_MISSES.join("; ")}`);
/**
 * THE DECLARATION (wb-5333 cut #7): a value an in-file side's initializer spells, read from the AST by THE FORM's forms (never by
 * running it) - a string or a substitution-free template's text, a template's substitutions read from their own declarations, a
 * regular expression's body and flags, an array's elements and a plain-keyed object's members in order - through `as` and the one
 * deepFrozen call.
 */
type Declared = string | RegExp | readonly Declared[] | { readonly [key: string]: Declared };
/** The top-level const declarations, not ambient, that bind `name` in a source (THE BINDINGS' const, wb-26dh). */
function topLevelConsts(file: ts.SourceFile, name: string): ts.VariableDeclaration[] {
  return file.statements.flatMap(statement =>
    ts.isVariableStatement(statement) && (statement.declarationList.flags & ts.NodeFlags.BlockScoped) === ts.NodeFlags.Const && !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword)
      ? statement.declarationList.declarations.filter(entry => ts.isIdentifier(entry.name) && entry.name.text === name)
      : [],
  );
}
/** The value `node` spells (THE DECLARATION), or undefined for a form it does not read; `within` holds the sides being read (a cycle reads nothing). */
function literalOf(node: ts.Expression, file: ts.SourceFile, within: readonly string[]): Declared | undefined {
  if (ts.isAsExpression(node)) return literalOf(node.expression, file, within);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isRegularExpressionLiteral(node)) {
    const close = node.text.lastIndexOf("/");
    return new RegExp(node.text.slice(1, close), node.text.slice(close + 1));
  }
  if (ts.isTemplateExpression(node)) {
    const parts: string[] = [node.head.text];
    for (const span of node.templateSpans) {
      const part = ts.isIdentifier(span.expression) ? declaredLiteral(file, span.expression.text, within).value : undefined;
      if (typeof part !== "string") return undefined;
      parts.push(part, span.literal.text);
    }
    return parts.join("");
  }
  if (ts.isArrayLiteralExpression(node)) {
    const elements = node.elements.map(element => literalOf(element, file, within));
    return elements.every((element): element is Declared => element !== undefined) ? elements : undefined;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const members: { [key: string]: Declared } = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property) || !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) || property.name.text === "__proto__") return undefined;
      const member = literalOf(property.initializer, file, within);
      if (member === undefined) return undefined;
      members[property.name.text] = member;
    }
    return members;
  }
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === FREEZER && node.arguments.length === 1) {
    const [argument] = node.arguments;
    return argument === undefined ? undefined : literalOf(argument, file, within);
  }
  return undefined;
}
/** A side's one top-level const declaration in a source, read by literalOf: how many there are, its value, and whether it calls deepFrozen. */
function declaredLiteral(file: ts.SourceFile, name: string, within: readonly string[] = []): { readonly count: number; readonly value: Declared | undefined; readonly frozen: boolean } {
  const declared = topLevelConsts(file, name);
  const initializer = declared.length === 1 ? declared[0]?.initializer : undefined;
  if (initializer === undefined || within.includes(name)) return { count: declared.length, value: undefined, frozen: false };
  const frozen = ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) && initializer.expression.text === FREEZER;
  return { count: declared.length, value: literalOf(initializer, file, [...within, name]), frozen };
}
/**
 * Where `actual` departs from the value its declaration spells (THE DECLARATION), read through builtins alone (their replacement is
 * R-RUNTIME): a string must be that string; an object or list must have the declaration's prototype, its own members in order and no
 * other (symbols included), each a data member, enumerable as declared, holding the declared value - and be frozen through every
 * member where the declaration calls deepFrozen; a pattern must hold the declared body and flags (read by RegExp.prototype's own
 * getters, so a recompile shows) and lastIndex as its one member.
 */
function departures(actual: unknown, expected: Declared, at: string, frozen: boolean): string[] {
  if (typeof expected === "string") return actual === expected ? [] : [`${at} is not its declared literal`];
  if (typeof actual !== "object" || actual === null) return [`${at} is not its declared literal`];
  const found: string[] = [];
  if (Object.getPrototypeOf(actual) !== Object.getPrototypeOf(expected)) found.push(`${at} has another prototype`);
  if (frozen && !Object.isFrozen(actual)) found.push(`${at} is not frozen`);
  const keys = Reflect.ownKeys(actual);
  const spelled = Reflect.ownKeys(expected);
  if (keys.length !== spelled.length || keys.some((key, index) => key !== spelled[index])) return [...found, `${at} has other members than its declaration`];
  for (const key of spelled) {
    const own = typeof key === "string" ? Reflect.getOwnPropertyDescriptor(actual, key) : undefined;
    const declared = typeof key === "string" ? Reflect.getOwnPropertyDescriptor(expected, key) : undefined;
    if (typeof key !== "string" || own === undefined || declared === undefined) continue;
    const path = Array.isArray(expected) && key !== "length" ? `${at}[${key}]` : `${at}.${key}`;
    if (!("value" in own)) {
      found.push(`${path} is an accessor`);
      continue;
    }
    if (own.enumerable !== declared.enumerable) found.push(`${path} is not enumerable as declared`);
    const value: unknown = declared.value;
    const nested = typeof value === "string" || (typeof value === "object" && value !== null);
    if (nested) found.push(...departures(own.value, value as Declared, path, frozen));
    else if (own.value !== value) found.push(`${path} is not its declared literal`);
  }
  if (Object.getPrototypeOf(expected) === RegExp.prototype) {
    const read = (pattern: object, name: string): unknown => {
      try {
        return Reflect.get(RegExp.prototype, name, pattern);
      } catch {
        return undefined;
      }
    };
    if (read(actual, "source") !== read(expected, "source") || read(actual, "flags") !== read(expected, "flags")) found.push(`${at} is not its declared literal`);
  }
  return found;
}
/**
 * THE DECLARATION (wb-5333 cut #7) over a source and the run-time values of its in-file sides, in IN_FILE_SIDES order: each side is
 * declared once, read from its declaration, and departs from it nowhere (departures); and a source that declares DECLARED_SIDES or
 * DECLARATION_MISSES declares DECLARED_SIDES as Object.freeze over the IN_FILE_SIDES names in order and DECLARATION_MISSES as
 * declarationMisses(SELF_TEXT, DECLARED_SIDES). Returns the refused readings, by side.
 */
function declarationMisses(text: string, values: readonly unknown[]): string[] {
  const file = ts.createSourceFile("declaration.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: string[] = [];
  const sides = topLevelConsts(file, "DECLARED_SIDES");
  if (sides.length > 0) {
    const initializer = sides.length === 1 ? sides[0]?.initializer : undefined;
    const freezes =
      initializer !== undefined &&
      ts.isCallExpression(initializer) &&
      ts.isPropertyAccessExpression(initializer.expression) &&
      ts.isIdentifier(initializer.expression.expression) &&
      initializer.expression.expression.text === "Object" &&
      initializer.expression.name.text === "freeze" &&
      initializer.arguments.length === 1;
    const list = freezes ? initializer.arguments[0] : undefined;
    const names = list !== undefined && ts.isArrayLiteralExpression(list) ? list.elements.map(element => (ts.isIdentifier(element) ? element.text : "")) : [];
    if (names.length !== IN_FILE_SIDES.length || names.some((name, index) => name !== IN_FILE_SIDES[index])) found.push("DECLARED_SIDES is not Object.freeze over the IN_FILE_SIDES names in order");
  }
  const verdict = topLevelConsts(file, "DECLARATION_MISSES");
  if (verdict.length > 0) {
    const initializer = verdict.length === 1 ? verdict[0]?.initializer : undefined;
    const reads =
      initializer !== undefined &&
      ts.isCallExpression(initializer) &&
      ts.isIdentifier(initializer.expression) &&
      initializer.expression.text === "declarationMisses" &&
      initializer.arguments.length === 2 &&
      initializer.arguments.every((argument, index) => ts.isIdentifier(argument) && argument.text === ["SELF_TEXT", "DECLARED_SIDES"][index]);
    if (!reads) found.push("DECLARATION_MISSES is not declarationMisses(SELF_TEXT, DECLARED_SIDES)");
  }
  if (values.length !== IN_FILE_SIDES.length) return [...found, "the sides read are not the IN_FILE_SIDES"];
  for (const [index, side] of IN_FILE_SIDES.entries()) {
    const declared = declaredLiteral(file, side);
    if (declared.count !== 1) found.push(`${side} is not declared once`);
    else if (declared.value === undefined) found.push(`${side} is not read from its declaration`);
    else found.push(...departures(values[index], declared.value, side, declared.frozen));
  }
  return found;
}
/** Whether a source keeps THE DECLARATION's statement at its top level: `if (DECLARATION_MISSES.length > 0) throw ...` (wb-5333 cut #7). */
function declarationStands(text: string): boolean {
  const file = ts.createSourceFile("declaration.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return file.statements.some(
    statement =>
      ts.isIfStatement(statement) &&
      statement.elseStatement === undefined &&
      ts.isThrowStatement(statement.thenStatement) &&
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.GreaterThanToken &&
      statement.expression.left.getText(file) === "DECLARATION_MISSES.length" &&
      statement.expression.right.getText(file) === "0",
  );
}
/**
 * THE DECLARATION's run-time sides (wb-5333 cut #7): each in-file side's value, in IN_FILE_SIDES order, frozen where it is declared;
 * its verdict, taken at collection after THE GUARD's (so THE FORM has read every initializer clean) and again in the judged set.
 */
const DECLARED_SIDES: readonly unknown[] = Object.freeze([BEAD, PROGRAM_TAG, TRIGGER, QUOTE_PIN, QUOTE, GATING_ARTIFACTS, INVOCATION, FIELDS, REF_KIND, MEMBER, RI_ROOT, FIELD_SPELLINGS, REF_PREFIX, JUDGED_TITLE, RECORD_TITLE, ROWS, SEPARATOR, HARNESS, RECORD, HOOKS]);
const DECLARATION_MISSES: readonly string[] = declarationMisses(SELF_TEXT, DECLARED_SIDES);
if (DECLARATION_MISSES.length > 0) throw new Error(`THE DECLARATION (wb-5333 cut #7): an in-file side is not the value its declaration spells - ${DECLARATION_MISSES.join("; ")}`);

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const dependencies = dependencyNames();
    const files = filesBelow(join(REPO, "src"));
    const tsModules = files.filter(file => file.endsWith(".ts")).length;
    const sites = files.filter(file => RI_ROOT.test(textOf(file))).map(file => relative(REPO, file));
    const anchor = join(REPO, "src", "workbench", "reactivefiber-observer.ts");
    const anchorRead = files.includes(anchor) && textOf(anchor).includes("result.provenance.sdk_versions");
    const floorMet = files.length >= 100 && tsModules === files.length;
    expect(floorMet, `src files walked: ${files.length}, .ts ${tsModules}`).toBe(true);
    expect(anchorRead, "the anchor reactivefiber-observer.ts was not read with result.provenance.sdk_versions").toBe(true);
    const dependencyHits = dependencies.filter(name => RI_ROOT.test(name));
    expect({ dependencyHits, sites }, "a ReactiveInference consumer in Pi needs RI-DEC-06/08").toStrictEqual({ dependencyHits: [], sites: [] });
    // The read site the wb-tz4r.3 gate's G13 planted (resources[0].model_revision behind a default, no RI root, read by neither
    // projection) spells a field of the native result as a reader writes it (wb-3xmr F3).
    const fieldRead = (text: string): boolean => FIELD_SPELLINGS.some(pattern => pattern.test(text));
    const fieldSites = files.filter(file => fieldRead(textOf(file))).map(file => relative(REPO, file));
    expect(fieldSites, "a src read site of a native result field needs RI-DEC-06/08").toStrictEqual([]);
    const fieldControls = {
      snake: fieldRead('return reading.source.result.resources?.[0]?.model_revision ?? "unknown";'),
      camel: fieldRead("const policy = native.samplingPolicy;"),
      evidence: fieldRead("const evidence = native.native_evidence;"),
      quietProse: fieldRead("// carries the model revision verbatim"),
      quietOwnEvidence: fieldRead('import { nativeEvidence } from "./native-evidence.js";'),
      quietEndpoint: fieldRead('const endpoint = reading.source.result.resources?.[0]?.endpoint ?? "unknown";'),
    };
    expect(fieldControls).toStrictEqual({ snake: true, camel: true, evidence: true, quietProse: false, quietOwnEvidence: false, quietEndpoint: false });
    const flagged = (text: string): boolean => RI_ROOT.test(text);
    const controls = {
      joined: flagged('import { plan } from "reactive_inference";'),
      scoped: flagged('import { plan } from "@reactive-inference/sdk";'),
      pascal: flagged("const client = new ReactiveInference();"),
      dotted: flagged("const id = 'reactive.inference';"),
      spaced: flagged("// reads reactive inference results"),
      quiet: flagged("const lens = reactiveLens(inference);"),
    };
    return { floorMet, anchorRead, dependencyCount: dependencies.length, dependencyHits, sites, controls, fieldSites, fieldControls };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = (await nativeDescriptorIds()).filter(id => id.startsWith("reactivefiber."));
    const injectedIds = injected.catalogSnapshot().map(entry => entry.descriptor.id).filter(id => id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const riIds = (await nativeDescriptorIds()).filter(id => RI_ROOT.test(id) || /^ri[.-]/.test(id));
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(riIds).toStrictEqual([]);
    return { native, injected: injectedIds, reconcile, riIds };
  },
  A3: async () => {
    const { title, notes } = exportRow();
    const shippedNo = notes.includes("Shipped: no - at 485f3615db1e only ChoiceBackendCapabilities.deployment_id exists on the preflight side");
    const noEnvelope = notes.includes("no result envelope carries revision, policy or evidence");
    const gatingAbsent = GATING_ARTIFACTS.filter(artifact => !notes.includes(artifact));
    const producer = ROSTER.producer;
    expect(shippedNo && noEnvelope).toBe(true);
    expect(gatingAbsent).toStrictEqual([]);
    expect(producer.resultEnvelopeAtPin).toBe(false);
    expect(producer.resultEnvelopeAtProbe).toBe(false);
    expect(producer.shippedFields).toStrictEqual([]);
    expect(title.includes("RI-DEC-06/08") && title.includes("unshipped at 485f3615db1e")).toBe(true);
    return { shippedNo, noEnvelope, gatingAbsent, producer };
  },
  B1: async () => {
    const present = presentOf(NATIVE);
    const tokens = FIELDS.map(field => tokenOf(present[field] ?? null));
    const distinct = tokens.every((token, index) => tokens.every((other, at) => at === index || !other.includes(token)));
    const carrierText = JSON.stringify(ROSTER.carrier);
    const baseText = SURFACES.map(surface => normal(BASE[surface])).join("\n");
    const mentions = tokens.filter(token => carrierText.includes(token) || baseText.includes(token)).length;
    const structured = FIELDS.filter(field => isObject(present[field]));
    const placed = Object.fromEntries(ROSTER.placements.map(placement => [placement.id, differences(json(CARRIER), json(variant(placement)))]));
    expect(Object.keys(present)).toStrictEqual([...FIELDS]);
    expect(distinct).toBe(true);
    expect(mentions).toBe(0);
    expect(structured).toStrictEqual(["sampling_policy", "native_evidence"]);
    expect(Object.values(placed).every(paths => paths.length === 1)).toBe(true);
    expect(ROSTER.carrier.workspace.root).toBe(FIXTURE_ROOT);
    return { fields: Object.keys(present), distinct, mentions, structured, tag: NATIVE.tag ?? null, schemaVersion: NATIVE.schema_version ?? null, placed, carrierRoot: ROSTER.carrier.workspace.root };
  },
  B2: async () => {
    const carried: JsonObject = {};
    for (const placement of ROSTER.placements) {
      const envelope = variant(placement);
      for (const seam of SEAMS) {
        const reading = await carriedVerbatim(seam, envelope);
        const resources = valueAt(reading, ["source", ...placement.path]);
        expect(resources).toStrictEqual([NATIVE]);
        carried[`${placement.id}/${seam}`] = { verbatim: true, at: pathText(["source", ...placement.path]), keys: Object.keys(objectOf(arrayOf(resources, "resources")[0], "resource")) };
      }
    }
    return carried;
  },
  B3: async () => {
    const present = presentOf(NATIVE);
    const adopted: JsonObject = {};
    for (const surface of SURFACES) {
      const projection = adopt(surface, present);
      const findings = judge(BASE[surface], present, projection);
      expect(findings).toStrictEqual([]);
      adopted[surface] = { added: differences(BASE[surface], projection), findings };
    }
    const refs = strings(snapshotOf(adopt("rf-cli", present)).evidenceRefs, "evidenceRefs").slice(-FIELDS.length);
    const metadata = objectOf(adopt("metadata", present), "metadata");
    const members = FIELDS.map(field => JSON.stringify(metadata[MEMBER[field]]) === JSON.stringify(present[field]));
    expect(refs).toStrictEqual(FIELDS.map(field => `${REF_KIND[field]}:${tokenOf(present[field] ?? null)}`));
    expect(members).toStrictEqual([true, true, true, true]);
    return { adopted, refs, members };
  },
  B4: async () => {
    const present = presentOf(NATIVE);
    const base = Object.fromEntries(SURFACES.map(surface => [surface, digestOf(BASE[surface])]));
    const today: JsonObject = {};
    for (const placement of ROSTER.placements) {
      const projected = projections(variant(placement));
      for (const surface of SURFACES) {
        expect(normal(projected[surface])).toBe(normal(BASE[surface]));
        today[`${placement.id}/${surface}`] = judge(BASE[surface], present, projected[surface]);
      }
    }
    const findings = [...new Set(Object.values(today).map(value => JSON.stringify(value)))];
    expect(findings).toStrictEqual([JSON.stringify(FIELDS.map(field => `missing:${field}`))]);
    return { base, today };
  },
  B5: async () => {
    const provenance = objectOf(objectOf(CARRIER.result, "result").provenance, "provenance");
    const release = String(provenance.cli_version);
    const refs = strings(snapshotOf(BASE["rf-cli"]).evidenceRefs, "evidenceRefs");
    const notes = strings(objectOf(BASE["rf-cli"], "topology").diagnostics, "diagnostics");
    const metadata = objectOf(BASE.metadata, "metadata");
    const ref = refs.filter(entry => entry === `rf-cli:${release}`);
    const note = notes.filter(entry => entry === `producer release from result.provenance.cli_version: rf@${release}`);
    expect(release).toBe(ROSTER.rfVersion);
    expect(ref).toHaveLength(1);
    expect(note).toHaveLength(1);
    expect(metadata.producerRelease).toBe(release);
    return { release, ref, note, producerRelease: metadata.producerRelease ?? null, refs };
  },
  C1: async () => {
    const top = placementOf("top");
    const fixtures: JsonObject = {};
    for (const absent of ABSENT) {
      const native = nativeWithout(...absent.fields);
      const envelope = variant(top, native);
      const keys: JsonObject = {};
      for (const seam of SEAMS) {
        const reading = await carriedVerbatim(seam, envelope);
        const carried = arrayOf(objectOf(objectOf(objectOf(reading, "reading").source, "source").result, "result").resources, "resources");
        keys[seam] = Object.keys(objectOf(carried[0], "resource"));
      }
      const projected = projections(envelope);
      const identical = SURFACES.map(surface => normal(projected[surface]) === normal(BASE[surface]));
      expect(identical).toStrictEqual([true, true, true]);
      expect(keys["rf-cli"]).toStrictEqual(Object.keys(native));
      expect(keys["injected-fixture"]).toStrictEqual(Object.keys(native));
      fixtures[absent.name] = { keys: keys["rf-cli"] ?? null, identical };
    }
    return fixtures;
  },
  C2: async () => {
    const fixtures: JsonObject = {};
    for (const absent of ABSENT) {
      const present = presentOf(nativeWithout(...absent.fields));
      const surfaces: JsonObject = {};
      for (const surface of SURFACES) {
        const adopted = adopt(surface, present);
        const findings = judge(BASE[surface], present, adopted);
        const kinds = surface === "metadata" ? Object.keys(objectOf(adopted, "metadata")).filter(key => key.startsWith("ri")) : strings(snapshotOf(adopted).evidenceRefs, "refs").filter(ref => ref.startsWith("ri-")).map(ref => ref.slice(0, ref.indexOf(":")));
        expect(findings).toStrictEqual([]);
        surfaces[surface] = { kinds, findings };
      }
      fixtures[absent.name] = surfaces;
    }
    const allAbsent = SURFACES.map(surface => normal(adopt(surface, {})) === normal(BASE[surface]));
    expect(allAbsent).toStrictEqual([true, true, true]);
    return { fixtures, allAbsentIdentical: allAbsent };
  },
  C3: async () => {
    const result = objectOf(CARRIER.result, "result");
    const budget = objectOf(result.budget, "budget");
    const capability = objectOf(budget.capability_snapshot, "capability_snapshot");
    const inference = objectOf(objectOf(objectOf(result.provenance, "provenance").sdk_versions, "sdk_versions").reactive_inference, "reactive_inference");
    const values: Record<string, string> = {
      "budget.requested_model_id": String(budget.requested_model_id),
      "budget.capability_snapshot.model_id": String(capability.model_id),
      "invocation.model": INVOCATION.model,
      "sdk_versions.reactive_inference.distribution_version": String(inference.distribution_version),
      "sdk_versions.reactive_inference.contract_fingerprint": String(inference.contract_fingerprint),
    };
    const envelopes = [CARRIER, ...ROSTER.placements.map(placement => variant(placement)), ...ABSENT.map(absent => variant(placementOf("top"), nativeWithout(...absent.fields)))];
    const surfaced = envelopes.flatMap(envelope => SURFACES.map(surface => normal(projections(envelope)[surface]))).join("\n");
    const carrierText = JSON.stringify(ROSTER.carrier);
    const counts = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, { inCarrier: carrierText.split(value).length - 1, onSurfaces: surfaced.split(value).length - 1 }]));
    expect(Object.values(counts).every(count => count.onSurfaces === 0)).toBe(true);
    expect(Object.entries(counts).filter(([name]) => name !== "invocation.model").every(([, count]) => count.inCarrier >= 1)).toBe(true);
    expect(budget.resolved_model_id).toBeNull();
    return { counts, resolvedModelId: { stated: Object.hasOwn(budget, "resolved_model_id"), value: budget.resolved_model_id ?? null }, envelopes: envelopes.length };
  },
  C4: async () => {
    const result = objectOf(json(CARRIER.result), "result");
    delete objectOf(result.provenance, "provenance").cli_version;
    const stripped = projections({ ...CARRIER, result });
    const release = String(objectOf(objectOf(CARRIER.result, "result").provenance, "provenance").cli_version);
    const note = `producer release from result.provenance.cli_version: rf@${release}`;
    const removedRefs = strings(snapshotOf(BASE["rf-cli"]).evidenceRefs, "refs").filter(ref => !strings(snapshotOf(stripped["rf-cli"]).evidenceRefs, "refs").includes(ref));
    const removedNotes = strings(objectOf(BASE["rf-cli"], "topology").diagnostics, "notes").filter(entry => !strings(objectOf(stripped["rf-cli"], "topology").diagnostics, "notes").includes(entry));
    const removedMembers = Object.keys(objectOf(BASE.metadata, "metadata")).filter(key => !Object.hasOwn(objectOf(stripped.metadata, "metadata"), key));
    const changed = Object.fromEntries(SURFACES.map(surface => [surface, differences(BASE[surface], stripped[surface])]));
    // Nothing else moves: the stripped topology is today's with exactly the rf-cli ref and its note taken out, the metadata
    // today's without producerRelease, under both seams.
    const back = SURFACES.map(surface => {
      if (surface === "metadata") return normal(withMember(stripped.metadata, "producerRelease", release)) === normal(BASE.metadata);
      const today = objectOf(json(BASE[surface]), "topology");
      const refs = strings(snapshotOf(today).evidenceRefs, "refs").filter(ref => ref !== `rf-cli:${release}`);
      snapshotOf(today).evidenceRefs = refs;
      today.diagnostics = strings(today.diagnostics, "notes").filter(entry => entry !== note);
      return normal(today) === normal(stripped[surface]);
    });
    expect(removedRefs).toStrictEqual([`rf-cli:${release}`]);
    expect(removedNotes).toStrictEqual([note]);
    expect(removedMembers).toStrictEqual(["producerRelease"]);
    expect(back).toStrictEqual([true, true, true]);
    return { removedRefs, removedNotes, removedMembers, changed, nothingElse: back };
  },
  D1: async () => {
    const present = presentOf(nativeWithout("model_revision"));
    const probes = probeTable("model_revision", present, ROSTER.revisionProbes);
    const literals = carrierPrimitives();
    const swept = sweep("model_revision", present, literals);
    expect(probes.quiet).toStrictEqual([]);
    expect(swept.quiet).toStrictEqual([]);
    expect(swept.refused).toStrictEqual({ "rf-cli": literals.length, "injected-fixture": literals.length, metadata: literals.length });
    return { probes: probes.lines, carrierLiterals: swept.tried, refused: swept.refused, quiet: [...probes.quiet, ...swept.quiet] };
  },
  D2: async () => {
    const present = presentOf(nativeWithout("sampling_policy"));
    const probes = probeTable("sampling_policy", present, ROSTER.policyProbes);
    const objects = carrierObjects();
    const swept = sweep("sampling_policy", present, objects);
    expect(probes.quiet).toStrictEqual([]);
    expect(swept.quiet).toStrictEqual([]);
    expect(swept.refused).toStrictEqual({ "rf-cli": objects.length, "injected-fixture": objects.length, metadata: objects.length });
    return { probes: probes.lines, carrierObjects: swept.tried, refused: swept.refused, quiet: [...probes.quiet, ...swept.quiet] };
  },
  D3: async () => {
    const all = presentOf(NATIVE);
    const noRevision = presentOf(nativeWithout("model_revision"));
    const noPolicy = presentOf(nativeWithout("sampling_policy"));
    const revision = String(all.model_revision);
    const endpoint = String(all.endpoint);
    const policy = objectOf(all.sampling_policy, "sampling_policy");
    const evidence = objectOf(all.native_evidence, "native_evidence");
    const topology = adopt("rf-cli", all);
    const metadata = adopt("metadata", all);
    const replaced = (from: string, to: string) => mapRefs(topology, refs => refs.map(ref => (ref === from ? to : ref)));
    const mutants: Record<string, { readonly surface: Surface; readonly present: Present; readonly candidate: JsonValue }> = {
      "revision absent, note states a default": { surface: "rf-cli", present: noRevision, candidate: withNote(adopt("rf-cli", noRevision), "model revision: unknown") },
      "revision absent, status text states a default": { surface: "rf-cli", present: noRevision, candidate: withStatus(adopt("rf-cli", noRevision), " - model revision unknown") },
      "revision absent, sourceVersion defaulted": { surface: "rf-cli", present: noRevision, candidate: withSnapshot(adopt("rf-cli", noRevision), "sourceVersion", () => "unknown") },
      "revision absent, member under another name": { surface: "metadata", present: noRevision, candidate: withMember(adopt("metadata", noRevision), "modelRevision", "unknown") },
      "revision absent, ref of another kind": { surface: "rf-cli", present: noRevision, candidate: withRef(adopt("rf-cli", noRevision), "ri-revision:unknown") },
      "revision absent, endpoint borrowed": { surface: "rf-cli", present: noRevision, candidate: withRef(adopt("rf-cli", noRevision), `${REF_KIND.model_revision}:${endpoint}`) },
      "policy absent, note states a default": { surface: "rf-cli", present: noPolicy, candidate: withNote(adopt("rf-cli", noPolicy), "sampling policy: default") },
      "policy absent, member under another name": { surface: "metadata", present: noPolicy, candidate: withMember(adopt("metadata", noPolicy), "samplingPolicy", { mode: "greedy" }) },
      "revision upper-cased": { surface: "rf-cli", present: all, candidate: replaced(`${REF_KIND.model_revision}:${revision}`, `${REF_KIND.model_revision}:${revision.toUpperCase()}`) },
      "endpoint truncated": { surface: "rf-cli", present: all, candidate: replaced(`${REF_KIND.endpoint}:${endpoint}`, `${REF_KIND.endpoint}:${endpoint.slice(0, -8)}`) },
      "policy keys re-sorted": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.sampling_policy, Object.fromEntries(Object.entries(policy).sort(([a], [b]) => a.localeCompare(b)))) },
      "policy number as text": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.sampling_policy, { ...policy, temperature: String(policy.temperature) }) },
      "evidence truncated to one score": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.native_evidence, { ...evidence, scores: arrayOf(evidence.scores, "scores").slice(0, 1) }) },
      "endpoint and revision merged": { surface: "rf-cli", present: all, candidate: mapRefs(topology, refs => refs.filter(ref => !ref.startsWith(`${REF_KIND.model_revision}:`)).map(ref => (ref.startsWith(`${REF_KIND.endpoint}:`) ? `${ref}@${revision}` : ref))) },
      "evidence dropped": { surface: "rf-cli", present: all, candidate: mapRefs(topology, refs => refs.filter(ref => !ref.startsWith(`${REF_KIND.native_evidence}:`))) },
      "revision stated twice": { surface: "rf-cli", present: all, candidate: withRef(topology, `${REF_KIND.model_revision}:${revision}`) },
    };
    const findings = Object.fromEntries(Object.entries(mutants).map(([name, mutant]) => [name, judge(BASE[mutant.surface], mutant.present, mutant.candidate)]));
    expect(Object.entries(findings).filter(([, found]) => found.length === 0).map(([name]) => name)).toStrictEqual([]);
    return findings;
  },
  D4: async () => {
    const all = presentOf(NATIVE);
    const quiet: JsonObject = {};
    for (const surface of SURFACES) {
      quiet[`base/${surface}`] = judge(BASE[surface], {}, BASE[surface]);
      quiet[`adoption/${surface}`] = judge(BASE[surface], all, adopt(surface, all));
      for (const absent of ABSENT) {
        const present = presentOf(nativeWithout(...absent.fields));
        quiet[`adoption ${absent.name}/${surface}`] = judge(BASE[surface], present, adopt(surface, present));
        quiet[`today ${absent.name}/${surface}`] = judge(BASE[surface], {}, projections(variant(placementOf("top"), nativeWithout(...absent.fields)))[surface]);
      }
    }
    const revision = String(all.model_revision);
    const endpoint = String(all.endpoint);
    // R-REBIND: D3 dropped and D4's quote widened over D3's part tiles clause (c) again (the anchor reads every word has a pin).
    const rowD = ROWS.find(row => row.id === "D")?.pins ?? [];
    const quoteOf = (pin: string): string => rowD.find(entry => entry.id === pin)?.quote ?? "";
    const clause = acceptanceClauses(exportRow().notes).c ?? "";
    const from = clause.indexOf(quoteOf("D3"));
    const widened = clause.slice(from, clause.indexOf(quoteOf("D4"), from) + quoteOf("D4").length);
    const rebind = rowD.filter(pin => pin.id !== "D3").map(pin => (pin.id === "D4" ? widened : pin.quote));
    const residuals = {
      "R-COINCIDENT": judge(BASE["rf-cli"], all, withSnapshot(adopt("rf-cli", all), "sourceVersion", current => current ?? null)),
      "R-KIND": judge(BASE["rf-cli"], all, mapRefs(adopt("rf-cli", all), refs => refs.map(ref => (ref === `${REF_KIND.endpoint}:${endpoint}` ? `${REF_KIND.model_revision}:${endpoint}` : ref === `${REF_KIND.model_revision}:${revision}` ? `${REF_KIND.endpoint}:${revision}` : ref)))),
      "R-ORDER": judge(BASE["rf-cli"], all, mapRefs(adopt("rf-cli", all), refs => [...refs.slice(-FIELDS.length), ...refs.slice(0, -FIELDS.length)])),
      "R-REBIND": tiles(clause, rebind).untiled,
      "R-UNMEASURED": selfRead(UNMEASURED_CASE),
      "R-RUNTIME": selfRead(RUNTIME_CASE),
      "R-PRE-READ": selfRead(PRE_READ_CASE),
    };
    expect(Object.values(quiet).every(found => JSON.stringify(found) === "[]")).toBe(true);
    expect(residuals).toStrictEqual({ "R-COINCIDENT": [], "R-KIND": [], "R-ORDER": [], "R-REBIND": [], "R-UNMEASURED": [], "R-RUNTIME": [], "R-PRE-READ": [] });
    return { quiet, residuals, rebind };
  },
};

/** Each pin's witness as its case returned it; the record compares the whole set against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** Each pin's assertion count when its case reached its end (its witness comparison included), in run order: `${pin}:${count}`. */
const REACHED: string[] = [];

describe("wb-tz4r.3 RI native result provenance echo census (RI-UNIFIED-DECISION-INFERENCE-R3, absent-today leg)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "C:4", "D:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect({
      bead: BEAD, quotePin: QUOTE_PIN, quote: QUOTE, gatingArtifacts: GATING_ARTIFACTS, fields: FIELDS, refKinds: REF_KIND, members: MEMBER, invocation: INVOCATION,
      harness: HARNESS, record: RECORD, hooks: HOOKS,
    }).toStrictEqual({
      bead: ROSTER.bead, quotePin: ROSTER.quotePin, quote: ROSTER.quote, gatingArtifacts: [...ROSTER.gatingArtifacts], fields: [...ROSTER.fields],
      refKinds: ROSTER.refKinds, members: ROSTER.members, invocation: ROSTER.invocation, harness: [...ROSTER.harness],
      record: { context: ROSTER.record.context, statements: [...ROSTER.record.statements] }, hooks: [...ROSTER.hooks],
    });
    // THE FREEZE (wb-b93c F1): the roster is frozen through every member, so no in-place write this file makes - the judged set's,
    // which may name ROSTER, included - reaches the roster the pin cases and the record compare against. Each of six write forms is
    // refused on every member of the D3 pin (whose witness the wb-yi2o gate's F1 rewrote) and on the reached list's first entry, the roster reads the
    // same after them, and the reading names each unfrozen object or list of a perturbed input.
    expect(unfrozen(ROSTER), "every object and list reached from the roster is frozen").toEqual([]);
    expect(unfrozen({ kept: Object.freeze([Object.freeze({})]), open: [{}] }), "the reading names each unfrozen object and list").toEqual(["$", "$.open", "$.open[0]"]);
    const rosterText = JSON.stringify(ROSTER);
    const refused = { "Object.assign": "TypeError", "Object.defineProperty": "TypeError", "Reflect.set": "false", "Reflect.defineProperty": "false", "Reflect.deleteProperty": "false", "Object.setPrototypeOf": "TypeError" };
    const pinD3 = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === "D3") ?? {};
    const members = Object.keys(pinD3);
    expect(members, "the D3 pin's members").toHaveLength(3);
    expect(Object.fromEntries(members.map(member => [member, writesTo(pinD3, member)])), "each write to a D3 pin member is refused").toStrictEqual(Object.fromEntries(members.map(member => [member, refused])));
    expect(writesTo(ROSTER.reached, "0"), "each write to the reached list's first entry is refused").toStrictEqual(refused);
    expect(JSON.stringify(ROSTER), "the roster after the refused writes").toBe(rosterText);
    // THE FREEZE over the in-file sides (wb-5333 F1: the wb-b93c gate's F1 - row B's label cut in ROWS, or D3's quote, then restored
    // by the judged set through Object.assign before its roster comparison, stayed 18/18): ROWS and each constant the judged set
    // compares against the roster are frozen where they are declared, so no in-place write reaches the in-file side of a roster
    // comparison either. Each of the six write forms is refused on every member of row B and of D3's pin in ROWS and on the first
    // member of each in-file side, and the in-file sides read the same after them.
    const inFile = { rows: ROWS, gatingArtifacts: GATING_ARTIFACTS, fields: FIELDS, refKinds: REF_KIND, members: MEMBER, invocation: INVOCATION, harness: HARNESS, record: RECORD, hooks: HOOKS };
    expect(Object.entries(inFile).flatMap(([name, value]) => unfrozen(value, `$.${name}`)), "every object and list reached from the in-file side of a roster comparison is frozen").toEqual([]);
    const inFileText = JSON.stringify(inFile);
    const refusedInFile = { "Object.assign": "TypeError", "Object.defineProperty": "TypeError", "Object.setPrototypeOf": "TypeError", "Reflect.defineProperty": "false", "Reflect.deleteProperty": "false", "Reflect.set": "false" };
    const rowB = ROWS.find(row => row.id === "B") ?? {};
    const pinD3InRows = ROWS.flatMap(row => row.pins).find(entry => entry.id === "D3") ?? {};
    expect(Object.keys(rowB), "row B's members in ROWS").toEqual(["id", "label", "pins"]);
    expect(Object.keys(pinD3InRows), "the D3 pin's members in ROWS").toEqual(["id", "quote"]);
    expect(Object.fromEntries(Object.keys(rowB).map(member => [member, writesTo(rowB, member)])), "each write to a member of row B in ROWS is refused").toStrictEqual(Object.fromEntries(Object.keys(rowB).map(member => [member, refusedInFile])));
    expect(Object.fromEntries(Object.keys(pinD3InRows).map(member => [member, writesTo(pinD3InRows, member)])), "each write to a member of the D3 pin in ROWS is refused").toStrictEqual(Object.fromEntries(Object.keys(pinD3InRows).map(member => [member, refusedInFile])));
    expect(Object.fromEntries(Object.entries(inFile).map(([name, value]) => [name, writesTo(value, Object.keys(value)[0] ?? "")])), "each write to the first member of each in-file side is refused").toStrictEqual(Object.fromEntries(Object.keys(inFile).map(name => [name, refusedInFile])));
    expect(JSON.stringify(inFile), "the in-file sides after the refused writes").toBe(inFileText);
    // The patterns the judged set and the cases read through (wb-5333 F1): SEPARATOR, which the PIN ANCHOR's tiling reads every gap
    // with, and the cases' RI_ROOT, FIELD_SPELLINGS and REF_PREFIX are frozen too, so no test method set on one of them (the wb-5333
    // seat's SEP1: CT6 beside a SEPARATOR.test reading every gap that holds no quote as a separator stayed 17/17) is taken.
    const patterns = { separator: SEPARATOR, riRoot: RI_ROOT, fieldSpellings: FIELD_SPELLINGS, refPrefix: REF_PREFIX };
    expect(Object.entries(patterns).flatMap(([name, value]) => unfrozen(value, `$.${name}`)), "every pattern the judged set and the cases read through is frozen").toEqual([]);
    const regexps = [SEPARATOR, RI_ROOT, ...FIELD_SPELLINGS, REF_PREFIX];
    expect(regexps.map(pattern => [Reflect.set(pattern, "test", () => true), Reflect.defineProperty(pattern, "test", { value: () => true })]), "a test method set on each pattern is refused").toEqual(regexps.map(() => [false, false]));
    // THE DECLARATION (wb-5333 cut #7, refusal #6's U1: the wb-5333 gate's DF-CALLEE family - isObject, the in-file callee of
    // deepFrozen's body, edited to write the roster file's rows into the ROWS literal's rows before the freeze, beside row B's label
    // cut, D3 removed from ROWS or D3's quote cut, stayed 0 failed | 18 passed on the wb-5333 cut #6): each in-file side is, here as at
    // collection, the value its own declaration spells in this file's source; each reading reports a perturbed input; and the
    // collection statement stands.
    expect(declarationMisses(SELF_TEXT, DECLARED_SIDES), "every in-file side is the value its own declaration spells").toEqual([]);
    expect(DECLARATION_MISSES).toEqual([]);
    const declaredSource = plantedSides({
      INVOCATION: 'const INVOCATION = deepFrozen({ model: "m", task: "t" });',
      ROWS: `const ROWS = deepFrozen([{ id: "A", label: \`(a) \${TRIGGER}\`, pins: [{ id: "A1", quote: "q" }] }]);`,
      SEPARATOR: "const SEPARATOR = deepFrozen(/^[\\s,;:]*$/);",
    });
    const frozenPins = Object.freeze([Object.freeze({ id: "A1", quote: "q" })]);
    const declarationRows = (row: object): unknown => Object.freeze([Object.freeze(row)]);
    const asDeclared: Readonly<Record<string, unknown>> = {
      INVOCATION: Object.freeze({ model: "m", task: "t" }),
      ROWS: declarationRows({ id: "A", label: "(a) trigger", pins: frozenPins }),
      SEPARATOR: Object.freeze(/^[\s,;:]*$/),
    };
    const sidesWith = (values: Readonly<Record<string, unknown>>): unknown[] => IN_FILE_SIDES.map(side => (Object.hasOwn(values, side) ? values[side] : Object.hasOwn(asDeclared, side) ? asDeclared[side] : side.toLowerCase()));
    const recompiledPattern = Object.freeze(/^[\s,;:]*$/);
    try {
      recompiledPattern.compile("^(?:[\\s,;:]*|, no carrier default substitutes )$");
    } catch {
      // RegExp.prototype.compile rewrites the frozen pattern's body and flags, then throws on its lastIndex (measured)
    }
    expect({
      clean: declarationMisses(declaredSource, sidesWith({})),
      label: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows({ id: "A", label: "(a) trigger, the roster file's label", pins: frozenPins }) })),
      pin: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows({ id: "A", label: "(a) trigger", pins: Object.freeze([...frozenPins, Object.freeze({ id: "A2", quote: "r" })]) }) })),
      quote: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows({ id: "A", label: "(a) trigger", pins: Object.freeze([Object.freeze({ id: "A1", quote: "q, the roster file's quote" })]) }) })),
      unfrozen: declarationMisses(declaredSource, sidesWith({ ROWS: Object.freeze([{ id: "A", label: "(a) trigger", pins: frozenPins }]) })),
      accessor: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows(Object.defineProperty({ id: "A", label: "", pins: frozenPins }, "label", { get: () => "(a) trigger", enumerable: true })) })),
      prototype: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows(Object.setPrototypeOf({ id: "A", label: "(a) trigger", pins: frozenPins }, { kept: true })) })),
      member: declarationMisses(declaredSource, sidesWith({ ROWS: declarationRows({ id: "A", label: "(a) trigger", pins: frozenPins, [Symbol.for("wb-5333")]: true }) })),
      patternMember: declarationMisses(declaredSource, sidesWith({ SEPARATOR: Object.freeze(Object.defineProperty(/^[\s,;:]*$/, "test", { value: () => true })) })),
      recompiled: declarationMisses(declaredSource, sidesWith({ SEPARATOR: recompiledPattern })),
      string: declarationMisses(declaredSource, sidesWith({ BEAD: "another bead" })),
      object: declarationMisses(declaredSource, sidesWith({ INVOCATION: Object.freeze({ model: "m", task: "the roster file's task" }) })),
      twice: declarationMisses(plantedSides({ BEAD: 'const BEAD = "bead";\nconst BEAD = "bead";' }), sidesWith({ ROWS: "rows", SEPARATOR: "separator", INVOCATION: "invocation" })),
      unread: declarationMisses(plantedSides({ BEAD: 'const BEAD = String("bead");' }), sidesWith({ ROWS: "rows", SEPARATOR: "separator", INVOCATION: "invocation" })),
      count: declarationMisses(declaredSource, sidesWith({}).slice(1)),
      sidesForm: declarationMisses(plantedSides({}, "const DECLARED_SIDES: readonly unknown[] = Object.freeze([BEAD]);\n"), sidesWith({ ROWS: "rows", SEPARATOR: "separator", INVOCATION: "invocation" })),
      verdictForm: declarationMisses(plantedSides({}, "const DECLARATION_MISSES: readonly string[] = declarationMisses(SELF_TEXT, [BEAD]);\n"), sidesWith({ ROWS: "rows", SEPARATOR: "separator", INVOCATION: "invocation" })),
    }).toStrictEqual({
      clean: [],
      label: ["ROWS[0].label is not its declared literal"],
      pin: ["ROWS[0].pins has other members than its declaration"],
      quote: ["ROWS[0].pins[0].quote is not its declared literal"],
      unfrozen: ["ROWS[0] is not frozen"],
      accessor: ["ROWS[0].label is an accessor"],
      prototype: ["ROWS[0] has another prototype"],
      member: ["ROWS[0] has other members than its declaration"],
      patternMember: ["SEPARATOR has other members than its declaration"],
      recompiled: ["SEPARATOR is not its declared literal"],
      string: ["BEAD is not its declared literal"],
      object: ["INVOCATION.task is not its declared literal"],
      twice: ["BEAD is not declared once"],
      unread: ["BEAD is not read from its declaration"],
      count: ["the sides read are not the IN_FILE_SIDES"],
      sidesForm: ["DECLARED_SIDES is not Object.freeze over the IN_FILE_SIDES names in order"],
      verdictForm: ["DECLARATION_MISSES is not declarationMisses(SELF_TEXT, DECLARED_SIDES)"],
    });
    expect([declarationStands(SELF_TEXT), declarationStands(SELF_TEXT.replace(/^if \(DECLARATION_MISSES\.length > 0\) throw .*$/m, ""))]).toEqual([true, false]);
    // THE DECLARATION over the roster (wb-5333 cut #7): readRoster read its frozen result back against the text it read before it
    // returned it (it throws otherwise, so ROSTER is that result); the read-back reports each perturbed input, and readRoster's
    // read-back stands.
    const filedRoster = { rows: [{ id: "D", pins: [{ id: "D3", quote: "to any literal", held: { kept: ["a", "b"], dropped: ["c"] } }] }], reached: ["D3:4"] };
    const readAs = (edit: (copy: { rows: { id: string; pins: Record<string, unknown>[] }[]; reached: string[] }) => void = () => undefined): unknown => {
      const copy = JSON.parse(JSON.stringify(filedRoster)) as { rows: { id: string; pins: Record<string, unknown>[] }[]; reached: string[] };
      edit(copy);
      return deepFrozen(copy);
    };
    expect({
      clean: rosterReadBack(readAs(), filedRoster, "ROSTER"),
      reordered: rosterReadBack(deepFrozen({ reached: ["D3:4"], rows: [{ pins: [{ held: { dropped: ["c"], kept: ["a", "b"] }, quote: "to any literal", id: "D3" }], id: "D" }] }), filedRoster, "ROSTER"),
      dropped: rosterReadBack(readAs(copy => Reflect.deleteProperty(copy.rows[0]?.pins[0]?.held as object, "dropped")), filedRoster, "ROSTER"),
      changed: rosterReadBack(readAs(copy => Reflect.set((copy.rows[0]?.pins[0]?.held as { kept: string[] }).kept, "1", "B")), filedRoster, "ROSTER"),
      listOrder: rosterReadBack(readAs(copy => (copy.rows[0]?.pins[0]?.held as { kept: string[] }).kept.reverse()), filedRoster, "ROSTER"),
      added: rosterReadBack(readAs(copy => Reflect.set(copy.rows[0]?.pins[0]?.held as object, "forged", ["d"])), filedRoster, "ROSTER"),
      unfrozen: rosterReadBack(Object.freeze({ rows: Object.freeze([{ id: "D", pins: (readAs() as typeof filedRoster).rows[0]?.pins }]), reached: Object.freeze(["D3:4"]) }), filedRoster, "ROSTER"),
      accessor: rosterReadBack(readAs(copy => Object.defineProperty(copy.rows[0] as object, "id", { get: () => "D", enumerable: true })), filedRoster, "ROSTER"),
      prototype: rosterReadBack(readAs(copy => Object.setPrototypeOf(copy.rows[0] as object, { kept: true })), filedRoster, "ROSTER"),
      symbol: rosterReadBack(readAs(copy => Reflect.set(copy.rows[0] as object, Symbol.for("wb-5333"), true)), filedRoster, "ROSTER"),
    }).toStrictEqual({
      clean: [],
      reordered: [],
      dropped: ["ROSTER.rows[0].pins[0].held has other members than the roster file's"],
      changed: ["ROSTER.rows[0].pins[0].held.kept[1] is not the roster file's"],
      listOrder: ["ROSTER.rows[0].pins[0].held.kept[0] is not the roster file's", "ROSTER.rows[0].pins[0].held.kept[1] is not the roster file's"],
      added: ["ROSTER.rows[0].pins[0].held has other members than the roster file's"],
      unfrozen: ["ROSTER.rows[0] is not frozen"],
      accessor: ["ROSTER.rows[0].id is an accessor"],
      prototype: ["ROSTER.rows[0] has another prototype"],
      symbol: ["ROSTER.rows[0] has other members than the roster file's"],
    });
    expect([rosterReadBackStands(SELF_TEXT), rosterReadBackStands(SELF_TEXT.replace(/^ {2}if \(misses\.length > 0\) throw .*$/m, ""))]).toEqual([true, false]);
    // The anchor outside this file and its roster: the owner filing in the tracked bead export.
    const { title, notes } = exportRow();
    const clauses = acceptanceClauses(notes);
    const acceptanceRows = ROWS.filter(row => /^\([a-d]\) /.test(row.label));
    expect(Object.keys(clauses)).toEqual(["a", "b", "c"]);
    expect(acceptanceRows.map(row => row.label)).toEqual(Object.entries(clauses).map(([letter, clause]) => `(${letter}) ${clause}`));
    expect(title.startsWith(`${PROGRAM_TAG} If Pi ever echoes a native decision result`)).toBe(true);
    expect(notes.includes(TRIGGER)).toBe(true);
    expect(ROWS[0]?.label.includes(TRIGGER)).toBe(true);
    expect(notes.includes(`'${QUOTE}' ${QUOTE_PIN}.`)).toBe(true);
    // The fields are exactly the items clause (a) lists, in its order, and each is the quote's own words, in the quote's order.
    const listed = /^adoption fixture: (.+?) travel verbatim /.exec(clauses.a ?? "")?.[1]?.split(/\/|, | and /) ?? [];
    const words = FIELDS.map(field => field.replace("_", " "));
    expect(listed).toStrictEqual(words);
    const inQuote = words.map(word => QUOTE.indexOf(word));
    expect(inQuote.every((at, index) => at >= 0 && (index === 0 || at > (inQuote[index - 1] ?? -1)))).toBe(true);
    expect(GATING_ARTIFACTS.filter(artifact => !notes.includes(artifact))).toStrictEqual([]);
    // THE PIN ANCHOR (wb-3xmr F1): each row's pin quotes, in pin order, tile its owner text - row A's the title's condition, rows
    // B-D's their clauses - with separator-only gaps, and dropping any one quote leaves its row's owner text untiled.
    const owner = ROWS.map(row => ownerTextOf(row, title, clauses));
    expect(owner.map(entry => entry.length > 0), "every row has its owner text").toEqual(ROWS.map(() => true));
    const quotesRead = ROWS.flatMap(row => row.pins);
    const quoteSeparates = separatorTests(quotesRead.map(pin => pin.quote));
    expect(quotesRead.filter((_, index) => quoteSeparates[index] === true).map(pin => pin.id), "every quote names something").toEqual([]);
    // SEPARATOR at each PIN ANCHOR reading (wb-5333 cut #7): a pattern recompiled away from SEPARATOR's declaration - frozen, as
    // SEPARATOR is - is refused at the reading it precedes.
    const recompiledSeparator = Object.freeze(new RegExp(SEPARATOR.source, SEPARATOR.flags));
    try {
      recompiledSeparator.compile("^.*$");
    } catch {
      // compile rewrites the frozen pattern, then throws on its lastIndex (measured)
    }
    expect(separatorTests([", ", "a quote"]), "SEPARATOR as declared").toEqual([true, false]);
    expect(() => separatorTests(["a quote"], recompiledSeparator), "a recompiled pattern is refused at the PIN ANCHOR's reading").toThrow("SEPARATOR is not its declaration where the PIN ANCHOR reads it");
    expect(ROWS.map((row, index) => tiles(owner[index] ?? "", row.pins.map(pin => pin.quote)).untiled), "each row's quotes tile its owner text").toEqual(ROWS.map(() => []));
    const droppable = ROWS.flatMap((row, index) => row.pins.filter(pin => tiles(owner[index] ?? "", row.pins.filter(other => other !== pin).map(other => other.quote)).covered).map(pin => pin.id));
    expect(droppable, "a pin whose quote drops with its row's owner text still tiled").toEqual([]);
    // THE SELF-READ (wb-3xmr F2, wb-yi2o F1) over this file, and planted sources that show each refusal (THE GUARD took the same
    // readings at collection).
    expect(selfRead(SELF_TEXT), "this file's SELF-READ").toEqual([]);
    expect(readingsOf(PLANTED_SOURCES)).toStrictEqual(pinnedReads(PLANTED_SOURCES));
    // THE SELF-READ inside the describe block (wb-hiwv F1, wb-yi2o F1): planted blocks show each refusal, beside the harness, the
    // judged set's keys and the record reading clean.
    expect(readingsOf(PLANTED_BLOCKS)).toStrictEqual(pinnedReads(PLANTED_BLOCKS));
    // THE GUARD's own pins (wb-yi2o F1): it reads clean here, each comparison reports a perturbed input, and its throw stands.
    expect(GUARD_MISSES).toEqual([]);
    const clean: GuardInputs = { text: "", pins: [], harness: HARNESS, record: RECORD, hooks: HOOKS };
    expect({
      clean: guardMisses(clean),
      text: guardMisses({ ...clean, text: "const vitestIt = it;\n" }),
      pins: guardMisses({ ...clean, pins: [{ "a pin read otherwise": { source: "const vitestIt = it;\n", reads: [] } }] }),
      harness: guardMisses({ ...clean, harness: HARNESS.slice(1) }),
      record: guardMisses({ ...clean, record: { context: "", statements: RECORD.statements } }),
      hooks: guardMisses({ ...clean, hooks: [...HOOKS, "afterEach(() => undefined);"] }),
    }).toStrictEqual({
      clean: [],
      text: ["this file: vitestIt names it"],
      pins: ["planted: a pin read otherwise"],
      harness: ["HARNESS is not the roster's harness"],
      record: ["RECORD is not the roster's record"],
      hooks: ["HOOKS are not the roster's hooks"],
    });
    expect([guardStands(SELF_TEXT), guardStands(SELF_TEXT.replace(/^if \(GUARD_MISSES\.length > 0\) throw .*$/m, ""))]).toEqual([true, false]);
    // THE DECLARATION again at the judged set's end (wb-5333 cut #7): a pattern recompiled during the judged set reds here.
    expect(declarationMisses(SELF_TEXT, DECLARED_SIDES), "every in-file side is still the value its own declaration spells").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const { id: pin } of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
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
    expect(titles, "the judged title, one test per pin in row order, then this record").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins.map(pin => pin.id)), RECORD_TITLE]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    const texts = Object.entries(MEASURED).map(([pin, value]) => [pin, JSON.stringify(value)] as const);
    const shared = texts.filter(([pin, value]) => texts.some(([other, again]) => other !== pin && again === value)).map(([pin]) => pin);
    expect(shared, "no two pins share one witness (a case moved under another pin's id, its witness rewritten to match)").toEqual([]);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
