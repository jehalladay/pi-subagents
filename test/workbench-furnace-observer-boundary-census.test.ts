/**
 * wb-dqf.1 (FURNACE-CAC-EXECUTION-ASSURANCE-R4, program-triage-2026-10-18), the Furnace observer-boundary census: the
 * until-then leg of a trigger-gated requirement whose record has not shipped.
 * Statement (the bead's tracker-export title, verbatim; the export spells each dash as the six characters backslash, u, 2,
 * 0, 1, 4, read here as DASH): "When Furnace ships FurnaceObserverBoundaryV0 (proposed, not shipped), Pi's Furnace observer
 * shall consume it as an admitted observer strictly within the boundary DASH reading only the attempt state/log fields and
 * resource counters it exposes, under its stated visibility policy for admitted client decisions DASH never widening today's
 * bounded read-only polling; until then zero Pi mentions of the record."
 * Owner filing (the export notes, quoted where this file binds them): "Gating artifact: FurnaceObserverBoundaryV0, a proposed
 * source-owned reference, not shipped"; "Today the external Furnace reader is explicit bounded status/attempt/log-reference
 * polling (docs/09 § Experimental projection ...)"; "Gate: the record appears in a released Furnace surface Pi vendors
 * (@furnace/sdk or Furnace docs graduating it ...)"; and the acceptance on landing (ACCEPTANCE below, verbatim).
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-26, at this census's base 32e0e2d). The vendored release Pi ships is
 * vendor/furnace-sdk-0.1.0.tgz (package.json and package-lock.json resolve @furnace/sdk to it; 128 regular tar entries, all
 * text, all under package/, no pax or link entries; sha256 aaa57dcfb1c205ec...). No entry spells the record or any observer-boundary
 * form (the trigger has not fired). Pi: git lists 987 files outside .beads/ (982 text, 716 scripts, 5 binaries: two media
 * files and the three vendored tarballs) and none spells the record or the observer-boundary stem; at the filing pin
 * b21beb0 (the ledger hop that added the bead to the export: its row is in that commit's export and not in its parent's)
 * the 707 files outside .beads/ spell it nowhere either. src/workbench/furnace-observer.ts declares FurnaceObserverClient with
 * exactly three read paths (runs.get.status, attempts.list, logs.read), calls each once with a timeoutMs call bound (the two
 * list reads also carry a limit), bounds its poll loop by maxPolls and maxElapsedMs, imports @furnace/sdk for types only and
 * labels its ownership 'external'; docs/workbench/09 § Experimental projection states the same three reads and that Pi
 * attachment "does not create, resume or stop a Run". No src, docs or tracker text is edited by this cut.
 *
 * THE JUDGE. A MENTION is the word "observer" (or "observers", "observer's", "observers'"), then any run of characters that
 * are neither letters nor digits (spaces, newlines, underscores, hyphens, dots, quotes, markup, format characters), then
 * "boundary" or "boundaries", in any case - the record's own middle words (recordWords), so every spelling of the record and
 * of its family (any version, with or without the producer prefix) is read. Each file's own path is read ("path"). A file
 * holding a NUL byte is binary and its content is not read. Every other file is read as raw text ("raw"); a script (.ts .tsx
 * .mts .cts .js .jsx .mjs .cjs) also through the TypeScript AST - each string-like literal by its cooked value, each
 * identifier spelled with an escape by its cooked name and each template part by its cooked text, a substitution ending
 * the part ("cooked"), and each chain of "+" whose operands are all string literals by its folded value ("folded"); a .json
 * file also by its parsed keys and string values ("cooked"); a markup file (.md .html .htm .xml .svg) also with its
 * numeric character references, each spelled with its semicolon and of up to eight decimal or seven hex digits (a
 * longer one is NOT CLAIMED either way; OVER-READS), decoded two ways - as the HTML standard decodes them
 * (numericReference: a code point of the standard's 0x80-0x9F table, NUMERIC_REFERENCES, to its Windows-1252 character, so
 * &#146; reads as U+2019; 0, a surrogate and a code point above 0x10FFFF to U+FFFD; any other to itself) and each to its
 * own code point (decodedCodePoints, the landed reading; one above 0x10FFFF left as written), a mention in either reading
 * read, so neither narrows the other (wb-s876 cut #3) - and the six named entities amp, lt, gt, quot, apos and nbsp, each
 * with its semicolon, decoded ("decoded"); a YAML or TOML file (.yml .yaml .toml)
 * also with its backslash escapes (U, u and x forms) decoded ("decoded"). These decoder claims - the markup and
 * YAML/TOML file kinds, the six names, the reference lengths, the hex digit range at its ends, the edges of both
 * readings and the three escape forms - are each pinned through THE JUDGE's own decoders (THE JUDGE'S PINS, cut #6). A
 * file's forms are the readings that found a mention. judgeScope reads an entry list in one call, so every leg judges its planted
 * entries after the real ones: the findings must be exactly the plants', so a real mention, a hollowed judge or a result
 * forced empty reds.
 * THE JUDGE'S PINS (cut #6; ruling R-B316, claims equal to pins). Z2 plants, each a planted file that spells the
 * record through one reading (its one form in Z2's witness): one per markup kind beside the .md plants (.html, .htm, .xml and .svg, each across &#32;); one
 * per named entity of the six (&amp;, &lt;, &gt;, &quot; and &nbsp; between the words, &apos; in the possessive); four
 * of the eight-decimal-digit and seven-hex-digit references, one per length and reading (&#00000146; and &#x0000092;
 * in the possessive, which only the HTML standard's reading reads as U+2019, and &#00000136; and &#x0000088; between
 * the words, which only the code-point reading reads as the separator U+0088); a .yaml page spelled with the x form
 * (the .yml and .toml plants spell the u and U forms); and, for the script and JSON readings, a template's head and its
 * tail and a backtick literal, each spelled with an escape, a private name spelled with an escape, a "+" chain folded
 * across a parenthesized operand and one of backtick operands, and a JSON array's string value spelled with an escape.
 * W1 asserts, on THE JUDGE's decodedMarkup and decodedCodePoints: each of the six names in upper case and in a mixed
 * case; the low surrogates U+DC00 and U+DFFF (U+FFFD in the standard's reading, themselves in the code-point reading)
 * and U+10FFFF (itself in both); and a one-digit hex reference and the hex digits a and f in either case.
 *
 * ROWS. T, the trigger clause, one pin per quoted part: T1 the release package.json resolves @furnace/sdk to is read entry
 * by entry (an entry floor, no skipped entry kind and no binary entry, every type the observer imports or re-exports from
 * @furnace/sdk declared by the release's .d.ts, a planted re-export of an undeclared name read as one) and spells no mention, a planted declaration is found by the same call - ARMED: when a
 * re-vendor brings the record, T1 reds naming the acceptance on landing as owed; T2 the record's release forms (declaration,
 * runtime export, schema id, registry key, docs heading, escape-spelled string, escape-spelled JSON) each found; T3 the
 * release's identity (package.json spec, lock resolution, version and
 * integrity, the tarball's own name, version and sha256) and the owner's recorded status, so any re-vendor reds T3 and
 * re-reads T1. W, the baseline the armed half must never widen: W1 the declared read surface (every declaration of the
 * name FurnaceObserverClient in the observer module and in every module augmentation of it in a listed Pi script - an
 * interface for its member chains down to a leaf and each heritage type, read as the path `<extends T>`, and any other
 * declaration of the name, a class included, read whole as the path `<K FurnaceObserverClient>` - and the type of the
 * constructor's client parameter) equals docs/09's three reads one to one, docs/09 read by docs09Reading of
 * test/helpers/furnace-docs-reading.ts (the reader wb-aalz landed; cut #5: the plants W1 pins are the F1 READ SET's,
 * those the reading does not count R-DOCS-UNCOUNTED's), and a widened interface, a planted augmentation, the
 * heritage plants, the non-interface plants and the docs plants are read as widened or refused; W2 every client read carries a timeoutMs bound, the list reads a
 * limit, and the poll loop both budgets, an unbounded plant read as such; W3 every client use is one of the three read calls
 * (no alias, no other member), the SDK is imported for types only (no value import, value re-export, import-equals
 * require, dynamic import or require call; a planted re-export and import-equals read as runtime loads), close() reads nothing, no docs/09 excluded verb is called,
 * the ownership label is 'external', and a control plant is read as one. Z, the until-then duty: Z1 the trigger is unfired
 * today and the same judge over the filing pin's objects reads no mention, the pin being where the row was filed, with a
 * byte floor and content-liveness anchors over the blobs the judge read; Z2 every listed Pi file (tracked plus
 * untracked-not-ignored, minus the tracker and the holders) spells no mention, with file, script, binary and byte floors,
 * content-liveness anchors read from the text the judge read, and planted entries of each reading found; Z3 the record's identity: its words
 * from the export title, every spelling form read, and the observer's own identifiers and the sibling record (named in
 * wb-dqf.2's export title) quiet. Q, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote, claims and witness, the constants (READERS and ANCHORS included) and every registered test
 * title - is held to the out-of-file roster (test/fixtures/furnace-observer-boundary-roster.json), and every case names a
 * reader of the subject (READERS), so a case returning a constant witness reds.
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - its title, read after its requirement-id prefix,
 * is tiled in order by row T's label, the armed clause (ARMED), row W's label and row Z's label with nothing but separators
 * (whitespace, comma, semicolon, colon, period, parentheses, DASH) between them, and each row's pin quotes tile its label the
 * same way, so a row of T, W or Z, or one of their pins, removed from ROWS, the literal, QUOTES, CLAIMS, IMPL and the roster
 * together still reds; the record is the title's token after "When Furnace ships " and the notes' gating artifact; MENTION
 * is built from its words; the recorded status, the gate sentence, the docs/09 citation and ACCEPTANCE are the owner
 * filing's own text (ownerFiling: the notes' first two blocks, so an appended note quoting them never masks a replaced
 * original, a planted control of each kind read), the filing is pinned byte for byte (FILING_SHA256) and each bound owner
 * sentence's lead (OWNER_LEADS) stands in it exactly once, an in-filing duplicate asserted against both; docs/09's section names the reads W1 pairs and the verbs W3 excludes, and the owner filing cites that section; the filing pin's export holds the row and its parent's does not; the sibling
 * record is wb-dqf.2's title token.
 * CLAIMS: each quoted pin carries claims - terms tiling its quote, each naming the witness facts (top-level keys) that show
 * it; a pin's live witness holds exactly its claimed facts, each fact under one term, and no pin's live witness holds
 * another pin's claimed facts (the claims bound), so a case swap reds at the swapped pin's claims beside its roster witness.
 * FOLLOW-UP wb-6c6i (R694, from the wb-dqf.1 gate cmd_3dcd6d57ec8d at landing 536; F1 leads, F2-F7 ride): F1 docs/09 was
 *   read raw (the first heading by indexOf, bounded only at the next raw '## ', regexes over comments and fences, and Z2's
 *   polling liveness an includes-anywhere check), so the gate's G17 hidden copy, G18 decoy heading, G19 appendix and G20 fence
 *   stayed green; the section is now the landed docsSection binding and both sentences came from rendered paragraph blocks,
 *   each exactly once among them (wb-s876 F1 restated the reading to its READ SET's plants), in a section without HTML, the six docs
 *   plants pinned in W1. F2 a case returning a constant witness
 *   (H9a Z2, H9b Q5) stayed green; the judged set now requires every case to name a reader of the subject. F3 Z2's liveness
 *   read through textOf and Z1 had none, so truncated real reads (H1P, H6) stayed green; both now read the anchors from the
 *   text the judge read, beside byte floors. F4 YAML/TOML escapes (G03, G03b) and escaped identifiers (G04) were not read;
 *   they are now ("decoded", "cooked"), each planted in Z2, and the escape kinds still not decoded are named in R-INTERIOR.
 *   F5 runtime imports and imported names skipped export-from and import-equals (G13, G13b); both are read, plants in T1
 *   and W3. F6 a module augmentation of the observer in another file (G06) widened the client unseen; W1 reads them from
 *   every listed script, a planted one pinned. F7 the notes anchors were includes-anywhere, so a weakened owner sentence
 *   with a later verbatim quote (G22b) stayed green; they read the owner filing only, G22b and G22a controls asserted.
 * FOLLOW-UP wb-s876 (R694 hop 3 of the wb-dqf.1 -> wb-6c6i chain, in the R739 TERMINAL enumerate-the-resolvable form;
 *   from the wb-6c6i gate cmd_8f95838754ef at landing 609; F1 leads, F2 and F3 ride). Each class names its read set as
 *   the criterion, the gate's survivors are cured inside it, and a member outside it is a named residual with a pinned
 *   quiet row. F1, docs-truth over the rendered blocks: the gate's L2-D1 blockquote, L2-D2 list item and L2-D3 table
 *   cell each restated a widened reads sentence beside the real paragraph and stayed green, as both sentences were taken
 *   from paragraph blocks only. READ SET (restated by cut #5, the R-B206 re-cut riding the child's landed reader):
 *   docs/09's section is read by docs09Reading of test/helpers/furnace-docs-reading.ts, the reader the child bead
 *   wb-aalz extracted from cut #4's copy and landed (landing 807), over test/helpers/census.ts's rendered view; this
 *   file's copy of it is deleted (THE JUDGE's decoders below are THE JUDGE's own). The reader's own rules - its text
 *   units, decodings, folds and removals, and the references
 *   and controls it refuses - are NOT CLAIMED by this census beyond the readings of the plants named here; the child
 *   census test/workbench-furnace-nested-rendering-census.test.ts pins that reader's readings on its own tables (PAIRS,
 *   INVERSION, CLAIM WORDS, CAP WORDS) and states its own NOT CLAIMED scope. Of the reading this census claims, on
 *   docs/09's section: (1) on the real page it binds, finds no HTML and states the reads status/attempt/log-reference
 *   and the verbs create, resume and stop, each subject word once, in a paragraph, its undecoded references and its
 *   controls none (W1's docsBinding and docsReads, the outside anchors); (2) each RESTATED plant - a copy of the page with one
 *   block written right after the real Furnace paragraph, or that paragraph rewritten - refuses the reading, its reads
 *   and verbs none, and reads exactly as the roster holds it (W1's docsPlants, each plant's whole reading); (3)
 *   whitespaceControlsCopy - tab, line feed, form feed and carriage return spelled as references in a second unit -
 *   reads as the real page (W1); (4) each R-DOCS-UNCOUNTED plant reads as the real page and changes the section's block
 *   list (Q10); and (5) each R-DOCS-ELSEWHERE plant reads as the real page (Q11). Any other placement, spelling or form
 *   is NOT CLAIMED by this census. Beside the reading, W1 pins docs/09's section whole: its rendered block list (each
 *   block's kind, rendered text and, for a paragraph or list item, its markdown) is part of W1's witness
 *   (docsBinding.blocks, the adoption form's slice equality held to the roster), so on docs/09 itself a block added,
 *   removed or re-ordered inside the section, or one whose kind, rendered text or markdown changes - a restatement the
 *   reading does not count included - reds W1 (a doubled space and a line break inside the reads sentence render the
 *   same block list and do not red it, which W1 asserts; whether any other whitespace change does is NOT CLAIMED; the
 *   section holds no list, blockquote or table today, so neither a nested cell nor a nested list sits outside the pin).
 *   The RESTATED docs plants are listed, by placement and claim word, at RESTATED. Outside the reading:
 *   R-DOCS-UNCOUNTED (Q10; covered on docs/09 itself by the block pin) and R-DOCS-ELSEWHERE (Q11, outside the section
 *   and the pin). F2, augmentation heritage: L2-W4b's augmentation that only extends another interface read
 *   as no augmentation. READ SET: each declaration of the name FurnaceObserverClient (declarationsOf: every identifier
 *   spelled with it, by its cooked text, that names its parent node), in the observer module and in every module
 *   augmentation of it in a listed script - an interface declaration read for its member chains and for each heritage
 *   type as the path `<extends T>`, and any other declaration (a class, an enum, a namespace, a type alias, a function, a
 *   variable or any other node it names) read whole as the path `<K FurnaceObserverClient>` (K is class, enum,
 *   namespace, type, function or variable, else declaration), never for its members or heritage (fail closed); each
 *   such path pairs with no docs/09 read, so W1's one-to-one check reds; the heritage plants (an augmentation, the
 *   observer's own declaration) and the non-interface plants (cut #2's members below) are asserted and pinned in W1.
 *   Outside the read set: R-ALIASED-MODULE (Q12). F3, the in-filing
 *   duplicate: L2-F7a weakened the acceptance and restated it verbatim inside the filing's own block, and stayed green.
 *   READ SET: the whole owner filing, pinned byte for byte by FILING_SHA256, and each bound sentence's lead
 *   (OWNER_LEADS) exactly once in it, the L2-F7a duplicate asserted against both in the outside-anchor case; nothing
 *   inside the filing's two blocks is outside the read set, so F3 names no residual (a note appended after a blank line
 *   leaves the filing as it was, G22a). Measured at cut #2's base ee48709, at cut #3's base 42ab54d, at cut #4's base
 *   89109cd, at cut #5's base 04c8bbb and at cut #6's base f5cb912: docs/09's section renders three paragraphs and no other block, holds no character reference, no non-ASCII character and no
 *   control character, and each subject word occurs once, in the third; the observer declares FurnaceObserverClient once,
 *   as its interface, and no listed script augments the observer, declares the name under another specifier or declares
 *   a global interface Object; the filing reads fb66562ab5acae93, each lead once.
 * CUT #2 (the wb-s876 respin: refusal #1, gate s142, outbox O:1367; U1 HIGH and U2 MEDIUM cured, F3 rides; the same
 *   R739 TERMINAL form, hop 3). U1, the F2 class: a CLASS declaration of FurnaceObserverClient in an observer
 *   augmentation (the gate's G-W1-CLASS-OPT2, and G-W1-CLASS-EXT-OPT2, extending a class that holds the member) read as
 *   no augmentation, as only interface declarations were read; every other declaration of the name now reads whole (the
 *   F2 READ SET above): the two gate forms, the other kinds (a namespace, an enum, a type alias, a function and a
 *   variable) and a class declared beside the observer's own interface are asserted and pinned in W1. U2, the F1 class:
 *   subject words spelled with named references outside the six (&shy;, &zwnj;, &zwj;, &NoBreak;, &ZeroWidthSpace;,
 *   &afr;/&pfr;, &aopf;/&popf;; in a blockquote, a list item, a table cell, an h3 and the verbs sentence) read as stated,
 *   against the old READ SET's "character references decoded"; that cut's read set named the six and read any other
 *   named reference a unit held as refusing the reading (fail closed: the full HTML entity table is not read), the soft
 *   hyphen's numeric and raw spellings of the same rendered page pinned beside them. F3 (rides): default-ignorable code
 *   points that are not format characters (U+034F, U+FE00, U+FE0F, U+3164, U+17B4) inside the subject words read as
 *   stated; that cut removed them. In the same F1 class, a right-to-left override (U+202E, raw or as &#x202E;) shows a
 *   reader reversed subject words ("redaer ecanruF" as "Furnace reader") that subjectText held in stored order; that
 *   cut read any bidi control a unit held as refusing the reading. Each docs member is pinned in W1's RESTATED list.
 * CUT #3 (the wb-s876 respin: refusal #2, gate s148, outbox O:1436; U1 MEDIUM cured, F2 and F5 taken; the same R739
 *   TERMINAL form, hop 3; ruling R-B125: the F1/U2 class frozen, every member enumerated with a falsifier). U1, the F1
 *   class: the subject word's possessive spelled with a numeric reference in the HTML standard's replacement range
 *   (&#146;, &#x92;) read as stated in every placement - a blockquote, a list item, a table cell, an h3, a second
 *   paragraph and the widened reads restatement - as subjectText decoded it to U+0092, a C1 control, while the page
 *   decodes it, as the HTML standard does, to U+2019, the possessive's own form; the raw U+2019, &#8217;, &#x2019; and
 *   &rsquo; spellings of the same page refused. That cut decoded numeric references as the HTML standard decodes them
 *   (THE JUDGE's numericReference, then shared with the docs reading), so each placement refused the reading: the seven
 *   gate placements, a zero-padded (&#0146;) and an upper-case hex (&#X92;) spelling are pinned in W1's RESTATED list
 *   beside their six proper-spelling controls; each numeric spelling's subject reading is asserted equal to its raw
 *   U+2019 control's (one page, one reading; through docs09Reading since cut #5); the judge's decoding of 0, a
 *   surrogate, a code point above 0x10FFFF and the table's edges is asserted; the table is a bound constant held to the
 *   roster; and the judge's own reading is planted in Z2 (a markup file spelling the record's possessive with &#146;).
 *   Both decodings are kept wherever THE JUDGE reads a markup reference, so neither narrows the other: THE JUDGE reads
 *   a mention under the HTML standard's decoding or under the landed code-point decoding (decodedCodePoints; a markup
 *   file's &#136; between the words still reads as the separator U+0088, as on trunk, and a Z2 plant pins each half),
 *   and that cut's controlCharacters read both. F5: a control character subjectText kept (a C1 control the table does
 *   not remap, &#141;, a raw U+0081 or U+0092, a C0 control) read as stated; that cut read any control character but
 *   tab, line feed, form feed and carriage return a unit held in either decoding as refusing the reading beside the
 *   bidi controls (controls), so a reference into 0x80-0x9F, which XML and CommonMark read as its C1 control, refused
 *   wherever a unit held one, a letter the table maps it to between Furnace and read included (&#136; to U+02C6; &#153;
 *   to U+2122, which NFKC folds to TM); each member is pinned in RESTATED. F2: a global declaration of interface Object widens every object type's apparent members,
 *   the client's included, without declaring the name; it is named in R-OTHER-MODULE (Q8 pins a planted one quiet for W1
 *   and the listed scripts holding none). The apostrophe look-alikes and the private-use and unassigned code points
 *   subjectText kept are named in R-DOCS-UNCOUNTED (Q10), and the references without their semicolon in R-INTERIOR (Q6).
 * CUT #4 (the wb-s876 FINAL cut: refusal #3, gate s156, outbox O:1515, the F1 class's third failure; ruling R-B157, the
 *   rule-19 structural exit: the nested-placement rendering coverage is the child bead wb-aalz's, and this cut is bound
 *   to the fail-closed core - the docs09 claims restated to exactly the placements the reader proves, the
 *   nested-placement hole stated, no claim word without a falsifier). U1, the F1 class: at that cut a list nested in a
 *   blockquote that is itself nested in a blockquote or a list item added no text to its unit, so the gate's eight
 *   restatements there left the reading stated against the old READ SET's "the blocks nested in either". That cut kept
 *   the reader and restated the claims (among them the READ SET, docs09Units, docs09Reading, subjectText, DOCS09_SUBJECTS,
 *   R-DOCS-UNCOUNTED and OVER-READS), listed its placement plants at RESTATED, and named the hole in R-DOCS-UNCOUNTED -
 *   the gate's eight placements; a blockquote, a list, a named reference and a control character inside such a list; a
 *   table in a quote in a quote and in a list item in a list item; and a named reference and a control character in a
 *   nested table cell - each quiet for the reading and red for the block pin, asserted in Q10, with HTML inside the hole
 *   refusing the reading whole (htmlInHoleCopy). Further claim words of the docs09 reading gained falsifiers: RESTATED
 *   plants for the subject-word forms, a second subject word in the real paragraph, the six named references where
 *   subjectText alone decodes them, a mathematical letter, the reads and verbs frames matched as written, the controls'
 *   edges and the reference over-reads; a W1 assertion that tab, line feed, form feed and carriage return read as no
 *   control (whitespaceControlsCopy); and a Q11 pin of R-DOCS-ELSEWHERE's Reader adapters line. F2 (a residual-list
 *   addition): the possessive apostrophes U+0060, U+00B4, U+2032, U+02BB, U+FF40 and U+055A read as stated beside
 *   U+02BC and U+2018, and NFKC folds U+00B4 and U+FF40 (asserted in Q10), so "a look-alike NFKC does not fold" did not
 *   describe them; R-DOCS-UNCOUNTED named the eight, each pinned in Q10. Also withdrawn as wider than the reader:
 *   subjectText's "the rendered view keeps references as written" (it decodes &amp;, which ampExposedCopy pins) and
 *   OVER-READS' "wherever it sits". Refusal #4 (gate s159, outbox O:1578) found that cut's "Each of these placements is
 *   a RESTATED plant that refuses the reading" and subjectText's "Each decoding, fold and removal is pinned by a
 *   RESTATED plant" wider than their pins: seven one-edit reader members (GM7, HM1, HM2, GM1, GM3, GM4, GM2) kept the
 *   census green; both sentences are withdrawn at cut #5.
 * CUT #5 (the R-B206 re-cut of the FINAL cut #4, cut after the child wb-aalz landed at landing 807: refusal #4 refused
 *   cut #4 on rule 16 LEG 2 and the R-B157 floor; R-B157 pre-bound and R-B206 executed the R-B86-branch DEPENDENCY
 *   INVERSION, folding refusal #4's unmet U1 (GM7, HM1, HM2, GM1) and U2 (GM3, GM4, GM2) into wb-aalz, whose census
 *   pins each in its INVERSION case; under that branch this bead's final cut is a mechanical restatement riding the
 *   child's landed reader, its claims narrowed to what the landed pins prove). The docs/09 reading is imported -
 *   docs09Reading and its Docs09Reading type from test/helpers/furnace-docs-reading.ts, the module wb-aalz extracted
 *   from cut #4's copy - and this file's copies are deleted: docs09Reading, docs09Units, Docs09Unit, controlCharacters,
 *   undecodedReferences, subjectText, DOCS09_SUBJECTS, READS_SENTENCE, VERBS_SENTENCE and Docs09Reading, whose code
 *   equals the helper's (its section constant is spelled without the '## ', and its interface carries one more residual
 *   sentence), so every docs/09 reading here (W1, Q10, Q11, the outside anchors and Z2's docs/09 liveness) runs the
 *   code the child census pins. U1 and U2 are cured
 *   through that pin: each of the seven members, applied where the reading now runs it (the helper's docs09Units,
 *   undecodedReferences, subjectText, controlCharacters and namedEntity; test/helpers/census.ts's blockText and
 *   renderedOther), reds the child census's INVERSION case; the two sentences refusal #4 cited are withdrawn (above),
 *   and the reading is claimed on the READ SET's named plants only. THE JUDGE keeps its own decoders (NAMED_ENTITIES,
 *   namedEntity, NUMERIC_REFERENCES, numericReference, decodedReferences, decodedMarkup and decodedCodePoints), no
 *   longer shared with the reading; the claim words of its namedEntity (own keys only, any case) gain a falsifier in W1.
 *   W1's possessive-spelling assertion reads each spelling's subject words through docs09Reading instead of
 *   subjectText. The landed rendered view now reads a nested blockquote's block children (test/helpers/census.ts
 *   blockText, wb-aalz), so a list nested in a blockquote that is itself nested in a blockquote or a list item adds its
 *   text to its unit: cut #4's twelve Q10 rows of that placement now refuse the reading and move to RESTATED (each
 *   plant text unchanged, each name given the Copy suffix), and htmlInHoleCopy, HTML in such a list, still refuses,
 *   the list's subject words now counted. Refusal #4's riding findings: F3 (Q10 pinned its rows by name and two
 *   booleans, so a hollowed plant kept them) - Q10's witness now holds each plant's text; F4 (the block pin's
 *   whitespace sentence was wider than its pin) - narrowed to the in-sentence change W1 asserts.
 * CUT #6 (the R-B316 restatement of cut #5: refusal #5, gate s179, outbox O:1744, found the claim words cut #5 kept for
 *   THE JUDGE's unshared decoders without a falsifier - seven one-edit members, GJ-NE-NBSP, GJ-NE-LT, GJ-NE-GT,
 *   GJ-NE-QUOT and GJ-NE-APOS on NAMED_ENTITIES (U1) and GJ-LEN-DEC and GJ-LEN-HEX on the reference length (U2), each
 *   realized by a paired real-tree page; R-B316 bound this cut to claims equal to pins, pin preferred). Each decoder
 *   claim of THE JUDGE gains a falsifier (THE JUDGE'S PINS), so each of the seven members reds Z2, the five names W1
 *   as well; the one claim no plant can match, 'whatever its length', is narrowed to the pinned lengths (OVER-READS),
 *   a longer reference NOT CLAIMED either way. A one-edit sweep of THE JUDGE's readings on cut #5's bytes found more
 *   members of the same shape green - the nbsp value, the low surrogates, U+10FFFF in either reading, a one-digit hex
 *   reference, the hex digits a and f, the .html, .htm, .xml, .svg and .yaml kinds, the x form, a template's head and
 *   tail, a backtick literal and fold, a parenthesized fold, a private name and a JSON array value - and each is pinned
 *   there too. No reader is added; the docs/09 reading, its plants and the shared reader
 *   (test/helpers/furnace-docs-reading.ts, test/helpers/census.ts) are unchanged.
 * RESIDUALS (named, each with its pinned quiet row): R-TRACKER the tracker export (.beads/) is not a Pi scope: the bead's
 * own row spells the record (Q1); R-HOLDER this file and its roster spell it and are excluded by name (Q2); R-BINARY a file
 * holding a NUL byte is not read (Q3); R-PARAPHRASE "observed boundary" and "observation boundary" are not the record's
 * words (Q4); R-WORD-ORDER the words in the other order are not read (Q5); R-INTERIOR a character inside a word (a format
 * character, a confusable letter, markup), an HTML entity outside a markup file, a named character reference other than
 * the six in a markup file (cut #2), a reference without its semicolon, numeric (&#146s) or named (the HTML standard's
 * legacy forms, &amp among them), which an HTML page decodes and markdown shows as written (cut #3), a spelling a bidi
 * override reverses (the words stored backwards; cut #2), or a
 * backslash escape in a file kind whose escapes are not decoded (a shell script, plain text: only scripts, .json, markup
 * entities and YAML/TOML are decoded) hides it (Q6); R-COMPUTED a template substitution, a runtime join or a computed character between word parts is not read
 * (Q7); R-OTHER-MODULE W reads only the observer module and its module augmentations in the listed scripts:
 * src/workbench/furnace-control.ts calls docs/09's excluded verbs and is out of W's scope, and a global declaration of
 * interface Object (in declare global, or at the top level of a file that is not a module) widens every object type's
 * apparent members, FurnaceObserverClient's included, without declaring the name: W1 does not read it (a planted one reads
 * as no augmentation) and the listed scripts hold none (globalObjects; cut #3) (Q8); R-COMPUTED-ACCESS a client reached through a computed key is
 * not read as a client use (Q9); R-DOCS-UNCOUNTED the docs/09 reading does not count these restatements inside
 * docs/09's section, each a Q10 plant: a paraphrase (the Furnace observer); a subject word holding a confusable letter
 * (U+0430, U+043E); a possessive whose apostrophe is U+02BC, U+2018, U+0060, U+00B4, U+2032, U+02BB, U+FF40 or U+055A
 * (cut #4); a subject word holding a private-use (U+E000) or an unassigned (U+0378) code point (cut #3); a table nested
 * in a blockquote, in a list item, in a blockquote in a blockquote and in a list item in a list item, and a named
 * reference and a control character in a table nested in a blockquote (cut #4; the child census's R1 TABLE-CHILD);
 * and a link's, an image's and a link reference definition's title: each plant reads as the real page reads, while
 * on docs/09 itself each adds a block or changes a block's text or markdown, which the section's block pin (W1) reds
 * (Q10 holds each plant's text and both readings, and asserts each); any other spelling or placement is NOT CLAIMED
 * either way (since cut #5 a list nested in a blockquote that is itself nested in a blockquote or a list item is
 * read: RESTATED);
 * R-DOCS-ELSEWHERE a restatement outside the bound section - a later heading of level 1 or 2 (it ends the section),
 * another section of docs/09 (its Reader adapters list already names a Furnace event stream, a line Q11 pins) or another page - is not
 * read (Q11); R-ALIASED-MODULE a module declaration whose specifier reaches the observer only
 * through configuration (tsconfig paths, package.json imports) is not read as an augmentation, and the listed scripts
 * hold none (Q12).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together, its
 * claims rewritten with them; a plant or control edited in IMPL and the roster together; a floor lowered with the roster; a
 * bound constant - FILING_SHA256, OWNER_LEADS, RESTATED or NUMERIC_REFERENCES - edited in this file and the roster together (the
 * digest binds the filing as this file was cut, not the owner's intent); a
 * residual row removed from ROWS, the literal, IMPL, RESIDUALS and the roster (no outside anchor names the residual
 * families); the outside-anchor case or the closing case removed with its roster title; a case that names a reader and
 * discards what it read (the reader-keeping constant: the judged set requires a reader's name, not its use); a judge edited
 * to read less of a file than the text it keeps as read, or to spare the anchor files from a truncation that keeps the read
 * bytes above the floor (a scan edited to tell the anchors from the rest); any rule of the docs/09 reader,
 * test/helpers/furnace-docs-reading.ts, beyond the readings of the plants the READ SET names (cut #5).
 * ARMED HALF PENDING: the clause ARMED (consume the record within the boundary: exposed fields only, non-exposed fields as
 * typed absence, the visibility policy honoured, a docs/07 sentence bound by a census) has nothing to read until the record
 * ships; no record is faked here. T1 binds it: the census reds with ACCEPTANCE the moment the vendored release spells it.
 * OVER-READS (disclosed; none today): any "observer ... boundary" prose reads as a mention, a heading or list break between
 * the words included; a YAML/TOML backslash sequence in a single-quoted or literal string is decoded; a bare module
 * specifier whose last segment is furnace-observer is read as the observer module (W1); any heritage type of
 * FurnaceObserverClient reads as a widening, an empty interface extended included; any declaration of the name other than
 * an interface reads as a widening too - a namespace, a value, a member, a parameter, a specifier or a property access
 * named by it included, nested anywhere in the observer module or an augmentation (a namespace's own, a function's
 * local), as an interface nested there reads too. In docs/09's section the over-reads this census pins are RESTATED
 * plants a page would show as no restatement, each refusing the reading (cut #5: these, and no other over-read of
 * the reading, are claimed): a second subject word in the real paragraph (secondSentenceCopy); the readiness and
 * reattachment word parts (readinessCopy, reattachmentCopy); a sentence split across a table's cells, read joined
 * (tableSplitCopy); a named reference other than the six that renders no subject word (copyrightCopy), one that
 * renders what a decoded spelling renders (nonBreakingSpaceCopy, &NonBreakingSpace; for &nbsp;), one in a code span
 * (codeSpanReferenceCopy) or a code block (codeBlockReferenceCopy), where the page shows it as written, and one the
 * rendered view exposes by decoding the &amp; before it (ampExposedCopy; test/helpers/census.ts decodes &amp; first);
 * a raw left-to-right mark between words (bidiMarkCopy), and U+007F and U+000B spelled as references (delReferenceCopy,
 * verticalTabCopy); a numeric reference in a code span (numericCodeSpanCopy), in a code block (numericCodeBlockCopy),
 * behind a decoded &amp; (numericAmpCopy), and of eight decimal or seven hex digits (numericLongCopy,
 * numericLongHexCopy; marked 18.0.11 keeps a reference in its HTML only up to seven decimal or six hex digits and
 * escapes a longer one, which the page shows as written); and a reference into 0x80-0x9F that the HTML table maps to
 * a character a page shows (&#146; to U+2019 in windows1252QuoteCopy and its placements, &#136; and &#153; in
 * tableLetterCopy and tableTrademarkCopy), refused as its code-point reading is a C1 control. THE JUDGE decodes a
 * markup file's numeric reference of eight decimal or seven hex digits, one past the longest marked keeps, in both
 * readings, so a mention either spells counts although a markdown page shows such a reference as written (THE JUDGE'S
 * PINS: four Z2 plants, one per length and reading); a longer reference is NOT CLAIMED either way. The augmentation read parses only
 * a script whose text spells "module" (a module declaration's keyword cannot be escape-spelled). SCOPE: files git ignores (node_modules/, .forge/ and the rest of .gitignore) and files deleted from
 * the worktree are not listed; Furnace's own repository is never read (the gate is a release Pi vendors).
 * READS (contacts): every listed file (Z2), git objects at the filing pin (Z1), the tracker export rows of wb-dqf.1 and
 * wb-dqf.2, docs/workbench/09 (through test/helpers/furnace-docs-reading.ts's docs09Reading since cut #5, a module
 * dependency, not a read), package.json, package-lock.json, vendor/furnace-sdk-0.1.0.tgz, the structure of
 * src/workbench/furnace-observer.ts (W, Z3), the module augmentations of it in every listed script (W1) and
 * src/workbench/furnace-control.ts's calls (Q8).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory entry judged
 * by the same call as the real files; nothing is written to disk.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { gunzipSync } from "node:zlib";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { type Docs09Reading, docs09Reading } from "./helpers/furnace-docs-reading.js";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-dqf.1";
const SIBLING = "wb-dqf.2";
const EXPORT = ".beads/issues.jsonl";
const TRACKER = ".beads/";
const CENSUS_FILE = "test/workbench-furnace-observer-boundary-census.test.ts";
const ROSTER_FILE = "test/fixtures/furnace-observer-boundary-roster.json";
const HOLDERS: readonly string[] = [CENSUS_FILE, ROSTER_FILE];
/** This file's own path: a copy run from another path excludes itself beside the named holders. */
const SELF = relative(REPO, fileURLToPath(import.meta.url)).split("\\").join("/");
const OBSERVER = "src/workbench/furnace-observer.ts";
const CONTROL = "src/workbench/furnace-control.ts";
const IDENTITY = "src/workbench/identity.ts";
const SCHEMA_LITERAL = "workflow-script/v1";
const DOCS09 = "docs/workbench/09-observation-and-provenance.md";
const DOCS09_SECTION = "## Experimental projection implementation";
/** docs/09's page title: the one parent heading the section is bound under (the landed docsSection binding, D9; wb-6c6i F1). */
const DOCS09_TITLE = `09 ${String.fromCodePoint(0x2014)} Observation, telemetry, provenance and derived graph`;
const SDK = "@furnace/sdk";
const TARBALL = "vendor/furnace-sdk-0.1.0.tgz";
const LOCK_KEY = "node_modules/@furnace/sdk";
const FILING_PIN = "b21beb0f89ad49500069403c4815d58f2825b414";
const RECORD = "FurnaceObserverBoundaryV0";
const SIBLING_RECORD = "FurnaceAttemptCapabilityV0";
/** The export's dash: the six characters of a JSON escape, kept literally in the title text. */
const DASH = "\\u2014";
const RECORDED_STATUS = "a proposed source-owned reference, not shipped";
const ACCEPTANCE =
  "Acceptance on landing: a hermetic fixture feeds a boundary record through the Furnace observer and asserts only the exposed fields/counters are projected, non-exposed fields are withheld as typed absence (never invented), and client decisions honour the stated visibility policy; a docs-07 Furnace-provider sentence names the boundary and joins the wb-6hb.11-style census.";
