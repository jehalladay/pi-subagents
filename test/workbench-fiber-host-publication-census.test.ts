/**
 * wb-pyel.1 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1, program-triage-2026-10-18), the until-then leg: the Fiber host-publication
 * census. Statement (bead title, verbatim): "If Pi-subagents ever hosts FiberOpticsSDK (or any Fiber value-publication surface
 * beyond today's --no-commit rf previews), host-originated publication shall be explicitly flushed by the Pi host and shall
 * never occur as an automatic effect or inference of a query change, preserving the render/prepare/commit/dispatch lifecycle.
 * Artifact: a registered Pi Fiber-hosting or Fiber-publishing capability (none exists)."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C are its three clauses, in order): "before any Fiber-hosting
 * capability registers, a falsifier proves publication happens only through an explicit host flush call, and a query change
 * alone produces zero publication or inference side effects."
 *
 * SOURCE (read-only git show at FiberOpticsSDK dcc5b57c4aed, the bead's citation, by the cutting seat): docs/programs/
 * evidence-directed-computation-2026-10-18.md:17 "7. Preserve render/prepare/commit/dispatch. Host-originated publication
 * remains explicitly flushed; no automatic effect or inference when query changes." and :3 "**Status:** DESIGN, not shipped."
 * (both lines unchanged at origin/master 2099f193cccf). The producer's host contract at the pin, src/fiber_optics/runtime.py:
 * FiberRuntime (:668) queues a value publication with queue_value_publication (:1233: "it only queues ... The host owns the
 * drain ... Fiber never drains on its own") and delivers it when the host awaits flush_value_publications (:1355); a rerender is
 * requested with request_rerender (:838) and delivered by flush_requested_renders (:922); FiberGraph and FiberScheduler are the
 * other two hosted classes the package root exports (src/fiber_optics/__init__.py:67, :119). Its distributions: the wheel
 * FiberOpticsSDK (pyproject.toml [project].name; packages src/FiberOpticsSDK, src/fiber_optics, src/fiber_optics_research)
 * and the crate fiber-optics-replay-observer (rust/replay_observer/Cargo.toml). The roster vendors line 17 with its SHA256.
 *
 * MEASURED AT BASE (c2695d7, landing 686; seat ws-02, run g10-work-s146, 2026-10-30; cut #1 measured 864dff9, cut #2 04123dc,
 * cut #3 57cb1c0; cut #5 re-measured 38ce23b, landing 891, seat ws-03, run g10-work-s201, 2026-11-03, cut #6 08a61f1,
 * landing 912, seat ws-06, run g10-work-s204, 2026-11-04, cut #7 a14c87f, landing 925, seat ws-05, run g10-work-s208,
 * 2026-11-04, cut #8 3041aac, landing 939, seat ws-06, run g10-work-s209, 2026-11-04, and cut #9 883ee7c, landing 948, seat
 * ws-05, run g10-work-s212, 2026-11-04, each with the same results, the manifests read being every tracked path outside test/
 * that the helper's manifestForm selects): no tracked file below
 * src, no tracked dependency manifest, package.json or package-lock.json spells the producer's stem, a hosted class or a
 * publication entry (git grep, 0 rows each), and every tracked file below src (117) is a script module. Pi's one Fiber surface
 * is rf: the two reactivefiber.render.preview registrations (effectClass read, supportedModes [invoke], the carrier contract
 * ending --no-commit) and their one launch, nativeReactiveFiberRender's spawn of renderArgv, which always ends --no-commit
 * --no-input --json; the native preview admits a noncommitted envelope only (isPreviewEnvelope). CapabilityRegistry's entries
 * are request/response (invoke, inspect) and a provider is {descriptor, invoke, inspect?}: no subscription exists. So the
 * trigger has not fired: Pi hosts no Fiber runtime, holds no host publication or flush call, and has no query-change hook.
 *
 * CUT #2 (respin 1) answered refusal #1 (BIND 2026-10-28T18:53:04Z, unmet U1-U4): it read every tracked file below src (a
 * non-script file as raw lines) and the tracked dependency manifests (U1), anchored every pin of rows A, B and C and every
 * residual family of row Q to the delivery record in the tracker export (U2), kept rf's own layout ".reactive-fiber/graphs"
 * quiet under the segmented fold (U3) and, for the F4 rider, read an instance's own keys and the static members in C1; U4 was
 * the delivery note's clean-claim line.
 *
 * CUT #3 (respin 2, ruling R-B87's enumerate form) answered refusal #2; refusal #3 (BIND 2026-10-30T02:24:40Z) measured A1's pip
 * claim and A3's registration claim wider than their readers. CUT #4 (respin 3, the FINAL cut, ruling R-B105's fail-closed core)
 * answered refusal #3's unmet U1-U4 with this file's own readers of that cut: A1 restated to the three name forms its isManifest
 * selected and failing closed outside them (a candidate path listed by its presence), A3's static reading unkeyed from callee
 * names (every judged text spelling a REGISTRATION_WORDS word and every REGISTER_NAME declaration or import read), the dynamic
 * register alias read and a quiet reading given to every residual member. Refusal #4 (BIND 2026-10-30T19:08:27Z, gate-prep-7,
 * run g10-gate-s152) found A3's Fiber-family criteria and its carrier compare without a falsifier here (U1) and the delivery
 * note's hollowing line wider than the mutants it ran (U2); orchestrator ruling R-B135 inverted this bead behind wb-pyel.7, the
 * rule-19 structural exit R-B105 filed, and folded those members into it.
 *
 * CUT #5 (the post-inversion restatement R-B135 orders; seat ws-03, run g10-work-s201): wb-pyel.7 landed at landing 889 (merge
 * b92b2b35e22f) with the A1 and A3 readers at full surface in test/helpers/fiber-host-publication-readers.ts (landed first by
 * its carrier wb-pyel.10 at landing 829) and their censuses test/workbench-fiber-host-publication-readers-census.test.ts
 * (wb-pyel.7; refusal #4's U1 members are its row F, P-A3-FAM-ID, P-A3-PERM, P-A3-CONTRACT, P-A3-FAM-RF and P-A3-CARRIER, and
 * the carrier forms G17-G19 sit in its row U2) and test/workbench-fiber-host-publication-positions-census.test.ts (wb-pyel.10).
 * Cut #5 composed that helper: its readers and vocabulary replaced this file's local copies, so no A1 or A3 reader is defined
 * here, and A1 and A3 were restated over them; its rows, pins, tests, plants and controls were cut #4's. The helper's
 * manifestForm selects every path cut #4's fail-closed net listed (a path segment holding a pip family word, a manifest name
 * in another letter case), so that net, its candidate lists and its regular expressions went and those paths are read as
 * raw lines; the A3 readings state each Fiber-family member's and each control's criteria and the helper's reason words, and
 * the census's own REQUIRED_DESCRIPTORS check stands beside them. Refusal #4's U1 criteria members red this census through
 * those criteria; its carrier members, its F4 member H-A3-WORD-DEDUPE and its F3 launch forms are NOT CLAIMED here (the NOT
 * CLAIMED entries below name each, and the landed census that reds it where one does).
 *
 * CUT #6 (the further restatement orchestrator ruling R-B489 orders after refusal #5; seat ws-06, run g10-work-s204): refusal
 * #5 (BIND 2026-11-04T01:35:01Z, gate-prep-12, run g10-gate-s203) found fourteen one-edit members of this file's own code that
 * kept it green inside cut #5's words: A4's launcher spellings (U1) and property-access shapes (U2), A2's every-file read (U3)
 * and three live checks without a negative control (U4: missingIds, the root npm selection, .npmignore's trim). Claims equal
 * pins here: A4 plants an identifier and a property-access launch of every LAUNCHERS entry and four further property-access
 * shapes of spawn, and claims exactly the call texts its controls plant; A2 reads a reach copy of src through readSrc and pins
 * the files no scan reached; the three checks gain negative controls; the composed-readers entry names the lock path neither
 * landed readers census claims (refusal #5's F3). Controls and their readings are added; no row, pin or test is.
 *
 * CUT #7 (the further restatement orchestrator ruling R-B516 orders after refusal #6; seat ws-05, run g10-work-s208): refusal
 * #6 (BIND 2026-11-04T08:15:10Z, gate-prep-10, run g10-gate-s206) found six one-edit members of this file's own code that kept
 * it green inside cut #6's words: the hosting, entry and launch scans cut to a file's first lines, which cut #6's leading
 * probe alone could not see (U1), missingIds compared by prefix (U2), the walk held to the listing by prefix (U3) and the
 * provider anchors read by reversed containment (U4); its F4 rider read a skip keyed on the live walk's size as NOT CLAIMED.
 * Claims equal pins here: A2's REACH probes each copied file at its first and at its last line (a head and a tail probe whose
 * launches name different launchers), reads a copy holding exactly the listed files (the live walk's size, F4) beside the copy
 * with REACH_CONTROLS, reads REACH_DENSE (a module whose every line is a probe, beside a negative control whose withheld lines
 * are not) and gives each probe position a negative control; missingIds gains id-substitution legs (NEAR_MISS_IDS);
 * WALK_CONTROL gains near-miss paths both ways and its
 * provider the ANCHOR_NEAR_MISSES texts; A2, A3, A4 and B2 are restated to those pins. Controls and their readings are added;
 * no row, pin or test is.
 *
 * CUT #8 (the further restatement orchestrator ruling R-B537 orders after refusal #7; seat ws-06, run g10-work-s209): refusal
 * #7 (BIND 2026-11-04T15:15:05Z, gate-prep-3, run g10-gate-s210) found three one-edit members of this file's own code that kept
 * it green inside cut #7's words: readSrc's hosting and entry scans reading a subset of their needle sets, because no tree read
 * through readSrc held FiberScheduler, request_rerender or flush_requested_renders (U1), and walkFiles dropping dot-named
 * entries, because no walk-only control and no plant readSrc walks was dot-named (U2). Claims equal pins here: REACH_PROBE's
 * head and tail lines each hold every HOSTING_NEEDLES and ENTRY_NEEDLES needle, and the reach and dense readings name, per scan
 * and per needle, the copied files (or the lines) that needle's hit is missing from, beside partial controls that withhold
 * needle words (REACH_NEGATIVE's, one word of each set; REACH_DENSE's, one word per line); REACH_CONTROLS gain a dot-named
 * module and a module below a dot-named directory; WALK_CONTROL gains a dot-named file and a file below a dot-named directory
 * on each side of the compare; THE VOCABULARY, A2, B2 and walkFiles' own words are restated to those pins. Controls and their
 * readings are added; no row, pin or test is.
 *
 * CUT #9 (the further restatement orchestrator ruling R-B559 orders after refusal #8; seat ws-05, run g10-work-s212): refusal
 * #8 (BIND 2026-11-04T22:07:50Z, gate-prep-19, run g10-gate-s210) found four one-edit members of this file's own code that
 * kept it green inside cut #8's words: readSrc's hosting and entry scans reading only a judged text's first slash-separated
 * segment, or in a script module only its first space-separated one, because no tree read through readSrc held a needle past a
 * path separator or past the first space-separated segment of a script module's judged text (U1); its F7 rider read three of
 * A2's self-descriptions (liveWalk, the second reach copy and the raw probe line) as unpinned. Claims equal pins here:
 * SEGMENT_TREE, planted in the pipeline tree's src and read through readSrc with it, holds per separator (a slash, a
 * backslash, a space and a tab) a script module's string literal and a raw file's line whose middle segments are every needle
 * word, and the pipeline's hosting (A2) and entry (B2) readings pin each needle's hit on every such line; THE VOCABULARY, A2
 * (SEGMENTS among it) and B2 are restated to those pins, and the three self-descriptions are bounded to what their pins hold.
 * Controls and their readings are added; no row, pin or test is.
 *
 * THE VOCABULARY (the helper's fold, segmentFolds, needlesIn and needle sets; their rules are the helper's, stated in its header
 * and claimed by the readers censuses). The needles are the folds of three word lists: STEM, the title's distribution word (the
 * one word after "hosts") with its SDK suffix dropped, held to every DISTRIBUTIONS name; HOSTED_CLASSES (FiberRuntime,
 * FiberGraph, FiberScheduler); PUBLICATION_ENTRIES (the four queue/request and flush entries). The helper's scan sets are
 * HOSTING_NEEDLES (STEM and the three HOSTED_CLASSES folds) and ENTRY_NEEDLES (the four PUBLICATION_ENTRIES folds). This
 * census's own readings compare a text's segmented fold with them as follows, each needle of each set pinned where it is read:
 * readSrc's hosting scan with HOSTING_NEEDLES and its entry scan with ENTRY_NEEDLES, every needle of both sets on every REACH
 * probe line, there a string literal of its own in a script module and a space-separated word on a raw line (A2's REACH names,
 * per scan and per needle, the files a needle's hit is missing from), and on every SEGMENT_TREE line, there a middle segment
 * (neither the first nor the last) of the line's needle-holding judged text, cut by a slash, a backslash, a space or a tab
 * (the pipeline readings of A2 and B2 pin each such hit; A2's SEGMENTS bounds what they claim); A2's SOURCE_CONTROLS reading
 * with HOSTING_NEEDLES and B2's ENTRY_CONTROLS reading with ENTRY_NEEDLES, the controls' pinned hits naming every needle of
 * the set. A1's manifest readers (STEM alone) and A3's registry and descriptor readers (both sets) are the helper's,
 * claimed as the readers censuses claim them (the composed-readers NOT CLAIMED entry below). The needle set a quiet row
 * compares with (Q1, Q2, Q3's hits and outside counts, Q7) is NOT CLAIMED by this census beyond the readings the roster pins.
 * This census's plants hold the forms it reads: fiber_optics, fiber-optics, FiberOptics, "@fiber-optics/sdk" and
 * FiberOpticsSDK each hold the stem, rf's workspace layout ".reactive-fiber/graphs" holds no FiberGraph, and a needle's words
 * split by a space or a slash ("Fiber Optics", "fiber graph", "fiber/optics") hold none (Q7).
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns a measured witness held to the roster):
 *  A, the trigger ("before any Fiber-hosting capability registers"), absent today, and the title's artifact.
 *    A1 THE MANIFESTS, read with the helper's manifestHits, lockReading and readManifests. On the live tree: package.json's
 *    parsed keys and strings and its raw lines (manifestHits), package-lock.json's installed package paths and name fields
 *    (lockReading), and the raw lines readManifests reads over git's tracked listing (each listed path outside test/ that
 *    manifestForm selects, but the root npm pair, which have their own readers) state no STEM hit; the selection holds the root
 *    npm pair (holdsRootNpm; its negative controls, readManifests over the tracked listing without package.json and without
 *    package-lock.json, each read false); package.json's texts and the lock's packages clear FLOORS (clearsFloor, a count at
 *    least its floor; its controls read every FLOORS value itself as clearing and one below it as not); the root .npmignore
 *    names test/ and not src/ (the witness reads both entries through npmIgnores and ignoresEntry: a line equal to the entry
 *    once trimmed; its controls, NPMIGNORE_CONTROLS planted as .npmignore files in scratch roots and read the same way, read a
 *    line wrapped in spaces and a line led by a tab and ended by a carriage return as naming the entry, and a longer path and
 *    a comment as not; other whitespace around a line and another ignore spelling of
 *    a directory (/src/, src, src/**) are NOT CLAIMED by this census), so a manifest below test/ declares nothing of Pi's. The
 *    witness pins those hits, never the live selection, so an unrelated manifest a later cut adds reds nothing. The controls,
 *    each reading pinned in the roster: MANIFEST_TREE read
 *    through readManifests (each planted path's selecting form, the paths read as raw lines and every STEM hit, as the roster
 *    pins them; the tree's comment lists its plants); MANIFEST_CONTROLS' hit counts (one planted dependency per dependency list
 *    and a nested value read, two near misses quiet); SHADOWED_MANIFEST read parsed (no hit) and with its raw text (one hit);
 *    and LOCK_CONTROLS' hit counts (a lock path and a lock name read, a quiet path).
 *    A2 THE SRC FILES, read by readSrc: git's listing of src is held both ways to a filesystem walk of src (walkFiles, which
 *    records and never follows a symlink) by an exact path compare each way, clears FLOORS (modules, judged texts, through
 *    clearsFloor and A1's floor controls) and holds the provider (readsProvider), whose SOURCE_ANCHORS texts are read (an anchor
 *    is read when one of the provider's judged texts equals it). WALK_CONTROL, read the same way, is their negative control: its
 *    walk-only files (one beside the listing, one extending a listed path, one a listed path's prefix, one holding a listed
 *    file's base name in another directory, a dot-named file and a file below a dot-named directory) and its listing-only files
 *    (one beside the walk, one extending a walked path, one a walked path's prefix, one holding a walked file's base name in
 *    another directory, a dot-named file and a file below the walked dot-named directory) are named; its provider path, holding
 *    every ANCHOR_NEAR_MISSES text (each anchor's first and last part, the anchor extended at its end and at its front, in upper
 *    case and wrapped in spaces) as a judged text of its own, reads every anchor unread; and the pipeline tree, which holds no
 *    provider, reads as not holding it. The walk is claimed for the entries those pins hold: the tracked or planted files of each
 *    tree this census reads through readSrc (the live tree; the two reach copies, REACH_CONTROLS' dot-named module and module
 *    below a dot-named directory among them; and the negative, dense, pipeline and walk control trees, WALK_CONTROL's walk-only
 *    files among them). A walk that leaves out an entry none of those trees holds by another property of its name, place or
 *    content (another extension or name form, a deeper directory, an empty file), a walk and a listing that differ by another
 *    relation of two paths (letter case, for one) and a provider text related to an anchor another way are NOT CLAIMED by this
 *    census.
 *    Each file is read as the helper's isScript decides: a script module through its TypeScript AST (sourceTexts, the
 *    helper's judgedText of each node; a comment is never read, Q2), any other file as raw lines; how far into each file the
 *    three scans (hosting here, entries in B2, launches in A4) read, and with which needles, is claimed only as REACH states it,
 *    and which segments of a judged text the hosting and entry scans read only as SEGMENTS states it.
 *    REACH: two scratch copies of src, one holding exactly the files git lists below src (the live walk's own size and order)
 *    and one with REACH_CONTROLS beside them (a module of each SCRIPT_KINDS extension, a .txt file, a dot-named module and a
 *    module below a dot-named directory), plant each file's own text between REACH_PROBE's head line (the file's first) and its
 *    tail line (its last) for its kind; each line holds every needle of HOSTING_NEEDLES and ENTRY_NEEDLES, spelled as the
 *    producer spells it (fiber_optics, FiberRuntime, FiberGraph, FiberScheduler, queue_value_publication,
 *    flush_value_publications, request_rerender and flush_requested_renders: in a script module one string literal each, in any
 *    other file one word each), and an rf launch (the head launching with spawnSync, the tail with execFileSync, launchers no
 *    file below src launches rf with, A4's roster). Each copy is read through readSrc, and the hosting and entry scans give
 *    every copied file the hit of each needle of their set on its first line (the head probe's) and on its last (the tail
 *    probe's), and the launch scan the head probe's launch and the tail probe's (needleHit and probeLaunch; the roster pins, per
 *    copy and position, the empty list of files missing each needle's hit, per scan and needle, and the empty list of files
 *    missing the launch, the copy's walk held to its listing, and liveWalk: an exact compare of the copy's walk with the live
 *    walk's files in order, read true for the first copy and false for the second). Three of those descriptions say more of
 *    how the copies are built than their pins read, and are NOT CLAIMED by this census past their pins (refusal #8's F7):
 *    liveWalk reads false only for walks that also differ from the live walk in length (the second copy's and
 *    REACH_NEGATIVE's), so a compare of the walks' lengths alone reads the same; the second copy's readings read the same were
 *    it to hold REACH_CONTROLS alone, so the listed files beside them are claimed only through the first copy's readings; and
 *    a non-script file given the script statement in the raw line's place reads the same hits and launch, so which of the two
 *    lines a non-script file is given is not claimed. REACH_NEGATIVE (modules probed at both lines, at the tail only, at the
 *    head only and at neither, a raw file at either line only, and a module and a raw file probed at neither whose one line is
 *    the head probe's with FiberScheduler and request_rerender replaced by a neutral word), read the same way, names in each
 *    position's lists, for every needle of each set and for the launch, exactly the files that position withholds it from.
 *    REACH_DENSE (a module
 *    of REACH_DENSE.lines lines, every one the head probe; its negative control, a module whose withheld lines hold a filler in
 *    the probe's place; and its partial control, a module whose line k is the head probe with its k-th needle word, in set
 *    order, replaced by the neutral word), read the same way in one scratch src, gives the hosting and entry scans each
 *    needle's hit on every probe line and the launch scan a launch per probe line: the reading names, per scan and per needle,
 *    no line of the dense module, exactly the negative control's withheld lines (and counts them for the launch scan) and
 *    exactly the partial control's line withholding that needle's word, each module's planted line count beside. So a scan that
 *    reads a subset of its needle set (in every file, or keyed on a file's path, directory or kind, its place in the walk or
 *    the walk's size), that skips a listed file (by its path or directory, by its place in the walk, by the walk's size, or by
 *    its kind: each SCRIPT_KINDS extension and .txt in the copies, .py and .json in the scratch src tree below, a dot-named
 *    file and a file below a dot-named directory in the second copy), that reads a file only up to some line or only from some
 *    line on (keyed on a line number alone, or on the file's path, directory or kind, its place in the walk or the walk's size
 *    besides), or that drops a line, or reads a subset of its needles on a line, by the line's number alone, the same in every
 *    file of every walk, up to REACH_DENSE.lines, reds A2. NOT CLAIMED by this census: a skip, a cut or a needle subset keyed on
 *    a property no copied file holds (another kind, .md for one; a directory deeper than the copies' deepest), on anything a
 *    copied file does not share with its listed original (the root a reading is handed, the probes and the lines they add), on
 *    a file's own text or on a judged text's own spelling (a needle spelled otherwise than the probes spell it); a drop of a
 *    judged text by its index in the file or its place on its line, rather than of a whole line; and a drop of a line strictly
 *    between a listed file's first and its last line keyed on that file (its path, kind, size or text) or on the walk it is read
 *    in (its size, its root).
 *    SEGMENTS: SEGMENT_TREE, planted in the pipeline tree's src beside PIPELINE_TREE and read through readSrc with it, holds a
 *    script module (src/hosts/value-segments.ts, one exported string literal per line) and a raw file
 *    (src/hosts/value-segments.txt, one line each) whose lines join, per SEGMENT_SEPARATORS separator in order (a slash, a
 *    backslash, a space and a tab), every REACH_DENSE.partial.words word between the leading word lead and the ending word
 *    end, which hold no needle; so on each line every needle's hit comes only from a segment that is neither the first nor the
 *    last of its judged text (the string literal; the raw line). The pipeline's hosting reading (A2) and entry reading (B2)
 *    give every line of both files the hit of each needle of the scan's set, and the roster pins each hit, per line and per
 *    needle. So a hosting or entry scan that leaves unread any middle segment of those judged texts (as one that keeps only
 *    the part before a text's first slash, backslash, space or tab, or only the part after its last, does), in every file, in
 *    every script module or in every other file, reds A2 for a hosting scan and B2 for an entry scan. NOT CLAIMED by this
 *    census: such a reading keyed on anything else (a file's path, directory or text, one extension of its kind, .tsx alone
 *    for one, a line's number, a judged text's own spelling or length, the walk or its size); a judged text cut by another
 *    character the helper's fold cuts at (another whitespace character, a no-break space or a line break inside a template
 *    literal, for two); a needle past a separator in a judged text of another kind than a string literal or a raw line (a
 *    template part, a regular expression or JSX text); and a needle a judged text holds in more than one of its segments. The
 *    live reading's hosting hits (a HOSTING_NEEDLES fold: STEM or a HOSTED_CLASSES fold) are none (hits are pinned, never the
 *    list of files, so an unrelated file a later cut adds below src reds nothing); the walk and git's listing both list a
 *    non-script file (the roster); the planted modules read in the positions they hold (SOURCE_CONTROLS:
 *    a named import, a dynamic import, a require call, a spawn argument, a constructed class, a type, a template, a regular
 *    expression, a private name, JSX text, a class in a path string, template head, middle, tail and no-substitution parts,
 *    an export-from) and their near misses (rf's layout among them) stay quiet; a scratch src tree (a launcher, a Python
 *    sidecar, a JSON host manifest, rf's layout as JSON, SEGMENT_TREE's two files, and a symlink to a directory outside it
 *    holding a needle, which the walk records and never follows) is read through the same pipeline. A needle at a reading
 *    position no planted module holds (a type-only import or an arrow function's body, for two) is NOT CLAIMED by this census
 *    (the positions census claims the helper's judgedText to its own bounds).
 *    A3 THE REGISTERED CAPABILITIES (the title's artifact, "(none exists)"), read with the helper's registryReading,
 *    descriptorReading and registrationSites. The native registration and the four injected-client registrations each hold
 *    every REQUIRED_DESCRIPTORS id (the census's own check, missingIds, an exact id compare; its negative controls: four
 *    injected legs each withholding one id's registration, and sixteen legs each registering one id's own provider under a
 *    NEAR_MISS_IDS id in its place, through SubstitutingRegistry: the id extended by a segment at its end and at its front,
 *    and the id less its last and its first character; each leg read as missing exactly that id. An id related to a required
 *    id another way is NOT CLAIMED by this census). registryReading of each leg states no needle hit
 *    of any set and
 *    one Fiber-family member, the read preview, as the roster pins it: criteria id, permission, contract and rf-contract,
 *    effectClass read, supportedModes [invoke], carrier true, no publishing reason and the leg's own description, so a leg read
 *    from the other registration reds. descriptorReading of each DESCRIPTOR_CONTROLS control states the criteria, publishing
 *    reasons and needles the roster pins: a hosted runtime, a flush, a committing render, an observe mode, an rf contract
 *    naming no fiber and lacking the flag, a publication entry in a description and a hosted class nested in an input schema
 *    read as they must, the preview's own shape read as the family's read member, and the neutral ones (rf's layout in a
 *    description among them) quiet. A3's STATIC READING: registrationSites over git's src listing states the pinned list,
 *    sorted with duplicates, so a new, moved or removed text it reads reds A3, and over REGISTRATION_TREE the pinned list: each
 *    planted register call spelling (direct, optional, .call, .apply, .bind, an element access by a string or template key, a
 *    Reflect.apply argument, a parenthesized callee, a destructured binding), each judged-text position, each
 *    DECLARATION_KINDS kind, both specifier property names, each name spelling (a string literal, a private name, a string or
 *    template literal computed name) and a register_value and a register2 name, the native bridge and a non-script file read,
 *    and its near misses (registered, RegisterHost, unregister, a pi.registerTool call, a registering string, and $register,
 *    register_x, register2 and registerX in a string) unread. Not read (Q1, Q3 and Q7 pin each quiet): a member name composed
 *    at run time, a write to the registry's private provider map, a call of a register* function by reference (a further call
 *    of a name its module declares or imports, a namespace member), whose declaration is read where it is declared, and a
 *    registration performed by code outside src (a namespace member or an imported function called with the registry, an
 *    alias bound outside src).
 *    A4 THE LAUNCH (the title's "today's --no-commit rf previews"): src's rf launch roster, as rfLaunches reads it over the A2
 *    reading (each listed file reaching the launch scan as A2's REACH states it), is the provider alone, and through a
 *    stand-in rf (the ONLY PATH entry, logging each argv) both input arms of the native preview
 *    spawn exactly one render each, every argv `context render ... --no-commit --no-input --json`. rfLaunches' rule (what the
 *    code does, claimed only as far as the next sentence bounds it): in a script module, a call whose callee is an identifier
 *    or a property access named by a LAUNCHERS entry and whose first argument is a string-like literal rf; in any other file
 *    below src, a line naming rf as a word (a conservative launch-candidate reading: such a file reds A4 for a look even when
 *    it only mentions rf). This census claims that reading for exactly the call texts LAUNCH_CONTROLS plants, each control's
 *    reading pinned in the roster, and for the live provider's own call (spawn("rf", argv, options), the live reading):
 *    every LAUNCHERS entry called by its name imported from node:child_process (spawnRf, execFileSyncRf, identifierLaunchers)
 *    and as a member of the namespace import cp (cp.<launcher>: memberSpawnRf, launcherNames, memberExecFileSync), each a
 *    plain call (no ?., no type arguments) whose first argument is the double-quoted literal rf and whose other arguments are
 *    the control's (none, or an argv array literal); four further shapes of cp.spawn, one call each (optionalCall
 *    cp.spawn?.("rf", ...), optionalChain cp?.spawn("rf", ...), typeArguments cp.spawn<void>("rf", ...), and
 *    propertyReceiver holder.cp.spawn("rf", ...) through const holder = { cp }); a Python and a shell launch read as raw
 *    lines; and the near misses quiet (another binary given rf as an argument, rf-like words on a raw line). Not read (Q7 pins
 *    it quiet): a launch whose first argument is not a literal rf (a command string, a constant holding rf). A2's REACH_PROBE
 *    lines (spawnSync("rf") and execFileSync("rf"), an identifier callee and a single argument) are read the same way, as
 *    A2's REACH pins them. A launch written in any other form no control plants is NOT CLAIMED by this census, whether or not
 *    rfLaunches reads it: among them an identifier
 *    callee with ?. or type arguments, those shapes or another receiver for a launcher other than spawn, a launcher imported
 *    from another module, a single-quoted or template rf, another argument list, an element-access callee
 *    (cp["spawn"]("rf", ...)) and an aliased launcher import (import { spawn as run }, then run("rf", ...)), refusal #4's F3
 *    members P-A4-ELEMENT and P-A4-ALIAS.
 *  B, "a falsifier proves publication happens only through an explicit host flush call", read where Pi could publish today.
 *    B1 THE COMMITTED FORMS: through the stand-in rf each commit marker a committing render states (transaction_id,
 *    result.render_id, result.ephemeral false, result.commit_seq, result.work.storage_write_count 1; the bead notes name three
 *    of them) is refused by the native preview on both arms as transport, never returned, while the noncommitted fixture is
 *    returned: zero publications reach Pi through its one Fiber surface.
 *    B2 NO PUBLICATION OR FLUSH ENTRY: no tracked file below src names a PUBLICATION_ENTRIES fold (an ENTRY_NEEDLES needle) in
 *    the A2 reading (each listed file reaching the entry scan, for each of the four needles, as A2's REACH states it, each
 *    judged text's segments as A2's SEGMENTS states it, and no further), so no host publication and no flush exist for the rule
 *    to judge; planted calls read (snake, camel, string key, destructured, and the scratch tree's Python sidecar; the four
 *    entries named among them), SEGMENT_TREE's lines read (each entry in a middle segment of every line, as A2's SEGMENTS
 *    states), near misses (flush, publish, render, requestRender) quiet.
 *  C, "a query change alone produces zero publication or inference side effects".
 *    C1 NO REACTIVE ENTRY: the registry's members (its prototype chain, an instance's own keys, so a class field, and the static
 *    members along its constructor chain) and the two preview providers' own keys ({descriptor, invoke}) hold no
 *    REACTIVE_WORDS fold, the registry still serves invoke and inspect, and registering either preview creates no async
 *    resource (an async_hooks init hook enabled for exactly the synchronous registration counts none: no timer, ref'd or
 *    unref'd, no immediate, tick, promise, watcher or child), so nothing exists that could run on a change; controls: a
 *    registry member named subscribe (declared, inherited through a subclass, a class field and a static member), a provider
 *    polling an interval and an action creating one resource of each named kind read, each counted by kind.
 *    C2 A QUERY CHANGE ALONE: after registration the rf workspace is edited (a definition rewritten, a component added, a
 *    source removed) and over SETTLE_MS the stand-in logs no launch and the injected client no call; one explicit invoke,
 *    its selector mutated before the call, then launches exactly one render carrying the mutated selector, --no-commit, whose
 *    value is noncommitted; a second change after it (the workspace edited again and the caller's selector object mutated)
 *    launches nothing more over SETTLE_MS; a planted reactive provider (an interval that launches on the same edit) is seen
 *    launching within the window, so the channel is live. An inference side effect is read as a render launched without a
 *    request (rf infers context; the preview performs no other inference) and a publication one as a commit marker or a
 *    store write; the workspace is the stand-in's scratch, never a real rf store.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants (the helper's vocabulary among them), the controls, the residual families and every
 * registered test title - is held to the out-of-file roster (test/fixtures/fiber-host-publication-roster.json).
 * OUTSIDE ANCHORS, read from the tracker export
 * (.beads/issues.jsonl): the bead's first Acceptance sentence (so later notes do not move it) makes rows A, B and C the
 * acceptance's three clauses in order; STEM is the title's distribution word; A3's artifact phrase and A4's flag are the
 * title's own words; B1's forms include the three markers the notes name; the notes' Authority quote is the vendored producer
 * line's sentence, and the roster's SHA256 is that line's. THE DELIVERY RECORD (cut #1's delivery note, append-only, each line
 * read at its first occurrence): rows A, B and C keep every pin their CLAIM line (`- <id> "<label>": ...`) names, and row Q
 * keeps every quiet-row pin with the residual family its FINDINGS and OTHER RESIDUALS lines pair it with (`Q<n> R-<FAMILY>`);
 * the roster holds that reading too, so a reader of the record that reads less reds. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins
 * that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together): a pin or a residual family a later cut adds beyond the delivery
 * record (none today), removed whole; a control removed from its list and the roster; a pin's case replaced by one that echoes
 * its roster witness; git's listing replaced by the walk it anchors.
 * NOT CLAIMED (the composed readers; scope sentences, no residual semantics, no follow-up bead): what the helper's readers read
 * in an input no plant, control or live reading of this census holds is NOT CLAIMED by this census; the landed readers
 * censuses (test/workbench-fiber-host-publication-readers-census.test.ts and
 * test/workbench-fiber-host-publication-positions-census.test.ts) claim and pin those readers only to the bounds their own
 * headers state, never past their own NOT CLAIMED entries. For one, both claim lockReading only at the lock paths they plant
 * (node_modules/fiber-optics and node_modules/alias, with their fillers and quiet paths), so a lock
 * package holding the stem in another segment of its path (node_modules/fiber-optics/node_modules/left-pad, which lockReading
 * reads here and refusal #5's F3 member GP12-A1-LOCK-LASTSEG, reading a path by its last segment only, does not) is claimed
 * by neither landed readers census and is NOT CLAIMED by this census. Measured at cut #5, at cut #6, at cut #7, at cut #8 and
 * again at cut #9:
 * - refusal #4's carrier members H-A3-CARRIER-WEAK (isCarrier reads every contract ending with a space and --no-commit as the
 *   carrier) and H-A3-CARRIER (every contract the carrier) keep this census 0 failed | 17 passed: it reads isCarrier on the
 *   two live legs only. A registered preview whose contract meets the same four criteria and ends with a space and
 *   --no-commit but is not REACTIVE_FIBER_CONTRACT_SOURCE (P-A3-CARRIER-SAME) reds A3 under the helper (carrier false) and
 *   keeps this census green under either member, so the compare's exactness beyond the live legs is NOT CLAIMED by this
 *   census; the readers census reds each member (its row F P-A3-CARRIER and its row U2 G17-G19 pin the compare). A contract
 *   that loses a criterion (P-A3-CARRIER, rf@0.0.0:context.render --no-commit) reds A3 here under the helper and under
 *   H-A3-CARRIER-WEAK alike, through its criteria.
 * - refusal #4's F4 member H-A3-WORD-DEDUPE (one entry per distinct REGISTRATION_WORDS word of a text) keeps this census
 *   green: no live or planted text here repeats a word, so one entry per repeated segment is NOT CLAIMED by this census; the
 *   readers census reds it (its S-WORDS plants a repeat).
 * - refusal #4's F3 members P-A4-ELEMENT and P-A4-ALIAS keep this census green (A4's paragraph names them NOT CLAIMED); the
 *   control P-A4-MEMBER reds A4.
 * - H-A1-MD-EMPTY (a selected .md path read as empty) and H-A1-FIRST-BLANK (a raw-read manifest read only to its first blank
 *   line) keep this census green: MANIFEST_TREE's markdown page holds no stem and no raw-read plant here puts the stem past a
 *   blank line, so a markdown page's lines and the lines after a raw-read manifest's first blank line are NOT CLAIMED by this
 *   census; the readers census reds the first, and neither landed readers census reds the second (the readers census's own
 *   claims exclude it since its R-B367 restatement).
 * - H-A3-RAW-HASH (a raw line of a non-script file led by # skipped by the static reading) and H-A3-KINDNAME-REVERSE (the
 *   parent kind named by TypeScript's reverse map, an alias, in place of the helper's first enum key) keep this census green:
 *   REGISTRATION_TREE's non-script file leads its words' line by {, and no live or planted text here sits under a kind the
 *   two namings spell differently, so a raw line led by anything else and an aliased parent kind's spelling are NOT CLAIMED
 *   by this census; neither landed readers census reds either (for the # lead, the readers census's own claims name the
 *   leads its plants give since its R-B367 and R-B400 restatements).
 * RESIDUALS (named, each member with its pinned quiet reading in its row): R-COMPOSED a stem, class or entry composed at run
 * time from parts is not read by the source scans, nor a registry member name composed at run time by A3's static reading
 * (Q1); R-NON-CODE a comment in a src script module naming one is not read (Q2); R-OUTSIDE-SRC a hosting module outside
 * src (qa/, examples/, an operator's local provider module, a vendored dist), a registration performed by code outside src (a namespace member or an imported function called with the
 * registry, an alias bound outside src), a dependency stated outside src in a file the helper's manifestForm does not select (a
 * Dockerfile, a setup script, a tox.ini, a pip -r file of another name, a lock of an unlisted format, a manifest of an
 * unlisted name), or a manifest below test/ (never published), is not read (Q3); R-INJECTED-RELAY the injected registration
 * relays its host client's envelope unchecked, so a committed envelope from an injected client is returned as a value (Q4;
 * the native preview is the admission point); R-UNREAD-MARKER the native admission reads the five markers of B1, so a
 * noncommitted envelope stating plan.would_commit true or a non-empty effects list is admitted (Q5); R-LATE-REACTION C2's
 * window is SETTLE_MS, so a reaction delayed past it is not seen there: one armed at registration is seen by C1's
 * created-resource reading, one armed by an invocation is read by neither (Q6 pins both, the second beside a twin armed at
 * once that launches); R-OTHER-VOCABULARY Fiber hosting spelled with none of the needles (another package name, another
 * verb, or a needle's words split by whitespace or a path separator, "Fiber Optics", "fiber/optics"), a registration A3's
 * static reading does not read (a write to the registry's private provider map, a call of a register* function by reference: a
 * further call of a name its module declares or imports, a namespace member), an rf launch whose first argument is not the literal rf (a command string, a constant holding rf), or a reactive
 * member named with none of the REACTIVE_WORDS (an emitter's on, off or once, a symbol-keyed async iterator), is not read (Q7).
 * NOT DELIVERED (the armed half): the falsifier that drives a registered Fiber-hosting capability - queued publications with no
 * flush deliver nothing, one explicit flush delivers them, and a query change alone delivers nothing - needs that capability,
 * and none exists. A cut that adds, moves or removes a text the helper's static reading reads below src (a registration
 * through the native or an injected-client registration among them), changes what registryReading states for a
 * registration leg (a Fiber-family member, its criteria, carrier or publishing reasons, a needle hit), or names a needle where
 * the A1 or A2 readings read one (A2's as far as its REACH states), changes a pinned reading and reds A (or B2) by design, and
 * must bring that falsifier with
 * it; where the helper's readers read is the landed readers censuses' claim (the NOT CLAIMED entry above), and the forms row
 * Q pins quiet are read by none of them. wb-jwc.5 holds the committing-render posture if the rf commit path is the vehicle.
 *
 * Display paths added: none. Test-only: the stand-in rf, its argv log, the seeded rf workspace and the planted trees live in
 * makeScratch scratch, with its leak guard installed; src, the manifests, the fixtures, the helper and the bead export are only
 * read.
 */
