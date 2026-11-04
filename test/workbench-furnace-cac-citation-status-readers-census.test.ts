/**
 * wb-t8my readers census, cut #3 (the ENUMERATE-THE-RESOLVABLE cut ruling R-B318 binds, after refusal #2; the rule-19 dependency-
 * inversion child of wb-pnn8: ruling R-B159 filed it, ruling R-B202 folded wb-pnn8's refusal #4 members into it). SUBJECT: the four
 * receipt-anchor readers anchorTables, anchorProse, anchorRules and headerOf, moved from wb-pnn8's FINAL cut #4 (tip ad5195cd) into
 * test/helpers/furnace-cac-citation-status-readers.ts with their code byte for byte (the helper's header names the items it adds and
 * the doc-comment words it narrows), and readAnchor, this file's reader of the outside anchors. wb-pnn8's cut #4 versions of the
 * census, roster and receipt are not on trunk, and no census, roster or receipt file is added or edited here; the parent stays
 * parked until this lands, and its later re-cut can import the helper.
 *
 * wb-dlot (the R694 follow-up from landing 831's F3) adds seventeen READERS pages: one for each of the fifteen one-edit
 * readAnchor forms (B01-B15) that the landing-831 gate read as keeping this census green on forms no page carried, the
 * parenthesized twin of B11's quoted form, and an indented row for R1's words. It names the forms whose pages read as the base
 * page does as residuals with quiet rows (R1, R3 and R4 below), and writes the id-form words as the cases their pages pin;
 * readAnchor, its patterns and the helper are unchanged.
 *
 * wb-ectn (the R694 follow-up from landing 884's F1; its cut #2 is the respin of its refusal #1 under ruling R-B514) adds
 * twenty-seven READERS pages: ten for the ten one-edit readAnchor forms (G15-I01, G15-K02, G15-K03, G15-F03, G15-C01, G15-C02,
 * G15-C03, G15-C04, G15-W03 and G15-W04) that the landing-884 gate read as keeping this census green on forms the field and id-form
 * words below named and no page carried, and seventeen for the seventeen such forms of that refusal's LEG 2 (GP4-K01 to GP4-K04,
 * GP4-C01 to GP4-C07, GP4-I01 to GP4-I03, GP4-W01, GP4-W02 and GP4-F01), each of those pages carrying the form of the real-tree
 * witness that refusal's gate planted for its member. It writes those words as exactly the forms the pages pin, each class with its
 * own NOT CLAIMED sentence for the forms beyond them; readAnchor, its patterns and the helper are unchanged.
 *
 * PINNED READER SET (this file, test/workbench-furnace-cac-citation-status-readers-census.test.ts; observed at the cut: every case
 * passes on the moved readers and on readAnchor, and each named mutant, applied to a copy of the helper, reds the pin case named
 * after it). Each pin case is named "<mutant id>: <quote>" and asserts, for every probe it holds, that the reader beside the probe
 * returns exactly the literal reading written here (toEqual over the reader's whole output); a probe is a synthetic receipt page
 * (or, for headerOf, a synthetic source text), and a probe named GW12-*, GW19-* or WS-W-* carries the form of the fail-open witness
 * of that name.
 * - Row U1, cell-markup (anchorTables): G12-T-CELL-HTML-STRIPPED (probes CELL-ELEMENT and GW12-01: the cells '<b>B1</b>' and '<b>A</b>'
 *   read with their tags), G12-T-CELL-ESCAPES-RESOLVED (CELL-ESCAPE and GW12-02: '\*B1\*' and 'A1\, A2, A3, A4' read with their
 *   backslashes), G12-T-CELL-STRIKE-STRIPPED (CELL-STRUCK and GW12-03: '~~B1~~' and '~~A~~' read with their tildes) and
 *   G12-T-CELL-LINK-TEXT (CELL-LINK and GW12-04: '[B1](https://example.invalid/b)' and '[A](https://example.invalid/a)' read as
 *   written).
 * - Row U2, prose forms: G12-P-NESTED-INDENTED-CODE-OFF (ITEM-INDENTED-CODE by anchorProse and GW12-09 by anchorRules: an item's
 *   nested indented code block read with its item), G12-P-SHORTCUT-REFLINK-HIDDEN (SHORTCUT-REF by anchorProse and GW12-08 by
 *   anchorRules: a shortcut reference link's text shown) and G12-P-NESTED-LIST-OPACITY-ISOLATED (NESTED-LIST-ELEMENT by anchorProse:
 *   an item whose nested item holds an element is dropped whole and the next item is read; GW12-06 by anchorRules: a rule item whose
 *   nested item holds an empty element is no rule).
 * - Row U3, NFKC lead (anchorRules): G12-R-NFKC-LEAD (FULLWIDTH-COLON-LEAD: a lead whose colon is U+FF1A is no lead, and the exact
 *   lead in the next item is; GW12-07: that lead alone, no rule; FULLWIDTH-CLAUSE: a clause in fullwidth letters closing with U+FF0E
 *   is read as written).
 * - Row V1 (anchorProse and anchorRules): GP19-O-OPENING-TAG-IGNORED and GP19-O-OPENING-TAG-IGNORED-ANCHOR, one probe set (OPEN-TAG-BLOCKS:
 *   a one-line paragraph and a list item, each holding a lone opening tag, are dropped and the next blocks read; GW19-01, GW19-02 and
 *   GW19-05: a rule item holding an unclosed '<i>', '<span>' or '<span hidden>' is no rule).
 * - Row V2 (anchorRules): GP19-R-RULES-DEDUPED (GW19-03 and GW19-04: two equal rule blocks - a list repeating its rule item, and a
 *   rule item, a table and an equal rule paragraph - are both read).
 * - Row S, the wb-pnn8 cut #4 seat-measured holes: T-STRONG-STRIPPED (CELL-STRONG and WS-W-STRONG-CELL: '**B1**' and '**A**' read with
 *   their stars), T-UNDERSCORE-EM-STRIPPED (CELL-UNDERSCORE-EM and WS-W-UNDERSCORE-CELL: '_B1_' and '_A_' read with their underscores),
 *   P-COLLAPSED-REFLINK-HIDDEN (COLLAPSED-REF by anchorProse and WS-W-COLLAPSED-REF by anchorRules: a collapsed reference link's text
 *   shown) and H-INDENT-ONE-CHAR (HEADER-TWO-SPACES and HEADER-TWO-TABS by headerOf: a comment prefix indented by two spaces or by two
 *   tabs is removed).
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, the rows'
 *   pins in pin order and the READERS page ids in page order, each held to a literal, so that a one-literal edit of any of them
 *   reds SHAPE.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): readAnchor's reading of wb-t8my's row and wb-pnn8's row, by the keys the literals give (KEYS), equals the reading
 *   the literals give (expectedReading), compared whole by one toEqual. Its fields, each with the expectation it is held to:
 *   (1) clauses - wb-t8my's description lines that open '- U<digit> (', in order, each read by CLAUSE as '- <id> (<severity>)
 *   <label>: <count> <noun> <claim>' (the claim its first word and the quoted or parenthesized span after it; that span ends at its
 *   first closing quote or parenthesis, so a later quoted or parenthesized span on the line is not read into the claim,
 *   AR-QUIET-CLAUSE-SECOND-QUOTE and AR-QUIET-CLAUSE-SECOND-PAREN; an apostrophe inside the quoted claim closes it there, so CLAUSE
 *   does not read the line, pinned in exactly three places - between two lower-case letters, 'a cell's claim',
 *   AR-CLAUSE-QUOTE-INNER, between two upper-case letters, 'an A'B claim', AR-CLAUSE-QUOTE-UPPER-INNER, and after a space before a
 *   digit, 'a '9 claim', AR-CLAUSE-QUOTE-DIGIT-INNER - nor does CLAUSE read a parenthesized claim holding a nested parenthesized
 *   group, pinned for exactly three groups - one lower-case word, '(a (nested) claim)', AR-CLAUSE-PAREN-NESTED, one upper-case
 *   word, '(a (NESTED) claim)', AR-CLAUSE-PAREN-NESTED-UPPER, and two lower-case words, '(a (two words) claim)',
 *   AR-CLAUSE-PAREN-NESTED-PHRASE; an apostrophe in any other place inside a quoted claim and a nested group of any other content
 *   are NOT CLAIMED by this census) or kept as its whole line when CLAUSE does not read it: rows U1-U3, in order, each as its id,
 *   severity, label, the count word of its pin count, the noun and its claim; (2) members - the lines between the R-B202 fold's
 *   opening words 'members folded into wb-t8my' and its 'rule19-invert idem' line in wb-t8my's notes, in order, each read by FOLD
 *   as '<lead><rulings>-<label>-<mutant ids>-0-47-WITNESSES-GW19-<witness numbers>' or kept whole (a blank line between the two
 *   member lines, AR-FOLD-BLANK-LINE, or after the last, AR-FOLD-TRAILING-BLANK-LINE, is a member, kept whole as the empty line,
 *   and so is a line of two spaces between the two member lines, kept whole as its two spaces, AR-FOLD-SPACES-LINE; a blank line
 *   before the first member line, two or more blank lines together, a line of two spaces in any other place and a line of any other
 *   whitespace alone are NOT CLAIMED by this census): rows V1 and V2, in order, each as its lead, rulings, label, the mutant ids
 *   built from its pins and its pins' GW19 probe numbers; (3) refusals - in wb-pnn8's notes, refusal #3's verdict opening (with its
 *   full tip f53aa719) is present and refusal #4's (full tip ad5195cd) comes after it: both true; (4) unmet - for each U row, the
 *   first line after refusal #3's opening that opens with '<id> <severity> CONFIRMED', read for its G12 ids and its GW12 ids (for
 *   each, the distinct tokens of that id form, in the order they first occur) and, for each of the row's pins, the quote of the
 *   pin's first citation, '<id> (<quote>)' to the balancing parenthesis or '<id>, <quote>:' to the next colon (a parenthesized
 *   quote pinned holding no parenthesis, AR-BASE's 'the first quote', and one nested part, AR-BASE's 'a quote (with a nested part)
 *   here'; a period before the comma form's colon is part of the quote, pinned before a space, 'the comma. quote',
 *   AR-CITATION-COMMA-PERIOD, and before an upper-case letter, 'the comma.Quote', AR-CITATION-COMMA-PERIOD-UPPER; an occurrence
 *   after a space is a citation in both forms, AR-BASE, and so is one after an underscore, '_G12-A-ONE (an underscore-glued
 *   quote)', AR-CITATION-UNDERSCORE, and '_G12-B-ONE, an underscore comma quote:', AR-CITATION-UNDERSCORE-COMMA-FORM, or after a
 *   period, '.G12-A-ONE (a period-glued quote)', AR-CITATION-PERIOD, and '.G12-B-ONE, a period comma quote:',
 *   AR-CITATION-PERIOD-COMMA-FORM; an occurrence glued to the character before it is passed over, pinned for exactly the upper-case
 *   letters X, AR-BASE's 'XGP19-C-ONE', and Q, 'QG12-A-ONE', AR-CITATION-UPPER-GLUED, the lower-case letters x, 'xG12-A-ONE',
 *   AR-CITATION-LOWER-GLUED, and y, 'yG12-A-ONE', AR-CITATION-LOWER-GLUED-Y, the digits 5, '5G12-A-ONE', AR-CITATION-GLUED, and 7,
 *   '7G12-A-ONE', AR-CITATION-DIGIT-GLUED, and a hyphen, 'X-G12-A-ONE', AR-CITATION-GLUED; an occurrence followed by neither form
 *   is passed over, pinned for exactly a hyphen, AR-BASE's 'GP19-C-ONE-TWIN', and a comma with no space after it before a
 *   lower-case t, 'G12-B-ONE,the', AR-CITATION-COMMA-UNSPACED, or before an upper-case T, 'G12-B-ONE,The',
 *   AR-CITATION-COMMA-UNSPACED-UPPER; a parenthesized quote holding any other arrangement of parentheses, an occurrence after any
 *   other character or at the text's start, glue on any letter or digit other than X, Q, x, y, 5 and 7, an occurrence followed by
 *   any other text that is neither form - among them a comma before any other character - and a comma-form quote holding any other
 *   punctuation, or a period before any other character, before its colon are NOT CLAIMED by this census): the row's pins as its
 *   G12 ids, its pins' GW12 probe ids as its GW12 ids, and its pins' quotes; (5) verdict - the quote of each V pin's first citation
 *   in refusal #4's verdict (its opening up to WHAT STANDS; a V pin cited only after WHAT STANDS reads an empty quote,
 *   AR-VERDICT-AFTER-WHAT-STANDS), read the same way: each V pin's quote; (6) ids and witnesses - in refusal #4's F5 finding (its
 *   head '- F5 INFO: (<row S's label>, CONFIRMED)' up to the next '- F6 ' head; a head grading the label PLAUSIBLE is no such head,
 *   so nothing is read, AR-F5-HEAD-OTHER-GRADE, nor is a head whose parenthesis runs on past CONFIRMED, pinned for exactly a comma
 *   after CONFIRMED, '(THE CELLS, measured part, CONFIRMED, again)', AR-F5-HEAD-RUN-ON, and a semicolon after it, '(THE CELLS,
 *   measured part, CONFIRMED; again)', AR-F5-HEAD-SEMICOLON-RUN-ON; a head running on past CONFIRMED with any other character is
 *   NOT CLAIMED by this census), the distinct tokens of the row S id form, in the order they first occur, and the witnesses its
 *   clause 'Their witnesses <first> / <next> ... red' names, split at ' / ' only (a list whose slash has no space on either side is
 *   one witness, pinned for exactly a slash before a hyphen, 'WS-W-ONE/-TWO', AR-WITNESS-UNSPACED, and before an upper-case letter,
 *   'WS-W-ONE/TWO', AR-WITNESS-UNSPACED-UPPER; a list with two spaces on each side of its slash is no such clause, so one empty
 *   witness is read, 'WS-W-ONE  /  -TWO', AR-WITNESS-WIDE-SPACED; an unspaced slash before any other character and a list with any
 *   other spacing around a slash are NOT CLAIMED by this census): row S's pins, and its WS-W probes as '<first id> / -<suffix>
 *   ...'.
 *   THE ID FORMS (readAnchor's G12_ID, GW12_ID and S_ID; each word below holds through the READERS pages named beside it, not
 *   beyond them): a G12 id is 'G12-' and words joined by '-', each of upper-case letters or of upper-case letters then one digit,
 *   pinned in exactly these word shapes - a first word of one letter (AR-BASE) or of three ('G12-ABC-EXTRA',
 *   AR-G12-THREE-LETTER-FIRST-WORD), or of one letter then one digit ('G12-A2-EXTRA', AR-G12-DIGIT-WORD), and a later word of three
 *   to eight letters (AR-BASE; an extra id, AR-W1-G12-EXTRA; and the real rows' pins, through ANCHOR), of nine letters, read whole
 *   as the last word ('G12-A-NINELONGS', AR-G12-NINE-LETTER-WORD) and before another word ('G12-A-NINELONGS-EXTRA',
 *   AR-G12-NINE-LETTER-MIDDLE-WORD), or of one letter then one digit ('G12-A-B2', AR-G12-LATER-DIGIT-WORD) or two letters then one
 *   digit ('G12-A-BC2', AR-G12-TWO-LETTER-DIGIT-WORD); a G12 word of any other shape - a first word of two letters or of four or
 *   more, or of two or more letters then one digit, and a later word of one, two, or ten or more letters, or of three or more
 *   letters then one digit - is NOT CLAIMED by this census; a G12 token glued to a letter or a digit before it is not read - an
 *   upper-case letter ('XG12-A-GLUED', AR-QUIET-G12-GLUED), a lower-case letter ('xG12-A-NEW', AR-QUIET-G12-LOWER-GLUED) or a digit
 *   ('5G12-A-NEW', AR-QUIET-G12-DIGIT-GLUED) - and one whose last word runs into a lower-case letter is read to its last word
 *   boundary ('G12-A-ONEx' as 'G12-A', AR-G12-GLUED-AFTER). A GW12 id is 'GW12-' and its digits, pinned at one, two and three
 *   digits (AR-W4-GW12-ONE-DIGIT, AR-BASE, AR-W3-GW12-THREE-DIGITS); a GW12 token glued to a letter or a digit before it is not
 *   read - an upper-case letter ('XGW12-07', AR-QUIET-GW12-GLUED), a lower-case letter ('xGW12-07', AR-QUIET-GW12-LOWER-GLUED) or a
 *   digit ('5GW12-07', AR-QUIET-GW12-DIGIT-GLUED) - nor one whose digits run into a letter, lower-case ('GW12-4b',
 *   AR-QUIET-GW12-LETTER) or upper-case ('GW12-4B', AR-QUIET-GW12-UPPER-LETTER). A row S id is one upper-case letter and one or
 *   more words, each led by '-' and each of upper-case letters (AR-BASE; a single word, AR-W7-S-ID-ONE-WORD; a one-letter word,
 *   'T-A-KEPT', AR-S-ONE-CHAR-WORD) or of upper-case letters then one digit ('T-STAR-RUN2-KEPT', AR-W5-S-ID-DIGIT), with no letter,
 *   digit or hyphen touching it (pinned by a hyphen before it, AR-BASE's 'WS-W-ONE', and by a letter before and after it, a digit
 *   before it, a hyphen after it and a digit run into a letter after it, AR-QUIET-S-GLUED); an underscore before it is no such
 *   touch, and the id after it is read ('_T-STAR-KEPT', AR-S-UNDERSCORE-BEFORE). Any other word shape or place (among them a word
 *   that opens with a digit, holds only digits or holds two or more digits after its letters, a later G12 word of ten or more
 *   letters, and a one-letter word after an id's first word) and any other character at a token's edge (among them an underscore or
 *   a hyphen before or after a G12 or GW12 token, and an underscore after a row S id) are NOT CLAIMED by this census. So, on the
 *   real rows, each U row's UNMET line's tokens of the G12 form are exactly the row's pins and its tokens of the GW12 form exactly
 *   its pins' GW12 probes, and the F5 finding's tokens of the row S form are exactly row S's pins, each in order of first
 *   occurrence.
 * - Cases READERS (87 cases, "<page id>: <what>"; the PAGES table): readAnchor, by PAGE_KEYS, reads each page exactly as the
 *   literal reading written beside it (toEqual over the whole reading). AR-BASE is a synthetic wb-t8my row and wb-pnn8 row written
 *   in the shapes the real rows give the six fields; every other page is AR-BASE with one edit. The pages carry refusal #2's
 *   members' forms: an extra G12 id in an UNMET line (AR-W1-G12-EXTRA, witness W1's form), the fold's two member lines swapped
 *   (AR-W2-FOLD-SWAPPED, witness W2's form), a GW12 id of three digits and of one digit (AR-W3-GW12-THREE-DIGITS and
 *   AR-W4-GW12-ONE-DIGIT, witnesses W3 and W4) and a row S id with a digit in a word and of one word (AR-W5-S-ID-DIGIT and
 *   AR-W7-S-ID-ONE-WORD, witnesses W5 and W7). The others carry: the clauses, G12 ids, GW12 ids, row S ids and witnesses each in
 *   another order; an extra clause, an extra member line and an extra witness, each read, and a clause and a member line their
 *   patterns do not read, each kept whole; a G12 id whose word holds a digit, and a G12 token glued after; an earlier and a later
 *   citation of one pin, citations glued to a preceding hyphen or digit, and repeated GW12 and row S ids; citations before refusal
 *   #3's opening, a later line opening with a U lead and an F5 finding before refusal #4's opening, none of them read; the fold's
 *   opening and each refusal's opening absent, refusal #4's opening also written before refusal #3's, and refusal #3's opening at
 *   the notes' first character; and the residuals' quiet rows (RESIDUALS below). wb-dlot's seventeen pages follow, in the order of
 *   the landing-831 gate's forms B01-B15, then B11's parenthesized twin and R1's indented row (CLAIMS (4) names each): a G12 id
 *   whose later word holds a digit, a row S id after an underscore and one with a one-letter word, a citation after an underscore,
 *   a V pin cited only after WHAT STANDS, a witness list without the spaced separator, a blank line in the fold and an F5 head
 *   graded PLAUSIBLE, each read as written beside it, and nine quiet rows (R1, R3 and R4). wb-ectn's ten pages follow, in the order
 *   of the landing-884 gate's F1 forms (CLAIMS (4) names each): a later G12 word of nine letters, an apostrophe between two letters
 *   of a quoted claim, a nested parenthesized word in a parenthesized claim, a line of two spaces in the fold, a citation after a
 *   period and one glued to a lower-case letter, a comma with no space after it, a period inside a comma-form quote, an F5 head
 *   running on past CONFIRMED and a witness list with two spaces on each side of its slash, each read as written beside it.
 *   wb-ectn's cut #2 seventeen pages close the table, in the order of wb-ectn refusal #1's GP4 members (CLAIMS (4) names each): an
 *   apostrophe between two upper-case letters and one after a space before a digit inside a quoted claim, a nested upper-case word
 *   and a nested group of two lower-case words in a parenthesized claim, citations glued to an upper-case Q, a lower-case y and a
 *   digit 7, comma-form citations after a period and after an underscore, a comma with no space after it before an upper-case
 *   letter, a period before an upper-case letter inside a comma-form quote, G12 ids with a three-letter first word, with a later
 *   word of two letters then one digit and with a nine-letter word before another word, an F5 head running on past CONFIRMED after
 *   a semicolon, a witness list whose unspaced slash comes before an upper-case letter, and a blank line after the fold's last
 *   member line, each read as written beside it.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each named mutant changes a reading of its own pin's probes: the
 * cutting seat applies each mutant's own edit (the gate's and the cut #4 seat's edits, executed over a copy of the helper) and
 * reads the pin case named after it red; a pin whose probes stopped holding its form would read green there. (3) Each field
 * ANCHOR's expectation is built from is held whole: the U rows' ids, severities, labels, claims and count words; the V rows' leads,
 * rulings, labels, pins and GW19 probe ids; the U rows' pins and their GW12 probe ids; the U and V pins' quotes; row S's label,
 * pins and WS-W probe ids. So such a field removed, swapped, relabelled or shortened at either end - in one literal or in every
 * literal together - reds ANCHOR, and a pin or a row removed or swapped in one literal reds SHAPE as well (standing rule 16's
 * CT1-CT6). (4) On each READERS page readAnchor returns exactly the literal reading written beside it: an edit of readAnchor, or of
 * a reader or pattern it calls, that changes its reading of one page reds that page's case. Refusal #2's U1 members are such edits,
 * in their forms on readAnchor: C2-G12-FILTER's (the G12 ids filtered by the key's pins) reds AR-W1-G12-EXTRA, AR-G12-GLUED-AFTER
 * and AR-G12-DIGIT-WORD, and C3-FOLD-SORTED's (the member readings sorted) reds AR-W2-FOLD-SWAPPED. Refusal #2's U2 forms are read
 * as ids: a GW12 id read in cut #2's narrower form (two digits) reds AR-W3-GW12-THREE-DIGITS and AR-W4-GW12-ONE-DIGIT, and a row S
 * id read in cut #2's narrower form (a letter and two or more digit-free words) reds AR-W5-S-ID-DIGIT and AR-W7-S-ID-ONE-WORD. The
 * landing-831 gate's fifteen forms (its family B: one edit each of G12_ID, GW12_ID, S_ID, CLAUSE_LINE, the citation glue test, the
 * verdict end, the witness split, CLAUSE's quoted span, the member lines and the F5 head) are such edits, each red at its own
 * page's case alone except six, each red at wb-ectn's pages of the same form as well (B01 at AR-G12-TWO-LETTER-DIGIT-WORD, B08 at
 * AR-CITATION-UNDERSCORE-COMMA-FORM, B10 at AR-WITNESS-UNSPACED-UPPER, B11 at AR-CLAUSE-QUOTE-INNER, AR-CLAUSE-QUOTE-UPPER-INNER
 * and AR-CLAUSE-QUOTE-DIGIT-INNER, B12 at AR-FOLD-TRAILING-BLANK-LINE, and B13 at AR-F5-HEAD-RUN-ON and
 * AR-F5-HEAD-SEMICOLON-RUN-ON): B01 at AR-G12-LATER-DIGIT-WORD, B02 at AR-QUIET-G12-DIGIT-GLUED, B03 at AR-QUIET-GW12-DIGIT-GLUED,
 * B04 at AR-QUIET-GW12-UPPER-LETTER, B05 at AR-S-UNDERSCORE-BEFORE, B06 at AR-S-ONE-CHAR-WORD, B07 at AR-QUIET-PLUS-ROW, B08 at
 * AR-CITATION-UNDERSCORE, B09 at AR-VERDICT-AFTER-WHAT-STANDS, B10 at AR-WITNESS-UNSPACED, B11 at AR-QUIET-CLAUSE-SECOND-QUOTE, B12
 * at AR-FOLD-BLANK-LINE, B13 at AR-F5-HEAD-OTHER-GRADE, B14 at AR-QUIET-G12-LOWER-GLUED and B15 at AR-QUIET-GW12-LOWER-GLUED;
 * CLAUSE's parenthesized span read to the line's last closing parenthesis (B11's twin) is red at AR-QUIET-CLAUSE-SECOND-PAREN and
 * at wb-ectn's AR-CLAUSE-PAREN-NESTED, AR-CLAUSE-PAREN-NESTED-UPPER and AR-CLAUSE-PAREN-NESTED-PHRASE, and CLAUSE_LINE read after
 * leading spaces is red at AR-QUIET-INDENTED-ROW alone. The landing-884 gate's ten F1 forms (one edit each of G12_ID, CLAUSE's
 * quoted span and its parenthesized span, the member lines, the citation glue test (two), the citation's comma form, the comma
 * quote's end, the F5 head and the witness clause) are such edits, each red at its own page's case and, for eight of them, at
 * wb-ectn cut #2's pages of the same form: G15-I01 at AR-G12-NINE-LETTER-WORD and AR-G12-NINE-LETTER-MIDDLE-WORD, G15-K02 at
 * AR-CLAUSE-QUOTE-INNER, AR-CLAUSE-QUOTE-UPPER-INNER and AR-CLAUSE-QUOTE-DIGIT-INNER, G15-K03 at AR-CLAUSE-PAREN-NESTED,
 * AR-CLAUSE-PAREN-NESTED-UPPER and AR-CLAUSE-PAREN-NESTED-PHRASE, G15-F03 at AR-FOLD-SPACES-LINE alone, G15-C01 at
 * AR-CITATION-PERIOD and AR-CITATION-PERIOD-COMMA-FORM, G15-C02 at AR-CITATION-LOWER-GLUED and AR-CITATION-LOWER-GLUED-Y, G15-C03
 * at AR-CITATION-COMMA-UNSPACED and AR-CITATION-COMMA-UNSPACED-UPPER, G15-C04 at AR-CITATION-COMMA-PERIOD and
 * AR-CITATION-COMMA-PERIOD-UPPER, G15-W03 at AR-F5-HEAD-RUN-ON and AR-F5-HEAD-SEMICOLON-RUN-ON, and G15-W04 at
 * AR-WITNESS-WIDE-SPACED alone. wb-ectn refusal #1's seventeen claimed LEG 2 forms (gate-prep-4's GP4 members: one edit each of
 * CLAUSE's quoted span (two) and its parenthesized span (two), the citation glue test (five), the citation's comma form, the comma
 * quote's end, G12_ID (three), the F5 head, the witness split and the member lines) are such edits, each red at its own wb-ectn cut
 * #2 page's case alone: GP4-K01 at AR-CLAUSE-QUOTE-UPPER-INNER, GP4-K02 at AR-CLAUSE-QUOTE-DIGIT-INNER, GP4-K03 at
 * AR-CLAUSE-PAREN-NESTED-UPPER, GP4-K04 at AR-CLAUSE-PAREN-NESTED-PHRASE, GP4-C01 at AR-CITATION-UPPER-GLUED, GP4-C02 at
 * AR-CITATION-LOWER-GLUED-Y, GP4-C03 at AR-CITATION-DIGIT-GLUED, GP4-C04 at AR-CITATION-PERIOD-COMMA-FORM, GP4-C05 at
 * AR-CITATION-UNDERSCORE-COMMA-FORM, GP4-C06 at AR-CITATION-COMMA-UNSPACED-UPPER, GP4-C07 at AR-CITATION-COMMA-PERIOD-UPPER,
 * GP4-I01 at AR-G12-THREE-LETTER-FIRST-WORD, GP4-I02 at AR-G12-TWO-LETTER-DIGIT-WORD, GP4-I03 at AR-G12-NINE-LETTER-MIDDLE-WORD,
 * GP4-W01 at AR-F5-HEAD-SEMICOLON-RUN-ON, GP4-W02 at AR-WITNESS-UNSPACED-UPPER and GP4-F01 at AR-FOLD-TRAILING-BLANK-LINE; that
 * gate's two NOT CLAIMED controls (a fold line of three spaces dropped, GP4-N01, and citation glue on '!', GP4-N02) stay green, as
 * the field (2) and (4) NOT CLAIMED sentences say.
 *
 * RESIDUALS (named families within readAnchor's reading, each with pinned quiet rows among the READERS pages; a quiet row's reading
 * is AR-BASE's, so it reds when its page starts to reach the reading):
 * - R1 CLAUSE-LOCATOR: a description row whose opening is not '- U<digit> (' - a row id of two digits ('- U10 ('), a '*' bullet
 *   ('* U3 ('), a '+' bullet ('+ U3 (', landing 831's B07) or the words '- U3 (' after the line's opening (after other words or
 *   after one space) - is not read as a clause, so such an extra row leaves the clauses as they are (refusal #2's F5 forms
 *   FP10/B22 and FP11). Quiet rows AR-QUIET-U10-ROW, AR-QUIET-STAR-ROW, AR-QUIET-MIDLINE-ROW, AR-QUIET-PLUS-ROW and
 *   AR-QUIET-INDENTED-ROW.
 * - R2 UNKEYED-UNMET: an UNMET line after refusal #3's opening whose lead no U row of the literals names (a 'U3 LOW CONFIRMED' line
 *   beside two keyed rows) is not read. Quiet row AR-QUIET-UNKEYED-UNMET.
 * - R3 ID-FORM: a token outside the id forms above is not read as an id: a G12 id in lower case ('g12-a-low') or glued to a
 *   preceding upper-case letter, lower-case letter or digit ('XG12-A-GLUED'; 'xG12-A-NEW' and '5G12-A-NEW', landing 831's B14
 *   and B02); a GW12 id whose digits run into a lower-case or an upper-case letter ('GW12-4b'; 'GW12-4B', B04) or glued to a
 *   preceding upper-case letter, lower-case letter or digit ('XGW12-07'; 'xGW12-07' and '5GW12-07', B15 and B03); a
 *   row-S-shaped id with a two-letter prefix (refusal #2's W6 form 'WS-STAR-KEPT', the WS-W witness ids' shape),
 *   with lower-case words or a lower-case letter ('T-star-kept', 't-STAR-KEPT'), or glued to a letter before or after it, to a
 *   digit before it or to a hyphen after it, or running into a letter after a digit ('xT-STAR-KEPT', 'T-STAR-KEPTx',
 *   '5T-STAR-KEPT', 'T-STAR-KEPT-', 'T-STAR-KEPT5x'). Quiet rows AR-QUIET-G12-LOWER, AR-QUIET-G12-GLUED, AR-QUIET-G12-LOWER-GLUED,
 *   AR-QUIET-G12-DIGIT-GLUED, AR-QUIET-GW12-LETTER, AR-QUIET-GW12-UPPER-LETTER, AR-QUIET-GW12-GLUED, AR-QUIET-GW12-LOWER-GLUED,
 *   AR-QUIET-GW12-DIGIT-GLUED, AR-QUIET-S-TWO-LETTER, AR-QUIET-S-LOWER and AR-QUIET-S-GLUED.
 * - R4 CLAIM-SPAN: a description clause's claim span ends at its first closing quote or parenthesis, so a second quoted span
 *   later on the line ("(:1) and 'more' survive.", landing 831's B11) or a second parenthesized one ("(a prose claim) (a later
 *   part)") is not read into the claim. Quiet rows AR-QUIET-CLAUSE-SECOND-QUOTE and AR-QUIET-CLAUSE-SECOND-PAREN.
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them the other cell
 * markup (an image, an autolink, a character reference, an escaped pipe), an element in a block of more than one line or with an
 * upper-case tag name, a near lead or an NFKC-folding character other than the ones probed, and every reading the parent census's
 * header lists beyond these probes. The parent census's own in-case controls and header are NOT CLAIMED by this census. A probe's
 * text edited - alone or together with its literal reading - in a way that keeps this census passing is NOT CLAIMED by this census
 * (the mutant replay is what shows that each probe still holds its form). Row S's pin quotes are this file's descriptions of the
 * seat's mutants and no outside anchor holds them: an edit of one is NOT CLAIMED by this census. The row ids V1, V2 and S are this
 * file's own names and no field ANCHOR reads holds them: one relabelled in every literal together is NOT CLAIMED by this census
 * (SHAPE reds a one-literal relabel). The control probes (every probe whose id opens neither GW12-, GW19- nor WS-W-) are this
 * file's own names and no field ANCHOR reads holds them: one removed or relabelled in every literal together is NOT CLAIMED by this
 * census (SHAPE reds a one-literal edit). The READERS pages - their ids, what texts and edits, PAGE_KEYS and the base rows - are
 * this file's own names and text and no field ANCHOR reads holds them: a page removed or relabelled in every literal together is
 * NOT CLAIMED by this census (SHAPE reds a one-literal edit). readAnchor's reading of any text that is neither the two real rows
 * nor a READERS page is NOT CLAIMED by this census: the field and id-form words above say what readAnchor reads, and each holds
 * through ANCHOR on the real rows and through the READERS pages named for it, not beyond them (a GW12 id of four or more digits and
 * every token form no page carries among them). The text of a description clause after its claim (R4 pins only that a later quoted
 * or parenthesized span is not read into the claim), and the text of an UNMET line, of refusal #4's verdict and of its F5 finding
 * beyond the ids, quotes and witness clause read above, are NOT CLAIMED by this census. Each block is found by a fixed locator (the
 * description clauses' opening '- U<digit> (', the fold's opening and idem lines, the two verdict openings with their full tips,
 * each UNMET line's opening '<id> <severity> CONFIRMED', refusal #4's WHAT STANDS end, the F5 head and the next bullet head): a
 * locator edited so that it still finds the same block reads the same fields and is NOT CLAIMED by this census (on
 * AR-VERDICT-AFTER-WHAT-STANDS a verdict read past WHAT STANDS, on AR-F5-HEAD-OTHER-GRADE an F5 head found by its label alone, on
 * AR-F5-HEAD-RUN-ON one found by its label alone or without its closing parenthesis, and on AR-F5-HEAD-SEMICOLON-RUN-ON one found
 * by its label alone, without its closing parenthesis or also with a semicolon after CONFIRMED, finds another block). The citation
 * judges' use of shownText (their carrier view) is NOT CLAIMED by this census.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { anchorProse, anchorRules, anchorTables, headerOf } from "./helpers/furnace-cac-citation-status-readers.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The opening of wb-pnn8's refusal #3 verdict line and of its refusal #4 verdict line (bead notes, append-only). */
