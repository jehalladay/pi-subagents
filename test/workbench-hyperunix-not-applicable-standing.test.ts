/** wb-tz2.4 (HX-ORIGINAL-GOALS-CLOSURE-R4), STANDING leg only. The statement: "When a GC-D03/ADR amendment adds a not-applicable
 * value to hyperunix.result and to the SDK Completeness type (today exactly complete|incomplete|unknown, vendored
 * dist/result.d.ts:25@9df9a03; 07-epistemic:23@6ed14cab8d), the adapter shall give it its own reading — distinct from partial,
 * unknown and absence — never collapsed silently into an existing verdict." The acceptance row pinned here: "Standing: the
 * closed-set discipline holds — an unregistered execution kind is refused (hyperunix-observer.ts:135-136@9df9a03; fixture :346),
 * so new vocabulary cannot silently read as a known verdict."
 *
 * The on-landing row ("an adapter unit test drives a not-applicable result and asserts a distinct projection that is NOT
 * complete, NOT known-empty, and does not license absence without the runtime licence; a second test proves pre-existing values
 * still project byte-identically") waits on that external amendment and is not built here: src/workbench/hyperunix-observer.ts
 * has no not-applicable reading, and by its landed design (test/workbench-hyperunix-observer.test.ts 'H5: tolerates unknown
 * producer fields' and 'R1 Acceptance 4') decides coverage from execution_status.kind and coverage_summary.licenses_absence only,
 * never from coverage_summary.completeness. Until the amendment lands, every place the new word could enter is held:
 *   T1 the trigger: the vendored SDK's Completeness is exactly complete|incomplete|unknown (type level, gate-enforced by
 *      typecheck:test, and in the shipped declaration) and CoverageSummary.completeness is Completeness | null, so vendoring an
 *      amended SDK fails here before the word can reach the adapter as a field nothing reads;
 *   T2 the live decoder: a result-coverage or answer-coverage frame carrying the word fails the whole stream as
 *      SDK_PROTOCOL_INCOMPATIBLE at body.completeness (the SDK's own closed set), so a read never becomes a result at all;
 *   K1 as an execution kind the word is outside the adapter's closed kind set: refused before anything is projected, under either
 *      licence, and the live invariant's execution-kind clause breaks;
 *   K2 through the representation decoder (resultFromJson, then resultToJson, as the provider serializes) such a kind rebuilds as
 *      protocol-failed, which the adapter keeps a failure that never licenses absence;
 *   C1 as a completeness value the representation decoder keeps none of the spellings (each rebuilds as null), so the provider
 *      output is byte-identical to its null twin;
 *   C2 a reading that carries the word past the decoder never reads complete, success or known-empty and never licenses absence
 *      without the runtime licence (nor on a kind that is not complete), and a mutation outcome stays refused;
 *   C3 the pre-existing values (complete, incomplete, unknown, null) project byte-identically to the completeness-free reading
 *      for every kind and licence: the baseline the on-landing row must keep;
 *   R0 the rosters those cases iterate (wb-cpqb, the landing-641 F1 follow-up): the six literal rosters hold a frozen shape,
 *      and every roster (the two derived ones included) joins an anchor outside its own literal, so an edit to a roster's
 *      members as R0 reads them (an array's index by index, a set's through its spread; for a derived roster, the members
 *      its derivation yields) reds R0 before any cell guard can move with it (wb-50gc, the landing-813 F1 follow-up,
 *      restates this sentence to the members R0 reads; what VERDICT_FRAMES and FRAME_VALUES hand T2's loops and T2's
 *      EXPECTED_VISITS entries is held below, and an override of another literal roster's own methods that keeps those
 *      members is not claimed): PRE_EXISTING is the
 *      shipped Completeness in declaration order then null (and exactly Completeness | null at type level), FRAME_VALUES its
 *      non-null members, COMPLETE_KINDS the declared kinds (below) on which hxLiveInvariant licenses absence under the
 *      licence, MUTATION_KINDS the declared kinds its read-outcome clause refuses and READ_KINDS the rest of them (wb-ey9p cut
 *      #2: these adapter joins read the declared kinds, never the binding), LICENCES exactly the licence's boolean at type level
 *      and, at run time, both boolean values (every licence's negation is a licence) in the order hxLiveInvariant reads them:
 *      absence licensed on exactly COMPLETE_KINDS under the first and on no kind under the second (wb-aced, so a coordinated
 *      edit of LICENCES and its frozen literal reds under any annotation), VERDICT_FRAMES distinct and exactly the fixture
 *      builder's frame union at type level (T2 also counts it absolutely) and, at run time, the keys of FRAME_UNION, that
 *      union as an exhaustive record, member for member and in order (the frame join, wb-50gc), and NOT_APPLICABLE the
 *      bead's own spelling followed
 *      by its forms under the three SDK styles the declaration witnesses. The imported HYPERUNIX_EXECUTION_KINDS (the roster
 *      READ_KINDS filters, EXPECTED_CELLS counts, EXPECTED_VISITS flat-maps and the kind loops of C2 and C3 iterate) joins
 *      the SDK as this file binds it (wb-ey9p, the landing-746 F1 follow-up): its element type is exactly the SDK
 *      ExecutionStatusKind at type level, and at run time its members equal the ExecutionStatus kinds of the installed
 *      declaration, member for member and in declaration order (the kind join). A binding can hold those members while its
 *      filter, flatMap or iteration hands on other kinds (wb-ey9p cut #2), so what it hands on is joined as well: READ_KINDS
 *      joins the declared kinds outside the read-outcome clause, and R0's visit join requires the cells C1, C2 and C3 must
 *      record (EXPECTED_VISITS's c1, c2 and c3, built through READ_KINDS and the binding's flatMap) to equal, as R0 reads
 *      them, the same cells built over the declared kinds. What a binding hands on can also change after R0 has read it (a
 *      handed cell that is an accessor, or a reference the binding keeps and rewrites; an iteration switched by the running
 *      test or by a count: wb-ey9p cut #3), so C1, C2 and C3 compare the record of what their own loops drove first with
 *      their EXPECTED_VISITS entry and then with their DECLARED_VISITS entry (the declared-visit guard): the same cells
 *      built once at module scope, before any case runs, by loops of its own (the cases' loop shape, not kindVisits) over
 *      the ExecutionStatus kinds read from the installed declaration and never through the binding, and frozen, cells
 *      included. R0's declared join requires kindVisits over R0's own reading of the declaration to equal DECLARED_VISITS,
 *      so an edit that moves the cells built on one side of that join (kindVisits or R0's reading of the declaration on one
 *      side, DECLARED_VISITS's loops or its reading on the other) reds R0 unless the other side moves with it. The two
 *      rosters T2 alone drives are held the same way (wb-50gc, the landing-813 F1 follow-up): VERDICT_FRAMES and
 *      FRAME_VALUES can hold the members R0 reads while their iteration, map or flatMap hands other members to T2's loops
 *      and to the module-scope build of T2's two EXPECTED_VISITS entries (own methods on the literal or on the derivation
 *      result, or a Proxy that hands R0 its real members), so R0's T2 visit join requires those entries (built through
 *      VERDICT_FRAMES's flatMap and NOT_APPLICABLE's and FRAME_VALUES's map) to equal, as R0 reads them, the same cells
 *      frameVisits builds over the keys of FRAME_UNION and R0's reading of the declaration's Completeness; and T2 compares
 *      the record of what its own loops drove first with its EXPECTED_VISITS entries and then with DECLARED_T2_VISITS
 *      (T2's declared-visit guard): the same cells built once at module scope, before any case runs, by loops of its own in
 *      T2's loop shape over the keys of FRAME_UNION, NOT_APPLICABLE and the Completeness values read from the installed
 *      declaration, never through VERDICT_FRAMES or FRAME_VALUES, and frozen, cells included; R0's T2 declared join
 *      requires frameVisits over R0's reading to equal it. FRAME_UNION is the fixture builder's frame union at run time: an
 *      exhaustive record keyed by verdictStream's frame parameter, so typing refuses a missing or an extra frame (R0 also
 *      holds its key type to that union), and R0's frame join requires VERDICT_FRAMES to equal its keys. So an edit of
 *      VERDICT_FRAMES or FRAME_VALUES (FRAME_VALUES's derivation included) that substitutes, drops, duplicates, adds or
 *      reorders a member in what its map or flatMap hands T2's EXPECTED_VISITS entries, as R0 reads them, reds R0, at the
 *      latest at the T2 visit join, and one that does so in what its iteration hands T2's loops, whether from the start or
 *      only after R0,
 *      reds T2 at the latest at its declared-visit guard, whether or not its counts move; the frame join, the T2 visit
 *      join, the T2 declared join and T2's declared-visit guard each name both of their causes. A handed
 *      value can also decide its own equality (wb-ey9p cut #4, the refusal-#3 U1-U3 cure): vitest's toStrictEqual asks a
 *      value that carries an asymmetricMatch function whether it equals the other side before any type or value check (eq
 *      in @vitest/expect), so a handed kind or cell, a roster member or the binding itself could meet a join or a guard on
 *      its own verdict. So the frozen shapes, the Completeness join, the kind join, the visit join, the declared join, the
 *      READ_KINDS join, the frame join and the T2 visit and declared joins in R0, and every record guard (the
 *      EXPECTED_VISITS guards of T2, K1, K2, C1, C2 and C3 and the declared-visit guards of T2, C1, C2 and C3), compare
 *      their two sides a second time through primitiveView (the primitive
 *      pass, after the first): a projection that reads an array's members by index, in order and recursively, keeps a
 *      primitive as it is and replaces any other value by a fresh marker object naming its typeof, so the two sides agree
 *      only where both hold equal primitives or both hold non-primitives of one typeof, member by member and in order, and
 *      no object (a matcher, a boxed string, any other object or function) is read as the kind or cell it stands for; each
 *      primitive pass carries its first pass's message. R0's
 *      other joins (the adapter joins of COMPLETE_KINDS and MUTATION_KINDS, LICENCES at run time and the NOT_APPLICABLE
 *      derivation) compare a literal roster, whose members the frozen-shape primitive pass holds, with values R0 builds
 *      itself from the declaration, the adapter or that roster. So a
 *      module-scope shadow or rebinding of the import, or an edit of the adapter tuple itself
 *      (src/workbench/hyperunix-observer.ts), that substitutes, drops, duplicates, adds or reorders a kind in what R0 reads
 *      of it (its members, and what its filter or flatMap hands READ_KINDS and EXPECTED_VISITS) reds R0, and one that does
 *      so in what a case's kind loop drives (what its iteration hands the kind loops of C2 and C3, or READ_KINDS's iteration
 *      the kind loop of C1), whether from the start or only after R0, reds that case at the latest at its declared-visit
 *      guard, whether or not its count moves; a shadow that changes no member but gives the binding another element type
 *      (wider or narrower) fails typing. A failing Completeness join names both of its causes, an edited roster or a moved
 *      SDK vocabulary, and so do a failing kind join (an edited binding or a moved SDK vocabulary), a failing visit join (a
 *      binding that hands on other kinds than its members, or an edited EXPECTED_VISITS), a failing declared join (an edited
 *      DECLARED_VISITS, kindVisits or reading of the declaration) and a failing declared-visit guard (a binding that hands
 *      the case's kind loop other kinds than its members after R0, or an edited case loop, record or DECLARED_VISITS).
 *      Each case's expected cell count is computed once at module scope from these rosters, the imported one included
 *      (EXPECTED_CELLS, wb-aced, the landing-696 F1 follow-up), T2's fixture-validity half included, and so is the sequence
 *      of cells each case drives (EXPECTED_VISITS, wb-aced cut #2): T2, K1, K2, C1, C2 and C3 record every innermost cell
 *      they drive (the loop values they hand the SDK or the adapter; C2 and C3 also the branch the cell took) and compare
 *      that record with EXPECTED_VISITS, member for member and in order, after their count guards (C1's, C2's and C3's
 *      entries are also the visit join's, above). So a case that drives other cells than the module rosters define,
 *      because it rebinds an iterated or branch roster in its own scope (the imported HYPERUNIX_EXECUTION_KINDS included)
 *      or substitutes, narrows, widens or reorders the roster expression at one of its loop sites, reds its own case, at the
 *      latest at that guard, whether or not its cell count moves.
 *      Not claimed, and none is a residual (no quiet row pins any): a rewrite of the bead's own spelling itself (the
 *      roster's first member and the frozen literal together: the bead text lives in the tracker, which this file does not
 *      read); which HXS frame kinds carry a completeness verdict (T2 refuses the word on both listed frames; the SDK's frame
 *      set is not read); an edit of a guard or of a record (a case-local EXPECTED_CELLS or EXPECTED_VISITS, a declared-visit
 *      guard, a primitive pass or primitiveView itself, or a recorded value other than the driven one); an edit that hands
 *      the SDK or the adapter a value other than the recorded loop value (inside a loop body, or a case-local rebinding of
 *      a helper such as reading or sdkDocument);
 *      a case-local rebinding that changes no driven cell (K1's kind-set assertion reads HYPERUNIX_EXECUTION_KINDS but drives
 *      no cell from it), and what any binding hands that assertion when K1 reads it (R0 holds the members as R0 reads them);
 *      an edit of the installed SDK declaration, or edits that move both sides of R0's declared join together (kindVisits or
 *      R0's reading of the declaration, with DECLARED_VISITS's loops or its reading), together with the binding, or a
 *      rebinding of the imported ExecutionStatusKind type (the kind join's anchors moved with it; the observer suite reads
 *      the src export against that declaration); edits that move both sides of R0's T2 declared join together (frameVisits
 *      or R0's reading of the declaration, with DECLARED_T2_VISITS's loops or its reading), together with VERDICT_FRAMES or
 *      FRAME_VALUES, or an edit of FRAME_UNION or of verdictStream's frame union together with VERDICT_FRAMES and R0's
 *      frozen literals (T2's absolute frame count still reds a frame set so widened or narrowed); an override of the own
 *      methods of a literal roster other than VERDICT_FRAMES (its iteration, filter,
 *      flatMap or map, or a set's has) that keeps its members (R0's frozen shapes compare members, and every visit build,
 *      the cases' records included, is driven through the same literal rosters, save that DECLARED_T2_VISITS and the T2
 *      joins read the keys of FRAME_UNION, never VERDICT_FRAMES); an edit of the adapter beyond its tuple, or
 *      of the SDK, whose outputs or errors decide a comparison on their own verdict (the primitive pass holds the rosters,
 *      the binding and what it hands on, the joins and the records; the cases read the adapter's and the SDK's outputs and
 *      errors by toStrictEqual, toMatchObject, toBeInstanceOf and toBe as before); and a patch of a shared prototype or of a
 *      realm function (an Array or Set method of the realm, Array.isArray and Array.from included, and Object.keys, which
 *      the readers of FRAME_UNION read through: each can move the declared side of a join with the binding or a roster, or
 *      steer primitiveView). RESIDUALS: none.
 * T1, T2, C1 and R0's Completeness join state the vendored SDK 0.1.0 and move with an amended SDK (each names this bead's
 * on-landing leg); R0's kind join states the SDK's ExecutionStatus kinds and moves with an amended SDK only when they move, as
 * the observer suite's tuple pins do; R0's T2 visit and declared joins read the declaration's Completeness, so they move with
 * it too, after the Completeness join (wb-50gc); K1, K2, C2, C3 and R0's other joins hold before and after it. Pure: no HX
 * binary, scratch directory, clock, network or file write; the only file read is the installed SDK declaration (by T1, R0
 * and, once each at module scope, DECLARED_VISITS and DECLARED_T2_VISITS). */