import { createHook } from "node:async_hooks";
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, symlinkSync, unlinkSync, watch, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityProvider,
  CapabilityRegistry,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  ALL_NEEDLES,
  DECLARATION_KINDS,
  descriptorReading,
  descriptorsOf,
  ENTRY_NEEDLES,
  FAMILY_WORD,
  fold,
  HOSTED_CLASSES,
  HOSTING_NEEDLES,
  hitsIn,
  isObject,
  isScript,
  json,
  judgedText,
  lockReading,
  MANIFEST_NAMES,
  manifestHits,
  NO_COMMIT,
  PIP_FAMILY_WORDS,
  PUBLICATION_ENTRIES,
  parse,
  REGISTER_NAME,
  REGISTRATION_WORDS,
  RF_CONTRACT,
  ROOT_NPM,
  rawLines,
  readManifests,
  registrationSites,
  registrationTexts,
  registryReading,
  SCRIPT_KINDS,
  STEM,
  TEST_ROOT,
  textsOf,
} from "./helpers/fiber-host-publication-readers.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-pyel.1";
/** The roster, root-relative: also A2's witness that the walk and git's listing select a non-script file. */
const ROSTER_FILE = "test/fixtures/fiber-host-publication-roster.json";
const ROSTER_PATH = join(REPO, ROSTER_FILE);
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PROVIDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const PREVIEW_ID = "reactivefiber.render.preview";

