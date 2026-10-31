/**
 * wb-0lf.6 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R12, program-triage-2026-10-18 child of wb-0lf), the GP decision replay
 * census. Statement (the bead title, verbatim): "When Pi records GraphPolicyCLI decisions (artifact: released GP seam + a Pi
 * decision point), program, checkpoint, graph basis (snapshot digest) and source outcome shall be separate receipt fields from
 * which a replay reproduces the decision; a decision whose digest differs from the current basis is refused stale, a duplicate
 * replay is refused, and the slice-4 negative tests land before live use."
 * Acceptance (the owner filing's Acceptance sentence, verbatim, cut at "; " outside brackets into the labels of rows A1 to A5,
 * the last without its final period): "receipt rows carry programId, checkpointId, snapshotDigest and sourceOutcome as four
 * independent fields; a replay test reconstructs the recorded decision from those fields alone; a decision presented against a
 * snapshot digest other than the current basis is refused stale (never applied to the new basis); a second presentation of an
 * already-admitted decision id is refused duplicate; the four slice-4 negative tests (worker fault, stale basis, worker kill,
 * duplicate replay) are hermetic fixtures in the default gate before any live tier."
 * Standing anchors (the filing's Authority sentence after its dash, cut at ", " outside brackets into the labels of rows S1 to
 * S3, the last without its leading "and ", its pin @758ec18187a5 dropped): "a replayed or deserialized control decision is
 * already refused by isCoreMintedDecision (wb-pjj closed; docs/workbench/12-security.md:23), duplicate observation events never
 * double-count (docs/workbench/09-observation-and-provenance.md:88), and basis fields are kept distinct (docs/09 envelope
 * subjectBasis/definitionDigest/sourceVersion; wb-973.8 bundle vs graph digest)". The filing's own status: "Design-only; no Pi
 * surface named." Row T's label is the title's trigger, verbatim.
 *
 * MEASURED (read-only, 2026-10-28, by the cutting seats: cut #1 at trunk cf56481cd915 and again after its fast-forward to
 * df37dacef497; cut #2 re-measured every fact below on trunk e81d2b08eecf and again on 5fbe25ebea37, each merged into the
 * branch; cut #3 read them again, 2026-10-31, on trunk 5c577c97ca91 merged into the branch). At HEAD and at the Pi pin
 * 758ec18187a5 (its src tree read from git's objects): no src module spells GraphPolicyCLI, programId, checkpointId or
 * sourceOutcome (in any case or separator spelling the word reader reads), and exactly two spell snapshotDigest,
 * src/workbench/hosts/local-detached.ts and src/workbench/detached-observer.ts, both for the detached host's invocation-snapshot
 * identity digest (HOLDERS); line 23 of docs/workbench/12-security.md carries the isCoreMintedDecision sentence, the one
 * carrier of its "Authorization design" section, and line 88 of docs/workbench/09-observation-and-provenance.md the
 * duplicate-replay control, the one carrier of its "Acceptance/negative controls" section, and each of the two sections renders
 * at HEAD exactly as at the pin; the docs/09 envelope (proposal) declares subjectBasis and definitionDigest, and docs/09 names no
 * sourceVersion: the third name of the filing's parenthetical is src's, declared on its own line by src/workbench/observation.ts
 * three times (ObservationEvent, NativeSnapshot, ObservedNode); the export row of wb-pjj reads closed. The export row of wb-973.8
 * reads open at the pin and closed at HEAD (the bead closed after the pin). At HEAD only (the gp fixtures postdate the
 * pin): the vendored gp decision receipt (test/fixtures/gp-sample-receipt.json, gp sample's result.decision, wb-gxd7.5) records
 * program_digest, checkpoint_digest, graph_digest and sample.chosen_id as four separate members with four distinct string
 * values, its graph_digest is "sha256:" plus the sha256 of the exact bytes of test/fixtures/gp-host-adapter-snapshot.json
 * (wb-gxd7.3), and its chosen_id is one of its candidates; forge.toml's gate list is the gate key of its [build] table and runs
 * the test step, whose command is npm run test, the package script is vitest run with only the flags of A5c's closed list (no
 * config flag among them), the default config vitest.config.ts's include selects this file and its exclude does not name it,
 * no other vitest config file in the listing names this file or selects it by an include glob, and no forge.toml text holds a
 * GP word run (GraphPolicy, gp).
 *
 * No src module spells the vocabulary today, so none records GP decisions under its names. The census pins that (row T; a
 * module recording them under other names, the gp receipt's own member names among them, is not read: residual
 * R-REFERENT-NAMES) and an ARMED contract (rows A1 to A5) that binds the first record site to come, as the wb-0lf.4 and wb-0lf.7
 * censuses arm theirs:
 *  T, the trigger. T1: the src modules spelling a vocabulary member (VOCABULARY: the title's GraphPolicyCLI and the
 *    Acceptance's four camel-case members, each read as its run of words in a text split at every non-letter, non-digit
 *    character and at camel-case humps, lower-cased, so PROGRAM_ID and source-outcome read too) in git's would-commit listing
 *    under src/ are exactly the registered RECORD_SITES (empty) and the registered HOLDERS (both ways: a module that starts
 *    spelling must be registered, and a registered module that spells nothing is stale); the listing holds at least SRC_FLOOR
 *    files and the control core; every registered site must meet every check over the journal and the four negative fixtures
 *    (vacuous today). T2: the reader reads every member in planted text and no near token, and each holder spells exactly its
 *    registered members and carries its stated evidence line.
 *  A1 to A5, armed. The contract reads a record site as one decision host: basis(digest) moves the snapshot digest it holds
 *    current, present(presentation) answers one GP presentation at the decision point with a verdict (admitted, refused with a
 *    reason, or unavailable), rows() returns its receipt rows and applied() the decision ids it applied, in order. A receipt row
 *    is the record of an ADMITTED decision (this census's reading of an unpublished seam: a site whose own cut must take another
 *    shape, R4's rejection rows included, re-measures rows A1 to A5 with it). The synthetic GP is hermetic: two programs (the
 *    candidate feature each scores), two checkpoints (the sign each gives the score) and two snapshots, each named by
 *    "sha256:" plus the sha256 of its exact JSON bytes; a source outcome is the candidate with the highest score, ties to the
 *    codepoint-first id. The JOURNAL holds three basis events (ONE, TWO, then ONE again), five fresh presentations against the
 *    current basis (d1, d2 differing from d1 in its program alone, d3 in its checkpoint alone, d5 in its snapshot alone, and d8),
 *    one stale presentation (d6, against ONE while TWO is current; d8 later presents its fields under a fresh id once ONE is
 *    current again), two duplicate presentations against the current basis (d1 with its own fields, d2 with other fields) and
 *    two failed workers (d4 a worker fault, d7 a worker kill). The census's oracle reads each presentation's expectation from
 *    the journal alone: a presentation of an admitted id is a duplicate (and, against a moved basis, either refusal: row Q2),
 *    a re-presentation of a refused or unavailable id is unjudged (row Q3), a presentation against another digest than the
 *    current one is stale, a failed worker is unavailable, and every other presentation (a fresh one) is expected admitted: the
 *    checks judge its row, its replay and that it is refused neither stale nor duplicate, and read its verdict word no further.
 *    Five CHECKS, one per Acceptance clause, read every verdict and the rows() taken after every event through a JSON round
 *    trip, and the applied() ids taken after every event; the first two judge the rows after the last event, the other three
 *    every step:
 *    four-fields (every expected-admitted decision has a row, and every row naming one carries the four fields as own members,
 *    each a non-empty string, no two sharing a value), replay (each such row, replayed from its four fields alone in the
 *    synthetic GP's stores, which those field values key, resolves a program, a checkpoint and a snapshot, its replayed outcome
 *    is the row's, and the replayed decision is the admitted presentation's; a row naming no presented decision is a finding,
 *    and so is an application naming none, at any step), stale (a stale presentation's verdict is refused with the reason
 *    stale, a fresh presentation is never refused stale, and no row records a stale decision and applied() never holds it, at
 *    any step until its id is presented again), duplicate (a duplicate presentation's verdict is refused with the reason
 *    duplicate, it adds no row naming its id and no application of it, and a fresh presentation is never refused duplicate)
 *    and worker-failure (a failed worker's verdict is refused or unavailable, and no row records its decision and applied()
 *    never holds it, at any step until its id is presented again).
 *    The honest REFERENCE host meets every check over the journal and every fixture; each of the forty-one MUTANTS fails
 *    exactly its declared checks; every check is failed by some mutant and every check but four-fields by a mutant alone (each
 *    four-fields mutant leaves an expected-admitted decision without a replayable row, so it fails replay too). Eleven MUTANTS
 *    are TRANSIENT: each lists a row or an application only from the presentation it answers to the host's next event, and
 *    reads as the reference at the last step (the same verdicts, last rows and last applications: settledBy), so only a check
 *    that reads the affected step fails it: a phantom application d0 while the host answers the stale presentation
 *    (replay), the stale decision's row and its application (stale), a duplicate's extra row and its re-application at its
 *    duplicate step, at both duplicates (d1 at step 5, d2 at step 10) or at d2's only (duplicate), and a failed worker's row
 *    and its application at its own step, at both failed workers (d4 at step 6, d7 at step 11) or at d7's only
 *    (worker-failure). Six MUTANTS act at the later presentation only, d2's duplicate (presented with other fields than the
 *    admitted d2) and d7's worker kill: an admitted verdict, a transient row and a transient application at each. So a check
 *    that reads only the first duplicate's verdict, rows or applications, or skips a duplicate presented with other fields,
 *    or that reads only the first failed worker's verdict or window, misses one of them and reds this census (the gate's
 *    JMDF, JMD1 and JWF among such checks).
 *    A1 the honest rows, four-fields' reading of four planted rows (FIELD_CONTROLS) and the structural mutants; the pairs
 *    differing in one input differ in that field and the outcome only, a replay with one of d1's fields swapped for its pair's
 *    reads the pair's outcome, and the real gp receipt records the four as separate members. A2 the honest replays reconstruct
 *    every admitted presentation, and the value mutants (a checkpoint or digest read when rows() is read, a host action in place
 *    of the outcome) fail replay. A2b the replay input is the four fields alone, the snapshot store resolves a digest of exact
 *    bytes only, each unresolvable field reads its own reason, and an unprefixed digest, a row naming no presented decision and
 *    an application naming none fail replay, the last at any step (transient-phantom-application). A3 the stale verdict, and
 *    the mutants that apply, rebase or mistype a stale decision, never move the basis, refuse the first fresh decision after a
 *    move stale, apply a stale decision once the basis returns to its digest, apply one without a row, or record or apply one at
 *    its own step only (transient-stale-record, transient-stale-application). A4 the two duplicates and the mutants that
 *    re-admit, dedupe by content,
 *    answer admitted, re-apply, re-record the original row, refuse with the reason stale, or refuse a fresh decision duplicate
 *    for an admitted one's outcome on the same basis, or record or apply a duplicate only at its duplicate step, at both
 *    duplicates (transient-duplicate-record, transient-duplicate-application), and the three that act at d2's duplicate only:
 *    answer it admitted, or record or apply it only at its duplicate step (differing-duplicate-success,
 *    transient-differing-duplicate-record, transient-differing-duplicate-application). A5 the four NEGATIVE_FIXTURES, named as the clause names them: each a
 *    frozen in-memory journal with one decision the reference admits, met by the reference and failed by its member mutant
 *    through exactly its check, while seven more mutants (a row for a failed worker, an admitted verdict for one, and a row or
 *    an application of a failed worker's decision at its own step only: transient-failure-record, transient-failure-application;
 *    and the three that act at d7's worker kill only: an admitted verdict, or its row or its application at its own step only,
 *    kill-as-admitted, transient-kill-record, transient-kill-application) fail worker-failure over the journal; two runs of
 *    each fixture are identical, and every digest each presents resolves in the
 *    in-memory store. A5c the default gate: forge.toml's gate list (the gate key of its [build] table) and its test step's
 *    command; the package test script read against a closed flag list (vitest run with only reporter, outputFile,
 *    includeTaskLocation and expect.requireAssertions flags: any other flag or argument, a config, root, filter or exclude among
 *    them, reads as no default run, and four in-memory script plants, -c, --config=, a positional file and --exclude=, each read
 *    so); the default config's include and exclude; no forge.toml GP word run; and no other vitest config file in the listing (a
 *    file named vitest.config or vitest.<name>.config with a ts, mts, cts, js, mjs or cjs extension, read by its base name at
 *    any depth, the plants pinning depths 0 to 3) that names
 *    this file's base name or selects it by an include list of string literals, its globs read with * and ** only, where ten
 *    in-memory config plants read nine claiming it and a census-only control that does not: root .mts, named nested .ts,
 *    glob .ts, .js/.mjs/.cjs/.cts and nameless nested .ts two and three directories deep. Each plant's path reads through the
 *    same otherConfigs predicate as the listing. Narrowing it to root-only, excluding the js family (including an exclusion in
 *    otherConfigs' own body), excluding the c family, requiring a name segment or dropping files deeper than two directories
 *    (the gate's FXDEPTH) reds a plant; the listing call has no plant (NOT CLAIMED).
 *  S1 to S3, the standing anchors, each row's text pins read at the pin and at HEAD and its drive at HEAD: S1 the real
 *    control core mints a permit that isCoreMintedDecision accepts while its spread copy, its JSON round trip and its
 *    structured clone are refused, a GP receipt row is no minted decision, and the docs anchor and the export rows of wb-pjj;
 *    S2 the real projection answers a replayed event duplicate and an older one out-of-order with one node, two events and no
 *    status regression, and the docs anchor; S3 the real projection keeps subjectBasis, sourceVersion and definitionDigest as
 *    three members (a later event moving the digest alone moves that member alone) and cohorts a snapshot by its stated
 *    sourceVersion over its sourceRevision and by its sourceRevision when it states no version (the projection rule wb-973.8's
 *    bundle-over-graph cohort rides), and the docs/09 envelope's members, src's declarations and the export rows of wb-973.8.
 *    S1b and S2b read their docs anchors (DOCS_ANCHORS) in the rendered view (docsSection and sectionMatches of
 *    test/helpers/census.ts, over marked's lexer): an anchor's section is its level-2 heading, which must occur exactly once in
 *    the rendered view and sit under its page's level-1 title, bounded at the next level-1 or level-2 heading. At the pin the
 *    section carries no HTML, exactly one of its prose items (a paragraph or a list item) carries the anchor's marker words,
 *    that item renders exactly the census's carrier text (S1b's carrier holds CONTROL_UNMINTED_REASON, read from src), and the
 *    filing's line is that item's source; the line reads are kept beside it (S1b: line 23 at the pin holds the backticked
 *    isCoreMintedDecision, the deserialized or audit/journal-replayed receipt and the quoted reason; S2b: line 88 at the pin is
 *    the control). At HEAD the section carries no HTML, the same one item renders the same text, and the whole section renders
 *    block for block as the pin's (sectionMatches: each block's kind and rendered text, and each paragraph's and list item's
 *    source with its whitespace collapsed), so at HEAD anchorReading compares the section rather than the pin's line, and a later edit of
 *    either section that changes those blocks reds this census until it is re-measured (a whitespace edit that leaves each
 *    block's kind, rendered text and collapsed source as they were changes none of them: a re-wrapped or re-spaced line, or a
 *    blank line between list items, as the gate's GD12 to GD14). Three controls read at the pin (the anchor's line moved one
 *    down, the anchor's carrier text edited, and the pin's text with the carrier's source line doubled) each read their own
 *    reason, and seven in-memory plants over the HEAD text (DOCS_PLANTS: the gate's D1 to D5 as its refusal record describes
 *    them, D6 a second "Authorization design" section at the end of the page, D7 a level-1 heading re-homing the controls
 *    section) each read the reason pinned for it. A plant edits the HEAD page at that page's own sites, never at the pin's line:
 *    D1 to D4 at the section's own carrier source (ownSource: the whole lines of the page its one marker-carrying prose item
 *    spans, its list marker kept even when the marker and prose occupy different lines, found by that item's source words
 *    with any whitespace run between them), D5 and D7 at the
 *    line that renders the heading (headingLine: its words with any spacing, any whitespace but a line break, around and
 *    between them), edited as that whole line (line-anchored: a longer line that contains it, a level-3 heading of the same
 *    words among them, is never the site), and D6 at the page's end; a plant whose site or edit pattern does not occur
 *    exactly once reads needle-miss, its own reason, at the witness compare, never a throw before it. The in-memory HEAD
 *    re-spacing control, not a claim that every whitespace rewrite of the on-disk page leaves every other reader unchanged,
 *    witnesses the sites and their plant readings: the HEAD page re-spaced at its plants' sites (its carrier re-wrapped across
 *    two lines, broken at
 *    the first space from its middle on with the continuation indented under its list marker; its heading's line re-spaced,
 *    with the run of blank lines after it dropped, a page with none dropping nothing; every line break written CRLF) reads
 *    holds and each plant over it its pinned reason.
 *    A second HEAD control with its carrier's source doubled reads each carrier plant needle-miss (D5 there reads carriers:2, D6
 *    unbound:repeated and D7 unbound:parent). A third HEAD control reads three pages as holding sections with the same plant
 *    reasons: the carrier's list marker moved to a line of its own (checking the marker is kept at the start of the carrier
 *    site), the run of blank lines after the heading's line dropped (a page with none dropping nothing, so the control needs
 *    no blank line on disk), and the heading's first between-word space doubled. Every reading above (the page, its plants
 *    and the three HEAD controls) is read again over three HEAD variants and pinned to the HEAD page's own: the run of blank
 *    lines after the heading's line dropped, that run replaced by one line of spaces and a tab, and a level-3 heading of the
 *    same words added at the page's end (the gate's GW7/GW7b, GWWS/GWWSb and GWL3/GWL3b, in memory); each variant is built
 *    at the heading's whole line, so none needs the on-disk blank line. An edit that leaves a section holding while a site
 *    stops occurring exactly once in its page reds this census at every reading that plants or builds at that site until it
 *    is re-measured: the carrier's source words repeated elsewhere in the page (the carrier plants and every HEAD control,
 *    over the page and over each variant), and the heading's line repeated inside a code fence or an HTML comment, the
 *    heading closed with a run of hashes, or the heading rewritten setext-style, which leaves no ATX heading line (the D5/D7
 *    heading plants over the page and over the doubled control, the re-spacing and third controls, and the variants: the
 *    gate's GE2, GE3, GW14 and GW15). These reds are disclosed, not claimed as semantic section reds.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, the checks, every mutant with its
 * failed checks, the journal, the oracle's expectations, the fixtures, the vocabulary, the fields, the reasons, the holders, the
 * docs anchors and plants, the default-gate plants (each config plant's include list and spacing, each script plant's first
 * refused argument) and each residual family's member count as literals. OUTSIDE ANCHORS (their
 * own registered case): the bead's own row in the tracker export (.beads/issues.jsonl): the title opens with the requirement id
 * and carries row T's label before its artifact parenthetical and names exactly the vocabulary's first member; the first notes
 * line opening "Citation: " holds the Authority sentence, whose three clauses after its dash are exactly the labels of rows S1
 * to S3 and whose pin is the census's, the Acceptance sentence, whose five clauses are exactly the labels of rows A1 to A5 (one
 * check each), whose camel-case members are exactly FIELDS (the vocabulary's other four members), whose "is refused" words are
 * exactly REASONS and whose fifth clause's parenthetical names exactly the four fixtures, and the slice-4 citation, whose four
 * members each end its fixture's name; each docs anchor's page and line are the page and line its row's label cites; each row's
 * pin quotes, joined by single spaces, are its label (the tiling: it binds which words of a label its pins cover, never where
 * one pin's quote ends and the next begins). A tracker note appended later (a delivery, gate or park note) sits on a line of
 * its own and binds nothing. So row T, a row of A1 to A5 or S1 to S3, a clause or a check removed from every literal of this
 * file still reds, and so does a pin of those rows removed from every literal together with its quote (its label's tiling
 * breaks); a pin merged into a neighbouring pin of its row leaves every anchor whole and is NOT CLAIMED (below). The last case
 * reads the vitest task tree (every registered test, in order, in run mode, ran before it) and REACHED (every pin reached its
 * witness compare, and each compare held).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included); real-file
 * CRLF rewrites of docs/09 or docs/12 (other readers and the pin-side line reads can red them; the in-memory re-spacing
 * control above tests its plants and section read on CRLF, not the whole file's other readings); the seam's
 * actual shape (the decision host above is this census's reading); the Furnace design text the filing cites (decisions:11,
 * README.md:25 and README.md:20 at Furnace 0f791db71b9d are outside this repository; only the slice-4 quote's four members are
 * held, to the fixtures); how many rows an admitted decision gets and whether a refusal keeps a row (R4's one row per decision,
 * wb-0lf.4; this census reads rows() as admitted decisions only); how many applications an admitted decision gets (none, or
 * more than one: at its own step, at a later fresh, stale or failed presentation or at a basis move, the gate's PA9, PA10,
 * PA11 and PA24), beyond the duplicate check's reading that a duplicate presentation adds no application of its id, so an
 * application under an id equal to an admitted decision's reads as that decision's re-application, which no check reads; the
 * order of rows and applications; a duplicate presented
 * against a moved basis beyond row Q2; a re-presentation of a refused or unavailable id beyond row Q3; a fresh presentation's
 * verdict word beyond the two refusals (a fresh decision answered unavailable, or refused for another reason, while its row and
 * its application stand reads honest: the gate's PA7); a failed worker's cause (worker fault and worker kill are two fixtures;
 * the check reads both as one class); a site host's own purity (the fixtures are hermetic, and the census does not intercept a
 * host's clock, file, process or network use); a GP live tier added later (A5c reads forge.toml and the vitest configs at
 * HEAD), and a config edit that drops this file from the default tier (an include or exclude change) stops it from running at
 * all, so A5c cannot red that edit; A5c's git listing itself (listed: tracked and untracked files, never ignored ones) and a
 * listing call that stops reading through otherConfigs (the config plants read the filter, never the call); a vitest config
 * selecting this file through a computed include, a glob form beyond * and
 * ** (braces, character classes, ?), a projects list or a workspace file, and a config file named otherwise than
 * vitest.config or vitest.<name>.config (one a tier names by --config under any other name); a mutant, a journal event or a
 * planted control removed from its table and the frozen literal together while every check keeps a mutant; a docs plant, a
 * docs control or a HEAD variant swapped for another edit that reads the same pinned reason, and a docs control or a HEAD
 * variant removed from its witness and its pinned reading together (the docs plants are pinned by id, anchor and reason,
 * never by their edits, and no source outside this file names the controls or the variants: a re-spacing control that keeps
 * the blank run, a blank-run edit that drops one blank line only or reads only an empty line as blank, and a level-3 variant
 * left as the HEAD page each read 0 failed | 29 passed); a pin merged into a neighbouring
 * pin of its row in every literal (its quote joined to the neighbour's, its case dropped, its row's count lowered in the frozen
 * literal: the gate's GH1, A5b into A5a, and GH2, S1b into S1a, each read 0 failed | 27 passed on cut #1; on cut #2 GH1 reads
 * 0 failed | 28 passed, and the plain GH2 reds the frozen-shape case alone, its docs anchor left without its pin), since the
 * bead export binds each label's coverage by its pin quotes and no source outside this file fixes how the quotes partition a
 * label; a pin
 * case body replaced by a compare of values it did not read (the gate's TL2 and TL3, a witness of two equal literals), since
 * REACHED reads that every pin reached a compare that held, never what the compare read; row Q, a row Q pin (a residual family:
 * the gate's GH3 removed Q2) or a residual member removed from every literal (no source outside this cut names the residual
 * families before its delivery note lands).
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row): R-SPELLING
 * (Q1, a vocabulary spelling the word reader does not read: a member composed at run time from pieces that split inside one of
 * its words, one spelled with escapes, the shortened name GraphPolicy, the word gp, and a member whose words run together with
 * no separator or hump between two of them, as programid, PROGRAMID, GRAPHPOLICYCLI and GRAPHPOLICY_CLI, the gate's W1, W2, W4
 * and W5; pieces split at a camel-case hump read as the member's own words, a T2 reader control), R-PRECEDENCE (Q2, a second
 * presentation of an admitted decision against a moved basis: both of A3's and A4's conditions hold and the clauses set no
 * precedence, so either refusal reads honest, while admitting it again, with or without a row, still fails duplicate),
 * R-REPRESENTED (Q3, a re-presentation of a stale-refused id against the current basis: the clauses neither admit nor refuse
 * it, so admitting it and refusing it both read honest), R-SAMPLED-REPLAY (Q4, a sampled decision's replay inputs beyond the
 * four fields: the real gp receipt records its sample's rng state and its candidates, and the synthetic GP draws no sample, so
 * a row carrying them is read like any other), R-SIDE-RECORD (Q5, an application kept outside applied(): the checks read
 * verdicts, rows() and applied() only), R-HOLDER-REUSE (Q6, a registered holder's further use of its own registered member
 * reads as the same spelling, so a GP use of snapshotDigest inside a holder is not told apart) and R-REFERENT-NAMES (Q7, a
 * decision record spelled in the gp receipt's own member names, program_digest, checkpoint_digest, graph_digest and
 * sample.chosen_id, and no vocabulary member, the gate's W8: the trigger reads the vocabulary only).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, seam, worker or fake binary; every
 * journal event, program, checkpoint and snapshot is synthetic, and the real gp receipt and snapshot fixtures are read only.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it } from "vitest";
import { CONTROL_UNMINTED_REASON, decideControl, isCoreMintedDecision, type NativeControlRequest } from "../src/workbench/control.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { docsSection, type RenderedBlock, sectionMatches } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.6";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R12";
const SUITE = `gp decision replay census (${BEAD}, ${REQUIREMENT}; synthetic decision journal)`;
/** This file, by its repository path (A5c reads the default gate's selection of it). */
const SELF = "test/workbench-gp-decision-replay-census.test.ts";
const EXPORT = ".beads/issues.jsonl";
/** The bead's Pi pin (the filing's "@758ec18187a5"), full. */
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const CORE = "src/workbench/control.ts";
const SECURITY_DOC = "docs/workbench/12-security.md";
const OBSERVATION_DOC = "docs/workbench/09-observation-and-provenance.md";
const OBSERVATION_SRC = "src/workbench/observation.ts";
/** The vendored gp decision receipt (wb-gxd7.5) and the snapshot whose exact bytes its graph_digest names (wb-gxd7.3). */
const GP_RECEIPT = "test/fixtures/gp-sample-receipt.json";
const GP_SNAPSHOT = "test/fixtures/gp-host-adapter-snapshot.json";
const FORGE = "forge.toml";
const PACKAGE = "package.json";
const VITEST_CONFIG = "vitest.config.ts";
/** src holds well over this many files; fewer means the listing found nothing. */
const SRC_FLOOR = 100;
const LIVE_BUDGET_MS = 120_000;