/**
 * The owner filing (ownerFiling: the export notes' first two blocks) as this file binds it, by its sha256's first 16 hex
 * digits, so an edit inside the two blocks - a weakened sentence, an in-filing duplicate, a reordering - reds (wb-s876 F3).
 */
const FILING_SHA256 = "fb66562ab5acae93";
/** The leads of the owner sentences this file binds: the filing holds each exactly once (wb-s876 F3, the L2-F7a duplicate). */
const OWNER_LEADS: readonly string[] = ["Gating artifact: ", "Today the external Furnace reader is ", "Gate: ", "Acceptance on landing: "];
/** The title's armed clause: it binds when the record ships, so it has no judged row today (ARMED HALF PENDING). */
const ARMED = `Pi's Furnace observer shall consume it as an admitted observer strictly within the boundary ${DASH} reading only the attempt state/log fields and resource counters it exposes, under its stated visibility policy for admitted client decisions`;
/** A mention of the record: its own middle words, any non-alphanumeric run between them, any case (THE JUDGE). */
const MENTION = /observer(?:s|['\u2019]s|s['\u2019])?[^\p{L}\p{N}]*boundar(?:y|ies)/giu;
const MENTION_ONE = new RegExp(MENTION.source, "iu");
const SCRIPT = /\.(?:[cm]?[jt]sx?)$/;
const JSON_FILE = /\.json$/;
const MARKUP = /\.(?:md|html?|xml|svg)$/;
/** A file kind whose backslash escapes are decoded (YAML, TOML; wb-6c6i F4). */
const ESCAPED = /\.(?:ya?ml|toml)$/;
const FLOORS = { piFiles: 900, piScripts: 650, piBinaries: 3, piBytes: 25_000_000, sdkEntries: 100, pinFiles: 700, pinBytes: 13_000_000 } as const;
/** The content-liveness anchors: real files whose deep needles are read from the text the judge consumed (wb-6c6i F3). */
const ANCHORS: readonly string[] = [IDENTITY, DOCS09, OBSERVER];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for T, W and Z, to the bead's export title. */
const ROWS: readonly Row[] = [
  { id: "T", label: "When Furnace ships FurnaceObserverBoundaryV0 (proposed, not shipped)", pins: ["T1", "T2", "T3"] },
  { id: "W", label: "never widening today's bounded read-only polling", pins: ["W1", "W2", "W3"] },
  { id: "Z", label: "until then zero Pi mentions of the record", pins: ["Z1", "Z2", "Z3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"] },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Furnace ships",
  T2: "FurnaceObserverBoundaryV0",
  T3: "(proposed, not shipped)",
  W1: "never widening",
  W2: "today's bounded",
  W3: "read-only polling",
  Z1: "until then",
  Z2: "zero Pi mentions",
  Z3: "of the record",
};
/** Each quoted pin's claims: terms tiling its quote, each naming the witness facts that show it. */
const CLAIMS: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> = {
  T1: { When: ["fired", "sdkMentions"], Furnace: ["package", "version", "observerTypesDeclared", "typesPlant"], ships: ["entriesAtFloor", "skippedEntries", "binaryEntries", "sdkPlant"] },
  T2: { FurnaceObserverBoundaryV0: ["record", "releaseForms"] },
  T3: {
    proposed: ["recordedStatus"],
    "not shipped": ["spec", "lockResolved", "lockVersion", "lockIntegrityMatches", "tarballName", "tarballVersion", "tarballSha256"],
  },
  W1: {
    never: ["widenedPlant", "augmentationPlant", "heritagePlant", "nonInterfacePlant", "docsPlants"],
    widening: ["interfaceName", "interfaceDeclarations", "interfaceExtends", "otherDeclarations", "clientParameterTypes", "augmentations", "readPaths", "docsBinding", "docsReads", "pairs"],
  },
  W2: { "today's": ["calls"], bounded: ["pollBounds", "unboundedPlant"] },
  W3: {
    "read-only": ["clientChains", "unchainedClientUses", "sdkRuntimeImports", "runtimeImportPlant", "closeReads", "excludedVerbs", "excludedVerbCalls", "controlPlant"],
    polling: ["ownership"],
  },
  Z1: { "until then": ["triggerFired", "filingPin", "filedAtPin", "absentBeforePin", "pinFilesAtFloor", "pinBytesAtFloor", "pinLiveness", "pinMentions", "pinPlant"] },
  Z2: { zero: ["piMentions"], Pi: ["scope", "filesAtFloor", "scriptsAtFloor", "binariesAtFloor", "bytesAtFloor", "liveness"], mentions: ["piPlants"] },
  Z3: { "of the record": ["recordWords", "spellingForms", "piIdentifiersQuiet", "siblingQuiet"] },
};
/** Each residual family and its quiet row. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-TRACKER": "Q1",
  "R-HOLDER": "Q2",
  "R-BINARY": "Q3",
  "R-PARAPHRASE": "Q4",
  "R-WORD-ORDER": "Q5",
  "R-INTERIOR": "Q6",
  "R-COMPUTED": "Q7",
  "R-OTHER-MODULE": "Q8",
  "R-COMPUTED-ACCESS": "Q9",
  "R-DOCS-UNCOUNTED": "Q10",
  "R-DOCS-ELSEWHERE": "Q11",
  "R-ALIASED-MODULE": "Q12",
};
/**
 * The functions that read the subject - the vendored release, the listed Pi files, the filing pin, the tracker export,
 * docs/09, the observer, or the judge itself: every case must name one (direct names only), so a case returning a
 * constant witness reds (wb-6c6i F2, the kjg9.1 judged-set precedent).
 */