const REFUSAL_3 = "refusal #3 on cut #3 (tip f53aa719b97e00479f4b19327aa787a9be3d56a9";
const REFUSAL_4 = "refusal #4 on the FINAL cut #4 (tip ad5195cdd19c0069dccec6d02dc09f1716613490";
/** The count words wb-t8my's description writes for the U rows' pin counts (one, three and four), each read by one U row. */
const COUNT: Readonly<Record<number, string>> = { 1: "one", 3: "three", 4: "four" };

type ReaderId = "anchorTables" | "anchorProse" | "anchorRules" | "headerOf";
const READERS: Readonly<Record<ReaderId, (text: string) => unknown>> = { anchorTables, anchorProse, anchorRules, headerOf };

interface Probe {
  readonly id: string;
  readonly reader: ReaderId;
  readonly text: string;
  readonly reading: unknown;
}
interface Pin {
  readonly id: string;
  readonly quote: string;
  readonly probes: readonly Probe[];
}
/** A row wb-t8my's description enumerates: '- <id> (<severity>) <label>: <count> mutant(s) <claim> ...'. */
interface DescribedRow {
  readonly id: string;
  readonly severity: string;
  readonly label: string;
  readonly claim: string;
  readonly pins: readonly string[];
}
/** A row the R-B202 fold appended to wb-t8my's notes: the line '<lead><rulings>-<label>-<mutant ids>-0-47-WITNESSES-GW19-<witness numbers>'. */
interface FoldedRow {
  readonly id: string;
  readonly lead: string;
  readonly rulings: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The row of wb-pnn8's refusal #4 finding '- F5 INFO: (<label>, CONFIRMED)'. */
interface FindingRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** A bead's description and notes, as its row in the tracked tracker export holds them. */
interface ExportRow {
  readonly description: string;
  readonly notes: string;
}
/** The keys readAnchor reads wb-pnn8's notes by: each U row's UNMET-line lead and pins, the V pins (refusal #4's verdict) and row S's label (the F5 head). */
interface AnchorKeys {
  readonly unmet: readonly { readonly lead: string; readonly pins: readonly string[] }[];
  readonly verdict: readonly string[];
  readonly finding: string;
}
/** One UNMET line as readAnchor reads it: its G12 ids and its GW12 ids (for each, the distinct tokens of that id form, in the order they first occur) and, for each key pin in key order, the quote of the pin's first citation. */
interface UnmetReading {
  readonly g12: readonly string[];
  readonly gw12: readonly string[];
  readonly quotes: readonly string[];
}
/** readAnchor's whole reading of a child row and a parent row: the clauses, the fold members, the two refusals' presence and order, each keyed UNMET line, the V quotes, and the F5 finding's row S ids and witnesses. */
interface AnchorReading {
  readonly clauses: readonly (readonly string[])[];
  readonly members: readonly (readonly string[])[];
  readonly refusals: readonly boolean[];
  readonly unmet: readonly UnmetReading[];
  readonly verdict: readonly string[];
  readonly ids: readonly string[];
  readonly witnesses: readonly string[];
}

/** A synthetic receipt whose last entry holds the block (the readers read a receipt's last entry only). */
const entry = (block: string): string => `# wb-x: a receipt\n\n## 2026-10-28 second\n\n${block}\n`;
/** A pins table ('Pin | Quote sha-256') of one row whose pin cell is written as given. */
const pinsTable = (cell: string): string => entry(`| Pin | Quote sha-256 |\n| --- | --- |\n| ${cell} | 0 |`);
/** A rows table ('Row | Pins | Label sha-256') of one row whose row and pins cells are written as given. */
const rowsTable = (row: string, pins: string): string => entry(`| Row | Pins | Label sha-256 |\n| --- | --- | --- |\n| ${row} | ${pins} | 0 |`);
const FULLWIDTH_COLON = String.fromCodePoint(0xff1a);
const FULLWIDTH_STOP = String.fromCodePoint(0xff0e);
const FULLWIDTH_FULL = String.fromCodePoint(0xff46, 0xff55, 0xff4c, 0xff4c);

const OPEN_TAG: readonly Probe[] = [
  { id: "OPEN-TAG-BLOCKS", reader: "anchorProse", text: entry("an <i>open paragraph\n\na later paragraph\n\n- an <b>open item\n- a later item"), reading: ["a later paragraph", "a later item"] },
  { id: "GW19-01", reader: "anchorRules", text: entry("- Witness rule: <i>one"), reading: [] },
  { id: "GW19-02", reader: "anchorRules", text: entry("- Witness rule: one<span> (two)"), reading: [] },
  { id: "GW19-05", reader: "anchorRules", text: entry("- Witness rule: <span hidden>one"), reading: [] },
];

const PINS: readonly Pin[] = [
  {
    id: "G12-T-CELL-HTML-STRIPPED",
    quote: "HTML tags removed from cell.text",
    probes: [
      { id: "CELL-ELEMENT", reader: "anchorTables", text: pinsTable("<b>B1</b>"), reading: [[["Pin", "Quote sha-256"], ["<b>B1</b>", "0"]]] },
      { id: "GW12-01", reader: "anchorTables", text: rowsTable("<b>A</b>", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["<b>A</b>", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-ESCAPES-RESOLVED",
    quote: "backslash escapes of ASCII punctuation resolved",
    probes: [
      { id: "CELL-ESCAPE", reader: "anchorTables", text: pinsTable("\\*B1\\*"), reading: [[["Pin", "Quote sha-256"], ["\\*B1\\*", "0"]]] },
      { id: "GW12-02", reader: "anchorTables", text: rowsTable("A", "A1\\, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["A", "A1\\, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-STRIKE-STRIPPED",
    quote: "'~~' removed",
    probes: [
      { id: "CELL-STRUCK", reader: "anchorTables", text: pinsTable("~~B1~~"), reading: [[["Pin", "Quote sha-256"], ["~~B1~~", "0"]]] },
      { id: "GW12-03", reader: "anchorTables", text: rowsTable("~~A~~", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["~~A~~", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-LINK-TEXT",
    quote: "an inline link read as its text",
    probes: [
      { id: "CELL-LINK", reader: "anchorTables", text: pinsTable("[B1](https://example.invalid/b)"), reading: [[["Pin", "Quote sha-256"], ["[B1](https://example.invalid/b)", "0"]]] },
      { id: "GW12-04", reader: "anchorTables", text: rowsTable("[A](https://example.invalid/a)", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["[A](https://example.invalid/a)", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-P-NESTED-INDENTED-CODE-OFF",
    quote: "an item's nested indented code block dropped",
    probes: [
      { id: "ITEM-INDENTED-CODE", reader: "anchorProse", text: entry("- an item\n\n      its indented code"), reading: ["an item its indented code"] },
      { id: "GW12-09", reader: "anchorRules", text: entry("- Witness rule: one.\n\n      except two"), reading: ["one. except two"] },
    ],
  },
  {
    id: "G12-P-SHORTCUT-REFLINK-HIDDEN",
    quote: "a shortcut reference link's text hidden; CommonMark's third reference-link kind",
    probes: [
      { id: "SHORTCUT-REF", reader: "anchorProse", text: entry("a [shortcut] link\n\n[shortcut]: https://example.invalid/s"), reading: ["a shortcut link"] },
      { id: "GW12-08", reader: "anchorRules", text: entry("- Witness rule: one[ except two].\n\n[ except two]: https://example.invalid/x"), reading: ["one except two"] },
    ],
  },
  {
    id: "G12-P-NESTED-LIST-OPACITY-ISOLATED",
    quote: "shownText's list branch passes a fresh view, so an element in an item's nested list leaves the item unopaque; the shared carrier view does not pin it either",
    probes: [
      { id: "NESTED-LIST-ELEMENT", reader: "anchorProse", text: entry("- an item\n  - a <i>nested</i> item\n- a later item"), reading: ["a later item"] },
      { id: "GW12-06", reader: "anchorRules", text: entry("- Witness rule: one\n  - <b></b>"), reading: [] },
    ],
  },
  {
    id: "G12-R-NFKC-LEAD",
    quote: "prose blocks NFKC-normalized before the lead check",
    probes: [
      { id: "FULLWIDTH-COLON-LEAD", reader: "anchorRules", text: entry(`- Witness rule${FULLWIDTH_COLON} one\n- Witness rule: two`), reading: ["two"] },
      { id: "GW12-07", reader: "anchorRules", text: entry(`- Witness rule${FULLWIDTH_COLON} one`), reading: [] },
      { id: "FULLWIDTH-CLAUSE", reader: "anchorRules", text: entry(`- Witness rule: a ${FULLWIDTH_FULL} clause${FULLWIDTH_STOP}`), reading: [`a ${FULLWIDTH_FULL} clause${FULLWIDTH_STOP}`] },
    ],
  },
  { id: "GP19-O-OPENING-TAG-IGNORED", quote: "shownText's opacity test reads closing tags only", probes: OPEN_TAG },
  { id: "GP19-O-OPENING-TAG-IGNORED-ANCHOR", quote: "applied by anchorProse only", probes: OPEN_TAG },
  {
    id: "GP19-R-RULES-DEDUPED",
    quote: "anchorRules' result wrapped in [...new Set(...)]",
    probes: [
      { id: "GW19-03", reader: "anchorRules", text: entry("- Witness rule: one\n- Witness rule: one"), reading: ["one", "one"] },
      { id: "GW19-04", reader: "anchorRules", text: entry("- Witness rule: one.\n\n| Pin | Quote sha-256 |\n| --- | --- |\n| A1 | 0 |\n\nWitness rule: one."), reading: ["one", "one"] },
    ],
  },
  {
    id: "T-STRONG-STRIPPED",
    quote: "a cell's double-star strong text read as its text",
    probes: [
      { id: "CELL-STRONG", reader: "anchorTables", text: pinsTable("**B1**"), reading: [[["Pin", "Quote sha-256"], ["**B1**", "0"]]] },
      { id: "WS-W-STRONG-CELL", reader: "anchorTables", text: rowsTable("**A**", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["**A**", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "T-UNDERSCORE-EM-STRIPPED",
    quote: "a cell's underscore emphasis read as its text",
    probes: [
      { id: "CELL-UNDERSCORE-EM", reader: "anchorTables", text: pinsTable("_B1_"), reading: [[["Pin", "Quote sha-256"], ["_B1_", "0"]]] },
      { id: "WS-W-UNDERSCORE-CELL", reader: "anchorTables", text: rowsTable("_A_", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["_A_", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "P-COLLAPSED-REFLINK-HIDDEN",
    quote: "a collapsed reference link's text hidden",
    probes: [
      { id: "COLLAPSED-REF", reader: "anchorProse", text: entry("a [collapsed][] link\n\n[collapsed]: https://example.invalid/c"), reading: ["a collapsed link"] },
      { id: "WS-W-COLLAPSED-REF", reader: "anchorRules", text: entry("- Witness rule: one[ except two][].\n\n[ except two]: https://example.invalid/x"), reading: ["one except two"] },
    ],
  },
  {
    id: "H-INDENT-ONE-CHAR",
    quote: "headerOf's prefix regex [ \\t]* -> [ \\t]?",
    probes: [
      { id: "HEADER-TWO-SPACES", reader: "headerOf", text: "/**\n  * a two-space indent\n */\n", reading: "a two-space indent" },
      { id: "HEADER-TWO-TABS", reader: "headerOf", text: "/**\n\t\t* a two-tab indent\n */\n", reading: "a two-tab indent" },
    ],
  },
];

const DESCRIBED: readonly DescribedRow[] = [
  { id: "U1", severity: "MEDIUM", label: "cell-markup", claim: "against 'cell texts as written, their markup kept'", pins: ["G12-T-CELL-HTML-STRIPPED", "G12-T-CELL-ESCAPES-RESOLVED", "G12-T-CELL-STRIKE-STRIPPED", "G12-T-CELL-LINK-TEXT"] },
  { id: "U2", severity: "LOW", label: "prose forms", claim: "survive (a nested indented code block, a shortcut reference link, nested-list opacity)", pins: ["G12-P-NESTED-INDENTED-CODE-OFF", "G12-P-SHORTCUT-REFLINK-HIDDEN", "G12-P-NESTED-LIST-OPACITY-ISOLATED"] },
  { id: "U3", severity: "LOW", label: "NFKC lead", claim: "against 'opens with ANCHOR.rule exactly'", pins: ["G12-R-NFKC-LEAD"] },
];
const FOLDED: readonly FoldedRow[] = [
  { id: "V1", lead: "U1-MEDIUM-CONFIRMED-", rulings: "R514-R515-R668-R-B159", label: "PROSE-OPACITY-OPENING-TAG-READING-NO-FALSIFIER", pins: ["GP19-O-OPENING-TAG-IGNORED", "GP19-O-OPENING-TAG-IGNORED-ANCHOR"] },
  { id: "V2", lead: "U2-LOW-CONFIRMED-", rulings: "R515", label: "WITNESS-RULE-EQUAL-SECOND-RULE-BLOCK-NO-FALSIFIER", pins: ["GP19-R-RULES-DEDUPED"] },
];
const FINDING: FindingRow = { id: "S", label: "THE HOLES, seat-measured part", pins: ["T-STRONG-STRIPPED", "T-UNDERSCORE-EM-STRIPPED", "P-COLLAPSED-REFLINK-HIDDEN", "H-INDENT-ONE-CHAR"] };
const ROWS: readonly { readonly id: string; readonly pins: readonly string[] }[] = [...DESCRIBED, ...FOLDED, FINDING];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): ExportRow {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The first line of text after offset from that opens with lead (empty when none does). */
function lineAfter(text: string, from: number, lead: string): string {
  const start = text.indexOf(`\n${lead}`, from);
  if (from < 0 || start < 0) return "";
  const end = text.indexOf("\n", start + 1);
  return text.slice(start + 1, end < 0 ? text.length : end);
}
/** The text from the first occurrence of open after offset from up to the next occurrence of close (empty when either is absent). */
function between(text: string, from: number, open: string, close: string): string {
  const start = from < 0 ? -1 : text.indexOf(open, from);
  const end = start < 0 ? -1 : text.indexOf(close, start + open.length);
  return end < 0 ? "" : text.slice(start, end);
}
const unique = (values: readonly string[]): string[] => values.filter((value, at) => values.indexOf(value) === at);
/** The ids of the probes of these pins, in pin and probe order, each once, that match pattern. */
function probeIds(pins: readonly string[], pattern: RegExp): string[] {
  return unique(pins.flatMap(id => pinOf(id).probes.map(probe => probe.id)).filter(id => pattern.test(id)));
}
/** A description clause at its fixed delimiters: '- <id> (<severity>) <label>: <count> <noun> <claim>', then a space or the line's end, the claim being one word and the quoted or parenthesized span after it, through its closing quote or parenthesis. */
const CLAUSE = /^- (U\d) \(([A-Z]+)\) ([^:]+): ([a-z]+) (mutants?) ([a-z]+ (?:'[^']*'|\([^()]*\)))(?: |$)/;
/** The fields of a description clause (the whole line when it does not read as CLAUSE). */
function clauseFields(line: string): readonly string[] {
  const match = CLAUSE.exec(line);
  return match === null ? [line] : match.slice(1);
}
/** An R-B202 fold line at its fixed delimiters: the lead '<U id>-<severity>-<grade>-', the rulings (ruling ids R<n> or R-B<n> joined by '-'), the label (hyphenated upper-case words before '-GP19-'), the mutant ids, then '-0-47-WITNESSES-GW19-' and the witness numbers. */
const FOLD = /^(U\d-[A-Z]+-[A-Z]+-)(R(?:-B)?\d+(?:-R(?:-B)?\d+)*)-([A-Z]+(?:-[A-Z]+)*?)-(GP19-[A-Z0-9]+(?:-[A-Z0-9]+)*?)-0-47-WITNESSES-GW19-(\d\d(?:-\d\d)*)$/;
/** The fields of a fold line (the whole line when it does not read as FOLD). */
function foldFields(line: string): readonly string[] {
  const match = FOLD.exec(line);
  return match === null ? [line] : match.slice(1);
}
/** The fields a folded row's line must give: its lead, rulings and label, its mutant ids (the first pin, then 'AND-' and each later pin's suffix) and its pins' GW19 probe numbers. */
function foldedFields(row: FoldedRow): readonly string[] {
  const first = row.pins[0] ?? "";
  const mutants = [first, ...row.pins.slice(1).map(id => `AND-${id.slice(first.length + 1)}`)].join("-");
  const witnesses = probeIds(row.pins, /^GW19-\d\d$/).map(id => id.slice("GW19-".length));
  return [row.lead, row.rulings, row.label, mutants, witnesses.join("-")];
}
/** The quote text gives at its first citation of id: '<id> (<quote>)' up to the balancing parenthesis, or '<id>, <quote>:' up to the next colon; an occurrence inside a longer id, or followed by neither form, is passed over (empty when none cites id). */
function citation(text: string, id: string): string {
  for (let at = text.indexOf(id); at >= 0; at = text.indexOf(id, at + 1)) {
    if (/[A-Za-z0-9-]/.test(text.charAt(at - 1))) continue;
    const after = text.slice(at + id.length);
    if (after.startsWith(", ")) {
      const end = after.indexOf(":");
      if (end >= 0) return after.slice(2, end);
    }
    if (after.startsWith(" (")) {
      let depth = 0;
      for (let index = 1; index < after.length; index += 1) {
        if (after[index] === "(") depth += 1;
        if (after[index] === ")") depth -= 1;
        if (depth === 0) return after.slice(2, index);
      }
    }
  }
  return "";
}

/** The description lines read as clauses: those opening with '- U<digit> ('. */
const CLAUSE_LINE = /^- U\d \(/;
/** The R-B202 fold block in wb-t8my's notes: from its opening words to its idem line; its member lines are the lines between. */
const FOLD_OPEN = "members folded into wb-t8my\n";
const FOLD_IDEM = "\nrule19-invert idem";
/** A G12 id as readAnchor reads it: 'G12-', then words of upper-case letters and digits joined by '-', at word boundaries (a global pattern; each match is one token). */
const G12_ID = /\bG12-[A-Z0-9]+(?:-[A-Z0-9]+)*\b/g;
/** A GW12 id as readAnchor reads it: 'GW12-' and one or more digits, at word boundaries. */
const GW12_ID = /\bGW12-\d+\b/g;
/** A row S id as readAnchor reads it: one upper-case letter, then one or more words of upper-case letters and digits each led by '-', with no letter, digit or hyphen touching it on either side. */
const S_ID = /(?<![A-Za-z0-9-])[A-Z](?:-[A-Z0-9]+)+(?![A-Za-z0-9-])/g;
/** The F5 witness clause: 'Their witnesses <first> / <next> ... red'. */
const WITNESSES = /Their witnesses (\S+(?: \/ \S+)*) red/;
/** The distinct tokens of form in text, in the order they first occur. */
const idsIn = (text: string, form: RegExp): string[] => unique(text.match(form) ?? []);
/** What readAnchor reads from wb-t8my's row (child) and wb-pnn8's row (parent), by these keys; every list keeps the order its text gives. */
function readAnchor(child: ExportRow, parent: ExportRow, keys: AnchorKeys): AnchorReading {
  const r3 = parent.notes.indexOf(REFUSAL_3);
  const r4 = parent.notes.indexOf(REFUSAL_4);
  const verdict = between(parent.notes, r4, REFUSAL_4, "\nWHAT STANDS");
  const finding = between(parent.notes, r4, `\n- F5 INFO: (${keys.finding}, CONFIRMED)`, "\n- F6 ");
  return {
    clauses: child.description.split("\n").filter(line => CLAUSE_LINE.test(line)).map(clauseFields),
    members: between(child.notes, 0, FOLD_OPEN, FOLD_IDEM).split("\n").slice(1).map(foldFields),
    refusals: [r3 >= 0, r4 > r3],
    unmet: keys.unmet.map(key => {
      const line = lineAfter(parent.notes, r3, key.lead);
      return { g12: idsIn(line, G12_ID), gw12: idsIn(line, GW12_ID), quotes: key.pins.map(id => citation(line, id)) };
    }),
    verdict: keys.verdict.map(id => citation(verdict, id)),
    ids: idsIn(finding, S_ID),
    witnesses: (WITNESSES.exec(finding)?.[1] ?? "").split(" / "),
  };
}
/** The keys the literals give ANCHOR: each U row's UNMET lead '<id> <severity> CONFIRMED' and pins, the V rows' pins, and row S's label. */
const KEYS: AnchorKeys = {
  unmet: DESCRIBED.map(row => ({ lead: `${row.id} ${row.severity} CONFIRMED`, pins: row.pins })),
  verdict: FOLDED.flatMap(row => row.pins),
  finding: FINDING.label,
};
/** The reading the literals give for the real rows (ANCHOR's expectation): the U rows' clause fields with the count word of their pin counts, the V rows' fold fields, both refusals in order, each U row's pins as its G12 ids with its pins' GW12 probes and quotes, the V pins' quotes, and row S's pins with its WS-W probes. */
function expectedReading(): AnchorReading {
  return {
    clauses: DESCRIBED.map(row => [row.id, row.severity, row.label, COUNT[row.pins.length], row.pins.length === 1 ? "mutant" : "mutants", row.claim]),
    members: FOLDED.map(foldedFields),
    refusals: [true, true],
    unmet: DESCRIBED.map(row => ({ g12: [...row.pins], gw12: probeIds(row.pins, /^GW12-\d+$/), quotes: row.pins.map(id => pinOf(id).quote) })),
    verdict: FOLDED.flatMap(row => row.pins).map(id => pinOf(id).quote),
    ids: [...FINDING.pins],
    witnesses: probeIds(FINDING.pins, /^WS-W-/).map((id, at) => (at === 0 ? id : `-${id.slice("WS-W-".length)}`)),
  };
}

/** The keys READERS reads its pages by: U1 with two pins, U2 with one, two V pins, and a finding label. */
const PAGE_KEYS: AnchorKeys = {
  unmet: [
    { lead: "U1 MEDIUM CONFIRMED", pins: ["G12-A-ONE", "G12-A-TWO"] },
    { lead: "U2 LOW CONFIRMED", pins: ["G12-B-ONE"] },
  ],
  verdict: ["GP19-C-ONE", "GP19-C-ONE-TWIN"],
  finding: "THE CELLS, measured part",
};
/** The base page's child row: two description clauses and an R-B202-shaped fold of two member lines. */
const BASE_CHILD: ExportRow = {
  description: ["A synthetic child. Enumerated items:", "- U1 (MEDIUM) cells: two mutants against 'a cell claim' (:1) survive.", "- U2 (LOW) prose: one mutant survives (a prose claim)"].join("\n"),
  notes: [
    "RULE19 DEPENDENCY INVERSION R-B1 (ruling M:1, refusal O:1): members folded into wb-t8my",
    "U1-MEDIUM-CONFIRMED-R514-R-B159-ALPHA-LABEL-GP19-C-ONE-AND-TWIN-0-47-WITNESSES-GW19-01-02",
    "U2-LOW-CONFIRMED-R515-BETA-GP19-D-ONE-0-47-WITNESSES-GW19-03",
    "rule19-invert idem rule19-inversion-M1",
    "",
    "A later note.",
  ].join("\n"),
};
/** The base page's parent row: refusal #3's verdict with two UNMET lines, then refusal #4's verdict and its F5 finding. */
const BASE_PARENT: ExportRow = {
  description: "A synthetic parent.",
  notes: [
    "An earlier note.",
    `GATE VERDICT: REFUSED, ${REFUSAL_3} on a base).`,
    "UNMET:",
    "U1 MEDIUM CONFIRMED (a claim). WHAT FAILS: G12-A-ONE (the first quote), G12-A-TWO (a quote (with a nested part) here). Witnesses GW12-01 'a', GW12-02 'b'.",
    "U2 LOW CONFIRMED (a claim). WHAT FAILS: G12-B-ONE, the comma quote: it survives. Witness: GW12-03 'c'.",
    `GATE VERDICT: REFUSED, ${REFUSAL_4} on a base).`,
    "What fails: XGP19-C-ONE (a glued quote) and GP19-C-ONE-TWIN, the twin quote: are named first, then GP19-C-ONE (the V quote).",
    "WHAT STANDS: nothing.",
    "FINDINGS:",
    "- F5 INFO: (THE CELLS, measured part, CONFIRMED) a tool replayed.",
    "  - T-ONE-ID and P-TWO-ID each read 0|47. Their witnesses WS-W-ONE / -TWO red the census.",
    "- F6 LOW: a later finding.",
  ].join("\n"),
};
/** readAnchor's reading of the base page by PAGE_KEYS, written as a literal; a quiet row's reading is this one. */
const BASE_READING: AnchorReading = {
  clauses: [
    ["U1", "MEDIUM", "cells", "two", "mutants", "against 'a cell claim'"],
    ["U2", "LOW", "prose", "one", "mutant", "survives (a prose claim)"],
  ],
  members: [
    ["U1-MEDIUM-CONFIRMED-", "R514-R-B159", "ALPHA-LABEL", "GP19-C-ONE-AND-TWIN", "01-02"],
    ["U2-LOW-CONFIRMED-", "R515", "BETA", "GP19-D-ONE", "03"],
  ],
  refusals: [true, true],
  unmet: [
    { g12: ["G12-A-ONE", "G12-A-TWO"], gw12: ["GW12-01", "GW12-02"], quotes: ["the first quote", "a quote (with a nested part) here"] },
    { g12: ["G12-B-ONE"], gw12: ["GW12-03"], quotes: ["the comma quote"] },
  ],
  verdict: ["the V quote", "the twin quote"],
  ids: ["T-ONE-ID", "P-TWO-ID"],
  witnesses: ["WS-W-ONE", "-TWO"],
};
const [BASE_U1, BASE_U2] = BASE_READING.unmet;
const U1_LINE = "U1-MEDIUM-CONFIRMED-R514-R-B159-ALPHA-LABEL-GP19-C-ONE-AND-TWIN-0-47-WITNESSES-GW19-01-02";
const U2_LINE = "U2-LOW-CONFIRMED-R515-BETA-GP19-D-ONE-0-47-WITNESSES-GW19-03";
const U1_CLAUSE = "- U1 (MEDIUM) cells: two mutants against 'a cell claim' (:1) survive.";
const U2_CLAUSE = "- U2 (LOW) prose: one mutant survives (a prose claim)";
/** The field of the base page an edit applies to. */
type Where = "description" | "child notes" | "parent notes";
/** A READERS page as written: its id, what it carries, its one edit of the base page (none for the base page itself) and its literal reading. */
interface PageSpec {
  readonly id: string;
  readonly what: string;
  readonly edit: readonly [Where, string, string] | null;
  readonly reading: AnchorReading;
}
/** The base page with one edit: old, which the named field holds exactly once, replaced by next (a page whose old text is not there exactly once fails its case). */
function pageRows(edit: readonly [Where, string, string] | null): { readonly child: ExportRow; readonly parent: ExportRow } {
  if (edit === null) return { child: BASE_CHILD, parent: BASE_PARENT };
  const [where, old, next] = edit;
  const field = where === "description" ? BASE_CHILD.description : where === "child notes" ? BASE_CHILD.notes : BASE_PARENT.notes;
  const parts = field.split(old);
  if (parts.length !== 2) throw new Error(`the base page's ${where} holds ${JSON.stringify(old)} ${parts.length - 1} times, not once`);
  const text = parts.join(next);
  if (where === "description") return { child: { ...BASE_CHILD, description: text }, parent: BASE_PARENT };
  if (where === "child notes") return { child: { ...BASE_CHILD, notes: text }, parent: BASE_PARENT };
  return { child: BASE_CHILD, parent: { ...BASE_PARENT, notes: text } };
}
/** The READERS pages: the base page, then pages one edit from it, each with readAnchor's whole reading of it written as a literal; the pages whose ids open AR-QUIET- are the residuals' quiet rows (their reading is the base page's); wb-dlot's seventeen pages follow, in the order of the landing-831 gate's forms B01-B15, then B11's parenthesized twin and R1's indented row, wb-ectn's ten pages follow, in the order of the landing-884 gate's F1 forms G15-I01, G15-K02, G15-K03, G15-F03, G15-C01, G15-C02, G15-C03, G15-C04, G15-W03 and G15-W04, and wb-ectn's cut #2 seventeen pages close the table, in the order of wb-ectn refusal #1's GP4 members GP4-K01 to GP4-K04, GP4-C01 to GP4-C07, GP4-I01 to GP4-I03, GP4-W01, GP4-W02 and GP4-F01. */
const PAGES: readonly PageSpec[] = [
  { id: "AR-BASE", what: "the base page's clauses, fold lines, UNMET lines, V verdict and F5 finding are read as written", edit: null, reading: BASE_READING },
  {
    id: "AR-W1-G12-EXTRA", what: "an extra G12 id in U1's UNMET line (refusal #2 W1's form) is read as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-EXTRA (an extra reading)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A-EXTRA"] }, BASE_U2] },
  },
  {
    id: "AR-W2-FOLD-SWAPPED", what: "the fold's two member lines swapped (refusal #2 W2's form) are read in their new order",
    edit: ["child notes", `${U1_LINE}\n${U2_LINE}`, `${U2_LINE}\n${U1_LINE}`],
    reading: {
      ...BASE_READING,
      members: [
        ["U2-LOW-CONFIRMED-", "R515", "BETA", "GP19-D-ONE", "03"],
        ["U1-MEDIUM-CONFIRMED-", "R514-R-B159", "ALPHA-LABEL", "GP19-C-ONE-AND-TWIN", "01-02"],
      ],
    },
  },
  {
    id: "AR-W3-GW12-THREE-DIGITS", what: "a GW12 id of three digits in U1's UNMET line (refusal #2 W3's form) is read as a third GW12 id",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', GW12-100 'd'."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, gw12: ["GW12-01", "GW12-02", "GW12-100"] }, BASE_U2] },
  },
  {
    id: "AR-W4-GW12-ONE-DIGIT", what: "a GW12 id of one digit in U1's UNMET line (refusal #2 W4's form) is read as a third GW12 id",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', GW12-5 'd'."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, gw12: ["GW12-01", "GW12-02", "GW12-5"] }, BASE_U2] },
  },
  {
    id: "AR-W5-S-ID-DIGIT", what: "a row S id with a digit in a word, in the F5 finding (refusal #2 W5's form), is read as a third id",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID and T-STAR-RUN2-KEPT each read"],
    reading: { ...BASE_READING, ids: ["T-ONE-ID", "P-TWO-ID", "T-STAR-RUN2-KEPT"] },
  },
  {
    id: "AR-W7-S-ID-ONE-WORD", what: "a row S id of one word after its letter, in the F5 finding (refusal #2 W7's form), is read as a third id",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID and T-STAR each read"],
    reading: { ...BASE_READING, ids: ["T-ONE-ID", "P-TWO-ID", "T-STAR"] },
  },
  {
    id: "AR-CLAUSE-ORDER", what: "the two description clauses swapped are read in their new order",
    edit: ["description", `${U1_CLAUSE}\n${U2_CLAUSE}`, `${U2_CLAUSE}\n${U1_CLAUSE}`],
    reading: {
      ...BASE_READING,
      clauses: [
        ["U2", "LOW", "prose", "one", "mutant", "survives (a prose claim)"],
        ["U1", "MEDIUM", "cells", "two", "mutants", "against 'a cell claim'"],
      ],
    },
  },
  {
    id: "AR-G12-ORDER", what: "U1's UNMET line naming its G12 ids in the other order is read in that order, each pin's quote still its own",
    edit: ["parent notes", "G12-A-ONE (the first quote), G12-A-TWO (a quote (with a nested part) here)", "G12-A-TWO (a quote (with a nested part) here), G12-A-ONE (the first quote)"],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-TWO", "G12-A-ONE"] }, BASE_U2] },
  },
  {
    id: "AR-GW12-ORDER", what: "U1's UNMET line naming its GW12 ids in the other order is read in that order",
    edit: ["parent notes", "GW12-01 'a', GW12-02 'b'", "GW12-02 'b', GW12-01 'a'"],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, gw12: ["GW12-02", "GW12-01"] }, BASE_U2] },
  },
  {
    id: "AR-S-ORDER", what: "the F5 finding naming its row S ids in the other order is read in that order",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID", "P-TWO-ID and T-ONE-ID"],
    reading: { ...BASE_READING, ids: ["P-TWO-ID", "T-ONE-ID"] },
  },
  {
    id: "AR-WITNESS-ORDER", what: "the F5 witness clause naming its witnesses in the other order is read in that order",
    edit: ["parent notes", "WS-W-ONE / -TWO", "WS-W-TWO / -ONE"],
    reading: { ...BASE_READING, witnesses: ["WS-W-TWO", "-ONE"] },
  },
  {
    id: "AR-CLAUSE-EXTRA", what: "a third '- U3 (' clause is read as a third clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n- U3 (LOW) lead: one mutant against 'a lead claim' survives.`],
    reading: { ...BASE_READING, clauses: [...BASE_READING.clauses, ["U3", "LOW", "lead", "one", "mutant", "against 'a lead claim'"]] },
  },
  {
    id: "AR-CLAUSE-UNREAD", what: "a '- U3 (' line that CLAUSE does not read is kept as its whole line",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n- U3 (LOW) a clause without its colon`],
    reading: { ...BASE_READING, clauses: [...BASE_READING.clauses, ["- U3 (LOW) a clause without its colon"]] },
  },
  {
    id: "AR-FOLD-EXTRA", what: "a third member line in the fold is read as a third member",
    edit: ["child notes", U2_LINE, `${U2_LINE}\nU3-LOW-CONFIRMED-R668-GAMMA-GP19-E-ONE-0-47-WITNESSES-GW19-04`],
    reading: { ...BASE_READING, members: [...BASE_READING.members, ["U3-LOW-CONFIRMED-", "R668", "GAMMA", "GP19-E-ONE", "04"]] },
  },
  {
    id: "AR-FOLD-UNREAD", what: "a third member line that FOLD does not read is kept as its whole line",
    edit: ["child notes", U2_LINE, `${U2_LINE}\nU3-LOW-CONFIRMED-R668-GAMMA`],
    reading: { ...BASE_READING, members: [...BASE_READING.members, ["U3-LOW-CONFIRMED-R668-GAMMA"]] },
  },
  {
    id: "AR-WITNESS-EXTRA", what: "a third witness in the F5 witness clause is read as a third witness",
    edit: ["parent notes", "WS-W-ONE / -TWO red", "WS-W-ONE / -TWO / -THREE red"],
    reading: { ...BASE_READING, witnesses: ["WS-W-ONE", "-TWO", "-THREE"] },
  },
  {
    id: "AR-G12-GLUED-AFTER", what: "a G12 token whose last word runs into a lower-case letter ('G12-A-ONEx') is read to its last word boundary, as the extra id 'G12-A'",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-ONEx (a glued-after id)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A"] }, BASE_U2] },
  },
  {
    id: "AR-G12-DIGIT-WORD", what: "an extra G12 id whose word holds a digit ('G12-A2-EXTRA') is read as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A2-EXTRA (a digit-bearing id)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A2-EXTRA"] }, BASE_U2] },
  },
  {
    id: "AR-EARLIER-CITATION", what: "U1's UNMET line citing G12-A-ONE twice is read for the first citation's quote, and the id once",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: G12-A-ONE (an earlier quote) and G12-A-ONE (the first quote)"],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, quotes: ["an earlier quote", "a quote (with a nested part) here"] }, BASE_U2] },
  },
  {
    id: "AR-LATER-CITATION", what: "a later, different citation of G12-A-ONE in U1's UNMET line changes neither its ids nor its quote",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b'. Again G12-A-ONE (a later quote)."],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-GLUED", what: "occurrences of G12-A-ONE glued to a preceding hyphen or digit are passed over as citations; its quote is its own first citation's",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: X-G12-A-ONE (a hyphen-glued quote), 5G12-A-ONE (a digit-glued quote) and G12-A-ONE (the first quote)"],
    reading: BASE_READING,
  },
  {
    id: "AR-REPEATED-GW12", what: "a GW12 id named again in U1's UNMET line is read once",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', GW12-01 'a' again."],
    reading: BASE_READING,
  },
  {
    id: "AR-S-REPEATED", what: "a row S id named again in the F5 finding is read once",
    edit: ["parent notes", "-TWO red the census.", "-TWO red the census; T-ONE-ID again."],
    reading: BASE_READING,
  },
  {
    id: "AR-PRE-VERDICT-CITATION", what: "citations of a U pin and a V pin before refusal #3's opening are not read; each quote is still its own line's or verdict's",
    edit: ["parent notes", "An earlier note.", "An earlier note: G12-A-ONE (a pre-verdict quote) and GP19-C-ONE (a pre-verdict V quote)."],
    reading: BASE_READING,
  },
  {
    id: "AR-LATER-UNMET-LINE", what: "a later line opening with U1's lead is not read; U1's UNMET line is the first after refusal #3's opening",
    edit: ["parent notes", "WHAT STANDS: nothing.", "WHAT STANDS: nothing.\nU1 MEDIUM CONFIRMED (a later line). G12-A-LATER (a later quote), GW12-09 'z'."],
    reading: BASE_READING,
  },
  {
    id: "AR-EARLIER-F5", what: "an F5 finding before refusal #4's opening is not read; the F5 finding is the first after it",
    edit: ["parent notes", "UNMET:", "UNMET:\n- F5 INFO: (THE CELLS, measured part, CONFIRMED) an earlier finding.\n  - T-EARLY-ID reads 0|47. Their witnesses WS-W-EARLY red.\n- F6 LOW: an earlier next."],
    reading: BASE_READING,
  },
  {
    id: "AR-NO-FOLD", what: "without the fold's opening words no member line is read",
    edit: ["child notes", "members folded into wb-t8my", "members folded into wb-t9my"],
    reading: { ...BASE_READING, members: [] },
  },
  {
    id: "AR-NO-REFUSAL-3", what: "without refusal #3's opening no UNMET line is read and refusal #3 reads absent",
    edit: ["parent notes", REFUSAL_3, "refusal #3 on cut #3 (tip 0000000000000000000000000000000000000000"],
    reading: {
      ...BASE_READING,
      refusals: [false, true],
      unmet: [
        { g12: [], gw12: [], quotes: ["", ""] },
        { g12: [], gw12: [], quotes: [""] },
      ],
    },
  },
  {
    id: "AR-NO-REFUSAL-4", what: "without refusal #4's opening no V quote, row S id or witness is read and refusal #4 reads absent",
    edit: ["parent notes", REFUSAL_4, "refusal #4 on the FINAL cut #4 (tip 0000000000000000000000000000000000000000"],
    reading: { ...BASE_READING, refusals: [true, false], verdict: ["", ""], ids: [], witnesses: [""] },
  },
  {
    id: "AR-REFUSAL-4-EARLIER", what: "refusal #4's opening also written before refusal #3's reads the refusals out of order",
    edit: ["parent notes", "An earlier note.", `An earlier note on ${REFUSAL_4}).`],
    reading: { ...BASE_READING, refusals: [true, false] },
  },
  {
    id: "AR-REFUSAL-3-AT-START", what: "refusal #3's opening at the notes' first character is read as present",
    edit: ["parent notes", "An earlier note.\nGATE VERDICT: REFUSED, ", ""],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-U10-ROW", what: "residual R1 quiet row: a '- U10 (' row is not read as a clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n- U10 (LOW) extra form: one mutant against 'a reading' (:1) survives.`],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-STAR-ROW", what: "residual R1 quiet row: a '* U3 (' row is not read as a clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n* U3 (LOW) extra form: one mutant against 'a reading' (:1) survives.`],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-MIDLINE-ROW", what: "residual R1 quiet row: a description line naming '- U3 (' after its opening is not read as a clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\nA note on a row - U3 (LOW) extra form: one mutant against 'a reading' (:1) survives.`],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-UNKEYED-UNMET", what: "residual R2 quiet row: an UNMET line whose lead no key names ('U3 LOW CONFIRMED') is not read",
    edit: ["parent notes", "Witness: GW12-03 'c'.", "Witness: GW12-03 'c'.\nU3 LOW CONFIRMED (a claim). WHAT FAILS: G12-C-ONE (a third quote). Witness GW12-04 'd'."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-G12-LOWER", what: "residual R3 quiet row: a G12 id in lower case ('g12-a-low') is not read",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), g12-a-low (a lower-case id)."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-G12-GLUED", what: "residual R3 quiet row: a G12 id glued to a preceding letter ('XG12-A-GLUED') is not read",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), XG12-A-GLUED (a glued id)."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-GW12-LETTER", what: "residual R3 quiet row: a GW12 id whose digits run into a letter ('GW12-4b') is not read",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', GW12-4b 'e'."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-GW12-GLUED", what: "residual R3 quiet row: a GW12 id glued to a preceding letter ('XGW12-07') is not read",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', XGW12-07 'f'."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-S-TWO-LETTER", what: "residual R3 quiet row: a row-S-shaped id with a two-letter prefix ('WS-STAR-KEPT', refusal #2 W6's form) is not read",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID and WS-STAR-KEPT each read"],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-S-LOWER", what: "residual R3 quiet row: a row-S-shaped id with lower-case words or a lower-case letter ('T-star-kept', 't-STAR-KEPT') is not read",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID, T-star-kept and t-STAR-KEPT each read"],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-S-GLUED", what: "residual R3 quiet row: a row S id glued to a letter before or after it, to a digit before it, to a hyphen after it, or running into a letter after a digit ('xT-STAR-KEPT', 'T-STAR-KEPTx', '5T-STAR-KEPT', 'T-STAR-KEPT-', 'T-STAR-KEPT5x') is not read",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID, xT-STAR-KEPT, T-STAR-KEPTx, 5T-STAR-KEPT, T-STAR-KEPT- and T-STAR-KEPT5x each read"],
    reading: BASE_READING,
  },
  {
    id: "AR-G12-LATER-DIGIT-WORD", what: "an extra G12 id whose later word holds a digit ('G12-A-B2', landing 831's B01 form) is read as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-B2 (a later-word digit)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A-B2"] }, BASE_U2] },
  },
  {
    id: "AR-QUIET-G12-DIGIT-GLUED", what: "residual R3 quiet row: a G12 id glued to a preceding digit ('5G12-A-NEW', landing 831's B02 form) is not read",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), 5G12-A-NEW (a digit-glued id)."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-GW12-DIGIT-GLUED", what: "residual R3 quiet row: a GW12 id glued to a preceding digit ('5GW12-07', landing 831's B03 form) is not read",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', 5GW12-07 'g'."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-GW12-UPPER-LETTER", what: "residual R3 quiet row: a GW12 id whose digits run into an upper-case letter ('GW12-4B', landing 831's B04 form) is not read",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', GW12-4B 'h'."],
    reading: BASE_READING,
  },
  {
    id: "AR-S-UNDERSCORE-BEFORE", what: "a row S id after an underscore, in the F5 finding ('_T-STAR-KEPT', landing 831's B05 form), is read as a third id",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID and _T-STAR-KEPT each read"],
    reading: { ...BASE_READING, ids: ["T-ONE-ID", "P-TWO-ID", "T-STAR-KEPT"] },
  },
  {
    id: "AR-S-ONE-CHAR-WORD", what: "a row S id with a one-letter word, in the F5 finding ('T-A-KEPT', landing 831's B06 form), is read as a third id",
    edit: ["parent notes", "T-ONE-ID and P-TWO-ID each read", "T-ONE-ID, P-TWO-ID and T-A-KEPT each read"],
    reading: { ...BASE_READING, ids: ["T-ONE-ID", "P-TWO-ID", "T-A-KEPT"] },
  },
  {
    id: "AR-QUIET-PLUS-ROW", what: "residual R1 quiet row: a '+ U3 (' row (landing 831's B07 form) is not read as a clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n+ U3 (LOW) extra form: one mutant against 'a reading' (:1) survives.`],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-UNDERSCORE", what: "an occurrence of G12-A-ONE after an underscore ('_G12-A-ONE', landing 831's B08 form) is its first citation, and its quote is read",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: _G12-A-ONE (an underscore-glued quote) and G12-A-ONE (the first quote)"],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, quotes: ["an underscore-glued quote", "a quote (with a nested part) here"] }, BASE_U2] },
  },
  {
    id: "AR-VERDICT-AFTER-WHAT-STANDS", what: "a V pin cited only after refusal #4's WHAT STANDS (landing 831's B09 form) is not read: its quote reads empty",
    edit: ["parent notes", "then GP19-C-ONE (the V quote).\nWHAT STANDS: nothing.", "then nothing.\nWHAT STANDS: nothing. GP19-C-ONE (a later V quote)."],
    reading: { ...BASE_READING, verdict: ["", "the twin quote"] },
  },
  {
    id: "AR-WITNESS-UNSPACED", what: "an F5 witness clause without the spaced separator ('WS-W-ONE/-TWO', landing 831's B10 form) is read as one witness",
    edit: ["parent notes", "Their witnesses WS-W-ONE / -TWO red", "Their witnesses WS-W-ONE/-TWO red"],
    reading: { ...BASE_READING, witnesses: ["WS-W-ONE/-TWO"] },
  },
  {
    id: "AR-QUIET-CLAUSE-SECOND-QUOTE", what: "residual R4 quiet row: a second quoted span later on a clause's line (landing 831's B11 form) is not read into its claim",
    edit: ["description", U1_CLAUSE, "- U1 (MEDIUM) cells: two mutants against 'a cell claim' (:1) and 'more' survive."],
    reading: BASE_READING,
  },
  {
    id: "AR-FOLD-BLANK-LINE", what: "a blank line between the fold's member lines (landing 831's B12 form) is read as a member, kept whole as the empty line",
    edit: ["child notes", `${U1_LINE}\n${U2_LINE}`, `${U1_LINE}\n\n${U2_LINE}`],
    reading: {
      ...BASE_READING,
      members: [
        ["U1-MEDIUM-CONFIRMED-", "R514-R-B159", "ALPHA-LABEL", "GP19-C-ONE-AND-TWIN", "01-02"],
        [""],
        ["U2-LOW-CONFIRMED-", "R515", "BETA", "GP19-D-ONE", "03"],
      ],
    },
  },
  {
    id: "AR-F5-HEAD-OTHER-GRADE", what: "an F5 head grading the label PLAUSIBLE, not CONFIRMED (landing 831's B13 form), is no F5 head: no row S id or witness is read",
    edit: ["parent notes", "- F5 INFO: (THE CELLS, measured part, CONFIRMED)", "- F5 INFO: (THE CELLS, measured part, PLAUSIBLE)"],
    reading: { ...BASE_READING, ids: [], witnesses: [""] },
  },
  {
    id: "AR-QUIET-G12-LOWER-GLUED", what: "residual R3 quiet row: a G12 id glued to a preceding lower-case letter ('xG12-A-NEW', landing 831's B14 form) is not read",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), xG12-A-NEW (a lower-glued id)."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-GW12-LOWER-GLUED", what: "residual R3 quiet row: a GW12 id glued to a preceding lower-case letter ('xGW12-07', landing 831's B15 form) is not read",
    edit: ["parent notes", "GW12-02 'b'.", "GW12-02 'b', xGW12-07 'g'."],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-CLAUSE-SECOND-PAREN", what: "residual R4 quiet row: a second parenthesized span later on a clause's line (the twin of landing 831's B11 form) is not read into its claim",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE} (a later part)`],
    reading: BASE_READING,
  },
  {
    id: "AR-QUIET-INDENTED-ROW", what: "residual R1 quiet row: a ' - U3 (' row, its bullet after one space, is not read as a clause",
    edit: ["description", U2_CLAUSE, `${U2_CLAUSE}\n - U3 (LOW) extra form: one mutant against 'a reading' (:1) survives.`],
    reading: BASE_READING,
  },
  {
    id: "AR-G12-NINE-LETTER-WORD", what: "an extra G12 id whose later word holds nine letters ('G12-A-NINELONGS', landing 884's G15-I01 form) is read whole as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-NINELONGS (a nine-letter later word)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A-NINELONGS"] }, BASE_U2] },
  },
  {
    id: "AR-CLAUSE-QUOTE-INNER", what: "an apostrophe between two letters of a quoted claim ('a cell's claim', landing 884's G15-K02 form) ends the claim's span there, so CLAUSE does not read the line and it is kept whole",
    edit: ["description", U1_CLAUSE, "- U1 (MEDIUM) cells: two mutants against 'a cell's claim' (:1) survive."],
    reading: {
      ...BASE_READING,
      clauses: [["- U1 (MEDIUM) cells: two mutants against 'a cell's claim' (:1) survive."], ["U2", "LOW", "prose", "one", "mutant", "survives (a prose claim)"]],
    },
  },
  {
    id: "AR-CLAUSE-PAREN-NESTED", what: "a parenthesized claim holding a nested parenthesized word ('(a (nested) claim)', landing 884's G15-K03 form) is not read by CLAUSE, so the line is kept whole",
    edit: ["description", U2_CLAUSE, "- U2 (LOW) prose: one mutant survives (a (nested) claim)"],
    reading: {
      ...BASE_READING,
      clauses: [["U1", "MEDIUM", "cells", "two", "mutants", "against 'a cell claim'"], ["- U2 (LOW) prose: one mutant survives (a (nested) claim)"]],
    },
  },
  {
    id: "AR-FOLD-SPACES-LINE", what: "a line of two spaces between the fold's member lines (landing 884's G15-F03 form) is read as a member, kept whole as its two spaces",
    edit: ["child notes", `${U1_LINE}\n${U2_LINE}`, `${U1_LINE}\n  \n${U2_LINE}`],
    reading: {
      ...BASE_READING,
      members: [
        ["U1-MEDIUM-CONFIRMED-", "R514-R-B159", "ALPHA-LABEL", "GP19-C-ONE-AND-TWIN", "01-02"],
        ["  "],
        ["U2-LOW-CONFIRMED-", "R515", "BETA", "GP19-D-ONE", "03"],
      ],
    },
  },
  {
    id: "AR-CITATION-PERIOD", what: "an occurrence of G12-A-ONE after a period ('.G12-A-ONE', landing 884's G15-C01 form) is its first citation, and its quote is read",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: .G12-A-ONE (a period-glued quote) and G12-A-ONE (the first quote)"],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, quotes: ["a period-glued quote", "a quote (with a nested part) here"] }, BASE_U2] },
  },
  {
    id: "AR-CITATION-LOWER-GLUED", what: "an occurrence of G12-A-ONE glued to a preceding lower-case letter ('xG12-A-ONE', landing 884's G15-C02 form) is passed over as a citation; its quote is its own first citation's",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: xG12-A-ONE (a lower-glued quote) and G12-A-ONE (the first quote)"],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-COMMA-UNSPACED", what: "G12-B-ONE followed by a comma with no space after it ('G12-B-ONE,the comma quote:', landing 884's G15-C03 form) is neither citation form: its quote reads empty",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", "G12-B-ONE,the comma quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: [""] }] },
  },
  {
    id: "AR-CITATION-COMMA-PERIOD", what: "a comma-form quote holding a period ('G12-B-ONE, the comma. quote:', landing 884's G15-C04 form) is read on past the period to the next colon",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", "G12-B-ONE, the comma. quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: ["the comma. quote"] }] },
  },
  {
    id: "AR-F5-HEAD-RUN-ON", what: "an F5 head whose parenthesis runs on past CONFIRMED ('(THE CELLS, measured part, CONFIRMED, again)', landing 884's G15-W03 form) is no F5 head: no row S id or witness is read",
    edit: ["parent notes", "- F5 INFO: (THE CELLS, measured part, CONFIRMED)", "- F5 INFO: (THE CELLS, measured part, CONFIRMED, again)"],
    reading: { ...BASE_READING, ids: [], witnesses: [""] },
  },
  {
    id: "AR-WITNESS-WIDE-SPACED", what: "an F5 witness list with two spaces on each side of its slash ('WS-W-ONE  /  -TWO', landing 884's G15-W04 form) is no witness clause: one empty witness is read",
    edit: ["parent notes", "Their witnesses WS-W-ONE / -TWO red", "Their witnesses WS-W-ONE  /  -TWO red"],
    reading: { ...BASE_READING, witnesses: [""] },
  },
  {
    id: "AR-CLAUSE-QUOTE-UPPER-INNER", what: "an apostrophe between two upper-case letters of a quoted claim ('an A'B claim', wb-ectn refusal #1's GP4-K01 form) ends the claim's span there, so CLAUSE does not read the line and it is kept whole",
    edit: ["description", U1_CLAUSE, "- U1 (MEDIUM) cells: two mutants against 'an A'B claim' (:1) survive."],
    reading: {
      ...BASE_READING,
      clauses: [["- U1 (MEDIUM) cells: two mutants against 'an A'B claim' (:1) survive."], ["U2", "LOW", "prose", "one", "mutant", "survives (a prose claim)"]],
    },
  },
  {
    id: "AR-CLAUSE-QUOTE-DIGIT-INNER", what: "an apostrophe after a space and before a digit inside a quoted claim ('a '9 claim', wb-ectn refusal #1's GP4-K02 form) ends the claim's span there, so CLAUSE does not read the line and it is kept whole",
    edit: ["description", U1_CLAUSE, "- U1 (MEDIUM) cells: two mutants against 'a '9 claim' (:1) survive."],
    reading: {
      ...BASE_READING,
      clauses: [["- U1 (MEDIUM) cells: two mutants against 'a '9 claim' (:1) survive."], ["U2", "LOW", "prose", "one", "mutant", "survives (a prose claim)"]],
    },
  },
  {
    id: "AR-CLAUSE-PAREN-NESTED-UPPER", what: "a parenthesized claim holding a nested upper-case word ('(a (NESTED) claim)', wb-ectn refusal #1's GP4-K03 form) is not read by CLAUSE, so the line is kept whole",
    edit: ["description", U2_CLAUSE, "- U2 (LOW) prose: one mutant survives (a (NESTED) claim)"],
    reading: {
      ...BASE_READING,
      clauses: [["U1", "MEDIUM", "cells", "two", "mutants", "against 'a cell claim'"], ["- U2 (LOW) prose: one mutant survives (a (NESTED) claim)"]],
    },
  },
  {
    id: "AR-CLAUSE-PAREN-NESTED-PHRASE", what: "a parenthesized claim holding a nested group of two lower-case words ('(a (two words) claim)', wb-ectn refusal #1's GP4-K04 form) is not read by CLAUSE, so the line is kept whole",
    edit: ["description", U2_CLAUSE, "- U2 (LOW) prose: one mutant survives (a (two words) claim)"],
    reading: {
      ...BASE_READING,
      clauses: [["U1", "MEDIUM", "cells", "two", "mutants", "against 'a cell claim'"], ["- U2 (LOW) prose: one mutant survives (a (two words) claim)"]],
    },
  },
  {
    id: "AR-CITATION-UPPER-GLUED", what: "an occurrence of G12-A-ONE glued to a preceding upper-case Q ('QG12-A-ONE', wb-ectn refusal #1's GP4-C01 form) is passed over as a citation; its quote is its own first citation's",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: QG12-A-ONE (a Q-glued quote) and G12-A-ONE (the first quote)"],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-LOWER-GLUED-Y", what: "an occurrence of G12-A-ONE glued to a preceding lower-case y ('yG12-A-ONE', wb-ectn refusal #1's GP4-C02 form) is passed over as a citation; its quote is its own first citation's",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: yG12-A-ONE (a y-glued quote) and G12-A-ONE (the first quote)"],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-DIGIT-GLUED", what: "an occurrence of G12-A-ONE glued to a preceding digit 7 ('7G12-A-ONE', wb-ectn refusal #1's GP4-C03 form) is passed over as a citation; its quote is its own first citation's",
    edit: ["parent notes", "WHAT FAILS: G12-A-ONE (the first quote)", "WHAT FAILS: 7G12-A-ONE (a 7-glued quote) and G12-A-ONE (the first quote)"],
    reading: BASE_READING,
  },
  {
    id: "AR-CITATION-PERIOD-COMMA-FORM", what: "a comma-form occurrence of G12-B-ONE after a period ('.G12-B-ONE, a period comma quote:', wb-ectn refusal #1's GP4-C04 form) is its first citation, and its quote is read",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", ".G12-B-ONE, a period comma quote: then G12-B-ONE, the comma quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: ["a period comma quote"] }] },
  },
  {
    id: "AR-CITATION-UNDERSCORE-COMMA-FORM", what: "a comma-form occurrence of G12-B-ONE after an underscore ('_G12-B-ONE, an underscore comma quote:', wb-ectn refusal #1's GP4-C05 form) is its first citation, and its quote is read",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", "_G12-B-ONE, an underscore comma quote: then G12-B-ONE, the comma quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: ["an underscore comma quote"] }] },
  },
  {
    id: "AR-CITATION-COMMA-UNSPACED-UPPER", what: "G12-B-ONE followed by a comma with an upper-case letter and no space after it ('G12-B-ONE,The comma quote:', wb-ectn refusal #1's GP4-C06 form) is neither citation form: its quote reads empty",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", "G12-B-ONE,The comma quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: [""] }] },
  },
  {
    id: "AR-CITATION-COMMA-PERIOD-UPPER", what: "a comma-form quote holding a period before an upper-case letter ('G12-B-ONE, the comma.Quote:', wb-ectn refusal #1's GP4-C07 form) is read on past the period to the next colon",
    edit: ["parent notes", "G12-B-ONE, the comma quote: it survives.", "G12-B-ONE, the comma.Quote: it survives."],
    reading: { ...BASE_READING, unmet: [BASE_U1, { ...BASE_U2, quotes: ["the comma.Quote"] }] },
  },
  {
    id: "AR-G12-THREE-LETTER-FIRST-WORD", what: "an extra G12 id whose first word holds three letters ('G12-ABC-EXTRA', wb-ectn refusal #1's GP4-I01 form) is read whole as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-ABC-EXTRA (a three-letter first word)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-ABC-EXTRA"] }, BASE_U2] },
  },
  {
    id: "AR-G12-TWO-LETTER-DIGIT-WORD", what: "an extra G12 id whose later word is two letters then one digit ('G12-A-BC2', wb-ectn refusal #1's GP4-I02 form) is read whole as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-BC2 (a two-letter digit word)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A-BC2"] }, BASE_U2] },
  },
  {
    id: "AR-G12-NINE-LETTER-MIDDLE-WORD", what: "an extra G12 id whose nine-letter word is followed by another word ('G12-A-NINELONGS-EXTRA', wb-ectn refusal #1's GP4-I03 form) is read whole as a third G12 id",
    edit: ["parent notes", "G12-A-TWO (a quote (with a nested part) here).", "G12-A-TWO (a quote (with a nested part) here), G12-A-NINELONGS-EXTRA (a nine-letter middle word)."],
    reading: { ...BASE_READING, unmet: [{ ...BASE_U1, g12: ["G12-A-ONE", "G12-A-TWO", "G12-A-NINELONGS-EXTRA"] }, BASE_U2] },
  },
  {
    id: "AR-F5-HEAD-SEMICOLON-RUN-ON", what: "an F5 head whose parenthesis runs on past CONFIRMED after a semicolon ('(THE CELLS, measured part, CONFIRMED; again)', wb-ectn refusal #1's GP4-W01 form) is no F5 head: no row S id or witness is read",
    edit: ["parent notes", "- F5 INFO: (THE CELLS, measured part, CONFIRMED)", "- F5 INFO: (THE CELLS, measured part, CONFIRMED; again)"],
    reading: { ...BASE_READING, ids: [], witnesses: [""] },
  },
  {
    id: "AR-WITNESS-UNSPACED-UPPER", what: "an F5 witness list whose slash, with no space on either side, comes before an upper-case letter ('WS-W-ONE/TWO', wb-ectn refusal #1's GP4-W02 form) is read as one witness",
    edit: ["parent notes", "Their witnesses WS-W-ONE / -TWO red", "Their witnesses WS-W-ONE/TWO red"],
    reading: { ...BASE_READING, witnesses: ["WS-W-ONE/TWO"] },
  },
  {
    id: "AR-FOLD-TRAILING-BLANK-LINE", what: "a blank line after the fold's last member line (wb-ectn refusal #1's GP4-F01 form) is read as a member, kept whole as the empty line",
    edit: ["child notes", `${U2_LINE}\nrule19-invert idem`, `${U2_LINE}\n\nrule19-invert idem`],
    reading: {
      ...BASE_READING,
      members: [
        ["U1-MEDIUM-CONFIRMED-", "R514-R-B159", "ALPHA-LABEL", "GP19-C-ONE-AND-TWIN", "01-02"],
        ["U2-LOW-CONFIRMED-", "R515", "BETA", "GP19-D-ONE", "03"],
        [""],
      ],
    },
  },
];