/** The trigger's names: the title's GraphPolicyCLI and the Acceptance's four camel-case members (all held to the export). */
const VOCABULARY = ["GraphPolicyCLI", "programId", "checkpointId", "snapshotDigest", "sourceOutcome"] as const;
/** The four receipt fields, in the Acceptance's order (the vocabulary's other four members). */
const FIELDS = ["programId", "checkpointId", "snapshotDigest", "sourceOutcome"] as const;
type Field = (typeof FIELDS)[number];
/** The refusal reasons the Acceptance names ("is refused stale", "is refused duplicate"). */
const REASONS = ["stale", "duplicate"] as const;
type Reason = (typeof REASONS)[number];
/** The GP word runs A5c reads in forge.toml: a GP live tier would name one. */
const GP_TIER_NAMES = ["GraphPolicy", "gp"] as const;

type Row = Record<string, unknown>;
const isObject = (value: unknown): value is Row => typeof value === "object" && value !== null && !Array.isArray(value);
const member = (value: unknown, key: string): unknown => (isObject(value) && Object.hasOwn(value, key) ? value[key] : undefined);
/** Freezes a value and everything it holds, so a fixture is data no run can change. */
function frozen<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const item of Object.values(value)) frozen(item);
    Object.freeze(value);
  }
  return value;
}
const deepFrozen = (value: unknown): boolean => typeof value !== "object" || value === null || (Object.isFrozen(value) && Object.values(value).every(deepFrozen));

/** src modules that spell a vocabulary member for another purpose, each with exactly the members it spells and its evidence. */
interface Holder { readonly module: string; readonly members: readonly string[]; readonly evidence: string; readonly reason: string }
const HOLDERS: readonly Holder[] = [
  {
    module: "src/workbench/detached-observer.ts", members: ["snapshotDigest"], evidence: "sourceRevision: receipt.snapshotDigest",
    reason: "the detached receipt's invocation-snapshot identity digest, read as the snapshot's sourceRevision",
  },
  {
    module: "src/workbench/hosts/local-detached.ts", members: ["snapshotDigest"], evidence: 'identityDigest("invocation-snapshot", actual) !== boot.snapshotDigest',
    reason: "the detached host's invocation-snapshot identity digest (boot, handshake and receipt)",
  },
];

