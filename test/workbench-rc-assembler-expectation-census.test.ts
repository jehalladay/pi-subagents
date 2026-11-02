/**
 * wb-km7q.2 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R7, program-triage-2026-10-18 child of wb-km7q), the
 * until-then leg of a gating carrier. Statement (the bead title): "If Pi ever supplies speculation or freshness inputs to
 * ReactiveComponentsSDK assembly (RC extension 2 acquire/include/place; design only; gated RC-RQ1..RC-RQ7), speculation
 * controls resource acquisition at the Pi host only and never assembler execution, Pi decides temporal freshness, and no Pi
 * surface expects the assembler to acquire resources, schedule acquisition or judge freshness."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C joined by one space are this clause word for word, read
 * from the tracked bead export): "gating census — no Pi code or doc expects the assembler to acquire, schedule or judge
 * freshness until the RC gates pass and an actual Pi seam exists".
 * CLAIMED: that clause exactly. NOT CLAIMED (ROSTER.unclaimed, each held to the title): the title's two armed duties
 * ("speculation controls resource acquisition at the Pi host only and never assembler execution", "Pi decides temporal
 * freshness") bind once Pi supplies speculation or freshness inputs to assembly; no Pi input reaches an assembler today (C2),
 * so there is nothing to judge.
 *
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat on 2026-10-26 in the local
 * ReactiveComponentsSDK checkout with git show; this census is hermetic and never re-reads it): the charter
 * docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (45e62320) at the bead pin
 * 44b72145b175 and at origin/master 04e614620b0c, and the roster vendors four of its lines with their sha256 (UTF-8, no line
 * end): :3 the status line ("design only"), :12 the acquire/include/place split, :38 the scope boundary ("No model execution,
 * tool dispatch, global cache or resource acquisition scheduler" ... "let host decide temporal freshness") and :46 the
 * acceptance line naming RC-RQ1..RC-RQ7. The :12 split sentence itself names the assembler beside acquire and obtain with no
 * negation, so it reads as a finding (C1's readings): a Pi page quoting it verbatim is held to the guard, and Pi restates the
 * split with a negation, as the charter's own next sentence does ("Speculation controls acquisition at the host, not
 * assembler execution.", read MARKER).
 * GATE: rcGateOf(producer) reads PASSED only when the status line no longer carries "design only" and the acceptance line still
 * names all seven gates, NOT-PASSED otherwise (a missing line fails closed). The Pi side (C2) reads PRESENT once a Pi code
 * module names a ReactiveComponents module (outside its comments) or package.json depends on one, ABSENT otherwise. gateOf is
 * OPEN only when the RC gates read PASSED and the Pi seam reads PRESENT; while it reads CLOSED the guard requires zero
 * findings, and on OPEN it stands down (the title's armed duties then govern).
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the
 *   runs of a-z and 0-9 (ReactiveComponentsSDK reads reactive components sdk; rcAssembler reads rc assembler; snake_case and
 *   kebab-case split at their separators).
 * - SUBJECT (the assembler): the words assembler and assemblers, whatever assembler they name (Pi has none of its own: A2's
 *   frozen pass reads 0 code readings naming one); the RC name - the adjacent pairs reactive components and rc sdk, or a word
 *   opening with reactivecomponent (reactivecomponents, reactivecomponentssdk); an ASSEMBLY word (assembly, assemblies,
 *   assemble, assembles, assembled, assembling) only when the same text carries an ANCHOR word (context, contexts, component,
 *   components, rc, rf, fiber) - an assembly word with no anchor is Pi's own sense (a reply assembly, an assembled prompt)
 *   and reads UNANCHORED (R-UNANCHORED). rc or RC alone is an anchor, never the subject (R-SHORT-NAME).
 * - FAMILIES (what no Pi surface may expect of it; the clause's verbs and the title's speculation): acquire (acquire,
 *   acquires, acquired, acquiring, acquisition, acquisitions, obtain, obtains, obtained, obtaining, speculate, speculates,
 *   speculated, speculating, speculation, speculations, speculative, speculatively - the charter defines acquire as whether
 *   the host obtains a resource, and speculation as what controls acquisition); schedule (schedule, schedules, scheduled,
 *   scheduling, scheduler, schedulers and the reschedule forms); freshness (fresh, fresher, freshest, freshness, stale, staler,
 *   stalest, staleness).
 * - MARKERS: not, no, never, nor, neither, without, cannot, until, unless, gated, unshipped, proposed, none and nothing as
 *   words, the n't contraction, and the pair design only. A modal (should, must, shall, will) or an if/when condition is
 *   never a marker: "the assembler should acquire" is an expectation.
 * - READING of one text: none when it carries no family word or no assembler word; UNANCHORED when its only assembler words
 *   are assembly words with no anchor; MARKER when it names the subject and a family beside a marker (R-MARKER-ANYWHERE);
 *   otherwise a FINDING naming its families. Pi states the charter's split with a negation ("the assembler never acquires"),
 *   so a sentence naming the assembler beside a family word without one is read as expecting it.
 * - CODE (row A, "no Pi code"): every git-listed JS or TS module (tracked or untracked, never ignored) below src/, qa/ and
 *   examples/ and at the repository root, parsed with the TypeScript compiler. Its readings: LEXEME each identifier, string
 *   literal, regular expression literal and template part, and each template, template literal type or concatenation as
 *   spelled (its literal parts in order, a non-constant part read as one space); ACCESS each property access as written, each element access and each indexed access type as its
 *   receiver joined to its constant key (or "?"), and each destructured property joined after its initializer (or its
 *   parameter's type); MEMBER each member name of an object literal, interface, type literal, class or enum joined after the
 *   names of its named enclosing declarations; IMPORT each imported or re-exported name joined after its module specifier;
 *   COMMENT each sentence of each comment, read from the trivia around every token (an empty block's comment included). A
 *   finding is `<path>:<line> <via> <families>`.
 * - DOC (row A, "or doc"): every git-listed .md page below docs/, examples/, .agents/ and .pi/ and at the repository root,
 *   read as its source is written once its placed comments are out (COMMENTS OUT, claimed only as its rows and PINNED
 *   hold it; R-SOURCE-AS-WRITTEN) and cut into
 *   sentences after ".", "!", "?" or ";" before white space or the line end, at a line holding only white space, around a
 *   line that opens with a pipe after white space and an ATX heading line (one to six # after at most three white-space
 *   characters, then white space or the line end), and before a line that opens, after white space, with -, + or * or with
 *   ASCII digits and . or ), then white space (a marker alone before the line end is no list cut); a sentence otherwise runs
 *   on across line breaks. A finding is `<path>:<line> <families>`. WHITE SPACE here is
 *   JavaScript's \s, the set String.prototype.trim strips: cutter.space.engine reads both from the engine over every code
 *   point, the same 25 (U+0009-U+000D, U+0020, U+00A0, U+1680, U+2000-U+200A, U+2028, U+2029, U+202F, U+205F, U+3000 and
 *   U+FEFF), scanning all 1,112,064 code points but the surrogates (scanned); the line feed is the line break itself, so
 *   white space inside a line is the other 24. CLAIMED: the cut on exactly the shapes the A3 cutter rows below hold, each
 *   over the domain it names, and on no other shape (wb-ro24, the R694 follow-up of landing 654; cut #3, in the
 *   enumerate-the-resolvable form that its refusals #1 and #2 bind). NOT CLAIMED, though the same four expressions and the
 *   blank-line test cut it: a run past the bound its count gives; at one place, a run of two or more white-space code
 *   points, but a run a count holds (of spaces or of tabs, within its bound, for its place and alternative), blank's code
 *   point twice and cutter.blank's space and tab; a list marker with more than two digits, but with no lead and a space
 *   after it (counts.digits); a code point above the BMP; before white space other than a space, a code point other than the
 *   four marks; and two places varied together, but a cross's items. The rows are in the clause's order. SWEEPS put every
 *   BMP code point but the surrogates and the line feed into one page shape each and sort the cuts into the readings this
 *   clause predicts for that shape (the common reading counted - run-on, or mark where the shape's "." ends a sentence
 *   whatever the code point - every other reading listed by code point, and a code point no prediction reads listed under
 *   other, held empty), one sweep for each alternative the clause names at a place: cutter.marks (Next, the code point, a
 *   space) and cutter.marksEnd (Next and the code point at the line end) cut after exactly the four marks, marksEnd trimming
 *   exactly the 24, and cutter.marksAfter (Next, the code point and ".", then A, the code point and "!", and so on through
 *   the four marks, each before a space) cuts after each mark whatever code point is before it; cutter.space cuts at exactly
 *   the 24 inline white-space code points at each place white space is read - after each of the four marks (terminator), on
 *   a line holding only it, once (blankOne) and twice (blank), before a pipe (pipe), before each run of one to six #
 *   (headingLead) and after it (headingTrail), and before each of the markers -, +, *, 1. and 1) (listLead) and after it
 *   (listTrail) - and lists the code points that make a line of their own there (whole: # and | at blankOne, ## and || at
 *   blank, | at pipe and at each listLead, # and | at headingLead before one to five #, | alone before six; mark: at
 *   blankOne and blank, a line holding only a mark, once or twice, ends the sentence after it; digit: at listLead 1. and 1),
 *   each of the ten ASCII digits, which keeps the line a list marker's; listLead 1. counts mark, since its "." ends a
 *   sentence whatever opens the line); cutter.openers (the code point then a space, opening a line) cuts before exactly -, +
 *   and *, around exactly # and |, after exactly the four marks, and trims exactly the 24; cutter.digitsFirst (the code
 *   point, then ")" or ".", opening a line) and cutter.digits (1, the code point, then ")" or ".") read exactly the ten
 *   ASCII digits as digits, first and after a digit, before each delimiter, so no other script's digit and no fullwidth
 *   digit is one (digitsFirst also lists | as a pipe line, whole, and trims the 24; before "." both count mark);
 *   cutter.delimiters (1 and the code point, then a space) cuts before exactly ")", before and after exactly "." (the
 *   terminator cuts after it), and after exactly !, ? and ;. COUNTS are bounded runs of spaces and of tabs, each claimed
 *   only within its bound, for each alternative its place names: of the runs of one to twelve #, before a space and alone
 *   before the line end, exactly one to six cut (cutter.counts.hashes, hashesEnd); of zero to eight spaces and of zero to
 *   eight tabs before each run of one to six #, exactly zero to three cut, the count being of characters, never of tab stops
 *   (headingLead); every run of one to eight spaces and of one to eight tabs after each run of one to six # cuts
 *   (headingTrail); every run of one to thirty-two ASCII digits before ")" and before "." cuts (digits); every run of zero
 *   to thirty-two spaces and of zero to eight tabs before each of the five markers and before a pipe cuts (listLead,
 *   pipeLead); and every run of one to eight spaces and of one to eight tabs cuts after each of the five markers
 *   (listTrail), as a line of its own (blank) and after each of the four marks (terminatorTrail). CROSSES vary a lead and a
 *   trail together, each item held to the one reading this clause predicts for it and counted as held, an item cut any other
 *   way listed under other, held empty: cutter.cross.heading each run of one to six #, after no lead or one of the 24,
 *   before one of the 24 or the line end (each cut); cross.list each of the markers -, +, *, 1., 1), 12. and 12), after no
 *   lead or one of the 24, before one of the 24 (each cut); and cross.alone each of those seven, after no lead or one of the
 *   24, alone before the line end (no list cut; after "." the terminator cuts). ROWS beside their near misses:
 *   cutter.terminator each of the four marks before a space, a mark before a tab and at the line end, a mark before a letter
 *   (no cut); cutter.blank a line holding a space and a tab; cutter.pipe a pipe after spaces and after a tab, and the line
 *   after a pipe line; cutter.heading six #, seven # (no cut), three spaces, four spaces (no cut), a tab before the #, a tab
 *   after it, a # alone, a # before a letter (no cut), and the lines on both sides of a heading; cutter.list -, +, *, digits
 *   and ., digits and ), two digits, after spaces, after a tab, a tab after the marker, a marker before a letter (no cut),
 *   and the line after a list marker's line (no cut); cutter.alone -, +, * and 1) alone before the line end (no cut), and 1.
 *   alone, which only the terminator cuts after.
 * - COMMENTS OUT (wb-cppf, the R694 follow-up of landing 553; narrowed by wb-ro24 cut #4 to the fail-closed core that
 *   orchestrator ruling R-B197 binds): the doc reading is the page source with its placed comments taken out, never the
 *   rendered view - no clause of this file claims what a rendered page shows. CLAIMED, and no wider: on the page of each A3
 *   row a clause names, exactly the reading the roster pins for it (findings, quieted sentences, unplaced spans, a
 *   placement or cut sentences, as the row records); A3's live and frozen unplaced lists held empty, so a comment the
 *   reader does not place on a live or frozen page reds A3 (the reader fails closed there); and a red census under each
 *   one-edit reader change PINNED names. A clause describes the reader only so that its rows can be read: a page shape no
 *   row holds is NOT CLAIMED, whatever the description would predict for it, and a reader change PINNED does not name is
 *   NOT CLAIMED either way (HOLES names every one this cut's battery leaves green).
 *   (1) TAKEN OUT: a span from `<!--` to the next `-->` (HTML_COMMENT, marked's own comment form: an unterminated one runs
 *   to the end of its token) in the source of a token that marked (the markdown grammar test/helpers/census.ts reads pages
 *   with) lexes as HTML, once placed (5): a marker only such a span holds quiets nothing (comments.hiddenMarker: inline
 *   after text, between two words and after a sentence's "."), a claim only it holds is not read (R-COMMENT-HIDDEN, an
 *   unterminated comment block's included), and an empty `<!-->` or `<!--->` is such a span, so the text after it is read
 *   (comments.empty: each form opening a comment block, and each inline before a later `-->`).
 *   (2) BLANKED: a comment block's opening comment - the span an HTML block token's source opens with after up to three
 *   spaces (comments.blanked: after none, one, two and three), as (5) confirms it, at the top level and in a list item
 *   (R-SPLIT's third row; R-COMMENT-BLOCK's listed rows) - is taken out with its line breaks kept, so a line holding
 *   nothing else but white space is a blank line (comments.lines[0-1], comments.blanked; the last comments.blanked row
 *   opens after four spaces, a code block, so its comment is read as written: (4)); the rest of its lines is read as
 *   written, but for another comment there, removed as (3) says (R-COMMENT-BLOCK). HOLES, no row's page reading differently
 *   either way: an opening comment in a block quote (comments.containers[1] and R-COMMENT-BLOCK's quoted rows read the same
 *   when it is joined (3) instead), the comment read as spaces rather than removed, and a lead past three spaces or of
 *   other white space.
 *   (3) JOINED: every other placed span is removed with its line breaks, so the text before it and after it read as one
 *   line (comments.joined, comments.lines[2-3]), and a line a removed span leaves holding no text is dropped, never read as
 *   a blank line, on the pages the rows hold: holding nothing (comments.joined[3]), two spaces (comments.joined[1]), a
 *   comment block's line holding its opening comment and a second comment, spaced or side by side (R-COMMENT-BLOCK's second
 *   rows), and one code point (comments.dropped: dropped for each of the 24 inline white-space code points DOC defines, but
 *   for the carriage return, whose page does not tile and so is unplaced (5), and kept as text for the near misses U+0085,
 *   U+00AD, U+180E, U+200B and U+2060). A HOLE: a line left holding any other run - two or more tabs, two or more U+00A0,
 *   two or more of one other code point, or a space and a tab together.
 *   (4) UNLEXED: comment-shaped text that marked does not lex as HTML - in a code span or a code block, after a backslash,
 *   an opener left unterminated in a paragraph - is read as written (comments.unlexed).
 *   (5) PLACED: the reader walks each top-level block's nested tokens (nestedTokens: a list's items; a table's header
 *   cells, then its body rows' cells, and each cell's own tokens; any other token's own tokens), moves a cursor past each
 *   leaf token's source as found in the block, and finds each span of an HTML token after the span before it; a span so
 *   found is placed only when marked, lexing the page again with a sentinel (a run of Q the page does not hold) written
 *   just inside its `<!--`, keeps the sentinel inside an HTML token, and it is a comment block's opening comment (2) when
 *   that token is a block whose source opens with it; a span the reader cannot place is not taken out: it is read as
 *   written and listed as unplaced. What the rows hold of this walk, in their own shapes and no other (each page's comment
 *   placed unless named otherwise):
 *   WALK - comments.order: a comment as the only own token of the first of two list items (bulleted with -, + and *,
 *   numbered 1. and from 3., loose, and nested in an item); second of three own tokens of the text of the first of two
 *   items numbered 1), and first of two own tokens of the text after the box of the first of two items with task boxes; in
 *   the first of a body row's two cells; in the last of two cells of the first of two body rows; first of a block quote's
 *   and of a list item's three own tokens (a comment block, a blank line, a paragraph); second of three own tokens of a
 *   list item's text and of a paragraph; and first of two own tokens of a heading, a strong (** and __), an em (* and _), a
 *   del, a link and an image. comments.cells: second of two own tokens of the first of two header cells, before a body row;
 *   its claim is on another line, so the row reads the same whether that cell is walked or not, and holds only the two
 *   cells' order. comments.cursor[0] and the last comments.unplaced row: two identical comments in a paragraph, side by
 *   side (its second and third of four own tokens) and apart (second and fourth of five). Every other comments row holds
 *   its comment where its own page puts it. The order of a list's items, a table's header cells, its body rows and a block
 *   quote's own tokens past these positions is deferred to wb-hhu9, the structural-exit child R-B197 files, with refusal
 *   #3's members GP15-Q01 to GP15-Q05 among the HOLES below; every other position is NOT CLAIMED by this census.
 *   CURSOR - comments.cursor[1]-[2]: two identical comments in one comment block's line, spaced and side by side, each
 *   placed.
 *   LINE BREAKS - source over several lines is found with each line break followed by the leads the comments.runs and
 *   comments.containers rows spell, each claimed only within its bound: a paragraph's continuation line opened with zero to
 *   thirty-two spaces, one to eight tabs, or one to four space-tab pairs (paragraph); a list item's continuation line
 *   opened with zero to sixteen spaces (item), and an item numbered 10.'s (ordered); the continuation line of the innermost
 *   of one to twelve nested list items, opened with the two to twenty-four spaces their indentation takes out of the
 *   token's source (nested), and of one to eight with a block quote in the innermost item (nestedQuote); the continuation
 *   line of two to twelve nested items opened with the one to six tabs their indentation covers whole (tabStops), and the
 *   mixed runs an indentation covers whole - a tab and two spaces under three items, two spaces, a tab and four spaces
 *   under four, a tab under an item numbered 1. whose text opens after two spaces, and two tabs under an item numbered
 *   123456. (mixedStops); a list item's continuation line opened with one to four tabs is unplaced (item: the item's
 *   two-column indentation takes only part of the first tab, and marked spells the rest as spaces in its token's source);
 *   one to eight quote marks opening both lines, unspaced and each followed by one space (depth, spacedDepth); zero to
 *   eight spaces and zero to four tabs after one quote mark (afterQuote), and a tab after a line's one quote mark
 *   (comments.containers); a block quote in a list item whose continuation line opens with zero to eight spaces or zero to
 *   four tabs before its quote mark (itemQuote: with fewer than two spaces, or no tab, the line is not the item's, so the
 *   opener is left unterminated and read as written, unlexed (4); from two tabs on the comment is unplaced, marked spelling
 *   the tabs past the item's indentation as spaces), and with a space and a tab in either order or a tab between two spaces
 *   (mixed); and a span over three lines in a block quote and in a list item (lines). Every other spelling around a quote
 *   mark is a HOLE: a tab after a quote mark another follows (refusal #3's GP15-Q10), two spaces or tabs after a quote mark
 *   (GP15-Q11), white space other than spaces and tabs before or after the marks, and one more space or tab after the last
 *   mark.
 *   SENTINEL - comments.sentinel: the link-destination misplacement page below, spelling each run of zero to sixty-four Q
 *   in a tag's attribute, lists its comment unplaced every time, so no run of up to sixty-four Q stands in for the
 *   sentinel; the sentinel's length is a HOLE. CRLF - a page's CRLF line ends are read as line feeds first, so a CRLF page
 *   tiles and its spans are placed (comments.crlf).
 *   Placed shapes held (comments.containers): a list item's space-indented lines, a block quote's lines, a block quote in a
 *   list item, nested block quotes, a block quote's line whose quote mark is followed by a tab, a block quote in a list
 *   item whose continuation line is indented with one tab before its quote mark; and two identical comments in one
 *   paragraph, each placed (the last comments.unplaced row). A3 holds the live and frozen unplaced lists empty. Unplaced
 *   shapes held (comments.unplaced): a comment spelling an escaped pipe in a table cell; every span on a page whose
 *   top-level blocks do not tile its source (a lone carriage return); a list item in a block quote whose continuation line
 *   repeats the quote mark before the item's indentation, bulleted or ordered; a list item's continuation line indented
 *   with a tab; and a span the cursor found in other text spelled the same way, which marked does not confirm - a link
 *   destination just before the comment (also on a page that spells QQ elsewhere, so neither Q nor QQ is the sentinel), a
 *   code span past an escaped pipe in its table cell, a code span on a later line after a tab-indented line; and an inline
 *   empty comment, `<!-->` or `<!--->`, with no later `-->` in its inline run, which the sentinel turns into text marked
 *   does not lex as HTML (with a later `-->` it is placed: comments.empty).
 *   (6) LINES: each kept line keeps the page line it starts on, so a finding names the page line its sentence starts on,
 *   and text after a span removed with its line breaks stays on the line the span opens on (comments.lines).
 *   PINNED (wb-ro24 cut #4's battery: each one-edit reader change below reds A3 and records, 2 failed | 9 passed (11), or
 *   with A1, 3 failed | 8 passed (11), on the rows named above; the member ids are the battery's, in the cut's evidence
 *   archive). WALK: a list's items reversed, its first two swapped, its first not walked, or none walked (WL-REV, WL-SWAP2,
 *   WL-DROPFIRST, WL-SKIP); a table's header cells reversed or its first two swapped (WH-REV, WH-SWAP2); its body rows
 *   reversed, the first two swapped, the first not walked, none walked, or walked before the header cells (WR-REV,
 *   WR-SWAP2, WR-DROPFIRST, WR-SKIP, WR-BEFOREHEADER); a body row's cells, and a cell's own tokens, reversed, the first two
 *   swapped, only the first walked, the last not walked, the first not walked, or none walked (WC- and WT-REV, -SWAP2,
 *   -FIRST, -DROPLAST, -DROPFIRST, -SKIP); a block quote's own tokens reversed, the first not walked, or none walked
 *   (WO-blockquote-REV, -DROPFIRST, -SKIP); a list item's own tokens reversed, reversed after the first
 *   (WO-list_item-TAIL1, as refusal #3's GP15-Q06), only the first walked, the last not walked, the first not walked, or
 *   none walked (WO-list_item-REV, -FIRST, -DROPLAST, -DROPFIRST, -SKIP); a list item's text's own tokens reversed,
 *   reversed after the first, the first two swapped, only the first walked, the first not walked, or none walked
 *   (WO-text-REV, -TAIL1, -SWAP2, -FIRST, -DROPFIRST, -SKIP; with the six kinds below, as refusal #3's GP15-Q07); a
 *   paragraph's own tokens each of the eight ways (WO-paragraph-*: reversed, reversed after the first, reversed after the
 *   second as refusal #3's GP15-Q08, the first two swapped, only the first walked, the last not walked, the first not
 *   walked, none walked); and a heading's, a strong's, an em's, a del's, a link's and an image's own tokens reversed, the
 *   first two swapped, the first not walked, or none walked (WO-<kind>-REV, -SWAP2, -DROPFIRST, -SKIP). CURSOR: the cursor
 *   moved to a leaf's start, or never moved (CU-START, CU-NONE); an HTML token's later span searched from the token's start
 *   (CU-INNER); only a token's first span read (CU-FIRST-COMMENT); any token whose source holds `<!--` read as an HTML
 *   token (CU-ANY-TOKEN); an unplaced span neither listed nor read (CU-UNPLACED-DROP); no tiling test (CU-NO-TILE); only
 *   the top-level HTML tokens read for the sentinel (HT-TOP). LINE BREAKS: the lead before the quote marks spaces only,
 *   tabs only, none, or one or more (SP-SPACES-ONLY-LEAD, SP-TABS-ONLY-LEAD, SP-NO-LEAD, SP-LEAD-PLUS); a quote mark
 *   followed by a space only, a tab only, nothing, or any run of spaces and tabs (SP-MARK-SPACE-ONLY, SP-MARK-TAB-ONLY,
 *   SP-MARK-BARE, SP-LEAD-AFTER-MARK); at most one quote mark, at most four, or none (SP-ONE-MARK, SP-MARKS-4,
 *   SP-NO-MARKS); the search from the block's start, not the cursor (SP-NO-FROM); a spelling that ends at its bound refused
 *   (SP-END-GE). SENTINEL: always Q (KI-Q-ALWAYS, refusal #1's GE2); a span marked does not confirm read as placed
 *   (KI-NO-SENTINEL-CHECK), or taken out unlisted (KI-UNCONFIRMED-PLACED). (1): no empty alternative (HC-NO-EMPTY, refusal
 *   #1's GE1), only `<!--->` or only `<!-->` empty (HC-EMPTY-3, HC-EMPTY-2), a span to the last `-->` (HC-GREEDY), no
 *   unterminated span (HC-NO-OPEN-END), a span stopped at a line break (HC-LINE). (2): every placed span an opening
 *   comment, none, or one a block token holds anywhere (KI-NO-BLOCK, KI-NEVER-BLOCK, KI-ANY-INDEX); an opening comment at
 *   the top level, in a list, or anywhere below the top level, joined instead (KI-TOP-JOINED, KI-LIST-JOINED,
 *   KI-NESTED-JOINED); the lead's bound two spaces (LS-2); its line breaks not kept (BL-NO-BREAKS). (3): only an empty line
 *   dropped, only a line of spaces, only a line of at most one code point, a line of three or more spaces kept, no line
 *   dropped, or a comment block's line dropped too (DR-EMPTY-ONLY, DR-SPACES-ONLY, DR-ONE-CP, DR-THREE-SP, DR-NEVER,
 *   DR-ALWAYS-EMPTIED). (6): a removed span's line breaks not counted (LN-NO-COUNT). CRLF: only the first CRLF read as a
 *   line feed, or none (CR-FIRST-ONLY, CR-NONE).
 *   HOLES (NOT CLAIMED: each one-edit reader change below leaves the census at 0 failed | 11 passed (11), measured on cut
 *   #3's bytes and on cut #4's; no residual and no follow-up bead is made of a hole, but the walk order wb-hhu9 carries).
 *   WALK: a list's items reversed after the first or after the second, only the first walked, or the last not walked
 *   (WL-TAIL1 = refusal #3's GP15-Q01, WL-TAIL2, WL-FIRST, WL-DROPLAST); a table's header cells reversed after the first or
 *   after the second, only the first walked, the last not walked, the first not walked, or none walked (WH-TAIL1 =
 *   GP15-Q02, WH-TAIL2, WH-FIRST, WH-DROPLAST, WH-DROPFIRST, WH-SKIP); its body rows reversed after the first or after the
 *   second, only the first walked, or the last not walked (WR-TAIL1 = GP15-Q03, WR-TAIL2, WR-FIRST, WR-DROPLAST); a body
 *   row's cells reversed after the first or after the second (WC-TAIL1 = GP15-Q04, WC-TAIL2); a cell's own tokens the same
 *   two ways (WT-TAIL1, WT-TAIL2); a block quote's own tokens reversed after the first or after the second, two swapped,
 *   only the first walked, or the last not walked (WO-blockquote-TAIL1 = GP15-Q05, -TAIL2, -SWAP2, -FIRST, -DROPLAST); a
 *   list item's own tokens reversed after the second, or two swapped (WO-list_item-TAIL2, -SWAP2); a list item's text's own
 *   tokens reversed after the second, or the last not walked (WO-text-TAIL2, -DROPLAST); and a heading's, a strong's, an
 *   em's, a del's, a link's and an image's own tokens reversed after the first or after the second, only the first walked,
 *   or the last not walked (WO-<kind>-TAIL1, -TAIL2, -FIRST, -DROPLAST). CURSOR: an HTML token's span searched to the
 *   block's end, not the token's (CU-TOKEN-END). LINE BREAKS: a tab after a quote mark only after the last (GP15-Q10), up
 *   to two spaces or tabs after a quote mark (GP15-Q11), any white space after a quote mark or before the marks
 *   (SP-MARK-WS, SP-LEAD-WS), one more space or tab after the last mark (SP-SPACE-THEN-TAB-LAST), and no end bound
 *   (SP-NO-END). SENTINEL: grown by QQ (KI-QQ-STEP). (2): an opening comment in a block quote joined instead
 *   (KI-QUOTE-JOINED); one found at or before its lead (KI-LEAD-LE); the lead's bound four spaces, any run, or any white
 *   space up to three (LS-4, LS-ANY = refusal #1's GE3, LS-WS); the opening comment removed rather than read as spaces
 *   (BL-REMOVE). (3): a line left holding two or more tabs (GP15-Q14), two or more U+00A0 (GP15-Q16), two or more of one
 *   code point but the space (DR-TWO-SAME), or a space and a tab together (DR-MIXED) kept.
 * - SEAM (row C, "an actual Pi seam"): the one path by which assembled context reaches Pi is the registered
 *   reactivefiber.render.preview capability (read), spawned at the one rf launch site in src (a child-process launcher whose
 *   first argument's constant names rf: exactly the provider's spawn). Its spawned argv for both input arms and the
 *   environment names it hands rf (recorded by a stand-in rf on PATH in a makeScratch directory, the workspace value read as
 *   <root>) and every property name of its input schema are read word by word: a family word is a finding `<where>:<index>
 *   <families>`, no subject needed (the seam is the subject).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "gating census — no Pi code or doc expects the assembler": A1 the guard - ONE pass over every code module, every doc
 *    page, the seam's words and in-memory positives finds exactly the positives, and the same guard over a scratch git
 *    repository finds exactly its plants; A2 the code read set, the live and frozen code passes and the code reader's
 *    controls; A3 the doc read set, the live and frozen doc passes, the comments taken out and the sentence cutter; A4 the
 *    subject words, the anchors and the markers.
 *  B "to acquire, schedule or judge freshness": B1 the acquire family, B2 the schedule family, B3 the freshness family, each in
 *    a doc sentence and in code, with near misses.
 *  C "until the RC gates pass and an actual Pi seam exists": C1 the producer facts and the gate's near misses; C2 the Pi seam
 *    reading (no Pi module names a ReactiveComponents module, package.json depends on none, the only rf capability is the
 *    read preview at the one rf launch site, its argv, environment names and input schema carry no family word, docs/03's
 *    context-rendering ownership row).
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-km7q.2 in the tracked bead export (.beads/issues.jsonl;
 *   the first notes line opening with its citation, so appended notes never move it): its acceptance clause is the three
 *   labels joined, each label tiled by its pins; with its negation and its until-clause removed the clause reads as a finding
 *   of exactly the three families; the title's last clause (from "no Pi surface") with its "no" removed reads as a finding of
 *   exactly the three families, its speculation clause with "never" turned to "and" reads as an acquire finding, its
 *   "ReactiveComponentsSDK assembly" reads as the subject, its gate list RC-RQ1..RC-RQ7 expands to the producer's seven gate
 *   ids, and its citation pins equal the roster's. ROLE PLACES: every family, subject, assembly, marker and anchor word that
 *   the title, the citation line or the producer's lines spell at a fixed place (speculation, freshness, acquisition,
 *   acquire, schedule, obtain, scheduler, assembler, assembly, assembled, ReactiveComponentsSDK, never, no, until, not, design
 *   only, RC, rf, context, component) reads in its role. The producer's :12 last sentence reads MARKER by its "not" and as an
 *   acquire finding without it, and its :38 line names the acquire, schedule and freshness families with no subject.
 *   docs/03's ownership row gives context rendering to ReactiveFiberCLI. So a row, a pin or an anchored word removed from
 *   every literal of this file and of the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer
 *   facts, the unclaimed duties, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/rc-assembler-expectation-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row): R-OUTSIDE-ROOTS (A3) a claim in test/, vendor/, new-feedback/, media/,
 *   .beads/, .codex/ or .github/, a doc that is not a .md page (a text page, an upper-case .MD or a .markdown page) or a code
 *   file that is not a JS or TS module (a shell script, a .jsx module, a JSON or text file, root configuration) is not read;
 *   R-INDIRECT (A2) the subject and the family never inside one reading - an alias (const a = assembler; a.acquire()), a call
 *   argument (assembler.run("acquire")), a dynamic import's namespace; R-COMPOSED (A2) a name or key assembled at run time
 *   from a non-constant part (a variable holding the family word); R-SPLIT (A3) the subject and the family in different
 *   sentences (two sentences of one line, or the two lines a blank comment-block line parts: COMMENTS OUT (2));
 *   R-COMMENT-HIDDEN (A3) a claim only a placed HTML comment holds is not read, though a reader of the page source sees it;
 *   R-COMMENT-BLOCK (A3) a comment block's lines are read as COMMENTS OUT (2) and (3) leave them, never as the page's blocks:
 *   text after that comment on its line keeps the line from being blank, so a sentence runs on across it (trailing rows: a
 *   marker after a space, after no space, or on the next line past text between two comments; the converse, a claim across
 *   it); a second comment as that line's only other text leaves it holding only white space once removed, so it is dropped
 *   and a sentence runs on across it (second rows: spaced, adjacent; the converse); a block quote's mark keeps the line from
 *   being blank, so a sentence runs on across it (quoted rows: a block quote, a block quote in a list item; the converse);
 *   and between two lines of one list item, in a list with no blank line, the blank line ends the sentence, so a marker after
 *   it quiets nothing before it and a claim across it reads none (listed rows: bulleted, ordered, nested; the converse);
 *   R-SOURCE-AS-WRITTEN (A3) outside its placed comments a page is read as its source is written, not as it renders: every
 *   markdown and HTML character is page text to the cutter and the reading, and, but for the lines COMMENTS OUT (2) and (3)
 *   blank, join or drop, the cutter's lines are the source's lines. Rows held, in order: a marker only such syntax holds
 *   quiets the sentence it joins (markers: a link's destination, bare or angle-bracketed, its title, quoted or parenthesised,
 *   or its reference label; a reference definition; an HTML tag's attribute or name; an image's alt text or source; a style
 *   or script block; a processing instruction, CDATA or a declaration; a fenced code block's info string, after backticks or
 *   tildes; the content of a [hidden] element, inline or a block, or of a template element), and a claim only such syntax
 *   holds reads as a finding (claims: a tag attribute, a link destination, a style block, a reference definition, an info
 *   string, [hidden] content, template content); markup inside a word splits the word ("The assem*bler* acquires resources."
 *   names no subject), and a marker spelled by a character reference is not read as one (words; R-LOOKALIKE holds the subject
 *   spelled with one); a character reference followed by white space ends a sentence at its ";", so a claim across it reads
 *   none (references: &nbsp;, &amp;, &#38;, &not;, &lt;, &#x26;); and a line DOC does not cut at is a text line, so a
 *   sentence runs on across it (lines: a block quote's empty line; a line that opens with a quote mark, as a list item or a
 *   heading in a block quote does; === or --- under a line of text, a setext heading's underline; *** right after a line of
 *   text; a line that opens with an HTML tag, after or before a line of text; a table's rows spelled a | b, with no leading
 *   pipe; a # line indented four spaces, a code line; and the cutter never cuts at a table cell's pipe, so a table row's
 *   cells run on in its line); R-UNANCHORED (A4) an assembly word with no anchor beside a family word (Pi's own sense: "The
 *   reply assembly is stale."); R-RENDERER (A4) rf or the render named as the actor with no assembler word ("rf acquires the
 *   resource."), the context renderer's own obligations being other beads'; R-SHORT-NAME (A4) RC or rc alone (a return code
 *   in Pi's receipts) is an anchor, never the subject ("RC acquires resources."); R-LOOKALIKE (A4) a look-alike letter, an
 *   inserted invisible or an HTML character reference inside a word (NFKC folds the fullwidth forms, which are read);
 *   R-MARKER-ANYWHERE (A4) a marker anywhere in the text quiets it, whatever it qualifies ("The assembler acquires resources,
 *   not the host."), on a doc page anywhere in its sentence once its placed comments are out (a marker only a placed comment
 *   holds quiets nothing: comments.hiddenMarker; one only an unplaced comment holds quiets the sentence: comments.unplaced;
 *   and a marker R-COMMENT-BLOCK or R-SOURCE-AS-WRITTEN reads into a sentence quiets it too); R-SYNONYM (A4) a vocabulary
 *   word no outside text spells (the inflections, fresh and stale, the extra markers) is held by this file and the roster
 *   alone - removed from both together it stays green; A4 lists them; R-PARAPHRASE (B3) a family claim outside the family
 *   words (fetch, prefetch, load, refresh, expire, ttl, queue, defer, up to date); R-SEAM-OTHER (C2) an assembler reached by
 *   a path that names neither the subject nor a ReactiveComponents module (a URL, a spawned program under another name), or
 *   an input reaching it through stdin.
 *
 * Display paths added: none. Test-only: the stand-in rf and the replica trees live in makeScratch scratch with the leak guard
 * installed; Pi's code, docs, the bead export, docs/03, package.json and the frozen tree are only read; nothing is spawned but
 * git and the stand-in rf.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { sectionTables } from "./helpers/census.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type RcGate = "PASSED" | "NOT-PASSED";
type Seam = "PRESENT" | "ABSENT";
type Gate = "OPEN" | "CLOSED";
type Via = "lexeme" | "access" | "member" | "import" | "comment";
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Vocabulary {
  readonly subject: readonly string[];
  readonly subjectPairs: readonly (readonly [string, string])[];
  readonly subjectPrefixes: readonly string[];
  readonly assembly: readonly string[];
  readonly anchors: readonly string[];
  readonly families: { readonly acquire: readonly string[]; readonly schedule: readonly string[]; readonly freshness: readonly string[] };
  readonly markers: readonly string[];
  readonly markerPairs: readonly (readonly [string, string])[];
}
interface Constants {
  readonly codeRoots: readonly string[];
  readonly docRoots: readonly string[];
  readonly outside: readonly string[];
  readonly frozenAt: string;
  readonly docs03: string;
  readonly filing: string;
  readonly capability: string;
}
interface ProducerLine {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Producer {
  readonly repository: string;
  readonly path: string;
  readonly beadPin: string;
  readonly measuredAt: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
  readonly gates: readonly string[];
  readonly rcGate: RcGate;
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly unclaimed: readonly { readonly duty: string; readonly reason: string }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/rc-assembler-expectation-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.2";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  codeRoots: ["examples", "qa", "src"],
  docRoots: [".agents", ".pi", "docs", "examples"],
  outside: [".beads", ".codex", ".github", "media", "new-feedback", "test", "vendor"],
  frozenAt: "dc72a6d6d21b",
  docs03: "docs/workbench/03-architecture-and-ownership.md",
  filing: "Citations: docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md:12@",
  capability: "reactivefiber.render.preview",
};
const VOCABULARY: Vocabulary = {
  subject: ["assembler", "assemblers"],
  subjectPairs: [
    ["reactive", "components"],
    ["rc", "sdk"],
  ],
  subjectPrefixes: ["reactivecomponent"],
  assembly: ["assembly", "assemblies", "assemble", "assembles", "assembled", "assembling"],
  anchors: ["context", "contexts", "component", "components", "rc", "rf", "fiber"],
  families: {
    acquire: ["acquire", "acquires", "acquired", "acquiring", "acquisition", "acquisitions", "obtain", "obtains", "obtained", "obtaining", "speculate", "speculates", "speculated", "speculating", "speculation", "speculations", "speculative", "speculatively"],
    schedule: ["schedule", "schedules", "scheduled", "scheduling", "scheduler", "schedulers", "reschedule", "reschedules", "rescheduled", "rescheduling"],
    freshness: ["fresh", "fresher", "freshest", "freshness", "stale", "staler", "stalest", "staleness"],
  },
  markers: ["not", "no", "never", "nor", "neither", "without", "cannot", "until", "unless", "gated", "unshipped", "proposed", "none", "nothing"],
  markerPairs: [["design", "only"]],
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "gating census — no Pi code or doc expects the assembler",
    pins: [
      { id: "A1", quote: "gating census" },
      { id: "A2", quote: "no Pi code" },
      { id: "A3", quote: "or doc" },
      { id: "A4", quote: "expects the assembler" },
    ],
  },
  {
    id: "B",
    label: "to acquire, schedule or judge freshness",
    pins: [
      { id: "B1", quote: "to acquire" },
      { id: "B2", quote: "schedule" },
      { id: "B3", quote: "or judge freshness" },
    ],
  },
  {
    id: "C",
    label: "until the RC gates pass and an actual Pi seam exists",
    pins: [
      { id: "C1", quote: "until the RC gates pass" },
      { id: "C2", quote: "and an actual Pi seam exists" },
    ],
  },
];
const PAGE_TITLE = "03 — High-level architecture, module ownership and dataflow";
const OWNERSHIP_HEADING = "Ownership boundaries";
const RENDER_OWNER = "ReactiveFiberCLI";

// ---------------------------------------------------------------------------------------------------------------- the reader
const SUBJECT = new Set(VOCABULARY.subject);
const ASSEMBLY = new Set(VOCABULARY.assembly);
const ANCHORS = new Set(VOCABULARY.anchors);
const MARKERS = new Set(VOCABULARY.markers);
const FAMILY_IDS = ["acquire", "schedule", "freshness"] as const;
type FamilyId = (typeof FAMILY_IDS)[number];
const FAMILIES: Readonly<Record<FamilyId, ReadonlySet<string>>> = {
  acquire: new Set(VOCABULARY.families.acquire),
  schedule: new Set(VOCABULARY.families.schedule),
  freshness: new Set(VOCABULARY.families.freshness),
};
const CONTRACTION = /n['’]t(?![a-z0-9])/;
const fold = (text: string): string => text.normalize("NFKC").toLowerCase();
/** The words of a text: NFKC, a break at each case change and before the last capital of an acronym run, lower case. */
function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
const hasPair = (tokens: readonly string[], pairs: readonly (readonly [string, string])[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
const familiesOf = (tokens: readonly string[]): FamilyId[] => FAMILY_IDS.filter(id => tokens.some(word => FAMILIES[id].has(word)));
/** The RC name: the pair reactive components or rc sdk, or a word opening with the folded package name. */
const namesRc = (tokens: readonly string[]): boolean => hasPair(tokens, VOCABULARY.subjectPairs) || tokens.some(word => VOCABULARY.subjectPrefixes.some(prefix => word.startsWith(prefix)));
const namesSubject = (tokens: readonly string[]): boolean => tokens.some(word => SUBJECT.has(word)) || namesRc(tokens);
interface Reading {
  readonly kind: "finding" | "marker" | "unanchored" | "none";
  readonly families: readonly FamilyId[];
  readonly reason: string;
}
/** One text: none (no family word or no assembler word), unanchored, quiet by a marker, or a finding naming its families. */
function read(text: string): Reading {
  const tokens = words(text);
  const families = familiesOf(tokens);
  const named = namesSubject(tokens);
  const assembly = tokens.find(word => ASSEMBLY.has(word));
  if (families.length === 0 || (!named && assembly === undefined)) return { kind: "none", families: [], reason: "" };
  if (!named && !tokens.some(word => ANCHORS.has(word))) return { kind: "unanchored", families, reason: assembly ?? "" };
  const marker = tokens.find(word => MARKERS.has(word)) ?? (CONTRACTION.test(fold(text)) ? "n't" : undefined) ?? (hasPair(tokens, VOCABULARY.markerPairs) ? "design only" : undefined);
  if (marker !== undefined) return { kind: "marker", families, reason: marker };
  return { kind: "finding", families, reason: families.join("+") };
}
/** The census verdict on one text: null (quiet) or its families joined by "+". */
function verdict(text: string): string | null {
  const reading = read(text);
  return reading.kind === "finding" ? reading.reason : null;
}

// ------------------------------------------------------------------------------------------------------------- the sentences
const TABLE_ROW = /^\s*\|/;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TERMINATOR = /[.!?;](?=\s|$)/g;
function sentences(text: string): { readonly line: number; readonly text: string }[] {
  const out: { line: number; text: string }[] = [];
  let buffer = "";
  let start = 0;
  const flush = (): void => {
    if (buffer !== "") out.push({ line: start, text: buffer });
    buffer = "";
  };
  const append = (piece: string, line: number): void => {
    const trimmed = piece.trim();
    if (trimmed === "") return;
    if (buffer === "") start = line;
    buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`;
  };
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = index + 1;
    if (raw.trim() === "") {
      flush();
      continue;
    }
    const whole = TABLE_ROW.test(raw) || HEADING.test(raw);
    if (whole || LIST_ITEM.test(raw)) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) {
      const at = (match.index ?? 0) + 1;
      append(raw.slice(from, at), line);
      flush();
      from = at;
    }
    append(raw.slice(from), line);
    if (whole) flush();
  }
  flush();
  return out;
}

// --------------------------------------------------------------------------------------- the cutter's sweeps (wb-ro24, respin 1)
/** Every BMP code point but the surrogates and the line feed (the line break itself): the domain every cutter sweep reads. */
const SWEPT: readonly number[] = Array.from({ length: 0x10000 }, (_, cp) => cp).filter(cp => (cp < 0xd800 || cp > 0xdfff) && cp !== 0x0a);
/** The near misses COMMENTS OUT (3)'s rows hold: invisible or space-like code points that are not white space to JavaScript. */
const NOT_WHITE_SPACE: readonly number[] = [0x0085, 0x00ad, 0x180e, 0x200b, 0x2060];
/** A code point spelled U+XXXX, so every witness stays printable ASCII. */
const codeLabel = (cp: number): string => `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
/** A text with each character outside printable ASCII spelled as its code point label. */
const shown = (text: string): string => text.replace(/[^\x20-\x7e]/gu, char => `<${codeLabel(char.codePointAt(0) ?? 0)}>`);
/** A page cut into sentences, each `<line>:<text>`: the reading every A3 cutter row holds. */
const cutOf = (page: string): string[] => sentences(page).map(sentence => `${sentence.line}:${sentence.text}`);
type Predicted<T> = (item: T) => readonly string[];
/** One sweep: every swept code point put in one page shape and cut, each cut sorted into the readings the DOC clause predicts
 * for that shape - the common reading counted under its name (run-on, or mark where the shape's "." ends a sentence whatever
 * the code point), every other prediction listed by code point, a code point no prediction reads under other. */
function sweep(page: (char: string) => string, runOn: Predicted<string>, predictions: Readonly<Record<string, Predicted<string>>>, common = "runOn"): Json {
  const names = Object.keys(predictions);
  const listed: Record<string, string[]> = Object.fromEntries([...names, "other"].map(name => [name, []]));
  let runs = 0;
  for (const cp of SWEPT) {
    const char = String.fromCodePoint(cp);
    const got = JSON.stringify(cutOf(page(char)));
    if (got === JSON.stringify(runOn(char))) runs += 1;
    else listed[names.find(name => JSON.stringify(predictions[name]?.(char)) === got) ?? "other"]?.push(codeLabel(cp));
  }
  return { [common]: runs, ...listed };
}
/** A bounded count sweep: each count's page cut and listed under the prediction it equals, or under other. */
function counted(counts: readonly number[], page: (count: number) => string, predictions: Readonly<Record<string, Predicted<number>>>): Json {
  const names = Object.keys(predictions);
  const listed: Record<string, number[]> = Object.fromEntries([...names, "other"].map(name => [name, []]));
  for (const count of counts) {
    const got = JSON.stringify(cutOf(page(count)));
    listed[names.find(name => JSON.stringify(predictions[name]?.(count)) === got) ?? "other"]?.push(count);
  }
  return listed;
}
/** The counts first, first + 1, ..., last. */
const upTo = (last: number, first = 0): number[] => Array.from({ length: last - first + 1 }, (_, index) => first + index);
/** The four marks DOC's terminator cuts after, in the clause's order. */
const MARKS: readonly string[] = [".", "!", "?", ";"];
/** The runs of # an ATX heading line opens with: one to six. */
const HASH_RUNS: readonly string[] = upTo(6, 1).map(count => "#".repeat(count));
/** The list markers DOC names, an ordered one with one digit: -, +, *, 1. and 1). */
const LIST_MARKERS: readonly string[] = ["-", "+", "*", "1.", "1)"];
/** The list markers the crosses read: the five, and an ordered one with two digits, 12. and 12). */
const CROSS_MARKERS: readonly string[] = [...LIST_MARKERS, "12.", "12)"];
/** A cross: each item's page cut and held to the one reading the DOC clause predicts for it; an item cut otherwise is listed. */
function crossed<T>(items: readonly T[], label: (item: T) => string, page: (item: T) => string, predicted: Predicted<T>): Json {
  const other = items.filter(item => JSON.stringify(cutOf(page(item))) !== JSON.stringify(predicted(item))).map(label);
  return { held: items.length - other.length, other };
}

// --------------------------------------------------------------------------------------------------------------- the comments
/** marked's own HTML comment form: an empty <!--> or <!---> included, an unterminated one running to the end of its text. */
const HTML_COMMENT = /<!--(?:-?>|[\s\S]*?(?:-->|$))/g;
const LEADING_SPACES = /^ {0,3}/;
const REGEXP_SPECIAL = /[.*+?^${}()|[\]\\]/g;
const isHtmlToken = (token: Token): token is Tokens.HTML | Tokens.Tag => token.type === "html";
const isListToken = (token: Token): token is Tokens.List => token.type === "list";
const isTableToken = (token: Token): token is Tokens.Table => token.type === "table";
/** A token's nested tokens: a list's items, a table's header cells and then its body rows' cells, or its own tokens. The walk
 * is claimed only as COMMENTS OUT (5)'s WALK and PINNED name it; its HOLES are not claimed (wb-hhu9 carries the order). */
function nestedTokens(token: Token): readonly Token[] {
  if (isListToken(token)) return token.items;
  if (isTableToken(token)) return [...token.header, ...token.rows.flat()].flatMap(cell => cell.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
/** Where a token's source sits in a block at or after `from` and before `end`: as written, or with each line break followed by
 * spaces or tabs and then quote marks each followed by at most one space or tab - claimed only on the leads COMMENTS OUT (5)'s
 * LINE BREAKS rows spell and against the edits its PINNED names (its HOLES are not claimed). */
function placed(block: string, raw: string, from: number, end: number): { readonly start: number; readonly end: number } | undefined {
  if (raw === "") return undefined;
  const spelling = new RegExp(raw.split("\n").map(line => line.replace(REGEXP_SPECIAL, "\\$&")).join("\\n[ \\t]*(?:>[ \\t]?)*"), "g");
  spelling.lastIndex = from;
  const match = spelling.exec(block);
  return match === null || match.index + match[0].length > end ? undefined : { start: match.index, end: match.index + match[0].length };
}
interface CommentSpan {
  readonly start: number;
  readonly end: number;
  /** A comment block's opening comment (COMMENTS OUT (2), as htmlKindAt reads it): taken out with its line breaks kept. */
  readonly block: boolean;
}
/** Every HTML token marked lexes in a page, at any depth. */
function htmlTokens(page: string): (Tokens.HTML | Tokens.Tag)[] {
  const out: (Tokens.HTML | Tokens.Tag)[] = [];
  const visit = (token: Token): void => {
    if (isHtmlToken(token)) out.push(token);
    else for (const child of nestedTokens(token)) visit(child);
  };
  for (const token of marked.lexer(page)) visit(token);
  return out;
}
/** COMMENTS OUT (5): marked lexes the page again with a sentinel (a run of Q the page does not hold) written just inside
 * the `<!--` at `start`. No HTML token holding the sentinel: undefined (the span is not placed). Otherwise whether that token is a
 * block whose source opens with this comment after LEADING_SPACES (a comment block's opening comment, (2)); the rows hold a
 * lead of up to three spaces, and the bound past three is one of (2)'s HOLES. */
function htmlKindAt(page: string, start: number): boolean | undefined {
  let mark = "Q";
  while (page.includes(mark)) mark += "Q";
  const holder = htmlTokens(`${page.slice(0, start + 4)}${mark}${page.slice(start + 4)}`).find(token => token.raw.includes(mark));
  if (holder === undefined) return undefined;
  const lead = LEADING_SPACES.exec(holder.raw)?.[0].length ?? 0;
  return holder.block && holder.raw.indexOf(`<!--${mark}`) === lead;
}
/** The comment spans in the source of the tokens marked lexes as HTML, placed in the page (COMMENTS OUT (5)): walking each
 * top-level block's nested tokens (nestedTokens) moves a cursor past each leaf token's source as found, and a span found is
 * placed only where htmlKindAt finds marked's own HTML token holding it (claimed only as (5)'s rows and PINNED hold it). */
function commentSpans(page: string): { readonly spans: readonly CommentSpan[]; readonly unplaced: readonly string[] } {
  const blocks = marked.lexer(page);
  // The top-level tokens tile the page; when they do not, no position can be trusted: every comment-shaped span is unplaced.
  if (blocks.map(block => block.raw).join("") !== page) return { spans: [], unplaced: [...page.matchAll(HTML_COMMENT)].map(match => match[0]) };
  const spans: CommentSpan[] = [];
  const unplaced: string[] = [];
  let top = 0;
  for (const block of blocks) {
    let cursor = 0;
    const visit = (token: Token): void => {
      const nested = isHtmlToken(token) ? [] : nestedTokens(token);
      if (nested.length > 0) {
        for (const child of nested) visit(child);
        return;
      }
      const at = placed(block.raw, token.raw, cursor, block.raw.length);
      if (isHtmlToken(token)) {
        let inner = at?.start ?? 0;
        for (const comment of token.raw.matchAll(HTML_COMMENT)) {
          const spot = at === undefined ? undefined : placed(block.raw, comment[0], inner, at.end);
          const kind = spot === undefined ? undefined : htmlKindAt(page, top + spot.start);
          if (spot === undefined || kind === undefined) {
            unplaced.push(comment[0]);
            continue;
          }
          spans.push({ start: top + spot.start, end: top + spot.end, block: kind });
          inner = spot.end;
        }
      }
      if (at !== undefined) cursor = at.end;
    };
    visit(block);
    top += block.raw.length;
  }
  return { spans, unplaced };
}
interface CommentFreePage {
  /** The page for the sentence cut: each placed comment taken out, every other character as written (R-SOURCE-AS-WRITTEN). */
  readonly text: string;
  /** The page line each kept line starts on (1-based), or null when the page has no comment and is read as written. */
  readonly lines: readonly number[] | null;
  /** The comment spans the reader does not place (COMMENTS OUT (5)); each is read as written. */
  readonly unplaced: readonly string[];
}
/** A page with its placed comments out (COMMENTS OUT (2), (3), (6)): a comment block's opening comment is taken out with its
 * line breaks kept (read as spaces, one of (2)'s HOLES), any other comment is removed with its line breaks (a line it leaves
 * holding only white space dropped, claimed only for the lines (3)'s rows hold), every other character is kept as written,
 * and every kept line keeps its page number. */
function commentFreePage(markdown: string): CommentFreePage {
  if (!markdown.includes("<!--")) return { text: markdown, lines: null, unplaced: [] };
  const page = markdown.replace(/\r\n/g, "\n");
  const { spans, unplaced } = commentSpans(page);
  let line = 1;
  let row: { text: string; line: number; emptied: boolean } = { text: "", line, emptied: false };
  const rows = [row];
  const lineBreak = (): void => {
    line += 1;
    row = { text: "", line, emptied: false };
    rows.push(row);
  };
  const copy = (text: string): void => {
    for (const char of text) {
      if (char === "\n") lineBreak();
      else row.text += char;
    }
  };
  let at = 0;
  for (const span of spans) {
    copy(page.slice(at, span.start));
    for (const char of page.slice(span.start, span.end)) {
      if (char === "\n") {
        if (span.block) lineBreak();
        else line += 1;
      } else if (span.block) row.text += " ";
    }
    if (!span.block) row.emptied = true;
    at = span.end;
  }
  copy(page.slice(at));
  const kept = rows.filter(entry => !(entry.emptied && entry.text.trim() === ""));
  return { text: kept.map(entry => entry.text).join("\n"), lines: kept.map(entry => entry.line), unplaced };
}

// -------------------------------------------------------------------------------------------------------------- the code reader
interface Site {
  readonly line: number;
  readonly via: Via;
  readonly text: string;
}
function constant(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constant(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(node.left);
    const right = constant(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const value = constant(span.expression);
      if (value === undefined) return undefined;
      text += value + span.literal.text;
    }
    return text;
  }
  return undefined;
}
/** A template or concatenation as it is spelled: its literal parts in order, each non-constant part read as one space. */
function spelled(node: ts.Node): string {
  const value = constant(node);
  if (value !== undefined) return value;
  if (ts.isParenthesizedExpression(node)) return spelled(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return spelled(node.left) + spelled(node.right);
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(span => spelled(span.expression) + span.literal.text).join("");
  return " ";
}
const NAMED_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.ModuleDeclaration,
]);
const MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.EnumMember,
]);
function nameOf(node: ts.Node): string | undefined {
  if (!NAMED_KINDS.has(node.kind)) return undefined;
  const name = (node as ts.NamedDeclaration).name;
  if (name === undefined) return undefined;
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return constant(name.expression);
  return undefined;
}
const COMMENT_MARKS = /^\/\/+|^\/\*+|\*+\/$|^[ \t]*\*+(?!\/)/gm;
/** Every reading of one module: lexemes, accesses, member paths and comment sentences, each with its 1-based line. */
function codeSites(path: string, text: string): Site[] {
  const kind = /\.(?:ts|tsx|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const full = source.getFullText();
  const sites: Site[] = [];
  const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line + 1;
  const comments = new Map<number, number>();
  // Comments by token: the trivia before and after every token and node, so a comment inside an empty block is read too.
  const collect = (node: ts.Node): void => {
    ts.forEachLeadingCommentRange(full, node.getFullStart(), (pos, end) => {
      comments.set(pos, end);
    });
    ts.forEachTrailingCommentRange(full, node.getEnd(), (pos, end) => {
      comments.set(pos, end);
    });
    for (const child of node.getChildren(source)) collect(child);
  };
  collect(source);
  const visit = (node: ts.Node): void => {
    const at = (): number => lineOf(node.getStart(source));
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isTemplateLiteralTypeNode(node)) sites.push({ line: at(), via: "lexeme", text: node.head.text + node.templateSpans.map(span => ` ${span.literal.text}`).join("") });
    else if (ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
      const value = spelled(node);
      if (value.trim() !== "") sites.push({ line: at(), via: "lexeme", text: value });
    } else if (ts.isPropertyAccessExpression(node)) sites.push({ line: at(), via: "access", text: node.getText(source) });
    else if (ts.isElementAccessExpression(node)) sites.push({ line: at(), via: "access", text: `${node.expression.getText(source)}.${constant(node.argumentExpression) ?? "?"}` });
    else if (ts.isIndexedAccessTypeNode(node)) {
      const index = ts.isLiteralTypeNode(node.indexType) ? constant(node.indexType.literal) : undefined;
      sites.push({ line: at(), via: "access", text: `${node.objectType.getText(source)}.${index ?? "?"}` });
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const holder = node.parent.parent;
      const receiver = ts.isVariableDeclaration(holder) ? holder.initializer : ts.isParameter(holder) ? holder.type : undefined;
      const key = node.propertyName ?? node.name;
      const keyText = ts.isIdentifier(key) || ts.isStringLiteralLike(key) || ts.isPrivateIdentifier(key) ? key.text : ts.isComputedPropertyName(key) ? constant(key.expression) : undefined;
      if (receiver !== undefined) sites.push({ line: at(), via: "access", text: `${receiver.getText(source)}.${keyText ?? "?"}` });
    } else if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const names: string[] = [];
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (clause?.name !== undefined) names.push(clause.name.text);
        const bindings = clause?.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
      } else if (node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) names.push((element.propertyName ?? element.name).text);
      }
      for (const name of names) sites.push({ line: at(), via: "import", text: `${from}.${name}` });
    }
    if (MEMBER_KINDS.has(node.kind)) {
      const own = nameOf(node);
      const path: string[] = [];
      for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
        const name = nameOf(parent);
        if (name !== undefined) path.unshift(name);
      }
      if (own !== undefined && path.length > 0) sites.push({ line: at(), via: "member", text: [...path, own].join(".") });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  for (const [pos, end] of [...comments].sort((a, b) => a[0] - b[0])) {
    const body = full.slice(pos, end).replace(COMMENT_MARKS, " ");
    for (const sentence of sentences(body)) sites.push({ line: lineOf(pos) + sentence.line - 1, via: "comment", text: sentence.text });
  }
  return sites;
}
interface Survey {
  readonly findings: string[];
  readonly quieted: string[];
  readonly readings: number;
  readonly named: number;
  readonly unplaced: string[];
}
function codeSurvey(path: string, text: string): Survey {
  const findings = new Set<string>();
  const quieted = new Set<string>();
  const sites = codeSites(path, text);
  let named = 0;
  for (const site of sites) {
    const reading = read(site.text);
    const tokens = words(site.text);
    if (namesSubject(tokens)) named += 1;
    if (reading.kind === "finding") findings.add(`${path}:${site.line} ${site.via} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.add(`${path}:${site.line} ${site.via} ${reading.kind}:${reading.reason}`);
  }
  return { findings: [...findings], quieted: [...quieted], readings: sites.length, named, unplaced: [] };
}
function docSurvey(path: string, text: string): Survey {
  const findings: string[] = [];
  const quieted: string[] = [];
  let named = 0;
  const page = commentFreePage(text);
  const cut = sentences(page.text);
  for (const sentence of cut) {
    const reading = read(sentence.text);
    const tokens = words(sentence.text);
    const line = page.lines?.[sentence.line - 1] ?? sentence.line;
    if (namesSubject(tokens)) named += 1;
    if (reading.kind === "finding") findings.push(`${path}:${line} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.push(`${path}:${line} ${reading.kind}:${reading.reason}`);
  }
  return { findings, quieted, readings: cut.length, named, unplaced: page.unplaced.map(comment => `${path} ${JSON.stringify(comment)}`) };
}
/** COMMENTS OUT's reading of a page whose one comment hides `marker` before a claim at :1: placed (taken out, so the claim is a
 * finding), unplaced (read as written, so the marker quiets it, and listed), unlexed (read as written, nothing listed: (4)), or
 * other. */
function placement(page: string, marker: string): "placed" | "unplaced" | "unlexed" | "other" {
  const one = docSurvey("docs/plant.md", page);
  const quiet = one.findings.length === 0 && one.quieted.length === 1 && one.quieted[0] === `docs/plant.md:1 marker:${marker}`;
  if (one.findings.length === 1 && one.findings[0] === "docs/plant.md:1 acquire" && one.quieted.length === 0 && one.unplaced.length === 0) return "placed";
  if (quiet && one.unplaced.length === 1) return "unplaced";
  if (quiet && one.unplaced.length === 0) return "unlexed";
  return "other";
}
/** Bounded runs of one page shape, each count listed under its placement. */
function placements(counts: readonly number[], page: (count: number) => string, marker: string): Json {
  const listed: Record<string, number[]> = { placed: [], unplaced: [], unlexed: [], other: [] };
  for (const count of counts) listed[placement(page(count), marker)]?.push(count);
  return listed;
}
/** A page's doc sentences once its placed comments are out, each `<page line>:<text>` shown in printable ASCII. */
function docCut(page: string): string[] {
  const free = commentFreePage(page);
  return sentences(free.text).map(sentence => `${free.lines?.[sentence.line - 1] ?? sentence.line}:${shown(sentence.text)}`);
}
const isModule = (path: string): boolean => /\.(?:ts|tsx|mts|cts|js|mjs|cjs)$/.test(path);
const isPage = (path: string): boolean => /\.md$/.test(path);
const atRoot = (path: string): boolean => !path.includes("/");
const underAny = (path: string, roots: readonly string[]): boolean => roots.some(root => path.startsWith(`${root}/`));
const isCode = (path: string): boolean => isModule(path) && (atRoot(path) || underAny(path, CONSTANTS.codeRoots));
const isDoc = (path: string): boolean => isPage(path) && (atRoot(path) || underAny(path, CONSTANTS.docRoots));
interface Pass {
  readonly code: string[];
  readonly docs: string[];
  readonly findings: string[];
  readonly quieted: string[];
  readonly readings: number;
  readonly named: number;
  readonly unplaced: string[];
  readonly unreadable: string[];
}
/** One pass over a set of (path, text) pairs: code modules by the code reader, doc pages by the sentence reader. */
function survey(texts: readonly (readonly [string, string])[]): Omit<Pass, "unreadable"> {
  const code: string[] = [];
  const docs: string[] = [];
  const findings: string[] = [];
  const quieted: string[] = [];
  const unplaced: string[] = [];
  let readings = 0;
  let named = 0;
  for (const [path, text] of texts) {
    const asCode = isModule(path);
    const one = asCode ? codeSurvey(path, text) : docSurvey(path, text);
    (asCode ? code : docs).push(path);
    findings.push(...one.findings);
    quieted.push(...one.quieted);
    unplaced.push(...one.unplaced);
    readings += one.readings;
    named += one.named;
  }
  return { code, docs, findings, quieted, readings, named, unplaced };
}
function surveyFiles(base: string, paths: readonly string[]): Pass {
  const texts: [string, string][] = [];
  const unreadable: string[] = [];
  for (const path of paths) {
    try {
      texts.push([path, readFileSync(join(base, path), "utf8")]);
    } catch {
      unreadable.push(path);
    }
  }
  return { ...survey(texts), unreadable };
}

// ------------------------------------------------------------------------------------------------------------- the file sets
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** What git would commit as a code module or a doc page: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const roots = [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots])];
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...roots, ":(glob)*"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path)) && (isCode(path) || isDoc(path))))].sort(byName);
}
/** Every regular file below the roots and at the repository root that the readers take; a symlink is reported, never followed. */
function walkTree(base: string): { readonly files: string[]; readonly links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && (isCode(path) || isDoc(path))) files.push(path);
    }
  };
  for (const root of [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots])].sort(byName)) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (entry.isSymbolicLink() && (isCode(entry.name) || isDoc(entry.name))) links.push(entry.name);
    else if (entry.isFile() && (isCode(entry.name) || isDoc(entry.name))) files.push(entry.name);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