const READERS: readonly string[] = [
  "sdkRelease",
  "sdkVerdict",
  "tarball",
  "vendoredPath",
  "piListing",
  "piEntries",
  "piVerdict",
  "pinVerdict",
  "augmentations",
  "observer",
  "observerText",
  "textOf",
  "exportRow",
  "ownerFiling",
  "docs09Furnace",
  "verdictOf",
  "mentions",
  "git",
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
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
/** One row of the tracker export (one JSON object per line), found by its id. */
function exportRow(id: string, text: string = textOf(EXPORT)): ExportRow {
  for (const line of text.split("\n")) {
    if (!line.includes(id)) continue;
    const parsed: unknown = JSON.parse(line);
    if (isObject(parsed) && parsed.id === id && typeof parsed.title === "string") return { title: parsed.title, notes: typeof parsed.notes === "string" ? parsed.notes : "" };
  }
  throw new Error(`the tracker export holds no row ${id}`);
}
/** The words of a camel-case record name: Furnace, Observer, Boundary, V0. */
function recordWords(name: string): string[] {
  return name.match(/[A-Z][a-z]+|[A-Z]\d+|[A-Z]+(?![a-z])/g) ?? [];
}
/** MENTION's source, rebuilt from the record's own middle words (the anchor case compares the two). */
function mentionSource(words: readonly string[]): string {
  const first = (words[1] ?? "-").toLowerCase();
  const second = (words[2] ?? "-").toLowerCase();
  return `${first}(?:s|['\\u2019]s|s['\\u2019])?[^\\p{L}\\p{N}]*${second.replace(/y$/, "")}(?:y|ies)`;
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
const TITLE_SEPARATORS = new RegExp(`^(?:[\\s,;:.()]|${escaped(DASH)})*$`);

type Form = "raw" | "cooked" | "folded" | "decoded" | "path";
interface Entry {
  readonly path: string;
  readonly bytes: Buffer;
}
interface ScopeVerdict {
  readonly files: number;
  readonly scripts: number;
  /** The UTF-8 bytes of the text the judge read, over every entry it read (a binary is not read). */
  readonly textBytes: number;
  readonly binaries: readonly string[];
  readonly findings: { readonly [path: string]: readonly Form[] };
  /** The text the judge read for each anchor path it was asked to keep (the content-liveness anchors, wb-6c6i F3). */
  readonly anchored: { readonly [path: string]: string };
}
function entry(path: string, text: string): Entry {
  return { path, bytes: Buffer.from(text, "utf8") };
}
function mentions(text: string): boolean {
  return MENTION_ONE.test(text);
}
/** A script's cooked and folded units: each string-like literal, each template part, each all-literal "+" chain. */
function scriptUnits(path: string, text: string): { readonly form: Form; readonly text: string }[] {
  const kind = /x$/.test(path) ? ts.ScriptKind.TSX : /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const units: { form: Form; text: string }[] = [];
  const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
  const folded = (node: ts.Expression): string | undefined => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isParenthesizedExpression(node)) return folded(node.expression);
    if (isPlus(node)) {
      const left = folded(node.left);
      const right = folded(node.right);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    return undefined;
  };
  // An identifier spelled with an escape (F, \u{46}) is read by its cooked name (wb-6c6i F4); every escape spells "\u".
  const escapes = text.includes("\\u");
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) units.push({ form: "cooked", text: node.text });
    else if (ts.isTemplateExpression(node)) {
      units.push({ form: "cooked", text: node.head.text });
      for (const span of node.templateSpans) units.push({ form: "cooked", text: span.literal.text });
    } else if (isPlus(node) && !isPlus(node.parent)) {
      const value = folded(node);
      if (value !== undefined) units.push({ form: "folded", text: value });
    } else if (escapes && (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && node.getText(source) !== node.text) units.push({ form: "cooked", text: node.text });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}
/** A JSON file's keys and string values, each by its parsed (unescaped) text; an unparseable file yields none. */
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
    else if (Array.isArray(value)) for (const member of value) walk(member);
    else if (isObject(value))
      for (const [key, member] of Object.entries(value)) {
        units.push(key);
        walk(member);
      }
  };
  walk(parsed);
  return units;
}
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCodePoint(0xa0) };
/** The character a named reference decodes to, when its name (any case) is one of the six (own keys only, so &constructor; is none). */
function namedEntity(name: string): string | undefined {
  const key = name.toLowerCase();
  return Object.hasOwn(NAMED_ENTITIES, key) ? NAMED_ENTITIES[key] : undefined;
}
/**
 * The HTML standard's numeric character reference table (its numeric character reference end state; wb-s876 cut #3): a
 * reference to one of these C1 code points decodes to the Windows-1252 character beside it - &#146; and &#x92; to U+2019 -
 * and a reference to 0x81, 0x8D, 0x8F, 0x90 or 0x9D decodes to itself.
 */
const NUMERIC_REFERENCES: ReadonlyMap<number, number> = new Map([
  [0x80, 0x20ac],
  [0x82, 0x201a],
  [0x83, 0x192],
  [0x84, 0x201e],
  [0x85, 0x2026],
  [0x86, 0x2020],
  [0x87, 0x2021],
  [0x88, 0x2c6],
  [0x89, 0x2030],
  [0x8a, 0x160],
  [0x8b, 0x2039],
  [0x8c, 0x152],
  [0x8e, 0x17d],
  [0x91, 0x2018],
  [0x92, 0x2019],
  [0x93, 0x201c],
  [0x94, 0x201d],
  [0x95, 0x2022],
  [0x96, 0x2013],
  [0x97, 0x2014],
  [0x98, 0x2dc],
  [0x99, 0x2122],
  [0x9a, 0x161],
  [0x9b, 0x203a],
  [0x9c, 0x153],
  [0x9e, 0x17e],
  [0x9f, 0x178],
]);
/** The code point a numeric character reference decodes to under the HTML standard: 0, a surrogate and a code point above 0x10FFFF to U+FFFD, a code point of NUMERIC_REFERENCES to its character, any other to itself. */
function numericReference(code: number): number {
  if (code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return 0xfffd;
  return NUMERIC_REFERENCES.get(code) ?? code;
}
/** A markup text with each numeric character reference (spelled with its semicolon, of up to eight decimal or seven hex digits; a longer one is NOT CLAIMED) replaced by what decode makes of its code point, and the six named entities (amp, lt, gt, quot, apos, nbsp) decoded: each claim pinned by THE JUDGE'S PINS (cut #6). */
function decodedReferences(text: string, decode: (code: number, whole: string) => string): string {
  return text.replace(/&(?:#(\d+)|#x([0-9a-f]+)|(\w+));/gi, (whole, decimal: string | undefined, hex: string | undefined, name: string | undefined) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return decode(code, whole);
    return namedEntity(name ?? "") ?? whole;
  });
}
/** A markup file's text with its numeric character references decoded as the HTML standard decodes them (numericReference) and the six named entities decoded: THE JUDGE's first markup reading (the docs/09 reading runs the helper's copy since cut #5; pinned by THE JUDGE'S PINS, cut #6). */
function decodedMarkup(text: string): string {
  return decodedReferences(text, code => String.fromCodePoint(numericReference(code)));
}
/**
 * A markup file's text with each numeric character reference decoded to its own code point - the landed census's reading,
 * and how XML and CommonMark read a reference into 0x80-0x9F (its C1 control) - one above 0x10FFFF left as written, and
 * the six named entities decoded (wb-s876 cut #3): THE JUDGE reads a mention in this reading as well as in decodedMarkup's,
 * so neither reading narrows the other (the docs/09 reading's controlCharacters reads the helper's copies of both since cut #5;
 * pinned by THE JUDGE'S PINS, cut #6).
 */
function decodedCodePoints(text: string): string {
  return decodedReferences(text, (code, whole) => (code <= 0x10ffff ? String.fromCodePoint(code) : whole));
}
/**
 * A YAML or TOML file's text with its backslash escapes decoded (\UXXXXXXXX, \uXXXX, \xXX; wb-6c6i F4), wherever they sit:
 * an over-read in single-quoted and literal strings, where a backslash is literal.
 */
function decodedEscapes(text: string): string {
  return text.replace(/\\(?:U([0-9a-fA-F]{8})|u([0-9a-fA-F]{4})|x([0-9a-fA-F]{2}))/g, (whole, long: string | undefined, short: string | undefined, byte: string | undefined) => {
    const code = Number.parseInt(long ?? short ?? byte ?? "", 16);
    return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
  });
}
/** One file's verdict: binary (a NUL byte, not read) or the sorted forms in which a mention was read, with the text it read. */
function verdictOf(path: string, bytes: Buffer): { readonly binary: boolean; readonly forms: readonly Form[]; readonly text: string } {
  const forms = new Set<Form>();
  if (mentions(path)) forms.add("path");
  if (bytes.includes(0)) return { binary: true, forms: [...forms].sort(), text: "" };
  const text = bytes.toString("utf8");
  if (mentions(text)) forms.add("raw");
  if (SCRIPT.test(path)) for (const unit of scriptUnits(path, text)) if (mentions(unit.text)) forms.add(unit.form);
  if (JSON_FILE.test(path) && jsonUnits(text).some(mentions)) forms.add("cooked");
  if (MARKUP.test(path) && (mentions(decodedMarkup(text)) || mentions(decodedCodePoints(text)))) forms.add("decoded");
  if (ESCAPED.test(path) && mentions(decodedEscapes(text))) forms.add("decoded");
  return { binary: false, forms: [...forms].sort(), text };
}
/** Judges an entry list in one call: the real entries first, then any planted ones; the text read for each anchor path is kept. */
function judgeScope(entries: Iterable<Entry>, anchors: readonly string[] = []): ScopeVerdict {
  let files = 0;
  let scripts = 0;
  let textBytes = 0;
  const binaries: string[] = [];
  const findings: { [path: string]: Form[] } = {};
  const anchored: { [path: string]: string } = {};
  for (const { path, bytes } of entries) {
    files += 1;
    const verdict = verdictOf(path, bytes);
    if (verdict.forms.length > 0) findings[path] = [...verdict.forms];
    if (verdict.binary) {
      binaries.push(path);
      continue;
    }
    textBytes += Buffer.byteLength(verdict.text, "utf8");
    if (anchors.includes(path)) anchored[path] = verdict.text;
    if (SCRIPT.test(path)) scripts += 1;
  }
  return { files, scripts, textBytes, binaries, findings, anchored };
}
function findingsFor(verdict: ScopeVerdict, paths: readonly string[], within: boolean): { [path: string]: Form[] } {
  return Object.fromEntries(Object.entries(verdict.findings).filter(([path]) => paths.includes(path) === within).map(([path, forms]) => [path, [...forms]]));
}

/** The regular-file entries of a gzip tar, plus the kinds it skips (anything but a regular file). */
function tarEntries(gz: Buffer): { readonly entries: Entry[]; readonly skipped: string[] } {
  const tar = gunzipSync(gz);
  const entries: Entry[] = [];
  const skipped: string[] = [];
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (start: number, end: number): string => {
      const raw = header.subarray(start, end);
      const nul = raw.indexOf(0);
      return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
    };
    const name = field(0, 100);
    const prefix = field(345, 500);
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const path = prefix === "" ? name : `${prefix}/${name}`;
    if (type === "0" || type === "") entries.push({ path, bytes: Buffer.from(tar.subarray(at + 512, at + 512 + size)) });
    else skipped.push(`${type}:${path}`);
    at += 512 + Math.ceil(size / 512) * 512;
  }
  return { entries, skipped };
}
/** The vendored release package.json resolves the SDK to (a file: spec), read by its own path. */
function vendoredPath(): string {
  const pkg: unknown = JSON.parse(textOf("package.json"));
  const spec = isObject(pkg) && isObject(pkg.dependencies) ? pkg.dependencies[SDK] : undefined;
  return typeof spec === "string" && spec.startsWith("file:") ? spec.slice("file:".length) : "-";
}
const tarball = lazy((): Buffer => readFileSync(join(REPO, vendoredPath())));
const sdkRelease = lazy(() => tarEntries(tarball()));