/** One snapshot candidate and the two features the synthetic programs score. */
interface Candidate { readonly id: string; readonly x: number; readonly y: number }
interface Snapshot { readonly schema: string; readonly candidates: readonly Candidate[] }
type Feature = "x" | "y";
/** The synthetic programs (the feature each scores) and checkpoints (the sign each gives the score), by id. */
const PROGRAMS: ReadonlyMap<string, Feature> = new Map<string, Feature>([["program-x", "x"], ["program-y", "y"]]);
const CHECKPOINTS: ReadonlyMap<string, number> = new Map<string, number>([["checkpoint-up", 1], ["checkpoint-down", -1]]);
const SNAPSHOT_ONE: Snapshot = frozen({
  schema: "census.gp-snapshot.v1", candidates: [{ id: "exec-a", x: 3, y: 1 }, { id: "exec-b", x: 1, y: 3 }, { id: "exec-c", x: 0, y: 2 }],
});
const SNAPSHOT_TWO: Snapshot = frozen({
  schema: "census.gp-snapshot.v1", candidates: [{ id: "exec-a", x: 1, y: 2 }, { id: "exec-b", x: 0, y: 0 }, { id: "exec-c", x: 3, y: 1 }],
});
/** The exact bytes a host presents for a snapshot, and their digest (the gp graph_digest form). */
const bytesOf = (snapshot: Snapshot): string => JSON.stringify(snapshot);
const digestOf = (bytes: string | Buffer): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const ONE = digestOf(bytesOf(SNAPSHOT_ONE));
const TWO = digestOf(bytesOf(SNAPSHOT_TWO));
/** The snapshot store a replay reads: every snapshot the journals present, by the digest of its exact bytes. */
const SNAPSHOTS: ReadonlyMap<string, Snapshot> = new Map<string, Snapshot>([[ONE, SNAPSHOT_ONE], [TWO, SNAPSHOT_TWO]]);
/** The synthetic GP: the program's feature times the checkpoint's sign, the highest score first, ties to the codepoint-first id. */
function evaluate(feature: Feature, sign: number, snapshot: Snapshot): string {
  const ranked = [...snapshot.candidates].sort((a, b) => sign * b[feature] - sign * a[feature] || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return ranked[0]?.id ?? "";
}

/** The four fields of one GP decision. */
interface Decision { readonly programId: string; readonly checkpointId: string; readonly snapshotDigest: string; readonly sourceOutcome: string }
interface BasisEvent { readonly kind: "basis"; readonly snapshotDigest: string }
/** A presentation the synthetic GP answered: its source outcome is the GP's own evaluation over the snapshot its digest names. */
interface PresentedEvent extends Decision { readonly kind: "presented"; readonly decision: string }
/** A presentation whose worker faulted or was killed: no source outcome. */
interface FailedEvent {
  readonly kind: "failed"; readonly decision: string; readonly programId: string; readonly checkpointId: string; readonly snapshotDigest: string;
  readonly worker: "fault" | "kill";
}
type GpPresentation = PresentedEvent | FailedEvent;
type JournalEvent = BasisEvent | GpPresentation;
const basis = (snapshotDigest: string): BasisEvent => ({ kind: "basis", snapshotDigest });
function presented(decision: string, programId: string, checkpointId: string, snapshotDigest: string): PresentedEvent {
  const feature = PROGRAMS.get(programId);
  const sign = CHECKPOINTS.get(checkpointId);
  const snapshot = SNAPSHOTS.get(snapshotDigest);
  if (feature === undefined || sign === undefined || snapshot === undefined) throw new Error(`no synthetic GP answer for ${decision}`);
  return { kind: "presented", decision, programId, checkpointId, snapshotDigest, sourceOutcome: evaluate(feature, sign, snapshot) };
}
function failed(decision: string, programId: string, checkpointId: string, snapshotDigest: string, worker: "fault" | "kill"): FailedEvent {
  return { kind: "failed", decision, programId, checkpointId, snapshotDigest, worker };
}
const decisionOf = (event: Decision): Decision => ({
  programId: event.programId, checkpointId: event.checkpointId, snapshotDigest: event.snapshotDigest, sourceOutcome: event.sourceOutcome,
});

/** The synthetic journal every host is judged over. */
const JOURNAL: readonly JournalEvent[] = frozen([
  basis(ONE),
  presented("d1", "program-x", "checkpoint-up", ONE),
  presented("d2", "program-y", "checkpoint-up", ONE),
  presented("d3", "program-x", "checkpoint-down", ONE),
  presented("d1", "program-x", "checkpoint-up", ONE),
  failed("d4", "program-x", "checkpoint-up", ONE, "fault"),
  basis(TWO),
  presented("d5", "program-x", "checkpoint-up", TWO),
  presented("d6", "program-y", "checkpoint-down", ONE),
  presented("d2", "program-y", "checkpoint-down", TWO),
  failed("d7", "program-y", "checkpoint-up", TWO, "kill"),
  basis(ONE),
  presented("d8", "program-y", "checkpoint-down", ONE),
]);

const CHECKS = ["four-fields", "replay", "stale", "duplicate", "worker-failure"] as const;
type Check = (typeof CHECKS)[number];
/** Each Acceptance clause's one check, by row. */
const CHECK_OF: Readonly<Record<string, Check>> = { A1: "four-fields", A2: "replay", A3: "stale", A4: "duplicate", A5: "worker-failure" };

/** The slice-4 negative tests (row A5): each a frozen in-memory journal, the mutant it fails and the check that fails it. */
interface Fixture { readonly name: string; readonly journal: readonly JournalEvent[]; readonly member: Twist; readonly check: Check }
const NEGATIVE_FIXTURES: readonly Fixture[] = frozen([
  {
    name: "worker fault", member: "fault-admitted", check: "worker-failure",
    journal: [basis(ONE), presented("f1", "program-x", "checkpoint-up", ONE), failed("f2", "program-y", "checkpoint-up", ONE, "fault")],
  },
  {
    name: "stale basis", member: "apply-stale", check: "stale",
    journal: [basis(ONE), basis(TWO), presented("s1", "program-x", "checkpoint-up", ONE), presented("s2", "program-x", "checkpoint-up", TWO)],
  },
  {
    name: "worker kill", member: "kill-admitted", check: "worker-failure",
    journal: [basis(ONE), failed("k1", "program-x", "checkpoint-down", ONE, "kill"), presented("k2", "program-x", "checkpoint-down", ONE)],
  },
  {
    name: "duplicate replay", member: "readmit", check: "duplicate",
    journal: [basis(ONE), presented("r1", "program-y", "checkpoint-up", ONE), presented("r1", "program-y", "checkpoint-up", ONE)],
  },
]);
/** Q2's journal: an admitted decision presented again against a moved basis. */
const PRECEDENCE_JOURNAL: readonly JournalEvent[] = frozen([
  basis(ONE), presented("p1", "program-x", "checkpoint-up", ONE), basis(TWO), presented("p1", "program-x", "checkpoint-up", ONE),
]);
/** Q3's journal: a stale-refused id presented again against the current basis. */
const REPRESENTED_JOURNAL: readonly JournalEvent[] = frozen([
  basis(ONE), basis(TWO), presented("q1", "program-x", "checkpoint-up", ONE), presented("q1", "program-x", "checkpoint-up", TWO),
]);

/** A host's answer to one presentation. */
interface Verdict { readonly verdict: "admitted" | "refused" | "unavailable"; readonly reason?: string }
/** A record site's decision host, as the armed contract reads one. */
interface DecisionHost {
  basis(snapshotDigest: string): void;
  present(presentation: GpPresentation): Verdict;
  rows(): readonly unknown[];
  applied(): readonly string[];
}
/** A src module that records GP decisions, with the host it opens. */
interface RecordSite { readonly module: string; readonly open: () => DecisionHost }
/** The registry: every src module spelling the vocabulary is a site here or a holder above. Empty today. */
const RECORD_SITES: readonly RecordSite[] = [];

/** The ways a host departs from the reference: each mutant is one, and the residual plants are the rest. */
type Twist =
  | "combined-basis" | "nested-fields" | "missing-outcome" | "aliased-checkpoint" | "lazy-checkpoint" | "lazy-digest" | "unprefixed-digest"
  | "mapped-outcome" | "apply-stale" | "rebase-stale" | "untyped-stale" | "frozen-basis" | "settling-stale" | "retry-stale"
  | "silent-apply-stale" | "readmit" | "content-dedupe" | "idempotent-success" | "reapply" | "duplicate-row" | "duplicate-as-stale"
  | "outcome-dedupe" | "phantom-row" | "phantom-application" | "fault-admitted" | "kill-admitted" | "failure-recorded" | "failure-as-admitted"
  | "transient-phantom-application" | "transient-stale-record" | "transient-stale-application" | "transient-failure-record"
  | "transient-failure-application" | "transient-duplicate-record" | "transient-duplicate-application" | "differing-duplicate-success"
  | "transient-differing-duplicate-record" | "transient-differing-duplicate-application" | "kill-as-admitted" | "transient-kill-record"
  | "transient-kill-application" | "stale-first" | "refuse-represented" | "sample-member";
interface Mutant { readonly twist: Twist; readonly refusedBy: readonly Check[] }
const MUTANTS: readonly Mutant[] = [
  { twist: "combined-basis", refusedBy: ["four-fields", "replay"] },
  { twist: "nested-fields", refusedBy: ["four-fields", "replay"] },
  { twist: "missing-outcome", refusedBy: ["four-fields", "replay"] },
  { twist: "aliased-checkpoint", refusedBy: ["four-fields", "replay"] },
  { twist: "lazy-checkpoint", refusedBy: ["replay"] },
  { twist: "lazy-digest", refusedBy: ["replay"] },
  { twist: "unprefixed-digest", refusedBy: ["replay"] },
  { twist: "mapped-outcome", refusedBy: ["replay"] },
  { twist: "apply-stale", refusedBy: ["stale"] },
  { twist: "rebase-stale", refusedBy: ["stale"] },
  { twist: "untyped-stale", refusedBy: ["stale"] },
  { twist: "frozen-basis", refusedBy: ["four-fields", "replay", "stale"] },
  { twist: "settling-stale", refusedBy: ["four-fields", "replay", "stale"] },
  { twist: "retry-stale", refusedBy: ["stale"] },
  { twist: "silent-apply-stale", refusedBy: ["stale"] },
  { twist: "transient-stale-record", refusedBy: ["stale"] },
  { twist: "transient-stale-application", refusedBy: ["stale"] },
  { twist: "readmit", refusedBy: ["replay", "duplicate"] },
  { twist: "content-dedupe", refusedBy: ["replay", "duplicate"] },
  { twist: "idempotent-success", refusedBy: ["duplicate"] },
  { twist: "differing-duplicate-success", refusedBy: ["duplicate"] },
  { twist: "reapply", refusedBy: ["duplicate"] },
  { twist: "duplicate-row", refusedBy: ["duplicate"] },
  { twist: "duplicate-as-stale", refusedBy: ["duplicate"] },
  { twist: "outcome-dedupe", refusedBy: ["four-fields", "replay", "duplicate"] },
  { twist: "phantom-row", refusedBy: ["replay"] },
  { twist: "phantom-application", refusedBy: ["replay"] },
  { twist: "transient-phantom-application", refusedBy: ["replay"] },
  { twist: "fault-admitted", refusedBy: ["worker-failure"] },
  { twist: "kill-admitted", refusedBy: ["worker-failure"] },
  { twist: "failure-recorded", refusedBy: ["worker-failure"] },
  { twist: "failure-as-admitted", refusedBy: ["worker-failure"] },
  { twist: "kill-as-admitted", refusedBy: ["worker-failure"] },
  { twist: "transient-failure-record", refusedBy: ["worker-failure"] },
  { twist: "transient-failure-application", refusedBy: ["worker-failure"] },
  { twist: "transient-kill-record", refusedBy: ["worker-failure"] },
  { twist: "transient-kill-application", refusedBy: ["worker-failure"] },
  { twist: "transient-duplicate-record", refusedBy: ["duplicate"] },
  { twist: "transient-duplicate-application", refusedBy: ["duplicate"] },
  { twist: "transient-differing-duplicate-record", refusedBy: ["duplicate"] },
  { twist: "transient-differing-duplicate-application", refusedBy: ["duplicate"] },
];

/** What a transient twist lists from the presentation it answers to the next event: its rows and its applications. */
interface Flash { readonly rows: readonly Row[]; readonly applied: readonly string[] }
const NO_FLASH: Flash = { rows: [], applied: [] };
const ADMITTED: Verdict = { verdict: "admitted" };
const UNAVAILABLE: Verdict = { verdict: "unavailable" };
const refusal = (reason: string): Verdict => ({ verdict: "refused", reason });
/** The real gp receipt's sample member (Q4's plant carries it on every row). */
const gpSample = (): unknown => member(member(JSON.parse(headText(GP_RECEIPT)), "receipt"), "sample");
/** The receipt row a host writes for an admitted presentation: the reference's, or a twist's. */
function rowOf(event: PresentedEvent, twist: Twist | undefined): Row {
  const { decision, programId, checkpointId, snapshotDigest, sourceOutcome } = event;
  if (twist === "combined-basis") return { decision, basis: `${programId}|${checkpointId}|${snapshotDigest}`, sourceOutcome };
  if (twist === "nested-fields") return { decision, fields: { programId, checkpointId, snapshotDigest, sourceOutcome } };
  if (twist === "missing-outcome") return { decision, programId, checkpointId, snapshotDigest };
  return {
    decision, programId, checkpointId: twist === "aliased-checkpoint" ? programId : checkpointId,
    snapshotDigest: twist === "unprefixed-digest" ? snapshotDigest.replace(/^sha256:/, "") : snapshotDigest,
    sourceOutcome: twist === "mapped-outcome" ? `start ${sourceOutcome}` : sourceOutcome,
    ...(twist === "sample-member" ? { sample: gpSample() } : {}),
  };
}
/** The reference host (twist undefined), or a mutant or residual plant of it. */
function reference(twist?: Twist): DecisionHost {
  let current: string | undefined;
  let latest = "";
  let deferred: PresentedEvent[] = [];
  let moved = false;
  const admitted = new Map<string, PresentedEvent>();
  const refusedStale = new Set<string>();
  const records: Row[] = [];
  const effects: string[] = [];
  let flash = NO_FLASH;
  const admit = (event: PresentedEvent): Verdict => {
    admitted.set(event.decision, event);
    records.push(rowOf(event, twist));
    effects.push(event.decision);
    return ADMITTED;
  };
  return {
    basis(snapshotDigest) {
      flash = NO_FLASH;
      if (twist === "frozen-basis" && current !== undefined) return;
      if (current !== undefined) moved = true;
      current = snapshotDigest;
      if (twist !== "retry-stale") return;
      const ready = deferred.filter(event => event.snapshotDigest === current);
      deferred = deferred.filter(event => event.snapshotDigest !== current);
      for (const event of ready) admit(event);
    },
    present(presentation) {
      flash = NO_FLASH;
      latest = presentation.checkpointId;
      if (presentation.kind === "failed") {
        if ((twist === "fault-admitted" && presentation.worker === "fault") || (twist === "kill-admitted" && presentation.worker === "kill")) {
          const guess = SNAPSHOTS.get(presentation.snapshotDigest)?.candidates[0]?.id ?? "";
          return admit({ ...presentation, kind: "presented", sourceOutcome: guess });
        }
        if (twist === "failure-as-admitted" || (twist === "kill-as-admitted" && presentation.worker === "kill")) return ADMITTED;
        const { decision, programId, checkpointId, snapshotDigest } = presentation;
        const row: Row = { decision, programId, checkpointId, snapshotDigest, sourceOutcome: "unavailable" };
        if (twist === "failure-recorded") records.push(row);
        if (twist === "transient-failure-record") flash = { rows: [row], applied: [] };
        if (twist === "transient-failure-application") flash = { rows: [], applied: [decision] };
        if (twist === "transient-kill-record" && presentation.worker === "kill") flash = { rows: [row], applied: [] };
        if (twist === "transient-kill-application" && presentation.worker === "kill") flash = { rows: [], applied: [decision] };
        return UNAVAILABLE;
      }
      const prior = admitted.get(presentation.decision);
      const stale = presentation.snapshotDigest !== current;
      if (twist === "stale-first" && prior !== undefined && stale) return refusal("stale");
      if (prior !== undefined) {
        if (twist === "readmit" || (twist === "content-dedupe" && !isDeepStrictEqual(decisionOf(prior), decisionOf(presentation)))) return admit(presentation);
        const differs = !isDeepStrictEqual(decisionOf(prior), decisionOf(presentation));
        if (twist === "idempotent-success" || (twist === "differing-duplicate-success" && differs)) return ADMITTED;
        if (twist === "reapply") effects.push(presentation.decision);
        if (twist === "duplicate-row") records.push(rowOf(prior, twist));
        if (twist === "transient-duplicate-record") flash = { rows: [rowOf(prior, twist)], applied: [] };
        if (twist === "transient-duplicate-application") flash = { rows: [], applied: [presentation.decision] };
        if (twist === "transient-differing-duplicate-record" && differs) flash = { rows: [rowOf(prior, twist)], applied: [] };
        if (twist === "transient-differing-duplicate-application" && differs) flash = { rows: [], applied: [presentation.decision] };
        return refusal(twist === "duplicate-as-stale" ? "stale" : "duplicate");
      }
      if (twist === "refuse-represented" && refusedStale.has(presentation.decision)) return refusal("duplicate");
      if (stale) {
        if (twist === "apply-stale") return admit(presentation);
        if (twist === "rebase-stale" && current !== undefined) return admit(presented(presentation.decision, presentation.programId, presentation.checkpointId, current));
        if (twist === "retry-stale") deferred.push(presentation);
        if (twist === "silent-apply-stale") effects.push(presentation.decision);
        if (twist === "transient-stale-record") flash = { rows: [rowOf(presentation, twist)], applied: [] };
        if (twist === "transient-stale-application") flash = { rows: [], applied: [presentation.decision] };
        if (twist === "transient-phantom-application") flash = { rows: [], applied: ["d0"] };
        refusedStale.add(presentation.decision);
        return refusal(twist === "untyped-stale" ? "basis-mismatch" : "stale");
      }
      const sameEffect = [...admitted.values()].some(event => event.snapshotDigest === presentation.snapshotDigest && event.sourceOutcome === presentation.sourceOutcome);
      if (twist === "outcome-dedupe" && sameEffect) return refusal("duplicate");
      if (twist === "settling-stale" && moved) {
        moved = false;
        return refusal("stale");
      }
      return admit(presentation);
    },
    rows: () => [
      ...records.map(record => {
        if (twist === "lazy-checkpoint" && Object.hasOwn(record, "checkpointId")) return { ...record, checkpointId: latest };
        if (twist === "lazy-digest" && Object.hasOwn(record, "snapshotDigest")) return { ...record, snapshotDigest: current };
        return record;
      }),
      ...(twist === "phantom-row" ? [{ decision: "d0", programId: "program-x", checkpointId: "checkpoint-up", snapshotDigest: ONE, sourceOutcome: "exec-a" }] : []),
      ...flash.rows,
    ],
    applied: () => [...effects, ...(twist === "phantom-application" ? ["d0"] : []), ...flash.applied],
  };
}

/** What one host left: the verdict for every event (null for a basis move) and its rows and applications after every event. */
interface Run {
  readonly verdicts: readonly unknown[];
  readonly rows: readonly (readonly unknown[])[];
  readonly applied: readonly (readonly string[])[];
}
const asJson = (value: unknown): unknown => JSON.parse(JSON.stringify(value === undefined ? null : value) ?? "null");
function run(open: () => DecisionHost, journal: readonly JournalEvent[] = JOURNAL): Run {
  const host = open();
  const verdicts: unknown[] = [];
  const rows: unknown[][] = [];
  const applied: string[][] = [];
  for (const event of journal) {
    if (event.kind === "basis") {
      host.basis(event.snapshotDigest);
      verdicts.push(null);
    } else {
      verdicts.push(asJson(host.present(event)));
    }
    rows.push(host.rows().map(row => asJson(row)));
    applied.push(host.applied().map(id => String(id)));
  }
  return { verdicts, rows, applied };
}

/** What the journal alone expects of each presentation (undefined for a basis move). */
type Expectation = "admitted" | Reason | "either" | "unavailable" | "unjudged";
function expectations(journal: readonly JournalEvent[]): (Expectation | undefined)[] {
  let current: string | undefined;
  const admitted = new Set<string>();
  const seen = new Set<string>();
  return journal.map((event): Expectation | undefined => {
    if (event.kind === "basis") {
      current = event.snapshotDigest;
      return undefined;
    }
    const known = seen.has(event.decision);
    seen.add(event.decision);
    if (event.kind === "failed") return known ? "unjudged" : "unavailable";
    const stale = event.snapshotDigest !== current;
    if (admitted.has(event.decision)) return stale ? "either" : "duplicate";
    if (known) return "unjudged";
    if (stale) return "stale";
    admitted.add(event.decision);
    return "admitted";
  });
}

/** A row's four fields alone: the only input a replay receives. */
function fieldsOf(row: unknown): Record<Field, unknown> {
  const out: Partial<Record<Field, unknown>> = {};
  for (const field of FIELDS) out[field] = member(row, field);
  return out as Record<Field, unknown>;
}
/** A replay from the four fields alone: the decision the synthetic GP reconstructs, or why it cannot. */
interface Replayed { readonly decision?: Decision; readonly unresolved?: string }
function replay(fields: Readonly<Record<Field, unknown>>): Replayed {
  const { programId, checkpointId, snapshotDigest, sourceOutcome } = fields;
  if (typeof programId !== "string" || typeof checkpointId !== "string" || typeof snapshotDigest !== "string" || typeof sourceOutcome !== "string") {
    return { unresolved: "a field is not a string" };
  }
  const feature = PROGRAMS.get(programId);
  if (feature === undefined) return { unresolved: "programId names no program" };
  const sign = CHECKPOINTS.get(checkpointId);
  if (sign === undefined) return { unresolved: "checkpointId names no checkpoint" };
  const snapshot = SNAPSHOTS.get(snapshotDigest);
  if (snapshot === undefined) return { unresolved: "snapshotDigest names no snapshot" };
  return { decision: { programId, checkpointId, snapshotDigest, sourceOutcome: evaluate(feature, sign, snapshot) } };
}
/** four-fields over one row: each field an own member holding a non-empty string, no two sharing a value. */
function fieldFindings(row: unknown): string[] {
  const out: string[] = [];
  const values: (readonly [Field, string])[] = [];
  for (const field of FIELDS) {
    const value = member(row, field);
    if (value === undefined) out.push(`${field} missing`);
    else if (typeof value !== "string" || value === "") out.push(`${field} not a non-empty string`);
    else values.push([field, value]);
  }
  for (const [index, [field, value]] of values.entries()) {
    for (const [other, otherValue] of values.slice(index + 1)) if (value === otherValue) out.push(`${field} and ${other} share a value`);
  }
  return out;
}
/** The findings of the five checks over one host's run, each opening with its check. */
function judge(result: Run, journal: readonly JournalEvent[] = JOURNAL): string[] {
  const out: string[] = [];
  const expected = expectations(journal);
  const admittedBy = new Map<string, PresentedEvent>();
  /** Each refused or unavailable decision's owning check and the steps it is judged over (until its id is presented again). */
  const owners = new Map<string, { readonly check: Check; readonly from: number; readonly to: number }>();
  for (const [step, event] of journal.entries()) {
    if (event.kind === "basis") continue;
    const want = expected[step];
    if (want === "admitted" && event.kind === "presented") admittedBy.set(event.decision, event);
    if ((want === "stale" || want === "unavailable") && !owners.has(event.decision)) {
      const next = journal.findIndex((later, index) => index > step && later.kind !== "basis" && later.decision === event.decision);
      owners.set(event.decision, { check: want === "stale" ? "stale" : "worker-failure", from: step, to: next < 0 ? journal.length : next });
    }
  }
  for (const [step, event] of journal.entries()) {
    if (event.kind === "basis") continue;
    const verdict = result.verdicts[step];
    const said = member(verdict, "verdict");
    const refusedFor = (reason: Reason): boolean => said === "refused" && member(verdict, "reason") === reason;
    const at = `step ${step + 1} ${event.decision}`;
    const want = expected[step];
    if (want === "admitted") {
      if (refusedFor("stale")) out.push(`stale ${at}: refused stale against the current basis`);
      if (refusedFor("duplicate")) out.push(`duplicate ${at}: refused duplicate though never admitted`);
    } else if (want === "stale" && !refusedFor("stale")) out.push(`stale ${at}: not refused stale`);
    else if (want === "duplicate" && !refusedFor("duplicate")) out.push(`duplicate ${at}: not refused duplicate`);
    else if (want === "either" && !refusedFor("stale") && !refusedFor("duplicate")) out.push(`duplicate ${at}: neither refusal`);
    else if (want === "unavailable" && said !== "refused" && said !== "unavailable") out.push(`worker-failure ${at}: neither refused nor unavailable`);
  }
  const named = (rows: readonly unknown[], decision: string): unknown[] => rows.filter(row => member(row, "decision") === decision);
  const final = result.rows.at(-1) ?? [];
  for (const [decision, event] of admittedBy) {
    const rows = named(final, decision);
    if (rows.length === 0) out.push(`four-fields ${decision}: no receipt row`, `replay ${decision}: no receipt row to replay`);
    for (const row of rows) {
      for (const finding of fieldFindings(row)) out.push(`four-fields ${decision}: ${finding}`);
      const fields = fieldsOf(row);
      const replayed = replay(fields);
      if (replayed.decision === undefined) out.push(`replay ${decision}: cannot replay (${replayed.unresolved ?? "unresolved"})`);
      else if (replayed.decision.sourceOutcome !== fields.sourceOutcome) out.push(`replay ${decision}: the replayed outcome is not the row's`);
      else if (!isDeepStrictEqual(replayed.decision, decisionOf(event))) out.push(`replay ${decision}: not the recorded decision`);
    }
  }
  const ids = new Set(journal.flatMap(event => (event.kind === "basis" ? [] : [event.decision])));
  for (const row of final) {
    const decision = member(row, "decision");
    if (typeof decision !== "string" || !ids.has(decision)) out.push("replay a row naming no presented decision");
  }
  for (const id of new Set(result.applied.flat())) if (!ids.has(id)) out.push("replay an application naming no presented decision");
  for (const [decision, owner] of owners) {
    const window = (index: number): boolean => index >= owner.from && index < owner.to;
    const recorded = result.rows.findIndex((rows, index) => window(index) && named(rows, decision).length > 0);
    if (recorded >= 0) out.push(`${owner.check} ${decision}: a receipt row records it at step ${recorded + 1}`);
    const applied = result.applied.findIndex((list, index) => window(index) && list.includes(decision));
    if (applied >= 0) out.push(`${owner.check} ${decision}: applied at step ${applied + 1}`);
  }
  const count = (list: readonly string[], decision: string): number => list.filter(id => id === decision).length;
  for (const [step, event] of journal.entries()) {
    const want = expected[step];
    if (event.kind === "basis" || (want !== "duplicate" && want !== "either")) continue;
    const rowsBefore = step === 0 ? [] : (result.rows[step - 1] ?? []);
    if (named(result.rows[step] ?? [], event.decision).length > named(rowsBefore, event.decision).length) {
      out.push(`duplicate step ${step + 1} ${event.decision}: a receipt row added`);
    }
    const appliedBefore = step === 0 ? [] : (result.applied[step - 1] ?? []);
    if (count(result.applied[step] ?? [], event.decision) > count(appliedBefore, event.decision)) out.push(`duplicate step ${step + 1} ${event.decision}: applied again`);
  }
  return out;
}
const checksOf = (findings: readonly string[]): Check[] => CHECKS.filter(check => findings.some(finding => finding.startsWith(`${check} `)));
const failsOf = (twist?: Twist, journal: readonly JournalEvent[] = JOURNAL): Check[] => checksOf(judge(run(() => reference(twist), journal), journal));

/** The words of a text: split at every non-letter, non-digit character and at camel-case humps, lower-cased. */
function words(text: string): string[] {
  return text.split(/[^\p{L}\p{N}]+/u)
    .flatMap(piece => piece.split(/(?<=[\p{Ll}\p{N}])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})/u))
    .filter(word => word !== "")
    .map(word => word.toLowerCase());
}
/** Whether a text holds a name as its run of words. */
function spells(text: string, name: string): boolean {
  const run = words(name);
  const all = words(text);
  return all.some((_, index) => run.every((word, offset) => all[index + offset] === word));
}
const spelled = (text: string): string[] => VOCABULARY.filter(name => spells(text, name));
const git = (...args: string[]): string => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
/** git's would-commit listing under a path (tracked or untracked, never ignored), present files only, sorted. */
function listed(path: string): string[] {
  return git("ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", path).split("\0").filter(file => file !== "" && existsSync(join(ROOT, file))).sort();
}
const headText = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const pinText = (path: string): string => git("show", `${PI_PIN}:${path}`);
/** A text with every regular-expression metacharacter escaped. */
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lineOf = (text: string, line: number): string => text.split("\n")[line - 1] ?? "";
/** A vitest config file by its name, at any depth: vitest.config or vitest.<name>.config, with a ts, mts, cts, js, mjs or cjs extension. */
const CONFIG_FILE = /^vitest(?:\.[^/]+)?\.config\.[cm]?[jt]s$/;
/** The vitest config files of a listing other than the default config: A5c reads its listing and its config plants' paths through this one filter. */
const otherConfigs = (files: readonly string[]): string[] => files.filter(file => file !== VITEST_CONFIG && CONFIG_FILE.test(basename(file)));
/** The flags a default run's package script may carry (A5c's closed list): vitest run with any other flag or argument is no default run. */
const SCRIPT_FLAG = /^--(?:reporter=[\w-]+|outputFile=\S+|includeTaskLocation|expect\.requireAssertions)$/;
function defaultRun(script: unknown): boolean {
  if (typeof script !== "string") return false;
  const [tool, verb, ...flags] = script.trim().split(/\s+/);
  return tool === "vitest" && verb === "run" && flags.every(flag => SCRIPT_FLAG.test(flag));
}
/** A glob read with a star (inside one path segment) and a double star before a slash (any directories) only; every other character is literal. */
function globMatches(glob: string, path: string): boolean {
  const pattern = glob.split("**/").map(part => part.split("*").map(escapeRegExp).join("[^/]*")).join("(?:.*/)?");
  return new RegExp(`^${pattern}$`).test(path);
}
/** Every string literal of every include list a config text spells (include: [...], either quote, any spacing). */
function includesOf(text: string): string[] {
  return [...text.matchAll(/\binclude\s*:\s*\[([^\]]*)\]/g)].flatMap(match =>
    (match[1] ?? "").split(",").map(item => item.trim().replace(/^["'`]|["'`]$/g, "")).filter(item => item !== ""));
}
/** Whether a vitest config text names this file's base name or selects it by one of its include globs. */
const claimsSelf = (text: string): boolean => text.includes(basename(SELF)) || includesOf(text).some(glob => globMatches(glob, SELF));
/** In-memory config plants (path, text): the gate's root .mts and nested files naming this file (depths 1 to 3), a glob include written without spaces, and a control selecting the census tier only. */
const CONFIG_PLANTS: readonly (readonly [string, string])[] = [
  ["vitest.gp-live.config.mts", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["configs/vitest.gp-live.config.ts", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["vitest.gp-live.config.ts", "export default defineConfig({test:{include:['test/workbench-gp-*.test.ts']}});"],
  ["vitest.gp-census.config.ts", 'export default defineConfig({ test: { include: ["test/**/*.census.ts"] } });'],
  ["vitest.gp-live.config.js", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["vitest.gp-live.config.mjs", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["vitest.gp-live.config.cjs", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["vitest.gp-live.config.cts", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["qa/configs/vitest.config.ts", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
  ["qa/configs/live/vitest.config.ts", `export default defineConfig({ test: { include: ["${SELF}"] } });`],
];
/** In-memory package script plants, none a default run: a short config flag, a long one, a positional file and an exclude flag. */
const SCRIPT_PLANTS: readonly string[] = [
  "vitest run -c vitest.gp-live.config.ts --expect.requireAssertions",
  "vitest run --config=vitest.gp-live.config.ts --expect.requireAssertions",
  "vitest run test/workbench-other.test.ts --expect.requireAssertions",
  "vitest run --expect.requireAssertions --exclude=test/workbench-gp-*.test.ts",
];
/** One bead's row in an export text. */
function exportRow(text: string, id: string): Row | undefined {
  for (const line of text.split("\n")) {
    if (!line.includes(`"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return row;
  }
  return undefined;
}
const statusAt = (text: string, id: string): unknown => member(exportRow(text, id), "status");

/** The real gp decision receipt and the four members recording what the Acceptance's four fields name. */
const REFERENTS: Readonly<Record<Field, readonly string[]>> = {
  programId: ["program_digest"], checkpointId: ["checkpoint_digest"], snapshotDigest: ["graph_digest"], sourceOutcome: ["sample", "chosen_id"],
};
const gpReceipt = (): unknown => member(JSON.parse(headText(GP_RECEIPT)), "receipt");
const at = (value: unknown, path: readonly string[]): unknown => path.reduce<unknown>((inner, key) => member(inner, key), value);

/** The control core, driven for real: a stop of a Furnace Run whose ownership of its Attempt is native-confirmed. */
const SCOPE: ObservationScope = { workspace: "/workspace/gp-replay-census", principal: "census" };
const AT = "2026-10-28T00:00:00Z";
const RUN_REF: NativeRef = { provider: "furnace", type: "run", id: "frn-run-synthetic", scope: SCOPE.workspace };
const ATTEMPT_REF: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-synthetic", scope: SCOPE.workspace };
const NODE: NativeSnapshot["node"] = { title: "run frn-run-synthetic", type: "workflow", statusText: "active", statusTone: "active" };
function ownedProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [RUN_REF, ATTEMPT_REF]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`, node: { ...NODE, title: `${source.type} ${source.id}` } });
  }
  projection.relate({ scope: SCOPE, from: RUN_REF, to: ATTEMPT_REF, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" } });
  return projection;
}
const STOP: NativeControlRequest = {
  scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: ["control:furnace.stop"], target: { ...RUN_REF }, action: "stop",
  params: { confirmed: true }, invocationId: "inv-gp-replay", requestedAt: "2026-10-28T00:00:01Z",
};
/** The member names the docs/09 envelope (proposal) declares at its top level. */
function envelopeMembers(text: string): string[] {
  const lines = text.split("\n");
  const start = lines.findIndex(line => line.trim() === "interface ObservationEnvelope {");
  const end = lines.findIndex((line, index) => index > start && line === "    }");
  return start < 0 || end < 0 ? [] : lines.slice(start + 1, end).flatMap(line => /^ {6}([A-Za-z]+)\??:/.exec(line)?.[1] ?? []);
}
/** How many own lines of a src text declare a member as an optional string. */
const declarations = (text: string, name: string): number => text.split("\n").filter(line => line === `  ${name}?: string;`).length;

/** The docs pages' level-1 titles (each joined by an em dash): a docs anchor's section is bound under its page's title. */
const EM_DASH = String.fromCodePoint(0x2014);
const SECURITY_TITLE = `12 ${EM_DASH} Trust model, authorization, isolation and sensitive data`;
const OBSERVATION_TITLE = `09 ${EM_DASH} Observation, telemetry, provenance and derived graph`;
/**
 * A docs anchor of rows S1 and S2 (pins S1b and S2b): its page and the page's title, its section (a level-2 heading), the
 * filing's line at the pin, the marker words that pick its carrier among the section's prose items, and the carrier's
 * rendered text.
 */
interface DocsAnchor {
  readonly pin: "S1b" | "S2b";
  readonly path: string;
  readonly title: string;
  readonly heading: string;
  readonly line: number;
  readonly marker: string;
  readonly carrier: string;
}
const DOCS_ANCHORS: readonly DocsAnchor[] = [
  {
    pin: "S1b", path: SECURITY_DOC, title: SECURITY_TITLE, heading: "Authorization design", line: 23, marker: "a deserialized or audit/journal-replayed receipt",
    carrier: "A control adapter executes only the decision object the decision core minted in this process: isCoreMintedDecision (src/workbench/control.ts) " +
      "is an identity check against a module-private WeakSet, so a copy, a deserialized or audit/journal-replayed receipt and a hand-built look-alike are " +
      `refused with the fixed text "${CONTROL_UNMINTED_REASON}" however exact their shape, and structural vetting stays behind it as defense in depth.`,
  },
  {
    pin: "S2b", path: OBSERVATION_DOC, title: OBSERVATION_TITLE, heading: "Acceptance/negative controls", line: 88, marker: "Replay duplicate/out-of-order events",
    carrier: "Replay duplicate/out-of-order events; no double count or status regression.",
  },
];
const docsAnchor = (pin: DocsAnchor["pin"]): DocsAnchor => {
  const anchor = DOCS_ANCHORS.find(entry => entry.pin === pin);
  if (anchor === undefined) throw new Error(`no docs anchor ${pin}`);
  return anchor;
};
/** A plant's needle that does not occur exactly once in the text it edits. */
class NeedleMiss extends Error {}
/** Replaces the one occurrence of a needle; a needle absent or repeated throws a NeedleMiss (read as needle-miss), so no plant passes unapplied. */
function once(text: string, needle: string, replacement: string): string {
  const index = text.indexOf(needle);
  if (index < 0 || text.indexOf(needle, index + 1) >= 0) throw new NeedleMiss(`a plant's needle does not occur exactly once: ${JSON.stringify(needle.slice(0, 60))}`);
  return `${text.slice(0, index)}${replacement}${text.slice(index + needle.length)}`;
}
/** Replaces the match of a plant's edit pattern; a pattern that matches nothing throws a NeedleMiss, as an absent needle does. */
function swap(text: string, pattern: RegExp, replacement: string): string {
  if (!pattern.test(text)) throw new NeedleMiss(`a plant's edit pattern does not match: ${pattern.source}`);
  return text.replace(pattern, replacement);
}
/** A blank line as marked and CommonMark read one: spaces and tabs only (a CRLF page's carriage return kept at its end). */
const BLANK_LINE = /^[ \t]*\r?$/;
/**
 * The index of the one whole line of a page's lines equal to a line: line-anchored, so a longer line that contains it (a
 * level-3 heading of the same words among them) is never its site; a NeedleMiss unless exactly one.
 */
function lineAt(lines: readonly string[], line: string): number {
  const found = lines.flatMap((entry, index) => (entry === line ? [index] : []));
  const index = found[0];
  if (found.length !== 1 || index === undefined) throw new NeedleMiss(`a plant's line does not occur exactly once as a whole line: ${JSON.stringify(line.slice(0, 60))}`);
  return index;
}
/** Replaces the one whole line of a page equal to a line (line-anchored, as lineAt finds it). */
function onceLine(text: string, line: string, replacement: string): string {
  const lines = text.split("\n");
  const index = lineAt(lines, line);
  return [...lines.slice(0, index), replacement, ...lines.slice(index + 1)].join("\n");
}
/**
 * The page with the run of blank lines after one whole line (line-anchored) replaced by the given lines: none drops the
 * run, and a page with no blank line there gets the lines inserted, so no edit needs a blank line on disk.
 */
function blankRun(text: string, line: string, blanks: readonly string[]): string {
  const lines = text.split("\n");
  const index = lineAt(lines, line);
  const after = lines.slice(index + 1);
  const run = after.findIndex(entry => !BLANK_LINE.test(entry));
  return [...lines.slice(0, index + 1), ...blanks, ...after.slice(run < 0 ? after.length : run)].join("\n");
}
/** Where a plant edits its anchor's page: the section's own carrier source and its heading's own line, each found when the plant asks (a NeedleMiss unless exactly once). */
interface PlantSites { readonly carrier: () => string; readonly heading: () => string }
/** An in-memory docs plant over the HEAD text of its anchor's page, edited at that page's own sites (never at the pin's line). */
interface DocsPlant { readonly id: string; readonly anchor: DocsAnchor["pin"]; readonly apply: (text: string, at: PlantSites) => string }
const DOCS_PLANTS: readonly DocsPlant[] = [
  {
    id: "D1", anchor: "S1b",
    apply: (text, at) => {
      const own = at.carrier();
      return once(text, own, swap(own, /so\s+a\s+copy,\s[\s\S]+$/, `so a copy and a hand-built look-alike are refused with the fixed text "${CONTROL_UNMINTED_REASON}" ` +
        "however exact their shape, while a deserialized or audit/journal-replayed receipt is executed when its shape matches."));
    },
  },
  {
    id: "D2", anchor: "S1b",
    apply: (text, at) => {
      const own = at.carrier();
      return once(text, own, `<!-- ${own} -->`);
    },
  },
  {
    id: "D3", anchor: "S2b",
    apply: (text, at) => {
      const own = at.carrier();
      return once(text, `${own}\n`, `<!--\n${own}\n-->\n`);
    },
  },
  {
    id: "D4", anchor: "S2b",
    apply: (text, at) => {
      const own = at.carrier();
      return `${once(text, `${own}\n`, "").trimEnd()}\n\n## Retired controls\n\nThe controls below are retired and are not enforced.\n\n${own}\n`;
    },
  },
  {
    id: "D5", anchor: "S2b",
    apply: (text, at) => {
      const line = at.heading();
      return onceLine(text, line, `${line}\n\nThese controls describe a future design; none of them is enforced today.`);
    },
  },
  { id: "D6", anchor: "S1b", apply: text => `${text.trimEnd()}\n\n## Authorization design\n\n- A deserialized or audit/journal-replayed receipt is executed when its shape matches.\n` },
  {
    id: "D7", anchor: "S2b",
    apply: (text, at) => {
      const line = at.heading();
      return onceLine(text, line, `# Appendix (non-normative, superseded drafts)\n\n${line}`);
    },
  },
];
/** The prose items of a rendered section: each paragraph and each item of each list (a code block or an HTML block carries none). */
const proseOf = (blocks: readonly RenderedBlock[]): readonly { readonly text: string; readonly markdown: string }[] =>
  blocks.flatMap(block => (block.kind === "paragraph" ? [{ text: block.text, markdown: block.markdown }] : block.kind === "list" ? block.items : []));
/** A paragraph's or a list item's source line, its list marker dropped. */
const sourceOf = (line: string): string => line.trim().replace(/^(?:\d+[.)]|[-*+])\s+/, "");
/** Why docsSection refused to bind a section: its heading repeated in the rendered view, re-homed under another parent, or else. */
const unbound = (why: string): string => (/ occurs \d+ times in the rendered view/.test(why) ? "unbound:repeated" : /sits under the parent heading path/.test(why) ? "unbound:parent" : "unbound");
/**
 * One docs anchor read in the rendered view: "holds", or the first reason it is unheld. At the pin (no pin text given): the
 * section is bound and carries no HTML, exactly one prose item carries the marker, it renders exactly the carrier, and the
 * filing's line is its source. At HEAD: the same but the line, and the whole section renders block for block as the pin's.
 */
function anchorReading(text: string, anchor: DocsAnchor, pin?: string): string {
  const section = docsSection(text, anchor.heading, 2, [anchor.title]);
  if (!section.ok) return unbound(section.why);
  if (section.hasHtml) return "html";
  const carriers = proseOf(section.blocks).filter(item => item.text.includes(anchor.marker));
  const carrier = carriers[0];
  if (carriers.length !== 1 || carrier === undefined) return `carriers:${carriers.length}`;
  if (carrier.text !== anchor.carrier) return "carrier-text";
  if (pin === undefined) return sourceOf(lineOf(text, anchor.line)) === carrier.markdown ? "holds" : "line";
  return sectionMatches(section, docsSection(pin, anchor.heading, 2, [anchor.title]).blocks).ok ? "holds" : "section";
}
/**
 * The HEAD section's own carrier source: the whole lines of a page that its one marker-carrying prose item spans (its list
 * marker kept, even when marker and prose occupy separate lines), found by that item's source words with any whitespace run
 * between them; a NeedleMiss unless the section
 * binds, exactly one of its prose items carries the marker and those words occur exactly once in the page.
 */
function ownSource(text: string, anchor: DocsAnchor): string {
  const section = docsSection(text, anchor.heading, 2, [anchor.title]);
  const carriers = section.ok ? proseOf(section.blocks).filter(item => item.text.includes(anchor.marker)) : [];
  const carrier = carriers[0];
  if (carriers.length !== 1 || carrier === undefined) throw new NeedleMiss(`${anchor.pin}: the section has ${carriers.length} carriers to plant at`);
  const spans = [...text.matchAll(new RegExp(carrier.markdown.split(" ").map(escapeRegExp).join("\\s+"), "g"))];
  const span = spans[0];
  if (spans.length !== 1 || span === undefined) throw new NeedleMiss(`${anchor.pin}: the carrier's source occurs ${spans.length} times in the page`);
  const from = span.index ?? 0;
  const currentLine = text.lastIndexOf("\n", from) + 1;
  const previousLineEnd = Math.max(0, currentLine - 1);
  const previousLineStart = text.lastIndexOf("\n", previousLineEnd - 1) + 1;
  const previous = text.slice(previousLineStart, previousLineEnd);
  const markerOnly = /^ {0,3}(?:\d+[.)]|[-*+])[ \t]*$/.test(previous) && /^\s+\S/.test(text.slice(currentLine, from + span[0].length));
  const start = markerOnly ? previousLineStart : currentLine;
  const end = text.indexOf("\n", from + span[0].length);
  return text.slice(start, end < 0 ? text.length : end);
}
/** The one source line of a page that renders its anchor's level-2 heading, found by the heading's words with any spacing (any whitespace but a line break) around and between them (a NeedleMiss unless exactly one). */
function headingLine(text: string, anchor: DocsAnchor): string {
  const lines = [...text.matchAll(new RegExp(`^ {0,3}##[^\\S\\n]+${anchor.heading.split(" ").map(escapeRegExp).join("[^\\S\\n]+")}[^\\S\\n]*$`, "gm"))];
  const line = lines[0];
  if (lines.length !== 1 || line === undefined) throw new NeedleMiss(`${anchor.pin}: the heading's line occurs ${lines.length} times in the page`);
  return line[0];
}
/** A reading that plants: its value, or needle-miss (its own reason, never a throw) when a plant's site or edit pattern does not occur exactly once. */
function needled<T>(read: () => T): T | "needle-miss" {
  try {
    return read();
  } catch (error) {
    if (error instanceof NeedleMiss) return "needle-miss";
    throw error;
  }
}
/**
 * The page re-spaced at its plants' sites, every block left as it was: its carrier's source re-wrapped across two lines
 * (broken at the first space from its middle on, the continuation indented under its list marker), its heading's line
 * re-spaced (a second space after the hashes, a trailing space), edited as its whole line, with the run of blank lines after
 * it dropped (a page with none drops nothing), and every line break written CRLF.
 */
function respaced(text: string, anchor: DocsAnchor): string {
  const own = ownSource(text, anchor);
  const middle = own.indexOf(" ", Math.floor(own.length / 2));
  if (middle < 0) throw new NeedleMiss(`${anchor.pin}: the carrier's source has no space to break at`);
  const indent = " ".repeat(/^ *(?:\d+[.)]|[-*+]) +/.exec(own)?.[0].length ?? 0);
  const wrapped = once(text, own, `${own.slice(0, middle)}\n${indent}${own.slice(middle + 1)}`);
  const line = headingLine(wrapped, anchor);
  return onceLine(blankRun(wrapped, line, []), line, `${line.replace("## ", "##  ")} `).split("\n").join("\r\n");
}
/**
 * A docs anchor read at the pin and at HEAD, three controls over the pin's text, each of its plants over the HEAD text, the
 * HEAD controls (the page re-spaced at its plants' sites, its carrier source doubled, and marker/heading spacing edits),
 * and the same whole HEAD reading over three variants of the HEAD page: the run of blank lines after its heading's line
 * dropped, that run replaced by one line of spaces and a tab, and a level-3 heading of its heading's words added at its end.
 */
function anchorWitness(anchor: DocsAnchor): Readonly<Record<string, unknown>> {
  const pin = pinText(anchor.path);
  const head = headText(anchor.path);
  const source = lineOf(pin, anchor.line);
  /** Each of the anchor's plants over a page, at that page's own sites: the reason the planted page reads, or needle-miss. */
  const plantsOver = (text: string): Record<string, string> => {
    const at: PlantSites = { carrier: () => ownSource(text, anchor), heading: () => headingLine(text, anchor) };
    return Object.fromEntries(DOCS_PLANTS.filter(plant => plant.anchor === anchor.pin).map(plant => [plant.id, needled(() => anchorReading(plant.apply(text, at), anchor, pin))]));
  };
  const read = (page: string) => ({ head: anchorReading(page, anchor, pin), plants: plantsOver(page) });
  /** The whole HEAD reading of a page: the page itself, its plants, and the HEAD controls built from it at its own sites. */
  const headReading = (page: string) => ({
    ...read(page),
    respaced: needled(() => read(respaced(page, anchor))),
    doubled: needled(() => {
      const own = ownSource(page, anchor);
      return plantsOver(once(page, `${own}\n`, `${own}\n\n${own}\n`));
    }),
    spacing: needled(() => {
      const heading = headingLine(page, anchor);
      const own = ownSource(page, anchor);
      const marker = /^ *(?:\d+[.)]|[-*+])\s+/.exec(own)?.[0] ?? "";
      const afterMarker = marker.length > 0 ? once(page, own, `${marker.trimEnd()}\n${" ".repeat(marker.length)}${own.slice(marker.length)}`) : page;
      const noBlank = blankRun(page, heading, []);
      const first = anchor.heading.split(" ")[0] ?? "";
      const betweenWords = onceLine(page, heading, heading.replace(`${first} `, `${first}  `));
      return { afterMarker: { ...read(afterMarker), markerKept: /^ {0,3}(?:\d+[.)]|[-*+])[ \t]*\n/.test(ownSource(afterMarker, anchor)) },
        noBlank: read(noBlank), betweenWords: read(betweenWords) };
    }),
  });
  return {
    pin: anchorReading(pin, anchor),
    controls: {
      line: anchorReading(pin, { ...anchor, line: anchor.line + 1 }), carrier: anchorReading(pin, { ...anchor, carrier: `${anchor.carrier} (edited)` }),
      twice: anchorReading(once(pin, `${source}\n`, `${source}\n\n${source}\n`), anchor),
    },
    ...headReading(head),
    variants: {
      bare: needled(() => headReading(blankRun(head, headingLine(head, anchor), []))),
      spaced: needled(() => headReading(blankRun(head, headingLine(head, anchor), [" \t "]))),
      deeper: headReading(`${head.trimEnd()}\n\n### ${anchor.heading}\n\nA later subsection under the same words.\n`),
    },
  };
}
interface ExportFacts { readonly title: string; readonly notes: string }
let beadFacts: ExportFacts | undefined;
/** The bead's own row in the tracked export (read once per run). */
function beadRow(): ExportFacts {
  if (beadFacts !== undefined) return beadFacts;
  const row = exportRow(headText(EXPORT), BEAD);
  if (row === undefined) throw new Error(`${BEAD} has no row in ${EXPORT}`);
  beadFacts = { title: String(row.title ?? ""), notes: String(row.notes ?? "") };
  return beadFacts;
}
/** A text cut at a separator outside parentheses and braces. */
function clausesOf(text: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === "(" || char === "{") depth++;
    else if (char === ")" || char === "}") depth--;
    else if (depth === 0 && text.startsWith(separator, index)) {
      parts.push(text.slice(start, index));
      start = index + separator.length;
    }
  }
  return [...parts, text.slice(start)];
}
interface Filing { readonly anchors: readonly string[]; readonly pin: string; readonly clauses: readonly string[]; readonly slice: string }
/** The owner filing's Authority, Acceptance and slice-4 texts, read from its first notes line opening "Citation: " only. */
function filingOf(notes: string): Filing {
  const line = notes.split("\n").find(text => text.startsWith("Citation: ")) ?? "";
  const authority = /Authority: .+? \u2014 (.+?) @([0-9a-f]{7,40})\. Acceptance: /.exec(line);
  const acceptance = /\. Acceptance: (.+?)\.(?: |$)/.exec(line);
  const slice = /slice 4 '([^']+) negative tests'/.exec(line);
  const anchors = clausesOf(authority?.[1] ?? "", ", ");
  const last = (anchors.pop() ?? "").replace(/^and /, "");
  return { anchors: [...anchors, last], pin: authority?.[2] ?? "", clauses: clausesOf(acceptance?.[1] ?? "", "; "), slice: slice?.[1] ?? "" };
}

interface JudgedRow { readonly id: string; readonly label: string; readonly pins: readonly string[] }
const ROWS: readonly JudgedRow[] = [
  { id: "T", label: "When Pi records GraphPolicyCLI decisions", pins: ["T1", "T2"] },
  { id: "A1", label: "receipt rows carry programId, checkpointId, snapshotDigest and sourceOutcome as four independent fields", pins: ["A1a", "A1b"] },
  { id: "A2", label: "a replay test reconstructs the recorded decision from those fields alone", pins: ["A2a", "A2b"] },
  {
    id: "A3", label: "a decision presented against a snapshot digest other than the current basis is refused stale (never applied to the new basis)",
    pins: ["A3a", "A3b"],
  },
  { id: "A4", label: "a second presentation of an already-admitted decision id is refused duplicate", pins: ["A4a", "A4b"] },
  {
    id: "A5",
    label: "the four slice-4 negative tests (worker fault, stale basis, worker kill, duplicate replay) are hermetic fixtures in the default gate before any live tier",
    pins: ["A5a", "A5b", "A5c"],
  },
  {
    id: "S1", label: "a replayed or deserialized control decision is already refused by isCoreMintedDecision (wb-pjj closed; docs/workbench/12-security.md:23)",
    pins: ["S1a", "S1b"],
  },
  { id: "S2", label: "duplicate observation events never double-count (docs/workbench/09-observation-and-provenance.md:88)", pins: ["S2a", "S2b"] },
  {
    id: "S3", label: "basis fields are kept distinct (docs/09 envelope subjectBasis/definitionDigest/sourceVersion; wb-973.8 bundle vs graph digest)",
    pins: ["S3a", "S3b"],
  },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi records", T2: "GraphPolicyCLI decisions",
  A1a: "receipt rows carry programId, checkpointId, snapshotDigest and sourceOutcome", A1b: "as four independent fields",
  A2a: "a replay test reconstructs the recorded decision", A2b: "from those fields alone",
  A3a: "a decision presented against a snapshot digest other than the current basis is refused stale", A3b: "(never applied to the new basis)",
  A4a: "a second presentation of an already-admitted decision id", A4b: "is refused duplicate",
  A5a: "the four slice-4 negative tests (worker fault, stale basis, worker kill, duplicate replay)", A5b: "are hermetic fixtures",
  A5c: "in the default gate before any live tier",
  S1a: "a replayed or deserialized control decision is already refused by isCoreMintedDecision", S1b: "(wb-pjj closed; docs/workbench/12-security.md:23)",
  S2a: "duplicate observation events never double-count", S2b: "(docs/workbench/09-observation-and-provenance.md:88)",
  S3a: "basis fields are kept distinct", S3b: "(docs/09 envelope subjectBasis/definitionDigest/sourceVersion; wb-973.8 bundle vs graph digest)",
  Q1: "R-SPELLING", Q2: "R-PRECEDENCE", Q3: "R-REPRESENTED", Q4: "R-SAMPLED-REPLAY", Q5: "R-SIDE-RECORD", Q6: "R-HOLDER-REUSE", Q7: "R-REFERENT-NAMES",
};
interface Residual { readonly id: string; readonly name: string; readonly members: readonly string[] }
const RESIDUALS: readonly Residual[] = [
  {
    id: "Q1", name: "R-SPELLING",
    members: [
      "a member composed from pieces that split inside one of its words", "a member spelled with escapes", "the shortened name GraphPolicy", "the word gp",
      "a member whose words run together with no separator or hump between two of them",
    ],
  },
  { id: "Q2", name: "R-PRECEDENCE", members: ["a second presentation of an admitted decision against a moved basis"] },
  { id: "Q3", name: "R-REPRESENTED", members: ["a stale-refused id presented again against the current basis"] },
  { id: "Q4", name: "R-SAMPLED-REPLAY", members: ["a sampled decision's rng state and candidates"] },
  { id: "Q5", name: "R-SIDE-RECORD", members: ["an application kept outside applied()"] },
  { id: "Q6", name: "R-HOLDER-REUSE", members: ["a registered holder's further use of its registered member"] },
  { id: "Q7", name: "R-REFERENT-NAMES", members: ["a decision record spelled in the gp receipt's own member names and no vocabulary member"] },
];
/** The texts T2's reader is shown: each with the members it must read. */
const READER_CONTROLS: readonly (readonly [string, readonly string[]])[] = [
  ["export const programId = 1;", ["programId"]],
  ["const CHECKPOINT_ID = 2;", ["checkpointId"]],
  ["row.snapshot_digest", ["snapshotDigest"]],
  ["a source-outcome field", ["sourceOutcome"]],
  ["a GraphPolicyCLI host", ["GraphPolicyCLI"]],
  ["import('graph-policy-cli')", ["GraphPolicyCLI"]],
  ['const name = "program" + "Id";', ["programId"]],
  ["programIds", []],
  ["checkpointIdentity", []],
  ["snapshotDigests", []],
  ["outcome source", []],
  ["GraphPolicyCLIs", []],
];
/** The rows four-fields is shown (row A1a): each with the findings it must read. */
const FIELD_CONTROLS: readonly (readonly [Row, readonly string[]])[] = [
  [{ programId: "program-x", checkpointId: "checkpoint-up", snapshotDigest: ONE, sourceOutcome: "exec-a" }, []],
  [{ programId: "program-x", checkpointId: 7, snapshotDigest: "", sourceOutcome: "exec-a" }, ["checkpointId not a non-empty string", "snapshotDigest not a non-empty string"]],
  [{ programId: "exec-a", checkpointId: "checkpoint-up", snapshotDigest: ONE, sourceOutcome: "exec-a" }, ["programId and sourceOutcome share a value"]],
  [{ checkpointId: "checkpoint-up", snapshotDigest: ONE, sourceOutcome: "exec-a" }, ["programId missing"]],
];
/** Q1's plants: one per R-SPELLING member, each read as nothing. */
const SPELLING_PLANTS: readonly string[] = [
  'const name = "progr" + "amId";',
  'const name = "checkpoint\\u0049d";',
  "export const GraphPolicy = 1;",
  "const gp = load();",
  "const programid = PROGRAMID + GRAPHPOLICYCLI + GRAPHPOLICY_CLI;",
];

const REACHED: { readonly pin: string; readonly same: boolean }[] = [];
/** A pin's one witness compare: recorded, then asserted. */
function witness(pin: string, observed: unknown, expected: unknown): void {
  REACHED.push({ pin, same: isDeepStrictEqual(observed, expected) });
  expect(observed, `${pin}: the observed reading is its witness`).toEqual(expected);
}
const honest = (journal: readonly JournalEvent[] = JOURNAL): Run => run(() => reference(), journal);
const finalRows = (result: Run): readonly unknown[] => result.rows.at(-1) ?? [];
const byTwist = (...twists: Twist[]): Record<string, Check[]> => Object.fromEntries(twists.map(twist => [twist, failsOf(twist)]));
/** Whether each twist's run reads as the reference's at its last step (the same verdicts, last rows and last applications), so only an every-step read sees it. */
const settledBy = (...twists: Twist[]): Record<string, boolean> => {
  const last = (result: Run): unknown => ({ verdicts: result.verdicts, rows: result.rows.at(-1), applied: result.applied.at(-1) });
  return Object.fromEntries(twists.map(twist => [twist, isDeepStrictEqual(last(run(() => reference(twist))), last(honest()))]));
};
const stepsOf = (want: Expectation, journal: readonly JournalEvent[] = JOURNAL): number[] =>
  expectations(journal).flatMap((expectation, step) => (expectation === want ? [step] : []));
const presentationAt = (step: number, journal: readonly JournalEvent[] = JOURNAL): PresentedEvent => {
  const event = journal[step];
  if (event === undefined || event.kind !== "presented") throw new Error(`step ${step + 1} is no presentation`);
  return event;
};

const PINS: Readonly<Record<string, () => void>> = {
  T1: () => {
    const files = listed("src");
    const touched = files.filter(file => spelled(headText(file)).length > 0);
    const registered = [...RECORD_SITES.map(site => site.module), ...HOLDERS.map(holder => holder.module)];
    witness("T1", {
      floor: files.length >= SRC_FLOOR, core: files.includes(CORE), touched,
      unregistered: touched.filter(file => !registered.includes(file)), stale: registered.filter(file => !touched.includes(file)),
      sites: RECORD_SITES.map(site => site.module),
      siteFindings: RECORD_SITES.flatMap(site => [JOURNAL, ...NEGATIVE_FIXTURES.map(fixture => fixture.journal)]
        .flatMap(journal => judge(run(site.open, journal), journal)).map(finding => `${site.module} ${finding}`)),
    }, {
      floor: true, core: true, touched: ["src/workbench/detached-observer.ts", "src/workbench/hosts/local-detached.ts"], unregistered: [], stale: [], sites: [],
      siteFindings: [],
    });
  },
  T2: () => {
    witness("T2", {
      reader: READER_CONTROLS.map(([text]) => spelled(text)),
      holders: HOLDERS.map(holder => {
        const text = headText(holder.module);
        return { module: holder.module, spells: spelled(text), registered: isDeepStrictEqual(spelled(text), [...holder.members]), evidence: text.includes(holder.evidence) };
      }),
    }, {
      reader: READER_CONTROLS.map(([, names]) => names),
      holders: [
        { module: "src/workbench/detached-observer.ts", spells: ["snapshotDigest"], registered: true, evidence: true },
        { module: "src/workbench/hosts/local-detached.ts", spells: ["snapshotDigest"], registered: true, evidence: true },
      ],
    });
  },
  A1a: () => {
    const result = honest();
    witness("A1a", {
      decisions: finalRows(result).map(row => member(row, "decision")),
      members: [...new Set(finalRows(result).map(row => (isObject(row) ? Object.keys(row).sort().join(",") : "")))],
      findings: judge(result), controls: FIELD_CONTROLS.map(([row]) => fieldFindings(row)),
      ...byTwist("combined-basis", "nested-fields", "missing-outcome"),
    }, {
      decisions: ["d1", "d2", "d3", "d5", "d8"], members: ["checkpointId,decision,programId,snapshotDigest,sourceOutcome"], findings: [],
      controls: FIELD_CONTROLS.map(([, findings]) => findings),
      "combined-basis": ["four-fields", "replay"], "nested-fields": ["four-fields", "replay"], "missing-outcome": ["four-fields", "replay"],
    });
  },
  A1b: () => {
    const rows = finalRows(honest());
    const rowOf = (decision: string): unknown => rows.find(row => member(row, "decision") === decision);
    const differing = (other: string): string[] => FIELDS.filter(field => member(rowOf("d1"), field) !== member(rowOf(other), field));
    const swapped = (field: Field, other: string): string | undefined => replay({ ...fieldsOf(rowOf("d1")), [field]: member(rowOf(other), field) }).decision?.sourceOutcome;
    const receipt = gpReceipt();
    const values = FIELDS.map(field => at(receipt, REFERENTS[field]));
    witness("A1b", {
      pairs: { d2: differing("d2"), d3: differing("d3"), d5: differing("d5") },
      swapped: { programId: swapped("programId", "d2"), checkpointId: swapped("checkpointId", "d3"), snapshotDigest: swapped("snapshotDigest", "d5") },
      real: {
        referents: FIELDS.map(field => REFERENTS[field].join(".")),
        strings: values.every(value => typeof value === "string" && value !== ""), distinct: new Set(values).size === values.length,
        graphIsSnapshotBytes: at(receipt, REFERENTS.snapshotDigest) === digestOf(readFileSync(join(ROOT, GP_SNAPSHOT))),
        chosenIsCandidate: Array.isArray(member(receipt, "candidates")) && (member(receipt, "candidates") as unknown[]).includes(at(receipt, REFERENTS.sourceOutcome)),
      },
      ...byTwist("aliased-checkpoint"),
    }, {
      pairs: { d2: ["programId", "sourceOutcome"], d3: ["checkpointId", "sourceOutcome"], d5: ["snapshotDigest", "sourceOutcome"] },
      swapped: { programId: "exec-b", checkpointId: "exec-c", snapshotDigest: "exec-c" },
      real: { referents: ["program_digest", "checkpoint_digest", "graph_digest", "sample.chosen_id"], strings: true, distinct: true, graphIsSnapshotBytes: true, chosenIsCandidate: true },
      "aliased-checkpoint": ["four-fields", "replay"],
    });
  },
  A2a: () => {
    const rows = finalRows(honest());
    const admittedBy = new Map(stepsOf("admitted").map(step => [presentationAt(step).decision, presentationAt(step)]));
    witness("A2a", {
      replayed: rows.map(row => [member(row, "decision"), replay(fieldsOf(row)).decision?.sourceOutcome]),
      reconstructs: rows.map(row => {
        const event = admittedBy.get(String(member(row, "decision")));
        return event !== undefined && isDeepStrictEqual(replay(fieldsOf(row)).decision, decisionOf(event));
      }),
      ...byTwist("lazy-checkpoint", "lazy-digest", "mapped-outcome"),
    }, {
      replayed: [["d1", "exec-a"], ["d2", "exec-b"], ["d3", "exec-c"], ["d5", "exec-c"], ["d8", "exec-a"]], reconstructs: [true, true, true, true, true],
      "lazy-checkpoint": ["replay"], "lazy-digest": ["replay"], "mapped-outcome": ["replay"],
    });
  },
  A2b: () => {
    const row = finalRows(honest())[0];
    const fields = fieldsOf(row);
    const respelled = JSON.stringify(SNAPSHOT_ONE, null, 2);
    witness("A2b", {
      input: Object.keys(fieldsOf(isObject(row) ? { ...row, note: "a member the replay never reads" } : row)),
      store: [...SNAPSHOTS.entries()].map(([digest, snapshot]) => digest === digestOf(bytesOf(snapshot))),
      respelled: { sameDocument: isDeepStrictEqual(JSON.parse(respelled), SNAPSHOT_ONE), resolves: SNAPSHOTS.has(digestOf(respelled)) },
      unresolved: [
        { ...fields, programId: "program-z" }, { ...fields, checkpointId: "checkpoint-z" }, { ...fields, snapshotDigest: digestOf(respelled) }, { ...fields, sourceOutcome: 7 },
      ].map(input => replay(input).unresolved),
      ...byTwist("unprefixed-digest", "phantom-row", "phantom-application", "transient-phantom-application"),
      settled: settledBy("transient-phantom-application"),
    }, {
      input: ["programId", "checkpointId", "snapshotDigest", "sourceOutcome"], store: [true, true], respelled: { sameDocument: true, resolves: false },
      unresolved: ["programId names no program", "checkpointId names no checkpoint", "snapshotDigest names no snapshot", "a field is not a string"],
      "unprefixed-digest": ["replay"], "phantom-row": ["replay"], "phantom-application": ["replay"], "transient-phantom-application": ["replay"],
      settled: { "transient-phantom-application": true },
    });
  },
  A3a: () => {
    const result = honest();
    witness("A3a", {
      expected: expectations(JOURNAL).map((expectation, step) => `${step + 1}:${expectation ?? "basis"}`),
      stale: stepsOf("stale").map(step => [step + 1, presentationAt(step).decision, result.verdicts[step]]),
      ...byTwist("apply-stale", "untyped-stale", "frozen-basis", "settling-stale"),
    }, {
      expected: ["1:basis", "2:admitted", "3:admitted", "4:admitted", "5:duplicate", "6:unavailable", "7:basis", "8:admitted", "9:stale", "10:duplicate",
        "11:unavailable", "12:basis", "13:admitted"],
      stale: [[9, "d6", { verdict: "refused", reason: "stale" }]],
      "apply-stale": ["stale"], "untyped-stale": ["stale"], "frozen-basis": ["four-fields", "replay", "stale"],
      "settling-stale": ["four-fields", "replay", "stale"],
    });
  },
  A3b: () => {
    const result = honest();
    witness("A3b", {
      appliedAtAnyStep: result.applied.some(list => list.includes("d6")), recordedAtAnyStep: result.rows.some(rows => rows.some(row => member(row, "decision") === "d6")),
      returned: { basis: JOURNAL[11]?.snapshotDigest === ONE, d8: result.verdicts[12], d8Fields: isDeepStrictEqual(decisionOf(presentationAt(12)), decisionOf(presentationAt(8))) },
      applied: result.applied.at(-1),
      ...byTwist("rebase-stale", "retry-stale", "silent-apply-stale", "transient-stale-record", "transient-stale-application"),
      settled: settledBy("transient-stale-record", "transient-stale-application"),
    }, {
      appliedAtAnyStep: false, recordedAtAnyStep: false, returned: { basis: true, d8: { verdict: "admitted" }, d8Fields: true }, applied: ["d1", "d2", "d3", "d5", "d8"],
      "rebase-stale": ["stale"], "retry-stale": ["stale"], "silent-apply-stale": ["stale"], "transient-stale-record": ["stale"], "transient-stale-application": ["stale"],
      settled: { "transient-stale-record": true, "transient-stale-application": true },
    });
  },
  A4a: () => {
    const result = honest();
    const firstOf = (decision: string): PresentedEvent => presentationAt(stepsOf("admitted").find(step => presentationAt(step).decision === decision) ?? -1);
    const count = (list: readonly string[], decision: string): number => list.filter(id => id === decision).length;
    witness("A4a", {
      duplicates: stepsOf("duplicate").map(step => {
        const event = presentationAt(step);
        const rowsOf = (index: number): number => (result.rows[index] ?? []).filter(row => member(row, "decision") === event.decision).length;
        return {
          step: step + 1, decision: event.decision, sameFields: isDeepStrictEqual(decisionOf(event), decisionOf(firstOf(event.decision))), verdict: result.verdicts[step],
          rows: [rowsOf(step - 1), rowsOf(step)], applied: [count(result.applied[step - 1] ?? [], event.decision), count(result.applied[step] ?? [], event.decision)],
        };
      }),
      ...byTwist("readmit", "content-dedupe"),
    }, {
      duplicates: [
        { step: 5, decision: "d1", sameFields: true, verdict: { verdict: "refused", reason: "duplicate" }, rows: [1, 1], applied: [1, 1] },
        { step: 10, decision: "d2", sameFields: false, verdict: { verdict: "refused", reason: "duplicate" }, rows: [1, 1], applied: [1, 1] },
      ],
      readmit: ["replay", "duplicate"], "content-dedupe": ["replay", "duplicate"],
    });
  },
  A4b: () => {
    witness("A4b", {
      ...byTwist("idempotent-success", "differing-duplicate-success", "reapply", "duplicate-row", "duplicate-as-stale", "outcome-dedupe", "transient-duplicate-record",
        "transient-duplicate-application", "transient-differing-duplicate-record", "transient-differing-duplicate-application"),
      settled: settledBy("transient-duplicate-record", "transient-duplicate-application", "transient-differing-duplicate-record", "transient-differing-duplicate-application"),
    }, {
      "idempotent-success": ["duplicate"], "differing-duplicate-success": ["duplicate"], reapply: ["duplicate"], "duplicate-row": ["duplicate"],
      "duplicate-as-stale": ["duplicate"], "outcome-dedupe": ["four-fields", "replay", "duplicate"],
      "transient-duplicate-record": ["duplicate"], "transient-duplicate-application": ["duplicate"], "transient-differing-duplicate-record": ["duplicate"],
      "transient-differing-duplicate-application": ["duplicate"],
      settled: {
        "transient-duplicate-record": true, "transient-duplicate-application": true, "transient-differing-duplicate-record": true,
        "transient-differing-duplicate-application": true,
      },
    });
  },
  A5a: () => {
    witness("A5a", {
      names: NEGATIVE_FIXTURES.map(fixture => fixture.name),
      honest: NEGATIVE_FIXTURES.map(fixture => judge(honest(fixture.journal), fixture.journal)),
      verdicts: NEGATIVE_FIXTURES.map(fixture => honest(fixture.journal).verdicts.filter(verdict => verdict !== null)),
      members: NEGATIVE_FIXTURES.map(fixture => `${fixture.member}:${failsOf(fixture.member, fixture.journal).join("+")}`),
      ...byTwist("failure-recorded", "failure-as-admitted", "kill-as-admitted", "transient-failure-record", "transient-failure-application", "transient-kill-record",
        "transient-kill-application"),
      settled: settledBy("transient-failure-record", "transient-failure-application", "transient-kill-record", "transient-kill-application"),
    }, {
      names: ["worker fault", "stale basis", "worker kill", "duplicate replay"], honest: [[], [], [], []],
      verdicts: [
        [{ verdict: "admitted" }, { verdict: "unavailable" }], [{ verdict: "refused", reason: "stale" }, { verdict: "admitted" }],
        [{ verdict: "unavailable" }, { verdict: "admitted" }], [{ verdict: "admitted" }, { verdict: "refused", reason: "duplicate" }],
      ],
      members: ["fault-admitted:worker-failure", "apply-stale:stale", "kill-admitted:worker-failure", "readmit:duplicate"],
      "failure-recorded": ["worker-failure"], "failure-as-admitted": ["worker-failure"], "kill-as-admitted": ["worker-failure"],
      "transient-failure-record": ["worker-failure"], "transient-failure-application": ["worker-failure"], "transient-kill-record": ["worker-failure"],
      "transient-kill-application": ["worker-failure"],
      settled: { "transient-failure-record": true, "transient-failure-application": true, "transient-kill-record": true, "transient-kill-application": true },
    });
  },
  A5b: () => {
    witness("A5b", {
      frozen: NEGATIVE_FIXTURES.map(fixture => deepFrozen(fixture.journal)),
      deterministic: NEGATIVE_FIXTURES.map(fixture => isDeepStrictEqual(honest(fixture.journal), honest(fixture.journal))),
      resolved: NEGATIVE_FIXTURES.map(fixture => fixture.journal.every(event => SNAPSHOTS.has(event.snapshotDigest))),
      admitsOne: NEGATIVE_FIXTURES.map(fixture => stepsOf("admitted", fixture.journal).length),
      ownCheck: NEGATIVE_FIXTURES.map(fixture => isDeepStrictEqual(failsOf(fixture.member, fixture.journal), [fixture.check])),
    }, {
      frozen: [true, true, true, true], deterministic: [true, true, true, true], resolved: [true, true, true, true], admitsOne: [1, 1, 1, 1],
      ownCheck: [true, true, true, true],
    });
  },
  A5c: () => {
    const toml = headText(FORGE);
    const list = /^gate = \[([^\]\n]*)\]$/m.exec(toml);
    const gate = list?.[1]?.split(",").map(step => step.trim().replace(/^"|"$/g, "")) ?? [];
    const table = toml.slice(0, list?.index ?? 0).split("\n").filter(line => /^\[[^\]]+\]$/.test(line)).at(-1);
    const config = headText(VITEST_CONFIG);
    const listIn = (name: string): string[] => (new RegExp(`\\b${name}: \\[([^\\]]*)\\]`).exec(config)?.[1] ?? "").split(",").map(item => item.trim().replace(/^"|"$/g, "")).filter(item => item !== "");
    const include = listIn("include");
    const others = otherConfigs(listed("."));
    witness("A5c", {
      gate, table, test: /^\[build\.commands\.test\]\ncommand = "([^"\n]+)"$/m.exec(toml)?.[1],
      script: defaultRun(member(member(JSON.parse(headText(PACKAGE)), "scripts"), "test")),
      include, selected: include.some(glob => globMatches(glob, SELF)), excluded: listIn("exclude").includes(SELF),
      gpWords: GP_TIER_NAMES.filter(name => spells(toml, name)),
      others: { count: others.length >= 1, claiming: others.filter(file => claimsSelf(headText(file))) },
      plants: { configs: CONFIG_PLANTS.map(([file, text]) => otherConfigs([file]).length === 1 && claimsSelf(text)), scripts: SCRIPT_PLANTS.map(defaultRun) },
    }, {
      gate: ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"], table: "[build]", test: "npm run test", script: true,
      include: ["test/**/*.test.ts"], selected: true, excluded: false, gpWords: [], others: { count: true, claiming: [] },
      plants: { configs: [true, true, true, false, true, true, true, true, true, true], scripts: [false, false, false, false] },
    });
  },
  S1a: () => {
    const permit = decideControl(STOP, { projection: ownedProjection(), now: () => "2026-10-28T00:00:02Z" });
    const copies: Readonly<Record<string, unknown>> = { original: permit, spread: { ...permit }, json: JSON.parse(JSON.stringify(permit)), clone: structuredClone(permit) };
    witness("S1a", {
      decision: permit.decision, minted: Object.fromEntries(Object.entries(copies).map(([name, copy]) => [name, isCoreMintedDecision(copy)])),
      receiptRow: isCoreMintedDecision(finalRows(honest())[0]), reason: CONTROL_UNMINTED_REASON,
    }, {
      decision: "permitted", minted: { original: true, spread: false, json: false, clone: false }, receiptRow: false,
      reason: "decision was not minted by the decision core",
    });
  },
  S1b: () => {
    const anchor = docsAnchor("S1b");
    const named = (line: string): boolean => line.includes("`isCoreMintedDecision`") && line.includes("a deserialized or audit/journal-replayed receipt") &&
      line.includes(`"${CONTROL_UNMINTED_REASON}"`);
    const plants = { D1: "carrier-text", D2: "html", D6: "unbound:repeated" };
    const reading = {
      head: "holds", plants, respaced: { head: "holds", plants }, doubled: { D1: "needle-miss", D2: "needle-miss", D6: "unbound:repeated" },
      spacing: { afterMarker: { head: "holds", plants, markerKept: true }, noBlank: { head: "holds", plants }, betweenWords: { head: "holds", plants } },
    };
    witness("S1b", {
      line: named(lineOf(pinText(anchor.path), anchor.line)), ...anchorWitness(anchor),
      pjj: { pin: statusAt(pinText(EXPORT), "wb-pjj"), head: statusAt(headText(EXPORT), "wb-pjj") },
    }, {
      line: true, pin: "holds", controls: { line: "line", carrier: "carrier-text", twice: "carriers:2" }, ...reading,
      variants: { bare: reading, spaced: reading, deeper: reading }, pjj: { pin: "closed", head: "closed" },
    });
  },
  S2a: () => {
    const projection = new ObservationProjection();
    const event = (id: string, sequence: number, tone: NativeSnapshot["node"]["statusTone"]) => ({
      projectionEventId: id, source: RUN_REF, scope: SCOPE, sourceSequence: sequence, observedAt: AT, kind: "furnace.run.event",
      node: { presentation: { ...NODE, statusText: tone, statusTone: tone } },
    });
    const verdicts = [
      projection.ingest(event("evt-1", 1, "active")), projection.ingest(event("evt-2", 2, "success")), projection.ingest(event("evt-2", 2, "success")),
      projection.ingest(event("evt-0", 1, "failure")),
    ];
    witness("S2a", { verdicts, stats: projection.stats(), tones: projection.query({ scope: SCOPE, limit: 10 }).nodes.map(node => node.presentation.statusTone) }, {
      verdicts: ["applied", "applied", "duplicate", "out-of-order"], stats: { nodes: 1, events: 2, edges: 0 }, tones: ["success"],
    });
  },
  S2b: () => {
    const anchor = docsAnchor("S2b");
    const plants = { D3: "html", D4: "carriers:0", D5: "section", D7: "unbound:parent" };
    const reading = {
      head: "holds", plants, respaced: { head: "holds", plants }, doubled: { D3: "needle-miss", D4: "needle-miss", D5: "carriers:2", D7: "unbound:parent" },
      spacing: { afterMarker: { head: "holds", plants, markerKept: true }, noBlank: { head: "holds", plants }, betweenWords: { head: "holds", plants } },
    };
    witness("S2b", { line: lineOf(pinText(anchor.path), anchor.line), ...anchorWitness(anchor) }, {
      line: "2. Replay duplicate/out-of-order events; no double count or status regression.", pin: "holds",
      controls: { line: "line", carrier: "carrier-text", twice: "carriers:2" }, ...reading, variants: { bare: reading, spaced: reading, deeper: reading },
    });
  },
  S3a: () => {
    const projection = new ObservationProjection();
    projection.refresh({
      source: RUN_REF, scope: SCOPE, capturedAt: AT, observedAt: AT, sequence: 1, node: NODE, subjectBasis: "basis-one", sourceVersion: "version-one",
      definitionDigest: "digest-one",
    });
    const read = (): unknown[] => projection.query({ scope: SCOPE, limit: 10 }).nodes.map(node => [node.subjectBasis, node.sourceVersion, node.definitionDigest]);
    const before = read();
    const moved = projection.ingest({
      projectionEventId: "evt-digest", source: RUN_REF, scope: SCOPE, sourceSequence: 2, observedAt: AT, kind: "furnace.run.event",
      node: { presentation: NODE, definitionDigest: "digest-two" },
    });
    const version = `sha256:${"e".repeat(64)}`;
    const revision = `sha256:${"c".repeat(64)}`;
    const cohortOf = (stated: Pick<NativeSnapshot, "sourceVersion" | "sourceRevision">): unknown[] => {
      const own = new ObservationProjection();
      own.refresh({ source: RUN_REF, scope: SCOPE, capturedAt: AT, observedAt: AT, node: NODE, ...stated });
      return own.query({ scope: SCOPE, limit: 10 }).nodes.map(node => node.sourceVersion);
    };
    witness("S3a", {
      before, moved, after: read(),
      cohort: { both: cohortOf({ sourceVersion: version, sourceRevision: revision }), revisionOnly: cohortOf({ sourceRevision: revision }) },
    }, {
      before: [["basis-one", "version-one", "digest-one"]], moved: "applied", after: [["basis-one", "version-one", "digest-two"]],
      cohort: { both: [version], revisionOnly: [revision] },
    });
  },
  S3b: () => {
    const docs = (text: string) => {
      const members = envelopeMembers(text);
      return { envelope: ["subjectBasis", "definitionDigest", "sourceVersion"].map(name => members.includes(name)), names: text.includes("sourceVersion") };
    };
    const src = (text: string): number[] => ["subjectBasis", "sourceVersion", "definitionDigest"].map(name => declarations(text, name));
    witness("S3b", {
      docs: { pin: docs(pinText(OBSERVATION_DOC)), head: docs(headText(OBSERVATION_DOC)) },
      src: { pin: src(pinText(OBSERVATION_SRC)), head: src(headText(OBSERVATION_SRC)) },
      bundleBead: { pin: statusAt(pinText(EXPORT), "wb-973.8"), head: statusAt(headText(EXPORT), "wb-973.8") },
    }, {
      docs: { pin: { envelope: [true, true, false], names: false }, head: { envelope: [true, true, false], names: false } },
      src: { pin: [3, 3, 2], head: [3, 3, 2] }, bundleBead: { pin: "open", head: "closed" },
    });
  },
  Q1: () => {
    witness("Q1", SPELLING_PLANTS.map(spelled), SPELLING_PLANTS.map(() => []));
  },
  Q2: () => {
    const plant = (twist?: Twist) => {
      const result = run(() => reference(twist), PRECEDENCE_JOURNAL);
      return { verdict: result.verdicts[3], findings: judge(result, PRECEDENCE_JOURNAL) };
    };
    witness("Q2", {
      expected: expectations(PRECEDENCE_JOURNAL)[3], reference: plant(), staleFirst: plant("stale-first"), readmit: failsOf("readmit", PRECEDENCE_JOURNAL),
      idempotent: failsOf("idempotent-success", PRECEDENCE_JOURNAL),
    }, {
      expected: "either", reference: { verdict: { verdict: "refused", reason: "duplicate" }, findings: [] },
      staleFirst: { verdict: { verdict: "refused", reason: "stale" }, findings: [] }, readmit: ["duplicate"], idempotent: ["duplicate"],
    });
  },
  Q3: () => {
    const plant = (twist?: Twist) => {
      const result = run(() => reference(twist), REPRESENTED_JOURNAL);
      return { verdict: result.verdicts[3], findings: judge(result, REPRESENTED_JOURNAL) };
    };
    witness("Q3", { expected: expectations(REPRESENTED_JOURNAL).slice(2), reference: plant(), refused: plant("refuse-represented") }, {
      expected: ["stale", "unjudged"], reference: { verdict: { verdict: "admitted" }, findings: [] },
      refused: { verdict: { verdict: "refused", reason: "duplicate" }, findings: [] },
    });
  },
  Q4: () => {
    const sample = member(gpReceipt(), "sample");
    witness("Q4", {
      real: { rng: isObject(member(sample, "rng")), candidates: Array.isArray(member(gpReceipt(), "candidates")) },
      findings: judge(run(() => reference("sample-member"))), carried: finalRows(run(() => reference("sample-member"))).every(row => isDeepStrictEqual(member(row, "sample"), sample)),
    }, { real: { rng: true, candidates: true }, findings: [], carried: true });
  },
  Q5: () => {
    const side: string[] = [];
    const inner = reference();
    const plant: DecisionHost = {
      basis: digest => inner.basis(digest),
      present(presentation) {
        const verdict = inner.present(presentation);
        if (presentation.kind === "presented" && member(verdict, "reason") === "stale") side.push(presentation.decision);
        return verdict;
      },
      rows: () => inner.rows(),
      applied: () => inner.applied(),
    };
    witness("Q5", { findings: judge(run(() => plant)), side }, { findings: [], side: ["d6"] });
  },
  Q6: () => {
    const reuse = "\nconst gpDecision = { snapshotDigest: graph.digest };\n";
    witness("Q6", HOLDERS.map(holder => spelled(`${headText(holder.module)}${reuse}`)), [["snapshotDigest"], ["snapshotDigest"]]);
  },
  Q7: () => {
    witness("Q7", {
      plant: spelled(FIELDS.map(field => REFERENTS[field].join(".")).join(" ")),
      real: FIELDS.map(field => typeof at(gpReceipt(), REFERENTS[field]) === "string"),
    }, { plant: [], real: [true, true, true, true] });
  },
};