// ---- the vocabulary ----

// STEM, HOSTED_CLASSES, PUBLICATION_ENTRIES, NO_COMMIT, MANIFEST_NAMES, PIP_FAMILY_WORDS, TEST_ROOT, ROOT_NPM, REGISTRATION_WORDS,
// REGISTER_NAME, DECLARATION_KINDS, SCRIPT_KINDS, FAMILY_WORD, RF_CONTRACT, the folds and the needle sets are the helper's
// (test/helpers/fiber-host-publication-readers.ts), held to the roster's constants by the judged set; the census's own follow.

/** The producer's distribution, import-package and crate names at the pin; each folds to hold STEM. */
const DISTRIBUTIONS = ["FiberOpticsSDK", "fiber_optics", "fiber_optics_research", "fiber-optics-replay-observer"] as const;
/** The title's artifact sentence, its object: what A3 judges absent. */
const ARTIFACT = "a registered Pi Fiber-hosting or Fiber-publishing capability (none exists)";
/** A member name folding to hold one of these is a reactive entry (a subscription, a watcher, a scheduled or streamed effect). */
const REACTIVE_WORDS = ["subscribe", "observe", "watch", "listen", "notify", "emit", "react", "stream", "poll", "schedule"] as const;
/** The rf launchers A4's static roster reads in a script module: a call by one of these names whose first argument is the literal rf. */
const LAUNCHERS = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"] as const;
/** rf named as a word on a raw line: A4's launch reading of a non-script file below src (an argv list, a shell line, a config value). */
const RF_WORD = /(?<![\w.-])rf(?![\w-])/;
/** C2's observation window (ms): long enough for the planted reactive provider's launch to log under load. */
const SETTLE_MS = 3000;
/** Q6's delay (ms): a reaction scheduled this far out is never seen inside SETTLE_MS. */
const LATE_MS = 600_000;
/** Floors below the counts measured at base 04123dc and again at c2695d7, the same four (src 117 tracked files, every one a script module, 101769 judged texts; package.json 120 texts; 372 lock packages). */
const FLOORS = { modules: 100, texts: 60000, manifestTexts: 80, lockPackages: 300 } as const;
/** The four ids the registrations must hold, native and injected alike. */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", PREVIEW_ID] as const;
/**
 * missingIds' substitution controls: for each REQUIRED_DESCRIPTORS id, the near-miss ids a leg registers that id's own provider
 * under in its place (the id extended by a segment at its end and at its front, and the id less its last and its first character).
 */
const NEAR_MISS_IDS: Readonly<Record<string, readonly string[]>> = {
  "forge.gate.status": ["forge.gate.status.typed", "typed.forge.gate.status", "forge.gate.statu", "orge.gate.status"],
  "furnace.run.inspect": ["furnace.run.inspect.typed", "typed.furnace.run.inspect", "furnace.run.inspec", "urnace.run.inspect"],
  "hyperunix.find": ["hyperunix.find.typed", "typed.hyperunix.find", "hyperunix.fin", "yperunix.find"],
  "reactivefiber.render.preview": ["reactivefiber.render.preview.typed", "typed.reactivefiber.render.preview", "reactivefiber.render.previe", "eactivefiber.render.preview"],
};
/** Texts of the provider module A2's reader must see, so a reader that reads nothing reds on the live tree. */
const SOURCE_ANCHORS = ["rf", NO_COMMIT, "nativeReactiveFiberRender", "fiber_signal_count"] as const;
/**
 * WALK_CONTROL's provider texts: for each SOURCE_ANCHORS anchor, its first and its last part, the anchor extended at its end and
 * at its front, in upper case and wrapped in spaces; an exact compare reads none of them as the anchor.
 */
const ANCHOR_NEAR_MISSES: Readonly<Record<string, readonly string[]>> = {
  rf: ["r", "f", "rfx", "xrf", "RF", " rf "],
  "--no-commit": ["--no", "commit", "--no-commitx", "x--no-commit", "--NO-COMMIT", " --no-commit "],
  nativeReactiveFiberRender: ["nativeReactive", "FiberRender", "nativeReactiveFiberRenderx", "xnativeReactiveFiberRender", "NATIVEREACTIVEFIBERRENDER", " nativeReactiveFiberRender "],
  fiber_signal_count: ["fiber_", "signal_count", "fiber_signal_countx", "xfiber_signal_count", "FIBER_SIGNAL_COUNT", " fiber_signal_count "],
};
/** The delivery record's residual lines (cut #1's delivery note), each read at its first occurrence in the bead's notes. */
const RECORD_FINDINGS = "FINDINGS (each a named residual with a pinned quiet row";
const RECORD_RESIDUALS = "OTHER RESIDUALS (quiet rows pinned)";

// ---- the controls (each reader's planted positives and near misses; every expectation is pinned in the roster too) ----

const MANIFEST_CONTROLS: Readonly<Record<string, Json>> = {
  dependencies: { dependencies: { "fiber-optics": "^0.1.0" } },
  devDependencies: { devDependencies: { "@fiber-optics/sdk": "0.1.0" } },
  peerDependencies: { peerDependencies: { FiberOpticsSDK: "*" } },
  optionalDependencies: { optionalDependencies: { fiber_optics_research: "*" } },
  bundleDependencies: { bundleDependencies: ["fiber-optics-replay-observer"] },
  nestedValue: { overrides: { "reactive-fiber-cli": { engine: "npm:fiber-optics@0.1.0" } } },
  nearMissRf: { dependencies: { "reactive-fiber-cli": "1.0.0" } },
  nearMissSplit: { keywords: ["fiber", "optics"] },
};
/** A raw manifest whose first dependencies key JSON.parse shadows with the second: only the raw-line reading sees it. */
const SHADOWED_MANIFEST = '{ "dependencies": { "fiber-optics": "1.0.0" }, "dependencies": {} }';
/** A1's .npmignore controls: ignore-file texts ignoresEntry reads for test/ and src/ (whitespace around a line, a tab and a CRLF ending read as naming the entry; a longer path and a comment as not). */
const NPMIGNORE_CONTROLS: Readonly<Record<string, string>> = {
  spaced: "  test/  \n src/ \n",
  tabbedCrlf: "\ttest/\r\n\tsrc/\r\n",
  longer: "test/fixtures/\nsrc/workbench/\n",
  commented: "# test/\n# src/\n",
};
const LOCK_CONTROLS: Readonly<Record<string, Json>> = {
  lockPath: { packages: { "node_modules/fiber-optics": { version: "0.1.0" } } },
  lockName: { packages: { "node_modules/alias": { name: "FiberOpticsSDK", version: "0.1.0" } } },
  lockQuiet: { packages: { "node_modules/reactive-fiber": { version: "1.0.0" } } },
};
/**
 * A1's scratch tree, read through the helper's readManifests (each planted path's selecting form, the raw-read paths and every
 * STEM hit are pinned in the roster). manifest-name: every MANIFEST_NAMES entry (the root package.json, which is not read as raw
 * lines, and an npm pair outside the root's own reader among them) and web/Package.json in another letter case. pip-name: base
 * names holding requirements, constraints or pylock with an extension (.txt, .in, .lock, .pip, .toml, .md and an upper-case
 * .TXT) or none, the word led or followed by other text across a hyphen, a dot, an underscore or a space. pip-directory: files
 * below requirements and constraints directories at the root and at depth (py/Requirements in another letter case). Every
 * raw-read plant holds the stem but the constraints.txt near miss (fiber and optics on lines of their own) and the markdown
 * page. Left out: a Dockerfile, which no form selects, and below test/ a fixture requirements.txt and a fixture
 * requirements.pip.
 */
