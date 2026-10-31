/**
 * wb-x0xu.2 (HX-STRUCTURAL-INFORMATION-OPTIMIZATION-R2, program-triage-2026-10-22), the posture census. Statement (bead notes,
 * full form): "No Pi surface (adapter, docs, triage output, skill text Pi serves) shall describe HXSI-01..06, TI-*, or the
 * proposed `hx.optim.spoke.exchange.v1` law as a registered or admitted runtime law, a selected hx plan route, Lean-elaborated
 * or benchmarked; Pi echoes the programs' own status words (DESIGN ONLY; not implemented; human proof / Lean source authored
 * only) and, if an HX result ever carries law_id or certificate_refs, echoes them without minting an admission or verification
 * status." (HyperUnix-CLI docs/programs/structural-information-optimization-2026-10-17/07-sequencing-and-gates.md:23@0091719d0288).
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): see ROWS. Gating artifact: none (posture).
 *
 * THE SOURCE AT THE PIN (HyperUnix-CLI 0091719d02887910fa0c2fb6693a32723e243600, read with read-only git show by the cutting
 * seats, 2026-10-23 and 2026-10-24): CSO = docs/programs/certified-structural-optimization-2026-10-18, SIO = docs/programs/structural-
 * information-optimization-2026-10-17. CSO README.md:3 and SIO README.md:3 are STATUS_LINES (sha-256 of each line measured at the
 * pin, blobs 874f5b11f517 and 67824fe38619); HXSI-01..06 are SIO 04-admission-and-semantics.md:22-32 ("## Applicable laws"); the TI
 * rows are SIO 08-theorem-crosswalk.md:7-18 (status legend :20), :30-32 (the 2026-10-18 proof-source update, :26 and :36), :44-48
 * (the factorized evidence and rational exchange proof cut, :50; TI-23 at :47-48), :58-61 (the repair ledger) and :66-72 (TI-31 to
 * TI-52, :72); hx.optim.spoke.exchange.v1 is the law_id (:27) of CSO README.md:23-39 "## Proposed law record (versioned envelope;
 * data model, not existing API)" (the heading at :23, its fenced record :25-39), whose certificate_refs (:35) is ["TI-23"]; CSO
 * README.md:83 "All law admissions remain blocked.". Measured at trunk 883804e (landing 352, respin 2; rider F8 of refusal #2 re-dated the
 * feebb63/7acbcaf measurement): outside .beads/ and this cut's three files, the tracked text files naming HXSI-, TI- or hx.optim. (any case)
 * are landing 332's test/fixtures/hx-cost-certificate-roster.json and test/workbench-hx-cost-certificate-census.test.ts, both under test/,
 * outside the judged surfaces (R8), so every judged sentence that names one today is the dossier's.
 * THIS GROUP'S DOSSIER: Pi holds no dossier of the program-triage-2026-10-22 groups (the owner's triage journal lives in the owner
 * session), and a census can read only what the repository carries, so this census carries the group's dossier at DOSSIER: the two
 * status rows verbatim, the named-ID table (one row per program block at the pin as the seats measured it, each status cell quoting the
 * block's own words) and the posture Pi states. It is a judged surface, never exempt (row A3), and it is FROZEN (row C3): its bytes are
 * composedDossier(), the composition of DOSSIER_INTRO, STATUS_LINES, ID_ROWS and DOSSIER_POSTURE, and its sha-256 is in the roster.
 *
 * READINGS (class-level guard bound by refusal #2, rule 19(d): every docs-reading leg of this census judges what a reader sees; in the
 *   terminal form of cut #4 the readings below describe how each leg reads, and that the reading is what a reader sees is claimed for exactly
 *   the ENUMERATION's pinned set, every known departure a named residual)
 * - (a) JUDGED: SURFACES, the acceptance's five (the three pages, every regular file of docs/workbench/receipts, the dossier), and
 *   WIDE_ROOTS plus the repository root's pages: the statement's surfaces (docs, the adapter in src, the skill text Pi serves in .agents
 *   and .pi) with qa and examples. Read as UTF-8; a hidden entry is read like any other; a symlink is refused, never followed (row A1
 *   pins both on a synthetic tree). A PAGE is a Markdown file (.md, .markdown or .mdx, in any case) or an HTML file (.html, .htm); a
 *   root page is a page at the root. Every judged file is read by the RAW LEG; a page is read by the RENDERED and HTML LEGS too, and a
 *   sentence any leg refuses is a finding (the landed wb-973.5 two-leg form, test/workbench-docs-shared-filesystem-census.test.ts).
 * - RAW LEG (every file; what a reader served the file's source sees, the skill text Pi serves among them): the source cut into
 *   sentences, a qualifier read where the sentence's source holds it. On a page it is additional strictness only, so a claim hidden from
 *   the rendered page (an HTML comment, a link target) still reds.
 * - RENDERED LEG (pages; what a reader of the rendered page sees): marked 18.0.11, the lexer test/helpers/census.ts uses, lexes the page
 *   once. A unit is a paragraph, a heading, the blocks of a list item or block quote, a table row (its cells joined by " | "), a code
 *   block, an HTML block, and a link's or an image's title (a tooltip, read on its own). A unit renders its text with backslash escapes
 *   and code spans as written; emphasis, strikethrough and link text flattened; a link destination, a reference definition and a task
 *   checkbox render nothing. HTML - an HTML block, an HTML page and an inline HTML token - renders as the HTML standard's tokenizer reads
 *   it, in exactly the forms HTML_MARKUP names and MR4 pins one by one (cut #4, refusal #3's family 1): a comment renders nothing and closes
 *   at once when written "<!-->" or "<!--->", any other at its first "-->" or "--!>", or at the end; "<?", "<!" that opens no comment (a
 *   declaration, a CDATA section in HTML content) and "</" followed by anything but a letter open a bogus comment that renders nothing to
 *   the first ">" ("</>" alone drops); a start or end tag renders nothing from its "<" through its name (any characters up to white space,
 *   "/" or ">") and its attributes to the first ">" outside a quoted value (tagEnd, one reading for every kind of tag - the start and the end
 *   tag of an ordinary, a block-level, each RCDATA and each raw-text element - in exactly the members row M lists for MR4: its whole
 *   transition table through every kind of tag in an HTML block and on an HTML page, and in an inline token, wherever marked's tag rule reads
 *   the tag - its attributes separated by any JavaScript white space, so also by U+00A0 and the rest of INLINE_SPACE, which the HTML
 *   tokenizer reads as ordinary characters (FOLLOW-UP wb-a7w6) - through the start tag of each kind but plaintext's at every cell such a tag
 *   can reach, a tag the census ends inside marked's token among them, and through a start tag whose name an INLINE_SPACE member runs on (so
 *   it opens an element of no kind the census knows) under each inline kind's name; a tag the input ends inside drops, with the rest); the
 *   text of a textarea or title element (RCDATA) renders as written to its end tag, its references decoded and its comments and tags shown
 *   as text; the text of a script, style, xmp, iframe, noembed, noframes or noscript element renders as written to its end tag, and a
 *   plaintext element's to the end, references not decoded (a page shows only the xmp's and the plaintext's, so the others are an
 *   over-read); a tag that opens or closes a block-level element (BLOCK_TAGS) breaks the sentence (in an inline token a br tag breaks the
 *   line). So an inline HTML token renders nothing of a tag, and the text after a comment or a bogus comment that the standard closes
 *   before marked's token ends (IC1, PI1, CD1); a tag written in a form marked's tag rule does not read (an end tag holding attributes
 *   among them) is no inline token, and a paragraph shows it as written. Character references are decoded as marked passes them on (with
 *   their ";": decimal of 1-7 digits, hex of 1-6, a name): a numeric one as its code point, a NAMED_REFERENCES name as its characters, any
 *   other name as one BLANK (R11 names where a browser reads them otherwise); never inside code or raw text, which show them as written. A
 *   default-ignorable code point and a control other than tab and line feed render nothing (an UNREAD one is never judged as read: UNREAD
 *   below); a bidirectional control renders nothing but may reorder: each outermost right-to-left override span (to its closer, or the
 *   unit's end) is read in reverse, as a reader sees it, and a unit holding any bidirectional control reads no qualifier. What a reader may
 *   see or hear (struck text, an image's alt text, an HTML block's text) is read for names and claims; a QUALIFIER counts only where a
 *   reader plainly sees it - never in struck text, alt text or an HTML block, and never in a sentence that holds an inline HTML token,
 *   since a page may hide what an element holds.
 * - HTML LEG (pages): the source of every HTML token at any depth, comments and attributes included, cut into sentences; a name beside a
 *   claim is a finding whatever qualifies it (a title or alt attribute, or a comment, is read by some readers on its own).
 * - UNREAD (every judged file; cut #4, refusal #3's family 2): the code points no leg reads - the four Hangul fillers U+115F, U+1160, U+3164
 *   and U+FFA0 (exactly the Default_Ignorable_Code_Point letters, which HarfBuzz 7.0.0, the shaper of Chromium and Firefox, draws as a
 *   spacing glyph, so neither the rendered leg's "render nothing" nor the raw leg's "a letter" is what a reader sees), every control but
 *   tab, line feed and carriage return (a browser shows a form feed as white space and the others as a box), and the census's own markers
 *   BREAK (U+2029) and BLANK (U+FFFC). Each line of a judged file that holds one is a finding, whatever the line says (UNREAD_POINTS; MU).
 * - SENTENCE: a text cut at a run of white space after ".", "!", "?" or ";" (never after a list number or a dotted name prefix,
 *   so "hx.optim." stays inside its sentence), at a blank line and before a table row; a raw Markdown text is also cut before a heading,
 *   a list item and a block quote line, and a rendered unit at each block-level break. A code comment's wrapped lines stay one sentence.
 * - MENTION: a sentence carrying a NAMES prefix that touches no letter or digit on its left, any case. CLAIM: a CLAIMS form, a
 *   whole word, any case. QUALIFIER: a QUALIFIERS phrase, the programs' own status words, any case and any of "-", "_" or white
 *   space between its words. Claims and qualifiers are read with every name token and file path blanked (BLANK, so no word is read
 *   inside one and no two words join across one: "DESIGN HXSI-02 ONLY" holds no qualifier).
 * - FINDING: a mention carrying a claim and no qualifier, reported `<path>:<line> <names>: <leg>unqualified-<claim>` for the first
 *   CLAIMS member it carries, the leg "" (raw), "rendered-" or "html-". A negated claim ("is not registered") is a finding too: Pi echoes
 *   the programs' words, never its own. A line holding an UNREAD code point is reported `<path>:<line> <code points>: unread-code-point`,
 *   each code point written "U+XXXX" and joined by "+" in the order they first appear on the line.
 * - ANCHORS: a surface's or root's anchor token is read from the file's source bytes; it proves the walk reached the real file (walk
 *   liveness) and is no docs-truth reading - the docs-truth readings are rows A2-A7 and C.
 * - (b) READER LEG: law_id 'hx.optim.spoke.exchange.v1' and certificate_refs ['TI-23'] planted at every site of a provider
 *   reading (SITES: every object two keys deep, read from the reading itself) over every base reading (BASES: each kind of the
 *   adapter's exported HYPERUNIX_EXECUTION_KINDS, unlicensed and runtime-licensed) reach no field of the reader adapter's outcome
 *   (its projection, or its typed refusal for the mutation kinds), the native-evidence projection or the live verdict, which
 *   equal their base exactly; each plant is read back from its input, never assumed. Through the registered hyperunix.find
 *   provider (SDK_SITES: every object of the SDK document one key deep) the vendored SDK keeps the pair only in its lossless
 *   extensions sidecar, which the provider output echoes byte for byte and nothing reads; every other SDK site drops it. No
 *   output gains an admitted, registered, verified or checked token (the surfacing and token readers carry positive controls).
 *   On landing: the vendored SDK's declarations and the HX modules name no law field today (LAW_FIELDS read from the parsed
 *   source - an identifier or a string literal, never a comment - with declaration and bare-mention controls); a successor that
 *   names one flips row B5, and the cut that lands it owes the verbatim facet the statement asks for.
 * - (c) THE DOSSIER AS A READER SEES IT: every dossier section is read through the shared rendered view of test/helpers/census.ts
 *   (docsSection / sectionTables / sectionMatches: marked's lexer; the heading exactly once in the rendered view, under its exact
 *   parent heading path; the section running to the next heading of level 1-2, or of its own deeper level, so a "####" belongs to
 *   a "###" status section and a "###" to "## Named IDs"; an HTML comment or code fence spanning a heading refused; the whole
 *   rendered block list compared, HTML-free). Each "### <cite>" status section is exactly its path paragraph and its one quote,
 *   whose source line is the program line byte for byte, once in the dossier, with its measured sha-256 (C1); the named-ID rows
 *   are read from the "## Named IDs" section's OWN table through the same binding, each naming one family, citing its program rows
 *   and echoing a status word (C2); the four sections render exactly the composed blocks and the headings in order, the posture
 *   carries the filing's claim span, status words and law pair read from the bead export, and the bytes are frozen (C3). Every
 *   reader carries red controls, each applied to the live bytes and refused by code: SHAPES S1-S9 (the refusal's dossier probes)
 *   and S10-S14 (one per check no probe isolates: a paragraph inside a pinned section, a re-split row and a bolded cell that render
 *   the same, a line above the title, an extra section), plus coordinated hollows that edit a pin and the dossier together (CH1-CH4,
 *   one per row rule, and CH5, HTML carried in a pin; a status line rewritten with its pin, refused by the sha-256 measured at the
 *   pin). The table count is implied by the block match and only guards the grid read. The source checks beside the rendered view (a
 *   status line's source once, the bytes, the title line) only add strictness.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the walk of the five surfaces (floors, anchors, no symlink) and the walker's own controls (a synthetic
 *    tree with hidden entries and a symlink, entryOf's kinds, the live lister seeing hidden entries); A2 the live census over them
 *    returns no finding in any leg; A3 the dossier is judged in the raw and rendered legs and names every family beside its claims, each
 *    claim qualified, and carries no HTML for the HTML leg; A4 a claim planted in each surface reads exactly its raw and rendered
 *    findings and its qualified twin stays quiet; A5 the statement's wider surfaces walk and stay quiet, and the root page kinds are read
 *    by extension in any case; A6 a claim planted in a .ts, a .yaml and a .mjs file of the wider surfaces reads exactly its finding and its
 *    qualified twin stays quiet, so the judge reads every kind of file it walks; A7 the rendered-view plants VIEW_PLANTS (refusal #2's
 *    GA1-GA11, GA1r and GA2r byte for byte, and the seat's RV1-RV24) each read exactly their findings on the live tree, and the probes
 *    refusal #2 orders pinned red, its two controls and the probe texts its findings quote are read from the bead export (an outside
 *    anchor), each carried by a plant that reads it so, so a probe removed from every literal here and the roster still reds; A8 refusal
 *    #3's plants REFUSAL3_PLANTS (its 18 survivors HB1-HB5r, HB7, HB8, TA1, IC1, PI1, CD1, HF1-HF6r and HF7ts and its controls HBC1, HBC2,
 *    HC2 and HC3, byte for byte, with its F3 over-refusal HO1) each read exactly their findings on the live tree (the named surfaces and the
 *    wider walk, so HF7ts reads in the adapter), and the survivors refusal #3 grades, the probes it orders pinned red, its controls and the
 *    probe texts it quotes are read from its record in the bead export (an outside anchor), each carried by a plant that reads it so. A4,
 *    A6, A7 and A8 compare the findings a plant ADDS (the live findings, moved by the plant's lines, taken out), so a live finding reds A2
 *    or A5 by name and never reads as a plant mismatch (rider F5).
 *  B, acceptance (b). B1 the reader adapter; B2 the registered provider and the SDK sites; B3 the native-evidence projection; B4
 *    the live verdict; B5 the landing tripwire over the declarations, with its bare-mention and comment controls.
 *  C, acceptance (c). C1 the two status rows verbatim, as a reader sees them; C2 the named-ID rows and their status words, from the
 *    section's own table; C3 the whole dossier as a reader sees it, anchored to the filing, its bytes frozen.
 *  F, the outside anchor. F1: the owner filing row of wb-x0xu.2 in the tracked bead export (.beads/issues.jsonl) states each of
 *    its acceptance clauses exactly as the label of rows A, B and C (whole clause, so a shortened label reds); clause (a) lists exactly SURFACES (in order) and exactly the NAMES prefixes; the statement's
 *    surface list (adapter, docs, triage output, skill text Pi serves) reads onto judged paths (STATEMENT_SURFACES); every claim word of
 *    clause (a), clause (b) and the statement diagnoses as its CLAIMS member; the statement's status words are the first four
 *    QUALIFIERS, and the program lines the note quotes (CSO README.md:3, CSO README.md:83, SIO 08:72) carry exactly the other
 *    two, each claim-bearing sentence of them qualified on its own (so each of those qualifiers and the human-proved form is
 *    anchored); clause (b) holds LAW_ID, CERTIFICATE_REFS and TOKENS; clause (c) cites exactly the STATUS_LINES
 *    cites; the note's CSO README.md:3 quote equals that status row, and wb-x0xu.1's SIO README.md:3 quote sits inside the SIO
 *    row; the statement's pin is PIN. So removing a surface, a name, a claim, a qualifier or a status row from every literal of
 *    this file and the roster still reds. Row C3 reads the same export for the dossier's posture. The export is a JSON string, not a
 *    rendered page, so F1 and C3 read the filing's notes as written.
 *  M, the instruments rows A-C read, each pinned member by member: MS1-MS4 the sentence cutter, MN1-MN3 every spelling and near
 *    miss of every name, MC every claim form (the negated form included), MQ every qualifier form, MF the finding format, MK the
 *    name and path mask (no qualifier assembled across a blanked token), all four in the raw leg; MR1 the rendered leg's inline
 *    reading (comments, tags, link targets and titles, alt and struck text, escapes, character references, code spans, invisibles,
 *    bidirectional overrides, breaks), MR2 its blocks and their source lines, MR3 the whole judge's legs on single pages (the cured R4 and R5 members among them),
 *    MR4 the HTML_MARKUP forms one by one (each comment close, each bogus comment, a tag's name and its attributes - a double- and a
 *    single-quoted value, each holding the other quote, and an unquoted one; the solidus transition; "=" and a name right after a quoted
 *    value; each white space a tag reads (a space, a tab, a line feed, a form feed, and a carriage return on an HTML page, since marked
 *    reads a Markdown page's as a line feed) at each place it reads one: ending the tag's name, before an attribute's name, after it, a
 *    second one after it, before a value, after an unquoted value, after a quoted value, after a solidus, and inside a double- and a
 *    single-quoted value; "/" ending the tag's name; ">" ending the tag after an attribute's name and before a value; a quote of either
 *    kind inside an unquoted value; and tagEnd's whole transition table: each of its nine states reading each character class (each white
 *    space, "/", "=", each quote, ">" and any other character, a letter standing for that class), told by a pinned text from every other
 *    target it could take - another state or the tag's end - except a target that reads alike (the name and after-name states move alike
 *    on every character, as do the attributes, after-quoted and self-closing states, so no text tells them apart and none is claimed) -;
 *    each of those texts of an ordinary start tag in an HTML block read through every other kind of tag (EVERY_TAG, RESPIN 2 of wb-jh2f: an
 *    ordinary and a block-level end tag, a block-level start tag, each RCDATA and each raw-text element's start and end tag and a plaintext
 *    start tag, each in an HTML block and on an HTML page, a line feed member also as its carriage-return twin on an HTML page; and in an
 *    inline token the start tag of an ordinary, a block-level, each RCDATA and each raw-text element that ends, each closed by its end tag,
 *    for each text whose attributes marked's tag rule reads), each reading what that start tag's pinned outcome predicts; ordinary start
 *    tags whose attributes marked's tag rule reads, one per group of the cells an inline token reads that the table's texts leave untold
 *    there, read through every kind the same way, and one per group of the cells an inline token reaches through a JavaScript white space
 *    the HTML tokenizer reads as an ordinary character (FOLLOW-UP wb-a7w6: U+00A0 at a separator, inlinecellao to inlinecellbl, read
 *    through every kind the same way, a tag the census ends inside marked's token among them, so every inline-token redirection such a
 *    tag can tell apart reds MR4 through every inline kind); each INLINE_SPACE member (the engine's \s beyond HTML white space) after "="
 *    in an ordinary start tag (spaceclass, read through every kind the same way) and right after an inline span start tag's name, which it
 *    runs on (runon, read by RUN_ON under every other inline kind's name, plaintext's among them, alike); a tag's name holding a double
 *    quote, a single quote, "=", "<" and a character outside ASCII, each read whole; a carriage return in an ordinary start tag, which
 *    EVERY_TAG reads on an HTML page on one line and on a Markdown page as a line feed; a tag written in each form marked's tag rule does
 *    not read (a quote or "=" starting an
 *    attribute, a quote inside a name or an unquoted value, "=" inside an unquoted value, "/" before anything but ">", a name or "=" right
 *    after a quoted value, ">" or "=" right after "="), which a paragraph shows as written, one text per form; a double- and a
 *    single-quoted value holding ">", member by member, in the start tag of a block-level, each RCDATA and each raw-text element
 *    (plaintext's among them) and the end tag of an ordinary, a block-level, each RCDATA and each raw-text element that ends, in an HTML
 *    block and on an HTML page, and in an inline token in the start tag of an ordinary, a block-level, each RCDATA and each raw-text
 *    element that ends; a double- and a single-quoted value holding the other quote and ">"; an end tag holding attributes, which is no
 *    inline token; a block-level start tag in an inline token ending in each state marked's tag rule ends a tag in; a tag the input ends
 *    inside, each RCDATA element (textarea, title) and each raw-text element that ends (script, style, xmp, iframe, noembed, noframes,
 *    noscript) read to its end tag, one reading for both (closingTag), each one's end tag bounded by each white space (as above), "/" and
 *    ">", on the RCDATA and on the raw-text side an end tag in any case and one whose name runs on (no end tag), each RCDATA and raw-text
 *    element's text (a plaintext element's among them) shown as written with its comments and tags as text, an RCDATA element's references
 *    decoded and a raw-text element's kept, a plaintext element that never ends (even at a plaintext end tag), the inline tokens the
 *    standard closes early, and an inline tag), MU the UNREAD code points (each filler, controls, the markers, in a page and in code)
 *    beside the code points that stay read.
 *  R, the residuals' pinned quiet rows (R1-R12).
 * ENUMERATION (cut #4; rule 19(c) engaged at refusal #3; the owner's reading of 2026-10-24: the R739 terminal enumerate-the-resolvable
 * form, the chain capped at this cut): for U1 RENDERED-TEXT DOCS TRUTH the census claims exactly its pinned set - refusal #2's members and
 * the seat's (A7: GA1-GA11, GA1r, GA2r, RV1-RV24), refusal #3's survivors, controls and over-refusal (A8), and the instrument members of
 * rows M (MR1-MR4, MU) - and nothing beyond it: every known departure of a leg from what a reader sees is a NAMED RESIDUAL with a pinned
 * quiet row (R1-R11, and R12 from FOLLOW-UP wb-a7w6), and NOT CLAIMED bounds the rest. An escape found outside the pinned set is a
 * residual-list addition for the owner (a FORM question), not a claim this census makes.
 * ENUMERATION of wb-jh2f (cut #3; rule 19(c) engaged at refusal #2 through the rule 19(d) class reading): for the class refusal #1's
 *   guard names - an attribute or end-tag member that a header or note sentence claims - the census claims exactly row M's MR4 members as
 *   listed (the attribute and end-tag forms one by one, tagEnd's transition table through an ordinary start tag and through EVERY_TAG every
 *   other kind of tag, a quoted ">" kind by kind and context by context, the forms no inline token holds) and nothing beyond them; a member
 *   of the class row M does not list is NOT CLAIMED (below). The departures of the tag reading from what a reader sees that the seats know
 *   are NOT CLAIMED forms named below, each a reading this census does not make (the tokenizer state carried from one block or inline token
 *   into the next, a script element's escape states, foreign content). An escape found outside the pinned set is a residual-list addition
 *   for the owner, not a claim this census makes.
 * ENUMERATION of wb-a7w6 (hop 3 of the landing-418 chain, R739's terminal form): for the class gate F1 of landing 532 names - a tagEnd cell
 *   an inline token reaches through a JavaScript white space marked's tag rule reads as a separator - the census claims exactly row M's MR4
 *   members as listed (inlinecellao to inlinecellbl through EVERY_TAG, spaceclass and runon for each INLINE_SPACE member, RUN_ON) and
 *   nothing beyond them: a redirection no such tag tells apart is NOT CLAIMED (below), and the inline plaintext departure is the named
 *   residual R12. An escape found outside the pinned set is a residual-list addition for the owner, not a claim this census makes.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label and
 * pins, every pin's witness and the vocabularies, the rendering's tables, the frozen dossier's text and sha-256 - is held to the
 * out-of-file roster (ROSTER_FILE). A last case reads that every pin's case ran to its end. Not claimed: a single pin removed from ROWS,
 * the literal, IMPL and the roster together (F1 anchors each acceptance clause to its row, and the vocabularies, not each pin); a
 * WIDE_ROOTS root beyond the statement's four items (qa, examples, .pi) or a single inflection form of a claim removed from every literal
 * and the roster together (F1 anchors each statement item to one judged root and each claim through its filed word, not every root or
 * form); a named-ID row's line range, removed or narrowed in the dossier, ID_ROWS and the roster together, and a whole named-ID row (a
 * program block) removed from the dossier, ID_ROWS and the roster together with the dossier sha-256 re-pinned (rider F4: C2 holds every
 * family to a row and C3 the posture to the filing, but nothing outside the census counts the SIO 08 blocks - the ranges and the block
 * list are the seats' measurements at the pin, as STATUS_LINES are); the SIO status line beyond wb-x0xu.1's quoted span ("**Status:**
 * DESIGN ONLY; no new optimizer feature implemented"), changed in STATUS_LINES, the dossier and the roster together with both sha-256
 * values re-pinned (rider F3: the census is hermetic and no Pi file outside it carries the whole line; the CSO line is anchored whole
 * through the filing's quote); NAMED_REFERENCES beyond the HTML5 table measured at the cut (python3 html.entities.html5, 2231 names; the
 * census does not re-read the HTML5 table); a page in another markup (reStructuredText, AsciiDoc: none on a judged root at the cut),
 * read by the raw leg only; styling applied from outside the page, or a renderer other than marked; a numeric reference from 128 to 159,
 * which browsers read as Windows-1252 and this census as a control (it renders nothing, so it can only join a name or a word - an
 * over-read); an HTML block's text, read with its tags removed, not laid out; the HTML standard's tokenizer state carried from one block or
 * inline token into the next (an element, a comment or an attribute value that marked's block or token leaves open), each read on its own;
 * a script element's escape states (its text runs to the first "</script"); a character of tagEnd's "any other character" class beyond
 * the letters and the INLINE_SPACE members MR4's texts read it through (such as "<", "`" or a digit), which tagEnd reads like a letter but
 * no pin holds one by one; a redirection of a tagEnd cell that no tag marked's tag rule reads can tell apart in an inline token, any
 * JavaScript white space as its separator included (FOLLOW-UP wb-a7w6, measured on this cut: 153 of the 891 inline-token cell
 * redirections - the 82 targets that read alike in every context, which row M names, and the 71 redirections of tagEnd's carriage-return
 * cells, which no inline token reads because marked reads a Markdown page's carriage return as a line feed, and which EVERY_TAG pins
 * through every kind of tag on an HTML page); a start tag whose name an INLINE_SPACE member runs on, read in an HTML block, on an HTML page
 * or as an end tag (RUN_ON reads it in an inline token only);
 * an svg or math element's content (foreign content), read as
 * HTML content, where a CDATA section is text (shown undecoded, as the raw leg reads it) and a title or style is no RCDATA or raw-text
 * element; the Unicode bidirectional algorithm beyond reversing each
 * outermost right-to-left override span (an override nested in another, or the reordering an isolate or an embedding gives mixed-direction
 * text), where no qualifier counts in any case.
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 R-QUALIFIER-ANYWHERE a qualifier anywhere in the sentence admits
 *   it, whatever it qualifies - a sentence as the census cuts it, so a sentence end of another script (an ideographic or fullwidth full
 *   stop) joins two sentences a reader sees apart, as do a hard line break and a sentence end followed by a closing quote or parenthesis
 *   (refusal #3 F4); R2 R-SPLIT a claim carried by another sentence (a pronoun, or a cut after an abbreviation such as
 *   "e.g."); R3 R-PARAPHRASE a claim outside CLAIMS (ships, runs, is the runtime law), a one-word negation among them (unregistered
 *   and its sibling for every claim but plan route, which has none; the negated form the census reads is "is not <claim>": MC); R4
 *   R-LOOKALIKE a look-alike letter, a look-alike hyphen (U+2010, U+2011, U+2013, U+2212) or a look-alike dot (U+2024) inside a name, in
 *   any file (the rendered leg folds no look-alike), and an inserted invisible inside a name in a file that is not a page (a page's
 *   rendered leg drops it: MR3); and, inside a claim word, a look-alike letter in any file and an inserted invisible (U+200B, U+00AD,
 *   U+2060, U+FE0F) in a file that is not a page (a page's rendered leg drops each, so the claim reads there: MR3); R5 R-ENCODED a
 *   JS escape inside a name, in any file (a page shows it as written), and an HTML reference inside a name in a file that is not a page (a
 *   page's rendered leg decodes it: MR3); R6 R-COMPOSED a name assembled from literal parts; R7 R-CODE-LIST a list inside a code comment is
 *   one sentence, so one item's qualifier covers another; R8 R-OUTSIDE-ROOTS a file outside the judged surfaces (test/, vendor/,
 *   node_modules/, .beads/, new-feedback/, media/, dist/, .codex/, .github/ and the root's files that are not pages, such as forge.toml,
 *   package.json, biome.json, tsconfig*.json, vitest*.ts, LICENSE and .gitignore) - the bead export is the requirement's own text
 *   and carries findings when judged; R9 R-TRIPWIRE-SPELLING a successor law field spelled outside LAW_FIELDS (lawRecord,
 *   certificates_ref) leaves row B5 quiet; R10 R-PATH-MASK a claim or status word inside a file path never counts (the mask that
 *   keeps "04-admission-and-semantics.md" from reading as a claim); R11 R-REFERENCE the reference model beside a browser's (cut #4,
 *   seat-found; each member pinned quiet with its name written as a reference, so the raw leg cannot read it either): (a) a name outside
 *   the HTML5 table that begins with a legacy name, which a browser decodes as that name and the rest as written ("&notregistered;" shows
 *   a not sign, then "registered;"); (b) in HTML content a reference without its ";" (a legacy name, or a numeric one) or a numeric one of more digits,
 *   which a browser decodes; (c) a reference to a line break, which cuts a rendered sentence a reader sees whole; (d) a reference in an
 *   attribute value (a title a reader sees as a tooltip), which the HTML leg reads as written; (e) a numeric reference to an UNREAD code
 *   point, which the rendered leg drops; R12 R-INLINE-PLAINTEXT (FOLLOW-UP wb-a7w6, gate rider F4 of landing 532) a plaintext start tag in
 *   an inline token, whose element a reader's tokenizer runs past marked's token to the end of the page while the census reads the token on
 *   its own (the carried tokenizer state NOT CLAIMED names above), so what follows it renders as the page's own inline content and a comment
 *   or a tag after it, which a reader sees as written, renders nothing; pinned quiet with a claim in such a comment and the qualifier in a
 *   comment before the start tag (the raw leg reads the qualifier, the rendered leg drops the claim and the HTML leg reads no name beside
 *   it), beside its control twin, whose claim stands outside the comment and reds in the rendered leg, so a page the census stops reading
 *   reds the row.
 * RESPIN 1 (gate g10-gate-s73 refusal #1 of cut cb229d8e): U1 RENDERED-TEXT DOCS TRUTH cured - C1 and C2 read the dossier through the
 *   shared rendered view, so a section hidden in an HTML comment is refused (S8, S9); U2 DOCS SECTION BOUND + HEADING-UNIQUENESS +
 *   SAME-VIEW cured - C1's sections run to the next heading of level 1-3, "## Named IDs" binds once in the rendered view and its rows
 *   come from its own table, and the dossier is frozen with its posture pinned (S1-S7); S1-S9 are pinned as red controls. Riders
 *   cured: F3 (row A6), F4 (row A1's walker controls), F5 (row B5 reads parsed code, with bare-mention and comment controls), F6
 *   (one named-ID row per program block, its own words quoted), F7 and F8 (R4 and R8 name the families with pinned quiet rows),
 *   F12 (CSO README.md:23-39).
 * RESPIN 2 (gate g10-gate-s78 refusal #2 of cut 8579f9eb): U1 RENDERED-TEXT DOCS TRUTH cured at class level - rows A2-A7 judge every
 *   page in the rendered and HTML legs beside the raw leg, so a qualifier held only by an HTML comment (GA1, GA1r), a link target (GA2), a
 *   link title (GA7) or a tag attribute (GA8) never qualifies, and GA1, GA1r, GA2, GA7 and GA8 are pinned red in A7 beside the controls
 *   GA10 (red) and GA11 (quiet); the seat's members of the same class (an image's alt text or title, a reference definition's title,
 *   struck text, a hidden element, an HTML block, a block-level tag, a claim in a title, an attribute or a comment beside a visible
 *   qualifier, a right-to-left override, a direction mark) are pinned in A7 as RV1-RV24. Riders cured: F2 (GA3-GA6, the reverse
 *   direction - a name or claim a reader sees whole that the source splits - red in A7 through the rendered leg, as are references,
 *   invisibles, overrides and block structure), F3 and F4 (named under
 *   NOT CLAIMED above), F5 (A4, A6 and A7 compare the plant delta), F7 (a root page is read by its extension in any case; .MD, .markdown,
 *   .mdx and HTML pages are pages), F8 (the measurement above re-dated). Seat-found: the mask blanked with white space, so a qualifier
 *   could be assembled across a blanked name or path; it blanks with BLANK now (MK).
 * RESPIN 3 (gate g10-gate-s79 refusal #3 of cut d1635425; rule 19(c) engaged; cut #4 in the terminal form, ENUMERATION): U1 RENDERED-TEXT
 *   DOCS TRUTH cured for the pinned set and enumerated beyond it. Family (1), the markup model: HTML_MARKUP takes the HTML standard's
 *   comment closes ("<!-->", "<!--->", "--!>"), bogus comments, tags read to their end (tagEnd) and RCDATA and raw-text elements, in an
 *   HTML block, an HTML page and an inline token, so HB1-HB5r, HB7, HB8, TA1, IC1, PI1 and CD1 (HB7 and CD1, PLAUSIBLE at the gate, are
 *   reached by the same forms) are pinned red in A8 beside the controls HBC1 and HBC2. Family (2), the code-point model: UNREAD refuses
 *   the four Hangul fillers, so HF1-HF6r and rider F2's HF7ts are pinned red, with F3's over-refusal HO1. HC2 (red) and HC3 (quiet) are
 *   kept. The two model claims the gate falsified ("an HTML block renders its source with comments and tags removed"; "a default-ignorable
 *   code point renders nothing") now hold for the pinned set (READINGS RENDERED LEG and UNREAD). F4's two members are pinned quiet in R1;
 *   the reference-model departures the seat found are named R11 with pinned quiet rows. A8 reads refusal #3's record from the bead export
 *   by first occurrence, as A7 reads refusal #2's.
 * FOLLOW-UP wb-jh2f (the R694 follow-up of landing 418, gate cmd_79999c99a90c F1-F5; owner ruling R767): Q1 is answered PIN, not
 *   narrow - cut #1 pinned in MR4 a single-quoted value (each quote inside the other), the solidus transition, the transitions after a
 *   quoted value ("=", white space, a name), white space after a solidus and a second white space after a name, and an end tag bounded by
 *   a tab, a line feed, a form feed, a carriage return (on an HTML page) and "/", so the gate's partial mutants GH1-GH6b each red MR4; that
 *   left members the READINGS sentences on a tag's attributes and its end tag describe unpinned (refusal #1: U1 and U1b), which RESPIN 1
 *   below cures. Q2: R4 extends from names to claim words (F2's invisibles in
 *   a file that is not a page and F3's look-alike letters, each pinned quiet, with a page twin per invisible red in MR3); CLAIMS
 *   'elaborated' carries its base, -s and -ing forms (F4; the gate's plants L2-IN1 and L2-IN2 red in MC); F5's one-word negations are
 *   named R3 members, pinned quiet.
 * RESPIN 1 of wb-jh2f (gate g10-gate-s100 refusal #1 of cut 14ffa637, record honesty; the class-level guard that refusal bound, rule
 *   19(d)): U1 cured - MR4 pins a space-bounded end tag of each RCDATA and raw-text element that ends, so G16 (closingTag's boundary
 *   without the space) reds MR4; U1b cured - MR4 pins each white space a tag reads at each place it reads one, and each RCDATA and
 *   raw-text element's end tag under each boundary member (a space, a tab, a line feed, a form feed, a carriage return on an HTML page,
 *   "/" and ">"), so G07, G08, G09 and G10 (tagEnd's white space without a tab, a line feed, a form feed or a carriage return) and G18
 *   (closingTag's boundary narrowed on the raw-text side) each red MR4, and G14 (a plaintext element that ends at its end tag) reds it
 *   too. Beyond the guard's members MR4 pins tagEnd's whole transition table and each element's text (row M). CORRECTED at RESPIN 2: cut
 *   #2 said here that a tag therefore reads to the first ">" outside a quoted value in every state on every character class, and that the
 *   READINGS clauses on a tag claim exactly row M's MR4 members; its table's texts held an ordinary start tag in an HTML block only, and
 *   refusal #2 measured the attributes of an end tag (ET1-ET3) and of an RCDATA, a raw-text and a block-level start tag (ST1-ST4) unpinned.
 * RESPIN 2 of wb-jh2f (gate g10-gate-s100 refusal #2 of cut bbf4457a, record honesty; rule 19(c) engaged through the rule 19(d) class
 *   reading, so this cut #3 takes the enumerate-the-resolvable form, ENUMERATION of wb-jh2f below): U1 cured - MR4 pins the end tag of an
 *   ordinary, a block-level, each RCDATA and each raw-text element that ends holding a double- and a single-quoted value with ">", in an
 *   HTML block and on an HTML page, so ET1 (an end tag read to its first ">", quotes ignored), ET2 (RCDATA and raw-text end tags read so)
 *   and ET3 (ordinary end tags read so) each red MR4; U2 cured - MR4 pins the start tag of a block-level, each RCDATA and each raw-text
 *   element (plaintext's among them) holding such a value, in an HTML block and on an HTML page, and in an inline token for each but
 *   plaintext, so ST1 (RCDATA and raw-text start tags read to their first ">"), ST2 (RCDATA), ST3 (raw text) and ST4 (BLOCK_TAGS start
 *   tags) each red MR4. Beyond the members refusal #2 measured, EVERY_TAG reads each text of an ordinary start tag in an HTML block through
 *   every other kind of tag (row M), so the transition table and each white-space place are pinned through every kind of tag in an HTML
 *   block and on an HTML page, and in an inline token through every cell a tag marked's tag rule reads can reach; the READINGS clause on a
 *   tag claims exactly these members, and NOT CLAIMED names the cells no inline token reaches. CORRECTED at FOLLOW-UP wb-a7w6 (gate
 *   cmd_fab798d0203b F1, landing 532): cut #3 said here and in READINGS that MR4 pins an inline token "through every cell a tag marked's tag
 *   rule reads can reach", and in NOT CLAIMED that marked hands an inline token attributes only after white space; marked's tag rule
 *   separates attributes with JavaScript's \s, which also matches U+00A0 and the rest of INLINE_SPACE, characters the HTML tokenizer,
 *   HTML_MARKUP's name class and tagEnd read as ordinary ones, and the gate confirmed 263 such inline-token cell redirections at 0 failed of
 *   46 (266 by its model). The two cut #3 delivery-note lines that rest on the same reading (CELL CLASS SPLITS: "0 observable survivors";
 *   XS: "unobservable through any token marked's tag rule reads") are corrected append-only in the bead record.
 * FOLLOW-UP wb-a7w6 (the R694 follow-up of landing 532, gate cmd_fab798d0203b F1-F4; hop 3 of the landing-418 chain): F1 is answered PIN,
 *   not narrow - MR4 pins inlinecellao to inlinecellbl, which EVERY_TAG reads through every kind of tag (an inline kind's reading predicted
 *   from the start tag's pinned outcome and the element's text marked hands over, so a tag the census ends inside marked's token is read
 *   too), so each of the 266 redirections reds MR4 through every inline kind, the gate's 263 among them; spaceclass and runon pin each
 *   INLINE_SPACE member, which RUN_ON holds to the engine's \s and reads under every inline kind's name; READINGS, row M, the ENUMERATION of
 *   wb-a7w6 and NOT CLAIMED claim exactly these members. F2: EVERY_TAG's HTML-page leg reads a carriage return as itself (crpageaa to
 *   crpageac on one line), so a family whose HTML-page leg reads the Markdown page reds MR4 (the gate's EH3). F3: MR4 reads a tag's name
 *   holding a double quote, a single quote, "=", "<" and a character outside ASCII (namedq, namesq, nameeq, namelt, namenonascii), and runon
 *   each INLINE_SPACE member inside a name, so HTML_MARKUP's name class is held by MR4's readings beside the roster's literal (the gate's
 *   NM1-NM5). F4: the inline plaintext departure is the named residual R12, with its pinned quiet row.
 * SCOPE: the vocabularies are this cut's reading of the filing; the program lines are measured at the pin and not re-read here
 * (the census is hermetic), so a program change is seen only when a cut re-measures STATUS_LINES and ID_ROWS.
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; the planted trees and the dossier shapes are in-memory;
 * the pages, the receipts, the dossier, the wider surfaces, the vendored SDK declarations and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson } from "@hyperunix/sdk";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { docsSection, type RenderedBlock, sectionMatches, sectionTables } from "./helpers/census.js";

type Json = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/hx-sio-design-status-roster.json";
const DOSSIER = "test/fixtures/hx-sio-design-status-dossier.md";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-x0xu.2";
/** The sibling child whose filing quotes the SIO README.md:3 status clause (an outside anchor for row C). */
const SIBLING = "wb-x0xu.1";
const PIN = "0091719d0288";
const PIN_COMMIT = "0091719d02887910fa0c2fb6693a32723e243600";