import {readFileSync} from 'node:fs';
import {
  type Completeness, type CoverageSummary, coverageSummaryOf, decodeResultStream, type ExecutionStatusKind, ProtocolError,
  resultFromJson, resultToJson,
} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, type JsonValue} from '../src/workbench/capability-registry.js';
import {HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';

type Json = {[key: string]: JsonValue};
/** The runtime identity of the measured live read (test/workbench-hyperunix-observer.test.ts BINARY). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const WS = '/srv/hx-not-applicable-ws';
const context: HyperUnixTopologyContext = {scope: {workspace: WS, principal: 'local-operator:tester'},
  target: {kind: 'hx.fs/regular-file', root: 'src'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z'};
/** Spellings a not-applicable value could take: the bead's own, the SDK's snake_case value style (TerminalStatus
 * established_empty, Truth known_absent), its camelCase field style, and the one-word form of the present Completeness values.
 * None is SDK 0.1.0 vocabulary. */
const NOT_APPLICABLE = ['not-applicable', 'not_applicable', 'notApplicable', 'inapplicable'] as const;
/** Every value CoverageSummary.completeness takes under the vendored SDK: an as-const roster, so R0 holds it exactly to
 * Completeness | null at type level and to the shipped declaration at run time. */
const PRE_EXISTING = ['complete', 'incomplete', 'unknown', null] as const satisfies readonly (Completeness | null)[];
/** The pre-existing values a coverage verdict frame can carry (T2's fixture-validity half): every PRE_EXISTING member but null. */
const FRAME_VALUES = PRE_EXISTING.filter((value): value is Completeness => value !== null);
/** The two HXS frames whose verdict carries completeness (T2), exactly the frame union verdictStream builds. */
const VERDICT_FRAMES = ['result-coverage', 'answer-coverage'] as const;
/** The fixture builder's frame union at run time (wb-50gc, the landing-813 F1 follow-up): an exhaustive record keyed by
 * verdictStream's frame parameter, so typing (typecheck:test) refuses a missing or an extra frame. Its keys, in their literal
 * order, are the frames DECLARED_T2_VISITS is built over and R0's frame and T2 joins read; neither reads VERDICT_FRAMES. */
const FRAME_UNION = {'result-coverage': true, 'answer-coverage': true} as const satisfies Record<Parameters<typeof verdictStream>[0], true>;
const MUTATION_KINDS: ReadonlySet<string> = new Set(['mutation-rejected', 'mutation-partial']);
/** The adapter's read kinds (its closed tuple as imported here, which R0 joins to the SDK ExecutionStatusKind and to the
 * installed declaration, as the observer suite pins the src export) and the two whose reading is complete
 * (hyperunix-observer.ts READING); R0 joins both, and MUTATION_KINDS, to hxLiveInvariant's own readings of the installed
 * declaration's kinds (wb-ey9p cut #2), so READ_KINDS's members are the declared kinds its read-outcome clause keeps. */
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION_KINDS.has(kind));
const COMPLETE_KINDS: ReadonlySet<string> = new Set(['complete', 'complete-empty']);
const LICENCES = [true, false] as const;
const KIND_REFUSAL = 'HyperUnix topology refused: source.execution_status.kind is not a vendored SDK ExecutionStatusKind.';
const TRIGGER = 'wb-tz2.4 trigger: the vendored @hyperunix/sdk Completeness vocabulary moved; give a not-applicable value its own '
  + 'adapter reading (the on-landing leg) before re-pinning this';