/** The record's release forms, each planted as an entry of the vendored release (T1, T2). */
const SDK_PLANTS: Readonly<Record<string, Entry>> = {
  declaration: entry("package/dist/src/zz-plant-declaration.d.ts", "export interface FurnaceObserverBoundaryV0 {\n  readonly exposedFields: readonly string[];\n}\n"),
  runtimeExport: entry("package/dist/src/zz-plant-runtime.js", "export const OBSERVER_BOUNDARY_V0 = Object.freeze({ version: 0 });\n"),
  schemaId: entry("package/contract/registry/zz-boundary.json", '{ "$id": "furnace.observer-boundary.v0" }\n'),
  registryKey: entry("package/contract/zz-manifest.json", '{ "records": { "observerBoundaryV0": { "shipped": true } } }\n'),
  docsHeading: entry("package/zz-README.md", "## Observer boundary (V0)\n\nThe record an admitted observer reads.\n"),
  escapedString: entry("package/dist/src/zz-escaped.js", 'export const NAME = "\\u004fbserverBoundaryV0";\n'),
  escapedJson: entry("package/contract/zz-escaped.json", '{ "$id": "furnace.\\u006fbserver-boundary.v0" }\n'),
};
const sdkVerdict = lazy((): ScopeVerdict => judgeScope([...sdkRelease().entries, ...Object.values(SDK_PLANTS)]));

/** The listed Pi files: tracked plus untracked-not-ignored, minus the tracker export and the holders. */
interface PiListing {
  readonly paths: readonly string[];
  readonly excluded: readonly string[];
}
const piListing = lazy((): PiListing => {
  const listed = sorted(git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).toString("utf8").split("\0").filter(Boolean));
  const holders = new Set([...HOLDERS, SELF]);
  const excluded = listed.filter(path => path.startsWith(TRACKER) || holders.has(path));
  return { paths: listed.filter(path => !excluded.includes(path) && existsSync(join(REPO, path))), excluded };
});
/** One planted entry per reading: cooked (escape-spelled), folded (split literal), raw in markdown, JSON and a comment; since cut #6 also THE JUDGE'S PINS (a page per markup kind beside .md and per named entity of the six, four long references, a .yaml page in the x form, and the script and JSON reading plants). */
const PI_PLANTS: Readonly<Record<string, string>> = {
  "src/workbench/zz-boundary-escaped.ts": 'export const RECORD_NAME = "\\u0046urnaceObserver\\u0042oundaryV0";\n',
  "src/workbench/zz-boundary-split.ts": 'export const SPELLED = "Furnace" + "Obs" + "erverBoundaryV0";\n',
  "docs/workbench/zz-boundary.md": "# Plant\n\nThe Furnace observer boundary record is consumed here.\n",
  "test/fixtures/zz-boundary.json": '{ "record": "furnace_observer_boundary_v0" }\n',
  "qa/zz-boundary.mjs": "// reads FurnaceObserverBoundaryV0\nexport {};\n",
  "test/fixtures/zz-boundary-escaped.json": '{ "record": "Furnace\\u004fbserver\\u0042oundaryV0" }\n',
  "docs/workbench/zz-boundary-entity.md": "The Furnace &#79;bserver&#32;Boundary record.\n",
  "docs/workbench/zz-observer-boundary.md": "# Plant\n\nThis page's text names nothing.\n",
  "config/zz-boundary.yml": 'record: "Furnace\\u004fbserverBoundaryV0"\n',
  "config/zz-boundary.toml": 'record = "Furnace\\U0000004fbserverBoundaryV0"\n',
  "src/workbench/zz-boundary-identifier.ts": "export const Furnace\\u004fbserverBoundaryV0 = 0;\n",
  "docs/workbench/zz-boundary-windows1252.md": "The Furnace observer&#146;s boundary record.\n",
  "docs/workbench/zz-boundary-c1.md": "The Furnace observer&#136;boundary record.\n",
  "docs/workbench/zz-boundary-kind.html": "<p>The Furnace observer&#32;boundary record.</p>\n",
  "docs/workbench/zz-boundary-kind.htm": "<p>The Furnace observer&#32;boundary record.</p>\n",
  "docs/workbench/zz-boundary-kind.xml": "<record>The Furnace observer&#32;boundary record.</record>\n",
  "docs/workbench/zz-boundary-kind.svg": "<svg><text>The Furnace observer&#32;boundary record.</text></svg>\n",
  "docs/workbench/zz-boundary-amp.md": "The Furnace observer&amp;boundary record.\n",
  "docs/workbench/zz-boundary-lt.md": "The Furnace observer&lt;boundary record.\n",
  "docs/workbench/zz-boundary-gt.md": "The Furnace observer&gt;boundary record.\n",
  "docs/workbench/zz-boundary-quot.md": "The Furnace observer&quot;boundary record.\n",
  "docs/workbench/zz-boundary-apos.md": "The Furnace observer&apos;s boundary record.\n",
  "docs/workbench/zz-boundary-nbsp.md": "The Furnace observer&nbsp;boundary record.\n",
  "docs/workbench/zz-boundary-long-decimal.md": "The Furnace observer&#00000146;s boundary record.\n",
  "docs/workbench/zz-boundary-long-hex.md": "The Furnace observer&#x0000092;s boundary record.\n",
  "docs/workbench/zz-boundary-long-decimal-c1.md": "The Furnace observer&#00000136;boundary record.\n",
  "docs/workbench/zz-boundary-long-hex-c1.md": "The Furnace observer&#x0000088;boundary record.\n",
  "config/zz-boundary.yaml": 'record: "Furnace\\x4fbserverBoundaryV0"\n',
  "src/workbench/zz-boundary-template.ts": "export const HEAD = `\\u004fbserverBoundaryV0 $" + "{0}`;\n",
  "src/workbench/zz-boundary-template-tail.ts": "export const TAIL = `$" + "{0} \\u004fbserverBoundaryV0`;\n",
  "src/workbench/zz-boundary-backtick.ts": "export const TICK = `\\u004fbserverBoundaryV0`;\n",
  "src/workbench/zz-boundary-private.ts": "export class ZzPlant {\n  #\\u004fbserverBoundaryV0 = 0;\n}\n",
  "src/workbench/zz-boundary-paren.ts": 'export const PAREN = "Furnace" + "Obs" + ("erver" + "BoundaryV0");\n',
  "src/workbench/zz-boundary-backtick-split.ts": "export const TICKS = `Obs` + `erverBoundaryV0`;\n",
  "test/fixtures/zz-boundary-array.json": '{ "records": ["Furnace\\u004fbserverBoundaryV0"] }\n',
};
/** The listed Pi files' bytes, read once: the entries the judge consumes (Z2) and the augmentation reader scans (W1). */
const piEntries = lazy((): Entry[] => piListing().paths.map(path => ({ path, bytes: readFileSync(join(REPO, path)) })));
const piVerdict = lazy((): ScopeVerdict => judgeScope([...piEntries(), ...Object.entries(PI_PLANTS).map(([path, text]) => entry(path, text))], ANCHORS));

/** The blobs of a commit's paths, read through one git cat-file --batch call. */
function blobsAt(commit: string, paths: readonly string[]): Entry[] {
  const out = git(["cat-file", "--batch"], `${paths.map(path => `${commit}:${path}`).join("\n")}\n`);
  const entries: Entry[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(0x0a, at);
    const header = out.subarray(at, end).toString("utf8");
    const match = /^[0-9a-f]{40,64} blob (\d+)$/.exec(header);
    if (match === null) throw new Error(`git cat-file --batch ${commit}:${path}: ${header}`);
    const size = Number(match[1]);
    entries.push({ path, bytes: Buffer.from(out.subarray(end + 1, end + 1 + size)) });
    at = end + 1 + size + 1;
  }
  return entries;
}
const PIN_PLANT = "docs/workbench/zz-pin-plant.md";
const PIN_PLANT_TEXT = "Pi reads the furnace-observer-boundary record.\n";
const pinVerdict = lazy((): ScopeVerdict => {
  const paths = git(["ls-tree", "-r", "-z", "--name-only", FILING_PIN]).toString("utf8").split("\0").filter(path => path !== "" && !path.startsWith(TRACKER));
  return judgeScope([...blobsAt(FILING_PIN, paths), entry(PIN_PLANT, PIN_PLANT_TEXT)], ANCHORS);
});

function parse(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function nodes(root: ts.Node): ts.Node[] {
  const all: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    all.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return all;
}
function memberName(name: ts.PropertyName | undefined): string {
  return name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : "<computed>";
}
/** Every declaration of a named interface in a module (declaration merging adds members). */
function interfaceDeclarations(source: ts.Node, name: string): ts.InterfaceDeclaration[] {
  return nodes(source).filter((node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node) && node.name.text === name);
}
/** The read paths a client interface declares over all its declarations, each member chain down to a leaf (runs.get.status). */
function declaredReads(source: ts.Node, name: string): string[] | null {
  const declarations = interfaceDeclarations(source, name);
  if (declarations.length === 0) return null;
  const paths: string[] = [];
  const walk = (members: ts.NodeArray<ts.TypeElement>, prefix: readonly string[]): void => {
    for (const member of members) {
      const key = [...prefix, memberName(member.name)];
      const type = ts.isPropertySignature(member) || ts.isMethodSignature(member) ? member.type : undefined;
      if (type !== undefined && ts.isTypeLiteralNode(type)) walk(type.members, key);
      else paths.push(key.join("."));
    }
  };
  for (const declaration of declarations) walk(declaration.members, []);
  return paths.sort();
}
/** The heritage (extends) types of a named interface over all its declarations under a node, each by its full text (type arguments included). */
function interfaceHeritage(source: ts.Node, name: string): string[] {
  return sorted(interfaceDeclarations(source, name).flatMap(declaration => (declaration.heritageClauses ?? []).flatMap(clause => clause.types.map(type => type.getText()))));
}
/**
 * A heritage type of FurnaceObserverClient read as a declared read path (wb-s876 F2): the extended type merges its members
 * into the client unread here, so the path pairs with no docs/09 read and W1's one-to-one check reds (an over-read: an
 * empty interface extended reads as widening too).
 */
function heritagePath(type: string): string {
  return `<extends ${type}>`;
}
const CLIENT = "FurnaceObserverClient";
/**
 * Every node that declares a name under a node (wb-s876 U1): each identifier spelled with the name - by its cooked text,
 * so an escape-spelled name counts - that is its parent node's own name: an interface, a class, an enum, a namespace, a
 * type alias, a function, a variable, a binding element, a member, a parameter, a specifier (an over-read: a member, a
 * parameter or a property access named by it counts as well).
 */
function declarationsOf(source: ts.Node, name: string): ts.Node[] {
  return nodes(source).flatMap(node => (ts.isIdentifier(node) && node.text === name && "name" in node.parent && node.parent.name === node ? [node.parent] : []));
}
/** The path a declaration of FurnaceObserverClient that is not an interface reads as: its kind, the declaration read whole (wb-s876 U1). */
function otherDeclarationPath(node: ts.Node): string {
  const kind =
    ts.isClassDeclaration(node) || ts.isClassExpression(node)
      ? "class"
      : ts.isEnumDeclaration(node)
        ? "enum"
        : ts.isModuleDeclaration(node)
          ? "namespace"
          : ts.isTypeAliasDeclaration(node)
            ? "type"
            : ts.isFunctionDeclaration(node)
              ? "function"
              : ts.isVariableDeclaration(node) || ts.isBindingElement(node)
                ? "variable"
                : "declaration";
  return `<${kind} ${CLIENT}>`;
}
/**
 * Each declaration of FurnaceObserverClient under a node that is not an interface, as `<K FurnaceObserverClient>` (wb-s876
 * U1, fail closed): TypeScript merges a class declaration's members and heritage into the interface, and none of them is
 * read here, so the declaration reads whole as a path that pairs with no docs/09 read.
 */
function otherDeclarations(source: ts.Node): string[] {
  return declarationsOf(source, CLIENT)
    .filter(node => !ts.isInterfaceDeclaration(node))
    .map(otherDeclarationPath)
    .sort();
}
/**
 * Every read path the declarations of FurnaceObserverClient under a node add (wb-s876 F2, U1): each interface declaration's
 * member chains down to a leaf and each of its heritage types as `<extends T>`, and each other declaration of the name as
 * `<K FurnaceObserverClient>`; null when the node declares the name nowhere.
 */
function clientReads(source: ts.Node): string[] | null {
  const declared = declaredReads(source, CLIENT);
  const others = otherDeclarations(source);
  if (declared === null && others.length === 0) return null;
  return [...(declared ?? []), ...interfaceHeritage(source, CLIENT).map(heritagePath), ...others].sort();
}
/** The type text of each constructor parameter named client, in every class of a module. */
function clientParameterTypes(source: ts.SourceFile): string[] {
  return nodes(source)
    .filter((node): node is ts.ParameterDeclaration => ts.isParameter(node) && ts.isConstructorDeclaration(node.parent) && ts.isIdentifier(node.name) && node.name.text === "client")
    .map(node => node.type?.getText() ?? "<untyped>");
}
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}
/** `this.client` or `this["client"]`, through parentheses and type assertions. */
function isClientRoot(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) return unwrap(node.expression).kind === ts.SyntaxKind.ThisKeyword && node.name.text === "client";
  if (ts.isElementAccessExpression(node)) return unwrap(node.expression).kind === ts.SyntaxKind.ThisKeyword && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "client";
  return false;
}
/** The member chain below the client root (calls are transparent): runs.get(id).status(...) -> runs, get, status. */
function chainOf(node: ts.Expression): string[] | undefined {
  if (isClientRoot(node)) return [];
  if (ts.isPropertyAccessExpression(node)) {
    const base = chainOf(node.expression);
    return base === undefined ? undefined : [...base, node.name.text];
  }
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
    const base = chainOf(node.expression);
    return base === undefined ? undefined : [...base, node.argumentExpression.text];
  }
  if (ts.isCallExpression(node)) return chainOf(node.expression);
  if (unwrap(node) !== node) return chainOf(unwrap(node));
  return undefined;
}
/** The node a chain continues into: a member access, a call or a wrapper whose operand is this node. */
function continues(node: ts.Node): ts.Node | undefined {
  const parent = node.parent;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent) || ts.isCallExpression(parent)) && parent.expression === node) return parent;
  if ((ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent) || ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent)) && parent.expression === node) return parent;
  return undefined;
}
interface ClientRead {
  readonly path: string;
  readonly timeoutMs: string | null;
  readonly limit: string | null;
  readonly inClose: boolean;
}
interface ClientUse {
  readonly reads: readonly ClientRead[];
  readonly unchained: number;
}
function propertyText(call: ts.CallExpression, key: string): string | null {
  for (const argument of call.arguments) {
    if (!ts.isObjectLiteralExpression(argument)) continue;
    for (const property of argument.properties) {
      if (ts.isPropertyAssignment(property) && memberName(property.name) === key) return property.initializer.getText();
      if (ts.isShorthandPropertyAssignment(property) && property.name.text === key) return property.name.text;
    }
  }
  return null;
}
function insideMethod(node: ts.Node, name: string): boolean {
  for (let current: ts.Node | undefined = node.parent; current !== undefined; current = current.parent) if (ts.isMethodDeclaration(current) && memberName(current.name) === name) return true;
  return false;
}
/** Every use of the client: a use that ends in a call of a non-empty chain is a read; any other use is unchained. */
function clientUses(source: ts.SourceFile): ClientUse {
  const reads: ClientRead[] = [];
  let unchained = 0;
  for (const root of nodes(source).filter(isClientRoot)) {
    let top: ts.Node = root;
    for (let next = continues(top); next !== undefined; next = continues(top)) top = next;
    const chain = ts.isCallExpression(top) ? chainOf(top) : undefined;
    if (chain === undefined || chain.length === 0 || !ts.isCallExpression(top)) {
      unchained += 1;
      continue;
    }
    reads.push({ path: chain.join("."), timeoutMs: propertyText(top, "timeoutMs"), limit: propertyText(top, "limit"), inClose: insideMethod(top, "close") });
  }
  return { reads, unchained };
}
/** The `limits.<name>` budgets a method's for-loop condition reads. */
function loopBounds(source: ts.SourceFile, method: string): string[] {
  const body = nodes(source).find((node): node is ts.MethodDeclaration => ts.isMethodDeclaration(node) && memberName(node.name) === method);
  const loop = body === undefined ? undefined : nodes(body).find((node): node is ts.ForStatement => ts.isForStatement(node));
  if (loop?.condition === undefined) return [];
  return sorted(
    nodes(loop.condition)
      .filter((node): node is ts.PropertyAccessExpression => ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "limits")
      .map(node => `limits.${node.name.text}`),
  );
}
/** The module a re-export reads from, or undefined. */
function reexportModule(node: ts.Node): string | undefined {
  return ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : undefined;
}
/**
 * Names loaded from a module at runtime: a value import, a side-effect import, a value re-export (export-from: each value
 * name, "export *" or "export * as <name>"), an import-equals require ("<name> = require"; wb-6c6i F5), a dynamic import
 * or a require call.
 */