const FROZEN_TITLE = "rule 16: the rows, the checks, the mutants, the journal, the expectations, the fixtures, the vocabulary, the holders, the docs anchors and plants, the default-gate plants and the residual families are frozen at their measured shape";
const ANCHORS_TITLE = "the outside anchors: the bead's own row binds the trigger, the clauses, the anchors and their docs lines, the fields, the reasons, the fixtures and each label's coverage by its pin quotes; a later note binds nothing";
const LAST_TITLE = "registered tests: every pin case and fixed case, in order and in run mode, ran before this one; every pin reached its witness compare and each compare held";

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const body = PINS[pin];
        expect(body, `${pin} has a case`).toBeTypeOf("function");
        body?.();
      });
    }
  }

  it(FROZEN_TITLE, { timeout: LIVE_BUDGET_MS }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`), "rows and their pin counts").toEqual([
      "T:2", "A1:2", "A2:2", "A3:2", "A4:2", "A5:3", "S1:2", "S2:2", "S3:2", "Q:7",
    ]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(PINS), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...CHECKS], "the checks").toEqual(["four-fields", "replay", "stale", "duplicate", "worker-failure"]);
    expect(Object.entries(CHECK_OF).map(([id, check]) => `${id}:${check}`), "one check per Acceptance row").toEqual(ROWS.filter(row => /^A\d$/.test(row.id)).map((row, index) => `${row.id}:${CHECKS[index]}`));
    expect(MUTANTS.map(mutant => `${mutant.twist}:${mutant.refusedBy.join("+")}`), "the mutants and the checks each fails").toEqual([
      "combined-basis:four-fields+replay", "nested-fields:four-fields+replay", "missing-outcome:four-fields+replay", "aliased-checkpoint:four-fields+replay",
      "lazy-checkpoint:replay", "lazy-digest:replay", "unprefixed-digest:replay", "mapped-outcome:replay", "apply-stale:stale", "rebase-stale:stale",
      "untyped-stale:stale", "frozen-basis:four-fields+replay+stale", "settling-stale:four-fields+replay+stale", "retry-stale:stale", "silent-apply-stale:stale",
      "transient-stale-record:stale", "transient-stale-application:stale", "readmit:replay+duplicate", "content-dedupe:replay+duplicate", "idempotent-success:duplicate",
      "differing-duplicate-success:duplicate", "reapply:duplicate", "duplicate-row:duplicate",
      "duplicate-as-stale:duplicate", "outcome-dedupe:four-fields+replay+duplicate", "phantom-row:replay", "phantom-application:replay",
      "transient-phantom-application:replay", "fault-admitted:worker-failure", "kill-admitted:worker-failure", "failure-recorded:worker-failure",
      "failure-as-admitted:worker-failure", "kill-as-admitted:worker-failure", "transient-failure-record:worker-failure", "transient-failure-application:worker-failure",
      "transient-kill-record:worker-failure", "transient-kill-application:worker-failure", "transient-duplicate-record:duplicate", "transient-duplicate-application:duplicate",
      "transient-differing-duplicate-record:duplicate", "transient-differing-duplicate-application:duplicate",
    ]);
    expect(failsOf(), "the reference meets every check over the journal").toEqual([]);
    expect(NEGATIVE_FIXTURES.map(fixture => failsOf(undefined, fixture.journal)), "and over every fixture").toEqual([[], [], [], []]);
    expect(MUTANTS.map(mutant => `${mutant.twist}:${failsOf(mutant.twist).join("+")}`), "every mutant fails exactly its declared checks").toEqual(MUTANTS.map(mutant => `${mutant.twist}:${mutant.refusedBy.join("+")}`));
    expect(CHECKS.filter(check => !MUTANTS.some(mutant => mutant.refusedBy.includes(check))), "every check is failed by some mutant").toEqual([]);
    expect(CHECKS.filter(check => !MUTANTS.some(mutant => isDeepStrictEqual(mutant.refusedBy, [check]))), "every check but four-fields is failed by a mutant alone").toEqual(["four-fields"]);
    expect(JOURNAL.map(event => (event.kind === "basis" ? `basis:${event.snapshotDigest === ONE ? "ONE" : "TWO"}` : `${event.kind}:${event.decision}`)), "the journal").toEqual([
      "basis:ONE", "presented:d1", "presented:d2", "presented:d3", "presented:d1", "failed:d4", "basis:TWO", "presented:d5", "presented:d6", "presented:d2",
      "failed:d7", "basis:ONE", "presented:d8",
    ]);
    expect(expectations(JOURNAL).filter(expectation => expectation !== undefined), "the oracle's expectations").toEqual([
      "admitted", "admitted", "admitted", "duplicate", "unavailable", "admitted", "stale", "duplicate", "unavailable", "admitted",
    ]);
    expect(NEGATIVE_FIXTURES.map(fixture => `${fixture.name}:${fixture.journal.length}:${fixture.member}:${fixture.check}`), "the negative fixtures").toEqual([
      "worker fault:3:fault-admitted:worker-failure", "stale basis:4:apply-stale:stale", "worker kill:3:kill-admitted:worker-failure", "duplicate replay:3:readmit:duplicate",
    ]);
    expect([...VOCABULARY, ...REASONS], "the vocabulary and the reasons").toEqual(["GraphPolicyCLI", "programId", "checkpointId", "snapshotDigest", "sourceOutcome", "stale", "duplicate"]);
    expect([...FIELDS], "the fields are the vocabulary's other four members").toEqual(VOCABULARY.slice(1));
    expect(HOLDERS.map(holder => `${holder.module}:${holder.members.join("+")}`), "the holders").toEqual([
      "src/workbench/detached-observer.ts:snapshotDigest", "src/workbench/hosts/local-detached.ts:snapshotDigest",
    ]);
    expect(RESIDUALS.map(residual => `${residual.id}:${residual.name}:${residual.members.length}`), "the residual families").toEqual([
      "Q1:R-SPELLING:5", "Q2:R-PRECEDENCE:1", "Q3:R-REPRESENTED:1", "Q4:R-SAMPLED-REPLAY:1", "Q5:R-SIDE-RECORD:1", "Q6:R-HOLDER-REUSE:1", "Q7:R-REFERENT-NAMES:1",
    ]);
    expect(RESIDUALS.map(residual => residual.id), "one residual family per row Q pin").toEqual(ROWS.find(row => row.id === "Q")?.pins);
    expect(RESIDUALS.map(residual => QUOTES[residual.id]), "each row Q pin quotes its family").toEqual(RESIDUALS.map(residual => residual.name));
    expect(SPELLING_PLANTS.length, "a plant per R-SPELLING member").toBe(RESIDUALS.find(residual => residual.id === "Q1")?.members.length);
    expect(DOCS_ANCHORS.map(anchor => `${anchor.pin}:${anchor.path}#${anchor.heading}:${anchor.line}`), "the docs anchors").toEqual([
      "S1b:docs/workbench/12-security.md#Authorization design:23", "S2b:docs/workbench/09-observation-and-provenance.md#Acceptance/negative controls:88",
    ]);
    expect(DOCS_ANCHORS.map(anchor => ROWS.find(row => row.id === anchor.pin.slice(0, 2))?.pins.includes(anchor.pin)), "each docs anchor is a pin of its row").toEqual([
      true, true,
    ]);
    expect(DOCS_PLANTS.map(plant => `${plant.id}:${plant.anchor}`), "the docs plants").toEqual(["D1:S1b", "D2:S1b", "D3:S2b", "D4:S2b", "D5:S2b", "D6:S1b", "D7:S2b"]);
    expect({
      configs: CONFIG_PLANTS.map(([file, text]) => `${file}:${includesOf(text).join("+")}:${/\binclude:\[/.test(text) ? "unspaced" : "spaced"}`),
      scripts: SCRIPT_PLANTS.map(script => script.trim().split(/\s+/).slice(2).find(flag => !SCRIPT_FLAG.test(flag)) ?? "-"),
    }, "the default-gate plants: each config plant's include list and its spacing (include:[ written without a space), each script plant's first refused argument").toEqual({
      configs: [
        `vitest.gp-live.config.mts:${SELF}:spaced`, `configs/vitest.gp-live.config.ts:${SELF}:spaced`, "vitest.gp-live.config.ts:test/workbench-gp-*.test.ts:unspaced",
        "vitest.gp-census.config.ts:test/**/*.census.ts:spaced",
        `vitest.gp-live.config.js:${SELF}:spaced`, `vitest.gp-live.config.mjs:${SELF}:spaced`, `vitest.gp-live.config.cjs:${SELF}:spaced`,
        `vitest.gp-live.config.cts:${SELF}:spaced`, `qa/configs/vitest.config.ts:${SELF}:spaced`, `qa/configs/live/vitest.config.ts:${SELF}:spaced`,
      ],
      scripts: ["-c", "--config=vitest.gp-live.config.ts", "test/workbench-other.test.ts", "--exclude=test/workbench-gp-*.test.ts"],
    });
    expect(RECORD_SITES.map(site => site.module), "the record sites").toEqual([]);
  });

  it(ANCHORS_TITLE, { timeout: LIVE_BUDGET_MS }, () => {
    const { title, notes } = beadRow();
    const prefix = `[${REQUIREMENT}] `;
    expect(title.startsWith(prefix), "the title opens with the requirement id").toBe(true);
    const trigger = ROWS.find(row => row.id === "T")?.label ?? "-";
    expect(title.slice(prefix.length).startsWith(`${trigger} (artifact: `), "row T's label is the title's trigger, before its artifact parenthetical").toBe(true);
    expect(title.match(/(?<![A-Za-z])Graph[A-Z][A-Za-z]*/g), "the title names exactly the vocabulary's first member").toEqual([VOCABULARY[0]]);
    const filing = filingOf(notes);
    const labels = (pattern: RegExp): (string | undefined)[] => ROWS.filter(row => pattern.test(row.id)).map(row => row.label);
    expect(filing.clauses, "the Acceptance sentence's clauses are exactly the labels of rows A1 to A5").toEqual(labels(/^A\d$/));
    expect(filing.clauses.length, "one check per clause").toBe(CHECKS.length);
    expect(filing.anchors, "the Authority sentence's clauses are exactly the labels of rows S1 to S3").toEqual(labels(/^S\d$/));
    expect(PI_PIN.startsWith(filing.pin) && filing.pin.length >= 7, "the Pi pin is the filing's").toBe(true);
    const cited = (id: string): string | undefined => /\((?:[^();]*; )?(docs\/workbench\/[\w.-]+\.md:\d+)\)$/.exec(ROWS.find(row => row.id === id)?.label ?? "")?.[1];
    expect(DOCS_ANCHORS.map(anchor => `${anchor.path}:${anchor.line}`), "each docs anchor's page and line are the ones its row's label cites").toEqual(
      DOCS_ANCHORS.map(anchor => cited(anchor.pin.slice(0, 2))),
    );
    const acceptance = filing.clauses.join("; ");
    expect(acceptance.match(/(?<![A-Za-z])[a-z]+[A-Z][A-Za-z]*/g), "the Acceptance's camel-case members are exactly the fields").toEqual([...FIELDS]);
    expect(filing.clauses.flatMap(clause => /is refused (\w+)/.exec(clause)?.[1] ?? []), "the Acceptance's refusal words are exactly the reasons").toEqual([...REASONS]);
    const named = /\(([^()]*)\)/.exec(filing.clauses[4] ?? "")?.[1]?.split(", ");
    expect(named, "the fifth clause's parenthetical names exactly the fixtures").toEqual(NEGATIVE_FIXTURES.map(fixture => fixture.name));
    const slice = filing.slice.split("/").map(words);
    expect(slice.length === NEGATIVE_FIXTURES.length && NEGATIVE_FIXTURES.every((fixture, index) => {
      const own = words(fixture.name);
      const tail = slice[index] ?? [];
      return tail.length > 0 && isDeepStrictEqual(own.slice(own.length - tail.length), tail);
    }), "each slice-4 member ends its fixture's name").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(row.pins.map(pin => QUOTES[pin] ?? "").join(" "), `row ${row.id}'s pin quotes, joined, are its label`).toBe(row.label);
    }
    const appended = `${notes}\n\nCitation: a later note. Authority: x \u2014 y, and z @000000000000. Acceptance: w; v. May fold.\n`;
    expect(filingOf(appended), "a note appended after the filing changes no reading").toEqual(filing);
  });

  it(LAST_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const expected = [...ROWS.flatMap(row => row.pins.map(pin => `${pin}: ${QUOTES[pin] ?? ""}`)), FROZEN_TITLE, ANCHORS_TITLE, LAST_TITLE];
    expect(walked.map(entry => entry.name), "every registered test of this file, exactly and in order").toEqual(expected);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || (entry.state !== "pass" && entry.state !== "fail"))).map(entry => entry.name), "every other test is in run mode and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
  });
});