const MANIFEST_TREE: Readonly<Record<string, string>> = {
  "package.json": '{ "name": "host" }\n',
  "requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "requirements/base.txt": "fiber-optics==0.1.0\n",
  "environment.yml": "dependencies:\n  - pip:\n    - FiberOpticsSDK==0.1.0\n",
  "sidecar/requirements-dev.txt": "pytest>=8\nfiber_optics_research>=0.1\n",
  "dev-requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "test-requirements.txt": "fiber_optics==0.1.0\n",
  "requirements.lock": "fiber_optics==0.1.0\n",
  "pylock.toml": "[[packages]]\nname = \"fiber_optics\"\n",
  "test/fixtures/host/requirements.txt": "FiberOpticsSDK==0.1.0\n",
  "test/fixtures/host/requirements.pip": "FiberOpticsSDK==0.1.0\n",
  "tools/value-host/pyproject.toml": '[project]\nname = "value-host"\ndependencies = ["fiber-optics>=0.1"]\n',
  "rust/observer/Cargo.toml": '[dependencies]\nfiber-optics-replay-observer = "0.1"\n',
  "examples/host/package.json": '{ "dependencies": { "@fiber-optics/sdk": "0.1.0" } }\n',
  "constraints.txt": "reactive-fiber-cli==1.0.0\nfiber\noptics\n",
  Dockerfile: "RUN pip install FiberOpticsSDK\n",
  "examples/host/package-lock.json": '{ "packages": { "node_modules/fiber-optics": { "version": "0.1.0" } } }\n',
  "examples/host/npm-shrinkwrap.json": '{ "packages": { "node_modules/@fiber-optics/sdk": { "version": "0.1.0" } } }\n',
  "examples/host/yarn.lock": '"fiber-optics@^0.1.0":\n  version "0.1.0"\n',
  "examples/host/pnpm-lock.yaml": "packages:\n  fiber-optics@0.1.0: {}\n",
  "py/host/setup.py": 'setup(install_requires=["fiber_optics>=0.1"])\n',
  "py/host/setup.cfg": "[options]\ninstall_requires = FiberOpticsSDK\n",
  "py/host/Pipfile": '[packages]\nfiber-optics = "*"\n',
  "py/host/Pipfile.lock": '{ "default": { "fiber-optics": { "version": "==0.1.0" } } }\n',
  "py/host/poetry.lock": '[[package]]\nname = "fiber-optics"\n',
  "py/host/uv.lock": '[[package]]\nname = "fiber-optics"\n',
  "py/host/pdm.lock": '[[package]]\nname = "fiber-optics"\n',
  "py/host/environment.yaml": "dependencies:\n  - fiber_optics\n",
  "rust/observer/Cargo.lock": '[[package]]\nname = "fiber-optics-replay-observer"\n',
  "requirements.in": "fiber-optics\n",
  "constraints.in": "fiber_optics<1\n",
  "build.constraints.lock": "fiber_optics==0.1.0\n",
  "Requirements_Docs.TXT": "FiberOpticsSDK\n",
  "requirements/dev.in": "fiber-optics\n",
  "py/requirements/test.txt": "fiber_optics\n",
  "requirements.pip": "FiberOpticsSDK==0.1.0\n",
  "sidecar/requirements": "FiberOpticsSDK==0.1.0\n",
  "requirements/base.pip": "FiberOpticsSDK==0.1.0\n",
  "requirements/env/dev.txt": "FiberOpticsSDK==0.1.0\n",
  "py/Requirements/base.txt": "FiberOpticsSDK==0.1.0\n",
  "pylock.dev.toml": "[[packages]]\nname = \"fiber_optics\"\n",
  "constraints.pip": "fiber_optics<1\n",
  "constraints/base.txt": "fiber_optics<1\n",
  "requirements copy.txt": "FiberOpticsSDK==0.1.0\n",
  "docs/requirements.md": "# requirements\n",
  "web/Package.json": '{ "dependencies": { "fiber-optics": "0.1.0" } }\n',
};
/** A planted module: its file name (which sets the script kind) and its text. */
interface PlantedModule {
  readonly module: string;
  readonly source: string;
}
const SOURCE_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  importFrom: { module: "import-from.ts", source: 'import { open } from "fiber_optics";\nopen();\n' },
  dynamicImport: { module: "dynamic-import.ts", source: 'export const sdk = await import("@fiber-optics/sdk");\n' },
  requireCall: { module: "require-call.cjs", source: 'const sdk = require("fiber-optics");\nmodule.exports = sdk;\n' },
  sidecarArgv: { module: "sidecar.ts", source: 'import { spawn } from "node:child_process";\nspawn("python3", ["-c", "import fiber_optics"]);\n' },
  runtimeClass: { module: "runtime-class.ts", source: "declare const config: unknown;\nexport const runtime = new FiberRuntime(config);\n" },
  graphType: { module: "graph-type.ts", source: "export let graph: FiberGraph | undefined;\n" },
  schedulerTemplate: { module: "scheduler-template.ts", source: `declare const prefix: string;\nexport const name = \`\${prefix}FiberScheduler\`;\n` },
  regexPattern: { module: "regex-pattern.ts", source: "export const sdk = /fiber[-_]?optics/i;\n" },
  privateName: { module: "private-name.ts", source: "export class Host {\n  #fiberOptics = 1;\n  read(): number {\n    return this.#fiberOptics;\n  }\n}\n" },
  jsxText: { module: "jsx-text.tsx", source: "export const view = <p>FiberOptics</p>;\n" },
  classInPath: { module: "class-in-path.ts", source: 'export const host = "vendor/fiber_optics/FiberGraph.py";\n' },
  nearMiss: { module: "near-miss.ts", source: 'export const reactivefiber = 1;\nexport const fiber_signal_count = 0;\nexport const optics = "fiber";\n' },
  rfLayout: { module: "rf-layout.ts", source: 'export const RF_GRAPHS_DIR = ".reactive-fiber/graphs";\n' },
  templateParts: { module: "template-parts.ts", source: `declare const a: string;\ndeclare const b: string;\nexport const path = \`fiber_optics/\${a}/FiberGraph/\${b}\`;\nexport const name = \`FiberRuntime\`;\n` },
  exportFrom: { module: "export-from.ts", source: 'export { open } from "fiber_optics";\nexport * from "@fiber-optics/sdk";\n' },
};
const ENTRY_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  snakeCall: { module: "snake-call.ts", source: "declare const runtime: { queue_value_publication(port: string, value: number): void };\nruntime.queue_value_publication(\"port\", 1);\n" },
  camelCall: { module: "camel-call.ts", source: "declare const runtime: { flushValuePublications(): Promise<void> };\nawait runtime.flushValuePublications();\n" },
  stringKey: { module: "string-key.ts", source: 'declare const host: Record<string, (node: string) => void>;\nhost["request_rerender"]("node");\n' },
  destructured: { module: "destructured.ts", source: "declare const runtime: Record<string, () => void>;\nconst { flush_requested_renders: drain } = runtime;\ndrain();\n" },
  nearMiss: {
    module: "entry-near-miss.ts",
    source: "declare const queue: { flush(): void };\ndeclare function publish(value: number): void;\ndeclare function render(): void;\ndeclare function requestRender(): void;\nqueue.flush();\npublish(1);\nrender();\nrequestRender();\n",
  },
};
const LAUNCH_CONTROLS: Readonly<Record<string, PlantedModule>> = {
  spawnRf: { module: "spawn-rf.ts", source: 'import { spawn } from "node:child_process";\nspawn("rf", ["graph", "show"]);\n' },
  execFileSyncRf: { module: "exec-rf.ts", source: 'import { execFileSync } from "node:child_process";\nexecFileSync("rf", ["--version"]);\n' },
  memberSpawnRf: { module: "member-spawn-rf.ts", source: 'import * as cp from "node:child_process";\ncp.spawn("rf", ["context", "show"]);\n' },
  launcherNames: {
    module: "launcher-names.ts",
    source: 'import * as cp from "node:child_process";\ncp.spawnSync("rf", ["graph", "show"]);\ncp.execFile("rf", ["graph", "show"]);\ncp.exec("rf");\ncp.execSync("rf");\ncp.fork("rf");\n',
  },
  identifierLaunchers: {
    module: "identifier-launchers.ts",
    source: 'import { exec, execFile, execSync, fork, spawnSync } from "node:child_process";\nspawnSync("rf", ["graph", "show"]);\nexecFile("rf", ["graph", "show"]);\nexec("rf");\nexecSync("rf");\nfork("rf");\n',
  },
  memberExecFileSync: { module: "member-exec-file-sync.ts", source: 'import * as cp from "node:child_process";\ncp.execFileSync("rf", ["--version"]);\n' },
  optionalCall: { module: "optional-call.ts", source: 'import * as cp from "node:child_process";\ncp.spawn?.("rf", ["context", "render", "--json"]);\n' },
  optionalChain: { module: "optional-chain.ts", source: 'import * as cp from "node:child_process";\ncp?.spawn("rf", ["context", "render", "--json"]);\n' },
  typeArguments: { module: "type-arguments.ts", source: 'import * as cp from "node:child_process";\ncp.spawn<void>("rf", ["context", "render", "--json"]);\n' },
  propertyReceiver: {
    module: "property-receiver.ts",
    source: 'import * as cp from "node:child_process";\nconst holder = { cp };\nholder.cp.spawn("rf", ["context", "render", "--json"]);\n',
  },
  otherBinary: { module: "spawn-rg.ts", source: 'import { spawn } from "node:child_process";\nspawn("rg", ["-n", "rf"]);\n' },
  pythonLaunch: { module: "render-sidecar.py", source: 'import subprocess\nsubprocess.run(["rf", "context", "render", "--json"], check=True)\n' },
  shellLaunch: { module: "render.sh", source: "#!/bin/sh\nexec rf context render --json\n" },
  rawNearMiss: { module: "notes.txt", source: "rfc 2119 terms; perf counters; surf-board; rf-cli; config.rf\n" },
};
/** A scratch src tree A2, A4 and B2 read through the live pipeline (the walk held to a listing, every reader); SEGMENT_TREE and PIPELINE_LINK are planted beside it. */
const PIPELINE_TREE: Readonly<Record<string, string>> = {
  "src/hosts/value-sidecar.ts": 'import { spawn } from "node:child_process";\nspawn("python3", ["value-sidecar.py"]);\n',
  "src/hosts/value-sidecar.py": 'from fiber_optics import FiberRuntime\nFiberRuntime().flush_value_publications()\nsubprocess.run(["rf", "context", "render"])\n',
  "src/providers/value-host.json": '{ "runtime": "FiberGraph" }\n',
  "src/providers/rf-layout.json": '{ "graphs": ".reactive-fiber/graphs" }\n',
};
/**
 * A2's reach probes, by position: the head line leads each probed file of a reach copy and the tail line ends it (a script
 * module gets the statement, any other file the raw line), so nothing in the file's own text can swallow either. Each holds
 * every HOSTING_NEEDLES and ENTRY_NEEDLES needle as the producer spells it (a string literal each in the statement, a word each
 * on the raw line) and an rf launch; the head launches rf with spawnSync and the tail with execFileSync, launchers no file
 * below src launches rf with (A4's roster), so a script module's launch by either name is that probe's own.
 */
const REACH_PROBE = {
  head: {
    script:
      'export const reachHead = ["fiber_optics", "FiberRuntime", "FiberGraph", "FiberScheduler", "queue_value_publication", "flush_value_publications", "request_rerender", "flush_requested_renders"]; spawnSync("rf");',
    raw: "fiber_optics FiberRuntime FiberGraph FiberScheduler queue_value_publication flush_value_publications request_rerender flush_requested_renders rf",
    launcher: "spawnSync",
  },
  tail: {
    script:
      'export const reachTail = ["fiber_optics", "FiberRuntime", "FiberGraph", "FiberScheduler", "queue_value_publication", "flush_value_publications", "request_rerender", "flush_requested_renders"]; execFileSync("rf");',
    raw: "fiber_optics FiberRuntime FiberGraph FiberScheduler queue_value_publication flush_value_publications request_rerender flush_requested_renders rf",
    launcher: "execFileSync",
  },
} as const;
/** A reach probe's position: the head probe's line (a probed file's first) or the tail probe's (its last). */
type ReachPosition = keyof typeof REACH_PROBE;
/**
 * The reach copy's controls, probed and copied beside the listed files: one module per SCRIPT_KINDS extension, a non-script
 * file, a dot-named module and a module below a dot-named directory.
 */
const REACH_CONTROLS: Readonly<Record<string, string>> = {
  "src/workbench/reach/kind.ts": "export const kind = 1;\n",
  "src/workbench/reach/kind.mts": "export const kind = 1;\n",
  "src/workbench/reach/kind.cts": "export const kind = 1;\n",
  "src/workbench/reach/kind.tsx": "export const kind = <b>kind</b>;\n",
  "src/workbench/reach/kind.js": "export const kind = 1;\n",
  "src/workbench/reach/kind.mjs": "export const kind = 1;\n",
  "src/workbench/reach/kind.cjs": "module.exports = 1;\n",
  "src/workbench/reach/kind.jsx": "export const kind = <b>kind</b>;\n",
  "src/workbench/reach/notes.txt": "a non-script file\n",
  "src/workbench/reach/.dot-named.ts": "export const dotNamed = 1;\n",
  "src/workbench/reach/.dot-directory/kind.ts": "export const dotDirectory = 1;\n",
};
/**
 * A2's walk control: a src tree read through readSrc with a listing that differs from its walk by near misses. Walk-only files:
 * one beside the listing, one extending a listed path (the provider's path and .orig), one a listed path's prefix (the
 * provider's path without its extension), one holding a listed file's base name in another directory, a dot-named file and a
 * file below a dot-named directory; listing-only files: one beside the walk, one extending a walked path, one a walked path's
 * prefix, one holding a walked file's base name in another directory, a dot-named file and a file below the walked dot-named
 * directory; each is named. The provider's path is walked, its text holding every ANCHOR_NEAR_MISSES text as a judged text of
 * its own, and every anchor reads unread.
 */
const WALK_CONTROL = {
  files: {
    [PROVIDER_MODULE]: `export const anchorNearMisses = ${JSON.stringify(Object.values(ANCHOR_NEAR_MISSES).flat())};\n`,
    "src/walked-only.ts": "export const walkedOnly = 1;\n",
    "src/workbench/providers/reactivefiber.ts.orig": "a leftover copy\n",
    "src/workbench/providers/reactivefiber": "a path the provider's path extends\n",
    "src/other/reactivefiber.ts": "export const sameBaseName = 1;\n",
    "src/.walked-hidden.ts": "export const walkedHidden = 1;\n",
    "src/.hidden/walked-only.ts": "export const hiddenWalked = 1;\n",
  },
  listed: [PROVIDER_MODULE, "src/listed-only.ts", "src/walked-only.ts.orig", "src/walked-only", "src/other/walked-only.ts", "src/.listed-hidden.ts", "src/.hidden/listed-only.ts"],
} as const;
/**
 * The reach reading's negative control, read the same way: modules probed at both lines, at the tail only, at the head only and
 * at neither, a raw file probed at its tail only and one at its head only, and a module and a raw file probed at neither whose
 * one line is the head probe's with FiberScheduler and request_rerender replaced by the neutral word; for each position, per scan
 * and per needle the reading names exactly the files that position withholds that needle's hit from, and for the launch exactly
 * the files it withholds the launch from (the partial module's one line launches with spawnSync, so it reads launched at the head
 * only; the partial raw file's line names rf, so it reads launched at both).
 */