function runtimeImports(source: ts.SourceFile, module: string): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if (ts.isExportDeclaration(node) && reexportModule(node) === module && !node.isTypeOnly) {
      const clause = node.exportClause;
      if (clause === undefined) names.push("export *");
      else if (ts.isNamespaceExport(clause)) names.push(`export * as ${clause.name.text}`);
      else for (const element of clause.elements) if (!element.isTypeOnly) names.push(`export ${element.name.text}`);
    }
    if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference)) {
      const target = node.moduleReference.expression;
      if (ts.isStringLiteralLike(target) && target.text === module) names.push(`${node.name.text} = require`);
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text === module) {
      const clause = node.importClause;
      if (clause === undefined) names.push("<side-effect>");
      else if (!clause.isTypeOnly) {
        if (clause.name !== undefined) names.push(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(`* as ${bindings.name.text}`);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) if (!element.isTypeOnly) names.push(element.name.text);
      }
    }
    if (ts.isCallExpression(node) && node.arguments.length > 0) {
      const first = node.arguments[0];
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (dynamic && first !== undefined && ts.isStringLiteralLike(first) && first.text === module) names.push("<dynamic>");
    }
  }
  return names.sort();
}
/** Names a module imports or re-exports from a module (types included), in source order (wb-6c6i F5: export-from read). */
function importedNames(source: ts.SourceFile, module: string): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if (ts.isExportDeclaration(node) && reexportModule(node) === module && node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
      for (const element of node.exportClause.elements) names.push((element.propertyName ?? element.name).text);
      continue;
    }
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== module) continue;
    const bindings = node.importClause?.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
  }
  return names;
}
/** Calls whose callee name is one of the verbs (a member call or a bare call). */
function verbCalls(source: ts.SourceFile, verbs: readonly string[]): string[] {
  const calls: string[] = [];
  for (const node of nodes(source)) {
    if (!ts.isCallExpression(node)) continue;
    const callee = unwrap(node.expression);
    const name = ts.isPropertyAccessExpression(callee) ? callee.name.text : ts.isIdentifier(callee) ? callee.text : undefined;
    if (name !== undefined && verbs.includes(name)) calls.push(name);
  }
  return calls.sort();
}
/** Every `ownership` value the module states: property assignments and literal-typed property signatures. */
function ownershipValues(source: ts.SourceFile): string[] {
  const values: string[] = [];
  for (const node of nodes(source)) {
    if (ts.isPropertyAssignment(node) && memberName(node.name) === "ownership" && ts.isStringLiteralLike(node.initializer)) values.push(node.initializer.text);
    if (ts.isPropertySignature(node) && memberName(node.name) === "ownership" && node.type !== undefined && ts.isLiteralTypeNode(node.type) && ts.isStringLiteral(node.type.literal)) values.push(node.type.literal.text);
  }
  return sorted(values);
}
/** The declared names of a module (interfaces, classes, types, functions, variables). */
function declaredNames(source: ts.SourceFile): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if ((ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isFunctionDeclaration(node)) && node.name !== undefined) names.push(node.name.text);
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) names.push(node.name.text);
  }
  return sorted(names);
}
/** Replaces one exact span of the real observer text; a span the source no longer holds reds the plant itself. */
function planted(text: string, from: string, to: string): string {
  expect(text.includes(from), `the observer still holds the plant's anchor span ${JSON.stringify(from)}`).toBe(true);
  return text.replace(from, to);
}
/** docs/09's reading on the real page, by the imported docs09Reading (test/helpers/furnace-docs-reading.ts; cut #5). */
function docs09Furnace(): Docs09Reading {
  return docs09Reading(textOf(DOCS09));
}
const FURNACE_READS = "The external Furnace reader uses explicit bounded status/attempt/log-reference polling.";
const FURNACE_VERBS = "Pi attachment is read-only and does not create, resume or stop a Run.";
function widened(prose: string): string {
  return prose.replace("status/attempt/log-reference polling", "status/attempt/log-reference/event-stream polling");
}
function narrowed(prose: string): string {
  return prose.replace("create, resume or stop", "create or resume");
}
/** docs/09's real Furnace paragraph (from the reads sentence to the end of the verbs sentence), found by its raw text. */
function furnaceParagraph(text: string): string {
  const from = text.indexOf(FURNACE_READS);
  const to = from < 0 ? -1 : text.indexOf(FURNACE_VERBS, from);
  expect(from >= 0 && to > from, "docs/09 still holds the Furnace paragraph the plants rewrite").toBe(true);
  return text.slice(from, to + FURNACE_VERBS.length);
}
/** A copy of the page with one block written right after the real Furnace paragraph, inside the bound section. */
function afterFurnace(text: string, block: string): string {
  const paragraph = furnaceParagraph(text);
  return text.replace(paragraph, () => `${paragraph}\n\n${block}`);
}
/**
 * The restatement plants (wb-s876 F1): the wb-6c6i gate's L2-D1 blockquote, L2-D2 list item and L2-D3 table cell, and the
 * seat's members of the same class - a heading, a fenced code block, a list nested in a quote, the reads subject without
 * its frame, a "poll" restatement, a narrowed verbs quote, an "attach" restatement, the subject words spelled with
 * character references, full-width letters or format characters, and the paragraph moved into a list item - and cut
 * #2's members (wb-s876 U2, F3): the subject words spelled with named references outside the six (in a blockquote, a list
 * item, a table cell, an h3 and the verbs sentence), the soft hyphen's numeric and raw spellings, five default-ignorable
 * code points, and a right-to-left override, raw and as a reference - and cut #3's (refusal #2 U1, F5): the possessive
 * spelled &#146; in a blockquote, a list item, a table cell, an h3 and a second paragraph, &#x92;, &#0146; and &#X92;, and
 * the widened reads restatement spelled &#146;, beside their proper-spelling controls (raw U+2019, &#8217;, &#x2019;,
 * &rsquo;, and the restatement raw and as &#8217;), a control character - the possessive's raw U+0092, &#141;, a raw
 * U+0081 and &#1; - inside the subject words, and a reference into 0x80-0x9F the table maps to a letter between Furnace
 * and read (&#136;, &#153;) - and cut #4's (ruling R-B157, the fail-closed core: a plant per placement and per claim
 * word of the docs09 reading): a second top-level paragraph, an h6, an indented code block, a subject word split across
 * table cells, an ordered and a task item; a list item's paragraph, heading, level-2 heading, code block, nested list,
 * list two deep and blockquote; a top-level blockquote's heading, code block, list in a list and blockquote; a nested
 * blockquote's heading, code block and blockquote under a list item and under a blockquote, and a blockquote in a list
 * in a quote and in a nested list item; an image's alt text; HTML in a list nested in a quote in a quote (htmlInHoleCopy,
 * cut #4's hole placement, read since cut #5); the subject-word
 * forms reading, reads, polling and attaches, the readiness and reattachment over-reads, upper case, a run of
 * separators and the U+0027 and full-width possessives; a mathematical letter; the six named references where only
 * the reading's subjectText (the helper's) decodes them (amp, lt, gt, quot and nbsp in a code block, apos in a possessive) and an upper-case name; the
 * real reads and verbs frames, each with a word spelled as a reference; a second subject word in the real paragraph; a left-to-right mark, U+007F and U+000B; &copy;,
 * &NonBreakingSpace;, a named reference in a code span and in a code block, and one behind &amp;; and a numeric
 * reference in a code span, in a code block, behind &amp;, and of eight decimal or seven hex digits - and cut #5's, the
 * twelve rows cut #4 named as the hole's, which the landed rendered view now reads (test/helpers/census.ts blockText,
 * wb-aalz): a list nested in a quote in a quote (bullet, ordered and task, each the widened reads; the U+2019
 * possessive; the narrowed verbs), a list in a quote in a quote in a quote, in a quote in a list item and in a quote in
 * a list item in a quote, a quote and a list nested in such a list, and a named reference and a control character in
 * one - each must refuse the reading (W1).
 */
const RESTATED: readonly string[] = [
  "blockquoteCopy",
  "listItemCopy",
  "tableCellCopy",
  "headingCopy",
  "codeCopy",
  "nestedCopy",
  "subjectCopy",
  "pollCopy",
  "verbsQuoteCopy",
  "verbsSubjectCopy",
  "entityCopy",
  "fullWidthCopy",
  "formCharacterCopy",
  "listedOnly",
  "shyCopy",
  "zwnjCopy",
  "zwjCopy",
  "wordJoinerCopy",
  "zeroWidthSpaceCopy",
  "frakturCopy",
  "doubleStruckCopy",
  "shyListCopy",
  "shyTableCopy",
  "shyHeadingCopy",
  "shyVerbsCopy",
  "shyNumericCopy",
  "shyRawCopy",
  "graphemeJoinerCopy",
  "variationSelectorCopy",
  "emojiSelectorCopy",
  "hangulFillerCopy",
  "khmerVowelCopy",
  "overrideCopy",
  "overrideReferenceCopy",
  "windows1252QuoteCopy",
  "windows1252ListCopy",
  "windows1252TableCopy",
  "windows1252HeadingCopy",
  "windows1252ParagraphCopy",
  "windows1252HexCopy",
  "windows1252WideCopy",
  "windows1252PaddedCopy",
  "windows1252UpperHexCopy",
  "rsquoRawCopy",
  "rsquoDecimalCopy",
  "rsquoHexCopy",
  "rsquoNamedCopy",
  "rsquoWideRawCopy",
  "rsquoWideDecimalCopy",
  "c1PossessiveRawCopy",
  "c1ReferenceCopy",
  "c1RawCopy",
  "c0ReferenceCopy",
  "tableLetterCopy",
  "tableTrademarkCopy",
  "paragraphCopy",
  "deepHeadingCopy",
  "indentedCodeCopy",
  "tableSplitCopy",
  "orderedItemCopy",
  "taskItemCopy",
  "itemParagraphCopy",
  "itemHeadingCopy",
  "itemLevelTwoHeadingCopy",
  "itemCodeCopy",
  "itemNestedListCopy",
  "itemDeepListCopy",
  "itemNestedQuoteCopy",
  "quoteHeadingCopy",
  "quoteCodeCopy",
  "quoteListListCopy",
  "quoteNestedQuoteCopy",
  "itemQuoteHeadingCopy",
  "itemQuoteCodeCopy",
  "itemQuoteQuoteCopy",
  "quoteQuoteHeadingCopy",
  "quoteQuoteCodeCopy",
  "quoteQuoteQuoteCopy",
  "quoteListQuoteCopy",
  "itemListQuoteCopy",
  "imageAltCopy",
  "htmlInHoleCopy",
  "readingCopy",
  "readsCopy",
  "pollingCopy",
  "attachesCopy",
  "readinessCopy",
  "reattachmentCopy",
  "upperCaseCopy",
  "separatorRunCopy",
  "asciiPossessiveCopy",
  "fullWidthApostropheCopy",
  "mathLetterCopy",
  "aposPossessiveCopy",
  "codeAmpCopy",
  "codeLtCopy",
  "codeGtCopy",
  "codeQuotCopy",
  "codeNbspCopy",
  "codeUpperNamedCopy",
  "frameReferenceCopy",
  "bidiMarkCopy",
  "delReferenceCopy",
  "verticalTabCopy",
  "copyrightCopy",
  "nonBreakingSpaceCopy",
  "codeSpanReferenceCopy",
  "codeBlockReferenceCopy",
  "ampExposedCopy",
  "numericCodeSpanCopy",
  "numericCodeBlockCopy",
  "numericAmpCopy",
  "numericLongCopy",
  "numericLongHexCopy",
  "secondSentenceCopy",
  "verbsFrameReferenceCopy",
  "quoteQuoteListCopy",
  "quoteQuoteOrderedListCopy",
  "quoteQuoteTaskListCopy",
  "quoteQuoteListPossessiveCopy",
  "quoteQuoteListVerbsCopy",
  "quoteQuoteQuoteListCopy",
  "itemQuoteListCopy",
  "quoteItemQuoteListCopy",
  "quoteQuoteListQuoteCopy",
  "quoteQuoteListListCopy",
  "quoteQuoteListReferenceCopy",
  "quoteQuoteListControlCopy",
];
/** The widened reads sentence with one spelling written inside both subject words, after "Furn" and after "po" (wb-s876 U2, F3). */
function spelledInside(inside: string): string {
  return `The external Furn${inside}ace reader uses explicit bounded status/attempt/log-reference/event-stream po${inside}lling.`;
}
/** The right single quotation mark (U+2019): the possessive's typographic form in the reading's subject words (the helper's DOCS09_SUBJECTS). */
const RSQUO = String.fromCodePoint(0x2019);
/** A possessive restatement of the Furnace reader, its apostrophe spelled as given (the wb-s876 refusal #2 G-D-1252-POSS shapes; cut #3). */
function possessive(apostrophe: string): string {
  return `The Furnace${apostrophe}s reader also follows each Run's event stream.`;
}
/** The widened reads restatement in the possessive, its apostrophe spelled as given (the refusal #2 G-D-1252-WIDE-READS shape; cut #3). */
function widerReads(apostrophe: string): string {
  return `The external Furnace${apostrophe}s reader uses explicit bounded status/attempt/log-reference/event-stream reads.`;
}
/** A right-to-left override (U+202E) and its pop (U+202C): the text between them shows reversed, so "redaer ecanruF" shows "Furnace reader". */
const OVERRIDE = String.fromCodePoint(0x202e);
const POP = String.fromCodePoint(0x202c);
/** docs/09 plants (the wb-dqf.1 gate's G17-G21b shapes, wb-6c6i F1; the RESTATED shapes, wb-s876 F1; whitespaceControlsCopy, a second unit holding the four whitespace controls as references, which reads as the real page, cut #4): each a copy of the real page, read by the same docs reading. */
function docs09Plants(text: string): { [plant: string]: Docs09Reading } {
  const paragraph = furnaceParagraph(text);
  const after = (block: string): string => afterFurnace(text, block);
  const fence = "```";
  const pages: Readonly<Record<string, string>> = {
    hiddenCopy: text.replace(paragraph, `<!-- ${paragraph} -->\n\n${narrowed(widened(paragraph))}`),
    decoyHeading: widened(text).replace("\n## Acceptance/negative controls\n", `\n${DOCS09_SECTION}\n\n${paragraph}\n\n## Acceptance/negative controls\n`),
    appendix: `${text.replace(paragraph, "")}\n# Appendix\n\n${paragraph}\n`,
    fenced: text.replace(paragraph, `${"```"}\n${paragraph}\n${"```"}`),
    widened: widened(text),
    narrowed: narrowed(text),
    blockquoteCopy: after(`> ${widened(FURNACE_READS)}`),
    listItemCopy: after(`- ${widened(FURNACE_READS)}`),
    tableCellCopy: after(`| Reader |\n| --- |\n| ${widened(FURNACE_READS)} |`),
    headingCopy: after(`### ${widened(FURNACE_READS)}`),
    codeCopy: after(`${"```"}\n${widened(FURNACE_READS)}\n${"```"}`),
    nestedCopy: after(`> - ${widened(FURNACE_READS)}`),
    subjectCopy: after("- The Furnace reader also follows each Run's event stream."),
    pollCopy: after("> Pi also polls each Run's event stream."),
    verbsQuoteCopy: after(`> ${narrowed(FURNACE_VERBS)}`),
    verbsSubjectCopy: after("- Attachment may stop a Run it observes."),
    entityCopy: after("- The external Furn&#97;ce reader uses explicit bounded status/attempt/log-reference/event-stream po&#108;ling."),
    fullWidthCopy: after(`> The external ${String.fromCodePoint(0xff26, 0xff55, 0xff52, 0xff4e, 0xff41, 0xff43, 0xff45)} reader uses explicit bounded status/attempt/log-reference/event-stream ${String.fromCodePoint(0xff50, 0xff4f, 0xff4c, 0xff4c)}ing.`),
    formCharacterCopy: after(`> The external Fur${String.fromCodePoint(0x200b)}nace reader uses explicit bounded status/attempt/log-reference/event-stream po${String.fromCodePoint(0x200b)}lling.`),
    listedOnly: text.replace(paragraph, () => `- ${paragraph}`),
    shyCopy: after(`> ${spelledInside("&shy;")}`),
    zwnjCopy: after(`> ${spelledInside("&zwnj;")}`),
    zwjCopy: after(`> ${spelledInside("&zwj;")}`),
    wordJoinerCopy: after(`> ${spelledInside("&NoBreak;")}`),
    zeroWidthSpaceCopy: after(`> ${spelledInside("&ZeroWidthSpace;")}`),
    frakturCopy: after("> The external Furn&afr;ce reader uses explicit bounded status/attempt/log-reference/event-stream &pfr;olling."),
    doubleStruckCopy: after("> The external Furn&aopf;ce reader uses explicit bounded status/attempt/log-reference/event-stream &popf;olling."),
    shyListCopy: after(`- ${spelledInside("&shy;")}`),
    shyTableCopy: after(`| Reader |\n| --- |\n| ${spelledInside("&shy;")} |`),
    shyHeadingCopy: after(`### ${spelledInside("&shy;")}`),
    shyVerbsCopy: after("> Pi att&shy;achment is read-only and does not create or resume a Run."),
    shyNumericCopy: after(`> ${spelledInside("&#173;")}`),
    shyRawCopy: after(`> ${spelledInside(String.fromCodePoint(0xad))}`),
    graphemeJoinerCopy: after(`> ${spelledInside(String.fromCodePoint(0x34f))}`),
    variationSelectorCopy: after(`> ${spelledInside(String.fromCodePoint(0xfe00))}`),
    emojiSelectorCopy: after(`> ${spelledInside(String.fromCodePoint(0xfe0f))}`),
    hangulFillerCopy: after(`> ${spelledInside(String.fromCodePoint(0x3164))}`),
    khmerVowelCopy: after(`> ${spelledInside(String.fromCodePoint(0x17b4))}`),
    overrideCopy: after(`> The external ${OVERRIDE}redaer ecanruF${POP} uses explicit bounded status/attempt/log-reference/event-stream ${OVERRIDE}gnillop${POP}.`),
    overrideReferenceCopy: after("> The external &#x202E;redaer ecanruF&#x202C; uses explicit bounded status/attempt/log-reference/event-stream &#x202E;gnillop&#x202C;."),
    windows1252QuoteCopy: after(`> ${possessive("&#146;")}`),
    windows1252ListCopy: after(`- ${possessive("&#146;")}`),
    windows1252TableCopy: after(`| Reader |\n| --- |\n| ${possessive("&#146;")} |`),
    windows1252HeadingCopy: after(`### ${possessive("&#146;")}`),
    windows1252ParagraphCopy: after(possessive("&#146;")),
    windows1252HexCopy: after(`> ${possessive("&#x92;")}`),
    windows1252WideCopy: after(`> ${widerReads("&#146;")}`),
    windows1252PaddedCopy: after(`> ${possessive("&#0146;")}`),
    windows1252UpperHexCopy: after(`> ${possessive("&#X92;")}`),
    rsquoRawCopy: after(`> ${possessive(RSQUO)}`),
    rsquoDecimalCopy: after(`> ${possessive("&#8217;")}`),
    rsquoHexCopy: after(`> ${possessive("&#x2019;")}`),
    rsquoNamedCopy: after(`> ${possessive("&rsquo;")}`),
    rsquoWideRawCopy: after(`> ${widerReads(RSQUO)}`),
    rsquoWideDecimalCopy: after(`> ${widerReads("&#8217;")}`),
    c1PossessiveRawCopy: after(`> ${possessive(String.fromCodePoint(0x92))}`),
    c1ReferenceCopy: after(`> ${spelledInside("&#141;")}`),
    c1RawCopy: after(`> ${spelledInside(String.fromCodePoint(0x81))}`),
    c0ReferenceCopy: after(`> ${spelledInside("&#1;")}`),
    tableLetterCopy: after("> The external Furnace&#136;reader uses explicit bounded status/attempt/log-reference/event-stream reads."),
    tableTrademarkCopy: after("> The external Furnace&#153;reader uses explicit bounded status/attempt/log-reference/event-stream reads."),
    paragraphCopy: after(widened(FURNACE_READS)),
    deepHeadingCopy: after(`###### ${widened(FURNACE_READS)}`),
    indentedCodeCopy: after(`    ${widened(FURNACE_READS)}`),
    tableSplitCopy: after("| Furnace | reader |\n| --- | --- |\n| a | b |"),
    orderedItemCopy: after(`1. ${widened(FURNACE_READS)}`),
    taskItemCopy: after(`- [ ] ${widened(FURNACE_READS)}`),
    itemParagraphCopy: after(`- note\n\n  ${widened(FURNACE_READS)}`),
    itemHeadingCopy: after(`- ### ${widened(FURNACE_READS)}`),
    itemLevelTwoHeadingCopy: after(`- ## ${widened(FURNACE_READS)}`),
    itemCodeCopy: after(`- note\n\n  ${fence}\n  ${widened(FURNACE_READS)}\n  ${fence}`),
    itemNestedListCopy: after(`- note\n  - ${widened(FURNACE_READS)}`),
    itemDeepListCopy: after(`- a\n  - b\n    - ${widened(FURNACE_READS)}`),
    itemNestedQuoteCopy: after(`- note\n\n  > ${widened(FURNACE_READS)}`),
    quoteHeadingCopy: after(`> ### ${widened(FURNACE_READS)}`),
    quoteCodeCopy: after(`> ${fence}\n> ${widened(FURNACE_READS)}\n> ${fence}`),
    quoteListListCopy: after(`> - note\n>   - ${widened(FURNACE_READS)}`),
    quoteNestedQuoteCopy: after(`> > ${widened(FURNACE_READS)}`),
    itemQuoteHeadingCopy: after(`- note\n\n  > ### ${widened(FURNACE_READS)}`),
    itemQuoteCodeCopy: after(`- note\n\n  > ${fence}\n  > ${widened(FURNACE_READS)}\n  > ${fence}`),
    itemQuoteQuoteCopy: after(`- note\n\n  > > ${widened(FURNACE_READS)}`),
    quoteQuoteHeadingCopy: after(`> > ### ${widened(FURNACE_READS)}`),
    quoteQuoteCodeCopy: after(`> > ${fence}\n> > ${widened(FURNACE_READS)}\n> > ${fence}`),
    quoteQuoteQuoteCopy: after(`> > > ${widened(FURNACE_READS)}`),
    quoteListQuoteCopy: after(`> - note\n>\n>   > ${widened(FURNACE_READS)}`),
    itemListQuoteCopy: after(`- a\n  - b\n\n    > ${widened(FURNACE_READS)}`),
    imageAltCopy: after(`> ![${widened(FURNACE_READS)}](https://example.invalid/reader.png)`),
    htmlInHoleCopy: after(`> > - <b>${widened(FURNACE_READS)}</b>`),
    readingCopy: after("> The Furnace reading also follows each Run's event stream."),
    readsCopy: after("> Pi's Furnace reads each Run's status."),
    pollingCopy: after("> Pi keeps polling each Run."),
    attachesCopy: after("> Pi attaches to each Run it observes."),
    readinessCopy: after("> Pi checks Furnace readiness first."),
    reattachmentCopy: after("> A reattachment never starts a Run."),
    upperCaseCopy: after("> THE EXTERNAL FURNACE READER POLLS EACH RUN."),
    separatorRunCopy: after("> The Furnace -- reader also follows each Run's event stream."),
    asciiPossessiveCopy: after(`> ${possessive("'")}`),
    fullWidthApostropheCopy: after(`> ${possessive(String.fromCodePoint(0xff07))}`),
    mathLetterCopy: after(`> The external Furn${String.fromCodePoint(0x1d51e)}ce reader uses explicit bounded status/attempt/log-reference/event-stream po${String.fromCodePoint(0x1d529)}ling.`),
    aposPossessiveCopy: after(`> ${possessive("&apos;")}`),
    codeAmpCopy: after(`${fence}\nThe external Furnace&amp;reader\n${fence}`),
    codeLtCopy: after(`${fence}\nThe external Furnace&lt;reader\n${fence}`),
    codeGtCopy: after(`${fence}\nThe external Furnace&gt;reader\n${fence}`),
    codeQuotCopy: after(`${fence}\nThe external Furnace&quot;reader\n${fence}`),
    codeNbspCopy: after(`${fence}\nThe external Furnace&nbsp;reader\n${fence}`),
    codeUpperNamedCopy: after(`${fence}\nThe external Furnace&NBSP;reader\n${fence}`),
    frameReferenceCopy: text.replace(FURNACE_READS, () => FURNACE_READS.replace("bounded", "b&#111;unded")),
    bidiMarkCopy: after(`> Pi${String.fromCodePoint(0x200e)}docs.`),
    delReferenceCopy: after(`> ${spelledInside("&#127;")}`),
    verticalTabCopy: after("> Pi&#11;keeps each record bounded."),
    whitespaceControlsCopy: after("> Pi&#9;keeps&#10;each&#12;record&#13;bounded."),
    copyrightCopy: after("> &copy; Pi."),
    nonBreakingSpaceCopy: after("> Pi&NonBreakingSpace;docs."),
    codeSpanReferenceCopy: after("> `&shy;`"),
    codeBlockReferenceCopy: after(`${fence}\n&shy;\n${fence}`),
    ampExposedCopy: after("> &amp;shy;"),
    numericCodeSpanCopy: after("> `The external Furn&#97;ce reader`"),
    numericCodeBlockCopy: after(`${fence}\nThe external Furn&#97;ce reader\n${fence}`),
    numericAmpCopy: after("> The external Furn&amp;#97;ce reader"),
    numericLongCopy: after("> The external Furn&#00000097;ce reader"),
    numericLongHexCopy: after("> The external Furn&#x0000061;ce reader"),
    secondSentenceCopy: text.replace(FURNACE_VERBS, () => `${FURNACE_VERBS} Pi keeps polling each Run.`),
    verbsFrameReferenceCopy: text.replace(FURNACE_VERBS, () => FURNACE_VERBS.replace("read-only", "read&#45;only")),
    quoteQuoteListCopy: after(`> > - ${widened(FURNACE_READS)}`),
    quoteQuoteOrderedListCopy: after(`> > 1. ${widened(FURNACE_READS)}`),
    quoteQuoteTaskListCopy: after(`> > - [ ] ${widened(FURNACE_READS)}`),
    quoteQuoteListPossessiveCopy: after(`> > - ${possessive(RSQUO)}`),
    quoteQuoteListVerbsCopy: after(`> > - ${narrowed(FURNACE_VERBS)}`),
    quoteQuoteQuoteListCopy: after(`> > > - ${widened(FURNACE_READS)}`),
    itemQuoteListCopy: after(`- note\n\n  > - ${widened(FURNACE_READS)}`),
    quoteItemQuoteListCopy: after(`> - note\n>\n>   > - ${widened(FURNACE_READS)}`),
    quoteQuoteListQuoteCopy: after(`> > - note\n> >\n> >   > ${widened(FURNACE_READS)}`),
    quoteQuoteListListCopy: after(`> > - note\n> >   - ${widened(FURNACE_READS)}`),
    quoteQuoteListReferenceCopy: after("> > - Pi&shy;docs."),
    quoteQuoteListControlCopy: after("> > - Pi&#1;docs."),
  };
  return Object.fromEntries(Object.entries(pages).map(([plant, page]) => [plant, docs09Reading(page)]));
}
/**
 * The owner's filing (wb-6c6i F7): the export notes' first two blank-line-separated blocks - the "Owner filing (" header
 * and its body, which opens with the gating artifact - read before any appended note, so a later note that quotes a filing
 * sentence verbatim never stands in for a replaced original; notes of any other shape read as no filing.
 */