/** R0's Completeness join message (wb-aced F3): the join fails when a roster and the shipped declaration disagree, which an edit
 * of either side causes, so it names both causes and keeps the trigger's instruction for the second. */
const COMPLETENESS_JOIN = 'wb-tz2.4 R0 Completeness join: PRE_EXISTING or FRAME_VALUES disagrees with the installed @hyperunix/sdk '
  + 'Completeness declaration. Either the roster was edited (restore it to the shipped Completeness in declaration order, then '
  + 'null) or the SDK vocabulary moved (' + TRIGGER + ')';
/** R0's kind join message (wb-ey9p): the join fails when this file's HYPERUNIX_EXECUTION_KINDS binding and the ExecutionStatus
 * kinds of the installed declaration disagree, which an edit of either side causes, so it names both causes. */
const KIND_JOIN = 'wb-tz2.4 R0 kind join: HYPERUNIX_EXECUTION_KINDS as this file binds it disagrees with the ExecutionStatus '
  + 'kinds of the installed @hyperunix/sdk declaration (member for member, in declaration order). Either the binding was edited '
  + '(a shadow or rebinding of the import here, or an edit of the adapter tuple in src/workbench/hyperunix-observer.ts: restore '
  + 'the declared kinds in declaration order) or the SDK vocabulary moved (re-pin the adapter tuple and its H5 pins in '
  + 'test/workbench-hyperunix-observer.test.ts first)';
/** R0's visit join message (wb-ey9p cut #2): reached only once the kind join passed, so the binding holds the declared kinds and
 * yet the cells built through it differ from the same cells built over the declaration; it names both causes. */
const VISIT_JOIN = 'wb-tz2.4 R0 visit join: the cells C1, C2 and C3 must drive (EXPECTED_VISITS, built through READ_KINDS and '
  + 'the flatMap of HYPERUNIX_EXECUTION_KINDS as this file binds it) disagree with the same cells built over the ExecutionStatus '
  + 'kinds of the installed @hyperunix/sdk declaration, while the binding holds those kinds. Either its filter or flatMap hands on '
  + 'other kinds than its members (a shadow or rebinding of the import here, or an override in the adapter tuple in '
  + 'src/workbench/hyperunix-observer.ts: restore a plain tuple of the declared kinds) or EXPECTED_VISITS was edited';
/** R0's declared join message (wb-ey9p cut #3): DECLARED_VISITS, the anchor of the declared-visit guards of C1, C2 and C3, and
 * kindVisits over the reading of the declaration in R0 disagree, which an edit of either side causes. */
const DECLARED_JOIN = 'wb-tz2.4 R0 declared join: DECLARED_VISITS (the cells C1, C2 and C3 must drive, built by its own loops at '
  + 'module scope over the installed @hyperunix/sdk declaration) disagrees with kindVisits over the reading of that declaration '
  + 'in R0. Either DECLARED_VISITS, its loops or the reading it is built over was edited, or kindVisits or the reading in R0 was';
/** The declared-visit guard message (wb-ey9p cut #3): reached only once the case passed its EXPECTED_VISITS guard, so the case
 * drove what its entry there holds and yet not the cells the declaration defines; it names both causes. */
const DECLARED_VISIT = 'wb-tz2.4 declared-visit guard: the cells this case drove agree with its EXPECTED_VISITS entry but not '
  + 'with DECLARED_VISITS, the same cells built at module scope over the ExecutionStatus kinds of the installed @hyperunix/sdk '
  + 'declaration. Either the binding hands this kind loop, and the entry it built, other kinds than its members after R0 (a '
  + 'shadow or rebinding of HYPERUNIX_EXECUTION_KINDS here, or an override in the adapter tuple in '
  + 'src/workbench/hyperunix-observer.ts: restore a plain tuple of the declared kinds) or this case loop, its record or '
  + 'DECLARED_VISITS was edited';