function trackedTop(base: string): { readonly directories: string[]; readonly files: string[] } {
  const out = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 }).split("\0").filter(path => path !== "");
  return {
    directories: [...new Set(out.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort(byName),
    files: out.filter(atRoot).sort(byName),
  };
}
/** A root file the readers skip by design: configuration, the lock, the licence and the ignore files. */
const ROOT_CONFIG = /^(?:LICENSE|\.gitignore|\.npmignore|.+\.(?:json|toml|ya?ml))$/;
const FLOORS = { codeModules: 180, srcModules: 110, docPages: 75, rootPages: 5, readings: 180_000, sentences: 11_000 } as const;
/** One `git cat-file --batch` read of many blobs, keyed by object id. */
function readBlobs(ids: readonly string[]): Map<string, string> {
  const out: Buffer = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: Buffer.from(`${ids.join("\n")}\n`), maxBuffer: 1 << 28 });
  const texts = new Map<string, string>();
  let at = 0;
  while (at < out.length) {
    const eol = out.indexOf(0x0a, at);
    const [id, type, size] = out.subarray(at, eol).toString("utf8").split(" ");
    if (id === undefined || type !== "blob" || size === undefined) throw new Error(`unexpected cat-file record at ${at}`);
    const end = eol + 1 + Number(size);
    texts.set(id, out.subarray(eol + 1, end).toString("utf8"));
    at = end + 1;
  }
  return texts;
}
/** The frozen tree: every code module and doc page at CONSTANTS.frozenAt, read from git objects (symlinks skipped). */
function frozenTexts(): [string, string][] {
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", CONSTANTS.frozenAt], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  const entries = listing
    .split("\0")
    .filter(line => line !== "")
    .map(line => {
      const [meta = "", path = ""] = line.split("\t");
      const [mode = "", type = "", id = ""] = meta.split(" ");
      return { mode, type, id, path };
    })
    .filter(entry => entry.type === "blob" && entry.mode !== "120000" && (isCode(entry.path) || isDoc(entry.path)));
  const texts = readBlobs([...new Set(entries.map(entry => entry.id))]);
  return entries.map(entry => [entry.path, texts.get(entry.id) ?? ""]);
}
let livePass: Pass | undefined;
/** The live pass over Pi's own tree, computed once and shared by A1 and A2/A3. */
function live(): Pass {
  livePass ??= surveyFiles(REPO, gitList(REPO));
  return livePass;
}