function ownerFiling(notes: string): string {
  const [header = "", body = ""] = notes.split("\n\n");
  return header.startsWith("Owner filing (") && body.startsWith("Gating artifact: ") ? `${header}\n\n${body}` : "";
}
/** A module augmentation of the observer module, planted as a file of its own (W1, wb-6c6i F6). */
const AUGMENTATION_PLANT = entry(
  "src/workbench/zz-observer-augmentation.ts",
  'declare module "./furnace-observer.js" {\n  interface FurnaceObserverClient {\n    runs: { get(runId: string): { events(call?: { timeoutMs?: number }): AsyncIterable<unknown> } };\n  }\n}\nexport {};\n',
);
/** An augmentation that only extends another interface, planted as a file of its own (the wb-6c6i gate's L2-W4b; wb-s876 F2). */
const HERITAGE_PLANT = entry(
  "src/workbench/zz-observer-heritage.ts",
  'interface ZzGateStream {\n  events: { stream(runId: string, call?: { timeoutMs?: number }): AsyncIterable<unknown> };\n}\ndeclare module "./furnace-observer.js" {\n  interface FurnaceObserverClient extends ZzGateStream {}\n}\nexport {};\n',
);
/** A CLASS declaration of FurnaceObserverClient in an augmentation: TypeScript merges it into the interface (the wb-s876 gate's G-W1-CLASS-OPT2; U1). */
const CLASS_PLANT = entry(
  "src/workbench/zz-observer-class.ts",
  'declare module "./furnace-observer.js" {\n  class FurnaceObserverClient {\n    events?: { list(runId: string, request?: { limit?: number }, call?: { timeoutMs?: number }): Promise<unknown> };\n  }\n}\n\nexport {};\n',
);
/** A class declaration of FurnaceObserverClient in an augmentation that extends a class holding the member (the gate's G-W1-CLASS-EXT-OPT2; U1). */
const CLASS_EXTENDS_PLANT = entry(
  "src/workbench/zz-observer-class-extends.ts",
  'declare class ZzGateEventsBase {\n  events?: { list(runId: string, request?: { limit?: number }, call?: { timeoutMs?: number }): Promise<unknown> };\n}\ndeclare module "./furnace-observer.js" {\n  class FurnaceObserverClient extends ZzGateEventsBase {}\n}\n\nexport {};\n',
);
/** Every other declaration kind of the name in an augmentation: a namespace, an enum, a type alias, a function and a variable (U1, fail closed). */
const KINDS_PLANT = entry(
  "src/workbench/zz-observer-kinds.ts",
  'declare module "./furnace-observer.js" {\n  namespace FurnaceObserverClient {}\n  enum FurnaceObserverClient {}\n  type FurnaceObserverClient = unknown;\n  function FurnaceObserverClient(): void;\n  const FurnaceObserverClient: unknown;\n}\nexport {};\n',
);
/** A declaration of FurnaceObserverClient under a specifier only configuration could map to the observer (R-ALIASED-MODULE, Q12). */
const ALIAS_PLANT = entry(
  "src/workbench/zz-observer-alias.ts",
  'declare module "#furnace-observer-alias" {\n  interface FurnaceObserverClient {\n    events: { stream(runId: string, call?: { timeoutMs?: number }): AsyncIterable<unknown> };\n  }\n}\nexport {};\n',
);
/** A global declaration of interface Object in a file of its own: it widens every object type's apparent members, the client's included, without declaring FurnaceObserverClient (the wb-s876 refusal #2 F2 plant G-U1-GLOBAL-OBJECT-2; R-OTHER-MODULE, Q8). */
const GLOBAL_PLANT = entry(
  "src/workbench/zz-observer-global.ts",
  "declare global {\n  interface Object {\n    zzGateEvents?: { list(runId: string, request?: { limit?: number }, call?: { timeoutMs?: number }): Promise<unknown> };\n  }\n}\n\nexport {};\n",
);
/**
 * Each global declaration of interface Object in a file, as "<path>: Object" (R-OTHER-MODULE, Q8; the wb-s876 refusal #2 F2
 * family): one in a declare global block, or one at the top level of a file that is not a module. Either widens every
 * object type's apparent members, FurnaceObserverClient's included, without declaring the name, and W1 reads neither. The
 * interface keyword cannot be escape-spelled and the name can, so every file spelling "interface" and either "Object" or
 * an escape is parsed.
 */
function globalObjects(path: string, text: string): string[] {
  if (!text.includes("interface") || !(text.includes("Object") || text.includes("\\u"))) return [];
  const source = parse(path, text);
  const augmentationStatements = nodes(source).flatMap(node =>
    ts.isModuleDeclaration(node) && (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0 && node.body !== undefined && ts.isModuleBlock(node.body) ? [...node.body.statements] : [],
  );
  const statements = ts.isExternalModule(source) ? augmentationStatements : [...source.statements, ...augmentationStatements];
  return statements.filter(statement => ts.isInterfaceDeclaration(statement) && statement.name.text === "Object").map(() => `${path}: Object`);
}
const OBSERVER_MODULE = OBSERVER.replace(SCRIPT, "");
/** Whether a module specifier in a file names the observer module: a relative one resolved from the file, a bare one by its last segment (an over-read). */
function namesObserver(from: string, specifier: string): boolean {
  if (specifier.startsWith(".")) return posix.join(posix.dirname(from), specifier).replace(SCRIPT, "") === OBSERVER_MODULE;
  return posix.basename(specifier).replace(SCRIPT, "") === posix.basename(OBSERVER_MODULE);
}
/**
 * The read paths a file's module augmentations of the observer module add to FurnaceObserverClient (wb-6c6i F6): each
 * declaration's member chains down to a leaf, and each of its heritage types as `<extends T>` (wb-s876 F2), so an
 * augmentation that only extends another interface reads as widened; each other declaration of the name reads whole as
 * `<K FurnaceObserverClient>` (clientReads; wb-s876 U1), so a class declaration in an augmentation reads as widened.
 */
function augmentedReads(path: string, text: string): string[] {
  if (!text.includes("module")) return [];
  return nodes(parse(path, text))
    .filter((node): node is ts.ModuleDeclaration => ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name) && namesObserver(path, node.name.text))
    .flatMap(node => (node.body === undefined ? [] : (clientReads(node.body) ?? [])))
    .sort();
}
/** Each module declaration in a file that declares the name FurnaceObserverClient (any declaration: declarationsOf) under a specifier not naming the observer module, as "<path>: <specifier>" (R-ALIASED-MODULE, Q12). */
function otherModuleClients(path: string, text: string): string[] {
  if (!text.includes("module")) return [];
  return nodes(parse(path, text)).flatMap(node =>
    ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name) && !namesObserver(path, node.name.text) && node.body !== undefined && declarationsOf(node.body, CLIENT).length > 0
      ? [`${path}: ${node.name.text}`]
      : [],
  );
}
/** Every listed Pi script that augments the observer module, with the read paths it adds. */
const augmentations = lazy((): { readonly path: string; readonly reads: readonly string[] }[] =>
  piEntries()
    .filter(item => SCRIPT.test(item.path) && item.path !== OBSERVER)
    .map(item => ({ path: item.path, reads: augmentedReads(item.path, item.bytes.toString("utf8")) }))
    .filter(found => found.reads.length > 0),
);
/**
 * The content-liveness anchors (wb-6c6i F3), each read from the text the judge itself read for its anchor path (never
 * through textOf), so a judge fed truncated or empty content reds: the identity schema literal, docs/09's rendered
 * Furnace reads and the observer's client declaration.
 */