const REACH_NEGATIVE = {
  files: {
    "src/reach/probed.ts": "export const probed = 1;\n",
    "src/reach/headless.ts": "export const headless = 1;\n",
    "src/reach/tailless.ts": "export const tailless = 1;\n",
    "src/reach/unprobed.ts": "export const unprobed = 1;\n",
    "src/reach/headless.txt": "a raw file\n",
    "src/reach/tailless.txt": "a raw file\n",
    "src/reach/partial.ts": `${REACH_PROBE.head.script.replace('"FiberScheduler"', '"withheld"').replace('"request_rerender"', '"withheld"')}\n`,
    "src/reach/partial.txt": `${REACH_PROBE.head.raw.replace("FiberScheduler", "withheld").replace("request_rerender", "withheld")}\n`,
  },
  withheld: {
    "src/reach/headless.ts": ["head"],
    "src/reach/tailless.ts": ["tail"],
    "src/reach/unprobed.ts": ["head", "tail"],
    "src/reach/headless.txt": ["head"],
    "src/reach/tailless.txt": ["tail"],
    "src/reach/partial.ts": ["head", "tail"],
    "src/reach/partial.txt": ["head", "tail"],
  },
} as const;
/**
 * A2's dense reach modules, read the same way in one scratch src: REACH_DENSE.module, REACH_DENSE.lines lines each REACH_PROBE's
 * head statement, so a scan that drops a line by its number, or reads a subset of its needles on a line by its number, gives one
 * of its probe lines no hit of a needle; its negative control, REACH_DENSE.negative, whose withheld lines hold the filler (an
 * export holding no judged text) in the probe's place; and its partial control, REACH_DENSE.partial, whose line k is the head
 * statement with REACH_DENSE.partial.words[k - 1] (one word per HOSTING_NEEDLES and ENTRY_NEEDLES needle, in set order) replaced
 * by the neutral word. The reading names, per module, its planted line count, per scan and per needle the lines the hosting and
 * entry scans give no hit of that needle, and the count of lines the launch scan reads no launch for: none of the dense
 * module's, exactly the negative control's withheld lines, and for each needle exactly the partial control's line withholding
 * its word (no launch missing).
 */
const REACH_DENSE = {
  module: "src/workbench/reach/dense.ts",
  lines: 6000,
  negative: { module: "src/workbench/reach/dense-withheld.ts", lines: 9, withheld: [1, 5, 9] },
  partial: {
    module: "src/workbench/reach/dense-partial.ts",
    words: ["fiber_optics", "FiberRuntime", "FiberGraph", "FiberScheduler", "queue_value_publication", "flush_value_publications", "request_rerender", "flush_requested_renders"],
    neutral: "withheld",
  },
  filler: "export {};",
} as const;
/** A2's symlink control: a link below the pipeline tree's src to a directory outside it that holds a needle; the walk records the link and never follows it. */
const PIPELINE_LINK = { path: "src/linked", target: "../outside", files: { "outside/value.ts": "export const runtime = new FiberRuntime();\n" } } as const;
/** The separators of the helper's segmented fold that SEGMENT_TREE plants, by name, in its line order. */
const SEGMENT_SEPARATORS: Readonly<Record<string, string>> = { slash: "/", backslash: "\\", space: " ", tab: "\t" };
/** A SEGMENT_TREE line's needle-holding text: every REACH_DENSE.partial.words word joined by the separator between lead and end, which hold no needle. */
function segmentLine(separator: string): string {
  return ["lead", ...REACH_DENSE.partial.words, "end"].join(separator);
}
/**
 * A2's and B2's segment plants (A2's SEGMENTS), planted in the pipeline tree's src beside PIPELINE_TREE and read through readSrc
 * with it: a script module whose line per SEGMENT_SEPARATORS separator exports segmentLine's text as a string literal (its one
 * judged text holding a needle), and a raw file whose line per separator is that text; every needle's hit on a line comes only
 * from a segment that is neither the first nor the last of its judged text.
 */
const SEGMENT_TREE: Readonly<Record<string, string>> = {
  "src/hosts/value-segments.ts": Object.entries(SEGMENT_SEPARATORS)
    .map(([name, separator]) => `export const ${name} = ${JSON.stringify(segmentLine(separator))};\n`)
    .join(""),
  "src/hosts/value-segments.txt": Object.values(SEGMENT_SEPARATORS)
    .map(separator => `${segmentLine(separator)}\n`)
    .join(""),
};
/**
 * A3's static reading's planted src tree: a new exported injected-client capability whose descriptor lives in a constant; each
 * spelling of a register call and each judged-text position; each DECLARATION_KINDS kind, both specifier property names, each
 * name spelling (string literal, private, computed) and a register_value and a register2 name; the native bridge; a non-script
 * file; and near misses that stay unread (registered, RegisterHost, unregister, a pi.registerTool call, a registering string,
 * and $register, register_x, register2 and registerX in a string).
 */
const REGISTRATION_TREE: Readonly<Record<string, string>> = {
  "src/workbench/providers/value-publish.ts": [
    'const DESCRIPTOR = { id: "fiber.value.publish", effectClass: "write" };',
    'export function registerFiberValuePublish(registry: CapabilityRegistry): void {',
    '  registry.register({ descriptor: DESCRIPTOR, invoke: async () => null });',
    '}',
    '',
  ].join("\n"),
  "src/workbench/providers/value-spellings.ts": [
    "declare const registry: { register(provider: unknown): void };",
    "declare const PROVIDER: unknown;",
    "export const registerValueSpellings = (): void => {",
    "  registry.register(PROVIDER);",
    "  registry.register.call(registry, PROVIDER);",
    "  registry.register.apply(registry, [PROVIDER]);",
    '  registry["register"](PROVIDER);',
    "  registry[`register`](PROVIDER);",
    "  Reflect.apply(registry.register, registry, [PROVIDER]);",
    "  (registry.register)(PROVIDER);",
    "  registry?.register(PROVIDER);",
    "  const add = registry.register.bind(registry);",
    "  add(PROVIDER);",
    "  const { register } = registry;",
    "  register.call(registry, PROVIDER);",
    "};",
    "",
  ].join("\n"),
  "src/workbench/providers/value-positions.tsx": [
    "declare const n: number;",
    "export class Host {",
    "  #register(): void {}",
    "}",
    `export const head = \`register\${n}\`;`,
    `export const middle = \`a\${n}register\${n}\`;`,
    `export const tail = \`a\${n}register\`;`,
    'export const both = "register, then registerNativeProviders";',
    "export const pattern = /register/;",
    "export const view = <b>register</b>;",
    "",
  ].join("\n"),
  "src/workbench/providers/value-names.ts": [
    'import registerValueDefault, { registerValueImported, registerValueOriginal as renamed } from "./value-publish.js";',
    'import * as registerValueStar from "./value-publish.js";',
    'import registerValueRequire = require("./value-publish.js");',
    'export * as registerValueReexport from "./value-publish.js";',
    "declare const host: { registerValueBinding: number };",
    "export function registerValueDeclared(): void {}",
    "export const registerValueArrow = (): void => {};",
    "export const named = function registerValueNamed(): void {};",
    "class registerValueClass {}",
    "export const expression = class registerValueClassExpression {};",
    "export class Members {",
    "  registerValueMethod(): void {}",
    "  registerValueField = 1;",
    "  get registerValueGetter(): number {",
    "    return 1;",
    "  }",
    "  set registerValueSetter(value: number) {}",
    "}",
    "function install(registerValueParameter: () => void): void {}",
    "const { registerValueBinding } = host;",
    "export const assigned = { registerValueAssigned: 1, registerValueArrow };",
    "interface Shape {",
    "  registerValueSignature(): void;",
    "  registerValueProperty: number;",
    "}",
    "interface registerValueInterface {}",
    "type registerValueAlias = number;",
    "enum registerValueEnum {",
    "  A,",
    "}",
    "enum Kinds {",
    "  registerValueMember,",
    "}",
    "namespace registerValueNamespace {}",
    "function generic<registerValueType>(): void {}",
    "export { install as registerValueExported, registerValueArrow as installArrow };",
    'export const quoted = { "registerValueQuoted": 1, ["registerValueComputed"]: 2, [`registerValueComputedTemplate`]: 3 };',
    "export class Privates {",
    "  #registerValuePrivate(): void {}",
    "}",
    "enum Quoted {",
    '  "registerValueQuotedMember" = 1,',
    "}",
    'import { "registerValueString" as stringImport } from "./value-publish.js";',
    'export { install as "registerValueStringExport" };',
    'declare module "registerValueModule" {}',
    "const register_value = 1;",
    "const register2 = 2;",
    "",
  ].join("\n"),
  "src/workbench/hosts/value-bridge.ts": [
    "declare const modules: { registerNativeProviders(registry: unknown, root: string): void };",
    'modules.registerNativeProviders({}, "/");',
    'modules["registerNativeProviders"].call(modules, {}, "/");',
    "",
  ].join("\n"),
  "src/workbench/providers/value-host.json": '{ "register": "fiber.value.publish", "bridge": "registerNativeProviders" }\n',
  "src/workbench/providers/value-near-miss.ts": [
    "declare const pi: Record<string, (tool: unknown) => void>;",
    "export const registered = true;",
    "export class RegisterHost {}",
    "export function unregister(): void {}",
    'pi.registerTool({ name: "value" });',
    'export const note = "registering is refused; preregister";',
    'export const separators = "$register register_x register2 registerX";',
    "",
  ].join("\n"),
};
const NEVER = (): never => {
  throw new Error("census: a planted or injected capability is never invoked here");
};
/** A planted descriptor for A3's readers; every field a registry accepts. */
function plantedDescriptor(fields: Partial<CapabilityDescriptor> & Pick<CapabilityDescriptor, "id">): CapabilityDescriptor {
  return {
    version: "1.0.0",
    description: "planted",
    inputSchema: { type: "object" },
    effectClass: "read",
    permissions: ["planted:read"],
    supportedModes: ["invoke"],
    ...fields,
  };
}
const DESCRIPTOR_CONTROLS: Readonly<Record<string, CapabilityDescriptor>> = {
  runtimeHost: plantedDescriptor({ id: "fiber.runtime.host", effectClass: "external", permissions: ["fiber:host"], contractSource: "fiber_optics FiberRuntime" }),
  valueFlush: plantedDescriptor({ id: "fiberoptics.value.flush", effectClass: "write", permissions: ["fiberoptics:flush"] }),
  commitRender: plantedDescriptor({
    id: "reactivefiber.render.commit",
    effectClass: "write",
    permissions: ["reactivefiber:commit"],
    contractSource: "rf@0.1.845:reactive-fiber.cli/v1 context.render",
  }),
  observePreview: plantedDescriptor({
    id: PREVIEW_ID,
    permissions: ["reactivefiber:render"],
    supportedModes: ["invoke", "observe"],
    contractSource: REACTIVE_FIBER_CONTRACT_SOURCE,
  }),
  rfContract: plantedDescriptor({ id: "context.render.preview", permissions: ["context:render"], contractSource: "rf@0.1.845:context.render" }),
  entryDescription: plantedDescriptor({ id: "workbench.value.queue", description: "queue_value_publication, then flush_value_publications", effectClass: "write" }),
  previewShape: plantedDescriptor({ id: PREVIEW_ID, permissions: ["reactivefiber:render"], contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }),
  nestedSchema: plantedDescriptor({
    id: "workbench.handle.read",
    inputSchema: { type: "object", properties: { handle: { type: "string", description: "a FiberRuntime handle" } } },
  }),
  rfLayoutDescription: plantedDescriptor({ id: "workbench.layout.read", description: "reads .reactive-fiber/graphs/context.toml" }),
  neutral: plantedDescriptor({ id: "forge.gate.status", permissions: ["forge:gate:status"] }),
};
/** Q1 R-COMPOSED, Q2 R-NON-CODE, Q7 R-OTHER-VOCABULARY: modules the source scans read quiet. */
const COMPOSED_MODULE: PlantedModule = {
  module: "composed.ts",
  source: 'export const name = "fiber" + "_optics";\nexport const entry = ["flush", "value", "publications"].join("_");\nexport const host = "Fiber" + "Runtime";\ndeclare const registry: Record<string, (provider: unknown) => void>;\nregistry[["regi", "ster"].join("")]({});\n',
};
const COMMENT_MODULE: PlantedModule = { module: "comment.ts", source: "// new FiberRuntime() over fiber_optics\n/* flush_value_publications */\nexport {};\n" };
const OTHER_VOCABULARY_MODULE: PlantedModule = {
  module: "other-vocabulary.ts",
  source: 'import { Runtime } from "@reactive/fo-runtime";\nconst runtime = new Runtime();\nruntime.enqueue(1);\nruntime.drain();\nexport const fibre = "fibre optics";\n',
};
const OTHER_VOCABULARY_DESCRIPTOR = plantedDescriptor({ id: "context.engine.host", description: "hosts the value runtime and drains its queue", effectClass: "write" });
/** Q7: member names of a reactive registry spelled with none of the REACTIVE_WORDS (an emitter's on/off/once, a symbol-keyed async iterator). */
const OTHER_VOCABULARY_MEMBERS = ["on", "off", "once", "Symbol(Symbol.asyncIterator)"] as const;
/** Q7: a needle's words split by whitespace or a path separator hold no needle under the segmented fold. */
const SPLIT_SPELLING_MODULE: PlantedModule = {
  module: "split-spelling.ts",
  source: 'export const label = "Fiber Optics";\nexport const graph = "fiber graph";\nexport const path = "fiber/optics";\n',
};
/** Q7: registration A3's static reading does not read: a write to the registry's private provider map, and calls of a register* function by reference (further calls of a name the module imports or declares, a namespace member); only the import and the declaration are read. */
const REGISTRATION_VOCABULARY_MODULE: PlantedModule = {
  module: "registration-vocabulary.ts",
  source: [
    'import { registerNativeReactiveFiberRender } from "./providers/reactivefiber.js";',
    "declare const registry: { providers: Map<string, unknown> };",
    "declare const PROVIDER: unknown;",
    'registry.providers.set("fiber.value.publish", PROVIDER);',
    'registerNativeReactiveFiberRender(registry as never, "/a");',
    'registerNativeReactiveFiberRender(registry as never, "/b");',
    "function registerLocalValue(): void {}",
    "registerLocalValue();",
    "registerLocalValue();",
    'import * as providers from "./providers/reactivefiber.js";',
    'providers.registerNativeReactiveFiberRender(registry as never, "/c");',
    "",
  ].join("\n"),
};
/** Q7: rf launches A4's roster does not read: a command string, and a constant holding rf as the first argument. */
const OTHER_LAUNCH_MODULE: PlantedModule = {
  module: "other-launch.ts",
  source: 'import { execSync, spawnSync } from "node:child_process";\nconst RF_BIN = "rf";\nexecSync("rf context render --json");\nspawnSync(RF_BIN, ["context", "render", "--json"]);\n',
};
/** Q3: a tree whose hosting module and dependency statements sit outside src and outside every manifest name. */
const OUTSIDE_TREE: Readonly<Record<string, string>> = {
  "src/clean.ts": "export const clean = 1;\n",
  "qa/host.mjs": 'import { FiberRuntime } from "fiber_optics";\nnew FiberRuntime().flush_value_publications();\n',
  "examples/host.ts": 'import "fiber-optics";\n',
  Dockerfile: "FROM python:3.12-slim\nRUN pip install FiberOpticsSDK==0.1.0\n",
  "scripts/setup-sidecar.sh": "#!/bin/sh\npip install fiber_optics\n",
  "tools/value-host/deps.txt": "fiber_optics==0.1.0\n",
  "src/hand-off.ts": 'import * as host from "value-host";\nimport { add, plug } from "value-host";\ndeclare const registry: unknown;\nhost.registerValueHost(registry);\nplug(registry);\nadd({});\n',
  "providers/local-value.cjs": 'exports.register = registry => registry.register({ descriptor: { id: "fiber.value.publish" }, runtime: "FiberRuntime" });\n',
  "vendor/value-host/dist/index.js": 'module.exports = require("fiber_optics");\n',
  "tox.ini": "[testenv]\ndeps = fiber_optics\n",
  "web/bun.lock": '{ "packages": { "fiber-optics": ["fiber-optics@0.1.0"] } }\n',
  "web/package.yaml": "dependencies:\n  fiber-optics: ^0.1.0\n",
  "test/fixtures/host/pyproject.toml": '[project]\ndependencies = ["fiber-optics>=0.1"]\n',
};