// ---------------------------------------------------------------------------------------------------------------- the seam
const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return dir;
}
const ROOT_WORD = "<root>";
/** A family word in a seam word list (argv or input property names): `<where>:<index> <families>`, no subject needed. */
function seamFindings(where: string, list: readonly string[]): string[] {
  return list.flatMap((word, index) => {
    const families = familiesOf(words(word));
    return families.length === 0 ? [] : [`${where}:${index} ${families.join("+")}`];
  });
}
/** The argv and environment names the registered native capability hands rf for one input, recorded by a stand-in rf
 * placed first on PATH. */
async function spawnedArgv(input: Readonly<Record<string, string>>): Promise<{ readonly argv: string[]; readonly env: string[]; readonly outcome: string }> {
  const dir = scratch("km7q2-rf-");
  const record = join(dir, "argv.json");
  const envelope = join(dir, "envelope.json");
  writeFileSync(envelope, JSON.stringify(fullShapeRf(REPO)));
  const module = join(dir, "stand-in.mjs");
  writeFileSync(module, `import { readFileSync, writeFileSync } from "node:fs";\nwriteFileSync(${JSON.stringify(record)}, JSON.stringify({ argv: process.argv.slice(2), env: Object.keys(process.env).sort() }));\nprocess.stdout.write(readFileSync(${JSON.stringify(envelope)}, "utf8"));\n`);
  const executable = join(dir, "rf");
  writeFileSync(executable, `#!/bin/sh\nexec node ${JSON.stringify(module)} "$@"\n`);
  chmodSync(executable, 0o700);
  process.env.PATH = `${dir}:${oldPath ?? ""}`;
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, REPO);
  let outcome = "returned";
  try {
    await registry.invoke(CONSTANTS.capability, input, { grants: ["reactivefiber:render"], signal: new AbortController().signal });
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    outcome = error.category;
  }
  const recorded = JSON.parse(readFileSync(record, "utf8")) as { argv: string[]; env: string[] };
  return { argv: recorded.argv.map(word => (word === REPO ? ROOT_WORD : word)), env: recorded.env, outcome };
}
/** Every property name a JSON schema declares, at any depth. */
function propertyNames(schema: unknown): string[] {
  if (schema === null || typeof schema !== "object") return [];
  if (Array.isArray(schema)) return schema.flatMap(propertyNames);
  const out: string[] = [];
  for (const [key, value] of Object.entries(schema)) {
    if (key === "properties" && value !== null && typeof value === "object" && !Array.isArray(value)) out.push(...Object.keys(value));
    out.push(...propertyNames(value));
  }
  return [...new Set(out)].sort(byName);
}
/** A Pi code module or package.json dependency naming a ReactiveComponents module: the Pi seam is PRESENT. */
function seamOf(codeSites: readonly string[], dependencies: readonly string[]): Seam {
  return codeSites.length === 0 && dependencies.length === 0 ? "ABSENT" : "PRESENT";
}
function rcSites(texts: readonly (readonly [string, string])[]): string[] {
  return texts.flatMap(([path, text]) => (isModule(path) ? codeSites(path, text).filter(site => site.via !== "comment" && namesRc(words(site.text))).map(site => `${path}:${site.line} ${site.via}`) : []));
}
const LAUNCHERS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
/** Every call of a child-process launcher whose program (the first word of its first argument's constant) is rf. */
function rfLaunchSites(texts: readonly (readonly [string, string])[]): string[] {
  const out = new Set<string>();
  for (const [path, text] of texts) {
    const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : "";
        const first = node.arguments[0];
        const program = first === undefined ? undefined : constant(first)?.trim().split(/\s+/)[0];
        if (LAUNCHERS.has(callee) && program !== undefined && /(?:^|[\\/])rf(?:\.exe)?$/.test(program)) out.add(`${path} ${callee}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return [...out].sort(byName);
}
function rcDependencies(manifest: string): string[] {
  const parsed = JSON.parse(manifest) as Record<string, unknown>;
  return ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].flatMap(field => {
    const table = parsed[field];
    return table !== null && typeof table === "object" ? Object.keys(table).filter(name => namesRc(words(name))) : [];
  });
}

let seamCache: Awaited<ReturnType<typeof readSeam>> | undefined;
/** The seam's words for both input arms and its input schema, read once: every argv, the environment names, the property names. */
async function readSeam() {
  const loaded = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  loaded.registerNativeProviders(registry, REPO);
  const catalog = registry.catalogSnapshot();
  const rf = catalog.filter(entry => entry.descriptor.id.startsWith("reactivefiber.")).map(entry => [entry.descriptor.id, entry.descriptor.effectClass]);
  const inputNames = propertyNames(catalog.find(entry => entry.descriptor.id === CONSTANTS.capability)?.descriptor.inputSchema);
  const legacy = await spawnedArgv({ model: "fixture-model", task: "fixture-task" });
  const view = await spawnedArgv({ view: "fixture-view", taskId: "fixture-task", model: "fixture-model" });
  const findings = [...seamFindings("argv", legacy.argv), ...seamFindings("argv", view.argv), ...seamFindings("env", [...new Set([...legacy.env, ...view.env])].sort(byName)), ...seamFindings("input", inputNames)];
  return { rf, inputNames, legacy, view, findings };
}
async function seamWords(): Promise<Awaited<ReturnType<typeof readSeam>>> {
  seamCache ??= await readSeam();
  return seamCache;
}

// ---------------------------------------------------------------------------------------------------------------- the gate
const GATE_IDS = /RC-RQ([1-9])/g;
function rcGateOf(producer: Pick<Producer, "lines">): RcGate {
  const status = producer.lines.find(line => line.line === 3)?.text;
  const acceptance = producer.lines.find(line => line.line === 46)?.text ?? "";
  const named = new Set([...acceptance.matchAll(GATE_IDS)].map(match => match[0]));
  const whole = [1, 2, 3, 4, 5, 6, 7].every(n => named.has(`RC-RQ${n}`));
  return status !== undefined && !hasPair(words(status), VOCABULARY.markerPairs) && whole ? "PASSED" : "NOT-PASSED";
}
function gateOf(rcGate: RcGate, seam: Seam): Gate {
  return rcGate === "PASSED" && seam === "PRESENT" ? "OPEN" : "CLOSED";
}
function guard(gate: Gate, findings: readonly string[]): "pass" | "fail" | "stand-down" {
  return gate === "OPEN" ? "stand-down" : findings.length === 0 ? "pass" : "fail";
}
let seamReading: { readonly sites: string[]; readonly dependencies: string[] } | undefined;
function piSeam(): { readonly sites: string[]; readonly dependencies: string[]; readonly seam: Seam } {
  seamReading ??= {
    sites: rcSites(
      gitList(REPO)
        .filter(isModule)
        .map(path => [path, readFileSync(join(REPO, path), "utf8")] as const),
    ),
    dependencies: rcDependencies(readFileSync(join(REPO, "package.json"), "utf8")),
  };
  return { ...seamReading, seam: seamOf(seamReading.sites, seamReading.dependencies) };
}

// -------------------------------------------------------------------------------------------------------------- the replicas
/** A scratch git repository holding `files`, left untracked, so gitList reads it exactly as it reads Pi's tree. */
function gitReplica(prefix: string, files: Readonly<Record<string, string>>): string {
  const dir = scratch(prefix);
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "pipe" });
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  return dir;
}
const codeOf = (text: string, path = "src/plant.ts"): string[] => codeSurvey(path, text).findings;
const docOf = (text: string, path = "docs/plant.md"): string[] => docSurvey(path, text).findings;
/** A page's findings and quieted readings together, so a quiet row names the marker that quiets it. */
const asWritten = (text: string): string[] => {
  const one = docSurvey("docs/plant.md", text);
  return [...one.findings, ...one.quieted];
};
const PLANT = "The ReactiveComponents assembler acquires the resources Pi needs.";
const LOOKALIKE_A = String.fromCodePoint(0x0430);
const FULLWIDTH_A = String.fromCodePoint(0xff21);
/** A template placeholder opener for planted code, spelled in two parts so no literal of this file holds one. */
const HOLE = "$" + "{";
const INVISIBLE = String.fromCodePoint(0x200b);

// ------------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const gate = gateOf(rcGateOf(ROSTER.producer), piSeam().seam);
    const real = live();
    const seam = await seamWords();
    const legacy = seam.legacy;
    // ONE pass over every listed module and page, the seam's words and in-memory positives: exactly what the positives find alone.
    const positives: readonly (readonly [string, string])[] = [
      ["docs/workbench/zz-plant.md", `${PLANT}\n`],
      ["src/zz-plant.ts", "export const age = assembler.freshness;\n"],
      ["README.md.plant.md", "- Pi expects the assembler to schedule acquisition.\n"],
    ];
    const seamPositive = [...legacy.argv, "--speculate"];
    const alone = [...survey(positives).findings, ...seamFindings("argv", seamPositive)];
    expect(alone.length).toBeGreaterThanOrEqual(positives.length + 1);
    const texts = gitList(REPO).map(path => [path, readFileSync(join(REPO, path), "utf8")] as const);
    const pass = [...survey([...texts, ...positives]).findings, ...seam.findings, ...seamFindings("argv", seamPositive)];
    expect(pass).toEqual([...real.findings, ...seam.findings, ...alone]);
    const outside = pass.filter(finding => !alone.includes(finding));
    // The same guard over a scratch git repository: a plant per reader and root, each beside a negated twin that stays quiet.
    const plants: Record<string, string> = {
      "docs/workbench/plant.md": "The assembler schedules acquisition for Pi.\n",
      "docs/workbench/plant-twin.md": "The assembler never schedules acquisition for Pi.\n",
      "docs/workbench/plant-hidden.md": "The assembler <!-- never --> schedules acquisition for Pi.\n",
      "docs/workbench/plant-commented.md": "<!-- The assembler schedules acquisition for Pi. -->\n",
      "examples/plant.md": "Pi relies on the context assembly to judge freshness.\n",
      "examples/plant-twin.md": "Pi never relies on the context assembly to judge freshness.\n",
      ".pi/agents/plant.md": "The assembler speculates.\n",
      "README.md": "Pi expects the assembler to judge freshness.\n",
      "src/plant.ts": "export const when = rcAssembler.scheduleAcquisition();\n",
      "src/plant-twin.ts": "export const when = rcAssembler.neverScheduleAcquisition();\n",
      "qa/plant.mjs": "// The assembler decides whether a block is stale.\nexport {};\n",
      "examples/workflows/plant.js": "export const options = { assembler: { freshness: 1 } };\n",
      "vitest.plant.config.ts": "export const key = 'assembler-acquisition';\n",
    };
    const replica = gitReplica("km7q2-live-", plants);
    const mirror = surveyFiles(replica, gitList(replica));
    return {
      gate,
      verdict: guard(gate, outside),
      findings: outside,
      positives: alone,
      coverage: { readAll: real.unreadable.length === 0, codeAndDocs: real.code.length > 0 && real.docs.length > 0 },
      replica: { code: mirror.code, docs: mirror.docs, findings: mirror.findings, verdict: guard("CLOSED", mirror.findings), standDown: guard("OPEN", mirror.findings) },
    };
  },
  A2: async () => {
    const walked = walkTree(REPO);
    const listed = gitList(REPO);
    const skip = ignored(REPO, walked.files);
    const walkAgreesWithGit = JSON.stringify(walked.files.filter(path => !skip.has(path))) === JSON.stringify(listed);
    const top = trackedTop(REPO);
    const roots = new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots, ...CONSTANTS.outside]);
    const real = live();
    const floors = {
      codeModules: real.code.length >= FLOORS.codeModules,
      srcModules: real.code.filter(path => path.startsWith("src/")).length >= FLOORS.srcModules,
      readings: real.readings >= FLOORS.readings,
      everyRoot: CONSTANTS.codeRoots.map(root => real.code.some(path => path.startsWith(`${root}/`))),
      rootModules: real.code.some(atRoot),
    };
    // The frozen pass: every code module of the immutable tree at the cut's base, read from git objects - exact counts.
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
    const frozen = survey(frozenTexts().filter(([path]) => isCode(path)));
    const controls = {
      lexeme: codeOf('const assemblerFreshness = 1;\nconst key = "assembler-acquisition";\n'),
      template: codeOf(`const flag = \`${HOLE}'assembler'}-schedule\`;\nconst part = \`assembler-${HOLE}x}-stale\`;\n`),
      concatenation: codeOf('const key = "rc_assembler" + ".acquire";\n'),
      access: codeOf("assembler.acquire();\nthis.rc.assembler.scheduleBlocks();\n"),
      element: codeOf('assembler["freshness"];\nassembler[`stale`];\nassembler[verb];\n'),
      member: codeOf("interface AssemblerInput { freshness: string }\nconst rc = { assembler: { speculate: true } };\nclass Assembler { obtain() {} }\nenum AssemblerStage { Acquire }\n"),
      comment: codeOf("// The assembler acquires the block. It is new.\n/* The ReactiveComponents assembler\n * judges freshness. */\nexport {};\n"),
      javascript: codeOf("module.exports = { assembler: { schedule: 1 } };\n", "qa/plant.cjs"),
      spelled: codeOf(`const flag = \`assembler-${HOLE}x}-stale\`;\nconst key = 'rc.assembler.' + verb + '.acquire';\n`),
      destructured: codeOf("const { acquire } = assembler;\nfunction run({ freshness }: AssemblerOptions) {}\n"),
      indexedType: codeOf('type Speculation = Assembler["speculate"];\n'),
      imported: codeOf('import { acquire } from "rc-assembler";\nexport { schedule as plan } from "./assembler.js";\nimport * as fresh from "@x/assembler";\n'),
      optional: codeOf("assembler?.acquire();\nnew Assembler().schedule();\ngetAssembler()!.freshness;\n"),
      regex: codeOf("const pattern = /assembler acquires/u;\n"),
      emptyBlock: codeOf("function run() {\n  // The assembler acquires the block.\n}\nconst none = {\n  /* The assembler schedules. */\n};\n"),
      templateType: codeOf(`type Key = \`assembler-${HOLE}string}-stale\`;\n`),
    };
    const quiet = {
      "R-INDIRECT": [codeOf("const a = assembler;\na.acquire();\n"), codeOf('assembler.run("acquire");\n'), codeOf('const m = await import("rc-assembler");\nm.acquire();\n')],
      "R-COMPOSED": [codeOf("assembler[verb + suffix]();\n"), codeOf("const name = prefix + 'acquisition';\nassembler[name]();\n")],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A2").map(residual => residual.id));
    return {
      walkAgreesWithGit,
      links: walked.links,
      unnamedTop: top.directories.filter(name => !roots.has(name)),
      unnamedRootFiles: top.files.filter(name => !isCode(name) && !isDoc(name) && !ROOT_CONFIG.test(name)),
      floors,
      findings: real.findings.filter(finding => isModule(finding.slice(0, finding.indexOf(":")))),
      unreadable: real.unreadable,
      frozen: { revision: CONSTANTS.frozenAt, ancestor, modules: frozen.code.length, readings: frozen.readings, named: frozen.named, findings: frozen.findings, quieted: frozen.quieted },
      controls,
      quiet,
    };
  },
  A3: async () => {
    const real = live();
    const floors = {
      docPages: real.docs.length >= FLOORS.docPages,
      rootPages: real.docs.filter(atRoot).length >= FLOORS.rootPages,
      everyRoot: CONSTANTS.docRoots.map(root => real.docs.some(path => path.startsWith(`${root}/`))),
      sentences: surveyFiles(REPO, real.docs).readings >= FLOORS.sentences,
      docs03: real.docs.includes(CONSTANTS.docs03),
    };
    const frozen = survey(frozenTexts().filter(([path]) => isDoc(path)));
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
    const cuts = [
      sentences("Intro line. The assembler acquires; no other row changed."),
      sentences("The assembler\nacquires resources."),
      sentences("| assembler | acquires |\n| x | y |"),
      sentences("The assembler\n- acquires"),
      sentences("The assembler\n\nacquires."),
      sentences("# The assembler\nacquires."),
      sentences("The assembler acquires!Next line"),
      sentences("Version 0.1.0 of the assembler acquires."),
      sentences("The assembler acquires?\r\nYes."),
    ].map(cut => cut.map(sentence => `${sentence.line}:${sentence.text}`));
    const judged = [
      docOf("Intro line.\n\nThe assembler acquires; no other row changed."),
      docOf("The assembler\nacquires resources."),
      docOf("| Concern | Owner |\n| --- | --- |\n| assembler | acquires resources |\n| assembler | never acquires |"),
      docOf("The assembler\n- acquires"),
      docOf("The assembler\n\nacquires."),
      docOf("# The assembler\nacquires."),
    ];
    // WHITE SPACE (wb-ro24 respin 1): JavaScript's \s and the set String.prototype.trim strips, read from the engine.
    const whiteSpace: number[] = [];
    const trimmed: number[] = [];
    let scanned = 0;
    for (let cp = 0; cp <= 0x10ffff; cp += 1) {
      if (cp >= 0xd800 && cp <= 0xdfff) continue;
      scanned += 1;
      const char = String.fromCodePoint(cp);
      if (/^\s$/.test(char)) whiteSpace.push(cp);
      if (char.trim() === "") trimmed.push(cp);
    }
    const headingCut = (run: string) => ({ cut: () => ["1:The assembler", `2:${run} acquires`, "3:the resources."], runOn: () => [`1:The assembler ${run} acquires the resources.`] });
    const pipeCut = { cut: () => ["1:The assembler", "2:| acquires |", "3:the resources."] };
    const digitRun = "1234567890".repeat(4);
    /** A list marker's line cut from the line before it (the trail its white space after the marker): after "." the
     * terminator cuts too, so the marker ends a sentence of its own. */
    const listed = (marker: string, trail: string): string[] =>
      marker.endsWith(".") ? ["1:The assembler", `2:${marker}`, "2:acquires the resources."] : ["1:The assembler", `2:${marker}${trail}acquires the resources.`];
    /** The 24 inline white-space code points, as the engine reads them, for the crosses. */
    const inline = whiteSpace.filter(cp => cp !== 0x0a).map(cp => String.fromCodePoint(cp));
    const spaceLabel = (text: string): string => (text === "" ? "none" : text === "\n" ? "end" : codeLabel(text.codePointAt(0) ?? 0));
    // DOC's cutter (wb-ro24): one row per alternative the header's DOC clause restates, in its order, beside its near miss.
    const cutter = {
      terminator: ["Next. The assembler acquires.", "Next! The assembler acquires.", "Next? The assembler acquires.", "Next; the assembler acquires.", "Next.\tThe assembler acquires.", "Next.\nThe assembler acquires.", "Next.The assembler acquires."].map(cutOf),
      blank: ["The assembler\n \t\nacquires."].map(cutOf),
      pipe: ["The assembler\n  | acquires |", "The assembler\n\t| acquires |", "| x |\nThe assembler acquires."].map(cutOf),
      heading: [
        "The assembler\n###### acquires",
        "The assembler\n####### acquires",
        "The assembler\n   # acquires",
        "The assembler\n    # acquires",
        "The assembler\n\t# acquires",
        "The assembler\n#\tacquires",
        "The assembler\n#\nacquires.",
        "The assembler\n#acquires",
        "The assembler\n# x\nacquires.",
      ].map(cutOf),
      list: [
        "The assembler\n- acquires",
        "The assembler\n+ acquires",
        "The assembler\n* acquires",
        "The assembler\n1. acquires",
        "The assembler\n1) acquires",
        "The assembler\n10. acquires",
        "The assembler\n  - acquires",
        "The assembler\n\t- acquires",
        "The assembler\n-\tacquires",
        "The assembler\n-acquires",
        "- The assembler\nacquires.",
      ].map(cutOf),
      // A list marker alone before the line end (wb-ro24 respin 1): no list cut; 1. alone only the terminator cuts after.
      alone: ["The assembler\n-\nacquires.", "The assembler\n+\nacquires.", "The assembler\n*\nacquires.", "The assembler\n1)\nacquires.", "The assembler\n1.\nacquires."].map(cutOf),
      // SWEEPS (wb-ro24): every BMP code point but the surrogates and the line feed, in one page shape each, sorted into the
      // readings the DOC clause predicts for that shape; at each place, one sweep for each alternative the clause names there.
      marks: sweep(
        char => `Next${char} The assembler acquires.`,
        char => [`1:Next${char} The assembler acquires.`],
        { cut: char => [`1:Next${char}`, "1:The assembler acquires."] },
      ),
      marksEnd: sweep(
        char => `Next${char}\nThe assembler acquires.`,
        char => [`1:Next${char} The assembler acquires.`],
        { cut: char => [`1:Next${char}`, "2:The assembler acquires."], trimmed: () => ["1:Next The assembler acquires."] },
      ),
      marksAfter: sweep(
        char => `Next${char}. A${char}! B${char}? C${char}; The assembler acquires.`,
        char => [`1:Next${char}.`, `1:A${char}!`, `1:B${char}?`, `1:C${char};`, "1:The assembler acquires."],
        {},
        "cut",
      ),
      space: {
        engine: { scanned, whiteSpace: whiteSpace.map(codeLabel), trimmed: trimmed.map(codeLabel) },
        terminator: Object.fromEntries(
          MARKS.map(mark => [
            mark,
            sweep(
              char => `Next${mark}${char}The assembler acquires.`,
              char => [`1:Next${mark}${char}The assembler acquires.`],
              { cut: () => [`1:Next${mark}`, "1:The assembler acquires."] },
            ),
          ]),
        ),
        blankOne: sweep(
          char => `The assembler\n${char}\nacquires.`,
          char => [`1:The assembler ${char} acquires.`],
          {
            cut: () => ["1:The assembler", "3:acquires."],
            mark: char => [`1:The assembler ${char}`, "3:acquires."],
            whole: char => ["1:The assembler", `2:${char}`, "3:acquires."],
          },
        ),
        blank: sweep(
          char => `The assembler\n${char}${char}\nacquires.`,
          char => [`1:The assembler ${char}${char} acquires.`],
          {
            cut: () => ["1:The assembler", "3:acquires."],
            mark: char => [`1:The assembler ${char}${char}`, "3:acquires."],
            whole: char => ["1:The assembler", `2:${char}${char}`, "3:acquires."],
          },
        ),
        pipe: sweep(
          char => `The assembler\n${char}| acquires |\nthe resources.`,
          char => [`1:The assembler ${char}| acquires | the resources.`],
          { cut: () => ["1:The assembler", "2:| acquires |", "3:the resources."], whole: char => ["1:The assembler", `2:${char}| acquires |`, "3:the resources."] },
        ),
        headingLead: Object.fromEntries(
          HASH_RUNS.map(run => [
            run,
            sweep(
              char => `The assembler\n${char}${run} acquires\nthe resources.`,
              char => [`1:The assembler ${char}${run} acquires the resources.`],
              { cut: () => ["1:The assembler", `2:${run} acquires`, "3:the resources."], whole: char => ["1:The assembler", `2:${char}${run} acquires`, "3:the resources."] },
            ),
          ]),
        ),
        headingTrail: Object.fromEntries(
          HASH_RUNS.map(run => [
            run,
            sweep(
              char => `The assembler\n${run}${char}acquires\nthe resources.`,
              char => [`1:The assembler ${run}${char}acquires the resources.`],
              { cut: char => ["1:The assembler", `2:${run}${char}acquires`, "3:the resources."] },
            ),
          ]),
        ),
        listLead: Object.fromEntries(
          LIST_MARKERS.map(marker => [
            marker,
            marker.endsWith(".")
              ? sweep(
                  char => `The assembler\n${char}${marker} acquires\nthe resources.`,
                  char => [`1:The assembler ${char}${marker}`, "2:acquires the resources."],
                  {
                    cut: () => listed(marker, " "),
                    digit: char => ["1:The assembler", `2:${char}${marker}`, "2:acquires the resources."],
                    whole: char => ["1:The assembler", `2:${char}${marker}`, "2:acquires", "3:the resources."],
                  },
                  "mark",
                )
              : sweep(
                  char => `The assembler\n${char}${marker} acquires\nthe resources.`,
                  char => [`1:The assembler ${char}${marker} acquires the resources.`],
                  marker.endsWith(")")
                    ? {
                        cut: () => listed(marker, " "),
                        digit: char => ["1:The assembler", `2:${char}${marker} acquires the resources.`],
                        whole: char => ["1:The assembler", `2:${char}${marker} acquires`, "3:the resources."],
                      }
                    : { cut: () => listed(marker, " "), whole: char => ["1:The assembler", `2:${char}${marker} acquires`, "3:the resources."] },
                ),
          ]),
        ),
        listTrail: Object.fromEntries(
          LIST_MARKERS.map(marker => [
            marker,
            sweep(
              char => `The assembler\n${marker}${char}acquires\nthe resources.`,
              char => [`1:The assembler ${marker}${char}acquires the resources.`],
              { cut: char => listed(marker, char) },
            ),
          ]),
        ),
      },
      openers: sweep(
        char => `The assembler\n${char} acquires\nthe resources.`,
        char => [`1:The assembler ${char} acquires the resources.`],
        {
          list: char => ["1:The assembler", `2:${char} acquires the resources.`],
          whole: char => ["1:The assembler", `2:${char} acquires`, "3:the resources."],
          mark: char => [`1:The assembler ${char}`, "2:acquires the resources."],
          trimmed: () => ["1:The assembler acquires the resources."],
        },
      ),
      digitsFirst: {
        ")": sweep(
          char => `The assembler\n${char}) acquires\nthe resources.`,
          char => [`1:The assembler ${char}) acquires the resources.`],
          {
            list: char => ["1:The assembler", `2:${char}) acquires the resources.`],
            whole: char => ["1:The assembler", `2:${char}) acquires`, "3:the resources."],
            trimmed: () => ["1:The assembler ) acquires the resources."],
          },
        ),
        ".": sweep(
          char => `The assembler\n${char}. acquires\nthe resources.`,
          char => [`1:The assembler ${char}.`, "2:acquires the resources."],
          {
            list: char => ["1:The assembler", `2:${char}.`, "2:acquires the resources."],
            whole: char => ["1:The assembler", `2:${char}.`, "2:acquires", "3:the resources."],
            trimmed: () => ["1:The assembler .", "2:acquires the resources."],
          },
          "mark",
        ),
      },
      digits: {
        ")": sweep(
          char => `The assembler\n1${char}) acquires\nthe resources.`,
          char => [`1:The assembler 1${char}) acquires the resources.`],
          { list: char => ["1:The assembler", `2:1${char}) acquires the resources.`] },
        ),
        ".": sweep(
          char => `The assembler\n1${char}. acquires\nthe resources.`,
          char => [`1:The assembler 1${char}.`, "2:acquires the resources."],
          { list: char => ["1:The assembler", `2:1${char}.`, "2:acquires the resources."] },
          "mark",
        ),
      },
      delimiters: sweep(
        char => `The assembler\n1${char} acquires\nthe resources.`,
        char => [`1:The assembler 1${char} acquires the resources.`],
        {
          list: char => ["1:The assembler", `2:1${char} acquires the resources.`],
          listMark: char => ["1:The assembler", `2:1${char}`, "2:acquires the resources."],
          mark: char => [`1:The assembler 1${char}`, "2:acquires the resources."],
        },
      ),
      // COUNTS (wb-ro24): bounded runs of spaces and of tabs, each claimed only within its bound, at each place and for each
      // alternative the clause names there.
      counts: {
        hashes: counted(upTo(12, 1), count => `The assembler\n${"#".repeat(count)} acquires\nthe resources.`, {
          cut: count => ["1:The assembler", `2:${"#".repeat(count)} acquires`, "3:the resources."],
          runOn: count => [`1:The assembler ${"#".repeat(count)} acquires the resources.`],
        }),
        hashesEnd: counted(upTo(12, 1), count => `The assembler\n${"#".repeat(count)}\nacquires.`, {
          cut: count => ["1:The assembler", `2:${"#".repeat(count)}`, "3:acquires."],
          runOn: count => [`1:The assembler ${"#".repeat(count)} acquires.`],
        }),
        headingLead: Object.fromEntries(
          HASH_RUNS.map(run => [
            run,
            {
              spaces: counted(upTo(8), count => `The assembler\n${" ".repeat(count)}${run} acquires\nthe resources.`, headingCut(run)),
              tabs: counted(upTo(8), count => `The assembler\n${"\t".repeat(count)}${run} acquires\nthe resources.`, headingCut(run)),
            },
          ]),
        ),
        headingTrail: Object.fromEntries(
          HASH_RUNS.map(run => [
            run,
            {
              spaces: counted(upTo(8, 1), count => `The assembler\n${run}${" ".repeat(count)}acquires\nthe resources.`, {
                cut: count => ["1:The assembler", `2:${run}${" ".repeat(count)}acquires`, "3:the resources."],
              }),
              tabs: counted(upTo(8, 1), count => `The assembler\n${run}${"\t".repeat(count)}acquires\nthe resources.`, {
                cut: count => ["1:The assembler", `2:${run}${"\t".repeat(count)}acquires`, "3:the resources."],
              }),
            },
          ]),
        ),
        digits: {
          paren: counted(upTo(32, 1), count => `The assembler\n${digitRun.slice(0, count)}) acquires\nthe resources.`, {
            cut: count => ["1:The assembler", `2:${digitRun.slice(0, count)}) acquires the resources.`],
          }),
          dot: counted(upTo(32, 1), count => `The assembler\n${digitRun.slice(0, count)}. acquires\nthe resources.`, {
            cut: count => ["1:The assembler", `2:${digitRun.slice(0, count)}.`, "2:acquires the resources."],
          }),
        },
        listLead: Object.fromEntries(
          LIST_MARKERS.map(marker => [
            marker,
            {
              spaces: counted(upTo(32), count => `The assembler\n${" ".repeat(count)}${marker} acquires\nthe resources.`, { cut: () => listed(marker, " ") }),
              tabs: counted(upTo(8), count => `The assembler\n${"\t".repeat(count)}${marker} acquires\nthe resources.`, { cut: () => listed(marker, " ") }),
            },
          ]),
        ),
        listTrail: Object.fromEntries(
          LIST_MARKERS.map(marker => [
            marker,
            {
              spaces: counted(upTo(8, 1), count => `The assembler\n${marker}${" ".repeat(count)}acquires\nthe resources.`, { cut: count => listed(marker, " ".repeat(count)) }),
              tabs: counted(upTo(8, 1), count => `The assembler\n${marker}${"\t".repeat(count)}acquires\nthe resources.`, { cut: count => listed(marker, "\t".repeat(count)) }),
            },
          ]),
        ),
        pipeLead: {
          spaces: counted(upTo(32), count => `The assembler\n${" ".repeat(count)}| acquires |\nthe resources.`, pipeCut),
          tabs: counted(upTo(8), count => `The assembler\n${"\t".repeat(count)}| acquires |\nthe resources.`, pipeCut),
        },
        blank: {
          spaces: counted(upTo(8, 1), count => `The assembler\n${" ".repeat(count)}\nacquires.`, { cut: () => ["1:The assembler", "3:acquires."] }),
          tabs: counted(upTo(8, 1), count => `The assembler\n${"\t".repeat(count)}\nacquires.`, { cut: () => ["1:The assembler", "3:acquires."] }),
        },
        terminatorTrail: Object.fromEntries(
          MARKS.map(mark => [
            mark,
            {
              spaces: counted(upTo(8, 1), count => `Next${mark}${" ".repeat(count)}The assembler acquires.`, { cut: () => [`1:Next${mark}`, "1:The assembler acquires."] }),
              tabs: counted(upTo(8, 1), count => `Next${mark}${"\t".repeat(count)}The assembler acquires.`, { cut: () => [`1:Next${mark}`, "1:The assembler acquires."] }),
            },
          ]),
        ),
      },
      // CROSSES (wb-ro24 cut #3): a lead and a trail varied together, each item held to the one reading DOC predicts for it.
      cross: {
        heading: crossed(
          HASH_RUNS.flatMap(run => ["", ...inline].flatMap(lead => [...inline, "\n"].map(trail => ({ lead, run, trail })))),
          item => `${spaceLabel(item.lead)} ${item.run} ${spaceLabel(item.trail)}`,
          item => `The assembler\n${item.lead}${item.run}${item.trail}acquires\nthe resources.`,
          item => (item.trail === "\n" ? ["1:The assembler", `2:${item.run}`, "3:acquires the resources."] : ["1:The assembler", `2:${item.run}${item.trail}acquires`, "3:the resources."]),
        ),
        list: crossed(
          CROSS_MARKERS.flatMap(marker => ["", ...inline].flatMap(lead => inline.map(trail => ({ lead, marker, trail })))),
          item => `${spaceLabel(item.lead)} ${item.marker} ${spaceLabel(item.trail)}`,
          item => `The assembler\n${item.lead}${item.marker}${item.trail}acquires\nthe resources.`,
          item => listed(item.marker, item.trail),
        ),
        alone: crossed(
          CROSS_MARKERS.flatMap(marker => ["", ...inline].map(lead => ({ lead, marker }))),
          item => `${spaceLabel(item.lead)} ${item.marker}`,
          item => `The assembler\n${item.lead}${item.marker}\nacquires.`,
          item => (item.marker.endsWith(".") ? [`1:The assembler ${item.marker}`, "3:acquires."] : [`1:The assembler ${item.marker} acquires.`]),
        ),
      },
    };
    // R-OUTSIDE-ROOTS quiet row: the same claim in every outside directory, in a root text file and in a non-module code file.
    const outsideFiles: Record<string, string> = { "docs/plant.md": `${PLANT}\n` };
    for (const directory of CONSTANTS.outside) outsideFiles[`${directory}/plant.md`] = `${PLANT}\n`;
    outsideFiles["PLANT.txt"] = `${PLANT}\n`;
    outsideFiles["qa/plant.sh"] = `# ${PLANT}\n`;
    outsideFiles["docs/plant.txt"] = `${PLANT}\n`;
    outsideFiles["docs/plant.MD"] = `${PLANT}\n`;
    outsideFiles["docs/plant.markdown"] = `${PLANT}\n`;
    outsideFiles["src/plant.jsx"] = `// ${PLANT}\nexport {};\n`;
    const replica = gitReplica("km7q2-outside-", outsideFiles);
    const read = gitList(replica);
    const unread = Object.keys(outsideFiles)
      .filter(path => !read.includes(path))
      .sort(byName);
    const quiet = {
      "R-OUTSIDE-ROOTS": { read, unread, findings: surveyFiles(replica, read).findings, unreadWouldFind: unread.map(path => docSurvey(path, outsideFiles[path] ?? "").findings.length) },
      "R-SPLIT": [docOf("We added an assembler. It acquires resources."), docOf("Status: acquires. Subject: the assembler."), docOf("The assembler\n<!-- x -->\nacquires resources.\n")],
      "R-COMMENT-HIDDEN": [
        docOf("<!-- The assembler acquires resources. -->\n"),
        docOf("Intro.\n\n<!--\nThe assembler schedules acquisition.\n-->\n"),
        docOf("Intro.\n\n<!-- The assembler judges freshness.\n\nMore.\n"),
        docOf("The assembler <!-- acquires resources --> is documented.\n"),
      ],
      // A comment block's lines read as COMMENTS OUT (2) and (3) leave them (the header's member order).
      "R-COMMENT-BLOCK": {
        trailing: ["The assembler acquires resources\n<!-- x --> never.\n", "The assembler acquires resources\n<!-- x -->never.\n", "The assembler acquires resources\n<!-- a -->x<!-- b -->\nnever.\n", "The assembler\n<!-- x --> acquires resources.\n"].map(asWritten),
        second: ["The assembler acquires resources\n<!-- a --> <!-- b -->\nnever.\n", "The assembler acquires resources\n<!-- a --><!-- b -->\nnever.\n", "The assembler\n<!-- a --> <!-- b -->\nacquires resources.\n"].map(asWritten),
        quoted: ["> The assembler acquires resources\n> <!-- x -->\n> never.\n", "- > The assembler acquires resources\n  > <!-- x -->\n  > never.\n", "> The assembler\n> <!-- x -->\n> acquires resources.\n"].map(asWritten),
        listed: ["- The assembler acquires resources\n  <!-- x -->\n  never.\n", "1. The assembler acquires resources\n   <!-- x -->\n   never.\n", "- a\n  - The assembler acquires resources\n    <!-- x -->\n    never.\n", "- The assembler\n  <!-- x -->\n  acquires resources.\n"].map(asWritten),
      },
      // Outside its placed comments a page is read as its source is written (the header names each group's members in order).
      "R-SOURCE-AS-WRITTEN": {
        markers: [
          "The assembler [acquires](https://example.com/never) resources.\n",
          "The assembler [acquires](<https://example.com/never>) resources.\n",
          'The assembler [acquires](https://example.com "never") resources.\n',
          "The assembler [acquires](https://example.com (never)) resources.\n",
          "The assembler [acquires][never] resources.\n\n[never]: https://example.com\n",
          "[ref]: https://example.com/never\nThe assembler acquires resources.\n",
          'The assembler <span title="never">acquires</span> resources.\n',
          "The assembler <none>acquires</none> resources.\n",
          "The assembler ![never](https://example.com/x.png) acquires resources.\n",
          "The assembler ![x](https://example.com/never.png) acquires resources.\n",
          "<style>/* never */</style>\nThe assembler acquires resources.\n",
          "<script>never</script>\nThe assembler acquires resources.\n",
          "<?never?>\nThe assembler acquires resources.\n",
          "<![CDATA[never]]>\nThe assembler acquires resources.\n",
          "<!NEVER>\nThe assembler acquires resources.\n",
          "```never\nThe assembler acquires resources.\n```\n",
          "~~~never\nThe assembler acquires resources.\n~~~\n",
          "The assembler <span hidden>never</span> acquires resources.\n",
          "<div hidden>never</div>\nThe assembler acquires resources.\n",
          "<template>never</template>\nThe assembler acquires resources.\n",
        ].map(asWritten),
        claims: [
          '<span title="The assembler acquires resources.">x</span>\n',
          "See [x](https://example.com/the-assembler-acquires-resources).\n",
          "<style>/* The assembler acquires resources. */</style>\n",
          "[the assembler acquires resources]: https://example.com\n",
          "```the assembler acquires resources\nx\n```\n",
          "x <span hidden>The assembler acquires resources.</span>\n",
          "<template>The assembler acquires resources.</template>\n",
        ].map(asWritten),
        words: ["The assem*bler* acquires resources.\n", "The assem`bler` acquires resources.\n", "The assembler &#110;ever acquires resources.\n"].map(asWritten),
        references: [
          "The assembler &nbsp; acquires resources.\n",
          "The assembler &amp; acquires resources.\n",
          "The assembler &#38; acquires resources.\n",
          "The assembler &not; acquires resources.\n",
          "The assembler &lt; acquires resources.\n",
          "The assembler &#x26; acquires resources.\n",
        ].map(asWritten),
        lines: [
          "> The assembler acquires resources\n>\n> never.\n",
          "> The assembler\n>\n> acquires resources.\n",
          "> The assembler acquires resources\n> - never\n",
          "> The assembler\n> - acquires resources\n",
          "> # The assembler acquires resources\n> never.\n",
          "> The assembler\n> # acquires resources\n",
          "The assembler acquires resources\n===\nnever.\n",
          "The assembler acquires resources\n---\nnever.\n",
          "The assembler\n===\nacquires resources.\n",
          "The assembler acquires resources\n***\nnever.\n",
          "The assembler acquires resources\n<div>never</div>\n",
          "<div>never</div>\nThe assembler acquires resources.\n",
          "The assembler\n<div>acquires resources.</div>\n",
          "a | b\n--- | ---\nThe assembler | acquires resources\n",
          "    # The assembler acquires resources\nnever.\n",
          "| a | b |\n| --- | --- |\n| The assembler | acquires resources |\n",
        ].map(asWritten),
      },
    };
    // COMMENTS OUT (wb-cppf): the rows the header's clauses (1)-(6) name; every reading is the reader's, never a rendered page's.
    const unplaced = [
      "| Concern | Owner |\n| --- | --- |\n| assembler <!-- never \\| x --> | acquires |\n",
      "The assembler <!-- never -->\racquires resources.\n",
      "> - The assembler <!-- not\n>   never --> acquires resources.\n",
      "> 1. The assembler <!-- not\n>    never --> acquires resources.\n",
      "- The assembler <!-- not\n\tnever --> acquires resources.\n",
      "See [x](<!--never-->)<!--never--> the assembler acquires resources.\n",
      "| a | b |\n| --- | --- |\n| `\\| <!-- never -->` <!-- never --> The assembler acquires resources | x |\n",
      "- a\n\n\t[<!-- never -->](u) x\n\n  The assembler `<!-- never -->` acquires resources.\n",
      '<span title="QQ"></span>See [x](<!--never-->)<!--never--> the assembler acquires resources.\n',
      "The assembler <!--> acquires resources.\n",
      "The assembler <!---> acquires resources.\n",
      "The assembler <!-- x --> acquires <!-- x --> resources.\n",
    ]
      .map(page => docSurvey("docs/plant.md", page))
      .map(one => ({ findings: one.findings, quieted: one.quieted, unplaced: one.unplaced }));
    const surveyed = (page: string): Json => {
      const one = docSurvey("docs/plant.md", page);
      return { findings: one.findings, quieted: one.quieted, unplaced: one.unplaced };
    };
    const comments = {
      hiddenMarker: [
        docOf("The assembler acquires resources<!-- , not the host -->.\n"),
        docOf("The assembler <!-- never --> schedules acquisition.\n"),
        docOf("The assembler judges freshness.<!-- Not today. -->\n"),
      ],
      empty: [
        "<!-->never-->\nThe assembler acquires resources.\n",
        "The assembler acquires resources\n<!-->x-->\nnever.\n",
        "<!--->never-->\nThe assembler acquires resources.\n",
        "The assembler acquires resources\n<!--->x-->\nnever.\n",
        "The assembler <!-->never--> acquires resources.\n",
        "The assembler <!--->never--> acquires resources.\n",
      ].map(surveyed),
      blanked: [
        "   <!-- a\nb --> never\nThe assembler acquires resources.\n",
        "<!-- a\nb --> never\nThe assembler acquires resources.\n",
        " <!-- a\nb --> never\nThe assembler acquires resources.\n",
        "  <!-- a\nb --> never\nThe assembler acquires resources.\n",
        "    <!-- a\nb --> never\nThe assembler acquires resources.\n",
      ].map(surveyed),
      joined: [
        docOf("The assembler <!-- not\nnever -->\nacquires resources.\n"),
        docOf("The assembler\n  <!-- never -->\nacquires resources.\n"),
        docOf("The assem<!-- -->bler acquires resources.\n"),
        docOf("<div>\nThe assembler\n<!-- never -->\nacquires resources.\n</div>\n"),
      ],
      // COMMENTS OUT (3)'s white space (wb-ro24 respin 1): a line a removed comment leaves holding one code point.
      dropped: Object.fromEntries(
        [...whiteSpace.filter(cp => cp !== 0x0a), ...NOT_WHITE_SPACE].map(cp => [codeLabel(cp), docCut(`The assembler\n${String.fromCodePoint(cp)}<!-- never -->\nacquires resources.\n`)]),
      ),
      lines: [
        docOf("<!--\nnot\n-->\nThe assembler acquires resources.\n"),
        docOf("<!-- not --> The assembler acquires resources.\n"),
        docOf("Intro <!-- a\nb\nc --> text.\n\nThe assembler acquires resources.\n"),
        docOf("Intro. <!-- a\nb\nc --> The assembler acquires resources.\n"),
      ],
      unlexed: [
        docOf("The assembler `<!-- never -->` acquires resources.\n"),
        docOf("```\n<!-- The assembler acquires resources. -->\n```\n"),
        docOf("\\<!-- The assembler acquires resources. -->\n"),
        docOf("Text <!-- open\n\nThe assembler acquires resources.\n"),
        docOf("`<!-- never -->` spells a comment. The assembler <!-- never --> acquires resources.\n"),
      ],
      containers: [
        docOf("- Intro\n\n  <!--\n  The assembler acquires resources.\n  -->\n"),
        docOf("> <!-- The assembler\n> acquires resources. -->\n"),
        docOf("- The assembler <!-- not\n  never --> acquires resources.\n"),
        docOf("> The assembler <!-- not\n> never --> acquires resources.\n"),
        docOf("- > The assembler <!-- not\n  > never --> acquires resources.\n"),
        docOf(">> The assembler <!-- not\n>> never --> acquires resources.\n"),
        docOf("> The assembler <!-- not\n>\tnever --> acquires resources.\n"),
        docOf("- > The assembler <!-- not\n\t> never --> acquires resources.\n"),
      ],
      // COMMENTS OUT (5)'s line breaks (wb-ro24 respin 1): bounded runs, each claimed only within its bound.
      runs: {
        paragraph: {
          spaces: placements(upTo(32), count => `The assembler <!-- not\n${" ".repeat(count)}never --> acquires resources.\n`, "not"),
          tabs: placements(upTo(8, 1), count => `The assembler <!-- not\n${"\t".repeat(count)}never --> acquires resources.\n`, "not"),
          spaceTabs: placements(upTo(4, 1), count => `The assembler <!-- not\n${" \t".repeat(count)}never --> acquires resources.\n`, "not"),
        },
        item: {
          spaces: placements(upTo(16), count => `- The assembler <!-- not\n${" ".repeat(count)}never --> acquires resources.\n`, "not"),
          tabs: placements(upTo(4, 1), count => `- The assembler <!-- not\n${"\t".repeat(count)}never --> acquires resources.\n`, "not"),
        },
        ordered: placements(upTo(16), count => `10. The assembler <!-- not\n${" ".repeat(count)}never --> acquires resources.\n`, "not"),
        nested: placements(upTo(12, 1), count => `${"- ".repeat(count)}The assembler <!-- not\n${"  ".repeat(count)}never --> acquires resources.\n`, "not"),
        nestedQuote: placements(upTo(8, 1), count => `${"- ".repeat(count)}> The assembler <!-- not\n${"  ".repeat(count)}> never --> acquires resources.\n`, "not"),
        tabStops: placements(upTo(6, 1), count => `${"- - ".repeat(count)}The assembler <!-- not\n${"\t".repeat(count)}never --> acquires resources.\n`, "not"),
        mixedStops: [
          "- - - The assembler <!-- not\n\t  never --> acquires resources.\n",
          "- - - - The assembler <!-- not\n  \t    never --> acquires resources.\n",
          "1.  The assembler <!-- not\n\tnever --> acquires resources.\n",
          "123456. The assembler <!-- not\n\t\tnever --> acquires resources.\n",
        ].map(page => placement(page, "not")),
        depth: placements(upTo(8, 1), count => `${">".repeat(count)} The assembler <!-- not\n${">".repeat(count)} never --> acquires resources.\n`, "not"),
        spacedDepth: placements(upTo(8, 1), count => `${"> ".repeat(count)}The assembler <!-- not\n${"> ".repeat(count)}never --> acquires resources.\n`, "not"),
        afterQuote: {
          spaces: placements(upTo(8), count => `> The assembler <!-- not\n>${" ".repeat(count)}never --> acquires resources.\n`, "not"),
          tabs: placements(upTo(4), count => `> The assembler <!-- not\n>${"\t".repeat(count)}never --> acquires resources.\n`, "not"),
        },
        itemQuote: {
          spaces: placements(upTo(8), count => `- > The assembler <!-- not\n${" ".repeat(count)}> never --> acquires resources.\n`, "not"),
          tabs: placements(upTo(4), count => `- > The assembler <!-- not\n${"\t".repeat(count)}> never --> acquires resources.\n`, "not"),
          mixed: [" \t", "\t ", " \t "].map(lead => placement(`- > The assembler <!-- not\n${lead}> never --> acquires resources.\n`, "not")),
        },
        lines: ["> The assembler <!-- a\n> b\n> c --> acquires resources.\n", "- The assembler <!-- a\n  b\n  c --> acquires resources.\n"].map(surveyed),
      },
      cells: ["| x <!-- never --> | y |\n| --- | --- |\n| The assembler | acquires resources |\n"].map(surveyed),
      // COMMENTS OUT (5)'s WALK (wb-ro24): each comment placed at its row's position, as the header's WALK names it.
      order: [
        "- <!-- never --> The assembler acquires resources\n- x\n",
        "| a | b |\n| --- | --- |\n| <!-- never --> The assembler acquires resources | x |\n",
        "| a | b |\n| --- | --- |\n| x | <!-- never --> The assembler acquires resources |\n| y | z |\n",
        "> <!-- never --> The assembler acquires resources.\n>\n> x\n",
        "- <!-- never --> The assembler acquires resources.\n\n  x\n",
        // wb-ro24 cut #3: the other list kinds, then a comment in the own tokens of each other token kind WALK names.
        "+ <!-- never --> The assembler acquires resources\n+ x\n",
        "* <!-- never --> The assembler acquires resources\n* x\n",
        "1. <!-- never --> The assembler acquires resources\n2. x\n",
        "1) x <!-- not --> The assembler acquires resources\n2) y\n",
        "3. <!-- never --> The assembler acquires resources\n4. x\n",
        "- <!-- never --> The assembler acquires resources\n\n- x\n",
        "- [ ] <!-- never --> The assembler acquires resources\n- [ ] x\n",
        "- a\n  - <!-- never --> The assembler acquires resources\n  - x\n",
        "- x <!-- never --> The assembler acquires resources\n",
        "x <!-- never --> The assembler acquires resources.\n",
        "# <!-- never --> The assembler acquires resources\n",
        "The assembler **<!-- never --> acquires** resources.\n",
        "__<!-- never --> The assembler acquires__ resources.\n",
        "*<!-- never --> The assembler acquires* resources.\n",
        "_<!-- never --> The assembler acquires_ resources.\n",
        "~~<!-- never --> The assembler acquires~~ resources.\n",
        "[<!-- never --> The assembler acquires](x) resources.\n",
        "![<!-- never --> The assembler acquires](x) resources.\n",
      ].map(surveyed),
      // COMMENTS OUT (5)'s cursor (wb-ro24 respin 1): two identical comments side by side, each placed past the one before.
      cursor: [
        "The assembler <!-- never --><!-- never --> acquires resources.\n",
        "The assembler acquires resources\n<!-- never --> <!-- never -->\nx.\n",
        "The assembler acquires resources\n<!-- never --><!-- never -->\nx.\n",
      ].map(surveyed),
      crlf: ["The assembler <!-- never -->\r\nacquires resources.\r\n"].map(surveyed),
      unplaced,
      // COMMENTS OUT (5)'s sentinel (wb-ro24 respin 1): the link-destination misplacement page spelling every run of zero to
      // sixty-four Q lists its comment unplaced.
      sentinel: placements(upTo(64), count => `<span title="${"Q".repeat(count)}"></span>See [x](<!--never-->)<!--never--> the assembler acquires resources.\n`, "never"),
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A3").map(residual => residual.id));
    return {
      floors,
      findings: real.findings.filter(finding => isPage(finding.slice(0, finding.indexOf(":")))),
      unplaced: real.unplaced,
      frozen: { revision: CONSTANTS.frozenAt, ancestor, pages: frozen.docs.length, sentences: frozen.readings, named: frozen.named, findings: frozen.findings, quieted: frozen.quieted, unplaced: frozen.unplaced },
      cuts,
      judged,
      cutter,
      comments,
      quiet,
    };
  },
  A4: async () => {
    const subjects = [
      "The assembler acquires resources.",
      "The Assembler acquires resources.",
      "Assemblers acquire resources.",
      "The ReactiveComponentsSDK assembler acquires resources.",
      "ReactiveComponents acquires resources.",
      "The reactive-components package acquires resources.",
      "The reactive_components module acquires resources.",
      "The context assembly acquires resources.",
      "RC assembly acquires resources.",
      "rf's assembled context acquires resources.",
      "Assembling the components acquires resources.",
      "The fiber assembles and acquires.",
      `The ${FULLWIDTH_A}ssembler acquires resources.`,
      "The RC SDK acquires resources.",
      "The reactivecomponents package acquires resources.",
      "reactivecomponentssdk acquires resources.",
    ].map(verdict);
    const notSubjects = ["The reply assembly acquires resources.", "The assembled child prompt is fresh.", "Workflows assembled from MechanicalWorkflows schedule work.", "The disassembler acquires resources.", "The reassembled tree is stale.", "The assemblage acquires.", "Reactive programming acquires resources."].map(text => read(text).kind);
    const anchors = VOCABULARY.anchors.map(word => verdict(`The ${word} assembly acquires resources.`));
    const markers = [
      "not",
      "no",
      "never",
      "nor",
      "neither",
      "without",
      "cannot",
      "until",
      "unless",
      "gated",
      "unshipped",
      "proposed",
      "none",
      "nothing",
      "isn't",
      "isn’t",
      "design only",
    ].map(word => read(`The assembler ${word} acquires resources.`).kind);
    const notMarkers = ["should", "must", "shall", "will", "would", "may", "if", "when", "once", "only", "host"].map(word => verdict(`The assembler ${word} acquire resources.`));
    const expectations = [verdict("Pi expects the assembler to acquire resources."), verdict("The host relies on the assembler to schedule acquisition."), verdict("Freshness is judged by the assembler.")];
    const quiet = {
      "R-UNANCHORED": [read("The reply assembly is stale.").kind, read("Receipt assembly schedules nothing new").kind, read("The prompt is assembled fresh.").kind],
      "R-RENDERER": [verdict("rf acquires the resource."), verdict("The render judges freshness."), verdict("ReactiveFiberCLI schedules acquisition.")],
      "R-SHORT-NAME": [verdict("RC acquires resources."), verdict("The rc schedules acquisition."), read("rc 1 means the cache is stale").kind],
      "R-LOOKALIKE": [verdict(`The ${LOOKALIKE_A}ssembler acquires resources.`), verdict(`The assemb${INVISIBLE}ler acquires resources.`), verdict(`The assembler acq${INVISIBLE}uires resources.`), verdict("The assem&#98;ler acquires resources.")],
      "R-MARKER-ANYWHERE": [verdict("The assembler acquires resources and no rollback is planned."), verdict("The assembler judges freshness; nothing else changed"), verdict("The assembler acquires resources, not the host.")],
      "R-SYNONYM": synonymsOf(),
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A4").map(residual => residual.id));
    return { subjects, notSubjects, anchors, markers, notMarkers, expectations, quiet };
  },
  B1: async () => {
    const forms = VOCABULARY.families.acquire.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.acquire();\n"), codeOf("const assemblerAcquisitionMode = 1;\n"), codeOf("rc.assembler.speculate = true;\n"), codeOf("type AssemblerObtainer = { obtainResource(): void };\n")];
    const nearMisses = ["acquaint", "acquit", "require", "inquire", "acquiesce", "obtainable", "speculum", "acquirer"].map(word => verdict(`The assembler: ${word}.`));
    return { forms, code, nearMisses };
  },
  B2: async () => {
    const forms = VOCABULARY.families.schedule.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.schedule(block);\n"), codeOf("const ASSEMBLER_SCHEDULER = 1;\n"), codeOf("interface Assembler { scheduled: boolean }\n")];
    const nearMisses = ["schedulable", "schema", "scheduleless", "timetable", "agenda"].map(word => verdict(`The assembler: ${word}.`));
    return { forms, code, nearMisses };
  },
  B3: async () => {
    const forms = VOCABULARY.families.freshness.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.freshness;\n"), codeOf("const assemblerStaleTime = 5;\n"), codeOf("const opts = { assembler: { isFresh: true } };\n")];
    const nearMisses = ["refresh", "refreshed", "freshman", "freshwater", "stalemate", "stalk", "staleless"].map(word => verdict(`The assembler: ${word}.`));
    const quiet = {
      "R-PARAPHRASE": ["fetches resources", "prefetches blocks", "loads resources", "refreshes blocks", "expires blocks", "sets a ttl", "queues work", "defers work", "keeps blocks up to date"].map(phrase => verdict(`The assembler ${phrase}.`)),
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B3").map(residual => residual.id));
    return { forms, code, nearMisses, quiet };
  },
  C1: async () => {
    const producer = ROSTER.producer;
    const hashed = producer.lines.map(line => createHash("sha256").update(line.text).digest("hex") === line.sha256);
    const status = producer.lines.find(line => line.line === 3);
    const acceptance = producer.lines.find(line => line.line === 46);
    const others = producer.lines.filter(line => line.line !== 3);
    const accepted = (text: string): ProducerLine[] => [{ line: 3, text, sha256: "" }, ...others];
    const withoutSeven = producer.lines.map(line => (line.line === 46 ? { ...line, text: line.text.replace("RC-RQ7", "RC-RQ") } : line));
    const nearMisses = {
      recorded: gateOf(rcGateOf(producer), "ABSENT"),
      "recorded-seam-present": gateOf(rcGateOf(producer), "PRESENT"),
      "accepted-seam-absent": gateOf(rcGateOf({ lines: accepted("**Status:** accepted.") }), "ABSENT"),
      "accepted-seam-present": gateOf(rcGateOf({ lines: accepted("**Status:** accepted.") }), "PRESENT"),
      "status-uppercase": gateOf(rcGateOf({ lines: accepted((status?.text ?? "").toUpperCase()) }), "PRESENT"),
      "status-hyphenated": gateOf(rcGateOf({ lines: accepted((status?.text ?? "").replace("design only", "design-only")) }), "PRESENT"),
      "gate-missing": gateOf(rcGateOf({ lines: withoutSeven.map(line => (line.line === 3 ? { ...line, text: "**Status:** accepted." } : line)) }), "PRESENT"),
      "no-status-line": gateOf(rcGateOf({ lines: others }), "PRESENT"),
      "no-lines": gateOf(rcGateOf({ lines: [] }), "PRESENT"),
    };
    return {
      rcGate: rcGateOf(producer),
      recorded: producer.rcGate,
      hashed,
      lines: producer.lines.map(line => line.line),
      gates: [...(acceptance?.text ?? "").matchAll(GATE_IDS)].map(match => match[0]),
      readings: producer.lines.flatMap(line => sentences(line.text).map(sentence => `${line.line}: ${read(sentence.text).kind}`)),
      nearMisses,
      verdict: guard(gateOf(rcGateOf(producer), piSeam().seam), []),
    };
  },
  C2: async () => {
    const pi = piSeam();
    const { rf, inputNames, legacy, view, findings } = await seamWords();
    const launches = rfLaunchSites(
      gitList(REPO)
        .filter(path => path.startsWith("src/") && isModule(path))
        .map(path => [path, readFileSync(join(REPO, path), "utf8")] as const),
    );
    const page = readFileSync(join(REPO, CONSTANTS.docs03), "utf8");
    const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    const ownership = tables.grids.flatMap(grid => grid.filter(cells => cells[1] === RENDER_OWNER))[0] ?? [];
    const controls = {
      argv: [
        seamFindings("argv", [...legacy.argv, "--freshness", "1h"]),
        seamFindings("argv", [...legacy.argv, "--speculate"]),
        seamFindings("argv", ["--acquire-resources"]),
        seamFindings("argv", ["--schedule", "now"]),
        seamFindings("argv", ["--max-staleness=5"]),
      ],
      input: seamFindings("input", ["model", "freshness", "acquisitionMode", "scheduleAt", "taskId"]),
      env: seamFindings("env", ["HOME", "PATH", "RF_FRESHNESS_TTL", "RF_SPECULATE"]),
      launches: rfLaunchSites([
        ["src/plant.ts", 'spawn("rf", ["context", "render"]);\nexecFileSync("/usr/local/bin/rf", []);\nexecSync("rf --json status");\nchild.spawn("rfx", []);\n'],
        ["src/other.ts", 'fork("rf.exe");\nspawn(program, []);\n'],
      ]),
      sites: rcSites([
        ["src/plant.ts", 'import { assemble } from "reactive-components";\n'],
        ["src/plant-py.ts", 'spawn("python", ["-m", "reactive_components.assembly"]);\n'],
        ["src/plant-doc.ts", "// Wraps ReactiveComponentsSDK.\nexport {};\n"],
      ]),
      dependencies: rcDependencies(JSON.stringify({ dependencies: { "@jehalladay/reactive-components": "1.0.0" }, devDependencies: { vitest: "4" } })),
      seams: [seamOf([], []), seamOf(["src/plant.ts:1 lexeme"], []), seamOf([], ["reactive-components"])],
    };
    const quiet = {
      "R-SEAM-OTHER": [rcSites([["src/plant.ts", 'await fetch("http://localhost:7000/assemble?acquire=1");\n']]), rcSites([["src/plant.ts", 'spawn("rcx", ["build"]);\n']])],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "C2").map(residual => residual.id));
    return {
      seam: pi.seam,
      rcSites: pi.sites,
      rcDependencies: pi.dependencies,
      rfCapabilities: rf,
      rfLaunchSites: launches,
      inputNames,
      argv: { legacy: legacy.argv, legacyOutcome: legacy.outcome, view: view.argv, viewOutcome: view.outcome },
      findings,
      ownership: { found: tables.ok, cells: [...ownership], reading: read(ownership.join(" ")).kind, families: familiesOf(words(ownership.join(" "))) },
      controls,
      quiet,
    };
  },
};

/** The outside texts: the owner filing's title and citation line, and the producer's recorded lines. */
function outsideTexts(): string[] {
  const { title, notes } = beadRow();
  const filing = notes.split("\n").find(line => line.startsWith(CONSTANTS.filing)) ?? "";
  return [title, filing, ...ROSTER.producer.lines.map(line => line.text)];
}
/** R-SYNONYM: every vocabulary word no outside text spells, held by this file and the roster alone. */
function synonymsOf(): string[] {
  const spelledOutside = new Set(outsideTexts().flatMap(words));
  const all = [...VOCABULARY.subject, ...VOCABULARY.assembly, ...VOCABULARY.anchors, ...FAMILY_IDS.flatMap(id => VOCABULARY.families[id]), ...VOCABULARY.markers];
  return all.filter(word => !spelledOutside.has(word)).sort(byName);
}
/** A word's role in the reading: subject, assembly, marker, anchor, its families joined, or none. */
function roleOf(word: string): string {
  const tokens = words(word);
  if (namesSubject(tokens)) return "subject";
  if (tokens.some(token => ASSEMBLY.has(token))) return "assembly";
  if (tokens.some(token => MARKERS.has(token)) || hasPair(tokens, VOCABULARY.markerPairs)) return "marker";
  if (tokens.some(token => ANCHORS.has(token))) return "anchor";
  const families = familiesOf(tokens);
  return families.length === 0 ? "none" : families.join("+");
}
function beadRow(): { readonly title: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string" && "title" in value && typeof value.title === "string") return { title: value.title, notes: value.notes };
  }
  throw new Error("bead export lacks the owner filing");
}
const GAP = /^[\s,;:—]*$/;
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !GAP.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return GAP.test(body.slice(at));
}