interface Anchor {
  readonly file: string;
  readonly token: string;
}
interface Surface {
  readonly id: string;
  readonly path: string;
  readonly directory: boolean;
  readonly floor: number;
  readonly anchor: Anchor;
}
/** Acceptance (a)'s surfaces, in the clause's order. */
const SURFACES: readonly Surface[] = [
  { id: "D07", path: "docs/workbench/07-native-integrations.md", directory: false, floor: 1, anchor: { file: "docs/workbench/07-native-integrations.md", token: "MechanicalWorkflows and ecosystem native SDK integration" } },
  { id: "D14", path: "docs/workbench/14-qa-and-benchmarks.md", directory: false, floor: 1, anchor: { file: "docs/workbench/14-qa-and-benchmarks.md", token: "Test strategy, conformance suite, benchmark and adversarial controls" } },
  { id: "TRC", path: "docs/workbench/TRACEABILITY.md", directory: false, floor: 1, anchor: { file: "docs/workbench/TRACEABILITY.md", token: "Workbench requirement traceability and release evidence" } },
  { id: "RCP", path: "docs/workbench/receipts", directory: true, floor: 40, anchor: { file: "docs/workbench/receipts/wb-tz2.14.md", token: "# wb-tz2.14: " } },
  { id: "DOS", path: DOSSIER, directory: false, floor: 1, anchor: { file: DOSSIER, token: "# wb-x0xu.2 dossier: " } },
];
interface Root {
  readonly root: string;
  readonly floor: number;
  readonly anchor: Anchor;
}
/** The statement's surfaces - docs, the adapter (src), the skill text Pi serves (.agents, .pi) - with qa and examples; plus the root pages. */
const WIDE_ROOTS: readonly Root[] = [
  { root: "docs", floor: 60, anchor: { file: "docs/workbench/09-observation-and-provenance.md", token: "Reader adapters" } },
  { root: "src", floor: 100, anchor: { file: "src/workbench/hyperunix-observer.ts", token: "HyperUnix hyperunix.find reader adapter" } },
  { root: ".agents", floor: 1, anchor: { file: ".agents/skills/beads/SKILL.md", token: "name: beads" } },
  { root: ".pi", floor: 1, anchor: { file: ".pi/agents/auditor.md", token: "description: Security Code Reviewer" } },
  { root: "qa", floor: 50, anchor: { file: "qa/workbench/boot-import-census.mjs", token: "boot-import-census.mjs" } },
  { root: "examples", floor: 5, anchor: { file: "examples/agent-tool-description.md", token: "Launch a new agent to handle complex, multi-step tasks autonomously" } },
];
const PAGES_FLOOR = 5;
const PAGE_ANCHOR: Anchor = { file: "README.md", token: "pi-subagents" };
/** The statement's surface list, each item read onto the judged path that carries it (F1 reads the list from the filing). */
const STATEMENT_SURFACES: readonly (readonly [string, string])[] = [
  ["adapter", "src"],
  ["docs", "docs"],
  ["triage output", DOSSIER],
  ["skill text Pi serves", ".agents"],
];

interface Name {
  readonly id: string;
  readonly prefix: string;
  readonly source: string;
}
/** The statement's named IDs, as acceptance (a) spells their prefixes. */
const NAMES: readonly Name[] = [
  { id: "HXSI", prefix: "HXSI-", source: "HXSI-01..06, SIO 04-admission-and-semantics.md:22-32" },
  { id: "TI", prefix: "TI-", source: "TI-*, SIO 08-theorem-crosswalk.md:7-18, :30-32, :44-48, :58-61, :66-72" },
  { id: "HXOPTIM", prefix: "hx.optim.", source: "the proposed hx.optim.spoke.exchange.v1 law, CSO README.md:27" },
];
interface Vocabulary {
  readonly id: string;
  readonly source: string;
  readonly forms: readonly string[];
}
/** Acceptance (a)'s five claim words, the statement's two further claims and acceptance (b)'s token, each with its forms. */
const CLAIMS: readonly Vocabulary[] = [
  { id: "admitted", source: "acceptance (a); statement 'a registered or admitted runtime law'", forms: ["admitted", "admit", "admits", "admitting", "admission", "admissions"] },
  { id: "registered", source: "acceptance (a); statement", forms: ["registered", "register", "registers", "registering", "registration", "registrations"] },
  { id: "verified", source: "acceptance (a); statement 'an admission or verification status'", forms: ["verified", "verify", "verifies", "verifying", "verification", "verifications"] },
  { id: "graduated", source: "acceptance (a)", forms: ["graduated", "graduate", "graduates", "graduating", "graduation"] },
  { id: "benchmarked", source: "acceptance (a); statement", forms: ["benchmarked", "benchmark", "benchmarks", "benchmarking"] },
  { id: "elaborated", source: "statement 'Lean-elaborated'", forms: ["elaborated", "elaborate", "elaborates", "elaborating", "elaboration"] },
  { id: "plan-route", source: "statement 'a selected hx plan route'", forms: ["plan route", "plan routes"] },
  { id: "checked", source: "acceptance (b)'s token list", forms: ["checked"] },
];
/** The programs' own status words: the statement's four, then CSO README.md:3's and :83's. */
const QUALIFIERS: readonly Vocabulary[] = [
  { id: "design-only", source: "statement; SIO README.md:3, CSO README.md:3", forms: ["design only"] },
  { id: "not-implemented", source: "statement", forms: ["not implemented"] },
  { id: "human-proof", source: "statement 'human proof'; SIO 08:72 'human-proved'", forms: ["human proof", "human proved"] },
  { id: "source-authored-only", source: "statement 'Lean source authored only'; SIO 08:58 'source-authored only'", forms: ["source authored only"] },
  { id: "no-runtime-law-admitted", source: "CSO README.md:3", forms: ["no runtime law admitted"] },
  { id: "law-admissions-blocked", source: "CSO README.md:83", forms: ["law admissions remain blocked"] },
];

interface StatusLine {
  readonly cite: string;
  readonly path: string;
  readonly text: string;
  readonly sha256: string;
}
/** Acceptance (c)'s two program lines, byte for byte at the pin, with the sha-256 of each line measured there. */
const STATUS_LINES: readonly StatusLine[] = [
  {
    cite: "CSO README.md:3",
    path: "docs/programs/certified-structural-optimization-2026-10-18/README.md:3",
    text: "**2026-10-18. DESIGN ONLY. No runtime law admitted, native Lean elaboration, or benchmark result claimed.**",
    sha256: "cf89230862cf684d39c517c33e670ed29300000d897a1e0f818df04b93245f26",
  },
  {
    cite: "SIO README.md:3",
    path: "docs/programs/structural-information-optimization-2026-10-17/README.md:3",
    text: "**Date:** 2026-10-17. **Status:** DESIGN ONLY; no new optimizer feature implemented, measured or default-enabled by these documents. **Source review:** current HyperUnix-CLI implementation, established performance/LX/affected-frontier programs and companion [Theoretical Inquiry](https://github.com/jehalladay/HyperUnixMathematicalResearch/blob/50250b90ce48cf28bdb8697e01fb848396c8d493/docs/THEORETICAL_INQUIRY_PROGRAM.md).",
    sha256: "410d36ba22c0376fbc6312e82ad3d05df65c1cac2744c92aa9ccb5e5f27ad553",
  },
];

/** Acceptance (b)'s planted values and its token list. */
const LAW_ID = "hx.optim.spoke.exchange.v1";
const CERTIFICATE_REFS: readonly string[] = ["TI-23"];
const TOKENS: readonly string[] = ["admitted", "registered", "verified", "checked"];
/** The law field spellings row B5 reads in the declarations (CSO README.md:27 and :35, and their camel-case SDK forms). */
const LAW_FIELDS: readonly string[] = ["law_id", "lawId", "certificate_refs", "certificateRefs"];
const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
const SDK_DECLARATIONS_FLOOR = 10;
const HX_MODULES: readonly string[] = ["src/workbench/providers/hyperunix.ts", "src/workbench/hyperunix-observer.ts", "src/workbench/native-evidence.ts"];
/** B5's bare-mention controls: a law field named in code (a property access, a string key, a destructured name, an argument) is a hit;
 * a comment naming one is not (wb-x0xu.2 respin 1, rider F5: the comment false-red). */
const LAW_MENTIONS: readonly (readonly [string, readonly string[]])[] = [
  ["const refs = result.certificate_refs;\n", ["certificate_refs"]],
  ['const id = value["law_id"];\n', ["law_id"]],
  ["const { lawId } = result;\n", ["lawId"]],
  ["consume(result.certificateRefs);\n", ["certificateRefs"]],
  ["// never projects certificate_refs\n/* law_id and lawId */\n/** certificateRefs */\nconst kept = 1;\n", []],
];

/** The dossier's rendered title (its one level-1 heading) and the three level-2 sections under it, in document order. */
const DOSSIER_TITLE = "wb-x0xu.2 dossier: hx-sio-cso-design-status-words-never-relabelled";
const STATUS_HEADING = "Status rows";
const IDS_HEADING = "Named IDs";
const POSTURE_HEADING = "What Pi says about them";
/** The dossier's intro paragraphs, under its title. */
const DOSSIER_INTRO: readonly string[] = [
  "The Pi-side dossier of the program-triage-2026-10-22 group behind wb-x0xu.2 (HX-STRUCTURAL-INFORMATION-OPTIMIZATION-R2), from the owner filing on that bead. It records the status words of two HyperUnix-CLI design programs at the filing's pin, HyperUnix-CLI commit 0091719d02887910fa0c2fb6693a32723e243600, read with read-only git show. CSO is docs/programs/certified-structural-optimization-2026-10-18 and SIO is docs/programs/structural-information-optimization-2026-10-17.",
  "test/workbench-hx-sio-design-status-census.test.ts judges every sentence here beside the pages it judges, and holds each status row to its program line byte for byte.",
];
/** The named-ID table: its header and one row per program block at the pin, each cell as its markdown source (marked's cell text);
 * a status cell quotes the block's own words where the block states them (rider F6). */
const ID_HEADER: readonly string[] = ["Named IDs", "Program rows at the pin", "Status words Pi echoes"];
const ID_ROWS: readonly (readonly string[])[] = [
  ["HXSI-01 to HXSI-06", "SIO 04-admission-and-semantics.md:22-32, the applicable laws", "DESIGN ONLY; not implemented (SIO README.md:3)"],
  [
    "TI-01 to TI-12",
    "SIO 08-theorem-crosswalk.md:7-18, the runtime-opportunity matrix",
    'DESIGN ONLY (SIO README.md:3): "conditional human derivations, externally stated paper theorems and open Lean/semantics bridges" (SIO 08-theorem-crosswalk.md:20)',
  ],
  [
    "TI-18 to TI-20",
    "SIO 08-theorem-crosswalk.md:30-32, the 2026-10-18 proof-source update",
    'DESIGN ONLY (SIO README.md:3): "source-authored, not Lean-elaborated" theorem terms (SIO 08-theorem-crosswalk.md:26), "No physical law was registered" (SIO 08-theorem-crosswalk.md:36), and for TI-20 "Positive-rational global sorting remains a human proof awaiting Lean elaboration" (SIO 08-theorem-crosswalk.md:32)',
  ],
  [
    "TI-21 to TI-23",
    "SIO 08-theorem-crosswalk.md:44-48, the factorized evidence and rational exchange proof cut",
    'DESIGN ONLY (SIO README.md:3): "source-authored conditional Lean theorem terms, not compiler elaboration receipts" (SIO 08-theorem-crosswalk.md:50), and for TI-23 global sorting "Full unconditional rank normalization **not yet proved in Lean**" (SIO 08-theorem-crosswalk.md:48)',
  ],
  [
    "TI-24, TI-29 and TI-30",
    "SIO 08-theorem-crosswalk.md:58-61, the 2026-10-18 repair ledger",
    'DESIGN ONLY (SIO README.md:3): for TI-24 global finite spoke ordering "Human proof" and Lean "source-authored only" (SIO 08-theorem-crosswalk.md:58), for the TI-24 pairwise total-preorder "Refuted by zero-cost rational counterexample" (SIO 08-theorem-crosswalk.md:59), for TI-29 "Lean source authored only" (SIO 08-theorem-crosswalk.md:60) and for TI-30 "Human theorem" and "Lean source authored only" (SIO 08-theorem-crosswalk.md:61)',
  ],
  [
    "TI-31 to TI-52",
    "SIO 08-theorem-crosswalk.md:66-72, the next theorem results and admissibility limits",
    'DESIGN ONLY (SIO README.md:3): "Do not relabel these newly human-proved results as verified Lean modules" (SIO 08-theorem-crosswalk.md:72)',
  ],
  ["hx.optim.spoke.exchange.v1", "CSO README.md:23-39, the proposed law record: a data model, not existing API", "DESIGN ONLY; no runtime law admitted (CSO README.md:3)"],
];
/** The posture Pi states about the named IDs (row C3 holds its claim span, status words and law pair to the filing). */
const DOSSIER_POSTURE: readonly string[] = [
  "Pi never presents HXSI-01 to HXSI-06, a TI- row or hx.optim.spoke.exchange.v1 as a registered or admitted runtime law, a selected hx plan route, Lean-elaborated or benchmarked: the programs call them DESIGN ONLY, not implemented, human proof and Lean source authored only.",
  "The proposed hx.optim.spoke.exchange.v1 record names certificate_refs TI-23, and CSO README.md:83 reads that all law admissions remain blocked.",
  "If an HX result ever carries law_id or certificate_refs, Pi echoes them byte for byte and mints no admission or verification status. Today the vendored @hyperunix/sdk 0.1.0 keeps them only in its extensions sidecar, which the hyperunix.find provider output echoes verbatim and the reader adapter never reads.",
];
/** The sha-256 of the dossier's bytes (they equal composedDossier()), measured at the cut. */
const DOSSIER_SHA256 = "8de32dcbdf46459ce6282c8cdd2ecc171aa34dd287936e11eb3ddeb0b7e1d98f";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a census over docs/workbench/07-native-integrations.md, 14-qa-and-benchmarks.md, TRACEABILITY.md, receipts/ and this group's dossier asserts no sentence names HXSI-, TI- or hx.optim. as admitted/registered/verified/graduated/benchmarked without the programs' qualifier",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  },
  {
    id: "B",
    label: "(b) a reader test with law_id 'hx.optim.spoke.exchange.v1' and certificate_refs ['TI-23'] asserts they never surface today (H5 observer.test.ts:453) and are echoed byte-for-byte on landing with no added admitted/registered/verified/checked token",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) the dossier rows carry CSO README.md:3 and SIO README.md:3 verbatim",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-x0xu.2 in the tracked bead export states each clause rows A-C cover and carries every surface, name, claim word, status word, planted value and cited status row the census reads",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the sentence cutter, the name, claim and qualifier matchers, the finding format, the name mask, the rendered reading, its HTML markup forms and the unread code points judge their pinned inputs in order",
    pins: ["MS1", "MS2", "MS3", "MS4", "MN1", "MN2", "MN3", "MC", "MQ", "MF", "MK", "MR1", "MR2", "MR3", "MR4", "MU"],
  },
  {
    id: "R",
    label: "the named residuals R1-R12 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12"],
  },
];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
interface RosterPin {
  readonly id: string;
  readonly witness: unknown;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: unknown;
  readonly rows: readonly RosterRow[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Object.hasOwn(raw, "constants") || !Array.isArray(raw.rows)) {
    throw new Error("roster must be an object with a bead, constants and a rows list");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: pin.witness };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { bead: raw.bead, constants: raw.constants, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): unknown {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** The constants the roster pins beside the rows. */
function constants(): unknown {
  return {
    bead: BEAD,
    sibling: SIBLING,
    pin: PIN,
    pinCommit: PIN_COMMIT,
    dossier: DOSSIER,
    surfaces: SURFACES,
    wideRoots: WIDE_ROOTS,
    pagesFloor: PAGES_FLOOR,
    pageAnchor: PAGE_ANCHOR,
    statementSurfaces: STATEMENT_SURFACES,
    names: NAMES,
    claims: CLAIMS,
    qualifiers: QUALIFIERS,
    statusLines: STATUS_LINES.map(({ cite, path, sha256 }) => ({ cite, path, sha256 })),
    lawId: LAW_ID,
    certificateRefs: CERTIFICATE_REFS,
    tokens: TOKENS,
    lawFields: LAW_FIELDS,
    sdkDeclarationsFloor: SDK_DECLARATIONS_FLOOR,
    hxModules: HX_MODULES,
    dossierText: { title: DOSSIER_TITLE, sections: [STATUS_HEADING, IDS_HEADING, POSTURE_HEADING], intro: DOSSIER_INTRO, idHeader: ID_HEADER, idRows: ID_ROWS, posture: DOSSIER_POSTURE, sha256: DOSSIER_SHA256 },
    rendering: {
      markdown: MARKDOWN.source,
      htmlPage: HTML_PAGE.source,
      reference: REFERENCE.source,
      namedReferences: [...NAMED_REFERENCES].map(([name, value]) => [name, [...value].map(point => point.codePointAt(0) ?? 0)]),
      blockTags: [...BLOCK_TAGS],
      htmlMarkup: HTML_MARKUP.source,
      rcdata: [...RCDATA],
      rawText: [...RAW_TEXT],
      unseen: UNSEEN.source,
      unread: UNREAD.source,
      bidi: BIDI.source,
      inlineSpace: INLINE_SPACE,
    },
  };
}

const textOf = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Code points by number, so no invisible or look-alike is ever written raw in this file (standing rule 5). */
const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
/** What a blanked character leaves (a masked name or path, or a rendered character a reader may not plainly see): a code point that is no
 * letter, digit, white space, separator or sentence end, so no word is read inside it and no two words join across it (respin 2). */
const BLANK = cp(0xfffc);
/** A Markdown page by its extension, in any case (.md, .markdown, .mdx): its raw text is cut as Markdown, and it carries the rendered and HTML
 * legs (respin 2, rider F7: an upper-case .MD root page is a page). */
const MARKDOWN = /\.(?:md|markdown|mdx)$/i;
const isMarkdown = (path: string): boolean => MARKDOWN.test(path);
/** An HTML page by its extension, in any case: its whole text is one HTML block (no qualifier counts in it). */
const HTML_PAGE = /\.html?$/i;
/** A vocabulary form as a pattern: whole words, any case, any of "-", "_" or white space between its words. */
const formPattern = (form: string): RegExp => new RegExp(`(?<![\\p{L}\\p{N}])${form.split(" ").map(escapeRegExp).join("[-_\\s]+")}(?![\\p{L}\\p{N}])`, "iu");
/** A name token: its prefix touching no letter or digit on the left, then the ID characters that follow it. */
const nameSource = (name: Name): string => `(?<![\\p{L}\\p{N}])${escapeRegExp(name.prefix)}[\\p{L}\\p{N}._*-]*`;

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
}
interface Entry {
  readonly name: string;
  readonly kind: "file" | "directory" | "symlink" | "other";
}
/** A directory entry as the walker reads it: a symlink first (lstat semantics), never followed. */
const entryOf = (entry: Pick<Dirent, "name" | "isSymbolicLink" | "isDirectory" | "isFile">): Entry => ({
  name: entry.name,
  kind: entry.isSymbolicLink() ? "symlink" : entry.isDirectory() ? "directory" : entry.isFile() ? "file" : "other",
});
/** The repository directory's entries, every one of them (hidden entries included). */
const listed = (directory: string): Entry[] => readdirSync(join(REPO, directory), { withFileTypes: true }).map(entryOf);
/** Every regular file below `start` as `list` reports the tree, `start`-prefixed, in name order: a hidden entry is read like any other,
 * a symlink is refused and never followed (row A1 pins both on a synthetic tree, rider F4). */
function walkWith(start: string, list: (directory: string) => readonly Entry[]): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (directory: string): void => {
    const entries = [...list(directory)].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = `${directory}/${entry.name}`;
      if (entry.kind === "symlink") symlinks.push(path);
      else if (entry.kind === "directory") visit(path);
      else if (entry.kind === "file") files.push(path);
    }
  };
  visit(start);
  return { files, symlinks };
}
/** Every regular file below the repository path `start`, repository-relative, in name order; symlinks are refused. */
const walk = (start: string): Walk => walkWith(start, listed);
/** A1's synthetic tree: a hidden file and a hidden directory, a symlink, a nested directory and a non-regular entry. */
const SYNTHETIC: Readonly<Record<string, readonly Entry[]>> = {
  r: [
    { name: "b.md", kind: "file" },
    { name: ".hidden.md", kind: "file" },
    { name: "link.md", kind: "symlink" },
    { name: "sub", kind: "directory" },
    { name: ".dot", kind: "directory" },
    { name: "pipe", kind: "other" },
  ],
  "r/sub": [{ name: "c.md", kind: "file" }],
  "r/.dot": [{ name: "d.md", kind: "file" }],
};
/** A fake directory entry of one kind, for entryOf's own control. */
const fakeEntry = (name: string, kind: Entry["kind"]): Pick<Dirent, "name" | "isSymbolicLink" | "isDirectory" | "isFile"> => ({
  name,
  isSymbolicLink: () => kind === "symlink",
  isDirectory: () => kind === "directory",
  isFile: () => kind === "file",
});

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++) if (text[index] === "\n") starts.push(index + 1);
  return starts;
}
/** The 0-based line holding `offset`. */
function lineAt(starts: readonly number[], offset: number): number {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((starts[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }
  return low;
}
/** No cut follows a line-leading list number ("1. five") or a name prefix that ends in a dot ("hx.optim."). */
const KEEP = `(?<!(?:^|\\n)[ \\t]*\\d+\\.)${NAMES.filter(name => name.prefix.endsWith(".")).map(name => `(?<!${escapeRegExp(name.prefix)})`).join("")}`;
const CUT = new RegExp(`(?<=[.!?;])${KEEP}\\s+|\\n[ \\t]*\\n|\\n(?=[ \\t]*\\|)`, "giu");
const CUT_MARKDOWN = new RegExp(`(?<=[.!?;])${KEEP}\\s+|\\n[ \\t]*\\n|\\n(?=[ \\t]*\\|)|\\n(?=[ \\t]*(?:#{1,6}|[-+*>]|\\d+[.)])[ \\t])`, "giu");
interface Sentence {
  readonly line: number;
  readonly text: string;
}
/** A text's sentences (header, READINGS SENTENCE), each with the 1-based line its first character sits on. */
function sentencesOf(text: string, markdown: boolean): Sentence[] {
  const starts = lineStarts(text);
  const sentences: Sentence[] = [];
  let from = 0;
  const take = (to: number): void => {
    const body = text.slice(from, to);
    if (body.trim() === "") return;
    sentences.push({ line: lineAt(starts, from + body.length - body.trimStart().length) + 1, text: body.trim() });
  };
  for (const match of text.matchAll(markdown ? CUT_MARKDOWN : CUT)) {
    const at = match.index ?? 0;
    take(at);
    from = at + match[0].length;
  }
  take(text.length);
  return sentences;
}

/** The names a text mentions, in NAMES order. */
const namesIn = (text: string): string[] => NAMES.filter(name => new RegExp(nameSource(name), "iu").test(text)).map(name => name.id);
/** A file path token (a name ending in a known extension, with its optional line reference). */
const PATH_TOKEN = /\S*\.(?:md|jsonl?|[cm]?[jt]s|py|toml|ya?ml)(?![\p{L}\p{N}])(?::[\d,:-]+)?/giu;
/** A text with every name token and every file path blanked (BLANK, never white space), so a claim or status word inside either is never read
 * and no qualifier is assembled from the words on either side of one ("DESIGN HXSI-02 ONLY" holds no "design only"; respin 2, control MK). */
function masked(text: string): string {
  let rest = text;
  for (const name of NAMES) rest = rest.replace(new RegExp(nameSource(name), "giu"), match => BLANK.repeat(match.length));
  return rest.replace(PATH_TOKEN, match => BLANK.repeat(match.length));
}
const vocabularyIn = (vocabulary: readonly Vocabulary[], text: string): string[] =>
  vocabulary.filter(entry => entry.forms.some(form => formPattern(form).test(text))).map(entry => entry.id);
const claimIn = (text: string): string | null => vocabularyIn(CLAIMS, masked(text))[0] ?? null;
const qualifiersIn = (text: string): string[] => vocabularyIn(QUALIFIERS, masked(text));

interface Reading {
  readonly sentences: number;
  readonly mentions: number;
  readonly claimed: number;
  readonly qualified: number;
  readonly names: string[];
  readonly findings: string[];
}
/** A sentence as a leg judges it: its line, the text its names and claims are read in, and the text its qualifiers are read in (null: none counts). */
interface Judged {
  readonly line: number;
  readonly text: string;
  readonly qualifying: string | null;
}
/** One leg's reading of a text's sentences (header, READINGS FINDING); `leg` prefixes the finding ("" raw, "rendered-", "html-"). */
function legReading(path: string, sentences: readonly Judged[], leg: string): Reading {
  const names = new Set<string>();
  let mentions = 0;
  let claimed = 0;
  let qualified = 0;
  const findings: string[] = [];
  for (const sentence of sentences) {
    const named = namesIn(sentence.text);
    if (named.length === 0) continue;
    mentions++;
    for (const name of named) names.add(name);
    const claim = claimIn(sentence.text);
    if (claim === null) continue;
    claimed++;
    if (sentence.qualifying !== null && qualifiersIn(sentence.qualifying).length > 0) qualified++;
    else findings.push(`${path}:${sentence.line} ${named.join("+")}: ${leg}unqualified-${claim}`);
  }
  return { sentences: sentences.length, mentions, claimed, qualified, names: NAMES.map(name => name.id).filter(id => names.has(id)), findings };
}
/** One text's raw reading (header, READINGS RAW LEG): its source sentences, a qualifier read where the sentence's source holds it. */
const readingOf = (path: string, text: string): Reading => legReading(path, sentencesOf(text, isMarkdown(path)).map(sentence => ({ ...sentence, qualifying: sentence.text })), "");

/** The sentence break the rendering writes where an HTML tag opens or closes a block-level element (never a source character). */
const BREAK = cp(0x2029);
/** A code point that renders nothing: a default-ignorable one (the zero-width characters, the soft hyphen, the word joiner, the invisible
 * operators, the bidirectional controls, the variation selectors, the byte-order mark) or a control other than tab and line feed. */
const UNSEEN = /[\p{Default_Ignorable_Code_Point}\p{Cc}]/u;
const renders = (point: string): boolean => point === "\t" || point === "\n" || !UNSEEN.test(point);
/** The code points no leg reads (header, READINGS UNREAD; pinned in MU, cut #4): the four Hangul fillers U+115F, U+1160, U+3164 and U+FFA0
 * (the Default_Ignorable_Code_Point letters, which a shaper draws as a spacing glyph: refusal #3, HarfBuzz 7.0.0), the census's own markers
 * BREAK and BLANK, and every control but tab, line feed and carriage return (a browser shows a form feed as white space and the others as a
 * box). A judged file holding one is refused at each line that holds one, whatever the line says. */
const UNREAD_POINTS: readonly number[] = [0x115f, 0x1160, 0x3164, 0xffa0, BREAK.codePointAt(0) ?? 0, BLANK.codePointAt(0) ?? 0];
const UNREAD = new RegExp(`[${UNREAD_POINTS.map(point => `\\u{${point.toString(16)}}`).join("")}]|[^\\P{Cc}\\t\\n\\r]`, "gu");
/** A judged file's UNREAD findings: one per line holding an UNREAD code point, `<path>:<line> <code points>: unread-code-point`, the code
 * points in the order they first appear. */
function unreadOf(path: string, text: string): string[] {
  return text.split("\n").flatMap((line, index) => {
    const points = [...new Set(line.match(UNREAD) ?? [])].map(point => `U+${(point.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`);
    return points.length === 0 ? [] : [`${path}:${index + 1} ${points.join("+")}: unread-code-point`];
  });
}
/** A bidirectional control (the embeddings, overrides and isolates, their closers and the direction marks): it renders nothing itself but can
 * reorder what a reader sees, so a unit holding one reads no qualifier. */
const BIDI = /\p{Bidi_Control}/u;
/** The openers a pop-directional-formatting closes (left-to-right and right-to-left embedding and override), and the right-to-left override,
 * whose span a reader sees in reverse. */
const OPENERS: readonly string[] = [cp(0x202a), cp(0x202b), cp(0x202d), cp(0x202e)];
const RLO = cp(0x202e);
const PDF = cp(0x202c);
/** The named character references the rendered leg decodes (written with their ";"): every HTML5 name whose characters a census pattern can
 * read - an ASCII letter, white space, "!", "*", ".", ";", "?", "_" or a default-ignorable code point (42 names, measured on the 2231-name
 * HTML5 table at the cut) - then the markup characters and the look-alike dashes. Every other HTML5 name renders only characters no census
 * pattern reads (a look-alike letter is R4's), so the rendered leg reads any other name as one BLANK: no word, no white space and no
 * sentence end (a name no browser knows shows as written, ";" and all, which the raw leg reads). */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["Tab", cp(0x09)],
  ["NewLine", cp(0x0a)],
  ["excl", "!"],
  ["ast", "*"],
  ["midast", "*"],
  ["period", "."],
  ["semi", ";"],
  ["quest", "?"],
  ["lowbar", "_"],
  ["UnderBar", "_"],
  ["fjlig", "fj"],
  ["nbsp", cp(0xa0)],
  ["NonBreakingSpace", cp(0xa0)],
  ["shy", cp(0xad)],
  ["ensp", cp(0x2002)],
  ["emsp", cp(0x2003)],
  ["emsp13", cp(0x2004)],
  ["emsp14", cp(0x2005)],
  ["numsp", cp(0x2007)],
  ["puncsp", cp(0x2008)],
  ["thinsp", cp(0x2009)],
  ["ThinSpace", cp(0x2009)],
  ["hairsp", cp(0x200a)],
  ["VeryThinSpace", cp(0x200a)],
  ["ZeroWidthSpace", cp(0x200b)],
  ["NegativeVeryThinSpace", cp(0x200b)],
  ["NegativeThinSpace", cp(0x200b)],
  ["NegativeMediumSpace", cp(0x200b)],
  ["NegativeThickSpace", cp(0x200b)],
  ["zwnj", cp(0x200c)],
  ["zwj", cp(0x200d)],
  ["lrm", cp(0x200e)],
  ["rlm", cp(0x200f)],
  ["MediumSpace", cp(0x205f)],
  ["ThickSpace", cp(0x205f, 0x200a)],
  ["NoBreak", cp(0x2060)],
  ["af", cp(0x2061)],
  ["ApplyFunction", cp(0x2061)],
  ["it", cp(0x2062)],
  ["InvisibleTimes", cp(0x2062)],
  ["ic", cp(0x2063)],
  ["InvisibleComma", cp(0x2063)],
  ["amp", "&"],
  ["AMP", "&"],
  ["lt", "<"],
  ["LT", "<"],
  ["gt", ">"],
  ["GT", ">"],
  ["quot", '"'],
  ["QUOT", '"'],
  ["apos", "'"],
  ["hyphen", cp(0x2010)],
  ["dash", cp(0x2010)],
  ["ndash", cp(0x2013)],
  ["mdash", cp(0x2014)],
  ["horbar", cp(0x2015)],
  ["minus", cp(0x2212)],
]);
/** A character reference as marked passes it to the page: with its ";", a decimal one of 1-7 digits, a hex one of 1-6 digits or a name.
 * marked escapes the "&" of every other form (a legacy name without its ";", an eighth digit), which then shows as written. */
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|(\w+));/g;
/** `text` with every reference decoded as a reader sees it: a numeric one as its code point (U+FFFD for none), a NAMED_REFERENCES name as its
 * characters, any other name as one BLANK. */