/** The residual families, each named by the quiet-row pin that holds it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-NON-CODE": ["Q2"],
  "R-OUTSIDE-SRC": ["Q3"],
  "R-INJECTED-RELAY": ["Q4"],
  "R-UNREAD-MARKER": ["Q5"],
  "R-LATE-REACTION": ["Q6"],
  "R-OTHER-VOCABULARY": ["Q7"],
};

// ---- the judged rows ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster, to the acceptance's three clauses and to the delivery record. */
const ROWS: readonly Row[] = [
  { id: "A", label: "before any Fiber-hosting capability registers", pins: ["A1", "A2", "A3", "A4"] },
  { id: "B", label: "a falsifier proves publication happens only through an explicit host flush call", pins: ["B1", "B2"] },
  { id: "C", label: "a query change alone produces zero publication or inference side effects", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

// ---- the out-of-file roster ----

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly constants: JsonObject;
  readonly producer: JsonObject;
  readonly record: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !isObject(raw.producer) || !isObject(raw.record) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants, producer, record and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: json(raw.constants) as JsonObject, producer: json(raw.producer) as JsonObject, record: json(raw.record) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the readers (A1's and A3's are the helper's: textsOf, rawLines, hitsIn, manifestHits, lockReading, readManifests,
// isScript, parse, judgedText, registrationTexts and registrationSites; the census reads A2's positions, A4's launches, the
// walk and git's listing itself) ----

/** Whether an ignore file's text names an entry, exactly, on a line of its own (each line trimmed of surrounding whitespace). */
function ignoresEntry(text: string, entry: string): boolean {
  return text
    .split("\n")
    .map(line => line.trim())
    .includes(entry);
}
/** Whether a root's .npmignore names an entry (ignoresEntry over the file's text). */
function npmIgnores(root: string, entry: string): boolean {
  return ignoresEntry(readFileSync(join(root, ".npmignore"), "utf8"), entry);
}
/** Whether a measured count clears its floor (at least the floor). */
function clearsFloor(count: number, floor: number): boolean {
  return count >= floor;
}
/** Whether a manifest selection holds the root npm pair. */
function holdsRootNpm(selected: readonly string[]): boolean {
  return ROOT_NPM.every(path => selected.includes(path));
}

/** Every judged text of a script module, with its line. */
function sourceTexts(text: string, module: string): { line: number; text: string }[] {
  const file = parse(text, module);
  const out: { line: number; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    const read = judgedText(node);
    if (read !== undefined) out.push({ line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1, text: read });
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}
/** Every judged text of a file below src: a script module's AST texts, any other file's raw lines. */
function fileTexts(text: string, module: string): { line: number; text: string }[] {
  return isScript(module) ? sourceTexts(text, module) : rawLines(text);
}
/** A file's needle hits, `<module>:<line>: <needle>`. */
function sourceHits(text: string, module: string, needles: readonly string[]): string[] {
  return hitsIn(fileTexts(text, module), module, needles);
}
/** The planted modules' hits, by control name. */
function plantedHits(controls: Readonly<Record<string, PlantedModule>>, needles: readonly string[]): JsonValue {
  return json(Object.fromEntries(Object.entries(controls).map(([name, planted]) => [name, sourceHits(planted.source, planted.module, needles)])));
}
/** The name a call's callee is read by: an identifier, or a property access's name. */
function calleeName(expression: ts.Expression): string | undefined {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return undefined;
}
/**
 * A file's rf launches: in a script module a LAUNCHERS call whose first argument is the string literal rf, `<module>: <launcher>`;
 * in any other file a line naming rf as a word (RF_WORD), `<module>:<line>: rf`.
 */
function rfLaunches(text: string, module: string): string[] {
  if (!isScript(module)) return rawLines(text).flatMap(({ line, text: read }) => (RF_WORD.test(read) ? [`${module}:${line}: rf`] : []));
  const file = parse(text, module);
  const out: string[] = [];
  const launchers: readonly string[] = LAUNCHERS;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node.expression);
      const first = node.arguments[0];
      if (name !== undefined && launchers.includes(name) && first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") out.push(`${module}: ${name}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

/**
 * The walk of a directory: its regular files (dot-named ones and those below a dot-named directory among them), in name order,
 * root-relative, and its symlinks, each recorded and never followed; what this census claims of it is bounded by A2's words.
 */
function walkFiles(root: string, directory: string): { files: string[]; symlinks: string[] } {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (dir: string): void => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      const at = relative(root, path).split("\\").join("/");
      if (entry.isSymbolicLink()) symlinks.push(at);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(at);
    }
  };
  visit(join(root, directory));
  return { files, symlinks };
}
/** git's tracked files (below the given paths; every tracked file when none is given), sorted: the walk's independent anchor. */
function trackedFiles(...paths: string[]): string[] {
  return execFileSync("git", ["ls-files", "-z", "--", ...paths], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path.length > 0)
    .sort();
}
interface SrcReading {
  readonly modules: string[];
  readonly nonScript: string[];
  readonly symlinks: string[];
  readonly onlyWalked: string[];
  readonly onlyTracked: string[];
  readonly texts: number;
  readonly hosting: string[];
  readonly entries: string[];
  readonly launches: string[];
  readonly anchors: { [anchor: string]: boolean };
}
/** One read of every file below a root's src: the walk held to a listing, the judged texts, and the three scans. */
function readSrc(root: string, listed: readonly string[]): SrcReading {
  const walk = walkFiles(root, "src");
  let texts = 0;
  const hosting: string[] = [];
  const entries: string[] = [];
  const launches: string[] = [];
  const anchors: { [anchor: string]: boolean } = Object.fromEntries(SOURCE_ANCHORS.map(anchor => [anchor, false]));
  for (const module of walk.files) {
    const text = readFileSync(join(root, module), "utf8");
    const read = fileTexts(text, module);
    texts += read.length;
    hosting.push(...hitsIn(read, module, HOSTING_NEEDLES));
    entries.push(...hitsIn(read, module, ENTRY_NEEDLES));
    launches.push(...rfLaunches(text, module));
    if (module === PROVIDER_MODULE) for (const anchor of SOURCE_ANCHORS) anchors[anchor] = read.some(entry => entry.text === anchor);
  }
  return {
    modules: walk.files,
    nonScript: walk.files.filter(module => !isScript(module)),
    symlinks: walk.symlinks,
    onlyWalked: walk.files.filter(module => !listed.includes(module)),
    onlyTracked: listed.filter(module => !walk.files.includes(module)),
    texts,
    hosting,
    entries,
    launches,
    anchors,
  };
}
let srcCache: SrcReading | undefined;
/** The live tree's src, read once (shared by A2, A4 and B2) and held to git's listing. */
function srcReading(): SrcReading {
  srcCache ??= readSrc(REPO, trackedFiles("src"));
  return srcCache;
}
let pipelineCache: SrcReading | undefined;
/** PIPELINE_TREE, SEGMENT_TREE and PIPELINE_LINK planted in scratch and read by the same pipeline (shared by A2, A4 and B2), held to the two trees' listing. */
function pipelineReading(): SrcReading {
  if (pipelineCache === undefined) {
    const root = scratchDir("fiber-host-publication-pipeline-");
    plantTree(root, PIPELINE_TREE);
    plantTree(root, SEGMENT_TREE);
    plantTree(root, PIPELINE_LINK.files);
    symlinkSync(PIPELINE_LINK.target, join(root, PIPELINE_LINK.path));
    pipelineCache = readSrc(root, [...Object.keys(PIPELINE_TREE), ...Object.keys(SEGMENT_TREE)].sort());
  }
  return pipelineCache;
}

/** A file's reach-copy text: its own text led by REACH_PROBE's head line and ended by its tail line for the file's kind, a position `withheld` names left out. */
function probedText(module: string, text: string, withheld: readonly string[]): string {
  const kind = isScript(module) ? "script" : "raw";
  const body = text.length === 0 || text.endsWith("\n") ? text : `${text}\n`;
  return `${withheld.includes("head") ? "" : `${REACH_PROBE.head[kind]}\n`}${body}${withheld.includes("tail") ? "" : `${REACH_PROBE.tail[kind]}\n`}`;
}
/** The needle sets of the hosting and entry scans, by scan: a probe line gets one hit per needle of its scan's set. */
const SCAN_NEEDLES: Readonly<Record<string, readonly string[]>> = { hosting: HOSTING_NEEDLES, entries: ENTRY_NEEDLES };
/** The hit a hosting or entry scan gives a needle on a line: `<module>:<line>: <needle>`. */
function needleHit(module: string, line: number, needle: string): string {
  return `${module}:${line}: ${needle}`;
}
/** The launch the launch scan gives a probe: a script module's `<module>: <launcher>`, any other file's `<module>:<line>: rf`. */
function probeLaunch(module: string, line: number, position: ReachPosition): string {
  return isScript(module) ? `${module}: ${REACH_PROBE[position].launcher}` : `${module}:${line}: rf`;
}
/** Per scan and per needle of its set (SCAN_NEEDLES), the items whose hit of that needle (`hitOf`) the scan's hits lack. */
function missingByNeedle<Item>(
  hits: { readonly [scan: string]: ReadonlySet<string> },
  items: readonly Item[],
  hitOf: (item: Item, needle: string) => string,
): { [scan: string]: { [needle: string]: Item[] } } {
  return Object.fromEntries(
    Object.entries(SCAN_NEEDLES).map(([scan, needles]) => [scan, Object.fromEntries(needles.map(needle => [needle, items.filter(item => hits[scan]?.has(hitOf(item, needle)) !== true)]))]),
  );
}
/**
 * A2's reach of a tree: each file planted in scratch as probedText gives it and read through readSrc, the reader the live tree
 * is read by; for each position, per scan and per needle of its set the files the scan does not give that needle's hit
 * (needleHit, on the file's first line for the head and its last line for the tail), the files the launch scan does not give
 * that probe's launch (probeLaunch), the walk held to the listing, and whether the walk is the live walk's own (its files, in
 * order).
 */
function reachOf(files: Readonly<Record<string, string>>, withheld: Readonly<Record<string, readonly string[]>>): JsonValue {
  const root = scratchDir("fiber-host-publication-reach-");
  const planted = Object.fromEntries(Object.entries(files).map(([module, text]) => [module, probedText(module, text, withheld[module] ?? [])]));
  plantTree(root, planted);
  const listed = Object.keys(files).sort();
  const read = readSrc(root, listed);
  const hits: { [scan: string]: ReadonlySet<string> } = { hosting: new Set(read.hosting), entries: new Set(read.entries) };
  const launches: ReadonlySet<string> = new Set(read.launches);
  const lineOf = (module: string, position: ReachPosition): number => (position === "head" ? 1 : (planted[module] ?? "").split("\n").length - 1);
  const unreached = (position: ReachPosition): JsonValue =>
    json({
      ...missingByNeedle(hits, listed, (module, needle) => needleHit(module, lineOf(module, position), needle)),
      launches: listed.filter(module => !launches.has(probeLaunch(module, lineOf(module, position), position))),
    });
  return json({ head: unreached("head"), tail: unreached("tail"), onlyWalked: read.onlyWalked, onlyTracked: read.onlyTracked, liveWalk: JSON.stringify(read.modules) === JSON.stringify(srcReading().modules) });
}
/**
 * A2's dense reach: REACH_DENSE's three modules planted in one scratch src and read through readSrc; per module, per scan and per
 * needle of its set the lines the hosting and entry scans give no hit of that needle (needleHit), and the lines the launch scan
 * reads no launch for (its lines less its launches, probeLaunch).
 */
function denseReach(): JsonValue {
  const root = scratchDir("fiber-host-publication-dense-");
  const withheld: readonly number[] = REACH_DENSE.negative.withheld;
  const modules: { [module: string]: string[] } = {
    [REACH_DENSE.module]: Array.from({ length: REACH_DENSE.lines }, () => REACH_PROBE.head.script),
    [REACH_DENSE.negative.module]: Array.from({ length: REACH_DENSE.negative.lines }, (_, index) => (withheld.includes(index + 1) ? REACH_DENSE.filler : REACH_PROBE.head.script)),
    [REACH_DENSE.partial.module]: REACH_DENSE.partial.words.map(word => REACH_PROBE.head.script.replace(`"${word}"`, `"${REACH_DENSE.partial.neutral}"`)),
  };
  plantTree(root, Object.fromEntries(Object.entries(modules).map(([module, lines]) => [module, `${lines.join("\n")}\n`])));
  const read = readSrc(root, Object.keys(modules).sort());
  const hits: { [scan: string]: ReadonlySet<string> } = { hosting: new Set(read.hosting), entries: new Set(read.entries) };
  const reading = (module: string, lines: readonly string[]): JsonValue =>
    json({
      lines: lines.length,
      ...missingByNeedle(
        hits,
        lines.map((_, index) => index + 1),
        (line, needle) => needleHit(module, line, needle),
      ),
      launchesMissing: lines.length - read.launches.filter(hit => hit === probeLaunch(module, 0, "head")).length,
    });
  return json({ ...Object.fromEntries(Object.entries(modules).map(([module, lines]) => [module, reading(module, lines)])), onlyWalked: read.onlyWalked, onlyTracked: read.onlyTracked });
}
/** Whether a src reading walked the provider module. */
function readsProvider(reading: SrcReading): boolean {
  return reading.modules.includes(PROVIDER_MODULE);
}
/** A2's walk control read: WALK_CONTROL planted in scratch and read through readSrc with its listing; the pipeline tree's provider reading beside it. */
function walkControlReading(): JsonValue {
  const root = scratchDir("fiber-host-publication-walk-");
  plantTree(root, WALK_CONTROL.files);
  const read = readSrc(root, WALK_CONTROL.listed);
  return json({ onlyWalked: read.onlyWalked, onlyTracked: read.onlyTracked, providerRead: readsProvider(read), anchors: read.anchors, pipelineProviderRead: readsProvider(pipelineReading()) });
}
/** Each file git lists below src with its own text: what A2's reach copies. */
function listedTexts(): { [module: string]: string } {
  return Object.fromEntries(trackedFiles("src").map(module => [module, readFileSync(join(REPO, module), "utf8")]));
}

/** The new-module control uses the same static reader as the live tree. */
function scratchRegistrationTree(): string {
  const root = scratchDir("fiber-host-publication-registration-");
  plantTree(root, REGISTRATION_TREE);
  return root;
}

// ---- the registrations ----

const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
type RfInvoke = Parameters<typeof registerReactiveFiberRender>[1];
type RfEnvelope = Awaited<ReturnType<RfInvoke>>;
const RF_INVOKE: RfInvoke = async () => NEVER();

/** A registry that records every provider it is handed, so the providers' own keys can be read. */
class RecordingRegistry extends CapabilityRegistry {
  readonly recorded: CapabilityProvider[] = [];
  override register(provider: CapabilityProvider): void {
    this.recorded.push(provider);
    super.register(provider);
  }
}
/** A registry that registers each provider it is handed, the one holding `substituted` under `nearMiss` in its place: missingIds' substitution control. */
class SubstitutingRegistry extends CapabilityRegistry {
  readonly substituted: string;
  readonly nearMiss: string;
  constructor(substituted: string, nearMiss: string) {
    super();
    this.substituted = substituted;
    this.nearMiss = nearMiss;
  }
  override register(provider: CapabilityProvider): void {
    super.register(provider.descriptor.id === this.substituted ? { ...provider, descriptor: { ...provider.descriptor, id: this.nearMiss } } : provider);
  }
}
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
/**
 * The registry the four injected-client registrations fill; given a REQUIRED_DESCRIPTORS id, the leg that withholds that id's
 * registration, and given a SubstitutingRegistry, the leg it fills (missingIds' negative controls).
 */
function injectedRegistry(withheld?: string, registry: CapabilityRegistry = new CapabilityRegistry()): CapabilityRegistry {
  if (withheld !== "forge.gate.status") registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  if (withheld !== "hyperunix.find") registerHyperUnixFind(registry, HX_READER, REPO);
  if (withheld !== "furnace.run.inspect") registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  if (withheld !== PREVIEW_ID) registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
/** The REQUIRED_DESCRIPTORS ids a registration leg does not hold (the census's own check; the helper's registryReading reads the rest). */
function missingIds(registry: CapabilityRegistry): string[] {
  const ids = new Set(descriptorsOf(registry).map(descriptor => descriptor.id));
  return REQUIRED_DESCRIPTORS.filter(id => !ids.has(id));
}

// ---- the stand-in rf (A4, B1, C2, Q5, Q6): the ONLY PATH entry, it logs one argv line per spawn, prints a reply and exits ----

const oldPath = process.env.PATH;
const scratches: string[] = [];
const cleanups: Array<() => void> = [];
afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
/** Writes a planted tree below a scratch root. */
function plantTree(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
function recorder(reply: (root: string) => Json): Recorder {
  const root = scratchDir("fiber-host-publication-root-");
  const bin = scratchDir("fiber-host-publication-bin-");
  const log = join(bin, "spawns.jsonl");
  const script = join(bin, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(reply(root)))});`,
      "process.exitCode = 0;",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = bin;
  return { root, log };
}
function spawnsOf(record: Recorder): string[][] {
  if (!existsSync(record.log)) return [];
  return readFileSync(record.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => strings(JSON.parse(line), "spawn argv").map(token => (token === record.root ? "<root>" : token)));
}
/** The rf workspace a query reads, seeded in the stand-in's root: a definition, a component and a source. */
const WORKSPACE_FILES: Readonly<Record<string, string>> = {
  ".reactive-fiber/graphs/context.toml": 'id = "context"\n',
  ".reactive-fiber/components/summary.toml": 'id = "summary"\n',
  "notes/source.md": "# source\n",
};
function seedWorkspace(root: string): void {
  plantTree(root, WORKSPACE_FILES);
}
/** The query change: a definition rewritten, a component added, a source removed. */
function changeWorkspace(root: string, round: number): void {
  writeFileSync(join(root, ".reactive-fiber/graphs/context.toml"), `id = "context"\nround = ${round}\n`);
  writeFileSync(join(root, `.reactive-fiber/components/added-${round}.toml`), `id = "added-${round}"\n`);
  const source = join(root, "notes/source.md");
  if (existsSync(source)) unlinkSync(source);
}
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });
const LEGACY_INPUT = { model: "model-fixture", task: "task-fixture" } as const;
const VIEW_INPUT = { view: "swarm.worker", taskId: "bead-fixture-000" } as const;
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * The async resources a synchronous action creates, by type and count (`Timeout+1`): an async_hooks init hook is enabled for
 * exactly the action, so nothing else runs inside the bracket, and every timer (ref'd or unref'd, global or imported from
 * node:timers), immediate, tick, promise, watcher and child process the action creates is counted.
 */
function createdResources(action: () => void): string[] {
  const created: string[] = [];
  const hook = createHook({
    init(_id, type) {
      created.push(type);
    },
  });
  hook.enable();
  try {
    action();
  } finally {
    hook.disable();
  }
  const counts = new Map<string, number>();
  for (const type of created) counts.set(type, (counts.get(type) ?? 0) + 1);
  return [...counts.entries()].map(([type, count]) => `${type}+${count}`).sort();
}
async function refusalOf(call: Promise<unknown>): Promise<string> {
  const caught: unknown = await call.then(
    () => undefined,
    (error: unknown) => error,
  );
  if (caught === undefined) return "returned";
  if (!(caught instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(caught)}`);
  return `${caught.category}: ${caught.message}`;
}
/** A returned preview value's commit markers. */
function markersOf(value: JsonValue): JsonValue {
  const source = isObject(value) ? value.source : undefined;
  const result = isObject(source) ? source.result : undefined;
  const work = isObject(result) ? result.work : undefined;
  return json({
    transaction_id: isObject(source) ? source.transaction_id : "absent",
    render_id: isObject(result) ? result.render_id : "absent",
    ephemeral: isObject(result) ? result.ephemeral : "absent",
    commit_seq: isObject(result) ? result.commit_seq : "absent",
    storage_write_count: isObject(work) ? work.storage_write_count : "absent",
  });
}
/** The noncommitted fixture with its result (or its result's work) patched. */
function patched(root: string, patch: { top?: Json; result?: { [key: string]: Json }; work?: { [key: string]: Json } }): Json {
  const base = fullShapeRf(root);
  const result = base.result;
  if (!isObject(result)) throw new Error("the fixture states a result object");
  const work = result.work;
  if (!isObject(work)) throw new Error("the fixture states a result.work object");
  const nextResult = { ...result, ...(patch.result ?? {}), work: { ...work, ...(patch.work ?? {}) } } as Json;
  return { ...base, ...(isObject(patch.top) ? patch.top : {}), result: nextResult } as Json;
}
const COMMITTED_ID = "b".repeat(22);
/** B1's forms: each commit marker a committing render states, on the noncommitted fixture. */
const COMMITTED_FORMS: Readonly<Record<string, (root: string) => Json>> = {
  transaction_id: root => patched(root, { top: { transaction_id: `rft_${COMMITTED_ID}` } }),
  render_id: root => patched(root, { result: { render_id: `rfr_${COMMITTED_ID}` } }),
  ephemeral: root => patched(root, { result: { ephemeral: false } }),
  commit_seq: root => patched(root, { result: { commit_seq: 1 } }),
  storage_write_count: root => patched(root, { work: { storage_write_count: 1 } }),
};
/** Q5's forms: markers the native admission does not read. */
const UNREAD_FORMS: Readonly<Record<string, (root: string) => Json>> = {
  wouldCommit: root => patched(root, { result: { plan: { operations: [], would_commit: true } } }),
  effects: root => patched(root, { result: { effects: [{ kind: "store_write" }] } }),
};
async function bothArms(record: Recorder): Promise<{ legacy: string; view: string }> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, record.root);
  return {
    legacy: await refusalOf(registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext())),
    view: await refusalOf(registry.invoke(PREVIEW_ID, VIEW_INPUT, invokeContext())),
  };
}