function liveness(anchored: { readonly [path: string]: string }): { readonly identitySchemaLiteral: boolean; readonly docs09Polling: boolean; readonly observerClient: boolean } {
  return {
    identitySchemaLiteral: (anchored[IDENTITY] ?? "").includes(`"${SCHEMA_LITERAL}"`),
    docs09Polling: docs09Reading(anchored[DOCS09] ?? "").reads.join("/") === "status/attempt/log-reference",
    observerClient: (anchored[OBSERVER] ?? "").includes("export interface FurnaceObserverClient"),
  };
}
/** Pairs each docs read with the declared path naming it (status, attempt(s), log(s)); a read with no or two paths is unpaired. */
function pairReads(reads: readonly string[], paths: readonly string[]): string[][] {
  return reads.map(read => {
    const stem = read.split("-")[0] ?? read;
    const named = paths.filter(path => path.split(".").some(segment => segment === stem || segment === `${stem}s`));
    return named.length === 1 ? [read, named[0] ?? "-"] : [read, `<${named.length} paths>`];
  });
}
const observerText = lazy((): string => textOf(OBSERVER));
const observer = lazy((): ts.SourceFile => parse(OBSERVER, observerText()));

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each pin's live witness, for the claims check of the closing case. */
const LIVE = new Map<string, JsonValue>();

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  T1: () => {
    const release = sdkRelease();
    const verdict = sdkVerdict();
    const plantPaths = Object.values(SDK_PLANTS).map(plant => plant.path);
    const real = findingsFor(verdict, plantPaths, false);
    expect(real, `ARMED: the vendored ${SDK} (${TARBALL}) now spells ${RECORD}; the until-then duty of ${BEAD} ends and the acceptance on landing is owed - ${ACCEPTANCE}`).toEqual({});
    expect(release.entries.length, "the release entries were read").toBeGreaterThanOrEqual(FLOORS.sdkEntries);
    const manifest = release.entries.find(item => item.path === "package/package.json");
    const pkg: unknown = JSON.parse(manifest?.bytes.toString("utf8") ?? "{}");
    const declarations = release.entries.filter(item => item.path.endsWith(".d.ts")).map(item => item.bytes.toString("utf8"));
    const declared = (name: string): boolean =>
      declarations.some(text => new RegExp(`export (?:declare )?(?:interface|type|class|const|function|enum) ${escaped(name)}\\b|export (?:type )?\\{[^}]*\\b${escaped(name)}\\b[^}]*\\}`).test(text));
    const observerTypes = importedNames(observer(), SDK);
    expect(observerTypes.length, "the observer imports its types from the SDK").toBeGreaterThanOrEqual(1);
    expect(observerTypes.filter(name => !declared(name)), "every type the observer imports is declared by the vendored release").toEqual([]);
    const typesPlant = importedNames(parse(OBSERVER, `${observerText()}\nexport type { NotInTheRelease } from "${SDK}";\n`), SDK).filter(name => !declared(name));
    return json({
      fired: Object.keys(real).length > 0,
      sdkMentions: real,
      package: isObject(pkg) && typeof pkg.name === "string" ? pkg.name : null,
      version: isObject(pkg) && typeof pkg.version === "string" ? pkg.version : null,
      observerTypesDeclared: observerTypes.every(declared),
      typesPlant,
      entriesAtFloor: release.entries.length >= FLOORS.sdkEntries,
      skippedEntries: release.skipped,
      binaryEntries: verdict.binaries.filter(path => !plantPaths.includes(path)),
      sdkPlant: findingsFor(verdict, [SDK_PLANTS.declaration?.path ?? "-"], true),
    });
  },
  T2: () => {
    const verdict = sdkVerdict();
    const forms = Object.fromEntries(Object.entries(SDK_PLANTS).map(([form, plant]) => [form, verdict.findings[plant.path] ?? []]));
    expect(Object.entries(forms).filter(([, found]) => found.length === 0).map(([form]) => form), "every release form of the record is read").toEqual([]);
    return json({ record: RECORD, releaseForms: forms });
  },
  T3: () => {
    const bytes = tarball();
    const pkg: unknown = JSON.parse(textOf("package.json"));
    const lock: unknown = JSON.parse(textOf("package-lock.json"));
    const lockEntry = isObject(lock) && isObject(lock.packages) ? lock.packages[LOCK_KEY] : undefined;
    const deps = isObject(pkg) && isObject(pkg.dependencies) ? pkg.dependencies : {};
    const manifest = sdkRelease().entries.find(item => item.path === "package/package.json");
    const shipped: unknown = JSON.parse(manifest?.bytes.toString("utf8") ?? "{}");
    const integrity = `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
    const filing = ownerFiling(exportRow(BEAD).notes);
    expect(filing.includes(`Gating artifact: ${RECORD}, ${RECORDED_STATUS}`), "the owner's recorded status of the record").toBe(true);
    expect(vendoredPath(), "package.json resolves the SDK to the release this census reads").toBe(TARBALL);
    return json({
      recordedStatus: RECORDED_STATUS,
      spec: deps[SDK] ?? null,
      lockResolved: isObject(lockEntry) ? (lockEntry.resolved ?? null) : null,
      lockVersion: isObject(lockEntry) ? (lockEntry.version ?? null) : null,
      lockIntegrityMatches: isObject(lockEntry) && lockEntry.integrity === integrity,
      tarballName: isObject(shipped) ? (shipped.name ?? null) : null,
      tarballVersion: isObject(shipped) ? (shipped.version ?? null) : null,
      tarballSha256: createHash("sha256").update(bytes).digest("hex").slice(0, 16),
    });
  },
  W1: () => {
    const augmented = augmentations();
    const own = clientReads(observer());
    const ownHeritage = interfaceHeritage(observer(), CLIENT);
    const readPaths = own === null ? null : [...own, ...augmented.flatMap(found => found.reads)].sort();
    const docs = docs09Furnace();
    const { reads } = docs;
    const { blocks } = docsSection(textOf(DOCS09), DOCS09_SECTION.slice("## ".length), 2, [DOCS09_TITLE]);
    const pairs = pairReads(reads, readPaths ?? []);
    expect(pairs.filter(pair => (pair[1] ?? "").startsWith("<")), "every docs/09 read names exactly one declared path").toEqual([]);
    expect(sorted(pairs.map(pair => pair[1] ?? "")), "every declared path is a docs/09 read, one to one").toEqual(readPaths);
    const widened = parse(
      OBSERVER,
      planted(observerText(), "status(call?:{timeoutMs?:number}):Promise<Response<RunStatusDto>>}", "status(call?:{timeoutMs?:number}):Promise<Response<RunStatusDto>>;events(call?:{timeoutMs?:number}):AsyncIterable<unknown>}"),
    );
    const widenedPlant = (declaredReads(widened, "FurnaceObserverClient") ?? []).filter(path => !(readPaths ?? []).includes(path));
    expect(widenedPlant, "a widened interface reads as widened").toEqual(["runs.get.events"]);
    const augmentationPlant = augmentedReads(AUGMENTATION_PLANT.path, AUGMENTATION_PLANT.bytes.toString("utf8"));
    const heritagePlant = {
      augmentation: augmentedReads(HERITAGE_PLANT.path, HERITAGE_PLANT.bytes.toString("utf8")),
      own: interfaceHeritage(parse(OBSERVER, planted(observerText(), "export interface FurnaceObserverClient {", "export interface FurnaceObserverClient extends ZzGateStream {")), "FurnaceObserverClient").map(heritagePath),
    };
    expect(heritagePlant, "a declaration that only extends another interface reads as widened, in an augmentation and in the observer (wb-s876 F2)").toStrictEqual({ augmentation: ["<extends ZzGateStream>"], own: ["<extends ZzGateStream>"] });
    const ownClass = clientReads(parse(OBSERVER, planted(observerText(), "export interface FurnaceObserverClient {", "export declare class FurnaceObserverClient {events?:{list(id:string):Promise<unknown>}}\nexport interface FurnaceObserverClient {")));
    const nonInterfacePlant = {
      augmentation: augmentedReads(CLASS_PLANT.path, CLASS_PLANT.bytes.toString("utf8")),
      heritage: augmentedReads(CLASS_EXTENDS_PLANT.path, CLASS_EXTENDS_PLANT.bytes.toString("utf8")),
      kinds: augmentedReads(KINDS_PLANT.path, KINDS_PLANT.bytes.toString("utf8")),
      own: (ownClass ?? []).filter(path => !(own ?? []).includes(path)),
    };
    expect(nonInterfacePlant, "a declaration of the name that is not an interface - a class, its heritage form, any other kind - reads as widened, in an augmentation and in the observer (wb-s876 U1, fail closed)").toStrictEqual({
      augmentation: ["<class FurnaceObserverClient>"],
      heritage: ["<class FurnaceObserverClient>"],
      kinds: ["<enum FurnaceObserverClient>", "<function FurnaceObserverClient>", "<namespace FurnaceObserverClient>", "<type FurnaceObserverClient>", "<variable FurnaceObserverClient>"],
      own: ["<class FurnaceObserverClient>"],
    });
    const docsPlants = docs09Plants(textOf(DOCS09));
    expect(
      RESTATED.filter(plant => (docsPlants[plant]?.reads.length ?? 1) + (docsPlants[plant]?.verbs.length ?? 1) > 0),
      "a subject word restated in a second text unit, in each placement the READ SET names, or held by no paragraph, refuses the reading (wb-s876 F1, cut #4)",
    ).toEqual([]);
    expect(
      docsPlants.whitespaceControlsCopy,
      "tab, line feed, form feed and carriage return, spelled as references in a second unit, are no control characters the reading refuses (cut #4)",
    ).toStrictEqual(docs);
    expect(
      docsSection(textOf(DOCS09).replace(FURNACE_READS, () => FURNACE_READS.replace(" uses ", "  uses\n")), DOCS09_SECTION.slice("## ".length), 2, [DOCS09_TITLE]).blocks,
      "a doubled space and a line break inside the reads sentence render the same block list, so the block pin does not red them (cut #4; narrowed at cut #5, refusal #4 F4)",
    ).toStrictEqual(blocks);
    const spellings: Readonly<Record<string, string>> = { decimal: "&#146;", hex: "&#x92;", padded: "&#0146;", upperHex: "&#X92;", decimalRsquo: "&#8217;", hexRsquo: "&#x2019;" };
    const possessiveSubjects = (spelling: string): Docs09Reading["subjects"] => docs09Reading(afterFurnace(textOf(DOCS09), `> ${possessive(spelling)}`)).subjects;
    const rsquoSubjects = possessiveSubjects(RSQUO);
    expect(
      Object.entries(spellings)
        .filter(([, spelling]) => !isDeepStrictEqual(possessiveSubjects(spelling), rsquoSubjects))
        .map(([name]) => name),
      "each numeric spelling of the possessive, in a blockquote after the real paragraph, counts the subject words as its raw U+2019 control counts them, as the HTML standard decodes it: one rendered page, one subject reading (wb-s876 cut #3; through docs09Reading since cut #5)",
    ).toEqual([]);
    expect(
      decodedMarkup("&#0;&#xD800;&#x110000;&#128;&#129;&#146;&#x92;&#159;&#160;"),
      "a numeric reference decodes as the HTML standard decodes it: 0, a surrogate and a code point above 0x10FFFF to U+FFFD, a code point of the 0x80-0x9F table to its character, any other to itself (wb-s876 cut #3)",
    ).toBe(String.fromCodePoint(0xfffd, 0xfffd, 0xfffd, 0x20ac, 0x81, 0x2019, 0x2019, 0x178, 0xa0));
    expect(
      decodedCodePoints("&#136;&#146;&#x92;&#x110000;"),
      "the second reading decodes each numeric reference to its own code point, one above 0x10FFFF left as written: the landed reading, kept beside the standard's (wb-s876 cut #3)",
    ).toBe(`${String.fromCodePoint(0x88, 0x92, 0x92)}&#x110000;`);
    expect(
      [decodedMarkup, decodedCodePoints].map(decoded => decoded("&constructor;&toString;&hasOwnProperty;&AMP;")),
      "a name that is not one of the six is left as written, an inherited property's name included, and a name of the six is read in any case: THE JUDGE's namedEntity reads its own keys only (cut #5)",
    ).toEqual(["&constructor;&toString;&hasOwnProperty;&", "&constructor;&toString;&hasOwnProperty;&"]);
    const six = `&<>"'${String.fromCodePoint(0xa0)}`;
    expect(
      [decodedMarkup, decodedCodePoints].map(decoded => decoded("&AMP;&LT;&GT;&QUOT;&APOS;&NBSP;|&Amp;&lT;&gT;&QuOt;&aPoS;&nBsP;")),
      "each name of the six is read in upper case and in a mixed case, in both readings: THE JUDGE's namedEntity folds the name's case (THE JUDGE'S PINS, cut #6)",
    ).toEqual([`${six}|${six}`, `${six}|${six}`]);
    expect(
      [decodedMarkup, decodedCodePoints].map(decoded => decoded("&#xDC00;&#xDFFF;&#x10FFFF;")),
      "the low surrogates U+DC00 and U+DFFF decode to U+FFFD in the standard's reading and to themselves in the code-point reading, and U+10FFFF to itself in both (THE JUDGE'S PINS, cut #6)",
    ).toEqual([String.fromCodePoint(0xfffd, 0xfffd, 0x10ffff), String.fromCodePoint(0xdc00, 0xdfff, 0x10ffff)]);
    expect(
      [decodedMarkup, decodedCodePoints].map(decoded => decoded("&#xa;&#xaf;&#XAF;")),
      "a one-digit hex reference and the hex digits a and f, in either case, are read in both readings (THE JUDGE'S PINS, cut #6)",
    ).toEqual([String.fromCodePoint(0xa, 0xaf, 0xaf), String.fromCodePoint(0xa, 0xaf, 0xaf)]);
    return json({
      interfaceName: "FurnaceObserverClient",
      interfaceDeclarations: interfaceDeclarations(observer(), "FurnaceObserverClient").length,
      interfaceExtends: ownHeritage,
      otherDeclarations: otherDeclarations(observer()),
      clientParameterTypes: clientParameterTypes(observer()),
      augmentations: augmented,
      readPaths,
      docsBinding: { binds: docs.binds, why: docs.why, html: docs.html, undecoded: docs.undecoded, controls: docs.controls, subjects: docs.subjects, readsClauses: docs.readsClauses, verbsClauses: docs.verbsClauses, blocks },
      docsReads: reads,
      pairs,
      widenedPlant,
      augmentationPlant,
      heritagePlant,
      nonInterfacePlant,
      docsPlants,
    });
  },
  W2: () => {
    const { reads } = clientUses(observer());
    const calls = reads.map(read => ({ path: read.path, timeoutMs: read.timeoutMs, limit: read.limit }));
    expect(calls.filter(call => call.timeoutMs === null).map(call => call.path), "every client read carries a timeoutMs bound").toEqual([]);
    const pollBounds = loopBounds(observer(), "observe");
    const unboundedCall = clientUses(parse(OBSERVER, planted(observerText(), ".status({timeoutMs:limits.callTimeoutMs})", ".status()")))
      .reads.filter(read => read.timeoutMs === null)
      .map(read => read.path);
    const unboundedLoop = loopBounds(parse(OBSERVER, planted(observerText(), "poll<limits.maxPolls&&Date.now()-started<limits.maxElapsedMs", "poll<limits.maxPolls")), "observe");
    expect(unboundedCall, "an unbounded read reads as unbounded").toEqual(["runs.get.status"]);
    return json({ calls, pollBounds, unboundedPlant: { calls: unboundedCall, pollBounds: unboundedLoop } });
  },
  W3: () => {
    const source = observer();
    const uses = clientUses(source);
    const { verbs } = docs09Furnace();
    const control = parse(
      OBSERVER,
      planted(observerText(), "close():void {this.shutdown.abort();this.markStale();}", "close():void {this.shutdown.abort();void this.client.runs.get(this.options.runId).stop();this.markStale();}"),
    );
    const controlUses = clientUses(control);
    expect(uses.unchained, "every client use is a read call").toBe(0);
    const runtimeImportPlant = runtimeImports(parse(OBSERVER, `${observerText()}\nexport { FurnaceClient } from "${SDK}";\nimport furnaceRuntime = require("${SDK}");\n`), SDK);
    return json({
      clientChains: sorted(uses.reads.map(read => read.path)),
      unchainedClientUses: uses.unchained,
      sdkRuntimeImports: runtimeImports(source, SDK),
      runtimeImportPlant,
      closeReads: uses.reads.filter(read => read.inClose).map(read => read.path),
      excludedVerbs: verbs,
      excludedVerbCalls: verbCalls(source, verbs),
      controlPlant: {
        clientChains: sorted(controlUses.reads.map(read => read.path)),
        closeReads: controlUses.reads.filter(read => read.inClose).map(read => read.path),
        excludedVerbCalls: verbCalls(control, verbs),
      },
      ownership: ownershipValues(source),
    });
  },
  Z1: () => {
    const sdkReal = findingsFor(
      sdkVerdict(),
      Object.values(SDK_PLANTS).map(plant => plant.path),
      false,
    );
    const atPin = git(["show", `${FILING_PIN}:${EXPORT}`]).toString("utf8");
    const before = git(["show", `${FILING_PIN}^:${EXPORT}`]).toString("utf8");
    const holds = (text: string): boolean => text.split("\n").some(line => line.includes(`"id":"${BEAD}"`));
    const verdict = pinVerdict();
    return json({
      triggerFired: Object.keys(sdkReal).length > 0,
      filingPin: FILING_PIN.slice(0, 12),
      filedAtPin: holds(atPin),
      absentBeforePin: !holds(before),
      pinFilesAtFloor: verdict.files - 1 >= FLOORS.pinFiles,
      pinBytesAtFloor: verdict.textBytes - Buffer.byteLength(PIN_PLANT_TEXT, "utf8") >= FLOORS.pinBytes,
      pinLiveness: liveness(verdict.anchored),
      pinMentions: findingsFor(verdict, [PIN_PLANT], false),
      pinPlant: findingsFor(verdict, [PIN_PLANT], true),
    });
  },
  Z2: () => {
    const { paths } = piListing();
    const verdict = piVerdict();
    const plantPaths = Object.keys(PI_PLANTS);
    expect(
      plantPaths.filter(path => paths.includes(path)),
      "no plant path is a listed Pi file",
    ).toEqual([]);
    const real = findingsFor(verdict, plantPaths, false);
    expect(real, `zero Pi mentions of ${RECORD} until it ships`).toEqual({});
    expect(
      plantPaths.filter(path => (verdict.findings[path] ?? []).length === 0),
      "every planted spelling is read by the judge, a numeric reference the HTML standard decodes through its table included (wb-s876 cut #3)",
    ).toEqual([]);
    const plantBytes = Object.values(PI_PLANTS).reduce((sum, text) => sum + Buffer.byteLength(text, "utf8"), 0);
    return json({
      piMentions: real,
      scope: "listed files minus the tracker export and the holders",
      filesAtFloor: paths.length >= FLOORS.piFiles,
      scriptsAtFloor: verdict.scripts - plantPaths.filter(path => SCRIPT.test(path)).length >= FLOORS.piScripts,
      binariesAtFloor: verdict.binaries.length >= FLOORS.piBinaries,
      bytesAtFloor: verdict.textBytes - plantBytes >= FLOORS.piBytes,
      liveness: liveness(verdict.anchored),
      piPlants: findingsFor(verdict, plantPaths, true),
    });
  },
  Z3: () => {
    const title = exportRow(BEAD).title;
    const record = /When Furnace ships (\S+) \(proposed/.exec(title)?.[1] ?? "-";
    const forms: Readonly<Record<string, string>> = {
      camel: "FurnaceObserverBoundaryV0",
      snake: "furnace_observer_boundary_v0",
      kebab: "furnace-observer-boundary-v0",
      dotted: "furnace.observer.boundary.v0",
      spaced: "Furnace Observer Boundary V0",
      upper: "FURNACE_OBSERVER_BOUNDARY_V0",
      family: "FurnaceObserverBoundary",
      laterVersion: "FurnaceObserverBoundaryV1",
      stem: "the observer boundary",
      possessive: "the observer's boundary",
      plural: "observers' boundaries",
      markup: "Observer**Boundary**",
      lineBreak: "observer\nboundary",
      formJoined: `Observer${String.fromCodePoint(0x200b)}Boundary`,
    };
    const spellingForms = Object.fromEntries(Object.entries(forms).map(([form, text]) => [form, mentions(text)]));
    expect(Object.entries(spellingForms).filter(([, read]) => !read).map(([form]) => form), "every spelling form of the record is read").toEqual([]);
    const own = declaredNames(observer()).filter(name => /observ/i.test(name));
    const sibling = (exportRow(SIBLING).title.match(/\bFurnace\w+V0\b/g) ?? []).filter(name => name !== record);
    expect(own.length, "the observer's own observ-names were read").toBeGreaterThanOrEqual(4);
    expect(own.filter(mentions), "the observer's own identifiers are not the record").toEqual([]);
    expect(sibling.filter(mentions), "the sibling record is not this record").toEqual([]);
    return json({ recordWords: recordWords(record), spellingForms, piIdentifiersQuiet: !own.some(mentions), siblingQuiet: sibling });
  },
  Q1: () => {
    const exportHits = (textOf(EXPORT).match(MENTION) ?? []).length;
    expect(exportHits, "the tracker export spells the record (the bead's own row)").toBeGreaterThanOrEqual(1);
    return json({ residual: "R-TRACKER", exportSpellsRecord: exportHits >= 1, exportListed: piListing().paths.includes(EXPORT), trackerExcluded: piListing().excluded.some(path => path.startsWith(TRACKER)) });
  },
  Q2: () => {
    const spells = HOLDERS.map(path => existsSync(join(REPO, path)) && mentions(textOf(path)));
    return json({ residual: "R-HOLDER", holders: [...HOLDERS], holdersSpellRecord: spells, holdersListed: HOLDERS.filter(path => piListing().paths.includes(path)) });
  },
  Q3: () => {
    const plant = Buffer.concat([Buffer.from([0]), Buffer.from(` ${RECORD} `, "utf8")]);
    const verdict = verdictOf("media/zz-plant.bin", plant);
    return json({ residual: "R-BINARY", plantBinary: verdict.binary, plantForms: [...verdict.forms], realBinariesAtFloor: piVerdict().binaries.length >= FLOORS.piBinaries });
  },
  Q4: () => {
    const constructed = ["Origin to the latest observed boundary.", "the observation boundary of a Run"];
    const binaries = piVerdict().binaries;
    const realLines = piListing()
      .paths.filter(path => !binaries.includes(path))
      .flatMap(path => textOf(path).split("\n"))
      .filter(line => /\bobserv(?:ed|ation)\s+boundar/i.test(line));
    return json({ residual: "R-PARAPHRASE", constructedQuiet: constructed.map(text => !mentions(text)), realParaphrasesQuiet: realLines.every(line => !mentions(line)) });
  },
  Q5: () => json({ residual: "R-WORD-ORDER", quiet: ["the boundary of the observer", "BoundaryObserverV0"].map(text => !mentions(text)) }),
  Q6: () => {
    const interior = {
      formCharacter: `Obs${String.fromCodePoint(0x200b)}erver Boundary`,
      confusable: `${String.fromCodePoint(0x043e)}bserver boundary`,
      entityOutsideMarkup: "// &#79;bserver Boundary",
      markup: "Obs*erver* Boundary",
      escapeOutsideDecodedKinds: 'echo "\\u004fbserver Boundary"',
      namedReference: "Obs&shy;erver Boundary",
      overrideReversed: `${OVERRIDE}yradnuob revresbo${POP}`,
      numericWithoutSemicolon: "observer&#146s boundary",
      namedWithoutSemicolon: "observer&ampboundary",
    };
    const at: Readonly<Record<string, string>> = { entityOutsideMarkup: "src/zz.ts", escapeOutsideDecodedKinds: "scripts/zz.sh", numericWithoutSemicolon: "docs/zz.html", namedWithoutSemicolon: "docs/zz.html" };
    return json({ residual: "R-INTERIOR", quiet: Object.fromEntries(Object.entries(interior).map(([kind, text]) => [kind, verdictOf(at[kind] ?? "docs/zz.md", Buffer.from(text, "utf8")).forms.length === 0])) });
  },
  Q7: () => {
    const computed = {
      substitution: "export const n = `Observer$" + "{part}Boundary`;\n",
      runtimeJoin: 'export const n = ["Obs", "erver", "Boundary"].join("");\n',
      charCode: 'export const n = String.fromCharCode(79) + "bserverBoundary";\n',
    };
    return json({ residual: "R-COMPUTED", quiet: Object.fromEntries(Object.entries(computed).map(([kind, text]) => [kind, verdictOf("src/zz.ts", Buffer.from(text, "utf8")).forms.length === 0])) });
  },
  Q8: () => {
    const { verbs } = docs09Furnace();
    const controlCalls = verbCalls(parse(CONTROL, textOf(CONTROL)), verbs);
    const globalText = GLOBAL_PLANT.bytes.toString("utf8");
    return json({
      residual: "R-OTHER-MODULE",
      judgedModule: OBSERVER,
      otherModuleCallsExcludedVerbs: controlCalls.length > 0,
      globalPlant: { reads: augmentedReads(GLOBAL_PLANT.path, globalText), declares: otherModuleClients(GLOBAL_PLANT.path, globalText), globalObjects: globalObjects(GLOBAL_PLANT.path, globalText) },
      listedGlobalObjects: piEntries()
        .filter(item => SCRIPT.test(item.path))
        .flatMap(item => globalObjects(item.path, item.bytes.toString("utf8"))),
    });
  },
  Q9: () => {
    const computedKey = planted(observerText(), "close():void {this.shutdown.abort();this.markStale();}", 'close():void {const key="cli"+"ent";void (this as unknown as Record<string,unknown>)[key];this.shutdown.abort();this.markStale();}');
    const uses = clientUses(parse(OBSERVER, computedKey));
    return json({ residual: "R-COMPUTED-ACCESS", reads: uses.reads.length, unchained: uses.unchained });
  },
  Q10: () => {
    const text = textOf(DOCS09);
    const real = docs09Reading(text);
    const blocksOf = (page: string): readonly RenderedBlock[] => docsSection(page, DOCS09_SECTION.slice("## ".length), 2, [DOCS09_TITLE]).blocks;
    const uncounted: Readonly<Record<string, string>> = {
      paraphrase: "> Pi's Furnace observer also follows each Run's event stream.",
      confusable: `> The external Furn${String.fromCodePoint(0x0430)}ce reader uses explicit bounded status/attempt/log-reference/event-stream p${String.fromCodePoint(0x043e)}lling.`,
      quoteNestedTable: `> | Reader |\n> | --- |\n> | ${widened(FURNACE_READS)} |`,
      itemNestedTable: `- note\n\n  | Reader |\n  | --- |\n  | ${widened(FURNACE_READS)} |`,
      linkTitle: `[see](https://example.invalid "${widened(FURNACE_READS)}")`,
      apostropheLetter: `> ${possessive(String.fromCodePoint(0x2bc))}`,
      apostropheQuote: `> ${possessive(String.fromCodePoint(0x2018))}`,
      privateUse: `> ${spelledInside(String.fromCodePoint(0xe000))}`,
      unassigned: `> ${spelledInside(String.fromCodePoint(0x378))}`,
      apostropheGrave: `> ${possessive(String.fromCodePoint(0x60))}`,
      apostropheAcute: `> ${possessive(String.fromCodePoint(0xb4))}`,
      apostrophePrime: `> ${possessive(String.fromCodePoint(0x2032))}`,
      apostropheTurnedComma: `> ${possessive(String.fromCodePoint(0x2bb))}`,
      apostropheFullWidthGrave: `> ${possessive(String.fromCodePoint(0xff40))}`,
      apostropheArmenian: `> ${possessive(String.fromCodePoint(0x55a))}`,
      quoteQuoteTable: `> > | Reader |\n> > | --- |\n> > | ${widened(FURNACE_READS)} |`,
      itemItemTable: `- a\n  - b\n\n    | Reader |\n    | --- |\n    | ${widened(FURNACE_READS)} |`,
      tableReference: "> | Reader |\n> | --- |\n> | Pi&shy;docs. |",
      tableControl: "> | Reader |\n> | --- |\n> | Pi&#1;docs. |",
      imageTitle: `![x](https://example.invalid/x.png "${widened(FURNACE_READS)}")`,
      definitionTitle: `[ref]: https://example.invalid "${widened(FURNACE_READS)}"`,
    };
    const pages = Object.entries(uncounted).map(([kind, block]): [string, string] => [kind, afterFurnace(text, block)]);
    const quiet = Object.fromEntries(pages.map(([kind, page]) => [kind, isDeepStrictEqual(docs09Reading(page), real)]));
    const blockPinReds = Object.fromEntries(pages.map(([kind, page]) => [kind, !isDeepStrictEqual(blocksOf(page), blocksOf(text))]));
    expect(
      Object.keys(quiet).filter(kind => quiet[kind] !== true),
      "every R-DOCS-UNCOUNTED plant reads as the real page reads: the subject-word reading does not count it (cut #4)",
    ).toEqual([]);
    expect(
      Object.keys(blockPinReds).filter(kind => blockPinReds[kind] !== true),
      "every R-DOCS-UNCOUNTED plant changes the section's block list, which the block pin reds on docs/09 itself (cut #4)",
    ).toEqual([]);
    expect(
      [0xb4, 0xff40].map(code => String.fromCodePoint(code).normalize("NFKC")),
      "NFKC folds U+00B4 and U+FF40, each to no apostrophe the possessive reads (cut #4 F2)",
    ).toEqual([String.fromCodePoint(0x20, 0x301), String.fromCodePoint(0x60)]);
    return json({ residual: "R-DOCS-UNCOUNTED", plants: uncounted, quiet, blockPinReds });
  },
  Q11: () => {
    const text = textOf(DOCS09);
    const real = docs09Reading(text);
    const next = "\n## Derived view indexes\n";
    expect(text.includes(next), "docs/09 still holds the other section the plant writes into").toBe(true);
    const otherSection = text.replace(next, () => `\n${widened(FURNACE_READS)}\n${next}`);
    const nextHeading = afterFurnace(text, `## ${widened(FURNACE_READS)}`);
    const readerAdapters = docsSection(text, "Reader adapters", 2, [DOCS09_TITLE])
      .blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []))
      .filter(item => item.startsWith("Furnace:"));
    expect(
      readerAdapters.filter(item => item.includes("event stream")),
      "docs/09's Reader adapters list names a Furnace event stream, outside the bound section, which the reading does not read (R-DOCS-ELSEWHERE, cut #4)",
    ).toHaveLength(1);
    return json({
      residual: "R-DOCS-ELSEWHERE",
      quiet: { otherSection: isDeepStrictEqual(docs09Reading(otherSection), real), nextHeading: isDeepStrictEqual(docs09Reading(nextHeading), real) },
      readerAdapters,
    });
  },
  Q12: () => {
    const listed = piEntries().filter(item => SCRIPT.test(item.path) && item.path !== OBSERVER);
    return json({
      residual: "R-ALIASED-MODULE",
      plantReads: augmentedReads(ALIAS_PLANT.path, ALIAS_PLANT.bytes.toString("utf8")),
      plantDeclares: otherModuleClients(ALIAS_PLANT.path, ALIAS_PLANT.bytes.toString("utf8")),
      listedDeclarations: listed.flatMap(item => otherModuleClients(item.path, item.bytes.toString("utf8"))),
    });
  },
};

