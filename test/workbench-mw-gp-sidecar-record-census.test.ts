/**
 * wb-e66.3 (MW-GRAPH-POLICY-COORDINATION-R8, program-triage-2026-10-18), the R7 sidecar record census.
 * Statement (bead title, verbatim): "(merge into R7) Each R7 sidecar record shall carry as required: GP program/checkpoint
 * snapshot hash, feature projection, actor/selector, legal support at sample time, sampled decision with behavior log
 * probability, proposed vs admitted vs executed action with resolver verdict, source-owned effect receipt ref, verifier
 * outcome and final feedback status; any missing field is a typed refusal, never a default."
 * Acceptance (owner filing, verbatim; the labels of rows A, B, C and D): "a schema fixture with one positive record and one
 * negative per omitted field; a parity falsifier proving proposed, admitted and executed are three distinct fields
 * (admitted != executed survives); the resolver verdict is either admitted or one of MW's stable rejection codes
 * (INTENT_BASIS_STALE / INTENT_SCOPE_PROTECTED / INTENT_WRITE_CONFLICT / INTENT_BUDGET_EXCEEDED / INTENT_DUPLICATE /
 * INTENT_AUTHORITY_EXCEEDED per the wb-4ap.16 note); the abstain status is its own value, never success." The filing:
 * "Same gate and the same absence of any Pi bead or doc as R7 - this is the field list of the R7 record". No R7 bead exists
 * (R8 and R9 = wb-e66.4 are its filed halves) and no Pi module builds the record, so this census arms its contract for the
 * first one.
 *
 * MEASURED (read-only, by the cutting seats: cut #1 at trunk df37dac and cut #2 = respin 1 at e81d2b0 on 2026-10-28, cut #3 =
 * respin 2 at b3d410f and cut #4 = respin 3 at 1ad30c3 on 2026-10-29, the follow-up cut of wb-27pe at cdf5484 on 2026-10-30
 * and the follow-up cut of wb-4nh8 at 74f8aa7 on 2026-10-31). Pi: git's src listing holds 116 files at df37dac and 117 at
 * e81d2b0, at b3d410f, at 1ad30c3, at cdf5484 and at 74f8aa7, and none names a word of the vocabulary below, in its path or
 * its text; git grep -i over docs/ finds none of them either, so the
 * filing's "absence of any ... doc" still holds. "sidecar" is read as one word: its separator-tolerant spelling side car
 * reads src/workbench/designer.ts:308 ("one side carries"), a Pi word with another meaning. Producer (the local
 * MechanicalWorkflows checkout, git show, read by cut #1's seat; the roster's producer block holds the cited lines and their
 * blobs, and this census never re-reads the producer): at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8
 * (2026-10-18T17:34:59Z) the filing's citations are docs/programs/graph-policy-coordination-2026-10-18/README.md (blob
 * 0dbff582a14c) :15 and :23 and docs/programs/graph-policy-coordination-2026-10-18.md (blob 01ff00d480ec) :13 and :16, and
 * packages/coordination/src/resolver.ts (blob 1da5b67c3856, the same blob at cf214758bcff, the wb-4ap.16 note's pin) :4-10
 * is the RejectionCode union of exactly the six codes. LATER PRODUCER FACTS (MechanicalWorkflows origin/main f489cee4ce20,
 * read 2026-10-28; past this census's pin): a123aa150922 (2026-10-19T17:43:10Z) added
 * packages/coordination/schema/decision-receipt.v1.schema.json (mw.decision-receipt.v1), which README :15 now names as the
 * single home of the field list, every absent value written as the literal 'unknown'; its required set (schema, version,
 * decisionId, gp{graphHash, programHash, checkpointHash, snapshotHash}, featureProjectionDigest, actor{id, revision},
 * selector{id, revision}, support, logProb, completeness, actions{proposed, admitted, executed}, sourceReceipt,
 * resolverVerdict, verifierOutcome, feedback{status}) carries no decision status, takes any non-empty resolverVerdict and
 * writes 'unknown' for an absent value; d56fffe4c592 (2026-10-22) added a seventh code, INTENT_CLAIM_INVALID; the
 * overview's :27 records that GraphPolicyCLI specifies no abstain status (GraphPolicyCLI 9d1c789c649a, read 2026-10-28: git
 * grep -i abstain finds nothing, and the vendored gp decision receipt test/fixtures/gp-sample-receipt.json of wb-gxd7.5 is a
 * sampled-decision with sample.log_probability and no status). This census pins the filing: its field list, the six codes,
 * the abstain status. A host that adopts mw.decision-receipt.v1, or an MW pin past d56fffe4, re-measures rows C and D and the
 * residuals R-PLACEHOLDER-VALUE, R-OPEN-RECORD and R-COMPOSED-WORD.
 *
 * THE MODEL (this file and the schema fixture; test-only, src untouched).
 * - A record is a JSON object. Its fourteen REQUIRED fields are the statement's nine items in order (ITEMS), an item that
 *   joins two or more fields at "/", " vs " or " with " split there: actor/selector is actor and selector; the sampled
 *   decision with behavior log probability is decision and behaviorLogProbability; proposed vs admitted vs executed action
 *   with resolver verdict is proposed, admitted, executed and resolverVerdict; each other item is one field. A field's name
 *   is the camel-case join of a contiguous run of its phrase's words (snapshotHash from "GP program/checkpoint snapshot
 *   hash", support from "legal support at sample time", executed from "executed action"). How the items are cut into fields
 *   is this census's own reading of the statement: no outside source fixes it (the title reads actor/selector and GP
 *   program/checkpoint snapshot hash without saying how many fields each is), so no reading reads it (R-FIELD-PARTITION,
 *   Q8), and clause B's three distinct fields alone hold the action item's two " vs " cuts.
 * - A field is PRESENT when the record holds it as an own key whose value is neither undefined nor null; any other field is
 *   MISSING, in one of three FORMS: its key absent, its value undefined or its value null. The first missing field in the
 *   required order is the typed refusal {ok: false, code: "missing-field", field}, never an accepted record with a value
 *   filled in.
 * - decision is {status, chosen}: both present (else missing-field decision.status or decision.chosen, status first; a
 *   decision that is not an object holds neither); status is one of STATUSES, success or abstain, clause D's own two words
 *   (else {code: "status-domain", value}); a success names a non-empty chosen list (else {code: "success-without-choice"}: a
 *   success that chose nothing, or chose something that is not a list, is an abstain recorded as success) and an abstain an
 *   empty list (else {code: "decline-with-choice"}).
 * - resolverVerdict is admitted or one of the six codes (else {code: "verdict-domain", value}).
 * - The order of the readings: the missing fields, the decision's fields, its status, its choice, then the verdict.
 * - Otherwise the record is accepted, {ok: true, record}, the record exactly as given: nothing filled, nothing rewritten.
 * - support, chosen, the three actions and effectReceiptRef are lists ("agent:task" pairs, receipt refs); an empty list is
 *   an explicit value (nothing proposed, admitted, executed or receipted), never a missing field. So an abstain proposes
 *   nothing, and MW's reconcile over no intent rejects none: its verdict reads admitted, its action lists are empty, and the
 *   abstain lives in the decision's status, never in the verdict.
 * - THE ACCEPTED BASES (fifteen, BASES): the positive; the one-pair record; six parity falsifiers, of which three hold all
 *   three of proposed, admitted and executed apart (three-distinct, failed-execution, unexecuted) and three hold two values
 *   (admitted-not-executed, substituted, verified-not-executed), and which between them hold each two of the three actions
 *   apart under each verifier outcome the records carry (pass, partial, fail, not-run); the six rejected records (nothing
 *   admitted, one per code); and the abstain. Every base is a control accepted unchanged: the positive in K-POSITIVE, the
 *   one-pair record and the rejected records in K-VERDICT, the falsifiers in K-PARITY and the abstain in K-STATUS.
 * - THE CHECKS (judged by value: each control is a candidate record and the reading the reference gives it; every family
 *   below except the accepted bases is built over every base, and the rule-16 case freezes the controls' counts by check and
 *   family and the number of bases each family covers):
 *   K-POSITIVE: the positive accepted unchanged.
 *   K-NEGATIVE (each control lacks a required key): each base less one field (the positive's are the fixture's negatives);
 *   each base less two fields, every pair in every mix of forms that holds an absent key; each base less a field and every
 *   later one; and each base less one field beside each LATER FAULT (in reading order: a decision lacking its status, a
 *   decision lacking its choice, the decision a bare word, the off status skip, the choice its decision's status refuses,
 *   the off verdict rejected - one value each for the off status, the refused choice and the off verdict; a fault in the
 *   decision or the verdict never beside that field's own absence). Each reads as the typed refusal naming the first
 *   missing field.
 *   K-FORMS (no control lacks a required key; its missing required fields are undefined or null): each base's fields
 *   undefined and null; every
 *   pair in every mix of those two forms; each field undefined and null beside each later fault; and the decision's forms
 *   over each base's decision (status and chosen each absent, undefined and null; both together in every mix of the three
 *   forms; the decision a bare word, a list or a number; chosen absent beside the off status; status absent, chosen absent or
 *   the decision a bare word beside the off verdict). Each reads as the typed refusal naming the first missing field.
 *   K-PARITY: the six falsifiers accepted unchanged.
 *   K-VERDICT: admitted on the one-pair record and each code on its rejected record accepted; each off-domain value of
 *   OFF_VERDICTS over every base refused (each verdict word's four near misses - its other case, its capitalized form, a
 *   leading and a trailing space - and eleven others, INTENT_CLAIM_INVALID among them).
 *   K-STATUS: the abstain accepted unchanged; over every base, each off-domain status of OFF_STATUSES refused (each status
 *   word's four near misses and ten others), each shape of CHOICES its status refuses refused (a success choosing nothing or
 *   something that is not a list, an abstain choosing anything but an empty list), and the order controls read as the
 *   earlier refusal (the off status skip beside each shape that is not a list, each off status beside the off verdict, each
 *   refused choice beside the off verdict).
 * - THE REFERENCE validator is this reading. THE MUTANTS (forty, listed in the rule-16 case) each change one rule, some of
 *   them only in a context a base carries. The reference passes every check, each mutant fails exactly its declared checks
 *   (the roster's), and every check refuses one mutant alone.
 * - THE ARMED REGISTRATIONS (SITES, empty today): a src module that names the vocabulary must register its record validator
 *   there, and every check then judges it beside the reference (SUBJECTS: every subject reads every control as the reference
 *   does; the battery plants a registration of a defaulting validator and finds it judged and refused); an unregistered
 *   naming module, a stale registration and a duplicate are findings.
 * - THE SRC READING: every regular file git lists under src/ (tracked, plus untracked files git does not ignore; equal to the
 *   filesystem walk less git's ignored set), each read as text. A vocabulary word is read case-insensitively in the path or
 *   the text, any run of space, tab, dot, underscore or hyphen allowed between its camel-case parts: "sidecar" (the
 *   statement's record noun) and every field name of two or more parts (snapshotHash, featureProjection,
 *   behaviorLogProbability, resolverVerdict, effectReceiptRef, verifierOutcome, feedbackStatus). It runs in row S (S1, with
 *   its planted probes: a module naming words in its text, one naming a word in its path alone, one naming words through
 *   each of the five separators and through a run of them, and the registration probes) and again in the outside-anchor
 *   case. OVER-READ (disclosed): a src module that names a word for another reason (a sidecar process, another subject's
 *   feedbackStatus) reds both until it registers or the reading narrows.
 * - NAMES: the code says decline for the clause's abstain status and composes that word at run time (DECLINE, from two
 *   parts), and nested fields are named through nested(): test/workbench-ri-decision-state-echo-census.test.ts (wb-tz4r.2) D2
 *   judges every test module's identifiers and whole-token literals and every test JSON file's keys and whole-token values for
 *   the abstain and decision-status families, its own two files the only exemptions, and its R-COMPOSED residual is what a
 *   joined word costs. The bead's prose (labels, quotes, titles) keeps the word, read there as prose.
 *
 * ROWS (every claim about a subject is a claim over the controls above). A, the acceptance's first clause: A1 the fixture
 * (its required list, its positive's keys and its negatives' omitted fields are the fourteen in order, each negative the
 * positive less exactly its field); A2 the positive accepted unchanged; A3 each fixture negative refused naming its field.
 * B, the second: B1 the three actions are three required fields, every falsifier is accepted unchanged, three of the six
 * hold all three actions apart and three hold two, between them each two of the actions are apart under each verifier
 * outcome the records carry, and each collapsing or apart-refusing mutant of the battery is refused by the parity check; B2
 * a record whose admitted differs from its executed is accepted with both kept. C, the third: C1 every base whose verdict is
 * admitted accepted unchanged; C2 admitted on the one-pair record and each code on its rejected record accepted, each
 * off-domain value refused over every base, and each verdict mutant of the battery refused (unconditional, or only when
 * nothing was admitted); C3 the six codes are the wb-4ap.16 note's list and the roster's copy of the producer union's, and
 * INTENT_CLAIM_INVALID is refused over every base. D, the fourth: D1 the abstain accepted unchanged, and each off-domain
 * status, each refused choice and each order control of K-STATUS read so over every base; D2 never success (a missing
 * status over every base's decision is a refusal, never success; each choice shape its status refuses is refused over
 * every base; each mutant of the battery that lets an abstain read as success is refused). S, the statement: S1 the field
 * list and the src reading; S2 K-NEGATIVE and K-FORMS: every missing form - a field, a pair in every mix, a suffix, a field
 * beside each later fault, the decision's forms - over every base is the typed refusal naming the first missing field; S3
 * the defaulting mutants of the battery refused (unconditional, or conditioned on a context a base carries: an unverified
 * record, nothing executed, an abstain), and every missing form reads exactly ok, code and field: never accepted, no
 * record, nothing filled. Each of A2, A3, B1, C1, C2, C3, D1, D2, S2 and S3 judges every subject. Q, the residuals.
 * RESIDUALS (named families, each member a pinned quiet row; a reading that starts reading a member reds its row):
 * R-PLACEHOLDER-VALUE (Q1: a field present with an empty or placeholder value, an empty string or list or
 * mw.decision-receipt.v1's 'unknown', is accepted: presence is not a value check), R-OPEN-RECORD (Q2: a field outside the
 * fourteen, R9's reward or mw.decision-receipt.v1's decisionId, is accepted), R-VALUE-SHAPE (Q3: a present value of another
 * kind, a number hash, a positive or binary32-word log probability, a string support, an object actor, is accepted),
 * R-CROSS-FIELD (Q4: no consistency across fields is read: a choice outside the support, a rejection beside a non-empty
 * admitted list, an abstain beside executed actions), R-COMPOSED-WORD (Q5: a word the src reading does not read: side-car,
 * the spelling behaviour, mw.decision-receipt.v1's logProb and sourceReceipt, a name joined at run time, an escaped letter,
 * and a word split by a line break, a colon, a slash or an invisible character), R-UNNAMED-SITE (Q6: a module that builds
 * the record under none of the words), R-UNSEEN-CONTEXT (Q7: the controls are finite, so a validator that departs from
 * the reference only on records no control holds passes every check; each member is such a validator with a context record
 * it reads otherwise than the reference, in four kinds: (i) a value no base carries - a feedback default under an unseen
 * actor, a receipt default under an unseen feedback status, a collapse under an unseen verifier outcome, an off verdict
 * accepted under an unseen selector; (ii) a combination of carried values no one base holds - a status default under a
 * rejection code beside a passed verifier, an abstain recorded as success beside a rejection code, a collapse under a
 * rejection code beside divergent actions; (iii) a value or shape no list holds - an off verdict, an off status and a
 * success's number choice that the lists do not hold, each accepted; (iv) a fault combination the controls do not compose -
 * the second of three missing fields named when they are not a suffix, and the verdict read first beside an off status when
 * the verdict is an off value other than the order controls' rejected), R-FIELD-PARTITION (Q8: how an item is cut into
 * fields; each member re-cuts one item with its moved phrase re-homed, so every reading the census's own model holds still
 * holds - G19-SPLIT-SNAP, the first item cut at its slash into gpProgram and snapshotHash; G19-MERGE-ACTSEL, actor/selector
 * read as one field, actorSelector; the decision item read as one field, decision; the resolver verdict read into executed
 * - and its contrast, the same re-cut with the moved phrase left behind, reds join; clause B's three distinct fields hold
 * the action item's two " vs " cuts, so no member merges two actions), R-FIELD-RUN (Q9: which contiguous run of its phrase
 * a field name takes - G-REN-FP, featureProjection named projection, and S-FIELD-HASH, snapshotHash named hash, each a
 * one-part name that leaves the vocabulary; behaviorLogProbability named logProbability; support named legalSupport, a
 * two-part name that joins it - and its contrast, a name whose parts are no run, reds runs), R-PIN-PARTITION (Q10: where a
 * label is cut into pins - tiling reads that a row's quotes, in order, tile its label, never where its cuts fall; its members
 * are edits of six kinds, each over every tiled row (A-D and S): a pin merged into its sibling, its quote re-homed there -
 * C6A2, C6B2, C6C3, C6D2 and C6S1 - and its contrast, the same merge with the sibling's quote left in place; the cut between
 * two sibling pins moved over one word, the second quote's first word re-homed at the end of the first - G6-PIN-BOUNDARY-A
 * (A1/A2), S-PIN-BOUNDARY-B (B1/B2), S-PIN-BOUNDARY-C (C1/C2), S-PIN-BOUNDARY-D (D1/D2) and S-PIN-BOUNDARY-S (S2/S3) - and
 * its contrast, the same move with the word kept in its old quote as well; a pin cut in two at its quote's last space, a new
 * pin after it taking the last word - S-PIN-SPLIT-A (A3 and A4), S-PIN-SPLIT-B (B2 and B3), S-PIN-SPLIT-C (C3 and C4),
 * S-PIN-SPLIT-D (D2 and D3) and S-PIN-SPLIT-S (S3 and S4) - and its contrast, the same cut with the pin's quote kept whole;
 * the label's separator after a row's first pin taken into that pin's quote - S-PIN-SEPARATOR-A, S-PIN-SEPARATOR-B,
 * S-PIN-SEPARATOR-C, S-PIN-SEPARATOR-D and S-PIN-SEPARATOR-S - and its contrast, the separator taken in twice; a zero-width
 * pin, a new pin whose quote is empty, appended after a row's last pin - K5-EMPTY-PIN-END-A (A4 after A3),
 * K5-EMPTY-PIN-END-B (B3 after B2), K5-EMPTY-PIN-END-C (C4 after C3), K5-EMPTY-PIN-END-D (D3 after D2) and
 * K5-EMPTY-PIN-END-S (S4 after S3) - or inserted after its first pin - K5-EMPTY-PIN-MID-A, K5-EMPTY-PIN-MID-B,
 * K5-EMPTY-PIN-MID-C, K5-EMPTY-PIN-MID-D and K5-EMPTY-PIN-MID-S (the same new pins after A1, B1, C1, D1 and S1) - and its
 * contrast, the same pin given the last word of the pin it follows, which the label does not hold again there; and a
 * separator pin, a new pin after a row's first pin whose quote is the label's separator there - S-SEPARATOR-PIN-A,
 * S-SEPARATOR-PIN-B, S-SEPARATOR-PIN-C, S-SEPARATOR-PIN-D and S-SEPARATOR-PIN-S - and its contrast, the separator held
 * twice; each contrast reds that row's tiling. A placement or a composition of these kinds that no member holds (a
 * zero-width pin before a row's first pin, two merges in one row) is NOT CLAIMED by this census: no member's quiet row
 * holds it) and R-UNREAD (Q11: an edit of a model part no reading
 * takes - S-DECISION-FIELD-RENAME, the decision's second field named choice; C6Q, row Q removed whole with every residual
 * member; C6Q4, pin Q4 with its quote and members; C6-labelQ, row Q's label reworded; C6-quoteQ, Q3's quote reworded;
 * C6-member, Q1's first member removed; S-PRODUCER-PHRASE, a phrase cut from P3's text; PL-blob, P5's blob id). Each
 * member of Q8-Q11 is an edit of the anchor model (OUTSIDE ANCHORS): its quiet row asserts that the edit changes the model,
 * that it reds no reading the census's own model holds, and that its contrast reds the reading named wherever the
 * census's own model holds that reading; its witness carries what each member's contrast is measured to red, never the
 * reading's declared name alone, and the row first judges that contrast check on two planted members of its own, a dead
 * contrast the check must name and a live one it must pass.
 * OUTSIDE THE CLAIM: value shapes beyond presence, the two domains and the decision's chosen list (Q1, Q3); cross-field
 * consistency (Q4); a departure on a record no control holds (Q7); the final feedback status's closed set and any reward
 * (R9 = wb-e66.4); the selector's naming and its log-probability rules (R3 = wb-e66.2) and the support's legality (R2 =
 * wb-e66.1); the R7 record's home, schema id or version, and conformance to mw.decision-receipt.v1 or any producer pin past
 * 4b8b974ca72b; docs/ and test/ (only src is read), and a src entry that is not a regular file (a symbolic link); that a
 * producer line reads the same past the pin; a skip over the whole suite (a skipped describe block or file: nothing runs,
 * so nothing reds; the gate's marker rule guards it).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and the shape of every table
 * as literals (READINGS, the BOUND table as `${member}:${reading}` and each anchor-model family's contrast readings among
 * them); the judged set (every row's id, label and pins, every pin's quote, witness and assertion count, the assertion count
 * each of the three other judged cases ends on, the residual members, each mutant's declared checks, every registered test
 * title) is held to the out-of-file roster
 * test/fixtures/mw-gp-sidecar-record-roster.json (equal both ways, keys in order), and the records to the schema fixture
 * test/fixtures/mw-gp-sidecar-record-schema.json.
 * OUTSIDE ANCHORS (their own registered case; exactly what it reads). The anchor model (AnchorModel; LIVE is the census's
 * own) holds the census and roster literals the readings compare: the requirement id and the merge note, the rows and their
 * pins, the pin quotes, ITEMS (each item's text and its fields' names and phrases), ACTIONS, ADMITTED, the six codes, the
 * codes bead and its note pin, STATUSES, the record noun, the vocabulary's spellings, the decision's two fields, the residual
 * members, the producer pin and the roster's producer block. The 23 READINGS read the model against files outside the census
 * and its roster, except join and runs, which read its fields against the item texts the items reading holds to the title.
 * The files: the bead's own row in the tracker export (.beads/issues.jsonl), read through its title and its notes (the owner
 * filing's first "Acceptance shape: " sentence, split into its four clauses, and the producer pin and line citations
 * wherever the notes carry them), wb-4ap.16's row there, and git's src listing. title (the title is the requirement id, the
 * merge note and row S's label, then a period); statement (the title's statement is row S's label); clauses (the four
 * acceptance clauses are the labels of rows A, B, C and D, in order); tiling A, tiling B, tiling C, tiling D and tiling S (the
 * row's pin quotes, in order, tile its label with nothing but separators); items (the title's nine items are the model's
 * items, in order); join (each item is joined by its fields' phrases, one connector between each two); runs (each field
 * name's camel-case parts are a contiguous run of its phrase's words); actions (clause B's three words are ACTIONS and its
 * survivor's two are ACTIONS' last two); action fields (clause B's three words are three distinct field names); admitted,
 * codes and codes bead (clause C's word, its list of codes and the bead it cites); note codes (that bead's note lists the
 * codes at the note pin); statuses (clause D's two words); noun (the title's record noun); vocabulary (the title's record
 * noun, then each field name of two or more parts); pin cited (the notes carry the producer pin's first twelve characters
 * after an @); lines cited (the notes cite P1, P2 and P4 as file:line and P3 by its line); src (git's src listing, read as
 * the src reading reads its words, names no word of the model's vocabulary unregistered). BOUND: each BOUND member is an
 * edit of the anchor model, named for the coordinated census-and-roster edit it stands for, and the case asserts that each
 * reds the reading the BOUND table names beside it; every reading is red under at least one member. G6-merge-trunc, the
 * merge note cut to its first six characters, is among them: the title reading holds the merge note whole, never as a
 * prefix of the title.
 * So the readings hold by equality the labels of rows A-D and S, the requirement id and the merge note, the items' texts,
 * ACTIONS, ADMITTED, the codes, the codes bead and its note pin, STATUSES, the record noun and the vocabulary's spellings;
 * each pin quote's text once the row's split into pins - where each of its quotes starts and ends in the label, separators
 * included - is given; that each item is joined by its fields' phrases, that each
 * field name is a contiguous run of its phrase's words and that clause B's three words are three distinct fields; the
 * producer pin's first twelve characters, the files and lines of P1, P2 and P4 and P3's line; and git's src listing against
 * the vocabulary. They do not read how an item is cut into fields (R-FIELD-PARTITION), which run of its phrase a field name
 * takes (R-FIELD-RUN), the split of a label into pins (R-PIN-PARTITION), or the decision's two fields, row Q, the residual
 * members and the producer block beyond that pin prefix and those cited lines - its texts, blobs and repo, P3's file and P5
 * (R-UNREAD). The case also holds the census's own literals to the same outside sources directly, as cut #3's case did, and
 * reads the roster's own copy of the producer block - its RejectionCode union holds the six codes, P5 is the resolver's
 * path, and the lines carry the phrases they are read to carry - and those reads anchor nothing: the producer is never
 * re-read.
 * CLAIMED (each measured red, the change made in every literal of this file, the roster and the schema fixture together;
 * after each, the outside reading that reds it): removing a field from its item while the item's text and its other fields
 * stay, or rewording a field's phrase while its item's text stays (join); rewording an item's text, its phrase with it
 * (items); renaming a field to one whose parts are no contiguous run of its phrase's words (runs); removing or rewording an
 * action (actions), or merging one into a sibling field (action fields); removing or rewording a code (codes) or a status
 * (statuses); rewording the record noun (noun), or dropping it from the vocabulary (vocabulary); removing one of rows A-D,
 * or rewording a word of its label (clauses); removing row S (statement); removing one of rows A-D's or S's pins together
 * with its quote, or rewording a pin quote - a word of it changed, added or dropped while its sibling quotes stay (that
 * row's tiling). How an item is cut into fields is not among them: a field merged into a sibling with its phrase re-homed
 * there, or an item cut at a connector its phrase holds, keeps every reading (R-FIELD-PARTITION, Q8); nor is where a label
 * is cut into pins: a merge, a moved cut, a split, a separator taken into a quote, a zero-width pin added or a separator pin
 * added keeps every reading (R-PIN-PARTITION, Q10); and so do the other model edits Q9 and Q11 name.
 * NOT CLAIMED (limits of this file's own literals and of its last case, not reading modes: no source outside the census and
 * its roster names them; each measured surviving): a pin's case replaced by another passing case with the roster re-measured
 * to it; a mutant, a value-list entry with its controls, or a base removed from its table, the frozen literals and the
 * roster; a residual member removed from its table, the frozen literal and the roster; a BOUND member removed from the BOUND
 * table, its frozen literal and the roster's count of the outside-anchor case, where another member still reds the same
 * reading (S-ACTION-REWORD beside S-ACTION-DROP: every reading stays red under one); a row or pin id renamed everywhere it
 * appears; and a read of the last case's own removed, or a return before one - its REACHED, ASSERTED and ENDED reads and its
 * roster equalities among them (G7-REACHED-ASSERT-DROP, S-REACHED-SAME-DROP, G7-ASSERTED-ASSERT-DROP, G7-ENDED-ASSERT-DROP,
 * S-ROSTER-ROWS-DROP, S-ROSTER-EARLY-RETURN): no case runs after the last one, so nothing reach-pins its own reads, and each
 * clause of its title rests on a read that no later case checks.
 * The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it), REACHED
 * (every pin reached its witness compare, and each compare's own result), ASSERTED (each pin's case made the assertion
 * count the roster pins, its witness compare included) and ENDED (each of the three other judged cases - rule 16, the
 * mutant battery and the outside anchors - reached its last statement having made the assertion count the roster pins,
 * so a return before a later read, or a read removed, inside one of them reds). Nothing reach-pins the last case's own
 * reads (NOT CLAIMED, above).
 *
 * Display paths added: none. Test-only: no src change, no sidecar module, schema, validator or seam in src.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it } from "vitest";
import { acceptanceClauses, beadRow, gitList, ignoredOf, partsOf, tiles, walkList } from "./helpers/gp-mw-coordination-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-e66.3";
const REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R8";
const SUITE = `mw gp sidecar record census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/mw-gp-sidecar-record-roster.json";
const SCHEMA_PATH = "test/fixtures/mw-gp-sidecar-record-schema.json";
const EXPORT = ".beads/issues.jsonl";
/** The bead whose note the acceptance cites for the six codes, and the producer pin that note reads them at. */
const CODES_BEAD = "wb-4ap.16";
const CODES_NOTE_PIN = "cf21475";
/** The filing's producer pin: the program lines it cites and the resolver union of the codes. */
const PRODUCER_PIN = "4b8b974ca72bf2ed36b99e315e45857c6181fbe8";
/** What the title holds between the requirement id and row S's label. */
const MERGE_NOTE = "(merge into R7) ";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** A src module the listing must read, with a line it must hold. */
const SRC_ANCHOR = { path: "src/workbench/redaction.ts", token: "export function sanitizeWorkbenchText(" };
const LIVE_BUDGET_MS = 60_000;