describe("wb-km7q.2 RC assembler expectation census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R7, until the RC gates pass)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and title, the producer lines and docs/03", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    // The owner filing: the first notes line opening with the citation carries the acceptance clause, the three labels joined.
    const { title, notes } = beadRow();
    const filing = notes.split("\n").find(line => line.startsWith(CONSTANTS.filing)) ?? "";
    const clause = /Acceptance: (.+)\.$/.exec(filing)?.[1] ?? "";
    expect(clause).toBe(ROWS.map(row => row.label).join(" "));
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote)))).toEqual(ROWS.map(() => true));
    // The clause's own expectation, its negation and its until-clause removed, names exactly the three families.
    const expectation = clause.replace(/^.*? no (Pi code)/, "$1").replace(/ until .*$/, "");
    expect(read(clause).kind).toBe("marker");
    expect(verdict(expectation)).toBe("acquire+schedule+freshness");
    // The title: its last clause without "no" is a finding of the three families; its speculation clause is quiet only by never.
    const last = /, and no (Pi surface expects the assembler to .+)\.$/.exec(title)?.[1] ?? "";
    expect(verdict(last)).toBe("acquire+schedule+freshness");
    expect(read(`no ${last}`).kind).toBe("marker");
    const speculation = /, (speculation controls .+? never assembler execution),/.exec(title)?.[1] ?? "";
    expect(read(speculation).kind).toBe("marker");
    expect(verdict(speculation.replace(" never ", " and "))).toBe("acquire");
    const rcName = /inputs to (\S+ assembly) \(/.exec(title)?.[1] ?? "";
    expect(verdict(`${rcName} acquires resources.`)).toBe("acquire");
    const span = /gated RC-RQ(\d)\.\.RC-RQ(\d)\)/.exec(title);
    const expanded = Array.from({ length: Number(span?.[2] ?? 0) - Number(span?.[1] ?? 1) + 1 }, (_, index) => `RC-RQ${Number(span?.[1] ?? 1) + index}`);
    expect(expanded).toEqual(ROSTER.producer.gates);
    expect([...(ROSTER.producer.lines.find(line => line.line === 46)?.text ?? "").matchAll(GATE_IDS)].map(match => match[0])).toEqual(ROSTER.producer.gates);
    expect(ROSTER.unclaimed.map(entry => title.includes(entry.duty))).toEqual(ROSTER.unclaimed.map(() => true));
    expect(ROSTER.unclaimed.every(entry => entry.reason.length > 0)).toBe(true);
    // The citations: every cited line of the producer is a recorded line, at the recorded bead pin.
    const cited = [...filing.matchAll(/:(\d+)@([0-9a-f]{12})/g)].map(match => [Number(match[1]), match[2] ?? ""] as const);
    expect(cited.length).toBe(4);
    expect(cited.map(([line, pin]) => ROSTER.producer.lines.some(entry => entry.line === line) && ROSTER.producer.beadPin.startsWith(pin))).toEqual(cited.map(() => true));
    expect(filing.includes(ROSTER.producer.path)).toBe(true);
    // The producer's own sentences: :12's last sentence is quiet only by its "not"; :38 names the families with no subject.
    const split = sentences(ROSTER.producer.lines.find(line => line.line === 12)?.text ?? "").map(sentence => sentence.text);
    const host = split[split.length - 1] ?? "";
    expect(read(host).kind).toBe("marker");
    expect(verdict(host.replace(" not ", " and "))).toBe("acquire");
    const scope = ROSTER.producer.lines.find(line => line.line === 38)?.text ?? "";
    expect(familiesOf(words(scope))).toEqual(["acquire", "schedule", "freshness"]);
    expect(sentences(scope).map(sentence => read(sentence.text).kind)).toEqual(sentences(scope).map(() => "none"));
    expect(ROSTER.producer.rcGate).toBe(rcGateOf(ROSTER.producer));
    // Every family, subject, assembly, marker and anchor word the filing or the producer spells at a fixed place reads in its role.
    const producerLine = (line: number): string => ROSTER.producer.lines.find(entry => entry.line === line)?.text ?? "";
    const places: readonly (readonly [string, RegExp, readonly string[]])[] = [
      [title, /supplies (\w+) or (\w+) inputs to (\w+) (\w+) \(/, ["acquire", "freshness", "subject", "assembly"]],
      [title, /\((\w+) extension 2 acquire\/include\/place; (\w+ \w+); gated/, ["anchor", "marker"]],
      [title, /, (\w+) controls resource (\w+) at the Pi host only and (\w+) (\w+) execution/, ["acquire", "acquire", "marker", "subject"]],
      [title, /Pi decides temporal (\w+), and (\w+) Pi surface expects the (\w+) to (\w+) resources, (\w+) (\w+) or judge (\w+)\.$/, ["freshness", "marker", "subject", "acquire", "schedule", "acquire", "freshness"]],
      [filing, /Acceptance: gating census \S+ (\w+) Pi code or doc expects the (\w+) to (\w+), (\w+) or judge (\w+) (\w+) the (\w+) gates/, ["marker", "subject", "acquire", "schedule", "freshness", "marker", "anchor"]],
      [filing, /Pi consumes (\w+)'s (\w+) (\w+) only/, ["anchor", "assembly", "anchor"]],
      [producerLine(3), /\*\*Status:\*\* (\w+ \w+)\./, ["marker"]],
      [producerLine(12), /Separate `(\w+)` \(does host (\w+) a resource\?\), `include` \(does (\w+) include a block\?\)/, ["acquire", "acquire", "subject"]],
      [producerLine(12), /(\w+) controls (\w+) at the host, (\w+) (\w+) execution\./, ["acquire", "acquire", "marker", "subject"]],
      [producerLine(38), /resource (\w+) (\w+)\. Preserve Python (\w+) outputs/, ["acquire", "schedule", "anchor"]],
      [producerLine(38), /let host decide temporal (\w+)\./, ["freshness"]],
    ];
    expect(places.map(([text, rx]) => (rx.exec(text)?.slice(1) ?? []).map(roleOf))).toEqual(places.map(([, , roles]) => roles));
    // docs/03's ownership table gives context rendering to the renderer, never to an assembler seam of Pi's.
    const tables = sectionTables(readFileSync(join(REPO, CONSTANTS.docs03), "utf8"), OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    expect(tables.grids.flatMap(grid => grid.filter(cells => cells[1] === RENDER_OWNER)).map(cells => cells[0])).toEqual(["Context rendering, necessity and provenance"]);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-INDIRECT", "R-COMPOSED", "R-SPLIT", "R-COMMENT-HIDDEN", "R-COMMENT-BLOCK", "R-SOURCE-AS-WRITTEN", "R-UNANCHORED", "R-RENDERER", "R-SHORT-NAME", "R-LOOKALIKE", "R-MARKER-ANYWHERE", "R-SYNONYM", "R-PARAPHRASE", "R-SEAM-OTHER"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