/**
 * A planted reactive provider (C2's positive control, Q6's late twin): at registration it polls the workspace definition every
 * 25 ms, and on a change it launches rf after `delay` ms. Its cleanup clears both timers.
 */
function registerReactiveControl(registry: CapabilityRegistry, root: string, delay: number): void {
  const definition = join(root, ".reactive-fiber/graphs/context.toml");
  const initial = readFileSync(definition, "utf8");
  let fired: ReturnType<typeof setTimeout> | undefined;
  const poll = setInterval(() => {
    if (fired !== undefined || readFileSync(definition, "utf8") === initial) return;
    fired = setTimeout(() => {
      spawn("rf", ["--workspace", root, "context", "render", "--reacted"], { stdio: "ignore" }).on("error", () => {});
    }, delay);
  }, 25);
  cleanups.push(() => {
    clearInterval(poll);
    if (fired !== undefined) clearTimeout(fired);
  });
  registry.register({ descriptor: plantedDescriptor({ id: "fiber.reactive.control" }), invoke: async () => NEVER() });
}
/** C1's kinds control: one of each async resource C1's reading names (a ref'd and an unref'd timer, an immediate, a tick, a promise, a watcher, a child); its cleanup ends them. */
function createEachResourceKind(dir: string): void {
  const refTimer = setTimeout(() => {}, LATE_MS);
  const unrefTimer = setTimeout(() => {}, LATE_MS).unref();
  setImmediate(() => {});
  process.nextTick(() => {});
  void Promise.resolve();
  const watcher = watch(dir);
  const child = spawn(process.execPath, ["-e", ""], { stdio: "ignore" });
  child.on("error", () => {});
  cleanups.push(() => {
    clearTimeout(refTimer);
    clearTimeout(unrefTimer);
    watcher.close();
    child.kill();
  });
}
/** Q6's invocation-armed twins: one arms its launch LATE_MS out (the residual), one at once (the channel's positive). */
const ARMED_IDS = { late: "fiber.reactive.invoked-late", now: "fiber.reactive.invoked-now" } as const;
/** An invocation-armed twin: registering it arms nothing; its invoke arms a launch, naming its id, `delay` ms out. Its cleanup clears the timer. */
function registerInvocationArmed(registry: CapabilityRegistry, root: string, id: string, delay: number): void {
  let armed: ReturnType<typeof setTimeout> | undefined;
  cleanups.push(() => {
    if (armed !== undefined) clearTimeout(armed);
  });
  registry.register({
    descriptor: plantedDescriptor({ id }),
    invoke: async () => {
      armed ??= setTimeout(() => {
        spawn("rf", ["--workspace", root, "context", "render", "--armed", id], { stdio: "ignore" }).on("error", () => {});
      }, delay);
      return null;
    },
  });
}
/** Registers through `register` on a fresh registry, edits the workspace, waits SETTLE_MS: what launched, what was added. */
async function changeAlone(register: (registry: RecordingRegistry, root: string) => void): Promise<{ record: Recorder; registry: RecordingRegistry; registration: string[]; changes: string[]; spawns: number }> {
  const record = recorder(root => fullShapeRf(root));
  seedWorkspace(record.root);
  const registry = new RecordingRegistry();
  const registration = createdResources(() => register(registry, record.root));
  const changes = createdResources(() => changeWorkspace(record.root, 1));
  await sleep(SETTLE_MS);
  return { record, registry, registration, changes, spawns: spawnsOf(record).length };
}