// ---- the model ----

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
/** What a candidate record may hold: JSON, or undefined (a missing field's undefined form). */
type Loose = undefined | null | boolean | number | string | readonly Loose[] | { readonly [key: string]: Loose };
type Holder = { readonly [key: string]: Loose };

interface Field {
  readonly name: string;
  /** The words of the statement's item that name this field. */
  readonly phrase: string;
}
interface Item {
  /** One item of the statement's list, verbatim. */
  readonly item: string;
  readonly fields: readonly Field[];
}

/** The statement's nine items in order; an item that joins two or more fields at "/", " vs " or " with " is split there. */
const ITEMS: readonly Item[] = [
  { item: "GP program/checkpoint snapshot hash", fields: [{ name: "snapshotHash", phrase: "GP program/checkpoint snapshot hash" }] },
  { item: "feature projection", fields: [{ name: "featureProjection", phrase: "feature projection" }] },
  {
    item: "actor/selector",
    fields: [
      { name: "actor", phrase: "actor" },
      { name: "selector", phrase: "selector" },
    ],
  },
  { item: "legal support at sample time", fields: [{ name: "support", phrase: "legal support at sample time" }] },
  {
    item: "sampled decision with behavior log probability",
    fields: [
      { name: "decision", phrase: "sampled decision" },
      { name: "behaviorLogProbability", phrase: "behavior log probability" },
    ],
  },
  {
    item: "proposed vs admitted vs executed action with resolver verdict",
    fields: [
      { name: "proposed", phrase: "proposed" },
      { name: "admitted", phrase: "admitted" },
      { name: "executed", phrase: "executed action" },
      { name: "resolverVerdict", phrase: "resolver verdict" },
    ],
  },
  { item: "source-owned effect receipt ref", fields: [{ name: "effectReceiptRef", phrase: "source-owned effect receipt ref" }] },
  { item: "verifier outcome", fields: [{ name: "verifierOutcome", phrase: "verifier outcome" }] },
  { item: "final feedback status", fields: [{ name: "feedbackStatus", phrase: "final feedback status" }] },
];
/** The fourteen required fields, in the statement's order. */
const FIELDS: readonly string[] = ITEMS.flatMap(entry => entry.fields.map(field => field.name));
/** The words that join two fields' phrases inside one item. */
const CONNECTORS: readonly string[] = ["/", " vs ", " with "];
/** The three action fields clause B names, in its order. */
const ACTIONS: readonly string[] = ["proposed", "admitted", "executed"];
/** The decision's own two fields. */
const DECISION_FIELDS: readonly string[] = ["status", "chosen"];
/** Clause D's abstain status, composed from two parts (NAMES). */
const DECLINE = ["abs", "tain"].join("");
/** The decision's status: clause D's own two words. */
const STATUSES: readonly string[] = ["success", DECLINE];
const ADMITTED = "admitted";
/** MW's stable rejection codes: the RejectionCode union at the pin, clause C's list. */
const CODES: readonly string[] = ["INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT", "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED"];
const VERDICTS: readonly string[] = [ADMITTED, ...CODES];
/** The code MW added after the pin (d56fffe4c592, 2026-10-22): outside the filing's domain. */
const LATER_CODE = "INTENT_CLAIM_INVALID";

/** An item joined by its fields' phrases, each two separated by one connector. */
function joined(item: string, phrases: readonly string[]): boolean {
  let at = 0;
  for (const [index, phrase] of phrases.entries()) {
    if (index > 0) {
      const connector = CONNECTORS.find(candidate => item.startsWith(candidate, at));
      if (connector === undefined) return false;
      at += connector.length;
    }
    if (!item.startsWith(phrase, at)) return false;
    at += phrase.length;
  }
  return at === item.length;
}

const isHolder = (value: Loose): value is Holder => typeof value === "object" && value !== null && !Array.isArray(value);
/** A nested field's name: decision.<key>. */
const nested = (key: string): string => `decision.${key}`;
/** A field is present when the holder has it as an own key whose value is neither undefined nor null. */
const present = (holder: Holder, key: string): boolean => Object.hasOwn(holder, key) && holder[key] !== undefined && holder[key] !== null;

type Refusal =
  | { readonly ok: false; readonly code: "missing-field"; readonly field: string }
  | { readonly ok: false; readonly code: "status-domain" | "verdict-domain"; readonly value: Loose }
  | { readonly ok: false; readonly code: "success-without-choice" | "decline-with-choice" };
type Reading = { readonly ok: true; readonly record: Holder } | Refusal;
/** A record validator under judgment: the reference, a mutant or a registered src site. */
type Validator = (candidate: Holder) => unknown;

interface Rules {
  readonly required: readonly string[];
  readonly present: (holder: Holder, key: string) => boolean;
  readonly status: (value: Loose) => boolean;
  readonly verdict: (value: Loose) => boolean;
  readonly successChooses: boolean;
  readonly declineChoosesNothing: boolean;
}
const RULES: Rules = {
  required: FIELDS,
  present,
  status: value => typeof value === "string" && STATUSES.includes(value),
  verdict: value => typeof value === "string" && VERDICTS.includes(value),
  successChooses: true,
  declineChoosesNothing: true,
};

/** The validator a rule set reads: the first missing field in order, the decision's fields, its status and choice, then the verdict. */
function validatorOf(rules: Rules): (candidate: Holder) => Reading {
  return candidate => {
    for (const field of rules.required) if (!rules.present(candidate, field)) return { ok: false, code: "missing-field", field };
    const decision = candidate.decision;
    const holder: Holder = isHolder(decision) ? decision : {};
    for (const key of DECISION_FIELDS) if (!rules.present(holder, key)) return { ok: false, code: "missing-field", field: nested(key) };
    const status = holder.status;
    if (!rules.status(status)) return { ok: false, code: "status-domain", value: status };
    const chosen = holder.chosen;
    const count = Array.isArray(chosen) ? chosen.length : -1;
    if (rules.successChooses && status === "success" && count < 1) return { ok: false, code: "success-without-choice" };
    if (rules.declineChoosesNothing && status === DECLINE && count !== 0) return { ok: false, code: "decline-with-choice" };
    if (!rules.verdict(candidate.resolverVerdict)) return { ok: false, code: "verdict-domain", value: candidate.resolverVerdict };
    return { ok: true, record: candidate };
  };
}
/** THE REFERENCE: the model's reading. */
const REFERENCE = validatorOf(RULES);

// ---- the records ----

interface Negative {
  readonly omitted: string;
  readonly record: Holder;
}
interface Schema {
  readonly comment: string;
  readonly bead: string;
  readonly required: readonly string[];
  readonly positive: Holder;
  readonly negatives: readonly Negative[];
}
const SCHEMA = JSON.parse(readFileSync(join(ROOT, SCHEMA_PATH), "utf8")) as Schema;
const POSITIVE: Holder = SCHEMA.positive;

const over = (base: Holder, change: Holder): Holder => ({ ...base, ...change });
/** A record less one field's key. */
const lessField = (record: Holder, field: string): Holder => Object.fromEntries(Object.entries(record).filter(([key]) => key !== field));
/** A one-pair record whose three actions are equal (the verdict controls' admitted base). */
const SINGLE = over(POSITIVE, { decision: { status: "success", chosen: ["a1:t1"] }, proposed: ["a1:t1"], admitted: ["a1:t1"], executed: ["a1:t1"], effectReceiptRef: ["receipt:host/0001"] });
/** The parity falsifiers: three hold all three actions apart and three hold two values, and between them each two of proposed, admitted and executed are apart under each verifier outcome the records carry (B1 computes both). */
const FALSIFIERS: Readonly<Record<string, Holder>> = {
  "admitted-not-executed": over(POSITIVE, { executed: ["a1:t1"], effectReceiptRef: ["receipt:host/0001"], verifierOutcome: "partial" }),
  substituted: over(POSITIVE, { admitted: ["a1:t2"], executed: ["a1:t2"], effectReceiptRef: ["receipt:host/0003"] }),
  "three-distinct": over(POSITIVE, { admitted: ["a1:t2", "a2:t2"], executed: ["a2:t2"], effectReceiptRef: ["receipt:host/0002"], verifierOutcome: "partial" }),
  "verified-not-executed": over(POSITIVE, { executed: ["a1:t1"], effectReceiptRef: ["receipt:host/0001"] }),
  "failed-execution": over(POSITIVE, { admitted: ["a1:t2", "a2:t2"], executed: ["a1:t2"], effectReceiptRef: ["receipt:host/0004"], verifierOutcome: "fail" }),
  unexecuted: over(POSITIVE, { admitted: ["a1:t1"], executed: [], effectReceiptRef: [], verifierOutcome: "not-run", feedbackStatus: "pending" }),
};
/** A rejected record: nothing admitted or executed; its verdict is set per code. */
const REJECTED = over(POSITIVE, { admitted: [], executed: [], effectReceiptRef: [], verifierOutcome: "not-run", feedbackStatus: "pending" });
/** An abstain: its decision's status is the abstain word and it chose nothing, so it proposes nothing and reconcile rejects none. */
const DECLINED = over(POSITIVE, {
  decision: { status: DECLINE, chosen: [] },
  behaviorLogProbability: -1.204,
  proposed: [],
  admitted: [],
  executed: [],
  effectReceiptRef: [],
  verifierOutcome: "not-run",
  feedbackStatus: "pending",
});
interface Base {
  readonly name: string;
  readonly record: Holder;
}
/** THE ACCEPTED BASES: the positive, the one-pair record, each falsifier, each rejected record and the abstain. */
const BASES: readonly Base[] = [
  { name: "positive", record: POSITIVE },
  { name: "single", record: SINGLE },
  ...Object.entries(FALSIFIERS).map(([name, record]) => ({ name, record })),
  ...CODES.map(code => ({ name: code, record: over(REJECTED, { resolverVerdict: code }) })),
  { name: "decline", record: DECLINED },
];
/** A word's four near misses: its other case, its capitalized form, and the word after a leading and before a trailing space. */
const nearMisses = (word: string): string[] => [word === word.toUpperCase() ? word.toLowerCase() : word.toUpperCase(), `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`, ` ${word}`, `${word} `];
/** The off-domain verdicts: each verdict word's near misses, then eleven others (INTENT_CLAIM_INVALID among them). */
const OFF_VERDICTS: readonly Loose[] = [...VERDICTS.flatMap(nearMisses), "rejected", "accepted", "substituted", "INTENT_UNKNOWN", "INTENT_", "", LATER_CODE, 0, true, [ADMITTED], { code: "INTENT_DUPLICATE" }];
/** The off-domain statuses: each status word's near misses, then ten others. */
const OFF_STATUSES: readonly Loose[] = [...STATUSES.flatMap(nearMisses), `${DECLINE}ed`, "sampled", "skip", "none", "failure", "", 1, true, [DECLINE], { status: "success" }];
/** The decision's choice shapes: three lists and five other kinds. */
const CHOICES: Readonly<Record<string, Loose>> = {
  nothing: [],
  "a pair": ["a1:t1"],
  "two pairs": ["a1:t1", "a2:t2"],
  "a bare word": "a1:t1",
  "an empty word": "",
  "a number": 1,
  "a flag": true,
  "an object": { pair: "a1:t1" },
};
const POSITIVE_DECISION: Holder = isHolder(POSITIVE.decision) ? POSITIVE.decision : {};
const withDecision = (decision: Loose, base: Holder = POSITIVE): Holder => over(base, { decision });