/** R0's frame join message (wb-50gc): VERDICT_FRAMES and the keys of FRAME_UNION disagree, which an edit of either side
 * causes, so it names both causes. */
const FRAME_JOIN = 'wb-tz2.4 R0 frame join: VERDICT_FRAMES disagrees with the keys of FRAME_UNION, the frame union of the '
  + 'fixture builder (the frame parameter of verdictStream) as an exhaustive record, member for member and in order. Either '
  + 'the roster was edited (restore result-coverage, answer-coverage in that order) or FRAME_UNION or that frame union was';
/** R0's T2 visit join message (wb-50gc): reached only once the frozen shapes, the frame join and the Completeness join
 * passed, so VERDICT_FRAMES and FRAME_VALUES hold their members as R0 reads them, and yet T2's EXPECTED_VISITS entries,
 * built through them, differ from the same cells built over the keys of FRAME_UNION and the declaration; it names both
 * causes. */
const T2_VISIT_JOIN = 'wb-tz2.4 R0 T2 visit join: the cells T2 must drive (EXPECTED_VISITS.t2Refusals and .t2Validity, '
  + 'built through the flatMap of VERDICT_FRAMES and the map of NOT_APPLICABLE and FRAME_VALUES) disagree with the same cells '
  + 'built over the keys of FRAME_UNION and the Completeness of the installed @hyperunix/sdk declaration, while the rosters '
  + 'hold those members as R0 reads them. Either a roster hands its map or flatMap other members than it holds (own methods '
  + 'or a Proxy on VERDICT_FRAMES or on the derivation result of FRAME_VALUES: restore the plain literal and the plain '
  + 'filter) or EXPECTED_VISITS was edited';
/** R0's T2 declared join message (wb-50gc): DECLARED_T2_VISITS, the anchor of T2's declared-visit guard, and frameVisits
 * over the keys of FRAME_UNION and the reading of the declaration in R0 disagree, which an edit of either side causes. */
const T2_DECLARED_JOIN = 'wb-tz2.4 R0 T2 declared join: DECLARED_T2_VISITS (the cells T2 must drive, built by its own '
  + 'loops at module scope over the keys of FRAME_UNION, NOT_APPLICABLE and the installed @hyperunix/sdk declaration) '
  + 'disagrees with frameVisits over the same keys and the reading of that declaration in R0. Either DECLARED_T2_VISITS, '
  + 'its loops or the reading it is built over was edited, or frameVisits or the reading in R0 was';
/** T2's declared-visit guard message (wb-50gc): reached only once T2 passed its EXPECTED_VISITS guards, so T2 drove what
 * its entries there hold, and yet not the cells the frame union and the declaration define; it names both causes. */
const T2_DECLARED_VISIT = 'wb-tz2.4 T2 declared-visit guard: the cells T2 drove agree with its EXPECTED_VISITS entries '
  + 'but not with DECLARED_T2_VISITS, the same cells built at module scope over the keys of FRAME_UNION, NOT_APPLICABLE and '
  + 'the Completeness of the installed @hyperunix/sdk declaration. Either VERDICT_FRAMES or FRAME_VALUES hands the loops of '
  + 'T2, and the entries built through it, other members than it holds after R0 (own methods or a Proxy: restore the plain '
  + 'literal and the plain filter) or the loops of T2, its record or DECLARED_T2_VISITS was edited';
/** Each case's expected cell count, computed once here from the R0-pinned rosters, the module rosters and the imported
 * HYPERUNIX_EXECUTION_KINDS (wb-aced, the landing-696 F1 follow-up; the import pinned since wb-ey9p):
 * a case that rebinds a roster locally, or narrows the roster it iterates at its loop site, cannot move its own guard with it.
 * T2's refusal half keeps the absolute frame count (two verdict frames), which a widened VERDICT_FRAMES cannot follow; its
 * fixture-validity half has a guard of its own. These guards pin each case's cell count only; EXPECTED_VISITS pins the cells. */
const EXPECTED_CELLS = Object.freeze({
  t2Refusals: 2 * NOT_APPLICABLE.length,
  t2Validity: VERDICT_FRAMES.length * FRAME_VALUES.length,
  k1: NOT_APPLICABLE.length * LICENCES.length,
  k2: NOT_APPLICABLE.length * LICENCES.length,
  c1: NOT_APPLICABLE.length * READ_KINDS.length * LICENCES.length,
  c2Projected: NOT_APPLICABLE.length * (READ_KINDS.length * LICENCES.length - COMPLETE_KINDS.size),
  c2Refused: NOT_APPLICABLE.length * MUTATION_KINDS.size * LICENCES.length,
  c3: PRE_EXISTING.length * HYPERUNIX_EXECUTION_KINDS.length * LICENCES.length,
});
/** One driven cell as a case records it: its loop values, outermost first (C2 and C3 add the branch the cell took). */
type Visit = readonly (string | boolean | null)[];
/** The cells C1, C2 and C3 drive over an execution-kind roster, in order: C2 and C3 over every kind, C1 over the read kinds
 * (the kinds outside MUTATION_KINDS). C2 leaves out the cells it skips (the licence on a complete kind, where the runtime
 * itself licensed absence), as the case does. EXPECTED_VISITS builds these cells through the imported binding and READ_KINDS;
 * R0's visit join builds them again over the ExecutionStatus kinds of the installed declaration (wb-ey9p cut #2), and the two
 * builds must agree; DECLARED_VISITS builds the same cells once at module scope by loops of its own over the kinds it reads
 * from the declaration (wb-ey9p cut #3), and R0's declared join requires this build over the reading in R0 to equal it. */
function kindVisits(kinds: readonly string[], readKinds: readonly string[]): Record<'c1' | 'c2' | 'c3', Visit[]> {
  return {
    c1: NOT_APPLICABLE.flatMap(spelling => readKinds.flatMap(kind => LICENCES.map(licensed => [spelling, kind, licensed]))),
    c2: NOT_APPLICABLE.flatMap(spelling => kinds.flatMap(kind => LICENCES.flatMap((licensed): Visit[] => {
      if (MUTATION_KINDS.has(kind)) return [[spelling, kind, licensed, 'refused']];
      return licensed && COMPLETE_KINDS.has(kind) ? [] : [[spelling, kind, licensed, 'projected']];
    }))),
    c3: PRE_EXISTING.flatMap(value => kinds.flatMap(kind => LICENCES.map(licensed =>
      [value, kind, licensed, MUTATION_KINDS.has(kind) ? 'refused' : 'projected']))),
  };
}
/** The cells each case drives, in order, computed once here from the same R0-pinned rosters, the imported
 * HYPERUNIX_EXECUTION_KINDS included (wb-aced cut #2, the refusal-#1 U1 cure): each case records every innermost cell it
 * drives and compares the record with its entry after its count guard, so a case that drives other cells than these rosters
 * define (a roster rebound in its own scope, or a roster expression substituted, narrowed, widened or reordered at a loop
 * site) reds even when its cell count does not move. C1's, C2's and C3's entries are kindVisits over the binding and
 * READ_KINDS, which R0's visit join holds to kindVisits over the installed declaration's kinds as R0 reads them (wb-ey9p
 * cut #2); what C1, C2 and C3 drive is also held to DECLARED_VISITS when each case compares it (wb-ey9p cut #3). T2's two
 * entries are built through VERDICT_FRAMES's flatMap and NOT_APPLICABLE's and FRAME_VALUES's map, which R0's T2 visit join
 * holds to frameVisits over the keys of FRAME_UNION and the declaration's Completeness as R0 reads them; what T2 drives is
 * also held to DECLARED_T2_VISITS when T2 compares it (wb-50gc). */