describe("wb-t8my readers census (test/helpers/furnace-cac-citation-status-readers.ts and this file's readAnchor): fifteen pin cases holding literal probe readings their named wb-pnn8 reader mutants change, SHAPE, ANCHOR (readAnchor's reading of the two tracker-export rows equals the literals' reading) and eighty-seven READERS pages (readAnchor's literal readings of synthetic one-edit pages)", () => {
  it("SHAPE: the rows, their pins, each pin's probe ids and the READERS page ids are each held to a literal (a one-literal edit reds here)", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["U1:4", "U2:3", "U3:1", "V1:2", "V2:1", "S:4"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "G12-T-CELL-HTML-STRIPPED:CELL-ELEMENT,GW12-01",
      "G12-T-CELL-ESCAPES-RESOLVED:CELL-ESCAPE,GW12-02",
      "G12-T-CELL-STRIKE-STRIPPED:CELL-STRUCK,GW12-03",
      "G12-T-CELL-LINK-TEXT:CELL-LINK,GW12-04",
      "G12-P-NESTED-INDENTED-CODE-OFF:ITEM-INDENTED-CODE,GW12-09",
      "G12-P-SHORTCUT-REFLINK-HIDDEN:SHORTCUT-REF,GW12-08",
      "G12-P-NESTED-LIST-OPACITY-ISOLATED:NESTED-LIST-ELEMENT,GW12-06",
      "G12-R-NFKC-LEAD:FULLWIDTH-COLON-LEAD,GW12-07,FULLWIDTH-CLAUSE",
      "GP19-O-OPENING-TAG-IGNORED:OPEN-TAG-BLOCKS,GW19-01,GW19-02,GW19-05",
      "GP19-O-OPENING-TAG-IGNORED-ANCHOR:OPEN-TAG-BLOCKS,GW19-01,GW19-02,GW19-05",
      "GP19-R-RULES-DEDUPED:GW19-03,GW19-04",
      "T-STRONG-STRIPPED:CELL-STRONG,WS-W-STRONG-CELL",
      "T-UNDERSCORE-EM-STRIPPED:CELL-UNDERSCORE-EM,WS-W-UNDERSCORE-CELL",
      "P-COLLAPSED-REFLINK-HIDDEN:COLLAPSED-REF,WS-W-COLLAPSED-REF",
      "H-INDENT-ONE-CHAR:HEADER-TWO-SPACES,HEADER-TWO-TABS",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
    expect(PAGES.map(page => page.id), "the READERS pages, in page order").toEqual([
      "AR-BASE",
      "AR-W1-G12-EXTRA",
      "AR-W2-FOLD-SWAPPED",
      "AR-W3-GW12-THREE-DIGITS",
      "AR-W4-GW12-ONE-DIGIT",
      "AR-W5-S-ID-DIGIT",
      "AR-W7-S-ID-ONE-WORD",
      "AR-CLAUSE-ORDER",
      "AR-G12-ORDER",
      "AR-GW12-ORDER",
      "AR-S-ORDER",
      "AR-WITNESS-ORDER",
      "AR-CLAUSE-EXTRA",
      "AR-CLAUSE-UNREAD",
      "AR-FOLD-EXTRA",
      "AR-FOLD-UNREAD",
      "AR-WITNESS-EXTRA",
      "AR-G12-GLUED-AFTER",
      "AR-G12-DIGIT-WORD",
      "AR-EARLIER-CITATION",
      "AR-LATER-CITATION",
      "AR-CITATION-GLUED",
      "AR-REPEATED-GW12",
      "AR-S-REPEATED",
      "AR-PRE-VERDICT-CITATION",
      "AR-LATER-UNMET-LINE",
      "AR-EARLIER-F5",
      "AR-NO-FOLD",
      "AR-NO-REFUSAL-3",
      "AR-NO-REFUSAL-4",
      "AR-REFUSAL-4-EARLIER",
      "AR-REFUSAL-3-AT-START",
      "AR-QUIET-U10-ROW",
      "AR-QUIET-STAR-ROW",
      "AR-QUIET-MIDLINE-ROW",
      "AR-QUIET-UNKEYED-UNMET",
      "AR-QUIET-G12-LOWER",
      "AR-QUIET-G12-GLUED",
      "AR-QUIET-GW12-LETTER",
      "AR-QUIET-GW12-GLUED",
      "AR-QUIET-S-TWO-LETTER",
      "AR-QUIET-S-LOWER",
      "AR-QUIET-S-GLUED",
      "AR-G12-LATER-DIGIT-WORD",
      "AR-QUIET-G12-DIGIT-GLUED",
      "AR-QUIET-GW12-DIGIT-GLUED",
      "AR-QUIET-GW12-UPPER-LETTER",
      "AR-S-UNDERSCORE-BEFORE",
      "AR-S-ONE-CHAR-WORD",
      "AR-QUIET-PLUS-ROW",
      "AR-CITATION-UNDERSCORE",
      "AR-VERDICT-AFTER-WHAT-STANDS",
      "AR-WITNESS-UNSPACED",
      "AR-QUIET-CLAUSE-SECOND-QUOTE",
      "AR-FOLD-BLANK-LINE",
      "AR-F5-HEAD-OTHER-GRADE",
      "AR-QUIET-G12-LOWER-GLUED",
      "AR-QUIET-GW12-LOWER-GLUED",
      "AR-QUIET-CLAUSE-SECOND-PAREN",
      "AR-QUIET-INDENTED-ROW",
      "AR-G12-NINE-LETTER-WORD",
      "AR-CLAUSE-QUOTE-INNER",
      "AR-CLAUSE-PAREN-NESTED",
      "AR-FOLD-SPACES-LINE",
      "AR-CITATION-PERIOD",
      "AR-CITATION-LOWER-GLUED",
      "AR-CITATION-COMMA-UNSPACED",
      "AR-CITATION-COMMA-PERIOD",
      "AR-F5-HEAD-RUN-ON",
      "AR-WITNESS-WIDE-SPACED",
      "AR-CLAUSE-QUOTE-UPPER-INNER",
      "AR-CLAUSE-QUOTE-DIGIT-INNER",
      "AR-CLAUSE-PAREN-NESTED-UPPER",
      "AR-CLAUSE-PAREN-NESTED-PHRASE",
      "AR-CITATION-UPPER-GLUED",
      "AR-CITATION-LOWER-GLUED-Y",
      "AR-CITATION-DIGIT-GLUED",
      "AR-CITATION-PERIOD-COMMA-FORM",
      "AR-CITATION-UNDERSCORE-COMMA-FORM",
      "AR-CITATION-COMMA-UNSPACED-UPPER",
      "AR-CITATION-COMMA-PERIOD-UPPER",
      "AR-G12-THREE-LETTER-FIRST-WORD",
      "AR-G12-TWO-LETTER-DIGIT-WORD",
      "AR-G12-NINE-LETTER-MIDDLE-WORD",
      "AR-F5-HEAD-SEMICOLON-RUN-ON",
      "AR-WITNESS-UNSPACED-UPPER",
      "AR-FOLD-TRAILING-BLANK-LINE",
    ]);
  });

  it("ANCHOR: readAnchor's reading of wb-t8my's and wb-pnn8's tracker-export rows equals, whole, the reading the literals give - the U clauses' fields and count words; the R-B202 fold lines' fields, in order; both refusals, in order; each U row's UNMET-line G12 ids, GW12 ids and pin quotes; the V pins' quotes; row S's F5 ids and WS-W witnesses", () => {
    for (const row of FOLDED) {
      const first = row.pins[0] ?? "";
      expect(
        row.pins.slice(1).every(id => id.startsWith(`${first}-`)),
        `${row.id}: every later pin extends its first pin's id`,
      ).toBe(true);
    }
    expect(readAnchor(exportRow("wb-t8my"), exportRow("wb-pnn8"), KEYS), "readAnchor reads the two rows exactly as the literals give").toEqual(expectedReading());
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const probe of pin.probes) {
        expect(READERS[probe.reader](probe.text), `${pin.id} / ${probe.id}: ${probe.reader} reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }

  for (const page of PAGES) {
    it(`${page.id}: ${page.what}`, () => {
      const { child, parent } = pageRows(page.edit);
      expect(readAnchor(child, parent, PAGE_KEYS), `${page.id}: readAnchor reads the page exactly as written here`).toEqual(page.reading);
    });
  }
});