// ---- the checks ----

const missing = (field: string): Reading => ({ ok: false, code: "missing-field", field });
const acceptedAs = (record: Holder): Reading => ({ ok: true, record });
const offVerdict = (value: Loose): Reading => ({ ok: false, code: "verdict-domain", value });
const offStatus = (value: Loose): Reading => ({ ok: false, code: "status-domain", value });
const shown = (value: Loose): string => JSON.stringify(value) ?? "undefined";

const SUCCESS_WITHOUT_CHOICE: Reading = { ok: false, code: "success-without-choice" };
const DECLINE_WITH_CHOICE: Reading = { ok: false, code: "decline-with-choice" };

interface Control {
  /** The base the control is built on. */
  readonly base: string;
  /** The control's family within its check. */
  readonly family: string;
  readonly label: string;
  readonly candidate: Holder;
  readonly expected: Reading;
}
type CheckId = "K-POSITIVE" | "K-NEGATIVE" | "K-FORMS" | "K-PARITY" | "K-VERDICT" | "K-STATUS";
const CHECK_IDS: readonly CheckId[] = ["K-POSITIVE", "K-NEGATIVE", "K-FORMS", "K-PARITY", "K-VERDICT", "K-STATUS"];

/** A missing field's three forms: its key absent, its value undefined, its value null. */
type Form = "absent" | "undefined" | "null";
const FORMS: readonly Form[] = ["absent", "undefined", "null"];
const formOf = (holder: Holder, key: string, form: Form): Holder => (form === "absent" ? lessField(holder, key) : over(holder, { [key]: form === "undefined" ? undefined : null }));
/** Every pair of required fields, in the required order. */
const PAIRS: readonly (readonly [string, string])[] = FIELDS.flatMap((first, at) => FIELDS.slice(at + 1).map(second => [first, second] as const));
/** Every mix of two forms, the earlier field's form first. */
const MIXES: readonly (readonly [Form, Form])[] = FORMS.flatMap(first => FORMS.map(second => [first, second] as const));
/** A record's decision as a holder (an empty one when it holds none). */
const decisionOf = (record: Holder): Holder => (isHolder(record.decision) ? record.decision : {});
/** A record's decision status as a bare word (success when it holds none): the decision that is not an object. */
const bareWordOf = (record: Holder): string => {
  const status = decisionOf(record).status;
  return typeof status === "string" ? status : "success";
};
/** A decision holding the choice its status refuses: a pair for an abstain, nothing for any other status. */
const refusedChoice = (decision: Holder): Holder => ({ ...decision, chosen: decision.status === DECLINE ? ["a1:t1"] : [] });
/** The off status and the off verdict the order controls set beside an earlier fault. */
const ORDER_STATUS = "skip";
const ORDER_VERDICT = "rejected";

interface Fault {
  readonly name: string;
  /** The required field the fault sits in; no control sets the fault beside that field's own absence. */
  readonly field: string;
  readonly apply: (record: Holder) => Holder;
}
/** THE LATER FAULTS: one of each kind that reads after the missing fields, in reading order. */
const LATER_FAULTS: readonly Fault[] = [
  { name: "a decision lacking its status", field: "decision", apply: record => withDecision(lessField(decisionOf(record), "status"), record) },
  { name: "a decision lacking its choice", field: "decision", apply: record => withDecision(lessField(decisionOf(record), "chosen"), record) },
  { name: "the decision a bare word", field: "decision", apply: record => withDecision(bareWordOf(record), record) },
  { name: "the off status", field: "decision", apply: record => withDecision({ ...decisionOf(record), status: ORDER_STATUS }, record) },
  { name: "the choice its status refuses", field: "decision", apply: record => withDecision(refusedChoice(decisionOf(record)), record) },
  { name: "the off verdict", field: "resolverVerdict", apply: record => over(record, { resolverVerdict: ORDER_VERDICT }) },
];

/** A base's missing-field controls: K-NEGATIVE's when withAbsent (each lacks a key), else K-FORMS's (none lacks a key). */
function missingControls(base: Base, withAbsent: boolean): Control[] {
  const record = base.record;
  const control = (family: string, label: string, candidate: Holder, field: string): Control => ({ base: base.name, family, label: `${base.name}: ${label}`, candidate, expected: missing(field) });
  const forms: readonly Form[] = withAbsent ? ["absent"] : ["undefined", "null"];
  const named = (field: string, form: Form): string => (form === "absent" ? `omit ${field}` : `${field} ${form}`);
  const singles =
    withAbsent && record === POSITIVE
      ? SCHEMA.negatives.map(negative => control("single", `omit ${negative.omitted}`, negative.record, negative.omitted))
      : FIELDS.flatMap(field => forms.map(form => control("single", named(field, form), formOf(record, field, form), field)));
  const pairs = PAIRS.flatMap(([first, second]) =>
    MIXES.filter(mix => mix.includes("absent") === withAbsent).map(([one, two]) => control("pair", `${named(first, one)}, ${named(second, two)}`, formOf(formOf(record, first, one), second, two), first)),
  );
  const suffixes = withAbsent
    ? FIELDS.slice(0, -1).map((field, index) => control("suffix", `omit ${field} and every later field`, Object.fromEntries(Object.entries(record).filter(([key]) => FIELDS.indexOf(key) < index)), field))
    : [];
  const beside = FIELDS.flatMap(field =>
    forms.flatMap(form => LATER_FAULTS.filter(fault => fault.field !== field).map(fault => control("beside", `${named(field, form)} beside ${fault.name}`, formOf(fault.apply(record), field, form), field))),
  );
  return [...singles, ...pairs, ...suffixes, ...beside];
}

/** A base's decision forms (K-FORMS): each the typed refusal naming the decision's first missing field. */
function decisionControls(base: Base): Control[] {
  const record = base.record;
  const decision = decisionOf(record);
  const word = bareWordOf(record);
  const control = (label: string, candidate: Holder, key: string): Control => ({ base: base.name, family: "decision", label: `${base.name}: ${label}`, candidate, expected: missing(nested(key)) });
  const shapes: readonly (readonly [string, Loose])[] = [
    ["a bare word", word],
    ["a list", [word]],
    ["a number", 1],
  ];
  return [
    ...DECISION_FIELDS.flatMap(key => FORMS.map(form => control(`${nested(key)} ${form}`, withDecision(formOf(decision, key, form), record), key))),
    ...MIXES.map(([one, two]) => control(`${nested("status")} ${one}, ${nested("chosen")} ${two}`, withDecision(formOf(formOf(decision, "status", one), "chosen", two), record), "status")),
    ...shapes.map(([shape, value]) => control(`the decision ${shape}`, withDecision(value, record), "status")),
    control(`${nested("chosen")} absent beside the off status`, withDecision({ ...lessField(decision, "chosen"), status: ORDER_STATUS }, record), "chosen"),
    ...DECISION_FIELDS.map(key => control(`${nested(key)} absent beside the off verdict`, over(withDecision(lessField(decision, key), record), { resolverVerdict: ORDER_VERDICT }), key)),
    control("the decision a bare word beside the off verdict", over(withDecision(word, record), { resolverVerdict: ORDER_VERDICT }), "status"),
  ];
}

interface ChoiceFault {
  readonly label: string;
  readonly status: string;
  readonly chosen: Loose;
  readonly expected: Reading;
}
/** Each status beside each choice shape its reading refuses: a success choosing nothing or something that is not a list, an abstain choosing anything but an empty list. */
const CHOICE_FAULTS: readonly ChoiceFault[] = STATUSES.flatMap(status =>
  Object.entries(CHOICES)
    .filter(([, chosen]) => (status === DECLINE ? !(Array.isArray(chosen) && chosen.length === 0) : !(Array.isArray(chosen) && chosen.length > 0)))
    .map(([shape, chosen]) => ({ label: `${status} choosing ${shape}`, status, chosen, expected: status === DECLINE ? DECLINE_WITH_CHOICE : SUCCESS_WITHOUT_CHOICE })),
);

/** K-VERDICT: admitted on the one-pair record and each code on its rejected record accepted; each off-domain value over every base refused. */
function verdictControls(): Control[] {
  const accepted = BASES.filter(base => base.record === SINGLE || CODES.includes(String(base.record.resolverVerdict)));
  return [
    ...accepted.map(base => ({ base: base.name, family: "accepted", label: `${base.name}: ${String(base.record.resolverVerdict)} accepted`, candidate: base.record, expected: acceptedAs(base.record) })),
    ...BASES.flatMap(base => OFF_VERDICTS.map(value => ({ base: base.name, family: "off", label: `${base.name}: off ${shown(value)}`, candidate: over(base.record, { resolverVerdict: value }), expected: offVerdict(value) }))),
  ];
}

/** K-STATUS: the abstain accepted unchanged; over every base, each off status, each refused choice and each order control. */
function statusControls(): Control[] {
  const perBase = BASES.flatMap(base => {
    const record = base.record;
    const decision = decisionOf(record);
    const control = (family: string, label: string, candidate: Holder, expected: Reading): Control => ({ base: base.name, family, label: `${base.name}: ${label}`, candidate, expected });
    const offAt = (value: Loose): Holder => withDecision({ ...decision, status: value }, record);
    const choiceAt = (fault: ChoiceFault): Holder => withDecision({ status: fault.status, chosen: fault.chosen }, record);
    const besideOffVerdict = (candidate: Holder): Holder => over(candidate, { resolverVerdict: ORDER_VERDICT });
    return [
      ...OFF_STATUSES.map(value => control("off", `off ${shown(value)}`, offAt(value), offStatus(value))),
      ...CHOICE_FAULTS.map(fault => control("choice", fault.label, choiceAt(fault), fault.expected)),
      ...Object.entries(CHOICES)
        .filter(([, chosen]) => !Array.isArray(chosen))
        .map(([shape, chosen]) => control("order", `the off status beside ${shape}`, withDecision({ status: ORDER_STATUS, chosen }, record), offStatus(ORDER_STATUS))),
      ...OFF_STATUSES.map(value => control("order", `off ${shown(value)} beside the off verdict`, besideOffVerdict(offAt(value)), offStatus(value))),
      ...CHOICE_FAULTS.map(fault => control("order", `${fault.label} beside the off verdict`, besideOffVerdict(choiceAt(fault)), fault.expected)),
    ];
  });
  return [{ base: "decline", family: "accepted", label: "decline: the abstain record accepted", candidate: DECLINED, expected: acceptedAs(DECLINED) }, ...perBase];
}

const CONTROLS: Readonly<Record<CheckId, readonly Control[]>> = {
  "K-POSITIVE": [{ base: "positive", family: "accepted", label: "positive: accepted", candidate: POSITIVE, expected: acceptedAs(POSITIVE) }],
  "K-NEGATIVE": BASES.flatMap(base => missingControls(base, true)),
  "K-FORMS": BASES.flatMap(base => [...missingControls(base, false), ...decisionControls(base)]),
  "K-PARITY": Object.entries(FALSIFIERS).map(([name, record]) => ({ base: name, family: "accepted", label: `${name}: accepted`, candidate: record, expected: acceptedAs(record) })),
  "K-VERDICT": verdictControls(),
  "K-STATUS": statusControls(),
};

function readingOf(validate: Validator, candidate: Holder): unknown {
  try {
    return validate(candidate);
  } catch (error) {
    return { threw: error instanceof Error ? error.message : String(error) };
  }
}
/** The controls of a check whose reading differs from the expected one. */
const failures = (check: CheckId, validate: Validator): string[] =>
  CONTROLS[check].filter(control => !isDeepStrictEqual(readingOf(validate, control.candidate), control.expected)).map(control => control.label);
const REFUSALS = new Map<Validator, readonly CheckId[]>();
/** The checks that refuse a validator (each validator is judged once and its reading kept). */
function refusedBy(validate: Validator): CheckId[] {
  const known = REFUSALS.get(validate);
  if (known !== undefined) return [...known];
  const checks = CHECK_IDS.filter(check => failures(check, validate).length > 0);
  REFUSALS.set(validate, checks);
  return [...checks];
}
/** A check's controls by family: how many, over how many bases. */
function tally(check: CheckId): Record<string, string> {
  const families = [...new Set(CONTROLS[check].map(control => control.family))];
  return Object.fromEntries(
    families.map(family => {
      const own = CONTROLS[check].filter(control => control.family === family);
      return [family, `${own.length} over ${new Set(own.map(control => control.base)).size}`];
    }),
  );
}

/** A reading in words: accepted (unchanged), accepted-rewritten, or refused with its code and field or value. */
function readingText(candidate: Holder, reading: unknown): string {
  if (typeof reading !== "object" || reading === null) return `other ${String(reading)}`;
  const shape = reading as { readonly ok?: unknown; readonly record?: unknown; readonly code?: unknown; readonly field?: unknown; readonly value?: Loose };
  if (shape.ok === true) return isDeepStrictEqual(shape.record, candidate) ? "accepted" : "accepted-rewritten";
  if (shape.ok === false && typeof shape.code === "string") {
    const detail = typeof shape.field === "string" ? ` ${shape.field}` : Object.hasOwn(reading, "value") ? ` ${shown(shape.value)}` : "";
    return `refused ${shape.code}${detail}`;
  }
  return `other ${JSON.stringify(reading)}`;
}
/** A reading's shape: its own keys and its ok value. */
const shapeOf = (reading: unknown): string =>
  typeof reading === "object" && reading !== null ? `${Object.keys(reading).join(",")} ok=${String((reading as { readonly ok?: unknown }).ok)}` : `other ${String(reading)}`;

// ---- the mutants ----

const rewritten = (reading: Reading, change: (record: Holder) => Holder): Reading => (reading.ok ? { ok: true, record: change(reading.record) } : reading);
const refusedWhen = (reading: Reading, when: boolean): unknown => (reading.ok && when ? { ok: false, code: "parity" } : reading);

interface Mutant {
  readonly id: string;
  readonly validate: Validator;
}
const MUTANTS: readonly Mutant[] = [
  { id: "M-DEFAULT-FEEDBACK", validate: candidate => REFERENCE(present(candidate, "feedbackStatus") ? candidate : over(candidate, { feedbackStatus: "pending" })) },
  { id: "M-DEFAULT-LOGPROB", validate: candidate => REFERENCE(present(candidate, "behaviorLogProbability") ? candidate : over(candidate, { behaviorLogProbability: 0 })) },
  { id: "M-ABSENT-OK", validate: candidate => rewritten(REFERENCE(over(POSITIVE, candidate)), () => candidate) },
  { id: "M-THIRTEEN-FIELDS", validate: validatorOf({ ...RULES, required: FIELDS.filter(field => field !== "verifierOutcome") }) },
  { id: "M-NULL-PRESENT", validate: validatorOf({ ...RULES, present: (holder, key) => Object.hasOwn(holder, key) && holder[key] !== undefined }) },
  { id: "M-UNDEFINED-PRESENT", validate: validatorOf({ ...RULES, present: (holder, key) => Object.hasOwn(holder, key) && holder[key] !== null }) },
  {
    id: "M-UNTYPED-REFUSAL",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "missing-field" ? { ok: false } : reading;
    },
  },
  {
    id: "M-REFUSAL-CARRIES-RECORD",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "missing-field" ? { ...reading, record: over(POSITIVE, candidate) } : reading;
    },
  },
  {
    id: "M-DEFAULT-STATUS",
    validate: candidate => {
      const decision = candidate.decision;
      return REFERENCE(isHolder(decision) && !present(decision, "status") ? withDecision({ ...decision, status: "success" }, candidate) : candidate);
    },
  },
  { id: "M-COLLAPSE-EXECUTED", validate: candidate => rewritten(REFERENCE(candidate), record => over(record, { executed: record.admitted })) },
  { id: "M-COLLAPSE-ADMITTED", validate: candidate => rewritten(REFERENCE(candidate), record => over(record, { admitted: record.proposed })) },
  { id: "M-REFUSE-DIVERGENT", validate: candidate => refusedWhen(REFERENCE(candidate), !isDeepStrictEqual(candidate.admitted, candidate.executed)) },
  { id: "M-SINGLE-EXECUTION", validate: candidate => refusedWhen(REFERENCE(candidate), Array.isArray(candidate.executed) && candidate.executed.length > 1) },
  { id: "M-OPEN-VERDICT", validate: validatorOf({ ...RULES, verdict: value => typeof value === "string" }) },
  { id: "M-FIVE-CODES", validate: validatorOf({ ...RULES, verdict: value => typeof value === "string" && VERDICTS.includes(value) && value !== "INTENT_AUTHORITY_EXCEEDED" }) },
  { id: "M-CASE-VERDICT", validate: validatorOf({ ...RULES, verdict: value => typeof value === "string" && VERDICTS.some(entry => entry.toLowerCase() === value.toLowerCase()) }) },
  { id: "M-NO-ADMITTED", validate: validatorOf({ ...RULES, verdict: value => typeof value === "string" && CODES.includes(value) }) },
  {
    id: "M-DECLINE-AS-SUCCESS",
    validate: candidate => rewritten(REFERENCE(candidate), record => (isHolder(record.decision) && record.decision.status === DECLINE ? withDecision({ ...record.decision, status: "success" }, record) : record)),
  },
  { id: "M-OPEN-STATUS", validate: validatorOf({ ...RULES, status: value => typeof value === "string" }) },
  { id: "M-REFUSE-DECLINE", validate: validatorOf({ ...RULES, status: value => value === "success" }) },
  { id: "M-EMPTY-SUCCESS", validate: validatorOf({ ...RULES, successChooses: false }) },
  { id: "M-DECLINE-CHOICE", validate: validatorOf({ ...RULES, declineChoosesNothing: false }) },
  { id: "M-DEFAULT-FEEDBACK-UNVERIFIED", validate: candidate => REFERENCE(!present(candidate, "feedbackStatus") && candidate.verifierOutcome === "not-run" ? over(candidate, { feedbackStatus: "pending" }) : candidate) },
  { id: "M-DEFAULT-RECEIPT-UNEXECUTED", validate: candidate => REFERENCE(!present(candidate, "effectReceiptRef") && isDeepStrictEqual(candidate.executed, []) ? over(candidate, { effectReceiptRef: [] }) : candidate) },
  {
    id: "M-DEFAULT-LOGPROB-DECLINE",
    validate: candidate => REFERENCE(!present(candidate, "behaviorLogProbability") && isHolder(candidate.decision) && candidate.decision.status === DECLINE ? over(candidate, { behaviorLogProbability: 0 }) : candidate),
  },
  {
    id: "M-DEFAULT-CHOSEN-DECLINE",
    validate: candidate => {
      const decision = candidate.decision;
      return REFERENCE(isHolder(decision) && decision.status === DECLINE && !present(decision, "chosen") ? withDecision({ ...decision, chosen: [] }, candidate) : candidate);
    },
  },
  {
    id: "M-DEFAULT-STATUS-EMPTY",
    validate: candidate => {
      const decision = candidate.decision;
      return REFERENCE(isHolder(decision) && !present(decision, "status") && isDeepStrictEqual(decision.chosen, []) ? withDecision({ ...decision, status: DECLINE }, candidate) : candidate);
    },
  },
  { id: "M-COLLAPSE-EXECUTED-VERIFIED", validate: candidate => rewritten(REFERENCE(candidate), record => (record.verifierOutcome === "pass" ? over(record, { executed: record.admitted }) : record)) },
  {
    id: "M-LAST-MISSING",
    validate: candidate => {
      const absent = FIELDS.filter(field => !present(candidate, field));
      return absent.length > 1 ? missing(absent.at(-1) ?? "") : REFERENCE(candidate);
    },
  },
  {
    id: "M-STRING-CHOICE",
    validate: candidate => {
      const decision = candidate.decision;
      return isHolder(decision) && typeof decision.chosen === "string" && decision.chosen !== ""
        ? rewritten(REFERENCE(withDecision({ ...decision, chosen: [decision.chosen] }, candidate)), () => candidate)
        : REFERENCE(candidate);
    },
  },
  {
    id: "M-VERDICT-FIRST",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code !== "missing-field" && !RULES.verdict(candidate.resolverVerdict) ? offVerdict(candidate.resolverVerdict) : reading;
    },
  },
  {
    id: "M-OPEN-VERDICT-UNADMITTED",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "verdict-domain" && isDeepStrictEqual(candidate.admitted, []) && typeof reading.value === "string" && reading.value !== "" ? acceptedAs(candidate) : reading;
    },
  },
  {
    id: "M-LATER-CODE-UNADMITTED",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "verdict-domain" && isDeepStrictEqual(candidate.admitted, []) && reading.value === LATER_CODE ? acceptedAs(candidate) : reading;
    },
  },
  {
    id: "M-OPEN-STATUS-UNPROPOSED",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "status-domain" && isDeepStrictEqual(candidate.proposed, []) && typeof reading.value === "string" ? acceptedAs(candidate) : reading;
    },
  },
  {
    id: "M-EMPTY-SUCCESS-UNPROPOSED",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "success-without-choice" && isDeepStrictEqual(candidate.proposed, []) ? acceptedAs(candidate) : reading;
    },
  },
  {
    id: "M-DECLINE-CHOICE-REJECTED",
    validate: candidate => {
      const reading = REFERENCE(candidate);
      return !reading.ok && reading.code === "decline-with-choice" && CODES.includes(String(candidate.resolverVerdict)) ? acceptedAs(candidate) : reading;
    },
  },
  {
    id: "M-LAST-MISSING-REJECTED",
    validate: candidate => {
      const absent = FIELDS.filter(field => !present(candidate, field));
      return absent.length > 1 && CODES.includes(String(candidate.resolverVerdict)) ? missing(absent.at(-1) ?? "") : REFERENCE(candidate);
    },
  },
  {
    id: "M-STATUS-BEFORE-MISSING",
    validate: candidate => {
      const decision = candidate.decision;
      return isHolder(decision) && present(decision, "status") && !RULES.status(decision.status) ? offStatus(decision.status) : REFERENCE(candidate);
    },
  },
  {
    id: "M-NULLISH-AFTER-ABSENT",
    validate: candidate => {
      const absent = FIELDS.find(field => !Object.hasOwn(candidate, field));
      return absent === undefined ? REFERENCE(candidate) : missing(absent);
    },
  },
  {
    id: "M-OBJECT-CHOICE",
    validate: candidate => {
      const decision = candidate.decision;
      return isHolder(decision) && decision.status === "success" && isHolder(decision.chosen) ? rewritten(REFERENCE(withDecision({ ...decision, chosen: ["a1:t1"] }, candidate)), () => candidate) : REFERENCE(candidate);
    },
  },
];
const mutant = (id: string): Validator => MUTANTS.find(entry => entry.id === id)?.validate ?? REFERENCE;