const EXPECTED_VISITS: Readonly<Record<'t2Refusals' | 't2Validity' | 'k1' | 'k2' | 'c1' | 'c2' | 'c3', readonly Visit[]>> = Object.freeze({
  t2Refusals: VERDICT_FRAMES.flatMap(frame => NOT_APPLICABLE.map(spelling => [frame, spelling])),
  t2Validity: VERDICT_FRAMES.flatMap(frame => FRAME_VALUES.map(value => [frame, value])),
  k1: NOT_APPLICABLE.flatMap(spelling => LICENCES.map(licensed => [spelling, licensed])),
  k2: NOT_APPLICABLE.flatMap(spelling => LICENCES.map(licensed => [spelling, licensed])),
  ...kindVisits(HYPERUNIX_EXECUTION_KINDS, READ_KINDS),
});
/** The cells C1, C2 and C3 must drive (wb-ey9p cut #3, the refusal-#2 U1 and U2 cure), built once here at module scope, before
 * any case runs, over the ExecutionStatus kinds read from the installed declaration in declaration order, by loops of its own
 * in the cases' loop shape (not kindVisits): this build never reads the binding, its filter, flatMap or iteration. Each of the
 * three cases compares the record of what its own loops drove with its entry here after its EXPECTED_VISITS guard (the
 * declared-visit guard), so what the binding hands a case's kind loop is held when the case runs, even where it differs from
 * what R0 read (a handed cell that is an accessor or a reference the binding keeps and rewrites, an iteration switched by the
 * running test or by a count); it is frozen, cells included, so nothing writes into it once it is built; R0's declared join
 * requires kindVisits over the reading of the declaration in R0 to equal it. */
const DECLARED_VISITS = ((): Readonly<Record<'c1' | 'c2' | 'c3', readonly Visit[]>> => {
  const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
  const start = declaration.indexOf('export type ExecutionStatus =');
  const kinds = [...declaration.slice(start, declaration.indexOf('export type ExecutionStatusKind', start))
    .matchAll(/readonly kind: "([^"]+)";/g)].map(match => match[1]);
  const built: Record<'c1' | 'c2' | 'c3', Visit[]> = {c1: [], c2: [], c3: []};
  for (const spelling of NOT_APPLICABLE) {
    for (const kind of kinds) {
      if (MUTATION_KINDS.has(kind)) continue;
      for (const licensed of LICENCES) built.c1.push([spelling, kind, licensed]);
    }
  }
  for (const spelling of NOT_APPLICABLE) {
    for (const kind of kinds) {
      for (const licensed of LICENCES) {
        if (MUTATION_KINDS.has(kind)) built.c2.push([spelling, kind, licensed, 'refused']);
        else if (!(licensed && COMPLETE_KINDS.has(kind))) built.c2.push([spelling, kind, licensed, 'projected']);
      }
    }
  }
  for (const value of PRE_EXISTING) {
    for (const kind of kinds) {
      for (const licensed of LICENCES) built.c3.push([value, kind, licensed, MUTATION_KINDS.has(kind) ? 'refused' : 'projected']);
    }
  }
  for (const entry of [built.c1, built.c2, built.c3]) {
    for (const cell of entry) Object.freeze(cell);
    Object.freeze(entry);
  }
  return Object.freeze(built);
})();
/** The cells T2 drives over a frame roster and a completeness-value roster, in order (wb-50gc, the landing-813 F1
 * follow-up): for each frame, its refusal cells (the frame and each NOT_APPLICABLE spelling) and its validity cells (the
 * frame and each value), as T2 records them. R0 builds them over the keys of FRAME_UNION and its reading of the
 * declaration's Completeness and holds T2's EXPECTED_VISITS entries (the T2 visit join) and DECLARED_T2_VISITS (the T2
 * declared join) to them. */
function frameVisits(frames: readonly string[], values: readonly string[]): Record<'t2Refusals' | 't2Validity', Visit[]> {
  return {
    t2Refusals: frames.flatMap(frame => NOT_APPLICABLE.map(spelling => [frame, spelling])),
    t2Validity: frames.flatMap(frame => values.map(value => [frame, value])),
  };
}
/** The cells T2 must drive (wb-50gc, the landing-813 F1 follow-up: T2's two record halves held to a build outside the
 * rosters T2 iterates, as DECLARED_VISITS holds C1, C2 and C3), built once here at module scope, before any case runs, by
 * loops of its own in T2's loop shape over the keys of FRAME_UNION (the fixture builder's frame union), NOT_APPLICABLE and
 * the Completeness values read from the installed declaration in declaration order: this build never reads VERDICT_FRAMES
 * or FRAME_VALUES, their iteration, map or flatMap. T2 compares the record of what its own loops drove with its entries
 * here after its EXPECTED_VISITS guards (T2's declared-visit guard), so what those two rosters hand T2's loops is held when
 * T2 runs, even where it differs from what R0 read (an iteration switched by the running test, or entries rewritten through
 * a reference a roster keeps); it is frozen, cells included, so nothing writes into it once it is built; R0's T2 declared
 * join requires frameVisits over the keys of FRAME_UNION and the reading of the declaration in R0 to equal it. */
const DECLARED_T2_VISITS = ((): Readonly<Record<'t2Refusals' | 't2Validity', readonly Visit[]>> => {
  const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
  const completenessLine = declaration.split('\n').find(text => text.startsWith('export type Completeness =')) ?? '';
  const values = [...completenessLine.matchAll(/"([^"]+)"/g)].map(match => match[1]);
  const built: Record<'t2Refusals' | 't2Validity', Visit[]> = {t2Refusals: [], t2Validity: []};
  for (const frame of Object.keys(FRAME_UNION)) {
    for (const spelling of NOT_APPLICABLE) built.t2Refusals.push([frame, spelling]);
    for (const value of values) built.t2Validity.push([frame, value]);
  }
  for (const entry of [built.t2Refusals, built.t2Validity]) {
    for (const cell of entry) Object.freeze(cell);
    Object.freeze(entry);
  }
  return Object.freeze(built);
})();

/** The provider output shape of the measured live read (test/workbench-hyperunix-observer.test.ts measured()), with the
 * execution kind, the runtime licence and any further coverage_summary members set. */
function reading(kind: string, licensed: boolean, summary: Json = {}): Json {
  return {contract: 'hyperunix.find/v1',
    source: {representation: 'hyperunix.result/1', execution_status: {kind}, coverage_summary: {licenses_absence: licensed, ...summary},
      rows: [], rows_retained: true, operation: 'find'},
    workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}};
}
/** A hyperunix.result/1 document in the SDK's own representation, with the kind, licence and completeness set. */
function sdkDocument(kind: string, licensed: boolean, completeness: JsonValue): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [],
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'results'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind, diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 300, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: [], completeness, licenses_absence: licensed, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: null},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}};
}
/** What registerHyperUnixFind returns for a result the representation decoder rebuilt (resultToJson, JSON round trip). */
const providerReading = (document: Json): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
  source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}})) as JsonValue;