const decoded = (text: string): string =>
  text.replace(REFERENCE, (_whole: string, decimal: string | undefined, hex: string | undefined, name: string | undefined) => {
    if (name !== undefined) return NAMED_REFERENCES.get(name) ?? BLANK;
    const code = decimal === undefined ? Number.parseInt(hex ?? "", 16) : Number.parseInt(decimal, 10);
    return cp(code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff) ? 0xfffd : code);
  });
/** The element names whose tag opens or closes a block: marked's HTML-block names, the raw-text ones and source. */
const BLOCK_TAGS: ReadonlySet<string> = new Set(
  "address article aside base basefont blockquote body caption center col colgroup dd details dialog dir div dl dt fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hr html iframe legend li link main menu menuitem meta nav noframes ol optgroup option p param pre script search section source style summary table tbody td textarea tfoot th thead title tr track ul".split(
    " ",
  ),
);
/** The HTML standard's markup forms as its tokenizer reads them (header, READINGS RENDERED LEG; each pinned in MR4, cut #4): a comment, which
 * "<!-->" and "<!--->" close at once and any other at its first "-->" or "--!>" (an unclosed one runs to the end); a bogus comment, to the
 * first ">" or the end - "<?", "<!" opening no comment (a declaration, or a CDATA section in HTML content) and "</" followed by anything but
 * a letter ("</>" alone is dropped); and the opening of a start or end tag with its name (any characters up to white space, "/" or ">"),
 * whose end tagEnd reads. */
const HTML_MARKUP = /<!--(?:-?>|[\s\S]*?(?:--!?>|$))|<[!?][^>]*(?:>|$)|<\/(?:>|[^A-Za-z>][^>]*(?:>|$))|<(\/?)([A-Za-z][^\t\n\f\r />]*)/g;
/** The elements whose text the standard reads as written to their end tag: RCDATA (references decoded) and raw text (references kept);
 * a plaintext element's text runs to the end. */
const RCDATA: ReadonlySet<string> = new Set(["textarea", "title"]);
const RAW_TEXT: ReadonlySet<string> = new Set(["script", "style", "xmp", "iframe", "noembed", "noframes", "noscript", "plaintext"]);
/** The JavaScript white space the HTML standard's tokenizer reads as ordinary characters: what JavaScript's \s matches beyond HTML white space
 * (FOLLOW-UP wb-a7w6; header, READINGS RENDERED LEG). marked's tag rule separates an inline tag's attributes with \s, so each of these does it
 * too, while the tokenizer, HTML_MARKUP's name class and tagEnd read each as any other character. RUN_ON holds the list to the engine. */
const INLINE_SPACE: readonly number[] = [
  0x0b, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff,
];
type TagState = "attributes" | "name" | "afterName" | "beforeValue" | "double" | "single" | "unquoted" | "afterQuoted" | "selfClosing";
/** The tag state white space leaves each tag state in (the standard's: a name ends, an unquoted value ends, a quoted value or a solidus
 * gives way to the next attribute; inside a quoted value and before a value it changes nothing). */
const AFTER_SPACE: Readonly<Record<TagState, TagState>> = {
  attributes: "attributes",
  name: "afterName",
  afterName: "afterName",
  beforeValue: "beforeValue",
  double: "double",
  single: "single",
  unquoted: "attributes",
  afterQuoted: "attributes",
  selfClosing: "attributes",
};
/** Where a tag whose name ends at `from` ends (the index after its ">"), as the standard's tokenizer reads its attributes: a ">" inside a
 * quoted value does not end it, and "=" opening an attribute starts its name; -1 when the input ends first (the tag is dropped). */
function tagEnd(raw: string, from: number): number {
  let state: TagState = "attributes";
  for (let at = from; at < raw.length; at++) {
    const char = raw[at] ?? "";
    const space = char === " " || char === "\t" || char === "\n" || char === "\f" || char === "\r";
    if (char === ">" && state !== "double" && state !== "single") return at + 1;
    if (state === "double" || state === "single") {
      if (char === (state === "double" ? '"' : "'")) state = "afterQuoted";
    } else if (state === "unquoted") {
      if (space) state = "attributes";
    } else if (state === "beforeValue") {
      if (char === '"') state = "double";
      else if (char === "'") state = "single";
      else if (!space) state = "unquoted";
    } else if (char === "/") state = "selfClosing";
    else if (space) state = AFTER_SPACE[state];
    else if (char === "=" && (state === "name" || state === "afterName")) state = "beforeValue";
    else state = "name";
  }
  return -1;
}
/** Where an RCDATA or raw-text element's text ends: at its end tag ("</" and its name in any case, then white space, "/" or ">"), or the end. */
function closingTag(raw: string, from: number, name: string): number {
  if (name === "plaintext") return raw.length;
  const close = new RegExp(`</${escapeRegExp(name)}(?=[\\t\\n\\f\\r />])`, "gi");
  close.lastIndex = from;
  return close.exec(raw)?.index ?? raw.length;
}

/** A rendered unit (a paragraph, a heading, a list item's block, a table row, a code block, an HTML block, a link's or an image's title): what a
 * reader may see or hear (text: names and claims are read here), the same text position for position with BLANK for every character a reader
 * may not plainly see (plain: qualifiers are read here), each position's source line, and where an inline HTML token rendered nothing. */
interface Unit {
  text: string;
  plain: string;
  readonly lines: number[];
  readonly html: number[];
  line: number;
  /** A bidirectional control was read; the open embeddings and overrides (with where they opened); the spans a reader sees reversed. */
  bidi: boolean;
  readonly open: [string, number][];
  readonly reversed: [number, number][];
}
interface HtmlSource {
  readonly line: number;
  readonly source: string;
}
/** A page as the rendered and HTML legs read it: its units in page order, and the source of every HTML token at any depth. */
interface Rendering {
  readonly units: Unit[];
  readonly sources: HtmlSource[];
}
const unitAt = (line: number): Unit => ({ text: "", plain: "", lines: [], html: [], line, bidi: false, open: [], reversed: [] });
/** Closes an embedding or override; an outermost right-to-left override's span is one a reader sees in reverse. */
function closed(unit: Unit, entry: [string, number] | undefined): void {
  if (entry !== undefined && entry[0] === RLO && !unit.open.some(([kind]) => kind === RLO)) unit.reversed.push([entry[1], unit.text.length]);
}
/** A bidirectional control renders nothing: it marks the unit, and opens or closes an embedding or override. */
function bidiControl(unit: Unit, point: string): void {
  unit.bidi = true;
  if (OPENERS.includes(point)) unit.open.push([point, unit.text.length]);
  else if (point === PDF) closed(unit, unit.open.pop());
}
/** A finished unit as a reader sees it: every override still open closes at its end, each right-to-left override span is read in reverse
 * (text, plain text and lines), and a unit holding a bidirectional control reads no qualifier. */
function finished(unit: Unit): Unit {
  while (unit.open.length > 0) closed(unit, unit.open.pop());
  for (const [from, to] of unit.reversed) {
    const flip = (text: string): string => `${text.slice(0, from)}${[...text.slice(from, to)].reverse().join("")}${text.slice(to)}`;
    unit.text = flip(unit.text);
    unit.plain = flip(unit.plain);
    unit.lines.splice(from, to - from, ...unit.lines.slice(from, to).reverse());
  }
  if (unit.bidi) unit.plain = BLANK.repeat(unit.plain.length);
  return unit;
}
const newlines = (text: string): number => text.split("\n").length - 1;
/** Appends `chars` at the unit's line; `plainly` false writes BLANK in their place in the plain text. */
function put(unit: Unit, chars: string, plainly: boolean): void {
  unit.text += chars;
  unit.plain += plainly ? chars : BLANK.repeat(chars.length);
  for (let index = 0; index < chars.length; index++) unit.lines.push(unit.line);
}
/** Appends what a reader sees of a source chunk: its references decoded (never in code, which shows them as written), each code point that
 * renders nothing dropped, and each source line break kept, moving the unit to the next line. */
function emit(unit: Unit, chunk: string, plainly: boolean, code = false): void {
  for (const [index, piece] of chunk.split("\n").entries()) {
    if (index > 0) {
      put(unit, "\n", plainly);
      unit.line += 1;
    }
    for (const point of code ? piece : decoded(piece)) {
      if (BIDI.test(point)) bidiControl(unit, point);
      else if (renders(point)) put(unit, point, plainly);
    }
  }
}
const tokenText = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const tokenTitle = (token: Token): string => {
  const value: unknown = (token as { title?: unknown }).title;
  return typeof value === "string" ? value : "";
};
const tokenChildren = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
/** A link's or an image's title, which a reader sees on its own (a tooltip): a unit of its own. */
function titled(title: string, line: number, page: Rendering): void {
  if (title === "") return;
  const unit = unitAt(line);
  page.units.push(unit);
  emit(unit, title, true);
}
/** What a reader sees of HTML source, read through the HTML_MARKUP forms (header, READINGS RENDERED LEG; MR4): its text, references decoded;
 * nothing of a comment, a bogus comment or a tag (a tag the input ends inside is dropped with the rest); a tag opening or closing a block-level
 * element breaks the sentence (in an inline token a br tag breaks the line); an RCDATA element's text as written with its references decoded,
 * and a raw-text element's as written, to its end tag. None of the text is plain. */
function htmlContent(unit: Unit, raw: string, inline: boolean): void {
  const markup = new RegExp(HTML_MARKUP.source, "g");
  let at = 0;
  for (let match = markup.exec(raw); match !== null; match = markup.exec(raw)) {
    emit(unit, raw.slice(at, match.index), false);
    const name = (match[2] ?? "").toLowerCase();
    const end = match[2] === undefined ? match.index + match[0].length : tagEnd(raw, match.index + match[0].length);
    if (end < 0) {
      unit.line += newlines(raw.slice(match.index));
      return;
    }
    if (inline && name === "br") put(unit, "\n", true);
    else if (BLOCK_TAGS.has(name)) put(unit, BREAK, inline);
    unit.line += newlines(raw.slice(match.index, end));
    at = end;
    if (match[1] === "" && (RCDATA.has(name) || RAW_TEXT.has(name))) {
      at = closingTag(raw, end, name);
      emit(unit, raw.slice(end, at), false, !RCDATA.has(name));
    }
    markup.lastIndex = at;
  }
  emit(unit, raw.slice(at), false);
}
/** An inline HTML token renders what the standard shows of it (htmlContent: nothing of a tag, the text after a comment or a bogus comment the
 * standard closes before marked does): its place is marked (a sentence holding it reads no qualifier) and its source joins the HTML leg. */
function inlineHtml(unit: Unit, raw: string, page: Rendering): void {
  unit.html.push(unit.text.length);
  page.sources.push({ line: unit.line, source: raw });
  htmlContent(unit, raw, true);
}
/** What a reader sees of inline tokens, appended to `unit` (header, READINGS RENDERED LEG); `plainly` false for struck and alt text. */
function inline(unit: Unit, tokens: readonly Token[], plainly: boolean, page: Rendering): void {
  for (const token of tokens) {
    const end = unit.line + newlines(token.raw);
    if (token.type === "html") inlineHtml(unit, token.raw, page);
    else if (token.type === "br") put(unit, "\n", plainly);
    else if (token.type === "codespan" || token.type === "escape") emit(unit, tokenText(token), plainly, true);
    else if (token.type === "del") inline(unit, tokenChildren(token), false, page);
    else if (token.type === "image" || token.type === "link") {
      const line = unit.line;
      const alt = token.type === "image";
      if (tokenChildren(token).length > 0) inline(unit, tokenChildren(token), plainly && !alt, page);
      else emit(unit, tokenText(token), plainly && !alt);
      titled(tokenTitle(token), line, page);
    } else if (token.type !== "checkbox") {
      if (tokenChildren(token).length > 0) inline(unit, tokenChildren(token), plainly, page);
      else emit(unit, tokenText(token), plainly);
    }
    unit.line = end;
  }
}
/** The block tokens lexed from `source` (its first character on `line`), each read at the line its source starts on. */
function blocks(tokens: readonly Token[], source: string, line: number, page: Rendering): void {
  let cursor = 0;
  for (const token of tokens) {
    const at = source.indexOf(token.raw, cursor);
    const start = at < 0 ? cursor : at;
    if (at >= 0) cursor = at + token.raw.length;
    block(token, line + newlines(source.slice(0, start)), page);
  }
}
/** One block token's units (header, READINGS RENDERED LEG). */
function block(token: Token, line: number, page: Rendering): void {
  if (token.type === "space" || token.type === "hr" || token.type === "def") return;
  if (token.type === "list") {
    const list = token as Tokens.List;
    let cursor = 0;
    for (const item of list.items) {
      const at = list.raw.indexOf(item.raw, cursor);
      const start = at < 0 ? cursor : at;
      if (at >= 0) cursor = at + item.raw.length;
      blocks(item.tokens, item.text, line + newlines(list.raw.slice(0, start)), page);
    }
    return;
  }
  if (token.type === "blockquote") {
    blocks(tokenChildren(token), tokenText(token), line, page);
    return;
  }
  if (token.type === "table") {
    const table = token as Tokens.Table;
    for (const [index, cells] of [table.header, ...table.rows].entries()) {
      const unit = unitAt(line + (index === 0 ? 0 : index + 1));
      page.units.push(unit);
      for (const [at, cell] of cells.entries()) {
        if (at > 0) put(unit, " | ", true);
        inline(unit, cell.tokens, true, page);
      }
    }
    return;
  }
  const unit = unitAt(token.type === "code" && (token as Tokens.Code).codeBlockStyle !== "indented" ? line + 1 : line);
  page.units.push(unit);
  if (token.type === "code") emit(unit, tokenText(token), true, true);
  else if (token.type === "html") {
    page.sources.push({ line, source: token.raw });
    htmlContent(unit, token.raw, false);
  } else if (tokenChildren(token).length > 0) inline(unit, tokenChildren(token), true, page);
  else emit(unit, tokenText(token), true);
}
const RENDERINGS = new Map<string, Rendering>();
/** A page as a reader sees it, lexed once by marked (the lexer test/helpers/census.ts uses): a Markdown page block by block; an HTML page as one
 * HTML block. */
function rendering(text: string, html = false): Rendering {
  const known = RENDERINGS.get(`${html}:${text}`);
  if (known !== undefined) return known;
  const page: Rendering = { units: [], sources: [] };
  if (html) {
    const unit = unitAt(1);
    page.units.push(unit);
    page.sources.push({ line: 1, source: text });
    htmlContent(unit, text, false);
  } else blocks(marked.lexer(text), text, 1, page);
  for (const unit of page.units) finished(unit);
  RENDERINGS.set(`${html}:${text}`, page);
  return page;
}
/** A rendered unit cut into sentences (header, READINGS SENTENCE): at a sentence end, a blank line and a BREAK. */
const CUT_RENDERED = new RegExp(`(?<=[.!?;])${KEEP}\\s+|\\n[ \\t]*\\n|${BREAK}`, "giu");
interface RenderedSentence {
  readonly line: number;
  readonly text: string;
  readonly plain: string;
  readonly html: boolean;
}
function renderedSentencesOf(unit: Unit): RenderedSentence[] {
  const sentences: RenderedSentence[] = [];
  let from = 0;
  const take = (to: number): void => {
    const body = unit.text.slice(from, to);
    const text = body.trim();
    if (text === "") return;
    const start = from + body.length - body.trimStart().length;
    sentences.push({ line: unit.lines[start] ?? unit.line, text, plain: unit.plain.slice(start, start + text.length), html: unit.html.some(at => at >= from && at <= to) });
  };
  for (const match of unit.text.matchAll(CUT_RENDERED)) {
    const at = match.index ?? 0;
    take(at);
    from = at + match[0].length;
  }
  take(unit.text.length);
  return sentences;
}
const renderedSentences = (text: string, html = false): RenderedSentence[] => rendering(text, html).units.flatMap(renderedSentencesOf);
/** A page's rendered reading (header, READINGS RENDERED LEG): a qualifier counts only in plain text, in a sentence that holds no HTML. */
const renderedReadingOf = (path: string, text: string): Reading =>
  legReading(path, renderedSentences(text, HTML_PAGE.test(path)).map(sentence => ({ line: sentence.line, text: sentence.text, qualifying: sentence.html ? null : sentence.plain })), "rendered-");
/** A page's HTML reading (header, READINGS HTML LEG): each HTML token's source, comments and attributes included, cut into sentences; no
 * qualifier ever counts in it. */
const htmlReadingOf = (path: string, text: string): Reading =>
  legReading(
    path,
    rendering(text, HTML_PAGE.test(path)).sources.flatMap(({ line, source }) => sentencesOf(source, false).map(sentence => ({ line: line + sentence.line - 1, text: sentence.text, qualifying: null }))),
    "html-",
  );
const READS = new Map<string, Map<string, readonly string[]>>();
/** Every finding of one file (header, READINGS): its raw reading's, a page's rendered and HTML readings' too, and its UNREAD lines. */
function findingsOf(path: string, text: string): string[] {
  const byText = READS.get(path) ?? new Map<string, readonly string[]>();
  READS.set(path, byText);
  const page = isMarkdown(path) || HTML_PAGE.test(path);
  const known =
    byText.get(text) ?? [...readingOf(path, text).findings, ...(page ? [...renderedReadingOf(path, text).findings, ...htmlReadingOf(path, text).findings] : []), ...unreadOf(path, text)];
  byText.set(text, known);
  return [...known];
}
type Tree = ReadonlyMap<string, string>;
const judge = (tree: Tree): string[] => [...tree].flatMap(([path, text]) => findingsOf(path, text));

interface SurfaceRead {
  readonly id: string;
  readonly files: string[];
  readonly symlinks: string[];
}
/** The five surfaces of acceptance (a), as files read. */
function surfaceReads(): SurfaceRead[] {
  return SURFACES.map(surface => {
    if (!surface.directory) return { id: surface.id, files: [surface.path], symlinks: [] };
    const found = walk(surface.path);
    return { id: surface.id, files: found.files, symlinks: found.symlinks };
  });
}
let namedCache: Tree | undefined;
/** The live tree of acceptance (a): every file of the five surfaces with its text. */
function namedTree(): Tree {
  namedCache ??= new Map(surfaceReads().flatMap(read => read.files).map(file => [file, textOf(file)] as const));
  return namedCache;
}
/** A root page: a Markdown or HTML page at the repository root, its extension in any case (respin 2, rider F7). */
const isPage = (name: string): boolean => isMarkdown(name) || HTML_PAGE.test(name);
/** Whether a repository path sits on the statement's wider surfaces (a WIDE_ROOTS root or a root page). */
const onWide = (path: string): boolean => WIDE_ROOTS.some(root => path.startsWith(`${root.root}/`)) || (!path.includes("/") && isPage(path));
interface WideRead {
  readonly counts: { [root: string]: number };
  readonly pages: string[];
  readonly symlinks: string[];
  readonly tree: Tree;
}
let wideCache: WideRead | undefined;
function wideRead(): WideRead {
  if (wideCache !== undefined) return wideCache;
  const counts: { [root: string]: number } = {};
  const files: string[] = [];
  const symlinks: string[] = [];
  for (const root of WIDE_ROOTS) {
    const found = walk(root.root);
    counts[root.root] = found.files.length;
    files.push(...found.files);
    symlinks.push(...found.symlinks);
  }
  const top = readdirSync(REPO, { withFileTypes: true }).filter(entry => isPage(entry.name));
  for (const entry of top) if (entry.isSymbolicLink()) symlinks.push(entry.name);
  const pages = top.filter(entry => entry.isFile()).map(entry => entry.name).sort();
  wideCache = { counts, pages, symlinks, tree: new Map([...files, ...pages].filter(onWide).map(file => [file, textOf(file)] as const)) };
  return wideCache;
}

/** A4's plants, one per surface of acceptance (a): [path, claim, its qualified twin, expected findings - every surface is a Markdown page, so
 * the raw and the rendered legs each read the claim]; a claim opens its file. */
const MUTANTS: readonly (readonly [string, string, string, readonly string[]])[] = [
  [
    "docs/workbench/07-native-integrations.md",
    "HXSI-01 is a registered runtime law in hx.",
    "HXSI-01 is DESIGN ONLY and never a registered runtime law in hx.",
    ["docs/workbench/07-native-integrations.md:1 HXSI: unqualified-registered", "docs/workbench/07-native-integrations.md:1 HXSI: rendered-unqualified-registered"],
  ],
  [
    "docs/workbench/14-qa-and-benchmarks.md",
    "TI-23 is benchmarked by the hx gate.",
    "TI-23 is a human proof and never benchmarked by the hx gate.",
    ["docs/workbench/14-qa-and-benchmarks.md:1 TI: unqualified-benchmarked", "docs/workbench/14-qa-and-benchmarks.md:1 TI: rendered-unqualified-benchmarked"],
  ],
  [
    "docs/workbench/TRACEABILITY.md",
    "The hx.optim.spoke.exchange.v1 law is admitted.",
    "The hx.optim.spoke.exchange.v1 law is DESIGN ONLY: no runtime law admitted.",
    ["docs/workbench/TRACEABILITY.md:1 HXOPTIM: unqualified-admitted", "docs/workbench/TRACEABILITY.md:1 HXOPTIM: rendered-unqualified-admitted"],
  ],
  [
    "docs/workbench/receipts/wb-plant.md",
    "TI-24 is verified in Lean.",
    "TI-24 is verified only as a human proof; Lean source authored only.",
    ["docs/workbench/receipts/wb-plant.md:3 TI: unqualified-verified", "docs/workbench/receipts/wb-plant.md:3 TI: rendered-unqualified-verified"],
  ],
  [DOSSIER, "HXSI-06 graduated to the hx planner.", "HXSI-06 never graduated: not implemented.", [`${DOSSIER}:1 HXSI: unqualified-graduated`, `${DOSSIER}:1 HXSI: rendered-unqualified-graduated`]],
];
/** The findings a planted tree adds to the live tree's: `planted` minus every live finding, each moved down by the lines its file's plant adds
 * (respin 2, rider F5: a live finding reds A2 or A5 by name and never reads here as a plant mismatch). */
function added(planted: readonly string[], live: readonly string[], shift: (path: string) => number): string[] {
  const rest = [...planted];
  for (const finding of live) {
    const at = /^([^:]*):(\d+) /.exec(finding);
    const moved = at === null ? finding : `${at[1]}:${Number(at[2]) + shift(at[1] ?? "")} ${finding.slice(at[0].length)}`;
    const index = rest.indexOf(moved);
    if (index >= 0) rest.splice(index, 1);
  }
  return rest;
}
/** The live tree with each plant's text opening its file (a new receipt carries its own title line first). */
function plantedTree(pick: (mutant: readonly [string, string, string, readonly string[]]) => string): Tree {
  const tree = new Map(namedTree());
  for (const mutant of MUTANTS) {
    const [path] = mutant;
    const existing = tree.get(path);
    tree.set(path, existing === undefined ? `# wb-plant: plant\n\n${pick(mutant)}\n` : `${pick(mutant)}\n\n${existing}`);
  }
  return tree;
}

/** A6's plants (rider F3), one per non-.md kind the wider surfaces carry - the adapter's .ts, the served skill text's .yaml, qa's .mjs:
 * [path, claim, its qualified twin, expected finding]; a claim opens its file. */
const WIDE_MUTANTS: readonly (readonly [string, string, string, string])[] = [
  ["src/workbench/providers/hyperunix.ts", "// HXSI-01 is a registered runtime law.", "// HXSI-01 is DESIGN ONLY and never a registered runtime law.", "src/workbench/providers/hyperunix.ts:1 HXSI: unqualified-registered"],
  [".agents/skills/beads/agents/openai.yaml", "# TI-23 is benchmarked by the hx gate.", "# TI-23 is a human proof and never benchmarked by the hx gate.", ".agents/skills/beads/agents/openai.yaml:1 TI: unqualified-benchmarked"],
  ["qa/workbench/boot-import-census.mjs", "// The hx.optim.spoke.exchange.v1 law is admitted.", "// The hx.optim.spoke.exchange.v1 law is DESIGN ONLY: no runtime law admitted.", "qa/workbench/boot-import-census.mjs:1 HXOPTIM: unqualified-admitted"],
];
/** The live wider tree with each A6 plant opening its file; a plant's file must be one the wider walk judges. */
function plantedWideTree(pick: (mutant: readonly [string, string, string, string]) => string): Tree {
  const tree = new Map(wideRead().tree);
  for (const mutant of WIDE_MUTANTS) {
    const [path] = mutant;
    const existing = tree.get(path);
    if (existing === undefined) throw new Error(`the wider walk judges no ${path}`);
    tree.set(path, `${pick(mutant)}\n${existing}`);
  }
  return tree;
}

const D07 = "docs/workbench/07-native-integrations.md";
/** Refusal #2's receipt plant (gate g10-gate-s78, GA1r and GA2r): a new receipt, its title line first. */
const RECEIPT_PLANT = "docs/workbench/receipts/wb-gp2-plant.md";
const RECEIPT_TITLE = "# wb-gp2-plant: plant\n\n";
/** A finding row A7 expects: `line` of `path`, the names, the leg ("" raw, "rendered-", "html-") and the claim. */
const found = (path: string, line: number, names: string, leg: string, claim: string): string => `${path}:${line} ${names}: ${leg}unqualified-${claim}`;
/** Row A7's plants (respin 2, U1 at class level): [id, shape, path, text, expected findings], each prepended to its page (or a new receipt).
 * GA1-GA11, GA1r and GA2r are refusal #2's probes byte for byte (gate g10-gate-s78 LEG 2); RV1-RV24 are the seat's members of the same
 * class, each a place where what a reader sees differs from the source: a qualifier the reader never plainly sees, a name or claim the
 * source splits, or a claim a reader sees outside the paragraph that qualifies it. */