// ---- the armed registrations and the src reading ----

interface Site {
  readonly path: string;
  readonly validate: Validator;
}
/** THE ARMED REGISTRATIONS: every src module that names the vocabulary, with its record validator. Empty today. */
const SITES: readonly Site[] = [];
/** The validators a registration list puts under judgment: the reference, then each registered src site's. */
const subjectsOf = (sites: readonly Site[]): readonly Mutant[] => [{ id: "reference", validate: REFERENCE }, ...sites.map(site => ({ id: site.path, validate: site.validate }))];
/** Every validator the checks judge. */
const SUBJECTS: readonly Mutant[] = subjectsOf(SITES);

interface Entry {
  readonly path: string;
  readonly text: string;
}
interface Word {
  readonly spelling: string;
  readonly pattern: RegExp;
}
const SEPARATORS = "[ \\t._-]*";
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordOf = (spelling: string): Word => ({ spelling, pattern: new RegExp(partsOf(spelling).map(escapeRegExp).join(SEPARATORS), "i") });
/** The statement's record noun, read as one word. */
const RECORD_NOUN = "sidecar";
/** The vocabulary: the record noun, then every field name of two or more camel-case parts. */
const VOCABULARY: readonly Word[] = [RECORD_NOUN, ...FIELDS.filter(name => partsOf(name).length >= 2)].map(wordOf);

/** The words an entry names, in vocabulary order. */
const namesOf = (entry: Entry): string[] => VOCABULARY.filter(word => word.pattern.test(entry.path) || word.pattern.test(entry.text)).map(word => word.spelling);
/** The src findings: each word an unregistered module names, then each stale or repeated registration. */
function srcFindings(entries: readonly Entry[], sites: readonly Site[]): string[] {
  const registered = sites.map(site => site.path);
  const findings = entries.filter(entry => !registered.includes(entry.path)).flatMap(entry => namesOf(entry).map(word => `${entry.path}: names ${word}`));
  for (const [index, path] of registered.entries()) {
    if (registered.indexOf(path) !== index) findings.push(`${path}: registered twice`);
    else if (!entries.some(entry => entry.path === path && namesOf(entry).length > 0)) findings.push(`${path}: stale registration`);
  }
  return findings;
}
let liveCache: readonly Entry[] | undefined;
/** git's would-commit src listing, each file with its text (read once per run). */
function liveSrc(): readonly Entry[] {
  if (liveCache === undefined) liveCache = gitList(ROOT, "src").map(path => ({ path, text: readFileSync(join(ROOT, path), "utf8") }));
  return liveCache;
}
const PLANT: Entry = { path: "src/workbench/gp-sidecar.ts", text: "export interface SidecarRecord {\n  readonly behaviorLogProbability: number;\n  readonly feedbackStatus: string;\n}\n" };
const PLANT_FINDINGS = [`${PLANT.path}: names sidecar`, `${PLANT.path}: names behaviorLogProbability`, `${PLANT.path}: names feedbackStatus`];
/** A planted module that names a word in its path alone: its text names nothing. */
const PATH_PLANT: Entry = { path: "src/workbench/gp-sidecar/index.ts", text: "export const HOST = 1;\n" };
/** A planted module naming words through each of the five separators the reading allows, and through a run of them. */
const SEPARATOR_PLANT: Entry = {
  path: "src/workbench/gp-record-keys.ts",
  text: 'export const KEYS = ["snapshot hash", "feature\tprojection", "resolver.verdict", "effect_receipt_ref", "verifier-outcome", "feedback ._-status"];\n',
};
const SEPARATOR_FINDINGS = ["snapshotHash", "featureProjection", "resolverVerdict", "effectReceiptRef", "verifierOutcome", "feedbackStatus"].map(word => `${SEPARATOR_PLANT.path}: names ${word}`);

// ---- the residuals ----

interface RecordMember {
  readonly id: string;
  readonly change: Holder;
}
const RECORD_RESIDUALS: Readonly<Record<string, readonly RecordMember[]>> = {
  Q1: [
    { id: "an empty snapshot hash", change: { snapshotHash: "" } },
    { id: "an empty feature projection", change: { featureProjection: "" } },
    { id: "an empty support", change: { support: [] } },
    { id: "an unknown log probability", change: { behaviorLogProbability: "unknown" } },
    { id: "an unknown feedback status", change: { feedbackStatus: "unknown" } },
  ],
  Q2: [
    { id: "a reward", change: { reward: 1 } },
    { id: "a decision id", change: { decisionId: "decision-0001" } },
  ],
  Q3: [
    { id: "a number hash", change: { snapshotHash: 42 } },
    { id: "a positive log probability", change: { behaviorLogProbability: 0.7 } },
    { id: "a binary32-word log probability", change: { behaviorLogProbability: "bf5e8cf0" } },
    { id: "a string support", change: { support: "a1:t1" } },
    { id: "an object actor", change: { actor: { id: "agent-a1", revision: "r1" } } },
  ],
  Q4: [
    { id: "a choice outside the support", change: { decision: { status: "success", chosen: ["a9:t9"] } } },
    { id: "a rejection beside an admitted list", change: { resolverVerdict: "INTENT_BASIS_STALE" } },
    { id: "an abstain beside executed actions", change: { decision: { status: DECLINE, chosen: [] } } },
  ],
};
const SRC_RESIDUALS: Readonly<Record<string, readonly Entry[]>> = {
  Q5: [
    { path: "src/workbench/side-car.ts", text: 'export const SIDE_CAR = "side-car";\n' },
    { path: "src/workbench/behaviour.ts", text: "// the behaviour log probability of the chosen pair\nexport const behaviourLogProbability = -0.693;\n" },
    { path: "src/workbench/decision-receipt.ts", text: 'export interface Receipt {\n  readonly logProb: number | "unknown";\n  readonly sourceReceipt: string;\n}\n' },
    { path: "src/workbench/joined.ts", text: 'export const key = ["feedback", "Status"].join("");\n' },
    { path: "src/workbench/escaped.ts", text: 'export const noun = "side\\u0063ar";\n' },
    { path: "src/workbench/wrapped.ts", text: "// the behavior log\n// probability of the chosen pair\nexport const wrapped = -0.693;\n" },
    { path: "src/workbench/colon.ts", text: 'export const key = "feedback:status";\n' },
    { path: "src/workbench/slash.ts", text: 'export const key = "resolver/verdict";\n' },
    { path: "src/workbench/invisible.ts", text: `export const noun = "side${String.fromCodePoint(0x200b)}car";\n` },
  ],
  Q6: [{ path: "src/workbench/assignment-log.ts", text: "export const entry = (decision: unknown) => ({ decision, admitted: [], executed: [] });\n" }],
};
interface ValidatorMember {
  readonly id: string;
  readonly validate: Validator;
  /** A record the member reads otherwise than the reference; no control holds it. */
  readonly context: Holder;
}
const VALIDATOR_RESIDUALS: Readonly<Record<string, readonly ValidatorMember[]>> = {
  Q7: [
    {
      id: "a feedback default under an unseen actor",
      validate: candidate => REFERENCE(!present(candidate, "feedbackStatus") && candidate.actor === "agent-a9" ? over(candidate, { feedbackStatus: "pending" }) : candidate),
      context: over(lessField(POSITIVE, "feedbackStatus"), { actor: "agent-a9" }),
    },
    {
      id: "a receipt default under an unseen feedback status",
      validate: candidate => REFERENCE(!present(candidate, "effectReceiptRef") && candidate.feedbackStatus === "final" ? over(candidate, { effectReceiptRef: [] }) : candidate),
      context: over(lessField(POSITIVE, "effectReceiptRef"), { feedbackStatus: "final" }),
    },
    {
      id: "a collapse under an unseen verifier outcome",
      validate: candidate => rewritten(REFERENCE(candidate), record => (record.verifierOutcome === "skipped" ? over(record, { executed: record.admitted }) : record)),
      context: over(FALSIFIERS["verified-not-executed"] ?? POSITIVE, { verifierOutcome: "skipped" }),
    },
    {
      id: "an off verdict accepted under an unseen selector",
      validate: candidate => {
        const reading = REFERENCE(candidate);
        return !reading.ok && reading.code === "verdict-domain" && candidate.selector === "selector-x9" ? acceptedAs(candidate) : reading;
      },
      context: over(POSITIVE, { selector: "selector-x9", resolverVerdict: ORDER_VERDICT }),
    },
    {
      id: "a status default under a rejection code beside a passed verifier",
      validate: candidate => {
        const decision = candidate.decision;
        const fill = isHolder(decision) && !present(decision, "status") && CODES.includes(String(candidate.resolverVerdict)) && candidate.verifierOutcome === "pass";
        return REFERENCE(fill && isHolder(decision) ? withDecision({ ...decision, status: "success" }, candidate) : candidate);
      },
      context: over(REJECTED, { resolverVerdict: "INTENT_DUPLICATE", verifierOutcome: "pass", decision: { chosen: ["a1:t1", "a2:t2"] } }),
    },
    {
      id: "an abstain recorded as success beside a rejection code",
      validate: candidate =>
        rewritten(REFERENCE(candidate), record =>
          isHolder(record.decision) && record.decision.status === DECLINE && CODES.includes(String(record.resolverVerdict)) ? withDecision({ ...record.decision, status: "success" }, record) : record,
        ),
      context: over(DECLINED, { resolverVerdict: "INTENT_DUPLICATE" }),
    },
    {
      id: "a collapse under a rejection code beside divergent actions",
      validate: candidate => rewritten(REFERENCE(candidate), record => (CODES.includes(String(record.resolverVerdict)) ? over(record, { executed: record.admitted }) : record)),
      context: over(REJECTED, { resolverVerdict: "INTENT_DUPLICATE", executed: ["a1:t1"], effectReceiptRef: ["receipt:host/0001"] }),
    },
    {
      id: "an off verdict no list holds accepted",
      validate: candidate => {
        const reading = REFERENCE(candidate);
        return !reading.ok && reading.code === "verdict-domain" && reading.value === "approved" ? acceptedAs(candidate) : reading;
      },
      context: over(POSITIVE, { resolverVerdict: "approved" }),
    },
    {
      id: "an off status no list holds accepted",
      validate: candidate => {
        const reading = REFERENCE(candidate);
        return !reading.ok && reading.code === "status-domain" && reading.value === "succeeded" ? acceptedAs(candidate) : reading;
      },
      context: withDecision({ ...POSITIVE_DECISION, status: "succeeded" }),
    },
    {
      id: "a success's number choice no list holds accepted",
      validate: candidate => {
        const reading = REFERENCE(candidate);
        return !reading.ok && reading.code === "success-without-choice" && isHolder(candidate.decision) && candidate.decision.chosen === 2 ? acceptedAs(candidate) : reading;
      },
      context: withDecision({ status: "success", chosen: 2 }),
    },
    {
      id: "the second of three missing fields named when they are not a suffix",
      validate: candidate => {
        const absent = FIELDS.filter(field => !present(candidate, field));
        return absent.length === 3 && !isDeepStrictEqual(absent, FIELDS.slice(-3)) ? missing(absent[1] ?? "") : REFERENCE(candidate);
      },
      context: Object.fromEntries(Object.entries(POSITIVE).filter(([key]) => !["snapshotHash", "support", "feedbackStatus"].includes(key))),
    },
    {
      id: "the verdict read first beside an off status when it is an off value other than rejected",
      validate: candidate => {
        const decision = candidate.decision;
        return isHolder(decision) && present(decision, "status") && !RULES.status(decision.status) && candidate.resolverVerdict === "accepted" ? offVerdict(candidate.resolverVerdict) : REFERENCE(candidate);
      },
      context: over(withDecision({ ...POSITIVE_DECISION, status: ORDER_STATUS }), { resolverVerdict: "accepted" }),
    },
  ],
};
/** Every residual family's members by name: the records', the src texts', the validators' and the anchor model's. */
const residualMembers = (): Record<string, string[]> => ({
  ...Object.fromEntries(Object.entries(RECORD_RESIDUALS).map(([id, members]) => [id, members.map(member => member.id)])),
  ...Object.fromEntries(Object.entries(SRC_RESIDUALS).map(([id, members]) => [id, members.map(member => member.path)])),
  ...Object.fromEntries(Object.entries(VALIDATOR_RESIDUALS).map(([id, members]) => [id, members.map(member => member.id)])),
  ...Object.fromEntries(Object.entries(MODEL_RESIDUALS).map(([id, members]) => [id, members.map(member => member.id)])),
});

/** A quiet row: every member of the residual family reads as accepted unchanged, as no src finding, as no check refusing it, or as an anchor-model edit no reading reds. */
function quietRow(id: string): Json {
  const records = RECORD_RESIDUALS[id];
  if (records !== undefined) {
    const readings = records.map(member => {
      const record = over(POSITIVE, member.change);
      return `${member.id}: ${readingText(record, REFERENCE(record))}`;
    });
    expect(records.length, `${id} has members`).toBeGreaterThan(0);
    expect(readings.filter(reading => !reading.endsWith(": accepted")), `${id}: every member is accepted unchanged`).toEqual([]);
    return { members: records.map(member => member.id), readings };
  }
  const validators = VALIDATOR_RESIDUALS[id];
  if (validators !== undefined) {
    expect(validators.length, `${id} has members`).toBeGreaterThan(0);
    const judged = validators.map(member => ({
      id: member.id,
      refused: refusedBy(member.validate),
      own: readingText(member.context, readingOf(member.validate, member.context)),
      reference: readingText(member.context, REFERENCE(member.context)),
    }));
    expect(judged.filter(entry => entry.refused.length > 0).map(entry => entry.id), `${id}: no check refuses any member`).toEqual([]);
    expect(judged.filter(entry => entry.own === entry.reference).map(entry => entry.id), `${id}: each member reads its own context record otherwise than the reference`).toEqual([]);
    return { members: validators.map(member => member.id), readings: judged.map(entry => `${entry.id}: no check refuses it; its context record reads ${entry.own}, the reference ${entry.reference}`) };
  }
  const models = MODEL_RESIDUALS[id];
  if (models !== undefined) {
    expect(models.length, `${id} has members`).toBeGreaterThan(0);
    const held = failing(LIVE);
    expect(
      deadContrasts([DEAD_CONTRAST, LIVE_CONTRAST], held),
      `${id}: the contrast check names the planted dead contrast and passes its live twin, where the census's own model holds ${PROBE_READING}`,
    ).toEqual(held.includes(PROBE_READING) ? [] : [DEAD_CONTRAST.id]);
    const judged = models.map(member => {
      const edited = member.edit(LIVE);
      return {
        id: member.id,
        changed: !isDeepStrictEqual(edited, LIVE),
        reds: failing(edited).filter(reading => !held.includes(reading)),
        contrast: contrastReds(member, held),
      };
    });
    expect(
      judged.filter(entry => !entry.changed).map(entry => entry.id),
      `${id}: each member edits the anchor model`,
    ).toEqual([]);
    expect(
      judged.filter(entry => entry.reds.length > 0).map(entry => `${entry.id}: ${entry.reds.join(", ")}`),
      `${id}: no member reds an outside reading the census's own model holds`,
    ).toEqual([]);
    expect(deadContrasts(models, held), `${id}: each member's contrast reds the reading it names, where the census's own model holds that reading`).toEqual([]);
    return {
      members: models.map(member => member.id),
      readings: judged.map(entry => `${entry.id}: reds ${entry.reds.join(", ") || "no reading"}${entry.contrast === undefined ? "" : `; its contrast reds ${entry.contrast.join(", ") || "no reading"}`}`),
    };
  }
  const texts = SRC_RESIDUALS[id] ?? [];
  expect(texts.length, `${id} has members`).toBeGreaterThan(0);
  const findings = srcFindings(texts, []);
  expect(findings, `${id}: every member reads no src finding`).toEqual([]);
  return { members: texts.map(member => member.path), findings };
}

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** An acceptance clause verbatim (A-D), the statement after the merge note (S), or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}
const QUOTES: Readonly<Record<string, string>> = {
  A1: "a schema fixture",
  A2: "with one positive record",
  A3: "and one negative per omitted field",
  B1: "a parity falsifier proving proposed, admitted and executed are three distinct fields",
  B2: "admitted != executed survives",
  C1: "the resolver verdict is either admitted",
  C2: "or one of MW's stable rejection codes",
  C3: "INTENT_BASIS_STALE / INTENT_SCOPE_PROTECTED / INTENT_WRITE_CONFLICT / INTENT_BUDGET_EXCEEDED / INTENT_DUPLICATE / INTENT_AUTHORITY_EXCEEDED per the wb-4ap.16 note",
  D1: "the abstain status is its own value",
  D2: "never success",
  S1: "Each R7 sidecar record shall carry as required: GP program/checkpoint snapshot hash, feature projection, actor/selector, legal support at sample time, sampled decision with behavior log probability, proposed vs admitted vs executed action with resolver verdict, source-owned effect receipt ref, verifier outcome and final feedback status",
  S2: "any missing field is a typed refusal",
  S3: "never a default",
  Q1: "R-PLACEHOLDER-VALUE",
  Q2: "R-OPEN-RECORD",
  Q3: "R-VALUE-SHAPE",
  Q4: "R-CROSS-FIELD",
  Q5: "R-COMPOSED-WORD",
  Q6: "R-UNNAMED-SITE",
  Q7: "R-UNSEEN-CONTEXT",
  Q8: "R-FIELD-PARTITION",
  Q9: "R-FIELD-RUN",
  Q10: "R-PIN-PARTITION",
  Q11: "R-UNREAD",
};
const ROWS: readonly Row[] = [
  { id: "A", label: "a schema fixture with one positive record and one negative per omitted field", pins: ["A1", "A2", "A3"] },
  { id: "B", label: "a parity falsifier proving proposed, admitted and executed are three distinct fields (admitted != executed survives)", pins: ["B1", "B2"] },
  {
    id: "C",
    label:
      "the resolver verdict is either admitted or one of MW's stable rejection codes (INTENT_BASIS_STALE / INTENT_SCOPE_PROTECTED / INTENT_WRITE_CONFLICT / INTENT_BUDGET_EXCEEDED / INTENT_DUPLICATE / INTENT_AUTHORITY_EXCEEDED per the wb-4ap.16 note)",
    pins: ["C1", "C2", "C3"],
  },
  { id: "D", label: "the abstain status is its own value, never success", pins: ["D1", "D2"] },
  {
    id: "S",
    label:
      "Each R7 sidecar record shall carry as required: GP program/checkpoint snapshot hash, feature projection, actor/selector, legal support at sample time, sampled decision with behavior log probability, proposed vs admitted vs executed action with resolver verdict, source-owned effect receipt ref, verifier outcome and final feedback status; any missing field is a typed refusal, never a default",
    pins: ["S1", "S2", "S3"],
  },
  {
    id: "Q",
    label:
      "the residual families R-PLACEHOLDER-VALUE, R-OPEN-RECORD, R-VALUE-SHAPE, R-CROSS-FIELD, R-COMPOSED-WORD, R-UNNAMED-SITE, R-UNSEEN-CONTEXT, R-FIELD-PARTITION, R-FIELD-RUN, R-PIN-PARTITION and R-UNREAD, each member a pinned quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11"],
  },
];