/** One HXS stream of three frames: the header, the coverage verdict frame under its mode, and the end frame. */
function verdictStream(frame: 'result-coverage' | 'answer-coverage', completeness: string): string {
  const line = (seq: number, kind: string, body: Json): string => JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq, kind, body});
  const verdict: Json = frame === 'result-coverage' ? {completeness, incomplete_regions: [], certificates: []}
    : {count: {$int: '0'}, ordered: true, completeness, incomplete_regions: [], certificates: []};
  return [line(0, 'header', {mode: frame === 'result-coverage' ? 'results' : 'observation', schema_requirements: []}),
    line(1, frame, verdict), line(2, 'end', {})].join('\n');
}
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected a refusal');
}
/** The primitive pass (wb-ey9p cut #4, the refusal-#3 U1-U3 cure): vitest's toStrictEqual asks a value that carries an
 * asymmetricMatch function whether it equals the other side before any type or value check, so a handed kind or cell, a
 * roster member or the binding itself could meet a join or a guard on its own verdict. primitiveView reads an array's members
 * by index, in order and recursively, keeps a primitive as it is and replaces any other value by a fresh marker object naming
 * its typeof, so two views agree only where both hold equal primitives or both hold non-primitives of one typeof, member by
 * member and in order: no object (a matcher, a boxed string, any other object or function) reads as the primitive it stands
 * for, and a view carries no protocol of its own. The joins and record guards the header names compare their two sides a
 * second time through it, after the first comparison and with its message. */
function primitiveView(value: unknown): unknown {
  if (Array.isArray(value)) {
    const members: readonly unknown[] = value;
    return Array.from({length: members.length}, (_, index) => primitiveView(members[index]));
  }
  return (typeof value === 'object' && value !== null) || typeof value === 'function' ? {nonPrimitive: typeof value} : value;
}