const VIEW_PLANTS: readonly (readonly [id: string, shape: string, path: string, text: string, findings: readonly string[]])[] = [
  ["GA1", "a qualifier held only by an HTML comment", D07, "HXSI-01 is a registered runtime law <!-- DESIGN ONLY -->.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  [
    "GA1r",
    "a new receipt whose qualifier is held only by an HTML comment",
    RECEIPT_PLANT,
    `${RECEIPT_TITLE}TI-24 is verified in Lean <!-- human proof; Lean source authored only -->.\n`,
    [found(RECEIPT_PLANT, 3, "TI", "rendered-", "verified")],
  ],
  ["GA2", "a qualifier held only by a link target", D07, "HXSI-01 is a [registered runtime law](https://example.invalid/design-only).", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  [
    "GA2r",
    "a new receipt whose reference definition cannot interrupt its paragraph",
    RECEIPT_PLANT,
    `${RECEIPT_TITLE}TI-24 is [verified in Lean][x].\n[x]: https://example.invalid/design-only\n`,
    [found(RECEIPT_PLANT, 3, "TI", "", "verified"), found(RECEIPT_PLANT, 3, "TI", "rendered-", "verified")],
  ],
  ["GA3", "a name split by emphasis", D07, "**HXSI**-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA4", "a name written with a backslash escape", D07, "HXSI\\-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA5", "a name split by an HTML comment", D07, "HX<!-- -->SI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA6", "a claim split by emphasis", D07, "HXSI-01 is a reg*ist*ered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA7", "a qualifier held only by a link title", D07, 'HXSI-01 is a [registered runtime law](https://example.invalid/x "design only").', [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA8", "a qualifier held only by a tag attribute", D07, 'HXSI-01 is a registered runtime law <span title="design only"></span>.', [found(D07, 1, "HXSI", "rendered-", "registered")]],
  [
    "GA9",
    "a claim inside an HTML comment (the raw and HTML legs read it; the rendered page shows nothing)",
    D07,
    "<!-- HXSI-01 is a registered runtime law. -->",
    [found(D07, 1, "HXSI", "", "registered"), found(D07, 1, "HXSI", "html-", "registered")],
  ],
  ["GA10", "a plain claim (control)", D07, "HXSI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "", "registered"), found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["GA11", "a visible qualifier (control)", D07, "HXSI-01 is a registered runtime law, DESIGN ONLY.", []],
  ["RV1", "a qualifier held only by an image's alt text", D07, "![DESIGN ONLY](x.png) HXSI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV2", "a qualifier held only by an image's title", D07, 'HXSI-01 is a registered runtime law ![x](x.png "DESIGN ONLY").', [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV3", "a qualifier held only by a reference definition's title", D07, '[d]: https://example.invalid "DESIGN ONLY"\nHXSI-01 is a [registered runtime law][d].', [found(D07, 2, "HXSI", "rendered-", "registered")]],
  ["RV4", "a qualifier struck through", D07, "HXSI-01 is a registered runtime law, ~~DESIGN ONLY~~.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV5", "a qualifier inside an element a page may hide", D07, "HXSI-01 is a registered runtime law<span hidden>, DESIGN ONLY</span>.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV6", "a claim held by a tag attribute beside a visible qualifier", D07, 'HXSI-01 is DESIGN ONLY <abbr title="TI-23 is a registered runtime law">here</abbr>.', [found(D07, 1, "TI", "html-", "registered")]],
  ["RV7", "a claim held by an HTML comment beside a visible qualifier", D07, "HXSI-01 is DESIGN ONLY <!-- TI-23 is a registered runtime law -->.", [found(D07, 1, "TI", "html-", "registered")]],
  ["RV8", "an HTML block's text naming a tag-split name", D07, "<div>HX<b></b>SI-01 is a registered runtime law.</div>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV9", "a block-level tag inside a paragraph, splitting a sentence off its qualifier", D07, "DESIGN ONLY: x<p>HXSI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV10", "a name written with a numeric character reference", D07, "HXSI&#45;01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV11", "a name written with a named character reference", D07, "hx&period;optim.spoke.exchange.v1 is admitted.", [found(D07, 1, "HXOPTIM", "rendered-", "admitted")]],
  ["RV12", "a claim written with a soft-hyphen reference", D07, "HXSI-01 is a regis&shy;tered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV13", "an invisible inside a name", D07, `HXSI${cp(0x200b)}-01 is a registered runtime law.`, [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV14", "a two-word claim joined by a no-break-space reference", D07, "HXSI-01 is a selected hx plan&nbsp;route.", [found(D07, 1, "HXSI", "rendered-", "plan-route")]],
  ["RV15", "a name and a claim in two cells of one table row", D07, "| **HXSI**-01 | a registered runtime law |\n| --- | --- |", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV16", "a list item", D07, "- **HXSI**-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV17", "a block quote", D07, "> **HXSI**-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV18", "a heading", D07, "## **HXSI**-01 is a registered runtime law", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV19", "a claim held by a link title beside a visible qualifier", D07, 'DESIGN ONLY: see [here](https://example.invalid "HXSI-01 is a registered runtime law").', [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV20", "a reference inside a code span shows as written (control)", D07, "`HXSI&#45;01` is a registered runtime law.", []],
  ["RV21", "a claim held by an image's alt text beside a visible qualifier (control)", D07, "![HXSI-01 is a registered runtime law](x.png) DESIGN ONLY.", []],
  ["RV22", "a claim a right-to-left override shows in reverse", D07, `HXSI-01 is a ${RLO}wal emitnur deretsiger${PDF}.`, [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV23", "a name a right-to-left override shows in reverse (open to the end of its paragraph)", D07, `${RLO}10-ISXH${PDF} is a registered runtime law.`, [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["RV24", "a qualifier beside a direction mark (no qualifier counts in a unit holding a bidirectional control)", D07, `HXSI-01 is a registered runtime law, DESIGN ONLY${cp(0x200e)}.`, [found(D07, 1, "HXSI", "rendered-", "registered")]],
];

/** Refusal #3's receipt plant (gate g10-gate-s79, HB5r and HF6r): a new receipt, its title line first. */
const RECEIPT_PLANT3 = "docs/workbench/receipts/wb-gate19-plant.md";
const RECEIPT_TITLE3 = "# wb-gate19-plant: plant\n\n";
/** The adapter source refusal #3's rider F2 (HF7ts) plants into, a file of the wider surfaces. */
const HX_ADAPTER = "src/workbench/providers/hyperunix.ts";
/** A finding row A8 expects for a line holding an UNREAD code point. */
const unread = (path: string, line: number, points: string): string => `${path}:${line} ${points}: unread-code-point`;
/** Row A8's plants (cut #4, refusal #3's U1 families in the terminal enumerate-the-resolvable form): [id, shape, path, text, expected
 * findings], each prepended to its file (or a new receipt) on the live tree. The 18 survivors refusal #3 grades (HB1-HB5r, HB7, HB8, TA1,
 * IC1, PI1, CD1, HF1-HF6r and HF7ts) and its controls HBC1, HBC2, HC2 and HC3 are the gate's probe texts byte for byte (the survivors'
 * texts are read back from the bead export below); HO1 is its F3 fail-closed over-refusal, refused whatever it says. */
const REFUSAL3_PLANTS: readonly (readonly [id: string, shape: string, path: string, text: string, findings: readonly string[]])[] = [
  ["HB1", "an HTML block opened by the empty comment '<!-->'", D07, "<!-->HXSI&#45;01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HB2", "an HTML block opened by the empty comment '<!--->'", D07, "<!--->HXSI&#45;01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HB3", "a comment the standard closes at '--!>' in an HTML block", D07, "<div><!-- x --!>HXSI&#45;01 is a registered runtime law.</div>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HB4", "an empty comment before a claim spelled with a reference", D07, "<!-->HXSI-01 is a regis&#116;ered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HB5r", "a new receipt whose HTML block opens with an empty comment", RECEIPT_PLANT3, `${RECEIPT_TITLE3}<!-->TI&#45;24 is verified in Lean.\n`, [found(RECEIPT_PLANT3, 3, "TI", "rendered-", "verified")]],
  ["HB7", "an empty comment, then a name split by a closed comment", D07, "<!-->HX<!-- -->SI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HB8", "an empty comment, then a claim split by tags", D07, "<!-->HXSI-01 is a reg<b></b>istered runtime law.", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["TA1", "a comment opener inside a textarea, whose text a page shows as written (RCDATA)", D07, "<textarea><!-- x HXSI&#45;01 is a registered runtime law.</textarea>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["IC1", "an inline comment the standard closes at '--!>', before marked's '-->'", D07, "Note <!-- x --!> HXSI&#45;01 is a registered runtime law. -->", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["PI1", "an inline processing instruction, a bogus comment to the first '>'", D07, "Note <?x > HXSI&#45;01 is a registered runtime law. ?>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["CD1", "an inline CDATA section in HTML content, a bogus comment to the first '>'", D07, "Note <![CDATA[ x > HXSI&#45;01 is a registered runtime law. ]]>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HF1", "a Hangul filler between a claim and the next word", D07, `HXSI-01 is a registered${cp(0x3164)}runtime law.`, [unread(D07, 1, "U+3164")]],
  ["HF2", "a Hangul filler before a claim", D07, `HXSI-01 is a${cp(0x3164)}registered runtime law.`, [unread(D07, 1, "U+3164")]],
  ["HF3", "a halfwidth Hangul filler after a claim", D07, `TI-23 is benchmarked${cp(0xffa0)}by the hx gate.`, [unread(D07, 1, "U+FFA0")]],
  ["HF4", "a Hangul choseong filler joining a two-word claim", D07, `HXSI-01 is a selected hx plan${cp(0x115f)}route.`, [unread(D07, 1, "U+115F")]],
  ["HF5", "a Hangul jungseong filler before a claim", D07, `The hx.optim.spoke.exchange.v1 law is${cp(0x1160)}admitted.`, [unread(D07, 1, "U+1160")]],
  ["HF6r", "a new receipt with a Hangul filler after its claim", RECEIPT_PLANT3, `${RECEIPT_TITLE3}TI-24 is verified${cp(0x3164)}in Lean.\n`, [unread(RECEIPT_PLANT3, 3, "U+3164")]],
  ["HF7ts", "a Hangul filler after a claim in a code comment of the adapter (rider F2)", HX_ADAPTER, `// HXSI-01 is a registered${cp(0x3164)}runtime law.`, [unread(HX_ADAPTER, 1, "U+3164")]],
  ["HBC1", "the HB3 claim behind a normally closed comment (control)", D07, "<div><!-- x -->HXSI&#45;01 is a registered runtime law.</div>", [found(D07, 1, "HXSI", "rendered-", "registered")]],
  [
    "HBC2",
    "the HB1 claim with a plain name (control)",
    D07,
    "<!-->HXSI-01 is a registered runtime law.",
    [found(D07, 1, "HXSI", "", "registered"), found(D07, 1, "HXSI", "rendered-", "registered"), found(D07, 1, "HXSI", "html-", "registered")],
  ],
  ["HC2", "a plain claim (control)", D07, "HXSI-01 is a registered runtime law.", [found(D07, 1, "HXSI", "", "registered"), found(D07, 1, "HXSI", "rendered-", "registered")]],
  ["HC3", "a visible qualifier (control)", D07, "HXSI-01 is a registered runtime law, DESIGN ONLY.", []],
  [
    "HO1",
    "a Hangul filler inside a visible qualifier (refusal #3 F3: refused whatever the line says)",
    D07,
    `HXSI-01 is a registered runtime law, DESIGN${cp(0x3164)}ONLY.`,
    [found(D07, 1, "HXSI", "", "registered"), found(D07, 1, "HXSI", "rendered-", "registered"), unread(D07, 1, "U+3164")],
  ],
];

const WS = "/workspace/hx-sio-design-status-census";
const BINARY = "cd".repeat(32);
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-23T08:40:00Z",
  observedAt: "2026-10-23T08:40:01Z",
};
const INPUT: JsonValue = { kind: "hx.fs/regular-file", root: "src" };
const GRANTS = ["hyperunix:read"];
const lawPair = (): Json => ({ law_id: LAW_ID, certificate_refs: [...CERTIFICATE_REFS] });
const certificate = (batch_id: string): Json => ({
  mode: "opportunistic",
  cause: { cause: "other", detail: "No_change_exclusion" },
  scope: { path: [], scope: "fs-subtree" },
  target: { target: "relation-expansion" },
  provider: "hx.fs/builtin",
  stream: "hx-fs",
  batch_id,
  body: { mode: "opportunistic" },
});
type Path = readonly (string | number)[];
/** The value at `path` below `value`, which must be an object. */
function objectAt(value: JsonValue, path: Path): Json {
  let at: JsonValue = value;
  for (const step of path) {
    const next: JsonValue | undefined = typeof step === "number" ? (Array.isArray(at) ? at[step] : undefined) : isObject(at) ? (at as Json)[step] : undefined;
    if (next === undefined) throw new Error(`no value at ${path.join(".")}`);
    at = next;
  }
  if (!isObject(at)) throw new Error(`the value at ${path.join(".")} is not an object`);
  return at as Json;
}
/** A copy of `value` with the law pair planted in the object at `path`. */
function planted(value: Json, path: Path): Json {
  const copy = structuredClone(value);
  Object.assign(objectAt(copy, path), lawPair());
  return copy;
}
const siteName = (path: Path): string => (path.length === 0 ? "top" : path.map((step, index) => (typeof step === "number" ? `[${step}]` : index === 0 ? step : `.${step}`)).join(""));
/** Whether the object at `path` below `value` carries the planted pair: the plant itself is read, never assumed. */
const carries = (value: Json, path: Path): boolean => JSON.stringify(objectAt(value, path).law_id) === JSON.stringify(LAW_ID) && JSON.stringify(objectAt(value, path).certificate_refs) === JSON.stringify(CERTIFICATE_REFS);
/** Every object `value` holds down to `depth` keys, read from the value itself: the value, each object-valued key and the first
 * item of each list of objects, so a site list is never typed by hand. */
function objectPaths(value: Json, depth: number): Path[] {
  const paths: Path[] = [[]];
  const visit = (at: Json, path: Path, left: number): void => {
    for (const [key, child] of Object.entries(at)) {
      if (isObject(child)) {
        paths.push([...path, key]);
        if (left > 1) visit(child as Json, [...path, key], left - 1);
      } else if (Array.isArray(child) && isObject(child[0])) paths.push([...path, key, 0]);
    }
  };
  visit(value, [], depth);
  return paths;
}
function reading(kind: string, licensed: boolean): Json {
  return {
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      operation: "find",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed },
      rows: [],
      rows_retained: true,
      coverage: [certificate("b1"), certificate("b2")],
      evidence: { support_ids: ["support-1"], derivation_handles: [] },
      extensions: {},
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY },
  };
}
/** Every base reading: each kind of the adapter's exported closed kind set, unlicensed and runtime-licensed. */
const BASES: readonly (readonly [string, boolean, Json])[] = HYPERUNIX_EXECUTION_KINDS.flatMap(kind => [false, true].map(licensed => [kind, licensed, reading(kind, licensed)] as const));
/** Every object of a provider reading the reader adapter could read (two keys deep), top level included. */
const SITES: readonly Path[] = objectPaths(reading("incomplete", false), 2);
/** Whether a value's JSON spells either planted value or either planted key. */
const surfaces = (value: unknown): boolean => /hx\.optim|TI-23|law_id|certificate_refs/.test(JSON.stringify(value));
/** The TOKENS a value's JSON carries as whole words. */
const tokensOf = (value: unknown): string[] => TOKENS.filter(token => formPattern(token).test(JSON.stringify(value)));
/** The reader adapter's outcome for a reading: its projection, or its typed refusal (category and message). */
function topologyOf(value: Json): unknown {
  try {
    return { projected: hyperunixTopology(value, CONTEXT) };
  } catch (error) {
    if (error instanceof CapabilityError) return { refused: { category: error.category, message: error.message } };
    throw error;
  }
}
function sdkDocument(): Json {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [certificate("b1"), certificate("b2")],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 2, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 2 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-10-23T08:39:59.000Z", startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 2 },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: { modes: ["opportunistic"], completeness: "incomplete", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [], result_coverage: null, answer_count: 0 },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
}
/** Every object of the SDK's hyperunix.result/1 document (one key deep) a successor could carry the pair in, top level included. */
const SDK_SITES: readonly Path[] = objectPaths(sdkDocument(), 1);
/** The registered hyperunix.find provider's own output, through CapabilityRegistry.invoke, for an injected SDK document. */
async function providerOutput(document: Json, served: string[]): Promise<JsonValue> {
  const reader: HyperUnixReader = {
    async find() {
      served.push("find");
      return resultFromJson(document);
    },
    async runtime() {
      served.push("runtime");
      return { version: "0.1.0", binarySha256: BINARY };
    },
    async close() {},
  };
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, reader, WS);
  return registry.invoke("hyperunix.find", INPUT, { grants: GRANTS, signal: new AbortController().signal });
}
/** The LAW_FIELDS a TypeScript text names in code: an identifier (a declaration, a property access, a destructured or private name) or a
 * string literal spelling one, read from the parsed source, so a comment never counts (rider F5) and an escaped spelling does. */
function lawFieldsIn(text: string): string[] {
  const source = ts.createSourceFile("fields.ts", text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const named = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) named.add(node.text);
    else if (ts.isPrivateIdentifier(node)) named.add(node.text.slice(1));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return LAW_FIELDS.filter(field => named.has(field));
}

/** A reader's refusal: a short code naming the check that failed, and the detail a red reads. */
type Failure = readonly [code: string, detail: string];
const failIf = (bad: boolean, code: string, detail: string): Failure[] => (bad ? [[code, detail]] : []);
/** A markdown table: the header, its delimiter row and the body rows, one line each. */
const tableOf = (header: readonly string[], rows: readonly (readonly string[])[]): string => [header, header.map(() => "---"), ...rows].map(cells => `| ${cells.join(" | ")} |`).join("\n");
/** A status section's body: the program path line, then the program line as one "> " quote. */
const statusBody = (line: StatusLine): string => `${line.path}\n\n> ${line.text}`;
interface DossierSection {
  readonly heading: string;
  readonly depth: number;
  readonly parents: readonly string[];
  readonly body: string;
}
/** The dossier's sections in document order - the title's own (the intro) and the three under it - each with its markdown body. */
function dossierSections(): DossierSection[] {
  return [
    { heading: DOSSIER_TITLE, depth: 1, parents: [], body: DOSSIER_INTRO.join("\n\n") },
    { heading: STATUS_HEADING, depth: 2, parents: [DOSSIER_TITLE], body: STATUS_LINES.map(line => `### ${line.cite}\n\n${statusBody(line)}`).join("\n\n") },
    { heading: IDS_HEADING, depth: 2, parents: [DOSSIER_TITLE], body: tableOf(ID_HEADER, ID_ROWS) },
    { heading: POSTURE_HEADING, depth: 2, parents: [DOSSIER_TITLE], body: DOSSIER_POSTURE.join("\n\n") },
  ];
}
/** The dossier's bytes as the census composes them: each section's heading and body, one blank line between blocks, one final newline. */
const composedDossier = (): string => `${dossierSections().map(section => `${"#".repeat(section.depth)} ${section.heading}\n\n${section.body}`).join("\n\n")}\n`;
const FRAME = "census frame";
/** What a reader sees of a markdown fragment: its blocks in the shared rendered view (docsSection, under a synthetic title). HTML in a
 * pinned fragment needs no guard here: sectionMatches refuses any dossier section that carries HTML (control CH5). */
function rendered(markdown: string): readonly RenderedBlock[] {
  const section = docsSection(`# ${FRAME}\n\n${markdown}\n`, FRAME, 1, []);
  if (!section.ok) throw new Error(`the census's own markdown does not render as a section: ${section.why}`);
  return section.blocks;
}
/** The top-level headings marked renders, in order, as "<level> <text>". */
const headingsOf = (markdown: string): string[] =>
  marked
    .lexer(markdown)
    .filter((token): token is Tokens.Heading => token.type === "heading")
    .map(token => `${token.depth} ${token.text}`);
/** Acceptance (c)'s status rows as a reader sees them (respin 1, U1/U2): each "### <cite>" section binds once in the rendered view under
 * the title and "Status rows", runs to the next heading of level 1-3 (a "####" belongs to it), is HTML-free and is exactly its path
 * paragraph and its one quote; the quote's source line is the program line byte for byte, once in the whole dossier, with the sha-256
 * measured at the pin. */
function statusFailures(markdown: string, pinned: readonly StatusLine[] = STATUS_LINES): Failure[] {
  const lines = markdown.split("\n");
  return pinned.flatMap(line => {
    const where = `${DOSSIER} "${line.cite}"`;
    const match = sectionMatches(docsSection(markdown, line.cite, 3, [DOSSIER_TITLE, STATUS_HEADING]), rendered(statusBody(line)));
    const verbatim = lines.filter(source => source === `> ${line.text}`).length;
    return [
      ...failIf(!match.ok, "section", `${where}: ${match.why}`),
      ...failIf(verbatim !== 1, "verbatim", `${where}: the program line's source occurs ${verbatim} times in the dossier, never exactly once`),
      ...failIf(sha256(line.text) !== line.sha256, "sha256", `${where}: the pinned line is not the line measured at the pin`),
    ];
  });
}
/** A named-ID table's program-row cell: a program, a file and its line or line range first. */
const PROGRAM_ROW = /^(?:SIO|CSO) \S+\.md:\d+(?:-\d+)?(?:, |$)/;
/** Acceptance (c)'s named-ID rows as a reader sees them (respin 1, U1/U2): "## Named IDs" binds once in the rendered view under the
 * title, runs to the next level-1/2 heading (a "###" belongs to it), is HTML-free and is exactly the one table of ID_ROWS; the rows are
 * read from that section's OWN table (sectionTables, the same binding), and each names one family, cites its program rows and echoes
 * a status word, the rows naming every family in NAMES order. */
function idFailures(markdown: string, pinned: readonly (readonly string[])[] = ID_ROWS): Failure[] {
  const where = `${DOSSIER} "${IDS_HEADING}"`;
  const section = docsSection(markdown, IDS_HEADING, 2, [DOSSIER_TITLE]);
  if (!section.ok) return [["section", `${where}: ${section.why}`]];
  const match = sectionMatches(section, rendered(tableOf(ID_HEADER, pinned)));
  const grids = sectionTables(markdown, IDS_HEADING, 2, [DOSSIER_TITLE]).grids;
  const out: Failure[] = failIf(!match.ok, "blocks", `${where}: ${match.why}`);
  if (grids.length !== 1) return [...out, ["tables", `${where}: the section holds ${grids.length} tables, never exactly the named-ID table`]];
  const [header = [], ...rows] = grids[0] ?? [];
  out.push(...failIf(JSON.stringify(header) !== JSON.stringify(ID_HEADER), "header", `${where}: the table's header reads ${JSON.stringify(header)}`));
  out.push(...failIf(JSON.stringify(rows) !== JSON.stringify(pinned), "rows", `${where}: the table's rows are not the census's: ${JSON.stringify(rows)}`));
  for (const [index, cells] of rows.entries()) {
    const [ids = "", at = "", words = ""] = cells;
    const row = `${where} row ${index + 1}`;
    out.push(...failIf(cells.length !== 3 || namesIn(ids).length !== 1, "row-family", `${row}: names ${JSON.stringify(namesIn(ids))} in ${cells.length} cells, never one family in three`));
    out.push(...failIf(!PROGRAM_ROW.test(at), "row-cite", `${row}: cites no program row: ${at}`));
    out.push(...failIf(qualifiersIn(words).length === 0, "row-status", `${row}: echoes none of the programs' status words: ${words}`));
  }
  const families = [...new Set(rows.flatMap(cells => namesIn(cells[0] ?? "")))];
  out.push(...failIf(JSON.stringify(families) !== JSON.stringify(NAMES.map(name => name.id)), "families", `${where}: the rows name the families ${JSON.stringify(families)}`));
  return out;
}
/** The dossier as a reader sees it (respin 1, U2; row C3): it opens with its title, renders exactly the composed headings in order, and
 * each of its four sections binds once in the rendered view under its parent, HTML-free, its blocks exactly the composed section's. */
function dossierFailures(markdown: string): Failure[] {
  const headings = headingsOf(markdown);
  const expected = headingsOf(composedDossier());
  return [
    ...failIf(!markdown.startsWith(`# ${DOSSIER_TITLE}\n`), "title", `${DOSSIER}: the file does not open with its title`),
    ...failIf(JSON.stringify(headings) !== JSON.stringify(expected), "headings", `${DOSSIER}: renders the headings ${JSON.stringify(headings)}, never ${JSON.stringify(expected)}`),
    ...dossierSections().flatMap(section => {
      const match = sectionMatches(docsSection(markdown, section.heading, section.depth, section.parents), rendered(section.body));
      return failIf(!match.ok, `section:${section.heading}`, `${DOSSIER} "${section.heading}": ${match.why}`);
    }),
  ];
}
/** A shape's edit: `from` (present exactly once) becomes `to`; an empty `from` appends `to`. */
type Edit = readonly [from: string, to: string];
function edited(text: string, edits: readonly Edit[]): string {
  let out = text;
  for (const [from, to] of edits) {
    if (from === "") {
      out += to;
      continue;
    }
    const at = out.indexOf(from);
    if (at < 0 || out.indexOf(from, at + 1) >= 0) throw new Error(`a dossier shape's anchor is not in the dossier exactly once: ${from.slice(0, 60)}`);
    out = out.slice(0, at) + to + out.slice(at + from.length);
  }
  return out;
}
/** The end of the CSO status quote, the anchor of the shapes that edit acceptance (c)'s first row. */
const CSO_TAIL = "benchmark result claimed.**";
/** The refusal's dossier probes (gate g10-gate-s73, U1/U2), re-anchored on this dossier: each one a reader must refuse. */
const SHAPES: readonly (readonly [id: string, shape: string, edits: () => readonly Edit[]])[] = [
  ["S1", "a second '## Named IDs' at EOF whose row echoes no status word", () => [["", `\n## ${IDS_HEADING}\n\n${tableOf(ID_HEADER, [["HXSI-07", "SIO 04-admission-and-semantics.md:33", "see the program"]])}\n`]]],
  [
    "S2",
    "a '### Pending' subsection inside '## Named IDs' adding a TI-31 row with no status word",
    () => [[`\n\n## ${POSTURE_HEADING}\n`, `\n\n### Pending\n\n${tableOf(ID_HEADER, [["TI-31", "SIO 08-theorem-crosswalk.md:62", "open"]])}\n\n## ${POSTURE_HEADING}\n`]],
  ],
  [
    "S3",
    "a '## Notes' section above '## Named IDs' holding the real table in an HTML comment, the real status cells weakened to '-'",
    () => [
      [
        `## ${IDS_HEADING}\n\n${tableOf(ID_HEADER, ID_ROWS)}`,
        `## Notes\n\n<!--\n## ${IDS_HEADING}\n\n${tableOf(ID_HEADER, ID_ROWS)}\n-->\n\n## ${IDS_HEADING}\n\n${tableOf(
          ID_HEADER,
          ID_ROWS.map(([ids = "", at = ""]) => [ids, at, "-"]),
        )}`,
      ],
    ],
  ],
  ["S4", "a '#### Note' inside '### CSO README.md:3' quoting a superseding status", () => [[CSO_TAIL, `${CSO_TAIL}\n\n#### Note\n\n> Superseded: this status no longer applies.`]]],
  [
    "S5",
    "a hidden '### CSO README.md:3' copy inside an HTML comment at EOF",
    () => [["", `\n<!--\n### ${STATUS_LINES[0]?.cite}\n\n${STATUS_LINES[0] === undefined ? "" : statusBody(STATUS_LINES[0])}\n-->\n`]],
  ],
  [
    "S6",
    "a count-preserving rewrite: the second intro paragraph and the first two posture paragraphs dropped, a duplicate '## Named IDs' appended",
    () => [
      [`${DOSSIER_INTRO[1]}\n\n`, ""],
      [`${DOSSIER_POSTURE[0]}\n\n${DOSSIER_POSTURE[1]}\n\n`, ""],
      ["", `\n## ${IDS_HEADING}\n\n| HXSI-07 | registered, design-only |\n| TI-31 | admitted, not implemented |\n`],
    ],
  ],
  [
    "S7",
    "a count-preserving section-bound rewrite: two intro sentences dropped, a '#### Note' with a superseding quote inside '### CSO README.md:3'",
    () => [
      [`${DOSSIER_INTRO[1]}\n\n`, ""],
      [" CSO is docs/programs/certified-structural-optimization-2026-10-18 and SIO is docs/programs/structural-information-optimization-2026-10-17.", ""],
      [CSO_TAIL, `${CSO_TAIL}\n\n#### Note\n\n> Superseded: this status no longer applies.`],
    ],
  ],
  [
    "S8",
    "the whole '## Named IDs' table wrapped in one HTML comment, no other edit",
    () => [
      [`## ${IDS_HEADING}\n\n| ${ID_HEADER[0]} |`, `## ${IDS_HEADING}\n<!--\n| ${ID_HEADER[0]} |`],
      [`| ${(ID_ROWS.at(-1) ?? []).join(" | ")} |\n`, `| ${(ID_ROWS.at(-1) ?? []).join(" | ")} |-->\n`],
    ],
  ],
  ["S9", "the CSO status quote wrapped in an HTML comment", () => [["\n\n> **2026-10-18. DESIGN ONLY.", "\n<!--\n> **2026-10-18. DESIGN ONLY."], [CSO_TAIL, `${CSO_TAIL} -->`]]],
  ["S10", "a superseding paragraph inside '## Named IDs' above its table, the table untouched", () => [[`## ${IDS_HEADING}\n\n`, `## ${IDS_HEADING}\n\nThese rows are superseded.\n\n`]]],
  [
    "S11",
    "a named-ID row re-split across its cells, its rendered text unchanged (the same-view class)",
    () => [["| HXSI-01 to HXSI-06 | SIO 04-admission-and-semantics.md:22-32,", "| HXSI-01 to | HXSI-06 SIO 04-admission-and-semantics.md:22-32,"]],
  ],
  ["S12", "a status cell's words bolded, its rendered text unchanged", () => [['| DESIGN ONLY (SIO README.md:3): "conditional human derivations', '| **DESIGN ONLY** (SIO README.md:3): "conditional human derivations']]],
  ["S13", "a line above the dossier's title", () => [[`# ${DOSSIER_TITLE}\n`, `Draft.\n\n# ${DOSSIER_TITLE}\n`]]],
  ["S14", "a '## Notes' section between '## Status rows' and '## Named IDs', every pinned section untouched", () => [[`\n\n## ${IDS_HEADING}\n`, `\n\n## Notes\n\nSee the program.\n\n## ${IDS_HEADING}\n`]]],
];
/** C2's coordinated hollows: ID_ROWS and the dossier's table edited together, so the table matches its pin and only a row rule refuses it. */
const ROW_HOLLOWS: readonly (readonly [id: string, shape: string, rows: () => readonly (readonly string[])[]])[] = [
  ["CH1", "a status cell emptied of the programs' words", () => ID_ROWS.map((cells, index) => (index === 0 ? [cells[0] ?? "", cells[1] ?? "", "-"] : cells))],
  ["CH2", "a program-row cell stripped of its cite", () => ID_ROWS.map((cells, index) => (index === 0 ? [cells[0] ?? "", "the applicable laws", cells[2] ?? ""] : cells))],
  ["CH3", "a row naming two families", () => ID_ROWS.map((cells, index) => (index === 0 ? ["HXSI-01 to HXSI-06 and TI-23", cells[1] ?? "", cells[2] ?? ""] : cells))],
  ["CH4", "the hx.optim.spoke.exchange.v1 row removed", () => ID_ROWS.slice(0, -1)],
  ["CH5", "a status cell carrying an HTML comment", () => ID_ROWS.map((cells, index) => (index === 0 ? [cells[0] ?? "", cells[1] ?? "", `${cells[2] ?? ""} <!-- superseded -->`] : cells))],
];
/** Each coordinated row hollow, read against its own hollowed rows: every one is refused, by code. */
function rowHollows(): { id: string; codes: string[] }[] {
  const live = textOf(DOSSIER);
  return ROW_HOLLOWS.map(([id, shape, rows]) => {
    const hollow = rows();
    const codes = idFailures(edited(live, [[tableOf(ID_HEADER, ID_ROWS), tableOf(ID_HEADER, hollow)]]), hollow).map(([code]) => code);
    expect(codes.length, `${id} (${shape}) is refused`).toBeGreaterThan(0);
    return { id, codes };
  });
}
/** C1's coordinated hollow: the CSO status line rewritten in the dossier and in its pin together, the sha-256 measured at the pin kept. */
function lineHollow(): string[] {
  const [first, ...rest] = STATUS_LINES;
  if (first === undefined) throw new Error("the census pins no status line");
  const text = first.text.replace(" DESIGN ONLY.", "");
  return statusFailures(edited(textOf(DOSSIER), [[first.text, text]]), [{ ...first, text }, ...rest]).map(([code]) => code);
}
/** Each named shape applied to the live dossier and read by `reader`: every one changes the bytes and is refused, by code. */
function controlsOf(ids: readonly string[], reader: (markdown: string) => Failure[]): { id: string; codes: string[] }[] {
  const live = textOf(DOSSIER);
  return ids.map(id => {
    const shape = SHAPES.find(([name]) => name === id);
    if (shape === undefined) throw new Error(`no dossier shape ${id}`);
    const mutant = edited(live, shape[2]());
    expect(mutant === live, `${id} changes the dossier`).toBe(false);
    const codes = reader(mutant).map(([code]) => code);
    expect(codes.length, `${id} (${shape[1]}) is refused`).toBeGreaterThan(0);
    return { id, codes };
  });
}

interface ExportRow {
  readonly id: string;
  readonly notes: string;
}
/** The tracked bead export's row for `id`. */
function exportRow(id: string): ExportRow {
  for (const line of textOf(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.notes === "string") return { id, notes: row.notes };
  }
  throw new Error(`the bead export holds no row for ${id}`);
}
/** The text between `from` and `to` in `text`, both required. */
function between(text: string, from: string, to: string): string {
  const start = text.indexOf(from);
  const end = start < 0 ? -1 : text.indexOf(to, start + from.length);
  if (start < 0 || end < 0) throw new Error(`the filing holds no "${from}" ... "${to}" span`);
  return text.slice(start + from.length, end);
}

/** How a case text is read: "raw" the raw leg of x.md, "md" the whole judge of x.md (raw, rendered and HTML legs), "html" the whole judge of
 * the HTML page x.html, "ts" the judge of x.ts, "rendered" the rendered leg's sentences of x.md, and the instruments' own outputs. */
type CaseKind = "raw" | "md" | "html" | "ts" | "rendered" | "cut" | "cutMarkdown" | "names" | "fields";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  /** A kind per text, overriding `kind` (R4 and R5 pin their families in a Markdown page and in code). */
  readonly kinds?: readonly CaseKind[];
  readonly texts: readonly string[];
  readonly outcome: readonly (readonly string[])[];
  /** MR4 only (RESPIN 2 of wb-jh2f): its texts of an ordinary start tag in an HTML block are read through every other kind of tag too (EVERY_TAG). */
  readonly everyTag?: boolean;
}
/** A kind of tag other than an ordinary start tag (RESPIN 2 of wb-jh2f; header, row M MR4): the source an ordinary start tag's attributes and
 * the rest are put behind (`open`, in place of EVERY_TAG_OPEN) and end with (`close`, in place of EVERY_TAG_CLOSE), and the outcome the kind
 * reads, predicted from that start tag's pinned outcome (`outcome`) - never from the census's live reading; an inline kind's prediction also
 * takes the element's text marked hands over between the start and the end tag (FOLLOW-UP wb-a7w6). */
interface TagKind {
  readonly id: string;
  readonly open: string;
  readonly close: string;
  readonly outcome: (pinned: readonly string[], element: string) => string[];
  /** An inline token's kind: the tag's name. Its text (closed by the element's end tag) is read only where marked lexes the start tag as one
   * inline HTML token opening with that name (the attributes marked's tag rule reads), and only as a Markdown page. */
  readonly inline?: string;
}
const EVERY_TAG_OPEN = "<div><a";
const EVERY_TAG_CLOSE = "</a></div>";
/** An MR4 text of an ordinary start tag in an HTML block: "<div><a", then white space, "/" or ">" (the name ends), to "</a></div>". */
const EVERY_TAG_TEXT = /^<div><a[\t\n\f\r />]/;
/** A pinned sentence of an HTML block: its line, its text and its plain text (an HTML block's text is never plain, so all BLANK). */
const BLOCK_SENTENCE = /^(\d+) (.*) \| plain (#*)$/su;
function blockSentence(sentence: string): { line: string; text: string; plain: string } {
  const match = BLOCK_SENTENCE.exec(sentence);
  if (match === null) throw new Error(`not a pinned sentence of an HTML block: ${sentence}`);
  return { line: match[1] ?? "", text: match[2] ?? "", plain: match[3] ?? "" };
}
/** Pinned sentences read on line 1: a carriage return, which an HTML page reads as white space and marked as a line feed, moves no line. */
const oneLine = (sentences: readonly string[]): string[] => sentences.map(sentence => sentence.replace(/^\d+ /u, "1 "));
/** What an inline start tag's text shows in plain text (FOLLOW-UP wb-a7w6): marked's start-tag token is HTML, never plain, so what the census
 * shows of that token after the tag ends (a tag the census ends inside marked's token) stays BLANK and only the element's text marked hands
 * over is plain; null where the whole text is plain (the tag ends with marked's token). `plain` is the pinned block sentence's, all BLANK. */
function inlinePlain(text: string, plain: string, element: string): string | null {
  const inline = `${plain.slice(0, plain.length - element.length)}${element}`;
  return inline === text ? null : inline;
}
/** The kind reads what the start tag reads: a block-level, RCDATA or raw-text start tag, whose text (or element text) is the start tag's text. */
const sameAsStart = (pinned: readonly string[]): string[] => [...pinned];
/** The kind is an end tag after the text "x" and breaks the sentence (a block-level element's end tag): "x", then what the start tag reads. */
const brokenAfterX = (pinned: readonly string[]): string[] => ["1 x | plain #", ...pinned];
/** The kind is an end tag after the text "x" that does not break the sentence: "x" joins what the start tag reads (on line 1, where "x" is). */
const joinedAfterX = (pinned: readonly string[]): string[] =>
  pinned.length === 0
    ? ["1 x | plain #"]
    : pinned.map(sentence => {
        const { text, plain } = blockSentence(sentence);
        return `1 x${text} | plain #${plain}`;
      });
/** An inline start tag that breaks the sentence (a block-level element's): "Note", then the start tag's text, its element's text plain
 * (marked's, inlinePlain), beside the element's end tag. */
const brokenAfterNote = (pinned: readonly string[], element: string): string[] =>
  pinned.length === 1
    ? pinned.flatMap(sentence => {
        const { line, text, plain } = blockSentence(sentence);
        const inline = inlinePlain(text, plain, element);
        return ["1 Note | html", inline === null ? `${line} ${text} | html` : `${line} ${text} | plain ${inline} | html`];
      })
    : ["an inline tag the input ends inside is no inline token"];
/** An inline start tag that does not break the sentence: "Note " joins the start tag's text, its element's text plain (marked's, inlinePlain),
 * beside the HTML tokens. */
const joinedAfterNote = (pinned: readonly string[], element: string): string[] =>
  pinned.length === 1
    ? pinned.map(sentence => {
        const { text, plain } = blockSentence(sentence);
        const inline = inlinePlain(text, plain, element);
        return inline === null ? `1 Note ${text} | html` : `1 Note ${text} | plain Note ${inline} | html`;
      })
    : ["an inline tag the input ends inside is no inline token"];
/** A plaintext start tag: its text runs to the end, so the start tag's text gains the close "</a></div>" as written. */
const toTheEnd = (pinned: readonly string[]): string[] =>
  pinned.map(sentence => {
    const { line, text, plain } = blockSentence(sentence);
    return `${line} ${text}${EVERY_TAG_CLOSE} | plain ${plain}${"#".repeat(EVERY_TAG_CLOSE.length)}`;
  });
/** Every kind of tag MR4 reads the ordinary start tag's attributes through (refusal #2 U1 and U2): in an HTML block, an ordinary end tag; a
 * block-level start and end tag; each RCDATA element's and each raw-text element's start and end tag (an element of BLOCK_TAGS breaks the
 * sentence at its tags: textarea, title, script, style, iframe, noframes; xmp, noembed and noscript do not); a plaintext start tag; and in an
 * inline token (behind "Note "), the start tag of an ordinary (span), a block-level (p), each RCDATA and each raw-text element that ends (a plaintext
 * element an inline token opens runs, as a reader's tokenizer reads it, past marked's token: the residual R12). */
const EVERY_TAG: readonly TagKind[] = [
  { id: "ordinary end tag", open: "<div><b>x</b", close: EVERY_TAG_CLOSE, outcome: joinedAfterX },
  { id: "block-level start tag", open: "<div><p", close: EVERY_TAG_CLOSE, outcome: sameAsStart },
  { id: "block-level end tag", open: "<div><p>x</p", close: EVERY_TAG_CLOSE, outcome: brokenAfterX },
  ...(["textarea", "title", "script", "style", "xmp", "iframe", "noembed", "noframes", "noscript"] as const).flatMap((name): TagKind[] => [
    { id: `${name} start tag`, open: `<div><${name}`, close: `</${name}></div>`, outcome: sameAsStart },
    {
      id: `${name} end tag`,
      open: `<div><${name}>x</${name}`,
      close: EVERY_TAG_CLOSE,
      outcome: name === "xmp" || name === "noembed" || name === "noscript" ? joinedAfterX : brokenAfterX,
    },
  ]),
  { id: "plaintext start tag", open: "<div><plaintext", close: EVERY_TAG_CLOSE, outcome: toTheEnd },
  ...(["span", "p", "textarea", "title", "script", "style", "xmp", "iframe", "noembed", "noframes", "noscript"] as const).map(
    (name): TagKind => ({
      id: `inline ${name} start tag`,
      open: `Note <${name}`,
      close: `</${name}>`,
      outcome: name === "span" || name === "xmp" || name === "noembed" || name === "noscript" ? joinedAfterNote : brokenAfterNote,
      inline: name,
    }),
  ),
];
/** The element's text marked hands over when it lexes `text` as one paragraph holding exactly two inline HTML tokens - a start tag opening with
 * `<${name}` and that element's end tag (which a reader's tokenizer ends the element at, as marked does) - read from the tokens between them;
 * null where marked lexes it otherwise. */
function oneInlineTag(text: string, name: string): string | null {
  const tokens = marked.lexer(text);
  const paragraph = tokens.length === 1 && tokens[0]?.type === "paragraph" ? tokenChildren(tokens[0]) : [];
  const html = paragraph.flatMap((token, index) => (token.type === "html" ? [index] : []));
  const [open, close] = html;
  if (html.length !== 2 || open === undefined || close === undefined) return null;
  if (!(paragraph[open]?.raw.startsWith(`<${name}`) ?? false) || paragraph[close]?.raw !== `</${name}>`) return null;
  return paragraph
    .slice(open + 1, close)
    .map(token => token.raw)
    .join("");
}
/** Rows M and R: each text judged by its kind (a per-text kind in `kinds`), with its expected outcome in order. */
const CASES: readonly Case[] = [
  { pin: "MS1", kind: "cut", texts: ["One names a. Two names b! Three? Four; five"], outcome: [["One names a.", "Two names b!", "Three?", "Four;", "five"]] },
  { pin: "MS2", kind: "cut", texts: ["para one\n\npara two\n| a | b |\n| c | d |"], outcome: [["para one", "para two", "| a | b |", "| c | d |"]] },
  { pin: "MS3", kind: "cutMarkdown", texts: ["# Head\n- one\n> two\n1. three\n2) four\n## Next"], outcome: [["# Head", "- one", "> two", "1. three", "2) four", "## Next"]] },
  { pin: "MS4", kind: "cut", texts: ["The hx.optim. laws stay whole.\n1. one\nlist number. HX.OPTIM. x"], outcome: [["The hx.optim. laws stay whole.", "1. one\nlist number.", "HX.OPTIM. x"]] },
  {
    pin: "MN1",
    kind: "names",
    texts: ["HXSI-01", "hxsi-06", "(HXSI-03)", "`HXSI-`", "HXSI-01..06", "HXSIX-1", "AHXSI-01", "HXSI01", "HXSI_01", "2HXSI-01"],
    outcome: [["HXSI"], ["HXSI"], ["HXSI"], ["HXSI"], ["HXSI"], [], [], [], [], []],
  },
  {
    pin: "MN2",
    kind: "names",
    texts: ["TI-23", "ti-24", "[TI-*]", "TI-", "`TI-01`", "MULTI-PASS", "ANTI-join", "TI23", "TI_23", "aTI-2", "3TI-4"],
    outcome: [["TI"], ["TI"], ["TI"], ["TI"], ["TI"], [], [], [], [], [], []],
  },
  {
    pin: "MN3",
    kind: "names",
    texts: ["hx.optim.spoke.exchange.v1", "HX.OPTIM.x", "hx.optim.", "`hx.optim.spoke`", "hx.optimize", "hx.optim", "hxoptim.spoke", "xhx.optim.spoke", "hx_optim.spoke"],
    outcome: [["HXOPTIM"], ["HXOPTIM"], ["HXOPTIM"], ["HXOPTIM"], [], [], [], [], []],
  },
  {
    pin: "MC",
    kind: "raw",
    texts: [
      ...CLAIMS.flatMap(claim => claim.forms.map(form => `HXSI-01 ${form} here.`)),
      "HXSI-01 is not registered.",
      "HXSI-01 is a registry entry, verifiable, an admittance, a benchmarker and a checkpoint.",
      "TI-23 is a theorem that Lean elaborates.",
      "TI-23 is a theorem Lean will elaborate.",
      "TI-23 is Lean-elaborated.",
    ],
    outcome: [
      ...CLAIMS.flatMap(claim => claim.forms.map(() => [`x.md:1 HXSI: unqualified-${claim.id}`])),
      ["x.md:1 HXSI: unqualified-registered"],
      [],
      ["x.md:1 TI: unqualified-elaborated"],
      ["x.md:1 TI: unqualified-elaborated"],
      ["x.md:1 TI: unqualified-elaborated"],
    ],
  },
  {
    pin: "MQ",
    kind: "raw",
    texts: [
      ...QUALIFIERS.flatMap(qualifier => qualifier.forms.map(form => `TI-23 is registered, ${form}.`)),
      "TI-23 is registered, design-only.",
      "TI-23 is registered, DESIGN_ONLY.",
      "TI-23 is registered, Lean source-authored only.",
      "TI-23 is registered, designed only.",
      "TI-23 is registered, implemented.",
      "TI-23 is registered by a human.",
      "TI-23 is registered, authored only.",
    ],
    outcome: [
      ...QUALIFIERS.flatMap(qualifier => qualifier.forms.map(() => [])),
      [],
      [],
      [],
      ["x.md:1 TI: unqualified-registered"],
      ["x.md:1 TI: unqualified-registered"],
      ["x.md:1 TI: unqualified-registered"],
      ["x.md:1 TI: unqualified-registered"],
    ],
  },
  {
    pin: "MF",
    kind: "raw",
    texts: ["intro line\n\nThe second paragraph names TI-23 as benchmarked.\n", "HXSI-01 and TI-23 are registered.", "TI-23 is benchmarked and admitted.", "HXSI-01 is registered.\n\nTI-24 is verified.\n"],
    outcome: [["x.md:3 TI: unqualified-benchmarked"], ["x.md:1 HXSI+TI: unqualified-registered"], ["x.md:1 TI: unqualified-admitted"], ["x.md:1 HXSI: unqualified-registered", "x.md:3 TI: unqualified-verified"]],
  },
  {
    pin: "MK",
    kind: "raw",
    texts: [
      "hx.optim.verified.v1 ships.",
      "hx.optim.verified.v1 is verified.",
      "HXSI-01 per 04-admission-and-semantics.md:22.",
      "HXSI-01 is registered per design-only.md.",
      "TI-23 is registered, DESIGN HXSI-02 ONLY.",
      "TI-23 is registered, design a.md only.",
    ],
    outcome: [[], ["x.md:1 HXOPTIM: unqualified-verified"], [], ["x.md:1 HXSI: unqualified-registered"], ["x.md:1 HXSI+TI: unqualified-registered"], ["x.md:1 TI: unqualified-registered"]],
  },
  {
    pin: "MR1",
    kind: "rendered",
    texts: [
      "HXSI-01 is a registered runtime law <!-- DESIGN ONLY -->.",
      "HX<!-- -->SI-01 is a reg*ist*ered runtime law.",
      '**HXSI**\\-01 is a [registered runtime law](https://example.invalid/design-only "a design only title").',
      '![DESIGN ONLY](x.png "an image title") HXSI-01 is ~~DESIGN ONLY~~ registered.',
      "HXSI-01 is a registered runtime law<span hidden>, DESIGN ONLY</span>.",
      "HXSI&#45;01 &#x48;XSI-02 hx&period;optim.x regis&shy;tered plan&nbsp;route &rarr; &#00000045; &shy &foo; &#0; &amp;lt;",
      `\`HXSI&#45;01\` and \`HXSI${cp(0x200b)}-01\` code`,
      `HXSI${cp(0x200b)}-01 regis${cp(0xad)}tered x${cp(0xfe0f)}y${cp(0x07)}z`,
      "line one  \nline two\\\nthree.",
      "DESIGN ONLY: x<p>HXSI-01 is registered.</p> plan<br>route",
      "\\<!-- design only --> stays visible.",
      '[d]: https://example.invalid "a reference title"\nHXSI-01 is [registered][d].',
      `HXSI-01 is a ${RLO}deretsiger${PDF} law, ${RLO}YLNO NGISED${PDF}.`,
      `${RLO}10-ISXH is registered`,
      `x ${cp(0x202d)}a ${RLO}cb${PDF} d${PDF} y${cp(0x2067)} z${cp(0x2069)}.`,
    ],
    outcome: [
      ["1 HXSI-01 is a registered runtime law . | html"],
      ["1 HXSI-01 is a registered runtime law. | html"],
      ["1 HXSI-01 is a registered runtime law.", "1 a design only title"],
      ["1 DESIGN ONLY HXSI-01 is DESIGN ONLY registered. | plain ########### HXSI-01 is ########### registered.", "1 an image title"],
      ["1 HXSI-01 is a registered runtime law, DESIGN ONLY. | html"],
      ["1 HXSI-01 HXSI-02 hx.optim.x registered plan<U+00A0>route # &#00000045;", `1 &shy # ${cp(0xfffd)} &lt;`],
      ["1 HXSI&#45;01 and HXSI-01 code"],
      ["1 HXSI-01 registered xyz"],
      ["1 line one\nline two\nthree."],
      ["1 DESIGN ONLY: x | html", "1 HXSI-01 is registered. | html", "1 plan\nroute | html"],
      ["1 <!-- design only --> stays visible."],
      ["2 HXSI-01 is registered.", "2 a reference title"],
      ["1 HXSI-01 is a registered law, DESIGN ONLY. | plain #########################################"],
      ["1 deretsiger si HXSI-01 | plain #####################"],
      ["1 x a bc d y z. | plain #############"],
    ],
  },
  {
    pin: "MR2",
    kind: "rendered",
    texts: [
      [
        "# Title HXSI-01",
        "",
        "para one",
        "wrapped. Second sentence.",
        "",
        "- item **one**",
        "- item two",
        "  - nested three",
        "",
        "> quote four",
        "> five",
        "",
        "| h1 | h2 |",
        "| --- | --- |",
        "| c1 | c2 |",
        "| c3 | c4 |",
        "",
        "```",
        "code six",
        "```",
        "",
        "    indented seven",
        "",
        "<div>",
        "block <b>eight</b> HX<i></i>SI-02",
        "</div>",
        "",
        '[d]: https://example.invalid "t"',
        "",
        "---",
        "",
        "Setext nine",
        "===",
        "",
        "1. ordered ten",
        "2. ordered eleven",
        "",
      ].join("\n"),
    ],
    outcome: [
      ["1 Title HXSI-01", "3 para one\nwrapped.", "4 Second sentence.", "6 item one", "7 item two", "8 nested three", "10 quote four\nfive", "13 h1 | h2", "15 c1 | c2", "16 c3 | c4", "19 code six", "22 indented seven", "25 block eight HXSI-02 | plain ###################", "32 Setext nine", "35 ordered ten", "36 ordered eleven"],
    ],
  },
  {
    pin: "MR3",
    kind: "md",
    kinds: ["md", "md", "md", "md", "md", "md", "md", "md", "md", "md", "html", "html", "md", "md", "md", "md"],
    texts: [
      "HXSI-01 is registered.",
      "HXSI-01 is registered <!-- DESIGN ONLY -->.",
      "<!-- HXSI-01 is registered. -->",
      '<abbr title="TI-23 is registered">x</abbr> DESIGN ONLY.',
      `HXSI${cp(0x200b)}-01 is registered.`,
      "HXSI&#45;01 is registered.",
      "hx&#46;optim.spoke is admitted.",
      "HXSI-01 is registered, DESIGN ONLY.",
      "intro\n\nHXSI-01 is\nregistered.",
      "TI-23 is registered, ~~design only~~ and DESIGN ONLY.",
      "<p>HXSI-01 is registered, DESIGN ONLY.</p>",
      "<p>Nothing here names a law.</p>",
      `HXSI-01 is regis${cp(0x200b)}tered.`,
      `HXSI-01 is regis${cp(0xad)}tered.`,
      `HXSI-01 is regis${cp(0x2060)}tered.`,
      `HXSI-01 is regis${cp(0xfe0f)}tered.`,
    ],
    outcome: [
      ["x.md:1 HXSI: unqualified-registered", "x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: unqualified-registered", "x.md:1 HXSI: html-unqualified-registered"],
      ["x.md:1 TI: html-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXOPTIM: rendered-unqualified-admitted"],
      [],
      ["x.md:3 HXSI: unqualified-registered", "x.md:3 HXSI: rendered-unqualified-registered"],
      [],
      ["x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      [],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
      ["x.md:1 HXSI: rendered-unqualified-registered"],
    ],
  },
  {
    pin: "MR4",
    kind: "rendered",
    everyTag: true,
    kinds:[...Array.from({ length: 38 }, (): CaseKind => "rendered"), "html", ...Array.from({ length: 191 }, (): CaseKind => "rendered"), ...Array.from({ length: 31 }, (): CaseKind => "html"), ...Array.from({ length: 106 }, (): CaseKind => "rendered"), ...Array.from({ length: 46 }, (): CaseKind => "html"), ...Array.from({ length: 32 + 2 * INLINE_SPACE.length }, (): CaseKind => "rendered")],
    texts: [
      "<!-->one HXSI-01 two.",
      "<!--->two",
      "<div><!-- a --!>three</div>",
      "<div><!-- a --!x four --></div>",
      "<div><!---->five</div>",
      "<div><?pi > six ?></div>",
      "<div><!DOCTYPE x> seven</div>",
      "<div><![CDATA[ a > eight ]]></div>",
      "<div></ x > nine</> ten</div>",
      '<div>reg<b.x></b.x>istered <span title="a>b">eleven</span> <i x=a>twelve</i></div>',
      "<textarea><!-- a --> <b>thirteen</b> &#45;</textarea>",
      "<title>fourteen <i>x</i></title>",
      "<script>// <!-- a --> fifteen &#45;</script>",
      "<xmp>\n<b>sixteen</b>\n</xmp>",
      "<plaintext>\n<b>x</b> seventeen",
      '<div>eighteen <span title="x',
      "Note <!-- a --!> nineteen -->",
      "Note <?x > twenty ?>",
      "Note <![CDATA[ a > twentyone ]]>",
      'Note <span title="a>b">twentytwo</span>',
      "<div>twenty<p.x>three</div>",
      "<textarea>a</textareax> b</textarea>",
      "<TITLE>twentyfour</Title> twentyfive",
      '<div><a ="x>twentysix">y</a></div>',
      '<div><i x=a b="c>d">twentyseven</i></div>',
      '<div><a b = "x>y">twentyeight</a></div>',
      `<div><span title='a">b'>twentynine</span></div>`,
      `<div><i x="c'>d">thirty</i></div>`,
      '<div><a b/="x>y">thirtyone</a></div>',
      '<div><a b="c"="x>y">thirtytwo</a></div>',
      '<div><a b="c" ="x>y">thirtythree</a></div>',
      '<div><a b/ ="x>y">thirtyfour</a></div>',
      '<div><a b="c"d="x>y">thirtyfive</a></div>',
      '<div><a b  ="x>y">thirtysix</a></div>',
      "<textarea>a</textarea\tb>thirtyseven",
      "<title>a</title\n>thirtyeight",
      `<textarea>a</textarea${cp(0x0c)}>thirtynine`,
      "<textarea>a</textarea/>forty",
      "<title>HXSI-01</title\r> is registered.",
      // RESPIN 1 of wb-jh2f (U1b): each white space a tag reads (a space, a tab, a line feed, a form feed) at each place it reads one: its name's end, before an attribute's name, after it, a second one after it, before a value, after an unquoted value, after a quoted value, after a solidus, inside a double- and a single-quoted value
      '<div><a b="x>y">nameendsp</a></div>',
      '<div><a\tb="x>y">nameendtab</a></div>',
      '<div><a\nb="x>y">nameendlf</a></div>',
      `<div><a${cp(0x0c)}b="x>y">nameendff</a></div>`,
      '<div><a ="x>y">beforenamesp</a></div>',
      '<div><a\t="x>y">beforenametab</a></div>',
      '<div><a\n="x>y">beforenamelf</a></div>',
      `<div><a${cp(0x0c)}="x>y">beforenameff</a></div>`,
      '<div><a b ="x>y">afternamesp</a></div>',
      '<div><a b\t="x>y">afternametab</a></div>',
      '<div><a b\n="x>y">afternamelf</a></div>',
      `<div><a b${cp(0x0c)}="x>y">afternameff</a></div>`,
      '<div><a b  ="x>y">secondspacesp</a></div>',
      '<div><a b \t="x>y">secondspacetab</a></div>',
      '<div><a b \n="x>y">secondspacelf</a></div>',
      `<div><a b ${cp(0x0c)}="x>y">secondspaceff</a></div>`,
      '<div><a b= "x>y">beforevaluesp</a></div>',
      '<div><a b=\t"x>y">beforevaluetab</a></div>',
      '<div><a b=\n"x>y">beforevaluelf</a></div>',
      `<div><a b=${cp(0x0c)}"x>y">beforevalueff</a></div>`,
      '<div><a c=d b="x>y">afterunquotedsp</a></div>',
      '<div><a c=d\tb="x>y">afterunquotedtab</a></div>',
      '<div><a c=d\nb="x>y">afterunquotedlf</a></div>',
      `<div><a c=d${cp(0x0c)}b="x>y">afterunquotedff</a></div>`,
      '<div><a b="c" ="x>y">afterquotedsp</a></div>',
      '<div><a b="c"\t="x>y">afterquotedtab</a></div>',
      '<div><a b="c"\n="x>y">afterquotedlf</a></div>',
      `<div><a b="c"${cp(0x0c)}="x>y">afterquotedff</a></div>`,
      '<div><a b/ ="x>y">aftersolidussp</a></div>',
      '<div><a b/\t="x>y">aftersolidustab</a></div>',
      '<div><a b/\n="x>y">aftersoliduslf</a></div>',
      `<div><a b/${cp(0x0c)}="x>y">aftersolidusff</a></div>`,
      '<div><a b="x y>z">indoublesp</a></div>',
      '<div><a b="x\ty>z">indoubletab</a></div>',
      '<div><a b="x\ny>z">indoublelf</a></div>',
      `<div><a b="x${cp(0x0c)}y>z">indoubleff</a></div>`,
      "<div><a b='x y>z'>insinglesp</a></div>",
      "<div><a b='x\ty>z'>insingletab</a></div>",
      "<div><a b='x\ny>z'>insinglelf</a></div>",
      `<div><a b='x${cp(0x0c)}y>z'>insingleff</a></div>`,
      // RESPIN 1 (U1, U1b): each RCDATA and raw-text element that ends, read to its end tag bounded by a space, a tab, a line feed, a form feed, "/" and ">"
      "<div><textarea>a</textarea > textareasp</div>",
      "<div><textarea>a</textarea\t> textareatab</div>",
      "<div><textarea>a</textarea\n> textarealf</div>",
      `<div><textarea>a</textarea${cp(0x0c)}> textareaff</div>`,
      "<div><textarea>a</textarea/> textareaslash</div>",
      "<div><textarea>a</textarea> textareagt</div>",
      "<div><title>a</title > titlesp</div>",
      "<div><title>a</title\t> titletab</div>",
      "<div><title>a</title\n> titlelf</div>",
      `<div><title>a</title${cp(0x0c)}> titleff</div>`,
      "<div><title>a</title/> titleslash</div>",
      "<div><title>a</title> titlegt</div>",
      "<div><script>a</script > scriptsp</div>",
      "<div><script>a</script\t> scripttab</div>",
      "<div><script>a</script\n> scriptlf</div>",
      `<div><script>a</script${cp(0x0c)}> scriptff</div>`,
      "<div><script>a</script/> scriptslash</div>",
      "<div><script>a</script> scriptgt</div>",
      "<div><style>a</style > stylesp</div>",
      "<div><style>a</style\t> styletab</div>",
      "<div><style>a</style\n> stylelf</div>",
      `<div><style>a</style${cp(0x0c)}> styleff</div>`,
      "<div><style>a</style/> styleslash</div>",
      "<div><style>a</style> stylegt</div>",
      "<div><xmp>a</xmp > xmpsp</div>",
      "<div><xmp>a</xmp\t> xmptab</div>",
      "<div><xmp>a</xmp\n> xmplf</div>",
      `<div><xmp>a</xmp${cp(0x0c)}> xmpff</div>`,
      "<div><xmp>a</xmp/> xmpslash</div>",
      "<div><xmp>a</xmp> xmpgt</div>",
      "<div><iframe>a</iframe > iframesp</div>",
      "<div><iframe>a</iframe\t> iframetab</div>",
      "<div><iframe>a</iframe\n> iframelf</div>",
      `<div><iframe>a</iframe${cp(0x0c)}> iframeff</div>`,
      "<div><iframe>a</iframe/> iframeslash</div>",
      "<div><iframe>a</iframe> iframegt</div>",
      "<div><noembed>a</noembed > noembedsp</div>",
      "<div><noembed>a</noembed\t> noembedtab</div>",
      "<div><noembed>a</noembed\n> noembedlf</div>",
      `<div><noembed>a</noembed${cp(0x0c)}> noembedff</div>`,
      "<div><noembed>a</noembed/> noembedslash</div>",
      "<div><noembed>a</noembed> noembedgt</div>",
      "<div><noframes>a</noframes > noframessp</div>",
      "<div><noframes>a</noframes\t> noframestab</div>",
      "<div><noframes>a</noframes\n> noframeslf</div>",
      `<div><noframes>a</noframes${cp(0x0c)}> noframesff</div>`,
      "<div><noframes>a</noframes/> noframesslash</div>",
      "<div><noframes>a</noframes> noframesgt</div>",
      "<div><noscript>a</noscript > noscriptsp</div>",
      "<div><noscript>a</noscript\t> noscripttab</div>",
      "<div><noscript>a</noscript\n> noscriptlf</div>",
      `<div><noscript>a</noscript${cp(0x0c)}> noscriptff</div>`,
      "<div><noscript>a</noscript/> noscriptslash</div>",
      "<div><noscript>a</noscript> noscriptgt</div>",
      // RESPIN 1: "/" ending a tag's name, ">" after an attribute's name and before a value, each quote inside an unquoted value, a plaintext end tag, a raw-text end tag in any case and one whose name runs on
      '<div><a/b="x>y">nameendslash</a></div>',
      "<div><a b >gtaftername</a></div>",
      "<div><a b=>gtbeforevalue</a></div>",
      '<div><a b=c"x>y">dquoteinunquoted</a></div>',
      "<div><a b=c'x>y'>squoteinunquoted</a></div>",
      "<div><plaintext>a</plaintext>plaintextnoend</div>",
      "<div><SCRIPT>a</Script> rawtextcase</div>",
      "<div><script>a</scriptx> rawtextnameon</div>",
      // RESPIN 1: each RCDATA element's text with its references decoded, each raw-text element's (plaintext's among them) with its references kept
      "<div><textarea>a&#45;b</textarea> textarearef</div>",
      "<div><title>a&#45;b</title> titleref</div>",
      "<div><script>a&#45;b</script> scriptref</div>",
      "<div><style>a&#45;b</style> styleref</div>",
      "<div><xmp>a&#45;b</xmp> xmpref</div>",
      "<div><iframe>a&#45;b</iframe> iframeref</div>",
      "<div><noembed>a&#45;b</noembed> noembedref</div>",
      "<div><noframes>a&#45;b</noframes> noframesref</div>",
      "<div><noscript>a&#45;b</noscript> noscriptref</div>",
      "<div><plaintext>a&#45;b plaintextref</div>",
      // RESPIN 1: each RCDATA and raw-text element's text (plaintext's among them) shown as written, its comments and tags as text
      "<div><textarea>a<!-- c --><b>x</b></textarea> textareashown</div>",
      "<div><title>a<!-- c --><b>x</b></title> titleshown</div>",
      "<div><script>a<!-- c --><b>x</b></script> scriptshown</div>",
      "<div><style>a<!-- c --><b>x</b></style> styleshown</div>",
      "<div><xmp>a<!-- c --><b>x</b></xmp> xmpshown</div>",
      "<div><iframe>a<!-- c --><b>x</b></iframe> iframeshown</div>",
      "<div><noembed>a<!-- c --><b>x</b></noembed> noembedshown</div>",
      "<div><noframes>a<!-- c --><b>x</b></noframes> noframesshown</div>",
      "<div><noscript>a<!-- c --><b>x</b></noscript> noscriptshown</div>",
      "<div><plaintext>a<!-- c --><b>x</b> plaintextshown</div>",
      // RESPIN 1: tagEnd's transition table, each state reading each character class, told from every target that reads otherwise (the word names the cell)
      '<div><a /=">tattributesslasha</a></div>',
      '<div><a ==">tattributeseqa</a></div>',
      '<div><a "=">tattributesdqa</a></div>',
      '<div><a ">tattributesdqb</a></div>',
      `<div><a '=">tattributessqa</a></div>`,
      "<div><a '>tattributessqb</a></div>",
      '<div><a b/==">tnameslasha</a></div>',
      '<div><a b"=">tnamedqa</a></div>',
      `<div><a b'=">tnamesqa</a></div>`,
      "<div><a b'>tnamesqb</a></div>",
      '<div><a bx=">tnameothera</a></div>',
      '<div><a b /==">tafternameslasha</a></div>',
      "<div><a b />tafternameslashb</a></div>",
      '<div><a b "=">tafternamedqa</a></div>',
      '<div><a b ">tafternamedqb</a></div>',
      `<div><a b '=">tafternamesqa</a></div>`,
      "<div><a b '>tafternamesqb</a></div>",
      '<div><a b x=">tafternameothera</a></div>',
      "<div><a b x>tafternameotherb</a></div>",
      '<div><a b=/"=">tbeforevalueslasha</a></div>',
      "<div><a b=/'>tbeforevalueslashb</a></div>",
      '<div><a b=="=">tbeforevalueeqa</a></div>',
      "<div><a b=='>tbeforevalueeqb</a></div>",
      '<div><a b=x"=">tbeforevalueothera</a></div>',
      '<div><a b="x/>tdoubleslasha</a></div>',
      '<div><a b="x/">tdoubleslashb</a></div>',
      '<div><a b="x=>tdoubleeqa</a></div>',
      '<div><a b="x=">tdoubleeqb</a></div>',
      '<div><a b="x>>tdoublegta</a></div>',
      "<div><a b='x/>tsingleslasha</a></div>",
      `<div><a b='x/">tsingleslashb</a></div>`,
      "<div><a b='x=>tsingleeqa</a></div>",
      `<div><a b='x=">tsingleeqb</a></div>`,
      `<div><a b='x'==">tsinglesqa</a></div>`,
      "<div><a b='x>>tsinglegta</a></div>",
      '<div><a b=x =">tunquotedspa</a></div>',
      '<div><a b=x\t=">tunquotedtaba</a></div>',
      '<div><a b=x\n=">tunquotedlfa</a></div>',
      `<div><a b=x${cp(0x0c)}=">tunquotedffa</a></div>`,
      '<div><a b=x/"=">tunquotedslasha</a></div>',
      "<div><a b=x/'>tunquotedslashb</a></div>",
      '<div><a b=x=x=">tunquotedeqa</a></div>',
      "<div><a b=x=>tunquotedeqb</a></div>",
      `<div><a b=x""='>tunquoteddqa</a></div>`,
      `<div><a b=x'"='>tunquotedsqa</a></div>`,
      `<div><a b=xx"='>tunquotedothera</a></div>`,
      '<div><a b="x" ==">tafterquotedspa</a></div>',
      '<div><a b="x"\t==">tafterquotedtaba</a></div>',
      '<div><a b="x"\n==">tafterquotedlfa</a></div>',
      `<div><a b="x"${cp(0x0c)}==">tafterquotedffa</a></div>`,
      '<div><a b="x"/==">tafterquotedslasha</a></div>',
      '<div><a b="x"/>tafterquotedslashb</a></div>',
      '<div><a b="x"==">tafterquotedeqa</a></div>',
      '<div><a b="x""=">tafterquoteddqa</a></div>',
      '<div><a b="x"">tafterquoteddqb</a></div>',
      `<div><a b="x"'=">tafterquotedsqa</a></div>`,
      `<div><a b="x"'>tafterquotedsqb</a></div>`,
      '<div><a b="x"x>tafterquotedothera</a></div>',
      '<div><a b/ ==">tselfclosingspa</a></div>',
      '<div><a b/\t==">tselfclosingtaba</a></div>',
      '<div><a b/\n==">tselfclosinglfa</a></div>',
      `<div><a b/${cp(0x0c)}==">tselfclosingffa</a></div>`,
      '<div><a b//==">tselfclosingslasha</a></div>',
      "<div><a b//>tselfclosingslashb</a></div>",
      '<div><a b/==">tselfclosingeqa</a></div>',
      '<div><a b/"=">tselfclosingdqa</a></div>',
      '<div><a b/">tselfclosingdqb</a></div>',
      `<div><a b/'=">tselfclosingsqa</a></div>`,
      "<div><a b/'>tselfclosingsqb</a></div>",
      // RESPIN 1, on an HTML page (marked reads a Markdown page's carriage return as a line feed): the carriage-return members of the groups above
      '<p><a\rb="x>HXSI-01 is registered">c</a></p>',
      '<p><a\r="x>HXSI-01 is registered">c</a></p>',
      '<p><a b\r="x>HXSI-01 is registered">c</a></p>',
      '<p><a b \r="x>HXSI-01 is registered">c</a></p>',
      '<p><a b=\r"x>HXSI-01 is registered">c</a></p>',
      '<p><a c=d\rb="x>HXSI-01 is registered">c</a></p>',
      '<p><a b="c"\r="x>HXSI-01 is registered">c</a></p>',
      '<p><a b/\r="x>HXSI-01 is registered">c</a></p>',
      '<p><a b="x\ry>HXSI-01 is registered">c</a></p>',
      "<p><a b='x\ry>HXSI-01 is registered'>c</a></p>",
      '<p><textarea>a</textarea\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><title>a</title\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><script>a</script\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><style>a</style\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><xmp>a</xmp\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><iframe>a</iframe\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><noembed>a</noembed\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><noframes>a</noframes\r><b title="x>HXSI-01 is registered">c</b></p>',
      '<p><noscript>a</noscript\r><b title="x>HXSI-01 is registered">c</b></p>',
      "<p><a b\r>HXSI-01 is registered</a></p>",
      "<p><a b \r>HXSI-01 is registered</a></p>",
      "<p><a b=\r>HXSI-01 is registered</a></p>",
      '<p><a b="x\r">HXSI-01 is registered</a></p>',
      `<p><a b='x\r">HXSI-01 is registered</a></p>`,
      '<p><a b=x\r=">HXSI-01 is registered</a></p>',
      `<p><a b="x"\r'>HXSI-01 is registered</a></p>`,
      '<p><a b="x"\rHXSI-01 is registered</a></p>',
      "<p><a b/\r'>HXSI-01 is registered</a></p>",
      "<p><a b/\rHXSI-01 is registered</a></p>",
      '<p><a b="x"\rx="y>HXSI-01 is registered">c</a></p>',
      '<p><a b/\rx="y>HXSI-01 is registered">c</a></p>',
      // RESPIN 2 of wb-jh2f (refusal #2 U2): in an HTML block, a block-level, each RCDATA and each raw-text element's start tag (plaintext's among them) holding a double- and a single-quoted value with ">"
      '<div><p title=">">pstartdq</p></div>',
      "<div><p title='>'>pstartsq</p></div>",
      '<div><textarea title=">">textareastartdq</textarea></div>',
      "<div><textarea title='>'>textareastartsq</textarea></div>",
      '<div><title title=">">titlestartdq</title></div>',
      "<div><title title='>'>titlestartsq</title></div>",
      '<div><script title=">">scriptstartdq</script></div>',
      "<div><script title='>'>scriptstartsq</script></div>",
      '<div><style title=">">stylestartdq</style></div>',
      "<div><style title='>'>stylestartsq</style></div>",
      '<div><xmp title=">">xmpstartdq</xmp></div>',
      "<div><xmp title='>'>xmpstartsq</xmp></div>",
      '<div><iframe title=">">iframestartdq</iframe></div>',
      "<div><iframe title='>'>iframestartsq</iframe></div>",
      '<div><noembed title=">">noembedstartdq</noembed></div>',
      "<div><noembed title='>'>noembedstartsq</noembed></div>",
      '<div><noframes title=">">noframesstartdq</noframes></div>',
      "<div><noframes title='>'>noframesstartsq</noframes></div>",
      '<div><noscript title=">">noscriptstartdq</noscript></div>',
      "<div><noscript title='>'>noscriptstartsq</noscript></div>",
      '<div><plaintext title=">">plaintextstartdq</div>',
      "<div><plaintext title='>'>plaintextstartsq</div>",
      // RESPIN 2 of wb-jh2f (refusal #2 U1): in an HTML block, an ordinary, a block-level, each RCDATA and each raw-text element's end tag holding a double- and a single-quoted value with ">"
      '<div><b>a</b title=">"> benddq</div>',
      '<div><p>a</p title=">"> penddq</div>',
      "<div><b>a</b title='>'> bendsq</div>",
      "<div><p>a</p title='>'> pendsq</div>",
      '<div><textarea>a</textarea title=">"> textareaenddq</div>',
      "<div><textarea>a</textarea title='>'> textareaendsq</div>",
      '<div><title>a</title title=">"> titleenddq</div>',
      "<div><title>a</title title='>'> titleendsq</div>",
      '<div><script>a</script title=">"> scriptenddq</div>',
      "<div><script>a</script title='>'> scriptendsq</div>",
      '<div><style>a</style title=">"> styleenddq</div>',
      "<div><style>a</style title='>'> styleendsq</div>",
      '<div><xmp>a</xmp title=">"> xmpenddq</div>',
      "<div><xmp>a</xmp title='>'> xmpendsq</div>",
      '<div><iframe>a</iframe title=">"> iframeenddq</div>',
      "<div><iframe>a</iframe title='>'> iframeendsq</div>",
      '<div><noembed>a</noembed title=">"> noembedenddq</div>',
      "<div><noembed>a</noembed title='>'> noembedendsq</div>",
      '<div><noframes>a</noframes title=">"> noframesenddq</div>',
      "<div><noframes>a</noframes title='>'> noframesendsq</div>",
      '<div><noscript>a</noscript title=">"> noscriptenddq</div>',
      "<div><noscript>a</noscript title='>'> noscriptendsq</div>",
      // RESPIN 2 of wb-jh2f (refusal #2 U1, U2): in an inline token, an ordinary, a block-level, each RCDATA and each raw-text element's start tag holding a double- and a single-quoted value with ">" (a plaintext element an inline token opens runs past it: the residual R12)
      'Note <span title=">">inlinespandq</span>',
      'Note <p title=">">inlinepdq</p>',
      "Note <span title='>'>inlinespansq</span>",
      "Note <p title='>'>inlinepsq</p>",
      'Note <textarea title=">">inlinetextareadq</textarea>',
      "Note <textarea title='>'>inlinetextareasq</textarea>",
      'Note <title title=">">inlinetitledq</title>',
      "Note <title title='>'>inlinetitlesq</title>",
      'Note <script title=">">inlinescriptdq</script>',
      "Note <script title='>'>inlinescriptsq</script>",
      'Note <style title=">">inlinestyledq</style>',
      "Note <style title='>'>inlinestylesq</style>",
      'Note <xmp title=">">inlinexmpdq</xmp>',
      "Note <xmp title='>'>inlinexmpsq</xmp>",
      'Note <iframe title=">">inlineiframedq</iframe>',
      "Note <iframe title='>'>inlineiframesq</iframe>",
      'Note <noembed title=">">inlinenoembeddq</noembed>',
      "Note <noembed title='>'>inlinenoembedsq</noembed>",
      'Note <noframes title=">">inlinenoframesdq</noframes>',
      "Note <noframes title='>'>inlinenoframessq</noframes>",
      'Note <noscript title=">">inlinenoscriptdq</noscript>',
      "Note <noscript title='>'>inlinenoscriptsq</noscript>",
      // RESPIN 2 of wb-jh2f: an end tag holding attributes is no inline token (marked's tag rule reads none), so a paragraph shows it as written
      'Note <b>a</b title=">"> inlineendtextdq',
      "Note <b>a</b title='>'> inlineendtextsq",
      // RESPIN 2 of wb-jh2f: in an inline token, a block-level start tag ending in each state marked's tag rule ends a tag in (its break shows where it ends)
      "Note <p>inlineendname",
      "Note <p >inlineendspace",
      "Note <p b>inlineendattr",
      "Note <p b >inlineendafterattr",
      "Note <p b=c>inlineendunquoted",
      'Note <p b="c">inlineenddouble',
      "Note <p b='c'>inlineendsingle",
      'Note <p b="c" >inlineendafterquoted',
      "Note <p/>inlineendsolidus",
      "Note <p b/>inlineendattrsolidus",
      'Note <p b="c"/>inlineendquotedsolidus',
      'Note <p b = "c">inlineendspacedvalue',
      // RESPIN 2 of wb-jh2f: a tag written in a form marked's tag rule does not read is no inline token, so a paragraph shows it as written (one text per form)
      'Note <p ="x">nontageqstart',
      'Note <p "x">nontagdqstart',
      'Note <p b"c">nontagnamedq',
      "Note <p b/ c>nontagsolidus",
      'Note <p b="c"d>nontagafterquoted',
      'Note <p b="c"=d>nontagafterquotedeq',
      'Note <p b=c"d>nontagunquoteddq',
      "Note <p b=c=d>nontagunquotedeq",
      "Note <p b=>nontagemptyvalue",
      'Note <p b=="c">nontageqeq',
      // RESPIN 2 of wb-jh2f: a double- and a single-quoted value holding the other quote and ">", as ordinary start tags (EVERY_TAG reads them through every kind of tag)
      `<div><a b="x'y>z">indoubleothersq</a></div>`,
      `<div><a b='x"y>z'>insingleotherdq</a></div>`,
      // RESPIN 2 of wb-jh2f: ordinary start tags whose attributes marked's tag rule reads, one per group of tagEnd cells an inline token reads that the texts above left unpinned (EVERY_TAG reads each through every kind of tag, inline ones included)
      "<div><a x='/>'>inlinecellaa</a></div>",
      "<div><a x='=>'>inlinecellab</a></div>",
      '<div><a x=// x=">">inlinecellac</a></div>',
      '<div><a x="/>">inlinecellad</a></div>',
      '<div><a x="=>">inlinecellae</a></div>',
      '<div><a x=">>">inlinecellaf</a></div>',
      "<div><a x='>>'>inlinecellag</a></div>",
      '<div><a x=""\tx=">">inlinecellah</a></div>',
      '<div><a x x=">">inlinecellai</a></div>',
      '<div><a x=""\nx=">">inlinecellaj</a></div>',
      `<div><a x=""${cp(0x0c)}x=">">inlinecellak</a></div>`,
      '<div><a x=/x x=">">inlinecellal</a></div>',
      '<div><a xx=">">inlinecellam</a></div>',
      `<div><a x='' x=">">inlinecellan</a></div>`,
      // RESPIN 2 of wb-jh2f (refusal #2 U2): on an HTML page, an ordinary, a block-level, each RCDATA and each raw-text element's start tag (plaintext's among them) holding a double- and a single-quoted value with ">" and a claim
      '<p><a title="> HXSI-01 is registered">c</a></p>',
      '<div><p title="> HXSI-01 is registered">c</p></div>',
      "<p><a title='> HXSI-01 is registered'>c</a></p>",
      "<div><p title='> HXSI-01 is registered'>c</p></div>",
      '<p><textarea title="> HXSI-01 is registered">c</textarea></p>',
      "<p><textarea title='> HXSI-01 is registered'>c</textarea></p>",
      '<p><title title="> HXSI-01 is registered">c</title></p>',
      "<p><title title='> HXSI-01 is registered'>c</title></p>",
      '<p><script title="> HXSI-01 is registered">c</script></p>',
      "<p><script title='> HXSI-01 is registered'>c</script></p>",
      '<p><style title="> HXSI-01 is registered">c</style></p>',
      "<p><style title='> HXSI-01 is registered'>c</style></p>",
      '<p><xmp title="> HXSI-01 is registered">c</xmp></p>',
      "<p><xmp title='> HXSI-01 is registered'>c</xmp></p>",
      '<p><iframe title="> HXSI-01 is registered">c</iframe></p>',
      "<p><iframe title='> HXSI-01 is registered'>c</iframe></p>",
      '<p><noembed title="> HXSI-01 is registered">c</noembed></p>',
      "<p><noembed title='> HXSI-01 is registered'>c</noembed></p>",
      '<p><noframes title="> HXSI-01 is registered">c</noframes></p>',
      "<p><noframes title='> HXSI-01 is registered'>c</noframes></p>",
      '<p><noscript title="> HXSI-01 is registered">c</noscript></p>',
      "<p><noscript title='> HXSI-01 is registered'>c</noscript></p>",
      '<p><plaintext title="> HXSI-01 is registered">c',
      "<p><plaintext title='> HXSI-01 is registered'>c",
      // RESPIN 2 of wb-jh2f (refusal #2 U1): on an HTML page, an ordinary, a block-level, each RCDATA and each raw-text element's end tag holding a double- and a single-quoted value with ">" and a claim
      '<p><b>c</b title="> HXSI-01 is registered"></p>',
      '<div><p>c</p title="> HXSI-01 is registered"></div>',
      "<p><b>c</b title='> HXSI-01 is registered'></p>",
      "<div><p>c</p title='> HXSI-01 is registered'></div>",
      '<p><textarea>c</textarea title="> HXSI-01 is registered"></p>',
      "<p><textarea>c</textarea title='> HXSI-01 is registered'></p>",
      '<p><title>c</title title="> HXSI-01 is registered"></p>',
      "<p><title>c</title title='> HXSI-01 is registered'></p>",
      '<p><script>c</script title="> HXSI-01 is registered"></p>',
      "<p><script>c</script title='> HXSI-01 is registered'></p>",
      '<p><style>c</style title="> HXSI-01 is registered"></p>',
      "<p><style>c</style title='> HXSI-01 is registered'></p>",
      '<p><xmp>c</xmp title="> HXSI-01 is registered"></p>',
      "<p><xmp>c</xmp title='> HXSI-01 is registered'></p>",
      '<p><iframe>c</iframe title="> HXSI-01 is registered"></p>',
      "<p><iframe>c</iframe title='> HXSI-01 is registered'></p>",
      '<p><noembed>c</noembed title="> HXSI-01 is registered"></p>',
      "<p><noembed>c</noembed title='> HXSI-01 is registered'></p>",
      '<p><noframes>c</noframes title="> HXSI-01 is registered"></p>',
      "<p><noframes>c</noframes title='> HXSI-01 is registered'></p>",
      '<p><noscript>c</noscript title="> HXSI-01 is registered"></p>',
      "<p><noscript>c</noscript title='> HXSI-01 is registered'></p>",
      // FOLLOW-UP wb-a7w6 (F1, PIN): ordinary start tags whose attributes marked's tag rule reads with U+00A0 (standing for INLINE_SPACE) at a separator, one per group of the tagEnd cells an inline token reaches through it that the texts above left untold (EVERY_TAG reads each through every kind of tag, inline ones included, a tag the census ends inside marked's token among them)
      `<div><a\nx=${cp(0xa0)} 'x \n${cp(0xa0)}"" "=x'${cp(0xa0)}${cp(0xa0)}x='"\nx /x/==\n'${cp(0xa0)}x='x\n${cp(0xa0)} >xx/\tx'${cp(0xa0)}/>inlinecellao</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)}"  /x=//="${cp(0xa0)}x =${cp(0xa0)}'" \n=""=">'${cp(0xa0)}>inlinecellap</a></div>`,
      `<div><a\nx${cp(0xa0)}=${cp(0xa0)}"==x=${cp(0x0c)}\n${cp(0x0c)}=${cp(0xa0)}'\t='"${cp(0xa0)}${cp(0xa0)}x=${cp(0xa0)}'${cp(0xa0)} \t=\n=">>x\txx'>inlinecellaq</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)}" ===xx=\n/'="${cp(0xa0)}x=${cp(0xa0)} "=\n'>x"${cp(0xa0)}${cp(0xa0)}x='="='/>inlinecellar</a></div>`,
      `<div><a\tx${cp(0xa0)}=${cp(0xa0)}"=${cp(0x0c)}= ${cp(0x0c)}${cp(0xa0)}/x /'x"\nx=${cp(0xa0)} '/${cp(0x0c)}${cp(0x0c)} =/" \t=\n"x>' x=' ""x"${cp(0x0c)}>x"=" /'${cp(0xa0)}/>inlinecellas</a></div>`,
      `<div><a x${cp(0xa0)}=${cp(0xa0)}'=${cp(0x0c)}" ='\tx='/\nx=\t ${cp(0x0c)}>x=x '${cp(0xa0)}${cp(0xa0)}x="x'=  \t"${cp(0xa0)}>inlinecellat</a></div>`,
      `<div><a\tx=${cp(0xa0)} 'xx ${cp(0x0c)}//\n='\nx${cp(0xa0)}=${cp(0xa0)}"    =\n" x=' "x>/=${cp(0x0c)}'/>inlinecellau</a></div>`,
      `<div><a x =${cp(0xa0)}" ='=\t"\nx =${cp(0xa0)}'\t' x=${cp(0xa0)}" \n='== ${cp(0x0c)} >>">inlinecellav</a></div>`,
      `<div><a\tx=${cp(0xa0)}'\n/ \t= =  ">='${cp(0xa0)}${cp(0xa0)}x=${cp(0xa0)} "//${cp(0x0c)} xx/>"/>inlinecellaw</a></div>`,
      `<div><a\tx =${cp(0xa0)}" '${cp(0x0c)}  '=${cp(0x0c)}x\n= "${cp(0xa0)}x=">=\nx'\t"${cp(0xa0)}>inlinecellax</a></div>`,
      `<div><a\tx=${cp(0xa0)}'${cp(0xa0)}="${cp(0xa0)}/"'\nx=${cp(0xa0)} 'x""${cp(0xa0)}" "/ //'${cp(0xa0)}${cp(0xa0)}x='="${cp(0x0c)}>'${cp(0xa0)}/>inlinecellay</a></div>`,
      `<div><a\tx${cp(0xa0)}=${cp(0xa0)}"\t/\t/x\n/${cp(0x0c)}${cp(0xa0)}  ="${cp(0xa0)}${cp(0xa0)}x=${cp(0xa0)} "'=='==x>'\t'${cp(0xa0)}x"${cp(0xa0)}>inlinecellaz</a></div>`,
      `<div><a x=${cp(0xa0)}" ' '/\t=${cp(0xa0)}\t x"${cp(0xa0)}x=${cp(0xa0)}'/\n=${cp(0xa0)} x\t=' x="'==\n'> =\t'"/>inlinecellba</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)}'${cp(0x0c)}\n${cp(0xa0)}${cp(0xa0)}\t/\t=x='${cp(0xa0)}x=${cp(0xa0)} ">\t\tx"${cp(0xa0)}${cp(0xa0)}x='${cp(0x0c)}"'${cp(0xa0)}>inlinecellbb</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)}' ${cp(0x0c)}=="x"'${cp(0xa0)}x='\t\t"\nx>/'${cp(0xa0)}>inlinecellbc</a></div>`,
      `<div><a\nx=' x \n'${cp(0xa0)}x =${cp(0xa0)}"x\t=x"${cp(0xa0)}${cp(0xa0)}x='" x>x= ='/>inlinecellbd</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)} '=">${cp(0xa0)}=x""${cp(0x0c)}="x${cp(0xa0)}x>'${cp(0xa0)}x=${cp(0xa0)}' xx\t>  > >="x'/>inlinecellbe</a></div>`,
      `<div><a x${cp(0xa0)}=${cp(0xa0)}' /\n"${cp(0x0c)}="/=${cp(0xa0)}>"${cp(0xa0)}'>inlinecellbf</a></div>`,
      `<div><a\nx=${cp(0xa0)} '${cp(0xa0)} "=${cp(0x0c)}${cp(0x0c)} '${cp(0xa0)}x=${cp(0xa0)} '\t=\t"/>x${cp(0xa0)}'${cp(0xa0)}${cp(0xa0)}x=' ${cp(0xa0)} "x\t"'${cp(0xa0)}/>inlinecellbg</a></div>`,
      `<div><a${cp(0x0c)}x =${cp(0xa0)}'/${cp(0x0c)}==="\n =${cp(0x0c)}='${cp(0xa0)}${cp(0xa0)}x=${cp(0xa0)} '/ = ">'${cp(0xa0)}/>inlinecellbh</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)} '${cp(0xa0)}x=' x =${cp(0xa0)}'${cp(0x0c)}\n =${cp(0x0c)}"\t${cp(0x0c)} >' x="=" >inlinecellbi</a></div>`,
      `<div><a x=${cp(0xa0)}' y=""/x=">"'>inlinecellbj</a></div>`,
      `<div><a${cp(0x0c)}x=${cp(0xa0)} '${cp(0x0c)}= '${cp(0xa0)}${cp(0xa0)}x='\n=' x='"=\t${cp(0x0c)}\n=>\n"'/>inlinecellbk</a></div>`,
      `<div><a\tx${cp(0xa0)}=${cp(0xa0)}"${cp(0x0c)} /${cp(0x0c)}"${cp(0xa0)}${cp(0xa0)}x='>x'\tx=${cp(0xa0)}'""'/>inlinecellbl</a></div>`,
      // FOLLOW-UP wb-a7w6 (F1): each INLINE_SPACE member after "=", which tagEnd reads as any other character, so a value marked quotes is an unquoted one (EVERY_TAG reads each through every kind of tag)
      ...INLINE_SPACE.map(point => `<div><a x=${cp(point)}' y=>'>spaceclass</a></div>`),
      // FOLLOW-UP wb-a7w6 (F1, F3): each INLINE_SPACE member right after an inline span start tag's name, which it runs on (RUN_ON reads each under every other inline kind's name)
      ...INLINE_SPACE.map(point => `Note <span${cp(point)}x ="=>">runon</span>`),
      // FOLLOW-UP wb-a7w6 (F3): a tag's name holding a double quote, a single quote, "=", "<" and a character outside ASCII, each read whole (HTML_MARKUP's name class)
      '<div><a"x="y>z">namedq</a></div>',
      "<div><a'x='y>z'>namesq</a></div>",
      '<div><a=="y>z">nameeq</a></div>',
      '<div><a<x="y>z">namelt</a></div>',
      `<div><a${cp(0xe9)}x="y>z">namenonascii</a></div>`,
      // FOLLOW-UP wb-a7w6 (F2): a carriage return in an ordinary start tag, which marked reads on a Markdown page as a line feed and an HTML page reads as itself (EVERY_TAG's HTML-page leg reads each on line 1)
      '<div><a\rx=">">crpageaa</a></div>',
      '<div><a x=""\r>crpageab</a></div>',
      '<div><a x="\r>">crpageac</a></div>',
    ],
    outcome: [
      [`1 one HXSI-01 two. | plain ${"#".repeat(16)}`],
      [`1 two | plain ${"#".repeat(3)}`],
      [`1 three | plain ${"#".repeat(5)}`],
      [],
      [`1 five | plain ${"#".repeat(4)}`],
      [`1 six ?> | plain ${"#".repeat(6)}`],
      [`1 seven | plain ${"#".repeat(5)}`],
      [`1 eight ]]> | plain ${"#".repeat(9)}`],
      [`1 nine ten | plain ${"#".repeat(8)}`],
      [`1 registered eleven twelve | plain ${"#".repeat(24)}`],
      [`1 <!-- a --> <b>thirteen</b> - | plain ${"#".repeat(28)}`],
      [`1 fourteen <i>x</i> | plain ${"#".repeat(17)}`],
      [`1 // <!-- a --> fifteen &#45; | plain ${"#".repeat(27)}`],
      [`2 <b>sixteen</b> | plain ${"#".repeat(14)}`],
      [`2 <b>x</b> seventeen | plain ${"#".repeat(18)}`],
      [`1 eighteen | plain ${"#".repeat(8)}`],
      [`1 Note  nineteen --> | plain Note ${"#".repeat(13)} | html`],
      [`1 Note  twenty ?> | plain Note ${"#".repeat(10)} | html`],
      [`1 Note  twentyone ]]> | plain Note ${"#".repeat(14)} | html`],
      ["1 Note twentytwo | html"],
      [`1 twentythree | plain ${"#".repeat(11)}`],
      [`1 a</textareax> b | plain ${"#".repeat(15)}`],
      [`1 twentyfour | plain ${"#".repeat(10)}`, `1 twentyfive | plain ${"#".repeat(10)}`],
      [`1 twentysix">y | plain ${"#".repeat(12)}`],
      [`1 twentyseven | plain ${"#".repeat(11)}`],
      [`1 twentyeight | plain ${"#".repeat(11)}`],
      [`1 twentynine | plain ${"#".repeat(10)}`],
      [`1 thirty | plain ${"#".repeat(6)}`],
      [`1 y">thirtyone | plain ${"#".repeat(12)}`],
      [`1 y">thirtytwo | plain ${"#".repeat(12)}`],
      [`1 y">thirtythree | plain ${"#".repeat(14)}`],
      [`1 y">thirtyfour | plain ${"#".repeat(13)}`],
      [`1 thirtyfive | plain ${"#".repeat(10)}`],
      [`1 thirtysix | plain ${"#".repeat(9)}`],
      ["1 a | plain #", `1 thirtyseven | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `2 thirtyeight | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 thirtynine | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 forty | plain ${"#".repeat(5)}`],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      // RESPIN 1 of wb-jh2f (U1b): each white space a tag reads (a space, a tab, a line feed, a form feed) at each place it reads one: its name's end, before an attribute's name, after it, a second one after it, before a value, after an unquoted value, after a quoted value, after a solidus, inside a double- and a single-quoted value
      [`1 nameendsp | plain ${"#".repeat(9)}`],
      [`1 nameendtab | plain ${"#".repeat(10)}`],
      [`2 nameendlf | plain ${"#".repeat(9)}`],
      [`1 nameendff | plain ${"#".repeat(9)}`],
      [`1 y">beforenamesp | plain ${"#".repeat(15)}`],
      [`1 y">beforenametab | plain ${"#".repeat(16)}`],
      [`2 y">beforenamelf | plain ${"#".repeat(15)}`],
      [`1 y">beforenameff | plain ${"#".repeat(15)}`],
      [`1 afternamesp | plain ${"#".repeat(11)}`],
      [`1 afternametab | plain ${"#".repeat(12)}`],
      [`2 afternamelf | plain ${"#".repeat(11)}`],
      [`1 afternameff | plain ${"#".repeat(11)}`],
      [`1 secondspacesp | plain ${"#".repeat(13)}`],
      [`1 secondspacetab | plain ${"#".repeat(14)}`],
      [`2 secondspacelf | plain ${"#".repeat(13)}`],
      [`1 secondspaceff | plain ${"#".repeat(13)}`],
      [`1 beforevaluesp | plain ${"#".repeat(13)}`],
      [`1 beforevaluetab | plain ${"#".repeat(14)}`],
      [`2 beforevaluelf | plain ${"#".repeat(13)}`],
      [`1 beforevalueff | plain ${"#".repeat(13)}`],
      [`1 afterunquotedsp | plain ${"#".repeat(15)}`],
      [`1 afterunquotedtab | plain ${"#".repeat(16)}`],
      [`2 afterunquotedlf | plain ${"#".repeat(15)}`],
      [`1 afterunquotedff | plain ${"#".repeat(15)}`],
      [`1 y">afterquotedsp | plain ${"#".repeat(16)}`],
      [`1 y">afterquotedtab | plain ${"#".repeat(17)}`],
      [`2 y">afterquotedlf | plain ${"#".repeat(16)}`],
      [`1 y">afterquotedff | plain ${"#".repeat(16)}`],
      [`1 y">aftersolidussp | plain ${"#".repeat(17)}`],
      [`1 y">aftersolidustab | plain ${"#".repeat(18)}`],
      [`2 y">aftersoliduslf | plain ${"#".repeat(17)}`],
      [`1 y">aftersolidusff | plain ${"#".repeat(17)}`],
      [`1 indoublesp | plain ${"#".repeat(10)}`],
      [`1 indoubletab | plain ${"#".repeat(11)}`],
      [`2 indoublelf | plain ${"#".repeat(10)}`],
      [`1 indoubleff | plain ${"#".repeat(10)}`],
      [`1 insinglesp | plain ${"#".repeat(10)}`],
      [`1 insingletab | plain ${"#".repeat(11)}`],
      [`2 insinglelf | plain ${"#".repeat(10)}`],
      [`1 insingleff | plain ${"#".repeat(10)}`],
      // RESPIN 1 (U1, U1b): each RCDATA and raw-text element that ends, read to its end tag bounded by a space, a tab, a line feed, a form feed, "/" and ">"
      ["1 a | plain #", `1 textareasp | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 textareatab | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `2 textarealf | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 textareaff | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 textareaslash | plain ${"#".repeat(13)}`],
      ["1 a | plain #", `1 textareagt | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 titlesp | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 titletab | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `2 titlelf | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 titleff | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 titleslash | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 titlegt | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 scriptsp | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 scripttab | plain ${"#".repeat(9)}`],
      ["1 a | plain #", `2 scriptlf | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 scriptff | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 scriptslash | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 scriptgt | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 stylesp | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 styletab | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `2 stylelf | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 styleff | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 styleslash | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 stylegt | plain ${"#".repeat(7)}`],
      [`1 a xmpsp | plain ${"#".repeat(7)}`],
      [`1 a xmptab | plain ${"#".repeat(8)}`],
      [`1 a xmplf | plain ${"#".repeat(7)}`],
      [`1 a xmpff | plain ${"#".repeat(7)}`],
      [`1 a xmpslash | plain ${"#".repeat(10)}`],
      [`1 a xmpgt | plain ${"#".repeat(7)}`],
      ["1 a | plain #", `1 iframesp | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 iframetab | plain ${"#".repeat(9)}`],
      ["1 a | plain #", `2 iframelf | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 iframeff | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 iframeslash | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 iframegt | plain ${"#".repeat(8)}`],
      [`1 a noembedsp | plain ${"#".repeat(11)}`],
      [`1 a noembedtab | plain ${"#".repeat(12)}`],
      [`1 a noembedlf | plain ${"#".repeat(11)}`],
      [`1 a noembedff | plain ${"#".repeat(11)}`],
      [`1 a noembedslash | plain ${"#".repeat(14)}`],
      [`1 a noembedgt | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 noframessp | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 noframestab | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `2 noframeslf | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 noframesff | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 noframesslash | plain ${"#".repeat(13)}`],
      ["1 a | plain #", `1 noframesgt | plain ${"#".repeat(10)}`],
      [`1 a noscriptsp | plain ${"#".repeat(12)}`],
      [`1 a noscripttab | plain ${"#".repeat(13)}`],
      [`1 a noscriptlf | plain ${"#".repeat(12)}`],
      [`1 a noscriptff | plain ${"#".repeat(12)}`],
      [`1 a noscriptslash | plain ${"#".repeat(15)}`],
      [`1 a noscriptgt | plain ${"#".repeat(12)}`],
      // RESPIN 1: "/" ending a tag's name, ">" after an attribute's name and before a value, each quote inside an unquoted value, a plaintext end tag, a raw-text end tag in any case and one whose name runs on
      [`1 nameendslash | plain ${"#".repeat(12)}`],
      [`1 gtaftername | plain ${"#".repeat(11)}`],
      [`1 gtbeforevalue | plain ${"#".repeat(13)}`],
      [`1 y">dquoteinunquoted | plain ${"#".repeat(19)}`],
      [`1 y'>squoteinunquoted | plain ${"#".repeat(19)}`],
      [`1 a</plaintext>plaintextnoend</div> | plain ${"#".repeat(33)}`],
      ["1 a | plain #", `1 rawtextcase | plain ${"#".repeat(11)}`],
      [`1 a</scriptx> rawtextnameon</div> | plain ${"#".repeat(31)}`],
      // RESPIN 1: each RCDATA element's text with its references decoded, each raw-text element's (plaintext's among them) with its references kept
      [`1 a-b | plain ${"#".repeat(3)}`, `1 textarearef | plain ${"#".repeat(11)}`],
      [`1 a-b | plain ${"#".repeat(3)}`, `1 titleref | plain ${"#".repeat(8)}`],
      [`1 a&#45;b | plain ${"#".repeat(7)}`, `1 scriptref | plain ${"#".repeat(9)}`],
      [`1 a&#45;b | plain ${"#".repeat(7)}`, `1 styleref | plain ${"#".repeat(8)}`],
      [`1 a&#45;b xmpref | plain ${"#".repeat(14)}`],
      [`1 a&#45;b | plain ${"#".repeat(7)}`, `1 iframeref | plain ${"#".repeat(9)}`],
      [`1 a&#45;b noembedref | plain ${"#".repeat(18)}`],
      [`1 a&#45;b | plain ${"#".repeat(7)}`, `1 noframesref | plain ${"#".repeat(11)}`],
      [`1 a&#45;b noscriptref | plain ${"#".repeat(19)}`],
      [`1 a&#45;b plaintextref</div> | plain ${"#".repeat(26)}`],
      // RESPIN 1: each RCDATA and raw-text element's text (plaintext's among them) shown as written, its comments and tags as text
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 textareashown | plain ${"#".repeat(13)}`],
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 titleshown | plain ${"#".repeat(10)}`],
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 scriptshown | plain ${"#".repeat(11)}`],
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 styleshown | plain ${"#".repeat(10)}`],
      [`1 a<!-- c --><b>x</b> xmpshown | plain ${"#".repeat(28)}`],
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 iframeshown | plain ${"#".repeat(11)}`],
      [`1 a<!-- c --><b>x</b> noembedshown | plain ${"#".repeat(32)}`],
      [`1 a<!-- c --><b>x</b> | plain ${"#".repeat(19)}`, `1 noframesshown | plain ${"#".repeat(13)}`],
      [`1 a<!-- c --><b>x</b> noscriptshown | plain ${"#".repeat(33)}`],
      [`1 a<!-- c --><b>x</b> plaintextshown</div> | plain ${"#".repeat(40)}`],
      // RESPIN 1: tagEnd's transition table, each state reading each character class, told from every target that reads otherwise (the word names the cell)
      [`1 tattributesslasha | plain ${"#".repeat(17)}`],
      [],
      [],
      [`1 tattributesdqb | plain ${"#".repeat(14)}`],
      [],
      [`1 tattributessqb | plain ${"#".repeat(14)}`],
      [],
      [],
      [],
      [`1 tnamesqb | plain ${"#".repeat(8)}`],
      [],
      [],
      [`1 tafternameslashb | plain ${"#".repeat(16)}`],
      [],
      [`1 tafternamedqb | plain ${"#".repeat(13)}`],
      [],
      [`1 tafternamesqb | plain ${"#".repeat(13)}`],
      [],
      [`1 tafternameotherb | plain ${"#".repeat(16)}`],
      [`1 tbeforevalueslasha | plain ${"#".repeat(18)}`],
      [`1 tbeforevalueslashb | plain ${"#".repeat(18)}`],
      [`1 tbeforevalueeqa | plain ${"#".repeat(15)}`],
      [`1 tbeforevalueeqb | plain ${"#".repeat(15)}`],
      [`1 tbeforevalueothera | plain ${"#".repeat(18)}`],
      [],
      [`1 tdoubleslashb | plain ${"#".repeat(13)}`],
      [],
      [`1 tdoubleeqb | plain ${"#".repeat(10)}`],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [`1 tunquotedspa | plain ${"#".repeat(12)}`],
      [`1 tunquotedtaba | plain ${"#".repeat(13)}`],
      [`2 tunquotedlfa | plain ${"#".repeat(12)}`],
      [`1 tunquotedffa | plain ${"#".repeat(12)}`],
      [`1 tunquotedslasha | plain ${"#".repeat(15)}`],
      [`1 tunquotedslashb | plain ${"#".repeat(15)}`],
      [`1 tunquotedeqa | plain ${"#".repeat(12)}`],
      [`1 tunquotedeqb | plain ${"#".repeat(12)}`],
      [`1 tunquoteddqa | plain ${"#".repeat(12)}`],
      [`1 tunquotedsqa | plain ${"#".repeat(12)}`],
      [`1 tunquotedothera | plain ${"#".repeat(15)}`],
      [],
      [],
      [],
      [],
      [],
      [`1 tafterquotedslashb | plain ${"#".repeat(18)}`],
      [],
      [],
      [`1 tafterquoteddqb | plain ${"#".repeat(15)}`],
      [],
      [`1 tafterquotedsqb | plain ${"#".repeat(15)}`],
      [`1 tafterquotedothera | plain ${"#".repeat(18)}`],
      [],
      [],
      [],
      [],
      [],
      [`1 tselfclosingslashb | plain ${"#".repeat(18)}`],
      [],
      [],
      [`1 tselfclosingdqb | plain ${"#".repeat(15)}`],
      [],
      [`1 tselfclosingsqb | plain ${"#".repeat(15)}`],
      // RESPIN 1, on an HTML page (marked reads a Markdown page's carriage return as a line feed): the carriage-return members of the groups above
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: rendered-unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      // RESPIN 2 of wb-jh2f (refusal #2 U2): in an HTML block, a block-level, each RCDATA and each raw-text element's start tag (plaintext's among them) holding a double- and a single-quoted value with ">"
      [`1 pstartdq | plain ${"#".repeat(8)}`],
      [`1 pstartsq | plain ${"#".repeat(8)}`],
      [`1 textareastartdq | plain ${"#".repeat(15)}`],
      [`1 textareastartsq | plain ${"#".repeat(15)}`],
      [`1 titlestartdq | plain ${"#".repeat(12)}`],
      [`1 titlestartsq | plain ${"#".repeat(12)}`],
      [`1 scriptstartdq | plain ${"#".repeat(13)}`],
      [`1 scriptstartsq | plain ${"#".repeat(13)}`],
      [`1 stylestartdq | plain ${"#".repeat(12)}`],
      [`1 stylestartsq | plain ${"#".repeat(12)}`],
      [`1 xmpstartdq | plain ${"#".repeat(10)}`],
      [`1 xmpstartsq | plain ${"#".repeat(10)}`],
      [`1 iframestartdq | plain ${"#".repeat(13)}`],
      [`1 iframestartsq | plain ${"#".repeat(13)}`],
      [`1 noembedstartdq | plain ${"#".repeat(14)}`],
      [`1 noembedstartsq | plain ${"#".repeat(14)}`],
      [`1 noframesstartdq | plain ${"#".repeat(15)}`],
      [`1 noframesstartsq | plain ${"#".repeat(15)}`],
      [`1 noscriptstartdq | plain ${"#".repeat(15)}`],
      [`1 noscriptstartsq | plain ${"#".repeat(15)}`],
      [`1 plaintextstartdq</div> | plain ${"#".repeat(22)}`],
      [`1 plaintextstartsq</div> | plain ${"#".repeat(22)}`],
      // RESPIN 2 of wb-jh2f (refusal #2 U1): in an HTML block, an ordinary, a block-level, each RCDATA and each raw-text element's end tag holding a double- and a single-quoted value with ">"
      [`1 a benddq | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 penddq | plain ${"#".repeat(6)}`],
      [`1 a bendsq | plain ${"#".repeat(8)}`],
      ["1 a | plain #", `1 pendsq | plain ${"#".repeat(6)}`],
      ["1 a | plain #", `1 textareaenddq | plain ${"#".repeat(13)}`],
      ["1 a | plain #", `1 textareaendsq | plain ${"#".repeat(13)}`],
      ["1 a | plain #", `1 titleenddq | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 titleendsq | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 scriptenddq | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 scriptendsq | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 styleenddq | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 styleendsq | plain ${"#".repeat(10)}`],
      [`1 a xmpenddq | plain ${"#".repeat(10)}`],
      [`1 a xmpendsq | plain ${"#".repeat(10)}`],
      ["1 a | plain #", `1 iframeenddq | plain ${"#".repeat(11)}`],
      ["1 a | plain #", `1 iframeendsq | plain ${"#".repeat(11)}`],
      [`1 a noembedenddq | plain ${"#".repeat(14)}`],
      [`1 a noembedendsq | plain ${"#".repeat(14)}`],
      ["1 a | plain #", `1 noframesenddq | plain ${"#".repeat(13)}`],
      ["1 a | plain #", `1 noframesendsq | plain ${"#".repeat(13)}`],
      [`1 a noscriptenddq | plain ${"#".repeat(15)}`],
      [`1 a noscriptendsq | plain ${"#".repeat(15)}`],
      // RESPIN 2 of wb-jh2f (refusal #2 U1, U2): in an inline token, an ordinary, a block-level, each RCDATA and each raw-text element's start tag holding a double- and a single-quoted value with ">" (a plaintext element an inline token opens runs past it: the residual R12)
      ["1 Note inlinespandq | html"],
      ["1 Note | html", "1 inlinepdq | html"],
      ["1 Note inlinespansq | html"],
      ["1 Note | html", "1 inlinepsq | html"],
      ["1 Note | html", "1 inlinetextareadq | html"],
      ["1 Note | html", "1 inlinetextareasq | html"],
      ["1 Note | html", "1 inlinetitledq | html"],
      ["1 Note | html", "1 inlinetitlesq | html"],
      ["1 Note | html", "1 inlinescriptdq | html"],
      ["1 Note | html", "1 inlinescriptsq | html"],
      ["1 Note | html", "1 inlinestyledq | html"],
      ["1 Note | html", "1 inlinestylesq | html"],
      ["1 Note inlinexmpdq | html"],
      ["1 Note inlinexmpsq | html"],
      ["1 Note | html", "1 inlineiframedq | html"],
      ["1 Note | html", "1 inlineiframesq | html"],
      ["1 Note inlinenoembeddq | html"],
      ["1 Note inlinenoembedsq | html"],
      ["1 Note | html", "1 inlinenoframesdq | html"],
      ["1 Note | html", "1 inlinenoframessq | html"],
      ["1 Note inlinenoscriptdq | html"],
      ["1 Note inlinenoscriptsq | html"],
      // RESPIN 2 of wb-jh2f: an end tag holding attributes is no inline token (marked's tag rule reads none), so a paragraph shows it as written
      ['1 Note a</b title=">"> inlineendtextdq | html'],
      ["1 Note a</b title='>'> inlineendtextsq | html"],
      // RESPIN 2 of wb-jh2f: in an inline token, a block-level start tag ending in each state marked's tag rule ends a tag in (its break shows where it ends)
      ["1 Note | html", "1 inlineendname"],
      ["1 Note | html", "1 inlineendspace"],
      ["1 Note | html", "1 inlineendattr"],
      ["1 Note | html", "1 inlineendafterattr"],
      ["1 Note | html", "1 inlineendunquoted"],
      ["1 Note | html", "1 inlineenddouble"],
      ["1 Note | html", "1 inlineendsingle"],
      ["1 Note | html", "1 inlineendafterquoted"],
      ["1 Note | html", "1 inlineendsolidus"],
      ["1 Note | html", "1 inlineendattrsolidus"],
      ["1 Note | html", "1 inlineendquotedsolidus"],
      ["1 Note | html", "1 inlineendspacedvalue"],
      // RESPIN 2 of wb-jh2f: a tag written in a form marked's tag rule does not read is no inline token, so a paragraph shows it as written (one text per form)
      ['1 Note <p ="x">nontageqstart'],
      ['1 Note <p "x">nontagdqstart'],
      ['1 Note <p b"c">nontagnamedq'],
      ["1 Note <p b/ c>nontagsolidus"],
      ['1 Note <p b="c"d>nontagafterquoted'],
      ['1 Note <p b="c"=d>nontagafterquotedeq'],
      ['1 Note <p b=c"d>nontagunquoteddq'],
      ["1 Note <p b=c=d>nontagunquotedeq"],
      ["1 Note <p b=>nontagemptyvalue"],
      ['1 Note <p b=="c">nontageqeq'],
      // RESPIN 2 of wb-jh2f: a double- and a single-quoted value holding the other quote and ">", as ordinary start tags (EVERY_TAG reads them through every kind of tag)
      [`1 indoubleothersq | plain ${"#".repeat(15)}`],
      [`1 insingleotherdq | plain ${"#".repeat(15)}`],
      // RESPIN 2 of wb-jh2f: ordinary start tags whose attributes marked's tag rule reads, one per group of tagEnd cells an inline token reads that the texts above left unpinned (EVERY_TAG reads each through every kind of tag, inline ones included)
      [`1 inlinecellaa | plain ${"#".repeat(12)}`],
      [`1 inlinecellab | plain ${"#".repeat(12)}`],
      [`1 inlinecellac | plain ${"#".repeat(12)}`],
      [`1 inlinecellad | plain ${"#".repeat(12)}`],
      [`1 inlinecellae | plain ${"#".repeat(12)}`],
      [`1 inlinecellaf | plain ${"#".repeat(12)}`],
      [`1 inlinecellag | plain ${"#".repeat(12)}`],
      [`1 inlinecellah | plain ${"#".repeat(12)}`],
      [`1 inlinecellai | plain ${"#".repeat(12)}`],
      [`2 inlinecellaj | plain ${"#".repeat(12)}`],
      [`1 inlinecellak | plain ${"#".repeat(12)}`],
      [`1 inlinecellal | plain ${"#".repeat(12)}`],
      [`1 inlinecellam | plain ${"#".repeat(12)}`],
      [`1 inlinecellan | plain ${"#".repeat(12)}`],
      // RESPIN 2 of wb-jh2f (refusal #2 U2): on an HTML page, an ordinary, a block-level, each RCDATA and each raw-text element's start tag (plaintext's among them) holding a double- and a single-quoted value with ">" and a claim
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      // RESPIN 2 of wb-jh2f (refusal #2 U1): on an HTML page, an ordinary, a block-level, each RCDATA and each raw-text element's end tag holding a double- and a single-quoted value with ">" and a claim
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      ["x.html:1 HXSI: unqualified-registered", "x.html:1 HXSI: html-unqualified-registered"],
      // FOLLOW-UP wb-a7w6 (F1, PIN): ordinary start tags whose attributes marked's tag rule reads with U+00A0 (standing for INLINE_SPACE) at a separator, one per group of the tagEnd cells an inline token reaches through it that the texts above left untold (EVERY_TAG reads each through every kind of tag, inline ones included, a tag the census ends inside marked's token among them)
      [`6 xx/<U+0009>x'<U+00A0>/>inlinecellao | plain ${"#".repeat(21)}`],
      [`2 '<U+00A0>>inlinecellap | plain ${"#".repeat(15)}`],
      [`4 >x<U+0009>xx'>inlinecellaq | plain ${"#".repeat(19)}`],
      [`3 x"<U+00A0><U+00A0>x='="='/>inlinecellar | plain ${"#".repeat(25)}`],
      [`3 x"=" /'<U+00A0>/>inlinecellas | plain ${"#".repeat(22)}`],
      [`2 x=x '<U+00A0><U+00A0>x="x'=  <U+0009>"<U+00A0>>inlinecellat | plain ${"#".repeat(31)}`],
      [`4 inlinecellau | plain ${"#".repeat(12)}`],
      [`3 >">inlinecellav | plain ${"#".repeat(15)}`],
      [`2 "/>inlinecellaw | plain ${"#".repeat(15)}`],
      [`3 inlinecellax | plain ${"#".repeat(12)}`],
      [`2 inlinecellay | plain ${"#".repeat(12)}`],
      [`2 '<U+0009>'<U+00A0>x"<U+00A0>>inlinecellaz | plain ${"#".repeat(20)}`],
      [`3 inlinecellba | plain ${"#".repeat(12)}`],
      [`2 inlinecellbb | plain ${"#".repeat(12)}`],
      [`2 inlinecellbc | plain ${"#".repeat(12)}`],
      [`3 inlinecellbd | plain ${"#".repeat(12)}`],
      [`1 inlinecellbe | plain ${"#".repeat(12)}`],
      [`2 inlinecellbf | plain ${"#".repeat(12)}`],
      [`2 x<U+00A0>'<U+00A0><U+00A0>x=' <U+00A0> "x<U+0009>"'<U+00A0>/>inlinecellbg | plain ${"#".repeat(31)}`],
      [`2 '<U+00A0>/>inlinecellbh | plain ${"#".repeat(16)}`],
      [`2 ' x="=" >inlinecellbi | plain ${"#".repeat(21)}`],
      [`1 inlinecellbj | plain ${"#".repeat(12)}`],
      [`4 inlinecellbk | plain ${"#".repeat(12)}`],
      [`1 inlinecellbl | plain ${"#".repeat(12)}`],
      // FOLLOW-UP wb-a7w6 (F1): each INLINE_SPACE member after "=", which tagEnd reads as any other character, so a value marked quotes is an unquoted one (EVERY_TAG reads each through every kind of tag)
      ...INLINE_SPACE.map(() => [`1 '>spaceclass | plain ${"#".repeat(12)}`]),
      // FOLLOW-UP wb-a7w6 (F1, F3): each INLINE_SPACE member right after an inline span start tag's name, which it runs on (RUN_ON reads each under every other inline kind's name)
      ...INLINE_SPACE.map(() => ['1 Note ">runon | plain Note ##runon | html']),
      // FOLLOW-UP wb-a7w6 (F3): a tag's name holding a double quote, a single quote, "=", "<" and a character outside ASCII, each read whole (HTML_MARKUP's name class)
      [`1 z">namedq | plain ${"#".repeat(9)}`],
      [`1 z'>namesq | plain ${"#".repeat(9)}`],
      [`1 z">nameeq | plain ${"#".repeat(9)}`],
      [`1 z">namelt | plain ${"#".repeat(9)}`],
      [`1 z">namenonascii | plain ${"#".repeat(15)}`],
      // FOLLOW-UP wb-a7w6 (F2): a carriage return in an ordinary start tag, which marked reads on a Markdown page as a line feed and an HTML page reads as itself (EVERY_TAG's HTML-page leg reads each on line 1)
      [`2 crpageaa | plain ${"#".repeat(8)}`],
      [`2 crpageab | plain ${"#".repeat(8)}`],
      [`2 crpageac | plain ${"#".repeat(8)}`],
    ],
  },
  {
    pin: "MU",
    kind: "md",
    kinds: ["md", "md", "md", "md", "md", "md", "md", "md", "md", "ts"],
    texts: [
      `x${cp(0x115f)}y`,
      `x${cp(0x1160)}y`,
      `x${cp(0x3164)}y`,
      `x${cp(0xffa0)}y`,
      `a\n\nb${cp(0x0c)}c${cp(0x07)}d${cp(0x0c)}`,
      `${cp(0x7f)} and ${cp(0x85)} and ${cp(0x1b)}`,
      `${cp(0x2029)} and ${cp(0xfffc)}`,
      "tab\there\r\nline two\n",
      `zero${cp(0x200b)}width${cp(0xad)}soft${cp(0xfeff)}mark${cp(0x2060)}joiner${cp(0x2028)}line`,
      `// x${cp(0x3164)}\n`,
    ],
    outcome: [
      ["x.md:1 U+115F: unread-code-point"],
      ["x.md:1 U+1160: unread-code-point"],
      ["x.md:1 U+3164: unread-code-point"],
      ["x.md:1 U+FFA0: unread-code-point"],
      ["x.md:3 U+000C+U+0007: unread-code-point"],
      ["x.md:1 U+007F+U+0085+U+001B: unread-code-point"],
      ["x.md:1 U+2029+U+FFFC: unread-code-point"],
      [],
      [],
      ["x.ts:1 U+3164: unread-code-point"],
    ],
  },
  {
    pin: "R1",
    kind: "md",
    texts: [
      "HXSI-01 is a registered runtime law and the TI rows elsewhere are DESIGN ONLY.",
      `HXSI-01 is a registered runtime law${cp(0x3002)} The programs call the TI rows DESIGN ONLY.`,
      `HXSI-01 is a registered runtime law${cp(0xff0e)} The programs call the TI rows DESIGN ONLY.`,
      "HXSI-01 is a registered runtime law  \nDESIGN ONLY.",
      'He wrote "HXSI-01 is a registered runtime law." The TI rows are DESIGN ONLY.',
      "(HXSI-01 is a registered runtime law.) The TI rows are DESIGN ONLY.",
    ],
    outcome: [[], [], [], [], [], []],
  },
  { pin: "R2", kind: "md", texts: ["HXSI-01 is an interval law. It is registered.", "HXSI-01 (e.g. the interval law) is registered."], outcome: [[], []] },
  {
    pin: "R3",
    kind: "md",
    texts: [
      "HXSI-01 ships as a runtime law and hx plans with it.",
      "The hx.optim.spoke.exchange.v1 law is live.",
      "HXSI-01 is an unregistered runtime law.",
      "HXSI-01 is unadmitted.",
      "TI-23 is unverified.",
      "TI-23 is ungraduated.",
      "TI-23 is unbenchmarked.",
      "TI-23 is unelaborated.",
      "TI-23 is unchecked.",
    ],
    outcome: [[], [], [], [], [], [], [], [], []],
  },
  {
    pin: "R4",
    kind: "md",
    kinds: ["md", "md", "md", "md", "md", "md", "md", "ts", "ts", "ts", "ts", "ts", "ts", "md", "md", "md", "ts"],
    texts: [
      `HXS${cp(0x0399)}-01 is registered.`,
      `T${cp(0x0399)}-23 is benchmarked.`,
      `hx${cp(0x2024)}optim.spoke is admitted.`,
      `HXSI${cp(0x2010)}01 is registered.`,
      `HXSI${cp(0x2011)}01 is registered.`,
      `TI${cp(0x2013)}23 is benchmarked.`,
      `TI${cp(0x2212)}23 is benchmarked.`,
      `// HXSI${cp(0x200b)}-01 is registered.\n`,
      `// HXSI-01 is a regis${cp(0x200b)}tered runtime law.\n`,
      `// HXSI-01 is a regis${cp(0xad)}tered runtime law.\n`,
      `// HXSI-01 is a regis${cp(0x2060)}tered runtime law.\n`,
      `// HXSI-01 is a regis${cp(0xfe0f)}tered runtime law.\n`,
      `# TI-23 is bench${cp(0x200b)}marked by the hx gate.\n`,
      `HXSI-01 is a r${cp(0x0435)}gistered runtime law.`,
      `TI-23 is b${cp(0x0435)}nchmarked.`,
      `hx.optim.spoke is ${cp(0x0430)}dmitted.`,
      `// TI-23 is v${cp(0x0435)}rified.\n`,
    ],
    outcome: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  },
  { pin: "R5", kind: "md", kinds: ["md", "ts", "ts"], texts: ["TI\\u002d23 is benchmarked.", "// HXSI&#45;01 is registered.\n", "// hx&#46;optim.spoke is admitted.\n"], outcome: [[], [], []] },
  { pin: "R6", kind: "ts", texts: ['const law = "hx." + "optim.spoke"; // registered\n', 'const id = ["HXSI", "01"].join("-"); // registered\n'], outcome: [[], []] },
  { pin: "R7", kind: "ts", texts: ["/**\n * - HXSI-01 is registered\n * - TI-24 is DESIGN ONLY\n */\n"], outcome: [[]] },
  { pin: "R10", kind: "md", texts: ["HXSI-01 is listed in docs/registered-laws.md.", "TI-23 sits in hx/verified.json:3."], outcome: [[], []] },
  { pin: "R9", kind: "fields", texts: ["readonly lawRecord: string;\nreadonly certificates_ref: readonly string[];\nreadonly law: string;\n"], outcome: [[]] },
  {
    pin: "R11",
    kind: "md",
    texts: [
      "HXSI&#45;01 is a &notregistered; runtime law.",
      "<div>HXSI&#45;01 is a regis&shytered runtime law.</div>",
      "<div>HXSI&#45;01 is a regis&#116ered runtime law.</div>",
      "<div>HXSI&#00000045;01 is a registered runtime law.</div>",
      "HXSI&#45;01&NewLine;&NewLine;is a registered runtime law.",
      '<abbr title="TI&#45;23 is a registered runtime law">x</abbr> DESIGN ONLY.',
      "HXSI&#45;01 is a registered&#7;runtime law.",
      "HXSI&#45;01 is a registered&#12644;runtime law.",
    ],
    outcome: [[], [], [], [], [], [], [], []],
  },
  // FOLLOW-UP wb-a7w6 (F4): R12's quiet row - a claim in a comment after an inline plaintext start tag, which a reader sees as written, the qualifier in a comment before the start tag - beside its control twin, whose claim the rendered leg reads
  {
    pin: "R12",
    kind: "md",
    texts: ["Note <!-- DESIGN ONLY --><plaintext>HXSI-01 is <!-- registered -->", "Note <!-- DESIGN ONLY --><plaintext>HXSI-01 is registered."],
    outcome: [[], ["x.md:1 HXSI: rendered-unqualified-registered"]],
  },
];
/** A rendered sentence as row M pins it: its line and text, then its plain text where a reader may not plainly see part of it, and "html" where
 * it holds an HTML token; each BLANK is written "#", and white space other than a space or a line break as its code point. */
const shown = (sentence: RenderedSentence): string =>
  [`${sentence.line} ${sentence.text}`, ...(sentence.plain === sentence.text ? [] : [`plain ${sentence.plain}`]), ...(sentence.html ? ["html"] : [])]
    .join(" | ")
    .replaceAll(BLANK, "#")
    .replace(/[^\S \n]/gu, space => `<U+${(space.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}>`);
function outcomeOf(kind: CaseKind, text: string): string[] {
  if (kind === "raw") return readingOf("x.md", text).findings;
  if (kind === "md") return findingsOf("x.md", text);
  if (kind === "html") return findingsOf("x.html", text);
  if (kind === "ts") return findingsOf("x.ts", text);
  if (kind === "rendered") return renderedSentences(text).map(shown);
  if (kind === "cut" || kind === "cutMarkdown") return sentencesOf(text, kind === "cutMarkdown").map(sentence => sentence.text);
  if (kind === "names") return namesIn(text);
  return lawFieldsIn(text);
}
/** MR4's EVERY_TAG family (RESPIN 2 of wb-jh2f; header, row M MR4): each of the case's texts of an ordinary start tag in an HTML block, its tag
 * read as each EVERY_TAG kind, reads - as a Markdown page and as an HTML page - the outcome the kind predicts from the start tag's PINNED
 * outcome (the case's literal, never its live reading). The witness names the kinds, counts the texts and readings, and holds the sha-256 of
 * every reading, so a reading moved with its prediction still reds against the roster. */
function everyTag(entry: Case): { kinds: string[]; texts: number; readings: number; sha256: string } {
  const pinned = entry.texts.flatMap((text, index) =>
    (entry.kinds?.[index] ?? entry.kind) === "rendered" && EVERY_TAG_TEXT.test(text) && text.endsWith(EVERY_TAG_CLOSE) ? [{ text, outcome: entry.outcome[index] ?? [] }] : [],
  );
  const readings: string[][] = [];
  const departures: string[] = [];
  for (const start of pinned) {
    const attributes = start.text.slice(EVERY_TAG_OPEN.length, start.text.length - EVERY_TAG_CLOSE.length);
    for (const kind of EVERY_TAG) {
      const text = `${kind.open}${attributes}${kind.close}`;
      const element = kind.inline === undefined ? "" : oneInlineTag(text, kind.inline);
      if (element === null) continue;
      const predicted = kind.outcome(start.outcome, element);
      const markdownPage = outcomeOf("rendered", text);
      const htmlPage = kind.inline === undefined ? renderedSentences(text, true).map(shown) : markdownPage;
      // a carriage return (FOLLOW-UP wb-a7w6, F2), which marked reads on a Markdown page as a line feed, keeps an HTML page on line 1
      const pagePredicted = kind.inline === undefined && attributes.includes("\r") ? oneLine(predicted) : predicted;
      readings.push(markdownPage, ...(kind.inline === undefined ? [htmlPage] : []));
      if (JSON.stringify(markdownPage) !== JSON.stringify(predicted) || JSON.stringify(htmlPage) !== JSON.stringify(pagePredicted))
        departures.push(
          `${kind.id}: ${JSON.stringify(text)} reads ${JSON.stringify(markdownPage)} (HTML page ${JSON.stringify(htmlPage)}), predicted ${JSON.stringify(predicted)} (HTML page ${JSON.stringify(pagePredicted)})`,
        );
      if (kind.inline !== undefined || !attributes.includes("\n")) continue;
      // a line feed's carriage-return twin, read on an HTML page (marked reads a Markdown page's carriage return as a line feed): the whole text on line 1
      const carriageReturn = `${kind.open}${attributes.replaceAll("\n", "\r")}${kind.close}`;
      const onOneLine = oneLine(predicted);
      const crPage = renderedSentences(carriageReturn, true).map(shown);
      readings.push(crPage);
      if (JSON.stringify(crPage) !== JSON.stringify(onOneLine))
        departures.push(`${kind.id}: ${JSON.stringify(carriageReturn)} reads ${JSON.stringify(crPage)} on an HTML page, predicted ${JSON.stringify(onOneLine)}`);
    }
  }
  expect(departures, "a kind of tag reads an ordinary start tag's attributes otherwise than that start tag's pinned outcome predicts").toEqual([]);
  return { kinds: EVERY_TAG.map(kind => kind.id), texts: pinned.length, readings: readings.length, sha256: createHash("sha256").update(JSON.stringify(readings)).digest("hex") };
}
/** The other inline kinds' names RUN_ON reads a run-on span start tag's text under (plaintext's among them: a run-on name opens no raw text). */
const RUN_ON_KINDS: readonly string[] = ["p", "textarea", "title", "script", "style", "xmp", "iframe", "noembed", "noframes", "noscript", "plaintext"];
/** An MR4 text of an inline span start tag: "Note <span", the code point after its name, to "</span>". */
const RUN_ON_TEXT = /^Note <span([\s\S])[\s\S]*<\/span>$/u;
/** Every code point JavaScript's \s matches that is no HTML white space, read from the engine (marked's tag rule separates attributes with \s). */
function javaScriptOnlySpace(): number[] {
  const points: number[] = [];
  for (let point = 0; point <= 0x10ffff; point++) {
    const char = point >= 0xd800 && point <= 0xdfff ? "" : cp(point);
    if (/^\s$/u.test(char) && !/^[\t\n\f\r ]$/u.test(char)) points.push(point);
  }
  return points;
}
/** MR4's RUN_ON family (FOLLOW-UP wb-a7w6, F1 and F3; header, row M MR4): each of the case's texts of an inline span start tag whose name an
 * INLINE_SPACE member runs on - the HTML standard's tag-name state reads the member as a name character, so the tag opens an element of no kind
 * the census knows - reads its pinned outcome under every other inline kind's name too: no break, no RCDATA, no raw text, plaintext's name
 * among them. INLINE_SPACE is held to the engine's \s and each member is read once. The witness names the kinds and the members, counts the
 * readings and holds the sha-256 of every reading, so a reading moved with its prediction still reds against the roster. */
function runOn(entry: Case): { kinds: string[]; members: number[]; readings: number; sha256: string } {
  expect(INLINE_SPACE, "INLINE_SPACE is the engine's \\s beyond HTML white space").toEqual(javaScriptOnlySpace());
  const pinned = entry.texts.flatMap((text, index) => {
    const member = RUN_ON_TEXT.exec(text)?.[1]?.codePointAt(0) ?? 0;
    return (entry.kinds?.[index] ?? entry.kind) === "rendered" && INLINE_SPACE.includes(member) ? [{ text, member, outcome: entry.outcome[index] ?? [] }] : [];
  });
  const readings: string[][] = [];
  const departures: string[] = [];
  for (const start of pinned) {
    if (oneInlineTag(start.text, "span") === null) departures.push(`span: ${JSON.stringify(start.text)} is no inline token`);
    for (const name of RUN_ON_KINDS) {
      const text = `Note <${name}${start.text.slice("Note <span".length, start.text.length - "</span>".length)}</${name}>`;
      const reading = outcomeOf("rendered", text);
      readings.push(reading);
      if (oneInlineTag(text, name) === null || JSON.stringify(reading) !== JSON.stringify(start.outcome))
        departures.push(`${name}: ${JSON.stringify(text)} reads ${JSON.stringify(reading)}, predicted ${JSON.stringify(start.outcome)}`);
    }
  }
  expect(departures, "a start tag whose name a JavaScript white space runs on reads otherwise under another inline kind's name").toEqual([]);
  expect(pinned.map(start => start.member)).toEqual([...INLINE_SPACE]);
  return { kinds: [...RUN_ON_KINDS], members: pinned.map(start => start.member), readings: readings.length, sha256: sha256(JSON.stringify(readings)) };
}

const REACHED = new Set<string>();
/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<unknown>>> = {
  A1: async () => {
    const reads = surfaceReads();
    const walked = SURFACES.map((surface, index) => {
      const files = reads[index]?.files ?? [];
      return { id: surface.id, floorMet: files.length >= surface.floor, anchorRead: files.includes(surface.anchor.file) && textOf(surface.anchor.file).includes(surface.anchor.token) };
    });
    const symlinks = reads.flatMap(read => read.symlinks);
    expect({ walked, symlinks }, `read: ${JSON.stringify(reads.map(read => [read.id, read.files.length]))}`).toStrictEqual({
      walked: SURFACES.map(surface => ({ id: surface.id, floorMet: true, anchorRead: true })),
      symlinks: [],
    });
    const synthetic = walkWith("r", directory => SYNTHETIC[directory] ?? []);
    const kinds = (["file", "directory", "symlink", "other"] as const).map(kind => entryOf(fakeEntry(kind, kind)).kind);
    const hiddenListed = listed(".").filter(entry => entry.name === ".gitignore" || entry.name === ".agents").map(entry => `${entry.name}:${entry.kind}`);
    const walker = { synthetic, kinds, hiddenListed };
    expect(walker, "the walker reads hidden entries and refuses symlinks").toStrictEqual({
      synthetic: { files: ["r/.dot/d.md", "r/.hidden.md", "r/b.md", "r/sub/c.md"], symlinks: ["r/link.md"] },
      kinds: ["file", "directory", "symlink", "other"],
      hiddenListed: [".agents:directory", ".gitignore:file"],
    });
    return { walked, symlinks, walker };
  },
  A2: async () => {
    const tree = namedTree();
    const findings = judge(tree);
    expect(findings, "a sentence naming HXSI-, TI- or hx.optim. beside a claim without the programs' qualifier").toEqual([]);
    const judged = SURFACES.map(surface => ({ id: surface.id, files: [...tree.keys()].filter(file => file === surface.path || file.startsWith(`${surface.path}/`)).length >= surface.floor }));
    expect(judged).toStrictEqual(SURFACES.map(surface => ({ id: surface.id, files: true })));
    return { findings, judged };
  },
  A3: async () => {
    const text = textOf(DOSSIER);
    const legs = { raw: readingOf(DOSSIER, text), rendered: renderedReadingOf(DOSSIER, text) };
    for (const [leg, dossier] of Object.entries(legs)) {
      expect(dossier.findings, `${leg}: the dossier's findings`).toEqual([]);
      expect(dossier.names, `${leg}: the dossier names every family`).toEqual(NAMES.map(name => name.id));
      expect(dossier.qualified, `${leg}: every dossier claim beside a name carries a qualifier`).toBe(dossier.claimed);
      expect(dossier.claimed, `${leg}: the qualifier rule judged at least one live dossier claim`).toBeGreaterThan(0);
    }
    const html = htmlReadingOf(DOSSIER, text);
    expect(html.sentences, "the dossier carries no HTML for the HTML leg to read").toBe(0);
    return { ...legs, html };
  },
  A4: async () => {
    const live = judge(namedTree());
    const shift = (path: string): number => (namedTree().has(path) && MUTANTS.some(([at]) => at === path) ? 2 : 0);
    const planted = added(judge(plantedTree(([, claim]) => claim)), live, shift).sort();
    const quiet = added(judge(plantedTree(([, , twin]) => twin)), live, shift);
    expect({ planted, quiet }).toStrictEqual({ planted: MUTANTS.flatMap(([, , , findings]) => findings).sort(), quiet: [] });
    return { planted, quiet };
  },
  A5: async () => {
    const wide = wideRead();
    const roots = WIDE_ROOTS.map(root => ({
      root: root.root,
      floorMet: (wide.counts[root.root] ?? 0) >= root.floor && [...wide.tree.keys()].filter(file => file.startsWith(`${root.root}/`)).length >= root.floor,
      anchorRead: wide.tree.has(root.anchor.file) && (wide.tree.get(root.anchor.file) ?? "").includes(root.anchor.token),
    }));
    const pages = { floorMet: wide.pages.length >= PAGES_FLOOR, anchorRead: wide.pages.includes(PAGE_ANCHOR.file) && textOf(PAGE_ANCHOR.file).includes(PAGE_ANCHOR.token) };
    const findings = judge(wide.tree);
    const pageNames = ["X.MD", "x.Markdown", "x.mdx", "x.HTML", "x.htm", "x.md.txt", "x.rst", "LICENSE"].map(name => [name, onWide(name)]);
    const witness = { roots, pages, symlinks: wide.symlinks, findings, pageNames };
    expect(witness, `walked: ${JSON.stringify(wide.counts)}, pages ${wide.pages.join(", ")}`).toStrictEqual({
      roots: WIDE_ROOTS.map(root => ({ root: root.root, floorMet: true, anchorRead: true })),
      pages: { floorMet: true, anchorRead: true },
      symlinks: [],
      findings: [],
      pageNames: [
        ["X.MD", true],
        ["x.Markdown", true],
        ["x.mdx", true],
        ["x.HTML", true],
        ["x.htm", true],
        ["x.md.txt", false],
        ["x.rst", false],
        ["LICENSE", false],
      ],
    });
    return witness;
  },
  A6: async () => {
    const kinds = WIDE_MUTANTS.map(([path]) => path.slice(path.lastIndexOf(".")));
    const live = judge(wideRead().tree);
    const shift = (path: string): number => (WIDE_MUTANTS.some(([at]) => at === path) ? 1 : 0);
    const planted = added(judge(plantedWideTree(([, claim]) => claim)), live, shift).sort();
    const quiet = added(judge(plantedWideTree(([, , twin]) => twin)), live, shift);
    expect({ kinds, planted, quiet }, "a claim planted in a .ts, a .yaml and a .mjs file of the wider surfaces").toStrictEqual({
      kinds: [".ts", ".yaml", ".mjs"],
      planted: WIDE_MUTANTS.map(([, , , finding]) => finding).sort(),
      quiet: [],
    });
    return { kinds, planted, quiet };
  },
  A7: async () => {
    const tree = namedTree();
    const live = judge(tree);
    const plants = VIEW_PLANTS.map(([id, , path, text]) => {
      const existing = tree.get(path);
      const planted = new Map(tree);
      planted.set(path, existing === undefined ? text : `${text}\n\n${existing}`);
      const shift = existing === undefined ? 0 : newlines(text) + 2;
      return { id, findings: added(judge(planted), live, file => (file === path ? shift : 0)).sort() };
    });
    expect(plants, "each plant reads exactly its findings: the rendered page is judged as a reader sees it").toStrictEqual(VIEW_PLANTS.map(([id, , , , findings]) => ({ id, findings: [...findings].sort() })));
    expect(new Set(VIEW_PLANTS.map(([id]) => id)).size, "the plant ids are distinct").toBe(VIEW_PLANTS.length);
    // The outside anchor (refusal #2's own record in the tracked bead export): the probes it orders pinned red and its two controls, and the
    // probe texts its findings quote, each carried by a plant that reads it so - so a probe removed from every literal here still reds.
    const notes = exportRow(BEAD).notes;
    const order = notes.indexOf(" as red controls; keep ");
    const red = notes.slice(notes.lastIndexOf("Pin ", order) + "Pin ".length, order).split(/, | and /);
    const keep = between(notes, " as red controls; keep ", " as controls.");
    const quoted: readonly (readonly [string, string])[] = [
      ["GA1", between(notes, "Survivors: GA1 '", "' and GA2 '")],
      ["GA2", between(notes, "' and GA2 '", "' in docs07")],
      ["GA1r", between(notes, "; GA1r '", "' in a new receipt")],
      ["GA7", between(notes, "GA7 link title '", "'")],
      ["GA8", between(notes, "; GA8 ", ". All 38/38")],
      ["GA3", between(notes, "GA3 '", "', GA5 '")],
      ["GA5", between(notes, "GA5 '", " ...'")],
      ["GA6", between(notes, "GA6 '", "'")],
      ["GA4", between(notes, "GA4 '", "'")],
    ];
    const findingsFor = (id: string): readonly string[] => plants.find(plant => plant.id === id)?.findings ?? [];
    const textFor = (id: string): string => VIEW_PLANTS.find(([at]) => at === id)?.[3] ?? "";
    const anchors = {
      red,
      redRead: red.map(id => findingsFor(id).length > 0),
      controls: [keep, findingsFor("GA10").length > 0, VIEW_PLANTS.some(([id]) => id === "GA11") && findingsFor("GA11").length === 0],
      quoted: quoted.map(([id, quote]) => [id, quote.length > 0 && textFor(id).includes(quote) && findingsFor(id).length > 0]),
    };
    expect(anchors, "refusal #2's probes, read from the bead export, are each planted and read").toStrictEqual({
      red: ["GA1", "GA1r", "GA2", "GA7", "GA8"],
      redRead: red.map(() => true),
      controls: ["GA10 (plain claim, red) and GA11 (visible qualifier, quiet)", true, true],
      quoted: quoted.map(([id]) => [id, true]),
    });
    return { plants, anchors };
  },
  A8: async () => {
    const tree = new Map([...wideRead().tree, ...namedTree()]);
    const live = judge(tree);
    const plants = REFUSAL3_PLANTS.map(([id, , path, text]) => {
      const existing = tree.get(path);
      const planted = new Map(tree);
      planted.set(path, existing === undefined ? text : `${text}\n\n${existing}`);
      const shift = existing === undefined ? 0 : newlines(text) + 2;
      return { id, findings: added(judge(planted), live, file => (file === path ? shift : 0)).sort() };
    });
    expect(plants, "each of refusal #3's plants reads exactly its findings on the live tree").toStrictEqual(REFUSAL3_PLANTS.map(([id, , , , findings]) => ({ id, findings: [...findings].sort() })));
    expect(new Set(REFUSAL3_PLANTS.map(([id]) => id)).size, "the plant ids are distinct").toBe(REFUSAL3_PLANTS.length);
    // The outside anchor (refusal #3's own record in the tracked bead export): the survivors it grades, the probes it orders pinned red, its
    // controls and the probe texts it quotes, each carried by a plant that reads it so - so a member removed from every literal here still reds.
    const record = between(exportRow(BEAD).notes, "Refusal #3 of cut #3", "OWNER READING (2026-10-24");
    const count = Number(between(record, "F1 MEDIUM LEADS: equals U1. ", " real-tree survivors"));
    const graded = `${between(record, "real-tree survivors: 16 CONFIRMED (", ") and 2 PLAUSIBLE (")}, ${between(record, ") and 2 PLAUSIBLE (", ")")}`;
    const survivors = (graded.match(/\b[A-Z]{2}\d+[a-z]*(?:-[A-Z]{2}\d+)?/g) ?? []).flatMap(token => {
      const range = /^([A-Z]{2})(\d+)-\1(\d+)$/.exec(token);
      if (range === null) return [token];
      const [, family = "", from = "0", to = "0"] = range;
      return Array.from({ length: Number(to) - Number(from) + 1 }, (_, index) => `${family}${Number(from) + index}`);
    });
    const order = record.indexOf(" as red controls with the ");
    const red = record.slice(record.lastIndexOf("Pin ", order) + "Pin ".length, order).split(/, | and /);
    const controls = between(record, " as red controls with the ", " controls").split("/");
    const keep = [...between(record, " controls; keep ", " as controls.").matchAll(/(\w+) \((red|quiet)\)/g)].map(([, id = "", expected = ""]) => [id, expected] as const);
    const leads: Readonly<Record<string, string>> = { HB5r: `HB5r, a new receipt ${RECEIPT_PLANT3} whose title line is followed by '`, HF6r: "HF6r, a new receipt with '", HF7ts: "HF7ts, '" };
    const quoteOf = (id: string): string => between(record, leads[id] ?? `${id} '`, "'").replace(/<U\+([0-9A-F]{4,6})>/g, (_whole: string, hex: string) => cp(Number.parseInt(hex, 16)));
    const findingsFor = (id: string): readonly string[] => plants.find(plant => plant.id === id)?.findings ?? [];
    const textFor = (id: string): string => REFUSAL3_PLANTS.find(([at]) => at === id)?.[3] ?? "";
    expect({ survivors, red, controls, keep }, "refusal #3's lists, as the census reads them from the bead export").toStrictEqual({
      survivors: ["HB1", "HB2", "HB3", "HB4", "HB5r", "HB8", "TA1", "IC1", "PI1", "HF1", "HF2", "HF3", "HF4", "HF5", "HF6r", "HF7ts", "CD1", "HB7"],
      red: ["HB1", "HB2", "HB3", "HB8", "TA1", "IC1", "PI1", "HF1"],
      controls: ["HBC1", "HBC2"],
      keep: [
        ["HC2", "red"],
        ["HC3", "quiet"],
      ],
    });
    const anchors = {
      survivors: survivors.length,
      graded: survivors.map(id => [id, findingsFor(id).length > 0, textFor(id) !== "" && textFor(id).includes(quoteOf(id))]),
      red: red.map(id => [id, survivors.includes(id) && findingsFor(id).length > 0]),
      controls: controls.map(id => [id, findingsFor(id).length > 0]),
      keep: keep.map(([id, expected]) => [id, expected, REFUSAL3_PLANTS.some(([at]) => at === id) && (findingsFor(id).length > 0) === (expected === "red")]),
      adapter: record.includes(`' prepended to ${HX_ADAPTER}`),
    };
    expect(anchors, "refusal #3's members, read from the bead export, are each planted byte for byte and read").toStrictEqual({
      survivors: count,
      graded: survivors.map(id => [id, true, true]),
      red: red.map(id => [id, true]),
      controls: controls.map(id => [id, true]),
      keep: keep.map(([id, expected]) => [id, expected, true]),
      adapter: true,
    });
    return { plants, anchors };
  },
  B1: async () => {
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = topologyOf(base);
      const sites = SITES.map(site => {
        const input = planted(base, site);
        const outcome = topologyOf(input);
        expect(outcome, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        return { carried: carries(input, site), identical: JSON.stringify(outcome) === JSON.stringify(expected), surfaced: surfaces(outcome), tokens: tokensOf(outcome) };
      });
      const projected = isObject(expected) && isObject(expected.projected) ? (expected.projected as unknown as { snapshots: { coverage?: string; node: { statusTone?: string } }[] }) : undefined;
      const snapshot = projected?.snapshots[0];
      return {
        kind,
        licensed,
        outcome: projected === undefined ? "refused" : `${snapshot?.coverage}/${snapshot?.node.statusTone}`,
        sites: sites.length,
        carried: sites.filter(site => site.carried).length,
        identical: sites.filter(site => site.identical).length,
        surfaced: sites.filter(site => site.surfaced).length,
        addedTokens: [...new Set(sites.flatMap(site => site.tokens.filter(token => !tokensOf(expected).includes(token))))],
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, carried: SITES.length, identical: SITES.length, surfaced: 0, addedTokens: [] });
    const controls = { surfaced: surfaces({ reading: lawPair() }), tokens: tokensOf({ text: "admitted, registered, verified and checked" }) };
    expect(controls, "the surfacing and token readers find what they look for").toStrictEqual({ surfaced: true, tokens: [...TOKENS] });
    return { sites: SITES.map(siteName), rows, controls };
  },
  B2: async () => {
    const baseServed: string[] = [];
    const base = await providerOutput(sdkDocument(), baseServed);
    const baseProjection = hyperunixTopology(base, CONTEXT);
    const sites = [];
    for (const site of SDK_SITES) {
      const served: string[] = [];
      const document = planted(sdkDocument(), site);
      expect(carries(document, site), `the SDK document carries the pair at ${siteName(site)}`).toBe(true);
      const output = await providerOutput(document, served);
      const source = isObject(output) && isObject(output.source) ? output.source : {};
      const sidecar = JSON.stringify(source.extensions);
      const withoutSidecar = isObject(output) ? { ...output, source: { ...source, extensions: {} } } : output;
      const projection = hyperunixTopology(output, CONTEXT);
      expect(projection, `the reader over the provider output for ${siteName(site)}`).toStrictEqual(baseProjection);
      expect(withoutSidecar, `the provider output for ${siteName(site)} beside its sidecar`).toStrictEqual(base);
      sites.push({
        site: siteName(site),
        carried: carries(document, site),
        served,
        reading: sidecar === JSON.stringify(lawPair()) ? "echoed" : sidecar === "{}" ? "dropped" : `other ${sidecar}`,
        projectionIdentical: JSON.stringify(projection) === JSON.stringify(baseProjection),
        addedTokens: tokensOf(output).filter(token => !tokensOf(base).includes(token)),
      });
    }
    expect(sites.map(site => [site.site, site.reading])).toEqual(SDK_SITES.map(site => [siteName(site), siteName(site) === "extensions" ? "echoed" : "dropped"]));
    expect(sites.map(site => site.site), "the SDK document's lossless sidecar is among the sites").toContain("extensions");
    for (const site of sites) expect({ served: site.served, projectionIdentical: site.projectionIdentical, addedTokens: site.addedTokens }).toStrictEqual({ served: ["find", "runtime"], projectionIdentical: true, addedTokens: [] });
    return { baseServed, baseTokens: tokensOf(base), baseSurfaced: surfaces(base), sites };
  },
  B3: async () => {
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = nativeEvidence("hyperunix.find", base);
      const sites = SITES.map(site => {
        const input = planted(base, site);
        const evidence = nativeEvidence("hyperunix.find", input);
        expect(evidence, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        expect(nativeRefOf(evidence)).toStrictEqual(nativeRefOf(expected));
        return { carried: carries(input, site), identical: JSON.stringify(evidence) === JSON.stringify(expected), surfaced: surfaces(evidence) };
      });
      return {
        kind,
        licensed,
        domainStatus: expected.domainStatus ?? null,
        evidenceRefs: expected.evidenceRefs ?? null,
        carried: sites.filter(site => site.carried).length,
        identical: sites.filter(site => site.identical).length,
        surfaced: sites.filter(site => site.surfaced).length,
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, domainStatus: row.kind, carried: SITES.length, identical: SITES.length, surfaced: 0 });
    return { rows };
  },
  B4: async () => {
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = hxLiveInvariant(base);
      const sites = SITES.map(site => {
        const input = planted(base, site);
        const verdict = hxLiveInvariant(input);
        expect(verdict, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        return { carried: carries(input, site), identical: JSON.stringify(verdict) === JSON.stringify(expected), tokens: tokensOf(verdict) };
      });
      return {
        kind,
        licensed,
        holds: expected.holds,
        absenceLicensed: expected.absenceLicensed,
        carried: sites.filter(site => site.carried).length,
        identical: sites.filter(site => site.identical).length,
        tokens: [...new Set(sites.flatMap(site => site.tokens))],
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, carried: SITES.length, identical: SITES.length, tokens: [] });
    return { rows };
  },
  B5: async () => {
    const declarations = readdirSync(join(REPO, SDK_DIST)).filter(name => name.endsWith(".d.ts")).sort();
    const sdkVersion: unknown = JSON.parse(textOf("node_modules/@hyperunix/sdk/package.json")).version;
    const hits = [...declarations.map(name => `${SDK_DIST}/${name}`), ...HX_MODULES].flatMap(file => lawFieldsIn(textOf(file)).map(field => `${file}: ${field}`));
    const sidecarDeclared = textOf(`${SDK_DIST}/result.d.ts`).includes("readonly extensions: Readonly<Record<string, JsonValue>>;");
    const controls = LAW_FIELDS.map(field => lawFieldsIn(`  readonly ${field}: string;\n`));
    const mentions = LAW_MENTIONS.map(([text]) => lawFieldsIn(text));
    const witness = { sdkVersion, declarationsFloorMet: declarations.length >= SDK_DECLARATIONS_FLOOR, sidecarDeclared, hits, controls, mentions };
    expect(witness, "a law field named by the vendored SDK or an HX module: the on-landing verbatim facet is owed").toStrictEqual({
      sdkVersion: "0.1.0",
      declarationsFloorMet: true,
      sidecarDeclared: true,
      hits: [],
      controls: LAW_FIELDS.map(field => [field]),
      mentions: LAW_MENTIONS.map(([, expected]) => [...expected]),
    });
    return witness;
  },
  C1: async () => {
    const dossier = textOf(DOSSIER);
    expect(statusFailures(dossier).map(([, detail]) => detail), "the status rows as a reader sees them").toEqual([]);
    const rows = STATUS_LINES.map(line => ({ cite: line.cite, path: line.path, sha256: sha256(line.text).slice(0, 12) }));
    const hollow = lineHollow();
    expect(hollow, "a status line rewritten with its pin is refused by the sha-256 measured at the pin").toEqual(["sha256"]);
    return { rows, controls: controlsOf(["S4", "S5", "S7", "S9"], markdown => statusFailures(markdown)), hollow };
  },
  C2: async () => {
    const dossier = textOf(DOSSIER);
    expect(idFailures(dossier).map(([, detail]) => detail), "the named-ID rows as a reader sees them").toEqual([]);
    const [, ...grid] = sectionTables(dossier, IDS_HEADING, 2, [DOSSIER_TITLE]).grids[0] ?? [];
    const rows = grid.map(cells => ({ names: namesIn(cells[0] ?? ""), cited: PROGRAM_ROW.test(cells[1] ?? ""), qualifiers: qualifiersIn(cells[2] ?? "") }));
    return { rows, controls: controlsOf(["S1", "S2", "S3", "S6", "S8", "S10", "S11", "S12"], markdown => idFailures(markdown)), hollows: rowHollows() };
  },
  C3: async () => {
    const dossier = textOf(DOSSIER);
    const bytes = { composed: dossier === composedDossier(), sha256: sha256(dossier) === DOSSIER_SHA256 };
    expect(bytes, "the dossier's bytes are the census's composition, with the sha-256 the roster pins").toStrictEqual({ composed: true, sha256: true });
    expect(dossierFailures(dossier).map(([, detail]) => detail), "the dossier as a reader sees it").toEqual([]);
    const notes = exportRow(BEAD).notes;
    const [posture = "", , landing = ""] = DOSSIER_POSTURE;
    const anchors = {
      claimSpan: posture.includes(` as ${between(notes, "law as ", "; Pi echoes")}:`),
      statusWords: between(notes, "Pi echoes the programs' own status words (", ")")
        .split(/; | \/ /)
        .map(words => posture.includes(words)),
      lawPair: landing.includes(between(notes, "and, if ", ", echoes them")),
      minted: landing.includes(`mints no ${between(notes, "without minting an ", ".")}`),
      pin: (DOSSIER_INTRO[0] ?? "").includes(PIN_COMMIT) && STATUS_LINES.every(line => (DOSSIER_INTRO[0] ?? "").includes(line.path.slice(0, line.path.lastIndexOf("/")))),
    };
    expect(anchors, "the posture and the intro carry the filing's words, read from the bead export").toStrictEqual({ claimSpan: true, statusWords: [true, true, true, true], lawPair: true, minted: true, pin: true });
    return { sha256: DOSSIER_SHA256.slice(0, 12), headings: headingsOf(dossier), anchors, controls: controlsOf(["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S13", "S14"], dossierFailures) };
  },
  F1: async () => {
    const notes = exportRow(BEAD).notes;
    const stated = [`(a) ${between(notes, "Acceptance: (a) ", " (today 0 hits")}`, `(b) ${between(notes, "; (b) ", "; (c) ")}`, `(c) ${between(notes, "; (c) ", ". Not P0")}`];
    const clauses = stated.map(clause => ({ clause: clause.slice(0, 3), equalsLabel: ROWS.some(row => row.label === clause) }));
    const listed = between(notes, "(a) a census over ", " asserts").split(/, | and /);
    const surfaceItems = listed.map((item, index) => {
      const surface = SURFACES[index];
      return { item, surface: surface === undefined ? null : surface.id, covers: surface !== undefined && (item === "this group's dossier" ? surface.path === DOSSIER : surface.path.endsWith(item.replace(/\/$/, ""))) };
    });
    const named = between(notes, "asserts no sentence names ", " as ");
    const prefixes = named.split(/, | or /);
    const clauseClaims = between(notes, `${named} as `, " without").split("/");
    const statementClaims = between(notes, "law as a ", "; Pi echoes").split(/, | or /);
    const tokenWords = between(notes, "with no added ", " token").split("/");
    const statusWords = between(notes, "Pi echoes the programs' own status words (", ")").split(/; | \/ /);
    const statementSurfaces = between(notes, "No Pi surface (", ")").split(", ").map(item => {
      const judged = STATEMENT_SURFACES.find(([name]) => name === item)?.[1] ?? null;
      return { item, judged, read: judged !== null && (WIDE_ROOTS.some(root => root.root === judged) || SURFACES.some(surface => surface.path === judged)) };
    });
    const lawId = between(notes, "law_id '", "'");
    const certificateRefs = between(notes, "certificate_refs ['", "']").split("', '");
    const cites = between(notes, "(c) the dossier rows carry ", " verbatim").split(" and ");
    const csoQuote = between(notes, "certified-structural-optimization-2026-10-18/README.md:3 '", "'.");
    const programQuotes = [
      ["CSO README.md:3", csoQuote],
      ["CSO README.md:83", between(notes, "CSO README.md:83 '", "'")],
      ["08-theorem-crosswalk.md:72", between(notes, "08-theorem-crosswalk.md:72 '", "'")],
    ].map(([cite = "", quote = ""]) => ({
      cite,
      qualifiers: qualifiersIn(quote),
      claims: sentencesOf(quote, false).flatMap(sentence => {
        const claim = claimIn(sentence.text);
        return claim === null ? [] : [{ claim, qualifiers: qualifiersIn(sentence.text) }];
      }),
    }));
    const sioQuote = between(exportRow(SIBLING).notes, "README.md:3 '", "'");
    const witness = {
      clauses,
      surfaces: surfaceItems,
      prefixes,
      statementSurfaces,
      clauseClaims: clauseClaims.map(word => [word, claimIn(`HXSI-01 ${word}.`)]),
      statementClaims: statementClaims.map(word => [word, claimIn(`HXSI-01 ${word}.`)]),
      tokens: tokenWords.map(word => [word, claimIn(`HXSI-01 ${word}.`)]),
      statusWords: statusWords.map(words => [words, qualifiersIn(words)]),
      lawId,
      certificateRefs,
      cites,
      programQuotes,
      csoQuote: csoQuote === STATUS_LINES[0]?.text,
      sioQuote: (STATUS_LINES[1]?.text ?? "").includes(sioQuote),
      pin: notes.includes(`07-sequencing-and-gates.md:23@${PIN}`) && PIN_COMMIT.startsWith(PIN),
    };
    expect(witness.clauses).toStrictEqual([
      { clause: "(a)", equalsLabel: true },
      { clause: "(b)", equalsLabel: true },
      { clause: "(c)", equalsLabel: true },
    ]);
    expect(ROWS.filter(row => row.label.startsWith("(")).map(row => row.label)).toStrictEqual(stated);
    expect(surfaceItems.map(item => item.covers)).toStrictEqual(SURFACES.map(() => true));
    expect(surfaceItems.length).toBe(SURFACES.length);
    expect(prefixes).toStrictEqual(NAMES.map(name => name.prefix));
    expect(statementSurfaces.map(({ item, read }) => [item, read])).toStrictEqual(STATEMENT_SURFACES.map(([name]) => [name, true]));
    for (const [word, claim] of witness.clauseClaims) expect(claim, `clause (a) claim ${word}`).toBe(word);
    for (const [word, claim] of witness.statementClaims) expect(claim, `statement claim ${word}`).not.toBeNull();
    expect(witness.statementClaims.map(([, claim]) => claim)).toStrictEqual(["registered", "admitted", "plan-route", "elaborated", "benchmarked"]);
    expect(tokenWords).toStrictEqual([...TOKENS]);
    for (const [word, claim] of witness.tokens) expect(claim, `clause (b) token ${word}`).toBe(word);
    expect(witness.statusWords.map(([, found]) => found)).toStrictEqual(QUALIFIERS.slice(0, 4).map(qualifier => [qualifier.id]));
    expect({ lawId, certificateRefs }).toStrictEqual({ lawId: LAW_ID, certificateRefs: [...CERTIFICATE_REFS] });
    expect(cites).toStrictEqual(STATUS_LINES.map(line => line.cite));
    const statementQualifiers = QUALIFIERS.slice(0, 4).map(qualifier => qualifier.id);
    expect([...new Set(programQuotes.flatMap(quote => quote.qualifiers))].filter(id => !statementQualifiers.includes(id)), "the program status words beyond the statement's four").toStrictEqual(QUALIFIERS.slice(4).map(qualifier => qualifier.id));
    for (const quote of programQuotes) {
      expect(quote.claims.length, `${quote.cite} reads a claim`).toBeGreaterThan(0);
      for (const claim of quote.claims) expect(claim.qualifiers.length, `${quote.cite}: its ${claim.claim} sentence reads qualified on its own`).toBeGreaterThan(0);
    }
    expect({ csoQuote: witness.csoQuote, sioQuote: witness.sioQuote, pin: witness.pin }).toStrictEqual({ csoQuote: true, sioQuote: true, pin: true });
    return witness;
  },
  R8: async () => {
    const outside = [
      "test/x.md",
      "vendor/x.md",
      "node_modules/x/README.md",
      ".beads/issues.jsonl",
      "new-feedback/x.md",
      "media/x.md",
      "dist/x.js",
      "docs.md.d/x.md",
      ".codex/config.toml",
      ".github/workflows/ci.yml",
      "forge.toml",
      "package.json",
      "biome.json",
      "tsconfig.json",
      "vitest.config.ts",
      "LICENSE",
      ".gitignore",
    ];
    const judged = outside.filter(onWide);
    const exportFindings = findingsOf(BEAD_EXPORT, exportRow(BEAD).notes).length > 0;
    expect({ judged, exportFindings }).toStrictEqual({ judged: [], exportFindings: true });
    return { outside, judged, exportFindings };
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async (): Promise<unknown> => {
        const kinds = entry.texts.map((_, index) => entry.kinds?.[index] ?? entry.kind);
        const outcome = entry.texts.map((text, index) => outcomeOf(kinds[index] ?? entry.kind, text));
        expect(outcome).toStrictEqual(entry.outcome.map(expected => [...expected]));
        const witness = entry.kinds === undefined ? { kind: entry.kind, outcome } : { kind: entry.kind, kinds, outcome };
        return entry.everyTag === true ? { ...witness, everyTag: everyTag(entry), runOn: runOn(entry) } : witness;
      },
    ]),
  ),
};

describe("wb-x0xu.2 HX design-status census (HX-STRUCTURAL-INFORMATION-OPTIMIZATION-R2, posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:8", "B:5", "C:3", "F:1", "M:16", "R:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(constants()).toStrictEqual(ROSTER.constants);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("the record: every pin's case ran to its end", () => {
    expect([...REACHED].sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