describe("wb-dqf.1 Furnace observer-boundary census (FURNACE-CAC-EXECUTION-ASSURANCE-R4, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "W:3", "Z:3", "Q:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const quoted = ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins);
    expect(Object.keys(QUOTES).sort(), "every pin of rows T, W and Z carries a quote").toEqual([...quoted].sort());
    expect(Object.keys(CLAIMS).sort(), "every quoted pin carries claims").toEqual([...quoted].sort());
    expect(
      ROSTER.rows.flatMap(row => row.pins).map(pin => ({ id: pin.id, quote: pin.quote, claims: pin.claims })),
      "the roster holds each pin's quote and claims",
    ).toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => ({ id: pin, quote: QUOTES[pin] ?? null, claims: CLAIMS[pin] === undefined ? null : json(CLAIMS[pin]) })));
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row").toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      json({
        record: RECORD,
        siblingRecord: SIBLING_RECORD,
        mention: { source: MENTION.source, flags: MENTION.flags },
        script: SCRIPT.source,
        dash: DASH,
        recordedStatus: RECORDED_STATUS,
        acceptance: ACCEPTANCE,
        filingSha256: FILING_SHA256,
        ownerLeads: [...OWNER_LEADS],
        armed: ARMED,
        tracker: TRACKER,
        holders: [...HOLDERS],
        observer: OBSERVER,
        control: CONTROL,
        identity: IDENTITY,
        schemaLiteral: SCHEMA_LITERAL,
        docs09: DOCS09,
        docs09Section: DOCS09_SECTION,
        docs09Title: DOCS09_TITLE,
        restated: [...RESTATED],
        numericReferences: Object.fromEntries([...NUMERIC_REFERENCES].map(([from, to]) => [`0x${from.toString(16)}`, `0x${to.toString(16)}`])),
        sdk: SDK,
        tarball: TARBALL,
        lockKey: LOCK_KEY,
        filingPin: FILING_PIN,
        floors: FLOORS,
        sdkPlants: Object.fromEntries(Object.entries(SDK_PLANTS).map(([form, plant]) => [form, { path: plant.path, text: plant.bytes.toString("utf8") }])),
        piPlants: PI_PLANTS,
        pinPlant: PIN_PLANT,
        augmentationPlant: { path: AUGMENTATION_PLANT.path, text: AUGMENTATION_PLANT.bytes.toString("utf8") },
        heritagePlant: { path: HERITAGE_PLANT.path, text: HERITAGE_PLANT.bytes.toString("utf8") },
        classPlant: { path: CLASS_PLANT.path, text: CLASS_PLANT.bytes.toString("utf8") },
        classExtendsPlant: { path: CLASS_EXTENDS_PLANT.path, text: CLASS_EXTENDS_PLANT.bytes.toString("utf8") },
        kindsPlant: { path: KINDS_PLANT.path, text: KINDS_PLANT.bytes.toString("utf8") },
        aliasPlant: { path: ALIAS_PLANT.path, text: ALIAS_PLANT.bytes.toString("utf8") },
        globalPlant: { path: GLOBAL_PLANT.path, text: GLOBAL_PLANT.bytes.toString("utf8") },
        anchors: [...ANCHORS],
        readers: [...READERS],
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const [pin, impl] of Object.entries(IMPL)) {
      expect(/\bROSTER\b|rosterWitness|readRoster/.test(impl.toString()), `${pin}'s case reads no roster (SELF-READ)`).toBe(false);
    }
    const pins = ROWS.flatMap(row => row.pins);
    expect(
      pins.map(pin => [pin, READERS.some(reader => new RegExp(`\\b${reader}\\(`).test(String(IMPL[pin])))]),
      "every case names a reader of the subject, so a constant witness reds (wb-6c6i F2)",
    ).toStrictEqual(pins.map(pin => [pin, true]));
  });

  it("the outside anchors: the bead's export row binds the rows, the quotes, the record, the armed clause, the status and the acceptance; docs/09 binds the reads and the verbs; the filing pin and the sibling row bind their readings", { timeout: 60_000 }, () => {
    const { title, notes } = exportRow(BEAD);
    const id = /^\[(FURNACE-CAC-EXECUTION-ASSURANCE-R\d+)\] /.exec(title);
    expect(id?.[1], "the title opens with the bead's requirement id").toBe("FURNACE-CAC-EXECUTION-ASSURANCE-R4");
    const statement = title.slice(id?.[0].length ?? 0);
    const label = (row: string): string => ROWS.find(entry => entry.id === row)?.label ?? "";
    expect(tiles(statement, [label("T"), ARMED, label("W"), label("Z")], TITLE_SEPARATORS), "rows T, W and Z and the armed clause tile the title, in order").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its label`).toBe(true);
    }
    for (const [pin, claims] of Object.entries(CLAIMS)) expect(tiles(QUOTES[pin] ?? "", Object.keys(claims)), `${pin}'s claim terms tile its quote`).toBe(true);
    const record = /When Furnace ships (\S+) \(proposed, not shipped\)/.exec(statement)?.[1];
    expect(record, "the record is the title's token").toBe(RECORD);
    const filing = ownerFiling(notes);
    expect(filing.includes(`Gating artifact: ${RECORD}, ${RECORDED_STATUS} (`), "the owner filing names the same record and its recorded status").toBe(true);
    expect(MENTION.source, "MENTION is built from the record's own middle words").toBe(mentionSource(recordWords(RECORD)));
    expect(MENTION.flags, "read in any case, by code point").toBe("giu");
    expect(filing.includes(ACCEPTANCE), "ACCEPTANCE is the owner filing's acceptance on landing, verbatim").toBe(true);
    expect(filing.includes("Gate: the record appears in a released Furnace surface Pi vendors (@furnace/sdk"), "the gate is a released surface Pi vendors").toBe(true);
    const weakened = ACCEPTANCE.replace("asserts only the exposed fields/counters are projected", "asserts the exposed fields/counters are projected");
    expect(weakened, "the weakening control changes the acceptance").not.toBe(ACCEPTANCE);
    expect(ownerFiling(`${notes.replace(ACCEPTANCE, weakened)}\n\nA later note quoting it: ${ACCEPTANCE}`).includes(ACCEPTANCE), "a replaced owner sentence is not masked by a later verbatim quote (G22b)").toBe(false);
    expect(ownerFiling(`${notes}\n\nLANDED (a later note quoting it: ${ACCEPTANCE})`), "an appended note leaves the owner filing as it was (G22a)").toBe(filing);
    const digest = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
    const leads = (text: string): number[] => OWNER_LEADS.map(lead => text.split(lead).length - 1);
    expect(digest(filing), "the owner filing is the one this file binds, byte for byte: an edit inside its two blocks reds (wb-s876 F3)").toBe(FILING_SHA256);
    expect(leads(filing), "each bound owner sentence stands in the filing exactly once, by its lead (wb-s876 F3)").toEqual(OWNER_LEADS.map(() => 1));
    const [head = "", body = "", ...later] = notes.split("\n\n");
    const duplicated = ownerFiling([head, `${body.replace(ACCEPTANCE, weakened)}\n(owner restatement) ${ACCEPTANCE}`, ...later].join("\n\n"));
    expect(
      { verbatimKept: duplicated.includes(ACCEPTANCE), sameDigest: digest(duplicated) === FILING_SHA256, leads: leads(duplicated) },
      "an in-filing duplicate - a weakened sentence restated verbatim inside the same block - reads as an edit and a second lead (L2-F7a)",
    ).toStrictEqual({ verbatimKept: true, sameDigest: false, leads: [1, 1, 1, 2] });
    const cited = /Today the external Furnace reader is explicit bounded (\S+) polling \(docs\/09 § ([^;]+);/.exec(filing);
    expect(DOCS09_SECTION.startsWith(`## ${cited?.[2] ?? "-"}`), "the notes cite docs/09's section").toBe(true);
    const furnace = docs09Furnace();
    expect(furnace.reads, "docs/09 states the notes' reads").toEqual(cited?.[1]?.split("/"));
    expect(furnace.verbs, "docs/09 states the excluded verbs").toEqual(["create", "resume", "stop"]);
    expect(git(["cat-file", "-t", FILING_PIN]).toString("utf8").trim(), "the filing pin is a commit of this repository").toBe("commit");
    const sibling = exportRow(SIBLING).title;
    expect((sibling.match(/\bFurnace\w+V0\b/g) ?? []).sort(), "wb-dqf.2's title names the program's two proposed records").toEqual([SIBLING_RECORD, RECORD].sort());
    expect(textOf("package.json").includes(`"${SDK}": "file:${TARBALL}"`), "package.json resolves the SDK to the vendored release").toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
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