describe('wb-tz2.4 standing leg: a not-applicable value cannot silently read as a known verdict', () => {
  it('R0: every roster joins an anchor outside its own literal and the literal rosters hold a frozen shape, so no cell guard can move with an edited roster', () => {
    // The frozen shapes of the six literal rosters (wb-cpqb): an edit reds here before a cell count derived from it can follow.
    expect({NOT_APPLICABLE, PRE_EXISTING, VERDICT_FRAMES, MUTATION_KINDS: [...MUTATION_KINDS], COMPLETE_KINDS: [...COMPLETE_KINDS], LICENCES})
      .toStrictEqual({NOT_APPLICABLE: ['not-applicable', 'not_applicable', 'notApplicable', 'inapplicable'],
        PRE_EXISTING: ['complete', 'incomplete', 'unknown', null], VERDICT_FRAMES: ['result-coverage', 'answer-coverage'],
        MUTATION_KINDS: ['mutation-rejected', 'mutation-partial'], COMPLETE_KINDS: ['complete', 'complete-empty'], LICENCES: [true, false]});
    // The primitive pass of the frozen shapes (wb-ey9p cut #4): a roster that carries the asymmetricMatch protocol, on itself or
    // on a member, decides the comparison above on its own verdict; through primitiveView each roster holds its literal members.
    expect([NOT_APPLICABLE, PRE_EXISTING, VERDICT_FRAMES, [...MUTATION_KINDS], [...COMPLETE_KINDS], LICENCES].map(primitiveView))
      .toStrictEqual([['not-applicable', 'not_applicable', 'notApplicable', 'inapplicable'], ['complete', 'incomplete', 'unknown', null],
        ['result-coverage', 'answer-coverage'], ['mutation-rejected', 'mutation-partial'], ['complete', 'complete-empty'], [true, false]]);
    // Type level (typecheck:test): each closed roster is exactly its type, so a dropped member fails typing.
    expectTypeOf<(typeof PRE_EXISTING)[number]>().toEqualTypeOf<Completeness | null>();
    expectTypeOf<(typeof LICENCES)[number]>().toEqualTypeOf<CoverageSummary['licensesAbsence']>();
    expectTypeOf<(typeof VERDICT_FRAMES)[number]>().toEqualTypeOf<Parameters<typeof verdictStream>[0]>();
    expect(new Set(VERDICT_FRAMES).size).toBe(VERDICT_FRAMES.length);
    // The frame join (wb-50gc, the landing-813 F1 follow-up): VERDICT_FRAMES at run time is the keys of FRAME_UNION, the
    // fixture builder's frame union as an exhaustive record (exactly that union at type level), member for member and in
    // order; DECLARED_T2_VISITS and the T2 joins below read those keys, never VERDICT_FRAMES.
    expectTypeOf<keyof typeof FRAME_UNION>().toEqualTypeOf<Parameters<typeof verdictStream>[0]>();
    const frames = Object.keys(FRAME_UNION);
    expect(VERDICT_FRAMES, FRAME_JOIN).toStrictEqual(frames);
    expect(primitiveView(VERDICT_FRAMES), FRAME_JOIN).toStrictEqual(primitiveView(frames));
    // PRE_EXISTING is the shipped Completeness in declaration order and then null (CoverageSummary.completeness, T1).
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const declared = (alias: string): string[] => {
      const lines = declaration.split('\n').filter(text => text.startsWith(`export type ${alias} =`));
      expect(lines, alias).toHaveLength(1);
      return [...lines[0].matchAll(/"([^"]+)"/g)].map(match => match[1]);
    };
    const completeness = declared('Completeness');
    expect(PRE_EXISTING, COMPLETENESS_JOIN).toStrictEqual([...completeness, null]);
    expect(FRAME_VALUES, COMPLETENESS_JOIN).toStrictEqual(completeness);
    expect(primitiveView(PRE_EXISTING), COMPLETENESS_JOIN).toStrictEqual(primitiveView([...completeness, null]));
    expect(primitiveView(FRAME_VALUES), COMPLETENESS_JOIN).toStrictEqual(primitiveView(completeness));
    // HYPERUNIX_EXECUTION_KINDS as this file binds it (wb-ey9p): exactly the SDK ExecutionStatusKind at type level, and at run
    // time its members are the ExecutionStatus kinds of the installed declaration, member for member and in declaration order,
    // so an edit of its members or their order reds here before the joins below, EXPECTED_CELLS or EXPECTED_VISITS can move
    // with it; what its filter and flatMap hand on is held by the visit join and the READ_KINDS join below.
    expectTypeOf<(typeof HYPERUNIX_EXECUTION_KINDS)[number]>().toEqualTypeOf<ExecutionStatusKind>();
    const statusStart = declaration.indexOf('export type ExecutionStatus =');
    const statusEnd = declaration.indexOf('export type ExecutionStatusKind', statusStart);
    expect(statusStart, KIND_JOIN).toBeGreaterThanOrEqual(0);
    expect(statusEnd, KIND_JOIN).toBeGreaterThan(statusStart);
    const declaredKinds = [...declaration.slice(statusStart, statusEnd).matchAll(/readonly kind: "([^"]+)";/g)].map(match => match[1]);
    expect(HYPERUNIX_EXECUTION_KINDS, KIND_JOIN).toStrictEqual(declaredKinds);
    // Its primitive pass (wb-ey9p cut #4, refusal #3 U3): the binding's members read by index, so a binding that carries the
    // asymmetricMatch protocol cannot meet the join above on its own verdict.
    expect(primitiveView(HYPERUNIX_EXECUTION_KINDS), KIND_JOIN).toStrictEqual(primitiveView(declaredKinds));
    // The visit join (wb-ey9p cut #2, the refusal-#1 U1 and U2 cure): a binding, or the adapter tuple itself, can hold the
    // declared members while its filter or flatMap hands on other kinds. EXPECTED_VISITS's c1, c2 and c3 were built at module
    // scope through READ_KINDS (the binding's filter) and the binding's flatMap; built again here over the declared kinds they
    // must agree, member for member and in order, and C1, C2 and C3 compare what their own loops drive with the same entries.
    const {c1, c2, c3} = EXPECTED_VISITS;
    expect({c1, c2, c3}, VISIT_JOIN).toStrictEqual(kindVisits(declaredKinds, declaredKinds.filter(kind => !MUTATION_KINDS.has(kind))));
    const declaredCells = kindVisits(declaredKinds, declaredKinds.filter(kind => !MUTATION_KINDS.has(kind)));
    expect(primitiveView([c1, c2, c3]), VISIT_JOIN).toStrictEqual(primitiveView([declaredCells.c1, declaredCells.c2, declaredCells.c3]));
    // The declared join (wb-ey9p cut #3): DECLARED_VISITS, which C1, C2 and C3 compare what their loops drove with after their
    // EXPECTED_VISITS guards, built by its own loops over its own reading, equals kindVisits over this reading of the declaration.
    expect(DECLARED_VISITS, DECLARED_JOIN).toStrictEqual(kindVisits(declaredKinds, declaredKinds.filter(kind => !MUTATION_KINDS.has(kind))));
    expect(primitiveView([DECLARED_VISITS.c1, DECLARED_VISITS.c2, DECLARED_VISITS.c3]), DECLARED_JOIN)
      .toStrictEqual(primitiveView([declaredCells.c1, declaredCells.c2, declaredCells.c3]));
    // The T2 visit join and the T2 declared join (wb-50gc, the landing-813 F1 follow-up): T2's two EXPECTED_VISITS entries
    // were built at module scope through VERDICT_FRAMES's flatMap and NOT_APPLICABLE's and FRAME_VALUES's map, and
    // DECLARED_T2_VISITS by its own loops over the keys of FRAME_UNION, NOT_APPLICABLE and its own reading of the
    // declaration; frameVisits over those keys and this reading of the declaration's Completeness must equal both, member
    // for member and in order, and T2 compares what its own loops drive with both.
    const {t2Refusals, t2Validity} = EXPECTED_VISITS;
    const frameCells = frameVisits(frames, completeness);
    expect({t2Refusals, t2Validity}, T2_VISIT_JOIN).toStrictEqual(frameCells);
    expect(primitiveView([t2Refusals, t2Validity]), T2_VISIT_JOIN).toStrictEqual(primitiveView([frameCells.t2Refusals, frameCells.t2Validity]));
    expect(DECLARED_T2_VISITS, T2_DECLARED_JOIN).toStrictEqual(frameCells);
    expect(primitiveView([DECLARED_T2_VISITS.t2Refusals, DECLARED_T2_VISITS.t2Validity]), T2_DECLARED_JOIN)
      .toStrictEqual(primitiveView([frameCells.t2Refusals, frameCells.t2Validity]));
    // COMPLETE_KINDS is the adapter's own licensed reading; MUTATION_KINDS is its read-outcome clause and READ_KINDS the rest,
    // each read over the declared kinds (wb-ey9p cut #2), never through the binding's own filter.
    const readOutcome = declaredKinds.filter(kind => hxLiveInvariant(reading(kind, false)).violations.includes('read-outcome'));
    expect([...COMPLETE_KINDS]).toStrictEqual(declaredKinds.filter(kind => hxLiveInvariant(reading(kind, true)).absenceLicensed));
    expect([...MUTATION_KINDS]).toStrictEqual(readOutcome);
    expect(READ_KINDS).toStrictEqual(declaredKinds.filter(kind => !readOutcome.includes(kind)));
    expect(primitiveView(READ_KINDS)).toStrictEqual(primitiveView(declaredKinds.filter(kind => !readOutcome.includes(kind))));
    // LICENCES at run time too (wb-aced F2), so no annotation can hollow it beside its frozen literal: every licence's negation
    // is a licence (both boolean values are held), and hxLiveInvariant licenses absence on exactly COMPLETE_KINDS under the
    // first licence and on no kind under the second.
    for (const licensed of LICENCES) expect(LICENCES).toContain(!licensed);
    expect(LICENCES.map(licensed => declaredKinds.filter(kind => hxLiveInvariant(reading(kind, licensed)).absenceLicensed)))
      .toStrictEqual([[...COMPLETE_KINDS], []]);
    // NOT_APPLICABLE is the bead's own spelling, then its forms under the SDK styles this declaration witnesses: snake_case
    // values (TerminalStatus established_empty, Truth known_absent), camelCase fields (CoverageSummary licensesAbsence) and the
    // one-word in- form of a present Completeness value (incomplete beside complete).
    expect(declared('TerminalStatus')).toContain('established_empty');
    expect(declared('Truth')).toContain('known_absent');
    expect(declaration).toContain('readonly licensesAbsence: boolean;');
    expect(completeness.filter(value => completeness.includes(`in${value}`))).toStrictEqual(['complete']);
    const [own] = NOT_APPLICABLE;
    const [head, stem] = own.split('-');
    expect(NOT_APPLICABLE).toStrictEqual([own, `${head}_${stem}`, `${head}${stem.charAt(0).toUpperCase()}${stem.slice(1)}`, `in${stem}`]);
  });

  it('T1: the vendored SDK Completeness is exactly complete|incomplete|unknown, at type level and in its shipped declaration', () => {
    expectTypeOf<Completeness>().toEqualTypeOf<'complete' | 'incomplete' | 'unknown'>();
    expectTypeOf<CoverageSummary['completeness']>().toEqualTypeOf<Completeness | null>();
    // The tsc-free witness of the same two declarations, read from the installed SDK.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const completenessLines = declaration.split('\n').filter(text => text.startsWith('export type Completeness ='));
    expect(completenessLines, TRIGGER).toHaveLength(1);
    const declared = [...completenessLines[0].matchAll(/"([^"]+)"/g)].map(match => match[1]);
    expect(declared, TRIGGER).toStrictEqual(['complete', 'incomplete', 'unknown']);
    const start = declaration.indexOf('export interface CoverageSummary {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = declaration.slice(start, declaration.indexOf('\n}', start));
    expect(block.match(/readonly completeness: [^;]+;/g), TRIGGER).toStrictEqual(['readonly completeness: Completeness | null;']);
  });

  it('T2: the live decoder fails a stream whose coverage verdict carries the word as SDK_PROTOCOL_INCOMPATIBLE, and passes every pre-existing value verbatim', () => {
    const refusalVisits: Visit[] = [];
    const validityVisits: Visit[] = [];
    let validity = 0;
    let refusals = 0;
    for (const frame of VERDICT_FRAMES) {
      for (const spelling of NOT_APPLICABLE) {
        const error = thrown(() => decodeResultStream(verdictStream(frame, spelling)));
        expect(error, TRIGGER).toBeInstanceOf(ProtocolError);
        expect(error, TRIGGER).toMatchObject({code: 'SDK_PROTOCOL_INCOMPATIBLE', path: 'body.completeness'});
        refusalVisits.push([frame, spelling]);
        refusals++;
      }
      // The same stream with each pre-existing value decodes and its verdict reaches the summary as sent: the refusal above is
      // the vocabulary, never a malformed fixture.
      for (const value of FRAME_VALUES) {
        const {checker} = decodeResultStream(verdictStream(frame, value));
        expect(coverageSummaryOf([], checker, 'complete', []).completeness).toBe(value);
        validityVisits.push([frame, value]);
        validity++;
      }
    }
    expect(refusals).toBe(EXPECTED_CELLS.t2Refusals);
    expect(validity).toBe(EXPECTED_CELLS.t2Validity);
    expect(refusalVisits).toStrictEqual(EXPECTED_VISITS.t2Refusals);
    expect(validityVisits).toStrictEqual(EXPECTED_VISITS.t2Validity);
    expect(primitiveView(refusalVisits)).toStrictEqual(primitiveView(EXPECTED_VISITS.t2Refusals));
    expect(primitiveView(validityVisits)).toStrictEqual(primitiveView(EXPECTED_VISITS.t2Validity));
    // T2's declared-visit guard (wb-50gc, the landing-813 F1 follow-up): what T2's own loops drove, held a second time to
    // DECLARED_T2_VISITS, built at module scope over the keys of FRAME_UNION, NOT_APPLICABLE and the declaration's
    // Completeness, never through VERDICT_FRAMES or FRAME_VALUES.
    expect(refusalVisits, T2_DECLARED_VISIT).toStrictEqual(DECLARED_T2_VISITS.t2Refusals);
    expect(validityVisits, T2_DECLARED_VISIT).toStrictEqual(DECLARED_T2_VISITS.t2Validity);
    expect(primitiveView(refusalVisits), T2_DECLARED_VISIT).toStrictEqual(primitiveView(DECLARED_T2_VISITS.t2Refusals));
    expect(primitiveView(validityVisits), T2_DECLARED_VISIT).toStrictEqual(primitiveView(DECLARED_T2_VISITS.t2Validity));
  });

  it('K1: every spelling is outside the closed kind set, refused before projecting under either licence, and breaks the execution-kind clause', () => {
    const visits: Visit[] = [];
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      expect(HYPERUNIX_EXECUTION_KINDS).not.toContain(spelling);
      for (const licensed of LICENCES) {
        const error = thrown(() => hyperunixTopology(reading(spelling, licensed), context));
        expect(error).toBeInstanceOf(CapabilityError);
        expect(error).toMatchObject({category: 'validation', message: KIND_REFUSAL});
        expect(hxLiveInvariant(reading(spelling, licensed))).toStrictEqual({holds: false,
          violations: licensed ? ['execution-kind', 'licence-without-complete-kind'] : ['execution-kind'], absenceLicensed: false,
          versionClass: 'unstamped'});
        visits.push([spelling, licensed]);
        cells++;
      }
    }
    expect(cells).toBe(EXPECTED_CELLS.k1);
    expect(visits).toStrictEqual(EXPECTED_VISITS.k1);
    expect(primitiveView(visits)).toStrictEqual(primitiveView(EXPECTED_VISITS.k1));
  });

  it('K2: through the representation decoder the word as a kind rebuilds as protocol-failed, which stays a failure that never licenses absence', () => {
    const visits: Visit[] = [];
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      for (const licensed of LICENCES) {
        const rebuilt = providerReading(sdkDocument(spelling, licensed, 'complete'));
        expect(rebuilt).toMatchObject({source: {execution_status: {kind: 'protocol-failed'}, coverage_summary: {licenses_absence: licensed}}});
        expect(hyperunixTopology(rebuilt, context).snapshots[0]).toMatchObject({coverage: 'unknown',
          node: {statusTone: 'failure', statusText: 'protocol-failed'}});
        expect(hxLiveInvariant(rebuilt).absenceLicensed).toBe(false);
        visits.push([spelling, licensed]);
        cells++;
      }
    }
    expect(cells).toBe(EXPECTED_CELLS.k2);
    expect(visits).toStrictEqual(EXPECTED_VISITS.k2);
    expect(primitiveView(visits)).toStrictEqual(primitiveView(EXPECTED_VISITS.k2));
  });

  it('C1: the representation decoder keeps no spelling as a completeness value: each rebuilds as null, byte-identical to its null twin', () => {
    const visits: Visit[] = [];
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      expect(resultFromJson(sdkDocument('complete', true, spelling)).coverageSummary.completeness, TRIGGER).toBeNull();
      for (const kind of READ_KINDS) {
        for (const licensed of LICENCES) {
          expect(providerReading(sdkDocument(kind, licensed, spelling)), TRIGGER).toStrictEqual(providerReading(sdkDocument(kind, licensed, null)));
          visits.push([spelling, kind, licensed]);
          cells++;
        }
      }
    }
    expect(cells).toBe(EXPECTED_CELLS.c1);
    expect(visits).toStrictEqual(EXPECTED_VISITS.c1);
    expect(primitiveView(visits)).toStrictEqual(primitiveView(EXPECTED_VISITS.c1));
    expect(visits, DECLARED_VISIT).toStrictEqual(DECLARED_VISITS.c1);
    expect(primitiveView(visits), DECLARED_VISIT).toStrictEqual(primitiveView(DECLARED_VISITS.c1));
  });

  it('C2: a reading carrying the word past the decoder never reads complete, success or known-empty and never licenses absence without the runtime licence', () => {
    const visits: Visit[] = [];
    let projected = 0;
    let refused = 0;
    for (const spelling of NOT_APPLICABLE) {
      for (const kind of HYPERUNIX_EXECUTION_KINDS) {
        for (const licensed of LICENCES) {
          const value = reading(kind, licensed, {completeness: spelling});
          if (MUTATION_KINDS.has(kind)) {
            const error = thrown(() => hyperunixTopology(value, context));
            expect(error).toBeInstanceOf(CapabilityError);
            expect(error).toMatchObject({category: 'validation'});
            expect((error as Error).message).toContain('mutation');
            visits.push([spelling, kind, licensed, 'refused']);
            refused++;
            continue;
          }
          // With the licence on a complete kind the runtime itself licensed absence; every other cell must not read as one.
          if (licensed && COMPLETE_KINDS.has(kind)) continue;
          const [snapshot] = hyperunixTopology(value, context).snapshots;
          expect(snapshot.coverage).not.toBe('complete');
          expect(snapshot.node.statusTone).not.toBe('success');
          expect(snapshot.node.statusText).not.toContain('known-empty');
          expect(hxLiveInvariant(value).absenceLicensed).toBe(false);
          visits.push([spelling, kind, licensed, 'projected']);
          projected++;
        }
      }
    }
    expect(projected).toBe(EXPECTED_CELLS.c2Projected);
    expect(refused).toBe(EXPECTED_CELLS.c2Refused);
    expect(visits).toStrictEqual(EXPECTED_VISITS.c2);
    expect(primitiveView(visits)).toStrictEqual(primitiveView(EXPECTED_VISITS.c2));
    expect(visits, DECLARED_VISIT).toStrictEqual(DECLARED_VISITS.c2);
    expect(primitiveView(visits), DECLARED_VISIT).toStrictEqual(primitiveView(DECLARED_VISITS.c2));
  });

  it('C3: every pre-existing completeness value projects byte-identically to the completeness-free reading, for every kind and licence', () => {
    const visits: Visit[] = [];
    let cells = 0;
    for (const value of PRE_EXISTING) {
      for (const kind of HYPERUNIX_EXECUTION_KINDS) {
        for (const licensed of LICENCES) {
          const stated = reading(kind, licensed, {completeness: value});
          const bare = reading(kind, licensed);
          expect(hxLiveInvariant(stated)).toStrictEqual(hxLiveInvariant(bare));
          if (MUTATION_KINDS.has(kind)) {
            expect((thrown(() => hyperunixTopology(stated, context)) as Error).message)
              .toBe((thrown(() => hyperunixTopology(bare, context)) as Error).message);
            visits.push([value, kind, licensed, 'refused']);
          } else {
            expect(hyperunixTopology(stated, context)).toStrictEqual(hyperunixTopology(bare, context));
            visits.push([value, kind, licensed, 'projected']);
          }
          cells++;
        }
      }
    }
    expect(cells).toBe(EXPECTED_CELLS.c3);
    expect(visits).toStrictEqual(EXPECTED_VISITS.c3);
    expect(primitiveView(visits)).toStrictEqual(primitiveView(EXPECTED_VISITS.c3));
    expect(visits, DECLARED_VISIT).toStrictEqual(DECLARED_VISITS.c3);
    expect(primitiveView(visits), DECLARED_VISIT).toStrictEqual(primitiveView(DECLARED_VISITS.c3));
  });
});