interface ProducerLine {
  readonly id: string;
  readonly path: string;
  readonly blob: string;
  readonly line: number;
  readonly through: number;
  readonly text: string;
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly asserted: readonly string[];
  /** The assertion count each of the three other judged cases ends on, in run order. */
  readonly ended: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly mutants: Readonly<Record<string, readonly string[]>>;
  readonly tests: readonly string[];
  readonly producer: { readonly repo: string; readonly sha: string; readonly lines: readonly ProducerLine[] };
}
const ROSTER = JSON.parse(readFileSync(join(ROOT, ROSTER_PATH), "utf8")) as Roster;
const producerLine = (id: string): ProducerLine | undefined => ROSTER.producer.lines.find(line => line.id === id);
const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** A value as plain JSON (lists and objects copied; nothing undefined). */
const jsonOf = (value: unknown): Json => JSON.parse(JSON.stringify(value ?? null)) as Json;
/** wb-4ap.16's note list of the stable rejection codes, and the README pin it reads them at. */
function noteCodes(): { readonly codes: readonly string[]; readonly pin: string } {
  const notes = beadRow(textOf(EXPORT), CODES_BEAD)?.notes ?? "";
  const listed = /the stable rejection codes (INTENT_[A-Z_]+(?: \/ INTENT_[A-Z_]+)*) \(packages\/coordination\/README\.md@([0-9a-f]+)\)/.exec(notes);
  return { codes: listed?.[1]?.split(" / ") ?? [], pin: listed?.[2] ?? "" };
}
/** The codes of the producer block's RejectionCode union line. */
const unionCodes = (): string[] => [...(producerLine("P5")?.text ?? "").matchAll(/"(INTENT_[A-Z_]+)"/g)].map(match => match[1] ?? "");

// ---- the anchor model: what the outside readings compare from this census and its roster ----

/** The census and roster literals the outside readings compare (LIVE, below, is the census's own). */
interface AnchorModel {
  readonly requirement: string;
  readonly mergeNote: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly items: readonly Item[];
  readonly actions: readonly string[];
  readonly admitted: string;
  readonly codes: readonly string[];
  readonly codesBead: string;
  readonly codesNotePin: string;
  readonly statuses: readonly string[];
  readonly noun: string;
  /** The vocabulary's spellings: the record noun, then each field name of two or more parts. */
  readonly vocabulary: readonly string[];
  /** The decision's own two fields: no reading takes them. */
  readonly decisionFields: readonly string[];
  /** The residual members by family: no reading takes them. */
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly producerPin: string;
  /** The roster's producer block: the readings take the cited lines' files and numbers, never their texts or blobs. */
  readonly producer: Roster["producer"];
}
type Edit = (model: AnchorModel) => AnchorModel;

let exportCache: string | undefined;
/** The tracker export's text, read once per run. */
function exportText(): string {
  if (exportCache === undefined) exportCache = textOf(EXPORT);
  return exportCache;
}
const exportRows = new Map<string, ReturnType<typeof beadRow>>();
/** A bead's row in the tracker export, read once per bead. */
function exportRow(bead: string): ReturnType<typeof beadRow> {
  if (!exportRows.has(bead)) exportRows.set(bead, beadRow(exportText(), bead));
  return exportRows.get(bead);
}
/** A phrase's words: lower case, split at whitespace, slashes and hyphens. */
const phraseWords = (phrase: string): string[] =>
  phrase
    .toLowerCase()
    .split(/[\s/-]+/)
    .filter(word => word !== "");
/** The parts are a contiguous run of the words. */
const runIn = (parts: readonly string[], words: readonly string[]): boolean => parts.length > 0 && words.some((_, start) => parts.every((part, offset) => words[start + offset] === part));
/** The statement's items: its list split at ", " and the last piece at " and ". */
function titleItems(statement: string): string[] {
  const list = /shall carry as required: (.+); any missing field is a typed refusal, never a default$/.exec(statement)?.[1] ?? "";
  const pieces = list.split(", ");
  return [...pieces.slice(0, -1), ...(pieces.at(-1) ?? "").split(" and ")];
}
/** The src findings for a vocabulary's spellings, read as the src reading reads its own words. */
function vocabularyFindings(vocabulary: readonly string[], entries: readonly Entry[], sites: readonly Site[]): string[] {
  const words = vocabulary.map(wordOf);
  const named = (entry: Entry): string[] => words.filter(word => word.pattern.test(entry.path) || word.pattern.test(entry.text)).map(word => word.spelling);
  const registered = sites.map(site => site.path);
  const findings = entries.filter(entry => !registered.includes(entry.path)).flatMap(entry => named(entry).map(word => `${entry.path}: names ${word}`));
  for (const [index, path] of registered.entries()) {
    if (registered.indexOf(path) !== index) findings.push(`${path}: registered twice`);
    else if (!entries.some(entry => entry.path === path && named(entry).length > 0)) findings.push(`${path}: stale registration`);
  }
  return findings;
}

/** The outside readings, in order (each named in the header's OUTSIDE ANCHORS paragraph). */
const READINGS = [
  "title",
  "statement",
  "clauses",
  "tiling A",
  "tiling B",
  "tiling C",
  "tiling D",
  "tiling S",
  "items",
  "join",
  "runs",
  "actions",
  "action fields",
  "admitted",
  "codes",
  "codes bead",
  "note codes",
  "statuses",
  "noun",
  "vocabulary",
  "pin cited",
  "lines cited",
  "src",
] as const;
type AnchorReading = (typeof READINGS)[number];
/** Every outside reading of a model: true where it holds. */
function anchorReadings(model: AnchorModel): Readonly<Record<AnchorReading, boolean>> {
  const row = exportRow(BEAD);
  const title = row?.title ?? "";
  const notes = row?.notes ?? "";
  const statement = /^\[[^\]]+\] (?:\([^)]*\) )?(.*)\.$/.exec(title)?.[1] ?? "";
  const tiled = (id: string): boolean => {
    const entry = model.rows.find(candidate => candidate.id === id);
    return entry !== undefined && tiles(entry.label, entry.pins.map(pin => model.quotes[pin] ?? ""));
  };
  const clauses = acceptanceClauses(notes);
  const [, clauseB, clauseC, clauseD] = clauses;
  const actionWords = /proving (\w+), (\w+) and (\w+) are three distinct fields \((\w+) != (\w+) survives\)$/.exec(clauseB ?? "")?.slice(1) ?? [];
  const verdicts = /^the resolver verdict is either (\w+) or one of MW's stable rejection codes \((.+) per the (wb-[a-z0-9.]+) note\)$/.exec(clauseC ?? "");
  const statuses = /^the (\w+) status is its own value, never (\w+)$/.exec(clauseD ?? "");
  const noun = /^Each R7 (\w+) record shall carry/.exec(statement)?.[1];
  const fields = model.items.flatMap(entry => entry.fields);
  const names = fields.map(field => field.name);
  const listed = /the stable rejection codes (INTENT_[A-Z_]+(?: \/ INTENT_[A-Z_]+)*) \(packages\/coordination\/README\.md@([0-9a-f]+)\)/.exec(exportRow(model.codesBead)?.notes ?? "");
  const line = (id: string): ProducerLine | undefined => model.producer.lines.find(entry => entry.id === id);
  const cite = (id: string): string => `${line(id)?.path.split("/").pop() ?? "-"}:${line(id)?.line ?? "-"}`;
  const three = actionWords.slice(0, 3);
  return {
    title: title === `[${model.requirement}] ${model.mergeNote}${model.rows.find(entry => entry.id === "S")?.label ?? ""}.`,
    statement: model.rows.find(entry => entry.label === statement)?.id === "S",
    clauses: isDeepStrictEqual(
      clauses.map(clause => model.rows.find(entry => entry.label === clause)?.id ?? "-"),
      ["A", "B", "C", "D"],
    ),
    "tiling A": tiled("A"),
    "tiling B": tiled("B"),
    "tiling C": tiled("C"),
    "tiling D": tiled("D"),
    "tiling S": tiled("S"),
    items: isDeepStrictEqual(
      titleItems(statement),
      model.items.map(entry => entry.item),
    ),
    join: model.items.length > 0 && model.items.every(entry => joined(entry.item, entry.fields.map(field => field.phrase))),
    runs: fields.length > 0 && fields.every(field => runIn(partsOf(field.name), phraseWords(field.phrase))),
    actions: isDeepStrictEqual(actionWords, [...model.actions, ...model.actions.slice(1)]),
    "action fields": three.length === 3 && new Set(three).size === 3 && three.every(word => names.includes(word)),
    admitted: verdicts?.[1] === model.admitted,
    codes: isDeepStrictEqual(verdicts?.[2]?.split(" / "), [...model.codes]),
    "codes bead": verdicts?.[3] === model.codesBead,
    "note codes": isDeepStrictEqual(listed?.[1]?.split(" / "), [...model.codes]) && listed?.[2] === model.codesNotePin,
    statuses: isDeepStrictEqual([statuses?.[2], statuses?.[1]], [...model.statuses]),
    noun: noun !== undefined && noun === model.noun,
    vocabulary: noun !== undefined && isDeepStrictEqual(model.vocabulary, [noun, ...names.filter(name => partsOf(name).length >= 2)]),
    "pin cited": model.producerPin.length >= 12 && notes.includes(`@${model.producerPin.slice(0, 12)}`),
    "lines cited": ["P1", "P2", "P3", "P4"].every(id => line(id) !== undefined) && ["P1", "P2", "P4"].every(id => notes.includes(cite(id))) && notes.includes(`and :${line("P3")?.line ?? "-"} (`),
    src: vocabularyFindings(model.vocabulary, liveSrc(), SITES).length === 0,
  };
}
/** The readings a model fails, in READINGS order. */
function failing(model: AnchorModel): AnchorReading[] {
  const readings = anchorReadings(model);
  return READINGS.filter(reading => !readings[reading]);
}

function without<T>(table: Readonly<Record<string, T>>, keys: readonly string[]): Record<string, T> {
  return Object.fromEntries(Object.entries(table).filter(([key]) => !keys.includes(key)));
}
const quoted = (model: AnchorModel, pin: string, quote: string): AnchorModel => ({ ...model, quotes: { ...model.quotes, [pin]: quote } });
const relabeled = (model: AnchorModel, id: string, label: string): AnchorModel => ({ ...model, rows: model.rows.map(row => (row.id === id ? { ...row, label } : row)) });
const labelIn = (model: AnchorModel, id: string): string => model.rows.find(row => row.id === id)?.label ?? "";
function rowRemoved(model: AnchorModel, id: string): AnchorModel {
  const pins = model.rows.find(row => row.id === id)?.pins ?? [];
  return { ...model, rows: model.rows.filter(row => row.id !== id), quotes: without(model.quotes, pins) };
}
function pinRemoved(model: AnchorModel, id: string, pin: string): AnchorModel {
  return { ...model, rows: model.rows.map(row => (row.id === id ? { ...row, pins: row.pins.filter(entry => entry !== pin) } : row)), quotes: without(model.quotes, [pin]) };
}
/** Pin `from` of a row merged into its sibling `into`, whose quote becomes `quote`. */
const pinMerged = (model: AnchorModel, id: string, into: string, from: string, quote: string): AnchorModel => quoted(pinRemoved(model, id, from), into, quote);
/** The cut between sibling pins `left` and `right` moved over one word: right's first word re-homed at the end of left's quote, after the label's `gap` between them (kept: the word left in right's quote as well, the contrast). */
function cutMoved(model: AnchorModel, left: string, right: string, gap: string, kept = false): AnchorModel {
  const quote = model.quotes[right] ?? "";
  const space = quote.indexOf(" ");
  const moved = quoted(model, left, `${model.quotes[left] ?? ""}${gap}${space < 0 ? quote : quote.slice(0, space)}`);
  return kept ? moved : quoted(moved, right, space < 0 ? "" : quote.slice(space + 1));
}
/** Pin `pin` of row `id` cut in two at its quote's last space, a new pin `added` after it taking the last word (kept: the pin's quote left whole, the contrast); a quote with no space is left uncut. */
function pinCut(model: AnchorModel, id: string, pin: string, added: string, kept = false): AnchorModel {
  const quote = model.quotes[pin] ?? "";
  const space = quote.lastIndexOf(" ");
  if (space < 0) return model;
  const rows = model.rows.map(row => (row.id === id ? { ...row, pins: row.pins.flatMap(entry => (entry === pin ? [pin, added] : [entry])) } : row));
  return { ...model, rows, quotes: { ...model.quotes, [pin]: kept ? quote : quote.slice(0, space), [added]: quote.slice(space + 1) } };
}
/** The label's separator after pin `pin` taken into the end of that pin's quote (twice: the separator taken in twice, the contrast). */
const separatorTaken = (model: AnchorModel, pin: string, separator: string, twice = false): AnchorModel => quoted(model, pin, `${model.quotes[pin] ?? ""}${separator}${twice ? separator : ""}`);
/** A new pin `added` holding `quote` (empty: a zero-width pin), placed in row `id` right after its pin `after`. */
function pinAdded(model: AnchorModel, id: string, after: string, added: string, quote: string): AnchorModel {
  const rows = model.rows.map(row => (row.id === id ? { ...row, pins: row.pins.flatMap(entry => (entry === after ? [entry, added] : [entry])) } : row));
  return { ...model, rows, quotes: { ...model.quotes, [added]: quote } };
}
/** The last word of a pin's quote: what a zero-width pin's contrast holds after that pin, where the label does not hold it again. */
const lastWord = (model: AnchorModel, pin: string): string => (model.quotes[pin] ?? "").split(" ").at(-1) ?? "";
/** The vocabulary composed from a record noun and the items' fields. */
const composedVocabulary = (noun: string, items: readonly Item[]): string[] => [
  noun,
  ...items
    .flatMap(entry => entry.fields)
    .map(field => field.name)
    .filter(name => partsOf(name).length >= 2),
];
/** One item's fields replaced, its text kept, and the vocabulary composed from the new fields. */
function refielded(model: AnchorModel, item: string, fields: readonly Field[]): AnchorModel {
  const items = model.items.map(entry => (entry.item === item ? { item, fields } : entry));
  return { ...model, items, vocabulary: composedVocabulary(model.noun, items) };
}
/** A field renamed, its phrase kept, and the vocabulary composed from the new names. */
function renamed(model: AnchorModel, from: string, to: string): AnchorModel {
  const items = model.items.map(entry => ({ ...entry, fields: entry.fields.map(field => (field.name === from ? { ...field, name: to } : field)) }));
  return { ...model, items, vocabulary: composedVocabulary(model.noun, items) };
}
/** One producer line edited in the roster's producer block. */
const lined = (model: AnchorModel, id: string, change: (line: ProducerLine) => ProducerLine): AnchorModel => ({ ...model, producer: { ...model.producer, lines: model.producer.lines.map(line => (line.id === id ? change(line) : line)) } });
const ACTION_ITEM = "proposed vs admitted vs executed action with resolver verdict";