/** The reactive-word hits of member names, `<owner>.<member>: <word>`. */
function reactiveMembers(owner: string, names: readonly string[]): string[] {
  const words: readonly string[] = REACTIVE_WORDS;
  return names.flatMap(name => words.filter(word => fold(name).includes(word)).map(word => `${owner}.${name}: ${word}`));
}
/** Every own member name along an object's prototype chain, Object.prototype excluded. */
function chainMembers(value: object): string[] {
  const names = new Set<string>();
  for (let current: object | null = value; current !== null && current !== Object.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) names.add(name);
  }
  return [...names].sort();
}
/** Every member a class exposes: its prototype chain, an instance's own keys (so a class field) and the static members along its constructor chain. */
function classMembers(owner: { readonly prototype: object }, instance: object): string[] {
  const names = new Set<string>([...chainMembers(owner.prototype), ...Object.getOwnPropertyNames(instance)]);
  for (let current: object | null = owner; current !== null && current !== Function.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) names.add(name);
  }
  return [...names].sort();
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The notes' first Acceptance sentence, split into its clauses at ", " and ", and ". */
function acceptanceClauses(notes: string): string[] {
  const sentence = /Acceptance: ([^.]+)\./.exec(notes)?.[1];
  return sentence === undefined ? [] : sentence.split(/, (?:and )?/);
}
/** The title's distribution word: the one word after "hosts", ending in SDK. */
function titleDistribution(title: string): string {
  return /\bhosts (\S+SDK)\b/.exec(title)?.[1] ?? "";
}
/** The title's artifact sentence's object, between "Artifact: " and the closing full stop. */
function titleArtifact(title: string): string {
  return /Artifact: (.+)\.$/.exec(title)?.[1] ?? "";
}
/** The notes' Authority quote (single-quoted) and their citation, path:line@pin. */
function notesAuthority(notes: string): { quote: string; citation: string } {
  return {
    quote: /Authority: '([^']+)'/.exec(notes)?.[1] ?? "",
    citation: /Citation: (\S+:\d+@[0-9a-f]+)\./.exec(notes)?.[1] ?? "",
  };
}
/** The commit markers the notes name in their noncommitted-provenance parenthetical. */
function notesMarkers(notes: string): string[] {
  const list = /noncommitted provenance \(([^)]+)\)/.exec(notes)?.[1];
  return list === undefined ? [] : list.split(", ").map(item => item.split(" ")[0] ?? "");
}
/** The pins the delivery record's CLAIM line for a row names: its first notes line opening `- <id> "<label>"`. */
function recordPins(notes: string, row: Row): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith(`- ${row.id} "${row.label}"`)) ?? "";
  return [...new Set(line.match(/\b[A-Z]\d+\b/g) ?? [])].filter(pin => pin.startsWith(row.id));
}
/** The quiet-row pins and residual families the delivery record pairs, `Q<n> R-<FAMILY>`, from its first FINDINGS and OTHER RESIDUALS lines. */
function recordResiduals(notes: string): string[] {
  const lines = notes.split("\n");
  const findings = lines.find(line => line.startsWith(RECORD_FINDINGS)) ?? "";
  const others = lines.find(line => line.startsWith(RECORD_RESIDUALS)) ?? "";
  return [...`${findings}\n${others}`.matchAll(/\b(Q\d+) (R-[A-Z]+(?:-[A-Z]+)*)\b/g)].map(match => `${match[1]} ${match[2]}`).sort();
}
function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const raw = readFileSync(join(REPO, "package.json"), "utf8");
    const manifest: unknown = JSON.parse(raw);
    const lock = lockReading(JSON.parse(readFileSync(join(REPO, "package-lock.json"), "utf8")));
    const listing = trackedFiles();
    const manifests = readManifests(REPO, listing);
    const tree = scratchDir("fiber-host-publication-manifests-");
    plantTree(tree, MANIFEST_TREE);
    return json({
      surface: "manifests",
      manifestTextsAboveFloor: clearsFloor(textsOf(manifest, "package.json").length, FLOORS.manifestTexts),
      packageJson: manifestHits(manifest, raw, "package.json"),
      lockPackagesAboveFloor: clearsFloor(lock.packages, FLOORS.lockPackages),
      floorControls: Object.fromEntries(Object.entries(FLOORS).map(([name, floor]) => [name, { at: clearsFloor(floor, floor), below: clearsFloor(floor - 1, floor) }])),
      lock: lock.hits,
      rootNpmSelected: holdsRootNpm(manifests.selected),
      rootNpmControls: Object.fromEntries(ROOT_NPM.map(path => [path, holdsRootNpm(readManifests(REPO, listing.filter(listed => listed !== path)).selected)])),
      npmIgnored: Object.fromEntries([TEST_ROOT, "src/"].map(entry => [entry, npmIgnores(REPO, entry)])),
      npmIgnoreControls: Object.fromEntries(
        Object.entries(NPMIGNORE_CONTROLS).map(([name, ignore]) => {
          const root = scratchDir("fiber-host-publication-npmignore-");
          plantTree(root, { ".npmignore": ignore });
          return [name, Object.fromEntries([TEST_ROOT, "src/"].map(entry => [entry, npmIgnores(root, entry)]))];
        }),
      ),
      rawManifestHits: manifests.hits,
      manifestTree: readManifests(tree, Object.keys(MANIFEST_TREE).sort()),
      manifestControls: Object.fromEntries(Object.entries(MANIFEST_CONTROLS).map(([name, manifest]) => [name, manifestHits(manifest, undefined, name).length])),
      shadowedKey: { parsed: manifestHits(JSON.parse(SHADOWED_MANIFEST), undefined, "shadowed").length, raw: manifestHits(JSON.parse(SHADOWED_MANIFEST), SHADOWED_MANIFEST, "shadowed").length },
      lockControls: Object.fromEntries(Object.entries(LOCK_CONTROLS).map(([name, lock]) => [name, lockReading(lock).hits.length])),
    });
  },
  A2: async () => {
    const src = srcReading();
    const tree = pipelineReading();
    return json({
      surface: "src",
      modulesAboveFloor: clearsFloor(src.modules.length, FLOORS.modules),
      textsAboveFloor: clearsFloor(src.texts, FLOORS.texts),
      symlinks: src.symlinks,
      onlyWalked: src.onlyWalked,
      onlyTracked: src.onlyTracked,
      providerRead: readsProvider(src),
      anchors: src.anchors,
      hosting: src.hosting,
      listsNonScript: { walk: walkFiles(REPO, "test/fixtures").files.includes(ROSTER_FILE), git: trackedFiles("test/fixtures").includes(ROSTER_FILE) },
      pipeline: { modules: tree.modules, nonScript: tree.nonScript, symlinks: tree.symlinks, onlyWalked: tree.onlyWalked, onlyTracked: tree.onlyTracked, hosting: tree.hosting },
      reach: reachOf({ ...listedTexts(), ...REACH_CONTROLS }, {}),
      reachListed: reachOf(listedTexts(), {}),
      reachNegative: reachOf(REACH_NEGATIVE.files, REACH_NEGATIVE.withheld),
      dense: denseReach(),
      walkControl: walkControlReading(),
      controls: plantedHits(SOURCE_CONTROLS, HOSTING_NEEDLES),
    });
  },
  A3: async () => {
    const nativeLeg = await nativeRegistry();
    const injectedLeg = injectedRegistry();
    return json({
      surface: "registered capabilities",
      artifact: ARTIFACT,
      missing: { native: missingIds(nativeLeg), injected: missingIds(injectedLeg) },
      missingControls: Object.fromEntries(REQUIRED_DESCRIPTORS.map(id => [id, missingIds(injectedRegistry(id))])),
      substitutionControls: Object.fromEntries(
        REQUIRED_DESCRIPTORS.map(id => [id, Object.fromEntries((NEAR_MISS_IDS[id] ?? []).map(nearMiss => [nearMiss, missingIds(injectedRegistry(undefined, new SubstitutingRegistry(id, nearMiss)))]))]),
      ),
      native: registryReading(nativeLeg),
      injected: registryReading(injectedLeg),
      staticSites: registrationSites(REPO, trackedFiles("src")),
      registrationControl: registrationSites(scratchRegistrationTree(), Object.keys(REGISTRATION_TREE).sort()),
      controls: Object.fromEntries(Object.entries(DESCRIPTOR_CONTROLS).map(([name, descriptor]) => [name, descriptorReading(descriptor)])),
    });
  },
  A4: async () => {
    const src = srcReading();
    const record = recorder(root => fullShapeRf(root));
    const arms = await bothArms(record);
    return json({
      surface: "rf launch",
      flag: NO_COMMIT,
      launchRoster: src.launches,
      pipeline: pipelineReading().launches,
      launchControls: Object.fromEntries(Object.entries(LAUNCH_CONTROLS).map(([name, planted]) => [name, rfLaunches(planted.source, planted.module)])),
      arms,
      spawns: spawnsOf(record),
      everyLaunchNoCommit: spawnsOf(record).every(argv => argv.includes(NO_COMMIT) && argv.slice(2, 4).join(" ") === "context render"),
    });
  },
  B1: async () => {
    const forms: { [form: string]: JsonValue } = {};
    let spawns = 0;
    for (const [form, reply] of Object.entries(COMMITTED_FORMS)) {
      const record = recorder(reply);
      forms[form] = json(await bothArms(record));
      spawns += spawnsOf(record).length;
    }
    const control = recorder(root => fullShapeRf(root));
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, control.root);
    const legacy = markersOf(await registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext()));
    const view = markersOf(await registry.invoke(PREVIEW_ID, VIEW_INPUT, invokeContext()));
    return json({ surface: "native preview", forms, control: { legacy, view }, spawns: spawns + spawnsOf(control).length });
  },
  B2: async () => {
    const src = srcReading();
    return json({
      surface: "src",
      walkHeldToGit: src.onlyWalked.length === 0 && src.onlyTracked.length === 0 && clearsFloor(src.modules.length, FLOORS.modules),
      entries: src.entries,
      pipeline: pipelineReading().entries,
      controls: plantedHits(ENTRY_CONTROLS, ENTRY_NEEDLES),
    });
  },
  C1: async () => {
    const nativeLeg = new RecordingRegistry();
    const injectedLeg = new RecordingRegistry();
    const registration = {
      native: createdResources(() => registerNativeReactiveFiberRender(nativeLeg, REPO)),
      injected: createdResources(() => registerReactiveFiberRender(injectedLeg, RF_INVOKE, REPO)),
    };
    const providers = {
      native: nativeLeg.recorded.map(provider => Object.keys(provider).sort()),
      injected: injectedLeg.recorded.map(provider => Object.keys(provider).sort()),
    };
    const members = classMembers(CapabilityRegistry, new CapabilityRegistry());
    class SubscribingRegistry extends CapabilityRegistry {
      subscribe(): void {}
    }
    class InheritingRegistry extends SubscribingRegistry {}
    class FieldRegistry extends CapabilityRegistry {
      readonly subscribe = (): void => {};
    }
    class StaticRegistry extends CapabilityRegistry {
      static subscribe(): void {}
    }
    const polling = new RecordingRegistry();
    const controlRoot = scratchDir("fiber-host-publication-control-");
    seedWorkspace(controlRoot);
    return json({
      registryServes: ["invoke", "inspect"].filter(name => members.includes(name)),
      reactive: [
        ...reactiveMembers("CapabilityRegistry", members),
        ...nativeLeg.recorded.flatMap(provider => reactiveMembers("native provider", Object.keys(provider))),
        ...injectedLeg.recorded.flatMap(provider => reactiveMembers("injected provider", Object.keys(provider))),
      ],
      providers,
      registration,
      controls: {
        subscribingRegistry: reactiveMembers("SubscribingRegistry", classMembers(SubscribingRegistry, new SubscribingRegistry())),
        inheritingRegistry: reactiveMembers("InheritingRegistry", classMembers(InheritingRegistry, new InheritingRegistry())),
        fieldRegistry: reactiveMembers("FieldRegistry", classMembers(FieldRegistry, new FieldRegistry())),
        staticRegistry: reactiveMembers("StaticRegistry", classMembers(StaticRegistry, new StaticRegistry())),
        pollingProvider: createdResources(() => registerReactiveControl(polling, controlRoot, LATE_MS)),
        resourceKinds: createdResources(() => createEachResourceKind(controlRoot)),
      },
    });
  },
  C2: async () => {
    const nativeLeg = await changeAlone((registry, root) => registerNativeReactiveFiberRender(registry, root));
    const selector = { model: "model-fixture", task: "task-before" };
    selector.task = "task-after";
    const value = await nativeLeg.registry.invoke(PREVIEW_ID, selector, invokeContext());
    const invoked = spawnsOf(nativeLeg.record);
    const secondChange = createdResources(() => {
      selector.task = "task-later";
      changeWorkspace(nativeLeg.record.root, 2);
    });
    await sleep(SETTLE_MS);
    const afterSecondChange = spawnsOf(nativeLeg.record).length;
    let calls = 0;
    const injectedLeg = await changeAlone((registry, root) =>
      registerReactiveFiberRender(
        registry,
        async () => {
          calls += 1;
          return fullShapeRf(root) as unknown as RfEnvelope;
        },
        root,
      ),
    );
    const injectedAfterChange = calls;
    await injectedLeg.registry.invoke(PREVIEW_ID, selector, invokeContext());
    const injectedAfterInvoke = calls;
    changeWorkspace(injectedLeg.record.root, 2);
    await sleep(SETTLE_MS);
    const reactive = await changeAlone((registry, root) => registerReactiveControl(registry, root, 0));
    return json({
      native: {
        registration: nativeLeg.registration,
        changes: nativeLeg.changes,
        spawnsAfterChange: nativeLeg.spawns,
        invoked,
        value: markersOf(value),
        secondChange,
        spawnsAfterSecondChange: afterSecondChange,
      },
      injected: { callsAfterChange: injectedAfterChange, callsAfterInvoke: injectedAfterInvoke, callsAfterSecondChange: calls, spawns: spawnsOf(injectedLeg.record).length },
      reactiveControl: { registration: reactive.registration, spawnsAfterChange: reactive.spawns },
    });
  },
  Q1: async () =>
    json({
      residual: "R-COMPOSED",
      hosting: sourceHits(COMPOSED_MODULE.source, COMPOSED_MODULE.module, HOSTING_NEEDLES),
      entries: sourceHits(COMPOSED_MODULE.source, COMPOSED_MODULE.module, ENTRY_NEEDLES),
      registration: registrationTexts(COMPOSED_MODULE.source, COMPOSED_MODULE.module),
    }),
  Q2: async () => json({ residual: "R-NON-CODE", hosting: sourceHits(COMMENT_MODULE.source, COMMENT_MODULE.module, HOSTING_NEEDLES), entries: sourceHits(COMMENT_MODULE.source, COMMENT_MODULE.module, ENTRY_NEEDLES) }),
  Q3: async () => {
    const root = scratchDir("fiber-host-publication-tree-");
    plantTree(root, OUTSIDE_TREE);
    const walk = walkFiles(root, "src");
    const hits = walk.files.flatMap(module => sourceHits(readFileSync(join(root, module), "utf8"), module, ALL_NEEDLES));
    const manifests = readManifests(root, Object.keys(OUTSIDE_TREE).sort());
    const outside = Object.keys(OUTSIDE_TREE)
      .filter(path => !path.startsWith("src/"))
      .map(path => ({
        path,
        walked: walk.files.includes(path),
        selected: manifests.selected.includes(path),
        needles: sourceHits(OUTSIDE_TREE[path] ?? "", path, ALL_NEEDLES).length,
      }));
    return json({ residual: "R-OUTSIDE-SRC", walked: walk.files, hits, registration: registrationSites(root, walk.files), outside });
  },
  Q4: async () => {
    const registry = new CapabilityRegistry();
    const committed = COMMITTED_FORMS.transaction_id;
    registerReactiveFiberRender(registry, async () => (committed === undefined ? NEVER() : (committed(REPO) as unknown as RfEnvelope)), REPO);
    const value = await registry.invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext());
    return json({ residual: "R-INJECTED-RELAY", returned: markersOf(value) });
  },
  Q5: async () => {
    const forms: { [form: string]: JsonValue } = {};
    for (const [form, reply] of Object.entries(UNREAD_FORMS)) forms[form] = json(await bothArms(recorder(reply)));
    return json({ residual: "R-UNREAD-MARKER", forms });
  },
  Q6: async () => {
    const late = await changeAlone((registry, root) => registerReactiveControl(registry, root, LATE_MS));
    const armedRegistry = new CapabilityRegistry();
    const armedRegistration = createdResources(() => {
      registerInvocationArmed(armedRegistry, late.record.root, ARMED_IDS.late, LATE_MS);
      registerInvocationArmed(armedRegistry, late.record.root, ARMED_IDS.now, 0);
    });
    for (const id of [ARMED_IDS.late, ARMED_IDS.now]) await armedRegistry.invoke(id, {}, { grants: ["planted:read"], signal: new AbortController().signal });
    changeWorkspace(late.record.root, 2);
    await sleep(SETTLE_MS);
    const armedSpawns = (id: string): number => spawnsOf(late.record).filter(argv => argv.includes(id)).length;
    return json({
      residual: "R-LATE-REACTION",
      registration: late.registration,
      spawnsAfterChange: late.spawns,
      invocationArmed: { registration: armedRegistration, late: armedSpawns(ARMED_IDS.late), now: armedSpawns(ARMED_IDS.now) },
    });
  },
  Q7: async () =>
    json({
      residual: "R-OTHER-VOCABULARY",
      hosting: sourceHits(OTHER_VOCABULARY_MODULE.source, OTHER_VOCABULARY_MODULE.module, ALL_NEEDLES),
      split: sourceHits(SPLIT_SPELLING_MODULE.source, SPLIT_SPELLING_MODULE.module, ALL_NEEDLES),
      members: reactiveMembers("OtherVocabularyRegistry", OTHER_VOCABULARY_MEMBERS),
      launches: rfLaunches(OTHER_VOCABULARY_MODULE.source, OTHER_VOCABULARY_MODULE.module),
      launchSpellings: rfLaunches(OTHER_LAUNCH_MODULE.source, OTHER_LAUNCH_MODULE.module),
      registration: registrationTexts(REGISTRATION_VOCABULARY_MODULE.source, REGISTRATION_VOCABULARY_MODULE.module),
      manifest: manifestHits({ dependencies: { "@reactive/fo-runtime": "1.0.0", "fibre-optics": "1.0.0" } }, undefined, "planted"),
      descriptor: descriptorReading(OTHER_VOCABULARY_DESCRIPTOR),
    }),
};

describe("wb-pyel.1 Fiber host-publication census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title, notes and acceptance and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        stem: STEM,
        distributions: DISTRIBUTIONS,
        hostedClasses: HOSTED_CLASSES,
        publicationEntries: PUBLICATION_ENTRIES,
        noCommit: NO_COMMIT,
        artifact: ARTIFACT,
        reactiveWords: REACTIVE_WORDS,
        launchers: LAUNCHERS,
        rfWord: RF_WORD.source,
        manifestNames: MANIFEST_NAMES,
        pipFamilyWords: PIP_FAMILY_WORDS,
        registrationWords: REGISTRATION_WORDS,
        registerName: REGISTER_NAME.source,
        declarationKinds: DECLARATION_KINDS.map(kind => ts.SyntaxKind[kind]),
        familyWord: FAMILY_WORD,
        rfContract: RF_CONTRACT,
        rootNpm: ROOT_NPM,
        testRoot: TEST_ROOT,
        settleMs: SETTLE_MS,
        lateMs: LATE_MS,
        floors: FLOORS,
        scriptKinds: Object.keys(SCRIPT_KINDS),
        requiredDescriptors: REQUIRED_DESCRIPTORS,
        nearMissIds: NEAR_MISS_IDS,
        sourceAnchors: SOURCE_ANCHORS,
        anchorNearMisses: ANCHOR_NEAR_MISSES,
        recordLines: [RECORD_FINDINGS, RECORD_RESIDUALS],
        manifestControls: MANIFEST_CONTROLS,
        lockControls: LOCK_CONTROLS,
        npmignoreControls: NPMIGNORE_CONTROLS,
        shadowedManifest: SHADOWED_MANIFEST,
        manifestTree: MANIFEST_TREE,
        sourceControls: SOURCE_CONTROLS,
        entryControls: ENTRY_CONTROLS,
        launchControls: LAUNCH_CONTROLS,
        pipelineTree: PIPELINE_TREE,
        pipelineLink: PIPELINE_LINK,
        segmentTree: SEGMENT_TREE,
        reachProbe: REACH_PROBE,
        reachControls: REACH_CONTROLS,
        reachNegative: REACH_NEGATIVE,
        reachDense: REACH_DENSE,
        walkControl: WALK_CONTROL,
        registrationTree: REGISTRATION_TREE,
        descriptorControls: DESCRIPTOR_CONTROLS,
        committedForms: Object.keys(COMMITTED_FORMS),
        unreadForms: Object.keys(UNREAD_FORMS),
        workspaceFiles: WORKSPACE_FILES,
        composed: COMPOSED_MODULE,
        comment: COMMENT_MODULE,
        otherVocabulary: [OTHER_VOCABULARY_MODULE, OTHER_VOCABULARY_DESCRIPTOR],
        registrationVocabulary: REGISTRATION_VOCABULARY_MODULE,
        otherLaunch: OTHER_LAUNCH_MODULE,
        armedIds: ARMED_IDS,
        splitSpelling: SPLIT_SPELLING_MODULE,
        otherVocabularyMembers: OTHER_VOCABULARY_MEMBERS,
        outsideTree: OUTSIDE_TREE,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const name of DISTRIBUTIONS) expect(fold(name), `${name} folds to hold the stem`).toContain(STEM);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const judged = ROWS.filter(row => row.id !== "Q");
    expect(judged.map(row => row.label), "rows A, B and C are the acceptance's three clauses, in order").toEqual(acceptanceClauses(notes));
    const recorded = recordResiduals(notes);
    expect(
      json({ pins: Object.fromEntries(judged.map(row => [row.id, recordPins(notes, row)])), residuals: recorded }),
      "the delivery record's CLAIM, FINDINGS and OTHER RESIDUALS lines read as the roster holds them",
    ).toStrictEqual(ROSTER.record);
    for (const row of judged) {
      const named = recordPins(notes, row);
      expect(named.length, `the delivery record's CLAIM line for row ${row.id} was read`).toBeGreaterThan(0);
      expect(row.pins, `row ${row.id} keeps every pin the delivery record's CLAIM line names`).toEqual(expect.arrayContaining(named));
    }
    expect(recorded.length, "the delivery record's FINDINGS and OTHER RESIDUALS lines were read").toBeGreaterThan(0);
    const kept = Object.entries(RESIDUALS).flatMap(([family, pins]) => pins.map(pin => `${pin} ${family}`));
    expect(kept, "row Q keeps every residual family the delivery record pairs with a quiet-row pin, with that pin").toEqual(expect.arrayContaining(recorded));
    const distribution = titleDistribution(title);
    expect(distribution, "the title's distribution word is the producer's distribution").toBe(DISTRIBUTIONS[0]);
    expect(fold(distribution).replace(/sdk$/, ""), "the stem is the title's distribution word, its SDK suffix dropped").toBe(STEM);
    expect(title, "the title names today's flag-bearing rf previews").toContain(`today's ${NO_COMMIT} rf previews`);
    expect(titleArtifact(title), "A3 judges the title's artifact").toBe(ARTIFACT);
    const witnessA3 = rosterWitness("A3");
    expect(isObject(witnessA3) ? witnessA3.artifact : undefined, "A3's roster witness names the title's artifact").toBe(ARTIFACT);
    const witnessA4 = rosterWitness("A4");
    expect(isObject(witnessA4) ? witnessA4.flag : undefined, "A4's roster witness reads the title's flag").toBe(NO_COMMIT);
    const witnessB1 = rosterWitness("B1");
    const formsB1 = isObject(witnessB1) && isObject(witnessB1.forms) ? Object.keys(witnessB1.forms) : [];
    expect(formsB1, "B1's roster witness judges every committed form").toEqual(Object.keys(COMMITTED_FORMS));
    for (const marker of notesMarkers(notes)) expect(formsB1, `B1's roster witness refuses the notes' ${marker} marker`).toContain(marker);
    expect(notesMarkers(notes), "the notes name three markers").toHaveLength(3);
    const authority = notesAuthority(notes);
    const producer = ROSTER.producer;
    expect(authority.citation, "the notes cite the vendored producer line").toBe(`${String(producer.path)}:${String(producer.line)}@${String(producer.pin)}`);
    expect(typeof producer.text === "string" ? producer.text : "", "the notes' Authority quote is the producer line's sentence").toContain(authority.quote);
    expect(authority.quote.length, "the Authority quote was read").toBeGreaterThan(0);
    expect(sha256(typeof producer.text === "string" ? producer.text : ""), "the vendored producer line's SHA256").toBe(producer.sha256);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", { timeout: 60_000 }, ({ task }) => {
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
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