/** A residual member of the anchor model: an edit no reading reds, and its contrast, a near edit that reds the reading named. */
interface ModelMember {
  readonly id: string;
  readonly edit: Edit;
  readonly contrast?: { readonly edit: Edit; readonly reds: AnchorReading };
}
/** R-FIELD-PARTITION (Q8), R-FIELD-RUN (Q9), R-PIN-PARTITION (Q10) and R-UNREAD (Q11): the gate's coordinated edits no reading takes. */
const MODEL_RESIDUALS: Readonly<Record<string, readonly ModelMember[]>> = {
  Q8: [
    {
      id: "G19-SPLIT-SNAP: the first item cut at its slash, gpProgram and snapshotHash",
      edit: model =>
        refielded(model, "GP program/checkpoint snapshot hash", [
          { name: "gpProgram", phrase: "GP program" },
          { name: "snapshotHash", phrase: "checkpoint snapshot hash" },
        ]),
      contrast: {
        edit: model =>
          refielded(model, "GP program/checkpoint snapshot hash", [
            { name: "gpProgram", phrase: "GP program" },
            { name: "snapshotHash", phrase: "GP program/checkpoint snapshot hash" },
          ]),
        reds: "join",
      },
    },
    {
      id: "G19-MERGE-ACTSEL: actor/selector read as one field, actorSelector",
      edit: model => refielded(model, "actor/selector", [{ name: "actorSelector", phrase: "actor/selector" }]),
      contrast: { edit: model => refielded(model, "actor/selector", [{ name: "actor", phrase: "actor" }]), reds: "join" },
    },
    {
      id: "the decision item read as one field, decision",
      edit: model => refielded(model, "sampled decision with behavior log probability", [{ name: "decision", phrase: "sampled decision with behavior log probability" }]),
      contrast: { edit: model => refielded(model, "sampled decision with behavior log probability", [{ name: "decision", phrase: "sampled decision" }]), reds: "join" },
    },
    {
      id: "the resolver verdict read into executed, executed",
      edit: model =>
        refielded(model, ACTION_ITEM, [
          { name: "proposed", phrase: "proposed" },
          { name: "admitted", phrase: "admitted" },
          { name: "executed", phrase: "executed action with resolver verdict" },
        ]),
      contrast: {
        edit: model =>
          refielded(model, ACTION_ITEM, [
            { name: "proposed", phrase: "proposed" },
            { name: "admitted", phrase: "admitted" },
            { name: "executed", phrase: "executed action" },
          ]),
        reds: "join",
      },
    },
  ],
  Q9: [
    {
      id: "G-REN-FP: featureProjection named projection",
      edit: model => renamed(model, "featureProjection", "projection"),
      contrast: { edit: model => renamed(model, "featureProjection", "projectionFeature"), reds: "runs" },
    },
    { id: "S-FIELD-HASH: snapshotHash named hash", edit: model => renamed(model, "snapshotHash", "hash"), contrast: { edit: model => renamed(model, "snapshotHash", "checkpointHash"), reds: "runs" } },
    {
      id: "behaviorLogProbability named logProbability",
      edit: model => renamed(model, "behaviorLogProbability", "logProbability"),
      contrast: { edit: model => renamed(model, "behaviorLogProbability", "behaviorProbability"), reds: "runs" },
    },
    { id: "support named legalSupport", edit: model => renamed(model, "support", "legalSupport"), contrast: { edit: model => renamed(model, "support", "supportTime"), reds: "runs" } },
  ],
  Q10: [
    {
      id: "C6A2: A2 merged into A1",
      edit: model => pinMerged(model, "A", "A1", "A2", `${model.quotes.A1 ?? ""} ${model.quotes.A2 ?? ""}`),
      contrast: { edit: model => pinMerged(model, "A", "A1", "A2", model.quotes.A1 ?? ""), reds: "tiling A" },
    },
    {
      id: "C6B2: B2 merged into B1",
      edit: model => pinMerged(model, "B", "B1", "B2", `${model.quotes.B1 ?? ""} (${model.quotes.B2 ?? ""}`),
      contrast: { edit: model => pinMerged(model, "B", "B1", "B2", model.quotes.B1 ?? ""), reds: "tiling B" },
    },
    {
      id: "C6C3: C3 merged into C2",
      edit: model => pinMerged(model, "C", "C2", "C3", `${model.quotes.C2 ?? ""} (${model.quotes.C3 ?? ""}`),
      contrast: { edit: model => pinMerged(model, "C", "C2", "C3", model.quotes.C2 ?? ""), reds: "tiling C" },
    },
    {
      id: "C6D2: D2 merged into D1",
      edit: model => pinMerged(model, "D", "D1", "D2", `${model.quotes.D1 ?? ""}, ${model.quotes.D2 ?? ""}`),
      contrast: { edit: model => pinMerged(model, "D", "D1", "D2", model.quotes.D1 ?? ""), reds: "tiling D" },
    },
    {
      id: "C6S1: S1 merged into S2",
      edit: model => pinMerged(model, "S", "S2", "S1", `${model.quotes.S1 ?? ""}; ${model.quotes.S2 ?? ""}`),
      contrast: { edit: model => pinMerged(model, "S", "S2", "S1", model.quotes.S2 ?? ""), reds: "tiling S" },
    },
    {
      id: "G6-PIN-BOUNDARY-A: the A1/A2 cut moved over one word, A2's first word re-homed at the end of A1",
      edit: model => cutMoved(model, "A1", "A2", " "),
      contrast: { edit: model => cutMoved(model, "A1", "A2", " ", true), reds: "tiling A" },
    },
    {
      id: "S-PIN-BOUNDARY-B: the B1/B2 cut moved over one word, B2's first word re-homed at the end of B1",
      edit: model => cutMoved(model, "B1", "B2", " ("),
      contrast: { edit: model => cutMoved(model, "B1", "B2", " (", true), reds: "tiling B" },
    },
    {
      id: "S-PIN-BOUNDARY-C: the C1/C2 cut moved over one word, C2's first word re-homed at the end of C1",
      edit: model => cutMoved(model, "C1", "C2", " "),
      contrast: { edit: model => cutMoved(model, "C1", "C2", " ", true), reds: "tiling C" },
    },
    {
      id: "S-PIN-BOUNDARY-D: the D1/D2 cut moved over one word, D2's first word re-homed at the end of D1",
      edit: model => cutMoved(model, "D1", "D2", ", "),
      contrast: { edit: model => cutMoved(model, "D1", "D2", ", ", true), reds: "tiling D" },
    },
    {
      id: "S-PIN-BOUNDARY-S: the S2/S3 cut moved over one word, S3's first word re-homed at the end of S2",
      edit: model => cutMoved(model, "S2", "S3", ", "),
      contrast: { edit: model => cutMoved(model, "S2", "S3", ", ", true), reds: "tiling S" },
    },
    {
      id: "S-PIN-SPLIT-A: A3 cut in two at its last space, a new pin A4 taking its last word",
      edit: model => pinCut(model, "A", "A3", "A4"),
      contrast: { edit: model => pinCut(model, "A", "A3", "A4", true), reds: "tiling A" },
    },
    {
      id: "S-PIN-SPLIT-B: B2 cut in two at its last space, a new pin B3 taking its last word",
      edit: model => pinCut(model, "B", "B2", "B3"),
      contrast: { edit: model => pinCut(model, "B", "B2", "B3", true), reds: "tiling B" },
    },
    {
      id: "S-PIN-SPLIT-C: C3 cut in two at its last space, a new pin C4 taking its last word",
      edit: model => pinCut(model, "C", "C3", "C4"),
      contrast: { edit: model => pinCut(model, "C", "C3", "C4", true), reds: "tiling C" },
    },
    {
      id: "S-PIN-SPLIT-D: D2 cut in two at its last space, a new pin D3 taking its last word",
      edit: model => pinCut(model, "D", "D2", "D3"),
      contrast: { edit: model => pinCut(model, "D", "D2", "D3", true), reds: "tiling D" },
    },
    {
      id: "S-PIN-SPLIT-S: S3 cut in two at its last space, a new pin S4 taking its last word",
      edit: model => pinCut(model, "S", "S3", "S4"),
      contrast: { edit: model => pinCut(model, "S", "S3", "S4", true), reds: "tiling S" },
    },
    {
      id: "S-PIN-SEPARATOR-A: the separator after A1 taken into A1's quote",
      edit: model => separatorTaken(model, "A1", " "),
      contrast: { edit: model => separatorTaken(model, "A1", " ", true), reds: "tiling A" },
    },
    {
      id: "S-PIN-SEPARATOR-B: the separator after B1 taken into B1's quote",
      edit: model => separatorTaken(model, "B1", " ("),
      contrast: { edit: model => separatorTaken(model, "B1", " (", true), reds: "tiling B" },
    },
    {
      id: "S-PIN-SEPARATOR-C: the separator after C1 taken into C1's quote",
      edit: model => separatorTaken(model, "C1", " "),
      contrast: { edit: model => separatorTaken(model, "C1", " ", true), reds: "tiling C" },
    },
    {
      id: "S-PIN-SEPARATOR-D: the separator after D1 taken into D1's quote",
      edit: model => separatorTaken(model, "D1", ", "),
      contrast: { edit: model => separatorTaken(model, "D1", ", ", true), reds: "tiling D" },
    },
    {
      id: "S-PIN-SEPARATOR-S: the separator after S1 taken into S1's quote",
      edit: model => separatorTaken(model, "S1", "; "),
      contrast: { edit: model => separatorTaken(model, "S1", "; ", true), reds: "tiling S" },
    },
    {
      id: "K5-EMPTY-PIN-END-A: a new pin A4 with an empty quote appended after A3",
      edit: model => pinAdded(model, "A", "A3", "A4", ""),
      contrast: { edit: model => pinAdded(model, "A", "A3", "A4", lastWord(model, "A3")), reds: "tiling A" },
    },
    {
      id: "K5-EMPTY-PIN-END-B: a new pin B3 with an empty quote appended after B2",
      edit: model => pinAdded(model, "B", "B2", "B3", ""),
      contrast: { edit: model => pinAdded(model, "B", "B2", "B3", lastWord(model, "B2")), reds: "tiling B" },
    },
    {
      id: "K5-EMPTY-PIN-END-C: a new pin C4 with an empty quote appended after C3",
      edit: model => pinAdded(model, "C", "C3", "C4", ""),
      contrast: { edit: model => pinAdded(model, "C", "C3", "C4", lastWord(model, "C3")), reds: "tiling C" },
    },
    {
      id: "K5-EMPTY-PIN-END-D: a new pin D3 with an empty quote appended after D2",
      edit: model => pinAdded(model, "D", "D2", "D3", ""),
      contrast: { edit: model => pinAdded(model, "D", "D2", "D3", lastWord(model, "D2")), reds: "tiling D" },
    },
    {
      id: "K5-EMPTY-PIN-END-S: a new pin S4 with an empty quote appended after S3",
      edit: model => pinAdded(model, "S", "S3", "S4", ""),
      contrast: { edit: model => pinAdded(model, "S", "S3", "S4", lastWord(model, "S3")), reds: "tiling S" },
    },
    {
      id: "K5-EMPTY-PIN-MID-A: a new pin A4 with an empty quote inserted after A1",
      edit: model => pinAdded(model, "A", "A1", "A4", ""),
      contrast: { edit: model => pinAdded(model, "A", "A1", "A4", lastWord(model, "A1")), reds: "tiling A" },
    },
    {
      id: "K5-EMPTY-PIN-MID-B: a new pin B3 with an empty quote inserted after B1",
      edit: model => pinAdded(model, "B", "B1", "B3", ""),
      contrast: { edit: model => pinAdded(model, "B", "B1", "B3", lastWord(model, "B1")), reds: "tiling B" },
    },
    {
      id: "K5-EMPTY-PIN-MID-C: a new pin C4 with an empty quote inserted after C1",
      edit: model => pinAdded(model, "C", "C1", "C4", ""),
      contrast: { edit: model => pinAdded(model, "C", "C1", "C4", lastWord(model, "C1")), reds: "tiling C" },
    },
    {
      id: "K5-EMPTY-PIN-MID-D: a new pin D3 with an empty quote inserted after D1",
      edit: model => pinAdded(model, "D", "D1", "D3", ""),
      contrast: { edit: model => pinAdded(model, "D", "D1", "D3", lastWord(model, "D1")), reds: "tiling D" },
    },
    {
      id: "K5-EMPTY-PIN-MID-S: a new pin S4 with an empty quote inserted after S1",
      edit: model => pinAdded(model, "S", "S1", "S4", ""),
      contrast: { edit: model => pinAdded(model, "S", "S1", "S4", lastWord(model, "S1")), reds: "tiling S" },
    },
    {
      id: "S-SEPARATOR-PIN-A: a new pin A4 inserted after A1, its quote the label's separator there",
      edit: model => pinAdded(model, "A", "A1", "A4", " "),
      contrast: { edit: model => pinAdded(model, "A", "A1", "A4", " ".repeat(2)), reds: "tiling A" },
    },
    {
      id: "S-SEPARATOR-PIN-B: a new pin B3 inserted after B1, its quote the label's separator there",
      edit: model => pinAdded(model, "B", "B1", "B3", " ("),
      contrast: { edit: model => pinAdded(model, "B", "B1", "B3", " (".repeat(2)), reds: "tiling B" },
    },
    {
      id: "S-SEPARATOR-PIN-C: a new pin C4 inserted after C1, its quote the label's separator there",
      edit: model => pinAdded(model, "C", "C1", "C4", " "),
      contrast: { edit: model => pinAdded(model, "C", "C1", "C4", " ".repeat(2)), reds: "tiling C" },
    },
    {
      id: "S-SEPARATOR-PIN-D: a new pin D3 inserted after D1, its quote the label's separator there",
      edit: model => pinAdded(model, "D", "D1", "D3", ", "),
      contrast: { edit: model => pinAdded(model, "D", "D1", "D3", ", ".repeat(2)), reds: "tiling D" },
    },
    {
      id: "S-SEPARATOR-PIN-S: a new pin S4 inserted after S1, its quote the label's separator there",
      edit: model => pinAdded(model, "S", "S1", "S4", "; "),
      contrast: { edit: model => pinAdded(model, "S", "S1", "S4", "; ".repeat(2)), reds: "tiling S" },
    },
  ],
  Q11: [
    { id: "S-DECISION-FIELD-RENAME: the decision's second field named choice", edit: model => ({ ...model, decisionFields: [model.decisionFields[0] ?? "", "choice"] }) },
    { id: "C6Q: row Q removed whole, with every residual member", edit: model => ({ ...rowRemoved(model, "Q"), residuals: {} }) },
    { id: "C6Q4: pin Q4 removed with its quote and members", edit: model => ({ ...pinRemoved(model, "Q", "Q4"), residuals: without(model.residuals, ["Q4"]) }) },
    { id: "C6-labelQ: row Q's label reworded", edit: model => relabeled(model, "Q", labelIn(model, "Q").replace("each member a pinned quiet row", "each member a quiet row")) },
    { id: "C6-quoteQ: Q3's quote reworded", edit: model => quoted(model, "Q3", "R-VALUE-SHAPES") },
    { id: "C6-member: Q1's first member removed", edit: model => ({ ...model, residuals: { ...model.residuals, Q1: (model.residuals.Q1 ?? []).slice(1) } }) },
    { id: "S-PRODUCER-PHRASE: a phrase cut from P3's text", edit: model => lined(model, "P3", line => ({ ...line, text: line.text.replace(" and external verifier outcome", " and external verifier") })) },
    { id: "PL-blob: P5's blob id", edit: model => lined(model, "P5", line => ({ ...line, blob: "0".repeat(line.blob.length) })) },
  ],
};
/** The census's own anchor model: its literals, and its roster's producer block. */
const LIVE: AnchorModel = {
  requirement: REQUIREMENT,
  mergeNote: MERGE_NOTE,
  rows: ROWS,
  quotes: QUOTES,
  items: ITEMS,
  actions: ACTIONS,
  admitted: ADMITTED,
  codes: CODES,
  codesBead: CODES_BEAD,
  codesNotePin: CODES_NOTE_PIN,
  statuses: STATUSES,
  noun: RECORD_NOUN,
  vocabulary: VOCABULARY.map(word => word.spelling),
  decisionFields: DECISION_FIELDS,
  residuals: residualMembers(),
  producerPin: PRODUCER_PIN,
  producer: ROSTER.producer,
};
/** A member's contrast as measured: the readings its edit reds that the census's own model holds (undefined: the member has none). */
function contrastReds(member: ModelMember, held: readonly AnchorReading[]): AnchorReading[] | undefined {
  return member.contrast === undefined ? undefined : failing(member.contrast.edit(LIVE)).filter(reading => !held.includes(reading));
}
/** The members whose contrast, as measured, leaves the reading it names holding, where the census's own model holds that reading. */
function deadContrasts(members: readonly ModelMember[], held: readonly AnchorReading[]): string[] {
  return members.filter(member => member.contrast !== undefined && !held.includes(member.contrast.reds) && !(contrastReds(member, held) ?? []).includes(member.contrast.reds)).map(member => member.id);
}
/** The reading the contrast check's own controls name. */
const PROBE_READING: AnchorReading = "tiling A";
/** The contrast check's own controls, planted beside every anchor-model family: a member whose contrast edits nothing, which the check must name, and its twin whose contrast reds the reading it names, which the check must pass. */
const DEAD_CONTRAST: ModelMember = { id: "planted: a contrast that edits nothing", edit: model => separatorTaken(model, "A1", " "), contrast: { edit: model => model, reds: PROBE_READING } };
const LIVE_CONTRAST: ModelMember = { id: "planted: a contrast that reds tiling A", edit: model => separatorTaken(model, "A1", " "), contrast: { edit: model => separatorTaken(model, "A1", " ", true), reds: PROBE_READING } };
/** BOUND: model edits, each named for the coordinated census-and-roster edit it stands for, and the reading it must red. */
const BOUND: Readonly<Record<string, { readonly edit: Edit; readonly reds: AnchorReading }>> = {
  "G-requirement": { edit: model => ({ ...model, requirement: model.requirement.replace(/R8$/, "R9") }), reds: "title" },
  "G-merge-note": { edit: model => ({ ...model, mergeNote: model.mergeNote.replace("R7", "R9") }), reds: "title" },
  "G6-merge-trunc": { edit: model => ({ ...model, mergeNote: model.mergeNote.slice(0, 6) }), reds: "title" },
  "S-ROW-S": { edit: model => rowRemoved(model, "S"), reds: "statement" },
  "S-LABEL-WORD": { edit: model => quoted(relabeled(model, "A", labelIn(model, "A").replace("positive", "valid")), "A2", (model.quotes.A2 ?? "").replace("positive", "valid")), reds: "clauses" },
  "C6-rowD": { edit: model => rowRemoved(model, "D"), reds: "clauses" },
  "S-QUOTE-REWORD": { edit: model => quoted(model, "A3", (model.quotes.A3 ?? "").replace("omitted", "missing")), reds: "tiling A" },
  "C6-word-B2": { edit: model => quoted(model, "B2", (model.quotes.B2 ?? "").replace("survives", "survived")), reds: "tiling B" },
  "C6-word-C1": { edit: model => quoted(model, "C1", (model.quotes.C1 ?? "").replace("either ", "")), reds: "tiling C" },
  "S-PIN-DROP": { edit: model => pinRemoved(model, "D", "D2"), reds: "tiling D" },
  "C6-word-S3": { edit: model => quoted(model, "S3", (model.quotes.S3 ?? "").replace("a default", "any default")), reds: "tiling S" },
  "S-ITEM-REWORD": { edit: model => refielded({ ...model, items: model.items.map(entry => (entry.item === "feature projection" ? { ...entry, item: "feature projections" } : entry)) }, "feature projections", [{ name: "featureProjection", phrase: "feature projections" }]), reds: "items" },
  "S-FIELD-DROP": { edit: model => refielded(model, "actor/selector", [{ name: "actor", phrase: "actor" }]), reds: "join" },
  "S-PHRASE": {
    edit: model =>
      refielded(model, ACTION_ITEM, [
        { name: "proposed", phrase: "proposed" },
        { name: "admitted", phrase: "admitted" },
        { name: "executed", phrase: "executed" },
        { name: "resolverVerdict", phrase: "resolver verdict" },
      ]),
    reds: "join",
  },
  "S-FIELD-REWORD": { edit: model => renamed(model, "selector", "chooser"), reds: "runs" },
  "G-REN-SNAP-v3": { edit: model => renamed(model, "snapshotHash", "checkpointHash"), reds: "runs" },
  "G-REN-BLP": { edit: model => renamed(model, "behaviorLogProbability", "behaviorProbability"), reds: "runs" },
  "S-ACTION-DROP": { edit: model => ({ ...model, actions: model.actions.slice(0, -1) }), reds: "actions" },
  "S-ACTION-REWORD": { edit: model => ({ ...model, actions: model.actions.map(action => (action === "executed" ? "performed" : action)) }), reds: "actions" },
  "G-ACTION-MERGE": {
    edit: model =>
      refielded(model, ACTION_ITEM, [
        { name: "proposed", phrase: "proposed vs admitted" },
        { name: "executed", phrase: "executed action" },
        { name: "resolverVerdict", phrase: "resolver verdict" },
      ]),
    reds: "action fields",
  },
  "G-ADMITTED": { edit: model => ({ ...model, admitted: "accepted" }), reds: "admitted" },
  "S-CODE-DROP-v3": { edit: model => ({ ...model, codes: model.codes.filter(code => code !== "INTENT_DUPLICATE") }), reds: "codes" },
  "S-CODE-REWORD": { edit: model => ({ ...model, codes: model.codes.map(code => (code === "INTENT_DUPLICATE" ? "INTENT_DUPLICATED" : code)) }), reds: "codes" },
  "G-codes-bead": { edit: model => ({ ...model, codesBead: "wb-4ap.15" }), reds: "codes bead" },
  "G-note-pin": { edit: model => ({ ...model, codesNotePin: "cf21476" }), reds: "note codes" },
  "S-STATUS-DROP": { edit: model => ({ ...model, statuses: model.statuses.slice(0, 1) }), reds: "statuses" },
  "S-STATUS-REWORD": { edit: model => ({ ...model, statuses: [model.statuses[0] ?? "", ["ref", "rain"].join("")] }), reds: "statuses" },
  "S-NOUN-REWORD": { edit: model => ({ ...model, noun: "sideload", vocabulary: composedVocabulary("sideload", model.items) }), reds: "noun" },
  "S-NOUN-DROP": { edit: model => ({ ...model, vocabulary: model.vocabulary.slice(1) }), reds: "vocabulary" },
  "G-noun-src": { edit: model => ({ ...model, noun: "workbench", vocabulary: composedVocabulary("workbench", model.items) }), reds: "src" },
  "G-producer-pin": { edit: model => ({ ...model, producerPin: `${model.producerPin.startsWith("4") ? "5" : "4"}${model.producerPin.slice(1)}` }), reds: "pin cited" },
  "G-producer-line": { edit: model => lined(model, "P1", line => ({ ...line, line: line.line - 1 })), reds: "lines cited" },
};

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each pin's case's assertion count once its witness compare held, in run order. */
const ASSERTED: string[] = [];
/** Each of the three other judged cases (rule 16, the mutant battery, the outside anchors) at its last statement, with its assertion count, in run order. */
const ENDED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    expect(Object.keys(SCHEMA), "the fixture's keys").toEqual(["comment", "bead", "required", "positive", "negatives"]);
    expect(SCHEMA.bead, "the fixture is this bead's").toBe(BEAD);
    expect(SCHEMA.required, "its required list is the statement's fields, in order").toEqual([...FIELDS]);
    expect(Object.keys(SCHEMA.positive), "its one positive record carries exactly the required fields, in order").toEqual([...FIELDS]);
    expect(
      SCHEMA.negatives.map(negative => negative.omitted),
      "one negative per required field, in order",
    ).toEqual([...FIELDS]);
    const strays = SCHEMA.negatives.filter(negative => !isDeepStrictEqual(Object.keys(negative), ["omitted", "record"]) || !isDeepStrictEqual(negative.record, lessField(POSITIVE, negative.omitted)));
    expect(
      strays.map(negative => negative.omitted),
      "each negative is the positive less exactly its omitted field",
    ).toEqual([]);
    return { path: SCHEMA_PATH, required: [...FIELDS], positive: 1, negatives: SCHEMA.negatives.length };
  },
  A2: () => {
    for (const subject of SUBJECTS) expect(failures("K-POSITIVE", subject.validate), `${subject.id}: the positive record is accepted unchanged`).toEqual([]);
    const carried = FIELDS.filter(field => present(POSITIVE, field));
    expect(carried, "the positive record carries every required field").toEqual([...FIELDS]);
    return { subjects: SUBJECTS.map(subject => subject.id), positive: readingText(POSITIVE, REFERENCE(POSITIVE)), carried: carried.length };
  },
  A3: () => {
    const fixture = SCHEMA.negatives.map(negative => ({ label: `omit ${negative.omitted}`, candidate: negative.record, expected: missing(negative.omitted) }));
    for (const subject of SUBJECTS) {
      const wrong = fixture.filter(control => !isDeepStrictEqual(readingOf(subject.validate, control.candidate), control.expected)).map(control => control.label);
      expect(wrong, `${subject.id}: each fixture negative is the typed refusal naming its field`).toEqual([]);
    }
    return SCHEMA.negatives.map(negative => `${negative.omitted}: ${readingText(negative.record, REFERENCE(negative.record))}`);
  },
  B1: () => {
    const at = ACTIONS.map(name => FIELDS.indexOf(name));
    expect(at.filter(index => index < 0), "proposed, admitted and executed are required fields").toEqual([]);
    expect(new Set(at).size, "three distinct fields").toBe(3);
    for (const subject of SUBJECTS) expect(failures("K-PARITY", subject.validate), `${subject.id}: each falsifier is accepted unchanged`).toEqual([]);
    const valuesOf = (record: Holder): number => new Set(ACTIONS.map(name => shown(record[name] ?? null))).size;
    const holding = {
      all: Object.entries(FALSIFIERS).filter(([, record]) => valuesOf(record) === 3).map(([name]) => name),
      two: Object.entries(FALSIFIERS).filter(([, record]) => valuesOf(record) === 2).map(([name]) => name),
    };
    expect(holding, "three of the six falsifiers hold all three actions apart and the other three hold two values").toEqual({
      all: ["three-distinct", "failed-execution", "unexecuted"],
      two: ["admitted-not-executed", "substituted", "verified-not-executed"],
    });
    const carried = [...new Set(BASES.map(base => String(base.record.verifierOutcome)))].sort();
    const pairs = ACTIONS.flatMap((one, index) => ACTIONS.slice(index + 1).map(two => [one, two] as const));
    const unheld = pairs.flatMap(([one, two]) =>
      carried.filter(outcome => !Object.values(FALSIFIERS).some(record => String(record.verifierOutcome) === outcome && !isDeepStrictEqual(record[one], record[two]))).map(outcome => `${one}/${two} under ${outcome}`),
    );
    expect(unheld, "between them the falsifiers hold each two of the three actions apart under each verifier outcome the records carry").toEqual([]);
    const collapsing = ["M-COLLAPSE-EXECUTED", "M-COLLAPSE-ADMITTED", "M-REFUSE-DIVERGENT", "M-COLLAPSE-EXECUTED-VERIFIED"];
    expect(
      collapsing.filter(id => !refusedBy(mutant(id)).includes("K-PARITY")),
      "each collapsing or apart-refusing mutant of the battery (unconditional, or only when the verifier passed) is refused by the parity check",
    ).toEqual([]);
    const three = FALSIFIERS["three-distinct"] ?? POSITIVE;
    return {
      actions: [...ACTIONS],
      at,
      falsifiers: Object.entries(FALSIFIERS).map(([name, record]) => `${name}: ${String(record.verifierOutcome)} ${readingText(record, REFERENCE(record))}`),
      holding,
      outcomes: carried,
      pairs: pairs.map(([one, two]) => `${one}/${two}`),
      collapsing: collapsing.map(id => `${id}: ${readingText(three, mutant(id)(three))}; refused by ${refusedBy(mutant(id)).join(", ")}`),
    };
  },
  B2: () => {
    const record = FALSIFIERS["admitted-not-executed"] ?? POSITIVE;
    const reading = REFERENCE(record);
    expect(isDeepStrictEqual(record.admitted, record.executed), "the falsifier's admitted differs from its executed").toBe(false);
    expect(reading, "it is accepted unchanged").toEqual(acceptedAs(record));
    const kept = reading.ok ? { admitted: jsonOf(reading.record.admitted), executed: jsonOf(reading.record.executed) } : null;
    expect(kept, "the accepted record keeps both").toEqual({ admitted: jsonOf(record.admitted), executed: jsonOf(record.executed) });
    return { proposed: jsonOf(record.proposed), admitted: jsonOf(record.admitted), executed: jsonOf(record.executed), reading: readingText(record, reading) };
  },
  C1: () => {
    const admitted = BASES.filter(base => base.record.resolverVerdict === ADMITTED);
    for (const subject of SUBJECTS) {
      const wrong = admitted.filter(base => !isDeepStrictEqual(readingOf(subject.validate, base.record), acceptedAs(base.record))).map(base => base.name);
      expect(wrong, `${subject.id}: every base whose verdict is admitted is accepted unchanged`).toEqual([]);
    }
    return { verdict: ADMITTED, readings: admitted.map(base => `${base.name}: ${shown(base.record.resolverVerdict)} ${readingText(base.record, REFERENCE(base.record))}`) };
  },
  C2: () => {
    for (const subject of SUBJECTS) {
      expect(failures("K-VERDICT", subject.validate), `${subject.id}: admitted on the one-pair record and each code on its rejected record accepted, each off-domain value of the list refused over every base`).toEqual([]);
    }
    const off = CONTROLS["K-VERDICT"].filter(control => control.family === "off");
    expect(new Set(off.map(control => control.base)).size, "the off-domain values are set over every base").toBe(BASES.length);
    const verdictMutants = ["M-OPEN-VERDICT", "M-FIVE-CODES", "M-CASE-VERDICT", "M-NO-ADMITTED", "M-OPEN-VERDICT-UNADMITTED", "M-LATER-CODE-UNADMITTED"];
    const mutants = Object.fromEntries(verdictMutants.map(id => [id, refusedBy(mutant(id))]));
    expect(
      Object.entries(mutants).filter(([, checks]) => !checks.includes("K-VERDICT")).map(([id]) => id),
      "each verdict mutant of the battery, unconditional or only when nothing was admitted, is refused by the verdict check",
    ).toEqual([]);
    const codes = CODES.map(code => over(REJECTED, { resolverVerdict: code })).map(record => `${String(record.resolverVerdict)}: ${readingText(record, REFERENCE(record))}`);
    const values = OFF_VERDICTS.map(value => over(SINGLE, { resolverVerdict: value })).map(record => readingText(record, REFERENCE(record)));
    const bases = BASES.map(base => {
      const own = off.filter(control => control.base === base.name);
      return `${base.name}: ${own.filter(control => isDeepStrictEqual(REFERENCE(control.candidate), control.expected)).length} of ${own.length} off-domain values refused`;
    });
    return { codes, off: values, bases, mutants };
  },
  C3: () => {
    const notes = beadRow(textOf(EXPORT), CODES_BEAD)?.notes ?? "";
    const listed = /the stable rejection codes (INTENT_[A-Z_]+(?: \/ INTENT_[A-Z_]+)*) \(packages\/coordination\/README\.md@([0-9a-f]+)\)/.exec(notes);
    expect(listed?.[1]?.split(" / "), `the codes are ${CODES_BEAD}'s note list`).toEqual([...CODES]);
    expect(listed?.[2], "read at the note's pin").toBe(CODES_NOTE_PIN);
    const union = unionCodes();
    expect(union, "the codes are the roster's copy of the producer's RejectionCode union at the pin").toEqual([...CODES]);
    const later = CONTROLS["K-VERDICT"].filter(control => control.family === "off" && control.candidate.resolverVerdict === LATER_CODE);
    expect(later.map(control => control.base), `${LATER_CODE} is set over every base`).toEqual(BASES.map(base => base.name));
    for (const subject of SUBJECTS) {
      const wrong = later.filter(control => !isDeepStrictEqual(readingOf(subject.validate, control.candidate), control.expected)).map(control => control.base);
      expect(wrong, `${subject.id}: ${LATER_CODE} is refused over every base`).toEqual([]);
    }
    const single = over(SINGLE, { resolverVerdict: LATER_CODE });
    return { note: listed?.[1]?.split(" / ") ?? [], producer: union, later: readingText(single, REFERENCE(single)), laterBases: later.length };
  },
  D1: () => {
    expect(new Set(STATUSES).size, "success and abstain are two values").toBe(2);
    for (const subject of SUBJECTS) {
      expect(failures("K-STATUS", subject.validate), `${subject.id}: the abstain accepted unchanged, and each off-domain status, each refused choice and each order control read so over every base`).toEqual([]);
    }
    const reading = REFERENCE(DECLINED);
    expect(reading, "the abstain is accepted unchanged").toEqual(acceptedAs(DECLINED));
    const families = ["off", "choice", "order"].map(family => [family, new Set(CONTROLS["K-STATUS"].filter(control => control.family === family).map(control => control.base)).size] as const);
    expect(families.filter(([, covered]) => covered !== BASES.length).map(([family]) => family), "the off statuses, the refused choices and the order controls are set over every base").toEqual([]);
    const off = OFF_STATUSES.map(value => withDecision({ ...POSITIVE_DECISION, status: value })).map(record => readingText(record, REFERENCE(record)));
    const decision = decisionOf(DECLINED);
    return {
      statuses: STATUSES.join(" and "),
      record: readingText(DECLINED, reading),
      decision: `status ${String(decision.status)}, chosen ${shown(decision.chosen)}`,
      off,
      families: families.map(([family, covered]) => `${family} over ${covered} bases`),
    };
  },
  D2: () => {
    const reading = REFERENCE(DECLINED);
    const kept = reading.ok && isHolder(reading.record.decision) ? reading.record.decision.status : null;
    expect(kept, "the accepted abstain still reads its own word, never success").toBe(DECLINE);
    const statusForms = CONTROLS["K-FORMS"].filter(control => isDeepStrictEqual(control.expected, missing(nested("status"))));
    const choices = CONTROLS["K-STATUS"].filter(control => control.family === "choice");
    expect(new Set(statusForms.map(control => control.base)).size, "the missing-status forms are set over every base's decision").toBe(BASES.length);
    expect(new Set(choices.map(control => control.base)).size, "the refused choices are set over every base").toBe(BASES.length);
    for (const subject of SUBJECTS) {
      const wrong = [...statusForms, ...choices].filter(control => !isDeepStrictEqual(readingOf(subject.validate, control.candidate), control.expected)).map(control => control.label);
      expect(wrong, `${subject.id}: a missing status over every base's decision is a refusal, never success, and each choice shape its status refuses is refused over every base`).toEqual([]);
    }
    const shapes = CHOICE_FAULTS.map(fault => {
      const record = withDecision({ status: fault.status, chosen: fault.chosen });
      return `${fault.label}: ${readingText(record, REFERENCE(record))}`;
    });
    const asSuccess = ["M-DECLINE-AS-SUCCESS", "M-DEFAULT-STATUS", "M-EMPTY-SUCCESS", "M-DECLINE-CHOICE", "M-STRING-CHOICE", "M-EMPTY-SUCCESS-UNPROPOSED", "M-DECLINE-CHOICE-REJECTED", "M-OBJECT-CHOICE"];
    const mutants = Object.fromEntries(asSuccess.map(id => [id, refusedBy(mutant(id))]));
    expect(Object.entries(mutants).filter(([, checks]) => checks.length === 0).map(([id]) => id), "each mutant of the battery that lets an abstain read as success is refused").toEqual([]);
    return { kept: `kept ${String(kept)}`, statusForms: statusForms.length, choices: choices.length, shapes, mutants };
  },
  S1: () => {
    const split = ITEMS.filter(entry => !joined(entry.item, entry.fields.map(field => field.phrase))).map(entry => entry.item);
    expect(split, "each item is joined by its fields' phrases").toEqual([]);
    expect(new Set(FIELDS).size, "the required fields are distinct").toBe(FIELDS.length);
    const src = liveSrc();
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(src.find(entry => entry.path === SRC_ANCHOR.path)?.text.includes(SRC_ANCHOR.token), "the listing read the anchor module").toBe(true);
    const walked = walkList(ROOT, "src");
    const ignored = ignoredOf(ROOT, walked);
    expect(
      walked.filter(path => !ignored.has(path)),
      "git's src listing equals the walk less what git ignores",
    ).toEqual(src.map(entry => entry.path));
    const findings = srcFindings(src, SITES);
    expect(findings, "no src module names the vocabulary unregistered, and no registration is stale").toEqual([]);
    const planted = srcFindings([...src, PLANT], SITES);
    expect(planted, "a planted module after the tracked ones: exactly its words").toEqual(PLANT_FINDINGS);
    const pathOnly = srcFindings([...src, PATH_PLANT], SITES);
    expect(pathOnly, "a planted module naming a word in its path alone: exactly that word").toEqual([`${PATH_PLANT.path}: names sidecar`]);
    const separated = srcFindings([...src, SEPARATOR_PLANT], SITES);
    expect(separated, "a planted module naming words through each of the five separators and through a run of them: exactly those words").toEqual(SEPARATOR_FINDINGS);
    const site: Site = { path: PLANT.path, validate: REFERENCE };
    const registered = srcFindings([...src, PLANT], [...SITES, site]);
    const stale = srcFindings(src, [...SITES, site]);
    const twice = srcFindings([...src, PLANT], [...SITES, site, site]);
    expect({ registered, stale, twice }, "a registered module is admitted; a stale or repeated registration is a finding").toEqual({
      registered: [],
      stale: [`${PLANT.path}: stale registration`],
      twice: [`${PLANT.path}: registered twice`],
    });
    return {
      items: ITEMS.map(entry => `${entry.item}: ${entry.fields.map(field => field.name).join(", ")}`),
      vocabulary: VOCABULARY.map(word => word.spelling),
      findings,
      floor: src.length >= SRC_FLOOR,
      planted,
      pathOnly,
      separated,
      registered,
      stale,
      twice,
    };
  },
  S2: () => {
    for (const subject of SUBJECTS) {
      expect(
        failures("K-NEGATIVE", subject.validate),
        `${subject.id}: every control lacking a key - a field, a pair in every mix holding an absent key, a suffix, a field beside each later fault - over every base is the typed refusal naming its first missing field`,
      ).toEqual([]);
      expect(
        failures("K-FORMS", subject.validate),
        `${subject.id}: every undefined and null control - a field, a pair in every mix, a field beside each later fault - and every decision form, over every base, is the typed refusal naming its first missing field`,
      ).toEqual([]);
    }
    expect(CONTROLS["K-NEGATIVE"].filter(control => FIELDS.every(field => Object.hasOwn(control.candidate, field))).map(control => control.label), "every K-NEGATIVE control lacks a required key").toEqual([]);
    expect(CONTROLS["K-FORMS"].filter(control => !FIELDS.every(field => Object.hasOwn(control.candidate, field))).map(control => control.label), "no K-FORMS control lacks a required key").toEqual([]);
    const named = (control: Control): boolean => readingText(control.candidate, REFERENCE(control.candidate)) === readingText(control.candidate, control.expected);
    const summary = (check: CheckId): string[] =>
      BASES.map(base => {
        const own = CONTROLS[check].filter(control => control.base === base.name);
        const families = [...new Set(own.map(control => control.family))].map(family => {
          const set = own.filter(control => control.family === family);
          return `${family} ${set.filter(named).length} of ${set.length}`;
        });
        return `${base.name}: ${families.join(", ")}`;
      });
    return { negative: summary("K-NEGATIVE"), forms: summary("K-FORMS"), faults: LATER_FAULTS.map(fault => `${fault.name} (in ${fault.field})`), mixes: MIXES.map(mix => mix.join(" and ")) };
  },
  S3: () => {
    const defaulting = [
      "M-DEFAULT-FEEDBACK",
      "M-DEFAULT-LOGPROB",
      "M-ABSENT-OK",
      "M-THIRTEEN-FIELDS",
      "M-DEFAULT-STATUS",
      "M-UNTYPED-REFUSAL",
      "M-REFUSAL-CARRIES-RECORD",
      "M-DEFAULT-FEEDBACK-UNVERIFIED",
      "M-DEFAULT-RECEIPT-UNEXECUTED",
      "M-DEFAULT-LOGPROB-DECLINE",
      "M-DEFAULT-CHOSEN-DECLINE",
      "M-DEFAULT-STATUS-EMPTY",
    ];
    const refused = Object.fromEntries(defaulting.map(id => [id, refusedBy(mutant(id))]));
    expect(Object.entries(refused).filter(([, checks]) => checks.length === 0), "each defaulting or untyping mutant of the battery, unconditional or conditioned on a context a base carries, is refused").toEqual([]);
    const forms = [...CONTROLS["K-NEGATIVE"], ...CONTROLS["K-FORMS"]];
    const subjects = SUBJECTS.map(subject => ({ id: subject.id, shapes: [...new Set(forms.map(control => shapeOf(readingOf(subject.validate, control.candidate))))] }));
    expect(
      subjects.filter(entry => !isDeepStrictEqual(entry.shapes, ["ok,code,field ok=false"])).map(entry => `${entry.id}: ${entry.shapes.join(" | ")}`),
      "for every subject, every missing form reads exactly ok, code and field with ok false: never accepted, no record, nothing filled",
    ).toEqual([]);
    const shapes = [...new Set(forms.map(control => shapeOf(REFERENCE(control.candidate))))];
    return { refused, forms: forms.length, shapes };
  },
};

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        const witness = row.id === "Q" ? quietRow(pin) : implementation === undefined ? null : implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
        ASSERTED.push(`${pin}:${expect.getState().assertionCalls}`);
      });
    }
  }

  it("rule 16: the rows, the items and fields, the domains, the value lists, the vocabulary, the bases, the later faults, the checks and their controls, the mutants, the residual families and the registrations are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:3", "D:2", "S:3", "Q:11"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(ITEMS.map(entry => `${entry.item}:${entry.fields.length}`)).toEqual([
      "GP program/checkpoint snapshot hash:1",
      "feature projection:1",
      "actor/selector:2",
      "legal support at sample time:1",
      "sampled decision with behavior log probability:2",
      "proposed vs admitted vs executed action with resolver verdict:4",
      "source-owned effect receipt ref:1",
      "verifier outcome:1",
      "final feedback status:1",
    ]);
    expect(FIELDS).toEqual([
      "snapshotHash",
      "featureProjection",
      "actor",
      "selector",
      "support",
      "decision",
      "behaviorLogProbability",
      "proposed",
      "admitted",
      "executed",
      "resolverVerdict",
      "effectReceiptRef",
      "verifierOutcome",
      "feedbackStatus",
    ]);
    expect(CONNECTORS).toEqual(["/", " vs ", " with "]);
    expect(ACTIONS).toEqual(["proposed", "admitted", "executed"]);
    expect(DECISION_FIELDS).toEqual(["status", "chosen"]);
    expect(STATUSES).toEqual(["success", ["abs", "tain"].join("")]);
    expect(VERDICTS).toEqual(["admitted", "INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT", "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED"]);
    expect(LATER_CODE).toBe("INTENT_CLAIM_INVALID");
    expect(nearMisses("admitted")).toEqual(["ADMITTED", "Admitted", " admitted", "admitted "]);
    expect(nearMisses("INTENT_DUPLICATE")).toEqual(["intent_duplicate", "Intent_duplicate", " INTENT_DUPLICATE", "INTENT_DUPLICATE "]);
    expect(OFF_VERDICTS.slice(0, 28), "each verdict word's four near misses first").toEqual(VERDICTS.flatMap(nearMisses));
    expect(OFF_VERDICTS.slice(28).map(shown), "then eleven others").toEqual(['"rejected"', '"accepted"', '"substituted"', '"INTENT_UNKNOWN"', '"INTENT_"', '""', '"INTENT_CLAIM_INVALID"', "0", "true", '["admitted"]', '{"code":"INTENT_DUPLICATE"}']);
    expect(OFF_STATUSES.slice(0, 8), "each status word's four near misses first").toEqual(STATUSES.flatMap(nearMisses));
    expect(OFF_STATUSES.slice(8).map(value => shown(value).replace(DECLINE, "<D>")), "then ten others").toEqual(['"<D>ed"', '"sampled"', '"skip"', '"none"', '"failure"', '""', "1", "true", '["<D>"]', '{"status":"success"}']);
    expect(Object.entries(CHOICES).map(([shape, value]) => `${shape}:${shown(value)}`)).toEqual(["nothing:[]", 'a pair:["a1:t1"]', 'two pairs:["a1:t1","a2:t2"]', 'a bare word:"a1:t1"', 'an empty word:""', "a number:1", "a flag:true", 'an object:{"pair":"a1:t1"}']);
    expect(CHOICE_FAULTS.map(fault => `${fault.label.replace(DECLINE, "<D>")}: ${readingText(POSITIVE, fault.expected)}`)).toEqual([
      "success choosing nothing: refused success-without-choice",
      "success choosing a bare word: refused success-without-choice",
      "success choosing an empty word: refused success-without-choice",
      "success choosing a number: refused success-without-choice",
      "success choosing a flag: refused success-without-choice",
      "success choosing an object: refused success-without-choice",
      "<D> choosing a pair: refused decline-with-choice",
      "<D> choosing two pairs: refused decline-with-choice",
      "<D> choosing a bare word: refused decline-with-choice",
      "<D> choosing an empty word: refused decline-with-choice",
      "<D> choosing a number: refused decline-with-choice",
      "<D> choosing a flag: refused decline-with-choice",
      "<D> choosing an object: refused decline-with-choice",
    ]);
    expect(FORMS).toEqual(["absent", "undefined", "null"]);
    expect(PAIRS.length, "every pair of the fourteen fields").toBe(91);
    expect([ORDER_STATUS, ORDER_VERDICT]).toEqual(["skip", "rejected"]);
    expect(LATER_FAULTS.map(fault => `${fault.name}:${fault.field}`)).toEqual([
      "a decision lacking its status:decision",
      "a decision lacking its choice:decision",
      "the decision a bare word:decision",
      "the off status:decision",
      "the choice its status refuses:decision",
      "the off verdict:resolverVerdict",
    ]);
    expect(VOCABULARY.map(word => `${word.spelling}:${word.pattern.source}`)).toEqual([
      "sidecar:sidecar",
      "snapshotHash:snapshot[ \\t._-]*hash",
      "featureProjection:feature[ \\t._-]*projection",
      "behaviorLogProbability:behavior[ \\t._-]*log[ \\t._-]*probability",
      "resolverVerdict:resolver[ \\t._-]*verdict",
      "effectReceiptRef:effect[ \\t._-]*receipt[ \\t._-]*ref",
      "verifierOutcome:verifier[ \\t._-]*outcome",
      "feedbackStatus:feedback[ \\t._-]*status",
    ]);
    expect(BASES.map(base => `${base.name}:${String(base.record.verifierOutcome)}`)).toEqual([
      "positive:pass",
      "single:pass",
      "admitted-not-executed:partial",
      "substituted:pass",
      "three-distinct:partial",
      "verified-not-executed:pass",
      "failed-execution:fail",
      "unexecuted:not-run",
      "INTENT_BASIS_STALE:not-run",
      "INTENT_SCOPE_PROTECTED:not-run",
      "INTENT_WRITE_CONFLICT:not-run",
      "INTENT_BUDGET_EXCEEDED:not-run",
      "INTENT_DUPLICATE:not-run",
      "INTENT_AUTHORITY_EXCEEDED:not-run",
      "decline:not-run",
    ]);
    expect(CHECK_IDS).toEqual(["K-POSITIVE", "K-NEGATIVE", "K-FORMS", "K-PARITY", "K-VERDICT", "K-STATUS"]);
    expect(Object.fromEntries(CHECK_IDS.map(check => [check, tally(check)])), "each check's controls by family: how many, over how many bases").toEqual({
      "K-POSITIVE": { accepted: "1 over 1" },
      "K-NEGATIVE": { single: "210 over 15", pair: "6825 over 15", suffix: "195 over 15", beside: "1170 over 15" },
      "K-FORMS": { single: "420 over 15", pair: "5460 over 15", beside: "2340 over 15", decision: "330 over 15" },
      "K-PARITY": { accepted: "6 over 6" },
      "K-VERDICT": { accepted: "7 over 7", off: "585 over 15" },
      "K-STATUS": { accepted: "1 over 1", off: "270 over 15", choice: "195 over 15", order: "540 over 15" },
    });
    expect(MUTANTS.map(entry => entry.id)).toEqual([
      "M-DEFAULT-FEEDBACK",
      "M-DEFAULT-LOGPROB",
      "M-ABSENT-OK",
      "M-THIRTEEN-FIELDS",
      "M-NULL-PRESENT",
      "M-UNDEFINED-PRESENT",
      "M-UNTYPED-REFUSAL",
      "M-REFUSAL-CARRIES-RECORD",
      "M-DEFAULT-STATUS",
      "M-COLLAPSE-EXECUTED",
      "M-COLLAPSE-ADMITTED",
      "M-REFUSE-DIVERGENT",
      "M-SINGLE-EXECUTION",
      "M-OPEN-VERDICT",
      "M-FIVE-CODES",
      "M-CASE-VERDICT",
      "M-NO-ADMITTED",
      "M-DECLINE-AS-SUCCESS",
      "M-OPEN-STATUS",
      "M-REFUSE-DECLINE",
      "M-EMPTY-SUCCESS",
      "M-DECLINE-CHOICE",
      "M-DEFAULT-FEEDBACK-UNVERIFIED",
      "M-DEFAULT-RECEIPT-UNEXECUTED",
      "M-DEFAULT-LOGPROB-DECLINE",
      "M-DEFAULT-CHOSEN-DECLINE",
      "M-DEFAULT-STATUS-EMPTY",
      "M-COLLAPSE-EXECUTED-VERIFIED",
      "M-LAST-MISSING",
      "M-STRING-CHOICE",
      "M-VERDICT-FIRST",
      "M-OPEN-VERDICT-UNADMITTED",
      "M-LATER-CODE-UNADMITTED",
      "M-OPEN-STATUS-UNPROPOSED",
      "M-EMPTY-SUCCESS-UNPROPOSED",
      "M-DECLINE-CHOICE-REJECTED",
      "M-LAST-MISSING-REJECTED",
      "M-STATUS-BEFORE-MISSING",
      "M-NULLISH-AFTER-ABSENT",
      "M-OBJECT-CHOICE",
    ]);
    expect(Object.entries(residualMembers()).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:5", "Q2:2", "Q3:5", "Q4:3", "Q5:9", "Q6:1", "Q7:12", "Q8:4", "Q9:4", "Q10:35", "Q11:8"]);
    expect([...READINGS]).toEqual([
      "title",
      "statement",
      "clauses",
      "tiling A",
      "tiling B",
      "tiling C",
      "tiling D",
      "tiling S",
      "items",
      "join",
      "runs",
      "actions",
      "action fields",
      "admitted",
      "codes",
      "codes bead",
      "note codes",
      "statuses",
      "noun",
      "vocabulary",
      "pin cited",
      "lines cited",
      "src",
    ]);
    expect(Object.entries(BOUND).map(([name, bound]) => `${name}:${bound.reds}`)).toEqual([
      "G-requirement:title",
      "G-merge-note:title",
      "G6-merge-trunc:title",
      "S-ROW-S:statement",
      "S-LABEL-WORD:clauses",
      "C6-rowD:clauses",
      "S-QUOTE-REWORD:tiling A",
      "C6-word-B2:tiling B",
      "C6-word-C1:tiling C",
      "S-PIN-DROP:tiling D",
      "C6-word-S3:tiling S",
      "S-ITEM-REWORD:items",
      "S-FIELD-DROP:join",
      "S-PHRASE:join",
      "S-FIELD-REWORD:runs",
      "G-REN-SNAP-v3:runs",
      "G-REN-BLP:runs",
      "S-ACTION-DROP:actions",
      "S-ACTION-REWORD:actions",
      "G-ACTION-MERGE:action fields",
      "G-ADMITTED:admitted",
      "S-CODE-DROP-v3:codes",
      "S-CODE-REWORD:codes",
      "G-codes-bead:codes bead",
      "G-note-pin:note codes",
      "S-STATUS-DROP:statuses",
      "S-STATUS-REWORD:statuses",
      "S-NOUN-REWORD:noun",
      "S-NOUN-DROP:vocabulary",
      "G-noun-src:src",
      "G-producer-pin:pin cited",
      "G-producer-line:lines cited",
    ]);
    expect(Object.entries(MODEL_RESIDUALS).map(([id, members]) => `${id}:${members.map(member => member.contrast?.reds ?? "-").join(", ")}`)).toEqual([
      "Q8:join, join, join, join",
      "Q9:runs, runs, runs, runs",
      "Q10:tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S, tiling A, tiling B, tiling C, tiling D, tiling S",
      "Q11:-, -, -, -, -, -, -, -",
    ]);
    expect(SITES).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
    ENDED.push(`rule 16:${expect.getState().assertionCalls}`);
  });

  it("the mutant battery: every subject passes every check, a planted registration is judged, every base is a control accepted unchanged, each mutant is refused by exactly its declared checks, and every check refuses one mutant alone", { timeout: LIVE_BUDGET_MS }, () => {
    for (const subject of SUBJECTS) expect(refusedBy(subject.validate), `${subject.id} passes every check`).toEqual([]);
    const planted = subjectsOf([...SITES, { path: PLANT.path, validate: mutant("M-DEFAULT-FEEDBACK") }]);
    expect(
      planted.map(subject => `${subject.id}: ${refusedBy(subject.validate).join(", ") || "passes"}`),
      "a planted registration of a defaulting validator is judged beside the reference and refused",
    ).toEqual(["reference: passes", ...SITES.map(site => `${site.path}: passes`), `${PLANT.path}: K-NEGATIVE, K-FORMS`]);
    const accepted = CHECK_IDS.flatMap(check => CONTROLS[check].filter(control => control.family === "accepted").map(control => control.base));
    expect(accepted, "every base is a control accepted unchanged, once: the positive (K-POSITIVE), the falsifiers (K-PARITY), the one-pair record and the rejected records (K-VERDICT), the abstain (K-STATUS)").toEqual([
      "positive",
      ...Object.keys(FALSIFIERS),
      "single",
      ...CODES,
      "decline",
    ]);
    expect([...accepted].sort(), "and those are the bases").toEqual(BASES.map(base => base.name).sort());
    const refused = Object.fromEntries(MUTANTS.map(entry => [entry.id, refusedBy(entry.validate)]));
    expect(refused, "each mutant is refused by exactly its declared checks (the roster's)").toEqual(ROSTER.mutants);
    const alone = CHECK_IDS.filter(check => !Object.values(refused).some(checks => isDeepStrictEqual(checks, [check])));
    expect(alone, "every check refuses one mutant alone").toEqual([]);
    ENDED.push(`battery:${expect.getState().assertionCalls}`);
  });

  it("the outside anchors: every outside reading holds on the census's anchor model and every BOUND edit of that model reds the reading it names; the bead's own row binds the labels of rows A-D (its acceptance clauses) and S (its title's statement), those rows' pin quotes' text, each item's text and the join of its fields' phrases, each field name to a contiguous run of its phrase's words, the actions and their three distinct fields, ADMITTED, the codes, the statuses, the record noun and the vocabulary's composition; wb-4ap.16's note carries the six codes; the notes cite the producer pin and lines; git's src listing names no vocabulary word unregistered; how an item is cut into fields, which run of its phrase a field name takes, the pin partition, row Q, the decision's fields and the roster's producer copy are not anchored", { timeout: 60_000 }, () => {
    const row = beadRow(textOf(EXPORT), BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    const prefix = `[${REQUIREMENT}] ${MERGE_NOTE}`;
    expect(title.startsWith(prefix) && title.endsWith("."), "the title is the requirement id, the merge note and a statement ending in a period").toBe(true);
    const statement = title.slice(prefix.length, -1);
    const rowS = ROWS.find(entry => entry.label === statement);
    expect(rowS?.id, "the title's statement is row S's label").toBe("S");
    const clauses = acceptanceClauses(notes);
    const clauseRows = clauses.map(clause => ROWS.find(entry => entry.label === clause));
    expect(clauseRows.map(entry => entry?.id ?? "-"), "the acceptance holds four clauses, each exactly one row's label: rows A, B, C and D in order").toEqual(["A", "B", "C", "D"]);
    for (const entry of [...clauseRows, rowS]) {
      expect(tiles(entry?.label ?? "-", (entry?.pins ?? []).map(pin => QUOTES[pin] ?? "")), `row ${entry?.id ?? "-"}'s pin quotes tile its label`).toBe(true);
    }
    const list = /shall carry as required: (.+); any missing field is a typed refusal, never a default$/.exec(statement)?.[1] ?? "";
    const pieces = list.split(", ");
    const items = [...pieces.slice(0, -1), ...(pieces.at(-1) ?? "").split(" and ")];
    expect(items, "the title's items are ITEMS' items, in order").toEqual(ITEMS.map(entry => entry.item));
    expect(
      ITEMS.filter(entry => !joined(entry.item, entry.fields.map(field => field.phrase))).map(entry => entry.item),
      "each title item is joined by its fields' phrases",
    ).toEqual([]);
    const wordsOf = (phrase: string): string[] => phrase.toLowerCase().split(/[\s/-]+/).filter(word => word !== "");
    const contiguous = (parts: readonly string[], words: readonly string[]): boolean => parts.length > 0 && words.some((_, start) => parts.every((part, offset) => words[start + offset] === part));
    const unnamed = ITEMS.flatMap(entry => entry.fields).filter(field => !contiguous(partsOf(field.name), wordsOf(field.phrase)));
    expect(unnamed.map(field => field.name), "each field name's camel-case parts are a contiguous run of its phrase's words").toEqual([]);
    const [clauseA, clauseB, clauseC, clauseD] = clauses;
    expect(clauseA?.startsWith("a schema fixture"), "clause A names the schema fixture").toBe(true);
    expect(/proving (\w+), (\w+) and (\w+) are three distinct fields \((\w+) != (\w+) survives\)$/.exec(clauseB ?? "")?.slice(1), "ACTIONS are clause B's words, and its survivor names admitted and executed").toEqual([...ACTIONS, ...ACTIONS.slice(1)]);
    const verdicts = /^the resolver verdict is either (\w+) or one of MW's stable rejection codes \((.+) per the (wb-[a-z0-9.]+) note\)$/.exec(clauseC ?? "");
    expect(verdicts?.[1], "ADMITTED is clause C's word").toBe(ADMITTED);
    expect(verdicts?.[2]?.split(" / "), "the six codes are clause C's list").toEqual([...CODES]);
    expect(verdicts?.[3], "clause C cites the codes bead").toBe(CODES_BEAD);
    const statuses = /^the (\w+) status is its own value, never (\w+)$/.exec(clauseD ?? "");
    expect([statuses?.[2], statuses?.[1]], "STATUSES are clause D's two words").toEqual([...STATUSES]);
    const noun = /^Each R7 (\w+) record shall carry/.exec(statement)?.[1];
    expect(noun, "the record noun is the title's").toBe(RECORD_NOUN);
    expect(VOCABULARY.map(word => word.spelling), "the vocabulary is composed as the title's record noun, then each field name of two or more parts").toEqual([noun, ...FIELDS.filter(name => partsOf(name).length >= 2)]);
    expect(noteCodes(), "the six codes are wb-4ap.16's note list, read at the note's pin").toEqual({ codes: [...CODES], pin: CODES_NOTE_PIN });
    expect(unionCodes(), "and the roster's copy of the producer's RejectionCode union holds them (no anchor)").toEqual([...CODES]);
    const producer = ROSTER.producer;
    expect(producer.repo, "the producer is MechanicalWorkflows").toBe("MechanicalWorkflows");
    expect(producer.sha, "the producer sha is the filing pin").toBe(PRODUCER_PIN);
    expect(notes.includes(`@${PRODUCER_PIN.slice(0, 12)}`), "the notes cite the pin").toBe(true);
    const cite = (id: string): string => {
      const line = producerLine(id);
      return `${line?.path.split("/").pop() ?? "-"}:${line?.line ?? "-"}`;
    };
    expect(["P1", "P2", "P3", "P4"].map(cite), "the producer lines are the notes' citations").toEqual(["README.md:15", "graph-policy-coordination-2026-10-18.md:13", "graph-policy-coordination-2026-10-18.md:16", "README.md:23"]);
    for (const id of ["P1", "P2", "P4"]) expect(notes.includes(cite(id)), `the notes cite ${cite(id)}`).toBe(true);
    expect(notes.includes(`and :${producerLine("P3")?.line ?? "-"} (`), "the notes cite the overview's second line").toBe(true);
    const carries: Readonly<Record<string, readonly string[]>> = {
      P1: ["feature projection", "actor/selector", "legal support at sample time", "proposed vs admitted vs executed action", "final feedback status"],
      P2: ["program/checkpoint/snapshot hash", "explicit abstain status"],
      P3: ["sampled decision and behavior log probability", "resolver verdict", "source-owned effect receipt", "verifier outcome"],
      P4: ["evidence sidecar parity"],
    };
    const absent = Object.entries(carries).flatMap(([id, phrases]) => phrases.filter(phrase => !(producerLine(id)?.text ?? "").includes(phrase)).map(phrase => `${id}: ${phrase}`));
    expect(absent, "the roster's own copy of the producer lines carries the listed phrases (no anchor: the producer is never re-read)").toEqual([]);
    expect(producerLine("P5")?.path, "the roster's union line is the resolver's path (no anchor)").toBe("packages/coordination/src/resolver.ts");
    const src = liveSrc();
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(srcFindings(src, SITES), "git's src listing names no vocabulary word unregistered").toEqual([]);
    expect(Object.keys(anchorReadings(LIVE)), "the readings, in READINGS order").toEqual([...READINGS]);
    expect(failing(LIVE), "every outside reading holds on the census's anchor model").toEqual([]);
    for (const [name, bound] of Object.entries(BOUND)) expect(failing(bound.edit(LIVE)), `${name} reds ${bound.reds}`).toContain(bound.reds);
    expect(
      READINGS.filter(reading => !Object.values(BOUND).some(bound => bound.reds === reading)),
      "every reading is red under some BOUND edit",
    ).toEqual([]);
    ENDED.push(`outside anchors:${expect.getState().assertionCalls}`);
  });

  it("roster: the judged rows, the quotes, the residual members, the witness and mutant keys, the assertion counts and the registered tests equal test/fixtures/mw-gp-sidecar-record-roster.json, keys in order; every pin reached its witness compare and each compare held, and each other judged case reached its last statement on the assertion count the roster pins", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(Object.keys(QUOTES), "the quotes' keys in the roster's order").toEqual(Object.keys(ROSTER.quotes));
    expect(residualMembers(), "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(residualMembers()), "the residual families in the roster's order").toEqual(Object.keys(ROSTER.residuals));
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(Object.keys(ROSTER.mutants), "one roster entry per mutant, in order").toEqual(MUTANTS.map(entry => entry.id));
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
    expect(ASSERTED, "every pin's case made the assertion count the roster pins (its witness compare included), in row order").toEqual([...ROSTER.asserted]);
    expect(ENDED, "each other judged case - rule 16, the mutant battery, the outside anchors - reached its last statement having made the assertion count the roster pins, in run order").toEqual([...ROSTER.ended]);
  });
});
